// reportWebVitals.js
/**
 * reportWebVitals
 * - Permet de mesurer les indicateurs de performance Web Vitals
 * - Peut être branché à un logger ou un service d'analytics
 * @param {function} onPerfEntry - Callback pour recevoir les métriques
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;