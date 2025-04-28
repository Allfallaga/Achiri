/**
 * bluetoothService.js
 * Service pour gérer la connexion et la communication Bluetooth sur mobile (React Native).
 * Utilise react-native-ble-plx ou expo-bluetooth pour la gestion BLE.
 */

import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();

const bluetoothService = {
  // Scanner les périphériques BLE à proximité
  async scanDevices(onDeviceFound, onError) {
    try {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          if (onError) onError(error);
          return;
        }
        if (device && onDeviceFound) onDeviceFound(device);
      });
    } catch (err) {
      if (onError) onError(err);
    }
  },

  // Arrêter le scan BLE
  stopScan() {
    manager.stopDeviceScan();
  },

  // Se connecter à un périphérique BLE par son id
  async connectToDevice(deviceId) {
    try {
      const device = await manager.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      return device;
    } catch (err) {
      throw new Error("Connexion Bluetooth échouée.");
    }
  },

  // Lire une caractéristique BLE
  async readCharacteristic(device, serviceUUID, characteristicUUID) {
    try {
      const characteristic = await device.readCharacteristicForService(serviceUUID, characteristicUUID);
      return characteristic.value;
    } catch (err) {
      throw new Error("Lecture Bluetooth échouée.");
    }
  },

  // Écrire une valeur sur une caractéristique BLE
  async writeCharacteristic(device, serviceUUID, characteristicUUID, valueBase64) {
    try {
      await device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, valueBase64);
      return true;
    } catch (err) {
      throw new Error("Écriture Bluetooth échouée.");
    }
  },

  // Déconnexion
  async disconnect(deviceId) {
    try {
      await manager.cancelDeviceConnection(deviceId);
    } catch (err) {
      // Ignorer l'erreur si déjà déconnecté
    }
  },
};

export default bluetoothService;