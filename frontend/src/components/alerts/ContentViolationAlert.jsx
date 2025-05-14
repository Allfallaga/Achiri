import React from "react";

/**
 * ContentViolationAlert – Achiri
 * Alerte d’infraction au contenu : modération, sécurité, feedback utilisateur.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage d’alerte, détails, actions, mobile/web.
 * - Prêt pour extensions futures (signalement, analytics, dark mode, etc).
 *
 * Props :
 *   message: string (message principal)
 *   details?: string (détails complémentaires)
 *   onAcknowledge?: function (callback sur fermeture)
 */

const ContentViolationAlert = ({
  message = "Contenu non conforme détecté.",
  details = "",
  onAcknowledge,
}) => {
  return (
    <section
      className="content-violation-alert"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff3e0",
        border: "1.5px solid #ff9800",
        borderRadius: 14,
        boxShadow: "0 2px 16px #ff980022",
        padding: "1.5rem",
        color: "#b71c1c",
        outline: "none",
      }}
      aria-label="Alerte de contenu non conforme"
      tabIndex={0}
      role="alertdialog"
      aria-modal="true"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span role="img" aria-label="Alerte">
          ⚠️
        </span>
        <h3 style={{ margin: 0, fontSize: 20, color: "#b71c1c" }}>
          Alerte de contenu
        </h3>
      </div>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>{message}</div>
      {details && (
        <div style={{ fontSize: 15, color: "#b26a00", marginBottom: 12 }}>
          {details}
        </div>
      )}
      <button
        onClick={onAcknowledge}
        style={{
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "0.6em 1.4em",
          fontWeight: "bold",
          fontSize: 15,
          cursor: "pointer",
          marginTop: 8,
          transition: "background 0.2s",
        }}
        aria-label="Fermer l’alerte"
        autoFocus
      >
        J’ai compris
      </button>
      <footer
        style={{
          marginTop: 16,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center",
        }}
      >
        <span role="img" aria-label="sécurité">
          🔒
        </span>{" "}
        Sécurisé |{" "}
        <span role="img" aria-label="accessibilité">
          ♿
        </span>{" "}
        Accessible |{" "}
        <span role="img" aria-label="mobile">
          📱
        </span>{" "}
        Mobile/Web
      </footer>
    </section>
  );
};

export default ContentViolationAlert;

/**
 * Documentation :
 * - Alerte d’infraction au contenu : message, détails, action utilisateur.
 * - Accessibilité : aria-labels, role alertdialog, navigation clavier, responsive.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
