import React from "react";
import {
  FaUniversalAccess,
  FaCheckCircle,
  FaExclamationTriangle,
  FaKeyboard,
  FaLowVision,
  FaVolumeUp,
  FaSignLanguage,
} from "react-icons/fa";

/**
 * AccessibilityTest – Achiri
 * Rapport d'accessibilité IA pour un utilisateur donné.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design avancé, branding Achiri.
 * - Fonctionnalités : rapport IA, recommandations, feedback utilisateur, live region, responsive, SEO, accessibilité.
 * - Prêt pour extensions futures (export, analytics, overlay, dark mode, badges, etc).
 *
 * Props :
 *   userId (string) – identifiant de l'utilisateur à tester
 */

export default function AccessibilityTest({ userId }) {
  // Exemple de recommandations et tests simulés
  const tests = [
    {
      label: "Contraste suffisant",
      icon: <FaLowVision />,
      passed: true,
      desc: "Le contraste des couleurs est conforme aux normes WCAG AA.",
    },
    {
      label: "Navigation clavier",
      icon: <FaKeyboard />,
      passed: true,
      desc: "Tous les éléments interactifs sont accessibles au clavier.",
    },
    {
      label: "Labels ARIA présents",
      icon: <FaUniversalAccess />,
      passed: false,
      desc: "Certains boutons ou champs n'ont pas de label ARIA explicite.",
    },
    {
      label: "Lecture vocale",
      icon: <FaVolumeUp />,
      passed: true,
      desc: "Le contenu est compatible avec les lecteurs d'écran.",
    },
    {
      label: "Traduction LSF",
      icon: <FaSignLanguage />,
      passed: true,
      desc: "Support de la Langue des Signes Française pour les vidéos et messages.",
    },
  ];

  return (
    <section
      className="accessibility-ia-report"
      aria-label="Rapport d'accessibilité IA Achiri"
      tabIndex={0}
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        background: "#e3f2fd",
        borderRadius: 16,
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 2px 16px #1976d222",
        outline: "none",
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#1976d2",
          marginBottom: 18,
          fontWeight: 700,
          fontSize: "1.25em",
        }}
        tabIndex={0}
        aria-label="Test d'accessibilité IA"
      >
        <FaUniversalAccess /> Test d'Accessibilité IA
      </h2>
      <p style={{ marginBottom: 18, fontSize: "1.08em" }}>
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
              borderRadius: 10,
              padding: "0.8em 1.1em",
              marginBottom: 12,
              gap: 14,
              fontWeight: 500,
              boxShadow: t.passed
                ? "0 1px 4px #43a04722"
                : "0 1px 4px #ff980022",
              outline: "none",
            }}
            aria-label={t.label + (t.passed ? " : OK" : " : À corriger")}
            tabIndex={0}
          >
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            {t.passed ? (
              <FaCheckCircle
                style={{ color: "#43a047", fontSize: 20 }}
                aria-label="Succès"
              />
            ) : (
              <FaExclamationTriangle
                style={{ color: "#fbc02d", fontSize: 20 }}
                aria-label="Attention"
              />
            )}
            <span>{t.label}</span>
            <span
              style={{
                fontSize: 13,
                color: "#555",
                fontWeight: 400,
                marginLeft: 8,
              }}
            >
              {t.desc}
            </span>
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: 18,
          fontSize: 15,
          color: "#1976d2",
          textAlign: "center",
          fontWeight: 600,
        }}
        aria-live="polite"
        tabIndex={0}
      >
        {tests.some((t) => !t.passed) ? (
          <>
            Des améliorations sont recommandées pour une accessibilité optimale.
          </>
        ) : (
          <>Toutes les vérifications sont conformes. Bravo !</>
        )}
      </div>
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center",
        }}
      >
        <span role="img" aria-label="sécurité">
          🔒
        </span>{" "}
        Sécurisé |{" "}
        <span role="img" aria-label="accessibilité">
          ♿
        </span>{" "}
        Accessible |{" "}
        <span role="img" aria-label="mobile">
          📱
        </span>{" "}
        Mobile/Web
      </footer>
      <style>{`
        .accessibility-ia-report:focus {
          outline: 2px solid #ffd600;
        }
        @media (max-width: 700px) {
          .accessibility-ia-report {
            padding: 1rem;
            max-width: 99vw;
          }
        }
        @media (prefers-color-scheme: dark) {
          .accessibility-ia-report {
            background: #232b3b;
            color: #ffe082;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Documentation :
 * - Rapport IA d’accessibilité : contraste, clavier, ARIA, voice over, LSF.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready, live region.
 * - Sécurité : pas d’info sensible, feedback utilisateur.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures (export, overlay, badges…).
 */
