const UserService = require('../services/user.service');
const ProfileAnalysisService = require('../services/profileAnalysis.service');
const { StatusCodes } = require('http-status-codes');
const logger = require('../config/logger');

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.status(StatusCodes.OK).json(users);
    } catch (err) {
      logger.error(`Erreur getAll users: ${err.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }
      res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.error(`Erreur getById user: ${err.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      logger.info(`Utilisateur créé: ${user.nickname}`);
      res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.error(`Erreur création user: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      logger.info(`Utilisateur mis à jour: ${user.id}`);
      res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.error(`Erreur update user: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await UserService._delete(req.params.id);
      logger.info(`Utilisateur supprimé: ${req.params.id}`);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
      logger.error(`Erreur suppression user: ${err.message}`);
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
  },

  // ----------- NOUVELLES FONCTIONNALITÉS ANALYSE DE PROFIL -----------

  async analyzeProfile(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
      }
      ProfileAnalysisService.analyzeProfile(user, (err, result) => {
        if (err) {
          logger.error(`Erreur analyse profil: ${err.message}`);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
        }
        res.status(StatusCodes.OK).json(result);
      });
    } catch (err) {
      logger.error(`Erreur analyse profil: ${err.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }
};

module.exports = UserController;