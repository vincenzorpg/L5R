/**
 * CLANS_DATA - Les Huit Grands Clans de Rokugan (L5R 4e Édition)
 * Écoles classées par famille d'attache avec les 5 Rangs de Techniques.
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
      // Écoles Famille Hida
      {
        id: "bushi-hida",
        family: "Hida",
        name: "Bushi Hida",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Armes Lourdes (Tetsubo)", "Athlétisme", "Bataille", "Défense", "Kenjutsu", "Jiujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde, Daisho, Tetsubo, Nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Crabe", effect: "Porte les armures lourdes sans subir leurs pénalités de ND (sauf en Discrétion). Obtient un bonus de +1g0 à tous les jets de dégâts avec les Armes Lourdes." },
          { rank: 2, name: "La Montagne ne Bouge Pas", effect: "Gagne une Réduction de dégâts permanente égale à son Anneau de Terre." },
          { rank: 3, name: "Deux Pinces, Un Seul Esprit", effect: "Peut effectuer ses attaques comme des Actions Simples avec les Armes Lourdes ou armes possédant le mot-clé Samouraï." },
          { rank: 4, name: "Frappe Dévastatrice", effect: "Une fois par escarmouche avec une Arme Lourde : réduit la Réduction adverse de 4. Si l'attaque touche, la cible est Étourdie (Dazed)." },
          { rank: 5, name: "La Montagne ne Tombe Jamais", effect: "Dépensez 1 point de Vide en phase de Réaction : vous agissez comme étant au palier Indemne (+0) durant tout votre prochain tour et ignorez Étourdi et Fatigué." }
        ]
      },
      {
        id: "berserker-hida",
        family: "Hida",
        name: "Berserker du Crabe (Hida)",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 2.5,
        skills: ["Armes Lourdes", "Athlétisme", "Défense", "Intimidation", "Jiujutsu", "Kenjutsu", "Une compétence Bugei"],
        outfit: "Armure lourde ou moyenne, Daisho, Grande Hache Ono ou Tetsubo, 2 koku",
        techniques: [
          { rank: 1, name: "La Fureur du Rempart", effect: "En posture d'Attaque Totale, ajoute son Anneau de Terre au résultat de ses jets de dégâts et ignore le malus de ND d'Armure lié à cette posture." },
          { rank: 2, name: "La Rage du Berserker", effect: "Une fois par combat : entre en transe furieuse durant 2x Terre rounds. Ignore les pénalités de blessures et gagne +2g1 à tous ses jets d'attaque et de dégâts." },
          { rank: 3, name: "Le Coup Démolisseur", effect: "Attaquer devient une Action Simple lorsqu'il manie une Arme Lourde en rage." },
          { rank: 4, name: "L'Insensibilité Totale", effect: "Tant qu'il est en rage, les dégâts subis ne peuvent pas faire descendre ses blessures sous le palier Inconscient." },
          { rank: 5, name: "Le Dernier Souffle du Crabe", effect: "S'il subit un coup mortel, continue de combattre jusqu'à la fin de la scène avant de succomber." }
        ]
      },

      // École Famille Hiruma
      {
        id: "eclaireur-hiruma",
        family: "Hiruma",
        name: "Éclaireur Hiruma",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Discrétion", "Défense", "Kenjutsu", "Kyujutsu", "Connaissance : Outremonde"],
        outfit: "Armure légère, Daisho, Arc Yumi avec 20 flèches, Nécessaire de survie, 3 koku",
        techniques: [
          { rank: 1, name: "La Flamme de la Torche Vacille", effect: "En posture d'Attaque, gagne +1g0 à tous ses jets d'attaque. Double la durée des rations de survie et du jade pour son groupe." },
          { rank: 2, name: "La Leçon du Loup", effect: "Ajoute son rang d'Athlétisme + 5 à son ND d'Armure par Augmentation déclarée sur une attaque." },
          { rank: 3, name: "Ailes du Colibri", effect: "Une fois par round : esquive réactive avec un jet opposé d'Agilité + Défense contre l'attaque adverse." },
          { rank: 4, name: "L'Odorat du Requin", effect: "Attaquer devient une Action Simple, ou permet d'effectuer deux esquives réactives par round." },
          { rank: 5, name: "Le Jour sans Geste Superflu", effect: "Obtient une Action de Mouvement gratuite supplémentaire chaque tour et inflige +2g2 lors d'attaques par surprise." }
        ]
      },

      // École Famille Kaiu
      {
        id: "ingenieur-kaiu",
        family: "Kaiu",
        name: "Ingénieur de Siège Kaiu",
        type: "Bushi",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Artisanat (Forge)", "Bataille", "Connaissance : Architecture", "Défense", "Ingénierie (Siège)", "Kenjutsu", "Éventail de Guerre"],
        outfit: "Armure lourde, Daisho, Outils d'architecte et de forge, Marteau de guerre ou Éventail, 3 koku",
        techniques: [
          { rank: 1, name: "La Méthode Kaiu", effect: "Gagne +1g0 à tous ses jets de compétences d'école. Dépenser 1 point de Vide sur ces compétences octroie +2g2 au lieu de +1g1." },
          { rank: 2, name: "La Voie de Pierre", effect: "Peut renforcer la résistance d'une structure ou forteresse. Relance les dés de dégâts des armes de siège affichant moins que son Rang d'École." },
          { rank: 3, name: "La Voie de la Carapace", effect: "Lorsqu'il forge ou répare une armure, peut ajouter son Rang d'École à la Réduction de celle-ci." },
          { rank: 4, name: "L'Art de la Brèche", effect: "Attaquer devient une Action Simple avec le katana, le marteau de guerre ou l'éventail." },
          { rank: 5, name: "La Voie de l'Acier", effect: "Peut conférer des bonus permanents de +1g0 au toucher ou +0g1 aux dégâts sur les armes qu'il forge." }
        ]
      },

      // École Famille Kuni
      {
        id: "shugenja-kuni",
        family: "Kuni",
        name: "Shugenja Kuni",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Calligraphie", "Connaissance : Outremonde", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Une compétence Bugei"],
        outfit: "Robes, Daisho ou Tanto, Nécessaire de parchemin, Bâton Bo, 3 koku",
        techniques: [
          { rank: 1, name: "L'Œil Purificateur", effect: "Affinité : Terre. Déficience : Air. Reconnaît la présence de la Souillure chez tout individu à portée de vue. Ses sorts de Terre infligent +1g1 dégâts aux créatures de l'Outremonde." },
          { rank: 2, name: "La Barrière de Jade", effect: "Érige des cercles protecteurs repoussant les monstres souillés. Les oni subissent un malus de -1g1 sur tous leurs jets contre lui." },
          { rank: 3, name: "L'Ancrage Tellurique", effect: "Peut lancer les sorts de Terre de Maîtrise 1 et 2 en Action Simple." },
          { rank: 4, name: "Le Châtiment de la Terre", effect: "Double la zone d'effet de tous ses sorts de Terre de combat." },
          { rank: 5, name: "L'Exorcisme Suprême", effect: "Dépensez 1 point de Vide pour purger temporairement la Souillure d'une cible ou détruire instantanément un mort-vivant mineur." }
        ]
      },

      // École Famille Yasuki
      {
        id: "courtisan-yasuki",
        family: "Yasuki",
        name: "Courtisan Yasuki",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.5,
        skills: ["Artisanat", "Commerce", "Comédie", "Courtisan", "Étiquette", "Intimidation", "Sincérité"],
        outfit: "Kimono de voyage résistant, Wakizashi, Bourse de monnaies, 10 koku",
        techniques: [
          { rank: 1, name: "L'Évaluation du Marchand", effect: "Connaît instantanément la valeur marchande exacte de tout objet et la situation financière d'un interlocuteur." },
          { rank: 2, name: "L'Art du Compromis", effect: "Gagne +1g1 à tous ses jets de Commerce et de persuasion lorsqu'une transaction matérielle est en jeu." },
          { rank: 3, name: "L'Or du Mur", effect: "Réduit de 10 points le ND des faveurs sollicitées auprès de clans marchands ou de magistrats." },
          { rank: 4, name: "Les Ficelles de la Bourse", effect: "Peut relancer deux dés sur tous ses jets de compétences Marchandes ou Sociales." },
          { rank: 5, name: "La Fortune Souffle où Elle Veut", effect: "Peut couper les lignes de crédit et de ravitaillement d'un rival pour le paralyser en cour." }
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
      {
        id: "duelliste-kakita",
        family: "Kakita",
        name: "Duelliste Kakita",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 6.5,
        skills: ["Artisanat", "Courtisan", "Défense", "Étiquette", "Iaijutsu", "Kenjutsu", "Sincérité"],
        outfit: "Kimono raffiné, Daisho de maître, Nécessaire d'entretien, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Grue", effect: "Ajoute le double de son rang d'Iaijutsu à son Initiative. En posture du Centre, gagne +1g1 + Rang d'École aux jets d'attaque et de Concentration." },
          { rank: 2, name: "Vélocité de l'Éclair", effect: "Gagne un bonus de +2g0 à tous ses jets d'attaque contre les adversaires ayant une Initiative inférieure à la sienne." },
          { rank: 3, name: "Première et Dernière Frappe", effect: "En duel d'Iaijutsu, frappe en premier dès que la marge de victoire au jet de Concentration atteint 3 (au lieu de 5)." },
          { rank: 4, name: "Une Frappe, Deux Entailles", effect: "Peut attaquer en Action Simple avec les armes portant le mot-clé Samouraï." },
          { rank: 5, name: "Frapper sans Pensée", effect: "Peut effectuer une Action Simple en posture du Centre et y demeurer autant de rounds consécutifs que souhaité." }
        ]
      },
      {
        id: "courtisan-doji",
        family: "Doji",
        name: "Courtisan Doji",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Cérémonie du Thé", "Courtisan", "Étiquette", "Oratoire", "Représentation", "Sincérité", "Une compétence Noble"],
        outfit: "Kimono de cour somptueux, Wakizashi, Nécessaire d'écriture, 10 koku",
        techniques: [
          { rank: 1, name: "La Grâce Impériale", effect: "Reconnaît d'instinct le rang d'Honneur et de Statut exacts d'autrui. Réduit de 5 le ND de toutes les faveurs sollicitées en cour." },
          { rank: 2, name: "Murmures de la Cour", effect: "Peut relancer un jet de compétence sociale raté en dépensant 1 point de Vide. Gagne +1g1 permanent à Sincérité et Étiquette." },
          { rank: 3, name: "L'Épreuve d'Honneur", effect: "En joute verbale, force un adversaire à tester sa Volonté contre son jet de Courtisan sous peine de perdre 1 rang d'Honneur." },
          { rank: 4, name: "Mille Murmures dans l'Ombre", effect: "Immunité totale contre la perte de Gloire liée aux manœuvres de cour." },
          { rank: 5, name: "La Volonté de l'Empereur", effect: "Une requête officielle formulée avec déférence impose un jet de Volonté ND 30 pour oser refuser." }
        ]
      },
      {
        id: "guerrier-daidoji",
        family: "Daidoji",
        name: "Guerrier Daidoji (Grue de Fer)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 5.5,
        skills: ["Armes d'Hast (Naginata)", "Athlétisme", "Bataille", "Défense", "Kenjutsu", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde Daidoji, Daisho, Naginata ou Yari, 3 koku",
        techniques: [
          { rank: 1, name: "La Grue d'Acier", effect: "Calcule ses blessures avec son Rang d'Honneur s'il est supérieur à son Anneau de Terre. Gagne +1g0 pour toucher en protégeant un allié." },
          { rank: 2, name: "Le Feu Intérieur", effect: "En posture de Défense Totale, remporte automatiquement la plus haute Initiative du round suivant." },
          { rank: 3, name: "Déplacer l'Ombre", effect: "Ajoute la valeur de l'armure adverse à son propre ND d'Armure en combat singulier." },
          { rank: 4, name: "Frapper sous le Voile", effect: "Peut attaquer en Action Simple avec les armes de mêlée." },
          { rank: 5, name: "Marcher sur la Lame", effect: "Dépensez 1 point de Vide pour intercepter une attaque mortelle destinée à un allié et en diviser les dégâts par deux." }
        ]
      },
      {
        id: "shugenja-asahina",
        family: "Asahina",
        name: "Shugenja Asahina",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        skills: ["Artisanat", "Calligraphie", "Connaissance : Théologie", "Méditation", "Sincérité", "Cérémonie du Thé", "Une compétence Noble"],
        outfit: "Robes blanches Asahina, Wakizashi, Nécessaire d'origami et de parchemin, 4 koku",
        techniques: [
          { rank: 1, name: "La Pureté du Vent", effect: "Affinité : Air. Déficience : Feu. Gagne une Augmentation gratuite sur tous les sorts de soins et de protection spirituelle." },
          { rank: 2, name: "Le Souffle Paisible", effect: "Peut apaiser les émotions belliqueuses dans un rayon de 10 mètres d'un jet d'Air / Sincérité." },
          { rank: 3, name: "L'Envol de l'Esprit", effect: "Peut lancer les sorts de communication et d'illusion d'Air en Action Simple." },
          { rank: 4, name: "L'Harmonie Céleste", effect: "Confère un bonus de +5 au ND d'Armure de tous les alliés sous sa garde spirituelle." },
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
      { name: "Kitsuki", trait: "Perception", bonus: "+1 Perception" },
      { name: "Tamori", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Togashi", trait: "Constitution", bonus: "+1 Constitution" }
    ],
    schools: [
      {
        id: "bushi-mirumoto",
        family: "Mirumoto",
        name: "Bushi Mirumoto",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Défense", "Iaijutsu", "Kenjutsu", "Kyujutsu", "Méditation", "Connaissance : Théologie", "Une compétence Bugei"],
        outfit: "Armure légère ou lourde, Daisho Mirumoto, 3 koku",
        techniques: [
          { rank: 1, name: "Le Style Niten", effect: "Maniement simultané Katana et Wakizashi sans malus de main faible. Confère +5 permanent au ND d'Armure." },
          { rank: 2, name: "Fort comme la Montagne", effect: "Attaques insensibles aux malus de terrain et immunité au désarmement." },
          { rank: 3, name: "Frapper comme l'Eau", effect: "Attaquer devient une Action Simple avec deux lames en main." },
          { rank: 4, name: "Maîtrise des Deux Lames", effect: "Gagne deux Augmentations gratuites pour Feinte, Désarmement ou Garde." },
          { rank: 5, name: "La Double Frappe du Dragon", effect: "Chaque coup réussi en Attaque Simple déclenche une riposte immédiate de la seconde arme." }
        ]
      },
      {
        id: "magistrat-kitsuki",
        family: "Kitsuki",
        name: "Magistrat Enquêteur Kitsuki",
        type: "Courtisan",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 5.5,
        skills: ["Courtisan", "Défense", "Droit", "Enquête", "Étiquette", "Kenjutsu", "Sincérité"],
        outfit: "Kimono de magistrat, Daisho, Nécessaire d'enquêteur, 5 koku",
        techniques: [
          { rank: 1, name: "La Clarté de l'Esprit", effect: "Détecte le mensonge d'un jet d'Intuition contre l'adversaire. Double les bonus d'Enquête avec un point de Vide." },
          { rank: 2, name: "Le Doute Méthodique", effect: "Gagne +2g0 pour résister aux tromperies, illusions et manipulations." },
          { rank: 3, name: "L'Évidence Irréfutable", effect: "Présenter une preuve matérielle impose -10 au Statut adverse pour contester." },
          { rank: 4, name: "Regard Pénétrant", effect: "Ajoute son rang d'Enquête à son Initiative." },
          { rank: 5, name: "La Vérité Nue", effect: "Dépensez 1 point de Vide : force un suspect à confesser ses actes s'il échoue contre Volonté ND 30." }
        ]
      },
      {
        id: "moine-togashi",
        family: "Togashi",
        name: "Moine Tatoué Togashi (Ise Zumi)",
        type: "Moine",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Jiujutsu", "Méditation", "Représentation", "Connaissance : Théologie", "Une compétence Noble"],
        outfit: "Robes simples, Bâton Bo ou mains nues, 1 koku",
        techniques: [
          { rank: 1, name: "Le Sang du Kami", effect: "Obtient deux Tatouages mystiques au choix conférant des pouvoirs surnaturels." },
          { rank: 2, name: "Le Corps de Pierre", effect: "Gagne +1g1 aux attaques et dégâts à mains nues (Jiujutsu). Obtient un 3e Tatouage." },
          { rank: 3, name: "L'Harmonie du Souffle", effect: "Attaquer à mains nues devient une Action Simple. Obtient un 4e Tatouage." },
          { rank: 4, name: "La Transcendance de la Chair", effect: "Ignore les malus de blessures jusqu'au palier Inconscient. Obtient un 5e Tatouage." },
          { rank: 5, name: "L'Éveil du Dragon", effect: "Dépensez 1 point de Vide pour activer 3 tatouages simultanément pendant 3 rounds. Obtient un 6e Tatouage." }
        ]
      },
      {
        id: "shugenja-tamori",
        family: "Tamori",
        name: "Shugenja Alchimiste Tamori",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 4.5,
        skills: ["Alchimie", "Athlétisme", "Calligraphie", "Connaissance : Théologie", "Défense", "Kenjutsu", "Méditation"],
        outfit: "Robes renforcées de voyage, Daisho, Fioles d'argile, 3 koku",
        techniques: [
          { rank: 1, name: "Le Chaudron des Esprits", effect: "Affinité : Terre. Déficience : Eau. Enferme ses sorts dans des potions prêtes à briser en combat." },
          { rank: 2, name: "Le Souffle Volcanique", effect: "Ajoute +1g0 à tous ses sorts offensifs de Terre et de Feu." },
          { rank: 3, name: "La Pierre Foudroyante", effect: "Peut lancer ou briser ses potions en Action Simple." },
          { rank: 4, name: "L'Écorce de Montagne", effect: "Gagne une Réduction de 3 lorsqu'il est sous l'effet d'un sort de Terre personnel." },
          { rank: 5, name: "La Fureur Tellurique", effect: "Dépensez 1 point de Vide pour déclencher une explosion de roche infligeant 5g3 aux ennemis proches." }
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
      { name: "Akodo", trait: "Perception", bonus: "+1 Perception" },
      { name: "Matsu", trait: "Force", bonus: "+1 Force" },
      { name: "Ikoma", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Kitsu", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      {
        id: "bushi-akodo",
        family: "Akodo",
        name: "Bushi Akodo",
        type: "Bushi",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 6.5,
        skills: ["Art de la Guerre (Bataille)", "Défense", "Iaijutsu", "Kenjutsu", "Kyujutsu", "Connaissance : Histoire", "Sincérité"],
        outfit: "Armure lourde Lion, Daisho, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Lion", effect: "Relance les dés d'attaque inférieurs ou égaux à son Rang d'Honneur. Ajoute +1g0 aux dégâts de sabre." },
          { rank: 2, name: "La Force de la Certitude", effect: "Ajoute son Rang d'Honneur à ses jets de Volonté et résistance à la Peur." },
          { rank: 3, name: "Rapide comme le Lion", effect: "Attaquer devient une Action Simple avec les armes de Samouraï." },
          { rank: 4, name: "La Furie d'Akodo", effect: "Ajoute le nombre d'alliés adjacents au résultat de ses jets d'attaque (max Insight x 2)." },
          { rank: 5, name: "La Victoire Finale", effect: "Dépensez 1 point de Vide : ajoute son Rang d'Honneur à tous les jets de dégâts et compétences Bugei du tour." }
        ]
      },
      {
        id: "bushi-matsu",
        family: "Matsu",
        name: "Bushi Berserker Matsu",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 6.5,
        skills: ["Athlétisme", "Bataille", "Défense", "Jiujutsu", "Kenjutsu", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde rouge et or, Daisho, 3 koku",
        techniques: [
          { rank: 1, name: "Le Rugissement du Lion", effect: "En posture d'Attaque Totale, ajoute son Rang d'Honneur à tous ses jets de dégâts." },
          { rank: 2, name: "La Charge Indomptable", effect: "Ignore les malus de terrain difficile lorsqu'il charge un adversaire." },
          { rank: 3, name: "La Fureur de Matsu", effect: "Attaquer devient une Action Simple en posture d'Attaque Totale." },
          { rank: 4, name: "Les Griffes de la Lionne", effect: "Gagne une attaque supplémentaire gratuite après avoir abattu un adversaire." },
          { rank: 5, name: "Le Courage sans Limite", effect: "Ignore complètement tous les malus de blessures tant qu'il est en Attaque Totale." }
        ]
      },
      {
        id: "barde-ikoma",
        family: "Ikoma",
        name: "Barde & Historien Ikoma",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 5.5,
        skills: ["Art de la Guerre (Bataille)", "Comédie", "Connaissance : Histoire", "Courtisan", "Étiquette", "Oratoire", "Sincérité"],
        outfit: "Kimono de voyage aux armoiries Lion, Wakizashi, Tambour, 6 koku",
        techniques: [
          { rank: 1, name: "Le Chant des Héros", effect: "Confère +1g1 aux jets de Volonté et résistance à la Peur de ses compagnons d'un récit héroïque." },
          { rank: 2, name: "La Voix des Ancêtres", effect: "Gagne +2g0 sur tous les jets d'Oratoire et de persuasion face à d'autres clans." },
          { rank: 3, name: "La Gloire Partagée", effect: "Peut transférer des points de Gloire à un allié méritant pour rehausser son statut." },
          { rank: 4, name: "La Flamme Inaltérable", effect: "Immunise ses compagnons contre la panique en bataille de masse." },
          { rank: 5, name: "Le Dit des Mille Générations", effect: "Dépensez 1 point de Vide : invoque la mémoire d'un ancêtre pour réussir un jet d'histoire ou de tactique." }
        ]
      },
      {
        id: "shugenja-kitsu",
        family: "Kitsu",
        name: "Shugenja Kitsu (Sodan-Senzo)",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Calligraphie", "Connaissance : Histoire", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Sincérité"],
        outfit: "Robes cérémonielles ocre et or, Daisho ou Bâton Bo, 4 koku",
        techniques: [
          { rank: 1, name: "La Vue des Ancêtres", effect: "Affinité : Eau. Déficience : Feu. Perçoit et dialogue avec les esprits des morts (Yomi). +1 Augmentation gratuite sur sorts d'Eau." },
          { rank: 2, name: "Le Sang des Premiers Hommes", effect: "Gagne +2g0 sur une compétence Bugei pendant 3 rounds en invoquant un aïeul." },
          { rank: 3, name: "Le Fleuve Spirituel", effect: "Peut lancer les sorts de détection d'Eau en Action Simple." },
          { rank: 4, name: "L'Appel aux Braves", effect: "Invoque un esprit guerrier pour dévier un coup mortel porté à un allié." },
          { rank: 5, name: "L'Armée des Ombres Épiques", effect: "Dépensez 1 point de Vide : matérialise des spectres désorientant l'armée ennemie." }
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
      { name: "Moshi", trait: "Intelligence", bonus: "+1 Intelligence" }
    ],
    schools: [
      {
        id: "bushi-yoritomo",
        family: "Yoritomo",
        name: "Bushi Yoritomo",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 2.5,
        skills: ["Armes de Paysan (Kama)", "Athlétisme", "Bataille", "Commerce", "Défense", "Kenjutsu", "Navigation"],
        outfit: "Armure de cuir verni, Paire de Kama, Katana, 3 koku",
        techniques: [
          { rank: 1, name: "La Fureur de l'Océan", effect: "Maniement de deux armes sans malus (Kama). Gagne +10 au ND d'Armure s'il bouge d'au moins 1,5 m durant son tour." },
          { rank: 2, name: "Le Pied Marin", effect: "Ne subit jamais de pénalité de terrain instable (navire, boue, cordages)." },
          { rank: 3, name: "L'Abordage Sauvage", effect: "Attaquer devient une Action Simple avec deux armes ou des armes de paysan." },
          { rank: 4, name: "La Vague Déferlante", effect: "Gagne deux Augmentations gratuites pour renverser un adversaire au sol." },
          { rank: 5, name: "La Main d'Osano-Wo", effect: "Dépensez 1 point de Vide : ajoute sa Force en dés gardés à ses dégâts. +0g2 si la cible est à terre." }
        ]
      },
      {
        id: "archer-tsuruchi",
        family: "Tsuruchi",
        name: "Archer Tsuruchi",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Discrétion", "Défense", "Enquête", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Arc Yumi de maître, Carquois de 30 flèches, Daisho, 3 koku",
        techniques: [
          { rank: 1, name: "L'Œil du Faucon", effect: "Ignore les malus de portée d'arc. Encocher et tirer devient une Action Simple avec un arc Yumi." },
          { rank: 2, name: "La Précision du Vent", effect: "Ajoute son rang de Kyujutsu au total de tous ses jets de dégâts à l'arc." },
          { rank: 3, name: "Flèche sans Pensée", effect: "Tirer à l'arc devient une Action Simple permettant deux attaques complètes par tour." },
          { rank: 4, name: "Le Vol Mortel", effect: "Toutes les flèches tirées ignorent 5 points de Réduction ou d'Armure de la cible." },
          { rank: 5, name: "L'Œil de Tsuruchi", effect: "Action Complexe : concentre son tir pour obtenir +4g1 sur l'attaque et les dégâts de la flèche." }
        ]
      },
      {
        id: "shugenja-moshi",
        family: "Moshi",
        name: "Shugenja Moshi (Filles du Soleil)",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 5.5,
        skills: ["Astrologie", "Calligraphie", "Connaissance : Théologie", "Méditation", "Navigation", "Sincérité", "Une compétence Noble"],
        outfit: "Robes blanches et dorées, Bâton Bo ou Tanto, Miroir solaire, 4 koku",
        techniques: [
          { rank: 1, name: "La Ferveur Solaire", effect: "Affinité : Feu. Déficience : Eau. Gagne une Augmentation gratuite sur les sorts de lumière et de chaleur solaires." },
          { rank: 2, name: "La Danse de l'Aurore", effect: "Peut aveugler temporairement ses assaillants d'un jet d'Intelligence / Méditation." },
          { rank: 3, name: "L'Éclair Céleste", effect: "Peut lancer les sorts d'orage et de feu de Maîtrise 1 et 2 en Action Simple." },
          { rank: 4, name: "Les Rayons Purificateurs", effect: "Ses sorts de Feu ignorent la résistance magique des créatures impures." },
          { rank: 5, name: "La Colère de Dame Soleil", effect: "Dépensez 1 point de Vide pour déclencher un faisceau solaire infligeant 6g3 brûlures sur 20 mètres." }
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
      { name: "Asako", trait: "Intuition", bonus: "+1 Intuition" }
    ],
    schools: [
      {
        id: "bushi-shiba",
        family: "Shiba",
        name: "Bushi Shiba (Yojimbo)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Armes d'Hast (Yari)", "Athlétisme", "Défense", "Iaijutsu", "Kenjutsu", "Méditation", "Connaissance : Théologie"],
        outfit: "Armure lourde Phénix, Daisho, Lance Yari, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Phénix", effect: "Peut dépenser 2 points de Vide pour obtenir +2g2 sur un jet. L'action Protéger devient une Action Gratuite (+5 ND Armure allié)." },
          { rank: 2, name: "Danse avec les Éléments", effect: "À 10 mètres, peut augmenter ou diminuer le ND de n'importe quel sort allié ou ennemi de 5 points." },
          { rank: 3, name: "Le Bouclier de Shiba", effect: "Attaquer devient une Action Simple avec les armes de Samouraï ou armes d'hast." },
          { rank: 4, name: "L'Esprit Immortel", effect: "Subir des blessures mortelles permet de dépenser 1 point de Vide pour continuer d'agir 1 tour." },
          { rank: 5, name: "L'Harmonie du Néant", effect: "Dépensez 1 point de Vide pour dissoudre une attaque physique subie dans le Vide." }
        ]
      },
      {
        id: "shugenja-isawa",
        family: "Isawa",
        name: "Shugenja des Éléments Isawa",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 4.5,
        skills: ["Calligraphie", "Connaissance : Histoire", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Une compétence Noble"],
        outfit: "Robes somptueuses, Wakizashi, Rouleaux sacrés, 5 koku",
        techniques: [
          { rank: 1, name: "La Maîtrise des Éléments", effect: "Affinité : au choix. Aucune Déficience. Gagne une Augmentation gratuite sur son élément d'affinité. Peut acheter Ishiken-do pour 8 XP." },
          { rank: 2, name: "La Voix de la Création", effect: "Peut relancer un dé raté sur n'importe quel jet d'incantation." },
          { rank: 3, name: "Le Flux Élémentaire", effect: "Peut lancer les sorts de son élément de Maîtrise 1 et 2 en Action Simple." },
          { rank: 4, name: "La Fusion Cosmique", effect: "Augmente la portée et la durée de tous ses sorts de 50 %." },
          { rank: 5, name: "L'Apothéose Élémentaire", effect: "Dépensez 1 point de Vide pour convertir un emplacement de sort dans n'importe quel élément sans pénalité." }
        ]
      },
      {
        id: "erudit-asako",
        family: "Asako",
        name: "Érudit & Médecin Asako",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 5.5,
        skills: ["Cérémonie du Thé", "Connaissance : Histoire", "Connaissance : Théologie", "Courtisan", "Étiquette", "Médecine", "Sincérité"],
        outfit: "Robes sobres, Wakizashi, Trousse de médecin aux herbes sacrées, 5 koku",
        techniques: [
          { rank: 1, name: "La Mémoire du Ciel", effect: "Mémoire absolue. Réduit de 10 points le ND des diagnostics médicaux et soigne +2g1 PV supplémentaires." },
          { rank: 2, name: "L'Équilibre Corporel", effect: "Immunité totale contre les poisons naturels et maladies contagieuses." },
          { rank: 3, name: "La Sérénité du Sage", effect: "Peut calmer un personnage paniqué ou terrifié d'une parole posée." },
          { rank: 4, name: "Les Vérités Oubliées", effect: "Découvre les faiblesses historiques et généalogiques d'un rival en cour." },
          { rank: 5, name: "Le Toucher Restaurateur", effect: "Dépensez 1 point de Vide : soigne instantanément un allié de 30 PV et purge toutes ses toxines." }
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
      { name: "Soshi", trait: "Perception", bonus: "+1 Perception" },
      { name: "Yogo", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      // Écoles Famille Bayushi
      {
        id: "bushi-bayushi",
        family: "Bayushi",
        name: "Bushi Bayushi",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 2.5,
        skills: ["Comédie", "Défense", "Discrétion", "Enquête", "Iaijutsu", "Kenjutsu", "Une compétence Bugei"],
        outfit: "Armure légère noire, Masque personnel, Daisho, 3 koku",
        techniques: [
          { rank: 1, name: "La Ruse du Scorpion", effect: "Ajoute son rang d'Iaijutsu à son Initiative. Toute feinte réussie prive temporairement l'adversaire de son armure." },
          { rank: 2, name: "Le Regard des Ombres", effect: "Gagne un bonus de +2g0 à tous ses jets d'attaque contre un ennemi ayant une Initiative inférieure à la sienne." },
          { rank: 3, name: "Frappe depuis l'Obscurité", effect: "Attaquer devient une Action Simple avec les armes de Samouraï." },
          { rank: 4, name: "L'Ombre Dérobée", effect: "Lorsqu'un ennemi manque son attaque contre lui, riposte immédiate en Action Gratuite." },
          { rank: 5, name: "Le Venin du Scorpion", effect: "Chaque coup de mêlée applique un venin paralysant infligeant des blessures continues." }
        ]
      },
      {
        id: "courtisan-bayushi",
        family: "Bayushi",
        name: "Courtisan Manipulateur Bayushi",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.5,
        skills: ["Comédie", "Courtisan", "Enquête", "Étiquette", "Intimidation", "Séduction", "Sincérité"],
        outfit: "Kimono de cour rouge et noir somptueux, Masque de laque raffiné, Wakizashi, 8 koku",
        techniques: [
          { rank: 1, name: "Les Faiblesses du Cœur", effect: "Détecte intuitivement les Désavantages sociaux et moraux d'un rival. Incite une cible à enfreindre l'étiquette sans paraître impliqué." },
          { rank: 2, name: "Le Filet Invisible", effect: "Gagne +2g0 à tous ses jets de chantage et d'intimidation voilée." },
          { rank: 3, name: "Le Poison de la Rumeur", effect: "Détruit 1 point de Gloire d'un rival en répandant une calomnie indétectable." },
          { rank: 4, name: "L'Armure du Secret", effect: "Immunité totale contre les jets d'enquête visant à découvrir ses propres méfaits." },
          { rank: 5, name: "Le Maître des Pantins", effect: "Dépensez 1 point de Vide : force un interlocuteur compromis à obéir sous la menace d'un scandale mortel." }
        ]
      },

      // École Famille Shosuro
      {
        id: "infiltrateur-shosuro",
        family: "Shosuro",
        name: "Infiltrateur Shosuro (Shinobi)",
        type: "Ninja",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 1.5,
        skills: ["Athlétisme", "Comédie", "Discrétion (Furtivité)", "Enquête", "Kenjutsu (Ninja-to)", "Poison", "Tantojutsu"],
        outfit: "Vêtements d'obscurité réversibles, Masque de tissu, Ninja-to, 3 Tanto, Poisons, 2 koku",
        techniques: [
          { rank: 1, name: "Le Pas Silencieux", effect: "Gagne +1g1 sur tous les jets de Discrétion. Toute attaque portée depuis l'invisibilité bénéficie de +2g0 pour toucher." },
          { rank: 2, name: "L'Ombre Vivante", effect: "Peut se fondre dans les ténèbres même sans abri direct d'un jet d'Agilité / Discrétion." },
          { rank: 3, name: "L'Attaque Fantôme", effect: "Attaquer devient une Action Simple lorsqu'il utilise des lames courtes ou dissimulées." },
          { rank: 4, name: "La Dague Mortelle", effect: "Ses attaques surprises infligent +2g2 dégâts supplémentaires." },
          { rank: 5, name: "Le Sommeil Éternel", effect: "Dépensez 1 point de Vide après un coup réussi : deux dés de dégâts affichent automatiquement 10 sans exploser." }
        ]
      },

      // École Famille Soshi
      {
        id: "shugenja-soshi",
        family: "Soshi",
        name: "Shugenja des Ombres Soshi",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 2.5,
        skills: ["Calligraphie", "Connaissance : Théologie", "Courtisan", "Défense", "Discrétion", "Enquête", "Méditation"],
        outfit: "Robes sombres amples, Masque de gaze noire, Tanto, Bâton Bo, 3 koku",
        techniques: [
          { rank: 1, name: "Le Voile des Murmures", effect: "Affinité : Air. Déficience : Terre. Gagne une Augmentation gratuite sur tous les sorts d'illusion, de silence et de dissimulation." },
          { rank: 2, name: "L'Ombre Écoutante", effect: "Peut entendre les conversations tenues dans une pièce fermée à 30 mètres de distance." },
          { rank: 3, name: "L'Effacement", effect: "Peut lancer les sorts de dissimulation et d'illusion d'Air en Action Simple." },
          { rank: 4, name: "La Brume Illusoire", effect: "Crée des mirages et des doubles désorientant les assaillants." },
          { rank: 5, name: "Le Puits des Ténèbres", effect: "Dépensez 1 point de Vide pour plonger une zone de 15 mètres dans une obscurité magique totale." }
        ]
      },

      // École Famille Yogo
      {
        id: "maitre-sceaux-yogo",
        family: "Yogo",
        name: "Maître des Sceaux Yogo",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Calligraphie (Sceaux)", "Connaissance : Outremonde", "Connaissance : Théologie", "Défense", "Enquête", "Méditation", "Une compétence Noble"],
        outfit: "Robes pourpres et noires, Masque rigide impassible, Boîte de parchemins de scellement, 4 koku",
        techniques: [
          { rank: 1, name: "La Barrière Inviolable", effect: "Affinité : Terre. Déficience : Air. Gagne une Augmentation gratuite sur tous les sorts de protection et sceaux (Wards)." },
          { rank: 2, name: "La Malédiction Domptée", effect: "Gagne +2g0 pour résister à la Souillure et à toute forme de contrôle mental ou magique." },
          { rank: 3, name: "Le Sceau Instantané", effect: "Peut tracer et activer un sceau protecteur de Terre en Action Simple." },
          { rank: 4, name: "Le Mur d'Airain", effect: "Double la résistance physique et le seuil d'absorption de tous ses glyphes protecteurs." },
          { rank: 5, name: "Le Sceau de Prison Éternelle", effect: "Dépensez 1 point de Vide pour enfermer un oni, un esprit malveillant ou un sort ennemi dans un parchemin sacré." }
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
      { name: "Iuchi", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Ide", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      {
        id: "bushi-moto",
        family: "Moto",
        name: "Bushi Moto (Cavalier Lourd)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Armes d'Hast", "Bataille", "Défense", "Équitation", "Kenjutsu (Cimeterre)", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde de cuir et écailles, Cimeterre, Poney des steppes harnaché, 3 koku",
        techniques: [
          { rank: 1, name: "La Charge du Tonnerre", effect: "+2g0 aux jets de dégâts en charge montée. Annule toutes les pénalités de combat à cheval." },
          { rank: 2, name: "L'Esprit des Steppes", effect: "Immunité totale contre les effets de Peur de rang inférieur ou égal à son Rang d'École." },
          { rank: 3, name: "La Fureur Inaltérable", effect: "Attaquer devient une Action Simple avec les sabres, cimeterres ou armes d'hast." },
          { rank: 4, name: "La Rage du Tonnerre", effect: "Peut relancer tous les dés de dégâts inférieurs à son rang de Force." },
          { rank: 5, name: "Le Galop Éternel", effect: "Double sa vitesse de déplacement montée et inflige des dégâts d'écrasement dévastateurs." }
        ]
      },
      {
        id: "bushi-shinjo",
        family: "Shinjo",
        name: "Éclaireur & Cavalier Shinjo",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 5.5,
        skills: ["Athlétisme", "Chasse", "Défense", "Équitation", "Kenjutsu", "Kyujutsu (Tir monté)", "Une compétence Bugei"],
        outfit: "Armure légère, Arc équestre avec 30 flèches, Daisho, Cheval Shinjo, 4 koku",
        techniques: [
          { rank: 1, name: "Le Vent des Steppes", effect: "Ajoute son rang d'Équitation à son Initiative. Tire à l'arc à cheval sans pénalité de galop." },
          { rank: 2, name: "La Traque Nomade", effect: "Gagne +2g0 sur tous ses jets de Chasse et de pistage." },
          { rank: 3, name: "La Flèche Tournoyante", effect: "Attaquer à l'arc ou au sabre devient une Action Simple." },
          { rank: 4, name: "L'Éperon Rapide", effect: "Permet à sa monture d'effectuer une attaque de sabot en Action Gratuite." },
          { rank: 5, name: "La Danse de Shinjo", effect: "Dépensez 1 point de Vide pour désengager son escadron sans subir d'attaque d'opportunité." }
        ]
      },
      {
        id: "vierge-utaku",
        family: "Utaku",
        name: "Vierge Guerrière Utaku (Battle Maiden)",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 6.5,
        skills: ["Bataille", "Défense", "Équitation (Destrier Utaku)", "Iaijutsu", "Kenjutsu", "Sincérité", "Une compétence Bugei"],
        outfit: "Armure de plates légères raffinée, Destrier de guerre Utaku, Katana de maître, 5 koku",
        techniques: [
          { rank: 1, name: "Chevaucher en Harmonie", effect: "Ajoute son Rang d'Honneur aux dégâts et au ND d'Armure lorsqu'elle combat en selle sur son destrier Utaku." },
          { rank: 2, name: "La Pureté du Sabre", effect: "Gagne +2g0 sur tous ses jets d'attaque contre des cibles d'Honneur inférieur à 2.0." },
          { rank: 3, name: "Le Galop de la Justice", effect: "Attaquer devient une Action Simple lorsqu'elle est en selle." },
          { rank: 4, name: "L'Étoile du Matin", effect: "Ses charges équestres renversent automatiquement les ennemis frappés." },
          { rank: 5, name: "La Bénédiction d'Otaku", effect: "Dépensez 1 point de Vide : ajoute son Rang d'Honneur à tous les jets de dés du tour." }
        ]
      },
      {
        id: "courtisan-ide",
        family: "Ide",
        name: "Émissaire Diplomate Ide",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 5.5,
        skills: ["Commerce", "Courtisan", "Équitation", "Étiquette", "Oratoire", "Sincérité", "Une compétence Noble"],
        outfit: "Manteau de voyage garni de fourrure fine, Wakizashi, 10 koku",
        techniques: [
          { rank: 1, name: "Le Cœur Ouvert", effect: "Perçoit immédiatement le niveau d'hostilité d'une personne. Réduit de 5 points le ND des tentatives d'apaisement." },
          { rank: 2, name: "Le Verbe Conciliant", effect: "Gagne +2g0 à tous ses jets pour désamorcer une querelle ou prévenir un duel." },
          { rank: 3, name: "L'Écoute Bienveillante", effect: "Permet de regagner 1 point de Vide après avoir négocié un traité de paix accepté." },
          { rank: 4, name: "Le Pont des Cultures", effect: "Immunise ses alliés contre les malus liés aux faux pas culturels face aux traditionalistes." },
          { rank: 5, name: "L'Harmonie du Voyageur", effect: "Dépensez 1 point de Vide pour imposer une trêve inviolable de 24 heures entre délégations armées." }
        ]
      },
      {
        id: "shugenja-iuchi",
        family: "Iuchi",
        name: "Shugenja Voyageur Iuchi",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 4.5,
        skills: ["Calligraphie", "Connaissance : Théologie", "Défense", "Équitation", "Herboristerie", "Méditation", "Une compétence Bugei"],
        outfit: "Robes nomades souples, Cheval de selle, Amulettes Meishodo, Bâton Bo, 4 koku",
        techniques: [
          { rank: 1, name: "Le Secret des Amulettes", effect: "Affinité : Eau. Déficience : Feu. Lie ses sorts dans des amulettes Meishodo pour les déclencher sans incantation." },
          { rank: 2, name: "Le Vent Guidant", effect: "Gagne +1g1 sur tous les sorts d'orientation, de voyage et de mouvement." },
          { rank: 3, name: "L'Éveil de l'Amulette", effect: "Peut activer une amulette Meishodo en Action Gratuite." },
          { rank: 4, name: "Le Pas des Brumes", effect: "Permet de téléporter son cheval et lui-même à 15 mètres de distance." },
          { rank: 5, name: "La Tempête Nomade", effect: "Dépensez 1 point de Vide pour libérer trois sorts d'Eau simultanément dans le même tour." }
        ]
      }
    ]
  }

};

if (typeof window !== "undefined") {
  window.CLANS_DATA = CLANS_DATA;
}
