import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import Adminroom from '../AdminArea/AdminArea';
import Moderation from '../Moderation/Moderation';
import Chat from '../Chat/Chat';
import Sfu from '../Sfu/Sfu';

/**
 * Composant Chatroom moderne et optimisé.
 * - Gestion dynamique des membres
 * - Détection admin
 * - Nettoyage socket
 * - Prêt pour évolutions (notifications, présence, etc.)
 * - Accessibilité et UX améliorées
 */
function Chatroom(props) {
  const { auth } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);
  const { id } = useParams();

  // Détection moderne de l'admin
  const isAdmin = Array.isArray(auth?.rooms) && auth.rooms.includes(id);

  // Gestion temps réel de la présence et des membres
  useEffect(() => {
    if (!props.socket || !id || !auth) return;

    const user = {
      room_id: id,
      user: auth,
    };

    props.socket.emit('join_room', user);

    const handleListMembers = (usersList) => {
      setUsersList(usersList.users || []);
    };

    props.socket.on('list_members', handleListMembers);

    // Nettoyage à la sortie de la room
    return () => {
      props.socket.emit('leave_room', user);
      props.socket.off('list_members', handleListMembers);
    };
  }, [props.socket, id, auth]);

  // Optionnel : notifications ou présence
  // useEffect(() => {
  //   props.socket.on('user_joined', ...);
  //   props.socket.on('user_left', ...);
  //   return () => {
  //     props.socket.off('user_joined');
  //     props.socket.off('user_left');
  //   };
  // }, [props.socket]);

  return (
    <div
      className="room-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f8fafc'
      }}
      aria-label="Salle de discussion"
      tabIndex={0}
    >
      <Adminroom />
      <Sfu isAdmin={isAdmin} roomName={id} user={auth} />
      <div
        className="moderation-chat-area"
        style={{
          display: 'flex',
          flex: 1,
          gap: 24,
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%'
        }}
      >
        <Moderation members={usersList} />
        <Chat room={id} socket={props.socket} />
      </div>
    </div>
  );
}

export default Chatroom;
