const NotificationsService = require('../services/notifications.service.js');

// Ajouter une notification à un utilisateur
exports.add = (req, res) => {
  const userId = req.params.userId;
  NotificationsService.add(userId, req.body, (err, notif) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(notif);
  });
};

// Récupérer toutes les notifications d'un utilisateur (avec filtre)
exports.getAll = (req, res) => {
  const userId = req.params.userId;
  const { unreadOnly } = req.query;
  NotificationsService.getAll(userId, { unreadOnly: unreadOnly === 'true' }, (err, notifs) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(notifs);
  });
};

// Marquer une notification comme lue
exports.markAsRead = (req, res) => {
  const userId = req.params.userId;
  const notifId = parseInt(req.params.notifId);
  NotificationsService.markAsRead(userId, notifId, (err, notif) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(notif);
  });
};

// Marquer toutes les notifications comme lues
exports.markAllAsRead = (req, res) => {
  const userId = req.params.userId;
  NotificationsService.markAllAsRead(userId, (err, notifs) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(notifs);
  });
};

// Supprimer une notification
exports.delete = (req, res) => {
  const userId = req.params.userId;
  const notifId = parseInt(req.params.notifId);
  NotificationsService.delete(userId, notifId, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};

// Supprimer toutes les notifications
exports.deleteAll = (req, res) => {
  const userId = req.params.userId;
  NotificationsService.deleteAll(userId, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};