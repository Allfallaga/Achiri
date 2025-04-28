/**
 * background.js
 * Service worker principal de l'extension Achiri :
 * - Gère les messages entre popup, contentScript et backend
 * - Gère l'auth, les rôles, et les appels API IA
 * - Peut injecter des scripts ou déclencher des notifications
 */

// Installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("Achiri Extension installée !");
});

// Gestion des messages entrants depuis popup ou contentScript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_USER_ROLE") {
    // Récupérer le rôle utilisateur (stocké localement ou via API)
    chrome.storage.local.get(["userRole"], (result) => {
      sendResponse({ role: result.userRole || "user" });
    });
    return true; // async
  }

  if (request.type === "CALL_IA_API") {
    // Relayer un appel API IA (vision, speech, etc.)
    fetch(request.url, {
      method: request.method || "POST",
      headers: { "Content-Type": "application/json", ...request.headers },
      body: JSON.stringify(request.body),
    })
      .then(res => res.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true; // async
  }

  if (request.type === "SHOW_NOTIFICATION") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: request.title || "Achiri IA",
      message: request.message || "",
    });
    sendResponse({ success: true });
    return true;
  }

  // Ajoute ici d'autres types de messages métier (ex: domotique, santé, accessibilité)
  if (request.type === "DOMOTIC_ACTION") {
    // Exemple : relayer une action domotique
    // Ici, on simule une réponse immédiate
    sendResponse({ success: true, action: request.action });
    return true;
  }

  if (request.type === "HEALTH_ALERT") {
    // Exemple : traiter une alerte santé
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Alerte Santé",
      message: request.message || "Nouvelle alerte santé détectée.",
    });
    sendResponse({ success: true });
    return true;
  }
});

// Écouter les changements de rôle utilisateur
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.userRole) {
    // Notifier les pages de l'extension du changement de rôle
    chrome.runtime.sendMessage({
      type: "USER_ROLE_CHANGED",
      role: changes.userRole.newValue,
    });
  }
});