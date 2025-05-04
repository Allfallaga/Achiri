import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaVideo, FaPhoneSlash } from "react-icons/fa";

/**
 * VideoCall – Achiri
 * Composant d'appel vidéo universel pour chat, rooms, classes virtuelles, etc.
 * - Accessibilité, sécurité, responsive, design avancé, SEO friendly.
 * - Prêt pour extensions futures (WebRTC, sous-titres, analytics, dark mode, etc).
 */

const VideoCall = ({
  remoteStream,
  localStream,
  onEndCall,
  active = false,
  ended = false,
  userName = "Moi",
  remoteName = "Interlocuteur",
}) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <section
      className="video-call"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "1.5rem",
        maxWidth: 420,
        margin: "2rem auto",
        position: "relative",
      }}
      aria-label="Appel vidéo"
      tabIndex={0}
    >
      <h2 style={{
        color: "#1976d2",
        marginBottom: 12,
        fontWeight: 700,
        fontSize: "1.2em"
      }}>
        <FaVideo style={{ marginRight: 8 }} />
        Appel vidéo {active ? "en cours" : ended ? "terminé" : ""}
      </h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        alignItems: "center"
      }}>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            maxHeight: 220,
            borderRadius: 10,
            background: "#222",
            marginBottom: 8,
            border: "2px solid #1976d2"
          }}
          aria-label={`Vidéo de ${remoteName}`}
        />
        <span style={{
          color: "#1976d2",
          fontWeight: 600,
          fontSize: "1em"
        }}>{remoteName}</span>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: 90,
            height: 68,
            borderRadius: 8,
            background: "#333",
            position: "absolute",
            bottom: 24,
            right: 24,
            border: "2px solid #43a047"
          }}
          aria-label={`Votre vidéo (${userName})`}
        />
        <span className="sr-only">{userName}</span>
      </div>
      <div style={{
        marginTop: 24,
        display: "flex",
        justifyContent: "center",
        gap: 16
      }}>
        <button
          onClick={onEndCall}
          disabled={ended}
          aria-label="Terminer l'appel vidéo"
          title="Terminer l'appel vidéo"
          style={{
            background: "#ffebee",
            color: "#b71c1c",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            boxShadow: "0 2px 8px #b71c1c22",
            cursor: ended ? "not-allowed" : "pointer",
            outline: "none",
            transition: "background 0.2s, color 0.2s, box-shadow 0.2s"
          }}
        >
          <FaPhoneSlash />
        </button>
      </div>
      {ended && (
        <div style={{
          color: "#b71c1c",
          marginTop: 18,
          fontWeight: 600
        }}>
          Appel terminé
        </div>
      )}
    </section>
  );
};

VideoCall.propTypes = {
  remoteStream: PropTypes.object,
  localStream: PropTypes.object,
  onEndCall: PropTypes.func.isRequired,
  active: PropTypes.bool,
  ended: PropTypes.bool,
  userName: PropTypes.string,
  remoteName: PropTypes.string,
};

export default VideoCall;

/**
 * Documentation :
 * - VideoCall : composant d'appel vidéo universel (chat, rooms, classes virtuelles…).
 * - Props :
 *   - remoteStream : MediaStream distant
 *   - localStream : MediaStream local
 *   - onEndCall : fonction pour terminer l'appel
 *   - active : booléen appel en cours
 *   - ended : booléen appel terminé
 *   - userName : nom de l'utilisateur local
 *   - remoteName : nom de l'interlocuteur
 * - Accessibilité : aria-labels, sr-only, navigation clavier, responsive.
 * - Sécurité : pas d'info sensible, feedback visuel, contrôle état.
 * - Design : branding Achiri, mobile first, prêt pour extensions futures (WebRTC, sous-titres, analytics…).
 * - SEO : structure claire, aria, sr-only, responsive.
 */