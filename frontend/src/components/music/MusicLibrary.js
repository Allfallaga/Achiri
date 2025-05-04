import React, { useState, useRef, useEffect } from "react";
import {
  FaMusic,
  FaUpload,
  FaPlay,
  FaPause,
  FaSearch,
  FaUser,
  FaHeadphones,
  FaTrashAlt,
  FaStar,
  FaListUl,
  FaHeart,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./MusicLibrary.css";

/**
 * MusicLibrary – Achiri
 * Bibliothèque musicale avancée : upload, lecture, recherche, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : upload, lecture, recherche, suppression, feedback, focus, couleurs, responsive, favoris, playlists.
 * - Prêt pour extensions futures (playlist, favoris, analytics, dark mode, IA, badges, overlay, notifications, etc).
 */

const mockTracks = [
  {
    id: 1,
    title: "Sunrise Beat",
    artist: "Alice",
    url: "/music/sunrise-beat.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=80&h=80",
    uploadedAt: "2025-04-20",
    favorite: false,
    playlist: null,
  },
  {
    id: 2,
    title: "Dream Flow",
    artist: "Bob",
    url: "/music/dream-flow.mp3",
    cover: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80",
    uploadedAt: "2025-04-18",
    favorite: true,
    playlist: "Chill",
  },
];

const mockPlaylists = [
  { name: "Chill", icon: <FaListUl />, color: "#43a047" },
  { name: "Workout", icon: <FaListUl />, color: "#1976d2" },
];

const MusicLibrary = () => {
  const [tracks, setTracks] = useState(mockTracks);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audio, setAudio] = useState({ id: null, playing: false });
  const [feedback, setFeedback] = useState("");
  const [favorites, setFavorites] = useState([2]);
  const [playlistFilter, setPlaylistFilter] = useState("all");

  // Accessibilité : focus auto sur le titre à l'arrivée
  const titleRef = useRef();
  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  // Filtrage des morceaux
  const filteredTracks = tracks.filter(
    (track) =>
      (playlistFilter === "all" || track.playlist === playlistFilter || (playlistFilter === "favoris" && favorites.includes(track.id))) &&
      (track.title.toLowerCase().includes(search.toLowerCase()) ||
        track.artist.toLowerCase().includes(search.toLowerCase()))
  );

  // Gestion de l'upload (mock)
  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    setTimeout(() => {
      const newTrack = {
        id: tracks.length + 1,
        title: selectedFile.name.replace(/\.[^/.]+$/, ""),
        artist: "Vous",
        url: URL.createObjectURL(selectedFile),
        cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80",
        uploadedAt: new Date().toISOString().slice(0, 10),
        favorite: false,
        playlist: null,
      };
      setTracks((prev) => [newTrack, ...prev]);
      setUploading(false);
      setSelectedFile(null);
      setFeedback("Morceau ajouté avec succès !");
      setTimeout(() => setFeedback(""), 1800);
    }, 1200);
  };

  // Suppression d'un morceau (mock)
  const handleDelete = (id) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
    setFavorites((prev) => prev.filter((fid) => fid !== id));
    setFeedback("Morceau supprimé.");
    setTimeout(() => setFeedback(""), 1500);
  };

  // Lecture audio (mock simple)
  const handlePlay = (id) => {
    if (audio.id === id && audio.playing) {
      document.getElementById(`audio-${id}`).pause();
      setAudio({ id, playing: false });
    } else {
      if (audio.id) {
        const prevAudio = document.getElementById(`audio-${audio.id}`);
        if (prevAudio) prevAudio.pause();
      }
      document.getElementById(`audio-${id}`).play();
      setAudio({ id, playing: true });
    }
  };

  // Favoris
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    );
    setFeedback(favorites.includes(id) ? "Retiré des favoris." : "Ajouté aux favoris !");
    setTimeout(() => setFeedback(""), 1200);
  };

  // Playlists (mock)
  const assignPlaylist = (id, playlist) => {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, playlist } : t
      )
    );
    setFeedback(`Ajouté à la playlist "${playlist}"`);
    setTimeout(() => setFeedback(""), 1200);
  };

  return (
    <motion.div
      className="music-library-container bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Bibliothèque musicale Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>Bibliothèque musicale | Achiri</title>
        <meta name="description" content="Bibliothèque musicale Achiri : upload, lecture, recherche, favoris, playlists, accessibilité, sécurité, responsive, SEO, design avancé." />
      </Helmet>
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"
          tabIndex={0}
          aria-label="Titre bibliothèque musicale"
          ref={titleRef}
        >
          <FaMusic className="mr-2" /> Bibliothèque musicale
        </h2>
        <button
          className="btn-upload flex items-center text-blue-600 dark:text-blue-300"
          onClick={() => setUploading(!uploading)}
          aria-label="Uploader un son"
        >
          <FaUpload className="mr-1" /> Uploader
        </button>
      </div>

      {/* Feedback utilisateur */}
      {feedback && (
        <div aria-live="polite" style={{ color: "#43a047", marginBottom: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          {feedback}
        </div>
      )}

      {/* Formulaire d'upload */}
      {uploading && (
        <form className="mb-4 flex items-center gap-2" onSubmit={handleUpload}>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="input-upload"
            aria-label="Sélectionner un fichier audio"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
            disabled={!selectedFile}
            aria-label="Ajouter le morceau"
          >
            Ajouter
          </button>
          <button
            type="button"
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
            onClick={() => {
              setUploading(false);
              setSelectedFile(null);
            }}
            aria-label="Annuler l'upload"
          >
            Annuler
          </button>
        </form>
      )}

      {/* Barre de recherche et filtres */}
      <div className="flex items-center mb-4 gap-2 flex-wrap">
        <FaSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un titre ou artiste..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
          aria-label="Recherche musique"
        />
        <button
          className={`px-2 py-1 rounded flex items-center gap-1 ${playlistFilter === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}
          onClick={() => setPlaylistFilter("all")}
          aria-label="Voir tous les morceaux"
        >
          <FaListUl /> Tous
        </button>
        <button
          className={`px-2 py-1 rounded flex items-center gap-1 ${playlistFilter === "favoris" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}
          onClick={() => setPlaylistFilter("favoris")}
          aria-label="Voir les favoris"
        >
          <FaStar /> Favoris
        </button>
        {mockPlaylists.map((pl) => (
          <button
            key={pl.name}
            className={`px-2 py-1 rounded flex items-center gap-1 ${playlistFilter === pl.name ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setPlaylistFilter(pl.name)}
            aria-label={`Voir la playlist ${pl.name}`}
          >
            {pl.icon} {pl.name}
          </button>
        ))}
      </div>

      {/* Liste des morceaux */}
      <div className="music-list space-y-3">
        {filteredTracks.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Aucun morceau trouvé.</div>
        ) : (
          filteredTracks.map((track) => (
            <div
              key={track.id}
              className="music-item flex items-center bg-gray-50 dark:bg-gray-800 rounded p-2 shadow"
              tabIndex={0}
              aria-label={`Morceau ${track.title} par ${track.artist}`}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-12 h-12 rounded mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  {track.title}
                  <button
                    className="ml-1 text-yellow-500"
                    aria-label={favorites.includes(track.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 18,
                      outline: "none"
                    }}
                    onClick={() => toggleFavorite(track.id)}
                  >
                    <FaStar style={{ opacity: favorites.includes(track.id) ? 1 : 0.3 }} />
                  </button>
                  {track.playlist && (
                    <span
                      className="ml-2 px-2 py-0.5 rounded text-xs"
                      style={{
                        background: "#e3f2fd",
                        color: "#1976d2",
                        fontWeight: 600,
                        marginLeft: 4
                      }}
                    >
                      <FaListUl style={{ marginRight: 2 }} /> {track.playlist}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <FaUser className="mr-1" /> {track.artist} &nbsp;|&nbsp;
                  <span className="ml-1">{track.uploadedAt}</span>
                </div>
              </div>
              <button
                className="play-btn text-blue-600 dark:text-blue-300 ml-2"
                onClick={() => handlePlay(track.id)}
                aria-label={audio.id === track.id && audio.playing ? "Pause" : "Lecture"}
              >
                {audio.id === track.id && audio.playing ? <FaPause /> : <FaPlay />}
              </button>
              <button
                className="delete-btn text-red-500 ml-2"
                onClick={() => handleDelete(track.id)}
                aria-label="Supprimer le morceau"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer"
                }}
              >
                <FaTrashAlt />
              </button>
              {/* Ajout à playlist */}
              <select
                className="ml-2 px-1 py-0.5 rounded border text-xs"
                value={track.playlist || ""}
                onChange={e => assignPlaylist(track.id, e.target.value)}
                aria-label="Ajouter à une playlist"
                style={{ minWidth: 80 }}
              >
                <option value="">Playlist</option>
                {mockPlaylists.map(pl => (
                  <option key={pl.name} value={pl.name}>{pl.name}</option>
                ))}
              </select>
              <audio
                id={`audio-${track.id}`}
                src={track.url}
                onEnded={() => setAudio({ id: track.id, playing: false })}
                preload="none"
                className="hidden"
              />
            </div>
          ))
        )}
      </div>

      {/* Utilisation dans rooms */}
      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-200 flex items-center">
        <FaHeadphones className="mr-2" />
        <span>
          Utilisez vos sons dans les <b>rooms vidéo</b>, jeux ou interactions Achiri !
        </span>
      </div>
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
        <br />
        <span style={{ fontSize: "0.93em" }}>
          Design avancé, navigation clavier, SEO optimisé, branding Achiri.
        </span>
      </footer>
    </motion.div>
  );
};

export default MusicLibrary;

/**
 * Documentation :
 * - Bibliothèque musicale : upload, lecture, recherche, suppression, favoris, playlists, feedback, focus, couleurs, responsive.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (playlist, favoris, analytics, dark mode, IA, badges, overlay, notifications, etc).
 */