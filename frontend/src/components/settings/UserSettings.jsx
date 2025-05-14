import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaMoon,
  FaSun,
  FaLock,
  FaBell,
  FaLanguage,
  FaSignLanguage,
  FaEye,
  FaSave,
  FaVolumeUp,
  FaLowVision,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../common/Settings.css";

/**
 * UserSettings – Achiri
 * Paramètres utilisateur avancés : thème, notifications, langue, accessibilité, confidentialité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : dark mode, notifications, langues, accessibilité (LSF, vocal, contraste), confidentialité, feedback, sauvegarde mock, dark mode ready.
 * - Prêt pour extensions futures (badges, analytics, favoris, RGPD, etc).
 *
 * Props :
 *   - userId: string (id utilisateur courant)
 */

const mockUserSettings = {
  darkMode: false,
  notifications: true,
  language: "fr",
  accessibility: {
    signLanguage: false,
    voiceOver: false,
    highContrast: false,
  },
  privacy: {
    profilePublic: true,
    dataExport: false,
  },
  security: {
    twoFactor: false,
  },
};

const UserSettings = ({ userId }) => {
  const [settings, setSettings] = useState(mockUserSettings);
  const [message, setMessage] = useState("");

  // Gestion des toggles
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAccessibilityToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: !prev.accessibility[key],
      },
    }));
  };

  const handlePrivacyToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

  const handleSecurityToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key],
      },
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      language: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // À connecter au backend pour sauvegarder les paramètres
    setMessage("Paramètres sauvegardés !");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <motion.div
      className="settings-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Paramètres utilisateur Achiri"
      tabIndex={0}
    >
      <h2 className="settings-title flex items-center">
        <FaUser style={{ marginRight: 8 }} /> Paramètres du compte
      </h2>

      {/* Thème */}
      <div className="settings-section flex items-center justify-between">
        <span className="flex items-center">
          {settings.darkMode ? (
            <FaMoon style={{ marginRight: 8 }} />
          ) : (
            <FaSun style={{ marginRight: 8 }} />
          )}
          Mode {settings.darkMode ? "sombre" : "clair"}
        </span>
        <label
          className="settings-switch"
          aria-label="Changer le mode d'affichage"
        >
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => handleToggle("darkMode")}
            aria-checked={settings.darkMode}
          />
          <span>Activer</span>
        </label>
      </div>

      {/* Notifications */}
      <div className="settings-section flex items-center justify-between">
        <span className="flex items-center">
          <FaBell style={{ marginRight: 8 }} /> Notifications
        </span>
        <label
          className="settings-switch"
          aria-label="Activer/désactiver les notifications"
        >
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => handleToggle("notifications")}
            aria-checked={settings.notifications}
          />
          <span>Activer</span>
        </label>
      </div>

      {/* Langue */}
      <div className="settings-section flex items-center justify-between">
        <span className="flex items-center">
          <FaLanguage style={{ marginRight: 8 }} /> Langue
        </span>
        <select
          value={settings.language}
          onChange={handleLanguageChange}
          className="settings-select"
          aria-label="Changer la langue"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Accessibilité */}
      <div className="settings-section">
        <span className="flex items-center" style={{ marginBottom: 8 }}>
          <FaEye style={{ marginRight: 8 }} /> Accessibilité
        </span>
        <div className="flex flex-wrap gap-4" style={{ marginLeft: 16 }}>
          <label className="settings-switch" style={{ minWidth: 180 }}>
            <FaSignLanguage style={{ marginRight: 6 }} />
            <span>Langue des Signes</span>
            <input
              type="checkbox"
              checked={settings.accessibility.signLanguage}
              onChange={() => handleAccessibilityToggle("signLanguage")}
              aria-checked={settings.accessibility.signLanguage}
              aria-label="Activer la traduction en langue des signes"
              style={{ marginLeft: 8 }}
            />
          </label>
          <label className="settings-switch" style={{ minWidth: 180 }}>
            <FaVolumeUp style={{ marginRight: 6 }} />
            <span>Lecture vocale</span>
            <input
              type="checkbox"
              checked={settings.accessibility.voiceOver}
              onChange={() => handleAccessibilityToggle("voiceOver")}
              aria-checked={settings.accessibility.voiceOver}
              aria-label="Activer la lecture vocale"
              style={{ marginLeft: 8 }}
            />
          </label>
          <label className="settings-switch" style={{ minWidth: 180 }}>
            <FaLowVision style={{ marginRight: 6 }} />
            <span>Contraste élevé</span>
            <input
              type="checkbox"
              checked={settings.accessibility.highContrast}
              onChange={() => handleAccessibilityToggle("highContrast")}
              aria-checked={settings.accessibility.highContrast}
              aria-label="Activer le contraste élevé"
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
      </div>

      {/* Confidentialité */}
      <div className="settings-section">
        <span className="flex items-center" style={{ marginBottom: 8 }}>
          <FaLock style={{ marginRight: 8 }} /> Confidentialité
        </span>
        <div className="flex flex-wrap gap-4" style={{ marginLeft: 16 }}>
          <label className="settings-switch" style={{ minWidth: 180 }}>
            <span>Profil public</span>
            <input
              type="checkbox"
              checked={settings.privacy.profilePublic}
              onChange={() => handlePrivacyToggle("profilePublic")}
              aria-checked={settings.privacy.profilePublic}
              aria-label="Rendre le profil public"
              style={{ marginLeft: 8 }}
            />
          </label>
          <label className="settings-switch" style={{ minWidth: 180 }}>
            <span>Exporter mes données</span>
            <input
              type="checkbox"
              checked={settings.privacy.dataExport}
              onChange={() => handlePrivacyToggle("dataExport")}
              aria-checked={settings.privacy.dataExport}
              aria-label="Exporter mes données"
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
      </div>

      {/* Sécurité */}
      <div className="settings-section">
        <span className="flex items-center" style={{ marginBottom: 8 }}>
          <FaShieldAlt style={{ marginRight: 8 }} /> Sécurité
        </span>
        <div className="flex flex-wrap gap-4" style={{ marginLeft: 16 }}>
          <label className="settings-switch" style={{ minWidth: 180 }}>
            <span>Double authentification</span>
            <input
              type="checkbox"
              checked={settings.security.twoFactor}
              onChange={() => handleSecurityToggle("twoFactor")}
              aria-checked={settings.security.twoFactor}
              aria-label="Activer la double authentification"
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
      </div>

      {/* Bouton sauvegarde */}
      <button
        className="settings-btn"
        onClick={handleSave}
        aria-label="Sauvegarder les paramètres"
        style={{ display: "flex", alignItems: "center", margin: "0 auto" }}
      >
        <FaSave style={{ marginRight: 8 }} /> Sauvegarder
      </button>
      {message && (
        <div className="settings-message success" aria-live="polite">
          {message}
        </div>
      )}

      {/* Astuce sécurité */}
      <div
        className="settings-tip"
        style={{
          marginTop: 24,
          background: "#fffde7",
          color: "#bfa700",
          borderRadius: 8,
          padding: "0.7em 1em",
          display: "flex",
          alignItems: "center",
          fontSize: 15,
        }}
      >
        <FaInfoCircle style={{ marginRight: 8 }} />
        Astuce : Active la double authentification pour renforcer la sécurité de
        ton compte Achiri.
      </div>
    </motion.div>
  );
};

UserSettings.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserSettings;

/**
 * Documentation :
 * - UserSettings : thème, notifications, langue, accessibilité, confidentialité, sécurité, feedback, sauvegarde mock, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier, double authentification mock.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
