# 📜 Journal des Modifications (Changelog)

Toutes les modifications notables apportées au projet **Les Chroniques de Rokugan (L5R 4ᵉ Édition)** sont documentées dans ce fichier.

Le format est inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et le projet suit le [Versioning Sémantique (SemVer)](https://semver.org/lang/fr/).

---

## [1.41.0] — 2026-11-27

### ✨ Ajouté
- **Jalon 3 — La Table Live & Fil de Dés Roll & Keep Partagé (`table-live.html`, `js/table-live.js`, `js/firebase-service.js`, `ecran-mj.html`, `js/gm-screen.js`, `js/forge-ui.js`, `js/navbar.js`, `js/global-search.js`, `sw.js`, `tests/unit-tests.js`)** :
  - **Page Compagnon Joueurs `table-live.html` & `js/table-live.js`** : Vue d'escarmouche en direct sans spoilers (`/campaign/skirmish/publicView` : round, tour actif, postures, états et blessures narratives), cartes publiques de l'escouade (`/campaign/publicParty`), lanceur Roll & Keep (règle des 10 dés, explosions sur 10, spécialisation) et flux chronologique partagé (`/campaign/diceFeed`).
  - **Fil de Dés Partagé Transversal & Jet Secret MJ** : Les jets lancés depuis le plateau de La Forge (`js/forge-ui.js`), l'Écran du MJ (`js/gm-screen.js`) ou `table-live.html` s'affichent instantanément pour toute la table approuvée ; ajout de la case **`🔒 Secret MJ`** (`#gm-dice-secret` / `#tl-gm-secret-roll`) et d'un mini-fil en direct dans l'Écran du MJ (`#gm-live-dice-feed`) avec bouton de nettoyage réservé au MJ (`clearDiceFeed`).
  - **Navigation, Recherche & Hors-Ligne** : Ajout de *La Table Live* dans le menu *Outils* (desktop + mobile), le fil d'Ariane (`js/navbar.js`), la recherche globale `Ctrl+K` (`js/global-search.js`) et le Service Worker (`sw.js`).
  - **Tests unitaires** : Ajout de la **Suite 21** dans `tests/unit-tests.js` (2 tests vérifiant `buildDiceFeedEntry`, `formatDiceFeedList`, `formatPublicPartyList`, `parseAndRollLiveFormula` et `getWoundToneClasses`).

---

## [1.40.0] — 2026-11-27

### ✨ Ajouté
- **Jalon 2 — Doodle 2027 Temps Réel & Sync Live Écran MJ ↔ PJs (`js/firebase-service.js`, `js/sessions.js`, `sessions.html`, `js/gm-screen.js`, `ecran-mj.html`, `js/forge-ui.js`, `sw.js`, `tests/unit-tests.js`)** :
  - **Doodle 2027 Partagé en Direct (`sessions.html`, `js/sessions.js`)** : Bandeau de statut temps réel (`#doodle-cloud-banner`), écoute live de `/campaign/doodle2027`, fusion sans perte des votes locaux et Cloud (`normalizeDoodleCloudEntries`, `mergeDoodleResponses`), publication en 1 clic des fiches locales vers la table et chargement corrigé des préréglages du Dojo (`l5r_dojo_characters_v4`).
  - **Synchronisation Bidirectionnelle Écran MJ ↔ Forge PJ (`ecran-mj.html`, `js/gm-screen.js`, `js/forge-ui.js`)** : Abonnement temps réel du MJ au roster `/campaign/roster` (`mergeCloudRosterIntoGmPcs`), mise à jour instantanée des jauges de séance (`wounds`, `voidCurrent`, `honor`, `glory`, `status`, `taint`, `spellsSpent`) dans les deux sens (`updateRosterLiveState`, `applyLiveStateToCharacter`) et répercussion automatique sur le tableau d'escarmouche et les cartes publiques `/campaign/publicParty`.
  - **Notes MJ Privées Cloud & Escarmouche Publique Sans Spoilers** : Synchronisation automatique des notes de séance (`gmScratchpad`, notes par PJ, coches Scénario Jour J) dans `/gmPrivate/{uid}` et publication temps réel de l'ordre d'initiative sans spoilers (`buildSkirmishPublicSnapshot` → `/campaign/skirmish/publicView`).
  - **Sauvegarde Complète JSON MJ (« Backup Base »)** : Nouveau bouton 1-clic dans l'Écran MJ (`#gm-cloud-backup-btn`) et la modale Compte (`#l5r-btn-gm-backup`) exportant l'intégralité des données campagne & MJ (`exportFullFirebaseBackup`).
  - **Tests unitaires** : Ajout de la **Suite 20** dans `tests/unit-tests.js` (couvrant Doodle temps réel, `applyLiveStateToCharacter`, `buildSkirmishPublicSnapshot` et `mergeCloudRosterIntoGmPcs`).

---

## [1.39.0] — 2026-11-27

### ✨ Ajouté
- **Jalon 1 — Socle Firebase Auth, Rôle MJ & Dojo Cloud (`js/firebase-config.js`, `js/firebase-service.js`, `database.rules.json`, `js/navbar.js`, `js/character-generator.js`, `js/forge-ui.js`, `js/index-ui.js`, `sw.js`, `tests/unit-tests.js`)** :
  - **Comptes & Authentification (Google + E-mail/Mot de passe)** : Bouton global *Connexion / Compte* dans la barre de navigation et fenêtre modale dédiée permettant de créer un compte ou se connecter sans casser le mode invité hors-ligne (`localStorage`).
  - **Rôle Maître du Jeu & Approbation de la Table** : Reconnaissance automatique du compte MJ vérifié, déverrouillage automatique des secrets MJ (Mahō, Écoles secrètes, Scénario Jour J) et panneau intégré *Membres de la Table* permettant d'approuver ou révoquer en 1 clic les joueurs demandant accès aux espaces partagés de campagne.
  - **Dojo Cloud Multi-Appareils** : Synchronisation automatique des personnages de La Forge dans Firebase Realtime Database (`/users/{uid}/characters`), migration en 1 clic du Dojo local existant, mise à jour live de l'accueil (`index.html`) et bascule *`+ Table / ⚔️ Table`* publiant la fiche vers le roster MJ (`/campaign/roster`) et une carte résumé sans spoilers (`/campaign/publicParty`).
  - **Règles de sécurité RTDB (`database.rules.json`)** : Règles prêtes à déployer couvrant le Dojo privé, l'approbation anti-auto-élévation des membres, le roster MJ, le Doodle 2027, l'Escarmouche et le fil de dés.
  - **Tests unitaires** : Ajout de la **Suite 19** dans `tests/unit-tests.js`.

---

## [1.38.1] — 2026-11-23

### 🐛 Corrigé
- **Planificateur de Sessions JDR — Passage du calendrier sur Janvier à Mars 2027 (`sessions.html`, `js/sessions.js`, `js/navbar.js`, `js/global-search.js`, `tests/unit-tests.js`)** :
  - Génération des **13 week-ends (65 créneaux)** du vendredi **1er janvier 2027** au dimanche **28 mars 2027** (*Vendredi soir*, *Samedi après-midi/soir*, *Dimanche après-midi/soir*).
- **Tableau d'Escarmouche — Affichage complet de chaque ligne sans défilement horizontal (`ecran-mj.html`, `js/gm-screen.js`)** :
  - Passage du tableau en `table-fixed` à 6 colonnes proportionnelles (`11% / 19% / 15% / 13% / 24% / 18%`) sans largeurs minimales bloquantes (`min-w-[2xxpx]`).
  - Fusion de la jauge de Blessures et du calculateur d'encaissement (`💥 -Réd`) dans une seule colonne unifiée (*Blessures & Dégâts*), correction de la largeur du champ d'Initiative (`w-11`) et raccourcissement des libellés du sélecteur de Posture (`shortLabel`) afin que toute la ligne soit visible d'un seul coup d'œil sans barre de scroll horizontale.

---

## [1.38.0] — 2026-11-23

### 🔄 Modifié & ✨ Ajouté
- **Refonte ergonomique de l'Écran du MJ & du Tableau d'Escarmouche (`ecran-mj.html`, `js/gm-screen.js`, `tests/unit-tests.js`)** :
  - **Mode Pleine Largeur par défaut (`wideLayout`, max 1800px)** : Le poste de commandement et le tableau d'escarmouche occupent désormais **100 % de la largeur (`12/12 colonnes`)**, doublant l'espace disponible des colonnes, avec bascule instantanée vers la vue *Côte-à-côte* (`#gm-toggle-wide`) et repli de la Table des Joueurs (`#gm-toggle-pcs-collapse`).
  - **Bandeau de Dés en Direct (`#gm-inline-dice-bar`)** : Affichage immédiat du dernier jet (`Toucher`, `Dégâts`, `Initiative`) directement au-dessus du tableau d'escarmouche sans avoir à scroller jusqu'au dock.
  - **Tiroir de Préparation Intelligent (`#gm-skirmish-setup-details`) & Initiative Auto des PJs** : Ajout d'un bouton `🎲 Tirer Init PJs` (`rollAllIncludedPcsInit`) et d'un dé individuel par PJ ; le panneau de préparation se replie automatiquement dès le lancement de l'escarmouche pour laisser toute la hauteur au combat.
  - **Cockpit du Combattant Actif (`#gm-active-turn-spotlight`)** : Bandeau mettant en avant le combattant dont c'est le tour avec changement de posture en 1 clic (boutons-pilules), boutons larges *Toucher* / *Dégâts*, navigation `◀ Précédent` / `Tour suivant ▶` et module *« 🎯 Infliger des dégâts à… »* pré-rempli avec le dernier jet de dégâts.
  - **Calculateur de Coup Reçu avec Réduction Automatique (`computeNetDamageAfterReduction`, `applyReducedHitToCombatant`)** : Sur chaque ligne et dans le cockpit actif, saisie directe des dégâts bruts avec soustraction automatique de la Réduction du combattant (`💥 -Réd`), champ de PV éditable en direct, duplication de PNJ en 1 clic (`📋`), saut de tour en cliquant sur `#N` et nettoyage rapide des morts (`🧹 Retirer Morts`).

---

## [1.37.0] — 2026-11-23

### ✨ Ajouté
- **Planificateur de Sessions JDR — Doodle PJs Janvier à Mars 2026 (`sessions.html`, `js/sessions.js`, `js/navbar.js`, `js/global-search.js`, `index.html`, `sw.js`, `tests/unit-tests.js`)** :
  - Génération complète des **13 week-ends (65 créneaux)** du 2 janvier au 29 mars 2026 (*Vendredi soir*, *Samedi après-midi/soir*, *Dimanche après-midi/soir*) via `generateWeekendSlots` et `groupSlotsByWeekend`.
  - Interface de saisie rapide 4 états (`✅ Dispo`, `🟡 Si besoin`, `❌ Indispo`, `⬜ Non renseigné`) avec mode pinceau, filtres par mois/moment, remplissage en masse par week-end, préréglages de l'Escouade (*Hirohito Hida*, *Okado Hiruma*, *Tsuruchi Akira*, *Ryujin Mirumoto*, *Maître du Jeu*) et chargement automatique des personnages locaux du Dojo (`l5r_dojo_characters_v1`).
  - Classement automatique des meilleurs créneaux (`computeSlotRanking` avec détection d'unanimité 🌟), export iCalendar (`.ics` via `buildIcsEventContent`) et annonce Discord prête à copier (`formatDiscordSessionCall`).
  - Centralisation et fusion 100 % autonome sans serveur (`localStorage` + jetons URL compacts `?vote=` / `?poll=` + extraction multi-lignes Discord `extractAndDecodeShareInputs` + résumé Discord `formatDiscordPlayerSummary` + export/import `.json`).
  - Intégration dans la navigation globale (`js/navbar.js`), la recherche `Ctrl+K` (`js/global-search.js`), l'accueil (`index.html`), le cache PWA (`sw.js`) et ajout de la **Suite 18** dans `tests/unit-tests.js`.

---

## [1.36.0] — 2026-11-20

### ✨ Ajouté
- **Couverture complète des techniques passives des 95 écoles dans La Forge & Fiche Imprimable (`js/character-generator.js`, `js/forge-ui.js`, `tests/unit-tests.js`)** :
  - **Jets d'Attaque (`computeWeaponCombatMetrics` / `SCHOOL_ATTACK_RULES`)** : Intégration des bonus permanents pour **Bushi Yoritomo** (`+1g0` global), **Magistrat Doji** (`+1g0` Jitte / Sasumata), **Acteur Shosuro R2** (`+2g0` arme Petite), **Ordre Tatoué Togashi R2** (`+1g1` mains nues), **Moines de l'Araignée** (`+1g0` mains nues / hast), **Ingénieur Kaiu** (`+1g0` Compétences d'École), **Ombre du Lion Ikoma R2** (`+1g0` Compétences d'École), **Bushi Toritaka** (`+1g0` Perception) et **Pragmatiste Hida** (`+1g0` mains nues), en plus des écoles déjà gérées (*Bushi Hiruma*, *Archer Tsuruchi*).
  - **Jets de Dégâts (`computeWeaponCombatMetrics` / `SCHOOL_DAMAGE_RULES`)** : Intégration pour **Berserker Matsu** (`+Rang d'Honneur` statique), **Tueurs des Forêts** (`+Constitution` en mêlée), **Magistrat Soshi** (`+1g0` mêlée), **Bushi Heichi** (`+0g1` Lance), **Bushi Moto** (`+1g0` Cimeterre / arme à 2 mains), **Épéiste Taoïste Mirumoto** (`+1g0` sabre sans armure), **Ordre Tatoué Togashi R2** (`+1g1` mains nues), **Hitomi Kikage Zumi R4** (`+1g1` mains nues), **Temple d'Osano-Wo** (`+0g1` mains nues), **Bagarreur Mante** (`+1g0` mains nues / arme Petite) et **Pragmatiste Hida** (`+1g0` mains nues).
  - **Initiative (`computeInitiativeMetrics`)** : Ajout d'**Éclaireur Hiruma** (`+Discrétion`) et **Infanterie Montée Utaku R2** (`+1g0`).
  - **ND d'Armure & Réduction de Dégâts (`computeArmorDefenseMetrics`, `resolveCatalogArmorData`, `updateAll`, `refreshPrintSheet`, `updateArmorWeaponSummary`)** : Intégration de **Enquêteur Kitsuki** (`+Perception`), **Hitomi Kikage Zumi** (`+Réflexes`), **Magistrat Doji** (`+Air`), **Bushi Usagi** (`+Athlétisme`), **Moines de l'Araignée** (`+2 × Rang`), **Le Tessen** (`+Éventail de Guerre`), **Bushi Hida R2** (`+Terre` en Réduction) et **Épéiste Taoïste Mirumoto** (`+(Rang + 2)` en Réduction avec sabre sans armure), ainsi que résolution dynamique de toutes les armures du catalogue (`Ashigaru`, `Tetsu-Dō`, `Bogu`, etc.).
  - **Seuils de Blessures (`calculateWoundThresholds`)** : Prise en compte de **Tueurs des Forêts** (`+Constitution` par palier de blessure) en complément du *Guerrier de Fer Daidoji*.
  - **Compétences sur Fiche Imprimable (`computeSkillRollBonus`)** : Affichage automatique des bonus passifs d'école (*Ingénieur Kaiu*, *Ombre du Lion Ikoma R2*, *Bushi Toritaka*, *Éclaireur Daidoji*, *Infiltrateur Shosuro*, *Vengeur Moto R2* et *Érudit Asako R5*).

### 🐛 Corrigé
- **Initiative Bushi Bayushi (`computeInitiativeMetrics`)** : Correction de l'ancienne règle héritée (1e/3e) pour appliquer la règle exacte **L5R 4e** (`+1g1 à tous les jets d'Initiative`).
- **Isolation stricte des identifiants d'écoles (`getEffectiveSchoolRank`)** : Resserrage des motifs de correspondance afin d'éviter toute collision entre variantes familiales (ex. *Bushi Hida* vs *Pragmatiste Hida*, *Bushi Mirumoto* vs *Épéiste Taoïste Mirumoto*).

---

## [1.35.2] — 2026-11-20

### 🐛 Corrigé
- **Bonus d'Archer Tsuruchi dans La Forge & Fiche Imprimable (`js/character-generator.js`, `js/forge-ui.js`, `createcharacter.html`, `tests/unit-tests.js`, Issue #93)** :
  - Prise en compte du **Rang 1 *Toujours Prêt* (Archer Tsuruchi)** dans le calcul du jet pour toucher (`+1g0` avec tous les arcs : *Yumi*, *Dai-kyu*, *Han-kyu*) et dans le calcul d'**Initiative** (`+3`), y compris lorsque l'école est acquise en seconde école via *Écoles Multiples*.
  - Prise en compte du **Rang 2 *La Flèche Connaît le Chemin*** (`+2g0` aux dégâts avec un arc) dès le Rang de Réputation 2+.
  - Correction de l'équipement automatique lors de la sélection d'*Archer Tsuruchi* (`"Arc Yumi"` corrigé vers `"Yumi (Arc, Flèches Saule 2g2)"`) et unification du calcul de combat entre la barre sticky (`#sticky-atk` / `#sticky-dmg`), le récapitulatif d'étape (`#gear-weapon-summary`) et la fiche PDF (`#p-weapons-box`).
  - Ajout de tests unitaires dédiés dans `tests/unit-tests.js` (Suite 1) pour `computeWeaponCombatMetrics` et `computeInitiativeMetrics`.

---

## [1.35.1] — 2026-11-20

### 🐛 Corrigé
- **Carte de Rokugan — Recalibrage des emplacements (`data/carte-data.js`)** :
  - Correction de la position du **Mur Kaiu** (désormais placé directement sur la muraille sud-ouest), des **Terres de l'Outremonde** (bien au-delà du Mur), de **Kyuden Hida** (citadelle côtière au bout du Mur), de **Shiro Kaiu**, **Shiro Hiruma**, **Shiro Kuni** et **Shiro Kaotsuki No Higashi**.
  - Réalignement sur les châteaux dessinés et les frontières de clans pour **Kyoteï**, **Kyuden Seppun**, **Kyuden Kakita**, **Kyuden Doji**, **Shiro Daidoji**, **Source de Mémoire**, **Ryoko Owari**, **Shiro Shosuro**, **Kyuden Bayushi**, **Shiro Yogo**, **Forêt de Shinomen**, **Yanagi Mura**, **Kyuden Ashinagabachi**, **Kyuden Yoritomo** et les segments `CAMPAIGN_ROUTE` associés.

---

## [1.35.0] — 2026-11-20

### ✨ Ajouté
- **Catalogue complet des 43 Katas officiels L5R 4e (`data/katas-data.js`)** :
  - Ajout des 3 Katas d'Eau issus de *The Book of Water (p. 177)* : **Feuilles dans le Courant (*Leaves in the Stream*)**, **Vagues sur les Brisants (*Waves Upon the Breakers*)** et **La Puissance du Tsunami (*Power of the Tsunami*)**.
  - Précision des écoles autorisées (*Bushi Daigotsu*, *Ninja Goju*) sur les katas du Livre de Base et *The Great Clans*.
- **Nouvelle page « Recueil des Katas Martiaux » (`katas.html`, `js/katas.js`, `js/navbar.js`)** :
  - Page dédiée accessible depuis la barre de navigation, `kihos.html` et la recherche globale : filtres par Élément (dont *1 000 Ans d'Acier — Air / Feu*), par Niveau de Maîtrise (`3` à `6`), recherche instantanée FR/EN (ex. *The World is Empty*), mémento des règles officielles (p. 259) et respect du verrou MJ `gmOnly`.
- **Recherche Globale & La Forge (`js/global-search.js`, `createcharacter.html`)** :
  - Indexation complète des Katas dans la recherche globale (`Ctrl+K`) avec onglet dédié `Katas` et redirection directe `katas.html?q=...`.
  - Ajout du filtre explicite `Air / Feu (1 000 Ans d'Acier)` dans le sélecteur de Katas de La Forge (`createcharacter.html`).

### 🧪 Tests & Cache
- Mise à jour de `tests/unit-tests.js` (43 Katas officiels, vérification de *The World is Empty* et des 3 Katas de *The Book of Water*, tests de `filterKatasList`) et mise en cache PWA de `katas.html` & `js/katas.js` (`sw.js`).

---

## [1.34.0] — 2026-11-20

### ✨ Ajouté
- **Boutons « 🐛 Signaler un bug » et modale « ✉️ Contacter l'auteur » sur toutes les pages (`js/navbar.js`)** :
  - Injection centralisée dans le pied de page `#site-version-footer` du lien *Signaler un bug* (vers `/issues/new/choose`) et du bouton *Contact* ouvrant une fenêtre modale complète (Nom/pseudo facultatif, Email facultatif, Sujet, Message 0/3000 caractères, envoi direct via FormSubmit avec repli `mailto:` hors-ligne et raccourci *Signaler sur GitHub*).
- **Formulaires GitHub Issues catégorisés (`.github/ISSUE_TEMPLATE/`)** :
  - Ajout de 4 formulaires YAML guidés : **Bug**, **Idée d'évolution**, **Règle à vérifier** (L5R 4e) et **Contenu, Scénario ou Podcast**, accompagnés de `config.yml` (`blank_issues_enabled: false`).

---

## [1.33.1] — 2026-11-18

### 🐛 Corrigé
- **Générateur Podcast Edge TTS (`scripts/generate_podcasts.py`, `.github/workflows/generate-podcasts.yml`)** :
  - Filtrage des segments sans caractère alphanumérique (qui provoquaient `NoAudioReceived` sur Edge TTS).
  - Passage à 5 tentatives avec backoff et repli automatique (`fr-FR-HenriNeural` / `fr-FR-DeniseNeural`), concurrence réduite à 2 avec délai de courtoisie et sauvegarde incrémentale de `data/podcasts-manifest.json` après chaque acte.

---

## [1.33.0] — 2026-11-18

### ✨ Ajouté
- **Lecteur Podcast Natif sur les Scénarios (`js/narrator.js`, `js/campagne-studio.js`, `data/podcasts-manifest.json`)** :
  - Détection automatique des épisodes MP3 générés dans `data/podcasts-manifest.json` pour afficher un lecteur Podcast complet : barre de progression interactive, avance/recul `-15s / +15s`, vitesse `0.85x` à `1.5x`, reprise automatique à la seconde près, mode continu `🔁 Continu : ON/OFF`, téléchargement direct `.mp3` et bascule vers la synthèse vocale de secours.
  - Affichage du badge **🎙️ Podcast MM:SS** sur chaque carte de scénario dans `campagne.html`.
- **Générateur Automatique de Podcasts Multi-Voix (`scripts/generate_podcasts.py`, `.github/workflows/generate-podcasts.yml`)** :
  - Synthèse vocale neuronale gratuite (Edge TTS) en mode **Conteur immersif** : narration principale, voix distinctes pour les dialogues masculins/féminins et pensées intérieures, micro-pauses dramatiques et carillon pentatonique japonais en intro/outro assemblé via `ffmpeg`.
  - Workflow GitHub Actions (`generate-podcasts.yml`) déclenchable à la demande pour générer tous les épisodes ou un acte spécifique sans clé API.

### 🧪 Tests
- Ajout de la **Suite 17** dans `tests/unit-tests.js` couvrant `formatPodcastTime` et `resolvePodcastEntry`.

---

## [1.32.1] — 2026-11-18

### 🔧 Technique & Hygiène
- **Contrôle CI automatique Scénarios ↔ Carte ↔ Accueil (`.github/scripts/check-site.js`)** :
  - Vérification systématique à chaque Pull Request que `SCENARIOS_DATA.length === CAMPAIGN_ROUTE.length`, que chaque fichier de scénario et chaque `locationId` existent, et que les compteurs de `carte.html` et `index.html` sont synchronisés.
- **Audit du cache hors-ligne PWA (`sw.js`)** :
  - Ajout des 8 médaillons de Clans (`assets/images/clans/mon-*.png`), de `js/campagne-studio.js` et de `js/narrator.js` dans `CORE_ASSETS` pour une disponibilité hors-ligne complète.

---

## [1.32.0] — 2026-11-18

### ✨ Ajouté
- **Écran MJ — Ennemis de l'Acte 11 (`js/gm-screen.js`)** :
  - Ajout de 3 préréglages dans `ENEMY_PRESETS` : *Marionnette sans bouche (Acte 11)*, *Archer corrompu (Acte 11)* et *Bunzo, Faux Moine (Acte 11)*.
- **Liaison directe Dojo → Écran MJ (`ecran-mj.html`, `js/gm-screen.js`)** :
  - Ajout du bouton **🏯 Charger mon Dojo** important d'un clic les personnages sauvegardés dans La Forge (`l5r_dojo_characters_v4`) vers la table des PJs et le tracker d'Escarmouche.
- **Générateur Express MJ (`ecran-mj.html`, `js/gm-screen.js`)** :
  - Nouveau panneau d'improvisation générant instantanément des noms rokuganis par clan (ou roturier *Heimin*) ainsi que des rumeurs et complications de voyage.

### 🧪 Tests
- Ajout de la **Suite 16** dans `tests/unit-tests.js` couvrant les préréglages Acte 11, `generateRokuganiName` et `generateGmEncounterHook`.

---

## [1.31.0] — 2026-11-18

### ✨ Ajouté
- **Mode « Session de Jeu » dans La Forge (`createcharacter.html`, `js/forge-ui.js`, `js/character-generator.js`)** :
  - Nouveau panneau dépliable **⚔️ Session** accessible depuis le cockpit de la Forge pour suivre en partie les **Blessures** (paliers et malus L5R 4e automatiques selon l'Anneau de Terre), les **Points de Vide**, les **Emplacements de Sorts lancés** par élément, la **Souillure** et les **Notes rapides de séance**, avec bouton **🌙 Repos complet** et sauvegarde automatique dans le brouillon et le Dojo (`sessionState`).
- **Sauvegarde & Restauration complète du Dojo (`createcharacter.html`, `js/forge-ui.js`, `js/character-generator.js`)** :
  - Ajout des boutons **📦 Sauver tout le Dojo** (export JSON unique de tous les personnages du `localStorage`) et **📂 Restaurer Dojo** (import et fusion intelligente sans doublons via `mergeDojoBackupLists`).

### 🧪 Tests
- Ajout de la **Suite 15** dans `tests/unit-tests.js` couvrant `computeForgeSessionWoundState`, `normalizeSessionState` et `mergeDojoBackupLists`.

---

## [1.30.0] — 2026-11-18

### ✨ Ajouté
- **Codex de Campagne : PNJ, Lieux & Reliques (`data/campaign-codex-data.js`, `campagne.html`, `js/campagne-studio.js`)** :
  - Ajout d'un onglet dédié dans `campagne.html` répertoriant les **PNJ majeurs** (*Soshi Takeda*, *Hida Kisada*, *Kuni Yuriko*, *Chuda Tenkasu*, *Bunzo*, etc.), les **lieux emblématiques** et les **reliques/indices** sur l'ensemble des 11 actes, avec filtres par catégorie, par acte et recherche instantanée, et liens directs vers chaque scénario.
- **Mode « Lecture Audio Continue » (`js/narrator.js`, `campagne.html`)** :
  - Ajout du bouton **« Écoute Continue (Acte 1 → 11) »** et du bouton **« Reprendre l'écoute »** dans `campagne.html`.
  - Ajout d'un sélecteur `🔁 Continu : ON/OFF` dans la barre audio des scénarios permettant d'enchaîner automatiquement l'acte suivant après un compte à rebours de 3 secondes.
- **Studio de Campagne aligné sur la Checklist Carte (`campagne-ajouter.html`, `js/campagne-studio.js`)** :
  - Génération en direct du bloc `data/carte-data.js` (`ROKUGAN_LOCATIONS` + `CAMPAIGN_ROUTE`) et de la checklist `carte.html` / `index.html` avec copie en 1 clic et inclusion dans les Pull Requests générées.

### 🧪 Tests & Cache
- Ajout de la **Suite 14** dans `tests/unit-tests.js` couvrant `CAMPAIGN_CODEX_DATA`, `filterCodexEntries` et `buildCarteDataSnippet`.
- Mise en cache de `data/campaign-codex-data.js` dans `sw.js` (`l5r-forge-v1.30.0`).

---

## [1.29.1] — 2026-11-18

### 🔄 Modifié
- **Carte de Rokugan (`data/carte-data.js`, `carte.html`, `js/carte-rokugan.js`)** :
  - Ajout du village de **Yanagi Mura** (`yanagi-mura`, lisière de la forêt de Shinomen) à `ROKUGAN_LOCATIONS` et de l'**Acte 11 : *Écho du sang*** (`step: 11`) à `CAMPAIGN_ROUTE`.
  - Mise à jour du curseur chronologique (`max="11"`, `value="11"`), du badge (`Actes 1 à 11 / 11`), du sous-titre, des libellés d'étapes et de la valeur de repli `maxAct`.
- **Page d'accueil (`index.html`)** :
  - Mise à jour des compteurs d'actes et de scénarios (`11 actes de la chronique`, `VITRINE DES 11 SCÉNARIOS DE LA CAMPAGNE`, `FRISE DES 11 SCÉNARIOS`, `11 / 11 Récits Complets`).
- **Directives projet (`GEMINI.md`)** :
  - Ajout de la **Section 6 : Ajout d'un Nouveau Scénario de Campagne (Checklist Obligatoire)** imposant la mise à jour systématique de la Carte de Rokugan et de la page d'accueil à chaque nouveau scénario.

---

## [1.29.0] — 2026-11-18

### ✨ Ajouté
- **Scénario 11 : *Écho du sang* (`campagne/scenario-11.html`, `data/scenarios-data.js`, `js/index-ui.js`, `campagne/scenario-10.html`, `index.html`)** :
  - Publication complète du récit de **Tsuruchi Akira** (avec *Okado, Hiro-Hito & Ryujin*) : convocation par le magistrat **Soshi Takeda** au Pavillon des Murmures d'Automne, embuscade des armures rouillées aux masques sans bouche, enquête à **Yanagi Mura**, affrontement contre le faux moine **Bunzo** sous les racines du saule pleureur et découverte des pistes vers **Chuda Tenkazu** et la lignée d'Asahina Yajinden.
  - Intégration du lecteur audio (`js/narrator.js`), de l'encadré *Objets Récupérés & Pistes*, du chaînage depuis `scenario-10.html` et de la mise à jour du compteur de campagne (`11 Actes`).

---

## [1.28.0] — 2026-11-18

### 🎨 Amélioré
- **8 *Mon* Officiels HD des Grands Clans (`assets/images/clans/mon-*.png`)** :
  - Remplacement des découpes de carte par **8 médaillons haute définition (`512×512`, PNG détouré)** en style orfèvrerie dorée et laque japonaise fidèles aux emblèmes de la 4ᵉ édition (*Crabe, Grue, Dragon, Lion, Mante, Phénix, Scorpion, Licorne*), utilisés sur la page d'accueil et les 8 pages de Clans.

---

## [1.27.0] — 2026-11-18

### ✨ Ajouté & Amélioré
- **Parcours Joueur « Premier Lancement » & Accueil (`index.html`, `js/index-ui.js`, `sw.js`)** :
  - Restructuration du Hero d'accueil en deux parcours clairs côte à côte : **🎴 Je suis Joueur** (*Forger mon Samouraï, Écoles, Clans*) et **幕 Je suis Maître du Jeu** (*Écran du MJ, Carte, Campagne*).
  - Ajout de la section **« 🏯 Mes Personnages (Mon Dojo) »** (`#home-saved-roster`) directement sous le Hero, affichant jusqu'aux 3 derniers samouraïs sauvegardés dans `localStorage` avec boutons directs **« ⚔️ Reprendre »** et **« 📥 Exporter JSON »**.
  - Remplacement des pastilles kanji sur les 8 cartes des Grands Clans de l'accueil par les **8 médaillons *mon* officiels** (`assets/images/clans/mon-*.png`).

---

## [1.26.0] — 2026-11-18

### ✨ Ajouté & Amélioré
- **Carte de Rokugan (`carte.html`, `js/carte-rokugan.js`, `css/main.css`)** :
  - Désencombrement automatique à 100 % de zoom : seules la capitale, les étapes PJs et les sélections affichent leur étiquette par défaut ; les villes secondaires se révèlent au survol, via un filtre de clan, ou dès que le zoom atteint `135%`.
  - Ajout du bouton **« ⛶ Plein écran »** (`#btn-map-fullscreen`) pour projeter la carte et le chemin des PJs sur un second écran.
- **La Forge (`createcharacter.html`, `js/forge-ui.js`)** :
  - Mise en avant dès l'Atelier 1 de l'assistant **« 📜 Vingt Questions »** (`jumpToTwentyQuestions()`), du **Comparateur d'Écoles** et de l'**Import JSON**.
- **Écran du MJ (`ecran-mj.html`, `js/gm-screen.js`)** :
  - Ajout d'un **Historique de l'Escarmouche rétractable** (`#gm-combat-log-details`) enregistrant les tours, renforts et dégâts appliqués.
  - Ajout d'un lecteur d'**Ambiance Sonore MJ** autonome (Web Audio API : *Pluie & Marais*, *Vent des Pics*, *Brasero / Maho*, *Tambour de Guerre*) avec contrôle de volume.
  - Ajout d'une barre de raccourcis **« 🖼️ Visuels PJs »** en tête du Scénario II pour projeter instantanément chacune des 4 illustrations sans spoiler.

---

## [1.25.0] — 2026-11-18

### ✨ Ajouté
- **Recherche Globale Instantanée (`Ctrl + K` / `Cmd + K`)** (`js/global-search.js`, `js/navbar.js`) :
  - Ajout d'un bouton **« 🔍 Rechercher »** dans la barre de navigation globale ouvrant une palette de recherche instantanée avec navigation clavier (`↑`/`↓`/`Entrée`/`Échap`) et filtres par catégorie (*Pages, Clans, Écoles, Sorts, Kihos, Tatouages, Lieux, Scénarios, Règles*).
  - Chargement paresseux (*lazy-loading*) des bases de données uniquement à l'ouverture de la modale, et respect strict du verrou MJ (`gmOnly` masqué par défaut).
- **Fil d'Ariane Automatique (`renderBreadcrumb`)** (`js/navbar.js`) :
  - Injection automatique d'un fil d'Ariane cliquable sous l'en-tête sur toutes les pages secondaires (clans, scénarios, aides de jeu, outils et campagne).
- **PWA & Tests (`sw.js`, `tests/unit-tests.html`, `tests/unit-tests.js`)** :
  - Mise à jour du cache Service Worker (`l5r-forge-v1.25.0`) avec `js/global-search.js` et ajout de la **Suite 13** de tests unitaires.

---

## [1.24.0] — 2026-11-18

### ✨ Ajouté & Amélioré
- **Embellissement des 8 Pages de Grands Clans (`clans/*.html`, `assets/images/clans/mon-*.png`)** :
  - Extraction et intégration des **8 *mon* officiels de la 4ᵉ édition** en médaillons dorés haute définition dans une nouvelle carte héraldique dédiée sur chaque page (*Crabe, Grue, Dragon, Lion, Mante, Phénix, Scorpion, Licorne*), affichant le Kami fondateur, les vertus et les couleurs traditionnelles.
  - Restructuration du Hero de chaque clan en 2 colonnes avec boutons d'action directs vers la **Forge** (`createcharacter.html?clan=...`), le **Comparateur d'Écoles** (`ecoles.html?clan=...`) et la **Carte de Rokugan** (`carte.html`).

---

## [1.23.1] — 2026-11-18

### 🐛 Corrigé
- **Tracé du Chemin des PJs sur la Carte de Rokugan** (`data/carte-data.js`, `js/carte-rokugan.js`, `sw.js`) :
  - Suppression des allers-retours superposés dans `CAMPAIGN_ROUTE` (Actes 3 et 8) qui créaient des traits en trop et se chevauchaient sur le même axe.
  - Remplacement des polylignes à double bordure pleine par des courbes quadratiques fluides (`buildSmoothPathD`) en pointillés nets sans aucun trait plein sous-jacent, avec mise en valeur exclusive de l'étape active.

---

## [1.23.0] — 2026-11-18

### 🎨 Amélioré
- **Carte de Rokugan HD Enluminée** (`assets/images/carte_rokugan.jpg`, `carte.html`, `sw.js`) :
  - Remplacement de la carte par une nouvelle version haute définition en style parchemin impérial japonais *ukiyo-e / sumi-e* conservant la géographie canonique exacte (côtes, îles de la Mante, forêt de Shinomen, rivières, Mur des Kaiu).
  - **Territoires des Clans clairement apparents & *Mon* officiels en filigrane** (`assets/images/carte_rokugan.jpg`) : chaque grand clan (*Licorne, Dragon, Phénix, Lion, Grue, Scorpion, Crabe, Mante*) ainsi que l'*Outremonde* est visuellement identifié par un lavis de couleur distinct, des frontières dorées finement encrées et son **blason (*mon*) officiel de la 4ᵉ édition** intégré en filigrane sur son territoire, avec vagues *seigaiha* et rose des vents impériale.
  - Ajustement du ratio d'affichage (`aspect-square`) dans `carte.html` pour préserver la netteté HD sans aucune déformation et mise à jour du cache Service Worker (`l5r-forge-v1.23.0`).

---

## [1.22.0] — 2026-11-18

### ✨ Ajouté
- **Coin MJ Prêt-à-Jouer — Scénario II : *Les Jouets de Cendre et de Sang*** (`ecran-mj.html`, `data/gm-scenarios-data.js`, `js/gm-screen.js`) :
  - Ajout d'un nouvel onglet dédié **« 🎭 Scénario Jour J »** dans le Poste de Commandement Principal de l'Écran du MJ, avec navigation rapide par section (*Briefing & PJs*, *Actes I à IV*, *Épilogue & XP*, *Annexe PNJs*).
  - **Suivi de Progression Jour J** : checklist interactive de 10 étapes clés persistée automatiquement dans `localStorage`, accompagnée du rappel des règles critiques (*Peur*, *Souillure*, *Poudre de Jade*, *Maho*).
  - **Suivi Psychologique des PJs** : fiches dédiées pour *Okado*, *Hiro-Hito*, *Ryujin*, *Akira* et *Yuriko* détaillant les hallucinations et leviers narratifs/mécaniques.
  - **Textes d'Ambiance, Dialogues & Jets Cliquables** : intégration complète des 4 actes, de l'épilogue et des 5 profils de l'annexe technique (*Chuda Tenkazu*, *Guerrier Tsuno*, *Shikageko / Murai*, *Zombies de Sang & Kuroiban*, *Chuda Reikado*), avec boutons de jets `🎲` reliés directement au Lanceur Roll & Keep du dock MJ.
  - **Lancement Direct en Escarmouche** : boutons d'action générant instantanément les combats clés du scénario (*Acte II : Shikageko + 4 Zombies de Sang* et *Acte IV : Chuda Tenkazu + Guerrier Tsuno + 4 Zombies de Sang*) avec les PJs cochés, plus ajout des 5 adversaires dans `ENEMY_PRESETS`.
  - **Verrouillage MJ Strict** : l'onglet Scénario Jour J et les 5 modèles d'adversaires du scénario sont masqués par défaut derrière le sceau secret MJ (`sessionStorage` `l5r_maho_unlocked`, partagé avec la Forge et les Écoles), avec un bouton **« 🔒 Verrouiller (Masquer) »** pour cacher instantanément le contenu aux joueurs.
  - **Illustrations & Projection Plein Écran Sans Spoiler** (`assets/images/scenarios/sc2-*.jpg`, `#gm-lightbox-modal`) : 4 illustrations dédiées aux moments clés (*Netsuke & Toupie maudite*, *Sanctuaire des Marais / Shikageko*, *Tribu Nezumi de la Patte Crochue*, *Fonderie de Sang & Tenkazu*), affichables en plein écran sur fond noir opaque pour les montrer aux joueurs sans dévoiler les notes du MJ.
- **PWA & Tests (`sw.js`, `tests/unit-tests.html`, `tests/unit-tests.js`)** :
  - Mise à jour du cache Service Worker (`l5r-forge-v1.22.0`) incluant `data/gm-scenarios-data.js`.
  - Ajout de la **Suite 12** de tests unitaires vérifiant l'intégrité de `GM_SCENARIOS_DATA` et la correspondance des rencontres avec `ENEMY_PRESETS`.

---

## [1.21.0] — 2026-11-17

### ✨ Ajouté & Corrigé
- **Système d'Importation Complet dans la Forge (`Le Carnet de Rokugan` JSON v1/v2 & Forge JSON)** (`js/export-carnet.js`, `js/character-generator.js`, `js/forge-ui.js`, `createcharacter.html`) :
  - Ajout d'une modale dédiée **« 📥 Importer »** (`#forge-import-modal`) accessible depuis la barre d'actions bureau, le tiroir **Mon Dojo** et le menu mobile : sélection de fichier `.json`, glisser-déposer, ou collage direct de JSON brut.
  - **Convertisseur bidirectionnel `convertCarnetToForgeData`** traduisant fidèlement les fiches du **Carnet de Rokugan (`schemaVersion: 2`)** : Clans (FR/EN & Clans Mineurs), Familles, Écoles (`schoolId` & libellés via `CARNET_SCHOOL_CATALOG`), Traits + Vide, Compétences (alias FR/EN & remplissage automatique des créneaux `[Choix]` de l'école), Avantages/Désavantages, Sorts & Affinité, Armures/Armes et Budget XP — tout en conservant le verrouillage strict des secrets MJ (`gmOnly`).
  - **Aperçu interactif avant import** : détection automatique du format (*Carnet v1/v2* ou *Forge L5R 4e*), prise en charge des fichiers multi-personnages (`characters[]`), et choix entre *Charger sur la fiche active* ou *Importer & Sauver dans Mon Dojo*.
- **Correction de persistance Forge & Tests (`js/character-generator.js`, `tests/unit-tests.js`)** :
  - Correction de la sauvegarde et restauration des Sorts (`window.charSpellsList`), Katas (`window.charKatasList`), Tatouages (`window.charTattoosList`), de la Chronique Biographique et des Vingt Questions lors de l'export/import JSON Forge et dans Mon Dojo.
  - Ajout de la **Suite 11** de tests unitaires couvrant `isCarnetRokuganPayload`, `extractCarnetCandidates`, `resolveForgeSkillName` et `convertCarnetToForgeData`.

---

## [1.20.0] — 2026-11-17

### ✨ Ajouté & Amélioré
- **Explorateur & Tableau Comparateur des Écoles de Rokugan (`ecoles.html`, `js/ecoles.js`)** :
  - Catalogue interactif et triable de toutes les **88 écoles publiques** issues de `CLANS_DATA` (*Livre de Base* et suppléments officiels : 42 Bushi, 17 Shugenja, 11 Courtisans, 13 Moines, 3 Artisans, 2 Ninjas), tout en masquant strictement par défaut les **7 écoles secrètes réservées au MJ** (*Clan de l'Araignée* et *Shugenja Chuda originelle*).
  - **Modes de jeu rapides (« En un clic »)** : 9 profils préconfigurés (*Duelliste d'Élite*, *Rempart & Tank*, *Maître de Guerre*, *Lanceur de Sorts*, *Voix de la Cour*, *Ombre & Furtivité*, *Haute Honneur*, *Économie d'Actions*, *Voie des Éléments*) plus filtres combinables par Clan, Archétype, Bonus de Trait, Compétence enseignée, Honneur minimum et recherche plein texte (y compris sur les techniques Rangs 1 à 5).
  - **Tableau Multi-Colonnes & Vue Cartes** : Tri ascendant/descendant par École, Clan, Archétype, Bonus de Trait, Honneur, Nombre de Compétences ou Technique Rang 1, bascule instantanée entre Tableau et Cartes, et étiquettes mécaniques détectées automatiquement (*Action Simple*, *Synergie Vide*, *Réduction*, *Duel Iaijutsu*, *Dégâts*, *Soins / Soutien*...).
  - **Inspecteur Rangs 1–5 & Comparateur Côte à Côte** : Modale détaillée affichant l'héritage complet de l'école (Trait, Compétences, Honneur, Équipement, Technique spéciale / Affinité / Dévotion) et un comparateur jusqu'à **3 écoles côte à côte** mettant en évidence les compétences partagées et la progression Rangs 1 à 5.
  - **Passage Direct vers la Forge (`js/forge-ui.js`, `createcharacter.html`)** : Boutons *« ⚒️ Forger »* ouvrant directement `createcharacter.html?clan=<id>&school=<id>` avec pré-sélection automatique du Clan, de la Famille recommandée et de l'École ; ajout d'un lien *« ⚖️ Comparer toutes les écoles ↗ »* dans la Forge.
  - **Verrou MJ (`#btn-toggle-gm-secrets`)** : Partage l'état d'ouverture `sessionStorage` existant des secrets du MJ (mot de passe `araignee`) pour révéler temporairement les 7 écoles interdites aux côtés des 88 publiques (total : 95) ou les re-verrouiller en un clic.
- **Navigation, PWA & Tests (`js/navbar.js`, `index.html`, `sw.js`, `tests/unit-tests.js`, `tests/unit-tests.html`)** :
  - Ajout de l'Explorateur des Écoles dans le menu *Outils* (bureau & mobile), dans les boutons d'action et le compteur de l'accueil (`88 Écoles / Tableau & Comparateur`), et dans le cache Service Worker (`l5r-forge-v1.20.0`).
  - Ajout de la Suite 10 de tests unitaires couvrant `buildSchoolsCatalogEntries`, `filterSchoolsEntries`, `sortSchoolsEntries` et la non-fuite des écoles `gmOnly`.

---

## [1.19.0] — 2026-11-17

### ✨ Ajouté & Complété
- **Intégralité des 10 Couvertures Principales en Style Dessin Japonais (Actes 1 à 10)** (`assets/images/scenarios/cover-2,4,6,7,8,9,10.jpg`, `data/scenarios-data.js`, `campagne/scenario-2,4,6,7,8,9,10.html`, `sw.js`) :
  - Génération et intégration des **7 dernières couvertures principales** (`1376×768`) au trait d'encre *sumi-e*, lavis d'aquarelle *nihonga* et touches dorées pour les Scénarios 2 (*Kyoteï*), 4 (*Frères morts*), 6 (*Mariage d'Okado*), 7 (*Ryoko Owari*), 8 (*Le crépuscule de l'honneur*), 9 (*« Ce qui ne meurt pas »*) et 10 (*La tombe de Iuchiban*).
  - Chaque acte de la campagne possède désormais sa bannière d'ouverture `.scenario-cover` sur sa page dédiée et sa vignette de couverture sur le catalogue `campagne.html` (**10/10 couvertures japonaises + 30/30 scènes intérieures**).

---

## [1.18.0] — 2026-11-17

### ✨ Ajouté
- **Carte Interactive de Rokugan & Itinéraire des PJs (`carte.html`, `data/carte-data.js`, `js/carte-rokugan.js`, `assets/images/carte_rokugan.jpg`)** :
  - Carte complète et haute définition de l'Empire d'Émeraude zoomable à la molette, déplaçable à la souris/au doigt, avec boutons de zoom (`+`, `−`, `Réinitialiser`).
  - **42 lieux emblématiques calibrés** (capitales impériales, châteaux claniques, cols stratégiques, forêts, îles et Terres de l'Outremonde) filtrables par clan/catégorie et recherchables instantanément, avec fiches détaillées et liens directs vers les encyclopédies de clans.
  - **Tracé animé du Chemin des PJs sur les 10 Actes de la Campagne** (de *Tsuma* jusqu'à *La tombe de Iuchiban*) avec curseur chronologique Acte par Acte (`Actes 1 à N / 10`), bouton d'affichage/masquage et liens directs vers chaque récit de scénario.
- **Navigation, Service Worker & Tests (`js/navbar.js`, `index.html`, `campagne.html`, `sw.js`, `tests/unit-tests.js`)** :
  - Ajout de la **Carte de Rokugan** dans le menu *Outils* (bureau & mobile), sur la page d'accueil et sur la page Campagne.
  - Ajout de la Suite 9 de tests unitaires couvrant `ROKUGAN_LOCATIONS`, `CAMPAIGN_ROUTE`, `filterLocations` et `buildRoutePointsUpToAct`.

---

## [1.17.0] — 2026-11-17

### ✨ Ajouté & Réorganisé
- **Complément Exhaustif des Familles Vassales sur les 8 Pages de Clans (`clans/*.html`, *The Great Clans* pp. 284–291)** :
  - Ajout de toutes les familles vassales manquantes jusqu'ici sur l'ensemble des 8 Grands Clans (**57** lignées vassales au total) : **Crabe** (`Endo`, `Fundai`, `Kakeguchi`, `Kano`, `Maisuna`, `Meishozo`, `Moshibaru`, `Raikuto`, `Ugawari`), **Grue** (`Ashidaka`, `Hiramichi`, `Hiramori`, `Iwasaki`, `Kotagama`, `Tsume`), **Dragon** (`Chiyu`, `Hiasobi`, `Izaku`, `Koukan`, `Sakura`, `Zurui`), **Lion** (`Hosokawa`, `Ikeda`, `Ise`, `Katai`, `Koritome`, `Murame`, `Noroko`, `Seizuka`, `Shimizu` déchue), **Mante** (`Byako`, `Goraiku`, `Hogosha`, `Kagehisa`, `Shudo`, `Suguru`, `Watanabe`), **Phénix** (`Atsumaru`, `Chukan`, `Izaku`, `Nani`, `Nasu`, `Shingon`, `Sodona`), **Scorpion** (`Aotora`, `Kochako`, `Naganori`, `Nanbu`, `Rokugo`, `Tansaku`, `Tokagure`) et **Licorne** (`Battue`, `Hyuga`, `Kenshin`, `Marta`, `Naoko`, `Onshigawa`, `Suio`).
- **Ergonomie, Classement par Famille Bushi & Accordéons (`js/clans-ui.js`, `css/main.css`, `clans/*.html`)** :
  - Classement systématique des lignées en plaçant les **Familles de Bushi en tête** sur chaque page de clan.
  - Intégration d'accordéons repliables (`<details class="clan-accordion">`) pour les descriptions des familles vassales, les rangs 1 à 5 des écoles de base et les règles des écoles avancées/voies alternatives, réduisant fortement la hauteur visuelle par défaut.
  - Ajout d'une barre de filtres interactifs par lignée (`Toutes`, `⚔️ Bushi uniquement`, ou par famille patronne), de raccourcis directs « Voir les écoles de cette lignée ↓ » et de boutons « Tout déplier / Tout replier ».

---

## [1.16.1] — 2026-11-17

### 🐛 Corrigé
- **Menus Déroulants de Navigation (`js/navbar.js`, `css/main.css`, `createcharacter.html`)** :
  - Suppression de l'interstice vertical (`mt-1.5` remplacé par un conteneur `.nav-dropdown-panel` à `top-full pt-2`) entre les boutons du haut (*Clans majeurs*, *Aides*, *Outils*) et leur panneau déroulant afin que la souris ne perde plus le survol en descendant vers un lien.
  - Ajout d'un délai de grâce de `220 ms` au départ du pointeur, d'un déclenchement par clic/tactile (`is-open` / `aria-expanded`) et d'une fermeture propre au clic extérieur ou via `Échap`.

---

## [1.16.0] — 2026-11-17

### ✨ Ajouté & Dissimulé (Accès MJ vs Vue Joueurs)
- **Dissimulation des Factions & Options Secrètes dans la Forge (`data/*.js`, `js/character-generator.js`, `js/forge-ui.js`, `createcharacter.html`)** :
  - Marquage `gmOnly: true` et masquage par défaut côté joueurs du **Clan de l'Araignée** (`araignee`), de la famille/école **Chuda originelle (Serpent)**, des **Avantages & Désavantages secrets** (*Parangon Sombre*, *Savoir Interdit*, *Consumés par le Shouridō*, *Agent Dormant* Kolat, *Souillure de l'Outremonde*), du **Kata** *La Force de l'Araignée*, des **armes shinobi** (*Ninja-tō*, *Shuriken*, *Tsubute*, *Sarbacane*, *Nageteppo*), et nettoyage des références spoilers dans `Morito Bushi`, `Connaissance (Lore)`, `katas-data.js`, `avantages-desavantages-data.js` et `grimoire.html`.
  - Ajout d'un accès **🔒 MJ** discret en pied de page de `createcharacter.html` (`#btn-toggle-gm-secrets` + modale `#gm-secrets-modal`) partageant la même session de déverrouillage que le sceau du Grimoire (`sessionStorage.l5r_maho_unlocked`) tout en conservant la compatibilité complète des exports `Carnet de Rokugan` (`schemaVersion: 2`).
- **Ergonomie des Kihos pour Shugenjas vs Moines (`js/forge-ui.js`)** :
  - Masquage du filtre et des Kihos dans le panneau 5A des Shugenjas qui ne disposent pas de l'avantage *Ami de la Confrérie* (tout en conservant l'accès permanent aux Kihos pour tous les Moines : Confrérie, Ordre Tatoué Togashi et Henshin Asako).
- **Tests Unitaires (`tests/unit-tests.js`)** :
  - Ajout de la Suite 8 vérifiant le verrouillage par défaut des secrets MJ (`isGmSecretsUnlocked`), le marquage `gmOnly` et l'exclusion des 12 clans publics vs 95 écoles complètes.

---

## [1.15.2] — 2026-11-17

### 🐛 Corrigé
- **Invalideur de Cache Navigateur & Service Worker (`createcharacter.html`, `sw.js`)** :
  - Incrémentation des paramètres de version (`css/main.css?v=10`, `js/pwa.js?v=3`, `js/navbar.js?v=2`, `js/forge-ui.js?v=24`, `js/character-generator.js?v=21`) afin de forcer le chargement immédiat du correctif d'accès aux Kihos des moines et de la barre d'étapes sans attendre l'expiration du cache HTTP.
  - Revalidation systématique (`cache: 'no-cache'`) dans `sw.js` pour les ressources applicatives (`/js/`, `.css`, `.html`).

---

## [1.15.1] — 2026-11-17

### 🐛 Corrigé & Ajusté
- **Ergonomie & Barres de Défilement de la Forge (`createcharacter.html`, `css/main.css`)** :
  - Passage de la barre d'étapes `#forge-stepper-bar` en `flex-wrap` compact afin de supprimer la barre de défilement horizontale disgracieuse et la troncature du bouton « Tout voir ».
  - Intégration de barres de défilement fines et stylisées aux couleurs *Laque & Or* (et *Parchemin* en mode clair).
- **Accès & Filtrage des Kihos pour Tous les Moines dans la Forge (`js/character-generator.js`, `js/forge-ui.js`, `createcharacter.html`)** :
  - Correction de `getCharacterArchetypePermissions` pour que les moines tatoués (*Ordre Tatoué Togashi*) conservent l'accès aux **Kihos** en plus des **Tatouages Togashi** (règle L5R 4e p. 266, coût 1,5× XP arrondi au supérieur), au même titre que les moines de la Confrérie de Shinsei (`1×` XP) et les Henshin Asako (`1,5×` XP).
  - Permet aux moines de filtrer leurs Kihos par Anneau (`Air`, `Terre`, `Eau`, `Feu`, `Vide`) et Maîtrises `6`, `7`, `8` directement dans le panneau 5A, étendu sur toute la largeur (`col-span-full`) lorsque les Katas sont masqués, avec lien direct vers `kihos.html#<id>`.
- **Tests Unitaires (`tests/unit-tests.js`)** :
  - Vérification de l'accès simultané `Tatouages + Kihos` pour `Ordre Tatoué Togashi` dans `getCharacterArchetypePermissions`.

---

## [1.15.0] — 2026-11-17

### ✨ Ajouté & Refondu
- **Nouvelle Page d'Accueil Ergonomique (`index.html`)** :
  - Refonte du portail d'accueil avec bandeau de statistiques d'accès rapide (10 Actes, 95 Écoles, 308 Sorts, 64 Kihos, 24 Tatouages, Paravent MJ), hiérarchie claire des actions principales et grille unifiée de 6 cartes outils intégrant deux barres de recherche express distinctes pour les **Sorts** et les **Kihos**.
- **Séparation des Kihos et des Sorts (`kihos.html`, `js/kihos.js`, `grimoire.html`, `js/grimoire.js`, `js/navbar.js`, `createcharacter.html`, `sw.js`)** :
  - Création d'une page dédiée **`kihos.html`** et de son moteur **`js/kihos.js`** regroupant les 64 Kihos officiels avec filtres par Anneau, Catégorie (*Interne*, *Martial*, *Kharmique*, *Mystique*, *Atemi uniquement*) et Maîtrise (1 à 8), ainsi que le mémento officiel (*Livre de Base* pp. 231, 261–262 & 266).
  - Recentration de `grimoire.html` exclusivement sur les 308 sorts élémentaires, universels et de Mahō (avec redirection automatique de `grimoire.html?el=kiho` vers `kihos.html` pour préserver les anciens liens).
  - Mise à jour des menus bureau et mobile (`js/navbar.js`) et du pré-cache hors-ligne PWA (`sw.js`).
- **Identité & Protection (« Campagne de la Chronique de Rokugan »)** :
  - Remplacement homogène des mentions « Campagne MJ David » / « MJ David » dans les titres, bandeaux, menus et pieds de page par **« Campagne de la Chronique de Rokugan »** (en préservant les URLs externes d'archive).
  - Ajout du fichier **`LICENSE`** (*Tous droits réservés* sur le code, les récits et les illustrations de campagne) et application d'un **filigrane visuel & métadonnée EXIF** (`Les Chroniques de Rokugan • © Campagne L5R`) sur les 33 illustrations `assets/images/scenarios/*.jpg`.
- **Tests Unitaires (`tests/unit-tests.js`, `tests/unit-tests.html`)** :
  - Ajout de la Suite 7 validant le filtrage exact de `js/kihos.js` (64 Kihos par Anneau, Type, Maîtrise et *Atemi*).

---

## [1.14.0] — 2026-11-17

### ✨ Ajouté, Complété & Corrigé (Audit Intégral L5R 4ᵉ Édition)
- **Révision littérale de l'ensemble des règles et catalogues contre les livres officiels L5R 4e Édition (*Core Rulebook*, *Enemies of the Empire*, *Emerald Empire*, *The Great Clans*, *Book of Air/Earth/Fire*, *Imperial Histories 1 & 2*, *Secrets of the Empire*)** — suppression des entrées inventées ou issues de la 3ᵉ édition et alignement mot pour mot des valeurs, prérequis, coûts, durées, portées, zones et Augmentations :
- **Grimoire, Sorts, Kihos & Mahō (`grimoire.html`, `js/grimoire.js`, `data/sorts/*.js`)** :
  - Mise à jour complète de la base modulaire (372 entrées au total, sans doublon) : 5 Sorts Universels (`sorts-universels.js` dont *Commandement* et *Transmutation*), 68 Sorts d'Air (`sorts-air.js`), 58 Sorts de Terre (`sorts-terre.js` avec ajout de *Âme de Pierre*, *Purifier la Souillure*, *Lien Majeur* et *Vague de Terre*), 59 Sorts de Feu (`sorts-feu.js` avec *Protection du Tonnerre*), 41 Sorts d'Eau (`sorts-eau.js`), 31 Sorts du Vide (`sorts-vide.js` avec texte exact de *Faux Murmures* sans augmentations), 64 Kihos (`sorts-kiho.js` de Maîtrise 1 à 8 dont *Marque sur l'Âme*, *Brise-Os*, *Toucher de la Mort*, *Bannir Toutes les Ombres*) et 46 sortilèges de Mahō (`sorts-maho.js` avec coût de sang `2 × Maîtrise`, Souillure exacte et badge `MAHŌ (ÉLÉMENT)` dans `js/grimoire.js`).
  - Ajout des options `Rang 7` et `Rang 8` dans `#rank-select` et mise à jour des règles officielles d'incantation, Kihos et Mahō dans `grimoire.html`.
- **Katas Martiaux & Tatouages Togashi (`data/katas-data.js`, `data/tatouages-data.js`, `tatouages.html`, `js/forge-ui.js`)** :
  - Réécriture de `KATAS_DATA` avec les 40 Katas officiels 4e édition (dont le kata bi-élémentaire `"Air / Feu"` et gestion `Math.max` des anneaux multiples dans `getRingValueForElement`), et purge des entrées apocryphes.
  - Réécriture de `TATOUAGES_DATA` avec les 24 Tatouages officiels (*Livre de Base* dont *Araignée*, *Dragon* avec cône de feu, et suppléments *Nuage*, *Murmure*, *Ours*, *Volcan*), intégration de la règle officielle *Tatouages Fusionnés* (`tatouages.html`) et correction du quota dans `getTattooAllowedQuota` (`2` aux Rangs 1–2, `4` aux Rangs 3–4, `6` au Rang 5).
- **Forge de Personnage, Clans, Compétences, Équipement, Avantages & Export (`createcharacter.html`, `js/character-generator.js`, `js/forge-ui.js`, `js/export-carnet.js`, `data/{clans,competences,equipement,avantages-desavantages}-data.js`, `clans/*.html`, `index.html`)** :
  - Audit complet des 8 pages de Grands Clans (`clans/*.html`), des familles, écoles, techniques Rangs 1–5 (`clans-data.js`), des compétences et paliers Rangs 3/5/7 (`competences-data.js`), de l'équipement (`equipement-data.js`) et des avantages/désavantages (`avantages-desavantages-data.js`, ex. *Nom Gaijin*, *Téméraire*).
  - Correction des mémentos officiels dans `createcharacter.html` (Exécution de Kata en *Action Simple* / abandon en *Action Gratuite*, quota exact des Tatouages 2/2/4/4/6, règles d'Affinité/Déficience sur le *Rang d'École effectif*, règles Kihos Confrérie/hors-Confrérie/Shugenja) et ciblage exact des 3 Universels de départ (`univ-sense`, `univ-commune`, `univ-summon`) dans `addUniversalSpells`.
- **Écran du MJ & Aides de Jeu (`ecran-mj.html`, `js/gm-screen.js`, `data/gm-rules-data.js`, `aides/*.html`)** :
  - Alignement complet des fiches du Paravent, postures, duels Iaijutsu, Table 2.3 d'Honneur, Doigts de Jade, Ordre Céleste et protocoles d'étiquette.
- **Tests Unitaires & Cohérence (`tests/unit-tests.js`, `tests/unit-tests.html`, `README.md`, `sw.js`)** :
  - Ajout de la Suite 6 vérifiant les effectifs exacts et l'absence de doublons de tous les catalogues (`SORTS_DATA`, `KATAS_DATA`, `TATOUAGES_DATA`, `L5R_DATA`), correction de la documentation dans `README.md` (plafond de 10 XP de Désavantages, quota des Tatouages) et mise à jour du Service Worker (`v1.14.0`).

---

## [1.13.0] — 2026-11-17

### ✨ Ajouté & Complété
- **Intégralité des Illustrations de Scènes (30/30 — Actes 1 à 10)** (`assets/images/scenarios/`) :
  - Génération et intégration des 6 dernières scènes manquantes (`1376×768`) :
    - **Acte 8 (*Le crépuscule de l'honneur*)** : `Crepuscule-1.jpg`, `Crepuscule-2.jpg`, `Crepuscule-3.jpg` (complet 3/3).
    - **Acte 9 (*« Ce qui ne meurt pas »*)** : `CeQuiNeMeurtPas-3.jpg` (complet 3/3).
    - **Acte 10 (*La tombe de Iuchiban*)** : `TombeIuchiban-2.jpg`, `TombeIuchiban-3.jpg` (complet 3/3).
- **Couvertures Principales en Style Dessin Japonais (Actes 1, 3, 5) & Support Catalogue** (`assets/images/scenarios/cover-*.jpg`, `data/scenarios-data.js`, `js/campagne-studio.js`, `css/main.css`, `campagne/scenario-1.html`, `campagne/scenario-3.html`, `campagne/scenario-5.html`) :
  - Génération des 3 premières couvertures au trait d'encre *sumi-e* et lavis d'aquarelle *nihonga* (`cover-1.jpg`, `cover-3.jpg`, `cover-5.jpg`), affichées en bannière d'en-tête `.scenario-cover` sur les pages de scénarios et en couverture des cartes sur le portail de campagne (`campagne.html`).
  - Prise en charge de la métadonnée `cover` / `l5r-scenario-cover` dans `data/scenarios-data.js` et `js/campagne-studio.js` pour étendre les couvertures japonaises aux Actes 2, 4 et 6 à 10 lors du prochain lot.

---

## [1.12.0] — 2026-11-17

### ✨ Ajouté & Amélioré
- **12 Nouvelles Illustrations de Scénarios (`assets/images/scenarios/`)** :
  - Génération et intégration de 12 scènes widescreen (`1376×768`) pour illustrer les actes avancés de la campagne :
    - **Acte 5 (*Entre le ciel et l'enfer*)** : `CielEnfer-1.jpg`, `CielEnfer-2.jpg`, `CielEnfer-3.jpg` (complet 3/3).
    - **Acte 6 (*Le mariage d'Okado Hiruma*)** : `MariageCrabe-1.jpg`, `MariageCrabe-2.jpg`, `MariageCrabe-3.jpg` (complet 3/3).
    - **Acte 7 (*Meurtre à Ryoko Owari*)** : `RyokoOwari-1.jpg`, `RyokoOwari-2.jpg`, `RyokoOwari-3.jpg` (complet 3/3).
    - **Acte 9 (*« Ce qui ne meurt pas »*)** : `CeQuiNeMeurtPas-1.jpg`, `CeQuiNeMeurtPas-2.jpg` (2/3).
    - **Acte 10 (*La tombe de Iuchiban*)** : `TombeIuchiban-1.jpg` (1/3).
- **Fiabilisation du Lecteur Audio Narratif sur Tous les Scénarios (`js/narrator.js`, `sw.js`)** :
  - Découpage automatique des longs paragraphes en phrases courtes (`splitIntoSpeechChunks`, ≤ 220 car.) afin d'éviter la coupure silencieuse de la synthèse vocale après ~15 secondes.
  - Unification du mode multi-versions (Actes 2 et 3) sur le moteur paragraphe par paragraphe avec surbrillance active (`.reading-active`), suivi visuel et défilement automatique lors du changement d'onglet ou de pause/reprise.
  - Mémorisation de la voix française et de la vitesse de lecture dans `localStorage`, prise en compte immédiate du changement de vitesse, réinitialisation exacte du libellé « Écouter le Récit » après arrêt et extinction propre à la fermeture de l'onglet (`pagehide`).

---

## [1.11.4] — 2026-11-16

### ✨ Amélioré
- **Unification du Logo « Les Chroniques de Rokugan » sur le Favicon (`js/navbar.js`, `index.html`, `sw.js`)** :
  - Remplacement de l'ancien badge carré `favicon.svg` dans la barre de navigation globale et du sceau `竜` du pied de page d'accueil par le médaillon officiel `assets/images/favicon_cinq_anneaux.png`, unifiant ainsi l'identité visuelle entre l'onglet navigateur, le portail, la navigation, la fiche PDF et l'icône d'application mobile.

---

## [1.11.3] — 2026-11-16

### ✨ Amélioré
- **Sceau Officiel des 5 Anneaux & Palette Inspirée du Favicon sur la Fiche PDF (`css/main.css`, `js/forge-ui.js`, `js/character-generator.js`, `sw.js`, `createcharacter.html`)** :
  - **Véritable sceau du site dans l'en-tête** : remplacement du schéma SVG générique par l'emblème officiel des Cinq Anneaux (`assets/images/favicon_cinq_anneaux.png`).
  - **Anneaux peints aux couleurs du favicon & chiffres centrés** : transformation des pastilles pleines `.l5r-ring-dot` en véritables anneaux cerclés à liseré doré avec centrage vertical exact par `line-height: 23px` (Terre bronze-ocre `#8c5a1b`, Air turquoise clair `#2b8c7f`, Eau bleu saphir `#1b5299`, Feu vermillon `#c23220`, Vide pourpre améthyste `#5d2b8a`), harmonisés avec les emplacements de sorts de Shugenja et les cartouches d'armes.

---

## [1.11.2] — 2026-11-16

### 🐛 Corrigé
- **Alignement & Netteté de l'Export PDF + Couleurs Élémentaires (`css/main.css`, `js/forge-ui.js`, `js/character-generator.js`, `sw.js`, `createcharacter.html`)** :
  - **Couleurs des 5 Anneaux & Éléments harmonisées** : **Terre** en marron (`#6b4423`), **Eau** en bleu (`#1d5fa7`), **Feu** en rouge feu (`#c0392b`), **Air** en bleu clair (`#3898c8`) et **Vide** en violet (`#6d28d9`), appliquées sur les 5 cartes d'Anneaux, le sceau d'en-tête SVG, les emplacements de sorts de Shugenja et les badges d'éléments.
  - Suppression des coupures de lettres sur *Clan*, *Famille*, *École* et détails d'armes (retrait de `truncate` et `items-baseline` remplacés par `.l5r-header-row` / `.l5r-header-row-main` avec interligne `1.35` et marge inférieure confortable).
  - Correction du chevauchement entre les libellés *Honneur / Gloire / Statut / Souillure* et leurs réglettes de cases à cocher dans `Vertus & Renommée` (remplacement de `flex-col justify-around` par `.l5r-virtue-list`, `.l5r-virtue-header`, `.l5r-virtue-track` et pile typographique `Georgia, 'Noto Serif JP', serif`).
  - Ajustement des marges/alignements de tableaux (`.l5r-table`), pastilles de techniques (`ACTIF`, `MAÎTRISÉ`, `R2`–`R5`), badges Page 2 et passage du Service Worker `sw.js` en stratégie *Network-First* pour les fichiers `.css`/`.js` afin d'éviter toute désynchronisation de style après mise à jour.

---

## [1.11.1] — 2026-11-16

### ✨ Ajouté & Amélioré
- **Proposition Automatique d'Installation PWA sur Tout le Site (`js/pwa.js`, `css/main.css`, `createcharacter.html`, `sw.js`)** :
  - Ajout d'une bannière d'invitation intelligente `#pwa-smart-install-banner` sur toutes les pages du site dès qu'un visiteur arrive sur téléphone (Android / iOS) ou navigateur compatible `beforeinstallprompt` (tant que l'application n'est pas déjà installée).
  - Positionnement adaptatif : flotte proprement au-dessus du dock mobile (`#mobile-app-dock`) dans `createcharacter.html`, avec bouton **`📲 Installer`** en 1 toucher (popup système Android ou guide iOS Safari) et bouton **`Plus tard`** mémorisé 7 jours dans `localStorage`.

---

## [1.11.0] — 2026-11-16

### ✨ Ajouté & Amélioré
- **Application Mobile PWA Hors-Ligne (Android & iOS) & Expérience Tactile Forge L5R (`manifest.webmanifest`, `sw.js`, `js/pwa.js`, `assets/icons/`, `createcharacter.html`, `css/main.css`, `js/forge-ui.js`)** :
  - **Installation directe sur téléphone (`📲 Installer l'App`)** : manifeste complet `manifest.webmanifest` avec icônes dédiées (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`), raccourcis d'écran d'accueil (*Forge PJ*, *Dojo*, *Grimoire*, *Écran MJ*), invite native Android (`beforeinstallprompt`) et guide visuel iOS Safari (*Partager → Sur l'écran d'accueil*).
  - **Service Worker 100 % Hors-Ligne (`sw.js`)** : pré-cache des pages clés, scripts, bases de données L5R 4e (`data/*.js`), icônes et ressources CDN visitées afin de pouvoir créer un samouraï, consulter ses sorts, lancer les dés Roll & Keep et sauvegarder dans le Dojo même sans réseau.
  - **Interface Mobile App Native sur `createcharacter.html` (`< 768px`)** :
    - **Dock de navigation fixe en bas d'écran (`#mobile-app-dock`)** avec zones tactiles confortables et support des encoches (`env(safe-area-inset-bottom)`) : *⛩️ Forge (étape x/6)*, *🏯 Dojo (compteur)*, *🎲 Dés XgY*, *📄 Fiche PDF*, et menu *⋯ Plus* ouvrant un tiroir mobile (`#mobile-more-sheet` : PDF A4, Carnet de Rokugan, Partage lien, JSON, Installation, Vue complète, Reset).
    - **En-tête d'étape collant avec budget XP en direct** (`#mobile-xp-pill`) et centrage automatique de la pilule active, zones de saisie `16px` bloquant le zoom involontaire sur iPhone/iPad Safari, et boutons `-` / `+` élargis (`min-height: 38px`).
    - **Aperçu Fiche Officielle A4 adapté au téléphone** : mise à l'échelle proportionnelle automatique (`--l5r-mobile-sheet-zoom` via `syncMobileSheetZoom()`) sur écran étroit tout en restaurant la pleine résolution `820px` lors du téléchargement PDF (`📥 Enregistrer PDF (fidèle)`).

---

## [1.10.1] — 2026-11-16

### 🐛 Corrigé & Amélioré
- **Export PDF Couleur Fidèle 1:1 & Correction de l'Impression A4 (`createcharacter.html`, `css/main.css`, `js/forge-ui.js`, `js/character-generator.js`)** :
  - **Enregistrement PDF direct identique à l'aperçu (`📥 Enregistrer PDF (fidèle)`)** : capture haute résolution page par page (Page 1, Page 2, Page 3) via `html2canvas` + `jsPDF` pour télécharger directement `<Nom>_Fiche_L5R4e.pdf` en conservant **100 % du design Washi, des bandeaux vert-sumi/bordeaux, des anneaux colorés, des grilles et de la mise en page** sans dépendre des options de la boîte d'impression navigateur.
  - **Correction majeure de `@media print`** : ajout de `no-print` sur `<main>` dans `createcharacter.html` (empêchant le formulaire sombre d'édition de s'imprimer avant la fiche officielle), suppression des bascules `md:grid-cols-2` dans `#print-sheet` au profit de `grid-cols-2` fixe, et cadrage `@media print` sur `#print-sheet` à `width: 820px` avec `zoom: 0.88` et `print-color-adjust: exact` pour une impression papier identique à l'aperçu écran.
  - **Résolution normalisée des Traits de compétences (`resolveCatalogSkillMeta()`)** : correspondance normalisée ignorant les précisions entre parenthèses et les spécialités `Connaissance : ...` dans la Forge et sur la fiche PDF/Imprimable (ex. `Calligraphie (Chiffre)` et `Connaissance : Outremonde` → `Intell.`, `Enquête` → `Perc.` au lieu de `Agilité` par défaut).

---

## [1.10.0] — 2026-11-16

### ✨ Ajouté & Amélioré
- **Feuille de Personnage Officielle Couleur A4 & Aperçu Interactif PJ (`css/main.css`, `createcharacter.html`, `js/forge-ui.js`, `js/character-generator.js`)** :
  - **Esthétique officielle *L5R 4e Édition*** (inspirée de `L5R(4e) Character Sheet Final.pdf`) : papier parchemin Washi (`#faf6ea` / `#f4eddc`), bandeaux de sections vert-sumi foncé à liseré doré (`.l5r-bar`), **Cinq Anneaux colorés** (*Terre* vert jade, *Air* indigo, *Eau* bleu saphir, *Feu* rouge vermillon, *Vide* charbon/or avec 10 pastilles de Points de Vide), et réglettes à 10 rangs pour *Honneur*, *Gloire*, *Statut* et *Souillure de l'Outremonde*.
  - **Aperçu Pleine Page directement consultable par les PJ (`📄 Fiche / PDF`)** : ouverture d'un lecteur A4 structuré sur 3 pages nettes avant impression (`openCharacterSheetPreview()`), avec case à cocher pour inclure ou exclure la Page 3 (*Récit & 20 Questions*), fermeture par bouton ou touche `Échap`, et bouton d'impression / sauvegarde PDF avec `print-color-adjust: exact`.
  - **Architecture structurée sur 3 pages A4** :
    - *Page 1* : Identité & Lignée + emblème SVG des Cinq Anneaux, 5 Anneaux & 8 Traits, Vertus/Renommée, **Compétences & Maîtrises** (résolution exacte du Trait associé de chaque compétence au lieu d'Agilité par défaut + lignes d'écriture vierges), **Initiative / ND d'Armure / Seuils de Blessures / Récupération** et **Arsenal complet** (Arme 1, Arme 2 avec calculs complets via `computeWeaponCombatMetrics()`, et tableau Flèches/Notes).
    - *Page 2* : Rappel identité & Bourse (*Koku / Bu / Zeni*), *Avantages* & *Désavantages* détaillés, *Techniques d'École* avec pastilles d'état (`ACTIF`, `MAÎTRISÉ`) + Seconde École, *Équipement*, et **Arts Martiaux & Mystiques** (emplacements de sorts colorés Air/Terre/Feu/Eau/Vide pour Shugenja, fiches de Sorts/Kihos/Katas avec badges élémentaires et Tatouages Togashi).
    - *Page 3* : *Chronique du Samouraï & Les Vingt Questions de Rokugan* sur deux colonnes lisibles.

---

## [1.9.1] — 2026-11-15

### 🛡️ Corrigé & Renforcé
- **Vérifications & Règles d'Archétypes L5R 4ᵉ Édition dans la Forge (`js/character-generator.js`, `js/forge-ui.js`, `createcharacter.html`)** :
  - **Compatibilité stricte de l'avantage *Écoles Multiples* (L5R 4e, p. 150)** :
    - Interdiction de combiner une école de **Bushi / Shinobi** avec une école de **Shugenja** (et réciproquement), ainsi que de choisir sa propre école principale comme école secondaire.
    - Filtrage dynamique de la liste déroulante d'école secondaire (masquage automatique des écoles incompatibles avec bandeau d'explication de règle), sélection automatique d'une école compatible lors de l'ajout et réajustement automatique si l'école principale change après coup.
    - Maintien de toutes les écoles dans *Études dans une Autre École* (remplacement de l'école de départ à la création).
  - **Filtrage & Verrouillage de l'Atelier 5 (*Voies Martiales & Mystiques*) selon les droits réels de l'archétype** :
    - **Bushi / Shinobi** : affichage strict des **Katas** uniquement (masquage complet du panneau Sorts/Kihos, de la barre d'emplacements Shugenja et des onglets non autorisés ; un Bushi ne voit plus ni Sorts ni Kihos, sauf *Écoles Multiples* vers *Moine*).
    - **Shugenja** : affichage strict des **Sorts & Kihos** et des emplacements quotidiens (masquage des Katas).
    - **Moine (hors Togashi)** : verrouillage du catalogue et des filtres sur les **Kihos** uniquement (masquage des sorts élémentaires, du bouton `+ 3 Universels` et des emplacements Shugenja, sauf *Écoles Multiples* vers *Shugenja*).
    - **Ise Zumi (Togashi)** : affichage des **Tatouages Mystiques** (et uniquement des arts autorisés si multiclassé).
    - **Courtisan / Magistrat** : suppression du bouton de contournement libre au profit d'un accès direct à l'Étape 4 (*Écoles Multiples*) ; déblocage automatique des Katas ou des Sorts/Kihos dès qu'une école secondaire compatible est sélectionnée.
    - **Purge & garde-fous automatiques** : suppression automatique avec notification toast des sorts, kihos, katas ou tatouages devenus incompatibles lors d'un changement d'école ou d'avantage, et blocage des ajouts / bascules d'onglets non autorisés.
- **Tests unitaires (`tests/unit-tests.js`)** : Ajout de tests couvrant `getSchoolArchetype()`, `isSchoolCompatibleForMultiple()` et `getCharacterArchetypePermissions()`.

---

## [1.9.0] — 2026-11-15

### ✨ Ajouté
- **Refonte Ergonomique Complète de la Forge de Personnage (`createcharacter.html`, `js/forge-ui.js`, `js/character-generator.js`, `css/main.css`)** :
  - **Navigation Studio par Ateliers & Mode « Vue Complète »** : Découpage en **6 ateliers guidés** (*1. Identité*, *2. Anneaux & Vitalité*, *3. Compétences*, *4. Avantages & Failles*, *5. Arts & Voies*, *6. Arsenal & Récit*) avec badges d'état en temps réel, boutons *Étape précédente / suivante* en pied d'atelier, raccourcis clavier `Alt+1..6` et bascule instantanée vers **`🧭 Tout voir`** (`Alt+0`).
  - **Cockpit Commandement enrichi & Tiroir Dojo repliable** : Barre de progression XP en direct (`xp-progress-bar`) avec ventilation par poste (`Traits • Compétences • Avantages • Arts`), indicateur d'état du budget, boutons d'action regroupés (`💾 Dojo`, `📖 Carnet`, `🖨️ PDF`, `🔗 Lien`) et **tiroir Dojo repliable** (`#dojo-drawer-section`) pour libérer l'espace vertical dès l'ouverture.
  - **Anneaux + Combat & Vitalité réunis (Atelier 2)** : Indication du **coût XP du rang suivant** sur chaque Trait et Anneau du Vide (`+1:12 XP` / `18 XP`, tenant compte de *Bénédiction Élémentaire* et *Illuminé*), associée directement aux statistiques de combat et aux 8 seuils de blessures.
  - **Compétences interactives (Atelier 3)** : Bandeau d'alerte dédié lorsque des **choix gratuits d'école (Rang 1)** restent à sélectionner, filtres rapides par catégorie (*Bugei*, *Noble/Haute*, *Marchande*, *Dégradante*) dans le menu déroulant, affichage du coût `+1 rang` et bouton **`🎲 XgY`** cliquable sur chaque compétence pour lancer son jet directement.
  - **Recherche & Filtres rapides pour Avantages, Désavantages, Sorts, Kihos, Katas & Tatouages** : Champs de recherche instantanée sans accent et pastilles de catégorie (dont *★ Réductions/Bonus Clan*) préservant les cartes d'aperçu officiel 4e éd. et jauge visuelle `/ 15 XP` sur les Désavantages.
  - **Atelier Équipement & Vingt Questions revisités (Atelier 6)** : Bandeau récapitulatif en temps réel des caractéristiques d'armure et d'armes équipées, **4 chapitres accordéon** sur les *Vingt Questions de Rokugan* avec compteur (`X / 20`) et actions *Tout vider* / *Restaurer exemple* / *Déplier-Replier*.
  - **Plateau Roll & Keep & Notifications Toast** : Ajout des **Augmentations** (`+5 ND`), d'un **bonus fixe** et de l'historique des 5 derniers jets dans `#dice-roller-drawer`, plus notifications toast non bloquantes (`#forge-toast-container`).

---

## [1.8.2] — 2026-11-15

### 🐛 Corrigé
- **Conformité des Avantages & Désavantages (`data/avantages-desavantages-data.js`)** d'après le *Livre des Règles L5R 4e* (pp. 146–162) :
  - Correction de **Grand (`Large`)** (suppression du bonus erroné `+1 PV/palier (+8 PV)`, dégâts `+1g0` sur grandes armes de mêlée), **Guérison Accélérée (`Quick Healer`)** (`Constitution +2` pour la récupération de Blessures, sans prérequis), **Vif (`Quick`)** (`6 pts`, `5 pts` Ninja, bonus de Réflexes en Étape des Réactions après un round sans agir en premier), **Sang d'Osano-Wo** (`Spirituel`, immunité climatique naturelle et réduction de `1g1` des dégâts de sorts élémentaires naturels), **Héritage Ancestral** (`+1g1` hors combat), et clarification de **Mains de Pierre (`Hands of Stone`)** (`+0g1` cumulable aux dégâts à mains nues).
  - Correction de **Cécité Totale (`Blind`)** (`-3g3` distance, `-1g1` mêlée, ND base `Réflexes + 5`, Eau `-2`, Athlétisme ND 20), **Hanté par un Ancêtre (`Haunted`)** (`-1g1` imposé 1 fois/session en cas de disgrâce), **Malédiction des Sept Fortunes — Bishamon** (`Force -1 rang` pour les dégâts d'armes), **Échec du Bushidō — Courage**, **Épilepsie** (`Volonté ND 10/min`), et suppression d'une clé `id` en double sur **Ascète**.
  - Ajout des entrées officielles manquantes du Livre de Base : **Tacticien Émérite**, **Langues**, **Lire sur les Lèvres**, **Bénédiction de Daikoku**, **Bénédiction d'Ebisu**, **Serviteur**, **Amour Perdu**, **Malédiction de Seigneur Lune**, et complétion des listes *Touché par / Maudit par un Royaume Spirituel* et *Mauvaise Fortune*.
- **Conformité des Sorts d'Eau (`data/sorts/sorts-eau.js`)** d'après le *Livre des Règles L5R 4e* (pp. 187–193) :
  - Refonte de **Reflux de Force (`Ebbing Strength`, p. 187)** (transfert d'un Trait Physique du lanceur vers la cible jusqu'au Rang d'École, au lieu d'une pénalité de `-1g1` aux dégâts) et de **Les Reflets de P'an Ku (`Reflections of P'an Ku`, p. 187)** (divination instantanée d'un objet / parchemin, sans surface réfléchissante).
  - Précision de **Renversement de Fortune (`Reversal of Fortunes`, p. 188)** (« conserver le résultat de son choix » conforme à l'édition 4e : relance d'un jet complet par round), **La Bénédiction d'Inari** (`Rang d'École + 1` personnes, ND doublé dans l'Outremonde), **Vitesse de la Cascade**, **La Puissance de l'Océan** (contrecoup d'épuisement sur la moitié de la durée), **Éveil de l'Eau** (*Terrain Modéré* sur 6 m), **Domaine de Suitengu**, **Symbole d'Eau**, **Proche de la Glace**, **Vapeurs Régénératrices** et **L'Étreinte de Suitengu**.
  - Ajout des sorts officiels manquants du Livre de Base : **Esprit de l'Eau (`Spirit of the Water`, Maîtrise 1, p. 188)** et **Frappe du Tsunami (`Strike of the Tsunami`, Maîtrise 3, p. 190)**.

---

## [1.8.1] — 2026-11-15

### ✨ Ajouté
- **Mémento Officiel de la section 5 de la Forge (`createcharacter.html`)** : Ajout des règles d'utilisation des **Tatouages Togashi (Ise Zumi)** (acquisition, activation en Action Libre à l'air libre, durée `2 × Rang d'École` rounds, limite d'un tatouage actif ou fusion pour 1 point de Vide, lien vers `tatouages.html`) dans le mémento officiel (Ticket #29).

---

## [1.8.0] — 2026-11-15

### ✨ Ajouté
- **Refonte Ergonomique Complète de l'Écran du MJ (`ecran-mj.html`, `js/gm-screen.js`, `data/gm-rules-data.js`)** :
  - **Cockpit 2 Colonnes & Dock Permanent MJ** : Lanceur Roll & Keep intégré (`XgY` avec explosion des 10, spécialisation, règle des 10 dés auto, presets rapides, malus de blessures et historique des 8 derniers jets), Calculateur Express de ND (+ Augmentations et modificateurs contextuels), Générateur Express de PNJ rokugani et Notes de Scène MJ.
  - **Paravent Universel des Règles (`📜 Paravent Règles`)** : Base structurée `data/gm-rules-data.js` avec recherche instantanée (raccourci clavier `/`) et filtres par catégorie couvrant toutes les règles L5R 4e (Système Roll & Keep / 10 dés / Vide & Augmentations, Chronologie & Actions Complexe/Simple/Gratuite, 5 Postures, Manœuvres & Modificateurs, 6 États préjudiciables, Batailles de Masse, Guérison / Chutes / Poisons / Périls, Magie, Étiquette & Magistrature).
  - **Escarmouche Enrichie** : Bouton `+ Renforts PNJ` sans réinitialisation du combat actif, jets de Toucher/Dégâts cliquables (envoyés au Lanceur MJ avec prise en compte du malus de blessure), calcul automatique du ND effectif (Postures + Défense PJ + états `À terre`, `Étourdi`, `Aveuglé`, `Surpris`) et 6 états cochables.
  - **Arbitre Pas-à-Pas du Duel Iaijutsu & Calculateurs Magie/Peur** : Simulation directe des 3 phases du duel, verdict automatique de Concentration (ordre de frappe, Augmentations gratuites, détection de Frappe Karmique), Table 2.3 complète d'Honneur dans l'onglet Honneur & Gloire, et calculateurs de Sort / Jet de Peur.
  - **Table des PJs Ergonomique** : Mode Compact basculable en 1 clic, bandeau de repères passifs du groupe (Perception max, Intuition max, Honneur moyen, blessés) et jet d'Initiative PJ cliquable.

---

## [1.7.1] — 2026-11-15

### 🔄 Modifié
- **Réactivité JS de la Forge de Personnage (`js/character-generator.js`, `js/forge-ui.js`)** :
  - Indexation en cache (`Map`) des catalogues de compétences, avantages et désavantages pour remplacer les recherches linéaires répétées à chaque recalcul (`updateAll`).
  - Regroupement des insertions DOM de listes (`#sel-add-skill`, `#pc-armor`, `#pc-weapon-1`, `#pc-weapon-2`, `#sel-catalog-adv`, `#sel-catalog-disadv`, sorts, katas, tatouages et sélecteur multi-compétences) via `DocumentFragment`.
  - Remplacement des `setTimeout` de démarrage et du wrapping de `window.updateAll` par des événements DOM dédiés (`l5r-forge-ready`, `l5r-forge-selection-changed`, `l5r-forge-updated`), et rafraîchissement à la demande du catalogue de tatouages Togashi.
  - Filtrage des compétences multi-sélection avec debounce (`80 ms`) et attribut `data-search`, et sauvegarde automatique du brouillon différée (`250 ms` + flush `pagehide`).
- **Grimoire (`js/grimoire.js`) & Tatouages Togashi (`js/tatouages.js`, `tatouages.html`)** :
  - Mise en cache `WeakMap` des métadonnées et textes normalisés des sorts dans le Grimoire et pré-calcul du texte normalisé dans `tatouages.js` (avec échappement HTML via `escapeHtml` et script `data/tatouages-data.js` en `defer`).
  - Debounce des champs de recherche (`120 ms`), insertion des cartes via `DocumentFragment` et marquage `.perf-cv-auto` (`content-visibility: auto`).

---

## [1.7.0] — 2026-11-15

### 🔄 Modifié

- **Ergonomie horizontale pleine largeur de l'Écran du MJ (`ecran-mj.html` & `js/gm-screen.js`)** :
  - Suppression du lanceur de dés latéral pour libérer toute la largeur d'affichage ; remplacement par l'affichage direct des jets à lancer (**Toucher / Dégâts**) et du **malus de blessure actuel** (`+0` à `+20` / `Hors de combat` / `Mort`) pour chaque combattant.
  - **Table des PJs horizontale en 4 colonnes** (`lg:grid-cols-4`) adaptée aux groupes de 4 joueurs (avec jeu de 4 PJs d'exemple).
  - **Tableau horizontal d'Escarmouche (`<table>`)** : colonnes claires (`Ordre`, `Init`, `Combattant`, `Posture & ND`, `Jets Toucher / Dégâts`, `Blessures & Malus aux jets`, `Dégâts rapides`, `États`).
  - **Duel Iaijutsu** : affichage direct des formules de jets (*Évaluation*, *Focus*, *Frappe*) à lancer pour les deux duellistes.

### 🐛 Corrigé

- **Générateur d'Escarmouche (`js/gm-screen.js`)** : extraction et fiabilisation de `buildSkirmishCombatants()` pour générer immédiatement les PJs cochés + `N` PNJs avec initiatives lancées automatiquement, couvert par un nouveau test unitaire dans `tests/unit-tests.js`.

---

## [1.6.0] — 2026-11-15

### ✨ Ajouté

- **Assistant d'Escarmouche (`ecran-mj.html` & `js/gm-screen.js`)** :
  - Sélection par cases à cocher des PJs impliqués dans la scène avec saisie de leur score d'initiative (ou jet `🎲`).
  - Choix du nombre de PNJs (`0` à `20`) et de leur modèle L5R 4e (ou stats personnalisées) : le bouton **« Générer l'Escarmouche »** lance automatiquement les initiatives de tous les PNJs et construit le tableau de combat trié (`#1`, `#2`, `#3`…).
- **Duel Iaijutsu avec Import JSON dédié** :
  - Bouton **« + Importer JSON PJ »** directement dans l'onglet Duel Iaijutsu pour charger le duelliste A, sélecteur de modèles d'adversaire pour le duelliste B et résolution des 4 phases (*Évaluation*, *Focus*, *Frappe*, *Dégâts*).
- **Plateau de Dés Roll & Keep inspiré de la Forge** :
  - Champs dédiés `Lancés g Gardés + Bonus`, options *Explosifs (10)* et *Spécialisation (1)*, 6 raccourcis en 1 clic (`3g2` à `8g4`) et affichage visuel des dés gardés/écartés.

### 🐛 Corrigé

- **Autonomie de l'Écran du MJ (`ecran-mj.html` & `js/gm-screen.js`)** : suppression de la dépendance à `js/character-generator.js` (dont le `bootstrap()` ciblait le DOM de `createcharacter.html`) et intégration d'un moteur Roll & Keep autonome dans `js/gm-screen.js`, rendant les onglets et le lanceur de dés 100 % fonctionnels.

---

## [1.5.0] — 2026-11-15

### ✨ Ajouté

- **Onglets complets de scène MJ (`ecran-mj.html` & `js/gm-screen.js`)** :
  - **Escarmouche — Saisie des Initiatives & Ordre du Combat** : saisie directe du score d'initiative de chaque PJ (ou lancer automatique `🎲`), bouton *Appliquer & Trier l'Ordre*, affichage du rang de passage (`#1`, `#2`, `#3`…) et indication du combattant en cours et du suivant.
  - **Duel Iaijutsu** : assistant des 4 phases L5R 4e (*Évaluation*, *Focus*, *Frappe*, *Dégâts*) avec sélection d'un PJ, compteurs de Focus et journal de duel.
  - **Honneur, Gloire, Statut & Souillure** : ajustement direct (`±0.1`, `±0.5`) des jauges de chaque PJ + barème officiel L5R 4e.
  - **Cour & Rencontre Sociale** : repères rapides d'Étiquette, Courtoisie, Sincérité, Tentation, Intimidation, Statut social et cadeaux.
  - **Magie, Peur & Souillure** : règles de lancement de sorts, Contre-sort, Peur `X` et Souillure de l'Outremonde.
- **Tests unitaires (`tests/unit-tests.js`)** : ajout d'un test sur `formatRollResult()` couvrant le formatage des jets `simulateRollAndKeep`.

### 🐛 Corrigé

- **Lanceur de dés de l'Écran du MJ (`js/gm-screen.js`)** : correction du mapping des résultats de `simulateRollAndKeep()` (`kept` et `dropped` au lieu de `keptRolls`/`droppedRolls`) qui empêchait le lancer de dés de s'afficher, avec affichage des dés explosés (`*`) et message d'erreur si la formule est invalide.

---

## [1.4.0] — 2026-11-15

### ✨ Ajouté

- **Écran du Maître du Jeu (`ecran-mj.html` & `js/gm-screen.js`)** :
  - **Import JSON multi-fichiers des PJs** (glisser-déposer ou sélecteur de fichiers, compatible avec les exports *Carnet de Rokugan* `schemaVersion: 2` / *La Forge* + jeu de 2 PJs d'exemple) avec sauvegarde automatique dans `localStorage` (`l5r_gm_screen_v1`).
  - **Fiches synthétiques de table pour le MJ** : Anneaux, ND d'Armure & Réduction, formule d'Initiative, Honneur/Gloire, pastilles interactives de Points de Vide, rappels (armes, compétences, sorts, avantages/désavantages) et bloc-notes MJ privé par PJ.
  - **Traqueur de Combat & Blessures en direct (PJs + Adversaires)** : calcul automatique des 8 paliers de blessures L5R 4e (`Indemne` → `Mort`) et des malus aux jets (`+3` à `+20`), postures de combat (*Assaut*, *Attaque*, *Défense*, *Esquive*, *Centre*) avec ND effectif en temps réel, états (*À terre*, *Étourdi*, *Aveuglé*, *Enchevêtré*), ordre d'Initiative, gestion des rounds et 8 modèles d'adversaires prédéfinis L5R 4e.
  - **Lanceur de dés Roll & Keep intégré** (avec règle des 10 dés, explosions et spécialisations) et bloc-notes de scène MJ.
- **Navigation (`js/navbar.js`)** : ajout du lien **Écran du MJ** dans le menu *Outils* (bureau et mobile).
- **Tests unitaires (`tests/unit-tests.js`)** : ajout de 3 tests dédiés à `computeL5RWoundState`, `normalizeImportedCharacter` et `sortCombatantsByInit`.

---

## [1.3.3] — 2026-11-15

### ✨ Ajouté

- **Intégration Continue (CI) sur GitHub Actions (`.github/workflows/ci.yml` & `.github/scripts/check-site.js`)** :
  - Exécution automatique des tests unitaires (`node tests/unit-tests.js`) et vérification syntaxique JavaScript (`node --check` sur `js/`, `data/` et `tests/`) à chaque `push` et `pull_request` vers `main`.
  - Vérification automatisée de la cohérence de version (`version.json`, `CHANGELOG.md`, `README.md` et replis statiques `#site-version-label`) ainsi que de l'intégrité des liens et ressources locales dans toutes les pages HTML.

### 🧹 Nettoyé

- Suppression du fichier résiduel `assets/images/scenarios/tes`.
- Synchronisation de tous les replis statiques `#site-version-label` des pages HTML et de `js/campagne-studio.js` sur `v1.3.3`.

### 🐛 Corrigé

- **Règle des 10 dés (`js/character-generator.js`)** : correction de `applyTenDiceRule` lorsque `keepY >= 10` et `rollX > 10` (chaque dé lancé excédentaire au-dessus de `10g10` accorde désormais bien `+2`, ex. `12g10` → `10g10+4` au lieu de `10g10+2`).

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
