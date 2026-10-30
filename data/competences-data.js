/**
 * Paliers de Maîtrise officiels (L5R 4e Édition - Rangs 3, 5 et 7)
 */
const SKILL_MASTERIES = {
  "kenjutsu": [
    { rank: 3, label: "Dégainé Éclair", desc: "Dégainer un sabre devient une Action Gratuite." },
    { rank: 5, label: "Tranchant Affûté", desc: "Les dés de dégâts avec un sabre explosent sur 9 et 10." },
    { rank: 7, label: "Frappe Fluide", desc: "Porter une attaque de mêlée devient une Action Simple." }
  ],
  "iaijutsu": [
    { rank: 3, label: "Dégainé Réflexe", desc: "Dégainer un sabre devient une Action Gratuite." },
    { rank: 5, label: "Focalisation", desc: "+1g0 sur les jets de Concentration en duel." },
    { rank: 7, label: "Frappe Ultime", desc: "Les dés de frappe d'Iaijutsu explosent sur 9 et 10." }
  ],
  "kyujutsu": [
    { rank: 3, label: "Encoche Rapide", desc: "Encocher et viser devient une Action Gratuite." },
    { rank: 5, label: "Tir à Bout Portant", desc: "Aucun malus pour tirer sur une cible engagée au corps-à-corps." },
    { rank: 7, label: "Flèche Éclair", desc: "Les attaques à l'arc deviennent des Actions Simples." }
  ],
  "armes lourdes": [
    { rank: 3, label: "Impact Brutal", desc: "Augmentation Gratuite pour la manœuvre Renversement (Knockdown)." },
    { rank: 5, label: "Brise-Garde", desc: "Ignore 3 points de Réduction d'armure adverse." },
    { rank: 7, label: "Broyeur", desc: "Les attaques avec armes lourdes deviennent des Actions Simples." }
  ],
  "jiujutsu": [
    { rank: 3, label: "Prise Solide", desc: "+1g0 sur les jets de contrôle en Lutte (Grapple)." },
    { rank: 5, label: "Poings d'Acier", desc: "Dégâts à mains nues augmentés à 0g2 (au lieu de 0g1) + Force." },
    { rank: 7, label: "Enchaînement", desc: "Les attaques à mains nues deviennent des Actions Simples." }
  ],
  "defense": [
    { rank: 3, label: "Garde Souple", desc: "Ajoute +3 supplémentaire au ND d'Armure en posture Défense." },
    { rank: 5, label: "Esquive Totale", desc: "Conserve la totalité (au lieu de la moitié) du jet de Défense en Défense Totale." },
    { rank: 7, label: "Mur Infranchissable", desc: "+5 permanent au ND d'Armure quelle que soit la posture." }
  ],
  "courtisan": [
    { rank: 3, label: "Étiquette Aiguisée", desc: "Gain de +1g0 sur les jets de commérage et d'observation en cour." },
    { rank: 5, label: "Réseau d'Indiscrétions", desc: "Dépenser 1 point de Vide confère +2g1 au lieu de +1g1 sur les jets de Cour." },
    { rank: 7, label: "Maître des Salons", desc: "Immunité contre les pénalités sociales infligées par autrui." }
  ],
  "enquete": [
    { rank: 3, label: "Coup d'Œil", desc: "Augmentation Gratuite sur la recherche d'indices matériels." },
    { rank: 5, label: "Déduction Pure", desc: "Permet de poser une question véridique au MJ par session." },
    { rank: 7, label: "Infaillible", desc: "Les mensonges de niveau commun sont détectés sans jet de dé." }
  ],
  "athletisme": [
    { rank: 3, label: "Bond Aérien", desc: "Distance de saut augmentée de 50 %." },
    { rank: 5, label: "Course Endurante", desc: "Mouvement gratuit par tour augmenté de +1,5 mètre." },
    { rank: 7, label: "Agilité Suprême", desc: "Se relever de terre (Prone) est une Action Gratuite." }
  ]
};
/**
 * COMPETENCES_DATA - Catalogue officiel L5R 4e Édition
 * Compétences Bugei, Nobles (High), Marchandes (Merchant) et Dégradantes (Low)
 */
const COMPETENCES_DATA = [
  // --- BUGEI ---
  { id: "armes-de-hast", name: "Armes d'Hast", trait: "Agilité", type: "Bugei", desc: "Maniement des naginata, yari et bisento." },
  { id: "armes-de-paysan", name: "Armes de Paysan", trait: "Agilité", type: "Bugei", desc: "Maniement des kama, nunchaku, tonfa." },
  { id: "armes-lourdes", name: "Armes Lourdes", trait: "Agilité", type: "Bugei", desc: "Maniement des tetsubo, dai-tsuchi, ono." },
  { id: "athletisme", name: "Athlétisme", trait: "Force", type: "Bugei", desc: "Courir, sauter, escalader et nager." },
  { id: "bataille", name: "Art de la Guerre (Bataille)", trait: "Perception", type: "Bugei", desc: "Tactique d'armée, escarmouche et commandement." },
  { id: "defense", name: "Défense", trait: "Réflexes", type: "Bugei", desc: "Parer, esquiver et postures défensives." },
  { id: "equitation", name: "Équitation", trait: "Agilité", type: "Bugei", desc: "Monter et combattre à cheval." },
  { id: "iaijutsu", name: "Iaijutsu", trait: "Réflexes", type: "Bugei", desc: "L'art du dégainé rapide et du duel formel." },
  { id: "jiujutsu", name: "Jiujutsu", trait: "Agilité", type: "Bugei", desc: "Combat à mains nues, clés et projections." },
  { id: "kenjutsu", name: "Kenjutsu", trait: "Agilité", type: "Bugei", desc: "Maniement du sabre (Katana, Wakizashi, No-Dachi)." },
  { id: "kyujutsu", name: "Kyujutsu", trait: "Réflexes", type: "Bugei", desc: "Tir à l'arc (Yumi)." },

  // --- NOBLES (HIGH) ---
  { id: "artisanat", name: "Artisanat", trait: "Intuition", type: "Noble", desc: "Forge, poésie, peinture, composition." },
  { id: "calligraphie", name: "Calligraphie", trait: "Intelligence", type: "Noble", desc: "Écriture des rouleaux sacrés et lettres officielles." },
  { id: "ceremonie-du-the", name: "Cérémonie du Thé", trait: "Vide", type: "Noble", desc: "Harmonie et récupération de points de Vide." },
  { id: "courtisan", name: "Courtisan", trait: "Intuition", type: "Noble", desc: "Intrigue, étiquette politique et manipulation à la cour." },
  { id: "enquete", name: "Enquête", trait: "Perception", type: "Noble", desc: "Recherche d'indices, interrogatoires et observation." },
  { id: "etiquette", name: "Étiquette", trait: "Intuition", type: "Noble", desc: "Connaissance des préséances et des convenances." },
  { id: "histoire", name: "Connaissance : Histoire", trait: "Intelligence", type: "Noble", desc: "Grandes batailles, chroniques et lignées." },
  { id: "theologie", name: "Connaissance : Théologie", trait: "Intelligence", type: "Noble", desc: "Panthéon des Fortunes, Kami et voie de Shinsei." },
  { id: "meditation", name: "Méditation", trait: "Vide", type: "Noble", desc: "Recueillement et concentration martiale." },
  { id: "oratoire", name: "Oratoire", trait: "Intuition", type: "Noble", desc: "Discours publics et rhétorique." },
  { id: "sincerite", name: "Sincérité", trait: "Intuition", type: "Noble", desc: "Persuasion et maintien des apparences." },
  { id: "theurgie", name: "Théurgie (Spellcraft)", trait: "Intelligence", type: "Noble", desc: "Compréhension de la magie élémentaire et des parchemins." },

  // --- MARCHANDES (MERCHANT) ---
  { id: "commerce", name: "Commerce", trait: "Intelligence", type: "Marchande", desc: "Achat, vente, évaluation et négociation financière." },
  { id: "navigation", name: "Navigation", trait: "Intelligence", type: "Marchande", desc: "Lecture des cartes maritimes et guidage céleste." },
  { id: "dressage", name: "Dressage", trait: "Intuition", type: "Marchande", desc: "Élevage et dressage des animaux et chevaux." },

  // --- DÉGRADANTES (LOW) ---
  { id: "comedie", name: "Comédie (Imposture)", trait: "Intuition", type: "Dégradante", desc: "Se déguiser et mentir avec aplomb." },
  { id: "contrefacon", name: "Contrefaçon", trait: "Agilité", type: "Dégradante", desc: "Imiter sceaux, écritures et laisser-passer." },
  { id: "discretion", name: "Discrétion", trait: "Agilité", type: "Dégradante", desc: "Se dissimuler et se déplacer en silence." },
  { id: "intimidation", name: "Intimidation", trait: "Volonté", type: "Dégradante", desc: "Effrayer et contraindre autrui." },
  { id: "poisons", name: "Poisons", trait: "Intelligence", type: "Dégradante", desc: "Fabrication, détection et application des toxines." },
  { id: "outremonde", name: "Connaissance : Outremonde", trait: "Intelligence", type: "Dégradante", desc: "Connaissance des gobelins, onis et de la Souillure." }
];

if (typeof window !== "undefined") window.COMPETENCES_DATA = COMPETENCES_DATA;
