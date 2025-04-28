// Modèle Settings avancé (stockage en mémoire, logique métier)
// Chaque utilisateur a ses propres paramètres personnalisés et options avancées

const settings = {}; // { userId: { ...settings } }

const defaultSettings = {
  theme: 'light',                // "light" ou "dark"
  notifications: true,           // notifications activées
  language: 'fr',                // langue de l'interface
  privacy: {
    profileVisible: true,        // profil public ou privé
    showEmail: false
  },
  accessibility: {
    fontSize: 'medium',          // "small", "medium", "large"
    highContrast: false
  },
  audio: {
    volume: 70,                  // volume par défaut
    muted: false
  },
  shortcuts: {
    enabled: true,
    custom: {}                   // raccourcis personnalisés
  },
  dashboardLayout: 'default',    // ou "compact", "extended"
  lastUpdate: null
};

module.exports = {
  // Récupérer les paramètres d'un utilisateur
  getByUserId: (userId, cb) => {
    if (!settings[userId]) {
      settings[userId] = { ...defaultSettings, lastUpdate: new Date() };
    }
    cb(null, settings[userId]);
  },

  // Mettre à jour les paramètres d'un utilisateur (partiel ou complet)
  update: (userId, newSettings, cb) => {
    if (!settings[userId]) {
      settings[userId] = { ...defaultSettings, lastUpdate: new Date() };
    }
    settings[userId] = {
      ...settings[userId],
      ...newSettings,
      lastUpdate: new Date()
    };
    cb(null, settings[userId]);
  },

  // Mettre à jour une section spécifique (ex: "audio", "privacy", etc.)
  updateSection: (userId, section, sectionData, cb) => {
    if (!settings[userId]) {
      settings[userId] = { ...defaultSettings, lastUpdate: new Date() };
    }
    settings[userId][section] = {
      ...settings[userId][section],
      ...sectionData
    };
    settings[userId].lastUpdate = new Date();
    cb(null, settings[userId]);
  },

  // Réinitialiser les paramètres d'un utilisateur
  reset: (userId, cb) => {
    settings[userId] = { ...defaultSettings, lastUpdate: new Date() };
    cb(null, settings[userId]);
  },

  // Récupérer tous les paramètres (admin)
  getAll: (cb) => {
    cb(null, settings);
  }
};