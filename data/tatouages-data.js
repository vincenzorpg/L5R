/**
 * data/tatouages-data.js — L5R 4e Édition
 * Recueil officiel exact de l'Ordre Tatoué Togashi (Ise Zumi) (24 Tatouages).
 * Sources : Livre de Base L5R 4e (pp. 115–116), The Book of Air (p. 195),
 *           The Book of Earth (p. 207) et The Book of Fire (p. 192).
 *
 * RÈGLES OFFICIELLES DES TATOUAGES ISE ZUMI (Livre de Base p. 115) :
 * - Progression : 2 tatouages aux Rangs d'École 1, 3 et 5.
 * - Exposition : Ne s'activent que découverts (inopérants s'ils sont couverts par un vêtement ou une armure).
 * - Activation : Action Gratuite (Free Action), sauf mention contraire.
 * - Limite : 1 seul tatouage actif simultanément (sauf mention contraire).
 * - Durée : Nombre de rounds égal au double du Rang d'École (2 × Rang d'École), sauf mention contraire.
 * - Option Tatouages Fusionnés (Book of Air p. 195) : En renonçant à un nouveau tatouage lors d'un gain de Rang, deux tatouages existants peuvent fusionner en un seul (s'activent ensemble en Action Gratuite pour 1 Point de Vide, sans jamais pouvoir être activés séparément).
 */

(function () {
  const TATOUAGES_DATA = [
    // ==========================================
    // --- 1. LIVRE DE BASE V4 (20 TATOUAGES) ---
    // ==========================================
    {
      id: "tatouage-balance",
      name: "Balance (Balance)",
      kanji: "天秤",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 115)",
      desc: "Le symbole spirituel du yin et du yang apaise l'esprit et l'âme.",
      rule: "Tant que ce tatouage est actif, le ND de tous les jets d'incantation (Spell Casting Rolls) effectués en vous ciblant est augmenté ou diminué d'un montant égal à (2 × votre Rang d'École + 5). Vous choisissez s'il s'agit d'une augmentation ou d'une diminution au moment de l'activation."
    },
    {
      id: "tatouage-bambou",
      name: "Bambou (Bamboo)",
      kanji: "竹",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 115)",
      desc: "Le bambou croît avec rapidité et résiste par sa souplesse sans jamais rompre.",
      rule: "Tant que ce tatouage est actif, votre ND d'Armure (Armor TN) est augmenté d'un montant égal à (2 × votre Rang d'École + 5)."
    },
    {
      id: "tatouage-brasier",
      name: "Brasier (Blaze)",
      kanji: "火炎",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 115)",
      desc: "Libère la puissance et la furie du feu sur les mains et avant-bras.",
      rule: "Vos frappes à mains nues s'accompagnent de flammes vacillantes qui infligent un montant supplémentaire de dégâts de feu égal à (votre Anneau de Feu + votre Rang d'École)."
    },
    {
      id: "tatouage-centipede",
      name: "Mille-pattes (Centipede)",
      kanji: "百足",
      type: "Togashi",
      activation: "Action Complexe de Mouvement",
      duration: "Jusqu'à 1 jour entier",
      source: "Livre de Base (p. 115)",
      desc: "Des centaines de pattes agissant à l'unisson pour porter le moine à travers l'Empire.",
      rule: "À l'activation, vous pouvez effectuer une Action de Mouvement Complexe spéciale permettant de parcourir une distance égale à (votre Anneau d'Eau × 100 pieds, soit env. 30 m × Eau). Cet effet dure jusqu'à une journée entière, permettant de traverser l'Empire en un jour. Si vous vous arrêtez plus d'une minute, l'effet prend fin. À la fin de l'effet, vous vous effondrez d'épuisement et ne pouvez accomplir aucune action physique pendant 12 heures."
    },
    {
      id: "tatouage-crabe",
      name: "Crabe (Crab)",
      kanji: "蟹",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Le minuscule crabe possède une carapace d'une résistance sans mesure pour sa taille.",
      rule: "Tant que ce tatouage est actif, vous bénéficiez d'une Réduction égale à votre Anneau de Terre."
    },
    {
      id: "tatouage-dragon",
      name: "Dragon (Dragon)",
      kanji: "龍",
      type: "Togashi",
      activation: "Action Complexe (pendant l'activation du tatouage)",
      duration: "Instantané / 2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Un tatouage redoutable renfermant le souffle incandescent du Dragon Céleste.",
      rule: "Par une Action Complexe, vous pouvez cracher du feu dans un cône mesurant (3 mètres / 10' + votre Rang d'École en pieds, soit env. +30 cm/Rang) de long et 1,5 mètre (5') de large à son extrémité. Ce feu inflige des dégâts à toute cible dans sa zone d'effet avec une VD égale à votre Anneau de Feu (Feu g Feu). Vous subissez vous-même un nombre de Blessures égal à votre Anneau de Feu à chaque utilisation."
    },
    {
      id: "tatouage-faucon",
      name: "Faucon (Hawk)",
      kanji: "鷹",
      type: "Togashi",
      activation: "Action Complexe",
      duration: "Instantané",
      source: "Livre de Base (p. 116)",
      desc: "Emprunte l'essence du rapace des cimes pour franchir de grands espaces d'un bond.",
      rule: "Par une Action Complexe, vous pouvez effectuer un bond sur une distance maximale égale à (votre Anneau d'Eau × 7,5 mètres / 25')."
    },
    {
      id: "tatouage-grue",
      name: "Grue (Crane)",
      kanji: "鶴",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "1 Heure",
      source: "Livre de Base (p. 116)",
      desc: "Symbole de bonne fortune, d'élégance et de beauté.",
      rule: "À l'activation, vous gagnez une réserve de dés bonus égale à (votre Rang d'École + votre Anneau d'Air), dépensables sur tout jet de Compétence Sociale pour un bonus de +1g0 par dé (sans pouvoir ajouter plus de dés bonus à un même jet que votre Anneau de Vide). Les dés non utilisés après 1 heure sont perdus. Ce tatouage reste considéré comme actif pendant toute l'heure, et si vous activez un autre tatouage, les dés non dépensés sont perdus."
    },
    {
      id: "tatouage-ki-rin",
      name: "Ki-Rin (Ki-Rin)",
      kanji: "麒麟",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Peu de présages de bonne fortune égalent la créature sacrée des cieux.",
      rule: "Dès l'activation et tant qu'il dure, vous pouvez immédiatement relancer n'importe quel unique jet de dé par round, en conservant le plus élevé des deux résultats."
    },
    {
      id: "tatouage-lion",
      name: "Lion (Lion)",
      kanji: "獅子",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Le lion fier et noble, incarnant la maîtrise martiale.",
      rule: "À l'activation, vous gagnez un nombre de Rangs égal à votre Rang d'École dans n'importe quelle Compétence Bugei de votre choix."
    },
    {
      id: "tatouage-loup",
      name: "Loup (Wolf)",
      kanji: "狼",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "Rang d'École en heures",
      source: "Livre de Base (p. 116)",
      desc: "Le grand pisteur des terres sauvages aux sens surnaturellement affûtés.",
      rule: "À l'activation, vos sens deviennent surhumains et vous percevez les moindres détails et odeurs individuelles. Vous gagnez un nombre d'Augmentations Gratuites égal à votre Rang d'École sur tous vos jets de Compétence Chasse (Pistage) [Hunting (Tracking)]. Cet effet dure un nombre d'heures égal à votre Rang d'École."
    },
    {
      id: "tatouage-mante",
      name: "Mante (Mantis)",
      kanji: "蟷螂",
      type: "Togashi",
      activation: "Passif (Permanent)",
      duration: "Permanent",
      source: "Livre de Base (p. 116)",
      desc: "La mante est un combattant féroce et intrépide malgré sa taille minuscule.",
      rule: "Dès réception de ce tatouage, vous êtes totalement immunisé contre tous les effets de Peur (Fear). Ce tatouage est actif en permanence et n'empêche pas l'utilisation d'autres tatouages."
    },
    {
      id: "tatouage-montagne",
      name: "Montagne (Mountain)",
      kanji: "山",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "La montagne est éternelle et inébranlable face aux épreuves.",
      rule: "À l'activation, toutes vos pénalités de Blessures (Wound Penalties) sont réduites d'un montant égal à (votre Rang d'École + 2)."
    },
    {
      id: "tatouage-ocean",
      name: "Océan (Ocean)",
      kanji: "海",
      type: "Togashi",
      activation: "Passif / Action Gratuite",
      duration: "Permanent / Instantané",
      source: "Livre de Base (p. 116)",
      desc: "Les abysses sans limites de l'océan détiennent les secrets de la vie et du renouveau.",
      rule: "Dès que vous recevez ce tatouage, vous n'avez plus besoin ni de boire ni de manger (bien que vous le puissiez si vous le souhaitez). À l'activation, vous êtes instantanément rafraîchi comme après huit heures de sommeil et regagnez tous vos points de Vide dépensés. Ce tatouage ne peut être utilisé qu'une fois tous les trois jours."
    },
    {
      id: "tatouage-phenix",
      name: "Phénix (Phoenix)",
      kanji: "鳳凰",
      type: "Togashi",
      activation: "Automatique",
      duration: "Instantané",
      source: "Livre de Base (p. 116)",
      desc: "Le phénix ne peut jamais être véritablement vaincu et renaît de ses cendres.",
      rule: "Vous devez posséder au moins un point de Vide non dépensé pour que ce tatouage se déclenche. Lorsque vous êtes réduit au Rang de Blessure À Terre (Down) ou en dessous, ce tatouage s'active automatiquement : tous vos points de Vide non dépensés sont perdus, et vous guérissez immédiatement d'un nombre de Blessures égal à (votre Rang d'École × 10). Ce tatouage ne peut pas être activé plus d'une fois par semaine."
    },
    {
      id: "tatouage-scorpion",
      name: "Scorpion (Scorpion)",
      kanji: "蠍",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Le scorpion est silencieux, patient et mortel.",
      rule: "Tant que ce tatouage est actif, vous lancez un nombre de dés supplémentaires égal à votre Rang d'École (+Rang g 0) sur tout jet de Compétence Discrétion (Stealth). De plus, durant cet effet, vos attaques à mains nues infligent automatiquement l'état Étourdi (Dazed) à votre adversaire si au moins un dé explose sur votre jet de dégâts."
    },
    {
      id: "tatouage-araignee",
      name: "Araignée (Spider)",
      kanji: "蜘蛛",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "L'araignée est vive et adroite, échappant aux prédateurs grâce à son agilité.",
      rule: "Tant que ce tatouage est actif, vous pouvez vous déplacer sur des surfaces verticales et inversées (telles que murs verticaux ou plafonds) lorsque vous effectuez des Actions de Mouvement. Vous vous déplacez à la moitié de votre vitesse normale en agissant ainsi."
    },
    {
      id: "tatouage-tempete",
      name: "Tempête (Storm)",
      kanji: "嵐",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "La tempête est la furie de la nature et peu savent résister à sa puissance brute.",
      rule: "Tant que ce tatouage est actif, vos attaques à mains nues ne nécessitent qu'une seule Augmentation (au lieu de deux) pour utiliser la manœuvre Renversement (Knockdown)."
    },
    {
      id: "tatouage-vide",
      name: "Vide (Void)",
      kanji: "空",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Ce kanji d'encre noire incarne l'unité avec toute chose.",
      rule: "À l'activation, vous percevez toute vie autour de vous : vous connaissez l'emplacement et des détails généraux sur tous les êtres vivants dans un rayon de (votre Rang d'École × 3 mètres / 10'), même sans pouvoir les voir. Vous ne connaissez que des détails généraux (« deux guerriers », « deux lapins ») et non leur identité exacte, sauf s'il s'agit d'individus qui vous sont bien connus."
    },
    {
      id: "tatouage-vent",
      name: "Vent (Wind)",
      kanji: "風",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "Livre de Base (p. 116)",
      desc: "Le vent est rapide et se déplace sans nulle entrave.",
      rule: "Tant que ce tatouage est actif, vous gagnez une Action Simple supplémentaire par round, qui ne peut être utilisée pour porter une attaque. De plus, votre déplacement total maximal n'est plus limité à (votre Anneau d'Eau × 6 mètres / 20')."
    },

    // ==========================================
    // --- 2. SUPPLÉMENTS OFFICIELS V4 (4 TATOUAGES) ---
    // ==========================================
    {
      id: "tatouage-nuage",
      name: "Nuage (Cloud)",
      kanji: "雲",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "The Book of Air (p. 195)",
      desc: "Confère au moine les qualités éthérées du vent et des cieux.",
      rule: "Tant que ce tatouage est actif, toute attaque de mêlée qui vous touche avec succès doit immédiatement réussir un second jet d'attaque : si ce second jet échoue, le coup rate. En contrepartie, tant que ce tatouage est actif, vous ne pouvez porter aucune attaque d'aucune sorte."
    },
    {
      id: "tatouage-chuchotement",
      name: "Chuchotement (Whisper)",
      kanji: "囁き",
      type: "Togashi",
      activation: "Action Complexe (pendant l'activation du tatouage)",
      duration: "2 × Rang d'École en rounds",
      source: "The Book of Air (p. 195)",
      desc: "Tatouage très rare figurant une personne de profil portant la main à la bouche.",
      rule: "Tant que ce tatouage est actif, par une Action Complexe vous pouvez envoyer un message chuchoté à n'importe quelle personne située dans un rayon de (10 × votre Rang d'École) miles (× 1,6 km). Vous ne pouvez pas recevoir de messages de la cible à moins qu'elle ne partage le même tatouage ou dispose d'un autre moyen de transmission."
    },
    {
      id: "tatouage-ours",
      name: "Ours (Bear)",
      kanji: "熊",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "The Book of Earth (p. 207)",
      desc: "L'ours est une force primordiale de la nature, redoutable jusque dans ses moments de faiblesse.",
      rule: "Tant que ce tatouage est actif, vous pouvez choisir soit d'augmenter votre Constitution (Stamina) d'un montant égal à votre Rang d'École, soit d'augmenter votre Force (Strength) d'un montant égal à la moitié de votre Rang d'École (arrondie au supérieur) — mais jamais les deux simultanément."
    },
    {
      id: "tatouage-volcan",
      name: "Volcan (Volcano)",
      kanji: "火山",
      type: "Togashi",
      activation: "Action Gratuite",
      duration: "2 × Rang d'École en rounds",
      source: "The Book of Fire (p. 192)",
      desc: "La peau du torse et des membres supérieurs prend l'aspect de lave noire fissurée d'éclats incandescents.",
      rule: "Tout objet inflammable frappant le corps du moine (armes en bois, flèches) se consume en cendres, conférant Réduction 5 contre ces attaques. Les armes métalliques infligent leurs dégâts normaux, mais leurs porteurs doivent remporter un jet opposé de Feu contre le moine sous peine de lâcher leur arme brûlante (les Armes Sacrées et nemuranai sont immunisés). Les attaques à mains nues (dont Frapper en Lutte) infligent des dégâts normaux — sauf si le MJ juge que des coups très puissants (> 2 dés gardés) fissurent la lave, infligeant au frappeur des Blessures égales à l'Anneau de Feu du moine. L'effet peut être évité via Coup Précis visant tête ou membres inférieurs."
    }
  ];

  if (typeof window !== "undefined") {
    window.TATOUAGES_DATA = TATOUAGES_DATA;
  }
})();
