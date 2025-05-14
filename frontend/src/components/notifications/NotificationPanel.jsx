import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaTrashAlt,
  FaGift,
  FaTrophy,
  FaFire,
  FaEnvelopeOpenText,
  FaFilter,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./Notifications.css";

/**
 * NotificationPanel – Achiri
 * Panneau latéral de notifications avancé : accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage, marquer comme lu, suppression, feedback, filtres, dark mode, couleurs, responsive, panneau latéral.
 * - Prêt pour extensions futures (push, filtre, pagination, dark mode, overlay, analytics, IA, badges, notifications, etc).
 *
 * Props :
 *   notifications : [{ id, type, message, date, read }]
 *   onMarkRead : function(id)
 *   onDelete : function(id)
 *   onMarkAllRead : function()
 *   onDeleteAll : function()
 */

const mockNotifications = [
  {
    id: 1,
    type: "reward",
    message: "Félicitations ! Tu as gagné un badge Créateur.",
    date: "2025-04-23",
    read: false,
    icon: <FaTrophy className="text-yellow-500" />,
  },
  {
    id: 2,
    type: "challenge",
    message: "Défi quotidien réussi : Publie un post créatif (+20 pts)",
    date: "2025-04-23",
    read: false,
    icon: <FaFire className="text-orange-500" />,
  },
  {
    id: 3,
    type: "message",
    message: "Nouveau message de Bob dans la room Vidéo.",
    date: "2025-04-22",
    read: true,
    icon: <FaEnvelopeOpenText className="text-blue-500" />,
  },
  {
    id: 4,
    type: "gift",
    message: "Tu as reçu un cadeau de Alice !",
    date: "2025-04-21",
    read: true,
    icon: <FaGift className="text-pink-500" />,
  },
];

const typeLabels = {
  all: "Toutes",
  reward: "Récompenses",
  challenge: "Défis",
  message: "Messages",
  gift: "Cadeaux",
};

export default function NotificationPanel({
  notifications: propNotifications,
  onMarkRead,
  onDelete,
  onMarkAllRead,
  onDeleteAll,
}) {
  // Accessibilité : focus auto sur le titre à l'arrivée
  const titleRef = useRef();
  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  // Dark mode local (démonstration, peut être relié à un contexte global)
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    return () => document.body.classList.remove("dark");
  }, [darkMode]);

  // Si aucune props, fallback mock (pour démo/standalone)
  const [notifications, setNotifications] = useState(
    propNotifications || mockNotifications,
  );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // Gestion locale si pas de props callback
  const markRead = (id) => {
    if (onMarkRead) return onMarkRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setSuccess("Notification marquée comme lue !");
    setTimeout(() => setSuccess(""), 1500);
  };

  const deleteNotif = (id) => {
    if (onDelete) return onDelete(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSuccess("Notification supprimée.");
    setTimeout(() => setSuccess(""), 1500);
  };

  const markAllRead = () => {
    if (onMarkAllRead) return onMarkAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setSuccess("Toutes les notifications sont lues !");
    setTimeout(() => setSuccess(""), 1500);
  };

  const deleteAll = () => {
    if (onDeleteAll) return onDeleteAll();
    setNotifications([]);
    setSuccess("Toutes les notifications supprimées.");
    setTimeout(() => setSuccess(""), 1500);
  };

  // Filtrage notifications
  const filtered = notifications.filter(
    (n) => filter === "all" || n.type === filter,
  );

  return (
    <motion.aside
      className="notification-panel notifications-container"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Panneau de notifications Achiri"
      tabIndex={0}
      style={{
        background: darkMode ? "#181f2a" : "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
        maxWidth: 400,
        width: "100%",
        padding: "1.5rem 1.2rem",
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        zIndex: 1200,
        overflowY: "auto",
        color: darkMode ? "#f3f6fa" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: "1.2em",
            color: "#1976d2",
            display: "flex",
            alignItems: "center",
          }}
          tabIndex={0}
          aria-label="Titre panneau de notifications"
          ref={titleRef}
        >
          <FaBell style={{ marginRight: 8 }} /> Notifications
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={markAllRead}
            aria-label="Tout marquer comme lu"
            style={{
              background: "none",
              border: "none",
              color: "#1976d2",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              marginRight: 6,
            }}
          >
            Tout lu
          </button>
          <button
            onClick={deleteAll}
            aria-label="Tout supprimer"
            style={{
              background: "none",
              border: "none",
              color: "#e53935",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <FaTrashAlt style={{ marginRight: 4 }} /> Tout supprimer
          </button>
          <button
            className="darkmode-btn"
            onClick={() => setDarkMode((d) => !d)}
            aria-label={
              darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
            }
            style={{
              background: "none",
              border: "none",
              color: darkMode ? "#ffd600" : "#1976d2",
              fontSize: 18,
              marginLeft: 6,
              cursor: "pointer",
            }}
            title={
              darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
            }
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Filtres */}
      <nav
        aria-label="Filtres notifications"
        style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        <span
          style={{
            color: "#888",
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <FaFilter /> Filtrer :
        </span>
        {Object.entries(typeLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              background: filter === key ? "#1976d2" : "#e3f2fd",
              color: filter === key ? "#fff" : "#1976d2",
              border: "none",
              borderRadius: 6,
              padding: "4px 12px",
              fontWeight: "bold",
              cursor: "pointer",
              outline: filter === key ? "2px solid #1976d2" : "none",
              boxShadow: filter === key ? "0 2px 8px #1976d233" : undefined,
              fontSize: 14,
              transition: "background 0.2s, color 0.2s",
            }}
            aria-pressed={filter === key}
            aria-label={`Filtrer par ${label}`}
            tabIndex={0}
          >
            {label}
          </button>
        ))}
      </nav>

      {success && (
        <div
          aria-live="polite"
          style={{
            color: "#43a047",
            marginBottom: 8,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FaCheckCircle /> {success}
        </div>
      )}
      {error && (
        <div aria-live="assertive" style={{ color: "red", marginBottom: 8 }}>
          {error}
        </div>
      )}

      <div
        className="notification-list"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {filtered.length === 0 ? (
          <div style={{ color: "#888", textAlign: "center", padding: "2em 0" }}>
            Aucune notification.
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className="notification-item"
              style={{
                opacity: notif.read ? 0.6 : 1,
                borderLeft: notif.read ? "none" : "4px solid #1976d2",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                background: notif.read
                  ? darkMode
                    ? "#232b3b"
                    : "#f8fafc"
                  : darkMode
                    ? "#223366"
                    : "#e3f2fd",
                borderRadius: 8,
                boxShadow: "0 1px 6px #e0e7ef22",
                padding: "0.8em 1em",
                color: darkMode ? "#f3f6fa" : "#222",
                transition: "background 0.2s, color 0.2s",
              }}
              aria-current={!notif.read ? "true" : undefined}
              tabIndex={0}
            >
              <div style={{ marginRight: 12, fontSize: 22 }}>{notif.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: notif.read ? 400 : 600,
                    color: darkMode ? "#f3f6fa" : "#222",
                  }}
                >
                  {notif.message}
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>{notif.date}</div>
              </div>
              {!notif.read && (
                <button
                  onClick={() => markRead(notif.id)}
                  aria-label="Marquer comme lu"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#43a047",
                    fontSize: 20,
                    marginLeft: 8,
                    cursor: "pointer",
                  }}
                >
                  <FaCheckCircle />
                </button>
              )}
              <button
                onClick={() => deleteNotif(notif.id)}
                aria-label="Supprimer la notification"
                style={{
                  background: "none",
                  border: "none",
                  color: "#e53935",
                  fontSize: 18,
                  marginLeft: 8,
                  cursor: "pointer",
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center",
        }}
      >
        <span role="img" aria-label="sécurité">
          🔒
        </span>{" "}
        Sécurisé |{" "}
        <span role="img" aria-label="accessibilité">
          ♿
        </span>{" "}
        Accessible |{" "}
        <span role="img" aria-label="mobile">
          📱
        </span>{" "}
        Mobile/Web
        <br />
        <span style={{ fontSize: "0.93em" }}>
          Design avancé, navigation clavier, SEO optimisé, branding Achiri.
        </span>
      </footer>
    </motion.aside>
  );
}

/**
 * Documentation :
 * - Panneau latéral de notifications avancé : affichage, marquer comme lu, suppression, feedback, filtres, dark mode.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (push, filtre, pagination, dark mode, overlay, analytics, IA, badges, notifications, etc).
 */
