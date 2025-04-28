import EmergencyService from '../services/emergency.service.js';

const emergencyController = {
  // Déclenche une alerte d'urgence (ex : chute, malaise, bouton SOS)
  async alert(req, res) {
    try {
      const { userId, location, type, healthData } = req.body;
      if (!userId || !location) {
        return res.status(400).json({ message: 'userId ou localisation manquant.' });
      }
      const result = await EmergencyService.triggerAlert({ userId, location, type, healthData });
      res.json({ success: true, message: 'Alerte envoyée.', result });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur envoi alerte.' });
    }
  },

  // Récupère l'historique des alertes d'un utilisateur
  async getHistory(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: 'userId manquant.' });
      }
      const history = await EmergencyService.getAlertHistory(userId);
      res.json({ history });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur récupération historique alertes.' });
    }
  }
};

export default emergencyController;