import React from "react";
import Notifications from "../components/Notifications";

export default function NotificationsPage({ userId }) {
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
      aria-label="Section Notifications"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Notifications
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Retrouvez ici toutes vos notifications importantes et alertes de la plateforme Achiri.
        </p>
      </header>
      {/* Affichage des notifications pour l'utilisateur */}
      <section aria-label="Liste des notifications" style={{ minHeight: 120 }}>
        <Notifications userId={userId} />
      </section>
      {/* Ajoute ici d'autres fonctionnalités liées aux notifications si besoin */}
    </main>
  );
}