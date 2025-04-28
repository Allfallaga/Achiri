import React from "react";
import VirtualClassroom from "../components/VirtualClassroom";
import VirtualClassroomList from "../components/VirtualClassroomList";
import { Link } from "react-router-dom";

export default function VirtualClassroomPage({ userId }) {
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
      aria-label="Section Classes Virtuelles"
      tabIndex={0}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#1976d2", fontWeight: 700, fontSize: "2rem", margin: 0 }}>
          Classes Virtuelles
        </h1>
        <p style={{ color: "#444", marginBottom: 0, fontSize: "1.1em" }}>
          Participez, créez ou gérez vos classes virtuelles sur Achiri.
        </p>
      </header>
      {/* Affichage de la liste des classes virtuelles */}
      <section aria-label="Liste des classes virtuelles" style={{ marginBottom: 32 }}>
        <VirtualClassroomList userId={userId} />
      </section>
      {/* Affichage de la classe virtuelle principale (si besoin) */}
      <section aria-label="Classe virtuelle principale">
        <VirtualClassroom userId={userId} />
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
      </nav>
      {/* Ajoute ici d'autres fonctionnalités liées aux classes virtuelles si besoin */}
    </main>
  );
}