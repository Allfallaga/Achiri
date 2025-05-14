import React, { useState } from "react";

/**
 * AccessibilityAgent – Achiri
 * Agent virtuel d’accessibilité : assistant IA, conseils, diagnostic, navigation, feedback.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : chat IA, suggestions accessibilité, diagnostic rapide, mobile/web.
 * - Prêt pour extensions futures (connexion API, analytics, dark mode, etc).
 */

const defaultSuggestions = [
  "Comment améliorer l’accessibilité de cette page ?",
  "Quels raccourcis clavier sont disponibles ?",
  "Comment activer le mode contraste élevé ?",
  "Aide sur la navigation au clavier",
];

const AccessibilityAgent = ({
  user = "Utilisateur",
  onSend, // callback(optionnel) pour l’intégration future
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulation de réponse IA
  const handleSend = async (msg) => {
    if (!msg.trim()) return;
    setLoading(true);
    setHistory((h) => [...h, { from: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      // Réponse simulée IA
      let response = "Merci pour votre question. (Simulation IA)";
      if (/contraste/i.test(msg))
        response =
          "Pour activer le contraste élevé, ouvrez le panneau accessibilité et cochez 'Contraste élevé'.";
      if (/raccourci/i.test(msg))
        response =
          "Exemples de raccourcis : Tab = navigation, Entrée = valider, Échap = fermer.";
      if (/navigation/i.test(msg))
        response =
          "Utilisez Tab pour naviguer, Shift+Tab pour revenir, Entrée pour sélectionner.";
      if (/accessibilit/i.test(msg))
        response =
          "Pour améliorer l’accessibilité : utilisez des couleurs contrastées, aria-labels, navigation clavier, etc.";
      setHistory((h) => [...h, { from: "agent", text: response }]);
      setLoading(false);
      onSend && onSend(msg, response);
    }, 1200);
  };

  // Envoi via entrée clavier
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <section
      className="accessibility-agent"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#f8fafc",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
      }}
      aria-label="Agent virtuel accessibilité"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.25em",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        tabIndex={0}
        aria-label="Agent accessibilité IA"
      >
        <span role="img" aria-label="assistant IA">
          🤖
        </span>
        Agent Accessibilité IA
      </h2>
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          minHeight: 120,
          maxHeight: 220,
          overflowY: "auto",
          padding: "1em",
          marginBottom: 14,
          border: "1px solid #e3f2fd",
        }}
        aria-live="polite"
        tabIndex={0}
      >
        {history.length === 0 && (
          <div style={{ color: "#888", fontSize: 15 }}>
            Posez une question ou choisissez une suggestion ci-dessous.
          </div>
        )}
        {history.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              textAlign: msg.from === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: msg.from === "user" ? "#1976d2" : "#e3f2fd",
                color: msg.from === "user" ? "#fff" : "#1976d2",
                borderRadius: 8,
                padding: "0.5em 1em",
                fontSize: 15,
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ color: "#1976d2", fontStyle: "italic" }}>
            L’agent réfléchit...
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        style={{ display: "flex", gap: 8, marginBottom: 10 }}
        autoComplete="off"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question accessibilité…"
          aria-label="Saisir une question accessibilité"
          disabled={loading}
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid #1976d2",
            padding: "0.6em 1em",
            fontSize: 15,
            background: "#fff",
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Envoyer la question"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.6em 1.2em",
            fontWeight: "bold",
            fontSize: 15,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          Envoyer
        </button>
      </form>
      <div
        style={{ marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 8 }}
      >
        {defaultSuggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(s)}
            disabled={loading}
            aria-label={`Suggestion : ${s}`}
            style={{
              background: "#e3f2fd",
              color: "#1976d2",
              border: "none",
              borderRadius: 8,
              padding: "0.4em 1em",
              fontWeight: "bold",
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <footer
        style={{
          marginTop: 16,
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

export default AccessibilityAgent;

/**
 * Documentation :
 * - Agent accessibilité IA : chat, suggestions, diagnostic, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
