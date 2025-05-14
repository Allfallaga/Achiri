import React, { useEffect, useState } from "react";

/**
 * HealthMonitor – Achiri
 * Suivi santé IA : affiche les données vitales, historique et analyse IA.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage données vitales, historique, analyse IA, feedback, focus, couleurs, responsive, live region, dark mode ready.
 * - Prêt pour extensions futures (export, analytics, dark mode, alertes, etc).
 *
 * Props :
 *   - userId : identifiant utilisateur (optionnel, pour extension future)
 */

const HealthMonitor = ({ userId }) => {
  const [health, setHealth] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState("");

  // Simule la récupération des données santé à l'affichage
  useEffect(() => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      // Données simulées
      setHealth({
        heartRate: 72,
        stressLevel: "Modéré",
        sleepHours: 7,
        timestamp: new Date().toISOString(),
      });
      setHistory([
        {
          date: new Date(Date.now() - 86400000 * 1).toISOString(),
          heartRate: 70,
          stressLevel: "Faible",
          sleepHours: 8,
        },
        {
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
          heartRate: 75,
          stressLevel: "Élevé",
          sleepHours: 6,
        },
      ]);
      setLoading(false);
    }, 800);
  }, [userId]);

  // Analyse IA de la santé (simulation)
  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysis("");
    setError("");
    setTimeout(() => {
      setAnalysis(
        "Votre santé est stable. Continuez à bien dormir et à gérer votre stress !",
      );
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <section
      className="health-monitor"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
      }}
      aria-label="Suivi santé IA"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.5em",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        🩺 Suivi Santé IA
      </h2>
      {loading ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>
          Chargement des données santé...
        </p>
      ) : health ? (
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: 8,
            padding: "1em",
            marginBottom: 16,
            fontSize: "1.1em",
            boxShadow: "0 1px 4px #1976d211",
          }}
        >
          <div>
            <b>Fréquence cardiaque :</b> {health.heartRate ?? "?"} bpm
          </div>
          <div>
            <b>Stress :</b> {health.stressLevel ?? "?"}
          </div>
          <div>
            <b>Sommeil :</b> {health.sleepHours ?? "?"} h
          </div>
          <div>
            <b>Dernière mesure :</b>{" "}
            {health.timestamp
              ? new Date(health.timestamp).toLocaleString()
              : "?"}
          </div>
        </div>
      ) : (
        <p style={{ color: "#b71c1c" }}>Aucune donnée santé disponible.</p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={analyzing}
        style={{
          background: "#00b894",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "0.7em 1.5em",
          fontSize: "1.1em",
          marginBottom: 16,
          cursor: analyzing ? "not-allowed" : "pointer",
          fontWeight: 600,
          boxShadow: "0 2px 8px #00b89422",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
        aria-label="Analyser ma santé"
      >
        {analyzing ? "Analyse IA..." : "Analyser ma santé"}
      </button>

      {analysis && (
        <div
          style={{
            background: "#e3fcec",
            color: "#065f46",
            borderRadius: 8,
            padding: "1em",
            marginBottom: 16,
            fontSize: "1.05em",
            border: "1px solid #b7e4c7",
            textAlign: "center",
          }}
          aria-live="polite"
        >
          <b>Analyse IA :</b> {analysis}
        </div>
      )}

      <h3
        style={{
          marginTop: 24,
          color: "#1976d2",
          fontWeight: 600,
          fontSize: "1.1em",
        }}
      >
        Historique
      </h3>
      <div
        style={{
          maxHeight: 120,
          overflowY: "auto",
          background: "#fafafa",
          borderRadius: 6,
          padding: "0.5em",
          fontSize: "0.98em",
          boxShadow: "0 1px 2px #1976d211",
        }}
        aria-label="Historique santé"
      >
        {history.length === 0 ? (
          <span style={{ color: "#888" }}>Aucun historique.</span>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {history.map((h, i) => (
              <li key={i}>
                {h.date ? new Date(h.date).toLocaleDateString() : "?"} :{" "}
                <b>{h.heartRate ?? "?"} bpm</b>, Stress: {h.stressLevel ?? "?"},
                Sommeil: {h.sleepHours ?? "?"}h
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <div style={{ color: "red", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
      <footer
        style={{
          marginTop: 18,
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
      <div style={{ color: "#888", fontSize: "0.97em", marginTop: 10 }}>
        <span role="img" aria-label="info">
          ℹ️
        </span>{" "}
        Données simulées pour la démo.
      </div>
    </section>
  );
};

export default HealthMonitor;

/**
 * Documentation :
 * - Suivi santé IA : données vitales, historique, analyse IA, feedback, focus, couleurs, responsive.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
