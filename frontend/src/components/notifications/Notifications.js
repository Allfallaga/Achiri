import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaGift,
  FaTrophy,
  FaFire,
  FaEnvelopeOpenText,
  FaTrashAlt,
  FaFilter,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./Notifications.css";

/**
 * Notifications – Achiri
 * Centre de notifications avancé : accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : affichage, marquer comme lu, suppression, feedback, filtres, dark mode, couleurs, responsive.
 * - Prêt pour extensions futures (pagination, push, analytics, overlay, IA, badges, notifications, etc).
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

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Accessibilité : focus auto sur le titre à l'arrivée
  const titleRef = useRef();
  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  // Dark mode toggle (démonstration, peut être relié à un contexte global)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    return () => document.body.classList.remove("dark");
  }, [darkMode]);

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setSuccess("Notification marquée comme lue !");
    setTimeout(() => setSuccess(""), 1500);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setSuccess("Toutes les notifications sont lues !");
    setTimeout(() => setSuccess(""), 1500);
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSuccess("Notification supprimée.");
    setTimeout(() => setSuccess(""), 1500);
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    setSuccess("Toutes les notifications supprimées.");
    setTimeout(() => setSuccess(""), 1500);
  };

  // Filtrage notifications
  const filtered = notifications.filter(
    (n) => filter === "all" || n.type === filter
  );

  return (
    <motion.section
      className={`notifications-container bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-lg mx-auto`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Centre de notifications Achiri"
      tabIndex={0}
      style={{ margin: "2rem auto" }}
    >
      <Helmet>
        <title>Notifications | Achiri</title>
        <meta name="description" content="Centre de notifications Achiri : affichage, marquer comme lu, suppression, filtres, accessibilité, sécurité, responsive, SEO, design avancé." />
      </Helmet>
      <header className="flex items-center justify-between mb-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h2
          className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"
          style={{ fontWeight: 700, fontSize: "1.3em", color: "#1976d2", display: "flex", alignItems: "center" }}
          tabIndex={0}
          aria-label="Titre centre de notifications"
          ref={titleRef}
        >
          <FaBell className="mr-2" style={{ marginRight: 8 }} /> Notifications
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="text-blue-600 dark:text-blue-300 text-sm"
            onClick={handleMarkAllRead}
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
            className="text-red-500 text-sm"
            onClick={handleDeleteAll}
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
            aria-label={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
            style={{
              background: "none",
              border: "none",
              color: darkMode ? "#ffd600" : "#1976d2",
              fontSize: 18,
              marginLeft: 6,
              cursor: "pointer"
            }}
            title={darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Filtres */}
      <nav aria-label="Filtres notifications" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ color: "#888", fontSize: 15, display: "flex", alignItems: "center", gap: 4 }}>
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
              transition: "background 0.2s, color 0.2s"
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
        <div aria-live="polite" style={{ color: "#43a047", marginBottom: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <FaCheckCircle /> {success}
        </div>
      )}
      {error && (
        <div aria-live="assertive" style={{ color: "red", marginBottom: 8 }}>{error}</div>
      )}

      <div className="notification-list space-y-3" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-center py-8" style={{ color: "#888", textAlign: "center", padding: "2em 0" }}>
            Aucune notification.
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item flex items-center bg-gray-50 dark:bg-gray-800 rounded p-3 shadow`}
              style={{
                opacity: notif.read ? 0.6 : 1,
                borderLeft: notif.read ? "none" : "4px solid #1976d2",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                background: notif.read ? "#f8fafc" : "#e3f2fd",
                borderRadius: 8,
                boxShadow: "0 1px 6px #e0e7ef22",
              }}
              aria-current={!notif.read ? "true" : undefined}
              tabIndex={0}
            >
              <div className="mr-3" style={{ marginRight: 12, fontSize: 22 }}>{notif.icon}</div>
              <div className="flex-1">
                <div className="text-gray-800 dark:text-white" style={{ fontWeight: notif.read ? 400 : 600 }}>
                  {notif.message}
                </div>
                <div className="text-xs text-gray-500" style={{ fontSize: 12, color: "#888" }}>{notif.date}</div>
              </div>
              {!notif.read && (
                <button
                  className="ml-2 text-green-600"
                  onClick={() => handleMarkRead(notif.id)}
                  aria-label="Marquer comme lu"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#43a047",
                    fontSize: 20,
                    marginLeft: 8,
                    cursor: "pointer"
                  }}
                >
                  <FaCheckCircle />
                </button>
              )}
              <button
                className="ml-2 text-red-500"
                onClick={() => handleDelete(notif.id)}
                aria-label="Supprimer la notification"
                style={{
                  background: "none",
                  border: "none",
                  color: "#e53935",
                  fontSize: 18,
                  marginLeft: 8,
                  cursor: "pointer"
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
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
        <br />
        <span style={{ fontSize: "0.93em" }}>
          Design avancé, navigation clavier, SEO optimisé, branding Achiri.
        </span>
      </footer>
    </motion.section>
  );
};

export default Notifications;

/**
 * Documentation :
 * - Centre de notifications avancé : affichage, marquer comme lu, suppression, filtres, dark mode, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (pagination, push, analytics, overlay, IA, badges, notifications, etc).
 */