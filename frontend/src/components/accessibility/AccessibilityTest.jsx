import React, { useState } from "react";
import { FaSignLanguage, FaVolumeUp, FaUniversalAccess } from "react-icons/fa";

/**
 * AccessibilityTest – Achiri
 * Démo interactive : test LSF (Langue des Signes), TTS (lecture vocale), rapport IA.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design avancé, branding Achiri.
 * - Fonctionnalités : traduction LSF simulée, TTS réel, feedback utilisateur, responsive, SEO, aria, mobile first.
 * - Prêt pour extensions futures (overlay, analytics, badges, dark mode…).
 *
 * Props :
 *   userId (string, optionnel)
 */

export default function AccessibilityTest({ userId }) {
  const [lsfInput, setLsfInput] = useState("");
  const [ttsInput, setTtsInput] = useState("");
  const [lsfResult, setLsfResult] = useState("");
  const [ttsResult, setTtsResult] = useState("");
  const [loadingLsf, setLoadingLsf] = useState(false);
  const [loadingTts, setLoadingTts] = useState(false);
  const [error, setError] = useState("");
  const [ttsSpeaking, setTtsSpeaking] = useState(false);

  // Simulation de la traduction LSF
  const handleLsf = (e) => {
    e.preventDefault();
    setLoadingLsf(true);
    setError("");
    setLsfResult("");
    setTimeout(() => {
      if (!lsfInput.trim()) {
        setError("Veuillez entrer un texte à traduire.");
        setLoadingLsf(false);
        return;
      }
      setLsfResult(`(LSF simulé) ${lsfInput}`);
      setLoadingLsf(false);
    }, 700);
  };

  // Lecture vocale réelle (TTS)
  const handleTts = (e) => {
    e.preventDefault();
    setLoadingTts(true);
    setError("");
    setTtsResult("");
    if (!ttsInput.trim()) {
      setError("Veuillez entrer un texte à lire.");
      setLoadingTts(false);
      return;
    }
    // Utilisation de l'API SpeechSynthesis si dispo
    if ("speechSynthesis" in window) {
      const msg = new window.SpeechSynthesisUtterance(ttsInput);
      msg.lang = "fr-FR";
      msg.onend = () => {
        setTtsSpeaking(false);
        setLoadingTts(false);
      };
      msg.onerror = () => {
        setError("Erreur lors de la lecture vocale.");
        setTtsSpeaking(false);
        setLoadingTts(false);
      };
      setTtsResult(`(Lecture réelle) ${ttsInput}`);
      setTtsSpeaking(true);
      window.speechSynthesis.speak(msg);
    } else {
      setTtsResult(`(Lecture simulée) ${ttsInput}`);
      setLoadingTts(false);
    }
  };

  // Arrêt de la lecture vocale
  const stopTts = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setTtsSpeaking(false);
      setLoadingTts(false);
    }
  };

  return (
    <section
      className="accessibility-ia-demo"
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3f2fd",
        borderRadius: 14,
        maxWidth: 540,
        background: "#f8fafc",
        boxShadow: "0 2px 12px #1976d222",
      }}
      aria-label="Test interactif accessibilité IA"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <FaUniversalAccess /> Accessibilité IA : Démo interactive
      </h2>
      {userId && (
        <div style={{ fontSize: 15, color: "#888", marginBottom: 12 }}>
          Utilisateur : <strong>{userId}</strong>
        </div>
      )}
      {error && (
        <div style={{ color: "#b71c1c", marginBottom: 10 }} role="alert">
          {error}
        </div>
      )}

      {/* LSF */}
      <form
        onSubmit={handleLsf}
        style={{
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <label htmlFor="lsf-input" style={{ fontWeight: 600, minWidth: 140 }}>
          <FaSignLanguage style={{ marginRight: 6 }} /> Traduction en LSF :
        </label>
        <input
          id="lsf-input"
          type="text"
          value={lsfInput}
          onChange={(e) => setLsfInput(e.target.value)}
          placeholder="Texte à traduire en LSF"
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: "0.4em 1em",
            fontSize: 15,
          }}
          required
          aria-label="Texte à traduire en LSF"
        />
        <button
          type="submit"
          disabled={loadingLsf}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 1.2em",
            fontWeight: "bold",
            fontSize: 15,
            cursor: loadingLsf ? "not-allowed" : "pointer",
          }}
          aria-label="Traduire en LSF"
        >
          {loadingLsf ? "Traduction..." : "Traduire"}
        </button>
      </form>
      {lsfResult && (
        <div style={{ marginBottom: 18, color: "#1976d2", fontWeight: 500 }}>
          <strong>Résultat LSF :</strong> {lsfResult}
        </div>
      )}

      {/* TTS */}
      <form
        onSubmit={handleTts}
        style={{
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <label htmlFor="tts-input" style={{ fontWeight: 600, minWidth: 170 }}>
          <FaVolumeUp style={{ marginRight: 6 }} /> Lecture vocale (TTS) :
        </label>
        <input
          id="tts-input"
          type="text"
          value={ttsInput}
          onChange={(e) => setTtsInput(e.target.value)}
          placeholder="Texte à lire"
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: "0.4em 1em",
            fontSize: 15,
          }}
          required
          aria-label="Texte à lire vocalement"
        />
        <button
          type="submit"
          disabled={loadingTts || ttsSpeaking}
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 1.2em",
            fontWeight: "bold",
            fontSize: 15,
            cursor: loadingTts || ttsSpeaking ? "not-allowed" : "pointer",
          }}
          aria-label="Lire vocalement"
        >
          {loadingTts || ttsSpeaking ? "Lecture..." : "Lire"}
        </button>
        {ttsSpeaking && (
          <button
            type="button"
            onClick={stopTts}
            style={{
              background: "#b71c1c",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.4em 1.2em",
              fontWeight: "bold",
              fontSize: 15,
              marginLeft: 8,
              cursor: "pointer",
            }}
            aria-label="Arrêter la lecture vocale"
          >
            Arrêter
          </button>
        )}
      </form>
      {ttsResult && (
        <div style={{ marginBottom: 10 }}>
          <strong>Résultat TTS :</strong>
          <span style={{ color: "#388e3c", marginLeft: 8 }}>{ttsResult}</span>
        </div>
      )}

      {/* Rapport IA synthétique */}
      <div
        style={{
          margin: "2rem 0 0 0",
          background: "#e3f2fd",
          borderRadius: 12,
          padding: "1.1em 1em",
          boxShadow: "0 1px 8px #1976d211",
          color: "#1976d2",
          fontWeight: 500,
          fontSize: 15,
        }}
        aria-live="polite"
        tabIndex={0}
      >
        <div
          style={{
            marginBottom: 8,
            fontWeight: 700,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <FaUniversalAccess /> Rapport IA d’accessibilité (démo)
        </div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>✔️ Contraste suffisant (WCAG AA)</li>
          <li>✔️ Navigation clavier complète</li>
          <li>✔️ Labels ARIA présents</li>
          <li>✔️ Lecture vocale compatible</li>
          <li>✔️ Support LSF (Langue des Signes Française)</li>
        </ul>
        <div style={{ color: "#388e3c", marginTop: 8 }}>
          Toutes les vérifications sont conformes. Bravo !
        </div>
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
      <style>{`
        .accessibility-ia-demo:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          .accessibility-ia-demo {
            padding: 1rem;
            max-width: 99vw;
          }
        }
        @media (prefers-color-scheme: dark) {
          .accessibility-ia-demo {
            background: #232b3b;
            color: #ffe082;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Documentation :
 * - Démo interactive accessibilité : LSF (simulé), TTS (réel si supporté), rapport IA synthétique, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (overlay, badges, IA…).
 */
