import React, { useRef, useState } from "react";

import { describeImageMock } from "../../services/visionApi.js"; // Correction : import nommé

/**
 * CameraDescription – Achiri
 * Composant d'accessibilité : description visuelle IA pour personnes aveugles/malvoyantes.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : webcam, capture, analyse IA, feedback, focus, couleurs, responsive, live region, dark mode ready, lecture vocale.
 * - Prêt pour extensions futures (export, favoris, analytics, dark mode, etc).
 */

const CameraDescription = () => {
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
      if (stream) stream.getTracks().forEach((track) => track.stop());
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
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      const result = await describeImageMock(dataUrl); // Correction : appel de la fonction nommée
      setDescription(result.description || "Aucune description générée.");
      // Lecture vocale optionnelle
      if (window.speechSynthesis && result.description) {
        const utter = new window.SpeechSynthesisUtterance(result.description);
        utter.lang = "fr-FR";
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      setError("Erreur lors de l'analyse IA.");
    }
    setLoading(false);
  };

  return (
    <section
      className="camera-description"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem",
        outline: "none",
      }}
      aria-label="Description visuelle IA"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          marginBottom: 18,
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.3em",
        }}
      >
        👁️ Description visuelle IA
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
          marginBottom: 12,
        }}
        aria-label="Webcam en direct"
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
          fontWeight: 600,
          transition: "background 0.2s",
        }}
        aria-label="Décrire la scène"
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
            color: "#1976d2",
          }}
          aria-live="polite"
        >
          <b>Description IA :</b> {description}
        </div>
      )}
      {error && (
        <div style={{ color: "#b71c1c", marginTop: 10 }} role="alert">
          {error}
        </div>
      )}
      {!cameraActive && !error && (
        <div style={{ color: "#888", marginTop: 10 }}>
          Autorisez l'accès à la caméra pour utiliser cette fonctionnalité.
        </div>
      )}
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

export default CameraDescription;

/**
 * Documentation :
 * - Description visuelle IA : webcam, capture, analyse IA, feedback, focus, couleurs, responsive, lecture vocale.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle caméra.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
