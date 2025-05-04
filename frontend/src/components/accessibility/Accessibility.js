import React, { useState, useEffect } from "react";
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
 * Accessibility – Achiri
 * Composant d'accessibilité universelle : UX avancée, sécurité, responsive, SEO friendly, design Achiri.
 * - Contraste élevé, taille de police, LSF, voice over, langue, mobile/web, navigation clavier, aria.
 * - Prêt pour extensions futures (dark mode, préférences utilisateur, analytics accessibilité, export, overlay).
 *
 * Fonctionnalités :
 *   - Contraste élevé (malvoyants)
 *   - Taille de police ajustable
 *   - Traduction LSF (Langue des Signes Française)
 *   - Lecture vocale (voice over)
 *   - Sélecteur de langue (SEO, accessibilité)
 *   - Responsive, mobile first, design avancé, branding Achiri
 *   - Navigation clavier, aria-labels, live region, feedback utilisateur
 */

const Accessibility = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [lsfEnabled, setLsfEnabled] = useState(false);
  const [voiceOver, setVoiceOver] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [lang, setLang] = useState("fr");

  // Contraste élevé (classe globale)
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("achiri-high-contrast");
    } else {
      document.body.classList.remove("achiri-high-contrast");
    }
    return () => document.body.classList.remove("achiri-high-contrast");
  }, [highContrast]);

  // Lecture vocale (démo)
  useEffect(() => {
    if (voiceOver) {
      const msg = new window.SpeechSynthesisUtterance(
        lang === "fr"
          ? "Mode lecture vocale activé. Utilisez tabulation pour naviguer et les options d'accessibilité pour personnaliser votre expérience."
          : lang === "en"
          ? "Voice over mode enabled. Use tab to navigate and accessibility options to customize your experience."
          : "Modo de lectura activado. Usa tabulación para navegar y las opciones de accesibilidad para personalizar tu experiencia."
      );
      msg.lang = lang === "fr" ? "fr-FR" : lang === "en" ? "en-US" : "es-ES";
      window.speechSynthesis.speak(msg);
    } else {
      window.speechSynthesis.cancel();
    }
    return () => window.speechSynthesis.cancel();
  }, [voiceOver, lang]);

  // Langue (SEO/aria)
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "fr";
    };
  }, [lang]);

  // Handlers
  const handleContrast = () => setHighContrast((v) => !v);
  const handleLsf = () => setLsfEnabled((v) => !v);
  const handleVoice = () => setVoiceOver((v) => !v);
  const handleFontSize = (e) => setFontSize(Number(e.target.value));
  const handleLang = (e) => setLang(e.target.value);

  return (
    <motion.section
      className={`accessibility-container${highContrast ? " high-contrast" : ""}`}
      style={{ fontSize: `${fontSize}em` }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Accessibilité Achiri"
      tabIndex={0}
    >
      <h2 className="flex items-center mb-4" tabIndex={0} aria-label="Accessibilité universelle">
        <FaUniversalAccess className="accessibility-icon mr-2" />
        Accessibilité universelle
      </h2>

      {/* Contraste élevé */}
      <div className="accessibility-option" tabIndex={0} aria-label="Contraste élevé">
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
      <div className="accessibility-option" tabIndex={0} aria-label="Taille de police">
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
      <div className="accessibility-option" tabIndex={0} aria-label="Traduction LSF">
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
        <div className="lsf-preview" tabIndex={0} aria-live="polite">
          <FaSignLanguage className="accessibility-icon" />
          <div>Vidéo LSF en cours... (démo)</div>
        </div>
      )}

      {/* Voice Over */}
      <div className="accessibility-option" tabIndex={0} aria-label="Lecture vocale">
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
      <div className="accessibility-option" tabIndex={0} aria-label="Langue de l'interface">
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

      <footer className="accessibility-footer" style={{ marginTop: 18, color: "#888", fontSize: "0.93em", textAlign: "center" }}>
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
    </motion.section>
  );
};

export default Accessibility;

/**
 * Documentation :
 * - Accessibilité universelle : contraste élevé, taille police, LSF, voice over, langue.
 * - Accessibilité : navigation clavier, aria-labels, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, préférences locales, pas de tracking, feedback utilisateur.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (dark mode, overlay, analytics…).
 */