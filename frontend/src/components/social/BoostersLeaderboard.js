import React from 'react';

/**
 * BoostersLeaderboard
 * Affiche le classement des meilleurs "boosters" (utilisateurs qui interagissent le plus pour les autres).
 * Props :
 *   - boosters : [{ name, avatar, points, interactions, isCurrentUser }]
 *   - role : "user" | "admin" | "owner"
 */
function BoostersLeaderboard({ boosters = [], role = "user" }) {
  return (
    <section
      className="boosters-leaderboard"
      aria-label="Classement des boosters"
      tabIndex={0}
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        maxWidth: 500,
        margin: "2rem auto"
      }}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 24, textAlign: "center" }}>
        🏆 Classement des Boosters
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {boosters.length === 0 && (
          <li style={{ color: "#888", textAlign: "center", fontStyle: "italic" }}>
            Aucun booster pour le moment.
          </li>
        )}
        {boosters.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              background: b.isCurrentUser ? "#e3f2fd" : "#f5f7fa",
              borderRadius: 10,
              marginBottom: 12,
              padding: "0.7em 1em",
              boxShadow: b.isCurrentUser ? "0 2px 8px #1976d222" : "none",
              border: b.isCurrentUser ? "2px solid #1976d2" : "none"
            }}
            aria-current={b.isCurrentUser ? "true" : undefined}
            tabIndex={0}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: i === 0 ? "#ffd600" : i === 1 ? "#bdbdbd" : i === 2 ? "#ff7043" : "#1976d2",
                marginRight: 16,
                width: 24,
                textAlign: "center"
              }}
              aria-label={`Rang ${i + 1}`}
            >
              {i + 1}
            </span>
            <span
              style={{
                fontSize: 32,
                marginRight: 16,
                background: "#fff",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid #bbdefb"
              }}
              aria-label={`Avatar de ${b.name}`}
            >
              {b.avatar || "😀"}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: b.isCurrentUser ? "bold" : 500,
                  fontSize: 17,
                  color: b.isCurrentUser ? "#1976d2" : "#222"
                }}
              >
                {b.name} {b.isCurrentUser && <span style={{ fontSize: 13, color: "#43a047" }}>(Moi)</span>}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                {b.interactions} interactions
              </div>
            </div>
            <span
              style={{
                background: "#43a04722",
                color: "#43a047",
                borderRadius: 8,
                padding: "0.3em 1em",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10
              }}
              aria-label={`Points : ${b.points}`}
            >
              +{b.points} pts
            </span>
          </li>
        ))}
      </ul>
      {role === "admin" && (
        <div
          style={{
            marginTop: 24,
            background: "#ffcdd2",
            color: "#b71c1c",
            borderRadius: 8,
            padding: "0.7em 1em",
            fontWeight: "bold",
            textAlign: "center"
          }}
          aria-label="Mode admin activé"
        >
          Mode admin : accès au classement global et à la gestion des boosters.
        </div>
      )}
    </section>
  );
}

export default BoostersLeaderboard;