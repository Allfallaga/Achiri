const ChallengesService = require('../services/challenges.service.js');

// Créer un nouveau challenge
exports.create = (req, res) => {
  ChallengesService.create(req.body, (err, challenge) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(challenge);
  });
};

// Récupérer tous les challenges
exports.getAll = (req, res) => {
  ChallengesService.getAll((err, challenges) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(challenges);
  });
};

// Récupérer un challenge par ID
exports.getById = (req, res) => {
  ChallengesService.getById(req.params.id, (err, challenge) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(challenge);
  });
};

// Participer à un challenge
exports.join = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  ChallengesService.join(id, userId, (err, challenge) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(challenge);
  });
};

// Soumettre une participation
exports.submit = (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;
  ChallengesService.submit(id, userId, content, (err, submission) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(submission);
  });
};

// Noter une soumission
exports.scoreSubmission = (req, res) => {
  const { id } = req.params;
  const { userId, score } = req.body;
  ChallengesService.scoreSubmission(id, userId, score, (err, submission) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(submission);
  });
};

// Fermer un challenge
exports.close = (req, res) => {
  const { id } = req.params;
  ChallengesService.close(id, (err, challenge) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(challenge);
  });
};

// Supprimer un challenge
exports.delete = (req, res) => {
  const { id } = req.params;
  ChallengesService.delete(id, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};