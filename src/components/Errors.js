import React from 'react';

/**
 * Errors
 * - Affiche un ou plusieurs messages d'erreur de façon moderne et accessible
 * - props.errors : string | string[] | undefined
 */
function Errors({ errors }) {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) return null;

  const errorList = Array.isArray(errors) ? errors : [errors];

  return (
    <div
      className="error-messages"
      role="alert"
      aria-live="assertive"
      style={{
        background: "#ffebee",
        color: "#b71c1c",
        border: "1px solid #ffcdd2",
        borderRadius: 8,
        padding: "1em",
        margin: "1em 0",
        fontWeight: 500,
        fontSize: "1.05rem",
        boxShadow: "0 2px 8px #b71c1c22"
      }}
    >
      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
        {errorList.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    </div>
  );
}

export default Errors;