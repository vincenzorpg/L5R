/**
 * AVANTAGES_DESAVANTAGES_DATA — L5R 4e Édition (Livre de Base p. 146-163)
 * Structure : id, name, category ("avantage"|"desavantage"), type, cost, prerequisite, desc, rule
 */

const AVANTAGES_DATA = [
  // =========================================================================
  // AVANTAGES PHYSIQUES
  // =========================================================================
  {
    id: "adv-ambidextre",
    name: "Ambidextre (Ambidextrous)",
    category: "avantage",
    type: "Physique",
    cost: 3,
    prerequisite: "Agilité 3",
    desc: "Vous maniez vos armes et vos outils avec une égale dextérité de la main gauche comme de la main droite.",
    rule: "Vous ignorez la pénalité habituelle de +5 au ND (ou le malus de -1g0 aux dés) lorsque vous effectuez une attaque ou une action complexe avec votre main non dominante. Requis pour manier deux armes sans malus."
  },
  {
    id: "adv-grand",
    name: "Grand (Large)",
    category: "avantage",
    type: "Physique",
    cost: 2,
    prerequisite: "Incompatible avec Petit",
    desc: "Votre stature imposante domine le champ de bataille et impressionne le peuple de l'Empire.",
    rule: "Vous gagnez +1 point de vie supplémentaire sur chacun de vos paliers de blessure. De plus, vous ajoutez +1g0 à tous vos jets de dégâts au corps à corps lorsque vous maniez une arme à deux mains ou une arme lourde."
  },
  {
    id: "adv-dur-a-cuire",
    name: "Dur à Cuire (Toughness)",
    category: "avantage",
    type: "Physique",
    cost: 5,
    prerequisite: "Aucun",
    desc: "Votre chair et votre ossature possèdent une densité tellurique hors du commun.",
    rule: "Le volume de points de vie de chacun de vos paliers de blessure est augmenté d'un montant égal à votre Anneau de Terre de base."
  },
  {
    id: "adv-vif",
    name: "Vif (Quick)",
    category: "avantage",
    type: "Physique",
    cost: 4,
    prerequisite: "Réflexes 3",
    desc: "Vos réflexes fulgurants vous permettent d'anticiper la trajectoire des lames ennemies.",
    rule: "Vous ajoutez votre Anneau d'Air en bonus direct au résultat de tous vos jets d'Initiative au début de chaque tour de combat."
  },
  {
    id: "adv-combattant-rapide",
    name: "Vitesse Éclair (Lightning Reflexes)",
    category: "avantage",
    type: "Physique",
    cost: 3,
    prerequisite: "Aucun",
    desc: "Votre corps bondit instinctivement dès qu'un péril mortel survient.",
    rule: "Lors de chaque jet d'Initiative, vous lancez 1 dé supplémentaire (+1g0). En cas d'égalité d'Initiative, vous agissez systématiquement avant votre adversaire."
  },
  {
    id: "adv-sens-aigus",
    name: "Sens Aiguisés (Keen Senses)",
    category: "avantage",
    type: "Physique",
    cost: 3,
    prerequisite: "Aucun",
    desc: "Votre vue perçante, votre ouïe fine ou votre flair d'animal traqueur déjouent les pièges de l'ombre.",
    rule: "Vous recevez un bonus de +1g0 sur tous vos jets de Compétences basés sur le Trait Perception (Investigation, Chasse, Vigilance auditive et visuelle)."
  },
  {
    id: "adv-sang-osano-wo",
    name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
    category: "avantage",
    type: "Physique",
    cost: 4,
    prerequisite: "Prisé par le Clan du Crabe",
    desc: "La foudre et les tempêtes du Seigneur du Tonnerre coulent dans vos veines.",
    rule: "Vous bénéficiez d'un bonus de +1g1 sur tous vos jets de Constitution pour résister aux intempéries, au froid extrême, à la privation ou aux poisons. Toute Réduction de dégâts naturelle contre les attaques électriques ou élémentaires augmente de 5."
  },
  {
    id: "adv-duelliste-ne",
    name: "Duelliste Émérite (Way of the Duelist)",
    category: "avantage",
    type: "Physique",
    cost: 4,
    prerequisite: "Iaijutsu 3",
    desc: "Vous percevez le rythme exact de la respiration adverse précédant le dégainé du katana.",
    rule: "Dans tout duel formel d'Iaijutsu (au premier sang ou à mort), vous gagnez +1g0 lors de la phase de Concentration pour tenter d'accumuler des Augmentations Gratuites."
  },

  // =========================================================================
  // AVANTAGES MENTAUX
  // =========================================================================
  {
    id: "adv-pensee-claire",
    name: "Pensée Claire (Clear Thinker)",
    category: "avantage",
    type: "Mental",
    cost: 3,
    prerequisite: "Incompatible avec Naïf",
    desc: "Votre logique d'acier et votre lucidité vous préservent des mensonges et des sortilèges illusoires.",
    rule: "Vous gagnez +2g0 sur tous vos jets opposés pour résister aux illusions de l'Air, aux tromperies, aux manœuvres de Tentation ou à toute manipulation mentale magique."
  },
  {
    id: "adv-memoire-precise",
    name: "Mémoire Précise (Precise Memory)",
    category: "avantage",
    type: "Mental",
    cost: 2,
    prerequisite: "Aucun",
    desc: "Vous retenez les détails d'un parchemin, les plans d'un château ou une généalogie avec une fidélité absolue.",
    rule: "Vous gagnez +1g0 sur tous vos jets d'Intelligence pour vous remémorer un fait précis, réciter un code de lois ou reproduire fidèlement un document sans support écrit."
  },
  {
    id: "adv-sens-danger",
    name: "Sens du Danger (Danger Sense)",
    category: "avantage",
    type: "Mental",
    cost: 3,
    prerequisite: "Intuition 3",
    desc: "Un frisson tellurique vous avertit des trahisons et des embuscades avant qu'elles ne se referment.",
    rule: "Le Maître du Jeu doit vous avertir dès qu'une embuscade préméditée vous cible. Vous ne pouvez jamais subir l'état Surpris lors du premier round d'un affrontement."
  },
  {
    id: "adv-prodigieux",
    name: "Prodige (Prodigy)",
    category: "avantage",
    type: "Mental",
    cost: 12,
    prerequisite: "À la création du personnage uniquement",
    desc: "Vous faites partie de ces génies rares qui assimilent n'importe quel art martial ou érudit deux fois plus vite.",
    rule: "Le coût en Points d'Expérience pour augmenter n'importe quelle Compétence (Bugei, Noble, Marchande ou Dégradante) est réduit de 1 point (coût minimum : 1 XP par rang)."
  },
  {
    id: "adv-grand-potentiel",
    name: "Grand Potentiel (Great Potential)",
    category: "avantage",
    type: "Mental",
    cost: 5,
    prerequisite: "Spécifier une Compétence",
    desc: "Votre famille a décelé en vous une disposition hors norme pour une discipline précise.",
    rule: "Choisissez une compétence précise. Vous pouvez monter cette compétence jusqu'au rang 6 (outrepassant la limite de 5) sans condition de Rang d'École, et le coût d'Augmentation libre sur cette compétence est réduit de 1 point."
  },

  // =========================================================================
  // AVANTAGES SOCIAUX
  // =========================================================================
  {
    id: "adv-voix",
    name: "La Voix de Rokugan (Voice)",
    category: "avantage",
    type: "Social",
    cost: 3,
    prerequisite: "Incompatible avec Bégaiement",
    desc: "Votre voix possède un timbre noble, profond et hypnotique qui captive l'assemblée des cours.",
    rule: "Vous gagnez +1g0 sur tous vos jets d'Éloquence, Chant, Déclamation, Commandement et Art de la Guerre (Tactique) impliquant des ordres vocaux."
  },
  {
    id: "adv-modele-bushido",
    name: "Modèle de Bushidō (Paragon of Bushido)",
    category: "avantage",
    type: "Social",
    cost: 3,
    prerequisite: "Honneur 4.0 minimum",
    desc: "Vous personnifiez l'une des sept vertus cardinales de l'Empire de façon remarquable.",
    rule: "Choisissez une vertu du Bushidō (Gi, Yu, Jin, Rei, Makoto, Meiyo, Chugo). Chaque gain d'Honneur directement rattaché à l'accomplissement héroïque de cette vertu est doublé."
  },
  {
    id: "adv-allie-influent",
    name: "Allié d'Influence (Ally)",
    category: "avantage",
    type: "Social",
    cost: 4,
    prerequisite: "Définir l'identité du PNJ",
    desc: "Un Magistrat d'Émeraude, un Daimyō de province ou un Karō influent vous est lié par une dette d'honneur.",
    rule: "Vous possédez un allié dont le Statut est égal à (votre Statut + 2). Il peut fournir escortes, immunités juridictionnelles mineures ou prêts d'honneur selon les besoins de votre mission."
  },

  // =========================================================================
  // AVANTAGES SPIRITUELS
  // =========================================================================
  {
    id: "adv-chanceux",
    name: "Chanceux (Lucky)",
    category: "avantage",
    type: "Spirituel",
    cost: 3,
    prerequisite: "Cumulable jusqu'à 3 fois (3 pts/niveau)",
    desc: "Les Fortunes veillent sur votre pas et détournent la lame fatale au dernier instant.",
    rule: "Par niveau acheté, vous pouvez relancer une fois par session de jeu l'intégralité d'un jet de dés non satisfaisant. Le second résultat est conservé."
  },
  {
    id: "adv-benediction-benten",
    name: "Bénédiction de Benten (Benten's Blessing)",
    category: "avantage",
    type: "Spirituel",
    cost: 3,
    prerequisite: "Incompatible avec Odieux",
    desc: "La Fortune de l'Amour et des Arts a posé sa grâce sur vos traits et votre allure.",
    rule: "Vous recevez un bonus de +1g0 à tous vos jets de Séduction, Courtisan, Étiquette et Persuasion face à quiconque ne vous voue pas une inimitié mortelle déclarée."
  },
  {
    id: "adv-benediction-bishamon",
    name: "Bénédiction de Bishamon (Bishamon's Blessing)",
    category: "avantage",
    type: "Spirituel",
    cost: 3,
    prerequisite: "Aucun",
    desc: "La Fortune de la Guerre approuve la vigueur de vos assauts.",
    rule: "Lorsque vous adoptez la Posture d'Attaque Totale ou que vous déclarez une manœuvre pour Dégâts Accrus, ajoutez +1g0 supplémentaire à votre jet de dégâts."
  },
  {
    id: "adv-affinite-elementaire",
    name: "Affinité Élémentaire (Elemental Attunement)",
    category: "avantage",
    type: "Spirituel",
    cost: 3,
    prerequisite: "Shugenja ou Moine",
    desc: "Les Kami d'un élément précis communient avec votre âme avec une intensité rare.",
    rule: "Choisissez un Élément (Air, Terre, Feu ou Eau). Le ND d'incantation de tous les sorts de cet élément est réduit de 5 points, ou vous obtenez 1 Augmentation Gratuite sur chaque invocation réussie."
  }
];

const DESAVANTAGES_DATA = [
  // =========================================================================
  // DÉSAVANTAGES PHYSIQUES
  // =========================================================================
  {
    id: "dis-borgne",
    name: "Borgne (Blind in One Eye)",
    category: "desavantage",
    type: "Physique",
    cost: 2,
    prerequisite: "Aucun",
    desc: "Une cicatrice de duel ou une flèche perdue vous a privé d'un œil, réduisant votre vision périphérique.",
    rule: "Vous subissez une pénalité de -1g0 à tous vos jets de Tir à l'arc (Kyujutsu), d'Armes de Jet, ainsi qu'à tous vos jets de Perception basés sur la vue ou l'estimation des distances."
  },
  {
    id: "dis-boiteux",
    name: "Boiteux (Lame)",
    category: "desavantage",
    type: "Physique",
    cost: 3,
    prerequisite: "Aucun",
    desc: "Un coup d'épieu mal soigné ou une malformation vous fait traîner la jambe.",
    rule: "Votre distance de déplacement par Action de Mouvement Simple ou Gratuite est réduite de 1,5 mètre. Vous subissez également une pénalité de -1g1 sur tous vos jets d'Athlétisme."
  },
  {
    id: "dis-petit",
    name: "Petit (Small)",
    category: "desavantage",
    type: "Physique",
    cost: 3,
    prerequisite: "Incompatible avec Grand",
    desc: "Votre gabarit est nettement plus frêle et modeste que celui de vos pairs guerriers.",
    rule: "Chacun de vos Paliers de Blessures contient 1 point de vie en moins par rapport à votre calcul normal. Vous subissez de plus un malus de -1g0 sur vos jets de dégâts avec des armes lourdes."
  },
  {
    id: "dis-faible",
    name: "Faible Constitution (Frail)",
    category: "desavantage",
    type: "Physique",
    cost: 4,
    prerequisite: "Aucun",
    desc: "Votre métabolisme endure difficilement la morsure du poison et des fièvres.",
    rule: "Chaque fois que vous devez effectuer un jet de Constitution pour résister aux maladies, toxines ou blessures critiques, votre Trait de Constitution est considéré comme réduit de 1 cran."
  },

  // =========================================================================
  // DÉSAVANTAGES MENTAUX
  // =========================================================================
  {
    id: "dis-colerique",
    name: "Colérique (Bad Temper)",
    category: "desavantage",
    type: "Mental",
    cost: 3,
    prerequisite: "Incompatible avec Calme",
    desc: "Votre sang bout au moindre affront perçu, qu'il soit réel ou purement imaginaire.",
    rule: "Lorsqu'on vous insulte, vous provoque ou vous contredit en public, vous devez réussir un jet de Volonté ND 20 pour ne pas dégainer votre sabre, crier ou défier l'offenseur en duel sur-le-champ."
  },
  {
    id: "dis-obsession",
    name: "Obsession Compulsive (Compulsion)",
    category: "desavantage",
    type: "Mental",
    cost: 2,
    prerequisite: "Spécifier la nature de l'obsession",
    desc: "Un vice secret (jeu d'argent, saké fort, collection d'armes interdites, artisanat compulsif) dévore vos pensées.",
    rule: "Pour résister à l'envie d'assouvir votre compulsion lorsqu'une opportunité se présente, vous devez réussir un jet de Volonté ND 15. En cas d'échec, vous y consacrez tout votre temps libre et vos koku."
  },
  {
    id: "dis-cupide",
    name: "Cupide (Greedy)",
    category: "desavantage",
    type: "Mental",
    cost: 3,
    prerequisite: "Aucun",
    desc: "Vous accordez une importance honteuse à l'or, aux soies et aux richesses matérielles, au mépris de la droiture du Bushidō.",
    rule: "Toutes les vertus du Bushidō vous coûtent le double d'Honneur en cas d'infraction vénale. Vous subissez une pénalité de -1g1 sur tous vos jets de Volonté pour refuser un pot-de-vin substantiel."
  },
  {
    id: "dis-phobie",
    name: "Phobie Panique (Phobia)",
    category: "desavantage",
    type: "Mental",
    cost: 3,
    prerequisite: "Définir la source (Serpents, Sang, Eau profonde, Morts)",
    desc: "Une peur viscérale et irrationnelle paralyse vos sens en présence de l'objet redouté.",
    rule: "Lorsque vous êtes confronté directement à l'objet de votre phobie, vous subissez immédiatement un effet équivalent à un état de Peur 3 (malus de -3g0 à tous vos jets tant que la source reste visible)."
  },

  // =========================================================================
  // DÉSAVANTAGES SOCIAUX
  // =========================================================================
  {
    id: "dis-dette-honneur",
    name: "Dette d'Honneur (Obligation)",
    category: "desavantage",
    type: "Social",
    cost: 3,
    prerequisite: "Définir le créancier",
    desc: "Un autre samouraï (ou un seigneur rival) a sauvé votre vie ou préservé l'honneur de votre maison dans le passé.",
    rule: "Votre créancier détient une emprise morale absolue sur vous. S'il requiert votre aide ou votre silence au cours du scénario, vous devez vous exécuter ou subir une perte immédiate de 2 Rangs complets d'Honneur."
  },
  {
    id: "dis-odieux",
    name: "Manières Odieuses (Socially Awkward)",
    category: "desavantage",
    type: "Social",
    cost: 3,
    prerequisite: "Incompatible avec Benten",
    desc: "Votre franchise brutale, votre cynisme ou vos maladresses enfreignent constamment l'Étiquette impériale.",
    rule: "Vous subissez une pénalité de -1g1 à tous vos jets de Compétences Sociales (Étiquette, Courtisan, Séduction). En cas d'échec total sur un jet d'Étiquette, vous commettez un outrage public."
  },
  {
    id: "dis-ennemi-jure",
    name: "Ennemi Juré (Sworn Enemy)",
    category: "desavantage",
    type: "Social",
    cost: 3,
    prerequisite: "Définir l'ennemi avec le MJ",
    desc: "Un duelliste, un magistrat ou un membre d'un clan rival a juré votre ruine personnelle ou celle de votre lignée.",
    rule: "Le MJ introduit périodiquement cet adversaire dont le rang d'école et l'influence politique égalent ou surpassent les vôtres, prêt à ruiner vos alliances politiques et saboter vos missions officielles."
  },
  {
    id: "dis-sacre-sombre",
    name: "Sombre Secret (Dark Secret)",
    category: "desavantage",
    type: "Social",
    cost: 4,
    prerequisite: "Accorder la nature du secret avec le MJ",
    desc: "Une infamie cachée (parent souillé, meurtre déshonorant, descendance illégitime, usage secret d'un poison) pèse sur votre nom.",
    rule: "Si ce secret venait à être révélé aux cours de l'Empire, vous seriez immédiatement condamné au Seppuku rituel, à l'exil parmi les Ronins sans maître ou à la disgrâce absolue de votre famille."
  },

  // =========================================================================
  // DÉSAVANTAGES SPIRITUELS
  // =========================================================================
  {
    id: "dis-malediction-fortune",
    name: "Malédiction d'une Fortune (Curse of the Kami)",
    category: "desavantage",
    type: "Spirituel",
    cost: 4,
    prerequisite: "Spécifier la Fortune offensée",
    desc: "Un acte sacrilège commis par l'un de vos ancêtres a attiré le courroux d'une Fortune céleste sur votre âme.",
    rule: "Une fois par session, à un moment crucial décidé par le Maître du Jeu, les esprits vous tournent le dos : l'un de vos jets réussis est annulé et doit être relancé avec deux dés en moins (-2g0)."
  },
  {
    id: "dis-hante",
    name: "Hanté par un Ancêtre (Haunted)",
    category: "desavantage",
    type: "Spirituel",
    cost: 3,
    prerequisite: "Aucun",
    desc: "Le fantôme tourmenté (Shiryo) d'un aïeul vous suit comme une ombre, murmurant reproches et avertissements discordants.",
    rule: "Dans les situations de stress intense ou de méditation, l'apparition de l'ancêtre perturbe votre concentration. Vous subissez une pénalité de -1g0 à tous vos jets d'Initiative et jets de Vigilance."
  },
  {
    id: "dis-sensible-souillure",
    name: "Sensible à la Souillure (Shadowlands Taint Vulnerability)",
    category: "desavantage",
    type: "Spirituel",
    cost: 4,
    prerequisite: "Incompatible avec Pureté de l'Âme",
    desc: "Votre résistance spirituelle est poreuse face aux miasmes putrides de Jigoku.",
    rule: "Tous les jets de Terre ou de Constitution que vous effectuez pour résister à l'acquisition de points de Souillure de l'Outremonde voient leur ND augmenter de +10. Vous ne pouvez jamais dépenser de Vide pour relancer ces jets."
  }
];

// Fusion globale pour recherche indexée
const TRAITS_DATA = [...AVANTAGES_DATA, ...DESAVANTAGES_DATA];

if (typeof window !== "undefined") {
  window.AVANTAGES_DATA = AVANTAGES_DATA;
  window.DESAVANTAGES_DATA = DESAVANTAGES_DATA;
  window.TRAITS_DATA = TRAITS_DATA;
}
