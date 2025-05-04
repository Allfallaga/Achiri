# Achiri – Composants vidéo

Bienvenue dans le dossier `components/video` du projet **Achiri**.  
Ici se trouvent tous les composants React et styles SASS/SCSS pour la gestion avancée des flux vidéo/audio : SFU, Peer-to-Peer, affichage, accessibilité, sécurité et design moderne.

---

## ✨ Fonctionnalités principales

- **WebRTC natif** via mediasoup-client (SFU & P2P)
- **Multi-flux** : affichage local, distant, admin/membre, sous-titres, langue des signes
- **Accessibilité avancée** : navigation clavier, focus visible, aria-labels, contrastes, responsive
- **Sécurité** : isolation des flux, contrôle modération, gestion des droits
- **Compatibilité mobile/web** : design responsive, mobile first, support touch & desktop
- **SEO friendly** : balises Helmet, titres dynamiques, descriptions, structure claire
- **Design moderne** : branding Achiri, couleurs accessibles, ombres, animations douces
- **Prêt pour analytics, modération, extensions futures**

---

## 📁 Structure des fichiers

- **Sfu_final.js**  
  Composant principal SFU (classe virtuelle, multi-flux, admin/membre, accessibilité, SEO, design avancé)
- **PeerRefactoring1-1.js**  
  Démo Peer-to-Peer mediasoup (connexion directe, design, accessibilité, sécurité)
- **MediaAdmin.js**  
  Affichage vidéo/audio pour admin ou membre (mode adaptatif, SEO, accessibilité)
- **MediaRcv.js**  
  Affichage flux distant, sous-titres, langue des signes, contrôles modération
- **Sfu.scss**  
  Styles SASS pour SFU : responsive, accessible, branding, animations, dark mode ready
- **MediaRcv.scss**  
  Styles SASS pour MediaRcv : design avancé, accessibilité, sous-titres, responsive

---

## 🚀 Utilisation rapide

```jsx
import Sfu from './Sfu_final';
// <Sfu roomName="maClasse" user={user} isAdmin={true} />

import PeerRefactoring from './PeerRefactoring1-1';
// <PeerRefactoring />

import MediaAdmin from './MediaAdmin';
// <MediaAdmin imAdmin={true} stream={mediaStream} />
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles sont accessibles au clavier
- **Focus visible** : outline clair sur tous les boutons/icônes
- **Aria-labels** : pour chaque flux, contrôle, bouton
- **Contraste élevé** : couleurs testées WCAG AA/AAA
- **Sécurité** : isolation des flux, gestion des droits, contrôle modération

---

## 📱 Responsive & Mobile

- Design mobile first, flexbox, breakpoints adaptés
- Touch friendly : boutons larges, feedback visuel, transitions douces

---

## 🔍 SEO

- Helmet pour titres/descriptions dynamiques
- Structure HTML claire, aria-labels, balises sémantiques

---

## 🛠️ Extension & Personnalisation

- Prêt pour ajout de : analytics, modération, notifications, dark/light mode
- Styles facilement personnalisables via SASS/SCSS

---

## 📝 Bonnes pratiques

- Code commenté, structuré, typé (PropTypes ou TypeScript recommandé)
- Séparation logique métier / UI / styles
- Respect RGAA/WCAG pour l’accessibilité

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

**© Achiri 2025 – Tous droits réservés**