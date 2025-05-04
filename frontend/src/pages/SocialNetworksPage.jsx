import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import SocialNetworkCard from '../components/social/SocialNetworkCard';
import VerificationModal from '../modals/VerificationModal.js';

/**
 * SocialNetworksPage – Achiri
 * Gestion des réseaux sociaux connectés : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Ajout, vérification, boost, navigation rapide, dark mode, mobile first.
 * - Prêt pour extensions futures (statistiques, badges, export, etc).
 * - Accessibilité universelle, feedback utilisateur, SEO friendly, branding Achiri.
 */

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

export default function SocialNetworksPage({ user = { name: "Utilisateur", role: "user" } }) {
  const [networks, setNetworks] = useState(initialState);
  const [modal, setModal] = useState({ open: false, key: null });
  const [darkMode, setDarkMode] = useState(false);

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

  // Dark mode toggle
  const handleDarkMode = () => {
    setDarkMode(v => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        background: darkMode
          ? "linear-gradient(120deg, #181f2a 60%, #223366 100%)"
          : "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2.5rem 2rem",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#e3f2fd" : "#222",
        transition: "background 0.3s, color 0.3s"
      }}
      aria-label="Réseaux sociaux connectés"
      tabIndex={0}
    >
      <Helmet>
        <title>Réseaux Sociaux | Achiri</title>
        <meta name="description" content="Gérez et vérifiez vos réseaux sociaux sur Achiri. Plateforme IA inclusive, accessible et sécurisée." />
        <html lang="fr" />
      </Helmet>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h2 style={{ color: darkMode ? "#ffd600" : "#1976d2", marginBottom: 28, textAlign: "center", flex: 1 }}>
          🌐 Mes Réseaux Sociaux
        </h2>
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#ffd600" : "#1976d2",
            cursor: "pointer",
            fontSize: 22,
            marginLeft: 12
          }}
          tabIndex={0}
        >
          {darkMode ? "🎨" : "🌙"}
        </button>
      </div>
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
            darkMode={darkMode}
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
          darkMode={darkMode}
        />
      )}
      {/* Navigation rapide vers les principales pages */}
      <nav style={{
        marginTop: 32,
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center"
      }} aria-label="Navigation principale">
        <Link to="/" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Accueil</Link>
        <Link to="/dashboard" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Dashboard</Link>
        <Link to="/profile" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Profil</Link>
        <Link to="/accessibilite" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Accessibilité</Link>
        <Link to="/challenges" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Challenges</Link>
        <Link to="/friends" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Amis</Link>
        <Link to="/leaderboard" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Classement</Link>
        <Link to="/creator-tools" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Creator Tools</Link>
        <Link to="/admin" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Admin</Link>
        <Link to="/social-interactions" style={{ margin: 8, color: darkMode ? "#ffd600" : "#1976d2" }}>Interactions Sociales</Link>
      </nav>
      <footer
        style={{
          marginTop: 24,
          color: darkMode ? "#ffd600" : "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
      <style>{`
        main[aria-label="Réseaux sociaux connectés"]:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          main[aria-label="Réseaux sociaux connectés"] {
            padding: 1em 0.2em !important;
            border-radius: 8px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          main[aria-label="Réseaux sociaux connectés"] {
            background: linear-gradient(120deg, #181f2a 60%, #223366 100%) !important;
            color: #e3f2fd !important;
          }
          h2 {
            color: #ffd600 !important;
          }
        }
      `}</style>
    </main>
  );
}

/**
 * Documentation :
 * - SocialNetworksPage : gestion réseaux sociaux, vérification, boost, navigation rapide, responsive, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (statistiques, badges, export, etc).
 */