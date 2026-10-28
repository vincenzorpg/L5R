/**
 * CLANS_DATA - Base de données officielle L5R 4e Édition
 * Huit Grands Clans : Familles, Écoles, Bonus, Compétences et Techniques de Rang 1
 */

const CLANS_DATA = {
  crabe: {
    name: "Clan du Crabe",
    kanji: "蟹",
    mon: "Crabe",
    colors: { primary: "#1c2833", secondary: "#4a6572" },
    description: "Les défenseurs infatigables de la Grande Muraille Kaiu, rempart de l'Empire contre les horreurs de l'Outremonde.",
    families: [
      { name: "Hida", trait: "Constitution", bonus: "+1 Constitution", desc: "La lignée dirigeante, réputée pour sa robustesse légendaire." },
      { name: "Hiruma", trait: "Volonté", bonus: "+1 Volonté", desc: "Les éclaireurs intrépides arpentant les terres souillées." },
      { name: "Kaiu", trait: "Intelligence", bonus: "+1 Intelligence", desc: "Les maîtres ingénieurs, architectes et forgerons du Crabe." },
      { name: "Kuni", trait: "Intuition", bonus: "+1 Intuition", desc: "Les shugenjas austères étudiant la Souillure pour mieux la purger." },
      { name: "Yasuki", trait: "Perception", bonus: "+1 Perception", desc: "Les marchands et négociateurs roublards du Crabe." }
    ],
    schools: [
      {
        id: "bushi-hida",
        name: "Bushi Hida",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Armes Lourdes (Tetsubo)", "Athlétisme", "Bataille", "Défense", "Kenjutsu", "Jiujutsu", "Une compétence Bugei au choix"],
        outfit: "Armure lourde, Daisho, Tetsubo ou Arme d'Hast, Nécessaire de voyage, 3 koku",
        technique: {
          rank: 1,
          name: "La Voie du Crabe",
          effect: "Peut porter des armures lourdes sans subir d'augmentation de malus d'armure. Ajoute sa Constitution à tous ses jets de Dégâts."
        }
      },
      {
        id: "eclaireur-hiruma",
        name: "Éclaireur Hiruma",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Discrétion", "Défense", "Kenjutsu", "Kyujutsu", "Connaissance : Outremonde"],
        outfit: "Armure légère, Daisho, Yumi avec 20 flèches, Nécessaire de voyage, 2 koku",
        technique: {
          rank: 1,
          name: "Vigilance du Rôdeur",
          effect: "Augmente la vitesse de déplacement. Ne subit pas de pénalités de terrain difficile. Obtient +1g0 à tous les jets d'Initiative et de Discrétion."
        }
      },
      {
        id: "ingenieur-kaiu",
        name: "Ingénieur Kaiu",
        type: "Artisan / Bushi",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Art de la Guerre (Siège)", "Artisanat (Forge d'armures ou d'armes)", "Défense", "Éventails de Guerre", "Ingénierie", "Connaissance : Architecture", "Une compétence Bugei ou Marchande"],
        outfit: "Armure légère, Daisho, Outils d'ingénieur, Nécessaire de voyage, 4 koku",
        technique: {
          rank: 1,
          name: "La Rigueur de la Muraille",
          effect: "Ajoute son rang d'Ingénierie à la réduction des armures qu'il fabrique ou entretient. Peut réparer l'équipement endommagé deux fois plus vite."
        }
      },
      {
        id: "shugenja-kuni",
        name: "Shugenja Kuni",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        affinity: "Terre",
        deficiency: "Air",
        skills: ["Calligraphie", "Enquête", "Méditation", "Connaissance : Théologie", "Connaissance : Outremonde", "Théurgie", "Une compétence Bugei"],
        outfit: "Robes de shugenja, Wakizashi, Bâton de marche, Rouleaux de sorts, Sac d'ingrédients, 2 koku",
        technique: {
          rank: 1,
          name: "Le Regard Inquisiteur",
          effect: "Immunité relative à l'horreur des premiers contacts de l'Outremonde. Obtient +1g1 à tous les jets de Sorts du domaine de la Terre."
        }
      },
      {
        id: "courtisan-yasuki",
        name: "Courtisan Yasuki",
        type: "Courtisan",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 2.5,
        skills: ["Commerce", "Comédie", "Courtisan", "Étiquette", "Intimidation", "Sincérité", "Une compétence Marchande ou Dégradante"],
        outfit: "Vêtements élégants de marchand, Wakizashi, Grand registre de comptes, Sac de voyage, 10 koku",
        technique: {
          rank: 1,
          name: "L'Œil du Négociant",
          effect: "Évalue instantanément la valeur marchande ou les besoins matériels d'une cible. Peut substituer le Commerce à la Sincérité pour convaincre."
        }
      }
    ]
  },

  grue: {
    name: "Clan de la Grue",
    kanji: "鶴",
    mon: "Grue",
    colors: { primary: "#e5f2fe", secondary: "#0d5c75" },
    description: "Les maîtres indiscutés de la cour, des arts raffinés et du duel Iaijutsu à travers tout l'Empire.",
    families: [
      { name: "Doji", trait: "Intuition", bonus: "+1 Intuition", desc: "La noblesse suprême et le modèle d'étiquette de Rokugan." },
      { name: "Kakita", trait: "Agilité", bonus: "+1 Agilité", desc: "Les plus grands duellistes et artisans de l'Empire." },
      { name: "Daidoji", trait: "Constitution", bonus: "+1 Constitution", desc: "La main armée de la Grue, prête aux sacrifices les plus rudes." },
      { name: "Asahina", trait: "Intelligence", bonus: "+1 Intelligence", desc: "Des shugenjas pacifiques, artisans d'objets sacrés et de tsangus." }
    ],
    schools: [
      {
        id: "duelliste-kakita",
        name: "Duelliste Kakita",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 6.5,
        skills: ["Artisanat (au choix)", "Courtisan", "Défense", "Étiquette", "Iaijutsu", "Kenjutsu", "Sincérité"],
        outfit: "Vêtements traditionnels raffinés, Daisho de maître, Nécessaire d'entretien du sabre, 5 koku",
        technique: {
          rank: 1,
          name: "La Voie de la Grue",
          effect: "Ajoute son rang d'Iaijutsu à ses jets d'Initiative. Lors d'un duel Iaijutsu, gagne une Augmentation gratuite pour chaque tranche de 5 points au jet de Concentration."
        }
      },
      {
        id: "courtisan-doji",
        name: "Courtisan Doji",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Cérémonie du Thé", "Courtisan", "Étiquette", "Oratoire", "Représentation (au choix)", "Sincérité", "Une compétence Noble au choix"],
        outfit: "Kimono de cour somptueux, Wakizashi d'apparat, Nécessaire d'écriture et de calligraphie, 10 koku",
        technique: {
          rank: 1,
          name: "Les Bienfaits de la Grâce",
          effect: "Reconnaît l'Honneur et le Statut exacts d'un interlocuteur. Réduit le ND des faveurs demandées aux autres clans."
        }
      },
      {
        id: "garde-de-fer-daidoji",
        name: "Garde de Fer Daidoji",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 5.5,
        skills: ["Armes d'Hast", "Bataille", "Défense", "Kenjutsu", "Kyujutsu", "Jiujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde, Daisho, Yari ou Naginata, Nécessaire de voyage, 3 koku",
        technique: {
          rank: 1,
          name: "La Force de la Sentinelle",
          effect: "En posture Défense ou Garde, peut intercepter une attaque dirigée contre un allié adjacent et lui transférer son propre ND d'Armure."
        }
      },
      {
        id: "shugenja-asahina",
        name: "Shugenja Asahina",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        affinity: "Air",
        deficiency: "Feu",
        skills: ["Artisanat (au choix)", "Calligraphie", "Méditation", "Connaissance : Théologie", "Théurgie", "Cérémonie du Thé", "Courtisan"],
        outfit: "Robes immaculées de shugenja, Wakizashi, Rouleaux de prières, Nécessaire d'artisan, 4 koku",
        technique: {
          rank: 1,
          name: "Le Souffle de la Paix",
          effect: "Obtient +1g1 à tous les sorts d'illusion et de protection d'Air. Interdiction stricte de lancer des sorts infligeant des dégâts directs sans perte d'Honneur."
        }
      }
    ]
  },

  dragon: {
    name: "Clan du Dragon",
    kanji: "龍",
    mon: "Dragon",
    colors: { primary: "#134e4a", secondary: "#ca8a04" },
    description: "Les mystiques ermites des montagnes du nord, adeptes de la double lame et de la philosophie de Shinsei.",
    families: [
      { name: "Mirumoto", trait: "Agilité", bonus: "+1 Agilité", desc: "Les bretteurs maîtres du style Niten à deux sabres." },
      { name: "Kitsuki", trait: "Perception", bonus: "+1 Perception", desc: "Les magistrats privilégiant les preuves matérielles et la déduction logique." },
      { name: "Tamori", trait: "Volonté", bonus: "+1 Volonté", desc: "Les prêtres guerriers utilisant des potions et la magie de la pierre." },
      { name: "Togashi", trait: "Endurance", bonus: "+1 Constitution", desc: "L'ordre monastique tatoué d'Ise Zumi suivant la voie du Premier Dragon." }
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
        outfit: "Armure légère ou lourde, Daisho Mirumoto, Nécessaire de voyage, 3 koku",
        technique: {
          rank: 1,
          name: "Le Style Deux Sabres (Niten)",
          effect: "Maniement simultané du Katana et du Wakizashi sans malus. Obtient un bonus permanent de +5 à son ND d'Armure lorsqu'il tient les deux sabres."
        }
      },
      {
        id: "enqueteur-kitsuki",
        name: "Enquêteur Kitsuki",
        type: "Courtisan / Magistrat",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 5.5,
        skills: ["Courtisan", "Droit", "Enquête", "Étiquette", "Kenjutsu", "Connaissance : Histoire", "Sincérité"],
        outfit: "Vêtements de voyage soignés, Daisho, Nécessaire d'enquêteur (loupe, craie, carnet), 4 koku",
        technique: {
          rank: 1,
          name: "Le Regard de la Vérité",
          effect: "Peut utiliser la Perception au lieu de l'Intuition lors des interactions sociales. Ne peut être trompé par de fausses déclarations non étayées."
        }
      },
      {
        id: "shugenja-tamori",
        name: "Shugenja Tamori",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 3.5,
        affinity: "Terre",
        deficiency: "Air",
        skills: ["Alchimie", "Calligraphie", "Défense", "Méditation", "Connaissance : Théologie", "Théurgie", "Kenjutsu"],
        outfit: "Robes de montagne, Daisho, Fioles alchimiques, Rouleaux de parchemin, 2 koku",
        technique: {
          rank: 1,
          name: "L'Élixir des Kami",
          effect: "Peut imprégner des potions de sorts élémentaires de Terre et de Feu. Utilise la magie au contact au corps à corps sans provoquer d'attaque d'opportunité."
        }
      },
      {
        id: "moine-togashi",
        name: "Tatoué Togashi (Ise Zumi)",
        type: "Moine",
        trait: "Vide",
        bonus: "+1 Vide",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Jiujutsu", "Méditation", "Connaissance : Théologie", "Acrobatie", "Une compétence Noble"],
        outfit: "Robes simples de pèlerin, Bâton Bo, Chapeau de paille, 1 koku",
        technique: {
          rank: 1,
          name: "Les Tatouages Mystiques",
          effect: "Possède deux tatouages magiques actifs au choix (ex : Dragon, Phénix, Flèche). Dépenser un point de Vide active les pouvoirs corporels du tatouage."
        }
      }
    ]
  },

  lion: {
    name: "Clan du Lion",
    kanji: "獅",
    mon: "Lion",
    colors: { primary: "#854d0e", secondary: "#fef08a" },
    description: "Le bras armé de l'Empereur, gardiens de la tradition militaire, de l'Histoire et du Bushido.",
    families: [
      { name: "Akodo", trait: "Perception", bonus: "+1 Perception", desc: "Les maîtres stratèges et commandants infaillibles." },
      { name: "Matsu", trait: "Force", bonus: "+1 Force", desc: "Les furies guerrières constituant la force de frappe principale." },
      { name: "Ikoma", trait: "Intelligence", bonus: "+1 Intelligence", desc: "Les conteurs, bardes et hérauts perpétuant la gloire des héros." },
      { name: "Kitsu", trait: "Volonté", bonus: "+1 Volonté", desc: "La lignée mystique communiant avec les esprits des Ancêtres." }
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
        outfit: "Armure lourde de facture Lion, Daisho, Nécessaire de voyage, 3 koku",
        technique: {
          rank: 1,
          name: "La Précision du Maître",
          effect: "Peut relancer n'importe quel dé d'Attaque ayant obtenu un résultat inférieur ou égal à son Rang d'Honneur. Ignore les malus de peur de niveau inférieur ou égal à son Rang d'Honneur."
        }
      },
      {
        id: "furie-matsu",
        name: "Furie Matsu",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 6.5,
        skills: ["Athlétisme", "Bataille", "Défense", "Intimidation", "Jiujutsu", "Kenjutsu", "Une compétence Bugei"],
        outfit: "Armure lourde, Daisho, Naginata ou Lance, 2 koku",
        technique: {
          rank: 1,
          name: "L'Assaut Dévastateur",
          effect: "En posture Attaque Complète, obtient un bonus de +1g1 aux jets de Dégâts. Ne peut jamais être mise en déroute par intimidation."
        }
      },
      {
        id: "barde-ikoma",
        name: "Barde Ikoma",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 5.5,
        skills: ["Art oratoire", "Bataille", "Comédie", "Courtisan", "Étiquette", "Connaissance : Histoire", "Représentation (Conteur)"],
        outfit: "Vêtements de voyage traditionnels, Daisho, Tambour ou instrument traditionnel, Carnet des légendes, 5 koku",
        technique: {
          rank: 1,
          name: "Le Chant de Gloire",
          effect: "Peut narrer les exploits d'un allié pour lui octroyer des points d'Honneur temporaires ou restaurer son moral contre la panique."
        }
      },
      {
        id: "shugenja-kitsu",
        name: "Shugenja Kitsu",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 5.5,
        affinity: "Eau",
        deficiency: "Feu",
        skills: ["Calligraphie", "Cérémonie du Thé", "Méditation", "Connaissance : Histoire", "Connaissance : Théologie", "Théurgie", "Défense"],
        outfit: "Robes dorées de prêtre Kitsu, Wakizashi, Reliques ancestrales, Rouleaux de sorts, 3 koku",
        technique: {
          rank: 1,
          name: "Le Sang des Esprits (Sodan-Senzo)",
          effect: "Capacité unique d'invoquer et de converser avec les esprits des samouraïs défunts (Gaki / Ancêtres) sans utiliser de sorts de Maho."
        }
      }
    ]
  },

  mante: {
    name: "Clan de la Mante",
    kanji: "螳",
    mon: "Mante",
    colors: { primary: "#15803d", secondary: "#1e3a8a" },
    description: "Les navigateurs des îles de la Soie, maîtres des tempêtes, de l'arc et du commerce maritime.",
    families: [
      { name: "Yoritomo", trait: "Endurance", bonus: "+1 Constitution", desc: "La lignée fondatrice, courageuse et prête à braver tous les océans." },
      { name: "Tsuruchi", trait: "Perception", bonus: "+1 Perception", desc: "Les anciens membres de la Guêpe, tireurs à l'arc légendaires." },
      { name: "Moshi", trait: "Intelligence", bonus: "+1 Intelligence", desc: "La famille matriarcale de prêtresses du Soleil." },
      { name: "Kitsune", trait: "Intuition", bonus: "+1 Intuition", desc: "Les anciens membres du Renard, très proches des esprits de la forêt de Chikurin." }
    ],
    schools: [
      {
        id: "bushi-yoritomo",
        name: "Bushi Yoritomo",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Armes de Paysan (Kama)", "Athlétisme", "Bataille", "Commerce", "Défense", "Kenjutsu", "Navigation"],
        outfit: "Armure légère étanche, Daisho, Paire de Kama, Nécessaire de marin, 4 koku",
        technique: {
          rank: 1,
          name: "La Fureur des Flots",
          effect: "Maniement sans pénalité d'armes exotiques ou de paysans (Kama). Bonus de +1g0 aux jets de dégâts lorsqu'il combat sur un navire ou sous la pluie."
        }
      },
      {
        id: "archer-tsuruchi",
        name: "Archer Tsuruchi",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Discrétion", "Défense", "Enquête", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Armure légère, Arc Yumi de maître, Carquois avec 30 flèches, Daisho, Nécessaire de voyage, 2 koku",
        technique: {
          rank: 1,
          name: "La Flèche Décochée",
          effect: "Ignore les pénalités liées à la portée de tir (sauf extrême). Peut encorder et tirer une flèche par une action simple au lieu d'une action complexe."
        }
      },
      {
        id: "shugenja-moshi",
        name: "Shugenja Moshi",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        affinity: "Air ou Feu",
        deficiency: "Terre",
        skills: ["Astrologie", "Calligraphie", "Méditation", "Navigation", "Connaissance : Théologie", "Théurgie", "Défense"],
        outfit: "Robes ornées du disque solaire, Wakizashi, Miroir rituel, Rouleaux de sorts, 3 koku",
        technique: {
          rank: 1,
          name: "La Flamme d'Amaterasu",
          effect: "Bonus de +1g1 aux sorts de foudre et de lumière solaire. Peut dissiper les brumes et les tempêtes deux fois plus vite."
        }
      }
    ]
  },

  phenix: {
    name: "Clan du Phénix",
    kanji: "鳳",
    mon: "Phénix",
    colors: { primary: "#b91c1c", secondary: "#fed7aa" },
    description: "Les érudits de l'Empire et les maîtres suprêmes de la magie élémentaire et de la spiritualité de Rokugan.",
    families: [
      { name: "Isawa", trait: "Volonté", bonus: "+1 Volonté", desc: "La famille de shugenjas la plus puissante et savante de l'Empire." },
      { name: "Shiba", trait: "Perception", bonus: "+1 Perception", desc: "Les samouraïs protecteurs assermentés corps et âme aux Isawa." },
      { name: "Asako", trait: "Intuition", bonus: "+1 Intuition", desc: "Les moines érudits et gardiens des archives secrètes." },
      { name: "Agasha", trait: "Intelligence", bonus: "+1 Intelligence", desc: "Anciens dragons experts en alchimie et en magie pluridisciplinaire." }
    ],
    schools: [
      {
        id: "shugenja-isawa",
        name: "Shugenja Isawa",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        affinity: "Toutes (Choix libre)",
        deficiency: "Aucune",
        skills: ["Calligraphie", "Cérémonie du Thé", "Enquête", "Méditation", "Connaissance : Histoire", "Connaissance : Théologie", "Théurgie"],
        outfit: "Robes somptueuses de shugenja, Wakizashi, Grande bibliothèque portative de rouleaux, 4 koku",
        technique: {
          rank: 1,
          name: "L'Affinité Universelle",
          effect: "Peut choisir n'importe quel Élément comme affinité sans souffrir d'aucune déficience élémentaire. Gagne une Augmentation gratuite sur les sorts de son affinité."
        }
      },
      {
        id: "bushi-shiba",
        name: "Bushi Shiba",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Armes d'Hast (Yari)", "Athlétisme", "Défense", "Iaijutsu", "Kenjutsu", "Méditation", "Connaissance : Théologie"],
        outfit: "Armure lourde, Daisho, Lance Yari, Nécessaire de voyage, 3 koku",
        technique: {
          rank: 1,
          name: "Le Bouclier de Shiba",
          effect: "Peut dépenser un point de Vide pour ajouter sa valeur de Méditation au ND d'Armure d'un shugenja allié adjacent."
        }
      },
      {
        id: "erudit-asako",
        name: "Érudit Asako (Henshin)",
        type: "Moine / Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Art oratoire", "Courtisan", "Étiquette", "Méditation", "Connaissance : Histoire", "Connaissance : Philosophie", "Sincérité"],
        outfit: "Robes simples de lettré, Wakizashi, Rouleau des mystères d'Asako, 5 koku",
        technique: {
          rank: 1,
          name: "L'Éveil Intérieur",
          effect: "Comprend les énigmes et mystères anciens. Peut substituer la Méditation aux compétences sociales face à un interlocuteur noble."
        }
      }
    ]
  },

  scorpion: {
    name: "Clan du Scorpion",
    kanji: "蠍",
    mon: "Scorpion",
    colors: { primary: "#7f1d1d", secondary: "#18181b" },
    description: "Les protecteurs de l'Empire tapis dans l'ombre, prêts à salir leur honneur pour préserver la paix de la dynastie.",
    families: [
      { name: "Bayushi", trait: "Agilité", bonus: "+1 Agilité", desc: "Les seigneurs trompeurs dissimulés derrière leurs masques énigmatiques." },
      { name: "Shosuro", trait: "Intuition", bonus: "+1 Intuition", desc: "Les acteurs et ombres insaisissables de Rokugan." },
      { name: "Soshi", trait: "Perception", bonus: "+1 Perception", desc: "Les prêtres de l'ombre maniant les illusions et les murmures." },
      { name: "Yogo", trait: "Volonté", bonus: "+1 Volonté", desc: "La famille maudite experte dans les sceaux de protection et les barrières." }
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
        outfit: "Armure légère noire laquée, Masque personnel, Daisho, Nécessaire de voyage, 3 koku",
        technique: {
          rank: 1,
          name: "La Ruse du Scorpion",
          effect: "Ajoute son score d'Iaijutsu à son Initiative. L'adversaire perd temporairement son bonus d'Agilité ou d'Armure s'il a été surpris ou déstabilisé par une feinte."
        }
      },
      {
        id: "courtisan-bayushi",
        name: "Courtisan Bayushi",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 1.5,
        skills: ["Comédie", "Courtisan", "Enquête", "Étiquette", "Intimidation", "Séduction", "Sincérité"],
        outfit: "Kimono de soie pourpre et noire, Masque orné, Wakizashi dissimulé, 8 koku",
        technique: {
          rank: 1,
          name: "La Toile des Faiblesses",
          effect: "Identifie les Désavantages sociaux et secrets d'un individu en observant son comportement en cour. Obtient +1g0 à tous les jets de manipulation."
        }
      },
      {
        id: "shinobi-shosuro",
        name: "Shinobi Shosuro",
        type: "Ninja / Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 1.5,
        skills: ["Athlétisme", "Comédie", "Contrefaçon", "Discrétion", "Kenjutsu (Ninjato)", "Poisons", "Tromperie"],
        outfit: "Tenue d'infiltration réversible, Ninjato, Cordes en soie, Outils de cambriolage, Sarbacane et 5 fléchettes empoisonnées, 2 koku",
        technique: {
          rank: 1,
          name: "L'Ombre Silencieuse",
          effect: "Attaque par surprise infligeant +2g1 aux jets de Dégâts. Ne laisse aucune trace visible ni empreinte lors de ses déplacements."
        }
      },
      {
        id: "shugenja-soshi",
        name: "Shugenja Soshi",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 2.5,
        affinity: "Air",
        deficiency: "Terre",
        skills: ["Calligraphie", "Discrétion", "Enquête", "Méditation", "Connaissance : Théologie", "Théurgie", "Tromperie"],
        outfit: "Robes sombres masquées, Wakizashi, Rouleaux d'ombres, Poudre fumigène, 3 koku",
        technique: {
          rank: 1,
          name: "Les Murmures de la Nuit",
          effect: "Peut lancer des sorts d'Air de manière totalement inaudible et invisible sans attirer l'attention des témoins."
        }
      }
    ]
  },

  licorne: {
    name: "Clan de la Licorne",
    kanji: "麒",
    mon: "Licorne",
    colors: { primary: "#581c87", secondary: "#facc15" },
    description: "Les nomades revenus des contrées barbares après huit siècles d'exploration, cavaliers hors pair maniant les arcs et sabres incurvés.",
    families: [
      { name: "Shinjo", trait: "Réflexes", bonus: "+1 Réflexes", desc: "La famille fondatrice, éclaireurs et meneurs nés du clan." },
      { name: "Moto", trait: "Force", bonus: "+1 Force", desc: "Les redoutables cavaliers du désert, imposants et féroces." },
      { name: "Utaku", trait: "Endurance", bonus: "+1 Constitution", desc: "Les Vierges Guerrières montées sur les pur-sang les plus rapides du monde." },
      { name: "Iuchi", trait: "Intuition", bonus: "+1 Intuition", desc: "Les maîtres du Meishodo, magie des talismans rapportée d'occident." },
      { name: "Ide", trait: "Volonté", bonus: "+1 Volonté", desc: "Les émissaires bienveillants et pacificateurs de la Licorne." }
    ],
    schools: [
      {
        id: "bushi-moto",
        name: "Bushi Moto",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Art de la Guerre (Bataille)", "Armes d'Hast", "Défense", "Équitation", "Kenjutsu (Scimitar)", "Kyujutsu", "Une compétence Bugei"],
        outfit: "Armure lourde en écailles de cuir, Sabre incurvé, Arc de cavalier, Monture Steppe Pony avec selle, 3 koku",
        technique: {
          rank: 1,
          name: "La Charge du Tonnerre",
          effect: "Dégâts accrus lors d'une charge à cheval (+2g0). Ne subit aucun malus de maniement d'arme lorsqu'il combat monté."
        }
      },
      {
        id: "vierge-utaku",
        name: "Vierge Guerrière Utaku",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 6.5,
        skills: ["Défense", "Dressage", "Équitation", "Iaijutsu", "Kenjutsu", "Sincérité", "Une compétence Bugei"],
        outfit: "Armure lourde ornée, Daisho, Pur-sang Otaku dressé au combat, Équipement de monte royal, 5 koku",
        technique: {
          rank: 1,
          name: "La Pureté du Galop",
          effect: "Ne peut être désarçonnée de sa monture. Ajoute son rang d'Équitation à son ND d'Armure lorsqu'elle monte son destrier Otaku."
        }
      },
      {
        id: "shugenja-iuchi",
        name: "Shugenja Iuchi",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 4.5,
        affinity: "Eau",
        deficiency: "Feu",
        skills: ["Calligraphie", "Divination", "Équitation", "Méditation", "Connaissance : Théologie", "Théurgie", "Défense"],
        outfit: "Manteau de voyage fourré, Wakizashi, Sacoche de talismans de Meishodo, Sacoche à parchemins, Cheval de selle, 4 koku",
        technique: {
          rank: 1,
          name: "L'Appel du Voyageur",
          effect: "Augmente la vitesse de ses alliés et soigne la fatigue des montures. Bonus de +1g1 aux sorts de mouvement et de voyage d'Eau."
        }
      },
      {
        id: "emissaire-ide",
        name: "Émissaire Ide",
        type: "Courtisan",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 5.5,
        skills: ["Commerce", "Courtisan", "Équitation", "Étiquette", "Oratoire", "Sincérité", "Une compétence Noble"],
        outfit: "Robes d'ambassadeur ornées de soie violette, Wakizashi, Monture docile, Cadeaux diplomatiques, 10 koku",
        technique: {
          rank: 1,
          name: "Le Cœur Ouvert",
          effect: "Désamorce les hostilités immédiates. Ne peut être provoqué en duel sans que l'adversaire ne subisse une lourde perte de Gloire et d'Honneur."
        }
      }
    ]
  }
};

// Exposer globalement pour une utilisation directe dans le navigateur
if (typeof window !== "undefined") {
  window.CLANS_DATA = CLANS_DATA;
  window.CLANS_CORE = CLANS_DATA;
}

// Support pour les modules CommonJS / Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = CLANS_DATA;
}
