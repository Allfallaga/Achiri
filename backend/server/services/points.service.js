/**
 * Service Points : logique métier pour la gestion des points, historique et stats.
 */

const Points = require('../models/points');

const PointsService = {
  // Obtenir le solde total de points d'un utilisateur
  getPoints(userId, cb) {
    Points.getTotal(userId, cb);
  },

  // Ajouter ou retirer des points (et historiser)
  addPoints(userId, action, points, type, cb) {
    Points.add(userId, action, points, type, cb);
  },

  // Historique des points
  getHistory(userId, cb) {
    Points.getHistory(userId, cb);
  },

  // Statistiques de points (likes, comments, shares, boosts, etc.)
  getStats(userId, cb) {
    Points.getStats(userId, cb);
  }
};

module.exports = PointsService;