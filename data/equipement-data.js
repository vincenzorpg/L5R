/**
 * data/equipement-data.js — L5R 4e Édition (Livre de Base p. 198-204)
 * Initialise L5R_DATA.weapons et L5R_DATA.armors pour character-generator.js
 */

(function () {
  // =========================================================================
  // 1. ARMURES OFFICIELLES (LIVRE DE BASE P. 198)
  // =========================================================================
  const ARMORS_DICT = {
    "none": {
      id: "none",
      name: "Aucune armure (Kimono)",
      bonus: 0,
      bonusTN: 0,
      armorBonus: 0,
      reduction: 0,
      reduc: 0,
      price: "0 koku",
      rules: "ND d'Armure de base : (Réflexes × 5) + 5. Aucune Réduction ni malus."
    },
    "ashigaru": {
      id: "ashigaru",
      name: "Armure d'Ashigaru",
      bonus: 3,
      bonusTN: 3,
      armorBonus: 3,
      reduction: 1,
      reduc: 1,
      price: "5 koku",
      rules: "+3 au ND d'Armure, Réduction 1."
    },
    "light": {
      id: "light",
      name: "Armure légère",
      bonus: 5,
      bonusTN: 5,
      armorBonus: 5,
      reduction: 3,
      reduc: 3,
      price: "15 koku",
      rules: "+5 au ND d'Armure, Réduction 3."
    },
    "heavy": {
      id: "heavy",
      name: "Armure lourde",
      bonus: 10,
      bonusTN: 10,
      armorBonus: 10,
      reduction: 5,
      reduc: 5,
      price: "40 koku",
      rules: "+10 au ND d'Armure, Réduction 5. Pénalité de +5 au ND des jets d'Athlétisme et de Furtivité."
    },
    "riding": {
      id: "riding",
      name: "Armure de cavalerie",
      bonus: 7,
      bonusTN: 7,
      armorBonus: 7,
      reduction: 4,
      reduc: 4,
      price: "35 koku",
      rules: "+7 au ND d'Armure, Réduction 4. Conçue pour le combat monté."
    }
  };

  // =========================================================================
  // 2. ARMES OFFICIELLES (LIVRE DE BASE P. 199-204)
  // Règle de dégâts de mêlée : (Force + premier chiffre) g (deuxième chiffre)
  // =========================================================================
  const WEAPONS_DICT = {
    // --- SABRES & LAMES (KENJUTSU / IAIJUTSU) ---
    "katana": {
      id: "katana",
      name: "Katana",
      category: "Sabres",
      skill: "Kenjutsu",
      dr: "3k2",
      damage: "3k2",
      drDisplay: "3g2",
      rolled: 3,
      kept: 2,
      diceRolled: 3,
      diceKept: 2,
      size: "Moyen",
      price: "Inestimable (25 koku)",
      rules: "Vous pouvez dépenser 1 point de Vide pour ajouter +1g1 aux dégâts d'une frappe réussie."
    },
    "wakizashi": {
      id: "wakizashi",
      name: "Wakizashi",
      category: "Sabres",
      skill: "Kenjutsu",
      dr: "2k2",
      damage: "2k2",
      drDisplay: "2g2",
      rolled: 2,
      kept: 2,
      diceRolled: 2,
      diceKept: 2,
      size: "Petit",
      price: "Inestimable (15 koku)",
      rules: "Lame d'honneur du daishō, seppuku, et maniement à deux armes."
    },
    "nodachi": {
      id: "nodachi",
      name: "No-Dachi",
      category: "Sabres",
      skill: "Kenjutsu",
      dr: "3k3",
      damage: "3k3",
      drDisplay: "3g3",
      rolled: 3,
      kept: 3,
      diceRolled: 3,
      diceKept: 3,
      size: "Grand",
      price: "30 koku",
      rules: "Grand sabre à deux mains de cavalerie et de siège."
    },
    "ninja-to": {
      id: "ninja-to",
      name: "Ninja-tō",
      category: "Sabres",
      skill: "Kenjutsu",
      dr: "2k2",
      damage: "2k2",
      drDisplay: "2g2",
      rolled: 2,
      kept: 2,
      diceRolled: 2,
      diceKept: 2,
      size: "Moyen",
      price: "5 koku",
      rules: "Lame droite courte. Se brise si l'attaque inflige plus de 40 blessures."
    },

    // --- ARMES LOURDES (ARMES LOURDES / HEAVY WEAPONS) ---
    "tetsubo": {
      id: "tetsubo",
      name: "Tetsubō",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      dr: "3k3", // Valeur officielle stricte L5R 4e
      damage: "3k3",
      drDisplay: "3g3",
      rolled: 3,
      kept: 3,
      diceRolled: 3,
      diceKept: 3,
      size: "Grand",
      price: "10 koku",
      rules: "Gourdin ferré ou garni de pointes. Dégâts dévastateurs au corps-à-corps : (Force + 3)g3."
    },
    "dai-tsuchi": {
      id: "dai-tsuchi",
      name: "Dai Tsuchi",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      dr: "5k2",
      damage: "5k2",
      drDisplay: "5g2",
      rolled: 5,
      kept: 2,
      diceRolled: 5,
      diceKept: 2,
      size: "Grand",
      price: "15 koku",
      rules: "Marteau de guerre massif à deux mains conçu pour briser les carapaces d'Outremonde."
    },
    "ono": {
      id: "ono",
      name: "Ono",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      dr: "0k4",
      damage: "0k4",
      drDisplay: "0g4",
      rolled: 0,
      kept: 4,
      diceRolled: 0,
      diceKept: 4,
      size: "Grand",
      price: "20 koku",
      rules: "Grande hache à deux mains. Dés lancés basés exclusivement sur la Force : (Force)g4."
    },
    "masakari": {
      id: "masakari",
      name: "Masakari",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      dr: "2k3",
      damage: "2k3",
      drDisplay: "2g3",
      rolled: 2,
      kept: 3,
      diceRolled: 2,
      diceKept: 3,
      size: "Moyen",
      price: "8 koku",
      rules: "Hache de guerre à une main."
    },

    // --- ARMES D'HAST (POLEARMS) ---
    "naginata": {
      id: "naginata",
      name: "Naginata",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      dr: "3k2",
      damage: "3k2",
      drDisplay: "3g2",
      rolled: 3,
      kept: 2,
      diceRolled: 3,
      diceKept: 2,
      size: "Grand",
      price: "10 koku",
      rules: "Lame courbe sur hampe en bois dur."
    },
    "bisento": {
      id: "bisento",
      name: "Bisento",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      dr: "3k3",
      damage: "3k3",
      drDisplay: "3g3",
      rolled: 3,
      kept: 3,
      diceRolled: 3,
      diceKept: 3,
      size: "Grand",
      price: "12 koku",
      rules: "Variante lourde de la naginata avec lame renforcée."
    },
    "nagamaki": {
      id: "nagamaki",
      name: "Nagamaki",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      dr: "2k3",
      damage: "2k3",
      drDisplay: "2g3",
      rolled: 2,
      kept: 3,
      diceRolled: 2,
      diceKept: 3,
      size: "Grand",
      price: "10 koku",
      rules: "Lame d'épée sur manche d'égale longueur offrant un fort bras de levier."
    },
    "sasumata": {
      id: "sasumata",
      name: "Sasumata",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      dr: "0k2",
      damage: "0k2",
      drDisplay: "0g2",
      rolled: 0,
      kept: 2,
      diceRolled: 0,
      diceKept: 2,
      size: "Grand",
      price: "5 bu",
      rules: "Fourche de capture utilisée par les magistrats pour immobiliser."
    },

    // --- LANCES (SPEARS) ---
    "yari": {
      id: "yari",
      name: "Yari",
      category: "Lances",
      skill: "Lances",
      dr: "2k2",
      damage: "2k2",
      drDisplay: "2g2",
      rolled: 2,
      kept: 2,
      diceRolled: 2,
      diceKept: 2,
      size: "Grand",
      price: "3 bu",
      rules: "Pique d'infanterie standard de 2 à 3 mètres à double tranchant."
    },
    "nage-yari": {
      id: "nage-yari",
      name: "Nage-Yari",
      category: "Lances",
      skill: "Lances",
      dr: "1k2",
      damage: "1k2",
      drDisplay: "1g2",
      rolled: 1,
      kept: 2,
      diceRolled: 1,
      diceKept: 2,
      size: "Moyen",
      price: "2 bu",
      rules: "Javelot d'hast court pouvant être lancé à 15 m ou utilisé au contact."
    },

    // --- COUTEAUX (KNIVES) ---
    "tanto": {
      id: "tanto",
      name: "Tantō",
      category: "Couteaux",
      skill: "Couteaux",
      dr: "1k2",
      damage: "1k2",
      drDisplay: "1g2",
      rolled: 1,
      kept: 2,
      diceRolled: 1,
      diceKept: 2,
      size: "Petit",
      price: "2 koku",
      rules: "Dague traditionnelle samouraï à garde (tsuba)."
    },
    "aiguchi": {
      id: "aiguchi",
      name: "Aiguchi",
      category: "Couteaux",
      skill: "Couteaux",
      dr: "1k2",
      damage: "1k2",
      drDisplay: "1g2",
      rolled: 1,
      kept: 2,
      diceRolled: 1,
      diceKept: 2,
      size: "Petit",
      price: "1 koku",
      rules: "Dague sans garde facilement dissimulable dans un vêtement."
    },

    // --- BÂTONS (STAVES) ---
    "bo": {
      id: "bo",
      name: "Bō",
      category: "Bâtons",
      skill: "Bâtons",
      dr: "1k2",
      damage: "1k2",
      drDisplay: "1g2",
      rolled: 1,
      kept: 2,
      diceRolled: 1,
      diceKept: 2,
      size: "Grand",
      price: "1 bu",
      rules: "Bâton en bois dur de 1,80 m. Les armures doublent leur bonus de ND face au Bō."
    },
    "jo": {
      id: "jo",
      name: "Jō",
      category: "Bâtons",
      skill: "Bâtons",
      dr: "1k1",
      damage: "1k1",
      drDisplay: "1g1",
      rolled: 1,
      kept: 1,
      diceRolled: 1,
      diceKept: 1,
      size: "Moyen",
      price: "5 zeni",
      rules: "Bâton court de marche (1,20 m)."
    },

    // --- ARCS & FLÈCHES (KYUJUTSU) ---
    "yumi": {
      id: "yumi",
      name: "Arc Yumi",
      category: "Arcs",
      skill: "Tir à l'Arc",
      dr: "2k2",
      damage: "2k2",
      drDisplay: "2g2 (Flèche)",
      rolled: 2,
      kept: 2,
      diceRolled: 2,
      diceKept: 2,
      size: "Moyen",
      price: "8 koku",
      rules: "Portée 100'. Dégâts = Force de l'arc (3 de base) + Type de flèche."
    },
    "daikyu": {
      id: "daikyu",
      name: "Dai-Kyū",
      category: "Arcs",
      skill: "Tir à l'Arc",
      dr: "3k2",
      damage: "3k2",
      drDisplay: "3g2 (Flèche)",
      rolled: 3,
      kept: 2,
      diceRolled: 3,
      diceKept: 2,
      size: "Grand",
      price: "25 koku",
      rules: "Grand arc asymétrique monté. Portée 500'. Force 4."
    },

    // --- ARMES PAYSANNES & MARTIALES ---
    "jitte": {
      id: "jitte",
      name: "Jitte",
      category: "Armes Paysannes",
      skill: "Armes Paysannes",
      dr: "1k1",
      damage: "1k1",
      drDisplay: "1g1",
      rolled: 1,
      kept: 1,
      diceRolled: 1,
      diceKept: 1,
      size: "Petit",
      price: "5 bu",
      rules: "Tringle de fer à crochet conférant 1 Augmentation gratuite pour désarmer."
    },
    "kama": {
      id: "kama",
      name: "Kama",
      category: "Armes Paysannes",
      skill: "Armes Paysannes",
      dr: "1k2",
      damage: "1k2",
      drDisplay: "1g2",
      rolled: 1,
      kept: 2,
      diceRolled: 1,
      diceKept: 2,
      size: "Petit",
      price: "1 bu",
      rules: "Faucille à riz traditionnelle (arme de prédilection de la Mante)."
    },
    "nunchaku": {
      id: "nunchaku",
      name: "Nunchaku",
      category: "Armes Paysannes",
      skill: "Armes Paysannes",
      dr: "1k2",
      damage: "1k2",
      drDisplay: "1g2",
      rolled: 1,
      kept: 2,
      diceRolled: 1,
      diceKept: 2,
      size: "Petit",
      price: "1 bu",
      rules: "Fléau court articulé."
    },
    "tonfa": {
      id: "tonfa",
      name: "Tonfa",
      category: "Armes Paysannes",
      skill: "Armes Paysannes",
      dr: "0k3",
      damage: "0k3",
      drDisplay: "0g3",
      rolled: 0,
      kept: 3,
      diceRolled: 0,
      diceKept: 3,
      size: "Moyen",
      price: "5 bu",
      rules: "Manivelle de meule en bois. Dégâts basés sur la Force : (Force)g3."
    },
    "unarmed": {
      id: "unarmed",
      name: "Mains nues / Jiujutsu",
      category: "Corps à corps",
      skill: "Jiujutsu",
      dr: "0k1",
      damage: "0k1",
      drDisplay: "0g1",
      rolled: 0,
      kept: 1,
      diceRolled: 0,
      diceKept: 1,
      size: "Petit",
      price: "0 koku",
      rules: "Frappe à mains nues ou coups de pied : (Force)g1 blessures."
    }
  };

  // 3. ENRICHISSEMENT AVEC ALIAS SANS DOUBLONS DANS LES MENUS DÉROULANTS
  Object.keys(ARMORS_DICT).forEach(key => {
    const item = ARMORS_DICT[key];
    Object.defineProperty(ARMORS_DICT, item.name, { value: item, enumerable: false, writable: true });
    Object.defineProperty(ARMORS_DICT, `arm-${key}`, { value: item, enumerable: false, writable: true });
  });

  Object.keys(WEAPONS_DICT).forEach(key => {
    const item = WEAPONS_DICT[key];
    Object.defineProperty(WEAPONS_DICT, item.name, { value: item, enumerable: false, writable: true });
    Object.defineProperty(WEAPONS_DICT, `wep-${key}`, { value: item, enumerable: false, writable: true });
  });

  // 4. EXPOSITION GLOBALE MULTI-COMPATIBILITÉ
  if (typeof window !== "undefined") {
    window.L5R_DATA = window.L5R_DATA || {};
    window.L5R_DATA.armors = ARMORS_DICT;
    window.L5R_DATA.weapons = WEAPONS_DICT;
    window.L5R_DATA.equipment = { armors: ARMORS_DICT, weapons: WEAPONS_DICT };
    window.L5R_DATA.equipement = { armors: ARMORS_DICT, weapons: WEAPONS_DICT };

    window.ARMORS_DATA = Object.values(ARMORS_DICT);
    window.WEAPONS_DATA = Object.values(WEAPONS_DICT);
    window.EQUIPEMENT_DATA = { armors: ARMORS_DICT, weapons: WEAPONS_DICT };
  }

  // 5. GARANTIE D'INITIALISATION VISUELLE (SI LE SCRIPT DU FORMULAIRE EST DÉJÀ PASSÉ)
  function ensureDropdownsPopulated() {
    const armorSel = document.getElementById("pc-armor");
    const w1Sel = document.getElementById("pc-weapon-1");
    const w2Sel = document.getElementById("pc-weapon-2");

    if (armorSel && armorSel.options.length <= 1) {
      armorSel.innerHTML = "";
      Object.keys(ARMORS_DICT).forEach(k => {
        const a = ARMORS_DICT[k];
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = `${a.name} (+${a.bonus} ND, Réd. ${a.reduction})`;
        armorSel.appendChild(opt);
      });
      // Sélectionne Armure lourde par défaut pour un bushi Hida/Hiruma
      if (armorSel.querySelector('option[value="heavy"]')) {
        armorSel.value = "heavy";
      }
    }

    if (w1Sel && w1Sel.options.length === 0) {
      w1Sel.innerHTML = "";
      Object.keys(WEAPONS_DICT).forEach(k => {
        const w = WEAPONS_DICT[k];
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = `${w.name} (${w.drDisplay || w.dr})`;
        w1Sel.appendChild(opt);
      });
      // Sélectionne Katana ou Tetsubo par défaut
      if (w1Sel.querySelector('option[value="katana"]')) {
        w1Sel.value = "katana";
      }
    }

    if (w2Sel && w2Sel.options.length <= 1) {
      w2Sel.innerHTML = '<option value="">Aucune arme secondaire</option>';
      Object.keys(WEAPONS_DICT).forEach(k => {
        const w = WEAPONS_DICT[k];
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = `${w.name} (${w.drDisplay || w.dr})`;
        w2Sel.appendChild(opt);
      });
      if (w2Sel.querySelector('option[value="tetsubo"]')) {
        w2Sel.value = "tetsubo";
      }
    }

    // Force la recalculation du bandeau d'en-tête si disponible
    if (typeof window.updateAll === "function") {
      window.updateAll();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(ensureDropdownsPopulated, 50));
  } else {
    setTimeout(ensureDropdownsPopulated, 50);
  }
})();
