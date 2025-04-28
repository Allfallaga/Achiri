import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Ajout du choix du rôle
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    // Ici, tu pourrais appeler une API ou vérifier côté AuthProvider
    login({ username, role });
    setError("");
    navigate("/dashboard");
  };

  return (
    <main
      style={{
        maxWidth: 400,
        margin: "4rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px #1976d233",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Connexion utilisateur"
      tabIndex={0}
    >
      <h2 style={{ textAlign: "center", color: "#1976d2", fontWeight: 700, fontSize: "2rem" }}>
        Connexion
      </h2>
      <form onSubmit={handleLogin} aria-label="Formulaire de connexion">
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: "#333", display: "block" }}>
            Nom d'utilisateur
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Votre pseudo"
              style={{
                width: "100%",
                padding: "0.7em",
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #bdbdbd",
                fontSize: "1em",
                marginBottom: 8
              }}
              maxLength={32}
              aria-label="Nom d'utilisateur"
              autoComplete="username"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: "#333", display: "block" }}>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              style={{
                width: "100%",
                padding: "0.7em",
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #bdbdbd",
                fontSize: "1em",
                marginBottom: 8
              }}
              maxLength={32}
              aria-label="Mot de passe"
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        {/* Sélecteur de rôle pour tests/accès multi-rôles */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: "#333", display: "block" }}>
            Rôle
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7em",
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #bdbdbd",
                fontSize: "1em",
                marginBottom: 8
              }}
              aria-label="Choisir le rôle"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </label>
        </div>
        {error && (
          <div
            style={{
              color: "#b71c1c",
              background: "#ffcdd2",
              borderRadius: 6,
              padding: 8,
              marginBottom: 12
            }}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.9em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: "pointer",
            marginTop: 8,
            letterSpacing: 1,
            boxShadow: "0 1px 4px #1976d211",
            transition: "opacity 0.2s"
          }}
          aria-label="Se connecter"
        >
          Se connecter
        </button>
      </form>
      {/* Liens de navigation rapide */}
      <nav style={{ marginTop: 32, textAlign: "center" }} aria-label="Navigation principale">
        <Link to="/" style={{ margin: 8 }}>Accueil</Link>
        <Link to="/dashboard" style={{ margin: 8 }}>Dashboard</Link>
        <Link to="/profile" style={{ margin: 8 }}>Profil</Link>
        <Link to="/accessibilite" style={{ margin: 8 }}>Accessibilité</Link>
        <Link to="/challenges" style={{ margin: 8 }}>Challenges</Link>
        <Link to="/friends" style={{ margin: 8 }}>Amis</Link>
        <Link to="/leaderboard" style={{ margin: 8 }}>Classement</Link>
        <Link to="/creator-tools" style={{ margin: 8 }}>Creator Tools</Link>
        <Link to="/admin" style={{ margin: 8 }}>Admin</Link>
      </nav>
    </main>
  );
}