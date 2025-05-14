import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * BreakoutRoomsPanel – Achiri
 * Gestion des breakout rooms : création, liste, rejoindre/quitter, fermeture.
 * Props :
 * - rooms : [{ id, name, participants: [userId], owner }]
 * - currentUser : utilisateur courant
 * - onCreateRoom : callback (nom) => void
 * - onJoinRoom : callback (roomId) => void
 * - onLeaveRoom : callback (roomId) => void
 * - onClose : callback pour fermer le panel
 */

export default function BreakoutRoomsPanel({
  rooms = [],
  currentUser,
  onCreateRoom,
  onJoinRoom,
  onLeaveRoom,
  onClose,
}) {
  const [newRoomName, setNewRoomName] = useState("");
  const [error, setError] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    setError(null);
    if (!newRoomName.trim()) {
      setError("Le nom de la room est requis.");
      return;
    }
    if (onCreateRoom) onCreateRoom(newRoomName.trim());
    setNewRoomName("");
  };

  const isInRoom = (room) =>
    room.participants &&
    currentUser &&
    room.participants.includes(currentUser.id);

  return (
    <div
      className="breakout-rooms-panel"
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#fff",
        color: "#222",
        borderRadius: 16,
        boxShadow: "0 4px 32px #0002",
        padding: 24,
        minWidth: 320,
        maxWidth: 480,
        width: "90vw",
        outline: "none",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des breakout rooms"
      tabIndex={-1}
    >
      <h2 style={{ marginTop: 0, fontSize: "1.3em" }}>Breakout Rooms</h2>
      {error && (
        <div role="alert" style={{ color: "red", marginBottom: 10 }}>
          {error}
        </div>
      )}
      <form
        onSubmit={handleCreate}
        style={{ marginBottom: 18, display: "flex", gap: 8 }}
      >
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Nom de la nouvelle room"
          aria-label="Nom de la nouvelle breakout room"
          style={{
            flex: 1,
            borderRadius: 6,
            border: "1px solid #1976d2",
            padding: "7px 10px",
            fontSize: "1em",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "7px 16px",
            fontWeight: 600,
            fontSize: "1em",
            cursor: "pointer",
          }}
          aria-label="Créer une breakout room"
        >
          Créer
        </button>
      </form>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          maxHeight: 220,
          overflowY: "auto",
        }}
      >
        {rooms.length === 0 && (
          <li style={{ color: "#888", fontStyle: "italic" }}>
            Aucune breakout room
          </li>
        )}
        {rooms.map((room) => (
          <li
            key={room.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 0",
              borderBottom: "1px solid #e3e3e3",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1976d2" }}>
              {room.name}
            </span>
            <span style={{ fontSize: "0.95em", color: "#555" }}>
              ({room.participants?.length || 0} participant
              {room.participants?.length > 1 ? "s" : ""})
            </span>
            <div style={{ flex: 1 }} />
            {isInRoom(room) ? (
              <button
                onClick={() => onLeaveRoom && onLeaveRoom(room.id)}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontWeight: 600,
                  fontSize: "0.97em",
                  cursor: "pointer",
                }}
                aria-label={`Quitter la breakout room ${room.name}`}
              >
                Quitter
              </button>
            ) : (
              <button
                onClick={() => onJoinRoom && onJoinRoom(room.id)}
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontWeight: 600,
                  fontSize: "0.97em",
                  cursor: "pointer",
                }}
                aria-label={`Rejoindre la breakout room ${room.name}`}
              >
                Rejoindre
              </button>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 18, textAlign: "right" }}>
        <button
          onClick={onClose}
          style={{
            background: "#eee",
            color: "#222",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: "1em",
            cursor: "pointer",
          }}
          aria-label="Fermer le panel des breakout rooms"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

BreakoutRoomsPanel.propTypes = {
  rooms: PropTypes.array,
  currentUser: PropTypes.object,
  onCreateRoom: PropTypes.func,
  onJoinRoom: PropTypes.func,
  onLeaveRoom: PropTypes.func,
  onClose: PropTypes.func,
};
