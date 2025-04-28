# Achiri – Plateforme IA Inclusive

Bienvenue sur **Achiri**, une plateforme open source moderne dédiée à l’accessibilité, la santé, la domotique, l’éducation et l’influence, propulsée par l’IA.

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
git clone https://github.com/Allfallaga/achiri.git
cd achiri
npm install
```

### Lancer en mode développement

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

### Build production

```bash
npm run build
```

Le build sera généré dans le dossier `build/`.

### Lancer les tests

```bash
npm test
```

---

## 🧩 Structure du projet

- **src/components/** : Composants réutilisables (accessibilité, santé, domotique, etc.)
- **src/pages/** : Pages principales (Dashboard, Accessibilité, Paramètres…)
- **src/services/** : Services mock pour l’IA, la santé, la domotique, etc.
- **src/context/** : Contextes React (authentification…)
- **src/assets/** : Images, icônes, styles additionnels
- **src/index.js** : Point d’entrée de l’application
- **src/index.css** : Styles globaux modernes et accessibles

---

## 🔒 Authentification & Sécurité

- Authentification centralisée via `AuthProvider`
- Routes protégées selon le rôle utilisateur (admin, user…)
- Données sensibles non versionnées (`.env` ignoré par git)

---

## ♿ Accessibilité & UX

- Focus visible, contrastes élevés, navigation clavier
- Composants et pages testés pour l’accessibilité
- Responsive design (mobile, tablette, desktop)
- Messages d’erreur et feedback utilisateur clairs

---

## 🛠️ Scripts disponibles

- `npm start` : Démarre le serveur de développement
- `npm run build` : Build optimisé pour la production
- `npm test` : Lance les tests unitaires et d’intégration
- `npm run lint` : (optionnel) Lint du code avec ESLint

---

## 📦 Déploiement

Le build (`npm run build`) peut être déployé sur Netlify, Vercel, GitHub Pages, etc.

---

## 📚 Documentation

- [React documentation](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Create React App](https://create-react-app.dev/)
- [Testing Library](https://testing-library.com/)

---

## 🤝 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements (`git commit -am 'feat: ma nouvelle feature'`)
4. Push la branche (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request

---

## 📝 Licence

MIT © 2025 Allfallaga

---

## ✅ Récapitulatif à vérifier/finir

- [ ] Vérifier l’accessibilité sur toutes les pages et composants
- [ ] Ajouter des tests unitaires et d’intégration pour chaque fonctionnalité
- [ ] Adapter les couleurs/thèmes si besoin pour le branding global
- [ ] Vérifier le responsive sur tous les écrans
- [ ] Nettoyer les imports inutiles et les fichiers temporaires
- [ ] Ajouter une documentation technique pour les API/services si besoin
- [ ] Mettre à jour ce README si de nouvelles fonctionnalités sont ajoutées

---

**Besoin d’aide ou envie de contribuer ?**  
Contacte-nous ou ouvre une issue sur GitHub !

---