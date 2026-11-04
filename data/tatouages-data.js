/**
 * data/tatouages-data.js — L5R 4e Édition
 * Règles officielles de l'Ordre Tatoué Togashi (Ise Zumi) — Livre de Base, pages 263 à 266.
 */

(function () {
  const TATOUAGES_DATA = [
    {
      id: "tatouage-araignee",
      name: "Araignée (Spider)",
      kanji: "蜘蛛",
      element: "Terre",
      ringReq: 2,
      activation: "Action Simple",
      duration: "Nombre de rounds égal au Rang de Terre",
      desc: "Une mygale aux pattes velues tissant une toile invisible sur vos épaules.",
      rule: "Vous pouvez escalader n'importe quelle surface verticale ou vous déplacer au plafond à votre vitesse de course normale sans jet d'escalade. De plus, vous gagnez +2g0 à tous vos jets pour résister aux poisons."
    },
    {
      id: "tatouage-bambou",
      name: "Bambou (Bamboo)",
      kanji: "竹",
      element: "Eau",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de rounds égal au Rang d'Eau",
      desc: "Une tige de bambou verte s'étirant le long de la colonne vertébrale, souple et indomptable.",
      rule: "Votre corps devient élastique et absorbe les chocs : vous ignorez les dégâts de chute jusqu'à 15 mètres. Vous gagnez un bonus de +2g1 sur tous vos jets de Lutte (Grapple) et d'Évasion."
    },
    {
      id: "tatouage-cameleon",
      name: "Caméléon (Chameleon)",
      kanji: "カメレオン",
      element: "Air",
      ringReq: 2,
      activation: "Action Simple",
      duration: "Nombre de minutes égal au Rang d'Air × 5",
      desc: "Un reptile enroulé sur vos côtes dont les écailles chatoient selon la lumière.",
      rule: "Votre peau et vos vêtements s'accordent parfaitement à l'environnement. Vous bénéficiez d'un bonus de +3g2 à tous vos jets de Discrétion (Stealth). Si vous restez immobile, le ND pour vous repérer augmente de +15."
    },
    {
      id: "tatouage-centipede",
      name: "Mille-pattes (Centipede)",
      kanji: "百足",
      element: "Feu",
      ringReq: 3,
      activation: "Action Libre",
      duration: "Nombre de rounds égal au Rang de Feu",
      desc: "Un scolopendre géant aux mandibules rougeoyantes courant le long d'un bras.",
      rule: "Vos attaques à mains nues deviennent incandescentes et rapides comme l'éclair. Vous pouvez déclarer l'Augmentation pour Attaque Supplémentaire avec 1 Augmentation de moins que d'ordinaire."
    },
    {
      id: "tatouage-chauve-souris",
      name: "Chauve-souris (Bat)",
      kanji: "蝙蝠",
      element: "Air",
      ringReq: 2,
      activation: "Action Simple",
      duration: "Nombre de rounds égal au Rang d'Air × 2",
      desc: "Une chauve-souris aux ailes déployées sur le torse, oreilles dressées vers l'écho.",
      rule: "Vous percevez le monde par écholocalisation. Vous ignorez totalement les pénalités d'obscurité, de brume ou de cécité, et vous bénéficiez de +2g0 sur tous vos jets de Vigilance (Perception)."
    },
    {
      id: "tatouage-chrysantheme",
      name: "Chrysanthème (Chrysanthemum)",
      kanji: "菊",
      element: "Air",
      ringReq: 3,
      activation: "Action Simple (Dépense 1 point de Vide)",
      duration: "Une scène",
      desc: "L'emblème impérial aux pétales d'or pur gravé sur le sternum.",
      rule: "Une aura de majesté inviolable émane de votre silhouette. Les adversaires dont le Statut ou l'Honneur est inférieur au vôtre doivent réussir un jet de Volonté ND 20 pour pouvoir vous porter une attaque délibérée."
    },
    {
      id: "tatouage-corbeau",
      name: "Corbeau (Crow)",
      kanji: "烏",
      element: "Vide",
      ringReq: 2,
      activation: "Action Simple",
      duration: "Nombre d'heures égal au Rang de Vide",
      desc: "Un corbeau au plumage d'encre juché sur l'épaule, observant les secrets d'autrui.",
      rule: "Vous pouvez comprendre et parler n'importe quelle langue humaine ou dialecte étranger (gaijin). Vous gagnez également +1g1 sur tous vos jets d'Intuition (Awareness) pour sonder les intentions cachées."
    },
    {
      id: "tatouage-crabe",
      name: "Crabe (Crab)",
      kanji: "蟹",
      element: "Terre",
      ringReq: 3,
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au Rang de Terre",
      desc: "Un crabe cuirassé aux pinces d'acier barrant l'avant-bras ou le dos.",
      rule: "Votre peau prend la dureté de la chitine la plus épaisse : vous gagnez une Réduction de dégâts égale à votre Anneau de Terre (cumulable avec l'armure)."
    },
    {
      id: "tatouage-dragon",
      name: "Dragon (Dragon)",
      kanji: "龍",
      element: "Vide",
      ringReq: 4,
      activation: "Action Complexe (Dépense 1 point de Vide)",
      duration: "Instantanée",
      desc: "Le grand dragon céleste lové autour du torse, les yeux brûlant de la flamme de Togashi.",
      rule: "Vous projetez un souffle d'énergie élémentaire pure (Feu ou Électricité) dans un cône de 6 mètres. Toutes les cibles subissent un jet de dégâts de (Anneau de Vide + Rang d'École)g(Anneau de Vide). Les victimes peuvent réussir un jet de Réflexes ND 20 pour diviser les dégâts par deux."
    },
    {
      id: "tatouage-eclair",
      name: "Éclair (Lightning)",
      kanji: "雷",
      element: "Feu",
      ringReq: 3,
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "1 round",
      desc: "Un éclair zébrant le deltoïde et crépitant d'arcs électriques bleutés.",
      rule: "Votre vitesse devient fulgurante : vous bénéficiez d'une Action Simple supplémentaire durant ce tour, utilisable pour une attaque à mains nues ou un déplacement."
    },
    {
      id: "tatouage-faucon",
      name: "Faucon (Falcon)",
      kanji: "鷹",
      element: "Air",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre d'heures égal au Rang d'Air",
      desc: "Un faucon aux serres acérées prêt à fondre sur sa proie depuis la clavicule.",
      rule: "Votre vue perçoit les moindres détails jusqu'à 3 kilomètres de distance. Vous ignorez toutes les pénalités de portée ou de faible luminosité pour vos jets de perception visuelle."
    },
    {
      id: "tatouage-feu",
      name: "Feu (Fire)",
      kanji: "火",
      element: "Feu",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de rounds égal au Rang de Feu",
      desc: "Des flammes vives s'enroulant autour des poings et des avant-bras.",
      rule: "Vos frappes de Jiujutsu s'embrasent : vous ajoutez +1g1 aux dégâts de toutes vos attaques à mains nues. Ces dégâts sont de nature magique et élémentaire (Feu)."
    },
    {
      id: "tatouage-fleche",
      name: "Flèche (Arrow)",
      kanji: "矢",
      element: "Air",
      ringReq: 2,
      activation: "Action Simple",
      duration: "Instantanée",
      desc: "Une flèche d'or empennée de plumes de grue s'alignant sur l'avant-bras.",
      rule: "Vous pouvez projeter une flèche de chi pur à mains nues avec une portée de 30 mètres. Le jet d'attaque s'effectue sous (Réflexes + Jiujutsu) et inflige des dégâts égaux à 2g2 + Rang de Vide."
    },
    {
      id: "tatouage-grue",
      name: "Grue (Crane)",
      kanji: "鶴",
      element: "Air",
      ringReq: 3,
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au Rang d'Air",
      desc: "Une grue d'argent prenant son envol depuis votre omoplate.",
      rule: "Votre démarche gagne une élégance aérienne surnaturelle : vous ajoutez votre Anneau d'Air directement à votre ND d'Armure et à votre total d'Initiative."
    },
    {
      id: "tatouage-lame",
      name: "Lame (Blade)",
      kanji: "刀",
      element: "Terre",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de rounds égal au Rang de Terre",
      desc: "Un katana nu et tranchant comme un rasoir dessiné sur le tranchant de la main.",
      rule: "Vos mains nues portent le tranchant de l'acier forgé : vos frappes infligent des dégâts tranchants, et vos dés de dégâts à mains nues explosent sur 9 et 10."
    },
    {
      id: "tatouage-licorne",
      name: "Licorne (Unicorn)",
      kanji: "一角獣",
      element: "Eau",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de minutes égal au Rang d'Eau × 10",
      desc: "Un étalon sauvage blanc aux sabots d'argent galopant sur la cuisse.",
      rule: "Votre vitesse de déplacement terrestre est multipliée par deux. Vous pouvez courir sans vous essouffler pendant des heures sans test d'endurance."
    },
    {
      id: "tatouage-loup",
      name: "Loup (Wolf)",
      kanji: "狼",
      element: "Eau",
      ringReq: 2,
      activation: "Action Simple",
      duration: "Nombre d'heures égal au Rang d'Eau",
      desc: "Une gueule de loup gris aux crocs dénudés sur le pectoral.",
      rule: "Vous développez le flair d'un loup traqueur : vous pouvez suivre n'importe quelle piste olfactive fraîche sans jet de dés et détectez les ennemis cachés à moins de 15 mètres."
    },
    {
      id: "tatouage-montagne",
      name: "Montagne (Mountain)",
      kanji: "山",
      element: "Terre",
      ringReq: 3,
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au Rang de Terre",
      desc: "Les pics acérés des montagnes du Dragon dessinés en aplat d'encre sombre sur le dos.",
      rule: "Vous vous enracinez dans la terre : vous êtes totalement immunisé aux manœuvres de Renversement (Knockdown) et de Désarmement. Les pénalités de blessures que vous subissez sont réduites de 5."
    },
    {
      id: "tatouage-nuage",
      name: "Nuage (Cloud)",
      kanji: "雲",
      element: "Air",
      ringReq: 3,
      activation: "Action Simple (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au Rang d'Air",
      desc: "Des volutes de brume nébuleuse encerclant la gorge et le torse.",
      rule: "Votre silhouette devient vaporeuse : toutes les attaques physiques dirigées contre vous subissent une pénalité de -2g0 au toucher, et vous pouvez franchir des interstices étroits (grilles, fentes)."
    },
    {
      id: "tatouage-ocean",
      name: "Océan (Ocean)",
      kanji: "海",
      element: "Eau",
      ringReq: 3,
      activation: "Action Simple",
      duration: "Nombre de jours égal au Rang d'Eau",
      desc: "Une grande vague stylisée aux écumes blanches sur les flancs.",
      rule: "Votre corps n'a plus besoin de nourriture solide ni de boisson pour subsister durant la durée de l'effet. Vous pouvez également respirer sous l'eau sans aucune difficulté."
    },
    {
      id: "tatouage-papillon",
      name: "Papillon (Butterfly)",
      kanji: "蝶",
      element: "Air",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de minutes égal au Rang d'Air × 2",
      desc: "Un papillon aux ailes diaphanes posé sur la cheville.",
      rule: "Votre corps ne pèse plus rien : vous pouvez courir sur l'eau, sur la neige fraîche ou sur des branchages fragiles sans laisser d'empreinte ni briser la surface."
    },
    {
      id: "tatouage-phenix",
      name: "Phénix (Phoenix)",
      kanji: "鳳凰",
      element: "Vide",
      ringReq: 4,
      activation: "Automatique en cas de trépas (Dépense 1 point de Vide)",
      duration: "Instantanée",
      desc: "L'oiseau immortel aux ailes de braise couvrant l'intégralité du dos.",
      rule: "Une fois par campagne ou avec l'accord du MJ : si un coup fatal devait vous tuer, le phénix s'embrase. Vos blessures sont instantanément soignées jusqu'au palier Indemne (+0) et toutes les créatures hostiles autour de vous subissent 3g3 dégâts de Feu."
    },
    {
      id: "tatouage-pin",
      name: "Pin (Pine)",
      kanji: "松",
      element: "Terre",
      ringReq: 2,
      activation: "Passif (Permanent)",
      duration: "Permanent",
      desc: "Une branche de pin noueuse défiant le givre sur l'avant-bras.",
      rule: "Vous êtes naturellement immunisé contre les effets du froid polaire ordinaire et bénéficiez d'un bonus permanent de +2g0 pour résister aux maladies non-surnaturelles."
    },
    {
      id: "tatouage-scorpion",
      name: "Scorpion (Scorpion)",
      kanji: "蠍",
      element: "Feu",
      ringReq: 3,
      activation: "Action Libre",
      duration: "1 round",
      desc: "Un scorpion noir aux dards écarlates prêt à piquer sur le poignet.",
      rule: "Votre prochaine frappe à mains nues réussie injecte un venin paralysant : la cible doit réussir un jet de Constitution ND (10 + 5 × Rang de Feu) ou devenir Étourdie (Dazed) pendant 1 round."
    },
    {
      id: "tatouage-singe",
      name: "Singe (Monkey)",
      kanji: "猿",
      element: "Eau",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de rounds égal au Rang d'Eau × 2",
      desc: "Un macaque facétieux bondissant sur le mollet.",
      rule: "Bonus de +2g2 sur tous vos jets d'Athlétisme. Vous pouvez vous relever de terre (Prone) comme une Action Gratuite sans dépenser de dé de mouvement."
    },
    {
      id: "tatouage-soleil",
      name: "Soleil (Sun)",
      kanji: "日",
      element: "Feu",
      ringReq: 4,
      activation: "Action Simple (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au Rang de Feu",
      desc: "Un disque solaire doré éblouissant tatoué au centre de la paume.",
      rule: "Une lumière aveuglante jaillit de votre main. Les créatures de l'Outremonde (Souillées) à moins de 9 mètres subissent 2g2 points de dégâts par round et subissent une pénalité de -2g0 à tous leurs jets d'attaque en raison de l'éblouissement sacré."
    },
    {
      id: "tatouage-tigre",
      name: "Tigre (Tiger)",
      kanji: "虎",
      element: "Feu",
      ringReq: 3,
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au Rang de Feu",
      desc: "Un tigre rugissant aux griffes acérées prêt à bondir sur le flanc.",
      rule: "Vous combattez avec une férocité décuplée : vos frappes à mains nues infligent +2g0 dégâts supplémentaires et vous bénéficiez de l'Avantage Peur (Fear) au Rang 2 face à vos adversaires."
    },
    {
      id: "tatouage-tortue",
      name: "Tortue (Turtle)",
      kanji: "亀",
      element: "Terre",
      ringReq: 2,
      activation: "Action Libre",
      duration: "Nombre de rounds égal au Rang de Terre",
      desc: "Une tortue millénaire sacrée entourée de caractères shinto sur la poitrine.",
      rule: "Vous gagnez un bonus de +5 à votre ND d'Armure lorsque vous adoptez la Posture Défense ou Défense Totale. De plus, vous gagnez +1g1 sur tous vos jets de Volonté pour résister à la peur ou à l'intimidation."
    }
  ];

  // Indexation globale
  if (typeof window !== "undefined") {
    window.TATOUAGES_DATA = TATOUAGES_DATA;
  }
})();
