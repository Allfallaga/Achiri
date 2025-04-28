/**
 * emergencyApi.js
 * Service pour interagir avec les endpoints d'urgence du backend :
 * - /api/emergency/alert (envoi d'une alerte d'urgence)
 * - /api/emergency/:userId/history (historique des alertes)
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/emergency";

const emergencyApi = {
  // Envoie une alerte d'urgence
  async alert({ userId, timestamp }) {
    const res = await fetch(`${API_URL}/alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, timestamp }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API emergency/alert");
    }
    return await res.json();
  },

  // Récupère l'historique des alertes d'urgence pour un utilisateur
  async getHistory(userId) {
    const res = await fetch(`${API_URL}/${userId}/history`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API emergency/history");
    }
    return await res.json();
  },
};

export default emergencyApi;