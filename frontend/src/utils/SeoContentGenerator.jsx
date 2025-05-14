import React, { useState } from "react";

/**
 * SeoContentGenerator – Achiri
 * Générateur de contenu IA pour influenceurs et réseaux sociaux.
 * - Accessibilité avancée (ARIA, focus, feedback)
 * - Sécurité (aucune donnée sensible, pas de tracking)
 * - Compatible mobile/web, design moderne, UX avancée
 * - Prêt pour extensions (SEO, export, partage, multi-langues, badges, etc)
 *
 * Props :
 *   - userId : identifiant utilisateur (optionnel, pour personnalisation future)
 */

const tones = [
  { value: "inspirant", label: "Inspirant" },
  { value: "humoristique", label: "Humoristique" },
  { value: "informatif", label: "Informatif" },
  { value: "motivant", label: "Motivant" },
  { value: "persuasif", label: "Persuasif" },
];

const SeoContentGenerator = ({ userId }) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState(tones[0].value);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Accessibilité : focus sur le champ sujet à l'ouverture
  const topicInputRef = React.useRef();
  React.useEffect(() => {
    if (topicInputRef.current) topicInputRef.current.focus();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");
    setTimeout(() => {
      if (!topic.trim()) {
        setError("Veuillez entrer un sujet.");
        setLoading(false);
        return;
      }
      // Génération simulée (mock IA)
      setResult(
        `Voici un contenu ${tone} sur "${topic}" :\n\n` +
          `Découvre comment "${topic}" peut transformer ta vie ! #${tone}`,
      );
      setLoading(false);
    }, 1000);
  };

  // Export du contenu généré (copie dans le presse-papiers)
  const handleExport = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <section
      className="seo-content-generator"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
      }}
      aria-label="Générateur de contenu IA"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.3em",
          marginBottom: 14,
        }}
      >
        📝 Générateur de Contenu IA
      </h2>
      <form onSubmit={handleGenerate} style={{ marginBottom: 18 }}>
        <div style={{ marginBottom: 10 }}>
          <input
            ref={topicInputRef}
            type="text"
            placeholder="Sujet ou mot-clé (ex: bien-être, tech...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.7em 1em",
              borderRadius: 8,
              border: "1px solid #bbdefb",
              fontSize: 16,
              marginBottom: 8,
            }}
            aria-label="Sujet ou mot-clé"
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label
            htmlFor="tone-select"
            style={{ marginRight: 10, fontWeight: "bold" }}
          >
            Ton :
          </label>
          <select
            id="tone-select"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            style={{
              borderRadius: 6,
              padding: "0.4em 1em",
              fontSize: 15,
              border: "1px solid #bbdefb",
            }}
            aria-label="Choisir le ton"
          >
            {tones.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
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
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em",
          }}
          aria-live="polite"
        >
          <b>Contenu généré :</b>
          <div style={{ marginTop: 8, whiteSpace: "pre-line" }}>{result}</div>
          <button
            onClick={handleExport}
            style={{
              marginTop: 12,
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.5em 1.3em",
              fontWeight: "bold",
              fontSize: 15,
              cursor: "pointer",
            }}
            aria-label="Copier le contenu généré"
          >
            Copier
          </button>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
    </section>
  );
};

export default SeoContentGenerator;

/**
 * Documentation :
 * - Props : userId (optionnel, pour personnalisation future)
 * - Accessibilité : ARIA, focus, feedback visuel, navigation clavier
 * - Sécurité : aucune donnée sensible, pas de tracking, export sécurisé (clipboard)
 * - Extensible : SEO, export, partage, multi-langues, badges, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */
