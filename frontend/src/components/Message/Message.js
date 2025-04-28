import React from 'react';
import AuthContext from '../../context/AuthProvider';

/**
 * Composant Message moderne et optimisé.
 * - Scroll automatique vers le bas
 * - Comparaison stricte pour la sécurité
 * - Prêt pour évolutions (avatars dynamiques, notifications, etc.)
 * - Accessibilité et design modernisés
 */
function Message(props) {
  const { auth } = React.useContext(AuthContext);
  const chatMsgs = React.useRef();

  React.useEffect(() => {
    if (chatMsgs.current) {
      chatMsgs.current.scrollTop = chatMsgs.current.scrollHeight;
    }
  }, [props.messagesList]);

  return (
    <div
      ref={chatMsgs}
      className="chat-messages"
      id="chat-messages"
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0.5em 0.2em',
        marginBottom: 8,
        minHeight: 0,
        background: "#f8fafc",
        borderRadius: 8
      }}
      aria-live="polite"
      aria-label="Liste des messages"
      tabIndex={0}
    >
      {props.messagesList.map((msg, idx) => {
        const isMine = msg.nickname === auth.nickname;
        return (
          <div
            key={msg.time + msg.nickname + idx}
            className={isMine ? 'chat-message-right' : 'chat-message-left'}
            style={{
              display: 'flex',
              flexDirection: isMine ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              marginBottom: 10,
              gap: 10
            }}
            aria-label={`Message de ${msg.nickname} à ${msg.time}`}
          >
            <img
              src={msg.avatar || (isMine
                ? auth.avatar || "https://bootdey.com/img/Content/avatar/avatar3.png"
                : "https://bootdey.com/img/Content/avatar/avatar3.png")}
              className="message-avatar"
              alt={`Avatar de ${msg.nickname}`}
              width="40"
              height="40"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: isMine ? '2px solid #1976d2' : '2px solid #43a047'
              }}
            />
            <div className="message-data" style={{ maxWidth: '80%' }}>
              <div className="message-body" style={{
                background: isMine ? '#e3f2fd' : '#eafaf1',
                borderRadius: 10,
                padding: '0.7em 1em',
                boxShadow: '0 1px 4px #0001',
                color: '#222',
                wordBreak: 'break-word'
              }}>
                <span
                  className="message-nickname"
                  style={{
                    fontWeight: 600,
                    color: isMine ? "#1976d2" : "#43a047",
                    marginRight: 8,
                    fontSize: "1em"
                  }}
                >
                  {msg.nickname}
                </span>
                <span
                  className="message-time"
                  style={{
                    color: "#888",
                    fontSize: "0.95em",
                    marginRight: 8
                  }}
                >
                  {msg.time}
                </span>
                <span
                  className="message-content"
                  style={{
                    display: "block",
                    marginTop: 2,
                    fontSize: "1.08em"
                  }}
                >
                  {msg.message}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Message;