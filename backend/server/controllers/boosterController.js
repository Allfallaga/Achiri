import BoosterService from '../services/booster.service.js';

const boosterController = {
  // Récupérer le leaderboard des boosters (top N)
  async getLeaderboard(req, res) {
    try {
      const limit = parseInt(req.query.limit, 10) || 10;
      const leaderboard = await BoosterService.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération leaderboard.' });
    }
  },

  // Récupérer le classement d'un utilisateur précis
  async getUserRank(req, res) {
    try {
      const userId = req.params.userId;
      const rank = await BoosterService.getUserRank(userId);
      res.json(rank);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération classement utilisateur.' });
    }
  }
};

export default boosterController;