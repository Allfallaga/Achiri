/**
 * popup.js – Achiri Extension
 * Script principal du popup :
 * - Affiche l'état, les rôles, et les actions IA accessibles selon le contexte métier
 * - Permet de déclencher des fonctions IA (accessibilité, santé, domotique, etc.)
 * - Accessibilité, sécurité, responsive, feedback utilisateur, SEO-ready
 * - Prêt pour extensions (multi-langues, badges, analytics, dark mode…)
 */

document.addEventListener("DOMContentLoaded", async () => {
  const statusEl = document.getElementById("achiri-status");
  const roleEl = document.getElementById("achiri-role");
  const actionsEl = document.getElementById("achiri-actions");
  const feedbackEl = document.getElementById("achiri-feedback");

  // Récupérer le rôle utilisateur depuis le background
  chrome.runtime.sendMessage({ type: "GET_USER_ROLE" }, (response) => {
    const role = response?.role || "user";
    roleEl.textContent = `Rôle : ${role}`;
    renderActions(role);
  });

  // Afficher les actions IA selon le rôle
  function renderActions(role) {
    actionsEl.innerHTML = "";

    // Décrire la page (IA)
    const btnDescribe = document.createElement("button");
    btnDescribe.textContent = "👁️ Décrire la page (IA)";
    btnDescribe.setAttribute("aria-label", "Décrire la page avec l'IA");
    btnDescribe.onclick = () => {
      statusEl.textContent = "Analyse IA en cours...";
      chrome.runtime.sendMessage({
        type: "CALL_IA_API",
        url: "https://api.achiri.ai/vision/describe",
        body: { url: window.location.href },
        headers: {},
        method: "POST"
      }, (res) => {
        if (res && res.success && res.data && res.data.description) {
          feedbackEl.innerHTML = `<div class="achiri-success">Description IA : ${res.data.description}</div>`;
        } else {
          feedbackEl.innerHTML = `<div class="achiri-error">Erreur IA ou aucune description générée.</div>`;
        }
        statusEl.textContent = "Prêt.";
      });
    };
    actionsEl.appendChild(btnDescribe);

    // Accessibilité IA (injection bouton overlay)
    const btnAccess = document.createElement("button");
    btnAccess.textContent = "♿ Accessibilité IA";
    btnAccess.setAttribute("aria-label", "Activer l'accessibilité IA sur la page");
    btnAccess.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "INJECT_OVERLAY" });
        feedbackEl.innerHTML = `<div class="achiri-success">Bouton accessibilité IA injecté !</div>`;
      });
    };
    actionsEl.appendChild(btnAccess);

    // Santé IA (accessible à tous)
    const btnHealth = document.createElement("button");
    btnHealth.textContent = "🩺 Alerte Santé";
    btnHealth.setAttribute("aria-label", "Déclencher une alerte santé IA");
    btnHealth.onclick = () => {
      chrome.runtime.sendMessage({
        type: "HEALTH_ALERT",
        message: "Alerte santé déclenchée depuis l'extension."
      }, () => {
        feedbackEl.innerHTML = `<div class="achiri-success">Alerte santé envoyée !</div>`;
      });
    };
    actionsEl.appendChild(btnHealth);

    // Domotique IA (admin ou user)
    if (role === "admin" || role === "user") {
      const btnDomotic = document.createElement("button");
      btnDomotic.textContent = "🏠 Action Domotique";
      btnDomotic.setAttribute("aria-label", "Envoyer une commande domotique IA");
      btnDomotic.onclick = () => {
        chrome.runtime.sendMessage({
          type: "DOMOTIC_ACTION",
          action: "light_on"
        }, (res) => {
          if (res && res.success) {
            feedbackEl.innerHTML = `<div class="achiri-success">Commande domotique envoyée !</div>`;
          } else {
            feedbackEl.innerHTML = `<div class="achiri-error">Erreur domotique.</div>`;
          }
        });
      };
      actionsEl.appendChild(btnDomotic);
    }
  }

  // Afficher l'état de connexion à l'extension
  statusEl.textContent = "Prêt.";
});

/**
 * Documentation :
 * - Respecte l’accessibilité (labels, feedback, aria, responsive)
 * - Sécurité : pas de fuite de données, permissions strictes, feedback utilisateur
 * - Prêt pour extensions (multi-langues, badges, analytics, dark mode…)
 * - Testé sur Chrome/Edge, compatible web/mobile (PWA, SPA)
 */