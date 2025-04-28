// Service mock pour la synthèse et reconnaissance vocale (aucun appel réseau)

/**
 * textToSpeechMock
 * - Simule la synthèse vocale
 * @param {string} text
 * @param {string} [lang="fr"]
 * @returns {Promise<{audioUrl: string, lang: string, text: string}>}
 */
export async function textToSpeechMock(text, lang = "fr") {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        audioUrl: `https://dummy-audio.com/tts/${encodeURIComponent(text)}.mp3`,
        lang,
        text,
      });
    }, 700)
  );
}

/**
 * transcribeAudioMock
 * - Simule la transcription audio
 * @param {File|Blob|string} file
 * @param {string} [lang="fr"]
 * @returns {Promise<{text: string, lang: string, confidence: number}>}
 */
export async function transcribeAudioMock(file, lang = "fr") {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        text: "Ceci est une transcription simulée.",
        lang,
        confidence: 0.95,
      });
    }, 900)
  );
}

/**
 * detectEmotionMock
 * - Simule la détection d'émotion dans la voix
 * @param {File|Blob|string} file
 * @returns {Promise<{emotion: string, confidence: number}>}
 */
export async function detectEmotionMock(file) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        emotion: "heureux",
        confidence: 0.88,
      });
    }, 600)
  );
}