const RoomService = require('../services/room.service');
const { StatusCodes } = require('http-status-codes');
const logger = require('../config/logger');

/**
 * RoomController centralise toutes les fonctions REST liées aux rooms vidéo/chat,
 * et prépare les hooks pour la logique temps réel (Socket.io).
 * On y ajoute la gestion des rôles, des accès, des stats, et des contrôles avancés.
 */
const RoomController = {
  // Liste toutes les rooms (avec stats et rôles)
  async getAll(req, res) {
    try {
      const rooms = await RoomService.getAll();
      res.status(StatusCodes.OK).json(rooms);
    } catch (err) {
      logger.error(`Erreur getAll rooms: ${err.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  },

  // Détail d'une room (infos, users, rôles, stats)
  async getById(req, res) {
    try {
      const room = await RoomService.getById(req.params.id);
      if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Room not found' });
      }
      res.status(StatusCodes.OK).json(room);
    } catch (err) {
      logger.error(`Erreur getById room: ${err.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  },

  // Création d'une room (type, owner, accès, etc.)
  async create(req, res) {
    try {
      const room = await RoomService.create(req.body);
      logger.info(`Room créée: ${room.name} (${room.type}) par ${room.owner}`);
      res.status(StatusCodes.CREATED).json(room);
    } catch (err) {
      logger.error(`Erreur création room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Mise à jour d'une room (type, accès, modération, etc.)
  async update(req, res) {
    try {
      const room = await RoomService.update(req.params.id, req.body);
      logger.info(`Room mise à jour: ${room.id}`);
      res.status(StatusCodes.OK).json(room);
    } catch (err) {
      logger.error(`Erreur update room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Suppression d'une room
  async delete(req, res) {
    try {
      await RoomService._delete(req.params.id);
      logger.info(`Room supprimée: ${req.params.id}`);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
      logger.error(`Erreur suppression room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Ajout d'un utilisateur à une room (avec rôle)
  async addUser(req, res) {
    try {
      const { roomId, userId, role } = req.body;
      const result = await RoomService.addUser(roomId, userId, role);
      logger.info(`User ${userId} ajouté à la room ${roomId} en tant que ${role}`);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logger.error(`Erreur addUser room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Retirer un utilisateur d'une room
  async removeUser(req, res) {
    try {
      const { roomId, userId } = req.body;
      const result = await RoomService.removeUser(roomId, userId);
      logger.info(`User ${userId} retiré de la room ${roomId}`);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logger.error(`Erreur removeUser room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Mute/unmute un utilisateur (owner/admin only)
  async muteUser(req, res) {
    try {
      const { roomId, targetId, mute } = req.body;
      const result = await RoomService.muteUser(roomId, targetId, mute);
      logger.info(`User ${targetId} mute=${mute} dans la room ${roomId}`);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logger.error(`Erreur muteUser room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Kick un utilisateur (owner/admin only)
  async kickUser(req, res) {
    try {
      const { roomId, targetId } = req.body;
      const result = await RoomService.kickUser(roomId, targetId);
      logger.info(`User ${targetId} kické de la room ${roomId}`);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logger.error(`Erreur kickUser room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // "Raise hand" (signalement d'un user pour prise de parole)
  async raiseHand(req, res) {
    try {
      const { roomId, userId } = req.body;
      const result = await RoomService.raiseHand(roomId, userId);
      logger.info(`User ${userId} a levé la main dans la room ${roomId}`);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logger.error(`Erreur raiseHand room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // Récupérer la liste des utilisateurs d'une room (avec rôles)
  async getUsers(req, res) {
    try {
      const users = await RoomService.getUsers(req.params.id);
      res.status(StatusCodes.OK).json(users);
    } catch (err) {
      logger.error(`Erreur getUsers room: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  }
};

module.exports = RoomController;