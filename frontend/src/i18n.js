import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Exemple de ressources de traduction (français et anglais)
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
      bienvenue: "Bienvenue sur Achiri !"
      // Ajoute ici toutes les clés utiles à ton projet
    }
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
      bienvenue: "Welcome to Achiri!"
      // Add all useful keys for your project here
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // Langue par défaut
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;