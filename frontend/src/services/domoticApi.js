/**
 * domoticApi.js
 * Service pour interagir avec les endpoints domotique IA du backend :
 * - /api/domotic/:userId/devices (liste des appareils)
 * - /api/domotic/control (contrôle d'un appareil)
 * - /api/domotic/add (ajout d'un appareil)
 * - /api/domotic/remove (suppression d'un appareil)
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/domotic";

const domoticApi = {
  // Liste les appareils connectés d'un utilisateur
  async listDevices(userId) {
    const res = await fetch(`${API_URL}/${userId}/devices`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API domotic/devices");
    }
    return await res.json();
  },

  // Contrôle un appareil (on/off/toggle/status...)
  async controlDevice({ userId, deviceId, command }) {
    const res = await fetch(`${API_URL}/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, deviceId, command }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API domotic/control");
    }
    return await res.json();
  },

  // Ajoute un nouvel appareil
  async addDevice({ userId, name, type }) {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name, type }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API domotic/add");
    }
    return await res.json();
  },

  // Supprime un appareil
  async removeDevice({ userId, deviceId }) {
    const res = await fetch(`${API_URL}/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, deviceId }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API domotic/remove");
    }
    return await res.json();
  },
};

export default domoticApi;