import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * SocialInteractionsPage – Achiri
 * Booster les contenus/profils : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Affichage, interaction, confirmation, navigation rapide, dark mode, mobile first.
 * - Prêt pour extensions futures (statistiques, feedback, modération, export, IA, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

const mockInteractions = [
  {
    id: 1,
    platform: "Instagram",
    title: "Photo de voyage 🌍",
    image: "https://source.unsplash.com/random/80x80?travel",
    link: "https://instagram.com/ami1",
    points: 5,
    owner: "Ami 1",
  },
  {
    id: 2,
    platform: "YouTube",
    title: "Vlog Paris 2024",
    image: "https://source.unsplash.com/random/80x80?paris",
    link: "https://youtube.com/vlogparis",
    points: 8,
    owner: "Ami 2",
  },
  {
    id: 3,
    platform: "TikTok",
    title: "Dance Challenge 💃",
    image: "https://source.unsplash.com/random/80x80?dance",
    link: "https://tiktok.com/@ami3",
    points: 4,
    owner: "Ami 3",
  },
];

function SocialInteractionsPage({
  user = { name: "Utilisateur", role: "user" },
}) {
  const [interactions, setInteractions] = useState(mockInteractions);
  const [confirmed, setConfirmed] = useState({});
  const [loading, setLoading] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleConfirm = (id) => {
    setLoading(id);
    setTimeout(() => {
      setConfirmed((prev) => ({ ...prev, [id]: true }));
      setLoading(null);
    }, 1200); // Simule une requête API
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
    <main
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #1976d2 100%)"
          : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Interactions sociales"
      tabIndex={0}
    >
      <Helmet>
        <title>Interactions Sociales | Achiri</title>
        <meta
          name="description"
          content="Boostez les contenus et profils de la communauté Achiri. Plateforme IA inclusive, accessible et sécurisée."
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
        <h2
          style={{
            color: darkMode ? "#ffd600" : "#1976d2",
            marginBottom: 24,
            textAlign: "center",
            flex: 1,
          }}
        >
          🚀 Augmenter les interactions
        </h2>
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
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {interactions.length === 0 && (
          <li
            style={{ color: "#888", textAlign: "center", fontStyle: "italic" }}
          >
            Aucun contenu à booster pour le moment.
          </li>
        )}
        {interactions.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              background: darkMode ? "#181f2a" : "#f5f7fa",
              borderRadius: 10,
              marginBottom: 18,
              padding: "1em",
              boxShadow: "0 1px 4px #1976d211",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                objectFit: "cover",
                marginRight: 18,
                border: "2px solid #bbdefb",
              }}
              aria-label={`Image de ${item.title}`}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{ fontWeight: "bold", fontSize: 17, marginBottom: 2 }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: darkMode ? "#ffd600" : "#1976d2",
                  marginBottom: 2,
                }}
              >
                {item.platform}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                Par {item.owner}
              </div>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: darkMode ? "#1976d2" : "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.4em 1em",
                fontWeight: "bold",
                fontSize: 15,
                textDecoration: "none",
                marginRight: 8,
                transition: "background 0.2s",
              }}
              aria-label={`Voir sur ${item.platform}`}
            >
              Interagir
            </a>
            <button
              onClick={() => handleConfirm(item.id)}
              disabled={confirmed[item.id] || loading === item.id}
              style={{
                background: confirmed[item.id] ? "#43a047" : "#fbc02d",
                color: confirmed[item.id] ? "#fff" : "#222",
                border: "none",
                borderRadius: 8,
                padding: "0.4em 1em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: confirmed[item.id] ? "default" : "pointer",
                opacity: loading === item.id ? 0.7 : 1,
                marginRight: 8,
              }}
              aria-label={
                confirmed[item.id]
                  ? "Interaction confirmée"
                  : loading === item.id
                    ? "Validation en cours"
                    : `Confirmer l'interaction et gagner ${item.points} points`
              }
            >
              {confirmed[item.id]
                ? "Confirmé !"
                : loading === item.id
                  ? "Validation..."
                  : `Confirmer (+${item.points} pts)`}
            </button>
          </li>
        ))}
      </ul>
      {user.role === "admin" && (
        <div
          style={{
            marginTop: 24,
            background: "#ffcdd2",
            color: "#b71c1c",
            borderRadius: 8,
            padding: "0.7em 1em",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Mode admin : accès à la modération des interactions.
        </div>
      )}
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
        main[aria-label="Interactions sociales"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          main[aria-label="Interactions sociales"] {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Interactions sociales"] {
            background: linear-gradient(120deg, #181f2a 60%, #1976d2 100%) !important;
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

export default SocialInteractionsPage;

/**
 * Documentation :
 * - SocialInteractionsPage : booster contenus/profils, interaction, confirmation, navigation rapide, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier, liens sécurisés.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (statistiques, feedback, modération, export, IA, etc).
 */
