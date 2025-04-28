import React, { useEffect, useState } from "react";

/**
 * Scoreboard : classement des scores pour une classe virtuelle.
 * Props :
 *   classroomId : identifiant de la classe
 */
export default function Scoreboard({ classroomId }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!classroomId) return;
    setLoading(true);
    setError("");
    // Simulation de chargement des scores (mock)
    setTimeout(() => {
      setScores([
        { userId: "Alice", score: 12 },
        { userId: "Bob", score: 9 },
        { userId: "Charlie", score: 7 },
      ]);
      setLoading(false);
    }, 700);
  }, [classroomId]);

  return (
    <section
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3e3e3",
        borderRadius: 12,
        maxWidth: 420,
        background: "#fafcff",
        outline: "none"
      }}
      aria-label="Classement des scores"
      tabIndex={0}
    >
      <h3 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.2em", marginBottom: 14 }}>
        🏆 Classement / Scores
      </h3>
      {loading && <div aria-live="polite" style={{ color: "#1976d2", fontWeight: 500 }}>Chargement...</div>}
      {error && <div style={{ color: "red" }} role="alert">{error}</div>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {scores.length === 0 && !loading && <li style={{ color: "#888" }}>Aucun score pour l’instant</li>}
        {scores.map((s, idx) => (
          <li
            key={idx}
            style={{
              background: idx === 0 ? "#e3f2fd" : "#fff",
              borderRadius: 6,
              padding: "8px 12px",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              fontWeight: idx === 0 ? 700 : 500,
              color: idx === 0 ? "#1976d2" : "#333"
            }}
            aria-label={`Utilisateur ${s.userId}, score ${s.score}`}
          >
            <span style={{ minWidth: 28, display: "inline-block" }}>
              {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
            </span>
            <span style={{ flex: 1 }}>{s.userId}</span>
            <span style={{ fontWeight: 600 }}>{s.score}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}