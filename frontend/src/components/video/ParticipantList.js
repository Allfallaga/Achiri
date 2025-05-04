import React from "react";
import PropTypes from "prop-types";

/**
 * ParticipantList – Achiri
 * Affiche la liste des participants d'une salle vidéo, avec rôles, badges, points, actions de modération.
 * Props :
 * - participants : tableau d'utilisateurs [{ id, name, role, ... }]
 * - currentUser : utilisateur courant
 * - onModerate : callback pour ouvrir le panel de modération (optionnel)
 * - renderBadges : fonction pour afficher les badges d'un utilisateur (optionnel)
 * - renderPoints : fonction pour afficher les points d'un utilisateur (optionnel)
 */

export default function ParticipantList({
  participants = [],
  currentUser,
  onModerate,
  renderBadges,
  renderPoints,
}) {
  return (
    <aside
      className="participant-list"
      style={{
        background: "#f5f5f5",
        borderRadius: 12,
        padding: "1em",
        minWidth: 220,
        maxWidth: 320,
        marginBottom: 16,
        boxShadow: "0 2px 8px #0001",
      }}
      aria-label="Liste des participants"
    >
      <h2 style={{ fontSize: "1.1em", margin: "0 0 10px 0", color: "#1976d2" }}>
        👥 Participants ({participants.length})
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {participants.length === 0 && (
          <li style={{ color: "#888", fontStyle: "italic" }}>Aucun participant</li>
        )}
        {participants.map((user) => (
          <li
            key={user.id || user.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 0",
              borderBottom: "1px solid #e3e3e3",
            }}
            aria-current={currentUser && (user.id === currentUser.id || user.name === currentUser.name) ? "true" : undefined}
          >
            <span
              style={{
                fontWeight: user.role === "owner" ? 700 : 500,
                color: user.role === "owner" ? "#ffd600" : "#1976d2",
                fontSize: "1em",
              }}
              aria-label={user.role === "owner" ? "Propriétaire" : undefined}
            >
              {user.name || user.id}
              {user.role === "owner" && <span title="Propriétaire"> ⭐</span>}
              {user.role === "admin" && <span title="Admin"> 🛡️</span>}
              {user.id === currentUser?.id || user.name === currentUser?.name ? (
                <span style={{ color: "#388e3c", marginLeft: 4 }}>(Vous)</span>
              ) : null}
            </span>
            {renderBadges && renderBadges(user.id)}
            {renderPoints && renderPoints(user.id)}
            <div style={{ flex: 1 }} />
            {onModerate && (
              <button
                onClick={() => onModerate(user)}
                style={{
                  background: "#fff",
                  color: "#d32f2f",
                  border: "1px solid #d32f2f",
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontSize: "0.95em",
                  cursor: "pointer",
                }}
                aria-label={`Modérer ${user.name || user.id}`}
                title="Modérer"
              >
                ⚡
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

ParticipantList.propTypes = {
  participants: PropTypes.array,
  currentUser: PropTypes.any,
  onModerate: PropTypes.func,
  renderBadges: PropTypes.func,
  renderPoints: PropTypes.func,
};