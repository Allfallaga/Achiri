import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { Device } from "mediasoup-client";
import MediaRcv from "../MediaRcv/MediaRcv";
import MediaAdmin from "./MediaAdmin";

/**
 * Sfu
 * - Gestion du flux vidéo/audio pour admin et membres
 * - Moderne, accessible, robuste, cohérent
 */
function Sfu(props) {
  const alreadyConnected = useRef(false);
  const rtpCapabilities = useRef();
  const socket = useRef();
  const device = useRef();
  const [adminMedia, setAdminMedia] = useState({
    socketId: "",
    videoTrack: undefined,
    audioTrack: undefined,
  });
  const [stream, setStream] = useState();
  const [imAdmin, setImAdmin] = useState(false);
  const my_media = useRef();
  const producerTransport = useRef();
  const consumerTransports = useRef([]);
  const audioTrack = useRef();
  const videoTrack = useRef();
  const [videoConsumers, setVideoConsumers] = useState({});
  const [audioConsumers, setAudioConsumers] = useState({});
  const isAdmin = useRef();
  const videoProducer = useRef();
  const audioProducer = useRef();
  const roomName = useRef(props.roomName);
  const videoParams = useRef({
    encodings: [
      { rid: "r0", scalabilityMode: "L3T3_KEY" },
      { rid: "r1", scalabilityMode: "L3T3_KEY" },
      { rid: "r2", scalabilityMode: "L3T3_KEY" },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  });
  const audioParams = useRef({});

  useEffect(() => {
    isAdmin.current = props.isAdmin;
    socket.current = io(process.env.REACT_APP_PEERSERVER_ADDR_COMP, {
      transports: ["websocket"],
    });

    socket.current.on("connection-success", ({ socketId }) => {
      startStreaming(props.isAdmin);
    });
    socket.current.on("new-producer", ({ producerId }) => {
      signalNewConsumerTransport(producerId);
    });
    socket.current.on("producer-closed", ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.current.find(
        (transportData) => transportData.producerId === remoteProducerId
      );
      if (producerToClose) {
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
        consumerTransports.current = consumerTransports.current.filter(
          (transportData) => transportData.producerId !== remoteProducerId
        );
      }
    });
    socket.current.on("duplicate-user", ({ exists }) => {
      alreadyConnected.current = exists;
    });

    return () => {
      socket.current && socket.current.disconnect();
      if (my_media.current) my_media.current.srcObject = null;
      setAdminMedia({ socketId: "", videoTrack: undefined, audioTrack: undefined });
      setVideoConsumers({});
      setAudioConsumers({});
    };
    // eslint-disable-next-line
  }, []);

  const startStreaming = async (isAdmin) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoTrack.current = stream.getVideoTracks()[0];
      audioTrack.current = stream.getAudioTracks()[0];
      videoParams.current = {
        ...videoParams.current,
        track: videoTrack.current,
      };
      audioParams.current = {
        ...audioParams.current,
        track: audioTrack.current,
      };
      if (isAdmin) {
        setImAdmin(true);
        setStream(stream);
      } else {
        my_media.current.srcObject = stream;
      }
      joinRoom();
    } catch (error) {
      setTimeout(() => {
        startStreaming(isAdmin);
      }, 400);
      // Optionnel : afficher une notification d'erreur à l'utilisateur
    }
  };

  const joinRoom = () => {
    socket.current.emit(
      "joinRoom",
      { roomName: roomName.current, user: props.user, isAdmin: props.isAdmin },
      (data) => {
        rtpCapabilities.current = data.rtpCapabilities;
        createDevice();
      }
    );
  };

  const createDevice = async () => {
    try {
      device.current = new Device();
      await device.current.load({
        routerRtpCapabilities: rtpCapabilities.current,
      });
      createProducerTransport();
    } catch (error) {
      // Optionnel : afficher une notification d'erreur à l'utilisateur
    }
  };

  const createProducerTransport = () => {
    socket.current.emit(
      "createWebRtcTransport",
      { consumer: false },
      ({ params }) => {
        if (params.error) {
          return;
        }
        producerTransport.current = device.current.createSendTransport(params);

        producerTransport.current.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.current.emit("transport-connect", { dtlsParameters });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        producerTransport.current.on(
          "produce",
          async (parameters, callback, errback) => {
            try {
              if (!alreadyConnected.current) {
                await socket.current.emit(
                  "transport-produce",
                  {
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({ id }) => {
                    callback({ id });
                  }
                );
              }
            } catch (error) {
              // Optionnel : afficher une notification d'erreur à l'utilisateur
            }
          }
        );

        connectSendTransport();
      }
    );
  };

  const connectSendTransport = async () => {
    [videoProducer.current, audioProducer.current] = await Promise.all([
      producerTransport.current.produce(videoParams.current),
      producerTransport.current.produce(audioParams.current),
    ]);
    socket.current.emit("producers-exist", ({ producersExist }) => {
      if (producersExist) getProducers();
    });
    // Gestion des événements trackended/transportclose possible ici
  };

  const getProducers = () => {
    socket.current.emit("getProducers", (producerIds) => {
      producerIds.forEach((producerId) => {
        signalNewConsumerTransport(producerId);
      });
    });
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    await socket.current.emit(
      "createWebRtcTransport",
      { consumer: true },
      ({ params }) => {
        if (params.error) {
          return;
        }
        let consumerTransport;
        try {
          consumerTransport = device.current.createRecvTransport(params);
        } catch (error) {
          return;
        }

        consumerTransport.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.current.emit("transport-recv-connect", {
                dtlsParameters: dtlsParameters,
                serverConsumerTransportId: params.id,
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        connectRecvTransport(consumerTransport, remoteProducerId, params.id);
      }
    );
  };

  const connectRecvTransport = async (
    consumerTransport,
    remoteProducerId,
    serverConsumerTransportId
  ) => {
    await socket.current.emit(
      "consume",
      {
        rtpCapabilities: device.current.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async ({ params, socketId, isAdmin }) => {
        if (params.error) {
          return;
        }
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters,
        });

        consumerTransports.current = [
          ...consumerTransports.current,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ];

        if (isAdmin) {
          if (consumer.kind === "video") {
            setAdminMedia((med) => ({
              socketId: socketId,
              videoTrack: consumer.track,
              audioTrack: med.audioTrack,
            }));
          } else {
            setAdminMedia((med) => ({
              socketId: socketId,
              videoTrack: med.videoTrack,
              audioTrack: consumer.track,
            }));
          }
          socket.current.emit("consumer-resume", {
            serverConsumerId: params.serverConsumerId,
          });
          return;
        }

        if (consumer.kind === "video") {
          setVideoConsumers((cons) => ({ ...cons, [socketId]: consumer }));
        } else {
          setAudioConsumers((cons) => ({ ...cons, [socketId]: consumer }));
        }

        socket.current.emit("consumer-resume", {
          serverConsumerId: params.serverConsumerId,
        });
      }
    );
  };

  return (
    <div className="media-area">
      <div className="main-media">
        {imAdmin && <MediaAdmin imAdmin={true} stream={stream} />}
        {!imAdmin && (
          <MediaAdmin
            imAdmin={false}
            audio={adminMedia.audioTrack}
            video={adminMedia.videoTrack}
          />
        )}
        <div className="my-media">
          <video
            ref={my_media}
            autoPlay
            muted
            style={{
              width: "100%",
              borderRadius: 10,
              background: "#222",
              minHeight: 120,
              objectFit: "cover",
              boxShadow: "0 1px 4px #1976d222"
            }}
            aria-label="Votre flux"
          />
        </div>
      </div>
      <div className="secondary-media" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 18 }}>
        {Object.entries(videoConsumers).map(([socketId, videoConsumer]) => (
          <div key={socketId} className="their-media" style={{ position: "relative", minWidth: 180, flex: "1 1 220px" }}>
            <MediaRcv
              video={videoConsumer}
              audio={audioConsumers[socketId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sfu;