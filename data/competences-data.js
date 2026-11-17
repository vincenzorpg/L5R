/**
 * Base de données complète des Compétences L5R 4e Édition — Les Chroniques de Rokugan
 * Exactement conforme au Livre de Base (pp. 133–145) et compléments officiels (Book of Air, Imperial Histories 1).
 * Note : Toutes les Compétences confèrent au Rang 10 une Augmentation Gratuite sur tous leurs jets (LdB p. 133).
 */

const COMPETENCES_DATA = [
  // ==========================================
  // COMPÉTENCES NOBLES (HIGH SKILLS — pp. 135–139)
  // ==========================================
  {
    name: "Artisanat (Artisan)",
    trait: "Intuition",
    type: "Noble",
    emphases: "Variable selon la sous-compétence (Bonsaï, Jardinage, Ikebana, Origami, Peinture, Poésie, Sculpture, Tatouage, Constructions de papier [Book of Air], Cerfs-volants décoratifs [Book of Air]...)",
    desc: "Macro-compétence regroupant les beaux-arts et disciplines nobles de Rokugan. Chaque spécialité est une compétence distincte.",
    masteries: "Aucune (R10 : 1 Augmentation Gratuite sur tous les jets)."
  },
  {
    name: "Calligraphie (Calligraphy)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Chiffre (Cipher), Haut Rokugani (High Rokugani)",
    desc: "Considérée comme Compétence d'Artisanat pour les effets visant l'Artisanat. Permet de tracer et déchiffrer des codes secrets (Chiffre) et d'utiliser la langue classique de la Cour Impériale (Haut Rokugani).",
    masteries: "R5 : +10 pour percer un code ou un chiffre. (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Cérémonie du Thé (Tea Ceremony)",
    trait: "Vide",
    type: "Noble",
    emphases: "Aucune",
    desc: "Dure 30 min dans un lieu calme (1 à 5 participants). Jet de Cérémonie du Thé / Vide (ND 15 + 5 par convive au-delà du 2e) : en cas de succès, tous les participants regagnent 1 Point de Vide dépensé.",
    masteries: "R5 : Tous les participants regagnent 2 Points de Vide au lieu d'1. (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Comédie (Acting)",
    trait: "Intuition",
    type: "Noble",
    emphases: "Clan, Genre, Profession",
    desc: "Compétence Sociale (compte aussi comme Art de la Scène / Perform). Se déguiser en anonyme de même Clan/genre/rôle = ND 15 (+5 par trait différent : Clan, genre, profession ; +15 supplémentaires pour imiter une personne précise ; Augmentations possibles). Percer le déguisement : Enquête/Perception ND 15 (+5 par Aug. du comédien).",
    masteries: "R3 : -5 au ND de déguisement • R5 : -10 (total) • R7 : -15 (total)."
  },
  {
    name: "Connaissance (Lore)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Variable selon la sous-compétence (Anatomie*, Architecture, Bushido, Clan Majeur [au choix], Éléments, Culture Gaijin [au choix], Fantômes, Héraldique, Histoire, Maho*, Nature, Culture Non-humaine [au choix], Présages, Outremonde*, Shugenja, Royaumes Spirituels, Théologie, Pègre*, Guerre... — * = Dégradante)",
    desc: "Macro-compétence regroupant l'érudition rokuganie (Héraldique pour reconnaître la Gloire, Bushido ND 30 pour discerner l'Honneur, Histoire, Théologie, etc.). Les sous-compétences marquées d'un astérisque (*) sont des Compétences Dégradantes.",
    masteries: "Aucune (R10 : 1 Augmentation Gratuite sur tous les jets)."
  },
  {
    name: "Connaissance : Art de la Guerre (Lore: War)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Stratégie, Tactique, Logistique",
    desc: "Sous-compétence d'érudition : histoire militaire, grands généraux, traités stratégiques (ex. Voie de l'Épée) et manœuvres de campagne.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Bushido (Lore: Bushido)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Code, Vertus",
    desc: "Sous-compétence d'érudition : préceptes du Bushido et détection du Rang d'Honneur d'un individu via Connaissance : Bushido / Intuition (ND 30, LdB p. 92).",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Esprits & Magie (Lore: Shugenja / Spirit Realms)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Kamis, Royaumes Spirituels, Traditions",
    desc: "Sous-compétence d'érudition : connaissance des traditions shugenja, rituels, kami et Royaumes Spirituels (Ningen-do, Tengoku, Yomi, etc.).",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Héraldique (Lore: Heraldry)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Mon, Lignée",
    desc: "Sous-compétence d'érudition : identification des familles, lignées et mon des Clans ; utilisée avec l'Intelligence (ND 50 − 5×Gloire) pour reconnaître un samouraï célèbre.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Histoire (Lore: History)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Époques, Lignée Impériale",
    desc: "Sous-compétence d'érudition : histoire officielle et secrète de l'Empire d'Émeraude, batailles passées et traités.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Théologie (Lore: Theology)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Fortunes, Tao de Shinsei",
    desc: "Sous-compétence d'érudition : culte des Fortunes, des Sept Tonnerres, du Tao de Shinsei et des ordres monastiques.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Droit (Lore: Law)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Loi Impériale, Charte d'Émeraude",
    desc: "Sous-compétence d'érudition (Law sous Lore en L5R 4e) : édits impériaux, droits et devoirs des Magistrats d'Émeraude ou de Clan.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Courtisan (Courtier)",
    trait: "Intuition",
    type: "Noble",
    emphases: "Commérages (Gossip), Manipulation, Rhétorique",
    desc: "Compétence Sociale (« attaque sociale ») : persuasion, joutes oratoires et rumeurs (Commérages : ND suggéré 10 + 5×Gloire cible − 5×votre Gloire ; Augmentations pour cacher la source).",
    masteries: "R3 : +3 Points de Réputation • R5 : +1g0 aux jets Opposés de Courtisan • R7 : +7 Points de Réputation supplémentaires (+10 total)."
  },
  {
    name: "Divination",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Astrologie, Kawaru",
    desc: "1 tentative par jour (ND 15 de base, présages vagues). Relance immédiate possible le même jour en dépensant 1 Point de Vide (+10 au ND).",
    masteries: "R5 : Une 2e tentative le même jour est possible sans dépenser de Point de Vide (+10 ND s'applique toujours)."
  },
  {
    name: "Enquête (Investigation)",
    trait: "Perception",
    type: "Noble",
    emphases: "Interrogatoire (Interrogation), Vigilance (Notice), Fouille (Search)",
    desc: "Indices, détection d'embuscades (Vigilance), déceler un mensonge (Interrogatoire vs Sincérité) et fouille. Un jet raté peut être retenté après au moins 1 heure (+15 au ND).",
    masteries: "R3 : 2e tentative de Fouille sans +15 ND • R5 : +5 au total des jets Opposés d'Enquête • R7 : 3e tentative de Fouille même après échec de la 2e."
  },
  {
    name: "Étiquette (Etiquette)",
    trait: "Intuition",
    type: "Noble",
    emphases: "Bureaucratie (Bureaucracy), Conversation, Politesse (Courtesy)",
    desc: "Compétence Sociale (« défense sociale ») : protocole, navigation administrative (Bureaucratie), sujets acceptables (Conversation ND 15+) et résistance à l'Intimidation, Tentation ou Courtisan (Politesse).",
    masteries: "R3 : +3 Points de Réputation • R5 : +1g0 aux jets Opposés d'Étiquette • R7 : +7 Points de Réputation supplémentaires (+10 total)."
  },
  {
    name: "Jeux de Société (Games)",
    trait: "Variable",
    type: "Noble",
    emphases: "Variable selon le jeu : Fortunes & Vents (Intuition), Go (Intelligence), Kemari (Agilité), Lettres (Intuition), Sadane (Intuition), Shogi (Intelligence)",
    desc: "Macro-compétence regroupant les passe-temps et jeux intellectuels/athlétiques de la noblesse. Chaque jeu constitue une compétence distincte associée à son Trait propre.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Médecine (Medicine)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Antidotes, Maladies (Disease), Herboristerie (Herbalism), Non-Humains (par race), Soins des Blessures (Wound Treatment)",
    desc: "Soins (Wound Treatment / Intelligence ND 15 avec Trousse de Médecine à 10 charges) : guérit 1g1 Blessures (+1g0 lancé par Augmentation, 1 seul dé gardé max) ; 1 seul jet par jour et par patient.",
    masteries: "R5 : Les Blessures soignées sur un jet réussi augmentent de +1g0."
  },
  {
    name: "Méditation (Meditation)",
    trait: "Vide",
    type: "Noble",
    emphases: "Jeûne (Fasting), Récupération du Vide (Void Recovery)",
    desc: "Récupération du Vide : 30 min ininterrompues (Méditation / Vide ND 20) restaurent 1 Point de Vide. Jeûne : Méditation / Constitution (ND 15 + 5/jour de jeûne) pour ignorer faim/soif.",
    masteries: "R3 : Restaure jusqu'à 2 Points de Vide • R5 : -5 au ND de Jeûne • R7 : Restaure jusqu'à 3 Points de Vide."
  },
  {
    name: "Art de la Scène / Représentation (Perform)",
    trait: "Variable",
    type: "Noble",
    emphases: "Macro-compétence Sociale : Biwa (Agilité), Danse (Agilité), Tambours (Agilité), Flûte (Agilité), Art Oratoire (Oratory — Intuition), Marionnettes (Agilité), Shamisen (Agilité), Chant (Intuition), Conte (Storytelling — Intuition)",
    desc: "Macro-compétence Sociale regroupant les arts du spectacle, de la musique et du discours (y compris l'Art Oratoire / Perform: Oratory). Chaque art s'achète séparément.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Oratoire (Perform: Oratory)",
    trait: "Intuition",
    type: "Noble",
    emphases: "Discours de bataille, Plaidoirie",
    desc: "Sous-compétence d'Art de la Scène (Perform: Oratory, Intuition) : discours enflammés, ralliement des troupes (Opportunité Héroïque ND 20) et éloquence publique.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Sincérité (Sincerity)",
    trait: "Intuition",
    type: "Noble",
    emphases: "Honnêteté (Honesty), Tromperie* (Deceit*)",
    desc: "Compétence Sociale. Honnêteté : convaincre de la vérité sans offenser. Tromperie* (marquée d'un astérisque = Compétence Dégradante) : mentir sciemment sans se trahir (opposé à Enquête).",
    masteries: "R5 : +5 au total de tous les jets Opposés de Sincérité."
  },
  {
    name: "Théurgie / Art de la Magie (Spellcraft)",
    trait: "Intelligence",
    type: "Noble",
    emphases: "Importuner (Importune), Recherche de Sorts (Spell Research)",
    desc: "Importuner compte comme Compétence Sociale lors du sort Communier. Recherche de Sorts : ND 10 + 10×Maîtrise (semaines d'étude = Maîtrise). Permet aussi le Contre-sort optionnel au rang 5+ (Book of Fire p. 182).",
    masteries: "R5 : +1g0 sur tous les Jets d'Incantation."
  },

  // ==========================================
  // COMPÉTENCES DE GUERRE (BUGEI SKILLS — pp. 139–143)
  // ==========================================
  {
    name: "Athlétisme (Athletics)",
    trait: "Force",
    type: "Bugei",
    emphases: "Escalade (Climbing), Course (Running), Natation (Swimming), Lancer (Throwing — Agilité)",
    desc: "Exploits physiques (Force) ou lancers d'armes/objets (Lancer utilise Agilité et compte comme attaque).",
    masteries: "R3 : Aucune pénalité en terrain Modéré ; en terrain Difficile Eau réduite de 1 (au lieu de 2) • R5 : Aucune pénalité de terrain • R7 : +1,5 m (5') à une Action de Déplacement par Round (max/Round inchangé)."
  },
  {
    name: "Art de la Guerre / Bataille (Battle)",
    trait: "Perception",
    type: "Bugei",
    emphases: "Combat de Masse (Mass Combat), Escarmouche (Skirmish)",
    desc: "Direction d'armées dans le système de Batailles Rangées (1d10 + Eau + Art de la Guerre ; généraux : Art de la Guerre [Combat de Masse] / Perception).",
    masteries: "R5 : Ajoute le rang d'Art de la Guerre au score d'Initiative en escarmouche."
  },
  {
    name: "Défense (Defense)",
    trait: "Réflexes",
    type: "Bugei",
    emphases: "Aucune",
    desc: "S'ajoute à l'Anneau d'Air au ND d'Armure en Posture Défense, et sert au jet Défense / Réflexes en Posture Défense Totale (moitié arrondie au supérieur).",
    masteries: "R3 : Peut conserver le résultat précédent de Défense/Réflexes si Défense Totale est maintenue • R5 : ND d'Armure augmenté de +3 en Postures Défense et Défense Totale • R7 : 1 Action Simple autorisée en Posture Défense Totale (aucune attaque)."
  },
  {
    name: "Équitation (Horsemanship)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Cheval de selle Gaijin (Gaijin Riding Horse), Poney Rokugani (Rokugani Pony), Destrier Utaku (Utaku Steed)",
    desc: "Contrôle d'une monture en terrain difficile, orage ou combat.",
    masteries: "R3 : Autorise la Posture Assaut à cheval • R5 : Monter = Action Simple (au lieu de Complexe), descendre = Gratuite (au lieu de Simple) • R7 : Monter = Action Gratuite."
  },
  {
    name: "Chasse (Hunting)",
    trait: "Perception",
    type: "Bugei",
    emphases: "Survie (Survival), Pistage (Tracking), Éclaireur / Balisage (Trailblazing)",
    desc: "Trouver vivres/abris (Survie), suivre des traces (Pistage) et tracer un chemin rapide en nature (Balisage). Chasse toujours à l'arc ou à la lance (jamais au daisho).",
    masteries: "R5 : +1g0 au total de tous les jets de Discrétion en milieu sauvage."
  },
  {
    name: "Iaijutsu",
    trait: "Réflexes",
    type: "Bugei",
    emphases: "Évaluation (Assessment), Concentration (Focus)",
    desc: "Art rituel du duel au sabre en 3 phases : Évaluation (Intuition vs 10 + 5×Rép. adverse), Concentration (Vide opposé) et Frappe (Réflexes vs ND Armure normal).",
    masteries: "R3 : Dégainer un katana est une Action Gratuite (au lieu de Simple) • R5 : +1 Augmentation Gratuite au jet d'Iaijutsu (Concentration) / Vide • R7 : +2g2 (au lieu de +1g1) au Focus si l'Évaluation dépasse l'adversaire de 10+."
  },
  {
    name: "Jiujutsu",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Lutte (Grappling), Armes Improvisées (Improvised Weapons), Arts Martiaux (Martial Arts)",
    desc: "Combat à mains nues (dégâts de base = Force g 1 ; Jiujutsu / Agilité pour toucher et initier une Lutte ; Force pour contrôler la Lutte).",
    masteries: "R3 : +1g0 aux dégâts à mains nues • R5 : +1 Augmentation Gratuite pour initier une Lutte • R7 : +0g1 supplémentaire (+1g1 total) aux dégâts à mains nues."
  },
  {
    name: "Armes (Macro-compétence)",
    trait: "Variable",
    type: "Bugei",
    emphases: "Toute arme hors catégories listées (ex. Arbalète gaijin Yobanjin)",
    desc: "Macro-compétence regroupant les compétences d'armes et toute arme exotique non couverte par les 9 compétences d'armes de base.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Armes à Chaîne (Chain Weapons)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Kusarigama, Kyoketsu-shogi, Manrikikusari",
    desc: "Maniement des armes à chaîne ou lestées (très répandu chez les Mantes).",
    masteries: "R3 : Permet d'initier une Lutte avec l'arme (LdB p. 89) • R5 : +1g0 aux jets Opposés contre cibles enchevêtrées ou en Lutte via l'arme • R7 : +1 Augmentation Gratuite pour Désarmement et Renversement."
  },
  {
    name: "Armes Lourdes (Heavy Weapons)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Dai Tsuchi, Masakari, Ono, Tetsubo",
    desc: "Tsubojutsu : armes à deux mains massives (emblématiques du Clan du Crabe).",
    masteries: "R3 : Réduit la Réduction de l'adversaire de 2 points • R5 : +1 Augmentation Gratuite pour Renversement • R7 : Les dés de dégâts explosent sur 9 et 10."
  },
  {
    name: "Kenjutsu",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Katana, Ninja-to, No-dachi, Parangu, Cimeterre (Scimitar), Wakizashi",
    desc: "Voie du sabre (katana, wakizashi et lames associées).",
    masteries: "R3 : +1g0 au total des dégâts avec un sabre • R5 : Dégainer un sabre est une Action Gratuite (au lieu de Simple) • R7 : Les dés de dégâts explosent sur 9 et 10."
  },
  {
    name: "Couteaux (Knives)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Aiguchi, Jitte, Kama, Sai, Tanto",
    desc: "Tantojutsu : dagues, couteaux et petites armes de parade.",
    masteries: "R3 : Ignore les malus d'arme en main secondaire • R5 : +1 Augmentation Gratuite pour Désarmement avec un saï ou jitte • R7 : +1 Augmentation Gratuite pour Attaque Supplémentaire avec tout couteau."
  },
  {
    name: "Kyujutsu (Tir à l'Arc)",
    trait: "Réflexes",
    type: "Bugei",
    emphases: "Dai-kyu, Han-kyu, Yumi",
    desc: "Tir à l'arc traditionnel (toutes flèches). Tirer sur une cible à portée de mêlée inflige -10 au total du jet d'attaque.",
    masteries: "R3 : Bander un arc devient une Action Simple (au lieu de Complexe) • R5 : Portée maximale de tout arc +50 % • R7 : Force de l'arc augmentée de +1."
  },
  {
    name: "Ninjutsu",
    trait: "Agilité ou Réflexes",
    type: "Bugei (Considérée Dégradante)",
    emphases: "Sarbacane (Blowgun), Shuriken, Tsubute",
    desc: "Compétence d'Arme considérée comme Dégradante (Low Skill) : armes dissimulées de shinobi (leurs dés de dégâts n'explosent pas par défaut).",
    masteries: "R3 : +1g0 dégâts • R5 : Les dés de dégâts explosent normalement sur 10 • R7 : +0g1 supplémentaire (+1g1 total) aux dégâts."
  },
  {
    name: "Armes d'Hast (Polearms)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Bisento, Nagamaki, Naginata, Sasumata, Sodegarami",
    desc: "Umayarijutsu : longues armes tranchantes montées sur hampe.",
    masteries: "R3 : +5 à l'Initiative au 1er Round d'escarmouche • R5 : +1g0 aux dégâts contre cibles montées ou nettement plus grandes • R7 : Dégainer/préparer devient une Action Gratuite."
  },
  {
    name: "Lances (Spears)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Mai Chong, Kumade, Lance de cavalerie (Lance), Nage-yari, Yari",
    desc: "Yarijutsu : armes d'estoc montées sur hampe (efficaces contre cavalerie et armures).",
    masteries: "R3 : Au 1er Round d'escarmouche, ignore 3 points de Réduction en mêlée • R5 : Portée max des attaques de lance à distance +1,5 m (5') • R7 : Dégainer/préparer devient une Action Gratuite."
  },
  {
    name: "Bâtons (Staves)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Bo, Jo, Machi-kanshisha, Nunchaku, Sang Kauw, Tonfa",
    desc: "Bojutsu : armes contondantes de bois ou moines. Les bonus d'armure au ND de la cible sont doublés contre les bâtons.",
    masteries: "R3 : Les bonus d'armure adverses ne sont plus doublés • R5 : +1 Augmentation Gratuite pour Renversement • R7 : Préparer un grand bâton = Action Gratuite ; petits bâtons gagnent +1g0 aux dégâts."
  },
  {
    name: "Éventail de Guerre (War Fan)",
    trait: "Agilité",
    type: "Bugei",
    emphases: "Aucune",
    desc: "Tessen : éventail de fer utilisé pour la signalisation et l'autodéfense.",
    masteries: "R3 : Aucun malus de main secondaire • R5 : +1 au ND d'Armure quand manié • R7 : +3 au ND d'Armure quand manié (total)."
  },
  {
    name: "Armes à feu (Firearms — Option Imperial Histories 1)",
    trait: "Intelligence",
    type: "Bugei (Considérée Dégradante)",
    emphases: "Pistolet (Pistol), Mousquet (Musket)",
    desc: "Optionnel (Ère du Cerf Blanc, réservé aux gaijin sauf accord MJ) : Compétence Dégradante pour tout Rokugani. Rechargement = 3 Actions Complexes.",
    masteries: "R5 : Recharger prend 1 Action Complexe en moins."
  },

  // ==========================================
  // COMPÉTENCES MARCHANDES (MERCHANT SKILLS — pp. 143–144)
  // ==========================================
  {
    name: "Dressage & Élevage (Animal Handling)",
    trait: "Intuition",
    type: "Marchande",
    emphases: "Par espèce (Chiens, Chevaux, Faucons...)",
    desc: "Domestiquer et entraîner des animaux (chiens de guerre Licorne, faucons, pigeons voyageurs, etc.). Entraîner pour voler/espionner peut compter comme Dégradante (Book of Air).",
    masteries: "R3 : Peut dresser des animaux pour autrui • R5 : Peut ordonner à son animal d'attaquer une cible (fuit si gravement blessé) • R7 : Ordres non verbaux."
  },
  {
    name: "Commerce",
    trait: "Intelligence",
    type: "Marchande",
    emphases: "Évaluation (Appraisal), Mathématiques (Mathematics)",
    desc: "Estimer la valeur d'objets et gérer impôts, tarifs douaniers et négoce.",
    masteries: "R5 : Peut augmenter ou diminuer le prix d'achat ou de vente d'un objet jusqu'à 20 %."
  },
  {
    name: "Artisanat Pratique (Craft)",
    trait: "Variable",
    type: "Marchande",
    emphases: "Macro-compétence : Armurerie# (Armorsmithing#), Forge (Blacksmithing), Facture d'arcs# (Bowyer#), Brassage, Charpenterie, Cartographie, Cordonnerie, Cuisine, Agriculture, Pêche, Maçonnerie, Mine, Poison*, Poterie, Construction navale, Couture, Forge d'armes# (Weaponsmithing#), Tissage, Cerfs-volants [Book of Air], Explosifs [Imperial Histories 1]...",
    desc: "Macro-compétence utilitaire. Les sous-compétences # sont aussi Nobles ; celles marquées * (comme Poison*) sont Dégradantes. Armurerie/Forge d'armes sont cruciales chez les Tsi, Kaiu et Agasha.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Ingénierie (Engineering)",
    trait: "Intelligence",
    type: "Marchande",
    emphases: "Construction, Siège (Siege)",
    desc: "Compte comme Compétence d'Artisanat Pratique (Craft). Architecture défensive et engins de siège (spécialité des ingénieurs Kaiu).",
    masteries: "R5 : +5 au total des jets d'Ingénierie Coopératifs ou Cumulatifs."
  },
  {
    name: "Navigation (Sailing)",
    trait: "Agilité ou Intelligence",
    type: "Marchande",
    emphases: "Matelotage (Knot-work), Navigation astronomique (Navigation)",
    desc: "Compte comme Compétence d'Artisanat Pratique (Craft). Manœuvre des navires et repérage en mer (sur terre : +10 ND).",
    masteries: "R5 : +5 au total des jets de Navigation Coopératifs ou Cumulatifs."
  },

  // ==========================================
  // COMPÉTENCES DÉGRADANTES (LOW SKILLS — pp. 144–145)
  // ==========================================
  {
    name: "Contrefaçon (Forgery)",
    trait: "Agilité",
    type: "Dégradante",
    emphases: "Par type d'objet (Œuvres d'art, Documents, Sceaux personnels...)",
    desc: "Compte comme Craft. Le résultat du jet fixe le ND d'Enquête / Perception pour détecter le faux.",
    masteries: "R3 : +1g0 à votre jet pour fixer le ND de détection • R5 : +1g0 aux jets pour détecter un faux d'autrui • R7 : +0g1 supplémentaire (+1g1 total) pour fixer le ND."
  },
  {
    name: "Intimidation",
    trait: "Intuition",
    type: "Dégradante",
    emphases: "Brutalité (Bullying), Contrôle (Control), Torture",
    desc: "Compétence Sociale. Jet Opposé contre Étiquette (Politesse) / Volonté de la cible (qui ajoute son Rang d'Honneur au total de son jet).",
    masteries: "R5 : +5 au total de tous les jets Opposés d'Intimidation."
  },
  {
    name: "Escamotage (Sleight of Hand)",
    trait: "Agilité",
    type: "Dégradante",
    emphases: "Dissimulation (Conceal), Évasion (Escape), Vol à la tire (Pick Pocket), Prestidigitation",
    desc: "Dissimuler/voler de petits objets (opposé à Enquête / Perception) ou se libérer de liens (ND 15–30 ou vs Navigation [Matelotage]).",
    masteries: "R5 : Peut utiliser Dissimulation pour cacher de petites armes."
  },
  {
    name: "Discrétion (Stealth)",
    trait: "Agilité",
    type: "Dégradante",
    emphases: "Embuscade (Ambush), Filature (Shadowing), Furtivité* (Sneaking*), Incantation discrète (Spell Casting)",
    desc: "Simple Move Action limitée à Eau pieds (×1 ou ×2/×3 avec Maîtrises). Furtivité (Sneaking) ne fait pas perdre d'Honneur (les autres Spécialisations si !). Embuscade : opposé à Enquête (Vigilance).",
    masteries: "R3 : Simple Move Action dissimulée = Eau × 1,5 m (5') • R5 : Simple Move Action dissimulée = Eau × 3 m (10') • R7 : Actions de Déplacement Gratuites normales tout en restant dissimulé."
  },
  {
    name: "Tentation (Temptation)",
    trait: "Intuition",
    type: "Dégradante",
    emphases: "Corruption (Bribery), Séduction",
    desc: "Compétence Sociale : exploiter vices, avidité ou désirs (opposé à Étiquette [Politesse] / Volonté).",
    masteries: "R5 : +5 au total de tous les jets Opposés de Tentation."
  },
  {
    name: "Poisons (Craft: Poison*)",
    trait: "Intelligence",
    type: "Dégradante",
    emphases: "Fabrication, Détection",
    desc: "Sous-compétence de Craft marquée Dégradante : préparation et dosage de toxines végétales, venins et poudres (LdB pp. 332–333).",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Outremonde (Lore: Shadowlands*)",
    trait: "Intelligence",
    type: "Dégradante",
    emphases: "Oni, Souillure, Territoires Maudits",
    desc: "Sous-compétence de Lore marquée Dégradante (exception pour les Kuni et chasseurs de sorcières) : créatures de Jigoku et effets de la Souillure.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  },
  {
    name: "Connaissance : Pègre (Lore: Underworld*)",
    trait: "Intelligence",
    type: "Dégradante",
    emphases: "Syndicats, Contrebande",
    desc: "Sous-compétence de Lore marquée Dégradante : réseaux criminels, receleurs et quartiers interdits.",
    masteries: "Aucune (R10 : +1 Aug. Gratuite)."
  }
];
if (typeof window !== "undefined") {
  window.COMPETENCES_DATA = COMPETENCES_DATA;
}
