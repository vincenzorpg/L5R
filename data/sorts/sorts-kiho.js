const SORTS_KIHO = [
  // ==========================================
  // --- KIHO D'AIR ---
  // ==========================================
  {
    id: "kiho-air-3-air-fist",
    name: "Poing d'Air (Air Fist)",
    element: "Air",
    mastery: 3,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "1 Jour maximum",
    raises: "Non applicable",
    desc: "Canalise la vélocité du vent dans vos frappes. Tant que ce Kihō est actif et que vous n'effectuez que des attaques à mains nues, votre score d'Initiative augmente de +5. Si vous effectuez un autre type d'attaque, le Kihō prend fin immédiatement. Les dégâts de toutes vos attaques à mains nues sont toutefois réduits d'une valeur égale à votre Anneau d'Air."
  },
  {
    id: "kiho-air-3-riding-clouds",
    name: "Chevaucher les Nuages (Riding the Clouds)",
    element: "Air",
    mastery: 3,
    keywords: ["Mystique"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Jusqu'à utilisation",
    raises: "Non applicable",
    desc: "Allège votre corps au point de bondir sur des distances spectaculaires. Tant que ce Kihō est actif, vous pouvez effectuer une Action de Mouvement Simple pour réaliser un saut d'une distance maximale égale à (Anneau d'Air × 3 mètres / × 10 pieds). L'effet est consommé et prend fin dès que vous effectuez ce saut."
  },
  {
    id: "kiho-air-4-great-silence",
    name: "Le Grand Silence (The Great Silence)",
    element: "Air",
    mastery: 4,
    keywords: ["Mystique", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "Anneau d'Air en rounds",
    raises: "Non applicable",
    desc: "Frappe chirurgicale perturbant la circulation du chi vocal. Doit être délivré par une attaque atemi. En cas de succès, la cible est frappée de mutisme total et devient incapable de parler pendant un nombre de rounds égal à votre Anneau d'Air (empêchant notamment le lancement de sorts avec prière orale)."
  },
  {
    id: "kiho-air-4-soul-four-winds",
    name: "L'Âme des Quatre Vents (Soul of the Four Winds)",
    element: "Air",
    mastery: 4,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Anneau d'Air en rounds",
    raises: "Non applicable",
    desc: "Accroît vos réflexes d'esquive en harmonisant vos mouvements avec le vent. Tant que ce Kihō est actif, votre ND d'Armure augmente d'une valeur égale à votre Rang de Statut Global (Insight Rank) + votre Anneau d'Air."
  },
  {
    id: "kiho-air-5-harmony-mind",
    name: "Harmonie de l'Esprit (Harmony of the Mind)",
    element: "Air",
    mastery: 5,
    keywords: ["Mystique"],
    range: "Ligne de vue",
    area: "Une cible en vue",
    duration: "Instantanée",
    raises: "+1 information par Augmentation",
    desc: "En réussissant un jet opposé d'Air contre une cible en ligne de vue, vous découvrez au choix : son Anneau le plus élevé ou le plus bas, son plus haut rang de Compétence, ou son Avantage ou Désavantage spirituel au coût le plus élevé. Utilisable un nombre de fois par jour égal à votre Anneau d'Air."
  },
  {
    id: "kiho-air-5-way-willow",
    name: "La Voie du Saule (Way of the Willow)",
    element: "Air",
    mastery: 5,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "1 Jour ou jusqu'à utilisation",
    raises: "Non applicable",
    desc: "Permet de percevoir et d'intercepter les attaques ennemies avec la célérité de la brise. Si vous n'avez pas encore agi ce round, vous pouvez dépenser 1 point de Vide pour interrompre immédiatement un adversaire qui déclare une attaque de mêlée contre vous. Vous effectuez alors au choix : une Action de Mouvement pour vous éloigner, OU une attaque à mains nues contre lui. L'effet prend fin immédiatement après."
  },
  {
    id: "kiho-air-6-flee-darkness",
    name: "Fuir les Ténèbres (Flee the Darkness)",
    element: "Air",
    mastery: 6,
    keywords: ["Kharmic"],
    range: "Personnelle",
    area: "L'âme du moine",
    duration: "Anneau d'Air en rounds",
    raises: "Non applicable",
    desc: "Préserve l'esprit de toute corruption spirituelle. Vous devenez immunisé contre l'influence de la Souillure des Terres d'Ombre (et des Ténèbres Trompeuses) pendant un nombre de rounds égal à votre Anneau d'Air. Vous ne pouvez acquérir de Souillure et ignorez tous les malus (et bénéfices) d'une éventuelle Souillure déjà présente. Toute action volontaire générant la Souillure (comme lancer du mahō) annule immédiatement ce Kihō."
  },
  {
    id: "kiho-air-7-steal-air-dragon",
    name: "Dérober le Dragon d'Air (Steal the Air Dragon)",
    element: "Air",
    mastery: 7,
    keywords: ["Kharmic"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Insight Rank en minutes",
    raises: "Non applicable",
    desc: "En repliant votre chi vers l'intérieur, vous vous fondez dans l'ambiance et détournez l'attention. Vous gagnez un bonus de dés lancés et gardés égal à votre Anneau d'Air (+Air g Air) sur tous vos jets de Discrétion (Stealth)."
  },

  // ==========================================
  // --- KIHO DE TERRE ---
  // ==========================================
  {
    id: "kiho-earth-3-earthen-fist",
    name: "Poing de Terre (Earthen Fist)",
    element: "Terre",
    mastery: 3,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Posture de combat",
    duration: "1 Jour ou jusqu'à utilisation",
    raises: "Non applicable",
    desc: "Tant que ce Kihō est actif, vous ne pouvez adopter que les Postures Défense ou Défense Totale. Si un assaillant tente une attaque de mêlée contre vous et rate, vous pouvez, lors de votre tour suivant, tenter la manœuvre Désarmement contre lui sans appeler la moindre Augmentation et sans subir les restrictions habituelles de votre posture. L'effet du Kihō se dissipe immédiatement après."
  },
  {
    id: "kiho-earth-4-cleansing-spirit",
    name: "Esprit Purificateur (Cleansing Spirit)",
    element: "Terre",
    mastery: 4,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Anneau de Terre en heures",
    raises: "Non applicable",
    desc: "À l'image de la pluie purifiant le flanc de la montagne, ce Kihō élimine les toxines internes. Vous lancez un nombre de dés supplémentaires égal à la moitié de votre Anneau de Terre (arrondie à l'inférieur) sur tous vos jets effectués pour résister aux effets des poisons ou des maladies."
  },
  {
    id: "kiho-earth-4-speed-mountains",
    name: "Vitesse des Montagnes (Speed of the Mountains)",
    element: "Terre",
    mastery: 4,
    keywords: ["Kharmic", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "2 × Anneau de Terre en rounds",
    raises: "Non applicable",
    desc: "Délivré par une frappe atemi. Rend le chi de Terre de la cible prédominant au détriment de sa mobilité : l'Anneau d'Eau de la victime est considéré comme réduit de 2 Rangs pour calculer les distances qu'elle peut franchir lors de ses Actions de Mouvement."
  },
  {
    id: "kiho-earth-4-way-earth",
    name: "La Voie de la Terre (Way of the Earth)",
    element: "Terre",
    mastery: 4,
    keywords: ["Martial"],
    range: "Personnelle",
    area: "En lutte (Grapple)",
    duration: "Anneau de Terre en minutes",
    raises: "Non applicable",
    desc: "Durcit vos articulations et vos muscles pour broyer les corps en corps-à-corps. Tout adversaire engagé en Lutte (Grapple) avec vous subit un nombre de Blessures égal à votre Anneau de Terre à chaque étape des Réactions, peu importe qui contrôle la lutte."
  },
  {
    id: "kiho-earth-5-embrace-stone",
    name: "Étreindre la Pierre (Embrace the Stone)",
    element: "Terre",
    mastery: 5,
    keywords: ["Mystique"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Anneau de Terre en rounds",
    raises: "Non applicable",
    desc: "Votre chair acquiert la dureté du granit. Vous gagnez une Réduction de dégâts égale au double de votre Anneau de Terre (2 × Terre). Cette Réduction se cumule avec toutes les autres sources de réduction (sorts, armures, techniques)."
  },
  {
    id: "kiho-earth-5-grasp-earth-dragon",
    name: "Saisir le Dragon de Terre (Grasp the Earth Dragon)",
    element: "Terre",
    mastery: 5,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Résistance physique",
    duration: "Anneau de Terre en rounds",
    raises: "Non applicable",
    desc: "Dissocie votre esprit de la souffrance physique. Les pénalités au ND infligées par tous vos Rangs de Blessures sont réduites d'une valeur égale à votre Anneau de Terre. De plus, vous pouvez continuer à effectuer des Actions Simples au Rang de Blessure À Terre (Down)."
  },
  {
    id: "kiho-earth-5-rest-my-brother",
    name: "Repose, mon Frère (Rest, My Brother)",
    element: "Terre",
    mastery: 5,
    keywords: ["Martial", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible souillée",
    duration: "Anneau de Terre en rounds",
    raises: "Non applicable",
    desc: "Inverse le chi d'un être souillé pour retourner sa corruption contre lui. Inflige des dégâts à mains nues normaux + des dés non gardés de dégâts (+Xg0) égaux au Rang de Souillure de la cible. Si la cible est un humain ou un être autrefois pur, elle perd tous les bénéfices conférés par la Souillure et retrouve sa pleine lucidité mentale pour la durée."
  },
  {
    id: "kiho-earth-5-root-mountain",
    name: "Enraciner la Montagne (Root the Mountain)",
    element: "Terre",
    mastery: 5,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "Jusqu'au déplacement",
    raises: "Non applicable",
    desc: "Vous ancre fermement au sol comme un roc immuable. Les tentatives d'utiliser la manœuvre Renversement (Knockdown) contre vous nécessitent 2 Augmentations supplémentaires. Toute tentative visant à vous déplacer contre votre gré requiert un jet opposé de Terre. Vous ne pouvez effectuer aucune Action de Mouvement sans dissiper ce Kihō."
  },

  // ==========================================
  // --- KIHO DE FEU ---
  // ==========================================
  {
    id: "kiho-fire-3-flame-fist",
    name: "Poing de Flammes (Flame Fist)",
    element: "Feu",
    mastery: 3,
    keywords: ["Martial", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "Anneau de Feu en rounds",
    raises: "Non applicable",
    desc: "Mêle votre chi ardent à celui de l'adversaire par une frappe atemi pour embraser son système nerveux. La victime subit un malus au ND de toutes ses actions égal à trois fois votre Anneau de Feu (3 × Feu)."
  },
  {
    id: "kiho-fire-4-body-anvil",
    name: "Le Corps est une Enclume (The Body is an Anvil)",
    element: "Feu",
    mastery: 4,
    keywords: ["Mystique"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "2 × Anneau de Feu en rounds",
    raises: "Non applicable",
    desc: "Votre épiderme devient brûlant comme du métal chauffé à blanc. Quiconque entre en contact physique avec vous, vous prend pour cible avec une attaque à mains nues ou est frappé par votre attaque à mains nues subit un nombre de Blessures égal à votre Anneau de Feu."
  },
  {
    id: "kiho-fire-4-fires-fleeting-speed",
    name: "Vitesse Fugace du Feu (Fire's Fleeting Speed)",
    element: "Feu",
    mastery: 4,
    keywords: ["Kharmic"],
    range: "Personnelle",
    area: "Déplacement",
    duration: "Anneau de Feu en rounds",
    raises: "Non applicable",
    desc: "Insuffle l'impétuosité du brasier dans vos jambes. La distance que vous pouvez franchir lors de n'importe quelle Action de Mouvement augmente de +1,5 mètre (+5 pieds)."
  },
  {
    id: "kiho-fire-5-unbalance-mind",
    name: "Déséquilibrer l'Esprit (Unbalance the Mind)",
    element: "Feu",
    mastery: 5,
    keywords: ["Mystique", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "1 Round",
    raises: "Non applicable",
    desc: "Perturbe le chi de Feu cérébral de l'adversaire via une frappe atemi précise. La victime acquiert immédiatement l'état Étourdi (Dazed)."
  },
  {
    id: "kiho-fire-6-channel-fire-dragon",
    name: "Canaliser le Dragon de Feu (Channel the Fire Dragon)",
    element: "Feu",
    mastery: 6,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Résistance thermique",
    duration: "1 Jour",
    raises: "Non applicable",
    desc: "Harmonise votre organisme avec les extrêmes thermiques. Tous les dégâts que vous subissez provenant de la chaleur, des flammes ou du froid extrême (y compris les sorts élémentaires et autres Kihō) sont réduits de -2g2."
  },
  {
    id: "kiho-fire-6-dance-flames",
    name: "Danse des Flammes (Dance of the Flames)",
    element: "Feu",
    mastery: 6,
    keywords: ["Martial"],
    range: "Personnelle",
    area: "Attaques à mains nues",
    duration: "Spéciale",
    raises: "Non applicable",
    desc: "Confère une cadence martiale frénétique : vous pouvez porter vos attaques à mains nues sous forme d'Actions Simples au lieu d'Actions Complexes. Vous devez obligatoirement porter une attaque à mains nues contre un adversaire à chaque round, faute de quoi les effets du Kihō prennent fin immédiatement."
  },
  {
    id: "kiho-fire-7-falling-star-strike",
    name: "Frappe de l'Étoile Filante (Falling Star Strike)",
    element: "Feu",
    mastery: 7,
    keywords: ["Martial", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "Instantanée / Anneau de Feu en heures",
    raises: "Non applicable",
    desc: "Vos poings s'embrasent d'une fureur cosmique. Ne peut être activé qu'en dépensant 1 point de Vide (jets de Méditation interdits) et nécessite d'appeler 2 Augmentations sur l'attaque. Inflige les dégâts normaux à mains nues + une VD additionnelle égale à (Feu g Feu). De plus, en remportant un jet opposé de Feu, vous rendez la cible Aveuglée (Blind) pendant un nombre d'heures égal à votre Anneau de Feu."
  },

  // ==========================================
  // --- KIHO D'EAU ---
  // ==========================================
  {
    id: "kiho-water-3-buoyed-kami",
    name: "Porté par les Kami (Buoyed by the Kami)",
    element: "Eau",
    mastery: 3,
    keywords: ["Mystique"],
    range: "Personnelle",
    area: "Déplacement sur liquide",
    duration: "5 Minutes maximum",
    raises: "Non applicable",
    desc: "Permet de courir et marcher sur l'eau comme sur de la terre ferme. L'effet n'est maintenu que tant que vous continuez à effectuer des Actions de Mouvement Simples à chaque round."
  },
  {
    id: "kiho-water-3-ride-water-dragon",
    name: "Chevaucher le Dragon d'Eau (Ride the Water Dragon)",
    element: "Eau",
    mastery: 3,
    keywords: ["Kharmic"],
    range: "Personnelle",
    area: "Régénération",
    duration: "Insight Rank en rounds",
    raises: "Non applicable",
    desc: "Canalise le pouvoir vivifiant de l'océan dans vos chairs. Pendant toute la durée du Kihō, vous récupérez un nombre de Blessures égal à votre Anneau d'Eau à chaque étape des Réactions du round."
  },
  {
    id: "kiho-water-4-chi-protection",
    name: "Protection du Chi (Chi Protection)",
    element: "Eau",
    mastery: 4,
    keywords: ["Martial", "Atemi"],
    range: "Contact (Frappe atemi)",
    area: "Une cible touchée (allié ou ennemi)",
    duration: "Insight Rank en rounds",
    raises: "Non applicable",
    desc: "Rétablit le flux vital d'un corps blessé. Doit être activé en dépensant 1 point de Vide immédiatement après avoir réussi une frappe atemi sur une cible (allié consentant ou adversaire). Le sujet regagne immédiatement un nombre de Blessures égal à votre Anneau d'Eau, puis à nouveau au début de votre tour à chaque round suivant pendant un nombre de rounds égal à votre Insight Rank. Ne peut pas être utilisé sur soi-même."
  },
  {
    id: "kiho-water-4-waves-all-things",
    name: "Des Vagues en Toute Chose (Waves in All Things)",
    element: "Eau",
    mastery: 4,
    keywords: ["Mystique"],
    range: "Anneau d'Eau × 3 mètres (× 10 pieds)",
    area: "Une cible en contact avec la surface",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "Transmet une onde d'impact à distance. Vous portez une attaque à mains nues en frappant le sol ou une étendue d'eau calme : la force du coup frappe un adversaire situé à portée qui est en contact avec la même surface (eau ou terre). Le coup produit une onde évidente qui révèle votre position si vous étiez dissimulé."
  },
  {
    id: "kiho-water-5-as-breakers",
    name: "Semblable aux Brisants (As the Breakers)",
    element: "Eau",
    mastery: 5,
    keywords: ["Kharmic", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "1 Round",
    raises: "Non applicable",
    desc: "Frappe atemi qui brise le rythme de l'adversaire. La cible perd une Action Simple lors de son prochain tour. Ne peut cibler qu'un adversaire n'ayant pas encore agi durant le round en cours, et ne peut affecter une même cible qu'une seule fois par escarmouche."
  },
  {
    id: "kiho-water-6-partaking-waves",
    name: "Partager les Vagues (Partaking the Waves)",
    element: "Eau",
    mastery: 6,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le corps du moine",
    duration: "2 × Anneau d'Eau en rounds",
    raises: "Non applicable",
    desc: "Votre corps ondoie et cède souplement sous la force des assauts. Vous gagnez une Réduction de dégâts égale à votre Anneau d'Eau. Cette Réduction se cumule avec toutes les autres sources de réduction."
  },
  {
    id: "kiho-water-7-freezing-lifeblood",
    name: "Geler le Sang Vital (Freezing the Lifeblood)",
    element: "Eau",
    mastery: 7,
    keywords: ["Martial", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "Insight Rank en rounds",
    raises: "Non applicable",
    desc: "Frappe atemi paralysante interrompant la circulation des fluides corporels. La victime est totalement paralysée : elle subit l'état Assommé (Stunned), ne peut entreprendre d'Actions de Mouvement et ne peut plus bouger par ses propres moyens."
  },
  {
    id: "kiho-water-7-slap-wave",
    name: "Claque de la Vague (Slap the Wave)",
    element: "Eau",
    mastery: 7,
    keywords: ["Mystique"],
    range: "Anneau d'Eau × 1,5 mètre (× 5 pieds)",
    area: "Cône frontal",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "Déclenche une onde de choc semblable à un tsunami miniature. Nécessite de dépenser obligatoirement 1 point de Vide (pas de jet de Méditation), de frapper dans vos mains et de pousser un puissant kiai. Toutes les créatures situées dans votre arc frontal à portée doivent réussir un jet opposé d'Eau contre vous ou devenir Étourdies (Dazed)."
  },

  // ==========================================
  // --- KIHO DE VIDE ---
  // ==========================================
  {
    id: "kiho-void-3-song-world",
    name: "Le Chant du Monde (Song of the World)",
    element: "Vide",
    mastery: 3,
    keywords: ["Kharmic"],
    range: "15 mètres (50 pieds)",
    area: "Un adversaire à portée",
    duration: "Le combat en cours",
    raises: "Non applicable",
    desc: "En écoutant le chant du cosmos, vous anticipez les mouvements adverses. Vous devez cibler un adversaire à portée et réussir un jet opposé de Vide contre lui : en cas de succès, son score d'Initiative est réduit de 5 et le vôtre augmente d'autant (+5)."
  },
  {
    id: "kiho-void-3-to-last-breath",
    name: "Jusqu'au Dernier Souffle (To the Last Breath)",
    element: "Vide",
    mastery: 3,
    keywords: ["Kharmic"],
    range: "6 mètres (20 pieds)",
    area: "Un individu désigné",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "Par une exhalaison concentrée, vous libérez votre énergie dans l'univers au profit d'un allié. Un individu choisi à portée gagne 1 point de Vide au début de son prochain tour. Une même personne ne peut bénéficier de ce Kihō plus de deux fois par jour."
  },
  {
    id: "kiho-void-4-banish-all-shadows",
    name: "Bannir Toutes les Ombres (Banish All Shadows)",
    element: "Vide",
    mastery: 4,
    keywords: ["Kharmic", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "Frappe atemi purificatrice. Rétablit l'harmonie du chi de la cible pour dissiper les états mentaux altérés ou les illusions surnaturelles qui l'oppressent."
  },
  {
    id: "kiho-void-4-touch-void-dragon",
    name: "Toucher le Dragon du Vide (Touch the Void Dragon)",
    element: "Vide",
    mastery: 4,
    keywords: ["Interne"],
    range: "Personnelle",
    area: "Le flux de chi",
    duration: "1 Heure",
    raises: "Non applicable",
    desc: "Harmonise votre chi avec l'Élément dominant du milieu naturel environnant : l'un de vos Anneaux élémentaires et ses deux Traits associés augmentent de +1 Rang effectif. La montagne augmente la Terre, le rivage augmente l'Eau, les plaines augmentent l'Air, le désert ou une zone volcanique augmentent le Feu."
  },
  {
    id: "kiho-void-4-void-fist",
    name: "Poing du Vide (Void Fist)",
    element: "Vide",
    mastery: 4,
    keywords: ["Martial", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Un ennemi touché",
    duration: "Instantanée",
    raises: "Non applicable",
    desc: "Utilise le corps adverse comme un pont avec le Vide cosmique. Vous devez déclarer 1 Augmentation sur votre attaque à mains nues pour activer ce Kihō. La frappe n'inflige aucune blessure physique, mais vous fait récupérer immédiatement 2 points de Vide dépensés. Ne fonctionne que sur des ennemis et n'a aucun effet sur les cibles ne possédant pas de points de Vide."
  },
  {
    id: "kiho-void-5-eight-directions-awareness",
    name: "Conscience des Huit Directions (Eight Directions Awareness)",
    element: "Vide",
    mastery: 5,
    keywords: ["Mystique"],
    range: "Anneau de Vide × 3 mètres (× 10 pieds)",
    area: "Zone circulaire autour du moine",
    duration: "Anneau de Vide en rounds",
    raises: "Non applicable",
    desc: "Harmonie omnidirectionnelle absolue : vous percevez immédiatement la position exacte de tous les êtres vivants dans la zone. Vous détectez également tout objet ou individu dissimulé intentionnellement (portes secrètes, compartiments dérobés, objets enterrés ou pièges)."
  },
  {
    id: "kiho-void-5-silent-solace",
    name: "Consolation Silencieuse (Silent Solace)",
    element: "Vide",
    mastery: 5,
    keywords: ["Kharmic", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Un lanceur de sorts touché",
    duration: "Anneau de Vide en rounds",
    raises: "Non applicable",
    desc: "Frappe nerveuse perturbant le lien d'un prêtre avec les éléments. Un shugenja frappé par cette attaque atemi doit désormais dépenser deux emplacements de sorts pour pouvoir lancer un seul sort."
  },
  {
    id: "kiho-void-8-spin-kharmic-wheel",
    name: "Tourner la Roue Karmique (Spin the Kharmic Wheel)",
    element: "Vide",
    mastery: 8,
    keywords: ["Kharmic", "Atemi"],
    range: "Contact (Frappe à mains nues)",
    area: "Une cible touchée",
    duration: "Permanente",
    raises: "Non applicable",
    desc: "Le Kihō ultime des grands maîtres de la Confrérie. Doit être délivré par une attaque à mains nues et consume l'intégralité de vos points de Vide restants. La cible perd un de ses Désavantages (Social, Spirituel ou Mental) déterminé aléatoirement et en gagne immédiatement un nouveau de valeur équivalente (tiré au sort ou choisi par le MJ pour servir l'intrigue)."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_KIHO = SORTS_KIHO;
}
