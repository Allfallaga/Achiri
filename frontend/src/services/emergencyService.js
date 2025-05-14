/**
 * emergencyService – Achiri
 * Service centralisé pour la gestion des urgences.
 * - Déclenchement d’alertes, gestion des contacts, logs, accessibilité, sécurité.
 * - Prêt pour extensions futures (API réelle, notifications, export, feedback, etc).
 * - Compatible mobile/web, UX avancée.
 */

/**
 * triggerEmergencyMock
 * - Simule le déclenchement d'une urgence
 * @param {Object} params { type: string, message: string }
 * @returns {Promise<{success: boolean, type: string, message: string, date: string}>}
 */
export async function triggerEmergencyMock({ type, message }) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
        type,
        message,
        date: new Date().toISOString(),
      });
    }, 600),
  );
}

/**
 * getEmergencyContactsMock
 * - Simule la récupération des contacts d'urgence
 * @returns {Promise<Array<{id: number, name: string, phone: string, relation: string}>>}
 */
export async function getEmergencyContactsMock() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, name: "Samu", phone: "15", relation: "Urgence médicale" },
        { id: 2, name: "Police", phone: "17", relation: "Sécurité" },
        { id: 3, name: "Pompiers", phone: "18", relation: "Incendie" },
      ]);
    }, 400),
  );
}

/**
 * addEmergencyContactMock
 * - Simule l’ajout d’un contact d’urgence
 * @param {{name: string, phone: string, relation: string}} contact
 * @returns {Promise<{success: boolean, contact: object}>}
 */
export async function addEmergencyContactMock(contact) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
        contact: { ...contact, id: Date.now() },
      });
    }, 400),
  );
}

/**
 * removeEmergencyContactMock
 * - Simule la suppression d’un contact d’urgence
 * @param {number} contactId
 * @returns {Promise<{success: boolean, contactId: number}>}
 */
export async function removeEmergencyContactMock(contactId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: true, contactId });
    }, 400),
  );
}

/**
 * getEmergencyLogsMock
 * - Simule la récupération des logs d’urgence
 * @returns {Promise<Array<{id: number, type: string, message: string, date: string, action: string}>>}
 */
export async function getEmergencyLogsMock() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "medical",
          message: "Urgence médicale déclenchée",
          date: "2024-05-01T10:00:00Z",
          action: "trigger",
        },
        {
          id: 2,
          type: "security",
          message: "Contact police ajouté",
          date: "2024-05-01T11:00:00Z",
          action: "addContact",
        },
      ]);
    }, 400),
  );
}

/**
 * sendEmergencyNotificationMock
 * - Simule l’envoi d’une notification d’urgence (prêt pour extension réelle)
 * @param {Object} params { type: string, message: string, contacts?: Array }
 * @returns {Promise<{success: boolean, notified: boolean}>}
 */
export async function sendEmergencyNotificationMock({
  type,
  message,
  contacts = [],
}) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
        notified: true,
      });
    }, 500),
  );
}

/**
 * Documentation :
 * - triggerEmergencyMock({type, message}) : déclenche une urgence simulée.
 * - getEmergencyContactsMock() : liste des contacts d’urgence.
 * - addEmergencyContactMock(contact), removeEmergencyContactMock(contactId) : gestion des contacts.
 * - getEmergencyLogsMock() : historique des actions d’urgence.
 * - sendEmergencyNotificationMock({type, message, contacts}) : notification d’urgence (mock).
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
 * - Accessibilité : prêt pour extensions (notifications, vocal, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
