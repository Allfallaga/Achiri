// Service mock pour les interactions sociales (aucun appel réseau)

/**
 * getProfileMock
 * - Simule la récupération du profil social
 * @param {string} userId
 * @returns {Promise<{id: string, pseudo: string, bio: string, avatar: string, verified: boolean, followers: number, following: number}>}
 */
export async function getProfileMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id: userId,
        pseudo: "UtilisateurDemo",
        bio: "Bienvenue sur Achiri !",
        avatar: "https://dummyimage.com/100x100/cccccc/000000&text=User",
        verified: true,
        followers: 42,
        following: 17,
      });
    }, 500)
  );
}

/**
 * updateProfileMock
 * - Simule la mise à jour du profil
 * @param {string} userId
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function updateProfileMock(userId, data) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ ...data, id: userId, updated: true });
    }, 400)
  );
}

/**
 * verifyProfileMock
 * - Simule la vérification du profil
 * @param {string} userId
 * @returns {Promise<{userId: string, verified: boolean}>}
 */
export async function verifyProfileMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ userId, verified: true });
    }, 600)
  );
}

/**
 * regenerateCodeMock
 * - Simule la régénération d'un code de vérification
 * @param {string} userId
 * @returns {Promise<{userId: string, code: number}>}
 */
export async function regenerateCodeMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ userId, code: Math.floor(100000 + Math.random() * 900000) });
    }, 400)
  );
}

/**
 * getSocialFeedMock
 * - Simule la récupération du fil d'actualité social
 * @param {string} userId
 * @returns {Promise<Array<{id: number, author: string, content: string, date: string}>>}
 */
export async function getSocialFeedMock(userId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, author: "Alice", content: "Bienvenue sur Achiri !", date: "2025-04-25" },
        { id: 2, author: "Bob", content: "Nouveau défi IA lancé !", date: "2025-04-24" },
      ]);
    }, 500)
  );
}