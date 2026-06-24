# Nouvelles fonctionnalités proposées — Imperial Building Group

## Analyse des fonctionnalités existantes

| # | Fonctionnalité | Statut |
|---|---|---|
| 1 | Multilingue (FR/EN/LN/ES/ZH/SW) | ✅ Existant |
| 2 | Mode sombre/clair | ✅ Existant |
| 3 | Navigation responsive mobile | ✅ Existant |
| 4 | Section Héro avec CTA | ✅ Existant |
| 5 | Compteurs animés (chiffres clés) | ✅ Existant |
| 6 | Présentation des services | ✅ Existant |
| 7 | Section À propos avec météo temps réel | ✅ Existant |
| 8 | Témoignages clients (carrousel) | ✅ Existant |
| 9 | Équipe | ✅ Existant |
| 10 | FAQ (accordéon) | ✅ Existant |
| 11 | Partenaires | ✅ Existant |
| 12 | Galerie avec lightbox et filtres | ✅ Existant |
| 13 | Modales de détails des services | ✅ Existant |
| 14 | Formulaire de contact (mailto) | ✅ Existant |
| 15 | Formulaire de candidature (mailto) | ✅ Existant |
| 16 | Newsletter | ✅ Existant |
| 17 | Calculateur de devis (3 étapes) | ✅ Existant |
| 18 | Bannière cookies | ✅ Existant |
| 19 | Bouton retour en haut | ✅ Existant |
| 20 | Bouton WhatsApp flottant | ✅ Existant |
| 21 | Réseaux sociaux | ✅ Existant |
| 22 | PWA (manifest, service worker) | ✅ Existant |
| 23 | SEO (OG, Twitter, Schema.org) | ✅ Existant |
| 24 | Animations au scroll | ✅ Existant |
| 25 | Blog | ✅ Existant |
| 26 | Pages légales (confidentialité, mentions) | ✅ Existant |

---

## Nouvelles fonctionnalités proposées

### 1. 🗓️ **Prise de rendez-vous en ligne** (Haute priorité)
**Description :** Système de réservation de consultations directes avec planning visuel.
- Calendrier interactif avec créneaux disponibles
- Sélection du type de rendez-vous (consultation chantier, devis, visite showroom)
- Confirmation par email automatique
- Synchronisation avec le planning de l'équipe
- **Fichiers :** `booking.html`, sections dans `script.js` et `styles.css`

### 2. 🗺️ **Carte interactive des projets** (Haute priorité)
**Description :** Visualisation géographique des réalisations et chantiers en cours.
- Carte interactive (Leaflet/MapLibre) avec marqueurs des projets
- Filtres par type (résidentiel, commercial, rénovation) et par statut (terminé, en cours)
- Infobulles avec photos et détails du projet
- Clustering pour les zones à forte concentration
- **Fichiers :** `projects-map.html`, `js/map.js`, sections dans `styles.css`

### 3. 🏠 **Simulateur 3D de rénovation avant/après** (Moyenne priorité)
**Description :** Afficheur interactif comparant des projets avant/après avec curseur.
- Images avant/après avec curseur coulissant
- Galerie de projets avec effet "before/after"
- Mode plein écran
- Exemples de différents types de rénovations
- **Fichiers :** `renovation.html`, `js/before-after.js`, sections dans `styles.css`

### 4. 💰 **Économies & ROI Calculateur** (Moyenne priorité)
**Description :** Outil montrant les économies potentielles (énergie, matériaux) en choisissant Imperial Building Group.
- Calculateur d'économies d'énergie (isolation, fenêtres)
- Comparaison prix du marché vs prix négociés
- Visualisation graphique (Chart.js) des économies sur 1/5/10 ans
- Rapport PDF exportable
- **Fichiers :** `savings-calculator.html`, sections dans `script.js` et `styles.css`

### 5. 🛒 **Marketplace Matériaux** (Haute priorité)
**Description :** Mini-catalogue e-commerce pour la vente de matériaux de construction.
- Catalogue des matériaux avec photos et prix indicatifs
- Catégories : ciment, fer, carrelage, peinture, plomberie, etc.
- Panier simple (sans paiement en ligne → demande de devis panier)
- Envoi du panier par email à l'équipe commerciale
- **Fichiers :** `materials.html`, `js/marketplace.js`, sections dans `styles.css`

### 6. 💬 **Chatbot Assistant construction** (Moyenne priorité)
**Description :** Assistant virtuel répondant aux questions fréquentes sur les services.
- Interface de chat flottante sur toutes les pages
- Réponses automatiques aux questions courantes (devis, délais, matériaux)
- Escalade vers un conseiller humain (WhatsApp / email)
- Suggestions de questions en fonction du contexte
- Mode sombre/clair adapté
- **Fichiers :** `js/chatbot.js`, sections dans `styles.css` et inclusion dans `index.html`

### 7. 📊 **Tableau de bord client (suivi de projet)** (Basse priorité mais fort impact)
**Description :** Espace client sécurisé pour suivre l'avancement des chantiers.
- Page de connexion client (mot de passe + email)
- Timeline visuelle du projet avec jalons
- Galerie de photos du chantier (avant/pendant)
- Statut en temps réel (en attente, en cours, terminé)
- Messagerie directe avec le chef de projet
- **Fichiers :** `client-dashboard.html`, `js/client-portal.js`, sections dans `styles.css`

### 8. 🔔 **Notifications push PWA + Alerte promo** (Moyenne priorité)
**Description :** Notifications pour les promotions, nouveaux projets, articles de blog.
- Bouton "S'abonner aux notifications"
- Notifications pour : nouveaux services, promotions saisonnières, articles blog
- Gestion des préférences de notification
- Compatible PWA (service worker étendu)
- **Fichiers :** Mise à jour de `sw.js`, sections dans `script.js`

---

## Recommandation d'implémentation

| Priorité | Fonctionnalité | Complexité | Impact |
|---|---|---|---|
| 🔴 Haute | Prise de rendez-vous | Moyenne | Très élevé |
| 🔴 Haute | Carte interactive projets | Faible | Élevé |
| 🔴 Haute | Marketplace matériaux | Moyenne | Très élevé |
| 🟡 Moyenne | Simulateur avant/après | Faible | Moyen |
| 🟡 Moyenne | Calculateur ROI/économies | Faible | Moyen |
| 🟡 Moyenne | Chatbot assistant | Haute | Élevé |
| 🟡 Moyenne | Notifications push | Faible | Moyen |
| 🟢 Basse | Dashboard client | Très haute | Très élevé |

---

## Résumé des nouveaux fichiers à créer

```
/
├── booking.html           # Prise de rendez-vous en ligne
├── projects-map.html      # Carte interactive des projets
├── renovation.html        # Simulateur avant/après
├── savings-calculator.html # Calculateur d'économies
├── materials.html         # Marketplace matériaux
├── client-dashboard.html  # Espace client (futur)
├── js/
│   ├── map.js             # Logique carte interactive
│   ├── before-after.js    # Slider avant/après
│   ├── marketplace.js     # Panier matériaux
│   └── chatbot.js         # Chatbot assistant
└── (Mise à jour)
    ├── index.html         # Ajout liens navigation + chatbot
    ├── script.js          # Nouvelles traductions + initialisations
    ├── styles.css         # Nouveaux styles
    └── sw.js              # Notifications push