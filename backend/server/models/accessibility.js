// Modèle Accessibility avancé (stockage en mémoire, logique métier)
// Structure : { userId: { fontSize, highContrast, screenReader, dyslexicFont, customColors, lastUpdate } }

const accessibility = {}; // { userId: { ...settings } }

const defaultAccessibility = {
  fontSize: 'medium',         // "small", "medium", "large"
  highContrast: false,
  screenReader: false,
  dyslexicFont: false,
  customColors: null,         // { background, text, link, ... }
  lastUpdate: null
};

module.exports = {
  // Récupérer les paramètres d'accessibilité d'un utilisateur
  getByUserId: (userId, cb) => {
    if (!accessibility[userId]) {
      accessibility[userId] = { ...defaultAccessibility, lastUpdate: new Date() };
    }
    cb(null, accessibility[userId]);
  },

  // Mettre à jour les paramètres d'accessibilité d'un utilisateur
  update: (userId, newSettings, cb) => {
    if (!accessibility[userId]) {
      accessibility[userId] = { ...defaultAccessibility, lastUpdate: new Date() };
    }
    accessibility[userId] = {
      ...accessibility[userId],
      ...newSettings,
      lastUpdate: new Date()
    };
    cb(null, accessibility[userId]);
  },

  // Réinitialiser les paramètres d'accessibilité
  reset: (userId, cb) => {
    accessibility[userId] = { ...defaultAccessibility, lastUpdate: new Date() };
    cb(null, accessibility[userId]);
  }
};