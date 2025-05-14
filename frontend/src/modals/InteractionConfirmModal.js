import React from "react";

/**
 * InteractionConfirmModal – Achiri
 * Modal de confirmation après une interaction sociale (like, follow, etc).
 * - Accessibilité avancée (focus, clavier, ARIA)
 * - Sécurité (aucune donnée sensible, liens sécurisés)
 * - Compatible mobile/web, design moderne, feedback utilisateur
 * - Prêt pour extensions (partage, badges, animations, notifications, etc)
 *
 * Props :
 *   - open : bool (afficher ou non le modal)
 *   - onClose : fonction pour fermer le modal
 *   - platform : nom du réseau (ex: "Instagram")
 *   - action : type d'interaction ("like", "comment", "follow", etc.)
 *   - points : nombre de points gagnés
 *   - link : lien vers le contenu (pour refaire l'action si besoin)
 *   - badge : (optionnel) badge ou récompense obtenue
 */

const actionLabels = {
  like: "Like",
  comment: "Commentaire",
  follow: "Abonnement",
  share: "Partage",
  view: "Vue",
  default: "Interaction",
};

function InteractionConfirmModal({
  open,
  onClose,
  platform,
  action = "default",
  points = 0,
  link,
  badge,
}) {
  // --- Hooks déplacés au niveau supérieur ---
  const continueBtnRef = React.useRef();

  // Accessibilité : focus sur le bouton "Continuer" à l'ouverture
  React.useEffect(() => {
    // La logique ne s'exécute que si 'open' est vrai
    if (open && continueBtnRef.current) {
      continueBtnRef.current.focus();
    }
  }, [open]); // Dépend de 'open'

  // Fermer avec la touche Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    // L'écouteur n'est ajouté que si 'open' est vrai
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      // La fonction de nettoyage est retournée pour supprimer l'écouteur
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
    // Si 'open' est faux, rien ne se passe et aucun nettoyage n'est nécessaire pour cet effet
  }, [open, onClose]); // Dépend de 'open' et 'onClose'

  // Empêche le scroll du body quand le modal est ouvert (UX mobile/web)
  React.useEffect(() => {
    // La modification du style ne se fait que si 'open' est vrai
    if (open) {
      document.body.style.overflow = "hidden";
      // La fonction de nettoyage est retournée pour restaurer le style
      return () => {
        document.body.style.overflow = "";
      };
    }
    // Si 'open' est faux, rien ne se passe et aucun nettoyage n'est nécessaire pour cet effet
  }, [open]); // Dépend de 'open'
  // --- Fin des Hooks ---

  // Retour précoce si le modal n'est pas ouvert
  if (!open) return null;

  // Le reste du rendu du composant
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="interaction-modal-title"
      aria-describedby="interaction-modal-desc"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          textAlign: "center",
          outline: "none",
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
            cursor: "pointer",
          }}
          aria-label="Fermer la fenêtre de confirmation"
        >
          ✕
        </button>
        <h2
          id="interaction-modal-title"
          style={{ color: "#1976d2", marginBottom: 18 }}
        >
          {actionLabels[action] || actionLabels.default} confirmé(e) !
        </h2>
        <div
          style={{
            fontSize: 48,
            marginBottom: 12,
          }}
        >
          🎉
        </div>
        <p
          id="interaction-modal-desc"
          style={{ fontSize: 17, color: "#222", marginBottom: 18 }}
        >
          Bravo, tu as gagné{" "}
          <span style={{ color: "#43a047", fontWeight: "bold" }}>
            +{points} points
          </span>{" "}
          pour ton action sur <b>{platform}</b> !
        </p>
        {badge && (
          <div
            style={{
              marginBottom: 16,
              fontSize: 15,
              color: "#8E24AA",
              fontWeight: "bold",
            }}
          >
            🏅 Nouveau badge débloqué :{" "}
            <span style={{ color: "#1976d2" }}>{badge}</span>
          </div>
        )}
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
              marginBottom: 18,
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
              marginTop: 10,
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

/**
 * Documentation :
 * - Props : open, onClose, platform, action, points, link, badge (optionnel)
 * - Accessibilité : focus, ARIA, clavier, feedback visuel
 * - Sécurité : aucun tracking, liens sécurisés, pas d’info sensible
 * - Extensible : badges, animations, notifications, partage, etc.
 * - Compatible mobile/web, design responsive, SEO friendly (indirect)
 */
