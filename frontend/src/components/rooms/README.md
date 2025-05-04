# Achiri – Composants Rooms

Bienvenue dans le dossier `components/rooms` du projet **Achiri**.  
Ce dossier regroupe tous les composants React et styles SASS/SCSS pour la gestion des salons vidéo : création, affichage, accès, sécurité, UX avancée, accessibilité, responsive et SEO.

---

## ✨ Fonctionnalités principales

- **Création, affichage, suppression de salons** (publics, privés, payants)
- **Liste dynamique** : salons ouverts/fermés, nombre de participants, propriétaire, statut, badges, prix
- **Accès sécurisé** : gestion des droits, statuts, accès privé/payant, owner/modération
- **Accessibilité avancée** : navigation clavier, focus visible, aria-labels, contrastes, responsive, TTS, dark mode
- **Compatibilité mobile/web** : design responsive, mobile first, support touch & desktop, breakpoints adaptés
- **SEO friendly** : Helmet pour titres/descriptions, structure claire, balises aria, sémantique HTML
- **Design moderne** : branding Achiri, couleurs accessibles, ombres, animations douces, dark/light mode
- **Prêt pour extensions** : analytics, notifications, IA, badges, modération, overlay, export, gamification

---

## 📁 Structure des fichiers

- **RoomList.js**  
  Gestion complète des rooms : création, liste, rejoindre/quitter, suppression, statuts, UX avancée, accessibilité, SEO, responsive
- **Room.js**  
  Carte salon individuelle : design moderne, navigation clavier, aria, responsive, SEO, badges, statut, membres
- **Rooms.js**  
  Liste tous les salons disponibles (vue globale), loading, erreurs, SEO, accessibilité, responsive
- **Room.scss**  
  Styles SASS pour Room : responsive, accessible, branding, animations, dark mode ready, focus visible, contrastes
- **Challenges.js**  
  Défis & classement : gamification, UX moderne, accessibilité, SEO, responsive, navigation clavier
- **ChallengeBox.js**  
  Défi accessibilité IA : description visuelle IA, webcam, TTS, sécurité, accessibilité, SEO, mobile/web

---

## 🚀 Utilisation rapide

```jsx
import RoomList from './RoomList';
// <RoomList rooms={rooms} currentUser={user} onJoin={...} onLeave={...} onCreate={...} onDelete={...} />

import Room from './Room';
// <Room data={roomData} />

import Rooms from './Rooms';
// <Rooms />

import Challenges from './Challenges';
// <Challenges challenges={...} leaderboard={...} currentUser={...} onValidate={...} />

import ChallengeBox from './ChallengeBox';
// <ChallengeBox onValidate={...} challengeTitle="..." challengeDescription="..." />
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles accessibles au clavier, focus visible, aria-labels explicites
- **Contraste élevé** : couleurs testées WCAG AA/AAA, dark/light mode
- **TTS (Text-to-Speech)** : pour la description IA (ChallengeBox)
- **Responsive** : mobile first, breakpoints, boutons larges, feedback visuel
- **Sécurité** : gestion des droits, statuts, pas d’info sensible affichée, flux vidéo local uniquement, permissions contrôlées
- **Notifications accessibles** : aria-live, alertes, feedback utilisateur

---

## 📱 Responsive & Mobile

- Design mobile first, flexbox, breakpoints adaptés
- Touch friendly : boutons larges, feedback visuel, transitions douces
- Expérience fluide sur desktop et mobile

---

## 🔍 SEO

- Helmet pour titres/descriptions dynamiques
- Structure HTML claire, aria-labels, balises sémantiques, navigation structurée
- Prêt pour indexation optimale

---

## 🛠️ Extension & Personnalisation

- Prêt pour ajout de : analytics, notifications, dark/light mode, modération, overlay, IA, badges, export, gamification
- Styles personnalisables via SASS/SCSS, branding Achiri

---

## 📝 Bonnes pratiques

- Code commenté, structuré, typé (PropTypes ou TypeScript recommandé)
- Séparation logique métier / UI / styles
- Respect RGAA/WCAG pour l’accessibilité
- Sécurité : pas de fuite d’info, gestion des droits, feedback utilisateur
- Documentation intégrée dans chaque composant

---

## 📚 Documentation rapide

Chaque composant expose :
- Les props principales (voir en-tête de chaque fichier)
- Les hooks personnalisés (si besoin)
- Les principes d’accessibilité et de sécurité intégrés
- Les possibilités d’extension

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

**© Achiri 2025 – Tous droits réservés**
