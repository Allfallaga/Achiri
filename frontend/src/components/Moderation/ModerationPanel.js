import React, { useEffect, useState } from 'react';
import Moderation from './Moderation';

/**
 * ModerationPanel
 * Panneau principal de modération, moderne et accessible.
 * Récupère la liste des membres (mock ou via props).
 */
const mockMembers = [
  { nickname: 'Alice', loggedIn: true, role: 'user' },
  { nickname: 'Bob', loggedIn: true, role: 'moderator' },
  { nickname: 'Charlie', loggedIn: false, role: 'user' },
];

function ModerationPanel(props) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // À remplacer par un appel API ou contexte global selon l'app
    setMembers(props.members && props.members.length > 0 ? props.members : mockMembers);
  }, [props.members]);

  return (
    <section
      className="moderation-panel"
      aria-label="Panneau de modération"
      tabIndex={0}
      style={{
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
        background: "transparent"
      }}
    >
      <Moderation members={members} />
    </section>
  );
}

export default ModerationPanel;