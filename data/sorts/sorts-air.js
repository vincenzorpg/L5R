/**
 * data/sorts-air-data.js — L5R 4e Édition
 * Recueil exhaustif et conforme au Livre de Base (pages 167 à 173).
 */

const SORTS_AIR = [
  // =========================================================================
  // NIVEAU DE MAÎTRISE 1 (10 sorts officiels)
  // =========================================================================
  {
    id: "air-1-blessed-wind",
    name: "Le Vent Bienveillant (Blessed Wind)",
    element: "Air",
    mastery: 1,
    keywords: ["Défense"],
    range: "Personnelle",
    area: "Rayon de 3 m (10') autour du lanceur",
    duration: "Concentration",
    raises: "Spéciale (cibler autrui avec 3 Augmentations)",
    desc: "Vous invoquez une aura tourbillonnante qui dévie flèches et projectiles. Tant que vous maintenez votre concentration, ce sort ajoute +15 à votre ND d'Armure contre toutes les attaques à distance non magiques."
  },
  {
    id: "air-1-by-light-moon",
    name: "À la Lumière de la Lune (By the Light of the Moon)",
    element: "Air",
    mastery: 1,
    keywords: [],
    range: "Personnelle",
    area: "Rayon de 6 m (20') autour du lanceur",
    duration: "1 Minute",
    raises: "Zone (+1,5 m / +5' de rayon), Durée (+1 minute)",
    desc: "Les kami révèlent ce qui est dissimulé. Tous les objets cachés par des moyens non magiques (compartiments secrets, trappes dérobées, armes dissimulées, etc.) apparaissent entourés d'un contour faiblement lumineux visible uniquement par vous."
  },
  {
    id: "air-1-cloak-night",
    name: "Manteau de la Nuit (Cloak of Night)",
    element: "Air",
    mastery: 1,
    keywords: ["Illusion"],
    range: "Contact",
    area: "Un objet inanimé",
    duration: "1 Heure",
    raises: "Durée (+1 heure)",
    desc: "Enveloppe un objet inanimé de taille inférieure à la vôtre pour le rendre totalement invisible à l'œil nu. Les sorts de détection magique de Niveau de Maîtrise supérieur le perçoivent automatiquement ; les sorts de Maîtrise égale nécessitent un jet opposé d'Air. L'objet reste physiquement tangible, audible et odorant."
  },
  {
    id: "air-1-legacy-kaze",
    name: "L'Héritage de Kaze-no-Kami (Legacy of Kaze-no-Kami)",
    element: "Air",
    mastery: 1,
    keywords: ["Artisanat"],
    range: "Rang d'École × 15 km (10 miles)",
    area: "Un individu connu à portée",
    duration: "Spéciale",
    raises: "Zone (+1 individu), Portée (+15 km / +10 miles)",
    desc: "Les esprits du vent s'incarnent sous la forme d'un oiseau d'apparence normale pour porter un message parlé (jusqu'à une minute de parole). Si l'oiseau subit le moindre dégât, il se dissipe immédiatement et le sort prend fin."
  },
  {
    id: "air-1-natures-touch",
    name: "Le Toucher de la Nature (Nature's Touch)",
    element: "Air",
    mastery: 1,
    keywords: [],
    range: "3 mètres (10')",
    area: "Une créature",
    duration: "Spéciale",
    raises: "Portée (+3 m / +10')",
    desc: "Permet de parler à un animal naturel et de s'assurer qu'il comprend ce que vous dites (sans effet sur les bêtes de l'Outremonde ou d'autres plans). Ne garantit ni amitié ni obéissance. Dure tant que vous maintenez votre entière attention sur l'animal et continuez à lui parler."
  },
  {
    id: "air-1-tempest-air",
    name: "Tempête d'Air (Tempest of Air)",
    element: "Air",
    mastery: 1,
    keywords: ["Tonnerre"],
    range: "Personnelle",
    area: "Cône de 22,5 m (75') de long sur 4,5 m (15') de large à son extrémité",
    duration: "Instantanée",
    raises: "Zone (+1,5 m en largeur), Dégâts (+1g0), Portée (+1,5 m en longueur), Spéciale (+5 au ND d'Air contre le Renversement par Augmentation)",
    desc: "Une violente bourrasque heurte tout sur son passage. Toutes les cibles dans la zone subissent 1g1 Blessures et doivent réussir un jet opposé de Terre contre votre Air ou subir l'état Renversé (Knockdown)."
  },
  {
    id: "air-1-token-memory",
    name: "Jeton de Mémoire (Token of Memory)",
    element: "Air",
    mastery: 1,
    keywords: ["Artisanat", "Illusion"],
    range: "3 mètres (10')",
    area: "Un petit objet illusoire (0,03 m³ ou moins)",
    duration: "1 Heure",
    raises: "Zone (+0,03 m³ au volume), Durée (+1 heure)",
    desc: "Crée l'illusion parfaite d'un objet tenant dans les dimensions requises. L'objet a l'air réel sous tous les aspects jusqu'à la fin du sort où il disparaît. Reproduire un objet précis et familier (comme le katana d'un samouraï spécifique) nécessite 1 Augmentation, et le propriétaire a droit à un jet opposé de Perception contre votre jet d'incantation pour déceler la copie."
  },
  {
    id: "air-1-seek-truth",
    name: "Chercher la Vérité (To Seek the Truth)",
    element: "Air",
    mastery: 1,
    keywords: [],
    range: "Personnelle / Contact",
    area: "Un individu touché (peut être le lanceur)",
    duration: "5 Minutes",
    raises: "Durée (+1 minute)",
    desc: "Purifie l'esprit de la cible pour lui apporter la clarté. Ce sort permet d'annuler les malus mentaux ou sociaux temporaires dus à un effet de règles (Techniques, Rangs de Blessure ou sorts). Le ND du jet d'incantation augmente du Rang de Technique, Rang de Blessure ou Niveau de Maîtrise du sort qui a causé la pénalité. Ne permet pas d'annuler des Désavantages permanents."
  },
  {
    id: "air-1-way-deception",
    name: "La Voie de la Tromperie (Way of Deception)",
    element: "Air",
    mastery: 1,
    keywords: ["Illusion"],
    range: "6 mètres (20')",
    area: "Un double illusoire du lanceur",
    duration: "Concentration + 5 minutes",
    raises: "Zone (+1 double par 2 Augmentations), Portée (+1,5 m / +5'), Spéciale (voir description)",
    desc: "Crée une réplique visuelle parfaite du lanceur (vêtements et équipement compris) à portée. L'illusion reproduit exactement tous les mouvements du lanceur. Si vous quittez la portée normale, l'illusion disparaît. Avec 2 Augmentations lors de l'incantation, vous pouvez quitter la zone tout en laissant l'illusion figée dans sa dernière posture tant que vous maintenez votre concentration."
  },
  {
    id: "air-1-yari-air",
    name: "Lance d'Air (Yari of Air)",
    element: "Air",
    mastery: 1,
    keywords: ["Artisanat", "Tonnerre"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Une arme créée",
    duration: "5 Minutes",
    raises: "Dégâts (+1g0), Durée (+5 min), Portée (+1,5 m / +5')",
    desc: "Invoque une arme tourbillonnante d'air pur sous forme d'un contour brumeux (par défaut un yari de VD 1g1 ; 1 Augmentation permet d'en faire n'importe quelle autre lance). Si vous n'avez pas la compétence Lances, vous pouvez utiliser votre Rang d'École à la place. Si vous avez la compétence Lances, manier cette arme confère 1 Augmentation Gratuite pour la manœuvre Feinte ou Dégâts accrus. L'arme disparaît si elle quitte vos mains. Vous pouvez également la faire apparaître directement dans les mains d'un allié à portée (il n'obtient pas l'Augmentation Gratuite)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 2 (8 sorts officiels)
  // =========================================================================
  {
    id: "air-2-bentens-touch",
    name: "Le Toucher de Benten (Benten's Touch)",
    element: "Air",
    mastery: 2,
    keywords: [],
    range: "Personnelle / Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "1 Heure",
    raises: "Portée (passe à 1,5 m / 5' avec 1 Augmentation)",
    desc: "Les kami de l'Air soufflent des suggestions favorables aux témoins. La cible gagne un bonus de +1g1 plus votre Anneau d'Air au total de tous les jets de Compétences Sociales effectués pendant la durée du sort."
  },
  {
    id: "air-2-call-upon-wind",
    name: "Appel au Vent (Call Upon the Wind)",
    element: "Air",
    mastery: 2,
    keywords: ["Voyage"],
    range: "Personnelle ou 6 mètres (20')",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "1 Minute",
    raises: "Durée (+1 min), Portée (+1,5 m / +5')",
    desc: "Confère une forme restreinte de vol. La cible peut effectuer des Actions de Mouvement Gratuites, mais pas d'Actions de Mouvement Simples, et ne peut jamais se déplacer de plus de 3 mètres (10') par round. À l'expiration du sort, la cible flotte doucement jusqu'au sol sans subir de blessure, quelle que soit la hauteur."
  },
  {
    id: "air-2-hidden-visage",
    name: "Visage Dissimulé (Hidden Visage)",
    element: "Air",
    mastery: 2,
    keywords: ["Illusion"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Minutes",
    raises: "Zone (cibler un tiers en ligne de vue avec 3 Augmentations), Durée (+5 min)",
    desc: "Modifie subtilement les traits du visage pour paraître être une personne différente du même âge, gabarit, ethnie et sexe (au point de pouvoir passer pour son cousin ou son frère). Ne permet pas d'imiter une personne spécifique."
  },
  {
    id: "air-2-kamis-whisper",
    name: "Le Murmure des Kami (The Kami's Whisper)",
    element: "Air",
    mastery: 2,
    keywords: ["Illusion"],
    range: "15 mètres (50')",
    area: "Rayon de 3 mètres (10')",
    duration: "1 Round",
    raises: "Zone (+1,5 m de rayon), Durée (+1 round), Portée (+1,5 m)",
    desc: "Crée un son illusoire (voix humaine ou bruit naturel comme le feulement d'un fauve ou un écoulement d'eau). Le volume ne peut dépasser celui d'une voix parlée normale et ne peut imiter une personne précise. S'il s'agit d'une voix, le message est limité à 20 mots."
  },
  {
    id: "air-2-mists-illusion",
    name: "Les Brumes de l'Illusion (Mists of Illusion)",
    element: "Air",
    mastery: 2,
    keywords: ["Artisanat", "Illusion"],
    range: "6 mètres (20')",
    area: "Rayon de 3 mètres (10')",
    duration: "1 Minute",
    raises: "Zone (+1,5 m), Durée (+1 min), Portée (+1,5 m)",
    desc: "Façonne une image illusoire fixe de n'importe quel objet, décor ou individu imaginé dans la limite de la zone d'effet. L'illusion est purement visuelle (aucun son, odeur ou consistance physique)."
  },
  {
    id: "air-2-secrets-wind",
    name: "Secrets sur le Vent (Secrets on the Wind)",
    element: "Air",
    mastery: 2,
    keywords: [],
    range: "15 km (10 miles)",
    area: "Rayon de 6 mètres (20')",
    duration: "Concentration",
    raises: "Zone (+1,5 m de rayon), Portée (+7,5 km / +5 miles)",
    desc: "Nécessite au préalable un rituel de 10 minutes de méditation ininterrompue dans la zone à écouter. Durant les 48 heures suivantes, lancer ce sort permet d'entendre tout ce qui se dit dans la zone préparée. Si la concentration est interrompue, l'effet prend fin et requiert un nouveau rituel. Une seule zone peut être préparée à la fois."
  },
  {
    id: "air-2-whispering-wind",
    name: "Vent Murmurant (Whispering Wind)",
    element: "Air",
    mastery: 2,
    keywords: ["Divination"],
    range: "6 mètres (20')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "En comparant la parole et la pensée de la cible, les kami révèlent si la dernière phrase prononcée était sincère ou mensongère. Les esprits ne discernent pas l'opinion : si la cible croit fermement que ce qu'elle avance est vrai, les kami l'estimeront vrai."
  },
  {
    id: "air-2-wolfs-proposal",
    name: "La Proposition du Loup (Wolf's Proposal)",
    element: "Air",
    mastery: 2,
    keywords: ["Illusion"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "10 Minutes",
    raises: "Zone (cibler autrui avec 2 Augmentations), Durée (+5 min), Spéciale (+1 Rang d'Honneur apparent par 2 Augmentations)",
    desc: "Les kami tissent une aura de bienveillance subtile autour de vous sans altérer vos traits physiques. Pour toute la durée du sort, votre Rang d'Honneur est considéré comme supérieur de 3 Rangs pleins (+3.0) pour tous les jets de Connaissance : Bushido effectués par des tiers pour évaluer votre Honneur."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 3 (7 sorts officiels)
  // =========================================================================
  {
    id: "air-3-essence-air",
    name: "Essence d'Air (Essence of Air)",
    element: "Air",
    mastery: 3,
    keywords: ["Défense"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Rounds",
    raises: "Durée (+1 round)",
    desc: "Vous devenez intangible. Vous ne pouvez interagir avec aucun objet physique, bien que vous restiez au sol, et vous pouvez traverser les solides à la vitesse de 30 cm (1') par round. Votre Anneau d'Eau est considéré comme divisé par deux (arrondi à l'inférieur) tant que vous êtes intangible, et vous ne pouvez lancer aucun autre sort avant de redevenir solide."
  },
  {
    id: "air-3-eye-shall-not-see",
    name: "L'Œil ne Verra Pas (The Eye Shall Not See)",
    element: "Air",
    mastery: 3,
    keywords: ["Défense"],
    range: "Personnelle ou Contact",
    area: "Le lanceur ou un individu ciblé",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Crée une zone de distraction autour de la cible. Ceux qui se trouvent à 6 m (20') ou moins de la cible ne la remarqueront pas tant qu'elle ne fait pas de bruit fort ou n'attire pas l'attention sur elle. Les personnes situées au-delà de cette distance de 6 m ne sont pas distraites et la voient parfaitement."
  },
  {
    id: "air-3-mask-wind",
    name: "Masque de Vent (Mask of Wind)",
    element: "Air",
    mastery: 3,
    keywords: ["Illusion"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Heure",
    raises: "Zone (cibler un tiers avec 2 Augmentations), Durée (+10 min)",
    desc: "Permet de prendre l'apparence de n'importe quel humanoïde d'environ la même taille (jusqu'à 30 cm de plus ou de moins que vous, comme un kenku). Un gobelin ou un ogre est impossible car ils sont trop petits ou trop imposants."
  },
  {
    id: "air-3-striking-storm",
    name: "Frapper la Tempête (Striking the Storm)",
    element: "Air",
    mastery: 3,
    keywords: ["Défense"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "3 Rounds",
    raises: "Durée (+1 round)",
    desc: "Un cocon de vents tourbillonnants furieux vous enveloppe : votre ND d'Armure augmente de +20 contre toutes les attaques (mêlée et distance). Le fracas des vents vous empêche toutefois d'entendre ce qu'on vous dit."
  },
  {
    id: "air-3-summon-fog",
    name: "Invoquer le Brouillard (Summon Fog)",
    element: "Air",
    mastery: 3,
    keywords: [],
    range: "30 mètres (100')",
    area: "Rayon de 15 mètres (50')",
    duration: "1 Minute",
    raises: "Zone (+1,5 m / +5' de rayon), Durée (+1 minute), Portée (+3 m / +10')",
    desc: "Lève une brume côtière dense qui réduit la visibilité à 1,5 mètre (5'). Les tissus et matières absorbantes deviennent humides ou détrempés s'ils y séjournent. Les petites flammes nues (comme les bougies) s'éteignent à la discrétion du MJ, et l'humidité endommage gravement le papier de riz."
  },
  {
    id: "air-3-summoning-gale",
    name: "Appel de la Bourrasque (Summoning the Gale)",
    element: "Air",
    mastery: 3,
    keywords: ["Défense"],
    range: "15 mètres (50')",
    area: "Un individu ciblé (rayon de 9 m / 30' autour de lui)",
    duration: "Concentration",
    raises: "Portée (+1,5 m / +5')",
    desc: "Des vents circulaires violents entourent la cible sur 9 m de rayon dans toutes les directions. Toute créature dans la zone gagne +15 à son ND d'Armure contre les attaques à distance, mais subit également un malus de -3g3 à ses propres jets d'attaque à distance."
  },
  {
    id: "air-3-hearts-enemy",
    name: "L'Ennemi de ton Cœur (Your Heart's Enemy)",
    element: "Air",
    mastery: 3,
    keywords: ["Illusion"],
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Les kami manifestent une illusion de la chose que la cible redoute le plus au monde (le meurtrier de son père, une lame maudite, un massacre de sa famille). Cela génère un effet de Peur 4 que la cible doit surmonter. Seule la cible perçoit les détails précis de l'illusion ; les tiers n'aperçoivent qu'un contour vaporeux ressemblant à un petit nuage de brume."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 4 (6 sorts officiels)
  // =========================================================================
  {
    id: "air-4-call-spirit",
    name: "Appel de l'Esprit (Call the Spirit)",
    element: "Air",
    mastery: 4,
    keywords: [],
    range: "Spéciale",
    area: "Un esprit ciblé",
    duration: "5 Minutes",
    raises: "Durée (+1 minute)",
    desc: "Forme puissante d'Invoquer permettant d'appeler un esprit spécifique depuis n'importe quel Royaume des Esprits afin de converser (les habitants qui ne sont pas des esprits, comme les Fortunes, sont immunisés). L'esprit ne peut pas vous attaquer à moins que vous n'attaquiez le premier, mais il n'est pas forcément amical. Disparaît dès l'expiration du sort."
  },
  {
    id: "air-4-false-realm",
    name: "Royaume Illusoire (False Realm)",
    element: "Air",
    mastery: 4,
    keywords: ["Bataille", "Illusion"],
    range: "75 mètres (250')",
    area: "Rayon de 30 mètres (100')",
    duration: "1 Heure",
    raises: "Zone (+3 m / +10' de rayon), Durée (+10 min)",
    desc: "Modifie entièrement l'apparence visuelle, sonore et olfactive du terrain (transforme un marais fétide en somptueux jardin, ou inversement). L'illusion est impalpable et n'a aucune consistance physique."
  },
  {
    id: "air-4-gift-wind",
    name: "Le Don du Vent (Gift of Wind)",
    element: "Air",
    mastery: 4,
    keywords: ["Illusion"],
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Minutes",
    raises: "Durée (+1 minute)",
    desc: "Les kami du vent vous rendent totalement invisible à toute vue non magique. Vous pouvez toujours être touché, entendu et senti. Le sort prend fin immédiatement si vous effectuez une attaque."
  },
  {
    id: "air-4-know-mind",
    name: "Connaître l'Esprit (Know the Mind)",
    element: "Air",
    mastery: 4,
    keywords: [],
    range: "3 mètres (10')",
    area: "Un individu ciblé",
    duration: "3 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "Permet d'entendre les pensées de surface actives de la cible (ce à quoi elle pense immédiatement). Un jet opposé de votre Perception contre l'Intuition de la cible permet également de discerner son véritable état émotionnel, par-delà ses apparences."
  },
  {
    id: "air-4-netsuke-wind",
    name: "Netsuke de Vent (Netsuke of Wind)",
    element: "Air",
    mastery: 4,
    keywords: ["Artisanat", "Illusion"],
    range: "Contact",
    area: "Un objet tenu en main",
    duration: "1 Heure",
    raises: "Durée (+10 min)",
    desc: "Matérialise un objet d'air compacté pouvant être tenu à une ou deux mains et pesant au plus 10 kg (20 livres). C'est une illusion fonctionnelle (elle inflige des dégâts normaux si c'est une arme). L'objet disparaît à la fin de la durée."
  },
  {
    id: "air-4-symbol-air",
    name: "Symbole d'Air (Symbol of Air)",
    element: "Air",
    mastery: 4,
    keywords: ["Sceau"],
    range: "Contact",
    area: "Spéciale (un passage, porte ou fenêtre)",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Inscrit un sceau sur un passage. Quiconque le franchit doit réussir un jet opposé de Terre contre l'Air du lanceur. En cas d'échec, la victime est prise de somnolence et doit réussir un jet de Volonté contre le total du jet d'incantation initial du symbole ou sombrer dans un profond sommeil d'une heure. Elle se réveille immédiatement si elle subit la moindre attaque. Limité à un seul Symbole d'Air actif à la fois par shugenja."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 5 (5 sorts officiels)
  // =========================================================================
  {
    id: "air-5-cloud-mind",
    name: "Troubler l'Esprit (Cloud the Mind)",
    element: "Air",
    mastery: 5,
    keywords: [],
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Permanente",
    raises: "Spéciale (+1 jour de mémoire altérée par Augmentation)",
    desc: "Après un jet opposé réussi de votre Air contre la Terre de la victime, celle-ci perd la mémoire des 5 derniers jours (une semaine rokugani). De plus, elle devient très vulnérable aux suggestions et vous pouvez lui implanter de faux souvenirs pour combler le vide."
  },
  {
    id: "air-5-draw-back-shadow",
    name: "Dissiper les Ombres (Draw Back the Shadow)",
    element: "Air",
    mastery: 5,
    keywords: [],
    range: "30 mètres (100')",
    area: "Rayon de 9 mètres (30')",
    duration: "Instantanée",
    raises: "Zone (+1,5 m de rayon), Portée (+3 m / +10')",
    desc: "Dissipe automatiquement toutes les illusions issues de sorts de Niveau de Maîtrise 4 ou inférieur dans la zone. Les sorts de Maîtrise 5 ou 6 sont dissipés sur un jet opposé d'Air contre leur créateur. Les effets magiques continus non illusoires peuvent aussi être dissipés par un jet opposé d'Air contre l'Anneau approprié du créateur."
  },
  {
    id: "air-5-echoes-breeze",
    name: "Échos sur la Brise (Echoes on the Breeze)",
    element: "Air",
    mastery: 5,
    keywords: [],
    range: "Personnelle",
    area: "Un individu ciblé",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Établit un canal de communication à travers l'Empire avec une personne que vous connaissez. Vous pouvez converser tant que vous vous concentrez, vos voix étant perçues comme des murmures. Les deux participants sont immédiatement conscients du lien et chacun peut l'interrompre à tout instant."
  },
  {
    id: "air-5-legion-moon",
    name: "La Légion de la Lune (Legion of the Moon)",
    element: "Air",
    mastery: 5,
    keywords: ["Illusion"],
    range: "Personnelle",
    area: "Rayon de 3 mètres (10') autour du lanceur",
    duration: "5 Minutes",
    raises: "Zone (+1,5 m / +5'), Durée (+1 minute)",
    desc: "Invoque la bénédiction de la Lune pour envelopper un groupe dans l'invisibilité. Tous les individus que vous choisissez dans la zone deviennent totalement invisibles aux sens normaux pour toute la durée. Quiconque effectue une action qui interagit physiquement avec un individu non affecté brise immédiatement le charme pour lui-même."
  },
  {
    id: "air-5-slayers-knives",
    name: "Les Lames du Tueur (Slayer's Knives)",
    element: "Air",
    mastery: 5,
    keywords: ["Tonnerre"],
    range: "9 mètres (30')",
    area: "Couloir d'air de 3 m (10') de large",
    duration: "Instantanée",
    raises: "Zone (+1 m de largeur), Dégâts (+1g0 pour 3 Augmentations)",
    desc: "Un vent tranchant déchire un couloir de 3 m de large devant vous, infligeant des dégâts de VD (Air + 2)g(Air) (ex: 6g4 avec Air 4). Le papier et les tissus légers sont détruits. Quiconque subit des dégâts doit réussir un jet de l'Anneau de Terre (ND 20) ou être Renversé (Knocked Down)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 6 (3 sorts officiels)
  // =========================================================================
  {
    id: "air-6-rise-air",
    name: "Éveil de l'Air (Rise, Air)",
    element: "Air",
    mastery: 6,
    keywords: [],
    range: "9 mètres (30')",
    area: "Un esprit invoqué",
    duration: "Concentration",
    raises: "Aucune",
    desc: "Invoque un colosse d'Air de 3 m de haut pour vous défendre. Il se déplace de (Air × 3 m) par round et génère des bourrasques sur 6 m autour de lui empêchant toute Action de Mouvement Simple. Traits Physiques = votre Anneau d'Air, compétence Jiujutsu = moitié de votre Air, VD = Air g Air. Ses Blessures sont calculées avec une Terre égale à votre Air (sans pénalités de blessures) et il est Invulnérable. Disparaît à 0 Blessure."
  },
  {
    id: "air-6-false-legion",
    name: "La Fausse Légion (The False Legion)",
    element: "Air",
    mastery: 6,
    keywords: ["Bataille", "Illusion"],
    range: "Personnelle",
    area: "À moins de 30 m (100') du lanceur",
    duration: "Concentration",
    raises: "Zone (+3 m / +10'), Spéciale (+5 silhouettes par Augmentation)",
    desc: "Crée jusqu'à (Anneau d'Air × 10) silhouettes illusoires mobiles dans la zone. Elles possèdent des composantes visuelles, sonores et olfactives, et obéissent à vos ordres, mais ne peuvent interagir physiquement avec rien."
  },
  {
    id: "air-6-wrath-kaze",
    name: "La Colère de Kaze-no-Kami (Wrath of Kaze-no-Kami / Hurricane)",
    element: "Air",
    mastery: 6,
    keywords: ["Tonnerre"],
    range: "Personnelle",
    area: "Rayon de 1,5 km (1 mile) centré sur le lanceur",
    duration: "Concentration (max 1 heure)",
    raises: "Aucune",
    desc: "Déchaîne un ouragan dévastateur. Vous vous tenez dans l'œil du cyclone (rayon de 6 m) totalement indemne. Hors de l'œil, les objets de moins de 250 kg (500 lbs) sont emportés. Quiconque n'est pas abrité subit 1g1 Blessures par minute et risque (1 chance sur 10 chaque minute) de subir 5g5 Blessures suite à un impact de débris. Ne peut être lancé au même endroit plus d'une fois par mois."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_AIR = SORTS_AIR;
}
