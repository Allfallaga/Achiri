/**
 * quizApi.js
 * Service pour gérer les quiz IA interactifs (QuizBot).
 * À connecter à un backend réel ou à enrichir selon la logique métier.
 */

const fakeQuestions = [
  {
    id: "q1",
    text: "Quelle est la capitale de la France ?",
    answer: "Paris",
  },
  {
    id: "q2",
    text: "Combien font 7 x 8 ?",
    answer: "56",
  },
  {
    id: "q3",
    text: "Quel est l’élément chimique O ?",
    answer: "Oxygène",
  },
];

let currentIndex = 0;

const quizApi = {
  // Retourne une nouvelle question (tourne dans la liste)
  async getQuestion({ classroomId, userId }) {
    // TODO: Connecter à un backend réel ou enrichir la logique métier
    const question = fakeQuestions[currentIndex % fakeQuestions.length];
    currentIndex++;
    return {
      id: question.id,
      text: question.text,
    };
  },

  // Vérifie la réponse et retourne feedback, correction, score
  async submitAnswer({ classroomId, userId, questionId, answer }) {
    // TODO: Connecter à un backend réel ou enrichir la logique métier
    const question = fakeQuestions.find(q => q.id === questionId);
    const isCorrect =
      question && answer.trim().toLowerCase() === question.answer.toLowerCase();
    return {
      feedback: isCorrect ? "Bonne réponse !" : "Mauvaise réponse.",
      correct: isCorrect,
      correction: `La bonne réponse est : ${question ? question.answer : "?"}.`,
      score: isCorrect ? 1 : 0,
    };
  },
};

export default quizApi;