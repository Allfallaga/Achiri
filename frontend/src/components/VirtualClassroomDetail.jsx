import React, { useState } from "react";
import { FaChalkboardTeacher, FaTrophy, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function VirtualClassroomDetail({ classroomId, userId }) {
  // Données simulées (mock)
  const [classroom] = useState({
    id: classroomId || 1,
    name: "Classe Démo",
    description: "Bienvenue dans la classe virtuelle de démonstration.",
  });
  const [quiz] = useState({
    questions: [
      {
        id: "q1",
        text: "Quelle est la couleur du ciel ?",
        choices: ["Bleu", "Vert", "Rouge"],
      },
      {
        id: "q2",
        text: "Combien font 2 + 2 ?",
        choices: ["3", "4", "5"],
      },
    ],
  });
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([
    { userId: "alice", score: 2 },
    { userId: "bob", score: 1 },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Répondre au quiz
  const handleAnswer = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("Quiz soumis !");
    setScores(prev => [
      ...prev,
      { userId: userId || "moi", score: Object.keys(answers).length },
    ]);
    setTimeout(() => setSuccess(""), 2000);
  };

  // Envoyer un message (simulation)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSuccess("Message envoyé !");
    setMessage("");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div
      className="virtual-classroom-detail-container"
      style={{
        margin: "2rem 0",
        padding: 24,
        border: "1px solid #e3e8ef",
        borderRadius: 12,
        background: "#fff",
        maxWidth: 600,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
      aria-label="Détail de la classe virtuelle"
      tabIndex={0}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <FaChalkboardTeacher style={{ color: "#1976d2", fontSize: 28, marginRight: 12 }} />
        <h2 style={{ fontWeight: 700, fontSize: "1.3em", color: "#1976d2", margin: 0 }}>
          Détail de la Classe Virtuelle
        </h2>
      </div>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {success && (
        <div style={{ color: "#43a047", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <FaCheckCircle /> {success}
        </div>
      )}
      {classroom ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <strong>Nom :</strong> {classroom.name || `Classe #${classroom.id}`}<br />
            <strong>Description :</strong> {classroom.description || "Aucune"}
          </div>
          {/* Quiz */}
          {quiz && quiz.questions && (
            <form onSubmit={handleSubmitQuiz} style={{ marginTop: 16 }}>
              <h3 style={{ color: "#1976d2", fontWeight: 600, fontSize: "1.1em", marginBottom: 10 }}>
                <FaTrophy style={{ marginRight: 6 }} /> Quiz
              </h3>
              {quiz.questions.map(q => (
                <div key={q.id} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{q.text}</div>
                  <div style={{ display: "flex", gap: 16 }}>
                    {q.choices.map(choice => (
                      <label key={choice} style={{ marginRight: 12, fontWeight: 400, cursor: "pointer" }}>
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
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.6em 1.5em",
                  fontWeight: "bold",
                  fontSize: "1em",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                aria-label="Soumettre le quiz"
              >
                Soumettre le quiz
              </button>
            </form>
          )}
          {/* Scores */}
          <div style={{ marginTop: 28 }}>
            <h4 style={{ color: "#2563eb", fontWeight: 600, fontSize: "1.05em" }}>Scores</h4>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {scores.length === 0 && <li>Aucun score</li>}
              {scores.map((s, idx) => (
                <li key={idx} style={{ marginBottom: 2 }}>
                  <span style={{ fontWeight: s.userId === (userId || "moi") ? 600 : 400 }}>
                    {s.userId}
                  </span> : <span style={{ color: "#1976d2", fontWeight: 600 }}>{s.score}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Messages */}
          <form onSubmit={handleSendMessage} style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Envoyer un message à la classe"
              style={{
                width: "70%",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                padding: "8px 12px",
                fontSize: "1em",
                background: "#f9fafb"
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
                gap: 6
              }}
              aria-label="Envoyer le message"
            >
              <FaPaperPlane style={{ marginRight: 4 }} /> Envoyer
            </button>
          </form>
        </>
      ) : (
        <div>Chargement...</div>
      )}
    </div>
  );
}