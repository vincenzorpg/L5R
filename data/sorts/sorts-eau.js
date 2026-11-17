/**
 * data/sorts/sorts-eau.js — L5R 4e Édition
 * Recueil officiel exact de la Magie de l'Eau (41 sorts).
 * Sources : Livre de Base L5R 4e (pp. 187–193), Enemies of the Empire (p. 51 Kolat)
 *           et Imperial Histories 2 (p. 53).
 */

const SORTS_EAU = [
  // =========================================================================
  // NIVEAU DE MAÎTRISE 1 (10 sorts : Livre de Base pp. 187–189)
  // =========================================================================
  {
    id: "eau-1-bo-water",
    name: "Bō d'Eau (Bō of Water)",
    element: "Eau",
    mastery: 1,
    keywords: ["Artisanat"],
    source: "Livre des Règles L5R 4e, p. 187",
    range: "Personnelle ou 6 mètres (20')",
    area: "Une arme créée",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0), Durée (+5 minutes), Portée (+1,5 m / +5')",
    desc: "Vous invoquez un bâton d'eau pure, aussi rigide que le bois véritable malgré sa nature fluide. Sa forme par défaut est un bō, mais une Augmentation permet d'en changer la forme pour n'importe quel autre bâton de votre choix. L'arme a une VD de 1g2. Si vous ne possédez pas la compétence Bâtons, vous pouvez utiliser votre Rang d'École à sa place. Si vous possédez la compétence Bâtons, cette arme vous accorde une Augmentation Gratuite utilisable uniquement pour la manœuvre Renversement (Knockdown). Elle disparaît si vous la lâchez. Au lieu de l'invoquer pour vous-même, vous pouvez la faire apparaître entre les mains d'un allié à 6 m (20') : il est traité comme le lanceur pour tous les effets du sort, sans bénéficier du bonus d'Augmentation Gratuite."
  },
  {
    id: "eau-1-clarity-purpose",
    name: "Clarté de Dessein (Clarity of Purpose)",
    element: "Eau",
    mastery: 1,
    keywords: ["Bataille"],
    source: "Livre des Règles L5R 4e, p. 187",
    range: "Personnelle",
    area: "Rayon de 3 mètres (10') autour du lanceur",
    duration: "2 Rounds",
    raises: "Zone (+1,5 m / +5'), Durée (+1 round par 2 Augmentations)",
    desc: "L'une des forces de l'Eau réside dans sa rapidité. Tous les alliés présents dans la zone d'effet gagnent un bonus de +5 à leur score d'Initiative pour toute la durée du sort."
  },
  {
    id: "eau-1-ebbing-strength",
    name: "Reflux de Force (Ebbing Strength)",
    element: "Eau",
    mastery: 1,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 187",
    range: "6 mètres (20')",
    area: "Une créature ciblée",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Vous transmettez votre énergie à autrui en vous affaiblissant dans l'opération. Vous pouvez réduire l'un de vos Traits Physiques d'un montant allant jusqu'à votre Rang d'École ; la cible du sort augmente ce même Trait Physique du même montant. Si votre Trait tombe à 0 par cet effet, vous sombrez immédiatement dans l'inconscience et la durée du sort est réduite à 1 round. Aucun Trait ne peut être augmenté au-delà du double de son rang normal par ce sort."
  },
  {
    id: "eau-1-path-inner-peace",
    name: "La Voie vers la Paix Intérieure (Path to Inner Peace)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 187",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Les kami d'Eau orientent les fluides du corps pour accélérer drastiquement la guérison naturelle. Ce sort restitue à la cible un nombre de Blessures égal au montant exact par lequel votre jet d'incantation a dépassé le ND du sort."
  },
  {
    id: "eau-1-reflections-pan-ku",
    name: "Les Reflets de P'an Ku (Reflections of P'an Ku)",
    element: "Eau",
    mastery: 1,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 187",
    range: "Contact",
    area: "Un objet ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Lancé avec succès sur un objet, ce sort vous révèle automatiquement tous les pouvoirs et capacités de cet objet — qualités surnaturelles d'un nemuranai, arme maudite, ou sort inscrit sur un parchemin de prière (même chiffré dans un code que vous ne lisez pas, vous identifiez le sort). Il vous confère aussi une connaissance générale de l'origine de l'objet (lieu de forge, Clan du porteur l'ayant conservé le plus longtemps, etc., à la discrétion du MJ)."
  },
  {
    id: "eau-1-reversal-fortunes",
    name: "Renversement de Fortune (Reversal of Fortunes)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "3 mètres (10')",
    area: "Un individu ciblé",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Pendant la durée du sort, la cible peut immédiatement relancer un jet de son choix par round. Cette décision doit être prise dès la fin du premier jet, et la cible peut conserver le résultat de son choix."
  },
  {
    id: "eau-1-rushing-wave",
    name: "La Vague Déferlante (The Rushing Wave)",
    element: "Eau",
    mastery: 1,
    keywords: ["Voyage"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "3 mètres (10')",
    area: "Un individu ciblé",
    duration: "1 Round",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Permet à la cible d'effectuer une Action de Mouvement Gratuite d'une distance allant jusqu'à (son Anneau d'Eau × 3 mètres / 10') au lieu du (× 1,5 m / 5') habituel. Sans Augmentation de Durée, cet avantage doit être utilisé au prochain tour de la cible ou est perdu."
  },
  {
    id: "eau-1-speed-waterfall",
    name: "Vitesse de la Cascade (Speed of the Waterfall)",
    element: "Eau",
    mastery: 1,
    keywords: ["Voyage"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "Contact",
    area: "Un individu ou une créature ciblée",
    duration: "1 Heure",
    raises: "Durée (+10 minutes), Portée (passe à 3 m / 10' pour 2 Augmentations)",
    desc: "La cible du sort peut se déplacer au total par round d'une distance égale à (son Anneau d'Eau × 6 mètres / 20') + (2 × votre Anneau d'Eau en pieds, soit environ 0,6 m × votre Eau). Ce sort ne confère pas de mouvement supplémentaire en soi, il augmente simplement le plafond de distance maximale parcourable pendant un round durant le sort."
  },
  {
    id: "eau-1-spirit-water",
    name: "Esprit de l'Eau (Spirit of the Water)",
    element: "Eau",
    mastery: 1,
    keywords: ["Bataille"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "6 mètres (20')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Spéciale (transforme l'action supplémentaire en Action Complexe pour 5 Augmentations)",
    desc: "La cible gagne une Action Simple supplémentaire durant l'Étape des Réactions du round au cours duquel ce sort est achevé. Cette action ne peut pas être utilisée pour porter une attaque."
  },
  {
    id: "eau-1-sympathetic-energies",
    name: "Énergies Sympathiques (Sympathetic Energies)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Spéciale (voir description)",
    desc: "Vous pouvez transférer n'importe quel effet de sort actif sur vous-même vers une cible consentante. Avec trois Augmentations, vous pouvez transférer un effet de sort actif d'une cible consentante vers une autre cible consentante. Ne peut pas transférer de sorts entre des cibles non consentantes."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 2 (9 sorts : 8 Livre de Base + 1 Imperial Histories 2)
  // =========================================================================
  {
    id: "eau-2-cloak-miya",
    name: "Le Manteau des Miya (Cloak of the Miya)",
    element: "Eau",
    mastery: 2,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Vous vous enveloppez dans l'étreinte protectrice de la vague. Votre ND d'Armure augmente d'un montant égal à (votre Anneau d'Eau + votre Rang d'École) pour toute la durée du sort."
  },
  {
    id: "eau-2-inari-blessing",
    name: "La Bénédiction d'Inari (Inari's Blessing)",
    element: "Eau",
    mastery: 2,
    keywords: ["Artisanat"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "Personnelle",
    area: "Subsistance créée",
    duration: "Instantanée",
    raises: "Spéciale (assez de nourriture pour 1 personne supplémentaire par Augmentation)",
    desc: "Invoque la bénédiction d'Inari, Fortune du Riz, pour créer suffisamment d'eau et de nourriture pour sustenter un nombre d'individus égal à (votre Rang d'École + 1) pendant un jour. Sans Augmentation, cette nourriture est fade mais nourrissante (riz nature et eau) ; avec des Augmentations, la qualité peut être rehaussée vers du poisson ou du thé à la discrétion du MJ. Le ND d'incantation est doublé dans l'Outremonde."
  },
  {
    id: "eau-2-judgment-yomi",
    name: "Jugement de Yomi (Judgment of Yomi)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    source: "Imperial Histories 2 (p. 53)",
    range: "15 mètres (50')",
    area: "Un individu",
    duration: "Concentration (Spéciale)",
    raises: "Portée (+3 m / +10'), Cibles (+1)",
    desc: "Sort développé par les Kitsu dans les premiers temps de l'Empire, attirant le regard des ancêtres bienheureux sur vos adversaires. Si la cible est humaine, pour chaque Désavantage Social ou Spirituel qu'elle possède, elle subit un malus de -1g0 à tous ses jets de Compétences Physiques. De plus, elle doit réussir un jet d'Honneur (ND 20) sous peine de ne pouvoir se rapprocher de vous plus près que la portée maximale du sort (sans être repoussée si elle est déjà plus proche ; aucun autre malus en cas d'échec au jet d'Honneur). Ces pénalités durent 1 round complet, ou aussi longtemps que vous maintenez votre concentration."
  },
  {
    id: "eau-2-reflective-pool",
    name: "Bassin Réfléchissant (Reflective Pool)",
    element: "Eau",
    mastery: 2,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "16 kilomètres (10 miles)",
    area: "Étendue d'eau / Lieu ciblé",
    duration: "5 Minutes",
    raises: "Durée (+1 minute), Portée (+16 km / +10 miles)",
    desc: "En plongeant le regard dans une étendue d'eau (même une simple flaque), vous observez un lieu qui vous est familier comme si vous y étiez présent (vision uniquement, sans le son). Pour qu'un lieu soit familier, vous devez y avoir passé beaucoup de temps (demeure, dojo, temple favori) ou y avoir médité au moins 10 minutes. Plus la masse d'eau utilisée est grande, plus l'image est nette."
  },
  {
    id: "eau-2-rejuvenating-vapors",
    name: "Vapeurs Régénératrices (Rejuvenating Vapors)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Cibles (+1 personne supplémentaire par 2 Augmentations)",
    desc: "La cible est instantanément rafraîchie comme après une nuit complète de sommeil. Ne restaure pas les points de Vide dépensés ni les capacités limitées par jour, mais élimine la fatigue et l'épuisement. Sur un shugenja, restaure les emplacements de sorts associés à l'Anneau de Vide (utilisables pour tout élément), mais pas ceux des autres Anneaux. Un individu ne peut bénéficier de Vapeurs Régénératrices qu'une fois par période de 24 heures."
  },
  {
    id: "eau-2-stand-against-waves",
    name: "Face aux Vagues (Stand Against the Waves)",
    element: "Eau",
    mastery: 2,
    keywords: ["Bataille"],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "3 mètres (10')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10' par tranche de 3 Augmentations)",
    desc: "La cible gagne une Action Simple supplémentaire durant l'Étape des Réactions du Round de Combat en cours, utilisable uniquement pour porter une attaque. Si la cible est incapable de porter une attaque par une Action Simple, ce sort lui accorde à la place une Action Complexe. Ne permet jamais à un shugenja de lancer un second sort durant le même Round."
  },
  {
    id: "eau-2-ties-that-bind",
    name: "Les Liens Invisibles (The Ties That Bind)",
    element: "Eau",
    mastery: 2,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "16 kilomètres (10 miles)",
    area: "Le lanceur",
    duration: "Instantanée",
    raises: "Portée (+3,2 km / +2 miles)",
    desc: "Permet de rechercher les esprits d'Eau au sein d'un seul objet précis qui vous est familier (fréquenté longuement ou manipulé personnellement). Si cet objet se trouve à portée du sort, vous connaissez sa direction et sa distance relative par rapport à votre position actuelle."
  },
  {
    id: "eau-2-wave-borne-speed",
    name: "Vitesse Portée par les Vagues (Wave-Borne Speed)",
    element: "Eau",
    mastery: 2,
    keywords: ["Voyage"],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "2 Rounds",
    raises: "Aucune",
    desc: "Votre Anneau d'Eau est augmenté de +2 pour calculer la distance que vous pouvez franchir lors de toute Action de Mouvement effectuée durant le Round en cours ou le Round suivant."
  },
  {
    id: "eau-2-wisdom-clarity",
    name: "Sagesse et Clarté (Wisdom & Clarity)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Cibles (peut cibler autrui avec 2 Augmentations)",
    desc: "Pendant la durée du sort, votre vitesse de lecture double et vous bénéficiez d'une mémoire parfaite de tout ce que vous lisez sous son effet. N'améliore toutefois pas la compréhension : toute langue ou code chiffré qui vous est étranger demeure totalement indéchiffrable."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 3 (7 sorts : Livre de Base pp. 189–190)
  // =========================================================================
  {
    id: "eau-3-near-to-ice",
    name: "Proche de la Glace (Near to Ice)",
    element: "Eau",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (passe à 3 m / 10' avec 2 Augmentations)",
    desc: "Toutes les pénalités de Blessures actuelles de la cible sont annulées pendant la durée du sort. Toute pénalité supplémentaire encourue ensuite s'applique pleinement en utilisant la différence entre la pénalité annulée et la nouvelle pénalité comme pénalité effective. Les Blessures ne sont pas guéries : elles cessent simplement d'entraver le sujet."
  },
  {
    id: "eau-3-regrow-wound",
    name: "Régénérer la Blessure (Regrow the Wound)",
    element: "Eau",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Concentration",
    raises: "Spéciale (votre Eau compte comme augmentée de +1 pour les soins par Augmentation)",
    desc: "La cible récupère un nombre de Blessures égal à (votre Anneau d'Eau + votre Rang d'École) à chaque round où le sort demeure actif. Vous devez toucher la cible lors de l'incantation, puis le sort peut être maintenu par concentration sans contact physique."
  },
  {
    id: "eau-3-silent-waters",
    name: "Eaux Silencieuses (Silent Waters)",
    element: "Eau",
    mastery: 3,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Variable",
    raises: "Aucune",
    desc: "Dès l'achèvement réussi de ce sort, vous pouvez immédiatement incanter un second sort de n'importe quel Élément (que vous êtes normalement capable de lancer, et de Niveau de Maîtrise 3 ou inférieur). Si ce second jet d'incantation réussit, le second sort est stocké en vous sans s'activer jusqu'à la survenue d'un événement physique précis défini lors de l'incantation (prononcer un certain mot, dégainer une lame, tomber au combat, etc.). Dès que ce déclencheur survient, le sort stocké prend immédiatement effet comme s'il venait d'être lancé. Un personnage ne peut bénéficier que d'un seul sort stocké à la fois : un second Eaux Silencieuses dissipe et remplace le précédent."
  },
  {
    id: "eau-3-strike-tsunami",
    name: "Frappe du Tsunami (Strike of the Tsunami)",
    element: "Eau",
    mastery: 3,
    keywords: ["Bataille"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "7,5 mètres (25')",
    area: "Cône partant du lanceur, large de 3 mètres (10') à son extrémité",
    duration: "Instantanée",
    raises: "Dégâts (+1g0), Portée (+1,5 m / +5'), Spéciale (+5 au ND du jet de Terre par Augmentation)",
    desc: "Invoque une vague écrasante qui submerge tout dans sa trajectoire. Inflige 3g3 Blessures à tout ce qui se trouve dans la zone d'effet, et tous les adversaires pris dedans doivent réussir un jet de Terre (ND 15) ou subir la manœuvre Renversement (Knockdown). Tout ce qui se trouve dans la zone est saturé d'eau."
  },
  {
    id: "eau-3-visions-future",
    name: "Visions du Futur (Visions of the Future)",
    element: "Eau",
    mastery: 3,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Aucune",
    desc: "Développé à l'origine par la famille Tonbo du Clan de la Libellule. Nécessite un grand bassin d'eau calme dans lequel plonger le regard. À l'achèvement du sort, vous entrez dans une brève transe et contemplez des images d'événements futurs, souvent symboliques mais d'une exactitude totale, qui se produiront sauf intervention directe de votre part. Seul le lanceur peut voir ces visions."
  },
  {
    id: "eau-3-walking-upon-waves",
    name: "Marcher sur les Flots (Walking Upon the Waves)",
    element: "Eau",
    mastery: 3,
    keywords: ["Voyage"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Cibles (+1 individu par Augmentation)",
    desc: "Permet à la cible de se déplacer à la surface de l'eau comme sur de la terre ferme (Terrain Normal / Basic Terrain). Si la surface de l'eau est agitée (tempête, vagues roulantes, etc.), elle compte comme Terrain Difficile."
  },
  {
    id: "eau-3-water-kami-blessing",
    name: "Bénédiction du Kami d'Eau (Water Kami's Blessing)",
    element: "Eau",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "5 Rounds",
    raises: "Spéciale (votre Anneau d'Eau compte comme supérieur de 1 par 2 Augmentations)",
    desc: "La cible reçoit un bonus à tous ses jets basés sur la Perception (jets de Trait, de Compétence ou autres) égal à un nombre de dés lancés supplémentaires (+Xg0) égal à votre Anneau d'Eau."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 4 (7 sorts : 6 Livre de Base + 1 Enemies of the Empire)
  // =========================================================================
  {
    id: "eau-4-dominion-suitengu",
    name: "Domaine de Suitengu (Dominion of Suitengu)",
    element: "Eau",
    mastery: 4,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "160 kilomètres (100 miles)",
    area: "Deux étendues d'eau",
    duration: "Concentration",
    raises: "Portée (+16 km / +10 miles)",
    desc: "Créé par le Clan de la Mante. Permet de regarder dans une étendue d'eau d'au moins 30 cm (1') de large et 2,5 cm (1 pouce) de profondeur pour voir hors de n'importe quelle autre étendue d'eau connue à portée (côte, lac, rivière, ruisseau ou simple flaque), comme si vous étiez immergé dedans (vision uniquement, sans le son)."
  },
  {
    id: "eau-4-ebb-flow-battle",
    name: "Le Flux et Reflux du Combat (Ebb & Flow of Battle)",
    element: "Eau",
    mastery: 4,
    keywords: ["Bataille"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Personnelle",
    area: "Tous les alliés choisis dans un rayon de 15 mètres (50') autour du lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round par 2 Augmentations)",
    desc: "Vous pouvez exclure certains alliés de l'effet si vous le souhaitez. Tous les alliés affectés peuvent se déplacer d'une distance égale à (leur Anneau d'Eau × 3 mètres / 10') en tant qu'Action Gratuite (au lieu d'une Action Simple habituelle)."
  },
  {
    id: "eau-4-heart-water-dragon",
    name: "Cœur du Dragon de l'Eau (Heart of the Water Dragon)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "7,5 mètres (25')",
    area: "Individus ciblés jusqu'au Rang d'École du lanceur (peut inclure le lanceur)",
    duration: "1 round par Rang d'École",
    raises: "Durée (+1 round), Spéciale (+1g0 soigné par 2 Augmentations)",
    desc: "Chaque fois qu'une cible de ce sort subit des dégâts pendant sa durée, elle regagne instantanément 1g1 Blessures."
  },
  {
    id: "eau-4-mirrors-smile",
    name: "Le Sourire du Miroir (The Mirror's Smile)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    source: "Enemies of the Empire (p. 51)",
    range: "Contact",
    area: "Le lanceur",
    duration: "1 Jour",
    raises: "Spéciale (peut être lancé après n'avoir vu le visage de la cible qu'une seule fois pour 4 Augmentations)",
    desc: "Sort secret des shugenja du Kolat. Remodèle véritablement la chair et les os de votre visage (processus douloureux durant plusieurs minutes) pour qu'il devienne identique à celui d'une autre personne — même les amis proches et la famille croient avoir la cible devant eux. Requiert normalement d'avoir étudié le visage ciblé pendant au moins 8 heures (ou 4 Augmentations si vu une fois). N'affecte que le visage : ni le reste du corps, ni la chevelure, ni la voix, ni les cicatrices/taches de naissance ailleurs sur le corps."
  },
  {
    id: "eau-4-path-not-taken",
    name: "Le Chemin Délaissé (The Path Not Taken)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Jour",
    raises: "Spéciale (+1 emplacement de sort bonus par tranche de 5 Augmentations)",
    desc: "Avant d'incanter, vous choisissez un Anneau dans lequel vous vous affaiblissez temporairement et un Anneau dans lequel vous vous renforcez. À la réussite du sort, vous pouvez transférer un nombre d'emplacements de sorts quotidiens inutilisés de l'Anneau affaibli vers l'Anneau renforcé. Dure exactement un jour."
  },
  {
    id: "eau-4-strike-flowing-waters",
    name: "La Frappe des Eaux Vives (Strike of the Flowing Waters)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "3 mètres (10')",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "1 Round",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "La cible ignore les bonus au ND d'Armure octroyés par les armures portées, par les effets de sorts de Niveau de Maîtrise 3 ou inférieur, et par les autres effets mécaniques hors Techniques. Contre les créatures non humaines ne portant pas d'armure, la cible traite leur ND d'Armure comme inférieur de 5. N'annule pas la Réduction d'une armure et n'ignore pas le bonus de ND d'Armure conféré par les Postures Défense ou Défense Totale."
  },
  {
    id: "eau-4-symbol-water",
    name: "Symbole d'Eau (Symbol of Water)",
    element: "Eau",
    mastery: 4,
    keywords: ["Sceau"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Contact",
    area: "Spéciale",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Grave un glyphe de garde sur un objet solide (porte, fenêtre, portail ou passage). Quiconque tente de le franchir doit remporter un jet opposé de Feu contre l'Eau du lanceur. En cas d'échec, la cible est saisie d'une terreur paralysante et doit immédiatement affronter un effet de Peur 7. Un seul Symbole d'Eau actif par shugenja, et deux Symboles d'Éléments différents ne peuvent affecter la même zone. Dissipable par un autre Symbole d'Eau ou en détruisant la surface gravée."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 5 (5 sorts : Livre de Base pp. 191–192)
  // =========================================================================
  {
    id: "eau-5-ever-changing-waves",
    name: "Vagues Changeantes (Ever-Changing Waves)",
    element: "Eau",
    mastery: 5,
    keywords: ["Illusion"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Heure",
    raises: "Durée (+1 heure)",
    desc: "Altère physiquement votre corps mortel pour qu'il adopte la forme de n'importe quel autre animal naturel de Rokugan. Vous conservez vos Traits Mentaux. Pour les Traits Physiques, vous conservez le plus élevé entre les vôtres et ceux de l'animal transformé, et acquérez ses capacités naturelles (armes naturelles, sens). Certaines sectes traditionalistes méprisent ce sort comme impur."
  },
  {
    id: "eau-5-final-bond",
    name: "L'Ultime Lien (The Final Bond)",
    element: "Eau",
    mastery: 5,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Spéciale",
    area: "Un objet ou un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Permet de détecter la localisation approximative n'importe où dans l'Empire d'un objet ou d'un individu très bien connu (objet fréquenté longuement ou manipulé fréquemment, membre de la famille proche ou ami intime) — par exemple « la ville de Ryoko Owari Toshi » ou « le nord de la forêt Shinomen Mori ». Échoue automatiquement si la cible se trouve hors de l'Empire de Rokugan."
  },
  {
    id: "eau-5-hands-tides",
    name: "Les Mains des Marées (Hands of the Tides)",
    element: "Eau",
    mastery: 5,
    keywords: ["Bataille", "Voyage"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Rayon de 30 mètres (100') centré sur le lanceur",
    area: "Cibles jusqu'à l'Anneau d'Eau du lanceur",
    duration: "Instantanée",
    raises: "Zone (+3 m / +10'), Cibles (+1 par 2 Augmentations)",
    desc: "Dans la zone d'effet, vous choisissez un nombre de cibles consentantes allant jusqu'à votre Anneau d'Eau et permutez instantanément leurs emplacements à votre guise. À la fin du sort, chaque emplacement occupé au départ doit contenir une personne, mais l'individu à chaque place varie librement selon vos échanges."
  },
  {
    id: "eau-5-power-ocean",
    name: "La Puissance de l'Océan (Power of the Ocean)",
    element: "Eau",
    mastery: 5,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Nombre de jours égal au Rang d'École du lanceur",
    raises: "Durée (+1 jour par 3 Augmentations)",
    desc: "Rituel complexe d'une heure qui ne peut viser qu'une cible consentante. Pendant la durée du sort, la cible n'a besoin ni de manger, ni de boire, ni de dormir. Un nombre de fois pendant la durée égal à votre Rang d'École, elle peut reconstituer tous ses points de Vide en une Action Simple (équivalent à une nuit complète de repos). Elle récupère également (2 × votre Anneau d'Eau) Blessures par heure. Un shugenja ciblé regagne tous ses emplacements de sorts à l'aube même sans repos. À l'expiration du sort, la cible sombre dans un épuisement complet pendant exactement la moitié de la durée du sort (incapable d'action physique significative, déplacements lents, voyage totalement impossible)."
  },
  {
    id: "eau-5-suitengus-embrace",
    name: "L'Étreinte de Suitengu (Suitengu's Embrace)",
    element: "Eau",
    mastery: 5,
    keywords: ["Tonnerre"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Remplit les poumons de la cible d'eau de mer. En cas de succès, la cible est réduite au Rang de Blessure Hors de Combat / À Terre (Down) en matière de capacité d'action et ne peut rien entreprendre d'autre que résister au sort. Chaque round, elle effectue un jet de Constitution (ND 15) : trois réussites cumulées la font récupérer après 1 round passé à vomir l'eau de mer ; deux échecs consécutifs la font tomber inconsciente et mourir en 1 minute sauf intervention magique ou médicale (un sauvetage médical exige un jet de [Médecine/]Intelligence ND 50)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 6 (3 sorts : Livre de Base pp. 192–193)
  // =========================================================================
  {
    id: "eau-6-peace-kami",
    name: "La Paix des Kami (Peace of the Kami)",
    element: "Eau",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Bienveillance suprême du Dragon de l'Eau. La cible est instantanément guérie de toutes ses maladies, son organisme est purgé de tous poisons, et toutes ses Blessures sont intégralement soignées."
  },
  {
    id: "eau-6-rise-water",
    name: "Éveil de l'Eau (Rise, Water)",
    element: "Eau",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "9 mètres (30')",
    area: "Un esprit invoqué",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Accomplissement ultime du sort Invocation, appelant un massif kami d'eau pure d'apparence vaguement humanoïde d'environ 3 mètres (10') de haut aux contours sans cesse mouvants. Il se déplace jusqu'à (4,5 m / 15' × votre Anneau d'Eau) par round et sature le sol dans un rayon de 6 m (20') autour de lui, rendant tout terrain dans la zone au moins Terrain Modéré (à moins qu'il ne soit déjà Terrain Difficile). Tous ses Traits Physiques sont égaux à votre Anneau d'Eau, il attaque avec un rang de Jiujutsu égal à la moitié de votre Anneau d'Eau et inflige une VD égale à votre Anneau d'Eau (en dés lancés et gardés, Eau g Eau). Il encaisse les dégâts comme un humain ayant une Terre égale à votre Anneau d'Eau (sans malus de Blessures), est Invulnérable et est dissipé s'il est réduit à 0 Blessure."
  },
  {
    id: "eau-6-waters-sweet-clarity",
    name: "Douce Clarté de l'Eau (Water's Sweet Clarity)",
    element: "Eau",
    mastery: 6,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Personnelle",
    area: "Étendue d'eau ciblée",
    duration: "3 Rounds",
    raises: "Aucune",
    desc: "En concentrant votre énergie sur une étendue d'eau calme, vous posez une question sur l'avenir et les eaux révèlent la réponse sous forme de trois images distinctes (événements successifs ou trois facettes d'un même événement). Contrairement aux autres augures, autrui peut également contempler ces visions."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_EAU = SORTS_EAU;
}
