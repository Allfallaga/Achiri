import HealthService from '../services/health.service.js';

const healthController = {
  // Enregistre ou met à jour les données santé d'un utilisateur
  async monitor(req, res) {
    try {
      const { userId, heartRate, bloodPressure, glucose, activity, timestamp } = req.body;
      if (!userId) {
        return res.status(400).json({ message: 'userId manquant.' });
      }
      await HealthService.saveHealthData({ userId, heartRate, bloodPressure, glucose, activity, timestamp });
      res.json({ success: true, message: 'Données santé enregistrées.' });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur enregistrement santé.' });
    }
  },

  // Récupère l'historique santé d'un utilisateur
  async getHistory(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: 'userId manquant.' });
      }
      const history = await HealthService.getHealthHistory(userId);
      res.json({ history });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur récupération historique santé.' });
    }
  },

  // Analyse les données santé et retourne des alertes ou conseils
  async analyze(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: 'userId manquant.' });
      }
      const analysis = await HealthService.analyzeHealth(userId);
      res.json({ analysis });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur analyse santé.' });
    }
  }
};

export default healthController;