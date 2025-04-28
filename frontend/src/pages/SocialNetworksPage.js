import React, { useState } from 'react';
import SocialNetworkCard from '../components/social/SocialNetworkCard';
import VerificationModal from '../components/modals/VerificationModal';
import { Link } from "react-router-dom";

const SUPPORTED_NETWORKS = [
  { key: "facebook", name: "Facebook", icon: "📘" },
  { key: "instagram", name: "Instagram", icon: "📸" },
  { key: "tiktok", name: "TikTok", icon: "🎵" },
  { key: "youtube", name: "YouTube", icon: "▶️" },
  { key: "twitter", name: "Twitter", icon: "🐦" },
  { key: "linkedin", name: "LinkedIn", icon: "💼" }
];

// Simule l'état initial (à remplacer par un fetch backend plus tard)
const initialState = SUPPORTED_NETWORKS.reduce((acc, n) => {
  acc[n.key] = {
    url: "",
    status: "non-verifie", // "non-verifie" | "en-attente" | "verifie"
    code: Math.random().toString(36).substring(2, 8).toUpperCase(),
    method: n.key === "facebook" ? "oauth" : "bio"
  };
  return acc;
}, {});

function SocialNetworksPage({ user = { name: "Utilisateur", role: "user" } }) {
  const [networks, setNetworks] = useState(initialState);
  const [modal, setModal] = useState({ open: false, key: null });

  // Gestion du changement d'URL
  const handleUrlChange = (key, url) => {
    setNetworks(prev => ({
      ...prev,
      [key]: { ...prev[key], url }
    }));
  };

  // Lancer la vérification
  const handleVerify = (key) => {
    setModal({ open: true, key });
    setNetworks(prev => ({
      ...prev,
      [key]: { ...prev[key], status: "en-attente" }
    }));
  };

  // Validation de la vérification
  const handleValidate = () => {
    if (!modal.key) return;
    setNetworks(prev => ({
      ...prev,
      [modal.key]: { ...prev[modal.key], status: "verifie" }
    }));
    setModal({ open: false, key: null });
  };

  // Fermer le modal
  const handleCloseModal = () => setModal({ open: false, key: null });

  // Lancer le boost (redirige vers la page interactions)
  const handleBoost = (key) => {
    window.location.href = "/social-interactions";
  };

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2.5rem 2rem",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Réseaux sociaux connectés"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 28, textAlign: "center" }}>
        🌐 Mes Réseaux Sociaux
      </h2>
      <div>
        {SUPPORTED_NETWORKS.map(n => (
          <SocialNetworkCard
            key={n.key}
            name={n.name}
            icon={n.icon}
            profileUrl={networks[n.key].url}
            status={networks[n.key].status}
            onUrlChange={url => handleUrlChange(n.key, url)}
            onVerify={() => handleVerify(n.key)}
            onBoost={() => handleBoost(n.key)}
            role={user.role}
          />
        ))}
      </div>
      {modal.open && (
        <VerificationModal
          open={modal.open}
          onClose={handleCloseModal}
          platform={SUPPORTED_NETWORKS.find(n => n.key === modal.key)?.name}
          code={networks[modal.key]?.code}
          method={networks[modal.key]?.method}
          onValidate={handleValidate}
        />
      )}
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
        <Link to="/social-interactions" style={{ margin: 8 }}>Interactions Sociales</Link>
      </nav>
    </main>
  );
}

export default SocialNetworksPage;