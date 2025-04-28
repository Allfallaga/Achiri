/**
 * notificationService.js
 * Service pour gérer les notifications locales et push sur mobile (React Native).
 * Utilise expo-notifications (expo >= 44 recommandé).
 */

import * as Notifications from "expo-notifications";

// Gestion moderne des permissions (expo-permissions est déprécié)
const notificationService = {
  // Demander la permission d'envoyer des notifications
  async requestPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  },

  // Envoyer une notification locale immédiate
  async sendLocalNotification({ title, body, data }) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: null,
    });
  },

  // Planifier une notification locale dans X secondes
  async scheduleNotification({ title, body, data, seconds }) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: { seconds, repeats: false },
    });
  },

  // Obtenir le token push Expo (pour notifications push)
  async getPushToken() {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;
    if (finalStatus !== "granted") {
      const { status: askStatus } = await Notifications.requestPermissionsAsync();
      finalStatus = askStatus;
    }
    if (finalStatus !== "granted") {
      throw new Error("Permission de notification refusée.");
    }
    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  },

  // Gérer la réception des notifications (callback)
  setNotificationHandler(onReceive) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    Notifications.addNotificationReceivedListener(onReceive);
  },
};

export default notificationService;