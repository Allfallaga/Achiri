import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'; // Reset & base styles
import './assets/css/app.css'; // Styles globaux SCSS compilés
import './i18n'; // Multilingue, accessibilité, SEO
import { HelmetProvider } from 'react-helmet-async'; // Ajouté

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import reportWebVitals from './reportWebVitals';

// Point d'entrée principal – Achiri
// - Accessibilité, sécurité, SEO, responsive, design avancé
// - Prêt pour extensions futures (multi-langues, dark mode, analytics, etc)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);

// Mesure de la performance (SEO, UX, accessibilité)
reportWebVitals();

/**
 * Documentation :
 * - index.js : point d'entrée, charge les styles globaux, i18n, ErrorBoundary, App.
 * - Accessibilité : ErrorBoundary global, multilingue, focus visible, responsive.
 * - Sécurité : StrictMode, ErrorBoundary, pas de dépendances externes non maîtrisées.
 * - SEO : structure claire, styles optimisés, i18n, reportWebVitals.
 * - Prêt pour extensions (analytics, dark mode, badges, notifications…).
 */