import React, { useState } from "react";

/**
 * Quiz – Achiri
 * Quiz interactif IA pour la classe virtuelle.
 * - Accessibilité avancée (ARIA, focus, feedback, navigation clavier)
 * - Sécurité (aucune donnée sensible, pas de tracking)
 * - Compatible mobile/web, design moderne, UX avancée
 * - Prêt pour extensions (badges, export, notifications, multi-langues, SEO, etc)
 *
 * Props :
 *   - classroomId : identifiant de la classe (optionnel, pour extension)
 *   - userId : identifiant utilisateur (optionnel, pour extension)
 */

const mockQuiz = {
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
};

const Quiz = ({ classroomId, userId }) => {
  const [quiz] = useState(mockQuiz);
  const [answers, setAnswers] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Accessibilité : focus sur le titre à l'ouverture
  const titleRef = React.useRef();
  React.useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  // Répondre à une question
  const handleAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  // Soumettre le quiz (simulation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setTimeout(() => {
      // Vérifie si toutes les questions sont répondues
      if (Object.keys(answers).length !== quiz.questions.length) {
        setError("Merci de répondre à toutes les questions.");
        setLoading(false);
        return;
      }
      setSuccess("Quiz soumis avec succès !");
      setLoading(false);
    }, 700);
  };

  if (loading)
    return (
      <div
        style={{
          margin: "2rem auto",
          padding: 24,
          borderRadius: 12,
          maxWidth: 500,
          background: "#fafcff",
          textAlign: "center",
          color: "#1976d2",
          fontWeight: 600,
        }}
        aria-live="polite"
      >
        Chargement du quiz...
      </div>
    );
  if (!quiz) return <div>Aucun quiz disponible.</div>;

  return (
    <section
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3e3e3",
        borderRadius: 12,
        maxWidth: 500,
        background: "#fafcff",
        outline: "none",
        boxShadow: "0 2px 16px #1976d220",
      }}
      aria-label="Quiz interactif IA"
      tabIndex={0}
    >
      <h3
        ref={titleRef}
        style={{
          marginBottom: 18,
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.3em",
          outline: "none",
        }}
        tabIndex={-1}
      >
        🤖 Quiz IA
      </h3>
      {error && (
        <div style={{ color: "#d63031", marginBottom: 10 }} role="alert">
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "#00b894", marginBottom: 10 }} role="status">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} aria-describedby="quiz-desc">
        <div id="quiz-desc" style={{ display: "none" }}>
          Répondez à toutes les questions puis soumettez le quiz.
        </div>
        {quiz.questions &&
          quiz.questions.map((q) => (
            <fieldset
              key={q.id}
              style={{
                marginBottom: 18,
                border: "none",
                padding: 0,
              }}
              aria-labelledby={`label-${q.id}`}
            >
              <legend
                id={`label-${q.id}`}
                style={{
                  fontWeight: "bold",
                  marginBottom: 6,
                  color: "#222",
                }}
              >
                {q.text}
              </legend>
              {q.choices.map((choice) => (
                <label
                  key={choice}
                  style={{
                    marginRight: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "1em",
                  }}
                >
                  <input
                    type="radio"
                    name={`q_${q.id}`}
                    value={choice}
                    checked={answers[q.id] === choice}
                    onChange={() => handleAnswer(q.id, choice)}
                    style={{ marginRight: 6 }}
                    aria-checked={answers[q.id] === choice}
                    aria-label={choice}
                    required
                  />
                  {choice}
                </label>
              ))}
            </fieldset>
          ))}
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 2em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: "pointer",
            marginTop: 10,
            transition: "background 0.2s",
          }}
          aria-label="Soumettre le quiz"
        >
          Soumettre le quiz
        </button>
      </form>
    </section>
  );
};

export default Quiz;

/**
 * Documentation :
 * - Props : classroomId (optionnel), userId (optionnel)
 * - Accessibilité : ARIA, focus, feedback visuel, navigation clavier
 * - Sécurité : aucune donnée sensible, pas de tracking
 * - Extensible : badges, export, notifications, multi-langues, SEO, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */
