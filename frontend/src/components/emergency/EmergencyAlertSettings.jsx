import React, { useState } from "react";

/**
 * EmergencyAlertSettings – Achiri
 * Paramètres d’alerte d’urgence : personnalisation, accessibilité, sécurité, mobile/web.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : activation/désactivation, choix du canal, message personnalisé, test d’alerte, feedback utilisateur.
 * - Prêt pour extensions futures (géoloc, analytics, dark mode, etc).
 */

const defaultChannels = [
  { value: "sms", label: "SMS" },
  { value: "email", label: "E-mail" },
  { value: "push", label: "Notification Push" }
];

const EmergencyAlertSettings = ({
  enabled: initialEnabled = false,
  channels: initialChannels = ["sms"],
  message: initialMessage = "Alerte d’urgence Achiri : besoin d’aide immédiate.",
  onSave
}) => {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [channels, setChannels] = useState(initialChannels);
  const [message, setMessage] = useState(initialMessage);
  const [feedback, setFeedback] = useState("");
  const [testing, setTesting] = useState(false);

  // Gestion des canaux cochés
  const handleChannelChange = (value) => {
    setChannels((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  // Sauvegarde des paramètres
  const handleSave = (e) => {
    e.preventDefault();
    setFeedback("Paramètres enregistrés !");
    onSave && onSave({ enabled, channels, message });
    setTimeout(() => setFeedback(""), 2000);
  };

  // Test d’alerte (simulation)
  const handleTest = () => {
    setTesting(true);
    setFeedback("Test d’alerte envoyé (simulation) !");
    setTimeout(() => {
      setTesting(false);
      setFeedback("");
    }, 1800);
  };

  return (
    <section
      className="emergency-alert-settings"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #b71c1c33",
        padding: "2.2rem",
        outline: "none"
      }}
      aria-label="Paramètres d’alerte d’urgence"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#b71c1c",
          fontWeight: 700,
          fontSize: "1.3em",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}
        tabIndex={0}
        aria-label="Paramètres d’alerte d’urgence"
      >
        <span role="img" aria-label="urgence">🚨</span>
        Paramètres d’Alerte d’Urgence
      </h2>
      <form onSubmit={handleSave} autoComplete="off">
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={e => setEnabled(e.target.checked)}
              aria-checked={enabled}
              aria-label="Activer les alertes d’urgence"
              style={{ accentColor: "#b71c1c" }}
            />
            Activer les alertes d’urgence
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Canaux d’alerte :</span>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {defaultChannels.map((c) => (
              <label key={c.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="checkbox"
                  checked={channels.includes(c.value)}
                  onChange={() => handleChannelChange(c.value)}
                  aria-checked={channels.includes(c.value)}
                  aria-label={`Activer le canal ${c.label}`}
                  style={{ accentColor: "#1976d2" }}
                  disabled={!enabled}
                />
                {c.label}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="emergency-message" style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
            Message personnalisé :
          </label>
          <textarea
            id="emergency-message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            maxLength={180}
            disabled={!enabled}
            aria-label="Message personnalisé d’alerte"
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid #b71c1c",
              padding: "0.7em 1em",
              fontSize: 15,
              resize: "vertical",
              background: enabled ? "#fff" : "#f5f5f5",
              color: enabled ? "#222" : "#aaa"
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <button
            type="submit"
            disabled={!enabled}
            style={{
              background: enabled ? "#b71c1c" : "#bdbdbd",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7em 1.5em",
              fontWeight: "bold",
              fontSize: "1.1em",
              cursor: enabled ? "pointer" : "not-allowed",
              transition: "background 0.2s"
            }}
            aria-label="Enregistrer les paramètres"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={!enabled || testing}
            style={{
              background: enabled ? "#1976d2" : "#bdbdbd",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7em 1.5em",
              fontWeight: "bold",
              fontSize: "1.1em",
              cursor: enabled && !testing ? "pointer" : "not-allowed",
              transition: "background 0.2s"
            }}
            aria-label="Tester l’alerte"
          >
            {testing ? "Test..." : "Tester l’alerte"}
          </button>
        </div>
        {feedback && (
          <div
            style={{
              color: feedback.includes("enregistré") ? "#388e3c" : "#b71c1c",
              fontWeight: 500,
              marginBottom: 8
            }}
            aria-live="polite"
            tabIndex={0}
          >
            {feedback}
          </div>
        )}
      </form>
      <div style={{ marginTop: 24, fontSize: 14, color: "#555", background: "#f0f4f8", borderRadius: 8, padding: "0.7em 1em" }}>
        <b>À propos :</b> Les alertes d’urgence permettent de prévenir rapidement vos contacts ou services en cas de besoin. <a href="https://www.service-public.fr/particuliers/vosdroits/F21358" target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2", textDecoration: "underline" }}>En savoir plus</a>
      </div>
      <footer
        style={{
          marginTop: 18,
          color: "#888",
          fontSize: "0.93em",
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
    </section>
  );
};

export default EmergencyAlertSettings;

/**
 * Documentation :
 * - Paramètres d’alerte d’urgence : activation, canaux, message, test, feedback.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */