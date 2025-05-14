import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer – Achiri
 * Pied de page global, moderne, accessible, sécurisé, responsive, SEO friendly, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : navigation rapide, copyright, lien code source, dark mode.
 * - Prêt pour extensions futures (badges, notifications, analytics, overlay, IA, etc).
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
    { to: "/social-interactions", label: "Interactions Sociales" },
  ];

  return (
    <footer
      className="footer-achiri"
      style={{
        background: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "1rem 0",
        marginTop: "2rem",
        borderRadius: "12px 12px 0 0",
        fontSize: "1rem",
        opacity: 0.97,
        letterSpacing: 0.2,
        boxShadow: "0 -2px 12px #1976d233",
        width: "100%",
        outline: "none",
      }}
      aria-label="Pied de page"
      tabIndex={0}
    >
      <nav
        aria-label="Navigation pied de page"
        style={{
          marginBottom: 8,
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: "#90caf9",
              textDecoration: "underline",
              fontWeight: 500,
              margin: "0 8px",
              outline: "none",
              borderRadius: 6,
              padding: "0.1em 0.4em",
              transition: "background 0.2s, color 0.2s",
            }}
            aria-label={link.label}
            className="footer-link"
            tabIndex={0}
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
            color: "#90caf9",
            textDecoration: "underline",
            fontWeight: 500,
            outline: "none",
          }}
          aria-label="Voir le code source sur GitHub (nouvel onglet)"
        >
          Code source
        </a>
      </span>
      <div style={{ marginTop: 8, color: "#bbb", fontSize: "0.93em" }}>
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
      </div>
      <style>{`
        .footer-link:focus {
          outline: 2px solid #ffd600;
          background: #1565c0;
          color: #fff;
        }
        .footer-link:hover {
          color: #ffd600;
          background: #1565c0;
        }
        @media (max-width: 900px) {
          .footer-achiri {
            font-size: 0.97rem;
            border-radius: 8px 8px 0 0;
            padding: 0.7rem 0.2rem;
          }
          .footer-achiri nav {
            flex-wrap: wrap;
            gap: 4px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .footer-achiri {
            background: #181f2a !important;
            color: #e3f2fd !important;
          }
          .footer-link {
            color: #e3f2fd !important;
          }
          .footer-link:hover, .footer-link:focus {
            color: #ffd600 !important;
            background: #223366 !important;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;

/**
 * Documentation :
 * - Footer : navigation rapide, copyright, lien code source.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */
