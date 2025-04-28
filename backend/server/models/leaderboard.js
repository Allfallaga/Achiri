// Modèle Leaderboard avancé (stockage en mémoire, logique métier)
// Structure : { type: [ { userId, score, rank, meta } ] }
// type = "global", "room", "challenge", etc.

const leaderboards = {}; // { type: [ { userId, score, rank, meta } ] }

module.exports = {
  // Initialiser un leaderboard si besoin
  _initType: (type) => {
    if (!leaderboards[type]) {
      leaderboards[type] = [];
    }
  },

  // Ajouter ou mettre à jour le score d'un utilisateur
  upsertScore: (type, userId, score, meta = {}, cb) => {
    module.exports._initType(type);
    let entry = leaderboards[type].find(e => e.userId === userId);
    if (entry) {
      entry.score = score;
      entry.meta = { ...entry.meta, ...meta };
    } else {
      entry = { userId, score, meta };
      leaderboards[type].push(entry);
    }
    // Recalculer les rangs
    leaderboards[type].sort((a, b) => b.score - a.score);
    leaderboards[type].forEach((e, i) => e.rank = i + 1);
    cb(null, entry);
  },

  // Récupérer le leaderboard complet (avec pagination)
  getLeaderboard: (type, { limit = 20, offset = 0 } = {}, cb) => {
    module.exports._initType(type);
    const list = leaderboards[type].slice(offset, offset + limit);
    cb(null, list);
  },

  // Récupérer le score et le rang d'un utilisateur
  getUserRank: (type, userId, cb) => {
    module.exports._initType(type);
    const entry = leaderboards[type].find(e => e.userId === userId);
    cb(null, entry || null);
  },

  // Réinitialiser un leaderboard (admin)
  reset: (type, cb) => {
    leaderboards[type] = [];
    cb(null, true);
  }
};