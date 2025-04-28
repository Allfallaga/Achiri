const CreatorToolsService = require('../services/creatorTools.service.js');

// Ajouter un outil personnalisé
exports.addTool = (req, res) => {
  const userId = req.params.userId;
  CreatorToolsService.addTool(userId, req.body, (err, tool) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(tool);
  });
};

// Modifier un outil
exports.updateTool = (req, res) => {
  const userId = req.params.userId;
  const toolId = parseInt(req.params.toolId);
  CreatorToolsService.updateTool(userId, toolId, req.body, (err, tool) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(tool);
  });
};

// Supprimer un outil
exports.deleteTool = (req, res) => {
  const userId = req.params.userId;
  const toolId = parseInt(req.params.toolId);
  CreatorToolsService.deleteTool(userId, toolId, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};

// Lister tous les outils d'un utilisateur
exports.getTools = (req, res) => {
  const userId = req.params.userId;
  CreatorToolsService.getTools(userId, (err, tools) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(tools);
  });
};

// Ajouter un preset (modèle d'outil/config)
exports.addPreset = (req, res) => {
  const userId = req.params.userId;
  CreatorToolsService.addPreset(userId, req.body, (err, preset) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(preset);
  });
};

// Lister les presets
exports.getPresets = (req, res) => {
  const userId = req.params.userId;
  CreatorToolsService.getPresets(userId, (err, presets) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(presets);
  });
};

// Supprimer un preset
exports.deletePreset = (req, res) => {
  const userId = req.params.userId;
  const presetId = parseInt(req.params.presetId);
  CreatorToolsService.deletePreset(userId, presetId, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};