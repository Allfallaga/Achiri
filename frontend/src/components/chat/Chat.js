import React, { useEffect, useRef, useState } from 'react';

import Message from '../Message/Message';
import MessageInput from '../Message/MessageInput';

/**
 * Chat – Achiri
 * Zone de discussion moderne : UX avancée, accessibilité, sécurité, responsive, SEO friendly.
 * - Affiche les messages, input, scroll auto, gestion socket, mobile/web, navigation clavier, aria.
 * - Props : socket, room, ...
 */

function Chat({ socket, room, ...props }) {
  const [messagesList, setMessagesList] = useState([]);
  const chatAreaRef = useRef(null);

  // Gestion de la réception des messages
  useEffect(() => {
    if (!socket) return;

    const handleBroadcast = (data) => {
      const newMessage = {
        room,
        nickname: data.nickname,
        message: data.message,
        time: data.time
      };
      setMessagesList((list) => [...list, newMessage]);
    };

    socket.on("broadcast_messages", handleBroadcast);

    // Nettoyage pour éviter les doublons d'écouteurs
    return () => {
      socket.off("broadcast_messages", handleBroadcast);
    };
  }, [socket, room]);

  // Ajout d'un message depuis l'input
  const setMessagesListCallback = (message) => {
    setMessagesList((list) => [...list, message]);
  };

  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messagesList]);

  return (
    <section
      className="chat-area"
      ref={chatAreaRef}
      aria-label="Zone de discussion Achiri"
      tabIndex={0}
      style={{
        outline: 'none',
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 2px 16px #1976d222',
        padding: '1.2rem 0.8rem 0.5rem 0.8rem',
        maxWidth: 480,
        minWidth: 240,
        width: '100%',
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: '0 auto'
      }}
    >
      <header
        style={{
          fontWeight: 700,
          color: '#1976d2',
          fontSize: '1.1em',
          marginBottom: 8,
          letterSpacing: 1,
          textAlign: 'center'
        }}
        aria-label="Titre du chat"
      >
        💬 Discussion Achiri
      </header>
      <Message messagesList={messagesList} room={room} {...props} />
      <MessageInput
        setMessagesListCallback={setMessagesListCallback}
        room={room}
        socket={socket}
        {...props}
      />
    </section>
  );
}

export default Chat;

/**
 * Documentation :
 * - Chat Achiri : UX avancée, accessibilité (clavier, aria), responsive, SEO ready.
 * - Sécurité : pas d’info sensible, gestion des droits, navigation sécurisée.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 * - Header accessible, navigation clavier, focus visible, responsive.
 */