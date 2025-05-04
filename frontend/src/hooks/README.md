# Hooks – Achiri

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**

Ce dossier regroupe tous les hooks React personnalisés utilisés dans l’application Achiri.  
Chaque hook est conçu pour offrir une logique métier claire, sécurisée, accessible, compatible mobile/web, et facilement extensible.

---

## Sommaire des hooks

- **useUser.js**  
  Gestion de l’utilisateur courant : pseudo, avatar, couleur, rôle, accessibilité, préférences, persistance locale.

- **useVideoChat.js**  
  Gestion de l’utilisateur et de ses préférences pour la visioconférence : avatar, couleur, accessibilité, déconnexion, reset.

- *(À compléter selon l’évolution du projet)*

---

## Principes de développement

- **Accessibilité**  
  Tous les hooks sont pensés pour permettre une expérience inclusive (préférences, feedback, etc).

- **Sécurité**  
  Pas d’informations sensibles, persistance locale sécurisée, gestion des erreurs.

- **Compatibilité mobile/web**  
  Les hooks sont conçus pour fonctionner sur tous les supports, avec une logique métier claire et adaptable.

- **Extensibilité**  
  Chaque hook est prêt pour des évolutions : intégration auth, multi-profils, badges, notifications, etc.

- **SEO**  
  Les hooks facilitent la gestion des données et des préférences qui impactent l’accessibilité et l’expérience utilisateur, contribuant indirectement au SEO.

---

## Structure type d’un hook

- Utilisation de `useState`, `useEffect` et autres hooks React standards
- Persistance locale si besoin (localStorage)
- Gestion des erreurs et du feedback utilisateur
- Prêt pour extensions (auth, notifications, etc)
- Documentation structurée en bas de fichier

---

## Exemples de bonnes pratiques

- **Feedback utilisateur** sur chaque action (succès/erreur).
- **Sécurité** : aucune donnée sensible, persistance locale.
- **Accessibilité** : préférences utilisateur, retour visuel et sonore.
- **Extensibilité** : chaque hook peut évoluer sans casser l’existant.

---

## Pour contribuer

Merci de respecter la structure, les principes d’accessibilité, de sécurité, de compatibilité et de design Achiri.  
Documentez chaque nouveau hook ou évolution dans ce fichier.

---

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**
