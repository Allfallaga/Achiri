/**
 * Service SocialNetwork : logique métier pour les réseaux sociaux utilisateurs.
 */

const SocialNetwork = require('../models/socialNetwork');

const SocialNetworkService = {
  // Récupérer tous les réseaux sociaux d'un utilisateur
  getAll(userId, cb) {
    SocialNetwork.getAllByUser(userId, cb);
  },

  // Ajouter ou mettre à jour un réseau social
  addOrUpdate(userId, platform, data, cb) {
    // Génère un code unique si besoin
    if (!data.code) {
      data.code = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    SocialNetwork.upsert(userId, platform, data, cb);
  },

  // Vérifier la propriété d'un réseau social
  verify(userId, platform, cb) {
    // Ici, tu peux ajouter la logique de vérification réelle (API, scraping, OAuth...)
    // Pour la démo, on valide directement
    SocialNetwork.setStatus(userId, platform, "verifie", (err, result) => {
      cb(err, result);
    });
  },

  // Générer un nouveau code de vérification
  regenerateCode(userId, platform, cb) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    SocialNetwork.setCode(userId, platform, code, cb);
  },

  // Récupérer un réseau social précis
  getOne(userId, platform, cb) {
    SocialNetwork.getOne(userId, platform, cb);
  }
};

module.exports = SocialNetworkService;