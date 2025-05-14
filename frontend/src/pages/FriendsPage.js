import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * FriendsPage – Achiri
 * Gestion avancée des amis : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Ajout, suppression, recherche, avatars, navigation rapide, dark mode, mobile first.
 * - Prêt pour extensions futures (statut, favoris, notifications, export, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

const initialFriends = [
  { name: "Ami 1", avatar: "👩", status: "En ligne", color: "#43a047" },
  { name: "Ami 2", avatar: "🧑‍💻", status: "Absent", color: "#1976d2" },
  { name: "Ami 3", avatar: "🧑‍🎨", status: "Occupé", color: "#fbc02d" },
];

function FriendsPage() {
  const [friends, setFriends] = useState(initialFriends);
  const [search, setSearch] = useState("");
  const [newFriend, setNewFriend] = useState({
    name: "",
    avatar: "😀",
    color: "#1976d2",
  });
  const [feedback, setFeedback] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (newFriend.name.trim()) {
      setFriends([...friends, { ...newFriend, status: "En ligne" }]);
      setFeedback(`Ami "${newFriend.name}" ajouté !`);
      setNewFriend({ name: "", avatar: "😀", color: "#1976d2" });
      setTimeout(() => setFeedback(""), 2000);
    }
  };

  const handleRemove = (idx) => {
    setFeedback(`Ami "${friends[idx].name}" supprimé.`);
    setFriends(friends.filter((_, i) => i !== idx));
    setTimeout(() => setFeedback(""), 2000);
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
        maxWidth: 480,
        margin: "2rem auto",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #1976d2 100%)"
          : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : undefined,
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Section amis"
      tabIndex={0}
    >
      <Helmet>
        <title>Amis | Achiri</title>
        <meta
          name="description"
          content="Gérez votre liste d'amis sur Achiri : ajout, suppression, recherche, avatars. Plateforme IA inclusive, accessible et sécurisée."
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
            letterSpacing: 1,
            flex: 1,
          }}
        >
          👥 Ma liste d’amis
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
      {feedback && (
        <div
          style={{
            color: "#43a047",
            marginBottom: 10,
            fontWeight: 500,
            fontSize: "1em",
          }}
          aria-live="polite"
        >
          {feedback}
        </div>
      )}
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 24 }}
      >
        <input
          type="text"
          placeholder="Ajouter un ami…"
          value={newFriend.name}
          onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
          style={{
            flex: 2,
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: "0.5em 1em",
            fontSize: 16,
            background: darkMode ? "#232b3b" : "#fff",
            color: darkMode ? "#ffd600" : "#222",
          }}
          aria-label="Nom de l'ami à ajouter"
          required
          maxLength={32}
          autoComplete="off"
        />
        <select
          value={newFriend.avatar}
          onChange={(e) =>
            setNewFriend({ ...newFriend, avatar: e.target.value })
          }
          style={{
            flex: 1,
            border: "1px solid #bbdefb",
            borderRadius: 8,
            fontSize: 18,
            padding: "0.5em",
            background: darkMode ? "#232b3b" : "#fff",
            color: darkMode ? "#ffd600" : "#222",
          }}
          aria-label="Avatar de l'ami"
        >
          <option>😀</option>
          <option>👩</option>
          <option>🧑‍💻</option>
          <option>🧑‍🎨</option>
          <option>👨‍🚀</option>
          <option>🧑‍🚒</option>
        </select>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.5em 1.2em",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
          aria-label="Ajouter l'ami"
        >
          Ajouter
        </button>
      </form>
      <input
        type="text"
        placeholder="Rechercher…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: "0.5em 1em",
          marginBottom: 18,
          fontSize: 16,
          background: darkMode ? "#232b3b" : "#fff",
          color: darkMode ? "#ffd600" : "#222",
        }}
        aria-label="Rechercher un ami"
      />
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filtered.length === 0 && (
          <li
            style={{
              color: "#888",
              textAlign: "center",
              marginTop: 32,
              fontStyle: "italic",
            }}
          >
            Aucun ami trouvé.
          </li>
        )}
        {filtered.map((f, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              background: darkMode ? "#181f2a" : "#f5f7fa",
              borderRadius: 10,
              marginBottom: 12,
              padding: "0.7em 1em",
              boxShadow: "0 1px 4px #1976d211",
            }}
          >
            <span
              style={{
                fontSize: 32,
                marginRight: 16,
                background: f.color,
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={`Avatar de ${f.name}`}
            >
              {f.avatar}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: 17 }}>{f.name}</div>
              <div
                style={{
                  fontSize: 13,
                  color:
                    f.status === "En ligne"
                      ? "#43a047"
                      : f.status === "Absent"
                        ? "#fbc02d"
                        : "#b71c1c",
                }}
              >
                {f.status}
              </div>
            </div>
            <button
              onClick={() => handleRemove(i)}
              style={{
                background: "#ffcdd2",
                color: "#b71c1c",
                border: "none",
                borderRadius: 8,
                padding: "0.3em 1em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer",
                marginLeft: 10,
              }}
              aria-label={`Supprimer ${f.name} de la liste d'amis`}
              title="Supprimer l'ami"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
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
          to="/challenges"
          style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}
        >
          Challenges
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
        main[aria-label="Section amis"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          main[aria-label="Section amis"] {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Section amis"] {
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

export default FriendsPage;

/**
 * Documentation :
 * - FriendsPage : gestion amis, ajout, suppression, recherche, avatars, navigation rapide, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (statut, favoris, notifications, export, etc).
 */
