import React, { useState } from "react";
import { FaMusic, FaUpload, FaPlay, FaPause, FaSearch, FaUser, FaHeadphones } from "react-icons/fa";
import { motion } from "framer-motion";
import "./MusicLibrary.css";

// Mock data pour la démo
const mockTracks = [
  {
    id: 1,
    title: "Sunrise Beat",
    artist: "Alice",
    url: "/music/sunrise-beat.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=80&h=80",
    uploadedAt: "2025-04-20",
  },
  {
    id: 2,
    title: "Dream Flow",
    artist: "Bob",
    url: "/music/dream-flow.mp3",
    cover: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80",
    uploadedAt: "2025-04-18",
  },
];

const MusicLibrary = () => {
  const [tracks, setTracks] = useState(mockTracks);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audio, setAudio] = useState({ id: null, playing: false });

  // Filtrage des morceaux
  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion de l'upload (mock)
  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    setTimeout(() => {
      setTracks((prev) => [
        {
          id: prev.length + 1,
          title: selectedFile.name.replace(/\.[^/.]+$/, ""),
          artist: "Vous",
          url: URL.createObjectURL(selectedFile),
          cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80",
          uploadedAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      setUploading(false);
      setSelectedFile(null);
    }, 1200);
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

  return (
    <motion.div
      className="music-library-container bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Bibliothèque musicale Achiri"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
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

      {/* Barre de recherche */}
      <div className="flex items-center mb-4">
        <FaSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un titre ou artiste..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
          aria-label="Recherche musique"
        />
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
                <div className="font-semibold text-gray-800 dark:text-white">{track.title}</div>
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
    </motion.div>
  );
};

export default MusicLibrary;