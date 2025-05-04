import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPhone, FaPhoneSlash } from "react-icons/fa";

/**
 * AudioCall – Achiri
 * Composant d'appel audio universel pour chat, rooms, classes virtuelles, etc.
 * - Accessibilité, sécurité, responsive, design avancé, SEO friendly.
 * - Prêt pour extensions futures (WebRTC, sous-titres, analytics, dark mode, etc).
 */

const AudioCall = ({
  remoteStream,
  localStream,
  onEndCall,
  active = false,
  ended = false,
  userName = "Moi",
  remoteName = "Interlocuteur",
}) => {
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    if (localAudioRef.current && localStream) {
      localAudioRef.current.srcObject = localStream;
    }
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <section
      className="audio-call"
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
      aria-label="Appel audio"
      tabIndex={0}
    >
      <h2 style={{
        color: "#1976d2",
        marginBottom: 12,
        fontWeight: 700,
        fontSize: "1.2em"
      }}>
        <FaPhone style={{ marginRight: 8 }} />
        Appel audio {active ? "en cours" : ended ? "terminé" : ""}
      </h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        alignItems: "center"
      }}>
        <audio
          ref={remoteAudioRef}
          autoPlay
          controls={false}
          style={{ display: "none" }}
          aria-label={`Audio de ${remoteName}`}
        />
        <span style={{
          color: "#1976d2",
          fontWeight: 600,
          fontSize: "1em"
        }}>{remoteName}</span>
        <audio
          ref={localAudioRef}
          autoPlay
          controls={false}
          muted
          style={{ display: "none" }}
          aria-label={`Votre audio (${userName})`}
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
          aria-label="Terminer l'appel audio"
          title="Terminer l'appel audio"
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

AudioCall.propTypes = {
  remoteStream: PropTypes.object,
  localStream: PropTypes.object,
  onEndCall: PropTypes.func.isRequired,
  active: PropTypes.bool,
  ended: PropTypes.bool,
  userName: PropTypes.string,
  remoteName: PropTypes.string,
};

export default AudioCall;

/**
 * Documentation :
 * - AudioCall : composant d'appel audio universel (chat, rooms, classes virtuelles…).
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
 * - Design : branding Achiri, mobile first, prêt pour extensions futures (WebRTC, analytics…).
 * - SEO : structure claire, aria, sr-only, responsive.
 */