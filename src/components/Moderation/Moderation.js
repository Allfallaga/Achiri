import React from 'react';
import Member from '../Member/Member';

function Moderation({ members = [], onMute, onVideoOff, onEject }) {
  return (
    <div
      className="moderation-area"
      style={{
        minWidth: 220,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #1976d222",
        padding: "1rem 0.5rem",
        margin: "0.5rem 0"
      }}
      aria-label="Liste des membres connectés"
      tabIndex={0}
    >
      <ul
        className="list-group"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
        aria-live="polite"
        aria-label="Membres en ligne"
      >
        {members.filter(mbr => mbr.loggedIn).map(mbr => (
          <Member
            key={mbr.id || mbr.nickname}
            member={mbr}
            onMute={onMute}
            onVideoOff={onVideoOff}
            onEject={onEject}
          />
        ))}
        {members.filter(mbr => mbr.loggedIn).length === 0 && (
          <li
            style={{ color: "#888", textAlign: "center", padding: "1em" }}
            aria-live="polite"
          >
            Aucun membre en ligne
          </li>
        )}
      </ul>
    </div>
  );
}

export default Moderation;