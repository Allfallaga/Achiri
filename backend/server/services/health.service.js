// Ici, tu peux brancher des objets connectés, une API santé, ou simuler pour la démo.

const healthDataStore = new Map(); // { userId: [ { heartRate, bloodPressure, glucose, activity, timestamp } ] }

const HealthService = {
  // Enregistre ou met à jour les données santé d'un utilisateur
  async saveHealthData({ userId, heartRate, bloodPressure, glucose, activity, timestamp }) {
    if (!userId) throw new Error("userId manquant");
    const entry = { heartRate, bloodPressure, glucose, activity, timestamp: timestamp || new Date().toISOString() };
    if (!healthDataStore.has(userId)) healthDataStore.set(userId, []);
    healthDataStore.get(userId).push(entry);
    return true;
  },

  // Récupère l'historique santé d'un utilisateur
  async getHealthHistory(userId) {
    if (!userId) throw new Error("userId manquant");
    return healthDataStore.get(userId) || [];
  },

  // Analyse les données santé et retourne des alertes ou conseils
  async analyzeHealth(userId) {
    const history = await this.getHealthHistory(userId);
    if (!history.length) return { alert: false, message: "Aucune donnée santé disponible." };

    const last = history[history.length - 1];
    let alerts = [];
    if (last.heartRate && (last.heartRate < 50 || last.heartRate > 120)) {
      alerts.push("Rythme cardiaque anormal détecté.");
    }
    if (last.bloodPressure && (last.bloodPressure > 140 || last.bloodPressure < 90)) {
      alerts.push("Tension artérielle hors norme.");
    }
    if (last.glucose && (last.glucose < 0.7 || last.glucose > 1.8)) {
      alerts.push("Glycémie anormale détectée.");
    }
    if (alerts.length) {
      return { alert: true, alerts, advice: "Consultez un professionnel de santé ou déclenchez une alerte d'urgence." };
    }
    return { alert: false, message: "Données santé dans la normale." };
  }
};

export default HealthService;