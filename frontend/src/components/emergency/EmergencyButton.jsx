import React, { useState } from "react";

/**
 * EmergencyButton – Achiri
 * Bouton d’alerte d’urgence universel : accessibilité, sécurité, mobile/web, feedback.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : envoi d’alerte (simulation), feedback visuel, confirmation, mobile/web.
 * - Prêt pour extensions futures (vrai envoi, analytics, dark mode, etc).
 *
 * Props :
 *   onTrigger?: function (callback lors de l’alerte)
 *   label?: string (texte du bouton)
 *   disabled?: bool
 */

const EmergencyButton = ({
  onTrigger,
  label = "Alerte d’Urgence",
  disabled = false
}) => {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleClick = () => {
    if (disabled || sending) return;
    setSending(true);
    setFeedback("");
    // Simulation d’envoi d’alerte
    setTimeout(() => {
      setSending(false);
      setFeedback("Alerte d’urgence envoyée !");
      onTrigger && onTrigger();
      setTimeout(() => setFeedback(""), 2000);
    }, 1500);
  };

  return (
    <div
      className="emergency-button"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2rem auto",
        maxWidth: 320
      }}
      aria-label="Bouton d’alerte d’urgence"
      tabIndex={0}
    >
      <button
        onClick={handleClick}
        disabled={disabled || sending}
        style={{
          background: disabled ? "#bdbdbd" : "#b71c1c",
          color: "#fff",
          border: "none",
          borderRadius: 14,
          padding: "1em 2.2em",
          fontWeight: "bold",
          fontSize: "1.2em",
          boxShadow: "0 2px 16px #b71c1c33",
          cursor: disabled || sending ? "not-allowed" : "pointer",
          outline: sending ? "2px solid #b71c1c" : "none",
          transition: "background 0.2s"
        }}
        aria-label={label}
        aria-busy={sending}
        aria-disabled={disabled || sending}
        autoFocus
      >
        <span role="img" aria-label="urgence" style={{ marginRight: 8 }}>🚨</span>
        {sending ? "Envoi..." : label}
      </button>
      {feedback && (
        <div
          style={{
            color: "#388e3c",
            fontWeight: 500,
            marginTop: 14,
            fontSize: 16
          }}
          aria-live="polite"
          tabIndex={0}
        >
          {feedback}
        </div>
      )}
      <footer
        style={{
          marginTop: 16,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
    </div>
  );
};

export default EmergencyButton;

/**
 * Documentation :
 * - Bouton d’alerte d’urgence : envoi simulé, feedback, accessibilité, mobile/web.
 * - Accessibilité : aria-labels, aria-busy, aria-disabled, navigation clavier, responsive.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */