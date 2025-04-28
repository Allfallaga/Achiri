import React from "react";
import Wallet from "../components/Wallet";
import TransactionList from "../components/TransactionList";
import { Link } from "react-router-dom";

export default function WalletPage({ userId }) {
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
      aria-label="Section Wallet"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Mon Wallet
        </h1>
      </header>
      {/* Affichage du wallet de l'utilisateur */}
      <section aria-label="Mon portefeuille" style={{ marginBottom: 32 }}>
        <Wallet userId={userId} />
      </section>
      {/* Historique des transactions */}
      <section aria-label="Historique des transactions">
        <TransactionList userId={userId} />
      </section>
      {/* Navigation rapide vers les principales pages */}
      <nav style={{ marginTop: 32, textAlign: "center" }} aria-label="Navigation principale">
        <Link to="/" style={{ margin: 8 }}>Accueil</Link>
        <Link to="/dashboard" style={{ margin: 8 }}>Dashboard</Link>
        <Link to="/profile" style={{ margin: 8 }}>Profil</Link>
        <Link to="/accessibilite" style={{ margin: 8 }}>Accessibilité</Link>
        <Link to="/challenges" style={{ margin: 8 }}>Challenges</Link>
        <Link to="/friends" style={{ margin: 8 }}>Amis</Link>
        <Link to="/leaderboard" style={{ margin: 8 }}>Classement</Link>
        <Link to="/creator-tools" style={{ margin: 8 }}>Creator Tools</Link>
        <Link to="/admin" style={{ margin: 8 }}>Admin</Link>
        <Link to="/music" style={{ margin: 8 }}>Musique</Link>
        <Link to="/notifications" style={{ margin: 8 }}>Notifications</Link>
        <Link to="/social-interactions" style={{ margin: 8 }}>Interactions Sociales</Link>
        <Link to="/reseaux-sociaux" style={{ margin: 8 }}>Réseaux Sociaux</Link>
        <Link to="/rooms" style={{ margin: 8 }}>Rooms</Link>
        <Link to="/settings" style={{ margin: 8 }}>Paramètres</Link>
        <Link to="/virtual-classroom" style={{ margin: 8 }}>Classes Virtuelles</Link>
        <Link to="/wallet" style={{ margin: 8 }}>Wallet</Link>
      </nav>
      {/* Ajoute ici d'autres fonctionnalités liées au wallet si besoin */}
    </main>
  );
}