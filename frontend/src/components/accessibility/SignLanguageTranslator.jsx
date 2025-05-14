import React, { useRef, useState } from "react";

/**
 * SignLanguageTranslator – Achiri
 * Traduction IA de la langue des signes en texte pour l'accessibilité.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design avancé, dark mode ready.
 * - Version mock : aucune requête réseau, tout est simulé.
 * - Prêt pour extensions futures (analyse réelle, analytics, overlay, badges, IA…).
 */

const SignLanguageTranslator = () => {
  const videoRef = useRef(null);
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Lance la webcam à l'affichage du composant
  React.useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraActive(true);
      } catch (err) {
        setError("Impossible d'accéder à la caméra.");
        setCameraActive(false);
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
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

  // Dark mode toggle
  const handleDarkMode = () => {
    setDarkMode((v) => !v);
    if (!darkMode) {
      document.body.classList.add("achiri-dark");
    } else {
      document.body.classList.remove("achiri-dark");
    }
  };

  return (
    <section
      className={`sign-language-translator${darkMode ? " dark" : ""}`}
      style={{
        maxWidth: 440,
        margin: "2rem auto",
        background: darkMode ? "#232b3b" : "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
        color: darkMode ? "#ffe082" : "#222",
        transition: "background 0.3s, color 0.3s",
      }}
      aria-label="Traduction IA de la langue des signes"
      tabIndex={0}
    >
      <h2
        style={{
          color: darkMode ? "#ffe082" : "#1976d2",
          fontWeight: 700,
          fontSize: "1.3em",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        tabIndex={0}
        aria-label="Traduction Langue des Signes IA"
      >
        <span role="img" aria-label="langue des signes">
          🤟
        </span>
        Traduction Langue des Signes IA
        <button
          type="button"
          onClick={handleDarkMode}
          aria-label={
            darkMode ? "Désactiver le mode sombre" : "Activer le mode sombre"
          }
          style={{
            marginLeft: 12,
            background: "none",
            border: "none",
            color: darkMode ? "#ffe082" : "#1976d2",
            cursor: "pointer",
            fontSize: 20,
          }}
          tabIndex={0}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          borderRadius: 8,
          background: "#222",
          minHeight: 180,
          outline: cameraActive ? "2px solid #1976d2" : "2px dashed #b71c1c",
        }}
        aria-label="Webcam en direct"
        tabIndex={0}
      />
      <button
        onClick={handleTranslate}
        disabled={loading || !cameraActive}
        style={{
          margin: "1em 0",
          padding: "0.7em 1.5em",
          fontSize: "1.1em",
          borderRadius: 8,
          background: cameraActive ? "#43a047" : "#bdbdbd",
          color: "#fff",
          border: "none",
          cursor: loading || !cameraActive ? "not-allowed" : "pointer",
          fontWeight: "bold",
          transition: "background 0.2s",
        }}
        aria-label="Traduire le geste en texte"
      >
        {loading
          ? "Analyse..."
          : cameraActive
            ? "Traduire le geste"
            : "Caméra inactive"}
      </button>
      {translation && (
        <div
          style={{
            background: darkMode ? "#181f2a" : "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em",
            color: darkMode ? "#ffe082" : "#1976d2",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          <b>Traduction IA :</b> {translation}
        </div>
      )}
      {error && (
        <div
          style={{ color: "#b71c1c", marginTop: 10 }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </div>
      )}
      <footer
        style={{
          marginTop: 18,
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
        .sign-language-translator:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .sign-language-translator {
            padding: 1rem;
            max-width: 99vw;
            font-size: 1em;
          }
        }
        .sign-language-translator.dark {
          background: #232b3b !important;
          color: #ffe082 !important;
        }
        .sign-language-translator.dark video {
          background: #181f2a !important;
        }
      `}</style>
    </section>
  );
};

export default SignLanguageTranslator;

/**
 * Documentation :
 * - Traduction IA langue des signes : webcam, analyse simulée, feedback utilisateur, dark mode.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, permissions caméra, feedback clair.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (overlay, badges, IA…).
 */
