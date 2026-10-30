/**
 * CLANS_DATA — Les Huit Grands Clans de Rokugan
 * Règles officielles L5R 4e Édition (Livre de Base, The Great Clans, Emerald Empire)
 */
const CLANS_DATA = {

  // =========================================================================
  // 1. CLAN DU CRABE
  // =========================================================================
  crabe: {
    name: "Clan du Crabe",
    families: [
      { name: "Hida", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Hiruma", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Kaiu", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Kuni", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Yasuki", trait: "Perception", bonus: "+1 Perception" }
    ],
    schools: [
      // ÉCOLE BUSHI HIDA (Core p. 106)
      {
        id: "bushi-hida",
        family: "Hida",
        name: "Bushi Hida",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Armes Lourdes (Tetsubo)", "Athlétisme", "Bataille", "Défense", "Jiujutsu", "Kenjutsu", "Une compétence Bugei au choix"],
        outfit: "Armure lourde, Daisho, Tetsubo ou Dai Tsuchi, Nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Crabe", effect: "Le port d'une Armure Lourde n'augmente pas le ND de vos jets d'Athlétisme ou basés sur l'Agilité (la Discrétion reste pénalisée). Lorsque vous maniez une Arme Lourde, vous ajoutez +1g0 à tous vos jets de dégâts." },
          { rank: 2, name: "La Montagne ne Bouge Pas", effect: "Vous gagnez une valeur de Réduction de dégâts permanente égale à votre Anneau de Terre. Cette Réduction se cumule avec celle de votre armure." },
          { rank: 3, name: "Deux Pinces, Un Seul Esprit", effect: "Porter une attaque devient une Action Simple (au lieu de Complexe) lorsque vous maniez une Arme Lourde ou une arme portant le mot-clé Samouraï." },
          { rank: 4, name: "La Poigne de la Terre", effect: "Lorsque vous touchez avec une Arme Lourde, vous ignorez une quantité de Réduction adverse égale à votre Anneau de Terre. Vous effectuez la manœuvre Renversement pour 1 Augmentation de moins (minimum 1)." },
          { rank: 5, name: "La Montagne ne Tombe Jamais", effect: "Au début de votre tour ou en phase de Réactions, dépensez 1 point de Vide : durant 1 round complet, vous ignorez tous vos malus de blessures (vous agissez au palier Indemne +0) et vous ne pouvez pas être rendu Inconscient ou Mis Hors de Combat par les dégâts." }
        ]
      },

      // ÉCOLE BUSHI HIRUMA (Core p. 108)
      {
        id: "bushi-hiruma",
        family: "Hiruma",
        name: "Bushi Hiruma (Éclaireur)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse (Pistage)", "Connaissance : Outremonde", "Défense", "Discrétion", "Kenjutsu", "Kyujutsu"],
        outfit: "Armure légère, Daisho, Arc Yumi avec 20 flèches, Nécessaire de voyage et de pistage, 3 koku",
        techniques: [
          { rank: 1, name: "La Flamme de la Torche Vacille", effect: "En posture d'Attaque, vous gagnez +1g0 à tous vos jets d'attaque. Votre entraînement de traqueur divise par deux vos besoins quotidiens en nourriture, eau et sommeil." },
          { rank: 2, name: "La Leçon du Loup", effect: "En posture de Défense Totale, vous ajoutez votre rang de compétence Athlétisme à votre ND d'Armure. Vous pouvez substituer l'Agilité à la Force pour tous vos jets d'Athlétisme." },
          { rank: 3, name: "Courir comme le Vent", effect: "Attaquer devient une Action Simple lorsque vous maniez un sabre (Kenjutsu), un arc (Kyujutsu) ou une lance." },
          { rank: 4, name: "Le Requin Sent le Sang", effect: "Face à une cible blessée ou souillée, ou contre un adversaire ayant manqué son attaque contre vous au round précédent, vous gagnez +2g0 à vos jets d'attaque." },
          { rank: 5, name: "Le Jour sans Regrets", effect: "Une fois par combat en Action Gratuite, ajoutez votre Volonté × 5 à votre ND d'Armure pour 1 round. Vos attaques infligent +2g2 de dégâts supplémentaires en frappant un point vital." }
        ]
      },

      // ÉCOLE INGÉNIEUR KAIU (The Great Clans p. 39)
      {
        id: "ingenieur-kaiu",
        family: "Kaiu",
        name: "Ingénieur Kaiu",
        type: "Bushi",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Artisanat (Forge de Siège)", "Bataille", "Connaissance : Architecture", "Connaissance : Ingénierie (Siège)", "Défense", "Kenjutsu", "Éventail de Guerre"],
        outfit: "Armure lourde, Daisho, Marteau de guerre lourd ou Éventail d'acier, Outils d'architecte et de forge, 3 koku",
        techniques: [
          { rank: 1, name: "La Méthode Kaiu", effect: "Vous gagnez une Augmentation Gratuite sur tous vos jets d'Ingénierie, Artisanat et Architecture. Dépenser 1 point de Vide sur ces compétences ajoute +2g2 au lieu de +1g1." },
          { rank: 2, name: "La Voie de Pierre", effect: "Vous pouvez réparer ou fortifier n'importe quel édifice. Les armes de siège sous vos ordres relancent tous les dés de dégâts inférieurs à votre Rang d'École." },
          { rank: 3, name: "Artisan de la Carapace", effect: "Attaquer devient une Action Simple avec les armes de siège, marteaux lourds ou sabres. Lorsque vous entretenez une armure, vous augmentez sa Réduction de 1." },
          { rank: 4, name: "Percer la Brèche", effect: "Vos cibles ne bénéficient d'aucun bonus de couvert ou de retranchement contre vos assauts ou ceux des troupes que vous dirigez." },
          { rank: 5, name: "La Voie de l'Acier", effect: "Lorsque vous forgez une arme, vous lui conférez de manière permanente soit +1g0 à l'attaque, soit +0g1 aux dégâts. En dépensant vos points de Vide, vous pouvez rendre une lame Incassable." }
        ]
      },

      // ÉCOLE SHUGENJA KUNI (Core p. 107)
      {
        id: "shugenja-kuni",
        family: "Kuni",
        name: "Shugenja Kuni",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Calligraphie (Chiffre)", "Connaissance : Outremonde", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Une compétence Bugei au choix"],
        outfit: "Robes austères, Wakizashi, Bâton Bo, Nécessaire de calligraphie, Boîte de parchemins, 3 koku",
        techniques: [
          { rank: 1, name: "L'Œil Purificateur", effect: "Affinité : Terre. Déficience : Air. Vous détectez la Souillure chez toute créature à moins de 9 m. Vos sorts de Terre infligent +1g1 de dégâts supplémentaires aux cibles portant au moins 1 point de Souillure." },
          { rank: 2, name: "La Voie de la Barrière", effect: "Vos sorts de protection de Terre augmentent de +5 le ND d'Armure des bénéficiaires contre les créatures de l'Outremonde." },
          { rank: 3, name: "La Poigne Minérale", effect: "Lancer un sort de Terre de Rang de Maîtrise 1 ou 2 dont le temps d'incantation est d'une Action Complexe devient une Action Simple." },
          { rank: 4, name: "La Frappe Purificatrice", effect: "Les créatures de l'Outremonde ciblées par vos sorts de dégâts voient leur Armure et leur Réduction ignorées." },
          { rank: 5, name: "La Colère de la Terre", effect: "Dépensez 1 point de Vide : double la zone d'effet ou la durée d'un sort de Terre lancé ce round." }
        ]
      },

      // ÉCOLE COURTISAN YASUKI (Core p. 107)
      {
        id: "courtisan-yasuki",
        family: "Yasuki",
        name: "Courtisan Yasuki",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.5,
        skills: ["Art de la Scène (Conteur)", "Artisanat", "Commerce (Évaluation)", "Courtisan", "Enquête", "Étiquette", "Sincérité (Tromperie)"],
        outfit: "Kimono de voyage résistant et soigné, Wakizashi, Sacoche de marchandises, Bourse de koku, 10 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Carpe", effect: "Vous jaugez d'instinct la valeur marchande exacte de tout bien et les désirs financiers d'un interlocuteur. Vous gagnez +1g1 à vos jets de Commerce et de Courtisan lors d'accords matériels." },
          { rank: 2, name: "La Ruse du Marchand", effect: "Vous gagnez une Augmentation Gratuite sur tous vos jets de Tentation et d'Intimidation subtile en cour." },
          { rank: 3, name: "L'Or du Mur", effect: "Réduit de 10 points le ND des faveurs sollicitées auprès de clans marchands ou de magistrats." },
          { rank: 4, name: "Les Ficelles de la Bourse", effect: "Vous pouvez relancer deux dés sur tous vos jets de compétences Marchandes ou Sociales." },
          { rank: 5, name: "La Fortune Souffle où Elle Veut", effect: "Dépensez 1 point de Vide pour paralyser les lignes de crédit et l'approvisionnement d'un rival, ruinant ses alliances en cour." }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. CLAN DE LA GRUE
  // =========================================================================
  grue: {
    name: "Clan de la Grue",
    families: [
      { name: "Kakita", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Doji", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Daidoji", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Asahina", trait: "Intelligence", bonus: "+1 Intelligence" }
    ],
    schools: [
      // ÉCOLE BUSHI KAKITA (DUELLISTE) (Core p. 109)
      {
        id: "duelliste-kakita",
        family: "Kakita",
        name: "Bushi Kakita (Duelliste)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 6.5,
        skills: ["Art de la Scène", "Courtisan", "Défense", "Étiquette", "Iaijutsu", "Kenjutsu", "Sincérité"],
        outfit: "Kimono raffiné brodé, Daisho de maître, Nécessaire d'entretien, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Grue", effect: "Vous ajoutez le double de votre rang de compétence Iaijutsu (+Iaijutsu × 2) à vos jets d'Initiative. En posture du Centre, vous gagnez +1g1 + Rang d'École à votre prochain jet d'attaque ou de Concentration." },
          { rank: 2, name: "La Frappe Soudaine", effect: "Lors d'un duel ou d'une escarmouche, lorsque vous attaquez un adversaire dont l'Initiative est inférieure à la vôtre, vous gagnez un bonus de +2g0 à votre jet d'attaque." },
          { rank: 3, name: "La Frappe de l'Esprit", effect: "Porter une attaque devient une Action Simple lorsque vous maniez une arme possédant le mot-clé Samouraï." },
          { rank: 4, name: "Une Frappe, Deux Entailles", effect: "Lors de la phase de Concentration d'un duel d'Iaijutsu, vous n'avez besoin que d'une marge de victoire de 3 (au lieu de 5) pour remporter une Augmentation Gratuite." },
          { rank: 5, name: "La Frappe Ultime", effect: "Vous pouvez adopter la posture du Centre et effectuer malgré tout une Action Simple d'attaque lors du même tour. En duel, si vous subissez un coup mortel, vous portez votre frappe au même instant avant de tomber." }
        ]
      },

      // ÉCOLE COURTISAN DOJI (Core p. 110-111)
      {
        id: "courtisan-doji",
        family: "Doji",
        name: "Courtisan Doji",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Cérémonie du Thé", "Courtisan (Manipulation)", "Étiquette (Courtoisie)", "Sincérité (Honnêteté)", "Une compétence d'Art de la Scène", "Deux compétences Nobles au choix"],
        outfit: "Kimono de cour somptueux en soie Doji, Wakizashi, Nécessaire d'écriture calligraphique, 10 koku",
        techniques: [
          { rank: 1, name: "Le Don de la Grâce", effect: "Vous reconnaissez d'instinct le rang d'Honneur et de Statut exacts de toute personne rencontrée. Vous réduisez de 5 le ND de toutes les faveurs et requêtes polies formulées en cour." },
          { rank: 2, name: "La Douce Vérité", effect: "Vous gagnez une Augmentation Gratuite sur tous vos jets de Courtisan et d'Étiquette lorsqu'ils font appel à l'Honnêteté ou la Courtoisie." },
          { rank: 3, name: "L'Épreuve d'Honneur", effect: "En joute verbale, vous forcez un rival à tester sa Volonté contre votre jet de Courtisan sous peine de perdre 1 point de Statut ou d'Honneur." },
          { rank: 4, name: "Mille Murmures dans l'Ombre", effect: "Immunité totale contre la perte de Gloire résultant des intrigues ou calomnies adverses." },
          { rank: 5, name: "La Voix de l'Empereur", effect: "Dépensez 1 point de Vide : quiconque souhaite vous attaquer ou agir contre vous en cour doit réussir un jet de Volonté opposé à votre Statut sous peine de renoncer." }
        ]
      },

      // ÉCOLE GUERRIER DAIDOJI (Core p. 111)
      {
        id: "guerrier-daidoji",
        family: "Daidoji",
        name: "Guerrier Daidoji (Grue de Fer)",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 5.5,
        skills: ["Armes d'Hast (Naginata)", "Athlétisme", "Bataille", "Défense", "Iaijutsu", "Kenjutsu (Katana)", "Une compétence Bugei au choix"],
        outfit: "Armure lourde Daidoji laquée de gris, Daisho, Naginata ou Lance Yari, Nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Force de l'Honneur", effect: "Vous utilisez votre Rang d'Honneur à la place de votre Anneau de Terre pour déterminer le nombre de PV de vos Paliers de Blessures (si votre Honneur est supérieur). Lorsqu'un allié adjacent est attaqué, vous pouvez ajouter +5 à son ND d'Armure en Action Gratuite." },
          { rank: 2, name: "Le Feu Intérieur", effect: "Si vous choisissez la posture de Défense Totale pendant un round, vous remportez automatiquement la plus haute Initiative du round suivant, sans jet de dés." },
          { rank: 3, name: "La Forêt d'Acier", effect: "Porter une attaque devient une Action Simple avec les sabres, armes d'hast ou lances." },
          { rank: 4, name: "La Vigueur de la Grue", effect: "Vous ajoutez votre Rang d'Honneur au résultat de tous vos jets de dégâts au corps-à-corps." },
          { rank: 5, name: "Le Rempart Vivant", effect: "Lorsqu'un allié à portée de mouvement est ciblé par une attaque, vous dépensez 1 point de Vide pour intercepter le coup. L'attaque vous frappe à sa place, mais tous les dégâts sont réduits de moitié après application de votre Réduction." }
        ]
      },

      // ÉCOLE SHUGENJA ASAHINA (Core p. 110)
      {
        id: "shugenja-asahina",
        family: "Asahina",
        name: "Shugenja Asahina",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        skills: ["Artisanat (Origami)", "Calligraphie", "Cérémonie du Thé", "Connaissance : Théologie", "Méditation", "Sincérité", "Une compétence Noble au choix"],
        outfit: "Robes blanches monastiques, Wakizashi, Nécessaire de calligraphie et d'origami sacré, 4 koku",
        techniques: [
          { rank: 1, name: "L'Âme Paisible", effect: "Affinité : Air. Déficience : Feu. Vous gagnez une Augmentation Gratuite sur tous les sorts d'Air qui n'infligent pas de dégâts directs, ainsi que sur tous les sorts de soins et de protection spirituelle." },
          { rank: 2, name: "Le Souffle Apaisant", effect: "Vous pouvez calmer les émotions belliqueuses dans un rayon de 9 mètres par un jet d'Air / Sincérité opposé." },
          { rank: 3, name: "L'Envol de l'Esprit", effect: "Lancer un sort de communication ou d'illusion d'Air devient une Action Simple." },
          { rank: 4, name: "L'Harmonie Céleste", effect: "Confère un bonus de +5 au ND d'Armure de tous les alliés sous votre garde spirituelle." },
          { rank: 5, name: "La Bénédiction de Dame Doji", effect: "Dépensez 1 point de Vide : annule tous les dégâts infligés par un sort élémentaire à proximité." }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. CLAN DU DRAGON
  // =========================================================================
  dragon: {
    name: "Clan du Dragon",
    families: [
      { name: "Mirumoto", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Kitsuki", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Tamori", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Togashi", trait: "Réflexes", bonus: "+1 Réflexes" }
    ],
    schools: [
      // ÉCOLE BUSHI MIRUMOTO (Core p. 112-113)
      {
        id: "bushi-mirumoto",
        family: "Mirumoto",
        name: "Bushi Mirumoto",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Défense", "Iaijutsu", "Kenjutsu (Katana)", "Kenjutsu (Wakizashi)", "Connaissance : Théologie", "Méditation", "Une compétence Bugei au choix"],
        outfit: "Armure légère ou lourde, Daisho Mirumoto, Nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Dragon", effect: "Vous maniez simultanément le katana en main principale et le wakizashi en main secondaire sans pénalité de main faible. Vous ajoutez votre rang de compétence Kenjutsu (Wakizashi) à votre ND d'Armure en permanence." },
          { rank: 2, name: "Les Racines de la Montagne", effect: "Vous ne pouvez jamais être désarmé. De plus, vous ignorez totalement les pénalités de déplacement ou de combat dues aux terrains difficiles ou accidentés." },
          { rank: 3, name: "L'Eau Tournoyante", effect: "Porter une attaque devient une Action Simple lorsque vous combattez avec vos deux lames (katana et wakizashi)." },
          { rank: 4, name: "Représailles Furieuses", effect: "Lors de l'Étape de Réactions, vous pouvez désigner un adversaire qui vous a attaqué ce round. Durant votre prochain tour, vous gagnez un bonus de +3k0 à tous vos jets d'attaque contre cette cible." },
          { rank: 5, name: "Le Cœur du Dragon", effect: "Si vous attaquez deux fois lors de votre tour en maniant le katana et le wakizashi, vous pouvez effectuer une troisième attaque immédiate avec votre main secondaire en tant qu'Action Gratuite." }
        ]
      },

      // ÉCOLE ENQUÊTEUR KITSUKI (Core p. 114)
      {
        id: "magistrat-kitsuki",
        family: "Kitsuki",
        name: "Enquêteur Kitsuki",
        type: "Courtisan",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 5.5,
        skills: ["Courtisan", "Défense", "Droit", "Enquête (Recherche)", "Étiquette", "Kenjutsu", "Sincérité"],
        outfit: "Kimono de magistrat, Daisho, Nécessaire d'enquête et carnet d'indices, 5 koku",
        techniques: [
          { rank: 1, name: "La Méthode Kitsuki", effect: "Vous gagnez +1k1 sur tous vos jets d'Enquête. Vous pouvez dépenser 1 point de Vide pour doubler vos dés gardés sur un jet d'Observation ou pour analyser logiquement la véracité d'un témoignage." },
          { rank: 2, name: "Le Doute Méthodique", effect: "Vous gagnez un bonus de +2g0 pour résister à toutes les tromperies, illusions et manipulations mentales." },
          { rank: 3, name: "L'Évidence Irréfutable", effect: "Présenter une preuve matérielle impose un malus de -10 au Statut adverse pour la contester." },
          { rank: 4, name: "Regard Pénétrant", effect: "Vous ajoutez votre rang de compétence Enquête à votre Initiative." },
          { rank: 5, name: "La Vérité Nue", effect: "Dépensez 1 point de Vide : forcez un suspect à confesser ses actes s'il échoue à un jet de Volonté opposé à votre Perception." }
        ]
      },

      // ORDRE TATOUÉ TOGASHI (Core p. 114-115)
      {
        id: "moine-togashi",
        family: "Togashi",
        name: "Ordre Tatoué Togashi (Ise Zumi)",
        type: "Moine",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 4.5,
        skills: ["Athlétisme", "Connaissance : Théologie", "Défense", "Jiujutsu", "Méditation", "Art de la Scène (Récit)", "Une compétence Noble ou Bugei"],
        outfit: "Robes monastiques simples, Bâton Bo ou combat à mains nues, Bol à aumônes, 1 koku",
        techniques: [
          { rank: 1, name: "Le Sang du Dragon", effect: "Vous recevez deux Tatouages magiques de l'Ordre Togashi. Vous apprenez un nouveau Tatouage à chaque Rang d'École supplémentaire (Rangs 2, 3, 4 et 5). Vos frappes à mains nues (Jiujutsu) infligent des dégâts de base de 0g2 (au lieu de 0g1)." },
          { rank: 2, name: "L'Endurance du Roc", effect: "Vous gagnez +1g1 sur tous vos jets d'attaque et de dégâts à mains nues (Jiujutsu). Obtention du 3e Tatouage." },
          { rank: 3, name: "L'Harmonie du Souffle", effect: "Attaquer à mains nues devient une Action Simple. Obtention du 4e Tatouage." },
          { rank: 4, name: "La Transcendance de la Chair", effect: "Vous ignorez les malus de blessures jusqu'au palier Inconscient. Obtention du 5e Tatouage." },
          { rank: 5, name: "L'Éveil du Dragon", effect: "Dépensez 1 point de Vide pour activer simultanément 3 tatouages durant 3 rounds. Obtention du 6e Tatouage." }
        ]
      },

      // ÉCOLE SHUGENJA TAMORI (Core p. 113)
      {
        id: "shugenja-tamori",
        family: "Tamori",
        name: "Shugenja Tamori",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 4.5,
        skills: ["Artisanat (Alchimie)", "Athlétisme", "Calligraphie", "Connaissance : Théologie", "Défense", "Kenjutsu", "Méditation"],
        outfit: "Robes robustes de montagne, Daisho, Fioles d'alchimie préparées, 3 koku",
        techniques: [
          { rank: 1, name: "Le Chaudron des Kami", effect: "Affinité : Terre. Déficience : Air. Vous pouvez emprisonner l'effet d'un sort de Terre ou de Feu dans une fiole d'argile ou potion alchimique. Briser la fiole libère instantanément le sort sans incantation." },
          { rank: 2, name: "La Fureur Volcanique", effect: "Ajoute +1g0 à tous vos sorts offensifs de Terre et de Feu." },
          { rank: 3, name: "La Pierre Foudroyante", effect: "Lancer ou briser vos potions au combat devient une Action Simple." },
          { rank: 4, name: "L'Écorce Minérale", effect: "Gagne une Réduction de dégâts de 3 lorsque vous bénéficiez d'un sort de Terre personnel." },
          { rank: 5, name: "L'Éruption des Cimes", effect: "Dépensez 1 point de Vide pour déclencher une onde de choc tellurique infligeant 5g3 sur 6 mètres de rayon." }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. CLAN DU LION
  // =========================================================================
  lion: {
    name: "Clan du Lion",
    families: [
      { name: "Akodo", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Matsu", trait: "Force", bonus: "+1 Force" },
      { name: "Ikoma", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Kitsu", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      // ÉCOLE BUSHI AKODO (Core p. 117)
      {
        id: "bushi-akodo",
        family: "Akodo",
        name: "Bushi Akodo",
        type: "Bushi",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 6.5,
        skills: ["Bataille", "Défense", "Iaijutsu", "Kenjutsu (Katana)", "Kyujutsu", "Connaissance : Histoire", "Sincérité"],
        outfit: "Armure lourde Lion laquée d'or et marron, Daisho, Arc Yumi avec 20 flèches, Nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Lion", effect: "Lorsque vous portez une attaque au sabre, vous pouvez relancer tous les dés de votre jet d'attaque dont le résultat est inférieur ou égal à votre Rang d'Honneur. Vous devez conserver les nouveaux résultats." },
          { rank: 2, name: "La Force de la Certitude", effect: "Vous ajoutez votre Rang d'Honneur au total de tous vos jets de Volonté pour résister à la Peur, aux manœuvres d'intimidation ou à la tentation." },
          { rank: 3, name: "Vif comme le Vent", effect: "Porter une attaque devient une Action Simple lorsque vous maniez une arme possédant le mot-clé Samouraï." },
          { rank: 4, name: "Le Rugissement d'Akodo", effect: "Une fois par round, après avoir réussi une attaque au corps-à-corps, vous poussez un cri de ralliement qui accorde un bonus de +1g0 au prochain jet d'attaque de tous vos alliés situés à moins de 9 mètres." },
          { rank: 5, name: "La Victoire Finale", effect: "Une fois par round, vous pouvez dépenser 1 point de Vide pour ajouter deux fois votre Rang d'Honneur (+Honneur × 2) au total d'un jet de compétence de Bugei ou d'un jet de dégâts." }
        ]
      },

      // ÉCOLE BERSERKER MATSU (Core p. 119)
      {
        id: "bushi-matsu",
        family: "Matsu",
        name: "Berserker Matsu",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 6.5,
        skills: ["Athlétisme", "Bataille", "Défense", "Jiujutsu", "Kenjutsu", "Kyujutsu", "Une compétence Bugei au choix"],
        outfit: "Armure lourde rouge et or, Daisho, Nécessaire de guerre, 3 koku",
        techniques: [
          { rank: 1, name: "Le Rugissement du Lion", effect: "En posture d'Attaque Totale, vous ajoutez votre Rang d'Honneur à tous vos jets de dégâts. Vous gagnez de plus un bonus de +1g0 pour résister à la Peur." },
          { rank: 2, name: "La Charge de Matsu", effect: "Lorsque vous effectuez une Charge, vous ignorez les pénalités de terrain difficile et gagnez un bonus de +1g1 à votre jet d'attaque." },
          { rank: 3, name: "Dévotion Féroce", effect: "Porter une attaque devient une Action Simple lorsque vous avez adopté la posture d'Attaque Totale." },
          { rank: 4, name: "Les Griffes du Lion", effect: "Une fois par round, si votre attaque réduit un adversaire au palier Inconscient ou Mortel, vous pouvez effectuer immédiatement une attaque supplémentaire gratuite contre un ennemi adjacent." },
          { rank: 5, name: "Le Courage de Matsu", effect: "Tant que vous combattez en posture d'Attaque Totale, vous ignorez totalement tous les malus de blessures." }
        ]
      },

      // ÉCOLE BARDE IKOMA (Core p. 118-119)
      {
        id: "barde-ikoma",
        family: "Ikoma",
        name: "Barde Ikoma",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        skills: ["Art de la Scène (Conteur)", "Bataille", "Cérémonie du Thé", "Connaissance : Histoire", "Courtisan", "Étiquette", "Sincérité"],
        outfit: "Vêtements nobles aux armoiries du Lion, Wakizashi, Tambour ou Biwa traditionnel, Nécessaire d'écriture, 5 koku",
        techniques: [
          { rank: 1, name: "La Voix de la Gloire", effect: "Vous captivez votre auditoire par les chroniques des ancêtres. Vous gagnez un bonus de +1g1 sur vos jets d'Art de la Scène et d'Oratoire. D'une harangue martiale, vous accordez +1g0 à la résistance à la Peur de vos alliés." },
          { rank: 2, name: "La Voix des Héros", effect: "Vous gagnez une Augmentation Gratuite sur tous vos jets de Courtisan face à des samouraïs ayant un Rang d'Honneur d'au moins 4.0." },
          { rank: 3, name: "La Flamme Inaltérable", effect: "Vos compagnons de bataille sont totalement immunisés contre la panique en combat de masse." },
          { rank: 4, name: "La Gloire Partagée", effect: "Vous pouvez transférer temporairement des points de Gloire à un allié méritant pour rehausser son statut en cour." },
          { rank: 5, name: "Le Dit des Mille Générations", effect: "Dépensez 1 point de Vide : invoquez l'esprit d'un aïeul légendaire pour réussir automatiquement un test d'histoire ou de tactique." }
        ]
      },

      // ÉCOLE SHUGENJA KITSU (Core p. 117)
      {
        id: "shugenja-kitsu",
        family: "Kitsu",
        name: "Shugenja Kitsu (Sodan-Senzo)",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 6.5,
        skills: ["Calligraphie", "Connaissance : Histoire", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Sincérité"],
        outfit: "Robes traditionnelles ocre et or, Wakizashi, Bâton de pèlerin, Parchemins ancestraux, 3 koku",
        techniques: [
          { rank: 1, name: "Le Regard des Esprits", effect: "Affinité : Eau. Déficience : Feu. Vous pouvez percevoir et converser avec les esprits des défunts vertueux (Sodan-Senzo). Vous gagnez une Augmentation Gratuite sur tous les sorts d'Eau liés à la divination, la mémoire ou l'histoire." },
          { rank: 2, name: "La Force des Aïeux", effect: "Vous gagnez +2g0 sur une compétence Bugei pendant 3 rounds en invoquant les exploits d'un aïeul." },
          { rank: 3, name: "Le Fleuve Spirituel", effect: "Lancer un sort de perception ou de mémoire d'Eau devient une Action Simple." },
          { rank: 4, name: "L'Appel aux Braves", effect: "Invoque un esprit guerrier pour dévier un coup critique porté à un allié." },
          { rank: 5, name: "L'Armée des Ombres Épiques", effect: "Dépensez 1 point de Vide pour matérialiser les mânes des guerriers du Lion, désorientant l'armée ennemie." }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. CLAN DE LA MANTE
  // =========================================================================
  mante: {
    name: "Clan de la Mante",
    families: [
      { name: "Yoritomo", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Tsuruchi", trait: "Perception", bonus: "+1 Perception" },
      { name: "Moshi", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Kitsune", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      // ÉCOLE BUSHI YORITOMO (Core p. 120-121)
      {
        id: "bushi-yoritomo",
        family: "Yoritomo",
        name: "Bushi Yoritomo",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 2.5,
        skills: ["Armes de Paysan (Kama)", "Athlétisme", "Bataille", "Commerce", "Défense", "Kenjutsu", "Navigation"],
        outfit: "Armure légère de cuir laqué marin, Paire de Kama, Katana, Nécessaire de navigation, 5 koku",
        techniques: [
          { rank: 1, name: "La Fureur de la Tempête", effect: "Vous maniez deux armes sans malus de main faible lorsqu'il s'agit d'armes de paysan ou de petites armes. Si vous vous déplacez d'au moins 1,5 m durant votre tour, vous gagnez +10 à votre ND d'Armure jusqu'à votre prochain tour." },
          { rank: 2, name: "Le Pied Marin", effect: "Vous ne perdez jamais l'équilibre et ignorez toutes les pénalités de déplacement liées aux surfaces instables (ponts de navires, cordages, boue, récifs)." },
          { rank: 3, name: "L'Assaut de la Mante", effect: "Porter une attaque devient une Action Simple lorsque vous maniez des armes de paysan ou deux armes simultanément." },
          { rank: 4, name: "La Vague Déferlante", effect: "Si vous vous êtes déplacé d'au moins 1,5 m ce tour, vous pouvez renoncer à votre bonus de +10 au ND d'Armure pour gagner 2 Augmentations Gratuites utilisables exclusivement pour la manœuvre Renversement (Knockdown)." },
          { rank: 5, name: "La Main d'Osano-Wo", effect: "Dépensez 1 point de Vide en Action Gratuite : vous gardez un nombre de dés de dégâts supplémentaire égal à votre Force (+Force dés gardés). Si la cible est à terre, vous infligez +0g2 supplémentaire." }
        ]
      },

      // ÉCOLE ARCHER TSURUCHI (Core p. 122)
      {
        id: "archer-tsuruchi",
        family: "Tsuruchi",
        name: "Archer Tsuruchi",
        type: "Bushi",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse (Pistage)", "Défense", "Discrétion", "Enquête", "Kyujutsu", "Une compétence Bugei au choix"],
        outfit: "Arc Yumi de maître, Carquois de 30 flèches variées, Daisho, Nécessaire d'archer, 3 koku",
        techniques: [
          { rank: 1, name: "Toujours Prêt", effect: "Encocher une flèche devient une Action Gratuite. Vous ne subissez aucune pénalité de portée lorsque vous tirez à l'arc à portée normale ou moyenne." },
          { rank: 2, name: "Vol sans Pensée", effect: "Vous ajoutez votre rang de compétence Kyujutsu au total de tous vos jets de dégâts à l'arc." },
          { rank: 3, name: "La Flèche Vole", effect: "Effectuer une attaque à distance avec un arc devient une Action Simple (permettant deux tirs complets par tour)." },
          { rank: 4, name: "La Cible Percée", effect: "Toutes vos flèches ignorent l'équivalent de 5 points de Réduction ou de protection d'armure de la cible." },
          { rank: 5, name: "L'Œil de Tsuruchi", effect: "Vous pouvez effectuer une attaque à distance en Action Complexe : vous gagnez un bonus massif de +4k1 au jet d'attaque et au jet de dégâts de cette flèche." }
        ]
      },

      // ÉCOLE COURTISAN YORITOMO (Core p. 121)
      {
        id: "courtisan-yoritomo",
        family: "Yoritomo",
        name: "Courtisan Yoritomo",
        type: "Courtisan",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Commerce", "Courtisan", "Défense", "Étiquette", "Intimidation", "Sincérité", "Une compétence Marchande ou Bugei"],
        outfit: "Vêtements de cour luxueux bordés d'or insulaire, Wakizashi, Éventail orné, 10 koku",
        techniques: [
          { rank: 1, name: "Le Prix du Pouvoir", effect: "Vous utilisez votre Volonté à la place de l'Intuition pour vos jets de Commerce et d'Intimidation. Vous pouvez jauger le prix de corruption d'un interlocuteur et exploiter ses désirs matériels." },
          { rank: 2, name: "L'Audace des Mers", effect: "Vous gagnez une Augmentation Gratuite sur vos jets de Commerce et d'Intimidation face à des samouraïs d'Honneur supérieur." },
          { rank: 3, name: "La Pression Financière", effect: "Vous pouvez imposer un malus de -1g1 aux jets sociaux d'un rival en contrôlant ses créanciers." },
          { rank: 4, name: "Le Monopole", effect: "Immunité contre toute manœuvre visant à bloquer vos avoirs ou confisquer vos biens marchands." },
          { rank: 5, name: "L'Alliance Incontournable", effect: "Dépensez 1 point de Vide : forcez un noble à signer un pacte économique sous peine de sanctions commerciales dévastatrices." }
        ]
      },

      // ÉCOLE SHUGENJA MOSHI (Core p. 120)
      {
        id: "shugenja-moshi",
        family: "Moshi",
        name: "Shugenja Moshi (Filles du Soleil)",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 5.5,
        skills: ["Astrologie", "Calligraphie", "Cérémonie du Thé", "Connaissance : Théologie", "Méditation", "Navigation", "Une compétence Noble"],
        outfit: "Robes blanches et safran de prêtresse solaire, Bâton Bo ou Tanto, Miroir solaire de bronze, 4 koku",
        techniques: [
          { rank: 1, name: "La Ferveur Solaire", effect: "Affinité : Feu (ou Air). Déficience : Eau. Vous gagnez une Augmentation Gratuite sur tous les sorts invoquant la lumière, la chaleur ou la purification céleste." },
          { rank: 2, name: "La Danse de l'Aurore", effect: "Vous pouvez aveugler temporairement vos assaillants d'un jet d'Intelligence / Méditation." },
          { rank: 3, name: "L'Éclair Céleste", effect: "Lancer un sort de Feu de Maîtrise 1 ou 2 devient une Action Simple." },
          { rank: 4, name: "Les Rayons Purificateurs", effect: "Vos sorts de Feu ignorent la résistance magique et la Réduction des créatures souillées." },
          { rank: 5, name: "La Colère de Dame Soleil", effect: "Dépensez 1 point de Vide pour déclencher un faisceau de lumière solaire infligeant 6g3 brûlures sur 20 mètres." }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. CLAN DU PHÉNIX
  // =========================================================================
  phenix: {
    name: "Clan du Phénix",
    families: [
      { name: "Isawa", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Shiba", trait: "Perception", bonus: "+1 Perception" },
      { name: "Asako", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Agasha", trait: "Perception", bonus: "+1 Perception" }
    ],
    schools: [
      // ÉCOLE BUSHI SHIBA (Core p. 123)
      {
        id: "bushi-shiba",
        family: "Shiba",
        name: "Bushi Shiba (Yojimbo)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Armes d'Hast (Yari)", "Athlétisme", "Défense", "Iaijutsu", "Kenjutsu", "Méditation", "Connaissance : Théologie"],
        outfit: "Armure lourde Phénix, Daisho, Lance Yari, Nécessaire d'entretien, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Phénix", effect: "Vous pouvez dépenser 2 points de Vide sur un même jet pour bénéficier d'un bonus de +2g2 (au lieu de +1g1). De plus, lorsque vous protégez un allié adjacent, vous prenez une Action Gratuite pour ajouter +5 à son ND d'Armure." },
          { rank: 2, name: "La Danse des Éléments", effect: "Lorsqu'un shugenja allié à portée de voix lance un sort, vous pouvez augmenter ou réduire le ND de lancement de ce sort de 5 points." },
          { rank: 3, name: "Le Bouclier de Shiba", effect: "Porter une attaque devient une Action Simple lorsque vous maniez une arme d'hast, une lance ou une arme possédant le mot-clé Samouraï." },
          { rank: 4, name: "La Victoire Inévitable", effect: "Si une attaque devait vous faire basculer au palier Inconscient, Hors de Combat ou Mortel, vous pouvez dépenser 1 point de Vide pour ignorer entièrement les dégâts de cette attaque." },
          { rank: 5, name: "La Touche du Vide", effect: "Une fois par combat, vous pouvez dépenser 1 point de Vide pour porter une attaque de mêlée qui ignore totalement l'armure et la Réduction de la cible." }
        ]
      },

      // ÉCOLE SHUGENJA ISAWA (Core p. 124)
      {
        id: "shugenja-isawa",
        family: "Isawa",
        name: "Shugenja Isawa",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 4.5,
        skills: ["Calligraphie", "Connaissance : Histoire", "Connaissance : Théologie", "Méditation", "Spellcraft", "Deux compétences Nobles au choix"],
        outfit: "Robes somptueuses brodées de flammes, Wakizashi, Étui de parchemins sacrés, 5 koku",
        techniques: [
          { rank: 1, name: "Les Maîtres des Éléments", effect: "Affinité : Au choix (Air, Terre, Feu ou Eau). Aucune Déficience. Vous gagnez une Augmentation Gratuite sur tous les sorts de votre élément d'affinité. Vous pouvez acquérir l'Avantage Ishiken-do (Magie du Vide) pour 8 XP." },
          { rank: 2, name: "La Voix de la Création", effect: "Vous pouvez relancer un dé sur n'importe quel jet d'incantation de sort." },
          { rank: 3, name: "Le Flux Élémentaire", effect: "Lancer un sort de votre élément d'affinité de Maîtrise 1 ou 2 devient une Action Simple." },
          { rank: 4, name: "La Fusion Cosmique", effect: "Vous augmentez la portée et la durée de tous vos sorts élémentaires de 50 %." },
          { rank: 5, name: "L'Apothéose Élémentaire", effect: "Dépensez 1 point de Vide pour convertir un emplacement de sort dans n'importe quel autre élément sans subir de malus." }
        ]
      },

      // ÉCOLE ÉRUDIT ASAKO (Core p. 124-125)
      {
        id: "erudit-asako",
        family: "Asako",
        name: "Érudit Asako (Loremaster)",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 5.5,
        skills: ["Cérémonie du Thé", "Connaissance : Histoire", "Connaissance : Théologie", "Courtisan", "Enquête", "Étiquette", "Sincérité"],
        outfit: "Robes sobres de lettré, Wakizashi, Nécessaire de calligraphie, Bibliothèque portative, 5 koku",
        techniques: [
          { rank: 1, name: "Le Don du Savoir", effect: "Vous gagnez une Augmentation Gratuite sur tous les jets utilisant une compétence de Connaissance (Lore). Vous pouvez dépenser 1 point de Vide pour relancer un jet de Connaissance ou de Mémoire." },
          { rank: 2, name: "La Vérité du Monde", effect: "Vous ajoutez votre rang d'Intelligence à tous vos jets de compétences sociales lorsqu'il s'agit de résoudre un dilemme historique ou philosophique." },
          { rank: 3, name: "La Voix de l'Ancien", effect: "Vous pouvez déduire les failles morales ou les scandales cachés d'une lignée rivale en étudiant ses annales." },
          { rank: 4, name: "L'Esprit Inaltérable", effect: "Immunité totale contre la Peur, la Tentation et les tentatives de déstabilisation oratoire." },
          { rank: 5, name: "La Sagesse des Âges", effect: "Vous gagnez un bonus permanent de +5k0 au total de tous vos jets de compétences de Connaissance (Lore)." }
        ]
      },

      // ÉCOLE SHUGENJA AGASHA (Core p. 125)
      {
        id: "shugenja-agasha",
        family: "Agasha",
        name: "Shugenja Agasha",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 4.5,
        skills: ["Artisanat (Alchimie)", "Calligraphie", "Connaissance : Théologie", "Défense", "Méditation", "Spellcraft", "Une compétence Noble au choix"],
        outfit: "Robes de voyage pourpres et or, Wakizashi, Fioles d'alchimiste, Nécessaire de parchemins, 4 koku",
        techniques: [
          { rank: 1, name: "La Transmutation Élémentaire", effect: "Affinité : Feu. Déficience : Eau. Vous pouvez dépenser un emplacement de sort d'un élément pour lancer un sort d'un autre élément en effectuant deux Augmentations lors de l'incantation." },
          { rank: 2, name: "L'Harmonie du Creuset", effect: "Vous gagnez une Augmentation Gratuite sur tous vos jets d'Artisanat (Alchimie)." },
          { rank: 3, name: "Le Mélange Énergétique", effect: "Lancer un sort de Feu de Maîtrise 1 ou 2 devient une Action Simple." },
          { rank: 4, name: "La Vague Alchimique", effect: "Double la zone d'effet de vos préparations ou sorts élémentaires de transmutation." },
          { rank: 5, name: "Le Secret des Deux Éléments", effect: "Dépensez 1 point de Vide : invoquez les effets conjoints d'un sort de Feu et d'un sort de Terre dans la même action." }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. CLAN DU SCORPION
  // =========================================================================
  scorpion: {
    name: "Clan du Scorpion",
    families: [
      { name: "Bayushi", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Shosuro", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Soshi", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Yogo", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      // ÉCOLE BUSHI BAYUSHI (Core p. 126-127)
      {
        id: "bushi-bayushi",
        family: "Bayushi",
        name: "Bushi Bayushi",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 2.5,
        skills: ["Art de la Scène (Comédie)", "Défense", "Discrétion", "Iaijutsu", "Kenjutsu", "Sincérité (Tromperie)", "Une compétence Bugei au choix"],
        outfit: "Armure légère noire et pourpre, Masque personnel laqué, Daisho, Nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Scorpion", effect: "Vous ajoutez votre rang de compétence Iaijutsu à votre jet d'Initiative. Lorsque vous effectuez une Feinte en combat, le ND d'Armure de la cible est réduit d'une valeur supplémentaire égale à votre Agilité." },
          { rank: 2, name: "Frapper depuis l'Ombre", effect: "Lorsque vous attaquez un adversaire dont le résultat d'Initiative est inférieur au vôtre, vous gagnez un bonus de +1k0 à votre jet d'attaque." },
          { rank: 3, name: "L'Ombre Rapide", effect: "Porter une attaque devient une Action Simple lorsque vous maniez une arme possédant le mot-clé Samouraï." },
          { rank: 4, name: "Frapper d'en Haut, Frapper d'en Bas", effect: "Vous pouvez effectuer toutes vos attaques de mêlée sous la forme d'Actions Simples, quelle que soit l'arme utilisée." },
          { rank: 5, name: "Les Pinces Retiennent, la Queue Frappe", effect: "Une fois par combat en Action Complexe, portez une attaque de mêlée : si elle réussit, la cible est Étourdie (Stunned) jusqu'à ce qu'elle réussisse un jet de Terre contre le montant des blessures infligées." }
        ]
      },

      // ÉCOLE COURTISAN BAYUSHI (Core p. 127)
      {
        id: "courtisan-bayushi",
        family: "Bayushi",
        name: "Courtisan Bayushi",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.5,
        skills: ["Art de la Scène (Comédie)", "Courtisan (Manipulation)", "Enquête", "Étiquette", "Intimidation", "Séduction", "Sincérité (Tromperie)"],
        outfit: "Kimono de cour rouge sombre et noir, Masque raffiné, Wakizashi, 8 koku",
        techniques: [
          { rank: 1, name: "Les Faiblesses du Cœur", effect: "Vous identifiez les Désavantages sociaux et mentaux d'un rival d'un jet d'Intuition / Courtisan opposé à sa Volonté. Vous réduisez de 5 le ND de vos manœuvres de manipulation en exploitant ses failles." },
          { rank: 2, name: "Le Filet Invisible", effect: "Vous gagnez +2g0 à tous vos jets de chantage et d'intimidation voilée." },
          { rank: 3, name: "Le Poison de la Rumeur", effect: "Vous pouvez détruire 1 point de Gloire d'un rival en répandant une rumeur indétectable." },
          { rank: 4, name: "L'Armure du Secret", effect: "Immunité totale contre les jets d'enquête visant à découvrir vos propres intrigues." },
          { rank: 5, name: "Le Maître des Pantins", effect: "Dépensez 1 point de Vide : forcez un interlocuteur compromis à obéir à une directive sous peine d'un scandale public déshonorant." }
        ]
      },

      // ÉCOLE INFILTRATEUR SHOSURO (Core p. 128)
      {
        id: "infiltrateur-shosuro",
        family: "Shosuro",
        name: "Infiltrateur Shosuro (Shinobi)",
        type: "Ninja",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 1.5,
        skills: ["Art de la Scène (Comédie)", "Athlétisme", "Discrétion (Furtivité)", "Enquête", "Kenjutsu (Ninja-to)", "Ninjutsu", "Tantojutsu"],
        outfit: "Tenue d'infiltrateur réversible sombre, Masque de gaze noire, Ninja-to, 3 Tanto, Nécessaire d'escalade, 2 koku",
        techniques: [
          { rank: 1, name: "Le Pas Silencieux", effect: "Vous gagnez un bonus de +1g1 sur tous vos jets de Discrétion. Toute attaque portée depuis l'invisibilité ou par surprise bénéficie d'une Augmentation Gratuite." },
          { rank: 2, name: "Une Ombre dans la Nuit", effect: "Vous pouvez entrer en Discrétion même sous observation directe si vous disposez d'un abri partiel ou de la pénombre." },
          { rank: 3, name: "Frappe Dissimulée", effect: "Porter une attaque avec une arme de Ninja ou une petite arme devient une Action Simple." },
          { rank: 4, name: "La Dague Empoisonnée", effect: "Vos attaques par surprise infligent +2g2 de dégâts supplémentaires et le ND pour résister à vos poisons augmente de 5." },
          { rank: 5, name: "Le Sommeil Sans Réveil", effect: "Après avoir réussi une frappe par surprise, vous pouvez dépenser 1 point de Vide pour forcer deux de vos dés de dégâts à afficher la valeur 10 sans exploser." }
        ]
      },

      // ÉCOLE SHUGENJA SOSHI (Core p. 127)
      {
        id: "shugenja-soshi",
        family: "Soshi",
        name: "Shugenja Soshi",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 2.5,
        skills: ["Calligraphie", "Connaissance : Théologie", "Courtisan", "Défense", "Discrétion", "Enquête", "Méditation"],
        outfit: "Robes sombres amples, Masque de gaze, Tanto, Boîte de parchemins secrets, 3 koku",
        techniques: [
          { rank: 1, name: "Le Voile des Murmures", effect: "Affinité : Air. Déficience : Terre. Vous gagnez une Augmentation Gratuite sur tous les sorts d'illusion, d'ombre et de silence." },
          { rank: 2, name: "L'Ombre Écoutante", effect: "Vous pouvez entendre distinctement les paroles prononcées dans une pièce fermée à 30 mètres de distance." },
          { rank: 3, name: "L'Effacement", effect: "Lancer un sort de dissimulation ou d'illusion d'Air devient une Action Simple." },
          { rank: 4, name: "La Brume Trompeuse", effect: "Vous créez des mirages désorientant les assaillants, augmentant votre ND d'Armure de +10." },
          { rank: 5, name: "Le Puits des Ténèbres", effect: "Dépensez 1 point de Vide pour plonger une zone de 15 mètres de rayon dans une obscurité magique totale impénétrable." }
        ]
      },

      // ÉCOLE MAÎTRE DES SCEAUX YOGO (The Great Clans p. 229)
      {
        id: "maitre-sceaux-yogo",
        family: "Yogo",
        name: "Maître des Sceaux Yogo",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Calligraphie (Sceaux)", "Connaissance : Outremonde", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Une compétence Noble au choix"],
        outfit: "Robes pourpres et noires aux caractères talismaniques, Masque rigide, Boîte de parchemins ofuda, 4 koku",
        techniques: [
          { rank: 1, name: "La Barrière Protectrice", effect: "Affinité : Terre. Déficience : Air. Vous gagnez une Augmentation Gratuite sur tous les sorts de protection et de scellement (Wards). Vous pouvez préparer des parchemins de scellement à l'avance pour les déployer en combat." },
          { rank: 2, name: "La Malédiction Domptée", effect: "Vous gagnez +2g0 pour résister à la Souillure et à toute forme de contrôle mental ou magique." },
          { rank: 3, name: "Le Sceau Instantané", effect: "Tracer et activer un sceau protecteur de Terre devient une Action Simple." },
          { rank: 4, name: "Le Mur d'Airain", effect: "Double la résistance physique et le seuil d'absorption de tous vos glyphes protecteurs." },
          { rank: 5, name: "La Prison Éternelle", effect: "Dépensez 1 point de Vide pour enfermer un oni, un esprit malveillant ou un sort ennemi dans un parchemin sacré." }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. CLAN DE LA LICORNE
  // =========================================================================
  licorne: {
    name: "Clan de la Licorne",
    families: [
      { name: "Moto", trait: "Force", bonus: "+1 Force" },
      { name: "Shinjo", trait: "Réflexes", bonus: "+1 Réflexes" },
      { name: "Utaku", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Iuchi", trait: "Perception", bonus: "+1 Perception" },
      { name: "Ide", trait: "Intuition", bonus: "+1 Intuition" }
    ],
    schools: [
      // ÉCOLE BUSHI MOTO (Core p. 130)
      {
        id: "bushi-moto",
        family: "Moto",
        name: "Bushi Moto (Cavalier Lourd)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Armes d'Hast", "Bataille", "Défense", "Équitation", "Kenjutsu (Cimeterre)", "Kyujutsu", "Une compétence Bugei au choix"],
        outfit: "Armure lourde d'écailles et cuir renforcé, Cimeterre ou Katana, Poney des steppes harnaché, 3 koku",
        techniques: [
          { rank: 1, name: "La Charge Foudroyante", effect: "En selle ou lors d'une charge, vous gagnez un bonus de +2g0 à vos jets de dégâts. Vous ignorez toutes les pénalités habituelles dues au combat monté." },
          { rank: 2, name: "Le Cœur Invincible", effect: "Vous gagnez une immunité totale contre tous les effets de Peur de rang inférieur ou égal à votre Rang d'École." },
          { rank: 3, name: "La Lame Inarrêtable", effect: "Porter une attaque devient une Action Simple lorsque vous maniez un cimeterre, un sabre ou une arme d'hast." },
          { rank: 4, name: "L'Impact Brutal", effect: "Vos attaques montées réussies renversent automatiquement les cibles à pied ayant une Force inférieure à la vôtre." },
          { rank: 5, name: "Le Moto ne Fléchit Pas", effect: "Lorsque vous combattez en selle ou que vous adoptez la posture d'Attaque Totale, vous gardez un nombre de dés de dégâts supplémentaire égal à la moitié de votre Force arrondie à l'inférieur (+Force/2 dés gardés) avec une arme à deux mains ou une arme de Samouraï." }
        ]
      },

      // ÉCOLE CAVALIER SHINJO (Emerald Empire p. 31 / Core p. 255)
      {
        id: "bushi-shinjo",
        family: "Shinjo",
        name: "Cavalier Shinjo (Bushi)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 5.5,
        skills: ["Athlétisme", "Chasse (Pistage)", "Défense", "Équitation", "Kenjutsu", "Kyujutsu (Tir monté)", "Une compétence Bugei au choix"],
        outfit: "Armure légère souple, Arc équestre avec 30 flèches, Daisho, Destrier Shinjo, 4 koku",
        techniques: [
          { rank: 1, name: "La Voie des Steppes", effect: "Vous ajoutez votre rang de compétence Équitation à vos jets d'Initiative. Vous tirez à l'arc à cheval sans pénalité de galop." },
          { rank: 2, name: "La Danse du Sabre", effect: "Lorsque vous combattez en selle ou que vous vous déplacez d'au moins 3 mètres à pied durant votre tour, vous gagnez un bonus de +5 à votre ND d'Armure." },
          { rank: 3, name: "Vif comme le Vent", effect: "Porter une attaque devient une Action Simple avec les sabres, arcs ou lances." },
          { rank: 4, name: "La Ruade Céleste", effect: "Votre monture peut effectuer une attaque de sabots en tant qu'Action Gratuite lors de votre tour." },
          { rank: 5, name: "La Danse de Shinjo", effect: "Vous pouvez vous désengager du combat monté sans subir d'attaque d'opportunité et votre monture double sa vitesse de déplacement." }
        ]
      },

      // ÉCOLE VIERGE GUERRIÈRE UTAKU (Core p. 132)
      {
        id: "vierge-utaku",
        family: "Utaku",
        name: "Vierge Guerrière Utaku (Battle Maiden)",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 6.5,
        skills: ["Bataille", "Défense", "Équitation (Destrier Utaku)", "Iaijutsu", "Kenjutsu", "Sincérité", "Une compétence Bugei au choix"],
        outfit: "Armure de plates fines laquée, Destrier de guerre Utaku, Katana de maître, 5 koku",
        techniques: [
          { rank: 1, name: "Chevaucher en Harmonie", effect: "Lorsque vous combattez en selle sur votre destrier Utaku, vous ajoutez votre Rang d'Honneur à tous vos jets de dégâts et à votre ND d'Armure." },
          { rank: 2, name: "Le Fil de la Pureté", effect: "Vous gagnez un bonus de +2g0 à tous vos jets d'attaque contre des adversaires dont le Rang d'Honneur est inférieur à 2.0." },
          { rank: 3, name: "Le Galop Céleste", effect: "Porter une attaque devient une Action Simple lorsque vous combattez en selle." },
          { rank: 4, name: "La Justice du Ciel", effect: "Vos charges équestres infligent +2g1 de dégâts supplémentaires et peuvent étourdir la cible en cas de coup critique." },
          { rank: 5, name: "La Bénédiction d'Otaku", effect: "Au début de votre tour, vous pouvez dépenser 1 point de Vide en Action Gratuite : vous ajoutez votre Rang d'Honneur à tous vos jets de dégâts et à tous vos jets de compétences de Bugei pour l'ensemble du tour." }
        ]
      },

      // ÉCOLE ÉMISSAIRE IDE (Core p. 131)
      {
        id: "courtisan-ide",
        family: "Ide",
        name: "Émissaire Ide",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 5.5,
        skills: ["Commerce", "Courtisan", "Équitation", "Étiquette", "Oratoire", "Sincérité", "Une compétence Noble au choix"],
        outfit: "Vêtements de voyage luxueux garnis de fourrure, Wakizashi, Monture de selle, 10 koku",
        techniques: [
          { rank: 1, name: "Le Cœur Ouvert", effect: "Vous évaluez instinctivement le degré de bienveillance d'un individu. Vous réduisez de 5 le ND de toutes les tentatives visant à désamorcer une situation hostile ou pacifier une querelle." },
          { rank: 2, name: "Le Verbe Conciliant", effect: "Vous gagnez un bonus de +2g0 à tous vos jets d'Étiquette et d'Oratoire pour désamorcer une dispute avant l'appel aux armes." },
          { rank: 3, name: "L'Écoute Bienveillante", effect: "Permet de regagner 1 point de Vide après avoir négocié avec succès un traité de paix accepté par les deux parties." },
          { rank: 4, name: "Le Pont des Cultures", effect: "Vos alliés sous votre escorte sont totalement immunisés contre les malus liés aux faux pas culturels face aux traditionalistes." },
          { rank: 5, name: "L'Harmonie du Voyageur", effect: "Dépensez 1 point de Vide : imposez une trêve inviolable de 24 heures entre délégations armées." }
        ]
      },

      // ÉCOLE SHUGENJA IUCHI (Core p. 130-131)
      {
        id: "shugenja-iuchi",
        family: "Iuchi",
        name: "Shugenja Iuchi",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 4.5,
        skills: ["Calligraphie", "Connaissance : Théologie", "Défense", "Équitation", "Méditation", "Spellcraft", "Une compétence Bugei au choix"],
        outfit: "Robes nomades de voyage souples, Cheval de selle, Wakizashi ou Bâton Bo, Rouleaux et amulettes de voyage, 4 koku",
        techniques: [
          { rank: 1, name: "Le Voyageur des Éléments", effect: "Affinité : Eau. Déficience : Feu. Vous gagnez une Augmentation Gratuite sur tous les sorts d'Eau liés au mouvement, à la guérison et au voyage." },
          { rank: 2, name: "Le Vent Guidant", effect: "Vous gagnez +1g1 sur tous vos sorts d'orientation, de repérage et de météo." },
          { rank: 3, name: "L'Amulette Éveillée", effect: "Lancer un sort de déplacement ou de vitesse d'Eau devient une Action Simple." },
          { rank: 4, name: "Le Pas des Brumes", effect: "Permet de téléporter votre monture et vous-même à 15 mètres de distance." },
          { rank: 5, name: "La Tempête Nomade", effect: "Dépensez 1 point de Vide pour déclencher les effets de deux sorts d'Eau au cours du même tour." }
        ]
      }
    ]
  }

};

if (typeof window !== "undefined") {
  window.CLANS_DATA = CLANS_DATA;
}
