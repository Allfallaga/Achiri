# Achiri – Composants Chat

Bienvenue dans le dossier `components/chat` du projet **Achiri**.  
Ce dossier regroupe tous les composants React pour la messagerie instantanée, la modération, les appels audio/vidéo privés, l’IA conversationnelle, et l’intégration avancée UX/UI.

---

## ✨ Fonctionnalités principales

- **Chat en temps réel** : messages instantanés, historique, scroll auto, badges, points, avatars personnalisés
- **Appels audio/vidéo privés** : WebRTC, interface modale, gestion sécurisée des flux, design avancé
- **Suggestions IA** : complétion de message, modération intelligente, accessibilité vocale (TTS)
- **Modération** : gestion des membres, bannissement, rôles, notifications, outils admin intégrés
- **Accessibilité avancée** : navigation clavier, focus visible, aria-labels, contrastes, responsive, support lecteurs d’écran
- **Compatibilité mobile/web** : design responsive, mobile first, support touch & desktop, transitions douces
- **SEO friendly** : structure claire, balises aria, Helmet pour titres/descriptions, balises sémantiques
- **Sécurité** : gestion des droits, séparation des rôles, pas d’info sensible affichée, contrôle des flux, RGPD ready

---

## 📁 Structure des fichiers

- **ChatBox.js**  
  Chat complet : messages, IA, appels privés, badges, points, UX avancée, accessibilité, SEO, sécurité
- **Chat.js**  
  Zone de discussion principale : messages, input, scroll auto, gestion socket, responsive, accessibilité
- **Chatroom.js**  
  Salon vidéo/chat global : intègre admin, modération, chat, SFU vidéo, gestion membres, sécurité avancée
- **Chat.scss**  
  Styles SASS pour chat : responsive, accessible, branding, animations, dark mode ready, focus visible
- **Chatroom.scss**  
  Styles SASS pour la page salon complet (chat + vidéo + admin + modération), responsive, mobile first

---

## 🚀 Utilisation rapide

```jsx
import ChatBox from './ChatBox';
// <ChatBox roomId={id} user={user} chatHistory={...} ttsEnabled={true} speak={fn} targetUser={...} />

import Chat from './Chat';
// <Chat socket={socket} room={roomId} />

import Chatroom from './Chatroom';
// <Chatroom socket={socket} />
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles accessibles au clavier, focus visible
- **Aria-labels** : pour chaque zone, bouton, message, suggestion IA, modale d’appel
- **Contraste élevé** : couleurs testées WCAG AA/AAA, dark mode prêt
- **Support lecteurs d’écran** : balises aria, sr-only, structure sémantique
- **Sécurité** : gestion des droits, séparation des rôles, pas d’info sensible affichée, RGPD ready

---

## 📱 Responsive & Mobile

- Design mobile first, flexbox, breakpoints adaptés
- Touch friendly : boutons larges, feedback visuel, transitions douces, support tactile

---

## 🔍 SEO

- Helmet pour titres/descriptions dynamiques (dans ChatBox)
- Structure HTML claire, aria-labels, balises sémantiques, navigation optimisée

---

## 🛠️ Extension & Personnalisation

- Prêt pour ajout de : analytics, notifications, dark/light mode, modération avancée, badges, extensions IA
- Styles personnalisables via SASS/SCSS, branding Achiri

---

## 📝 Bonnes pratiques

- Code commenté, structuré, typé (PropTypes ou TypeScript recommandé)
- Séparation logique métier / UI / styles
- Respect RGAA/WCAG pour l’accessibilité, tests manuels et automatiques
- Sécurité : pas de fuite d’info, contrôle des flux, gestion des erreurs

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

**© Achiri 2025 – Tous droits réservés**