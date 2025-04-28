/**
 * Modèle Points : gère le solde de points, l'historique et les stats d'un utilisateur.
 * Champs : id, userId, total, createdAt, updatedAt
 * Historique : id, userId, action, points, type, date
 */

const db = require('../db');

const Points = {
  // Obtenir le solde total de points d'un utilisateur
  getTotal(userId, cb) {
    db.get(
      `SELECT total FROM points WHERE userId = ?`,
      [userId],
      (err, row) => cb(err, row ? row.total : 0)
    );
  },

  // Ajouter ou retirer des points (et historiser)
  add(userId, action, points, type, cb) {
    // Met à jour le solde
    db.run(
      `INSERT INTO points (userId, total, createdAt, updatedAt)
       VALUES (?, COALESCE((SELECT total FROM points WHERE userId = ?), 0) + ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(userId) DO UPDATE SET
         total = total + excluded.total,
         updatedAt = CURRENT_TIMESTAMP
      `,
      [userId, userId, points],
      function (err) {
        if (err) return cb(err);
        // Ajoute à l'historique
        db.run(
          `INSERT INTO points_history (userId, action, points, type, date)
           VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
          [userId, action, points, type],
          function (err2) {
            cb(err2, { userId, action, points, type });
          }
        );
      }
    );
  },

  // Historique des points
  getHistory(userId, cb) {
    db.all(
      `SELECT * FROM points_history WHERE userId = ? ORDER BY date DESC`,
      [userId],
      (err, rows) => cb(err, rows)
    );
  },

  // Statistiques de points (likes, comments, shares, boosts, etc.)
  getStats(userId, cb) {
    db.get(
      `SELECT
        SUM(CASE WHEN type='like' THEN points ELSE 0 END) as likes,
        SUM(CASE WHEN type='comment' THEN points ELSE 0 END) as comments,
        SUM(CASE WHEN type='share' THEN points ELSE 0 END) as shares,
        SUM(CASE WHEN type='boost' THEN points ELSE 0 END) as boosts,
        COUNT(*) as interactions
      FROM points_history WHERE userId = ?`,
      [userId],
      (err, row) => cb(err, row)
    );
  }
};

module.exports = Points;