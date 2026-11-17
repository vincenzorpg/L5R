/**
 * data/katas-data.js — Catalogue officiel exact des Katas de Rokugan (L5R 4e Édition — 40 Katas)
 * Sources : Livre de Base (pp. 259–260), The Book of Air (p. 175), The Book of Earth (pp. 194–195),
 *           The Book of Fire (pp. 179–180) et The Great Clans.
 *
 * RÈGLES OFFICIELLES (Livre de Base, p. 259) :
 * - Coût d'apprentissage : Nombre de Points d'Expérience égal au Niveau de Maîtrise du Kata (si votre École figure dans la liste autorisée et que votre Anneau atteint au moins le Niveau de Maîtrise).
 * - Autres Écoles d'un Clan spécifié : Les autres écoles de bushi affiliées au clan indiqué (ex. suppléments) peuvent acheter ces Katas, mais leurs Anneaux sont considérés comme inférieurs de 1 Rang pour satisfaire le Niveau de Maîtrise requis.
 * - Exécution : Action Simple (Simple Action). Reste actif jusqu'à expiration (si durée indiquée) ou abandon volontaire (Action Gratuite).
 * - Limite : 1 seul Kata actif à la fois.
 */

(function () {
  const KATAS_DATA = [
    // =========================================================================
    // --- KATAS DE TERRE (EARTH : 3 Livre de Base + 5 Book of Earth + 2 Great Clans) ---
    // =========================================================================
    {
      id: "kata-terre-frapper-terre",
      name: "Frapper comme la Terre (Striking as Earth)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Toutes (Any)",
      source: "Livre de Base (p. 259)",
      desc: "Lorsque vous êtes en Posture de Défense Totale (Full Defense), vous bénéficiez d'une Réduction égale à votre Anneau de Terre. Cette Réduction se cumule avec toute autre forme de Réduction."
    },
    {
      id: "kata-terre-guerrier-indomptable",
      name: "Style du Guerrier Indomptable (Indomitable Warrior Style)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Bushi Hida, Bushi Ichiro, Bushi Moto",
      source: "Livre de Base (p. 260)",
      desc: "Réduit toutes vos pénalités de ND dues aux Rangs de Blessures d'un montant égal à votre Anneau de Terre."
    },
    {
      id: "kata-terre-fer-montagnes",
      name: "Style du Fer dans les Montagnes (Iron in the Mountains Style)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Guerrier de Fer Daidoji, Bushi Hida",
      source: "Livre de Base (p. 260)",
      desc: "Vous pouvez utiliser votre Anneau de Terre à la place de votre Anneau d'Air pour le bonus accordé par la Posture de Défense (Defense Stance)."
    },
    {
      id: "kata-terre-force-crabe",
      name: "La Force du Crabe (Strength of the Crab)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan du Crabe",
      source: "The Great Clans",
      desc: "Tant que vous portez une armure et êtes en Posture d'Attaque (Attack Stance), votre armure confère un bonus supplémentaire de +2 en Réduction."
    },
    {
      id: "kata-terre-force-araignee",
      name: "La Force de l'Araignée (Strength of the Spider)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      gmOnly: true,
      schools: "Tout Bushi du Clan de l'Araignée",
      source: "The Great Clans (p. 282)",
      desc: "Une fois par Round, si vous infligez au moins 15 Blessures à votre adversaire, celui-ci subit une pénalité de -3 au total de tous ses jets lors de son prochain Tour."
    },
    {
      id: "kata-terre-puissance-montagne",
      name: "La Puissance de la Montagne (The Power of the Mountain)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Bushi Hida, Bushi Hiruma, Berserker Matsu, Bushi Ichiro",
      source: "The Book of Earth (p. 194)",
      desc: "À l'activation, vous réduisez votre ND d'Armure d'un montant allant jusqu'à votre Anneau de Terre jusqu'à ce que vous désactiviez ce Kata. Tous vos jets de dégâts effectués tant que ce Kata est actif voient leur total augmenté du même montant."
    },
    {
      id: "kata-terre-force-montagne",
      name: "La Force de la Montagne (The Strength of the Mountain)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Bushi Hida, Éclaireur Hiruma, Bushi Shiba, Guerrier de Fer Daidoji",
      source: "The Book of Earth (p. 194)",
      desc: "À l'activation, vous réduisez votre Score d'Initiative d'un montant allant jusqu'à votre Anneau de Terre (sans descendre sous 0) jusqu'à ce que vous désactiviez ce Kata. Tant que ce Kata est actif, votre ND d'Armure augmente du même montant."
    },
    {
      id: "kata-terre-abri-roche",
      name: "L'Abri de la Roche (Lee of the Stone)",
      element: "Terre",
      mastery: 4,
      cost: 4,
      schools: "Bushi Hida, Pragmatique Hida, Bushi Shiba, Guerrier de Fer Daidoji",
      source: "The Book of Earth (p. 195)",
      desc: "Tant que vous êtes en Posture de Défense ou de Défense Totale, votre ND d'Armure est augmenté d'un montant supplémentaire égal à votre Anneau de Terre."
    },
    {
      id: "kata-terre-frappe-avalanche",
      name: "Frapper comme l'Avalanche (Strike as the Avalanche)",
      element: "Terre",
      mastery: 3,
      cost: 3,
      schools: "Bushi Hida, Bushi Hiruma, Bushi Ichiro, Bushi Moto, Vengeur Moto",
      source: "The Book of Earth (p. 195)",
      desc: "Lorsque vous utilisez la compétence Armes Lourdes (Heavy Weapons), votre Force est considérée comme supérieure de 1 Rang pour calculer les dégâts."
    },
    {
      id: "kata-terre-batu-mais-intact",
      name: "Érodé mais Intact (Weathered and Unbroken)",
      element: "Terre",
      mastery: 5,
      cost: 5,
      schools: "Bushi Hida, Bushi Hiruma, Éclaireur Hiruma, Bushi Ichiro",
      source: "The Book of Earth (p. 195)",
      desc: "Votre Anneau d'Eau est considéré comme inférieur de deux Rangs (minimum 1) pour le déplacement. Tous vos jets d'attaque effectués avec la compétence Armes Lourdes (Heavy Weapons) bénéficient d'une Augmentation Gratuite utilisable uniquement pour la manœuvre Renversement (Knockdown)."
    },

    // =========================================================================
    // --- KATAS D'EAU (WATER : 2 Livre de Base + 5 Great Clans) ---
    // =========================================================================
    {
      id: "kata-eau-frapper-eau",
      name: "Frapper comme l'Eau (Striking as Water)",
      element: "Eau",
      mastery: 4,
      cost: 4,
      schools: "Toutes (Any)",
      source: "Livre de Base (p. 259)",
      desc: "Lorsque vous êtes en Posture d'Attaque (Attack Stance), vous pouvez vous déplacer de 1,5 mètre (5') supplémentaires en tant qu'Action Gratuite."
    },
    {
      id: "kata-eau-force-dans-bras",
      name: "Style de la Force dans les Bras (Strength in Arms Style)",
      element: "Eau",
      mastery: 4,
      cost: 4,
      schools: "Bushi Hida, Bushi Ichiro, Bushi Moto",
      source: "Livre de Base (p. 260)",
      desc: "Une fois par Tour lorsque vous maniez une Arme Lourde, vous pouvez utiliser votre Trait Force à la place de votre Agilité pour un jet d'attaque."
    },
    {
      id: "kata-eau-force-lion",
      name: "La Force du Lion (Strength of the Lion)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan du Lion",
      source: "The Great Clans",
      desc: "Une fois par Round durant l'Étape des Réactions, vous pouvez ajouter +3 au Score d'Initiative d'un allié dans une escarmouche. Cet effet est cumulatif, mais ses bénéfices disparaissent aussitôt si le Kata cesse d'être actif."
    },
    {
      id: "kata-eau-fils-tempetes",
      name: "Fils des Tempêtes (Son of Storms)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Bushi Akodo, Infiltrateur Shosuro, Bushi Yoritomo",
      source: "The Great Clans",
      desc: "Lorsque vous attaquez avec une arme de mêlée Petite (Small), toute Réduction possédée par votre adversaire est réduite de 1."
    },
    {
      id: "kata-eau-force-licorne",
      name: "La Force de la Licorne (Strength of the Unicorn)",
      element: "Eau",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan de la Licorne",
      source: "The Great Clans",
      desc: "Lorsque vous êtes à cheval, votre monture gagne un bonus de +3 à son ND d'Armure ainsi qu'une Réduction supplémentaire de 3."
    },
    {
      id: "kata-eau-art-ninjutsu",
      name: "L'Art du Ninjutsu (Art of Ninjutsu)",
      element: "Eau",
      mastery: 5,
      cost: 5,
      schools: "Bushi Bayushi, Éclaireur Daidoji, Acteur Shosuro, Infiltrateur Shosuro",
      source: "The Great Clans (p. 282)",
      desc: "Une fois par Round, vous pouvez calculer la distance d'une Action de Mouvement comme si votre Anneau d'Eau était égal à votre Rang de Compétence Discrétion (Stealth). Cela ne modifie pas la distance maximale franchissable en un Round."
    },

    // =========================================================================
    // --- KATAS D'AIR (AIR : 4 Livre de Base + 2 Book of Air + 3 Great Clans) ---
    // =========================================================================
    {
      id: "kata-air-frapper-vent",
      name: "Frapper comme le Vent (Striking as Air)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Toutes (Any)",
      source: "Livre de Base (p. 259)",
      desc: "Lorsque vous êtes en Posture de Défense (Defense Stance), votre ND d'Armure est augmenté de votre Anneau d'Air."
    },
    {
      id: "kata-air-souffle-vent",
      name: "Style du Souffle du Vent (Breath of Wind Style)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Bushi Kakita, Bushi Bayushi",
      source: "Livre de Base (p. 259)",
      desc: "Votre Score d'Initiative augmente de +2 durant l'Étape des Réactions de chaque Round de Combat. Cet effet se cumule au fil des rounds mais disparaît immédiatement si le Kata cesse d'être actif."
    },
    {
      id: "kata-air-lame-cachee",
      name: "Style de la Lame Cachée (Hidden Blade Style)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Bushi Bayushi, Bushi Yoritomo",
      source: "Livre de Base (p. 259)",
      desc: "Vos attaques de Désarmement (Disarm) infligent les dégâts normaux au lieu de 2g1. Vous ne pouvez pas augmenter vos dégâts sur ces attaques via des Augmentations (y compris celles issues de la manœuvre Feinte)."
    },
    {
      id: "kata-air-foret-fer",
      name: "Style de la Forêt de Fer (Iron Forest Style)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Guerrier de Fer Daidoji, Bushi Heichi, Bushi Shiba",
      source: "Livre de Base (p. 260)",
      desc: "Lorsque vous maniez une lance ou une arme d'hast, vous pouvez utiliser votre Anneau d'Air à la place de votre Agilité pour vos jets d'attaque."
    },
    {
      id: "kata-air-menace-voilee",
      name: "Style de la Menace Voilée (Veiled Menace Style)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Bushi Bayushi, Bushi Hiruma, Archer Tsuruchi, Bushi Yoritomo",
      source: "Livre de Base (p. 260)",
      desc: "Une fois par Tour, vous pouvez ajouter votre Rang de Compétence Discrétion (Stealth) à votre ND d'Armure contre une unique attaque."
    },
    {
      id: "kata-air-vent-nord",
      name: "Style du Vent du Nord (North Wind Style)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      source: "The Book of Air (p. 175)",
      desc: "Vous pouvez ajouter votre Anneau d'Air au total de tout jet d'attaque effectué tout en tentant la manœuvre Dégâts Accrus (Increased Damage)."
    },
    {
      id: "kata-air-vent-sud",
      name: "Style du Vent du Sud (South Wind Style)",
      element: "Air",
      mastery: 4,
      cost: 4,
      schools: "Toute école de Bushi",
      source: "The Book of Air (p. 175)",
      desc: "Vous pouvez ajouter votre Anneau d'Air au total de tout jet d'attaque effectué tout en tentant les manœuvres Coup Précis (Called Shot) ou Renversement (Knockdown)."
    },
    {
      id: "kata-air-force-grue",
      name: "La Force de la Grue (Strength of the Crane)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan de la Grue",
      source: "The Great Clans",
      desc: "Lorsque vous combattez à l'épée ou à la lance, vous ajoutez un montant égal à (votre Rang d'Honneur − 3, minimum 1) à votre ND d'Armure."
    },
    {
      id: "kata-air-force-mante",
      name: "La Force de la Mante (Strength of the Mantis)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan de la Mante",
      source: "The Great Clans",
      desc: "La pénalité aux jets d'attaque à distance tirés contre des adversaires actuellement engagés à portée de mêlée est réduite de 3."
    },
    {
      id: "kata-air-danse-vents",
      name: "La Danse des Vents (Dance of the Winds)",
      element: "Air",
      mastery: 3,
      cost: 3,
      schools: "Bushi Daidoji, Bushi Shiba",
      source: "The Great Clans",
      desc: "Lorsque vous maniez une arme d'hast ou une lance, votre Score d'Initiative est augmenté de +3."
    },

    // =========================================================================
    // --- KATAS DE FEU (FIRE : 4 Livre de Base + 2 Great Clans + 4 Mixtes Air/Feu Book of Fire) ---
    // =========================================================================
    {
      id: "kata-feu-frapper-feu",
      name: "Frapper comme le Feu (Striking as Fire)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Toutes (Any)",
      source: "Livre de Base (p. 259)",
      desc: "Lorsque vous êtes en Posture d'Attaque Totale (Full Attack Stance), vous pouvez ajouter votre Anneau de Feu au total d'un seul jet d'attaque effectué par round."
    },
    {
      id: "kata-feu-monde-disparait",
      name: "Style du Monde qui Disparaît (Disappearing World Style)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Bushi Akodo, Bushi Kakita",
      source: "Livre de Base (p. 259)",
      desc: "Choisissez un adversaire. Une fois par tour contre cet adversaire, vous pouvez utiliser votre Trait Agilité à la place de votre Trait Force pour vos jets de dégâts."
    },
    {
      id: "kata-feu-abandon-temeraire",
      name: "Style de l'Abandon Téméraire (Reckless Abandon Style)",
      element: "Feu",
      mastery: 4,
      cost: 4,
      schools: "Berserker Matsu, Bushi Usagi",
      source: "Livre de Base (p. 260)",
      desc: "Vous pouvez ajouter votre Anneau de Feu à votre ND d'Armure tant que vous êtes en Posture d'Attaque Totale (Full Attack Stance)."
    },
    {
      id: "kata-feu-lames-tournoyantes",
      name: "Style des Lames Tournoyantes (Spinning Blades Style)",
      element: "Feu",
      mastery: 5,
      cost: 5,
      schools: "Bushi Mirumoto, Bushi Yoritomo",
      source: "Livre de Base (p. 260)",
      desc: "Une fois par tour tant que vous maniez une arme dans chaque main, vous pouvez utiliser la manœuvre Attaque Supplémentaire (Extra Attack) pour 3 Augmentations au lieu de 5. La seconde attaque provient de votre arme en main non directrice et inflige ses dégâts normaux. Vous ne pouvez augmenter vos dégâts sur aucune des deux attaques via des Augmentations."
    },
    {
      id: "kata-feu-force-dragon",
      name: "La Force du Dragon (Strength of the Dragon)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan du Dragon",
      source: "The Great Clans",
      desc: "Lorsque vous maniez un katana dans votre main directrice et un wakizashi dans votre main non directrice, vous gagnez un bonus de +3 à votre ND d'Armure."
    },
    {
      id: "kata-feu-force-scorpion",
      name: "La Force du Scorpion (Strength of the Scorpion)",
      element: "Feu",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan du Scorpion",
      source: "The Great Clans",
      desc: "Une fois par Tour après avoir réussi la manœuvre Feinte (Feint), le total de vos dégâts est augmenté de +3 Blessures."
    },
    {
      id: "kata-acier-empire-sur-fil",
      name: "L'Empire Repose sur son Fil (The Empire Rests on Its Edge)",
      element: "Air / Feu",
      mastery: 3,
      cost: 3,
      schools: "Toutes — Bushi Mirumoto & Kakita réduisent l'Anneau requis de 1 (Air 2 ou Feu 2) — Katana ou Daishō uniquement",
      source: "The Book of Fire (p. 179 — 1 000 Ans d'Acier)",
      desc: "À l'apprentissage de ce Kata, choisissez une Compétence Noble (High Skill) non martiale (augmenter son Rang coûte désormais +2 XP à chaque rang). Lorsque ce Kata est actif, vous ajoutez votre Rang dans cette Compétence Noble au total de vos jets de Kenjutsu ou d'Iaijutsu."
    },
    {
      id: "kata-acier-monde-est-vide",
      name: "Le Monde est Vide (The World is Empty)",
      element: "Air / Feu",
      mastery: 4,
      cost: 4,
      schools: "Toutes — Bushi Mirumoto & Kakita réduisent l'Anneau requis de 1 (Air 3 ou Feu 3) — Katana ou Daishō uniquement",
      source: "The Book of Fire (p. 180 — 1 000 Ans d'Acier)",
      desc: "À l'activation, vous gagnez un bonus de +Xg0 à vos jets d'attaque en Kenjutsu ou Iaijutsu (où X est votre nombre actuel de points de Vide) pendant X Rounds (jusqu'à l'Étape des Réactions du dernier Round). Lorsque le Kata prend fin, vous perdez 1 point de Vide."
    },
    {
      id: "kata-acier-victoire-riviere",
      name: "La Victoire du Fleuve (Victory of the River)",
      element: "Air / Feu",
      mastery: 5,
      cost: 5,
      schools: "Toutes — Bushi Mirumoto & Kakita réduisent l'Anneau requis de 1 (Air 4 ou Feu 4) — Katana ou Daishō uniquement",
      source: "The Book of Fire (p. 180 — 1 000 Ans d'Acier)",
      desc: "Lorsque vous touchez un adversaire tant que ce Kata est actif, son ND d'Armure diminue de 10 contre vos attaques suivantes pendant 3 Rounds, mais votre propre ND d'Armure diminue également de 10 tant que ce bénéfice est actif (un seul adversaire affecté à la fois, non cumulatif ; les coups suivants réinitialisent la durée de 3 Rounds)."
    },
    {
      id: "kata-acier-debout-sur-cieux",
      name: "Debout sur les Cieux (Standing on the Heavens)",
      element: "Air / Feu",
      mastery: 6,
      cost: 6,
      schools: "Toutes — Bushi Mirumoto & Kakita réduisent l'Anneau requis de 1 (Air 5 ou Feu 5) — Katana ou Daishō uniquement",
      source: "The Book of Fire (p. 180 — 1 000 Ans d'Acier)",
      desc: "Une fois par Round, lorsque vous êtes touché par un jet d'attaque réussi au combat, vous pouvez dépenser 1 point de Vide en Action Gratuite pour forcer votre adversaire à relancer immédiatement son jet d'attaque."
    },

    // =========================================================================
    // --- KATAS DU VIDE (VOID : 3 Livre de Base + 1 Great Clans) ---
    // =========================================================================
    {
      id: "kata-vide-frapper-vide",
      name: "Frapper comme le Vide (Striking as Void)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Toutes (Any)",
      source: "Livre de Base (p. 259)",
      desc: "Lorsque vous êtes en Posture du Centre (Center Stance), votre ND d'Armure est augmenté de votre Anneau de Vide."
    },
    {
      id: "kata-vide-equilibrer-elements",
      name: "Style de l'Équilibre des Éléments (Balance the Elements Style)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Bushi Mirumoto, Bushi Shiba",
      source: "Livre de Base (p. 259)",
      desc: "Vous pouvez utiliser votre Anneau de Vide à la place de vos Réflexes pour votre Jet d'Initiative."
    },
    {
      id: "kata-vide-force-purete",
      name: "Style de la Force de la Pureté (Strength of Purity Style)",
      element: "Vide",
      mastery: 4,
      cost: 4,
      schools: "Bushi Akodo, Bushi Kakita, Berserker Matsu, Vierge de Bataille Utaku",
      source: "Livre de Base (p. 260)",
      desc: "Une fois par tour lors d'un jet de dégâts, vous pouvez lancer votre Rang d'Honneur à la place de votre Force normale + VD de l'arme (vous gardez normalement un nombre de dés égal à la VD de l'arme)."
    },
    {
      id: "kata-vide-force-phenix",
      name: "La Force du Phénix (Strength of the Phoenix)",
      element: "Vide",
      mastery: 3,
      cost: 3,
      schools: "Tout Bushi du Clan du Phénix",
      source: "The Great Clans",
      desc: "Une fois par Tour, lorsque vous déclarez une Action Garde (Guard), vous pouvez augmenter le ND d'Armure de la personne que vous protégez d'un bonus supplémentaire de +3."
    }
  ];

  if (typeof window !== "undefined") {
    window.KATAS_DATA = KATAS_DATA;
  }
})();
