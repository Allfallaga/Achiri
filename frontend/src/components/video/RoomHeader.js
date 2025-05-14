import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

/**
 * RoomHeader – Achiri
 * En-tête de la salle vidéo : titre, catégorie, actions rapides, accessibilité, navigation.
 * Props :
 * - room : infos de la room (owner, category, description, etc.)
 * - type : type de room ("free", "private", etc.)
 * - currentUser : utilisateur courant
 * - onShowAccessibility : callback pour ouvrir le panel accessibilité
 * - onShowModeration : callback pour ouvrir le panel modération
 * - onShowBreakout : callback pour ouvrir le panel breakout rooms
 * - categories : liste des catégories disponibles
 */

export default function RoomHeader({
  room = {},
  type = "free",
  currentUser,
  onShowAccessibility,
  onShowModeration,
  onShowBreakout,
  categories = [],
}) {
  const isOwner = room.owner === (currentUser?.name || currentUser);

  return (
    <header
      className="video-room-header"
      style={{
        background: "#1976d2",
        color: "#fff",
        borderRadius: "16px 16px 0 0",
        padding: "1.2em 1.5em 1em 1.5em",
        boxShadow: "0 2px 12px #1976d222",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
      }}
      role="banner"
      aria-label="En-tête de la salle vidéo"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5em", flex: 1 }}>
          {room.category ? `[${room.category}] ` : ""}
          {room.description || "Salle de visioconférence"}
        </h1>
        <NavLink
          to="/rooms"
          style={{
            background: "#fff",
            color: "#1976d2",
            borderRadius: 8,
            padding: "6px 14px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1em",
            marginLeft: 8,
          }}
          aria-label="Retour à la liste des rooms"
        >
          ← Rooms
        </NavLink>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span>
          <strong>Type :</strong> {type}
        </span>
        {room.owner && (
          <span>
            <strong>Propriétaire :</strong> {room.owner}
            {isOwner && (
              <span style={{ marginLeft: 6, color: "#ffd600" }}> (Vous)</span>
            )}
          </span>
        )}
        <span>
          <strong>Participants :</strong> {room.users ? room.users.length : 1}
        </span>
        {categories.length > 0 && (
          <span>
            <strong>Catégorie :</strong>{" "}
            <select
              value={room.category || ""}
              disabled={!isOwner}
              aria-label="Changer la catégorie de la room"
              style={{
                borderRadius: 6,
                border: "none",
                padding: "2px 8px",
                fontSize: "1em",
                background: isOwner ? "#fff" : "#eee",
                color: "#1976d2",
                fontWeight: 600,
              }}
              onChange={() => {}} // À compléter si édition de catégorie
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </span>
        )}
        <div style={{ flex: 1 }} />
        <button
          onClick={onShowAccessibility}
          style={{
            background: "#fff",
            color: "#1976d2",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontWeight: 600,
            cursor: "pointer",
            marginRight: 6,
          }}
          aria-label="Ouvrir les options d'accessibilité"
        >
          ♿ Accessibilité
        </button>
        <button
          onClick={onShowModeration}
          style={{
            background: "#fff",
            color: "#d32f2f",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontWeight: 600,
            cursor: "pointer",
            marginRight: 6,
          }}
          aria-label="Ouvrir le panneau de modération"
        >
          🛡️ Modération
        </button>
        <button
          onClick={onShowBreakout}
          style={{
            background: "#fff",
            color: "#388e3c",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          aria-label="Ouvrir les breakout rooms"
        >
          🧩 Breakout
        </button>
      </div>
      {room.description && (
        <div
          style={{
            marginTop: 6,
            fontSize: "1em",
            color: "#e3f2fd",
            fontStyle: "italic",
            maxWidth: 700,
          }}
        >
          {room.description}
        </div>
      )}
    </header>
  );
}

RoomHeader.propTypes = {
  room: PropTypes.object,
  type: PropTypes.string,
  currentUser: PropTypes.any,
  onShowAccessibility: PropTypes.func,
  onShowModeration: PropTypes.func,
  onShowBreakout: PropTypes.func,
  categories: PropTypes.array,
};
