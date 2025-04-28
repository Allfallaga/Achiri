import { useState, useEffect } from "react";

/**
 * Hook pour gérer l'utilisateur courant (pseudo, avatar, couleur, etc.)
 * Prêt pour évoluer (auth, stockage local, etc.)
 * Ajout du support du rôle et de l'avatar pour la navigation/Sidebar.
 */
export function useUser(defaultName = "", defaultRole = "user") {
  // Pseudo utilisateur (persisté dans le localStorage)
  const [name, setName] = useState(() => {
    return (
      localStorage.getItem("user_name") ||
      defaultName ||
      `user${Math.floor(1000 + Math.random() * 9000)}`
    );
  });

  // Rôle utilisateur (persisté dans le localStorage)
  const [role, setRole] = useState(() => {
    return localStorage.getItem("user_role") || defaultRole;
  });

  // Avatar généré (ex: emoji)
  const avatar = (() => {
    const emojis = ["🦊", "🐼", "🐧", "🐸", "🐵", "🐱", "🐶", "🦁", "🐯", "🐨"];
    // Utilisation d'un hash simple pour plus de variété
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return emojis[Math.abs(hash) % emojis.length];
  })();

  // Couleur d'utilisateur (pour UI)
  const color = (() => {
    const palette = ["#FFB300", "#1E88E5", "#43A047", "#E53935", "#8E24AA", "#F4511E"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return palette[Math.abs(hash) % palette.length];
  })();

  // Persiste le pseudo et le rôle si modifié
  useEffect(() => {
    if (name) {
      localStorage.setItem("user_name", name);
    }
  }, [name]);

  useEffect(() => {
    if (role) {
      localStorage.setItem("user_role", role);
    }
  }, [role]);

  // Permet d'étendre facilement (auth, logout, etc.)
  return {
    name,
    setName,
    avatar,
    color,
    role,
    setRole,
    reset: () => {
      const newName = `user${Math.floor(1000 + Math.random() * 9000)}`;
      setName(newName);
      localStorage.setItem("user_name", newName);
    },
    logout: () => {
      setName("");
      setRole(defaultRole);
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_role");
    },
  };
}