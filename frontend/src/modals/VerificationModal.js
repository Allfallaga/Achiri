import React from 'react';

/**
 * VerificationModal – Achiri
 * Modal de vérification de propriété d'un réseau social.
 * - Accessibilité avancée (focus, clavier, ARIA)
 * - Sécurité (aucune donnée sensible, liens sécurisés)
 * - Compatible mobile/web, design moderne, feedback utilisateur
 * - Prêt pour extensions (OAuth, badges, notifications, partage, etc)
 *
 * Props :
 *   - open : bool (afficher ou non le modal)
 *   - onClose : fonction pour fermer le modal
 *   - platform : nom du réseau (ex: "Instagram")
 *   - code : code unique à placer dans la bio ou à publier
 *   - method : "bio" | "post" | "oauth"
 *   - onValidate : fonction appelée quand l'utilisateur clique sur "J'ai terminé" ou OAuth
 */

function VerificationModal({ open, onClose, platform, code, method = "bio", onValidate }) {
  if (!open) return null;

  // Focus sur le bouton principal à l'ouverture
  const mainBtnRef = React.useRef();
  React.useEffect(() => {
    if (open && mainBtnRef.current) {
      mainBtnRef.current.focus();
    }
  }, [open]);

  // Fermer avec la touche Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  // Empêche le scroll du body quand le modal est ouvert (UX mobile/web)
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  let instructions = "";
  if (method === "bio") {
    instructions = `Ajoute le code ci-dessous dans la bio ou la description de ton profil ${platform}, puis clique sur "J'ai terminé".`;
  } else if (method === "post") {
    instructions = `Publie temporairement le code ci-dessous sur ton profil ${platform} (en post ou story), puis clique sur "J'ai terminé".`;
  } else if (method === "oauth") {
    instructions = `Connecte-toi à ${platform} via le bouton ci-dessous pour vérifier automatiquement la propriété.`;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-modal-title"
      aria-describedby="verification-modal-desc"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "#0008",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      tabIndex={-1}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 32px #1976d244",
          padding: "2.2rem 2.5rem",
          minWidth: 340,
          maxWidth: "90vw",
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "#ffcdd2",
            color: "#b71c1c",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer"
          }}
          aria-label="Fermer la fenêtre de vérification"
        >✕</button>
        <h2 id="verification-modal-title" style={{ color: "#1976d2", marginBottom: 18, textAlign: "center" }}>
          Vérification {platform}
        </h2>
        <p id="verification-modal-desc" style={{ fontSize: 16, marginBottom: 18, color: "#222" }}>
          {instructions}
        </p>
        {method !== "oauth" && (
          <div style={{
            background: "#f5f7fa",
            border: "1.5px dashed #1976d2",
            borderRadius: 10,
            padding: "1em",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: 1.5,
            color: "#1976d2",
            marginBottom: 20,
            userSelect: "all"
          }}>
            {code}
          </div>
        )}
        {method === "oauth" && (
          <button
            ref={mainBtnRef}
            style={{
              background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7em 1.5em",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              marginBottom: 18
            }}
            onClick={onValidate}
            aria-label={`Se connecter à ${platform}`}
          >
            Se connecter à {platform}
          </button>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            ref={method !== "oauth" ? mainBtnRef : undefined}
            onClick={onValidate}
            style={{
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.5em 1.5em",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              marginRight: 10
            }}
            aria-label="J'ai terminé"
          >
            J'ai terminé
          </button>
          <button
            onClick={onClose}
            style={{
              background: "#e0e0e0",
              color: "#222",
              border: "none",
              borderRadius: 8,
              padding: "0.5em 1.2em",
              fontWeight: "bold",
              fontSize: 15,
              cursor: "pointer"
            }}
            aria-label="Annuler"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationModal;

/**
 * Documentation :
 * - Props : open, onClose, platform, code, method ("bio" | "post" | "oauth"), onValidate
 * - Accessibilité : focus, ARIA, clavier, feedback visuel
 * - Sécurité : aucun tracking, liens sécurisés, pas d’info sensible
 * - Extensible : badges, animations, notifications, partage, OAuth, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */