import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * NotFound – Achiri
 * Page 404 personnalisée : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Message clair, navigation rapide, dark mode, mobile first.
 * - Prêt pour extensions futures (recherche, feedback, support, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

export default function NotFound() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "6rem auto",
        padding: "2rem",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #1976d2 100%)"
          : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        textAlign: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Page non trouvée"
      tabIndex={0}
    >
      <Helmet>
        <title>404 - Page non trouvée | Achiri</title>
        <meta name="robots" content="noindex" />
        <html lang="fr" />
      </Helmet>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: darkMode ? "#ffd600" : "#1976d2",
            margin: 0,
            flex: 1,
          }}
        >
          404
        </h1>
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={
            darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
          }
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#ffd600" : "#1976d2",
            cursor: "pointer",
            fontSize: 22,
            marginLeft: 12,
          }}
          tabIndex={0}
        >
          {darkMode ? "🎨" : "🌙"}
        </button>
      </div>
      <h2 style={{ color: "#888", marginTop: 8, marginBottom: 16 }}>
        Page non trouvée
      </h2>
      <p
        style={{
          fontSize: "1.1em",
          color: darkMode ? "#e3f2fd" : "#444",
          marginBottom: 32,
        }}
      >
        Oups, la page que vous cherchez n’existe pas ou a été déplacée.
        <br />
        Utilisez la navigation ci-dessous pour retrouver votre chemin.
      </p>
      <Link
        to="/"
        style={{
          color: "#fff",
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
          padding: "0.7em 1.5em",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.1em",
          boxShadow: "0 1px 4px #1976d211",
          transition: "opacity 0.2s",
        }}
        aria-label="Retour à l’accueil"
      >
        Retour à l’accueil
      </Link>
      {/* Navigation rapide vers les principales pages */}
      <nav
        style={{
          marginTop: 32,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
        aria-label="Navigation principale"
      >
        <Link
          to="/dashboard"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Profil
        </Link>
        <Link
          to="/settings"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Paramètres
        </Link>
        <Link
          to="/accessibilite"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Accessibilité
        </Link>
        <Link
          to="/challenges"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Challenges
        </Link>
        <Link
          to="/friends"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Amis
        </Link>
        <Link
          to="/leaderboard"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Classement
        </Link>
        <Link
          to="/creator-tools"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Creator Tools
        </Link>
        <Link
          to="/admin"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Admin
        </Link>
        <Link
          to="/music"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Musique
        </Link>
        <Link
          to="/notifications"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Notifications
        </Link>
        <Link
          to="/social-interactions"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Interactions Sociales
        </Link>
        <Link
          to="/reseaux-sociaux"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Réseaux Sociaux
        </Link>
        <Link
          to="/rooms"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Rooms
        </Link>
        <Link
          to="/virtual-classroom"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Classes Virtuelles
        </Link>
        <Link
          to="/wallet"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Wallet
        </Link>
      </nav>
      <footer
        style={{
          marginTop: 24,
          color: darkMode ? "#ffd600" : "#888",
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
      <style>{`
        main[aria-label="Page non trouvée"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 500px) {
          main[aria-label="Page non trouvée"] {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Page non trouvée"] {
            background: linear-gradient(120deg, #181f2a 60%, #1976d2 100%) !important;
            color: #e3f2fd !important;
          }
          h1 {
            color: #ffd600 !important;
          }
        }
      `}</style>
    </main>
  );
}

/**
 * Documentation :
 * - NotFound : page 404 personnalisée, navigation rapide, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (recherche, feedback, support, etc).
 */
