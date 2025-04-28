import React from 'react';
import { useTranslation } from "react-i18next";
import "../../i18n"; // Assure-toi que i18n est importé une fois dans ton app

/**
 * Boutons d'appel audio et vidéo pour chat privé.
 * Props :
 * - onCall(type) : fonction appelée avec 'audio' ou 'video'
 */
function CallButton({ onCall }) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button
        onClick={() => onCall('audio')}
        style={{
          background: 'linear-gradient(90deg, #43a047 0%, #1976d2 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.5em 1.1em',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #1976d222',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
        aria-label={t("audioCall")}
        title={t("audioCall")}
        tabIndex={0}
      >
        <span role="img" aria-label={t("audio")}>🎧</span> {t("audio")}
      </button>
      <button
        onClick={() => onCall('video')}
        style={{
          background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.5em 1.1em',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #1976d222',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
        aria-label={t("videoCall")}
        title={t("videoCall")}
        tabIndex={0}
      >
        <span role="img" aria-label={t("video")}>📹</span> {t("video")}
      </button>
    </div>
  );
}

export default CallButton;