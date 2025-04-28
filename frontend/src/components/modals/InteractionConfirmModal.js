import React from 'react';

/**
 * InteractionConfirmModal
 * Affiche une confirmation après une interaction sociale (like, follow, etc.).
 * Props :
 *   - open : bool (afficher ou non le modal)
 *   - onClose : fonction pour fermer le modal
 *   - platform : nom du réseau (ex: "Instagram")
 *   - action : type d'interaction ("like", "comment", "follow", etc.)
 *   - points : nombre de points gagnés
 *   - link : lien vers le contenu (pour refaire l'action si besoin)
 */
const actionLabels = {
  like: "Like",
  comment: "Commentaire",
  follow: "Abonnement",
  share: "Partage",
  view: "Vue",
  default: "Interaction"
};

function InteractionConfirmModal({ open, onClose, platform, action = "default", points = 0, link }) {
  if (!open) return null;

  // Gestion accessibilité : focus sur le bouton "Continuer" à l'ouverture
  const continueBtnRef = React.useRef();
  React.useEffect(() => {
    if (open && continueBtnRef.current) {
      continueBtnRef.current.focus();
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="interaction-modal-title"
      aria-describedby="interaction-modal-desc"
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
          minWidth: 320,
          maxWidth: "90vw",
          position: "relative",
          textAlign: "center"
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
          aria-label="Fermer la fenêtre de confirmation"
        >✕</button>
        <h2 id="interaction-modal-title" style={{ color: "#1976d2", marginBottom: 18 }}>
          {actionLabels[action] || actionLabels.default} confirmé(e) !
        </h2>
        <div style={{
          fontSize: 48,
          marginBottom: 12
        }}>
          🎉
        </div>
        <p id="interaction-modal-desc" style={{ fontSize: 17, color: "#222", marginBottom: 18 }}>
          Bravo, tu as gagné <span style={{ color: "#43a047", fontWeight: "bold" }}>+{points} points</span> pour ton action sur <b>{platform}</b> !
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#1976d2",
              color: "#fff",
              borderRadius: 8,
              padding: "0.5em 1.2em",
              fontWeight: "bold",
              fontSize: 15,
              textDecoration: "none",
              marginBottom: 18
            }}
            aria-label="Revoir le contenu sur la plateforme"
          >
            Revoir le contenu
          </a>
        )}
        <div>
          <button
            ref={continueBtnRef}
            onClick={onClose}
            style={{
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.6em 1.5em",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              marginTop: 10
            }}
            aria-label="Continuer"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}

export default InteractionConfirmModal;