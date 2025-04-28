import React from 'react';
import Message from '../Message/Message';
import MessageInput from '../Message/MessageInput';

/**
 * Composant Chat moderne et optimisé.
 * - Affichage temps réel des messages
 * - Gestion dynamique des rooms
 * - Prêt pour évolutions (notifications, historique, etc.)
 * - Accessibilité et UX améliorées
 */
function Chat({ socket, room, ...props }) {
  const [messagesList, setMessagesList] = React.useState([]);

  // Écoute des messages entrants
  React.useEffect(() => {
    const handleBroadcast = (data) => {
      setMessagesList((list) => [
        ...list,
        {
          room,
          nickname: data.nickname,
          message: data.message,
          time: data.time,
        },
      ]);
    };

    if (socket) {
      socket.on('broadcast_messages', handleBroadcast);
    }

    // Nettoyage du listener lors du démontage ou changement de room/socket
    return () => {
      if (socket) socket.off('broadcast_messages', handleBroadcast);
    };
  }, [socket, room]);

  // Callback pour ajouter un nouveau message (depuis MessageInput)
  const setMessagesListCallback = (message) => {
    setMessagesList((list) => [...list, message]);
  };

  return (
    <div
      className="chat-area"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#f8fafc',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        padding: '1.2rem 0.7rem 0.7rem 0.7rem',
        maxWidth: 520,
        margin: '0 auto'
      }}
      aria-label="Zone de chat"
      tabIndex={0}
    >
      <Message messagesList={messagesList} room={room} {...props} />
      <MessageInput
        setMessagesListCallback={setMessagesListCallback}
        room={room}
        socket={socket}
        {...props}
      />
    </div>
  );
}

export default Chat;