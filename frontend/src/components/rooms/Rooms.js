import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";

import axios from "../../api/axios";

import Room from "./Room.js";

/**
 * Rooms – Achiri
 * Liste tous les salons/classes virtuelles disponibles.
 * - Design avancé, accessibilité, sécurité, responsive, SEO friendly.
 * - Affichage dynamique, gestion erreurs, notifications, UX optimisée.
 * - Prêt pour extensions futures (filtrage, recherche, badges, analytics, modération…).
 */

function Rooms() {
  const [rooms, setRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const ROOMS_URL = "/room";

  React.useEffect(() => {
    let isMounted = true;
    const fetchRooms = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(ROOMS_URL);
        if (isMounted) {
          if (Array.isArray(response.data)) {
            setRooms(response.data);
          } else {
            setRooms([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("Erreur lors du chargement des salons. Veuillez réessayer.");
        }
        console.error("Erreur lors du chargement des salons :", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRooms();
    return () => {
      isMounted = false;
    };
  }, []);

  // Accessibilité : focus automatique sur le titre à l'arrivée
  const titleRef = React.useRef();
  React.useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  return (
    <main>
      <Helmet>
        <title>Salons disponibles | Achiri</title>
        <meta
          name="description"
          content="Liste des salons vidéo Achiri : accès rapide, design avancé, accessibilité, sécurité, mobile/web, SEO optimisé."
        />
      </Helmet>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#1976d2",
          mb: 2,
          mt: 1,
          textAlign: "center",
          letterSpacing: "0.01em",
        }}
        tabIndex={0}
        aria-label="Titre de la liste des salons"
        ref={titleRef}
      >
        Salons disponibles
      </Typography>
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
            lg: "1fr 1fr 1fr 1fr",
          },
          width: "100%",
          margin: "0 auto",
          padding: { xs: "0 2px", sm: "0 8px" },
        }}
        aria-label="Liste des salons disponibles"
        role="list"
      >
        {loading ? (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "3em 0",
            }}
            aria-live="polite"
          >
            <CircularProgress
              color="primary"
              size={40}
              aria-label="Chargement des salons"
            />
            <Typography variant="body1" sx={{ color: "#1976d2", mt: 2 }}>
              Chargement des salons...
            </Typography>
          </div>
        ) : error ? (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#b71c1c",
              padding: "2em 0",
              fontSize: "1.1rem",
            }}
            aria-live="assertive"
            role="alert"
          >
            {error}
          </div>
        ) : rooms.length > 0 ? (
          rooms.map((v) => <Room key={v.id} data={v} />)
        ) : (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#888",
              padding: "2em 0",
              fontSize: "1.1rem",
            }}
            aria-live="polite"
          >
            Aucun salon disponible pour le moment.
          </div>
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "#888",
          mt: 3,
          textAlign: "center",
          fontSize: "0.98em",
        }}
        tabIndex={0}
        aria-label="Description accessibilité et sécurité"
      >
        Tous les salons Achiri sont sécurisés, accessibles et compatibles
        mobile/web.
        <br />
        Design avancé, navigation clavier, SEO optimisé.
      </Typography>
    </main>
  );
}

export default Rooms;

/**
 * Documentation :
 * - Affiche la liste des salons/classes virtuelles disponibles.
 * - UX avancée : loading, erreurs, responsive, accessibilité (aria, focus, live).
 * - SEO via Helmet, design moderne, sécurité (pas de fuite d'info), mobile first.
 * - Prêt pour extensions futures (filtrage, recherche, badges, analytics, modération…).
 */
