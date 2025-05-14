/**
 * signLanguageService – Achiri
 * Service centralisé pour la gestion de la langue des signes (mock).
 * - Traduction signe <-> texte, apprentissage, accessibilité, sécurité, feedback.
 * - Prêt pour extensions futures (API réelle, multi-langues, avatars 3D, export, notifications, etc).
 * - Compatible mobile/web, UX avancée.
 */

/**
 * signToTextMock
 * - Simule la traduction de la langue des signes en texte
 * @param {File|Blob|string} input
 * @returns {Promise<{text: string, confidence: number}>}
 */
export async function signToTextMock(input) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        text: "Bonjour, comment ça va ?",
        confidence: 0.94,
      });
    }, 700),
  );
}

/**
 * textToSignMock
 * - Simule la traduction de texte en langue des signes (retourne une séquence ou une vidéo mock)
 * @param {string} text
 * @param {string} [lang="fr"]
 * @returns {Promise<{videoUrl: string, lang: string, text: string}>}
 */
export async function textToSignMock(text, lang = "fr") {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        videoUrl: `https://dummy-video.com/sign/${encodeURIComponent(text)}.mp4`,
        lang,
        text,
      });
    }, 800),
  );
}

/**
 * getSignLearningMock
 * - Simule la récupération d'une leçon ou d'un exercice d'apprentissage LSF
 * @param {string} [level="débutant"]
 * @returns {Promise<{lesson: string, videoUrl: string, level: string}>}
 */
export async function getSignLearningMock(level = "débutant") {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        lesson: "Apprenez à signer 'Merci' en LSF.",
        videoUrl: "https://dummy-video.com/sign/merci.mp4",
        level,
      });
    }, 600),
  );
}

/**
 * Documentation :
 * - signToTextMock(input) : langue des signes → texte.
 * - textToSignMock(text, lang) : texte → vidéo/signes.
 * - getSignLearningMock(level) : leçon/exercice d’apprentissage LSF.
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
 * - Accessibilité : prêt pour extensions (avatars 3D, vocal, notifications, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
