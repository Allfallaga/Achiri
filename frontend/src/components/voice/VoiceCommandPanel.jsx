import React, { useState, useRef } from "react";

/**
 * VoiceCommandPanel – Achiri
 * Panneau de commandes vocales pour l’accessibilité et la productivité.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : reconnaissance vocale (speech-to-text), historique, feedback utilisateur, mobile/web.
 * - Prêt pour extensions futures (commandes personnalisées, analytics, dark mode, etc).
 */

const VoiceCommandPanel = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  // Initialisation de la reconnaissance vocale
  const getRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "fr-FR";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setHistory((h) => [{ date: new Date(), text }, ...h].slice(0, 5));
      };
      recognitionRef.current.onerror = (event) => {
        setError("Erreur de reconnaissance vocale : " + event.error);
        setListening(false);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
    return recognitionRef.current;
  };

  // Démarrer la reconnaissance vocale
  const startListening = () => {
    setError("");
    setTranscript("");
    const recognition = getRecognition();
    if (!recognition) {
      setError("Reconnaissance vocale non supportée sur ce navigateur.");
      return;
    }
    setListening(true);
    recognition.start();
  };

  // Arrêter la reconnaissance vocale
  const stopListening = () => {
    const recognition = getRecognition();
    if (recognition) recognition.stop();
    setListening(false);
  };

  return (
    <section
      className="voice-command-panel"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #1976d233",
        padding: "2.2rem",
        outline: "none",
      }}
      aria-label="Panneau Commandes Vocales Achiri"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.35em",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
        tabIndex={0}
        aria-label="Commandes vocales accessibilité"
      >
        <span role="img" aria-label="microphone">
          🎤
        </span>
        Commandes Vocales IA
      </h2>
      <p style={{ color: "#555", fontSize: 15, marginBottom: 18 }}>
        Utilisez votre voix pour contrôler l’application, dicter du texte ou
        déclencher des actions. Compatible mobile/web, sécurisé, respect de la
        vie privée.
      </p>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <button
          onClick={startListening}
          disabled={listening}
          style={{
            background: listening ? "#bdbdbd" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 1.5em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: listening ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          aria-label="Démarrer la reconnaissance vocale"
        >
          {listening ? "Écoute..." : "Démarrer"}
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
          style={{
            background: !listening ? "#bdbdbd" : "#b71c1c",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 1.5em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: !listening ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          aria-label="Arrêter la reconnaissance vocale"
        >
          Arrêter
        </button>
      </div>
      {transcript && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginBottom: 10,
            fontSize: "1.1em",
            color: "#1976d2",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          <b>Texte reconnu :</b> {transcript}
        </div>
      )}
      {error && (
        <div
          style={{ color: "#b71c1c", marginBottom: 10 }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </div>
      )}
      {/* Historique des commandes */}
      {history.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <b>Historique (5 dernières) :</b>
          <ul
            style={{
              fontSize: 15,
              color: "#1976d2",
              paddingLeft: 18,
              margin: 0,
            }}
          >
            {history.map((h, i) => (
              <li key={i}>
                <span style={{ color: "#888", fontSize: 13, marginRight: 8 }}>
                  {h.date.toLocaleTimeString()}
                </span>
                {h.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Documentation & sensibilisation */}
      <div
        style={{
          marginTop: 24,
          fontSize: 14,
          color: "#555",
          background: "#f0f4f8",
          borderRadius: 8,
          padding: "0.7em 1em",
        }}
      >
        <b>À propos :</b> Les commandes vocales facilitent l’accès à
        l’information et l’autonomie numérique.{" "}
        <a
          href="https://www.accessibility.afnor.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          En savoir plus
        </a>
      </div>
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
    </section>
  );
};

export default VoiceCommandPanel;

/**
 * Documentation :
 * - Commandes vocales IA : reconnaissance vocale, historique, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, permissions micro, feedback clair.
 * - Design avancé, branding Achiri, mobile first, documentation intégrée.
 * - Prêt pour extensions futures (commandes personnalisées, analytics, dark mode, etc).
 */
