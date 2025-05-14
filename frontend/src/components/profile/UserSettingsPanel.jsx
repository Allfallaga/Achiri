import React, { useState } from "react";
import {
  FaCog,
  FaMoon,
  FaSun,
  FaUniversalAccess,
  FaCheckCircle,
} from "react-icons/fa";

/**
 * UserSettingsPanel – Achiri
 * Panneau de réglages utilisateur inclusif : accessibilité, thème, sécurité, responsive, SEO, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : thème clair/sombre, options d’accessibilité, feedback utilisateur, sauvegarde.
 * - Prêt pour extensions futures (notifications, export, préférences IA, etc).
 *
 * Props :
 *   settings: { theme, accessibility } (objet initial)
 *   onUpdate: function(newSettings) (callback lors de la sauvegarde)
 */

const accessibilityOptions = [
  { value: "Sous-titres", label: "Sous-titres", icon: <FaUniversalAccess /> },
  {
    value: "Lecture vocale",
    label: "Lecture vocale",
    icon: <FaUniversalAccess style={{ color: "#43a047" }} />,
  },
];

export default function UserSettingsPanel({ settings = {}, onUpdate }) {
  const [theme, setTheme] = useState(settings.theme || "light");
  const [accessibility, setAccessibility] = useState(
    settings.accessibility || [],
  );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCheckbox = (option) => {
    setAccessibility((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option],
    );
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value); // Pour CSS dark mode
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Simulation d'appel API
    const newSettings = { theme, accessibility };
    setTimeout(() => {
      setSuccess("Réglages sauvegardés !");
      if (onUpdate) onUpdate(newSettings);
      setTimeout(() => setSuccess(""), 2000);
    }, 600);
  };

  return (
    <form
      className="user-settings-panel"
      style={{
        background: "#f9fafb",
        borderRadius: 12,
        padding: "2rem",
        maxWidth: 500,
        margin: "2rem auto",
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.08)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
      aria-label="Réglages utilisateur"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.2em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FaCog /> Réglages utilisateur
      </h2>
      {error && (
        <div style={{ color: "red", marginBottom: 8 }} aria-live="assertive">
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            color: "#43a047",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          aria-live="polite"
        >
          <FaCheckCircle /> {success}
        </div>
      )}

      {/* Thème */}
      <fieldset
        style={{ border: "none", margin: 0, padding: 0, marginBottom: 18 }}
      >
        <legend style={{ fontWeight: 500, marginBottom: 6 }}>Thème</legend>
        <div style={{ display: "flex", gap: 18 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={() => handleThemeChange("light")}
              aria-checked={theme === "light"}
              aria-label="Thème clair"
              style={{ marginRight: 4 }}
            />
            <FaSun style={{ color: "#fbbf24" }} /> Clair
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={() => handleThemeChange("dark")}
              aria-checked={theme === "dark"}
              aria-label="Thème sombre"
              style={{ marginRight: 4 }}
            />
            <FaMoon style={{ color: "#6366f1" }} /> Sombre
          </label>
        </div>
      </fieldset>

      {/* Accessibilité */}
      <fieldset
        style={{ border: "none", margin: 0, padding: 0, marginBottom: 16 }}
      >
        <legend style={{ fontWeight: 500, marginBottom: 6 }}>
          Options d’accessibilité
        </legend>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {accessibilityOptions.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 400,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={accessibility.includes(opt.value)}
                onChange={() => handleCheckbox(opt.value)}
                aria-checked={accessibility.includes(opt.value)}
                aria-label={opt.label}
                style={{ marginRight: 4 }}
              />
              <span style={{ fontSize: 18 }}>{opt.icon}</span> {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        style={{
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "0.8em 2em",
          fontWeight: 600,
          fontSize: "1em",
          cursor: "pointer",
          marginTop: 8,
          transition: "background 0.2s",
        }}
        aria-label="Sauvegarder les réglages"
      >
        <FaCog style={{ marginRight: 8 }} /> Sauvegarder
      </button>
      <footer
        style={{
          marginTop: 24,
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
    </form>
  );
}

/**
 * Documentation :
 * - Panneau de réglages utilisateur inclusif : thème clair/sombre, accessibilité, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
