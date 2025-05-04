import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUsers, FaMusic, FaGamepad, FaChalkboardTeacher, FaPalette,
  FaMicrophone, FaGlobe, FaHeart, FaPlusCircle, FaSearch, FaMoon, FaPalette as FaPaletteIcon
} from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * RoomCategories – Achiri
 * Catégories de rooms : navigation, recherche, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : affichage catégories, recherche, sélection, création rapide, dark mode, feedback utilisateur.
 * - Prêt pour extensions futures (badges, analytics, favoris, overlay, IA, etc).
 *
 * Props :
 *   - categories: [{ id, name, icon, description }]
 *   - onSelect: function(categoryId)
 *   - onCreate: function()
 */

const defaultCategories = [
  {
    id: "general",
    name: "Général",
    icon: <FaUsers />,
    description: "Discussions libres, rencontres, échanges variés."
  },
  {
    id: "music",
    name: "Musique",
    icon: <FaMusic />,
    description: "Partage, écoute, création musicale."
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: <FaGamepad />,
    description: "Jeux vidéo, tournois, parties entre amis."
  },
  {
    id: "education",
    name: "Éducation",
    icon: <FaChalkboardTeacher />,
    description: "Cours, tutoriels, entraide scolaire."
  },
  {
    id: "art",
    name: "Art & Création",
    icon: <FaPalette />,
    description: "Dessin, peinture, photo, créativité."
  },
  {
    id: "podcast",
    name: "Podcast & Talk",
    icon: <FaMicrophone />,
    description: "Débats, podcasts, talk-shows."
  },
  {
    id: "international",
    name: "International",
    icon: <FaGlobe />,
    description: "Langues, cultures, échanges mondiaux."
  },
  {
    id: "social",
    name: "Social & Bien-être",
    icon: <FaHeart />,
    description: "Soutien, bien-être, entraide, amitié."
  }
];

const RoomCategories = ({
  categories = defaultCategories,
  onSelect,
  onCreate
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Filtrage par nom ou description
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (id) => {
    setSelected(id);
    setFeedback(`Catégorie "${categories.find(c => c.id === id)?.name || id}" sélectionnée.`);
    if (onSelect) onSelect(id);
    setTimeout(() => setFeedback(""), 2000);
  };

  // Dark mode toggle
  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  return (
    <motion.section
      className={`room-categories-container${darkMode ? " dark" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Catégories de rooms Achiri"
      tabIndex={0}
      style={{
        background: darkMode ? "#232b3b" : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d222",
        padding: "2rem 1.2rem",
        maxWidth: 700,
        margin: "2rem auto",
        outline: "none",
        color: darkMode ? "#ffe082" : "#222",
        transition: "background 0.3s, color 0.3s"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 className="text-2xl font-bold" style={{ color: darkMode ? "#ffe082" : "#1976d2", textAlign: "center", margin: 0 }}>
          <FaUsers style={{ marginRight: 8 }} />
          Catégories de Rooms
        </h2>
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#ffe082" : "#1976d2",
            cursor: "pointer",
            fontSize: 22,
            marginLeft: 12
          }}
          tabIndex={0}
        >
          {darkMode ? <FaPaletteIcon /> : <FaMoon />}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24, gap: 8 }}>
        <FaSearch style={{ color: "#1976d2" }} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher une catégorie..."
          aria-label="Rechercher une catégorie"
          className="room-categories-search"
          style={{
            flex: 1,
            borderRadius: 8,
            border: `1px solid ${darkMode ? "#ffe082" : "#bbdefb"}`,
            padding: "0.6em 1em",
            fontSize: "1em",
            background: darkMode ? "#181f2a" : "#fff",
            color: darkMode ? "#ffe082" : "#222"
          }}
        />
        <button
          className="room-categories-create"
          onClick={onCreate}
          aria-label="Créer une nouvelle room"
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.6em 1.2em",
            fontWeight: "bold",
            fontSize: "1em",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer"
          }}
        >
          <FaPlusCircle style={{ marginRight: 4 }} /> Créer
        </button>
      </div>
      {feedback && (
        <div
          style={{
            color: "#43a047",
            marginBottom: 10,
            fontWeight: 500,
            fontSize: "1em"
          }}
          aria-live="polite"
        >
          {feedback}
        </div>
      )}
      <ul
        className="room-categories-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          listStyle: "none",
          padding: 0,
          margin: 0
        }}
      >
        {filteredCategories.length === 0 && (
          <li style={{ opacity: 0.7, fontStyle: "italic", textAlign: "center", gridColumn: "1/-1" }}>
            Aucune catégorie trouvée.
          </li>
        )}
        {filteredCategories.map(cat => (
          <li
            key={cat.id}
            className={`room-category-card${selected === cat.id ? " selected" : ""}`}
            style={{
              background: selected === cat.id
                ? (darkMode ? "#1e293b" : "#e3f2fd")
                : (darkMode ? "#181f2a" : "#f9fafb"),
              border: `2px solid ${selected === cat.id ? (darkMode ? "#ffe082" : "#1976d2") : "transparent"}`,
              borderRadius: 10,
              padding: "1.1rem 1rem",
              cursor: "pointer",
              boxShadow: selected === cat.id
                ? "0 2px 10px 0 rgba(33,150,243,0.10)"
                : "0 1px 4px 0 rgba(33,150,243,0.06)",
              color: darkMode ? "#ffe082" : "#222",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              transition: "box-shadow 0.2s, background 0.2s, border 0.2s"
            }}
            tabIndex={0}
            aria-label={`Voir la catégorie ${cat.name}`}
            onClick={() => handleSelect(cat.id)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleSelect(cat.id)}
            role="button"
            aria-pressed={selected === cat.id}
          >
            <div style={{ fontSize: 28, marginBottom: 8, color: darkMode ? "#ffe082" : "#1976d2" }}>
              {cat.icon}
            </div>
            <div style={{ fontWeight: 600, fontSize: "1.08em", marginBottom: 2 }}>
              {cat.name}
            </div>
            <div style={{ fontSize: "0.97em", color: darkMode ? "#bbb" : "#555", marginBottom: 4 }}>
              {cat.description}
            </div>
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
        .room-categories-container:focus {
          outline: 2px solid #ffd600;
        }
        .room-category-card.selected {
          box-shadow: 0 4px 16px 0 rgba(33,150,243,0.13);
        }
        .room-category-card:focus-visible {
          outline: 2px solid #1976d2;
          outline-offset: 2px;
        }
        @media (max-width: 700px) {
          .room-categories-container {
            padding: 1rem;
            max-width: 98vw;
            font-size: 1em;
          }
        }
        @media (max-width: 600px) {
          .room-categories-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.section>
  );
};

RoomCategories.propTypes = {
  categories: PropTypes.array,
  onSelect: PropTypes.func,
  onCreate: PropTypes.func
};

export default RoomCategories;

/**
 * Documentation :
 * - Catégories de rooms : recherche, sélection, création, accessibilité, feedback utilisateur, dark mode.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, dark mode, contrastes optimisés.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, analytics, IA…).
 */