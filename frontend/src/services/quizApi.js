/**
 * quizApi – Achiri
 * Service pour gérer les quiz IA interactifs (QuizBot).
 * - Gestion des questions, réponses, feedback, score, accessibilité, sécurité.
 * - Prêt pour extensions futures (backend réel, stats, badges, export, multi-joueurs, etc).
 * - Compatible mobile/web, UX avancée.
 */

const fakeQuestions = [
  {
    id: "q1",
    text: "Quelle est la capitale de la France ?",
    answer: "Paris",
    explanation: "Paris est la capitale et la plus grande ville de la France.",
    difficulty: "facile",
    tags: ["géographie", "France"],
  },
  {
    id: "q2",
    text: "Combien font 7 x 8 ?",
    answer: "56",
    explanation: "7 multiplié par 8 donne 56.",
    difficulty: "facile",
    tags: ["maths", "multiplication"],
  },
  {
    id: "q3",
    text: "Quel est l’élément chimique O ?",
    answer: "Oxygène",
    explanation: "O est le symbole chimique de l’oxygène.",
    difficulty: "moyen",
    tags: ["chimie", "science"],
  },
];

let currentIndex = 0;

const quizApi = {
  /**
   * getQuestion
   * Retourne une nouvelle question (tourne dans la liste)
   * @param {Object} params { classroomId?: string, userId?: string, difficulty?: string, tags?: Array<string> }
   * @returns {Promise<{id: string, text: string, difficulty: string, tags: Array<string>}>}
   */
  async getQuestion({ classroomId, userId, difficulty, tags } = {}) {
    // Filtrage par difficulté ou tags si fourni
    let questions = fakeQuestions;
    if (difficulty) {
      questions = questions.filter((q) => q.difficulty === difficulty);
    }
    if (tags && tags.length) {
      questions = questions.filter((q) =>
        tags.some((tag) => q.tags.includes(tag)),
      );
    }
    if (!questions.length) questions = fakeQuestions;
    const question = questions[currentIndex % questions.length];
    currentIndex++;
    return {
      id: question.id,
      text: question.text,
      difficulty: question.difficulty,
      tags: question.tags,
    };
  },

  /**
   * submitAnswer
   * Vérifie la réponse et retourne feedback, correction, score, explication
   * @param {Object} params { classroomId?: string, userId?: string, questionId: string, answer: string }
   * @returns {Promise<{feedback: string, correct: boolean, correction: string, score: number, explanation: string}>}
   */
  async submitAnswer({ classroomId, userId, questionId, answer }) {
    const question = fakeQuestions.find((q) => q.id === questionId);
    const isCorrect =
      question && answer.trim().toLowerCase() === question.answer.toLowerCase();
    return {
      feedback: isCorrect ? "Bonne réponse !" : "Mauvaise réponse.",
      correct: isCorrect,
      correction: `La bonne réponse est : ${question ? question.answer : "?"}.`,
      score: isCorrect ? 1 : 0,
      explanation: question ? question.explanation : "",
    };
  },

  /**
   * getAllQuestions
   * Retourne toutes les questions disponibles (pour stats, admin, etc)
   * @returns {Promise<Array>}
   */
  async getAllQuestions() {
    return fakeQuestions.map((q) => ({
      id: q.id,
      text: q.text,
      answer: q.answer,
      explanation: q.explanation,
      difficulty: q.difficulty,
      tags: q.tags,
    }));
  },
};

export default quizApi;

/**
 * Documentation :
 * - getQuestion({classroomId, userId, difficulty, tags}) : question adaptée.
 * - submitAnswer({classroomId, userId, questionId, answer}) : feedback, correction, score, explication.
 * - getAllQuestions() : liste complète pour stats/admin.
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
 * - Accessibilité : prêt pour extensions (audio, vocal, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
