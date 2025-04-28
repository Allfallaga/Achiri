import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main
      style={{
        maxWidth: 420,
        margin: '6rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d233',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Page non trouvée"
      tabIndex={0}
    >
      <Helmet>
        <title>404 - Page non trouvée | Achiri Video Chat</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 style={{ fontSize: '3rem', color: '#1976d2', margin: 0 }}>404</h1>
      <h2 style={{ color: '#888', marginTop: 8, marginBottom: 16 }}>Page non trouvée</h2>
      <p style={{ fontSize: '1.1em', color: '#444', marginBottom: 32 }}>
        Oups, la page que vous cherchez n’existe pas.<br />
      </p>
      <Link
        to="/"
        style={{
          color: '#fff',
          background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
          padding: '0.7em 1.5em',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1em',
          boxShadow: '0 1px 4px #1976d211',
          transition: 'opacity 0.2s'
        }}
        aria-label="Retour à l’accueil"
      >
        Retour à l’accueil
      </Link>
      {/* Navigation rapide vers les principales pages */}
      <nav style={{ marginTop: 32 }} aria-label="Navigation principale">
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

export default NotFound;