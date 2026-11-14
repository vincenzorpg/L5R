# 📜 Journal des Modifications (Changelog)

Toutes les modifications notables apportées au projet **Les Chroniques de Rokugan (L5R 4ᵉ Édition)** sont documentées dans ce fichier.

Le format est inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et le projet suit le [Versioning Sémantique (SemVer)](https://semver.org/lang/fr/).

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
