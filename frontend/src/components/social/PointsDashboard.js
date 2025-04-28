import React from 'react';

/**
 * PointsDashboard
 * Affiche le solde de points, l'historique des interactions et les stats de performance.
 * Props :
 *   - points : nombre total de points
 *   - history : [{ date, action, points, type }]
 *   - stats : { interactions, boosts, likes, comments, shares }
 *   - role : "user" | "admin" | "owner"
 */
function PointsDashboard({
  points = 0,
  history = [],
  stats = { interactions: 0, boosts: 0, likes: 0, comments: 0, shares: 0 },
  role = "user"
}) {
  return (
    <div
      className="points-dashboard"
      aria-label="Tableau de bord des points"
      tabIndex={0}
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        maxWidth: 600,
        margin: "2rem auto"
      }}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 24, textAlign: "center" }}>🎯 Tableau de bord des points</h2>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
        gap: 20,
        flexWrap: "wrap"
      }}>
        <div style={{
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
          color: "#fff",
          borderRadius: 12,
          padding: "1.2em 2.2em",
          fontWeight: "bold",
          fontSize: 28,
          boxShadow: "0 2px 8px #1976d222",
          minWidth: 120,
          textAlign: "center"
        }}>
          {points} <span style={{ fontSize: 18, fontWeight: 400 }}>points</span>
        </div>
        <div>
          <div style={{ fontSize: 15, color: "#888" }}>Interactions</div>
          <div style={{ fontWeight: "bold", fontSize: 20 }}>{stats.interactions}</div>
        </div>
        <div>
          <div style={{ fontSize: 15, color: "#888" }}>Boosts</div>
          <div style={{ fontWeight: "bold", fontSize: 20 }}>{stats.boosts}</div>
        </div>
      </div>
      <div style={{
        display: "flex",
        gap: 18,
        justifyContent: "center",
        marginBottom: 28,
        flexWrap: "wrap"
      }}>
        <StatBox label="Likes" value={stats.likes} color="#43a047" />
        <StatBox label="Commentaires" value={stats.comments} color="#1976d2" />
        <StatBox label="Partages" value={stats.shares} color="#fbc02d" />
      </div>
      <h3 style={{ margin: "1.5em 0 0.5em 0", color: "#1976d2", fontSize: 19 }}>Historique</h3>
      <div style={{
        maxHeight: 180,
        overflowY: "auto",
        border: "1px solid #e3f2fd",
        borderRadius: 10,
        background: "#f5f7fa",
        padding: "1em"
      }}>
        {history.length === 0 && (
          <div style={{ color: "#888", textAlign: "center", fontStyle: "italic" }}>
            Aucun historique pour le moment.
          </div>
        )}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {history.map((h, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5em 0",
              borderBottom: i < history.length - 1 ? "1px solid #e0e0e0" : "none"
            }}>
              <span style={{ fontWeight: 500 }}>{h.action}</span>
              <span style={{ fontSize: 13, color: "#888" }}>{h.date}</span>
              <span style={{
                color: h.points > 0 ? "#43a047" : "#b71c1c",
                fontWeight: "bold"
              }}>
                {h.points > 0 ? "+" : ""}{h.points}
              </span>
              <span style={{
                fontSize: 13,
                color: "#1976d2",
                background: "#e3f2fd",
                borderRadius: 8,
                padding: "2px 8px",
                marginLeft: 8
              }}>
                {h.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {role === "admin" && (
        <div style={{
          marginTop: 24,
          background: "#ffcdd2",
          color: "#b71c1c",
          borderRadius: 8,
          padding: "0.7em 1em",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          Mode admin : accès à la gestion des points et à la modération.
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{
      background: color + "22",
      color,
      borderRadius: 10,
      padding: "0.7em 1.2em",
      minWidth: 80,
      textAlign: "center"
    }}>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>{value}</div>
      <div style={{ fontSize: 14 }}>{label}</div>
    </div>
  );
}

export default PointsDashboard;