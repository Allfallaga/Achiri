import React, { useState } from "react";

/**
 * EmergencyAlert.jsx
 * Bouton d'alerte d'urgence IA : envoie une alerte et affiche le statut.
 * Version mock : aucune requête réseau, tout est simulé.
 */
const EmergencyAlert = ({ userId }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleAlert = async () => {
    setSending(true);
    setError("");
    setSent(false);
    // Simulation d'envoi d'alerte (aucun appel réseau)
    setTimeout(() => {
      // Simule un succès
      setSent(true);
      setSending(false);
    }, 1200);
  };

  return (
    <div
      className="emergency-alert"
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        textAlign: "center",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #d6303122",
        padding: "2rem"
      }}
      aria-label="Alerte d'urgence"
      tabIndex={0}
    >
      <h2 style={{ color: "#d63031", marginBottom: 12, fontWeight: 700, fontSize: "1.5em" }}>
        🚨 Alerte d'Urgence
      </h2>
      <p style={{ color: "#444", fontSize: "1.05em", marginBottom: 18 }}>
        En cas de danger ou de besoin d'aide immédiate, cliquez sur le bouton ci-dessous.<br />
        Une alerte sera envoyée à vos contacts ou services d'urgence.
      </p>
      <button
        onClick={handleAlert}
        disabled={sending}
        style={{
          background: "#d63031",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "1em 2em",
          fontSize: "1.2em",
          fontWeight: "bold",
          margin: "1.5em 0",
          cursor: sending ? "not-allowed" : "pointer",
          boxShadow: "0 2px 12px #d6303122",
          letterSpacing: 1,
          transition: "background 0.2s, box-shadow 0.2s"
        }}
        aria-label="Envoyer une alerte d'urgence"
      >
        {sending ? "Envoi en cours..." : "Envoyer une alerte"}
      </button>
      {sent && (
        <div
          style={{
            color: "#00b894",
            marginTop: 10,
            fontWeight: "bold",
            fontSize: "1.08em"
          }}
          aria-live="polite"
        >
          ✅ Alerte envoyée avec succès !
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
      {!sent && !sending && (
        <div style={{ color: "#888", fontSize: "0.97em", marginTop: 10 }}>
          <span role="img" aria-label="info">ℹ️</span> Fonctionnalité simulée pour la démo.
        </div>
      )}
    </div>
  );
};

export default EmergencyAlert;