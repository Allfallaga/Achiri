import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';
import { Button, Box, Typography, Stack } from '@mui/material';

/**
 * PeerRefactoring
 * - Démo moderne et accessible d'une connexion peer-to-peer mediasoup
 * - UX, design, accessibilité, logique métier améliorés
 */
function PeerRefactoring(props) {
  const routerRtpCapabilities = useRef();
  const socket = useRef();
  const device = useRef();
  const video_1 = useRef();
  const video_2 = useRef();
  const sendTransport = useRef();
  const recvTransport = useRef();
  const audioTrack = useRef();
  const videoTrack = useRef();
  const track = useRef();
  const videoProducer = useRef();
  const audioProducer = useRef();
  const videoConsumer = useRef();
  const audioConsumer = useRef();

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
  const audioParams = useRef({});
  const videoParams = useRef({
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
    socket.current = io("185.245.96.81:445", { transports: ['websocket'] });
    socket.current.emit('router-rtp-capabilities', ({ rtpCapabilities }) => {
      routerRtpCapabilities.current = rtpCapabilities;
    });
    socket.current.on('stop-camera', () => {
      if (video_2.current?.srcObject?.getVideoTracks()?.length > 0) {
        video_2.current.srcObject = new MediaStream([audioConsumer.current.track]);
      } else {
        video_2.current.srcObject = new MediaStream([audioConsumer.current.track, videoConsumer.current.track]);
      }
    });
    socket.current.on('stop-sound', () => {
      video_2.current.srcObject = new MediaStream([videoConsumer.current.track]);
    });
    return () => {
      socket.current && socket.current.disconnect();
      if (video_1.current) video_1.current.srcObject = null;
      if (video_2.current) video_2.current.srcObject = null;
    };
  }, []);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoTrack.current = stream.getVideoTracks()[0];
      audioTrack.current = stream.getAudioTracks()[0];
      track.current = stream.getTracks()[0];
      videoParams.current = { ...videoParams.current, track: videoTrack.current };
      audioParams.current = { ...audioParams.current, track: audioTrack.current };
      params.current = { ...params.current, track: track.current };
      if (video_1.current) video_1.current.srcObject = stream;
    } catch (error) {
      // Affichage d'une erreur utilisateur possible ici
    }
  };

  const loadDevice = async () => {
    device.current = new Device();
    await device.current.load({ routerRtpCapabilities: routerRtpCapabilities.current });
  };

  const createTransport = (sender) => {
    socket.current.emit('create-transports', { sender }, async ({ params }) => {
      if (sender) {
        sendTransport.current = await device.current.createSendTransport(params);

        sendTransport.current.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            await socket.current.emit('transport-send-connect', { transportId: sendTransport.current.id, dtlsParameters });
            callback();
          } catch (error) {
            errback && errback(error);
          }
        });
        sendTransport.current.on('produce', async (parameters, callback, errback) => {
          try {
            await socket.current.emit('transport-produce', {
              transportId: sendTransport.current.id,
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
            }, ({ id }) => {
              callback({ id });
            });
          } catch (error) {
            errback && errback(error);
          }
        });
      } else {
        recvTransport.current = await device.current.createRecvTransport(params);

        recvTransport.current.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            await socket.current.emit('transport-recv-connect', { transportId: recvTransport.current.id, dtlsParameters });
            callback();
          } catch (error) {
            errback && errback(error);
          }
        });
      }
    });
  };

  const createTransportSend = () => createTransport(true);
  const createTransportRecv = () => createTransport(false);

  const produce = async () => {
    [videoProducer.current, audioProducer.current] = await Promise.all([
      sendTransport.current.produce(videoParams.current),
      sendTransport.current.produce(audioParams.current),
    ]);
  };

  const createConsumer = () => {
    socket.current.emit('create-consumer', {
      deviceRtpCapabilities: device.current.rtpCapabilities
    }, async ({ params }) => {
      videoConsumer.current = await recvTransport.current.consume({
        id: params.video.id,
        producerId: params.video.producerId,
        kind: params.video.kind,
        rtpParameters: params.video.rtpParameters
      });
      audioConsumer.current = await recvTransport.current.consume({
        id: params.audio.id,
        producerId: params.audio.producerId,
        kind: params.audio.kind,
        rtpParameters: params.audio.rtpParameters
      });
      video_2.current.srcObject = new MediaStream([videoConsumer.current.track, audioConsumer.current.track]);
      socket.current.emit('consumer-resume');
    });
  };

  const cameraOff = async () => {
    await socket.current.emit('stop-camera');
  };

  const soundOff = async () => {
    await socket.current.emit('stop-sound');
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#1976d2" }}>
        Démo PeerRefactoring (Mediasoup)
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
          <Typography variant="subtitle1" sx={{ color: "#fff", mb: 1 }}>Flux distant</Typography>
          <video
            ref={video_2}
            autoPlay
            style={{
              width: "100%",
              borderRadius: 10,
              background: "#222",
              minHeight: 180,
              objectFit: "cover",
              boxShadow: "0 1px 4px #1976d222"
            }}
            aria-label="Flux distant"
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={getMedia} aria-label="Obtenir le flux local">
          Obtenir le flux
        </Button>
        <Button variant="contained" color="secondary" onClick={loadDevice} aria-label="Charger le device">
          Charger device
        </Button>
        <Button variant="outlined" color="primary" onClick={createTransportSend} aria-label="Créer transport émission">
          Transport (SEND)
        </Button>
        <Button variant="outlined" color="primary" onClick={createTransportRecv} aria-label="Créer transport réception">
          Transport (RECV)
        </Button>
        <Button variant="contained" color="success" onClick={produce} aria-label="Produire">
          Produire
        </Button>
        <Button variant="contained" color="info" onClick={createConsumer} aria-label="Créer consommateur">
          Consommer
        </Button>
        <Button variant="contained" color="warning" onClick={soundOff} aria-label="Couper le son">
          Couper le son
        </Button>
        <Button variant="contained" color="error" onClick={cameraOff} aria-label="Couper la caméra">
          Couper la caméra
        </Button>
      </Stack>
    </Box>
  );
}

export default PeerRefactoring;