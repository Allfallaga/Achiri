import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaBell,
  FaEnvelope,
  FaVolumeUp,
  FaSave,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../common/Settings.css"; // Assurez-vous que ce chemin est correct après les déplacements

/**
 * NotificationSettings – Achiri
 * Paramètres avancés de notifications : push, email, sonores, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : notifications push, email, sonores, feedback, sauvegarde mock, dark mode ready.
 * - Prêt pour extensions futures (badges, analytics, favoris, etc).
 *
 * Props :
 *   - userId: string (id utilisateur courant)
 */

const mockNotifSettings = {
  push: true,
  email: false,
  sound: true,
};

const NotificationSettings = ({ userId }) => {
  const [settings, setSettings] = useState(mockNotifSettings);
  const [message, setMessage] = useState("");

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // À connecter au backend pour sauvegarder les paramètres
    setMessage("Notifications sauvegardées !");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <motion.div
      className="settings-panel" // Utilisation de la classe du CSS fourni précédemment
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Paramètres de notifications Achiri"
      // tabIndex={0} // Peut être redondant si le contenu est déjà focusable
    >
      <h2 className="settings-panel-title flex items-center">
        {" "}
        {/* Utilisation de la classe du CSS */}
        <FaBell style={{ marginRight: 8 }} /> Notifications
      </h2>

      {/* Section Push */}
      <div className="setting-item">
        {" "}
        {/* Utilisation de la classe du CSS */}
        <div className="setting-item-label">
          {" "}
          {/* Utilisation de la classe du CSS */}
          <strong>Notifications push</strong>
          <span>Recevoir des alertes directement sur votre appareil.</span>
        </div>
        <div className="setting-item-control">
          {" "}
          {/* Utilisation de la classe du CSS */}
          <label
            className="toggle-switch"
            aria-label="Activer ou désactiver les notifications push"
          >
            {" "}
            {/* Utilisation de la classe du CSS */}
            <input
              type="checkbox"
              checked={settings.push}
              onChange={() => handleToggle("push")}
              aria-checked={settings.push}
            />
            <span className="slider"></span>{" "}
            {/* Utilisation de la classe du CSS */}
          </label>
        </div>
      </div>

      {/* Section Email */}
      <div className="setting-item">
        {" "}
        {/* Utilisation de la classe du CSS */}
        <div className="setting-item-label">
          {" "}
          {/* Utilisation de la classe du CSS */}
          <strong>Notifications par email</strong>
          <span>Recevoir des résumés et alertes par email.</span>
        </div>
        <div className="setting-item-control">
          {" "}
          {/* Utilisation de la classe du CSS */}
          <label
            className="toggle-switch"
            aria-label="Activer ou désactiver les notifications par email"
          >
            {" "}
            {/* Utilisation de la classe du CSS */}
            <input
              type="checkbox"
              checked={settings.email}
              onChange={() => handleToggle("email")}
              aria-checked={settings.email}
            />
            <span className="slider"></span>{" "}
            {/* Utilisation de la classe du CSS */}
          </label>
        </div>
      </div>

      {/* Section Sonores */}
      <div className="setting-item">
        {" "}
        {/* Utilisation de la classe du CSS */}
        <div className="setting-item-label">
          {" "}
          {/* Utilisation de la classe du CSS */}
          <strong>Notifications sonores</strong>
          <span>Activer les sons pour les nouvelles notifications.</span>
        </div>
        <div className="setting-item-control">
          {" "}
          {/* Utilisation de la classe du CSS */}
          <label
            className="toggle-switch"
            aria-label="Activer ou désactiver les notifications sonores"
          >
            {" "}
            {/* Utilisation de la classe du CSS */}
            <input
              type="checkbox"
              checked={settings.sound}
              onChange={() => handleToggle("sound")}
              aria-checked={settings.sound}
            />
            <span className="slider"></span>{" "}
            {/* Utilisation de la classe du CSS */}
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="settings-actions">
        {" "}
        {/* Utilisation de la classe du CSS */}
        <button
          className="btn btn-primary" // Utilisation des classes du CSS
          onClick={handleSave}
          aria-label="Sauvegarder les paramètres de notifications"
        >
          <FaSave style={{ marginRight: 8 }} /> Sauvegarder
        </button>
      </div>

      {/* Message de feedback */}
      {message && (
        <div
          className="settings-message success" // Classe générique pour message, à styler
          role="status" // Plus approprié pour un message de statut
          aria-live="polite"
          style={{
            marginTop: "var(--spacing-md)",
            textAlign: "center",
            color: "var(--color-success-main)",
          }}
        >
          {message}
        </div>
      )}

      {/* Astuce */}
      <div
        className="settings-tip"
        style={{
          marginTop: "var(--spacing-xl)",
          backgroundColor: "var(--color-info-light)", // Utilisation variable CSS
          color: "var(--color-info-dark)", // Utilisation variable CSS
          borderRadius: "var(--radius-md)", // Utilisation variable CSS
          padding: "var(--spacing-sm) var(--spacing-md)", // Utilisation variable CSS
          display: "flex",
          alignItems: "center",
          fontSize: "var(--font-size-sm)", // Utilisation variable CSS
        }}
      >
        <FaInfoCircle style={{ marginRight: 8, flexShrink: 0 }} />
        <span>
          Astuce : Activez les notifications push pour ne rien manquer sur
          Achiri.
        </span>
      </div>
    </motion.div>
  );
};

NotificationSettings.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default NotificationSettings;

/**
 * Documentation :
 * - NotificationSettings : Gère les préférences de notifications (push, email, sonores).
 * - Utilise les styles communs de Settings.css pour la structure et l'apparence.
 * - Intègre des icônes FontAwesome et des animations Framer Motion.
 * - Accessibilité : Labels ARIA, rôles, focus visible (via CSS), `aria-live` pour feedback.
 * - Sécurité : Pas de manipulation directe de données sensibles côté client dans ce composant.
 * - Responsive : Géré par les media queries dans Settings.css.
 * - Design : Conforme au branding Achiri via les variables CSS et la structure HTML/CSS.
 */
