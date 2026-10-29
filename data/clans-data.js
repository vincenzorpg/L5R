/**
 * CLANS_DATA - Les Grands Clans de Rokugan et leurs 5 Rangs de Techniques (L5R 4e Édition)
 */
const CLANS_DATA = {
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
      {
        id: "bushi-hida",
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
          { rank: 3, name: "Deux Pinces, Un Seul Esprit", effect: "Peut effectuer ses attaques comme des Actions Simples (au lieu d'Actions Complexes) avec les Armes Lourdes ou armes possédant le mot-clé Samouraï." },
          { rank: 4, name: "Frappe Dévastatrice", effect: "Une fois par escarmouche avec une Arme Lourde : réduit la Réduction adverse de 4 sur l'attaque. Si l'attaque touche, la cible est Étourdie (Dazed)." },
          { rank: 5, name: "La Montagne ne Tombe Jamais", effect: "Dépensez 1 point de Vide pendant la phase de Réaction : vous agissez comme étant au palier Indemne (+0) durant tout votre prochain tour et ignorez les états Étourdi et Fatigué." }
        ]
      },
      {
        id: "eclaireur-hiruma",
        name: "Éclaireur Hiruma",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Discrétion", "Défense", "Kenjutsu", "Kyujutsu", "Connaissance : Outremonde"],
        outfit: "Armure légère, Daisho, Arc Yumi avec 20 flèches, 3 koku",
        techniques: [
          { rank: 1, name: "La Flamme de la Torche Vacille", effect: "En posture d'Attaque, gagne +1g0 à tous les jets d'attaque. Double la durée de conservation des rations de survie et de jade pour lui et ses compagnons." },
          { rank: 2, name: "La Leçon du Loup", effect: "Ajoute son rang d'Athlétisme + 5 à son ND d'Armure par Augmentation déclarée sur une attaque." },
          { rank: 3, name: "Ailes du Colibri", effect: "Une fois par round : peut tenter d'esquiver une attaque ennemie avec un jet opposé d'Agilité + Défense contre le jet d'attaque de l'adversaire." },
          { rank: 4, name: "L'Odorat du Requin", effect: "Attaquer devient une Action Simple, ou permet d'effectuer deux esquives réactives par round." },
          { rank: 5, name: "Le Jour sans Geste Superflu", effect: "Obtient une Action de Mouvement gratuite supplémentaire chaque tour et inflige +2g2 aux dégâts lors d'attaques par surprise." }
        ]
      }
    ]
  },

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
        name: "Duelliste Kakita",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 6.5,
        skills: ["Artisanat", "Courtisan", "Défense", "Étiquette", "Iaijutsu", "Kenjutsu", "Sincérité"],
        outfit: "Kimono raffiné, Daisho de maître, Nécessaire d'entretien, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Grue", effect: "Ajoute le double de son rang d'Iaijutsu à son Initiative. En posture du Centre, gagne +1g1 + Rang d'École à ses jets d'attaque et de Concentration." },
          { rank: 2, name: "Vélocité de l'Éclair", effect: "Gagne un bonus de +2g0 à tous ses jets d'attaque contre les adversaires ayant une Initiative inférieure à la sienne." },
          { rank: 3, name: "Première et Dernière Frappe", effect: "En duel d'Iaijutsu, frappe en premier dès que la marge de victoire au jet de Concentration atteint 3 (au lieu de 5), et gagne une Augmentation gratuite par tranche supplémentaire de 3." },
          { rank: 4, name: "Une Frappe, Deux Entailles", effect: "Peut attaquer en Action Simple avec les armes portant le mot-clé Samouraï." },
          { rank: 5, name: "Frapper sans Pensée", effect: "Peut effectuer une Action Simple en posture du Centre et peut demeurer dans cette posture autant de rounds consécutifs que souhaité." }
        ]
      },
      {
        id: "courtisan-doji",
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
          { rank: 3, name: "L'Épreuve d'Honneur", effect: "En joute verbale, force un adversaire à tester sa Volonté contre son jet de Courtisan sous peine de perdre 1 rang d'Honneur ou de concéder le débat." },
          { rank: 4, name: "Mille Murmures dans l'Ombre", effect: "Immunité totale contre la perte de Gloire liée aux manœuvres de cour. Peut manipuler les rumeurs sans laisser de trace." },
          { rank: 5, name: "La Volonté de l'Empereur", effect: "Une requête officielle formulée avec déférence impose un jet de Volonté ND 30 pour oser refuser." }
        ]
      }
    ]
  },

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
        name: "Bushi Mirumoto",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Défense", "Iaijutsu", "Kenjutsu", "Kyujutsu", "Méditation", "Connaissance : Théologie", "Une compétence Bugei"],
        outfit: "Armure légère ou lourde, Daisho Mirumoto, 3 koku",
        techniques: [
          { rank: 1, name: "Le Style Niten", effect: "Maniement simultané Katana et Wakizashi sans malus de main faible. Confère un bonus permanent de +5 au ND d'Armure." },
          { rank: 2, name: "Fort comme la Montagne", effect: "Ses attaques ignorent les pénalités environnementales et il devient impossible à désarmer." },
          { rank: 3, name: "Frapper comme l'Eau", effect: "Attaquer devient une Action Simple lorsque le bushi manie deux lames simultanément." },
          { rank: 4, name: "Maîtrise des Deux Lames", effect: "Gagne deux Augmentations gratuites utilisables pour les manœuvres de Feinte, Désarmement ou Garde." },
          { rank: 5, name: "La Double Frappe du Dragon", effect: "Lors d'une Attaque Simple, chaque coup réussi déclenche une riposte immédiate de la seconde arme." }
        ]
      }
    ]
  },

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
        name: "Bushi Akodo",
        type: "Bushi",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 6.5,
        skills: ["Art de la Guerre (Bataille)", "Défense", "Iaijutsu", "Kenjutsu", "Kyujutsu", "Connaissance : Histoire", "Sincérité"],
        outfit: "Armure lourde Lion, Daisho, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Lion", effect: "Peut relancer tous les dés d'attaque affichant un résultat inférieur ou égal à son Rang d'Honneur. Ajoute +1g0 aux dégâts." },
          { rank: 2, name: "La Force de la Certitude", effect: "Ajoute son Rang d'Honneur au total de ses jets de Volonté et jets de résistance à la Peur." },
          { rank: 3, name: "Rapide comme le Lion", effect: "Attaquer devient une Action Simple avec les armes de mêlée de Samouraï." },
          { rank: 4, name: "La Furie d'Akodo", effect: "En escarmouche, ajoute le nombre d'alliés adjacents au résultat de ses jets d'attaque (max Insight x 2)." },
          { rank: 5, name: "La Victoire Finale", effect: "Dépensez 1 point de Vide : ajoute son Rang d'Honneur à tous les jets de dégâts et de compétences Bugei du tour." }
        ]
      }
    ]
  },

  mante: {
    name: "Clan de la Mante",
    families: [
      { name: "Yoritomo", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Tsuruchi", trait: "Perception", bonus: "+1 Perception" },
      { name: "Moshi", trait: "Intelligence", bonus: "+1 Intelligence" }
    ],
    schools: [
      {
        id: "archer-tsuruchi",
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
          { rank: 5, name: "L'Œil de Tsuruchi", effect: "Action Complexe : concentre son tir pour obtenir +4g1 sur le jet d'attaque et le jet de dégâts de la flèche." }
        ]
      }
    ]
  },

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
        name: "Bushi Shiba",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Armes d'Hast (Yari)", "Athlétisme", "Défense", "Iaijutsu", "Kenjutsu", "Méditation", "Connaissance : Théologie"],
        outfit: "Armure lourde, Daisho, Lance Yari, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Phénix", effect: "Peut dépenser 2 points de Vide pour obtenir +2g2 sur un jet. L'action Protéger devient une Action Gratuite (+5 ND Armure allié)." },
          { rank: 2, name: "Danse avec les Éléments", effect: "À 10 mètres, peut augmenter ou diminuer le ND de n'importe quel sort lancé de 5 points." },
          { rank: 3, name: "Le Bouclier de Shiba", effect: "Attaquer devient une Action Simple avec les armes de mêlée de Samouraï ou armes d'hast." },
          { rank: 4, name: "L'Esprit Immortel", effect: "Subir des blessures mortelles permet de dépenser 1 point de Vide pour ignorer les dégâts et continuer d'agir." },
          { rank: 5, name: "L'Harmonie du Néant", effect: "Dépensez 1 point de Vide pour dissoudre complètement une attaque physique dans le Vide sans subir de dégâts." }
        ]
      }
    ]
  },

  scorpion: {
    name: "Clan du Scorpion",
    families: [
      { name: "Bayushi", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Shosuro", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Soshi", trait: "Perception", bonus: "+1 Perception" },
      { name: "Yogo", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      {
        id: "bushi-bayushi",
        name: "Bushi Bayushi",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 2.5,
        skills: ["Comédie", "Défense", "Discrétion", "Enquête", "Iaijutsu", "Kenjutsu", "Une compétence Bugei"],
        outfit: "Armure légère noire, Masque personnel, Daisho, 3 koku",
        techniques: [
          { rank: 1, name: "La Ruse du Scorpion", effect: "Ajoute son rang d'Iaijutsu à son Initiative. Toute feinte réussie prive temporairement la cible de son armure." },
          { rank: 2, name: "Le Regard des Ombres", effect: "Gagne un bonus de +2g0 à tous ses jets d'attaque contre un ennemi ayant une Initiative inférieure à la sienne." },
          { rank: 3, name: "Frappe depuis l'Obscurité", effect: "Attaquer devient une Action Simple avec les armes de Samouraï." },
          { rank: 4, name: "L'Ombre Dérobée", effect: "Lorsqu'un ennemi manque son attaque contre lui, il peut déclencher une riposte immédiate en Action Gratuite." },
          { rank: 5, name: "Le Venin du Scorpion", effect: "Chaque coup de mêlée applique un venin paralysant infligeant des blessures continues et réduisant les traits adverses." }
        ]
      }
    ]
  },

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
        name: "Bushi Moto",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Art de la Guerre (Bataille)", "Armes d'Hast", "Défense", "Équitation", "Kenjutsu", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde en cuir d'écaille, Cimeterre, Poney des steppes harnaché, 3 koku",
        techniques: [
          { rank: 1, name: "La Charge du Tonnerre", effect: "+2g0 aux jets de dégâts en charge montée. Annule toutes les pénalités de combat à cheval." },
          { rank: 2, name: "L'Esprit des Steppes", effect: "Immunité totale contre les effets de Peur de rang inférieur ou égal à son Rang d'École." },
          { rank: 3, name: "La Fureur Inaltérable", effect: "Attaquer devient une Action Simple avec les sabres, cimeterres ou armes d'hast." },
          { rank: 4, name: "La Rage du Tonnerre", effect: "Peut relancer tous les dés de dégâts affichant un résultat inférieur à son rang de Force." },
          { rank: 5, name: "Le Galop Éternel", effect: "Double sa vitesse de déplacement montée et inflige des dégâts d'écrasement dévastateurs à tous les ennemis traversés." }
        ]
      }
    ]
  }
};

if (typeof window !== "undefined") window.CLANS_DATA = CLANS_DATA;
