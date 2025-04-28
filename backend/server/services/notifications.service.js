const Notification = require('../models/notification.js');

module.exports = {
  // Ajouter une notification à un utilisateur
  add: (userId, data, cb) => {
    Notification.add(userId, data, cb);
  },

  // Récupérer toutes les notifications d'un utilisateur (avec filtre)
  getAll: (userId, options, cb) => {
    Notification.getAll(userId, options, cb);
  },

  // Marquer une notification comme lue
  markAsRead: (userId, notifId, cb) => {
    Notification.markAsRead(userId, notifId, cb);
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: (userId, cb) => {
    Notification.markAllAsRead(userId, cb);
  },

  // Supprimer une notification
  delete: (userId, notifId, cb) => {
    Notification.delete(userId, notifId, cb);
  },

  // Supprimer toutes les notifications
  deleteAll: (userId, cb) => {
    Notification.deleteAll(userId, cb);
  }
};