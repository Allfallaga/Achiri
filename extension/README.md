# Achiri Extension IA

Extension Chrome/Edge pour la plateforme Achiri : accessibilité, santé, domotique, éducation, influenceur.  
Design avancé, sécurité, SEO, compatible mobile/web, extensible.

---

## 🚀 Fonctionnalités principales

- **Accessibilité IA** : bouton d’activation, overlay, feedback vocal, ARIA, navigation clavier.
- **Santé IA** : alertes santé, notifications natives, intégration avec la plateforme Achiri.
- **Domotique IA** : commandes domotiques (ex : lumière, volets), feedback immédiat.
- **Notifications** : natives, feedback utilisateur, sécurité renforcée.
- **Rôles & sécurité** : gestion des rôles, permissions, pas de fuite de données.
- **Design responsive** : popup moderne, couleurs Achiri, mobile/web.
- **SEO & PWA-ready** : manifest structuré, métadonnées, accessibilité.
- **Prêt pour extensions** : badges, analytics, dark mode, multi-langues, options avancées.

---

## 📦 Structure du dossier

- `manifest.json` : Manifest V3, permissions minimales, SEO, sécurité.
- `background.js` : Service worker, gestion des messages, sécurité, logs contrôlés.
- `contentScript.js` : Injection DOM, accessibilité, overlay IA, nettoyage, responsive.
- `popup.html` : UI popup, design avancé, accessibilité, responsive.
- `popup.js` : Logique métier popup, feedback, sécurité, actions IA.
- `icon.png` : Icône de l’extension.
- `options.html` (optionnel) : Page d’options pour personnalisation future.

---

## 🛠️ Installation & développement

1. Ouvre Chrome/Edge, va dans `chrome://extensions/`
2. Active le **mode développeur**
3. Clique sur **Charger l’extension non empaquetée**
4. Sélectionne le dossier `/extension` du projet Achiri

---

## 🔒 Sécurité & accessibilité

- Permissions strictes (`storage`, `notifications`, `activeTab`, `scripting`)
- Pas de fuite de données, validation des messages, logs limités
- ARIA, focus visible, navigation clavier, contrastes élevés
- Nettoyage DOM sur navigation (SPA, hashchange)
- Prêt pour audits Lighthouse (accessibilité, SEO, PWA)

---

## 🌐 Compatibilité

- Chrome, Edge (Manifest V3)
- Responsive popup, overlay mobile/web
- Prêt pour extensions futures (badges, dark mode, analytics…)

---

## 📚 Documentation rapide

- **background.js** : messages (auth, IA, santé, domotique, notifications, badges…)
- **contentScript.js** : injection bouton IA, overlay, feedback, nettoyage
- **popup.html/js** : UI, actions IA, feedback, accessibilité
- **manifest.json** : SEO, sécurité, permissions, options

---

## 🤝 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feat/ma-feature`)
3. Commit (`git commit -am 'feat: nouvelle feature extension'`)
4. Push (`git push origin feat/ma-feature`)
5. Ouvre une Pull Request

---

## 📝 Licence

MIT © 2025 Achiri Team

---

**Besoin d’aide ou envie de contribuer ?**  
Contacte-nous ou ouvre une issue sur GitHub !

---