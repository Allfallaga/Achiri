import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';

/**
 * Démo PeerRefactoring : logique mediasoup moderne, claire, prête à évoluer.
 */
function PeerRefactoring() {
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
      videoGoogleStartBitrate: 1000,
    },
  });
  const audioParams = useRef({});
  const videoParams = useRef({
    encodings: [
      { rid: 'r0', scalabilityMode: 'L3T3_KEY' },
      { rid: 'r1', scalabilityMode: 'L3T3_KEY' },
      { rid: 'r2', scalabilityMode: 'L3T3_KEY' },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  });

  useEffect(() => {
    socket.current = io('185.245.96.81:445', { transports: ['websocket'] });

    socket.current.emit('router-rtp-capabilities', ({ rtpCapabilities }) => {
      routerRtpCapabilities.current = rtpCapabilities;
    });

    socket.current.on('stop-camera', () => {
      if (video_2.current.srcObject?.getVideoTracks()?.length > 0) {
        video_2.current.srcObject = new MediaStream([audioConsumer.current.track]);
      } else {
        video_2.current.srcObject = new MediaStream([
          audioConsumer.current.track,
          videoConsumer.current.track,
        ]);
      }
    });

    socket.current.on('stop-sound', () => {
      video_2.current.srcObject = new MediaStream([videoConsumer.current.track]);
    });

    // Nettoyage socket à l'unmount
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

  const getMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoTrack.current = stream.getVideoTracks()[0];
        audioTrack.current = stream.getAudioTracks()[0];
        track.current = stream.getTracks()[0];
        videoParams.current = {
          ...videoParams.current,
          track: videoTrack.current,
        };
        audioParams.current = {
          ...audioParams.current,
          track: audioTrack.current,
        };
        params.current = {
          ...params.current,
          track: track.current,
        };
        video_1.current.srcObject = stream;
      })
      .catch(() => {});
  };

  const loadDevice = async () => {
    device.current = new Device();
    await device.current.load({ routerRtpCapabilities: routerRtpCapabilities.current });
  };

  const createTransport = (sender) => {
    socket.current.emit('create-transports', { sender }, async ({ params }) => {
      if (sender) {
        sendTransport.current = await device.current.createSendTransport(params);

        sendTransport.current.on('connect', async ({ dtlsParameters }, callback) => {
          await socket.current.emit('transport-send-connect', {
            transportId: sendTransport.current.id,
            dtlsParameters,
          });
          callback();
        });

        sendTransport.current.on('produce', async (parameters, callback) => {
          await socket.current.emit(
            'transport-produce',
            {
              transportId: sendTransport.current.id,
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
            },
            ({ id }) => {
              callback({ id });
            }
          );
        });
      } else {
        recvTransport.current = await device.current.createRecvTransport(params);

        recvTransport.current.on('connect', async ({ dtlsParameters }, callback) => {
          await socket.current.emit('transport-recv-connect', {
            transportId: recvTransport.current.id,
            dtlsParameters,
          });
          callback();
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
    socket.current.emit(
      'create-consumer',
      {
        deviceRtpCapabilities: device.current.rtpCapabilities,
      },
      async ({ params }) => {
        videoConsumer.current = await recvTransport.current.consume({
          id: params.video.id,
          producerId: params.video.producerId,
          kind: params.video.kind,
          rtpParameters: params.video.rtpParameters,
        });
        audioConsumer.current = await recvTransport.current.consume({
          id: params.audio.id,
          producerId: params.audio.producerId,
          kind: params.audio.kind,
          rtpParameters: params.audio.rtpParameters,
        });
        video_2.current.srcObject = new MediaStream([
          videoConsumer.current.track,
          audioConsumer.current.track,
        ]);
        socket.current.emit('consumer-resume');
      }
    );
  };

  const cameraOff = async () => {
    await socket.current.emit('stop-camera');
  };

  const soundOff = async () => {
    await socket.current.emit('stop-sound');
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
        textAlign: "center"
      }}
      aria-label="Démo PeerRefactoring mediasoup"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.5em", marginBottom: 18 }}>
        🎥 Peer Refactoring Demo
      </h2>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 24 }}>
        <div>
          <video
            ref={video_1}
            autoPlay
            style={{
              width: 260,
              height: 180,
              background: "#222",
              borderRadius: 10,
              boxShadow: "0 1px 8px #1976d211",
              marginBottom: 8
            }}
            aria-label="Votre flux local"
          />
          <div style={{ fontSize: 14, color: "#888" }}>Votre caméra</div>
        </div>
        <div>
          <video
            ref={video_2}
            autoPlay
            style={{
              width: 260,
              height: 180,
              background: "#222",
              borderRadius: 10,
              boxShadow: "0 1px 8px #1976d211",
              marginBottom: 8
            }}
            aria-label="Flux distant"
          />
          <div style={{ fontSize: 14, color: "#888" }}>Flux distant</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 18 }}>
        <button onClick={getMedia} style={btnStyle} aria-label="Activer la caméra et le micro">🎤🎥 Média</button>
        <button onClick={loadDevice} style={btnStyle} aria-label="Charger le device mediasoup">Charger Device</button>
        <button onClick={createTransportSend} style={btnStyle} aria-label="Créer transport émission">Transport SEND</button>
        <button onClick={createTransportRecv} style={btnStyle} aria-label="Créer transport réception">Transport RECV</button>
        <button onClick={produce} style={btnStyle} aria-label="Publier le flux">Publier</button>
        <button onClick={createConsumer} style={btnStyle} aria-label="Consommer le flux">Consommer</button>
        <button onClick={soundOff} style={btnStyle} aria-label="Couper le son">Mute</button>
        <button onClick={cameraOff} style={btnStyle} aria-label="Couper la caméra">Caméra</button>
      </div>
      <div style={{ color: "#888", fontSize: "0.97em", marginTop: 18 }}>
        <span role="img" aria-label="info">ℹ️</span> Démo technique mediasoup (mock, non sécurisée, non prod).
      </div>
    </div>
  );
}

const btnStyle = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "0.7em 1.3em",
  fontSize: "1em",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 8px #1976d233",
  letterSpacing: 1,
  transition: "background 0.2s, box-shadow 0.2s"
};

export default PeerRefactoring;