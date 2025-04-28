import DomoticService from '../services/domotic.service.js';

const domoticController = {
  // Liste tous les appareils connectés de l'utilisateur
  async listDevices(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: 'userId manquant.' });
      }
      const devices = await DomoticService.getDevices(userId);
      res.json({ devices });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur récupération appareils.' });
    }
  },

  // Contrôle un appareil (ex : allumer/éteindre, changer mode)
  async controlDevice(req, res) {
    try {
      const { userId, deviceId, action, params } = req.body;
      if (!userId || !deviceId || !action) {
        return res.status(400).json({ message: 'Paramètres manquants.' });
      }
      const result = await DomoticService.controlDevice({ userId, deviceId, action, params });
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur contrôle appareil.' });
    }
  },

  // Ajoute un nouvel appareil à la liste de l'utilisateur
  async addDevice(req, res) {
    try {
      const { userId, deviceInfo } = req.body;
      if (!userId || !deviceInfo) {
        return res.status(400).json({ message: 'Paramètres manquants.' });
      }
      const device = await DomoticService.addDevice(userId, deviceInfo);
      res.json({ success: true, device });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur ajout appareil.' });
    }
  },

  // Supprime un appareil de la liste de l'utilisateur
  async removeDevice(req, res) {
    try {
      const { userId, deviceId } = req.body;
      if (!userId || !deviceId) {
        return res.status(400).json({ message: 'Paramètres manquants.' });
      }
      await DomoticService.removeDevice(userId, deviceId);
      res.json({ success: true, message: 'Appareil supprimé.' });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur suppression appareil.' });
    }
  }
};

export default domoticController;