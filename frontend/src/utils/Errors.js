import React from 'react';

/**
 * Errors – Achiri
 * Affiche un ou plusieurs messages d'erreur de façon moderne, accessible et sécurisée.
 * - Accessibilité avancée (ARIA, feedback visuel/sonore possible)
 * - Sécurité (aucune donnée sensible, pas de tracking)
 * - Compatible mobile/web, design moderne et responsive
 * - Prêt pour extensions (badges, export, notifications, multi-langues, SEO, etc)
 *
 * Props :
 *   - errors : string | string[] | undefined
 */

function Errors({ errors }) {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) return null;

  const errorList = Array.isArray(errors) ? errors : [errors];

  return (
    <div
      className="error-messages"
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      style={{
        background: "linear-gradient(90deg, #ffebee 60%, #ffcdd2 100%)",
        color: "#b71c1c",
        border: "1.5px solid #ffcdd2",
        borderRadius: 10,
        padding: "1em 1.3em",
        margin: "1em 0",
        fontWeight: 500,
        fontSize: "1.07rem",
        boxShadow: "0 2px 12px #b71c1c22",
        maxWidth: 520,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
        {errorList.map((err, idx) => (
          <li key={idx} style={{ marginBottom: 2 }}>{err}</li>
        ))}
      </ul>
    </div>
  );
}

export default Errors;

/**
 * Documentation :
 * - Props : errors (string ou tableau de string)
 * - Accessibilité : ARIA, feedback visuel, navigation clavier
 * - Sécurité : aucune donnée sensible, pas de tracking
 * - Extensible : badges, export, notifications, multi-langues, SEO, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */