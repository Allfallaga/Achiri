/**
 * VideoCall.js – Achiri
 * Composant d'appel vidéo simple, moderne, inclusif et sécurisé.
 * - WebRTC natif, mobile/web, accessibilité avancée (aria, clavier, TTS, langue des signes, sous-titres), SEO, design Achiri.
 * - Prêt pour extensions (modération, analytics, badges, points, dark mode…).
 * - Props : localStream, remoteStream, onEnd, user, targetUser, subtitles, signLanguage
 */

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import "../../styles/videocall.css";

function VideoCall({
  localStream,
  remoteStream,
  onEnd,
  user,
  targetUser,
  subtitles = null,
  signLanguage = null,
  ttsEnabled = false,
  speak = null,
  badges = [],
  points = 0,
  darkMode = false
}) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // SEO & dark mode
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Clean up video streams on unmount
  useEffect(() => {
    return () => {
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    };
  }, []);

  // Contrôles accessibilité
  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const tracks = localVideoRef.current.srcObject.getVideoTracks();
      if (tracks[0]) {
        tracks[0].enabled = !tracks[0].enabled;
        setVideoEnabled(tracks[0].enabled);
        if (ttsEnabled && speak) speak(tracks[0].enabled ? "Caméra activée" : "Caméra désactivée");
      }
    }
  };
  const toggleAudio = () => {
    if (localVideoRef.current?.srcObject) {
      const tracks = localVideoRef.current.srcObject.getAudioTracks();
      if (tracks[0]) {
        tracks[0].enabled = !tracks[0].enabled;
        setAudioEnabled(tracks[0].enabled);
        if (ttsEnabled && speak) speak(tracks[0].enabled ? "Micro activé" : "Micro coupé");
      }
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
      className={`video-call${darkMode ? " dark" : ""}`}
      style={{
        position: 'relative',
        background: darkMode ? '#181c24' : '#222',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d244',
        padding: 0,
        width: 420,
        height: 320,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Appel vidéo en cours"
      tabIndex={0}
    >
      <Helmet>
        <title>Appel vidéo | Achiri</title>
        <meta name="description" content="Appel vidéo sécurisé Achiri : flux local/dist, avatars, accessibilité, mobile/web." />
      </Helmet>
      {/* Remote video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          background: '#111',
          objectFit: 'cover',
        }}
        aria-label="Vidéo distante"
        tabIndex={0}
      />
      {/* Local video as thumbnail */}
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          width: 90,
          height: 68,
          borderRadius: 10,
          border: '2px solid #fff',
          objectFit: 'cover',
          boxShadow: '0 2px 8px #0005'
        }}
        aria-label="Votre vidéo (muet)"
        tabIndex={0}
      />
      {/* User info */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 16,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.35)',
        borderRadius: 8,
        padding: '2px 10px'
      }}>
        <span
          style={{ fontSize: 22, marginRight: 8 }}
          aria-label={targetUser?.name ? `Avatar de ${targetUser.name}` : "Avatar invité"}
        >
          {targetUser?.avatar || '👤'}
        </span>
        <span style={{ color: '#fff', fontWeight: 'bold' }}>
          {targetUser?.name || 'Invité'}
        </span>
        {renderBadges()}
        {points > 0 && (
          <span className="points" aria-label={`Points: ${points}`} style={{
            marginLeft: 8, color: "#ffd600", fontWeight: 600, fontSize: "0.98em"
          }}>{points} pts</span>
        )}
      </div>
      {/* Contrôles accessibilité */}
      <div
        className="videocall-controls"
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          display: 'flex',
          gap: 10,
          zIndex: 2
        }}
        aria-label="Contrôles accessibilité"
      >
        <button
          onClick={toggleAudio}
          aria-label={audioEnabled ? "Couper le micro" : "Activer le micro"}
          title={audioEnabled ? "Couper le micro" : "Activer le micro"}
          style={{
            background: audioEnabled ? "#fff" : "#ffcdd2",
            color: audioEnabled ? "#222" : "#b71c1c",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 0.8em",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer"
          }}
        >
          {audioEnabled ? "🔊" : "🔇"}
        </button>
        <button
          onClick={toggleVideo}
          aria-label={videoEnabled ? "Désactiver la caméra" : "Activer la caméra"}
          title={videoEnabled ? "Désactiver la caméra" : "Activer la caméra"}
          style={{
            background: videoEnabled ? "#fff" : "#ffcdd2",
            color: videoEnabled ? "#222" : "#b71c1c",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 0.8em",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer"
          }}
        >
          {videoEnabled ? "🎥" : "📷"}
        </button>
      </div>
      {/* Sous-titres temps réel */}
      {subtitles && (
        <div
          className="videocall-subtitles"
          aria-live="polite"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 90,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            fontSize: '1.1em',
            padding: '4px 12px',
            borderRadius: 8,
            textAlign: 'center'
          }}
        >
          {subtitles}
        </div>
      )}
      {/* Fenêtre langue des signes */}
      {signLanguage && (
        <div
          className="videocall-signlanguage"
          aria-label="Langue des signes"
          style={{
            position: 'absolute',
            left: 16,
            bottom: 100,
            background: 'rgba(255,255,255,0.8)',
            borderRadius: 10,
            padding: 6,
            zIndex: 3
          }}
        >
          {signLanguage}
        </div>
      )}
      {/* Hang up button */}
      <button
        onClick={onEnd}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: '#ffcdd2',
          color: '#b71c1c',
          border: 'none',
          borderRadius: 8,
          padding: '0.5em 1.2em',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0002'
        }}
        aria-label="Raccrocher l'appel"
        title="Raccrocher l'appel"
        autoFocus
      >
        ✖
      </button>
      <footer
        className="videocall-footer"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.25)",
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
    </div>
  );
}

VideoCall.propTypes = {
  localStream: PropTypes.object,
  remoteStream: PropTypes.object,
  onEnd: PropTypes.func.isRequired,
  user: PropTypes.object,
  targetUser: PropTypes.object,
  subtitles: PropTypes.node,
  signLanguage: PropTypes.node,
  ttsEnabled: PropTypes.bool,
  speak: PropTypes.func,
  badges: PropTypes.array,
  points: PropTypes.number,
  darkMode: PropTypes.bool
};

export default VideoCall;

/**
 * Documentation :
 * - Props : localStream, remoteStream, onEnd, user, targetUser, subtitles (JSX), signLanguage (JSX), ttsEnabled, speak, badges, points, darkMode
 * - Affiche flux local/dist, avatars, nom, badges, points, contrôle mute/caméra, sous-titres, langue des signes.
 * - Accessible (aria, clavier, contraste), SEO via Helmet, mobile responsive, dark mode.
 * - Sécurité : pas d’info sensible, contrôle clavier, feedback visuel.
 * - À enrichir avec TTS, modération, analytics, intégration accessibilité avancée.
 */