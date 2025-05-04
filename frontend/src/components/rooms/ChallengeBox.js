import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

import visionApi from "../services/visionApi";

/**
 * ChallengeBox (ex CameraDescription) – Achiri
 * Composant d'accessibilité et de défi IA : description visuelle IA pour personnes aveugles/malvoyantes ou challenge créatif.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly.
 * - Design moderne, navigation clavier, aria, mobile/web, branding Achiri.
 * - Prêt pour extensions futures (badges, validation, analytics, notifications, export, IA…).
 */

const ChallengeBox = ({
  onValidate, // callback(optionnel) pour valider le défi après description
  challengeTitle = "Défi accessibilité IA",
  challengeDescription = "Utilisez la caméra pour obtenir une description IA de la scène.",
  showChallenge = true,
}) => {
  const videoRef = useRef(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  // Lance la webcam à l'affichage du composant
  React.useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraActive(true);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Impossible d'accéder à la caméra.");
        setCameraActive(false);
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    };
  }, []);

  // Capture une image et demande la description IA
  const handleDescribe = async () => {
    setError("");
    setDescription("");
    setLoading(true);
    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      const result = await visionApi.describe({ image: dataUrl });
      setDescription(result.description || "Aucune description générée.");
      // Optionnel : lecture vocale
      if (window.speechSynthesis && result.description) {
        const utter = new window.SpeechSynthesisUtterance(result.description);
        utter.lang = "fr-FR";
        utter.rate = 1;
        window.speechSynthesis.speak(utter);
      }
      if (onValidate && result.description) onValidate(result.description);
    } catch (err) {
      setError("Erreur lors de l'analyse IA.");
    }
    setLoading(false);
  };

  // Accessibilité : focus auto sur le titre à l'arrivée
  const titleRef = useRef();
  React.useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  return (
    <section
      className="challenge-box camera-description"
      style={{
        maxWidth: 440,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none"
      }}
      aria-label="Défi accessibilité IA"
      tabIndex={0}
    >
      <Helmet>
        <title>{challengeTitle} | Achiri</title>
        <meta name="description" content="Accessibilité avancée : description visuelle IA pour personnes aveugles/malvoyantes. Design moderne, sécurité, mobile/web." />
      </Helmet>
      <h2
        style={{
          color: "#1976d2",
          marginBottom: 18,
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.25em",
          letterSpacing: "0.01em"
        }}
        tabIndex={0}
        aria-label="Titre défi accessibilité IA"
        ref={titleRef}
      >
        👁️ {challengeTitle}
      </h2>
      {showChallenge && (
        <p
          style={{
            color: "#555",
            marginBottom: 18,
            textAlign: "center",
            fontSize: "1.05em"
          }}
          tabIndex={0}
          aria-label="Description du défi"
        >
          {challengeDescription}
        </p>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          borderRadius: 8,
          background: "#222",
          minHeight: 180,
          marginBottom: 12,
          outline: "none"
        }}
        aria-label="Webcam en direct"
        tabIndex={0}
      />
      <button
        onClick={handleDescribe}
        disabled={loading || !cameraActive}
        style={{
          margin: "1em 0",
          padding: "0.7em 1.5em",
          fontSize: "1.1em",
          borderRadius: 6,
          background: cameraActive ? "#1976d2" : "#bbb",
          color: "#fff",
          border: "none",
          cursor: loading || !cameraActive ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          fontWeight: 600,
          outline: "none"
        }}
        aria-label="Décrire la scène"
        tabIndex={0}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === " ") && !loading && cameraActive) {
            e.preventDefault();
            handleDescribe();
          }
        }}
      >
        {loading ? "Analyse..." : "Décrire la scène"}
      </button>
      {description && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 6,
            marginTop: 10,
            fontSize: "1.1em",
            color: "#1976d2"
          }}
          aria-live="polite"
          tabIndex={0}
        >
          <b>Description IA :</b> {description}
        </div>
      )}
      {error && (
        <div style={{ color: "#b71c1c", marginTop: 10 }} role="alert" tabIndex={0}>
          {error}
        </div>
      )}
      {!cameraActive && !error && (
        <div style={{ color: "#888", marginTop: 10 }}>
          Autorisez l'accès à la caméra pour utiliser cette fonctionnalité.
        </div>
      )}
      <footer style={{
        marginTop: 18,
        color: "#888",
        fontSize: "0.98em",
        textAlign: "center"
      }}>
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
        <br />
        <span style={{ fontSize: "0.93em" }}>
          Design avancé, navigation clavier, SEO optimisé, accessibilité IA Achiri.
        </span>
      </footer>
    </section>
  );
};

export default ChallengeBox;

/**
 * Documentation :
 * - Défi accessibilité IA : description visuelle IA pour accessibilité (aveugles/malvoyants) ou challenge créatif.
 * - UX avancée, navigation clavier, aria, responsive, SEO via Helmet.
 * - Props : onValidate (callback), challengeTitle, challengeDescription, showChallenge.
 * - Sécurité : pas de stockage image, flux local uniquement, permissions contrôlées.
 * - Design moderne, branding Achiri, mobile first.
 * - Prêt pour extensions futures (badges, validation, analytics, notifications, export, IA…).
 */