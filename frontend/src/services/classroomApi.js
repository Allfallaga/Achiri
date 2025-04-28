/**
 * classroomApi.js
 * Service pour interagir avec les endpoints classroom IA du backend :
 * - /api/classroom/quiz (génération de quiz IA)
 * - /api/classroom/factcheck (correction IA)
 * - /api/classroom/summarize (résumé IA)
 * - /api/classroom/techwatch (veille technologique IA)
 */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/classroom";

const classroomApi = {
  // Génère un quiz IA sur un sujet donné
  async generateQuiz({ topic, userId }) {
    const res = await fetch(`${API_URL}/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, userId }),
    });
    if (!res.ok) {
      // Gestion d'erreur améliorée pour UX
      const error = await res.text();
      throw new Error(error || "Erreur API classroom/quiz");
    }
    return await res.json();
  },

  // Correction/fact-check IA d'un quiz
  async factCheck({ quiz, answers, userId }) {
    const res = await fetch(`${API_URL}/factcheck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz, answers, userId }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API classroom/factcheck");
    }
    return await res.json();
  },

  // Résumé IA d'un texte ou d'un cours
  async summarize({ text, userId }) {
    const res = await fetch(`${API_URL}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API classroom/summarize");
    }
    return await res.json();
  },

  // Veille technologique IA sur un sujet
  async techWatch({ topic, userId }) {
    const res = await fetch(`${API_URL}/techwatch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, userId }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erreur API classroom/techwatch");
    }
    return await res.json();
  },
};

export default classroomApi;