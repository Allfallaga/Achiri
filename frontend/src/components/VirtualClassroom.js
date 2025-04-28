import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaQuestionCircle,
  FaGamepad,
  FaMicrophone,
  FaVideo,
  FaComments,
  FaBookOpen,
  FaVolumeUp,
  FaLanguage,
  FaArrowLeft
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./VirtualClassroom.css";

// Mock data pour la démo
const mockCourses = [
  {
    id: 1,
    title: "Introduction à l'IA",
    teacher: "Alice",
    date: "2025-04-25",
    description: "Découvre les bases de l'intelligence artificielle avec quiz interactif.",
    language: "fr",
    video: "/videos/intro-ia.mp4",
    quiz: [
      { q: "Qu'est-ce qu'un algorithme ?", a: "Une suite d'instructions" },
      { q: "L'IA peut-elle apprendre ?", a: "Oui" },
    ],
  },
  {
    id: 2,
    title: "Créer un post viral",
    teacher: "Bob",
    date: "2025-04-27",
    description: "Astuces pour booster ta visibilité sur les réseaux.",
    language: "fr",
    video: "/videos/post-viral.mp4",
    quiz: [
      { q: "Quel est le meilleur moment pour poster ?", a: "Quand ton audience est active" },
    ],
  },
];

const VirtualClassroom = () => {
  const [courses] = useState(mockCourses);
  const [selected, setSelected] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelect = (id) => {
    setSelected(courses.find((c) => c.id === id));
    setShowQuiz(false);
    setAnswers({});
    setQuizSubmitted(false);
  };

  const handleAnswer = (idx, value) => {
    setAnswers((prev) => ({ ...prev, [idx]: value }));
  };

  const handleQuizSubmit = () => {
    setShowQuiz(false);
    setQuizSubmitted(true);
    // Ici, on pourrait ajouter une logique de correction ou d'envoi à une API
  };

  return (
    <motion.div
      className="virtual-classroom-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Virtual Classroom Achiri"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center" style={{ display: "flex", alignItems: "center", fontWeight: 700, fontSize: "1.4em", color: "#1976d2" }}>
          <FaChalkboardTeacher className="mr-2" style={{ marginRight: 8 }} /> Virtual Classroom
        </h2>
        <span className="flex items-center text-blue-600 dark:text-blue-300" style={{ display: "flex", alignItems: "center", color: "#2563eb", fontWeight: 500 }}>
          <FaBookOpen className="mr-1" style={{ marginRight: 6 }} /> {courses.length} cours
        </span>
      </div>

      {/* Liste des cours */}
      {!selected && (
        <div className="course-list">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-item"
              onClick={() => handleSelect(course.id)}
              tabIndex={0}
              aria-label={`Voir le cours ${course.title}`}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleSelect(course.id)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <div className="font-semibold text-gray-800 dark:text-white">{course.title}</div>
                <div className="text-xs text-gray-500 flex items-center" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FaUsers className="mr-1" style={{ marginRight: 4 }} /> {course.teacher} &nbsp;|&nbsp;
                  <span className="ml-1">{course.date}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{course.description}</div>
              </div>
              <div className="flex flex-col items-end" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span className="text-xs text-blue-500 flex items-center" style={{ color: "#2563eb", fontWeight: 500 }}>
                  <FaLanguage className="mr-1" style={{ marginRight: 4 }} /> {course.language.toUpperCase()}
                </span>
                <button
                  className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  style={{
                    marginTop: 8,
                    padding: "4px 12px",
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  Accéder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Détail du cours */}
      {selected && (
        <div className="course-detail">
          <button
            className="mb-3 text-blue-600 dark:text-blue-300 text-sm"
            onClick={() => setSelected(null)}
            style={{
              background: "none",
              border: "none",
              color: "#1976d2",
              fontSize: "1em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
              padding: 0
            }}
            aria-label="Retour aux cours"
          >
            <FaArrowLeft style={{ marginRight: 6 }} /> Retour aux cours
          </button>
          <div className="font-bold text-lg text-gray-800 dark:text-white mb-1" style={{ fontWeight: 700, fontSize: "1.2em", color: "#1976d2", marginBottom: 6 }}>{selected.title}</div>
          <div className="text-xs text-gray-500 mb-2 flex items-center" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <FaUsers className="mr-1" style={{ marginRight: 4 }} /> {selected.teacher} &nbsp;|&nbsp; {selected.date}
          </div>
          <div className="mb-3 text-gray-700 dark:text-gray-200">{selected.description}</div>
          <div className="mb-3 flex gap-3" style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <span className="flex items-center text-blue-500" style={{ color: "#2563eb" }}>
              <FaLanguage className="mr-1" style={{ marginRight: 4 }} /> {selected.language.toUpperCase()}
            </span>
            <span className="flex items-center text-green-500" style={{ color: "#43a047" }}>
              <FaVideo className="mr-1" style={{ marginRight: 4 }} /> Vidéo
            </span>
            <span className="flex items-center text-purple-500" style={{ color: "#a259f7" }}>
              <FaMicrophone className="mr-1" style={{ marginRight: 4 }} /> Audio
            </span>
            <span className="flex items-center text-orange-500" style={{ color: "#ff9800" }}>
              <FaComments className="mr-1" style={{ marginRight: 4 }} /> Chat
            </span>
          </div>
          {/* Vidéo mock */}
          <video
            src={selected.video}
            controls
            className="w-full rounded mb-4"
            aria-label="Vidéo du cours"
            style={{ width: "100%", borderRadius: 8, marginBottom: 16, background: "#000" }}
          />
          {/* Quiz IA */}
          <div className="mb-4">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
              style={{
                background: "#fbbf24",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 16px",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => setShowQuiz(!showQuiz)}
              aria-expanded={showQuiz}
              aria-controls="quiz-section"
            >
              <FaQuestionCircle className="mr-1" style={{ marginRight: 8 }} /> {showQuiz ? "Fermer le quiz" : "Quiz IA"}
            </button>
            {showQuiz && (
              <form
                id="quiz-section"
                className="mt-3 space-y-2"
                onSubmit={e => { e.preventDefault(); handleQuizSubmit(); }}
                style={{ marginTop: 12 }}
              >
                {selected.quiz.map((q, idx) => (
                  <div key={idx} style={{ marginBottom: 10 }}>
                    <label className="block text-gray-700 dark:text-gray-200 mb-1" style={{ display: "block", marginBottom: 4 }}>
                      {q.q}
                    </label>
                    <input
                      type="text"
                      value={answers[idx] || ""}
                      onChange={e => handleAnswer(idx, e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        padding: "6px 10px",
                        fontSize: "1em",
                        width: "100%",
                        background: "#fff"
                      }}
                      aria-label={`Réponse à la question ${idx + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                  style={{
                    marginTop: 8,
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 24px",
                    fontWeight: 600,
                    fontSize: "1em",
                    cursor: "pointer"
                  }}
                >
                  Soumettre
                </button>
              </form>
            )}
            {quizSubmitted && (
              <div style={{ color: "#43a047", marginTop: 12, fontWeight: 500 }} aria-live="polite">
                Quiz soumis ! (Mock)
              </div>
            )}
          </div>
          {/* Accessibilité */}
          <div className="accessibility-info bg-blue-50 dark:bg-blue-900 rounded p-3 text-blue-800 dark:text-blue-200 flex items-center gap-3"
            style={{
              marginTop: 24,
              fontSize: "0.98em",
              background: "#eff6ff",
              borderRadius: 8,
              padding: "0.8rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: "#1976d2"
            }}
          >
            <FaVolumeUp /> Lecture vocale &nbsp;|&nbsp; <FaLanguage /> Traduction automatique &nbsp;|&nbsp; <FaGamepad /> Cours gamifiés
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VirtualClassroom;