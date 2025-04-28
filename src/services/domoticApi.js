// Service mock pour la domotique (aucun appel réseau)

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
    }, 600)
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
    }, 400)
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
    }, 400)
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
    }, 400)
  );
}