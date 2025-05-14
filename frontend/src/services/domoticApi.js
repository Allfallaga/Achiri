/**
 * domoticApi – Achiri
 * Service centralisé pour la domotique (mock).
 * - Gestion des appareils, contrôle, ajout, suppression, accessibilité, sécurité, responsive.
 * - Prêt pour extensions futures (API réelle, scénarios, notifications, logs, export, etc).
 * - Compatible mobile/web, UX avancée.
 */

/**
 * getDevicesMock
 * - Simule la récupération des appareils domotiques d'un utilisateur
 * @param {string} userId
 * @returns {Promise<Array<{id:number, name:string, type:string, status:string}>>}
 */
export async function getDevicesMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, name: "Lampe Salon", type: "light", status: "on" },
        { id: 2, name: "Prise Cuisine", type: "plug", status: "off" },
        { id: 3, name: "Thermostat", type: "thermostat", status: "22°C" },
      ]);
    }, 600),
  );
}

/**
 * controlDeviceMock
 * - Simule le contrôle d'un appareil domotique
 * @param {string} userId
 * @param {number} deviceId
 * @param {string} action
 * @returns {Promise<{success: boolean, deviceId: number, action: string}>}
 */
export async function controlDeviceMock(userId, deviceId, action) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: true, deviceId, action });
    }, 400),
  );
}

/**
 * addDeviceMock
 * - Simule l'ajout d'un appareil domotique
 * @param {string} userId
 * @param {{id:number, name:string, type:string, status:string}} device
 * @returns {Promise<{success: boolean, device: object}>}
 */
export async function addDeviceMock(userId, device) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: true, device });
    }, 400),
  );
}

/**
 * removeDeviceMock
 * - Simule la suppression d'un appareil domotique
 * @param {string} userId
 * @param {number} deviceId
 * @returns {Promise<{success: boolean, deviceId: number}>}
 */
export async function removeDeviceMock(userId, deviceId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: true, deviceId });
    }, 400),
  );
}

/**
 * getDeviceTypesMock
 * - Simule la récupération des types d'appareils disponibles
 * @returns {Promise<Array<{type: string, label: string, icon: string}>>}
 */
export async function getDeviceTypesMock() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { type: "light", label: "Lampe", icon: "💡" },
        { type: "plug", label: "Prise", icon: "🔌" },
        { type: "thermostat", label: "Thermostat", icon: "🌡️" },
        { type: "camera", label: "Caméra", icon: "📷" },
        { type: "door", label: "Porte", icon: "🚪" },
      ]);
    }, 300),
  );
}

/**
 * Documentation :
 * - getDevicesMock(userId) : liste des appareils domotiques.
 * - controlDeviceMock(userId, deviceId, action) : contrôle d’un appareil.
 * - addDeviceMock(userId, device) : ajout d’un appareil.
 * - removeDeviceMock(userId, deviceId) : suppression d’un appareil.
 * - getDeviceTypesMock() : types d’appareils disponibles.
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
 * - Accessibilité : prêt pour extensions (icônes, labels, vocal, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
