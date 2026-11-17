/**
 * data/avantages-desavantages-data.js — L5R 4e Édition
 * Recueil exhaustif et exact conforme au Livre de Base 4e Édition (pp. 145-162)
 * et aux suppléments officiels 4e Édition (Emerald Empire, Enemies of the Empire,
 * The Great Clans, Imperial Histories I & II, Naishou Province, Strongholds of the Empire).
 * Plafond officiel des Désavantages : 10 XP maximum (Core pp. 104, 145).
 */

(function () {
  // =========================================================================
  // 1. CATALOGUE OFFICIEL DES AVANTAGES (L5R 4E ÉDITION)
  // =========================================================================
  const AVANTAGES_LIST = [
    // -----------------------------------------------------------------------
    // AVANTAGES PHYSIQUES (CORE)
    // -----------------------------------------------------------------------
    {
      id: "adv-insipide",
      name: "Physique Anodin (Bland)",
      type: "Physique",
      cost: 2,
      impact: "bland",
      prerequisite: "Aucun",
      desc: "Vous êtes extrêmement ordinaire en tout point, et autrui peine à vous reconnaître sans que vous attiriez délibérément l'attention.",
      rule: "Chaque fois que quelqu'un effectue un jet de Connaissance : Bushidō / Intuition pour déterminer votre Rang d'Honneur, ou de Connaissance : Héraldique / Intelligence pour vous identifier (selon votre Rang de Gloire), vous pouvez volontairement augmenter le ND de ce jet de +10."
    },
    {
      id: "adv-mains-crabe",
      name: "Mains de Crabe (Crab Hands)",
      type: "Physique",
      cost: 3,
      impact: "crab_hands",
      prerequisite: "2 pts pour le Clan du Crabe et les personnages Bushi",
      desc: "Vous possédez une affinité naturelle avec toute sorte d'armes et maniez aisément une lame inconnue en situation de stress.",
      rule: "Chaque fois que vous devriez effectuer un jet non entraîné (Unskilled Roll) avec une Compétence d'Arme, vous êtes considéré comme possédant le Rang 1 dans cette Compétence d'Arme."
    },
    {
      id: "adv-beaute-dangereuse",
      name: "Beauté Dangereuse (Dangerous Beauty)",
      type: "Physique",
      cost: 3,
      impact: "dangerous_beauty",
      prerequisite: "2 pts pour le Clan du Scorpion",
      desc: "Vous possédez un magnétisme tel que les membres du sexe opposé peinent à résister à vos manipulations.",
      rule: "Vous gagnez un bonus de +1g0 au total de tous vos jets de Compétence Tentation effectués contre des membres du sexe opposé."
    },
    {
      id: "adv-mains-pierre",
      name: "Mains de Pierre (Hands of Stone)",
      type: "Physique",
      cost: 6,
      impact: "hands_of_stone",
      prerequisite: "5 pts pour les personnages Moines",
      desc: "Vous possédez un talent naturel redoutable pour le combat à mains nues.",
      rule: "Les jets de dégâts de vos attaques à mains nues sont augmentés de +0g1."
    },
    {
      id: "adv-grand",
      name: "Grand (Large)",
      type: "Physique",
      cost: 4,
      impact: "large",
      prerequisite: "3 pts pour le Clan du Crabe (incompatible avec Petit)",
      desc: "Votre stature dépasse nettement la moyenne rokugani, atteignant de 1,83 m à 1,91 m (6'0\" à 6'3\").",
      rule: "Vous gagnez un bonus de +1g0 au total de tous vos jets de dégâts avec toute arme de mêlée de taille Grande (Large)."
    },
    {
      id: "adv-reflexes-eclair",
      name: "Vitesse Éclair (Lightning Reflexes)",
      type: "Physique",
      cost: 4,
      impact: "lightning_reflexes",
      prerequisite: "Aucun",
      desc: "Vos réactions fulgurantes vous permettent d'agir dès les premiers instants du combat.",
      rule: "Vous gagnez un bonus de +1g0 au total de vos jets d'Initiative."
    },
    {
      id: "adv-prodigieux",
      name: "Prodige (Prodigy)",
      type: "Physique",
      cost: 12,
      impact: "prodigy",
      prerequisite: "Aucun",
      desc: "Vous êtes un prodige du dojo et vos sensei attendent de vous des prouesses exceptionnelles.",
      rule: "Chaque fois que vous effectuez un jet avec une Compétence d'École (School Skill Roll), vous gagnez un bonus de +1g0 à ce jet."
    },
    {
      id: "adv-vif",
      name: "Vif (Quick)",
      type: "Physique",
      cost: 6,
      impact: "quick",
      prerequisite: "5 pts pour les personnages Ninja",
      desc: "Vous réagissez instantanément aux ouvertures laissées par vos adversaires au fil de l'affrontement.",
      rule: "Si vous n'avez pas agi en premier durant un Round de combat, vous pouvez, lors de la Phase des Réactions, ajouter votre Trait Réflexes au total de votre Score d'Initiative pour tous les Rounds suivants de cette escarmouche (cumulable chaque Round où vous n'agissez pas en premier)."
    },
    {
      id: "adv-guerisseur-rapide",
      name: "Guérison Accélérée (Quick Healer)",
      type: "Physique",
      cost: 3,
      impact: "quick_healer",
      prerequisite: "Aucun",
      desc: "Votre corps se rétablit avec une rapidité stupéfiante même des blessures les plus graves.",
      rule: "Pour la récupération des Blessures (repos naturel, soins), votre Trait Constitution est considéré comme supérieur de deux rangs."
    },
    {
      id: "adv-silencieux",
      name: "Silencieux (Silent)",
      type: "Physique",
      cost: 3,
      impact: "silent",
      prerequisite: "2 pts pour les personnages Ninja",
      desc: "Vous vous déplacez naturellement sans le moindre bruit en toute circonstance.",
      rule: "Vous ajoutez +1g0 au total de tous vos jets de Discrétion (Stealth)."
    },
    {
      id: "adv-force-terre",
      name: "Force de la Terre (Strength of the Earth)",
      type: "Physique",
      cost: 3,
      impact: "strength_earth",
      prerequisite: "2 pts pour les personnages Bushi (incompatible avec Sensible à la Douleur)",
      desc: "Votre âme possède la fermeté des montagnes et surmonte des blessures qui terrasseraient autrui.",
      rule: "Les pénalités de ND infligées par vos Paliers de Blessures sont réduites de 3 points."
    },
    {
      id: "adv-voix",
      name: "La Voix de Rokugan (Voice)",
      type: "Physique",
      cost: 3,
      impact: "voice",
      prerequisite: "Aucun",
      desc: "Votre timbre de voix possède une résonance agréable et captivante à tout point de vue.",
      rule: "Vous gagnez un bonus de +1g1 sur tout jet de Compétence Art de la Scène (Perform) utilisant votre voix (Chant, Art Oratoire, Conteur, etc.)."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES MENTAUX (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "adv-direction-absolue",
      name: "Direction Absolue (Absolute Direction)",
      type: "Mental",
      cost: 1,
      impact: "absolute_direction",
      prerequisite: "Aucun",
      desc: "Vous possédez un sens surnaturel de l'orientation et connaissez toujours le Nord.",
      rule: "Vous savez toujours avec certitude où se trouve le Nord en toutes circonstances. Cette faculté cesse de fonctionner si vous vous enfoncez à plus d'une journée de marche à l'intérieur de l'Outremonde."
    },
    {
      id: "adv-equilibre-interieur",
      name: "Équilibre Intérieur (Balance)",
      type: "Mental",
      cost: 2,
      impact: "balance",
      prerequisite: "Aucun",
      desc: "Vous possédez un calme et une sérénité innés qui soutiennent votre honneur face aux provocations.",
      rule: "Lorsque vous ajoutez votre Rang d'Honneur au total de tout jet pour résister à l'Intimidation ou à la Tentation, vous ajoutez un bonus supplémentaire de +1g0 à ce jet."
    },
    {
      id: "adv-pensee-claire",
      name: "Pensée Claire (Clear Thinker)",
      type: "Mental",
      cost: 3,
      impact: "clear_thinker",
      prerequisite: "2 pts pour le Clan du Dragon (incompatible avec Naïf)",
      desc: "Votre esprit vif et votre discernement aigu rendent toute manipulation très difficile.",
      rule: "Chaque fois que vous effectuez un Jet Opposé contre quelqu'un tentant de vous embrouiller ou vous manipuler de quelque façon que ce soit, vous gagnez un bonus de +1g0 au total de votre jet."
    },
    {
      id: "adv-astucieux",
      name: "Astucieux (Crafty)",
      type: "Mental",
      cost: 3,
      impact: "crafty",
      prerequisite: "2 pts pour le Clan du Scorpion et les Ninja",
      desc: "Vous comprenez instinctivement comment accomplir des actes que la plupart des gens évitent à tout prix.",
      rule: "Chaque fois que vous devriez effectuer un jet non entraîné (Unskilled Roll) avec une Compétence Dégradante (Low Skill), vous êtes considéré comme possédant le Rang 1 dans cette compétence."
    },
    {
      id: "adv-casse-cou",
      name: "Casse-Cou (Daredevil)",
      type: "Mental",
      cost: 3,
      impact: "daredevil",
      prerequisite: "2 pts pour le Clan de la Mante",
      desc: "Vous possédez un flair naturel pour les acrobaties périlleuses et un mépris total du danger physique.",
      rule: "Chaque fois que vous dépensez un point de Vide pour améliorer un jet de Compétence Athlétisme, vous gagnez un bonus de +3g1 au total du jet au lieu du +1g1 habituel."
    },
    {
      id: "adv-parangon-sombre",
      name: "Parangon Sombre (Dark Paragon)",
      type: "Mental",
      cost: 5,
      gmOnly: true,
      impact: "dark_paragon",
      prerequisite: "4 pts pour le Clan de l'Araignée (incompatible avec Modèle de Bushidō et Échec du Bushidō)",
      desc: "Vous maîtrisez l'un des sept préceptes du Shouridō, l'antithèse sombre du Bushidō.",
      rule: "1 fois par session, par Action Gratuite et en dépensant 5 points d'Honneur (ou 1 point de Vide si vous n'avez pas 5 points d'Honneur), activez l'effet du précepte choisi avec un bonus de +5 (sauf Détermination et Perfection) : Contrôle (relance d'un Jet Social) ; Détermination (annule tous malus de ND/Blessures sur 1 jet de Compétence ou d'Incantation, sans +5) ; Clairvoyance (relance d'un jet sous Intuition) ; Savoir (relance d'un jet sous Intelligence) ; Perfection (fait exploser 1 dé au choix sur un jet de Compétence, sans +5) ; Force (relance d'un jet de dégâts) ; Volonté (annule 10 Blessures au moment où elles sont subies)."
    },
    {
      id: "adv-savoir-interdit",
      name: "Savoir Interdit (Forbidden Knowledge)",
      type: "Mental",
      cost: 5,
      gmOnly: true,
      impact: "forbidden_knowledge",
      prerequisite: "Choisir le domaine avec le MJ",
      desc: "Vous détenez un savoir tabou dont la simple détention ferait naître les plus graves soupçons.",
      rule: "Vous gagnez le Rang 1 dans la Connaissance interdite correspondante et ses avantages propres : Poudre Gaijin (Artisanat : Explosifs 1 + bourse de poudre) ; Gozoku (Connaissance : Gozoku 1, +1g1 Social avec membres connus du Gozoku) ; Kolat (Connaissance : Kolat 1, +1g1 Social avec membres connus du Kolat) ; Ombre Rampante (Connaissance : Ombre Rampante 1, Perception/Ombre Rampante ND 30 décèle si un individu est corrompu) ; Mahō (Connaissance : Mahō 1, possible sort de mahō initial selon le MJ)."
    },
    {
      id: "adv-dessein-superieur",
      name: "Dessein Supérieur (Higher Purpose)",
      type: "Mental",
      cost: 3,
      impact: "higher_purpose",
      prerequisite: "Définir l'œuvre de votre vie avec le MJ",
      desc: "Une grande œuvre nécessitant des années, voire toute une existence, guide chacun de vos pas.",
      rule: "Lors de toute session de jeu durant laquelle vous et le MJ convenez que vous avez accompli un progrès démontrable vers l'accomplissement de ce but, vous recevez 1 point d'Expérience (XP) supplémentaire."
    },
    {
      id: "adv-irreprochable",
      name: "Irréprochable (Irreproachable)",
      type: "Mental",
      cost: 2,
      impact: "irreproachable",
      prerequisite: "1 pt pour les personnages des Familles Impériales",
      desc: "Votre vertu irréprochable repousse presque toute tentative de vous corrompre.",
      rule: "Lorsque vous effectuez un Jet Opposé dans lequel l'autre partie utilise la Compétence Tentation contre vous, vous gagnez un bonus de +1g0 à votre jet."
    },
    {
      id: "adv-langues",
      name: "Langues (Languages)",
      type: "Mental",
      cost: 1,
      impact: "languages",
      prerequisite: "1 pt (langue humaine étrangère) ou 3 pts (langue non-humaine)",
      desc: "Vous connaissez un idiome extérieur aux deux dialectes de l'Empire d'Émeraude.",
      rule: "Pour 1 pt, vous comprenez une langue humaine étrangère (Yobanjin, Senpet, Yodotaï, Mekham, Merenae, Rhuumal, Thrane, etc.). Pour 3 pts, vous obtenez une langue non-humaine (Nezumi, Naga), conférant la compréhension et une capacité limitée à exprimer des concepts très simples."
    },
    {
      id: "adv-modele-bushido",
      name: "Modèle de Bushidō (Paragon)",
      type: "Mental",
      cost: 7,
      impact: "paragon_bushido",
      prerequisite: "6 pts pour le Clan du Lion (choisir 1 vertu ; incompatible avec Parangon Sombre et Échec du Bushidō)",
      desc: "Vous incarnez le code du Bushidō et faites d'une de ses sept vertus le principe cardinal de votre existence.",
      rule: "Chaque fois que vous gagnez de l'Honneur pour avoir manifesté votre vertu choisie, vous gagnez +1 point d'Honneur supplémentaire, plus son pouvoir : Compassion (+2g2 au lieu de +1g1 pour 1 Vide en aidant directement un inférieur dans l'Ordre Céleste) ; Courage (+1g1 pour résister à Intimidation ou Peur) ; Courtoisie (+2g0 en Étiquette pour éviter embarras ou rupture d'honneur) ; Devoir (1 Vide sur jet de Compétence ou d'Incantation annule tous les malus au ND, dont les Blessures) ; Honnêteté (+1g1 en Sincérité [Honnêteté] même sans la spécialisation si applicable) ; Honneur (double votre Rang d'Honneur ajouté aux jets de résistance contre Tentation/Intimidation) ; Sincérité (+2g0 à tout Jet Opposé de Sincérité)."
    },
    {
      id: "adv-memoire-precise",
      name: "Mémoire Précise (Precise Memory)",
      type: "Mental",
      cost: 3,
      impact: "precise_memory",
      prerequisite: "Aucun",
      desc: "Vous vous remémorez avec une exactitude photographique ce que vous avez vu ou entendu.",
      rule: "Chaque fois que vous devez vous souvenir d'une chose exactement telle qu'elle était (texte lu, détails d'un visage), vous gagnez un bonus de +1g1 à votre jet du Trait Intelligence."
    },
    {
      id: "adv-lire-levres",
      name: "Lire sur les Lèvres (Read Lips)",
      type: "Mental",
      cost: 4,
      impact: "read_lips",
      prerequisite: "3 pts pour les personnages Courtisans",
      desc: "Vous comprenez les propos tenus sans pouvoir les entendre en observant le mouvement des lèvres.",
      rule: "Réussissez un jet du Trait Perception contre ND 15 + 5 par tranche de 6 m (20') qui vous sépare des interlocuteurs."
    },
    {
      id: "adv-erudit",
      name: "Érudit (Sage)",
      type: "Mental",
      cost: 4,
      impact: "sage",
      prerequisite: "3 pts pour le Phénix et les Shugenja",
      desc: "Vous avez accumulé au fil de votre vie une somme prodigieuse de connaissances.",
      rule: "Chaque fois que vous devriez effectuer un jet non entraîné (Unskilled Roll) avec une Compétence de Connaissance (Lore), vous êtes considéré comme possédant le Rang 1 dans cette compétence."
    },
    {
      id: "adv-ame-artiste",
      name: "Âme d'Artiste (Soul of Artistry)",
      type: "Mental",
      cost: 4,
      impact: "soul_artistry",
      prerequisite: "3 pts pour la Grue et les Courtisans (choisir Artisanat ou Art)",
      desc: "Votre âme vibre à l'unisson de la création artistique ou manuelle.",
      rule: "Choisissez soit les Compétences d'Art (Artisan), soit les Compétences d'Artisanat (Craft) : chaque fois que vous devriez effectuer un jet non entraîné (Unskilled Roll) dans la catégorie choisie, vous êtes considéré comme possédant le Rang 1."
    },
    {
      id: "adv-tactique",
      name: "Tacticien Émérite (Tactician)",
      type: "Mental",
      cost: 4,
      impact: "tactician",
      prerequisite: "3 pts pour le Clan du Lion et les Bushi",
      desc: "Votre esprit saisit intuitivement le flux et le reflux des batailles.",
      rule: "Lorsque vous effectuez un jet sur la Table de Bataille de Masse (Mass Battle Table), vous pouvez augmenter ou diminuer votre résultat de 5."
    },
    {
      id: "adv-vertueux",
      name: "Vertueux (Virtuous)",
      type: "Mental",
      cost: 3,
      impact: "virtuous",
      prerequisite: "Aucun",
      desc: "Vous embrassez la vertu dans chacune de vos pensées et de vos actions.",
      rule: "Vous débutez la partie avec un Rang d'Honneur plein (+1.0) supérieur à la valeur de départ normale déterminée par votre École."
    },
    {
      id: "adv-mefiant",
      name: "Méfiant (Wary)",
      type: "Mental",
      cost: 3,
      impact: "wary",
      prerequisite: "Aucun",
      desc: "Toujours sur vos gardes, vous guettez sans cesse l'inattendu.",
      rule: "Lors d'un jet d'Enquête (Observation) / Perception contre Discrétion (Embuscade) / Agilité pour détecter une embuscade, vous ajoutez +1g1 à votre jet."
    },
    {
      id: "adv-sens-orientation",
      name: "Connaissance du Terrain (Way of the Land)",
      type: "Mental",
      cost: 2,
      impact: "way_of_the_land",
      prerequisite: "1 pt pour le Clan de la Licorne (choisir une région, terre familiale ou grande cité)",
      desc: "Vous connaissez une province, une grande cité ou les terres d'une famille comme l'intérieur de votre demeure.",
      rule: "Tant que vous vous trouvez dans la région sélectionnée, il vous est impossible de vous y perdre et vous connaissez l'emplacement de toutes les ressources disponibles."
    },
    {
      id: "adv-grand-potentiel",
      name: "Grand Potentiel (Great Potential)",
      type: "Mental",
      cost: 5,
      impact: "great_potential",
      prerequisite: "Type variable selon la compétence choisie",
      desc: "Vous recélez le potentiel d'exceller dans un domaine bien plus que quiconque dans l'Empire.",
      rule: "Choisissez une Compétence : lorsque vous déclarez des Augmentations avec cette compétence, votre maximum est déterminé par votre rang dans cette Compétence au lieu de votre Anneau de Vide (vous pouvez toutefois utiliser le Vide s'il est plus élevé)."
    },
    {
      id: "adv-sans-coeur",
      name: "Cœur de Pierre (Heartless)",
      type: "Mental",
      cost: 4,
      impact: "heartless",
      prerequisite: "The Great Clans, p. 137",
      desc: "Vous avez un cœur de pierre : courtoisie, amour, compassion ou pitié glissent sur vous sans effet.",
      rule: "Vous gagnez un bonus de +1g0 aux jets visant à résister à tout jet de Courtisan, Sincérité ou Tentation destiné à vous persuader, vous séduire ou vous faire changer d'avis."
    },
    {
      id: "adv-ombre-coeur",
      name: "Cœur Ombragé (Shadowed Heart)",
      type: "Mental",
      cost: 5,
      impact: "shadowed_heart",
      prerequisite: "Enemies of the Empire, p. 50",
      desc: "Vous avez entraîné votre esprit à devenir presque impénétrable à ceux qui vous entourent.",
      rule: "Tout jet effectué pour discerner vos véritables intentions ou motivations — y compris les Jets de Compétences Sociales et les Jets d'Incantation de sorts révélant vos pensées — voit son ND augmenté de +5."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES SOCIAUX (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "adv-allie",
      name: "Alliés (Allies)",
      type: "Social",
      cost: 2,
      impact: "ally",
      prerequisite: "Coût = Influence (Mineure 1, Modérée 2, Majeure 4) + Dévotion (1, 2, 4) ; −1 pt pour la Grue (min 1)",
      desc: "Vous entretenez un réseau de relations prêtes à intervenir ou à user de leur influence en votre faveur.",
      rule: "Coût déterminé par l'Influence de l'allié (1 pt Mineure sans fief/charge ; 2 pts Modérée avec terres ou influence politique ; 4 pts Majeure avec vastes terres ou haute charge) + Dévotion (1 pt s'écarte de son chemin sans risquer son honneur ; 2 pts risque son honneur secrètement ; 4 pts fera tout sans regard pour le coût)."
    },
    {
      id: "adv-chantage-obtenu",
      name: "Chantage (Blackmail)",
      type: "Social",
      cost: 1,
      impact: "blackmail",
      prerequisite: "Coût égal au Rang de Statut de la cible ; −1 pt pour le Scorpion (min 1)",
      desc: "Vous détenez la preuve d'un lourd secret compromettant un tiers.",
      rule: "Permet d'obtenir la coopération de la cible visée. Abuser de ce levier ou formuler des exigences excessives peut amener la victime à préférer votre mort au risque de voir son secret révélé."
    },
    {
      id: "adv-fiancailles-heureuses",
      name: "Fiançailles Heureuses (Blissful Betrothal)",
      type: "Social",
      cost: 3,
      impact: "blissful_betrothal",
      prerequisite: "Aucun",
      desc: "Votre mariage arrangé s'est mué, pour votre plus grand bonheur, en un amour sincère et partagé.",
      rule: "Les liens sociaux tissés grâce aux préparatifs de cette union réduisent de 2 points (minimum 1 pt) le coût d'achat de chacun des Avantages suivants : Noblesse Terrienne (Gentry), Lien Karmique (avec votre fiancé(e) uniquement), Rang Social Élevé (Social Position) et Richesse Personnelle (Wealthy)."
    },
    {
      id: "adv-favori-cour",
      name: "Favori de la Cour (Darling of the Court)",
      type: "Social",
      cost: 2,
      impact: "darling_of_the_court",
      prerequisite: "1 pt pour les Courtisans (choisir une cour précise ; cumulable pour des cours différentes)",
      desc: "Lors d'une session récente, vous avez gagné l'estime marquée de l'hôte d'une cour précise.",
      rule: "Lorsque vous assistez à cette cour précise et tant qu'elle est officiellement en session, votre Rang de Statut est considéré comme supérieur de 1 rang plein (+1.0)."
    },
    {
      id: "adv-autre-ecole",
      name: "École Différente (Different School)",
      type: "Social",
      cost: 5,
      impact: "different_school",
      prerequisite: "À la création du personnage uniquement",
      desc: "Votre famille a sacrifié faveurs et ressources pour financer votre admission au dojo d'un autre Clan.",
      rule: "Lors de la création du personnage, vous pouvez choisir une École appartenant à un autre Clan tout en demeurant membre de votre Clan et de votre Famille d'origine (créant un tiraillement potentiel de loyauté)."
    },
    {
      id: "adv-renommee",
      name: "Renommée (Fame)",
      type: "Social",
      cost: 3,
      impact: "fame",
      prerequisite: "Aucun",
      desc: "Vos exploits ont porté votre nom bien au-delà de votre province natale.",
      rule: "Vous gagnez un bonus permanent de +1.0 Rang de Gloire."
    },
    {
      id: "adv-coeur-vengeance",
      name: "Cœur Vengeur (Heart of Vengeance)",
      type: "Social",
      cost: 5,
      impact: "heart_of_vengeance",
      prerequisite: "Choisir 1 Clan ou faction (avec accord du MJ)",
      desc: "Une haine inextinguible vous anime envers un Clan ou une faction de l'Empire.",
      rule: "Choisissez un Clan ou une faction (Confrérie de Shinsei, Famille Impériale, etc.) : vous gagnez un bonus de +1g1 au total de tout Jet Opposé effectué contre un membre de cette faction."
    },
    {
      id: "adv-heros-peuple",
      name: "Héros du Peuple (Hero of the People)",
      type: "Social",
      cost: 2,
      impact: "hero_of_the_people",
      prerequisite: "Aucun",
      desc: "Vos actes vous ont valu l'affection et la gratitude des gens du commun.",
      rule: "Pour les habitants de Rokugan qui n'appartiennent pas à la caste des samouraïs, le ND pour vous reconnaître selon votre Rang de Gloire est réduit de 10."
    },
    {
      id: "adv-epoux-imperial",
      name: "Époux / Épouse Impérial(e) (Imperial Spouse)",
      type: "Social",
      cost: 5,
      impact: "imperial_spouse",
      prerequisite: "Aucun",
      desc: "Par un habile jeu de faveurs politiques, votre mariage vous unit à un membre mineur d'une Famille Impériale.",
      rule: "Vous gagnez +0.5 Rang de Statut et un bonus de +1g1 au total de tous vos Jets de Compétences Sociales face aux membres des Familles Impériales."
    },
    {
      id: "adv-commandement",
      name: "Aura de Commandement (Leadership)",
      type: "Social",
      cost: 6,
      impact: "leadership",
      prerequisite: "5 pts pour le Clan du Lion",
      desc: "Votre charisme naturel galvanise et coordonne vos compagnons sur le champ de bataille.",
      rule: "Une fois par Round, durant la Phase des Réactions, vous pouvez ajouter votre Rang d'École + 1g1 au Score d'Initiative d'un allié dans une escarmouche jusqu'à la Phase des Réactions du Round suivant (1 seule utilisation reçue par allié et par Round)."
    },
    {
      id: "adv-ecoles-multiples",
      name: "Écoles Multiples (Multiple Schools)",
      type: "Social",
      cost: 10,
      impact: "multiple_schools",
      prerequisite: "En cours de campagne uniquement (accord MJ) • Rang 1 dans toutes les Compétences de la nouvelle École • Incompatible Bushi ↔ Shugenja",
      desc: "Vos seigneurs et sensei vous autorisent à quitter votre dojo pour vous initier à une autre École.",
      rule: "Votre progression dans votre École actuelle s'arrête. Au prochain gain de Rang de Maîtrise, vous apprenez les Techniques de la nouvelle École à partir du Rang 1. Il est rigoureusement impossible de détenir des rangs à la fois dans une École de Bushi et dans une École de Shugenja."
    },
    {
      id: "adv-honneur-percu",
      name: "Honneur Perçu (Perceived Honor)",
      type: "Social",
      cost: 2,
      impact: "perceived_honor",
      prerequisite: "2 pts par rang acheté",
      desc: "Autrui peine à sonder votre véritable nature morale sous votre maintien irréprochable.",
      rule: "Pour chaque rang acheté, votre Honneur est considéré comme supérieur de 1 rang plein (+1.0) pour toute tentative de l'évaluer par Connaissance : Bushidō / Intuition."
    },
    {
      id: "adv-sacro-saint",
      name: "Sacro-Saint (Sacrosanct)",
      type: "Social",
      cost: 4,
      impact: "sacrosanct",
      prerequisite: "Honneur 6.0 minimum (3 pts pour les Familles Impériales)",
      desc: "En récompense d'un immense service rendu à l'Empereur, le Fils du Ciel vous a placé sous Sa protection.",
      rule: "Tant que votre Honneur reste supérieur ou égal à 6.0, nul individu d'Honneur 5.0 ou plus ne peut vous attaquer à moins que vous ne l'attaquiez en premier (les duels volontairement acceptés ignorent cet Avantage)."
    },
    {
      id: "adv-sensation",
      name: "Bête de Scène (Sensation)",
      type: "Social",
      cost: 3,
      impact: "sensation",
      prerequisite: "Aucun",
      desc: "Vous savez captiver n'importe quel auditoire en toute circonstance.",
      rule: "Chaque fois que vous devriez effectuer un jet non entraîné (Unskilled Roll) avec une Compétence Art de la Scène (Perform), vous êtes considéré comme possédant le Rang 1."
    },
    {
      id: "adv-statut-social",
      name: "Position Sociale (Social Position)",
      type: "Social",
      cost: 6,
      impact: "social_position",
      prerequisite: "Aucun",
      desc: "Une nomination prestigieuse de nature civile, militaire ou spirituelle accroît votre autorité.",
      rule: "Vous gagnez un bonus de +1.0 Rang de Statut."
    },
    // Suppléments Sociaux
    {
      id: "adv-monde-daimyo",
      name: "Le Monde du Daimyō (The World of the Daimyo)",
      type: "Social",
      cost: 5,
      impact: "world_of_the_daimyo",
      prerequisite: "Emerald Empire, p. 280 (+3 XP par achat supplémentaire)",
      desc: "Vous poursuivez votre ascension dans les cercles exigeants de la haute société impériale.",
      rule: "Vous gagnez 5 Points de Devoir (Duty Points) utilisables pour acquérir les Traits de n'importe quel Poste (Station Feature). Achat multiple possible (+3 XP au coût à chaque niveau additionnel)."
    },
    {
      id: "adv-voie-daimyo",
      name: "La Voie du Daimyō (The Daimyo's Path)",
      type: "Social",
      cost: 10,
      impact: "daimyos_path",
      prerequisite: "Emerald Empire, p. 280 • Requiert Le Monde du Daimyō",
      desc: "Votre maîtrise politique inspire le respect et la confiance de vos supérieurs.",
      rule: "Vous gagnez 8 Points de Devoir et pouvez acquérir les Capacités de Niveau 3 (Level Three Features) de votre Poste principal uniquement."
    },
    {
      id: "adv-reseau-espions",
      name: "Réseau d'Espions (Spy Network)",
      type: "Social",
      cost: 8,
      impact: "spy_network",
      prerequisite: "Enemies of the Empire, p. 50 • 7 pts Famille Daidoji, 6 pts Scorpion",
      desc: "Vous disposez d'un réseau de renseignement clandestin actif dans les terres habitées.",
      rule: "1 fois par session, si vous êtes en mesure de contacter votre réseau (inutilisable en désert isolé, Outremonde ou Shinomen Mori), vous obtenez une information utile autrement inaccessible."
    },
    {
      id: "adv-scribe-imperial",
      name: "Scribe Impérial (Imperial Scribe)",
      type: "Social",
      cost: 4,
      impact: "imperial_scribe",
      prerequisite: "Imperial Histories I, p. 67 • Statut 2+, Calligraphie 4+",
      desc: "Formé comme scribe officiel de la Cité Impériale, vous jouissez d'un grand prestige auprès des lettrés.",
      rule: "Vous gagnez +1g0 sur tous vos Jets Sociaux contre les shugenja et les artisans, ainsi qu'une Augmentation Gratuite sur vos jets de Calligraphie."
    },
    {
      id: "adv-citoyen-naishou",
      name: "Citoyen de Naishou (Naishou Citizen)",
      type: "Social",
      cost: 3,
      impact: "naishou_citizen",
      prerequisite: "Naishou Province, p. 22",
      desc: "Originaire de la province de Naishou, terre fervente de vénération des Fortunes.",
      rule: "L'Avantage Bénédiction des Sept Fortunes vous coûte 1 pt d'XP en moins (changement de Fortune possible plus tard avec accord du MJ). De plus, +1 Augmentation Gratuite sur tout Jet Social avec les moines voués à votre Fortune bénie."
    },
    {
      id: "adv-identite-volee",
      name: "Identité Volée (Stolen Identity)",
      type: "Social",
      cost: 6,
      impact: "stolen_identity",
      prerequisite: "Strongholds of the Empire, p. 93",
      desc: "Dans les ruines d'Otosan Uchi, vous avez mis la main sur les attributs d'une identité d'emprunt complète.",
      rule: "Choisissez un nom d'emprunt, une Famille et une École d'un autre Grand Clan : vous recevez son Équipement de départ (sans les koku) et gagnez 2 Augmentations Gratuites sur tout jet de Comédie (Acting) pour vous faire passer pour cette identité."
    },
    {
      id: "adv-citoyen-cite-forte",
      name: "Citoyen d'une Cité Notable (Stronghold Citizen)",
      type: "Social",
      cost: 3,
      impact: "stronghold_citizen",
      prerequisite: "Strongholds of the Empire (coût 2 à 3 pts selon la cité choisie)",
      desc: "Votre résidence et vos appuis dans l'une des cités majeures de l'Empire vous confèrent des atouts civiques précis.",
      rule: "Cité des Vagues Brisées (3 pts : +1g0 Commerce & Navigation) ; Village des Eaux Claires (3 pts : +1g0 Commerce, koku initiaux ×1,5 arr. sup.) ; Village de l'Orée Sombre (2 pts : +1 rang Connaissance : Iaijutsu, +1 Statut pour organiser/représenter un duel) ; Nikesake (3 pts : +1g0 Social avec Grue, Alliés Grue −1 pt min 1) ; Cité du Marteau d'Eau (3 pts : +1 rang Artisanat max 4, délais de forge réduits d'un rang monétaire) ; Cité Impériale Citoyen/Vétéran (2 pts : +1 Gloire devant Courtisans / Bushi) ; Zakyo Toshi (3 pts : +1 rang Jeux, koku initiaux ×1,5) ; Ombre de la Cité en Ruines (Physique 3 pts : +1g0 Discrétion [Embuscade] en milieu urbain)."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES SPIRITUELS (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "adv-sang-osano-wo",
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
      type: "Spirituel",
      cost: 4,
      impact: "blood_osano_wo",
      prerequisite: "3 pts pour les Clans du Crabe et de la Mante",
      desc: "La vigueur des tempêtes de la Fortune du Feu et du Tonnerre coule dans votre lignée.",
      rule: "Vous êtes immunisé aux pénalités et dégâts des conditions météorologiques naturelles. Les dégâts infligés par les sorts employant des forces naturelles (Ouragan, Fureur d'Osano-Wo, etc.) sont réduits de 1g1."
    },
    {
      id: "adv-choisi-oracles",
      name: "Élu des Oracles (Chosen by the Oracles)",
      type: "Spirituel",
      cost: 6,
      impact: "chosen_by_oracles",
      prerequisite: "Choisir un Anneau Élémentaire",
      desc: "L'un des Oracles élémentaires a posé son regard sur vous.",
      rule: "Choisissez un Anneau lors de l'achat : vous gagnez un bonus de +1g1 au total de tous les Jets d'Anneau (Ring Rolls) utilisant cet Anneau."
    },
    {
      id: "adv-benediction-elementaire",
      name: "Bénédiction Élémentaire (Elemental Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "elemental_blessing",
      prerequisite: "3 pts pour le Clan du Phénix (Air, Terre, Feu ou Eau — hors Vide)",
      desc: "Les kami d'un élément chérissent votre âme et allègent votre éveil corporel et spirituel.",
      rule: "Le coût en points d'Expérience pour augmenter les deux Traits associés à l'Anneau choisi (Air, Terre, Feu ou Eau ; jamais le Vide) est réduit de 1 XP à chaque augmentation."
    },
    {
      id: "adv-illumine",
      name: "Illuminé (Enlightened)",
      type: "Spirituel",
      cost: 6,
      impact: "enlightened",
      prerequisite: "5 pts pour le Clan du Dragon et les Moines",
      desc: "Votre cheminement vers l'harmonie cosmique vous rend le Vide naturellement plus accessible.",
      rule: "Le coût total en XP pour augmenter votre Anneau de Vide est réduit de 2 points à chaque augmentation."
    },
    {
      id: "adv-ami-confrerie",
      name: "Ami de la Confrérie (Friend of the Brotherhood)",
      type: "Spirituel",
      cost: 5,
      impact: "friend_of_the_brotherhood",
      prerequisite: "Shugenja ou Moine hors Confrérie (4 pts pour le Clan du Dragon)",
      desc: "Vos études aux côtés des moines de Shinsei vous ouvrent les enseignements secrets des Kiho.",
      rule: "Vous pouvez acheter des Kiho au coût normal des Moines de la Confrérie de Shinsei au lieu du surcoût normal (tout en conservant les prérequis habituels)."
    },
    {
      id: "adv-ami-elements",
      name: "Ami des Éléments (Friend of the Elements)",
      type: "Spirituel",
      cost: 4,
      impact: "friend_of_the_elements",
      prerequisite: "3 pts pour les Shugenja (choisir un Anneau)",
      desc: "Les esprits d'un élément tourbillonnent constamment autour de vous pour vous assister.",
      rule: "Choisissez un Anneau lors de l'achat : chaque fois que vous effectuez un Jet de Trait (Trait Roll uniquement) utilisant l'un ou l'autre des deux Traits de cet Anneau, vous gagnez une Augmentation Gratuite."
    },
    {
      id: "adv-kami-amical",
      name: "Kami Amical (Friendly Kami)",
      type: "Spirituel",
      cost: 5,
      impact: "friendly_kami",
      prerequisite: "Shugenja uniquement (choisir un Élément non déficient)",
      desc: "Un kami particulier s'est pris d'affection pour vous et répond avec empressement à vos prières.",
      rule: "Choisissez un Élément dans lequel vous n'avez pas de Déficience : +1g1 au total de tous vos Jets d'Incantation pour lancer Sens, Communion ou Convocation avec cet Élément uniquement."
    },
    {
      id: "adv-destin-grandiose",
      name: "Destin Grandiose (Great Destiny)",
      type: "Spirituel",
      cost: 5,
      impact: "great_destiny",
      prerequisite: "Aucun",
      desc: "Le cycle karmique vous réserve un grand destin et l'Ordre Céleste préserve votre souffle.",
      rule: "1 fois par session, si vous deviez subir des Blessures qui vous tueraient, vous êtes à la place réduit à une seule Blessure restante (1 PV avant la mort)."
    },
    {
      id: "adv-benediction-inari",
      name: "Bénédiction d'Inari (Inari's Blessing)",
      type: "Spirituel",
      cost: 3,
      impact: "inaris_blessing",
      prerequisite: "Aucun",
      desc: "La Fortune du Riz veille sur votre frugalité lors des privations et des jeûnes.",
      rule: "Lorsque vous jeûnez ou êtes privé de nourriture, vous ne souffrez pas de l'incapacité normale à récupérer vos points de Vide (les autres pénalités physiques demeurent)."
    },
    {
      id: "adv-don-interieur",
      name: "Don Intérieur (Inner Gift)",
      type: "Spirituel",
      cost: 7,
      impact: "inner_gift",
      prerequisite: "Choisir un don avec accord du MJ",
      desc: "Une harmonie mystérieuse échappant même aux shugenja se manifeste en vous par un don singulier.",
      rule: "Exemples officiels : Don Animal (perçoit l'humeur des bêtes, toutes amicales) ; Empathie (+1g1 en Courtisan pour déceler sentiments/désirs) ; Prémonition (difficile à surprendre et +1g0 à l'Initiative) ; Prophétie Mineure (rêves prémonitoires) ; Toucher des Esprits (Intuition ND 15 pour voir la dernière personne ayant touché un objet)."
    },
    {
      id: "adv-ishiken-do",
      name: "Ishiken-dō (Void Magic)",
      type: "Spirituel",
      cost: 8,
      impact: "ishiken_do",
      prerequisite: "Shugenja uniquement (6 pts pour le Clan du Phénix)",
      desc: "Don rarissime permettant d'entrer en communion directe avec le Vide vivant.",
      rule: "Seul cet Avantage permet à un shugenja d'apprendre et de lancer les sorts du Vide (Core p. 164)."
    },
    {
      id: "adv-lien-karmique",
      name: "Lien Karmique (Kharmic Tie)",
      type: "Spirituel",
      cost: 1,
      impact: "kharmic_tie",
      prerequisite: "1 à 5 pts (choisir 1 personne précise)",
      desc: "Votre destinée est intimement tressée à celle d'une autre âme à travers les vies.",
      rule: "Par point investi (max 5), 1 fois par session vous gagnez un bonus de +1g1 au total de tous vos jets d'attaque tant que vous combattez pour ou protégez la personne à laquelle vous êtes lié."
    },
    {
      id: "adv-chanceux",
      name: "Chance (Luck)",
      type: "Spirituel",
      cost: 3,
      impact: "luck",
      prerequisite: "3, 6 ou 9 pts (rang 1 à 3)",
      desc: "La Fortune sourit avec insolence à vos tentatives les plus audacieuses.",
      rule: "Un nombre de fois par session égal au rang acheté (1 par tranche de 3 pts), vous pouvez relancer immédiatement n'importe quel jet de dés et conserver le plus élevé des deux résultats."
    },
    {
      id: "adv-resistance-magie",
      name: "Résistance à la Magie (Magic Resistance)",
      type: "Spirituel",
      cost: 2,
      impact: "magic_resistance",
      prerequisite: "2, 4 ou 6 pts (rang 1 à 3)",
      desc: "Les kami élémentaires répugnent à se mêler à votre essence.",
      rule: "Pour chaque rang possédé dans cet Avantage, le ND du Jet d'Incantation de tout sort élémentaire vous prenant pour cible augmente de +3 (sans effet contre la Mahō, la magie gaijin ou non-humaine)."
    },
    {
      id: "adv-benediction-benten",
      name: "Bénédiction de Benten (Benten's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "bentens_blessing",
      prerequisite: "3 pts pour le Clan de la Grue (max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune de l'Amour Romantique vous accorde sa grâce.",
      rule: "Chaque fois que vous tentez de persuader quelqu'un, vous gagnez un bonus de +0g1 au total du Jet de Compétence Sociale (s'applique uniquement à la persuasion, jamais à la coercition)."
    },
    {
      id: "adv-benediction-bishamon",
      name: "Bénédiction de Bishamon (Bishamon's Blessing)",
      type: "Spirituel",
      cost: 5,
      impact: "bishamons_blessing",
      prerequisite: "4 pts pour le Crabe et le Lion (max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune de la Force bénit votre vigueur et la puissance de vos assauts.",
      rule: "Lorsque vous déclarez et réussissez 3 Augmentations à l'attaque pour la manœuvre Dégâts Accrus (les Augmentations Gratuites ne comptent pas), vous gagnez 1 Augmentation supplémentaire. De plus, +1g0 au total de tous vos Jets de Force (Trait Rolls)."
    },
    {
      id: "adv-benediction-daikoku",
      name: "Bénédiction de Daikoku (Daikoku's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "daikokus_blessing",
      prerequisite: "3 pts pour le Clan de la Mante (max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune de la Richesse favorise chacune de vos entreprises marchandes.",
      rule: "Vous gagnez un bonus de +1g1 au total de tous vos jets de Compétence Commerce."
    },
    {
      id: "adv-benediction-ebisu",
      name: "Bénédiction d'Ebisu (Ebisu's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "ebisus_blessing",
      prerequisite: "3 pts pour le Clan de la Licorne (max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune du Travail Honnête attire sur vous la sympathie du peuple.",
      rule: "Vous gagnez un bonus de +1g1 au total de tous vos Jets de Compétences Sociales avec les citoyens de Rokugan n'appartenant pas à la caste des samouraïs."
    },
    {
      id: "adv-benediction-fukurokujin",
      name: "Bénédiction de Fukurokujin (Fukurokujin's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "fukurokujins_blessing",
      prerequisite: "3 pts pour le Dragon et le Phénix (choisir 1 Connaissance ; max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune de la Sagesse éclaire vos études dans une discipline de savoir.",
      rule: "Choisissez une Compétence de Connaissance (Lore) : vous gagnez un bonus de +1g1 au total de tout jet effectué avec cette compétence."
    },
    {
      id: "adv-benediction-hotei",
      name: "Bénédiction d'Hotei (Hotei's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "hoteis_blessing",
      prerequisite: "Aucun (max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune du Contentement protège votre paix intérieure.",
      rule: "Chaque fois qu'un sort, Avantage ou Technique adverse vous ferait perdre des points de Vide, son instigateur doit d'abord vous vaincre dans un Jet Opposé de Vide (si l'effet demandait déjà un Jet Opposé, votre résultat augmente de +10)."
    },
    {
      id: "adv-benediction-jurojin",
      name: "Bénédiction de Jurojin (Jurojin's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "jurojins_blessing",
      prerequisite: "3 pts pour le Clan du Scorpion (max 1 Bénédiction des Sept Fortunes)",
      desc: "La Fortune de la Longévité fortifie votre organisme contre les miasmes et venins.",
      rule: "Chaque fois que vous effectuez un jet pour résister aux effets d'une maladie ou d'un poison, vous gagnez un bonus de +2g0 au total du jet."
    },
    {
      id: "adv-toucher-royaumes",
      name: "Touché par les Royaumes Spirituels (Touch of the Spirit Realms)",
      type: "Spirituel",
      cost: 5,
      impact: "touch_spirit_realms",
      prerequisite: "4 pts pour les Shugenja (Toshigoku 8 pts, Yomi 7 pts ; choisir 1 Royaume)",
      desc: "Un fragment d'un Royaume Spirituel imprègne votre âme.",
      rule: "Chikushudō (+1g1 Dressage) ; Gaki-dō (+5 PV soignés lorsque vous tuez un ennemi) ; Jigoku (réservé aux Souillés : +Souillure aux dégâts de mêlée et Traits/Compétences Physiques, doublé pour les Damnés) ; Maigo no Musha (+1 pt de Gloire bonus à chaque gain > 3 pts) ; Meido (+2g0 Jets Opposés contre manipulation sociale) ; Sakkaku (+1g1 Sincérité [Tromperie]) ; Tengoku (+2g0 en Terre pour résister à la Souillure) ; Toshigoku (8 pts : +1,5 m / +5' aux Actions de Déplacement pour se mettre à portée d'attaque) ; Yomi (7 pts : +1g0 sur 1 Compétence d'École) ; Yume-dō (4 h de repos suffisent pour récupérer le Vide)."
    },
    // Suppléments Spirituels
    {
      id: "adv-enfant-chikushudo",
      name: "Enfant de Chikushudō (Child of Chikushudo)",
      type: "Spirituel",
      cost: 7,
      impact: "child_of_chikushudo",
      prerequisite: "Enemies of the Empire, p. 244 (accord du MJ)",
      desc: "L'un de vos ancêtres était un esprit métamorphe du Royaume des Animaux.",
      rule: "Confère une Capacité Mineure de Métamorphe (Minor Shapeshifter Ability) au prix d'une pénalité permanente (Visage Troublant −2g1 Social, Bégaiement, Changement Douloureux −5 PV, ou Instincts Bestiaux)."
    },
    {
      id: "adv-medium",
      name: "Médium (Medium)",
      type: "Spirituel",
      cost: 4,
      impact: "medium",
      prerequisite: "Enemies of the Empire, p. 244",
      desc: "Votre âme maintient un lien profond avec les autres Royaumes Spirituels.",
      rule: "Par une concentration profonde, vous projetez votre esprit dans les Royaumes Spirituels ; les esprits rencontrés sous cette forme vous traitent comme l'un des leurs sauf si vous révélez votre nature étrangère."
    },
    {
      id: "adv-polyvalence-vide",
      name: "Polyvalence du Vide (Void Versatility)",
      type: "Spirituel",
      cost: 4,
      impact: "void_versatility",
      prerequisite: "The Great Clans, p. 198 • Shugenja ayant une Affinité pour le Vide",
      desc: "Vous puisez dans l'essence du Vide telle qu'elle réside au sein des autres éléments.",
      rule: "Choisissez un Anneau autre que le Vide : vous pouvez dépenser les emplacements de sorts de cet Anneau pour lancer vos sorts de Vide en plus de leur usage normal."
    },
    {
      id: "adv-ascendance-naga",
      name: "Ascendance Naga (Naga Ancestry)",
      type: "Spirituel",
      cost: 7,
      impact: "naga_ancestry",
      prerequisite: "Imperial Histories II, p. 288 (5 pts si marques physiques visibles avec −1g0/−2g0 Social)",
      desc: "Le sang d'un Naga coule obscurément dans vos veines et résonne avec l'Akasha.",
      rule: "Vous pouvez acheter les Avantages réservés aux Naga au coût normal et gagnez +1g0 à tous vos Jets de Compétences Sociales avec les Naga."
    },

    // -----------------------------------------------------------------------
    // AVANTAGES MATÉRIELS (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "adv-equipement-gaijin",
      name: "Équipement Gaijin (Gaijin Gear)",
      type: "Matériel",
      cost: 5,
      impact: "gaijin_gear",
      prerequisite: "4 pts pour les Clans de la Mante et de la Licorne",
      desc: "Vous possédez un objet ou une arme d'origine étrangère ramené d'au-delà des frontières de l'Empire.",
      rule: "Confère soit une arme étrangère (mécaniques d'une arme rokugani comparable, mais requiert sa propre Compétence d'Arme), soit un objet utilitaire rare (boussole, longue-vue, loupe, ciseaux, montre, etc.)."
    },
    {
      id: "adv-noblesse-terrienne",
      name: "Domaine (Gentry)",
      type: "Matériel",
      cost: 8,
      impact: "gentry",
      prerequisite: "Village 8 / Grand Village 15 / Exploitation Unique 18 / Bourg 20 / Cité 25 / Province 30 (coût partageable à plusieurs PJ)",
      desc: "Votre seigneur vous confie la défense, l'administration et la perception fiscale d'un fief d'importance.",
      rule: "Table Core p. 149 : Village (8 pts), Grand Village (15 pts), Exploitation Unique [brasserie de saké, fauconnerie...] (18 pts), Bourg (20 pts), Cité (25 pts), Province (30 pts)."
    },
    {
      id: "adv-heritage-ancestral",
      name: "Héritage (Inheritance)",
      type: "Matériel",
      cost: 5,
      impact: "inheritance",
      prerequisite: "Définir l'objet ancestral",
      desc: "Vos ancêtres vous ont légué un bien précieux dont vous honorez l'esprit chaque jour.",
      rule: "Vous commencez avec un objet supplémentaire en sus de votre équipement d'École ; tout Jet de Compétence non lié au combat (hors attaque et dégâts) effectué avec cet objet bénéficie d'un bonus de +1g1."
    },
    {
      id: "adv-heritage-faucon",
      name: "Héritage : Faucon Dressé (Trained Falcon)",
      type: "Matériel",
      cost: 2,
      impact: "trained_falcon",
      prerequisite: "Enemies of the Empire, p. 11 • 1 pt pour la Famille Toritaka",
      desc: "Vous possédez un faucon de chasse issu d'une lignée sélectionnée par les maîtres fauconniers de votre famille.",
      rule: "Ce faucon exceptionnel voit ses paliers de Blessures augmentés de +5 à chaque palier et lance 1 dé supplémentaire sur ses jets d'attaque."
    },
    {
      id: "adv-heritage-kobune",
      name: "Héritage : Kobune (Inheritance: Kobune)",
      type: "Matériel",
      cost: 10,
      impact: "inheritance_kobune",
      prerequisite: "Strongholds of the Empire, p. 25",
      desc: "Un parent capitaine de la Mante vous a légué son propre navire côtier.",
      rule: "Vous possédez un petit kobune manœuvrable par environ 6 hommes, reliant les îles Mante au continent en 2 semaines hors tempêtes et dégageant en moyenne 5 à 10 koku de profit par traversée (+2 Points de Devoir optionnels)."
    },
    {
      id: "adv-heritage-lame-asahina",
      name: "Héritage : Lame Asahina (Asahina Blade)",
      type: "Matériel",
      cost: 9,
      impact: "inheritance_asahina_blade",
      prerequisite: "Strongholds of the Empire, p. 76",
      desc: "Un wakizashi forgé par les prêtres-forgerons mythiques du Clan du Phénix pour célébrer l'alliance avec la Grue.",
      rule: "Wakizashi 3g2 : lorsque vous exécutez la manœuvre Garde en maniant cette lame, le bonus au ND d'Armure de votre protégé augmente en plus de votre Rang d'Honneur."
    },
    {
      id: "adv-heritage-armure-marteau",
      name: "Héritage : Armure du Marteau d'Eau (Water Hammer Armor)",
      type: "Matériel",
      cost: 7,
      impact: "inheritance_water_hammer_armor",
      prerequisite: "Strongholds of the Empire, p. 108 • Ashigaru 4 / Légère 7 / Lourde 12 / Équitation 15",
      desc: "Une armure forgée sur la grande écaille du Dragon de l'Eau à Suigeki Toshi.",
      rule: "Votre armure voit sa valeur de Réduction augmentée de +2 (coût selon type : Ashigaru 4 pts, Légère 7 pts, Lourde 12 pts, Équitation 15 pts)."
    },
    {
      id: "adv-arme-sacree",
      name: "Arme Sacrée (Sacred Weapon)",
      type: "Matériel",
      cost: 6,
      impact: "sacred_weapon",
      prerequisite: "Coût variable selon le Clan (Core p. 153 : 3, 5 ou 6 pts ; Hibou IH2 : 6 pts)",
      desc: "Une lame ou arme emblématique forgée par les maîtres forgerons de votre Clan.",
      rule: "Crabe : Lame Kaiu (6 pts, katana 3g3, incassable, −2 Réduction cible) • Grue : Lame Kakita (5 pts, katana 4g2, relance dégâts 1/duel) • Dragon : Lames Sœurs Jumelles (3 pts, daisho, +5 ND contre Désarmement) • Lion : Lame d'Honneur Akodo (6 pts, katana 4g2, Honneur +1 tant que portée) • Mante : Kama d'Orage (6 pts, paire 2g2, +1g0 attaque avec les deux) • Phénix : Frappe de l'Inquisiteur (6 pts, wakizashi 3g2 compté jade vs Souillés) • Scorpion : Lame Shosuro (5 pts, katana 4g2, +5 ND poisons sur lame) • Araignée : Lame d'Acier Noir (6 pts, katana 4g2, chaque dé explosé = Terre ND 15 ou +1 Souillure) • Licorne : Cimeterre Moto (6 pts, 3g3, +3 dégâts à cheval) • Impérial : Lame Hibou (IH2 p. 30, 6 pts, wakizashi 3g2 compté cristal)."
    },
    {
      id: "adv-serviteur",
      name: "Serviteur (Servant)",
      type: "Matériel",
      cost: 5,
      impact: "servant",
      prerequisite: "Max : 2 × Rang de Statut • −2 pts selon spécialité & Clan (+3 pts/rang de Compétence ou Spécialisation supp.)",
      desc: "Un serviteur compétent attaché à votre personne par votre famille ou vos moyens.",
      rule: "Traits à 2 et 1 Compétence à 3. Types et rabais de −2 pts : Artisan (Grue : Art 3) ; Valet/Attendant (Scorpion : Étiquette [Conversation] 3) ; Budoka (Lion : 1 Arme 3) ; Artisan/Forgeron Craftsman (Dragon : 1 Artisanat 3) ; Eta (Crabe : Connaissance : Anatomie 3) ; Palefrenier/Groom (Licorne : Dressage [Chevaux] 3) ; Marchand (Mante : Commerce [Évaluation] 3) ; Scribe (Phénix : 1 Connaissance 3) ; Sōhei (Araignée : Jiujutsu 3)."
    },
    {
      id: "adv-fortune-financiere",
      name: "Richesse (Wealthy)",
      type: "Matériel",
      cost: 1,
      impact: "wealthy",
      prerequisite: "1 pt/rang (−1 pt sur le coût total pour Grue, Licorne et Impériaux)",
      desc: "Votre lignée bénéficie d'une aisance financière et vous alloue un viatique accru.",
      rule: "Pour chaque point dépensé dans cet Avantage, vous gagnez 2 koku supplémentaires à ajouter à la dotation de départ de votre École."
    }
  ];

  // =========================================================================
  // 2. CATALOGUE OFFICIEL DES DÉSAVANTAGES (L5R 4E ÉDITION)
  // =========================================================================
  const DESAVANTAGES_LIST = [
    // -----------------------------------------------------------------------
    // DÉSAVANTAGES PHYSIQUES (CORE)
    // -----------------------------------------------------------------------
    {
      id: "dis-mauvaise-vue",
      name: "Mauvaise Vue / Borgne (Bad Eyesight)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "bad_eyesight",
      prerequisite: "Aucun",
      desc: "Votre vue est gravement affaiblie par une infirmité ou la perte d'un œil.",
      rule: "Vous subissez une pénalité de −1g1 à tous vos jets d'Attaque à distance et à tout jet basé sur le Trait Perception dépendant de la vue."
    },
    {
      id: "dis-mauvaise-sante",
      name: "Santé Défaillante (Bad Health)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "bad_health",
      prerequisite: "Aucun",
      desc: "Une affection médicale chronique fragilise continuellement votre constitution.",
      rule: "Votre Anneau de Terre est considéré comme inférieur de 1 rang pour déterminer vos Paliers de Blessures et pour résister aux maladies."
    },
    {
      id: "dis-aveugle",
      name: "Cécité Totale (Blind)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "blind",
      prerequisite: "Aucun",
      desc: "Vous ne percevez aucune forme ni couleur, tout au plus de vagues contrastes d'ombre et de lumière.",
      rule: "−3g3 à toutes les attaques à distance et −1g1 en mêlée ; ND d'Armure de base = Réflexes + 5 (+ armure) ; Eau −2 rangs pour le Mouvement ; toute Action Simple de Mouvement exige Athlétisme/Agilité ND 20 ou vous êtes Renversé (Prone) ; aucun jet de Perception sauf recours justifié à un sens non visuel."
    },
    {
      id: "dis-maladroit",
      name: "Maladroit (Clumsy)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "clumsy",
      prerequisite: "Aucun",
      desc: "Vos gestes manquent de coordination, même en dehors des situations de stress.",
      rule: "Vous subissez une pénalité de −1g0 à tous vos Jets d'Agilité et Jets de Compétences basés sur l'Agilité."
    },
    {
      id: "dis-aspect-troublant",
      name: "Aspect Troublant (Disturbing Countenance)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "disturbing_countenance",
      prerequisite: "Aucun",
      desc: "Quelque chose dans vos traits met instinctivement autrui mal à l'aise et sur ses gardes.",
      rule: "Le ND de tous vos Jets de Compétences Sociales est augmenté de +5."
    },
    {
      id: "dis-epilepsie",
      name: "Épilepsie (Epilepsy)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "epilepsy",
      prerequisite: "Vaut 5 pts pour le Clan de la Grue",
      desc: "Vous souffrez de crises convulsives déclenchées par une forte tension ou des lumières vives clignotantes.",
      rule: "En situation de stress intense ou d'éclairs lumineux (feux d'artifice), réussissez un jet de Volonté ND 15 sous peine de subir une crise incapacitante ; relancez Volonté ND 10 chaque minute pour y mettre fin."
    },
    {
      id: "dis-boiteux",
      name: "Boiteux (Lame)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "lame",
      prerequisite: "Aucun",
      desc: "L'une de vos jambes est atrophiée ou gravement estropiée.",
      rule: "Votre Anneau d'Eau est considéré comme étant égal à 1 pour déterminer vos Actions de Mouvement, et tout Jet d'Agilité ou de Compétence basée sur l'Agilité sollicitant les jambes subit +10 au ND."
    },
    {
      id: "dis-seuil-douleur-bas",
      name: "Sensible à la Douleur (Low Pain Threshold)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "low_pain_threshold",
      prerequisite: "Incompatible avec Force de la Terre",
      desc: "Votre tolérance à la douleur physique est nettement inférieure à la normale.",
      rule: "Les pénalités de ND infligées par chacun de vos Paliers de Blessures sont augmentées de +5."
    },
    {
      id: "dis-membre-manquant",
      name: "Membre Manquant (Missing Limb)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "missing_limb",
      prerequisite: "Préciser le membre (bras ou jambe)",
      desc: "Vous avez perdu un membre à la naissance ou suite à une blessure grave.",
      rule: "Vous subissez une pénalité de +10 au ND sur tous les jets impliquant l'usage du membre manquant (par exemple manier une arme à deux mains avec un seul bras)."
    },
    {
      id: "dis-blessure-permanente",
      name: "Blessure Permanente (Permanent Wound)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "permanent_wound",
      prerequisite: "Vaut 5 pts pour les Bushi",
      desc: "Une ancienne plaie ne guérit jamais véritablement, quels que soient les soins reçus.",
      rule: "Votre premier Palier de Blessures (Indemne / Healthy) est toujours considéré comme plein."
    },
    {
      id: "dis-petit",
      name: "Petit (Small)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "small",
      prerequisite: "Incompatible avec Grand",
      desc: "Votre taille et votre corpulence sont nettement en dessous de la moyenne impériale.",
      rule: "Votre Anneau d'Eau est considéré comme inférieur de 1 rang pour déterminer la distance de vos Actions de Mouvement, et vous subissez une pénalité de −1g0 à tous vos jets de dégâts en mêlée."
    },
    {
      id: "dis-faiblesse-trait",
      name: "Faiblesse (Weakness)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "weakness",
      prerequisite: "Choisir un Trait physique ou mental",
      desc: "Un aspect fondamental de votre corps ou de votre esprit accuse une faiblesse persistante.",
      rule: "Choisissez un Trait : ce Trait est traité comme étant inférieur de 1 rang pour tous les jets et tous les effets mécaniques basés sur ce Trait."
    },

    // -----------------------------------------------------------------------
    // DÉSAVANTAGES MENTAUX (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "dis-ascete",
      name: "Ascète (Ascetic)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "ascetic",
      prerequisite: "Vaut 3 pts pour le Dragon et les Moines",
      desc: "Vous méprisez les biens matériels, ne conservant que le strict nécessaire.",
      rule: "Votre équipement de départ n'inclut que les armes, armure, vêtements et outils de profession indispensables (aucun koku ni objet superflu). Vos gains de Gloire sont divisés par deux (et divisés par quatre pour un Moine)."
    },
    {
      id: "dis-impulsif",
      name: "Téméraire (Brash)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "brash",
      prerequisite: "Vaut 4 pts pour le Clan du Lion",
      desc: "Votre sang chaud vous pousse à répondre immédiatement aux insultes et menaces par l'acier.",
      rule: "Face à une menace ou une insulte, vous devez réussir un jet du Trait Volonté (en ajoutant votre Rang d'Honneur au total) contre ND 25, ou attaquer sur-le-champ."
    },
    {
      id: "dis-incapable-mentir",
      name: "Incapable de Mentir (Can't Lie)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "cant_lie",
      prerequisite: "Aucun",
      desc: "La sincérité absolue vous est si profondément inculquée que le mensonge vous est psychologiquement impossible.",
      rule: "Vous ne pouvez prononcer aucun mensonge ; de plus, si quelqu'un profère un mensonge en votre présence alors que vous savez qu'il est faux, vous devez réussir un jet de Volonté ND 20 ou le corriger aussitôt."
    },
    {
      id: "dis-obsession",
      name: "Compulsion (Compulsion)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "compulsion",
      prerequisite: "2, 3 ou 4 pts (ND 15, 20 ou 25)",
      desc: "Un rituel ou vice impérieux gouverne votre comportement dès que l'occasion s'y prête.",
      rule: "Jet de Volonté ND 15 (2 pts), 20 (3 pts) ou 25 (4 pts) pour résister à l'envie d'accomplir l'acte compulsif (saké, jeu, visite des temples, etc.)."
    },
    {
      id: "dis-consume-shourido",
      name: "Consumé (Consumed)",
      type: "Mental",
      cost: 4,
      gain: 4,
      gmOnly: true,
      impact: "consumed",
      prerequisite: "Vaut +1 pt pour l'Araignée • Contrôle 4, Détermination 6, Clairvoyance 4, Savoir 4, Perfection 5 (6 Grue), Force 5, Volonté 4",
      desc: "Vous avez emprunté la voie du Shouridō jusqu'à être entièrement consumé par l'un de ses sept préceptes.",
      rule: "Contrôle (4 pts : −1g1 Étiquette & Sincérité) ; Détermination (6 pts : interdiction de dépenser du Vide pour améliorer des jets de dés) ; Clairvoyance (4 pts : Volonté ND 20 en utilisant 1 Compétence d'École sous peine de rêverie) ; Savoir (4 pts : Volonté ND 25 devant tout sujet inconnu pour ne pas l'étudier) ; Perfection (5 pts, 6 Grue : 1 Augmentation forcée sans effet sur tout jet de Compétence ou d'Incantation) ; Force (5 pts : 1 Augmentation forcée sans effet pour Coup Précis, Feinte ou Désarmement, et −1g0 en Étiquette) ; Volonté (4 pts : −1g1 en Courtisan et Tentation)."
    },
    {
      id: "dis-esprit-contrariant",
      name: "Esprit Contrariant (Contrary)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "contrary",
      prerequisite: "Vaut 4 pts pour les Impériaux et les Courtisans",
      desc: "Votre nature rigide vous impose d'intervenir et d'imposer votre point de vue dans tout débat.",
      rule: "En situation tendue (débat, dispute, altercation), vous devez réussir un jet de Volonté (ND 5 à 25 selon le MJ) pour vous retenir d'intervenir ou d'agir."
    },
    {
      id: "dis-incroyant",
      name: "Incroyant (Disbeliever)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "disbeliever",
      prerequisite: "Incompatible avec la plupart des Shugenja et Moines pieux",
      desc: "Une révélation brutale a brisé votre foi envers les Fortunes ou le Tao de Shinsei.",
      rule: "Votre scepticisme affiché vous met mal à l'aise auprès des religieux : le ND de tous vos Jets de Compétences Sociales avec des shugenja ou des moines est augmenté de +5 (et sa révélation publique entraîne l'ostracisme et l'expulsion des ordres religieux)."
    },
    {
      id: "dis-doute",
      name: "Doute (Doubt)",
      type: "Mental",
      cost: 4,
      gain: 4,
      impact: "doubt",
      prerequisite: "Choisir 1 Compétence d'École",
      desc: "Un traumatisme ou échec cuisant vous fait douter de votre maîtrise dans une discipline fondamentale.",
      rule: "Choisissez une de vos Compétences d'École : chaque fois que vous utilisez cette compétence, vous devez déclarer une Augmentation supplémentaire sans effet bénéfique."
    },
    {
      id: "dis-obsede-but",
      name: "Obsédé par un Objectif (Driven)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "driven",
      prerequisite: "Définir l'objectif avec le MJ",
      desc: "Un but impérieux prime sur l'honneur, les proches et même le Bushidō.",
      rule: "Chaque fois que vous détournez sciemment vos pas ou négligez une occasion claire de progresser vers cet objectif, vos actions sont perturbées jusqu'à ce que vous vous y consacriez à nouveau (effets arbitrés par le MJ)."
    },
    {
      id: "dis-echec-bushido",
      name: "Échec du Bushidō (Failure of Bushido)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "failure_bushido",
      prerequisite: "Vaut +1 pt pour les Ninja • Compassion 3, Courage 4, Courtoisie 4, Devoir 6, Honnêteté 3, Honneur 3, Sincérité 4",
      desc: "Une des sept vertus du Bushidō vous demeure totalement étrangère.",
      rule: "Compassion (3 pts : dépenser 1 Vide avant d'agir pour aider un inférieur) ; Courage (4 pts : +5 au ND face à ennemi de Gloire/Statut supérieur ou de l'Outremonde) ; Courtoisie (4 pts : +1 Augmentation forcée sans effet pour s'excuser/éviter d'offenser) ; Devoir (6 pts : impossible de dépenser du Vide pour annuler des Blessures) ; Honnêteté (3 pts : impossible de dépenser du Vide sur Sincérité [Honnêteté]) ; Honneur (3 pts : impossible d'ajouter l'Honneur pour résister à Intimidation/Tentation) ; Sincérité (4 pts : +1 Augmentation forcée sans effet sur Sincérité pour convaincre)."
    },
    {
      id: "dis-fascination",
      name: "Fascination (Fascination)",
      type: "Mental",
      cost: 1,
      gain: 1,
      impact: "fascination",
      prerequisite: "Choisir 1 sujet précis",
      desc: "Un sujet vous obsède au point de vous exposer aux pires imprudences pour l'étudier.",
      rule: "Vous êtes disposé à agir sans prudence et parfois contre l'honneur pour assouvir votre fascination pour le thème choisi."
    },
    {
      id: "dis-esprit-faible",
      name: "Esprit Fragile (Frail Mind)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "frail_mind",
      prerequisite: "Aucun",
      desc: "Vous peinez à maintenir votre concentration face à un esprit déterminé.",
      rule: "Chaque fois que vous effectuez un Jet Opposé utilisant le Trait Volonté, votre adversaire gagne un bonus de +2g0 à son jet."
    },
    {
      id: "dis-cupide",
      name: "Cupide (Greedy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "greedy",
      prerequisite: "Vaut 4 pts pour le Clan de la Mante",
      desc: "L'appât du gain matériel gouverne vos décisions malgré les préceptes de la caste.",
      rule: "Tout adversaire utilisant Tentation (Corruption / Bribery) contre vous gagne un bonus de +1g1 au total de son jet."
    },
    {
      id: "dis-naif",
      name: "Naïf (Gullible)",
      type: "Mental",
      cost: 4,
      gain: 4,
      impact: "gullible",
      prerequisite: "Incompatible avec Pensée Claire",
      desc: "Vous accordez trop aisément votre confiance et peinez à déceler la fourberie.",
      rule: "Tout adversaire utilisant Sincérité (Tromperie) contre vous gagne un bonus de +1g1 au total de son jet."
    },
    {
      id: "dis-idealiste",
      name: "Idéaliste (Idealistic)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "idealistic",
      prerequisite: "Vaut 3 pts pour le Clan du Lion",
      desc: "Votre vision rigide et impossiblement pure du Bushidō rend chaque entorse cruelle à vos yeux.",
      rule: "Chaque fois que vous subissez une perte d'Honneur, celle-ci est augmentée de 1 point d'Honneur supplémentaire."
    },
    {
      id: "dis-insensible",
      name: "Insensible (Insensitive)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "insensitive",
      prerequisite: "Vaut 3 pts pour le Clan du Scorpion",
      desc: "Le sort d'autrui vous indiffère profondément, à moins que votre intérêt immédiat n'y soit engagé.",
      rule: "À l'exception des personnes contribuant directement à votre propre bien-être (tel votre seigneur), vous devez dépenser 1 point de Vide pour vous mettre en péril pour quelqu'un d'autre sans profit personnel immédiat."
    },
    {
      id: "dis-jalousie",
      name: "Jalousie (Jealousy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "jealousy",
      prerequisite: "Désigner 1 PJ ou PNJ majeur",
      desc: "Vous êtes rongé par l'envie obsessionnelle de surpasser une personne précise.",
      rule: "Vous faites tout pour surclasser votre rival désigné ; une fois surpassé, votre jalousie se reporte aussitôt sur une nouvelle cible."
    },
    {
      id: "dis-amour-perdu",
      name: "Amour Perdu (Lost Love)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "lost_love",
      prerequisite: "Aucun",
      desc: "Vous avez connu un amour profond désormais perdu et sombrez dans la mélancolie lorsqu'il est ravivé.",
      rule: "Lorsqu'un événement vous rappelle cet amour perdu, tous vos ND augmentent de +5 jusqu'à ce que vous dépensiez 1 point de Vide pour retrouver votre concentration (max 2 fois/jour, à 1 heure d'intervalle minimum)."
    },
    {
      id: "dis-obtus",
      name: "Esprit Obtus (Obtuse)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "obtuse",
      prerequisite: "Vaut 4 pts pour le Clan du Crabe et les Bushi",
      desc: "Les raffinements de la poésie, des arts nobles et de l'étiquette vous échappent complètement.",
      rule: "Le coût en points d'Expérience (XP) pour augmenter toute Compétence Noble (High Skill), à l'exception d'Enquête (Investigation) et de Médecine, est doublé."
    },
    {
      id: "dis-arrogant",
      name: "Excès de Confiance (Overconfident)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "overconfident",
      prerequisite: "Vaut 4 pts pour le Lion et la Mante",
      desc: "Votre estime démesurée de vos prouesses vous empêche de mesurer le péril.",
      rule: "Lorsque vous êtes en infériorité numérique ou face à un adversaire manifestement supérieur (à la cour ou au combat), vous devez réussir un jet de Perception ND 20 pour en prendre conscience et vous retirer au lieu d'engager."
    },
    {
      id: "dis-phobie",
      name: "Phobie (Phobia)",
      type: "Mental",
      cost: 1,
      gain: 1,
      impact: "phobia",
      prerequisite: "1, 2 ou 3 pts (définir l'objet de la phobie)",
      desc: "Une terreur irrationnelle vous saisit en présence d'un élément précis.",
      rule: "En présence de l'objet de votre phobie, tous vos ND sont augmentés de +5 par point investi dans ce Désavantage (de +5 à +15)."
    },
    {
      id: "dis-coeur-tendre",
      name: "Cœur Tendre (Soft-Hearted)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "soft_hearted",
      prerequisite: "Vaut 3 pts pour le Clan du Phénix (davantage si étendu aux non-humains)",
      desc: "La vie humaine vous est si précieuse que vous peinez à accomplir le devoir létal d'un samouraï.",
      rule: "Devant la possibilité de tuer un être humain, réussissez un jet de Volonté ND 20 ou vous en êtes incapable. Si vous tuez malgré tout, tous vos ND augmentent de +10 pendant un jour par culpabilité (non cumulatif)."
    },
    {
      id: "dis-amour-veritable",
      name: "Amour Véritable (True Love)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "true_love",
      prerequisite: "Définir l'être aimé",
      desc: "Vous êtes uni par un amour sincère, source constante de conflits avec votre devoir de samouraï.",
      rule: "Chaque fois que vous devez choisir entre votre devoir et votre amour, vous devez dépenser 1 point de Vide pour pouvoir faire passer votre devoir avant la personne aimée."
    },
    // Suppléments Mentaux
    {
      id: "dis-agent-dormant",
      name: "Agent Dormant (Sleeper Agent)",
      type: "Mental",
      cost: 5,
      gain: 5,
      gmOnly: true,
      impact: "sleeper_agent",
      prerequisite: "Enemies of the Empire, p. 50 (8 pts si mécanisme d'autodestruction en cas d'échec)",
      desc: "À votre insu, les Kolat vous ont conditionné par un mot déclencheur implanté dans votre esprit.",
      rule: "Quiconque prononce ce mot suivi d'un ordre de 5 mots ou moins vous contraint à l'exécuter quel que soit votre désir personnel (8 pts si le conditionnement vous pousse au suicide en cas d'échec)."
    },
    {
      id: "dis-anachronisme",
      name: "Anachronisme (Anachronism)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "anachronism",
      prerequisite: "Imperial Histories I, p. 241 • Réservé aux esprits revenus par la Porte de l'Oubli",
      desc: "Revenu d'une époque révolue, les us et conventions contemporaines vous échappent.",
      rule: "Le ND de tous vos Jets d'Art (Artisan), d'Artisanat (Craft) et de Compétences Sociales est augmenté de +5."
    },

    // -----------------------------------------------------------------------
    // DÉSAVANTAGES SOCIAUX (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "dis-antisocial",
      name: "Antisocial (Antisocial)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "antisocial",
      prerequisite: "2 pts (−1g0) ou 4 pts (−1g1) ; vaut +1 pt pour le Clan du Crabe",
      desc: "La compagnie d'autrui vous met si mal à l'aise que votre attitude frôle la grossièreté.",
      rule: "Vous subissez une pénalité de −1g0 (2 pts) ou de −1g1 (4 pts) à tous vos Jets de Compétences Sociales."
    },
    {
      id: "dis-fiancailles-ameres",
      name: "Fiançailles Amères (Bitter Betrothal)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "bitter_betrothal",
      prerequisite: "Vaut 3 pts pour les Familles Impériales",
      desc: "Votre conjoint ou fiancé vous méprise cordialement tout en maintenant les apparences de cour.",
      rule: "Votre antipathie mutuelle complique sévèrement la gestion domestique, familiale ou bureaucratique."
    },
    {
      id: "dis-chantage-subi",
      name: "Victime de Chantage (Blackmailed)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "blackmailed",
      prerequisite: "Valeur égale à votre propre Rang de Statut",
      desc: "Un individu détient la preuve d'une faute grave commise dans un moment de faiblesse.",
      rule: "Votre maître-chanteur vous contacte périodiquement pour exiger services et compromissions sous menace de ruiner votre honneur."
    },
    {
      id: "dis-mouton-noir",
      name: "Mouton Noir (Black Sheep)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "black_sheep",
      prerequisite: "Aucun",
      desc: "Votre famille est si dégoûtée de vos actes que vous n'êtes plus toléré sous votre toit.",
      rule: "Vous ne pouvez entretenir de relations normales avec aucun membre de votre famille sans l'Avantage Alliés, et ne pouvez progresser dans une École familiale sans trouver à grand-peine un sensei disposé à vous instruire."
    },
    {
      id: "dis-banni-temple",
      name: "Rejeté par les Moines (Cast Out)",
      type: "Social",
      cost: 1,
      gain: 1,
      impact: "cast_out",
      prerequisite: "1 pt (un temple isolé) ou 3 pts (une secte majeure de la Confrérie)",
      desc: "Vous ou votre lignée avez été solennellement dénoncé par un ordre monastique.",
      rule: "Les moines du temple ou de la secte concernée traitent votre Rang de Gloire comme s'il s'agissait d'Infamie (Infamy)."
    },
    {
      id: "dis-secret-sombre",
      name: "Sombre Secret (Dark Secret)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "dark_secret",
      prerequisite: "Vaut 5 pts pour les Ninja",
      desc: "Vous connaissez ou avez commis un acte dont la révélation mènerait à votre perte.",
      rule: "Si ce secret est découvert (lignée honteuse, société secrète, trahison ou crime impardonnable), vous risquez le seppuku forcé voire l'exécution."
    },
    {
      id: "dis-charge-famille",
      name: "Personne à Charge (Dependant)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "dependant",
      prerequisite: "Variable (2-3 pts conjoint peu autonome ; 5-6 pts jeune enfant ou aïeul entièrement dépendant)",
      desc: "Une personne incapable d'assurer sa propre sécurité dépend entièrement de votre vigilance.",
      rule: "Sa vulnérabilité pèse constamment sur vos décisions, vos déplacements et votre disponibilité de service."
    },
    {
      id: "dis-deshonore",
      name: "Déshonoré (Dishonored)",
      type: "Social",
      cost: 5,
      gain: 5,
      impact: "dishonored",
      prerequisite: "Aucun",
      desc: "Votre nom a été rayé des registres familiaux, mais votre Clan vous accorde de périr au combat pour racheter votre souillure.",
      rule: "Votre Rang de Statut est fixé à 1.0 et vous ne pouvez jamais gagner de Statut tant que vous possédez ce Désavantage (tradition des Cherche-Mort Lion / Deathseekers)."
    },
    {
      id: "dis-retraite-forcee",
      name: "Retraite Forcée (Forced Retirement)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "forced_retirement",
      prerequisite: "Vaut 5 pts pour les Moines",
      desc: "Une disgrâce ou pression politique vous contraint à prendre l'habit monastique avant l'heure.",
      rule: "Vous ne progressez plus dans votre École actuelle ; au prochain Rang de Maîtrise, vous devez entrer dans une École de Moine non alignée sans acheter Écoles Multiples. Vous n'êtes plus considéré comme membre de votre Clan."
    },
    {
      id: "dis-nom-gaijin",
      name: "Nom Gaijin (Gaijin Name)",
      type: "Social",
      cost: 1,
      gain: 1,
      impact: "gaijin_name",
      prerequisite: "Vaut 2 pts pour le Clan de la Licorne",
      desc: "Votre nom porte une sonorité manifestement étrangère qui suscite la méfiance.",
      rule: "Vos dés ne peuvent exploser qu'une seule fois au maximum sur vos Jets de Compétences Sociales (chaque dé ne peut dépasser 20)."
    },
    {
      id: "dis-otage-politique",
      name: "Otage (Hostage)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "hostage",
      prerequisite: "Aucun",
      desc: "Vous êtes envoyé comme « invité » garanti sur les terres d'un autre Clan pour sceller un traité.",
      rule: "Traité avec égard, vous ne pouvez toutefois quitter la province sans escorte et votre vie est immédiatement confisquée si votre Clan rompt la trêve."
    },
    {
      id: "dis-infame",
      name: "Infâme (Infamous)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "infamous",
      prerequisite: "Aucun",
      desc: "Vous êtes tristement célèbre non pour votre bravoure, mais pour votre cruauté ou vos méfaits.",
      rule: "Votre Rang de Gloire de départ est remplacé par un Rang d'Infamie (Infamy), modifiant négativement la réaction de quiconque vous reconnaît."
    },
    {
      id: "dis-libidineux",
      name: "Luxure (Lechery)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "lechery",
      prerequisite: "Aucun",
      desc: "Les plaisirs charnels exercent sur vous une fascination dangereusement facile à exploiter.",
      rule: "Tout adversaire utilisant Tentation (Séduction) contre vous gagne un bonus de +1g1 au total de son jet."
    },
    {
      id: "dis-dette-honneur",
      name: "Obligation (Obligation)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "obligation",
      prerequisite: "3 pts (dette notable) ou 6 pts (obligation majeure pouvant ruiner votre famille)",
      desc: "Vous êtes redevable envers quelqu'un d'une dette impérieuse ou d'un devoir inévitable.",
      rule: "Lorsque cette dette est appelée, rien d'autre ne compte : vous devez l'honorer même au prix de votre ruine personnelle ou familiale."
    },
    {
      id: "dis-colporteur-rumeurs",
      name: "Colporteur de Rumeurs (Rumormonger)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "rumormonger",
      prerequisite: "Vaut 5 pts pour les Courtisans",
      desc: "Vous êtes incapable de résister au plaisir de colporter le moindre ragot.",
      rule: "Lorsque l'occasion de colporter une rumeur se présente, vous devez réussir un jet de Volonté contre ND égal à 5 × le Rang de Gloire de la personnalité la plus glorieuse concernée pour vous taire."
    },
    {
      id: "dis-statut-social-dechu",
      name: "Désavantage Social (Social Disadvantage)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "social_disadvantage",
      prerequisite: "Aucun",
      desc: "Votre position au sein de l'Ordre Céleste est inférieure à celle d'un samouraï ordinaire (rônin, etc.).",
      rule: "Vous débutez la partie avec un Rang de Statut égal à 0.0."
    },
    {
      id: "dis-ennemi-jure",
      name: "Ennemi Juré (Sworn Enemy)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "sworn_enemy",
      prerequisite: "3 pts (Rang de Maîtrise égal) • +1 pt/Rang supérieur • +2 pts pour Némésis karmique",
      desc: "Un rival acharné ne reculera devant rien pour provoquer votre défaite ou votre mort.",
      rule: "Ennemi récurrent introduit par le MJ. Si l'option Némésis karmique (+2 pts) est prise, vous ne pouvez jamais dépenser de points de Vide dans un Jet Opposé contre lui ni pour résister à une action dont il est l'auteur."
    },
    // Suppléments Sociaux
    {
      id: "dis-membre-chrysantheme",
      name: "Membre de la Cour du Chrysanthème (Member of the Chrysanthemum Court)",
      type: "Social",
      cost: 5,
      gain: 5,
      impact: "chrysanthemum_court",
      prerequisite: "Imperial Histories II, p. 127 (3 pts sous un seigneur cruel hors Chrysanthème d'Acier)",
      desc: "Vous siégez à la Cour Impériale sous un souverain capricieux dont le moindre déplaisir est fatal.",
      rule: "Tout Jet Social raté à la Cour par plus de 10 points fait perdre définitivement 5 Points de Statut (+1 par Augmentation déclarée). À 0 Statut, l'Empereur ordonne votre mort."
    },
    {
      id: "dis-stigmate-cite",
      name: "Stigmate d'une Cité Notable (Stronghold Stigma)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "stronghold_stigma",
      prerequisite: "Strongholds of the Empire (2 à 4 pts selon la cité)",
      desc: "Votre origine ou affectation dans une cité controversée pèse sur votre réputation.",
      rule: "Vagues Brisées (2 pts : −1g0 Social vs Phénix, −1 pt sur Ennemi Juré Phénix) ; Eaux Claires (2 pts : Gloire −1 parmi le Crabe, perd tous les koku ou 1 arme de départ) ; Orée Sombre (2 pts : défié en duel toutes les 2 sessions) ; Nikesake (4 pts : −1g0 aux Armes hors Compétences d'École) ; Marteau d'Eau (2 pts : −1g0 Social hors Dragon) ; Zakyo Toshi (3 pts : Volonté ND 20 pour résister au jeu) ; Cité Impériale / Épreuves Impériales (Sworn Enemy + 1 pt, ennemi tournant) ; Survivant Cité en Ruines (Matériel 4 pts : 0 koku et 2 objets en moins)."
    },
    {
      id: "dis-prime",
      name: "Mise à Prix (Bounty)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "bounty",
      prerequisite: "Strongholds of the Empire, p. 169 • 2, 4 ou 6 pts selon la gravité",
      desc: "Votre tête est mise à prix pour un crime réel ou présumé.",
      rule: "Délit mineur (2 pts : prime 1-5 koku, Connaissance : Droit / Perception ND 25 pour vous reconnaître) ; crime sérieux (4 pts : prime 10-15 koku, ND 15 pour les magistrats du Clan lésé) ; crime odieux (6 pts : prime ≥ 20 koku, tous les Grands Clans et Chasseurs Tsuruchi alertés)."
    },
    {
      id: "dis-errant",
      name: "Égaré / Voyageur Désorienté (Wanderer)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "wanderer",
      prerequisite: "Strongholds of the Empire, p. 169",
      desc: "Vous vous perdez inévitablement même avec une carte détaillée entre les mains.",
      rule: "Sans guide, vous ne parvenez pratiquement jamais à bon port (même dans une cité connue) et subissez une pénalité de −15 sur tous vos jets utilisant la spécialisation Navigation."
    },

    // -----------------------------------------------------------------------
    // DÉSAVANTAGES SPIRITUELS (CORE + SUPPLÉMENTS)
    // -----------------------------------------------------------------------
    {
      id: "dis-mauvaise-fortune",
      name: "Mauvaise Fortune (Bad Fortune)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "bad_fortune",
      prerequisite: "Définir la calamité avec le MJ",
      desc: "Le karma déverse sur votre destinée une infortune tenace et particulière.",
      rule: "Variantes officielles Core p. 156 : Amour Secret (un admirateur sabote vos unions) ; Défiguration (marque de naissance augurant le malheur) ; Œil Maléfique (regard fuyant d'autrui) ; Allergie (urticaire sévère à une matière commune) ; Malchance Latente (échec critique garanti sur 1 jet capital décidé par le MJ) ; Ennemi Inconnu (assassin anonyme d'un autre Clan)."
    },
    {
      id: "dis-malediction-lignee",
      name: "Malédiction de Lignée : Moto ou Yogo (Bloodline Curse)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "bloodline_curse",
      prerequisite: "4 pts • Réservé à la Licorne (Moto) ou au Scorpion (Yogo)",
      desc: "Vous portez la malédiction héréditaire attachée au sang de votre famille (Core p. 156).",
      rule: "Malédiction des Moto (Licorne, 4 pts : −1g0 à tout jet pour résister à la Souillure de l'Outremonde) ; Malédiction des Yogo (Scorpion ou lignée Yogo, 4 pts : condamné par Fu Leng lui-même à trahir la personne que vous aimez le plus au monde)."
    },
    {
      id: "dis-maudit-par-royaume",
      name: "Maudit par un Royaume Spirituel (Cursed by the Realm)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "cursed_by_realm",
      prerequisite: "Vaut 5 pts pour les Shugenja (choisir 1 Royaume)",
      desc: "L'essence d'un Royaume Spirituel vous a désigné comme son ennemi.",
      rule: "Chikushudō (−1g1 Dressage) ; Gaki-dō (cible prioritaire des morts affamés) ; Jigoku (−1g1 pour résister à la Souillure) ; Maigo no Musha (−1g1 contre tout esprit) ; Meido (trance apathique au repos : −1g0 Perception) ; Sakkaku (farce cruelle mensuelle d'un esprit) ; Tengoku (+10 aux ND dans tout temple dédié aux Cieux) ; Toshigoku (Volonté ND 15 ou attaque immédiate d'un ennemi blessé) ; Yume-dō (10 heures de sommeil requises pour récupérer le Vide au lieu de 8)."
    },
    {
      id: "dis-destin-sombre",
      name: "Destin Funeste (Dark Fate)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "dark_fate",
      prerequisite: "Accord du MJ",
      desc: "Avant votre mort, vous causerez involontairement une immense tragédie ou trahison dans le monde.",
      rule: "Le destin vous préserve pour accomplir cette chute : 1 fois par session, si vous deviez subir des Blessures mortelles, vous êtes à la place réduit à une seule Blessure restante (1 PV avant la mort)."
    },
    {
      id: "dis-desequilibre-elementaire",
      name: "Déséquilibre Élémentaire (Elemental Imbalance)",
      type: "Spirituel",
      cost: 2,
      gain: 2,
      impact: "elemental_imbalance",
      prerequisite: "Shugenja uniquement • 2 pts/rang sur un Élément sans Déficience",
      desc: "Les kami d'un Élément vous favorisent tant que leurs voix submergent parfois votre volonté.",
      rule: "Chaque fois que vous lancez un sort de cet Élément, réussissez un jet de Volonté contre ND 15 + 5 par rang dans ce Désavantage sous peine d'incident désastreux arbitré par le MJ."
    },
    {
      id: "dis-hante-ancetre",
      name: "Hanté (Haunted)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "haunted",
      prerequisite: "Aucun",
      desc: "Un esprit ancestral s'attache à vos pas, prodiguant conseils impérieux et exigences.",
      rule: "Tant que vous négligez de lui obéir et qu'il reste courroucé, 1 fois par session un de vos jets de dés choisi par le MJ subit une pénalité de −1g1."
    },
    {
      id: "dis-malediction-lune",
      name: "Malédiction de Seigneur Lune (Lord Moon's Curse)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "lord_moons_curse",
      prerequisite: "3, 5 ou 7 pts (rang 1 à 3)",
      desc: "La folie d'Onnotangu habite votre âme durant les nuits de pleine lune.",
      rule: "Au crépuscule de chaque pleine lune, vous gagnez 1 point de Vide temporaire (perdu à l'aube), mais devez réussir un jet de Volonté ND 15 (+5 par niveau au-delà du 1er) au lever de la lune sous peine de perdre le contrôle de votre personnage jusqu'au matin."
    },
    {
      id: "dis-momoku",
      name: "Momoku",
      type: "Spirituel",
      cost: 8,
      gain: 8,
      impact: "momoku",
      prerequisite: "Incompatible avec Shugenja ou Moine",
      desc: "Votre âme souffre d'un déséquilibre fondamental la rendant étrangère aux usages ordinaires du Vide.",
      rule: "Vous possédez des points de Vide, mais vous ne pouvez dépenser du Vide que pour les Avantages et Techniques qui l'exigent explicitement : les utilisations universelles du Vide (+1g1, annuler des Blessures, +10 ND d'Armure, etc.) vous sont inaccessibles."
    },
    {
      id: "dis-malediction-fortune",
      name: "Malédiction des Sept Fortunes (Seven Fortunes' Curse)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "seven_fortunes_curse",
      prerequisite: "3 pts (ou 6 pts pour Hotei)",
      desc: "L'une des Sept Fortunes s'est détournée de vous avec colère.",
      rule: "Benten (+10 ND Étiquette) ; Bishamon (Force −1 rang pour calculer les dégâts des armes) ; Daikoku (−1g1 Commerce et −1 koku au départ) ; Ebisu (−1g1 Social avec les non-samouraïs) ; Fukurokujin (+5 ND Connaissances) ; Hotei (6 pts : toute Technique/Avantage exigeant 1 Vide en requiert 2) ; Jurojin (−2g0 contre poisons et maladies)."
    },
    {
      id: "dis-souillure-outremonde",
      name: "Souillure de l'Outremonde (Shadowlands Taint)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      gmOnly: true,
      impact: "shadowlands_taint",
      prerequisite: "Aucun",
      desc: "Vous portez dès la création la trace spirituelle de Jigoku.",
      rule: "Vous débutez la partie avec 0,5 Rang de Souillure de l'Outremonde (trop faible pour être détecté à ce stade ; selon votre choix, vous ignorez peut-être même en être affecté)."
    },
    {
      id: "dis-touche-vide",
      name: "Touché par le Vide (Touch of the Void)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "touch_of_the_void",
      prerequisite: "Vaut 4 pts pour le Clan du Phénix",
      desc: "La puissance brute du Vide vous traverse brutalement lorsque vous y puisez.",
      rule: "Lorsque vous dépensez 1 point de Vide pour améliorer un jet, vous gagnez +2g1 au lieu de +1g1, mais devez aussitôt réussir un jet de Volonté ND 30 ou être Étourdi/Hébété (Dazed) pendant 1 Round."
    },
    {
      id: "dis-malchanceux",
      name: "Malchance (Unlucky)",
      type: "Spirituel",
      cost: 2,
      gain: 2,
      impact: "unlucky",
      prerequisite: "2 pts par rang acheté",
      desc: "Le sort s'acharne contre vos entreprises décisives.",
      rule: "Un nombre de fois par session égal à votre rang dans ce Désavantage, le MJ peut vous contraindre à relancer immédiatement un jet de dés et à conserver le second résultat dans tous les cas."
    },
    {
      id: "dis-courroux-kami",
      name: "Courroux des Kami (Wrath of the Kami)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "wrath_of_the_kami",
      prerequisite: "Vaut 4 pts pour les Shugenja (choisir 1 Élément)",
      desc: "Les kami d'un Élément particulier vous vouent une hostilité tenace.",
      rule: "Tout sort de l'Élément choisi lancé contre vous confère une Augmentation Gratuite au Jet d'Incantation du lanceur."
    },
    // Suppléments Spirituels
    {
      id: "dis-folie-illuminee",
      name: "Folie Illuminée (Enlightened Madness)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "enlightened_madness",
      prerequisite: "The Great Clans, p. 102 • 4 pts (Volonté ND 20) ou 6 pts (Volonté ND 30)",
      desc: "L'éclair de l'illumination a altéré votre raison, vous poussant vers des actes étranges ou violents.",
      rule: "Choisissez 1 Anneau, 1 Compétence ou 1 Tatouage : à chaque utilisation (ou jet d'Anneau/Incantation lié), réussissez Volonté ND 20 (4 pts) ou ND 30 (6 pts) sous peine de passer sous le contrôle du MJ pendant 8 heures."
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
