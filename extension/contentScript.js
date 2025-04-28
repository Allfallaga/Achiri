/**
 * contentScript.js
 * Script injecté dans la page web par l'extension Achiri :
 * - Permet d'interagir avec le DOM pour accessibilité, lecture, IA, etc.
 * - Peut envoyer/recevoir des messages avec background.js
 * - Peut injecter des boutons ou overlays IA selon le contexte métier
 */

// Injecte un bouton d'accessibilité IA sur la page si non déjà présent
function injectAccessibilityButton() {
  if (document.getElementById("achiri-ia-btn")) return;
  const btn = document.createElement("button");
  btn.id = "achiri-ia-btn";
  btn.innerText = "👁️ IA Accessibilité";
  btn.setAttribute("aria-label", "Activer l'accessibilité IA");
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
    // Ici, tu peux déclencher une analyse IA, lecture vocale, etc.
  };
  document.body.appendChild(btn);
}

// Écoute les messages du background pour déclencher une action
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "INJECT_OVERLAY") {
    injectAccessibilityButton();
    sendResponse({ success: true });
  }
  // Ajoute ici d'autres actions métier (lecture, quiz, domotique, etc.)
});

// Injection automatique au chargement de la page
window.addEventListener("DOMContentLoaded", injectAccessibilityButton);