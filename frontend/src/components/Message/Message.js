import React from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../context/AuthProvider';

/**
 * Message – Achiri
 * Affichage des messages du salon : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Scroll auto, avatars, indication "vous", focus visible, aria, dark mode, mobile first.
 * - Prêt pour extensions futures (badges, réactions, signalement, etc).
 *
 * Props :
 *   - messagesList: [{nickname, avatar, message, time}]
 */

function Message({ messagesList }) {
  const { auth } = React.useContext(AuthContext);
  const chatMsgs = React.useRef();

  // Scroll automatique vers le bas à chaque nouveau message
  React.useEffect(() => {
    if (chatMsgs.current) {
      chatMsgs.current.scrollTop = chatMsgs.current.scrollHeight;
    }
  }, [messagesList]);

  return (
    <div
      ref={chatMsgs}
      className="chat-messages"
      id="chat-messages"
      aria-live="polite"
      aria-label="Messages du salon"
      tabIndex={0}
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1em 0.5em',
        background: '#f8fafc',
        borderRadius: 10,
        minHeight: 0,
        outline: 'none',
        transition: 'background 0.2s, color 0.2s'
      }}
    >
      {messagesList.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#888",
            fontStyle: "italic",
            marginTop: 30,
            fontSize: 16
          }}
          aria-live="polite"
        >
          Aucun message pour l’instant. Soyez le premier à écrire !
        </div>
      )}
      {messagesList.map((msg, idx) => {
        const isSelf = msg.nickname === auth.nickname;
        return (
          <div
            key={msg.time + msg.nickname + idx}
            className={isSelf ? "chat-message-right" : "chat-message-left"}
            style={{
              display: 'flex',
              flexDirection: isSelf ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              marginBottom: 12,
              gap: 10,
              outline: 'none'
            }}
            aria-current={isSelf ? "true" : undefined}
            tabIndex={0}
          >
            <img
              src={msg.avatar || "https://bootdey.com/img/Content/avatar/avatar3.png"}
              className="message-avatar"
              alt={msg.nickname ? `Avatar de ${msg.nickname}` : "Utilisateur"}
              width="40"
              height="40"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 1px 4px #0001',
                border: isSelf ? "2px solid #1976d2" : "1px solid #e3e3e3"
              }}
            />
            <div className="message-data" style={{ maxWidth: '75%' }}>
              <div className="message-header" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  className="message-nickname"
                  style={{
                    fontWeight: 'bold',
                    color: isSelf ? '#1976d2' : '#222',
                    fontSize: 15,
                  }}
                >
                  {msg.nickname}
                  {isSelf && <span style={{ fontSize: 12, color: "#43a047", marginLeft: 6 }}>(Vous)</span>}
                </span>
                <span
                  className="message-time"
                  style={{
                    fontSize: 12,
                    color: '#888',
                  }}
                  aria-label={`Envoyé à ${msg.time}`}
                >
                  {msg.time}
                </span>
              </div>
              <div
                className="message-content"
                style={{
                  background: isSelf ? '#e3f2fd' : '#fff',
                  borderRadius: 8,
                  padding: '0.6em 1em',
                  marginTop: 2,
                  fontSize: 15,
                  wordBreak: 'break-word',
                  boxShadow: isSelf ? '0 1px 4px #1976d222' : '0 1px 4px #0001',
                  color: "#222"
                }}
                aria-label={`Message de ${msg.nickname}`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        );
      })}
      <style>{`
        .chat-messages:focus {
          outline: 2px solid #ffd600;
        }
        .chat-message-right:focus,
        .chat-message-left:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .chat-messages {
            padding: 0.5em 0.2em !important;
            border-radius: 7px !important;
            font-size: 0.97em;
          }
          .message-data {
            max-width: 95vw !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .chat-messages {
            background: #181f2a !important;
            color: #e3f2fd !important;
          }
          .message-content {
            background: #223366 !important;
            color: #e3f2fd !important;
          }
        }
      `}</style>
    </div>
  );
}

Message.propTypes = {
  messagesList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      avatar: PropTypes.string,
      message: PropTypes.string,
      time: PropTypes.string,
    })
  ).isRequired,
};

export default Message;

/**
 * Documentation :
 * - Message : affichage messages, avatars, indication "vous", scroll auto, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */