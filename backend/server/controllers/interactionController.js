import InteractionService from '../services/interaction.service.js';

const interactionController = {
  // Récupérer toutes les interactions à booster (sauf celles de l'utilisateur)
  async getAllToBoost(req, res) {
    try {
      const userId = req.params.userId;
      const interactions = await InteractionService.getAllToBoost(userId);
      res.json(interactions);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération interactions.' });
    }
  },

  // Créer une nouvelle interaction à booster
  async create(req, res) {
    try {
      const data = req.body;
      if (!data.ownerId || !data.platform || !data.title || !data.link) {
        return res.status(400).json({ error: "Champs obligatoires manquants" });
      }
      const interaction = await InteractionService.create(data);
      res.json(interaction);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur création interaction.' });
    }
  },

  // Valider une interaction (après action réelle)
  async confirm(req, res) {
    try {
      const userId = req.params.userId;
      const { interactionId } = req.body;
      if (!interactionId) return res.status(400).json({ error: "interactionId requis" });
      const result = await InteractionService.confirm(interactionId, userId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur validation interaction.' });
    }
  },

  // Historique des interactions validées par un utilisateur
  async getHistory(req, res) {
    try {
      const userId = req.params.userId;
      const history = await InteractionService.getHistory(userId);
      res.json(history);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur historique interactions.' });
    }
  },

  // Récupérer les interactions créées par un utilisateur
  async getByOwner(req, res) {
    try {
      const ownerId = req.params.ownerId;
      const interactions = await InteractionService.getByOwner(ownerId);
      res.json(interactions);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération interactions owner.' });
    }
  }
};

export default interactionController;