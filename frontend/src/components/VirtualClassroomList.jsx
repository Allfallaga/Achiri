import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUsers, FaBookOpen } from "react-icons/fa";

export default function VirtualClassroomList({ userId, onJoin }) {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);

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

  if (selectedClassroom) {
    return (
      <div
        style={{
          margin: "2rem 0",
          padding: 24,
          border: "1px solid #e3e8ef",
          borderRadius: 12,
          background: "#fff",
          maxWidth: 600,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
          fontFamily: "'Segoe UI', Arial, sans-serif"
        }}
        aria-label={`Vous avez rejoint la classe ${selectedClassroom}`}
        tabIndex={0}
      >
        <h3 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.15em" }}>
          Vous avez rejoint la classe {selectedClassroom}
        </h3>
        {/* Ici tu peux afficher un composant VirtualClassroomDetail ou Quiz */}
      </div>
    );
  }

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
      {loading && <div>Chargement...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {classrooms.length === 0 && !loading && <li style={{ color: "#888", fontStyle: "italic" }}>Aucune classe disponible</li>}
        {classrooms.map(cls => (
          <li
            key={cls.id}
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
            aria-label={`Voir la classe ${cls.name}`}
            onClick={() => handleJoin(cls.id)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleJoin(cls.id)}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "1.1em", color: "#1976d2" }}>{cls.name || `Classe #${cls.id}`}</div>
              <div style={{ fontSize: "0.97em", color: "#555", marginTop: 2 }}>{cls.description}</div>
              <div style={{ fontSize: "0.92em", color: "#43a047", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <FaUsers /> {cls.participants || 0} participants
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
              aria-label={`Accéder à la classe ${cls.name}`}
              onClick={e => { e.stopPropagation(); handleJoin(cls.id); }}
              tabIndex={-1}
            >
              Rejoindre
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}