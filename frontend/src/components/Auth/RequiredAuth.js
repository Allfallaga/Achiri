import React from 'react';
import AuthContext from '../../context/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * RequiredAuth
 * - Protège les routes nécessitant une authentification.
 * - Redirige vers /login si l'utilisateur n'est pas connecté.
 * - Garde la destination pour redirection après connexion.
 * - Gère aussi les rôles si besoin (admin/owner/user).
 * Props :
 *   allowedRoles: array (optionnel) - rôles autorisés pour la route
 */
function RequiredAuth({ allowedRoles }) {
  const { auth } = React.useContext(AuthContext);
  const location = useLocation();

  if (!auth?.loggedIn) {
    // Redirige vers la page de login, garde la destination pour après connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si des rôles sont spécifiés, on vérifie le rôle de l'utilisateur
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // Redirige vers la page d'accueil ou une page non autorisée
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RequiredAuth;