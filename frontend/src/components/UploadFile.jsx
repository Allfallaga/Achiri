import React, { useState } from "react";

export default function UploadFile() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validation type/taille (ex: max 10Mo, images/sons uniquement)
  const validateFiles = (files) => {
    const allowedTypes = [
      "image/jpeg", "image/png", "image/gif", "audio/mpeg", "audio/mp3", "audio/wav"
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

  // Simulation d'upload (aucun appel réseau)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return setError("Aucun fichier sélectionné.");
    setUploading(true);
    setError("");
    setSuccess("");
    setTimeout(() => {
      // Simule le succès de l'upload
      setSuccess("Upload réussi !");
      setUploadedFiles(selectedFiles.map(f => f.name));
      setSelectedFiles([]);
      setUploading(false);
    }, 1000);
  };

  return (
    <section
      style={{
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #e3e3e3",
        borderRadius: 12,
        maxWidth: 420,
        background: "#fafcff",
        outline: "none"
      }}
      aria-label="Uploader des fichiers"
      tabIndex={0}
    >
      <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.2em", marginBottom: 14 }}>
        📤 Uploader des fichiers (images, sons)
      </h2>
      <form onSubmit={handleUpload} style={{ marginBottom: 18 }}>
        <input
          type="file"
          multiple
          accept="image/*,audio/*"
          onChange={handleFileChange}
          disabled={uploading}
          aria-label="Sélectionner des fichiers à uploader"
          style={{
            marginBottom: 12,
            borderRadius: 8,
            border: "1px solid #bbdefb",
            padding: "0.5em"
          }}
        />
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
            cursor: uploading || !selectedFiles.length ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
          aria-label="Uploader les fichiers sélectionnés"
        >
          {uploading ? "Envoi..." : "Uploader"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }} role="alert">{error}</div>}
      {success && <div style={{ color: "green", marginTop: 8 }} aria-live="polite">{success}</div>}
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4 style={{ color: "#1976d2", marginBottom: 8 }}>Fichiers uploadés :</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {uploadedFiles.map((file, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>
                {file.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <span>
                    <img
                      src={`https://dummyimage.com/120x80/cccccc/000000&text=${encodeURIComponent(file)}`}
                      alt={file}
                      style={{ maxWidth: 120, maxHeight: 80, borderRadius: 6, marginBottom: 4 }}
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}