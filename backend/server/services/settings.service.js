const Settings = require('../models/settings.js');

module.exports = {
  // Récupérer les paramètres d'un utilisateur
  getSettings: (userId, cb) => {
    Settings.getByUserId(userId, cb);
  },

  // Mettre à jour les paramètres d'un utilisateur (partiel ou complet)
  updateSettings: (userId, newSettings, cb) => {
    Settings.update(userId, newSettings, cb);
  },

  // Mettre à jour une section spécifique (audio, privacy, etc.)
  updateSection: (userId, section, sectionData, cb) => {
    Settings.updateSection(userId, section, sectionData, cb);
  },

  // Réinitialiser les paramètres d'un utilisateur
  reset: (userId, cb) => {
    Settings.reset(userId, cb);
  },

  // Récupérer tous les paramètres (admin)
  getAll: (cb) => {
    Settings.getAll(cb);
  }
};