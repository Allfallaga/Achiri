# 📞 components/call – Achiri

Bienvenue dans le dossier `components/call` du projet **Achiri**.  
Ce dossier regroupe les composants avancés pour la gestion des appels audio et vidéo, pensés pour une expérience utilisateur moderne, accessible, sécurisée, responsive et SEO friendly, avec un design fidèle au branding Achiri.

---

## ✨ Composants inclus

- **CallButton.js**  
  Boutons d'appel audio et vidéo pour chat privé : UX avancée, accessibilité, sécurité, responsive, SEO, design Achiri.  
  Prêt pour extensions futures (statut, badge, analytics…).

---

## 🛠️ Fonctionnalités principales

- **UX avancée** : feedback instantané, transitions animées, focus visible, retour visuel sur état actif.
- **Accessibilité** : aria-labels, navigation clavier, contrastes élevés, responsive, focus visible, support lecteurs d’écran.
- **Sécurité** : aucune donnée sensible, feedback utilisateur, contrôle clavier, pas de fuite d’info.
- **Compatibilité mobile/web** : design mobile first, responsive, dark mode ready, support tactile.
- **SEO** : structure sémantique, labels, titres, accessibilité renforcée.
- **Design Achiri** : branding couleurs, icônes, ombres, arrondis, animations douces.

---

## 📦 Structure type

```
/call
  ├── CallButton.js
  ├── README.md
```

---

## 🚀 Utilisation

```jsx
import CallButton from "./CallButton";

// Exemple d'intégration
<CallButton
  onCall={type => console.log("Appel lancé :", type)}
  disabled={false}
  inCall={false}
  type={null}
/>
```

---

## ♿ Accessibilité & Sécurité

- **Navigation clavier** : tous les boutons accessibles au clavier, focus visible.
- **Aria-labels** : pour chaque bouton, action, état d’appel.
- **Contraste élevé** : couleurs testées WCAG AA/AAA, dark mode prêt.
- **Support lecteurs d’écran** : balises aria, titres, structure claire.
- **Sécurité** : aucune info sensible, feedback utilisateur, contrôle des actions.

---

## 📱 Responsive & Mobile

- Design mobile first, flexbox, breakpoints adaptés.
- Touch friendly : boutons larges, feedback visuel, transitions douces, support tactile.
- Icônes vectorielles pour une clarté parfaite sur tous les écrans.

---

## 🔍 SEO & Design

- Structure HTML claire, aria-labels, titres, responsive, dark mode.
- Branding Achiri : couleurs, icônes, ombres, arrondis, animations.
- Prêt pour extensions (statut, badge, analytics…).

---

## 📝 Bonnes pratiques

- Code commenté, structuré, typé (PropTypes ou TypeScript recommandé).
- Séparation logique métier / UI / styles.
- Respect RGAA/WCAG pour l’accessibilité, tests manuels et automatiques.
- Sécurité : pas de fuite d’info, contrôle des flux, gestion des erreurs.

---

## 📚 Documentation rapide

- **CallButton.js**  
  Boutons appel audio/vidéo, focus visible, aria, dark mode, responsive, feedback visuel.

---

## 💡 Astuce

> Utilise les raccourcis clavier ou la navigation tab pour lancer rapidement un appel audio ou vidéo sur Achiri !

---

## 🏷️ Branding & SEO

- Couleurs, icônes et styles fidèles à Achiri.
- Structure sémantique, titres, aria-labels, responsive, dark mode.

---

## 🛡️ Licence

© 2025 Achiri – Tous droits réservés.