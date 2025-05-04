/**
 * visionApi.js – Achiri
 * Mock d'API de vision par ordinateur pour la description d'image, détection d'objets, gestes, OCR, etc.
 * - Prêt pour intégration API réelle ultérieure.
 * - Sécurité, accessibilité, extensible, documentation claire.
 */

// Mock : description d'image (remplacez par appel API réel plus tard)
export async function describeImageMock(imageDataUrl) {
  // Simule une latence réseau
  await new Promise((resolve) => setTimeout(resolve, 1200));
  // Retourne une description factice
  return {
    description: "Une personne souriante devant un ordinateur portable, fond lumineux."
  };
}

// Mock : détection d'objets
export async function detectObjectsMock(imageDataUrl) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    objects: [
      { label: "ordinateur portable", confidence: 0.98 },
      { label: "personne", confidence: 0.95 }
    ]
  };
}

// Mock : détection de gestes
export async function detectGesturesMock(imageDataUrl) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    gestures: [
      { label: "main levée", confidence: 0.87 }
    ]
  };
}

// Mock : OCR (reconnaissance de texte)
export async function ocrTextMock(imageDataUrl) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    text: "Bienvenue sur Achiri !"
  };
}

// Mock : traduction langue des signes en texte
export async function signToTextMock(imageDataUrl) {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return {
    text: "Bonjour, comment puis-je vous aider ?"
  };
}

/**
 * Documentation :
 * - Chaque fonction simule une API IA de vision.
 * - Remplacez les mocks par des appels API réels pour production.
 * - Respecte la charte Achiri (sécurité, accessibilité, extensibilité).
 * - Prêt pour extensions futures (analyse d'image avancée, analytics, etc).
 */