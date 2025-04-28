import React from "react";
import axios from "../../api/axios";
import Box from "@mui/material/Box";
import Room from "../Room/Room";

function Rooms(props) {
  const [rooms, setRooms] = React.useState([]);
  const ROOMS_URL = "/room";

  React.useEffect(() => {
    let isMounted = true;
    const fetchRooms = async () => {
      try {
        const response = await axios.get(ROOMS_URL);
        if (isMounted && Array.isArray(response.data) && response.data.length > 0) {
          setRooms(response.data);
        }
      } catch (error) {
        // Affichage d'une erreur utilisateur possible ici
        console.error("Erreur lors du chargement des salons :", error);
      }
    };
    fetchRooms();
    return () => { isMounted = false; };
  }, []);

  return (
    <div>
      <Box
        className="rooms-list"
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr"
          },
          width: "100%",
          margin: "0 auto",
          padding: "0 8px"
        }}
        aria-label="Liste des salons disponibles"
        role="list"
      >
        {rooms.length > 0 ? (
          rooms.map((v) => (
            <Room key={v.id} data={v} />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#888",
              padding: "2em 0",
              fontSize: "1.1rem"
            }}
            aria-live="polite"
          >
            Aucun salon disponible pour le moment.
          </div>
        )}
      </Box>
    </div>
  );
}

export default Rooms;