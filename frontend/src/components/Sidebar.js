import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar/Menu principal : navigation, accès rapide aux modules, affichage dynamique selon le rôle.
 * Props :
 *   currentUser: { name, avatar, role }
 *   onNavigate: function(route)
 *   routes: [{ key, label, icon, visibleFor: ['user','admin','owner'] }]
 *   notifications: { [routeKey]: number }
 */
function Sidebar({
  currentUser = {},
  onNavigate,
  routes = [
    { key: 'home', label: 'Accueil', icon: '🏠', visibleFor: ['user', 'admin', 'owner'] },
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
    { key: 'profile', label: 'Profil', icon: '👤', visibleFor: ['user', 'admin', 'owner'] },
  ],
  notifications = {},
}) {
  const role = currentUser.role || 'user';

  // Mappe les clés de route vers les vrais chemins
  const routePaths = {
    home: '/',
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
    profile: '/profile',
  };

  return (
    <nav
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
      }}
      aria-label="Menu principal"
      data-testid="main-navigation"
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
      <div style={{ padding: 24, borderTop: '1px solid #1565c0', fontSize: 13, color: '#bbdefb' }}>
        <span>© {new Date().getFullYear()} Achiri</span>
      </div>
    </nav>
  );
}

export default Sidebar;