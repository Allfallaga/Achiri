import React, { useState } from "react";

/**
 * AccessibilityTest
 * Démo interactive : test LSF (Langue des Signes) et TTS (lecture vocale).
 * Props :
 *   - userId : identifiant utilisateur (optionnel)
 */
export default function AccessibilityTest({ userId }) {
  const [lsfInput, setLsfInput] = useState("");
  const [ttsInput, setTtsInput] = useState("");
  const [lsfResult, setLsfResult] = useState("");
  const [ttsResult, setTtsResult] = useState("");
  const [loadingLsf, setLoadingLsf] = useState(false);
  const [loadingTts, setLoadingTts] = useState(false);
  const [error, setError] = useState("");

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

  // Simulation de la lecture vocale (TTS)
  const handleTts = (e) => {
    e.preventDefault();
    setLoadingTts(true);
    setError("");
    setTtsResult("");
    setTimeout(() => {
      if (!ttsInput.trim()) {
        setError("Veuillez entrer un texte à lire.");
        setLoadingTts(false);
        return;
      }
      setTtsResult(`(Lecture simulée) ${ttsInput}`);
      setLoadingTts(false);
    }, 700);
  };

  return (
    <div
      className="accessibility-ia-demo"
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3f2fd",
        borderRadius: 12,
        maxWidth: 520,
        background: "#f8fafc",
        boxShadow: "0 2px 12px #1976d222"
      }}
      aria-label="Test interactif accessibilité IA"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 18 }}>
        Accessibilité IA : Démo interactive
      </h2>
      {userId && (
        <div style={{ fontSize: 15, color: "#888", marginBottom: 12 }}>
          Utilisateur : <strong>{userId}</strong>
        </div>
      )}
      {error && <div style={{ color: "#b71c1c", marginBottom: 10 }}>{error}</div>}

      {/* LSF */}
      <form onSubmit={handleLsf} style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <label htmlFor="lsf-input" style={{ fontWeight: 600, minWidth: 140 }}>
          Traduction en LSF :
        </label>
        <input
          id="lsf-input"
          type="text"
          value={lsfInput}
          onChange={e => setLsfInput(e.target.value)}
          placeholder="Texte à traduire en LSF"
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: "0.4em 1em",
            fontSize: 15
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
            cursor: loadingLsf ? "not-allowed" : "pointer"
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
      <form onSubmit={handleTts} style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <label htmlFor="tts-input" style={{ fontWeight: 600, minWidth: 170 }}>
          Lecture vocale (TTS) :
        </label>
        <input
          id="tts-input"
          type="text"
          value={ttsInput}
          onChange={e => setTtsInput(e.target.value)}
          placeholder="Texte à lire"
          style={{
            flex: 1,
            minWidth: 180,
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: "0.4em 1em",
            fontSize: 15
          }}
          required
          aria-label="Texte à lire vocalement"
        />
        <button
          type="submit"
          disabled={loadingTts}
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.4em 1.2em",
            fontWeight: "bold",
            fontSize: 15,
            cursor: loadingTts ? "not-allowed" : "pointer"
          }}
          aria-label="Lire vocalement"
        >
          {loadingTts ? "Lecture..." : "Lire"}
        </button>
      </form>
      {ttsResult && (
        <div style={{ marginBottom: 10 }}>
          <strong>Résultat TTS :</strong>
          <span style={{ color: "#388e3c", marginLeft: 8 }}>{ttsResult}</span>
        </div>
      )}
    </div>
  );
}