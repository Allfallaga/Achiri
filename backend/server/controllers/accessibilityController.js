const AccessibilityService = require('../services/accessibility.service.js');

// Récupérer les paramètres d'accessibilité d'un utilisateur
exports.getByUserId = (req, res) => {
  const userId = req.params.userId;
  AccessibilityService.getByUserId(userId, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// Mettre à jour les paramètres d'accessibilité d'un utilisateur
exports.update = (req, res) => {
  const userId = req.params.userId;
  AccessibilityService.update(userId, req.body, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// Réinitialiser les paramètres d'accessibilité
exports.reset = (req, res) => {
  const userId = req.params.userId;
  AccessibilityService.reset(userId, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// ----------- NOUVELLES FONCTIONNALITÉS IA ACCESSIBILITÉ -----------

// Traduction automatique en Langue des Signes Française (LSF)
exports.translateToLSF = (req, res) => {
  const { text } = req.body;
  AccessibilityService.translateToLSF(text, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(result);
  });
};

// Lecture vocale (Text-to-Speech)
exports.textToSpeech = (req, res) => {
  const { text, lang } = req.body;
  AccessibilityService.textToSpeech(text, lang, (err, audioUrl) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ audioUrl });
  });
};