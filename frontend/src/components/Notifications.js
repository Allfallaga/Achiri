import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaGift, FaTrophy, FaFire, FaEnvelopeOpenText } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Notifications.css";

// Mock data pour la démo
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

// Composant Notifications sans userId (mock local)
const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <motion.div
      className="notifications-container bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Notifications Achiri"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <FaBell className="mr-2" /> Notifications
        </h2>
        <button
          className="text-blue-600 dark:text-blue-300 text-sm"
          onClick={handleMarkAllRead}
          aria-label="Tout marquer comme lu"
        >
          Tout marquer comme lu
        </button>
      </div>

      <div className="notification-list space-y-3">
        {notifications.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Aucune notification.</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item flex items-center bg-gray-50 dark:bg-gray-800 rounded p-3 shadow ${
                notif.read ? "opacity-60" : "border-l-4 border-blue-400"
              }`}
              aria-current={!notif.read ? "true" : undefined}
              tabIndex={0}
            >
              <div className="mr-3">{notif.icon}</div>
              <div className="flex-1">
                <div className="text-gray-800 dark:text-white">{notif.message}</div>
                <div className="text-xs text-gray-500">{notif.date}</div>
              </div>
              {!notif.read && (
                <button
                  className="ml-2 text-green-600"
                  onClick={() => handleMarkRead(notif.id)}
                  aria-label="Marquer comme lu"
                >
                  <FaCheckCircle />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;