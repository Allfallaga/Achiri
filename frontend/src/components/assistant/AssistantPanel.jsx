/**
 * AssistantPanel.jsx
 * Panneau latéral/contextuel de l'assistant Achiri.
 * - Affiche l'état, l'historique, les suggestions, la mémoire, les notifications IA.
 * - Permet d'accéder rapidement à toutes les fonctions (chat, rooms, wallet, accessibilité, etc.).
 * - Design moderne, SEO friendly, accessible, sécurisé, compatible mobile/web.
 */

import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { AssistantContext } from "../../context/AssistantContext";
import { AccessibilityContext } from "../../context/AccessibilityContext";
import "../../styles/assistantPanel.css";

const panelSections = [
  { key: "memory", label: "Mémoire IA", icon: "🧠" },
  { key: "suggestions", label: "Suggestions", icon: "💡" },
  { key: "notifications", label: "Notifications", icon: "🔔" },
  { key: "shortcuts", label: "Raccourcis", icon: "⚡" },
];

function AssistantPanel({ onClose }) {
  const {
    memory = [],
    suggestions = [],
    notifications = [],
  } = useContext(AssistantContext) || {};
  const { accessibility } = useContext(AccessibilityContext) || {};
  const [activeSection, setActiveSection] = useState("memory");

  // SEO & accessibilité
  useEffect(() => {
    document.body.classList.toggle("dark", accessibility?.darkMode);
  }, [accessibility?.darkMode]);

  // Raccourcis rapides (exemples)
  const shortcuts = [
    { label: "Accueil IA", icon: "🤖", to: "/" },
    { label: "Video Rooms", icon: "🎥", to: "/VideoRooms" },
    { label: "Wallet", icon: "💰", to: "/WalletPage" },
    { label: "Accessibilité", icon: "♿", to: "/AccessibilityPage" },
    { label: "Urgence", icon: "🚨", to: "/EmergencySettings" },
    { label: "Paramètres", icon: "⚙️", to: "/SettingsPage" },
  ];

  return (
    <aside
      className={`assistant-panel${accessibility?.highContrast ? " high-contrast" : ""}${accessibility?.darkMode ? " dark" : ""}`}
      aria-label="Panneau assistant Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>
          Assistant Achiri | Panneau IA, mémoire, notifications, raccourcis
        </title>
        <meta
          name="description"
          content="Panneau contextuel de l'assistant Achiri : mémoire IA, suggestions, notifications, accès rapide à toutes les fonctions, accessibilité avancée."
        />
      </Helmet>
      <header className="assistant-panel-header">
        <h2>
          <span role="img" aria-label="assistant">
            🤖
          </span>{" "}
          Panneau IA
        </h2>
        {onClose && (
          <button
            className="panel-close-btn"
            aria-label="Fermer le panneau"
            onClick={onClose}
          >
            ✖
          </button>
        )}
      </header>
      <nav className="panel-tabs" aria-label="Sections IA">
        {panelSections.map((section) => (
          <button
            key={section.key}
            className={`panel-tab${activeSection === section.key ? " active" : ""}`}
            aria-label={section.label}
            onClick={() => setActiveSection(section.key)}
            tabIndex={0}
          >
            <span role="img" aria-label={section.label}>
              {section.icon}
            </span>{" "}
            {section.label}
          </button>
        ))}
      </nav>
      <section className="panel-content" aria-live="polite">
        {activeSection === "memory" && (
          <div className="panel-section panel-memory">
            <h3>Historique & Mémoire IA</h3>
            <ul>
              {memory.length ? (
                memory
                  .slice(-10)
                  .reverse()
                  .map((msg, idx) => (
                    <li key={idx} className={`msg-${msg.from}`}>
                      <span className="msg-author">
                        {msg.from === "achiri" ? "Achiri" : "Moi"}
                      </span>
                      <span className="msg-text">{msg.text}</span>
                      <span className="msg-time">{msg.time}</span>
                    </li>
                  ))
              ) : (
                <li>Aucune interaction récente.</li>
              )}
            </ul>
          </div>
        )}
        {activeSection === "suggestions" && (
          <div className="panel-section panel-suggestions">
            <h3>Suggestions IA</h3>
            <ul>
              {suggestions.length ? (
                suggestions.map((s, idx) => <li key={idx}>{s}</li>)
              ) : (
                <>
                  <li>Essayez : "Créer une salle vidéo 3D"</li>
                  <li>Essayez : "Activer l'accessibilité pour aveugle"</li>
                  <li>Essayez : "Voir mes points et badges"</li>
                </>
              )}
            </ul>
          </div>
        )}
        {activeSection === "notifications" && (
          <div className="panel-section panel-notifications">
            <h3>Notifications IA</h3>
            <ul>
              {notifications.length ? (
                notifications.map((n, idx) => <li key={idx}>{n}</li>)
              ) : (
                <li>Aucune notification récente.</li>
              )}
            </ul>
          </div>
        )}
        {activeSection === "shortcuts" && (
          <div className="panel-section panel-shortcuts">
            <h3>Raccourcis rapides</h3>
            <ul className="shortcuts-list">
              {shortcuts.map((sc, idx) => (
                <li key={idx}>
                  <a
                    href={sc.to}
                    className="shortcut-btn"
                    aria-label={sc.label}
                  >
                    <span role="img" aria-label={sc.label}>
                      {sc.icon}
                    </span>{" "}
                    {sc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <footer className="assistant-panel-footer">
        <small>
          <span role="img" aria-label="sécurité">
            🔒
          </span>{" "}
          Sécurisé & inclusif |{" "}
          <span role="img" aria-label="accessibilité">
            ♿
          </span>{" "}
          Accessibilité |{" "}
          <span role="img" aria-label="mobile">
            📱
          </span>{" "}
          Mobile/Web
        </small>
      </footer>
    </aside>
  );
}

export default AssistantPanel;

/**
 * Documentation :
 * - Ce panneau IA centralise : mémoire, suggestions, notifications, raccourcis.
 * - Accessible (clavier, contraste, dark mode, aria), SEO via Helmet.
 * - À intégrer comme panneau latéral ou contextuel, mobile responsive.
 * - Les données (mémoire, suggestions, notifications) sont à enrichir via le contexte ou backend.
 */
