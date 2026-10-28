/**
 * EQUIPEMENT_DATA - Armes, Armures et Équipement L5R 4e Édition
 */
const EQUIPEMENT_DATA = {
  armures: [
    { id: "vetements", name: "Vêtements normaux / Kimono", tn: 0, reduc: 0, desc: "Aucun encombrement." },
    { id: "armure-legere", name: "Armure Légère (Ashigaru / Cuir laqué)", tn: 5, reduc: 3, desc: "+5 ND d'Armure, Réduction 3." },
    { id: "armure-lourde", name: "Armure Lourde (O-Yoroi de samouraï)", tn: 10, reduc: 5, desc: "+10 ND d'Armure, Réduction 5." }
  ],
  armes: [
    { id: "katana", name: "Katana", vd: "2g2", trait: "Agilité", skill: "Kenjutsu", type: "Médium", desc: "Arme d'honneur des samouraïs, inflige 3g2 à deux mains." },
    { id: "wakizashi", name: "Wakizashi", vd: "2g1", trait: "Agilité", skill: "Kenjutsu", type: "Petit", desc: "Lame courte faisant partie intégrante du Daisho." },
    { id: "no-dachi", name: "No-Dachi", vd: "3g3", trait: "Agilité", skill: "Kenjutsu", type: "Deux mains", desc: "Grand sabre de champ de bataille." },
    { id: "tetsubo", name: "Tetsubo", vd: "3g2", trait: "Agilité", skill: "Armes Lourdes", type: "Lourd", desc: "Gourdin ferré de guerre privilégié par le Clan du Crabe." },
    { id: "dai-tsuchi", name: "Dai-Tsuchi", vd: "2g3", trait: "Agilité", skill: "Armes Lourdes", type: "Lourd", desc: "Marteau de guerre lourd brise-armures." },
    { id: "naginata", name: "Naginata", vd: "3g2", trait: "Agilité", skill: "Armes d'Hast", type: "Hast", desc: "Lame incurvée montée sur hampe." },
    { id: "yari", name: "Yari", vd: "2g2", trait: "Agilité", skill: "Armes d'Hast", type: "Hast", desc: "Lance classique d'infanterie." },
    { id: "yumi", name: "Arc Yumi (Flèche d'Armure)", vd: "2g2", trait: "Réflexes", skill: "Kyujutsu", type: "Distance", desc: "Grand arc asymétrique rokugani (portée 75 m)." },
    { id: "kama", name: "Kama", vd: "1g2", trait: "Agilité", skill: "Armes de Paysan", type: "Paysan", desc: "Petite faucille couramment utilisée par la Mante." },
    { id: "tanto", name: "Tanto", vd: "1g1", trait: "Agilité", skill: "Kenjutsu", type: "Couteau", desc: "Dague polyvalente ou d'autodéfense." }
  ]
};

if (typeof window !== "undefined") window.EQUIPEMENT_DATA = EQUIPEMENT_DATA;
