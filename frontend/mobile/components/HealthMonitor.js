import React, { useEffect, useState, useRef } from "react";
import healthApi from "../services/healthApi";

/**
 * HealthMonitor
 * - Affiche les données de santé de l'utilisateur (fréquence cardiaque, stress, sommeil, etc.)
 * - Permet de lancer une analyse IA ou d'envoyer une alerte d'urgence
 * - Utilise les routes /api/health/monitor et /api/health/:userId/history du backend
 */
const HealthMonitor = ({ userId }) => {
  const [health, setHealth] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const analyzeBtnRef = useRef(null);

  // Récupère les données de santé en temps réel
  const fetchHealth = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await healthApi.monitor({ userId });
      setHealth(data);
    } catch (e) {
      setError("Erreur lors de la récupération des données santé.");
    }
    setLoading(false);
  };

  // Récupère l'historique santé
  const fetchHistory = async () => {
    try {
      const data = await healthApi.getHistory(userId);
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    }
  };

  // Lance une analyse IA sur les données santé
  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError("");
    setAnalysisResult("");
    try {
      const result = await healthApi.analyze({ userId });
      setAnalysisResult(result?.analysis || "Analyse terminée !");
      // Feedback vocal accessible
      if (window.speechSynthesis && result?.analysis) {
        const utter = new window.SpeechSynthesisUtterance(result.analysis);
        utter.lang = "fr-FR";
        window.speechSynthesis.speak(utter);
      }
    } catch {
      setError("Erreur lors de l'analyse IA.");
    }
    setAnalyzing(false);
  };

  useEffect(() => {
    if (userId) {
      fetchHealth();
      fetchHistory();
      // Optionnel : rafraîchit toutes les 30s
      const interval = setInterval(fetchHealth, 30000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [userId]);

  // Accessibilité : focus sur le bouton après analyse
  useEffect(() => {
    if (!analyzing && analysisResult && analyzeBtnRef.current) {
      analyzeBtnRef.current.focus();
    }
  }, [analyzing, analysisResult]);

  return (
    <main
      className="health-monitor"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        padding: "2rem 1rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
      aria-labelledby="health-monitor-title"
    >
      <h1
        id="health-monitor-title"
        style={{ fontSize: "1.5rem", marginBottom: 16 }}
      >
        <span role="img" aria-label="stéthoscope">🩺</span> Suivi Santé IA
      </h1>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            margin: "1.5em 0",
            color: "#636e72",
            fontSize: "1.1em",
          }}
          aria-busy="true"
        >
          <span className="spinner" style={{
            display: "inline-block",
            width: 18,
            height: 18,
            border: "2px solid #aaa",
            borderTop: "2px solid #00b894",
            borderRadius: "50%",
            marginRight: 8,
            animation: "spin 1s linear infinite"
          }} /> Chargement des données santé...
        </div>
      ) : health ? (
        <section
          style={{
            background: "#f5f5f5",
            borderRadius: 8,
            padding: "1em",
            marginBottom: 16,
            fontSize: "1.1em",
          }}
          aria-label="Données santé en temps réel"
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
            <b>Dernière mesure :</b> {health.timestamp ? new Date(health.timestamp).toLocaleString() : "?"}
          </div>
        </section>
      ) : (
        <p style={{ color: "#636e72" }}>Aucune donnée santé disponible.</p>
      )}

      <section>
        <button
          ref={analyzeBtnRef}
          onClick={handleAnalyze}
          disabled={analyzing || !health}
          style={{
            background: analyzing || !health ? "#aaa" : "#00b894",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.9em 2em",
            fontSize: "1.1em",
            margin: "0 auto 16px auto",
            display: "block",
            cursor: analyzing || !health ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          }}
          aria-disabled={analyzing || !health}
          aria-busy={analyzing}
        >
          {analyzing ? (
            <span aria-live="polite" aria-busy="true">
              <span className="spinner" style={{
                display: "inline-block",
                width: 18,
                height: 18,
                border: "2px solid #fff",
                borderTop: "2px solid #00b894",
                borderRadius: "50%",
                marginRight: 8,
                animation: "spin 1s linear infinite"
              }} /> Analyse IA...
            </span>
          ) : (
            "Analyser ma santé"
          )}
        </button>
      </section>

      {analysisResult && (
        <section
          style={{
            background: "#e0f7fa",
            color: "#00695c",
            borderRadius: 8,
            padding: "1em",
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: "1.08em",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          {analysisResult}
        </section>
      )}

      <h2 style={{ marginTop: 24, fontSize: "1.1rem" }}>
        <span role="img" aria-label="historique">📈</span> Historique
      </h2>
      <section
        style={{
          maxHeight: 140,
          overflowY: "auto",
          background: "#fafafa",
          borderRadius: 6,
          padding: "0.7em 1em",
          fontSize: "0.98em",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
        aria-live="polite"
        tabIndex={0}
      >
        {history.length === 0 ? (
          <span>Aucun historique.</span>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {history.map((h, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>
                  {h.date ? new Date(h.date).toLocaleDateString() : "?"}
                </span>
                {" : "}
                <b>{h.heartRate ?? "?"} bpm</b>, Stress: {h.stressLevel ?? "?"}, Sommeil: {h.sleepHours ?? "?"}h
              </li>
            ))}
          </ul>
        )}
      </section>
      {error && (
        <section
          style={{
            color: "#e00",
            marginTop: 18,
            background: "#fff0f0",
            borderRadius: 8,
            padding: "0.8em 1em",
            fontWeight: 500,
          }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </section>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </main>
  );
};

export default HealthMonitor;