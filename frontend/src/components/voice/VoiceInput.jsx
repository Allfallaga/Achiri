import React, { useRef, useState } from "react";

/**
 * VoiceInput – Achiri
 * Champ de saisie vocale universel pour formulaires, chat, recherche, etc.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : reconnaissance vocale (speech-to-text), feedback visuel, mobile/web.
 * - Prêt pour extensions futures (langues, analytics, dark mode, etc).
 *
 * Props :
 *   value: string
 *   onChange: function (string)
 *   placeholder?: string
 *   lang?: string (ex: "fr-FR")
 *   disabled?: bool
 */

const VoiceInput = ({
  value = "",
  onChange,
  placeholder = "Parlez ou tapez ici...",
  lang = "fr-FR",
  disabled = false,
}) => {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  // Initialisation de la reconnaissance vocale
  const getRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = lang;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onChange && onChange(text);
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
    <div
      className="voice-input"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 1px 8px #1976d222",
        padding: "0.7em 1em",
        maxWidth: 420,
        margin: "1em auto",
      }}
      aria-label="Champ de saisie vocale"
      tabIndex={0}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={placeholder}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: 16,
          background: "transparent",
          color: "#222",
        }}
      />
      <button
        type="button"
        onClick={listening ? stopListening : startListening}
        disabled={disabled}
        aria-label={
          listening ? "Arrêter la saisie vocale" : "Démarrer la saisie vocale"
        }
        style={{
          background: listening ? "#43a047" : "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "0.5em 1.1em",
          fontWeight: "bold",
          fontSize: 15,
          cursor: disabled ? "not-allowed" : "pointer",
          outline: listening ? "2px solid #43a047" : "none",
          transition: "background 0.2s",
        }}
      >
        {listening ? "🎤 Parlez..." : "🎤"}
      </button>
      {error && (
        <span
          style={{ color: "#b71c1c", fontSize: 13, marginLeft: 8 }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default VoiceInput;

/**
 * Documentation :
 * - Champ de saisie vocale universel : speech-to-text, feedback visuel, accessibilité.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, permissions micro, feedback clair.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
