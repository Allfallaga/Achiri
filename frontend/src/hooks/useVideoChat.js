import { useState, useEffect } from "react";

/**
 * useUser – Achiri
 * Hook pour gérer l'utilisateur courant (pseudo, avatar, couleur, rôle, accessibilité, préférences).
 * - Persistance locale, sécurité, accessibilité, UX avancée.
 * - Prêt pour extensions futures (auth, multi-profils, badges, préférences, notifications, etc).
 * - Compatible mobile/web, SEO friendly (indirect).
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

  // Préférences d'accessibilité (persistées)
  const [accessibility, setAccessibility] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user_accessibility")) || {};
    } catch {
      return {};
    }
  });

  // Avatar généré (ex: emoji)
  const avatar = (() => {
    const emojis = ["🦊", "🐼", "🐧", "🐸", "🐵", "🐱", "🐶", "🦁", "🐯", "🐨"];
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

  // Persiste le pseudo si modifié
  useEffect(() => {
    if (name) {
      localStorage.setItem("user_name", name);
    }
  }, [name]);

  // Persiste le rôle si modifié
  useEffect(() => {
    if (role) {
      localStorage.setItem("user_role", role);
    }
  }, [role]);

  // Persiste les préférences d'accessibilité si modifiées
  useEffect(() => {
    localStorage.setItem("user_accessibility", JSON.stringify(accessibility));
  }, [accessibility]);

  // Réinitialise le pseudo et l'avatar
  const reset = () => {
    const newName = `user${Math.floor(1000 + Math.random() * 9000)}`;
    setName(newName);
    localStorage.setItem("user_name", newName);
  };

  // Déconnexion utilisateur (efface pseudo, rôle, accessibilité)
  const logout = () => {
    setName("");
    setRole(defaultRole);
    setAccessibility({});
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_accessibility");
  };

  // Mise à jour des préférences d'accessibilité
  const updateAccessibility = (prefs) => {
    setAccessibility(prev => ({ ...prev, ...prefs }));
  };

  // Permet d'étendre facilement (auth, logout, accessibilité, etc.)
  return {
    name,
    setName,
    avatar,
    color,
    role,
    setRole,
    accessibility,
    setAccessibility: updateAccessibility,
    reset,
    logout,
  };
}

/**
 * Documentation :
 * - name, setName : pseudo utilisateur (persisté).
 * - role, setRole : rôle utilisateur (persisté).
 * - avatar, color : UI personnalisée.
 * - accessibility, setAccessibility : préférences d’accessibilité (persistées).
 * - reset : réinitialise pseudo/avatar.
 * - logout : efface toutes les infos locales.
 * - Sécurité : aucune info sensible, persistance locale, prêt pour extensions auth.
 * - Accessibilité : prêt pour extensions (contraste, TTS, navigation clavier, etc).
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */