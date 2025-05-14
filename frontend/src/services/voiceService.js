/**
 * voiceService – Achiri
 * Service centralisé pour la gestion de la voix (micro, écoute, commandes, accessibilité).
 * - Activation/désactivation micro, écoute, commandes vocales, accessibilité, sécurité.
 * - Prêt pour extensions futures (API réelle, multi-langues, feedback, logs, export, etc).
 * - Compatible mobile/web, UX avancée.
 */

/**
 * startListeningMock
 * - Simule le démarrage de l’écoute micro
 * @param {Object} [options] { lang: string }
 * @returns {Promise<{success: boolean, lang: string}>}
 */
export async function startListeningMock(options = { lang: "fr" }) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: true, lang: options.lang });
    }, 400),
  );
}

/**
 * stopListeningMock
 * - Simule l’arrêt de l’écoute micro
 * @returns {Promise<{success: boolean}>}
 */
export async function stopListeningMock() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: true });
    }, 300),
  );
}

/**
 * getMicrophoneStatusMock
 * - Simule la récupération du statut du micro
 * @returns {Promise<{active: boolean, permission: string}>}
 */
export async function getMicrophoneStatusMock() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ active: false, permission: "granted" });
    }, 200),
  );
}

/**
 * processVoiceCommandMock
 * - Simule le traitement d’une commande vocale
 * @param {string} command
 * @returns {Promise<{recognized: boolean, action: string, confidence: number}>}
 */
export async function processVoiceCommandMock(command) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        recognized: true,
        action: `Action simulée pour la commande "${command}"`,
        confidence: 0.93,
      });
    }, 500),
  );
}

/**
 * Documentation :
 * - startListeningMock(options) : démarre l’écoute micro (mock).
 * - stopListeningMock() : arrête l’écoute micro (mock).
 * - getMicrophoneStatusMock() : statut micro (mock).
 * - processVoiceCommandMock(command) : traite une commande vocale (mock).
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
 * - Accessibilité : prêt pour extensions (commandes vocales, multi-langues, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
