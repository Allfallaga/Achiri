# Context – Achiri

Ce dossier regroupe tous les contextes React utilisés dans l’application **Achiri** pour la gestion globale de l’état, la sécurité, l’accessibilité, la personnalisation et l’expérience utilisateur.

---

## Sommaire des contextes

- **AuthProvider** (`AuthProvider.js`)  
  Contexte d’authentification : gestion de la connexion, rôles, persistance, sécurité, accessibilité.

- **AccessibilityContext** (`AccessibilityContext.js`)  
  Préférences d’accessibilité : contraste, taille police, dark mode, focus visible, etc.

- **WalletContext** (`WalletContext.js`)  
  Gestion du wallet utilisateur : solde, transactions, opérations, sécurité.

- **RoomContext** (`RoomContext.js`)  
  Gestion des rooms/classes virtuelles : création, accès, membres, sécurité.

- **AssistantContext** (`AssistantContext.js`)  
  Assistant IA contextuel : aide, onboarding, feedback, personnalisation.

- **EmergencyContext** (`EmergencyContext.js`)  
  Gestion des urgences : alertes, contacts, logs, sécurité.

---

## Principes de développement

- **Accessibilité**  
  Tous les contextes sont pensés pour permettre une navigation clavier, focus visible, responsive, dark mode, et une expérience inclusive.

- **Sécurité**  
  Pas d’informations sensibles stockées, pas de tracking, feedback utilisateur, gestion des erreurs, persistance locale sécurisée.

- **Compatibilité mobile/web**  
  Les contextes sont conçus pour fonctionner sur tous les supports, avec une logique métier claire et adaptable.

- **Extensibilité**  
  Chaque contexte est prêt pour des évolutions : nouveaux rôles, préférences, logs, notifications, export, etc.

- **SEO**  
  Les contextes facilitent la gestion des préférences qui impactent l’accessibilité et l’expérience utilisateur, contribuant indirectement au SEO.

---

## Structure type d’un contexte

- Création du contexte avec valeurs par défaut
- Provider avec logique métier, persistance locale, sécurité
- Hook personnalisé pour accès facile (`useXxx`)
- Documentation structurée en bas de fichier

---

## Exemples de bonnes pratiques

- **Persistance locale** via `localStorage` pour l’expérience utilisateur.
- **Sécurité** : aucune donnée sensible, gestion des erreurs.
- **Accessibilité** : prise en charge des préférences utilisateur.
- **Extensibilité** : chaque contexte peut évoluer sans casser l’existant.

---

## Pour contribuer

Merci de respecter la structure, les principes d’accessibilité, de sécurité, de compatibilité et de design Achiri.  
Documentez chaque nouveau contexte ou évolution dans ce fichier.

---

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**