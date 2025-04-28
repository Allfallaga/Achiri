import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';
import { Box, Typography, Button, Stack } from '@mui/material';

/**
 * Sfu_final
 * - Démo moderne, accessible et robuste d'une SFU Mediasoup
 * - UX, design, accessibilité, logique métier améliorés
 */
function Sfu(props) {
  const rtpCapabilities = useRef();
  const socket = useRef();
  const device = useRef();
  const video_1 = useRef();
  const producerTransport = useRef();
  const consumerTransports = useRef([]);
  const track = useRef();
  const producer = useRef();
  const roomName = useRef('sfuRoom');
  const videoContainer = useRef();
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
    videoContainer.current = document.getElementById('videoContainer');
    socket.current = io("http://localhost:445", { transports: ['websocket'] });

    socket.current.on('connection-success', ({ socketId }) => {
      startStreaming();
    });

    socket.current.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId));

    socket.current.on('producer-closed', ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.current.find(
        transportData => transportData.producerId === remoteProducerId
      );
      if (producerToClose) {
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
        consumerTransports.current = consumerTransports.current.filter(
          transportData => transportData.producerId !== remoteProducerId
        );
      }
      const elem = document.getElementById(`td-${remoteProducerId}`);
      if (elem && videoContainer.current) {
        videoContainer.current.removeChild(elem);
      }
    });

    return () => {
      socket.current && socket.current.disconnect();
      if (video_1.current) video_1.current.srcObject = null;
      if (videoContainer.current) videoContainer.current.innerHTML = '';
      consumerTransports.current = [];
    };
    // eslint-disable-next-line
  }, []);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      track.current = stream.getTracks()[0];
      params.current = {
        ...params.current,
        track: track.current
      };
      if (video_1.current) video_1.current.srcObject = stream;
      joinRoom();
    } catch (error) {
      alert(error.message);
    }
  };

  const joinRoom = () => {
    socket.current.emit('joinRoom', { roomName: roomName.current }, (data) => {
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
    }, async ({ params }) => {
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

      // Création d'un nouvel élément vidéo distant
      const newElem = document.createElement('div');
      newElem.setAttribute('id', `td-${remoteProducerId}`);
      newElem.setAttribute('class', 'remoteVideo');
      newElem.innerHTML = `<video id="${remoteProducerId}" autoplay class="video" style="width:100%;border-radius:10px;object-fit:cover;background:#222;min-height:120px;box-shadow:0 1px 4px #1976d222"></video>`;
      videoContainer.current.appendChild(newElem);

      const { track } = consumer;
      document.getElementById(remoteProducerId).srcObject = new MediaStream([track]);

      socket.current.emit('consumer-resume', { serverConsumerId: params.serverConsumerId });
    });
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#1976d2" }}>
        Démo SFU (Mediasoup)
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <Box sx={{ flex: 1, background: "#181818", borderRadius: 2, p: 1, boxShadow: 2 }}>
          <Typography variant="subtitle1" sx={{ color: "#fff", mb: 1 }}>Votre flux</Typography>
          <video
            ref={video_1}
            autoPlay
            style={{
              width: "100%",
              borderRadius: 10,
              background: "#222",
              minHeight: 180,
              objectFit: "cover",
              boxShadow: "0 1px 4px #1976d222"
            }}
            aria-label="Votre flux local"
          />
        </Box>
        <Box sx={{ flex: 1, background: "#181818", borderRadius: 2, p: 1, boxShadow: 2 }}>
          <Typography variant="subtitle1" sx={{ color: "#fff", mb: 1 }}>Flux distants</Typography>
          <div
            id="videoContainer"
            ref={videoContainer}
            style={{
              width: "100%",
              minHeight: 180,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "flex-end"
            }}
            aria-label="Flux distants"
          />
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ color: "#888", mt: 2 }}>
        Cette démo affiche votre flux local et tous les flux distants reçus via la SFU.
      </Typography>
    </Box>
  );
}

export default Sfu;