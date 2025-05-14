import React, { useState, useRef } from "react";

/**
 * UploadFile – Achiri
 * Uploader de fichiers avancé : images, sons, validation, feedback, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO, branding Achiri.
 * - Fonctionnalités : validation type/taille, feedback, preview, upload mock, dark mode ready, drag&drop, suppression, focus visible.
 * - Prêt pour extensions futures (badges, analytics, favoris, overlay, IA, etc).
 */

export default function UploadFile() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef();

  // Validation type/taille (ex: max 10Mo, images/sons uniquement)
  const validateFiles = (files) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
    ];
    const maxSize = 10 * 1024 * 1024; // 10 Mo
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        return `Type de fichier non autorisé: ${file.name}`;
      }
      if (file.size > maxSize) {
        return `Fichier trop volumineux: ${file.name}`;
      }
    }
    return null;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validationError = validateFiles(files);
    if (validationError) {
      setError(validationError);
      setSelectedFiles([]);
    } else {
      setError("");
      setSelectedFiles(files);
    }
  };

  // Drag & Drop support
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const validationError = validateFiles(files);
    if (validationError) {
      setError(validationError);
      setSelectedFiles([]);
    } else {
      setError("");
      setSelectedFiles(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Simulation d'upload (aucun appel réseau)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return setError("Aucun fichier sélectionné.");
    setUploading(true);
    setError("");
    setSuccess("");
    setTimeout(() => {
      setSuccess("Upload réussi !");
      setUploadedFiles([...uploadedFiles, ...selectedFiles.map((f) => f.name)]);
      setSelectedFiles([]);
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }, 1000);
  };

  // Suppression d'un fichier uploadé (mock)
  const handleRemoveUploaded = (fileName) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== fileName));
  };

  // Suppression d'un fichier sélectionné avant upload
  const handleRemoveSelected = (fileName) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== fileName));
    if (selectedFiles.length === 1 && inputRef.current)
      inputRef.current.value = "";
  };

  return (
    <section
      className="achiri-uploadfile"
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3e3e3",
        borderRadius: 12,
        maxWidth: 420,
        background: "#fafcff",
        outline: "none",
        boxShadow: "0 2px 12px #1976d222",
      }}
      aria-label="Uploader des fichiers"
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.2em",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span role="img" aria-label="Upload">
          📤
        </span>
        &nbsp;Uploader des fichiers (images, sons)
      </h2>
      <form onSubmit={handleUpload} style={{ marginBottom: 18 }}>
        <label
          htmlFor="file-upload"
          style={{
            fontWeight: 500,
            color: "#1976d2",
            display: "block",
            marginBottom: 6,
          }}
        >
          Sélectionner ou glisser-déposer des fichiers :
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*,audio/*"
          onChange={handleFileChange}
          disabled={uploading}
          aria-label="Sélectionner des fichiers à uploader"
          ref={inputRef}
          style={{
            marginBottom: 12,
            borderRadius: 8,
            border: "1px solid #bbdefb",
            padding: "0.5em",
          }}
        />
        {selectedFiles.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 10 }}>
            {selectedFiles.map((file, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 14 }}>{file.name}</span>
                <button
                  type="button"
                  aria-label={`Retirer ${file.name}`}
                  onClick={() => handleRemoveSelected(file.name)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#e53935",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                  tabIndex={0}
                  title="Retirer ce fichier"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          disabled={uploading || !selectedFiles.length}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 2em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor:
              uploading || !selectedFiles.length ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          aria-label="Uploader les fichiers sélectionnés"
        >
          {uploading ? "Envoi..." : "Uploader"}
        </button>
      </form>
      {error && (
        <div style={{ color: "red", marginTop: 8 }} role="alert">
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "green", marginTop: 8 }} aria-live="polite">
          {success}
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4 style={{ color: "#1976d2", marginBottom: 8 }}>
            Fichiers uploadés :
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {uploadedFiles.map((file, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {file.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <span>
                    <img
                      src={`https://dummyimage.com/120x80/cccccc/000000&text=${encodeURIComponent(file)}`}
                      alt={file}
                      style={{
                        maxWidth: 120,
                        maxHeight: 80,
                        borderRadius: 6,
                        marginBottom: 4,
                      }}
                    />
                    <br />
                    <span style={{ fontSize: 14 }}>{file}</span>
                  </span>
                ) : file.match(/\.(mp3|wav|mpeg)$/i) ? (
                  <span>
                    <audio controls style={{ maxWidth: 200, marginBottom: 4 }}>
                      <source src={`dummy/${file}`} />
                      {file}
                    </audio>
                    <br />
                    <span style={{ fontSize: 14 }}>{file}</span>
                  </span>
                ) : (
                  <span style={{ fontSize: 14 }}>{file}</span>
                )}
                <button
                  type="button"
                  aria-label={`Supprimer ${file}`}
                  onClick={() => handleRemoveUploaded(file)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#e53935",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                  tabIndex={0}
                  title="Supprimer ce fichier"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
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
        <br />
        <span style={{ fontSize: "0.93em" }}>
          Drag & drop, feedback visuel, design avancé, branding Achiri.
        </span>
      </div>
      <style>{`
        .achiri-uploadfile:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 600px) {
          .achiri-uploadfile {
            padding: 1rem !important;
            border-radius: 8px !important;
            font-size: 0.97em;
          }
        }
        @media (prefers-color-scheme: dark) {
          .achiri-uploadfile {
            background: #181f2a !important;
            color: #e3f2fd !important;
            border: 1px solid #223366 !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Documentation :
 * - UploadFile : validation type/taille, feedback, preview, upload mock, drag&drop, suppression, dark mode ready.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, focus visible.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier, upload mock.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (badges, overlay, IA…).
 */
