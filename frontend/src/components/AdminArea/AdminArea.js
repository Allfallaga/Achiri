import React, { useState } from 'react';

/**
 * AdminArea
 * - Permet à l'admin de gérer les paramètres de la room : public/privé, audio/vidéo, filtrage d'URL
 */
function AdminArea({ isPublic = true, audioOnly = false, onChange, filterUrls = false }) {
  const [publicRoom, setPublicRoom] = useState(isPublic);
  const [audioMode, setAudioMode] = useState(audioOnly);
  const [urlFilter, setUrlFilter] = useState(filterUrls);

  // Appelle le callback parent à chaque changement
  const handleChange = (field, value) => {
    if (field === "publicRoom") setPublicRoom(value);
    if (field === "audioMode") setAudioMode(value);
    if (field === "urlFilter") setUrlFilter(value);
    if (onChange) onChange({ publicRoom: field === "publicRoom" ? value : publicRoom, audioMode: field === "audioMode" ? value : audioMode, urlFilter: field === "urlFilter" ? value : urlFilter });
  };

  return (
    <section
      className="admin-area"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 12,
        padding: "2rem 1rem",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
      }}
      aria-labelledby="admin-area-title"
    >
      <h2 id="admin-area-title" style={{ fontSize: "1.3rem", marginBottom: 18 }}>
        <span role="img" aria-label="admin">🛠️</span> Paramètres administrateur
      </h2>
      <div className="admin-action" style={{ marginBottom: 18 }}>
        <label style={{ cursor: "pointer", fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={publicRoom}
            onChange={e => handleChange("publicRoom", e.target.checked)}
            aria-checked={publicRoom}
            aria-label="Salle publique"
            style={{ marginRight: 8 }}
          />
          Salle publique
        </label>
      </div>
      <div className="admin-action" style={{ marginBottom: 18 }}>
        <label style={{ cursor: "pointer", fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={audioMode}
            onChange={e => handleChange("audioMode", e.target.checked)}
            aria-checked={audioMode}
            aria-label="Mode audio uniquement"
            style={{ marginRight: 8 }}
          />
          Mode audio uniquement
        </label>
      </div>
      <div className="admin-action">
        <label style={{ cursor: "pointer", fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={urlFilter}
            onChange={e => handleChange("urlFilter", e.target.checked)}
            aria-checked={urlFilter}
            aria-label="Filtrer les URLs dans le chat"
            style={{ marginRight: 8 }}
          />
          Filtrer les URLs dans le chat
        </label>
      </div>
    </section>
  );
}

export default AdminArea;