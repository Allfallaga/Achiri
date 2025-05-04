import React from 'react';

/**
 * AccessPanel – Achiri
 * Panneau d'accessibilité universelle : TTS, contraste, taille police, raccourcis clavier, mobile/web, SEO, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, branding Achiri.
 * - Fonctionnalités : lecture vocale (TTS), contraste élevé, taille police, raccourcis clavier, feedback utilisateur, mobile first.
 * - Prêt pour extensions futures (dark mode, analytics, overlay, export, badges, IA…).
 *
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
      className="achiri-access-panel"
      style={{
        background: highContrast ? '#222' : '#fffde7',
        color: highContrast ? '#fff' : '#222',
        borderRadius: 14,
        padding: 22,
        margin: 16,
        boxShadow: '0 2px 16px #1976d233',
        maxWidth: 400,
        fontSize: fontSize,
        transition: 'background 0.3s, color 0.3s',
        outline: 'none'
      }}
      aria-label="Panneau d'accessibilité Achiri"
      tabIndex={0}
    >
      <h3 style={{
        marginTop: 0,
        fontSize: 22,
        color: highContrast ? '#fbbf24' : '#1976d2',
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
        <span role="img" aria-label="Accessibilité">♿</span>
        Accessibilité
      </h3>
      <div style={{ marginBottom: 16 }}>
        <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={ttsEnabled}
            onChange={e => setTtsEnabled && setTtsEnabled(e.target.checked)}
            style={{ accentColor: "#1976d2" }}
            aria-checked={ttsEnabled}
            aria-label="Activer la lecture vocale (TTS)"
          />
          Lecture vocale (TTS)
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={e => setHighContrast && setHighContrast(e.target.checked)}
            style={{ accentColor: "#fbbf24" }}
            aria-checked={highContrast}
            aria-label="Activer le contraste élevé"
          />
          Contraste élevé
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Taille du texte
          <input
            type="range"
            min={12}
            max={28}
            value={fontSize}
            onChange={e => setFontSize && setFontSize(Number(e.target.value))}
            style={{ accentColor: "#1976d2" }}
            aria-valuenow={fontSize}
            aria-valuemin={12}
            aria-valuemax={28}
            aria-label="Ajuster la taille du texte"
          />
          <span style={{ fontWeight: 'bold' }}>{fontSize}px</span>
        </label>
      </div>
      {shortcuts.length > 0 && (
        <div style={{ marginTop: 18 }}>
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
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        .achiri-access-panel:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .achiri-access-panel {
            padding: 1rem;
            max-width: 99vw;
            font-size: 1em;
          }
        }
        @media (prefers-color-scheme: dark) {
          .achiri-access-panel {
            background: #232b3b;
            color: #ffe082;
          }
        }
      `}</style>
    </aside>
  );
}

export default AccessPanel;

/**
 * Documentation :
 * - Panneau accessibilité universelle : TTS, contraste, taille police, raccourcis clavier.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (dark mode, overlay, IA…).
 */