// Ici, tu peux brancher une vraie API IA (OpenAI, Azure, etc.) ou simuler pour la démo.

const classroomQuizStore = new Map(); // { theme: [ quiz ] }
const classroomFactCheckStore = new Map(); // { url/document: result }
const classroomSummaryStore = new Map(); // { content: summary }
const classroomTechWatchStore = new Map(); // { theme: [ news ] }

const ClassroomService = {
  // Génère un quiz IA à partir d'un thème ou d'un document
  async generateQuiz({ theme, document }) {
    // TODO: Appeler une vraie API IA ici
    // Exemple de quiz simulé :
    const quiz = [
      { question: "Qu'est-ce que l'intelligence artificielle ?", choices: ["Un robot", "Un algorithme", "Une voiture"], answer: "Un algorithme" },
      { question: "Quel langage est populaire pour l'IA ?", choices: ["Python", "PHP", "HTML"], answer: "Python" }
    ];
    if (theme) classroomQuizStore.set(theme, quiz);
    return quiz;
  },

  // Vérifie la validité d'un document ou d'une info (fact-checking IA)
  async factCheck({ document, url }) {
    // TODO: Appeler une vraie API IA ici
    // Exemple de réponse simulée :
    const result = {
      valid: true,
      sources: ["https://fr.wikipedia.org/wiki/Intelligence_artificielle"],
      message: "Le document semble fiable et à jour."
    };
    classroomFactCheckStore.set(document || url, result);
    return result;
  },

  // Résume automatiquement un cours ou une discussion
  async summarize(content) {
    // TODO: Appeler une vraie API IA ici
    // Exemple de résumé simulé :
    const summary = "Ce cours présente les bases de l'intelligence artificielle et ses applications.";
    classroomSummaryStore.set(content, summary);
    return summary;
  },

  // Veille technologique automatique sur un thème
  async techWatch(theme) {
    // TODO: Appeler une vraie API d'actualités ici
    // Exemple de news simulées :
    const news = [
      { title: "Nouveaux progrès en IA générative", url: "https://www.lemonde.fr/ia" },
      { title: "L'IA révolutionne la santé", url: "https://www.sciencesetavenir.fr/ia-sante" }
    ];
    classroomTechWatchStore.set(theme, news);
    return news;
  }
};

export default ClassroomService;