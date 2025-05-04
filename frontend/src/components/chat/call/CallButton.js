import React from "react";
import PropTypes from "prop-types";
import { FaPhone, FaVideo, FaPhoneSlash } from "react-icons/fa";

/**
 * CallButton – Achiri
 * Bouton d'appel audio/vidéo universel pour chat, rooms, classes virtuelles, etc.
 * - Accessibilité, sécurité, responsive, design avancé, SEO friendly.
 * - Prêt pour extensions futures (statut, analytics, dark mode, badges, etc).
 */

const CallButton = ({
  type = "audio", // "audio" ou "video"
  onClick,
  disabled = false,
  active = false,
  ended = false,
  label,
  ...props
}) => {
  let icon, color, ariaLabel;
  if (ended) {
    icon = <FaPhoneSlash />;
    color = "#b71c1c";
    ariaLabel = "Terminer l'appel";
  } else if (type === "video") {
    icon = <FaVideo />;
    color = active ? "#1976d2" : "#555";
    ariaLabel = label || "Appel vidéo";
  } else {
    icon = <FaPhone />;
    color = active ? "#43a047" : "#555";
    ariaLabel = label || "Appel audio";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={ariaLabel}
      style={{
        background: ended
          ? "#ffebee"
          : active
          ? "#e3f2fd"
          : "#fff",
        color,
        border: "none",
        borderRadius: "50%",
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: active
          ? "0 0 0 3px #1976d244"
          : "0 2px 8px #1976d211",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
        fontSize: 22,
        margin: 4,
        position: "relative",
      }}
      tabIndex={0}
      {...props}
    >
      {icon}
      <span className="sr-only">{ariaLabel}</span>
      {/* Badge ou statut futur */}
      {active && !ended && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 10,
            height: 10,
            background: "#43a047",
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 0 4px #43a04788",
          }}
          aria-label="Appel en cours"
        />
      )}
      {ended && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 10,
            height: 10,
            background: "#b71c1c",
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 0 4px #b71c1c88",
          }}
          aria-label="Appel terminé"
        />
      )}
    </button>
  );
};

CallButton.propTypes = {
  type: PropTypes.oneOf(["audio", "video"]),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  ended: PropTypes.bool,
  label: PropTypes.string,
};

export default CallButton;

/**
 * Documentation :
 * - CallButton : bouton universel pour lancer/terminer un appel audio ou vidéo.
 * - Props :
 *   - type : "audio" ou "video"
 *   - onClick : fonction appelée au clic
 *   - disabled : désactive le bouton
 *   - active : indique si l'appel est en cours
 *   - ended : indique si l'appel est terminé
 *   - label : texte d'accessibilité personnalisé
 * - Accessibilité : aria-label, sr-only, focus visible, responsive, compatible clavier.
 * - Sécurité : pas d'info sensible, feedback visuel, contrôle état.
 * - Design : branding Achiri, mobile first, prêt pour badges/statut/extensions.
 * - SEO : structure claire, aria, sr-only, responsive.
 */