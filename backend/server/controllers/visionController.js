import VisionService from '../services/vision.service.js';

const visionController = {
  // Décrit une image envoyée (ex: pour les aveugles)
  async describe(req, res) {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ message: 'Image manquante.' });
      }
      const description = await VisionService.describeImage(imageBase64);
      res.json({ description });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur IA vision.' });
    }
  },

  // Détecte les objets dans une image
  async detectObjects(req, res) {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ message: 'Image manquante.' });
      }
      const objects = await VisionService.detectObjects(imageBase64);
      res.json({ objects });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur détection objets.' });
    }
  },

  // Détecte les gestes (pour la langue des signes ou navigation gestuelle)
  async detectGestures(req, res) {
    try {
      const { videoBase64 } = req.body;
      if (!videoBase64) {
        return res.status(400).json({ message: 'Vidéo manquante.' });
      }
      const gestures = await VisionService.detectGestures(videoBase64);
      res.json({ gestures });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur détection gestes.' });
    }
  }
};

export default visionController;