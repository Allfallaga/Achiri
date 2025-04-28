import PointsService from '../services/points.service.js';

const pointsController = {
  // Obtenir le solde total de points d'un utilisateur
  async getPoints(req, res) {
    try {
      const userId = req.params.userId;
      const total = await PointsService.getPoints(userId);
      res.json({ userId, total });
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération points.' });
    }
  },

  // Ajouter ou retirer des points (et historiser)
  async addHistory(req, res) {
    try {
      const userId = req.params.userId;
      const { action, points, type } = req.body;
      if (!action || typeof points !== "number" || !type) {
        return res.status(400).json({ error: "Champs obligatoires manquants" });
      }
      const result = await PointsService.addPoints(userId, action, points, type);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur ajout points.' });
    }
  },

  // Historique des points
  async getHistory(req, res) {
    try {
      const userId = req.params.userId;
      const history = await PointsService.getHistory(userId);
      res.json(history);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur historique points.' });
    }
  },

  // Statistiques de points (likes, comments, shares, boosts, etc.)
  async getStats(req, res) {
    try {
      const userId = req.params.userId;
      const stats = await PointsService.getStats(userId);
      res.json(stats);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur stats points.' });
    }
  }
};

export default pointsController;