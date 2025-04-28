import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import AdminArea from '../AdminArea/AdminArea';
import Moderation from '../Moderation/Moderation';
import Chat from '../Chat/Chat';
import Sfu from '../Sfu/Sfu';

function Chatroom(props) {
    const { auth } = useContext(AuthContext);
    const [usersList, setUsersList] = useState([]);
    const { id } = useParams();

    // Détermine si l'utilisateur est admin de ce salon
    const isAdmin = Array.isArray(auth.rooms) && auth.rooms.includes(id);

    useEffect(() => {
        if (!props.socket || !auth) return;

        const user = {
            room_id: id,
            user: auth
        };

        props.socket.emit("join_room", user);

        const handleListMembers = (usersList) => {
            setUsersList(usersList.users || []);
        };

        props.socket.on('list_members', handleListMembers);

        return () => {
            props.socket.emit("leave_room", user);
            props.socket.off('list_members', handleListMembers);
        };
    }, [props.socket, id, auth]);

    return (
        <div className="room-container" role="region" aria-label={`Salon ${id}`}>
            {isAdmin && <AdminArea />}
            <Sfu isAdmin={isAdmin} roomName={id} user={auth} />
            <div className="moderation-chat-area">
                <Moderation members={usersList} />
                <Chat room={id} socket={props.socket} />
            </div>
        </div>
    );
}

export default Chatroom;