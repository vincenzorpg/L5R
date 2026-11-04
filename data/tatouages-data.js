/**
 * data/tatouages-data.js — L5R 4e Édition
 * Recueil exhaustif officiel de l'Ordre Tatoué Togashi (Ise Zumi)
 * Sources : Livre de Base (p. 263-266), Book of Air, Book of Earth, Book of Fire, Book of Water.
 *
 * RÈGLES DE BASE DES TATOUAGES ISE ZUMI :
 * - Progression : 2 tatouages aux Rangs 1, 3 et 5.
 * - Activation : Action Libre (Free Action), à condition que le tatouage soit à l'air libre.
 * - Limite : 1 seul tatouage actif simultanément (sauf mention explicite contraire).
 * - Durée : Nombre de rounds égal au double du Rang d'École (2 × Rang d'École), sauf durée spéciale indiquée.
 */

(function () {
  const TATOUAGES_DATA = [
    // ==========================================
    // --- 1. LIVRE DE BASE V4 (22 TATOUAGES) ---
    // ==========================================
    {
      id: "tatouage-balance",
      name: "Balance (Balance)",
      kanji: "天秤",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 263)",
      desc: "Deux plateaux en équilibre parfait, harmonisant le corps avec les flux magiques.",
      rule: "Tant que ce tatouage est actif, le ND de tout jet d'incantation de sort (Spell Casting Roll) ciblant le moine est augmenté ou diminué d'une valeur égale à (2 × Rang d'École) + 5. Le joueur détermine s'il s'agit d'une augmentation ou d'une diminution au moment de l'activation."
    },
    {
      id: "tatouage-bambou",
      name: "Bambou (Bamboo)",
      kanji: "竹",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 263)",
      desc: "Une tige de bambou vert peinte le long du dos, symbole de flexibilité et d'endurance.",
      rule: "Tant que ce tatouage est actif, le ND d'Armure (Armor TN) du moine augmente d'une valeur égale à (2 × Rang d'École) + 5."
    },
    {
      id: "tatouage-brasier",
      name: "Brasier (Blaze)",
      kanji: "火炎",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 263)",
      desc: "Des flammes vives et dansantes parcourant les mains et les avant-bras.",
      rule: "Les frappes à mains nues du moine s'enflamment. Toutes ses attaques à mains nues infligent un montant de dégâts de feu supplémentaire égal à son (Anneau de Feu + Rang d'École)."
    },
    {
      id: "tatouage-centipede",
      name: "Mille-pattes (Centipede)",
      kanji: "百足",
      type: "Togashi",
      activation: "Action Complexe de Mouvement",
      duration: "Jusqu'à 1 jour entier",
      source: "Livre de Base (p. 263)",
      desc: "Un long scolopendre courant le long d'un membre inférieur.",
      rule: "Le moine peut entreprendre une Action Complexe de Mouvement pour courir à une allure surhumaine : il parcourt une distance égale à son Anneau d'Eau × 100 pieds (environ Eau × 30 mètres) par action. Dure jusqu'à 24h. S'il s'arrête plus d'une minute, l'effet cesse et le moine devient Épuisé (aucune action physique pendant 12 heures)."
    },
    {
      id: "tatouage-crabe",
      name: "Crabe (Crab)",
      kanji: "蟹",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 263)",
      desc: "Une carapace solide de crabe peinte en aplat sur le torse ou les épaules.",
      rule: "Le moine bénéficie d'une Réduction des dégâts égale à son Anneau de Terre. Se cumule normalement avec toute armure ou technique."
    },
    {
      id: "tatouage-dragon",
      name: "Dragon (Dragon)",
      kanji: "龍",
      type: "Togashi",
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "L'effigie majestueuse du Dragon céleste enroulée autour du buste.",
      rule: "Requiert la dépense de 1 point de Vide à l'activation. Le moine dégage une présence terrifiante : il acquiert la capacité Peur (Fear) à un rang égal à son Rang d'École."
    },
    {
      id: "tatouage-faucon",
      name: "Faucon (Falcon)",
      kanji: "鷹",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre d'heures égal au Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "Un rapace aux serres acérées prêt à fondre sur sa proie depuis l'omoplate.",
      rule: "Le moine développe une acuité visuelle perçante : il ignore toutes les pénalités de visibilité liées à la distance, au brouillard, à la pluie ou à la faible luminosité pour ses jets de Perception."
    },
    {
      id: "tatouage-grue",
      name: "Grue (Crane)",
      kanji: "鶴",
      type: "Togashi",
      activation: "Action Libre",
      duration: "1 heure",
      source: "Livre de Base (p. 264)",
      desc: "Une grue élégante déployant ses ailes immaculées sur l'épaule.",
      rule: "À l'activation, confère un réservoir de dés bonus égal à (Rang d'École + Anneau d'Air). Pendant l'heure qui suit, le moine peut dépenser ces dés pour obtenir +1g0 par dé sur ses jets de compétences sociales (limité à son Anneau de Vide par jet). Les dés non dépensés disparaissent après 1 heure."
    },
    {
      id: "tatouage-ki-rin",
      name: "Ki-Rin (Ki-Rin)",
      kanji: "麒麟",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "La bête sacrée porteuse de fortune et de miracles célestes.",
      rule: "Tant que le tatouage est actif, le moine peut relancer un dé ou un jet complet par round, et conserve le résultat le plus favorable des deux."
    },
    {
      id: "tatouage-lion",
      name: "Lion (Lion)",
      kanji: "獅子",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "Un lion noble et musculeux prêt à bondir, symbole d'excellence guerrière.",
      rule: "Lors de l'activation, le moine choisit une Compétence Bugei : il gagne temporairement un nombre de rangs dans cette compétence égal à son Rang d'École."
    },
    {
      id: "tatouage-loup",
      name: "Loup (Wolf)",
      kanji: "狼",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre d'heures égal au Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "Une silhouette de loup traqueur aux sens affûtés sur l'avant-bras.",
      rule: "Le moine reçoit un nombre d'Augmentations Gratuites égal à son Rang d'École sur tous ses jets de Chasse (Pistage et traque)."
    },
    {
      id: "tatouage-mante",
      name: "Mante (Mantis)",
      kanji: "蟷螂",
      type: "Togashi",
      activation: "Passif (Permanent)",
      duration: "Permanent",
      source: "Livre de Base (p. 264)",
      desc: "Une mante religieuse miniature aux pinces dressées sans peur.",
      rule: "Le moine est totalement immunisé de façon permanente contre les effets de Peur. Ce tatouage ne compte pas dans la limite d'un seul tatouage actif."
    },
    {
      id: "tatouage-montagne",
      name: "Montagne (Mountain)",
      kanji: "山",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Les hauts sommets escarpés des monts du Dragon gravés en aplat sombre.",
      rule: "Le corps résiste au traumatisme : le moine réduit toutes les pénalités de ND infligées par ses Rangs de Blessures d'un montant égal à (Rang d'École + 2)."
    },
    {
      id: "tatouage-ocean",
      name: "Océan (Ocean)",
      kanji: "海",
      type: "Togashi",
      activation: "Action Libre / Passif",
      duration: "Permanent + Rétablissement instantané",
      source: "Livre de Base (p. 265)",
      desc: "Des rouleaux d'écume marine et de vagues infinies ondulant sur les flancs.",
      rule: "Le moine n'a plus besoin de boire ni de manger pour subsister. Une fois tous les 3 jours, il peut l'activer pour bénéficier instantanément des bienfaits de 8 heures de repos et récupérer tous ses points de Vide."
    },
    {
      id: "tatouage-phenix",
      name: "Phénix (Phoenix)",
      kanji: "鳳凰",
      type: "Togashi",
      activation: "Automatique (Réaction)",
      duration: "Instantanée",
      source: "Livre de Base (p. 265)",
      desc: "L'oiseau immortel aux ailes de braise déployées sur la poitrine.",
      rule: "Si le moine dispose d'au moins 1 point de Vide non dépensé et chute au rang Hors de Combat ou pire, le phénix s'active seul : tous ses points de Vide sont dépensés et il guérit immédiatement (Rang d'École × 10) Blessures. Limité à une fois par semaine."
    },
    {
      id: "tatouage-scorpion",
      name: "Scorpion (Scorpion)",
      kanji: "蠍",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Un scorpion noir luisant prêt à piquer sur le poignet.",
      rule: "Le moine gagne +Rang d'École g 0 sur ses jets de Discrétion. De plus, ses attaques à mains nues rendent la cible Étourdie (Dazed) pour 1 round dès qu'un dé explose sur son jet de dégâts."
    },
    {
      id: "tatouage-singe",
      name: "Singe (Monkey)",
      kanji: "猿",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Un macaque agile bondissant d'un membre à l'autre.",
      rule: "Bonus de +(2 × Rang d'École) à tous ses jets d'Athlétisme. Se relever lorsqu'il est À Terre (Prone) devient une Action Libre sans coût en mouvement."
    },
    {
      id: "tatouage-soleil",
      name: "Soleil (Sun)",
      kanji: "日",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Un disque solaire étincelant gravé dans la paume.",
      rule: "Le moine irradie d'une lumière solaire pure dans un rayon de 9 mètres. Toute créature ayant au moins 1 Rang de Souillure subit -2g0 à ses jets d'attaque et encaisse (Rang d'École)g(Rang d'École) dégâts au début de chaque tour passé dans la zone."
    },
    {
      id: "tatouage-tempete",
      name: "Tempête (Storm)",
      kanji: "嵐",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Des spirales de nuées orageuses et d'éclairs zébrant les cuisses.",
      rule: "Le coût de la manœuvre Renversement (Knockdown) à mains nues est réduit à une seule Augmentation au lieu de deux."
    },
    {
      id: "tatouage-tortue",
      name: "Tortue (Turtle)",
      kanji: "亀",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 266)",
      desc: "Une tortue millénaire parée d'écaille protectrice sur le sternum.",
      rule: "Bonus de +(Rang d'École × 2) au ND d'Armure en Posture Défense ou Défense Totale. Confère également +1g1 sur tous les jets de Volonté pour contrer la manipulation sociale ou l'intimidation."
    },
    {
      id: "tatouage-vide",
      name: "Vide (Void)",
      kanji: "空",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 266)",
      desc: "Le cercle parfait de l'Ensō tracé à l'encre noire au plexus.",
      rule: "Le moine perçoit directement l'essence vitale des créatures : il détecte l'emplacement exact de tout être vivant dans un rayon de (Rang d'École × 10) pieds (Rang × 3 m)."
    },
    {
      id: "tatouage-vent",
      name: "Vent (Wind)",
      kanji: "風",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 266)",
      desc: "Des courants d'air vaporeux enroulés autour des jambes.",
      rule: "Confère une Action Simple supplémentaire par tour (ne pouvant pas être utilisée pour attaquer) et lève la restriction de mouvement maximale liée à l'Anneau d'Eau."
    },

    // ==========================================
    // --- 2. SUPPLÉMENTS OFFICIELS V4 ---
    // ==========================================
    {
      id: "tatouage-chuchotement",
      name: "Chuchotement (Whisper)",
      kanji: "囁き",
      type: "Togashi",
      activation: "Action Complexe",
      duration: "Instantané",
      source: "Book of Air (p. 182)",
      desc: "Un motif de spirale d'air discret près de l'oreille ou de la mâchoire.",
      rule: "Permet de chuchoter un message mental à n'importe quelle personne située dans un rayon de (10 × Rang d'École) miles. La cible entend la voix distinctement dans son esprit, mais ne peut pas répondre sans moyen magique."
    },
    {
      id: "tatouage-nuage",
      name: "Nuage (Cloud)",
      kanji: "雲",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Air (p. 182)",
      desc: "Des volutes de brume nébuleuse estompant les contours corporels du moine.",
      rule: "Toute attaque de mêlée portée contre le moine qui réussit doit immédiatement réussir un second jet d'attaque identique ou échouer. En contrepartie, le moine ne peut porter aucune attaque tant que ce tatouage est actif."
    },
    {
      id: "tatouage-ours",
      name: "Ours (Bear)",
      kanji: "熊",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Earth (p. 177)",
      desc: "L'ours des forêts montagneuses dressé sur ses pattes arrière.",
      rule: "À l'activation, le moine choisit : soit d'augmenter son Trait de Vigueur d'une valeur égale à son Rang d'École, soit d'augmenter son Trait de Force d'une valeur égale à la moitié de son Rang d'École (arrondie au supérieur)."
    },
    {
      id: "tatouage-sanglier",
      name: "Sanglier (Boar)",
      kanji: "猪",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Earth (p. 177)",
      desc: "Un sanglier massif aux défenses acérées labourant la terre sur l'épaule.",
      rule: "Le moine devient impossible à déstabiliser lors d'une charge : il gagne +2g0 aux dégâts de ses attaques à mains nues en Posture Assaut (Full Attack) et ne subit pas le malus de ND d'Armure habituel de cette posture."
    },
    {
      id: "tatouage-volcan",
      name: "Volcan (Volcano)",
      kanji: "火山",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Fire (p. 172)",
      desc: "Un pic rocheux crachant des veines de magma incandescent sur le torse.",
      rule: "La peau prend la consistance de roche magmatique. Le moine gagne une Réduction de 5 contre les armes en bois ou projectiles enflammés. Tout assaillant le frappant avec une arme en métal doit réussir un jet opposé de Feu ou lâcher son arme devenue brûlante."
    },
    {
      id: "tatouage-centaure",
      name: "Centaure / Sagittaire (Centaur)",
      kanji: "人馬",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Fire (p. 172)",
      desc: "Une créature hybride mi-homme mi-cheval bandant un arc de braise.",
      rule: "Les membres inférieurs acquièrent l'endurance d'un étalon de guerre : le moine ajoute son Anneau de Feu à ses jets d'Initiative et ses distances de saut sont doublées."
    },
    {
      id: "tatouage-poisson-chat",
      name: "Poisson-Chat (Catfish / Namazu)",
      kanji: "鯰",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Water (p. 175)",
      desc: "Le silure géant des légendes fluviales couché le long des vertèbres.",
      rule: "Le corps devient extrêmement glissant et insaisissable. Le moine est totalement immunisé contre la manœuvre Lutte (Grapple) et bénéficie d'un bonus de +3g1 pour s'extirper de tout lien, entrave ou piège physique."
    },
    {
      id: "tatouage-raie",
      name: "Raie (Manta Ray)",
      kanji: "鱏",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Book of Water (p. 175)",
      desc: "Une grande raie glissant gracieusement sur les omoplates.",
      rule: "Le moine nage à sa vitesse de course terrestre normale, peut respirer sous l'eau sans aucune difficulté et ne subit aucun malus de combat sous-marin."
    }
  ];

  if (typeof window !== "undefined") {
    window.TATOUAGES_DATA = TATOUAGES_DATA;
  }
})();
