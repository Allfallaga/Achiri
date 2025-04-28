import SocialNetworkService from '../services/socialNetwork.service.js';

const socialNetworkController = {
  // Récupérer tous les réseaux sociaux d'un utilisateur
  async getAll(req, res) {
    try {
      const userId = req.params.userId;
      const networks = await SocialNetworkService.getAll(userId);
      res.json(networks);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération réseaux sociaux.' });
    }
  },

  // Ajouter ou mettre à jour un réseau social
  async addOrUpdate(req, res) {
    try {
      const userId = req.params.userId;
      const { platform, ...data } = req.body;
      if (!platform) return res.status(400).json({ error: "Platform requise" });
      const network = await SocialNetworkService.addOrUpdate(userId, platform, data);
      res.json(network);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur ajout/mise à jour réseau social.' });
    }
  },

  // Vérifier la propriété d'un réseau social
  async verify(req, res) {
    try {
      const userId = req.params.userId;
      const { platform } = req.body;
      if (!platform) return res.status(400).json({ error: "Platform requise" });
      const result = await SocialNetworkService.verify(userId, platform);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur vérification réseau social.' });
    }
  },

  // Générer un nouveau code de vérification
  async regenerateCode(req, res) {
    try {
      const userId = req.params.userId;
      const { platform } = req.body;
      if (!platform) return res.status(400).json({ error: "Platform requise" });
      const result = await SocialNetworkService.regenerateCode(userId, platform);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur génération code.' });
    }
  },

  // Récupérer un réseau social précis
  async getOne(req, res) {
    try {
      const userId = req.params.userId;
      const platform = req.params.platform;
      if (!platform) return res.status(400).json({ error: "Platform requise" });
      const network = await SocialNetworkService.getOne(userId, platform);
      res.json(network);
    } catch (err) {
      res.status(400).json({ error: err.message || 'Erreur récupération réseau social.' });
    }
  }
};

export default socialNetworkController;