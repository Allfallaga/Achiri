# 📁 components/settings – Achiri

Ce dossier contient les composants avancés de gestion des paramètres utilisateur pour Achiri, conçus pour offrir une expérience moderne, accessible, sécurisée, responsive et SEO friendly, avec un design avancé fidèle au branding Achiri.

---

## ✨ Composants inclus

- **UserSettings.jsx**  
  Paramètres utilisateur globaux : thème (dark mode), notifications, langue, accessibilité (LSF, vocal, contraste), confidentialité, sécurité (2FA), feedback utilisateur, sauvegarde mock.  
  Prêt pour extensions futures (badges, analytics, RGPD, favoris…).

- **NotificationSettings.jsx**  
  Gestion fine des notifications : push, email, sonores, feedback, accessibilité, sauvegarde mock.

---

## 🛠️ Fonctionnalités principales

- **UX avancée** : navigation fluide, feedback instantané, focus visible, astuces, transitions animées.
- **Accessibilité** : aria-labels, navigation clavier, contrastes, responsive, focus visible, support LSF/vocal.
- **Sécurité** : aucune donnée sensible, feedback utilisateur, contrôle clavier, double authentification mock.
- **Compatibilité mobile/web** : design mobile first, responsive, dark mode ready.
- **SEO** : structure sémantique, labels, titres, accessibilité renforcée.
- **Design Achiri** : branding couleurs, icônes, ombres, arrondis, animations, astuces.

---

## 📦 Structure type

```
/settings
  ├── UserSettings.jsx
  ├── NotificationSettings.jsx
  ├── README.md
```

---

## 🚀 Utilisation

```jsx
import UserSettings from "./UserSettings";
import NotificationSettings from "./NotificationSettings";

// Exemple d'intégration
<UserSettings userId="user_123" />
<NotificationSettings userId="user_123" />
```

---

## 📝 Bonnes pratiques & extension

- **Extensible** : ajoutez facilement badges, analytics, RGPD, favoris, etc.
- **Séparation des responsabilités** : chaque composant gère une logique métier claire.
- **Styles** : personnalisés dans `../common/Settings.css` (responsive, dark mode, focus visible…).
- **Accessibilité** : toujours vérifier les labels, le focus, la navigation clavier.
- **Sécurité** : ne jamais stocker ou afficher d’informations sensibles côté client.

---

## 📚 Documentation rapide

- **UserSettings.jsx**  
  Paramètres globaux : thème, notifications, langue, accessibilité, confidentialité, sécurité, feedback, sauvegarde mock.

- **NotificationSettings.jsx**  
  Notifications push, email, sonores, feedback, sauvegarde mock.

---

## 💡 Astuce

> Active la double authentification et les notifications push pour une expérience Achiri optimale et sécurisée !

---

## 🏷️ Branding & SEO

- Couleurs, icônes et styles fidèles à Achiri.
- Structure sémantique, titres, aria-labels, responsive, dark mode.

---

## 🛡️ Licence

© {année en cours} Achiri – Tous droits réservés.
```<!-- filepath: /workspaces/Achiri/frontend/src/components/settings/README.md -->
# 📁 components/settings – Achiri

Ce dossier contient les composants avancés de gestion des paramètres utilisateur pour Achiri, conçus pour offrir une expérience moderne, accessible, sécurisée, responsive et SEO friendly, avec un design avancé fidèle au branding Achiri.

---

## ✨ Composants inclus

- **UserSettings.jsx**  
  Paramètres utilisateur globaux : thème (dark mode), notifications, langue, accessibilité (LSF, vocal, contraste), confidentialité, sécurité (2FA), feedback utilisateur, sauvegarde mock.  
  Prêt pour extensions futures (badges, analytics, RGPD, favoris…).

- **NotificationSettings.jsx**  
  Gestion fine des notifications : push, email, sonores, feedback, accessibilité, sauvegarde mock.

---

## 🛠️ Fonctionnalités principales

- **UX avancée** : navigation fluide, feedback instantané, focus visible, astuces, transitions animées.
- **Accessibilité** : aria-labels, navigation clavier, contrastes, responsive, focus visible, support LSF/vocal.
- **Sécurité** : aucune donnée sensible, feedback utilisateur, contrôle clavier, double authentification mock.
- **Compatibilité mobile/web** : design mobile first, responsive, dark mode ready.
- **SEO** : structure sémantique, labels, titres, accessibilité renforcée.
- **Design Achiri** : branding couleurs, icônes, ombres, arrondis, animations, astuces.

---

## 📦 Structure type

```
/settings
  ├── UserSettings.jsx
  ├── NotificationSettings.jsx
  ├── README.md
```

---

## 🚀 Utilisation

```jsx
import UserSettings from "./UserSettings";
import NotificationSettings from "./NotificationSettings";

// Exemple d'intégration
<UserSettings userId="user_123" />
<NotificationSettings userId="user_123" />
```

---

## 📝 Bonnes pratiques & extension

- **Extensible** : ajoutez facilement badges, analytics, RGPD, favoris, etc.
- **Séparation des responsabilités** : chaque composant gère une logique métier claire.
- **Styles** : personnalisés dans `../common/Settings.css` (responsive, dark mode, focus visible…).
- **Accessibilité** : toujours vérifier les labels, le focus, la navigation clavier.
- **Sécurité** : ne jamais stocker ou afficher d’informations sensibles côté client.

---

## 📚 Documentation rapide

- **UserSettings.jsx**  
  Paramètres globaux : thème, notifications, langue, accessibilité, confidentialité, sécurité, feedback, sauvegarde mock.

- **NotificationSettings.jsx**  
  Notifications push, email, sonores, feedback, sauvegarde mock.

---

## 💡 Astuce

> Active la double authentification et les notifications push pour une expérience Achiri optimale et sécurisée !

---

## 🏷️ Branding & SEO

- Couleurs, icônes et styles fidèles à Achiri.
- Structure sémantique, titres, aria-labels, responsive, dark mode.

---

## 🛡️ Licence

© {année en cours} Achiri – Tous droits réservés.