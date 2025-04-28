import React from "react";

const AccessibilityPage = ({ children }) => {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.06)",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Section Accessibilité IA"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Accessibilité IA
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Cette section propose des outils d’accessibilité basés sur l’intelligence artificielle pour faciliter l’inclusion numérique, la communication et l’autonomie.
        </p>
      </header>
      <section
        style={{
          background: "#f5f5f5",
          borderRadius: 10,
          padding: 28,
          marginBottom: 36,
          boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.04)"
        }}
        aria-labelledby="outils-accessibilite"
      >
        <h2 id="outils-accessibilite" style={{ color: "#333", fontSize: "1.25em", fontWeight: 600 }}>
          Outils disponibles :
        </h2>
        <ul style={{ marginLeft: 28, color: "#222", fontSize: "1.07em", lineHeight: 1.7 }}>
          <li>Analyse visuelle de la scène par IA (description d’image en direct)</li>
          <li>Traduction automatique en langue des signes</li>
          <li>Autres modules d’accessibilité à venir…</li>
        </ul>
      </section>
      {/* Zone pour les composants enfants (ex: CameraDescription, SignLanguageTranslator, etc.) */}
      <section aria-label="Modules d'accessibilité IA" style={{ minHeight: 120 }}>
        {children}
      </section>
    </main>
  );
};

export default AccessibilityPage;