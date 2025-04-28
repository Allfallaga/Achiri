/**
 * popup.js
 * Script principal du popup de l'extension Achiri :
 * - Affiche l'état, les rôles, et les actions IA accessibles selon le contexte métier
 * - Permet de déclencher des fonctions IA (accessibilité, santé, domotique, etc.)
 */

document.addEventListener("DOMContentLoaded", async () => {
  const statusEl = document.getElementById("achiri-status");
  const roleEl = document.getElementById("achiri-role");
  const actionsEl = document.getElementById("achiri-actions");

  // Récupérer le rôle utilisateur depuis le background
  chrome.runtime.sendMessage({ type: "GET_USER_ROLE" }, (response) => {
    const role = response?.role || "user";
    roleEl.textContent = `Rôle : ${role}`;
    renderActions(role);
  });

  // Afficher les actions IA selon le rôle
  function renderActions(role) {
    actionsEl.innerHTML = "";

    // Accessibilité IA
    const btnAccess = document.createElement("button");
    btnAccess.textContent = "👁️ Accessibilité IA";
    btnAccess.setAttribute("aria-label", "Activer l'accessibilité IA sur la page");
    btnAccess.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "INJECT_OVERLAY" });
      });
    };
    actionsEl.appendChild(btnAccess);

    // Santé IA (exemple)
    if (role === "user" || role === "admin") {
      const btnHealth = document.createElement("button");
      btnHealth.textContent = "🩺 Suivi Santé";
      btnHealth.setAttribute("aria-label", "Afficher le module santé IA");
      btnHealth.onclick = () => {
        chrome.runtime.sendMessage({
          type: "SHOW_NOTIFICATION",
          title: "Santé IA",
          message: "Module santé IA (bientôt disponible sur web)"
        });
      };
      actionsEl.appendChild(btnHealth);
    }

    // Domotique IA (admin uniquement)
    if (role === "admin") {
      const btnDomotic = document.createElement("button");
      btnDomotic.textContent = "🏠 Domotique IA";
      btnDomotic.setAttribute("aria-label", "Envoyer une commande domotique IA");
      btnDomotic.onclick = () => {
        chrome.runtime.sendMessage({
          type: "SHOW_NOTIFICATION",
          title: "Domotique IA",
          message: "Commande domotique IA envoyée !"
        });
      };
      actionsEl.appendChild(btnDomotic);
    }
  }

  // Afficher l'état de connexion à l'extension
  statusEl.textContent = "Extension Achiri prête ✅";
});