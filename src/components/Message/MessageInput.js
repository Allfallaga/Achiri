import React from 'react';
import AuthContext from '../../context/AuthProvider'
import {IoSendSharp} from 'react-icons/io5'

function MessageInput(props) {

    const { auth } = React.useContext(AuthContext)
    const msgElement = React.useRef()

    const send = async () => {
        let time = new Date()
        if (msgElement.current.value !== "") {
            const messageData = {
                room: props.room,
                nickname: auth.nickname,
                message: msgElement.current.value,
                time: time.getHours() + ":" + time.getMinutes()
            }
            await props.socket.emit("send_message", messageData)
            props.setMessagesListCallback(messageData)
        }
        props.socket.emit("get_connected", props.room)
    }

    return (
        <div className="chat-input">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Type your message" ref={msgElement}/>
                <button onClick={send} className="btn btn-primary send-chat-message-btn"><IoSendSharp/></button>
            </div>
        </div>
    );
}

export default MessageInput;