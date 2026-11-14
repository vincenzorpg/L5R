# Directives Agent IA — Les Chroniques de Rokugan (`vincenzorpg/L5R`)

Ce fichier définit les règles strictes et obligatoires à respecter pour toute intervention sur ce dépôt.

---

## 1. Workflow Git & Branches (Obligatoire)

- **Interdiction absolue de modifier `main` directement** : Aucun commit ni push direct sur la branche `main` n'est autorisé.
- **Création systématique d'une branche avant toute modification** :
  - Pour une nouvelle fonctionnalité ou amélioration : `git checkout -b feat/<nom-explicite>`
  - Pour une correction de bug : `git checkout -b fix/<nom-explicite>`
- Assurez-vous toujours d'être à jour avec `origin/main` avant de créer une nouvelle branche (`git checkout main && git pull origin main`).

## 2. Pull Request systématique via GitHub CLI (`gh`)

- **Après chaque tâche terminée** :
  1. Vérifier les fichiers modifiés (`git status`, `git diff`).
  2. Committer les changements sur la branche dédiée (`feat/...` ou `fix/...`) avec un message clair et conventionnel.
  3. Pousser la branche sur le dépôt distant (`git push -u origin <nom-branche>`).
  4. Ouvrir une **Pull Request** vers `main` à l'aide de GitHub CLI :
     ```bash
     gh pr create --base main --head <nom-branche> --title "<Titre clair>" --body "<Résumé des modifications et vérifications>"
     ```
     *(Sur Windows, si `gh` n'est pas encore dans le `PATH` de la session courante, utiliser `"C:\Program Files\GitHub CLI\gh.exe"`).*

## 3. Préservation de l'Architecture HTML / CSS / JS

- **Stack technique immuable** :
  - **HTML5 / CSS / Vanilla JS (ES6+)** pur, sans bundler ni framework lourd (`npm`, Webpack, React, etc. sont proscrits).
  - **Tailwind CSS** (chargé via CDN) et feuilles de style dans `css/` en respectant l'identité visuelle *Dark Lacquer*, les bordures dorées et les polices *Cinzel* / *Noto Serif JP*.
- **Respect de l'arborescence existante** :
  - Pages principales à la racine (`index.html`, `createcharacter.html`, `campagne.html`, `campagne-ajouter.html`, `grimoire.html`, `tatouages.html`).
  - Sous-dossiers thématiques : `clans/`, `campagne/`, `aides/`, `assets/`.
  - Bases de données modulaires dans `data/` (`clans-data.js`, `competences-data.js`, `equipement-data.js`, `avantages-desavantages.js`, `sorts-data.js`, `sorts/`).
  - Moteurs applicatifs dans `js/` (`navbar.js`, `character-generator.js`, `export-carnet.js`, `grimoire.js`).
- Ne jamais casser les identifiants DOM, la sauvegarde locale (`localStorage` du Dojo), le partage par URL (base64) ou l'impression A4 de la fiche de personnage.

## 4. Préservation de l'Export JSON « Carnet de Rokugan »

- Toute modification touchant à la création de personnage (`createcharacter.html`), au moteur (`js/character-generator.js`), aux données (`data/`) ou à l'export (`js/export-carnet.js`) **doit préserver à 100 % la compatibilité avec [Le Carnet de Rokugan](https://nelsio.github.io/carnet-l5r/)**.
- **Exigences du format d'export (`js/export-carnet.js`)** :
  - Respect strict du schéma `schemaVersion: 2` (standard v2.18.0+).
  - Maintien des clés de traits en anglais (`stamina`, `willpower`, `strength`, `perception`, `reflexes`, `awareness`, `agility`, `intelligence`) et du calcul des Anneaux.
  - Maintien de la normalisation des noms de compétences, de la résolution des identifiants d'école canoniques (`schoolId` dans `CARNET_SCHOOL_CATALOG`) et du mapping normalisé des armes (`bowStrength`, mots-clés d'armes).
