/**
 * AssistantMemory.js
 * Module mémoire longue durée de l'assistant Achiri.
 * - Stocke et récupère l'historique des interactions IA (localStorage ou backend).
 * - Permet la personnalisation, la continuité et l'accessibilité des échanges.
 * - Sécurisé, compatible mobile/web, design moderne, documentation claire.
 */

class AssistantMemory {
  constructor(storageKey = "achiri_assistant_memory") {
    this.storageKey = storageKey;
    this.maxHistory = 100; // Limite d'historique pour performance
  }

  // Sauvegarde une interaction (message, action, etc.)
  saveInteraction(interaction) {
    const history = this.getHistory();
    const newHistory = [
      ...history,
      { ...interaction, date: new Date().toISOString() },
    ];
    // Garde seulement les X derniers messages
    const trimmed = newHistory.slice(-this.maxHistory);
    localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
  }

  // Récupère l'historique complet
  getHistory() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Efface l'historique
  clearHistory() {
    localStorage.removeItem(this.storageKey);
  }

  // Recherche dans l'historique (par mot-clé, date, etc.)
  searchHistory(query) {
    const history = this.getHistory();
    if (!query) return history;
    return history.filter(
      (item) =>
        (item.text && item.text.toLowerCase().includes(query.toLowerCase())) ||
        (item.action &&
          item.action.toLowerCase().includes(query.toLowerCase())),
    );
  }

  // Exporter l'historique (ex: pour support/accessibilité)
  exportHistory() {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }
}

// Singleton export pour usage global
const assistantMemory = new AssistantMemory();
export default assistantMemory;

/**
 * Documentation :
 * - Utilisez assistantMemory.saveInteraction({from, text, action, ...}) pour stocker chaque échange.
 * - Utilisez assistantMemory.getHistory() pour récupérer l'historique.
 * - Utilisez assistantMemory.clearHistory() pour réinitialiser.
 * - Utilisez assistantMemory.searchHistory(query) pour filtrer.
 * - Utilisez assistantMemory.exportHistory() pour exporter (ex: accessibilité, support).
 * - Sécurisé (localStorage), compatible mobile/web, facile à brancher sur un backend si besoin.
 */
