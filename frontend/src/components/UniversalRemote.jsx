import React, { useState } from "react";

/**
 * UniversalRemote.jsx
 * Télécommande IA universelle pour piloter la domotique (lumières, volets, etc.).
 * Version mock : aucune requête réseau, tout est simulé.
 */
const actions = [
  { key: "light_on", label: "Allumer la lumière", icon: "💡" },
  { key: "light_off", label: "Éteindre la lumière", icon: "🌑" },
  { key: "shutter_up", label: "Ouvrir les volets", icon: "⬆️" },
  { key: "shutter_down", label: "Fermer les volets", icon: "⬇️" },
  { key: "alarm_on", label: "Activer l'alarme", icon: "🔔" },
  { key: "alarm_off", label: "Désactiver l'alarme", icon: "🔕" },
];

const UniversalRemote = ({ userId }) => {
  const [loading, setLoading] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Simulation d'action domotique (aucun appel réseau)
  const handleAction = async (action) => {
    setLoading(action.key);
    setResult("");
    setError("");
    setTimeout(() => {
      setResult(`Commande "${action.label}" envoyée avec succès !`);
      setLoading("");
    }, 700);
  };

  return (
    <section
      className="universal-remote"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none"
      }}
      aria-label="Télécommande domotique IA"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.3em", marginBottom: 18 }}>
        🏠 Télécommande Domotique IA
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          justifyContent: "center",
          margin: "1.5em 0"
        }}
      >
        {actions.map(action => (
          <button
            key={action.key}
            onClick={() => handleAction(action)}
            disabled={loading === action.key}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "1em 1.2em",
              fontSize: "1.1em",
              minWidth: 120,
              marginBottom: 8,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 12px #1976d222",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              opacity: loading && loading !== action.key ? 0.6 : 1,
              transition: "background 0.2s, opacity 0.2s"
            }}
            aria-label={action.label}
            tabIndex={0}
          >
            <span style={{ fontSize: 28 }}>{action.icon}</span>
            {loading === action.key ? "..." : action.label}
          </button>
        ))}
      </div>
      {result && (
        <div
          style={{
            background: "#e3fcec",
            color: "#065f46",
            borderRadius: 8,
            padding: "1em",
            marginBottom: 16,
            fontSize: "1.05em",
            border: "1px solid #b7e4c7",
            textAlign: "center"
          }}
          aria-live="polite"
        >
          {result}
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: 10, textAlign: "center" }} role="alert">
          {error}
        </div>
      )}
    </section>
  );
};

export default UniversalRemote;