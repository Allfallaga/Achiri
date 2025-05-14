import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

/**
 * HomePage – Achiri
 * Page d'accueil moderne, inclusive, mobile first et SEO friendly.
 * - Saisie pseudo/room, navigation rapide, accessibilité, sécurité, responsive, dark mode, design Achiri.
 * - Prêt pour extensions futures (actus, onboarding, stats, notifications, IA, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

function HomePage({ onJoin }) {
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomId.trim() || !user.trim()) {
      setError("Veuillez saisir un nom de room et un pseudo.");
      return;
    }
    setError("");
    if (onJoin) {
      onJoin({ roomId: roomId.trim(), user: user.trim() });
    } else {
      navigate(
        `/rooms?roomId=${encodeURIComponent(roomId.trim())}&user=${encodeURIComponent(user.trim())}`,
      );
    }
  };

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
      className={`homepage-container${darkMode ? " dark" : ""}`}
      style={{
        maxWidth: 480,
        margin: "3rem auto",
        padding: "2rem 1.2rem",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #223366 100%)"
          : "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #1976d233",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Accueil Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>Accueil | Achiri – Plateforme IA Inclusive</title>
        <meta
          name="description"
          content="Rejoignez ou créez une salle de visioconférence instantanément sur Achiri. Plateforme IA inclusive : accessibilité, santé, domotique, éducation, influence."
        />
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
            textAlign: "center",
            marginBottom: 18,
            color: darkMode ? "#ffd600" : "#1976d2",
            fontWeight: 700,
            fontSize: "2.1rem",
            flex: 1,
          }}
        >
          Bienvenue sur <span style={{ color: "#43a047" }}>Achiri</span>
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
      <p
        style={{
          textAlign: "center",
          color: darkMode ? "#e3f2fd" : "#333",
          fontSize: "1.1em",
          marginBottom: 24,
        }}
      >
        Plateforme IA inclusive : <b>accessibilité</b>, <b>santé</b>,{" "}
        <b>domotique</b>, <b>éducation</b>, <b>influence</b>.
      </p>
      <form
        onSubmit={handleJoin}
        autoComplete="off"
        aria-label="Formulaire de connexion à une room"
      >
        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontWeight: 500,
              color: darkMode ? "#e3f2fd" : "#333",
              display: "block",
            }}
          >
            Nom de la room
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="ex: ma-super-room"
              style={{
                width: "100%",
                padding: "0.7em",
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #bdbdbd",
                fontSize: "1em",
                marginBottom: 8,
                background: darkMode ? "#232b3b" : "#fff",
                color: darkMode ? "#ffd600" : "#222",
              }}
              maxLength={32}
              aria-label="Nom de la room"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontWeight: 500,
              color: darkMode ? "#e3f2fd" : "#333",
              display: "block",
            }}
          >
            Votre pseudo
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="ex: alice"
              style={{
                width: "100%",
                padding: "0.7em",
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #bdbdbd",
                fontSize: "1em",
                marginBottom: 8,
                background: darkMode ? "#232b3b" : "#fff",
                color: darkMode ? "#ffd600" : "#222",
              }}
              maxLength={20}
              aria-label="Votre pseudo"
              required
              autoComplete="username"
            />
          </label>
        </div>
        {error && (
          <div
            style={{
              color: "#b71c1c",
              background: "#ffcdd2",
              borderRadius: 6,
              padding: 8,
              marginBottom: 12,
            }}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.9em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: roomId.trim() && user.trim() ? "pointer" : "not-allowed",
            marginTop: 8,
            letterSpacing: 1,
            boxShadow: "0 1px 4px #1976d211",
            transition: "opacity 0.2s",
            opacity: roomId.trim() && user.trim() ? 1 : 0.7,
          }}
          disabled={!roomId.trim() || !user.trim()}
          aria-disabled={!roomId.trim() || !user.trim()}
          aria-label="Rejoindre la room"
        >
          Rejoindre la room
        </button>
      </form>
      <div
        style={{
          textAlign: "center",
          marginTop: 32,
          color: darkMode ? "#bbb" : "#888",
          fontSize: "0.98em",
        }}
      >
        Simple, rapide, sécurisé.
        <br />
        Aucune inscription requise.
      </div>
      <nav
        style={{
          marginTop: 40,
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
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Mon Profil
        </Link>
        <Link
          to="/dashboard"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Dashboard
        </Link>
        <Link
          to="/wallet"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Wallet
        </Link>
        <Link
          to="/virtual-classroom"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Classes Virtuelles
        </Link>
        <Link
          to="/music"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Musique
        </Link>
        <Link
          to="/notifications"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Notifications
        </Link>
        <Link
          to="/challenges"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Challenges
        </Link>
        <Link
          to="/accessibilite"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Accessibilité
        </Link>
        <Link
          to="/domotique"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Domotique
        </Link>
        <Link
          to="/sante"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Santé
        </Link>
        <Link
          to="/urgence"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Urgence
        </Link>
        <Link
          to="/influenceur"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Influenceur
        </Link>
        <Link
          to="/quiz"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Quiz
        </Link>
        <Link
          to="/creator-tools"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Creator Tools
        </Link>
        <Link
          to="/reseaux-sociaux"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Réseaux Sociaux
        </Link>
        <Link
          to="/social-interactions"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Interactions Sociales
        </Link>
        <Link
          to="/leaderboard"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Classement
        </Link>
        <Link
          to="/friends"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Amis
        </Link>
        <Link
          to="/admin"
          style={{ margin: 4, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Admin
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
        .homepage-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          .homepage-container {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .homepage-container {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          h1 {
            color: #ffd600 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;

/**
 * Documentation :
 * - HomePage : accueil, saisie pseudo/room, navigation rapide, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (actus, onboarding, stats, notifications, IA, etc).
 */
