// Ici, tu peux brancher un service SMS/appel (Twilio, etc.) ou simuler pour la démo.

const emergencyAlertStore = new Map(); // { userId: [ { location, type, healthData, timestamp } ] }

const EmergencyService = {
  // Déclenche une alerte d'urgence et l'enregistre
  async triggerAlert({ userId, location, type, healthData }) {
    if (!userId || !location) throw new Error("userId ou localisation manquant");
    const alert = {
      location,
      type: type || "inconnue",
      healthData: healthData || null,
      timestamp: new Date().toISOString()
    };
    if (!emergencyAlertStore.has(userId)) emergencyAlertStore.set(userId, []);
    emergencyAlertStore.get(userId).push(alert);

    // TODO: Appeler un vrai service d'envoi d'alerte (SMS, appel, notification)
    // Exemple de réponse simulée :
    return { sent: true, alert };
  },

  // Récupère l'historique des alertes d'un utilisateur
  async getAlertHistory(userId) {
    if (!userId) throw new Error("userId manquant");
    return emergencyAlertStore.get(userId) || [];
  }
};

export default EmergencyService;