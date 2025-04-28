import React, { useRef, useEffect } from "react";

/**
 * MediaAdmin
 * - Affiche le flux vidéo/audio pour l'admin ou un membre
 * - Moderne, accessible, robuste
 */
function MediaAdmin({ imAdmin, stream, video: videoTrack, audio: audioTrack }) {
  const videoRef = useRef();

  useEffect(() => {
    let mediaStream = new MediaStream();

    if (imAdmin && stream) {
      const tracks = stream.getVideoTracks();
      if (tracks.length > 0) {
        mediaStream.addTrack(tracks[0]);
      }
    } else {
      if (videoTrack) mediaStream.addTrack(videoTrack);
      if (audioTrack) mediaStream.addTrack(audioTrack);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }

    return () => {
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [imAdmin, stream, videoTrack, audioTrack]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        width: "100%",
        borderRadius: 10,
        background: "#111",
        minHeight: 180,
        objectFit: "cover",
        boxShadow: "0 2px 12px #0003"
      }}
      aria-label={imAdmin ? "Flux vidéo administrateur" : "Flux vidéo membre"}
    />
  );
}

export default MediaAdmin;