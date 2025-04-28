import React, { useRef, useState } from "react";
import visionApi from "../services/visionApi";

/**
 * CameraDescription.jsx
 * Composant d'accessibilité : description visuelle IA pour personnes aveugles/malvoyantes.
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
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      setError("Erreur lors de l'analyse IA.");
    }
    setLoading(false);
  };

  return (
    <div
      className="camera-description"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d233",
        padding: "2rem"
      }}
      aria-label="Description visuelle IA"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", marginBottom: 18, textAlign: "center" }}>
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
          marginBottom: 12
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
          transition: "background 0.2s"
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
            color: "#1976d2"
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
    </div>
  );
};

export default CameraDescription;