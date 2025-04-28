const LeaderboardService = require('../services/leaderboard.service.js');

// Ajouter ou mettre à jour le score d'un utilisateur
exports.upsertScore = (req, res) => {
  const { type, userId } = req.params;
  const { score, meta } = req.body;
  LeaderboardService.upsertScore(type, userId, score, meta || {}, (err, entry) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(entry);
  });
};

// Récupérer le leaderboard complet (avec pagination)
exports.getLeaderboard = (req, res) => {
  const { type } = req.params;
  const { limit, offset } = req.query;
  LeaderboardService.getLeaderboard(type, { 
    limit: limit ? parseInt(limit) : 20, 
    offset: offset ? parseInt(offset) : 0 
  }, (err, list) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(list);
  });
};

// Récupérer le score et le rang d'un utilisateur
exports.getUserRank = (req, res) => {
  const { type, userId } = req.params;
  LeaderboardService.getUserRank(type, userId, (err, entry) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(entry);
  });
};

// Réinitialiser un leaderboard (admin)
exports.reset = (req, res) => {
  const { type } = req.params;
  LeaderboardService.reset(type, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};