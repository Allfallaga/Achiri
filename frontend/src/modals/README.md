# Modals – Achiri

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**

Ce dossier regroupe tous les composants modaux réutilisables de l’application Achiri.  
Chaque modal est conçu pour offrir une expérience utilisateur moderne, accessible, sécurisée, compatible mobile/web, et facilement extensible.

---

## Sommaire des modals

- **InteractionConfirmModal.js**  
  Confirmation d’interaction sociale (like, follow, partage, badge, etc) avec feedback, accessibilité avancée, design responsive.

- **VerificationModal.js**  
  Vérification de propriété d’un réseau social (bio, post, OAuth), instructions claires, focus clavier, sécurité, feedback utilisateur.

- *(À compléter selon l’évolution du projet)*

---

## Principes de développement

- **Accessibilité**  
  Tous les modals sont pensés pour permettre une expérience inclusive (focus, ARIA, navigation clavier, feedback visuel et sonore).

- **Sécurité**  
  Pas d’informations sensibles, liens sécurisés (`rel="noopener noreferrer"`), gestion des erreurs, aucun tracking.

- **Compatibilité mobile/web**  
  Les modals sont responsives, utilisables sur tous les supports, avec une logique métier claire et adaptable.

- **Extensibilité**  
  Chaque modal est prêt pour des évolutions : animations, notifications, badges, partage, OAuth, etc.

- **SEO**  
  Les modals facilitent l’accessibilité et l’expérience utilisateur, contribuant indirectement au SEO.

---

## Structure type d’un modal

- Utilisation de React, hooks (`useRef`, `useEffect`)
- Focus automatique, gestion clavier (Escape, Tab)
- ARIA roles et labels pour lecteurs d’écran
- Design moderne, responsive, personnalisable
- Feedback utilisateur (succès, erreur, points, badges, etc)
- Documentation structurée en bas de fichier

---

## Exemples de bonnes pratiques

- **Feedback utilisateur** sur chaque action (succès/erreur).
- **Accessibilité** : focus, ARIA, navigation clavier, retour visuel et sonore.
- **Sécurité** : aucun tracking, liens sécurisés, pas d’info sensible.
- **Extensibilité** : chaque modal peut évoluer sans casser l’existant.

---

## Pour contribuer

Merci de respecter la structure, les principes d’accessibilité, de sécurité, de compatibilité et de design Achiri.  
Documentez chaque nouveau modal ou évolution dans ce fichier.

---

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**