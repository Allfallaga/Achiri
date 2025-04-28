import React from 'react';

/**
 * Affiche la liste des utilisateurs connectés à la room, avec rôles, mute, main levée, badges, points, wallet, actions owner, statut, animation.
 * Props :
 *   users: [userId] ou [{ name, avatar, color, wallet, status, ... }]
 *   roles: { userId: 'owner' | 'user' | 'admin' }
 *   muted: [userId]
 *   hands: [userId]
 *   badges: { userId: [badge] }
 *   points: { userId: number }
 *   currentUser: string (nom ou id de l'utilisateur courant)
 *   isOwner: bool (si l'utilisateur courant est owner)
 *   onMute: function(userId)
 *   onKick: function(userId)
 *   onPromote: function(userId)
 *   renderBadges: function(userId)
 *   renderPoints: function(userId)
 */
function UserList({
  users = [],
  roles = {},
  muted = [],
  hands = [],
  badges = {},
  points = {},
  currentUser,
  isOwner = false,
  onMute,
  onKick,
  onPromote,
  renderBadges,
  renderPoints,
}) {
  if (!users.length) {
    return (
      <div
        style={{ opacity: 0.7, fontStyle: 'italic', textAlign: 'center', margin: '2em 0' }}
        aria-live="polite"
        aria-atomic="true"
      >
        Aucun utilisateur connecté
      </div>
    );
  }

  // Supporte users = [string] ou users = [{ name, ... }]
  const getName = (u) => (typeof u === 'string' ? u : u.name);
  const getAvatar = (u) => (typeof u === 'string' ? '👤' : u.avatar || '👤');
  const getColor = (u) => (typeof u === 'string' ? '#1976d2' : u.color || '#1976d2');
  const getId = (u) => (typeof u === 'string' ? u : u.name);
  const getWallet = (u) => (typeof u === 'string' ? '' : u.wallet || '');
  const getStatus = (u) => (typeof u === 'string' ? 'online' : u.status || 'online');

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {users.map((u, idx) => {
        const id = getId(u);
        const isCurrent = id === currentUser;
        const isMuted = muted?.includes(id);
        const isHand = hands?.includes(id);
        const role = roles?.[id] || 'user';
        const userBadges = badges?.[id] || [];
        const userPoints = points?.[id];
        const wallet = getWallet(u);
        const status = getStatus(u);

        return (
          <li
            key={id + idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 8,
              background: isCurrent ? '#e3f2fd' : 'transparent',
              borderRadius: 6,
              padding: '4px 8px',
              opacity: isMuted ? 0.6 : 1,
              border: role === 'owner' ? '1.5px solid #1976d2' : undefined,
              position: 'relative',
              boxShadow: isHand ? '0 0 8px 2px #ffb30055' : undefined,
              transition: 'box-shadow 0.3s',
            }}
            aria-current={isCurrent ? 'true' : undefined}
            tabIndex={0}
          >
            {/* Statut en ligne */}
            <span
              title={status === 'online' ? 'En ligne' : 'Absent'}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: status === 'online' ? '#43a047' : '#bdbdbd',
                display: 'inline-block',
                marginRight: 6,
                border: '1.5px solid #fff',
              }}
              aria-label={status === 'online' ? 'En ligne' : 'Absent'}
            />
            <span style={{ fontSize: 22, marginRight: 8 }}>{getAvatar(u)}</span>
            <span style={{ color: getColor(u), fontWeight: isCurrent ? 'bold' : 'normal', marginRight: 6 }}>
              {getName(u)}
              {isCurrent && ' (vous)'}
              {role === 'owner' && (
                <span title="Owner" style={{ marginLeft: 4, fontSize: 15, color: '#1976d2' }}>👑</span>
              )}
              {role === 'admin' && (
                <span title="Admin" style={{ marginLeft: 4, fontSize: 15, color: '#43a047' }}>🛡️</span>
              )}
              {isMuted && (
                <span title="Muet" style={{ marginLeft: 4, fontSize: 15, color: '#b71c1c' }}>🔇</span>
              )}
              {isHand && (
                <span title="Main levée" style={{ marginLeft: 4, fontSize: 15, color: '#ffb300', animation: 'pulse 1s infinite' }}>✋</span>
              )}
              {/* Badges dynamiques */}
              {userBadges.map((b) => (
                <span key={b} style={{ marginLeft: 4, background: '#eee', borderRadius: 4, padding: '0 4px', fontSize: 12 }}>
                  {b}
                </span>
              ))}
              {/* Points dynamiques */}
              {userPoints !== undefined && (
                <span style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600 }}>{userPoints} pts</span>
              )}
              {/* Wallet */}
              {wallet && (
                <span style={{ marginLeft: 8, color: '#888', fontSize: 13 }}>💰 {wallet}</span>
              )}
              {/* Custom badges/points si fournis */}
              {renderBadges && renderBadges(id)}
              {renderPoints && renderPoints(id)}
            </span>
            {/* Actions owner/admin */}
            {(isOwner || role === 'admin') && !isCurrent && (
              <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                <button
                  onClick={() => onMute && onMute(id)}
                  style={{
                    background: isMuted ? '#ffcdd2' : '#e3f2fd',
                    color: '#b71c1c',
                    border: 'none',
                    borderRadius: 4,
                    padding: '2px 7px',
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                  title={isMuted ? 'Démuter' : 'Mute'}
                  aria-label={isMuted ? 'Démuter' : 'Mute'}
                  tabIndex={0}
                >
                  🔇
                </button>
                <button
                  onClick={() => onKick && onKick(id)}
                  style={{
                    background: '#ffe082',
                    color: '#b71c1c',
                    border: 'none',
                    borderRadius: 4,
                    padding: '2px 7px',
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                  title="Kick"
                  aria-label="Kick"
                  tabIndex={0}
                >
                  ❌
                </button>
                {isOwner && (
                  <button
                    onClick={() => onPromote && onPromote(id)}
                    style={{
                      background: '#b2dfdb',
                      color: '#1976d2',
                      border: 'none',
                      borderRadius: 4,
                      padding: '2px 7px',
                      fontSize: 15,
                      cursor: 'pointer',
                    }}
                    title="Promouvoir admin"
                    aria-label="Promouvoir admin"
                    tabIndex={0}
                  >
                    🛡️
                  </button>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;