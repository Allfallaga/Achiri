import React from 'react';
import AuthContext from '../../context/AuthProvider';

function Message(props) {
  const { auth } = React.useContext(AuthContext);
  const chatMsgs = React.useRef();

  // Scroll automatique vers le bas à chaque nouveau message
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
      }}
    >
      {props.messagesList.map((msg, idx) => {
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
            }}
            aria-current={isSelf ? "true" : undefined}
          >
            <img
              src={msg.avatar || "https://bootdey.com/img/Content/avatar/avatar3.png"}
              className="message-avatar"
              alt={msg.nickname || "Utilisateur"}
              width="40"
              height="40"
              style={{ borderRadius: '50%', objectFit: 'cover', boxShadow: '0 1px 4px #0001' }}
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
                }}
              >
                {msg.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Message;