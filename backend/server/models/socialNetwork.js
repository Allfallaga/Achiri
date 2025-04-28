/**
 * Modèle SocialNetwork : gère les réseaux sociaux connectés d'un utilisateur.
 * Champs : userId, platform, url, status, code, method, dateVérification
 * Statuts : "non-verifie", "en-attente", "verifie"
 */

const db = require('../db'); // Adapter selon ton système de BDD

const SocialNetwork = {
  // Récupérer tous les réseaux d'un utilisateur
  getAllByUser(userId, cb) {
    db.all(
      `SELECT * FROM social_networks WHERE userId = ?`,
      [userId],
      (err, rows) => cb(err, rows)
    );
  },

  // Ajouter ou mettre à jour un réseau social pour un utilisateur
  upsert(userId, platform, data, cb) {
    db.run(
      `INSERT INTO social_networks (userId, platform, url, status, code, method, dateVerification)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(userId, platform) DO UPDATE SET
         url=excluded.url,
         status=excluded.status,
         code=excluded.code,
         method=excluded.method,
         dateVerification=excluded.dateVerification
      `,
      [
        userId,
        platform,
        data.url || "",
        data.status || "non-verifie",
        data.code || "",
        data.method || "bio",
        data.dateVerification || null
      ],
      function (err) {
        cb(err, { userId, platform, ...data });
      }
    );
  },

  // Mettre à jour le statut de vérification
  setStatus(userId, platform, status, cb) {
    db.run(
      `UPDATE social_networks SET status = ?, dateVerification = CURRENT_TIMESTAMP WHERE userId = ? AND platform = ?`,
      [status, userId, platform],
      function (err) {
        cb(err, { userId, platform, status });
      }
    );
  },

  // Générer un code unique pour vérification
  setCode(userId, platform, code, cb) {
    db.run(
      `UPDATE social_networks SET code = ? WHERE userId = ? AND platform = ?`,
      [code, userId, platform],
      function (err) {
        cb(err, { userId, platform, code });
      }
    );
  },

  // Récupérer un réseau social précis
  getOne(userId, platform, cb) {
    db.get(
      `SELECT * FROM social_networks WHERE userId = ? AND platform = ?`,
      [userId, platform],
      (err, row) => cb(err, row)
    );
  }
};

module.exports = SocialNetwork;