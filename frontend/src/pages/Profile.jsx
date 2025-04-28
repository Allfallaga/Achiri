import React from "react";
import UploadFile from "../components/UploadFile";
import Wallet from "../components/Wallet";
import ProfileAnalysis from "../components/ProfileAnalysis";
import AccessibilityTest from "../components/AccessibilityTest";
import TransactionList from "../components/TransactionList";

export default function Profile({ userId }) {
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
      aria-label="Profil utilisateur"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Mon Profil
        </h1>
      </header>
      {/* Upload de fichiers pour l'utilisateur */}
      <section aria-label="Upload de fichiers" style={{ marginBottom: 32 }}>
        <UploadFile />
      </section>
      {/* Affichage du wallet de l'utilisateur */}
      <section aria-label="Mon portefeuille" style={{ marginBottom: 32 }}>
        <Wallet userId={userId} />
      </section>
      {/* Historique des transactions */}
      <section aria-label="Historique des transactions" style={{ marginBottom: 32 }}>
        <TransactionList userId={userId} />
      </section>
      {/* Test d'accessibilité IA */}
      <section aria-label="Test d'accessibilité IA" style={{ marginBottom: 32 }}>
        <AccessibilityTest userId={userId} />
      </section>
      {/* Analyse du profil */}
      <section aria-label="Analyse de profil" style={{ marginBottom: 0 }}>
        <ProfileAnalysis userId={userId} />
      </section>
      {/* Ajoute ici d'autres composants liés au profil si besoin */}
    </main>
  );
}