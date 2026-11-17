const SORTS_UNIVERSELS = [
  {
    id: "univ-sense",
    name: "Sentir les Kami (Sense)",
    element: "Universel",
    mastery: "Universel",
    keywords: [],
    range: "Personnelle",
    area: "Rayon de 15 mètres (50') autour du lanceur",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10' par Augmentation)",
    source: "Livre de Base 4e Édition, p. 164",
    desc: "Maîtrise : Tous (hors Vide) 1 (ND 10). Peut être lancé dans l'un des quatre éléments standards. Permet au lanceur de ressentir la présence, la quantité et l'emplacement approximatif des esprits élémentaires (et non des esprits maléfiques appelés kansen) de cet élément dans le rayon du sort. Sert le plus souvent à repérer les esprits avant de Communier, ou comme outil de détection basique (ex. : chercher une source d'eau dans le désert). Note (Bannissement, p. 166) : pour bannir les esprits d'une zone, il faut d'abord lancer Sentir les Kami avec 3 Augmentations pour identifier tous les esprits présents."
  },
  {
    id: "univ-commune",
    name: "Communier avec les Kami (Commune)",
    element: "Universel",
    mastery: "Universel",
    keywords: [],
    range: "6 mètres (20')",
    area: "Le lanceur (un kami élémentaire local)",
    duration: "Concentration",
    raises: "Questions supplémentaires (+1 par Augmentation), Clarté, Réveiller un esprit apathique (1–2 Augmentations, MJ)",
    source: "Livre de Base 4e Édition, p. 165",
    desc: "Maîtrise : Tous (hors Vide) 1 (ND 10). Permet de parler avec l'un des kami élémentaires locaux les plus actifs (ou, avec 1–2 Augmentations selon le MJ, d'en réveiller un endormi) et de lui poser 2 questions auxquelles il répond honnêtement du mieux qu'il peut. Les Augmentations augmentent le nombre de questions (+1) ou la clarté (indispensable pour des événements vieux de plusieurs décennies ou pour éviter des réponses énigmatiques). Air : esprits joueurs et distraits répondant par énigmes ou émotions ; Terre : directs et factuels, indifférents aux émotions, focalisés sur des détails obscurs ; Feu : irritables et colériques s'ils ne sont pas apaisés par une offrande à brûler, mais les plus clairs ; Eau : visions visuelles continues sans son, odeur ni émotion. Note (Bannissement, p. 166) : 5 Augmentations pour persuader les esprits identifiés de quitter la zone."
  },
  {
    id: "univ-summon",
    name: "Invoquer les Kami (Summon)",
    element: "Universel",
    mastery: "Universel",
    keywords: [],
    range: "9 mètres (30')",
    area: "1 pied cube (~28 litres) de matière invoquée",
    duration: "Permanente",
    raises: "Portée (+3 m / +10'), Quantité (+1 pied cube), Composition spécifique de matière (1 à 4 Augmentations)",
    source: "Livre de Base 4e Édition, p. 165",
    desc: "Maîtrise : Tous (hors Vide) 1 (ND 10). Peut être lancé dans l'un des quatre éléments standards. Matérialise une quantité modeste (1 pied cube, généralement sous forme de sphère brute) de l'élément choisi dans tout espace ouvert à portée — jamais à l'intérieur d'un objet physique ni d'une créature vivante. L'élément se comporte de manière ordinaire et naturelle (la terre tombe, l'eau détrempe, l'air se dissipe, le feu s'éteint faute de combustible). Des Augmentations (1 à 4, selon le MJ) permettent d'obtenir une forme plus spécifique (ex. : bois ou fer avec la Terre, thé avec l'Eau), mais jamais de matériaux rares/précieux (or) ni spirituellement puissants (jade, cristal)."
  },
  {
    id: "univ-1-command",
    name: "Commandement Élémentaire (Command)",
    element: "Universel",
    mastery: 1,
    keywords: [],
    range: "9 mètres (30')",
    area: "1 pied cube de matière affectée",
    duration: "Permanente",
    raises: "Zone (+1 pied cube), Portée (+3 m / +10'), Spéciale (formes complexes)",
    source: "Imperial Histories 2, p. 53",
    desc: "Maîtrise : Tous (hors Vide) 1. Sort controversé conçu par Iuchi durant l'exil du Clan de la Ki-Rin, qui ordonne aux Éléments au lieu de prier les kami. Peut être lancé dans l'un des quatre éléments standards pour créer une quantité d'élément (comme Invoquer les Kami) ou modifier la forme d'une quantité existante (ex. : briser ou arrondir une table en pierre ; des formes complexes comme sculpter le feu nécessitent des Augmentations au choix du MJ). Dans Rokugan (ou partout où les kami existent), chaque utilisation impose +5 au ND de tous les jets d'Invocation de cet Élément pendant 24 heures. Peut remplacer Communier lors d'une Sollicitation (Importune) : le jet d'Art de la Magie réussit automatiquement, mais la pénalité de ND passe à +10 (y compris pour le sort sollicité) si lancé à Rokugan."
  },
  {
    id: "univ-2-transmute",
    name: "Le Sort de Transmutation (The Transmute Spell)",
    element: "Universel",
    mastery: 2,
    keywords: ["Agasha / Tamori"],
    range: "3 mètres (10')",
    area: "1 objet matériel (jusqu'à 10 pieds cubes)",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10'), Zone (+5 pieds cubes), Spéciale (+1 Élément additionnel par 2 Augmentations)",
    source: "The Great Clans, p. 116",
    desc: "Maîtrise : Tout Élément hors Vide 2. Sort secret enseigné uniquement aux shugenja Agasha et Tamori de Rang 5+ (ou accordé par la bienveillance d'Agasha). Transforme les Éléments d'un unique objet inanimé en d'autres Éléments (impossible d'affecter le Vide ; aucun pouvoir sur les êtres vivants ni sur un assemblage complexe de multiples pièces, mais peut viser une pièce précise comme l'essieu d'un chariot). Pour un objet contenant plusieurs Éléments ou à transformer en plusieurs Éléments, il faut 2 Augmentations par Élément supplémentaire (ex. : bougie allumée [Terre+Feu] vers 1 Élément = 2 Augmentations ; table en bois [Terre] vers Feu+Air = 2 Augmentations). Plus un objet est complexe, plus il contient d'Éléments ; un daishō (katana et wakizashi) contient les 5 Éléments (Vide inclus) et y est donc immunisé."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_UNIVERSELS = SORTS_UNIVERSELS;
}
