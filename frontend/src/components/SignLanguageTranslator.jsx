import React, { useRef, useState } from "react";

/**
 * SignLanguageTranslator.jsx
 * Traduction IA de la langue des signes en texte pour l'accessibilité.
 * Version mock : aucune requête réseau, tout est simulé.
 */
const SignLanguageTranslator = () => {
  const videoRef = useRef(null);
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lance la webcam à l'affichage du composant
  React.useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Impossible d'accéder à la caméra.");
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Capture une image et simule la traduction IA
  const handleTranslate = async () => {
    setError("");
    setTranslation("");
    setLoading(true);
    try {
      // Simulation d'analyse IA (aucun appel réseau)
      setTimeout(() => {
        setTranslation("Bonjour (simulation IA)");
        setLoading(false);
      }, 1200);
    } catch (err) {
      setError("Erreur lors de la traduction IA.");
      setLoading(false);
    }
  };

  return (
    <section
      className="sign-language-translator"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none"
      }}
      aria-label="Traduction IA de la langue des signes"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.3em", marginBottom: 14 }}>
        🤟 Traduction Langue des Signes IA
      </h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", borderRadius: 8, background: "#222", minHeight: 180 }}
        aria-label="Webcam en direct"
      />
      <button
        onClick={handleTranslate}
        disabled={loading}
        style={{
          margin: "1em 0",
          padding: "0.7em 1.5em",
          fontSize: "1.1em",
          borderRadius: 8,
          background: "#43a047",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          transition: "background 0.2s"
        }}
        aria-label="Traduire le geste en texte"
      >
        {loading ? "Analyse..." : "Traduire le geste"}
      </button>
      {translation && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em",
            color: "#1976d2"
          }}
          aria-live="polite"
        >
          <b>Traduction IA :</b> {translation}
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
    </section>
  );
};

export default SignLanguageTranslator;