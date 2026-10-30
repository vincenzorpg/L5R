/**
 * EQUIPEMENT_DATA — Armes, Armures et Équipement officiel
 * L5R 4e Édition (Livre de Base, Livre du Feu p. 198-204)
 * 
 * Règle de dégâts de mêlée : (Force + premier chiffre du DR) g (deuxième chiffre)
 */

const WEAPONS_DATA = [
  // =========================================================================
  // SABRES & LAMES (SWORDS — KENJUTSU / IAIJUTSU)
  // =========================================================================
  {
    id: "wep-katana",
    name: "Katana",
    category: "Sabres",
    skill: "Kenjutsu",
    dr: "3k2",
    diceRolled: 3,
    diceKept: 2,
    size: "Moyen",
    keywords: ["Moyen", "Samouraï"],
    price: "Inestimable (25 koku)",
    rules: "Dépense de Vide : Vous pouvez dépenser 1 point de Vide pour augmenter les dégâts d'une frappe réussie de +1g1 (non cumulable)."
  },
  {
    id: "wep-wakizashi",
    name: "Wakizashi",
    category: "Sabres",
    skill: "Kenjutsu",
    dr: "2k2",
    diceRolled: 2,
    diceKept: 2,
    size: "Petit",
    keywords: ["Petit", "Samouraï"],
    price: "Inestimable (15 koku)",
    rules: "Symbole de statut du samouraï avec le katana (daishō). Utilisé pour le seppuku et le combat à deux armes (Niten)."
  },
  {
    id: "wep-nodachi",
    name: "No-Dachi",
    category: "Sabres",
    skill: "Kenjutsu",
    dr: "3k3",
    diceRolled: 3,
    diceKept: 3,
    size: "Grand",
    keywords: ["Grand"],
    price: "30 koku",
    rules: "Épée à deux mains (1,5 à 2 mètres). Conçue à l'origine contre la cavalerie. Nécessite deux mains."
  },
  {
    id: "wep-ninja-to",
    name: "Ninja-tō",
    category: "Sabres",
    skill: "Ninjutsu",
    dr: "2k2",
    diceRolled: 2,
    diceKept: 2,
    size: "Moyen",
    keywords: ["Moyen", "Ninja"],
    price: "5 koku",
    rules: "Lame droite rustique. Considéré comme de Petite taille pour être dissimulé. Si une attaque inflige plus de 40 blessures, la lame se brise."
  },
  {
    id: "wep-parangu",
    name: "Parangu",
    category: "Sabres",
    skill: "Kenjutsu",
    dr: "2k2",
    diceRolled: 2,
    diceKept: 2,
    size: "Moyen",
    keywords: ["Moyen", "Paysan"],
    price: "1 koku",
    rules: "Machette de marin ou de débroussaillage en acier non replié. Risque de bris face à un katana forgé."
  },

  // =========================================================================
  // ARMES LOURDES (HEAVY WEAPONS — TSUTO / ARMES LOURDES)
  // =========================================================================
  {
    id: "wep-tetsubo",
    name: "Tetsubō",
    category: "Armes Lourdes",
    skill: "Armes Lourdes",
    dr: "3k3",
    diceRolled: 3,
    diceKept: 3,
    size: "Grand",
    keywords: ["Grand"],
    price: "10 koku",
    rules: "Masse de guerre ferrée ou garnie de pointes d'acier. Arme fétiche des bushi du Crabe pour briser les carapaces et armures. À deux mains."
  },
  {
    id: "wep-dai-tsuchi",
    name: "Dai Tsuchi",
    category: "Armes Lourdes",
    skill: "Armes Lourdes",
    dr: "5k2",
    diceRolled: 5,
    diceKept: 2,
    size: "Grand",
    keywords: ["Grand"],
    price: "15 koku",
    rules: "Marteau de guerre massif à deux mains. Concentre sa force sur une surface réduite pour concasser la pierre et les plaques d'armure lourde."
  },
  {
    id: "wep-ono",
    name: "Ono",
    category: "Armes Lourdes",
    skill: "Armes Lourdes",
    dr: "0k4",
    diceRolled: 0,
    diceKept: 4,
    size: "Grand",
    keywords: ["Grand"],
    price: "20 koku",
    rules: "Grande hache de guerre à deux mains. Les dés lancés dépendent uniquement de la Force de l'attaquant (Force g 4). Tranchant dévastateur."
  },
  {
    id: "wep-masakari",
    name: "Masakari",
    category: "Armes Lourdes",
    skill: "Armes Lourdes",
    dr: "2k3",
    diceRolled: 2,
    diceKept: 3,
    size: "Moyen",
    keywords: ["Moyen"],
    price: "8 koku",
    rules: "Hache de bûcheron équilibrée pour le combat. Seule arme lourde pouvant être maniée à une main."
  },

  // =========================================================================
  // ARMES D'HAST (POLEARMS)
  // =========================================================================
  {
    id: "wep-naginata",
    name: "Naginata",
    category: "Armes d'Hast",
    skill: "Armes d'Hast",
    dr: "3k2",
    diceRolled: 3,
    diceKept: 2,
    size: "Grand",
    keywords: ["Grand"],
    price: "10 koku",
    rules: "Lame courbée montée sur une hampe de chêne. Arme noble des femmes samouraïs (onna-bugeisha) et des gardes d'honneur."
  },
  {
    id: "wep-bisento",
    name: "Bisento",
    category: "Armes d'Hast",
    skill: "Armes d'Hast",
    dr: "3k3",
    diceRolled: 3,
    diceKept: 3,
    size: "Grand",
    keywords: ["Grand"],
    price: "12 koku",
    rules: "Variante lourde de la naginata dotée d'une lame très épaisse. Portée d'estoc et de taille."
  },
  {
    id: "wep-nagamaki",
    name: "Nagamaki",
    category: "Armes d'Hast",
    skill: "Armes d'Hast",
    dr: "2k3",
    diceRolled: 2,
    diceKept: 3,
    size: "Grand",
    keywords: ["Grand"],
    price: "10 koku",
    rules: "Lame de katana montée sur un manche de même longueur que la lame, offrant un effet de levier puissant."
  },
  {
    id: "wep-sasumata",
    name: "Sasumata",
    category: "Armes d'Hast",
    skill: "Armes d'Hast",
    dr: "0k2",
    diceRolled: 0,
    diceKept: 2,
    size: "Grand",
    keywords: ["Grand"],
    price: "5 bu",
    rules: "Fourche en U utilisée par les magistrats et gardes pour immobiliser un samouraï sans porter atteinte à sa vie."
  },

  // =========================================================================
  // LANCES (SPEARS)
  // =========================================================================
  {
    id: "wep-yari",
    name: "Yari",
    category: "Lances",
    skill: "Lances",
    dr: "2k2",
    diceRolled: 2,
    diceKept: 2,
    size: "Grand",
    keywords: ["Grand"],
    price: "3 bu",
    rules: "Pique d'infanterie standard de 2 à 3 mètres de long avec une pointe droite à double tranchant."
  },
  {
    id: "wep-nage-yari",
    name: "Nage-Yari",
    category: "Lances",
    skill: "Lances",
    dr: "1k2",
    diceRolled: 1,
    diceKept: 2,
    size: "Moyen",
    keywords: ["Moyen"],
    price: "2 bu",
    rules: "Javelot court conçu pour être lancé (portée 15 m) ou employé au corps-à-corps."
  },

  // =========================================================================
  // COUTEAUX (KNIVES)
  // =========================================================================
  {
    id: "wep-tanto",
    name: "Tantō",
    category: "Couteaux",
    skill: "Couteaux",
    dr: "1k2",
    diceRolled: 1,
    diceKept: 2,
    size: "Petit",
    keywords: ["Petit", "Samouraï"],
    price: "2 koku",
    rules: "Poignard samouraï traditionnel à garde (tsuba), souvent porté en complément du daishō."
  },
  {
    id: "wep-aiguchi",
    name: "Aiguchi",
    category: "Couteaux",
    skill: "Couteaux",
    dr: "1k2",
    diceRolled: 1,
    diceKept: 2,
    size: "Petit",
    keywords: ["Petit"],
    price: "1 koku",
    rules: "Dague dépourvue de garde facilitant la dissimulation sous un kimono ou dans une manche."
  },

  // =========================================================================
  // BÂTONS (STAVES)
  // =========================================================================
  {
    id: "wep-bo",
    name: "Bō",
    category: "Bâtons",
    skill: "Bâtons",
    dr: "1k2",
    diceRolled: 1,
    diceKept: 2,
    size: "Grand",
    keywords: ["Grand", "Bâton"],
    price: "1 bu",
    rules: "Bâton long de 1,80 m. Les armures adverses doublent leur bonus au ND d'Armure face à cette arme contondante."
  },
  {
    id: "wep-jo",
    name: "Jō",
    category: "Bâtons",
    skill: "Bâtons",
    dr: "1k1",
    diceRolled: 1,
    diceKept: 1,
    size: "Moyen",
    keywords: ["Moyen", "Bâton"],
    price: "5 zeni",
    rules: "Bâton court de marche (1,20 m). Double également le bonus conféré par les armures adverses."
  },

  // =========================================================================
  // ARMES PAYSANNES & MARTIALES (PEASANT & IMPROVISED)
  // =========================================================================
  {
    id: "wep-jitte",
    name: "Jitte",
    category: "Armes de Jitte",
    skill: "Jitte",
    dr: "1k1",
    diceRolled: 1,
    diceKept: 1,
    size: "Petit",
    keywords: ["Petit"],
    price: "5 bu",
    rules: "Tringle de fer à crochet utilisée par la police citadine pour bloquer et briser les lames ennemies sans blessure mortelle."
  },
  {
    id: "wep-kama",
    name: "Kama",
    category: "Armes Paysannes",
    skill: "Armes Paysannes",
    dr: "1k2",
    diceRolled: 1,
    diceKept: 2,
    size: "Petit",
    keywords: ["Petit", "Paysan"],
    price: "1 bu",
    rules: "Faucille à riz agricole. Arme de prédilection des bushi du Clan de la Mante."
  },
  {
    id: "wep-nunchaku",
    name: "Nunchaku",
    category: "Armes Paysannes",
    skill: "Armes Paysannes",
    dr: "1k2",
    diceRolled: 1,
    diceKept: 2,
    size: "Petit",
    keywords: ["Petit", "Paysan"],
    price: "1 bu",
    rules: "Fléau agricole articulé en bois dur réputé pour désorienter l'adversaire."
  },
  {
    id: "wep-tonfa",
    name: "Tonfa",
    category: "Armes Paysannes",
    skill: "Armes Paysannes",
    dr: "0k3",
    diceRolled: 0,
    diceKept: 3,
    size: "Moyen",
    keywords: ["Moyen", "Paysan"],
    price: "5 bu",
    rules: "Manivelle de meule en bois. Permet de parer le long de l'avant-bras. Dégâts basés purement sur la Force (Force g 3)."
  },

  // =========================================================================
  // ARCS & FLÈCHES (BOWS & ARROWS — KYUJUTSU)
  // =========================================================================
  {
    id: "wep-yumi",
    name: "Yumi (Arc Court / Moyen)",
    category: "Arcs",
    skill: "Tir à l'Arc",
    dr: "Spécial (Force de l'arc + Flèche)",
    diceRolled: 0,
    diceKept: 0,
    size: "Moyen",
    keywords: ["Moyen"],
    price: "8 koku",
    rules: "Force d'arc standard : 3. Les dégâts totaux sont égaux à (Force de l'arc + dégâts de la flèche)."
  },
  {
    id: "wep-daikyu",
    name: "Dai-Kyū (Grand Arc Asymétrique)",
    category: "Arcs",
    skill: "Tir à l'Arc",
    dr: "Spécial (Force de l'arc + Flèche)",
    diceRolled: 0,
    diceKept: 0,
    size: "Grand",
    keywords: ["Grand"],
    price: "25 koku",
    rules: "Arc de guerre monté asymétrique (plus de 2 mètres). Conçu pour le tir à cheval (Horsemanship) sans pénalité."
  },
  {
    id: "wep-arrow-willow",
    name: "Flèche Feuille de Saule (Yanagi-ba)",
    category: "Flèches",
    skill: "Tir à l'Arc",
    dr: "2k2",
    diceRolled: 2,
    diceKept: 2,
    size: "Petit",
    keywords: ["Flèche"],
    price: "1 bu (les 20)",
    rules: "Pointe standard équilibrée de l'archer samouraï."
  },
  {
    id: "wep-arrow-piercing",
    name: "Flèche Perce-Armure (Watakusi)",
    category: "Flèches",
    skill: "Tir à l'Arc",
    dr: "1k1",
    diceRolled: 1,
    diceKept: 1,
    size: "Petit",
    keywords: ["Flèche"],
    price: "2 bu (les 20)",
    rules: "Ignore totalement le bonus au ND d'Armure conféré par l'armure de la cible."
  },
  {
    id: "wep-arrow-flesh",
    name: "Flèche Barbue Coupe-Chair",
    category: "Flèches",
    skill: "Tir à l'Arc",
    dr: "2k3",
    diceRolled: 2,
    diceKept: 3,
    size: "Petit",
    keywords: ["Flèche"],
    price: "5 bu (les 20)",
    rules: "Dégâts accrus sur chair nue, mais l'armure ennemie double son bonus de protection. Portée réduite de moitié."
  }
];

// =========================================================================
// ARMURES OFFICIELLES (LIVRE DE BASE P. 198)
// =========================================================================
const ARMORS_DATA = [
  {
    id: "arm-none",
    name: "Aucune Armure (Kimono de soie)",
    bonusTN: 0,
    reduction: 0,
    price: "0 koku",
    rules: "ND d'Armure de base : (Réflexes × 5) + 5. Aucune gêne de déplacement."
  },
  {
    id: "arm-ashigaru",
    name: "Armure d'Ashigaru",
    bonusTN: 3,
    reduction: 1,
    price: "5 koku",
    rules: "Plastron de cuir bouilli et bandes de fer pour fantassins. +3 au ND d'Armure, Réduction 1."
  },
  {
    id: "arm-light",
    name: "Armure Légère (Samouraï)",
    bonusTN: 5,
    reduction: 3,
    price: "15 koku",
    rules: "Plaques de cuir et d'acier laqué reliées par des cordons de soie. +5 au ND d'Armure, Réduction 3."
  },
  {
    id: "arm-heavy",
    name: "Armure Lourde (O-Yoroi)",
    bonusTN: 10,
    reduction: 5,
    price: "40 koku",
    rules: "Grand harnois cuirassé avec casque (kabuto), spallières et jambières. +10 au ND d'Armure, Réduction 5. Malus de +5 au ND de tous les jets d'Athlétisme et de Furtivité."
  },
  {
    id: "arm-riding",
    name: "Armure de Cavalerie (Licorne)",
    bonusTN: 7,
    reduction: 4,
    price: "35 koku",
    rules: "Conception souple de cuir renforcé pour le combat équestre. +7 au ND d'Armure, Réduction 4."
  }
];

if (typeof window !== "undefined") {
  window.WEAPONS_DATA = WEAPONS_DATA;
  window.ARMORS_DATA = ARMORS_DATA;
}
