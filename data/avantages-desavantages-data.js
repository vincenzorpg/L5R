/**
 * data/avantages-desavantages-data.js — L5R 4e Édition
 * Système complet et vérifié selon le Livre de Base (p. 146-163) et suppléments officiels.
 * Conforme aux structures attendues par character-generator.js.
 */

(function () {
  // =========================================================================
  // 1. TABLEAU DES AVANTAGES (Livre de Base p. 146-155 + Suppléments)
  // =========================================================================
  const AVANTAGES_LIST = [
    // --- AVANTAGES PHYSIQUES ---
    {
      id: "adv-ambidextre",
      name: "Ambidextre (Ambidextrous)",
      type: "Physique",
      cost: 3,
      impact: "ambidextrous",
      prerequisite: "Agilité 3",
      desc: "Vous maniez vos armes et vos outils avec une égale dextérité de la main gauche comme de la main droite.",
      rule: "Vous ignorez la pénalité habituelle de +5 au ND lorsque vous agissez avec votre main non dominante (ou que vous combattez avec deux armes sans école dédiée)."
    },
    {
      id: "adv-grand",
      name: "Grand (Large)",
      type: "Physique",
      cost: 4,
      impact: "large",
      prerequisite: "Incompatible avec Petit (3 pts pour le Clan du Crabe)",
      desc: "Votre taille et votre masse musculaire imposante dépassent nettement la moyenne impériale.",
      rule: "Chacun de vos Paliers de Blessures contient 1 point de vie supplémentaire (+8 PV au total). De plus, vous ajoutez +1g0 à tous vos jets de dégâts avec les armes de corps à corps imposantes (Large) ou maniées à deux mains."
    },
    {
      id: "adv-force-terre",
      name: "Force de la Terre (Strength of the Earth)",
      type: "Physique",
      cost: 3,
      impact: "strength_earth",
      prerequisite: "2 pts pour les Bushi",
      desc: "L'endurance du roc coule dans vos os : la souffrance physique glisse sur vous sans briser votre garde.",
      rule: "Les pénalités de ND infligées par tous vos Paliers de Blessures sont réduites de 3 points (ex. Égratigné passe de +3 à +0, Blessé Léger de +5 à +2, etc.)."
    },
    {
      id: "adv-mains-pierre",
      name: "Mains de Pierre (Hands of Stone)",
      type: "Physique",
      cost: 6,
      impact: "hands_of_stone",
      prerequisite: "Aucun",
      desc: "Vos poings nus sont aussi durs et meurtriers que des masses d'armes forgées.",
      rule: "Vous ajoutez +0g1 à tous vos jets de dégâts d'attaques à mains nues (Unarmed Damage Rolls). Ce bonus s'additionne aux dégâts de base ou aux augmentations de votre école (un moine Togashi passe ainsi à 0g3 + Force)."
    },
    {
      id: "adv-mains-crabe",
      name: "Mains de Crabe (Crab Hands)",
      type: "Physique",
      cost: 3,
      impact: "crab_hands",
      prerequisite: "2 pts pour le Clan du Crabe",
      desc: "Vous possédez une habileté innée pour improviser des armes de fortune avec n'importe quel objet lourd.",
      rule: "Vous ne subissez aucune pénalité de maniement avec les armes improvisées ou non conventionnelles. Tout objet improvisé inflige au minimum 1g2 dégâts."
    },
    {
      id: "adv-beaute-dangereuse",
      name: "Beauté Dangereuse (Dangerous Beauty)",
      type: "Physique",
      cost: 3,
      impact: "dangerous_beauty",
      prerequisite: "2 pts pour le Clan du Scorpion. Incompatible avec Insipide",
      desc: "Vos traits captivants et votre magnétisme charnel troublent le jugement d'autrui.",
      rule: "Vous gagnez un bonus de +1g0 à tous vos jets de Séduction (Tentation) effectués contre des interlocuteurs attirés par votre genre."
    },
    {
      id: "adv-guerisseur-rapide",
      name: "Guérison Accélérée (Quick Healer)",
      type: "Physique",
      cost: 3,
      impact: "quick_healer",
      prerequisite: "Constitution 3",
      desc: "Votre métabolisme referme plaies et fractures à une vitesse prodigieuse lors du repos.",
      rule: "Lors de chaque phase de guérison naturelle nocturne, vous récupérez un montant supplémentaire de Blessures égal à votre Rang de Constitution + votre Rang d'École."
    },
    {
      id: "adv-vif",
      name: "Vif (Quick)",
      type: "Physique",
      cost: 5,
      impact: "quick",
      prerequisite: "Réflexes 3",
      desc: "Vos réflexes fulgurants vous permettent d'anticiper la trajectoire des lames ennemies.",
      rule: "Vous ajoutez votre Trait Réflexes en bonus direct à votre total d'Initiative au début de chaque combat."
    },
    {
      id: "adv-reflexes-eclair",
      name: "Vitesse Éclair (Lightning Reflexes)",
      type: "Physique",
      cost: 4,
      impact: "lightning_reflexes",
      prerequisite: "Aucun",
      desc: "Votre corps réagit par pur réflexe sans attendre l'ordre conscient de votre esprit.",
      rule: "Lors de vos jets d'Initiative, vous lancez 1 dé supplémentaire (+1g0). En cas d'égalité sur l'Initiative, vous agissez toujours avant vos rivaux qui ne possèdent pas cet avantage."
    },
    {
      id: "adv-sens-aigus",
      name: "Sens Aiguisés (Keen Senses)",
      type: "Physique",
      cost: 3,
      impact: "keen_senses",
      prerequisite: "Aucun",
      desc: "Votre vue perçante, votre ouïe fine ou votre flair d'animal traqueur déjouent les pièges de l'ombre.",
      rule: "Bonus de +1g0 sur tous les jets de Compétences basés sur le Trait Perception (Investigation, Vigilance, Chasse)."
    },
    {
      id: "adv-silencieux",
      name: "Silencieux (Silent)",
      type: "Physique",
      cost: 3,
      impact: "silent",
      prerequisite: "2 pts pour les Ninja",
      desc: "Vos pas n'émettent aucun froissement d'étoffe ni craquement de plancher.",
      rule: "Bonus de +1g0 à tous vos jets de Discrétion (Stealth)."
    },
    {
      id: "adv-insipide",
      name: "Physique Anodin (Bland)",
      type: "Physique",
      cost: 3,
      impact: "bland",
      prerequisite: "Incompatible avec Beauté Dangereuse",
      desc: "Vos traits ordinaires se fondent instantanément dans la foule et défient la mémoire des témoins.",
      rule: "Le ND de toute tentative d'Investigation ou de Vigilance cherchant à vous identifier, à tracer votre passage ou à se souvenir de vos traits augmente de +10."
    },
    {
      id: "adv-sang-osano-wo",
      name: "Sang d'Osano-Wo (Blood of Osano-Wo)",
      type: "Physique",
      cost: 4,
      impact: "blood_osano_wo",
      prerequisite: "Prisé par le Clan du Crabe",
      desc: "La foudre et les tempêtes du Seigneur du Tonnerre coulent dans vos veines.",
      rule: "Bonus de +1g1 sur tous vos jets de Constitution contre les éléments naturels, le froid extrême, la faim, la soif ou les privations. Vous bénéficiez d'une Réduction de 5 contre les dégâts d'électricité ou de tonnerre."
    },
    {
      id: "adv-duelliste-ne",
      name: "Duelliste Émérite (Way of the Duelist)",
      type: "Physique",
      cost: 4,
      impact: "way_duelist",
      prerequisite: "Iaijutsu 3",
      desc: "Vous percevez le souffle exact précédant l'extraction de la lame adverse lors d'un duel formel.",
      rule: "Lors de la phase de Concentration d'un duel d'Iaijutsu, vous gagnez un bonus de +1g0 à votre jet opposé d'Iaijutsu (Concentration) pour obtenir des Augmentations Gratuites."
    },

    // --- AVANTAGES MENTAUX ---
    {
      id: "adv-equilibre-interieur",
      name: "Équilibre Intérieur (Balance)",
      type: "Mental",
      cost: 2,
      impact: "balance",
      prerequisite: "Aucun",
      desc: "Une sérénité inébranlable habite votre âme lorsque votre droiture est mise à l'épreuve.",
      rule: "Lorsque vous ajoutez votre Rang d'Honneur pour résister à une tentative d'Intimidation ou de Tentation, vous gagnez +1g0 supplémentaire à votre jet."
    },
    {
      id: "adv-pensee-claire",
      name: "Pensée Claire (Clear Thinker)",
      type: "Mental",
      cost: 3,
      impact: "clear_thinker",
      prerequisite: "2 pts pour le Clan du Dragon. Incompatible avec Naïf",
      desc: "Votre logique d'acier et votre lucidité vous préservent des mensonges et illusions.",
      rule: "Vous gagnez un bonus de +2g0 sur tous vos jets opposés pour résister aux tromperies (Sincérité/Tromperie), aux illusions magiques et aux manipulations mentales."
    },
    {
      id: "adv-casse-cou",
      name: "Casse-Cou (Daredevil)",
      type: "Mental",
      cost: 3,
      impact: "daredevil",
      prerequisite: "2 pts pour le Clan de la Mante",
      desc: "Le danger physique exalte votre agilité au lieu de paralyser vos mouvements.",
      rule: "Lorsque vous dépensez 1 point de Vide sur un jet d'Athlétisme lors d'une cascade ou d'une situation de péril mortel, vous gagnez +3g1 au lieu du bonus habituel de +1g1."
    },
    {
      id: "adv-irreprochable",
      name: "Irréprochable (Irreproachable)",
      type: "Mental",
      cost: 2,
      impact: "irreproachable",
      prerequisite: "1 pt pour les Familles Impériales",
      desc: "Votre vertu morale rend vaines les tentatives viles de séduction ou de compromission.",
      rule: "Bonus de +1g0 à tous vos jets opposés face à un adversaire employant contre vous la compétence Tentation (Séduction ou Pots-de-vin)."
    },
    {
      id: "adv-memoire-precise",
      name: "Mémoire Précise (Precise Memory)",
      type: "Mental",
      cost: 2,
      impact: "precise_memory",
      prerequisite: "Aucun",
      desc: "Vous retenez visages, lois, poèmes et cartes géographiques avec une fidélité parfaite.",
      rule: "Bonus de +1g0 sur tous vos jets d'Intelligence pour vous remémorer un détail vu, lu ou entendu, réciter un texte officiel ou reconstituer un plan."
    },
    {
      id: "adv-prodigieux",
      name: "Prodige (Prodigy)",
      type: "Mental",
      cost: 12,
      impact: "prodigy",
      prerequisite: "À la création du personnage uniquement",
      desc: "Votre génie inné assimile les techniques et compétences avec une fulgurance stupéfiante.",
      rule: "Le coût en points d'expérience (XP) pour augmenter le rang de n'importe quelle Compétence est réduit de 1 point (coût minimum : 1 XP par rang)."
    },
    {
      id: "adv-grand-potentiel",
      name: "Grand Potentiel (Great Potential)",
      type: "Mental",
      cost: 5,
      impact: "great_potential",
      prerequisite: "Choisir une compétence",
      desc: "Vous possédez une vocation sans limite pour l'apprentissage d'un art précis.",
      rule: "Choisissez une compétence : vous pouvez annoncer des Augmentations avec un coût réduit de 1 pour une manœuvre spécifique de cette compétence, ou monter la compétence jusqu'au rang 6."
    },
    {
      id: "adv-erudit",
      name: "Érudit (Sage)",
      type: "Mental",
      cost: 4,
      impact: "sage",
      prerequisite: "3 pts pour le Phénix et les Shugenja",
      desc: "Votre insatiable soif de lecture a fait de vous une encyclopédie vivante de Rokugan.",
      rule: "Chaque fois que vous devez faire un jet sans compétence (Unskilled) sous n'importe quelle sous-compétence de Connaissance (Lore), vous êtes considéré comme possédant le Rang 1."
    },
    {
      id: "adv-sens-danger",
      name: "Sens du Danger (Danger Sense)",
      type: "Mental",
      cost: 3,
      impact: "danger_sense",
      prerequisite: "Perception 3",
      desc: "Une alarme instinctive résonne en vous une fraction de seconde avant l'embuscade.",
      rule: "Le MJ doit vous avertir dès qu'une attaque surprise ou une embuscade est tentée contre vous. Vous ne pouvez jamais être affecté par l'état Surpris."
    },
    {
      id: "adv-astucieux",
      name: "Astucieux (Crafty)",
      type: "Mental",
      cost: 3,
      impact: "crafty",
      prerequisite: "2 pts pour le Clan du Scorpion",
      desc: "Votre esprit vif repère immédiatement les failles dans la surveillance et les règles établies.",
      rule: "Bonus de +1g0 sur tous vos jets de compétences déshonorantes (Discrétion, Falsification, Crochetage, Poison)."
    },
    {
      id: "adv-tactique",
      name: "Tacticien Émérite (Tactician)",
      type: "Mental",
      cost: 4,
      impact: "tactician",
      prerequisite: "3 pts pour le Clan du Lion et les Bushi",
      desc: "Vous lisez le flux et le reflux des troupes sur le champ de bataille comme les pièces d'un jeu de Go.",
      rule: "Lors de la résolution d'une Grande Bataille, vous pouvez modifier votre résultat sur le Tableau des Batailles de +5 ou -5 après le lancer."
    },
    {
      id: "adv-ame-artiste",
      name: "Âme d'Artiste (Soul of Artistry)",
      type: "Mental",
      cost: 4,
      impact: "soul_artistry",
      prerequisite: "3 pts pour la Grue et les Courtisans",
      desc: "L'harmonie esthétique guide vos mains, qu'il s'agisse de peindre, sculpter ou composer.",
      rule: "Choisissez Artisanat ou Métier : vous êtes considéré comme ayant le Rang 1 lorsque vous devez faire un jet sans entraînement préalable."
    },
    {
      id: "adv-sens-orientation",
      name: "Sens du Terrain (Way of the Land)",
      type: "Mental",
      cost: 2,
      impact: "way_of_the_land",
      prerequisite: "Choisir une province ou région",
      desc: "Vous connaissez les sentiers, abris, cours d'eau et ressources d'une région comme votre propre cour.",
      rule: "Vous ne pouvez jamais vous perdre dans cette région et obtenez +1g0 sur les jets de Survie, Chasse et Vigilance effectués dans cette zone."
    },
    {
      id: "adv-sans-coeur",
      name: "Cœur de Pierre (Heartless)",
      type: "Mental",
      cost: 4,
      impact: "heartless",
      prerequisite: "Livre de l'Eau / Lion",
      desc: "Votre cœur insensible est sourd aux larmes, suppliques et déclarations enflammées.",
      rule: "Bonus de +1g0 à tous vos jets pour résister aux tentatives de persuasion ou de manipulation émotionnelle (Courtisan, Sincérité, Tentation)."
    },

    // --- AVANTAGES SOCIAUX ---
    {
      id: "adv-allie",
      name: "Allié d'Influence (Ally)",
      type: "Social",
      cost: 3,
      impact: "ally",
      prerequisite: "Coût variable (1 pt de moins pour la Grue)",
      desc: "Un magistrat, seigneur provincial ou fonctionnaire loyal vous doit une fière chandelle.",
      rule: "Vous bénéficiez d'un allié PNJ doté d'une influence politique et d'un dévouement proportionnels aux points investis (Statut et Disponibilité)."
    },
    {
      id: "adv-voix",
      name: "La Voix de Rokugan (Voice)",
      type: "Social",
      cost: 3,
      impact: "voice",
      prerequisite: "Incompatible avec Bégaiement",
      desc: "Votre voix possède un timbre noble, pur et hypnotique qui commande le respect des cours.",
      rule: "Bonus de +1g0 à tous vos jets d'Éloquence, Chant, Déclamation, Commandement et Art Oratoire."
    },
    {
      id: "adv-statut-social",
      name: "Rang Social Élevé (Social Position)",
      type: "Social",
      cost: 6,
      impact: "social_position",
      prerequisite: "Aucun",
      desc: "Vous avez été promu à une charge impériale ou clanique d'importance majeure.",
      rule: "Vous débutez la partie avec +1.0 Rang de Statut plein."
    },
    {
      id: "adv-renommee",
      name: "Renommée (Fame)",
      type: "Social",
      cost: 3,
      impact: "fame",
      prerequisite: "Aucun",
      desc: "Vos exploits passés sont déjà célébrés par les récits des conteurs à travers l'Empire.",
      rule: "Vous commencez la partie avec +1.0 Rang de Gloire plein."
    },
    {
      id: "adv-heros-peuple",
      name: "Héros du Peuple (Hero of the People)",
      type: "Social",
      cost: 2,
      impact: "hero_of_the_people",
      prerequisite: "Aucun",
      desc: "Les heimin et hinin voient en vous un protecteur juste et vénèrent votre silhouette.",
      rule: "Le ND pour que des citoyens non-samouraïs vous reconnaissent, vous cachent ou vous prêtent assistance est abaissé de 10."
    },
    {
      id: "adv-favori-cour",
      name: "Favori de la Cour (Darling of the Court)",
      type: "Social",
      cost: 2,
      impact: "darling_of_the_court",
      prerequisite: "1 pt pour les Courtisans (Choisir un palais précis)",
      desc: "Vous êtes la coqueluche des salons et du daimyō d'une cour officielle spécifique.",
      rule: "Tant que vous résidez à cette cour précise, votre Statut est considéré comme supérieur de 1.0 Rang."
    },
    {
      id: "adv-commandement",
      name: "Aura de Commandement (Leadership)",
      type: "Social",
      cost: 6,
      impact: "leadership",
      prerequisite: "5 pts pour le Clan du Lion",
      desc: "Votre prestance guerrière galvanise le courage de vos camarades sous le feu ennemi.",
      rule: "Une fois par round, lors de la phase des Réactions, vous pouvez ajouter votre Rang d'École + 1g1 à l'Initiative d'un allié situé à portée de voix."
    },
    {
      id: "adv-coeur-vengeance",
      name: "Cœur Vengeur (Heart of Vengeance)",
      type: "Social",
      cost: 5,
      impact: "heart_of_vengeance",
      prerequisite: "4 pts pour l'Araignée (Choisir un Clan ou groupe rival)",
      desc: "Une haine inexpiable consume vos nuits contre une faction ou un clan adverse.",
      rule: "Vous bénéficiez d'un bonus de +1g1 sur tous vos jets opposés contre les membres de la faction ciblée."
    },
    {
      id: "adv-autre-ecole",
      name: "Études dans une Autre École (Different School)",
      type: "Social",
      cost: 5,
      impact: "different_school",
      prerequisite: "Création de personnage uniquement",
      desc: "Votre maison a échangé de grandes faveurs pour vous faire admettre dans le dojo d'un autre clan.",
      rule: "Vous suivez le cursus d'une École appartenant à un autre Clan tout en conservant l'allégeance et le bonus de famille de votre propre Clan d'origine."
    },
    {
      id: "adv-modele-bushido",
      name: "Modèle de Bushidō (Paragon of Bushido)",
      type: "Social",
      cost: 7,
      impact: "paragon_bushido",
      prerequisite: "Honneur 4.0 minimum (Choisir une des 7 Vertus)",
      desc: "Vous êtes l'incarnation vivante d'une vertu cardinale du code des guerriers.",
      rule: "Chaque gain d'Honneur lié directement à l'accomplissement héroïque de cette vertu est doublé. Vous bénéficiez d'une Augmentation Gratuite sur les jets incarnant directement cette vertu."
    },
    {
      id: "adv-sensation",
      name: "Bête de Scène (Sensation)",
      type: "Social",
      cost: 3,
      impact: "sensation",
      prerequisite: "Aucun",
      desc: "Vous captivez instantanément une foule dès que vous montez sur scène ou déclamez un vers.",
      rule: "Vous êtes considéré comme possédant le Rang 1 dans n'importe quelle Compétence de Spectacle (Perform) non maîtrisée."
    },
    {
      id: "adv-ecoles-multiples",
      name: "Écoles Multiples (Multiple Schools)",
      type: "Social",
      cost: 10,
      impact: "multiple_schools",
      prerequisite: "En cours de partie uniquement. Accord du MJ. Rang 1 dans toutes les Compétences de la nouvelle école. Incompatible Bushi/Shugenja.",
      desc: "Vous avez été officiellement autorisé à poursuivre l'enseignement d'une nouvelle École majeure de Rokugan.",
      rule: "Votre progression dans votre École d'origine s'arrête. Lorsque vous atteignez votre prochain Rang de Maîtrise, vous débutez la nouvelle École au Rang 1 et apprenez sa première Technique."
    },

    // --- AVANTAGES SPIRITUELS ---
    {
      id: "adv-chanceux",
      name: "Chance Insolente (Luck)",
      type: "Spirituel",
      cost: 3,
      impact: "luck",
      prerequisite: "3, 6 ou 9 pts (1 relance par tranche de 3 pts)",
      desc: "Les Fortunes veillent sur votre pas et détournent la lame fatale au dernier instant.",
      rule: "Une fois par session de jeu et par tranche de 3 points investis, vous pouvez relancer immédiatement n'importe quel jet de dés. Vous conservez obligatoirement le meilleur des deux résultats."
    },
    {
      id: "adv-resistance-magie",
      name: "Résistance à la Magie (Magic Resistance)",
      type: "Spirituel",
      cost: 2,
      impact: "magic_resistance",
      prerequisite: "2, 4 ou 6 pts (cumulable jusqu'à 3 rangs)",
      desc: "Les esprits élémentaires hésitent à vous toucher ou glissent sur votre enveloppe sans vous affecter.",
      rule: "Le ND de lancement de tout sort élémentaire vous prenant pour cible augmente de +3 par niveau acheté (sans effet contre la Mahō corrompue)."
    },
    {
      id: "adv-illumine",
      name: "Illuminé (Enlightened)",
      type: "Spirituel",
      cost: 6,
      impact: "enlightened",
      prerequisite: "5 pts pour le Dragon et les Moines",
      desc: "Votre quête spirituelle vers l'harmonie universelle a ouvert les portes du Vide.",
      rule: "Le coût en points d'expérience (XP) pour augmenter votre Anneau de Vide est réduit de 2 points à chaque rang."
    },
    {
      id: "adv-ishiken-do",
      name: "Ishiken-dō (Void Magic)",
      type: "Spirituel",
      cost: 8,
      impact: "ishiken_do",
      prerequisite: "Shugenja uniquement (6 pts pour le Clan du Phénix)",
      desc: "Vous possédez le don rarissime de communier directement avec le tissu du Vide cosmique.",
      rule: "Vous pouvez apprendre, mémoriser et lancer les sorts de l'Élément du Vide (Ishiken)."
    },
    {
      id: "adv-benediction-elementaire",
      name: "Bénédiction Élémentaire (Elemental Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "elemental_blessing",
      prerequisite: "3 pts pour le Phénix (Choisir un Élément non-Vide)",
      desc: "Les kami d'un élément précis éprouvent une affection inexplicable pour votre âme.",
      rule: "Le coût en XP pour augmenter les deux Traits rattachés à cet Élément est réduit de 1 point à chaque montée."
    },
    {
      id: "adv-ami-elements",
      name: "Ami des Éléments (Friend of the Elements)",
      type: "Spirituel",
      cost: 4,
      impact: "friend_of_the_elements",
      prerequisite: "3 pts pour les Shugenja (Choisir un Anneau)",
      desc: "Les esprits de la nature tourbillonnent joyeusement autour de votre pas et prêtent main-forte à vos actes.",
      rule: "Vous gagnez 1 Augmentation Gratuite sur tous les jets utilisant les Traits rattachés à l'Anneau choisi."
    },
    {
      id: "adv-destin-grandiose",
      name: "Destin Grandiose (Great Destiny)",
      type: "Spirituel",
      cost: 5,
      impact: "great_destiny",
      prerequisite: "Accord du MJ",
      desc: "Les cieux vous réservent un rôle capital dans l'histoire : la mort ne peut vous cueillir prématurément.",
      rule: "Une fois par session, si vous deviez subir un coup mortel vous envoyant au trépas, vous survivez miraculeusement avec 1 PV au palier Mortel."
    },
    {
      id: "adv-don-interieur",
      name: "Don Intérieur (Inner Gift)",
      type: "Spirituel",
      cost: 7,
      impact: "inner_gift",
      prerequisite: "Choisir un don surnaturel (empathie animale, prémonition, vision astrale...)",
      desc: "Votre âme abrite une manifestation magique innée indépendante des voies de la prêtrise des kami.",
      rule: "Vous disposez d'une faculté surnaturelle mineure permanente définie et validée avec le meneur de jeu."
    },
    {
      id: "adv-choisi-oracles",
      name: "Élu des Oracles (Chosen by the Oracles)",
      type: "Spirituel",
      cost: 6,
      impact: "chosen_by_oracles",
      prerequisite: "Choisir un Anneau Élémentaire",
      desc: "L'un des Oracles Élémentaires majeurs a posé son regard bienveillant sur votre destinée.",
      rule: "Bonus de +1g1 sur tous les jets d'Anneau effectués sous l'Élément choisi."
    },
    {
      id: "adv-benediction-benten",
      name: "Bénédiction de Benten (Benten's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "bentens_blessing",
      prerequisite: "3 pts pour la Grue. Incompatible avec Odieux",
      desc: "La Fortune de l'Amour et des Arts a déposé un charme irrésistible sur vos lèvres.",
      rule: "Bonus de +0g1 sur tous vos jets de compétences sociales visant à persuader, charmer ou apaiser un interlocuteur."
    },
    {
      id: "adv-benediction-bishamon",
      name: "Bénédiction de Bishamon (Bishamon's Blessing)",
      type: "Spirituel",
      cost: 5,
      impact: "bishamons_blessing",
      prerequisite: "4 pts pour le Crabe et le Lion",
      desc: "La Fortune de la Guerre approuve la force colossale de vos assauts.",
      rule: "Lorsque vous annoncez et réussissez des Augmentations pour Dégâts Accrus, vous gagnez 1 dé de dégâts supplémentaire (+1g0). Bonus de +1g0 sur les tests d'effort physique de Force brute."
    },
    {
      id: "adv-benediction-fukurokujin",
      name: "Bénédiction de Fukurokujin (Fukurokujin's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "fukurokujins_blessing",
      prerequisite: "3 pts pour le Dragon et le Phénix (Choisir une Connaissance)",
      desc: "La Fortune de la Sagesse illumine votre étude des mystères de l'Empire.",
      rule: "Bonus de +1g1 sur tous les jets utilisant la Connaissance (Lore) sélectionnée."
    },
    {
      id: "adv-benediction-hotei",
      name: "Bénédiction d'Hotei (Hotei's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "hoteis_blessing",
      prerequisite: "Aucun",
      desc: "La Fortune du Contentement préserve votre paix d'esprit contre les assauts mystiques.",
      rule: "Quiconque tente de drainer ou manipuler vos points de Vide par un pouvoir adverse doit d'abord remporter un jet opposé de Vide contre vous."
    },
    {
      id: "adv-benediction-jurojin",
      name: "Bénédiction de Jurojin (Jurojin's Blessing)",
      type: "Spirituel",
      cost: 4,
      impact: "jurojins_blessing",
      prerequisite: "3 pts pour le Clan du Scorpion",
      desc: "La Fortune de la Longévité éloigne les fièvres et les sucs vénéneux de votre métabolisme.",
      rule: "Bonus de +2g0 à tous vos jets pour résister aux poisons, toxines et maladies naturelles."
    },
    {
      id: "adv-benediction-inari",
      name: "Bénédiction d'Inari (Inari's Blessing)",
      type: "Spirituel",
      cost: 3,
      impact: "inaris_blessing",
      prerequisite: "Aucun",
      desc: "La Fortune du Riz et des Récoltes vous soutient même aux heures les plus noires de la famine.",
      rule: "Même en situation de famine, de jeûne forcé ou de privation complète d'eau/nourriture, vous récupérez normalement vos points de Vide lors du repos."
    },

    // --- AVANTAGES MATÉRIELS ---
    {
      id: "adv-heritage-ancestral",
      name: "Héritage Ancestral (Inheritance)",
      type: "Matériel",
      cost: 5,
      impact: "inheritance",
      prerequisite: "Définir l'objet de famille",
      desc: "Lors de votre gempukku, votre famille vous a confié une relique précieuse d'un ancêtre héroïque.",
      rule: "Vous commencez la partie avec un objet d'artisanat exceptionnel ou un Nemuranai conférant +1g0 ou 1 Augmentation Gratuite lors de son utilisation rituelle."
    },
    {
      id: "adv-fortune-financiere",
      name: "Richesse Personnelle (Wealthy)",
      type: "Matériel",
      cost: 3,
      impact: "wealthy",
      prerequisite: "3, 5 ou 8 pts",
      desc: "Votre maison contrôle des ateliers prospères, des rizières fertiles ou des comptoirs marchands.",
      rule: "Vous commencez avec une dotation financière additionnelle de 20 koku (3 pts), 50 koku (5 pts) ou 100 koku (8 pts) en surplus de votre équipement d'école."
    },
    {
      id: "adv-equipement-gaijin",
      name: "Équipement Gaijin (Gaijin Gear)",
      type: "Matériel",
      cost: 5,
      impact: "gaijin_gear",
      prerequisite: "4 pts pour la Mante et la Licorne",
      desc: "Vous possédez une merveille technique ou une arme exotique rapportée d'au-delà des frontières de l'Empire.",
      rule: "Vous démarrez la partie avec un objet étranger (longue-vue, sablier/montre mécanique, boussole, cimeterre yabanjin ou arme à poudre selon l'époque de la campagne)."
    }
  ];

  // =========================================================================
  // 2. TABLEAU DES DÉSAVANTAGES (Livre de Base p. 156-163 + Suppléments)
  // =========================================================================
  const DESAVANTAGES_LIST = [
    // --- DÉSAVANTAGES PHYSIQUES ---
    {
      id: "dis-borgne",
      name: "Borgne (Blind in One Eye)",
      type: "Physique",
      cost: 2,
      gain: 2,
      impact: "blind_one_eye",
      prerequisite: "Aucun",
      desc: "Une estafilade de katana ou une flèche perdue vous a privé d'un œil, réduisant votre vision du relief.",
      rule: "Pénalité de -1g0 à tous vos jets de Tir à l'arc (Kyujutsu), d'Armes de Jet et de Perception visuelle."
    },
    {
      id: "dis-aveugle",
      name: "Cécité Totale (Blind)",
      type: "Physique",
      cost: 9,
      gain: 9,
      impact: "blind",
      prerequisite: "Aucun",
      desc: "Vous êtes plongé dans une obscurité totale et perpétuelle.",
      rule: "Le ND de toutes vos actions physiques nécessitant la vue augmente de +15 à +30. Vous devez compenser vos actions par l'ouïe ou le toucher."
    },
    {
      id: "dis-boiteux",
      name: "Boiteux (Lame)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "lame",
      prerequisite: "Aucun",
      desc: "Un coup d'épieu mal consolidé ou une malformation vous fait traîner lourdement la jambe.",
      rule: "Votre Anneau d'Eau est considéré comme étant de 1 pour le calcul de vos Actions de Mouvement. Vos jets d'Athlétisme impliquant les jambes subissent -1g1."
    },
    {
      id: "dis-petit",
      name: "Petit (Small)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "small",
      prerequisite: "Incompatible avec Grand",
      desc: "Votre gabarit est nettement plus modeste que la moyenne des combattants rokuganis.",
      rule: "Chacun de vos Paliers de Blessures contient 1 point de vie en moins (Terre × 2 - 1 PV par niveau). Vous subissez une pénalité de -1g0 sur tous vos jets de dégâts au corps à corps."
    },
    {
      id: "dis-sante-fragile",
      name: "Santé Fragile (Bad Health)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "bad_health",
      prerequisite: "Aucun",
      desc: "Votre constitution physique est chancelante et sujette aux rechutes infectieuses.",
      rule: "Le ND de tous vos jets pour résister aux maladies, toxines, drogues ou aux rigueurs climatiques augmente de +10."
    },
    {
      id: "dis-seuil-douleur-bas",
      name: "Sensible à la Douleur (Low Pain Threshold)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "low_pain_threshold",
      prerequisite: "Incompatible avec Force de la Terre",
      desc: "La douleur des entailles vous fait perdre votre concentration plus vite que vos camarades.",
      rule: "Les pénalités de ND infligées par chacun de vos Paliers de Blessures sont augmentées de +5 (ex. Égratigné passe à +8, Blessé Léger à +10, etc.)."
    },
    {
      id: "dis-membre-manquant",
      name: "Membre Manquant (Missing Limb)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "missing_limb",
      prerequisite: "Spécifier le bras ou la jambe",
      desc: "Un duel terrible ou un assaut d'outre-muraille vous a privé d'un bras ou d'une jambe.",
      rule: "Pénalité de +10 à tous les ND des actions nécessitant l'usage du membre absent (manier une arme à deux mains, courir à pleine vitesse)."
    },
    {
      id: "dis-blessure-permanente",
      name: "Blessure Permanente (Permanent Wound)",
      type: "Physique",
      cost: 4,
      gain: 4,
      impact: "permanent_wound",
      prerequisite: "Vaut 5 pts pour les Bushi",
      desc: "Une vieille blessure gangrenée ou maudite ne s'est jamais totalement refermée.",
      rule: "Votre tout premier Palier de Blessures (Indemne / +0) est considéré comme toujours plein : vous débutez tout combat directement au palier Égratigné (+3)."
    },
    {
      id: "dis-maladroit",
      name: "Maladroit (Clumsy)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "clumsy",
      prerequisite: "Aucun",
      desc: "Vos mains tremblent ou vos appuis manquent de fluidité sous le coup du stress.",
      rule: "Tous vos jets d'Agilité ou basés sur le Trait Agilité subissent une pénalité de -1g0."
    },
    {
      id: "dis-mauvaise-vue",
      name: "Mauvaise Vue (Bad Eyesight)",
      type: "Physique",
      cost: 3,
      gain: 3,
      impact: "bad_eyesight",
      prerequisite: "Aucun",
      desc: "Votre vision floue peine à distinguer les silhouettes lointaines ou les textes trop fins.",
      rule: "Pénalité de -1g1 sur tous vos jets de Tir à l'arc (Kyujutsu) et vos jets de Perception visuelle au-delà de 6 mètres."
    },
    {
      id: "dis-faiblesse-trait",
      name: "Faiblesse Constitutionnelle (Weakness)",
      type: "Physique",
      cost: 6,
      gain: 6,
      impact: "weakness",
      prerequisite: "Choisir un Trait physique ou mental",
      desc: "Vous souffrez d'une carence congénitale profonde dans l'une de vos facultés d'action.",
      rule: "Le Trait sélectionné est traité comme s'il était réduit de 1 Rang pour tous les jets de dés et calculs dérivés (sans modifier le rang de l'Anneau)."
    },

    // --- DÉSAVANTAGES MENTAUX ---
    {
      id: "dis-impulsif",
      name: "Téméraire / Impulsif (Brash)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "brash",
      prerequisite: "Vaut 4 pts pour le Clan du Lion",
      desc: "Votre sang bout au moindre affront perçu : vous préférez tirer l'acier que reculer d'un pas.",
      rule: "Face à une insulte ou une provocation, vous devez réussir un jet de Volonté (en ajoutant votre Rang d'Honneur) ND 20, sous peine d'attaquer ou de défier votre offenseur sur-le-champ."
    },
    {
      id: "dis-incapable-mentir",
      name: "Incapable de Mentir (Can't Lie)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "cant_lie",
      prerequisite: "Aucun",
      desc: "Votre attachement viscéral à la franchise vous empêche de tromper délibérément votre prochain.",
      rule: "Vous ne pouvez pas proférer de mensonge intentionnel. Si quelqu'un ment en votre présence, vous devez réussir un jet de Volonté ND 20 pour ne pas le corriger publiquement."
    },
    {
      id: "dis-cupide",
      name: "Cupide (Greedy)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "greedy",
      prerequisite: "Vaut 4 pts pour le Clan de la Mante",
      desc: "Vous accordez une importance honteuse à l'or et aux marchandises, au mépris de la bienséance du bushi.",
      rule: "Tout adversaire cherchant à vous corrompre par Tentation (Pot-de-vin) bénéficie d'un bonus de +1g1 à son jet. Vous perdez le double d'Honneur pour tout acte vénal."
    },
    {
      id: "dis-naif",
      name: "Crédulité Naïve (Gullible)",
      type: "Mental",
      cost: 4,
      gain: 4,
      impact: "gullible",
      prerequisite: "Incompatible avec Pensée Claire",
      desc: "Vous accordez trop facilement votre confiance et prenez la parole d'autrui pour argent comptant.",
      rule: "Tout adversaire tentant de vous duper avec la compétence Sincérité (Tromperie) reçoit un bonus de +1g1 à son jet opposé."
    },
    {
      id: "dis-obsession",
      name: "Obsession Compulsive (Compulsion)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "compulsion",
      prerequisite: "Définir le vice (saké, jeu de dés, armes rares...)",
      desc: "Un besoin irrépressible d'assouvir une passion dévorante perturbe régulièrement vos devoirs.",
      rule: "Dès qu'une opportunité d'assouvir votre vice se présente, vous devez réussir un jet de Volonté ND 15 (ou ND 20 pour la version à 4 pts) sous peine d'y succomber sur l'heure."
    },
    {
      id: "dis-esprit-faible",
      name: "Volonté Fluctuante (Frail Mind)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "frail_mind",
      prerequisite: "Aucun",
      desc: "Vous avez peine à conserver votre lucidité face aux épreuves de force psychologiques.",
      rule: "Lors de tout jet opposé reposant sur le Trait Volonté, votre adversaire gagne un bonus de +2g0."
    },
    {
      id: "dis-idealiste",
      name: "Idéaliste Aveugle (Idealistic)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "idealistic",
      prerequisite: "Vaut 3 pts pour le Clan du Lion",
      desc: "Vous placez la barre morale du Bushidō si haut que la réalité politique brise vos illusions.",
      rule: "Chaque fois que vous subissez une perte de points d'Honneur, la perte réelle est augmentée de 1 point supplémentaire."
    },
    {
      id: "dis-obtus",
      name: "Esprit Obtus (Obtuse)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "obtuse",
      prerequisite: "Vaut 4 pts pour le Crabe et les Bushi",
      desc: "La poésie, la peinture et la subtilité des salons vous semblent une perte de temps inutile.",
      rule: "Le coût en points d'expérience (XP) pour monter n'importe quelle Compétence Noble (High Skill) autre que Vigilance ou Médecine est doublé."
    },
    {
      id: "dis-arrogant",
      name: "Excès de Confiance (Overconfident)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "overconfident",
      prerequisite: "Vaut 4 pts pour le Lion et la Mante",
      desc: "Votre haute estime de votre valeur martiale vous empêche d'admettre la supériorité ennemie.",
      rule: "Face à des ennemis nettement supérieurs en nombre ou en puissance, vous devez réussir un jet de Perception ND 20 pour accepter de battre en retraite ou de rompre le combat."
    },
    {
      id: "dis-phobie",
      name: "Phobie Panique (Phobia)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "phobia",
      prerequisite: "1, 2 ou 3 pts (Définir la source)",
      desc: "Une frayeur panique et irrationnelle vous paralyse à la vue de l'élément redouté.",
      rule: "En présence de l'objet de votre phobie, tous les ND de vos actions augmentent de +5 par tranche de 1 pt investi dans ce désavantage."
    },
    {
      id: "dis-amour-veritable",
      name: "Amour Véritable (True Love)",
      type: "Mental",
      cost: 3,
      gain: 3,
      impact: "true_love",
      prerequisite: "Définir l'être aimé",
      desc: "Votre cœur s'est lié pour toujours à un être que la raison et le devoir vous interdisent d'épouser.",
      rule: "Lorsque vous êtes contraint de choisir entre votre devoir de samouraï et la sauvegarde de votre amour, vous devez dépenser 1 point de Vide pour pouvoir obéir à vos ordres."
    },
    {
      id: "dis-obsede-but",
      name: "Obsédé par un Objectif (Driven)",
      type: "Mental",
      cost: 2,
      gain: 2,
      impact: "driven",
      prerequisite: "Définir l'objectif avec le MJ",
      desc: "Une quête personnelle ou un serment secret prime sur le devoir, la santé et l'honneur.",
      rule: "Refuser de poursuivre cet objectif lorsque l'occasion s'en présente vous inflige un malus temporaire de -1g1 sur tous vos jets jusqu'à ce que vous repreniez la traque."
    },

    // --- DÉSAVANTAGES SOCIAUX ---
    {
      id: "dis-antisocial",
      name: "Mœurs Antisociales (Antisocial)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "antisocial",
      prerequisite: "2 ou 4 pts (vaut 1 pt de plus pour le Crabe)",
      desc: "La compagnie de vos pairs vous irrite : votre comportement taciturne ou méprisant transparaît immédiatement.",
      rule: "Pénalité de -1g0 (version à 2 pts) ou de -1g1 (version à 4 pts) sur tous vos jets de Compétences Sociales."
    },
    {
      id: "dis-dette-honneur",
      name: "Dette d'Honneur (Obligation)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "obligation",
      prerequisite: "De 1 à 5 pts (Définir le seigneur créancier)",
      desc: "Un autre samouraï ou une famille influente a sauvé votre lignée et détient une créance morale totale sur vous.",
      rule: "Refuser un ordre émanant de votre bienfaiteur entraîne une perte d'Honneur immédiate égale au double de la valeur de ce désavantage."
    },
    {
      id: "dis-ennemi-jure",
      name: "Ennemi Juré (Sworn Enemy)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "sworn_enemy",
      prerequisite: "De 2 à 5 pts (Définir l'ennemi)",
      desc: "Un noble d'un clan rival ou un duelliste déshonoré s'est juré d'orchestrer votre chute.",
      rule: "Le meneur de jeu introduit régulièrement cet ennemi qui mobilise ressources et partisans pour entraver vos missions."
    },
    {
      id: "dis-secret-sombre",
      name: "Sombre Secret (Dark Secret)",
      type: "Social",
      cost: 4,
      gain: 4,
      impact: "dark_secret",
      prerequisite: "Définir l'infamie cachée",
      desc: "Un acte impardonnable de votre passé pèse comme une épée de Damoclès sur votre existence.",
      rule: "Si ce secret est révélé publiquement, vous serez banni de votre clan, déclaré ronin ou contraint d'accomplir le seppuku."
    },
    {
      id: "dis-libidineux",
      name: "Mœurs Libidineuses (Lechery)",
      type: "Social",
      cost: 2,
      gain: 2,
      impact: "lechery",
      prerequisite: "Aucun",
      desc: "Vous cédez avec trop d'empressement aux plaisirs de la chair et aux charmes des maisons de thé.",
      rule: "Tout jet de Tentation (Séduction) dirigé contre vous bénéficie d'un bonus de +1g1."
    },
    {
      id: "dis-infame",
      name: "Infâme (Infamous)",
      type: "Social",
      cost: 3,
      gain: 3,
      impact: "infamous",
      prerequisite: "Aucun",
      desc: "Votre nom est tristement associé à une défaite cuisante, une trahison suspectée ou un scandale retentissant.",
      rule: "Vous commencez la partie avec 1.0 Rang d'Infamie (Infamy) complet au lieu de la Gloire."
    },

    // --- DÉSAVANTAGES SPIRITUELS ---
    {
      id: "dis-souillure-outremonde",
      name: "Touché par la Souillure (Shadowlands Taint)",
      type: "Spirituel",
      cost: 4,
      gain: 4,
      impact: "shadowlands_taint",
      prerequisite: "Incompatible avec Âme Pure",
      desc: "L'ombre de Jigoku a déposé son venin spirituel dans votre flux vital.",
      rule: "Vous débutez la partie avec 0,5 Rang de Souillure de l'Outremonde (non détectable sans magie purificatrice à ce niveau)."
    },
    {
      id: "dis-malchanceux",
      name: "Malchance Maudite (Unlucky)",
      type: "Spirituel",
      cost: 2,
      gain: 2,
      impact: "unlucky",
      prerequisite: "2 pts par rang acheté",
      desc: "Les Fortunes détournent leur bénédiction au moment précis où votre sort bascule.",
      rule: "Par tranche de 2 points investis, le MJ peut vous contraindre une fois par session à relancer un jet réussi. Vous devez obligatoirement accepter et garder le résultat du nouveau jet, même s'il est inférieur."
    },
    {
      id: "dis-destin-sombre",
      name: "Destin Funeste (Dark Fate)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "dark_fate",
      prerequisite: "Accord du MJ",
      desc: "Votre destinée conduira un désastre majeur sur l'Empire avant que votre souffle ne s'éteigne.",
      rule: "Le destin vous garde en vie pour sceller cette tragédie : une fois par session, si vous deviez être tué sur le coup, vous êtes miraculeusement réduit à 1 PV au palier Mortel."
    },
    {
      id: "dis-courroux-kami",
      name: "Courroux des Kami (Wrath of the Kami)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "wrath_of_the_kami",
      prerequisite: "Choisir un Élément (Vaut 4 pts pour les Shugenja)",
      desc: "Les esprits d'un élément précis refusent votre amitié et se réjouissent de votre châtiment.",
      rule: "Tout sort hostile de l'élément choisi lancé contre vous bénéficie d'une Augmentation Gratuite sur son jet d'incantation."
    },
    {
      id: "dis-hante-ancetre",
      name: "Hanté par un Ancêtre (Haunted)",
      type: "Spirituel",
      cost: 3,
      gain: 3,
      impact: "haunted",
      prerequisite: "Aucun",
      desc: "Le spectre d'un aïeul vous poursuit nuit et jour en vous accablant de récriminations incessantes.",
      rule: "Pénalité de -1g0 à tous vos jets d'Initiative et jets de Vigilance lors de situations de stress ou de combat."
    },
    {
      id: "dis-momoku",
      name: "Âme Aveugle au Vide (Momoku)",
      type: "Spirituel",
      cost: 8,
      gain: 8,
      impact: "momoku",
      prerequisite: "Incompatible avec Shugenja ou Moines",
      desc: "Votre âme est imperméable à l'harmonie du Vide cosmique : vous êtes coupé de l'étincelle divine.",
      rule: "Vous possédez un Anneau de Vide de 2, mais vous ne disposez d'aucun point de Vide et ne pouvez jamais en acquérir ni en dépenser pour augmenter vos jets ou activer des facultés."
    }
  ];

  // =========================================================================
  // 3. INDEXATION ET LIAISONS
  // =========================================================================
  AVANTAGES_LIST.forEach((item) => {
    AVANTAGES_LIST[item.id] = item;
    AVANTAGES_LIST[item.name] = item;
  });

  DESAVANTAGES_LIST.forEach((item) => {
    DESAVANTAGES_LIST[item.id] = item;
    DESAVANTAGES_LIST[item.name] = item;
  });

  // =========================================================================
  // 4. EXPORT GLOBAL POUR LE GÉNÉRATEUR
  // =========================================================================
  const ADV_CONTAINER = {
    avantages: AVANTAGES_LIST,
    desavantages: DESAVANTAGES_LIST,
    advantages: AVANTAGES_LIST,
    disadvantages: DESAVANTAGES_LIST
  };

  if (typeof window !== "undefined") {
    window.AVANTAGES_DATA = ADV_CONTAINER;
    window.DESAVANTAGES_DATA = ADV_CONTAINER;
    window.TRAITS_DATA = [...AVANTAGES_LIST, ...DESAVANTAGES_LIST];

    window.L5R_DATA = window.L5R_DATA || {};
    window.L5R_DATA.avantages = AVANTAGES_LIST;
    window.L5R_DATA.desavantages = DESAVANTAGES_LIST;
    window.L5R_DATA.advantages = AVANTAGES_LIST;
    window.L5R_DATA.disadvantages = DESAVANTAGES_LIST;

    window.getAdvantages = function () {
      return ADV_CONTAINER;
    };
  }
})();
