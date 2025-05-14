/**
 * profileApi – Achiri
 * API pour la gestion et l’analyse du profil utilisateur.
 * - Analyse automatique, récupération, mise à jour, accessibilité, sécurité.
 * - Prêt pour extensions futures (badges, préférences, export, feedback, notifications, etc).
 * - Compatible mobile/web, UX avancée.
 */

/**
 * analyzeProfile
 * - Lance l'analyse automatique du profil utilisateur
 * @param {string} userId
 * @returns {Promise<object>}
 */
export async function analyzeProfile(userId) {
  const res = await fetch(`/api/user/${userId}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur lors de l'analyse du profil");
  return await res.json();
}

/**
 * getProfile
 * - Récupère le profil utilisateur
 * @param {string} userId
 * @returns {Promise<object>}
 */
export async function getProfile(userId) {
  const res = await fetch(`/api/user/${userId}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Erreur lors de la récupération du profil");
  return await res.json();
}

/**
 * updateProfile
 * - Met à jour le profil utilisateur
 * @param {string} userId
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function updateProfile(userId, data) {
  const res = await fetch(`/api/user/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du profil");
  return await res.json();
}

/**
 * deleteProfile
 * - Supprime le profil utilisateur (RGPD)
 * @param {string} userId
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteProfile(userId) {
  const res = await fetch(`/api/user/${userId}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du profil");
  return await res.json();
}

/**
 * Documentation :
 * - analyzeProfile(userId) : analyse automatique du profil.
 * - getProfile(userId), updateProfile(userId, data), deleteProfile(userId) : gestion CRUD profil.
 * - Sécurité : requêtes sécurisées, gestion des erreurs, pas d’info sensible côté client.
 * - Accessibilité : prêt pour extensions (feedback, notifications, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
