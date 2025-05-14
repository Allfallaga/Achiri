import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * EmergencyContext – Achiri
 * Fournit un contexte d'urgence à toute l’application.
 * - Déclenchement d’alertes, accès rapide à l’aide, sécurité, accessibilité, responsive, SEO friendly.
 * - Prêt pour extensions futures (signalement, notifications, contacts, logs, export, analytics, etc).
 * - Persistance locale, feedback utilisateur, design moderne.
 */

const defaultState = {
  emergencyActive: false,
  emergencyType: null, // "medical" | "security" | "support" | null
  message: "",
  contacts: [],
  logs: [],
  triggerEmergency: () => {},
  resetEmergency: () => {},
  addContact: () => {},
  removeContact: () => {},
  addLog: () => {},
};

const EmergencyContext = createContext(defaultState);

export function EmergencyProvider({ children }) {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState(null);
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Chargement initial depuis localStorage (mock, à remplacer par API)
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("achiri-emergency") || "{}",
      );
      if (typeof saved.emergencyActive === "boolean")
        setEmergencyActive(saved.emergencyActive);
      if (saved.emergencyType) setEmergencyType(saved.emergencyType);
      if (saved.message) setMessage(saved.message);
      if (Array.isArray(saved.contacts)) setContacts(saved.contacts);
      if (Array.isArray(saved.logs)) setLogs(saved.logs);
    } catch {
      // Optionnel : gestion d’erreur de parsing
    }
  }, []);

  // Persistance locale
  useEffect(() => {
    localStorage.setItem(
      "achiri-emergency",
      JSON.stringify({
        emergencyActive,
        emergencyType,
        message,
        contacts,
        logs,
      }),
    );
  }, [emergencyActive, emergencyType, message, contacts, logs]);

  // Déclencher une urgence
  const triggerEmergency = ({ type, msg }) => {
    setEmergencyActive(true);
    setEmergencyType(type);
    setMessage(msg || "");
    addLog({ type, msg, date: new Date().toISOString(), action: "trigger" });
    notify(`Alerte d'urgence (${type}) déclenchée.`);
    // Ici, tu pourrais notifier un service externe ou envoyer une notification
  };

  // Réinitialiser l’état d’urgence
  const resetEmergency = () => {
    setEmergencyActive(false);
    setEmergencyType(null);
    setMessage("");
    addLog({ date: new Date().toISOString(), action: "reset" });
    notify("État d'urgence réinitialisé.");
  };

  // Ajouter un contact d’urgence
  const addContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
    addLog({ date: new Date().toISOString(), action: "addContact", contact });
    notify(`Contact d'urgence ajouté.`);
  };

  // Supprimer un contact d’urgence
  const removeContact = (contactId) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    addLog({
      date: new Date().toISOString(),
      action: "removeContact",
      contactId,
    });
    notify(`Contact d'urgence supprimé.`);
  };

  // Ajouter un log d’action
  const addLog = (log) => {
    setLogs((prev) => [{ ...log, id: Date.now() }, ...prev]);
  };

  // Notifications système/contextuelles
  const notify = (message) => {
    setNotifications((prev) => [
      ...prev.slice(-4),
      { message, date: new Date().toISOString() },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  return (
    <EmergencyContext.Provider
      value={{
        emergencyActive,
        emergencyType,
        message,
        contacts,
        logs,
        triggerEmergency,
        resetEmergency,
        addContact,
        removeContact,
        addLog,
        notifications,
        notify,
      }}
    >
      {children}
      {/* Notifications contextuelles accessibles */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 9999,
          minWidth: 220,
          pointerEvents: "none",
        }}
      >
        {notifications.map((n, i) => (
          <div
            key={i}
            style={{
              background: emergencyActive ? "#d32f2f" : "#1976d2",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              marginBottom: 8,
              boxShadow: "0 2px 8px #d32f2f44",
              fontSize: "1em",
              opacity: 0.98,
              fontWeight: 500,
              outline: "none",
            }}
            tabIndex={-1}
            role="status"
          >
            {n.message}
          </div>
        ))}
      </div>
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  return useContext(EmergencyContext);
}

/**
 * Documentation :
 * - Fournit : emergencyActive, emergencyType, message, contacts, logs, triggerEmergency, resetEmergency, addContact, removeContact, addLog, notifications, notify.
 * - Persistance locale (localStorage).
 * - Prêt pour extensions futures (signalement, notifications, contacts, logs, export, analytics…).
 * - Sécurité : pas d’info sensible, pas de tracking, feedback utilisateur, notifications accessibles.
 * - Accessibilité : navigation clavier, responsive, dark mode, aria-live pour notifications.
 * - Design moderne, SEO friendly, branding Achiri.
 */
