import React, { useState } from "react";
import { FaChalkboardTeacher, FaUsers, FaBookOpen } from "react-icons/fa";

// Mock data pour la démo
const mockClassrooms = [
  {
    id: 1,
    name: "Classe Démo",
    description: "Bienvenue dans la classe virtuelle de démonstration.",
    participants: 12,
  },
  {
    id: 2,
    name: "Atelier IA",
    description: "Atelier interactif sur l'intelligence artificielle.",
    participants: 8,
  },
];

export default function VirtualClassroomList({ userId, onSelect }) {
  const [classrooms] = useState(mockClassrooms);

  return (
    <div
      className="virtual-classroom-list-container"
      style={{
        margin: "2rem auto",
        padding: "2rem",
        background: "#e1f5fe",
        borderRadius: 12,
        maxWidth: 600,
        boxShadow: "0 4px 24px 0 rgba(33,150,243,0.08)",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Liste des classes virtuelles"
      tabIndex={0}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <FaChalkboardTeacher style={{ color: "#1976d2", fontSize: 28, marginRight: 12 }} />
        <h2 style={{ fontWeight: 700, fontSize: "1.3em", color: "#1976d2", margin: 0 }}>
          Liste des classes virtuelles
        </h2>
      </div>
      <div style={{ marginBottom: 16, color: "#2563eb", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
        <FaBookOpen /> {classrooms.length} classes &nbsp;|&nbsp; Utilisateur : <strong>{userId}</strong>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {classrooms.map((c) => (
          <li
            key={c.id}
            className="classroom-item"
            style={{
              background: "#fff",
              borderRadius: 8,
              marginBottom: 14,
              padding: "1rem",
              boxShadow: "0 2px 8px 0 rgba(33,150,243,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              borderLeft: "4px solid #1976d2",
              transition: "box-shadow 0.2s, background 0.2s"
            }}
            tabIndex={0}
            aria-label={`Voir la classe ${c.name}`}
            onClick={() => onSelect && onSelect(c.id)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && onSelect && onSelect(c.id)}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "1.1em", color: "#1976d2" }}>{c.name}</div>
              <div style={{ fontSize: "0.97em", color: "#555", marginTop: 2 }}>{c.description}</div>
              <div style={{ fontSize: "0.92em", color: "#43a047", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <FaUsers /> {c.participants} participants
              </div>
            </div>
            <button
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                marginLeft: 16
              }}
              aria-label={`Accéder à la classe ${c.name}`}
              onClick={e => { e.stopPropagation(); onSelect && onSelect(c.id); }}
              tabIndex={-1}
            >
              Accéder
            </button>
          </li>
        ))}
      </ul>
      {classrooms.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic", marginTop: 24 }}>
          Aucune classe virtuelle disponible.
        </div>
      )}
    </div>
  );
}