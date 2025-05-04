# Achiri – Composants Social

Bienvenue dans le dossier `components/social` du projet **Achiri**.  
Ce dossier regroupe tous les composants React liés aux fonctionnalités sociales : classement, points, boosters, réseaux sociaux.  
Chaque composant respecte les exigences : accessibilité, sécurité, compatibilité mobile/web, design avancé, SEO, évolutivité.

---

## ✨ Fonctionnalités principales

- **Leaderboard.js**  
  Classement des utilisateurs : tri, filtres, badges, rôles, avatars, feedback, focus, couleurs, responsive, SEO.
- **BoostersLeaderboard.js**  
  Classement des meilleurs boosters : interactions, avatars, feedback, admin mode, accessibilité, responsive, SEO.
- **PointsDashboard.js**  
  Tableau de bord des points : solde, historique, stats, feedback, focus, couleurs, responsive, admin mode, SEO.
- **SocialNetworkCard.js**  
  Carte de connexion et vérification de réseaux sociaux : édition d’URL, vérification, boost, feedback, rôles, responsive, SEO.

---

## ♿ Accessibilité

- Navigation clavier complète, focus visible, tabIndex, aria-labels explicites
- Feedback utilisateur (erreur, succès) en live region (aria-live)
- Structure sémantique claire, titres accessibles, responsive mobile/desktop
- Contrastes élevés, couleurs testées WCAG AA/AAA, dark/light mode prêt

---

## 🔒 Sécurité

- Pas de stockage d’informations sensibles côté client
- Contrôle clavier, gestion des erreurs, feedback utilisateur sécurisé
- Permissions contrôlées pour actions sensibles (boost, vérification, admin)
- Aucune fuite de données, pas d’info privée affichée

---

## 📱 Compatibilité mobile/web

- Design mobile first, responsive, boutons larges et accessibles
- Flexbox, padding et tailles adaptées aux petits écrans
- Touch friendly, transitions douces, expérience fluide desktop/mobile

---

## 🎨 Design avancé

- Branding Achiri (couleurs, icônes, arrondis, ombres)
- Transitions douces, feedback visuel, animation d’apparition
- Structure claire et moderne, dark/light mode prêt
- Composants extensibles, prêt pour badges, overlays, analytics, IA, notifications

---

## 🔍 SEO & bonnes pratiques

- Helmet pour titres/descriptions dynamiques
- Structure HTML claire, balises aria, titres explicites, navigation structurée
- Code commenté, logique métier séparée de l’UI, documentation intégrée
- Prêt pour extensions futures (export, dark mode, analytics, badges, overlay, IA…)

---

## 📁 Structure des fichiers

- **Leaderboard.js** – Classement général des utilisateurs
- **BoostersLeaderboard.js** – Classement des boosters
- **PointsDashboard.js** – Tableau de bord des points
- **SocialNetworkCard.js** – Carte réseau social (connexion, vérification, boost)

---

## 🛠️ Extension & Personnalisation

- Ajout facile de nouveaux modules (analytics, export, dark mode, badges…)
- Styles personnalisables via CSS/SCSS, branding Achiri
- Prêt pour notifications, overlay, IA, badges, modération, export

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

**© Achiri 2025 – Tous droits réservés**