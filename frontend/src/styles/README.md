# Styles CSS pour Achiri Frontend

**Répertoire centralisant les feuilles de style globales et spécifiques aux composants pour l'interface utilisateur d'Achiri.**

Notre objectif est de créer une expérience utilisateur **moderne, inclusive, accessible, sécurisée, performante, responsive (mobile/web)** et **optimisée pour le SEO**, tout en reflétant l'identité visuelle d'Achiri.

---

## Structure du dossier

Ce dossier contient les fichiers CSS fondamentaux et spécifiques aux fonctionnalités :

-   **`variables.css`**: **Fondation du Design System.** Définit toutes les variables CSS (custom properties) pour les couleurs (palettes primaire, secondaire, sémantique, niveaux de gris), la typographie (familles, tailles, graisses, interlignes), les espacements, les tailles, les bordures, les rayons, les ombres, les transitions, les z-index et les points de rupture. Essentiel pour la cohérence et la thématisation (light/dark mode).
-   **`index.css`**: **Styles Globaux & Reset.** Applique un reset CSS moderne, définit les styles de base pour `html`, `body`, les éléments typographiques (`h1`-`h6`, `p`, `a`), les médias (`img`, `picture`...), les listes, les formulaires de base (`button`, `input`, `select`, `textarea`), et inclut des utilitaires d'accessibilité (`sr-only`, `:focus-visible`). Importe `variables.css`.
-   **`accessibility.css`**: (Nom suggéré, à créer si besoin) Styles spécifiques pour améliorer ou surcharger l'accessibilité : modes de contraste élevé, ajustements pour `prefers-reduced-motion`, styles spécifiques pour les rôles ARIA, support LSF visuel si nécessaire en dehors des composants.
-   **`videocall.css`**: Styles pour l'interface d'appel vidéo standard (grille de participants, contrôles, aperçu local).
-   **`videochat.css`**: Styles pour l'interface combinant vidéo et chat textuel (layout vidéo + sidebar/section chat).
-   **`videoClassRoom3D.css`**: Styles avancés pour l'environnement de classe virtuelle 3D (cartes participants, avatars, overlays d'infos, contrôles modération, sous-titres, LSF, responsive, dark mode).
-   **`challenges.css`**: (Existant) Styles pour la gestion et l’affichage des challenges (listes, cartes, leaderboard, feedback visuel, animations, états focus).
-   **`creatorTools.css`**: (Existant) Styles pour les outils dédiés aux créateurs (upload, éditeurs, prévisualisations, planification, formulaires spécifiques).
-   **`notifications.css`**: (Existant) Styles pour le système de notifications (toasts, bannières, indicateurs, états lus/non lus, actions).
-   **(Autres fichiers à venir)**: Chaque nouveau composant ou fonctionnalité majeure nécessitant des styles spécifiques devrait avoir son propre fichier CSS (ex: `profileCard.css`, `dashboardWidgets.css`, `settingsForm.css`).

---

## Principes & Bonnes Pratiques

Le développement CSS pour Achiri suit ces principes directeurs :

1.  **Variables CSS Partout**: Utiliser systématiquement les variables définies dans `variables.css` pour assurer la cohérence et faciliter la maintenance et la thématisation.
2.  **Mobile-First & Responsive**: Concevoir d'abord pour les petits écrans et utiliser des media queries (`min-width`) pour adapter le layout aux écrans plus larges. Tester sur une variété d'appareils et de résolutions.
3.  **Accessibilité (A11y) au Cœur**:
    *   **Contrastes**: Assurer des ratios de contraste suffisants (WCAG AA minimum) pour le texte et les éléments interactifs, en utilisant les variables de couleur de manière réfléchie.
    *   **Focus Visible**: Implémenter des styles `:focus-visible` clairs et cohérents pour tous les éléments interactifs.
    *   **Navigation Clavier**: S'assurer que tous les éléments interactifs sont atteignables et utilisables au clavier.
    *   **Sémantique HTML**: Le CSS doit compléter une structure HTML sémantique. Utiliser les classes pour le style, pas pour la sémantique.
    *   **ARIA**: Ne pas masquer les attributs ARIA essentiels avec `display: none` si l'élément doit rester accessible aux technologies d'assistance. Utiliser `.sr-only` si nécessaire.
    *   **Mouvement Réduit**: Respecter la préférence `prefers-reduced-motion` en désactivant ou réduisant les animations non essentielles.
4.  **Performance**:
    *   **Animations Fluides**: Privilégier les transformations CSS (`transform`, `opacity`) pour les animations.
    *   **Sélecteurs Efficaces**: Éviter les sélecteurs trop complexes ou universels non nécessaires.
    *   **Taille des Fichiers**: Garder les fichiers CSS concis et bien organisés. Envisager des outils de build pour la minification et la purge (si applicable).
5.  **Convention de Nommage (Ex: BEM)**: Adopter une convention de nommage claire et cohérente (comme BEM - Block, Element, Modifier) pour éviter les conflits et améliorer la lisibilité. Exemple : `.video-card__button--active`.
6.  **Modularité & Réutilisabilité**: Créer des styles spécifiques aux composants dans leurs propres fichiers. Identifier les motifs répétitifs pour créer des classes utilitaires ou des composants stylisés réutilisables.
7.  **Sécurité**: Éviter d'utiliser `url()` avec des sources non fiables. Ne pas utiliser de styles pour masquer des informations sensibles qui devraient être gérées côté serveur ou via JavaScript.
8.  **Design Avancé & Cohérent**: Appliquer les éléments de design d'Achiri (gradients, ombres, rayons définis dans `variables.css`) de manière cohérente. Fournir un feedback visuel clair pour les interactions utilisateur (hover, focus, active, disabled).
9.  **Support Dark Mode**: Utiliser la media query `prefers-color-scheme: dark` pour surcharger les variables CSS nécessaires et adapter l'apparence au thème sombre.
10. **Documentation**: Maintenir ce `README.md` à jour. Ajouter des commentaires dans le CSS lorsque la logique est complexe ou non évidente.

---

## Comment Contribuer

1.  **Consulter `variables.css`**: Avant d'ajouter une couleur, une taille de police, un espacement, etc., vérifier s'il existe déjà une variable appropriée.
2.  **Créer un Fichier Dédié**: Pour un nouveau composant majeur, créer un nouveau fichier CSS (ex: `NewFeature.css`) et l'importer là où il est nécessaire (souvent au niveau du composant JS/TSX).
3.  **Respecter la Convention de Nommage**: Utiliser la convention choisie (ex: BEM) pour nommer les classes.
4.  **Tester Rigoureusement**:
    *   **Responsive**: Tester sur différentes largeurs d'écran (outils de développement navigateur, appareils réels si possible).
    *   **Navigateurs**: Tester sur les navigateurs cibles principaux (Chrome, Firefox, Safari, Edge).
    *   **Accessibilité**: Utiliser des outils (ex: Lighthouse, Axe DevTools), naviguer au clavier, vérifier les contrastes, tester avec un lecteur d'écran si possible.
    *   **Dark Mode**: Vérifier le rendu en mode clair et sombre.
5.  **Documenter**: Mettre à jour ce `README.md` si un nouveau fichier est ajouté ou si des changements majeurs sont apportés à la structure ou aux principes. Ajouter des commentaires dans le code CSS si nécessaire.
6.  **Optimiser**: Garder un œil sur la performance et la taille des fichiers.

---

## Extensions et Fonctionnalités Futures

Ce système de styles est conçu pour évoluer et supporter :

-   **Système de Badges et Gamification**
-   **Notifications Avancées et Centre de Notifications**
-   **Thèmes Utilisateur Personnalisables** (au-delà de light/dark)
-   **Mode Contraste Élevé Amélioré**
-   **Support Multi-langues** (styles spécifiques si nécessaire pour `direction: rtl`, etc.)
-   **Bibliothèque de Composants UI Réutilisables** (Cards, Modals, Tooltips, Dropdowns, etc.)
-   **Micro-interactions et Animations Significatives**
-   **Intégration LSF plus poussée** (si nécessaire)

---

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**
```

**Modifications Apportées :**

1.  **Structure du Dossier Mise à Jour** : Ajout des fichiers `index.css`, `videocall.css`, `videochat.css`, `videoClassRoom3D.css` avec des descriptions plus détaillées de leur rôle. Clarification du rôle de `variables.css` comme fondation du Design System.
2.  **Principes Détaillés** : Les principes ont été réorganisés, numérotés et développés pour être plus explicites (Mobile-First, Convention de Nommage BEM, Performance, Modularité, Dark Mode...).
3.  **Contribution Clarifiée** : Les étapes pour contribuer sont plus précises et actionnables, mettant l'accent sur l'utilisation des variables, les tests (responsive, navigateurs, accessibilité, dark mode) et la documentation.
4.  **Extensions Futures Affinées** : La liste des extensions a été rendue plus spécifique.
5.  **Introduction et Conclusion Renforcées** : Réaffirmation des objectifs généraux du système de styles.
6.  **Formatage Amélioré** : Utilisation de listes à puces et de mise en gras pour une meilleure lisibilité.

Ce README devrait maintenant servir de référence solide pour toute personne travaillant sur les styles de l'application Achiri.<!-- filepath: /workspaces/Achiri/frontend/src/styles/README.md -->
# Styles CSS pour Achiri Frontend

**Répertoire centralisant les feuilles de style globales et spécifiques aux composants pour l'interface utilisateur d'Achiri.**

Notre objectif est de créer une expérience utilisateur **moderne, inclusive, accessible, sécurisée, performante, responsive (mobile/web)** et **optimisée pour le SEO**, tout en reflétant l'identité visuelle d'Achiri.

---

## Structure du dossier

Ce dossier contient les fichiers CSS fondamentaux et spécifiques aux fonctionnalités :

-   **`variables.css`**: **Fondation du Design System.** Définit toutes les variables CSS (custom properties) pour les couleurs (palettes primaire, secondaire, sémantique, niveaux de gris), la typographie (familles, tailles, graisses, interlignes), les espacements, les tailles, les bordures, les rayons, les ombres, les transitions, les z-index et les points de rupture. Essentiel pour la cohérence et la thématisation (light/dark mode).
-   **`index.css`**: **Styles Globaux & Reset.** Applique un reset CSS moderne, définit les styles de base pour `html`, `body`, les éléments typographiques (`h1`-`h6`, `p`, `a`), les médias (`img`, `picture`...), les listes, les formulaires de base (`button`, `input`, `select`, `textarea`), et inclut des utilitaires d'accessibilité (`sr-only`, `:focus-visible`). Importe `variables.css`.
-   **`accessibility.css`**: (Nom suggéré, à créer si besoin) Styles spécifiques pour améliorer ou surcharger l'accessibilité : modes de contraste élevé, ajustements pour `prefers-reduced-motion`, styles spécifiques pour les rôles ARIA, support LSF visuel si nécessaire en dehors des composants.
-   **`videocall.css`**: Styles pour l'interface d'appel vidéo standard (grille de participants, contrôles, aperçu local).
-   **`videochat.css`**: Styles pour l'interface combinant vidéo et chat textuel (layout vidéo + sidebar/section chat).
-   **`videoClassRoom3D.css`**: Styles avancés pour l'environnement de classe virtuelle 3D (cartes participants, avatars, overlays d'infos, contrôles modération, sous-titres, LSF, responsive, dark mode).
-   **`challenges.css`**: (Existant) Styles pour la gestion et l’affichage des challenges (listes, cartes, leaderboard, feedback visuel, animations, états focus).
-   **`creatorTools.css`**: (Existant) Styles pour les outils dédiés aux créateurs (upload, éditeurs, prévisualisations, planification, formulaires spécifiques).
-   **`notifications.css`**: (Existant) Styles pour le système de notifications (toasts, bannières, indicateurs, états lus/non lus, actions).
-   **(Autres fichiers à venir)**: Chaque nouveau composant ou fonctionnalité majeure nécessitant des styles spécifiques devrait avoir son propre fichier CSS (ex: `profileCard.css`, `dashboardWidgets.css`, `settingsForm.css`).

---

## Principes & Bonnes Pratiques

Le développement CSS pour Achiri suit ces principes directeurs :

1.  **Variables CSS Partout**: Utiliser systématiquement les variables définies dans `variables.css` pour assurer la cohérence et faciliter la maintenance et la thématisation.
2.  **Mobile-First & Responsive**: Concevoir d'abord pour les petits écrans et utiliser des media queries (`min-width`) pour adapter le layout aux écrans plus larges. Tester sur une variété d'appareils et de résolutions.
3.  **Accessibilité (A11y) au Cœur**:
    *   **Contrastes**: Assurer des ratios de contraste suffisants (WCAG AA minimum) pour le texte et les éléments interactifs, en utilisant les variables de couleur de manière réfléchie.
    *   **Focus Visible**: Implémenter des styles `:focus-visible` clairs et cohérents pour tous les éléments interactifs.
    *   **Navigation Clavier**: S'assurer que tous les éléments interactifs sont atteignables et utilisables au clavier.
    *   **Sémantique HTML**: Le CSS doit compléter une structure HTML sémantique. Utiliser les classes pour le style, pas pour la sémantique.
    *   **ARIA**: Ne pas masquer les attributs ARIA essentiels avec `display: none` si l'élément doit rester accessible aux technologies d'assistance. Utiliser `.sr-only` si nécessaire.
    *   **Mouvement Réduit**: Respecter la préférence `prefers-reduced-motion` en désactivant ou réduisant les animations non essentielles.
4.  **Performance**:
    *   **Animations Fluides**: Privilégier les transformations CSS (`transform`, `opacity`) pour les animations.
    *   **Sélecteurs Efficaces**: Éviter les sélecteurs trop complexes ou universels non nécessaires.
    *   **Taille des Fichiers**: Garder les fichiers CSS concis et bien organisés. Envisager des outils de build pour la minification et la purge (si applicable).
5.  **Convention de Nommage (Ex: BEM)**: Adopter une convention de nommage claire et cohérente (comme BEM - Block, Element, Modifier) pour éviter les conflits et améliorer la lisibilité. Exemple : `.video-card__button--active`.
6.  **Modularité & Réutilisabilité**: Créer des styles spécifiques aux composants dans leurs propres fichiers. Identifier les motifs répétitifs pour créer des classes utilitaires ou des composants stylisés réutilisables.
7.  **Sécurité**: Éviter d'utiliser `url()` avec des sources non fiables. Ne pas utiliser de styles pour masquer des informations sensibles qui devraient être gérées côté serveur ou via JavaScript.
8.  **Design Avancé & Cohérent**: Appliquer les éléments de design d'Achiri (gradients, ombres, rayons définis dans `variables.css`) de manière cohérente. Fournir un feedback visuel clair pour les interactions utilisateur (hover, focus, active, disabled).
9.  **Support Dark Mode**: Utiliser la media query `prefers-color-scheme: dark` pour surcharger les variables CSS nécessaires et adapter l'apparence au thème sombre.
10. **Documentation**: Maintenir ce `README.md` à jour. Ajouter des commentaires dans le CSS lorsque la logique est complexe ou non évidente.

---

## Comment Contribuer

1.  **Consulter `variables.css`**: Avant d'ajouter une couleur, une taille de police, un espacement, etc., vérifier s'il existe déjà une variable appropriée.
2.  **Créer un Fichier Dédié**: Pour un nouveau composant majeur, créer un nouveau fichier CSS (ex: `NewFeature.css`) et l'importer là où il est nécessaire (souvent au niveau du composant JS/TSX).
3.  **Respecter la Convention de Nommage**: Utiliser la convention choisie (ex: BEM) pour nommer les classes.
4.  **Tester Rigoureusement**:
    *   **Responsive**: Tester sur différentes largeurs d'écran (outils de développement navigateur, appareils réels si possible).
    *   **Navigateurs**: Tester sur les navigateurs cibles principaux (Chrome, Firefox, Safari, Edge).
    *   **Accessibilité**: Utiliser des outils (ex: Lighthouse, Axe DevTools), naviguer au clavier, vérifier les contrastes, tester avec un lecteur d'écran si possible.
    *   **Dark Mode**: Vérifier le rendu en mode clair et sombre.
5.  **Documenter**: Mettre à jour ce `README.md` si un nouveau fichier est ajouté ou si des changements majeurs sont apportés à la structure ou aux principes. Ajouter des commentaires dans le code CSS si nécessaire.
6.  **Optimiser**: Garder un œil sur la performance et la taille des fichiers.

---

## Extensions et Fonctionnalités Futures

Ce système de styles est conçu pour évoluer et supporter :

-   **Système de Badges et Gamification**
-   **Notifications Avancées et Centre de Notifications**
-   **Thèmes Utilisateur Personnalisables** (au-delà de light/dark)
-   **Mode Contraste Élevé Amélioré**
-   **Support Multi-langues** (styles spécifiques si nécessaire pour `direction: rtl`, etc.)
-   **Bibliothèque de Composants UI Réutilisables** (Cards, Modals, Tooltips, Dropdowns, etc.)
-   **Micro-interactions et Animations Significatives**
-   **Intégration LSF plus poussée** (si nécessaire)

---

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**
```

**Modifications Apportées :**

1.  **Structure du Dossier Mise à Jour** : Ajout des fichiers `index.css`, `videocall.css`, `videochat.css`, `videoClassRoom3D.css` avec des descriptions plus détaillées de leur rôle. Clarification du rôle de `variables.css` comme fondation du Design System.
2.  **Principes Détaillés** : Les principes ont été réorganisés, numérotés et développés pour être plus explicites (Mobile-First, Convention de Nommage BEM, Performance, Modularité, Dark Mode...).
3.  **Contribution Clarifiée** : Les étapes pour contribuer sont plus précises et actionnables, mettant l'accent sur l'utilisation des variables, les tests (responsive, navigateurs, accessibilité, dark mode) et la documentation.
4.  **Extensions Futures Affinées** : La liste des extensions a été rendue plus spécifique.
5.  **Introduction et Conclusion Renforcées** : Réaffirmation des objectifs généraux du système de styles.
6.  **Formatage Amélioré** : Utilisation de listes à puces et de mise en gras pour une meilleure lisibilité.

Ce README devrait maintenant servir de référence solide pour toute personne travaillant sur les styles de l'application Achiri.