/**
 * data/avantages-data.js — L5R 4e Édition
 * Définition universelle (Array + Dictionnaire Objet) pour character-generator.js
 */

(function () {
  const AVANTAGES_LIST = [
    {
      id: "adv-ambidextre",
      name: "Ambidextre (Ambidextrous)",
      type: "Physique",
      cost: 3,
      prerequisite: "Agilité 3",
      desc: "Vous maniez vos armes et vos outils avec une égale dextérité de la main gauche comme de la main droite.",
      rule: "Vous ignorez la pénalité habituelle de +5 au ND (ou de -1g0) avec votre main non dominante. Requis pour le combat à deux armes sans malus."
    },
    {
      id: "adv-grand",
      name: "Grand (Large)",
      type: "Physique",
      cost: 2,
      prerequisite: "Incompatible avec Petit",
      desc: "Votre stature imposante domine le champ de bataille et impressionne le peuple de l'Empire.",
      rule: "Vous gagnez +1 point de vie supplémentaire à chaque palier de blessure. De plus, vous ajoutez +1g0 aux dégâts avec une arme à deux mains ou une arme lourde."
    },
    {
      id: "adv-dur-a-cuire",
      name: "Dur à Cuire (Toughness)",
      type: "Physique",
      cost: 5,
      prerequisite: "Aucun",
      desc: "Votre chair et votre ossature possèdent une densité tellurique hors du commun.",
      rule: "Le volume de points de vie de chacun de vos paliers de blessure est augmenté d'un montant égal à votre Anneau de Terre de base."
    },
    {
      id: "adv-vif",
      name: "Vif (Quick)",
      type: "Physique",
      cost: 4,
      prerequisite: "Réflexes 3",
      desc: "Vos réflexes fulgurants vous permettent d'anticiper la trajectoire des lames ennemies.",
      rule: "Vous ajoutez votre Anneau d'Air en bonus direct à tous vos jets d'Initiative au début de chaque tour de combat."
    },
    {
      id: "adv-combattant-rapide",
      name: "Vitesse Éclair (Lightning Reflexes)",
      type: "Physique",
      cost: 3,
      prerequisite: "Aucun",
      desc: "Votre corps bondit instinctivement dès qu'un péril mortel survient.",
      rule: "Lors de chaque jet d'Initiative, vous lancez 1 dé supplémentaire (+1g0). En cas d'égalité, vous agissez en premier."
    },
    {
      id: "adv-sens-aigus",
      name: "Sens Aiguisés (Keen Senses)",
      type: "Physique",
      cost: 3,
      prerequisite: "Aucun",
      desc: "Votre vue perçante, votre ouïe fine ou votre flair d'animal traqueur déjouent les pièges de l'ombre.",
      rule: "Vous recevez un bonus de +1g0 sur tous vos jets de Compétences basés sur le Trait Perception (Investigation, Chasse, Vigilance)."
    },
    {
      id: "adv-sang-osano-wo",
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
      type: "Physique",
      cost: 4,
      prerequisite: "Prisé par le Clan du Crabe",
      desc: "La foudre et les tempêtes du Seigneur du Tonnerre coulent dans vos veines.",
      rule: "Bonus de +1g1 sur tous vos jets de Constitution contre les intempéries, la privation ou les poisons. Réduction augmentée de 5 contre l'électricité."
    },
    {
      id: "adv-duelliste-ne",
      name: "Duelliste Émérite (Way of the Duelist)",
      type: "Physique",
      cost: 4,
      prerequisite: "Iaijutsu 3",
      desc: "Vous percevez le rythme exact de la respiration adverse précédant le dégainé du katana.",
      rule: "En duel formel d'Iaijutsu, vous gagnez +1g0 lors de la phase de Concentration pour obtenir des Augmentations Gratuites."
    },
    {
      id: "adv-pensee-claire",
      name: "Pensée Claire (Clear Thinker)",
      type: "Mental",
      cost: 3,
      prerequisite: "Incompatible avec Naïf",
      desc: "Votre logique d'acier et votre lucidité vous préservent des mensonges et des sortilèges illusoires.",
      rule: "Vous gagnez +2g0 sur tous vos jets opposés pour résister aux illusions, tromperies, Tentations ou manipulations mentales magiques."
    },
    {
      id: "adv-memoire-precise",
      name: "Mémoire Précise (Precise Memory)",
      type: "Mental",
      cost: 2,
      prerequisite: "Aucun",
      desc: "Vous retenez les détails d'un parchemin, les plans d'un château ou une généalogie avec une fidélité absolue.",
      rule: "Bonus de +1g0 sur les jets d'Intelligence pour vous remémorer un fait précis, réciter une loi ou reproduire un document."
    },
    {
      id: "adv-sens-danger",
      name: "Sens du Danger (Danger Sense)",
      type: "Mental",
      cost: 3,
      prerequisite: "Intuition 3",
      desc: "Un frisson tellurique vous avertit des trahisons et des embuscades avant qu'elles ne se referment.",
      rule: "Le MJ doit vous avertir dès qu'une embuscade vous cible. Vous ne pouvez jamais être Surpris au premier round d'un affrontement."
    },
    {
      id: "adv-prodigieux",
      name: "Prodige (Prodigy)",
      type: "Mental",
      cost: 12,
      prerequisite: "À la création uniquement",
      desc: "Vous assimilez n'importe quel art martial ou érudit deux fois plus vite.",
      rule: "Le coût en XP pour augmenter n'importe quelle Compétence est réduit de 1 point (minimum 1 XP par rang)."
    },
    {
      id: "adv-grand-potentiel",
      name: "Grand Potentiel (Great Potential)",
      type: "Mental",
      cost: 5,
      prerequisite: "Spécifier une Compétence",
      desc: "Votre famille a décelé en vous une disposition hors norme pour une discipline précise.",
      rule: "Choisissez une compétence : vous pouvez la monter jusqu'au rang 6 sans condition, et ses Augmentations libres coûtent 1 point de moins."
    },
    {
      id: "adv-voix",
      name: "La Voix de Rokugan (Voice)",
      type: "Social",
      cost: 3,
      prerequisite: "Incompatible avec Bégaiement",
      desc: "Votre voix possède un timbre noble et profond qui captive l'assemblée des cours.",
      rule: "Bonus de +1g0 sur tous les jets d'Éloquence, Chant, Déclamation, Commandement et Art de la Guerre (Tactique)."
    },
    {
      id: "adv-modele-bushido",
      name: "Modèle de Bushidō (Paragon of Bushido)",
      type: "Social",
      cost: 3,
      prerequisite: "Honneur 4.0 minimum",
      desc: "Vous personnifiez l'une des sept vertus cardinales de l'Empire de façon remarquable.",
      rule: "Choisissez une vertu : chaque gain d'Honneur directement rattaché à l'accomplissement héroïque de cette vertu est doublé."
    },
    {
      id: "adv-allie-influent",
      name: "Allié d'Influence (Ally)",
      type: "Social",
      cost: 4,
      prerequisite: "Définir l'identité du PNJ",
      desc: "Un haut dignitaire ou daimyō provincial vous est lié par une dette d'honneur sacrée.",
      rule: "Vous disposez d'un allié fixe de Statut égal à (votre Statut + 2) capable de vous fournir escortes, immunités ou appui politique."
    },
    {
      id: "adv-chanceux",
      name: "Chanceux (Lucky)",
      type: "Spirituel",
      cost: 3,
      prerequisite: "Cumulable jusqu'à 3 fois (3 pts/niveau)",
      desc: "Les Fortunes veillent sur votre pas et détournent la lame fatale au dernier instant.",
      rule: "Par niveau acheté, vous pouvez relancer une fois par session un jet de dés raté en gardant le second résultat."
    },
    {
      id: "adv-benediction-benten",
      name: "Bénédiction de Benten (Benten's Blessing)",
      type: "Spirituel",
      cost: 3,
      prerequisite: "Incompatible avec Odieux",
      desc: "La Fortune de l'Amour et des Arts a posé sa grâce sur vos traits et votre démarche.",
      rule: "Bonus de +1g0 sur tous les jets de Séduction, Courtisan, Étiquette et Persuasion."
    },
    {
      id: "adv-benediction-bishamon",
      name: "Bénédiction de Bishamon (Bishamon's Blessing)",
      type: "Spirituel",
      cost: 3,
      prerequisite: "Aucun",
      desc: "La Fortune de la Guerre approuve la vigueur de vos assauts.",
      rule: "En Posture d'Attaque Totale ou lors d'une manœuvre pour Dégâts Accrus, ajoutez +1g0 supplémentaire à vos dégâts."
    },
    {
      id: "adv-affinite-elementaire",
      name: "Affinité Élémentaire (Elemental Attunement)",
      type: "Spirituel",
      cost: 3,
      prerequisite: "Shugenja ou Moine",
      desc: "Les Kami d'un élément précis communient avec votre âme avec une intensité rare.",
      rule: "Choisissez un Élément : le ND d'incantation de tous ses sorts est réduit de 5, ou vous gagnez 1 Augmentation Gratuite."
    }
  ];

  const DESAVANTAGES_LIST = [
    {
      id: "dis-borgne",
      name: "Borgne (Blind in One Eye)",
      type: "Physique",
      cost: 2,
      gain: 2,
      prerequisite: "Aucun",
      desc: "Une cicatrice de duel ou une flèche perdue vous a privé d'un œil, réduisant votre vision périphérique.",
      rule: "Pénalité de -1g0 à tous les jets de Tir à l'arc (Kyujutsu), d'Armes de Jet et de Perception visuelle."
    },
    {
      id: "dis-boiteux",
      name: "Boiteux (Lame)",
      type: "Physique",
      cost: 3,
      gain: 3,
      prerequisite: "Aucun",
      desc: "Un coup d'épieu mal soigné ou une malformation vous fait traîner la jambe.",
      rule: "Votre distance de déplacement par Action de Mouvement est réduite de 1,5 mètre. Pénalité de -1g1 en Athlétisme."
    },
    {
      id: "dis-petit",
      name: "Petit (Small)",
      type: "Physique",
      cost: 3,
      gain: 3,
      prerequisite: "Incompatible avec Grand",
      desc: "Votre gabarit est nettement plus modeste que celui de vos pairs guerriers.",
      rule: "Chaque palier de blessure contient 1 PV en moins. Malus de -1g0 sur les jets de dégâts avec les armes lourdes."
    },
    {
      id: "dis-faible",
      name: "Faible Constitution (Frail)",
      type: "Physique",
      cost: 4,
      gain: 4,
      prerequisite: "Aucun",
      desc: "Votre métabolisme endure difficilement la morsure du poison et des fièvres.",
      rule: "Votre Constitution est considérée comme réduite de 1 cran pour résister aux toxines, maladies et blessures critiques."
    },
    {
      id: "dis-colerique",
      name: "Colérique (Bad Temper)",
      type: "Mental",
      cost: 3,
      gain: 3,
      prerequisite: "Incompatible avec Calme",
      desc: "Votre sang bout au moindre affront perçu, qu'il soit réel ou imaginaire.",
      rule: "En cas de provocation publique, vous devez réussir un jet de Volonté ND 20 pour ne pas dégainer ou défier en duel immédiatement."
    },
    {
      id: "dis-obsession",
      name: "Obsession Compulsive (Compulsion)",
      type: "Mental",
      cost: 2,
      gain: 2,
      prerequisite: "Spécifier l'obsession",
      desc: "Un vice secret (jeu, saké fort, armes interdites) dévore vos pensées.",
      rule: "Jet de Volonté ND 15 requis pour résister à l'envie d'assouvir votre obsession dès qu'une opportunité se présente."
    },
    {
      id: "dis-cupide",
      name: "Cupide (Greedy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      prerequisite: "Aucun",
      desc: "Vous accordez une importance honteuse à l'or et aux richesses matérielles.",
      rule: "Perte d'Honneur doublée en cas d'infraction vénale. Malus de -1g1 en Volonté pour refuser un pot-de-vin substantiel."
    },
    {
      id: "dis-phobie",
      name: "Phobie Panique (Phobia)",
      type: "Mental",
      cost: 3,
      gain: 3,
      prerequisite: "Définir la source",
      desc: "Une peur viscérale et irrationnelle paralyse vos sens en présence de l'objet redouté.",
      rule: "Face à votre phobie, vous subissez un état de Peur 3 (-3g0 à tous vos jets tant que la source reste visible)."
    },
    {
      id: "dis-dette-honneur",
      name: "Dette d'Honneur (Obligation)",
      type: "Social",
      cost: 3,
      gain: 3,
      prerequisite: "Définir le créancier",
      desc: "Un samouraï ou seigneur rival a sauvé votre vie ou préservé votre nom par le passé.",
      rule: "Votre créancier a une emprise morale absolue sur vous. Refuser son appel entraîne une perte immédiate de 2 Rangs d'Honneur."
    },
    {
      id: "dis-odieux",
      name: "Manières Odieuses (Socially Awkward)",
      type: "Social",
      cost: 3,
      gain: 3,
      prerequisite: "Incompatible avec Benten",
      desc: "Votre franchise brutale ou vos maladresses enfreignent constamment la bienséance.",
      rule: "Malus de -1g1 sur tous les jets de Compétences Sociales (Étiquette, Courtisan, Séduction)."
    },
    {
      id: "dis-ennemi-jure",
      name: "Ennemi Juré (Sworn Enemy)",
      type: "Social",
      cost: 3,
      gain: 3,
      prerequisite: "Définir l'ennemi",
      desc: "Un rival influent a juré votre ruine personnelle ou celle de votre lignée.",
      rule: "Le MJ introduit cet adversaire redoutable prêt à ruiner vos alliances politiques et saboter vos missions officielles."
    },
    {
      id: "dis-sacre-sombre",
      name: "Sombre Secret (Dark Secret)",
      type: "Social",
      cost: 4,
      gain: 4,
      prerequisite: "Définir avec le MJ",
      desc: "Une infamie cachée pèse sur votre nom et votre famille.",
      rule: "Si ce secret éclate au grand jour, vous seriez immédiatement condamné au Seppuku ou à l'exil parmi les Ronins."
    },
    {
      id: "dis-malediction-fortune",
      name: "Malédiction d'une Fortune (Curse of the Kami)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      prerequisite: "Spécifier la Fortune",
      desc: "Un sacrilège commis par vos aïeux a attiré le courroux d'une Fortune céleste sur vous.",
      rule: "Une fois par session, à l'appréciation du MJ, l'un de vos jets réussis est annulé et relancé avec deux dés en moins (-2g0)."
    },
    {
      id: "dis-hante",
      name: "Hanté par un Ancêtre (Haunted)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      prerequisite: "Aucun",
      desc: "Le fantôme tourmenté d'un aïeul vous suit comme une ombre, murmurant des reproches.",
      rule: "Pénalité de -1g0 à tous vos jets d'Initiative et jets de Vigilance lors de situations de stress ou de combat."
    },
    {
      id: "dis-sensible-souillure",
      name: "Sensible à la Souillure (Shadowlands Taint Vulnerability)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      prerequisite: "Incompatible avec Pureté",
      desc: "Votre résistance spirituelle est poreuse face aux miasmes putrides de Jigoku.",
      rule: "+10 au ND de tous les jets pour résister à la Souillure. Interdiction totale de dépenser du Vide sur ces jets."
    }
  ];

  // Création des dictionnaires sous forme d'objets (avec recherche par ID ET par Nom)
  const advObj = {};
  AVANTAGES_LIST.forEach(item => {
    advObj[item.id] = item;
    advObj[item.name] = item;
  });

  const disadvObj = {};
  DESAVANTAGES_LIST.forEach(item => {
    disadvObj[item.id] = item;
    disadvObj[item.name] = item;
  });

  // Injection multi-compatible (pour character-generator.js ET createcharacter.html)
  if (typeof window !== "undefined") {
    // 1. Dictionnaires d'objets indexés par ID (ce que cherche character-generator.js ligne 454)
    window.L5R_DATA = window.L5R_DATA || {};
    window.L5R_DATA.advantages = advObj;
    window.L5R_DATA.disadvantages = disadvObj;
    window.L5R_DATA.avantages = advObj;
    window.L5R_DATA.desavantages = disadvObj;

    // 2. Variables directes souvent appelées dans les générateurs L5R
    window.ADVANTAGES = advObj;
    window.DISADVANTAGES = disadvObj;
    window.AVANTAGES = advObj;
    window.DESAVANTAGES = disadvObj;

    // 3. Tableaux pour les boucles d'affichage dans createcharacter.html
    window.AVANTAGES_DATA = AVANTAGES_LIST;
    window.DESAVANTAGES_DATA = DESAVANTAGES_LIST;
    window.TRAITS_DATA = [...AVANTAGES_LIST, ...DESAVANTAGES_LIST];

    // Permet d'accéder à AVANTAGES_DATA['adv-grand'] même si c'est un Array !
    AVANTAGES_LIST.forEach(a => {
      AVANTAGES_LIST[a.id] = a;
      AVANTAGES_LIST[a.name] = a;
    });
    DESAVANTAGES_LIST.forEach(d => {
      DESAVANTAGES_LIST[d.id] = d;
      DESAVANTAGES_LIST[d.name] = d;
    });
  }
})();
