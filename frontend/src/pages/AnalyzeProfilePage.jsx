import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * AnalyzeProfilePage – Achiri
 * Analyse IA du profil utilisateur : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Modules IA, recommandations, extension facile, dark mode, mobile first.
 * - Prêt pour extensions futures (statistiques, RGPD, export, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

const AnalyzeProfilePage = ({ children }) => {
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
        maxWidth: 900,
        margin: "2rem auto",
        padding: "1.5rem",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #223366 100%)"
          : "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.06)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Section Analyse de Profil IA"
      tabIndex={0}
    >
      <Helmet>
        <title>Analyse de Profil IA | Achiri</title>
        <meta
          name="description"
          content="Analyse intelligente et recommandations personnalisées pour votre profil sur Achiri. Plateforme IA inclusive, accessible et sécurisée."
        />
        <html lang="fr" />
      </Helmet>
      <header
        style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            color: darkMode ? "#ffd600" : "#1976d2",
            fontWeight: 700,
            fontSize: "2rem",
            margin: 0,
            flex: 1,
          }}
        >
          Analyse de Profil IA
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
      </header>
      <p
        style={{
          color: darkMode ? "#e3f2fd" : "#444",
          marginBottom: 0,
          fontSize: "1.1em",
        }}
      >
        Cette section propose des outils d’analyse de profil basés sur
        l’intelligence artificielle pour personnaliser l’expérience utilisateur
        et offrir des recommandations adaptées.
      </p>
      <section
        style={{
          background: darkMode ? "#223366" : "#f5f5f5",
          borderRadius: 10,
          padding: 28,
          marginBottom: 36,
          boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.04)",
          color: darkMode ? "#ffd600" : "#222",
        }}
        aria-labelledby="outils-analyse-profil"
      >
        <h2
          id="outils-analyse-profil"
          style={{
            color: darkMode ? "#ffd600" : "#333",
            fontSize: "1.25em",
            fontWeight: 600,
          }}
        >
          Outils disponibles :
        </h2>
        <ul style={{ marginLeft: 28, fontSize: "1.07em", lineHeight: 1.7 }}>
          <li>Analyse comportementale par IA</li>
          <li>Recommandations personnalisées</li>
          <li>Respect de la vie privée et sécurité des données</li>
          <li>Autres modules d’analyse à venir…</li>
        </ul>
      </section>
      {/* Zone pour les composants enfants (modules IA, widgets, etc.) */}
      <section aria-label="Modules d'analyse IA" style={{ minHeight: 120 }}>
        {children}
      </section>
      {/* Navigation rapide vers les principales pages */}
      <nav
        style={{
          marginTop: 32,
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
        aria-label="Navigation principale"
      >
        <Link
          to="/"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Accueil
        </Link>
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
          to="/challenges"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Challenges
        </Link>
        <Link
          to="/emergency-settings"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Urgence
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
        main[aria-label="Section Analyse de Profil IA"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 900px) {
          main[aria-label="Section Analyse de Profil IA"] {
            padding: 0.7em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Section Analyse de Profil IA"] {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          h1, h2 {
            color: #ffd600 !important;
          }
          section[aria-labelledby="outils-analyse-profil"] {
            background: #223366 !important;
            color: #ffd600 !important;
          }
        }
      `}</style>
    </main>
  );
};

export default AnalyzeProfilePage;

/**
 * Documentation :
 * - AnalyzeProfilePage : analyse IA, recommandations, modules extensibles, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, respect vie privée, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (statistiques, RGPD, export, etc).
 */
