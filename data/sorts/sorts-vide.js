const SORTS_VIDE = [
  // --- NIVEAU DE MAÎTRISE 1 ---
  {
    id: "void-1-boundless-sight",
    name: "Vue Sans Frontières (Boundless Sight)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "80 kilomètres (50 miles)",
    area: "Le lanceur",
    duration: "4 Rounds",
    raises: "Durée (+1 round), Portée (+8 km / +5 miles)",
    desc: "En concentrant votre esprit à travers le Vide, vous observez et écoutez tout ce qui se produit dans un endroit précis que vous avez déjà visité au moins une fois dans votre vie. Vous ne pouvez pas interagir physiquement avec ce lieu ni y être détecté. Pendant toute la durée du sort, votre corps physique est plongé dans une transe léthargique réduisant votre ND d'Armure à 5."
  },
  {
    id: "void-1-drawing-void",
    name: "Puiser dans le Vide (Drawing the Void)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Instantanée",
    raises: "Spéciale (+1 point de Vide supplémentaire par tranche de 3 Augmentations)",
    desc: "Vous vous connectez à la source cosmique pour regagner immédiatement un nombre de points de Vide égal à (votre Rang d'École + 1). Si ces points dépassent votre maximum normal de réserve, vous perdez un point de Vide excédentaire au début de chaque round où vous n'en dépensez pas."
  },
  {
    id: "void-1-flow-void",
    name: "Couler à travers le Vide (Flow Through the Void)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "Contact",
    area: "Jusqu'à 0,03 m³ (1 pied cube) de matière élémentaire pure",
    duration: "Permanente",
    raises: "Zone (+0,03 m³ de matière par Augmentation)",
    desc: "Puisque tous les éléments ne font qu'un dans le Vide, vous permutez la nature d'un petit volume de matière élémentaire pure (eau, feu, air, ou terre sous forme d'humus ou de poussière) en un autre élément de votre choix."
  },
  {
    id: "void-1-see-through-lies",
    name: "Percer les Mensonges (See Through Lies)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Spéciale (+1 Avantage ou Désavantage supplémentaire découvert par Augmentation)",
    desc: "Les motifs karmiques des individus s'impriment dans le Vide. Vous apprenez immédiatement l'Avantage possédant la plus forte valeur en points de la cible, OU son Désavantage possédant la plus forte valeur en points (au choix du lanceur)."
  },
  {
    id: "void-1-sense-void",
    name: "Sentir le Vide (Sense Void)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "Personnelle",
    area: "Rayon de 7,5 mètres (25') autour du lanceur",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Tant que vous maintenez votre concentration, vous percevez le flux du Vide autour de vous. Vous apprenez instantanément le nombre exact de points de Vide actuellement en possession de chaque individu situé dans la zone d'effet."
  },
  {
    id: "void-1-touch-emptiness",
    name: "Toucher le Néant (Touch the Emptiness)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Fait ressentir à la cible le vertige absolu du néant cosmique. La victime subit 1g1 Blessures et acquiert immédiatement l'état Étourdi (Dazed)."
  },
  {
    id: "void-1-voids-caress",
    name: "La Caresse du Vide (The Void's Caress)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Réagence brièvement le motif spirituel de la cible. Vous suspendez et neutralisez un Désavantage Mental ou Spirituel possédé par le sujet, d'une valeur maximale de 5 points. Ce sort ne peut en aucun cas supprimer la Souillure des Terres d'Ombre, mais il peut en suspendre temporairement les troubles mentaux dérivés."
  },

  // --- NIVEAU DE MAÎTRISE 2 ---
  {
    id: "void-2-altering-course",
    name: "Modifier le Cours (Altering the Course)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Permet de canaliser le Vide de manière consciente plutôt qu'instinctive. Vous pouvez dépenser plusieurs points de Vide sur un même jet de dé effectué pendant la durée du sort (chaque point apportant son bonus habituel de +1g1). Le jet doit faire partie des catégories autorisant légalement la dépense de points de Vide (les jets de dégâts restent exclus)."
  },
  {
    id: "void-2-drink-essence",
    name: "Boire à ton Essence (Drink of Your Essence)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Sonde en profondeur la trame existentielle de la cible. Vous apprenez la valeur de chacun de ses Anneaux élémentaires (sans révéler les Traits individuels sous-jacents), ses malus de Blessures actuels, ainsi qu'un résumé en un seul mot de son humeur dominante actuelle (par exemple : 'hostile', 'mélancolique', 'confus')."
  },
  {
    id: "void-2-empty-voice",
    name: "La Voix Vide (The Empty Voice)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Minutes",
    raises: "Aucune",
    desc: "En puisant dans l'essence de toute chose, l'Ishiken transcende les prières orales. Pour toute la durée du sort, vous pouvez incanter des sorts issus des quatre autres Éléments sans avoir besoin de prononcer la moindre prière ou parole à voix haute. Cet effet ne s'applique qu'aux sorts de Niveau de Maîtrise égal ou inférieur (Maîtrise 1 ou 2)."
  },
  {
    id: "void-2-false-whispers",
    name: "Faux Murmures (False Whispers)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "1 Minute",
    raises: "Durée (+1 minute), Portée (+1,5 m / +5')",
    desc: "Sature l'esprit de la cible d'illusions auditives et de pensées déstabilisantes émanant du néant. La victime subit un malus de -2g2 sur tous ses jets d'Initiative, de Perception et de Compétences Sociales pour la durée du sort."
  },
  {
    id: "void-2-reach-void",
    name: "Toucher à travers le Vide (Reach Through the Void)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    range: "15 mètres (50')",
    area: "Un objet pesant jusqu'à 2,5 kg (5 livres)",
    duration: "Instantanée",
    raises: "Poids admissible (+0,5 kg / +1 livre par tranche de 2 Augmentations), Portée (+1,5 m / +5')",
    desc: "Toute chose existant au sein du Vide, vous pouvez interagir à distance avec un objet matériel sans le toucher physiquement. Vous pouvez faire léviter, tirer à vous ou manipuler un objet léger situé à portée."
  },
  {
    id: "void-2-severed-stream",
    name: "Coupé du Flux (Severed from the Stream)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Isole la cible du courant universel. Pour pouvoir dépenser le moindre point de Vide pendant la durée du sort, la victime doit remporter un jet opposé de Vide contre vous. Ce jet ne consomme pas d'action pour la cible, et elle n'a besoin de réussir qu'un seul jet opposé par tour, même si elle dispose de techniques lui permettant de dépenser plusieurs points de Vide."
  },

  // --- NIVEAU DE MAÎTRISE 3 ---
  {
    id: "void-3-echoes-void",
    name: "Échos dans le Vide (Echoes in the Void)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Concentration",
    raises: "Portée (+1,5 m / +5')",
    desc: "Tant que vous maintenez votre concentration sur un sujet à portée, les pensées actives de celui-ci résonnent dans votre esprit. La nature de ces pensées dépend de l'individu (des mots précis et tactiques chez un guerrier, des métaphores poétiques chez un artisan ou un courtisan)."
  },
  {
    id: "void-3-kharmic-intent",
    name: "Intention Karmique (Kharmic Intent)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    range: "6 mètres (20')",
    area: "Un individu consentant",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Portée (+1,5 m / +5')",
    desc: "Lie deux destins par un pont d'énergie cosmique. Les réserves de points de Vide restantes du shugenja et de la cible sont fusionnées en une réserve commune, dans laquelle chacun peut puiser librement selon ses besoins (y compris les points de Vide temporaires accordés par des sorts). À l'expiration du sort, les points restants sont redistribués à parts égales, dans la limite de leurs maxima respectifs."
  },
  {
    id: "void-3-moment-clarity",
    name: "Instant de Clarté (Moment of Clarity)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "2 Rounds",
    raises: "Durée (+1 round)",
    desc: "Toutes les connaissances humaines étant reflétées dans le Vide, vous choisissez n'importe quelle Compétence. Vous gagnez temporairement un nombre de rangs dans cette Compétence égal à votre Anneau de Vide. Si vous possédiez déjà des rangs dans cette compétence, ce nouveau score remplace le précédent (ils ne se cumulent pas)."
  },
  {
    id: "void-3-read-essence",
    name: "Lire l'Essence (Read the Essence)",
    element: "Vide",
    mastery: 3,
    keywords: ["Divination"],
    range: "Personnelle",
    area: "Un objet ciblé",
    duration: "Instantanée (Spéciale)",
    raises: "Aucune",
    desc: "En entrant en communion avec l'empreinte laissée par un objet dans le Vide, vous apprenez son histoire complète : son créateur d'origine, les événements majeurs auxquels il a été associé, ses propriétaires successifs et la présence éventuelle de pouvoirs éveillés ou de malédictions (nemuranai)."
  },
  {
    id: "void-3-void-release",
    name: "Libération du Vide (Void Release)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Effectue un jet opposé de Vide contre la cible. En cas de succès, la cible perd 1 point de Vide et vous en gagnez 1. Vous transférez 1 point de Vide supplémentaire par tranche complète de 5 points par laquelle votre jet dépasse celui de la victime. Ces points temporaires peuvent dépasser votre total maximal mais disparaissent au bout d'une heure s'ils ne sont pas dépensés. Sans effet sur les créatures dépourvues de points de Vide."
  },

  // --- NIVEAU DE MAÎTRISE 4 ---
  {
    id: "void-4-balance-elements",
    name: "Équilibre des Éléments (Balance of Elements)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "5 Rounds en combat / 5 Minutes hors combat",
    raises: "Durée (+1 round en combat / +1 minute hors combat), Soins (+1g1 Blessures par tranche de 2 Augmentations)",
    desc: "Rétablit l'harmonie parfaite dans la trame de l'individu. Tous les Désavantages du sujet sont annulés pour la durée du sort. De plus, les malus infligés par des sorts de Niveau de Maîtrise 3 ou inférieur (pénalités au ND, réduction de ND d'Armure, baisses de Traits ou d'Anneaux) sont dissipés. Cette réharmonisation soigne immédiatement 3g3 Blessures."
  },
  {
    id: "void-4-draw-closed-veil",
    name: "Tirer le Voile (Draw Closed the Veil)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    range: "15 mètres (50')",
    area: "Un esprit ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Cibles (+1 esprit par Augmentation)",
    desc: "Renforce la frontière entre les plans et bannit un esprit non originaire du royaume mortel de Ningen-dō vers son plan d'origine pour une durée minimale égale à (votre Anneau de Vide en mois). Les esprits incarnés dans un corps matériel (comme les oni ou métamorphes) nécessitent un jet opposé de Volonté pour être affectés. Les entités d'une puissance démesurée peuvent s'avérer immunisées à la discrétion du MJ."
  },
  {
    id: "void-4-fill-emptiness",
    name: "Remplir de Néant (Fill with Emptiness)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (passe à 3 m / 10' avec 3 Augmentations)",
    desc: "Purifie et revigore la réserve spirituelle interne d'un allié. La cible regagne immédiatement la totalité de ses points de Vide dépensés, jusqu'à concurrence de son maximum normal."
  },
  {
    id: "void-4-void-strike",
    name: "Frappe du Vide (Void Strike)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    range: "15 mètres (50')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Dégâts (+1g0 par tranche de 2 Augmentations)",
    desc: "L'enveloppe mortelle ne peut supporter qu'un contact direct limité avec le Vide pur. Ce sort foudroie la chair de la cible en lui infligeant des dégâts dont la VD est égale à votre Anneau de Vide (ex. : 4g4 avec Vide 4)."
  },

  // --- NIVEAU DE MAÎTRISE 5 ---
  {
    id: "void-5-divide-soul",
    name: "Diviser l'Âme (Divide the Soul)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "L'Ishiken sépare son âme à travers le Vide pour exister en deux endroits distincts simultanément dans le monde mortel. Votre double apparaît à n'importe quel endroit situé dans votre champ de vision lors du lancement. Vous avez pleine conscience des deux corps et pouvez agir simultanément avec chacun comme deux individus distincts (un seul jet d'incantation de sort est toutefois permis par round au total). Les Blessures subies par les deux corps s'additionnent à la fin du sort ; si l'un des deux corps périt, vous mourez sur le coup."
  },
  {
    id: "void-5-reforge",
    name: "Reforger (Reforge)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    range: "Contact",
    area: "Un objet ciblé",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Prend un objet matériel unique et le métamorphose en un autre objet de taille comparable. Ne fonctionne que sur un objet de composition homogène (et non constitué de multiples pièces complexes assemblées). Sans effet sur la matière vivante. Cet effet permanent peut être inversé par une seconde incantation de Reforger sur le même objet, même par un autre Ishiken."
  },
  {
    id: "void-5-unbound-essence",
    name: "Essence Déliée (Unbound Essence)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "1 Heure",
    raises: "Durée (+1 heure), Portée (+1,5 m / +5')",
    desc: "Bouleverse la structure fondamentale des cinq éléments de la cible : ses quatre Anneaux élémentaires sont réassignés aléatoirement entre eux pour toute la durée du sort (par exemple, son Air devient son Feu, et son Eau devient sa Terre). Les Traits physiques et mentaux qui étaient supérieurs à la valeur de base de l'Anneau sont échangés en miroir pour correspondre aux nouveaux Anneaux réattribués."
  },

  // --- NIVEAU DE MAÎTRISE 6 ---
  {
    id: "void-6-ring-void",
    name: "L'Anneau du Vide (Ring of the Void)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Concentration (Rituel d'une heure d'incantation)",
    raises: "Temps d'incantation (-5 minutes par Augmentation)",
    desc: "Ce rituel transcendant ne s'apprend sur aucun parchemin mais s'éveille par illumination chez les maîtres de l'Ishiken-dō. Il permet d'entrer en communion directe avec le Dragon Céleste du Vide. Vous pouvez lui poser les questions de votre choix. Le Dragon du Vide sait tout ce qui peut être su, mais n'a aucune obligation de répondre directement. Un respect sacré absolu est exigé : ceux qui ont offensé le Dragon lors de cette transe ont tout bonnement cessé d'exister. Ne permet pas de ramener un mort à la vie."
  },
  {
    id: "void-6-unmake-world",
    name: "Défaire le Monde (Unmake the World)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    range: "15 mètres (50')",
    area: "Une créature, individu ou objet ciblé",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10')",
    desc: "Le pouvoir le plus terrifiant de l'Ishiken : anéantit les liaisons élémentaires reliant la matière à l'existence. Sur un objet non magique, la cible cesse instantanément d'exister sans laisser de trace. Sur un objet éveillé (nemuranai), des effets cataclysmiques peuvent survenir à la discrétion du MJ. Lancé contre une créature vivante, vous devez remporter un jet opposé de votre Vide contre sa Terre : en cas de réussite, la créature est tuée sur le coup et ses restes disparaissent à jamais dans le néant."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_VIDE = SORTS_VIDE;
}
