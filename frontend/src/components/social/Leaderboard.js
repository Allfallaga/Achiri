import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Leaderboard – Achiri
 * Classement des utilisateurs : points, badges, rôles, avatars, filtres, accessibilité, sécurité, responsive, SEO, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : tri, filtres, badges, rôles, avatars, feedback, focus, couleurs, responsive.
 * - Prêt pour extensions futures (pagination, export, dark mode, analytics, etc).
 *
 * Props :
 *   users: [{ id, name, avatar, points, badges, role, color }]
 *   currentUser: string (id ou nom)
 *   filter: 'all' | 'owner' | 'admin' | 'user'
 *   onFilterChange: function(filter)
 */

function Leaderboard({
  users = [],
  currentUser,
  filter = "all",
  onFilterChange,
}) {
  // Tri par points décroissants et filtrage par rôle
  const sorted = [...users]
    .filter((u) => filter === "all" || u.role === filter)
    .sort((a, b) => (b.points || 0) - (a.points || 0));

  const filters = [
    { key: "all", label: "Tous" },
    { key: "owner", label: "Owners" },
    { key: "admin", label: "Admins" },
    { key: "user", label: "Utilisateurs" },
  ];

  // Accessibilité : focus auto sur le titre à l'arrivée
  const titleRef = React.useRef();
  React.useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  return (
    <section
      className="leaderboard-container"
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 24,
        maxWidth: 480,
        margin: "2rem auto",
        boxShadow: "0 2px 16px #1976d233",
        outline: "none",
      }}
      aria-label="Classement des utilisateurs"
      tabIndex={0}
    >
      <Helmet>
        <title>Classement | Achiri</title>
        <meta
          name="description"
          content="Classement des utilisateurs Achiri : points, badges, rôles, avatars, filtres, accessibilité, sécurité, responsive, SEO, design avancé."
        />
      </Helmet>
      <header style={{ marginBottom: 18 }}>
        <h2
          style={{
            margin: 0,
            color: "#1976d2",
            fontWeight: 700,
            fontSize: "1.4em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          tabIndex={0}
          aria-label="Classement Achiri"
          ref={titleRef}
        >
          🏆 Classement
        </h2>
        <nav
          aria-label="Filtres du classement"
          style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange && onFilterChange(f.key)}
              style={{
                background: filter === f.key ? "#1976d2" : "#e3f2fd",
                color: filter === f.key ? "#fff" : "#1976d2",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                fontWeight: "bold",
                cursor: "pointer",
                outline: filter === f.key ? "2px solid #1976d2" : "none",
                boxShadow: filter === f.key ? "0 2px 8px #1976d233" : undefined,
                transition: "background 0.2s, color 0.2s",
              }}
              aria-pressed={filter === f.key}
              aria-label={`Filtrer par ${f.label}`}
              tabIndex={0}
            >
              {f.label}
            </button>
          ))}
        </nav>
      </header>
      <ol style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {sorted.length === 0 && (
          <li style={{ color: "#888", fontStyle: "italic", marginTop: 20 }}>
            Aucun utilisateur à afficher.
          </li>
        )}
        {sorted.map((u, idx) => (
          <li
            key={u.id || u.name}
            style={{
              background:
                u.id === currentUser || u.name === currentUser
                  ? "#e3f2fd"
                  : "#f5f7fa",
              borderRadius: 8,
              marginBottom: 10,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              border: idx === 0 ? "2px solid #ffd600" : "1px solid #e0e0e0",
              boxShadow: idx < 3 ? "0 0 8px 2px #ffd60033" : undefined,
              fontWeight: idx < 3 ? "bold" : "normal",
              outline:
                u.id === currentUser || u.name === currentUser
                  ? "2px solid #1976d2"
                  : "none",
            }}
            aria-current={
              u.id === currentUser || u.name === currentUser
                ? "true"
                : undefined
            }
            tabIndex={0}
          >
            <span style={{ fontSize: 22, marginRight: 10 }}>
              {u.avatar || "👤"}
            </span>
            <span
              style={{
                color: u.color || "#1976d2",
                marginRight: 8,
                fontWeight: 600,
              }}
            >
              {u.name}
            </span>
            {u.role === "owner" && (
              <span
                title="Owner"
                style={{ marginLeft: 4, color: "#1976d2" }}
                aria-label="Owner"
              >
                👑
              </span>
            )}
            {u.role === "admin" && (
              <span
                title="Admin"
                style={{ marginLeft: 4, color: "#43a047" }}
                aria-label="Admin"
              >
                🛡️
              </span>
            )}
            <span
              style={{
                marginLeft: "auto",
                color: "#1976d2",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {u.points} pts
            </span>
            <span style={{ marginLeft: 12, display: "flex", gap: 2 }}>
              {u.badges &&
                u.badges.map((b, i) => (
                  <span
                    key={b + i}
                    style={{
                      background: "#eee",
                      borderRadius: 4,
                      padding: "0 4px",
                      fontSize: 13,
                      marginLeft: 2,
                      color: "#bfa000",
                    }}
                  >
                    {b}
                  </span>
                ))}
            </span>
            {u.id === currentUser || u.name === currentUser ? (
              <span
                style={{ marginLeft: 10, color: "#43a047", fontWeight: 600 }}
              >
                (vous)
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center",
        }}
      >
        <span role="img" aria-label="sécurité">
          🔒
        </span>{" "}
        Sécurisé |{" "}
        <span role="img" aria-label="accessibilité">
          ♿
        </span>{" "}
        Accessible |{" "}
        <span role="img" aria-label="mobile">
          📱
        </span>{" "}
        Mobile/Web
        <br />
        <span style={{ fontSize: "0.93em" }}>
          Design avancé, navigation clavier, SEO optimisé, branding Achiri.
        </span>
      </footer>
    </section>
  );
}

export default Leaderboard;

/**
 * Documentation :
 * - Classement des utilisateurs : tri, filtres, badges, rôles, avatars, feedback, focus, couleurs, responsive.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 * - Prêt pour pagination, export, dark mode, analytics, overlay, IA, badges, notifications.
 */
