# Directives Agent IA — Les Chroniques de Rokugan (`vincenzorpg/L5R`)

Ce fichier définit les règles strictes et obligatoires à respecter pour toute intervention sur ce dépôt.

---

## 1. Workflow Git & Branches (Obligatoire)

- **Interdiction absolue de modifier `main` directement** : Aucun commit ni push direct sur la branche `main` n'est autorisé.
- **Création systématique d'une branche avant toute modification** :
  - Pour une nouvelle fonctionnalité ou amélioration : `git checkout -b feat/<nom-explicite>`
  - Pour une correction de bug : `git checkout -b fix/<nom-explicite>`
  - Pour la documentation ou les règles du dépôt : `git checkout -b docs/<nom-explicite>`
- Assurez-vous toujours d'être à jour avec `origin/main` avant de créer une nouvelle branche (`git checkout main && git pull origin main`).

## 2. Versioning Sémantique (`SemVer`), Documentation & Release Notes (Obligatoire)

**À chaque future évolution du projet (fonctionnalité, correctif, ajout de contenu ou de données) :**

1. **Incrémentation de `version.json` (SemVer `MAJOR.MINOR.PATCH`)** :
   - **`PATCH` (`x.y.Z`)** : Correction de bug, ajustement visuel, coquille ou micro-optimisation sans nouvelle fonctionnalité.
   - **`MINOR` (`x.Y.0`)** : Ajout d'une fonctionnalité, d'un scénario, d'une aide de jeu, de sorts/kihos/katas/tatouages ou évolution rétrocompatible.
   - **`MAJOR` (`X.0.0`)** : Refonte majeure ou changement d'architecture structurant.
   - Mettre à jour simultanément les champs `"version"` (ex. `"1.1.0"`), `"tag"` (ex. `"v1.1.0"`) et `"date"` (format `YYYY-MM-DD`) dans `version.json`, ainsi que le repli statique `#site-version-label` dans les pieds de page si nécessaire.
2. **Mise à jour systématique de `CHANGELOG.md`** :
   - Ajouter en tête du fichier une nouvelle section `## [X.Y.Z] — YYYY-MM-DD` (format *Keep a Changelog* : `### ✨ Ajouté`, `### 🔄 Modifié`, `### 🐛 Corrigé`, etc.) détaillant précisément les changements apportés.
3. **Mise à jour de `README.md` (si nécessaire)** :
   - Mettre à jour le badge de version (`Version-vX.Y.Z`), la présentation des fonctionnalités et l'arborescence des fichiers dès qu'un module, un outil ou un fichier est ajouté ou modifié.
4. **Pull Request avec Release Notes « User-Friendly » prêtes à publier** :
   - Le corps (`--body` / `--body-file`) de chaque Pull Request ouverte via `gh pr create` **doit inclure une section dédiée « 📦 Release Notes (`vX.Y.Z`) — Prêtes à publier »**.
   - **Règle de rédaction des Release Notes GitHub (publiques)** :
     - **Ton joueur / MJ (« user-friendly »)** : courtes, claires et concrètes (**3 à 5 puces maximum** plus une courte phrase d'introduction).
     - **Zéro jargon technique** : ne jamais mentionner de noms de fichiers (`.js`, `.html`, `.css`), de noms de fonctions, d'identifiants DOM (`#...`), de variables CSS ou de détails d'implémentation — décrire uniquement ce que l'utilisateur voit ou gagne en jeu.
     - Réserver l'inventaire technique précis (fichiers, fonctions, tests) au `CHANGELOG.md` et au résumé technique de la Pull Request.

## 3. Pull Request systématique via GitHub CLI (`gh`)

- **Après chaque tâche terminée** :
  1. Vérifier les fichiers modifiés (`git status`, `git diff`) et s'assurer que `version.json`, `CHANGELOG.md` et `README.md` (si pertinent) sont à jour.
  2. Committer les changements sur la branche dédiée (`feat/...`, `fix/...` ou `docs/...`) avec un message clair et conventionnel.
  3. Pousser la branche sur le dépôt distant (`git push -u origin <nom-branche>`).
  4. Ouvrir une **Pull Request** vers `main` à l'aide de GitHub CLI incluant le récapitulatif technique et les **Release Notes prêtes à publier** :
     ```bash
     gh pr create --base main --head <nom-branche> --title "<Titre clair (vX.Y.Z)>" --body "<Résumé des modifications, vérifications et Release Notes prêtes à publier>"
     ```
     *(Sur Windows, si `gh` n'est pas encore dans le `PATH` de la session courante, utiliser `"C:\Program Files\GitHub CLI\gh.exe"`).*

## 4. Préservation de l'Architecture HTML / CSS / JS

- **Stack technique immuable** :
  - **HTML5 / CSS / Vanilla JS (ES6+)** pur, sans bundler ni framework lourd (`npm`, Webpack, React, etc. sont proscrits).
  - **Tailwind CSS** (chargé via CDN) et feuilles de style dans `css/` en respectant l'identité visuelle *Dark Lacquer*, les bordures dorées et les polices *Cinzel* / *Noto Serif JP*.
- **Respect de l'arborescence existante** :
  - Pages principales à la racine (`index.html`, `createcharacter.html`, `campagne.html`, `campagne-ajouter.html`, `grimoire.html`, `tatouages.html`).
  - Sous-dossiers thématiques : `clans/`, `campagne/`, `aides/`, `assets/`.
  - Bases de données modulaires dans `data/` (`scenarios-data.js`, `clans-data.js`, `competences-data.js`, `equipement-data.js`, `avantages-desavantages-data.js`, `katas-data.js`, `tatouages-data.js`, `sorts-data.js`, `sorts/`).
  - Moteurs applicatifs dans `js/` (`navbar.js`, `index-ui.js`, `character-generator.js`, `forge-ui.js`, `export-carnet.js`, `grimoire.js`, `tatouages.js`, `narrator.js`, `campagne-studio.js`).
- Ne jamais casser les identifiants DOM, la sauvegarde locale (`localStorage` du Dojo), le partage par URL (base64), le bandeau de version en pied de page (`#site-version-footer`) ou l'impression A4 de la fiche de personnage.

## 5. Préservation de l'Export JSON « Carnet de Rokugan »

- Toute modification touchant à la création de personnage (`createcharacter.html`), au moteur (`js/character-generator.js`), aux données (`data/`) ou à l'export (`js/export-carnet.js`) **doit préserver à 100 % la compatibilité avec [Le Carnet de Rokugan](https://nelsio.github.io/carnet-l5r/)**.
- **Exigences du format d'export (`js/export-carnet.js`)** :
  - Respect strict du schéma `schemaVersion: 2` (standard v2.18.0+).
  - Maintien des clés de traits en anglais (`stamina`, `willpower`, `strength`, `perception`, `reflexes`, `awareness`, `agility`, `intelligence`) et du calcul des Anneaux.
  - Maintien de la normalisation des noms de compétences, de la résolution des identifiants d'école canoniques (`schoolId` dans `CARNET_SCHOOL_CATALOG`) et du mapping normalisé des armes (`bowStrength`, mots-clés d'armes).

## 6. Ajout d'un Nouveau Scénario de Campagne (Checklist Obligatoire)

Lorsqu'un nouveau scénario (Acte `N`) est ajouté à la chronique, il est **obligatoire** de mettre à jour l'ensemble des points d'entrée suivants :

1. **Page du scénario & illustrations** : Créer `campagne/scenario-N.html` (et ses illustrations dans `assets/images/campagne/`), puis l'enregistrer dans `data/scenarios-data.js` et `campagne.html`.
2. **Carte de Rokugan (`data/carte-data.js`, `carte.html`, `js/carte-rokugan.js`)** :
   - Ajouter le(s) lieu(x) clé(s) manquants dans `ROKUGAN_LOCATIONS` et l'étape correspondante (`step: N`) dans `CAMPAIGN_ROUTE` (`data/carte-data.js`).
   - Mettre à jour le curseur chronologique (`max="N" value="N"`), le badge (`Actes 1 à N / N`), le sous-titre et les libellés d'étapes dans `carte.html`.
   - Vérifier que la valeur par défaut de `maxAct` dans `js/carte-rokugan.js` suit `route.length`.
3. **Page d'accueil (`index.html`, `js/index-ui.js`)** :
   - Mettre à jour les compteurs et libellés d'actes/scénarios dans `index.html` (`N actes de la chronique`, `VITRINE DES N SCÉNARIOS DE LA CAMPAGNE`, `FRISE DES N SCÉNARIOS`, `N / N Récits Complets`).
   - Vérifier que la frise dynamique (`HOME_SCENARIOS_STRIP`) affiche bien le nouvel acte.
4. **Tests & Hygiène** : Vérifier que `tests/unit-tests.js` (notamment la suite Carte / Scénarios) et `.github/scripts/check-site.js` restent 100 % valides.
