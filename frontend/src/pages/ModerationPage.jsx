import React from "react";
import Moderation from "../components/Moderation/ModerationPanel";

export default function ModerationPage({ userId }) {
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
      aria-label="Section Modération"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Modération
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Gérez les signalements, utilisateurs et contenus de la plateforme Achiri.
        </p>
      </header>
      {/* Affichage du panneau de modération */}
      <section aria-label="Panneau de modération" style={{ minHeight: 120 }}>
        <Moderation userId={userId} />
      </section>
      {/* Ajoute ici d'autres fonctionnalités liées à la modération si besoin */}
    </main>
  );
}