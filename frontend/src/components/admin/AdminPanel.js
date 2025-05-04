import React from 'react';

/**
 * AccessPanel : panneau d'accessibilité (TTS, contraste, raccourcis clavier, taille police, etc.)
 * Props :
 *   ttsEnabled: bool
 *   setTtsEnabled: function
 *   highContrast: bool
 *   setHighContrast: function
 *   fontSize: number
 *   setFontSize: function
 *   shortcuts: [{ key, description }]
 */
function AccessPanel({
  ttsEnabled = false,
  setTtsEnabled,
  highContrast = false,
  setHighContrast,
  fontSize = 16,
  setFontSize,
  shortcuts = [],
}) {
  return (
    <aside
      style={{
        background: highContrast ? '#222' : '#fffde7',
        color: highContrast ? '#fff' : '#222',
        borderRadius: 12,
        padding: 20,
        margin: 16,
        boxShadow: '0 2px 12px #1976d233',
        maxWidth: 360,
        fontSize: fontSize,
        transition: 'background 0.3s, color 0.3s',
        outline: 'none'
      }}
      aria-label="Panneau d'accessibilité"
      tabIndex={0}
    >
      <h3 style={{
        marginTop: 0,
        fontSize: 20,
        color: highContrast ? '#fbbf24' : '#1976d2',
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
        <span role="img" aria-label="Accessibilité">♿</span>
        Accessibilité
      </h3>
      <div style={{ marginBottom: 14 }}>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={ttsEnabled}
            onChange={e => setTtsEnabled && setTtsEnabled(e.target.checked)}
            style={{ marginRight: 8, accentColor: "#1976d2" }}
            aria-checked={ttsEnabled}
            aria-label="Activer la lecture vocale (TTS)"
          />
          Lecture vocale (TTS)
        </label>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={e => setHighContrast && setHighContrast(e.target.checked)}
            style={{ marginRight: 8, accentColor: "#fbbf24" }}
            aria-checked={highContrast}
            aria-label="Activer le contraste élevé"
          />
          Contraste élevé
        </label>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label>
          Taille du texte&nbsp;
          <input
            type="range"
            min={12}
            max={28}
            value={fontSize}
            onChange={e => setFontSize && setFontSize(Number(e.target.value))}
            style={{ verticalAlign: 'middle', accentColor: "#1976d2" }}
            aria-valuenow={fontSize}
            aria-valuemin={12}
            aria-valuemax={28}
            aria-label="Ajuster la taille du texte"
          />
          <span style={{ marginLeft: 8, fontWeight: 'bold' }}>{fontSize}px</span>
        </label>
      </div>
      {shortcuts.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <b>Raccourcis clavier :</b>
          <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15 }}>
            {shortcuts.map((s, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                <kbd style={{
                  background: highContrast ? '#444' : '#eee',
                  borderRadius: 4,
                  padding: '2px 8px',
                  marginRight: 8,
                  fontFamily: 'monospace',
                  color: highContrast ? '#fbbf24' : '#1976d2',
                  border: highContrast ? '1px solid #fbbf24' : '1px solid #bbb'
                }}>{s.key}</kbd>
                {s.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export default AccessPanel;