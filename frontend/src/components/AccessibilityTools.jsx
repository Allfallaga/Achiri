import React, { useState } from "react";
import socialApi from "../services/socialApi";

/**
 * SeoContentGenerator.jsx
 * Générateur de contenu IA pour influenceurs et réseaux sociaux.
 * Moderne, accessible, responsive, UX optimisée.
 */
const SeoContentGenerator = ({ userId }) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("inspirant");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div
      className="seo-content-generator"
      aria-label="Générateur de contenu IA"
      tabIndex={0}
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem"
      }}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 18, textAlign: "center" }}>
        📝 Générateur de Contenu IA
      </h2>
      <form onSubmit={handleGenerate} style={{ marginBottom: 18 }}>
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Sujet ou mot-clé (ex: bien-être, tech...)"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            required
            aria-label="Sujet ou mot-clé"
            style={{
              width: "100%",
              padding: "0.7em 1em",
              borderRadius: 8,
              border: "1px solid #bbdefb",
              fontSize: 16,
              marginBottom: 8
            }}
          />
        </div>
        <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <label htmlFor="tone-select" style={{ fontWeight: "bold" }}>Ton :</label>
          <select
            id="tone-select"
            value={tone}
            onChange={e => setTone(e.target.value)}
            aria-label="Choisir le ton"
            style={{
              borderRadius: 6,
              padding: "0.4em 1em",
              fontSize: 15,
              border: "1px solid #bbdefb"
            }}
          >
            <option value="inspirant">Inspirant</option>
            <option value="humoristique">Humoristique</option>
            <option value="informatif">Informatif</option>
            <option value="motivant">Motivant</option>
            <option value="persuasif">Persuasif</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 2em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
          aria-label="Générer le contenu"
        >
          {loading ? "Génération..." : "Générer le contenu"}
        </button>
      </form>
      {result && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em"
          }}
          aria-live="polite"
        >
          <b>Contenu généré :</b>
          <div style={{ marginTop: 8, whiteSpace: "pre-line" }}>{result}</div>
        </div>
      )}
      {error && (
        <div style={{ color: "#b71c1c", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default SeoContentGenerator;