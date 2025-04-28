import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

/**
 * AuthProvider
 * - Fournit le contexte d'authentification à toute l'application
 * - Persistance dans localStorage, logique moderne et robuste
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Persiste l'état d'auth dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('auth', JSON.stringify(auth));
    } catch {
      // Optionnel : gestion d'erreur de stockage
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;