/**
 * SORTS_DATA - Grimoire exhaustif des Sorts, Invocations, Kihō et Mahō
 * Système Legend of the Five Rings 4e Édition (Livre de Base & Suppléments)
 */

const SORTS_DATA = [

  // =========================================================================
  // 1. SORTS UNIVERSELS (COMMUNS À TOUS LES SHUGENJA)
  // =========================================================================
  {
    id: "univ-sense",
    name: "Sentir les Kami (Sense)",
    element: "Universel",
    mastery: "Universel",
    keywords: ["Perception", "Divination"],
    range: "Personnelle",
    area: "Rayon de 15 m autour du lanceur",
    duration: "Instantanée",
    raises: "Portée (+15 m par Raise), Détection précise (+1 détail spécifique)",
    desc: "Permet de percevoir la présence, l'équilibre et la puissance des esprits élémentaires alentour. Révèle les déséquilibres surnaturels, les enchantements actifs et la présence de la Souillure de Jigoku."
  },
  {
    id: "univ-commune",
    name: "Communier avec les Kami (Commune)",
    element: "Universel",
    mastery: "Universel",
    keywords: ["Divination", "Communication"],
    range: "Personnelle",
    area: "Esprit élémentaire ciblé",
    duration: "Concentration",
    raises: "Question supplémentaire (+1 par Raise)",
    desc: "Le shugenja formule des questions aux esprits. Le nombre de réponses obtenues est égal à son score dans l'Anneau invoqué. La nature des réponses dépend de l'élément : la Terre est factuelle et immuable, l'Air est allusif et mobile, l'Eau retient les flux passés, et le Feu s'exprime par éclats passionnés."
  },
  {
    id: "univ-summon",
    name: "Invoquer les Kami (Summon)",
    element: "Universel",
    mastery: "Universel",
    keywords: ["Matérialisation"],
    range: "9 mètres",
    area: "Matière élémentaire pure",
    duration: "Permanente",
    raises: "Volume matérialisé doublé par Raise",
    desc: "Fait apparaître une quantité modeste de matière élémentaire pure et saine : un bol d'eau potable, une braise vive sans fumée, une brise vivifiante ou une motte de terre fertile."
  },

  // =========================================================================
  // 2. SORTS DE L'AIR (FŪ)
  // =========================================================================
  {
    id: "air-blessed-wind",
    name: "Le Vent Bienveillant (Blessed Wind)",
    element: "Air",
    mastery: 1,
    keywords: ["Défense", "Protection"],
    range: "Personnelle",
    area: "Rayon de 3 m autour du lanceur",
    duration: "Concentration",
    raises: "Cible alliée protégée (+1 par 3 Raises)",
    desc: "Des rafales ascendantes dévient les projectiles physiques. Confère un bonus de +15 au ND d'Armure contre toutes les attaques à distance non magiques."
  },
  {
    id: "air-by-the-light",
    name: "À la Lumière de Dame Lune (By the Light of Lord Moon)",
    element: "Air",
    mastery: 1,
    keywords: ["Perception", "Illusion"],
    range: "Personnelle",
    area: "Rayon de 9 mètres",
    duration: "Concentration",
    raises: "Rayon étendu (+3 m par Raise)",
    desc: "Baigne la zone d'une douce lueur argentée révélant les silhouettes invisibles, dissipant les ténèbres magiques mineures et révélant les illusions d'Air de Maîtrise inférieure ou égale."
  },
  {
    id: "air-legacy-kaze",
    name: "Héritage de Kaze-no-Kami (Legacy of Kaze-no-Kami)",
    element: "Air",
    mastery: 1,
    keywords: ["Communication", "Messager"],
    range: "Rang d'École × 15 km",
    area: "Un oiseau de vent",
    duration: "Spéciale",
    raises: "Portée (+15 km par Raise), Destinataire supplémentaire",
    desc: "Les esprits de l'Air prennent l'apparence d'un oiseau gracieux pour transporter un message parlé court (jusqu'à 25 mots) directement à un individu dont le shugenja connaît le nom."
  },
  {
    id: "air-tempest-air",
    name: "Tempête d'Air (Tempest of Air)",
    element: "Air",
    mastery: 1,
    keywords: ["Tonnerre", "Zone"],
    range: "Personnelle",
    area: "Cône de 20 m de long sur 5 m de large",
    duration: "Instantanée",
    raises: "Dégâts (+1g0 par Raise), Largeur du cône (+1,5 m)",
    desc: "Une bourrasque violente balaie les ennemis. Inflige 1g1 blessures à toutes les cibles dans le cône et impose un jet opposé de Terre contre l'Air du shugenja sous peine de subir un Renversement (Knockdown)."
  },
  {
    id: "air-yari-air",
    name: "La Lance d'Air (Yari of Air)",
    element: "Air",
    mastery: 1,
    keywords: ["Combat", "Arme"],
    range: "Personnelle ou contact allié (6 m)",
    area: "Une arme matérialisée",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0 par Raise), Durée (+5 min)",
    desc: "Matérialise une lance translucide de vent comprimé (VD 1g1, portée d'allonge). Si le manieur maîtrise la compétence Lances, il bénéficie d'une Augmentation Gratuite pour les manœuvres de Feinte ou d'Attaque Portée."
  },
  {
    id: "air-call-upon-wind",
    name: "Appel du Vent (Call Upon the Wind)",
    element: "Air",
    mastery: 2,
    keywords: ["Déplacement", "Protection"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+2 rounds par Raise)",
    desc: "Enveloppe le shugenja d'un coussin d'air porteur. Il ignore les chutes de n'importe quelle hauteur sans subir de dégâts et augmente sa vitesse de déplacement de 3 mètres par tour."
  },
  {
    id: "air-mists-illusion",
    name: "Les Brumes de l'Illusion (Mists of Illusion)",
    element: "Air",
    mastery: 2,
    keywords: ["Illusion"],
    range: "15 mètres",
    area: "Sphère de 6 mètres de rayon",
    duration: "5 Rounds",
    raises: "Durée (+2 rounds par Raise), Taille de la sphère",
    desc: "Crée un mirage visuel, sonore et olfactif complet. Les témoins doivent réussir un jet de Volonté opposé au jet d'incantation du prêtre pour percer l'illusion à jour."
  },
  {
    id: "air-way-deception",
    name: "L'Art de la Tromperie (Way of Deception)",
    element: "Air",
    mastery: 2,
    keywords: ["Illusion", "Social"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Minutes",
    raises: "Durée (+5 min par Raise)",
    desc: "Altière et trompeuse, l'illusion modifie les traits, les vêtements, la voix et les armoiries du lanceur pour imiter une personne de gabarit similaire. Accorde +2g2 aux jets de Comédie et Déguisement."
  },
  {
    id: "air-essence-air",
    name: "Essence d'Air (Essence of Air)",
    element: "Air",
    mastery: 3,
    keywords: ["Défense", "Transformation"],
    range: "Personnelle",
    area: "Le corps du lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round par Raise)",
    desc: "Le corps du shugenja devient gazeux et translucide. Il traverse les obstacles physiques solides d'une épaisseur maximale de 30 cm par tour et ne peut plus être blessé par les armes conventionnelles non magiques."
  },
  {
    id: "air-hearts-enemy",
    name: "L'Ennemi de ton Cœur (Your Heart's Enemy)",
    element: "Air",
    mastery: 3,
    keywords: ["Illusion", "Peur"],
    range: "8 mètres",
    area: "Une cible individuelle",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+3 m)",
    desc: "Extrait la plus vive terreur de l'esprit d'un adversaire pour la matérialiser devant ses yeux. Génère un effet de Peur 4 que la victime doit immédiatement confronter."
  },
  {
    id: "air-symbol-air",
    name: "Symbole d'Air (Symbol of Air)",
    element: "Air",
    mastery: 4,
    keywords: ["Sceau", "Protection"],
    range: "Contact",
    area: "Un seuil ou linteau",
    duration: "Permanente jusqu'au déclenchement",
    raises: "ND du jet de sauvegarde accru (+5 par Raise)",
    desc: "Grave un glyphe d'Air invisible. Tout intrus non invité franchissant l'arche doit battre un jet opposé de Terre contre l'Air du shugenja ou sombrer dans un sommeil léthargique continu d'une heure."
  },
  {
    id: "air-wrath-kaze",
    name: "La Colère de Kaze-no-Kami (Wrath of Kaze-no-Kami)",
    element: "Air",
    mastery: 5,
    keywords: ["Tempête", "Destruction"],
    range: "30 mètres",
    area: "Cylindre de 15 m de rayon",
    duration: "3 Rounds",
    raises: "Dégâts (+1g1 par 2 Raises)",
    desc: "Déclenche une tornade furieuse déracinant arbres et tentes. Inflige 5g3 dégâts contondants et projette violemment toutes les cibles au sol à plusieurs mètres de distance."
  },
  {
    id: "air-false-legion",
    name: "La Légion Fantôme (The False Legion)",
    element: "Air",
    mastery: 6,
    keywords: ["Illusion", "Bataille"],
    range: "Personnelle",
    area: "Rayon de 30 mètres",
    duration: "Concentration",
    raises: "+5 silhouettes illusoires par Raise",
    desc: "Matérialise une armée illusoire de guerriers (jusqu'à Anneau d'Air × 10 combattants) en mouvement, bruyante, criant des ordres et marchant au pas pour tromper généraux et éclaireurs adverses."
  },
  {
    id: "air-rise-air",
    name: "Éveil du Vent (Rise, Air)",
    element: "Air",
    mastery: 6,
    keywords: ["Invocation", "Majeur"],
    range: "9 mètres",
    area: "Un esprit colossal d'Air",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Invoque un Kami d'Air primordial humanoïde de 3 mètres de haut. L'esprit attaque avec Jiujutsu égal à la moitié de l'Air du prêtre et inflige des dégâts égaux à son Anneau d'Air en dés gardés (ex: 6g6)."
  },

  // =========================================================================
  // 3. SORTS DE LA TERRE (TSUCHI)
  // =========================================================================
  {
    id: "earth-armor-earth",
    name: "L'Armure de Terre (Armor of Earth)",
    element: "Terre",
    mastery: 1,
    keywords: ["Défense", "Protection"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Rounds",
    raises: "Durée (+2 rounds par Raise)",
    desc: "La chair s'imprègne de la dureté du granit. Confère une Réduction de dégâts égale à (Anneau de Terre + Rang d'École) contre toute attaque physique ou magique."
  },
  {
    id: "earth-touch",
    name: "Le Toucher de la Terre (Earth's Touch)",
    element: "Terre",
    mastery: 1,
    keywords: ["Vigueur", "Soutien"],
    range: "Contact",
    area: "Une cible vivante",
    duration: "1 Heure",
    raises: "Durée (+30 min), Cibles additionnelles (+1 par 2 Raises, max 3)",
    desc: "Renforce la constitution osseuse et le système immunitaire. Augmente de +1 l'un des Traits de Terre de la cible (Constitution ou Volonté) pour la durée du sort."
  },
  {
    id: "earth-courage-thunders",
    name: "Le Courage des Sept Tonnerres (Courage of the Seven Thunders)",
    element: "Terre",
    mastery: 1,
    keywords: ["Bravoure", "Volonté"],
    range: "Contact",
    area: "Une cible",
    duration: "10 Rounds",
    raises: "Cible supplémentaire (+1 par 2 Raises)",
    desc: "Insuffle l'esprit héroïque des premiers Thunders de l'Empire. La cible est totalement immunisée contre tous les effets de Peur de rang inférieur ou égal au rang de Terre du prêtre."
  },
  {
    id: "earth-tetsubo-earth",
    name: "Le Tetsubō de Granit (Tetsubo of Earth)",
    element: "Terre",
    mastery: 1,
    keywords: ["Combat", "Arme"],
    range: "Personnelle",
    area: "Une arme matérialisée",
    duration: "5 Rounds",
    raises: "Dégâts (+1g0 par Raise), Durée (+2 rounds)",
    desc: "Fait jaillir un gourdin tetsubō de roche compacte dans les mains du shugenja (VD 1g3, Arme Lourde). Ignore l'armure naturelle des créatures de l'Outremonde."
  },
  {
    id: "earth-grasp-earth",
    name: "L'Étreinte Tellurique (Grasp of Earth)",
    element: "Terre",
    mastery: 2,
    keywords: ["Contrôle", "Entrave"],
    range: "15 mètres",
    area: "Une cible",
    duration: "5 Rounds",
    raises: "Portée (+1,5 m), Cible supplémentaire (+1 par 2 Raises)",
    desc: "Des mains de pierre et de racines jaillissent du sol pour immobiliser la cible. Réduit son mouvement à 1 mètre par Action Simple. La cible doit réussir un test de Force brute contre Terre × 5 pour s'extraire."
  },
  {
    id: "earth-strength-crow",
    name: "La Force du Corbeau (Strength of the Crow)",
    element: "Terre",
    mastery: 2,
    keywords: ["Purification", "Outremonde"],
    range: "Contact",
    area: "Une cible",
    duration: "1 Heure",
    raises: "Durée (+1 heure), Cible additionnelle",
    desc: "Bénit la cible contre la corruption de Jigoku. Confère un bonus de +2g1 à tous ses jets d'Anneau de Terre pour résister à la Souillure de l'Outremonde."
  },
  {
    id: "earth-wall-earth",
    name: "Le Mur de Terre (Wall of Earth)",
    element: "Terre",
    mastery: 2,
    keywords: ["Obstacle", "Siège"],
    range: "15 mètres",
    area: "Mur de 3 m de haut sur 6 m de long",
    duration: "5 Rounds",
    raises: "Longueur (+3 m par Raise), Durée (+2 rounds)",
    desc: "Fait surgir un mur de pierre massive et de glaise du sol, bloquant les lignes de vue, offrant un couvert total aux archers et stoppant net les charges de cavalerie."
  },
  {
    id: "earth-kami-blessing",
    name: "Bénédiction du Kami de Terre (Earth Kami's Blessing)",
    element: "Terre",
    mastery: 3,
    keywords: ["Vitalité", "Bataille"],
    range: "Personnelle ou 6 mètres",
    area: "Une créature",
    duration: "10 Minutes",
    raises: "Durée (+1 minute par Raise)",
    desc: "Infuse la robustesse de la roche dans la physiologie du samouraï. Accorde +2 points de blessure à chaque Palier de Vitalité et donne +1g1 sur tous les jets utilisant l'Anneau de Terre."
  },
  {
    id: "earth-tomb-jade",
    name: "Le Tombeau de Jade (Tomb of Jade)",
    element: "Terre",
    mastery: 3,
    keywords: ["Attaque", "Jade"],
    range: "15 mètres",
    area: "Une créature souillée",
    duration: "Concentration",
    raises: "Dégâts accrus (+1g0 par Raise)",
    desc: "Des piliers de jade pur émergent du sol pour enserrer une abomination de l'Outremonde. La cible subit 4g2 dégâts de jade à chaque tour et se retrouve totalement paralysée tant que le prêtre maintient son souffle."
  },
  {
    id: "earth-armor-emperor",
    name: "L'Armure de l'Empereur (Armor of the Emperor)",
    element: "Terre",
    mastery: 4,
    keywords: ["Défense", "Absolu"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+2 rounds par Raise)",
    desc: "Couvre le corps d'une barrière tellurique dense. Chaque dé individuel de dégâts reçu d'une attaque ennemie (physique ou magique) voit son résultat réduit de la valeur du Rang d'École du shugenja."
  },
  {
    id: "earth-kami-strength",
    name: "La Vigueur des Montagnes (The Kami's Strength)",
    element: "Terre",
    mastery: 5,
    keywords: ["Bataille", "Puissance"],
    range: "9 mètres",
    area: "Une créature",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+3 m)",
    desc: "Confère une Réduction massive de 20 points à la cible et augmente sa Force brute d'une valeur égale à l'Anneau de Terre du prêtre. En contrepartie, la cible ne peut plus accomplir d'Actions de Mouvement Simples."
  },
  {
    id: "earth-prison-earth",
    name: "Prison de Terre (Prison of Earth)",
    element: "Terre",
    mastery: 6,
    keywords: ["Sceau", "Scellement"],
    range: "9 mètres",
    area: "Une créature de l'Outremonde",
    duration: "Permanente",
    raises: "+1g1 sur le jet opposé par Raise",
    desc: "Nécessite une gemme ou un réceptacle de jade précieux. Enferme définitivement l'âme et la substance d'un démon Oni ou d'un esprit souillé à l'intérieur de la gemme sacrée."
  },

  // =========================================================================
  // 4. SORTS DU FEU (HI)
  // =========================================================================
  {
    id: "fire-biting-steel",
    name: "La Morsure d'Acier (Biting Steel)",
    element: "Feu",
    mastery: 1,
    keywords: ["Combat", "Enchantement"],
    range: "Contact",
    area: "Une arme tranchante",
    duration: "5 Rounds",
    raises: "Dégâts (+1g0 par Raise)",
    desc: "La lame irradie d'une lueur écarlate incandescente. L'arme bénie ignore 3 points d'Armure ou de Réduction et inflige +1g0 dégâts de feu à chaque touche."
  },
  {
    id: "fire-envious-flames",
    name: "Flammes Jalouses (Envious Flames)",
    element: "Feu",
    mastery: 1,
    keywords: ["Attaque", "Destruction"],
    range: "9 mètres",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Un trait de feu vif frappe la cible sans déviation possible si elle est à portée, lui infligeant 2g2 blessures. Si la cible incantait un sort, le ND de son jet de concentration augmente de +10."
  },
  {
    id: "fire-never-alone",
    name: "Jamais Seul (Never Alone)",
    element: "Feu",
    mastery: 1,
    keywords: ["Bataille", "Ferveur"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+2 rounds par Raise)",
    desc: "Rappelle l'ardeur martiale des ancêtres guerriers. Confère au shugenja un bonus de +1g1 sur tous ses jets de compétences de combat Bugei."
  },
  {
    id: "fire-raging-forge",
    name: "La Forge Ardente (The Raging Forge)",
    element: "Feu",
    mastery: 1,
    keywords: ["Artisanat", "Réparation"],
    range: "Contact",
    area: "Une arme ou armure",
    duration: "Instantanée",
    raises: "Aucune",
    desc: "Les esprits du feu réparent instantanément une arme ou une armure émoussée ou faussée, effaçant ébréchures et fissures sans passer par l'atelier."
  },
  {
    id: "fire-fires-from-within",
    name: "Le Feu Intérieur (The Fires From Within)",
    element: "Feu",
    mastery: 2,
    keywords: ["Attaque", "Projectiles"],
    range: "30 mètres",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Cible supplémentaire (+1 cible par 2 Raises)",
    desc: "Projette un orbe de braise dense qui grossit en traversant l'air. Inflige des dégâts avec une valeur de dés gardés égale au Rang d'Anneau de Feu du prêtre."
  },
  {
    id: "fire-fury-osano-wo",
    name: "La Fureur d'Osano-Wo (Fury of Osano-Wo)",
    element: "Feu",
    mastery: 2,
    keywords: ["Attaque", "Tonnerre"],
    range: "30 mètres",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Dégâts (+1g0 par Raise), Portée (+10 m)",
    desc: "Invoque la foudre du Dieu des Tempêtes. Un éclair zèbre le ciel et foudroie la cible en lui infligeant 3g3 dégâts. Les témoins adjacents doivent tester leur Terre pour ne pas être assourdis."
  },
  {
    id: "fire-fist-osano-wo",
    name: "Le Poing d'Osano-Wo (The Fist of Osano-Wo)",
    element: "Feu",
    mastery: 3,
    keywords: ["Tonnerre", "Zone"],
    range: "15 mètres",
    area: "Rayon de 6 mètres",
    duration: "1 Round",
    raises: "Rayon d'effet (+3 m par Raise)",
    desc: "Une explosion de tonnerre et de flammes dévaste la zone ciblée. Toutes les structures subissent des dégâts lourds et les cibles vivantes subissent 4g3 dégâts de déflagration."
  },
  {
    id: "fire-symbol-fire",
    name: "Symbole de Feu (Symbol of Fire)",
    element: "Feu",
    mastery: 4,
    keywords: ["Sceau", "Piège"],
    range: "Contact",
    area: "Rayon de 3 mètres",
    duration: "Permanente jusqu'au déclenchement",
    raises: "Dégâts (+1g0 par Raise)",
    desc: "Un piège runique d'embrasement scellé sur un coffre ou une dalle. L'intrus doit réussir un jet d'Eau contre le Feu du shugenja sous peine d'être aveuglé et de subir 3g3 dégâts de brûlure."
  },
  {
    id: "fire-destructive-wave",
    name: "La Vague Destructrice (Destructive Wave)",
    element: "Feu",
    mastery: 5,
    keywords: ["Attaque", "Zone"],
    range: "Personnelle",
    area: "Rayon de 8 mètres autour du prêtre",
    duration: "Instantanée",
    raises: "Dégâts (+1g1 par 2 Raises)",
    desc: "Une marée de flammes aveuglantes se propage en cercle depuis le shugenja. Toutes les créatures prises dans le souffle (alliées comme ennemies) subissent 7g7 dégâts de feu. Seul le lanceur est épargné."
  },
  {
    id: "fire-wings-phoenix",
    name: "Les Ailes du Phénix (Wings of the Phoenix)",
    element: "Feu",
    mastery: 5,
    keywords: ["Voyage", "Vol"],
    range: "Personnelle",
    area: "Le corps du lanceur",
    duration: "10 Rounds",
    raises: "Aucune",
    desc: "Deux ailes immenses de feu pur jaillissent du dos du shugenja, lui permettant de voler à une vitesse prodigieuse égale à Eau × 20 en Action Simple sans toucher le sol."
  },
  {
    id: "fire-souls-blade",
    name: "La Lame de l'Âme (The Soul's Blade)",
    element: "Feu",
    mastery: 6,
    keywords: ["Combat", "Ultime"],
    range: "Contact",
    area: "Une arme de corps à corps",
    duration: "5 Rounds",
    raises: "Durée (+1 round par 3 Raises)",
    desc: "Imbue une arme de la quintessence du feu primordial. L'arme ignore complètement l'Invulnérabilité des démons et tout adversaire touché est automatiquement étourdi (Stunned) en plus des blessures."
  },

  // =========================================================================
  // 5. SORTS DE L'EAU (MIZU)
  // =========================================================================
  {
    id: "water-inner-peace",
    name: "La Voie de la Paix Intérieure (Path to Inner Peace)",
    element: "Eau",
    mastery: 1,
    keywords: ["Guérison"],
    range: "Contact",
    area: "Une cible vivante",
    duration: "Instantanée",
    raises: "Soins accrus (+1g1 par 2 Raises)",
    desc: "L'eau bienfaisante des esprits referme les chairs et apaise le sang. Rétablit un nombre de points de vie égal à (Rang d'Eau du lanceur + Rang de Théologie) g (Rang d'Eau)."
  },
  {
    id: "water-bo-water",
    name: "Le Bâton d'Eau (Bo of Water)",
    element: "Eau",
    mastery: 1,
    keywords: ["Combat", "Arme"],
    range: "Personnelle",
    area: "Un bâton Bō matérialisé",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0 par Raise)",
    desc: "Condense une colonne d'eau liquide rigide comme du fer poli (VD 1g2, Bâton). Accorde une Augmentation Gratuite pour la manœuvre de Renversement (Knockdown)."
  },
  {
    id: "water-reversal-fortunes",
    name: "Le Renversement de Fortune (Reversal of Fortunes)",
    element: "Eau",
    mastery: 1,
    keywords: ["Chance", "Soutien"],
    range: "3 mètres",
    area: "Un individu",
    duration: "3 Rounds",
    raises: "Durée (+1 round par Raise), Portée (+1,5 m)",
    desc: "Tirant parti de la nature changeante de l'eau, ce sort permet à la cible de relancer immédiatement n'importe quel jet de dé une fois par round et de conserver le meilleur résultat."
  },
  {
    id: "water-rejuvenating-vapors",
    name: "Les Vapeurs Régénératrices (Rejuvenating Vapors)",
    element: "Eau",
    mastery: 2,
    keywords: ["Guérison", "Vitalité"],
    range: "Contact",
    area: "Une cible",
    duration: "Instantanée",
    raises: "Cible supplémentaire (+1 par 2 Raises)",
    desc: "Disperse l'épuisement physique et mental. La cible est rafraîchie comme après une nuit entière de repos réparateur et dissipe tous les états de fatigue ou d'étourdissement."
  },
  {
    id: "water-silent-waters",
    name: "Eaux Silencieuses (Silent Waters)",
    element: "Eau",
    mastery: 3,
    keywords: ["Défense", "Déclenchement"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Jusqu'au déclenchement",
    raises: "Aucune",
    desc: "Permet de mémoriser et de stocker un second sort de Maîtrise 3 ou moins dans son corps. Ce second sort se déclenchera instantanément lors d'une condition physique prédéterminée (ex: tomber à terre, dégainer)."
  },
  {
    id: "water-walk-waves",
    name: "Marcher sur les Eaux (Walking Upon the Waves)",
    element: "Eau",
    mastery: 3,
    keywords: ["Déplacement"],
    range: "Contact",
    area: "Le lanceur ou 1 allié",
    duration: "10 Minutes",
    raises: "Cibles supplémentaires (+1 par Raise)",
    desc: "Permet de courir et manœuvrer à la surface de n'importe quel cours d'eau, lac ou mer déchaînée avec la même stabilité que sur une plaine pavée."
  },
  {
    id: "water-symbol-water",
    name: "Symbole d'Eau (Symbol of Water)",
    element: "Eau",
    mastery: 4,
    keywords: ["Sceau", "Peur"],
    range: "Contact",
    area: "Une porte ou coffre",
    duration: "Permanente",
    raises: "Peur accrue (+1 rang par Raise)",
    desc: "Rune sacrée d'effroi abyssal. Quiconque force le passage doit battre un jet opposé de Feu contre l'Eau du prêtre ou subir une panique incontrôlable équivalente à une Peur de niveau 7."
  },
  {
    id: "water-sweet-clarity",
    name: "La Douce Clarté de l'Eau (Water's Sweet Clarity)",
    element: "Eau",
    mastery: 6,
    keywords: ["Divination", "Omniscience"],
    range: "Personnelle",
    area: "Un bassin d'eau calme",
    duration: "Concentration",
    raises: "Clarté de vision temporelle",
    desc: "En observant les reflets d'une eau limpide, le devin peut scruter n'importe quel événement ou lieu distant de l'Empire en direct, ignorant toute barrière physique."
  },

  // =========================================================================
  // 6. SORTS DU VIDE (ISHIKEN-DO — EXCLUSIVITÉ PHÉNIX & TALENTS DU VIDE)
  // =========================================================================
  {
    id: "void-drawing-void",
    name: "Puiser dans le Vide (Drawing the Void)",
    element: "Vide",
    mastery: 1,
    keywords: ["Énergie", "Ishiken"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Instantanée",
    raises: "+1 point de Vide supplémentaire par 3 Raises",
    desc: "L'Ishiken puise directement dans le tissu cosmique pour régénérer son énergie spirituelle : il regagne immédiatement un nombre de points de Vide égal à son Rang d'École + 1."
  },
  {
    id: "void-flow-void",
    name: "Transmutation du Vide (Flow through the Void)",
    element: "Vide",
    mastery: 1,
    keywords: ["Altération"],
    range: "Contact",
    area: "0,03 m³ de matière élémentaire pure",
    duration: "Permanente",
    raises: "Volume doublé par Raise",
    desc: "Toutes choses étant une dans le Vide, le shugenja métamorphose un volume de matière pure (eau, terre, feu ou air) en n'importe quel autre élément élémentaire."
  },
  {
    id: "void-reach-void",
    name: "Toucher par le Vide (Reach Through the Void)",
    element: "Vide",
    mastery: 2,
    keywords: ["Télékinésie"],
    range: "15 mètres",
    area: "Objet jusqu'à 2,5 kg",
    duration: "Instantanée",
    raises: "Poids accru (+1 kg par 2 Raises), Portée (+5 m)",
    desc: "Manipule ou dérobe un objet distant sans contact physique en exploitant le néant invisible qui unit toute matière dans le monde."
  },
  {
    id: "void-false-whispers",
    name: "Faux Murmures (False Whispers)",
    element: "Vide",
    mastery: 2,
    keywords: ["Tromperie", "Perception"],
    range: "9 mètres",
    area: "Un individu",
    duration: "1 Minute",
    raises: "Durée (+1 min par Raise)",
    desc: "Injecte des pensées trompeuses dans le flux de conscience d'un adversaire, lui faisant croire que ses alliés complotent contre lui ou préparent une trahison."
  },
  {
    id: "void-ring-void",
    name: "L'Anneau du Vide (Ring of the Void)",
    element: "Vide",
    mastery: 6,
    keywords: ["Divin", "Révélation"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Concentration (rituel d'une heure)",
    raises: "Temps d'incantation réduit (-5 min par Raise)",
    desc: "Le plus puissant rituel d'Ishiken-dō. Ouvre une communion directe avec le Dragon Céleste du Vide pour obtenir la révélation sur une énigme existentielle liée au destin de l'Empire."
  },

  // =========================================================================
  // 7. KIHŌ DU TAO DE SHINSEI (MOINES & ASCÈTES)
  // =========================================================================
  {
    id: "kiho-cleansing-spirit",
    name: "Esprit Purificateur (Cleansing Spirit)",
    element: "Kiho",
    mastery: 4,
    keywords: ["Interne", "Terre"],
    range: "Personnelle",
    area: "Le métabolisme",
    duration: "Anneau de Terre en heures",
    raises: "Non applicable (activation par Vide)",
    desc: "Le flux de chi tellurique expulse les impuretés : accorde un nombre de dés supplémentaires égal à la moitié de l'Anneau de Terre sur tous les jets pour résister aux poisons et maladies."
  },
  {
    id: "kiho-heart-stone",
    name: "Cœur de Pierre (Heart of Stone)",
    element: "Kiho",
    mastery: 3,
    keywords: ["Kharmic", "Terre"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Anneau de Terre en rounds",
    raises: "Non applicable",
    desc: "Par une respiration concentrée, le moine acquiert la densité d'un menhir : il gagne une Réduction de dégâts égale au double de son Anneau de Terre."
  },
  {
    id: "kiho-earthen-fist",
    name: "Le Poing de Terre (Earthen Fist)",
    element: "Kiho",
    mastery: 3,
    keywords: ["Interne", "Terre"],
    range: "Personnelle",
    area: "Posture de combat",
    duration: "1 Jour ou jusqu'à utilisation",
    raises: "Non applicable",
    desc: "En posture Défense ou Défense Totale, si un ennemi manque son attaque contre le moine, celui-ci peut tenter un Désarmement au round suivant sans aucune Augmentation nécessaire."
  },
  {
    id: "kiho-fleeting-speed",
    name: "La Célérité Flamboyante (Fire's Fleeting Speed)",
    element: "Kiho",
    mastery: 4,
    keywords: ["Kharmic", "Feu"],
    range: "Personnelle",
    area: "Déplacement",
    duration: "Anneau de Feu en rounds",
    raises: "Non applicable",
    desc: "Augmente la distance de déplacement du moine de +1,5 mètre pour chaque Action de Mouvement effectuée durant son tour."
  },
  {
    id: "kiho-flame-fist",
    name: "Le Poing de Flammes (Flame Fist)",
    element: "Kiho",
    mastery: 3,
    keywords: ["Martial", "Atemi", "Feu"],
    range: "Contact (Mains nues)",
    area: "Une cible frappée",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "En combinant son chi de Feu avec la frappe à mains nues, le moine perturbe le système nerveux adverse : la victime est désorientée et subit un malus de -1g1 sur tous ses jets au tour suivant."
  },
  {
    id: "kiho-dance-flames",
    name: "Danse des Flammes (Dance of the Flames)",
    element: "Kiho",
    mastery: 6,
    keywords: ["Martial", "Feu"],
    range: "Personnelle",
    area: "Attaques nues",
    duration: "Anneau de Feu en rounds",
    raises: "Non applicable",
    desc: "La vélocité du Feu anime les membres du moine : toutes ses attaques au corps à corps à mains nues deviennent des Actions Simples au lieu d'Actions Complexes."
  },
  {
    id: "kiho-slap-wave",
    name: "La Gifle de la Vague (Slap the Wave)",
    element: "Kiho",
    mastery: 7,
    keywords: ["Mystique", "Eau"],
    range: "Cône frontal (Eau × 1,5 m)",
    area: "Tous les assaillants",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "En claquant ses paumes nues avec un cri spirituel retentissant (kiai), le moine projette une onde de choc aquatique qui assomme et étourdit (Dazed) tous les ennemis à portée."
  },
  {
    id: "kiho-touch-void-dragon",
    name: "Toucher le Dragon du Vide (Touch the Void Dragon)",
    element: "Kiho",
    mastery: 4,
    keywords: ["Interne", "Vide"],
    range: "Personnelle",
    area: "Le flux de chi",
    duration: "1 Heure",
    raises: "Non applicable",
    desc: "Harmonise le chi intérieur avec le biome ambiant : l'un des Anneaux élémentaires du moine (Terre en montagne, Eau près des mers, Air en plaine) gagne temporairement +1 rang effectif."
  },

  // =========================================================================
  // 8. MAHŌ — LA MAGIE DU SANG INTERDITE (Livre de Base, pp. 268-273)
  // =========================================================================
  {
    id: "maho-legacy-dark-one",
    name: "L'Héritage du Prince Sombre (Legacy of the Dark One)",
    element: "Maho",
    mastery: 1,
    keywords: ["Corruption", "Air"],
    range: "30 mètres",
    area: "Une cible vivante",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Cibles (+1 par Raise)",
    desc: "Invoque des démons insidieux (kansen) qui enserrent l'âme de la victime. La cible perd immédiatement 1 point de Vide qu'elle est incapable de regagner pour toute la durée du sort."
  },
  {
    id: "maho-sinful-dreams",
    name: "Rêves Sacrilèges (Sinful Dreams)",
    element: "Maho",
    mastery: 1,
    keywords: ["Corruption", "Air", "Esprit"],
    range: "90 mètres",
    area: "Une cible endormie",
    duration: "8 Heures",
    raises: "Portée accrue",
    desc: "Plonge le sommeil de la victime dans des cauchemars répugnants où elle s'imagine massacrer ses proches. La cible ne récupère aucun point de Vide ni de vitalité durant sa nuit et gagne 1 point de Souillure."
  },
  {
    id: "maho-blood-darkness",
    name: "Sang et Ténèbres (Blood and Darkness)",
    element: "Maho",
    mastery: 1,
    keywords: ["Ténèbres", "Sang"],
    range: "Personnelle",
    area: "Rayon de 1 m par blessure sacrifiée",
    duration: "10 Rounds",
    raises: "Aucune",
    desc: "En s'entaillant la chair, le maho-tsukai projette un dôme d'obscurité poisseuse couleur sang impénétrable aux regards et aux torches ordinaires."
  },
  {
    id: "maho-blood-rite",
    name: "Le Sacrement du Sang (Blood Rite)",
    element: "Maho",
    mastery: 1,
    keywords: ["Vitalité", "Maho"],
    range: "Contact",
    area: "Une cible",
    duration: "Permanente",
    raises: "Soins accrus",
    desc: "Transfère la force vitale d'une victime sacrificielle vers le lanceur pour refermer ses propres plaies et augmenter temporairement sa Force brute au mépris de son âme."
  },
  {
    id: "maho-dark-wings",
    name: "Ailes Démoniaques (Dark Wings)",
    element: "Maho",
    mastery: 2,
    keywords: ["Mutation", "Vol"],
    range: "Personnelle",
    area: "Le corps du sorcier",
    duration: "5 Minutes",
    raises: "Durée (+2 min)",
    desc: "Deux ailes de chauve-souris écailleuses et membraneuses déchirent le dos du maho-tsukai, lui permettant de voler à une vitesse doublée et de frapper ses ennemis à mains nues."
  },
  {
    id: "maho-create-vortex",
    name: "Créer un Vortex Élémentaire (Create Elemental Vortex)",
    element: "Maho",
    mastery: 5,
    keywords: ["Invocation", "Jigoku"],
    range: "30 mètres",
    area: "Sphère de 30 mètres",
    duration: "Instantanée",
    raises: "Stabilité du portail",
    desc: "Ouvre une brèche béante entre Ningen-dō et Jigoku, permettant aux démons oni et aux horreurs souillées de franchir le gouffre pour semer la désolation en plein cœur de l'Empire."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_DATA = SORTS_DATA;
}
