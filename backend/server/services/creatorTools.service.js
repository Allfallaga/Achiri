const CreatorTools = require('../models/creatorTools.js');

module.exports = {
  // Ajouter un outil personnalisé
  addTool: (userId, toolData, cb) => {
    CreatorTools.addTool(userId, toolData, cb);
  },

  // Modifier un outil
  updateTool: (userId, toolId, newData, cb) => {
    CreatorTools.updateTool(userId, toolId, newData, cb);
  },

  // Supprimer un outil
  deleteTool: (userId, toolId, cb) => {
    CreatorTools.deleteTool(userId, toolId, cb);
  },

  // Lister tous les outils d'un utilisateur
  getTools: (userId, cb) => {
    CreatorTools.getTools(userId, cb);
  },

  // Ajouter un preset (modèle d'outil/config)
  addPreset: (userId, presetData, cb) => {
    CreatorTools.addPreset(userId, presetData, cb);
  },

  // Lister les presets
  getPresets: (userId, cb) => {
    CreatorTools.getPresets(userId, cb);
  },

  // Supprimer un preset
  deletePreset: (userId, presetId, cb) => {
    CreatorTools.deletePreset(userId, presetId, cb);
  }
};