const Accessibility = require('../models/accessibility.js');

// Simulations simples pour LSF et TTS (à remplacer par vraies API IA plus tard)
function fakeLSFTranslation(text, cb) {
  // Ici tu pourrais appeler une vraie API IA ou retourner une vidéo/gif LSF
  cb(null, { lsf: `Traduction LSF simulée pour: "${text}"` });
}

function fakeTextToSpeech(text, lang, cb) {
  // Ici tu pourrais appeler une vraie API TTS (Google, Azure, etc.)
  cb(null, `/audio/fake-tts-${lang || 'fr'}-${Date.now()}.mp3`);
}

module.exports = {
  // Récupérer les paramètres d'accessibilité d'un utilisateur
  getByUserId: (userId, cb) => {
    Accessibility.getByUserId(userId, cb);
  },

  // Mettre à jour les paramètres d'accessibilité d'un utilisateur
  update: (userId, newSettings, cb) => {
    Accessibility.update(userId, newSettings, cb);
  },

  // Réinitialiser les paramètres d'accessibilité
  reset: (userId, cb) => {
    Accessibility.reset(userId, cb);
  },

  // ----------- NOUVELLES FONCTIONNALITÉS IA ACCESSIBILITÉ -----------

  // Traduction automatique en Langue des Signes Française (LSF)
  translateToLSF: (text, cb) => {
    fakeLSFTranslation(text, cb);
  },

  // Lecture vocale (Text-to-Speech)
  textToSpeech: (text, lang, cb) => {
    fakeTextToSpeech(text, lang, cb);
  }
};