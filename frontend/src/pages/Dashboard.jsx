import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Wallet from "../components/wallet/Wallet.jsx";
import Notifications from "../components/notifications/Notifications.js";
import VirtualClassroomList from "../components/virtualclassroom/VirtualClassroomList.jsx";
import AccessibilityTest from "../components/accessibility/AccessibilityTest.jsx";
import ProfileAnalysis from "../components/profile/ProfileAnalysis.jsx";

/**
 * Dashboard – Achiri
 * Tableau de bord centralisé pour l'utilisateur.
 * - Affiche portefeuille, notifications, classes virtuelles, test accessibilité, analyse de profil.
 * - Navigation rapide, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Prêt pour extensions futures (widgets, stats, badges, dark mode, etc).
 */

const Dashboard = ({ userId }) => {
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
      aria-label="Tableau de bord"
      tabIndex={0}
    >
      <Helmet>
        <title>Tableau de bord | Achiri</title>
        <meta
          name="description"
          content="Votre tableau de bord Achiri : portefeuille, notifications, classes virtuelles, accessibilité, analyse IA. Plateforme IA inclusive, accessible et sécurisée."
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
          Tableau de bord
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
        Retrouvez ici vos informations principales, notifications, classes
        virtuelles et outils d’accessibilité.
      </p>
      <section aria-label="Mon portefeuille" style={{ marginBottom: 32 }}>
        <Wallet userId={userId} darkMode={darkMode} />
      </section>
      <section aria-label="Notifications" style={{ marginBottom: 32 }}>
        <Notifications userId={userId} darkMode={darkMode} />
      </section>
      <section aria-label="Classes virtuelles" style={{ marginBottom: 32 }}>
        <VirtualClassroomList userId={userId} darkMode={darkMode} />
      </section>
      <section aria-label="Test d'accessibilité" style={{ marginBottom: 32 }}>
        <AccessibilityTest userId={userId} darkMode={darkMode} />
      </section>
      <section aria-label="Analyse de profil" style={{ marginBottom: 0 }}>
        <ProfileAnalysis userId={userId} darkMode={darkMode} />
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
          to="/moderation"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Modération
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
        main[aria-label="Tableau de bord"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 900px) {
          main[aria-label="Tableau de bord"] {
            padding: 0.7em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Tableau de bord"] {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          h1 {
            color: #ffd600 !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Dashboard;

/**
 * Documentation :
 * - Dashboard : centralisation infos utilisateur, navigation rapide, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (widgets, stats, badges, dark mode, etc).
 */
