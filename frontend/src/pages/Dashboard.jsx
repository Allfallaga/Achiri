import React from "react";
import Wallet from "../components/Wallet";
import Notifications from "../components/Notifications";
import VirtualClassroomList from "../components/VirtualClassroomList";
import AccessibilityTest from "../components/AccessibilityTest";
import ProfileAnalysis from "../components/ProfileAnalysis";

/**
 * Dashboard centralisé pour l'utilisateur.
 * Affiche portefeuille, notifications, classes virtuelles, test accessibilité, analyse de profil.
 * Prêt à accueillir d'autres widgets ou liens de navigation si besoin.
 */
const Dashboard = ({ userId }) => {
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
      aria-label="Tableau de bord"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Tableau de bord
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Retrouvez ici vos informations principales, notifications, classes virtuelles et outils d’accessibilité.
        </p>
      </header>
      <section aria-label="Mon portefeuille" style={{ marginBottom: 32 }}>
        <Wallet userId={userId} />
      </section>
      <section aria-label="Notifications" style={{ marginBottom: 32 }}>
        <Notifications userId={userId} />
      </section>
      <section aria-label="Classes virtuelles" style={{ marginBottom: 32 }}>
        <VirtualClassroomList userId={userId} />
      </section>
      <section aria-label="Test d'accessibilité" style={{ marginBottom: 32 }}>
        <AccessibilityTest userId={userId} />
      </section>
      <section aria-label="Analyse de profil" style={{ marginBottom: 0 }}>
        <ProfileAnalysis userId={userId} />
      </section>
      {/* Ajoute ici d'autres widgets, liens ou boutons si besoin */}
    </main>
  );
};

export default Dashboard;