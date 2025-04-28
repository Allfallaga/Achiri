const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Chargement SSL (assure-toi que les chemins sont corrects)
const sslPath = path.resolve(__dirname, '../ssl');
const privateKey = fs.readFileSync(path.join(sslPath, 'localhost-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(sslPath, 'localhost.pem'), 'utf8');

const ssl = { key: privateKey, cert: certificate };
const app = express();
const https = require('https');
const httpsServer = https.createServer(ssl, app);

const io = require("socket.io")(httpsServer, {
    cors: { origin: "*" },
});

const UserService = require('./services/user.service');
const { joinToRoom, leaveRoom } = require('./services/chat.service');

app.use(cors());

const session = require('express-session');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

const { Login, Register } = require('./controllers/authController');

let Message = require('./models/message');
let Room = require('./models/room');
let User = require('./models/user');
const RoomService = require('./services/room.service');

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'qsdqsdqd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(require('./middlewares/flash'));

// Routes
app.get('/', async (req, res) => {
    try {
        const rows = await Message.all();
        res.render('pages/index', { messages: rows });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

// Rooms Routes
app.get('/api/room', async (req, res) => {
    try {
        const rooms = await Room.all();
        res.json(rooms);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
});

app.get('/api/room/:id', async (req, res) => {
    try {
        const room = await Room.show(req.params.id);
        res.json(room);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
});

app.delete('/api/room/:id', async (req, res) => {
    try {
        const result = await Room._delete(req.params.id);
        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.post('/api/room', async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(HttpStatus.CREATED).json(room);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.put('/api/room/:id', async (req, res) => {
    try {
        const room = await Room.update(req.params.id, req.body);
        res.json(room);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

// Messages Routes
app.post('/api/message', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(HttpStatus.CREATED).json(message);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.put('/api/message/:id', async (req, res) => {
    try {
        const message = await Message.update(req.params.id, req.body);
        res.status(HttpStatus.OK).json(message);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.delete('/api/message/:id', async (req, res) => {
    try {
        const message = await Message._delete(req.params.id);
        res.status(HttpStatus.OK).json(message);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.get('/api/message', async (req, res) => {
    try {
        const messages = await Message.all();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/message/:id', async (req, res) => {
    try {
        const message = await Message.show(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
});

// Users Routes
app.post('/api/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.put('/api/user/:id', async (req, res) => {
    try {
        const user = await User.update(req.params.id, req.body);
        res.status(HttpStatus.OK).json(user);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.delete('/api/user/:id', async (req, res) => {
    try {
        const user = await User._delete(req.params.id);
        res.status(HttpStatus.OK).json(user);
    } catch (error) {
        res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
});

app.get('/api/user', async (req, res) => {
    try {
        const users = await User.all();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.show(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
});

// Auth Routes
app.post('/api/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Wrong credentials" });
    }
    Login(req.body, (error, row) => {
        if (error) {
            console.log(error.message);
            return res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
        }
        let userData = {
            id: row.id,
            nickname: row.nickname,
            avatar: row.avatar,
            email: row.email,
            rooms: []
        };
        RoomService.getRoomAdmin(row.id, (error, rooms) => {
            if (rooms && rooms.length > 0) {
                rooms.forEach(ele => {
                    userData.rooms.push(ele.id);
                });
            }
            res.status(HttpStatus.OK).json(userData);
        });
    });
});

// Custom routes pour le rendu EJS et messages flash
app.get('/', async (req, res) => {
    try {
        const rows = await Message.all();
        res.render('pages/index', { messages: rows });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
});

app.post('/', async (req, res) => {
    if (!req.body.message) {
        req.flash('error', 'No message sent');
        return res.redirect('/');
    }
    try {
        await Message.create({ content: req.body.message, user_id: 1, room_id: 1 }); // Adapter selon logique métier
        req.flash('success', 'Message sent');
        res.redirect('/');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/');
    }
});

// Socket handling
const connectedUsers = new Map();

io.sockets.on('connection', (socket) => {
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("broadcast_messages", data);
    });

    socket.on('join_room', (data) => {
        joinToRoom(io, connectedUsers, socket, data.room_id, data.user);

        socket.data.user = data.user;
        socket.data.room_id = data.room_id;

        socket.join(data.room_id);
        io.in(socket.data.room_id).emit('list_members', {
            room: socket.data.room_id,
            users: connectedUsers.get(socket.data.room_id)
        });

        socket.on('camera', (stream) => {
            socket.to(socket.data.room_id).emit('camera_received', stream);
        });
    });

    socket.on('leave_room', (room_id) => {
        leaveRoom(io, connectedUsers, socket, socket.data.room_id, socket.data.user);
        socket.leave(room_id);
    });

    socket.on('disconnect', () => {
        leaveRoom(io, connectedUsers, socket, socket.data.room_id, socket.data.user);
    });
});

// Lancement du serveur HTTPS
httpsServer.listen(process.env.PORT || 3001, () => {
    console.log(`✅ Serveur HTTPS démarré sur le port ${process.env.PORT || 3001}`);
});