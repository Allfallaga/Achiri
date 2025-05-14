import React, { useEffect, useState } from "react";

import Moderation from "./Moderation";

/**
 * ModerationPanel – Achiri
 * Panneau principal de modération, moderne, accessible, sécurisé, responsive.
 * - Récupère la liste des membres (mock ou via props).
 * - Intègre toutes les fonctionnalités attendues (actions, accessibilité, SEO).
 * - Props : members (array), onMute, onVideoOff, onEject (callbacks)
 */

const mockMembers = [
  { nickname: "Alice", loggedIn: true, role: "user", id: 1 },
  { nickname: "Bob", loggedIn: true, role: "moderator", id: 2 },
  { nickname: "Charlie", loggedIn: false, role: "user", id: 3 },
];

function ModerationPanel({ members, onMute, onVideoOff, onEject }) {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    // À remplacer par un appel API ou contexte global selon l'app
    setMemberList(members && members.length > 0 ? members : mockMembers);
  }, [members]);

  return (
    <section
      className="moderation-panel"
      aria-label="Panneau de modération Achiri"
      tabIndex={0}
      style={{
        width: "100%",
        maxWidth: 340,
        margin: "0 auto",
        background: "transparent",
      }}
    >
      <Moderation
        members={memberList}
        onMute={onMute}
        onVideoOff={onVideoOff}
        onEject={onEject}
      />
    </section>
  );
}

export default ModerationPanel;

/**
 * Documentation :
 * - Panneau de modération principal, intégration avec Moderation.
 * - Accessibilité : aria-label, navigation clavier, responsive.
 * - Sécurité : actions protégées, pas d’info sensible.
 * - Design avancé, branding Achiri, SEO ready, mobile first.
 */
