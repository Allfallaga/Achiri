import React, { useEffect, useRef, useState } from 'react';
import Message from '../Message/Message';
import MessageInput from '../Message/MessageInput';

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
            aria-label="Zone de discussion"
            tabIndex={0}
            style={{ outline: 'none' }}
        >
            <Message messagesList={messagesList} room={room} {...props} />
            <MessageInput setMessagesListCallback={setMessagesListCallback} room={room} socket={socket} {...props} />
        </section>
    );
}

export default Chat;