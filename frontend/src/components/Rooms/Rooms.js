import React from 'react';
import Box from '@mui/material/Box';
import Room from '../Room/Room';

/**
 * Rooms - Liste des salles, moderne, responsive, accessible.
 * Utilise le composant Room pour chaque salle.
 */
function Rooms(props) {
  const [rooms, setRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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
      aria-label="Liste des salles"
      tabIndex={0}
      style={{
        minHeight: "60vh",
        padding: "2em 1em",
        background: "#f8fafc"
      }}
    >
      {loading ? (
        <div style={{ color: "#1976d2", fontWeight: 600, fontSize: "1.2em", textAlign: "center" }}>
          Chargement des salles...
        </div>
      ) : rooms.length === 0 ? (
        <div style={{ color: "#888", fontStyle: "italic", textAlign: "center" }}>
          Aucune salle disponible.
        </div>
      ) : (
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 2,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {rooms.map((v) => (
            <Room key={v.id} data={v} />
          ))}
        </Box>
      )}
    </main>
  );
}

export default Rooms;