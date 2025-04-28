import React, { useEffect, useState } from 'react';

/**
 * Rooms
 * Affiche la liste des salles disponibles.
 * Modernisé, accessible, prêt pour intégration API.
 */
function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement des rooms (mock)
    setTimeout(() => {
      setRooms([
        { id: 1, name: "Salle 1", description: "Discussion générale" },
        { id: 2, name: "Salle 2", description: "Support technique" },
        { id: 3, name: "Salle 3", description: "Projets IA" },
        { id: 4, name: "Salle 4", description: "Détente" },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <main
      className="rooms-list"
      aria-label="Liste des salles"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 24,
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "60vh",
        padding: "2em 1em"
      }}
      tabIndex={0}
    >
      {loading ? (
        <div style={{ color: "#1976d2", fontWeight: 600, fontSize: "1.2em" }}>
          Chargement des salles...
        </div>
      ) : rooms.length === 0 ? (
        <div style={{ color: "#888", fontStyle: "italic" }}>
          Aucune salle disponible.
        </div>
      ) : (
        rooms.map((room) => (
          <section
            key={room.id}
            className="room-card"
            style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 16px #1976d222",
              padding: "1.5em 1.2em",
              minWidth: 240,
              maxWidth: 320,
              flex: "1 1 260px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              transition: "box-shadow 0.2s",
              cursor: "pointer"
            }}
            tabIndex={0}
            aria-label={`Salle ${room.name} : ${room.description}`}
            onClick={() => window.location.href = `/rooms/${room.id}`}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                window.location.href = `/rooms/${room.id}`;
              }
            }}
          >
            <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: "1.15em", marginBottom: 8 }}>
              {room.name}
            </h2>
            <p style={{ color: "#444", fontSize: "1em", marginBottom: 0 }}>
              {room.description}
            </p>
            <button
              style={{
                marginTop: 18,
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.5em 1.2em",
                fontWeight: 600,
                fontSize: "1em",
                cursor: "pointer",
                alignSelf: "flex-end",
                transition: "background 0.2s"
              }}
              aria-label={`Entrer dans la salle ${room.name}`}
              onClick={e => {
                e.stopPropagation();
                window.location.href = `/rooms/${room.id}`;
              }}
              onKeyDown={e => e.stopPropagation()}
            >
              Rejoindre
            </button>
          </section>
        ))
      )}
    </main>
  );
}

export default Rooms;