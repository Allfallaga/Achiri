import React, { useState } from "react";
import { FaWallet, FaTrophy, FaFire, FaChalkboardTeacher, FaBell, FaUser, FaEnvelope, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import "./UserDashboard.css";

// Mock data pour la démo
const mockUser = {
  name: "Vous",
  badges: ["Créateur", "Artiste"],
  points: 1250,
  notifications: 3,
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=achiri",
};

const UserDashboard = () => {
  const [user] = useState(mockUser);

  // Navigation rapide (mock)
  const quickLinks = [
    { label: "Mon Wallet", icon: <FaWallet />, to: "/wallet" },
    { label: "Récompenses", icon: <FaTrophy />, to: "/wallet#rewards" },
    { label: "Défis", icon: <FaFire />, to: "/challenges" },
    { label: "Cours", icon: <FaChalkboardTeacher />, to: "/virtualclassroom" },
    { label: "Notifications", icon: <FaBell />, to: "/notifications" },
    { label: "Profil", icon: <FaUser />, to: "/profile" },
    { label: "Messages", icon: <FaEnvelope />, to: "/messenger" },
    { label: "Paramètres", icon: <FaCog />, to: "/settings" },
  ];

  return (
    <motion.div
      className="user-dashboard-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Dashboard Utilisateur Achiri"
      tabIndex={0}
    >
      <div className="flex items-center mb-6" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
        <img
          src={user.avatar}
          alt="Avatar utilisateur"
          className="w-16 h-16 rounded-full border-2 border-blue-400 mr-4"
          style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #2563eb", marginRight: 16, objectFit: "cover" }}
        />
        <div>
          <div className="text-xl font-bold text-gray-800 dark:text-white" style={{ fontSize: "1.3em", fontWeight: 700 }}>{user.name}</div>
          <div className="flex gap-2 mt-1" style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {user.badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-semibold"
                style={{
                  background: "#dbeafe",
                  color: "#2563eb",
                  marginRight: 5,
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "inline-block"
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end" style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span className="flex items-center text-yellow-600 dark:text-yellow-300 font-bold" style={{ color: "#fbbf24", fontWeight: 600, display: "flex", alignItems: "center" }}>
            <FaWallet className="mr-1" style={{ marginRight: 4 }} /> {user.points} pts
          </span>
          <span className="flex items-center text-red-500 text-xs mt-1" style={{ color: "#ef4444", fontSize: 13, marginTop: 4, display: "flex", alignItems: "center" }}>
            <FaBell className="mr-1" style={{ marginRight: 4 }} /> {user.notifications} notif.
          </span>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="quick-links grid grid-cols-2 gap-4 mb-6">
        {quickLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.to}
            className="quick-link"
            aria-label={link.label}
            tabIndex={0}
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Astuce */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded text-green-800 dark:text-green-200 flex items-center"
        style={{
          marginTop: 16,
          padding: "12px",
          background: "#ecfdf5",
          borderRadius: 8,
          color: "#065f46",
          display: "flex",
          alignItems: "center"
        }}
      >
        <FaChalkboardTeacher className="mr-2" style={{ marginRight: 8 }} />
        <span>
          Astuce : Consulte tes défis, récompenses et cours pour progresser chaque semaine sur Achiri !
        </span>
      </div>
    </motion.div>
  );
};

export default UserDashboard;