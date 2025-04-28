const VirtualClassroom = require('../models/virtualClassroom.js');

module.exports = {
  // Créer une nouvelle classe virtuelle
  create: (data, cb) => {
    VirtualClassroom.create(data, cb);
  },

  // Récupérer toutes les classes
  getAll: (cb) => {
    VirtualClassroom.all(cb);
  },

  // Récupérer une classe par ID
  getById: (id, cb) => {
    VirtualClassroom.getById(id, cb);
  },

  // Ajouter un utilisateur à une classe
  addUser: (id, userId, cb) => {
    VirtualClassroom.addUser(id, userId, cb);
  },

  // Retirer un utilisateur d'une classe
  removeUser: (id, userId, cb) => {
    VirtualClassroom.removeUser(id, userId, cb);
  },

  // Ajouter un message à une classe
  addMessage: (id, message, cb) => {
    VirtualClassroom.addMessage(id, message, cb);
  },

  // Ajouter une ressource à une classe
  addResource: (id, resource, cb) => {
    VirtualClassroom.addResource(id, resource, cb);
  },

  // Ajouter un événement au planning
  addScheduleEvent: (id, event, cb) => {
    VirtualClassroom.addScheduleEvent(id, event, cb);
  },

  // Modifier les infos de la classe
  update: (id, data, cb) => {
    VirtualClassroom.update(id, data, cb);
  },

  // Supprimer une classe
  delete: (id, cb) => {
    VirtualClassroom.delete(id, cb);
  },

  // ----------- NOUVELLES FONCTIONNALITÉS QUIZ/JEUX -----------

  // Ajouter un quiz à une classe
  addQuiz: (id, quiz, cb) => {
    VirtualClassroom.addQuiz(id, quiz, cb);
  },

  // Soumettre les réponses à un quiz
  submitQuiz: (id, userId, answers, cb) => {
    VirtualClassroom.submitQuiz(id, userId, answers, cb);
  },

  // Voir les scores d'une classe
  getScores: (id, cb) => {
    VirtualClassroom.getScores(id, cb);
  }
};