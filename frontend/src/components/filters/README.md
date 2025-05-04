# 📁 components/filters – Achiri

Ce dossier regroupe les filtres avancés pour la navigation et la recherche de rooms sur Achiri. Chaque filtre est conçu pour offrir une expérience utilisateur moderne, accessible, sécurisée, responsive et SEO friendly, avec un design avancé fidèle au branding Achiri.

---

## ✨ Composants inclus

- **RoomCategoryFilter.jsx**  
  Filtre par catégorie de room : sélection rapide, reset, accessibilité, sécurité, dark mode, SEO.

- **ProximityFilter.jsx**  
  Filtre géographique : sélection du rayon (slider), affichage dynamique, reset, accessibilité, sécurité, dark mode.

- **AccessibilityFilter.jsx**  
  Filtre d’accessibilité : LSF, vocal, contraste, reset, accessibilité, sécurité, dark mode.

---

## 🛠️ Fonctionnalités principales

- **UX avancée** : navigation fluide, feedback instantané, focus visible, transitions animées.
- **Accessibilité** : aria-labels, navigation clavier, contrastes, responsive, focus visible.
- **Sécurité** : aucune donnée sensible, feedback utilisateur, contrôle clavier.
- **Compatibilité mobile/web** : design mobile first, responsive, dark mode ready.
- **SEO** : structure sémantique, labels, titres, accessibilité renforcée.
- **Design Achiri** : branding couleurs, icônes, ombres, arrondis, animations.

---

## 📦 Structure type

```
/filters
  ├── RoomCategoryFilter.jsx
  ├── ProximityFilter.jsx
  ├── AccessibilityFilter.jsx
  ├── README.md
```

---

## 🚀 Utilisation

```jsx
import RoomCategoryFilter from "./RoomCategoryFilter";
import ProximityFilter from "./ProximityFilter";
import AccessibilityFilter from "./AccessibilityFilter";

// Exemple d'intégration
<RoomCategoryFilter
  categories={[{ id: "music", name: "Musique", icon: <FaMusic /> }]}
  selected="music"
  onChange={id => console.log("Catégorie filtrée :", id)}
/>
<ProximityFilter
  value={10}
  min={1}
  max={100}
  onChange={val => console.log("Rayon sélectionné :", val)}
/>
<AccessibilityFilter
  filters={{ signLanguage: true, voiceOver: false, highContrast: false }}
  onChange={filters => console.log("Filtres accessibilité :", filters)}
/>
```

---

## 📝 Bonnes pratiques & extension

- **Extensible** : ajoutez facilement badges, analytics, favoris, etc.
- **Séparation des responsabilités** : chaque composant gère une logique métier claire.
- **Styles** : intégrés ou personnalisés pour responsive, dark mode, focus visible…
- **Accessibilité** : toujours vérifier les labels, le focus, la navigation clavier.
- **Sécurité** : ne jamais stocker ou afficher d’informations sensibles côté client.

---

## 📚 Documentation rapide

- **RoomCategoryFilter.jsx**  
  Filtre par catégorie, reset, accessibilité, dark mode.

- **ProximityFilter.jsx**  
  Filtre géographique (slider), reset, accessibilité, dark mode.

- **AccessibilityFilter.jsx**  
  Filtres LSF, vocal, contraste, reset, accessibilité, dark mode.

---

## 💡 Astuce

> Combine plusieurs filtres pour trouver la room idéale sur Achiri !

---

## 🏷️ Branding & SEO

- Couleurs, icônes et styles fidèles à Achiri.
- Structure sémantique, titres, aria-labels, responsive, dark mode.

---

## 🛡️ Licence

© {année en cours} Achiri – Tous droits réservés.
