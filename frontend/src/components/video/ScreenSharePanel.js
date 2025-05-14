import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * ScreenSharePanel – Achiri
 * Permet à l'utilisateur de partager son écran dans une salle vidéo.
 * - Props : onClose (callback), onStart (callback), onStop (callback), isOwner, currentUser, roomId
 * - Accessibilité, sécurité, responsive, design avancé.
 */

export default function ScreenSharePanel({
  onClose,
  onStart,
  onStop,
  isOwner = false,
  currentUser,
  roomId,
}) {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Démarrer le partage d'écran
  const handleStartShare = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsSharing(true);
      if (onStart) onStart(stream);
      // Arrêt auto si l'utilisateur stoppe le partage via le navigateur
      stream.getVideoTracks()[0].onended = () => handleStopShare();
    } catch (err) {
      setError("Impossible de démarrer le partage d'écran.");
    }
  };

  // Arrêter le partage d'écran
  const handleStopShare = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsSharing(false);
    if (onStop) onStop();
  };

  // Nettoyage à la fermeture du panel
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      className="screen-share-panel"
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#fff",
        color: "#222",
        borderRadius: 16,
        boxShadow: "0 4px 32px #0002",
        padding: 24,
        minWidth: 320,
        maxWidth: 480,
        width: "90vw",
        outline: "none",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Partage d'écran"
      tabIndex={-1}
    >
      <h2 style={{ marginTop: 0, fontSize: "1.4em" }}>Partage d'écran</h2>
      {error && (
        <div role="alert" style={{ color: "red", marginBottom: 12 }}>
          {error}
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        {!isSharing ? (
          <button
            onClick={handleStartShare}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              fontSize: "1em",
              cursor: "pointer",
              marginRight: 10,
            }}
            aria-label="Démarrer le partage d'écran"
            autoFocus
          >
            Démarrer le partage d'écran
          </button>
        ) : (
          <button
            onClick={handleStopShare}
            style={{
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 18px",
              fontSize: "1em",
              cursor: "pointer",
              marginRight: 10,
            }}
            aria-label="Arrêter le partage d'écran"
          >
            Arrêter le partage d'écran
          </button>
        )}
        <button
          onClick={onClose}
          style={{
            background: "#eee",
            color: "#222",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            fontSize: "1em",
            cursor: "pointer",
          }}
          aria-label="Fermer le panel de partage d'écran"
        >
          Fermer
        </button>
      </div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            minHeight: 180,
            background: "#222",
            borderRadius: 8,
            display: isSharing ? "block" : "none",
          }}
          aria-label="Aperçu du partage d'écran"
        />
        {!isSharing && (
          <div
            style={{
              width: "100%",
              minHeight: 180,
              background: "#f5f5f5",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              fontStyle: "italic",
            }}
            aria-hidden="true"
          >
            Aucun partage en cours
          </div>
        )}
      </div>
      <div style={{ marginTop: 16, fontSize: "0.95em", color: "#555" }}>
        {isOwner && (
          <div>
            <strong>Vous êtes propriétaire de la room.</strong>
            <br />
            Vous pouvez partager votre écran avec tous les participants.
          </div>
        )}
        <div>
          <strong>Conseil :</strong> Pour une meilleure expérience, partagez
          uniquement la fenêtre ou l’onglet nécessaire.
        </div>
      </div>
    </div>
  );
}

ScreenSharePanel.propTypes = {
  onClose: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  isOwner: PropTypes.bool,
  currentUser: PropTypes.any,
  roomId: PropTypes.any,
};
