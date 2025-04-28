// Modèle MusicLibrary avancé (stockage en mémoire, logique métier)
// Structure : { userId: { playlists: [{ id, name, tracks: [...] }], favorites: [trackId], history: [trackId] } }

const libraries = {}; // { userId: { playlists: [], favorites: [], history: [] } }
let nextPlaylistId = 1;
let nextTrackId = 1;

module.exports = {
  // Initialiser la bibliothèque d'un utilisateur si besoin
  _initUser: (userId) => {
    if (!libraries[userId]) {
      libraries[userId] = {
        playlists: [],
        favorites: [],
        history: []
      };
    }
  },

  // Ajouter une playlist
  addPlaylist: (userId, name, cb) => {
    module.exports._initUser(userId);
    const playlist = { id: nextPlaylistId++, name, tracks: [] };
    libraries[userId].playlists.push(playlist);
    cb(null, playlist);
  },

  // Ajouter un morceau à une playlist
  addTrackToPlaylist: (userId, playlistId, track, cb) => {
    module.exports._initUser(userId);
    const playlist = libraries[userId].playlists.find(p => p.id === playlistId);
    if (!playlist) return cb(new Error("Playlist non trouvée"));
    const trackObj = { ...track, id: nextTrackId++, addedAt: new Date() };
    playlist.tracks.push(trackObj);
    cb(null, trackObj);
  },

  // Supprimer un morceau d'une playlist
  removeTrackFromPlaylist: (userId, playlistId, trackId, cb) => {
    module.exports._initUser(userId);
    const playlist = libraries[userId].playlists.find(p => p.id === playlistId);
    if (!playlist) return cb(new Error("Playlist non trouvée"));
    playlist.tracks = playlist.tracks.filter(t => t.id !== trackId);
    cb(null, true);
  },

  // Supprimer une playlist
  deletePlaylist: (userId, playlistId, cb) => {
    module.exports._initUser(userId);
    libraries[userId].playlists = libraries[userId].playlists.filter(p => p.id !== playlistId);
    cb(null, true);
  },

  // Lister toutes les playlists d'un utilisateur
  getPlaylists: (userId, cb) => {
    module.exports._initUser(userId);
    cb(null, libraries[userId].playlists);
  },

  // Ajouter un morceau aux favoris
  addFavorite: (userId, trackId, cb) => {
    module.exports._initUser(userId);
    if (!libraries[userId].favorites.includes(trackId)) {
      libraries[userId].favorites.push(trackId);
    }
    cb(null, libraries[userId].favorites);
  },

  // Supprimer un morceau des favoris
  removeFavorite: (userId, trackId, cb) => {
    module.exports._initUser(userId);
    libraries[userId].favorites = libraries[userId].favorites.filter(id => id !== trackId);
    cb(null, libraries[userId].favorites);
  },

  // Historique d'écoute (ajouter un morceau à l'historique)
  addToHistory: (userId, trackId, cb) => {
    module.exports._initUser(userId);
    libraries[userId].history.push({ trackId, date: new Date() });
    cb(null, libraries[userId].history);
  },

  // Récupérer l'historique d'écoute
  getHistory: (userId, cb) => {
    module.exports._initUser(userId);
    cb(null, libraries[userId].history);
  }
};