const MusicLibraryService = require('../services/musicLibrary.service.js');

// Ajouter une playlist à un utilisateur
exports.addPlaylist = (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  MusicLibraryService.addPlaylist(userId, name, (err, playlist) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(playlist);
  });
};

// Ajouter un morceau à une playlist
exports.addTrackToPlaylist = (req, res) => {
  const userId = req.params.userId;
  const playlistId = parseInt(req.params.playlistId);
  const track = req.body;
  MusicLibraryService.addTrackToPlaylist(userId, playlistId, track, (err, trackObj) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(trackObj);
  });
};

// Supprimer un morceau d'une playlist
exports.removeTrackFromPlaylist = (req, res) => {
  const userId = req.params.userId;
  const playlistId = parseInt(req.params.playlistId);
  const trackId = parseInt(req.params.trackId);
  MusicLibraryService.removeTrackFromPlaylist(userId, playlistId, trackId, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};

// Supprimer une playlist
exports.deletePlaylist = (req, res) => {
  const userId = req.params.userId;
  const playlistId = parseInt(req.params.playlistId);
  MusicLibraryService.deletePlaylist(userId, playlistId, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
};

// Lister toutes les playlists d'un utilisateur
exports.getPlaylists = (req, res) => {
  const userId = req.params.userId;
  MusicLibraryService.getPlaylists(userId, (err, playlists) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(playlists);
  });
};

// Ajouter un morceau aux favoris
exports.addFavorite = (req, res) => {
  const userId = req.params.userId;
  const { trackId } = req.body;
  MusicLibraryService.addFavorite(userId, trackId, (err, favorites) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(favorites);
  });
};

// Supprimer un morceau des favoris
exports.removeFavorite = (req, res) => {
  const userId = req.params.userId;
  const { trackId } = req.body;
  MusicLibraryService.removeFavorite(userId, trackId, (err, favorites) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(favorites);
  });
};

// Ajouter un morceau à l'historique d'écoute
exports.addToHistory = (req, res) => {
  const userId = req.params.userId;
  const { trackId } = req.body;
  MusicLibraryService.addToHistory(userId, trackId, (err, history) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(history);
  });
};

// Récupérer l'historique d'écoute
exports.getHistory = (req, res) => {
  const userId = req.params.userId;
  MusicLibraryService.getHistory(userId, (err, history) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(history);
  });
};