const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const fs = require('fs')
var privateKey  = fs.readFileSync('../ssl/localhost-key.pem', 'utf8');
var certificate = fs.readFileSync('../ssl/localhost.pem', 'utf8');

const ssl = {
    key: privateKey,
    cert: certificate,
  }
const app = express()
const https = require('https')
const httpsServer = https.Server(ssl, app)
// const http = require('http')
// const httpServer = https.Server(app)
const io = require("socket.io")(httpsServer, {
    cors: {
        origin: "*",
    },
})

const UserService = require('./services/user.service')
const { joinToRoom, leaveRoom } = require('./services/chat.service')

app.use(cors())

const session = require('express-session')
const bodyParser = require('body-parser')
const HttpStatus = require('http-status-codes');

const { Login, Register } = require('./controllers/authController')

let router = express.Router()
let Message = require('./models/message')
let Room = require('./models/room')
let User = require('./models/user');
const RoomService = require('./services/room.service');

// Template Engine
app.set('view engine', 'ejs')

// Middlewares
app.use('/assets', express.static('public'))
// Request Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Session Middleware
app.use(session({
    secret: 'qsdqsdqd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))

// Custom Middleware
app.use(require('./middlewares/flash'))


app.use('/peertest', (req, res) => {

})



// Routes
app.get('/', (request, response) => {
    Message.all(function (rows) {
        response.render('pages/index', { messages: rows })
    })
})

// Rooms Routes ---------------------------------------------------------------
app.get('/api/room', (req, res) => {
    Room.all((error, rooms) => {
        if (error) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(rooms));
    })
})

app.get('/api/room/:id', (req, res) => {
    Room.show(req.params.id, (room) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(room));
    })
})

app.delete('/api/room/:id', (req, res) => {
    Room._delete(req.params.id, (error, room) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.OK)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(room));
    })
})

app.post('/api/room', (req, res) => {
    Room.create(req.body, (error, room) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.CREATED)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(room));
    })
})

app.put('/api/room/:id', (req, res) => {
    Room.update(req.params.id, req.body, (error, room) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(room));
    })
})

// Messages Routes ---------------------------------------------------------------
app.post('/api/message', (req, res) => {
    Message.create(req.body, (error, message) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.CREATED)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(message));
    })
})

app.put('/api/message/:id', (req, res) => {
    Message.update(req.params.id, req.body, (error, message) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.OK)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(message));
    })
})

app.delete('/api/message/:id', (req, res) => {
    Message._delete(req.params.id, (error, message) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.OK)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(message));
    })
})

app.get('/api/message', (req, res) => {
    Message.all((messages) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(messages));
    })
})

app.get('/api/message/:id', (req, res) => {
    Message.show(req.params.id, (message) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(message));
    })
})


// Users Routes ---------------------------------------------------------------
app.post('/api/user', (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.CREATED)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    })
})

app.put('/api/user/:id', (req, res) => {
    User.update(req.params.id, req.body, (error, user) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.OK)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    })
})

app.delete('/api/user/:id', (req, res) => {
    User._delete(req.params.id, (error, user) => {
        if (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        res.status(HttpStatus.OK)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    })
})

app.get('/api/user', (req, res) => {
    User.all((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    })
})

app.get('/api/user/:id', (req, res) => {
    User.show(req.params.id, (user) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    })
})

// Auth Routes ---------------------------------------------------------------
app.post('/api/login', (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined) res.status(HttpStatus.UNAUTHORIZED).send({ message: "Wrong credentials" })
    Login(req.body, (error, row) => {
        if (error) {
            console.log(error.message)
            return res.status(HttpStatus.FORBIDDEN).send({ message: error.message });
        }
        console.log('-------------', row)
        let userData = {
            id: row.id,
            nickname: row.nickname,
            avatar: row.avatar,
            email: row.email,
            rooms: []
        }
        RoomService.getRoomAdmin(row.id, (error, row) => {
            console.log('++++++++++++++++', row)
            if (row.length > 0) {
                row.forEach(ele => {
                    userData.rooms = [...userData.rooms, ele.id]
                });
            }
            console.log('==============', userData)
            res.status(HttpStatus.OK)
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(userData))
        })
    })
})

// CUSTOM ROUTES

app.get('/', (request, response) => {
    Message.all(function (rows) {
        response.render('pages/index', { messages: rows })
    })
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', 'No message sent')
        response.redirect('/')
    } else {
        Message.create(request.body.message, function () {
            request.flash('success', 'Message sent')
            response.redirect('/')
        })
    }
})

// Socket handling

const connectedUsers = new Map();

io.sockets.on('connection', (socket) => {

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("broadcast_messages", data)
    })

    socket.on('join_room', (data) => {

        joinToRoom(io, connectedUsers, socket, data.room_id, data.user)

        socket.data.user = data.user
        socket.data.room_id = data.room_id

        socket.join(data.room_id)
        console.log("users in the room :", connectedUsers)
        io.in(socket.data.room_id).emit('list_members', {
            room: socket.data.room_id,
            users: connectedUsers.get(socket.data.room_id)
        });

        socket.on('camera', (stream) => {
            socket.to(socket.data.room_id).emit('camera_received', stream)
        })
    })

    socket.on('leave_room', (room_id) => {
        leaveRoom(io, connectedUsers, socket, socket.data.room_id, socket.data.user)
        socket.leave(room_id)
    })

    socket.on('disconnect', () => {
        leaveRoom(io, connectedUsers, socket, socket.data.room_id, socket.data.user)
        console.log("users left in the room : ", connectedUsers)
    })


})

// Peers Middleware
httpsServer.listen(process.env.PORT || 3001)