# Assistant Achiri – Composants

Bienvenue dans le dossier **assistant** du projet **Achiri**.

## 🌟 Mission & Objectif

Ce dossier regroupe tous les composants liés à l’assistant intelligent Achiri :  
- **IA multilingue** (français, anglais, arabe, allemand…)
- **Accessibilité avancée** (sourd, aveugle, TTS, langue des signes, contraste, navigation clavier)
- **Sécurité et confidentialité** (aucune donnée sensible stockée sans consentement)
- **Compatibilité mobile/web** (responsive, UX moderne)
- **Centralisation des accès** : rooms vidéo/3D, wallet, booking, urgence, notifications, etc.

---

## 📁 Structure des composants

- **AssistantAgent.jsx**  
  Composant principal : chat IA, navigation rapide, accessibilité, sécurité, SEO.
- **AssistantPanel.jsx**  
  Panneau latéral/contextuel : mémoire IA, suggestions, notifications, raccourcis.
- **AssistantVoice.jsx**  
  Module vocal : dictée, TTS, commandes vocales, multilingue.
- **AssistantSignLanguage.jsx**  
  Module langue des signes : traduction texte ↔ LSF/ASL, avatar animé, accessibilité sourds.
- **AccueilAgent.jsx**  
  Page d’accueil de l’assistant : présentation de l’écosystème, accès rapide à toutes les fonctions.
- **AssistantMemory.js**  
  Mémoire longue durée : stockage et récupération de l’historique IA (localStorage ou backend).

---

## 🔒 Accessibilité & Sécurité

- Tous les composants sont **accessibles** (aria, clavier, contraste, TTS, langue des signes).
- **Sécurité** : aucune donnée sensible stockée sans consentement, export possible pour accessibilité/support.
- **Mobile first** : design responsive, navigation fluide sur tous supports.

---

## 🚀 Utilisation

1. **Intégration**  
   Importez et utilisez les composants dans vos pages ou dashboards :
   ```jsx
   import AssistantAgent from "./AssistantAgent";
   <AssistantAgent />
   ```
2. **Personnalisation**  
   Branchez sur un backend IA, enrichissez la mémoire/context, ajoutez des modules (booking, domotique…).

3. **Accessibilité**  
   Activez/désactivez les options via le contexte ou les props (dark mode, TTS, langue, etc.).

---

## 🛠️ À compléter / Évolutions

- Intégration d’API de traduction langue des signes (LSF/ASL).
- Connexion à un backend IA pour mémoire/context partagé.
- Ajout de tests unitaires et d’accessibilité automatisés.
- Documentation technique et guides utilisateurs enrichis.

---

## 📄 Documentation

Chaque composant contient une documentation en tête de fichier.  
Pour toute question : consultez la documentation du projet ou contactez l’équipe Achiri.

---

**Achiri – L’assistant inclusif, sécurisé et intelligent, pour tous.**