import React, { useEffect, useRef, useState } from "react";
import {
  IoVolumeMuteSharp,
  IoVideocamOffSharp,
  IoVideocam,
  IoVolumeHighSharp,
} from "react-icons/io5";

/**
 * MediaRcv
 * - Affiche le flux média reçu (vidéo/audio)
 * - Permet de couper/activer la vidéo et l'audio
 * - Moderne, accessible, robuste
 */
function MediaRcv({ video: videoTrack, audio: audioTrack }) {
  const videoRef = useRef();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Attache les tracks au composant vidéo
  useEffect(() => {
    const stream = new MediaStream();
    if (videoTrack?.track) stream.addTrack(videoTrack.track);
    if (audioTrack?.track) stream.addTrack(audioTrack.track);
    if (videoRef.current) videoRef.current.srcObject = stream;
    return () => {
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [videoTrack, audioTrack]);

  // Toggle vidéo
  const toggleVideo = () => {
    const tracks = videoRef.current?.srcObject?.getVideoTracks();
    if (tracks && tracks[0]) {
      tracks[0].enabled = !tracks[0].enabled;
      setVideoEnabled(tracks[0].enabled);
    }
  };

  // Toggle audio
  const toggleSound = () => {
    const tracks = videoRef.current?.srcObject?.getAudioTracks();
    if (tracks && tracks[0]) {
      tracks[0].enabled = !tracks[0].enabled;
      setAudioEnabled(tracks[0].enabled);
    }
  };

  return (
    <div className="media-rcv-container" style={{ position: "relative", width: "100%" }}>
      <div
        className="moderation-controls-container"
        style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}
        aria-label="Contrôles de modération"
      >
        <div className="moderation-controls" style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={toggleSound}
            className={`moderation-icon-control icon-mute ${audioEnabled ? "active" : "inactive"}`}
            title={audioEnabled ? "Couper le son" : "Activer le son"}
            aria-label={audioEnabled ? "Couper le son" : "Activer le son"}
            tabIndex={0}
            style={{
              cursor: "pointer",
              fontSize: 22,
              background: "none",
              border: "none",
              padding: 0,
              color: "inherit",
              outline: "none"
            }}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleSound()}
          >
            {audioEnabled ? <IoVolumeHighSharp /> : <IoVolumeMuteSharp />}
          </button>
          <button
            type="button"
            onClick={toggleVideo}
            className={`moderation-icon-control icon-video ${videoEnabled ? "active" : "inactive"}`}
            title={videoEnabled ? "Couper la vidéo" : "Activer la vidéo"}
            aria-label={videoEnabled ? "Couper la vidéo" : "Activer la vidéo"}
            tabIndex={0}
            style={{
              cursor: "pointer",
              fontSize: 22,
              background: "none",
              border: "none",
              padding: 0,
              color: "inherit",
              outline: "none"
            }}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleVideo()}
          >
            {videoEnabled ? <IoVideocam /> : <IoVideocamOffSharp />}
          </button>
        </div>
      </div>
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
        }}
        aria-label="Vidéo reçue"
      />
    </div>
  );
}

export default MediaRcv;