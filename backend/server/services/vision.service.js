// Ici, tu peux brancher une vraie API IA (Azure, Google, OpenAI, etc.)
// Pour la démo, on simule les réponses IA.

const VisionService = {
    // Décrit une image (pour accessibilité aveugle)
    async describeImage(imageBase64) {
      // TODO: Appeler une vraie API IA ici
      // Exemple de réponse simulée :
      return "Une personne souriante assise devant un ordinateur portable dans un salon lumineux.";
    },
  
    // Détecte les objets dans une image
    async detectObjects(imageBase64) {
      // TODO: Appeler une vraie API IA ici
      // Exemple de réponse simulée :
      return [
        { label: "ordinateur portable", confidence: 0.98 },
        { label: "personne", confidence: 0.95 },
        { label: "canapé", confidence: 0.80 }
      ];
    },
  
    // Détecte les gestes dans une vidéo (pour langue des signes ou navigation gestuelle)
    async detectGestures(videoBase64) {
      // TODO: Appeler une vraie API IA ici
      // Exemple de réponse simulée :
      return [
        { gesture: "main levée", timestamp: 2.1 },
        { gesture: "signe OK", timestamp: 4.7 }
      ];
    }
  };
  
  export default VisionService;