import React, { useState } from "react";
import {
  FaMedal,
  FaStar,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

/**
 * BadgesManager – Achiri
 * Gestionnaire de badges utilisateur : ajout, suppression, affichage, accessibilité, sécurité, responsive, SEO.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : voir badges, ajouter badge, retirer badge, feedback utilisateur.
 * - Prêt pour extensions futures (badges spéciaux, filtres, dark mode, etc).
 *
 * Props :
 *   badges: array (liste initiale des badges)
 *   onChange: function(newBadges) (callback lors d’un changement)
 */

const allBadges = [
  {
    value: "Créateur",
    label: "Créateur",
    icon: <FaMedal style={{ color: "#1976d2" }} />,
  },
  {
    value: "Artiste",
    label: "Artiste",
    icon: <FaStar style={{ color: "#fbbf24" }} />,
  },
  {
    value: "Ambassadeur",
    label: "Ambassadeur",
    icon: <FaMedal style={{ color: "#43a047" }} />,
  },
  {
    value: "Expert",
    label: "Expert",
    icon: <FaStar style={{ color: "#ef4444" }} />,
  },
];

export default function BadgesManager({ badges = [], onChange }) {
  const [userBadges, setUserBadges] = useState(badges);
  const [selected, setSelected] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selected) {
      setError("Sélectionnez un badge à ajouter.");
      return;
    }
    if (userBadges.includes(selected)) {
      setError("Badge déjà attribué.");
      return;
    }
    const newBadges = [...userBadges, selected];
    setUserBadges(newBadges);
    if (onChange) onChange(newBadges);
    setSuccess("Badge ajouté !");
    setSelected("");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleRemove = (badge) => {
    const newBadges = userBadges.filter((b) => b !== badge);
    setUserBadges(newBadges);
    if (onChange) onChange(newBadges);
    setSuccess("Badge retiré !");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <section
      className="badges-manager"
      style={{
        background: "#f9fafb",
        borderRadius: 12,
        padding: "2rem",
        maxWidth: 500,
        margin: "2rem auto",
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.08)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
      aria-label="Gestionnaire de badges"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.2em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FaMedal /> Mes badges
      </h2>
      {error && (
        <div style={{ color: "red", marginBottom: 8 }} aria-live="assertive">
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            color: "#43a047",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          aria-live="polite"
        >
          <FaCheckCircle /> {success}
        </div>
      )}
      <div style={{ marginBottom: 18, marginTop: 10 }}>
        {userBadges.length === 0 && (
          <span style={{ color: "#888", fontStyle: "italic" }}>
            Aucun badge attribué
          </span>
        )}
        <ul
          style={{
            display: "flex",
            gap: 16,
            listStyle: "none",
            padding: 0,
            margin: 0,
            flexWrap: "wrap",
          }}
        >
          {userBadges.map((badge, idx) => {
            const badgeObj = allBadges.find((b) => b.value === badge);
            return (
              <li
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#e3f2fd",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontWeight: 500,
                }}
              >
                <span style={{ fontSize: 18 }}>
                  {badgeObj ? badgeObj.icon : <FaMedal />}
                </span>
                {badgeObj ? badgeObj.label : badge}
                <button
                  type="button"
                  aria-label={`Retirer le badge ${badgeObj ? badgeObj.label : badge}`}
                  onClick={() => handleRemove(badge)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    marginLeft: 4,
                    cursor: "pointer",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={0}
                  title="Retirer"
                >
                  <FaTimesCircle />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 10,
        }}
      >
        <label htmlFor="badge-select" style={{ fontWeight: 500 }}>
          Ajouter un badge
        </label>
        <select
          id="badge-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          aria-label="Sélectionner un badge à ajouter"
          style={{
            borderRadius: 8,
            border: "1px solid #1976d2",
            padding: "0.5em 1em",
            fontSize: 15,
            minWidth: 120,
          }}
        >
          <option value="">Choisir…</option>
          {allBadges
            .filter((b) => !userBadges.includes(b.value))
            .map((badge) => (
              <option key={badge.value} value={badge.value}>
                {badge.label}
              </option>
            ))}
        </select>
        <button
          type="submit"
          aria-label="Ajouter le badge"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.6em 1.2em",
            fontWeight: 600,
            fontSize: "1em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FaPlusCircle /> Ajouter
        </button>
      </form>
      <footer
        style={{
          marginTop: 24,
          color: "#888",
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
    </section>
  );
}

/**
 * Documentation :
 * - Gestionnaire de badges utilisateur : voir, ajouter, retirer, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
