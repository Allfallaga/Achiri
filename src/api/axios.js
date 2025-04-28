import axios from "axios";

// Utilisation d'une baseURL configurable via .env (REACT_APP_AXIOS_DOMAIN)
// Pour la sécurité, ne pas exposer de secrets dans le frontend
const instance = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_DOMAIN || "http://localhost:5000",
  // timeout: 10000, // Optionnel : timeout global
  // headers: { "X-Custom-Header": "Achiri" }, // Optionnel : headers globaux
});

// Intercepteur de requête pour logs/debug (désactiver en prod si besoin)
instance.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[Axios] Request:", config.method, config.url, config.data || "");
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercepteur de réponse pour gestion centralisée des erreurs
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // eslint-disable-next-line no-console
      if (process.env.NODE_ENV !== "production") {
        console.error("[Axios] Error:", error.response.status, error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;