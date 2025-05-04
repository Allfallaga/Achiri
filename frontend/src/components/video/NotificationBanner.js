import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * NotificationBanner – Achiri
 * Affiche une notification temporaire en haut de la salle vidéo.
 * Props :
 * - notification : { type: "info"|"success"|"error"|"warning", message: string }
 * - duration : durée d'affichage en ms (optionnel, défaut 4000)
 * - onClose : callback appelé à la fermeture (optionnel)
 */

const COLORS = {
  info: "#1976d2",
  success: "#388e3c",
  error: "#d32f2f",
  warning: "#ffa000",
};

export default function NotificationBanner({ notification, duration = 4000, onClose }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [notification, duration, onClose]);

  if (!notification) return null;

  return (
    <div
      className="notification-banner"
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: 280,
        maxWidth: 480,
        background: COLORS[notification.type] || COLORS.info,
        color: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 24px #0003",
        padding: "14px 28px",
        zIndex: 2000,
        fontSize: "1.1em",
        display: "flex",
        alignItems: "center",
        gap: 12,
        animation: "fadeInDown 0.4s",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "1.3em" }}>
        {notification.type === "success" && "✅"}
        {notification.type === "error" && "❌"}
        {notification.type === "warning" && "⚠️"}
        {notification.type === "info" && "ℹ️"}
      </span>
      <span style={{ flex: 1 }}>{notification.message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Fermer la notification"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.2em",
            cursor: "pointer",
            marginLeft: 8,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

NotificationBanner.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(["info", "success", "error", "warning"]),
    message: PropTypes.string.isRequired,
  }),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
