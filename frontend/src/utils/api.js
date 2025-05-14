// Utilitaire API pour le frontend Achiri (version mock, aucun appel réseau)
// - Sécurité, accessibilité, feedback, UX avancée, prêt pour extensions futures
// - Compatible mobile/web, SEO friendly (indirect)

/**
 * mockDelay
 * Simule un délai réseau pour les réponses mock.
 * @param {any} result
 * @param {number} delay
 * @returns {Promise<any>}
 */
const mockDelay = (result, delay = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(result), delay));

/**
 * request
 * Simule une requête API selon la route.
 * @param {string} path
 * @param {object} options
 * @returns {Promise<any>}
 */
async function request(
  path,
  { method = "GET", body, params, headers = {} } = {},
) {
  // Personnalisation des routes mock
  if (path.startsWith("/login")) {
    return mockDelay({
      token: "demo-token",
      user: { id: "demo-user", pseudo: "Utilisateur" },
    });
  }
  if (path.startsWith("/user/")) {
    return mockDelay({
      id: "demo-user",
      pseudo: "Utilisateur",
      email: "utilisateur@achiri.com",
    });
  }
  if (path.startsWith("/settings")) {
    return mockDelay({ theme: "light", language: "fr", notifications: true });
  }
  if (path.startsWith("/wallet")) {
    return mockDelay({ solde: 100, devise: "EUR", transactions: [] });
  }
  if (path.startsWith("/notifications")) {
    return mockDelay([{ id: 1, message: "Bienvenue sur Achiri !" }]);
  }
  if (path.startsWith("/music")) {
    return mockDelay({ playlists: [], favorites: [], history: [] });
  }
  if (path.startsWith("/virtual-classroom")) {
    return mockDelay({ id: 1, name: "Classe Démo", users: [], messages: [] });
  }
  if (path.startsWith("/challenges")) {
    return mockDelay([{ id: 1, title: "Défi IA", status: "open" }]);
  }
  if (path.startsWith("/creator-tools")) {
    return mockDelay({ tools: [] });
  }
  if (path.startsWith("/moderation")) {
    return mockDelay({ status: "ok" });
  }
  if (path.startsWith("/leaderboard")) {
    return mockDelay([{ userId: "demo-user", score: 100 }]);
  }
  // Par défaut, retourne un objet vide
  return mockDelay({});
}

// Auth
export const login = (data) =>
  request("/login", { method: "POST", body: data });

// User
export const getUser = (userId) => request(`/user/${userId}`);
export const updateUser = (userId, data) =>
  request(`/user/${userId}`, { method: "PUT", body: data });
export const deleteUser = (userId) =>
  request(`/user/${userId}`, { method: "DELETE" });

// Settings
export const getSettings = (userId) => request(`/settings/${userId}`);
export const updateSettings = (userId, data) =>
  request(`/settings/${userId}`, { method: "PUT", body: data });
export const updateSettingsSection = (userId, section, sectionData) =>
  request(`/settings/${userId}/section`, {
    method: "PUT",
    body: { section, sectionData },
  });
export const resetSettings = (userId) =>
  request(`/settings/${userId}/reset`, { method: "POST" });

// Accessibility
export const getAccessibility = (userId) => request(`/accessibility/${userId}`);
export const updateAccessibility = (userId, data) =>
  request(`/accessibility/${userId}`, { method: "PUT", body: data });
export const resetAccessibility = (userId) =>
  request(`/accessibility/${userId}/reset`, { method: "POST" });

// Wallet
export const getWallet = (userId) => request(`/wallet/${userId}`);
export const addWalletTransaction = (userId, data) =>
  request(`/wallet/${userId}/transaction`, { method: "POST", body: data });
export const getWalletTransactions = (userId, params) =>
  request(`/wallet/${userId}/transactions`, { params });
export const setWalletLocked = (userId, locked) =>
  request(`/wallet/${userId}/locked`, { method: "PUT", body: { locked } });
export const setWalletCurrency = (userId, currency) =>
  request(`/wallet/${userId}/currency`, { method: "PUT", body: { currency } });
export const resetWallet = (userId) =>
  request(`/wallet/${userId}/reset`, { method: "POST" });

// Notifications
export const getNotifications = (userId, params) =>
  request(`/notifications/${userId}`, { params });
export const addNotification = (userId, data) =>
  request(`/notifications/${userId}`, { method: "POST", body: data });
export const markNotificationAsRead = (userId, notifId) =>
  request(`/notifications/${userId}/read/${notifId}`, { method: "POST" });
export const markAllNotificationsAsRead = (userId) =>
  request(`/notifications/${userId}/read-all`, { method: "POST" });
export const deleteNotification = (userId, notifId) =>
  request(`/notifications/${userId}/delete/${notifId}`, { method: "DELETE" });
export const deleteAllNotifications = (userId) =>
  request(`/notifications/${userId}/delete-all`, { method: "DELETE" });

// MusicLibrary
export const getPlaylists = (userId) => request(`/music/${userId}/playlists`);
export const addPlaylist = (userId, name) =>
  request(`/music/${userId}/playlists`, { method: "POST", body: { name } });
export const deletePlaylist = (userId, playlistId) =>
  request(`/music/${userId}/playlists/${playlistId}`, { method: "DELETE" });
export const addTrackToPlaylist = (userId, playlistId, track) =>
  request(`/music/${userId}/playlists/${playlistId}/tracks`, {
    method: "POST",
    body: track,
  });
export const removeTrackFromPlaylist = (userId, playlistId, trackId) =>
  request(`/music/${userId}/playlists/${playlistId}/tracks/${trackId}`, {
    method: "DELETE",
  });
export const addFavoriteTrack = (userId, trackId) =>
  request(`/music/${userId}/favorites`, { method: "POST", body: { trackId } });
export const removeFavoriteTrack = (userId, trackId) =>
  request(`/music/${userId}/favorites`, {
    method: "DELETE",
    body: { trackId },
  });
export const addToHistory = (userId, trackId) =>
  request(`/music/${userId}/history`, { method: "POST", body: { trackId } });
export const getHistory = (userId) => request(`/music/${userId}/history`);

// VirtualClassroom
export const getClassrooms = () => request(`/virtual-classroom`);
export const createClassroom = (data) =>
  request(`/virtual-classroom`, { method: "POST", body: data });
export const getClassroom = (id) => request(`/virtual-classroom/${id}`);
export const updateClassroom = (id, data) =>
  request(`/virtual-classroom/${id}`, { method: "PUT", body: data });
export const deleteClassroom = (id) =>
  request(`/virtual-classroom/${id}`, { method: "DELETE" });
export const addUserToClassroom = (id, userId) =>
  request(`/virtual-classroom/${id}/users`, {
    method: "POST",
    body: { userId },
  });
export const removeUserFromClassroom = (id, userId) =>
  request(`/virtual-classroom/${id}/users`, {
    method: "DELETE",
    body: { userId },
  });
export const addMessageToClassroom = (id, message) =>
  request(`/virtual-classroom/${id}/messages`, {
    method: "POST",
    body: message,
  });
export const addResourceToClassroom = (id, resource) =>
  request(`/virtual-classroom/${id}/resources`, {
    method: "POST",
    body: resource,
  });
export const addScheduleEventToClassroom = (id, event) =>
  request(`/virtual-classroom/${id}/schedule`, { method: "POST", body: event });

// Challenges
export const getChallenges = () => request(`/challenges`);
export const createChallenge = (data) =>
  request(`/challenges`, { method: "POST", body: data });
export const getChallenge = (id) => request(`/challenges/${id}`);
export const joinChallenge = (id, userId) =>
  request(`/challenges/${id}/join`, { method: "POST", body: { userId } });
export const submitChallenge = (id, userId, content) =>
  request(`/challenges/${id}/submit`, {
    method: "POST",
    body: { userId, content },
  });
export const scoreSubmission = (id, userId, score) =>
  request(`/challenges/${id}/score`, {
    method: "POST",
    body: { userId, score },
  });
export const closeChallenge = (id) =>
  request(`/challenges/${id}/close`, { method: "POST" });
export const deleteChallenge = (id) =>
  request(`/challenges/${id}`, { method: "DELETE" });

// CreatorTools
export const getCreatorTools = (userId) =>
  request(`/creator-tools/${userId}/tools`);
export const addCreatorTool = (userId, toolData) =>
  request(`/creator-tools/${userId}/tools`, { method: "POST", body: toolData });
export const updateCreatorTool = (userId, toolId, data) =>
  request(`/creator-tools/${userId}/tools/${toolId}`, {
    method: "PUT",
    body: data,
  });
export const deleteCreatorTool = (userId, toolId) =>
  request(`/creator-tools/${userId}/tools/${toolId}`, { method: "DELETE" });
export const getPresets = (userId) =>
  request(`/creator-tools/${userId}/presets`);
export const addPreset = (userId, presetData) =>
  request(`/creator-tools/${userId}/presets`, {
    method: "POST",
    body: presetData,
  });
export const deletePreset = (userId, presetId) =>
  request(`/creator-tools/${userId}/presets/${presetId}`, { method: "DELETE" });

// Moderation
export const banUser = (roomId, userId) =>
  request(`/moderation/${roomId}/ban/${userId}`, { method: "POST" });
export const unbanUser = (roomId, userId) =>
  request(`/moderation/${roomId}/ban/${userId}`, { method: "DELETE" });
export const muteUser = (roomId, userId, durationMinutes) =>
  request(`/moderation/${roomId}/mute/${userId}`, {
    method: "POST",
    body: { durationMinutes },
  });
export const unmuteUser = (roomId, userId) =>
  request(`/moderation/${roomId}/mute/${userId}`, { method: "DELETE" });
export const isBanned = (roomId, userId) =>
  request(`/moderation/${roomId}/is-banned/${userId}`);
export const isMuted = (roomId, userId) =>
  request(`/moderation/${roomId}/is-muted/${userId}`);
export const addReport = (roomId, reportData) =>
  request(`/moderation/${roomId}/report`, { method: "POST", body: reportData });
export const setReportStatus = (roomId, reportId, status) =>
  request(`/moderation/${roomId}/report/${reportId}/status`, {
    method: "PUT",
    body: { status },
  });
export const getReports = (roomId) => request(`/moderation/${roomId}/reports`);

// Leaderboard
export const getLeaderboard = (type, params) =>
  request(`/leaderboard/${type}`, { params });
export const upsertScore = (type, userId, score, meta) =>
  request(`/leaderboard/${type}/${userId}`, {
    method: "POST",
    body: { score, meta },
  });
export const getUserRank = (type, userId) =>
  request(`/leaderboard/${type}/${userId}/rank`);
export const resetLeaderboard = (type) =>
  request(`/leaderboard/${type}/reset`, { method: "POST" });

/**
 * Documentation :
 * - Toutes les fonctions sont mockées pour le développement frontend.
 * - Sécurité : aucune donnée sensible, pas de tracking, feedback utilisateur possible.
 * - Accessibilité : prêt pour extensions (feedback, notifications, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 * - Pour passer en mode réel : remplacer les mocks par des appels API réels.
 */

export default {
  login,
  getUser,
  updateUser,
  deleteUser,
  getSettings,
  updateSettings,
  updateSettingsSection,
  resetSettings,
  getAccessibility,
  updateAccessibility,
  resetAccessibility,
  getWallet,
  addWalletTransaction,
  getWalletTransactions,
  setWalletLocked,
  setWalletCurrency,
  resetWallet,
  getNotifications,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
  getPlaylists,
  addPlaylist,
  deletePlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  addFavoriteTrack,
  removeFavoriteTrack,
  addToHistory,
  getHistory,
  getClassrooms,
  createClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom,
  addUserToClassroom,
  removeUserFromClassroom,
  addMessageToClassroom,
  addResourceToClassroom,
  addScheduleEventToClassroom,
  getChallenges,
  createChallenge,
  getChallenge,
  joinChallenge,
  submitChallenge,
  scoreSubmission,
  closeChallenge,
  deleteChallenge,
  getCreatorTools,
  addCreatorTool,
  updateCreatorTool,
  deleteCreatorTool,
  getPresets,
  addPreset,
  deletePreset,
  banUser,
  unbanUser,
  muteUser,
  unmuteUser,
  isBanned,
  isMuted,
  addReport,
  setReportStatus,
  getReports,
  getLeaderboard,
  upsertScore,
  getUserRank,
  resetLeaderboard,
};
