import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * i18n.js – Achiri
 * Configuration multilingue avancée pour accessibilité, SEO, sécurité, responsive.
 * - Prêt pour extension (ajout langues, modules, lazy loading, détection navigateur, etc).
 * - Toutes les clés importantes pour l’UI, l’accessibilité, les notifications, les erreurs, etc.
 */

const resources = {
  fr: {
    translation: {
      accueil: "Accueil",
      dashboard: "Tableau de bord",
      profil: "Profil",
      "classes-virtuelles": "Classes Virtuelles",
      wallet: "Portefeuille",
      accessibilite: "Accessibilité",
      parametres: "Paramètres",
      rooms: "Salles",
      musique: "Musique",
      notifications: "Notifications",
      amis: "Amis",
      challenges: "Défis",
      classement: "Classement",
      "creator-tools": "Outils Créateur",
      moderation: "Modération",
      "reseaux-sociaux": "Réseaux Sociaux",
      "interactions-sociales": "Interactions Sociales",
      deconnexion: "Déconnexion",
      connexion: "Connexion",
      bienvenue: "Bienvenue sur Achiri !",
      erreur: "Une erreur est survenue",
      recharger: "Recharger la page",
      "acces-refuse": "Accès refusé",
      "non-trouve": "Page non trouvée",
      "retour-accueil": "Retour à l'accueil",
      envoyer: "Envoyer",
      annuler: "Annuler",
      sauvegarder: "Sauvegarder",
      supprimer: "Supprimer",
      confirmer: "Confirmer",
      "alerte-urgence": "Alerte d'urgence",
      "traduction-lsf": "Traduction LSF",
      "generateur-seo": "Générateur SEO",
      planificateur: "Planificateur",
      filtrer: "Filtrer",
      ajouter: "Ajouter",
      modifier: "Modifier",
      "voir-plus": "Voir plus",
      "aucune-notification": "Aucune notification",
      "nouveau-challenge": "Nouveau défi disponible",
      "accessibilite-activee": "Accessibilité activée",
      "accessibilite-desactivee": "Accessibilité désactivée",
      "mode-contraste-eleve": "Mode contraste élevé",
      "mode-sombre": "Mode sombre",
      langue: "Langue",
      francais: "Français",
      anglais: "Anglais",
      // Ajoutez ici toutes les clés utiles à votre projet
    },
  },
  en: {
    translation: {
      accueil: "Home",
      dashboard: "Dashboard",
      profil: "Profile",
      "classes-virtuelles": "Virtual Classrooms",
      wallet: "Wallet",
      accessibilite: "Accessibility",
      parametres: "Settings",
      rooms: "Rooms",
      musique: "Music",
      notifications: "Notifications",
      amis: "Friends",
      challenges: "Challenges",
      classement: "Leaderboard",
      "creator-tools": "Creator Tools",
      moderation: "Moderation",
      "reseaux-sociaux": "Social Networks",
      "interactions-sociales": "Social Interactions",
      deconnexion: "Logout",
      connexion: "Login",
      bienvenue: "Welcome to Achiri!",
      erreur: "An error occurred",
      recharger: "Reload page",
      "acces-refuse": "Access denied",
      "non-trouve": "Page not found",
      "retour-accueil": "Back to home",
      envoyer: "Send",
      annuler: "Cancel",
      sauvegarder: "Save",
      supprimer: "Delete",
      confirmer: "Confirm",
      "alerte-urgence": "Emergency alert",
      "traduction-lsf": "Sign Language Translation",
      "generateur-seo": "SEO Generator",
      planificateur: "Scheduler",
      filtrer: "Filter",
      ajouter: "Add",
      modifier: "Edit",
      "voir-plus": "See more",
      "aucune-notification": "No notifications",
      "nouveau-challenge": "New challenge available",
      "accessibilite-activee": "Accessibility enabled",
      "accessibilite-desactivee": "Accessibility disabled",
      "mode-contraste-eleve": "High contrast mode",
      "mode-sombre": "Dark mode",
      langue: "Language",
      francais: "French",
      anglais: "English",
      // Add all useful keys for your project here
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr", // Langue par défaut
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // Sécurité XSS gérée par React
  },
  detection: {
    // Prêt pour extension: détection automatique de la langue navigateur
    // (nécessite i18next-browser-languagedetector)
  },
});

export default i18n;

/**
 * Documentation :
 * - Ajoutez toutes les clés de traduction utilisées dans l’UI, notifications, erreurs, accessibilité, SEO.
 * - Prêt pour extension multi-langues, lazy loading, détection navigateur, modules dynamiques.
 * - Respecte la sécurité (pas d’injection, escape automatique), accessibilité (langues, feedback).
 * - Documentez toute extension ou modification majeure.
 */
