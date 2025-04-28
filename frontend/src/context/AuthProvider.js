import React, { useState, useContext, useEffect, useCallback } from "react";

// Création du contexte Auth
const AuthContext = React.createContext();

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);

// Provider pour englober l'app et fournir l'état d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Persistance simple (localStorage)
    const stored = localStorage.getItem("achiri_user");
    return stored ? JSON.parse(stored) : null;
  });

  // Connexion (à adapter selon ton backend)
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("achiri_user", JSON.stringify(userData));
  }, []);

  // Déconnexion
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("achiri_user");
  }, []);

  // Synchronisation si plusieurs onglets
  useEffect(() => {
    const sync = (e) => {
      if (e.key === "achiri_user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // Ajout d'un état d'authentification simple pour compatibilité avec RequiredAuth
  const auth = {
    loggedIn: !!user,
    role: user?.role || "user",
    ...user
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;