import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar – Achiri
 * Menu principal latéral : navigation avancée, accès rapide aux modules, affichage dynamique selon le rôle.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : navigation, notifications, avatar, focus, couleurs, dark mode ready, responsive.
 * - Prêt pour extensions futures (badges, analytics, favoris, overlay, IA, etc).
 *
 * Props :
 *   - currentUser: { name, avatar, role }
 *   - onNavigate: function(route)
 *   - routes: [{ key, label, icon, visibleFor: ['user','admin','owner'] }]
 *   - notifications: { [routeKey]: number }
 */

function Sidebar({
  currentUser = {},
  onNavigate,
  routes = [
    { key: 'home', label: 'Accueil', icon: '🏠', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'profile', label: 'Profil', icon: '👤', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'dashboard', label: 'Dashboard', icon: '📊', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'accessibilite', label: 'Accessibilité', icon: '♿', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'domotique', label: 'Domotique', icon: '🏡', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'sante', label: 'Santé', icon: '🩺', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'urgence', label: 'Urgence', icon: '🚨', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'influenceur', label: 'Influenceur', icon: '📢', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'quiz', label: 'Quiz', icon: '❓', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'creator-tools', label: 'Creator Tools', icon: '🛠️', visibleFor: ['admin', 'owner'] },
    { key: 'parametres', label: 'Paramètres', icon: '⚙️', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'reseaux-sociaux', label: 'Réseaux Sociaux', icon: '🌐', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'social-interactions', label: 'Interactions Sociales', icon: '💬', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'classes-virtuelles', label: 'Classes Virtuelles', icon: '🏫', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'wallet', label: 'Wallet', icon: '💰', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'video-room', label: 'Video Room (démo)', icon: '🎥', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'leaderboard', label: 'Classement', icon: '🏆', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'friends', label: 'Amis', icon: '👥', visibleFor: ['user', 'admin', 'owner'] },
    { key: 'admin', label: 'Admin', icon: '🛡️', visibleFor: ['admin', 'owner'] },
  ],
  notifications = {},
}) {
  const role = currentUser.role || 'user';

  // Mappe les clés de route vers les vrais chemins
  const routePaths = {
    home: '/',
    profile: '/profile',
    dashboard: '/dashboard',
    accessibilite: '/accessibilite',
    domotique: '/domotique',
    sante: '/sante',
    urgence: '/urgence',
    influenceur: '/influenceur',
    quiz: '/quiz',
    'creator-tools': '/creator-tools',
    parametres: '/parametres',
    'reseaux-sociaux': '/reseaux-sociaux',
    'social-interactions': '/social-interactions',
    'classes-virtuelles': '/classes-virtuelles',
    wallet: '/wallet',
    'video-room': '/room/demo-classroom',
    leaderboard: '/leaderboard',
    friends: '/friends',
    admin: '/admin',
  };

  return (
    <nav
      className="sidebar-achiri"
      style={{
        width: 220,
        background: '#1976d2',
        color: '#fff',
        minHeight: '100vh',
        padding: '24px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 12px #1976d233',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        outline: 'none'
      }}
      aria-label="Menu principal"
      data-testid="main-navigation"
      tabIndex={0}
    >
      {/* Bloc utilisateur cliquable */}
      <NavLink
        to="/profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px 24px 24px',
          borderBottom: '1px solid #1565c0',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer'
        }}
        aria-label="Voir le profil"
        tabIndex={0}
      >
        <span style={{ fontSize: 32, marginRight: 12 }}>{currentUser.avatar || '👤'}</span>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 17 }}>{currentUser.name || 'Utilisateur'}</div>
          <div style={{ fontSize: 13, color: '#bbdefb' }}>
            {role === 'owner' && '👑 Owner'}
            {role === 'admin' && '🛡️ Admin'}
            {role === 'user' && 'Utilisateur'}
          </div>
        </div>
      </NavLink>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
        {routes
          .filter(r => r.visibleFor.includes(role))
          .map(r => (
            <li key={r.key}>
              <NavLink
                to={routePaths[r.key] || '/'}
                style={({ isActive }) => ({
                  width: '100%',
                  background: isActive ? '#1565c0' : 'none',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  padding: '14px 28px',
                  fontSize: 17,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  fontWeight: isActive ? 'bold' : 'normal',
                  outline: isActive ? '2px solid #fff' : 'none'
                })}
                aria-label={r.label}
                onClick={() => onNavigate && onNavigate(r.key)}
                tabIndex={0}
              >
                <span style={{ fontSize: 22, marginRight: 14 }}>{r.icon}</span>
                {r.label}
                {notifications[r.key] > 0 && (
                  <span style={{
                    background: '#ffb300',
                    color: '#222',
                    borderRadius: 12,
                    padding: '2px 8px',
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                    {notifications[r.key]}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
      </ul>
      <div style={{ padding: 24, borderTop: '1px solid #1565c0', fontSize: 13, color: '#bbdefb', textAlign: "center" }}>
        <span>© {new Date().getFullYear()} Achiri</span>
      </div>
      {/* Responsive & dark mode */}
      <style>{`
        @media (max-width: 900px) {
          .sidebar-achiri {
            position: static !important;
            width: 100vw !important;
            min-height: auto !important;
            flex-direction: row !important;
            overflow-x: auto;
            padding: 0;
            box-shadow: none;
            border-radius: 0 0 16px 16px;
          }
          .sidebar-achiri ul {
            display: flex !important;
            flex-direction: row !important;
            gap: 0.2em;
            overflow-x: auto;
            width: 100vw;
            padding: 0 0.5em;
          }
          .sidebar-achiri li {
            flex: 1 0 auto;
          }
        }
        @media (prefers-color-scheme: dark) {
          .sidebar-achiri {
            background: #181f2a !important;
            color: #e3f2fd !important;
            box-shadow: 2px 0 12px #222a;
          }
          .sidebar-achiri a, .sidebar-achiri span {
            color: #e3f2fd !important;
          }
          .sidebar-achiri .active {
            background: #223366 !important;
            color: #ffd600 !important;
          }
        }
        .sidebar-achiri:focus-visible {
          outline: 2px solid #ffd600 !important;
          outline-offset: 2px;
        }
      `}</style>
    </nav>
  );
}

export default Sidebar;

/**
 * Documentation :
 * - Sidebar : navigation avancée, notifications, avatar, focus, couleurs, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */