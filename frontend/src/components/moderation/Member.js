import React from "react";
import PropTypes from "prop-types";
// Importe les composants UI nécessaires (ex: Material UI, ou tes composants custom)
// import { Avatar, Box, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// Importe les styles spécifiques si nécessaire
// import './Member.scss'; // Ou .css

/**
 * Affiche un membre individuel dans un contexte de modération.
 * Permet d'effectuer des actions de modération sur ce membre.
 */
const Member = ({
  member,
  onKick,
  onBan,
  onMute,
  onWarn /*, autres callbacks ... */,
}) => {
  // State pour gérer l'ouverture d'un menu d'actions, si besoin
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // Fonctions pour déclencher les callbacks de modération
  const handleKick = () => {
    // handleMenuClose(); // Ferme le menu si utilisé
    if (onKick) {
      onKick(member.id); // Appelle le callback parent avec l'ID du membre
    }
  };

  const handleBan = () => {
    // handleMenuClose();
    if (onBan) {
      onBan(member.id);
    }
  };

  const handleMute = () => {
    // handleMenuClose();
    if (onMute) {
      onMute(member.id); // Peut nécessiter une durée ou un état toggle
    }
  };

  const handleWarn = () => {
    // handleMenuClose();
    if (onWarn) {
      onWarn(member.id); // Peut nécessiter un motif
    }
  };

  if (!member) {
    return null; // Ne rien afficher si les données du membre sont absentes
  }

  return (
    // Utilise ici tes composants UI (Box, div, etc.) et styles
    // Exemple simple avec des div et des boutons:
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Affiche l'avatar */}
        {/* <Avatar src={member.avatarUrl} alt={member.name} sx={{ mr: 2 }} /> */}
        <span style={{ marginRight: "16px" }}>
          {member.avatarUrl ? "👤" : "❓"}
        </span>{" "}
        {/* Placeholder simple */}
        {/* Affiche le nom et potentiellement le rôle ou statut */}
        <div>
          {/* <Typography variant="body1">{member.name}</Typography> */}
          <p style={{ margin: 0 }}>{member.name || "Unknown User"}</p>
          {/* {member.role && <Typography variant="caption" color="text.secondary">{member.role}</Typography>} */}
        </div>
      </div>

      {/* Actions de modération */}
      <div>
        {/* Option 1: Boutons directs (si peu d'actions) */}
        {onWarn && (
          <button onClick={handleWarn} aria-label={`Warn ${member.name}`}>
            Warn
          </button>
        )}
        {onMute && (
          <button onClick={handleMute} aria-label={`Mute ${member.name}`}>
            Mute
          </button>
        )}
        {onKick && (
          <button onClick={handleKick} aria-label={`Kick ${member.name}`}>
            Kick
          </button>
        )}
        {onBan && (
          <button onClick={handleBan} aria-label={`Ban ${member.name}`}>
            Ban
          </button>
        )}

        {/* Option 2: Menu "Plus d'options" (si beaucoup d'actions) */}
        {/* <IconButton
          aria-label="More actions"
          aria-controls={open ? 'member-actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="member-actions-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          {onWarn && <MenuItem onClick={handleWarn}>Warn</MenuItem>}
          {onMute && <MenuItem onClick={handleMute}>Mute</MenuItem>}
          {onKick && <MenuItem onClick={handleKick}>Kick</MenuItem>}
          {onBan && <MenuItem onClick={handleBan}>Ban</MenuItem>}
          {/* Autres actions */}
        {/* </Menu> */}
      </div>
    </div>
  );
};

// Définition des types de props pour la validation et la clarté
Member.propTypes = {
  /**
   * Objet contenant les informations du membre (id, name, avatarUrl, role, etc.)
   */
  member: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    role: PropTypes.string,
    // Ajoute d'autres champs si nécessaire
  }).isRequired,
  /**
   * Callback appelé lors du clic sur le bouton "Kick". Reçoit l'ID du membre.
   */
  onKick: PropTypes.func,
  /**
   * Callback appelé lors du clic sur le bouton "Ban". Reçoit l'ID du membre.
   */
  onBan: PropTypes.func,
  /**
   * Callback appelé lors du clic sur le bouton "Mute". Reçoit l'ID du membre.
   */
  onMute: PropTypes.func,
  /**
   * Callback appelé lors du clic sur le bouton "Warn". Reçoit l'ID du membre.
   */
  onWarn: PropTypes.func,
  // Ajoute d'autres proptypes pour les callbacks supplémentaires
};

export default Member;
