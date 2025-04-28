import React, { useState, useEffect, useRef } from "react";
import emergencyApi from "../services/emergencyApi";

/**
 * EmergencyAlert
 * - Bouton d'appel d'urgence intelligent
 * - Envoie une alerte au backend (et éventuellement aux proches/soignants)
 * - Affiche l'historique des alertes
 * - Accessibilité et feedback utilisateur améliorés
 */
const EmergencyAlert = ({ userId }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const alertBtnRef = useRef(null);

  // Envoie une alerte d'urgence
  const handleAlert = async () => {
    setSending(true);
    setError("");
    setSent(false);
    try {
      await emergencyApi.alert({ userId, timestamp: new Date().toISOString() });
      setSent(true);
      fetchHistory();
      // Feedback vocal accessible
      if (window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance("Alerte d'urgence envoyée !");
        utter.lang = "fr-FR";
        window.speechSynthesis.speak(utter);
      }
    } catch {
      setError("Erreur lors de l'envoi de l'alerte.");
    }
    setSending(false);
  };

  // Récupère l'historique des alertes
  const fetchHistory = async () => {
    try {
      const data = await emergencyApi.getHistory(userId);
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    if (userId) fetchHistory();
    // eslint-disable-next-line
  }, [userId]);

  // Accessibilité : focus sur le bouton après envoi
  useEffect(() => {
    if (!sending && sent && alertBtnRef.current) {
      alertBtnRef.current.focus();
    }
  }, [sending, sent]);

  return (
    <main
      className="emergency-alert"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        padding: "2rem 1rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
      aria-labelledby="emergency-alert-title"
    >
      <h1
        id="emergency-alert-title"
        style={{ fontSize: "1.5rem", marginBottom: 16 }}
      >
        <span role="img" aria-label="sirène">🚨</span> Alerte d'Urgence
      </h1>
      <section>
        <button
          ref={alertBtnRef}
          onClick={handleAlert}
          disabled={sending}
          style={{
            background: sending ? "#b71c1c" : "#d63031",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "1em 2em",
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "1em auto",
            boxShadow: "0 2px 8px #d6303122",
            cursor: sending ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            display: "block",
            outline: error ? "2px solid #e00" : "none",
          }}
          aria-label="Envoyer une alerte d'urgence"
          aria-disabled={sending}
          aria-busy={sending}
        >
          {sending ? (
            <span aria-live="polite" aria-busy="true">
              <span className="spinner" style={{
                display: "inline-block",
                width: 18,
                height: 18,
                border: "2px solid #fff",
                borderTop: "2px solid #d63031",
                borderRadius: "50%",
                marginRight: 8,
                animation: "spin 1s linear infinite"
              }} /> Envoi...
            </span>
          ) : (
            "Appeler à l'aide"
          )}
        </button>
        {sent && (
          <div
            style={{
              color: "#00b894",
              marginTop: 10,
              fontWeight: 500,
              background: "#eafaf1",
              borderRadius: 6,
              padding: "0.7em 1em",
            }}
            aria-live="polite"
            tabIndex={0}
          >
            ✅ Alerte envoyée avec succès !
          </div>
        )}
        {error && (
          <div
            style={{
              color: "#e00",
              marginTop: 10,
              background: "#fff0f0",
              borderRadius: 6,
              padding: "0.7em 1em",
              fontWeight: 500,
            }}
            role="alert"
            tabIndex={0}
          >
            {error}
          </div>
        )}
      </section>
      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: 10 }}>
          <span role="img" aria-label="horloge">🕒</span> Historique des alertes
        </h2>
        <div
          style={{
            maxHeight: 140,
            overflowY: "auto",
            background: "#fafafa",
            borderRadius: 6,
            padding: "0.7em 1em",
            fontSize: "1em",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          {history.length === 0 ? (
            <span>Aucune alerte envoyée.</span>
          ) : (
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {history.map((h, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>
                    {h.timestamp ? new Date(h.timestamp).toLocaleString() : "?"}
                  </span>
                  {h.status ? (
                    <span style={{
                      marginLeft: 8,
                      color: h.status === "traitée" ? "#00b894" : "#636e72"
                    }}>
                      — {h.status}
                    </span>
                  ) : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
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

export default EmergencyAlert;