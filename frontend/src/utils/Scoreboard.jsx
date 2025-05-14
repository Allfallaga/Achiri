import React, { useEffect, useState } from "react";

/**
 * Scoreboard – Achiri
 * Classement des scores pour une classe virtuelle.
 * - Accessibilité avancée (ARIA, focus, feedback)
 * - Sécurité (aucune donnée sensible, pas de tracking)
 * - Compatible mobile/web, design moderne, UX avancée
 * - Prêt pour extensions (avatars, badges, export, notifications, etc)
 *
 * Props :
 *   - classroomId : identifiant de la classe
 *   - fetchScores : (optionnel) fonction async pour charger les scores (par défaut mock)
 */

export default function Scoreboard({ classroomId, fetchScores }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fonction de chargement des scores (mock ou réelle)
  const loadScores = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (fetchScores) {
        data = await fetchScores(classroomId);
      } else {
        // Simulation de chargement des scores (mock)
        data = [
          { userId: "Alice", score: 12, avatar: "🦊", badge: "Expert" },
          { userId: "Bob", score: 9, avatar: "🐼" },
          { userId: "Charlie", score: 7, avatar: "🐧" },
        ];
        await new Promise((r) => setTimeout(r, 700));
      }
      setScores(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Erreur lors du chargement des scores.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (classroomId) loadScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomId]);

  // Accessibilité : focus sur le titre à l'ouverture
  const titleRef = React.useRef();
  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, [scores, loading]);

  return (
    <section
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3e3e3",
        borderRadius: 14,
        maxWidth: 440,
        background: "#fafdff",
        outline: "none",
        boxShadow: "0 2px 16px #1976d220",
      }}
      aria-label="Classement des scores"
      tabIndex={0}
    >
      <h3
        ref={titleRef}
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.22em",
          marginBottom: 14,
          outline: "none",
        }}
        tabIndex={-1}
      >
        🏆 Classement / Scores
      </h3>
      {loading && (
        <div aria-live="polite" style={{ color: "#1976d2", fontWeight: 500 }}>
          Chargement...
        </div>
      )}
      {error && (
        <div style={{ color: "red" }} role="alert">
          {error}
        </div>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {scores.length === 0 && !loading && (
          <li style={{ color: "#888" }}>Aucun score pour l’instant</li>
        )}
        {scores.map((s, idx) => (
          <li
            key={s.userId || idx}
            style={{
              background: idx === 0 ? "#e3f2fd" : "#fff",
              borderRadius: 7,
              padding: "9px 13px",
              marginBottom: 7,
              display: "flex",
              alignItems: "center",
              fontWeight: idx === 0 ? 700 : 500,
              color: idx === 0 ? "#1976d2" : "#333",
              boxShadow: idx === 0 ? "0 2px 8px #1976d220" : "none",
            }}
            aria-label={`Utilisateur ${s.userId}, score ${s.score}${s.badge ? `, badge ${s.badge}` : ""}`}
          >
            <span
              style={{ minWidth: 28, display: "inline-block", fontSize: 22 }}
            >
              {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
            </span>
            <span style={{ minWidth: 30, fontSize: 22, marginRight: 6 }}>
              {s.avatar || ""}
            </span>
            <span style={{ flex: 1 }}>{s.userId}</span>
            {s.badge && (
              <span
                style={{
                  background: "#ede7f6",
                  color: "#8E24AA",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "2px 8px",
                  marginRight: 8,
                  marginLeft: 4,
                }}
                aria-label={`Badge ${s.badge}`}
              >
                {s.badge}
              </span>
            )}
            <span style={{ fontWeight: 600 }}>{s.score}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Documentation :
 * - Props : classroomId (obligatoire), fetchScores (optionnel, async)
 * - Accessibilité : ARIA, focus, feedback visuel, navigation clavier
 * - Sécurité : aucune donnée sensible, pas de tracking
 * - Extensible : avatars, badges, export, notifications, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */
