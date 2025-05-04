import React, { useState } from "react";
import { FaPlusCircle, FaUniversalAccess, FaVolumeUp, FaLanguage, FaLock } from "react-icons/fa";

/**
 * CreateRoomForm – Achiri
 * Formulaire de création de salle virtuelle inclusive : accessibilité, sécurité, mobile/web, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : création de salle, choix accessibilité, validation, feedback utilisateur.
 * - Prêt pour extensions futures (modération, tags, dark mode, etc).
 *
 * Props :
 *   onCreate: function(roomData) (callback lors de la création réussie)
 */

const accessibilityOptions = [
  { value: "Sous-titres", label: "Sous-titres", icon: <FaUniversalAccess /> },
  { value: "Lecture vocale", label: "Lecture vocale", icon: <FaVolumeUp /> },
  { value: "Traduction", label: "Traduction", icon: <FaLanguage /> }
];

export default function CreateRoomForm({ onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessibility, setAccessibility] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCheckbox = (option) => {
    setAccessibility((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Le nom de la salle est requis.");
      return;
    }
    if (name.length > 60) {
      setError("Le nom de la salle est trop long.");
      return;
    }
    if (description.length > 200) {
      setError("La description est trop longue.");
      return;
    }
    // Simulation d'appel API
    const roomData = {
      name: name.trim(),
      description: description.trim(),
      accessibility,
      password: password.trim() || undefined
    };
    setTimeout(() => {
      setSuccess("Salle créée avec succès !");
      setName("");
      setDescription("");
      setAccessibility([]);
      setPassword("");
      if (onCreate) onCreate(roomData);
      setTimeout(() => setSuccess(""), 2000);
    }, 700);
  };

  return (
    <form
      className="create-room-form"
      style={{
        background: "#f9fafb",
        borderRadius: 12,
        padding: "2rem",
        maxWidth: 500,
        margin: "2rem auto",
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.08)",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Créer une nouvelle salle virtuelle"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.25em", display: "flex", alignItems: "center", gap: 8 }}>
        <FaPlusCircle /> Créer une salle virtuelle
      </h2>
      {error && <div style={{ color: "red", marginBottom: 8 }} aria-live="assertive">{error}</div>}
      {success && <div style={{ color: "#43a047", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }} aria-live="polite">{success}</div>}
      <label htmlFor="room-name" style={{ fontWeight: 500, marginTop: 18, display: "block" }}>
        Nom de la salle <span aria-hidden="true" style={{ color: "#d32f2f" }}>*</span>
      </label>
      <input
        id="room-name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={60}
        required
        aria-required="true"
        aria-label="Nom de la salle"
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #1976d2",
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 12,
          marginTop: 4
        }}
      />
      <label htmlFor="room-description" style={{ fontWeight: 500, display: "block" }}>
        Description
      </label>
      <textarea
        id="room-description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        maxLength={200}
        aria-label="Description de la salle"
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #bdbdbd",
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 12,
          marginTop: 4,
          minHeight: 60,
          resize: "vertical"
        }}
      />
      <fieldset style={{ border: "none", margin: 0, padding: 0, marginBottom: 16 }}>
        <legend style={{ fontWeight: 500, marginBottom: 6 }}>Options d’accessibilité</legend>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {accessibilityOptions.map(opt => (
            <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400, cursor: "pointer" }}>
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
      <label htmlFor="room-password" style={{ fontWeight: 500, display: "block" }}>
        Mot de passe (optionnel) <FaLock style={{ color: "#bdbdbd", marginLeft: 4 }} />
      </label>
      <input
        id="room-password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        maxLength={32}
        aria-label="Mot de passe de la salle"
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #bdbdbd",
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 18,
          marginTop: 4
        }}
        autoComplete="new-password"
      />
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
          transition: "background 0.2s"
        }}
        aria-label="Créer la salle"
      >
        <FaPlusCircle style={{ marginRight: 8 }} /> Créer la salle
      </button>
    </form>
  );
}

/**
 * Documentation :
 * - Formulaire de création de salle virtuelle inclusive : nom, description, accessibilité, mot de passe.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : validation, feedback utilisateur, pas d’info sensible, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */