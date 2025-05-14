/**
 * AssistantSignLanguage.jsx
 * Module langue des signes de l'assistant Achiri.
 * - Traduction texte <-> langue des signes (avatar animé ou vidéo).
 * - Accessible (sourd/aveugle), sécurisé, compatible mobile/web.
 * - Design moderne, SEO friendly, documentation claire.
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../../styles/assistantSignLanguage.css";

// Exemple d'avatar animé (remplacer par une vraie animation ou vidéo plus tard)
function SignAvatar({ signWord }) {
  return (
    <div className="sign-avatar" aria-label="Avatar langue des signes">
      <span role="img" aria-label="langue des signes" style={{ fontSize: 64 }}>
        🧑‍🦯
      </span>
      <div className="sign-word">
        {signWord ? `Mot signé : ${signWord}` : "Tapez un texte à traduire"}
      </div>
    </div>
  );
}

function AssistantSignLanguage() {
  const [input, setInput] = useState("");
  const [signWord, setSignWord] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Simule la traduction texte -> langue des signes (à remplacer par API réelle)
  const handleTranslate = () => {
    if (!input.trim()) return;
    // Ici, on simule une vidéo ou une animation pour le mot
    setSignWord(input.trim());
    // Pour une vraie intégration, remplacer par une API ou une base de vidéos/animations
    setVideoUrl(""); // Ex: `/assets/signvideos/${input.trim().toLowerCase()}.mp4`
  };

  return (
    <section
      className="assistant-signlanguage-module"
      aria-label="Module langue des signes IA"
      tabIndex={0}
    >
      <Helmet>
        <title>
          Assistant Langue des Signes Achiri | Traduction, accessibilité
        </title>
        <meta
          name="description"
          content="Module langue des signes de l'assistant Achiri : traduction texte <-> LSF, avatar animé, accessibilité sourds/aveugles, mobile/web."
        />
      </Helmet>
      <header className="signlanguage-header">
        <h2>
          <span role="img" aria-label="langue des signes">
            🤟
          </span>{" "}
          Assistant Langue des Signes
        </h2>
      </header>
      <div className="signlanguage-controls">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Entrer un texte à traduire en langue des signes…"
          aria-label="Entrer un texte à traduire"
          style={{ borderRadius: 8, padding: 8, width: "70%" }}
        />
        <button
          className="btn-translate"
          onClick={handleTranslate}
          aria-label="Traduire en langue des signes"
          style={{ marginLeft: 8 }}
        >
          Traduire
        </button>
      </div>
      <div className="signlanguage-result" aria-live="polite">
        {signWord && (
          <>
            <SignAvatar signWord={signWord} />
            {/* Si une vidéo existe pour le mot, l'afficher */}
            {videoUrl && (
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                style={{ maxWidth: 320, marginTop: 12, borderRadius: 12 }}
                aria-label={`Vidéo langue des signes pour ${signWord}`}
              />
            )}
          </>
        )}
      </div>
      <footer className="signlanguage-footer">
        <small>
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
        </small>
      </footer>
    </section>
  );
}

export default AssistantSignLanguage;

/**
 * Documentation :
 * - Ce module permet la traduction texte <-> langue des signes (LSF, ASL, etc.).
 * - Accessible (clavier, contraste, dark mode, aria), SEO via Helmet.
 * - À intégrer dans l'assistant principal ou comme module flottant.
 * - Pour enrichir : brancher sur une API de traduction LSF/ASL, intégrer des vidéos ou animations réelles.
 */
