# 📁 components/Message – Achiri

Ce dossier regroupe les composants avancés pour l’affichage et la saisie des messages dans les salons Achiri. Chaque composant est conçu pour offrir une expérience utilisateur moderne, accessible, sécurisée, responsive et SEO friendly, avec un design avancé fidèle au branding Achiri.

---

## ✨ Composants inclus

- **Message.js**  
  Affichage des messages du salon : scroll auto, avatars, indication "vous", focus visible, aria, dark mode, mobile first.  
  Prêt pour extensions futures (badges, réactions, signalement…).

- **MessageInput.js**  
  Saisie et envoi de messages : envoi clavier/souris, feedback, désactivation, focus visible, aria, dark mode, mobile first.  
  Prêt pour extensions futures (emoji, pièces jointes, réactions…).

- **Messages.scss**  
  Styles avancés : design moderne, branding Achiri, responsive, accessibilité, dark mode ready, focus visible, feedback utilisateur.

---

## 🛠️ Fonctionnalités principales

- **UX avancée** : scroll automatique, feedback instantané, focus visible, transitions animées.
- **Accessibilité** : aria-labels, navigation clavier, contrastes, responsive, focus visible.
- **Sécurité** : aucune donnée sensible, feedback utilisateur, contrôle clavier.
- **Compatibilité mobile/web** : design mobile first, responsive, dark mode ready.
- **SEO** : structure sémantique, labels, titres, accessibilité renforcée.
- **Design Achiri** : branding couleurs, icônes, ombres, arrondis, animations.

---

## 📦 Structure type

```
/Message
  ├── Message.js
  ├── MessageInput.js
  ├── Messages.scss
  ├── README.md
```

---

## 🚀 Utilisation

```jsx
import Message from "./Message";
import MessageInput from "./MessageInput";

// Exemple d'intégration
<Message messagesList={messagesList} />
<MessageInput
  room={roomId}
  socket={socket}
  setMessagesListCallback={msg => setMessagesList(prev => [...prev, msg])}
/>
```

---

## 📝 Bonnes pratiques & extension

- **Extensible** : ajoutez facilement badges, réactions, signalement, pièces jointes, etc.
- **Séparation des responsabilités** : chaque composant gère une logique métier claire.
- **Styles** : personnalisés dans `Messages.scss` (responsive, dark mode, focus visible…).
- **Accessibilité** : toujours vérifier les labels, le focus, la navigation clavier.
- **Sécurité** : ne jamais stocker ou afficher d’informations sensibles côté client.

---

## 📚 Documentation rapide

- **Message.js**  
  Affichage messages, avatars, indication "vous", scroll auto, dark mode ready.

- **MessageInput.js**  
  Saisie/envoi message, feedback, désactivation, focus visible, dark mode ready.

- **Messages.scss**  
  Styles avancés, branding Achiri, responsive, accessibilité, dark mode.

---

## 💡 Astuce

> Utilise la touche "Entrée" pour envoyer rapidement un message, ou Shift+Entrée pour aller à la ligne !

---

## 🏷️ Branding & SEO

- Couleurs, icônes et styles fidèles à Achiri.
- Structure sémantique, titres, aria-labels, responsive, dark mode.

---

## 🛡️ Licence

© {année en cours} Achiri – Tous droits réservés.