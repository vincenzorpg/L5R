/**
 * data/avantages-desavantages.js — L5R 4e Édition (Livre de Base p. 146-163)
 * Structure conforme aux boucles .forEach et indexations de character-generator.js
 */

(function () {
  // 1. TABLEAU DES AVANTAGES
  const AVANTAGES_LIST = [
    {
      id: "adv-ambidextre",
      name: "Ambidextre (Ambidextrous)",
      type: "Physique",
      cost: 3,
      impact: "ambidextrous",
      prerequisite: "Agilité 3",
      desc: "Vous maniez vos armes et vos outils avec une égale dextérité de la main gauche comme de la main droite.",
      rule: "Vous ignorez la pénalité habituelle de +5 au ND (ou de -1g0 aux dés) avec votre main non dominante."
    },
    {
      id: "adv-grand",
      name: "Grand (Large)",
      type: "Physique",
      cost: 2,
      impact: "large",
      prerequisite: "Incompatible avec Petit",
      desc: "Votre stature imposante domine le champ de bataille et impressionne le peuple de l'Empire.",
      rule: "Vous gagnez +1 point de vie supplémentaire à chaque palier de blessure. De plus, vous ajoutez +1g0 à tous vos jets de dégâts avec une arme à deux mains ou une arme lourde."
    },
    {
      id: "adv-dur-a-cuire",
      name: "Dur à Cuire (Toughness)",
      type: "Physique",
      cost: 5,
      impact: "toughness",
      prerequisite: "Aucun",
      desc: "Votre chair et votre ossature possèdent une densité tellurique hors du commun.",
      rule: "Le volume de points de vie de chacun de vos paliers de blessure est augmenté d'un montant égal à votre Anneau de Terre de base."
    },
    {
      id: "adv-vif",
      name: "Vif (Quick)",
      type: "Physique",
      cost: 4,
      impact: "quick",
      prerequisite: "Réflexes 3",
      desc: "Vos réflexes fulgurants vous permettent d'anticiper la trajectoire des lames ennemies.",
      rule: "Vous ajoutez votre Anneau d'Air en bonus direct à vos jets d'Initiative au début de chaque tour de combat."
    },
    {
      id: "adv-combattant-rapide",
      name: "Vitesse Éclair (Lightning Reflexes)",
      type: "Physique",
      cost: 3,
      impact: "lightning_reflexes",
      prerequisite: "Aucun",
      desc: "Votre corps bondit instinctivement dès qu'un péril mortel survient.",
      rule: "Lors de chaque jet d'Initiative, vous lancez 1 dé supplémentaire (+1g0). En cas d'égalité, vous agissez en premier."
    },
    {
      id: "adv-sens-aigus",
      name: "Sens Aiguisés (Keen Senses)",
      type: "Physique",
      cost: 3,
      impact: "keen_senses",
      prerequisite: "Aucun",
      desc: "Votre vue perçante, votre ouïe fine ou votre flair d'animal traqueur déjouent les pièges de l'ombre.",
      rule: "Bonus de +1g0 sur tous les jets de Compétences basés sur le Trait Perception (Investigation, Chasse, Vigilance)."
    },
    {
      id: "adv-sang-osano-wo",
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
      type: "Physique",
      cost: 4,
      impact: "osano_wo",
      prerequisite: "Prisé par le Clan du Crabe",
      desc: "La foudre et les tempêtes du Seigneur du Tonnerre coulent dans vos veines.",
      rule: "Bonus de +1g1 sur tous vos jets de Constitution contre les intempéries, la privation ou les poisons. Réduction augmentée de 5 contre l'électricité."
    },
    {
      id: "adv-duelliste-ne",
      name: "Duelliste Émérite (Way of the Duelist)",
      type: "Physique",
      cost: 4,
      impact: "duelist",
      prerequisite: "Iaijutsu 3",
      desc: "Vous percevez le rythme exact de la respiration adverse précédant le dégainé du katana.",
      rule: "En duel formel d'Iaijutsu, vous gagnez +1g0 lors de la phase de Concentration pour tenter d'obtenir des Augmentations Gratuites."
    },
    {
      id: "adv-pensee-claire",
      name: "Pensée Claire (Clear Thinker)",
      type: "Mental",
      cost: 3,
      impact: "clear_thinker",
      prerequisite: "Incompatible avec Naïf",
      desc: "Votre logique d'acier et votre lucidité vous préservent des mensonges et des sortilèges illusoires.",
      rule: "Vous gagnez +2g0 sur tous vos jets opposés pour résister aux illusions, tromperies, Tentations ou manipulations mentales magiques."
    },
    {
      id: "adv-memoire-precise",
      name: "Mémoire Précise (Precise Memory)",
      type: "Mental",
      cost: 2,
      impact: "precise_memory",
      prerequisite: "Aucun",
      desc: "Vous retenez les détails d'un parchemin, les plans d'un château ou une généalogie avec une fidélité absolue.",
      rule: "Bonus de +1g0 sur vos jets d'Intelligence pour vous remémorer un fait précis, réciter un code de lois ou reproduire un document."
    },
    {
      id: "adv-sens-danger",
      name: "Sens du Danger (Danger Sense)",
      type: "Mental",
      cost: 3,
      impact: "danger_sense",
      prerequisite: "Intuition 3",
      desc: "Un frisson tellurique vous avertit des trahisons et des embuscades avant qu'elles ne se referment.",
      rule: "Le Maître du Jeu doit vous avertir dès qu'une embuscade vous cible. Vous ne pouvez jamais subir l'état Surpris."
    },
    {
      id: "adv-prodigieux",
      name: "Prodige (Prodigy)",
      type: "Mental",
      cost: 12,
      impact: "prodigy",
      prerequisite: "À la création du personnage uniquement",
      desc: "Vous assimilez n'importe quel art martial ou érudit deux fois plus vite.",
      rule: "Le coût en XP pour augmenter n'importe quelle Compétence est réduit de 1 point (coût minimum : 1 XP par rang)."
    },
    {
      id: "adv-grand-potentiel",
      name: "Grand Potentiel (Great Potential)",
      type: "Mental",
      cost: 5,
      impact: "great_potential",
      prerequisite: "Spécifier une Compétence",
      desc: "Votre famille a décelé en vous une disposition hors norme pour une discipline précise.",
      rule: "Choisissez une compétence : vous pouvez la monter jusqu'au rang 6 sans condition, et ses Augmentations libres coûtent 1 point de moins."
    },
    {
      id: "adv-voix",
      name: "La Voix de Rokugan (Voice)",
      type: "Social",
      cost: 3,
      impact: "voice",
      prerequisite: "Incompatible avec Bégaiement",
      desc: "Votre voix possède un timbre noble, profond et hypnotique qui captive l'assemblée des cours.",
      rule: "Bonus de +1g0 sur tous vos jets d'Éloquence, Chant, Déclamation, Commandement et Art de la Guerre (Tactique)."
    },
    {
      id: "adv-modele-bushido",
      name: "Modèle de Bushidō (Paragon of Bushido)",
      type: "Social",
      cost: 3,
      impact: "paragon",
      prerequisite: "Honneur 4.0 minimum",
      desc: "Vous personnifiez l'une des sept vertus cardinales de l'Empire de façon remarquable.",
      rule: "Choisissez une vertu : chaque gain d'Honneur directement rattaché à l'accomplissement héroïque de cette vertu est doublé."
    },
    {
      id: "adv-allie-influent",
      name: "Allié d'Influence (Ally)",
      type: "Social",
      cost: 4,
      impact: "ally",
      prerequisite: "Définir l'identité du PNJ",
      desc: "Un Magistrat d'Émeraude, un Daimyō de province ou un Karō influent vous est lié par une dette d'honneur.",
      rule: "Vous disposez d'un allié fixe de Statut égal à (votre Statut + 2) capable de vous fournir escortes ou appuis politiques."
    },
    {
      id: "adv-chanceux",
      name: "Chanceux (Lucky)",
      type: "Spirituel",
      cost: 3,
      impact: "lucky",
      prerequisite: "Cumulable jusqu'à 3 fois (3 pts/niveau)",
      desc: "Les Fortunes veillent sur votre pas et détournent la lame fatale au dernier instant.",
      rule: "Par niveau acheté, vous pouvez relancer une fois par session de jeu un jet de dés non satisfaisant."
    },
    {
      id: "adv-benediction-benten",
      name: "Bénédiction de Benten (Benten's Blessing)",
      type: "Spirituel",
      cost: 3,
      impact: "benten",
      prerequisite: "Incompatible avec Odieux",
      desc: "La Fortune de l'Amour et des Arts a posé sa grâce sur vos traits et votre allure.",
      rule: "Bonus de +1g0 à tous vos jets de Séduction, Courtisan, Étiquette et Persuasion."
    },
    {
      id: "adv-benediction-bishamon",
      name: "Bénédiction de Bishamon (Bishamon's Blessing)",
      type: "Spirituel",
      cost: 3,
      impact: "bishamon",
      prerequisite: "Aucun",
      desc: "La Fortune de la Guerre approuve la vigueur de vos assauts.",
      rule: "En Posture d'Attaque Totale ou lors d'une manœuvre pour Dégâts Accrus, ajoutez +1g0 supplémentaire aux dégâts."
    },
    {
      id: "adv-affinite-elementaire",
      name: "Affinité Élémentaire (Elemental Attunement)",
      type: "Spirituel",
      cost: 3,
      impact: "elemental_attunement",
      prerequisite: "Shugenja ou Moine",
      desc: "Les Kami d'un élément précis communient avec votre âme avec une intensité rare.",
      rule: "Choisissez un Élément : le ND d'incantation de tous ses sorts est réduit de 5 points, ou vous obtenez 1 Augmentation Gratuite."
    }
  ];

  // 2. TABLEAU DES DÉSAVANTAGES (gain est utilisé par character-generator.js)
  const DESAVANTAGES_LIST = [
    {
      id: "dis-borgne",
      name: "Borgne (Blind in One Eye)",
      type: "Physique",
      cost: 2,
      gain: 2,
      impact: "blind_one_eye",
      prerequisite: "Aucun",
      desc: "Une cicatrice de duel ou une flèche perdue vous a privé d'un œil, réduisant votre vision périphérique.",
      rule: "Pénalité de -1g0 à tous vos jets de Tir à l'arc (Kyujutsu), d'Armes de Jet et de Perception visuelle."
    },
    {
      id: "dis-boiteux",
      name: "Boiteux (Lame)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "lame",
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
      impact: "small",
      prerequisite: "Incompatible avec Grand",
      desc: "Votre gabarit est nettement plus modeste que celui de vos pairs guerriers.",
      rule: "Chaque palier de blessure contient 1 point de vie en moins. Malus de -1g0 sur les jets de dégâts avec des armes lourdes."
    },
    {
      id: "dis-faible",
      name: "Faible Constitution (Frail)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "frail",
      prerequisite: "Aucun",
      desc: "Votre métabolisme endure difficilement la morsure du poison et des fièvres.",
      rule: "Votre Trait de Constitution est considéré comme réduit de 1 cran pour résister aux maladies, toxines ou blessures critiques."
    },
    {
      id: "dis-colerique",
      name: "Colérique (Bad Temper)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "bad_temper",
      prerequisite: "Incompatible avec Calme",
      desc: "Votre sang bout au moindre affront perçu, qu'il soit réel ou imaginaire.",
      rule: "En cas de provocation publique, vous devez réussir un jet de Volonté ND 20 pour ne pas dégainer sur-le-champ."
    },
    {
      id: "dis-obsession",
      name: "Obsession Compulsive (Compulsion)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "compulsion",
      prerequisite: "Spécifier la nature de l'obsession",
      desc: "Un vice secret (jeu, saké fort, armes interdites) dévore vos pensées.",
      rule: "Jet de Volonté ND 15 requis pour résister à l'envie d'assouvir votre obsession dès qu'une opportunité se présente."
    },
    {
      id: "dis-cupide",
      name: "Cupide (Greedy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "greedy",
      prerequisite: "Aucun",
      desc: "Vous accordez une importance honteuse à l'or, aux soies et aux richesses matérielles.",
      rule: "Perte d'Honneur doublée en cas d'infraction vénale. Malus de -1g1 sur tous vos jets de Volonté pour refuser un pot-de-vin."
    },
    {
      id: "dis-phobie",
      name: "Phobie Panique (Phobia)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "phobia",
      prerequisite: "Définir la source",
      desc: "Une peur viscérale et irrationnelle paralyse vos sens en présence de l'objet redouté.",
      rule: "Face à l'objet de votre phobie, vous subissez immédiatement un état de Peur 3 (-3g0 à tous vos jets)."
    },
    {
      id: "dis-dette-honneur",
      name: "Dette d'Honneur (Obligation)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "obligation",
      prerequisite: "Définir le créancier",
      desc: "Un autre samouraï ou seigneur rival a sauvé votre vie ou préservé l'honneur de votre maison dans le passé.",
      rule: "Votre créancier a une emprise morale absolue sur vous. Refuser son appel entraîne une perte immédiate de 2 Rangs d'Honneur."
    },
    {
      id: "dis-odieux",
      name: "Manières Odieuses (Socially Awkward)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "socially_awkward",
      prerequisite: "Incompatible avec Benten",
      desc: "Votre franchise brutale ou vos maladresses enfreignent constamment l'Étiquette impériale.",
      rule: "Pénalité de -1g1 à tous vos jets de Compétences Sociales (Étiquette, Courtisan, Séduction)."
    },
    {
      id: "dis-ennemi-jure",
      name: "Ennemi Juré (Sworn Enemy)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "sworn_enemy",
      prerequisite: "Définir l'ennemi",
      desc: "Un duelliste, un magistrat ou un membre d'un clan rival a juré votre ruine personnelle.",
      rule: "Le MJ introduit périodiquement cet adversaire redoutable prêt à ruiner vos alliances et saboter vos missions officielles."
    },
    {
      id: "dis-sacre-sombre",
      name: "Sombre Secret (Dark Secret)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "dark_secret",
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
      impact: "curse_kami",
      prerequisite: "Spécifier la Fortune",
      desc: "Un acte sacrilège commis par vos ancêtres a attiré le courroux d'une Fortune céleste sur vous.",
      rule: "Une fois par session, à l'appréciation du MJ, l'un de vos jets réussis est annulé et relancé avec deux dés en moins (-2g0)."
    },
    {
      id: "dis-hante",
      name: "Hanté par un Ancêtre (Haunted)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "haunted",
      prerequisite: "Aucun",
      desc: "Le fantôme tourmenté d'un aïeul vous suit comme une ombre, murmurant reproches et avertissements discordants.",
      rule: "Pénalité de -1g0 à tous vos jets d'Initiative et jets de Vigilance lors de situations de stress ou de combat."
    },
    {
      id: "dis-sensible-souillure",
      name: "Sensible à la Souillure (Shadowlands Taint Vulnerability)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "taint_vulnerability",
      prerequisite: "Incompatible avec Pureté",
      desc: "Votre résistance spirituelle est poreuse face aux miasmes putrides de Jigoku.",
      rule: "+10 au ND de tous les jets pour résister à la Souillure. Interdiction totale de dépenser du Vide sur ces jets."
    }
  ];

  // 3. INDEXATION PAR ID ET NOM SUR LES TABLEAUX (pour double accès array[0] ou array['adv-grand'])
  AVANTAGES_LIST.forEach((item, index) => {
    AVANTAGES_LIST[item.id] = item;
    AVANTAGES_LIST[item.name] = item;
  });

  DESAVANTAGES_LIST.forEach((item, index) => {
    DESAVANTAGES_LIST[item.id] = item;
    DESAVANTAGES_LIST[item.name] = item;
  });

  // 4. L'OBJET RETOURNÉ PAR getAdvantages()
  const ADV_CONTAINER = {
    avantages: AVANTAGES_LIST,
    desavantages: DESAVANTAGES_LIST,
    advantages: AVANTAGES_LIST,
    disadvantages: DESAVANTAGES_LIST
  };

  if (typeof window !== "undefined") {
    window.AVANTAGES_DATA = ADV_CONTAINER;
    window.DESAVANTAGES_DATA = ADV_CONTAINER;
    window.TRAITS_DATA = [...AVANTAGES_LIST, ...DESAVANTAGES_LIST];

    window.L5R_DATA = window.L5R_DATA || {};
    window.L5R_DATA.avantages = AVANTAGES_LIST;
    window.L5R_DATA.desavantages = DESAVANTAGES_LIST;
    window.L5R_DATA.advantages = AVANTAGES_LIST;
    window.L5R_DATA.disadvantages = DESAVANTAGES_LIST;

    // Définition de la fonction attendue par character-generator.js
    window.getAdvantages = function () {
      return ADV_CONTAINER;
    };
  }
})();
