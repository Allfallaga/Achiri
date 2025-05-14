/**
 * reportWebVitals – Achiri
 * Mesure les indicateurs Web Vitals pour la performance, l’accessibilité, le SEO et l’expérience utilisateur.
 * - Peut être branché à un logger, analytics, monitoring, ou dashboard admin.
 * - Prêt pour extensions futures (alertes, logs sécurité, feedback UX…).
 * @param {function} onPerfEntry - Callback pour recevoir les métriques (CLS, FID, FCP, LCP, TTFB)
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

/**
 * Documentation :
 * - Utilisez reportWebVitals(console.log) pour afficher les métriques en dev.
 * - Branchez sur un service externe (Sentry, Datadog, Google Analytics, etc) pour la prod.
 * - Les métriques aident à améliorer la performance, l’accessibilité et le SEO.
 * - Prêt pour extensions (alertes, logs sécurité, feedback UX…).
 */
