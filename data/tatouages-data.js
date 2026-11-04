/**
 * data/tatouages-data.js — L5R 4e Édition
 * Ordre Tatoué Togashi (Ise Zumi) — Livre de Base, pages 263 à 266.
 *
 * RÈGLES GÉNÉRALES DE L'ÉCOLE :
 * - Attribution : 2 Tatouages aux Rangs d'École 1, 3 et 5.
 * - Activation : Action Libre (Free Action), le tatouage devant être exposé à l'air libre.
 * - Limite : 1 seul tatouage actif à la fois (sauf mention contraire).
 * - Durée : Nombre de rounds égal au double du Rang d'École (2 × Rang d'École).
 */

(function () {
  const TATOUAGES_DATA = [
    {
      id: "tatouage-balance",
      name: "Balance (Balance)",
      kanji: "天秤",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 263)",
      desc: "Le symbole spirituel de l'harmonie et du yin-yang gravé à l'encre sacrée, apaisant le corps et l'esprit.",
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
      desc: "Une tige de bambou vert peinte le long d'un membre ou du dos, réputée pour sa souplesse et sa résistance proverbiale.",
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
      desc: "Des gerbes de flammes ardentes stylisées qui semblent s'animer le long des avant-bras et des mains.",
      rule: "Les frappes à mains nues du moine sont imprégnées de flammes pures. Toutes ses attaques à mains nues infligent un montant supplémentaire de dégâts de feu égal à (Anneau de Feu + Rang d'École)."
    },
    {
      id: "tatouage-centipede",
      name: "Mille-pattes (Centipede)",
      kanji: "百足",
      type: "Togashi",
      activation: "Action Complexe de Mouvement",
      duration: "Jusqu'à 1 jour complet (ou arrêt de plus d'1 min)",
      source: "Livre de Base (p. 263)",
      desc: "Un scolopendre aux innombrables pattes courant le long du torse ou d'une jambe.",
      rule: "Le moine peut entreprendre une Action Complexe de Mouvement spéciale lui permettant de courir à une allure surhumaine : il parcourt une distance égale à son Anneau d'Eau × 100 par action de mouvement. L'effet persiste jusqu'à un jour complet. S'il s'arrête de courir pendant plus d'une minute consécutive, l'effet cesse net et le moine subit l'état Épuisé (aucune action physique possible pendant 12 heures)."
    },
    {
      id: "tatouage-crabe",
      name: "Crabe (Crab)",
      kanji: "蟹",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 263)",
      desc: "Une carapace de crabe massive barrant les épaules ou la poitrine du moine.",
      rule: "Le moine gagne une valeur de Réduction des dégâts égale à son Anneau de Terre. Cette protection se cumule normalement avec toute armure ou technique."
    },
    {
      id: "tatouage-dragon",
      name: "Dragon (Dragon)",
      kanji: "龍",
      type: "Togashi",
      activation: "Action Libre (Dépense 1 point de Vide)",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "L'effigie majestueuse et terrifiante du grand dragon céleste enroulé autour du torse.",
      rule: "Requiert la dépense d'un point de Vide lors de l'activation. Le moine s'entoure d'une aura d'autorité divine et de terreur sacrée : il acquiert la capacité Peur (Fear) à un rang égal à son Rang d'École face à tous ses adversaires."
    },
    {
      id: "tatouage-grue",
      name: "Grue (Crane)",
      kanji: "鶴",
      type: "Togashi",
      activation: "Action Libre",
      duration: "1 heure",
      source: "Livre de Base (p. 264)",
      desc: "Une grue aux ailes d'argent déployées avec grâce sur l'omoplate.",
      rule: "À l'activation, le moine reçoit un réservoir de dés bonus égal à (Rang d'École + Anneau d'Air). Pendant l'heure qui suit, il peut dépenser ces dés pour obtenir un bonus de +1g0 par dé sur n'importe quel jet de compétence sociale (avec un maximum de dés dépensés par jet égal à son Anneau de Vide). Les dés non utilisés expirent au bout d'une heure."
    },
    {
      id: "tatouage-ki-rin",
      name: "Ki-Rin (Ki-Rin)",
      kanji: "麒麟",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "L'animal céleste annonciateur de bénédiction, de prescience et de chance insolente.",
      rule: "Tant que le tatouage est actif, le moine peut relancer un dé ou un jet quelconque par round, en conservant le résultat le plus favorable des deux."
    },
    {
      id: "tatouage-lion",
      name: "Lion (Lion)",
      kanji: "獅子",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "Un fier lion impérial à la crinière d'encre sombre, symbole de dévouement martial absolu.",
      rule: "Lors de l'activation, le moine choisit une Compétence Bugei : il gagne immédiatement un nombre de rangs dans cette compétence égal à son Rang d'École pour la durée de l'effet."
    },
    {
      id: "tatouage-loup",
      name: "Loup (Wolf)",
      kanji: "狼",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre d'heures égal au Rang d'École",
      source: "Livre de Base (p. 264)",
      desc: "Une tête de loup sauvage aux oreilles pointées et aux sens en éveil sur le flanc.",
      rule: "Le moine bénéficie d'un nombre d'Augmentations Gratuites égal à son Rang d'École sur tous ses jets de Chasse (notamment pour la traque et le pistage). Dure un nombre d'heures égal à son Rang d'École."
    },
    {
      id: "tatouage-mante",
      name: "Mante (Mantis)",
      kanji: "蟷螂",
      type: "Togashi",
      activation: "Passif (Permanent)",
      duration: "Permanent",
      source: "Livre de Base (p. 264)",
      desc: "Une mante religieuse miniature aux pinces dressées sans crainte face aux géants.",
      rule: "Le moine est totalement immunisé de façon permanente contre tous les effets de Peur (naturels comme magiques). Ce tatouage reste actif en permanence et ne compte pas dans la limite d'un seul tatouage actif à la fois."
    },
    {
      id: "tatouage-montagne",
      name: "Montagne (Mountain)",
      kanji: "山",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Les sommets acérés des monts septentrionaux du Clan du Dragon gravés dans le haut du dos.",
      rule: "La résilience de la pierre s'empare du corps : le moine réduit toutes les pénalités au ND infligées par ses différents Rangs de Blessures d'un montant égal à (Rang d'École + 2)."
    },
    {
      id: "tatouage-ocean",
      name: "Océan (Ocean)",
      kanji: "海",
      type: "Togashi",
      activation: "Action Libre / Passif",
      duration: "Permanent + Rétablissement instantané",
      source: "Livre de Base (p. 265)",
      desc: "Le flux éternel des vagues marines déferlant en spirales sur les côtes du corps.",
      rule: "Tant qu'il porte ce tatouage, le moine n'a plus besoin de boire ni de manger pour subsister. De plus, une fois tous les 3 jours, il peut l'activer pour être instantanément revigoré comme après 8 heures de repos complet et regagner l'intégralité de ses points de Vide dépensés."
    },
    {
      id: "tatouage-phenix",
      name: "Phénix (Phoenix)",
      kanji: "鳳凰",
      type: "Togashi",
      activation: "Automatique (Réaction)",
      duration: "Instantanée",
      source: "Livre de Base (p. 265)",
      desc: "L'oiseau de braise mythique étendant ses ailes protectrices sur le cœur du moine.",
      rule: "Si le moine dispose d'au moins 1 point de Vide non dépensé et chute au Rang de Blessure Hors de Combat ou en dessous, le tatouage se déclenche automatiquement : tous ses points de Vide restants sont consommés et il guérit immédiatement un nombre de Blessures égal à (Rang d'École × 10). Cet effet ne peut se produire qu'une fois par semaine."
    },
    {
      id: "tatouage-scorpion",
      name: "Scorpion (Scorpion)",
      kanji: "蠍",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Un scorpion d'encre noire armé d'un dard venimeux sur le poignet.",
      rule: "Le moine ajoute un nombre de dés non gardés égal à son Rang d'École (+Rang g 0) sur tous ses jets de Discrétion (Stealth). De plus, ses attaques à mains nues rendent la cible Étourdie (Dazed) pour 1 round dès lors qu'au moins un dé explose sur son jet de dégâts."
    },
    {
      id: "tatouage-singe",
      name: "Singe (Monkey)",
      kanji: "猿",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Un macaque agile et bondissant peint le long du mollet et de la cheville.",
      rule: "Le moine gagne un bonus égal à (2 × Rang d'École) à tous ses jets d'Athlétisme. De plus, se relever lorsqu'il est À Terre (Prone) devient pour lui une Action Libre ne nécessitant aucun dé de mouvement."
    },
    {
      id: "tatouage-soleil",
      name: "Soleil (Sun)",
      kanji: "日",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Un disque solaire étincelant aux rayons dorés gravé dans le creux de la main ou sur la gorge.",
      rule: "Le moine irradie d'une lumière solaire pure dans un rayon de 9 mètres (30 pieds). Les créatures possédant au moins 1 Rang de Souillure de l'Outremonde situées dans ce rayonnement subissent un malus de -2g0 à tous leurs jets d'attaque et encaissent (Rang d'École)g(Rang d'École) blessures directes au début de chaque round passé dans la zone."
    },
    {
      id: "tatouage-tempete",
      name: "Tempête (Storm)",
      kanji: "嵐",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 265)",
      desc: "Des nuées orageuses tourbillonnantes et des bourrasques peintes autour des jambes.",
      rule: "Le coût de la manœuvre Renversement (Knockdown) à mains nues est réduit à 1 seule Augmentation (au lieu de 2)."
    },
    {
      id: "tatouage-tortue",
      name: "Tortue (Turtle)",
      kanji: "亀",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 266)",
      desc: "La tortue sacrée aux motifs géométriques parant le plastron pectoral.",
      rule: "Le moine bénéficie d'un bonus fixe de +(Rang d'École × 2) à son ND d'Armure lorsqu'il adopte la Posture Défense ou la Posture Défense Totale. Il gagne également +1g1 sur tous ses jets de Volonté pour contrer les tentatives de manipulation sociale ou d'intimidation."
    },
    {
      id: "tatouage-vide",
      name: "Vide (Void)",
      kanji: "空",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 266)",
      desc: "Le cercle parfait (Ensō) sans commencement ni fin tracé à l'encre obscure sur le plexus.",
      rule: "Le moine perçoit directement le flux vital cosmique : il détecte avec précision l'emplacement et la présence de tout être vivant situé dans un rayon égal à (Rang d'École × 10) pieds (soit environ Rang × 3 mètres)."
    },
    {
      id: "tatouage-vent",
      name: "Vent (Wind)",
      kanji: "風",
      type: "Togashi",
      activation: "Action Libre",
      duration: "Nombre de rounds égal au double du Rang d'École",
      source: "Livre de Base (p. 266)",
      desc: "Des volutes éthérées et tourbillons aériens enveloppant les jambes et les cuisses.",
      rule: "Le moine bénéficie d'une Action Simple de mouvement supplémentaire à chaque round. De plus, il n'est plus bridé par la limite normale de déplacement maximale par tour imposée par l'Anneau d'Eau."
    }
  ];

  if (typeof window !== "undefined") {
    window.TATOUAGES_DATA = TATOUAGES_DATA;
  }
})();
