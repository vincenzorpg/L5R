/**
 * CLANS_DATA — Familles & Écoles de Base de Rokugan (L5R 4e Édition)
 * Traduction fidèle et complète des textes officiels :
 * Livre de Base (Core Rulebook), The Great Clans, Emerald Empire,
 * Book of Air, Book of Earth, Book of Fire, Secrets of the Empire, Imperial Histories I & II.
 */
const CLANS_DATA = {

  // =========================================================================
  // 1. CLAN DU CRABE (Core pp. 105-108, 219 ; Great Clans p. 39-40 ; EE p. 247 ; IH1 p. 147)
  // =========================================================================
  crabe: {
    name: "Clan du Crabe",
    families: [
      { name: "Hida", trait: "Force", bonus: "+1 Force" },
      { name: "Hiruma", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Kaiu", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Kuni", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Toritaka", trait: "Perception", bonus: "+1 Perception" },
      { name: "Yasuki", trait: "Intuition", bonus: "+1 Intuition" }
    ],
    schools: [
      {
        id: "bushi-hida",
        family: "Hida",
        name: "Bushi Hida",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 3.5,
        skills: ["Athlétisme", "Défense", "Armes Lourdes (Tetsubo)", "Intimidation", "Kenjutsu", "Connaissance : Outremonde", "Une compétence Bugei au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Crabe (The Way of the Crab)", effect: "Vous pouvez ignorer les malus de ND dus au port d'une Armure Lourde pour toutes les compétences à l'exception de Discrétion. Lorsque vous maniez une Arme Lourde, vous gagnez un bonus de +1g0 au total de tous vos jets de dégâts." },
          { rank: 2, name: "La Montagne ne Bouge Pas (The Mountain Does Not Move)", effect: "Vous gagnez une Réduction de dégâts égale à votre Anneau de Terre." },
          { rank: 3, name: "Deux Pinces, Un Esprit (Two Pincers, One Mind)", effect: "Vous pouvez effectuer vos attaques par une Action Simple au lieu d'une Action Complexe lorsque vous maniez une Arme Lourde ou une arme portant le mot-clé Samouraï." },
          { rank: 4, name: "Coup Dévastateur (Devastating Blow)", effect: "Une fois par rencontre, lorsque vous maniez une Arme Lourde, vous pouvez porter une frappe calculée : réduisez la Réduction de l'ennemi de 4 pour cette attaque. Si l'attaque réussit, vous infligez l'état Hébété (Dazed) à la cible. La cible peut se remettre de cet Effet Conditionnel en réussissant un jet d'Anneau de Terre contre un ND égal à votre jet de dégâts durant la phase de Réactions de chaque Round ; le ND diminue de 5 chaque fois que la cible échoue à ce jet." },
          { rank: 5, name: "La Montagne ne Tombe Pas (The Mountain Does Not Fall)", effect: "Vous pouvez dépenser 1 point de Vide durant la phase de Réactions. Durant votre prochain Tour, vous pouvez agir comme si vous étiez au palier de Blessures Indemne, et vous ignorez les Effets Conditionnels Hébété (Dazed), Fatigué (Fatigued) et Sonné (Stunned). Les bénéfices de cette Technique durent jusqu'à la prochaine phase de Réactions." }
        ]
      },
      {
        id: "bushi-hiruma",
        family: "Hiruma",
        name: "Bushi Hiruma",
        type: "Bushi",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Kenjutsu (Katana)", "Kyujutsu", "Connaissance : Outremonde", "Discrétion", "Une compétence au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc avec 20 flèches ou Couteau, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Flamme de la Torche Vacille (Torch's Flame Flickers)", effect: "Lorsque vous adoptez la posture d'Attaque, vous gagnez un bonus de +1g0 au total de tous vos jets d'attaque. Vous maîtrisez la survie et faites durer toutes les rations de nourriture, d'eau et de jade deux fois plus longtemps pour un nombre de personnes égal à votre rang en Chasse." },
          { rank: 2, name: "La Petite Leçon du Loup (Wolf's Little Lesson)", effect: "Lorsque vous adoptez la posture d'Attaque, vous ajoutez +5 à votre ND d'Armure chaque fois que vous touchez un adversaire avec une arme de mêlée. Ce bonus peut se cumuler un nombre de fois égal à votre Rang d'École et dure jusqu'à la fin de l'escarmouche." },
          { rank: 3, name: "Ailes du Colibri (Hummingbird Wings)", effect: "Une fois par Round, vous pouvez activer cette Technique lorsqu'un adversaire vous cible avec une attaque : vous gagnez un bonus à votre ND d'Armure égal au double de votre Rang d'École pour cette attaque. Ce bonus se cumule avec tout autre bonus de ND d'Armure provenant d'autres sources (comme la dépense d'un point de Vide)." },
          { rank: 4, name: "Le Requin Sent le Sang (Shark Smells Blood)", effect: "Vous pouvez effectuer vos attaques par une Action Simple au lieu d'une Action Complexe lorsque vous maniez une arme portant le mot-clé Samouraï." },
          { rank: 5, name: "La Lumière du Jour ne Gaspille Aucun Mouvement (Daylight Wastes No Movement)", effect: "Si vous infligez plus de Blessures que nécessaire pour tuer votre adversaire, vous pouvez reporter l'excédent de Blessures sur la prochaine cible que vous touchez. Cette Technique ne peut pas s'activer deux attaques d'affilée, et l'effet de report ne dure pas au-delà de l'escarmouche en cours." }
        ]
      },
      {
        id: "shugenja-kuni",
        family: "Kuni",
        name: "Shugenja Kuni",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Calligraphie (Chiffre)", "Défense", "Connaissance : Outremonde 2", "Connaissance : Théologie", "Art de la Magie", "Une compétence d'arme au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Regard dans l'Ombre (Gaze Into Shadow)", effect: "Affinité : Terre / Déficience : Air. Sorts : Sens, Communion, Convocation, 3 Terre, 2 Feu, 1 Eau. Vous gagnez un bonus de +1g0 au total de tous vos jets d'Incantation lorsque la cible est une créature non-humaine, et tout sort infligeant des dégâts inflige +1g1 supplémentaires contre une cible portant la Souillure de l'Outremonde. Vous gagnez également une Augmentation Gratuite sur tout sort portant le mot-clé Jade." }
        ]
      },
      {
        id: "courtisan-yasuki",
        family: "Yasuki",
        name: "Courtisan Yasuki",
        type: "Courtisan",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 2.5,
        skills: ["Commerce (Évaluation)", "Courtisan", "Défense", "Étiquette", "Intimidation", "Sincérité (Tromperie)", "Une compétence Marchande au choix"],
        outfit: "Vêtements traditionnels, Wakizashi, Couteau, nécessaire de calligraphie, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Carpe (The Way of the Carp)", effect: "Vous gagnez une Augmentation Gratuite lorsque vous utilisez Commerce, et vous ne perdez ni Honneur ni Gloire en pratiquant ouvertement le Commerce. En parlant avec quelqu'un, vous pouvez effectuer un Jet Opposé de Commerce / Perception contre son Étiquette / Intuition pour discerner un objet matériel ou un service qu'il souhaite ou désire." },
          { rank: 2, name: "Fais Comme Nous Disons (Do As We Say)", effect: "Un nombre de fois par session égal à votre Rang d'École, vous pouvez relancer un jet raté de Sincérité ou d'Intimidation ; vous devez conserver le résultat du second jet." },
          { rank: 3, name: "Trésors de la Carpe (Treasures of the Carp)", effect: "Vous pouvez lancer Commerce / Intuition contre ND 20 pour localiser et acquérir un objet rare ou utile pour quelqu'un d'autre (à la discrétion du MJ) ; vous pouvez déclarer des Augmentations pour obtenir des objets de meilleure qualité ou plus rares." },
          { rank: 4, name: "Ruses de la Carpe (Wiles of the Carp)", effect: "Quiconque effectue un jet de Compétence Sociale dans le but de vous mentir ou de vous tromper voit son ND augmenté d'un montant égal à 5 × votre Rang d'École." },
          { rank: 5, name: "Ce qui est à Toi est à Moi (What is Yours is Mine)", effect: "Si vous connaissez un bien matériel dont quelqu'un a besoin et que vous vous arrangez pour le lui procurer, vous gagnez un bonus de +5g0 à tous vos Jets Sociaux Opposés contre cette personne pendant les 24 heures suivantes." }
        ]
      },
      {
        id: "toritaka-bushi",
        family: "Toritaka",
        name: "Bushi Toritaka (Core p. 219 / Clan du Faucon)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 5.5,
        skills: ["Dressage (Faucons)", "Chasse 2", "Kenjutsu", "Connaissance : Royaumes Spirituels", "Lances", "Une compétence au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, une arme au choix, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Les Yeux du Faucon (The Falcon's Eyes)", effect: "Vous ajoutez +1g0 à tous vos jets de Compétence ou de Trait purs impliquant le Trait Perception. De plus, lorsque vous frappez une créature issue d'un autre Royaume Spirituel (y compris oni de Jigoku et esprits affamés de Gaki-do), vous ajoutez +1g0 à tous vos jets de dégâts." },
          { rank: 2, name: "Le Faucon Prend son Envol (The Falcon Takes Flight)", effect: "Vous pouvez tenter de détecter la présence de créatures d'autres Royaumes Spirituels en réussissant un jet de Trait de Perception contre un ND égal à l'Anneau d'Air de la créature × 5." },
          { rank: 3, name: "Les Ailes du Faucon (The Falcon's Wings)", effect: "Vous pouvez effectuer vos attaques par une Action Simple au lieu d'une Action Complexe lorsque vous maniez une lance ou une arme portant le mot-clé Samouraï." },
          { rank: 4, name: "Vigilant et Fort (Vigilant and Strong)", effect: "Vous pouvez dépenser 1 point de Vide pour annuler tout malus d'obscurité ou d'aveuglement jusqu'à la phase de Réactions deux Rounds plus tard." },
          { rank: 5, name: "Serres du Faucon (Claws of the Falcon)", effect: "Vos attaques ignorent jusqu'à 5 points de Réduction de l'adversaire. Contre les créatures d'autres Royaumes Spirituels, vous pouvez dépenser 1 point de Vide par une Action Gratuite pour réduire leur Réduction de 10 durant un Round." }
        ]
      },
      {
        id: "ingenieur-kaiu",
        family: "Kaiu",
        name: "Ingénieur Kaiu (Great Clans p. 39)",
        type: "Bushi",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Art de la Guerre", "Artisanat : Armurerie", "Artisanat : Forge d'Armes", "Défense", "Ingénierie", "Connaissance : Architecture", "Éventails de Guerre"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, Arme Lourde ou Éventail de Guerre, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Méthode Kaiu (The Kaiu Method)", effect: "Vous gagnez un bonus de +1g0 sur tous vos jets de Compétences d'École. Lorsque vous dépensez 1 point de Vide pour augmenter un jet de Compétence d'École, vous gagnez +2g2 au lieu de +1g1 (non cumulatif)." },
          { rank: 2, name: "La Voie de la Pierre (The Path of Stone)", effect: "Lors de la construction d'un grand édifice (taille d'un temple ou plus), vous pouvez réussir un jet d'Ingénierie ND 25 pour ajouter Rang d'École × 100 Blessures à la structure. En outre, lorsque vous commandez une arme de siège, vous pouvez relancer une fois chaque dé de dégâts obtenant un résultat inférieur à votre Rang d'École." },
          { rank: 3, name: "La Voie de la Carapace (The Path of the Shell)", effect: "Lorsque vous fabriquez une armure, vous pouvez doubler le temps et le coût de fabrication afin d'ajouter votre Rang d'École à sa Réduction et la moitié de votre Rang d'École (arrondi au supérieur) à son bonus au ND d'Armure." },
          { rank: 4, name: "La Voie de la Guerre (The Path of War)", effect: "Lorsque vous lancez sur la Table des Batailles de Masse, vous pouvez modifier le résultat (à la hausse ou à la baisse) d'un montant supplémentaire égal à la moitié de votre Rang d'École. De plus, lorsque vous combattez avec un katana, un dai-tsuchi ou un éventail de guerre, vous attaquez par une Action Simple." },
          { rank: 5, name: "La Voie de l'Acier (The Path of Steel)", effect: "Lorsque vous forgez une arme, vous pouvez lui conférer en permanence soit +1g0 aux jets d'attaque, soit +0g1 aux jets de dégâts. S'il s'agit d'un katana, vous pouvez dépenser tous vos points de Vide (minimum 1) pour rendre la lame Incassable (comme Lame Kaiu), vous empêchant de récupérer des points de Vide pendant une semaine." }
        ]
      },
      {
        id: "kuni-witch-hunter",
        family: "Kuni",
        name: "Chasseur de Sorciers Kuni (Great Clans p. 40)",
        type: "Moine",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 5.5,
        skills: ["Enquête", "Jiujutsu", "Kenjutsu", "Connaissance : Outremonde", "Connaissance : Maho", "Méditation", "Une compétence au choix"],
        outfit: "Vêtements robustes, Daisho, Couteau, Pendentif de Jade, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Voir les Ténèbres (To See the Darkness)", effect: "Par une Action Complexe en fixant une personne tout en tenant votre pendentif de jade, effectuez un Jet Opposé d'Enquête (Interrogatoire) / Intuition contre sa Sincérité (Tromperie) / Volonté (+1g0 par rang complet de Souillure de la cible) pour sentir la Souillure et sa force approximative. De plus, vous gagnez +1g1 aux jets pour résister à la Souillure et aux attaques contre des créatures de l'Outremonde ou cibles connues comme Souillées." },
          { rank: 2, name: "Chevaucher les Ténèbres (To Ride the Darkness)", effect: "Face à une créature de l'Outremonde, par une Action Gratuite, lancez Connaissance : Outremonde / Intelligence contre ND 20 pour vous rappeler une force ou une faiblesse spécifique (1 supplémentaire par Augmentation)." },
          { rank: 3, name: "Frapper les Ténèbres (To Strike the Darkness)", effect: "Vous pouvez attaquer en mêlée par une Action Simple lorsque votre adversaire est une créature de l'Outremonde ou est connu comme Souillé." },
          { rank: 4, name: "Repousser les Ténèbres (To Repel the Darkness)", effect: "Vous gagnez +3g0 aux jets de vos Techniques de Rang 1 (détection) et Rang 2. De plus, vous apprenez 1 Kiho (sans compter dans la limite habituelle si la règle optionnelle est active, tout en respectant ses prérequis)." },
          { rank: 5, name: "Détruire les Ténèbres (To Destroy the Darkness)", effect: "Vous gagnez un bonus de +4g1 à vos jets d'attaque et de dégâts contre les créatures de l'Outremonde et les ennemis connus comme Souillés (cumulatif avec le bonus d'attaque de Rang 1)." }
        ]
      },
      {
        id: "hida-pragmatist",
        family: "Hida",
        name: "Pragmatiste Hida / Kobo Ichi-Kai (Emerald Empire p. 247)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 2.5,
        skills: ["Athlétisme", "Défense", "Jiujutsu (Armes Improvisées) 2", "Kenjutsu", "Connaissance : Outremonde", "Une compétence Bugei au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Pierre Éternelle Déchaînée (The Eternal Stone Unleashed)", effect: "Vous gagnez +1g0 aux jets de résistance à l'Intimidation ou à la Peur, ainsi qu'un bonus de +1g0 à vos jets d'attaque et de dégâts à mains nues ou avec des armes improvisées (vous devez toujours garder les dés les plus élevés sur les jets bénéficiant de cette Technique)." },
          { rank: 2, name: "Éroder la Montagne (Wearing Down the Mountain)", effect: "À mains nues ou avec une arme improvisée, vous pouvez effectuer la manœuvre Attaque Supplémentaire pour seulement 3 Augmentations au lieu de 5." },
          { rank: 3, name: "Fureur de l'Avalanche (Fury of the Avalanche)", effect: "Vous attaquez par une Action Simple à mains nues, avec une arme improvisée ou avec une arme portant le mot-clé Samouraï." },
          { rank: 4, name: "La Pierre Écarte l'Acier (Stone Turns Steel Aside)", effect: "Un nombre de fois par escarmouche égal à votre Anneau de Vide, juste après une attaque de mêlée contre vous (après les dégâts si elle touche), utilisez une Action Gratuite pour faire un Jet Opposé de Jiujutsu / Agilité contre Compétence d'arme / Agilité de l'ennemi : en cas de succès, vous frappez aussitôt l'ennemi avec sa propre arme (en utilisant votre propre Force pour les dégâts ; Augmentations possibles pour Dégâts Supplémentaires ; inutilisable en duel iaijutsu)." },
          { rank: 5, name: "Combattre jusqu'au Bout (Fight to the End)", effect: "Au début de votre Tour, dépensez 1 point de Vide pour effectuer une attaque en Action Complexe ignorant tous vos malus de Blessures (y compris À terre et Hors de combat), d'États et de Désavantages physiques, avec un bonus de +3g1 aux dégâts." }
        ]
      },
      {
        id: "hiruma-scout",
        family: "Hiruma",
        name: "Éclaireur Hiruma (Imperial Histories I p. 147)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse", "Kenjutsu", "Kyujutsu", "Connaissance : Outremonde", "Discrétion (Furtivité)", "Une compétence Bugei au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc avec 20 flèches ou Couteau, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Danser sur le Fil du Rasoir (Dance the Razor's Edge)", effect: "Ajoutez votre rang en Discrétion à vos jets d'Initiative (sauf surprise/inconscient). Doublez la durée des rations de nourriture, eau et jade pour un nombre de personnes égal à votre rang de Chasse. Dans l'Outremonde, vous gagnez +1g0 en Discrétion et savez toujours où se trouve l'Empire et sa distance approximative." },
          { rank: 2, name: "Courir comme le Vent (Run Like the Wind)", effect: "Vous pouvez faire des Actions de Déplacement Gratuites et Simples en posture de Défense Totale. Vous pouvez courir à vive allure pendant Constitution + Rang d'École heures avant d'être Épuisé jusqu'à 1 heure de repos." },
          { rank: 3, name: "Voile des Esprits (Veil of the Spirits)", effect: "Tant que vous restez immobile à couvert/camouflé, dépensez 1 point de Vide pour ajouter votre Rang d'École en dés gardés à votre jet de Discrétion jusqu'à ce que vous bougiez ou fassiez du bruit." },
          { rank: 4, name: "Maîtriser le Vent (Harness the Wind)", effect: "Attaques par Action Simple avec toute arme Samouraï, Couteau ou Arc (et avec toute arme contre une créature de l'Outremonde ou un non-humain connu comme Souillé)." },
          { rank: 5, name: "Frappe du Traqueur (Strike of the Stalker)", effect: "Contre une cible surprise ou qui n'a pas conscience de votre présence, vos Augmentations ne sont pas limitées par votre Vide et vous ignorez 10 points de Réduction (quelle qu'en soit la source)." }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. CLAN DE LA GRUE (Core pp. 109-111 ; Great Clans p. 70-73 ; EE p. 170)
  // =========================================================================
  grue: {
    name: "Clan de la Grue",
    families: [
      { name: "Asahina", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Daidoji", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Doji", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Kakita", trait: "Agilité", bonus: "+1 Agilité" }
    ],
    schools: [
      {
        id: "duelliste-kakita",
        family: "Kakita",
        name: "Bushi Kakita (Duelliste)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 6.5,
        skills: ["Étiquette", "Iaijutsu (Focus)", "Kenjutsu", "Kyujutsu", "Sincérité", "Cérémonie du Thé", "Une compétence Bugei ou Noble au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Grue (The Way of the Crane)", effect: "Vous ajoutez deux fois votre rang en Iaijutsu à tous vos jets d'Initiative. Vous gagnez un bonus de +1g1 plus votre Rang d'École au total de tous vos jets d'attaque et de Focus lorsque vous adoptez la posture du Centre (ce bonus s'applique également durant le Round de combat suivant celui où vous avez adopté la posture du Centre)." },
          { rank: 2, name: "Vitesse de l'Éclair (Speed of Lightning)", effect: "Vous gagnez un bonus de +2g0 au total de tous vos jets d'attaque contre les adversaires ayant une Initiative inférieure à la vôtre." },
          { rank: 3, name: "La Première et la Dernière Frappe (First and Last Strike)", effect: "Vous pouvez Frapper en premier dans un duel iaijutsu si vous remportez le jet d'Iaijutsu / Vide par un écart de 3 ou plus. Vous gagnez une Augmentation Gratuite à votre Frappe pour chaque marge supplémentaire de 3 au lieu de 5." },
          { rank: 4, name: "Une Frappe, Deux Coupes (One Strike, Two Cuts)", effect: "Vous pouvez effectuer vos attaques par une Action Simple au lieu d'une Action Complexe lorsque vous maniez une arme portant le mot-clé Samouraï." },
          { rank: 5, name: "Frapper sans Penser (Strike With No Thought)", effect: "Vous pouvez effectuer une Action Simple par Tour tout en adoptant la posture du Centre (y compris une Action de Déplacement, contournant la restriction normale de cette posture). Vous bénéficiez des avantages de la posture du Centre le Tour même où vous l'adoptez au lieu du suivant, et vous pouvez rester en posture du Centre autant de Tours consécutifs que vous le souhaitez." }
        ]
      },
      {
        id: "guerrier-daidoji",
        family: "Daidoji",
        name: "Guerrier de Fer Daidoji",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 6.5,
        skills: ["Art de la Guerre", "Défense 2", "Iaijutsu", "Kenjutsu (Katana)", "Kyujutsu", "Une compétence au choix"],
        outfit: "Armure légère ou lourde, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "La Force de l'Honneur (The Force of Honor)", effect: "Vous gagnez un bonus égal à votre Rang d'Honneur (arrondi à l'entier inférieur) moins 4 à vos Blessures à chaque palier de Blessures (avec un bonus minimum de +1 par palier). De plus, vous gagnez un bonus de +1g0 au total de tous vos jets d'attaque lorsque vous êtes en posture d'Attaque." },
          { rank: 2, name: "Le Bouclier de la Foi (The Shield of Faith)", effect: "Lorsque vous effectuez la manœuvre Garde (Guard), ses effets durent un Round supplémentaire. De plus, le bonus au ND d'Armure de votre manœuvre Garde augmente de +5 (vous ne subissez donc aucun malus au ND d'Armure en gardant, et votre protégé gagne +15 au lieu de +10)." },
          { rank: 3, name: "Frapper sous le Voile (Strike Beneath the Veil)", effect: "Vous pouvez effectuer vos attaques de mêlée par une Action Simple au lieu d'une Action Complexe lorsque vous êtes en posture d'Attaque." },
          { rank: 4, name: "Vigilance d'Esprit (Vigilance of Mind)", effect: "Vous pouvez dépenser 1 point de Vide durant la phase de Réactions pour cibler un adversaire ayant tenté de vous frapper ou de frapper votre protégé durant le Round : vous gagnez +2g1 à tous vos jets d'attaque et de dégâts contre cet adversaire durant le Round suivant." },
          { rank: 5, name: "Fouler le Fil de l'Épée (To Tread on the Sword)", effect: "Lorsque quelqu'un déclare une action contre la cible de votre manœuvre Garde, vous pouvez dépenser 2 points de Vide par une Action Gratuite pour devenir la cible de l'action à sa place (à la discrétion du MJ si c'est légal) et obtenir une Action Gratuite immédiate dédiée uniquement à vous déplacer vers votre protégé (sans effet si vous ne pouvez pas l'atteindre)." }
        ]
      },
      {
        id: "courtisan-doji",
        family: "Doji",
        name: "Courtisan Doji",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Calligraphie", "Courtisan (Manipulation)", "Étiquette (Courtoisie)", "Art de la Scène : Conteur", "Sincérité", "Cérémonie du Thé", "Une compétence d'Artisanat ou d'Art de la Scène au choix"],
        outfit: "Vêtements extravagants, Wakizashi, 1 arme au choix, nécessaire de calligraphie, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "L'Âme de l'Honneur (The Soul of Honor)", effect: "Tant que votre Rang d'Honneur est de 6.0 ou supérieur, vous gagnez une Augmentation Gratuite sur tous vos jets de Courtisan, Sincérité et Étiquette. En conversant quelques minutes avec quelqu'un, vous pouvez faire un Jet Opposé de Courtisan (Manipulation) / Intuition contre son Étiquette (Courtoisie) / Intuition pour découvrir s'il a besoin d'une faveur ou d'une aide." },
          { rank: 2, name: "Parler en Silence (Speaking in Silence)", effect: "Vous maîtrisez la Cadence. Vous pouvez lancer Courtisan / Intelligence contre ND 15 pour transmettre des idées simples à toute autre Grue formée à cette École ou possédant au moins 5 rangs en Courtisan (des messages plus complexes peuvent être transmis avec des Augmentations)." },
          { rank: 3, name: "Le Cadeau Parfait (The Perfect Gift)", effect: "En cour ou en zone urbaine, lancez Courtisan / Intuition contre ND 20 pour trouver un présent ou une faveur utile pour autrui (des Augmentations permettent d'obtenir des présents/faveurs plus rares ou puissants). S'il est accepté, vous gagnez immédiatement cette personne comme Allié avec 1 point de Dévotion sans coût en XP (sous réserve d'accord du MJ)." },
          { rank: 4, name: "La Voix de l'Honneur (Voice of Honor)", effect: "Dans tout débat ou dispute, faites un Jet Opposé de Courtisan (Manipulation) / Intuition contre Étiquette (Courtoisie) / Intuition de l'adversaire : s'il perd, il est contraint d'admettre que sa position s'oppose aux exigences de l'Honneur et du Bushido, et s'il persiste il commet une rupture d'étiquette (mineure ou majeure selon le MJ)." },
          { rank: 5, name: "Le Don de la Dame (The Gift of the Lady)", effect: "Après avoir conversé quelques minutes avec une cible, faites un Jet Opposé de Courtisan (Manipulation) / Intuition contre son Étiquette (Courtoisie) / Volonté (+5g0 si la cible est un Allié) : en cas de succès, vous orientez favorablement ses émotions afin qu'elle suive vos conseils tant qu'ils ne contredisent pas ses loyautés fondamentales." }
        ]
      },
      {
        id: "shugenja-asahina",
        family: "Asahina",
        name: "Shugenja Asahina",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Une compétence d'Artisanat au choix", "Calligraphie (Chiffre)", "Étiquette", "Connaissance : Théologie", "Méditation", "Art de la Magie", "Une compétence Noble au choix"],
        outfit: "Robes, Bo, Wakizashi, Sacoche à parchemins, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "La Grâce de l'Âme (The Soul's Grace)", effect: "Affinité : Air / Déficience : Feu. Sorts : Sens, Communion, Convocation, 3 Air, 2 Eau, 1 Terre. Vous pouvez dépenser 1 point de Vide pour réduire de 0g1 le total de tous les jets de dégâts infligés par vos adversaires dans un rayon de 6 mètres (20') autour de vous pendant un nombre de Rounds égal à votre Rang d'École (réactiver la Technique réinitialise la durée sans cumuler le malus). Vous gagnez également une Augmentation Gratuite sur tout sort portant le mot-clé Défense." }
        ]
      },
      {
        id: "daidoji-scout",
        family: "Daidoji",
        name: "Éclaireur Daidoji (Great Clans p. 70)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 3.5,
        skills: ["Athlétisme", "Chasse (Pièges)", "Kenjutsu", "Couteaux", "Kyujutsu (Yumi)", "Discrétion (Furtivité)", "Une compétence Bugei ou Dégradante au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc, Couteau, 1 arme au choix, équipement de piégeage, peinture de camouflage, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Observer le Terrain (Surveying the Land)", effect: "Vous gagnez +1g0 à vos jets de Discrétion et de Chasse. Tout piège rural ou improvisé que vous fabriquez inflige +1g1 dégâts supplémentaires." },
          { rank: 2, name: "Scruter les Ombres (Scouring the Shadows)", effect: "Lorsque vous attaquez un adversaire qui n'a pas conscience de votre présence, vous gagnez +2g0 à votre jet d'attaque." },
          { rank: 3, name: "Affaiblir la Résistance (Weaken the Resistance)", effect: "Vous pouvez ignorer toute Réduction provenant de l'armure portée ou des Techniques d'École de l'adversaire (pas la Réduction naturelle ni magique). Si votre cible n'a pas de Réduction d'armure ou de Technique, vous gagnez +1g0 aux dégâts." },
          { rank: 4, name: "Frapper et Bouger (Strike and Move)", effect: "Vous attaquez par une Action Simple avec katana, wakizashi, couteau ou arc. Vos pièges infligent désormais +2g1 dégâts supplémentaires." },
          { rank: 5, name: "Ruse de Daidoji (Cunning of Daidoji)", effect: "Durant une escarmouche, dépensez 1 point de Vide par Action Gratuite pour votre prochaine attaque (une fois par Tour max) : toute Manœuvre coûte 1 Augmentation de moins (min 1) et vous gagnez +1g1 aux dégâts si elle touche ; de plus, si la cible n'a pas conscience de vous, vos Augmentations ne sont pas limitées par votre Vide." }
        ]
      },
      {
        id: "kakita-artisan",
        family: "Kakita",
        name: "Artisan Kakita (Great Clans p. 72)",
        type: "Artisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 5.5,
        skills: ["Courtisan", "Jeux : Sadane", "Étiquette", "Sincérité", "Trois compétences au choix (Comédie, Artisanat ou Art de la Scène)"],
        outfit: "Robes de cour, beaux vêtements, Wakizashi, matériel d'art, éventail, Poney de Rokugan, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Âme de l'Artisan (Soul of the Artisan)", effect: "Choisissez l'une de vos 3 compétences artistiques comme art de prédilection : vous gagnez +2g0 à ses jets et vos Augmentations n'y sont pas limitées par votre Vide. Vous gagnez 1 Augmentation Gratuite avec Jeux : Sadane pour critiquer l'art d'autrui." },
          { rank: 2, name: "Le Rêve de l'Âme (The Soul's Dream)", effect: "Lors d'une représentation publique de votre art choisi, Jet Opposé [Art choisi] / Intuition contre Étiquette (Courtoisie) / Volonté de l'auditoire : les perdants voient leurs émotions orientées dans le sens désiré pendant un nombre d'heures égal à votre Rang de Réputation." },
          { rank: 3, name: "Libérer l'Esprit (Free the Spirit)", effect: "Choisissez une deuxième compétence artistique d'École comme art de prédilection ; le bonus à vos jets d'art choisi passe à +2g1." },
          { rank: 4, name: "Nom Impérissable (Undying Name)", effect: "Créez une œuvre évoquant autrui avec [Art choisi] / Intuition contre ND 20 + 5 × Rang de Gloire de la cible (Rang de Statut de la cible <= votre Gloire ou Statut) : augmentez ou diminuez sa Gloire de 5 points (+5 par Augmentation), ou infligez un gain d'Infamie pour 2 Augmentations supplémentaires (1 fois tous les 6 mois par cible)." },
          { rank: 5, name: "Un Présent Inestimable (A Gift Beyond Price)", effect: "Une fois par mois, offrez une œuvre de votre art choisi à un membre d'un autre clan/faction : Jet Opposé [Art choisi] / Intuition contre Étiquette (Courtoisie) / Volonté pour orienter de façon permanente son attitude envers votre clan/faction (en cas d'échec, elle devient durablement hostile ; max 1 fois par an par personne)." }
        ]
      },
      {
        id: "doji-magistrate",
        family: "Doji",
        name: "Magistrat Doji (Emerald Empire p. 170)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 5.5,
        skills: ["Défense", "Équitation", "Jiujutsu", "Kenjutsu", "Couteaux (Jitte)", "Armes d'Hast", "Une compétence Noble ou Bugei au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme (ou 2 Couteaux), nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Tempérer l'Acier par l'Honneur (Temper Steel with Honor)", effect: "Vous ajoutez votre Anneau d'Air à votre ND d'Armure (sauf sans défense ou pris par surprise). Vous gagnez +1g0 aux jets d'attaque avec un jitte ou un sasumata." },
          { rank: 2, name: "Couler comme l'Eau (Flowing Like Water)", effect: "Lorsque vous lancez pour contrôler un Corps-à-corps (Grapple) ou résoudre une tentative de Désarmement, vous pouvez utiliser le Rang de Force de votre adversaire à la place du vôtre." },
          { rank: 3, name: "Souffle de la Loi (Breath of the Law)", effect: "Si vous réussissez un Corps-à-corps (Grapple) ou un Désarmement contre un adversaire, il est également Hébété (Dazed)." },
          { rank: 4, name: "Couler comme l'Air (Flowing Like Air)", effect: "Vous attaquez par une Action Simple à mains nues, avec un jitte, un sasumata ou une arme portant le mot-clé Samouraï." },
          { rank: 5, name: "Le Saule dans la Tempête (The Willow in the Storm)", effect: "Dépensez 1 point de Vide durant la phase de Réactions : quiconque vous attaque au Round suivant doit soustraire son Anneau d'Air à chacun de ses dés (inutilisable en posture d'Assaut ou du Centre)." }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. CLAN DU DRAGON (Core pp. 112-116 ; EE p. 221 ; IH1 p. 214-215)
  // =========================================================================
  dragon: {
    name: "Clan du Dragon",
    families: [
      { name: "Kitsuki", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Mirumoto", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Tamori", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Togashi", trait: "Réflexes", bonus: "+1 Réflexes" }
    ],
    schools: [
      {
        id: "bushi-mirumoto",
        family: "Mirumoto",
        name: "Bushi Mirumoto",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 4.5,
        skills: ["Défense", "Iaijutsu", "Kenjutsu (Katana)", "Connaissance : Shugenja", "Méditation", "Connaissance : Théologie", "Une compétence Bugei ou Noble au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie du Dragon (Way of the Dragon)", effect: "Lorsque vous maniez un katana en main directrice et un wakizashi en main secondaire, vous ne subissez aucun malus d'aucune sorte pour le combat à deux armes, et vous ajoutez votre Rang d'École à votre ND d'Armure (cumulatif avec le bonus normal du combat à deux armes). De plus, lorsque vous êtes ciblé par un sort, vous pouvez augmenter ou diminuer de 5 le ND du jet d'Incantation de ce sort." },
          { rank: 2, name: "Le Calme au Cœur du Tonnerre (The Calm in Midst of Thunder)", effect: "Lorsque vous adoptez la posture du Centre, vous gagnez un bonus au total de vos jets d'Iaijutsu égal à votre rang de compétence Kenjutsu." },
          { rank: 3, name: "Fort et Rapide (Strong and Swift)", effect: "Vous pouvez effectuer vos attaques par une Action Simple lorsque vous maniez des armes portant le mot-clé Samouraï." },
          { rank: 4, name: "Représailles Furieuses (Furious Retaliation)", effect: "Durant la phase de Réactions du combat, choisissez un adversaire qui a porté ou tenté une attaque contre vous durant ce Round : vous gagnez un bonus de +3g0 à tous vos jets d'attaque contre cette cible lors de votre prochain Tour." },
          { rank: 5, name: "Cœur du Dragon (Heart of the Dragon)", effect: "Si vous attaquez deux fois durant le même Tour tout en maniant un katana en main directrice et un wakizashi en main secondaire, vous pouvez effectuer une attaque supplémentaire avec votre arme en main secondaire par une Action Gratuite." }
        ]
      },
      {
        id: "magistrat-kitsuki",
        family: "Kitsuki",
        name: "Enquêteur Kitsuki",
        type: "Courtisan",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 5.5,
        skills: ["Courtisan", "Étiquette (Courtoisie)", "Enquête (Interrogatoire)", "Kenjutsu", "Méditation", "Sincérité", "Une compétence de Connaissance au choix"],
        outfit: "Vêtements traditionnels, Wakizashi, Couteau, nécessaire de calligraphie, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Méthode de Kitsuki (Kitsuki's Method)", effect: "Vous gagnez une Augmentation Gratuite sur tous vos jets d'Enquête. Lors d'une escarmouche, vous ajoutez votre Rang de Trait Perception à votre ND d'Armure." },
          { rank: 2, name: "La Sagesse qu'Apporte le Vent (Wisdom the Wind Brings)", effect: "Quiconque effectue un Jet de Compétence Sociale pour vous mentir ou vous tromper, ou effectue une manœuvre Feinte ou Désarmement contre vous en escarmouche, doit ajouter +5 à son ND pour chacun de vos Rangs d'Enquêteur Kitsuki." },
          { rank: 3, name: "Connaître le Rythme du Cœur (Know the Rhythm of the Heart)", effect: "Après avoir parlé à quelqu'un quelques instants, lancez Enquête (Observation) / Perception contre un ND égal à 5 × l'Intelligence de la cible pour obtenir une image exacte et fidèle (bien que simple) de sa personnalité et de ses motivations." },
          { rank: 4, name: "Trouver la Voie (Finding the Path)", effect: "Une fois par jour contre une personne donnée, en conversant quelques minutes avec elle, faites un Jet Opposé d'Enquête (Interrogatoire) / Intelligence contre son Étiquette (Courtoisie) / Intelligence pour identifier l'un de ses alliés ou ennemis (1 allié ou ennemi supplémentaire choisi par le MJ par Augmentation réussie)." },
          { rank: 5, name: "Les Yeux Trahissent le Cœur (The Eyes Betray the Heart)", effect: "Toute tentative consciente de vous mentir déclenche automatiquement un Jet Opposé de votre Enquête (Interrogatoire) / Perception contre la Sincérité (Tromperie) / Volonté du menteur, même si vous ne le soupçonnez pas. Si vous savez déjà qu'on vous ment, vous gagnez +5g0 à ce Jet Opposé et pouvez déclarer des Augmentations pour amener le menteur à révéler involontairement davantage d'informations." }
        ]
      },
      {
        id: "shugenja-tamori",
        family: "Tamori",
        name: "Shugenja Tamori",
        type: "Shugenja",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 4.5,
        skills: ["Athlétisme", "Calligraphie (Chiffre)", "Défense", "Divination", "Connaissance : Théologie", "Médecine", "Art de la Magie"],
        outfit: "Robes, Wakizashi, 1 arme au choix, Sacoche à parchemins, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Chair des Éléments (Flesh of the Elements)", effect: "Affinité : Terre / Déficience : Air. Sorts : Sens, Communion, Convocation, 3 Terre, 2 Feu, 1 Eau. Vous pouvez dépenser un emplacement de sort pour distiller un sort que vous connaissez (avec Zone d'effet « une cible » personne ou créature) dans une potion (en autant d'heures que son Niveau de Maîtrise), qui compte dans vos emplacements quotidiens tant qu'elle n'est pas activée. Quiconque la détient peut l'activer par Action Simple (boire) ou Action Complexe (lancer avec Athlétisme [Lancer] / Agilité). Vous gagnez également une Augmentation Gratuite sur tout sort portant le mot-clé Artisanat." }
        ]
      },
      {
        id: "moine-togashi",
        family: "Togashi",
        name: "Ordre Tatoué Togashi (Ise Zumi)",
        type: "Moine",
        trait: "Vide",
        bonus: "+1 Vide",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Artisanat : Tatouage", "Jiujutsu", "Une compétence de Connaissance au choix", "Méditation", "Une compétence non-Dégradante au choix"],
        outfit: "Robes, Bo, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Sang du Kami (Blood of the Kami)", effect: "Vous recevez deux Tatouages mystiques à ce rang (activables par Action Gratuite s'ils sont exposés ; un seul actif à la fois sauf exception ; durée : 2 × Rang d'École Rounds)." },
          { rank: 2, name: "Corps de Pierre (Body of Stone)", effect: "Vous gagnez un bonus de +1g1 au total de tous vos jets d'attaque et de dégâts à mains nues." },
          { rank: 3, name: "Bénédiction du Kami (Blessing of the Kami)", effect: "Vous recevez deux Tatouages supplémentaires." },
          { rank: 4, name: "Volonté de Pierre (Will of Stone)", effect: "Vous pouvez effectuer vos attaques à mains nues par une Action Simple au lieu d'une Action Complexe." },
          { rank: 5, name: "Contact du Kami (Touch of the Kami)", effect: "Vous recevez deux Tatouages supplémentaires." }
        ]
      },
      {
        id: "mirumoto-taoist",
        family: "Mirumoto",
        name: "Épéiste Taoïste Mirumoto (Emerald Empire p. 221)",
        type: "Bushi",
        trait: "Vide",
        bonus: "+1 Vide",
        honor: 5.5,
        skills: ["Athlétisme", "Défense", "Iaijutsu", "Kenjutsu (Katana)", "Connaissance : Théologie", "Méditation", "Une compétence Bugei ou Noble au choix"],
        outfit: "Vêtements robustes, Katana, Wakizashi, Tanto, nécessaire de voyage, 1 koku (Ascétique gratuit)",
        techniques: [
          { rank: 1, name: "Aligné avec les Éléments (Aligned with the Elements)", effect: "Lorsque vous maniez un sabre sans porter d'armure, vous gagnez une Réduction égale à votre Rang d'École + 2, ainsi que +1g0 aux dégâts avec tout sabre." },
          { rank: 2, name: "Poing et Lame (Fist and Blade)", effect: "Avec un sabre, la manœuvre Renversement coûte 1 Augmentation de moins, et si vous contrôlez un Corps-à-corps (Grapple) en tenant un sabre, vous pouvez infliger les dégâts du sabre à la place des dégâts à mains nues." },
          { rank: 3, name: "Frappe d'Harmonie (Strike of Harmony)", effect: "Lorsque vous maniez un sabre, vous pouvez dépenser 1 point de Vide sur votre jet de dégâts (cumulatif avec la capacité naturelle du katana)." },
          { rank: 4, name: "Maître de l'Acier (Master of Steel)", effect: "Vous pouvez attaquer par une Action Simple lorsque vous maniez un sabre." },
          { rank: 5, name: "Équilibre dans le Néant (Balance in Nothingness)", effect: "Avec un sabre, une fois par escarmouche, vous pouvez dépenser autant de points de Vide sur les dégâts que vous le souhaitez." }
        ]
      },
      {
        id: "hoshi-tsurui-zumi",
        family: "Togashi",
        name: "Hoshi Tsurui Zumi (Imperial Histories I p. 214)",
        type: "Moine",
        trait: "Vide",
        bonus: "+1 Vide",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Étiquette", "Jiujutsu", "Méditation (Récupération du Vide)", "Deux compétences au choix"],
        outfit: "Robes, Bo, nécessaire de voyage, 2 koku",
        techniques: [
          { rank: 1, name: "Poing Vif, Cœur Subtil (Swift Fist, Subtle Heart)", effect: "Traité mécaniquement comme un Moine de la Confrérie (Vide initial 3, 2 Kiho initiaux ; +2 Kiho par Rang). Par Action Gratuite, dépensez 1 point de Vide pour activer pendant un nombre de Rounds égal à votre Rang d'École : gagnez soit +1g1 à vos jets d'attaque à mains nues, soit +1g0 à vos jets de dégâts à mains nues (choisi au début de chaque Tour). Vous commencez avec 1 Tatouage (+1 Tatouage au Rang 4)." }
        ]
      },
      {
        id: "hitomi-kikage-zumi",
        family: "Togashi",
        name: "Hitomi Kikage Zumi (Imperial Histories I p. 215)",
        type: "Moine",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Jiujutsu", "Une compétence de Connaissance au choix", "Méditation", "Deux compétences non-Dégradantes au choix"],
        outfit: "Vêtements robustes, nécessaire de voyage, 4 koku",
        techniques: [
          { rank: 1, name: "Le Don de la Dame (The Gift of the Lady)", effect: "Vous gagnez 1 Tatouage. Vous ajoutez votre Trait Réflexes à votre ND d'Armure, et pouvez utiliser vos Réflexes au lieu de la Force pour contrôler un Corps-à-corps (Grapple)." },
          { rank: 2, name: "Frapper la Base (Strike the Base)", effect: "Vous pouvez dépenser 1 point de Vide sur les jets de dégâts de vos attaques à mains nues (y compris en Corps-à-corps)." },
          { rank: 3, name: "Mouvoir le Vent (Moving the Wind)", effect: "Vos attaques à mains nues deviennent des Actions Simples. Vous gagnez 1 Tatouage supplémentaire." },
          { rank: 4, name: "Frapper le Centre (Strike the Center)", effect: "À mains nues, la manœuvre Renversement coûte 1 Augmentation de moins et vous gagnez +1g1 à vos jets de dégâts à mains nues (y compris en Corps-à-corps)." },
          { rank: 5, name: "Frapper le Sommet (Strike the Summit)", effect: "Pour 2 Augmentations supplémentaires sur un Renversement réussi, l'adversaire est automatiquement Sonné (Stunned). Si vous projetez un adversaire lors d'un Corps-à-corps, il doit réussir un jet de Terre ND 20 ou être Sonné. Vous gagnez 1 Tatouage supplémentaire." }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. CLAN DU LION (Core pp. 116-119 ; Great Clans p. 137 ; EE p. 109)
  // =========================================================================
  lion: {
    name: "Clan du Lion",
    families: [
      { name: "Akodo", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Ikoma", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Kitsu", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Matsu", trait: "Force", bonus: "+1 Force" }
    ],
    schools: [
      {
        id: "bushi-akodo",
        family: "Akodo",
        name: "Bushi Akodo",
        type: "Bushi",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 6.5,
        skills: ["Art de la Guerre (Bataille de Masse)", "Défense", "Kenjutsu", "Kyujutsu", "Connaissance : Histoire", "Sincérité", "Une compétence Bugei ou Noble au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie du Lion (The Way of the Lion)", effect: "Lorsque vous attaquez, vous pouvez soit ignorer la portion du ND d'Armure adverse provenant de son Armure (sans ignorer sa Réduction), soit gagner une Augmentation Gratuite. De plus, vous gagnez +1g0 au total de votre premier jet d'attaque en mêlée contre un adversaire dans une escarmouche, ou contre tout adversaire ayant déclaré une Augmentation contre vous depuis votre dernier Tour (+1g0 max même s'il a déclaré plusieurs Augmentations)." },
          { rank: 2, name: "Force de la Pureté (Strength of Purity)", effect: "Durant une escarmouche, vous pouvez ajouter votre Rang d'Honneur au total d'un seul jet de votre choix pendant votre Tour (sauf aux jets de dégâts, et impossible en posture du Centre)." },
          { rank: 3, name: "Force de mes Ancêtres (Strength of My Ancestors)", effect: "Vous pouvez effectuer vos attaques par une Action Simple au lieu d'une Action Complexe lorsque vous maniez une arme portant le mot-clé Samouraï." },
          { rank: 4, name: "Triomphe avant la Bataille (Triumph Before Battle)", effect: "Une fois par escarmouche durant la phase de Réactions, désignez un adversaire : vous ignorez tous les bonus au ND d'Armure que cette cible tire de sa Posture durant le Round suivant." },
          { rank: 5, name: "La Dernière Leçon d'Akodo (Akodo's Final Lesson)", effect: "Lorsque vous déclarez des Augmentations sur un jet de Compétence Bugei, si vous atteignez ou dépassez le ND initial (avant Augmentations) mais échouez au ND augmenté, vous réussissez tout de même sans les bénéfices des Augmentations." }
        ]
      },
      {
        id: "bushi-matsu",
        family: "Matsu",
        name: "Berserker Matsu",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 6.5,
        skills: ["Art de la Guerre", "Jiujutsu", "Kenjutsu (Katana)", "Kyujutsu", "Connaissance : Histoire", "Deux compétences Bugei au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Le Rugissement du Lion (The Lion's Roar)", effect: "Vous ajoutez votre Rang d'Honneur à tous vos jets de dégâts. Lorsque vous adoptez la posture d'Assaut, vous pouvez vous déplacer de 1,5 mètre (5') supplémentaire par Tour en plus du bonus normal de la Posture (sans dépasser votre maximum par Tour)." },
          { rank: 2, name: "La Fureur de Matsu (Matsu's Fury)", effect: "En posture d'Assaut, choisissez un adversaire à 9 m (30') ou moins : si vous le touchez ce Tour, il est figé par la peur (Peurs) et ne peut prendre d'Actions de Déplacement pour quitter sa position (sans effet sur les cibles immunisées à la Peur). Lors de la phase de Réactions, il peut tenter un jet de Volonté (sans malus de Blessures) contre ND égal aux dégâts de votre dernière attaque ; s'il échoue, l'effet prend fin à la phase de Réactions suivante (la 2e après le coup)." },
          { rank: 3, name: "La Charge du Lion (The Lion's Charge)", effect: "Vous pouvez effectuer vos attaques de mêlée par une Action Simple au lieu d'une Action Complexe." },
          { rank: 4, name: "Le Courage de Matsu (Matsu's Courage)", effect: "Vous ignorez un nombre de points de malus de Blessures égal à votre Rang d'Honneur, ou au double de votre Rang d'Honneur tant que vous êtes en posture d'Assaut." },
          { rank: 5, name: "La Victoire du Lion (The Lion's Victory)", effect: "Une fois par rencontre, après avoir lancé les dégâts d'une attaque, dépensez 1 point de Vide par Action Gratuite : tous les dés que vous avez gardés explosent (relancés et ajoutés à votre total de dégâts)." }
        ]
      },
      {
        id: "barde-ikoma",
        family: "Ikoma",
        name: "Barde Ikoma",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        skills: ["Courtisan", "Étiquette", "Connaissance : Histoire (Clan du Lion)", "Art de la Scène : Conteur", "Sincérité (Honnêteté)", "Une compétence Noble au choix", "Une compétence Bugei au choix"],
        outfit: "Vêtements traditionnels, Wakizashi, Couteau, nécessaire de calligraphie, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Le Héraut de la Gloire (The Herald of Glory)", effect: "Vous recevez gratuitement l'Avantage Mémoire Exacte (si vous le possédez déjà, ses XP vous sont remboursés). Vous pouvez louer publiquement les actes héroïques ou nobles d'autrui par un jet d'Art de la Scène : Conteur / Intuition contre ND 20 : en cas de succès, cette personne gagne un nombre de points de Gloire égal à votre Rang d'École (jusqu'à Rang d'École fois par personne et par mois)." },
          { rank: 2, name: "Le Cœur du Lion (The Heart of the Lion)", effect: "Vous ne perdez ni Honneur ni Gloire pour manifester vos émotions en public tant que vous le faites au nom d'un autre Lion ou d'une cause honorable supérieure. De plus, quiconque tente de vous influencer via Intimidation ou Tentation doit ajouter +5 à son ND pour chacun de vos Rangs d'École." },
          { rank: 3, name: "La Voix des Ancêtres (The Voice of the Ancestors)", effect: "Avant une bataille ou escarmouche, parlez quelques minutes et lancez Art de la Scène : Oratoire / Intuition contre ND 15 + 5 par allié (+5 supplémentaires par cible hors Clan du Lion) : si réussi, chaque allié inspiré peut ajouter son Rang d'Honneur au total d'un jet de Compétence durant ce combat." },
          { rank: 4, name: "La Force de la Tradition (The Strength of Tradition)", effect: "Par Action Simple (Rang d'École fois par session), lancez Art de la Scène : Conteur / Intuition contre ND 25 pour encourager un allié : s'il échoue un jet plus tard dans la journée, il peut le relancer en ajoutant son Rang d'Honneur en dés non gardés (si le 2e jet échoue aussi, vous perdez 2 points d'Honneur)." },
          { rank: 5, name: "Chaque Lion est ton Frère (Every Lion is Your Brother)", effect: "Cinq fois par session, lors d'un Jet Social Opposé, vous pouvez citer un précédent historique pour lancer un nombre de dés non gardés supplémentaires égal à votre rang en Art de la Scène : Conteur." }
        ]
      },
      {
        id: "shugenja-kitsu",
        family: "Kitsu",
        name: "Shugenja Kitsu",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 6.5,
        skills: ["Art de la Guerre", "Calligraphie (Chiffre)", "Étiquette", "Connaissance : Histoire", "Connaissance : Théologie", "Art de la Magie", "Une compétence Noble ou Bugei au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Les Yeux des Ancêtres (Eyes of the Ancestors)", effect: "Affinité : Eau / Déficience : Feu. Sorts : Sens, Communion, Convocation, 3 Eau, 2 Air, 1 Terre. Vous pouvez faire un Jet d'Incantation (comme un sort d'Eau) contre ND égal à la Volonté × 5 d'une cible pour apprendre tous ses Avantages et Désavantages Spirituels. En dépensant 1 point de Vide, vous pouvez annuler l'un quelconque de ses Avantages Spirituels pendant un nombre de minutes égal à votre Rang d'École. Vous gagnez une Augmentation Gratuite sur tout sort portant le mot-clé Bataille." }
        ]
      },
      {
        id: "matsu-beastmaster",
        family: "Matsu",
        name: "Dompteur de Bêtes Matsu (Great Clans p. 137)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Dressage 2", "Art de la Guerre", "Défense", "Iaijutsu", "Kenjutsu", "Une compétence Bugei au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 4 koku",
        techniques: [
          { rank: 1, name: "Un avec la Troupe (One with the Pride)", effect: "Vous forgez un lien avec un lion de guerre qui vous accompagne : vous pouvez lui ordonner d'Attaquer par Action Complexe ; un lion qui n'attaque pas utilise la manœuvre Garde pour vous protéger." },
          { rank: 2, name: "Cœur de la Bête (Heart of the Beast)", effect: "Un deuxième lion rejoint votre troupe. Vous et vos lions gagnez le trait Rapide 2 (Swift 2), et vos lions gagnent un palier de Blessures supplémentaire (36: +15, 60: Mort)." },
          { rank: 3, name: "La Férocité Intérieure (The Ferocity Within)", effect: "Vous attaquez par Action Simple à mains nues ou avec katana, wakizashi, magari-yari, nage-yari ou tout couteau ; ordonner à un lion d'Attaquer devient une Action Simple." },
          { rank: 4, name: "Tous comme Un (All as One)", effect: "Vos lions peuvent effectuer deux attaques de griffes par Round ; vous et votre troupe gagnez +2g1 aux jets de dégâts lorsque vous combattez côte à côte ; un lion recevant l'ordre d'Attaquer peut aussi faire une Action Simple de Déplacement." },
          { rank: 5, name: "Avec l'Âme d'un Lion (With the Soul of a Lion)", effect: "Un troisième lion rejoint votre troupe ; tous vos lions gagnent +10 au ND d'Armure, +2 Réduction et Peur +2." }
        ]
      },
      {
        id: "ikoma-lions-shadow",
        family: "Ikoma",
        name: "Ombre du Lion Ikoma (Emerald Empire p. 109)",
        type: "Bushi",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 3.5,
        skills: ["Courtisan", "Étiquette", "Kenjutsu", "Enquête (Observation)", "Sincérité", "Discrétion", "Une compétence Noble ou Dégradante au choix"],
        outfit: "Vêtements traditionnels, Daisho, 1 arme au choix, nécessaire de calligraphie, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Aucune Limite (No Boundaries)", effect: "Vous ne perdez pas d'Honneur pour l'utilisation de Compétences Dégradantes au service direct des objectifs ou de la gloire du Clan du Lion. Par Action Gratuite (Rang d'École fois par jour), désignez jusqu'à Rang d'École adversaires : vous gagnez +1g0 aux jets d'attaque et aux Jets Opposés contre eux jusqu'à la fin de la journée." },
          { rank: 2, name: "Le Lion ne Peut Échouer (The Lion Cannot Fail)", effect: "Vous gagnez +1g0 à tous vos jets utilisant vos Compétences d'École." },
          { rank: 3, name: "L'Esprit d'Ikoma (The Spirit of Ikoma)", effect: "Une fois par Round par Action Gratuite, perdez 3 points d'Honneur pour ajouter +2g1 à vos jets d'attaque, de dégâts et Jets Sociaux Opposés jusqu'à la fin du Round." },
          { rank: 4, name: "Les Griffes du Lion Silencieux (The Quiet Lion's Claws)", effect: "Vous pouvez attaquer avec une arme de mêlée par Action Simple." },
          { rank: 5, name: "Détermination Féroce (Ferocious Determination)", effect: "Dépensez 1 point de Vide par Action Gratuite pour faire un Jet Opposé de Courtisan / Intuition contre Étiquette (Courtoisie) / Intuition d'une cible ayant un Rang d'Honneur : si vous gagnez, elle soustrait votre Intuition + son propre Rang d'Honneur de ses jets d'attaque et Jets Sociaux Opposés contre vous pendant Rang d'École heures." }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. CLAN DE LA MANTE (Core pp. 120-122, 219 ; Great Clans p. 166-169)
  // =========================================================================
  mante: {
    name: "Clan de la Mante",
    families: [
      { name: "Kitsune", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Moshi", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Tsuruchi", trait: "Perception", bonus: "+1 Perception" },
      { name: "Yoritomo", trait: "Constitution", bonus: "+1 Constitution" }
    ],
    schools: [
      {
        id: "bushi-yoritomo",
        family: "Yoritomo",
        name: "Bushi Yoritomo",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Commerce", "Défense", "Jiujutsu (Armes Improvisées)", "Kenjutsu", "Couteaux (Kama)", "Navigation", "Une compétence au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix (ou paire de Couteaux), nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Mante (The Way of the Mantis)", effect: "Vous ne subissez aucun malus de déplacement ou d'attaque dû aux terrains difficiles ou accidentés. Vous ne perdez ni Honneur ni Gloire en utilisant au combat des armes improvisées ou portant le mot-clé Paysan. Vous ne subissez aucun malus en maniant une arme Petite ou Moyenne en main secondaire si elle porte le mot-clé Paysan. Enfin, vous gagnez +1g0 au total de tous vos jets d'attaque." },
          { rank: 2, name: "La Voix de la Tempête (Voice of the Storm)", effect: "Chaque fois que vous touchez un adversaire en mêlée, son ND d'Armure diminue de 5 contre vos attaques pendant 2 Rounds (cumulable un nombre de fois égal à votre Rang d'École, durée réinitialisée à chaque coup)." },
          { rank: 3, name: "Frappe de la Mante (Strike of the Mantis)", effect: "Vous pouvez effectuer vos attaques par une Action Simple lorsque vous maniez des armes portant les mots-clés Samouraï ou Paysan." },
          { rank: 4, name: "La Vague Roulante (The Rolling Wave)", effect: "Si vous vous déplacez d'au moins 1,5 mètre (5'), vous gagnez +10 à votre ND d'Armure jusqu'à votre prochain Tour ; vous pouvez sacrifier ce bonus avant un jet d'attaque durant votre Tour pour obtenir 2 Augmentations Gratuites utilisables uniquement pour la manœuvre Renversement." },
          { rank: 5, name: "Main d'Osano-Wo (Hand of Osano-Wo)", effect: "Par Action Gratuite, dépensez 1 point de Vide pour garder un nombre de dés de dégâts supplémentaires égal à votre Force. Si ces attaques frappent une cible À terre (Prone), vous gagnez +0g2 au total de vos jets de dégâts contre elle." }
        ]
      },
      {
        id: "archer-tsuruchi",
        family: "Tsuruchi",
        name: "Archer Tsuruchi",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 3.5,
        skills: ["Athlétisme", "Défense", "Chasse", "Enquête", "Kyujutsu (Yumi) 2", "Une compétence Bugei ou Noble au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Arc et 20 flèches, Wakizashi, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Toujours Prêt (Always Be Ready)", effect: "Vous gagnez +1g0 au total de tous vos jets d'attaque avec un arc, et vous ajoutez +3 à votre Score d'Initiative." },
          { rank: 2, name: "La Flèche Connaît le Chemin (The Arrow Knows the Way)", effect: "Vous gagnez une Augmentation Gratuite utilisable uniquement pour la manœuvre Coup Précis (Called Shot). De plus, vous gagnez +2g0 au total de tous vos jets de dégâts lorsque vous utilisez un arc." },
          { rank: 3, name: "Le Dard de la Guêpe (The Wasp's Sting)", effect: "Vous pouvez effectuer vos attaques par une Action Simple au lieu d'une Action Complexe lorsque vous utilisez un arc." },
          { rank: 4, name: "Vol de Non-Esprit (Flight of No-Mind)", effect: "Une fois par escarmouche, dépensez 1 point de Vide par Action Complexe pour tirer une flèche (dans la portée normale de l'arc) : cette attaque ignore les effets d'armure ainsi que tout malus de Blessures ou de visibilité (Augmentations autorisées, mais pas d'Attaque Supplémentaire)." },
          { rank: 5, name: "L'Œil de Tsuruchi (Tsuruchi's Eye)", effect: "Vous pouvez porter une attaque à distance par Action Complexe pour gagner un bonus de +4g1 au total du jet d'attaque et du jet de dégâts (non cumulable avec Vol de Non-Esprit)." }
        ]
      },
      {
        id: "courtisan-yoritomo",
        family: "Yoritomo",
        name: "Courtisan Yoritomo",
        type: "Courtisan",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 2.5,
        skills: ["Commerce (Évaluation)", "Courtisan", "Défense", "Étiquette", "Intimidation (Contrôle)", "Sincérité", "Une compétence Marchande ou de Connaissance au choix"],
        outfit: "Vêtements extravagants, Wakizashi, 1 arme au choix, nécessaire de calligraphie, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Le Devoir avant l'Honneur (Duty Before Honor)", effect: "Vous ne perdez ni Gloire ni Honneur en utilisant publiquement Commerce, ni Honneur en utilisant Intimidation (Contrôle). Sur vos Jets Sociaux contre les rônins, bandits, membres de gangs, mercenaires, pirates et autres hors-la-loi, vous gagnez un nombre d'Augmentations Gratuites égal à votre Rang d'École." },
          { rank: 2, name: "Cœur d'Orage (Storm Heart)", effect: "Lorsque vous utilisez Intimidation (Contrôle), votre Volonté compte comme supérieure de 1 rang (ou de 2 rangs contre un samouraï de Rang de Statut inférieur au vôtre)." },
          { rank: 3, name: "Commander aux Vents (Command the Winds)", effect: "Un nombre de fois par session égal à votre Rang d'École, après avoir raté un Jet Social de Sincérité, vous pouvez le relancer en utilisant Intimidation (Contrôle) à la place (en conservant le résultat du jet d'Intimidation)." },
          { rank: 4, name: "Volonté de la Tempête (Will of the Storm)", effect: "Au début d'une conversation, faites un Jet Opposé d'Intimidation (Contrôle) / Volonté contre Étiquette (Courtoisie) / Volonté de la cible : si vous gagnez, pendant l'heure suivante elle ne peut pas dépenser de points de Vide contre vous et subit -3g0 à tous ses Jets Sociaux contre vous." },
          { rank: 5, name: "Force en Toute Chose (Strength in All Things)", effect: "Vous gagnez un bonus de +5g0 lorsque vous tentez d'utiliser Intimidation contre quelqu'un, ainsi que pour résister à un jet d'Intimidation, de Tentation ou à un effet de Peur." }
        ]
      },
      {
        id: "shugenja-moshi",
        family: "Moshi",
        name: "Shugenja Moshi",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 4.5,
        skills: ["Calligraphie (Chiffre)", "Divination", "Connaissance : Théologie", "Méditation", "Art de la Magie", "Deux compétences Nobles ou Bugei au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Faveur du Soleil (Favor of the Sun)", effect: "Affinité : Air / Déficience : Terre. Sorts : Sens, Communion, Convocation, 3 Air, 3 Feu. Durant le jour, vous gagnez une Affinité supplémentaire pour les sorts de Feu (perdue la nuit). Vous gagnez également une Augmentation Gratuite sur tout sort portant le mot-clé Tonnerre." }
        ]
      },
      {
        id: "kitsune-shugenja",
        family: "Kitsune",
        name: "Shugenja Kitsune (Core p. 219 / Clan du Renard)",
        type: "Shugenja",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 4.5,
        skills: ["Calligraphie", "Défense", "Chasse", "Médecine (Herboristerie)", "Méditation", "Art de la Magie", "Une compétence Noble ou Bugei au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Essence de Chikushudo (Essence of Chikushudo)", effect: "Affinité : Terre / Déficience : Air. Sorts : Sens, Communion, Convocation, 3 Terre, 2 Eau, 1 Feu. Vous pouvez utiliser les sorts de base Sens, Communion et Convocation sur les esprits animaux de Chikushudo autant que sur les kami. Vous gagnez une Augmentation Gratuite sur tout sort non nuisible lancé sur un animal." }
        ]
      },
      {
        id: "yoritomo-shugenja",
        family: "Yoritomo",
        name: "Shugenja Yoritomo (Great Clans p. 169)",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 4.5,
        skills: ["Athlétisme", "Calligraphie", "Couteaux", "Connaissance : Théologie", "Méditation", "Navigation", "Une compétence au choix"],
        outfit: "Robes, Wakizashi, 1 arme au choix, Sacoche à parchemins, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Enfant de la Mer (Child of the Sea)", effect: "Affinité : Eau / Déficience : Terre. Sorts : Sens, Communion, Convocation, 3 Eau, 2 Feu, 1 Air. Dépensez 1 emplacement de sort pour modifier les vents locaux d'un degré, ou ajoutez 1 point de Vide pour modifier le climat global d'un degré (jusqu'à Rang d'École dépenses combinées par Round, dans un rayon d'autant de miles que votre Rang d'École). Augmentation Gratuite sur tout sort de Tonnerre." }
        ]
      },
      {
        id: "tsuruchi-bounty-hunter",
        family: "Tsuruchi",
        name: "Chasseur de Primes Tsuruchi (Great Clans p. 167)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Chasse (Pistage)", "Intimidation", "Enquête", "Kenjutsu", "Kyujutsu", "Connaissance : Pègre"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc ou Couteau, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Sens du Chasseur (A Hunter's Sense)", effect: "+1g1 en Intimidation contre les castes inférieures pouvant vous aider à trouver votre proie, ou +1g0 à tous vos Jets Sociaux avec les samouraïs dans ce cadre ; lancez Rang d'École dés non gardés supplémentaires en Chasse et Enquête pour traquer une cible." },
          { rank: 2, name: "Nulle Proie n'Échappe (No Prey Escapes)", effect: "Dépensez 1 point de Vide pour réussir automatiquement un jet de Connaissance : Pègre identifiant les criminels locaux à interroger (perte d'Honneur normale pour fréquentation)." },
          { rank: 3, name: "Justice de la Guêpe (Justice of the Wasp)", effect: "Contre un fugitif déclaré coupable par une autorité Impériale ou Mante supérieure, Désarmement et Renversement coûtent 1 Augmentation de moins et rendent la cible Hébétée (Dazed)." },
          { rank: 4, name: "Frappe Double du Dard (Twin Sting Strike)", effect: "Attaques par Action Simple au yumi (et au katana ou couteau contre toute cible éligible à la Technique de Rang 3)." },
          { rank: 5, name: "Yeux de la Guêpe (Eyes of the Wasp)", effect: "Identifier un samouraï par Connaissance : Héraldique révèle aussi son Honneur et tous ses Désavantages Sociaux et Mentaux. Toute cible éligible au Rang 3 touchée par votre attaque devient automatiquement Hébétée." }
        ]
      },
      {
        id: "mantis-brawler",
        family: "Yoritomo",
        name: "Bagarreur Mante (Great Clans p. 166)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 3.5,
        skills: ["Athlétisme", "Commerce", "Intimidation", "Jiujutsu", "Couteaux", "Navigation", "Une compétence d'arme au choix"],
        outfit: "Vêtements robustes, 2 armes au choix, Kama, Tanto, nécessaire de voyage, 4 koku",
        techniques: [
          { rank: 1, name: "La Voie des Poings Ivres (Way of Drunken Fists)", effect: "En étant À terre (Prone), aucun malus au ND d'Armure ni aux attaques à mains nues ou avec arme Petite (tout en gardant le bonus À terre contre les projectiles). +1g0 pour contrôler un Corps-à-corps et aux dégâts à mains nues, armes improvisées ou armes Petites." },
          { rank: 2, name: "L'Ivrogne Perd sa Sandale (Drunk Loses His Sandal)", effect: "Sur une Feinte réussie, réduisez ses dégâts bonus de 5 pour gagner +5 au ND d'Armure (+10 si À terre) jusqu'au début de votre prochain Tour. Après une attaque ennemie contre vous, Action Gratuite pour vous mettre À terre." },
          { rank: 3, name: "L'Ivrogne ne Tombe Jamais (Drunk Never Falls)", effect: "Immunisé aux malus d'État Fatigué, Hébété et d'ivresse en escarmouche ; si Sonné, vous disposez encore d'une Action Simple par Round." },
          { rank: 4, name: "Deux Ivrognes Dansent (Two Drunks Dance)", effect: "Attaques par Action Simple à mains nues, avec arme improvisée ou arme Petite." },
          { rank: 5, name: "L'Ivrogne Enfonce une Porte (Drunk Pounds a Door)", effect: "En mêlée, dépensez 1 point de Vide pour obtenir +4g1 à l'attaque et aux dégâts (+4g2 si vous êtes À terre)." }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. CLAN DU PHÉNIX (Core pp. 123-125 ; Great Clans p. 199 ; EE p. 123)
  // =========================================================================
  phenix: {
    name: "Clan du Phénix",
    families: [
      { name: "Agasha", trait: "Perception", bonus: "+1 Perception" },
      { name: "Asako", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Isawa", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Shiba", trait: "Perception", bonus: "+1 Perception" }
    ],
    schools: [
      {
        id: "bushi-shiba",
        family: "Shiba",
        name: "Bushi Shiba",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Défense", "Kenjutsu", "Kyujutsu", "Méditation (Récupération du Vide)", "Lances", "Connaissance : Théologie", "Une compétence Bugei ou Noble au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie du Phénix (The Way of the Phoenix)", effect: "Lorsque vous dépensez 1 point de Vide pour gagner +1g1 sur un jet, vous pouvez choisir d'en dépenser 2 (pour gagner +2g2). Vous pouvez effectuer la manœuvre Garde par Action Gratuite, mais votre protégé ne gagne que +5 à son ND d'Armure au lieu de +10." },
          { rank: 2, name: "Danser avec les Éléments (Dancing With the Elements)", effect: "Lorsque vous adoptez votre Posture, choisissez une cible à 9 m (30') ou moins : chaque fois qu'elle lance un sort ou est ciblée par un sort, vous pouvez augmenter ou diminuer de 5 le ND du sort. De même, quand vous êtes ciblé par un sort, vous pouvez aussitôt modifier son ND de +5 ou -5." },
          { rank: 3, name: "Un avec le Vide (One With the Void)", effect: "S'active automatiquement durant la phase de Réactions si un autre personnage a dépensé un point de Vide durant ce Round : vous récupérez 1 point de Vide (pouvant dépasser votre maximum jusqu'à la fin du combat). Limité à deux activations par escarmouche." },
          { rank: 4, name: "Se Mouvoir avec le Monde (Move With the World)", effect: "Vous pouvez attaquer par une Action Simple lorsque vous maniez une Arme d'Hast, une Lance ou une arme portant le mot-clé Samouraï." },
          { rank: 5, name: "Contact du Vide (Touch of the Void)", effect: "Chaque point de Vide que vous dépensez vous confère les effets d'en avoir dépensé deux (lorsque applicable). De plus, vous pouvez dépenser des points de Vide en améliorations (Livre de la Terre) deux fois par Tour." }
        ]
      },
      {
        id: "shugenja-isawa",
        family: "Isawa",
        name: "Shugenja Isawa",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Calligraphie (Chiffre)", "Connaissance : Théologie", "Une compétence de Connaissance au choix", "Médecine", "Méditation", "Art de la Magie", "Une compétence Noble au choix"],
        outfit: "Robes, Wakizashi, 1 arme au choix, Sacoche à parchemins, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Le Don d'Isawa (Isawa's Gift)", effect: "Affinité/Déficience : choisissez n'importe quel Élément (y compris le Vide) comme Affinité ; vous n'avez aucune Déficience. Sorts : Sens, Communion, Convocation, 3 sorts d'un élément, 2 d'un autre, 1 d'un troisième et 1 d'un quatrième. Vous gagnez une Augmentation Gratuite sur tous vos jets d'Incantation pour les sorts de l'élément choisi comme Affinité." }
        ]
      },
      {
        id: "erudit-asako",
        family: "Asako",
        name: "Érudit Asako (Loremaster)",
        type: "Courtisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        skills: ["Courtisan", "Étiquette (Courtoisie)", "Connaissance : Histoire", "Connaissance : Théologie (Fortunes)", "Méditation", "Sincérité", "Une compétence de Connaissance au choix"],
        outfit: "Vêtements pratiques, Wakizashi, nécessaire de calligraphie, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Temple de l'Âme (Temple of the Soul)", effect: "Vous gagnez une Augmentation Gratuite sur tout jet de Compétence Connaissance (Lore). Chaque fois que vous dépensez 1 point de Vide sur un jet d'Étiquette, vous gagnez +3g1 au lieu de +1g1." },
          { rank: 2, name: "De ses Cendres (From the Ashes)", effect: "Après avoir passé au moins un jour à observer une cour donnée, lancez Connaissance : Histoire / Perception contre ND 20 pour gagner +2g0 à tous vos jets de Compétences Sociales pendant les deux jours suivants tant que vous restez dans cette cour (réactivable à expiration)." },
          { rank: 3, name: "Voix de l'Univers (Voice of the Universe)", effect: "Après une heure de conversation avec un ami ou allié, lancez Connaissance : Histoire / Intelligence contre ND 25 : en cas de succès, il ajoute votre rang en Connaissance : Histoire à tous ses jets de Compétences Sociales pendant 24 heures (2 Augmentations pour affecter un second allié participant à la conversation)." },
          { rank: 4, name: "Esprit Invincible (Invincible Mind)", effect: "Chaque fois que vous échouez à un Jet Social Opposé visant à résister à la manipulation (Courtisan, Tentation, Intimidation — hors Peur), vous pouvez relancer en utilisant l'Intelligence à la place du Trait normal (en conservant le 2e résultat)." },
          { rank: 5, name: "Sagesse des Âges (Wisdom of the Ages)", effect: "Vous gagnez un bonus de +5g0 au total de tout jet de Compétence Connaissance (Lore), y compris pour vos autres Techniques d'École." }
        ]
      },
      {
        id: "shugenja-agasha",
        family: "Agasha",
        name: "Shugenja Agasha",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Calligraphie (Chiffre)", "Une compétence d'Artisanat au choix", "Défense", "Étiquette", "Connaissance : Théologie", "Art de la Magie", "Une compétence Noble ou Bugei au choix"],
        outfit: "Robes, Wakizashi, 1 arme au choix, Sacoche à parchemins, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Éléments de Toute Chose (Elements of All Things)", effect: "Affinité : Feu / Déficience : Eau. Sorts : Sens, Communion, Convocation, 3 Feu, 2 Terre, 1 Air. Lors de l'incantation d'un sort, vous pouvez dépenser 1 point de Vide pour utiliser un autre Anneau élémentaire de votre choix à la place de l'Anneau normal du sort (dépensant un emplacement de cet Anneau). Augmentation Gratuite sur tout sort portant le mot-clé Artisanat." }
        ]
      },
      {
        id: "asako-henshin",
        family: "Asako",
        name: "Henshin Asako (Great Clans p. 199)",
        type: "Moine",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 5.5,
        skills: ["Calligraphie", "Jiujutsu", "Connaissance : Éléments", "Connaissance : Théologie", "Méditation 2", "Une compétence non-Dégradante au choix"],
        outfit: "Robes, Bo, Sacoche à parchemins, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Les Quatre Mystères (The Four Mysteries)", effect: "Par Action Simple (5 × Rang de Réputation fois par jour), augmentez ou diminuez les deux Traits de l'un de vos Anneaux de votre Rang d'École pendant Rang de Réputation minutes (pour un autre individu, la moitié arrondie à l'inférieur min 1, Jet Opposé de Volonté si réticent ; les réductions ne modifient pas l'Anneau ni les seuils de Blessures)." },
          { rank: 2, name: "L'Énigme de la Terre (The Riddle of Earth)", effect: "Par Action Simple, devenez immunisé à tous les Effets Conditionnels (sauf Saisi et Monté) pendant un nombre d'heures égal à votre Anneau de Terre." },
          { rank: 3, name: "L'Énigme de l'Air (The Riddle of Air)", effect: "Par Action Simple pendant Rang d'École heures, vous percevez toute illusion comme fausse (Jet Opposé d'Air si Maîtrise du sort > votre Rang de Réputation)." },
          { rank: 4, name: "L'Énigme du Feu (The Riddle of Fire)", effect: "Par Action Complexe pendant Rang d'École Rounds, vos dés gardés de dégâts à mains nues deviennent égaux à votre Anneau de Feu. Ou bien, lorsqu'un adversaire vous touche en mêlée, dépensez 1 point de Vide pour un Jet Opposé de Feu et réduire ses dés lancés de dégâts de votre Anneau de Feu." },
          { rank: 5, name: "L'Énigme de l'Eau (The Riddle of Water)", effect: "Réussissez un jet de Connaissance : Éléments (Eau) / Eau contre ND 20 pour obtenir 1 Action Complexe + 1 Action Simple par Tour, ou 3 Actions Simples par Tour." }
        ]
      },
      {
        id: "shiba-artisan",
        family: "Shiba",
        name: "Artisan Shiba (Emerald Empire p. 123)",
        type: "Artisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Artisanat (deux spécialités au choix)", "Calligraphie", "Étiquette", "Connaissance (une au choix)", "Sincérité", "Une compétence Noble ou Bugei au choix"],
        outfit: "Vêtements pratiques, Wakizashi, outils d'artisanat, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Âme de Brillance (Soul of Brilliance)", effect: "Choisissez une compétence d'Artisanat : lorsque vous dépensez 1 point de Vide sur un jet de cette compétence, vous gagnez +2g2 au lieu de +1g1." },
          { rank: 2, name: "La Voie de la Sincérité (The Way of Sincerity)", effect: "Une fois par mois, lancez Artisanat contre ND 15 : gagnez l'excédent en XP utilisables uniquement pour l'Avantage Alliés (Alliés temporaires durant Rang d'École semaines)." },
          { rank: 3, name: "L'Art Parle (The Art Speaks)", effect: "Pour une compétence d'Artisanat choisie, vous pouvez utiliser son rang à la place d'une Compétence Sociale demandée (sans Maîtrises d'École de cette compétence sociale)." },
          { rank: 4, name: "Générosité de l'Art (Bounty of the Craft)", effect: "Une fois par jour (15 minutes, hors Outremonde), réussissez Artisanat ND 30 pour que vous et jusqu'à Rang d'École personnes présentes récupériez tous vos points de Vide." },
          { rank: 5, name: "Le Contact du Destin (The Touch of Destiny)", effect: "Toute personne présente dans la salle où une de vos œuvres est exposée gagne +1 point de Vide temporaire par jour (+2 pour vous si vous êtes présent)." }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. CLAN DU SCORPION (Core pp. 126-129 ; Great Clans p. 229 ; EE p. 171)
  // =========================================================================
  scorpion: {
    name: "Clan du Scorpion",
    families: [
      { name: "Bayushi", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Shosuro", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Soshi", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Yogo", trait: "Volonté", bonus: "+1 Volonté" }
    ],
    schools: [
      {
        id: "bushi-bayushi",
        family: "Bayushi",
        name: "Bushi Bayushi",
        type: "Bushi",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 2.5,
        skills: ["Courtisan (Manipulation)", "Défense", "Étiquette", "Iaijutsu", "Kenjutsu", "Sincérité", "Une compétence au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie du Scorpion (The Way of the Scorpion)", effect: "Vous gagnez un bonus de +1g1 à tous vos jets d'Initiative, ainsi que +5 à votre ND d'Armure contre tout adversaire ayant une Initiative inférieure à la vôtre." },
          { rank: 2, name: "Pinces et Queue (Pincers and Tail)", effect: "Vous pouvez effectuer la manœuvre Feinte pour seulement 1 Augmentation au lieu de 2." },
          { rank: 3, name: "Frapper à la Queue (Strike at the Tail)", effect: "En adoptant votre Posture au début de votre Tour, désignez une cible à 9 m (30') ou moins : si vous la touchez ce Tour, elle est Fatiguée (Fatigued) jusqu'à réussir un jet d'Anneau de Terre ND 25 durant sa phase de Réactions (fin au plus tard à la 2e phase de Réactions après le coup)." },
          { rank: 4, name: "Frappe d'En Haut, Frappe d'En Bas (Strike From Above, Strike From Below)", effect: "Vous pouvez effectuer vos attaques de mêlée par une Action Simple au lieu d'une Action Complexe." },
          { rank: 5, name: "Les Pinces Tiennent, la Queue Frappe (The Pincers Hold, The Tail Strikes)", effect: "Une fois par rencontre, dépensez 1 point de Vide par Action Complexe pour attaquer un adversaire en mêlée : si l'attaque réussit, la cible est Stupéfiée/Sonnée (Stunned) jusqu'à réussir un jet d'Anneau de Terre contre ND égal aux dégâts infligés durant sa phase de Réactions (fin au plus tard à la 2e phase de Réactions après le coup)." }
        ]
      },
      {
        id: "courtisan-bayushi",
        family: "Bayushi",
        name: "Courtisan Bayushi",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.5,
        skills: ["Calligraphie", "Courtisan (Rumeur)", "Étiquette", "Enquête", "Sincérité (Tromperie)", "Tentation", "Une compétence Noble au choix"],
        outfit: "Vêtements extravagants, Wakizashi, 1 arme au choix, nécessaire de calligraphie, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Faiblesse est ma Force (Weakness is My Strength)", effect: "Sur tout Jet Social Opposé, gagnez 1 Augmentation Gratuite par tranche de 3 points de Désavantages Mentaux ou Sociaux possédés par votre adversaire (max 5 Augmentations Gratuites ; même ceux n'ayant pas rapporté d'XP comptent). Vous gagnez 1 Augmentation Gratuite pour répandre des rumeurs avec Courtisan sans avoir besoin d'Augmenter pour dissimuler votre implication." },
          { rank: 2, name: "Eaux Peu Profondes (Shallow Waters)", effect: "En conversant quelques minutes, faites un Jet Opposé d'Enquête / Intuition contre Étiquette / Intuition : en cas de succès, vous connaissez le Trait Mental le plus bas et la Compétence Sociale (rang >= 1) la plus basse de votre interlocuteur (dépensez 1 point de Vide pour obtenir les deuxièmes plus bas)." },
          { rank: 3, name: "Les Secrets sont des Taches de Naissance (Secrets are Birthmarks)", effect: "Après quelques minutes de conversation, Jet Opposé de Courtisan (Manipulation) / Intuition contre Étiquette (Courtoisie) / Intuition : révélez l'intitulé d'un Désavantage Mental/Social de la cible (ou Avantage si elle n'a pas de tel Désavantage) ; si c'est un Désavantage, avec accord du MJ vous pouvez prendre immédiatement 2 points de Chantage contre elle sans coût en XP." },
          { rank: 4, name: "Le Dard Doux du Scrutin (Scrutiny's Sweet Sting)", effect: "Dans tout Jet Social Opposé contre une cible sur laquelle vous avez du Chantage, ses dés n'explosent pas. De plus, contre n'importe qui, vous pouvez dépenser 1 point de Vide pour contraindre la cible à utiliser un Trait Mental de votre choix au lieu du Trait habituel." },
          { rank: 5, name: "Plus Aucun Masque (No More Masks)", effect: "Rang d'École fois par session, faites un Jet Opposé de Courtisan (Rumeur) / Intuition contre Étiquette (Courtoisie) / Intuition (+5g0 si Chantage sur elle) : en cas de succès, infligez à la cible pendant 1 mois un Désavantage Social au choix parmi Mauvaise Réputation, Ennemi Juré ou Obligation (1 fois par cible tant que l'effet est actif)." }
        ]
      },
      {
        id: "infiltrateur-shosuro",
        family: "Shosuro",
        name: "Infiltrateur Shosuro",
        type: "Ninja",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 1.5,
        skills: ["Comédie", "Athlétisme", "Ninjutsu", "Sincérité", "Discrétion 2 (Furtivité)", "Une compétence au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements noirs robustes, Daisho, Arc ou Couteau, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie des Ombres (The Path of Shadows)", effect: "Vous ne perdez pas d'Honneur pour l'usage de Compétences Dégradantes ou d'Armes de Ninjutsu au service du Clan du Scorpion (selon accord du MJ). Vous gagnez un bonus de +2g0 au total de tous vos jets de Discrétion." },
          { rank: 2, name: "Frapper depuis les Ténèbres (Strike from Darkness)", effect: "Contre un adversaire qui n'a pas conscience de votre présence jusqu'au moment de l'attaque, vos Augmentations ne sont pas limitées par votre Vide et vous lancez autant de dés non gardés supplémentaires que votre Rang d'École ; contre un adversaire affligé d'un Effet Conditionnel (Sonné, Fatigué, etc.), vous lancez la moitié de ce bonus (non cumulatif, prenez le meilleur des deux)." },
          { rank: 3, name: "L'Acier dans la Soie (Steel Within Silk)", effect: "Lorsque vous attaquez depuis une embuscade ou maniez des armes de ninjutsu (y compris toute arme avec le mot-clé Ninja), vous pouvez effectuer vos attaques de mêlée (ou à distance avec shuriken/tsubute) par une Action Simple." },
          { rank: 4, name: "Murmure d'Acier (Whisper of Steel)", effect: "Même après avoir attaqué, vos adversaires et témoins doivent remporter un Jet Opposé d'Enquête (Observation) / Perception contre votre Discrétion / Agilité pour vous repérer (uniquement si vous n'effectuez qu'une seule attaque ce Round et si la dissimulation est possible)." },
          { rank: 5, name: "Le Silence Final (The Final Silence)", effect: "Après avoir lancé les dégâts d'une attaque réussie, vous pouvez dépenser un ou plusieurs points de Vide : chaque point de Vide dépensé fait passer deux dés de dégâts au résultat 10 (ces 10 n'explosent pas)." }
        ]
      },
      {
        id: "shugenja-soshi",
        family: "Soshi",
        name: "Shugenja Soshi",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.5,
        skills: ["Calligraphie (Chiffre)", "Courtisan", "Étiquette", "Connaissance : Théologie", "Art de la Magie", "Discrétion", "Une compétence au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Le Murmure des Kami (The Kami's Whisper)", effect: "Affinité : Air / Déficience : Terre. Sorts : Sens, Communion, Convocation, 3 Air, 2 Feu, 1 Eau. Vous pouvez sacrifier un emplacement de sort supplémentaire du même élément en lançant un sort n'ayant aucun potentiel de dégâts pour supprimer tout signe extérieur de son incantation (sans aucun effet altéré sur le sort). Vous gagnez également une Augmentation Gratuite sur tout sort portant le mot-clé Illusion." }
        ]
      },
      {
        id: "shosuro-actor",
        family: "Shosuro",
        name: "Acteur Shosuro (Great Clans p. 229)",
        type: "Ninja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 1.5,
        skills: ["Comédie", "Étiquette", "Couteaux", "Méditation", "Sincérité (Tromperie)", "Discrétion", "Une compétence Noble ou Dégradante au choix"],
        outfit: "Vêtements élégants, costumes et déguisements divers, Couteau, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Le Premier Visage (The First Face)", effect: "Vous créez et maîtrisez un personnage d'emprunt (persona). Chaque fois que vous dépensez 1 point de Vide sur un jet de Comédie ou Sincérité (Tromperie), vous gagnez +3g1 au lieu de +1g1." },
          { rank: 2, name: "La Piqûre Subtile (The Subtle Sting)", effect: "Vous gagnez un bonus de +2g0 à vos jets d'attaque lorsque vous maniez une arme Petite." },
          { rank: 3, name: "Le Second Visage (The Second Face)", effect: "Vous acquérez un deuxième personnage d'emprunt et pouvez dépenser 2 points de Vide sur tout jet d'une de vos Compétences d'École (cumulatif avec le Rang 1)." },
          { rank: 4, name: "Le Baiser de la Vipère (The Viper's Kiss)", effect: "Vous attaquez par Action Simple lorsque vous maniez une arme de taille Petite." },
          { rank: 5, name: "Le Troisième Visage (The Third Face)", effect: "Vous acquérez un troisième personnage d'emprunt. Lorsque vous attaquez un adversaire qui n'a pas conscience de vous ou ne se doute de rien, vos Augmentations ne sont pas limitées par votre Vide." }
        ]
      },
      {
        id: "maitre-sceaux-yogo",
        family: "Yogo",
        name: "Maître des Sceaux Yogo (Great Clans p. 229)",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 1.5,
        skills: ["Calligraphie (Chiffre)", "Étiquette", "Enquête", "Connaissance : Théologie", "Art de la Magie", "Discrétion", "Une compétence Noble ou Dégradante au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, paquet de 20 sceaux de papier, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie du Maître des Sceaux (Way of the Wardmaster)", effect: "Affinité : tous les sorts (non-Vide) avec mot-clé Sceaux / Déficience : sorts avec mot-clé Voyage ou Artisanat. Sorts : Sens, Communion, Convocation, 3 sorts de Sceaux, 3 autres sorts (hors Vide). Vous pouvez lancer un sort de Sceau avec un nombre d'Augmentations égal à sa Maîtrise pour le stocker dans un sceau de papier (occupant son emplacement jusqu'au déclenchement/destruction) et le déclencher plus tard par Action Simple en le posant sur une cible (Spellcraft/Agilité à mains nues si réticente)." }
        ]
      },
      {
        id: "soshi-magistrate",
        family: "Soshi",
        name: "Magistrat Soshi (Emerald Empire p. 171)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 2.5,
        skills: ["Athlétisme", "Défense", "Intimidation (Contrôle)", "Jiujutsu", "Kenjutsu", "Connaissance : Pègre", "Une compétence Bugei au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Le Visage de la Justice (The Face of Justice)", effect: "Vous gagnez +1g0 en Intimidation (+2g0 contre un statut inférieur au vôtre) et +1g0 aux dégâts en mêlée." },
          { rank: 2, name: "Relever le Défi (Rise to Meet the Challenge)", effect: "Si vous êtes À terre (Prone), Action Gratuite Athlétisme / Agilité ND 20 pour vous relever. +1g1 pour contrôler un Corps-à-corps (Grapple)." },
          { rank: 3, name: "La Coupe du Magistrat (The Magistrate's Cut)", effect: "Une fois par adversaire en escarmouche, 3 Augmentations pour un Coup Précis en mêlée permettent de l'Aveugler jusqu'à la phase de Réactions du Round suivant." },
          { rank: 4, name: "Certitude du But (Certainty of Purpose)", effect: "Vous pouvez effectuer vos attaques de mêlée (y compris à mains nues) par une Action Simple." },
          { rank: 5, name: "Détermination Implacable (Relentless Resolve)", effect: "Une fois par escarmouche (hors posture du Centre), ajoutez votre rang d'Intimidation en dés non gardés à vos jets d'attaque pendant 1 Round." }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. CLAN DE LA LICORNE (Core pp. 129-132 ; Great Clans p. 257-259 ; EE p. 31 ; IH1 p. 241 ; IH2 p. 168)
  // =========================================================================
  licorne: {
    name: "Clan de la Licorne",
    families: [
      { name: "Horiuchi", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Ide", trait: "Perception", bonus: "+1 Perception" },
      { name: "Iuchi", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Moto", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Shinjo", trait: "Réflexes", bonus: "+1 Réflexes" },
      { name: "Utaku", trait: "Constitution", bonus: "+1 Constitution" }
    ],
    schools: [
      {
        id: "bushi-moto",
        family: "Moto",
        name: "Bushi Moto",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Athlétisme", "Défense", "Équitation", "Chasse", "Kenjutsu (Cimeterre)", "Une compétence Bugei au choix", "Une compétence au choix"],
        outfit: "Armure lourde ou d'équitation, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, 1 arme au choix, nécessaire de voyage, Cheval d'équitation Licorne, 10 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Licorne (The Way of the Unicorn)", effect: "Vous pouvez manier toute arme à deux mains d'une seule main (sauf arcs). Vous gagnez +1g0 aux jets de dégâts à cheval, avec un cimeterre ou avec une arme de mêlée à deux mains (non cumulatif). Les cimeterres possèdent pour vous le mot-clé Samouraï." },
          { rank: 2, name: "Le Sourire de Shinsei (Shinsei's Smile)", effect: "Vous gagnez un bonus à vos jets d'attaque égal à la moitié des malus de ND dus aux Blessures de votre adversaire, arrondi à l'inférieur (jusqu'à +10 contre un ennemi Estropié)." },
          { rank: 3, name: "Frappe du Vent du Désert (Desert Wind Strike)", effect: "Vous pouvez effectuer vos attaques par une Action Simple lorsque vous maniez une arme de mêlée." },
          { rank: 4, name: "La Charge de la Folie (The Charge of Madness)", effect: "Une fois par escarmouche, si vous réduisez une cible au palier Hors de combat (Out), vous pouvez immédiatement effectuer une attaque supplémentaire par Action Gratuite (contre une autre cible, sans Augmentations)." },
          { rank: 5, name: "Moto ne Cède Jamais (Moto Cannot Yield)", effect: "À cheval ou en posture d'Assaut, gardez un nombre de dés de dégâts supplémentaires égal à la moitié de votre Force (arrondi à l'inférieur), uniquement avec une arme à deux mains ou portant le mot-clé Samouraï." }
        ]
      },
      {
        id: "vierge-utaku",
        family: "Utaku",
        name: "Vierge Guerrière Utaku (Battle Maiden)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 6.5,
        skills: ["Art de la Guerre", "Défense", "Équitation 2", "Kenjutsu", "Sincérité", "Une compétence Noble ou Bugei au choix"],
        outfit: "Armure légère ou d'équitation, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, Destrier Utaku, 10 koku",
        techniques: [
          { rank: 1, name: "Chevaucher en Harmonie (Riding in Harmony)", effect: "Vous gagnez un bonus égal à votre Rang d'Honneur à un jet d'attaque par Round (à cheval, vous pouvez l'appliquer à la place à un jet de dégâts). De plus, vous ajoutez votre Rang d'Honneur au total de tous vos jets d'Équitation." },
          { rank: 2, name: "Le Vide de la Guerre (The Void of War)", effect: "Durant l'Étape 1 d'un Round de combat, ajoutez +5 soit à votre Score d'Initiative, soit à votre ND d'Armure jusqu'à nouvelle utilisation ou fin de l'escarmouche." },
          { rank: 3, name: "Sentir la Brise (Sensing the Breeze)", effect: "Lorsque vous êtes à cheval, vous pouvez effectuer vos attaques par une Action Simple." },
          { rank: 4, name: "Le Vent ne s'Arrête Jamais (Wind Never Stops)", effect: "En dépensant 1 point de Vide, vous pouvez effectuer une Action Simple pour charger et attaquer à la fin de votre mouvement (à cheval, avec la vitesse de votre monture) : si l'attaque réussit, vous gagnez +2g1 à tous vos jets de dégâts ce Tour." },
          { rank: 5, name: "La Bénédiction d'Otaku (Otaku's Blessing)", effect: "Au début de votre Tour par Action Gratuite, dépensez 1 point de Vide pour ajouter votre Rang d'Honneur à tous vos jets de dégâts et de Compétences Bugei ce Tour (cumulatif avec Chevaucher en Harmonie)." }
        ]
      },
      {
        id: "courtisan-ide",
        family: "Ide",
        name: "Émissaire Ide",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 5.5,
        skills: ["Calligraphie", "Commerce", "Courtisan", "Étiquette (Conversation)", "Équitation", "Sincérité (Honnêteté)", "Une compétence Noble ou d'Art de la Scène au choix"],
        outfit: "Vêtements extravagants, Wakizashi, 1 arme au choix, nécessaire de calligraphie, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Le Cœur Parle (The Heart Speaks)", effect: "Lorsque vous risquez d'offenser par inadvertance, lancez Étiquette (Courtoisie) / Intuition contre ND 20 pour l'éviter. Vous gagnez une Augmentation Gratuite en Sincérité (Honnêteté), mais votre ND augmente de +5 avec Sincérité (Tromperie)." },
          { rank: 2, name: "Percer les Voiles (Piercing the Veils)", effect: "Faites un Jet Social Opposé d'Étiquette / Intuition contre Étiquette / Volonté d'une cible pour connaître ses véritables émotions générales (Augmentations pour plus de détails)." },
          { rank: 3, name: "Le Cœur Écoute (The Heart Listens)", effect: "Après au moins 10 minutes de conversation (hors Ennemis Jurés), faites un Jet Opposé de Sincérité (Honnêteté) / Intuition contre Étiquette (Courtoisie) / Volonté pour améliorer l'attitude de la cible (Allié pour le reste du jour avec 2 Augmentations)." },
          { rank: 4, name: "Répondre au Cœur (Answering the Heart)", effect: "Lors de l'utilisation de vos Techniques de Rang 2 et Rang 3, vous lancez un nombre de dés non gardés supplémentaires égal à votre Rang d'École." },
          { rank: 5, name: "La Main Immuable de la Paix (The Immovable Hand of Peace)", effect: "Dépensez 1 point de Vide pour un Jet Opposé de Sincérité (Honnêteté) / Intuition contre Étiquette (Courtoisie) / Intuition d'une cible (Honneur >= 2.0) : en cas de succès, elle ne peut entreprendre aucune action hostile contre vous pendant 2 × Rang d'École heures tant que vous restez pacifique." }
        ]
      },
      {
        id: "shugenja-iuchi",
        family: "Iuchi",
        name: "Shugenja Iuchi",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 5.5,
        skills: ["Art de la Guerre", "Calligraphie (Chiffre)", "Équitation", "Connaissance : Théologie", "Méditation", "Art de la Magie", "Une compétence Noble ou Bugei au choix"],
        outfit: "Vêtements extravagants, Wakizashi, 1 arme au choix, nécessaire de calligraphie, nécessaire de voyage, Cheval d'équitation Licorne, 10 koku",
        techniques: [
          { rank: 1, name: "Esprit du Vent (Spirit of the Wind)", effect: "Affinité : Eau / Déficience : Feu. Sorts : Sens, Communion, Convocation, 3 Eau, 2 Terre, 1 Air. Par Action Complexe, sacrifiez un emplacement de sort de n'importe quel élément pour accorder à une cible une Action Simple de Déplacement supplémentaire utilisable lors de son prochain Tour. Augmentation Gratuite sur tout sort portant le mot-clé Voyage." }
        ]
      },
      {
        id: "bushi-shinjo",
        family: "Shinjo",
        name: "Bushi Shinjo (Emerald Empire p. 31)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Équitation 2", "Kenjutsu", "Kyujutsu", "Une compétence au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc, Couteau, nécessaire de voyage, Cheval, 10 koku",
        techniques: [
          { rank: 1, name: "La Voie du Ki-Rin (The Way of the Ki-Rin)", effect: "Lorsque vous dépensez 1 point de Vide sur un jet de Compétence d'École (hors posture du Centre), ajoutez aussi votre rang d'Équitation au total." },
          { rank: 2, name: "Danse de la Lame (Dance of the Blade)", effect: "En posture de Défense Totale (Rang d'École fois par Round), si une attaque vous touche, faites une Action Gratuite pour tenter un Jet Opposé d'Agilité : en cas de succès, l'attaque rate." },
          { rank: 3, name: "La Frappe des Quatre Vents (The Four Winds Strike)", effect: "Attaques par Action Simple avec les armes Samouraï (et avec l'arc lorsque vous êtes à cheval)." },
          { rank: 4, name: "L'Esprit de la Lame Déchaîné (Spirit of the Blade Unleashed)", effect: "En posture de Défense ou Défense Totale (1/Round, Rang d'École/escarmouche), après une attaque de mêlée contre vous, ripostez par Action Gratuite (vous passez alors en posture d'Attaque)." },
          { rank: 5, name: "Danser avec les Fortunes (Dancing with the Fortunes)", effect: "À cheval (ou à pied ND 30), quand vous voulez dépenser un point de Vide, lancez Vide contre ND 20 par Action Gratuite : si réussi, vous obtenez les effets du point de Vide sans le dépenser (jusqu'à votre Vide initial par escarmouche)." }
        ]
      },
      {
        id: "shugenja-horiuchi",
        family: "Horiuchi",
        name: "Shugenja Horiuchi / Meishodo (Great Clans p. 257)",
        type: "Shugenja",
        trait: "Constitution",
        bonus: "+1 Constitution",
        honor: 4.5,
        skills: ["Calligraphie", "Artisanat : Meishodo", "Défense", "Connaissance : Théologie", "Méditation", "Art de la Magie (Recherche de Sorts)", "Une compétence Noble ou Bugei au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins/amulettes, nécessaire de voyage, 4 koku",
        techniques: [
          { rank: 1, name: "Mystères du Meishodo (Mysteries of Meishodo)", effect: "Affinité : Terre / Déficience : Air. Sorts : Sens, Communion, Convocation, 3 Terre, 2 Eau, 1 Feu. Créez des amulettes de sort (Maîtrise <= votre Rang d'École, max Maîtrise 3) en Artisanat : Meishodo / Anneau contre ND 15 + 5 × Maîtrise (en autant d'heures que la Maîtrise). Activer un talisman ne prend qu'une Action Complexe sans jet d'Incantation (dépense un emplacement, aucune Augmentation possible)." }
        ]
      },
      {
        id: "moto-vindicator",
        family: "Moto",
        name: "Vengeur Moto (Great Clans p. 258)",
        type: "Bushi",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 3.5,
        skills: ["Équitation", "Chasse", "Enquête (Observation)", "Kenjutsu", "Kyujutsu", "Connaissance : Outremonde", "Une compétence Bugei au choix"],
        outfit: "Armure lourde, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, Cheval d'équitation, 5 koku (requiert Objectif Supérieur ou Obsédé : Vaincre l'Outremonde)",
        techniques: [
          { rank: 1, name: "Pureté du Souffle (Purity of the Breath)", effect: "Au début du Round, réduisez vos malus de Blessures OU ajoutez à votre ND d'Armure un montant égal à Rang d'École + Volonté (doublé contre les créatures de l'Outremonde)." },
          { rank: 2, name: "Affronter les Ténèbres Intérieures (Facing the Dark Within)", effect: "+2g0 aux jets d'Enquête (+2g1 pour déceler la Souillure)." },
          { rank: 3, name: "Justice de nos Ancêtres (Justice of Our Ancestors)", effect: "Attaques de mêlée par Action Simple." },
          { rank: 4, name: "Venger les Nôtres (Avenging Our Own)", effect: "+2g0 en attaque et dégâts contre tout ennemi qui vous a attaqué ou toute créature portant la Souillure." },
          { rank: 5, name: "Sanglant mais Indompté (Bloodied but Unbowed)", effect: "Une fois par escarmouche par Action Gratuite pendant 2 Rounds (prolongeable au prix de 10 Blessures/Round), ajoutez vos malus de Blessures de base aux dégâts de mêlée." }
        ]
      },
      {
        id: "moto-death-priest",
        family: "Moto",
        name: "Prêtre de la Mort Moto (Imperial Histories I p. 241)",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 3.5,
        skills: ["Athlétisme", "Équitation", "Chasse", "Connaissance : Théologie", "Méditation", "Art de la Magie", "Une compétence au choix"],
        outfit: "Vêtements de voyage robustes, Wakizashi, 1 arme au choix, nécessaire de voyage, Destrier Licorne, 5 koku",
        techniques: [
          { rank: 1, name: "Bénédictions des Shi-Tien Yen-Wang", effect: "Affinité : Terre / Déficience : Air. Sorts : Sens, Communion, Convocation, 3 Terre, 2 Feu, 1 Eau. Par Action Simple, sacrifiez 1 emplacement de sort pour un Jet Opposé de Volonté contre un ennemi (portée Rang d'École × 30 m) : pendant Rang d'École Rounds, la cible ne bénéficie plus des dés explosifs ni des Avantages de relance. Augmentation Gratuite sur les sorts avec mot-clé Voyage." }
        ]
      },
      {
        id: "utaku-mounted-infantry",
        family: "Utaku",
        name: "Infanterie Montée Utaku (Imperial Histories II p. 168)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 5.5,
        skills: ["Athlétisme", "Art de la Guerre", "Défense", "Kenjutsu", "Armes d'Hast", "Lances", "Une compétence Bugei ou Noble au choix"],
        outfit: "Vêtements normaux, Daisho, une Lance ou Arme d'Hast, Armure légère, Cheval d'équitation Licorne, nécessaire de voyage, 5 koku",
        techniques: [
          { rank: 1, name: "Choisis ton Arme (Choose Your Weapon)", effect: "Choisissez Kenjutsu, Armes d'Hast ou Lances (Spécialisation gratuite). +1g0 à l'attaque avec cette compétence. En Défense ou Défense Totale avec cette arme, ajoutez votre rang en Lances/Armes d'Hast (ou moitié pour Kenjutsu) à votre ND d'Armure." },
          { rank: 2, name: "Vitesse de mes Sœurs (Speed of My Sisters)", effect: "À pied, déplacez-vous comme si votre Eau était supérieure de +1 et gagnez +1g0 en Initiative." },
          { rank: 3, name: "Assaut sur Tous les Fronts (All-Fronts Attack)", effect: "Attaques par Action Simple avec votre arme choisie." },
          { rank: 4, name: "Le Tonnerre d'Utaku (Utaku's Thunder)", effect: "Une fois par escarmouche avec votre arme choisie, dépensez 1 point de Vide pour ajouter votre Honneur en dés non gardés à l'attaque ; bonus d'Eau pour le mouvement passe à +2." },
          { rank: 5, name: "L'Épopée de mon Nom (Epic of My Name)", effect: "Le bonus au ND d'Armure de Rang 1 s'applique aussi en posture d'Attaque. Une fois par escarmouche en Assaut (ou en Attaque pour Lances/Armes d'Hast), +4g2 aux dégâts." }
        ]
      }
    ]
  },

  // =========================================================================
  // 9. FAMILLES IMPÉRIALES (Core pp. 227-230 ; IH2 p. 26-28)
  // =========================================================================
  imperial: {
    name: "Familles Impériales",
    families: [
      { name: "Miya", trait: "Réflexes", bonus: "+1 Réflexes" },
      { name: "Otomo", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Seppun", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Hantei", trait: "Vide", bonus: "+1 Vide (Dynastie Hantei)" },
      { name: "Toturi", trait: "Volonté", bonus: "+1 Volonté (Dynastie Toturi)" }
    ],
    schools: [
      {
        id: "seppun-guardsman",
        family: "Seppun",
        name: "Garde Seppun (Miharu)",
        type: "Bushi",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 6.5,
        skills: ["Art de la Guerre", "Défense", "Étiquette", "Iaijutsu", "Kenjutsu (Katana)", "Kyujutsu", "Une compétence Noble au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Jamais dans les Ténèbres (Never in Darkness)", effect: "Pour résister à tout Jet Social visant à vous tenter ou vous détourner de votre devoir, lancez un nombre de dés non gardés supplémentaires égal à votre Rang d'École. Vous gagnez +1g1 sur tout jet d'Enquête pour détecter une embuscade ou une attaque surprise." },
          { rank: 2, name: "Les Nuages se Dissipent (The Clouds Part)", effect: "Au début de votre Tour, dépensez 1 point de Vide pour ajouter votre Rang d'Honneur à tous vos jets d'attaque et de dégâts jusqu'à votre prochain Tour." },
          { rank: 3, name: "La Lumière du Soleil Révèle (Sun's Light Reveals)", effect: "Dépensez 1 point de Vide par Action Gratuite (gratuit devant la famille Impériale) pour lancer Enquête (Observation) / Perception ND 25 afin de percer tout déguisement ou illusion, même magique." },
          { rank: 4, name: "Vitesse des Cieux (Speed of Heaven)", effect: "Vous attaquez par Action Simple avec les armes portant le mot-clé Samouraï." },
          { rank: 5, name: "Le Ciel ne Tombe Jamais (Heaven Never Falls)", effect: "À 6 m (20') ou moins de votre protégé, dépensez 1 point de Vide pour encaisser à sa place les dégâts d'un coup ou d'un sort ; si vous restez debout, prenez immédiatement une Action Simple supplémentaire (utilisable même Aveuglé, À terre, Sonné, Hébété, Entravé ou À genoux)." }
        ]
      },
      {
        id: "seppun-shugenja",
        family: "Seppun",
        name: "Shugenja Seppun (Garde Cachée)",
        type: "Shugenja",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 6.5,
        skills: ["Calligraphie", "Défense", "Étiquette", "Enquête (Observation)", "Méditation", "Connaissance : Théologie", "Une compétence Noble ou Bugei au choix"],
        outfit: "Robes, Wakizashi, Bo, Sacoche à parchemins, nécessaire de voyage, 10 koku",
        techniques: [
          { rank: 1, name: "Pour la Défense du Trône (In Defense of the Throne)", effect: "Affinité : Feu / Déficience : Eau. Sorts : Sens, Communion, Convocation, 3 Feu, 2 Terre, 1 Air. Vous gagnez une Augmentation Gratuite sur tout sort lancé pour protéger la vie, les biens, la famille ou la réputation de l'Empereur (ou des Familles Impériales, hors vous-même) sans perte d'Honneur, ainsi que sur tout sort exclusif aux Familles Impériales." }
        ]
      },
      {
        id: "otomo-courtier",
        family: "Otomo",
        name: "Courtisan Otomo (Seiyaku)",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 5.5,
        skills: ["Courtisan (Manipulation)", "Défense", "Étiquette", "Intimidation (Contrôle)", "Enquête", "Sincérité", "Une compétence Noble au choix"],
        outfit: "Vêtements traditionnels, Wakizashi, Couteau, nécessaire de calligraphie, 10 koku",
        techniques: [
          { rank: 1, name: "La Voix des Cieux (The Voice of Heaven)", effect: "Vous ne perdez pas d'Honneur en utilisant Intimidation (Contrôle). En conversant avec un membre d'un clan, Jet Opposé de Courtisan (Manipulation) / Intuition contre Étiquette (Courtoisie) / Intuition pour provoquer un désaccord avec un autre clan/faction." },
          { rank: 2, name: "Le Destin n'a Aucun Secret (Destiny Has No Secrets)", effect: "Dépensez 1 point de Vide pour consulter vos réseaux et lancer Courtisan / Intuition ND 25 afin d'obtenir une information capitale." },
          { rank: 3, name: "La Voix de mon Maître (My Master's Voice)", effect: "Par Action Complexe contre un samouraï honorable (Honneur >= 1.0), Jet Opposé d'Intimidation (Contrôle) / Volonté contre Étiquette (Courtoisie) / Volonté (1 Augmentation Gratuite à la cible si sincèrement honorable) : s'il perd, il ne peut rien faire contre vous ou vos alliés directs au Tour suivant (obiesaseru)." },
          { rank: 4, name: "La Protection de l'Empereur (The Emperor's Protection)", effect: "Dans un débat public, dépensez 1 point de Vide pour un Jet Opposé de Courtisan (Manipulation) / Intuition contre Étiquette (Courtoisie) / Intuition : la cible perdante doit accepter votre position ou perdre aussitôt 5 points d'Honneur." },
          { rank: 5, name: "Les Vertus du Commandement (The Virtues of Command)", effect: "Bonus de +5g0 sur tout Jet Social Opposé contre quiconque révère l'autorité Impériale." }
        ]
      },
      {
        id: "miya-herald",
        family: "Miya",
        name: "Héraut Miya",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 6.5,
        skills: ["Courtisan (Rhétorique)", "Défense", "Étiquette (Courtoisie)", "Équitation", "Connaissance : Héraldique", "Sincérité", "Une compétence Noble ou Bugei au choix"],
        outfit: "Vêtements pratiques, Wakizashi, nécessaire de calligraphie, Poney de Rokugan, 10 koku",
        techniques: [
          { rank: 1, name: "La Voie de l'Empereur (Voice of the Emperor)", effect: "Dépensez 1 point de Vide pour gagner l'Avantage Enfant du Pays pour votre province actuelle jusqu'au prochain sommeil. Quiconque révérant l'Empereur et vous attaquant délibérément perd aussitôt un nombre de points d'Honneur égal au double de votre Rang d'École." },
          { rank: 2, name: "Les Yeux de l'Empereur (Eyes of the Emperor)", effect: "Ajoutez votre Rang d'Honneur à tous vos jets d'Étiquette (Courtoisie) pour résister aux tentatives d'influence." },
          { rank: 3, name: "La Main de l'Empereur (Hand of the Emperor)", effect: "Tant que vous ne combattez pas ni ne duelez, dépensez 1 point de Vide par Action Gratuite pour empêcher tout Rokugani révérant l'Empereur de vous infliger des dégâts jusqu'à la prochaine phase de Réactions." },
          { rank: 4, name: "Les Bénédictions de l'Empereur (Blessings of the Emperor)", effect: "Par Action Complexe (Rang d'École/session), Jet Opposé de Courtisan (Rhétorique) / Intuition contre Étiquette (Courtoisie) / Volonté de tous ceux qui entendent (Honneur >= 1.0) : les perdants cessent toute attaque pendant 1 minute tant qu'ils ne sont pas blessés." },
          { rank: 5, name: "La Gloire de l'Empereur (Glory of the Emperor)", effect: "Bonus de +5g0 aux jets de Courtisan et d'Étiquette contre toute cible ayant au moins 1.0 d'Honneur." }
        ]
      }
    ]
  },

  // =========================================================================
  // 10. CLAN DE L'ARAIGNÉE (Core pp. 211-215 ; Great Clans p. 280)
  // =========================================================================
  araignee: {
    name: "Clan de l'Araignée",
    families: [
      { name: "Chuda", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Daigotsu", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Goju", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Moines de l'Araignée", trait: "Réflexes", bonus: "+1 Réflexes" },
      { name: "Ninube", trait: "Réflexes", bonus: "+1 Réflexes" }
    ],
    schools: [
      {
        id: "daigotsu-bushi",
        family: "Daigotsu",
        name: "Bushi Daigotsu (Core p. 212)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 1.5,
        skills: ["Chasse", "Intimidation", "Jiujutsu", "Kenjutsu (Katana)", "Kyujutsu", "Connaissance : Outremonde", "Une compétence Bugei ou Dégradante au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie de l'Araignée (The Way of the Spider)", effect: "Au début de chaque Round, réduisez vos malus de Blessures OU augmentez vos dégâts d'un montant égal à Force + Rang de Souillure. Le ND de tout jet visant à détecter votre Souillure augmente de +10." },
          { rank: 2, name: "Aura de Sang (Aura of Blood)", effect: "Dépensez 1 point de Vide par Action Simple : vous et vos alliés à 9 m (30') ajoutez +2g0 à tous vos jets de dégâts pendant Rang de Souillure + Force Rounds." },
          { rank: 3, name: "L'Aile d'Ashura (Ashura's Wing)", effect: "Vous attaquez en mêlée par une Action Simple." },
          { rank: 4, name: "Colère Dévorante (Devouring Wrath)", effect: "À chaque coup réussi en mêlée, vous récupérez 5 Blessures (pouvant dépasser votre maximum de 20 Blessures jusqu'à la fin du combat)." },
          { rank: 5, name: "Assaut Inhumain (Inhuman Assault)", effect: "Une fois par escarmouche, une attaque en Action Complexe ignore armure (et sa Réduction) et Posture pendant Rang de Souillure + Force Rounds." }
        ]
      },
      {
        id: "chuda-shugenja",
        family: "Chuda",
        name: "Shugenja Chuda (Core p. 213)",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 0.5,
        skills: ["Calligraphie (Chiffre)", "Chasse", "Connaissance : Maho", "Connaissance : Outremonde", "Art de la Magie", "Discrétion", "Une compétence au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Le Sang comme de l'Eau (Blood Like Water)", effect: "Affinité pour tout sort de Maho non-Vide / Déficience pour tout sort non-Maho d'un élément non-Vide choisi. Sorts : Sens, Communion, Convocation, 3 Maho d'un élément, 2 Maho d'un second élément non-Déficient, 1 sort non-Déficient. Lors d'un sort de Maho, 1 Augmentation dissimule sa corruption ; une 2e Augmentation (ou 1 point d'Honneur) réduit la Souillure acquise à 1 seul point." }
        ]
      },
      {
        id: "daigotsu-courtier",
        family: "Daigotsu",
        name: "Courtisan Daigotsu (Core p. 213)",
        type: "Courtisan",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 1.0,
        skills: ["Comédie", "Courtisan (Manipulation)", "Étiquette", "Méditation", "Sincérité (Tromperie)", "Tentation", "Une compétence Noble au choix"],
        outfit: "Vêtements pratiques, Wakizashi, nécessaire de calligraphie, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Murmures Insidieux (Insidious Whispers)", effect: "Augmentation Gratuite en Sincérité (Tromperie). Le ND pour détecter votre Souillure augmente de 5 × Rang d'École, et vous ajoutez votre Rang d'École à votre Honneur lorsqu'on tente de le discerner." },
          { rank: 2, name: "Fissures dans le Mur (Cracks in the Wall)", effect: "Dépensez 1 point de Vide en Action Simple et lancez Courtisan (Manipulation) / Intuition ND 25 : tous dans un rayon de 6 m subissent -1g1 en Étiquette et Art de la Scène pendant 1 heure." },
          { rank: 3, name: "Les Ténèbres ne Peuvent Être Piégées (Darkness Cannot Be Trapped)", effect: "Dépensez 1 point de Vide en Action Simple pour détourner le blâme sur un tiers présent via un Jet Opposé de Sincérité (Tromperie) / Intuition." },
          { rank: 4, name: "Le Contact du Péché (The Touch of Sin)", effect: "Rang d'École/session, Jet Opposé de Courtisan (Manipulation) / Volonté contre Étiquette (Courtoisie) / Volonté pour infliger l'un des 7 Désavantages Consumé par le Shourido pendant Rang d'École heures." },
          { rank: 5, name: "L'Étreinte des Ténèbres (The Embrace of Darkness)", effect: "Jet Opposé de Sincérité (Tromperie) / Intuition contre Étiquette (Courtoisie) / Perception (+5g0 si Consumé par Shourido) pour convaincre la cible qu'un groupe/individu est son ennemi (1 fois/mois par cible)." }
        ]
      },
      {
        id: "spider-monk",
        family: "Moines de l'Araignée",
        name: "Ordre des Moines de l'Araignée (Core p. 215)",
        type: "Moine",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 1.5,
        skills: ["Athlétisme", "Jiujutsu 2", "Connaissance : Théologie", "Méditation", "Armes d'Hast", "Une compétence au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Arme Lourde ou Arme d'Hast, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Voie Sombre (The Dark Path)", effect: "Vous gagnez +1g0 à vos attaques à mains nues ou avec une arme d'hast, et ajoutez le double de votre Rang d'École à votre ND d'Armure en mêlée." },
          { rank: 2, name: "Attirer dans la Frappe (Drawing in the Strike)", effect: "Choisissez un Anneau non-Vide : gagnez une Réduction égale à cet Anneau + votre Rang de Souillure." },
          { rank: 3, name: "Vitesse des Ténèbres (Speed of Darkness)", effect: "Attaques par Action Simple avec une arme d'hast ou à mains nues." },
          { rank: 4, name: "Gardé par le Chi (Guarded by Chi)", effect: "Ajoutez deux fois un Anneau non-Vide choisi + Rang de Souillure au ND de tout sort lancé contre vous." },
          { rank: 5, name: "Les Ténèbres Déchaînées (Darkness Unleashed)", effect: "Vous gagnez chaque jour un nombre de points de Vide bonus égal au plus élevé de votre Souillure ou Anneau de Terre (dépensables aussi pour +1g1 aux dégâts)." }
        ]
      },
      {
        id: "goju-ninja",
        family: "Goju",
        name: "Ninja Goju (Great Clans p. 280)",
        type: "Ninja",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 0.0,
        skills: ["Athlétisme", "Kenjutsu", "Ninjutsu", "Sincérité (Tromperie)", "Discrétion 2", "Une compétence au choix"],
        outfit: "Vêtements noirs, Ninja-to, Tanto, 6 Shuriken ou Tsubute, 1 arme, corde et grappin (15 m), nécessaire de voyage, 1 koku",
        techniques: [
          { rank: 1, name: "Le Manteau de la Nuit (The Cloak of Night)", effect: "Par Action Simple pour l'escarmouche, augmentez votre ND d'Armure jusqu'à 5 × Rang d'École au prix d'une hausse égale du ND de tous vos jets hors Athlétisme, Défense et Discrétion." },
          { rank: 2, name: "Se Fondre dans l'Ombre (Melting Into Shadow)", effect: "Ajoutez votre Rang d'École en dés lancés en Discrétion ; +5 × Rang d'École au ND adverse pour vous repérer ; Augmentation Gratuite sur les attaques contre cibles inconscientes de vous." },
          { rank: 3, name: "La Lame Ombrée (The Shadowed Blade)", effect: "Attaques par Action Simple avec Couteaux ou Ninjutsu (ou Action Complexe pour Rang d'École tirs de shuriken)." },
          { rank: 4, name: "Pas dans l'Ombre (Step Within Shadow)", effect: "Téléportez-vous d'une ombre à une autre à portée Rang d'École × 30 m par Action Simple de Déplacement." },
          { rank: 5, name: "Ombre sur la Lune (Shadow Upon the Moon)", effect: "Dissolvez-vous en vapeur noire (Action Simple, retour en Action Gratuite avec +5 Initiative), traversant Rang d'École × 12 cm de matière solide et invulnérable sauf au cristal." }
        ]
      },
      {
        id: "ninube-shugenja",
        family: "Ninube",
        name: "Shugenja Ninube (Great Clans p. 281)",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 0.0,
        skills: ["Calligraphie", "Couteaux", "Sincérité (Mensonge)", "Art de la Magie", "Discrétion 2", "Une compétence Dégradante au choix"],
        outfit: "Vêtements noirs, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 2 koku",
        techniques: [
          { rank: 1, name: "Masque du Néant (Mask of the Nothing)", effect: "Affinité : Air / Déficience : Terre. Sorts : Sens, Communion, Convocation, 3 Air, 2 Feu, 1 Eau. Par Action Complexe, dépensez un emplacement pour devenir une ombre (+5g0 Discrétion, invisible dans l'obscurité, immunisé aux armes ordinaires ; vulnérable au cristal/lumière ×2). Augmentation Gratuite sur tout sort du Néant ; impossible de lancer de Maho." }
        ]
      }
    ]
  },

  // =========================================================================
  // 11. CLANS MINEURS (Core pp. 215-225)
  // =========================================================================
  mineurs: {
    name: "Clans Mineurs",
    families: [
      { name: "Ichiro (Blaireau)", trait: "Force", bonus: "+1 Force" },
      { name: "Komori (Chauve-Souris)", trait: "Intelligence", bonus: "+1 Intelligence" },
      { name: "Heichi (Sanglier)", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Tonbo (Libellule)", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Toritaka (Faucon)", trait: "Perception", bonus: "+1 Perception" },
      { name: "Kitsune (Renard)", trait: "Volonté", bonus: "+1 Volonté" },
      { name: "Usagi (Lièvre)", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Ujina (Lièvre)", trait: "Agilité", bonus: "+1 Agilité" },
      { name: "Toku (Singe)", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Fuzake (Singe)", trait: "Perception", bonus: "+1 Perception" },
      { name: "Tsi (Loriot)", trait: "Force", bonus: "+1 Force" },
      { name: "Morito (Bœuf)", trait: "Constitution", bonus: "+1 Constitution" },
      { name: "Chuda orig. (Serpent)", trait: "Force", bonus: "+1 Force" },
      { name: "Suzume (Moineau)", trait: "Intuition", bonus: "+1 Intuition" },
      { name: "Kasuga (Tortue)", trait: "Perception", bonus: "+1 Perception" }
    ],
    schools: [
      {
        id: "ichiro-bushi",
        family: "Ichiro (Blaireau)",
        name: "Bushi Ichiro (Clan du Blaireau, Core p. 215)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.5,
        skills: ["Athlétisme", "Commerce", "Défense", "Armes Lourdes", "Jiujutsu", "Kenjutsu (Katana)", "Une compétence Noble ou Bugei au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Transcender la Montagne (Transcend the Mountain)", effect: "Relancez tout jet de Compétence ou de Trait basé sur la Force (en gardant le 2e résultat) ; ignorez les malus de terrain Modéré et divisez par deux ceux du terrain Difficile." },
          { rank: 2, name: "Force du Blaireau (Strength of the Badger)", effect: "Votre Force fois par session, relancez un jet de dégâts en conservant le meilleur résultat." },
          { rank: 3, name: "Coup Écrasant (Crushing Blow)", effect: "Ignorez les bonus d'armure sur le ND d'Armure adverse ; vos attaques à mains nues ignorent 1 point de Réduction." },
          { rank: 4, name: "Pierres Écrasantes (Crashing Stones)", effect: "Attaques par Action Simple avec les armes Samouraï ou à mains nues." },
          { rank: 5, name: "Renvoyer la Frappe (Return the Strike)", effect: "Avant l'Initiative, réduisez votre Initiative totale de 20 pour toute l'escarmouche afin d'ajouter votre Force en dés non gardés à vos attaques et dégâts durant les 2 premiers Rounds." }
        ]
      },
      {
        id: "komori-shugenja",
        family: "Komori (Chauve-Souris)",
        name: "Shugenja Komori (Clan de la Chauve-Souris, Core p. 216)",
        type: "Shugenja",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 4.5,
        skills: ["Calligraphie (Chiffre)", "Connaissance : Ancêtres", "Connaissance : Théologie", "Méditation", "Art de la Magie", "Cérémonie du Thé", "Une compétence Noble au choix"],
        outfit: "Robes, Wakizashi, 1 arme au choix, Sacoche à parchemins, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Les Murmures des Kami (The Kami's Whispers)", effect: "Affinité : Air / Déficience : Terre. Sorts : Sens, Communion, Convocation, 3 Air, 2 Eau, 1 Feu. Dépensez 1 emplacement pour transmettre un message chuchoté de 30 secondes × Rang d'École jusqu'à Rang d'École × 100 miles." }
        ]
      },
      {
        id: "heichi-bushi",
        family: "Heichi (Sanglier)",
        name: "Bushi Heichi (Clan du Sanglier, Core p. 217)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force",
        honor: 3.0,
        skills: ["Athlétisme", "Défense", "Chasse", "Intimidation", "Kenjutsu", "Lances (Mai Chong)", "Une compétence Bugei au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, une Lance, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Charge du Sanglier (The Charge of the Boar)", effect: "En Assaut, dégainez une arme Moyenne ou une Lance par Action Gratuite. Bonus de +0g1 aux dégâts avec une Lance." },
          { rank: 2, name: "La Force de l'Opposition (The Strength of Opposition)", effect: "Manœuvre Entraver (Entangle) possible pour 2 Augmentations avec un Mai Chong ou 3 Augmentations avec une autre Lance." },
          { rank: 3, name: "La Vitesse du Sanglier (The Speed of the Boar)", effect: "Attaques par Action Simple avec une Lance." },
          { rank: 4, name: "La Colère du Sanglier (The Anger of the Boar)", effect: "Dépensez 1 point de Vide durant la phase de Réactions pour réduire vos malus de Blessures d'un palier pour le reste de l'escarmouche." },
          { rank: 5, name: "Au-Delà des Montagnes (Beyond the Mountains)", effect: "En Défense Totale, effectuez une attaque normale à +2g0 avec une Lance ou arme Samouraï par Action Gratuite." }
        ]
      },
      {
        id: "tonbo-shugenja",
        family: "Tonbo (Libellule)",
        name: "Shugenja Tonbo (Clan de la Libellule, Core p. 218)",
        type: "Shugenja",
        trait: "Perception",
        bonus: "+1 Perception",
        honor: 4.5,
        skills: ["Calligraphie", "Courtisan", "Étiquette", "Méditation (Récupération du Vide)", "Sincérité", "Art de la Magie", "Une compétence Noble au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Guidé par le Destin (Guided by Fate)", effect: "Affinité : Eau / Déficience : Feu. Sorts : Sens, Communion, Convocation, 3 Eau, 2 Air, 1 Terre. Dépensez jusqu'à Rang d'École emplacements sur un Jet Social pour +1g0 chacun. Augmentation Gratuite sur tout sort de Divination." }
        ]
      },
      {
        id: "usagi-bushi",
        family: "Usagi (Lièvre)",
        name: "Bushi Usagi (Clan du Lièvre, Core p. 220)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes",
        honor: 4.0,
        skills: ["Athlétisme (Course)", "Défense", "Chasse", "Jiujutsu", "Kenjutsu", "Connaissance : Maho", "Une compétence Noble ou Bugei au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc (20 flèches) ou Couteau, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Vitesse du Lièvre (Speed of the Hare)", effect: "Ajoutez votre rang d'Athlétisme à votre ND d'Armure (sauf en Assaut ou Centre) ; votre Anneau d'Eau compte comme supérieur de +1 pour la distance de déplacement." },
          { rank: 2, name: "Bond du Lièvre (Leap of the Hare)", effect: "En Assaut, bondissez attaquer un ennemi jusqu'à 4,5 m (15') sans dépenser d'Action de Déplacement." },
          { rank: 3, name: "Vif comme l'Éclair (Swift as Lightning)", effect: "Attaques par Action Simple à mains nues, au couteau ou avec arme Samouraï." },
          { rank: 4, name: "Coup de Pied du Lièvre (Kick of the Hare)", effect: "Technique de Rang 2 utilisable en posture d'Attaque ; en Assaut, deuxième attaque dirigée vers un second ennemi à moins de 4,5 m (15')." },
          { rank: 5, name: "Le Style de Reichin (Reichin's Style)", effect: "La manœuvre Feinte ne coûte que 1 Augmentation et ses dégâts bonus ne sont pas limités à 5 × Rang de Réputation." }
        ]
      },
      {
        id: "toku-bushi",
        family: "Toku (Singe)",
        name: "Bushi Toku (Clan du Singe, Core p. 221)",
        type: "Bushi",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 5.5,
        skills: ["Athlétisme", "Défense", "Chasse", "Enquête (Fouille)", "Kenjutsu", "Connaissance : Histoire", "Une compétence Noble ou Bugei au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "La Leçon de Toku (Toku's Lesson)", effect: "+1g0 à tout jet de Compétence contre ND 25 ou plus (y compris les attaques). Réduisez vos malus de Blessures de Volonté + 2 × Rang d'École." },
          { rank: 2, name: "La Force d'un Seul Homme (The Strength of One Man)", effect: "En infériorité numérique ou contre un ennemi de Rang de Réputation supérieur, +1g1 en attaque et dégâts." },
          { rank: 3, name: "Courage par-dessus Tout (Courage Above All)", effect: "Attaques de mêlée par Action Simple." },
          { rank: 4, name: "Forger son Propre Destin (Forge Your Own Fate)", effect: "Lorsque vous subissez des Blessures, dépensez 1 point de Vide pour forcer l'adversaire à retirer ses deux meilleurs dés de dégâts (minimum 1g1 conservé)." },
          { rank: 5, name: "La Fortune Sourit au Mortel (Fortune Favors the Mortal Man)", effect: "Une fois par Round, dépensez 1 point de Vide pour relancer n'importe quel jet avec +2g1 (gardez le meilleur des deux)." }
        ]
      },
      {
        id: "tsi-smith",
        family: "Tsi (Loriot)",
        name: "Forgeron Tsi (Clan du Loriot, Core p. 222)",
        type: "Artisan",
        trait: "Intelligence",
        bonus: "+1 Intelligence",
        honor: 4.5,
        skills: ["Une compétence d'Artisanat au choix", "Commerce", "Une compétence Artisanat Pratique 2", "Défense", "Une compétence d'Arme au choix", "Une compétence Noble, Bugei ou Marchande au choix"],
        outfit: "Vêtements pratiques, Wakizashi, nécessaire de calligraphie, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Outils des Fortunes (Tools of the Fortunes)", effect: "Toutes les compétences Artisanat Pratique comptent comme Compétences d'École ; gagnez 1 Gloire (+1 par tranche de 5 au-dessus du ND) sur les créations difficiles (ND >= 10 + 5 × Rang d'École)." },
          { rank: 2, name: "Bénédiction de Tsi Xing Guo (Tsi Xing Guo's Blessing)", effect: "+2g1 au lieu de +1g1 lorsque vous dépensez 1 point de Vide en maniant/portant une de vos créations ; offrir une de vos créations rapporte Rang d'École en Gloire au donneur et au destinataire." },
          { rank: 3, name: "Dévotion de l'Artisan (A Crafter's Dedication)", effect: "Temps de fabrication divisé par deux sur les objets courants ; par Action Complexe, accordez +Rang d'École g 1 à un porteur présent utilisant votre objet." },
          { rank: 4, name: "Connaissance Exhaustive (Exhaustive Knowledge)", effect: "Dépensez 1 point de Vide par Action Gratuite pour attaquer par Action Simple avec vos armes forgées pendant Rang d'École Rounds." },
          { rank: 5, name: "Acier Plein d'Étoiles (Star-Filled Steel)", effect: "Dépensez tous vos points de Vide à la forge pour créer une Arme Sacrée (Équilibrée +1g0 att, Rapide +5 Init, Incassable, ou Radieuse comme du jade)." }
        ]
      },
      {
        id: "morito-bushi",
        family: "Morito (Bœuf)",
        name: "Bushi Morito (Clan du Bœuf, Core p. 223)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 3.5,
        skills: ["Défense", "Équitation", "Chasse (Pistage)", "Kenjutsu", "Connaissance : Kolat", "Connaissance : Pègre", "Une compétence au choix"],
        outfit: "Armure lourde ou légère, vêtements robustes, Daisho, Arme Lourde ou Arme d'Hast, Poney de Rokugan, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Héritage des Quatre Vents (Legacy of the Four Winds)", effect: "À cheval, +1g0 à l'Initiative au début du combat et +1g0 aux jets d'attaque." },
          { rank: 2, name: "Le Vent Souffle de Maints Côtés (The Wind Blows Many Ways)", effect: "Au début du combat, choisissez Rang d'École compétences Bugei : +1g0 à tous leurs jets." },
          { rank: 3, name: "Tonnerre et Fureur (Thunder and Fury)", effect: "À cheval, vous attaquez par Action Simple." },
          { rank: 4, name: "La Lame sur le Vent (The Blade Upon the Wind)", effect: "Une fois par escarmouche, dépensez 1 point de Vide pour égaler l'Initiative d'un autre participant (-5 à votre Initiative à chaque phase de Réactions ensuite)." },
          { rank: 5, name: "Rapide et Furieux (Fast and Furious)", effect: "Contre un adversaire d'Initiative inférieure à la vôtre, +2g2 à vos jets d'attaque et de dégâts." }
        ]
      },
      {
        id: "chuda-shugenja-original",
        family: "Chuda orig. (Serpent)",
        name: "Shugenja Chuda Originel (Clan du Serpent, Core p. 224)",
        type: "Shugenja",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 4.5,
        skills: ["Calligraphie (Chiffre)", "Étiquette", "Connaissance : Maho", "Connaissance : Outremonde", "Art de la Magie", "Deux compétences au choix"],
        outfit: "Robes, Wakizashi, Couteau, Sacoche à parchemins, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Punir les Impies (To Punish the Wicked)", effect: "Affinité : Terre / Déficience : Air. Sorts : Sens, Communion, Convocation, 3 Terre, 2 Feu, 1 Eau. Dépensez 1 point de Vide par Action Gratuite pour annuler Rang d'École points de Réduction d'une cible ; ajoutez votre Rang d'École aux dégâts de tout sort contre une cible portant la Souillure." }
        ]
      },
      {
        id: "suzume-bushi",
        family: "Suzume (Moineau)",
        name: "Bushi Suzume (Clan du Moineau, Core p. 225)",
        type: "Bushi",
        trait: "Volonté",
        bonus: "+1 Volonté",
        honor: 6.5,
        skills: ["Calligraphie", "Kenjutsu (Katana)", "Connaissance : Histoire", "Connaissance : Théologie", "Art de la Scène : Conteur", "Une compétence de Connaissance au choix", "Une compétence au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Chaque Chose en son Temps (All Things in Time)", effect: "Avant le premier Tour du Round, réduisez votre Initiative de 5 pour gagner +1g0 à vos attaques et dégâts pour ce Round." },
          { rank: 2, name: "Pureté du Chi (Purity of Chi)", effect: "+5 au ND d'Armure contre les créatures et les humains ayant un Honneur inférieur au vôtre." },
          { rank: 3, name: "La Sagesse est la Plus Grande Arme (Wisdom is the Greatest Weapon)", effect: "Dépensez 1 point de Vide pour ajouter votre Rang d'Honneur à tout jet d'Art de la Scène ou de Connaissance." },
          { rank: 4, name: "Esprit Calme, Lame Ferme (Quiet Spirit, Steady Blade)", effect: "En posture d'Attaque, vos attaques de mêlée deviennent des Actions Simples." },
          { rank: 5, name: "Lent et Mortel (Slow and Deadly)", effect: "Au Round suivant l'adoption de la posture du Centre (hors duel iaijutsu), ajoutez +10 à vos jets d'attaque et de dégâts." }
        ]
      },
      {
        id: "kasuga-smuggler",
        family: "Kasuga (Tortue)",
        name: "Contrebandier Kasuga (Clan de la Tortue, Core p. 225)",
        type: "Courtisan",
        trait: "Intuition",
        bonus: "+1 Intuition",
        honor: 2.0,
        skills: ["Commerce", "Étiquette", "Enquête (Observation)", "Connaissance : Pègre", "Sincérité (Tromperie)", "Discrétion", "Une compétence Noble, Marchande ou Dégradante au choix"],
        outfit: "Vêtements extravagants, Wakizashi, 1 arme au choix, nécessaire de calligraphie, 5 koku",
        techniques: [
          { rank: 1, name: "La Voie de la Tortue (Way of the Tortoise)", effect: "Une langue gaijin gratuite par achat de Langues à la création. Aucune perte d'Honneur pour les Compétences Dégradantes ni de Gloire pour le Commerce dans le cadre du devoir de clan ; +2g0 en Jets Sociaux avec heimin/hinin." },
          { rank: 2, name: "La Carapace de la Tortue (The Shell of the Tortoise)", effect: "Tout samouraï qui vous attaque physiquement ou vous calomnie ouvertement sans provocation perd aussitôt 2 × Rang d'École points d'Honneur." },
          { rank: 3, name: "Les Yeux de l'Empereur (The Eyes of the Emperor)", effect: "Ajoutez votre Rang d'École en dés non gardés à toutes les Compétences Dégradantes (rang >= 1) utilisées pour le clan." },
          { rank: 4, name: "Main dans la Main (Hand in Hand)", effect: "Une fois par session avec accès aux locaux, Connaissance : Pègre / Intuition ND 25 pour apprendre une information secrète impossible à obtenir autrement." },
          { rank: 5, name: "La Tortue Sourit (The Tortoise Smiles)", effect: "Vos Augmentations sur vos 6 Compétences d'École ne sont pas limitées par votre Vide ; Vide fois par session, gagnez +5g0 sur l'une d'elles (cumulable avec Rang 3)." }
        ]
      }
    ]
  },

  // =========================================================================
  // 12. CONFRÉRIE DE SHINSEI (Core pp. 231-233 ; Books of Elements ; EE ; Secrets)
  // =========================================================================
  confrerie: {
    name: "Confrérie de Shinsei",
    families: [
      { name: "Ordre Shintao (Tao de Shinsei)", trait: "Vide", bonus: "Vide initial 3 (Règle Moine p. 231)" },
      { name: "Ordre Fortuniste (Secte des Fortunes)", trait: "Vide", bonus: "Vide initial 3 (Règle Moine p. 231)" }
    ],
    schools: [
      {
        id: "four-temples-monk",
        family: "Ordre Shintao (Tao de Shinsei)",
        name: "Moine des Quatre Temples (Core p. 231)",
        type: "Moine",
        trait: "Intuition",
        bonus: "+1 Intuition (Vide initial 3)",
        baseVoid: 3,
        honor: 6.5,
        skills: ["Courtisan", "Étiquette", "Jiujutsu", "Connaissance : Théologie (Shintao)", "Méditation", "Deux compétences au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples et grossiers, sacoche de parchemins avec passages du Tao, 2 zeni",
        techniques: [
          { rank: 1, name: "Âme de Civilité (Soul of Civility)", effect: "Dévotion : Shintao. 3 Kiho initiaux (+2 Kiho par Rang d'École). Lorsque vous dépensez 1 point de Vide pour améliorer un jet de Compétence Noble ou Sociale, vous gagnez +2g2 au lieu du +1g1 habituel." }
        ]
      },
      {
        id: "order-of-heroes-monk",
        family: "Ordre Shintao (Tao de Shinsei)",
        name: "Moine de l'Ordre des Héros (Core p. 232)",
        type: "Moine",
        trait: "Perception",
        bonus: "+1 Perception (Vide initial 3)",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Jiujutsu", "Connaissance : Théologie", "Méditation", "Deux compétences au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples et grossiers, sacoche de parchemins avec passages du Tao, 2 zeni",
        techniques: [
          { rank: 1, name: "La Main du Destin (Destiny's Hand)", effect: "Dévotion : Shintao. 3 Kiho initiaux (+2 Kiho par Rang). Dépensez 1 point de Vide par Action Gratuite pour accorder +1g1 à un jet d'un allié n'ayant pas encore agi ce Round (hors jets ne pouvant normalement bénéficier de points de Vide)." }
        ]
      },
      {
        id: "shrine-seven-thunders-monk",
        family: "Ordre Shintao (Tao de Shinsei)",
        name: "Moine du Sanctuaire des Sept Tonnerres (Core p. 232)",
        type: "Moine",
        trait: "Constitution",
        bonus: "+1 Constitution (Vide initial 3)",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Athlétisme", "Jiujutsu", "Connaissance : Théologie (Shintao)", "Une compétence de Connaissance au choix", "Méditation", "Deux compétences au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples et grossiers, sacoche de parchemins avec passages du Tao, 2 zeni",
        techniques: [
          { rank: 1, name: "Marcher avec le Prophète (Walk with the Prophet)", effect: "Dévotion : Shintao. Vos 3 Kiho initiaux (+2 Kiho par Rang) doivent appartenir au même Élément choisi ; votre Rang de Réputation compte comme supérieur de +1 pour la Maîtrise des Kiho de cet Élément." }
        ]
      },
      {
        id: "kaimetsu-uo-monk",
        family: "Ordre Fortuniste (Secte des Fortunes)",
        name: "Moine du Temple de Kaimetsu-Uo (Core p. 232)",
        type: "Moine",
        trait: "Volonté",
        bonus: "+1 Volonté (Vide initial 3)",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Défense", "Jiujutsu", "Connaissance : Théologie (Fortunes)", "Méditation", "Trois compétences au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples et grossiers, sacoche de parchemins avec passages du Tao, 2 zeni",
        techniques: [
          { rank: 1, name: "La Voie de la Pureté (The Path of Purity)", effect: "Dévotion : Fortuniste. 3 Kiho initiaux (+2 Kiho par Rang). Lors d'un Jet Social Opposé initié par votre adversaire, vous pouvez utiliser n'importe quel Anneau à la place du Trait habituel (typiquement l'Intuition)." }
        ]
      },
      {
        id: "osano-wo-monk",
        family: "Ordre Fortuniste (Secte des Fortunes)",
        name: "Moine du Temple d'Osano-Wo (Core p. 233)",
        type: "Moine",
        trait: "Force",
        bonus: "+1 Force (Vide initial 3)",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Art de la Guerre", "Jiujutsu 2", "Connaissance : Théologie (Fortunes)", "Méditation", "Deux compétences Bugei au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples et grossiers, sacoche de parchemins avec passages du Tao, 2 zeni",
        techniques: [
          { rank: 1, name: "La Main du Tonnerre (The Hand of Thunder)", effect: "Dévotion : Fortuniste. 3 Kiho initiaux (+2 Kiho par Rang). Vous gagnez un bonus de +0g1 à tous vos jets de dégâts d'attaques à mains nues (cumulatif avec tout autre effet ajoutant des dés lancés ou gardés)." }
        ]
      },
      {
        id: "thousand-fortunes-monk",
        family: "Ordre Fortuniste (Secte des Fortunes)",
        name: "Moine des Temples des Mille Fortunes (Core p. 233)",
        type: "Moine",
        trait: "Agilité",
        bonus: "+1 Agilité (Vide initial 3)",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Jiujutsu", "Connaissance : Histoire", "Connaissance : Théologie (Fortunes)", "Une compétence de Connaissance au choix", "Méditation", "Deux compétences au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples et grossiers, sacoche de parchemins avec passages du Tao, 2 zeni",
        techniques: [
          { rank: 1, name: "Les Mille Formes (The Thousand Forms)", effect: "Dévotion : Fortuniste. Vous commencez le jeu avec 4 Kiho initiaux au lieu des 3 habituels (sans compter dans la limite de Kiho achetables par XP), puis +2 Kiho par Rang d'École." }
        ]
      },
      {
        id: "winds-grace-order",
        family: "Ordre Shintao (Tao de Shinsei)",
        name: "Ordre de la Grâce du Vent (Book of Air p. 194)",
        type: "Moine",
        trait: "Réflexes",
        bonus: "+1 Réflexes (Vide initial 3)",
        baseVoid: 3,
        honor: 6.5,
        skills: ["Calligraphie", "Jiujutsu", "Kyujutsu", "Connaissance : Théologie (Shintao)", "Méditation", "Deux compétences au choix"],
        outfit: "Vêtements simples, chapeau de paille, Yumi, nécessaire de voyage, 3 koku",
        techniques: [
          { rank: 1, name: "Piliers de l'Œil de l'Esprit (Pillars of the Mind's Eye)", effect: "Dévotion : Shintao. 3 Kiho (+2/Rang). Attaque d'archerie en Action Complexe avec +1g0 par Kiho actuellement actif (un seul Kiho Martial ; ils n'ont pas d'autre effet ce Round ; -3 Honneur si vous tuez un être intelligent avec)." }
        ]
      },
      {
        id: "tengokus-fist",
        family: "Ordre Shintao (Tao de Shinsei)",
        name: "Poing de Tengoku (Book of Fire p. 191)",
        type: "Moine",
        trait: "Agilité",
        bonus: "+1 Agilité (Vide initial 3)",
        baseVoid: 3,
        honor: 4.5,
        skills: ["Athlétisme", "Art de la Guerre", "Jiujutsu 2", "Connaissance : Théologie", "Méditation", "Une compétence au choix"],
        outfit: "Bo (ou paire de Jo), vêtements de voyage simples, sacoche de parchemins, 2 zeni",
        techniques: [
          { rank: 1, name: "La Main des Cieux (The Hand of the Heavens)", effect: "Dévotion : Shintao. 3 Kiho (+2/Rang). Gagnez une Augmentation Gratuite en attaque à mains nues (ou avec bisento, bo ou arme de Moine) si votre Anneau de Feu est supérieur à celui de votre adversaire." }
        ]
      }
    ]
  },

  // =========================================================================
  // 13. RÔNIN (Core pp. 233-235 ; Secrets p. 236 ; IH1 p. 123 ; IH2 p. 103)
  // =========================================================================
  ronin: {
    name: "Rônin",
    families: [
      { name: "Rônin Véritable", trait: "Aucun", bonus: "+10 XP (Option #2) ou +25 XP (Option #1)" },
      { name: "Rônin de Clan (Exilé)", trait: "Aucun", bonus: "Base du Clan d'origine + Désavantage Rônin" }
    ],
    schools: [
      {
        id: "ronin-option-1",
        family: "Rônin Véritable",
        name: "Rônin Véritable — Option #1 (Sans Technique, +25 XP)",
        type: "Bushi",
        trait: "Aucun",
        bonus: "+25 XP à la création (Désavantage Social : Rônin obligatoire)",
        honor: 3.5,
        skills: ["Athlétisme", "Défense", "Chasse", "Kenjutsu", "Une compétence au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements usés, Daisho, nécessaire de voyage",
        techniques: [
          { rank: 1, name: "Option #1 (Sans École, +25 XP)", effect: "Aucun bonus de famille ni d'École ; gagne +25 Points d'Expérience supplémentaires à la création ; doit acquérir le Désavantage Social : Rônin ; Honneur initial 3.5 ; doit rechercher des Voies de Rônin aux Rangs de Réputation supérieurs." }
        ]
      },
      {
        id: "disciples-sun-tao",
        family: "Rônin Véritable",
        name: "Disciples de Sun Tao (Voie Rang 1, Core p. 234)",
        type: "Bushi",
        trait: "Réflexes",
        bonus: "+1 Réflexes (+10 XP Option #2)",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Chasse", "Iaijutsu", "Kenjutsu", "Deux compétences au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 1 koku",
        techniques: [
          { rank: 1, name: "Le Regard de Sun Tao (The Gaze of Sun Tao)", effect: "Vous pouvez ajouter votre Rang d'Honneur au total de tous vos jets de Compétence Iaijutsu." }
        ]
      },
      {
        id: "forest-killers",
        family: "Rônin Véritable",
        name: "Tueurs des Forêts (Voie Rang 1, Core p. 235)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité (+10 XP Option #2)",
        honor: 1.5,
        skills: ["Athlétisme", "Défense", "Chasse", "Kenjutsu", "Kyujutsu", "Discrétion", "Une compétence d'Arme au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 2 koku",
        techniques: [
          { rank: 1, name: "Force de la Forêt (Strength of the Forest)", effect: "Vous gagnez des Blessures supplémentaires par palier égales à votre Constitution, et ajoutez votre Constitution au total de tous vos jets de dégâts d'attaques de mêlée." }
        ]
      },
      {
        id: "tawagoto-army",
        family: "Rônin Véritable",
        name: "Armée de Tawagoto (Voie Rang 1, Core p. 235)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité (+10 XP Option #2)",
        honor: 4.5,
        skills: ["Art de la Guerre", "Défense", "Étiquette", "Enquête", "Kenjutsu", "Lances", "Une compétence au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 1 koku",
        techniques: [
          { rank: 1, name: "La Volonté du Peuple (The People's Will)", effect: "Lorsque vous dépensez 1 point de Vide pour ajouter +1g1 à un jet de Compétence ou de Trait, vous pouvez également ajouter votre Rang d'Honneur au total de ce jet." }
        ]
      },
      {
        id: "tengoku-justice",
        family: "Rônin Véritable",
        name: "Justice de Tengoku (Voie Rang 1, Core p. 235)",
        type: "Bushi",
        trait: "Force",
        bonus: "+1 Force (+10 XP Option #2)",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Équitation", "Chasse", "Kenjutsu", "Kyujutsu", "Une compétence au choix"],
        outfit: "Armure légère ou d'ashigaru, vêtements robustes, Daisho, Arc avec 20 flèches ou Couteau, nécessaire de voyage, 1 koku",
        techniques: [
          { rank: 1, name: "La Malédiction du Ciel (Heaven's Curse)", effect: "Chaque fois que vous surprenez un adversaire dans une escarmouche, vous pouvez doubler votre Force pour déterminer le nombre de dés de dégâts lancés sur cette attaque." }
        ]
      },
      {
        id: "the-tessen",
        family: "Rônin Véritable",
        name: "Le Tessen (Voie Rang 1, Core p. 235)",
        type: "Bushi",
        trait: "Constitution",
        bonus: "+1 Constitution (+10 XP Option #2)",
        honor: 3.5,
        skills: ["Art de la Guerre", "Défense", "Enquête", "Jiujutsu", "Éventails de Guerre", "Deux compétences au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, Éventail de Guerre, 1 arme au choix, nécessaire de voyage, 2 koku",
        techniques: [
          { rank: 1, name: "Plis de l'Éventail de Fer (Folds of the Iron Fan)", effect: "Lorsque vous maniez un éventail de guerre en main secondaire, vous ne subissez aucun malus pour les attaques de cette main. Vous ajoutez également votre rang en Éventails de Guerre à votre ND d'Armure tant que vous maniez un éventail de guerre." }
        ]
      },
      {
        id: "generic-ronin",
        family: "Rônin Véritable",
        name: "Rônin Générique — Option MJ (Secrets p. 236)",
        type: "Bushi",
        trait: "Agilité",
        bonus: "+1 Agilité",
        honor: 4.5,
        skills: ["Athlétisme", "Défense", "Chasse", "Intimidation", "Kenjutsu", "Couteaux", "Une compétence d'Arme au choix"],
        outfit: "Armure légère, vêtements robustes, Daisho, 1 arme au choix, nécessaire de voyage, 1 koku",
        techniques: [
          { rank: 1, name: "Force de mon Père (Strength of My Father)", effect: "En cas de malus de Blessures (sauf À terre ou Hors de combat), jet de Terre (sans malus) ND 5 + 5 × paliers subis pour ignorer les malus jusqu'à la prochaine phase de Réactions." },
          { rank: 2, name: "Ne Jamais Céder (Never Yield)", effect: "En infériorité numérique, gagnez un bonus au ND d'Armure égal à l'écart entre ennemis et alliés (max 2 × Rang d'École)." },
          { rank: 3, name: "Morsure du Loup (Bite of the Wolf)", effect: "Attaques par Action Simple au katana ou au couteau." },
          { rank: 4, name: "Esprit Tranchant deux Fois (Twice-Cutting Spirit)", effect: "Choisissez une arme de mêlée supplémentaire (Action Simple) ; une fois par escarmouche, dépensez 1 point de Vide sur un jet de dégâts." },
          { rank: 5, name: "Vaillance du Loup (Valor of the Wolf)", effect: "Choisissez une autre arme de mêlée (Action Simple) ; dépensez 1 point de Vide pour activer le Rang 1 sans jet pendant Feu Rounds." }
        ]
      }
    ]
  }

};

if (typeof window !== "undefined") {
  window.CLANS_DATA = CLANS_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CLANS_DATA };
}
