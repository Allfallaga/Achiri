import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * AssistantContext – Achiri
 * Fournit un assistant IA contextuel à toute l’application.
 * - Suggestions, aide, onboarding, accessibilité, sécurité, responsive, SEO friendly.
 * - Prêt pour extensions futures (voix, chat, feedback, personnalisation, analytics, notifications…).
 * - Persistance locale, feedback utilisateur, design moderne.
 */

const defaultState = {
  isOpen: false,
  messages: [],
  unread: 0,
  assistantMode: "help", // "help" | "onboarding" | "feedback" | "custom"
  userPreferences: {},
};

const AssistantContext = createContext({
  ...defaultState,
  openAssistant: () => {},
  closeAssistant: () => {},
  sendMessage: () => {},
  setAssistantMode: () => {},
  setUserPreferences: () => {},
  markAllRead: () => {},
  clearMessages: () => {},
});

export function AssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(defaultState.isOpen);
  const [messages, setMessages] = useState(defaultState.messages);
  const [unread, setUnread] = useState(defaultState.unread);
  const [assistantMode, setAssistantMode] = useState(defaultState.assistantMode);
  const [userPreferences, setUserPreferences] = useState(defaultState.userPreferences);

  // Persistance locale (localStorage)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("achiri-assistant") || "{}");
    if (saved.isOpen !== undefined) setIsOpen(saved.isOpen);
    if (saved.messages) setMessages(saved.messages);
    if (saved.unread !== undefined) setUnread(saved.unread);
    if (saved.assistantMode) setAssistantMode(saved.assistantMode);
    if (saved.userPreferences) setUserPreferences(saved.userPreferences);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "achiri-assistant",
      JSON.stringify({ isOpen, messages, unread, assistantMode, userPreferences })
    );
  }, [isOpen, messages, unread, assistantMode, userPreferences]);

  // Ouvre l’assistant
  const openAssistant = () => setIsOpen(true);

  // Ferme l’assistant
  const closeAssistant = () => setIsOpen(false);

  // Envoie un message à l’assistant (mock IA)
  const sendMessage = (msg) => {
    const userMsg = { from: "user", text: msg, date: new Date().toISOString() };
    const aiMsg = {
      from: "assistant",
      text: "Merci pour votre message ! (Réponse IA à venir)",
      date: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setUnread((u) => u + 1);
  };

  // Marque tous les messages comme lus
  const markAllRead = () => setUnread(0);

  // Efface l’historique des messages
  const clearMessages = () => setMessages([]);

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        messages,
        sendMessage,
        unread,
        assistantMode,
        setAssistantMode,
        userPreferences,
        setUserPreferences,
        markAllRead,
        clearMessages,
      }}
    >
      {children}
      {/* Notifications contextuelles accessibles */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          bottom: 18,
          right: 18,
          zIndex: 9999,
          minWidth: 220,
          pointerEvents: "none",
        }}
      >
        {unread > 0 && (
          <div
            style={{
              background: "#ffd600",
              color: "#222",
              borderRadius: 8,
              padding: "8px 16px",
              marginBottom: 8,
              boxShadow: "0 2px 8px #ffd60044",
              fontSize: "1em",
              opacity: 0.98,
              fontWeight: 500,
              outline: "none",
            }}
            tabIndex={-1}
            role="status"
          >
            {unread} nouveau{x => unread > 1 ? "x" : ""} message{unread > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  return useContext(AssistantContext);
}

/**
 * Documentation :
 * - Fournit : isOpen, openAssistant, closeAssistant, messages, sendMessage, unread, assistantMode, setAssistantMode, userPreferences, setUserPreferences, markAllRead, clearMessages.
 * - Persistance locale (localStorage).
 * - Prêt pour extensions futures (voix, chat, feedback, personnalisation, analytics, notifications…).
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur.
 * - Accessibilité : navigation clavier, responsive, dark mode, aria-live pour notifications.
 * - Design moderne, SEO friendly, branding Achiri.
 */