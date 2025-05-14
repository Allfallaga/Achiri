/**
 * AssistantAgent.jsx
 * Composant principal de l'assistant intelligent Achiri.
 * - Multilingue, mémoire longue durée, accessible (sourd/aveugle), compatible mobile/web.
 * - Guide l'utilisateur, centralise l'accès à toutes les fonctions (chat, rooms, wallet, booking, etc.).
 * - Design moderne, SEO friendly, sécurisé.
 */

import React, { useState, useEffect, useRef, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { AccessibilityContext } from "../../context/AccessibilityContext";
import { AssistantContext } from "../../context/AssistantContext";
import "../../styles/assistantAgent.css";

// Icônes SVG inline pour accessibilité et performance
const icons = {
  chat: (
    <svg width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4f8cff" />
      <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">
        💬
      </text>
    </svg>
  ),
  video: (
    <svg width="24" height="24" aria-hidden="true">
      <rect x="3" y="7" width="14" height="10" rx="2" fill="#4f8cff" />
      <polygon points="17,9 23,12 17,15" fill="#fff" />
    </svg>
  ),
  wallet: (
    <svg width="24" height="24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" fill="#4f8cff" />
      <circle cx="17" cy="12" r="2" fill="#fff" />
    </svg>
  ),
  accessibility: (
    <svg width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4f8cff" />
      <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">
        ♿
      </text>
    </svg>
  ),
  emergency: (
    <svg width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#ff4f4f" />
      <text x="12" y="16" textAnchor="middle" fontSize="14" fill="#fff">
        !
      </text>
    </svg>
  ),
  settings: (
    <svg width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4f8cff" />
      <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">
        ⚙️
      </text>
    </svg>
  ),
};

const quickActions = [
  {
    label: "Chat IA",
    icon: icons.chat,
    description:
      "Discuter avec Achiri, poser une question ou demander de l'aide.",
    action: "chat",
    to: "/",
  },
  {
    label: "Video Rooms",
    icon: icons.video,
    description: "Rejoindre ou créer une salle vidéo, classer par catégorie.",
    action: "video",
    to: "/VideoRooms",
  },
  {
    label: "Wallet",
    icon: icons.wallet,
    description: "Voir mes points, récompenses et transactions.",
    action: "wallet",
    to: "/WalletPage",
  },
  {
    label: "Accessibilité",
    icon: icons.accessibility,
    description: "Activer les options pour sourds, aveugles, etc.",
    action: "accessibility",
    to: "/AccessibilityPage",
  },
  {
    label: "Urgence",
    icon: icons.emergency,
    description: "Déclencher une alerte santé ou demander de l'aide.",
    action: "emergency",
    to: "/EmergencySettings",
  },
  {
    label: "Paramètres",
    icon: icons.settings,
    description: "Gérer mon profil, notifications, préférences.",
    action: "settings",
    to: "/SettingsPage",
  },
];

function AssistantAgent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "achiri",
      text: "Bonjour 👋 ! Je suis Achiri, ton assistant IA. Comment puis-je t'aider aujourd'hui ?",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("fr");
  const { accessibility, setAccessibility } =
    useContext(AccessibilityContext) || {};
  const { memory, setMemory } = useContext(AssistantContext) || {};
  const navigate = useNavigate();
  const inputRef = useRef();

  // SEO & accessibilité
  useEffect(() => {
    document.body.classList.toggle("dark", accessibility?.darkMode);
    if (accessibility?.tts && messages.length) {
      const lastMsg = messages[messages.length - 1];
      if (window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(lastMsg.text);
        utter.lang = lang;
        window.speechSynthesis.speak(utter);
      }
    }
  }, [accessibility?.darkMode, accessibility?.tts, messages, lang]);

  // Focus input pour accessibilité clavier
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Gestion de la mémoire longue durée (exemple simplifié)
  useEffect(() => {
    if (setMemory) setMemory(messages);
  }, [messages, setMemory]);

  // Commandes vocales (Web Speech API)
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setMessages((msgs) => [
        ...msgs,
        {
          from: "achiri",
          text: "La reconnaissance vocale n'est pas supportée sur ce navigateur.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      return;
    }
    setListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      handleSend(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  // Gestion de l'envoi de message ou commande
  const handleSend = (msg) => {
    const text = (msg || input).trim();
    if (!text) return;
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text, time: new Date().toLocaleTimeString() },
    ]);
    setInput("");
    // Traitement IA (simplifié, à remplacer par appel backend/IA)
    setTimeout(() => {
      let response = "Je réfléchis...";
      if (/sant[ée]|urgence|danger/i.test(text)) {
        response =
          "⚠️ Veux-tu déclencher une alerte santé ou contacter un proche ?";
      } else if (/room|salle|vidéo|classroom|3d/i.test(text)) {
        response =
          "Tu veux rejoindre ou créer une salle vidéo ? Clique sur 'Video Rooms' ou précise ta demande.";
      } else if (/wallet|points|récompense/i.test(text)) {
        response =
          "Voici ton portefeuille Achiri. Tu peux consulter tes points et récompenses.";
      } else if (
        /accessibilit[ée]|sourd|aveugle|langue des signes|tts/i.test(text)
      ) {
        response =
          "Tu peux activer les options d'accessibilité ici. Besoin d'aide pour la navigation ?";
      } else if (/param[èe]tre|profil|badge/i.test(text)) {
        response =
          "Tu peux gérer ton profil et tes paramètres dans la section dédiée.";
      } else if (/musique|artiste|biblioth[èe]que/i.test(text)) {
        response =
          "Découvre la bibliothèque musicale Achiri ou soutiens tes artistes préférés.";
      } else if (/challenge|défi/i.test(text)) {
        response =
          "Prêt pour un défi ? Consulte les challenges quotidiens ou hebdomadaires !";
      } else if (/aide|help|support/i.test(text)) {
        response =
          "Je suis là pour t'aider ! Pose-moi ta question ou utilise les boutons rapides ci-dessous.";
      } else {
        response =
          "Je n'ai pas compris, mais je peux t'aider à naviguer ou répondre à tes questions.";
      }
      setMessages((msgs) => [
        ...msgs,
        {
          from: "achiri",
          text: response,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 700);
  };

  // Navigation rapide via boutons
  const handleQuickAction = (to) => {
    navigate(to);
  };

  // Changement de langue
  const handleLangChange = (e) => setLang(e.target.value);

  return (
    <main
      className={`assistant-agent-container${accessibility?.highContrast ? " high-contrast" : ""}${accessibility?.darkMode ? " dark" : ""}`}
      aria-label="Assistant IA Achiri"
      tabIndex={0}
    >
      <Helmet>
        <title>
          Achiri Assistant IA | Guide, accessibilité, rooms, wallet, urgence
        </title>
        <meta
          name="description"
          content="Assistant intelligent Achiri : navigation, accessibilité, rooms vidéo, wallet, urgence, IA multilingue, inclusif et sécurisé."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      {/* Header IA */}
      <header className="assistant-header" aria-label="En-tête assistant IA">
        <h1>
          <span role="img" aria-label="robot">
            🤖
          </span>{" "}
          Achiri Assistant
        </h1>
        <select
          aria-label="Changer la langue"
          value={lang}
          onChange={handleLangChange}
          style={{ marginLeft: 16, borderRadius: 6 }}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="de">Deutsch</option>
        </select>
      </header>

      {/* Zone de chat IA */}
      <section className="assistant-chat" aria-live="polite">
        <ul className="assistant-messages">
          {messages.map((msg, idx) => (
            <li
              key={idx}
              className={`msg-${msg.from}`}
              aria-label={
                msg.from === "achiri" ? "Message IA" : "Message utilisateur"
              }
            >
              <span className="msg-author">
                {msg.from === "achiri" ? "Achiri" : "Moi"}
              </span>
              <span className="msg-text">{msg.text}</span>
              <span className="msg-time">{msg.time}</span>
            </li>
          ))}
        </ul>
        <form
          className="assistant-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question ou tape une commande…"
            aria-label="Entrer un message ou une commande"
            autoComplete="off"
            disabled={listening}
            style={{ borderRadius: 8, padding: 8, width: "70%" }}
          />
          <button type="submit" aria-label="Envoyer" className="btn-send">
            Envoyer
          </button>
          <button
            type="button"
            aria-label="Commande vocale"
            className={`btn-voice${listening ? " listening" : ""}`}
            onClick={handleVoiceInput}
            disabled={listening}
            style={{ marginLeft: 8 }}
          >
            🎤
          </button>
        </form>
      </section>

      {/* Actions rapides */}
      <nav className="assistant-quick-actions" aria-label="Actions rapides IA">
        {quickActions.map((action, idx) => (
          <button
            key={action.action}
            className="quick-action-btn"
            aria-label={action.label}
            title={action.description}
            onClick={() => handleQuickAction(action.to)}
            tabIndex={0}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </nav>

      {/* Accessibilité et sécurité */}
      <footer className="assistant-footer" aria-label="Pied de page assistant">
        <small>
          <span role="img" aria-label="sécurité">
            🔒
          </span>{" "}
          Sécurisé & inclusif |{" "}
          <span role="img" aria-label="accessibilité">
            ♿
          </span>{" "}
          Accessibilité avancée |{" "}
          <span role="img" aria-label="mobile">
            📱
          </span>{" "}
          Mobile/Web
        </small>
      </footer>
    </main>
  );
}

export default AssistantAgent;

/**
 * Documentation :
 * - Ce composant centralise l'expérience utilisateur : chat IA, navigation rapide, accessibilité, sécurité.
 * - SEO optimisé via Helmet.
 * - Multilingue, compatible mobile, design moderne, accessible (clavier, TTS, contraste, etc.).
 * - À intégrer dans la page d'accueil ou comme agent flottant.
 * - Pour personnaliser la logique IA, brancher sur un backend ou enrichir la mémoire/context.
 */
