import React from 'react';
import AuthContext from '../../context/AuthProvider'


function Message(props) {

    const { auth } = React.useContext(AuthContext)
    const chatMsgs = React.useRef()

    React.useEffect(() => {
        chatMsgs.current.scrollTop = chatMsgs.current.scrollHeight;
    }, [props.messagesList])

    return (
        <div ref={chatMsgs} className="chat-messages" id="chat-messages">
            {props.messagesList.map((msg) => {
                return (
                    <div key={msg.message} className={msg.nickname == auth.nickname ? "chat-message-right" : "chat-message-left"}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="message-avatar" alt="Sharon Lessman" width="40" height="40" />
                        <div className="message-data">
                            <div className="message-header">
                            </div>
                            <div className="message-body">
                                <span className="message-nickname">{msg.nickname}</span>
                                <span className="message-time">{msg.time}</span>
                                <span className="message-content">
                                    {msg.message}
                                </span>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Message;