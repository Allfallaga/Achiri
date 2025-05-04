/**
 * accessibilityApi – Achiri
 * API pour la gestion de l’accessibilité et de l’inclusion numérique.
 * - Traduction LSF, lecture vocale, contraste, préférences, accessibilité avancée, sécurité.
 * - Prêt pour extensions futures (audio description, navigation clavier, export, feedback, notifications, etc).
 * - Compatible mobile/web, UX avancée.
 */

// Traduction en LSF (Langue des Signes Française)
export async function translateToLSF(text, userId) {
  const res = await fetch("/api/accessibility/lsf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la traduction LSF");
  return await res.json();
}

// Lecture vocale (TTS)
export async function textToSpeech(text, userId) {
  const res = await fetch("/api/accessibility/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la lecture vocale");
  return await res.json();
}

// Changement du contraste (mode sombre/clair)
export async function setContrastMode(userId, mode = "auto") {
  const res = await fetch("/api/accessibility/contrast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, mode }),
  });
  if (!res.ok) throw new Error("Erreur lors du changement de contraste");
  return await res.json();
}

// Préférences d’accessibilité utilisateur (taille police, focus, etc)
export async function setAccessibilityPreferences(userId, preferences = {}) {
  const res = await fetch("/api/accessibility/preferences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, preferences }),
  });
  if (!res.ok) throw new Error("Erreur lors de la sauvegarde des préférences");
  return await res.json();
}

// Récupérer les préférences d’accessibilité utilisateur
export async function getAccessibilityPreferences(userId) {
  const res = await fetch(`/api/accessibility/preferences/${userId}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des préférences");
  return await res.json();
}

/**
 * Documentation :
 * - translateToLSF(text, userId) : traduction texte → LSF (langue des signes).
 * - textToSpeech(text, userId) : lecture vocale (TTS).
 * - setContrastMode(userId, mode) : mode contraste (sombre/clair/auto).
 * - setAccessibilityPreferences(userId, preferences), getAccessibilityPreferences(userId) : gestion préférences.
 * - Sécurité : requêtes sécurisées, gestion des erreurs, pas d’info sensible côté client.
 * - Accessibilité : prêt pour extensions (audio description, navigation clavier, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */