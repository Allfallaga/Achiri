import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';
import MediaRcv from '../MediaRcv/MediaRcv';
import { IoVolumeMuteSharp, IoVideocamOffSharp } from 'react-icons/io5';

/**
 * Sfu
 * - Gestion du flux vidéo/audio pour admin et membres
 * - Moderne, accessible, robuste
 */
function Sfu(props) {
  const alreadyConnected = useRef(false);
  const rtpCapabilities = useRef();
  const socket = useRef();
  const device = useRef();
  const admin_media = useRef();
  const my_media = useRef();
  const producerTransport = useRef();
  const consumerTransports = useRef([]);
  const track = useRef();
  const [receivedTracks, setReceiveTracks] = useState([]);
  const isAdmin = useRef();
  const producer = useRef();
  const roomName = useRef(props.roomName);
  const params = useRef({
    encodings: [
      { rid: 'r0', scalabilityMode: 'L3T3_KEY' },
      { rid: 'r1', scalabilityMode: 'L3T3_KEY' },
      { rid: 'r2', scalabilityMode: 'L3T3_KEY' },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000
    }
  });

  useEffect(() => {
    isAdmin.current = props.isAdmin;
    socket.current = io("185.245.96.81:445", { transports: ['websocket'] });

    socket.current.on('connection-success', ({ socketId }) => {
      startStreaming(props.isAdmin);
    });
    socket.current.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId));
    socket.current.on('producer-closed', ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.current.find(transportData => transportData.producerId === remoteProducerId);
      if (producerToClose) {
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
        consumerTransports.current = consumerTransports.current.filter(transportData => transportData.producerId !== remoteProducerId);
      }
    });
    socket.current.on('duplicate-user', ({ exists }) => {
      alreadyConnected.current = exists;
    });

    return () => {
      socket.current && socket.current.disconnect();
      if (admin_media.current) admin_media.current.srcObject = null;
      if (my_media.current) my_media.current.srcObject = null;
      setReceiveTracks([]);
    };
    // eslint-disable-next-line
  }, []);

  const startStreaming = async (isAdmin) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      track.current = stream.getTracks()[0];
      params.current = {
        ...params.current,
        track: track.current
      };
      if (isAdmin) {
        admin_media.current.srcObject = stream;
      } else {
        my_media.current.srcObject = stream;
      }
      joinRoom();
    } catch (error) {
      alert(error.message);
    }
  };

  const joinRoom = () => {
    socket.current.emit('joinRoom', { roomName: roomName.current, user: props.user, isAdmin: props.isAdmin }, (data) => {
      rtpCapabilities.current = data.rtpCapabilities;
      createDevice();
    });
  };

  const createDevice = async () => {
    try {
      device.current = new Device();
      await device.current.load({ routerRtpCapabilities: rtpCapabilities.current });
      createProducerTransport();
    } catch (error) {
      alert(error.message);
    }
  };

  const createProducerTransport = () => {
    socket.current.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
      if (params.error) {
        return;
      }
      producerTransport.current = device.current.createSendTransport(params);

      producerTransport.current.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          await socket.current.emit('transport-connect', { dtlsParameters });
          callback();
        } catch (error) {
          errback(error);
        }
      });

      producerTransport.current.on('produce', async (parameters, callback, errback) => {
        try {
          await socket.current.emit('transport-produce', {
            kind: parameters.kind,
            rtpParameters: parameters.rtpParameters,
            appData: parameters.appData,
          }, ({ id, producersExist }) => {
            callback({ id });
            if (producersExist) getProducers();
          });
        } catch (error) {
          alert(error?.message);
        }
      });

      connectSendTransport();
    });
  };

  const connectSendTransport = async () => {
    producer.current = await producerTransport.current.produce(params.current);

    producer.current.on('trackended', () => {
      // Gestion de la fin du flux
    });

    producer.current.on('transportclose', () => {
      // Gestion de la fermeture du transport
    });
  };

  const getProducers = () => {
    socket.current.emit('getProducers', producerIds => {
      producerIds.forEach(producerId => {
        signalNewConsumerTransport(producerId);
      });
    });
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    await socket.current.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
      if (params.error) {
        return;
      }
      let consumerTransport;
      try {
        consumerTransport = device.current.createRecvTransport(params);
      } catch (error) {
        alert(error.message);
        return;
      }

      consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          await socket.current.emit('transport-recv-connect', {
            dtlsParameters: dtlsParameters,
            serverConsumerTransportId: params.id
          });
          callback();
        } catch (error) {
          errback(error);
        }
      });
      connectRecvTransport(consumerTransport, remoteProducerId, params.id);
    });
  };

  const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
    await socket.current.emit('consume', {
      rtpCapabilities: device.current.rtpCapabilities,
      remoteProducerId,
      serverConsumerTransportId,
    }, async ({ params, socketId, isAdmin }) => {
      if (params.error) {
        return;
      }
      const consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters
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

      if (!isAdmin)
        setReceiveTracks(v => [...v, { socketId: socketId, videoConsumer: consumer, audioConsumer: {} }]);

      if (isAdmin && admin_media.current) {
        admin_media.current.srcObject = new MediaStream([consumer.track]);
      }

      socket.current.emit('consumer-resume', { serverConsumerId: params.serverConsumerId });
    });
  };

  // Placeholder pour les contrôles (mute/video off)
  const switchTo = (e) => {
    // À implémenter selon la logique métier
  };

  return (
    <div className='media-area'>
      <div className='main-media'>
        <video
          ref={admin_media}
          autoPlay
          className="main-admin-video"
          style={{
            width: "100%",
            borderRadius: 12,
            background: "#111",
            minHeight: 220,
            objectFit: "cover",
            boxShadow: "0 2px 12px #0003"
          }}
          aria-label="Flux principal"
        />
        <div className='my-media' style={{ position: "relative" }}>
          <video
            ref={my_media}
            autoPlay
            className="main-my-video"
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
          {!props.isAdmin && (
            <div onClick={switchTo} className="moderation-controls-container" style={{ position: "absolute", top: 8, left: 8 }}>
              <div className="moderation-controls" style={{ display: "flex", gap: 10 }}>
                <span className="moderation-icon-control icon-mute" tabIndex={0} title="Couper le son" aria-label="Couper le son">
                  <IoVolumeMuteSharp />
                </span>
                <span className="moderation-icon-control icon-video" tabIndex={0} title="Couper la vidéo" aria-label="Couper la vidéo">
                  <IoVideocamOffSharp />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='secondary-media' style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 18 }}>
        {receivedTracks.map((consumer) => (
          <div key={consumer.socketId} className='their-media' style={{ position: "relative", minWidth: 180, flex: "1 1 220px" }}>
            <div className="moderation-controls-container" style={{ position: "absolute", top: 8, left: 8 }}>
              <div className="moderation-controls" style={{ display: "flex", gap: 10 }}>
                <span className="moderation-icon-control icon-mute" tabIndex={0} title="Couper le son" aria-label="Couper le son">
                  <IoVolumeMuteSharp />
                </span>
                <span className="moderation-icon-control icon-video" tabIndex={0} title="Couper la vidéo" aria-label="Couper la vidéo">
                  <IoVideocamOffSharp />
                </span>
              </div>
            </div>
            <MediaRcv socketId={consumer.socketId} consumer={consumer} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sfu;