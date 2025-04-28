const Leaderboard = require('../models/leaderboard.js');

module.exports = {
  // Ajouter ou mettre à jour le score d'un utilisateur
  upsertScore: (type, userId, score, meta, cb) => {
    Leaderboard.upsertScore(type, userId, score, meta, cb);
  },

  // Récupérer le leaderboard complet (avec pagination)
  getLeaderboard: (type, options, cb) => {
    Leaderboard.getLeaderboard(type, options, cb);
  },

  // Récupérer le score et le rang d'un utilisateur
  getUserRank: (type, userId, cb) => {
    Leaderboard.getUserRank(type, userId, cb);
  },

  // Réinitialiser un leaderboard (admin)
  reset: (type, cb) => {
    Leaderboard.reset(type, cb);
  }
};