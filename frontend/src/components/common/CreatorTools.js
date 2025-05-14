import React, { useState } from "react";
import {
  FaMagic,
  FaImage,
  FaRobot,
  FaEdit,
  FaCalendarAlt,
  FaHashtag,
  FaLightbulb,
  FaShareAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./CreatorTools.css";

/**
 * CreatorTools – Achiri
 * Outils créateur avancés : IA, avatar, filtres, SEO, planification, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : génération avatar IA, filtres photo, SEO captions, planification, partage, feedback, dark mode ready.
 * - Prêt pour extensions futures (badges, analytics, favoris, overlay, IA, etc).
 */

const mockAvatars = [
  { id: 1, url: "https://api.dicebear.com/7.x/bottts/svg?seed=artist" },
  { id: 2, url: "https://api.dicebear.com/7.x/bottts/svg?seed=creative" },
  { id: 3, url: "https://api.dicebear.com/7.x/bottts/svg?seed=achiri" },
];

const CreatorTools = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [caption, setCaption] = useState("");
  const [seoCaption, setSeoCaption] = useState("");
  const [scheduled, setScheduled] = useState("");
  const [image, setImage] = useState(null);
  const [shareMsg, setShareMsg] = useState("");
  const [uploadMsg, setUploadMsg] = useState("");

  // Générateur SEO (mock)
  const handleGenerateCaption = () => {
    setSeoCaption(`🚀 ${caption} | #Achiri #Créateur #Tendance`);
  };

  // Filtres photo (mock)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setUploadMsg("Image chargée avec succès !");
    }
  };

  // Planificateur (mock)
  const handleSchedule = (e) => {
    e.preventDefault();
    setShareMsg(`Publication planifiée pour le ${scheduled} !`);
    setTimeout(() => setShareMsg(""), 4000);
  };

  // Partage (mock)
  const handleShare = () => {
    setShareMsg("Lien partagé ! (Mock)");
    setTimeout(() => setShareMsg(""), 3000);
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
      <section className="mb-6" aria-labelledby="avatar-ia">
        <div id="avatar-ia" className="font-semibold mb-2 flex items-center">
          <FaRobot className="mr-2" /> Générateur d'avatar IA
        </div>
        <div className="flex gap-3">
          {mockAvatars.map((a) => (
            <img
              key={a.id}
              src={a.url}
              alt={`Avatar IA ${a.id}`}
              className={`w-16 h-16 rounded-full border-2 cursor-pointer ${
                selectedAvatar === a.id ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedAvatar(a.id)}
              tabIndex={0}
              aria-label={`Sélectionner l'avatar ${a.id}`}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setSelectedAvatar(a.id)
              }
            />
          ))}
        </div>
        {selectedAvatar && (
          <div className="mt-2 text-green-600 text-sm" aria-live="polite">
            Avatar sélectionné !
          </div>
        )}
      </section>

      {/* Filtres photo (mock) */}
      <section className="mb-6" aria-labelledby="photo-filters">
        <div
          id="photo-filters"
          className="font-semibold mb-2 flex items-center"
        >
          <FaImage className="mr-2" /> Filtres photo
        </div>
        <label
          htmlFor="creator-image-upload"
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaCloudUploadAlt /> <span>Choisir une image à filtrer</span>
        </label>
        <input
          id="creator-image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          aria-label="Choisir une image à filtrer"
          style={{ display: "none" }}
        />
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Aperçu"
              className="w-32 h-32 rounded shadow"
            />
            <div className="text-xs text-gray-400 mt-1">
              Filtre appliqué (mock)
            </div>
          </div>
        )}
        {uploadMsg && (
          <div className="text-green-600 text-xs mt-1" aria-live="polite">
            {uploadMsg}
          </div>
        )}
      </section>

      {/* Générateur de posts/captions SEO */}
      <section className="mb-6" aria-labelledby="seo-caption">
        <div id="seo-caption" className="font-semibold mb-2 flex items-center">
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
          <div
            className="mt-2 bg-gray-100 dark:bg-gray-800 rounded p-2 text-sm"
            aria-live="polite"
          >
            <FaHashtag className="inline mr-1" /> {seoCaption}
            <button
              className="ml-3 text-blue-600 underline text-xs"
              onClick={handleShare}
              aria-label="Partager la légende"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <FaShareAlt className="inline" /> Partager
            </button>
          </div>
        )}
      </section>

      {/* Planificateur de publication */}
      <section className="mb-4" aria-labelledby="scheduler">
        <div id="scheduler" className="font-semibold mb-2 flex items-center">
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
        {shareMsg && (
          <div className="mt-2 text-green-700 text-xs" aria-live="polite">
            {shareMsg}
          </div>
        )}
      </section>

      {/* Astuce créateur */}
      <section
        className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900 rounded text-yellow-800 dark:text-yellow-200 flex items-center"
        aria-label="Astuce créateur"
      >
        <FaLightbulb className="mr-2" />
        <span>
          Astuce : Utilise les outils IA Achiri pour booster ta créativité et ta
          visibilité !
        </span>
      </section>
      <style>{`
        .creator-tools-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .creator-tools-container {
            padding: 1rem !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .creator-tools-container {
            background: #181f2a !important;
            color: #e3f2fd !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CreatorTools;

/**
 * Documentation :
 * - CreatorTools : génération avatar IA, filtres photo, SEO captions, planification, partage, feedback, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier, upload mock.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */
