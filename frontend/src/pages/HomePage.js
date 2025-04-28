import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Page d'accueil moderne, UX simple, SEO friendly.
 * Permet de choisir un pseudo et une room, puis d'entrer dans la room.
 * Navigation rapide vers toutes les pages principales.
 */
function HomePage({ onJoin }) {
  const [roomId, setRoomId] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomId.trim() || !user.trim()) {
      setError('Veuillez saisir un nom de room et un pseudo.');
      return;
    }
    setError('');
    if (onJoin) {
      onJoin({ roomId: roomId.trim(), user: user.trim() });
    } else {
      // Redirige vers la page Room si onJoin n'est pas fourni
      navigate(`/rooms?roomId=${encodeURIComponent(roomId.trim())}&user=${encodeURIComponent(user.trim())}`);
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '3rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px #1976d233',
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Accueil Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>Accueil | Achiri Video Chat</title>
        <meta
          name="description"
          content="Rejoignez ou créez une salle de visioconférence instantanément."
        />
      </Helmet>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1976d2', fontWeight: 700, fontSize: '2rem' }}>
        Bienvenue sur Achiri Video Chat
      </h2>
      <form onSubmit={handleJoin} autoComplete="off" aria-label="Formulaire de connexion à une room">
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#333', display: 'block' }}>
            Nom de la room
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="ex: ma-super-room"
              style={{
                width: '100%',
                padding: '0.7em',
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #bdbdbd',
                fontSize: '1em',
                marginBottom: 8,
              }}
              maxLength={32}
              aria-label="Nom de la room"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#333', display: 'block' }}>
            Votre pseudo
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="ex: alice"
              style={{
                width: '100%',
                padding: '0.7em',
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #bdbdbd',
                fontSize: '1em',
                marginBottom: 8,
              }}
              maxLength={20}
              aria-label="Votre pseudo"
              required
              autoComplete="username"
            />
          </label>
        </div>
        {error && (
          <div
            style={{
              color: '#b71c1c',
              background: '#ffcdd2',
              borderRadius: 6,
              padding: 8,
              marginBottom: 12,
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
            width: '100%',
            background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.9em',
            fontWeight: 'bold',
            fontSize: '1.1em',
            cursor: roomId.trim() && user.trim() ? 'pointer' : 'not-allowed',
            marginTop: 8,
            letterSpacing: 1,
            boxShadow: '0 1px 4px #1976d211',
            transition: 'opacity 0.2s',
            opacity: roomId.trim() && user.trim() ? 1 : 0.7,
          }}
          disabled={!roomId.trim() || !user.trim()}
          aria-disabled={!roomId.trim() || !user.trim()}
          aria-label="Rejoindre la room"
        >
          Rejoindre la room
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 32, color: '#888', fontSize: '0.98em' }}>
        <span>
          Simple, rapide, sécurisé.
          <br />
          Aucune inscription requise.
        </span>
      </div>
      <nav style={{ marginTop: 40, textAlign: 'center' }} aria-label="Navigation principale">
        <Link to="/profile" style={{ margin: 8 }}>Mon Profil</Link>
        <Link to="/dashboard" style={{ margin: 8 }}>Dashboard</Link>
        <Link to="/wallet" style={{ margin: 8 }}>Wallet</Link>
        <Link to="/virtual-classroom" style={{ margin: 8 }}>Classes Virtuelles</Link>
        <Link to="/music" style={{ margin: 8 }}>Musique</Link>
        <Link to="/notifications" style={{ margin: 8 }}>Notifications</Link>
        <Link to="/challenges" style={{ margin: 8 }}>Challenges</Link>
        <Link to="/accessibilite" style={{ margin: 8 }}>Accessibilité</Link>
        <Link to="/domotique" style={{ margin: 8 }}>Domotique</Link>
        <Link to="/sante" style={{ margin: 8 }}>Santé</Link>
        <Link to="/urgence" style={{ margin: 8 }}>Urgence</Link>
        <Link to="/influenceur" style={{ margin: 8 }}>Influenceur</Link>
        <Link to="/quiz" style={{ margin: 8 }}>Quiz</Link>
        <Link to="/creator-tools" style={{ margin: 8 }}>Creator Tools</Link>
        <Link to="/reseaux-sociaux" style={{ margin: 8 }}>Réseaux Sociaux</Link>
        <Link to="/social-interactions" style={{ margin: 8 }}>Interactions Sociales</Link>
        <Link to="/leaderboard" style={{ margin: 8 }}>Classement</Link>
        <Link to="/friends" style={{ margin: 8 }}>Amis</Link>
        <Link to="/admin" style={{ margin: 8 }}>Admin</Link>
        {/* Ajoute ici d'autres liens si besoin */}
      </nav>
    </div>
  );
}

export default HomePage;