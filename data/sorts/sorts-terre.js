/**
 * data/sorts-terre-data.js — L5R 4e Édition
 * Recueil exhaustif officiel de la Magie de la Terre.
 * Sources : Livre de Base V4 (p. 173-180) et The Book of Earth (p. 197-201).
 */

const SORTS_TERRE = [
  // =========================================================================
  // NIVEAU DE MAÎTRISE 1
  // =========================================================================
  {
    id: "earth-1-armor-earth",
    name: "Armure de Terre (Armor of Earth)",
    element: "Terre",
    mastery: 1,
    keywords: ["Bataille", "Défense"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Rounds",
    raises: "Durée (+2 rounds par Augmentation)",
    source: "Livre de Base (p. 173)",
    desc: "Infuse la force de la Terre dans votre organisme, affaiblissant l'impact des coups physiques et magiques. Vous gagnez une Réduction de dégâts égale à (Anneau de Terre + Rang d'École). En contrepartie, votre corps s'alourdit : votre Anneau d'Eau effectif est réduit de 1 pour vos déplacements tant que le sort dure."
  },
  {
    id: "earth-1-courage-thunders",
    name: "Courage des Sept Tonnerres (Courage of the Seven Thunders)",
    element: "Terre",
    mastery: 1,
    keywords: ["Bataille"],
    range: "Personnelle",
    area: "Nombre de cibles à 9 m (30') égal au Rang d'École du shugenja",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Cibles (+1)",
    source: "Livre de Base (p. 173)",
    desc: "Insuffle le courage inébranlable des Sept Tonnerres aux sujets (qui peuvent inclure le lanceur). Les cibles gagnent un bonus de +5g0 à tous leurs jets pour résister aux effets de Peur (naturels ou magiques). Les samouraïs n'appartenant pas aux sept Clans Majeurs originels ne reçoivent qu'un bonus de +3g0. Quiconque possède au moins un plein Rang de Souillure ne peut bénéficier du sort. Deux shugenja ou plus connaissant ce sort peuvent s'unir en rituel pour additionner leur plus haut Rang de Terre à la somme de leurs Rangs d'École pour le nombre de cibles."
  },
  {
    id: "earth-1-stagnation",
    name: "Stagnation de la Terre (Earth's Stagnation)",
    element: "Terre",
    mastery: 1,
    keywords: [],
    range: "15 mètres (50')",
    area: "Une cible",
    duration: "6 Rounds",
    raises: "Durée (+2 rounds), Portée (+3 m / +10'), Cibles (+1, max 4 cibles au total)",
    source: "Livre de Base (p. 174)",
    desc: "Appelle la Terre contenue dans le corps de la cible pour l'alourdir et entraver ses gestes. La cible subit un malus de -2g0 à tous ses jets basés sur le Trait Agilité, et son Anneau d'Eau est considéré comme réduit de 1 pour calculer ses distances de déplacement."
  },
  {
    id: "earth-1-earths-touch",
    name: "Le Toucher de la Terre (Earth's Touch)",
    element: "Terre",
    mastery: 1,
    keywords: ["Défense"],
    range: "Contact",
    area: "Une cible",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Cibles (+1 par 2 Augmentations, max 3 cibles au total)",
    source: "Livre de Base (p. 174)",
    desc: "Invoque les kami de Terre pour fortifier la santé physique ou l'endurance mentale de la cible (qui peut être le lanceur). L'un des deux Traits de Terre de la cible (au choix de l'incantateur : Constitution ou Volonté) augmente de +1 pour la durée du sort. Cela n'augmente pas la valeur de l'Anneau de Terre en lui-même."
  },
  {
    id: "earth-1-elemental-ward",
    name: "Garde Élémentaire (Elemental Ward)",
    element: "Terre",
    mastery: 1,
    keywords: ["Sceau"],
    range: "Contact",
    area: "Une cible",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Cibles (+1 par 2 Augmentations)",
    source: "Livre de Base (p. 174)",
    desc: "Les esprits de Terre créent un rempart autour de l'âme et du corps de la cible, repoussant les intrusions élémentaires hostiles. Lors du lancement, vous choisissez un élément spécifique (hors Vide et Mahō). Tous les sorts de cet élément ciblant la personne protégée voient leur ND d'incantation pénalisé de +(Rang d'École × 5). Cette pénalité s'applique également aux sorts bénéfiques alliés (comme la guérison d'Eau)."
  },
  {
    id: "earth-1-jade-strike",
    name: "Frappe de Jade (Jade Strike)",
    element: "Terre",
    mastery: 1,
    keywords: ["Jade", "Tonnerre"],
    range: "30 mètres (100')",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Dégâts (+1g0), Portée (+3 m / +10'), Cibles (+1 cible, max 5 cibles au total)",
    source: "Livre de Base (p. 174)",
    desc: "Libère les esprits purs de jade sous la forme d'un trait d'énergie verte irisée qui frappe infailliblement la cible sans pouvoir être dévié physiquement. Si la cible possède au moins un plein Rang de Souillure de l'Outremonde, le sort inflige une VD de 3g3 blessures, calcinant les chairs impures. Si la cible a moins d'un plein Rang de Souillure, elle ne subit absolument aucun dégât."
  },
  {
    id: "earth-1-jurojins-balm",
    name: "Le Baume de Jurojin (Jurojin's Balm)",
    element: "Terre",
    mastery: 1,
    keywords: [],
    range: "Contact",
    area: "Une cible",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Cibles (+1 par 2 Augmentations, max 5 cibles au total)",
    source: "Livre de Base (p. 174)",
    desc: "Remplit l'organisme de la vigueur de la Terre afin de chasser impuretés et toxines. Si la cible est exposée à un poison ou une toxine durant le sort (ou en subit déjà les effets), elle peut relancer tout jet de Constitution raté pour y résister, avec un bonus de +2g0 sur le second jet. Le sort purge également l'ivresse et empêche la cible d'être intoxiquée par l'alcool pendant toute la durée."
  },
  {
    id: "earth-1-minor-binding",
    name: "Lien Mineur (Minor Binding)",
    element: "Terre",
    mastery: 1,
    keywords: ["Artisanat"],
    range: "18 mètres (60')",
    area: "Une cible souillée",
    duration: "2 Heures",
    raises: "Durée (+1 heure), Portée (+6 m / +20')",
    source: "Livre de Base (p. 174)",
    desc: "Pionnier chez les Kuni pour emprisonner et interroger les engeances de l'Outremonde. Toute créature de l'Outremonde ayant un Anneau de Terre de 3 ou moins peut être ciblée. Elle est ligotée par des liens de terre et incapable d'agir. Sans effet sur les Perdus (Lost), les Seigneurs Oni ou leurs rejetons, les créatures de Terre 4+, ou les êtres non souillés."
  },
  {
    id: "earth-1-tetsubo-earth",
    name: "Tetsubō de Terre (Tetsubo of Earth)",
    element: "Terre",
    mastery: 1,
    keywords: ["Artisanat", "Jade"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Une arme créée",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0), Durée (+5 minutes), Portée (+1,5 m / +5')",
    source: "Livre de Base (p. 175)",
    desc: "Matérialise un tetsubō de terre dense constellé de blocs de pierre (VD 2g2). Une Augmentation permet de lui donner la forme de n'importe quelle autre arme lourde. Vous pouvez utiliser votre Rang d'École à la place de la compétence Armes Lourdes pour la manier. Si vous possédez la compétence Armes Lourdes, l'arme confère une Augmentation Gratuite pour la manœuvre Renversement (Knockdown). Disparaît si elle quitte vos mains. Vous pouvez la faire apparaître dans les mains d'un allié à 6 m (il n'obtient pas l'Augmentation Gratuite)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 2
  // =========================================================================
  {
    id: "earth-2-be-mountain",
    name: "Être la Montagne (Be the Mountain)",
    element: "Terre",
    mastery: 2,
    keywords: ["Défense"],
    range: "9 mètres (30')",
    area: "Une créature ciblée (allié volontaire)",
    duration: "4 Rounds",
    raises: "Durée (+1 round)",
    source: "Livre de Base (p. 175)",
    desc: "Variante de l'Armure de Terre conçue pour protéger autrui. Les kami enveloppent la peau de l'allié d'une croûte rocheuse qui repousse les impacts physiques : la cible gagne une Réduction de dégâts égale à (5 × Rang d'École du shugenja), plafonnée à un maximum de 20. En contrepartie, la cible ne peut plus entreprendre d'Actions de Mouvement Simples (les Actions de Mouvement Gratuites demeurent autorisées)."
  },
  {
    id: "earth-2-earth-becomes-sky",
    name: "La Terre Devient Ciel (Earth Becomes Sky)",
    element: "Terre",
    mastery: 2,
    keywords: ["Jade", "Tonnerre"],
    range: "30 mètres (100')",
    area: "Une créature ciblée",
    duration: "Instantanée",
    raises: "Dégâts (+1g0), Cibles (+1 créature), Spéciale (imprégner les rochers de Jade avec 2 Augmentations)",
    source: "Livre de Base (p. 175)",
    desc: "Arrache plusieurs volumineux blocs de pierre du sol pour les projeter avec une précision infaillible sur la cible. Les dégâts ont une VD égale à votre Anneau de Terre. Si plusieurs cibles sont visées, la VD de dégâts subie par chaque cible est réduite de -1g1 par cible supplémentaire (avec un minimum de 1g1 par cible). Ces rochers sont profanes, mais 2 Augmentations permettent de les saturer d'essence de Jade."
  },
  {
    id: "earth-2-embrace-kenro",
    name: "L'Étreinte de Kenro-Ji-Jin (Embrace of Kenro-Ji-Jin)",
    element: "Terre",
    mastery: 2,
    keywords: ["Voyage"],
    range: "Personnelle ou Contact",
    area: "Une créature ciblée",
    duration: "1 Heure",
    raises: "Durée (+30 minutes)",
    source: "Livre de Base (p. 176)",
    desc: "Permet au sujet de plonger dans le sol et la roche, qui deviennent aussi limpides et praticables que de l'eau. Il voit à travers la terre sur 90 mètres (100 yards) et s'y déplace dans toutes les directions aussi facilement qu'à l'air libre. Il peut voir la surface depuis le sous-sol, mais ne peut parler, attaquer, lancer de sorts ou interagir avec l'extérieur sans en émerger complètement (ce qui met fin au sort). Si le sort expire sous terre, les esprits expulsent immédiatement le sujet à l'air libre le plus proche."
  },
  {
    id: "earth-2-force-will",
    name: "Force de Volonté (Force of Will)",
    element: "Terre",
    mastery: 2,
    keywords: ["Bataille"],
    range: "15 mètres (50')",
    area: "Une cible",
    duration: "2 Rounds",
    raises: "Durée (+1 round, max 4 rounds au total)",
    source: "Livre de Base (p. 176)",
    desc: "Les kami renforcent la volonté de vivre du sujet à un degré surhumain. Pendant toute la durée du sort, la cible est totalement immunisée contre les pénalités et effets de tous les Rangs de Blessures — y compris l'état de mort clinique si son rang Hors de Combat est rempli. À l'expiration du sort, l'intégralité des blessures et conséquences accumulées reprennent immédiatement leurs droits."
  },
  {
    id: "earth-2-grasp-earth",
    name: "L'Étreinte de la Terre (Grasp of Earth)",
    element: "Terre",
    mastery: 2,
    keywords: [],
    range: "15 mètres (50')",
    area: "Une cible",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5'), Cibles (+1 par 2 Augmentations)",
    source: "Livre de Base (p. 176)",
    desc: "Une colossale serre rocheuse surgit du sol pour agripper la victime. Celle-ci ne peut plus se déplacer que d'un maximum de 1 mètre (3') par round en dépensant une Action de Mouvement Simple, et ne peut plus faire d'Action Gratuite de mouvement. La cible peut briser la prise en réussissant, au prix d'une Action Complexe, un jet brut de Force contre un ND égal à (5 × Anneau de Terre du shugenja)."
  },
  {
    id: "earth-2-hands-clay",
    name: "Mains d'Argile (Hands of Clay)",
    element: "Terre",
    mastery: 2,
    keywords: ["Voyage"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Minutes",
    raises: "Durée (+5 minutes)",
    source: "Livre de Base (p. 176)",
    desc: "Insuffle des esprits telluriques dans vos mains et vos pieds pour fusionner avec la matière du bois, de la terre et de la roche. Vous pouvez marcher et grimper sur des parois verticales (murs, falaises) à la moitié de votre vitesse de déplacement normale. Vous pouvez également vous suspendre aux plafonds, votre déplacement y étant alors limité à 1 mètre (3') par Action Simple."
  },
  {
    id: "earth-2-jurojins-curse",
    name: "La Malédiction de Jurojin (Jurojin's Curse)",
    element: "Terre",
    mastery: 2,
    keywords: [],
    range: "Contact",
    area: "Une créature ciblée",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Portée (passe à 9 m / 30' pour 3 Augmentations)",
    source: "The Book of Earth (p. 198)",
    desc: "Perturbe les défenses telluriques naturelles de la cible. Tout jet de Constitution effectué par la cible pour résister aux poisons, drogues, toxines ou maladies subit une pénalité de -2g0 pour toute la durée du sort."
  },
  {
    id: "earth-2-mountains-feet",
    name: "Les Pieds de la Montagne (The Mountain's Feet)",
    element: "Terre",
    mastery: 2,
    keywords: ["Défense"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Une cible",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Cibles (+1 par 2 Augmentations)",
    source: "Livre de Base (p. 176)",
    desc: "Enracine fermement les pieds du sujet dans la pierre et l'humus. Il gagne un bonus de +3g0 pour résister à toutes les manœuvres de Renversement (Knockdown). Tout sort tentant de renverser la cible, de la soulever dans les airs ou de rompre son lien au sol doit remporter un jet opposé de l'Élément du sort contre l'Anneau de Terre du lanceur."
  },
  {
    id: "earth-2-whispers-land",
    name: "Murmures de la Terre (Whispers of the Land)",
    element: "Terre",
    mastery: 2,
    keywords: [],
    range: "Centré sur le lanceur",
    area: "Rayon de 15 mètres (50')",
    duration: "10 Minutes",
    raises: "Zone (+15 m / +50' de rayon), Durée (+5 min), Période sonder (+1 jour de traces par 2 Augmentations)",
    source: "The Book of Earth (p. 201)",
    desc: "Développé par les Kitsune. Les esprits de la Terre révèlent l'empreinte et le passage récent de toute créature ayant foulé le sol dans la zone au cours des dernières 24 heures, indiquant son espèce, sa direction et le moment de son passage."
  },
  {
    id: "earth-2-wholeness-world",
    name: "L'Intégrité du Monde (Wholeness of the World)",
    element: "Terre",
    mastery: 2,
    keywords: ["Défense"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Une créature ciblée",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Portée (+1,5 m / +5'), Cibles (+1 par 2 Augmentations)",
    source: "Livre de Base (p. 177)",
    desc: "Rend les Anneaux et Traits de la cible immuables face aux altérations extérieures. Tout effet physique ou magique (sorts, poisons, capacités surnaturelles) tentant d'augmenter ou de diminuer ses Traits ou ses Anneaux élémentaires échoue automatiquement tant que le sort demeure actif."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 3
  // =========================================================================
  {
    id: "earth-3-bonds-ningendo",
    name: "Les Liens de Ningen-dō (Bonds of Ningen-Do)",
    element: "Terre",
    mastery: 3,
    keywords: ["Sceau"],
    range: "150 mètres (500')",
    area: "Une créature spirituelle ciblée",
    duration: "30 Jours",
    raises: "Durée (+1 jour), Portée (+3 m / +10'), Cibles (+1 par 2 Augmentations)",
    source: "Livre de Base (p. 177)",
    desc: "Rituel destiné à bannir ou emprisonner des entités extra-planaires issues des Royaumes de Sakkaku, Chikushudō, Gaki-dō, Toshigoku ou Yume-dō. L'incantation de base requiert 10 minutes. Chaque shugenja additionnel participant au rituel réduit ce temps de 1 minute (avec un temps incompressible minimum de 1 minute)."
  },
  {
    id: "earth-3-earth-dragon-ward",
    name: "Garde du Dragon de Terre (Earth Dragon's Ward)",
    element: "Terre",
    mastery: 3,
    keywords: ["Sceau"],
    range: "Contact",
    area: "Une cible vivante",
    duration: "24 Heures",
    raises: "Durée (+12 heures), Cibles (+1 par 2 Augmentations)",
    source: "The Book of Earth (p. 197)",
    desc: "Protège l'esprit du sujet contre toute possession spirituelle ou démoniaque. Tant que le sort est actif, aucune entité spirituelle, fantôme ou démon ne peut posséder le corps ou l'esprit de la cible."
  },
  {
    id: "earth-3-earth-kami-blessing",
    name: "Bénédiction du Kami de Terre (Earth Kami's Blessing)",
    element: "Terre",
    mastery: 3,
    keywords: ["Bataille"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Le lanceur ou une créature ciblée",
    duration: "10 Minutes",
    raises: "Durée (+1 minute)",
    source: "Livre de Base (p. 177)",
    desc: "Fortifie la structure corporelle et la résolution du sujet. Il gagne +2 Blessures supplémentaires sur chaque Rang de Blessure (augmentant d'autant sa réserve vitale totale), et reçoit un bonus de +1g1 sur tous ses jets basés sur l'Anneau de Terre et ses Traits associés. À l'expiration du sort, les Blessures subies demeurent et peuvent précipiter la cible dans un Rang critique ou la tuer sur le coup."
  },
  {
    id: "earth-3-earths-protection",
    name: "Protection de la Terre (Earth's Protection)",
    element: "Terre",
    mastery: 3,
    keywords: ["Défense", "Sceau"],
    range: "Personnelle",
    area: "Rayon de 3 mètres (10') autour du shugenja",
    duration: "Concentration",
    raises: "Zone (+1,5 m de rayon par 2 Augmentations, max 9 m / 30'), Dégâts absorbés (+1g1 supplémentaire pour 2 Augmentations)",
    source: "Livre de Base (p. 177)",
    desc: "Bouclier protecteur atténuant les effets des trois autres Éléments (Air, Feu, Eau). Tout sort hostile de ces trois éléments incanté dans la zone ou y projetant ses effets subit un malus de +10 au ND de son jet d'incantation. De plus, les dégâts infligés par ces sorts aux créatures situées dans l'aire d'effet sont réduits de 1g1 (avec un minimum de 1g1 infligé)."
  },
  {
    id: "earth-3-groves-stone",
    name: "Bosquets de Pierre (Groves of Stone)",
    element: "Terre",
    mastery: 3,
    keywords: ["Artisanat", "Défense"],
    range: "Centré sur le lanceur",
    area: "Barrière circulaire de 4,5 mètres (15') de rayon",
    duration: "10 Rounds",
    raises: "Zone (+1,5 m de rayon par 2 Augmentations), Durée (+2 rounds), Escalade (+5 au ND pour franchir par Augmentation)",
    source: "The Book of Earth (p. 198)",
    desc: "Fait jaillir instantanément du sol un anneau circulaire de monolithes massifs autour du shugenja, brisant planchers et obstacles. Ces pierres ont 500 Blessures et Réduction 15 contre les engins de siège. Escalader la barrière requiert une Action Complexe et un jet d'Athlétisme / Force contre un ND égal à (Terre du lanceur × 5)."
  },
  {
    id: "earth-3-murmur-earth",
    name: "Murmure de la Terre (Murmur of Earth)",
    element: "Terre",
    mastery: 3,
    keywords: [],
    range: "Contact",
    area: "Rayon de 30 mètres (100') autour du lanceur",
    duration: "1 Round",
    raises: "Zone (+15 m / +50' de rayon), ND (+5 au ND par 2 Augmentations)",
    source: "The Book of Earth (p. 199)",
    desc: "Déclenche une secousse sismique brutale dans toute la zone (le lanceur restant sur un socle stable). Quiconque s'y trouve doit réussir un jet d'Agilité ND 20 ou tomber À Terre (Prone), subir 1g1 Blessures et être Étourdi (Dazed) pour 1 round. En règles de siège, inflige 4g2 dégâts aux structures en ignorant leur Réduction."
  },
  {
    id: "earth-3-sharing-strength",
    name: "Partager la Force du Nombre (Sharing the Strength of Many)",
    element: "Terre",
    mastery: 3,
    keywords: [],
    range: "9 mètres (30')",
    area: "1 à 6 personnes désignées à portée (peut inclure le lanceur)",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    source: "Livre de Base (p. 177)",
    desc: "Relie mystiquement l'endurance d'un groupe. Pour la durée du sort, le score de l'Anneau de Terre le plus bas parmi tous les bénéficiaires est ajouté en bonus numérique au total de tous leurs jets d'Anneaux, de Traits et de Compétences (ce bonus ne s'applique pas aux jets d'incantation de sorts)."
  },
  {
    id: "earth-3-strength-crow",
    name: "La Force du Corbeau (Strength of the Crow)",
    element: "Terre",
    mastery: 3,
    keywords: ["Jade"],
    range: "Contact",
    area: "Une cible (peut être le lanceur)",
    duration: "Nombre d'heures égal au Rang d'École du lanceur",
    raises: "Durée (+1 heure), Cibles (+1)",
    source: "Livre de Base (p. 178)",
    desc: "Repousse la corruption de Jigoku par la pureté de la Terre. La cible bénéficie d'un bonus exceptionnel de +5g5 à tous ses jets effectués pour résister à l'acquisition de la Souillure des Terres d'Ombre (n'aide pas à purger une Souillure déjà existante, ni à se protéger du contrecoup du lancement de sorts de Mahō). De plus, tout sort de Mahō ciblant le sujet subit un malus de +10 à son ND d'incantation."
  },
  {
    id: "earth-3-strike-stone",
    name: "Frapper comme la Pierre (Strike as Stone)",
    element: "Terre",
    mastery: 3,
    keywords: ["Bataille"],
    range: "Personnelle ou Contact",
    area: "Une cible (peut être le lanceur)",
    duration: "5 Minutes",
    raises: "Durée (+1 minute)",
    source: "The Book of Earth (p. 200)",
    desc: "Rend les mains et avant-bras de la cible aussi durs que du granit. Ses mains sont immunisées aux blessures physiques directes (permettant par exemple de forcer une serrure ou de briser du métal à mains nues), et sa VD de dégâts à mains nues augmente de +2g0."
  },
  {
    id: "earth-3-time-deadly-hand",
    name: "La Main Funeste du Temps (Time's Deadly Hand)",
    element: "Terre",
    mastery: 3,
    keywords: [],
    range: "Contact",
    area: "Un objet physique",
    duration: "Permanente",
    raises: "Portée (passe de Contact à 15 m / 50' avec 3 Augmentations)",
    source: "The Book of Earth (p. 201)",
    desc: "Les esprits de Terre désertent l'objet touché, provoquant son vieillissement accéléré : le bois se fêle, la pierre et le fer deviennent friables et cassants, les étoffes tombent en lambeaux. Sans effet sur les objets éveillés (nemuranai)."
  },
  {
    id: "earth-3-wolfs-mercy",
    name: "La Miséricorde du Loup (The Wolf's Mercy)",
    element: "Terre",
    mastery: 3,
    keywords: [],
    range: "15 mètres (50')",
    area: "Une créature ciblée",
    duration: "10 Rounds",
    raises: "Portée (+3 m / +10'), Cibles (+1)",
    source: "Livre de Base (p. 178)",
    desc: "Sort célèbre employé par Toturi Sezaru. Alourdit les membres et la vitalité tellurique de la cible : son Anneau de Terre est réduit de 1 Rang et ses Rangs de Blessures diminuent en conséquence (pouvant entraîner une mort immédiate si elle est déjà gravement touchée). De plus, son Trait de Force est également diminué de 1. Si la victime possède au moins 1 plein Rang de Souillure, la punition des esprits est plus sévère : son Anneau de Terre est réduit de 2 Rangs (minimum 1)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 4
  // =========================================================================
  {
    id: "earth-4-armor-emperor",
    name: "L'Armure de l'Empereur (Armor of the Emperor)",
    element: "Terre",
    mastery: 4,
    keywords: ["Défense"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+2 rounds)",
    source: "Livre de Base (p. 178)",
    desc: "Enveloppe le shugenja d'un blindage d'esprits de terre résistant à tout préjudice. Chaque fois que le lanceur subit des dégâts provenant d'une attaque ennemie (physique ou magique), le total de chaque dé individuel de dégâts est diminué de la valeur de son Rang d'École de Shugenja. Aucun dé ne peut être réduit en deçà de 0."
  },
  {
    id: "earth-4-earth-flows",
    name: "La Terre Ondule (The Earth Flows)",
    element: "Terre",
    mastery: 4,
    keywords: ["Bataille"],
    range: "Centré sur le lanceur",
    area: "2,5 km² (1 square mile)",
    duration: "1 Heure (ou 2 rounds de Bataille de Masse)",
    raises: "Durée (+30 min ou +1 tour de bataille par 2 Augmentations)",
    source: "The Book of Earth (p. 200)",
    desc: "Développé par la famille Kitsu. Réorganise la topographie du champ de bataille à l'avantage des troupes du shugenja (pentes favorables pour charger, goulets protecteurs). Confère un bonus de +3g2 au jet de commandement de votre général en Bataille de Masse, et +1g1 sur le Tableau de Bataille pour chaque samouraï de votre camp."
  },
  {
    id: "earth-4-essence-earth",
    name: "Essence de Terre (Essence of Earth)",
    element: "Terre",
    mastery: 4,
    keywords: ["Bataille"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Une créature ciblée (le lanceur ou autrui)",
    duration: "10 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5'), Cibles (+1 par 2 Augmentations), Spéciale (+1 Rang de Terre par 2 Augmentations, max +3 Rangs)",
    source: "Livre de Base (p. 178)",
    desc: "Insuffle la véritable stature tellurique à la cible. Pour toute la durée, l'Anneau de Terre de la cible est augmenté de +1 Rang effectif, et ses Rangs de Blessures sont recalculés à la hausse. À l'expiration du sort, les esprits quittent le corps et les jauges de Blessures reviennent à la normale, ce qui peut provoquer la mort immédiate si la cible a essuyé de lourdes attaques."
  },
  {
    id: "earth-4-maw-earth",
    name: "La Gueule de la Terre (Maw of the Earth)",
    element: "Terre",
    mastery: 4,
    keywords: ["Bataille"],
    range: "12 mètres (40')",
    area: "Rayon de 3 mètres (10')",
    duration: "Permanente",
    raises: "Portée (+6 m / +20'), Profondeur et dégâts (+3 m de profondeur et +1g1 dégâts par 2 Augmentations)",
    source: "The Book of Earth (p. 199)",
    desc: "La terre s'ouvre d'un coup sec sous forme d'une fosse de 6 mètres de profondeur (20'). Quiconque est dans la zone doit réussir un jet de Réflexes opposé à la Terre du lanceur ou tomber dans la fosse en subissant 3g2 dégâts d'impact. En escalader les parois requiert une Action Complexe et un jet d'Athlétisme / Force contre un ND égal à la profondeur en pieds (ND 20 de base)."
  },
  {
    id: "earth-4-sapphire-strike",
    name: "Frappe de Saphir (Sapphire Strike)",
    element: "Terre",
    mastery: 4,
    keywords: ["Jade", "Cristal", "Tonnerre"],
    range: "15 mètres (50')",
    area: "Une créature ciblée",
    duration: "Instantanée",
    raises: "Portée (+6 m / +20'), Cibles (+1), Dégâts (+1g1)",
    source: "The Book of Earth (p. 199)",
    desc: "Créé par les Kuni lors de la Guerre contre l'Ombre. Projette un éclat aveuglant d'énergie cristalline bleue. Inflige 4g3 Blessures ignorant la Réduction contre les serviteurs de l'Ombre Rampante (Lying Darkness), les ninjas de l'Ombre et les créatures de l'Outremonde souillées."
  },
  {
    id: "earth-4-symbol-earth",
    name: "Symbole de Terre (Symbol of Earth)",
    element: "Terre",
    mastery: 4,
    keywords: ["Sceau"],
    range: "Contact",
    area: "Spéciale (un passage, porte, fenêtre ou portail)",
    duration: "Permanente",
    raises: "Dégâts (+1g0)",
    source: "Livre de Base (p. 179)",
    desc: "Grave un glyphe de garde sur un passage. Quiconque le franchit sans autorisation subit un jet opposé de son Air contre la Terre du lanceur. En cas d'échec, une onde de choc tellurique frappe l'intrus qui doit réussir un jet de Force contre le total du jet d'incantation initial du symbole ou se retrouver Renversé (Prone) et Assommé (Stunned). Si l'intrus possède au moins un plein Rang de Souillure, il subit de surcroît 2g2 Blessures. Un seul Symbole de Terre actif par shugenja à la fois."
  },
  {
    id: "earth-4-tomb-jade",
    name: "Le Tombeau de Jade (Tomb of Jade)",
    element: "Terre",
    mastery: 4,
    keywords: ["Jade"],
    range: "15 mètres (50')",
    area: "Une créature ciblée",
    duration: "Concentration",
    raises: "Portée (+3 m / +10'), Spéciale (+1g1 au jet opposé par Augmentation)",
    source: "Livre de Base (p. 179)",
    desc: "Arme suprême contre les créatures de l'Outremonde ayant au moins un plein Rang de Souillure (sans effet sur les êtres purs). À chaque round au tour du shugenja, un jet opposé de Terre est réalisé contre la cible. Si le shugenja l'emporte, la corruption de la victime commence à se cristalliser en jade : elle subit 3g3 Blessures ignorant la Réduction et reste immobilisée. Si la cible succombe à ces blessures, son corps est définitivement pétrifié en une statue de jade pur."
  },
  {
    id: "earth-4-wall-earth",
    name: "Mur de Terre (Wall of Earth)",
    element: "Terre",
    mastery: 4,
    keywords: ["Défense"],
    range: "30 mètres (100')",
    area: "Mur atteignant jusqu'à 3 m (10') de haut et 30 m (100') de long",
    duration: "10 Minutes",
    raises: "Dimensions (+30 cm en hauteur ou +3 m en longueur par Augmentation), Durée (+1 minute), Portée (+3 m / +10')",
    source: "Livre de Base (p. 179)",
    desc: "Fait jaillir du sol un puissant rempart de roche et d'humus compacté dont vous choisissez la configuration (linéaire, incurvée ou circulaire). Le mur est capable de retenir une inondation, de la lave ou des vents de tempête. Pour y percer une brèche physique, un assaillant doit réussir un test de Force brute contre un ND égal à [(Anneau de Terre + Rang d'École) × 5]. Le mur s'effondre en poussière dès expiration du sort."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 5
  // =========================================================================
  {
    id: "earth-5-drawing-mountain",
    name: "Puiser dans la Montagne (Drawing on the Mountain)",
    element: "Terre",
    mastery: 5,
    keywords: ["Bataille", "Défense"],
    range: "90 mètres (300')",
    area: "Une structure ciblée (jusqu'à la taille d'un petit château)",
    duration: "1 Jour",
    raises: "Portée (+45 m par Augmentation), Zone (+1 structure pour 3 Augmentations), Durée (+1 jour pour 3 Augmentations)",
    source: "The Book of Earth (p. 197)",
    desc: "Infuse l'essence indestructible des montagnes dans une forteresse ou un rempart. La structure devient totalement insensible aux inondations, séismes et tirs d'engins de siège conventionnels."
  },
  {
    id: "earth-5-earthquake",
    name: "Tremblement de Terre (Earthquake)",
    element: "Terre",
    mastery: 5,
    keywords: [],
    range: "Personnelle",
    area: "Rayon d'1,5 km (1 mile) centré sur le lanceur",
    duration: "1 Minute",
    raises: "Zone (+450 m / +500 yards de rayon), Durée (+1 minute par 2 Augmentations)",
    source: "Livre de Base (p. 180)",
    desc: "Déchaîne un séisme terrifiant dont le lanceur est le seul épargné. Le séisme détruit totalement tous les édifices en bois de la zone et inflige d'immenses dégâts aux structures en pierre. Toutes les personnes dans l'aire d'effet sont projetées à terre, restent Renversées (Prone) et Assommées (Stunned) pour toute la durée, et subissent 2g1 Blessures. Les individus se trouvant à l'intérieur de bâtiments subissent 6g6 Blessures dues aux chutes de gravats et effondrements. Lancer ce sort près d'une zone habitée est considéré comme un acte de guerre."
  },
  {
    id: "earth-5-grounding-energy",
    name: "Énergie d'Ancrage (Grounding Energy)",
    element: "Terre",
    mastery: 5,
    keywords: ["Défense", "Sceau"],
    range: "Centré sur le lanceur",
    area: "Le lanceur et tous les alliés dans un rayon de 6 mètres (20')",
    duration: "3 Rounds",
    raises: "Durée (+1 round par 2 Augmentations)",
    source: "The Book of Earth (p. 198)",
    desc: "Créé par les Yogo. Ancre fermement le groupe dans les flux telluriques purs : tout sort de magie du sang (Mahō) ciblant le lanceur ou un allié protégé dans la zone voit son ND de lancement augmenter d'un montant égal à (Terre de la cible × 10)."
  },
  {
    id: "earth-5-kamis-strength",
    name: "La Force des Kami (The Kami's Strength)",
    element: "Terre",
    mastery: 5,
    keywords: ["Bataille"],
    range: "9 mètres (30')",
    area: "Une créature ciblée",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+3 m / +10')",
    source: "Livre de Base (p. 180)",
    desc: "Renforce considérablement la résistance physique d'un individu. Le sujet gagne une Réduction de dégâts fixe de 20. De plus, son Trait de Force ainsi qu'un autre Trait physique au choix du lanceur sont augmentés d'une valeur égale à l'Anneau de Terre du shugenja. En contrepartie, le sujet est si lourdement ancré qu'il ne peut entreprendre aucune Action de Mouvement Simple (les Actions Gratuites de mouvement restent permises)."
  },
  {
    id: "earth-5-kamis-will",
    name: "La Volonté des Kami (The Kami's Will)",
    element: "Terre",
    mastery: 5,
    keywords: ["Défense"],
    range: "9 mètres (30')",
    area: "Une créature ciblée",
    duration: "10 Rounds",
    raises: "Durée (+1 round), Portée (+3 m / +10')",
    source: "Livre de Base (p. 180)",
    desc: "Miroir spirituel de La Force des Kami : le sujet est imprégné de l'obstination absolue de la Terre. Son Trait de Volonté augmente d'une valeur égale à l'Anneau de Terre du lanceur. Tout sort élémentaire (ami ou hostile, à l'exception des sorts de Mahō) le ciblant subit un malus de -XgX à son jet d'incantation (où X est l'Anneau de Terre du lanceur). En contrepartie, son intransigeance lui inflige une pénalité de -Xg0 à tous ses jets de Compétences Sociales."
  },
  {
    id: "earth-5-strike-roots",
    name: "Frapper aux Racines (Strike at the Roots)",
    element: "Terre",
    mastery: 5,
    keywords: [],
    range: "15 mètres (50')",
    area: "Une créature ciblée",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+3 m / +10'), Cibles (+1 par 2 Augmentations), Spéciale (+1g1 au jet opposé par Augmentation)",
    source: "Livre de Base (p. 180)",
    desc: "Forme suprême de La Miséricorde du Loup qui siphonne l'essence vitale de la cible. Après l'incantation, vous effectuez un jet opposé de Terre contre chaque cible. Si la cible échoue, son Anneau de Terre est immédiatement réduit à 1 pour toute la durée du sort. Ses Rangs de Blessures s'effondrent immédiatement au prorata de cette nouvelle valeur, ce qui peut provoquer sa mort instantanée si elle a déjà essuyé des blessures."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 6
  // =========================================================================
  {
    id: "earth-6-essence-jade",
    name: "Essence de Jade (Essence of Jade)",
    element: "Terre",
    mastery: 6,
    keywords: ["Défense", "Jade"],
    range: "9 mètres (30')",
    area: "Une créature ciblée",
    duration: "10 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5'), Cibles (+1 par 2 Augmentations, max 3 cibles au total)",
    source: "Livre de Base (p. 180)",
    desc: "Appelle la pureté sacrée du jade pour repousser les tares de Jigoku. Le sujet irradie d'une lueur d'émeraude : il ne peut contracter le moindre point de Souillure et devient intégralement immunisé à tous les sorts et effets issus de la magie du sang (Mahō). Ce sort ne peut jamais cibler un individu portant un plein Rang de Souillure ou plus (les kami de jade se détournent avec horreur, révélant instantanément sa corruption au lanceur)."
  },
  {
    id: "earth-6-power-earth-dragon",
    name: "Pouvoir du Dragon de la Terre (Power of the Earth Dragon)",
    element: "Terre",
    mastery: 6,
    keywords: ["Défense"],
    range: "15 mètres (50')",
    area: "Une créature ciblée",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Portée (+3 m / +10'), Cibles (+1), Spéciale (capacité d'absorption +10 Blessures par Augmentation)",
    source: "Livre de Base (p. 180)",
    desc: "Le summum des protections physiques de la Terre : place le sujet sous la tutelle directe du Dragon Élémentaire de la Terre. Les kami absorbent l'intégralité des dommages physiques ou magiques subis par le bénéficiaire. Les armes éveillées (nemuranai) peuvent toutefois contourner cette protection. Si les esprits absorbent un total cumulé de 100 Blessures sur une cible donnée, leur pouvoir s'épuise et le sort prend fin prématurément pour cette cible."
  },
  {
    id: "earth-6-prison-earth",
    name: "Prison de Terre (Prison of Earth)",
    element: "Terre",
    mastery: 6,
    keywords: ["Sceau"],
    range: "9 mètres (30')",
    area: "Une créature ciblée",
    duration: "Permanente",
    raises: "Portée (+1,5 m / +5'), Spéciale (+1g1 au jet opposé par Augmentation)",
    source: "Livre de Base (p. 180)",
    desc: "Le sort de scellement ultime des shugenja de la Terre. Permet d'emprisonner définitivement l'essence d'une entité spirituelle hostile au sein d'une gemme ou d'une perle tenue en main par le shugenja (à la discrétion du MJ, une boîte à secret ou un pendentif de cristal taillé peuvent servir de réceptacle). Le sort peut cibler n'importe quel être originaire de Jigoku, Gaki-dō ou Toshigoku, ou toute créature non humaine possédant au moins 1 plein Rang de Souillure. Nécessite de remporter un jet opposé de Volonté contre l'entité."
  },
  {
    id: "earth-6-rise-earth",
    name: "Éveil de la Terre (Rise, Earth)",
    element: "Terre",
    mastery: 6,
    keywords: [],
    range: "9 mètres (30')",
    area: "Un esprit invoqué",
    duration: "Concentration",
    raises: "Aucune",
    source: "Livre de Base (p. 180)",
    desc: "Invoque un colosse de terre et de roc haut de 3 mètres qui obéit à vos ordres mentaux. Il se déplace d'une distance de (Terre × 3 m) par round. Il possède tous ses Traits physiques égaux à votre Anneau de Terre, attaque en Jiujutsu avec un rang égal à la moitié de votre Anneau de Terre et inflige des dégâts d'une VD de Terre g Terre. Il possède une Réduction de 15, est Invulnérable et encaisse les Blessures comme un humain dont l'Anneau de Terre équivaudrait au vôtre (sans subir aucune pénalité de blessure). Il est banni s'il est réduit à 0 Blessure. Ne peut être invoqué au même endroit plus d'une fois par mois."
  },
  {
    id: "earth-6-soldiers-clay",
    name: "Soldats d'Argile (Soldiers of Clay)",
    element: "Terre",
    mastery: 6,
    keywords: ["Artisanat", "Bataille", "Jade"],
    range: "30 mètres (100')",
    area: "Spéciale",
    duration: "1 Heure",
    raises: "Durée (+30 minutes), Soldats (+2 soldats créés par Augmentation)",
    source: "The Book of Earth (p. 200)",
    desc: "Invoque une troupe de 10 guerriers d'argile animés armés de lances et de boucliers de terre cuite. Chaque soldat a Terre 4, Réduction 10, attaque à 6g3 et inflige 4g2 dégâts de Jade. Ils obéissent aux ordres mentaux du lanceur sur le champ de bataille."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_TERRE = SORTS_TERRE;
}
