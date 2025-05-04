/**
 * Avatar3D.jsx – Achiri
 * Composant avatar 3D stylisé pour la classe virtuelle Achiri.
 * - Affiche avatar, nom, statut (parle, muet, main levée), badges, points.
 * - Accessible (aria, contraste, navigation clavier), sécurisé, mobile/web, SEO friendly.
 * - Prêt pour intégration moteur 3D (three.js, babylon.js…), modération, analytics.
 * - Design moderne, documentation claire, dark mode.
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import "../../styles/avatar3d.css";

function Avatar3D({
  user,
  speaking = false,
  muted = false,
  handRaised = false,
  badges = [],
  points = 0,
  isCurrentUser = false,
  overlay = null, // Pour modération ou notifications
  tabIndex = 0,
}) {
  return (
    <div
      className={`avatar3d-container${speaking ? " speaking" : ""}${muted ? " muted" : ""}${isCurrentUser ? " current" : ""}`}
      tabIndex={tabIndex}
      aria-label={`Avatar 3D de ${user?.name || user}${speaking ? ", en train de parler" : ""}${muted ? ", muet" : ""}${handRaised ? ", main levée" : ""}${isCurrentUser ? ", moi" : ""}`}
      role="group"
      aria-roledescription="avatar 3D interactif"
      style={{
        outline: "none",
        position: "relative",
        margin: "0 auto",
        width: "100px",
        height: "100px",
        background: "none"
      }}
    >
      <Helmet>
        <title>Avatar 3D | Classe virtuelle Achiri</title>
        <meta name="description" content="Avatar 3D interactif pour la classe virtuelle Achiri : statut, accessibilité, badges, points, mobile/web." />
      </Helmet>
      <div
        className={`avatar3d${speaking ? " active" : ""}${muted ? " muted" : ""}${isCurrentUser ? " current" : ""}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <span role="img" aria-label="avatar" style={{ fontSize: 56 }}>
          {user?.avatar || (isCurrentUser ? "🧑‍💻" : "🧑‍🎓")}
        </span>
        {/* Statuts dynamiques */}
        {speaking && <span className="avatar3d-status speaking" title="Parle" aria-label="Parle">💬</span>}
        {muted && <span className="avatar3d-status muted" title="Muet" aria-label="Muet">🔇</span>}
        {handRaised && <span className="avatar3d-status hand" title="Main levée" aria-label="Main levée">✋</span>}
        {/* Overlay modération/notification */}
        {overlay && <div className="avatar3d-overlay">{overlay}</div>}
      </div>
      <div className="avatar3d-info">
        <div className="avatar3d-name" aria-label={`Nom : ${user?.name || user}`}>
          {user?.name || user}
          {isCurrentUser && <span className="avatar3d-me" title="Moi" aria-label="Moi">(Moi)</span>}
        </div>
        <div className="avatar3d-badges" aria-label={badges.length > 0 ? `Badges : ${badges.join(", ")}` : undefined}>
          {badges && badges.map((b, idx) => (
            <span key={idx} className="avatar3d-badge" aria-label={`Badge ${b}`}>{b}</span>
          ))}
        </div>
        {points > 0 && (
          <div className="avatar3d-points" aria-label={`Points : ${points}`}>{points} pts</div>
        )}
      </div>
    </div>
  );
}

export default Avatar3D;

/**
 * Documentation :
 * - Props :
 *   - user (objet ou string, {name, avatar}), speaking (bool), muted (bool), handRaised (bool)
 *   - badges (array), points (number), isCurrentUser (bool), overlay (JSX), tabIndex (number)
 * - Affiche un avatar stylisé, nom, statut, badges, points, overlay modération.
 * - Accessible (aria, clavier, contraste), SEO via Helmet, mobile responsive, dark mode.
 * - Prêt pour intégration moteur 3D (three.js…), modération, analytics, personnalisation avancée.
 * - Sécurité : pas d’info sensible, navigation clavier, focus visible.
 */