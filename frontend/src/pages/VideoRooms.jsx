import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * VideoRooms – Achiri
 * Liste et accès aux salons vidéo : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Affichage rooms, accès rapide, création, dark mode, mobile first.
 * - Prêt pour extensions futures (recherche, favoris, analytics, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

const mockRooms = [
  { id: "room-1", name: "Salle Inclusive", users: 5 },
  { id: "room-2", name: "Santé & Bien-être", users: 2 },
  { id: "room-3", name: "Classe Virtuelle", users: 8 },
];

const VideoRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Remplacer par un fetch API réel plus tard
    setRooms(mockRooms);
  }, []);

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
      className="video-rooms-container"
      style={{
        maxWidth: 700,
        margin: "2.5em auto",
        padding: "2em 1em",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #223366 100%)"
          : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d222",
        minHeight: "60vh",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Liste des salons vidéo"
      tabIndex={0}
    >
      <Helmet>
        <title>Salons vidéo | Achiri</title>
        <meta
          name="description"
          content="Rejoignez ou créez un salon vidéo sur Achiri. Plateforme IA inclusive pour tous : accessibilité, santé, éducation, domotique."
        />
        <html lang="fr" />
      </Helmet>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <h1
          style={{
            color: darkMode ? "#ffd600" : "#1976d2",
            fontSize: "2em",
            marginBottom: 18,
            textAlign: "center",
            flex: 1,
          }}
        >
          Salons vidéo Achiri
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
          textAlign: "center",
          color: darkMode ? "#e3f2fd" : "#333",
          marginBottom: 28,
        }}
      >
        Retrouvez, créez ou rejoignez un salon vidéo inclusif en un clic.
      </p>
      <nav
        aria-label="Actions salons vidéo"
        style={{ textAlign: "center", marginBottom: 32 }}
      >
        <Link
          to="/create-room"
          className="btn"
          style={{
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            borderRadius: 8,
            padding: "0.7em 1.5em",
            fontWeight: "bold",
            fontSize: "1.1em",
            textDecoration: "none",
            boxShadow: "0 2px 8px #1976d222",
            marginRight: 8,
            transition: "background 0.2s",
          }}
          aria-label="Créer un nouveau salon vidéo"
        >
          + Créer un salon
        </Link>
      </nav>
      <section aria-label="Liste des salons vidéo">
        {rooms.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              fontStyle: "italic",
              marginTop: 30,
            }}
          >
            Aucun salon disponible pour l’instant.
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {rooms.map((room) => (
              <li
                key={room.id}
                style={{
                  background: darkMode ? "#223366" : "#f8fafc",
                  borderRadius: 10,
                  marginBottom: 18,
                  boxShadow: "0 1px 6px #1976d211",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1em 1.2em",
                  color: darkMode ? "#ffd600" : "#222",
                }}
                tabIndex={0}
                aria-label={`Salon ${room.name}, ${room.users} participant${room.users > 1 ? "s" : ""}`}
              >
                <div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: darkMode ? "#ffd600" : "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    {room.name}
                  </span>
                  <span
                    style={{
                      color: "#43a047",
                      marginLeft: 12,
                      fontSize: "0.98em",
                    }}
                  >
                    {room.users} participant{room.users > 1 ? "s" : ""}
                  </span>
                </div>
                <Link
                  to={`/rooms/${room.id}`}
                  className="btn"
                  style={{
                    background:
                      "linear-gradient(90deg, #43a047 0%, #1976d2 100%)",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "0.5em 1.2em",
                    fontWeight: "bold",
                    fontSize: "1em",
                    textDecoration: "none",
                    boxShadow: "0 1px 4px #1976d222",
                    transition: "background 0.2s",
                  }}
                  aria-label={`Rejoindre le salon ${room.name}`}
                >
                  Rejoindre
                </Link>
              </li>
            ))}
          </ul>
        )}
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
          to="/settings"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Paramètres
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
        .video-rooms-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          .video-rooms-container {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .video-rooms-container {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          h1 {
            color: #ffd600 !important;
          }
          li {
            background: #223366 !important;
            color: #ffd600 !important;
          }
        }
      `}</style>
    </main>
  );
};

export default VideoRooms;

/**
 * Documentation :
 * - VideoRooms : liste salons vidéo, accès rapide, création, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (recherche, favoris, analytics, etc).
 */
