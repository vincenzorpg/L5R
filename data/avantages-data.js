/**
 * AVANTAGES_DATA - Catalogue d'Avantages et Désavantages L5R 4e Édition
 */
const AVANTAGES_DATA = {
  avantages: [
    { name: "Réflexes Éclairs", cost: 3, type: "Physique", desc: "+1g1 aux jets d'Initiative." },
    { name: "Âme de Guerrier", cost: 4, type: "Spirituel", desc: "Considéré comme ayant un rang de Maîtrise supérieur pour ses techniques de Bushi." },
    { name: "Grande Taille", cost: 4, type: "Physique", desc: "+1g0 aux jets de Dégâts au corps à corps et +1 PV par niveau de blessure." },
    { name: "Voix Envoûtante", cost: 3, type: "Social", desc: "+1g0 à tous les jets de compétences sociales face à autrui." },
    { name: "Affinité Élémentaire", cost: 4, type: "Spirituel", desc: "+1g0 pour lancer les sorts de l'anneau choisi (Shugenja uniquement)." },
    { name: "Chanceux", cost: 3, type: "Matériel", desc: "Peut relancer un jet de dés totalement raté par session de jeu." },
    { name: "Honneur Pur", cost: 2, type: "Mental", desc: "Gagne 1 point d'Honneur supplémentaire lors de chaque gain d'Honneur." }
  ],
  desavantages: [
    { name: "Code du Bushido Strict", gain: 3, type: "Mental", desc: "Perd le double d'Honneur en cas d'infraction au Bushido." },
    { name: "Colérique", gain: 3, type: "Mental", desc: "Doit réussir un jet de Volonté ND 20 pour ne pas dégainer lorsqu'il est provoqué." },
    { name: "Sombre Destin", gain: 3, type: "Spirituel", desc: "Le personnage est voué à mourir d'une mort tragique ou maudite." },
    { name: "Boiteux", gain: 3, type: "Physique", desc: "Vitesse de déplacement réduite de 5 mètres." },
    { name: "Malédiction de Benten", gain: 2, type: "Spirituel", desc: "Les gens ont une méfiance instinctive et inexplicable à son égard." },
    { name: "Mauvaise Réputation", gain: 2, type: "Social", desc: "Part avec une pénalité sociale dans un ou plusieurs clans." },
    { name: "Cupidité", gain: 2, type: "Mental", desc: "Attiré de manière déshonorante par la richesse matérielle." }
  ]
};

if (typeof window !== "undefined") window.AVANTAGES_DATA = AVANTAGES_DATA;
