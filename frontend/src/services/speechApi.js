/**
 * speechApi.js
 * Service pour interagir avec les endpoints IA de parole du backend :
 * - /api/speech/tts (synthèse vocale)
 * - /api/speech/transcribe (transcription audio → texte)
 * - /api/speech/emotion (détection d'émotion vocale)
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/speech";

const speechApi = {
  // Synthèse vocale (texte → audio)
  async synthesize({ text, lang = "fr-FR" }) {
    const res = await fetch(`${API_URL}/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API speech/tts");
    }
    return await res.json(); // { audioUrl: ... }
  },

  // Transcription audio (audio → texte)
  async transcribe({ audio }) {
    const res = await fetch(`${API_URL}/transcribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audio }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API speech/transcribe");
    }
    return await res.json(); // { text: ... }
  },

  // Détection d'émotion dans la voix
  async detectEmotion({ audio }) {
    const res = await fetch(`${API_URL}/emotion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audio }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API speech/emotion");
    }
    return await res.json(); // { emotion: ... }
  },
};

export default speechApi;