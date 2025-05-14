import axios from "axios";

/**
 * axiosApi – Achiri
 * Instance Axios centralisée pour toutes les requêtes API.
 * - Sécurité, accessibilité, logs, gestion d’erreurs, UX avancée.
 * - Prêt pour extensions futures (auth, multi-langues, notifications, export, etc).
 * - Compatible mobile/web, SEO friendly (indirect).
 */

// Utilisation d'une baseURL configurable via .env (REACT_APP_AXIOS_DOMAIN)
const instance = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_DOMAIN || "http://localhost:5000",
  // timeout: 10000, // Optionnel : timeout global
  // headers: { "X-Custom-Header": "Achiri" }, // Optionnel : headers globaux
});

// Intercepteur de requête pour logs/debug (désactiver en prod si besoin)
instance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "[Axios] Request:",
        config.method,
        config.url,
        config.data || "",
      );
    }
    // Accessibilité : header pour préférences utilisateur (ex : dark mode, langue)
    if (window && window.localStorage) {
      const pref = window.localStorage.getItem("achiri-accessibility");
      if (pref) config.headers["X-Achiri-Accessibility"] = pref;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercepteur de réponse pour gestion centralisée des erreurs et feedback
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[Axios] Error:",
          error.response.status,
          error.response.data,
        );
      }
      // Accessibilité : feedback sonore/visuel possible ici (extension future)
      // Sécurité : gestion des erreurs globales (401, 403, etc)
      if (error.response.status === 401) {
        // Optionnel : redirection login ou feedback utilisateur
      }
    }
    return Promise.reject(error);
  },
);

export default instance;

/**
 * Documentation :
 * - Instance axios centralisée pour toutes les API Achiri.
 * - Sécurité : pas de secrets exposés, gestion des erreurs, feedback utilisateur.
 * - Accessibilité : header X-Achiri-Accessibility pour préférences.
 * - Extensible, compatible mobile/web, SEO friendly (indirect).
 */
