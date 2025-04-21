import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import Adminroom from '../AdminArea/AdminArea'
import Moderation from '../Moderation/Moderation'
import Chat from '../Chat/Chat'
import Sfu from '../Sfu/Sfu'

function Chatroom(props) {

    const { auth } = React.useContext(AuthContext)
    // const isAdmin = React.useRef(false)
    const [usersList, setUsersList] = React.useState()
    const { id } = useParams()
    let isAdmin = (auth.rooms.filter(r => r == id)).length > 0 ? true : false

    useEffect(() => {

        let user = {
            room_id: id,
            user: auth
        }
        console.log(auth)
        console.log(id)
        props.socket.emit("join_room", user)
        props.socket.on('list_members', (usersList) => {
            setUsersList(usersList.users)
        })
        return function cleanup() {
            props.socket.emit("leave_room", user)
        }
    }, [])


    return (

        <div className="room-container">
            <Adminroom />
            <Sfu isAdmin={isAdmin} roomName={id} user={auth}></Sfu>
            <div className='moderation-chat-area'>
                <Moderation key="" members={usersList} />
                <Chat room={id} socket={props.socket} />
            </div>
        </div>
    )
}

export default Chatroom