/**
 * data/avantages-desavantages-data.js — L5R 4e Édition
 * Recueil exhaustif et conforme au Livre de Base (p. 146-163) et suppléments officiels.
 * Compatible avec character-generator.js et l'aperçu dynamique du site.
 */

(function () {
  // =========================================================================
  // 1. TABLEAU COMPLET DES AVANTAGES
  // =========================================================================
  const AVANTAGES_LIST = [
    // -----------------------------------------------------------------------
    // AVANTAGES PHYSIQUES
    // -----------------------------------------------------------------------
    {
      id: "adv-ambidextre",
      name: "Ambidextre (Ambidextrous)",
      type: "Physique",
      cost: 3,
      impact: "ambidextrous",
      prerequisite: "Agilité 3",
      desc: "Vous maniez vos armes et vos outils avec une égale dextérité de la main gauche comme de la main droite.",
      rule: "Vous ignorez la pénalité habituelle de +5 au ND lorsque vous agissez avec votre main non dominante ou combattez à deux armes sans école dédiée."
    },
    {
      id: "adv-beaute-dangereuse",
      name: "Beauté Dangereuse (Dangerous Beauty)",
      type: "Physique",
      cost: 3,
      impact: "dangerous_beauty",
      prerequisite: "2 pts pour le Clan du Scorpion. Incompatible avec Insipide",
      desc: "Vos traits captivants et votre magnétisme charnel troublent le jugement d'autrui.",
      rule: "Vous gagnez un bonus de +1g0 à tous vos jets de Séduction (Tentation) effectués contre des membres du sexe opposé."
    },
    {
      id: "adv-duelliste-ne",
      name: "Duelliste Émérite (Way of the Duelist)",
      type: "Physique",
      cost: 4,
      impact: "way_duelist",
      prerequisite: "Iaijutsu 3",
      desc: "Vous percevez le souffle exact précédant l'extraction de la lame adverse lors d'un duel formel.",
      rule: "Lors de la phase de Concentration d'un duel d'Iaijutsu, vous gagnez un bonus de +1g0 à votre jet opposé d'Iaijutsu (Concentration)."
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
      id: "adv-grand",
      name: "Grand (Large)",
      type: "Physique",
      cost: 4,
      impact: "large",
      prerequisite: "Incompatible avec Petit (3 pts pour le Clan du Crabe)",
      desc: "Votre taille et votre masse musculaire imposante dépassent nettement la moyenne impériale.",
      rule: "Chacun de vos Paliers de Blessures contient 1 point de vie supplémentaire (+8 PV au total). Vous ajoutez également +1g0 à tous vos jets de dégâts avec les armes de corps à corps imposantes (Large) ou maniées à deux mains."
    },
    {
      id: "adv-guerisseur-rapide",
      name: "Guérison Accélérée (Quick Healer)",
      type: "Physique",
      cost: 3,
      impact: "quick_healer",
      prerequisite: "Constitution 3",
      desc: "Votre métabolisme referme plaies et fractures à une vitesse prodigieuse lors du repos.",
      rule: "Lors des phases de guérison naturelle par nuit de sommeil, vous récupérez un montant supplémentaire de PV égal à votre Rang de Constitution + votre Rang d'École."
    },
    {
      id: "adv-insipide",
      name: "Physique Anodin (Bland)",
      type: "Physique",
      cost: 2,
      impact: "bland",
      prerequisite: "Incompatible avec Beauté Dangereuse",
      desc: "Vos traits ordinaires se fondent instantanément dans la foule et défient la mémoire des témoins.",
      rule: "Le ND de toute tentative de Connaissance : Bushido pour évaluer votre Honneur ou Connaissance : Héraldique pour vous identifier (via la Gloire) augmente de +10 à votre discrétion."
    },
    {
      id: "adv-mains-crabe",
      name: "Mains de Crabe (Crab Hands)",
      type: "Physique",
      cost: 3,
      impact: "crab_hands",
      prerequisite: "2 pts pour le Crabe et les Bushi",
      desc: "Vous possédez une habileté innée pour improviser des armes de fortune avec n'importe quel objet lourd.",
      rule: "Chaque fois que vous devez effectuer un jet sans entraînement (Unskilled) avec une Compétence d'Arme, vous êtes considéré comme possédant le Rang 1 dans cette compétence."
    },
    {
      id: "adv-mains-pierre",
      name: "Mains de Pierre (Hands of Stone)",
      type: "Physique",
      cost: 6,
      impact: "hands_of_stone",
      prerequisite: "5 pts pour les Moines",
      desc: "Vos poings nus sont aussi durs et meurtriers que des masses d'armes forgées.",
      rule: "Vous ajoutez +0g1 à tous vos jets de dégâts d'attaques à mains nues (ce qui fait passer un moine Togashi à 0g3 + Force)."
    },
    {
      id: "adv-prodigieux",
      name: "Prodige (Prodigy)",
      type: "Physique",
      cost: 12,
      impact: "prodigy",
      prerequisite: "À la création du personnage uniquement",
      desc: "Votre génie inné assimile les techniques et compétences avec une fulgurance stupéfiante.",
      rule: "Chaque fois que vous effectuez un jet avec une Compétence d'École (School Skill Roll), vous gagnez un bonus de +1g0 au jet."
    },
    {
      id: "adv-reflexes-eclair",
      name: "Vitesse Éclair (Lightning Reflexes)",
      type: "Physique",
      cost: 4,
      impact: "lightning_reflexes",
      prerequisite: "Aucun",
      desc: "Votre corps réagit par pur réflexe sans attendre l'ordre conscient de votre esprit.",
      rule: "Lors de vos jets d'Initiative, vous lancez 1 dé supplémentaire (+1g0). En cas d'égalité d'Initiative, vous agissez toujours avant vos rivaux qui ne possèdent pas cet avantage."
    },
    {
      id: "adv-sang-osano-wo",
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
      type: "Physique",
      cost: 4,
      impact: "blood_osano_wo",
      prerequisite: "Prisé par le Clan du Crabe",
      desc: "La foudre et les tempêtes du Seigneur du Tonnerre coulent dans vos veines.",
      rule: "Bonus de +1g1 sur tous vos jets de Constitution contre les éléments naturels, le froid extrême ou les privations. Vous disposez d'une Réduction de 5 contre les dégâts électriques."
    },
    {
      id: "adv-sens-aigus",
      name: "Sens Aiguisés (Keen Senses)",
      type: "Physique",
      cost: 3,
      impact: "keen_senses",
      prerequisite: "Aucun",
      desc: "Votre vue perçante, votre ouïe fine ou votre flair d'animal traqueur déjouent les pièges de l'ombre.",
      rule: "Bonus de +1g0 sur tous les jets de Compétences basés sur le Trait Perception (Investigation, Vigilance, Chasse)."
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
      id: "adv-vif",
      name: "Vif (Quick)",
      type: "Physique",
      cost: 5,
      impact: "quick",
      prerequisite: "Réflexes 3",
      desc: "Vos réflexes fulgurants vous permettent d'anticiper la trajectoire des lames ennemies.",
      rule: "Vous ajoutez votre Trait Réflexes en bonus direct à vos totaux d'Initiative au début de chaque combat."
    },
    {
      id: "adv-voix",
      name: "La Voix de Rokugan (Voice)",
      type: "Physique",
      cost: 3,
      impact: "voice",
      prerequisite: "Incompatible avec Bégaiement",
      desc: "Votre voix possède un timbre noble, pur et hypnotique qui commande le respect des cours.",
      rule: "Bonus de +1g1 sur tout jet de Compétence de Spectacle (Perform) utilisant la voix (Chant, Art Oratoire, Déclamation, Narration)."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES MENTAUX
    // -----------------------------------------------------------------------
    {
      id: "adv-direction-absolue",
      name: "Direction Absolue (Absolute Direction)",
      type: "Mental",
      cost: 1,
      impact: "absolute_direction",
      prerequisite: "Aucun",
      desc: "Vous possédez une boussole interne surnaturelle : vous savez toujours infailliblement où se trouve le Nord.",
      rule: "Vous connaissez toujours l'orientation cardinale exacte en toute circonstance. Ce pouvoir cesse de fonctionner si vous pénétrez à plus d'une journée de marche dans l'Outremonde."
    },
    {
      id: "adv-ame-artiste",
      name: "Âme d'Artiste (Soul of Artistry)",
      type: "Mental",
      cost: 4,
      impact: "soul_artistry",
      prerequisite: "3 pts pour la Grue et les Courtisans",
      desc: "L'harmonie esthétique guide vos mains, qu'il s'agisse de peindre, sculpter ou composer.",
      rule: "Choisissez soit les Compétences d'Artisanat, soit les Compétences de Métier : chaque fois que vous faites un jet sans entraînement (Unskilled) dans ce groupe, vous êtes considéré comme ayant le Rang 1."
    },
    {
      id: "adv-astucieux",
      name: "Astucieux (Crafty)",
      type: "Mental",
      cost: 3,
      impact: "crafty",
      prerequisite: "2 pts pour le Scorpion, l'Araignée et les Ninja",
      desc: "Votre esprit vif repère immédiatement les failles dans la surveillance et les règles établies.",
      rule: "Chaque fois que vous devez effectuer un jet sans compétence (Unskilled) dans une Compétence Dégradante (Low Skill), vous êtes considéré comme possédant le Rang 1."
    },
    {
      id: "adv-casse-cou",
      name: "Casse-Cou (Daredevil)",
      type: "Mental",
      cost: 3,
      impact: "daredevil",
      prerequisite: "2 pts pour le Clan de la Mante",
      desc: "Le danger physique exalte votre agilité au lieu de paralyser vos mouvements.",
      rule: "Lorsque vous dépensez 1 point de Vide pour améliorer un jet d'Athlétisme, vous gagnez un bonus de +3g1 au lieu du traditionnel +1g1."
    },
    {
      id: "adv-dessein-superieur",
      name: "Dessein Supérieur (Higher Purpose)",
      type: "Mental",
      cost: 3,
      impact: "higher_purpose",
      prerequisite: "Définir l'œuvre d'une vie avec le MJ",
      desc: "Vous avez voué votre existence à une cause grandiose qui exigera des années d'abnégation.",
      rule: "Durant chaque session de jeu au cours de laquelle vous et le MJ convenez que vous avez accompli un progrès mesurable et tangible vers cet objectif, vous gagnez 1 point d'expérience (XP) supplémentaire."
    },
    {
      id: "adv-equilibre-interieur",
      name: "Équilibre Intérieur (Balance)",
      type: "Mental",
      cost: 2,
      impact: "balance",
      prerequisite: "Aucun",
      desc: "Une sérénité inébranlable habite votre âme lorsque votre droiture est mise à l'épreuve.",
      rule: "Lorsque vous ajoutez votre Rang d'Honneur pour résister à l'Intimidation ou à la Tentation, ajoutez +1g0 supplémentaire au total du jet."
    },
    {
      id: "adv-erudit",
      name: "Érudit (Sage)",
      type: "Mental",
      cost: 4,
      impact: "sage",
      prerequisite: "3 pts pour le Phénix et les Shugenja",
      desc: "Votre insatiable soif de lecture a fait de vous une encyclopédie vivante de Rokugan.",
      rule: "Chaque fois que vous devez faire un jet sans compétence (Unskilled) sous n'importe quelle Compétence de Connaissance (Lore), vous êtes considéré comme possédant le Rang 1."
    },
    {
      id: "adv-grand-potentiel",
      name: "Grand Potentiel (Great Potential)",
      type: "Mental",
      cost: 5,
      impact: "great_potential",
      prerequisite: "Choisir une compétence",
      desc: "Vous possédez une vocation sans limite pour l'apprentissage d'un art précis.",
      rule: "Choisissez une Compétence : lorsque vous déclarez des Augmentations sur cette compétence, le plafond d'Augmentations est dicté par votre Rang dans la Compétence plutôt que par votre Anneau de Vide (si votre Vide est supérieur, vous pouvez choisir de l'utiliser)."
    },
    {
      id: "adv-irreprochable",
      name: "Irréprochable (Irreproachable)",
      type: "Mental",
      cost: 2,
      impact: "irreproachable",
      prerequisite: "1 pt pour les Familles Impériales",
      desc: "Votre vertu morale rend vaines les tentatives viles de séduction ou de compromission.",
      rule: "Bonus de +1g0 à tous vos jets opposés face à un adversaire employant contre vous la compétence Tentation."
    },
    {
      id: "adv-mefiant",
      name: "Méfiant (Wary)",
      type: "Mental",
      cost: 3,
      impact: "wary",
      prerequisite: "Aucun",
      desc: "Vous restez en alerte permanente, anticipant toujours le coup de dague dans l'ombre.",
      rule: "Lorsque vous opposez votre Investigation (Observation) / Perception contre la Discrétion (Embuscade) adverse, vous ajoutez un bonus de +1g1 à votre jet."
    },
    {
      id: "adv-memoire-precise",
      name: "Mémoire Précise (Precise Memory)",
      type: "Mental",
      cost: 3,
      impact: "precise_memory",
      prerequisite: "Aucun",
      desc: "Vous retenez visages, lois, poèmes et cartes géographiques avec une fidélité parfaite.",
      rule: "Bonus de +1g1 sur vos jets d'Intelligence pour vous remémorer un détail vu, lu ou entendu, réciter un texte officiel ou reconstituer les traits d'un visage."
    },
    {
      id: "adv-modele-bushido",
      name: "Modèle de Bushidō (Paragon of Bushido)",
      type: "Mental",
      cost: 7,
      impact: "paragon_bushido",
      prerequisite: "Honneur 4.0 minimum (6 pts pour le Lion, choisir une vertu)",
      desc: "Vous êtes l'incarnation vivante d'une vertu cardinale du code des guerriers.",
      rule: "Chaque gain d'Honneur lié à cette vertu rapporte +1 point d'Honneur supplémentaire. Bonus selon la vertu choisie (ex. Compassion : +2g2 en aidant un inférieur avec du Vide ; Honnêteté : +1g1 en Sincérité [Honnêteté] ; Courage : +1g1 contre la Peur/Intimidation ; Devoir : 1 Vide annule tous les malus de blessures sur un jet ; Courtoisie : +2g0 en Étiquette pour éviter un affront)."
    },
    {
      id: "adv-parangon-sombre",
      name: "Parangon Sombre (Dark Paragon)",
      type: "Mental",
      cost: 5,
      impact: "dark_paragon",
      prerequisite: "4 pts pour l'Araignée (Choisir un principe de Shourido)",
      desc: "Vous maîtrisez l'une des voies corrompues du code de l'Ombre opposé au Bushidō.",
      rule: "Une fois par session, en dépensant 1 point de Vide ou 5 points d'Honneur, obtenez un effet majeur selon le principe choisi (relance de jet social, annulation de malus, explosion forcée d'un dé, relance de dégâts)."
    },
    {
      id: "adv-pensee-claire",
      name: "Pensée Claire (Clear Thinker)",
      type: "Mental",
      cost: 3,
      impact: "clear_thinker",
      prerequisite: "2 pts pour le Clan du Dragon. Incompatible avec Naïf",
      desc: "Votre logique d'acier et votre lucidité vous préservent des mensonges et illusions.",
      rule: "Bonus de +1g0 sur tous vos jets opposés pour résister aux tromperies, illusions magiques et manipulations mentales."
    },
    {
      id: "adv-sans-coeur",
      name: "Cœur de Pierre (Heartless)",
      type: "Mental",
      cost: 4,
      impact: "heartless",
      prerequisite: "Prisé par le Lion et les Magistrats",
      desc: "Votre cœur insensible est sourd aux larmes, suppliques et déclarations enflammées.",
      rule: "Bonus de +1g0 à tous vos jets pour résister aux tentatives de persuasion ou de séduction (Courtisan, Sincérité, Tentation)."
    },
    {
      id: "adv-savoir-interdit",
      name: "Savoir Interdit (Forbidden Knowledge)",
      type: "Mental",
      cost: 5,
      impact: "forbidden_knowledge",
      prerequisite: "Définir le domaine avec le MJ (Maho, Gaijin, Kolat, etc.)",
      desc: "Vous détenez des secrets blasphématoires ou tabous qui vous vaudraient une condamnation s'ils étaient révélés.",
      rule: "Vous obtenez le Rang 1 dans la Compétence interdite choisie (ex. Connaissance : Maho, Magie Gaijin, Kolat) et disposez d'éclairages secrets accordés par le MJ au fil de la campagne."
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
      id: "adv-sens-orientation",
      name: "Sens du Terrain (Way of the Land)",
      type: "Mental",
      cost: 2,
      impact: "way_of_the_land",
      prerequisite: "1 pt pour la Licorne (Choisir une province ou cité)",
      desc: "Vous connaissez les sentiers, abris, cours d'eau et ressources d'une province comme votre propre cour.",
      rule: "Vous ne vous perdez jamais dans cette région et connaissez l'emplacement de toutes les ressources et caches qui s'y trouvent."
    },
    {
      id: "adv-vertueux",
      name: "Vertueux (Virtuous)",
      type: "Mental",
      cost: 3,
      impact: "virtuous",
      prerequisite: "Aucun",
      desc: "La vertu et la droiture morale imprègnent vos moindres actes quotidiens.",
      rule: "Vous commencez la partie avec un Rang d'Honneur supérieur de 1 plein (+1.0) par rapport à la valeur de départ de votre École."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES SOCIAUX
    // -----------------------------------------------------------------------
    {
      id: "adv-allie",
      name: "Allié d'Influence (Ally)",
      type: "Social",
      cost: 3,
      impact: "ally",
      prerequisite: "Variable (1 pt de moins pour la Grue)",
      desc: "Un magistrat, seigneur provincial ou fonctionnaire loyal vous doit une fière chandelle.",
      rule: "Vous bénéficiez d'un PNJ dévoué dont l'influence politique (Mineure 1 pt, Modérée 2 pts, Majeure 4 pts) et le dévouement (1 à 4 pts) dépendent des points investis."
    },
    {
      id: "adv-autre-ecole",
      name: "Études dans une Autre École (Different School)",
      type: "Social",
      cost: 5,
      impact: "different_school",
      prerequisite: "À la création du personnage uniquement",
      desc: "Votre maison a échangé de grandes faveurs pour vous faire admettre dans le dojo d'un autre clan.",
      rule: "Vous suivez le cursus d'une École appartenant à un autre Clan tout en conservant l'allégeance et les bonus de famille de votre Clan d'origine."
    },
    {
      id: "adv-chantage-obtenu",
      name: "Chantage (Blackmail)",
      type: "Social",
      cost: 2,
      impact: "blackmail",
      prerequisite: "Coût égal au Rang de Statut de la cible (1 pt de moins pour le Scorpion)",
      desc: "Vous détenez les preuves accablantes d'un secret compromettant pesant sur un individu d'importance.",
      rule: "Vous pouvez exercer une pression directe pour forcer cette cible à vous rendre des services, au risque qu'elle tente d'orchestrer votre assassinat si vos exigences deviennent intolérables."
    },
    {
      id: "adv-coeur-vengeance",
      name: "Cœur Vengeur (Heart of Vengeance)",
      type: "Social",
      cost: 5,
      impact: "heart_of_vengeance",
      prerequisite: "4 pts pour l'Araignée (Choisir un Clan ou faction)",
      desc: "Une haine inexpiable consume vos nuits contre une faction ou un clan adverse.",
      rule: "Vous bénéficiez d'un bonus de +1g1 sur tous vos jets opposés contre les membres de la faction ou du clan ciblé."
    },
    {
      id: "adv-commandement",
      name: "Aura de Commandement (Leadership)",
      type: "Social",
      cost: 6,
      impact: "leadership",
      prerequisite: "5 pts pour le Clan du Lion",
      desc: "Votre prestance guerrière galvanise le courage de vos camarades sous le feu ennemi.",
      rule: "Une fois par round, lors de la phase des Réactions, vous pouvez ajouter votre Rang d'École + 1g1 à l'Initiative d'un allié situé à portée de voix."
    },
    {
      id: "adv-ecoles-multiples",
      name: "Écoles Multiples (Multiple Schools)",
      type: "Social",
      cost: 10,
      impact: "multiple_schools",
      prerequisite: "En jeu uniquement. Rang 1 dans toutes les compétences d'école de la nouvelle. Incompatible Bushi/Shugenja.",
      desc: "Vous avez été autorisé à poursuivre l'enseignement d'une nouvelle École majeure de l'Empire.",
      rule: "Votre progression dans votre école d'origine s'arrête. Lorsque vous gagnez votre prochain Rang de Maîtrise, vous débutez la nouvelle école au Rang 1."
    },
    {
      id: "adv-epoux-imperial",
      name: "Époux / Épouse Impérial(e) (Imperial Spouse)",
      type: "Social",
      cost: 5,
      impact: "imperial_spouse",
      prerequisite: "Statut minimum exigé",
      desc: "Un arrangement politique d'envergure vous a uni par les liens du mariage à un membre d'une Famille Impériale.",
      rule: "Vous gagnez immédiatement +0.5 Rang de Statut, ainsi qu'un bonus de +1g1 sur tous vos jets de Compétences Sociales face aux membres des Familles Impériales."
    },
    {
      id: "adv-favori-cour",
      name: "Favori de la Cour (Darling of the Court)",
      type: "Social",
      cost: 2,
      impact: "darling_of_the_court",
      prerequisite: "1 pt pour les Courtisans (Choisir une cour précise)",
      desc: "Vous êtes la coqueluche des salons et du daimyō d'une cour officielle spécifique.",
      rule: "Tant que vous résidez à cette cour précise et que la session de cour est ouverte, votre Statut est considéré comme supérieur de 1 Rang plein (+1.0)."
    },
    {
      id: "adv-fiancailles-heureuses",
      name: "Fiançailles Heureuses (Blissful Betrothal)",
      type: "Social",
      cost: 3,
      impact: "blissful_betrothal",
      prerequisite: "Accord du MJ",
      desc: "Votre mariage arrangé est une bénédiction rare : vous et votre promise partagez un amour sincère et complice.",
      rule: "Les relations bienveillantes issues de ce mariage vous permettent d'acheter les avantages suivants avec 2 points de réduction chacun (minimum 1 pt) : Noblesse Terrienne, Lien Karmique, Rang Social Élevé et Richesse."
    },
    {
      id: "adv-heros-peuple",
      name: "Héros du Peuple (Hero of the People)",
      type: "Social",
      cost: 2,
      impact: "hero_of_the_people",
      prerequisite: "Aucun",
      desc: "Les heimin et hinin voient en vous un protecteur juste et vénèrent votre silhouette.",
      rule: "Le ND pour que des citoyens non-samouraïs vous reconnaissent et vous prêtent assistance selon votre Rang de Gloire est abaissé de 10."
    },
    {
      id: "adv-honneur-percu",
      name: "Honneur Perçu (Perceived Honor)",
      type: "Social",
      cost: 2,
      impact: "perceived_honor",
      prerequisite: "2 pts par rang acheté",
      desc: "Vous maîtrisez l'art des apparences : nul ne devine vos écarts sous votre maintien exemplaire.",
      rule: "Par niveau acheté dans cet avantage, votre Honneur est considéré comme étant de 1 rang supérieur pour quiconque tente de le sonder via Connaissance : Bushido / Intuition."
    },
    {
      id: "adv-renommee",
      name: "Renommée (Fame)",
      type: "Social",
      cost: 3,
      impact: "fame",
      prerequisite: "Aucun",
      desc: "Vos exploits passés sont déjà célébrés par les récits des conteurs à travers l'Empire.",
      rule: "Vous commencez la partie avec +1.0 Rang de Gloire plein."
    },
    {
      id: "adv-sacro-saint",
      name: "Sacro-Saint (Sacrosanct)",
      type: "Social",
      cost: 4,
      impact: "sacrosanct",
      prerequisite: "Honneur 6.0 minimum (3 pts pour les Impériaux)",
      desc: "Le Fils du Ciel ou l'Ordre Céleste a placé sa protection divine sur votre personne.",
      rule: "Tant que votre Honneur ne descend pas sous 6.0, aucun individu d'Honneur 5.0 ou supérieur ne peut vous attaquer à moins que vous ne portiez le premier coup (ne s'applique pas aux duels formels acceptés)."
    },
    {
      id: "adv-sensation",
      name: "Bête de Scène (Sensation)",
      type: "Social",
      cost: 3,
      impact: "sensation",
      prerequisite: "Aucun",
      desc: "Vous captivez instantanément une foule dès que vous montez sur scène ou déclamez un vers.",
      rule: "Chaque fois que vous devez effectuer un jet sans entraînement (Unskilled) avec une Compétence de Spectacle (Perform), vous êtes considéré comme ayant le Rang 1."
    },
    {
      id: "adv-statut-social",
      name: "Rang Social Élevé (Social Position)",
      type: "Social",
      cost: 6,
      impact: "social_position",
      prerequisite: "Aucun",
      desc: "Vous avez été promu à une charge impériale ou clanique d'importance majeure.",
      rule: "Vous débutez la partie avec +1.0 Rang de Statut plein."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES SPIRITUELS
    // -----------------------------------------------------------------------
    {
      id: "adv-ame-pure",
      name: "Âme Pure (Pure Soul)",
      type: "Spirituel",
      cost: 4,
      impact: "pure_soul",
      prerequisite: "Incompatible avec Touché par la Souillure",
      desc: "Votre pureté spirituelle fait rempart contre la noirceur de Jigoku.",
      rule: "Vous bénéficiez d'un bonus de +1g1 sur tous vos jets de résistance contre l'infection par la Souillure de l'Outremonde."
    },
    {
      id: "adv-ami-confrerie",
      name: "Ami de la Confrérie (Friend of the Brotherhood)",
      type: "Spirituel",
      cost: 5,
      impact: "friend_of_the_brotherhood",
      prerequisite: "Shugenja ou Moine hors Confrérie (4 pts pour le Dragon)",
      desc: "Vos séjours prolongés au sein des monastères de Shinsei vous ont ouvert les portes des mystères du corps et de l'âme.",
      rule: "Vous pouvez acheter et apprendre des Kiho au coût normal des Moines de la Confrérie de Shinsei sans surcoût d'XP."
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
      id: "adv-benediction-elementaire",
      name: "Bénédiction Élémentaire (Elemental Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "elemental_blessing",
      prerequisite: "3 pts pour le Phénix (Choisir un Élément hors Vide)",
      desc: "Les kami d'un élément précis éprouvent une affection inexplicable pour votre âme.",
      rule: "Le coût en XP pour augmenter les deux Traits rattachés à cet Élément est réduit de 1 point à chaque rang."
    },
    {
      id: "adv-benediction-benten",
      name: "Bénédiction de Benten (Benten's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "bentens_blessing",
      prerequisite: "3 pts pour la Grue. Incompatible avec Odieux",
      desc: "La Fortune de l'Amour et des Arts a déposé un charme irrésistible sur vos lèvres.",
      rule: "Bonus de +0g1 sur tous vos jets de compétences sociales visant à persuader un interlocuteur (ne s'applique pas à la coercition)."
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
      rule: "Quiconque tente de vous faire perdre des points de Vide par un pouvoir adverse doit d'abord remporter un jet opposé de Vide contre vous (si le pouvoir demandait déjà un jet opposé, votre total gagne +10)."
    },
    {
      id: "adv-benediction-inari",
      name: "Bénédiction d'Inari (Inari's Blessing)",
      type: "Spirituel",
      cost: 3,
      impact: "inaris_blessing",
      prerequisite: "Aucun",
      desc: "La Fortune du Riz et des Récoltes vous soutient même aux heures les plus noires de la famine.",
      rule: "Même en situation de jeûne forcé ou de privation d'eau et de nourriture, vous récupérez normalement vos points de Vide lors du repos."
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
      id: "adv-chanceux",
      name: "Chance Insolente (Luck)",
      type: "Spirituel",
      cost: 3,
      impact: "luck",
      prerequisite: "3, 6 ou 9 pts (1 relance par tranche de 3 pts)",
      desc: "Les Fortunes veillent sur votre pas et détournent la lame fatale au dernier instant.",
      rule: "Une fois par session de jeu et par tranche de 3 points investis, vous pouvez relancer immédiatement n'importe quel jet et conserver le meilleur des deux totaux."
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
      prerequisite: "Choisir une faculté (Empathie, Prémonition, Vue des Esprits...)",
      desc: "Votre âme abrite une manifestation magique innée indépendante des voies de la prêtrise des kami.",
      rule: "Confère un pouvoir surnaturel mineur permanent (ex. Empathie animale, vision du dernier porteur d'un objet touché ND 15, ou bonus de +1g0 à l'Initiative)."
    },
    {
      id: "adv-illumine",
      name: "Illuminé (Enlightened)",
      type: "Spirituel",
      cost: 6,
      impact: "enlightened",
      prerequisite: "5 pts pour le Dragon et les Moines",
      desc: "Votre quête spirituelle vers l'harmonie universelle a ouvert les portes du Vide.",
      rule: "Le coût en points d'expérience (XP) pour augmenter votre Anneau de Vide est réduit de 2 points à chaque rang."
    },
    {
      id: "adv-ishiken-do",
      name: "Ishiken-dō (Void Magic)",
      type: "Spirituel",
      cost: 8,
      impact: "ishiken_do",
      prerequisite: "Shugenja uniquement (6 pts pour le Clan du Phénix)",
      desc: "Vous possédez le don rarissime de communier directement avec le tissu du Vide cosmique.",
      rule: "Vous pouvez apprendre, mémoriser et lancer les sorts de l'Élément du Vide."
    },
    {
      id: "adv-kami-amical",
      name: "Kami Amical (Friendly Kami)",
      type: "Spirituel",
      cost: 5,
      impact: "friendly_kami",
      prerequisite: "Shugenja uniquement (Choisir un Élément non déficient)",
      desc: "Un kami particulier s'est pris d'affection pour vous et reste perpétuellement à vos côtés.",
      rule: "Bonus de +1g1 sur tous vos jets de Lancement de Sorts pour lancer Sentir, Communier ou Invoquer avec l'Élément choisi."
    },
    {
      id: "adv-lien-karmique",
      name: "Lien Karmique (Kharmic Tie)",
      type: "Spirituel",
      cost: 1,
      impact: "kharmic_tie",
      prerequisite: "1 à 5 pts (Définir l'être lié)",
      desc: "Votre destinée karmique est indissolublement tissée à celle d'une autre âme de ce monde.",
      rule: "Une fois par session et par tranche de 1 pt investi, vous gagnez un bonus de +1g1 sur vos jets d'attaque lorsque vous combattez pour défendre ou secourir la personne liée."
    },
    {
      id: "adv-resistance-magie",
      name: "Résistance à la Magie (Magic Resistance)",
      type: "Spirituel",
      cost: 2,
      impact: "magic_resistance",
      prerequisite: "2, 4 ou 6 pts (cumulable jusqu'à 3 rangs)",
      desc: "Les esprits élémentaires hésitent à vous toucher ou glissent sur votre enveloppe sans vous affecter.",
      rule: "Le ND de lancement de tout sort élémentaire vous prenant pour cible augmente de +3 par niveau acheté (sans effet contre la Mahō ni la magie gaijin)."
    },
    {
      id: "adv-toucher-royaumes",
      name: "Touché par les Royaumes Spirituels (Touch of the Spirit Realms)",
      type: "Spirituel",
      cost: 5,
      impact: "touch_spirit_realms",
      prerequisite: "4 pts pour les Shugenja (Choisir un Royaume)",
      desc: "Une étincelle primordiale d'un autre plan d'existence est tissée dans la trame de votre âme.",
      rule: "Confère un avantage permanent thématique (ex. Chikushudō accorde +1g1 en Dressage d'animaux ; Tengoku immunise contre la terreur surnaturelle)."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES MATÉRIELS
    // -----------------------------------------------------------------------
    {
      id: "adv-arme-sacree",
      name: "Arme Sacrée (Sacred Weapon)",
      type: "Matériel",
      cost: 5,
      impact: "sacred_weapon",
      prerequisite: "Bushi ou école d'arme (selon le Clan)",
      desc: "Vous maniez une relique ancestrale façonnée dans les forges légendaires de votre clan.",
      rule: "Vous débutez avec l'arme ancestrale de votre clan (ex. Lame Kaiu, Épée Kakita, Lame Matsu) dotée de bonus d'attaque, de dégâts ou de seuil d'explosion."
    },
    {
      id: "adv-equipement-gaijin",
      name: "Équipement Gaijin (Gaijin Gear)",
      type: "Matériel",
      cost: 5,
      impact: "gaijin_gear",
      prerequisite: "4 pts pour la Mante et la Licorne",
      desc: "Vous possédez une merveille technique ou une arme exotique rapportée d'au-delà des frontières de l'Empire.",
      rule: "Vous démarrez avec un objet étranger (longue-vue, loupe, montre à ressort, boussole, cimeterre yabanjin ou arme à poudre selon l'époque de jeu)."
    },
    {
      id: "adv-fortune-financiere",
      name: "Richesse Personnelle (Wealthy)",
      type: "Matériel",
      cost: 1,
      impact: "wealthy",
      prerequisite: "1 pt par tranche de 2 koku (1 pt de moins pour Grue/Licorne/Impériaux)",
      desc: "Votre maison contrôle des ateliers prospères, des rizières fertiles ou des comptoirs marchands.",
      rule: "Chaque point investi vous confère 2 koku supplémentaires ajoutés au pécule de départ de votre École."
    },
    {
      id: "adv-heritage-ancestral",
      name: "Héritage Ancestral (Inheritance)",
      type: "Matériel",
      cost: 5,
      impact: "inheritance",
      prerequisite: "Définir l'objet de famille",
      desc: "Lors de votre gempukku, votre famille vous a confié une relique précieuse d'un ancêtre héroïque.",
      rule: "Vous commencez avec un nemuranai ou un équipement d'exception conférant +1g0 ou 1 Augmentation Gratuite lors de son utilisation rituelle."
    },
    {
      id: "adv-noblesse-terrienne",
      name: "Noblesse Terrienne (Gentry)",
      type: "Matériel",
      cost: 4,
      impact: "gentry",
      prerequisite: "4 à 10 pts (Accord du MJ)",
      desc: "L'Empereur et votre Daimyō vous ont confié l'intendance et les revenus d'un fief territorial important.",
      rule: "Vous administrez un domaine féodal (village, garnison, vallée) générant revenus et troupes locales sous vos ordres, avec la charge de payer l'impôt et de le défendre."
    }
  ];

  // =========================================================================
  // 2. TABLEAU COMPLET DES DÉSAVANTAGES
  // =========================================================================
  const DESAVANTAGES_LIST = [
    // -----------------------------------------------------------------------
    // DÉSAVANTAGES PHYSIQUES
    // -----------------------------------------------------------------------
    {
      id: "dis-aspect-troublant",
      name: "Aspect Troublant (Disturbing Countenance)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "disturbing_countenance",
      prerequisite: "4 pts pour l'Araignée",
      desc: "Vos traits déformés, vos cicatrices rituelles ou votre regard inquiétant mettent vos interlocuteurs mal à l'aise.",
      rule: "Le ND de tous vos jets de Compétences Sociales est augmenté de +5."
    },
    {
      id: "dis-aveugle",
      name: "Cécité Totale (Blind)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "blind",
      prerequisite: "Aucun",
      desc: "Vous êtes plongé dans une obscurité totale et perpétuelle.",
      rule: "Vous subissez une pénalité de -3g3 sur toutes les actions nécessitant la vue (combat, déplacement précipité, observation)."
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
      rule: "Votre tout premier Palier de Blessures (Indemne / +0) est considéré comme toujours plein : vous commencez les combats directement au palier Égratigné (+3)."
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
      rule: "Votre Anneau d'Eau est considéré comme étant de 1 pour vos Actions de Mouvement. Tout jet d'Agilité ou jet basé sur l'Agilité impliquant vos jambes subit un malus de +10 au ND."
    },
    {
      id: "dis-borgne",
      name: "Borgne (Blind in One Eye)",
      type: "Physique",
      cost: 2,
      gain: 2,
      impact: "blind_one_eye",
      prerequisite: "Aucun",
      desc: "Une estafilade de katana ou une flèche perdue vous a privé d'un œil, réduisant votre vision du relief.",
      rule: "Pénalité de -1g0 à tous vos jets d'Attaque à distance (Tir à l'arc, Armes de jet) et sur vos jets de Perception visuelle."
    },
    {
      id: "dis-epilepsie",
      name: "Épilepsie (Epilepsy)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "epilepsy",
      prerequisite: "Vaut 5 pts pour la Grue",
      desc: "Un déséquilibre de vos flux vitaux déclenche des crises convulsives lors de stress extrême ou de stimuli vifs.",
      rule: "Sous l'effet d'un stress violent ou de lumières clignotantes (feux d'artifice), réussissez un jet de Volonté ND 15 sous peine de subir une crise tétanisante pendant plusieurs minutes."
    },
    {
      id: "dis-faiblesse-trait",
      name: "Faiblesse (Weakness)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "weakness",
      prerequisite: "Choisir un Trait physique ou mental",
      desc: "Vous souffrez d'une carence congénitale profonde dans l'une de vos facultés.",
      rule: "Le Trait sélectionné est traité comme s'il était réduit de 1 Rang pour tous les jets et calculs mécaniques dérivés."
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
      id: "dis-mauvaise-sante",
      name: "Santé Défaillante (Bad Health)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "bad_health",
      prerequisite: "Aucun",
      desc: "Votre organisme chancelant peine à cicatriser et à repousser les fièvres.",
      rule: "Votre Anneau de Terre est considéré comme inférieur de 1 rang pour le calcul de vos Paliers de Blessures ainsi que pour tous les jets pour résister aux maladies."
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
      rule: "Pénalité de -1g1 sur tous vos jets d'Attaque à distance et sur vos jets de Perception basés sur la vue."
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
      rule: "Pénalité de +10 au ND pour toute action nécessitant le membre manquant (ex. manier une arme à deux mains)."
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
      rule: "Votre Anneau d'Eau est réduit de 1 pour calculer la distance de vos Actions de Mouvement. Pénalité de -1g0 sur tous vos dégâts de mêlée."
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

    // -----------------------------------------------------------------------
    // DÉSAVANTAGES MENTAUX
    // -----------------------------------------------------------------------
    {
      id: "dis-amour-veritable",
      name: "Amour Véritable (True Love)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "true_love",
      prerequisite: "Définir l'être aimé",
      desc: "Votre cœur s'est lié pour toujours à un être que la raison et le devoir vous interdisent d'épouser.",
      rule: "Lorsque vous êtes contraint de choisir entre votre devoir de samouraï et la sauvegarde de votre amour, vous devez dépenser 1 point de Vide pour pouvoir obéir à vos ordres."
    },
    {
      id: "adv-ascete",
      id: "dis-ascete",
      name: "Ascète (Ascetic)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "ascetic",
      prerequisite: "Vaut 3 pts pour le Dragon et les Moines",
      desc: "Vous n'avez aucun goût ni attachement pour les possessions terrestres.",
      rule: "Votre équipement de départ ne comprend que vos armes, armure, vêtements et outils strictement indispensables (aucun koku ni superflu). Tous vos gains de Gloire sont divisés par deux (et réduits au quart pour un Moine)."
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
      rule: "Face à des ennemis nettement supérieurs en nombre ou en puissance, vous devez réussir un jet de Perception ND 20 pour accepter de rompre le combat."
    },
    {
      id: "dis-coeur-tendre",
      name: "Cœur Tendre (Soft-Hearted)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "soft_hearted",
      prerequisite: "Vaut 3 pts pour le Clan du Phénix",
      desc: "La sacralité de la vie humaine vous interdit d'exécuter froidement vos ennemis.",
      rule: "Pour ôter la vie à un être humain, vous devez réussir un jet de Volonté ND 20. Si vous tuez un être humain, le remords vous inflige un malus de +10 à tous vos ND d'actions pendant 24 heures."
    },
    {
      id: "dis-consume-shourido",
      name: "Consumé par le Shourido (Consumed)",
      type: "Mental",
      cost: 4,
      gain: 4,
      impact: "consumed",
      prerequisite: "Vaut +1 pt pour l'Araignée (Contrôle 4, Détermination 6, Perfection 5, Force 5)",
      desc: "L'un des préceptes sombres du Shourido a dévoré votre conscience.",
      rule: "Contrôle (-1g1 en Étiquette/Sincérité) ; Détermination (interdiction absolue de dépenser du Vide pour améliorer les jets de dés) ; Perfection (+1 Augmentation forcée sans effet pour tout jet de compétence/sort) ; Force (+1 Augmentation forcée sans effet pour les manœuvres de combat)."
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
      rule: "Tout adversaire cherchant à vous corrompre par Tentation (Pot-de-vin) bénéficie d'un bonus de +1g1 à son jet."
    },
    {
      id: "dis-doute",
      name: "Doute (Doubt)",
      type: "Mental",
      cost: 4,
      gain: 4,
      impact: "doubt",
      prerequisite: "Choisir une Compétence d'École",
      desc: "Un traumatisme ou une hésitation intime paralyse votre maîtrise d'une discipline clé.",
      rule: "Chaque fois que vous utilisez la compétence d'école choisie, vous devez obligatoirement déclarer 1 Augmentation sans aucun effet bénéfique."
    },
    {
      id: "dis-echec-bushido",
      name: "Échec du Bushidō (Failure of Bushido)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "failure_bushido",
      prerequisite: "3 à 6 pts selon la vertu (Compassion 3, Courage 4, Courtoisie 4, Devoir 6, Honnêteté 3, Honneur 3, Sincérité 4)",
      desc: "Votre âme faillit gravement à l'un des sept préceptes sacrés des guerriers.",
      rule: "Compassion (3 pts : dépenser 1 Vide pour aider un inférieur) ; Courage (4 pts : ND +5 face à un ennemi supérieur) ; Courtoisie (4 pts : 1 Augmentation forcée pour s'excuser) ; Devoir (6 pts : impossible de dépenser du Vide pour absorber des Blessures) ; Honnêteté (3 pts : aucun Vide sur Sincérité [Honnêteté]) ; Honneur (3 pts : pas de bonus d'Honneur contre Tentation/Intimidation) ; Sincérité (4 pts : 1 Augmentation forcée pour convaincre)."
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
      rule: "Vous devez dépenser 1 point de Vide ou réussir un jet de Volonté ND 20 pour acquiescer publiquement à une proposition qui n'émane pas de vous."
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
      id: "dis-fascination",
      name: "Fascination (Fascination)",
      type: "Mental",
      cost: 1,
      gain: 1,
      impact: "fascination",
      prerequisite: "Choisir un centre d'intérêt précis",
      desc: "Une curiosité obsessionnelle pour un sujet précis captive totalement vos sens.",
      rule: "Vous êtes prêt à prendre des risques déraisonnables ou des décisions déshonorantes pour assouvir votre curiosité concernant ce sujet."
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
      rule: "Chaque fois que vous subissez une perte d'Honneur, la pénalité réelle est augmentée de 1 point supplémentaire."
    },
    {
      id: "dis-impulsif",
      name: "Téméraire / Impulsif (Brash)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "brash",
      prerequisite: "Vaut 4 pts pour le Clan du Lion",
      desc: "Votre sang bout au moindre affront perçu : vous préférez tirer l'acier que reculer d'un pas.",
      rule: "Face à une menace ou insulte, vous devez réussir un jet de Volonté (en ajoutant votre Rang d'Honneur) ND 25, sous peine d'attaquer sur-le-champ."
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
      rule: "Vous ne pouvez proférer aucun mensonge intentionnel. Si quelqu'un ment en votre présence, réussissez un jet de Volonté ND 20 ou vous le rectifierez publiquement."
    },
    {
      id: "dis-incroyant",
      name: "Incroyant / Sceptique (Disbeliever)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "disbeliever",
      prerequisite: "Incompatible avec Shugenja et Moines",
      desc: "Vous doutez secrètement de la bénédiction divine des Fortunes et des préceptes des moines.",
      rule: "Si votre scepticisme est découvert, la perte d'Honneur et de Gloire est dévastatrice et aucune bénédiction spirituelle ne peut vous être accordée."
    },
    {
      id: "dis-insensible",
      name: "Insensible (Insensitive)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "insensitive",
      prerequisite: "Vaut 3 pts pour le Clan du Scorpion",
      desc: "Vous ne prêtez aucune attention aux tourments d'autrui et ne vivez que pour vos intérêts personnels.",
      rule: "À l'exception des personnes qui contribuent directement à votre bien-être (comme votre seigneur), vous devez obligatoirement dépenser 1 point de Vide pour accepter de courir un risque au bénéfice d'autrui sans profit personnel immédiat."
    },
    {
      id: "dis-jalousie",
      name: "Jalousie Maladive (Jealousy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "jealousy",
      prerequisite: "Définir la personne ou le rival jalousé",
      desc: "Le succès ou les privilèges d'autrui vous remplissent d'une aigreur toxique.",
      rule: "Vous êtes obsédé par le fait de surpasser et d'humilier la personne ciblée par tous les moyens possibles. Une fois votre rival vaincu, votre rancœur se portera sur une nouvelle cible."
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
      rule: "Tout adversaire tentant de vous duper avec la compétence Sincérité (Tromperie) reçoit un bonus de +1g1 à son jet opposé."
    },
    {
      id: "dis-obsession",
      name: "Obsession Compulsive (Compulsion)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "compulsion",
      prerequisite: "2 à 4 pts (Définir le vice : saké, jeu, visites de temples...)",
      desc: "Un besoin irrépressible d'assouvir une passion dévorante perturbe régulièrement vos devoirs.",
      rule: "Dès qu'une opportunité se présente, vous devez réussir un jet de Volonté ND 15 (+5 par point additionnel investi, jusqu'à ND 25 pour 4 pts) sous peine d'y céder immédiatement."
    },
    {
      id: "dis-obsede-but",
      name: "Obsédé par un Objectif (Driven)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "driven",
      prerequisite: "Définir l'objectif avec le MJ",
      desc: "Une quête personnelle prime sur votre santé, votre devoir et votre statut de samouraï.",
      rule: "Le refus d'œuvrer pour cet objectif lorsqu'une opportunité se présente vous inflige un malus temporaire de -1g1 sur tous vos jets jusqu'à ce que vous repreniez la traque."
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
      rule: "Le coût en points d'expérience (XP) pour monter n'importe quelle Compétence Noble autre qu'Investigation ou Médecine est doublé."
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
      rule: "Face à l'objet de votre phobie, tous les ND de vos actions augmentent de +5 par point investi dans ce désavantage."
    },

    // -----------------------------------------------------------------------
    // DÉSAVANTAGES SOCIAUX
    // -----------------------------------------------------------------------
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
      id: "dis-banni-temple",
      name: "Dénoncé par les Moines (Cast Out)",
      type: "Social",
      cost: 1,
      gain: 1,
      impact: "cast_out",
      prerequisite: "1 pt (un temple) ou 3 pts (une secte majeure)",
      desc: "Vous ou votre lignée avez été publiquement dénoncés par un ordre monastique.",
      rule: "Les moines du temple ou de la secte concernée traitent votre Rang de Gloire comme s'il s'agissait d'un Rang d'Infamie."
    },
    {
      id: "dis-chantage-subi",
      name: "Victime de Chantage (Blackmailed)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "blackmailed",
      prerequisite: "Valeur égale à votre propre Rang de Statut",
      desc: "Un tiers détient des preuves irréfutables d'un acte déshonorant que vous avez commis.",
      rule: "Votre maître-chanteur vous contacte périodiquement pour exiger compromissions politiques ou faveurs matérielles sous peine d'ébruiter votre secret."
    },
    {
      id: "dis-charge-famille",
      name: "Personne à Charge (Dependant)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "dependant",
      prerequisite: "2 à 6 pts selon la vulnérabilité (enfant, aïeul infirme)",
      desc: "Un être vulnérable dépend entièrement de vos soins et de votre protection quotidienne.",
      rule: "Vous devez veiller en permanence sur cette personne. Tout préjudice ou menace pesant sur elle met en péril votre statut et vos devoirs."
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
      rule: "Pour réprimer l'envie d'ébruiter un ragot croustillant, vous devez réussir un jet de Volonté ND (5 × Rang de Gloire de la personne visée)."
    },
    {
      id: "dis-deshonore",
      name: "Déshonoré / Cherche-Mort (Dishonored)",
      type: "Social",
      cost: 5,
      gain: 5,
      impact: "dishonored",
      prerequisite: "Aucun",
      desc: "Votre nom a été rayé des registres familiaux ; seule une mort glorieuse lavera votre affront.",
      rule: "Vous débutez avec un Statut bloqué à 1.0 et vous ne pouvez gagner aucun point de Statut tant que ce désavantage persiste."
    },
    {
      id: "dis-dette-honneur",
      name: "Dette d'Honneur (Obligation)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "obligation",
      prerequisite: "3 ou 6 pts (Définir le créancier)",
      desc: "Un autre samouraï ou une famille influente détient une créance morale absolue sur vous.",
      rule: "Refuser de vous acquitter de cette obligation lorsqu'elle est réclamée entraîne la perte immédiate de votre honneur et de votre réputation."
    },
    {
      id: "dis-ennemi-jure",
      name: "Ennemi Juré (Sworn Enemy)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "sworn_enemy",
      prerequisite: "3 pts (+1 pt par Insight Rank supérieur à vous ; +2 pts pour Némésis karmique)",
      desc: "Un noble d'un clan rival ou un duelliste déshonoré s'est juré d'orchestrer votre chute.",
      rule: "Le meneur introduit régulièrement cet adversaire implacable. Si l'option Némésis (+2 pts) est choisie, vous ne pouvez pas dépenser de points de Vide en opposition directe contre lui."
    },
    {
      id: "dis-fiancailles-ameres",
      name: "Fiançailles Amères (Bitter Betrothal)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "bitter_betrothal",
      prerequisite: "Vaut 3 pts pour les Impériaux",
      desc: "Vous êtes uni à un conjoint qui vous méprise autant que vous le détestez.",
      rule: "Votre conjoint fait obstruction discrète à vos projets politiques, rendant toute démarche domestique ou diplomatique laborieuse."
    },
    {
      id: "dis-infame",
      name: "Infâme (Infamous)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "infamous",
      prerequisite: "Aucun",
      desc: "Votre réputation est tachée par une couardise suspectée, une cruauté gratuite ou un échec cuisant.",
      rule: "Votre Rang de Gloire de départ est remplacé par un Rang d'Infamie (Infamy) de même valeur."
    },
    {
      id: "dis-libidineux",
      name: "Mœurs Libidineuses (Lechery)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "lechery",
      prerequisite: "Aucun",
      desc: "Vous cédez avec trop d'empressement aux plaisirs charnels et aux maisons de thé.",
      rule: "Tout jet de Tentation (Séduction) opéré contre vous bénéficie d'un bonus de +1g1."
    },
    {
      id: "dis-mouton-noir",
      name: "Mouton Noir (Black Sheep)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "black_sheep",
      prerequisite: "Aucun",
      desc: "Votre famille est profondément dégoûtée par votre conduite et vous tourne le dos sans vous bannir.",
      rule: "Vous ne pouvez bénéficier du soutien familial qu'en achetant des Alliés spécifiques, et vos sensei refusent de vous former sans de considérables efforts."
    },
    {
      id: "dis-nom-gaijin",
      name: "Nom Gaijin (Gaijin Name)",
      type: "Social",
      cost: 1,
      gain: 1,
      impact: "gaijin_name",
      prerequisite: "Vaut 2 pts pour la Licorne",
      desc: "Votre nom de famille trahit une ascendance étrangère aux frontières de l'Empire.",
      rule: "Vos dés ne peuvent exploser (relancer les 10) qu'une seule fois au maximum lors de vos jets de Compétences Sociales."
    },
    {
      id: "dis-otage-politique",
      name: "Otage Politique (Hostage)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "hostage",
      prerequisite: "Accord narratif",
      desc: "Vous résidez à la cour d'un autre clan afin de garantir un traité de non-agression.",
      rule: "Vous ne pouvez quitter le château sans escorte, et votre vie sera ôtée si votre propre clan brise la paix jurée."
    },
    {
      id: "dis-retraite-forcee",
      name: "Retraite Forcée (Forced Retirement)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "forced_retirement",
      prerequisite: "Vaut 5 pts pour les Moines",
      desc: "Un scandale a obligé vos supérieurs à raser vos cheveux et à vous expédier au monastère.",
      rule: "Vous perdez votre appartenance de clan et ne progressez plus dans votre école ; vous devez obligatoirement adopter une école de moine non alignée lors de votre prochain rang."
    },
    {
      id: "dis-secret-sombre",
      name: "Sombre Secret (Dark Secret)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "dark_secret",
      prerequisite: "Vaut 5 pts pour les Ninja (Définir l'infamie)",
      desc: "Un acte impardonnable de votre passé (crime rituel, hérésie, sang corrompu) pèse sur votre existence.",
      rule: "Si ce secret est révélé publiquement, vous serez banni de votre clan, déclaré ronin ou contraint d'accomplir le seppuku."
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

    // -----------------------------------------------------------------------
    // DÉSAVANTAGES SPIRITUELS
    // -----------------------------------------------------------------------
    {
      id: "dis-courroux-kami",
      name: "Courroux des Kami (Wrath of the Kami)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "wrath_of_the_kami",
      prerequisite: "Choisir un Élément (Vaut 4 pts pour les Shugenja)",
      desc: "Les esprits d'un élément précis refusent votre amitié et se réjouissent de votre châtiment.",
      rule: "Tout sort hostile de l'élément choisi lancé contre vous confère 1 Augmentation Gratuite à son incantateur."
    },
    {
      id: "dis-desequilibre-elementaire",
      name: "Déséquilibre Élémentaire (Elemental Imbalance)",
      type: "Spirituel",
      cost: 2,
      gain: 2,
      impact: "elemental_imbalance",
      prerequisite: "Shugenja uniquement (2 pts par rang sur un élément non déficient)",
      desc: "Les esprits d'un élément parlent si fort dans votre tête que vos incantations dérapent facilement.",
      rule: "Lorsque vous lancez un sort de cet élément, vous devez réussir un jet de Volonté ND (15 + 5 × rang) ou subir un effet chaotique imprévu."
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
      rule: "Le destin vous garde en vie pour sceller cette tragédie : une fois par session, si vous deviez être tué sur le coup, vous êtes miraculeusement réduit à 1 PV au palier Mortel."
    },
    {
      id: "dis-hante-ancetre",
      name: "Hanté par un Ancêtre (Haunted)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "haunted",
      prerequisite: "Aucun",
      desc: "Le spectre d'un aïeul vous poursuit nuit et jour en vous accablant de reproches discordants.",
      rule: "Pénalité de -1g0 à tous vos jets d'Initiative et jets de Vigilance lors de situations de combat ou de stress."
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
      rule: "Par niveau acheté dans ce désavantage, le MJ peut vous obliger une fois par session à relancer un jet réussi. Vous devez obligatoirement accepter et conserver le second score, même s'il est inférieur."
    },
    {
      id: "dis-malediction-fortune",
      name: "Malédiction des Sept Fortunes (Seven Fortunes' Curse)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "seven_fortunes_curse",
      prerequisite: "3 pts (ou 6 pts pour la Malédiction de Hotei)",
      desc: "Une offense sacrilège a éveillé le courroux d'une Fortune majeure contre votre lignée.",
      rule: "Benten (+10 au ND d'Étiquette) ; Bishamon (-1 aux dégâts d'arme) ; Daikoku (-1g1 en Commerce et -1 koku au départ) ; Ebisu (-1g1 aux jets sociaux avec les heimin/hinin) ; Fukurokujin (+5 au ND des Connaissances) ; Hotei (6 pts : tout effet coûtant 1 point de Vide en exige 2) ; Jurojin (-2g0 contre poisons et maladies)."
    },
    {
      id: "dis-malediction-lignee",
      name: "Malédiction de Lignée (Bloodline Curse)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "bloodline_curse",
      prerequisite: "4 pts (Moto pour la Licorne, Yogo pour le Scorpion)",
      desc: "Votre sang est imprégné par l'antique châtiment jeté sur les fondateurs de votre famille.",
      rule: "Malédiction de Moto (-1g0 pour résister à la Souillure) ; Malédiction de Yogo (le destin vous condamnera un jour à trahir l'être que vous aimez le plus au monde)."
    },
    {
      id: "dis-maudit-par-royaume",
      name: "Maudit par un Royaume Spirituel (Cursed by the Realm)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "cursed_by_realm",
      prerequisite: "Vaut 5 pts pour les Shugenja (Choisir un Royaume)",
      desc: "L'essence d'un monde spirituel a marqué votre âme comme son ennemi juré.",
      rule: "Chikushudō (-1g1 en Dressage) ; Gaki-dō (cible prioritaire des morts affamés) ; Jigoku (-1g1 pour résister à la Souillure) ; Meido (-1g0 en Perception au repos) ; Toshigoku (jet de Volonté ND 15 sous peine d'attaquer tout ennemi blessé) ; Yume-dō (10 heures de sommeil requises pour régénérer le Vide)."
    },
    {
      id: "dis-mauvaise-fortune",
      name: "Mauvaise Fortune (Bad Fortune)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "bad_fortune",
      prerequisite: "Définir la calamité avec le MJ",
      desc: "Le kharma s'acharne contre vous sous la forme d'un mauvais sort récurrent.",
      rule: "Amour Secret (un PNJ passionné sabote systématiquement vos noces et intrigues) ; Défiguration / Mauvais Œil (réactions sociales effrayées ou méfiantes) ; Allergie sévère à une matière commune ; Infortune Latente (échec critique obligatoire choisi un jour par le MJ)."
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
      rule: "Vous possédez des points de Vide, mais vous ne pouvez jamais les dépenser pour les utilisations universelles (points de bonus +1g1, réduction de blessures, ND d'armure, etc.). Seules les techniques d'école qui exigent explicitement du Vide restent utilisables."
    },
    {
      id: "dis-sensible-souillure",
      name: "Vulnérabilité à la Souillure (Taint Vulnerability)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "taint_vulnerability",
      prerequisite: "Incompatible avec Âme Pure",
      desc: "Votre chair et votre esprit manquent de défenses naturelles face aux miasmes de Jigoku.",
      rule: "+10 au ND de tous les jets effectués pour résister à la Souillure. Interdiction totale de dépenser du Vide sur ces jets."
    },
    {
      id: "dis-souillure-outremonde",
      name: "Touché par la Souillure (Shadowlands Taint)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "shadowlands_taint",
      prerequisite: "Incompatible avec Âme Pure",
      desc: "L'ombre de Jigoku a déposé son venin spirituel dans votre flux vital.",
      rule: "Vous débutez la partie avec 0,5 Rang de Souillure de l'Outremonde (non détectable sans magie purificatrice à ce stade)."
    },
    {
      id: "dis-touche-vide",
      name: "Touché par le Vide (Touch of the Void)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "touch_of_the_void",
      prerequisite: "Vaut 4 pts pour le Phénix",
      desc: "Le contact brut avec le Vide déstabilise brutalement votre conscience.",
      rule: "Lorsque vous dépensez 1 point de Vide pour améliorer un jet, vous gagnez +2g1 au lieu de +1g1, mais vous devez réussir un jet de Volonté ND 30 ou être Étourdi (Dazed) pour 1 round."
    }
  ];

  // =========================================================================
  // 3. INDEXATION ET ACCÈS CROISÉ (Array + Dictionnaire id / name)
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
  // 4. EXPORT GLOBAL POUR LE GÉNÉRATEUR & L'INTERFACE
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
