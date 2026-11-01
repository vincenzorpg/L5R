🏯 Les Chroniques de Rokugan — L5R 4ᵉ Édition« Dans mon sabre, le vent. Dans mon cœur, le courage. Dans mes yeux, la mort. »Portail numérique interactif et annales de la campagne de jeu de rôle sur table La Légende des Cinq Anneaux (4ᵉ Édition), menée sous la maîtrise du MJ David.Le site propose une suite d'outils d'arbitrage en direct, une forge de samouraïs automatisée, un grimoire complet de sortilèges et le recueil des récits de nos aventures illustrées et narrées vocalement.🌐 Site officiel en ligne : https://vincenzorpg.github.io/L5R/📑 Table des MatièresFonctionnalités Clés1. La Forge de Personnage2. Le Journal de Campagne & Synthèse Vocale3. Le Grimoire des Éléments & Kihos4. L'Encyclopédie des Huit Grands Clans5. Les Mémentos d'Arbitrage TactiqueArborescence du DépôtArchitecture TechniqueInstallation & Utilisation LocaleInteropérabilité & Carnet de RokuganAdministration & Rédaction (CMS)Crédits & Mentions Légales✨ Fonctionnalités Clés1. La Forge de Personnage (createcharacter.html)Un atelier complet de création et de gestion de samouraï respectant fidèlement le Livre de Règles 4e Édition :Calculs Automatisés : Rangs d'Anneaux, Traits (Terre, Eau, Air, Feu, Vide), Réputation (Insight), ND d'Armure, Initiative canonique ([Insight + Réflexes] g Réflexes), Paliers de vitalité et budget d'expérience (XP).Paliers de Maîtrise des Compétences : Déblocage automatique des capacités d'école et des dons de maîtrise (Rangs 3, 5 et 7) pour le Kenjutsu, Iaijutsu, Kyujutsu, etc.Générateur Procédural de Légende : Rédaction d'une biographie en 3 actes et remplissage contextuel du questionnaire des 20 Questions de Rokugan selon le clan, l'école, l'arme et les avantages/désavantages choisis.Plateau de Dés « Roll & Keep » ($X\text{k}Y$) : Lanceur de dés intégré avec explosion automatique des 10, relance des 1 (spécialisations) et tri des dés gardés.Mon Dojo Personnel : Sauvegarde locale dans le navigateur (localStorage) permettant d'enregistrer toute son escouade et de la retrouver automatiquement sur la page d'accueil.Partage Instantané : Génération d'une URL encodée en base64 pour partager sa fiche en un clic.Export Vectoriel A4 : Impression prête à l'emploi sur le modèle de la fiche officielle L5R en deux pages.2. Le Journal de Campagne & Synthèse Vocale (campagne.html)10 Scénarios Officiels : Du tournoi d'initiation (Championnat de Topaze) jusqu'à l'affrontement final (La tombe de Iuchiban).Multi-Points de Vue PJ : Récits croisés rédigés par les joueurs de la table (Tsuruchi Akira, Okado Hiruma, Hida Samui, Isawa Ryumitaka).Lecteur Audio Intégré : Narration vocale française via l'API native SpeechSynthesis, avec réglage du débit et contrôle de lecture sans nécessiter de fichiers audio volumineux.Studio d'Import (campagne-ajouter.html) : Module de glisser-déposer de textes pour forger de nouveaux chapitres HTML formatés.3. Le Grimoire des Éléments & Kihos (grimoire.html)Index Élémentaire : Consultation des prières universelles, des sorts élémentaires (Terre, Eau, Feu, Air, Vide) et des Kihos de la Confrérie de Shinsei.Moteur de Recherche : Filtrage instantané par mot-clé, rang de maîtrise (0 à 6) ou élément avec mise en surbrillance dynamique par ancre URL (#sort-<id>).Sceau de Mahō : Verrouillage de la magie du sang sous mot de passe afin de préserver l'orthodoxie impériale autour de la table.4. L'Encyclopédie des Huit Grands Clans (clans/)Fiches détaillées pour chaque faction de l'Empire :Clan du Crabe (crabe.html) : Hida, Hiruma, Kaiu, Kuni, Yasuki.Clan de la Grue (grue.html) : Doji, Kakita, Daidoji, Asahina.Clan du Dragon (dragon.html) : Mirumoto, Kitsuki, Tamori, Togashi.Clan du Lion (lion.html) : Akodo, Matsu, Ikoma, Kitsu.Clan de la Mante (mante.html) : Yoritomo, Tsuruchi, Moshi.Clan du Phénix (phenix.html) : Isawa, Shiba, Asako, Agasha.Clan du Scorpion (scorpion.html) : Bayushi, Shosuro, Soshi, Yogo.Clan de la Licorne (licorne.html) : Shinjo, Moto, Utaku, Ide, Iuchi.5. Les Mémentos d'Arbitrage Tactique (aides/)Combat & Duels Iaijutsu (combat-memento.html) : Chronologie du round, 5 postures de combat, règles du duel au premier sang ou à mort, manœuvres d'augmentation.Code du Bushido & Honneur (bushido-honneur.html) : Les 7 vertus, barème officiel des gains/pertes (Table 2.3), jet d'Honneur et protection des Doigts de Jade.Étiquette & Coutumes (etiquette-coutumes.html) : L'Ordre Céleste (Kuge, Buke, Heimin, Hinin), port du Daisho, règle des cadeaux en trois temps, cérémonie du thé.📂 Arborescence du Dépôt├── index.html                  # Portail d'accueil, Dojo des héros et vitrine
├── campagne.html               # Hub des 10 scénarios de campagne
├── campagne-ajouter.html       # Studio de téléversement et création de scénarios
├── createcharacter.html        # Forge de personnage, dés XkY et générateur
├── grimoire.html               # Grimoire des sorts, prières et kihos
├── .nojekyll                   # Désactive le moteur Jekyll sur GitHub Pages
├── README.md                   # Documentation du projet
│
├── admin/                      # Administration CMS Git-based
│   ├── index.html              # Interface Sveltia / Decap CMS
│   └── config.yml              # Schémas de données et collections d'articles
│
├── aides/                      # Guides de référence rapide pour la table
│   ├── bushido-honneur.html
│   ├── combat-memento.html
│   └── etiquette-coutumes.html
│
├── clans/                      # Monographies des 8 Grands Clans
│   ├── crabe.html
│   ├── dragon.html
│   ├── grue.html
│   ├── licorne.html
│   ├── lion.html
│   ├── mante.html
│   ├── phenix.html
│   └── scorpion.html
│
├── campagne/                   # Pages dédiées par scénario (audio + texte)
│   ├── scenario-1.html         # Championnat de Topaze (Tsuruchi Akira)
│   ├── scenario-2.html         # Meurtre au Château de Kyoteï (3 versions PJ)
│   ├── scenario-3.html         # Le dernier voyage (Xian & le Kolat)
│   └── ...                     # Scénarios 4 à 10
│
├── assets/images/              # Ressources graphiques et illustrations
│   └── scenarios/              # Visuels cinématiques des récits (Topaze, Kyotei, Voyage...)
│
├── data/                       # Bases de données modulaires en JavaScript
│   ├── clans-data.js           # Familles, écoles, traits et techniques 1 à 5
│   ├── competences-data.js     # 45+ compétences (Bugei, Nobles, Marchandes, Basses)
│   ├── equipement-data.js      # Catalogue d'armes, armures et valeurs de dégâts
│   ├── avantages-desavantages.js # Catalogue officiel des dons physiques, mentaux, sociaux
│   ├── sorts-data.js           # Agrégateur universel des sortilèges
│   └── sorts/                  # Sous-fichiers de sorts par élément (Air, Terre, etc.)
│
└── js/                         # Moteurs applicatifs
    ├── navbar.js               # Barre de navigation responsive avec menu mobile
    ├── character-generator.js  # Moteur de règles L5R 4e, calculs d'XP et seuils
    ├── export-carnet.js        # Moteur d'export JSON conforme Carnet de Rokugan (v2)
    └── grimoire.js             # Moteur de recherche et de filtrage des sorts
🛠️ Architecture TechniqueFramework CSS : Tailwind CSS (chargé via CDN) avec thème sur-mesure (palette Dark Lacquer, bordures dorées, accents élémentaires).Typographie : Cinzel (titrages impériaux) et Noto Serif JP (lecture noble du texte).JavaScript : Vanilla JS pur (ES6+), sans dépendance lourde, garantissant un temps de chargement immédiat et une compatibilité hors-ligne maximale.Persistance des données : localStorage pour le Dojo local et encodage d'URL pour le partage de fiches.Audio : API native du navigateur window.speechSynthesis.🚀 Installation & Utilisation LocaleAucun gestionnaire de paquets complexe (npm / yarn) n'est requis. Le site peut être exécuté directement sur n'importe quelle machine :Option 1 : Visual Studio Code (Recommandé)Clonez le dépôt :git clone https://github.com/vincenzorpg/L5R.git
Ouvrez le dossier dans VS Code.Lancez l'extension Live Server sur index.html.Option 2 : Serveur Python instantané# Dans le dossier racine du projet
python -m http.server 8000
Puis ouvrez votre navigateur sur http://localhost:8000.🔄 Interopérabilité & Carnet de RokuganLa Forge de Personnage intègre un bouton d'export dédié vers Le Carnet de Rokugan, l'outil compagnon de référence pour L5R 4e Édition :Format produit : Objet JSON unique respectant rigoureusement le standard schemaVersion: 2 (v2.18.0).Correspondance automatique :Clés de traits en anglais (stamina, reflexes, etc.) et Anneaux déduits dynamiquement.Normalisation automatique des noms de compétences (ex : conversion d'« Enquête » vers « Investigation »).Résolution des identifiants d'école canoniques (hida-bushi, kakita-bushi, mirumoto-bushi...).Mapping des armes avec mots-clés normalisés (samourai, grande, deux-mains, arc...) et force d'arc (bowStrength).⚙️ Administration & Rédaction (CMS)Le site intègre une interface d'administration statique accessible sur /admin/ :Moteur : Sveltia CMS / Decap CMS connecté directement au dépôt GitHub via admin/config.yml.Workflow : Les ajouts ou corrections de scénarios rédigés via l'éditeur visuel génèrent automatiquement des commits et déclenchent le déploiement continu sur GitHub Pages.📜 Crédits & Mentions LégalesCampagne : Scénarisée et arbitrée par le MJ David (table active depuis 2015).Chroniqueurs de table : Tsuruchi Akira, Okado Hiruma, Hida Samui, Isawa Ryumitaka, Kakita Sutokhu, Mirumoto Mansouri.Univers & Règles : Legend of the Five Rings (L5R) est une marque déposée d'Alderac Entertainment Group (AEG) et Fantasy Flight Games / Edge Studio. Ce projet est un site amateur à usage récréatif et non commercial.
