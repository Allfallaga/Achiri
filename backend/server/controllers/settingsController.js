const SettingsService = require('../services/settings.service.js');

// Récupérer les paramètres d'un utilisateur
exports.getSettings = (req, res) => {
  const userId = req.params.userId;
  SettingsService.getSettings(userId, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// Mettre à jour les paramètres d'un utilisateur (partiel ou complet)
exports.updateSettings = (req, res) => {
  const userId = req.params.userId;
  SettingsService.updateSettings(userId, req.body, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// Mettre à jour une section spécifique (audio, privacy, etc.)
exports.updateSection = (req, res) => {
  const userId = req.params.userId;
  const { section, sectionData } = req.body;
  SettingsService.updateSection(userId, section, sectionData, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// Réinitialiser les paramètres d'un utilisateur
exports.reset = (req, res) => {
  const userId = req.params.userId;
  SettingsService.reset(userId, (err, settings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(settings);
  });
};

// Récupérer tous les paramètres (admin)
exports.getAll = (req, res) => {
  SettingsService.getAll((err, allSettings) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(allSettings);
  });
};