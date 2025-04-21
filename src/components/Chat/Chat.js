import React from 'react';
import Message from '../Message/Message';
import MessageInput from '../Message/MessageInput';

function Chat(props) {

    const [messagesList, setMessagesList] = React.useState([])

    React.useEffect(() => {
        props.socket.on("broadcast_messages", (data) => {
            let newMessage = {
                room: props.room,
                nickname: data.nickname,
                message: data.message,
                time: data.time
            }
            setMessagesList((list) => [...list, newMessage])
        })

    }, [props.socket])

    const setMessagesListCallback = (messages) => {
        setMessagesList((list) => [...list, messages])
    }

    return (
        <div className="chat-area">
            <Message messagesList={messagesList} {...props} />
            <MessageInput setMessagesListCallback={setMessagesListCallback} {...props} />
        </div>
    );
}

export default Chat;