import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUniversalAccess,
  FaCheckCircle,
} from "react-icons/fa";

/**
 * ProfileForm – Achiri
 * Formulaire de gestion du profil utilisateur inclusif : accessibilité, sécurité, mobile/web, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : édition profil, email, mot de passe, accessibilité, feedback utilisateur.
 * - Prêt pour extensions futures (avatar, préférences, dark mode, etc).
 *
 * Props :
 *   user: { name, email, accessibility } (objet utilisateur initial)
 *   onUpdate: function(userData) (callback lors de la mise à jour)
 */

const accessibilityOptions = [
  { value: "Sous-titres", label: "Sous-titres", icon: <FaUniversalAccess /> },
  {
    value: "Lecture vocale",
    label: "Lecture vocale",
    icon: <FaUniversalAccess style={{ color: "#43a047" }} />,
  },
];

export default function ProfileForm({ user = {}, onUpdate }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [accessibility, setAccessibility] = useState(user.accessibility || []);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCheckbox = (option) => {
    setAccessibility((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option],
    );
  };

  const validateEmail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Le nom est requis.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email invalide.");
      return;
    }
    if (password && password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    // Simulation d'appel API
    const userData = {
      name: name.trim(),
      email: email.trim(),
      accessibility,
      ...(password ? { password } : {}),
    };
    setTimeout(() => {
      setSuccess("Profil mis à jour !");
      setPassword("");
      if (onUpdate) onUpdate(userData);
      setTimeout(() => setSuccess(""), 2000);
    }, 700);
  };

  return (
    <form
      className="profile-form"
      style={{
        background: "#f9fafb",
        borderRadius: 12,
        padding: "2rem",
        maxWidth: 500,
        margin: "2rem auto",
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.08)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
      aria-label="Modifier mon profil"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.25em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FaUser /> Mon profil
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
      <label
        htmlFor="profile-name"
        style={{ fontWeight: 500, marginTop: 18, display: "block" }}
      >
        Nom{" "}
        <span aria-hidden="true" style={{ color: "#d32f2f" }}>
          *
        </span>
      </label>
      <input
        id="profile-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={60}
        required
        aria-required="true"
        aria-label="Nom"
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #1976d2",
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 12,
          marginTop: 4,
        }}
      />
      <label
        htmlFor="profile-email"
        style={{ fontWeight: 500, display: "block" }}
      >
        Email{" "}
        <span aria-hidden="true" style={{ color: "#d32f2f" }}>
          *
        </span>
      </label>
      <input
        id="profile-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={80}
        required
        aria-required="true"
        aria-label="Email"
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #1976d2",
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 12,
          marginTop: 4,
        }}
      />
      <label
        htmlFor="profile-password"
        style={{ fontWeight: 500, display: "block" }}
      >
        Nouveau mot de passe (optionnel){" "}
        <FaLock style={{ color: "#bdbdbd", marginLeft: 4 }} />
      </label>
      <input
        id="profile-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={32}
        aria-label="Nouveau mot de passe"
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #bdbdbd",
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 18,
          marginTop: 4,
        }}
        autoComplete="new-password"
      />
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
        aria-label="Mettre à jour le profil"
      >
        <FaUser style={{ marginRight: 8 }} /> Mettre à jour
      </button>
    </form>
  );
}

/**
 * Documentation :
 * - Formulaire de gestion du profil utilisateur inclusif : nom, email, mot de passe, accessibilité.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : validation, feedback utilisateur, pas d’info sensible, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
