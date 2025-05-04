import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * SettingsPage – Achiri
 * Paramètres utilisateur : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Modification profil, thème, langue, notifications, dark mode, mobile first.
 * - Prêt pour extensions futures (avatar upload, sécurité, RGPD, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

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
  const [darkMode, setDarkMode] = useState(false);

  // Gestion du dark mode global
  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    setSettings(prev => ({
      ...prev,
      theme: !darkMode ? "dark" : "light"
    }));
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setSaved(false);
    if (name === "theme") {
      setDarkMode(value === "dark");
      if (value === "dark") {
        document.body.classList.add("achiri-dark");
      } else {
        document.body.classList.remove("achiri-dark");
      }
    }
  };

  // Simulation de sauvegarde
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main
      style={{
        maxWidth: 500,
        margin: "2.5rem auto",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #223366 100%)"
          : "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2.5rem 2rem",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s"
      }}
      aria-label="Paramètres du profil"
      tabIndex={0}
    >
      <Helmet>
        <title>Paramètres | Achiri</title>
        <meta name="description" content="Gérez vos paramètres de profil, notifications, thème et langue sur Achiri. Plateforme IA inclusive, accessible et sécurisée." />
        <html lang="fr" />
      </Helmet>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h2 style={{ color: darkMode ? "#ffd600" : "#1976d2", marginBottom: 24, textAlign: "center", flex: 1 }}>
          ⚙️ Paramètres du profil
        </h2>
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#ffd600" : "#1976d2",
            cursor: "pointer",
            fontSize: 22,
            marginLeft: 12
          }}
          tabIndex={0}
        >
          {darkMode ? "🎨" : "🌙"}
        </button>
      </div>
      <form onSubmit={handleSubmit} aria-label="Formulaire de paramètres">
        <div style={{ marginBottom: 22, textAlign: "center" }}>
          <span style={{
            fontSize: 48,
            background: darkMode ? "#223366" : "#e3f2fd",
            borderRadius: "50%",
            padding: "0.2em 0.4em",
            display: "inline-block"
          }}>
            {settings.avatar}
          </span>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: darkMode ? "#ffd600" : "#1976d2" }}>
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
                marginTop: 4,
                background: darkMode ? "#181f2a" : "#fff",
                color: darkMode ? "#ffd600" : "#222"
              }}
              maxLength={32}
              aria-label="Pseudo"
              required
              autoComplete="nickname"
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: darkMode ? "#ffd600" : "#1976d2" }}>
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
                marginTop: 4,
                background: darkMode ? "#181f2a" : "#fff",
                color: darkMode ? "#ffd600" : "#222"
              }}
              maxLength={64}
              aria-label="Email"
              required
              autoComplete="email"
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: "bold", color: darkMode ? "#ffd600" : "#1976d2" }}>
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
                marginTop: 4,
                background: darkMode ? "#181f2a" : "#fff",
                color: darkMode ? "#ffd600" : "#222"
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
          <label style={{ fontWeight: "bold", color: darkMode ? "#ffd600" : "#1976d2" }}>
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
                marginTop: 4,
                background: darkMode ? "#181f2a" : "#fff",
                color: darkMode ? "#ffd600" : "#222"
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
            style={{ accentColor: darkMode ? "#ffd600" : "#1976d2", width: 18, height: 18 }}
            aria-checked={settings.notifications}
            aria-label="Recevoir les notifications"
          />
          <label htmlFor="notif" style={{ color: darkMode ? "#ffd600" : "#1976d2", fontWeight: "bold" }}>
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
      <nav style={{
        marginTop: 32,
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center"
      }} aria-label="Navigation principale">
        <Link to="/" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Accueil</Link>
        <Link to="/dashboard" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Dashboard</Link>
        <Link to="/profile" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Profil</Link>
        <Link to="/accessibilite" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Accessibilité</Link>
        <Link to="/challenges" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Challenges</Link>
        <Link to="/friends" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Amis</Link>
        <Link to="/leaderboard" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Classement</Link>
        <Link to="/creator-tools" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Creator Tools</Link>
        <Link to="/admin" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Admin</Link>
        <Link to="/music" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Musique</Link>
        <Link to="/notifications" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Notifications</Link>
        <Link to="/social-interactions" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Interactions Sociales</Link>
        <Link to="/reseaux-sociaux" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Réseaux Sociaux</Link>
        <Link to="/rooms" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Rooms</Link>
        <Link to="/settings" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Paramètres</Link>
        <Link to="/virtual-classroom" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Classes Virtuelles</Link>
        <Link to="/wallet" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Wallet</Link>
      </nav>
      <footer
        style={{
          marginTop: 24,
          color: darkMode ? "#ffd600" : "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        main[aria-label="Paramètres du profil"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          main[aria-label="Paramètres du profil"] {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Paramètres du profil"] {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          h2 {
            color: #ffd600 !important;
          }
        }
      `}</style>
    </main>
  );
}

export default SettingsPage;

/**
 * Documentation :
 * - SettingsPage : gestion paramètres utilisateur, notifications, thème, langue, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (avatar upload, sécurité, RGPD, etc).
 */