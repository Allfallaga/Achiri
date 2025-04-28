import React from 'react';

/**
 * Affiche un message d'erreur global ou spécifique.
 * Props :
 *   message : string (optionnel)
 *   children : contenu JSX (optionnel)
 */
function Errors({ message, children }) {
  if (!message && !children) return null;

  return (
    <div
      className="error-message"
      style={{
        background: '#ffebee',
        color: '#c62828',
        padding: '1rem',
        borderRadius: 10,
        margin: '1.2rem 0',
        fontWeight: 600,
        textAlign: 'center',
        boxShadow: '0 2px 12px #c6282822',
        fontSize: '1.08em',
        letterSpacing: 0.2,
        outline: 'none'
      }}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
    >
      {message && <span>{message}</span>}
      {children}
    </div>
  );
}

export default Errors;