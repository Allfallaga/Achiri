import React from "react";
import PropTypes from "prop-types";
import { FaFilter, FaTimesCircle } from "react-icons/fa";
// Importe le fichier CSS dédié
import "./RoomCategoryFilter.css";

/**
 * RoomCategoryFilter – Achiri
 * Filtre de catégories de rooms avec sélection rapide, accessibilité, et design Achiri.
 * Utilise les variables CSS globales pour la thématisation et la cohérence.
 *
 * Props :
 *   - categories: Array<{ id: string, name: string, icon?: React.ReactNode }> - Liste des catégories.
 *   - selected: string - ID de la catégorie actuellement sélectionnée.
 *   - onChange: function(categoryId: string) - Callback appelé lors du changement de sélection.
 *   - showReset: boolean - Afficher ou non le bouton de réinitialisation.
 */
const RoomCategoryFilter = ({
  categories = [],
  selected = "",
  onChange,
  showReset = true,
}) => {
  // Handler pour éviter les appels onChange inutiles si on clique sur la catégorie déjà sélectionnée
  const handleCategoryClick = (categoryId) => {
    if (onChange && categoryId !== selected) {
      onChange(categoryId);
    }
  };

  // Handler pour le reset
  const handleResetClick = () => {
    if (onChange && selected !== "") {
      onChange("");
    }
  };

  return (
    // Utilisation de <nav> pour la sémantique de navigation/filtrage
    <nav className="room-category-filter" aria-label="Filtrer par catégorie">
      {/* Label du filtre avec icône */}
      <span className="room-category-filter-label">
        <FaFilter aria-hidden="true" /> Catégories&nbsp;:
      </span>

      {/* Mappe les catégories pour créer les boutons */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          // Applique la classe 'selected' si la catégorie est sélectionnée
          className={`room-category-filter-btn${selected === cat.id ? " selected" : ""}`}
          onClick={() => handleCategoryClick(cat.id)}
          // aria-pressed indique l'état du bouton (pressé/sélectionné ou non)
          aria-pressed={selected === cat.id}
          aria-label={`Filtrer par ${cat.name}`}
          // Les boutons sont focusables par défaut, pas besoin de tabIndex={0}
        >
          {/* Affiche l'icône si elle existe */}
          {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
          {cat.name}
        </button>
      ))}

      {/* Affiche le bouton Reset si showReset est vrai et qu'un filtre est actif */}
      {showReset && selected && (
        <button
          className="room-category-filter-reset"
          onClick={handleResetClick}
          aria-label="Réinitialiser le filtre"
        >
          <FaTimesCircle aria-hidden="true" /> Réinitialiser
        </button>
      )}
    </nav>
  );
};

// Définition des types de props pour la validation et la documentation
RoomCategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.node, // L'icône est optionnelle
    }),
  ),
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired, // onChange est requis pour que le filtre fonctionne
  showReset: PropTypes.bool,
};

// Valeurs par défaut pour les props optionnelles
RoomCategoryFilter.defaultProps = {
  categories: [],
  selected: "",
  showReset: true,
};

export default RoomCategoryFilter;

/**
 * ==========================================================================
 * Documentation Composant: RoomCategoryFilter
 * ==========================================================================
 * Objectif: Fournir une interface de filtrage par catégorie claire, accessible
 *           et cohérente avec le design system d'Achiri.
 *
 * Fonctionnalités Clés:
 * - Affichage des catégories sous forme de boutons cliquables.
 * - Indication visuelle claire de la catégorie sélectionnée.
 * - Bouton optionnel pour réinitialiser le filtre.
 * - Utilisation des variables CSS globales (`variables.css`) pour le style.
 * - Design responsive (s'adapte aux différentes tailles d'écran).
 * - Support Dark Mode (via variables CSS et `prefers-color-scheme`).
 *
 * Accessibilité (A11y):
 * - Utilisation de `<nav>` avec `aria-label` pour la sémantique.
 * - Boutons avec `aria-pressed` pour indiquer l'état de sélection.
 * - `aria-label` descriptifs pour chaque bouton.
 * - Icônes décoratives cachées aux lecteurs d'écran (`aria-hidden="true"`).
 * - Styles `:focus-visible` clairs pour la navigation au clavier (définis dans CSS).
 * - Contrastes de couleurs gérés par les variables CSS (à vérifier selon WCAG).
 *
 * Sécurité:
 * - Pas de manipulation directe du DOM potentiellement dangereuse.
 * - Les données (catégories) sont passées via props, éviter l'injection si elles proviennent de sources externes non fiables.
 *
 * SEO:
 * - Utilise des éléments HTML sémantiques (`nav`, `button`).
 * - Le contenu textuel (labels, noms de catégorie) est indexable.
 *
 * Utilisation:
 * ```jsx
 * import RoomCategoryFilter from './RoomCategoryFilter';
 * import { FaCode, FaMusic, FaPaintBrush } from 'react-icons/fa';
 *
 * const MyComponent = () => {
 *   const [selectedCategory, setSelectedCategory] = useState('');
 *   const categories = [
 *     { id: 'dev', name: 'Développement', icon: <FaCode /> },
 *     { id: 'music', name: 'Musique', icon: <FaMusic /> },
 *     { id: 'art', name: 'Art & Design', icon: <FaPaintBrush /> },
 *   ];
 *
 *   return (
 *     <RoomCategoryFilter
 *       categories={categories}
 *       selected={selectedCategory}
 *       onChange={setSelectedCategory}
 *       showReset={true}
 *     />
 *   );
 * }
 * ```
 *
 * Dépendances:
 * - `react`, `prop-types`
 * - `react-icons` (pour les icônes d'exemple)
 * - `./RoomCategoryFilter.css` (feuille de style dédiée)
 * - `../../styles/variables.css` (variables globales CSS)
 *
 * Extensions Futures Possibles:
 * - Affichage du nombre de rooms par catégorie.
 * - Filtres multiples.
 * - Animation lors de la sélection/désélection.
 * - Intégration avec des state managers (Redux, Zustand...).
 */
