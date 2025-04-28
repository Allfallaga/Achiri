const ModerationService = require('../services/moderation.service.js');

// Bannir un utilisateur d'une room
exports.banUser = (req, res) => {
  const { roomId, userId } = req.params;
  ModerationService.banUser(roomId, userId, (err, bans) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(bans);
  });
};

// Débannir un utilisateur
exports.unbanUser = (req, res) => {
  const { roomId, userId } = req.params;
  ModerationService.unbanUser(roomId, userId, (err, bans) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(bans);
  });
};

// Muter un utilisateur temporairement
exports.muteUser = (req, res) => {
  const { roomId, userId } = req.params;
  const { durationMinutes } = req.body;
  ModerationService.muteUser(roomId, userId, durationMinutes, (err, mutes) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(mutes);
  });
};

// Démuter un utilisateur
exports.unmuteUser = (req, res) => {
  const { roomId, userId } = req.params;
  ModerationService.unmuteUser(roomId, userId, (err, mutes) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(mutes);
  });
};

// Vérifier si un utilisateur est banni
exports.isBanned = (req, res) => {
  const { roomId, userId } = req.params;
  const banned = ModerationService.isBanned(roomId, userId);
  res.json({ banned });
};

// Vérifier si un utilisateur est mute
exports.isMuted = (req, res) => {
  const { roomId, userId } = req.params;
  const muted = ModerationService.isMuted(roomId, userId);
  res.json({ muted });
};

// Ajouter un report
exports.addReport = (req, res) => {
  const { roomId } = req.params;
  ModerationService.addReport(roomId, req.body, (err, report) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(report);
  });
};

// Changer le statut d'un report
exports.setReportStatus = (req, res) => {
  const { roomId, reportId } = req.params;
  const { status } = req.body;
  ModerationService.setReportStatus(roomId, parseInt(reportId), status, (err, report) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(report);
  });
};

// Lister tous les reports d'une room
exports.getReports = (req, res) => {
  const { roomId } = req.params;
  ModerationService.getReports(roomId, (err, reports) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(reports);
  });
};