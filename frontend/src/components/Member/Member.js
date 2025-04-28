import React from 'react';

/**
 * Composant membre pour la liste de modération.
 * Affiche l'avatar, le pseudo et le statut en temps réel.
 * Accessibilité et design modernisés.
 */
function Member({ member }) {
  return (
    <li
      className="moderation-member"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5em 0',
        borderBottom: '1px solid #f0f0f0',
        minWidth: 0
      }}
      aria-label={`Membre ${member?.nickname || 'inconnu'} en ligne`}
      tabIndex={0}
    >
      <div
        className="moderation-avatar-name-member"
        style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}
      >
        <img
          src={member?.avatar || "https://bootdey.com/img/Content/avatar/avatar4.png"}
          className="rounded-circle avatar-img"
          alt={`Avatar de ${member?.nickname || 'utilisateur'}`}
          width="40"
          height="40"
          style={{ marginRight: 12, objectFit: 'cover', borderRadius: '50%' }}
        />
        <div className="moderation-status" style={{ minWidth: 0 }}>
          <span
            className="moderation-status-name"
            style={{
              fontWeight: 600,
              color: "#222",
              fontSize: "1em",
              marginRight: 8,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-block",
              maxWidth: 120
            }}
          >
            {member?.nickname || "Utilisateur"}
          </span>
          <span
            className="moderation-status-status"
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#43a047",
              marginRight: 6,
              verticalAlign: "middle"
            }}
            aria-label="Statut en ligne"
            title="En ligne"
          ></span>
          <span style={{ color: "#43a047", fontSize: "0.98em" }}>En ligne</span>
        </div>
      </div>
    </li>
  );
}

export default Member;