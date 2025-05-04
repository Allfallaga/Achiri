# Achiri – Composants Moderation

Bienvenue dans le dossier `components/moderation` du projet **Achiri**.  
Ce dossier regroupe tous les composants React pour la gestion de la modération en temps réel : liste des membres, actions de modération, accessibilité, sécurité, design avancé, mobile/web.

---

## ✨ Fonctionnalités principales

- **Liste des membres connectés** : affichage dynamique, avatars, rôles, statuts
- **Actions de modération** : mute, désactivation vidéo, éjection, gestion des rôles
- **Accessibilité avancée** : navigation clavier, focus visible, aria-labels, contrastes, responsive
- **Compatibilité mobile/web** : design responsive, mobile first, support touch & desktop
- **Sécurité** : actions protégées par droits, séparation des rôles, pas d’info sensible affichée
- **SEO friendly** : structure claire, balises aria, titres explicites

---

## 📁 Structure des fichiers

- **ModerationPanel.js**  
  Panneau principal de modération : intégration de la liste, actions, accessibilité, SEO
- **Moderation.js**  
  Liste des membres connectés avec actions de modération (mute, vidéo off, éjecter)
- **Moderation.scss / ModerationPanel.css**  
  Styles avancés : responsive, accessible, branding, animations, dark mode ready

---

## 🚀 Utilisation rapide

```jsx
import ModerationPanel from './ModerationPanel';
// <ModerationPanel members={members} onMute={fn} onVideoOff={fn} onEject={fn} />

import Moderation from './Moderation';
// <Moderation members={members} onMute={fn} onVideoOff={fn} onEject={fn} />
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles accessibles au clavier
- **Focus visible** : outline clair sur tous les boutons/icônes
- **Aria-labels** : pour chaque membre, action, zone
- **Contraste élevé** : couleurs testées WCAG AA/AAA
- **Sécurité** : actions protégées, séparation des rôles, pas d’info sensible affichée

---

## 📱 Responsive & Mobile

- Design mobile first, flexbox, breakpoints adaptés
- Touch friendly : boutons larges, feedback visuel, transitions douces

---

## 🔍 SEO

- Structure HTML claire, aria-labels, balises sémantiques
- Titres explicites pour chaque zone

---

## 🛠️ Extension & Personnalisation

- Prêt pour ajout de : analytics, notifications, dark/light mode, gestion avancée des rôles
- Styles personnalisables via SASS/SCSS ou CSS

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
