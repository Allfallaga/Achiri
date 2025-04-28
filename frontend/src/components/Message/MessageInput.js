import React from 'react';
import AuthContext from '../../context/AuthProvider';
import { IoSendSharp } from 'react-icons/io5';

/**
 * Champ de saisie de message moderne et accessible.
 * - UX améliorée, accessibilité, gestion clavier, feedback visuel.
 */
function MessageInput(props) {
  const { auth } = React.useContext(AuthContext);
  const msgElement = React.useRef();

  const send = async (e) => {
    e.preventDefault();
    const value = msgElement.current.value.trim();
    if (value !== '') {
      const now = new Date();
      const messageData = {
        room: props.room,
        nickname: auth.nickname,
        avatar: auth.avatar,
        message: value,
        time:
          now.getHours().toString().padStart(2, '0') +
          ':' +
          now.getMinutes().toString().padStart(2, '0'),
      };
      await props.socket.emit('send_message', messageData);
      props.setMessagesListCallback(messageData);
      msgElement.current.value = '';
    }
    props.socket.emit('get_connected', props.room);
  };

  return (
    <form className="chat-input" onSubmit={send} style={{ marginTop: 8 }}>
      <div
        className="input-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 1px 4px #0001',
          padding: '0.3em 0.5em'
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Écrivez votre message…"
          ref={msgElement}
          aria-label="Écrivez votre message"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1.08em',
            background: 'transparent',
            padding: '0.6em 0.2em'
          }}
          maxLength={500}
          required
        />
        <button
          type="submit"
          className="btn btn-primary send-chat-message-btn"
          aria-label="Envoyer le message"
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.4em 1em',
            fontSize: '1.2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;