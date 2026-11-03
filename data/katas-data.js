/**
 * js/katas-data.js — Catalogue exhaustif des Katas de Rokugan (L5R 4e Édition)
 * Sources officielles : Livre de Base, Les Grands Clans, Livre de la Terre, Livre de l'Eau,
 * Livre de l'Air, Livre du Feu, Livre du Vide, Secrets de l'Empire et Le Sabre & l'Éventail.
 */

(function () {
  const KATAS_DATA = [
    // =========================================================================
    // --- KATAS DE TERRE (EARTH) ---
    // =========================================================================
    {
      id: "kata-terre-frapper-terre",
      name: "Frapper comme la Terre (Striking as Earth)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Tant que ce Kata est actif et que vous adoptez la Posture d'Attaque ou d'Attaque Totale, vous bénéficiez d'une Réduction de dégâts égale à votre valeur d'Anneau de Terre."
    },
    {
      id: "kata-terre-force-crabe",
      name: "La Force du Crabe (Strength of the Crab)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan du Crabe (Hida, Hiruma) & Guerriers Daidoji",
      desc: "Lorsque vous maniez une Arme Lourde ou un Bâton, vous êtes totalement immunisé aux manœuvres de Désarmement et gagnez un bonus de +1g0 à tous vos jets de dégâts."
    },
    {
      id: "kata-terre-montagne-ne-bouge-pas",
      name: "La Montagne ne Bouge Pas (The Mountain Does Not Move)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Vous pouvez ignorer l'ensemble des pénalités imposées par vos Rangs de Blessures jusqu'à concurrence d'une valeur totale égale à votre Anneau de Terre × 2."
    },
    {
      id: "kata-terre-fer-montagnes",
      name: "Le Fer dans les Montagnes (Iron in the Mountains)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Toutes les pénalités de Blessures subies sont réduites d'une valeur fixe égale à votre Rang d'École × 2."
    },
    {
      id: "kata-terre-posture-rocher",
      name: "L'Inébranlable Posture du Rocher (Immovable Stone Posture)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Vous gagnez +3g0 à tous vos jets pour résister aux manœuvres de Renversement (Knockdown) et aux effets de Peur. Votre ND d'Armure augmente de +3 tant que vous ne vous déplacez pas de plus de 1,5 m par round."
    },
    {
      id: "kata-terre-volonte-indomptable",
      name: "Volonté Indomptable (Indomitable Will)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Bushi du Clan du Crabe",
      desc: "Une fois par escarmouche, vous pouvez dépenser 1 point de Vide en Action Gratuite pour annuler immédiatement l'état Assommé (Stunned) ou Étourdi (Dazed)."
    },
    {
      id: "kata-terre-mur-acier",
      name: "Le Mur d'Acier (Wall of Iron)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Hida Bushi, Daidoji & Praticiens d'Armes d'Hast / Lourdes",
      desc: "En posture de Défense ou Défense Totale, les ennemis adjacents subissent un malus de -1g0 à toutes leurs attaques contre vos alliés que vous protégez."
    },
    {
      id: "kata-terre-broyé-debout",
      name: "Broyé mais Debout (Bloodied But Unbowed)",
      element: "Terre",
      mastery: 5,
      cost: 5,
      schools: "Bushi du Clan du Crabe",
      desc: "Lorsque vous atteignez les Rangs de Blessure À Terre (Down) ou Hors de Combat (Out), vous conservez la possibilité d'effectuer une Action Simple par round au lieu d'être neutralisé."
    },
    {
      id: "kata-terre-frappe-avalanche",
      name: "Frappe de l'Avalanche (Strike as the Avalanche)",
      element: "Terre",
      mastery: 5,
      cost: 5,
      schools: "Toute école de Bushi",
      desc: "Vos attaques de mêlée ignorent un montant de Réduction adverse égal au double de votre Anneau de Terre (2 × Terre)."
    },
    {
      id: "kata-terre-force-blaireau",
      name: "La Force du Blaireau (Strength of the Badger)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Ichiro Bushi & Clans Mineurs",
      desc: "Vos attaques à mains nues et en Lutte (Grapple) infligent +1g1 Blessures supplémentaires."
    },
    {
      id: "kata-terre-force-sanglier",
      name: "La Force du Sanglier (Strength of the Boar)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Heichi Bushi & Guerriers de l'Extrême",
      desc: "Vous êtes insensible aux effets de poison non magiques et bénéficiez d'une Réduction de dégâts de 3 contre les créatures de l'Outremonde."
    },

    // =========================================================================
    // --- KATAS D'EAU (WATER) ---
    // =========================================================================
    {
      id: "kata-eau-frapper-eau",
      name: "Frapper comme l'Eau (Striking as Water)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Une fois par round, immédiatement après avoir réussi une attaque de mêlée, vous pouvez effectuer un déplacement de 1,5 mètre en tant qu'Action Gratuite sans désorganiser votre garde."
    },
    {
      id: "kata-eau-force-licorne",
      name: "La Force de la Licorne (Strength of the Unicorn)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan de la Licorne (Shinjo, Moto, Utaku)",
      desc: "En selle sur une monture, celle-ci et vous gagnez +3 mètres à toutes vos Actions de Mouvement et +1g0 à tous vos jets d'attaque de mêlée en charge."
    },
    {
      id: "kata-eau-force-mante",
      name: "La Force de la Mante (Strength of the Mantis)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan de la Mante (Yoritomo, Tsuruchi)",
      desc: "Vous ignorez les pénalités de terrain instable (ponts oscillants, pont de navire par tempête, vase) et gagnez +1g0 aux jets d'attaque avec armes paysannes, petites armes ou arcs."
    },
    {
      id: "kata-eau-maree-incessante",
      name: "La Marée Incessante (Relentless Tide)",
      element: "Eau",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Durant l'Étape des Réactions de n'importe quel round d'escarmouche, vous pouvez échanger votre score d'Initiative avec celui d'un allié volontaire situé à 6 mètres ou moins."
    },
    {
      id: "kata-eau-flux-riviere",
      name: "Le Flux de la Rivière (The Flow of the River)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Lorsque vous combattez en Posture de Défense, vous conservez votre pleine valeur de Mouvement Simple au lieu d'être limité."
    },
    {
      id: "kata-eau-vague-fracassante",
      name: "Vague Fracassante (Crashing Wave)",
      element: "Eau",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Lorsque vous réussissez une manœuvre de Renversement (Knockdown), la cible subit immédiatement un nombre de Blessures égal à votre Anneau d'Eau en plus des effets normaux."
    },
    {
      id: "kata-eau-chevaucher-eclair",
      name: "Chevaucher l'Éclair (Ride the Lightning)",
      element: "Eau",
      mastery: 4,
      cost: 4,
      schools: "Moto Bushi & Shinjo Bushi",
      desc: "Après une attaque de charge montée réussie, votre monture peut immédiatement effectuer une attaque de piétinement en Action Gratuite."
    },
    {
      id: "kata-eau-tonnerre-sabots",
      name: "Le Tonnerre des Sabots (Thunder of Hooves)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Bushi Licorne montés",
      desc: "Tous les adversaires non montés situés à portée de mêlée lors d'un passage en charge subissent un malus de -5 à leur ND d'Armure jusqu'à la fin du round."
    },
    {
      id: "kata-eau-force-singe",
      name: "La Force du Singe (Strength of the Monkey)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Toku Bushi & Clans Mineurs",
      desc: "Vous gagnez +1g0 à tous vos jets d'Athlétisme et d'Escalade, et pouvez vous relever d'un état Renversé sans dépenser d'action."
    },

    // =========================================================================
    // --- KATAS D'AIR (AIR) ---
    // =========================================================================
    {
      id: "kata-air-frapper-vent",
      name: "Frapper comme le Vent (Striking as Wind)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "En Posture de Défense ou Défense Totale, vous ajoutez votre valeur d'Anneau d'Air en bonus numérique direct à votre ND d'Armure."
    },
    {
      id: "kata-air-force-grue",
      name: "La Force de la Grue (Strength of the Crane)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan de la Grue (Kakita, Daidoji)",
      desc: "Lorsque vous maniez un katana ou une lame d'Iaijutsu, vous gagnez +2 permanent à votre Initiative et +2 à votre ND d'Armure contre toutes les attaques de mêlée."
    },
    {
      id: "kata-air-force-scorpion",
      name: "La Force du Scorpion (Strength of the Scorpion)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan du Scorpion (Bayushi)",
      desc: "Lorsque vous déclarez la manœuvre Feinte en combat d'escarmouche, vous bénéficiez d'une Augmentation Gratuite."
    },
    {
      id: "kata-air-oeil-tempete",
      name: "Dans l'Œil de la Tempête (Eye of the Storm)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi & Archers",
      desc: "Vos attaques à distance ou de mêlée réduisent de 5 points les bonus conférés au ND d'Armure de la cible par les couverts ou la Posture de Défense."
    },
    {
      id: "kata-air-danse-feuille",
      name: "La Danse de la Feuille (Dance of the Leaf)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Kakita Bushi & Daidoji",
      desc: "Chaque fois qu'une attaque ennemie rate votre ND d'Armure de 5 points ou plus, vous pouvez effectuer un pas de 1,5 mètre dans la direction de votre choix."
    },
    {
      id: "kata-air-lame-murmurante",
      name: "La Lame Murmurante (Whispering Blade)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Kakita Bushi",
      desc: "Lors d'un duel d'Iaijutsu, vous pouvez déclarer 1 Augmentation pour augmenter votre score d'Initiative lors du premier round d'escarmouche suivant le duel de +5."
    },
    {
      id: "kata-air-menace-voilee",
      name: "Menace Voilée (Veiled Menace)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Bayushi Bushi",
      desc: "Tant que vous êtes en posture d'Attaque, vous pouvez feindre une posture de Défense Totale pour tromper les spectateurs et désorienter l'adversaire."
    },
    {
      id: "kata-air-dard-guepe",
      name: "Style du Dard de Guêpe (Stinging Wasp Style)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Bayushi Bushi & Daidoji",
      desc: "Vos attaques avec des armes de poing ou des dagues (tanto, aiguchi, jitte) bénéficient d'une Augmentation Gratuite pour la manœuvre Attaque Suppléante."
    },
    {
      id: "kata-air-vent-qui-disparait",
      name: "Le Vent qui Disparaît (Disappearing Wind)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Vos jets de Discrétion (Stealth) bénéficient d'un bonus égal à votre Anneau d'Air × 2."
    },
    {
      id: "kata-air-tourbillon-acier",
      name: "Tourbillon d'Acier (Whirling Steel)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Lorsque vous affrontez trois adversaires ou plus simultanément au corps-à-corps, votre ND d'Armure augmente de +5."
    },
    {
      id: "kata-air-regard-faucon",
      name: "Le Regard du Faucon (The Falcon's Gaze)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Archers Tsuruchi & Spécialistes du Kyujutsu",
      desc: "La portée efficace maximale de vos tirs d'arc augmente de 50 % et vous ignorez le malus de vent violent modéré."
    },

    // =========================================================================
    // --- KATAS DE FEU (FIRE) ---
    // =========================================================================
    {
      id: "kata-feu-frapper-feu",
      name: "Frapper comme le Feu (Striking as Fire)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Lorsque vous combattez en Posture d'Attaque Totale, vous ajoutez votre valeur d'Anneau de Feu en bonus numérique direct au total de tous vos jets de dégâts de mêlée."
    },
    {
      id: "kata-feu-force-lion",
      name: "La Force du Lion (Strength of the Lion)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan du Lion (Akodo, Matsu)",
      desc: "Vous devenez totalement immunisé aux effets de Peur d'un Rang inférieur ou égal à votre Rang d'École. Lors d'une charge en Attaque Totale, vous gagnez +1g0 à votre jet d'attaque."
    },
    {
      id: "kata-feu-force-dragon",
      name: "La Force du Dragon (Strength of the Dragon)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan du Dragon (Mirumoto)",
      desc: "En combattant dans le style Niten (deux sabres), le bonus accordé à votre ND d'Armure augmente de +2 et vous ignorez le malus de main non directrice."
    },
    {
      id: "kata-feu-danse-lames",
      name: "La Danse des Lames Ardentes (Blazing Blade Dance)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Une fois par escarmouche, vous pouvez déclarer une Augmentation Gratuite pour la manœuvre Dégâts Accrus (+1g0)."
    },
    {
      id: "kata-feu-lames-tournoyantes",
      name: "Lames Tournoyantes (Spinning Blades)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Mirumoto Bushi",
      desc: "Chaque fois que vous touchez un adversaire avec votre arme principale, votre attaque secondaire portée dans le même round gagne +1g1 aux dégâts."
    },
    {
      id: "kata-feu-deux-ciels",
      name: "Deux Ciels ne Font Qu'Un (Two Heavens as One)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Mirumoto Bushi",
      desc: "Tant que vous tenez votre Daishō dégainé, votre ND d'Armure augmente d'un montant égal à votre score d'Agilité."
    },
    {
      id: "kata-feu-rugissement-lion",
      name: "Rugissement du Lion (Roar of the Lion)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Lion Bushi",
      desc: "Votre premier jet d'attaque lors d'une escarmouche provoque un test de Peur (Rang 2) chez l'adversaire ciblé."
    },
    {
      id: "kata-feu-victoire-avant-flechir",
      name: "Victoire Avant de Fléchir (Victory Before Turning)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Matsu Berserker & Akodo Bushi",
      desc: "Chaque fois que vous perdez un Rang de Blessure, vous gagnez un bonus cumulatif de +1g0 à votre prochain jet d'attaque."
    },
    {
      id: "kata-feu-acier-eclair",
      name: "L'Acier Éclair (Flashing Steel)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Si vous agissez avant votre adversaire dans l'ordre d'Initiative, votre jet d'attaque contre lui gagne +1g0."
    },
    {
      id: "kata-feu-tonnerre-roulant",
      name: "Tonnerre Roulant (Rolling Thunder)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Spécialistes des Armes Lourdes & Tetsubō",
      desc: "Lorsque votre attaque avec une arme lourde touche avec 2 Augmentations ou plus, la cible doit réussir un jet de Terre (ND 20) ou être Assommée (Stunned) pour 1 round."
    },
    {
      id: "kata-feu-commandement-general",
      name: "Commandement du Général (General's Command)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Commandants & Officiers militaires",
      desc: "Tous vos alliés à portée de voix bénéficient d'un bonus de +2 à leur score d'Initiative au début de chaque round."
    },

    // =========================================================================
    // --- KATAS DU VIDE (VOID) ---
    // =========================================================================
    {
      id: "kata-vide-frapper-vide",
      name: "Frapper comme le Vide (Striking as Void)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Lorsque vous adoptez la Posture du Centre, le bonus accordé à votre prochain jet passe de +1g1 à +2g1 (et votre bonus d'Initiative en sortant du Centre augmente de +3)."
    },
    {
      id: "kata-vide-force-phenix",
      name: "La Force du Phénix (Strength of the Phoenix)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Bushi du Clan du Phénix (Shiba)",
      desc: "Lorsque vous utilisez la manœuvre Garde (Guard) pour protéger un allié, le bonus conféré au ND d'Armure de votre protégé augmente de +3 supplémentaires."
    },
    {
      id: "kata-vide-harmonie-cinq-anneaux",
      name: "Harmonie des Cinq Anneaux (Harmony of the Five Rings)",
      element: "Vide",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      desc: "Chaque fois que vous dépensez 1 point de Vide pour augmenter un jet d'attaque ou de défense, vous ajoutez également votre valeur d'Anneau du Vide au résultat numérique final du jet."
    },
    {
      id: "kata-vide-bouclier-phenix",
      name: "Le Bouclier du Phénix (Shield of the Phoenix)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Shiba Bushi",
      desc: "Vous pouvez dépenser 1 point de Vide pour encaisser une attaque magique ciblée dirigée contre un allié adjacent."
    },
    {
      id: "kata-vide-ame-katana",
      name: "L'Âme du Katana (Soul of the Katana)",
      element: "Vide",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi maniant un Katana",
      desc: "Votre sabre résonne avec votre chi intérieur : les dégâts de votre katana explosent sur les résultats de 9 et 10 quel que soit votre rang de compétence."
    },
    {
      id: "kata-vide-voie-paix",
      name: "La Voie de la Paix (Path of Peace)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Tant que vous n'infligez aucun dégât létal et cherchez à désarmer ou maîtriser pacifiquement l'adversaire, vous gagnez +5 à votre ND d'Armure."
    },
    {
      id: "kata-vide-recentrer-esprit",
      name: "Recentrer l'Esprit (Center the Mind)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Toute école de Bushi",
      desc: "Adopter la Posture du Centre vous permet de regagner immédiatement 1 point de Vide si votre réserve est vide (limité à une fois par jour)."
    },
    {
      id: "kata-vide-bouclier-honneur",
      name: "Le Bouclier de l'Honneur (The Shield of Honor)",
      element: "Vide",
      mastery: 4,
      cost: 4,
      schools: "Samouraïs d'Honneur 4.0 ou supérieur",
      desc: "Vous ajoutez votre Rang d'Honneur (arrondi à l'entier inférieur) à votre ND d'Armure contre toutes les attaques provenant d'ennemis de déshonneur ou de l'Outremonde."
    },
    {
      id: "kata-vide-voie-vague",
      name: "La Voie de la Vague (Way of the Wave)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Rōnin & Samouraïs sans maître",
      desc: "Une fois par combat, lorsque vous êtes confronté à un samouraï d'école de clan prestigieuse, vous gagnez +1g1 à votre premier jet d'attaque pour compenser le désavantage d'école."
    }
  ];

  if (typeof window !== "undefined") {
    window.KATAS_DATA = KATAS_DATA;
  }
})();
