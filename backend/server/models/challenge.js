// Modèle Challenge avancé (stockage en mémoire, logique métier)
// Structure : { id: { id, title, description, creator, participants, submissions, status, rewards, createdAt, updatedAt, deadline } }

const challenges = {};
let nextId = 1;

module.exports = {
  // Créer un nouveau challenge
  create: (data, cb) => {
    const id = nextId++;
    challenges[id] = {
      id,
      title: data.title || `Challenge #${id}`,
      description: data.description || '',
      creator: data.creator || null,
      participants: [],
      submissions: [], // [{ userId, content, date, score }]
      status: 'open', // "open", "closed", "archived"
      rewards: data.rewards || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deadline: data.deadline || null
    };
    cb(null, challenges[id]);
  },

  // Récupérer tous les challenges
  all: (cb) => {
    cb(null, Object.values(challenges));
  },

  // Récupérer un challenge par ID
  getById: (id, cb) => {
    cb(null, challenges[id] || null);
  },

  // Participer à un challenge
  join: (id, userId, cb) => {
    if (!challenges[id]) return cb(new Error("Challenge non trouvé"));
    if (!challenges[id].participants.includes(userId)) {
      challenges[id].participants.push(userId);
      challenges[id].updatedAt = new Date();
    }
    cb(null, challenges[id]);
  },

  // Soumettre une participation
  submit: (id, userId, content, cb) => {
    if (!challenges[id]) return cb(new Error("Challenge non trouvé"));
    const submission = {
      userId,
      content,
      date: new Date(),
      score: null // à évaluer plus tard
    };
    challenges[id].submissions.push(submission);
    challenges[id].updatedAt = new Date();
    cb(null, submission);
  },

  // Noter une soumission
  scoreSubmission: (id, userId, score, cb) => {
    if (!challenges[id]) return cb(new Error("Challenge non trouvé"));
    const sub = challenges[id].submissions.find(s => s.userId === userId);
    if (!sub) return cb(new Error("Soumission non trouvée"));
    sub.score = score;
    challenges[id].updatedAt = new Date();
    cb(null, sub);
  },

  // Fermer un challenge
  close: (id, cb) => {
    if (!challenges[id]) return cb(new Error("Challenge non trouvé"));
    challenges[id].status = "closed";
    challenges[id].updatedAt = new Date();
    cb(null, challenges[id]);
  },

  // Supprimer un challenge
  delete: (id, cb) => {
    if (!challenges[id]) return cb(new Error("Challenge non trouvé"));
    delete challenges[id];
    cb(null, true);
  }
};