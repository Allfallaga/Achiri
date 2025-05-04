# Pages – Achiri

Ce dossier regroupe toutes les pages principales de l’application **Achiri**.  
Chaque page est conçue pour offrir une expérience utilisateur avancée : **accessibilité**, **sécurité**, **responsive**, **SEO-friendly** et **design moderne** fidèle à l’identité Achiri.

---

## Sommaire des pages

- **Accueil** (`Accueil.jsx`)  
  Page d’accueil, présentation de la plateforme, navigation rapide, branding, dark mode.

- **Dashboard** (`Dashboard.jsx`)  
  Vue d’ensemble personnalisée, accès rapide aux modules clés : wallet, notifications, classes virtuelles, accessibilité, analyse IA.

- **Profil** (`Profile.jsx`)  
  Gestion du profil utilisateur, upload de fichiers, wallet, historique, analyse IA, accessibilité.

- **Wallet** (`WalletPage.jsx`)  
  Gestion du portefeuille, solde, historique des transactions, sécurité.

- **Classement** (`LeaderboardPage.jsx`)  
  Affichage du classement des utilisateurs les plus actifs, badges, progression.

- **Challenges** (`ChallengesPage.jsx`)  
  Participation à des défis communautaires, progression, badges, classement, notifications.

- **Notifications** (`NotificationsPage.jsx`)  
  Affichage, lecture, gestion et historique des notifications.

- **Amis** (`FriendsPage.jsx`)  
  Gestion de la liste d’amis, ajout, suppression, recherche, avatars, interactions sociales.

- **Interactions Sociales** (`SocialInteractionsPage.jsx`)  
  Booster les contenus/profils, interactions, confirmation, modération, réseaux sociaux.

- **Modération** (`ModerationPage.jsx`)  
  Panneau de modération avancé : gestion signalements, utilisateurs, contenus, sécurité.

- **Paramètres** (`SettingsPage.jsx`)  
  Préférences utilisateur, sécurité, personnalisation, accessibilité, RGPD.

- **Accessibilité** (`AccessibilityPage.jsx`)  
  Outils IA d’accessibilité : description d’image, langue des signes, favoris, notifications, modules extensibles.

- **Analyse de Profil** (`AnalyzeProfilePage.jsx`)  
  Analyse IA du profil, recommandations personnalisées, respect vie privée, modules IA.

- **Creator Tools** (`CreatorToolsPage.jsx`)  
  Outils pour créateurs de contenu : gestion, analytics, extensions, export, modération.

- **Admin** (`AdminPage.jsx`)  
  Fonctions avancées pour administrateurs, gestion utilisateurs, sécurité, logs.

- **404 Not Found** (`NotFound.jsx`)  
  Page d’erreur personnalisée, navigation rapide, SEO noindex.

---

## Principes de développement

- **Accessibilité**  
  - Utilisation d’`aria-label`, navigation clavier, focus visible.
  - Responsive, contrastes adaptés, dark mode natif.
  - Navigation rapide sur toutes les pages.

- **Sécurité**  
  - Pas d’informations sensibles dans l’UI.
  - Gestion des erreurs, contrôle clavier, liens sécurisés (`rel="noopener noreferrer"`).
  - autoComplete sur les champs sensibles.

- **Compatibilité mobile/web**  
  - Design mobile first, media queries, composants adaptatifs.
  - Testé sur navigateurs modernes et mobiles.

- **SEO**  
  - Balises `<Helmet>`, titres et descriptions uniques, balises HTML lang.
  - Gestion du noindex pour les pages d’erreur.

- **Design avancé**  
  - Branding Achiri, couleurs, ombres, arrondis, transitions, dark mode, icônes, avatars.
  - Expérience utilisateur fluide et moderne.

- **Extensibilité**  
  - Chaque page est prête pour des évolutions : badges, statistiques, export, préférences, notifications, modules IA, etc.

---

## Structure type d’une page

Chaque page suit une structure commune :

- Import des composants nécessaires
- Balise `<Helmet>` pour le SEO
- Header avec titre et description
- Sections fonctionnelles (listes, formulaires, modules, widgets, etc.)
- Navigation rapide (nav)
- Footer avec infos accessibilité/sécurité
- Styles CSS-in-JS pour responsive & dark mode
- Documentation en commentaire en bas de fichier

---

## Exemples de bonnes pratiques

- **Navigation rapide** sur toutes les pages pour l’accessibilité.
- **Dark mode** natif via media queries et bouton toggle.
- **Formulaires** : labels explicites, gestion des erreurs, autoComplete.
- **Sécurité** : pas de données sensibles affichées, feedback utilisateur, contrôle clavier.
- **SEO** : titres, descriptions, balises HTML lang, noindex sur 404.
- **Extensibilité** : chaque page peut accueillir de nouveaux modules ou widgets.

---

## Pour contribuer

Merci de respecter la structure, les principes d’accessibilité, de sécurité, de compatibilité et de design Achiri.  
Documentez chaque nouvelle page ou évolution dans ce fichier.  
Ajoutez des commentaires clairs dans chaque fichier pour faciliter la maintenance et l’évolution.

---

**Achiri – Plateforme IA inclusive, accessible, sécurisée et créative.**