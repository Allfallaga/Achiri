import React from "react";

import Member from "../moderation/Member.js";

/**
 * Moderation – Achiri
 * Liste des membres connectés avec actions de modération : mute, vidéo off, éjection.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly.
 * - Props : members (array), onMute, onVideoOff, onEject (callbacks)
 */

function Moderation({ members = [], onMute, onVideoOff, onEject }) {
  const onlineMembers = members.filter((mbr) => mbr.loggedIn);

  return (
    <aside
      className="moderation-area"
      style={{
        minWidth: 220,
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px #1976d222",
        padding: "1.2rem 0.7rem",
        margin: "0.7rem 0",
        maxHeight: "70vh",
        overflowY: "auto",
        outline: "none",
      }}
      aria-label="Liste des membres connectés"
      tabIndex={0}
    >
      <header
        style={{
          fontWeight: 700,
          color: "#1976d2",
          fontSize: "1.13em",
          marginBottom: 10,
          textAlign: "center",
          letterSpacing: "0.01em",
        }}
        tabIndex={0}
        aria-label="Membres en ligne"
      >
        👥 Membres en ligne
      </header>
      <ul
        className="list-group"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
        aria-live="polite"
        aria-label="Membres en ligne"
      >
        {onlineMembers.map((mbr) => (
          <Member
            key={mbr.id || mbr.nickname}
            member={mbr}
            onMute={onMute}
            onVideoOff={onVideoOff}
            onEject={onEject}
          />
        ))}
        {onlineMembers.length === 0 && (
          <li
            style={{ color: "#888", textAlign: "center", padding: "1em" }}
            aria-live="polite"
            tabIndex={0}
          >
            Aucun membre en ligne
          </li>
        )}
      </ul>
      <footer
        style={{
          marginTop: 12,
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
      </footer>
    </aside>
  );
}

export default Moderation;

/**
 * Documentation :
 * - Liste des membres connectés, actions de modération (mute, vidéo off, éjecter).
 * - Accessibilité : navigation clavier, aria-labels, responsive.
 * - Sécurité : pas d’info sensible, actions protégées par droits.
 * - Design avancé, branding Achiri, mobile first, SEO ready.
 */
