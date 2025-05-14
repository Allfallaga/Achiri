import React, { useState } from "react";

/**
 * TransportList – Achiri
 * Liste des transports accessibles : recherche, filtres, accessibilité, sécurité, mobile/web, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : recherche, filtres accessibilité, affichage liste/carte, feedback utilisateur.
 * - Prêt pour extensions futures (API, favoris, dark mode, analytics, etc).
 *
 * Props :
 *   transports?: array (liste des transports à afficher)
 *   onSelect?: function (callback lors de la sélection d’un transport)
 */

const defaultTransports = [
  {
    id: 1,
    name: "Bus Ligne 24",
    type: "Bus",
    accessible: ["PMR", "Audio", "Chien guide"],
    description:
      "Bus équipé rampe PMR, annonces audio, animaux d’assistance acceptés.",
    departure: "Gare Centrale",
    arrival: "Place Liberté",
    schedule: "6h00 - 23h00",
    image: "/assets/transports/bus24.jpg",
  },
  {
    id: 2,
    name: "Tramway T2",
    type: "Tramway",
    accessible: ["PMR", "LSF"],
    description: "Tramway à plancher bas, écrans LSF, accès fauteuil.",
    departure: "Hôtel de Ville",
    arrival: "Parc Sud",
    schedule: "5h30 - 0h30",
    image: "/assets/transports/tramT2.jpg",
  },
  {
    id: 3,
    name: "Taxi Adapté",
    type: "Taxi",
    accessible: ["PMR", "Accompagnateur"],
    description:
      "Taxi sur réservation, accès fauteuil, accompagnement personnalisé.",
    departure: "Sur demande",
    arrival: "Sur demande",
    schedule: "24h/24",
    image: "/assets/transports/taxi.jpg",
  },
];

const accessibilityOptions = [
  { value: "PMR", label: "Accès PMR" },
  { value: "LSF", label: "Interprète LSF" },
  { value: "Audio", label: "Annonces audio" },
  { value: "Chien guide", label: "Chien guide accepté" },
  { value: "Accompagnateur", label: "Accompagnateur accepté" },
];

const TransportList = ({ transports = defaultTransports, onSelect }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState(null);

  // Filtrage dynamique
  const filteredTransports = transports.filter((transport) => {
    const matchesSearch =
      transport.name.toLowerCase().includes(search.toLowerCase()) ||
      transport.type.toLowerCase().includes(search.toLowerCase()) ||
      transport.departure.toLowerCase().includes(search.toLowerCase()) ||
      transport.arrival.toLowerCase().includes(search.toLowerCase());
    const matchesFilters =
      filters.length === 0 ||
      filters.every((f) => transport.accessible.includes(f));
    return matchesSearch && matchesFilters;
  });

  // Gestion des filtres accessibilité
  const handleFilterChange = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value],
    );
  };

  // Sélection d’un transport
  const handleSelect = (transport) => {
    setSelected(transport.id);
    onSelect && onSelect(transport);
  };

  return (
    <section
      className="transport-list"
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #1976d233",
        padding: "2.2rem",
        outline: "none",
      }}
      aria-label="Liste des transports accessibles"
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
        aria-label="Transports accessibles"
      >
        <span role="img" aria-label="transport">
          🚌
        </span>
        Transports Accessibles
      </h2>
      <div
        style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 12 }}
      >
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un transport, une ligne, un arrêt…"
          aria-label="Recherche de transport"
          style={{
            flex: 1,
            minWidth: 220,
            borderRadius: 8,
            border: "1px solid #1976d2",
            padding: "0.7em 1em",
            fontSize: 15,
          }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {accessibilityOptions.map((opt) => (
            <label
              key={opt.value}
              style={{
                background: filters.includes(opt.value) ? "#1976d2" : "#e3f2fd",
                color: filters.includes(opt.value) ? "#fff" : "#1976d2",
                borderRadius: 8,
                padding: "0.5em 1.1em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer",
                userSelect: "none",
                transition: "background 0.2s",
              }}
            >
              <input
                type="checkbox"
                checked={filters.includes(opt.value)}
                onChange={() => handleFilterChange(opt.value)}
                aria-checked={filters.includes(opt.value)}
                aria-label={opt.label}
                style={{ accentColor: "#1976d2", marginRight: 6 }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          marginTop: 18,
        }}
        aria-live="polite"
        tabIndex={0}
      >
        {filteredTransports.length === 0 && (
          <div
            style={{ color: "#b71c1c", fontWeight: 500, gridColumn: "1/-1" }}
          >
            Aucun transport trouvé pour ces critères.
          </div>
        )}
        {filteredTransports.map((transport) => (
          <article
            key={transport.id}
            className="transport-card"
            style={{
              background: selected === transport.id ? "#e3f2fd" : "#fafafa",
              border:
                selected === transport.id
                  ? "2px solid #1976d2"
                  : "1px solid #e3f2fd",
              borderRadius: 14,
              boxShadow: "0 1px 8px #1976d222",
              padding: "1.2em",
              cursor: "pointer",
              transition: "background 0.2s, border 0.2s",
            }}
            tabIndex={0}
            aria-label={`Transport ${transport.name}, ${transport.type}, départ ${transport.departure}, arrivée ${transport.arrival}`}
            onClick={() => handleSelect(transport)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && handleSelect(transport)
            }
            role="button"
            aria-pressed={selected === transport.id}
          >
            <img
              src={transport.image}
              alt={`Photo de ${transport.name}`}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 10,
                background: "#e3f2fd",
              }}
              loading="lazy"
            />
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1976d2" }}>
              {transport.name}
            </div>
            <div style={{ color: "#555", fontSize: 15, marginBottom: 4 }}>
              {transport.type}
            </div>
            <div style={{ color: "#888", fontSize: 14, marginBottom: 6 }}>
              {transport.departure} → {transport.arrival}
            </div>
            <div style={{ color: "#888", fontSize: 14, marginBottom: 6 }}>
              Horaires&nbsp;
              <span style={{ color: "#43a047", fontWeight: 600 }}>
                {transport.schedule}
              </span>
            </div>
            <div style={{ fontSize: 14, color: "#1976d2", marginBottom: 8 }}>
              {transport.accessible.map((a, i) => (
                <span
                  key={i}
                  style={{
                    background: "#e3fcec",
                    color: "#388e3c",
                    borderRadius: 6,
                    padding: "0.2em 0.7em",
                    fontSize: 13,
                    marginRight: 6,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>
              {transport.description}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(transport);
              }}
              aria-label={`Sélectionner ${transport.name}`}
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.5em 1.2em",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer",
                marginTop: 8,
                transition: "background 0.2s",
              }}
            >
              Sélectionner
            </button>
          </article>
        ))}
      </div>
      <footer
        style={{
          marginTop: 24,
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

export default TransportList;

/**
 * Documentation :
 * - Liste des transports accessibles : recherche, filtres, sélection, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */
