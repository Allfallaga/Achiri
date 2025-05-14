import React, { useState } from "react";
import {
  FaMagic,
  FaLightbulb,
  FaSmile,
  FaInfoCircle,
  FaRocket,
  FaBullhorn,
  FaPalette,
  FaMoon,
} from "react-icons/fa";

import socialApi from "../../services/socialApi.js";

/**
 * AccessibilityTools – Achiri
 * Générateur de contenu IA pour influenceurs et réseaux sociaux.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design avancé, dark mode ready.
 * - Contrôle clavier, aria-labels, feedback visuel, mobile/web, focus visible, live region.
 * - Props : userId (string)
 * - Prêt pour extensions futures (plus de tons, analytics, overlay, badges, IA…)
 */

const tones = [
  { value: "inspirant", label: "Inspirant", icon: <FaLightbulb /> },
  { value: "humoristique", label: "Humoristique", icon: <FaSmile /> },
  { value: "informatif", label: "Informatif", icon: <FaInfoCircle /> },
  { value: "motivant", label: "Motivant", icon: <FaRocket /> },
  { value: "persuasif", label: "Persuasif", icon: <FaBullhorn /> },
];

const AccessibilityTools = ({ userId }) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(tones[0].value);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle (accessibilité)
  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  // Génération du contenu IA
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");
    try {
      const res = await socialApi.generateContent({ userId, topic, tone });
      setResult(res.content || "Aucun contenu généré.");
    } catch {
      setError("Erreur lors de la génération du contenu.");
    }
    setLoading(false);
  };

  return (
    <section
      className={`seo-content-generator${darkMode ? " dark" : ""}`}
      aria-label="Générateur de contenu IA Achiri"
      tabIndex={0}
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: darkMode ? "#232b3b" : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        color: darkMode ? "#ffe082" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <h2
        style={{
          color: darkMode ? "#ffe082" : "#1976d2",
          marginBottom: 18,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        tabIndex={0}
        aria-label="Générateur de contenu IA"
      >
        <FaMagic style={{ fontSize: 24 }} aria-hidden="true" />
        Générateur de Contenu IA
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={
            darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
          }
          style={{
            marginLeft: 12,
            background: "none",
            border: "none",
            color: darkMode ? "#ffe082" : "#1976d2",
            cursor: "pointer",
            fontSize: 20,
          }}
          tabIndex={0}
        >
          {darkMode ? <FaPalette /> : <FaMoon />}
        </button>
      </h2>
      <form onSubmit={handleGenerate} style={{ marginBottom: 18 }}>
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Sujet ou mot-clé (ex: bien-être, tech...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            aria-label="Sujet ou mot-clé"
            style={{
              width: "100%",
              padding: "0.7em 1em",
              borderRadius: 8,
              border: "1px solid #bbdefb",
              fontSize: 16,
              marginBottom: 8,
              background: darkMode ? "#181f2a" : "#fff",
              color: darkMode ? "#ffe082" : "#222",
            }}
            maxLength={80}
            autoComplete="off"
          />
        </div>
        <div
          style={{
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <label htmlFor="tone-select" style={{ fontWeight: "bold" }}>
            Ton :
          </label>
          <select
            id="tone-select"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            aria-label="Choisir le ton"
            style={{
              borderRadius: 6,
              padding: "0.4em 1em",
              fontSize: 15,
              border: "1px solid #bbdefb",
              background: darkMode ? "#181f2a" : "#fff",
              color: darkMode ? "#ffe082" : "#222",
            }}
          >
            {tones.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <span aria-hidden="true" style={{ fontSize: 18 }}>
            {tones.find((t) => t.value === tone)?.icon}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          style={{
            background: darkMode ? "#ffe082" : "#1976d2",
            color: darkMode ? "#232b3b" : "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 2em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: loading || !topic.trim() ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          aria-label="Générer le contenu"
        >
          {loading ? "Génération..." : "Générer le contenu"}
        </button>
      </form>
      {result && (
        <div
          style={{
            background: darkMode ? "#181f2a" : "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em",
            color: darkMode ? "#ffe082" : "#222",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          <b>Contenu généré :</b>
          <div style={{ marginTop: 8, whiteSpace: "pre-line" }}>{result}</div>
        </div>
      )}
      {error && (
        <div
          style={{ color: "#b71c1c", marginTop: 10 }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </div>
      )}
      <footer
        style={{
          marginTop: 18,
          color: darkMode ? "#ffe082" : "#888",
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
      <style>{`
        .seo-content-generator:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          .seo-content-generator {
            padding: 1rem;
            max-width: 99vw;
          }
        }
        .seo-content-generator.dark input,
        .seo-content-generator.dark select {
          background: #181f2a !important;
          color: #ffe082 !important;
        }
        .seo-content-generator.dark {
          background: #232b3b !important;
          color: #ffe082 !important;
        }
      `}</style>
    </section>
  );
};

export default AccessibilityTools;

/**
 * Documentation :
 * - Générateur IA pour contenu social, UX avancée, accessibilité (clavier, aria), responsive, dark mode.
 * - Sécurité : pas d’info sensible, requêtes sécurisées, feedback utilisateur.
 * - Design avancé, branding Achiri, mobile first, SEO ready.
 * - Prêt pour extensions futures (plus de tons, analytics, overlay, badges, IA…).
 */
