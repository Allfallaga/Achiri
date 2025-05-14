import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaVideo, FaPhoneSlash } from "react-icons/fa";
import "../../i18n"; // Assure-toi que i18n est importé une fois dans ton app

/**
 * CallButton – Achiri
 * Boutons d'appel audio et vidéo pour chat privé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Focus visible, aria, dark mode, mobile first.
 * - Prêt pour extensions futures (statut, badge, analytics, etc).
 *
 * Props :
 * - onCall(type) : fonction appelée avec 'audio' ou 'video'
 * - disabled : désactive les boutons
 * - inCall : booléen, indique si un appel est en cours
 * - onEndCall : fonction pour terminer l'appel (optionnel)
 * - type : 'audio' | 'video' | null (pour afficher l'état actif)
 */

function CallButton({
  onCall,
  disabled = false,
  inCall = false,
  onEndCall,
  type = null,
}) {
  const { t } = useTranslation();

  return (
    <div
      className="call-buttons"
      style={{ display: "flex", gap: 10, margin: "0.5em 0" }}
      aria-label={t("callActions") || "Actions d'appel"}
      tabIndex={0}
    >
      <button
        onClick={() => onCall("audio")}
        className={`call-btn call-btn-audio${type === "audio" && inCall ? " active" : ""}`}
        style={{
          background:
            type === "audio" && inCall
              ? "linear-gradient(90deg, #43a047 0%, #1976d2 100%)"
              : "linear-gradient(90deg, #e3f2fd 0%, #b2dfdb 100%)",
          color: type === "audio" && inCall ? "#fff" : "#1976d2",
          border: "none",
          borderRadius: 8,
          padding: "0.5em 1.1em",
          fontWeight: "bold",
          fontSize: "1em",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: "0 2px 8px #1976d222",
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: disabled ? 0.6 : 1,
          transition: "background 0.2s, color 0.2s",
        }}
        aria-label={t("audioCall") || "Appel audio"}
        title={t("audioCall") || "Appel audio"}
        tabIndex={0}
        disabled={disabled || inCall}
      >
        <FaPhoneAlt aria-hidden="true" /> {t("audio") || "Audio"}
      </button>
      <button
        onClick={() => onCall("video")}
        className={`call-btn call-btn-video${type === "video" && inCall ? " active" : ""}`}
        style={{
          background:
            type === "video" && inCall
              ? "linear-gradient(90deg, #1976d2 0%, #43a047 100%)"
              : "linear-gradient(90deg, #e3f2fd 0%, #b2dfdb 100%)",
          color: type === "video" && inCall ? "#fff" : "#1976d2",
          border: "none",
          borderRadius: 8,
          padding: "0.5em 1.1em",
          fontWeight: "bold",
          fontSize: "1em",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: "0 2px 8px #1976d222",
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: disabled ? 0.6 : 1,
          transition: "background 0.2s, color 0.2s",
        }}
        aria-label={t("videoCall") || "Appel vidéo"}
        title={t("videoCall") || "Appel vidéo"}
        tabIndex={0}
        disabled={disabled || inCall}
      >
        <FaVideo aria-hidden="true" /> {t("video") || "Vidéo"}
      </button>
      {inCall && onEndCall && (
        <button
          onClick={onEndCall}
          className="call-btn call-btn-end"
          style={{
            background: "#ffebee",
            color: "#b71c1c",
            border: "none",
            borderRadius: 8,
            padding: "0.5em 1.1em",
            fontWeight: "bold",
            fontSize: "1em",
            cursor: "pointer",
            boxShadow: "0 2px 8px #b71c1c22",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 8,
            transition: "background 0.2s, color 0.2s",
          }}
          aria-label={t("endCall") || "Terminer l'appel"}
          title={t("endCall") || "Terminer l'appel"}
          tabIndex={0}
        >
          <FaPhoneSlash aria-hidden="true" /> {t("end") || "Fin"}
        </button>
      )}
      <style>{`
        .call-btn:focus {
          outline: 2px solid #ffd600;
        }
        .call-btn:hover {
          filter: brightness(1.08);
        }
        .call-btn.active {
          box-shadow: 0 0 0 3px #1976d2aa;
        }
        @media (max-width: 600px) {
          .call-buttons {
            flex-direction: column;
            gap: 8px;
          }
          .call-btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (prefers-color-scheme: dark) {
          .call-btn {
            background: linear-gradient(90deg, #223366 0%, #43a047 100%) !important;
            color: #ffd600 !important;
          }
          .call-btn-end {
            background: #b71c1c !important;
            color: #fff !important;
          }
        }
      `}</style>
    </div>
  );
}

CallButton.propTypes = {
  onCall: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  inCall: PropTypes.bool,
  onEndCall: PropTypes.func,
  type: PropTypes.oneOf(["audio", "video", null]),
};

export default CallButton;

/**
 * Documentation :
 * - CallButton : boutons appel audio/vidéo, focus visible, aria, dark mode, responsive.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 * - Props :
 *    - onCall(type) : callback pour lancer un appel audio/vidéo
 *    - disabled : désactive les boutons
 *    - inCall : booléen, indique si un appel est en cours
 *    - onEndCall : callback pour terminer l'appel (optionnel)
 *    - type : 'audio' | 'video' | null (pour état actif)
 */
