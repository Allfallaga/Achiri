import React, { useState } from "react";
import {
  FaUniversalAccess,
  FaLowVision,
  FaSignLanguage,
  FaVolumeUp,
  FaAdjust,
  FaLanguage
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./Accessibility.css";

/**
 * Composant Accessibilité moderne, accessible, UX optimisée.
 * Permet de gérer contraste, taille de police, LSF, voice over, langue.
 */
const Accessibility = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [lsfEnabled, setLsfEnabled] = useState(false);
  const [voiceOver, setVoiceOver] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [lang, setLang] = useState("fr");

  const handleContrast = () => setHighContrast((v) => !v);
  const handleLsf = () => setLsfEnabled((v) => !v);
  const handleVoice = () => setVoiceOver((v) => !v);
  const handleFontSize = (e) => setFontSize(Number(e.target.value));
  const handleLang = (e) => setLang(e.target.value);

  // Optionnel : lecture vocale de la page (démo)
  React.useEffect(() => {
    if (voiceOver) {
      const msg = new window.SpeechSynthesisUtterance(
        "Mode lecture vocale activé. Utilisez tabulation pour naviguer et les options d'accessibilité pour personnaliser votre expérience."
      );
      msg.lang = lang === "fr" ? "fr-FR" : lang === "en" ? "en-US" : "es-ES";
      window.speechSynthesis.speak(msg);
    } else {
      window.speechSynthesis.cancel();
    }
    // Nettoyage à l'unmount
    return () => window.speechSynthesis.cancel();
  }, [voiceOver, lang]);

  return (
    <motion.div
      className={`accessibility-container${highContrast ? " high-contrast" : ""}`}
      style={{ fontSize: `${fontSize}em` }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Accessibilité Achiri"
      tabIndex={0}
    >
      <h2 className="flex items-center mb-4">
        <FaUniversalAccess className="accessibility-icon mr-2" />
        Accessibilité universelle
      </h2>

      {/* Contraste élevé */}
      <div className="accessibility-option">
        <FaAdjust className="accessibility-icon" />
        <div>
          <div>Contraste élevé</div>
          <div className="accessibility-desc">
            Améliore la visibilité pour les utilisateurs malvoyants.
          </div>
        </div>
        <input
          type="checkbox"
          checked={highContrast}
          onChange={handleContrast}
          aria-label="Activer le contraste élevé"
        />
      </div>

      {/* Taille de police */}
      <div className="accessibility-option">
        <FaLowVision className="accessibility-icon" />
        <div>
          <div>Taille de police</div>
          <div className="accessibility-desc">
            Ajuste la taille du texte pour un meilleur confort de lecture.
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="1.5"
          step="0.05"
          value={fontSize}
          onChange={handleFontSize}
          aria-label="Ajuster la taille de police"
        />
        <span>{Math.round(fontSize * 100)}%</span>
      </div>

      {/* LSF / Langue des signes */}
      <div className="accessibility-option">
        <FaSignLanguage className="accessibility-icon" />
        <div>
          <div>Traduction LSF (Langue des Signes Française)</div>
          <div className="accessibility-desc">
            Active la traduction automatique en LSF pour les vidéos et messages.
          </div>
        </div>
        <input
          type="checkbox"
          checked={lsfEnabled}
          onChange={handleLsf}
          aria-label="Activer la traduction LSF"
        />
      </div>
      {lsfEnabled && (
        <div className="lsf-preview">
          <FaSignLanguage className="accessibility-icon" />
          <div>Vidéo LSF en cours... (démo)</div>
        </div>
      )}

      {/* Voice Over */}
      <div className="accessibility-option">
        <FaVolumeUp className="accessibility-icon" />
        <div>
          <div>Lecture vocale</div>
          <div className="accessibility-desc">
            Active la lecture vocale des contenus pour les utilisateurs non-voyants.
          </div>
        </div>
        <input
          type="checkbox"
          checked={voiceOver}
          onChange={handleVoice}
          aria-label="Activer la lecture vocale"
        />
      </div>

      {/* Langue */}
      <div className="accessibility-option">
        <FaLanguage className="accessibility-icon" />
        <div>
          <div>Langue de l&apos;interface</div>
          <div className="accessibility-desc">
            Choisissez la langue d&apos;affichage de l&apos;application.
          </div>
        </div>
        <select value={lang} onChange={handleLang} aria-label="Changer la langue">
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </motion.div>
  );
};

export default Accessibility;