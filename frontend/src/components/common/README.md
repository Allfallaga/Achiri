# 📁 components/common – Achiri

Ce dossier regroupe les composants réutilisables et essentiels à l’expérience Achiri : design avancé, accessibilité, sécurité, responsive, SEO friendly, branding Achiri.

---

## ✨ Composants inclus

- **Footer.js**  
  Pied de page global : navigation rapide, branding, accessibilité, SEO, responsive, lien code source, dark mode, prêt pour extensions (badges, analytics…).

- **UserList.js**  
  Liste des utilisateurs connectés : rôles, mute, main levée, badges, points, wallet, actions owner/admin, statut, animation, accessibilité, dark mode, responsive.

- **CreatorTools.js**  
  Outils créateur avancés : IA avatar, filtres photo, SEO captions, planification, partage, feedback, accessibilité, sécurité, design Achiri, dark mode, mobile first.

- **UploadFile.jsx**  
  Uploader de fichiers : images/sons, validation type/taille, feedback, preview, accessibilité, sécurité, responsive, dark mode, drag & drop, suppression, focus visible.

- **Settings.js**  
  Paramètres utilisateur globaux : thème, notifications, langue, accessibilité, confidentialité, sécurité, feedback, sauvegarde mock, responsive, dark mode.

---

## 🛠️ Fonctionnalités principales

- **UX avancée** : navigation fluide, feedback instantané, focus visible, astuces, transitions animées, design moderne.
- **Accessibilité** : aria-labels explicites, navigation clavier complète, contrastes élevés, responsive mobile/desktop, focus visible, support LSF/vocal.
- **Sécurité** : aucune donnée sensible, feedback utilisateur sécurisé, contrôle clavier, double authentification mock, permissions contrôlées.
- **Compatibilité mobile/web** : design mobile first, responsive, dark mode ready, boutons larges, expérience fluide.
- **SEO** : structure sémantique claire, labels, titres, navigation structurée, accessibilité renforcée.
- **Design Achiri** : branding couleurs, icônes, ombres, arrondis, animations, astuces, dark/light mode, extensibilité.

---

## 📦 Structure type

```
/common
  ├── Footer.js
  ├── UserList.js
  ├── CreatorTools.js
  ├── UploadFile.jsx
  ├── Settings.js
  ├── Settings.css
  ├── README.md
```

---

## 🚀 Utilisation

```jsx
import Footer from "./Footer";
import UserList from "./UserList";
import CreatorTools from "./CreatorTools";
import UploadFile from "./UploadFile";
import Settings from "./Settings";

// Exemple d'intégration
<Footer />
<UserList users={[]} />
<CreatorTools />
<UploadFile />
<Settings userId="user_123" />
```

---

## 📝 Bonnes pratiques & extension

- **Extensible** : ajoutez facilement badges, analytics, RGPD, favoris, overlay, IA, etc.
- **Séparation des responsabilités** : chaque composant gère une logique métier claire et isolée.
- **Styles** : personnalisés dans `Settings.css` (responsive, dark mode, focus visible…).
- **Accessibilité** : toujours vérifier les labels, le focus, la navigation clavier, aria-live pour feedback.
- **Sécurité** : ne jamais stocker ou afficher d’informations sensibles côté client, permissions contrôlées, feedback sécurisé.

---

## 📚 Documentation rapide

- **Footer.js**  
  Pied de page global, navigation rapide, SEO, branding, responsive, dark mode, accessibilité.

- **UserList.js**  
  Liste utilisateurs, rôles, mute, main levée, badges, points, wallet, actions owner/admin, statut, animation, accessibilité, responsive.

- **CreatorTools.js**  
  Outils créateur IA, filtres, SEO captions, planification, partage, feedback, accessibilité, sécurité, design avancé.

- **UploadFile.jsx**  
  Uploader fichiers images/sons, validation, feedback, preview, accessibilité, sécurité, drag & drop, suppression, responsive.

- **Settings.js**  
  Paramètres globaux : thème, notifications, langue, accessibilité, confidentialité, sécurité, feedback, sauvegarde mock, responsive.

---

## 💡 Astuce

> Utilise les composants communs Achiri pour garantir cohérence, accessibilité, sécurité et évolutivité sur toute la plateforme !

---

## 🏷️ Branding & SEO

- Couleurs, icônes et styles fidèles à Achiri.
- Structure sémantique, titres, aria-labels, responsive, dark mode, SEO ready.
- Documentation intégrée, code commenté, logique métier séparée de l’UI.

---

## 🛡️ Licence

© {année en cours} Achiri – Tous droits réservés.