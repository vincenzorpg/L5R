const SORTS_EAU = [
  // --- NIVEAU DE MAÎTRISE 1 ---
  {
    id: "eau-1-path-inner-peace",
    name: "La Voie vers la Paix Intérieure (Path to Inner Peace)",
    element: "Eau",
    mastery: 1,
    keywords: ["Guérison"],
    range: "Contact",
    area: "Une créature vivante ciblée",
    duration: "Instantanée",
    raises: "Cibles (+1 individu par 2 Augmentations), Spéciale (+1g0 au jet de guérison par Augmentation)",
    desc: "Vous canalisez la pureté régénératrice de l'Eau dans le corps de la cible. Vous lui rendez un nombre de Blessures égal à 1g1, augmenté de +1g1 supplémentaire par tranche de deux Rangs d'École au-dessus du premier (soit 2g2 au Rang 3, 3g3 au Rang 5). Si la cible était Évanouie ou au rang Hors de Combat, ce sort la stabilise immédiatement. Un même sujet peut bénéficier de ce sort plusieurs fois par jour, mais chaque incantation successive sur la même cible dans une période de 24 heures augmente le ND du sort de +5 cumulatif."
  },
  {
    id: "eau-1-reflections-pan-ku",
    name: "Les Reflets de P'an Ku (Reflections of P'an Ku)",
    element: "Eau",
    mastery: 1,
    keywords: ["Divination"],
    range: "Contact",
    area: "Un miroir ou une surface réfléchissante",
    duration: "1 Heure",
    raises: "Durée (+1 heure par Augmentation)",
    desc: "En observant attentivement un miroir ou un plan d'eau calme, vous pouvez contempler les événements passés qui se sont déroulés devant cette surface, jusqu'à un nombre de jours révolus égal à votre Anneau d'Eau. De plus, ce sort dissipe toute illusion visuelle reflétée : la surface montre la véritable apparence de tout ce qui s'y reflète, ignorant les déguisements magiques ou le maquillage trompeur."
  },
  {
    id: "eau-1-reversal-fortunes",
    name: "Renversement de Fortune (Reversal of Fortunes)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    range: "3 mètres",
    area: "Un individu ciblé",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m)",
    desc: "L'adaptabilité est l'apanage de l'Eau. Pendant la durée du sort, la cible gagne le droit de relancer immédiatement un jet de dés de son choix par round. La décision doit être prise dès que le résultat du premier jet est connu, et la cible a le droit de conserver le meilleur des deux résultats."
  },
  {
    id: "eau-1-sympathetic-energies",
    name: "Énergies Sympathiques (Sympathetic Energies)",
    element: "Eau",
    mastery: 1,
    keywords: [],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "10 Minutes",
    raises: "Durée (+5 minutes), Portée (passe à 1,5 m avec 1 Augmentation)",
    desc: "Établit un pont énergétique entre votre organisme et celui de la cible. Vous pouvez transférer vos propres ressources vitales : vous pouvez lui accorder des points de Vide issus de votre propre réserve (jusqu'à votre Rang d'École) ou transférer ses Blessures sur vous-même, point pour point (vous subissez ces Blessures, qui ne peuvent être réduites par aucune armure ni Réduction)."
  },
  {
    id: "eau-1-rushing-wave",
    name: "La Vague Déferlante (The Rushing Wave)",
    element: "Eau",
    mastery: 1,
    keywords: ["Voyage"],
    range: "3 mètres",
    area: "Une créature ciblée",
    duration: "Instantanée",
    raises: "Portée (+1,5 m), Cibles (+1 individu par 2 Augmentations)",
    desc: "Un violent flux d'eau surge sous les pieds de la cible et la projette en avant. La cible est déplacée en ligne droite d'une distance maximale égale à (son Anneau d'Eau × 1,5 m). Ce déplacement n'est pas une Action de Mouvement, ne consomme pas l'action du round de la cible et ne déclenche pas d'attaques d'opportunité."
  },

  // --- NIVEAU DE MAÎTRISE 2 ---
  {
    id: "eau-2-bo-water",
    name: "Bō d'Eau (Bō of Water)",
    element: "Eau",
    mastery: 2,
    keywords: ["Artisanat"],
    range: "Personnelle ou 6 mètres",
    area: "Une arme créée",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0), Durée (+5 min), Portée (+1,5 m)",
    desc: "Façonne un bâton de combat (bō) fait d'eau sous forte pression (VD 1g2). Si vous ne maîtrisez pas la compétence Bâtons, vous pouvez substituer votre Rang d'École à cette compétence. Si vous possédez la compétence Bâtons, vous bénéficiez d'une Augmentation Gratuite pour la manœuvre Renversement (Knockdown) ou Désarmement. L'arme s'évapore si elle quitte vos mains. Vous pouvez également la faire apparaître directement dans les mains d'un allié situé à portée (il ne reçoit toutefois pas l'Augmentation Gratuite)."
  },
  {
    id: "eau-2-fog-green-net",
    name: "La Brume du Filet Vert (Fog of the Green Net)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    range: "9 mètres",
    area: "Rayon de 9 mètres autour du point ciblé",
    duration: "1 Heure",
    raises: "Zone (+3 m de rayon), Durée (+1 heure), Portée (+3 m)",
    desc: "Fait monter une brume moite chargée de condensats visqueux. Toute créature vivante pénétrant dans la zone ou y débutant son tour doit réussir un jet de Terre (ND 15) ou voir son Anneau d'Eau considéré comme réduit de 1 pour ses déplacements et ses tests physiques tant qu'elle demeure dans la brume, ses mouvements devenant lourds et empesés."
  },
  {
    id: "eau-2-rejuvenating-vapors",
    name: "Vapeurs Régénératrices (Rejuvenating Vapors)",
    element: "Eau",
    mastery: 2,
    keywords: ["Guérison"],
    range: "Personnelle",
    area: "Rayon de 3 mètres autour du lanceur",
    duration: "Concentration",
    raises: "Zone (+1,5 m de rayon)",
    desc: "Une vapeur tiède et réparatrice émane de vos mains. Tant que vous maintenez votre concentration, toutes les créatures alliées au repos dans la zone récupèrent 1g1 Blessures par minute et dissipent immédiatement l'état Fatigué causé par le manque de sommeil ou un effort prolongé."
  },
  {
    id: "eau-2-wave-borne-speed",
    name: "Vitesse Portée par les Vagues (Wave-Borne Speed)",
    element: "Eau",
    mastery: 2,
    keywords: ["Voyage"],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "10 Rounds",
    raises: "Durée (+2 rounds), Cibles (+1 individu par 2 Augmentations)",
    desc: "Le courant de l'Eau anime la démarche de la cible. Pour toute la durée du sort, son Anneau d'Eau effectif est augmenté de +2 pour calculer la distance qu'elle peut parcourir lors de ses Actions de Mouvement, et elle gagne un bonus de +1g0 à tous ses jets d'Initiative."
  },
  {
    id: "eau-2-wisdom-clarity",
    name: "Sagesse et Clarté (Wisdom and Clarity)",
    element: "Eau",
    mastery: 2,
    keywords: [],
    range: "Contact",
    area: "Une créature ciblée",
    duration: "1 Heure",
    raises: "Durée (+1 heure), Cibles (+1 créature par 2 Augmentations)",
    desc: "L'esprit de la cible devient semblable à une eau limpide. Vous augmentez temporairement l'un des deux Traits d'Eau de la cible (Force ou Perception, au choix lors de l'incantation) de 1 point. Cela n'augmente pas la valeur de son Anneau d'Eau, mais s'applique à tous les jets, compétences et jets dérivés utilisant ce Trait."
  },

  // --- NIVEAU DE MAÎTRISE 3 ---
  {
    id: "eau-3-castle-water",
    name: "Château d'Eau (Castle of Water)",
    element: "Eau",
    mastery: 3,
    keywords: ["Défense"],
    range: "3 mètres",
    area: "Dôme protecteur d'un rayon de 3 mètres",
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
    keywords: ["Défense"],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "10 Rounds",
    raises: "Durée (+2 rounds)",
    desc: "La température interne de la cible s'effondre et sa peau se couvre d'une fine couche de givre durci. Elle bénéficie d'une Réduction de dégâts de 5. Quiconque porte une attaque à mains nues ou avec des armes naturelles contre elle subit immédiatement 2g2 Blessures dues au froid intense."
  },
  {
    id: "eau-3-silent-waters",
    name: "Eaux Silencieuses (Silent Waters)",
    element: "Eau",
    mastery: 3,
    keywords: ["Défense"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Spéciale",
    raises: "Aucune",
    desc: "La mémoire de l'océan sait attendre son heure. Dès l'incantation réussie de ce sort, vous pouvez immédiatement lancer un second sort (de n'importe quel élément) de Niveau de Maîtrise 3 ou moins. Si le jet de ce second sort est un succès, il est stocké en sommeil en vous sans déclencher ses effets. Vous spécifiez un déclencheur physique précis (prononcer un mot, dégainer une lame, tomber à terre, etc.). Dès que l'événement survient, le sort stocké s'active instantanément. Vous ne pouvez avoir qu'un seul Eaux Silencieuses actif à la fois."
  },
  {
    id: "eau-3-walking-upon-waters",
    name: "Marcher sur les Eaux (Walking Upon the Waters)",
    element: "Eau",
    mastery: 3,
    keywords: ["Voyage"],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "1 Heure",
    raises: "Durée (+1 heure), Cibles (+1 individu par 2 Augmentations)",
    desc: "Permet au sujet de marcher, courir et combattre sur n'importe quelle surface liquide (rivière, lac, mer agitée) exactement comme s'il s'agissait d'une terre ferme solide. La cible ne s'enfonce jamais et ne souffre pas de malus lié au courant."
  },

  // --- NIVEAU DE MAÎTRISE 4 ---
  {
    id: "eau-4-ebb-flow-battle",
    name: "Le Flux et Reflux du Combat (Ebb & Flow of Battle)",
    element: "Eau",
    mastery: 4,
    keywords: ["Bataille"],
    range: "Personnelle",
    area: "Tous les alliés désignés dans un rayon de 15 mètres autour du lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round par 2 Augmentations)",
    desc: "La mobilité est la plus grande force de l'Eau. Tous les alliés affectés peuvent désormais effectuer une Action de Mouvement égale à leur (Anneau d'Eau × 3 mètres) en tant qu'Action Gratuite à chaque round (ce qui nécessite normalement une Action Simple)."
  },
  {
    id: "eau-4-strike-flowing-waters",
    name: "La Frappe des Eaux Vives (Strike of the Flowing Waters)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    range: "3 mètres",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "1 Round",
    raises: "Durée (+1 round), Portée (+1,5 m)",
    desc: "L'Eau s'insinue dans chaque faille sans rencontrer de résistance. Pendant la durée du sort, les attaques de la cible ignorent tous les bonus conférés au ND d'Armure de ses adversaires par les armures portées, par les sorts de Niveau de Maîtrise 3 ou inférieur et par les effets mécaniques non issus de Techniques d'école. Contre les créatures ne portant pas d'armure, le ND d'Armure de la créature est réduit de 5."
  },
  {
    id: "eau-4-hands-tides",
    name: "Les Mains des Marées (Hands of the Tides)",
    element: "Eau",
    mastery: 4,
    keywords: [],
    range: "30 mètres",
    area: "Un volume d'eau allant jusqu'à (Anneau d'Eau × 15 m³)",
    duration: "Concentration",
    raises: "Portée (+15 m), Volume (+5 m³ par Augmentation)",
    desc: "Vous imposez votre volonté aux cours d'eau et aux étendues liquides. Vous pouvez écarter les flots pour former une tranchée sèche et praticable à pied, soulever un courant marin violent, calmer instantanément des remous ou générer un puissant tourbillon capable de faire chavirer des barques légères."
  },
  {
    id: "eau-4-symbol-water",
    name: "Symbole d'Eau (Symbol of Water)",
    element: "Eau",
    mastery: 4,
    keywords: ["Sceau"],
    range: "Contact",
    area: "Spéciale (une porte, fenêtre ou passage)",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Grave un glyphe mystique sur une ouverture. Quiconque tente de franchir le seuil sans y être autorisé déclenche une libération torrentielle : l'intrus doit réussir un jet opposé de Force contre l'Anneau d'Eau du shugenja ou subir 3g3 Blessures contondantes, être projeté à 3 mètres en arrière et se retrouver Renversé et Assommé (Stunned) pour 1 round. Un seul Symbole d'Eau peut être actif à la fois par lanceur."
  },

  // --- NIVEAU DE MAÎTRISE 5 ---
  {
    id: "eau-5-power-ocean",
    name: "La Puissance de l'Océan (Power of the Ocean)",
    element: "Eau",
    mastery: 5,
    keywords: ["Bataille"],
    range: "Personnelle ou Contact",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Les profondeurs océaniques transmettent leur force inexorable à la cible. Son Trait de Force augmente d'une valeur égale à l'Anneau d'Eau du lanceur, ses attaques de mêlée infligent +2g2 de dégâts supplémentaires et elle devient totalement insensible aux effets de Fatigue et aux manœuvres de Renversement (Knockdown)."
  },
  {
    id: "eau-5-incline-willow",
    name: "Courber le Saule (Incline the Willow)",
    element: "Eau",
    mastery: 5,
    keywords: ["Défense"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "À l'image du saule qui ploie sans rompre, vous déviez l'élan de vos agresseurs. Chaque fois qu'une attaque de mêlée réussie ou un sort à cible unique vous inflige des dégâts, vous pouvez effectuer un jet opposé d'Eau contre l'Attaque ou le jet d'Incantation de l'assaillant. En cas de victoire, vous redirigez l'intégralité de l'attaque ou du sort contre une autre cible située à portée de l'assaillant (y compris l'attaquant lui-même)."
  },
  {
    id: "eau-5-surge-water",
    name: "Poussée des Eaux (Surge of Water)",
    element: "Eau",
    mastery: 5,
    keywords: [],
    range: "30 mètres",
    area: "Cône de 15 mètres de long sur 6 mètres de large à son extrémité",
    duration: "Instantanée",
    raises: "Dégâts (+1g0), Portée (+3 m)",
    desc: "Une lame de fond fracassante jaillit de vos mains. Toutes les personnes situées dans le cône subissent 5g3 Blessures contondantes et doivent réussir un jet de Terre contre un ND égal au résultat de votre jet d'Incantation ou être Renversées et projetées à l'extrémité du cône."
  },

  // --- NIVEAU DE MAÎTRISE 6 ---
  {
    id: "eau-6-rise-water",
    name: "Éveil de l'Eau (Rise, Water)",
    element: "Eau",
    mastery: 6,
    keywords: [],
    range: "9 mètres",
    area: "Un esprit majeur invoqué",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Invoque un colosse d'Eau de 3 mètres de haut. Il possède tous ses Traits physiques égaux à votre Anneau d'Eau, attaque avec un rang en Jiujutsu égal à la moitié de votre Anneau d'Eau et inflige des dégâts égaux à (Eau)g(Eau). Le colosse éteint instantanément tout feu non magique dans un rayon de 6 mètres, noie les créatures terrestres qu'il agrippe et possède la capacité Invulnérable. Ses Blessures correspondent à celles d'un humain dont la Terre équivaut à votre Eau (sans pénalités de blessures). Il est dissipé lorsqu'il est réduit à 0 Blessure."
  },
  {
    id: "eau-6-waters-sweet-clarity",
    name: "Douce Clarté de l'Eau (Water's Sweet Clarity)",
    element: "Eau",
    mastery: 6,
    keywords: ["Guérison"],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "La grâce absolue des kami de l'Eau s'écoule à travers vous pour purifier l'organisme. La cible est instantanément guérie de tous ses Rangs de Blessures subis (elle revient à son état intact sans aucune séquelle). Toutes les maladies (naturelles ou magiques), poisons, toxines, cécités ou surdités non permanentes qui l'affectaient sont immédiatement purgés et dissipés."
  },
  {
    id: "eau-6-tsunami",
    name: "Le Tsunami (Tsunami)",
    element: "Eau",
    mastery: 6,
    keywords: ["Bataille"],
    range: "1,5 kilomètre (en présence d'une vaste étendue d'eau)",
    area: "Front de vague de 100 mètres de large",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Requiert la proximité de la mer ou d'un très grand lac. Lève une onde de marée gigantesque qui s'abat sur le littoral ou la flotte ciblée. Tous les navires touchés chavirent ou sont brisés (dégâts de siège automatiques), les fortifications côtières subissent des dégâts colossaux et toutes les personnes sans abri submergées subissent 8g4 Blessures contondantes avec risque critique de noyade immédiate."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_EAU = SORTS_EAU;
}
