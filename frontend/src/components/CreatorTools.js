import React, { useState } from "react";
import {
  FaMagic,
  FaImage,
  FaRobot,
  FaEdit,
  FaCalendarAlt,
  FaHashtag,
  FaLightbulb,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./CreatorTools.css";

const mockAvatars = [
  { id: 1, url: "https://api.dicebear.com/7.x/bottts/svg?seed=artist" },
  { id: 2, url: "https://api.dicebear.com/7.x/bottts/svg?seed=creative" },
];

const CreatorTools = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [caption, setCaption] = useState("");
  const [seoCaption, setSeoCaption] = useState("");
  const [scheduled, setScheduled] = useState("");
  const [image, setImage] = useState(null);

  // Générateur SEO (mock)
  const handleGenerateCaption = () => {
    setSeoCaption(`🚀 ${caption} | #Achiri #Créateur #Tendance`);
  };

  // Filtres photo (mock)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Planificateur (mock)
  const handleSchedule = (e) => {
    e.preventDefault();
    alert(`Publication planifiée pour le ${scheduled} ! (Mock)`);
  };

  return (
    <motion.div
      className="creator-tools-container bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Outils Créateur Achiri"
      tabIndex={0}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center mb-4">
        <FaMagic className="mr-2" /> Outils Créateur
      </h2>

      {/* Générateur d'avatar IA */}
      <div className="mb-6">
        <div className="font-semibold mb-2 flex items-center">
          <FaRobot className="mr-2" /> Générateur d'avatar IA
        </div>
        <div className="flex gap-3">
          {mockAvatars.map((a) => (
            <img
              key={a.id}
              src={a.url}
              alt="Avatar IA"
              className={`w-16 h-16 rounded-full border-2 cursor-pointer ${
                selectedAvatar === a.id ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedAvatar(a.id)}
              tabIndex={0}
              aria-label={`Sélectionner l'avatar ${a.id}`}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelectedAvatar(a.id)}
            />
          ))}
        </div>
        {selectedAvatar && (
          <div className="mt-2 text-green-600 text-sm" aria-live="polite">
            Avatar sélectionné !
          </div>
        )}
      </div>

      {/* Filtres photo (mock) */}
      <div className="mb-6">
        <div className="font-semibold mb-2 flex items-center">
          <FaImage className="mr-2" /> Filtres photo
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          aria-label="Choisir une image à filtrer"
        />
        {image && (
          <div className="mt-2">
            <img src={image} alt="Aperçu" className="w-32 h-32 rounded shadow" />
            <div className="text-xs text-gray-400 mt-1">Filtre appliqué (mock)</div>
          </div>
        )}
      </div>

      {/* Générateur de posts/captions SEO */}
      <div className="mb-6">
        <div className="font-semibold mb-2 flex items-center">
          <FaEdit className="mr-2" /> Générateur de posts &amp; captions SEO
        </div>
        <textarea
          className="border rounded w-full p-2 mb-2"
          placeholder="Écris ton post ou ta légende..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          aria-label="Écris ton post ou ta légende"
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={handleGenerateCaption}
          disabled={!caption}
          aria-label="Générer une légende SEO"
        >
          Générer une légende SEO
        </button>
        {seoCaption && (
          <div className="mt-2 bg-gray-100 dark:bg-gray-800 rounded p-2 text-sm" aria-live="polite">
            <FaHashtag className="inline mr-1" /> {seoCaption}
          </div>
        )}
      </div>

      {/* Planificateur de publication */}
      <div className="mb-4">
        <div className="font-semibold mb-2 flex items-center">
          <FaCalendarAlt className="mr-2" /> Planificateur de publication
        </div>
        <form className="flex gap-2 items-center" onSubmit={handleSchedule}>
          <input
            type="datetime-local"
            className="border rounded px-2 py-1"
            value={scheduled}
            onChange={(e) => setScheduled(e.target.value)}
            required
            aria-label="Choisir la date et l'heure de publication"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded"
            aria-label="Planifier la publication"
          >
            Planifier
          </button>
        </form>
      </div>

      {/* Astuce créateur */}
      <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900 rounded text-yellow-800 dark:text-yellow-200 flex items-center">
        <FaLightbulb className="mr-2" />
        <span>
          Astuce : Utilise les outils IA Achiri pour booster ta créativité et ta visibilité !
        </span>
      </div>
    </motion.div>
  );
};

export default CreatorTools;