/**
 * Base de données de l'Équipement L5R 4e Édition — Les Chroniques de Rokugan
 * Exactement conforme au Livre de Base (pp. 198–206) et suppléments officiels :
 * Book of Earth (pp. 26–27), Book of Fire, Enemies of the Empire, Secrets of the Empire,
 * Naishou Province, Imperial Histories 1 & 2.
 */

(function (globalScope) {
  'use strict';

  const ARMURES_LIST = [
    {
      id: "none",
      name: "Aucune armure (Kimono)",
      tn: "0",
      tnBonus: 0,
      bonus: 0,
      reduc: 0,
      reduction: 0,
      price: "0 koku",
      note: "Aucun bonus ni pénalité"
    },
    {
      id: "ashigaru",
      name: "Armure d'Ashigaru (+3 ND, Réd. 1)",
      tn: "3",
      tnBonus: 3,
      bonus: 3,
      reduc: 1,
      reduction: 1,
      price: "5 koku",
      note: "Aucune pénalité de mouvement ou compétence"
    },
    {
      id: "light",
      name: "Armure légère (+5 ND, Réd. 3)",
      tn: "5",
      tnBonus: 5,
      bonus: 5,
      reduc: 3,
      reduction: 3,
      price: "25 koku",
      note: "+5 ND aux jets d'Athlétisme et Discrétion"
    },
    {
      id: "heavy",
      name: "Armure lourde (+10 ND, Réd. 5)",
      tn: "10",
      tnBonus: 10,
      bonus: 10,
      reduc: 5,
      reduction: 5,
      price: "40 koku",
      note: "+5 ND à toutes compétences d'Agilité et Réflexes"
    },
    {
      id: "riding",
      name: "Armure de cavalerie (+4 ND / +12 monté, Réd. 4)",
      tn: "4",
      tnBonus: 4,
      mountedBonus: 12,
      bonus: 4,
      reduc: 4,
      reduction: 4,
      price: "55 koku",
      note: "Compte comme Lourde (+5 ND Agilité/Réflexes sauf monté)"
    },
    {
      id: "bogu",
      name: "Bogu — Armure d'entraînement (+0 ND, Réd. 1) [Book of Earth]",
      tn: "0",
      tnBonus: 0,
      bonus: 0,
      reduc: 1,
      reduction: 1,
      price: "1 koku",
      note: "Dojo uniquement (protège l'avant)"
    },
    {
      id: "tatami",
      name: "Armure Tatami pliable (+4 ND, Réd. 1) [Book of Earth]",
      tn: "4",
      tnBonus: 4,
      bonus: 4,
      reduc: 1,
      reduction: 1,
      price: "10 koku",
      note: "Légère, pliable et dissimulable sous kimono (peu discrète)"
    },
    {
      id: "ceremonial",
      name: "Armure Cérémoniale (+3 ND, Réd. 1) [Book of Earth]",
      tn: "3",
      tnBonus: 3,
      bonus: 3,
      reduc: 1,
      reduction: 1,
      price: "90 koku",
      note: "Apparat (petit bonus possible en Intimidation selon MJ)"
    },
    {
      id: "unicorn_riding",
      name: "Armure de Cavalerie Licorne (+4 / +12 monté, Réd. 4) [Book of Earth]",
      tn: "4",
      tnBonus: 4,
      mountedBonus: 12,
      bonus: 4,
      reduc: 4,
      reduction: 4,
      price: "75 koku",
      note: "Compte comme Lourde ; conçue pour le combat monté Licorne"
    },
    {
      id: "tetsu_dou",
      name: "Tetsu-Dō — Armure de Fer Kaiu (+13 ND, Réd. 8) [Book of Earth]",
      tn: "13",
      tnBonus: 13,
      bonus: 13,
      reduc: 8,
      reduction: 8,
      price: "100 koku",
      note: "Lourde : +10 ND Agilité/Réflexes (+5 seulement si Force ≥ 5)"
    }
  ];

  const FLECHES_LIST = [
    { id: "willow_leaf", name: "Feuille de Saule (Willow Leaf)", dr: "2k2", vd: "2g2", price: "1 bu", special: "Aucun (flèche standard)" },
    { id: "armor_piercing", name: "Perce-armure (Armor Piercing)", dr: "1k1", vd: "1g1", price: "2 bu", special: "Ignore le bonus d'armure au ND d'Armure" },
    { id: "flesh_cutter", name: "Coupe-chair (Flesh Cutter)", dr: "2k3", vd: "2g3", price: "5 bu", special: "Double le bonus d'armure au ND d'Armure ; ½ portée" },
    { id: "humming_bulb", name: "Sifflante (Humming Bulb)", dr: "0k1", vd: "0g1", price: "5 bu", special: "Émet un fort sifflement d'alerte" },
    { id: "rope_cutter", name: "Coupe-corde (Rope Cutter)", dr: "1k1", vd: "1g1", price: "3 bu", special: "2 Aug. gratuites Coup Précis sur objet inanimé ; ½ portée" },
    { id: "bo_hiya", name: "Bō-Hiya — Flèche incendiaire [Imperial Histories 2]", dr: "3k3", vd: "3g3", price: "1 koku", special: "Portée fixe 30 m (100') quel que soit l'arc ; explose à l'impact et ignore toute Réduction", noStrength: true }
  ];

  const ARMES_LIST = [
    // ==========================================
    // SABRES (KENJUTSU — pp. 204–205)
    // ==========================================
    {
      id: "katana",
      name: "Katana",
      vd: "3g2",
      dr: "3k2",
      type: "Sabre (Moyen, Samouraï)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "Non vendu",
      special: "Peut dépenser 1 Pt de Vide pour +1k1 aux dégâts (1 Pt max/attaque même avec don multiple)"
    },
    {
      id: "wakizashi",
      name: "Wakizashi",
      vd: "2g2",
      dr: "2k2",
      type: "Sabre (Moyen, Samouraï)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "15 koku",
      special: "Peut être lancé jusqu'à 6 m (20') (Athlétisme)"
    },
    {
      id: "nodachi",
      name: "No-Dachi",
      vd: "3g3",
      dr: "3k3",
      type: "Sabre (Grand, 2 mains)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "30 koku"
    },
    {
      id: "ninja-to",
      name: "Ninja-tō",
      gmOnly: true,
      vd: "2g2",
      dr: "2k2",
      type: "Sabre (Moyen, Ninja)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "5 koku",
      special: "Compte comme Petit pour la dissimulation ; se brise s'il inflige > 40 Blessures en 1 coup"
    },
    {
      id: "parangu",
      name: "Parangu",
      vd: "2g2",
      dr: "2k2",
      type: "Sabre (Moyen, Paysan)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "10 bu",
      special: "Se brise s'il inflige > 30 Blessures en 1 coup"
    },
    {
      id: "scimitar",
      name: "Cimeterre (Scimitar)",
      vd: "2g3",
      dr: "2k3",
      type: "Sabre (Moyen)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "20 koku"
    },
    {
      id: "bokken",
      name: "Bokken (Sabre d'entraînement) [Book of Fire]",
      vd: "0g2",
      dr: "0k2",
      type: "Sabre (Moyen, Samouraï)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "1 bu",
      special: "La Réduction d'armure est doublée contre un bokken"
    },
    {
      id: "shinai",
      name: "Shinaï (Sabre de bambou) [Book of Fire]",
      vd: "0g1",
      dr: "0k1",
      type: "Sabre (Moyen, Samouraï)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "2 bu",
      special: "Les dés de dégâts ne peuvent jamais exploser"
    },
    {
      id: "naga_blade",
      name: "Lame Naga (Naga Blade) [Enemies of the Empire]",
      vd: "2g3",
      dr: "2k3",
      type: "Sabre (Grand, Naga)",
      category: "Sabres",
      skill: "Kenjutsu",
      price: "20 koku"
    },

    // ==========================================
    // ARCS & FLÈCHES FEUILLE DE SAULE (KYUJUTSU — pp. 199–200)
    // ==========================================
    {
      id: "yumi",
      name: "Yumi (Arc, Flèches Saule 2g2)",
      vd: "2g2",
      dr: "2k2",
      bowStrength: 3,
      type: "Distance / Arc (Grand)",
      category: "Arcs",
      skill: "Kyujutsu",
      trait: "Réflexes",
      range: "75 m (250')",
      price: "20 koku",
      special: "Force d'arc 3 (plafonnée par Force) + Flèche ; +10 ND à cheval ; -10 à portée de mêlée"
    },
    {
      id: "daikyu",
      name: "Dai-kyu (Arc de cavalerie, Flèches Saule 2g2)",
      vd: "2g2",
      dr: "2k2",
      bowStrength: 4,
      type: "Distance / Arc (Grand)",
      category: "Arcs",
      skill: "Kyujutsu",
      trait: "Réflexes",
      range: "150 m (500')",
      price: "25 koku",
      special: "Force d'arc 4 (Force min 3 requise) ; +10 ND à pied ; -10 à portée de mêlée"
    },
    {
      id: "hankyu",
      name: "Han-kyu (Arc court, Flèches Saule 2g2)",
      vd: "2g2",
      dr: "2k2",
      bowStrength: 1,
      type: "Distance / Arc (Petit)",
      category: "Arcs",
      skill: "Kyujutsu",
      trait: "Réflexes",
      range: "30 m (100')",
      price: "6 koku",
      special: "Force d'arc 1 ; +10 ND à cheval ; -10 à portée de mêlée"
    },

    // ==========================================
    // ARMES LOURDES (HEAVY WEAPONS — p. 201)
    // ==========================================
    {
      id: "tetsubo",
      name: "Tetsubo",
      vd: "3g3",
      dr: "3k3",
      type: "Arme Lourde (Grand, 2 mains)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      price: "20 koku"
    },
    {
      id: "ono",
      name: "Ono",
      vd: "0g4",
      dr: "0k4",
      type: "Arme Lourde (Grand, 2 mains)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      price: "20 koku"
    },
    {
      id: "dai_tsuchi",
      name: "Dai Tsuchi",
      vd: "5g2",
      dr: "5k2",
      type: "Arme Lourde (Grand, 2 mains)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      price: "15 koku"
    },
    {
      id: "masakari",
      name: "Masakari",
      vd: "2g3",
      dr: "2k3",
      type: "Arme Lourde (Moyen)",
      category: "Armes Lourdes",
      skill: "Armes Lourdes",
      price: "8 koku"
    },

    // ==========================================
    // ARMES D'HAST (POLEARMS — pp. 202–203)
    // ==========================================
    {
      id: "naginata",
      name: "Naginata",
      vd: "3g2",
      dr: "3k2",
      type: "Arme d'Hast (Grand, Samouraï)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      price: "10 koku"
    },
    {
      id: "bisento",
      name: "Bisento",
      vd: "3g3",
      dr: "3k3",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      price: "12 koku"
    },
    {
      id: "nagamaki",
      name: "Nagamaki",
      vd: "2g3",
      dr: "2k3",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      price: "8 koku"
    },
    {
      id: "sasumata",
      name: "Sasumata (Attrape-homme)",
      vd: "0g2",
      dr: "0k2",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      price: "6 koku",
      special: "Peut initier et maintenir une Lutte"
    },
    {
      id: "sodegarami",
      name: "Sodegarami",
      vd: "1g1",
      dr: "1k1",
      type: "Arme d'Hast (Grand)",
      category: "Armes d'Hast",
      skill: "Armes d'Hast",
      price: "6 koku",
      special: "Peut initier et maintenir une Lutte"
    },

    // ==========================================
    // LANCES (SPEARS — p. 203)
    // ==========================================
    {
      id: "yari",
      name: "Yari",
      vd: "2g2",
      dr: "2k2",
      type: "Lance (Grand)",
      category: "Lances",
      skill: "Lances",
      price: "5 koku",
      special: "Peut être lancé à 9 m (30') max (VD 1g2 au lancer)"
    },
    {
      id: "nage_yari",
      name: "Nage-Yari (Javelot)",
      vd: "1g2",
      dr: "1k2",
      type: "Lance (Moyen / Lancer)",
      category: "Lances",
      skill: "Lances",
      price: "3 koku",
      special: "Peut être lancé avec précision jusqu'à 15 m (50')"
    },
    {
      id: "lance",
      name: "Lance de cavalerie (Lance)",
      vd: "3g4",
      dr: "3k4",
      type: "Lance (Grand)",
      category: "Lances",
      skill: "Lances",
      price: "20 koku",
      special: "3g4 uniquement à cheval après Action de Déplacement (sinon 1g2, +5 ND monté / +10 à pied) ; se brise si > 30 Blessures"
    },
    {
      id: "mai_chong",
      name: "Mai Chong",
      vd: "0g3",
      dr: "0k3",
      type: "Lance (Grand)",
      category: "Lances",
      skill: "Lances",
      price: "20 koku",
      special: "Peut être lancé avec précision jusqu'à 7,5 m (25')"
    },
    {
      id: "kumade",
      name: "Kumade",
      vd: "1g1",
      dr: "1k1",
      type: "Lance (Grand, Paysan)",
      category: "Lances",
      skill: "Lances",
      price: "3 bu",
      special: "Se brise s'il inflige > 25 Blessures en 1 coup"
    },
    {
      id: "naga_spear",
      name: "Lance Naga (Naga Spear) [Enemies of the Empire]",
      vd: "3g2",
      dr: "3k2",
      type: "Lance (Grand, Naga)",
      category: "Lances",
      skill: "Lances",
      price: "5 koku"
    },
    {
      id: "magari_yari",
      name: "Magari-Yari (Lance cruciforme) [Naishou Province]",
      vd: "3g2",
      dr: "3k2",
      type: "Lance (Grand)",
      category: "Lances",
      skill: "Lances",
      price: "7 koku",
      special: "Peut être lancé jusqu'à 9 m (30') avec VD 2g2"
    },

    // ==========================================
    // COUTEAUX (KNIVES — p. 201)
    // ==========================================
    {
      id: "tanto",
      name: "Tantō",
      vd: "1g1",
      dr: "1k1",
      type: "Couteau (Petit)",
      category: "Couteaux",
      skill: "Couteaux",
      price: "1 koku",
      special: "Peut être lancé jusqu'à 6 m (20') (Athlétisme)"
    },
    {
      id: "aiguchi",
      name: "Aiguchi",
      vd: "1g1",
      dr: "1k1",
      type: "Couteau (Petit)",
      category: "Couteaux",
      skill: "Couteaux",
      price: "1 koku",
      special: "Sans garde ; peut être lancé jusqu'à 6 m (20') (Athlétisme)"
    },
    {
      id: "kama",
      name: "Kama (Faucille)",
      vd: "0g2",
      dr: "0k2",
      type: "Couteau (Petit, Paysan)",
      category: "Couteaux",
      skill: "Couteaux",
      price: "5 bu"
    },
    {
      id: "sai",
      name: "Saï",
      vd: "1g1",
      dr: "1k1",
      type: "Couteau (Petit)",
      category: "Couteaux",
      skill: "Couteaux",
      price: "5 bu"
    },
    {
      id: "jitte",
      name: "Jitte",
      vd: "1g1",
      dr: "1k1",
      type: "Couteau (Petit)",
      category: "Couteaux",
      skill: "Couteaux",
      price: "5 bu"
    },

    // ==========================================
    // BÂTONS (STAVES — pp. 203–204 ; double bonus armure au ND)
    // ==========================================
    {
      id: "bo",
      name: "Bō",
      vd: "1g2",
      dr: "1k2",
      type: "Bâton (Grand)",
      category: "Bâtons",
      skill: "Bâtons",
      price: "2 bu",
      special: "Le bonus d'armure au ND d'Armure cible est doublé"
    },
    {
      id: "jo",
      name: "Jō",
      vd: "0g2",
      dr: "0k2",
      type: "Bâton (Moyen)",
      category: "Bâtons",
      skill: "Bâtons",
      price: "1 bu",
      special: "Le bonus d'armure au ND d'Armure cible est doublé"
    },
    {
      id: "nunchaku",
      name: "Nunchaku",
      vd: "1g2",
      dr: "1k2",
      type: "Bâton (Petit, Paysan)",
      category: "Bâtons",
      skill: "Bâtons",
      price: "3 bu",
      special: "Le bonus d'armure au ND d'Armure cible est doublé"
    },
    {
      id: "tonfa",
      name: "Tonfa",
      vd: "0g3",
      dr: "0k3",
      type: "Bâton (Moyen, Paysan)",
      category: "Bâtons",
      skill: "Bâtons",
      price: "5 bu",
      special: "Le bonus d'armure au ND d'Armure cible est doublé"
    },
    {
      id: "machi_kanshisha",
      name: "Machi-kanshisha (Pipe de fer)",
      vd: "0g2",
      dr: "0k2",
      type: "Bâton (Moyen)",
      category: "Bâtons",
      skill: "Bâtons",
      price: "20 koku",
      special: "Bonus d'armure au ND doublé"
    },
    {
      id: "sang_kauw",
      name: "Sang Kauw (Lame croissant 1g2 / Bouclier 2g1)",
      vd: "1g2",
      dr: "1k2",
      type: "Bâton (Moyen)",
      category: "Bâtons",
      skill: "Bâtons",
      price: "10 koku",
      special: "1g2 (lame croissant) ou 2g1 (bouclier) ; bonus d'armure au ND doublé"
    },

    // ==========================================
    // ARMES À CHAÎNE & ÉVENTAIL (pp. 200, 205)
    // ==========================================
    {
      id: "kusarigama",
      name: "Kusarigama (0g2 kama / 0g1 poids)",
      vd: "0g2",
      dr: "0k2",
      type: "Arme à Chaîne (Grand)",
      category: "Armes à Chaîne",
      skill: "Armes à Chaîne",
      price: "5 koku"
    },
    {
      id: "kyoketsu_shogi",
      name: "Kyoketsu-shogi",
      vd: "0g1",
      dr: "0k1",
      type: "Arme à Chaîne (Grand)",
      category: "Armes à Chaîne",
      skill: "Armes à Chaîne",
      price: "9 bu",
      special: "Double le bonus d'armure au ND d'Armure de la cible"
    },
    {
      id: "manrikikusari",
      name: "Manrikikusari",
      vd: "1g1",
      dr: "1k1",
      type: "Arme à Chaîne (Grand)",
      category: "Armes à Chaîne",
      skill: "Armes à Chaîne",
      price: "3 koku"
    },
    {
      id: "tessen",
      name: "Tessen (Éventail de Guerre)",
      vd: "0g1",
      dr: "0k1",
      type: "Éventail de Guerre (Petit)",
      category: "Armes Spéciales",
      skill: "Éventail de Guerre",
      price: "5 koku"
    },

    // ==========================================
    // ARMES DE NINJUTSU, MAINS NUES & OPTIONNELLES (pp. 201–202, Secrets, IH1–2)
    // ==========================================
    {
      id: "unarmed",
      name: "Mains Nues (Jiujutsu)",
      vd: "0g1",
      dr: "0k1",
      type: "Mains Nues (Petit)",
      category: "Mains Nues",
      skill: "Jiujutsu",
      price: "—"
    },
    {
      id: "shuriken",
      name: "Shuriken",
      gmOnly: true,
      vd: "1g1",
      dr: "1k1",
      noStrength: true,
      type: "Distance / Ninja (Petit, Dégradante)",
      category: "Armes Ninja",
      skill: "Ninjutsu",
      trait: "Réflexes",
      range: "7,5 m (25')",
      price: "2 bu",
      special: "N'ajoute pas la Force aux dégâts ; les dés de dégâts n'explosent pas (avant Rang 5)"
    },
    {
      id: "tsubute",
      name: "Tsubute",
      gmOnly: true,
      vd: "1g1",
      dr: "1k1",
      noStrength: true,
      type: "Distance / Ninja (Petit, Dégradante)",
      category: "Armes Ninja",
      skill: "Ninjutsu",
      trait: "Réflexes",
      range: "9 m (30')",
      price: "1 bu",
      special: "N'ajoute pas la Force aux dégâts ; les dés de dégâts n'explosent pas (avant Rang 5)"
    },
    {
      id: "blowgun",
      name: "Sarbacane (Blowgun)",
      gmOnly: true,
      vd: "0g0",
      dr: "1 Blessure",
      noStrength: true,
      fixedDamage: "1 Blessure",
      type: "Distance / Ninja (Moyen, Dégradante)",
      category: "Armes Ninja",
      skill: "Ninjutsu",
      trait: "Réflexes",
      range: "15 m (50')",
      price: "8 zeni",
      special: "Triple le bonus d'armure au ND ; R3 = 1k1, R7 = 2k1 ; rechargement = Action Gratuite"
    },
    {
      id: "nageteppo_smoke",
      name: "Nageteppo fumigène [Imperial Histories 1]",
      gmOnly: true,
      vd: "1g1",
      dr: "1k1",
      noStrength: true,
      type: "Distance / Ninja (Petit)",
      category: "Armes Ninja",
      skill: "Ninjutsu",
      trait: "Réflexes",
      range: "9 m (30')",
      price: "Artisanat : Explosifs ND 25"
    },
    {
      id: "nageteppo_incendiary",
      name: "Nageteppo incendiaire [Imperial Histories 1]",
      gmOnly: true,
      vd: "3g2",
      dr: "3k2",
      noStrength: true,
      type: "Distance / Ninja (Petit)",
      category: "Armes Ninja",
      skill: "Ninjutsu",
      trait: "Réflexes",
      range: "7,5 m (25')",
      price: "Artisanat : Explosifs ND 25",
      special: "Ignore 3 points de Réduction"
    },
    {
      id: "sling",
      name: "Fronde (Sling) [Secrets of the Empire]",
      vd: "1g2",
      dr: "1k2",
      noStrength: true,
      type: "Distance / Paysan (Petit)",
      category: "Armes Spéciales",
      skill: "Athlétisme",
      trait: "Agilité",
      range: "30 m (100')",
      price: "1 bu",
      special: "N'ajoute pas la Force aux dégâts ; la Réduction est doublée contre la fronde"
    },
    {
      id: "pistol_ih1",
      name: "Pistolet gaijin (Option) [Imperial Histories 1]",
      vd: "3g2",
      dr: "3k2",
      noStrength: true,
      type: "Distance / Arme à feu (Petit, Gaijin)",
      category: "Armes à Feu (Option)",
      skill: "Armes à feu",
      trait: "Intelligence",
      range: "6 m (20')",
      price: "Contrebande",
      special: "Modifié par Perception (non Force) ; rechargement 3 Actions Complexes ; crime impérial"
    },
    {
      id: "musket_ih1",
      name: "Mousquet gaijin (Option) [Imperial Histories 1]",
      vd: "4g3",
      dr: "4k3",
      noStrength: true,
      type: "Distance / Arme à feu (Grand, Gaijin)",
      category: "Armes à Feu (Option)",
      skill: "Armes à feu",
      trait: "Intelligence",
      range: "45 m (150')",
      price: "Contrebande",
      special: "Modifié par Perception (non Force) ; baïonnette = Armes d'Hast 2k2 ; crime impérial"
    },
    {
      id: "bajozutsu_ih2",
      name: "Bajozutsu (Option Cerf Blanc) [Imperial Histories 2]",
      vd: "3g2",
      dr: "3k2",
      noStrength: true,
      type: "Distance / Arme à feu (Petit, Samouraï)",
      category: "Armes à Feu (Option)",
      skill: "Armes à feu",
      trait: "Intelligence",
      range: "6 m (20')",
      price: "Non vendu",
      special: "Peut être dégainé avec Iaijutsu"
    },
    {
      id: "teppo_ih2",
      name: "Teppo (Option Cerf Blanc) [Imperial Histories 2]",
      vd: "3g3",
      dr: "3k3",
      noStrength: true,
      type: "Distance / Arme à feu (Grand, Samouraï)",
      category: "Armes à Feu (Option)",
      skill: "Armes à feu",
      trait: "Intelligence",
      range: "45 m (150')",
      price: "30 koku",
      special: "À mi-portée ou moins, ignore la Réduction naturelle"
    }
  ];

  const EQUIPEMENT_OBJ = {
    armures: ARMURES_LIST,
    armors: ARMURES_LIST,
    fleches: FLECHES_LIST,
    arrows: FLECHES_LIST,
    armes: ARMES_LIST,
    weapons: ARMES_LIST
  };

  globalScope.EQUIPEMENT_DATA = EQUIPEMENT_OBJ;
  globalScope.EQUIPMENT_DATA = EQUIPEMENT_OBJ;
  globalScope.L5R_DATA = globalScope.L5R_DATA || {};
  globalScope.L5R_DATA.armures = ARMURES_LIST;
  globalScope.L5R_DATA.armors = ARMURES_LIST;
  globalScope.L5R_DATA.fleches = FLECHES_LIST;
  globalScope.L5R_DATA.arrows = FLECHES_LIST;
  globalScope.L5R_DATA.armes = ARMES_LIST;
  globalScope.L5R_DATA.weapons = ARMES_LIST;
  globalScope.L5R_DATA.equipment = EQUIPEMENT_OBJ;
  globalScope.L5R_DATA.equipement = EQUIPEMENT_OBJ;

  globalScope.getEquipment = function () {
    return EQUIPEMENT_OBJ;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ARMURES_LIST, FLECHES_LIST, ARMES_LIST, EQUIPEMENT_OBJ };
  }
})(typeof window !== 'undefined' ? window : globalThis);
