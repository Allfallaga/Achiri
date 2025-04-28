/**
 * socialApi.js
 * Service pour interagir avec les endpoints réseaux sociaux IA du backend :
 * - /api/social-networks/:userId (récupération, génération, publication de contenu)
 * - /api/social-networks/:userId/verify (vérification de compte)
 * - /api/social-networks/:userId/regenerate-code (régénération de code)
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/social-networks";

const socialApi = {
  // Génère du contenu IA pour un réseau social donné
  async generateContent({ userId, platform, prompt }) {
    const res = await fetch(`${API_URL}/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, prompt }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API social-networks/generateContent");
    }
    return await res.json();
  },

  // Récupère les réseaux sociaux liés à l'utilisateur
  async getAll(userId) {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API social-networks/getAll");
    }
    return await res.json();
  },

  // Vérifie un compte social (ex: code SMS/email)
  async verify({ userId, platform, code }) {
    const res = await fetch(`${API_URL}/${userId}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, code }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API social-networks/verify");
    }
    return await res.json();
  },

  // Régénère un code de vérification pour un réseau social
  async regenerateCode({ userId, platform }) {
    const res = await fetch(`${API_URL}/${userId}/regenerate-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API social-networks/regenerate-code");
    }
    return await res.json();
  },

  // Récupère les infos d'un réseau social précis
  async getOne(userId, platform) {
    const res = await fetch(`${API_URL}/${userId}/${platform}`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API social-networks/getOne");
    }
    return await res.json();
  },
};

export default socialApi;