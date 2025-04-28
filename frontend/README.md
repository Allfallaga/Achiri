# Achiri – Plateforme IA Inclusive

Bienvenue sur le frontend de **Achiri**, une plateforme open source d’accessibilité, santé, domotique, éducation et influence, propulsée par l’IA.

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
  - `components/` : Composants réutilisables (UI, widgets, etc.)
  - `pages/` : Pages principales (Dashboard, Paramètres, etc.)
  - `services/` : Accès API (REST/mock)
  - `styles/` : Fichiers CSS globaux et variables
  - `context/` : Contextes React (auth, etc.)
  - `utils/` : Fonctions utilitaires
  - `App.js` : Routing principal et structure globale
  - `ErrorBoundary.js` : Gestion globale des erreurs
  - `index.js` : Point d’entrée de l’application

---

## 🧑‍🦽 Accessibilité & UX

- Navigation clavier et lecteurs d’écran (ARIA, focus visible, aria-live)
- Contrastes et couleurs accessibles
- Responsive mobile/desktop
- Feedback utilisateur cohérent (visuel, vocal, erreurs)

---

## 🧪 Tests

- Tests unitaires et d’intégration avec Jest et Testing Library
- Voir `src/App.test.js` pour des exemples

---

## 🌐 Progressive Web App (PWA)

- Manifest, favicon, accessibilité mobile, support offline (à vérifier/compléter)
- SEO : sitemap, balises meta, titres dynamiques (Helmet)

---

## 🛠️ Scripts disponibles

- `npm start` – Démarre le serveur de développement
- `npm run build` – Build production
- `npm test` – Lance les tests
- `npm run lint` – Lint le code
- `npm run format` – Formate le code avec Prettier

---

## 📚 Documentation & Ressources

- [React documentation](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [React Router](https://reactrouter.com/)
- [Testing Library](https://testing-library.com/)
- [Web Vitals](https://web.dev/vitals/)

---

## 🤝 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit tes changements (`git commit -am 'feat: nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvre une Pull Request

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
- [ ] Harmonisation des textes, labels, ARIA, français partout

---

## 📝 Licence

Ce projet est open source sous licence MIT.

---

**Besoin d’aide ou envie de contribuer ?**  
Ouvre une issue ou une pull request sur GitHub !

---