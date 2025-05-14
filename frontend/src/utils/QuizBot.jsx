import React, { useState } from "react";

/**
 * QuizBot – Achiri
 * Bot de quiz IA pour l'éducation interactive.
 * - Accessibilité avancée (ARIA, focus, feedback, navigation clavier)
 * - Sécurité (aucune donnée sensible, pas de tracking)
 * - Compatible mobile/web, design moderne, UX avancée
 * - Prêt pour extensions (badges, export, notifications, multi-langues, SEO, etc)
 *
 * Props :
 *   - classroomId : identifiant de la classe (optionnel, pour extension)
 *   - userId : identifiant utilisateur (optionnel, pour extension)
 */

const mockQuestions = [
  {
    id: 1,
    text: "Quelle est la capitale de la France ?",
    answer: "Paris",
  },
  {
    id: 2,
    text: "Combien font 2 + 2 ?",
    answer: "4",
  },
  {
    id: 3,
    text: "Quelle couleur obtient-on en mélangeant bleu et jaune ?",
    answer: "Vert",
  },
];

const QuizBot = ({ classroomId, userId }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [askedQuestions, setAskedQuestions] = useState([]);

  // Accessibilité : focus sur le bouton de démarrage à l'ouverture
  const startBtnRef = React.useRef();
  React.useEffect(() => {
    if (!quizStarted && startBtnRef.current) startBtnRef.current.focus();
  }, [quizStarted, askedQuestions.length]);

  // Démarre un nouveau quiz/question (mock)
  const startQuiz = () => {
    setLoading(true);
    setError("");
    setFeedback("");
    setAnswer("");
    setTimeout(() => {
      // Prend une question non posée au hasard
      const available = mockQuestions.filter(
        (q) => !askedQuestions.includes(q.id),
      );
      if (available.length === 0) {
        setError("Plus de questions disponibles.");
        setLoading(false);
        return;
      }
      const q = available[Math.floor(Math.random() * available.length)];
      setQuestion(q);
      setQuizStarted(true);
      setAskedQuestions((prev) => [...prev, q.id]);
      setLoading(false);
    }, 500);
  };

  // Soumet la réponse de l'utilisateur (mock)
  const submitAnswer = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      const isCorrect =
        answer.trim().toLowerCase() === question.answer.toLowerCase();
      setFeedback(
        isCorrect
          ? "Bonne réponse !"
          : `Mauvaise réponse. La bonne réponse était : ${question.answer}`,
      );
      setScore((prev) => (isCorrect ? prev + 1 : prev));
      setHistory((prev) => [
        ...prev,
        {
          question: question.text,
          yourAnswer: answer,
          correct: isCorrect,
          correction: isCorrect ? null : question.answer,
        },
      ]);
      setQuestion(null);
      setAnswer("");
      setQuizStarted(false);
      setLoading(false);
    }, 700);
  };

  return (
    <section
      className="quiz-bot"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
      }}
      aria-label="QuizBot IA interactif"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.4em",
          marginBottom: 8,
        }}
      >
        🎓 QuizBot IA
      </h2>
      <p style={{ color: "#444", marginBottom: 18 }}>
        Teste tes connaissances grâce à l’IA ! Lance un quiz, réponds et
        découvre la correction instantanée.
      </p>
      <div style={{ marginBottom: 18, color: "#43a047", fontWeight: 600 }}>
        <b>Score actuel :</b> {score}
      </div>
      {!quizStarted && (
        <button
          ref={startBtnRef}
          onClick={startQuiz}
          disabled={loading || askedQuestions.length === mockQuestions.length}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 2em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor:
              loading || askedQuestions.length === mockQuestions.length
                ? "not-allowed"
                : "pointer",
            marginBottom: 16,
            transition: "background 0.2s",
          }}
          aria-label="Nouvelle question"
        >
          {loading
            ? "Chargement..."
            : askedQuestions.length === mockQuestions.length
              ? "Terminé"
              : "Nouvelle question"}
        </button>
      )}
      {question && (
        <form onSubmit={submitAnswer} style={{ marginBottom: 18 }}>
          <div style={{ marginBottom: 10 }}>
            <b>Question :</b>
            <div style={{ marginTop: 6 }}>{question.text}</div>
          </div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ta réponse"
            required
            style={{
              width: "100%",
              padding: "0.7em 1em",
              borderRadius: 8,
              border: "1px solid #bbdefb",
              fontSize: 16,
              marginBottom: 8,
            }}
            aria-label="Réponse"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7em 2em",
              fontWeight: "bold",
              fontSize: "1.1em",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
            aria-label="Valider la réponse"
          >
            {loading ? "Envoi..." : "Valider"}
          </button>
        </form>
      )}
      {feedback && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em",
            color: feedback.startsWith("Bonne") ? "#43a047" : "#d63031",
          }}
          aria-live="polite"
        >
          <b>Correction :</b> {feedback}
        </div>
      )}
      <h3 style={{ marginTop: 24, color: "#1976d2", fontWeight: 600 }}>
        Historique
      </h3>
      <div
        style={{
          maxHeight: 120,
          overflowY: "auto",
          background: "#fafafa",
          borderRadius: 6,
          padding: "0.5em",
          fontSize: "0.98em",
        }}
        aria-live="polite"
      >
        {history.length === 0 ? (
          <span>Aucune question répondue.</span>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {history.map((h, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <b>Q:</b> {h.question}
                <br />
                <b>Ta réponse:</b> {h.yourAnswer} {h.correct ? "✅" : "❌"}
                {h.correction && (
                  <span>
                    {" "}
                    <b>Correction:</b> {h.correction}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <div style={{ color: "red", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
      {askedQuestions.length === mockQuestions.length && (
        <div style={{ color: "#1976d2", marginTop: 18, fontWeight: 500 }}>
          🎉 Tu as terminé toutes les questions du quiz !
        </div>
      )}
    </section>
  );
};

export default QuizBot;

/**
 * Documentation :
 * - Props : classroomId (optionnel), userId (optionnel)
 * - Accessibilité : ARIA, focus, feedback visuel, navigation clavier
 * - Sécurité : aucune donnée sensible, pas de tracking
 * - Extensible : badges, export, notifications, multi-langues, SEO, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */
