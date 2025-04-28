/**
 * Modèle Booster : gère le classement des meilleurs boosters (utilisateurs qui interagissent le plus pour les autres).
 * Champs : userId, name, avatar, points, interactions
 * (Le leaderboard se base sur l'historique des interactions validées)
 */

const db = require('../db');

const Booster = {
  // Récupérer le leaderboard des boosters (top N)
  getLeaderboard(limit = 10, cb) {
    db.all(
      `SELECT
        u.id as userId,
        u.nickname as name,
        u.avatar as avatar,
        SUM(i.points) as points,
        COUNT(i.id) as interactions
      FROM interactions i
      JOIN users u ON i.validatedBy = u.id
      WHERE i.status = 'validee'
      GROUP BY i.validatedBy
      ORDER BY points DESC, interactions DESC
      LIMIT ?`,
      [limit],
      (err, rows) => cb(err, rows)
    );
  },

  // Récupérer le classement d'un utilisateur précis
  getUserRank(userId, cb) {
    db.all(
      `SELECT
        validatedBy,
        SUM(points) as points
      FROM interactions
      WHERE status = 'validee'
      GROUP BY validatedBy
      ORDER BY points DESC
      `,
      [],
      (err, rows) => {
        if (err) return cb(err);
        const rank = rows.findIndex(r => r.validatedBy === userId) + 1;
        cb(null, { userId, rank: rank > 0 ? rank : null, points: rows.find(r => r.validatedBy === userId)?.points || 0 });
      }
    );
  }
};

module.exports = Booster;