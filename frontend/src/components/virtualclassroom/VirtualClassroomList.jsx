import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBookOpen,
  FaUniversalAccess,
  FaVolumeUp,
  FaLanguage,
  FaMoon,
  FaPalette
} from "react-icons/fa";

/**
 * VirtualClassroomList – Achiri
 * Liste des classes virtuelles inclusives : accessibilité, sécurité, mobile/web, design avancé, SEO, dark mode.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : liste des classes, accès rapide, participants, feedback utilisateur, recherche, filtres, dark mode.
 * - Prêt pour extensions futures (favoris, analytics, overlay, badges, IA…).
 *
 * Props :
 *   userId: string (identifiant utilisateur affiché)
 *   onJoin: function (callback lors de la participation à une classe)
 */

const accessibilityIcons = {
  "Sous-titres": <FaUniversalAccess title="Sous-titres" aria-label="Sous-titres" style={{ color: "#1976d2" }} />,
  "Lecture vocale": <FaVolumeUp title="Lecture vocale" aria-label="Lecture vocale" style={{ color: "#43a047" }} />,
  "Traduction": <FaLanguage title="Traduction" aria-label="Traduction" style={{ color: "#ff9800" }} />
};

export default function VirtualClassroomList({ userId, onJoin }) {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Chargement des classes (API ou mock)
  useEffect(() => {
    setLoading(true);
    fetch("/api/virtual-classroom")
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then(data => {
        setClassrooms(data);
        setError("");
      })
      .catch(() => setError("Impossible de charger les classes"))
      .finally(() => setLoading(false));
  }, []);

  // Dark mode toggle
  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  const handleJoin = (classroomId) => {
    fetch(`/api/virtual-classroom/${classroomId}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la participation");
        setSelectedClassroom(classroomId);
        if (onJoin) onJoin(classroomId);
      })
      .catch(() => setError("Impossible de rejoindre la classe"));
  };

  // Filtrage par nom ou description
  const filteredClassrooms = classrooms.filter(
    cls =>
      (cls.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (cls.description || "").toLowerCase().includes(search.toLowerCase())
  );

  if (selectedClassroom) {
    return (
      <div
        style={{
          margin: "2rem 0",
          padding: 24,
          border: "1px solid #e3e8ef",
          borderRadius: 12,
          background: darkMode ? "#232b3b" : "#fff",
          maxWidth: 600,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          color: darkMode ? "#ffe082" : "#222"
        }}
        aria-label={`Vous avez rejoint la classe ${selectedClassroom}`}
        tabIndex={0}
      >
        <h3 style={{ color: darkMode ? "#ffe082" : "#1976d2", fontWeight: 700, fontSize: "1.15em" }}>
          Vous avez rejoint la classe {selectedClassroom}
        </h3>
        {/* Ici tu peux afficher un composant VirtualClassroomDetail ou Quiz */}
      </div>
    );
  }

  return (
    <div
      className={`virtual-classroom-list-container${darkMode ? " dark" : ""}`}
      style={{
        margin: "2rem auto",
        padding: "2rem",
        background: darkMode ? "#232b3b" : "#e1f5fe",
        borderRadius: 12,
        maxWidth: 600,
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.08)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#ffe082" : "#222",
        transition: "background 0.3s, color 0.3s"
      }}
      aria-label="Liste des classes virtuelles"
      tabIndex={0}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaChalkboardTeacher style={{ color: darkMode ? "#ffe082" : "#1976d2", fontSize: 28, marginRight: 12 }} />
          <h2 style={{ fontWeight: 700, fontSize: "1.3em", color: darkMode ? "#ffe082" : "#1976d2", margin: 0 }}>
            Liste des classes virtuelles
          </h2>
        </div>
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#ffe082" : "#1976d2",
            cursor: "pointer",
            fontSize: 20
          }}
          tabIndex={0}
        >
          {darkMode ? <FaPalette /> : <FaMoon />}
        </button>
      </div>
      <div style={{
        marginBottom: 16,
        color: darkMode ? "#ffe082" : "#2563eb",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
        <FaBookOpen /> {filteredClassrooms.length} classes &nbsp;|&nbsp; Utilisateur : <strong>{userId}</strong>
      </div>
      <input
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher une classe…"
        aria-label="Recherche de classe virtuelle"
        style={{
          width: "100%",
          borderRadius: 8,
          border: `1px solid ${darkMode ? "#ffe082" : "#1976d2"}`,
          padding: "0.7em 1em",
          fontSize: 15,
          marginBottom: 18,
          background: darkMode ? "#181f2a" : "#fff",
          color: darkMode ? "#ffe082" : "#222"
        }}
      />
      {loading && <div aria-live="polite">Chargement...</div>}
      {error && <div style={{ color: "#b71c1c" }} aria-live="assertive">{error}</div>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filteredClassrooms.length === 0 && !loading && (
          <li style={{ color: "#888", fontStyle: "italic" }}>Aucune classe disponible</li>
        )}
        {filteredClassrooms.map(cls => (
          <li
            key={cls.id}
            className="classroom-item"
            style={{
              background: darkMode ? "#181f2a" : "#fff",
              borderRadius: 8,
              marginBottom: 14,
              padding: "1rem",
              boxShadow: "0 2px 8px 0 rgba(33,150,243,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              borderLeft: `4px solid ${darkMode ? "#ffe082" : "#1976d2"}`,
              transition: "box-shadow 0.2s, background 0.2s",
              color: darkMode ? "#ffe082" : "#222"
            }}
            tabIndex={0}
            aria-label={`Voir la classe ${cls.name}`}
            onClick={() => handleJoin(cls.id)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleJoin(cls.id)}
            role="button"
            aria-pressed="false"
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "1.1em", color: darkMode ? "#ffe082" : "#1976d2" }}>{cls.name || `Classe #${cls.id}`}</div>
              <div style={{ fontSize: "0.97em", color: darkMode ? "#bbb" : "#555", marginTop: 2 }}>{cls.description}</div>
              <div style={{ fontSize: "0.92em", color: "#43a047", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <FaUsers /> {cls.participants || 0} participants
                {cls.accessibility && cls.accessibility.map((a, i) => (
                  <span key={i} style={{ marginLeft: 8, fontSize: 18 }}>{accessibilityIcons[a]}</span>
                ))}
              </div>
            </div>
            <button
              style={{
                background: darkMode ? "#ffe082" : "#1976d2",
                color: darkMode ? "#232b3b" : "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                marginLeft: 16
              }}
              aria-label={`Accéder à la classe ${cls.name}`}
              onClick={e => { e.stopPropagation(); handleJoin(cls.id); }}
              tabIndex={-1}
            >
              Rejoindre
            </button>
          </li>
        ))}
      </ul>
      <footer
        style={{
          marginTop: 24,
          color: darkMode ? "#ffe082" : "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        .virtual-classroom-list-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .virtual-classroom-list-container {
            padding: 1rem;
            max-width: 99vw;
            font-size: 1em;
          }
        }
        .virtual-classroom-list-container.dark {
          background: #232b3b !important;
          color: #ffe082 !important;
        }
        .virtual-classroom-list-container.dark .classroom-item {
          background: #181f2a !important;
          color: #ffe082 !important;
        }
      `}</style>
    </div>
  );
}

/**
 * Documentation :
 * - Liste des classes virtuelles inclusives : recherche, accessibilité, participants, feedback utilisateur, dark mode.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, dark mode, contrastes optimisés.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (favoris, overlay, badges, IA…).
 */