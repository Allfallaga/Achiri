import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * UserContext – Achiri
 * Fournit le contexte utilisateur global à toute l’application.
 * - Authentification, profil, préférences, accessibilité, sécurité, responsive, SEO friendly.
 * - Prêt pour extensions futures (badges, points, notifications, analytics, modération, etc).
 * - Persistance locale, feedback utilisateur, design moderne.
 */

const defaultUser = {
  id: null,
  name: "",
  avatar: "",
  email: "",
  badges: [],
  points: 0,
  preferences: {
    darkMode: false,
    highContrast: false,
    language: "fr",
    tts: false,
    subtitles: false,
    signLanguage: false,
  },
  authenticated: false,
  setUser: () => {},
  updateUser: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultUser);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("achiri-user"));
      return saved || { ...defaultUser };
    } catch {
      return { ...defaultUser };
    }
  });

  // Persistance locale
  useEffect(() => {
    localStorage.setItem("achiri-user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Mettre à jour le profil utilisateur
  const updateUser = (updates) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updates,
      preferences: { ...prev.preferences, ...updates.preferences },
    }));
  };

  // Déconnexion utilisateur
  const logout = () => {
    setCurrentUser({ ...defaultUser });
    localStorage.removeItem("achiri-user");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser: setCurrentUser,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

/**
 * Documentation :
 * - Fournit : currentUser, setUser, updateUser, logout.
 * - Persistance locale (localStorage).
 * - Prêt pour extensions futures (badges, points, notifications, analytics, modération…).
 * - Sécurité : pas d’info sensible sans consentement, pas de tracking, feedback utilisateur.
 * - Accessibilité : préférences dark mode, contraste, langue, TTS, sous-titres, langue des signes.
 * - Design moderne, SEO friendly, branding Achiri.
 */