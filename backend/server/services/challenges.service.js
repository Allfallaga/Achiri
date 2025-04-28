const Challenge = require('../models/challenge.js');

module.exports = {
  // Créer un nouveau challenge
  create: (data, cb) => {
    Challenge.create(data, cb);
  },

  // Récupérer tous les challenges
  getAll: (cb) => {
    Challenge.all(cb);
  },

  // Récupérer un challenge par ID
  getById: (id, cb) => {
    Challenge.getById(id, cb);
  },

  // Participer à un challenge
  join: (id, userId, cb) => {
    Challenge.join(id, userId, cb);
  },

  // Soumettre une participation
  submit: (id, userId, content, cb) => {
    Challenge.submit(id, userId, content, cb);
  },

  // Noter une soumission
  scoreSubmission: (id, userId, score, cb) => {
    Challenge.scoreSubmission(id, userId, score, cb);
  },

  // Fermer un challenge
  close: (id, cb) => {
    Challenge.close(id, cb);
  },

  // Supprimer un challenge
  delete: (id, cb) => {
    Challenge.delete(id, cb);
  }
};