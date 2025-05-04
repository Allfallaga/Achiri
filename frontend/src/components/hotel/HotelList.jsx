import React, { useState } from "react";

/**
 * HotelList – Achiri
 * Liste d’hôtels accessibles : recherche, filtres, accessibilité, sécurité, mobile/web, design avancé.
 * - UX avancée, accessibilité, sécurité, responsive, SEO friendly, design Achiri.
 * - Fonctionnalités : recherche, filtres accessibilité, affichage liste/carte, feedback utilisateur.
 * - Prêt pour extensions futures (API, favoris, dark mode, analytics, etc).
 *
 * Props :
 *   hotels?: array (liste d’hôtels à afficher)
 *   onSelect?: function (callback lors de la sélection d’un hôtel)
 */

const defaultHotels = [
  {
    id: 1,
    name: "Hôtel Inclusif",
    address: "12 rue de l’Accessibilité, Paris",
    rating: 4.7,
    accessible: ["PMR", "LSF", "Chien guide"],
    description: "Chambres adaptées, accueil LSF, animaux d’assistance acceptés.",
    image: "/assets/hotels/inclusif.jpg"
  },
  {
    id: 2,
    name: "Résidence Confort+",
    address: "8 avenue des Droits, Lyon",
    rating: 4.5,
    accessible: ["PMR", "Accompagnateur"],
    description: "Accès fauteuil, accompagnement personnalisé, proche transports.",
    image: "/assets/hotels/confort.jpg"
  },
  {
    id: 3,
    name: "Séjour Zen",
    address: "5 place de la Paix, Marseille",
    rating: 4.2,
    accessible: ["PMR"],
    description: "Chambres spacieuses, ascenseur large, parking accessible.",
    image: "/assets/hotels/zen.jpg"
  }
];

const accessibilityOptions = [
  { value: "PMR", label: "Accès PMR" },
  { value: "LSF", label: "Interprète LSF" },
  { value: "Chien guide", label: "Chien guide accepté" },
  { value: "Accompagnateur", label: "Accompagnateur accepté" }
];

const HotelList = ({
  hotels = defaultHotels,
  onSelect
}) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState(null);

  // Filtrage dynamique
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.address.toLowerCase().includes(search.toLowerCase());
    const matchesFilters =
      filters.length === 0 ||
      filters.every(f => hotel.accessible.includes(f));
    return matchesSearch && matchesFilters;
  });

  // Gestion des filtres accessibilité
  const handleFilterChange = (value) => {
    setFilters(prev =>
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  // Sélection d’un hôtel
  const handleSelect = (hotel) => {
    setSelected(hotel.id);
    onSelect && onSelect(hotel);
  };

  return (
    <section
      className="hotel-list"
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 2px 18px #1976d233",
        padding: "2.2rem",
        outline: "none"
      }}
      aria-label="Liste d’hôtels accessibles"
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
          gap: 10
        }}
        tabIndex={0}
        aria-label="Hôtels accessibles"
      >
        <span role="img" aria-label="hôtel">🏨</span>
        Hôtels Accessibles
      </h2>
      <div style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 12 }}>
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un hôtel ou une ville…"
          aria-label="Recherche d’hôtel"
          style={{
            flex: 1,
            minWidth: 220,
            borderRadius: 8,
            border: "1px solid #1976d2",
            padding: "0.7em 1em",
            fontSize: 15
          }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {accessibilityOptions.map(opt => (
            <label key={opt.value} style={{
              background: filters.includes(opt.value) ? "#1976d2" : "#e3f2fd",
              color: filters.includes(opt.value) ? "#fff" : "#1976d2",
              borderRadius: 8,
              padding: "0.5em 1.1em",
              fontWeight: "bold",
              fontSize: 15,
              cursor: "pointer",
              userSelect: "none",
              transition: "background 0.2s"
            }}>
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
          marginTop: 18
        }}
        aria-live="polite"
        tabIndex={0}
      >
        {filteredHotels.length === 0 && (
          <div style={{ color: "#b71c1c", fontWeight: 500, gridColumn: "1/-1" }}>
            Aucun hôtel trouvé pour ces critères.
          </div>
        )}
        {filteredHotels.map(hotel => (
          <article
            key={hotel.id}
            className="hotel-card"
            style={{
              background: selected === hotel.id ? "#e3f2fd" : "#fafafa",
              border: selected === hotel.id ? "2px solid #1976d2" : "1px solid #e3f2fd",
              borderRadius: 14,
              boxShadow: "0 1px 8px #1976d222",
              padding: "1.2em",
              cursor: "pointer",
              transition: "background 0.2s, border 0.2s"
            }}
            tabIndex={0}
            aria-label={`Hôtel ${hotel.name}, ${hotel.address}, note ${hotel.rating}`}
            onClick={() => handleSelect(hotel)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleSelect(hotel)}
            role="button"
            aria-pressed={selected === hotel.id}
          >
            <img
              src={hotel.image}
              alt={`Photo de ${hotel.name}`}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 10,
                background: "#e3f2fd"
              }}
              loading="lazy"
            />
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1976d2" }}>{hotel.name}</div>
            <div style={{ color: "#555", fontSize: 15, marginBottom: 4 }}>{hotel.address}</div>
            <div style={{ color: "#888", fontSize: 14, marginBottom: 6 }}>
              Note&nbsp;
              <span style={{ color: "#43a047", fontWeight: 600 }}>{hotel.rating} ★</span>
            </div>
            <div style={{ fontSize: 14, color: "#1976d2", marginBottom: 8 }}>
              {hotel.accessible.map((a, i) => (
                <span key={i} style={{
                  background: "#e3fcec",
                  color: "#388e3c",
                  borderRadius: 6,
                  padding: "0.2em 0.7em",
                  fontSize: 13,
                  marginRight: 6
                }}>
                  {a}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>
              {hotel.description}
            </div>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); handleSelect(hotel); }}
              aria-label={`Sélectionner ${hotel.name}`}
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
                transition: "background 0.2s"
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
          textAlign: "center"
        }}
      >
        <span role="img" aria-label="sécurité">🔒</span> Sécurisé | <span role="img" aria-label="accessibilité">♿</span> Accessible | <span role="img" aria-label="mobile">📱</span> Mobile/Web
      </footer>
    </section>
  );
};

export default HotelList;

/**
 * Documentation :
 * - Liste d’hôtels accessibles : recherche, filtres, sélection, feedback utilisateur.
 * - Accessibilité : aria-labels, navigation clavier, responsive, SEO ready.
 * - Sécurité : pas d’info sensible, feedback utilisateur, contrôle clavier.
 * - Design avancé, branding Achiri, mobile first, prêt pour extensions futures.
 */