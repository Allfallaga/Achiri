import React from 'react';
import Member from '../Member/Member';
import './ModerationPanel.css';

/**
 * Composant Zone de Modération moderne et accessible.
 * Affiche la liste des membres connectés avec accessibilité et feedback visuel.
 */
function Moderation({ members = [] }) {
  const connectedMembers = members.filter((mbr) => mbr.loggedIn);

  return (
    <aside
      className="moderation-area"
      aria-label="Zone de modération"
      tabIndex={0}
      style={{
        minWidth: 260,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        padding: "1.2rem 1rem",
        marginRight: 12,
        maxHeight: 480,
        overflowY: "auto"
      }}
    >
      <h2
        className="moderation-title"
        style={{
          fontSize: "1.18em",
          fontWeight: 700,
          color: "#1976d2",
          marginBottom: 14
        }}
        tabIndex={0}
      >
        Zone de Modération
      </h2>
      {connectedMembers.length === 0 ? (
        <div
          className="moderation-empty"
          style={{
            color: "#888",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 24
          }}
          aria-live="polite"
        >
          Aucun membre connecté.
        </div>
      ) : (
        <ul className="list-group" style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {connectedMembers.map((mbr) => (
            <Member key={mbr.nickname} member={mbr} showActions />
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Moderation;