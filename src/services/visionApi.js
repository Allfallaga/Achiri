// Service mock pour la vision par ordinateur (aucun appel réseau)

/**
 * describeImageMock
 * - Simule une description d'image
 * @param {File|Blob|string} file
 * @returns {Promise<{description: string, tags: Array<string>, confidence: number}>}
 */
export async function describeImageMock(file) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        description: "Image d'exemple : une personne souriante devant un ordinateur.",
        tags: ["personne", "ordinateur", "sourire"],
        confidence: 0.98,
      });
    }, 700)
  );
}

/**
 * detectObjectsMock
 * - Simule la détection d'objets
 * @param {File|Blob|string} file
 * @returns {Promise<Array<{label: string, confidence: number, box: Array<number>}>>}
 */
export async function detectObjectsMock(file) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { label: "personne", confidence: 0.97, box: [10, 20, 100, 200] },
        { label: "ordinateur", confidence: 0.92, box: [120, 80, 200, 150] },
      ]);
    }, 700)
  );
}

/**
 * detectGesturesMock
 * - Simule la détection de gestes
 * @param {File|Blob|string} file
 * @returns {Promise<Array<{gesture: string, confidence: number}>>}
 */
export async function detectGesturesMock(file) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { gesture: "main levée", confidence: 0.95 },
        { gesture: "signe victoire", confidence: 0.88 },
      ]);
    }, 700)
  );
}

/**
 * signToTextMock
 * - Simule la traduction de la langue des signes en texte
 * @param {File|Blob|string} file
 * @returns {Promise<{text: string, confidence: number}>}
 */
export async function signToTextMock(file) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        text: "Bonjour, comment ça va ?",
        confidence: 0.93,
      });
    }, 700)
  );
}