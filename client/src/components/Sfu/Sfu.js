import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { Device } from "mediasoup-client";
import MediaRcv from "../MediaRcv/MediaRcv";
import MediaAdmin from "./MediaAdmin";

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
  const videoContainer = useRef();
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
    videoContainer.current = document.getElementById("videoContainer");
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
      // server notification is received when a producer is closed
      // we need to close the client-side consumer and associated transport
      const producerToClose = consumerTransports.current.find(
        (transportData) => transportData.producerId === remoteProducerId
      );
      producerToClose.consumerTransport.close();
      producerToClose.consumer.close();

      // remove the consumer transport from the list
      consumerTransports.current = consumerTransports.current.filter(
        (transportData) => transportData.producerId !== remoteProducerId
      );
    });
    socket.current.on("duplicate-user", ({ exists }) => {
      alreadyConnected.current = exists;
    });
  },[]);

  const startStreaming = async (isAdmin) => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream);
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
          // admin_media.current.srcObject = stream
          setImAdmin(true);
          setStream(stream);
        } else {
          // setMyMedia(admin => ({ socketId: socket.current.id, videoConsumer: { track: videoTrack.current }, audioConsumer: { track: audioTrack.current } }))
            // my_media.current.srcObject = stream;
            my_media.current.srcObject = stream
            my_media.current.srcObject.addTrack(stream.getVideoTracks()[0])
        }
        joinRoom();
      })
      .catch((error) => {
        setTimeout(() => {
          startStreaming(isAdmin)
        }, 400);
        console.log(error);
        // alert(error.message);
      });
  };

  const joinRoom = () => {
    socket.current.emit(
      "joinRoom",
      { roomName: roomName.current, user: props.user, isAdmin: props.isAdmin },
      (data) => {
        console.log("Router RTP : ", data.rtpCapabilities);
        rtpCapabilities.current = data.rtpCapabilities;
        createDevice();
      }
    );
  };

  const createDevice = async () => {
    try {
      device.current = new Device();
      console.log(rtpCapabilities.current)
      await device.current.load({
        routerRtpCapabilities: rtpCapabilities.current,
      });

      createProducerTransport();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const createProducerTransport = () => {
    socket.current.emit(
      "createWebRtcTransport",
      { consumer: false },
      ({ params }) => {
        if (params.error) {
          console.log(params.error);
          return;
        }

        // creates a new WebRTC Transport to send media
        // based on the server's producer transport params
        producerTransport.current = device.current.createSendTransport(params);

        producerTransport.current.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              // Signal local DTLS parameters to the server side transport
              // see server's socket.on('transport-connect', ...)
              await socket.current.emit("transport-connect", {
                dtlsParameters,
              });

              // Tell the transport that parameters were transmitted.
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
              // if (true) {
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
              console.log(error);
              alert(error?.message);
            }
          }
        );

        connectSendTransport();
      }
    );
  };

  const connectSendTransport = async () => {
    // we now call produce() to instruct the producer transport
    // to send media to the Router
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
    // this action will trigger the 'connect' and 'produce' events above
    [videoProducer.current, audioProducer.current] = await Promise.all([
      producerTransport.current.produce(videoParams.current),
      producerTransport.current.produce(audioParams.current),
    ]);
    socket.current.emit("producers-exist", ({ producersExist }) => {
      if (producersExist) getProducers();
    });
    videoProducer.current.on("trackended", () => {
      console.log("Video track ended");

      // close video track
    });
    audioProducer.current.on("trackended", () => {
      console.log("Audio track ended");

      // close Audio track
    });

    videoProducer.current.on("transportclose", () => {
      console.log("transport ended");

      // close video track
    });
    audioProducer.current.on("transportclose", () => {
      console.log("transport ended");

      // close video track
    });
  };

  const getProducers = () => {
    socket.current.emit("getProducers", (producerIds) => {
      console.log(producerIds);
      // for each of the producer create a consumer
      // producerIds.forEach(id => signalNewConsumerTransport(id))
      producerIds.forEach((producerId) => {
        signalNewConsumerTransport(producerId);
      });
    });
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    // This function is called in a loop in the server
    // And loops through all the producers to consume the remote producer id
    await socket.current.emit(
      "createWebRtcTransport",
      { consumer: true },
      ({ params }) => {
        if (params.error) {
          console.log(params.error);
          return;
        }
        let consumerTransport;
        try {
          consumerTransport = device.current.createRecvTransport(params);
          console.log("consumer transport : ", consumerTransport);
        } catch (error) {
          console.log(error);
          alert(error.message);
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
    // for consumer, we need to tell the server first
    // to create a consumer based on the rtpCapabilities and consume
    // if the router can consume, it will send back a set of params as below
    await socket.current.emit(
      "consume",
      {
        rtpCapabilities: device.current.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async ({ params, socketId, isAdmin }) => {
        if (params.error) {
          console.log("Cannot Consume");
          console.log(params.error);
          return;
        }

        // then consume with the local consumer transport
        // which creates a consumer
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
          if (consumer.kind == "video") {
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

        console.log(videoConsumers);
        console.log(audioConsumers);

        if (consumer.kind == "video") {
          let client = {};
          client[socketId] = consumer;
          setVideoConsumers((cons) => ({ ...cons, ...client }));
        } else {
          let client = {};
          client[socketId] = consumer;
          audioConsumers[socketId] = consumer;
          setAudioConsumers((cons) => ({ ...cons, ...client }));
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
        {imAdmin && <MediaAdmin imAdmin={true} stream={stream}></MediaAdmin>}
        {!imAdmin && (
          <MediaAdmin
            imAdmin={false}
            audio={adminMedia.audioTrack}
            video={adminMedia.videoTrack}
          ></MediaAdmin>
        )}
        <div className="my-media">
          <video ref={my_media} autoPlay muted></video>
        </div>
      </div>
      <div className="secondary-media">
        {Object.entries(videoConsumers).map((consumer) => {
          return (
            <div key={consumer[0]} className="their-media">
              <MediaRcv
                video={videoConsumers[consumer[0]]}
                audio={audioConsumers[consumer[0]]}
              ></MediaRcv>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sfu;
