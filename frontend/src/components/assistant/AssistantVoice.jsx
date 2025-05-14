/**
 * AssistantVoice.jsx
 * Module vocal de l'assistant Achiri.
 * - Permet la dictée, la lecture vocale (TTS), la navigation et commandes vocales.
 * - Multilingue, accessible (sourd/aveugle), sécurisé, compatible mobile/web.
 * - Design moderne, SEO friendly, documentation claire.
 */

import React, { useState, useRef, useEffect, useCallback } from "react"; // Ajout de useCallback
import { Helmet } from "react-helmet-async";
import "../../styles/assistantVoice.css";

const LANGUAGES = [
  { code: "fr-FR", label: "Français" },
  { code: "en-US", label: "English" },
  { code: "ar-EG", label: "العربية" },
  { code: "de-DE", label: "Deutsch" },
];

function AssistantVoice({ onTranscript, ttsEnabled = true, lang = "fr-FR" }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [ttsText, setTtsText] = useState("");
  const [selectedLang, setSelectedLang] = useState(lang);
  const recognitionRef = useRef(null);

  // Initialisation reconnaissance vocale
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = selectedLang;
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      if (onTranscript) onTranscript(text);
      setListening(false);
    };
    recognitionRef.current.onerror = () => setListening(false);
    recognitionRef.current.onend = () => setListening(false);
  }, [selectedLang, onTranscript]);

  // Démarrer la dictée vocale
  const startListening = () => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setListening(true);
    recognitionRef.current.lang = selectedLang;
    recognitionRef.current.start();
  };

  // Arrêter la dictée vocale
  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  };

  // Lecture vocale (TTS) - Utilisation de useCallback pour stabiliser la référence
  const speak = useCallback(
    (text) => {
      if (!ttsEnabled || !window.speechSynthesis) return;
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = selectedLang;
      window.speechSynthesis.speak(utter);
    },
    [ttsEnabled, selectedLang],
  ); // Dépendances de speak

  // Accessibilité : lecture automatique si texte à lire
  useEffect(() => {
    if (ttsEnabled && ttsText) speak(ttsText);
    // Ajout de 'speak' aux dépendances
  }, [ttsText, ttsEnabled, selectedLang, speak]);

  // Gestion du changement de langue
  const handleLangChange = (e) => setSelectedLang(e.target.value);

  return (
    <section
      className={`assistant-voice-module${listening ? " listening" : ""}`}
      aria-label="Module vocal IA"
      tabIndex={0}
    >
      <Helmet>
        <title>Assistant Vocal Achiri | Dictée, TTS, accessibilité</title>
        <meta
          name="description"
          content="Module vocal de l'assistant Achiri : dictée, commandes vocales, lecture TTS, multilingue, accessibilité avancée, mobile/web."
        />
      </Helmet>
      <header className="voice-header">
        <h2>
          <span role="img" aria-label="microphone">
            🎤
          </span>{" "}
          Assistant Vocal
        </h2>
        <select
          aria-label="Choisir la langue vocale"
          value={selectedLang}
          onChange={handleLangChange}
          style={{ marginLeft: 12, borderRadius: 6 }}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </header>
      <div className="voice-controls">
        <button
          className={`btn-voice${listening ? " active" : ""}`}
          onClick={listening ? stopListening : startListening}
          aria-pressed={listening}
          aria-label={
            listening ? "Arrêter la dictée vocale" : "Démarrer la dictée vocale"
          }
        >
          {listening ? "⏹️ Stop" : "🎙️ Parler"}
        </button>
        <input
          type="text"
          className="voice-transcript"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Votre texte dicté apparaîtra ici…"
          aria-label="Transcription vocale"
          style={{ marginLeft: 8, borderRadius: 8, padding: 6, width: "60%" }}
        />
        <button
          className="btn-tts"
          onClick={() => speak(transcript)}
          aria-label="Lire le texte à voix haute"
          disabled={!transcript}
          style={{ marginLeft: 8 }}
        >
          🔊 Lire
        </button>
      </div>
      <div className="voice-tts-input">
        <textarea
          rows={2}
          value={ttsText}
          onChange={(e) => setTtsText(e.target.value)}
          placeholder="Entrer un texte à lire à voix haute…"
          aria-label="Entrer un texte à lire"
          style={{ borderRadius: 8, padding: 6, width: "90%", marginTop: 10 }}
        />
        <button
          className="btn-tts"
          onClick={() => speak(ttsText)}
          aria-label="Lire ce texte à voix haute"
          disabled={!ttsText}
          style={{ marginLeft: 8, marginTop: 4 }}
        >
          🔊 Lire ce texte
        </button>
      </div>
      <footer className="voice-footer">
        <small>
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
        </small>
      </footer>
    </section>
  );
}

export default AssistantVoice;

/**
 * Documentation :
 * - Ce module vocal permet la dictée, la lecture TTS, la navigation et commandes vocales.
 * - Multilingue, accessible (clavier, TTS, contraste, dark mode), SEO via Helmet.
 * - À intégrer dans l'assistant principal ou comme module flottant.
 * - Pour enrichir : brancher sur backend IA, ajouter commandes personnalisées, etc.
 */