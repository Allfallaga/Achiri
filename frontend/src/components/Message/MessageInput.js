import React, { useRef, useContext, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';

import AuthContext from '../../context/AuthProvider';

/**
 * MessageInput – Achiri
 * Saisie et envoi de messages : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Envoi clavier/souris, feedback, désactivation, focus visible, aria, dark mode, mobile first.
 * - Prêt pour extensions futures (emoji, pièces jointes, réactions, etc).
 *
 * Props :
 *   - room: string (id room)
 *   - socket: socket.io instance
 *   - setMessagesListCallback: function(messageData)
 */

function MessageInput(props) {
  const { auth } = useContext(AuthContext);
  const msgElement = useRef();
  const [sending, setSending] = useState(false);

  const send = async (e) => {
    e && e.preventDefault();
    const value = msgElement.current.value.trim();
    if (!value || sending) return;
    setSending(true);
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const messageData = {
      room: props.room,
      nickname: auth.nickname,
      message: value,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
      avatar: auth.avatar
    };
    await props.socket.emit("send_message", messageData);
    props.setMessagesListCallback(messageData);
    msgElement.current.value = "";
    setSending(false);
    props.socket.emit("get_connected", props.room);
  };

  return (
    <form
      className="chat-input"
      onSubmit={send}
      autoComplete="off"
      role="search"
      aria-label="Zone de saisie du message"
      style={{
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px #1976d222",
        padding: "0.5em 0.7em",
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        gap: 8
      }}
    >
      <div className="input-group" style={{ flex: 1, display: "flex", gap: 8 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Écrivez votre message"
          ref={msgElement}
          disabled={sending}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) send(e);
          }}
          aria-label="Écrivez votre message"
          maxLength={500}
          autoComplete="off"
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid #bbdefb",
            padding: "0.6em 1em",
            fontSize: "1em",
            outline: "none",
            transition: "border 0.2s"
          }}
        />
        <button
          onClick={send}
          className="btn btn-primary send-chat-message-btn"
          type="submit"
          disabled={sending}
          aria-label="Envoyer le message"
          tabIndex={0}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.6em 1.2em",
            fontWeight: "bold",
            fontSize: "1.2em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: sending ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          <IoSendSharp />
        </button>
      </div>
      <style>{`
        .chat-input:focus-within {
          outline: 2px solid #ffd600;
        }
        .form-control:focus {
          border-color: #1976d2;
          box-shadow: 0 0 0 2px #1976d233;
        }
        .send-chat-message-btn:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .chat-input {
            padding: 0.3em 0.2em !important;
            border-radius: 7px !important;
          }
          .form-control {
            font-size: 0.97em !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .chat-input {
            background: #181f2a !important;
          }
          .form-control {
            background: #222a !important;
            color: #e3f2fd !important;
            border: 1px solid #223366 !important;
          }
          .send-chat-message-btn {
            background: #223366 !important;
            color: #ffd600 !important;
          }
        }
      `}</style>
    </form>
  );
}

export default MessageInput;

/**
 * Documentation :
 * - MessageInput : saisie/envoi message, feedback, désactivation, focus visible, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */