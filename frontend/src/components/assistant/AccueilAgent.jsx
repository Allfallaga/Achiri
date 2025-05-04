/**
 * AccueilAgent.jsx
 * Page d'accueil de l'assistant Achiri.
 * - Présente l'écosystème Achiri, guide l'utilisateur, met en avant l'accessibilité et la sécurité.
 * - Propose un accès rapide à toutes les fonctionnalités principales.
 * - Design moderne, SEO friendly, accessible, compatible mobile/web.
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import "../../styles/accueilAgent.css";

const features = [
  {
    icon: "🤖",
    title: "Assistant IA Multilingue",
    desc: "Posez vos questions, naviguez, obtenez de l'aide en français, anglais, arabe, allemand…",
  },
  {
    icon: "🎥",
    title: "Salles Vidéo & 3D",
    desc: "Rejoignez ou créez des rooms vidéo classiques ou immersives 3D, accessibles à tous.",
  },
  {
    icon: "♿",
    title: "Accessibilité Avancée",
    desc: "Options pour sourds, aveugles, TTS, langue des signes, contraste élevé, navigation clavier.",
  },
  {
    icon: "💰",
    title: "Wallet & Récompenses",
    desc: "Gérez vos points, badges, transactions et récompenses dans un espace sécurisé.",
  },
  {
    icon: "🚨",
    title: "Urgence & Santé",
    desc: "Déclenchez une alerte santé, contactez un proche ou accédez à l'assistance rapidement.",
  },
  {
    icon: "⚙️",
    title: "Paramètres & Profil",
    desc: "Personnalisez votre expérience, gérez vos notifications, badges et préférences.",
  },
];

function AccueilAgent() {
  return (
    <main
      className="accueil-agent-container"
      aria-label="Accueil Assistant Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>Accueil Achiri | Assistant IA, accessibilité, rooms, sécurité</title>
        <meta name="description" content="Bienvenue sur Achiri : assistant IA, rooms vidéo/3D, accessibilité avancée, wallet, urgence, sécurité, mobile/web." />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <header className="accueil-header">
        <h1>
          <span role="img" aria-label="robot">🤖</span> Bienvenue sur Achiri
        </h1>
        <p>
          Votre assistant intelligent, inclusif et sécurisé pour explorer, apprendre, communiquer et s'entraider.
        </p>
      </header>
      <section className="accueil-features" aria-label="Fonctionnalités principales">
        {features.map((f, idx) => (
          <div className="feature-card" key={idx} tabIndex={0} aria-label={f.title}>
            <span className="feature-icon" role="img" aria-label={f.title}>{f.icon}</span>
            <h2>{f.title}</h2>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
      <nav className="accueil-quicklinks" aria-label="Navigation rapide">
        <a href="/VideoRooms" className="quicklink-btn" aria-label="Salles vidéo">🎥 Salles vidéo</a>
        <a href="/VirtualClassroomPage" className="quicklink-btn" aria-label="Classe virtuelle 3D">🕶️ Classe 3D</a>
        <a href="/WalletPage" className="quicklink-btn" aria-label="Wallet">💰 Wallet</a>
        <a href="/AccessibilityPage" className="quicklink-btn" aria-label="Accessibilité">♿ Accessibilité</a>
        <a href="/EmergencySettings" className="quicklink-btn" aria-label="Urgence">🚨 Urgence</a>
        <a href="/SettingsPage" className="quicklink-btn" aria-label="Paramètres">⚙️ Paramètres</a>
      </nav>
      <footer className="accueil-footer">
        <small>
          <span role="img" aria-label="sécurité">🔒</span> Sécurisé & inclusif | <span role="img" aria-label="accessibilité">♿</span> Accessibilité | <span role="img" aria-label="mobile">📱</span> Mobile/Web
        </small>
      </footer>
    </main>
  );
}

export default AccueilAgent;

/**
 * Documentation :
 * - Ce composant est la page d'accueil de l'assistant Achiri.
 * - Met en avant toutes les fonctionnalités clés : IA, accessibilité, rooms, wallet, urgence, sécurité.
 * - Design responsive, accessible (clavier, aria, contraste), SEO via Helmet.
 * - À intégrer comme page d'accueil ou dashboard principal.
 */