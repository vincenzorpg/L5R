/**
 * data/avantages-desavantages-data.js — L5R 4e Édition
 * Système complet incluant le Livre de Base (p. 146-163) et suppléments officiels.
 * Conforme aux structures attendues par character-generator.js.
 */

(function () {
  // =========================================================================
  // 1. TABLEAU DES AVANTAGES
  // =========================================================================
  const AVANTAGES_LIST = [
    // --- AVANTAGES PHYSIQUES ---
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
      cost: 4,
      impact: "large",
      prerequisite: "Incompatible avec Petit (3 pts pour le Clan du Crabe)",
      desc: "Votre taille et votre masse musculaire imposante dépassent nettement la moyenne impériale.",
      rule: "Vous ajoutez +1g0 à tous vos jets de dégâts avec les armes de corps à corps imposantes (Large)."
    },
    {
      id: "adv-force-terre",
      name: "Force de la Terre (Strength of the Earth)",
      type: "Physique",
      cost: 3,
      impact: "strength_earth",
      prerequisite: "2 pts pour les Bushi",
      desc: "L'endurance du roc coule dans vos os : la souffrance physique glisse sur vous sans briser votre garde.",
      rule: "Les pénalités de ND infligées par tous vos Paliers de Blessures sont réduites de 3 points."
    },
    {
      id: "adv-mains-pierre",
      name: "Mains de Pierre (Hands of Stone)",
      type: "Physique",
      cost: 6,
      impact: "hands_of_stone",
      prerequisite: "Aucun",
      desc: "Vos poings nus sont aussi durs et meurtriers que des masses d'armes forgées.",
      rule: "Vos attaques à mains nues infligent 0g2 dégâts de base (au lieu de 0g1) en plus de votre Force."
    },
    {
      id: "adv-mains-crabe",
      name: "Mains de Crabe (Crab Hands)",
      type: "Physique",
      cost: 3,
      impact: "crab_hands",
      prerequisite: "2 pts pour le Clan du Crabe",
      desc: "Vous possédez une habileté innée pour improviser des armes de fortune avec n'importe quel objet lourd.",
      rule: "Vous ne subissez aucune pénalité au maniement d'armes improvisées ou non conventionnelles."
    },
    {
      id: "adv-beaute-dangereuse",
      name: "Beauté Dangereuse (Dangerous Beauty)",
      type: "Physique",
      cost: 3,
      impact: "dangerous_beauty",
      prerequisite: "2 pts pour le Clan du Scorpion",
      desc: "Vos traits captivants et votre magnétisme charnel troublent le jugement d'autrui.",
      rule: "Bonus de +1g0 sur tous les jets de Séduction (Tentation) effectués contre des membres du sexe opposé."
    },
    {
      id: "adv-guerisseur-rapide",
      name: "Guérison Accélérée (Quick Healer)",
      type: "Physique",
      cost: 3,
      impact: "quick_healer",
      prerequisite: "Constitution 3",
      desc: "Votre métabolisme referme plaies et fractures à une vitesse prodigieuse lors du repos.",
      rule: "Lors des phases de guérison naturelle par nuit de sommeil, vous récupérez 2 PV supplémentaires par rang de Constitution."
    },
    {
      id: "adv-vif",
      name: "Vif (Quick)",
      type: "Physique",
      cost: 5,
      impact: "quick",
      prerequisite: "Réflexes 3",
      desc: "Vos réflexes fulgurants vous permettent d'anticiper la trajectoire des lames ennemies.",
      rule: "Vous ajoutez votre Anneau d'Air en bonus direct à vos jets d'Initiative au début de chaque combat."
    },
    {
      id: "adv-reflexes-eclair",
      name: "Vitesse Éclair (Lightning Reflexes)",
      type: "Physique",
      cost: 4,
      impact: "lightning_reflexes",
      prerequisite: "Aucun",
      desc: "Votre corps réagit par pur réflexe sans attendre l'ordre conscient de votre esprit.",
      rule: "Lors de chaque jet d'Initiative, vous lancez 1 dé supplémentaire (+1g0). En cas d'égalité d'Initiative, vous agissez toujours en premier."
    },
    {
      id: "adv-sens-aigus",
      name: "Sens Aiguisés (Keen Senses)",
      type: "Physique",
      cost: 3,
      impact: "keen_senses",
      prerequisite: "Aucun",
      desc: "Votre vue perçante, votre ouïe fine ou votre flair d'animal traqueur déjouent les pièges de l'ombre.",
      rule: "Bonus de +1g0 sur tous les jets de Compétences basés sur le Trait Perception."
    },
    {
      id: "adv-silencieux",
      name: "Silencieux (Silent)",
      type: "Physique",
      cost: 3,
      impact: "silent",
      prerequisite: "2 pts pour les Ninja",
      desc: "Vos pas n'émettent aucun froissement d'étoffe ni craquement de plancher.",
      rule: "Bonus de +1g0 à tous vos jets de Discrétion (Stealth)."
    },
    {
      id: "adv-insipide",
      name: "Physique Anodin (Bland)",
      type: "Physique",
      cost: 3,
      impact: "bland",
      prerequisite: "Incompatible avec Beauté Dangereuse",
      desc: "Vos traits ordinaires se fondent instantanément dans la foule et défient la mémoire des témoins.",
      rule: "Le ND de toute tentative d'Investigation ou de Vigilance pour vous identifier ou se souvenir de votre visage augmente de +10."
    },
    {
      id: "adv-sang-osano-wo",
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
      type: "Physique",
      cost: 4,
      impact: "blood_osano_wo",
      prerequisite: "Prisé par le Clan du Crabe",
      desc: "La foudre et les tempêtes du Seigneur du Tonnerre coulent dans vos veines.",
      rule: "Bonus de +1g1 sur tous vos jets de Constitution contre les éléments naturels, le froid extrême ou les privations. Réduction de 5 contre les dégâts d'électricité."
    },
    {
      id: "adv-duelliste-ne",
      name: "Duelliste Émérite (Way of the Duelist)",
      type: "Physique",
      cost: 4,
      impact: "way_duelist",
      prerequisite: "Iaijutsu 3",
      desc: "Vous percevez le souffle exact précédant l'extraction de la lame adverse lors d'un duel formel.",
      rule: "En duel d'Iaijutsu, vous gagnez +1g0 lors de la phase de Concentration pour tenter d'obtenir des Augmentations Gratuites."
    },

    // --- AVANTAGES MENTAUX ---
    {
      id: "adv-equilibre-interieur",
      name: "Équilibre Intérieur (Balance)",
      type: "Mental",
      cost: 2,
      impact: "balance",
      prerequisite: "Aucun",
      desc: "Une sérénité inébranlable habite votre âme lorsque votre droiture est mise à l'épreuve.",
      rule: "Lorsque vous ajoutez votre Rang d'Honneur pour résister à l'Intimidation ou la Tentation, ajoutez +1g0 supplémentaire au jet."
    },
    {
      id: "adv-pensee-claire",
      name: "Pensée Claire (Clear Thinker)",
      type: "Mental",
      cost: 3,
      impact: "clear_thinker",
      prerequisite: "2 pts pour le Clan du Dragon. Incompatible avec Naïf",
      desc: "Votre logique d'acier et votre lucidité vous préservent des mensonges et illusions.",
      rule: "Bonus de +1g0 sur tous vos jets opposés pour résister aux tromperies, illusions et manipulations mentales."
    },
    {
      id: "adv-casse-cou",
      name: "Casse-Cou (Daredevil)",
      type: "Mental",
      cost: 3,
      impact: "daredevil",
      prerequisite: "2 pts pour le Clan de la Mante",
      desc: "Le danger physique exalte votre agilité au lieu de paralyser vos mouvements.",
      rule: "Lorsque vous dépensez 1 point de Vide sur un jet d'Athlétisme, vous gagnez +3g1 au lieu du traditionnel +1g1."
    },
    {
      id: "adv-irreprochable",
      name: "Irréprochable (Irreproachable)",
      type: "Mental",
      cost: 2,
      impact: "irreproachable",
      prerequisite: "1 pt pour les Familles Impériales",
      desc: "Votre vertu morale rend vaines les tentatives viles de séduction ou de compromission.",
      rule: "Bonus de +1g0 lors de tout jet opposé face à un adversaire employant la compétence Tentation."
    },
    {
      id: "adv-memoire-precise",
      name: "Mémoire Précise (Precise Memory)",
      type: "Mental",
      cost: 2,
      impact: "precise_memory",
      prerequisite: "Aucun",
      desc: "Vous retenez visages, lois, poèmes et cartes géographiques avec une fidélité parfaite.",
      rule: "Bonus de +1g0 sur vos jets d'Intelligence pour vous remémorer un détail vu, lu ou entendu."
    },
    {
      id: "adv-prodigieux",
      name: "Prodige (Prodigy)",
      type: "Mental",
      cost: 12,
      impact: "prodigy",
      prerequisite: "À la création du personnage uniquement",
      desc: "Votre génie inné assimile les techniques et compétences avec une fulgurance stupéfiante.",
      rule: "Le coût en points d'expérience (XP) pour monter n'importe quelle Compétence est réduit de 1 point (minimum 1 XP)."
    },
    {
      id: "adv-grand-potentiel",
      name: "Grand Potentiel (Great Potential)",
      type: "Mental",
      cost: 5,
      impact: "great_potential",
      prerequisite: "Choisir une compétence",
      desc: "Vous possédez une vocation sans limite pour l'apprentissage d'un art précis.",
      rule: "La compétence choisie peut dépasser la limite de Rang 5 pour atteindre le Rang 6. Ses Augmentations coûtent 1 point de moins."
    },
    {
      id: "adv-erudit",
      name: "Érudit (Sage)",
      type: "Mental",
      cost: 4,
      impact: "sage",
      prerequisite: "3 pts pour le Phénix et les Shugenja",
      desc: "Votre insatiable soif de lecture a fait de vous une encyclopédie vivante de Rokugan.",
      rule: "Chaque fois que vous devez faire un jet sans compétence (Unskilled) sous une Connaissance (Lore), vous êtes considéré comme ayant le Rang 1."
    },
    {
      id: "adv-sens-danger",
      name: "Sens du Danger (Danger Sense)",
      type: "Mental",
      cost: 3,
      impact: "danger_sense",
      prerequisite: "Perception 3",
      desc: "Une alarme instinctive résonne en vous une fraction de seconde avant l'embuscade.",
      rule: "Le MJ doit vous prévenir d'une attaque surprise imminente. Vous ne pouvez jamais être affecté par l'état Surpris."
    },
    {
      id: "adv-astucieux",
      name: "Astucieux (Crafty)",
      type: "Mental",
      cost: 3,
      impact: "crafty",
      prerequisite: "2 pts pour le Clan du Scorpion",
      desc: "Votre esprit vif repère immédiatement les failles dans la surveillance et les règles établies.",
      rule: "Bonus de +1g0 sur tous vos jets de compétences frauduleuses (Discrétion, Falsification, Pièges, Passe-partout)."
    },
    {
      id: "adv-tactique",
      name: "Tacticien Émérite (Tactician)",
      type: "Mental",
      cost: 4,
      impact: "tactician",
      prerequisite: "3 pts pour le Clan du Lion et les Bushi",
      desc: "Vous lisez le flux et le reflux de l'armée sur le champ de bataille comme les pièces d'un jeu de Go.",
      rule: "Lors d'une Grande Bataille, vous pouvez ajuster votre résultat sur le Tableau de Bataille de +5 ou -5 après le lancer."
    },
    {
      id: "adv-ame-artiste",
      name: "Âme d'Artiste (Soul of Artistry)",
      type: "Mental",
      cost: 4,
      impact: "soul_artistry",
      prerequisite: "3 pts pour la Grue et les Courtisans",
      desc: "L'harmonie esthétique guide vos mains, qu'il s'agisse de peindre, sculpter ou composer.",
      rule: "Choisissez Artisanat ou Métier : vous êtes considéré comme ayant le Rang 1 lorsque vous devez faire un jet sans entraînement."
    },
    {
      id: "adv-sens-orientation",
      name: "Sens du Terrain (Way of the Land)",
      type: "Mental",
      cost: 2,
      impact: "way_of_the_land",
      prerequisite: "Choisir une province ou région",
      desc: "Vous connaissez les sentiers, abris, cours d'eau et ressources d'une province comme votre propre cour.",
      rule: "Vous ne vous perdez jamais dans cette région et obtenez +1g0 sur les jets de Survie, Chasse et Vigilance dans cette zone."
    },
    {
      id: "adv-sans-coeur",
      name: "Cœur de Pierre (Heartless)",
      type: "Mental",
      cost: 4,
      impact: "heartless",
      prerequisite: "Livre de l'Eau / Lion",
      desc: "Votre cœur insensible est sourd aux larmes, suppliques et déclarations enflammées.",
      rule: "Bonus de +1g0 à tous vos jets pour résister aux tentatives de persuasion ou de séduction (Courtisan, Sincérité, Tentation)."
    },

    // --- AVANTAGES SOCIAUX ---
    {
      id: "adv-allie",
      name: "Allié d'Influence (Ally)",
      type: "Social",
      cost: 3,
      impact: "ally",
      prerequisite: "Variable (1 pt de moins pour le Clan de la Grue)",
      desc: "Un magistrat, seigneur provincial ou fonctionnaire loyal vous doit une fière chandelle.",
      rule: "Vous bénéficiez d'un allié PNJ doté d'une influence politique et d'un dévouement proportionnels aux points investis."
    },
    {
      id: "adv-voix",
      name: "La Voix de Rokugan (Voice)",
      type: "Social",
      cost: 3,
      impact: "voice",
      prerequisite: "Incompatible avec Bégaiement",
      desc: "Votre voix possède un timbre noble, pur et hypnotique qui commande le respect des cours.",
      rule: "Bonus de +1g0 à tous vos jets d'Éloquence, Chant, Déclamation, Commandement et Art Oratoire."
    },
    {
      id: "adv-statut-social",
      name: "Rang Social Élevé (Social Position)",
      type: "Social",
      cost: 6,
      impact: "social_position",
      prerequisite: "Aucun",
      desc: "Vous avez été promu à une charge impériale ou clanique d'importance majeure.",
      rule: "Vous débutez la partie avec +1 Rang de Statut plein."
    },
    {
      id: "adv-renommee",
      name: "Renommée (Fame)",
      type: "Social",
      cost: 3,
      impact: "fame",
      prerequisite: "Aucun",
      desc: "Vos exploits passés sont déjà célébrés par les récits des conteurs à travers l'Empire.",
      rule: "Vous commencez avec +1 Rang de Gloire plein."
    },
    {
      id: "adv-heros-peuple",
      name: "Héros du Peuple (Hero of the People)",
      type: "Social",
      cost: 2,
      impact: "hero_of_the_people",
      prerequisite: "Aucun",
      desc: "Les heimin et hinin voient en vous un protecteur juste et vénèrent votre silhouette.",
      rule: "Le ND pour que des citoyens non-samouraïs vous reconnaissent et vous prêtent assistance est abaissé de 10."
    },
    {
      id: "adv-favori-cour",
      name: "Favori de la Cour (Darling of the Court)",
      type: "Social",
      cost: 2,
      impact: "darling_of_the_court",
      prerequisite: "1 pt pour les Courtisans (Choisir un palais précis)",
      desc: "Vous êtes la coqueluche des salons et du daimyō d'une cour officielle spécifique.",
      rule: "Tant que vous résidez à cette cour précise, votre Statut est considéré comme supérieur de 1 Rang."
    },
    {
      id: "adv-commandement",
      name: "Aura de Commandement (Leadership)",
      type: "Social",
      cost: 6,
      impact: "leadership",
      prerequisite: "5 pts pour le Clan du Lion",
      desc: "Votre prestance guerrière galvanise le courage de vos camarades sous le feu ennemi.",
      rule: "Une fois par round, lors de la phase des Réactions, vous pouvez ajouter votre Rang d'École + 1g1 à l'Initiative d'un allié."
    },
    {
      id: "adv-coeur-vengeance",
      name: "Cœur Vengeur (Heart of Vengeance)",
      type: "Social",
      cost: 5,
      impact: "heart_of_vengeance",
      prerequisite: "4 pts pour l'Araignée (Choisir un Clan rival)",
      desc: "Une haine inexpiable consume vos nuits contre une faction ou un clan adverse.",
      rule: "Vous bénéficiez d'un bonus de +1g1 sur tous vos jets opposés contre les membres de la faction ciblée."
    },
    {
      id: "adv-autre-ecole",
      name: "Études dans une Autre École (Different School)",
      type: "Social",
      cost: 5,
      impact: "different_school",
      prerequisite: "Création de personnage",
      desc: "Votre maison a échangé d'immenses faveurs politiques pour vous faire admettre dans le dojo d'un autre clan.",
      rule: "Vous suivez le cursus d'une École appartenant à un autre Clan tout en conservant l'allégeance de votre propre Clan d'origine."
    },
    {
      id: "adv-modele-bushido",
      name: "Modèle de Bushidō (Paragon of Bushido)",
      type: "Social",
      cost: 7,
      impact: "paragon_bushido",
      prerequisite: "Honneur 4.0 minimum (Choisir une des 7 Vertus)",
      desc: "Vous êtes l'incarnation vivante d'une vertu cardinale du code des guerriers.",
      rule: "Chaque gain d'Honneur lié directement à l'accomplissement de cette vertu est doublé. Vous bénéficiez d'une Augmentation Gratuite liée aux jets incarnant cette vertu."
    },
    {
      id: "adv-parangon-sombre",
      name: "Parangon Sombre (Dark Paragon)",
      type: "Mental",
      cost: 5,
      impact: "dark_paragon",
      prerequisite: "4 pts pour l'Araignée (Choisir un précepte de Shourido)",
      desc: "Vous maîtrisez l'une des voies corrompues du code de l'Ombre opposé au Bushidō.",
      rule: "Une fois par session, en sacrifiant 5 points d'Honneur (ou 1 point de Vide), ajoutez un bonus direct de +5 à un type de jet spécifique."
    },
    {
      id: "adv-sensation",
      name: "Bête de Scène (Sensation)",
      type: "Social",
      cost: 3,
      impact: "sensation",
      prerequisite: "Aucun",
      desc: "Vous captivez instantanément une foule dès que vous montez sur scène ou déclamez un vers.",
      rule: "Vous êtes considéré comme possédant le Rang 1 dans n'importe quelle Compétence de Spectacle (Perform) non maîtrisée."
    },

    // --- AVANTAGES SPIRITUELS ---
    {
      id: "adv-chanceux",
      name: "Chance Insolente (Luck)",
      type: "Spirituel",
      cost: 3,
      impact: "luck",
      prerequisite: "3, 6 ou 9 pts (1 relance par rang acheté)",
      desc: "Les Fortunes veillent sur votre pas et détournent la lame fatale au dernier instant.",
      rule: "Une fois par session de jeu et par tranche de 3 points investis, vous pouvez relancer immédiatement n'importe quel jet et conserver le meilleur des deux totaux."
    },
    {
      id: "adv-resistance-magie",
      name: "Résistance à la Magie (Magic Resistance)",
      type: "Spirituel",
      cost: 2,
      impact: "magic_resistance",
      prerequisite: "2, 4 ou 6 pts (cumulable jusqu'à 3 rangs)",
      desc: "Les esprits élémentaires hésitent à vous toucher ou glissent sur votre enveloppe sans vous affecter.",
      rule: "Le ND de lancement de tout sort élémentaire vous prenant pour cible augmente de +3 par niveau acheté (sans effet contre la Mahō)."
    },
    {
      id: "adv-illumine",
      name: "Illuminé (Enlightened)",
      type: "Spirituel",
      cost: 6,
      impact: "enlightened",
      prerequisite: "5 pts pour le Dragon et les Moines",
      desc: "Votre quête spirituelle vers l'harmonie universelle a ouvert les portes du Vide.",
      rule: "Le coût en points d'expérience (XP) pour augmenter votre Anneau de Vide est réduit de 2 points à chaque montée."
    },
    {
      id: "adv-ishiken-do",
      name: "Ishiken-dō (Void Magic)",
      type: "Spirituel",
      cost: 8,
      impact: "ishiken_do",
      prerequisite: "Shugenja uniquement (6 pts pour le Clan du Phénix)",
      desc: "Vous possédez le don rarissime de communier directement avec le tissu du Vide cosmique.",
      rule: "Vous pouvez apprendre, mémoriser et lancer les rituels et sorts de l'Élément du Vide."
    },
    {
      id: "adv-benediction-elementaire",
      name: "Bénédiction Élémentaire (Elemental Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "elemental_blessing",
      prerequisite: "3 pts pour le Phénix (Choisir un Élément non-Vide)",
      desc: "Les kami d'un élément précis éprouvent une affection inexplicable pour votre âme.",
      rule: "Le coût en XP pour augmenter les deux Traits rattachés à cet Élément est réduit de 1 point à chaque rang."
    },
    {
      id: "adv-ami-elements",
      name: "Ami des Éléments (Friend of the Elements)",
      type: "Spirituel",
      cost: 4,
      impact: "friend_of_the_elements",
      prerequisite: "3 pts pour les Shugenja (Choisir un Anneau)",
      desc: "Les esprits de la nature tourbillonnent joyeusement autour de votre pas et prêtent main-forte à vos actes.",
      rule: "Vous gagnez 1 Augmentation Gratuite sur tous les jets utilisant les Traits de l'Anneau choisi."
    },
    {
      id: "adv-destin-grandiose",
      name: "Destin Grandiose (Great Destiny)",
      type: "Spirituel",
      cost: 5,
      impact: "great_destiny",
      prerequisite: "Accord du MJ",
      desc: "Les cieux vous réservent un rôle capital dans l'histoire de Rokugan : la mort ne peut vous cueillir prématurément.",
      rule: "Une fois par session, si vous deviez subir un coup mortel vous envoyant au trépas, vous survivez miraculeusement avec 1 PV au palier Mortel."
    },
    {
      id: "adv-don-interieur",
      name: "Don Intérieur (Inner Gift)",
      type: "Spirituel",
      cost: 7,
      impact: "inner_gift",
      prerequisite: "Choisir un don surnaturel (empathie animale, prémonition, vision astrale...)",
      desc: "Votre âme abrite une manifestation magique innée indépendante des voies de la prêtrise des kami.",
      rule: "Vous disposez d'un pouvoir surnaturel mineur permanent validé avec le meneur de jeu."
    },
    {
      id: "adv-choisi-oracles",
      name: "Élu des Oracles (Chosen by the Oracles)",
      type: "Spirituel",
      cost: 6,
      impact: "chosen_by_oracles",
      prerequisite: "Choisir un Anneau Élémentaire",
      desc: "L'un des Oracles Élémentaires majeurs a posé son regard bienveillant sur votre destinée.",
      rule: "Bonus de +1g1 sur tous les jets d'Anneau effectués sous l'Élément choisi."
    },
    {
      id: "adv-benediction-benten",
      name: "Bénédiction de Benten (Benten's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "bentens_blessing",
      prerequisite: "3 pts pour la Grue. Incompatible avec Odieux",
      desc: "La Fortune de l'Amour et des Arts a déposé un charme irrésistible sur vos lèvres.",
      rule: "Bonus de +0g1 sur tous vos jets de compétences sociales visant à persuader un interlocuteur."
    },
    {
      id: "adv-benediction-bishamon",
      name: "Bénédiction de Bishamon (Bishamon's Blessing)",
      type: "Spirituel",
      cost: 5,
      impact: "bishamons_blessing",
      prerequisite: "4 pts pour le Crabe et le Lion",
      desc: "La Fortune de la Guerre approuve la force colossale de vos assauts.",
      rule: "Lorsque vous annoncez et réussissez 3 Augmentations pour Dégâts Accrus, vous gagnez 1 Augmentation gratuite supplémentaire (+1g0). Bonus de +1g0 sur les jets de Force brute."
    },
    {
      id: "adv-benediction-fukurokujin",
      name: "Bénédiction de Fukurokujin (Fukurokujin's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "fukurokujins_blessing",
      prerequisite: "3 pts pour le Dragon et le Phénix (Choisir une Connaissance)",
      desc: "La Fortune de la Sagesse illumine votre étude des mystères de l'Empire.",
      rule: "Bonus de +1g1 sur tous les jets utilisant la Connaissance (Lore) sélectionnée."
    },
    {
      id: "adv-benediction-hotei",
      name: "Bénédiction d'Hotei (Hotei's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "hoteis_blessing",
      prerequisite: "Aucun",
      desc: "La Fortune du Contentement préserve votre paix d'esprit contre les assauts mystiques.",
      rule: "Quiconque tente de vous faire perdre des points de Vide par un pouvoir adverse doit d'abord remporter un jet opposé de Vide contre vous."
    },
    {
      id: "adv-benediction-jurojin",
      name: "Bénédiction de Jurojin (Jurojin's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "jurojins_blessing",
      prerequisite: "3 pts pour le Clan du Scorpion",
      desc: "La Fortune de la Longévité éloigne les fièvres et les sucs vénéneux de votre métabolisme.",
      rule: "Bonus de +2g0 à tous vos jets pour résister aux poisons et maladies."
    },
    {
      id: "adv-benediction-inari",
      name: "Bénédiction d'Inari (Inari's Blessing)",
      type: "Spirituel",
      cost: 3,
      impact: "inaris_blessing",
      prerequisite: "Aucun",
      desc: "La Fortune du Riz et des Récoltes vous soutient même aux heures les plus noires de la famine.",
      rule: "Même en situation de jeûne forcé ou de privation de nourriture, vous récupérez normalement vos points de Vide lors du repos."
    },
    {
      id: "adv-toucher-royaumes",
      name: "Touché par les Royaumes Spirituels (Touch of the Spirit Realms)",
      type: "Spirituel",
      cost: 5,
      impact: "touch_spirit_realms",
      prerequisite: "4 pts pour les Shugenja (Choisir un Royaume)",
      desc: "Une étincelle primordiale d'un autre plan d'existence est tissée dans la trame de votre âme.",
      rule: "Confère un bonus thématique permanent (ex. Chikushudō accorde +1g1 en Dressage d'animaux ; Tengoku immunise contre la terreur surnaturelle)."
    },

    // --- AVANTAGES MATÉRIELS ---
    {
      id: "adv-heritage-ancestral",
      name: "Héritage Ancestral (Inheritance)",
      type: "Matériel",
      cost: 5,
      impact: "inheritance",
      prerequisite: "Définir l'objet de famille",
      desc: "Lors de votre gempukku, votre famille vous a confié une relique précieuse d'un ancêtre héroïque.",
      rule: "Vous commencez avec un nemuranai ou équipement d'exception qui confère +1g0 ou une Augmentation Gratuite lors de son utilisation rituelle."
    },
    {
      id: "adv-fortune-financiere",
      name: "Richesse Personnelle (Wealthy)",
      type: "Matériel",
      cost: 3,
      impact: "wealthy",
      prerequisite: "3, 5 ou 8 pts",
      desc: "Votre maison contrôle des ateliers prospères, des rizières fertiles ou des comptoirs marchands.",
      rule: "Vous commencez avec une bourse supplémentaire de 20 koku (3 pts), 50 koku (5 pts) ou 100 koku (8 pts) au-delà de l'équipement d'école."
    },
    {
      id: "adv-equipement-gaijin",
      name: "Équipement Gaijin (Gaijin Gear)",
      type: "Matériel",
      cost: 5,
      impact: "gaijin_gear",
      prerequisite: "4 pts pour la Mante et la Licorne",
      desc: "Vous possédez une merveille technique ou une arme exotique rapportée d'au-delà des frontières de l'Empire.",
      rule: "Vous démarrez avec un objet hors normes (longue-vue, montre à gousset, boussole, cimeterre yabanjin ou pistolet à rouet selon la campagne)."
    }
  ];

  // =========================================================================
  // 2. TABLEAU DES DÉSAVANTAGES
  // =========================================================================
  const DESAVANTAGES_LIST = [
    // --- DÉSAVANTAGES PHYSIQUES ---
    {
      id: "dis-borgne",
      name: "Borgne (Blind in One Eye)",
      type: "Physique",
      cost: 2,
      gain: 2,
      impact: "blind_one_eye",
      prerequisite: "Aucun",
      desc: "Une estafilade de katana ou une flèche perdue vous a privé d'un œil, réduisant votre vision du relief.",
      rule: "Pénalité de -1g0 à tous vos jets de Tir à l'arc (Kyujutsu), d'Armes de Jet et de Perception visuelle."
    },
    {
      id: "dis-aveugle",
      name: "Cécité Totale (Blind)",
      type: "Physique",
      cost: 9,
      gain: 9,
      impact: "blind",
      prerequisite: "Aucun",
      desc: "Vous êtes plongé dans une obscurité totale et perpétuelle.",
      rule: "Le ND de toutes vos actions physiques nécessitant la vue augmente de +15 à +30. Vous devez compenser par l'ouïe ou le toucher."
    },
    {
      id: "dis-boiteux",
      name: "Boiteux (Lame)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "lame",
      prerequisite: "Aucun",
      desc: "Un coup d'épieu mal consolidé ou une malformation vous fait traîner lourdement la jambe.",
      rule: "Votre Anneau d'Eau est considéré comme étant de 1 pour vos Actions de Mouvement. Le ND de tout jet d'Agilité impliquant les jambes augmente de +10."
    },
    {
      id: "dis-petit",
      name: "Petit (Small)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "small",
      prerequisite: "Incompatible avec Grand",
      desc: "Votre gabarit est nettement plus modeste que la moyenne des combattants rokuganis.",
      rule: "Votre Anneau d'Eau est réduit de 1 pour calculer la distance de vos mouvements. Pénalité de -1g0 sur tous vos dégâts de mêlée."
    },
    {
      id: "dis-sante-fragile",
      name: "Santé Fragile (Bad Health)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "bad_health",
      prerequisite: "Aucun",
      desc: "Votre constitution physique est chancelante et sujette aux rechutes infectieuses.",
      rule: "Le ND de tous vos jets pour résister aux maladies, toxines ou aux rigueurs du climat augmente de +10."
    },
    {
      id: "dis-seuil-douleur-bas",
      name: "Sensible à la Douleur (Low Pain Threshold)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "low_pain_threshold",
      prerequisite: "Incompatible avec Force de la Terre",
      desc: "La douleur des entailles vous fait perdre votre concentration plus vite que vos camarades.",
      rule: "Les pénalités de ND infligées par chacun de vos Paliers de Blessures sont augmentées de +5."
    },
    {
      id: "dis-membre-manquant",
      name: "Membre Manquant (Missing Limb)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "missing_limb",
      prerequisite: "Spécifier le bras ou la jambe",
      desc: "Un duel terrible ou un assaut d'outre-muraille vous a privé d'un bras ou d'une jambe.",
      rule: "Pénalité de +10 à tous les ND des actions nécessitant l'usage du membre absent (manier une arme à deux mains, courir à pleine vitesse)."
    },
    {
      id: "dis-blessure-permanente",
      name: "Blessure Permanente (Permanent Wound)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "permanent_wound",
      prerequisite: "Vaut 5 pts pour les Bushi",
      desc: "Une vieille blessure gangrenée ou maudite ne s'est jamais totalement refermée.",
      rule: "Votre tout premier Palier de Blessures (Indemne / +0) est considéré comme toujours plein : vous commencez les combats directement au palier suivant."
    },
    {
      id: "dis-maladroit",
      name: "Maladroit (Clumsy)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "clumsy",
      prerequisite: "Aucun",
      desc: "Vos mains tremblent ou vos appuis manquent de fluidité sous le coup du stress.",
      rule: "Tous vos jets d'Agilité ou basés sur l'Agilité subissent une pénalité de -1g0."
    },
    {
      id: "dis-mauvaise-vue",
      name: "Mauvaise Vue (Bad Eyesight)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "bad_eyesight",
      prerequisite: "Aucun",
      desc: "Votre vision floue peine à distinguer les silhouettes lointaines ou les textes trop fins.",
      rule: "Pénalité de -1g1 sur tous vos jets de Tir à l'arc (Kyujutsu) et vos jets de Perception visuelle au-delà de 6 mètres."
    },
    {
      id: "dis-faiblesse-trait",
      name: "Faiblesse Constitutionnelle (Weakness)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "weakness",
      prerequisite: "Choisir un Trait physique ou mental",
      desc: "Vous souffrez d'une carence congénitale profonde dans l'une de vos facultés d'action.",
      rule: "Le Trait sélectionné est traité comme s'il était réduit de 1 Rang pour tous les jets et calculs mécaniques."
    },

    // --- DÉSAVANTAGES MENTAUX ---
    {
      id: "dis-impulsif",
      name: "Téméraire / Impulsif (Brash)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "brash",
      prerequisite: "Vaut 4 pts pour le Clan du Lion",
      desc: "Votre sang bout au moindre affront perçu : vous préférez tirer l'acier que reculer d'un pas.",
      rule: "Face à une insulte ou une provocation, vous devez réussir un jet de Volonté (en ajoutant votre Rang d'Honneur) ND 25, sous peine d'attaquer sur-le-champ."
    },
    {
      id: "dis-incapable-mentir",
      name: "Incapable de Mentir (Can't Lie)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "cant_lie",
      prerequisite: "Aucun",
      desc: "Votre attachement viscéral à la franchise vous empêche de tromper délibérément votre prochain.",
      rule: "Vous ne pouvez pas proférer de mensonge intentionnel. Si quelqu'un ment en votre présence, vous devez réussir un jet de Volonté ND 20 pour ne pas le corriger publiquement."
    },
    {
      id: "dis-cupide",
      name: "Cupide (Greedy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "greedy",
      prerequisite: "Vaut 4 pts pour le Clan de la Mante",
      desc: "Vous accordez une importance honteuse à l'or et aux marchandises, au mépris de la bienséance du bushi.",
      rule: "Tout adversaire cherchant à vous corrompre par Tentation (Pot-de-vin) bénéficie d'un bonus de +1k1 à son jet."
    },
    {
      id: "dis-naif",
      name: "Crédulité Naïve (Gullible)",
      type: "Mental",
      cost: 4,
      gain: 4,
      impact: "gullible",
      prerequisite: "Incompatible avec Pensée Claire",
      desc: "Vous accordez trop facilement votre confiance et prenez la parole d'autrui pour argent comptant.",
      rule: "Tout adversaire tentant de vous duper avec la compétence Sincérité (Tromperie) reçoit un bonus de +1k1 à son jet opposé."
    },
    {
      id: "dis-obsession",
      name: "Obsession Compulsive (Compulsion)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "compulsion",
      prerequisite: "Définir le vice (saké, jeu, armes rares...)",
      desc: "Un besoin irrépressible d'assouvir une passion dévorante perturbe régulièrement vos devoirs.",
      rule: "Dès qu'une opportunité se présente, vous devez réussir un jet de Volonté ND 15 (ou 20 pour 4 pts) sous peine de céder à votre vice."
    },
    {
      id: "dis-esprit-faible",
      name: "Volonté Fluctuante (Frail Mind)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "frail_mind",
      prerequisite: "Aucun",
      desc: "Vous avez peine à conserver votre lucidité face aux épreuves de force psychologiques.",
      rule: "Lors de tout jet opposé reposant sur le Trait Volonté, votre adversaire gagne un bonus de +2g0."
    },
    {
      id: "dis-idealiste",
      name: "Idéaliste Aveugle (Idealistic)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "idealistic",
      prerequisite: "Vaut 3 pts pour le Clan du Lion",
      desc: "Vous placez la barre morale du Bushidō si haut que la réalité politique brise vos illusions.",
      rule: "Chaque fois que vous perdez de l'Honneur, la pénalité subie augmente de 1 point supplémentaire."
    },
    {
      id: "dis-obtus",
      name: "Esprit Obtus (Obtuse)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "obtuse",
      prerequisite: "Vaut 4 pts pour le Crabe et les Bushi",
      desc: "La poésie, la peinture et la subtilité des salons vous semblent une perte de temps inutile.",
      rule: "Le coût en points d'expérience (XP) pour monter n'importe quelle Compétence Noble (High Skill) autre que Vigilance ou Médecine est doublé."
    },
    {
      id: "dis-arrogant",
      name: "Excès de Confiance (Overconfident)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "overconfident",
      prerequisite: "Vaut 4 pts pour le Lion et la Mante",
      desc: "Votre haute estime de votre valeur martiale vous empêche d'admettre la supériorité ennemie.",
      rule: "Face à des ennemis nettement supérieurs en nombre ou en puissance, vous devez réussir un jet de Perception ND 20 pour accepter de battre en retraite."
    },
    {
      id: "dis-phobie",
      name: "Phobie Panique (Phobia)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "phobia",
      prerequisite: "1, 2 ou 3 pts (Définir la phobie)",
      desc: "Une frayeur panique et irrationnelle vous paralyse à la vue de l'élément redouté.",
      rule: "Face à l'objet de votre phobie, tous les ND de vos actions augmentent de +5 par rang possédé dans ce désavantage."
    },
    {
      id: "dis-amour-veritable",
      name: "Amour Véritable (True Love)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "true_love",
      prerequisite: "Définir l'être aimé",
      desc: "Votre cœur s'est lié pour toujours à un être que la raison et le devoir vous interdisent d'épouser.",
      rule: "Lorsque vous êtes contraint de choisir entre votre devoir de samouraï et la sauvegarde de votre amour, vous devez dépenser un point de Vide pour pouvoir obéir à vos ordres."
    },
    {
      id: "dis-obsede-but",
      name: "Obsédé par un Objectif (Driven)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "driven",
      prerequisite: "Définir l'objectif avec le MJ",
      desc: "Une quête personnelle ou un serment secret prime sur le devoir, la santé et l'honneur.",
      rule: "Le refus de poursuivre cet objectif lorsque l'occasion s'en présente vous inflige un malus temporaire de -1g1 sur tous vos jets jusqu'à ce que vous repreniez la traque."
    },
    {
      id: "dis-esprit-contrariant",
      name: "Esprit Contrariant (Contrary)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "contrary",
      prerequisite: "Aucun",
      desc: "Vous ressentez le besoin impulsif de contredire les opinions des autres, même quand ils ont raison.",
      rule: "Vous devez dépenser 1 point de Vide ou réussir un jet de Volonté ND 20 pour acquiescer publiquement à une proposition qui n'est pas la vôtre."
    },
    {
      id: "dis-coeur-tendre",
      name: "Cœur Tendre (Soft-Hearted)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "soft_hearted",
      prerequisite: "Aucun",
      desc: "La cruauté inhérente au devoir des guerriers et l'exécution des peines vous répugnent profondément.",
      rule: "Vous subissez une pénalité de -1g1 sur toutes vos actions visant à achever un adversaire désarmé, sans défense ou suppliant."
    },

    // --- DÉSAVANTAGES SOCIAUX ---
    {
      id: "dis-antisocial",
      name: "Mœurs Antisociales (Antisocial)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "antisocial",
      prerequisite: "2 ou 4 pts (vaut 1 pt de plus pour le Crabe)",
      desc: "La compagnie de vos pairs vous irrite : votre comportement taciturne ou méprisant transparaît immédiatement.",
      rule: "Pénalité de -1g0 (version à 2 pts) ou de -1g1 (version à 4 pts) sur tous vos jets de Compétences Sociales."
    },
    {
      id: "dis-dette-honneur",
      name: "Dette d'Honneur (Obligation)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "obligation",
      prerequisite: "De 1 à 5 pts (Définir le seigneur bienfaiteur)",
      desc: "Un autre samouraï ou une famille influente a sauvé votre lignée et détient une créance morale totale sur vous.",
      rule: "Refuser un ordre émanant de votre bienfaiteur entraîne une perte d'Honneur immédiate égale à deux fois la valeur du trait."
    },
    {
      id: "dis-ennemi-jure",
      name: "Ennemi Juré (Sworn Enemy)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "sworn_enemy",
      prerequisite: "De 2 à 5 pts (Définir l'ennemi)",
      desc: "Un noble d'un clan rival ou un duelliste déshonoré s'est juré d'orchestrer votre chute politique et physique.",
      rule: "Le meneur introduit périodiquement cet ennemi acharné qui use de son influence et de ses lames pour saboter vos succès."
    },
    {
      id: "dis-secret-sombre",
      name: "Sombre Secret (Dark Secret)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "dark_secret",
      prerequisite: "Définir l'infamie cachée",
      desc: "Un acte impardonnable de votre passé (crime, hérésie, sang corrompu) pèse sur votre existence.",
      rule: "Si ce secret est révélé publiquement, vous serez banni de votre clan, déclaré ronin ou contraint d'accomplir le seppuku."
    },
    {
      id: "dis-nom-gaijin",
      name: "Nom Gaijin (Gaijin Name)",
      type: "Social",
      cost: 1,
      gain: 1,
      impact: "gaijin_name",
      prerequisite: "Vaut 2 pts pour la Licorne",
      desc: "Votre nom de famille trahit une origine bâtarde issue des terres barbares hors de l'Empire.",
      rule: "Vos dés ne peuvent exploser (relancer les 10) qu'une seule fois au maximum sur vos jets de Compétences Sociales face aux traditionalistes."
    },
    {
      id: "dis-libidineux",
      name: "Mœurs Libidineuses (Lechery)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "lechery",
      prerequisite: "Aucun",
      desc: "Vous cédez avec trop d'empressement aux plaisirs de la chair et aux charmes des maisons de thé.",
      rule: "Tout jet de Tentation (Séduction) opéré à votre encontre bénéficie d'un bonus de +1k1."
    },
    {
      id: "dis-otage-politique",
      name: "Otage Politique (Hostage)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "hostage",
      prerequisite: "Accord narratif",
      desc: "Vous résidez à la cour d'un autre clan afin de garantir un traité de non-agression entre vos provinces.",
      rule: "Vous ne pouvez quitter le château sans escorte armée, et votre vie sera ôtée si votre propre clan brise la trêve."
    },
    {
      id: "dis-colporteur-rumeurs",
      name: "Colporteur de Rumeurs (Rumormonger)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "rumormonger",
      prerequisite: "Vaut 5 pts pour les Courtisans",
      desc: "Vous ne pouvez vous empêcher d'ébruiter les indiscrétions et médisances de cour.",
      rule: "Pour réprimer l'envie de propager un ragot croustillant, vous devez réussir un jet de Volonté ND (5 × Rang de Gloire de la personne concernée)."
    },
    {
      id: "dis-statut-social-dechu",
      name: "Statut Social Déchu (Social Disadvantage)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "social_disadvantage",
      prerequisite: "Aucun",
      desc: "Vous avez chu de l'Ordre Céleste suite à un scandale familial ou une naissance illégitime.",
      rule: "Vous commencez la campagne avec un Rang de Statut de 0.0."
    },
    {
      id: "dis-infame",
      name: "Infâme (Infamous)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "infamous",
      prerequisite: "Aucun",
      desc: "Votre nom est tristement associé à une défaite cuisante, une trahison suspectée ou un scandale retentissant.",
      rule: "Vous commencez la partie avec 1 Rang d'Infamie (Infamy) complet au lieu de la Gloire."
    },
    {
      id: "dis-retraite-forcee",
      name: "Retraite Forcée au Monastère (Forced Retirement)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "forced_retirement",
      prerequisite: "Vaut 5 pts pour les Moines",
      desc: "Un scandale politique a obligé vos supérieurs à raser vos cheveux et à vous envoyer méditer dans un monastère.",
      rule: "Vous perdez votre statut de membre de clan et vous ne pouvez plus progresser dans votre École d'origine."
    },

    // --- DÉSAVANTAGES SPIRITUELS ---
    {
      id: "dis-souillure-outremonde",
      name: "Touché par la Souillure (Shadowlands Taint)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "shadowlands_taint",
      prerequisite: "Incompatible avec Âme Pure",
      desc: "L'ombre de Jigoku a déposé son venin spirituel dans votre flux de sang.",
      rule: "Vous débutez la partie avec 0,5 Rang de Souillure de l'Outremonde (non détectable sans magie à ce niveau)."
    },
    {
      id: "dis-sensible-souillure",
      name: "Vulnérabilité à la Souillure (Taint Vulnerability)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "taint_vulnerability",
      prerequisite: "Livre des Terres d'Ombre",
      desc: "Votre chair et votre esprit manquent de défenses naturelles face aux miasmes de Jigoku.",
      rule: "+10 au ND de tous les jets effectués pour résister à la Souillure. Interdiction totale de dépenser du Vide sur ces jets."
    },
    {
      id: "dis-malchanceux",
      name: "Malchance Maudite (Unlucky)",
      type: "Spirituel",
      cost: 2,
      gain: 2,
      impact: "unlucky",
      prerequisite: "2 pts par rang acheté",
      desc: "Les Fortunes détournent leur bénédiction au moment précis où votre sort bascule.",
      rule: "Par niveau acheté dans ce désavantage, le MJ peut vous obliger une fois par session à relancer un jet réussi et à conserver le second score."
    },
    {
      id: "dis-destin-sombre",
      name: "Destin Funeste (Dark Fate)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "dark_fate",
      prerequisite: "Accord du MJ",
      desc: "Votre destinée conduira un désastre majeur sur l'Empire avant que votre souffle ne s'éteigne.",
      rule: "Le destin vous garde en vie pour votre sombre dessein : une fois par session, un coup mortel vous réduit miraculeusement à 1 PV au lieu de vous tuer."
    },
    {
      id: "dis-malediction-fortune",
      name: "Malédiction des Sept Fortunes (Seven Fortunes' Curse)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "seven_fortunes_curse",
      prerequisite: "De 3 à 6 pts (Choisir la Fortune vengeresse)",
      desc: "Une offense sacrilège commise par vous ou vos aïeux a éveillé le courroux d'une Fortune majeure.",
      rule: "Confère un malus direct (ex. Jurojin : -2g0 pour résister aux poisons ; Hotei (6 pts) : tout effet requérant 1 point de Vide en coûte 2)."
    },
    {
      id: "dis-courroux-kami",
      name: "Courroux des Kami (Wrath of the Kami)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "wrath_of_the_kami",
      prerequisite: "Choisir un Élément (Vaut 4 pts pour les Shugenja)",
      desc: "Les esprits d'un élément précis refusent votre amitié et se réjouissent de votre châtiment.",
      rule: "Tout sort hostile de l'élément choisi lancé contre vous bénéficie d'une Augmentation Gratuite sur son jet d'incantation."
    },
    {
      id: "dis-hante-ancetre",
      name: "Hanté par un Ancêtre (Haunted)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "haunted",
      prerequisite: "Aucun",
      desc: "Le spectre d'un aïeul vous poursuit nuit et jour en vous accablant de récriminations incessantes.",
      rule: "Pénalité de -1g0 à tous vos jets d'Initiative et jets de Vigilance lors de situations de stress ou de combat."
    },
    {
      id: "dis-maudit-par-royaume",
      name: "Maudit par un Royaume Spirituel (Cursed by the Realm)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "cursed_by_realm",
      prerequisite: "Vaut 5 pts pour les Shugenja (Choisir un Royaume)",
      desc: "L'essence de l'un des mondes spirituels a marqué votre âme comme son ennemi juré.",
      rule: "Confère une malédiction selon le plan (ex. Gaki-dō : les morts affamés vous ciblent en priorité absolue ; Yume-dō : vous devez dormir 10 heures au lieu de 8 pour régénérer le Vide)."
    },
    {
      id: "dis-desequilibre-elementaire",
      name: "Déséquilibre Élémentaire (Elemental Imbalance)",
      type: "Spirituel",
      cost: 2,
      gain: 2,
      impact: "elemental_imbalance",
      prerequisite: "Shugenja uniquement (2 pts par rang)",
      desc: "Les esprits d'un élément parlent si fort dans votre esprit que vos incantations dérapent facilement.",
      rule: "Lorsque vous lancez un sort de cet élément, vous devez réussir un jet de Volonté ND (15 + 5 × rang) ou subir un effet chaotique imprévu."
    },
    {
      id: "dis-momoku",
      name: "Âme Aveugle au Vide (Momoku)",
      type: "Spirituel",
      cost: 8,
      gain: 8,
      impact: "momoku",
      prerequisite: "Incompatible avec Shugenja ou Moines",
      desc: "Votre âme est imperméable à l'harmonie du Vide cosmique : vous êtes coupé de l'étincelle divine.",
      rule: "Vous ne disposez d'aucun point de Vide et vous ne pouvez jamais en acquérir ni en dépenser pour améliorer vos actions."
    }
  ];

  // =========================================================================
  // 3. INDEXATION ET LIAISONS
  // =========================================================================
  AVANTAGES_LIST.forEach((item) => {
    AVANTAGES_LIST[item.id] = item;
    AVANTAGES_LIST[item.name] = item;
  });

  DESAVANTAGES_LIST.forEach((item) => {
    DESAVANTAGES_LIST[item.id] = item;
    DESAVANTAGES_LIST[item.name] = item;
  });

  // =========================================================================
  // 4. EXPORT GLOBAL POUR LE GÉNÉRATEUR
  // =========================================================================
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

    window.getAdvantages = function () {
      return ADV_CONTAINER;
    };
  }
})();
