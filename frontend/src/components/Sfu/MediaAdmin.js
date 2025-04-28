import React, { useRef, useEffect } from 'react';

/**
 * Composant vidéo pour l'admin SFU.
 * Optimisé, logique claire et accessible.
 */
function MediaAdmin({ imAdmin, stream, video, audio }) {
  const videoRef = useRef();

  useEffect(() => {
    let mediaStream = new MediaStream();

    if (imAdmin && stream) {
      // Admin : affiche uniquement la vidéo principale du stream
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) mediaStream.addTrack(videoTrack);
    } else {
      // Non admin : affiche vidéo et/ou audio reçus
      if (video) mediaStream.addTrack(video);
      if (audio) mediaStream.addTrack(audio);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = (mediaStream.getTracks().length > 0) ? mediaStream : null;
    }
  }, [imAdmin, stream, video, audio]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        width: "100%",
        maxWidth: 420,
        borderRadius: 12,
        background: "#111",
        boxShadow: "0 2px 8px #0003",
        outline: "none"
      }}
      aria-label={imAdmin ? "Vidéo principale (admin)" : "Vidéo reçue"}
      tabIndex={0}
    />
  );
}

export default MediaAdmin;