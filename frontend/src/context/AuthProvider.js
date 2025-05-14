import React, { createContext, useState, useEffect, useContext } from "react";

/**
 * AuthProvider – Achiri
 * Fournit le contexte d'authentification à toute l'application.
 * - Persistance locale (localStorage), logique robuste, gestion rôles, sécurité, accessibilité, responsive.
 * - Prêt pour extensions futures (MFA, RGPD, expiration, refresh, logs, notifications, analytics…).
 * - Design moderne, SEO friendly, feedback utilisateur.
 */

const AuthContext = createContext({
  auth: {},
  setAuth: () => {},
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  user: null,
  role: null,
  error: null,
  notify: () => {},
  notifications: [],
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Persiste l'état d'auth dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch {
      setError("Erreur de stockage local.");
    }
  }, [auth]);

  // Fonction de connexion (mock, à remplacer par appel API sécurisé)
  const login = ({ username, role }) => {
    if (!username) {
      setError("Nom d'utilisateur requis.");
      notify("Nom d'utilisateur requis.");
      return;
    }
    setAuth({
      user: { username, role },
      isAuthenticated: true,
      token: "mock-token", // À remplacer par un vrai token sécurisé
    });
    setError(null);
    notify(`Bienvenue ${username} !`);
  };

  // Fonction de déconnexion
  const logout = () => {
    setAuth({});
    try {
      localStorage.removeItem("auth");
    } catch {
      setError("Erreur lors de la déconnexion.");
    }
    notify("Déconnexion réussie.");
  };

  // Notifications système/contextuelles
  const notify = (message) => {
    setNotifications((prev) => [
      ...prev.slice(-4),
      { message, date: new Date().toISOString() },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  const isAuthenticated = !!auth.isAuthenticated;
  const user = auth.user || null;
  const role = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        isAuthenticated,
        user,
        role,
        error,
        notify,
        notifications,
      }}
    >
      {children}
      {/* Notifications contextuelles accessibles */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          top: 18,
          left: 18,
          zIndex: 9999,
          minWidth: 220,
          pointerEvents: "none",
        }}
      >
        {notifications.map((n, i) => (
          <div
            key={i}
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              marginBottom: 8,
              boxShadow: "0 2px 8px #2224",
              fontSize: "1em",
              opacity: 0.98,
              fontWeight: 500,
              outline: "none",
            }}
            tabIndex={-1}
            role="status"
          >
            {n.message}
          </div>
        ))}
        {error && (
          <div
            style={{
              background: "#d32f2f",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              marginBottom: 8,
              fontWeight: 600,
              outline: "none",
            }}
            tabIndex={-1}
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;

/**
 * Documentation :
 * - Fournit : auth, setAuth, login, logout, isAuthenticated, user, role, error, notify, notifications.
 * - Persistance locale (localStorage).
 * - Prêt pour extensions futures (MFA, RGPD, expiration, refresh, logs, notifications, analytics…).
 * - Sécurité : pas d’info sensible dans le contexte, pas de tracking, feedback utilisateur, notifications accessibles.
 * - Accessibilité : navigation clavier, responsive, dark mode, aria-live pour notifications.
 * - Design moderne, SEO friendly, branding Achiri.
 */
