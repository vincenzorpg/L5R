/**
 * AVANTAGES_DATA - Catalogue officiel complet L5R 4e Édition
 * Sources : Core Rulebook (Book of Fire), The Great Clans & GM's Survival Guide
 */

const AVANTAGES_DATA = {
  avantages: [
    // --- AVANTAGES PHYSIQUES ---
    { 
      name: "Réflexes Éclairs (Combat Reflexes)", 
      cost: 4, 
      type: "Physique", 
      desc: "Vous réagissez avec une vélocité fulgurante. Octroie +1g1 aux jets d'Initiative et permet d'agir normalement même en cas de surprise.", 
      impact: "initiative_bonus" 
    },
    { 
      name: "Grande Taille (Large)", 
      cost: 4, 
      type: "Physique", 
      desc: "Vous mesurez plus de 1m85. Octroie +1g0 aux dégâts de mêlée avec les armes de taille moyenne ou grande, et confère +1 PV supplémentaire à chaque palier de blessures.", 
      impact: "large_wounds" 
    },
    { 
      name: "Guérison Rapide (Quick Healer)", 
      cost: 3, 
      type: "Physique", 
      desc: "Votre corps régénère les tissus à une vitesse surprenante. Pour la récupération nocturne de points de vie, votre Constitution est considérée supérieure de 2 rangs.", 
      impact: "quick_heal" 
    },
    { 
      name: "Rapide (Quick)", 
      cost: 6, 
      type: "Physique", 
      desc: "Si vous n'agissez pas en premier lors d'un round de combat, vous ajoutez votre rang de Réflexes à votre score d'Initiative pour tous les rounds suivants de l'escarmouche.", 
      impact: "quick_init" 
    },
    { 
      name: "Ambidextre (Ambidextrous)", 
      cost: 3, 
      type: "Physique", 
      desc: "Vous maniez vos armes indifféremment des deux mains sans subir la pénalité habituelle de la main faible.", 
      impact: "none" 
    },
    { 
      name: "Équilibre Parfait (Balance of Elements)", 
      cost: 2, 
      type: "Physique", 
      desc: "Sens inné de la pesanteur : octroie +1g0 à tous les jets d'Athlétisme liés à l'escalade, aux sauts et au maintien de l'équilibre.", 
      impact: "none" 
    },
    { 
      name: "Prodige (Prodigy)", 
      cost: 12, 
      type: "Physique", 
      desc: "Génie né des dojos d'élite : octroie un bonus permanent de +1g0 à TOUS les jets utilisant vos compétences d'école (School Skills).", 
      impact: "school_skills_bonus" 
    },
    { 
      name: "Mains de Crabe (Crab Hands)", 
      cost: 3, 
      type: "Physique", 
      desc: "Vous maniez instantanément les armes paysannes ou improvisées comme si vous possédiez le Rang 1 dans la compétence martiale appropriée.", 
      impact: "none" 
    },
    { 
      name: "Beauté Dangereuse (Dangerous Beauty)", 
      cost: 3, 
      type: "Physique", 
      desc: "Séduction magnétique : confère +1g0 aux jets de Tentation (Séduction) envers les personnes sensibles à vos charmes (coûte 2 XP pour le Scorpion).", 
      impact: "none" 
    },
    { 
      name: "Voix (Voice)", 
      cost: 3, 
      type: "Physique", 
      desc: "Un timbre mélodieux et captivant conférant +1g0 à tous les jets de compétences sociales persuasives (Oratoire, Représentation, Sincérité).", 
      impact: "none" 
    },

    // --- AVANTAGES MENTAUX ---
    { 
      name: "Clarté d'Esprit (Clear Thinker)", 
      cost: 3, 
      type: "Mental", 
      desc: "Esprit cartésien et lucide : +1k0 aux jets opposés contre les tentatives de manipulation, de duperie ou de confusion (coûte 2 XP pour le Dragon).", 
      impact: "none" 
    },
    { 
      name: "Calme Impérial (Balance)", 
      cost: 2, 
      type: "Mental", 
      desc: "Sérénité intérieure : vous ajoutez +1k0 supplémentaire chaque fois que vous invoquez votre rang d'Honneur pour résister à l'Intimidation ou à la Tentation.", 
      impact: "none" 
    },
    { 
      name: "Direction Absolue (Absolute Direction)", 
      cost: 1, 
      type: "Mental", 
      desc: "Boussole interne infaillible : vous connaissez toujours le nord et gagnez +1k1 sur tous les jets d'orientation et de survie en extérieur.", 
      impact: "none" 
    },
    { 
      name: "Mémoire Précise (Precise Memory)", 
      cost: 3, 
      type: "Mental", 
      desc: "Rappel photographique : octroie +1k1 à tous les jets d'Intelligence pour vous souvenir fidèlement d'un visage, d'un texte ou d'une carte aperçue.", 
      impact: "none" 
    },
    { 
      name: "Casse-cou (Daredevil)", 
      cost: 3, 
      type: "Mental", 
      desc: "Dépenser un point de Vide sur un jet d'Athlétisme confère +3k1 au résultat au lieu du bonus standard de +1k1 (coûte 2 XP pour la Mante).", 
      impact: "none" 
    },
    { 
      name: "Lire sur les Lèvres (Read Lips)", 
      cost: 2, 
      type: "Mental", 
      desc: "Permet de déchiffrer avec précision les conversations silencieuses à portée de vue via un jet réussi de Perception.", 
      impact: "none" 
    },

    // --- AVANTAGES SPIRITUELS ---
    { 
      name: "Force de la Terre (Strength of the Earth)", 
      cost: 4, 
      type: "Spirituel", 
      desc: "Volonté inébranlable : réduit l'ensemble de vos malus de blessures subis en combat de 5 points (un palier à +10 devient +5).", 
      impact: "reduce_wound_penalties" 
    },
    { 
      name: "Grand Destin (Great Destiny)", 
      cost: 5, 
      type: "Spirituel", 
      desc: "L'Ordre Céleste veille sur votre trame : une fois par séance, un coup fatal qui devrait vous tuer vous laisse miraculeusement vivant à 1 PV.", 
      impact: "destiny_shield" 
    },
    { 
      name: "Bénédiction de Benten (Benten's Blessing)", 
      cost: 4, 
      type: "Spirituel", 
      desc: "Faveur de la Fortune de l'Amour : confère +0k1 à tous vos jets sociaux ayant pour vocation de persuader ou d'apaiser de façon honorable.", 
      impact: "none" 
    },
    { 
      name: "Bénédiction de Bishamon (Bishamon's Blessing)", 
      cost: 5, 
      type: "Spirituel", 
      desc: "Faveur de la Fortune de la Force : lorsque vous annoncez 3 Augmentations pour infliger des dégâts accrus, vous obtenez une Augmentation gratuite supplémentaire.", 
      impact: "none" 
    },
    { 
      name: "Bénédiction de Fukurokujin (Fukurokujin's Blessing)", 
      cost: 4, 
      type: "Spirituel", 
      desc: "Faveur de la Fortune de la Sagesse : octroie +1k1 permanent sur tous les jets d'une compétence d'Érudition (Lore) choisie à la création.", 
      impact: "none" 
    },
    { 
      name: "Bénédiction de Jurojin (Jurojin's Blessing)", 
      cost: 3, 
      type: "Spirituel", 
      desc: "Faveur de la Fortune de la Longévité : immunité totale aux maladies naturelles et bonus de +1k1 pour résister à tous les poisons et toxines.", 
      impact: "none" 
    },
    { 
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)", 
      cost: 4, 
      type: "Spirituel", 
      desc: "Descendant du Dieu de l'Orage : immunité aux intempéries naturelles (froid hivernal, canicule) et réduction de 1k1 aux dégâts de foudre magique.", 
      impact: "none" 
    },
    { 
      name: "Affinité Élémentaire (Elemental Blessing)", 
      cost: 4, 
      type: "Spirituel", 
      desc: "Communion mystique : confère +1g0 permanent pour lancer tous les sorts affiliés à l'élément de votre choix (Shugenja uniquement).", 
      impact: "none" 
    },

    // --- AVANTAGES SOCIAUX & MATÉRIELS ---
    { 
      name: "Sens du Commandement (Leadership)", 
      cost: 6, 
      type: "Social", 
      desc: "Autorité naturelle : permet d'ajouter votre Rang d'École + 1k1 au score d'Initiative d'un allié lors de la phase de Réaction.", 
      impact: "none" 
    },
    { 
      name: "Honneur Pur (Pure Honor)", 
      cost: 2, 
      type: "Social", 
      desc: "Exemplarité morale : chaque action honorable vous rapportant des points d'Honneur vous octroie 1 point d'Honneur supplémentaire.", 
      impact: "none" 
    },
    { 
      name: "Passe-partout (Bland)", 
      cost: 2, 
      type: "Social", 
      desc: "Apparence quelconque : augmente de +10 le ND des observateurs qui tentent de reconnaître votre identité ou d'estimer votre rang d'Honneur.", 
      impact: "none" 
    },
    { 
      name: "Chanceux (Luck)", 
      cost: 3, 
      type: "Matériel", 
      desc: "Les Fortunes sourient aux audacieux : permet de relancer intégralement un jet de dés totalement manqué, une fois par séance de jeu.", 
      impact: "none" 
    },
    { 
      name: "Richesse Personnelle (Wealth)", 
      cost: 2, 
      type: "Matériel", 
      desc: "Votre lignée vous alloue des ressources financières supérieures : ajoute 5 Koku supplémentaires à votre dotation d'équipement de départ.", 
      impact: "none" 
    }
  ],

  desavantages: [
    // --- DÉSAVANTAGES PHYSIQUES ---
    { 
      name: "Mauvaise Santé (Bad Health)", 
      gain: 3, 
      type: "Physique", 
      desc: "Constitution fragile : la taille de vos paliers de blessures est réduite de 1 PV par niveau (votre vitalité globale diminue).", 
      impact: "reduce_wounds" 
    },
    { 
      name: "Petite Taille (Small)", 
      gain: 3, 
      type: "Physique", 
      desc: "Vous mesurez moins d'1m50 : vous perdez -1g0 aux jets de dégâts au corps à corps et votre foulée de déplacement est réduite de 1,5 m.", 
      impact: "none" 
    },
    { 
      name: "Boiteux (Lame)", 
      gain: 3, 
      type: "Physique", 
      desc: "Séquelle ou malformation : votre vitesse maximale lors de toute action de mouvement est réduite de moitié.", 
      impact: "none" 
    },
    { 
      name: "Mauvaise Vue (Bad Eyesight)", 
      gain: 3, 
      type: "Physique", 
      desc: "Acuité visuelle défaillante : vous subissez un malus de -1k1 à tous les tirs à l'arc (Kyujutsu) et aux jets d'Enquête basés sur la vue.", 
      impact: "none" 
    },
    { 
      name: "Bras Manquant (Missing Limb)", 
      gain: 5, 
      type: "Physique", 
      desc: "Un bras tranché ou infirme : impossible de manier les armes à deux mains (No-Dachi, Tetsubo, Yari) ou de bander un arc long.", 
      impact: "none" 
    },
    { 
      name: "Visage Inquiétant (Disturbing Countenance)", 
      gain: 3, 
      type: "Physique", 
      desc: "Traits sinistres ou balafrés : le Niveau de Difficulté de tous vos jets de compétences sociales pacifiques augmente de +5.", 
      impact: "none" 
    },

    // --- DÉSAVANTAGES MENTAUX ---
    { 
      name: "Code du Bushido Strict", 
      gain: 3, 
      type: "Mental", 
      desc: "Orthodoxie morale rigide : toute infraction au code moral du Bushido vous inflige le double de pertes ordinaires d'Honneur.", 
      impact: "none" 
    },
    { 
      name: "Colérique (Bad Temper)", 
      gain: 3, 
      type: "Mental", 
      desc: "Tempérament sanguin : vous devez réussir un jet de Volonté ND 20 pour ne pas dégainer lorsqu'on remet en cause votre valeur.", 
      impact: "none" 
    },
    { 
      name: "Téméraire (Brash)", 
      gain: 3, 
      type: "Mental", 
      desc: "Arrogance impulsive : vous refusez systématiquement de reculer ou de fuir une escarmouche sans avoir réussi un jet de Volonté ND 20.", 
      impact: "none" 
    },
    { 
      name: "Incapable de Mentir (Can't Lie)", 
      gain: 3, 
      type: "Mental", 
      desc: "Inaptitude absolue à la duperie : tout mensonge direct énoncé échoue automatiquement sans nécessiter de jet de dés.", 
      impact: "none" 
    },
    { 
      name: "Crédule (Gullible)", 
      gain: 4, 
      type: "Mental", 
      desc: "Naïveté désarmante : les interlocuteurs cherchant à vous tromper avec la compétence Sincérité (Fourberie) gagnent +1k1 sur leur jet.", 
      impact: "none" 
    },
    { 
      name: "Cupidité (Greedy)", 
      gain: 3, 
      type: "Mental", 
      desc: "Appétit coupable pour le lucre : les adversaires usant de Tentation (Corruption) contre vous reçoivent un bonus de +1k1 sur leur total.", 
      impact: "none" 
    },
    { 
      name: "Doute de Soi (Doubt)", 
      gain: 4, 
      type: "Mental", 
      desc: "Crise de légitimité : choisissez une compétence d'école. Chaque fois que vous l'utilisez, vous devez annoncer 1 Augmentation sans effet.", 
      impact: "none" 
    },
    { 
      name: "Ascète (Ascetic)", 
      gain: 3, 
      type: "Mental", 
      desc: "Rejet des vanités : le personnage refuse tout luxe superflu, restreint son équipement au strict minimum et ne conserve aucun koku.", 
      impact: "none" 
    },

    // --- DÉSAVANTAGES SPIRITUELS ---
    { 
      name: "Sombre Destin (Dark Fate)", 
      gain: 3, 
      type: "Spirituel", 
      desc: "Malédiction karmique : le personnage est destiné à mourir prématurément de façon tragique sans jamais connaître la paix.", 
      impact: "none" 
    },
    { 
      name: "Hanté (Haunted)", 
      gain: 3, 
      type: "Spirituel", 
      desc: "Tourment de l'au-delà : l'esprit d'un ancêtre courroucé ou d'une victime passée vous distrait lors des moments de tension extrême.", 
      impact: "none" 
    },
    { 
      name: "Malédiction d'Hotei (Hotei's Curse)", 
      gain: 6, 
      type: "Spirituel", 
      desc: "Abandon du dieu de la Sérénité : chaque technique, don ou kiho requérant la dépense d'1 point de Vide en exige impérativement 2 !", 
      impact: "none" 
    },
    { 
      name: "Malédiction de Benten (Benten's Curse)", 
      gain: 2, 
      type: "Spirituel", 
      desc: "Rejet instinctif : les inconnus éprouvent une antipathie et une méfiance naturelle à votre encontre (-1k0 aux jets de Courtoisie).", 
      impact: "none" 
    },
    { 
      name: "Délaissé des Fortunes (Forsaken)", 
      gain: 4, 
      type: "Spirituel", 
      desc: "Les Kami vous ignorent : il vous est strictement impossible de dépenser des points de Vide sur vos jets de compétences simples.", 
      impact: "none" 
    },

    // --- DÉSAVANTAGES SOCIAUX ---
    { 
      name: "Secret Inavouable (Dark Secret)", 
      gain: 5, 
      type: "Social", 
      desc: "Faute impardonnable dissimulée : si ce secret venait à être dévoilé au grand jour, il contraindrait votre samouraï au Seppuku immédiat.", 
      impact: "none" 
    },
    { 
      name: "Mauvaise Réputation (Bad Reputation)", 
      gain: 2, 
      type: "Social", 
      desc: "Bruits déshonorants : les PNJ vous reconnaissant partent avec un préjugé hostile et votre statut effectif est abaissé de 1 rang.", 
      impact: "none" 
    },
    { 
      name: "Ennemi Juré (Sworn Enemy)", 
      gain: 3, 
      type: "Social", 
      desc: "Un samouraï influent d'un clan rival a juré votre déchéance et utilise ses ressources pour contrecarrer vos missions.", 
      impact: "none" 
    },
    { 
      name: "Déshonoré (Dishonored)", 
      gain: 3, 
      type: "Social", 
      desc: "Tache indélébile : votre samouraï débute sa carrière avec un rang d'Honneur et de Gloire égal à zéro.", 
      impact: "none" 
    }
  ]
};

// Export universel navigateur et Node.js
if (typeof window !== "undefined") {
  window.AVANTAGES_DATA = AVANTAGES_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = AVANTAGES_DATA;
}
