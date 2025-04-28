import React, { useRef, useContext, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import { IoSendSharp } from 'react-icons/io5';

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
    <form className="chat-input" onSubmit={send} autoComplete="off" role="search">
      <div className="input-group">
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
        />
        <button
          onClick={send}
          className="btn btn-primary send-chat-message-btn"
          type="submit"
          disabled={sending}
          aria-label="Envoyer le message"
          tabIndex={0}
        >
          <IoSendSharp />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;