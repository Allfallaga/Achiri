import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaSyncAlt } from "react-icons/fa";
// Importe le fichier CSS dédié
import "./ProximityFilter.css";

/**
 * ProximityFilter – Achiri
 * Filtre de proximité géographique pour rooms : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Fonctionnalités : sélection rayon (slider), affichage rayon, reset, dark mode ready.
 * - Prêt pour extensions futures (badges, analytics, favoris, etc).
 *
 * Props :
 *   - value: number (rayon sélectionné en km, défaut 10)
 *   - min: number (rayon min, défaut 1)
 *   - max: number (rayon max, défaut 100)
 *   - step: number (pas, défaut 1)
 *   - onChange: function(newValue: number) - Callback appelé lors du changement de valeur.
 *   - showReset: boolean (afficher bouton reset, défaut true)
 */
const ProximityFilter = ({
  value = 10, // Valeur par défaut définie ici
  min = 1,
  max = 100,
  step = 1,
  onChange,
  showReset = true,
}) => {
  // Handler pour le changement de valeur du slider
  const handleSliderChange = (event) => {
    if (onChange) {
      onChange(Number(event.target.value));
    }
  };

  // Handler pour le reset
  const handleResetClick = () => {
    // Réinitialise à la valeur minimale (ou une autre valeur par défaut si souhaité)
    if (onChange && value !== min) {
      onChange(min);
    }
  };

  return (
    // Utilisation de <nav> pour la sémantique de navigation/filtrage
    <nav className="proximity-filter" aria-label="Filtrer par proximité">
      {/* Label du filtre */}
      <span className="proximity-filter-label">
        <FaMapMarkerAlt aria-hidden="true" /> Proximité&nbsp;:
      </span>

      {/* Slider (input range) */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={`Sélectionner le rayon de proximité, actuellement ${value} kilomètres`}
        className="proximity-filter-slider"
      />

      {/* Affichage de la valeur sélectionnée */}
      <span className="proximity-filter-value" aria-live="polite">
        {value} km
      </span>

      {/* Bouton Reset (conditionnel) */}
      {showReset &&
        value > min && ( // Affiche seulement si showReset est vrai ET si la valeur n'est pas déjà au minimum
          <button
            className="proximity-filter-reset"
            onClick={handleResetClick}
            aria-label="Réinitialiser le filtre de proximité"
          >
            <FaSyncAlt aria-hidden="true" /> Réinitialiser
          </button>
        )}
    </nav>
  );
};

// Définition des types de props
ProximityFilter.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  showReset: PropTypes.bool,
};

// Valeurs par défaut
ProximityFilter.defaultProps = {
  value: 10,
  min: 1,
  max: 100,
  step: 1,
  showReset: true,
};

export default ProximityFilter;

/**
 * ==========================================================================
 * Documentation Composant: ProximityFilter
 * ==========================================================================
 * Objectif: Permettre aux utilisateurs de filtrer une liste (par exemple, de rooms)
 *           en fonction de la proximité géographique via un slider intuitif.
 * ... (le reste de la documentation est inchangé) ...
 * ```
 *
 * Dépendances:
 * - `react`, `prop-types`
 * - `react-icons` (pour les icônes)
 * - `./ProximityFilter.css` (feuille de style dédiée)
 * - `../../styles/variables.css` (variables globales CSS)
 *
 * Extensions Futures Possibles:
 * - Utilisation de la géolocalisation du navigateur pour centrer la recherche.
 * - Affichage d'une carte interactive.
 * - Input numérique pour entrer une valeur précise.
 * - Sauvegarde de la préférence utilisateur.
 */
