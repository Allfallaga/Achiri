import React, { useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

function Navbar(props) {
  const { auth, setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const logout = () => {
    if (auth.loggedIn === true) {
      setAuth({ loggedIn: false });
      localStorage.removeItem('auth');
      if (props.socket) props.socket.emit("disconnect");
      navigate("/");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        boxShadow: "0 2px 12px #1976d222",
        borderRadius: 0,
        marginBottom: 0,
        minHeight: 64,
        padding: "0.5rem 1.2rem"
      }}
      role="navigation"
      aria-label="Barre de navigation principale"
    >
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarTogglerDemo01"
        aria-expanded={expanded}
        aria-label="Afficher ou masquer la navigation"
        onClick={() => setExpanded(!expanded)}
        style={{ outline: "none" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse${expanded ? " show" : ""}`} id="navbarTogglerDemo01">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontWeight: 700,
            color: "#1976d2",
            fontSize: "1.3rem",
            letterSpacing: 1,
            textDecoration: "none"
          }}
          aria-label="Accueil Inclusive Video Chat"
        >
          Inclusive Video Chat
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={{ marginLeft: 18 }}>
          {auth.loggedIn && (
            <li className="nav-item active">
              <button
                className="btn btn-danger btn-lg"
                onClick={logout}
                style={{ marginLeft: 12, fontWeight: 600, borderRadius: 8, minWidth: 90 }}
                aria-label="Se déconnecter"
              >
                Déconnexion
              </button>
            </li>
          )}
        </ul>
        {auth.loggedIn && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
            <img
              src={auth.avatar || "https://dummyimage.com/40x40/1976d2/fff&text=U"}
              alt={auth.nickname || "Utilisateur"}
              width={38}
              height={38}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 6,
                border: "2px solid #1976d2",
                background: "#e3f2fd"
              }}
            />
            <span
              style={{
                fontWeight: 500,
                color: "#1976d2",
                fontSize: 16,
                letterSpacing: 0.2
              }}
              aria-label={`Connecté en tant que ${auth.nickname || "Utilisateur"}`}
            >
              {auth.nickname || "Utilisateur"}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;