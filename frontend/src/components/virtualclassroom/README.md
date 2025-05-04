# Achiri – Composants VirtualClassroom

Bienvenue dans le dossier `components/virtualclassroom` du projet **Achiri**.  
Ce dossier regroupe tous les composants React pour la gestion des classes virtuelles inclusives : liste, détail, quiz, chat, accessibilité, sécurité, design avancé, mobile/web, SEO.

---

## ✨ Fonctionnalités principales

- **Liste des classes virtuelles** : recherche, filtrage, accessibilité, participants, accès rapide, dark mode
- **Détail d’une classe** : quiz interactif, scores, chat en temps réel (mock), accessibilité avancée, feedback utilisateur
- **Quiz & scores** : quiz interactif, correction automatique, classement, feedback instantané
- **Chat intégré** : envoi de messages, accessibilité, feedback instantané, navigation clavier
- **Accessibilité universelle** : navigation clavier, focus visible, aria-labels, responsive, contrastes élevés
- **Sécurité** : pas d’info sensible, gestion des erreurs, contrôle clavier, feedback utilisateur
- **Compatibilité mobile/web** : design mobile first, touch friendly, transitions douces, responsive
- **SEO friendly** : structure claire, balises aria, titres explicites, contenu accessible aux moteurs de recherche
- **Dark mode** : bascule instantanée, respect des préférences utilisateur
- **Extensible** : prêt pour vidéo live, analytics, favoris, overlay, badges, IA, etc.

---

## 📁 Structure des fichiers

- **VirtualClassroomList.jsx**  
  Liste des classes virtuelles, recherche, accessibilité, participants, accès rapide, dark mode
- **VirtualClassroomDetail.jsx**  
  Détail d’une classe : quiz, scores, chat, accessibilité, feedback utilisateur, dark mode
- **VirtualClassroom.js**  
  Salle de classe virtuelle complète (cours, quiz, vidéo, accessibilité, design avancé)
- **VirtualClassroom.css**  
  Styles avancés, responsive, accessibilité, branding Achiri, dark mode
- **README.md**  
  Documentation structurée, bonnes pratiques, mission Achiri

---

## 🚀 Utilisation rapide

```jsx
import VirtualClassroomList from './VirtualClassroomList';
import VirtualClassroomDetail from './VirtualClassroomDetail';
// Utilisez ces composants pour proposer une expérience de classe virtuelle inclusive et moderne.
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles accessibles au clavier (tab, entrée, espace)
- **Focus visible** : outline clair sur tous les boutons/champs, focus-visible natif
- **Aria-labels** : pour chaque action, champ, zone, feedback live (aria-live)
- **Feedback utilisateur** : messages d’erreur, succès, live region, retour visuel
- **Sécurité** : pas d’info sensible, gestion des erreurs, contrôle clavier, pas de tracking

---

## 📱 Responsive & Mobile

- Design mobile first, flexbox, breakpoints adaptés
- Touch friendly : boutons larges, feedback visuel, transitions douces
- Expérience fluide sur smartphone, tablette et desktop

---

## 🌙 Dark Mode

- Bascule instantanée entre clair et sombre
- Respect des contrastes et accessibilité
- Prise en compte des préférences utilisateur

---

## 🔍 SEO

- Structure HTML claire, aria-labels, balises sémantiques
- Titres explicites pour chaque zone, contenu accessible aux moteurs de recherche
- Optimisé pour l’indexation et l’accessibilité

---

## 🛠️ Extension & Personnalisation

- Prêt pour ajout de : vidéo live, analytics, favoris, overlay, badges, IA, nouveaux filtres, personnalisation
- Styles personnalisables via CSS/SCSS, branding Achiri
- Architecture évolutive, séparation logique métier/UI/styles

---

## 📝 Bonnes pratiques

- Code commenté, structuré, typé (PropTypes ou TypeScript recommandé)
- Séparation logique métier / UI / styles
- Respect RGAA/WCAG pour l’accessibilité
- Feedback utilisateur systématique
- Sécurité et confidentialité respectées

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

## 📚 Exemples d’utilisation

```jsx
<VirtualClassroomList userId="alice" onJoin={id => ...} />
<VirtualClassroomDetail classroomId={1} userId="alice" />
```

---

## 📄 Licence

**© Achiri 2025 – Tous droits réservés**  
Ce projet respecte la vie privée, l’inclusion et la sécurité de tous.

---