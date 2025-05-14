import React, { useState } from "react";
import {
  FaWallet,
  FaTrophy,
  FaFire,
  FaChalkboardTeacher,
  FaBell,
  FaUser,
  FaEnvelope,
  FaCog,
  FaCheckCircle,
  FaUniversalAccess,
  FaAward,
  FaChartLine,
  FaMedal,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./UserDashboard.css";

/**
 * UserDashboard – Achiri
 * Tableau de bord utilisateur inclusif : stats, navigation rapide, badges, notifications, accessibilité, sécurité, responsive, SEO.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : résumé profil, points, badges, notifications, navigation rapide, astuce, accessibilité, progression, feedback.
 * - Prêt pour extensions futures (dark mode, analytics, export, IA, overlay, badges, etc).
 */

const mockUser = {
  name: "Vous",
  badges: ["Créateur", "Artiste", "Ambassadeur"],
  points: 1250,
  notifications: 3,
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=achiri",
  accessibility: ["Sous-titres", "Lecture vocale"],
  progression: [20, 40, 60, 80, 87],
  activity: 87,
  roles: ["Utilisateur", "Modérateur"],
  social: { twitter: "@achiri", github: "achiri-dev" },
};

const accessibilityIcons = {
  "Sous-titres": (
    <FaUniversalAccess
      title="Sous-titres"
      aria-label="Sous-titres"
      style={{ color: "#1976d2" }}
    />
  ),
  "Lecture vocale": (
    <FaUniversalAccess
      title="Lecture vocale"
      aria-label="Lecture vocale"
      style={{ color: "#43a047" }}
    />
  ),
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
      {/* Profil utilisateur */}
      <div
        className="flex items-center mb-6"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <img
          src={user.avatar}
          alt="Avatar utilisateur"
          className="w-16 h-16 rounded-full border-2 border-blue-400 mr-4"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "2px solid #2563eb",
            marginRight: 16,
            objectFit: "cover",
          }}
        />
        <div>
          <div
            className="text-xl font-bold text-gray-800 dark:text-white"
            style={{ fontSize: "1.3em", fontWeight: 700 }}
          >
            {user.name}
          </div>
          <div
            className="flex gap-2 mt-1"
            style={{ display: "flex", gap: 8, marginTop: 4 }}
          >
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
                  display: "inline-block",
                }}
                aria-label={`Badge ${badge}`}
              >
                <FaMedal style={{ marginRight: 4, color: "#f59e42" }} /> {badge}
              </span>
            ))}
          </div>
          {/* Accessibilité utilisateur */}
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {user.accessibility &&
              user.accessibility.map((a, i) => (
                <span key={i} style={{ fontSize: 18 }}>
                  {accessibilityIcons[a]}
                </span>
              ))}
          </div>
        </div>
        <div
          className="ml-auto flex flex-col items-end"
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span
            className="flex items-center text-yellow-600 dark:text-yellow-300 font-bold"
            style={{
              color: "#fbbf24",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaWallet className="mr-1" style={{ marginRight: 4 }} />{" "}
            {user.points} pts
          </span>
          <span
            className="flex items-center text-red-500 text-xs mt-1"
            style={{
              color: "#ef4444",
              fontSize: 13,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaBell className="mr-1" style={{ marginRight: 4 }} />{" "}
            {user.notifications} notif.
          </span>
        </div>
      </div>

      {/* Progression et activité */}
      <div
        className="user-progress-section"
        style={{
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 1px 6px #1976d211",
          padding: "1em",
          marginBottom: 18,
          marginTop: -8,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 18,
        }}
        aria-label="Progression et activité"
      >
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontWeight: 600, color: "#1976d2", marginBottom: 4 }}>
            <FaChartLine style={{ marginRight: 6 }} /> Activité
          </div>
          <div
            style={{
              background: "#e3f2fd",
              borderRadius: 6,
              height: 12,
              width: "100%",
              maxWidth: 220,
              position: "relative",
            }}
            aria-label={`Barre de progression activité ${user.activity}%`}
          >
            <div
              style={{
                background: "#43a047",
                width: `${user.activity}%`,
                height: "100%",
                borderRadius: 6,
                transition: "width 0.5s",
              }}
            />
          </div>
          <span
            style={{
              color: "#1976d2",
              fontWeight: 600,
              fontSize: 14,
              marginLeft: 6,
            }}
          >
            {user.activity}%
          </span>
        </div>
        <div style={{ flex: 2, minWidth: 180 }}>
          <div style={{ fontWeight: 600, color: "#1976d2", marginBottom: 4 }}>
            <FaAward style={{ marginRight: 6 }} /> Progression
          </div>
          <svg
            width="100%"
            height="40"
            viewBox="0 0 120 40"
            style={{
              display: "block",
              marginTop: 2,
              marginBottom: 2,
              maxWidth: 220,
            }}
            aria-label="Graphique de progression"
            role="img"
          >
            <polyline
              fill="none"
              stroke="#1976d2"
              strokeWidth="3"
              points={user.progression
                .map((v, i) => `${i * 30},${40 - v * 0.4}`)
                .join(" ")}
            />
            {user.progression.map((v, i) => (
              <circle
                key={i}
                cx={i * 30}
                cy={40 - v * 0.4}
                r="3.5"
                fill="#43a047"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Navigation rapide */}
      <nav
        aria-label="Navigation rapide"
        className="quick-links grid grid-cols-2 gap-4 mb-6"
      >
        {quickLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.to}
            className="quick-link"
            aria-label={link.label}
            tabIndex={0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#f1f5fd",
              borderRadius: 8,
              padding: "0.9em 1em",
              color: "#2563eb",
              fontWeight: 600,
              fontSize: "1em",
              textDecoration: "none",
              boxShadow: "0 1px 4px #2563eb11",
              transition: "background 0.18s",
            }}
            onFocus={(e) => (e.currentTarget.style.background = "#e0e7ff")}
            onBlur={(e) => (e.currentTarget.style.background = "#f1f5fd")}
            onMouseOver={(e) => (e.currentTarget.style.background = "#e0e7ff")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#f1f5fd")}
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </nav>

      {/* Astuce */}
      <div
        className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded text-green-800 dark:text-green-200 flex items-center"
        style={{
          marginTop: 16,
          padding: "12px",
          background: "#ecfdf5",
          borderRadius: 8,
          color: "#065f46",
          display: "flex",
          alignItems: "center",
        }}
        aria-live="polite"
      >
        <FaChalkboardTeacher className="mr-2" style={{ marginRight: 8 }} />
        <span>
          Astuce : Consulte tes défis, récompenses et cours pour progresser
          chaque semaine sur Achiri !
        </span>
      </div>

      {/* Feedback utilisateur */}
      <div
        className="user-feedback"
        style={{
          marginTop: 24,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center",
        }}
        aria-label="Feedback utilisateur"
      >
        <FaCheckCircle style={{ color: "#43a047", marginRight: 6 }} />
        Tes données sont sécurisées et accessibles.{" "}
        <span role="img" aria-label="sécurité">
          🔒
        </span>{" "}
        <span role="img" aria-label="accessibilité">
          ♿
        </span>{" "}
        <span role="img" aria-label="mobile">
          📱
        </span>
      </div>
      <style>{`
        .user-dashboard-container:focus {
          outline: 2px solid #ffd600;
        }
        .quick-link:focus-visible {
          outline: 2px solid #f59e42;
          outline-offset: 2px;
        }
        @media (max-width: 700px) {
          .user-dashboard-container {
            padding: 1rem !important;
            max-width: 99vw;
          }
          .user-progress-section {
            flex-direction: column;
            gap: 10px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .user-dashboard-container {
            background: #181f2a;
            color: #e3f2fd;
          }
          .user-progress-section {
            background: #232b3b;
            color: #ffe082;
          }
          .quick-link {
            background: #232b3b;
            color: #90caf9;
          }
          .quick-link:focus,
          .quick-link:hover {
            background: #1e293b !important;
            color: #42a5f5 !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default UserDashboard;

/**
 * Documentation :
 * - Tableau de bord utilisateur inclusif : résumé profil, points, badges, notifications, progression, navigation rapide, accessibilité.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */
