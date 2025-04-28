// Modèle VirtualClassroom avancé (stockage en mémoire, logique métier)
// Structure : { id: { id, name, description, owner, users, messages, resources, schedule, quiz, scores, createdAt, updatedAt } }
const classrooms = {};
let nextId = 1;

module.exports = {
  // Créer une nouvelle classe virtuelle
  create: (data, cb) => {
    const id = nextId++;
    classrooms[id] = {
      id,
      name: data.name || `Classe #${id}`,
      description: data.description || '',
      owner: data.owner || null,
      users: data.users || [],
      messages: [],
      resources: [], // fichiers, liens, docs partagés
      schedule: data.schedule || [], // [{ date, topic, notes }]
      quiz: [], // [{ id, question, options, answer }]
      scores: {}, // { userId: { score, answers: [...] } }
      createdAt: new Date(),
      updatedAt: new Date()
    };
    cb(null, classrooms[id]);
  },

  // Récupérer toutes les classes
  all: (cb) => {
    cb(null, Object.values(classrooms));
  },

  // Récupérer une classe par ID
  getById: (id, cb) => {
    cb(null, classrooms[id] || null);
  },

  // Ajouter un utilisateur à une classe
  addUser: (id, userId, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    if (!classrooms[id].users.includes(userId)) {
      classrooms[id].users.push(userId);
      classrooms[id].updatedAt = new Date();
    }
    cb(null, classrooms[id]);
  },

  // Retirer un utilisateur d'une classe
  removeUser: (id, userId, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    classrooms[id].users = classrooms[id].users.filter(u => u !== userId);
    classrooms[id].updatedAt = new Date();
    cb(null, classrooms[id]);
  },

  // Ajouter un message à une classe
  addMessage: (id, message, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    classrooms[id].messages.push({
      ...message,
      date: new Date()
    });
    classrooms[id].updatedAt = new Date();
    cb(null, classrooms[id]);
  },

  // Ajouter une ressource (fichier, lien, etc.)
  addResource: (id, resource, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    classrooms[id].resources.push({
      ...resource,
      addedAt: new Date()
    });
    classrooms[id].updatedAt = new Date();
    cb(null, classrooms[id]);
  },

  // Ajouter un événement au planning
  addScheduleEvent: (id, event, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    classrooms[id].schedule.push({
      ...event,
      createdAt: new Date()
    });
    classrooms[id].updatedAt = new Date();
    cb(null, classrooms[id]);
  },

  // Modifier les infos de la classe
  update: (id, data, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    classrooms[id] = {
      ...classrooms[id],
      ...data,
      updatedAt: new Date()
    };
    cb(null, classrooms[id]);
  },

  // Supprimer une classe
  delete: (id, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    delete classrooms[id];
    cb(null, true);
  },

  // ----------- NOUVELLES FONCTIONNALITÉS QUIZ/JEUX -----------

  // Ajouter un quiz à la classe
  addQuiz: (id, quiz, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    classrooms[id].quiz.push({
      ...quiz,
      id: classrooms[id].quiz.length + 1
    });
    classrooms[id].updatedAt = new Date();
    cb(null, classrooms[id].quiz);
  },

  // Participer à un quiz (soumettre réponses)
  submitQuiz: (id, userId, answers, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    const quiz = classrooms[id].quiz;
    let score = 0;
    if (quiz.length && Array.isArray(answers)) {
      quiz.forEach((q, idx) => {
        if (answers[idx] && answers[idx] === q.answer) score++;
      });
    }
    classrooms[id].scores[userId] = {
      score,
      answers,
      date: new Date()
    };
    classrooms[id].updatedAt = new Date();
    cb(null, { score, total: quiz.length });
  },

  // Voir les scores d'une classe
  getScores: (id, cb) => {
    if (!classrooms[id]) return cb(new Error("Classe non trouvée"));
    cb(null, classrooms[id].scores);
  }
};