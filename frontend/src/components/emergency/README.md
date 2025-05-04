# Achiri – Composants Urgence

Bienvenue dans le dossier `components/emergency` du projet **Achiri**.  
Ce dossier regroupe tous les composants React dédiés à la gestion de l’urgence : alertes, critères personnalisés, boutons d’action rapide, accessibilité, sécurité, design avancé, mobile/web, SEO.

---

## ✨ Fonctionnalités principales

- **Bouton d’alerte d’urgence** : envoi rapide d’une alerte, feedback visuel, confirmation (EmergencyButton)
- **Paramètres d’alerte d’urgence** : activation, choix des canaux (SMS, email, push), message personnalisé, test d’alerte (EmergencyAlertSettings)
- **Critères d’urgence personnalisés** : sélection, ajout, suppression, feedback utilisateur (EmergencyCriteriaForm)
- **Accessibilité universelle** : aria-labels, navigation clavier, focus visible, responsive
- **Sécurité** : pas d’info sensible, feedback utilisateur, contrôle clavier
- **Compatibilité mobile/web** : design mobile first, touch friendly, transitions douces
- **SEO friendly** : structure claire, balises aria, titres explicites

---

## 📁 Structure des fichiers

- **EmergencyButton.jsx**  
  Bouton d’alerte d’urgence universel, feedback, accessibilité, mobile/web
- **EmergencyAlertSettings.jsx**  
  Paramètres d’alerte d’urgence : activation, canaux, message, test, feedback
- **EmergencyCriteriaForm.jsx**  
  Formulaire de critères d’urgence personnalisés : sélection, ajout, suppression
- **README.md**  
  Documentation structurée, bonnes pratiques, mission Achiri

---

## 🚀 Utilisation rapide

```jsx
import EmergencyButton from './EmergencyButton';
import EmergencyAlertSettings from './EmergencyAlertSettings';
import EmergencyCriteriaForm from './EmergencyCriteriaForm';
// Utilisez ces composants pour une gestion d’urgence inclusive et moderne.
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les contrôles accessibles au clavier
- **Focus visible** : outline clair sur tous les boutons/icônes
- **Aria-labels** : pour chaque action, champ, zone
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

- Prêt pour ajout de : analytics, dark/light mode, nouveaux canaux, IA, personnalisation
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