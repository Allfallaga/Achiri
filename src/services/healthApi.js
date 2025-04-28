// Service mock pour la santé (aucun appel réseau)

/**
 * monitorHealthMock
 * - Simule la récupération des données de santé en temps réel
 * @param {string} userId
 * @returns {Promise<{heartRate: number, bloodPressure: string, temperature: number, steps: number, timestamp: string}>}
 */
export async function monitorHealthMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        heartRate: 72,
        bloodPressure: "120/80",
        temperature: 36.8,
        steps: 5400,
        timestamp: new Date().toISOString(),
      });
    }, 700)
  );
}

/**
 * getHealthHistoryMock
 * - Simule l'historique des données de santé
 * @param {string} userId
 * @returns {Promise<Array<{date: string, heartRate: number, steps: number}>>}
 */
export async function getHealthHistoryMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { date: "2025-04-25", heartRate: 70, steps: 6000 },
        { date: "2025-04-24", heartRate: 74, steps: 5200 },
        { date: "2025-04-23", heartRate: 71, steps: 4800 },
      ]);
    }, 600)
  );
}

/**
 * analyzeHealthMock
 * - Simule une analyse de données de santé
 * @param {string} userId
 * @param {object} data
 * @returns {Promise<{summary: string, riskLevel: string, recommendations: Array<string>}>}
 */
export async function analyzeHealthMock(userId, data) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        summary: "Votre santé est stable. Continuez ainsi !",
        riskLevel: "faible",
        recommendations: [
          "Continuez à marcher régulièrement.",
          "Hydratez-vous bien.",
        ],
      });
    }, 800)
  );
}