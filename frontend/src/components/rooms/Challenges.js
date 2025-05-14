import React, { useState } from "react";
import {
  FaStar,
  FaTrophy,
  FaFire,
  FaCalendarDay,
  FaMedal,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "./Challenges.css";

/**
 * Challenges – Achiri
 * Composant Défis & Classement : UX moderne, accessibilité, sécurité, responsive, SEO friendly.
 * - Affiche les défis (quotidiens, hebdo, mensuels) et le classement.
 * - Props : (pour extension) challenges, leaderboard, currentUser, onValidate, etc.
 * - Design avancé, navigation clavier, aria, mobile/web, branding Achiri.
 * - Prêt pour extensions futures (badges, validation, analytics, notifications, export, IA…).
 */

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

const Challenges = ({
  challenges = mockChallenges,
  leaderboard = mockLeaderboard,
  currentUser = "Vous",
  onValidate,
}) => {
  const [tab, setTab] = useState("challenges");

  // Accessibilité : focus auto sur le titre à l'arrivée
  const titleRef = React.useRef();
  React.useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  return (
    <motion.section
      className="challenges-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Défis Achiri"
      tabIndex={0}
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2.2rem 1.5rem",
        maxWidth: 540,
        margin: "2.5rem auto",
        outline: "none",
      }}
    >
      <Helmet>
        <title>Défis & Classement | Achiri</title>
        <meta
          name="description"
          content="Défis quotidiens, hebdo, mensuels et classement Achiri. Gagne des points, monte dans le classement ! Design avancé, accessibilité, sécurité, mobile/web."
        />
      </Helmet>
      <header
        className="flex items-center justify-between mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2
          className="text-2xl font-bold text-gray-800 dark:text-white flex items-center"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "#1976d2",
          }}
          tabIndex={0}
          aria-label="Défis et classement Achiri"
          ref={titleRef}
        >
          <FaFire style={{ marginRight: 8, color: "#f59e42" }} /> Défis &
          Classements
        </h2>
        <nav
          aria-label="Navigation défis/classement"
          style={{ display: "flex", gap: 8 }}
        >
          <button
            className={`tab-btn${tab === "challenges" ? " active" : ""}`}
            onClick={() => setTab("challenges")}
            aria-selected={tab === "challenges"}
            aria-label="Voir les défis"
            tabIndex={0}
            style={{
              background: tab === "challenges" ? "#1976d2" : "#f5f7fa",
              color: tab === "challenges" ? "#fff" : "#1976d2",
              border: "none",
              borderRadius: 8,
              padding: "7px 16px",
              fontWeight: 600,
              fontSize: "1em",
              cursor: "pointer",
              transition: "background 0.18s",
            }}
          >
            <FaStar style={{ marginRight: 4 }} /> Défis
          </button>
          <button
            className={`tab-btn${tab === "leaderboard" ? " active" : ""}`}
            onClick={() => setTab("leaderboard")}
            aria-selected={tab === "leaderboard"}
            aria-label="Voir le classement"
            tabIndex={0}
            style={{
              background: tab === "leaderboard" ? "#1976d2" : "#f5f7fa",
              color: tab === "leaderboard" ? "#fff" : "#1976d2",
              border: "none",
              borderRadius: 8,
              padding: "7px 16px",
              fontWeight: 600,
              fontSize: "1em",
              cursor: "pointer",
              transition: "background 0.18s",
            }}
          >
            <FaTrophy style={{ marginRight: 4 }} /> Classement
          </button>
        </nav>
      </header>

      {/* Liste des défis */}
      {tab === "challenges" && (
        <section className="challenge-list" style={{ marginTop: 16 }}>
          {challenges.length === 0 ? (
            <div
              style={{ color: "#888", textAlign: "center", padding: "2em 0" }}
            >
              Aucun défi en cours.
            </div>
          ) : (
            challenges.map((challenge) => (
              <article
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
                  borderLeft:
                    challenge.status === "réussi"
                      ? "4px solid #22c55e"
                      : "4px solid #f59e42",
                  boxShadow: "0 1px 4px 0 rgba(37,99,235,0.04)",
                  outline: "none",
                }}
                aria-label={`Défi ${challenge.type} : ${challenge.title}`}
              >
                <div style={{ fontSize: "1.3em" }}>
                  {challenge.type === "quotidien" && (
                    <FaCalendarDay
                      title="Défi quotidien"
                      style={{ color: "#2563eb" }}
                    />
                  )}
                  {challenge.type === "hebdo" && (
                    <FaMedal title="Défi hebdo" style={{ color: "#a78bfa" }} />
                  )}
                  {challenge.type === "mensuel" && (
                    <FaTrophy
                      title="Défi mensuel"
                      style={{ color: "#fbbf24" }}
                    />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.08em",
                      color: "#222",
                    }}
                  >
                    {challenge.title}
                  </div>
                  <div style={{ fontSize: "0.92em", color: "#64748b" }}>
                    Récompense : <b>{challenge.reward} pts</b> &nbsp;|&nbsp; À
                    faire avant le <span>{challenge.deadline}</span>
                  </div>
                </div>
                <div>
                  {challenge.status === "réussi" ? (
                    <span
                      style={{
                        color: "#43a047",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                      }}
                    >
                      <FaCheckCircle style={{ marginRight: 4 }} /> Réussi
                    </span>
                  ) : (
                    <span style={{ color: "#f59e42", fontWeight: 600 }}>
                      En cours
                    </span>
                  )}
                </div>
                {onValidate && challenge.status !== "réussi" && (
                  <button
                    onClick={() => onValidate(challenge.id)}
                    style={{
                      marginLeft: 12,
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: 7,
                      padding: "6px 14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.98em",
                    }}
                    aria-label={`Valider le défi ${challenge.title}`}
                  >
                    Valider
                  </button>
                )}
              </article>
            ))
          )}
        </section>
      )}

      {/* Classement */}
      {tab === "leaderboard" && (
        <section
          className="challenge-leaderboard"
          style={{
            marginTop: 24,
            background: "#f1f5f9",
            borderRadius: 8,
            padding: "1rem 1.2rem",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              color: "#1976d2",
            }}
          >
            <FaTrophy style={{ marginRight: 4 }} /> Fame Ladder
          </h3>
          <ol style={{ paddingLeft: "1.2em", margin: 0 }}>
            {leaderboard.map((user, idx) => (
              <li
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.3em 0",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: user.name === currentUser ? 700 : 400,
                  color: user.name === currentUser ? "#2563eb" : "#222",
                }}
                aria-label={`#${idx + 1} ${user.name}, ${user.points} points`}
                tabIndex={0}
              >
                <span>
                  #{idx + 1} {user.name}
                </span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaStar style={{ marginRight: 4, color: "#fbbf24" }} />{" "}
                  {user.points}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <footer
        style={{
          marginTop: 32,
          color: "#888",
          fontSize: "0.98em",
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
          Design avancé, navigation clavier, SEO optimisé, gamification Achiri.
        </span>
      </footer>
    </motion.section>
  );
};

export default Challenges;

/**
 * Documentation :
 * - Défis Achiri : UX moderne, accessibilité (clavier, aria), responsive, SEO via Helmet.
 * - Affiche défis (quotidiens, hebdo, mensuels) et classement.
 * - Props : challenges, leaderboard, currentUser, onValidate (optionnel)
 * - Sécurité : pas d'info sensible, navigation sécurisée.
 * - Design avancé, branding Achiri, mobile first, gamification.
 * - Prêt pour extensions futures (badges, validation, analytics, notifications, export, IA…).
 */
