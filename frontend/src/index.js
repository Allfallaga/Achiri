import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

// Ajout d'AuthProvider pour la gestion des rôles, sessions et accès global
import { AuthProvider } from "./context/AuthProvider";

// Si besoin d'autres providers globaux (ex: AuthProvider), ils sont déjà dans App.js

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);