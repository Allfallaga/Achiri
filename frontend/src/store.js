/**
 * store.js – Achiri
 * Configuration du store Redux centralisé pour l'application Achiri.
 * Utilise @reduxjs/toolkit pour une configuration simplifiée et optimisée.
 *
 * Responsabilités :
 * - Combine tous les reducers de l'application (slices).
 * - Configure le store Redux, incluant les middlewares par défaut (comme Redux Thunk).
 * - Active l'extension Redux DevTools pour faciliter le débogage.
 *
 * Pour ajouter un nouvel état global (ex: gestion des utilisateurs, paramètres d'accessibilité) :
 * 1. Créez un "slice" en utilisant `createSlice` dans un fichier séparé (ex: `src/features/user/userSlice.js`).
 * 2. Importez le reducer généré par ce slice dans ce fichier (`store.js`).
 * 3. Ajoutez le reducer importé à l'objet `reducer` dans `configureStore`.
 */

import { configureStore } from "@reduxjs/toolkit";
// Importez ici les reducers de vos différents slices au fur et à mesure que vous les créez
// Exemple: import userReducer from './features/user/userSlice';
// Exemple: import accessibilityReducer from './features/accessibility/accessibilitySlice';

const store = configureStore({
  /**
   * Combine tous les reducers de l'application.
   * Chaque clé correspond à une partie de l'état global gérée par le reducer associé.
   * Exemple:
   * reducer: {
   *   user: userReducer,
   *   accessibility: accessibilityReducer,
   *   // Ajoutez d'autres reducers ici
   * },
   */
  reducer: {
    // Ajoutez vos reducers ici. Pour l'instant, il est vide.
    // Exemple:
    // user: userReducer,
    // room: roomReducer,
    // settings: settingsReducer,
  },
  /**
   * Configuration des middlewares.
   * Par défaut, `configureStore` inclut `redux-thunk` et des middlewares de développement
   * (vérification d'immutabilité, sérialisation).
   * Vous pouvez ajouter des middlewares personnalisés ici si nécessaire.
   * middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
   */
  /**
   * Activation de l'extension Redux DevTools.
   * Automatiquement activée en mode développement.
   * Peut être configurée plus finement si besoin.
   * devTools: process.env.NODE_ENV !== 'production',
   */
});

export default store;

/**
 * Documentation SEO (pour référence, bien que non directement applicable au store JS) :
 * Le store Redux lui-même n'impacte pas directement le SEO. Cependant, les données qu'il gère
 * peuvent être utilisées pour afficher du contenu dynamique qui, s'il est rendu côté serveur (SSR)
 * ou pré-rendu, peut être indexé par les moteurs de recherche. Assurez-vous que les données
 * critiques pour le SEO (titres, descriptions, contenu principal) sont accessibles et rendues
 * correctement.
 */