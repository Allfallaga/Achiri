import React from 'react';
import AuthContext from '../../context/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

function RequiredAuth() {
    const { auth } = React.useContext(AuthContext);

    if (!auth.loggedIn) {
        // Redirection sécurisée vers la page de connexion
        return <Navigate to="/" replace aria-label="Redirection vers la connexion" />;
    }
    // Affiche les routes enfants si authentifié
    return <Outlet />;
}

export default RequiredAuth;