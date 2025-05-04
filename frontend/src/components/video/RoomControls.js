import React from "react";
import PropTypes from "prop-types";

/**
 * RoomControls – Achiri
 * Barre de contrôle principale de la salle vidéo : actions rapides (partage d'écran, chat, participants, accessibilité).
 * Props :
 * - currentUser : utilisateur courant
 * - room : infos de la room
 * - canShareScreen : booléen, autorisation partage écran
 * - onShareScreen : callback pour ouvrir le panel partage écran
 * - onToggleChat : callback pour afficher/masquer le chat
 * - onToggleParticipants : callback pour afficher/masquer la liste des participants
 * - onToggleAccessibility : callback pour ouvrir le panel accessibilité
 */

export default function RoomControls({
  currentUser,
  room,
  canShareScreen = false,
  onShareScreen,
  onToggleChat,
  onToggleParticipants,
  onToggleAccessibility,
}) {
  return (
    <nav
      className="video-room-controls"
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        margin: "18px 0 8px 0",
        flexWrap: "wrap",
      }}
      aria-label="Contrôles de la salle vidéo"
    >
      {canShareScreen && (
        <button
          onClick={onShareScreen}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: "1em",
            cursor: "pointer",
          }}
          aria-label="Partager l'écran"
        >
          🖥️ Partager l'écran
        </button>
      )}
      <button
        onClick={onToggleChat}
        style={{
          background: "#fff",
          color: "#1976d2",
          border: "1px solid #1976d2",
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 600,
          fontSize: "1em",
          cursor: "pointer",
        }}
        aria-label="Afficher ou masquer le chat"
      >
        💬 Chat
      </button>
      <button
        onClick={onToggleParticipants}
        style={{
          background: "#fff",
          color: "#1976d2",
          border: "1px solid #1976d2",
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 600,
          fontSize: "1em",
          cursor: "pointer",
        }}
        aria-label="Afficher ou masquer la liste des participants"
      >
        👥 Participants
      </button>
      <button
        onClick={onToggleAccessibility}
        style={{
          background: "#fff",
          color: "#388e3c",
          border: "1px solid #388e3c",
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 600,
          fontSize: "1em",
          cursor: "pointer",
        }}
        aria-label="Ouvrir les options d'accessibilité"
      >
        ♿ Accessibilité
      </button>
    </nav>
  );
}

RoomControls.propTypes = {
  currentUser: PropTypes.any,
  room: PropTypes.object,
  canShareScreen: PropTypes.bool,
  onShareScreen: PropTypes.func,
  onToggleChat: PropTypes.func,
  onToggleParticipants: PropTypes.func,
  onToggleAccessibility: PropTypes.func,
};