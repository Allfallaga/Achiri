// Modèle CreatorTools avancé (stockage en mémoire, logique métier)
// Structure : { userId: { tools: [ { id, name, type, config, createdAt, updatedAt } ], presets: [ ... ] } }

const creatorTools = {}; // { userId: { tools: [...], presets: [...] } }
let nextToolId = 1;
let nextPresetId = 1;

module.exports = {
  // Initialiser les outils d'un utilisateur si besoin
  _initUser: (userId) => {
    if (!creatorTools[userId]) {
      creatorTools[userId] = {
        tools: [],
        presets: []
      };
    }
  },

  // Ajouter un outil personnalisé
  addTool: (userId, { name, type, config = {} }, cb) => {
    module.exports._initUser(userId);
    const tool = {
      id: nextToolId++,
      name,
      type, // ex: "audio", "video", "draw", "text", etc.
      config,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    creatorTools[userId].tools.push(tool);
    cb(null, tool);
  },

  // Modifier un outil
  updateTool: (userId, toolId, newData, cb) => {
    module.exports._initUser(userId);
    const tool = creatorTools[userId].tools.find(t => t.id === toolId);
    if (!tool) return cb(new Error("Outil non trouvé"));
    Object.assign(tool, newData, { updatedAt: new Date() });
    cb(null, tool);
  },

  // Supprimer un outil
  deleteTool: (userId, toolId, cb) => {
    module.exports._initUser(userId);
    creatorTools[userId].tools = creatorTools[userId].tools.filter(t => t.id !== toolId);
    cb(null, true);
  },

  // Lister tous les outils d'un utilisateur
  getTools: (userId, cb) => {
    module.exports._initUser(userId);
    cb(null, creatorTools[userId].tools);
  },

  // Ajouter un preset (modèle d'outil/config)
  addPreset: (userId, { name, config }, cb) => {
    module.exports._initUser(userId);
    const preset = {
      id: nextPresetId++,
      name,
      config,
      createdAt: new Date()
    };
    creatorTools[userId].presets.push(preset);
    cb(null, preset);
  },

  // Lister les presets
  getPresets: (userId, cb) => {
    module.exports._initUser(userId);
    cb(null, creatorTools[userId].presets);
  },

  // Supprimer un preset
  deletePreset: (userId, presetId, cb) => {
    module.exports._initUser(userId);
    creatorTools[userId].presets = creatorTools[userId].presets.filter(p => p.id !== presetId);
    cb(null, true);
  }
};