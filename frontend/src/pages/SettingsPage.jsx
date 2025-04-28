import React, { useState } from 'react';
import { Link } from "react-router-dom";

const mockSettings = {
  email: "utilisateur@achiri.com",
  pseudo: "Utilisateur",
  avatar: "😀",
  notifications: true,
  theme: "light",
  language: "fr",
};

function SettingsPage({ userId = "demo-user" }) {
  const [settings, setSettings] = useState(mockSettings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de sauvegarde (aucun appel réseau)
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main
      style={{
        maxWidth: 500,
        margin: "2.5rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2.5rem 2rem",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Paramètres du profil"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 24, textAlign: "center" }}>
        ⚙️ Paramètres du profil
      </h2>
      <form onSubmit={handleSubmit} aria-label="Formulaire de paramètres">
        <div style={{ marginBottom: 22, textAlign: "center" }}>
          <span style={{
            fontSize: 48,
            background: "#e3f2fd",
            borderRadius: "50%",
            padding: "0.2em 0.4em",
            display: "inline-block"
          }}>
            {settings.avatar}
          </span>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: "#1976d2" }}>
            Pseudo
            <input
              type="text"
              name="pseudo"
              value={settings.pseudo}
              onChange={handleChange}
              style={{
                width: "100%",
                border: "1px solid #bbdefb",
                borderRadius: 8,
                padding: "0.5em 1em",
                fontSize: 16,
                marginTop: 4
              }}
              maxLength={32}
              aria-label="Pseudo"
              required
              autoComplete="nickname"
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: "#1976d2" }}>
            Email
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              style={{
                width: "100%",
                border: "1px solid #bbdefb",
                borderRadius: 8,
                padding: "0.5em 1em",
                fontSize: 16,
                marginTop: 4
              }}
              maxLength={64}
              aria-label="Email"
              required
              autoComplete="email"
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: "#1976d2" }}>
            Langue
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              style={{
                width: "100%",
                border: "1px solid #bbdefb",
                borderRadius: 8,
                padding: "0.5em 1em",
                fontSize: 16,
                marginTop: 4
              }}
              aria-label="Langue"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: "#1976d2" }}>
            Thème
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              style={{
                width: "100%",
                border: "1px solid #bbdefb",
                borderRadius: 8,
                padding: "0.5em 1em",
                fontSize: 16,
                marginTop: 4
              }}
              aria-label="Thème"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </label>
        </div>
        <div style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            id="notif"
            style={{ accentColor: "#1976d2", width: 18, height: 18 }}
            aria-checked={settings.notifications}
            aria-label="Recevoir les notifications"
          />
          <label htmlFor="notif" style={{ color: "#1976d2", fontWeight: "bold" }}>
            Recevoir les notifications
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "0.7em 0",
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer",
            marginTop: 10,
            boxShadow: "0 2px 8px #1976d222",
            transition: "opacity 0.2s"
          }}
          aria-label="Sauvegarder les paramètres"
        >
          Sauvegarder
        </button>
        {saved && (
          <div
            style={{
              color: "#388e3c",
              background: "#c8e6c9",
              borderRadius: 6,
              padding: 8,
              marginTop: 16,
              textAlign: "center",
              fontWeight: "bold"
            }}
            role="status"
            aria-live="polite"
          >
            Paramètres sauvegardés !
          </div>
        )}
      </form>
      {/* Navigation rapide vers les principales pages */}
      <nav style={{ marginTop: 32, textAlign: "center" }} aria-label="Navigation principale">
        <Link to="/" style={{ margin: 8 }}>Accueil</Link>
        <Link to="/dashboard" style={{ margin: 8 }}>Dashboard</Link>
        <Link to="/profile" style={{ margin: 8 }}>Profil</Link>
        <Link to="/accessibilite" style={{ margin: 8 }}>Accessibilité</Link>
        <Link to="/challenges" style={{ margin: 8 }}>Challenges</Link>
        <Link to="/friends" style={{ margin: 8 }}>Amis</Link>
        <Link to="/leaderboard" style={{ margin: 8 }}>Classement</Link>
        <Link to="/creator-tools" style={{ margin: 8 }}>Creator Tools</Link>
        <Link to="/admin" style={{ margin: 8 }}>Admin</Link>
      </nav>
    </main>
  );
}

export default SettingsPage;