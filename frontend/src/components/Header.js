import React from 'react';
import { Link } from "react-router-dom";

/**
 * En-tête principal de l'application vidéo chat.
 * Props optionnelles : title, children
 * Ajout de navigation rapide pour activer toutes les fonctionnalités/pages.
 */
function Header({ title = 'Vidéo Chat Room', children }) {
  // Liens principaux pour navigation rapide
  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profil" },
    { to: "/virtual-classroom", label: "Classes Virtuelles" },
    { to: "/wallet", label: "Wallet" },
    { to: "/accessibilite", label: "Accessibilité" },
    { to: "/settings", label: "Paramètres" },
    { to: "/rooms", label: "Rooms" },
    { to: "/music", label: "Musique" },
    { to: "/notifications", label: "Notifications" },
    { to: "/friends", label: "Amis" },
    { to: "/challenges", label: "Challenges" },
    { to: "/leaderboard", label: "Classement" },
    { to: "/creator-tools", label: "Creator Tools" },
    { to: "/moderation", label: "Modération" },
    { to: "/reseaux-sociaux", label: "Réseaux Sociaux" },
    { to: "/social-interactions", label: "Interactions Sociales" }
  ];

  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
        color: '#fff',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0 0 16px 16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '2rem',
      }}
      aria-label="En-tête principal"
      tabIndex={0}
    >
      <h1 style={{ margin: 0, fontSize: '2rem', letterSpacing: 1 }}>{title}</h1>
      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "1em",
              borderBottom: "2px solid transparent",
              transition: "color 0.2s, border-bottom 0.2s"
            }}
            aria-label={link.label}
          >
            {link.label}
          </Link>
        ))}
        {children}
      </div>
    </header>
  );
}

export default Header;