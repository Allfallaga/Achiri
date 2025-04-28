/**
 * Service Booster : logique métier pour le classement des meilleurs boosters.
 */

const Booster = require('../models/booster');

const BoosterService = {
  // Récupérer le leaderboard des boosters (top N)
  getLeaderboard(limit = 10, cb) {
    Booster.getLeaderboard(limit, cb);
  },

  // Récupérer le classement d'un utilisateur précis
  getUserRank(userId, cb) {
    Booster.getUserRank(userId, cb);
  }
};

module.exports = BoosterService;