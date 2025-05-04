# Composants 3D – Achiri

Bienvenue dans le dossier **3d** du projet **Achiri**.

---

## 🌐 Mission

Ce dossier regroupe tous les composants de la **classe virtuelle 3D** Achiri :

- **Salle immersive** : avatars 3D interactifs, vidéo/audio temps réel, chat, tableau blanc collaboratif, notifications, modération.
- **Accessibilité avancée** : TTS, langue des signes, sous-titres, contraste élevé, navigation clavier, focus visible, mobile first.
- **Sécurité & confidentialité** : WebRTC natif (aucune dépendance payante), aucune donnée sensible stockée sans consentement, navigation sécurisée.
- **Compatibilité mobile/web** : design responsive, UX moderne, dark mode, SEO friendly.

---

## 📁 Structure des composants

- **VideoClassRoom3D.jsx**  
  Salle de classe virtuelle 3D : vidéo, audio, chat, avatars, notifications, accessibilité, SEO, modération.
- **Avatar3D.jsx**  
  Avatar stylisé pour chaque participant : nom, statut (parle, muet, main levée), badges, points, overlay modération, focus visible.
- **Whiteboard3D.jsx**  
  Tableau blanc collaboratif : dessin, annotation, export image, outils accessibles, avatars connectés, notifications, prêt pour moteur 3D.

---

## ♿ Accessibilité & Sécurité

- **Accessibilité complète** :  
  - Attributs ARIA, navigation clavier, contraste élevé, focus visible.
  - Prise en charge TTS, langue des signes, sous-titres temps réel.
  - Responsive/mobile first, dark mode natif.
- **Sécurité** :  
  - WebRTC natif, aucune dépendance à des services payants.
  - Pas de stockage de données sensibles sans consentement.
  - Export possible pour accessibilité/support.
- **SEO** :  
  - Titres et descriptions dynamiques via Helmet.
  - Structure sémantique claire.

---

## 🚀 Utilisation

1. **Intégration**
   ```jsx
   import VideoClassRoom3D from "./VideoClassRoom3D";
   <VideoClassRoom3D roomId="..." user={user} />
   ```
2. **Personnalisation**
   - Branchez sur un backend pour la synchronisation temps réel (WebRTC, socket.io…).
   - Ajoutez des moteurs 3D (three.js, babylon.js…) pour enrichir l’expérience.
   - Activez/désactivez les options via le contexte ou les props (dark mode, TTS, langue, etc.).

3. **Accessibilité**
   - Toutes les fonctionnalités sont accessibles clavier/souris/tactile.
   - Contrôles pour la langue des signes, sous-titres, contraste, etc.

---

## 🛠️ À compléter / Évolutions

- Intégration d’un vrai moteur 3D (three.js, babylon.js…).
- Synchronisation tableau blanc et avatars en temps réel (socket.io).
- Ajout de tests unitaires et d’accessibilité automatisés.
- Documentation technique et guides utilisateurs enrichis.
- Analytics, logs d’activité, extensions IA.

---

## 📄 Documentation

Chaque composant contient une documentation en tête de fichier.  
Pour toute question : consultez la documentation du projet ou contactez l’équipe Achiri.

---

## 🎨 Design & Branding

- Design avancé, branding Achiri, couleurs accessibles, animations douces.
- Prêt pour extensions futures (badges, points, overlays, notifications, modération…).

---

**Achiri – La classe virtuelle 3D inclusive, sécurisée et intelligente, pour tous.**