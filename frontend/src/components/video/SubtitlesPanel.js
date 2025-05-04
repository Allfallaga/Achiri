/**
 * SubtitlesPanel.js – Achiri
 * Affichage des sous-titres temps réel pour la visioconférence.
 * - Accessibilité avancée : aria-live, navigation clavier, contraste, responsive, dark mode.
 * - Sécurité : pas d’info sensible, contrôle affichage.
 * - SEO : structure claire, aria, mobile first.
 * - Props : subtitles (texte ou tableau), lang (code langue), visible (bool), onClose (callback)
 */

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function SubtitlesPanel({
  subtitles = "",
  lang = "fr",
  visible = true,
  onClose = null,
  darkMode = false
}) {
  const panelRef = useRef();

  // Focus auto pour accessibilité
  useEffect(() => {
    if (visible && panelRef.current) {
      panelRef.current.focus();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <aside
      className={`subtitles-panel${darkMode ? " dark" : ""}`}
      ref={panelRef}
      tabIndex={0}
      aria-live="polite"
      aria-label="Sous-titres temps réel"
      lang={lang}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 80,
        margin: "0 auto",
        maxWidth: 600,
        background: darkMode ? "rgba(24,28,36,0.95)" : "rgba(255,255,255,0.95)",
        color: darkMode ? "#ffd600" : "#222",
        borderRadius: 12,
        boxShadow: "0 2px 16px #1976d244",
        padding: "8px 18px",
        fontSize: "1.15em",
        textAlign: "center",
        zIndex: 20,
        outline: "none"
      }}
    >
      <span style={{ wordBreak: "break-word" }}>
        {Array.isArray(subtitles) ? subtitles.join(" ") : subtitles}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Fermer les sous-titres"
          title="Fermer les sous-titres"
          style={{
            position: "absolute",
            top: 6,
            right: 10,
            background: "none",
            border: "none",
            color: darkMode ? "#ffd600" : "#1976d2",
            fontSize: "1.2em",
            cursor: "pointer"
          }}
        >
          ✖
        </button>
      )}
      <style>{`
        .subtitles-panel:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .subtitles-panel {
            font-size: 1em;
            padding: 6px 6px;
            max-width: 98vw;
            left: 1vw;
            right: 1vw;
          }
        }
        @media (prefers-color-scheme: dark) {
          .subtitles-panel {
            background: rgba(24,28,36,0.98) !important;
            color: #ffd600 !important;
          }
        }
      `}</style>
    </aside>
  );
}

SubtitlesPanel.propTypes = {
  subtitles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lang: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  darkMode: PropTypes.bool
};

export default SubtitlesPanel;

/**
 * Documentation :
 * - Props : subtitles (texte ou tableau), lang (code langue), visible (bool), onClose (callback), darkMode (bool)
 * - Affiche les sous-titres temps réel, focus auto, aria-live, mobile responsive, dark mode.
 * - Accessibilité : aria, navigation clavier, contraste, SEO ready.
 * - Sécurité : pas d’info sensible, contrôle affichage.
 */