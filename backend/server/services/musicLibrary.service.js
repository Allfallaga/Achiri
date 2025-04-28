const MusicLibrary = require('../models/musicLibrary.js');

module.exports = {
  // Ajouter une playlist à un utilisateur
  addPlaylist: (userId, name, cb) => {
    MusicLibrary.addPlaylist(userId, name, cb);
  },

  // Ajouter un morceau à une playlist
  addTrackToPlaylist: (userId, playlistId, track, cb) => {
    MusicLibrary.addTrackToPlaylist(userId, playlistId, track, cb);
  },

  // Supprimer un morceau d'une playlist
  removeTrackFromPlaylist: (userId, playlistId, trackId, cb) => {
    MusicLibrary.removeTrackFromPlaylist(userId, playlistId, trackId, cb);
  },

  // Supprimer une playlist
  deletePlaylist: (userId, playlistId, cb) => {
    MusicLibrary.deletePlaylist(userId, playlistId, cb);
  },

  // Lister toutes les playlists d'un utilisateur
  getPlaylists: (userId, cb) => {
    MusicLibrary.getPlaylists(userId, cb);
  },

  // Ajouter un morceau aux favoris
  addFavorite: (userId, trackId, cb) => {
    MusicLibrary.addFavorite(userId, trackId, cb);
  },

  // Supprimer un morceau des favoris
  removeFavorite: (userId, trackId, cb) => {
    MusicLibrary.removeFavorite(userId, trackId, cb);
  },

  // Ajouter un morceau à l'historique d'écoute
  addToHistory: (userId, trackId, cb) => {
    MusicLibrary.addToHistory(userId, trackId, cb);
  },

  // Récupérer l'historique d'écoute
  getHistory: (userId, cb) => {
    MusicLibrary.getHistory(userId, cb);
  }
};