/**
 * healthApi.js
 * Service pour interagir avec les endpoints santé IA du backend :
 * - /api/health/monitor (données santé en temps réel)
 * - /api/health/:userId/history (historique santé)
 * - /api/health/analyze (analyse IA des données santé)
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/health";

const healthApi = {
  // Récupère les données santé en temps réel (ex : fréquence cardiaque, stress, sommeil)
  async monitor({ userId }) {
    const res = await fetch(`${API_URL}/monitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API health/monitor");
    }
    return await res.json();
  },

  // Récupère l'historique santé d'un utilisateur
  async getHistory(userId) {
    const res = await fetch(`${API_URL}/${userId}/history`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API health/history");
    }
    return await res.json();
  },

  // Analyse IA des données santé
  async analyze({ userId }) {
    const res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API health/analyze");
    }
    return await res.json();
  },
};

export default healthApi;