const SORTS_UNIVERSELS = [
  {
    id: "univ-sense",
    name: "Sentir les Kami (Sense)",
    element: "Universel",
    mastery: "Universel",
    keywords: ["Divination"],
    range: "Personnelle",
    area: "Rayon de 15 m autour du lanceur",
    duration: "Instantanée",
    raises: "Portée (+15 m par Raise), Détection d'un type précis",
    desc: "Permet au shugenja de percevoir la présence, l'état et la concentration des kami élémentaires autour de lui. Révèle si une zone est spirituellement troublée, enchantée ou souillée par Jigoku."
  },
  {
    id: "univ-commune",
    name: "Communier avec les Kami (Commune)",
    element: "Universel",
    mastery: "Universel",
    keywords: ["Divination", "Communication"],
    range: "6 mètres",
    area: "Un esprit élémentaire local",
    duration: "Concentration",
    raises: "Question additionnelle (+1 par Raise), Clarté accrue",
    desc: "Permet de converser avec un kami local et de lui poser des questions (jusqu'à 2 questions de base). Les esprits d'Air sont capricieux et bavards, la Terre est lente et littérale, le Feu est impatient et l'Eau voit le flux des événements."
  },
  {
    id: "univ-summon",
    name: "Invoquer les Kami (Summon)",
    element: "Universel",
    mastery: "Universel",
    keywords: ["Matérialisation"],
    range: "6 mètres",
    area: "Une poignée de matière élémentaire",
    duration: "Permanente",
    raises: "Volume doublé par Raise, Matière spécifique (bois, fer, thé...)",
    desc: "Matérialise une petite quantité d'élément pur : eau potable, braise pour un feu, brise fraîche ou poignée de terre fertile. Ne peut jamais créer de métaux précieux ou de jade."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_UNIVERSELS = SORTS_UNIVERSELS;
}
