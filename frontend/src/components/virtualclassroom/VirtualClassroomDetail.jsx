import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaTrophy,
  FaPaperPlane,
  FaCheckCircle,
  FaUniversalAccess,
  FaVolumeUp,
  FaLanguage,
  FaUsers,
  FaMoon,
  FaPalette,
} from "react-icons/fa";

/**
 * VirtualClassroomDetail – Achiri
 * Détail d'une classe virtuelle inclusive : quiz, scores, chat, accessibilité, sécurité, mobile/web, design avancé, dark mode.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : quiz, scores, chat, feedback utilisateur, accessibilité, dark mode.
 * - Prêt pour extensions futures (vidéo, live, analytics, overlay, badges, IA…).
 *
 * Props :
 *   classroomId: string|number (identifiant classe)
 *   userId: string (identifiant utilisateur)
 */

const accessibilityFeatures = [
  { icon: <FaUniversalAccess />, label: "Sous-titres" },
  { icon: <FaVolumeUp />, label: "Lecture vocale" },
  { icon: <FaLanguage />, label: "Traduction" },
];

export default function VirtualClassroomDetail({ classroomId, userId }) {
  // Données simulées (mock)
  const [classroom] = useState({
    id: classroomId || 1,
    name: "Classe Démo",
    description: "Bienvenue dans la classe virtuelle de démonstration.",
    accessibility: ["Sous-titres", "Lecture vocale", "Traduction"],
    participants: 12,
  });
  const [quiz] = useState({
    questions: [
      {
        id: "q1",
        text: "Quelle est la couleur du ciel ?",
        choices: ["Bleu", "Vert", "Rouge"],
        answer: "Bleu",
      },
      {
        id: "q2",
        text: "Combien font 2 + 2 ?",
        choices: ["3", "4", "5"],
        answer: "4",
      },
    ],
  });
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([
    { userId: "alice", score: 2 },
    { userId: "bob", score: 1 },
  ]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { user: "alice", text: "Bonjour à tous !" },
    { user: "bob", text: "Salut !" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle
  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  // Répondre au quiz
  const handleAnswer = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    setError("");
    // Correction simple
    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.answer) score++;
    });
    setScores((prev) => [...prev, { userId: userId || "moi", score }]);
    setSuccess("Quiz soumis !");
    setTimeout(() => setSuccess(""), 2000);
  };

  // Envoyer un message (simulation)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChat((prev) => [...prev, { user: userId || "moi", text: message }]);
    setSuccess("Message envoyé !");
    setMessage("");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div
      className={`virtual-classroom-detail-container${darkMode ? " dark" : ""}`}
      style={{
        margin: "2rem 0",
        padding: 24,
        border: "1px solid #e3e8ef",
        borderRadius: 12,
        background: darkMode ? "#232b3b" : "#fff",
        maxWidth: 600,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: darkMode ? "#ffe082" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Détail de la classe virtuelle"
      tabIndex={0}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 18,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaChalkboardTeacher
            style={{
              color: darkMode ? "#ffe082" : "#1976d2",
              fontSize: 28,
              marginRight: 12,
            }}
          />
          <h2
            style={{
              fontWeight: 700,
              fontSize: "1.3em",
              color: darkMode ? "#ffe082" : "#1976d2",
              margin: 0,
            }}
          >
            Détail de la Classe Virtuelle
          </h2>
        </div>
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={
            darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
          }
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#ffe082" : "#1976d2",
            cursor: "pointer",
            fontSize: 20,
          }}
          tabIndex={0}
        >
          {darkMode ? <FaPalette /> : <FaMoon />}
        </button>
      </div>
      {error && (
        <div
          style={{ color: "#b71c1c", marginBottom: 8 }}
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            color: "#43a047",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FaCheckCircle /> {success}
        </div>
      )}
      {classroom ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <strong>Nom :</strong> {classroom.name || `Classe #${classroom.id}`}
            <br />
            <strong>Description :</strong> {classroom.description || "Aucune"}
            <div
              style={{
                marginTop: 8,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <FaUsers style={{ color: "#43a047" }} /> {classroom.participants}{" "}
              participants
              {classroom.accessibility &&
                classroom.accessibility.map((a, i) => {
                  const feature = accessibilityFeatures.find(
                    (f) => f.label === a,
                  );
                  return feature ? (
                    <span
                      key={i}
                      title={feature.label}
                      aria-label={feature.label}
                      style={{ fontSize: 20, marginLeft: 8 }}
                    >
                      {feature.icon}
                    </span>
                  ) : null;
                })}
            </div>
          </div>
          {/* Quiz */}
          {quiz && quiz.questions && (
            <form onSubmit={handleSubmitQuiz} style={{ marginTop: 16 }}>
              <h3
                style={{
                  color: darkMode ? "#ffe082" : "#1976d2",
                  fontWeight: 600,
                  fontSize: "1.1em",
                  marginBottom: 10,
                }}
              >
                <FaTrophy style={{ marginRight: 6 }} /> Quiz
              </h3>
              {quiz.questions.map((q) => (
                <div key={q.id} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>
                    {q.text}
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    {q.choices.map((choice) => (
                      <label
                        key={choice}
                        style={{
                          marginRight: 12,
                          fontWeight: 400,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          value={choice}
                          checked={answers[q.id] === choice}
                          onChange={() => handleAnswer(q.id, choice)}
                          style={{ marginRight: 5 }}
                          aria-label={choice}
                        />
                        {choice}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="submit"
                style={{
                  marginTop: 10,
                  background: darkMode ? "#ffe082" : "#1976d2",
                  color: darkMode ? "#232b3b" : "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.6em 1.5em",
                  fontWeight: "bold",
                  fontSize: "1em",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                aria-label="Soumettre le quiz"
              >
                Soumettre le quiz
              </button>
            </form>
          )}
          {/* Scores */}
          <div style={{ marginTop: 28 }}>
            <h4
              style={{
                color: darkMode ? "#ffe082" : "#2563eb",
                fontWeight: 600,
                fontSize: "1.05em",
              }}
            >
              Scores
            </h4>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {scores.length === 0 && <li>Aucun score</li>}
              {scores.map((s, idx) => (
                <li key={idx} style={{ marginBottom: 2 }}>
                  <span
                    style={{
                      fontWeight: s.userId === (userId || "moi") ? 600 : 400,
                    }}
                  >
                    {s.userId}
                  </span>{" "}
                  :{" "}
                  <span
                    style={{
                      color: darkMode ? "#ffe082" : "#1976d2",
                      fontWeight: 600,
                    }}
                  >
                    {s.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Chat/messages */}
          <div style={{ marginTop: 28 }}>
            <h4
              style={{
                color: darkMode ? "#ffe082" : "#2563eb",
                fontWeight: 600,
                fontSize: "1.05em",
                marginBottom: 8,
              }}
            >
              Chat de la classe
            </h4>
            <div
              style={{
                background: darkMode ? "#181f2a" : "#f9fafb",
                border: "1px solid #e3e8ef",
                borderRadius: 8,
                padding: "10px 12px",
                maxHeight: 120,
                overflowY: "auto",
                marginBottom: 8,
                color: darkMode ? "#ffe082" : "#222",
              }}
              aria-live="polite"
            >
              {chat.length === 0 && (
                <div style={{ color: "#888" }}>Aucun message</div>
              )}
              {chat.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: 4 }}>
                  <span
                    style={{
                      fontWeight: msg.user === (userId || "moi") ? 600 : 400,
                      color: darkMode ? "#ffe082" : "#1976d2",
                    }}
                  >
                    {msg.user}
                  </span>
                  {": "}
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Envoyer un message à la classe"
                style={{
                  width: "70%",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: "1em",
                  background: darkMode ? "#232b3b" : "#fff",
                  color: darkMode ? "#ffe082" : "#222",
                }}
                aria-label="Envoyer un message à la classe"
              />
              <button
                type="submit"
                style={{
                  background: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.6em 1.2em",
                  fontWeight: "bold",
                  fontSize: "1em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                aria-label="Envoyer le message"
              >
                <FaPaperPlane style={{ marginRight: 4 }} /> Envoyer
              </button>
            </form>
          </div>
        </>
      ) : (
        <div>Chargement...</div>
      )}
      <footer
        style={{
          marginTop: 24,
          color: darkMode ? "#ffe082" : "#888",
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
      </footer>
      <style>{`
        .virtual-classroom-detail-container:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .virtual-classroom-detail-container {
            padding: 1rem;
            max-width: 99vw;
            font-size: 1em;
          }
        }
        .virtual-classroom-detail-container.dark {
          background: #232b3b !important;
          color: #ffe082 !important;
        }
        .virtual-classroom-detail-container.dark input,
        .virtual-classroom-detail-container.dark textarea {
          background: #181f2a !important;
          color: #ffe082 !important;
        }
      `}</style>
    </div>
  );
}

/**
 * Documentation :
 * - Détail classe virtuelle inclusive : quiz, scores, chat, accessibilité, feedback utilisateur, dark mode.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, dark mode, contrastes optimisés.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (vidéo, overlay, badges, IA…).
 */
