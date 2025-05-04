import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * Accueil – Achiri
 * Page d'accueil inclusive : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Présentation, navigation rapide, branding, dark mode, mobile first.
 * - Prêt pour extensions futures (actus, onboarding, stats, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

const Accueil = () => {
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
    <div
      className="accueil-container"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2em 1em",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #223366 100%)"
          : "linear-gradient(120deg, #f8fafc 60%, #e3f2fd 100%)",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d222",
        margin: "2em auto",
        maxWidth: 700,
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s"
      }}
      aria-label="Page d'accueil Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>Accueil – Achiri</title>
        <meta name="description" content="Bienvenue sur Achiri, la plateforme IA inclusive : accessibilité, santé, domotique, éducation, influence. Pour tous, partout." />
        <html lang="fr" />
      </Helmet>
      <header style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h1 style={{
          color: darkMode ? "#ffd600" : "#1976d2",
          fontSize: "2.1em",
          marginBottom: 12,
          textAlign: "center",
          fontWeight: 700,
          flex: 1
        }}>
          Bienvenue sur <span style={{ color: darkMode ? "#43a047" : "#43a047" }}>Achiri</span>
        </h1>
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
      </header>
      <p style={{ fontSize: "1.2em", color: darkMode ? "#e3f2fd" : "#333", textAlign: "center", marginBottom: 24 }}>
        Plateforme IA inclusive : <b>accessibilité</b>, <b>santé</b>, <b>domotique</b>, <b>éducation</b>, <b>influence</b>.<br />
        Pour tous, partout.
      </p>
      {/* Navigation rapide vers les principales pages */}
      <nav aria-label="Navigation principale" style={{ marginBottom: 32, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        <Link
          to="/dashboard"
          className="btn"
          style={{
            margin: 8,
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            borderRadius: 8,
            padding: "0.7em 1.5em",
            fontWeight: "bold",
            fontSize: "1.1em",
            textDecoration: "none",
            boxShadow: "0 2px 8px #1976d222",
            transition: "background 0.2s"
          }}
          aria-label="Accéder au tableau de bord"
        >
          Tableau de bord
        </Link>
        <Link to="/accessibilite" className="btn" style={{
          margin: 8,
          background: "linear-gradient(90deg, #43a047 0%, #1976d2 100%)",
          color: "#fff",
          borderRadius: 8,
          padding: "0.7em 1.5em",
          fontWeight: "bold",
          fontSize: "1.1em",
          textDecoration: "none",
          boxShadow: "0 2px 8px #1976d222",
          transition: "background 0.2s"
        }} aria-label="Découvrir les outils d’accessibilité">
          Accessibilité
        </Link>
        <Link to="/profile" className="btn" style={{
          margin: 8,
          background: "linear-gradient(90deg, #1976d2 0%, #ffd600 100%)",
          color: "#222",
          borderRadius: 8,
          padding: "0.7em 1.5em",
          fontWeight: "bold",
          fontSize: "1.1em",
          textDecoration: "none",
          boxShadow: "0 2px 8px #1976d222",
          transition: "background 0.2s"
        }} aria-label="Voir mon profil">
          Profil
        </Link>
        <Link to="/challenges" className="btn" style={{
          margin: 8,
          background: "linear-gradient(90deg, #d32f2f 0%, #1976d2 100%)",
          color: "#fff",
          borderRadius: 8,
          padding: "0.7em 1.5em",
          fontWeight: "bold",
          fontSize: "1.1em",
          textDecoration: "none",
          boxShadow: "0 2px 8px #1976d222",
          transition: "background 0.2s"
        }} aria-label="Voir les challenges">
          Challenges
        </Link>
        <Link to="/virtual-classroom" className="btn" style={{
          margin: 8,
          background: "linear-gradient(90deg, #43a047 0%, #ffd600 100%)",
          color: "#222",
          borderRadius: 8,
          padding: "0.7em 1.5em",
          fontWeight: "bold",
          fontSize: "1.1em",
          textDecoration: "none",
          boxShadow: "0 2px 8px #1976d222",
          transition: "background 0.2s"
        }} aria-label="Accéder aux classes virtuelles">
          Classes Virtuelles
        </Link>
        <Link to="/emergency-settings" className="btn" style={{
          margin: 8,
          background: "linear-gradient(90deg, #d32f2f 0%, #ffd600 100%)",
          color: "#222",
          borderRadius: 8,
          padding: "0.7em 1.5em",
          fontWeight: "bold",
          fontSize: "1.1em",
          textDecoration: "none",
          boxShadow: "0 2px 8px #1976d222",
          transition: "background 0.2s"
        }} aria-label="Paramètres d'urgence">
          Urgence
        </Link>
      </nav>
      <section
        aria-label="Présentation Achiri"
        style={{
          background: darkMode ? "#223366" : "#fff",
          borderRadius: 12,
          padding: "1.2em",
          boxShadow: "0 1px 8px #1976d222",
          color: darkMode ? "#ffd600" : "#222",
          maxWidth: 540,
          margin: "0 auto"
        }}
      >
        <h2 style={{ color: darkMode ? "#ffd600" : "#1976d2", fontSize: "1.3em", marginBottom: 8 }}>Notre mission</h2>
        <p style={{ fontSize: "1em", marginBottom: 0 }}>
          Offrir une plateforme intelligente, inclusive et sécurisée, accessible à tous, pour faciliter la vie quotidienne, l’apprentissage, la santé et l’autonomie. <br />
          <b>Rejoignez-nous pour construire l’avenir de l’accessibilité !</b>
        </p>
      </section>
      <footer
        style={{
          marginTop: 28,
          color: darkMode ? "#ffd600" : "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        .accueil-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          .accueil-container {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .accueil-container {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          section[aria-label="Présentation Achiri"] {
            background: #223366 !important;
            color: #ffd600 !important;
          }
          h1, h2 {
            color: #ffd600 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Accueil;

/**
 * Documentation :
 * - Accueil : page d’accueil, navigation rapide, branding, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (actus, onboarding, stats, etc).
 */