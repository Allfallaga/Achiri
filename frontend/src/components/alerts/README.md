# Achiri – Composants Alertes

Bienvenue dans le dossier `components/alerts` du projet **Achiri**.  
Ce dossier regroupe tous les composants React dédiés à la gestion des alertes : sécurité, santé, modération, feedback utilisateur, accessibilité, design avancé, mobile/web, SEO.

---

## ✨ Fonctionnalités principales

- **Alerte de contenu non conforme** : modération, sécurité, feedback utilisateur (ContentViolationAlert)
- **Alerte santé / bien-être** : prévention, conseils, feedback utilisateur (HealthAlert)
- **Accessibilité universelle** : aria-labels, navigation clavier, focus visible, responsive
- **Sécurité** : pas d’info sensible, feedback utilisateur, contrôle clavier
- **Compatibilité mobile/web** : design mobile first, touch friendly, transitions douces
- **SEO friendly** : structure claire, balises aria, titres explicites

---

## 📁 Structure des fichiers

- **ContentViolationAlert.jsx**  
  Alerte de modération : contenu non conforme, détails, action utilisateur
- **HealthAlert.jsx**  
  Alerte santé / bien-être : message, conseil, action utilisateur
- **README.md**  
  Documentation structurée, bonnes pratiques, mission Achiri

---

## 🚀 Utilisation rapide

```jsx
import ContentViolationAlert from './ContentViolationAlert';
import HealthAlert from './HealthAlert';
// Utilisez ces composants pour afficher des alertes accessibles et sécurisées.
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles accessibles au clavier
- **Focus visible** : outline clair sur tous les boutons/icônes
- **Aria-labels** : pour chaque action, champ, zone, role="alertdialog"
- **Sécurité** : pas d’info sensible, feedback utilisateur, contrôle clavier

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

- Prêt pour ajout de : analytics, dark/light mode, nouveaux types d’alertes, personnalisation
- Styles personnalisables via CSS/SCSS

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
