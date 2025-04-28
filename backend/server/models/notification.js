// Modèle Notification avancé (stockage en mémoire, logique métier)
// Chaque utilisateur a une liste de notifications avec type, statut, actions, etc.

const notifications = {}; // { userId: [ { id, type, message, date, read, action, meta } ] }
let nextId = 1;

module.exports = {
  // Ajouter une notification à un utilisateur
  add: (userId, { message, type = "info", action = null, meta = {} }, cb) => {
    if (!notifications[userId]) notifications[userId] = [];
    const notif = {
      id: nextId++,
      type, // ex: "info", "warning", "success", "error"
      message,
      date: new Date(),
      read: false,
      action, // ex: "openRoom", "viewChallenge", etc.
      meta    // données additionnelles (roomId, challengeId, etc.)
    };
    notifications[userId].push(notif);
    cb(null, notif);
  },

  // Récupérer toutes les notifications d'un utilisateur (avec filtre possible)
  getAll: (userId, { unreadOnly = false } = {}, cb) => {
    let list = notifications[userId] || [];
    if (unreadOnly) list = list.filter(n => !n.read);
    cb(null, list);
  },

  // Marquer une notification comme lue
  markAsRead: (userId, notifId, cb) => {
    if (!notifications[userId]) return cb(new Error("Aucune notification"));
    const notif = notifications[userId].find(n => n.id === notifId);
    if (!notif) return cb(new Error("Notification non trouvée"));
    notif.read = true;
    cb(null, notif);
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: (userId, cb) => {
    if (!notifications[userId]) return cb(null, []);
    notifications[userId].forEach(n => { n.read = true; });
    cb(null, notifications[userId]);
  },

  // Supprimer une notification
  delete: (userId, notifId, cb) => {
    if (!notifications[userId]) return cb(new Error("Aucune notification"));
    notifications[userId] = notifications[userId].filter(n => n.id !== notifId);
    cb(null, true);
  },

  // Supprimer toutes les notifications
  deleteAll: (userId, cb) => {
    notifications[userId] = [];
    cb(null, true);
  }
};