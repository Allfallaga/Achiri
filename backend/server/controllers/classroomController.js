import ClassroomService from '../services/classroom.service.js';

const classroomController = {
  // Génère un quiz IA à partir d'un thème ou d'un document
  async generateQuiz(req, res) {
    try {
      const { theme, document } = req.body;
      if (!theme && !document) {
        return res.status(400).json({ message: 'Thème ou document manquant.' });
      }
      const quiz = await ClassroomService.generateQuiz({ theme, document });
      res.json({ quiz });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur génération quiz.' });
    }
  },

  // Vérifie la validité d'un document ou d'une info (fact-checking IA)
  async factCheck(req, res) {
    try {
      const { document, url } = req.body;
      if (!document && !url) {
        return res.status(400).json({ message: 'Document ou URL manquant.' });
      }
      const result = await ClassroomService.factCheck({ document, url });
      res.json({ result });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur fact-checking.' });
    }
  },

  // Résume automatiquement un cours ou une discussion
  async summarize(req, res) {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Contenu manquant.' });
      }
      const summary = await ClassroomService.summarize(content);
      res.json({ summary });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur résumé.' });
    }
  },

  // Veille technologique automatique sur un thème
  async techWatch(req, res) {
    try {
      const { theme } = req.body;
      if (!theme) {
        return res.status(400).json({ message: 'Thème manquant.' });
      }
      const news = await ClassroomService.techWatch(theme);
      res.json({ news });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur veille technologique.' });
    }
  }
};

export default classroomController;