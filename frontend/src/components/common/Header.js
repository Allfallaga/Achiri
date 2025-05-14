import React from "react";
import { Link } from "react-router-dom";

/**
 * Header – Achiri
 * En-tête principal de l'application : navigation rapide, accessibilité, sécurité, responsive, SEO friendly, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : navigation rapide, titre dynamique, slot enfants, couleurs, dark mode ready, notifications, badges.
 * - Prêt pour extensions futures (badges, notifications, analytics, overlay, IA, etc).
 *
 * Props :
 *   - title : string (titre affiché)
 *   - children : ReactNode (éléments additionnels)
 *   - notifications : { [route]: number }
 */

function Header({ title = "Vidéo Chat Room", children, notifications = {} }) {
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
    { to: "/social-interactions", label: "Interactions Sociales" },
  ];

  return (
    <header
      className="header-achiri"
      style={{
        background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
        color: "#fff",
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "0 0 16px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        marginBottom: "2rem",
        flexWrap: "wrap",
      }}
      aria-label="En-tête principal"
      tabIndex={0}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "2rem",
          letterSpacing: 1,
          fontWeight: 700,
          textShadow: "0 2px 8px #1976d244",
        }}
        tabIndex={0}
      >
        {title}
      </h1>
      <nav
        aria-label="Navigation rapide"
        style={{
          display: "flex",
          gap: "1.2rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "1em",
              borderBottom: "2px solid transparent",
              padding: "0.2em 0.5em",
              borderRadius: 6,
              transition: "color 0.2s, border-bottom 0.2s, background 0.2s",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
            aria-label={link.label}
            tabIndex={0}
            className="header-link"
          >
            {link.label}
            {notifications[link.to] > 0 && (
              <span
                style={{
                  background: "#ffd600",
                  color: "#222",
                  borderRadius: 10,
                  padding: "0 7px",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginLeft: 7,
                  minWidth: 18,
                  display: "inline-block",
                  textAlign: "center",
                }}
                aria-label={`${notifications[link.to]} notifications non lues`}
              >
                {notifications[link.to]}
              </span>
            )}
          </Link>
        ))}
        {children}
      </nav>
      <style>{`
        @media (max-width: 900px) {
          .header-achiri {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.2rem 0.7rem;
            border-radius: 0 0 12px 12px;
          }
          .header-achiri nav {
            gap: 0.7rem;
            margin-top: 1rem;
            flex-wrap: wrap;
          }
        }
        .header-link:focus {
          outline: 2px solid #ffd600;
          background: #1565c0;
        }
        .header-link:hover {
          color: #ffd600;
          border-bottom: 2px solid #ffd600;
          background: #1565c0;
        }
        @media (prefers-color-scheme: dark) {
          .header-achiri {
            background: linear-gradient(90deg, #181f2a 0%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          .header-link {
            color: #e3f2fd !important;
          }
          .header-link:hover, .header-link:focus {
            color: #ffd600 !important;
            background: #223366 !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;

/**
 * Documentation :
 * - Header : navigation rapide, titre dynamique, slot enfants, couleurs, notifications, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */
