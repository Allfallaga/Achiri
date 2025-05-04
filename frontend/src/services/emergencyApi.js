// Service mock pour la gestion des urgences (aucun appel réseau)

/**
 * sendEmergencyAlertMock
 * - Simule l'envoi d'une alerte d'urgence
 * @param {string} userId
 * @param {string} type
 * @param {string} details
 * @returns {Promise<{success: boolean, alertId: number, type: string, details: string, timestamp: string}>}
 */
export async function sendEmergencyAlertMock(userId, type, details) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
        alertId: Math.floor(Math.random() * 10000),
        type,
        details,
        timestamp: new Date().toISOString(),
      });
    }, 700)
  );
}

/**
 * getEmergencyHistoryMock
 * - Simule la récupération de l'historique des alertes d'urgence
 * @param {string} userId
 * @returns {Promise<Array<{id: number, type: string, details: string, timestamp: string}>>}
 */
export async function getEmergencyHistoryMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "médicale",
          details: "Chute détectée",
          timestamp: "2025-04-25T10:15:00Z",
        },
        {
          id: 2,
          type: "incendie",
          details: "Détecteur de fumée déclenché",
          timestamp: "2025-04-20T18:30:00Z",
        },
      ]);
    }, 600)
  );
}