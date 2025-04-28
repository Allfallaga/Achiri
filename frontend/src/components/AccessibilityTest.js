import React from "react";
import { FaUniversalAccess, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

/**
 * AccessibilityTest
 * Affiche un rapport d'accessibilité IA pour un utilisateur donné.
 * Props :
 *   - userId : identifiant utilisateur
 */
export default function AccessibilityTest({ userId }) {
  // Exemple de recommandations et tests simulés
  const tests = [
    {
      label: "Contraste suffisant",
      passed: true,
      desc: "Le contraste des couleurs est conforme aux normes WCAG AA."
    },
    {
      label: "Navigation clavier",
      passed: true,
      desc: "Tous les éléments interactifs sont accessibles au clavier."
    },
    {
      label: "Labels ARIA présents",
      passed: false,
      desc: "Certains boutons ou champs n'ont pas de label ARIA explicite."
    },
    {
      label: "Lecture vocale",
      passed: true,
      desc: "Le contenu est compatible avec les lecteurs d'écran."
    }
  ];

  return (
    <div
      className="accessibility-ia-report"
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        background: "#e3f2fd",
        borderRadius: 12,
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 2px 12px #1976d222"
      }}
      aria-label="Rapport d'accessibilité IA"
      tabIndex={0}
    >
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, color: "#1976d2", marginBottom: 18 }}>
        <FaUniversalAccess /> Test d'Accessibilité IA
      </h2>
      <p style={{ marginBottom: 18 }}>
        Résultats d'accessibilité pour l'utilisateur : <strong>{userId}</strong>
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tests.map((t, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              background: t.passed ? "#e8f5e9" : "#fff3e0",
              color: t.passed ? "#388e3c" : "#b71c1c",
              borderRadius: 8,
              padding: "0.7em 1em",
              marginBottom: 10,
              gap: 12,
              fontWeight: 500
            }}
            aria-label={t.label + (t.passed ? " : OK" : " : À corriger")}
          >
            {t.passed ? (
              <FaCheckCircle style={{ color: "#43a047", fontSize: 20 }} aria-label="Succès" />
            ) : (
              <FaExclamationTriangle style={{ color: "#fbc02d", fontSize: 20 }} aria-label="Attention" />
            )}
            <span>{t.label}</span>
            <span style={{ fontSize: 13, color: "#555", fontWeight: 400, marginLeft: 8 }}>{t.desc}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 18, fontSize: 15, color: "#1976d2" }}>
        {tests.some(t => !t.passed) ? (
          <>Des améliorations sont recommandées pour une accessibilité optimale.</>
        ) : (
          <>Toutes les vérifications sont conformes. Bravo !</>
        )}
      </div>
    </div>
  );
}