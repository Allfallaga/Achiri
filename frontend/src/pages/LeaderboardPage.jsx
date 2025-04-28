import React from "react";
import Leaderboard from "../components/Leaderboard";

export default function LeaderboardPage({ userId }) {
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
      aria-label="Section Classement"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Classement
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Découvrez le classement des utilisateurs les plus actifs et engagés de la communauté Achiri.
        </p>
      </header>
      <section aria-label="Classement des utilisateurs" style={{ minHeight: 120 }}>
        <Leaderboard userId={userId} />
      </section>
      {/* Ajoute ici d'autres fonctionnalités liées au classement si besoin */}
    </main>
  );
}