import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

/**
 * Room
 * - Affiche une room sous forme de carte moderne et accessible
 * - Navigation vers la room au clic
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
        borderRadius: 14,
        boxShadow: "0 2px 12px #1976d222",
        padding: "1.2rem 1rem",
        margin: "0.7rem 0",
        textDecoration: "none",
        transition: "box-shadow 0.18s, transform 0.12s",
        minHeight: 120,
        cursor: "pointer"
      }}
      tabIndex={0}
      aria-label={`Entrer dans le salon ${data.name}`}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.currentTarget.click();
        }
      }}
    >
      <Button
        className="room-title"
        color="secondary"
        variant="contained"
        style={{
          fontWeight: 700,
          fontSize: "1.1rem",
          marginBottom: 8,
          borderRadius: 8,
          textTransform: "none",
          pointerEvents: "none"
        }}
        tabIndex={-1}
        aria-hidden="true"
        disableElevation
      >
        {data.name}
      </Button>
      <p className="room-description" style={{ color: "#1976d2", margin: 0, marginBottom: 8 }}>
        {data.description || "Aucune description"}
      </p>
      <span style={{ color: "#43a047", fontWeight: 500, fontSize: "1rem" }}>Rejoindre !</span>
    </Link>
  );
}

export default Room;