/**
 * MediaRcv.js – Achiri
 * Composant de réception et contrôle du flux média (vidéo/audio) pour Achiri.
 * - Affiche le flux vidéo/audio reçu, permet de couper/activer chaque flux.
 * - Accessible (clavier, aria), sécurisé, compatible mobile/web, design moderne.
 * - Prêt pour intégration modération, sous-titres, langue des signes, analytics.
 * - Documentation claire, SEO friendly, responsive, dark mode.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  IoVolumeMuteSharp,
  IoVideocamOffSharp,
  IoVideocam,
  IoVolumeHighSharp,
} from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import "../../styles/mediaRcv.css";

function MediaRcv({
  video: videoTrack,
  audio: audioTrack,
  showControls = true,
  subtitles = null,
  signLanguage = null,
  darkMode = false,
  onMute = null,
  onVideoOff = null,
  user = null,
  badges = [],
  points = 0,
}) {
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
      if (onVideoOff) onVideoOff(tracks[0].enabled);
    }
  };

  // Toggle audio
  const toggleSound = () => {
    const tracks = videoRef.current?.srcObject?.getAudioTracks();
    if (tracks && tracks[0]) {
      tracks[0].enabled = !tracks[0].enabled;
      setAudioEnabled(tracks[0].enabled);
      if (onMute) onMute(tracks[0].enabled);
    }
  };

  // Affichage badges et points
  const renderBadges = () =>
    Array.isArray(badges) && badges.length > 0
      ? badges.map((b) => (
          <span key={b} className="badge" aria-label={`Badge ${b}`} style={{
            marginLeft: 4, background: "#e3f2fd", color: "#1976d2", borderRadius: 6, padding: "0 6px", fontSize: "0.95em"
          }}>{b}</span>
        ))
      : null;

  return (
    <div
      className={`media-rcv-container${darkMode ? " dark" : ""}`}
      style={{
        position: "relative",
        width: "100%",
        background: darkMode ? "#181c24" : "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px #1976d244",
        overflow: "hidden"
      }}
      aria-label="Flux média reçu"
      tabIndex={0}
    >
      <Helmet>
        <title>Flux vidéo/audio reçu | Achiri</title>
        <meta name="description" content="Composant de réception vidéo/audio Achiri : contrôle, accessibilité, modération, mobile/web." />
      </Helmet>
      {/* Infos utilisateur */}
      {user && (
        <div
          className="media-rcv-userinfo"
          style={{
            position: "absolute",
            top: 10,
            left: 16,
            display: "flex",
            alignItems: "center",
            background: "rgba(0,0,0,0.35)",
            borderRadius: 8,
            padding: "2px 10px",
            zIndex: 3
          }}
        >
          <span
            style={{ fontSize: 20, marginRight: 8 }}
            aria-label={user?.name ? `Avatar de ${user.name}` : "Avatar invité"}
          >
            {user?.avatar || "👤"}
          </span>
          <span style={{ color: "#fff", fontWeight: "bold" }}>
            {user?.name || "Invité"}
          </span>
          {renderBadges()}
          {points > 0 && (
            <span className="points" aria-label={`Points: ${points}`} style={{
              marginLeft: 8, color: "#ffd600", fontWeight: 600, fontSize: "0.98em"
            }}>{points} pts</span>
          )}
        </div>
      )}
      {/* Contrôles modération */}
      {showControls && (
        <div
          className="moderation-controls-container"
          style={{ position: "absolute", top: 10, right: 16, zIndex: 2 }}
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
      )}
      {/* Flux vidéo */}
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
        tabIndex={0}
      />
      {/* Sous-titres temps réel */}
      {subtitles && (
        <div
          className="media-rcv-subtitles"
          aria-live="polite"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 70,
            background: darkMode ? "rgba(24,28,36,0.95)" : "rgba(255,255,255,0.95)",
            color: darkMode ? "#ffd600" : "#222",
            borderRadius: 8,
            fontSize: "1.08em",
            padding: "4px 12px",
            textAlign: "center",
            zIndex: 10
          }}
        >
          {subtitles}
        </div>
      )}
      {/* Fenêtre langue des signes */}
      {signLanguage && (
        <div
          className="media-rcv-signlanguage"
          aria-label="Langue des signes"
          style={{
            position: "absolute",
            left: 16,
            bottom: 80,
            background: "rgba(255,255,255,0.8)",
            borderRadius: 10,
            padding: 6,
            zIndex: 11
          }}
        >
          {signLanguage}
        </div>
      )}
      <footer
        className="media-rcv-footer"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.18)",
          color: "#fff",
          fontSize: "0.85em",
          textAlign: "center",
          padding: "2px 0"
        }}
      >
        <small>
          <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
        </small>
      </footer>
      <style>{`
        .media-rcv-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .media-rcv-container {
            font-size: 1em;
            min-width: 98vw;
            border-radius: 7px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .media-rcv-container {
            background: #181c24 !important;
            color: #ffd600 !important;
          }
        }
      `}</style>
    </div>
  );
}

MediaRcv.propTypes = {
  video: PropTypes.object,
  audio: PropTypes.object,
  showControls: PropTypes.bool,
  subtitles: PropTypes.node,
  signLanguage: PropTypes.node,
  darkMode: PropTypes.bool,
  onMute: PropTypes.func,
  onVideoOff: PropTypes.func,
  user: PropTypes.object,
  badges: PropTypes.array,
  points: PropTypes.number,
};

export default MediaRcv;

/**
 * Documentation :
 * - Props : video (track), audio (track), showControls (bool), subtitles (JSX), signLanguage (JSX), darkMode (bool), onMute, onVideoOff, user, badges, points
 * - Affiche le flux vidéo/audio reçu, contrôle mute/caméra, badges, points, sous-titres/langue des signes.
 * - Accessible (clavier, aria), SEO via Helmet, mobile responsive, dark mode.
 * - Sécurité : pas d’info sensible, contrôle clavier, feedback visuel.
 * - À enrichir avec modération avancée, analytics, intégration accessibilité.
 */