import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Navbar moderne, accessible, cohérente avec le design Achiri.
 * Affiche les liens principaux et l'utilisateur connecté.
 */
export default function Navbar({ user }) {
  const location = useLocation();
  // Liens principaux couvrant toutes les pages/fonctionnalités du frontend
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profil" },
    { to: "/virtual-classroom", label: "Classes Virtuelles" },
    { to: "/wallet", label: "Wallet" },
    { to: "/accessibilite", label: "Accessibilité" },
    { to: "/analyze-profile", label: "Analyse Profil" },
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
    <nav
      style={{
        width: "100%",
        background: "#1976d2",
        color: "#fff",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
      }}
      aria-label="Navigation principale"
      tabIndex={0}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: 22,
            letterSpacing: 1,
            outline: "none"
          }}
          aria-label="Accueil Achiri"
        >
          Achiri
        </Link>
        {links.slice(1).map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: location.pathname === link.to ? "#ffd600" : "#fff",
              textDecoration: "none",
              fontWeight: location.pathname === link.to ? "bold" : "normal",
              borderBottom: location.pathname === link.to ? "2px solid #ffd600" : "none",
              paddingBottom: 2,
              outline: "none",
              transition: "color 0.2s, border-bottom 0.2s"
            }}
            aria-current={location.pathname === link.to ? "page" : undefined}
            tabIndex={0}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {user && (
        <div style={{ fontSize: 15 }}>
          Connecté en tant que <strong>{user}</strong>
        </div>
      )}
    </nav>
  );
}