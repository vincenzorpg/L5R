/**
 * data/gm-scenarios-data.js
 * Base de données structurée des scénarios prêts-à-jouer pour l'Écran du MJ.
 * Contient l'intégralité du Scénario II : Les Jouets de Cendre et de Sang.
 */

(function (globalScope) {
  'use strict';

  const GM_SCENARIOS_DATA = [
    {
      id: 'scenario-2-jouets',
      num: 'II',
      title: 'Les Jouets de Cendre et de Sang',
      campaign: "Campagne : L'Ombre et le Sang (La Traque du Cœur de Iuchiban)",
      tags: ['Enquête', 'Dilemmes de Bushido', 'Magie Maho', 'Incursion Mortelle en Outremonde'],
      pcsLine: 'Pour Okado, Hiro-Hito, Ryujin, Akira & Yuriko',
      startPlace: 'Yanagi Mura (Village du Saule Pleureur)',
      duration: '2 à 3 séances (4 à 5 jours en jeu)',
      epigraph: '« Un mensonge enveloppé de soie et de compassion tue plus sûrement qu\'une lame empoisonnée. Lorsque vous franchirez la frontière où les kami se taisent, souvenez-vous que le sang versé en Outremonde n\'appartient plus aux ancêtres. » — Parchemin anonyme retrouvé dans les cendres de Yanagi Mura',
      briefing: [
        "Ce scénario reprend immédiatement après la victoire des PJ contre le faux moine Chuda Bunzo et son garde du corps Égaré Daigotsu Kuro sous les racines du grand saule de Yanagi Mura. Les personnages détiennent deux indices décisifs arrachés à Bunzo : un netsuke d'ivoire sculpté figurant un serpent enroulé autour d'un lotus (emblème secret des survivants du Clan du Serpent) et une missive codée mentionnant un « marchand aux jouets de bois » parti vers les Montagnes du Crépuscule pour déchiffrer le journal d'Asahina Yajinden.",
        "Sous la surveillance implacable de la Kuroiban (la Garde Noire du Clan du Scorpion dirigée par Soshi Takasho), les PJ doivent remonter la piste macabre de cet homme — Chuda Tenkazu, voyageant sous l'identité du colporteur Gorobei Tenkazu — à travers les provinces frontalières du Scorpion, survivre aux marais hantés de Taiyo One Toshi, traverser les pics maudits des Montagnes du Crépuscule et franchir la frontière de l'Outremonde pour livrer un combat désespéré au cœur d'une ancienne fonderie de Minerai de Sang."
      ],
      structure: [
        {
          act: 'Acte I : La Piste des Jouets Maudits (De Yanagi Mura à Taiyo One Toshi)',
          stakes: "Déchiffrer les indices de Bunzo, subir la pression de la Kuroiban, enquêter sur des artisans assassinés et des enfants empoisonnés par des jouets maudits.",
          challenges: "Enquête & Dilemme Moral : Tenkazu se fait passer pour une victime innocente attaquée par le rônin pur Chuda Reikado."
        },
        {
          act: 'Acte II : La Peau du Moine (Les Marais de Taiyo One Toshi)',
          stakes: "Poursuivre Tenkazu dans les tourbières putrides et affronter son alliée : Shikageko, une Sorcière des Marais revêtant la peau du moine Murai.",
          challenges: "Horreur Psychologique & Combat Tactique : Exploiter le dédoublement de personnalité de Murai pour briser le monstre."
        },
        {
          act: 'Acte III : Les Terres du Sanglier (Les Montagnes du Crépuscule)',
          stakes: "Gravissement des pics ravagés par la forge de l'Enclume du Désespoir et rencontre avec la tribu Nezumi de la Patte Crochue.",
          challenges: "Diplomatie Culturelle & Orgueil : S'allier aux Nezumi sans sourire (signe d'agression) et avaler sa fierté de samouraï."
        },
        {
          act: 'Acte IV : Là où les Kami Hurlent (Outremonde — Fonderie de Sang)',
          stakes: "Franchir la Gueule du Sanglier vers l'Outremonde et interrompre le rituel de sang de Tenkazu avant qu'il ne révèle le Cœur de Iuchiban.",
          challenges: "Survie Mortelle & Climax : Affronter Tenkazu (armé de Jadoku), un Guerrier Tsuno et la tentation de la Maho."
        }
      ],
      psychIntro: "À mesure que le groupe progresse vers le sud-ouest, le battement sourd du Cœur de Iuchiban (« Boum... Boum... ») s'intensifie. Chaque nuit passée sans purification exige un jet de Volonté + Méditation (ND 20 sur les terres de l'Empire, ND 25 en Outremonde) sous peine de perdre 1 Point de Vide temporaire et de subir des visions morbides.",
      pcTracking: [
        {
          name: 'Okado (Bushi de 1ère ligne)',
          hallucination: "Rêve qu'il porte une armure frappée du mon du Scorpion sous les huées de ses ancêtres. Le battement du Cœur vibre jusque dans la garde de son sabre.",
          levers: "Fierté martiale (Meyo) et devoir (Chugo) mis à rude épreuve face aux mensonges de Tenkazu, aux ordres de la Kuroiban et aux négociations avec les Nezumi."
        },
        {
          name: 'Hiro-Hito (Courtois / Lettré)',
          hallucination: "Voit du sang suinter entre les lattes des tatamis lors des salutations. Répulsion viscérale face à la fange des marais et aux cadavres écorchés.",
          levers: "Sa compassion (Jin) et son respect de l'Étiquette (Rei) sont directement manipulés par les larmes feintes de Tenkazu à l'Auberge du Héron Gris."
        },
        {
          name: 'Ryujin (Mystique / Combattant)',
          hallucination: "Les kami deviennent fébriles puis muets à l'approche de l'Outremonde. Des kansen lui murmurent des fragments de savoirs interdits.",
          levers: "Tentation directe en Outremonde : une voix lui offre de canaliser son sang pour décupler sa magie (sort de Maho gratuit contre 2 points de Souillure)."
        },
        {
          name: 'Akira (Observateur / Discret)',
          hallucination: "Repère des ombres trop longues sur les toits et des corbeaux aux yeux vitreux. Sait que Soshi Takasho compte les éliminer une fois le journal récupéré.",
          levers: "Jets d'Enquête / Perception cruciaux pour déceler les incohérences de Tenkazu (manches tachées, fourreau de katana caché) et les éclaireurs du Scorpion."
        },
        {
          name: 'Yuriko (PNJ du MJ)',
          hallucination: "Souffre d'un froid glacial dans la poitrine depuis le Tombeau de Iuchiban. Serre son doigt de jade jusqu'à s'en blanchir les jointures.",
          levers: "Ancrage émotionnel et soutien au combat. Partage les doutes du groupe mais ne résout jamais les énigmes ni les dilemmes moraux à leur place."
        }
      ],
      criticalRules: [
        {
          title: 'Jets de Peur',
          text: 'Volonté + Rang d\'Honneur contre ND 5 + (5 × Rang de Peur). En cas d\'échec, malus de -Xk0 (X = Rang de Peur) à tous les jets et impossibilité d\'approcher volontairement la source.'
        },
        {
          title: 'Souillure de l\'Outremonde',
          text: 'Jet de Terre pure (+10 avec un doigt de jade). Requis toutes les 24h en Outremonde ou immédiatement après un contact avec du sang corrompu / une blessure d\'Outremonde.'
        },
        {
          title: 'Poudre de Jade',
          text: 'Application sur une lame = Action Complexe. 1er coup : dégâts normaux (ignore l\'Invulnérabilité) ; 2e coup : moitié ; 3e coup : quart. En Outremonde, la poudre exposée est consumée en 2 heures.'
        },
        {
          title: 'Magie Maho',
          text: 'Le lanceur doit infliger des Blessures égales au Niveau de Maîtrise du sort (à lui-même ou à une victime sans défense) et gagne autant de points de Souillure (sauf technique Sang comme l\'Eau des Chuda).'
        }
      ],
      checklist: [
        { id: 'c1', label: 'Acte I : Coffret Kuroiban reçu (3 fioles poudre de jade + laisser-passer)' },
        { id: 'c2', label: 'Acte I : Netsuke & lettre codée déchiffrés (piste Gorobei Tenkazu → Taiyo One Toshi)' },
        { id: 'c3', label: 'Acte I : Hameau de Kawa-no-Mura & toupie maudite (Hana, 7 ans)' },
        { id: 'c4', label: 'Acte I : Atelier calciné d\'Asahina Norio (carnet d\'esquisses + cicatrice)' },
        { id: 'c5', label: 'Acte I : Auberge du Héron Gris — Tenkazu démasqué & Chuda Reikado rallié' },
        { id: 'c6', label: 'Acte II : Sanctuaire englouti — Shikageko / Murai vaincue' },
        { id: 'c7', label: 'Acte III : Montagnes du Crépuscule — Alliance avec les Nezumi (Ch\'tppu\'kich)' },
        { id: 'c8', label: 'Acte IV : Passage de la Gueule du Sanglier (jets Peur ND 15 & Souillure ND 15)' },
        { id: 'c9', label: 'Acte IV : Fonderie de Sang — Otages libérés / Brasero brisé / Tenkazu & Tsuno vaincus' },
        { id: 'c10', label: 'Épilogue : Journal de Yajinden & Jadoku récupérés — Col des Ombres (Kuroiban)' }
      ],
      acts: [
        {
          id: 'act-1',
          num: 'ACTE I',
          title: 'DE YANAGI MURA À TAIYO ONE TOSHI — La Piste des Jouets Maudits',
          tagline: "Où la compassion d'un samouraï devient l'arme favorite d'un sorcier du Serpent",
          scenes: [
            {
              id: 'scene-1-1',
              title: 'Scène 1.1 : Les Cendres du Saule Pleureur et le Corbeau du Scorpion',
              meta: 'Lieu : Yanagi Mura (Village du Saule Pleureur) • Moment : Aube du Jour 1',
              readAloud: "L'aube blafarde perce à peine à travers la brume tiède qui s'élève des racines calcinées du grand saule. L'odeur du sang brûlé et de l'encens de jade flotte encore dans l'air humide. Sur la table basse de la maison du chef du village reposent les deux seuls vestiges arrachés au cadavre de Chuda Bunzo : un petit netsuke d'ivoire jauni figurant un serpent enroulé autour d'un lotus, et la lettre codée évoquant ce mystérieux « marchand aux jouets de bois » parti vers les Montagnes du Crépuscule avec le journal d'Asahina Yajinden. Alors que vous pansez vos plaies, un bruissement d'ailes noires troue le silence. Un jeune homme vêtu d'un manteau de voyage gris anthracite, le bas du visage dissimulé derrière un linge sombre, se tient déjà sur le seuil sans que personne ne l'ait entendu approcher. Il pose devant vous un coffret laqué noir frappé du mon du Scorpion, puis s'incline avec une raideur calculée.",
              dialogues: [
                {
                  speaker: 'Bayushi Jiro (Émissaire de la Kuroiban)',
                  tone: 'voix monocorde, sans ciller',
                  text: "« Soshi Takasho-sama salue votre efficacité, honorables samouraïs. Le faux moine Bunzo n'est plus, et les paysans de ce trou perdu croiront qu'une fièvre des marais a emporté les disparus. Vous avez rempli la première moitié de votre devoir. »"
                },
                {
                  speaker: 'Bayushi Jiro (si Okado ou un autre PJ proteste ou le menace)',
                  tone: 'inclinant légèrement la tête, le regard glacial',
                  text: "« Votre fierté vous honore, Okado-san, mais elle ne vous protégera pas si l'Empire apprend que vous avez survécu au Tombeau de Iuchiban en laissant son Cœur battre. Ce coffret contient trois fioles de poudre de jade et un laisser-passer signé d'un Magistrat d'Émeraude fantôme pour franchir les postes de garde jusqu'aux Montagnes du Crépuscule. Trouvez le marchand. Récupérez le journal de Yajinden intact. Et souvenez-vous : nos yeux vous suivent jusque dans l'ombre de vos propres pas. »"
                }
              ],
              subsectionTitle: "Exploitation des Indices & Jets d'Investigation",
              bullets: [
                {
                  label: 'Connaissance : Héraldique ou Histoire / Intelligence (ND 15)',
                  text: "Le serpent enroulé autour d'un lotus n'est pas un emblème de la Mante. C'est le sceau clandestin des survivants du Clan du Serpent (famille Chuda), éradiqué jadis par le Clan du Phénix lors des Cinq Nuits de la Honte pour avoir pactisé avec un Shuten Doji."
                },
                {
                  label: 'Calligraphie (Chiffrement) ou Enquête / Intelligence (ND 20)',
                  text: "En recoupant la lettre codée de Bunzo avec les registres de passage du village, les PJ établissent qu'un colporteur se faisant appeler Gorobei Tenkazu (arborant les couleurs vert et or du Clan de la Mante) est passé trois jours plus tôt avec une charrette à bras remplie de jouets en bois sculpté, en direction de la ville frontalière de Taiyo One Toshi, au pied des Montagnes du Crépuscule."
                },
                {
                  label: "Observation Passive d'Akira (Perception ND 15)",
                  text: "L'émissaire Jiro a laissé une trace de boue rougeâtre caractéristique des berges du lac de Taiyo One Toshi sur le seuil. La Kuroiban sait déjà où va Tenkazu : elle utilise les PJ comme appât pour débusquer les défenses du sorcier."
                }
              ]
            },
            {
              id: 'scene-1-2',
              title: 'Scène 1.2 : Le Sillage des Jouets Brisés',
              meta: 'Lieu : Route commerciale vers Taiyo One Toshi (Terres du Scorpion) • Moment : Jours 1 et 2',
              illustration: {
                src: 'assets/images/scenarios/sc2-jouets-maudits.jpg',
                title: 'Le Netsuke du Serpent & la Toupie Maudite'
              },
              intro: "En remontant la piste de Gorobei Tenkazu vers le nord-ouest, les PJ constatent que le « marchand » sème une horreur silencieuse derrière lui sous couvert de générosité envers les plus pauvres.",
              bullets: [
                {
                  label: '1. Le Hameau de Kawa-no-Mura (Fin du Jour 1)',
                  text: "Les PJ traversent un hameau plongé dans un silence funèbre. La fille du forgeron, Hana (sept ans), est attachée à un pilier dans la cour d'une ferme, les yeux révulsés, bavant une écume noire et récitant d'une voix d'homme adulte des litanies en ancien haut-rokugani. Dans ses mains crispées : une toupie en bois de cèdre peint, offerte deux jours plus tôt par « le gentil marchand de la Mante »."
                },
                {
                  label: 'Analyse de la Toupie (Médecine ou Connaissance : Maho / Intelligence ND 15)',
                  text: "Le bois est creux et renferme une pâte alchimique noirâtre : un tsangusuri (potion magique) corrompu par le sang. Quiconque le manipule de façon prolongée subit une lente intoxication de la Souillure et devient un réceptacle passif pour les murmures des kansen. Ryujin ou Hiro-Hito (Théologie / Intelligence ND 20) reconnaît la technique artisanale des shugenja pacifistes Asahina, pervertie par la maho."
                },
                {
                  label: "2. L'Atelier Calciné d'Asahina Norio (Matin du Jour 2)",
                  text: "À une demi-journée de Taiyo One Toshi, un ermitage isolé a été incendié. Le cadavre d'Asahina Norio, un vieux shugenja de la Grue, gît dans les cendres, les poignets tranchés. (Attention : toucher le cadavre sans aide d'un eta ou purification rituelle coûte 1 point d'Honneur)."
                },
                {
                  label: 'Indices dans les Cendres (Enquête / Perception ND 15)',
                  text: "Sous une latte de plancher épargnée par le feu, un carnet d'esquisses montre un homme au visage affable, portant une cicatrice en croissant derrière l'oreille gauche : « Gorobei Tenkazu ». Norio a griffonné dans la marge : « Il m'a torturé pour traduire les glyphes alchimiques d'un journal relié de cuir noir. Il part pour Taiyo One Toshi rencontrer la vieille femme du lac avant de gagner les Montagnes du Crépuscule. »"
                },
                {
                  label: 'Communion avec les Kami (Air ou Feu, ND 15)',
                  text: "Les kami traumatisés murmurent à Ryujin : « L'homme souriait comme l'eau calme... mais son sang chantait comme les profondeurs de Jigoku ! Et un autre homme... un loup maigre aux yeux brûlants... est passé quelques heures après lui en jurant vengeance au nom d'Isawa Chuda ! »"
                }
              ]
            },
            {
              id: 'scene-1-3',
              title: "Scène 1.3 : L'Auberge du Héron Gris — Le Piège du Bushido",
              meta: 'Lieu : Taiyo One Toshi (Ville marchande au bord des marais) • Moment : Nuit du Jour 2',
              readAloud: "Taiyo One Toshi sent la vase, le poisson fumé et la peur contenue. Dans la salle commune de l'Auberge du Héron Gris, éclairée par des lanternes de papier huilé, un colporteur bedonnant au kimono vert élimé — l'emblème de la Mante cousu maladroitement sur sa manche — distribue des figurines en bois à deux enfants de l'aubergiste sous le regard attendri de leur mère. Il porte derrière l'oreille gauche une fine cicatrice en croissant. Soudain, la porte coulissante vole en éclats. Un rônin décharné, trempé de pluie et couvert de boue séchée, bondit à l'intérieur. Son visage est creusé par la faim et la fièvre, ses cheveux hirsutes collent à ses tempes, et un wakizashi à la garde d'argent ternie brille dans sa main tremblante. Il pointe sa lame vers le marchand et hurle d'une voix rauque : « Chuda Tenkazu ! Ton masque ne trompera plus les cieux ! Rends le journal et paie pour le sang des innocents ! » Aussitôt, le colporteur se jette à genoux derrière la mère et ses enfants, tremblant de tous ses membres, tandis que l'aubergiste hurle à l'aide.",
              dialogues: [
                {
                  speaker: 'Gorobei Tenkazu (Chuda Tenkazu)',
                  tone: 'voix chevrotante, jouant la terreur pure',
                  text: "« Nobles samouraïs ! Par la grâce des Fortunes, protégez-nous ! Cet homme est un bandit dément qui me poursuit depuis les terres du Lion ! Il a déjà massacré mon apprenti et veut voler ma modeste cargaison ! Au nom de votre honneur, épargnez ces enfants ! »"
                },
                {
                  speaker: 'Chuda Reikado (Le Rônin Traqueur)',
                  tone: 'haletant, les yeux injectés de sang mais le regard lucide',
                  text: "« Écoutez-moi, samouraïs ! Cet homme n'est pas un marchand ! C'est un maho-tsukai du Serpent déchu ! Il empoisonne les enfants avec ses jouets ! Regardez sa manche, regardez le sang sous sa cire ! Si vous le protégez, vous signez l'arrêt de mort de toute cette ville ! »"
                }
              ],
              specialBox: {
                title: "LE PIÈGE MORAL & MÉCANIQUE DE L'AUBERGE",
                rolls: [{ label: 'Comédie Tenkazu (6g3)', formula: '6g3' }],
                items: [
                  {
                    label: 'Le Camouflage de Tenkazu',
                    text: "Il a bu du Thé de Pétales de Jade (Tea of Jade Petals), ce qui masque totalement sa Souillure et son aura de maho aux sorts de détection standards (Perception de la Souillure échoue ou exige ND 35). Son katana maudit Jadoku est dissimulé dans un fourreau de bois brut posé contre sa charrette."
                  },
                  {
                    label: 'La Vérité sur Reikado',
                    text: "Il est le dernier descendant pur et non corrompu d'Isawa Chuda, fondateur originel du Clan du Serpent qui combattait les Adeptes du Sang avant la trahison de son épouse. Reikado traque Tenkazu pour laver l'honneur de sa lignée, mais son apparence de rônin fou joue contre lui."
                  },
                  {
                    label: 'Enquête / Perception (ND 20) — Urgence : 3 rounds avant fuite',
                    text: "Les mains de « Gorobei » sont fines, tachées d'encre rouge sombre, et un katana ancien dépasse de son sac de voyage (un marchand heimin n'a pas le droit de posséder un katana)."
                  },
                  {
                    label: 'Intuition / Perception (ND 20, opposé à Comédie 6g3 de Tenkazu)',
                    text: "Les larmes de Tenkazu s'arrêtent net dès qu'il baisse la tête ; il calcule froidement la distance jusqu'à la fenêtre arrière. À l'inverse, Reikado oriente ses coups de wakizashi pour ne jamais menacer la mère ni les enfants."
                  },
                  {
                    label: 'Connaissance : Histoire ou Héraldique / Intelligence (ND 20)',
                    text: "Le wakizashi de Reikado porte le mon authentique d'Isawa Chuda (le serpent d'argent dressé, sans lotus)."
                  },
                  {
                    label: 'Sort Perception ou Yeux des Ancêtres (ND 20)',
                    text: "Ryujin perçoit autour de Reikado une aura de pureté douloureuse, tandis qu'autour de Tenkazu flotte un vide anesthésié (effet du Thé de Pétales de Jade)."
                  }
                ]
              },
              subsectionTitle: 'Résolution de la Confrontation',
              bullets: [
                {
                  label: 'Si les PJ abattent ou arrêtent Reikado sans vérifier',
                  text: "Tenkazu les remercie avec obséquiosité, leur glisse une bourse de koku (que tout samouraï honorable doit refuser), et s'enfuit dans la nuit vers les marais. En fouillant Reikado, les PJ découvrent son ordre de vendetta familiale et perdent 2 points d'Honneur pour avoir tué un innocent honorable sur la parole d'un heimin. Ils se privent également d'un allié précieux pour le climax."
                },
                {
                  label: "Si les PJ démasquent Tenkazu ou s'interposent",
                  text: "Tenkazu laisse tomber son masque avec un rictus glacé : « Pathétiques chiens en laisse du Scorpion... Vous avez déjà le battement de Son Cœur dans vos crânes, n'est-ce pas ? Venez le chercher dans les marais, si la vieille peau ne vous dévore pas avant ! » Il brise une fiole de fumée alchimique au sol (obscurcissant la salle pendant 2 rounds) et plonge par la fenêtre vers le lac marécageux."
                },
                {
                  label: 'Ralliement de Chuda Reikado',
                  text: "Épuisé et blessé (12 points de Vie restants), Reikado s'agenouille : « Mon nom est Chuda Reikado. Tenkazu veut réveiller Jadoku, l'épée maudite de notre clan. Pour cela, il lui faut mon wakizashi — symbole de notre honneur originel — et le sang d'un descendant pur. Il est allé rejoindre une créature des marais, Shikageko, qui lui a vendu le journal de Yajinden. Je connais ses sortilèges : laissez-moi marcher à vos côtés. »"
                }
              ]
            }
          ]
        },
        {
          id: 'act-2',
          num: 'ACTE II',
          title: 'LES MARAIS DE TAIYO ONE TOSHI — La Peau du Moine',
          tagline: "Où une Sorcière des Marais revêt la chair d'un saint homme qui la combat de l'intérieur",
          scenes: [
            {
              id: 'scene-2-1',
              title: "Scène 2.1 : L'Enquête au Bord du Lac Putride",
              meta: 'Lieu : Berges marécageuses au sud de Taiyo One Toshi • Moment : Aube du Jour 3',
              intro: "En pistant Tenkazu à travers les roseaux noirs (Chasse / Perception ND 15, ou guidés par Reikado), les PJ atteignent un ancien sanctuaire de la Fraternité de Shinsei à demi englouti par la tourbe.",
              bullets: [
                {
                  label: 'Indices sur le ponton pourri (Enquête / Perception ND 15)',
                  text: "Une tasse brisée contenant des pétales de jade séchés — l'effet du Thé de Pétales de Jade de Tenkazu s'est dissipé. Une piste de sang frais mène vers le cœur du marais : Tenkazu a dû payer le prix de la maho pour conclure son pacte avec son alliée."
                },
                {
                  label: 'Légende Locale (Connaissance : Outremonde ou Folklore / Intelligence ND 20)',
                  text: "Les pêcheurs de Taiyo One Toshi racontent qu'un vénérable moine ascète nommé Murai partit méditer dans ces marais il y a dix ans pour apaiser les esprits tourmentés. Il n'en revint jamais, mais des voyageurs jurent voir sa silhouette chauve prier sur les îlots de vase... juste avant de disparaître."
                }
              ]
            },
            {
              id: 'scene-2-2',
              title: "Scène 2.2 : L'Embuscade de Shikageko",
              meta: "Lieu : Clairière engloutie du Temple de l'Eau Stagnante • Terrain Difficile",
              illustration: {
                src: 'assets/images/scenarios/sc2-shikageko-murai.jpg',
                title: 'Le Sanctuaire Englouti des Marais'
              },
              readAloud: "La brume s'écarte devant un pavillon de bois effondré. Agenouillé sur un îlot de pierre au centre de l'eau noire, un vieux moine aux robes élimées égrène un chapelet de bois, le dos tourné. Sa voix, douce et sereine, résonne sur l'onde : « Les voyageurs perdus dans le brouillard cherchent toujours la lumière... mais la boue garde tout ce qu'elle touche. » Lorsqu'il tourne la tête vers vous, un frisson glacé vous parcourt l'échine. La peau de son visage pend légèrement au niveau de la mâchoire et des poignets, comme un vêtement trop grand cousu avec du fil de tendon noir. Ses yeux, d'un jaune reptilien, clignent latéralement. « Tenkazu m'a promis de chasser le vieux fou qui prie dans ma tête... si je lui offre vos cœurs encore chauds ! » Dans un bruit de succion écœurant, les coutures de son cou se déchirent tandis que quatre cadavres gonflés d'eau émergent de la vase autour de vous !",
              specialBox: {
                title: 'MÉCANIQUE SPÉCIALE : LE DÉDOUBLEMENT DE SHIKAGEKO / MURAI',
                rolls: [
                  { label: 'Soin Kiho Musubi (2g2)', formula: '2g2' },
                  { label: 'Peur 3 (ND 20)', formula: '3g3' }
                ],
                items: [
                  {
                    label: 'Terrain',
                    text: "Eau vaseuse jusqu'aux genoux (déplacements divisés par 2, malus de -1k0 aux jets d'Athlétisme et d'Esquive en armure lourde). Trois îlots de pierre moussue offrent un sol sec (2 m de diamètre chacun)."
                  },
                  {
                    label: 'Jet de Peur',
                    text: "ND 20 (Rang de Peur 3) dès que Shikageko révèle sa nature d'écorcheuse (Skintaker)."
                  },
                  {
                    label: "Conflit d'Âmes (Clé Tactique)",
                    text: "En revêtant la peau écorchée du moine Murai, Shikageko a acquis ses Kiho (Ai Uchi, Musubi, Tsuchi-do), mais l'âme pure du moine est restée piégée dans sa chair. Au début de chaque round — ou lorsqu'un PJ récite un verset du Tao de Shinsei, lance un sort de purification ou réussit un jet de Théologie / Intuition ND 20 en Action Simple — Shikageko doit réussir un jet de Volonté ND 20 (+5 par appel réussi des PJ)."
                  },
                  {
                    label: "Effet d'un Échec de Shikageko",
                    text: "L'esprit de Murai reprend le contrôle de ses bras pendant 1 round ! Le corps du monstre joint les mains en prière, lance involontairement le Kiho Musubi (soignant 2k2 Blessures au PJ le plus proche) ou Ai Uchi contre un cadavre noyé, et hurle d'une double voix : « Frappez le cœur sous la peau ! Libérez-moi ! » (Son ND d'Armure chute à 15 durant ce round)."
                  }
                ]
              },
              encounter: {
                id: 'enc-act2',
                label: '⚔️ Préparer ce combat en Escarmouche (Shikageko + 4 Zombies)',
                enemies: [
                  { presetName: 'Shikageko / Murai (Sc.2 — Boss Acte II)', count: 1 },
                  { presetName: 'Zombie de Sang (Sc.2)', count: 4 }
                ]
              },
              outro: "Lorsque Shikageko est abattue, la peau du moine se détache d'elle dans un soupir apaisé, révélant la carcasse verdâtre et griffue de la Sorcière des Marais. L'esprit lumineux de Murai apparaît un instant, s'incline avec gratitude devant les PJ et pointe le doigt vers les sommets déchiquetés au sud-ouest : « Le serpent porte le livre de forge... Il cherche le sang de la montagne où le Sanglier est mort... Hâtez-vous, avant que la faille ne s'ouvre... »"
            }
          ]
        },
        {
          id: 'act-3',
          num: 'ACTE III',
          title: 'LES MONTAGNES DU CRÉPUSCULE — Les Terres Mortes du Sanglier et la Patte Crochue',
          tagline: "Où l'orgueil du samouraï doit plier devant des alliés inattendus pour franchir les montagnes maudites",
          scenes: [
            {
              id: 'scene-3-1',
              title: "Scène 3.1 : L'Ascension des Terres Dévastées du Clan du Sanglier",
              meta: 'Lieu : Versants sud des Montagnes du Crépuscule • Moment : Jour 4',
              intro: "Les PJ quittent les marais pour gravir les pentes escarpées des Montagnes du Crépuscule. Ici, la roche est noire et vitrifiée depuis le cataclysme du VIe siècle, lorsque le sorcier Agasha Ryuden fora le Minerai de Sang (Blood Ore) du Premier Oni et sacrifia l'intégralité du Clan Mineur du Sanglier pour forger l'Enclume du Désespoir.",
              rolls: [{ label: 'Dégâts Piège Acide (3g2)', formula: '3g2' }],
              bullets: [
                {
                  label: 'Ambiance & Perturbation des Kami',
                  text: "Des lances brisées à trois pointes — les Mai Chong de la défunte famille Heichi — émergent des éboulis comme des ossements rouillés. Le battement du Cœur de Iuchiban (« Boum... Boum... ») vibre désormais dans la plante des bottes des PJ. Ryujin sent les kami terrorisés se retirer : tous les sorts élémentaires non-maho subissent un malus de -1k0 (sauf les sorts avec le mot-clé Jade)."
                },
                {
                  label: 'Pièges Alchimiques de Tenkazu',
                  text: "Tenkazu a miné l'unique sentier praticable avec des fioles d'acide de sang (Enquête / Perception ND 20 pour les repérer ; Athlétisme / Réflexes ND 20 pour éviter 3k2 Blessures et un jet de Terre ND 15 contre la Souillure)."
                }
              ]
            },
            {
              id: 'scene-3-2',
              title: "Scène 3.2 : Le Terrier de Ch'tppu'kich (Tribu Nezumi de la Patte Crochue)",
              meta: "Lieu : Contreforts sud-ouest des Montagnes du Crépuscule • Moment : Fin d'après-midi du Jour 4",
              illustration: {
                src: 'assets/images/scenarios/sc2-nezumi-patte-crochue.jpg',
                title: 'La Tribu de la Patte Crochue'
              },
              readAloud: "Alors que vous contournez un éboulement piégé, une douzaine de silhouettes basses, couvertes de fourrure grise rapiécée et armées de lances d'os et de sarbacanes, surgissent des fissures de la roche. Leurs moustaches frémissent à toute vitesse. Celui qui semble être leur chef — un vieux mâle à l'oreille fendue portant un collier de dents d'oni et un lambeau de soie verte arraché à la tunique de Tenkazu — frappe le sol de son bâton d'os. « Chik-chik ! Hommes-grands-chapeaux ! Pas un pas-pas ! Odeur de sang-noir devant ! Odeur de pierre-qui-bat derrière vous ! Pourquoi hommes-grands-chapeaux viennent mourir ici-ici ? »",
              specialBox: {
                title: "DIPLOMATIE CULTURELLE & DILEMME D'HONNEUR CHEZ LES NEZUMI",
                items: [
                  {
                    label: "La Règle d'Or (Ne jamais montrer les dents)",
                    text: "Chez les Nezumi, sourire en montrant les dents est un défi à mort. Tout PJ qui sourit par courtoisie déclenche immédiatement l'hostilité de la tribu (jet de Connaissance : Outremonde ou Nezumi / Intelligence ND 15 pour le savoir à l'avance)."
                  },
                  {
                    label: 'Jets Sociaux',
                    text: "L'Étiquette de cour est inutile et agaçante pour eux. Il faut employer Sincérité / Intuition (ND 15) ou Intimidation (ND 20) avec un langage direct, concret et rapide."
                  },
                  {
                    label: "Le Prix de l'Alliance (Dilemme pour Okado et Hiro-Hito)",
                    text: "Le chef Ch'tppu'kich exige que les samouraïs s'agenouillent à hauteur des yeux des Nezumi pour parler d'égal à égal et échangent un objet personnel afin de « lier leurs odeurs ». S'agenouiller devant des créatures extérieures à l'Ordre Céleste coûte 1 point d'Honneur (ou exige un jet de Volonté ND 20 pour ravaler son orgueil au nom du devoir Chugo), mais assure le soutien total de la tribu."
                  }
                ]
              },
              dialogues: [
                {
                  speaker: "Ch'tppu'kich (Chef de la Patte Crochue)",
                  tone: "reniflant l'air avec nervosité",
                  text: "« Homme-serpent avec épée-qui-boit est passé hier-hier ! Il a tué deux éclaireurs de la Patte Crochue avec feu-noir ! Il n'est pas resté dans les hautes-pierres. Il est descendu par la Gueule du Sanglier — le vieux tunnel creusé par les hommes-d'acier il y a longtemps-longtemps ! Le tunnel traverse la montagne et débouche... de l'autre côté. Là où le ciel saigne. En Outremonde ! »"
                }
              ],
              outro: "Si l'accord est conclu, Ch'tppu'kich guide les PJ à travers un réseau de galeries étroites permettant de contourner tous les pièges de Tenkazu, jusqu'à une faille béante dans la paroi sud-ouest, au-delà de l'extrémité occidentale du Mur des Kaiu."
            }
          ]
        },
        {
          id: 'act-4',
          num: 'ACTE IV',
          title: "L'OUTREMONDE (LA FONDERIE DE SANG) — Là où les Kami Hurlent",
          tagline: "Franchir la frontière de l'enfer rokugani et survivre à la colère de Jadoku",
          scenes: [
            {
              id: 'scene-4-1',
              title: "Scène 4.1 : Le Passage de la Faille d'Obsidienne",
              meta: "Lieu : La Gueule du Sanglier — Frontière de l'Outremonde • Moment : Crépuscule du Jour 4",
              intro: "Juste avant d'entrer dans le boyau souterrain, Akira (Perception ND 15) aperçoit sur les crêtes derrière eux trois silhouettes immobiles drapées de capes noires : les éclaireurs de Soshi Takasho. La Kuroiban a verrouillé la retraite derrière eux. Ils ne remonteront qu'avec le journal de Yajinden... ou mourront en Outremonde.",
              readAloud: "Après une heure de marche courbée dans un boyau suffocant dont les parois suintent une huile tiède et métallique, la galerie s'ouvre brusquement sur l'abîme. Vous avez franchi la frontière de l'Empire d'Émeraude. Vous êtes en Outremonde. Devant vous s'étend une vallée de cendres vitrifiées et de roches déchiquetées, baignée d'une lueur maladive couleur d'ecchymose. Le ciel est obstrué par des nuages bas, lourds et immobiles, traversés d'éclairs silencieux. L'air a le goût du cuivre, de la chair pourrie et de la bile. À l'instant même où votre botte foule le sol corrompu, un silence absolu tombe sur votre esprit : les kami ont disparu. Il n'y a plus de Vent, plus d'Eau, plus de Terre bienveillante. Seulement une pression écrasante sur vos tempes, et le battement titanesque du Cœur de Iuchiban qui résonne désormais comme un tambour de guerre à quelques lieues au sud : BOUM... BOUM... BOUM...",
              specialBox: {
                title: "EFFETS IMMÉDIATS DE L'OUTREMONDE SUR LES PJ",
                items: [
                  {
                    label: 'Premier Contact avec la Souillure',
                    text: "Chaque PJ effectue immédiatement un jet de Terre pure (ND 15, +10 avec son doigt de jade). En cas d'échec : gain de 1 point de Souillure et brûlure glaciale le long de la nuque."
                  },
                  {
                    label: "Peur de l'Outremonde",
                    text: "Tout personnage n'appartenant pas au Clan du Crabe doit réussir un jet de Peur (ND 15) lors de son premier pas hors de l'Empire."
                  },
                  {
                    label: 'Distorsion Magique',
                    text: "Les kami sont terrorisés et fous. Tout sort élémentaire standard exige 1 Augmentation gratuite obligatoire juste pour appeler les esprits (ou subit +5 au ND), sauf les sorts possédant le mot-clé Jade. À l'inverse, tous les sorts de Maho gagnent 1 Augmentation gratuite !"
                  }
                ]
              }
            },
            {
              id: 'scene-4-2',
              title: "Scène 4.2 : La Fonderie de Sang d'Agasha Ryuden (Climax Mortel)",
              meta: "Lieu : Cratère d'obsidienne en Outremonde • Affrontement Final",
              illustration: {
                src: 'assets/images/scenarios/sc2-fonderie-tenkazu.jpg',
                title: 'La Fonderie de Sang'
              },
              readAloud: "Au fond d'un cratère d'obsidienne entouré d'échafaudages calcifiés, un brasero titanesque alimenté par des veines de Minerai de Sang brûle d'une flamme noire sans chaleur. Devant l'autel de pierre fissuré se tient Chuda Tenkazu. Il a jeté ses haillons de marchand. Vêtu d'une robe de cérémonie pourpre brodée du serpent enroulé sur un lotus, il tient dans sa main gauche le journal ouvert d'Asahina Yajinden, et dans sa main droite une lame d'acier noir aux reflets huileux qui semble vibrer d'une faim vorace : Jadoku, le katana maudit du Clan du Serpent. Deux paysans capturés sur la route gisent ligotés au pied du brasero, leur sang s'écoulant lentement dans les rigoles de pierre pour nourrir les flammes noires. À mesure que le sang grésille, des caractères lumineux s'élèvent des pages du journal de Yajinden dans une fumée écarlate. À droite de Tenkazu se dresse un colosse cuirassé de plus de deux mètres, coiffé d'un casque d'os cornu et serrant une lame dentelée dégoulinante de pus — un Tsuno issu des Royaumes de Massacre. Autour du cratère, quatre cadavres écorchés maintenus debout par des filaments de sang coagulé se tournent lentement vers vous.",
              dialogues: [
                {
                  speaker: 'Chuda Tenkazu',
                  tone: "les yeux injectés d'un sang noir, un sourire extatique déformant ses traits",
                  text: "« Vous voilà enfin ! Les chiens du Scorpion sont venus mourir loin de leurs maîtres ! Regardez ! Le journal de Yajinden livre enfin son secret ! Le Cœur de Iuchiban ne repose pas dans une forteresse... Il bat sous le Marais des Ossements, là où même les armées du Crabe n'osent plus marcher ! »"
                },
                {
                  speaker: 'Chuda Tenkazu (si Chuda Reikado accompagne les PJ)',
                  tone: 'pointant Jadoku vers son cousin',
                  text: "« Et tu m'as apporté le dernier ingrédient, cousin ! Le wakizashi pur d'Isawa Chuda ! Dès que j'aurai trempé Jadoku dans ton sang, l'arme s'éveillera pleinement et boira l'âme de ces samouraïs ! »"
                }
              ],
              subsectionTitle: 'Déroulement Tactique & Leviers de Survie (Combat Haute Létalité)',
              rolls: [
                { label: 'Éclair de Sang Tentation (4g3)', formula: '4g3' },
                { label: 'Explosion Brasero (3g3)', formula: '3g3' },
                { label: 'Volonté Tenkazu Possession (5g3)', formula: '5g3' },
                { label: 'Contrecoup Kansen (2g1)', formula: '2g1' }
              ],
              bullets: [
                {
                  label: 'Round 1 — La Terreur et le Mur de Sang',
                  text: "Jets de Peur (ND 20) face au Guerrier Tsuno (Rang de Peur 2) et aux horreurs du brasero. Tenkazu utilise sa technique Sang comme l'Eau et le sang des prisonniers ligotés pour lancer Armure d'Obsidienne (absorbe jusqu'à 2 sorts de Jade dans un nuage de feu noir silencieux), puis Éclair de Sang ou Toucher de la Mort sur le bushi le plus avancé (Okado). Le Guerrier Tsuno engage Okado ou Yuriko au corps-à-corps (+1k0 à l'attaque contre toute cible souillée)."
                },
                {
                  label: "Rounds 2 à 4 — L'Attrition et la Tentation de Ryujin",
                  text: "Les 4 Zombies de Sang tentent d'encercler Hiro-Hito et Ryujin pour les immobiliser (Empoignade) et les traîner vers les rigoles de sang. Pendant ce temps, un kansen du brasero murmure directement dans l'esprit de Ryujin : « Ton sang suffit. Prononce les trois syllabes, et je consumerai ce démon Tsuno dans les flammes noires... » S'il cède, Ryujin lance gratuitement Éclair de Sang (4k3 dégâts, ignore l'armure), mais gagne automatiquement 2 points de Souillure."
                },
                {
                  label: 'Levier Tactique 1 — Briser le Brasero de Minerai de Sang',
                  text: "Le brasero (ND 15, 30 points de structure, Réduction 5) alimente les Augmentations gratuites de maho de Tenkazu et anime les Zombies de Sang. Si Okado ou Yuriko renverse le brasero ou le frappe avec une arme enduite de poudre de jade, l'explosion d'énergie pure détruit instantanément les 4 Zombies de Sang et inflige 3k3 Blessures à Tenkazu et au Tsuno !"
                },
                {
                  label: 'Levier Tactique 2 — Libérer les Otages',
                  text: "Hiro-Hito ou Akira peut trancher les liens des deux paysans saignés à blanc (Action Complexe + jet de Médecine ND 15 pour stopper l'hémorragie), privant Tenkazu de sa réserve de sang externe et l'obligeant à s'entailler lui-même pour chaque sort."
                },
                {
                  label: "Levier Tactique 3 — L'Aide de Chuda Reikado",
                  text: "S'il a survécu à l'Acte I, Reikado utilise sa technique Punir les Impies pour réduire l'armure du Guerrier Tsuno, ou confie son wakizashi ancestral à Okado/Akira (compte comme une arme de Jade pur contre les créatures de l'Outremonde)."
                },
                {
                  label: 'Le Dernier Souffle de Tenkazu (Possession)',
                  text: "Lorsque Tenkazu tombe à son dernier rang de Blessures, il plante Jadoku dans sa propre paume pour lancer Possession sur le guerrier le plus redoutable du groupe (Okado) afin de le retourner contre ses compagnons (jet opposé de Volonté : Tenkazu 5g3 contre Okado). Si Okado résiste, le contrecoup des kansen furieux inflige 2k1 Blessures à Tenkazu, le tuant dans une gerbe de sang noir. Avant d'expirer, il râle : « Tuez-moi... cela ne change rien... Le Cœur a déjà entendu votre sang... Et le Scorpion... le Scorpion vous attend à la sortie... »"
                }
              ],
              encounter: {
                id: 'enc-act4',
                label: '⚔️ Préparer le Climax en Escarmouche (Tenkazu + Tsuno + 4 Zombies)',
                enemies: [
                  { presetName: 'Chuda Tenkazu (Sc.2 — Boss)', count: 1 },
                  { presetName: 'Guerrier Tsuno (Sc.2)', count: 1 },
                  { presetName: 'Zombie de Sang (Sc.2)', count: 4 }
                ]
              }
            }
          ]
        }
      ],
      epilogue: {
        title: "Épilogue : L'Ombre du Retour & Récompenses",
        transition: "Transition directe vers le Scénario III : L'Embuscade du Col des Ombres",
        paragraphs: [
          "Les flammes noires du brasero s'éteignent dans un sifflement lugubre. Sur l'autel de pierre reposent désormais le Journal d'Asahina Yajinden (qui désigne l'emplacement exact du caveau du Cœur de Iuchiban au cœur des Marais des Ossements en Outremonde) et Jadoku, le katana maudit du Clan du Serpent (quiconque le touche sans l'envelopper dans de la soie bénie doit réussir un jet de Terre ND 20 ou gagner 1 point de Souillure).",
          "Mais alors que les PJ, couverts de sang, de suie et de cendres, entament la remontée épuisante vers la Gueule du Sanglier pour quitter l'Outremonde, des dizaines de lanternes sourdes s'allument sur les crêtes brumeuses du Col des Ombres. Soshi Takasho et les agents d'élite de la Kuroiban ont barré le chemin du retour."
        ],
        rewards: [
          {
            category: "Points d'Expérience (XP)",
            details: "5 à 7 XP par joueur (1 XP base, +1 XP enquête/dénouement à l'auberge, +1 XP alliance avec Reikado et/ou les Nezumi, +2 XP survie en Outremonde et défaite de Tenkazu, +1 à 2 XP interprétation du Bushido)."
          },
          {
            category: 'Honneur & Gloire',
            details: "+2 points d'Honneur si les otages de la Fonderie ont été sauvés et Reikado épargné. -1 point d'Honneur si un PJ s'est agenouillé devant les Nezumi (compensé par +1 en devoir Chugo aux yeux de son groupe). Gloire : +0 (mission secrète sous contrainte du Scorpion)."
          },
          {
            category: 'Souillure & Purification',
            details: "Noter précisément les points de Souillure acquis en Outremonde. Le doigt de jade offert par le Scorpion noircit et se fissure après avoir absorbé la corruption du cratère."
          }
        ]
      },
      npcs: [
        {
          id: 'tenkazu',
          name: '1. CHUDA TENKAZU (« Gorobei Tenkazu », Héritier du Serpent)',
          role: 'Shugenja Chuda Corrompu (Rang 3) • Antagoniste Principal',
          presetName: 'Chuda Tenkazu (Sc.2 — Boss)',
          isAlly: false,
          rings: 'Terre 3, Eau 3, Feu 3 (Intelligence 4), Air 3 (Intuition 4), Vide 3',
          status: 'Honneur 0.5 • Gloire 1.0 • Souillure 3.8 (masquée par le Thé de Pétales de Jade en Acte I)',
          combat: "Initiative 6g3 • ND d'Armure 20 (Vêtements renforcés) • Réduction 0 (6 contre sorts de Jade avec Armure d'Obsidienne)",
          wounds: 'Indemne 15 | Éraflé 21 | Lég. Blessé 27 | Blessé 33 | Grav. Blessé 39 | Impotent 45 | Épuisé 51 | Hors Combat 57',
          skills: 'Art de la Magie 4, Calligraphie (Chiffrement) 4, Comédie (Duperie) 5, Connaissance : Maho 5, Connaissance : Outremonde 4, Discrétion 3, Kenjutsu 3, Sincérité 4.',
          specials: [
            "Technique d'École (Shugenja Chuda) : Affinité pour tous les sorts de Maho non-Vide ; Déficience en Eau. Sang comme l'Eau (Blood Like Water) : peut prendre 1 Augmentation pour masquer la nature corrompue d'un sort de Maho, et une 2e Augmentation pour réduire le gain de Souillure à 1 point quel que soit le niveau de maîtrise du sort.",
            "Arme — Jadoku (Katana Maudit) : Attaque 6g3, Dégâts 6g3. Lame d'acier noir qui ignore la Réduction ordinaire ; chaque blessure infligée impose un jet de Terre ND 15 contre la Souillure et soigne Tenkazu de 3 points de Vie.",
            "Sorts Mémorisés (Lancement Maho à 7g4 en Outremonde) : Armure d'Obsidienne (Feu 3 — absorbe les sorts de Jade dans un nuage de feu noir), Toucher de la Mort (Terre 4 — 4g4 Blessures ignorant l'armure si jet de Terre opposé échoue), Éclair de Sang (Feu 2 — attaque à distance 7g4, dégâts 4g3), Possession (Eau 4 — nécessite du sang de la cible, jet opposé de Volonté)."
          ],
          rolls: [
            { label: 'Init 6g3', formula: '6g3' },
            { label: 'Jadoku Att 6g3', formula: '6g3' },
            { label: 'Jadoku Dég 6g3', formula: '6g3' },
            { label: 'Maho Outremonde 7g4', formula: '7g4' },
            { label: 'Éclair Sang Dég 4g3', formula: '4g3' },
            { label: 'Toucher Mort 4g4', formula: '4g4' }
          ]
        },
        {
          id: 'tsuno',
          name: '2. GUERRIER TSUNO (Garde du Corps des Royaumes de Massacre)',
          role: "Créature d'Outremonde / Esprit Corrompu • Garde du Corps de Tenkazu",
          presetName: 'Guerrier Tsuno (Sc.2)',
          isAlly: false,
          rings: 'Terre 4, Eau 3, Feu 2 (Agilité 3), Air 2 (Réflexes 4), Vide 2',
          status: 'Honneur 0.0 • Souillure 4.0',
          combat: "Initiative 5g4 • ND d'Armure 30 (Armure légère d'os +5) • Réduction 8 (3 armure + 5 surnaturelle)",
          wounds: 'Indemne 20 | Éraflé 28 | Lég. Blessé 36 | Blessé 44 | Grav. Blessé 52 | Impotent 60 | Épuisé 68 | Hors Combat 76',
          skills: 'Armes Lourdes (Lame Tsuno) 4, Athlétisme 3, Art de la Guerre 2, Connaissance : Outremonde 3, Connaissance : Royaumes Spirituels 4, Défense 3, Discrétion 3, Jiujutsu 3.',
          specials: [
            "Capacités Spéciales : Peur 2 (jet de Volonté + Honneur ND 15). Invulnérabilité partielle : les armes non-jade et non-cristal voient leurs dégâts réduits par sa Réduction de 8.",
            "Attaque — Lame Tsuno Dentelée : Attaque 7g3 (Action Complexe), Dégâts 6g3. Gagne +1k0 à l'attaque contre toute cible possédant au moins 1 Rang de Souillure ou l'avantage Touché par les Royaumes."
          ],
          rolls: [
            { label: 'Init 5g4', formula: '5g4' },
            { label: 'Lame Att 7g3', formula: '7g3' },
            { label: 'Att vs Souillé 8g3', formula: '8g3' },
            { label: 'Lame Dég 6g3', formula: '6g3' }
          ]
        },
        {
          id: 'shikageko',
          name: '3. SHIKAGEKO (Sorcière des Marais sous la Peau de Murai)',
          role: "Bog Hag / Skintaker • Boss de l'Acte II",
          presetName: 'Shikageko / Murai (Sc.2 — Boss Acte II)',
          isAlly: false,
          rings: 'Terre 3, Eau 4, Feu 3 (Agilité 4), Air 3 (Réflexes 4), Vide 3',
          status: 'Honneur 0.0 • Souillure 3.5',
          combat: "Initiative 7g4 • ND d'Armure 25 (tombe à 15 quand l'âme de Murai reprend le contrôle) • Réduction 4",
          wounds: 'Indemne 15 | Éraflé 22 | Lég. Blessé 29 | Blessé 36 | Grav. Blessé 43 | Impotent 50 | Épuisé 57 | Hors Combat 64',
          skills: 'Athlétisme 4, Comédie 4, Connaissance : Théologie 3, Défense 4, Discrétion 4, Jiujutsu (Arts Martiaux) 5, Méditation 4.',
          specials: [
            "Attaques — Griffes d'Écorcheuse / Frappes de Moine : 2 attaques par round (Action Simple) à 8g4, Dégâts 4g3 + Poison des Marais (jet d'Endurance ND 15 ou malus de -1k0 à tous les jets pendant 3 rounds).",
            "Capacités Spéciales & Kiho de Murai : Peur 3 (ND 20). Amphibie : aucun malus de déplacement dans l'eau ou la boue. Maîtrise Tsuchi-do (ignore 4 points de Réduction), Musubi (soigne 2g2 Blessures) et Ai Uchi (riposte automatique si touchée au corps-à-corps)."
          ],
          rolls: [
            { label: 'Init 7g4', formula: '7g4' },
            { label: 'Attaque 8g4', formula: '8g4' },
            { label: 'Dégâts 4g3', formula: '4g3' },
            { label: 'Volonté Murai 3g3', formula: '3g3' }
          ]
        },
        {
          id: 'zombies-kuroiban',
          name: '4. ZOMBIES DE SANG (x4) & ÉCLAIREURS KUROIBAN',
          role: 'Sbires de Combat (Actes II & IV) & Référence de Fin de Scénario',
          presetName: 'Zombie de Sang (Sc.2)',
          isAlly: false,
          rings: 'Zombies : Terre 2, Eau 2, Feu 2, Air 1, Vide 0 • Kuroiban : Anneaux 3 (Air 4)',
          status: 'Zombies : Souillure 3.0 • 30 PV (insensibles aux malus)',
          combat: "Zombies : Init 2g1 • ND 10 • Réd 3 | Kuroiban : Init 7g3 • ND 25 • Réd 3",
          wounds: 'Zombies : 30 PV fixes (détruits instantanément si le brasero de Minerai de Sang est renversé ou frappé au jade)',
          skills: 'Kuroiban : Kenjutsu / Ninjutsu 4',
          specials: [
            "Zombies de Sang (x4) : Griffes & Morsures 4g2, Dégâts 3g2. Sur 1 Augmentation gratuite : Empoignade pour immobiliser et traîner vers l'autel.",
            "Éclaireurs d'Élite Kuroiban (Référence Épilogue) : Attaque 7g4, Dégâts 5g2 • Shuriken empoisonnés (6g4, poison somnifère Endurance ND 20). Ils n'engagent pas le combat ici mais verrouillent la retraite vers le Scénario 3."
          ],
          rolls: [
            { label: 'Zombie Att 4g2', formula: '4g2' },
            { label: 'Zombie Dég 3g2', formula: '3g2' },
            { label: 'Kuroiban Att 7g4', formula: '7g4' },
            { label: 'Shuriken 6g4', formula: '6g4' }
          ]
        },
        {
          id: 'reikado',
          name: '5. CHUDA REIKADO (Allié Potentiel — Shugenja Chuda Originel)',
          role: "Dernier Descendant Pur d'Isawa Chuda • Magistrat Errant",
          presetName: null,
          isAlly: true,
          rings: 'Terre 3, Eau 2, Feu 2, Air 2, Vide 3',
          status: 'Honneur 5.5 • Gloire 0.5 • Souillure 0.0',
          combat: "Initiative 4g2 • ND d'Armure 15 • Points de Vie restants : 12 (blessé au début du scénario)",
          wounds: '12 PV restants au ralliement (Terre 3)',
          skills: 'Wakizashi Ancestral d\'Isawa Chuda (compte comme arme de Jade pur contre les créatures souillées ; +1k1 contre Tenkazu)',
          specials: [
            "Technique d'École (Chuda Originel — Rang 2) : Punir les Impies : peut dépenser 1 Point de Vide en Action Gratuite pour annuler 2 points de Réduction d'une cible souillée, et ajoute +2 aux dégâts de ses sorts contre les créatures de l'Outremonde.",
            "Sorts Connus : Communion, Invocation, Perception, Tetsubo de Terre (Terre 1 / Jade), Force du Corbeau (Terre 3 / Jade — confère +5k5 aux jets de résistance contre la Souillure et +10 au ND des sorts de maho ciblant le bénéficiaire)."
          ],
          rolls: [
            { label: 'Init 4g2', formula: '4g2' },
            { label: 'Sort Terre 5g3', formula: '5g3' }
          ]
        }
      ]
    }
  ];

  if (typeof globalScope !== 'undefined') {
    globalScope.GM_SCENARIOS_DATA = GM_SCENARIOS_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GM_SCENARIOS_DATA };
  }
})(typeof window !== 'undefined' ? window : globalThis);
