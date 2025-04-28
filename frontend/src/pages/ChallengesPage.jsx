import React from "react";
import Challenges from "../components/Challenges";

export default function ChallengesPage({ userId }) {
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
      aria-label="Section Challenges"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Challenges
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Participez à des défis pour gagner des points, des badges et progresser dans la communauté Achiri.
        </p>
      </header>
      {/* Affichage des challenges pour l'utilisateur */}
      <section aria-label="Liste des challenges" style={{ minHeight: 120 }}>
        <Challenges userId={userId} />
      </section>
      {/* Ajoute ici d'autres fonctionnalités liées aux challenges si besoin */}
    </main>
  );
}