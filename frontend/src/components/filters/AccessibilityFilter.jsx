import React from "react";
import PropTypes from "prop-types";
import {
  FaUniversalAccess,
  FaSignLanguage,
  FaVolumeUp,
  FaLowVision,
  FaSyncAlt,
} from "react-icons/fa";
// Importe le fichier CSS dédié
import "./AccessibilityFilter.css";

/**
 * AccessibilityFilter – Achiri
 * Filtre d’accessibilité pour rooms : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.
 * - Fonctionnalités : filtres LSF, vocal, contraste, reset, dark mode ready.
 * - Prêt pour extensions futures (badges, analytics, favoris, etc).
 *
 * Props :
 *   - filters: Object<{ signLanguage: boolean, voiceOver: boolean, highContrast: boolean }> - État actuel des filtres.
 *   - onChange: function(newFilters: Object) - Callback appelé lors du changement d'un filtre.
 *   - showReset: boolean - Afficher ou non le bouton de réinitialisation (défaut: true).
 */

// Objet contenant les valeurs par défaut des filtres
const defaultFilters = {
  signLanguage: false,
  voiceOver: false,
  highContrast: false,
};

const AccessibilityFilter = ({
  filters = defaultFilters, // Utilise les valeurs par défaut si non fournies
  onChange,
  showReset = true,
}) => {
  // Handler pour basculer l'état d'un filtre
  const handleToggle = (key) => {
    if (onChange) {
      // Crée un nouvel objet de filtres avec la valeur basculée
      onChange({ ...filters, [key]: !filters[key] });
    }
  };

  // Handler pour réinitialiser tous les filtres aux valeurs par défaut
  const handleReset = () => {
    // Vérifie si un changement est nécessaire avant d'appeler onChange
    if (
      onChange &&
      JSON.stringify(filters) !== JSON.stringify(defaultFilters)
    ) {
      onChange({ ...defaultFilters });
    }
  };

  // Vérifie si au moins un filtre est actif pour conditionner l'affichage du reset
  const isAnyFilterActive = Object.values(filters).some(
    (value) => value === true,
  );

  return (
    // Utilisation de <nav> pour la sémantique de navigation/filtrage
    <nav
      className="accessibility-filter"
      aria-label="Filtrer par accessibilité"
      // tabIndex={0} retiré, les éléments internes sont focusables
    >
      {/* Label principal du filtre */}
      <span className="accessibility-filter-label">
        <FaUniversalAccess aria-hidden="true" /> Accessibilité&nbsp;:
      </span>

      {/* Filtre Langue des Signes */}
      <label className="accessibility-filter-switch">
        <FaSignLanguage aria-hidden="true" />
        <span>LSF</span>
        <input
          type="checkbox"
          checked={filters.signLanguage}
          onChange={() => handleToggle("signLanguage")}
          aria-checked={filters.signLanguage} // aria-checked est important
          aria-label="Filtrer les rooms accessibles en Langue des Signes Française" // Label plus précis
        />
      </label>

      {/* Filtre Lecture Vocale */}
      <label className="accessibility-filter-switch">
        <FaVolumeUp aria-hidden="true" />
        <span>Vocal</span>
        <input
          type="checkbox"
          checked={filters.voiceOver}
          onChange={() => handleToggle("voiceOver")}
          aria-checked={filters.voiceOver}
          aria-label="Filtrer les rooms compatibles avec la lecture vocale (VoiceOver/TalkBack)" // Label plus précis
        />
      </label>

      {/* Filtre Contraste Élevé */}
      <label className="accessibility-filter-switch">
        <FaLowVision aria-hidden="true" />
        <span>Contraste</span>
        <input
          type="checkbox"
          checked={filters.highContrast}
          onChange={() => handleToggle("highContrast")}
          aria-checked={filters.highContrast}
          aria-label="Filtrer les rooms conçues avec un contraste élevé" // Label plus précis
        />
      </label>

      {/* Bouton Reset (conditionnel) */}
      {showReset &&
        isAnyFilterActive && ( // Affiche si showReset est vrai ET au moins un filtre est actif
          <button
            className="accessibility-filter-reset"
            onClick={handleReset}
            aria-label="Réinitialiser les filtres d'accessibilité"
          >
            <FaSyncAlt aria-hidden="true" /> Réinitialiser
          </button>
        )}
    </nav>
  );
};

// Définition des types de props pour la validation et la documentation
AccessibilityFilter.propTypes = {
  filters: PropTypes.shape({
    signLanguage: PropTypes.bool,
    voiceOver: PropTypes.bool,
    highContrast: PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired, // onChange est requis pour l'interactivité
  showReset: PropTypes.bool,
};

// Valeurs par défaut pour les props optionnelles
AccessibilityFilter.defaultProps = {
  filters: defaultFilters, // Utilise l'objet défini plus haut
  showReset: true,
};

export default AccessibilityFilter;

/**
 * ==========================================================================
 * Documentation Composant: AccessibilityFilter
 * ==========================================================================
 * Objectif: Fournir une interface permettant aux utilisateurs de filtrer
 *           des éléments (ex: rooms) selon des critères d'accessibilité spécifiques.
 *
 * Fonctionnalités Clés:
 * - Cases à cocher pour activer/désactiver les filtres : LSF, Lecture Vocale, Contraste Élevé.
 * - Indication visuelle claire de l'état de chaque filtre.
 * - Bouton optionnel pour réinitialiser tous les filtres d'accessibilité.
 * - Utilisation des variables CSS globales (`variables.css`) pour le style.
 * - Design responsive et support Dark Mode via CSS.
 *
 * Accessibilité (A11y):
 * - Utilisation de `<nav>` avec `aria-label` pour la sémantique.
 * - Chaque filtre est un `<label>` contenant l'icône, le texte et l'`<input type="checkbox">`.
 * - `aria-checked` sur les checkboxes pour indiquer leur état.
 * - `aria-label` descriptifs pour chaque checkbox et le bouton reset.
 * - Icônes décoratives cachées (`aria-hidden="true"`).
 * - Styles `:focus-within` sur les labels et `:focus-visible` sur le bouton reset pour la navigation clavier.
 * - Contrastes de couleurs gérés par les variables CSS.
 *
 * Sécurité:
 * - Pas de manipulation directe du DOM.
 * - Validation des props via PropTypes.
 * - Les données de filtre sont gérées via l'état du composant parent (passé via `filters` et `onChange`).
 *
 * SEO:
 * - Utilise des éléments HTML sémantiques (`nav`, `label`, `input`, `button`).
 * - Le contenu textuel (labels) est indexable.
 *
 * Utilisation:
 * ```jsx
 * import React, { useState } from 'react';
 * import AccessibilityFilter from './AccessibilityFilter';
 *
 * const MyComponent = () => {
 *   const [activeFilters, setActiveFilters] = useState({
 *     signLanguage: false,
 *     voiceOver: false,
 *     highContrast: false,
 *   });
 *
 *   // Logique pour utiliser activeFilters pour filtrer des données...
 *
 *   return (
 *     <AccessibilityFilter
 *       filters={activeFilters}
 *       onChange={setActiveFilters}
 *       showReset={true}
 *     />
 *   );
 * }
 * ```
 *
 * Dépendances:
 * - `react`, `prop-types`
 * - `react-icons` (pour les icônes)
 * - `./AccessibilityFilter.css` (feuille de style dédiée)
 * - `../../styles/variables.css` (variables globales CSS)
 *
 * Extensions Futures Possibles:
 * - Ajout d'autres critères d'accessibilité (ex: taille de police, navigation clavier spécifique).
 * - Affichage du nombre d'éléments correspondants à chaque filtre.
 * - Sauvegarde des préférences utilisateur.
 */
