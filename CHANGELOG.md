# 📜 Journal des Modifications (Changelog)

Toutes les modifications notables apportées au projet **Les Chroniques de Rokugan (L5R 4ᵉ Édition)** sont documentées dans ce fichier.

Le format est inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et le projet suit le [Versioning Sémantique (SemVer)](https://semver.org/lang/fr/).

---

## [1.3.2] — 2026-11-15

### 🔄 Modifié

- **Thème par défaut (`js/navbar.js`)** :
  - Activation du **Mode Sombre (« Laque Noire »)** par défaut pour tous les visiteurs lorsque aucune préférence n'est enregistrée dans `localStorage` (`l5r_rokugan_theme`), sans basculer automatiquement sur le mode clair selon `prefers-color-scheme: light`.
  - Le choix manuel via le bouton de bascule de thème dans la barre de navigation reste mémorisé dans `localStorage`.

---

## [1.3.1] — 2026-11-15

### 🐛 Corrigé

- **Mode Clair « Parchemin Washi » (`css/main.css` & `grimoire.html`)** :
  - Correction du contraste et de la visibilité des textes dans le **Grimoire (`grimoire.html`)** : suppression du bloc `<style>` inline qui maintenait les cartes de sorts (`.card-spell`), les champs de recherche (`input`, `select`) et les sous-encadrés (`bg-stone-950/90`, `bg-black/40`) sur un fond noir alors que les textes basculaient en brun foncé.
  - Adaptation complète des badges élémentaires et thématiques (`.badge-terre`, `.badge-eau`, `.badge-feu`, `.badge-air`, `.badge-vide`, `.badge-universel`, `.badge-kiho`, `.badge-maho`, `.badge-elem-*`, `.badge-dragon`, `.badge-clan`, `.badge-shadow`, `.badge-legend`) avec des couleurs haute lisibilité en Mode Clair.
  - Conversion automatique en Mode Clair de toutes les variantes d'arrière-plans sombres (`bg-black/*`, `bg-stone-950/*`, `bg-stone-900/*`, `bg-*-950/*`, dégradés de clans et pensées intérieures `.inner-thought`) ainsi que des classes de texte pastel (`text-emerald-*`, `text-teal-*`, `text-sky-*`, `text-blue-*`, `text-purple-*`, `text-red-*`, `text-amber-*`) sur l'ensemble du site.

---

## [1.3.0] — 2026-11-15

### ✨ Ajouté

- **Studio de Publication de Scénario & Soumission Directe GitHub (`campagne-ajouter.html` & `js/campagne-studio.js`)** :
  - **Import intelligent en 1 glisser-déposer (`.txt`, `.md`, `.html`)** : détection automatique du titre, du numéro d'acte suivant (`Acte 11`+), du titre court de frise et du résumé d'accroche.
  - **Barre d'outils d'enrichissement L5R** : insertion rapide de chapitres/jours (`##`), de pensées intérieures (`*...*`), de dialogues encadrés (`>`) et d'illustrations de scène (`[Image: ... | ...]`), avec **Aperçu Visuel en Direct** et test immédiat de synthèse vocale.
  - **Génération HTML au standard complet des Actes 1 à 10** : inclusion automatique du lecteur vocal HD paragraphe par paragraphe (`js/narrator.js` : sélection de voix française, vitesse, barre de progression), des balises `<meta name="l5r-scenario-*">` d'auto-découverte et des liens inter-scénarios.
  - **3 modes de publication GitHub intégrés** :
    1. **Mode Recommandé (Zéro Configuration — Pull Request Pré-remplie)** : ouvre directement l'interface GitHub `/new/main` avec le chemin `campagne/scenario-X.html` et le code HTML pré-remplis (et copiés dans le presse-papiers) prêts à être soumis en Pull Request en un clic.
    2. **Mode Direct 1-Clic via API GitHub** : création directe en arrière-plan de la branche `feat/scenario-X`, des commits (`campagne/scenario-X.html` + `data/scenarios-data.js`) et de la Pull Request depuis la page via un *Personal Access Token*.
    3. **Mode Téléchargement `.html` local & test vocal instantané**.
- **Registre Centralisé & Auto-Découverte des Scénarios (`data/scenarios-data.js`)** :
  - Source unique de vérité (`window.SCENARIOS_DATA` / `module.exports`) partagée entre `index.html`, `campagne.html` et `campagne-ajouter.html`.
  - Fonction `discoverNewScenarios()` détectant automatiquement tout nouveau fichier `campagne/scenario-11.html`+ ajouté au dépôt (via ses balises `<meta name="l5r-scenario-*">`) pour l'afficher sans configuration supplémentaire sur le catalogue et la frise d'accueil.

### 🔄 Modifié

- **Catalogue de Campagne (`campagne.html`)** : suppression du tableau `SCENARIOS_DATA` codé en dur (fichier allégé de 228 à 68 lignes) au profit de `data/scenarios-data.js`.

---

## [1.2.0] — 2026-11-15

### ✨ Ajouté

- **Nouveaux Modules JavaScript Dédiés (`js/`)** :
  - `js/forge-ui.js` : centralisation de l'interface étendue de la Forge de personnage (gestion des Sorts & Kihos, Katas martiaux, Tatouages Togashi *Ise Zumi*, sélection multiple des compétences, plateau de dés *Roll & Keep* `XgY`, Dojo local et génération dynamique à la volée du questionnaire des **20 Questions de Rokugan** `#q20-1`..`#q20-20` ainsi que du **Dossier d'Impression Officiel A4** `#official-print-dossier`).
  - `js/narrator.js` : moteur vocal narrateur unifié (`window.speechSynthesis`) pour les 10 actes de la campagne (`campagne/scenario-1.html` à `scenario-10.html`), prenant en charge à la fois la lecture paragraphe par paragraphe avec voix HD et surlignage actif (Actes 1 et 4 à 10) et le sélecteur multi-versions à onglets (Actes 2 et 3).
  - `js/campagne-studio.js` : extraction de la logique de glisser-déposer, de test audio et de génération de page HTML du studio `campagne-ajouter.html`.
  - `js/tatouages.js` : extraction du moteur de recherche, de filtrage par catégorie et de modale détaillée du codex `tatouages.html`.
  - `js/index-ui.js` : génération déclarative de la frise des 10 scénarios, des cartes des 8 Grands Clans et de la galerie locale du Dojo sur le portail `index.html`.

### 🔄 Modifié

- **Allègement massif des pages HTML (> 4 500 lignes de code dupliqué ou inline supprimées)** :
  - `createcharacter.html` réduit de **2 421 lignes à 983 lignes** (-60 %).
  - `index.html` réduit de **910 lignes à 587 lignes** (-35 %).
  - `tatouages.html` réduit de **373 lignes à 136 lignes** (-64 %).
  - `campagne-ajouter.html` réduit de **247 lignes à 94 lignes** (-62 %).
  - `campagne/scenario-1.html` à `scenario-10.html` allégés d'environ **220 à 260 lignes chacun** grâce à la suppression des blocs `<style>` et `<script>` dupliqués.
- **Centralisation du Versioning et des Styles Globaux (`js/navbar.js` & `css/main.css`)** :
  - Ajout de `syncFooterVersion()` dans `js/navbar.js` et suppression des 27 scripts inline `fetch('version.json')` dupliqués dans les pieds de page HTML.
  - Regroupement dans `css/main.css` de toutes les classes utilitaires partagées (`.badge-adv`, `.badge-dis`, `.badge-elem-*`, `.badge-dragon`, `.badge-clan`, `.badge-shadow`, `.badge-legend`, `.die-anim`, `.inner-thought`, `.scene-figure`, `.scene-caption`, `.reading-active`, `.tab-btn.active` et règles `@media print` A4).

---

## [1.1.0] — 2026-11-15

### ✨ Ajouté

- **Suite de Tests Unitaires Universelle (`tests/unit-tests.js` & `tests/unit-tests.html`)** :
  - Ajout d'une suite de tests unitaires autonome en Vanilla JavaScript (sans dépendance `npm`), exécutable à la fois sous **Node.js** (`node tests/unit-tests.js`) et directement dans le **navigateur** (`tests/unit-tests.html`).
  - Couverture complète des 4 moteurs de calcul du projet :
    1. **Forge de personnage (`js/character-generator.js`)** : calcul des Anneaux (`calculateRings`), Réputation et Rang d'École (`calculateInsightAndRank`), coûts progressifs d'XP des Traits (`calculateTraitXpCost` avec *Bénédiction Élémentaire*), du Vide (`calculateVoidXpCost` avec *Illuminé*) et des Compétences (`calculateSkillXpCost` avec *Prodige*, *Esprit Obtus* et Spécialisations), réductions et gains d'Avantages/Désavantages par Clan et École (`buildCharacterContextFromInputs`, `getEffectiveAdvCost`, `getEffectiveDisadvGain`), ND d'Armure (`calculateArmorTN`), paliers de blessures (`calculateWoundThresholds` incluant *Guerrier de Fer Daidoji*) et paliers de maîtrise (`getMasteriesSummary`).
    2. **Lanceur de dés Roll & Keep (`js/character-generator.js` & `createcharacter.html`)** : analyseur de formules `XgY + Z` (`parseRollKeepFormula`), règle officielle des 10 dés (`applyTenDiceRule`) et moteur de simulation déterministe (`simulateRollAndKeep` avec explosion des `10` et relance des `1` en spécialisation).
    3. **Grimoire (`js/grimoire.js`)** : normalisation et sécurisation XSS (`normalizeText`, `slugify`, `escapeHtml`), qualification des Sorts/Kihos/Mahō (`getRank`, `isSpellKiho`, `getSpellElement`, `isValidMahoPassword`) et moteur de filtrage pur (`filterSpellsList`).
    4. **Export JSON « Carnet de Rokugan » (`js/export-carnet.js`)** : résolution canonique des Clans (`resolveCanonClan`) et identifiants d'Écoles (`resolveSchoolIdFromText`), normalisation des Compétences et spécialisations (`normalizeSkillEntry`), calcul de l'Insight Carnet (`calculateCarnetRingsAndInsight`) et génération des structures `schemaVersion: 2` (`resolveCarnetArmor`, `resolveCarnetWeapons`, `buildCarnetModifiers`).

---

## [1.0.3] — 2026-11-15

### 🐛 Corrigé

- **Forge du Samouraï (`js/character-generator.js`) — Avantages « Études dans une Autre École » & « Écoles Multiples »** :
  - **Harmonisation visuelle complète** : les listes déroulantes d'écoles affichées dans les cartes d'avantages **Études dans une Autre École** et **Écoles Multiples** utilisent désormais exactement la même structure d'`<optgroup>` (`🏯 Écoles du Clan...` puis `🎓 Autres Clans`) et le même style (`p-2.5 rounded font-medium`) que la liste déroulante principale **« École de Clan (Rang 1) »** de la section 1 via la fonction partagée `buildGroupedSchoolOptionsHtml()`.
  - **Correction de la disparition des écoles du clan d'origine** : suppression du filtre `s.clanKey !== currentClanKey` qui faisait disparaître les écoles des familles du clan actuel (ex. Hida, Hiruma, Kaiu, Kuni, Yasuki pour le Clan du Crabe) lorsqu'un samouraï prenait l'avantage *Études dans une Autre École* pour suivre l'école d'une autre famille de son propre clan.

---

## [1.0.2] — 2026-11-14

### 🐛 Corrigé

- **Forge du Samouraï (`createcharacter.html`, `css/main.css`) — Adaptation mobile des listes déroulantes** :
  - Correction du dépassement horizontal sur écran mobile des menus déroulants **Avantages** (`#sel-catalog-adv`), **Désavantages** (`#sel-catalog-disadv`), **Choisir un sort ou kiho** (`#sel-catalog-spell`), **Choisir un tatouage** (`#sel-catalog-tattoo`) et **Choisir un kata** (`#sel-catalog-kata`).
  - Ajout des contraintes Flexbox/Grid (`flex-1 w-0 min-w-0 max-w-full truncate`, `min-w-0 overflow-hidden` sur les panneaux parents) et d'une règle CSS globale sur `select` (`max-width: 100%; min-width: 0; text-overflow: ellipsis;`) pour empêcher les `<option>` longues d'étirer les conteneurs au-delà de la largeur de l'écran mobile.
  - Passage des filtres de Sorts/Kihos et Katas en grille responsive (`grid-cols-1 sm:grid-cols-2`).

---

## [1.0.1] — 2026-11-14

### 🔄 Modifié

- **Centralisation du favicon officiel (`assets/images/favicon_cinq_anneaux.png`) dans `js/navbar.js`** :
  - Ajout de la fonction `ensureFavicon()` dans `js/navbar.js` pour injecter dynamiquement `<link rel="icon" type="image/png" href="...assets/images/favicon_cinq_anneaux.png">` avec détection automatique du chemin relatif (`./` ou `../`).
  - Suppression des anciennes balises `<link rel="icon">` SVG/inline en dur dans les **27 pages HTML** du site (ainsi que dans le modèle de génération de `campagne-ajouter.html`) afin que le favicon soit désormais géré à 100 % de manière centralisée par `js/navbar.js`.

---

## [1.0.0] — 2026-11-14

### 🎉 Version Initiale Complète (`v1.0.0`)

Première version officielle stabilisée du portail interactif **Les Chroniques de Rokugan**, regroupant les outils de table, l'encyclopédie impériale, la Forge de Personnage et les annales audio de la campagne du MJ David.

#### ✨ Ajouté

- **Portail d'Accueil (`index.html`)** :
  - Vitrine interactive de la campagne avec accès direct aux 10 actes, aux 8 Grands Clans, aux 3 Aides de Jeu et aux Outils.
  - Section dynamique **« Mon Dojo Personnel »** affichant automatiquement l'escouade de samouraïs sauvegardée dans le navigateur (`localStorage`).
- **Barre de Navigation Globale & Thème (`js/navbar.js`, `css/main.css`)** :
  - Menu responsive multi-niveaux (Bureau & Mobile) avec ornements Kanji et détection automatique de la profondeur d'arborescence.
  - Bascule instantanée entre le **Mode Sombre (Laque Noire /月)** et le **Mode Clair (Parchemin Washi / 陽)** avec persistance locale.
- **Forge de Personnage (`createcharacter.html`, `js/character-generator.js`)** :
  - Calculs automatisés L5R 4e Édition : Anneaux, 8 Traits, Réputation (*Insight* et Rangs 1 à 5+), ND d'Armure, Initiative canonique, Seuils de Blessures et récupération journalière.
  - Moteur de budget d'Expérience (base 40 XP, plafond de 15 XP de Désavantages, réductions de coûts claniques et d'archétypes, gestion d'*Illuminé*, *Prodige*, *Bénédiction Élémentaire*, *Esprit Obtus*, *Écoles Multiples* et *Études dans une Autre École*).
  - Déblocage automatique des **Paliers de Maîtrise** des compétences aux Rangs 3, 5 et 7.
  - Panneaux mystiques et martiaux dynamiques selon l'archétype :
    - **Shugenja** : sélection de sorts, calcul des emplacements quotidiens (*slots*), gestion des Affinités/Déficiences et jets d'incantation directs.
    - **Bushi** : catalogue et activation des Katas martiaux avec vérification des prérequis d'Anneau.
    - **Moine** : intégration des Kihos de la Confrérie de Shinsei.
    - **Moine Tatoué Togashi (*Ise Zumi*)** : sélection et suivi des Tatouages sacrés selon le quota du Rang d'École.
  - **Générateur Procédural de Légende** : biographie en 3 actes et remplissage automatique contextualisé du questionnaire des *20 Questions de Rokugan*.
  - **Plateau de Dés « Roll & Keep » ($X\text{g}Y$)** : lanceur intégré avec explosion des 10 et relance des 1 (spécialisations).
  - **Persistance & Partage** : sauvegarde de brouillon automatique, enregistrement dans le Dojo local, partage par URL encodée en Base64 et impression A4 vectorielle officielle.
- **Interopérabilité « Le Carnet de Rokugan » (`js/export-carnet.js`)** :
  - Export JSON 100 % conforme au standard `schemaVersion: 2` (v2.18.0+) de [nelsio/carnet-l5r](https://nelsio.github.io/carnet-l5r/).
  - Mapping canonique des identifiants d'écoles (`CARNET_SCHOOL_CATALOG`), normalisation des compétences, conversion des traits en anglais et export des armes/armures (`bowStrength`, mots-clés d'armes).
- **Grimoire des Prières, Sortilèges & Kihos (`grimoire.html`, `js/grimoire.js`, `data/sorts-data.js`, `data/sorts/`)** :
  - Recherche et filtrage instantanés par texte, Élément/Voie (Universels, Terre, Eau, Feu, Air, Vide, Kihos, Mahō) et Rang de Maîtrise (0 à 6).
  - Aide de jeu tactique pliable détaillant les règles d'invocation des Kamis et le tableau d'acquisition des Kihos hors-Confrérie (*Livre de l'Eau*).
  - Mise en surbrillance automatique par ancre URL (`#sort-<id>`) depuis la Forge de Personnage.
  - **Sceau de Mahō** : verrouillage par mot de passe des sortilèges de magie du sang.
- **Codex des Tatouages Sacrés (`tatouages.html`, `data/tatouages-data.js`)** :
  - Règles officielles de l'Ordre Togashi (*Ise Zumi*) et explorateur interactif avec modale de détail.
- **Chroniques de Campagne & Narration Vocale (`campagne.html`, `campagne-ajouter.html`, `campagne/scenario-1.html` à `scenario-10.html`)** :
  - Intégralité des 10 scénarios illustrés de la campagne du MJ David (*Championnat de Topaze* jusqu'à *La tombe de Iuchiban*).
  - Récits croisés multi-points de vue PJ sur les Actes 2 et 3.
  - **Lecteur Vocal Narrateur** (`window.speechSynthesis`) avec sélection de voix françaises, contrôle de vitesse et surlignage dynamique paragraphe par paragraphe.
  - Studio d'import (`campagne-ajouter.html`) permettant de convertir un fichier `.txt`/`.md` en page HTML de scénario prête à l'emploi.
- **Encyclopédie des Huit Grands Clans (`clans/*.html`, `data/clans-data.js`)** :
  - Monographies complètes pour le Crabe, la Grue, le Dragon, le Lion, la Mante, le Phénix, le Scorpion et la Licorne (lore, familles, écoles de base, voies alternatives et écoles avancées).
- **Mémentos d'Arbitrage Tactique (`aides/*.html`)** :
  - *Combat & Duels Iaijutsu* (`combat-memento.html`), *Code du Bushido & Honneur* (`bushido-honneur.html`) et *Étiquette & Coutumes* (`etiquette-coutumes.html`).
- **Système de Versioning & Documentation (`version.json`, `README.md`, `CHANGELOG.md`, `GEMINI.md`)** :
  - Fichier `version.json` centralisé (`v1.0.0`) et affichage discret de la version courante avec lien vers les Releases GitHub dans le pied de page de toutes les pages HTML.
