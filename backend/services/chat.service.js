exports.joinToRoom = (io ,connectedUsers, socket, room, user) => {
    // create users array, if key not exists
    if (!connectedUsers.has(room)) {
        connectedUsers.set(room, []);
    }
    // add user to room array
    let exists = false
    connectedUsers.get(room).forEach(userInRoom => {
        if (isIdenticalUser(userInRoom, user)) {
            exists = true
        }
    });
    if (!exists) {
        connectedUsers.get(room).push(user);
    }
    // call update function
    updateUsersList(connectedUsers ,io, room);
}

exports.leaveRoom = (io, connectedUsers, socket, room, user) => {
    let userList = connectedUsers.get(room);
    // delete user
    if (userList && userList.length > 0) {
        userList = userList.filter(u => u !== user);
        // update user list
        if (!userList.length) {
            // delete key if no more users in room
            connectedUsers.delete(room);
        } else {
            connectedUsers.set(room, userList);
            // call update function
            updateUsersList(connectedUsers, io, room);
        }
    } else {
        connectedUsers.delete(room)
    }
}

const updateUsersList = (connectedUsers, io, room) => {
    io.in(room).emit('list_members', {
        room: room,
        users: connectedUsers.get(room)
    });
}

const isIdenticalUser = (user_sock, current_user) => {
    if (user_sock.id === current_user.id) return true
    return false
}