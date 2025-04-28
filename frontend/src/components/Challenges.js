import React, { useState } from "react";
import { FaStar, FaTrophy, FaFire, FaCalendarDay, FaMedal, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Challenges.css";

// Mock data pour la démo
const mockChallenges = [
  {
    id: 1,
    type: "quotidien",
    title: "Publie un post créatif",
    reward: 20,
    status: "en cours",
    deadline: "2025-04-24",
  },
  {
    id: 2,
    type: "hebdo",
    title: "Obtiens 50 likes cette semaine",
    reward: 100,
    status: "réussi",
    deadline: "2025-04-27",
  },
  {
    id: 3,
    type: "mensuel",
    title: "Participe à 3 rooms vidéo",
    reward: 300,
    status: "en cours",
    deadline: "2025-04-30",
  },
];

const mockLeaderboard = [
  { id: 1, name: "Alice", points: 320 },
  { id: 2, name: "Bob", points: 210 },
  { id: 3, name: "Vous", points: 180 },
];

// Composant principal
const Challenges = () => {
  const [challenges] = useState(mockChallenges);
  const [leaderboard] = useState(mockLeaderboard);
  const [tab, setTab] = useState("challenges");

  return (
    <motion.div
      className="challenges-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Défis Achiri"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center" style={{ display: "flex", alignItems: "center", fontSize: 24, fontWeight: 700, color: "#1976d2" }}>
          <FaFire className="mr-2 text-orange-500" style={{ marginRight: 8, color: "#f59e42" }} /> Défis & Classements
        </h2>
        <div className="flex gap-2" style={{ display: "flex", gap: 8 }}>
          <button
            className={`tab-btn${tab === "challenges" ? " active" : ""}`}
            onClick={() => setTab("challenges")}
            aria-selected={tab === "challenges"}
            aria-label="Voir les défis"
          >
            <FaStar className="mr-1" style={{ marginRight: 4 }} /> Défis
          </button>
          <button
            className={`tab-btn${tab === "leaderboard" ? " active" : ""}`}
            onClick={() => setTab("leaderboard")}
            aria-selected={tab === "leaderboard"}
            aria-label="Voir le classement"
          >
            <FaTrophy className="mr-1" style={{ marginRight: 4 }} /> Classement
          </button>
        </div>
      </div>

      {/* Liste des défis */}
      {tab === "challenges" && (
        <div className="challenge-list" style={{ marginTop: 16 }}>
          {challenges.length === 0 ? (
            <div className="text-gray-400 text-center py-8" style={{ color: "#888", textAlign: "center", padding: "2em 0" }}>Aucun défi en cours.</div>
          ) : (
            challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`challenge-item${challenge.status === "réussi" ? " border-l-4 border-green-400" : " border-l-4 border-orange-400"}`}
                tabIndex={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#f9fafb",
                  borderRadius: 8,
                  padding: "0.8rem 1rem",
                  marginBottom: 12,
                  borderLeft: challenge.status === "réussi" ? "4px solid #22c55e" : "4px solid #f59e42",
                  boxShadow: "0 1px 4px 0 rgba(37,99,235,0.04)",
                  outline: "none"
                }}
                aria-label={`Défi ${challenge.type} : ${challenge.title}`}
              >
                <div className="mr-3" style={{ fontSize: "1.3em" }}>
                  {challenge.type === "quotidien" && <FaCalendarDay className="text-blue-400" title="Défi quotidien" style={{ color: "#2563eb" }} />}
                  {challenge.type === "hebdo" && <FaMedal className="text-purple-400" title="Défi hebdo" style={{ color: "#a78bfa" }} />}
                  {challenge.type === "mensuel" && <FaTrophy className="text-yellow-400" title="Défi mensuel" style={{ color: "#fbbf24" }} />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-white" style={{ fontWeight: 600, fontSize: "1.08em" }}>{challenge.title}</div>
                  <div className="text-xs text-gray-500" style={{ fontSize: "0.92em", color: "#64748b" }}>
                    Récompense : <b>{challenge.reward} pts</b> &nbsp;|&nbsp; À faire avant le <span>{challenge.deadline}</span>
                  </div>
                </div>
                <div className="ml-2 flex items-center">
                  {challenge.status === "réussi" ? (
                    <span className="text-green-600 flex items-center" style={{ color: "#43a047", display: "flex", alignItems: "center" }}>
                      <FaCheckCircle className="mr-1" style={{ marginRight: 4 }} /> Réussi
                    </span>
                  ) : (
                    <span className="text-orange-500" style={{ color: "#f59e42" }}>En cours</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Classement */}
      {tab === "leaderboard" && (
        <div className="challenge-leaderboard" style={{ marginTop: 24, background: "#f1f5f9", borderRadius: 8, padding: "1rem 1.2rem" }}>
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white flex items-center" style={{ fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center" }}>
            <FaTrophy className="mr-1" style={{ marginRight: 4 }} /> Fame Ladder
          </h3>
          <ol style={{ paddingLeft: "1.2em", margin: 0 }}>
            {leaderboard.map((user, idx) => (
              <li
                key={user.id}
                className={`flex justify-between items-center py-1 text-sm${user.name === "Vous" ? " font-bold text-blue-600 dark:text-blue-300" : ""}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.3em 0",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: user.name === "Vous" ? 600 : 400,
                  color: user.name === "Vous" ? "#2563eb" : "#222"
                }}
                aria-label={`#${idx + 1} ${user.name}, ${user.points} points`}
              >
                <span>
                  #{idx + 1} {user.name}
                </span>
                <span className="flex items-center" style={{ display: "flex", alignItems: "center" }}>
                  <FaStar className="mr-1 text-yellow-400" style={{ marginRight: 4, color: "#fbbf24" }} /> {user.points}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </motion.div>
  );
};

export default Challenges;