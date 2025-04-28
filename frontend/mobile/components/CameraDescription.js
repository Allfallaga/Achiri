import React, { useRef, useState, useEffect, useCallback } from "react";
import visionApi from "../services/visionApi";

/**
 * Composant CameraDescription
 * - Permet à un utilisateur aveugle ou malvoyant de recevoir une description audio/texte de ce que voit la caméra.
 * - Utilise l'API backend /api/vision/describe pour obtenir la description IA.
 * - Accessibilité renforcée, gestion d'erreurs améliorée, design modernisé.
 */
const CameraDescription = () => {
  const videoRef = useRef(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stream, setStream] = useState(null);

  // Capture une image de la webcam et envoie à l'API vision
  const handleDescribe = useCallback(async () => {
    setError("");
    setLoading(true);
    setDescription("");
    try {
      const video = videoRef.current;
      if (!video || video.readyState !== 4) {
        setError("La caméra n'est pas prête.");
        setLoading(false);
        return;
      }
      // Capture image depuis la webcam
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");

      // Appel API backend
      const res = await visionApi.describe({ image: imageData });
      setDescription(res.description || "Aucune description trouvée.");
      // Optionnel : lecture vocale
      if (window.speechSynthesis && res.description) {
        const utter = new window.SpeechSynthesisUtterance(res.description);
        utter.lang = "fr-FR";
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {
      setError("Erreur lors de la description de l'image.");
    }
    setLoading(false);
  }, []);

  // Démarre la webcam à l'affichage du composant
  useEffect(() => {
    let localStream = null;
    setError("");
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        localStream = s;
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setError("Impossible d'accéder à la caméra. Vérifiez les permissions."));
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Accessibilité : focus sur le bouton après description
  useEffect(() => {
    if (!loading && !error && description) {
      const btn = document.getElementById("describe-btn");
      if (btn) btn.focus();
    }
  }, [loading, error, description]);

  return (
    <main
      className="camera-description"
      style={{
        maxWidth: 420,
        margin: "2rem auto",
        padding: "2rem 1rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}
      aria-labelledby="camera-desc-title"
    >
      <h1 id="camera-desc-title" style={{ fontSize: "1.5rem", marginBottom: 16 }}>
        <span role="img" aria-label="œil">👁️</span> Description visuelle IA
      </h1>
      <section>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            borderRadius: 8,
            background: "#222",
            minHeight: 180,
            outline: error ? "2px solid #e00" : "none",
          }}
          aria-label="Webcam en direct"
          tabIndex={0}
        />
      </section>
      <section style={{ marginTop: 24 }}>
        <button
          id="describe-btn"
          onClick={handleDescribe}
          disabled={loading || !stream}
          style={{
            margin: "0 auto",
            display: "block",
            padding: "0.9em 2em",
            fontSize: "1.1em",
            borderRadius: 8,
            background: loading || !stream ? "#b0b0b0" : "#0055ff",
            color: "#fff",
            border: "none",
            cursor: loading || !stream ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          }}
          aria-disabled={loading || !stream}
          aria-busy={loading}
        >
          {loading ? (
            <span aria-live="polite" aria-busy="true">
              <span className="spinner" style={{
                display: "inline-block",
                width: 18,
                height: 18,
                border: "2px solid #fff",
                borderTop: "2px solid #0055ff",
                borderRadius: "50%",
                marginRight: 8,
                animation: "spin 1s linear infinite"
              }} /> Analyse...
            </span>
          ) : (
            "Décrire la scène"
          )}
        </button>
      </section>
      {description && (
        <section
          style={{
            background: "#f5f5f5",
            padding: "1em",
            borderRadius: 8,
            marginTop: 18,
            fontSize: "1.1em",
            color: "#222",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
          aria-live="polite"
          tabIndex={0}
        >
          <b>Description IA :</b> {description}
        </section>
      )}
      {error && (
        <section
          style={{
            color: "#e00",
            marginTop: 18,
            background: "#fff0f0",
            borderRadius: 8,
            padding: "0.8em 1em",
            fontWeight: 500,
          }}
          role="alert"
          tabIndex={0}
        >
          {error}
        </section>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </main>
  );
};

export default CameraDescription;