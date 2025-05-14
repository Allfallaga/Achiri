import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";

/**
 * Navbar – Achiri
 * Barre de navigation moderne, accessible, responsive, sécurisée, SEO friendly, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : liens principaux, connexion/déconnexion, avatar, menu burger, feedback, focus, couleurs, dark mode ready.
 * - Prêt pour extensions futures (notifications, badges, analytics, etc).
 */

function Navbar(props) {
  const { auth, setAuth } = React.useContext(AuthContext);
  const [redirect, setRedirect] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();

  const logout = () => {
    setAuth({ loggedIn: false });
    localStorage.setItem("auth", "");
    if (props.socket) props.socket.emit("disconnect");
    setRedirect(true);
  };

  React.useEffect(() => {
    setMenuOpen(false); // Ferme le menu lors du changement de route
  }, [location.pathname]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  // Liens principaux (adaptés pour couvrir toutes les pages du frontend)
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/wallet", label: "Wallet" },
    { to: "/rooms", label: "Rooms" },
    { to: "/challenges", label: "Challenges" },
    { to: "/settings", label: "Paramètres" },
    { to: "/moderation", label: "Modération" },
    { to: "/music", label: "Musique" },
    { to: "/virtual-classroom", label: "Classes Virtuelles" },
    { to: "/creator-tools", label: "Creator Tools" },
    { to: "/notifications", label: "Notifications" },
    { to: "/accessibilite", label: "Accessibilité" },
    { to: "/leaderboard", label: "Classement" },
    { to: "/profile", label: "Profil" },
    { to: "/reseaux-sociaux", label: "Réseaux Sociaux" },
    { to: "/social-interactions", label: "Interactions Sociales" },
  ];

  return (
    <nav
      className="navbar"
      style={{
        background: "#fff",
        boxShadow: "0 2px 8px #eee",
        marginBottom: 8,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      aria-label="Barre de navigation principale"
      tabIndex={0}
    >
      <div
        className="container-fluid"
        style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            color: "#1976d2",
            fontSize: "1.3em",
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
          aria-label="Accueil Achiri"
        >
          Achiri
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="navbarNav"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 26,
            marginLeft: "auto",
            display: "none",
          }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}
          id="navbarNav"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => (
              <li className="nav-item" key={link.to}>
                <Link
                  className={`nav-link${location.pathname === link.to ? " active" : ""}`}
                  to={link.to}
                  style={{
                    color: location.pathname === link.to ? "#1976d2" : "#222",
                    fontWeight: location.pathname === link.to ? 700 : 500,
                    padding: "0.5em 1em",
                    borderRadius: 8,
                    background:
                      location.pathname === link.to ? "#e3f2fd" : "transparent",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  aria-current={
                    location.pathname === link.to ? "page" : undefined
                  }
                  tabIndex={0}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul
            className="navbar-nav ms-auto"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: 0,
              padding: 0,
            }}
          >
            {auth?.loggedIn ? (
              <>
                <li
                  className="nav-item"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <img
                    src={
                      auth.avatar ||
                      "https://bootdey.com/img/Content/avatar/avatar3.png"
                    }
                    alt="Votre avatar"
                    width="36"
                    height="36"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #1976d2",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#1976d2",
                      fontSize: "1em",
                    }}
                  >
                    {auth.nickname}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={logout}
                    aria-label="Se déconnecter"
                    style={{
                      marginLeft: 8,
                      fontWeight: 600,
                      borderRadius: 8,
                      border: "1.5px solid #b71c1c",
                      color: "#b71c1c",
                      background: "#fff",
                      padding: "0.4em 1.2em",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="btn btn-outline-primary"
                  to="/login"
                  aria-label="Se connecter"
                  style={{
                    fontWeight: 600,
                    borderRadius: 8,
                    border: "1.5px solid #1976d2",
                    color: "#1976d2",
                    background: "#fff",
                    padding: "0.4em 1.2em",
                    cursor: "pointer",
                  }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Responsive CSS pour le menu burger */}
      <style>{`
        @media (max-width: 900px) {
          .navbar-toggler {
            display: block !important;
          }
          .navbar-collapse {
            display: none !important;
            width: 100%;
          }
          .navbar-collapse.show {
            display: flex !important;
            flex-direction: column;
            background: #fff;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 2px 16px #1976d244;
            padding: 1em 0;
          }
          .navbar-nav {
            flex-direction: column !important;
            gap: 0 !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .navbar {
            background: #181f2a !important;
            box-shadow: 0 2px 8px #222a;
          }
          .navbar-brand, .nav-link, .btn-outline-primary, .btn-outline-danger {
            color: #e3f2fd !important;
            background: #181f2a !important;
            border-color: #1976d2 !important;
          }
          .nav-link.active {
            background: #223366 !important;
            color: #90caf9 !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

/**
 * Documentation :
 * - Navbar : liens principaux, connexion/déconnexion, avatar, menu burger, feedback, focus, couleurs, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
