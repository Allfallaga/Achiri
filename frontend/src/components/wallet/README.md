# Achiri – Composants Wallet

Ce dossier regroupe tous les composants React liés au portefeuille utilisateur (**Wallet**) pour le projet Achiri.  
Chaque composant respecte les exigences : **accessibilité**, **sécurité**, **compatibilité mobile/web**, **design avancé**, **SEO**, **évolutivité**.

---

## ✨ Fonctionnalités principales

- **Wallet.jsx / Wallet.js**  
  Portefeuille utilisateur : solde, crédit/débit, récompenses, historique, classement, feedback, accessibilité, sécurité, responsive, SEO.
- **TransactionList.jsx / TransactionList.js**  
  Historique des transactions : tri dynamique, couleurs, feedback, accessibilité, responsive, live region, SEO.
- **Wallet.css**  
  Styles avancés, responsive, dark mode ready, focus visible, branding Achiri.

---

## ♿ Accessibilité

- Navigation clavier complète, focus visible sur tous les éléments interactifs
- Aria-labels sur champs, boutons, listes, sections et feedback utilisateur
- Feedback utilisateur (erreur, succès) en live region (`aria-live`)
- Structure HTML claire, titres explicites, balises sémantiques
- Composants responsives et adaptatifs pour tous les usages

---

## 🔒 Sécurité

- Validation stricte des champs et actions (montants, descriptions…)
- Pas de stockage d’informations sensibles côté client
- Contrôle clavier, gestion des erreurs, feedback utilisateur sécurisé
- Aucune fuite de données, pas d’info bancaire ou privée affichée

---

## 📱 Compatibilité mobile/web

- Design **mobile first**, responsive, boutons larges et accessibles
- Flexbox, padding et tailles adaptées aux petits écrans
- Touch friendly, transitions douces, dark mode prêt

---

## 🎨 Design avancé

- Branding Achiri (couleurs, icônes, arrondis, ombres)
- Transitions douces, feedback visuel, animation d’apparition
- Structure claire et moderne, prêt pour dark mode
- Icônes vectorielles, couleurs accessibles, contrastes optimisés

---

## 🏆 Fonctionnalités avancées

- **Classement (leaderboard)** : classement hebdomadaire, mise en avant de l’utilisateur
- **Récompenses** : badges, drops, historique des récompenses
- **Historique** : tri dynamique, couleurs selon type, live region, pagination future
- **Crédit/Débit** : formulaire sécurisé, feedback immédiat, validation stricte
- **Feedback utilisateur** : messages d’erreur/succès accessibles et visibles

---

## 🔍 SEO & bonnes pratiques

- Structure HTML sémantique, balises aria, titres explicites
- Code commenté, logique métier séparée de l’UI
- Prêt pour extensions futures (classement, export, IA, analytics, badges…)
- Respect des standards WAI-ARIA et bonnes pratiques SEO

---

## 📁 Structure des fichiers

- **Wallet.jsx / Wallet.js** – Portefeuille utilisateur avancé (solde, opérations, classement, récompenses)
- **TransactionList.jsx / TransactionList.js** – Historique des transactions (tri, feedback, accessibilité)
- **Wallet.css** – Styles avancés, responsive, branding, dark mode, focus visible

---

## 🛠️ Extension & Personnalisation

- Ajout facile de nouveaux modules (classement, export, analytics, badges…)
- Styles personnalisables via CSS/SCSS, variables pour branding
- Prêt pour intégration API, overlay, IA, extensions futures

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

**© Achiri 2025 – Tous droits réservés**