import React from "react";
import { Link } from "react-router-dom";
import { Button, Chip, Tooltip } from "@mui/material";

/**
 * Room – Achiri
 * Affiche une room sous forme de carte moderne, accessible, sécurisée, responsive, SEO friendly.
 * - Navigation vers la room au clic ou clavier.
 * - Affiche badges, nombre de membres, statut, description.
 * - Props : data { id, name, description, badges, members, status }
 * - Prêt pour extensions futures (modération, analytics, overlay, actions rapides…).
 */

function Room({ data }) {
  if (!data) return null;

  return (
    <Link
      className="room-box"
      to={`/chatroom/${data.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #1976d222",
        padding: "1.3rem 1.1rem",
        margin: "0.7rem 0",
        textDecoration: "none",
        transition: "box-shadow 0.18s, transform 0.12s",
        minHeight: 120,
        cursor: "pointer",
        outline: "none",
        position: "relative"
      }}
      tabIndex={0}
      aria-label={`Entrer dans le salon ${data.name}${data.status ? `, statut ${data.status}` : ""}`}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
      onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px #1976d288, 0 2px 16px #1976d222"}
      onBlur={e => e.currentTarget.style.boxShadow = "0 2px 16px #1976d222"}
      role="listitem"
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Button
          className="room-title"
          color="secondary"
          variant="contained"
          style={{
            fontWeight: 700,
            fontSize: "1.13rem",
            marginBottom: 8,
            borderRadius: 8,
            textTransform: "none",
            pointerEvents: "none",
            boxShadow: "0 1px 4px #1976d222",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
          tabIndex={-1}
          aria-hidden="true"
          disableElevation
        >
          {data.name}
        </Button>
        {Array.isArray(data.badges) && data.badges.length > 0 && (
          <div style={{ marginLeft: 8, display: "flex", gap: 4 }}>
            {data.badges.map((badge, i) => (
              <Tooltip key={i} title={badge} arrow>
                <Chip
                  label={badge}
                  color="primary"
                  size="small"
                  style={{
                    fontWeight: 600,
                    fontSize: "0.85em",
                    marginLeft: i > 0 ? 2 : 0,
                    background: "#e3f2fd",
                    color: "#1976d2"
                  }}
                  aria-label={`Badge ${badge}`}
                />
              </Tooltip>
            ))}
          </div>
        )}
      </div>
      <p
        className="room-description"
        style={{
          color: "#1976d2",
          margin: 0,
          marginBottom: 8,
          fontSize: "1.01rem",
          fontWeight: 500,
          maxWidth: 320,
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {data.description || "Aucune description"}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            color: "#43a047",
            fontWeight: 600,
            fontSize: "1.05rem",
            letterSpacing: "0.01em"
          }}
          aria-label="Rejoindre ce salon"
        >
          Rejoindre&nbsp;!
        </span>
        {Array.isArray(data.members) && (
          <span
            style={{
              color: "#1976d2",
              fontWeight: 500,
              fontSize: "0.98em",
              marginLeft: 6
            }}
            aria-label={`Nombre de membres : ${data.members.length}`}
          >
            👥 {data.members.length}
          </span>
        )}
        {data.status && (
          <Chip
            label={data.status === "open" ? "Ouvert" : data.status === "locked" ? "Privé" : data.status}
            color={data.status === "open" ? "success" : "warning"}
            size="small"
            style={{
              fontWeight: 600,
              fontSize: "0.85em",
              marginLeft: 6
            }}
            aria-label={`Statut : ${data.status}`}
          />
        )}
      </div>
    </Link>
  );
}

export default Room;

/**
 * Documentation :
 * - Carte salon moderne, accessible (clavier, aria), responsive, SEO ready.
 * - Props : data { id, name, description, badges, members, status }
 * - Sécurité : pas d'info sensible, navigation sécurisée.
 * - Design avancé, branding Achiri, mobile first.
 * - Prêt pour extensions futures (modération, analytics, overlay, actions rapides…).
 */