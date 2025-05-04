import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * AccessibilityOptions – Achiri
 * Panel d’options d’accessibilité pour la salle vidéo.
 * Props :
 * - accessibility : objet d’options { subtitles, signLanguage, highContrast, reduceMotion, tts, darkMode }
 * - setAccessibility : fonction pour mettre à jour les options
 * - onClose : callback pour fermer le panel
 */

export default function AccessibilityOptions({ accessibility = {}, setAccessibility, onClose }) {
  const [localOptions, setLocalOptions] = useState(accessibility);

  const handleChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLocalOptions((prev) => ({ ...prev, [key]: value }));
    if (setAccessibility) setAccessibility({ ...localOptions, [key]: value });
  };

  return (
    <div
      className="accessibility-options-panel"
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#fff",
        color: "#222",
        borderRadius: 16,
        boxShadow: "0 4px 32px #0002",
        padding: 24,
        minWidth: 320,
        maxWidth: 480,
        width: "90vw",
        outline: "none",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Options d'accessibilité"
      tabIndex={-1}
    >
      <h2 style={{ marginTop: 0, fontSize: "1.3em" }}>Options d’accessibilité</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={!!localOptions.subtitles}
            onChange={handleChange("subtitles")}
          />
          Sous-titres automatiques
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={!!localOptions.signLanguage}
            onChange={handleChange("signLanguage")}
          />
          Interprète langue des signes
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={!!localOptions.highContrast}
            onChange={handleChange("highContrast")}
          />
          Contraste élevé
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={!!localOptions.reduceMotion}
            onChange={handleChange("reduceMotion")}
          />
          Réduire les animations
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={!!localOptions.tts}
            onChange={handleChange("tts")}
          />
          Synthèse vocale (TTS)
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={!!localOptions.darkMode}
            onChange={handleChange("darkMode")}
          />
          Mode sombre
        </label>
      </form>
      <div style={{ marginTop: 18, textAlign: "right" }}>
        <button
          onClick={onClose}
          style={{
            background: "#eee",
            color: "#222",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: "1em",
            cursor: "pointer",
          }}
          aria-label="Fermer le panel d'accessibilité"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

AccessibilityOptions.propTypes = {
  accessibility: PropTypes.object,
  setAccessibility: PropTypes.func,
  onClose: PropTypes.func,
};