import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Sidebar moderne et accessible pour la navigation principale.
 * Props :
 *   user: string (nom ou id)
 *   role: string (user/admin/owner)
 */
export default function Sidebar({ user, role = "user", notifications = {} }) {
  // Liens principaux avec gestion des rôles et notifications
  const links = [
    { to: "/", label: "Accueil", icon: "🏠", roles: ["user", "admin", "owner"] },
    { to: "/profile", label: "Profil", icon: "👤", roles: ["user", "admin", "owner"] },
    { to: "/dashboard", label: "Dashboard", icon: "📊", roles: ["user", "admin", "owner"] },
    { to: "/accessibilite", label: "Accessibilité", icon: "♿", roles: ["user", "admin", "owner"] },
    { to: "/domotique", label: "Domotique", icon: "🏡", roles: ["user", "admin", "owner"] },
    { to: "/sante", label: "Santé", icon: "🩺", roles: ["user", "admin", "owner"] },
    { to: "/urgence", label: "Urgence", icon: "🚨", roles: ["user", "admin", "owner"] },
    { to: "/influenceur", label: "Influenceur", icon: "📢", roles: ["user", "admin", "owner"] },
    { to: "/quiz", label: "Quiz", icon: "❓", roles: ["user", "admin", "owner"] },
    { to: "/creator-tools", label: "Creator Tools", icon: "🛠️", roles: ["admin", "owner"] },
    { to: "/parametres", label: "Paramètres", icon: "⚙️", roles: ["user", "admin", "owner"] },
    { to: "/reseaux-sociaux", label: "Réseaux Sociaux", icon: "🌐", roles: ["user", "admin", "owner"] },
    { to: "/social-interactions", label: "Interactions Sociales", icon: "💬", roles: ["user", "admin", "owner"] },
    { to: "/classes-virtuelles", label: "Classes Virtuelles", icon: "🏫", roles: ["user", "admin", "owner"] },
    { to: "/wallet", label: "Wallet", icon: "💰", roles: ["user", "admin", "owner"] },
    { to: "/room/demo-classroom", label: "Video Room (démo)", icon: "🎥", roles: ["user", "admin", "owner"] },
    { to: "/leaderboard", label: "Classement", icon: "🏆", roles: ["user", "admin", "owner"] },
    { to: "/friends", label: "Amis", icon: "👥", roles: ["user", "admin", "owner"] },
    { to: "/admin", label: "Admin", icon: "🛡️", roles: ["admin", "owner"] },
    // Ajoute d'autres liens ici si besoin
  ];

  return (
    <aside
      style={{
        width: 220,
        background: "#1976d2",
        color: "#fff",
        borderRight: "1px solid #1565c0",
        padding: "2rem 1rem 1rem 1rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 12px #1976d233",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        outline: "none"
      }}
      aria-label="Menu principal"
      tabIndex={0}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links
            .filter(link => link.roles.includes(role))
            .map(link => (
              <li key={link.to} style={{ marginBottom: 8 }}>
                <NavLink
                  to={link.to}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    background: isActive ? "#1565c0" : "none",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: isActive ? "bold" : "normal",
                    fontSize: 17,
                    padding: "12px 18px",
                    borderRadius: 8,
                    outline: isActive ? "2px solid #fff" : "none",
                    transition: "background 0.2s"
                  })}
                  aria-label={link.label}
                  tabIndex={0}
                >
                  <span style={{ fontSize: 22, marginRight: 14 }}>{link.icon}</span>
                  {link.label}
                  {notifications[link.to] > 0 && (
                    <span style={{
                      background: '#ffb300',
                      color: '#222',
                      borderRadius: 12,
                      padding: '2px 8px',
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                      {notifications[link.to]}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      {user && (
        <div
          style={{
            marginTop: "auto",
            fontSize: 14,
            color: "#bbdefb",
            padding: "1.5rem 0 0 0",
            borderTop: "1px solid #1565c0"
          }}
          aria-label="Utilisateur connecté"
        >
          Connecté en tant que <strong>{user}</strong>
          <div style={{ fontSize: 13, color: "#fff", marginTop: 2 }}>
            {role === "owner" && "👑 Owner"}
            {role === "admin" && "🛡️ Admin"}
            {role === "user" && "Utilisateur"}
          </div>
        </div>
      )}
      <div style={{ fontSize: 13, color: "#bbdefb", marginTop: 18, textAlign: "center" }}>
        © {new Date().getFullYear()} Achiri
      </div>
    </aside>
  );
}