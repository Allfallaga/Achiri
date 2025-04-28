/**
 * visionApi.js
 * Service pour interagir avec les endpoints IA de vision du backend :
 * - /api/vision/describe
 * - /api/vision/detect-objects
 * - /api/vision/detect-gestures
 * - /api/vision/sign-to-text
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/vision";

const visionApi = {
  // Décrit une image (scène) via IA
  async describe({ image }) {
    const res = await fetch(`${API_URL}/describe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API vision/describe");
    }
    return await res.json();
  },

  // Détecte les objets présents sur une image
  async detectObjects({ image }) {
    const res = await fetch(`${API_URL}/detect-objects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API vision/detect-objects");
    }
    return await res.json();
  },

  // Détecte les gestes (ex: langue des signes, gestes main)
  async detectGestures({ image }) {
    const res = await fetch(`${API_URL}/detect-gestures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API vision/detect-gestures");
    }
    return await res.json();
  },

  // Traduit la langue des signes en texte (pour SignLanguageTranslator)
  async signToText({ image }) {
    const res = await fetch(`${API_URL}/sign-to-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API vision/sign-to-text");
    }
    return await res.json();
  },
};

export default visionApi;