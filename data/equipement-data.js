/**
 * data/equipement-data.js — L5R 4e Édition (Livre de Base p. 198-204)
 * Fournit la structure exacte attendue par getEquipment() : eq.armures et eq.armes
 */

(function () {
  // 1. ARMURES OFFICIELLES (Livre de Base p. 198)
  // tn correspond à la valeur lue par character-generator.js ("0", "5", "10", etc.)
  const ARMURES_LIST = [
    {
      id: "none",
      name: "Aucune armure (Kimono)",
      tn: "0",
      bonus: 0,
      reduc: 0,
      reduction: 0,
      price: "0 koku"
    },
    {
      id: "ashigaru",
      name: "Armure d'Ashigaru (+3 ND, Réd. 1)",
      tn: "3",
      bonus: 3,
      reduc: 1,
      reduction: 1,
      price: "5 koku"
    },
    {
      id: "light",
      name: "Armure légère (+5 ND, Réd. 3)",
      tn: "5",
      bonus: 5,
      reduc: 3,
      reduction: 3,
      price: "15 koku"
    },
    {
      id: "heavy",
      name: "Armure lourde (+10 ND, Réd. 5)",
      tn: "10",
      bonus: 10,
      reduc: 5,
      reduction: 5,
      price: "40 koku"
    },
    {
      id: "riding",
      name: "Armure de cavalerie (+7 ND, Réd. 4)",
      tn: "7",
      bonus: 7,
      reduc: 4,
      reduction: 4,
      price: "35 koku"
    }
  ];

  // 2. ARMES OFFICIELLES (Livre de Base p. 199-204)
  // Propriétés attendues : name, vd (pour le texte), type (pour le texte)
  const ARMES_LIST = [
    // Sabres
    {
      id: "katana",
      name: "Katana",
      vd: "3g2",
      dr: "3k2",
      type: "Sabre (Moyen)",
      category: "Sabres",
      skill: "Kenjutsu"
    },
    {
      id: "wakizashi",
      name: "Wakizashi",
      vd: "2g2",
      dr: "2k2",
      type: "Sabre (Petit)",
      category: "Sabres",
      skill: "Kenjutsu"
    },
    {
      id: "nodachi",
      name: "No-Dachi",
      vd: "3g3",
      dr: "3k3",
      type: "Sabre (Grand, 2 mains)",
      category: "Sabres",
      skill: "Kenjutsu"
    },
    {
      id: "ninja-to",
      name: "Ninja-tō",
      vd: "2g2",
      dr: "2k2",
      type: "Sabre (Moyen)",
      category: "Sabres",
      skill: "Kenjutsu"
    },

    // Armes Lourdes (L5R 4e Édition stricte)
    {
      id: "tetsubo",
      name: "Tetsubo",
      vd: "3g3", // 3g3 officiel L5R 4e
      dr: "3k3",
      type: "Arme Lourde (Grand, 2 mains)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes"
    },
    {
      id: "dai-tsuchi",
      name: "Dai Tsuchi",
      vd: "5g2",
      dr: "5k2",
      type: "Arme Lourde (Grand, 2 mains)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes"
    },
    {
      id: "ono",
      name: "Ono",
      vd: "0g4",
      dr: "0k4",
      type: "Arme Lourde (Grand, 2 mains)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes"
    },
    {
      id: "masakari",
      name: "Masakari",
      vd: "2g3",
      dr: "2k3",
      type: "Arme Lourde (Moyen)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes"
    },

    // Armes d'Hast
    {
      id: "naginata",
      name: "Naginata",
      vd: "3g2",
      dr: "3k2",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast"
    },
    {
      id: "bisento",
      name: "Bisento",
      vd: "3g3",
      dr: "3k3",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast"
    },
    {
      id: "nagamaki",
      name: "Nagamaki",
      vd: "2g3",
      dr: "2k3",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast"
    },
    {
      id: "sasumata",
      name: "Sasumata",
      vd: "0g2",
      dr: "0k2",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast"
    },

    // Lances
    {
      id: "yari",
      name: "Yari",
      vd: "2g2",
      dr: "2k2",
      type: "Lance (Grand)",
      category: "Lances",
      skill: "Lances"
    },
    {
      id: "nage-yari",
      name: "Nage-Yari",
      vd: "1g2",
      dr: "1k2",
      type: "Lance / Javelot (Moyen)",
      category: "Lances",
      skill: "Lances"
    },

    // Couteaux
    {
      id: "tanto",
      name: "Tanto",
      vd: "1g2",
      dr: "1k2",
      type: "Couteau (Petit)",
      category: "Couteaux",
      skill: "Couteaux"
    },
    {
      id: "aiguchi",
      name: "Aiguchi",
      vd: "1g2",
      dr: "1k2",
      type: "Couteau (Petit)",
      category: "Couteaux",
      skill: "Couteaux"
    },

    // Bâtons
    {
      id: "bo",
      name: "Bō",
      vd: "1g2",
      dr: "1k2",
      type: "Bâton (Grand)",
      category: "Bâtons",
      skill: "Bâtons"
    },
    {
      id: "jo",
      name: "Jō",
      vd: "1g1",
      dr: "1k1",
      type: "Bâton (Moyen)",
      category: "Bâtons",
      skill: "Bâtons"
    },

    // Arcs
    {
      id: "yumi",
      name: "Arc Yumi",
      vd: "2g2",
      dr: "2k2",
      type: "Tir à distance (Moyen)",
      category: "Arcs",
      skill: "Tir à l'Arc"
    },
    {
      id: "daikyu",
      name: "Dai-Kyū",
      vd: "3g2",
      dr: "3k2",
      type: "Tir à distance (Grand)",
      category: "Arcs",
      skill: "Tir à l'Arc"
    },

    // Armes diverses
    {
      id: "jitte",
      name: "Jitte",
      vd: "1g1",
      dr: "1k1",
      type: "Défense (Petit)",
      category: "Armes de Jitte",
      skill: "Jitte"
    },
    {
      id: "kama",
      name: "Kama",
      vd: "1g2",
      dr: "1k2",
      type: "Paysan (Petit)",
      category: "Armes Paysannes",
      skill: "Armes Paysannes"
    },
    {
      id: "tonfa",
      name: "Tonfa",
      vd: "0g3",
      dr: "0k3",
      type: "Paysan (Moyen)",
      category: "Armes Paysannes",
      skill: "Armes Paysannes"
    }
  ];

  const EQUIPEMENT_OBJ = {
    armures: ARMURES_LIST,
    armes: ARMES_LIST,
    armors: ARMURES_LIST,
    weapons: ARMES_LIST
  };

  if (typeof window !== "undefined") {
    window.EQUIPEMENT_DATA = EQUIPEMENT_OBJ;
    window.EQUIPMENT_DATA = EQUIPEMENT_OBJ;

    window.L5R_DATA = window.L5R_DATA || {};
    window.L5R_DATA.armures = ARMURES_LIST;
    window.L5R_DATA.armes = ARMES_LIST;
    window.L5R_DATA.armors = ARMURES_LIST;
    window.L5R_DATA.weapons = ARMES_LIST;
    window.L5R_DATA.equipment = EQUIPEMENT_OBJ;
    window.L5R_DATA.equipement = EQUIPEMENT_OBJ;

    // Définition directe de getEquipment au cas où
    window.getEquipment = function () {
      return EQUIPEMENT_OBJ;
    };
  }
})();
