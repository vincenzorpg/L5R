# 🏯 Les Chroniques de Rokugan — L5R 4ᵉ Édition
> *« Dans mon sabre, le vent. Dans mon cœur, le courage. Dans mes yeux, la mort. »*

[![Version](https://img.shields.io/badge/Version-v1.18.0-d4af37?style=flat-square)](https://github.com/vincenzorpg/L5R/releases)
[![GitHub Pages](https://img.shields.io/badge/Déploiement-GitHub%20Pages-success?style=flat-square&logo=github)](https://vincenzorpg.github.io/L5R/)
[![Système](https://img.shields.io/badge/JDR-L5R%204e%20Édition-b45309?style=flat-square)](https://vincenzorpg.github.io/L5R/)
[![Compatibilité](https://img.shields.io/badge/Export%20JSON-Carnet%20de%20Rokugan%20v2-emerald?style=flat-square)](https://nelsio.github.io/carnet-l5r/)
[![Licence](https://img.shields.io/badge/Licence-Tous%20droits%20r%C3%A9serv%C3%A9s-991b1b?style=flat-square)](LICENSE)

Portail numérique interactif, boîte à outils d'arbitrage et annales officielles de jeu de rôle sur table pour **La Légende des Cinq Anneaux (4ᵉ Édition)**, consacré à la **Campagne de la Chronique de Rokugan**.

Le site réunit une **Forge de Samouraïs** automatisée, un **Grimoire** des prières et sortilèges, un **Recueil dédié des Kihos**, un **Codex des Tatouages Togashi**, l'**Encyclopédie des Huit Grands Clans**, l'**Écran du Maître du Jeu**, des **Mémentos d'Arbitrage Tactique** et nos **10 Scénarios de Campagne** illustrés et narrés vocalement.

🌐 **Site officiel en ligne :** [https://vincenzorpg.github.io/L5R/](https://vincenzorpg.github.io/L5R/)  
📦 **Releases & Versions :** [https://github.com/vincenzorpg/L5R/releases](https://github.com/vincenzorpg/L5R/releases)

---

## 📑 Table des Matières

- [Présentation & Fonctionnalités Clés](#-présentation--fonctionnalités-clés)
  - [1. Portail d'Accueil & Dojo Personnel (`index.html`)](#1-portail-daccueil--dojo-personnel-indexhtml)
  - [2. La Forge de Personnage (`createcharacter.html`)](#2-la-forge-de-personnage-createcharacterhtml)
  - [3. Le Grimoire des Éléments & Kihos (`grimoire.html`)](#3-le-grimoire-des-éléments--kihos-grimoirehtml)
  - [4. Le Codex des Tatouages Sacrés (`tatouages.html`)](#4-le-codex-des-tatouages-sacrés-tatouageshtml)
  - [5. Les Chroniques de Campagne & Narration Vocale (`campagne.html`)](#5-les-chroniques-de-campagne--narration-vocale-campagnehtml)
  - [6. L'Encyclopédie des Huit Grands Clans (`clans/`)](#6-lencyclopédie-des-huit-grands-clans-clans)
  - [7. Les Mémentos d'Arbitrage Tactique (`aides/`)](#7-les-mémentos-darbitrage-tactique-aides)
- [Arborescence Complète du Dépôt](#-arborescence-complète-du-dépôt)
- [Architecture Technique & Thèmes](#-architecture-technique--thèmes)
- [Compatibilité « Le Carnet de Rokugan » (`schemaVersion: 2`)](#-compatibilité--le-carnet-de-rokugan-schemaversion-2)
- [Système de Versioning Centralisé](#-système-de-versioning-centralisé)
- [Installation & Utilisation Locale](#-installation--utilisation-locale)
- [Workflow Git & Contribution](#-workflow-git--contribution)
- [Crédits & Mentions Légales](#-crédits--mentions-légales)

---

## ✨ Présentation & Fonctionnalités Clés

### 1. Portail d'Accueil & Dojo Personnel (`index.html`)
- **Tableau de Bord Impérial :** Accès rapide à la Forge PJ, au Grimoire, aux 10 Scénarios de campagne, aux 8 Grands Clans et aux 3 Aides de Jeu.
- **Mon Dojo Personnel (`localStorage`) :** Détection et affichage automatiques des fiches de personnages sauvegardées localement par le joueur, avec résumé tactique (Clan, École, Réputation, Honneur, jet d'attaque, ND d'Armure) et réouverture en un clic dans la Forge.

### 2. La Forge de Personnage (`createcharacter.html`)
Un atelier complet de création et d'évolution de samouraï en **6 étapes guidées** (avec mode **Vue Complète** `Alt+0`, cockpit XP en direct avec ventilation des coûts et tiroir Dojo repliable), respectant fidèlement les règles officielles du *Livre de Base 4ᵉ Édition* :
- **Calculs Automatisés en Temps Réel :**
  - Rangs d'Anneaux (Terre, Eau, Air, Feu, Vide) et des 8 Traits associés, avec application automatique des bonus de Famille et d'École.
  - Calcul de la **Réputation (*Insight*)** (`(Somme des Anneaux × 10) + Somme des Compétences` + bonus d'équipement) et détermination du **Rang de Réputation** (Rangs 1 à 5+).
  - Calcul du **ND d'Armure** (`5 + (5 × Réflexes) + Bonus d'Armure`), de l'**Initiative** (`[Rang de Réputation + Réflexes] g Réflexes`), des **8 Paliers de Blessures** et du taux de récupération nocturne (`(Constitution × 2) + Rang de Réputation`).
- **Moteur de Budget d'Expérience (XP) :**
  - Base de 40 XP personnalisable et contrôle strict du plafond de **10 XP maximum de Désavantages** (*Livre de Base 4ᵉ Éd.*, p. 145).
  - Prise en compte automatique des réductions de coûts et modificateurs d'avantages/désavantages : *Illuminé*, *Bénédiction Élémentaire*, *Prodige*, *Esprit Obtus*, *Ami de la Confrérie*, *Ami des Éléments*, *Écoles Multiples* et *Études dans une Autre École*.
- **Paliers de Maîtrise des Compétences :** Déblocage visuel automatique des dons de maîtrise aux **Rangs 3, 5 et 7** (Kenjutsu, Iaijutsu, Kyujutsu, Armes Lourdes, Jiujutsu, Défense, Courtisan, Enquête, Athlétisme, Armes d'Hast, Lances...).
- **Panneaux d'Archétypes Dynamiques :**
  - **Voie des Kamis (Shugenja) :** Sélection des sorts, suivi des emplacements quotidiens (*slots*) par élément, gestion des Affinités/Déficiences (+1/-1 au Rang d'École effectif) et bouton de jet d'incantation direct.
  - **Voie Martiale (Bushi) :** Catalogue des Katas martiaux (`data/katas-data.js`), vérification automatique du prérequis d'Anneau et activation d'un Kata en combat.
  - **Voie de la Confrérie (Moine) :** Accès aux Kihos mystiques, martiaux, internes et karmiques.
  - **Chair Tatouée (*Ise Zumi* Togashi) :** Sélection et gestion des Tatouages sacrés selon le quota officiel par Rang d'École (`2` aux Rangs 1–2, `4` aux Rangs 3–4, `6` au Rang 5).
- **Générateur Procédural de Légende :** Rédaction automatique d'une biographie en 3 actes et remplissage contextuel du questionnaire officiel des **20 Questions de Rokugan** selon le clan, la famille, l'école, l'arme et les avantages/désavantages choisis.
- **Plateau de Dés « Roll & Keep » ($X\text{g}Y$) :** Lanceur de dés D10 intégré avec explosion automatique des 10, relance des 1 (spécialisations) et historique détaillé des dés gardés.
- **Sauvegarde, Partage & Impression A4 :**
  - Sauvegarde automatique du brouillon et enregistrement multi-personnages dans **Mon Dojo**.
  - Génération d'un lien de partage universel encodé en Base64 (`?char=...`).
  - **Dossier d'Impression Officiel A4** vectoriel prêt pour l'impression papier ou PDF (`@media print`).

### 3. Le Grimoire des Sorts (`grimoire.html`) & le Recueil des Kihos (`kihos.html`)
- **Grimoire des Sorts (`grimoire.html`) :** 308 sortilèges répartis entre prières universelles (5 sorts), sorts des 5 Éléments (Terre, Eau, Feu, Air, Vide) de Maîtrise 1 à 6 et 46 sortilèges interdits de Mahō sous mot de passe.
- **Recueil des Kihos (`kihos.html`) :** Page dédiée aux 64 Kihos des moines (Interne, Martial, Kharmique, Mystique, attaques *Atemi*) avec mémento officiel et tableau d'acquisition (*Livre de Base* p. 266).
- **Filtrage Instantané & Permaliens :** Recherche par nom, mot-clé ou effet et ciblage direct par ancre URL (`grimoire.html#sort-<id>`, `kihos.html#kiho-<id>`).

### 4. Le Codex des Tatouages Sacrés (`tatouages.html`)
- **Référentiel de l'Ordre Togashi (`data/tatouages-data.js`) :** Règles officielles des moines tatoués *Ise Zumi* (progression aux Rangs 1, 3 et 5, activation en Action Gratuite, durée `2 × Rang d'École` rounds, tatouages fusionnés).
- **Explorateur Interactif :** Recherche instantanée par nom, kanji, effet mécanique ou ouvrage source, et fenêtre modale de consultation détaillée.

### 5. Les Chroniques de Campagne & Narration Vocale (`campagne.html`)
- **Les 10 Scénarios Officiels (`campagne/scenario-1.html` à `scenario-10.html`) :**
  1. *Acte 1 — Championnat de Topaze* (Village de Tsuma)
  2. *Acte 2 — Meurtre au Château de Kyoteï* (3 versions croisées : Okado Hiruma, Tsuruchi Akira, Hida Samui)
  3. *Acte 3 — Le dernier voyage* (2 versions croisées : Ryûmitaka Isawa, Tsuruchi Akira)
  4. *Acte 4 — Aux côtés de mes frères morts* (Lisière de l'Outremonde)
  5. *Acte 5 — Entre le ciel et l'enfer* (Sanctuaires de Montagne)
  6. *Acte 6 — Le mariage d'Okado Hiruma* (Terres du Crabe)
  7. *Acte 7 — Meurtre à Ryoko Owari* (Cité des Histoires Vertes)
  8. *Acte 8 — Le crépuscule de l'honneur* (Provinces disputées)
  9. *Acte 9 — « Ce qui ne meurt pas »* (Terres ancestrales)
  10. *Acte 10 — La tombe de Iuchiban* (Le Tombeau Maudit)
- **Lecteur Vocal Narrateur (`window.speechSynthesis`) :** Lecture audio française intégrée avec sélection des voix naturelles/HD du système, réglage de la vitesse de narration (`0.8x` à `1.3x`), barre de progression et surlignage automatique du paragraphe en cours de lecture.
- **Studio d'Import (`campagne-ajouter.html`) :** Outil de glisser-déposer permettant de téléverser un compte-rendu `.txt` ou `.md`, de tester la synthèse vocale et de télécharger une page HTML de scénario formatée prête à être ajoutée au dossier `/campagne/`.

### 6. L'Encyclopédie des Huit Grands Clans (`clans/`)
Une monographie dédiée à chaque faction majeure de l'Empire d'Émeraude :
- **Clan du Crabe** (`clans/crabe.html`) : *Familles Hida, Hiruma, Kaiu, Kuni, Yasuki.*
- **Clan de la Grue** (`clans/grue.html`) : *Familles Doji, Kakita, Daidoji, Asahina.*
- **Clan du Dragon** (`clans/dragon.html`) : *Familles Mirumoto, Kitsuki, Tamori, Togashi.*
- **Clan du Lion** (`clans/lion.html`) : *Familles Akodo, Matsu, Ikoma, Kitsu.*
- **Clan de la Mante** (`clans/mante.html`) : *Familles Yoritomo, Tsuruchi, Moshi.*
- **Clan du Phénix** (`clans/phenix.html`) : *Familles Isawa, Shiba, Asako, Agasha.*
- **Clan du Scorpion** (`clans/scorpion.html`) : *Familles Bayushi, Shosuro, Soshi, Yogo.*
- **Clan de la Licorne** (`clans/licorne.html`) : *Familles Shinjo, Moto, Utaku, Ide, Iuchi.*

Chaque page présente l'histoire, la philosophie, les familles vassales, les **Écoles Fondamentales de Base** (bonus de trait, compétences, technique de Rang 1), ainsi qu'une sélection de **Voies Alternatives et Écoles Avancées** issues des suppléments officiels (*The Great Clans*, *Emerald Empire*...).

### 7. Les Mémentos d'Arbitrage Tactique (`aides/`)
Trois guides de référence rapide optimisés pour la consultation en séance et l'impression :
- **Mémento Combat & Duels Iaijutsu** (`aides/combat-memento.html`) : Séquence du round d'escarmouche, effets détaillés des 5 postures (Attaque, Attaque Totale, Défense, Défense Totale, Centre), procédure rituelle du duel d'Iaijutsu en 3 rounds (Évaluation, Concentration, Frappe), formules clés $X\text{g}Y$ et manœuvres d'Augmentations (*Raises*).
- **Code du Bushido & Honneur** (`aides/bushido-honneur.html`) : Les 7 vertus cardinales du Bushido, la trinité sociale (Honneur, Gloire, Statut), le barème officiel des gains et pertes d'Honneur (Table 2.3 du Livre de Base) et les règles de protection des Doigts de Jade contre la Souillure de l'Outremonde.
- **Étiquette & Coutumes** (`aides/etiquette-coutumes.html`) : Hiérarchie de l'Ordre Céleste (*Kuge*, *Buke*, *Heimin*, *Hinin*), protocole du port du Daisho, règle des cadeaux en trois refus, cérémonie du thé (*Cha-no-yu*) et gestion de la face en cour.

---

## 📂 Arborescence Complète du Dépôt

```text
L5R/
├── index.html                          # Portail d'accueil, Dojo local et navigation rapide
├── createcharacter.html                # Forge de Personnage L5R 4e, lanceur de dés XgY et impression A4
├── ecran-mj.html                       # Écran interactif du Maître du Jeu (PJs, Escarmouche, Paravent, Duel, Dés)
├── grimoire.html                       # Grimoire interactif des sorts élémentaires, prières et mahō
├── kihos.html                          # Recueil interactif des 64 Kihos des moines & règles Atemi
├── tatouages.html                      # Codex interactif des tatouages sacrés Togashi (Ise Zumi)
├── campagne.html                       # Hub des 10 scénarios de la Campagne de la Chronique de Rokugan
├── campagne-ajouter.html               # Studio d'import et générateur de pages de scénarios HTML
├── version.json                        # Source unique de vérité pour la version du site (v1.15.2)
├── manifest.webmanifest                # Manifeste PWA installable sur Android & iPhone (mode autonome)
├── sw.js                               # Service Worker hors-ligne pré-cachant Forge, Dojo & données L5R 4e
├── CHANGELOG.md                        # Historique structuré des versions et nouveautés
├── GEMINI.md                           # Directives strictes de développement et workflow Git/PR
├── LICENSE                             # Licence Tous droits réservés (code, récits & illustrations)
├── README.md                           # Documentation générale du projet
├── .nojekyll                           # Désactivation du traitement Jekyll sur GitHub Pages
│
├── aides/                              # Mémentos d'arbitrage rapide pour la table
│   ├── bushido-honneur.html            # 7 vertus, Honneur/Gloire/Statut, Table 2.3 & Doigts de Jade
│   ├── combat-memento.html             # Escarmouches, 5 postures, Duels Iaijutsu & Augmentations
│   └── etiquette-coutumes.html         # Ordre Céleste, protocole du Daisho, cadeaux & cérémonie du thé
│
├── clans/                              # Encyclopédie des 8 Grands Clans Majeurs
│   ├── crabe.html                      # Monographie, familles et écoles du Clan du Crabe
│   ├── dragon.html                     # Monographie, familles et écoles du Clan du Dragon
│   ├── grue.html                       # Monographie, familles et écoles du Clan de la Grue
│   ├── licorne.html                    # Monographie, familles et écoles du Clan de la Licorne
│   ├── lion.html                       # Monographie, familles et écoles du Clan du Lion
│   ├── mante.html                      # Monographie, familles et écoles du Clan de la Mante
│   ├── phenix.html                     # Monographie, familles et écoles du Clan du Phénix
│   └── scorpion.html                   # Monographie, familles et écoles du Clan du Scorpion
│
├── campagne/                           # Pages dédiées par acte de campagne (texte + lecteur vocal)
│   ├── scenario-1.html                 # Acte 1 : Championnat de Topaze
│   ├── scenario-2.html                 # Acte 2 : Meurtre au Château de Kyoteï (3 points de vue PJ)
│   ├── scenario-3.html                 # Acte 3 : Le dernier voyage (2 points de vue PJ)
│   ├── scenario-4.html                 # Acte 4 : Aux côtés de mes frères morts
│   ├── scenario-5.html                 # Acte 5 : Entre le ciel et l'enfer
│   ├── scenario-6.html                 # Acte 6 : Le mariage d'Okado Hiruma
│   ├── scenario-7.html                 # Acte 7 : Meurtre à Ryoko Owari
│   ├── scenario-8.html                 # Acte 8 : Le crépuscule de l'honneur
│   ├── scenario-9.html                 # Acte 9 : « Ce qui ne meurt pas »
│   └── scenario-10.html                # Acte 10 : La tombe de Iuchiban
│
├── css/                                # Feuilles de style globales
│   └── main.css                        # Variables CSS, thème Sombre (Laque) / Clair (Parchemin) & print A4
│
├── js/                                 # Moteurs applicatifs en Vanilla JavaScript (ES6+)
│   ├── pwa.js                          # Gestionnaire PWA (Service Worker, install Android/iOS, mode hors-ligne)
│   ├── navbar.js                       # Barre de navigation responsive, sélecteur de thème, version & CSS
│   ├── index-ui.js                     # Rendu déclaratif des Clans, de la frise des scénarios & du Dojo d'accueil
│   ├── character-generator.js          # Moteur de règles L5R 4e, calculs d'XP, paliers, dés et Dojo
│   ├── forge-ui.js                     # UI étendue de la Forge (Sorts, Katas, Tatouages, 20 Questions & Print A4)
│   ├── export-carnet.js                # Moteur d'export JSON conforme au Carnet de Rokugan (schemaVersion: 2)
│   ├── grimoire.js                     # Moteur de recherche, filtrage, ancres URL et Sceau de Mahō
│   ├── kihos.js                        # Moteur dédié de filtrage et permaliens du Recueil des Kihos
│   ├── tatouages.js                    # Moteur de filtrage et modale du Codex des Tatouages Togashi
│   ├── gm-screen.js                    # Moteur complet de l'Écran du MJ (Escarmouche, Paravent, Duel, Dés R&K)
│   ├── narrator.js                     # Lecteur vocal narrateur HD & sélecteur multi-versions des scénarios
│   └── campagne-studio.js              # Studio glisser-déposer et générateur HTML de scénarios
│
├── data/                               # Bases de données modulaires en JavaScript
│   ├── scenarios-data.js               # Registre centralisé des scénarios de campagne (Accueil, Catalogue & Studio)
│   ├── clans-data.js                   # Données des 8 clans, familles, écoles et techniques (Rangs 1 à 5)
│   ├── competences-data.js             # Catalogue des compétences (Nobles, Bugei, Marchandes, Basses)
│   ├── equipement-data.js              # Armes, armures, valeurs de dégâts/réduction et équipements
│   ├── avantages-desavantages-data.js  # Catalogue officiel des avantages et désavantages L5R 4e
│   ├── katas-data.js                   # Catalogue des Katas martiaux par élément et maîtrise
│   ├── tatouages-data.js               # Catalogue des Tatouages sacrés de l'Ordre Togashi (Ise Zumi)
│   ├── gm-rules-data.js                # Encyclopédie structurée des règles L5R 4e pour l'Écran du MJ
│   ├── sorts-data.js                   # Agrégateur et normalisateur universel des sortilèges et kihos
│   └── sorts/                          # Sous-modules de sorts par élément et tradition
│       ├── sorts-universels.js         # Prières universelles (Rang 0 : Communion, Sentir, Invoquer)
│       ├── sorts-terre.js              # Sorts de l'Anneau de Terre (Rangs 1 à 6)
│       ├── sorts-eau.js                # Sorts de l'Anneau d'Eau (Rangs 1 à 6)
│       ├── sorts-feu.js                # Sorts de l'Anneau de Feu (Rangs 1 à 6)
│       ├── sorts-air.js                # Sorts de l'Anneau d'Air (Rangs 1 à 6)
│       ├── sorts-vide.js               # Sorts de l'Anneau du Vide (Ishiken-dō)
│       ├── sorts-kiho.js               # Kihos des moines de la Confrérie de Shinsei
│       └── sorts-maho.js               # Sortilèges interdits de Mahō (Magie du Sang)
│
├── tests/                              # Suite de tests unitaires (Navigateur & Node.js)
│   ├── unit-tests.js                   # Assertions unitaires sur la Forge, Roll & Keep, Grimoire & Carnet v2
│   └── unit-tests.html                 # Exécuteur visuel de la suite de tests dans le navigateur
│
└── assets/                             # Icônes PWA, illustrations et ressources graphiques
    ├── icons/                          # Icônes installables Android / iOS (180, 192, 512, maskable)
    └── images/                         # Emblèmes, favicons et illustrations de campagne
        ├── cinq_anneaux.jpg            # Emblème calligraphié des Cinq Anneaux
        ├── favicon.svg                 # Sceau vectoriel impérial
        ├── favicon_cinq_anneaux.png    # Icône PNG des Cinq Anneaux
        ├── logo_carnet_rokugan.png     # Logo officiel du Carnet de Rokugan
        └── scenarios/                  # Illustrations des actes (Topaze, Kyoteï, Voyage, Frères Morts...)
```

---

## 🛠️ Architecture Technique & Thèmes

- **Zéro Dépendance Lourde :** Développé intégralement en **HTML5, CSS3 et Vanilla JavaScript (ES6+)** sans bundler ni étape de compilation, garantissant une exécution immédiate en local comme sur GitHub Pages.
- **Design System & Double Thème (`css/main.css` & Tailwind CDN) :**
  - **Mode Sombre (*Laque Noire* / `月`) :** Fond noir laqué (`#0a0808`), dégradés carmins profonds et bordures dorées (`#d4af37`).
  - **Mode Clair (*Parchemin Washi* / `陽`) :** Fond papier impérial (`#f5efe1`), encre sépia (`#292018`) et accents bronze doré (`#9a6b13`) pour un confort de lecture optimal.
- **Typographie :** *Cinzel* pour les titrages impériaux et *Noto Serif JP* pour le corps de texte et les idéogrammes japonais.
- **Audio Natif :** Exploitation de l'API standard `window.speechSynthesis` sans hébergement de fichiers audio lourds.

---

## 🔄 Compatibilité « Le Carnet de Rokugan » (`schemaVersion: 2`)

La Forge de Personnage intègre un moteur d'export dédié (`js/export-carnet.js`) garantissant une compatibilité à **100 %** avec [**Le Carnet de Rokugan**](https://nelsio.github.io/carnet-l5r/) (standard `schemaVersion: 2`, v2.18.0+) :

1. **Structure Canonique v2 :** Génération d'un objet JSON plat à la racine (`schemaVersion: 2`, `name`, `clan`, `family`, `school`, `schoolId`, `rank`, `xp`, `traits`, `voidMax`, `skills`, `advantages`, `disadvantages`, `spells`, `kihos`, `katas`, `tattoos`, `weapons`, `armor`, `notes`...).
2. **Clés de Traits en Anglais :** Mapping strict vers `stamina`, `willpower`, `strength`, `perception`, `reflexes`, `awareness`, `agility`, `intelligence`, permettant au Carnet de recalculer dynamiquement les Anneaux.
3. **Catalogue Officiel des Identifiants d'Écoles (`CARNET_SCHOOL_CATALOG`) :** Résolution automatique vers les identifiants canoniques du Carnet (`hida-bushi`, `hiruma-bushi`, `kakita-bushi`, `mirumoto-bushi`, `togashi-moine`, `isawa-shugenja`, `shinjo-bushi`, `bayushi-bushi`, etc.).
4. **Normalisation des Compétences & Spécialités :** Traduction automatique des dénominations vers le référentiel du Carnet (ex. *Enquête* → *Investigation*, *Connaissance* → *Lore*, *Art de la Guerre* → *Battle*) et préservation des spécialisations (`emphases`) et paliers de maîtrise.
5. **Mapping Normalisé de l'Équipement :** Export des armes avec leurs mots-clés réglementaires (`samourai`, `grande`, `deux-mains`, `arc`, `paysan`...) et calcul automatique de la force d'arc (`bowStrength`).

---

## 🏷️ Système de Versioning Centralisé

Le projet dispose d'un mécanisme de suivi de version centralisé :
- **`version.json` :** Fichier JSON à la racine du dépôt contenant le numéro de version courant (`1.0.0`), le tag (`v1.0.0`), la date de publication et l'URL des Releases GitHub.
- **Affichage Dynamique en Pied de Page :** Toutes les pages HTML du site (racine, `/clans/`, `/aides/`, `/campagne/`) intègrent dans leur `<footer>` un script léger qui interroge `version.json` pour afficher discrètement la version active et un lien direct vers [les Releases GitHub](https://github.com/vincenzorpg/L5R/releases) (avec repli statique immédiat en cas d'ouverture hors-ligne via `file://`).
- **`CHANGELOG.md` :** Historique détaillé des versions à la racine du projet.

---

## 🚀 Installation & Utilisation Locale

Aucune installation de paquets (`npm` / Node.js) n'est requise.

### Option 1 : Serveur local Python (Recommandé)
```bash
git clone https://github.com/vincenzorpg/L5R.git
cd L5R
python -m http.server 8000
```
Ouvrez ensuite votre navigateur sur `http://localhost:8000`.

### Option 2 : Visual Studio Code (Live Server)
1. Ouvrez le dossier `L5R` dans VS Code.
2. Cliquez sur **Go Live** (extension *Live Server*) depuis `index.html`.

---

## 🌿 Workflow Git & Contribution

Conformément aux directives du projet ([`GEMINI.md`](GEMINI.md)) :
1. **Ne jamais modifier `main` directement.**
2. Créer systématiquement une branche dédiée avant toute intervention :
   - Nouvelle fonctionnalité / documentation : `git checkout -b feat/<nom-explicite>`
   - Correction de bug : `git checkout -b fix/<nom-explicite>`
3. Préserver l'architecture HTML/CSS/JS et la compatibilité de l'export JSON **Carnet de Rokugan**.
4. Pousser la branche et ouvrir une **Pull Request** vers `main` via GitHub CLI (`gh pr create`).

---

## 📜 Crédits & Mentions Légales

- **Campagne & Chronique :** **Campagne de la Chronique de Rokugan** (table active depuis 2015 — [Archive WordPress](https://campagnel5rdavid2015.wordpress.com/)).
- **Chroniqueurs & Personnages de la Table :** *Tsuruchi Akira*, *Okado Hiruma*, *Hida Samui*, *Isawa Ryumitaka*, *Kakita Sutokhu*, *Mirumoto Mansouri*.
- **Droits d'Auteur & Mentions Légales :** Le code source, les récits et les illustrations originales de la campagne sont protégés sous régime **Tous droits réservés** ([`LICENSE`](LICENSE)). *La Légende des Cinq Anneaux* (*Legend of the Five Rings* / L5R) est une marque déposée d'Alderac Entertainment Group (AEG) et Fantasy Flight Games / Edge Studio ; ce projet est une réalisation de fan à but strictement récréatif et non commercial.
