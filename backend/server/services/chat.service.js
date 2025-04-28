function joinToRoom(io, connectedUsers, socket, room, user) {
    if (!connectedUsers.has(room)) {
        connectedUsers.set(room, []);
    }
    const usersInRoom = connectedUsers.get(room);
    const exists = usersInRoom.some(u => u.id === user.id);
    if (!exists) {
        usersInRoom.push(user);
    }
    updateUsersList(connectedUsers, io, room);
}

function leaveRoom(io, connectedUsers, socket, room, user) {
    let userList = connectedUsers.get(room);
    if (userList && userList.length > 0) {
        userList = userList.filter(u => u.id !== user.id);
        if (userList.length === 0) {
            connectedUsers.delete(room);
        } else {
            connectedUsers.set(room, userList);
            updateUsersList(connectedUsers, io, room);
        }
    } else {
        connectedUsers.delete(room);
    }
}

function updateUsersList(connectedUsers, io, room) {
    io.in(room).emit('list_members', {
        room,
        users: connectedUsers.get(room) || []
    });
}

module.exports = {
    joinToRoom,
    leaveRoom
};