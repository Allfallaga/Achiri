const VirtualClassroomService = require('../services/virtualClassroom.service.js');

// Créer une nouvelle classe virtuelle
exports.create = (req, res) => {
  VirtualClassroomService.create(req.body, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(classroom);
  });
};

// Récupérer toutes les classes
exports.getAll = (req, res) => {
  VirtualClassroomService.getAll((err, classrooms) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classrooms);
  });
};

// Récupérer une classe par ID
exports.getById = (req, res) => {
  VirtualClassroomService.getById(req.params.id, (err, classroom) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(classroom);
  });
};

// Ajouter un utilisateur à une classe
exports.addUser = (req, res) => {
  VirtualClassroomService.addUser(req.params.id, req.body.userId, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classroom);
  });
};

// Retirer un utilisateur d'une classe
exports.removeUser = (req, res) => {
  VirtualClassroomService.removeUser(req.params.id, req.body.userId, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classroom);
  });
};

// Ajouter un message à une classe
exports.addMessage = (req, res) => {
  VirtualClassroomService.addMessage(req.params.id, req.body, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classroom);
  });
};

// Ajouter une ressource à une classe
exports.addResource = (req, res) => {
  VirtualClassroomService.addResource(req.params.id, req.body, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classroom);
  });
};

// Ajouter un événement au planning
exports.addScheduleEvent = (req, res) => {
  VirtualClassroomService.addScheduleEvent(req.params.id, req.body, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classroom);
  });
};

// Modifier les infos de la classe
exports.update = (req, res) => {
  VirtualClassroomService.update(req.params.id, req.body, (err, classroom) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(classroom);
  });
};

// Supprimer une classe
exports.delete = (req, res) => {
  VirtualClassroomService.delete(req.params.id, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};

// ----------- NOUVELLES FONCTIONNALITÉS QUIZ/JEUX -----------

// Ajouter un quiz à une classe
exports.addQuiz = (req, res) => {
  VirtualClassroomService.addQuiz(req.params.id, req.body, (err, quiz) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(quiz);
  });
};

// Soumettre les réponses à un quiz
exports.submitQuiz = (req, res) => {
  const userId = req.body.userId;
  const answers = req.body.answers;
  VirtualClassroomService.submitQuiz(req.params.id, userId, answers, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(result);
  });
};

// Voir les scores d'une classe
exports.getScores = (req, res) => {
  VirtualClassroomService.getScores(req.params.id, (err, scores) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(scores);
  });
};