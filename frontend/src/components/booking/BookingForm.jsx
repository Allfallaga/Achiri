import React, { useState } from "react";

/**
 * BookingForm – Achiri
 * Formulaire de réservation avancé : accessibilité, sécurité, mobile/web, design Achiri.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : nom, email, date, heure, options accessibilité, message, feedback utilisateur.
 * - Prêt pour extensions futures (paiement, analytics, dark mode, etc).
 *
 * Props :
 *   onSubmit?: function (callback lors de la réservation)
 */

const defaultOptions = [
  { value: "pmr", label: "Accès PMR (fauteuil roulant)" },
  { value: "aide", label: "Besoin d’un accompagnateur" },
  { value: "lsf", label: "Interprète LSF" },
  { value: "animal", label: "Animal d’assistance" },
];

const BookingForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Gestion des options d’accessibilité cochées
  const handleOptionChange = (value) => {
    setOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value],
    );
  };

  // Validation et envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback("");
    if (!name.trim() || !email.trim() || !date || !time) {
      setFeedback("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    // Simple validation email
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      setFeedback("Veuillez saisir un email valide.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback("Réservation envoyée !");
      onSubmit && onSubmit({ name, email, date, time, options, message });
      setTimeout(() => setFeedback(""), 2000);
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setOptions([]);
      setMessage("");
    }, 1500);
  };

  return (
    <section
      className="booking-form"
      style={{
        maxWidth: 480,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #1976d233",
        padding: "2.2rem",
        outline: "none",
      }}
      aria-label="Formulaire de réservation Achiri"
      tabIndex={0}
    >
      <h2
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.3em",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
        tabIndex={0}
        aria-label="Formulaire de réservation accessible"
      >
        <span role="img" aria-label="réservation">
          📋
        </span>
        Formulaire de Réservation Accessible
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: 18 }}>
          <label
            htmlFor="booking-name"
            style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
          >
            Nom{" "}
            <span aria-hidden="true" style={{ color: "#b71c1c" }}>
              *
            </span>
          </label>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            aria-label="Nom"
            required
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid #1976d2",
              padding: "0.7em 1em",
              fontSize: 15,
            }}
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label
            htmlFor="booking-email"
            style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
          >
            Email{" "}
            <span aria-hidden="true" style={{ color: "#b71c1c" }}>
              *
            </span>
          </label>
          <input
            id="booking-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            aria-label="Email"
            required
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid #1976d2",
              padding: "0.7em 1em",
              fontSize: 15,
            }}
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: 18, display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="booking-date"
              style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
            >
              Date{" "}
              <span aria-hidden="true" style={{ color: "#b71c1c" }}>
                *
              </span>
            </label>
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Date"
              required
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #1976d2",
                padding: "0.7em 1em",
                fontSize: 15,
              }}
              disabled={loading}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="booking-time"
              style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
            >
              Heure{" "}
              <span aria-hidden="true" style={{ color: "#b71c1c" }}>
                *
              </span>
            </label>
            <input
              id="booking-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-label="Heure"
              required
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #1976d2",
                padding: "0.7em 1em",
                fontSize: 15,
              }}
              disabled={loading}
            />
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>
            Options d’accessibilité :
          </span>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {defaultOptions.map((o) => (
              <label
                key={o.value}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <input
                  type="checkbox"
                  checked={options.includes(o.value)}
                  onChange={() => handleOptionChange(o.value)}
                  aria-checked={options.includes(o.value)}
                  aria-label={o.label}
                  style={{ accentColor: "#1976d2" }}
                  disabled={loading}
                />
                {o.label}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label
            htmlFor="booking-message"
            style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
          >
            Message (optionnel)
          </label>
          <textarea
            id="booking-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Précisez vos besoins ou questions…"
            aria-label="Message optionnel"
            rows={3}
            maxLength={300}
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid #1976d2",
              padding: "0.7em 1em",
              fontSize: 15,
              resize: "vertical",
            }}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#bdbdbd" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.7em 1.5em",
            fontWeight: "bold",
            fontSize: "1.1em",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
          aria-label="Envoyer la réservation"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
        {feedback && (
          <div
            style={{
              color: feedback.includes("envoyée") ? "#388e3c" : "#b71c1c",
              fontWeight: 500,
              marginTop: 12,
            }}
            aria-live="polite"
            tabIndex={0}
          >
            {feedback}
          </div>
        )}
      </form>
      <div
        style={{
          marginTop: 24,
          fontSize: 14,
          color: "#555",
          background: "#f0f4f8",
          borderRadius: 8,
          padding: "0.7em 1em",
        }}
      >
        <b>À propos :</b> Ce formulaire permet de réserver un service ou un
        créneau en tenant compte de vos besoins d’accessibilité.{" "}
        <a
          href="https://www.service-public.fr/particuliers/vosdroits/F32012"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          En savoir plus
        </a>
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
    </section>
  );
};

export default BookingForm;

/**
 * Documentation :
 * - Formulaire de réservation accessible : nom, email, date, heure, options, message, feedback.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
