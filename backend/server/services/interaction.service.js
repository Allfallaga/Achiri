/**
 * Service Interaction : logique métier pour les interactions sociales à booster.
 */

const Interaction = require('../models/interaction');

const InteractionService = {
  // Récupérer toutes les interactions à booster (sauf celles de l'utilisateur)
  getAllToBoost(userId, cb) {
    Interaction.getAllToBoost(userId, cb);
  },

  // Créer une nouvelle interaction à booster
  create(data, cb) {
    Interaction.create(data, cb);
  },

  // Valider une interaction (après action réelle)
  confirm(interactionId, userId, cb) {
    Interaction.validate(interactionId, userId, cb);
  },

  // Historique des interactions validées par un utilisateur
  getHistory(userId, cb) {
    Interaction.getHistory(userId, cb);
  },

  // Récupérer les interactions créées par un utilisateur
  getByOwner(ownerId, cb) {
    Interaction.getByOwner(ownerId, cb);
  }
};

module.exports = InteractionService;