const Interaction = {
    // Récupérer toutes les interactions à booster (sauf celles de l'utilisateur)
    getAllToBoost(userId, cb) {
      db.all(
        `SELECT * FROM interactions WHERE ownerId != ? AND status = 'en-attente' ORDER BY createdAt DESC`,
        [userId],
        (err, rows) => cb(err, rows)
      );
    },
  
    // Créer une nouvelle interaction à booster
    create(data, cb) {
      db.run(
        `INSERT INTO interactions (ownerId, platform, title, image, link, points, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, 'en-attente', CURRENT_TIMESTAMP)`,
        [
          data.ownerId,
          data.platform,
          data.title,
          data.image,
          data.link,
          data.points || 1
        ],
        function (err) {
          cb(err, { id: this.lastID, ...data, status: "en-attente" });
        }
      );
    },
  
    // Valider une interaction (après action réelle)
    validate(interactionId, userId, cb) {
      db.run(
        `UPDATE interactions SET status = 'validee', validatedBy = ?, validatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [userId, interactionId],
        function (err) {
          cb(err, { id: interactionId, validatedBy: userId, status: "validee" });
        }
      );
    },
  
    // Historique des interactions validées par un utilisateur
    getHistory(userId, cb) {
      db.all(
        `SELECT * FROM interactions WHERE validatedBy = ? ORDER BY validatedAt DESC`,
        [userId],
        (err, rows) => cb(err, rows)
      );
    },
  
    // Récupérer les interactions créées par un utilisateur
    getByOwner(ownerId, cb) {
      db.all(
        `SELECT * FROM interactions WHERE ownerId = ? ORDER BY createdAt DESC`,
        [ownerId],
        (err, rows) => cb(err, rows)
      );
    }
  };
  
  module.exports = Interaction;
