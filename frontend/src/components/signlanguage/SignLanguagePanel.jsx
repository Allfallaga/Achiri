import React, { useRef, useState } from "react";

/**
 * SignLanguagePanel – Achiri
 * Panneau avancé de traduction et sensibilisation à la Langue des Signes Française (LSF).
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : webcam, traduction IA simulée, historique, documentation, feedback utilisateur.
 * - Prêt pour extensions futures (analyse réelle, analytics, dark mode, etc).
 */

const SignLanguagePanel = () => {
  const videoRef = useRef(null);
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [history, setHistory] = useState([]);

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
      setTimeout(() => {
        const simulated = "Bonjour (simulation IA)";
        setTranslation(simulated);
        setHistory((h) =>
          [{ date: new Date(), text: simulated }, ...h].slice(0, 5),
        );
        setLoading(false);
      }, 1200);
    } catch (err) {
      setError("Erreur lors de la traduction IA.");
      setLoading(false);
    }
  };

  return (
    <section
      className="signlanguage-panel"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #1976d233",
        padding: "2.2rem",
        outline: "none",
      }}
      aria-label="Panneau Langue des Signes Française IA"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.35em",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
        tabIndex={0}
        aria-label="Traduction et sensibilisation LSF"
      >
        <span role="img" aria-label="langue des signes">
          🤟
        </span>
        Panneau Langue des Signes IA
      </h2>
      <p style={{ color: "#555", fontSize: 15, marginBottom: 18 }}>
        Traduisez vos gestes en texte grâce à l’IA (simulation). Sensibilisation
        à la LSF, accessibilité universelle, sécurité et respect de la vie
        privée.
      </p>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          borderRadius: 10,
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
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 10,
            fontSize: "1.1em",
            color: "#1976d2",
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

      {/* Historique des traductions */}
      {history.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <b>Historique (5 dernières) :</b>
          <ul
            style={{
              fontSize: 15,
              color: "#1976d2",
              paddingLeft: 18,
              margin: 0,
            }}
          >
            {history.map((h, i) => (
              <li key={i}>
                <span style={{ color: "#888", fontSize: 13, marginRight: 8 }}>
                  {h.date.toLocaleTimeString()}
                </span>
                {h.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Documentation & sensibilisation */}
      <div
        style={{
          marginTop: 24,
          fontSize: 14,
          color: "#555",
          background: "#f0f4f8",
          borderRadius: 8,
          padding: "0.7em 1em",
        }}
      >
        <b>À propos de la LSF :</b> La Langue des Signes Française est une
        langue à part entière, essentielle pour l’inclusion des personnes
        sourdes et malentendantes.{" "}
        <a
          href="https://www.france-langue-signes.fr/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          En savoir plus
        </a>
      </div>

      <footer
        style={{
          marginTop: 18,
          color: "#888",
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
    </section>
  );
};

export default SignLanguagePanel;

/**
 * Documentation :
 * - Traduction IA LSF : webcam, analyse simulée, historique, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, permissions caméra, feedback clair.
 * - Design avancé, branding Achiri, mobile first, documentation intégrée.
 * - Prêt pour extensions futures (analyse réelle, analytics, dark mode, etc).
 */
