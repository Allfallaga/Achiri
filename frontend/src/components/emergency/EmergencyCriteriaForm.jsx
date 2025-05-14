import React, { useState } from "react";

/**
 * EmergencyCriteriaForm – Achiri
 * Formulaire de critères d’urgence personnalisés : accessibilité, sécurité, mobile/web, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : sélection de critères, ajout personnalisé, validation, feedback utilisateur.
 * - Prêt pour extensions futures (analytics, dark mode, IA, etc).
 *
 * Props :
 *   criteria?: array (liste initiale des critères sélectionnés)
 *   onChange?: function (callback avec la liste des critères)
 */

const defaultCriteria = [
  "Danger immédiat",
  "Problème de santé",
  "Violence ou agression",
  "Perte de connaissance",
  "Besoin d’assistance rapide",
];

const EmergencyCriteriaForm = ({
  criteria: initialCriteria = [],
  onChange,
}) => {
  const [selected, setSelected] = useState(initialCriteria);
  const [custom, setCustom] = useState("");
  const [feedback, setFeedback] = useState("");

  // Ajout d’un critère personnalisé
  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = custom.trim();
    if (!trimmed) return;
    if (selected.includes(trimmed) || defaultCriteria.includes(trimmed)) {
      setFeedback("Ce critère existe déjà.");
      setTimeout(() => setFeedback(""), 1500);
      return;
    }
    const updated = [...selected, trimmed];
    setSelected(updated);
    setCustom("");
    setFeedback("Critère ajouté !");
    onChange && onChange(updated);
    setTimeout(() => setFeedback(""), 1500);
  };

  // Sélection/désélection d’un critère
  const handleToggle = (crit) => {
    let updated;
    if (selected.includes(crit)) {
      updated = selected.filter((c) => c !== crit);
    } else {
      updated = [...selected, crit];
    }
    setSelected(updated);
    onChange && onChange(updated);
  };

  // Suppression d’un critère personnalisé
  const handleRemove = (crit) => {
    const updated = selected.filter((c) => c !== crit);
    setSelected(updated);
    onChange && onChange(updated);
  };

  return (
    <section
      className="emergency-criteria-form"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #b71c1c33",
        padding: "2.2rem",
        outline: "none",
      }}
      aria-label="Formulaire critères d’urgence"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#b71c1c",
          fontWeight: 700,
          fontSize: "1.3em",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
        tabIndex={0}
        aria-label="Critères d’urgence personnalisés"
      >
        <span role="img" aria-label="urgence">
          🚨
        </span>
        Critères d’Urgence
      </h2>
      <form autoComplete="off" onSubmit={handleAddCustom}>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>
            Sélectionnez vos critères :
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {defaultCriteria.map((crit, i) => (
              <label
                key={i}
                style={{
                  background: selected.includes(crit) ? "#b71c1c" : "#e3f2fd",
                  color: selected.includes(crit) ? "#fff" : "#1976d2",
                  borderRadius: 8,
                  padding: "0.5em 1.1em",
                  fontWeight: "bold",
                  fontSize: 15,
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "background 0.2s",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(crit)}
                  onChange={() => handleToggle(crit)}
                  aria-checked={selected.includes(crit)}
                  aria-label={crit}
                  style={{ accentColor: "#b71c1c", marginRight: 6 }}
                />
                {crit}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label
            htmlFor="custom-criteria"
            style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
          >
            Ajouter un critère personnalisé :
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              id="custom-criteria"
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Ex : Allergie grave"
              aria-label="Ajouter un critère personnalisé"
              style={{
                flex: 1,
                borderRadius: 8,
                border: "1px solid #b71c1c",
                padding: "0.5em 1em",
                fontSize: 15,
              }}
              maxLength={40}
            />
            <button
              type="submit"
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.5em 1.2em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              aria-label="Ajouter le critère"
              disabled={!custom.trim()}
            >
              Ajouter
            </button>
          </div>
        </div>
        {/* Liste des critères personnalisés sélectionnés */}
        {selected.filter((c) => !defaultCriteria.includes(c)).length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <span
              style={{ fontWeight: 600, marginBottom: 6, display: "block" }}
            >
              Critères personnalisés :
            </span>
            <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15 }}>
              {selected
                .filter((c) => !defaultCriteria.includes(c))
                .map((crit, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {crit}
                    <button
                      type="button"
                      onClick={() => handleRemove(crit)}
                      aria-label={`Supprimer le critère ${crit}`}
                      style={{
                        background: "#b71c1c",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "0.2em 0.7em",
                        fontWeight: "bold",
                        fontSize: 13,
                        cursor: "pointer",
                        marginLeft: 6,
                      }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {feedback && (
          <div
            style={{
              color: feedback.includes("ajouté") ? "#388e3c" : "#b71c1c",
              fontWeight: 500,
              marginBottom: 8,
            }}
            aria-live="polite"
            tabIndex={0}
          >
            {feedback}
          </div>
        )}
      </form>
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
        <b>À propos :</b> Personnalisez vos critères d’urgence pour une alerte
        plus efficace et adaptée à votre situation.{" "}
        <a
          href="https://www.service-public.fr/particuliers/vosdroits/F21358"
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

export default EmergencyCriteriaForm;

/**
 * Documentation :
 * - Critères d’urgence personnalisés : sélection, ajout, suppression, feedback.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
