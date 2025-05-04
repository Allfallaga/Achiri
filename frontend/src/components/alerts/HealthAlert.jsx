import React from "react";

/**
 * HealthAlert – Achiri
 * Alerte santé/bien-être : prévention, sécurité, feedback utilisateur.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage d’alerte, conseils, actions, mobile/web.
 * - Prêt pour extensions futures (signalement, analytics, dark mode, etc).
 *
 * Props :
 *   message: string (message principal)
 *   advice?: string (conseil ou ressource)
 *   onAcknowledge?: function (callback sur fermeture)
 */

const HealthAlert = ({
  message = "Attention à votre bien-être.",
  advice = "",
  onAcknowledge
}) => {
  return (
    <section
      className="health-alert"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#e3fcec",
        border: "1.5px solid #43a047",
        borderRadius: 14,
        boxShadow: "0 2px 16px #43a04722",
        padding: "1.5rem",
        color: "#1976d2",
        outline: "none"
      }}
      aria-label="Alerte santé ou bien-être"
      tabIndex={0}
      role="alertdialog"
      aria-modal="true"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span role="img" aria-label="Santé">💚</span>
        <h3 style={{ margin: 0, fontSize: 20, color: "#388e3c" }}>
          Alerte Santé / Bien-être
        </h3>
      </div>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>
        {message}
      </div>
      {advice && (
        <div style={{ fontSize: 15, color: "#388e3c", marginBottom: 12 }}>
          {advice}
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
          transition: "background 0.2s"
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
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
    </section>
  );
};

export default HealthAlert;

/**
 * Documentation :
 * - Alerte santé/bien-être : message, conseil, action utilisateur.
 * - Accessibilité : aria-labels, role alertdialog, navigation clavier, responsive.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */