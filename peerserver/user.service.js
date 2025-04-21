exports.join = (connectedUsers, socketID) => {
    if (!connectedUsers[socketID]) {
        connectedUsers[socketID] = socketID
    }
    return connectedUsers
}

exports.leave = (connectedUsers, socketID) => {
    if (connectedUsers[socketID]) delete connectedUsers[socketID]
}

const updateUsersList = (connectedUsers) => {
    io.in(room).emit('list_members', {
        users: connectedUsers
    });
}

const isIdenticalUser = (user_sock, current_user) => {
    if (user_sock === current_user) return true
    return false
}