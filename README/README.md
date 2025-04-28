# Achiri – Plateforme IA Inclusive (Frontend & Mobile)

Bienvenue sur le frontend et mobile de **Achiri**, une plateforme open source d’accessibilité, santé, domotique, éducation et influence, propulsée par l’IA.

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js ≥ 18
- npm ≥ 9
- (Mobile) Expo CLI recommandé

### Installation (Web/Frontend)

```bash
cd frontend
npm install
```

### Installation (Mobile/Expo)

```bash
cd mobile
npm install
```

### Lancer l’application web

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

### Lancer l’application mobile

```bash
expo start
```

---

## 📁 Structure du projet

- `frontend/` : Application React web (accessibilité, santé, domotique, influence, etc.)
- `mobile/` : Application React Native/Expo (modules IA accessibles sur mobile)
- `README/` : Documentation, guides et ressources

---

## 🧑‍🦽 Accessibilité & UX

- Navigation clavier et lecteurs d’écran (ARIA, focus visible, aria-live)
- Contrastes et couleurs accessibles
- Responsive mobile/desktop
- Feedback utilisateur cohérent (visuel, vocal, erreurs)
- Composants et pages testés pour l’accessibilité

---

## 🧪 Tests

- Tests unitaires et d’intégration avec Jest et Testing Library (web)
- Voir `frontend/src/App.test.js` pour des exemples

---

## 🌐 Progressive Web App (PWA)

- Manifest, favicon, accessibilité mobile, support offline (à vérifier/compléter)
- SEO : sitemap, balises meta, titres dynamiques (Helmet)

---

## 🛠️ Scripts disponibles

- `npm start` – Démarre le serveur de développement (web)
- `expo start` – Démarre l’app mobile (Expo)
- `npm run build` – Build production (web)
- `npm test` – Lance les tests (web)
- `npm run lint` – Lint le code
- `npm run format` – Formate le code avec Prettier

---

## 📋 À vérifier / À finaliser

- [ ] Navigation cohérente et accessible sur toutes les pages et écrans
- [ ] Responsive mobile/desktop sur tous les écrans
- [ ] Contrastes, couleurs, polices, feedback visuel et vocal
- [ ] Gestion robuste des erreurs (ErrorBoundary, API, cas limites)
- [ ] Tests unitaires et d’intégration sur les composants clés
- [ ] Permissions navigateur/mobile (micro, caméra, Bluetooth, notifications)
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