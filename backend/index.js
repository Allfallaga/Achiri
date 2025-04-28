import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { Server } from 'socket.io';
import winston from 'winston';
import session from 'express-session';
import bodyParser from 'body-parser';
import ejs from 'ejs';

// --- Sécurité & logs ---
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.timestamp(), winston.format.simple())
});

// --- Configuration ---
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// --- App Express ---
const app = express();
app.set('view engine', 'ejs');
app.use(helmet());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'qsdqsdqd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
try { app.use((await import('./middlewares/flash.js')).default); } catch {}

// --- Contrôleurs avancés ---
import walletController from './server/controllers/walletController.js';
import musicLibraryController from './server/controllers/musicLibraryController.js';
import notificationsController from './server/controllers/notificationsController.js';
import settingsController from './server/controllers/settingsController.js';
import accessibilityController from './server/controllers/accessibilityController.js';
import virtualClassroomController from './server/controllers/virtualClassroomController.js';
import challengesController from './server/controllers/challengesController.js';
import creatorToolsController from './server/controllers/creatorToolsController.js';
import moderationController from './server/controllers/moderationController.js';
import leaderboardController from './server/controllers/leaderboardController.js';

// --- Contrôleurs modules sociaux ---
import socialNetworkController from './server/controllers/socialNetworkController.js';
import interactionController from './server/controllers/interactionController.js';
import pointsController from './server/controllers/pointsController.js';
import boosterController from './server/controllers/boosterController.js';

// --- Contrôleurs IA, santé, domotique, classroom ---
import visionController from './server/controllers/visionController.js';
import speechController from './server/controllers/speechController.js';
import healthController from './server/controllers/healthController.js';
import emergencyController from './server/controllers/emergencyController.js';
import domoticController from './server/controllers/domoticController.js';
import classroomController from './server/controllers/classroomController.js';

// --- ROUTES REST MÉTIER ET IA ---

// Wallet
app.get('/api/wallet/:userId', walletController.getWallet);
app.post('/api/wallet/:userId/transaction', walletController.addTransaction);
app.get('/api/wallet/:userId/transactions', walletController.getTransactions);
app.put('/api/wallet/:userId/locked', walletController.setLocked);
app.put('/api/wallet/:userId/currency', walletController.setCurrency);
app.post('/api/wallet/:userId/reset', walletController.reset);

// Music Library
app.get('/api/music/:userId/playlists', musicLibraryController.getPlaylists);
app.post('/api/music/:userId/playlists', musicLibraryController.addPlaylist);
app.delete('/api/music/:userId/playlists/:playlistId', musicLibraryController.deletePlaylist);
app.post('/api/music/:userId/playlists/:playlistId/tracks', musicLibraryController.addTrackToPlaylist);
app.delete('/api/music/:userId/playlists/:playlistId/tracks/:trackId', musicLibraryController.removeTrackFromPlaylist);
app.post('/api/music/:userId/favorites', musicLibraryController.addFavorite);
app.delete('/api/music/:userId/favorites', musicLibraryController.removeFavorite);
app.post('/api/music/:userId/history', musicLibraryController.addToHistory);
app.get('/api/music/:userId/history', musicLibraryController.getHistory);

// Notifications
app.get('/api/notifications/:userId', notificationsController.getAll);
app.post('/api/notifications/:userId', notificationsController.add);
app.post('/api/notifications/:userId/read/:notifId', notificationsController.markAsRead);
app.post('/api/notifications/:userId/read-all', notificationsController.markAllAsRead);
app.delete('/api/notifications/:userId/delete/:notifId', notificationsController.delete);
app.delete('/api/notifications/:userId/delete-all', notificationsController.deleteAll);

// Settings
app.get('/api/settings/:userId', settingsController.getSettings);
app.put('/api/settings/:userId', settingsController.updateSettings);
app.put('/api/settings/:userId/section', settingsController.updateSection);
app.post('/api/settings/:userId/reset', settingsController.reset);
app.get('/api/settings', settingsController.getAll);

// Accessibility
app.get('/api/accessibility/:userId', accessibilityController.getByUserId);
app.put('/api/accessibility/:userId', accessibilityController.update);
app.post('/api/accessibility/:userId/reset', accessibilityController.reset);

// Virtual Classroom
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

// Challenges
app.get('/api/challenges', challengesController.getAll);
app.post('/api/challenges', challengesController.create);
app.get('/api/challenges/:id', challengesController.getById);
app.post('/api/challenges/:id/join', challengesController.join);
app.post('/api/challenges/:id/submit', challengesController.submit);
app.post('/api/challenges/:id/score', challengesController.scoreSubmission);
app.post('/api/challenges/:id/close', challengesController.close);
app.delete('/api/challenges/:id', challengesController.delete);

// Creator Tools
app.get('/api/creator-tools/:userId/tools', creatorToolsController.getTools);
app.post('/api/creator-tools/:userId/tools', creatorToolsController.addTool);
app.put('/api/creator-tools/:userId/tools/:toolId', creatorToolsController.updateTool);
app.delete('/api/creator-tools/:userId/tools/:toolId', creatorToolsController.deleteTool);
app.get('/api/creator-tools/:userId/presets', creatorToolsController.getPresets);
app.post('/api/creator-tools/:userId/presets', creatorToolsController.addPreset);
app.delete('/api/creator-tools/:userId/presets/:presetId', creatorToolsController.deletePreset);

// Moderation
app.post('/api/moderation/:roomId/ban/:userId', moderationController.banUser);
app.delete('/api/moderation/:roomId/ban/:userId', moderationController.unbanUser);
app.post('/api/moderation/:roomId/mute/:userId', moderationController.muteUser);
app.delete('/api/moderation/:roomId/mute/:userId', moderationController.unmuteUser);
app.get('/api/moderation/:roomId/is-banned/:userId', moderationController.isBanned);
app.get('/api/moderation/:roomId/is-muted/:userId', moderationController.isMuted);
app.post('/api/moderation/:roomId/report', moderationController.addReport);
app.put('/api/moderation/:roomId/report/:reportId/status', moderationController.setReportStatus);
app.get('/api/moderation/:roomId/reports', moderationController.getReports);

// Leaderboard
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

// --- IA, SANTÉ, DOMOTIQUE, CLASSROOM (routes IA) ---
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

// --- Route racine ---
app.get('/', (req, res) => res.send('Backend Achiri opérationnel 🚀'));

// --- Gestion des erreurs 404 ---
app.use((req, res, next) => {
  res.status(404).send({ message: "Route non trouvée" });
});

// --- Serveur HTTP + Socket.io ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: FRONTEND_URL, methods: ['GET', 'POST'], credentials: true }
});

// --- Mémoire rooms & rôles (MVP, à migrer DB ensuite) ---
const rooms = new Map(); // { roomId: { owner, users: Set, roles: {socketId: role}, muted: Set } }

// (Ici tu peux ajouter la logique socket.io ou laisser comme ça si tu n'en as pas besoin pour l'instant)

server.listen(PORT, () => {
  logger.info(`🚀 Backend Achiri lancé sur http://localhost:${PORT}`);
});

export default app;