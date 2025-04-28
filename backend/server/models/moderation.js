// Modèle Moderation avancé (stockage en mémoire, logique métier)
// Structure : { roomId: { bans: [userId], mutes: [{ userId, until }], reports: [{ id, reporter, target, reason, date, status }] } }

const moderation = {}; // { roomId: { bans, mutes, reports } }
let nextReportId = 1;

module.exports = {
  // Initialiser la modération d'une room si besoin
  _initRoom: (roomId) => {
    if (!moderation[roomId]) {
      moderation[roomId] = {
        bans: [],
        mutes: [],
        reports: []
      };
    }
  },

  // Bannir un utilisateur
  banUser: (roomId, userId, cb) => {
    module.exports._initRoom(roomId);
    if (!moderation[roomId].bans.includes(userId)) {
      moderation[roomId].bans.push(userId);
    }
    cb(null, moderation[roomId].bans);
  },

  // Débannir un utilisateur
  unbanUser: (roomId, userId, cb) => {
    module.exports._initRoom(roomId);
    moderation[roomId].bans = moderation[roomId].bans.filter(id => id !== userId);
    cb(null, moderation[roomId].bans);
  },

  // Muter un utilisateur (temporairement)
  muteUser: (roomId, userId, durationMinutes, cb) => {
    module.exports._initRoom(roomId);
    const until = new Date(Date.now() + durationMinutes * 60000);
    moderation[roomId].mutes.push({ userId, until });
    cb(null, moderation[roomId].mutes);
  },

  // Démuter un utilisateur
  unmuteUser: (roomId, userId, cb) => {
    module.exports._initRoom(roomId);
    moderation[roomId].mutes = moderation[roomId].mutes.filter(m => m.userId !== userId);
    cb(null, moderation[roomId].mutes);
  },

  // Vérifier si un utilisateur est banni
  isBanned: (roomId, userId) => {
    module.exports._initRoom(roomId);
    return moderation[roomId].bans.includes(userId);
  },

  // Vérifier si un utilisateur est mute
  isMuted: (roomId, userId) => {
    module.exports._initRoom(roomId);
    const now = new Date();
    moderation[roomId].mutes = moderation[roomId].mutes.filter(m => m.until > now); // Nettoyage auto
    return moderation[roomId].mutes.some(m => m.userId === userId);
  },

  // Ajouter un report
  addReport: (roomId, { reporter, target, reason }, cb) => {
    module.exports._initRoom(roomId);
    const report = {
      id: nextReportId++,
      reporter,
      target,
      reason,
      date: new Date(),
      status: "open" // "open", "reviewed", "closed"
    };
    moderation[roomId].reports.push(report);
    cb(null, report);
  },

  // Changer le statut d'un report
  setReportStatus: (roomId, reportId, status, cb) => {
    module.exports._initRoom(roomId);
    const report = moderation[roomId].reports.find(r => r.id === reportId);
    if (!report) return cb(new Error("Report non trouvé"));
    report.status = status;
    cb(null, report);
  },

  // Lister tous les reports d'une room
  getReports: (roomId, cb) => {
    module.exports._initRoom(roomId);
    cb(null, moderation[roomId].reports);
  }
};