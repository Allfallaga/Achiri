// Ici, tu peux brancher des APIs domotique réelles (Philips Hue, SmartThings, etc.) ou simuler pour la démo.

const domoticStore = new Map(); // { userId: [ { deviceId, name, type, state, params } ] }

const DomoticService = {
  // Liste tous les appareils connectés de l'utilisateur
  async getDevices(userId) {
    if (!userId) throw new Error("userId manquant");
    return domoticStore.get(userId) || [];
  },

  // Contrôle un appareil (ex : allumer/éteindre, changer mode)
  async controlDevice({ userId, deviceId, action, params }) {
    if (!userId || !deviceId || !action) throw new Error("Paramètres manquants");
    const devices = domoticStore.get(userId) || [];
    const device = devices.find(d => d.deviceId === deviceId);
    if (!device) throw new Error("Appareil non trouvé");
    // Simuler le changement d'état
    device.state = action;
    if (params) device.params = { ...device.params, ...params };
    return { deviceId, newState: device.state, params: device.params };
  },

  // Ajoute un nouvel appareil à la liste de l'utilisateur
  async addDevice(userId, deviceInfo) {
    if (!userId || !deviceInfo) throw new Error("Paramètres manquants");
    const devices = domoticStore.get(userId) || [];
    const deviceId = deviceInfo.deviceId || `dev-${Date.now()}`;
    const newDevice = { ...deviceInfo, deviceId, state: deviceInfo.state || "off", params: deviceInfo.params || {} };
    devices.push(newDevice);
    domoticStore.set(userId, devices);
    return newDevice;
  },

  // Supprime un appareil de la liste de l'utilisateur
  async removeDevice(userId, deviceId) {
    if (!userId || !deviceId) throw new Error("Paramètres manquants");
    const devices = domoticStore.get(userId) || [];
    const filtered = devices.filter(d => d.deviceId !== deviceId);
    domoticStore.set(userId, filtered);
    return true;
  }
};