import React from "react";
import CreatorTools from "../components/CreatorTools";

const CreatorToolsPage = ({ userId }) => {
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
      aria-label="Section Outils Créateur"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Outils Créateur
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Cette section donne accès aux outils avancés pour les créateurs et administrateurs de la plateforme.
        </p>
      </header>
      {/* Affichage des outils créateur pour l'utilisateur */}
      <section aria-label="Outils créateur" style={{ minHeight: 120 }}>
        <CreatorTools userId={userId} />
      </section>
      {/* Ajoute ici d'autres fonctionnalités liées aux outils créateur si besoin */}
    </main>
  );
};

export default CreatorToolsPage;