/**
 * contentScript.js – Achiri Extension
 * Script injecté dans la page web :
 * - Interagit avec le DOM pour accessibilité, lecture, IA, domotique, santé, etc.
 * - Communication bidirectionnelle avec background.js
 * - Injection de boutons/overlays IA selon le contexte métier
 * - Sécurité : pas de fuite de données, permissions strictes, nettoyage
 * - Accessibilité : ARIA, focus, clavier, couleurs, responsive
 * - Prêt pour extensions (multi-langues, badges, analytics, dark mode…)
 */

// Injecte un bouton d'accessibilité IA sur la page si non déjà présent
function injectAccessibilityButton() {
  if (document.getElementById("achiri-ia-btn")) return;
  const btn = document.createElement("button");
  btn.id = "achiri-ia-btn";
  btn.innerText = "👁️ IA Accessibilité";
  btn.setAttribute("aria-label", "Activer l'accessibilité IA");
  btn.setAttribute("title", "Activer l'accessibilité IA (Achiri)");
  btn.style.position = "fixed";
  btn.style.bottom = "24px";
  btn.style.right = "24px";
  btn.style.zIndex = 99999;
  btn.style.background = "#1976d2";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "50px";
  btn.style.padding = "1em 1.5em";
  btn.style.fontSize = "1.1em";
  btn.style.boxShadow = "0 2px 12px #1976d222";
  btn.style.cursor = "pointer";
  btn.style.transition = "background 0.18s, box-shadow 0.18s";
  btn.style.outline = "none";
  btn.tabIndex = 0;
  btn.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") btn.click();
  };
  btn.onfocus = () => btn.style.boxShadow = "0 0 0 3px #1976d288";
  btn.onblur = () => btn.style.boxShadow = "0 2px 12px #1976d222";
  btn.onclick = () => {
    chrome.runtime.sendMessage({
      type: "SHOW_NOTIFICATION",
      title: "Accessibilité IA",
      message: "Fonction IA d'accessibilité activée sur cette page !"
    });
    // Extension : déclencher analyse IA, lecture vocale, overlay, etc.
    chrome.runtime.sendMessage({
      type: "CALL_IA_API",
      url: "https://api.achiri.ai/vision/describe",
      body: { url: window.location.href },
      headers: {},
      method: "POST"
    });
  };
  document.body.appendChild(btn);
}

// Nettoyage du bouton à la navigation (SPA)
function removeAccessibilityButton() {
  const btn = document.getElementById("achiri-ia-btn");
  if (btn) btn.remove();
}

// Écoute les messages du background pour déclencher une action
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "INJECT_OVERLAY") {
    injectAccessibilityButton();
    sendResponse({ success: true });
  }
  if (request.type === "REMOVE_OVERLAY") {
    removeAccessibilityButton();
    sendResponse({ success: true });
  }
  // Ajoute ici d'autres actions métier (lecture, quiz, domotique, santé, badges…)
});

// Injection automatique au chargement de la page
window.addEventListener("DOMContentLoaded", injectAccessibilityButton);

// Nettoyage sur navigation (SPA, hashchange)
window.addEventListener("hashchange", () => {
  removeAccessibilityButton();
  setTimeout(injectAccessibilityButton, 300);
});
window.addEventListener("popstate", () => {
  removeAccessibilityButton();
  setTimeout(injectAccessibilityButton, 300);
});

/**
 * Documentation :
 * - Respecte l’accessibilité (ARIA, focus, clavier, couleurs, responsive)
 * - Sécurité : pas de fuite de données, nettoyage DOM, permissions strictes
 * - Prêt pour extensions (multi-langues, badges, analytics, dark mode…)
 * - Testé sur Chrome/Edge, compatible web/mobile (PWA, SPA)
 */