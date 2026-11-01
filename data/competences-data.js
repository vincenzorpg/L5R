/**
 * COMPETENCES_DATA — Catalogue officiel complet L5R 4e Édition (Livre de Base p. 133-145)
 * Compétences Nobles (High), Guerrières (Bugei), Marchandes (Merchant) et Dégradantes (Low)
 */
const COMPETENCES_DATA = [

  // =========================================================================
  // 1. COMPÉTENCES NOBLES (HIGH SKILLS) — EXCLUSIVES À LA CASTE SAMOURAÏ
  // =========================================================================
  { 
    id: "art-de-la-scene", 
    name: "Art de la Scène (Perform)", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "Musique (Biwa, Flûte, Shamisen, Tambour), Chant, Danse, Conteur (Storytelling), Marionnettes." 
  },
  { 
    id: "art-dramatique", 
    name: "Comédie (Art Dramatique / Acting)", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "Interprétation théâtrale (Kabuki, Noh) et maintien des faux-semblants nobles." 
  },
  { 
    id: "artisanat", 
    name: "Artisanat (Artisan)", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "Beaux-arts nobles : Peinture, Poésie, Bonsaï, Ikebana, Origami, Sculpture, Tatouage." 
  },
  { 
    id: "calligraphie", 
    name: "Calligraphie", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Rédaction soignée des rouleaux de sorts, décrets officiels et chiffrement des messages (Ciphers)." 
  },
  { 
    id: "ceremonie-du-the", 
    name: "Cérémonie du Thé (Cha-no-yu)", 
    trait: "Vide", 
    type: "Noble", 
    desc: "Harmonie spirituelle, méditation partagée et récupération de points de Vide." 
  },
  { 
    id: "courtisan", 
    name: "Courtisan", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "Manœuvres politiques, rhétorique de cour, manipulation, commérages et étiquette d'influence." 
  },
  { 
    id: "divination", 
    name: "Divination", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Lecture des présages célestes, astrologie et tirage des hexagrammes sacrés (Kawaru)." 
  },
  { 
    id: "droit", 
    name: "Droit (Législation Impériale)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Connaissance des décrets de l'Empereur, chartes des clans et jurisprudence des magistrats." 
  },
  { 
    id: "enquete", 
    name: "Enquête (Investigation)", 
    trait: "Perception", 
    type: "Noble", 
    desc: "Observation des scènes de crime, recherche méthodique d'indices matériels et interrogatoires." 
  },
  { 
    id: "etiquette", 
    name: "Étiquette", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "Respect scrupuleux des préséances, protocole des saluts, conversation de salon et courtoisie." 
  },
  { 
    id: "histoire", 
    name: "Connaissance : Histoire", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Annales impériales, généalogie des familles, guerres anciennes et exploits des ancêtres." 
  },
  { 
    id: "heraldique", 
    name: "Connaissance : Héraldique (Heraldry)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Identification immédiate des bannières, mon de familles, rangs de Gloire et lignées de samouraïs." 
  },
  { 
    id: "bushido", 
    name: "Connaissance : Bushido", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Compréhension des 7 vertus cardinales, jurisprudence martiale et évaluation de l'Honneur." 
  },
  { 
    id: "guerre-theorie", 
    name: "Connaissance : Art de la Guerre (War)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Théorie militaire, lecture des traités de stratégie (Commandement d'Akodo) et sièges." 
  },
  { 
    id: "theologie", 
    name: "Connaissance : Théologie (Shintao & Fortunes)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Panthéon des Sept Grandes Fortunes, kamis ancestraux et enseignements du Petit Maître Shinsei." 
  },
  { 
    id: "shugenja-lore", 
    name: "Connaissance : Esprits & Magie (Shugenja)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Règles de communion avec les cinq éléments et reconnaissance des rites sacrés." 
  },
  { 
    id: "jeux", 
    name: "Jeux de Société (Games)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Go (Intelligence), Shōgi (Intelligence), Sadane (Intuition), Fortunes & Vents (Intuition), Kemari (Agilité)." 
  },
  { 
    id: "medecine", 
    name: "Médecine (Soins & Herboristerie)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Diagnostic, traitement des blessures, chirurgie traditionnelle, pharmacopée et antidotes." 
  },
  { 
    id: "meditation", 
    name: "Méditation", 
    trait: "Vide", 
    type: "Noble", 
    desc: "Recueillement intérieur, jeûne rituel et régénération accélérée des points de Vide." 
  },
  { 
    id: "oratoire", 
    name: "Oratoire (Art du Discours)", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "Harangues solennelles, éloquence publique et persuasion des assemblées." 
  },
  { 
    id: "sincerite", 
    name: "Sincérité", 
    trait: "Intuition", 
    type: "Noble", 
    desc: "L'art de convaincre autrui de sa droiture et de préserver la face (On) en toute circonstance." 
  },
  { 
    id: "theurgie", 
    name: "Théurgie (Spellcraft)", 
    trait: "Intelligence", 
    type: "Noble", 
    desc: "Compréhension technique des invocations élémentaires, contre-sorts et parchemins sacrés." 
  },

  // =========================================================================
  // 2. COMPÉTENCES MARTIALES (BUGEI SKILLS) — L'ART DU GUERRIER
  // =========================================================================
  { 
    id: "armes-de-hast", 
    name: "Armes d'Hast (Naginata)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement des naginata, bisento et nagamaki." 
  },
  { 
    id: "armes-lourdes", 
    name: "Armes Lourdes", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement des tetsubo, dai-tsuchi, ono et masakari." 
  },
  { 
    id: "athletisme", 
    name: "Athlétisme", 
    trait: "Force", 
    type: "Bugei", 
    desc: "Course, escalade, saut, natation et condition physique générale." 
  },
  { 
    id: "bataille", 
    name: "Art de la Guerre (Bataille)", 
    trait: "Perception", 
    type: "Bugei", 
    desc: "Commandement d'escouade, manœuvres d'escarmouche et batailles de masse." 
  },
  { 
    id: "chasse", 
    name: "Chasse (Pistage & Survie)", 
    trait: "Perception", 
    type: "Bugei", 
    desc: "Traque, orientation en milieu sauvage, pièges naturels et survie forestière." 
  },
  { 
    id: "couteaux", 
    name: "Couteaux (Tantojutsu)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Combat rapproché au tanto, aiguchi et dagues de parade." 
  },
  { 
    id: "defense", 
    name: "Défense", 
    trait: "Réflexes", 
    type: "Bugei", 
    desc: "Posture de Défense et Défense Totale pour augmenter son ND d'Armure." 
  },
  { 
    id: "equitation", 
    name: "Équitation (Horsemanship)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Monte de guerre, contrôle du destrier sous les flèches et combat en selle." 
  },
  { 
    id: "eventail-guerre", 
    name: "Éventail de Guerre (Tessenjutsu)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement martial de l'éventail d'acier pour parer et transmettre les ordres." 
  },
  { 
    id: "iaijutsu", 
    name: "Iaijutsu", 
    trait: "Réflexes", 
    type: "Bugei", 
    desc: "L'art sacré du dégainé rapide et du duel judiciaire formel au sabre." 
  },
  { 
    id: "jiujutsu", 
    name: "Jiujutsu", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Combat à mains nues, clés articulaires, projections et lutte au corps-à-corps." 
  },
  { 
    id: "kenjutsu", 
    name: "Kenjutsu", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement de la lame du samouraï : Katana, Wakizashi, No-Dachi, Cimeterre." 
  },
  { 
    id: "kyujutsu", 
    name: "Kyujutsu (Tir à l'Arc)", 
    trait: "Réflexes", 
    type: "Bugei", 
    desc: "Pratique martiale de l'arc classique Yumi et du grand arc Daikyū." 
  },
  { 
    id: "lances", 
    name: "Lances (Yarijutsu)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement des lances d'infanterie Yari et javelines de jet Nage-yari." 
  },
  { 
    id: "batons", 
    name: "Bâtons (Bojutsu)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement des bâtons longs Bō et bâtons courts Jō des pèlerins." 
  },
  { 
    id: "armes-de-paysan", 
    name: "Armes de Paysan (Peasant Weapons)", 
    trait: "Agilité", 
    type: "Bugei", 
    desc: "Maniement des faucilles Kama, fléaux Nunchaku, Tonfa et outils roturiers." 
  },

  // =========================================================================
  // 3. COMPÉTENCES MARCHANDES (MERCHANT SKILLS)
  // =========================================================================
  { 
    id: "commerce", 
    name: "Commerce (Évaluation & Négociation)", 
    trait: "Intelligence", 
    type: "Marchande", 
    desc: "Achat, vente de riz ou de jade, évaluation des biens précieux et contrats." 
  },
  { 
    id: "ingenierie", 
    name: "Ingénierie (Siège & Bâtiment)", 
    trait: "Intelligence", 
    type: "Marchande", 
    desc: "Construction et entretien des engins de siège, catapultes, ponts et fortins." 
  },
  { 
    id: "navigation", 
    name: "Navigation", 
    trait: "Intelligence", 
    type: "Marchande", 
    desc: "Lecture des cartes côtières, manœuvres des navires Kobune et courants marins." 
  },
  { 
    id: "dressage", 
    name: "Dressage & Élevage (Animal Handling)", 
    trait: "Intuition", 
    type: "Marchande", 
    desc: "Soin et dressage des destriers de clan, faucons de chasse et chiens de guerre." 
  },
  { 
    id: "metiers-forge", 
    name: "Artisanat Pratique (Forge & Armurerie)", 
    trait: "Agilité", 
    type: "Marchande", 
    desc: "Réparation des lames, fabrication de pointes de flèches et révision des cuirasses." 
  },

  // =========================================================================
  // 4. COMPÉTENCES DÉGRADANTES (LOW SKILLS) — INTERDITES AU BUSHIDO
  // =========================================================================
  { 
    id: "discretion", 
    name: "Discrétion (Stealth)", 
    trait: "Agilité", 
    type: "Dégradante", 
    desc: "Se déplacer sans bruit, se dissimuler dans les ombres et embuscades." 
  },
  { 
    id: "intimidation", 
    name: "Intimidation", 
    trait: "Volonté", 
    type: "Dégradante", 
    desc: "Menaces verbales ou physiques, coercition et imposition de la terreur." 
  },
  { 
    id: "contrefacon", 
    name: "Contrefaçon (Forgery)", 
    trait: "Agilité", 
    type: "Dégradante", 
    desc: "Imitation illégale de sceaux officiels de clan, signatures et faux permis." 
  },
  { 
    id: "escamotage", 
    name: "Escamotage (Sleight of Hand)", 
    trait: "Agilité", 
    type: "Dégradante", 
    desc: "Vol à la tire, dissimulation de petits objets et tours de passe-passe." 
  },
  { 
    id: "tromperie", 
    name: "Tromperie (Deceit)", 
    trait: "Intuition", 
    type: "Dégradante", 
    desc: "Mensonge effronté, faux témoignage délibéré et création d'alibis." 
  },
  { 
    id: "seducion-venale", 
    name: "Tentation (Corruption & Séduction)", 
    trait: "Intuition", 
    type: "Dégradante", 
    desc: "Soudoyer des fonctionnaires avec du koku ou exploiter les désirs charnels." 
  },
  { 
    id: "poisons", 
    name: "Poisons", 
    trait: "Intelligence", 
    type: "Dégradante", 
    desc: "Fabrication de venins mortels, somnifères et toxines indétectables." 
  },
  { 
    id: "outremonde", 
    name: "Connaissance : Outremonde (Shadowlands)", 
    trait: "Intelligence", 
    type: "Dégradante", 
    desc: "Étude des Onis, gobelins et des ravages de la Souillure (considéré tabou)." 
  },
  { 
    id: "pègre", 
    name: "Connaissance : Pègre (Underworld)", 
    trait: "Intelligence", 
    type: "Dégradante", 
    desc: "Réseaux de trafiquants de saké, maisons de jeu clandestines et cartels d'opium." 
  }
];

if (typeof window !== "undefined") {
  window.COMPETENCES_DATA = COMPETENCES_DATA;
}
