import React from 'react';
import { IoVolumeMuteSharp, IoVideocamOffSharp } from 'react-icons/io5';
import { ImEject } from 'react-icons/im';
import AuthContext from '../../context/AuthProvider';

function Member({ member, onMute, onVideoOff, onEject }) {
  const { auth } = React.useContext(AuthContext);
  const isSelf = auth?.id === member.id;
  const isAdmin = !!auth?.isAdmin;

  return (
    <li
      className="moderation-member"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.7em 0.5em',
        borderBottom: '1px solid #f0f0f0',
        background: isSelf ? '#f5faff' : 'transparent'
      }}
      aria-current={isSelf ? "true" : undefined}
      tabIndex={0}
    >
      <div className="moderation-avatar-name-member" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <img
          src={member.avatar || "https://bootdey.com/img/Content/avatar/avatar4.png"}
          className="rounded-circle avatar-img"
          alt={member.nickname || "Membre"}
          width="40"
          height="40"
          style={{ marginRight: 12, objectFit: 'cover' }}
        />
        <div className="moderation-status">
          <span
            className="moderation-status-name"
            style={{
              fontWeight: 'bold',
              color: isSelf ? '#1976d2' : '#222'
            }}
          >
            {member.nickname || "Inconnu"}
            {isSelf && <span style={{ fontSize: 12, color: "#43a047", marginLeft: 6 }}>(Vous)</span>}
          </span>
          <span
            className="moderation-status-status"
            style={{ fontSize: 13, color: "#43a047", marginLeft: 8 }}
            aria-label="Statut en ligne"
          >
            ● En ligne
          </span>
        </div>
      </div>
      {/* Contrôles admin, pas pour soi-même */}
      {isAdmin && !isSelf && (
        <div className="moderation-controls" style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="moderation-icon-control icon-mute"
            title="Couper le son"
            aria-label="Couper le son"
            tabIndex={0}
            onClick={() => onMute && onMute(member)}
            style={{ cursor: 'pointer', color: '#b71c1c', background: 'none', border: 'none' }}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && onMute && onMute(member)}
          >
            <IoVolumeMuteSharp />
          </button>
          <button
            type="button"
            className="moderation-icon-control icon-video"
            title="Couper la vidéo"
            aria-label="Couper la vidéo"
            tabIndex={0}
            onClick={() => onVideoOff && onVideoOff(member)}
            style={{ cursor: 'pointer', color: '#1976d2', background: 'none', border: 'none' }}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && onVideoOff && onVideoOff(member)}
          >
            <IoVideocamOffSharp />
          </button>
          <button
            type="button"
            className="moderation-icon-control icon-eject"
            title="Éjecter"
            aria-label="Éjecter"
            tabIndex={0}
            onClick={() => onEject && onEject(member)}
            style={{ cursor: 'pointer', color: '#ff9800', background: 'none', border: 'none' }}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && onEject && onEject(member)}
          >
            <ImEject />
          </button>
        </div>
      )}
    </li>
  );
}

export default Member;