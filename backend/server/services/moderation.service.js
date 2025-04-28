const Moderation = require('../models/moderation.js');

module.exports = {
  // Bannir un utilisateur d'une room
  banUser: (roomId, userId, cb) => {
    Moderation.banUser(roomId, userId, cb);
  },

  // Débannir un utilisateur
  unbanUser: (roomId, userId, cb) => {
    Moderation.unbanUser(roomId, userId, cb);
  },

  // Muter un utilisateur temporairement
  muteUser: (roomId, userId, durationMinutes, cb) => {
    Moderation.muteUser(roomId, userId, durationMinutes, cb);
  },

  // Démuter un utilisateur
  unmuteUser: (roomId, userId, cb) => {
    Moderation.unmuteUser(roomId, userId, cb);
  },

  // Vérifier si un utilisateur est banni
  isBanned: (roomId, userId) => {
    return Moderation.isBanned(roomId, userId);
  },

  // Vérifier si un utilisateur est mute
  isMuted: (roomId, userId) => {
    return Moderation.isMuted(roomId, userId);
  },

  // Ajouter un report
  addReport: (roomId, reportData, cb) => {
    Moderation.addReport(roomId, reportData, cb);
  },

  // Changer le statut d'un report
  setReportStatus: (roomId, reportId, status, cb) => {
    Moderation.setReportStatus(roomId, reportId, status, cb);
  },

  // Lister tous les reports d'une room
  getReports: (roomId, cb) => {
    Moderation.getReports(roomId, cb);
  }
};