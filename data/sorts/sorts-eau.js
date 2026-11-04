/**
 * data/sorts-eau-data.js — L5R 4e Édition
 * Recueil exhaustif officiel de la Magie de l'Eau (Shugenja & Ishiken).
 * Sources : Livre des Règles L5R 4e (p. 187-193), The Book of Water & The Great Clans.
 */

const SORTS_EAU = [
  // =========================================================================
  // NIVEAU DE MAÎTRISE 1 (11 sorts)
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
    desc: "Vous invoquez un bâton fait d'eau pure, aussi rigide qu'un vrai bâton malgré sa nature liquide. Sa forme par défaut est un bō (VD 1g2) ; 1 Augmentation permet d'en faire n'importe quel autre bâton de votre choix. Si vous ne possédez pas la compétence Bâtons, vous pouvez utiliser votre Rang d'École à la place. Si vous possédez la compétence Bâtons, manier cette arme vous confère une Augmentation Gratuite utilisable uniquement pour la manœuvre Renversement (Knockdown). L'arme disparaît si elle quitte vos mains. Vous pouvez également la faire apparaître entre les mains d'un allié à 6 m (il est traité comme le lanceur mais ne reçoit pas l'Augmentation Gratuite)."
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
    desc: "La rapidité est l'une des grandes forces de l'Eau. Tous les alliés situés dans la zone d'effet au moment de l'incantation gagnent un bonus de +5 à leur score d'Initiative pour toute la durée du sort."
  },
  {
    id: "eau-1-cleansing-body",
    name: "Purification du Corps (Cleansing the Body)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    source: "The Book of Water",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Cibles (+1 individu supplémentaire par 2 Augmentations)",
    desc: "Les kami d'Eau chassent les impuretés et toxines du système biologique. La cible peut immédiatement relancer tout jet de Vigueur ou de Constitution en cours pour résister aux effets d'un poison naturel, d'une drogue ou d'une maladie profane, en conservant le meilleur résultat."
  },
  {
    id: "eau-1-ebbing-strength",
    name: "Reflux de Force (Ebbing Strength)",
    element: "Eau",
    mastery: 1,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "6 mètres (20')",
    area: "Une créature ciblée",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Affaiblit le flux d'énergie de la cible comme le reflux d'une marée. La cible subit une pénalité de -1g1 sur tous ses jets de dégâts au corps à corps ou à mains nues pour la durée du sort."
  },
  {
    id: "eau-1-flow-of-chi",
    name: "Flux du Chi (Flow of Chi)",
    element: "Eau",
    mastery: 1,
    keywords: ["Défense"],
    source: "The Great Clans",
    range: "Contact",
    area: "Un individu consentant",
    duration: "10 Minutes",
    raises: "Durée (+5 minutes)",
    desc: "Harmonise la circulation interne du Chi de la cible. Le sujet gagne un bonus de +1g1 à tous ses jets pour résister aux attaques d'Atémis (Atemi), aux techniques de moines basées sur le Kiho et aux effets tentant de paralyser ou d'entraver ses méridiens énergétiques."
  },
  {
    id: "eau-1-path-inner-peace",
    name: "La Voie vers la Paix Intérieure (Path to Inner Peace)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Les kami d'Eau stimulent les fluides corporels pour accélérer prodigieusement la guérison naturelle. Ce sort rend à la cible un nombre de Blessures égal au montant exact par lequel votre jet d'incantation a dépassé le ND du sort (par exemple, si votre jet d'incantation obtient 24 contre un ND de 10, la cible récupère 14 Blessures)."
  },
  {
    id: "eau-1-reflections-pan-ku",
    name: "Les Reflets de P'an Ku (Reflections of P'an Ku)",
    element: "Eau",
    mastery: 1,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 188",
    range: "Contact",
    area: "Un miroir ou une surface d'eau calme",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Permet de contempler des vérités cachées dans un reflet. En fixant la surface réfléchissante, vous percevez la véritable nature spirituelle de toute personne ou objet qui s'y reflète, dissipant les illusions visuelles, déguisements et métamorphoses magiques (les métamorphes ou créatures de l'Ombre apparaissent sous leur véritable forme)."
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
    desc: "L'adaptabilité est le domaine de l'Eau. Pendant toute la durée du sort, la cible gagne le droit de relancer immédiatement n'importe quel jet de dés complet de son choix, une fois par round. La décision doit être prise dès que le résultat du premier jet est connu, et la cible a le droit de conserver le meilleur des deux résultats."
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
    desc: "Accroît temporairement la vivacité de la cible. Ce sort lui permet d'effectuer une Action de Mouvement Gratuite d'une distance allant jusqu'à (son Anneau d'Eau × 3 mètres / 10'), au lieu du ratio normal de (Eau × 1,5 m). Sans Augmentation de durée, cet avantage doit être utilisé lors du prochain tour de la cible, sans quoi il est perdu."
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
    desc: "La cible peut se déplacer au cours d'un round d'une distance maximale totale égale à (son Anneau d'Eau × 6 mètres / 20') + (le double de votre Anneau d'Eau en mètres). Ce sort ne confère pas d'actions de mouvement supplémentaires, il augmente simplement le plafond de distance maximale franchissable par round."
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
    desc: "L'énergie circule entre tous les êtres vivants comme l'eau à travers la terre. Ce sort vous permet de transférer un effet de sort continu existant depuis vous-même vers une cible consentante. Avec trois Augmentations, vous pouvez transférer un effet de sort continu d'une cible consentante à une autre cible consentante. Impossible à utiliser sur des sujets non consentants."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 2 (10 sorts)
  // =========================================================================
  {
    id: "eau-2-cloak-miya",
    name: "Le Manteau des Miya (Cloak of the Miya)",
    element: "Eau",
    mastery: 2,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Vous vous enveloppez dans l'étreinte protectrice de la vague. Votre ND d'Armure est augmenté d'un montant égal à votre Anneau d'Eau + votre Rang d'École pour toute la durée du sort."
  },
  {
    id: "eau-2-fog-green-net",
    name: "La Brume du Filet Vert (Fog of the Green Net)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    source: "The Book of Water",
    range: "9 mètres (30')",
    area: "Rayon de 9 mètres (30') autour du point ciblé",
    duration: "1 Heure",
    raises: "Zone (+3 m de rayon), Durée (+1 heure), Portée (+3 m)",
    desc: "Fait monter une brume moite chargée de condensats visqueux. Toute créature vivante pénétrant dans la zone ou y débutant son tour doit réussir un jet de Terre (ND 15) ou voir son Anneau d'Eau considéré comme réduit de 1 pour ses déplacements et ses tests physiques tant qu'elle demeure dans la brume, ses mouvements devenant lourds et empesés."
  },
  {
    id: "eau-2-inari-blessing",
    name: "La Bénédiction d'Inari (Inari's Blessing)",
    element: "Eau",
    mastery: 2,
    keywords: ["Artisanat"],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "Personnelle",
    area: "Nourriture créée",
    duration: "Instantanée",
    raises: "Spéciale (substance pour 1 personne supplémentaire par Augmentation)",
    desc: "En appelant les esprits de l'Eau nourricière, vous matérialisez une quantité d'eau pure et de riz blanc cuit suffisante pour nourrir et hydrater convenablement un être humain adulte pour une journée entière."
  },
  {
    id: "eau-2-reflective-pool",
    name: "Bassin Réfléchissant (Reflective Pool)",
    element: "Eau",
    mastery: 2,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 189",
    range: "15 kilomètres (10 miles)",
    area: "Étendue d'eau / Lieu ciblé",
    duration: "5 Minutes",
    raises: "Durée (+1 minute), Portée (+15 km / +10 miles)",
    desc: "En fixant une étendue d'eau (même aussi modeste qu'une flaque ou un bol), vous observez un endroit qui vous est familier comme si vous y étiez présent (vue uniquement, sans le son). Pour être familier, vous devez y avoir passé beaucoup de temps (votre demeure, dojo, temple) ou y avoir médité au moins 10 minutes. Plus l'étendue d'eau utilisée est large, plus l'image est nette."
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
    raises: "Cibles (+1 individu supplémentaire par 2 Augmentations)",
    desc: "L'Eau purifie et revigore tout ce qu'elle effleure. Le sujet est instantanément rafraîchi comme s'il venait de bénéficier d'une nuit complète de sommeil réparateur. Cela n'annule pas la perte de points de Vide, mais dissipe immédiatement toute fatigue ou épuisement. Si la cible est un shugenja, le sort restaure ses emplacements de sorts quotidiens liés à son Anneau de Vide (utilisables pour n'importe quel élément), mais pas ceux des autres Anneaux. Nul ne peut bénéficier de ce sort plus d'une fois par période de 24 heures."
  },
  {
    id: "eau-2-ride-the-water",
    name: "Chevaucher les Eaux (Ride the Water)",
    element: "Eau",
    mastery: 2,
    keywords: ["Voyage"],
    source: "The Book of Water",
    range: "Contact",
    area: "Une embarcation de petite ou moyenne taille",
    duration: "1 Heure",
    raises: "Durée (+30 minutes)",
    desc: "Les kami de l'Eau propulsent et guident une embarcation fluviale ou côtière. Sa vitesse de navigation est doublée, et le bateau devient totalement insensible aux écueils mineurs, courants contraires et bancs de sable."
  },
  {
    id: "eau-2-stand-against-waves",
    name: "Face aux Vagues (Stand Against the Waves)",
    element: "Eau",
    mastery: 2,
    keywords: ["Bataille"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "3 mètres (10')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10' par tranche de 3 Augmentations)",
    desc: "La cible gagne une Action Simple supplémentaire durant l'Étape des Réactions du round de combat en cours. Cette action ne peut être utilisée que pour porter une attaque. Si la cible n'est pas capable d'attaquer via une Action Simple, le sort lui accorde à la place une Action Complexe d'attaque. Ne permet jamais à un shugenja de lancer un deuxième sort dans le même round."
  },
  {
    id: "eau-2-ties-that-bind",
    name: "Les Liens Invisibles (The Ties That Bind)",
    element: "Eau",
    mastery: 2,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "15 kilomètres (10 miles)",
    area: "Le lanceur",
    duration: "Instantanée",
    raises: "Portée (+3 km / +2 miles)",
    desc: "Permet de sonder les esprits d'Eau au sein d'un objet matériel précis et familier (que vous avez manipulé personnellement ou côtoyé longuement). Si l'objet se trouve dans la portée du sort, vous connaissez immédiatement sa direction et sa distance relative par rapport à votre position."
  },
  {
    id: "eau-2-wave-borne-speed",
    name: "Vitesse Portée par les Vagues (Wave-Borne Speed)",
    element: "Eau",
    mastery: 2,
    keywords: ["Voyage"],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "2 Rounds",
    raises: "Aucune",
    desc: "Votre Anneau d'Eau est augmenté de +2 pour déterminer la distance que vous pouvez franchir lors de toute Action de Mouvement effectuée pendant le round en cours ou le round suivant."
  },
  {
    id: "eau-2-wisdom-clarity",
    name: "Sagesse et Clarté (Wisdom & Clarity)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Cibles (peut cibler autrui avec 2 Augmentations)",
    desc: "En sollicitant la clairvoyance des kami d'Eau, votre vitesse de lecture est doublée et vous bénéficiez d'une mémoire photographique absolue de tout ce que vous lisez pendant la durée du sort. Ce sort n'augmente pas la compréhension intrinsèque : les langues étrangères ou chiffres cryptés que vous ne connaissez pas demeurent indéchiffrables."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 3 (8 sorts)
  // =========================================================================
  {
    id: "eau-3-castle-water",
    name: "Château d'Eau (Castle of Water)",
    element: "Eau",
    mastery: 3,
    keywords: ["Défense"],
    source: "The Book of Water",
    range: "3 mètres (10')",
    area: "Dôme protecteur d'un rayon de 3 mètres (10')",
    duration: "5 Rounds",
    raises: "Zone (+1,5 m de rayon), Durée (+1 round), Portée (+1,5 m)",
    desc: "Érige un rideau circulaire d'eau sous pression continue autour de la zone choisie. Aucune flèche ni projectile d'arme à distance ordinaire ne peut traverser la barrière. Les attaques de mêlée portées à travers le dôme subissent une pénalité de -3g0 à l'attaque. Les sorts de Feu ciblant l'intérieur ou traversant la barrière voient leur ND augmenté de +15."
  },
  {
    id: "eau-3-flowing-river",
    name: "Rivière Fluide (Flowing River)",
    element: "Eau",
    mastery: 3,
    keywords: ["Bataille"],
    source: "The Book of Water",
    range: "Contact",
    area: "Une arme de mêlée",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "L'arme visée prend un aspect liquide et ondoie au fil des coups. Toutes les attaques portées avec cette arme contournent les défenses adverses et ignorent la totalité du bonus conféré au ND d'Armure par l'armure de la cible."
  },
  {
    id: "eau-3-near-to-ice",
    name: "Proche de la Glace (Near to Ice)",
    element: "Eau",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (passe à 3 m / 10' avec 2 Augmentations)",
    desc: "Comme l'eau se durcit à l'approche de l'hiver, l'eau dans le corps humain devient rigide et impassible face au mal. Toutes les pénalités de ND actuellement infligées par les Rangs de Blessures de la cible sont totalement annulées pour la durée du sort. Toute nouvelle blessure subie applique la pénalité liée au nouvel état atteint. Les Blessures ne sont pas soignées, elles cessent simplement d'entraver le corps."
  },
  {
    id: "eau-3-regrow-wound",
    name: "Régénérer la Blessure (Regrow the Wound)",
    element: "Eau",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 190",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Concentration",
    raises: "Spéciale (votre Eau compte comme augmentée de +1 pour les soins par Augmentation)",
    desc: "La douleur et les lésions sont drainées vers l'océan infini. La cible récupère un nombre de Blessures égal à votre Anneau d'Eau + votre Rang d'École à chaque round où le sort est maintenu. Vous devez toucher la cible lors de l'incantation, mais pouvez ensuite maintenir la concentration à distance."
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
    duration: "Spéciale",
    raises: "Aucune",
    desc: "Dès l'incantation réussie de ce sort, vous pouvez immédiatement incanter un second sort (de n'importe quel élément) de Niveau de Maîtrise 3 ou inférieur. Si le jet d'incantation de ce second sort réussit, il est stocké en dormance en vous sans faire effet. Vous définissez un déclencheur physique précis (prononcer un mot, dégainer une lame, tomber inconscient). Dès que l'événement survient, le sort stocké se déclenche instantanément. Limité à un seul sort stocké à la fois."
  },
  {
    id: "eau-3-visions-future",
    name: "Visions du Futur (Visions of the Future)",
    element: "Eau",
    mastery: 3,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Aucune",
    desc: "Développé à l'origine par la famille Tonbo. Requiert une grande étendue d'eau calme dans laquelle vous devez plonger votre regard. Vous entrez dans une brève transe et contemplez des visions prophétiques d'événements à venir. Bien que souvent symboliques, ces visions sont infailliblement exactes et se produiront à moins qu'une intervention directe ne les empêche. Seul le lanceur peut voir les visions."
  },
  {
    id: "eau-3-walking-upon-waves",
    name: "Marcher sur les Flots (Walking Upon the Waves)",
    element: "Eau",
    mastery: 3,
    keywords: ["Voyage"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Cibles (+1 individu par Augmentation)",
    desc: "Permet au sujet de marcher et courir sur l'eau comme s'il s'agissait de terre ferme solide (Terrain Normal). Si la surface est agitée par une tempête ou de gros rouleaux, elle compte comme Terrain Difficile."
  },
  {
    id: "eau-3-water-kami-blessing",
    name: "Bénédiction du Kami d'Eau (Water Kami's Blessing)",
    element: "Eau",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "5 Rounds",
    raises: "Spéciale (votre Anneau d'Eau compte comme supérieur de 1 par 2 Augmentations)",
    desc: "La cible reçoit une compréhension aiguë de ce qui l'entoure. Elle bénéficie d'un bonus à tous ses jets basés sur le Trait Perception (qu'il s'agisse de jets de Trait, de Compétence ou d'opposition) sous la forme de dés lancés supplémentaires (+Xg0) en nombre égal à votre Anneau d'Eau."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 4 (6 sorts)
  // =========================================================================
  {
    id: "eau-4-dominion-suitengu",
    name: "Domaine de Suitengu (Dominion of Suitengu)",
    element: "Eau",
    mastery: 4,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "150 kilomètres (100 miles)",
    area: "Deux étendues d'eau",
    duration: "Concentration",
    raises: "Portée (+15 km / +10 miles)",
    desc: "Lie deux plans d'eau distants. En fixant une étendue d'eau devant vous, vous pouvez voir et entendre tout ce qui se déroule autour d'une autre étendue d'eau située à portée, comme si vous vous trouviez à sa surface."
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
    desc: "Accroît la mobilité des troupes. Tous les alliés affectés peuvent désormais effectuer une Action de Mouvement d'une distance maximale égale à leur (Anneau d'Eau × 3 mètres / 10') en tant qu'Action Gratuite (au lieu d'une Action Simple)."
  },
  {
    id: "eau-4-heart-water-dragon",
    name: "Cœur du Dragon de l'Eau (Heart of the Water Dragon)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 191",
    range: "7,5 mètres (25')",
    area: "Nombre d'individus ciblés égal au Rang d'École du lanceur (peut inclure le lanceur)",
    duration: "Nombre de rounds égal au Rang d'École du lanceur",
    raises: "Durée (+1 round), Soins (+1g0 soigné par 2 Augmentations)",
    desc: "Chaque fois qu'un individu protégé subit des dégâts pendant la durée du sort, les kami d'Eau réagissent instantanément et lui rendent 1g1 Blessures immédiatement après l'attaque."
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
    desc: "L'adaptabilité suprême de l'Eau. Avant d'incanter, vous choisissez un Anneau dans lequel vous vous affaiblissez et un Anneau dans lequel vous vous renforcez. Dès la fin du sort, vous pouvez transférer un certain nombre d'emplacements de sorts quotidiens inutilisés de l'Anneau affaibli vers l'Anneau renforcé. Dure 24 heures."
  },
  {
    id: "eau-4-strike-flowing-waters",
    name: "La Frappe des Eaux Vives (Strike of the Flowing Waters)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "3 mètres (10')",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "1 Round",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "La cible contourne les défenses physiques : ses attaques ignorent les bonus au ND d'Armure conférés par les armures portées, par les sorts de Niveau 3 ou moins et par les effets hors Techniques d'école. Contre les créatures sans armure, son ND d'Armure est réduit de 5. N'ignore ni la Réduction conférée par l'armure, ni les bonus de ND d'Armure issus des Postures Défense ou Défense Totale."
  },
  {
    id: "eau-4-symbol-water",
    name: "Symbole d'Eau (Symbol of Water)",
    element: "Eau",
    mastery: 4,
    keywords: ["Sceau"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Contact",
    area: "Spéciale (porte, fenêtre, passage)",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Grave un glyphe de garde sur un passage. Quiconque le franchit sans autorisation doit remporter un jet opposé de son Feu contre l'Eau du shugenja. En cas d'échec, la victime est saisie d'une terreur accablante et doit immédiatement surmonter un effet de Peur 7. Limité à un seul Symbole d'Eau actif par shugenja."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 5 (7 sorts)
  // =========================================================================
  {
    id: "eau-5-ever-changing-waves",
    name: "Vagues Changeantes (Ever-Changing Waves)",
    element: "Eau",
    mastery: 5,
    keywords: ["Illusion"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Heure",
    raises: "Durée (+1 heure)",
    desc: "Votre chair coule comme de l'eau : vous modifiez physiquement votre corps mortel pour prendre la forme exacte de n'importe quel animal naturel de Rokugan. Vous conservez vos Traits Mentaux. Pour vos Traits Physiques, vous prenez la valeur la plus haute entre les vôtres et ceux de l'animal. Vous gagnez également les sens et armes naturelles de la bête."
  },
  {
    id: "eau-5-final-bond",
    name: "L'Ultime Lien (The Final Bond)",
    element: "Eau",
    mastery: 5,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Spéciale",
    area: "Un objet ou un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Permet de localiser un objet ou une personne très intime (parent proche, conjoint, ami de longue date, ou objet manipulé pendant des années). Vous apprenez instantanément sa localisation approximative à travers l'Empire (par exemple : 'la ville de Ryoko Owari' ou 'le nord de la forêt Shinomen'). Échoue automatiquement si la cible est hors de Rokugan."
  },
  {
    id: "eau-5-hands-tides",
    name: "Les Mains des Marées (Hands of the Tides)",
    element: "Eau",
    mastery: 5,
    keywords: ["Bataille", "Voyage"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Rayon de 30 mètres (100') centré sur le lanceur",
    area: "Cibles consentantes jusqu'à concurrence de l'Anneau d'Eau du lanceur",
    duration: "Instantanée",
    raises: "Zone (+3 m / +10'), Cibles (+1 par 2 Augmentations)",
    desc: "Permet de permuter instantanément les positions physiques de plusieurs cibles consentantes à portée. À la fin du sort, chaque emplacement initialement occupé doit comporter un des participants, mais vous redistribuez leurs positions respectives selon votre bon vouloir."
  },
  {
    id: "eau-5-incline-willow",
    name: "Courber le Saule (Incline the Willow)",
    element: "Eau",
    mastery: 5,
    keywords: ["Défense"],
    source: "The Book of Water",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "À l'image du saule qui ploie sans rompre face au courant, vous déviez l'élan de vos agresseurs. Chaque fois qu'une attaque de mêlée réussie ou un sort à cible unique vous inflige des dégâts, vous pouvez effectuer un jet opposé d'Eau contre l'Attaque ou le jet d'incantation de l'assaillant. En cas de victoire, vous redirigez l'intégralité de l'attaque ou du sort contre une autre cible située à portée de l'assaillant (y compris l'attaquant lui-même)."
  },
  {
    id: "eau-5-power-ocean",
    name: "La Puissance de l'Océan (Power of the Ocean)",
    element: "Eau",
    mastery: 5,
    keywords: ["Défense"],
    source: "Livre des Règles L5R 4e, p. 192",
    range: "Contact",
    area: "Un individu consentant",
    duration: "Nombre de jours égal au Rang d'École du lanceur",
    raises: "Durée (+1 jour par 3 Augmentations)",
    desc: "Rituel complexe d'une heure. Pour toute la durée, la cible n'a plus besoin de manger, de boire ni de dormir. Un nombre de fois égal à votre Rang d'École pendant la durée du sort, le sujet peut reconstituer la totalité de ses points de Vide en dépensant une simple Action Simple (équivalent d'une nuit de repos). Elle guérit également d'un montant de Blessures par heure égal à (votre Anneau d'Eau × 2). Si la cible est un shugenja, elle regagne tous ses emplacements de sorts à chaque lever de soleil."
  },
  {
    id: "eau-5-suitengus-embrace",
    name: "L'Étreinte de Suitengu (Suitengu's Embrace)",
    element: "Eau",
    mastery: 5,
    keywords: ["Tonnerre"],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Remplit instantanément les poumons de la cible d'eau de mer glaciale. La cible est réduite à l'état de Blessure À Terre (Down) en termes d'actions et ne peut rien faire d'autre que tenter de résister. À chaque round, elle effectue un jet de Constitution (ND 15). Trois réussites cumulées lui permettent de rejeter l'eau et de récupérer. Deux échecs consécutifs la font sombrer dans l'inconscience (elle se noie et meurt en 1 minute sans secours magique ou médical, ce dernier nécessitant un jet de Médecine/Intelligence ND 50)."
  },
  {
    id: "eau-5-surge-water",
    name: "Poussée des Eaux (Surge of Water)",
    element: "Eau",
    mastery: 5,
    keywords: ["Bataille"],
    source: "The Book of Water",
    range: "30 mètres (100')",
    area: "Cône de 15 mètres (50') de long sur 6 mètres (20') de large à son extrémité",
    duration: "Instantanée",
    raises: "Dégâts (+1g0), Portée (+3 m / +10')",
    desc: "Une lame de fond fracassante jaillit de vos mains. Toutes les personnes situées dans le cône subissent 5g3 Blessures contondantes et doivent réussir un jet de Terre contre un ND égal au résultat de votre jet d'incantation sous peine d'être Renversées (Prone) et projetées à l'extrémité du cône."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 6 (4 sorts)
  // =========================================================================
  {
    id: "eau-6-peace-kami",
    name: "La Paix des Kami (Peace of the Kami)",
    element: "Eau",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "La bienveillance absolue du Dragon de l'Eau. La cible est instantanément guérie de toutes ses maladies, son métabolisme est totalement purgé de tous les poisons et toxines, et l'intégralité de ses Blessures est soignée sur-le-champ."
  },
  {
    id: "eau-6-rise-water",
    name: "Éveil de l'Eau (Rise, Water)",
    element: "Eau",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "9 mètres (30')",
    area: "Un esprit invoqué",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Invoque un colosse d'Eau de 3 mètres de haut. Il se déplace d'une distance de (Eau × 4,5 m / 15') par round et sature le sol sur 6 m autour de lui, transformant la zone en Terrain Difficile. Traits Physiques = votre Anneau d'Eau, Jiujutsu = moitié de votre Anneau d'Eau, VD des dégâts = Eau g Eau. Ses Blessures sont calculées avec une Terre égale à votre Eau (sans malus de blessures) et il possède le trait Invulnérable. Disparaît à 0 Blessure."
  },
  {
    id: "eau-6-tsunami",
    name: "Le Tsunami (Tsunami)",
    element: "Eau",
    mastery: 6,
    keywords: ["Bataille"],
    source: "The Book of Water",
    range: "1,5 kilomètre (1 mile) en présence d'une vaste étendue d'eau",
    area: "Front de vague de 100 mètres de large",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Requiert la proximité de la mer ou d'un très grand lac. Lève une onde de marée gigantesque qui s'abat sur le littoral ou la flotte ciblée. Tous les navires touchés chavirent ou sont brisés (dégâts de siège automatiques), les fortifications côtières subissent des dégâts colossaux et toutes les personnes sans abri submergées subissent 8g4 Blessures contondantes avec risque critique de noyade immédiate."
  },
  {
    id: "eau-6-waters-sweet-clarity",
    name: "Douce Clarté de l'Eau (Water's Sweet Clarity)",
    element: "Eau",
    mastery: 6,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "Personnelle",
    area: "Étendue d'eau ciblée",
    duration: "3 Rounds",
    raises: "Aucune",
    desc: "En concentrant votre énergie sur une étendue d'eau calme, vous posez une question sur l'avenir. L'eau révèle la réponse sous la forme de trois visions distinctes (événements chronologiques ou trois facettes d'un même fait). Contrairement aux autres divinations, toutes les personnes présentes peuvent contempler ces visions."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_EAU = SORTS_EAU;
}
