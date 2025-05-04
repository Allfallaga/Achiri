# Achiri – Plateforme IA Inclusive

Bienvenue sur le frontend de **Achiri**, la plateforme open source d’accessibilité, santé, domotique, éducation et influence, propulsée par l’IA.  
**Design avancé, inclusif, sécurisé, mobile/web, SEO-friendly, extensible et documenté.**

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
npm install
```

### Lancer l’application en mode développement

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

### Lancer les tests

```bash
npm test
```

### Construire pour la production

```bash
npm run build
```

Le build sera généré dans le dossier `build/`.

### Linter et formatage

```bash
npm run lint
npm run format
```

---

## 📁 Structure du projet

- `src/`
  - `components/` : Composants réutilisables (UI, widgets, notifications, badges…)
  - `pages/` : Pages principales (Dashboard, Paramètres, Accessibilité, etc.)
  - `services/` : Accès API (REST/mock)
  - `styles/` : Fichiers CSS globaux, variables, accessibilité, responsive
  - `context/` : Contextes React (auth, accessibilité, thèmes…)
  - `utils/` : Fonctions utilitaires
  - `App.js` : Routing principal, structure globale, SEO, accessibilité
  - `ErrorBoundary.js` : Gestion globale des erreurs (UX, accessibilité, sécurité)
  - `i18n.js` : Multilingue, accessibilité, SEO
  - `index.js` : Point d’entrée de l’application
  - `reportWebVitals.js` : Mesure performance, accessibilité, SEO
  - `setupTests.js` : Configuration avancée des tests

---

## 🧑‍🦽 Accessibilité & UX

- Navigation clavier, lecteurs d’écran (ARIA, focus visible, aria-live)
- Contrastes et couleurs accessibles, dark mode, high-contrast mode
- Responsive mobile/desktop, breakpoints, flexibilité
- Feedback utilisateur cohérent (visuel, vocal, notifications, erreurs)
- Multilingue (français/anglais, prêt pour extension)
- Composants accessibles (boutons, formulaires, notifications, modals)

---

## 🔒 Sécurité

- Authentification, routes protégées, contrôle des rôles
- Pas de fuite de données, pas de tracking non maîtrisé
- Sécurité des dépendances, gestion robuste des erreurs (ErrorBoundary)
- Prêt pour extensions sécurité (logs, monitoring, alertes)

---

## 🧪 Tests

- Tests unitaires et d’intégration avec Jest et Testing Library
- Accessibilité, SEO, responsive, sécurité, feedback utilisateur
- Voir `src/App.test.js` et `src/setupTests.js` pour des exemples

---

## 🌐 Progressive Web App (PWA)

- Manifest, favicon, accessibilité mobile, support offline (à compléter)
- SEO : sitemap, balises meta, titres dynamiques (Helmet), structure claire

---

## 🛠️ Scripts disponibles

- `npm start` – Démarre le serveur de développement
- `npm run build` – Build production
- `npm test` – Lance les tests
- `npm run lint` – Lint le code
- `npm run format` – Formate le code avec Prettier
- `npm run analyze` – Analyse le bundle JS

---

## 📚 Documentation & Ressources

- [React documentation](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [React Router](https://reactrouter.com/)
- [Testing Library](https://testing-library.com/)
- [Web Vitals](https://web.dev/vitals/)
- [i18next](https://www.i18next.com/)
- [React Helmet](https://github.com/nfl/react-helmet)

---

## 🤝 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit tes changements (`git commit -am 'feat: nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvre une Pull Request

Merci de respecter la structure, l’accessibilité, la sécurité et la documentation du projet.

---

## 📋 À vérifier / À finaliser

- [ ] Navigation cohérente et accessible sur toutes les pages
- [ ] Responsive mobile/desktop sur tous les écrans
- [ ] Contrastes, couleurs, polices, feedback visuel et vocal
- [ ] Gestion robuste des erreurs (ErrorBoundary, API, cas limites)
- [ ] Tests unitaires et d’intégration sur les composants clés
- [ ] Permissions navigateur (micro, caméra, notifications)
- [ ] PWA (manifest, favicon, offline)
- [ ] SEO (Helmet, sitemap, titres dynamiques)
- [ ] Harmonisation des textes, labels, ARIA, multilingue partout
- [ ] Extensions futures : badges, analytics, monitoring, dark mode, multi-langues

---

## 📝 Licence

Ce projet est open source sous licence MIT.

---

**Besoin d’aide ou envie de contribuer ?**  
Ouvre une issue ou une pull request sur GitHub !

---