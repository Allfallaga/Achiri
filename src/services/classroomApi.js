// Service mock pour la classe virtuelle et l'IA éducative (aucun appel réseau)

/**
 * quizMock
 * - Simule un quiz pour une classe
 * @param {string} classroomId
 * @param {string} userId
 * @returns {Promise<{questions: Array}>}
 */
export async function quizMock(classroomId, userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        questions: [
          {
            id: "q1",
            text: "Quelle est la capitale de la France ?",
            choices: ["Paris", "Lyon", "Marseille"],
            answer: "Paris",
          },
          {
            id: "q2",
            text: "Combien font 5 x 3 ?",
            choices: ["8", "15", "10"],
            answer: "15",
          },
        ],
      });
    }, 600)
  );
}

/**
 * factCheckMock
 * - Simule une vérification de faits
 * @param {string} text
 * @returns {Promise<{original: string, verdict: string, confidence: number, explanation: string}>}
 */
export async function factCheckMock(text) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        original: text,
        verdict: "vrai",
        confidence: 0.92,
        explanation: "L'affirmation est correcte selon les sources officielles.",
      });
    }, 700)
  );
}

/**
 * summarizeMock
 * - Simule un résumé de texte
 * @param {string} text
 * @returns {Promise<{summary: string}>}
 */
export async function summarizeMock(text) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        summary: "Ceci est un résumé simulé du texte fourni.",
      });
    }, 500)
  );
}

/**
 * techWatchMock
 * - Simule une veille technologique
 * @param {string} topic
 * @returns {Promise<{topic: string, news: Array}>}
 */
export async function techWatchMock(topic) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        topic,
        news: [
          { title: "Nouvelle avancée IA", date: "2025-04-25" },
          { title: "Lancement d'une plateforme inclusive", date: "2025-04-24" },
        ],
      });
    }, 700)
  );
}