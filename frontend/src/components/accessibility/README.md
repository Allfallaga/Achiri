# Achiri – Composants Accessibilité

Bienvenue dans le dossier `components/accessibility` du projet **Achiri**.  
Ce dossier regroupe tous les composants React dédiés à l’accessibilité universelle : outils, tests, traduction LSF, TTS, panneau de contrôle, design avancé, mobile/web, SEO, sécurité et évolutivité.

---

## ✨ Fonctionnalités principales

- **Contraste élevé** : améliore la visibilité pour tous, conforme WCAG AA/AAA
- **Taille de police ajustable** : confort de lecture personnalisé, mobile/web
- **Lecture vocale (TTS)** : support natif pour malvoyants, API SpeechSynthesis
- **Traduction LSF (Langue des Signes)** : simulation IA, webcam, feedback immédiat, dark mode
- **Panneau d’accessibilité** : contrôle rapide des options, raccourcis clavier, feedback visuel
- **Générateur IA de contenu** : création de posts accessibles pour réseaux sociaux, dark mode, SEO
- **Tests & rapports IA** : vérification automatique des critères d’accessibilité, feedback utilisateur, live region
- **Compatibilité mobile/web** : responsive, mobile first, touch friendly, transitions douces
- **Sécurité** : gestion des permissions, pas d’info sensible, feedback utilisateur, contrôle caméra
- **SEO friendly** : structure claire, aria-labels, titres explicites, balises sémantiques

---

## ♿ Accessibilité

- Navigation clavier complète, focus visible sur tous les éléments interactifs
- Aria-labels sur champs, boutons, liens, sections et feedback utilisateur
- Feedback utilisateur (erreur, succès) en live region (`aria-live`)
- Structure HTML claire, titres explicites, balises sémantiques
- Composants responsives et adaptatifs pour tous les usages
- Dark mode prêt, contrastes optimisés, mobile first

---

## 🔒 Sécurité

- Validation stricte des champs et actions (caméra, TTS, génération IA)
- Pas de stockage d’informations sensibles côté client
- Gestion des permissions navigateur (caméra, TTS)
- Feedback utilisateur sécurisé, pas d’info privée affichée

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

## 🔍 SEO & bonnes pratiques

- Structure HTML sémantique, balises aria, titres explicites
- Code commenté, logique métier séparée de l’UI
- Prêt pour extensions futures (overlay, IA, analytics, badges…)
- Respect des standards WAI-ARIA et bonnes pratiques SEO

---

## 📁 Structure des fichiers

- **Accessibility.js**  
  Outil universel d’accessibilité : contraste, police, TTS, LSF, langue, SEO, responsive
- **AccessibilityTools.jsx**  
  Générateur IA de contenu accessible pour réseaux sociaux (tons, dark mode, SEO)
- **AccessibilityTest.js / AccessibilityTest.jsx**  
  Rapport IA et démo interactive (LSF, TTS, feedback, recommandations, live region)
- **AccessPanel.js**  
  Panneau de contrôle accessibilité (contraste, police, TTS, raccourcis, feedback)
- **SignLanguageTranslator.jsx**  
  Traduction IA de la langue des signes en texte (webcam, feedback, simulation, dark mode)
- **Accessibility.css**  
  Styles avancés, responsive, branding Achiri, focus visible, dark mode

---

## 🚀 Utilisation rapide

```jsx
import Accessibility from './Accessibility';
import AccessPanel from './AccessPanel';
import AccessibilityTest from './AccessibilityTest';
import AccessibilityTools from './AccessibilityTools';
import SignLanguageTranslator from './SignLanguageTranslator';
// Utilisez les composants dans vos pages pour une expérience inclusive et moderne.
```

---

## 🛠️ Extension & Personnalisation

- Ajout facile de nouveaux modules (overlay, analytics, badges, IA…)
- Styles personnalisables via CSS/SCSS, variables pour branding
- Prêt pour intégration API, overlay, extensions futures

---

## 🤝 Contribution

Toute contribution pour améliorer l’accessibilité, la sécurité ou l’expérience utilisateur est la bienvenue !  
Merci de respecter la philosophie Achiri : **inclusion, sécurité, innovation, design**.

---

**© Achiri 2025 – Tous droits réservés**