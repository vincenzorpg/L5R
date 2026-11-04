/**
 * data/sorts-vide-data.js — L5R 4e Édition
 * Recueil exhaustif officiel des sorts de Vide (Ishiken-dō).
 * Sources : Livre des Règles L5R 4e (p. 193-197), The Book of the Void & The Great Clans.
 */

const SORTS_VIDE = [
  // =========================================================================
  // NIVEAU DE MAÎTRISE 1
  // =========================================================================
  {
    id: "void-1-boundless-sight",
    name: "Vue Sans Frontières (Boundless Sight)",
    element: "Vide",
    mastery: 1,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 193",
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
    source: "Livre des Règles L5R 4e, p. 193",
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
    source: "Livre des Règles L5R 4e, p. 193",
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
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 193",
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
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "Personnelle",
    area: "Rayon de 7,5 mètres (25') autour du lanceur",
    duration: "Concentration",
    raises: "Portée (+1,5 m / +5' au rayon)",
    desc: "Tant que vous maintenez votre concentration, vous percevez le flux du Vide autour de vous. Vous apprenez instantanément le nombre exact de points de Vide actuellement en possession de chaque individu situé dans la zone d'effet."
  },
  {
    id: "void-1-touch-emptiness",
    name: "Toucher le Néant (Touch the Emptiness)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
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
    source: "Livre des Règles L5R 4e, p. 194",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Réagence brièvement le motif spirituel de la cible. Vous suspendez et neutralisez un Désavantage Mental ou Spirituel possédé par le sujet, d'une valeur maximale de 5 points. Ce sort ne peut en aucun cas supprimer la Souillure des Terres d'Ombre, mais il peut en suspendre temporairement les troubles mentaux dérivés."
  },
  {
    id: "void-1-witness-untold",
    name: "Témoin de l'Inexprimé (Witness the Untold)",
    element: "Vide",
    mastery: 1,
    keywords: ["Divination"],
    source: "The Book of the Void",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Round",
    raises: "Durée (+1 round)",
    desc: "Les courants de causalité murmurent à l'Ishiken les actions avant qu'elles ne s'accomplissent. Vous pouvez conserver votre action pour agir en interruption immédiate dès qu'un adversaire déclare ou commence son action, gagnant la préséance sur celle-ci."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 2
  // =========================================================================
  {
    id: "void-2-altering-course",
    name: "Modifier le Cours (Altering the Course)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
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
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 194",
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
    source: "Livre des Règles L5R 4e, p. 194",
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
    keywords: ["Illusion"],
    source: "Livre des Règles L5R 4e, p. 194",
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
    source: "Livre des Règles L5R 4e, p. 195",
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
    source: "Livre des Règles L5R 4e, p. 195",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Isole la cible du courant universel. Pour pouvoir dépenser le moindre point de Vide pendant la durée du sort, la victime doit remporter un jet opposé de Vide contre vous. Ce jet ne consomme pas d'action pour la cible, et elle n'a besoin de réussir qu'un seul jet opposé par tour, même si elle dispose de techniques lui permettant de dépenser plusieurs points de Vide."
  },
  {
    id: "void-2-unmake-mind",
    name: "Défaire l'Esprit (Unmake the Mind)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "The Book of the Void",
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Déconstruit temporairement la clarté cognitive de la cible en retirant un pan de son être du flux universel. La cible perd immédiatement l'accès à son Trait Mental le plus élevé : celui-ci est réduit à 1 pour toute la durée du sort. Elle peut tenter un jet opposé de Volonté contre votre Vide au début de chacun de ses tours pour mettre fin prématurément à cet effet."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 3
  // =========================================================================
  {
    id: "void-3-echoes-void",
    name: "Échos dans le Vide (Echoes in the Void)",
    element: "Vide",
    mastery: 3,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 195",
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
    source: "Livre des Règles L5R 4e, p. 195",
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
    source: "Livre des Règles L5R 4e, p. 195",
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
    source: "Livre des Règles L5R 4e, p. 195",
    range: "Personnelle",
    area: "Un objet ciblé",
    duration: "Instantanée (Spéciale)",
    raises: "Aucune",
    desc: "En entrant en communion avec l'empreinte laissée par un objet dans le Vide, vous apprenez son histoire complète : son créateur d'origine, les événements majeurs auxquels il a été associé, ses propriétaires successifs et la présence éventuelle de pouvoirs éveillés ou de malédictions (nemuranai)."
  },
  {
    id: "void-3-severing-flow",
    name: "Trancher le Flux (Severing the Flow)",
    element: "Vide",
    mastery: 3,
    keywords: ["Bataille"],
    source: "The Book of the Void",
    range: "15 mètres (50')",
    area: "Un individu ciblé",
    duration: "3 Rounds",
    raises: "Portée (+3 m / +10'), Durée (+1 round)",
    desc: "Coupe brutalement les liaisons entre l'esprit d'un shugenja et les kami élémentaires. Pendant toute la durée du sort, la cible ne peut plus dépenser d'emplacements de sorts ni canaliser de prières élémentaires, à moins de remporter un jet opposé de Vide contre le shugenja au début de son tour."
  },
  {
    id: "void-3-touch-of-void",
    name: "Le Toucher du Vide (Touch of the Void)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    source: "The Great Clans",
    range: "Contact",
    area: "Une créature ciblée",
    duration: "Instantanée",
    raises: "Spéciale (+1g0 dégâts par Augmentation)",
    desc: "Applique la vacuité absolue à la chair d'un adversaire par contact direct. La cible subit des dégâts ignorant totalement la Réduction avec une VD égale à (votre Anneau de Vide)g(votre Anneau de Vide). De plus, la victime perd immédiatement 1 point de Vide si elle en possède."
  },
  {
    id: "void-3-void-release",
    name: "Libération du Vide (Void Release)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Effectue un jet opposé de Vide contre la cible. En cas de succès, la cible perd 1 point de Vide et vous en gagnez 1. Vous transférez 1 point de Vide supplémentaire par tranche complète de 5 points par laquelle votre jet dépasse celui de la victime. Ces points temporaires peuvent dépasser votre total maximal mais disparaissent au bout d'une heure s'ils ne sont pas dépensés. Sans effet sur les créatures dépourvues de points de Vide."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 4
  // =========================================================================
  {
    id: "void-4-balance-elements",
    name: "Équilibre des Éléments (Balance of Elements)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
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
    source: "Livre des Règles L5R 4e, p. 196",
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
    source: "Livre des Règles L5R 4e, p. 196",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (passe à 3 m / 10' avec 3 Augmentations)",
    desc: "Purifie et revigore la réserve spirituelle interne d'un allié. La cible regagne immédiatement la totalité de ses points de Vide dépensés, jusqu'à concurrence de son maximum normal."
  },
  {
    id: "void-4-rend-soul",
    name: "Déchirer l'Âme (Rend the Soul)",
    element: "Vide",
    mastery: 4,
    keywords: ["Bataille"],
    source: "The Great Clans",
    range: "9 mètres (30')",
    area: "Une créature vivante ciblée",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10'), Dégâts (+1g1 par 2 Augmentations)",
    desc: "Déchire directement le lien karmique qui retient l'âme au corps mortel. Vous effectuez un jet opposé de votre Anneau de Vide contre la Terre de la cible. Si vous l'emportez, la cible subit 5g3 Blessures ignorant l'armure et la Réduction, et perd l'usage de son Anneau de Vide pendant un nombre de rounds égal à votre Rang d'École."
  },
  {
    id: "void-4-tether-void",
    name: "Le Lien du Vide (Tether to the Void)",
    element: "Vide",
    mastery: 4,
    keywords: ["Voyage"],
    source: "The Book of the Void",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "24 Heures",
    raises: "Durée (+12 heures)",
    desc: "Ancre l'essence du lanceur à un point précis dans le monde mortel. À n'importe quel moment durant la durée du sort, par une simple Action Simple, le shugenja peut se dissoudre dans le néant et réapparaître instantanément à l'endroit exact où le sort a été scellé, quelle que soit la distance qui l'en sépare."
  },
  {
    id: "void-4-void-strike",
    name: "Frappe du Vide (Void Strike)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "15 mètres (50')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Dégâts (+1g0 par tranche de 2 Augmentations)",
    desc: "L'enveloppe mortelle ne peut supporter qu'un contact direct limité avec le Vide pur. Ce sort foudroie la chair de la cible en lui infligeant des dégâts dont la VD est égale à votre Anneau de Vide (ex. : 4g4 avec Vide 4)."
  },
  {
    id: "void-4-ward-of-void",
    name: "Garde du Vide (Ward of the Void)",
    element: "Vide",
    mastery: 4,
    keywords: ["Défense", "Sceau"],
    source: "The Book of the Void",
    range: "Personnelle",
    area: "Rayon de 4,5 mètres (15') autour du lanceur",
    duration: "5 Rounds",
    raises: "Zone (+1,5 m de rayon), Durée (+1 round)",
    desc: "Établit un champ d'annulation cosmique. Tout sort lancé à l'intérieur de la zone ou traversant son périmètre (quel que soit son élément d'origine) voit son ND d'incantation augmenter de +(votre Anneau de Vide × 5)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 5
  // =========================================================================
  {
    id: "void-5-divide-soul",
    name: "Diviser l'Âme (Divide the Soul)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "L'Ishiken sépare son âme à travers le Vide pour exister en deux endroits distincts simultanément dans le monde mortel. Votre double apparaît à n'importe quel endroit situé dans votre champ de vision lors du lancement. Vous avez pleine conscience des deux corps et pouvez agir simultanément avec chacun comme deux individus distincts (un seul jet d'incantation de sort est toutefois permis par round au total). Les Blessures subies par les deux corps s'additionnent à la fin du sort ; si l'un des deux corps périt, vous mourez sur le coup."
  },
  {
    id: "void-5-purge-soul",
    name: "Purge de l'Âme (Purge the Soul)",
    element: "Vide",
    mastery: 5,
    keywords: ["Jade"],
    source: "The Great Clans",
    range: "Contact",
    area: "Une cible vivante",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "En exposant directement la trame karmique de la cible à l'énergie primordiale du Vide, vous brûlez les impuretés spirituelles. Efface définitivement 1 Rang complet de Souillure des Terres d'Ombre (ou un nombre de points de Souillure équivalent). Ce processus est extrêmement violent : la cible subit immédiatement 6g6 Blessures qui ignorent toute Réduction."
  },
  {
    id: "void-5-reforge",
    name: "Reforger (Reforge)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "Contact",
    area: "Un objet ciblé",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Prend un objet matériel unique et le métamorphose en un autre objet de taille comparable. Ne fonctionne que sur un objet de composition homogène (et non constitué de multiples pièces complexes assemblées). Sans effet sur la matière vivante. Cet effet permanent peut être inversé par une seconde incantation de Reforger sur le même objet, même par un autre Ishiken."
  },
  {
    id: "void-5-touch-void-dragon",
    name: "Le Toucher du Dragon du Vide (Touch of the Void Dragon)",
    element: "Vide",
    mastery: 5,
    keywords: ["Défense"],
    source: "The Book of the Void",
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "3 Rounds",
    raises: "Durée (+1 round)",
    desc: "Fait passer partiellement le sujet dans l'intangibilité du Vide. Le bénéficiaire devient totalement immunisé aux armes profanes, aux chutes et aux dégâts environnementaux. Seules les armes éveillées (nemuranai) et les attaques magiques directes peuvent lui porter préjudice pour la durée du sort."
  },
  {
    id: "void-5-unbound-essence",
    name: "Essence Déliée (Unbound Essence)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "1 Heure",
    raises: "Durée (+1 heure), Portée (+1,5 m / +5')",
    desc: "Bouleverse la structure fondamentale des cinq éléments de la cible : ses quatre Anneaux élémentaires sont réassignés aléatoirement entre eux pour toute la durée du sort (par exemple, son Air devient son Feu, et son Eau devient sa Terre). Les Traits physiques et mentaux qui étaient supérieurs à la valeur de base de l'Anneau sont échangés en miroir pour correspondre aux nouveaux Anneaux réattribués."
  },
  {
    id: "void-5-void-dragons-breath",
    name: "Le Souffle du Dragon du Vide (Void Dragon's Breath)",
    element: "Vide",
    mastery: 5,
    keywords: ["Bataille"],
    source: "The Book of the Void",
    range: "Personnelle",
    area: "Cône de 9 mètres (30') de long sur 6 mètres (20') de large",
    duration: "Instantanée",
    raises: "Dégâts (+1g1 par 2 Augmentations), Zone (+3 m en longueur)",
    desc: "Projette une onde de déconstruction pure issue des mâchoires du Dragon céleste. Toutes les créatures prises dans le cône subissent 6g4 Blessures ignorant la Réduction d'armure et doivent réussir un jet d'Agilité ND 25 sous peine d'être Renversées (Prone) et Assommées (Stunned) pendant 1 round."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 6
  // =========================================================================
  {
    id: "void-6-alter-destiny",
    name: "Altérer le Destin (Alter Destiny)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "The Great Clans",
    range: "Contact",
    area: "Une cible vivante",
    duration: "Instantanée (Rituel)",
    raises: "Aucune",
    desc: "Rituel solennel d'une journée qui réécrit la trame cosmique de la cible. Permet d'échanger de manière définitive un Avantage ou un Désavantage majeur possédé par le sujet contre un autre Avantage ou Désavantage de valeur équivalente en points d'expérience, sans perturber son équilibre karmique global."
  },
  {
    id: "void-6-ring-void",
    name: "L'Anneau du Vide (Ring of the Void)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Concentration (Rituel d'une heure d'incantation)",
    raises: "Temps d'incantation (-5 minutes par Augmentation)",
    desc: "Ce rituel transcendant ne s'apprend sur aucun parchemin mais s'éveille par illumination chez les maîtres de l'Ishiken-dō. Il permet d'entrer en communion directe avec le Dragon Céleste du Vide. Vous pouvez lui poser les questions de votre choix. Le Dragon du Vide sait tout ce qui peut être su, mais n'a aucune obligation de répondre directement. Un respect sacré absolu est exigé : ceux qui ont offensé le Dragon lors de cette transe ont tout bonnement cessé d'exister. Ne permet pas de ramener un mort à la vie."
  },
  {
    id: "void-6-rise-from-ashes",
    name: "Renaître de ses Cendres (Rise from the Ashes)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "The Book of the Void",
    range: "Contact",
    area: "Une créature vivante ciblée",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Le summum de la réharmonisation temporelle et spirituelle issue du Livre du Vide. En puisant au plus profond du Vide cosmique, l'Ishiken réinitialise l'état physique, mental et spirituel de la cible à ce qu'il était exactement 8 heures auparavant. Toutes les Blessures, poisons, maladies, états préjudiciables et points de Souillure accumulés durant ces 8 dernières heures sont instantanément effacés. L'incantation de ce sort draine immédiatement la totalité des points de Vide du lanceur, qui tombe inconscient pour une durée de 24 heures."
  },
  {
    id: "void-6-rise-void",
    name: "Éveil du Vide (Rise, Void)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "The Book of the Void",
    range: "9 mètres (30')",
    area: "Un esprit majeur invoqué",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Le pendant pour le Vide des sorts d'invoquation d'élémentaire colossal (Éveil de la Terre, de l'Air, du Feu ou de l'Eau). Invoque une entité titanesque faite d'énergie de Vide pure. Ses Traits Physiques et Mentaux sont tous égaux à votre Anneau de Vide. Elle attaque en Jiujutsu avec un score égal à votre Anneau de Vide, infligeant des dégâts de Vide g Vide ignorant la Réduction. Elle possède la capacité Invulnérable et encaisse les Blessures comme un être de Terre équivalente à votre Vide. Sa présence draine passivement 1 point de Vide par round à toute créature hostile à 6 mètres d'elle."
  },
  {
    id: "void-6-unmake-world",
    name: "Défaire le Monde (Unmake the World)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
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
