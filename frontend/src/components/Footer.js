import React from 'react';
import { Link } from "react-router-dom";

/**
 * Pied de page global, moderne et accessible.
 * Ajoute navigation rapide pour activer toutes les fonctionnalités/pages.
 */
function Footer() {
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
    <footer
      style={{
        background: '#222',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: '2rem',
        borderRadius: '12px 12px 0 0',
        fontSize: '1rem',
        opacity: 0.95,
        letterSpacing: 0.2,
        boxShadow: '0 -2px 12px #1976d233',
      }}
      aria-label="Pied de page"
      tabIndex={0}
    >
      <nav aria-label="Navigation pied de page" style={{ marginBottom: 8 }}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: "#90caf9",
              textDecoration: "underline",
              fontWeight: 500,
              margin: "0 8px",
              outline: "none"
            }}
            aria-label={link.label}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <span>
        © {new Date().getFullYear()} Achiri Video Chat&nbsp;|&nbsp;
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#90caf9',
            textDecoration: 'underline',
            fontWeight: 500,
            outline: 'none'
          }}
          aria-label="Voir le code source sur GitHub (nouvel onglet)"
        >
          Code source
        </a>
      </span>
    </footer>
  );
}

export default Footer;