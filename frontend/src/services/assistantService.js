/**
 * assistantService – Achiri
 * Service centralisé pour l’assistant IA contextuel.
 * - Gère les interactions, suggestions, onboarding, feedback, accessibilité, sécurité.
 * - Prêt pour extensions futures (API IA, voix, logs, personnalisation, etc).
 */

// Exemple de réponse IA mock (à remplacer par appel API réel)
export async function getAssistantResponse(message, context = {}) {
    // Ici, tu pourrais intégrer une API IA (OpenAI, Azure, etc.)
    // Pour l’instant, réponse mockée pour la démo :
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: `👋 Bonjour ! Vous avez dit : "${message}". (Réponse IA à venir)`,
          suggestions: [
            "Comment utiliser Achiri ?",
            "Accessibilité et navigation",
            "Contacter le support",
          ],
          context,
          date: new Date().toISOString(),
        });
      }, 800);
    });
  }
  
  // Historique local des messages (mock, à remplacer par API ou IndexedDB)
  export function saveAssistantMessage(message) {
    try {
      const history = JSON.parse(localStorage.getItem("achiri-assistant-history") || "[]");
      history.unshift({ ...message, id: Date.now() });
      localStorage.setItem("achiri-assistant-history", JSON.stringify(history));
    } catch {
      // Optionnel : gestion d’erreur de stockage
    }
  }
  
  export function getAssistantHistory() {
    try {
      return JSON.parse(localStorage.getItem("achiri-assistant-history") || "[]");
    } catch {
      return [];
    }
  }
  
  export function clearAssistantHistory() {
    try {
      localStorage.removeItem("achiri-assistant-history");
    } catch {
      // Optionnel : gestion d’erreur de stockage
    }
  }
  
  /**
   * Documentation :
   * - getAssistantResponse(message, context) : réponse IA mock, prêt pour API.
   * - saveAssistantMessage(message), getAssistantHistory(), clearAssistantHistory() : gestion historique local.
   * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
   * - Accessibilité : prêt pour extensions (voix, onboarding, feedback, etc).
   * - Extensible, compatible mobile/web, SEO friendly (indirect).
   */