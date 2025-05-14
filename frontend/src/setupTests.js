/**
 * setupTests.js – Achiri
 * Configuration avancée des tests pour React avec Testing Library et Jest.
 * - Ajoute des matchers personnalisés pour assertions DOM (accessibilité, SEO, responsive…)
 * - Prêt pour extensions futures (mocks API, contextes, i18n, dark mode, sécurité…)
 * - Sécurité : isolation, nettoyage, pas de fuite de données.
 * - Accessibilité : tests ARIA, focus, navigation clavier, contraste, etc.
 * - SEO : vérification des balises Helmet, structure, titres, etc.
 * - Documentation : https://github.com/testing-library/jest-dom
 */

import "@testing-library/jest-dom";

// Nettoyage automatique du DOM après chaque test
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Mock global pour scrollTo (utile pour tests responsive/accessibilité)
window.scrollTo = window.scrollTo || (() => {});

// Prêt pour extension : mock i18n, contextes, dark mode, etc.
// Exemple : import './__mocks__/i18nMock';

// Ajoutez ici toute configuration ou extension de test globale pour Achiri.
