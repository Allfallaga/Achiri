const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
require('dotenv').config();

const UserService = require('./services/user.service');
const { joinToRoom, leaveRoom } = require('./services/chat.service');
const { Login, Register } = require('./controllers/authController');

let Message = require('./models/message');
let Room = require('./models/room');
let User = require('./models/user');
const RoomService = require('./services/room.service');

// --- Import des nouveaux controllers métiers ---
const walletController = require('./controllers/walletController');
const musicLibraryController = require('./controllers/musicLibraryController');
const notificationsController = require('./controllers/notificationsController');
const settingsController = require('./controllers/settingsController');
const accessibilityController = require('./controllers/accessibilityController');
const virtualClassroomController = require('./controllers/virtualClassroomController');
const challengesController = require('./controllers/challengesController');
const creatorToolsController = require('./controllers/creatorToolsController');
const moderationController = require('./controllers/moderationController');
const leaderboardController = require('./controllers/leaderboardController');

// --- Import des nouveaux modules sociaux ---
const socialNetworkController = require('./controllers/socialNetworkController');
const interactionController = require('./controllers/interactionController');
const pointsController = require('./controllers/pointsController');
const boosterController = require('./controllers/boosterController');

// --- Import des modules IA, santé, domotique, classroom ---
const visionController = require('./controllers/visionController');
const speechController = require('./controllers/speechController');
const healthController = require('./controllers/healthController');
const emergencyController = require('./controllers/emergencyController');
const domoticController = require('./controllers/domoticController');
const classroomController = require('./controllers/classroomController');

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// --- Middlewares globaux ---
app.use(cors());
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'qsdqsdqd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(require('./middlewares/flash'));

// --- ROUTES PRINCIPALES (Rooms, Messages, Users, Auth) ---
app.get('/', (req, res) => {
    Message.all(function (rows) {
        res.render('pages/index', { messages: rows });
    });
});

// --- ROOMS ---
app.route('/api/room')
    .get((req, res) => Room.all((err, rooms) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
        res.json(rooms);
    }))
    .post((req, res) => Room.create(req.body, (err, room) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.status(HttpStatus.CREATED).json(room);
    }));

app.route('/api/room/:id')
    .get((req, res) => Room.show(req.params.id, (room) => res.json(room)))
    .put((req, res) => Room.update(req.params.id, req.body, (err, room) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.json(room);
    }))
    .delete((req, res) => Room._delete(req.params.id, (err, room) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.json(room);
    }));

// --- MESSAGES ---
app.route('/api/message')
    .get((req, res) => Message.all((messages) => res.json(messages)))
    .post((req, res) => Message.create(req.body, (err, message) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.status(HttpStatus.CREATED).json(message);
    }));

app.route('/api/message/:id')
    .get((req, res) => Message.show(req.params.id, (message) => res.json(message)))
    .put((req, res) => Message.update(req.params.id, req.body, (err, message) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.json(message);
    }))
    .delete((req, res) => Message._delete(req.params.id, (err, message) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.json(message);
    }));

// --- USERS ---
app.route('/api/user')
    .get((req, res) => User.all((users) => res.json(users)))
    .post((req, res) => User.create(req.body, (err, user) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.status(HttpStatus.CREATED).json(user);
    }));

app.route('/api/user/:id')
    .get((req, res) => User.show(req.params.id, (user) => res.json(user)))
    .put((req, res) => User.update(req.params.id, req.body, (err, user) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.json(user);
    }))
    .delete((req, res) => User._delete(req.params.id, (err, user) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        res.json(user);
    }));

// --- AUTH ---
app.post('/api/login', (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Wrong credentials" });
    Login(req.body, (err, row) => {
        if (err) return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
        let userData = {
            id: row.id,
            nickname: row.nickname,
            avatar: row.avatar,
            email: row.email,
            rooms: []
        };
        RoomService.getRoomAdmin(row.id, (error, rooms) => {
            if (rooms && rooms.length > 0) {
                rooms.forEach(ele => userData.rooms.push(ele.id));
            }
            res.json(userData);
        });
    });
});

// --- WALLET ---
app.get('/api/wallet/:userId', walletController.getWallet);
app.post('/api/wallet/:userId/transaction', walletController.addTransaction);
app.get('/api/wallet/:userId/transactions', walletController.getTransactions);
app.put('/api/wallet/:userId/locked', walletController.setLocked);
app.put('/api/wallet/:userId/currency', walletController.setCurrency);
app.post('/api/wallet/:userId/reset', walletController.reset);

// --- MUSIC LIBRARY ---
app.get('/api/music/:userId/playlists', musicLibraryController.getPlaylists);
app.post('/api/music/:userId/playlists', musicLibraryController.addPlaylist);
app.delete('/api/music/:userId/playlists/:playlistId', musicLibraryController.deletePlaylist);
app.post('/api/music/:userId/playlists/:playlistId/tracks', musicLibraryController.addTrackToPlaylist);
app.delete('/api/music/:userId/playlists/:playlistId/tracks/:trackId', musicLibraryController.removeTrackFromPlaylist);
app.post('/api/music/:userId/favorites', musicLibraryController.addFavorite);
app.delete('/api/music/:userId/favorites', musicLibraryController.removeFavorite);
app.post('/api/music/:userId/history', musicLibraryController.addToHistory);
app.get('/api/music/:userId/history', musicLibraryController.getHistory);

// --- NOTIFICATIONS ---
app.get('/api/notifications/:userId', notificationsController.getAll);
app.post('/api/notifications/:userId', notificationsController.add);
app.post('/api/notifications/:userId/read/:notifId', notificationsController.markAsRead);
app.post('/api/notifications/:userId/read-all', notificationsController.markAllAsRead);
app.delete('/api/notifications/:userId/delete/:notifId', notificationsController.delete);
app.delete('/api/notifications/:userId/delete-all', notificationsController.deleteAll);

// --- SETTINGS ---
app.get('/api/settings/:userId', settingsController.getSettings);
app.put('/api/settings/:userId', settingsController.updateSettings);
app.put('/api/settings/:userId/section', settingsController.updateSection);
app.post('/api/settings/:userId/reset', settingsController.reset);
app.get('/api/settings', settingsController.getAll);

// --- ACCESSIBILITY ---
app.get('/api/accessibility/:userId', accessibilityController.getByUserId);
app.put('/api/accessibility/:userId', accessibilityController.update);
app.post('/api/accessibility/:userId/reset', accessibilityController.reset);

// --- VIRTUAL CLASSROOM ---
app.get('/api/virtual-classroom', virtualClassroomController.getAll);
app.post('/api/virtual-classroom', virtualClassroomController.create);
app.get('/api/virtual-classroom/:id', virtualClassroomController.getById);
app.put('/api/virtual-classroom/:id', virtualClassroomController.update);
app.delete('/api/virtual-classroom/:id', virtualClassroomController.delete);
app.post('/api/virtual-classroom/:id/users', virtualClassroomController.addUser);
app.delete('/api/virtual-classroom/:id/users', virtualClassroomController.removeUser);
app.post('/api/virtual-classroom/:id/messages', virtualClassroomController.addMessage);
app.post('/api/virtual-classroom/:id/resources', virtualClassroomController.addResource);
app.post('/api/virtual-classroom/:id/schedule', virtualClassroomController.addScheduleEvent);

// --- CHALLENGES ---
app.get('/api/challenges', challengesController.getAll);
app.post('/api/challenges', challengesController.create);
app.get('/api/challenges/:id', challengesController.getById);
app.post('/api/challenges/:id/join', challengesController.join);
app.post('/api/challenges/:id/submit', challengesController.submit);
app.post('/api/challenges/:id/score', challengesController.scoreSubmission);
app.post('/api/challenges/:id/close', challengesController.close);
app.delete('/api/challenges/:id', challengesController.delete);

// --- CREATOR TOOLS ---
app.get('/api/creator-tools/:userId/tools', creatorToolsController.getTools);
app.post('/api/creator-tools/:userId/tools', creatorToolsController.addTool);
app.put('/api/creator-tools/:userId/tools/:toolId', creatorToolsController.updateTool);
app.delete('/api/creator-tools/:userId/tools/:toolId', creatorToolsController.deleteTool);
app.get('/api/creator-tools/:userId/presets', creatorToolsController.getPresets);
app.post('/api/creator-tools/:userId/presets', creatorToolsController.addPreset);
app.delete('/api/creator-tools/:userId/presets/:presetId', creatorToolsController.deletePreset);

// --- MODERATION ---
app.post('/api/moderation/:roomId/ban/:userId', moderationController.banUser);
app.delete('/api/moderation/:roomId/ban/:userId', moderationController.unbanUser);
app.post('/api/moderation/:roomId/mute/:userId', moderationController.muteUser);
app.delete('/api/moderation/:roomId/mute/:userId', moderationController.unmuteUser);
app.get('/api/moderation/:roomId/is-banned/:userId', moderationController.isBanned);
app.get('/api/moderation/:roomId/is-muted/:userId', moderationController.isMuted);
app.post('/api/moderation/:roomId/report', moderationController.addReport);
app.put('/api/moderation/:roomId/report/:reportId/status', moderationController.setReportStatus);
app.get('/api/moderation/:roomId/reports', moderationController.getReports);

// --- LEADERBOARD ---
app.get('/api/leaderboard/:type', leaderboardController.getLeaderboard);
app.post('/api/leaderboard/:type/:userId', leaderboardController.upsertScore);
app.get('/api/leaderboard/:type/:userId/rank', leaderboardController.getUserRank);
app.post('/api/leaderboard/:type/reset', leaderboardController.reset);

// --- MODULE SOCIAL : Réseaux sociaux, interactions, points, boosters ---
app.get('/api/social-networks/:userId', socialNetworkController.getAll);
app.post('/api/social-networks/:userId', socialNetworkController.addOrUpdate);
app.post('/api/social-networks/:userId/verify', socialNetworkController.verify);
app.post('/api/social-networks/:userId/regenerate-code', socialNetworkController.regenerateCode);
app.get('/api/social-networks/:userId/:platform', socialNetworkController.getOne);

app.get('/api/interactions/:userId', interactionController.getAllToBoost);
app.post('/api/interactions', interactionController.create);
app.post('/api/interactions/:userId/confirm', interactionController.confirm);
app.get('/api/interactions/:userId/history', interactionController.getHistory);
app.get('/api/interactions/owner/:ownerId', interactionController.getByOwner);

app.get('/api/points/:userId', pointsController.getPoints);
app.post('/api/points/:userId/history', pointsController.addHistory);
app.get('/api/points/:userId/history', pointsController.getHistory);
app.get('/api/points/:userId/stats', pointsController.getStats);

app.get('/api/boosters/leaderboard', boosterController.getLeaderboard);
app.get('/api/boosters/:userId/rank', boosterController.getUserRank);

// --- IA, SANTÉ, DOMOTIQUE, CLASSROOM (nouvelles routes) ---
app.post('/api/vision/describe', visionController.describe);
app.post('/api/vision/detect-objects', visionController.detectObjects);
app.post('/api/vision/detect-gestures', visionController.detectGestures);

app.post('/api/speech/transcribe', speechController.transcribe);
app.post('/api/speech/tts', speechController.synthesize);
app.post('/api/speech/emotion', speechController.detectEmotion);

app.post('/api/health/monitor', healthController.monitor);
app.get('/api/health/:userId/history', healthController.getHistory);
app.post('/api/health/analyze', healthController.analyze);

app.post('/api/emergency/alert', emergencyController.alert);
app.get('/api/emergency/:userId/history', emergencyController.getHistory);

app.get('/api/domotic/:userId/devices', domoticController.listDevices);
app.post('/api/domotic/control', domoticController.controlDevice);
app.post('/api/domotic/add', domoticController.addDevice);
app.delete('/api/domotic/remove', domoticController.removeDevice);

app.post('/api/classroom/quiz', classroomController.generateQuiz);
app.post('/api/classroom/factcheck', classroomController.factCheck);
app.post('/api/classroom/summarize', classroomController.summarize);
app.post('/api/classroom/techwatch', classroomController.techWatch);

// --- Gestion des erreurs 404 ---
app.use((req, res, next) => {
    res.status(404).json({ message: "Route non trouvée" });
});

module.exports = app;