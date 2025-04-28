import React from "react";
import MusicLibrary from "../components/MusicLibrary";

export default function MusicPage({ userId }) {
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
      aria-label="Section Musique"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Bibliothèque Musicale
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Écoutez, partagez et découvrez de la musique avec la communauté Achiri.
        </p>
      </header>
      {/* Affichage de la bibliothèque musicale pour l'utilisateur */}
      <section aria-label="Bibliothèque musicale" style={{ minHeight: 120 }}>
        <MusicLibrary userId={userId} />
      </section>
      {/* Ajoute ici d'autres fonctionnalités liées à la musique si besoin */}
    </main>
  );
}