const SORTS_FEU = [
  // --- NIVEAU DE MAÎTRISE 1 ---
  {
    id: "feu-1-biting-steel",
    name: "Morsure de l'Acier (Biting Steel)",
    element: "Feu",
    mastery: 1,
    keywords: ["Artisanat"],
    range: "Contact",
    area: "1 arme à lame en acier",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Les esprits du feu insufflent leur fureur dans le métal d'une arme blanche en acier (épée, couteau, naginata, etc.). Le sort ne peut pas cibler un nemuranai, une arme non métallique ou une arme déjà améliorée par magie. La VD (jets de dégâts) de l'arme augmente de +1g1 pour la durée du sort."
  },
  {
    id: "feu-1-burning-kiss-steel",
    name: "Baiser Brûlant de l'Acier (Burning Kiss of Steel)",
    element: "Feu",
    mastery: 1,
    keywords: ["Bataille"],
    range: "Contact",
    area: "Une arme de mêlée tenue en main par le lanceur",
    duration: "5 Minutes",
    raises: "Durée (+2 minutes)",
    desc: "Un filet de flammes jaillit de vos mains pour embraser votre arme. L'arme bénéficie d'un bonus de +1g1 aux jets d'attaque de mêlée. Ce bonus passe à +2g2 lorsque vous attaquez des adversaires montés ou de taille supérieure à celle d'un humain. Si vous lâchez ou perdez l'arme, le sort prend fin immédiatement."
  },
  {
    id: "feu-1-envious-flames",
    name: "Flammes Envieuses (Envious Flames)",
    element: "Feu",
    mastery: 1,
    keywords: [],
    range: "9 mètres (30')",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Un kami de Feu solitaire fonce vers la cible et frappe infailliblement tant qu'elle se trouve à portée. Le sort inflige 2g2 Blessures. La douleur est cuisante : si la cible est un shugenja en train d'incanter un sort, le ND de son jet de Volonté pour maintenir sa concentration passe à 20 + les dégâts subis (au lieu de 10 + dégâts)."
  },
  {
    id: "feu-1-extinguish",
    name: "Éteindre (Extinguish)",
    element: "Feu",
    mastery: 1,
    keywords: [],
    range: "Personnelle",
    area: "Rayon de 30 mètres (100')",
    duration: "Instantanée",
    raises: "Zone (+6 m / +20' de rayon)",
    desc: "Ce sort congédie les kami de Feu présents dans la zone. Tout incendie ou flamme non magique est immédiatement étouffé. De plus, toute source infligeant des dégâts de feu (qu'elle soit magique ou profane) voit sa VD réduite de -1g1 jusqu'au début du round suivant."
  },
  {
    id: "feu-1-fires-purity",
    name: "Flammes de Pureté (Fires of Purity)",
    element: "Feu",
    mastery: 1,
    keywords: ["Défense"],
    range: "7,5 mètres (25')",
    area: "Une cible",
    duration: "1 Minute",
    raises: "Dégâts (+1g0 par tranche de 2 Augmentations)",
    desc: "Enveloppe la cible d'un linceul de flammes ardentes qui ne la blesse pas et n'abîme pas son équipement. Quiconque entre en contact avec elle ou la frappe par une attaque de mêlée subit 2g2 Blessures. De plus, les attaques de mêlée portées par la cible (à mains nues ou avec une arme portée lors du lancement) infligent +2g2 Blessures supplémentaires. Tout objet posé par la cible ne peut être repris sans subir les dégâts. Les armes à distance traversent ce rempart normalement."
  },
  {
    id: "feu-1-fires-cleanse",
    name: "Les Feux Purificateurs (The Fires That Cleanse)",
    element: "Feu",
    mastery: 1,
    keywords: [],
    range: "Personnelle",
    area: "Rayon de 9 mètres (30')",
    duration: "Instantanée",
    raises: "Zone (+1,5 m / +5' de rayon par tranche de 2 Augmentations)",
    desc: "Les kami de Feu sont déchaînés dans un maelström chaotique qui consume tout autour du shugenja. Toutes les créatures dans la zone subissent des dégâts d'une VD égale à votre Anneau de Feu (jet lancé une seule fois et appliqué à tous). Les kami tentant de vous épargner en partie, vous ne subissez que la moitié des dégâts obtenus (arrondie au supérieur)."
  },
  {
    id: "feu-1-fury-osano-wo",
    name: "La Fureur d'Osano-Wo (Fury of Osano-Wo)",
    element: "Feu",
    mastery: 1,
    keywords: ["Tonnerre"],
    range: "90 mètres (300')",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Dégâts (+1g0 par tranche de 2 Augmentations)",
    desc: "Ne peut être lancé qu'en extérieur. Invoque la foudre du ciel sur la cible pour lui infliger 5g2 Blessures. Toute personne située à 3 m (10') ou moins de la cible doit réussir un jet de Vigueur (ND 15) sous peine d'être Rendue Sourde pendant 2 rounds. En cas d'orage modéré, les dégâts passent à 6g2 ; lors d'une tempête violente ou d'un ouragan, ils atteignent 6g3."
  },
  {
    id: "feu-1-katana-fire",
    name: "Katana de Feu (Katana of Fire)",
    element: "Feu",
    mastery: 1,
    keywords: ["Bataille", "Artisanat"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Une arme créée",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0), Durée (+5 min), Portée (+1,5 m / +5')",
    desc: "Matérialise une lame de flammes pures (forme par défaut : katana, modifiable en n'importe quelle autre épée avec 1 Augmentation). L'arme a une VD de 2g2. Vous pouvez utiliser votre Rang d'École à la place de la compétence Kenjutsu pour la manier. Si vous possédez la compétence Kenjutsu, vous ajoutez votre Rang d'Honneur à tous les jets de dégâts. Elle disparaît si vous la lâchez. Vous pouvez aussi la faire apparaître entre les mains d'un allié à 6 m (il ne bénéficie pas du bonus d'Honneur aux dégâts)."
  },
  {
    id: "feu-1-never-alone",
    name: "Jamais Seul (Never Alone)",
    element: "Feu",
    mastery: 1,
    keywords: [],
    range: "Contact",
    area: "Une cible",
    duration: "5 Rounds (Spéciale)",
    raises: "Cibles (+1 cible)",
    desc: "Connecte un allié au courage et à la détermination de ses ancêtres. La cible gagne un bonus égal à votre Anneau de Feu à tous ses jets d'attaque, de Compétence et de Trait. Cet effet s'interrompt dès que le temps est écoulé, ou dès que la cible rate un jet d'attaque ou de compétence, ou dès qu'elle subit des Blessures de n'importe quelle provenance."
  },
  {
    id: "feu-1-raging-forge",
    name: "La Forge Furieuse (The Raging Forge)",
    element: "Feu",
    mastery: 1,
    keywords: ["Artisanat"],
    range: "Contact",
    area: "Une arme ou une armure",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Invoque la puissance de la forge pour réparer et restaurer un objet matériel de qualité ordinaire (arme ou armure). L'objet perd tous ses défauts, encoches, fentes ou fissures et retrouve sa forme parfaite. Ne peut pas réparer un objet brisé en morceaux ou totalement détruit."
  },

  // --- NIVEAU DE MAÎTRISE 2 ---
  {
    id: "feu-2-disrupt-aura",
    name: "Perturber l'Aura (Disrupt the Aura)",
    element: "Feu",
    mastery: 2,
    keywords: [],
    range: "15 mètres (50')",
    area: "Une créature ou individu ciblé",
    duration: "24 Heures",
    raises: "Durée (+12 heures par Augmentation)",
    desc: "Attise artificiellement le Feu interne de la cible pour rompre son équilibre élémentaire. Tant que le sort est actif, la cible ne peut recevoir aucune guérison magique (les sorts, objets ou Techniques restaurant des Blessures échouent automatiquement). Les soins profanes via la compétence Médecine fonctionnent toujours."
  },
  {
    id: "feu-2-enticing-dance-flame",
    name: "Danse Séduisante de la Flamme (Enticing Dance of the Flame)",
    element: "Feu",
    mastery: 2,
    keywords: [],
    range: "15 mètres (50')",
    area: "Rayon de 6 mètres (20')",
    duration: "2 Rounds",
    raises: "Durée (+1 round)",
    desc: "Les kami de Feu jaillissent en une danse frénétique à l'endroit désigné, embrasant la zone. Chaque cible présente subit 3g2 Blessures au round où le sort prend effet. Au début de chaque round ultérieur où le sort demeure actif, chaque cible se trouvant encore dans la zone subit 2g1 Blessures supplémentaires."
  },
  {
    id: "feu-2-fires-from-within",
    name: "Les Feux Intérieurs (The Fires From Within)",
    element: "Feu",
    mastery: 2,
    keywords: [],
    range: "30 mètres (100')",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Cibles (+1 cible par tranche de 2 Augmentations)",
    desc: "Le trait d'attaque classique de l'élément Feu : forme une sphère de flammes dans la paume du lanceur qui grossit en filant vers sa cible. Inflige des dégâts dont la VD est égale à votre Anneau de Feu (ex. : 4g4 avec Feu 4)."
  },
  {
    id: "feu-2-hurried-steps",
    name: "Pas Pressés (Hurried Steps)",
    element: "Feu",
    mastery: 2,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "2 Rounds (Spéciale)",
    raises: "Aucune",
    desc: "La vivacité de pensée de l'élément Feu accélère votre magie. Le temps d'incantation de votre prochain sort de Feu est réduit de 4 rounds. Si ce prochain sort est de Niveau de Maîtrise 3 ou moins, il est incanté instantanément en tant qu'Action Simple. Si vous ne commencez pas à lancer ce sort dans les 2 rounds suivants, l'effet est perdu."
  },
  {
    id: "feu-2-mental-quickness",
    name: "Vivacité d'Esprit (Mental Quickness)",
    element: "Feu",
    mastery: 2,
    keywords: [],
    range: "Contact",
    area: "Un objet",
    duration: "10 Minutes",
    raises: "Aucune",
    desc: "Insuffle la ruse et l'acuité des kami de Feu dans un objet matériel. Quiconque porte cet objet sur lui voit son Trait d'Intelligence augmenter de +3 points pour toute la durée du sort."
  },
  {
    id: "feu-2-relentless-heat",
    name: "Chaleur Implacable (Relentless Heat)",
    element: "Feu",
    mastery: 2,
    keywords: ["Défense"],
    range: "Contact",
    area: "Une armure",
    duration: "10 Rounds",
    raises: "Durée (+2 rounds)",
    desc: "L'armure ciblée rougeoie d'une chaleur de désert implacable. Tout adversaire tentant de frapper le porteur en mêlée (que le coup touche ou rate) acquiert immédiatement l'état Fatigué jusqu'au début de son prochain tour (la pénalité s'appliquant dès le jet d'attaque déclencheur). Un assaillant en Posture d'Attaque Totale repasse immédiatement en Posture d'Attaque. Sans effet sur les attaques à distance ou les sorts."
  },
  {
    id: "feu-2-tail-fire-dragon",
    name: "Queue du Dragon de Feu (Tail of the Fire Dragon)",
    element: "Feu",
    mastery: 2,
    keywords: [],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "4 Rounds",
    raises: "Durée (+1 round)",
    desc: "Crée un fouet ardent qui jaillit de votre main pour frapper vos ennemis jusqu'à 9 m (30'). Vos jets d'attaque avec ce fouet utilisent [Agilité + (2 × Rang d'École)] g [Agilité]. Les dégâts ont une VD égale à votre Anneau de Feu."
  },

  // --- NIVEAU DE MAÎTRISE 3 ---
  {
    id: "feu-3-breath-fire-dragon",
    name: "Souffle du Dragon de Feu (Breath of the Fire Dragon)",
    element: "Feu",
    mastery: 3,
    keywords: [],
    range: "Personnelle",
    area: "Souffle de 4,5 m de long sur 1,5 m de large (15' × 5')",
    duration: "4 Rounds",
    raises: "Aucune",
    desc: "Une prière au Dragon Céleste de Feu qui vous octroie la capacité de cracher une gerbe de flammes une fois par round par une Action Simple. La gerbe inflige des dégâts d'une VD égale à votre Anneau de Feu à toutes les créatures dans la zone. Vous ne pouvez ni parler ni incanter d'autres sorts tant que cet effet est maintenu (vous pouvez y mettre fin prématurément durant l'Étape des Réactions)."
  },
  {
    id: "feu-3-fiery-wrath",
    name: "Colère Enflammée (Fiery Wrath)",
    element: "Feu",
    mastery: 3,
    keywords: [],
    range: "30 mètres (100')",
    area: "Une structure isolée ou une zone de 15 m × 15 m (50' × 50')",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Conçu à l'origine pour débroussailler ou démolir des bâtiments en bois sans effort. Tous les matériaux inflammables dans la zone prennent feu et se consument jusqu'à réduction en cendres complètes (impossible à éteindre sans magie). Les êtres vivants et les matériaux incombustibles ne subissent aucun dégât : les vêtements des personnes prises dans la zone brûlent, mais leur chair n'est pas même roussie."
  },
  {
    id: "feu-3-fist-osano-wo",
    name: "Le Poing d'Osano-Wo (The Fist of Osano-Wo)",
    element: "Feu",
    mastery: 3,
    keywords: ["Tonnerre"],
    range: "15 mètres (50')",
    area: "Rayon de 6 mètres (20')",
    duration: "1 Round",
    raises: "Zone (+3 m / +10' de rayon)",
    desc: "Appelle la foudre et le tonnerre destructeur d'Osano-Wo pour écraser une zone précise. Inflige 6k3 Blessures à toutes les cibles et détruit les structures fragiles en bois ou en papier. Quiconque se trouve dans l'onde de choc doit réussir un jet de Terre (ND 20) ou être Renversé (Knockdown) et Assommé (Stunned) pour 1 round."
  },
  {
    id: "feu-3-haze-battle",
    name: "Brumes de Bataille (Haze of Battle)",
    element: "Feu",
    mastery: 3,
    keywords: ["Bataille"],
    range: "3 mètres (10')",
    area: "Une cible",
    duration: "5 Rounds (ou 1 heure hors combat)",
    raises: "Durée (+1 round)",
    desc: "Remplit l'esprit de la cible d'une rage aveugle et erratique. En combat, elle adopte immédiatement la Posture d'Attaque Totale et ne peut plus en changer. Hors combat, elle gagne les Désavantages Impétueux (Brash) et Entêté (Contrary). La cible peut résister par un jet opposé de Volonté contre votre [Volonté + Anneau de Feu], tenté à chaque Étape des Réactions (ou toutes les 10 min hors combat)."
  },
  {
    id: "feu-3-hungry-blade",
    name: "Lame Affamée (Hungry Blade)",
    element: "Feu",
    mastery: 3,
    keywords: ["Artisanat"],
    range: "15 mètres (50')",
    area: "Une arme",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Une version avancée de Morsure de l'Acier applicable à tout type d'arme. Une gaine de flammes enveloppe l'arme : son manieur gagne +1g0 à tous ses jets d'attaque et tous ses dés de dégâts explosent sur un résultat de 8 ou plus (les résultats de 8 et 9 n'explosent toutefois qu'une seule fois par dé)."
  },
  {
    id: "feu-3-ravenous-swarms",
    name: "Essaims Dévorants (Ravenous Swarms)",
    element: "Feu",
    mastery: 3,
    keywords: [],
    range: "9 mètres (30')",
    area: "Une cible",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Projette un trait enflammé infligeant 4k3 Blessures à l'impact, puis des braises tourbillonnent autour de la cible en guettant ses faux pas. Si la cible tente d'incanter le moindre sort de Feu pendant la durée, les flammes l'attaquent : elle subit 3k3 Blessures supplémentaires et son jet d'incantation échoue automatiquement (l'emplacement de sort étant perdu)."
  },
  {
    id: "feu-3-shining-light",
    name: "Lumière Éclatante (Shining Light)",
    element: "Feu",
    mastery: 3,
    keywords: ["Défense"],
    range: "9 mètres (30')",
    area: "Une armure",
    duration: "10 Rounds",
    raises: "Dégâts (+1g0 par tranche de 2 Augmentations), Durée (+2 rounds)",
    desc: "Lie un esprit ardent dans une pièce d'armure. Chaque fois que le porteur est attaqué au corps à corps, l'armure émet un flash aveuglant immédiat : l'assaillant subit 2k2 Blessures et se retrouve Aveuglé jusqu'à l'Étape des Réactions du même round. Sans effet sur les attaques à distance."
  },

  // --- NIVEAU DE MAÎTRISE 4 ---
  {
    id: "feu-4-death-flame",
    name: "Mort de la Flamme (Death of Flame)",
    element: "Feu",
    mastery: 4,
    keywords: [],
    range: "30 mètres (100')",
    area: "Une cible",
    duration: "5 Rounds",
    raises: "Aucune",
    desc: "Étouffe violemment le Feu intérieur de la victime : ses deux Traits d'Agilité et d'Intelligence sont réduits d'une valeur égale à votre Anneau de Feu (avec un minimum de 1). Si vous maintenez votre Concentration, la cible ne peut échapper à l'effet. Si vous ne vous concentrez pas, elle peut tenter au début de chaque tour un jet opposé de Feu (avec son score d'origine) contre vous pour dissiper le sort."
  },
  {
    id: "feu-4-defense-firestorm",
    name: "Défense de la Tempête de Feu (Defense of the Firestorm)",
    element: "Feu",
    mastery: 4,
    keywords: ["Défense"],
    range: "Contact",
    area: "Une armure",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Fait surgir une aura de flammes magiques autour d'une armure. Ces flammes n'abîment pas les êtres vivants mais réduisent instantanément en cendres toutes les armes en bois (y compris les flèches et la plupart des armes d'hast) avant qu'elles n'atteignent le porteur, annulant leurs dégâts. Le rideau de feu masque également le porteur, augmentant son ND d'Armure de +20."
  },
  {
    id: "feu-4-mending-forge",
    name: "La Forge Réparatrice (The Mending Forge)",
    element: "Feu",
    mastery: 4,
    keywords: ["Artisanat"],
    range: "Contact",
    area: "Un objet ciblé",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Met à profit le versant créateur du Feu pour réparer un objet brisé ou détruit, à condition d'avoir réuni tous ses morceaux devant vous (le sort nécessite 1 minute d'incantation et de concentration). L'objet retrouve son intégrité d'origine. Pour réparer un nemuranai ou un objet de qualité Supérieure ou mieux, un sacrifice équivalent doit être offert aux kami de Feu (un objet de valeur égale à brûler)."
  },
  {
    id: "feu-4-symbol-fire",
    name: "Symbole de Feu (Symbol of Fire)",
    element: "Feu",
    mastery: 4,
    keywords: ["Sceau"],
    range: "30 mètres (100')",
    area: "Rayon de 3 mètres (10')",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Grave un sceau protecteur sur une porte, un passage ou un seuil. Quiconque franchit le passage sans autorisation doit réussir un jet opposé de son Eau contre votre Feu sous peine de subir 3k3 Blessures, d'être Étourdi (Dazed) et Aveuglé (Blinded) pendant 1 round. Un seul Symbole de Feu peut être actif par shugenja à la fois."
  },
  {
    id: "feu-4-wall-fire",
    name: "Mur de Feu (Wall of Fire)",
    element: "Feu",
    mastery: 4,
    keywords: [],
    range: "30 mètres (100')",
    area: "Mur de 3 m de haut, 30 cm d'épaisseur et 7,5 m de long (10' × 1' × 25')",
    duration: "1 Heure",
    raises: "Zone (+1 segment de mêmes dimensions par Augmentation)",
    desc: "Érige un rideau vertical de flammes vengeresses infranchissable. Toute créature touchant le mur subit 6k6 Blessures. Si le mur est créé directement sur l'emplacement occupé par des personnes, celles-ci doivent réussir un jet de Réflexes (ND 20) pour éviter de subir ces Blessures."
  },

  // --- NIVEAU DE MAÎTRISE 5 ---
  {
    id: "feu-5-destructive-wave",
    name: "Vague Destructrice (Destructive Wave)",
    element: "Feu",
    mastery: 5,
    keywords: [],
    range: "Personnelle",
    area: "Rayon de 7,5 mètres (25')",
    duration: "Instantanée",
    raises: "Dégâts (+1k1 par tranche de 2 Augmentations)",
    desc: "Les kami de Feu se déploient en onde circulaire depuis le lanceur. Toutes les créatures dans la zone (alliées comme ennemies) subissent 7k7 Blessures. Vous êtes la seule personne immunisée contre les dégâts du sort."
  },
  {
    id: "feu-5-everburning-rage",
    name: "Rage Inextinguible (Everburning Rage)",
    element: "Feu",
    mastery: 5,
    keywords: [],
    range: "7,5 mètres (25')",
    area: "Une cible",
    duration: "1 Round",
    raises: "Durée (+1 round), Cibles (+1 cible)",
    desc: "Une terrible malédiction qui embrase les nerfs de la cible sous une douleur atroce sans brûler sa chair. Pour la durée du sort, la victime est considérée comme étant au Niveau de Blessure À Terre (Down) et subit toutes les pénalités et conditions associées. À l'expiration du sort, la douleur cesse net et la cible peut se relever."
  },
  {
    id: "feu-5-follow-flame",
    name: "Poursuite de la Flamme (Follow the Flame)",
    element: "Feu",
    mastery: 5,
    keywords: [],
    range: "Personnelle",
    area: "Spéciale",
    duration: "5 Rounds",
    raises: "Dégâts (+1k0 par Augmentation)",
    desc: "Permet de projeter une traînée de feu qui serpente au sol vers une cible en ligne de vue jusqu'à 90 m (300') à raison de 22,5 m (75') par round en contournant les obstacles incombustibles. Dès qu'elle atteint la cible, celle-ci s'enflamme pour 6k5 Blessures, puis continue de brûler en subissant la moitié de ces dégâts (arrondie à l'inférieur) à chaque round ultérieur jusqu'à extinction ou fin du sort. Désigner une nouvelle cible est une Action Simple."
  },
  {
    id: "feu-5-wings-phoenix",
    name: "Les Ailes du Phénix (Wings of the Phoenix)",
    element: "Feu",
    mastery: 5,
    keywords: ["Voyage"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Rounds",
    raises: "Aucune",
    desc: "Deux gigantesques ailes de flammes pures se déploient dans votre dos. Vous gagnez la faculté de voler à une vitesse égale à (Eau × 3 m) par Action Gratuite ou (Eau × 6 m) par Action Simple. Si vous êtes encore dans les airs à l'expiration du sort, les kami de Feu vous descendent doucement au sol avant de se dissiper."
  },

  // --- NIVEAU DE MAÎTRISE 6 ---
  {
    id: "feu-6-beam-inferno",
    name: "Rayon du Brasier (Beam of the Inferno)",
    element: "Feu",
    mastery: 6,
    keywords: [],
    range: "60 mètres (200')",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "L'un des sorts d'annihilation les plus dévastateurs de Rokugan. Libère un trait d'énergie thermique pure contre une cible unique, lui infligeant 10k10 Blessures. Tous les feux ordinaires dans un rayon de 60 mètres s'agitent et brûlent avec une intensité décuplée pendant plusieurs minutes."
  },
  {
    id: "feu-6-globe-everlasting-sun",
    name: "Globe du Soleil Éternel (Globe of the Everlasting Sun)",
    element: "Feu",
    mastery: 6,
    keywords: ["Défense"],
    range: "150 mètres (500')",
    area: "Rayon de 1,5 kilomètre (1 mile)",
    duration: "1 Jour",
    raises: "Aucune",
    desc: "Apaise la colère de tous les kami de Feu dans la région (traditionnellement utilisé lors des couronnements impériaux). Tous les bâtiments de la zone deviennent totalement insensibles au feu magique, et le ND de lancement de tout sort de Feu dans la zone augmente de +15. Les flammes profanes continuent de brûler mais deviennent léthargiques et ne se propagent plus."
  },
  {
    id: "feu-6-souls-blade",
    name: "La Lame de l'Âme (The Soul's Blade)",
    element: "Feu",
    mastery: 6,
    keywords: ["Artisanat"],
    range: "Contact",
    area: "Une arme",
    duration: "5 Rounds",
    raises: "Durée (+1 round par tranche de 3 Augmentations)",
    desc: "Lie la furie d'une tempête de feu dans une arme. Pendant toute la durée du sort, l'arme surmonte et ignore la capacité Invulnérabilité (Invulnerability), et chaque coup réussi infligeant des dégâts Assomme automatiquement la cible (état Stunned)."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_FEU = SORTS_FEU;
}
