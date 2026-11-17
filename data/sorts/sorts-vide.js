/**
 * data/sorts/sorts-vide.js — L5R 4e Édition
 * Recueil officiel exact de la Magie du Vide (Ishiken-dō) (31 sorts).
 * Sources : Livre de Base L5R 4e (pp. 193–197), Imperial Histories 2 (p. 53)
 *           et Secrets of the Empire (p. 235).
 */

const SORTS_VIDE = [
  // =========================================================================
  // NIVEAU DE MAÎTRISE 1 (8 sorts : Livre de Base pp. 193–194)
  // =========================================================================
  {
    id: "void-1-boundless-sight",
    name: "Vue Sans Frontières (Boundless Sight)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "80 kilomètres (50 miles)",
    area: "Le lanceur",
    duration: "4 Rounds",
    raises: "Durée (+1 round), Portée (+8 km / +5 miles)",
    desc: "En concentrant votre énergie à travers le Vide, vous voyez et entendez tout ce qui se passe en un autre lieu comme si vous vous y teniez. Ce lieu doit vous être familier et vous devez l'avoir visité au moins une fois. Vous ne pouvez être détecté ni interagir d'aucune manière avec les objets ou individus présents. Pendant ce sort, votre corps est plongé dans un état de transe qui réduit votre ND d'Armure à 5."
  },
  {
    id: "void-1-drawing-void",
    name: "Puiser dans le Vide (Drawing the Void)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Instantanée",
    raises: "Spéciale (+1 point de Vide gagné par tranche de 3 Augmentations)",
    desc: "À l'achèvement de ce sort, vous gagnez immédiatement un nombre de points de Vide supplémentaires égal à (votre Rang d'École + 1). Si ces points de Vide vous font dépasser le maximum que vous pouvez normalement posséder, vous perdez l'un de ces points de Vide excédentaires à chaque Round où vous n'en dépensez aucun."
  },
  {
    id: "void-1-flow-void",
    name: "Couler à travers le Vide (Flow Through the Void)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 193",
    range: "Contact",
    area: "Jusqu'à 0,03 m³ (1 pied cube) de matière élémentaire pure",
    duration: "Permanente",
    raises: "Zone (+0,03 m³ / +1 pied cube)",
    desc: "Dans le Vide, tous les éléments ne font qu'un. En puisant dans cette connexion, vous transformez un petit volume de matière élémentaire pure (eau, feu, air, ou terre sous forme d'humus ou de poussière) en n'importe quel autre élément."
  },
  {
    id: "void-1-see-through-lies",
    name: "Percer les Mensonges (See Through Lies)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Spéciale (+1 Avantage ou Désavantage supplémentaire par Augmentation)",
    desc: "Les motifs karmiques des individus existent dans le Vide, et un ishiken sait les déchiffrer. Vous apprenez l'Avantage possédant le coût en points le plus élevé ou le Désavantage possédant la valeur en points la plus élevée (à votre choix) chez la cible de ce sort."
  },
  {
    id: "void-1-sense-void",
    name: "Sentir le Vide (Sense Void)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "Personnelle",
    area: "Rayon de 7,5 mètres (25') autour du lanceur",
    duration: "Concentration",
    raises: "Zone (+1,5 m / +5' au rayon)",
    desc: "Vous plongez dans une transe durant laquelle vous prenez conscience de l'existence et de l'emplacement exact de toutes les créatures vivantes situées dans le rayon du sort (même si vous ne pouvez ni les voir ni en percevoir les détails, ni reconnaître qui elles sont sans déjà savoir qu'elles étaient là). Donne également conscience des créatures vivantes naturelles non douées de raison. Les esprits et créatures de l'Outremonde sont perceptibles comme une lacune / absence dans votre conscience, mais ce sort ne permet pas de distinguer les humains Souillés des autres humains."
  },
  {
    id: "void-1-touch-emptiness",
    name: "Toucher le Néant (Touch the Emptiness)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Éprouver directement le Vide est extrêmement perturbant pour ceux qui n'y sont pas accoutumés. La cible de ce sort subit 1g1 dégâts et est Étourdie (Dazed)."
  },
  {
    id: "void-1-voids-caress",
    name: "La Caresse du Vide (The Void's Caress)",
    element: "Vide",
    mastery: 1,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Vous annulez temporairement n'importe quel Désavantage Mental ou Spirituel possédé par la cible, jusqu'à une valeur maximale de 5 points. La Souillure de l'Outremonde ne peut être retirée via ce sort, bien que les troubles mentaux qu'elle engendre puissent être provisoirement apaisés."
  },
  {
    id: "void-1-witness-untold",
    name: "Témoin de l'Inexprimé (Witness the Untold)",
    element: "Vide",
    mastery: 1,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "4,5 mètres (15')",
    area: "Un individu ciblé",
    duration: "3 Rounds",
    raises: "Portée (+1,5 m / +5')",
    desc: "En scrutant le Vide, vous obtenez des aperçus fugaces de ce qui ne s'est pas encore produit. Si vous retardez votre action (Delay), vous pouvez interrompre la cible de ce sort après qu'elle a déclaré son action mais avant qu'elle ne l'accomplisse lorsque vient son Tour — et ce durant chaque Round tant que dure le sort (normalement, retarder son Action ne permet pas d'interrompre l'Action d'un autre participant)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 2 (7 sorts : 6 Livre de Base + 1 Imperial Histories 2)
  // =========================================================================
  {
    id: "void-2-altering-course",
    name: "Modifier le Cours (Altering the Course)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Permet à l'ishiken de puiser consciemment dans le Vide. Vous pouvez dépenser plusieurs points de Vide sur un seul jet effectué pendant la durée du sort. Ce jet doit demeurer un jet sur lequel la dépense de points de Vide est autorisée (ainsi, aucun jet de dégâts ne peut être augmenté via ce sort)."
  },
  {
    id: "void-2-balance-in-all",
    name: "L'Équilibre en Toute Chose (Balance in All)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Imperial Histories 2 (p. 53)",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Round",
    raises: "Durée (+1 round)",
    desc: "Sagesse tirée du Tao de Shinsei sur la connexion entre les Éléments. Une fois ce sort incanté, vous pouvez lancer les sorts de n'importe quel Élément donné comme s'ils appartenaient à un Élément différent — affectant l'Anneau utilisé pour le jet d'incantation, les emplacements de sorts quotidiens consommés, ainsi que toute Affinité, Déficience ou mécanique associée. (Le MJ interprète l'effet visuel ou narratif de ce changement d'Élément.)"
  },
  {
    id: "void-2-drink-essence",
    name: "Boire à ton Essence (Drink of Your Essence)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "En examinant le motif d'un individu dans le Vide, vous apprenez ses différents Anneaux (sans ses Traits), ses pénalités de Blessures actuelles, ainsi qu'un résumé en un mot de son humeur présente (« hostile », « affligé », « confus », etc.)."
  },
  {
    id: "void-2-empty-voice",
    name: "La Voix Vide (The Empty Voice)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 194",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "5 Minutes",
    raises: "Aucune",
    desc: "Pour toute la durée du sort, vous pouvez lancer des sorts des quatre autres Éléments sans avoir à prononcer vos prières à voix haute. Ceci ne s'applique qu'aux sorts d'un Niveau de Maîtrise égal ou inférieur (tout sort de Niveau de Maîtrise 1 ou 2)."
  },
  {
    id: "void-2-false-whispers",
    name: "Faux Murmures (False Whispers)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "9 mètres (30')",
    area: "Un individu ciblé",
    duration: "1 Minute",
    raises: "Aucune",
    desc: "Mêler le Vide de deux êtres permet de manipuler celui qui n'y est pas préparé. La cible de ce sort répète mot pour mot la prochaine phrase que vous prononcerez, sans aucune conscience de ce qu'elle fait et avec sa propre voix normale (quelle que soit votre façon de la prononcer). Cet effet ne permet pas à autrui de lancer des sorts, même si vous lui faites réciter une partie de prière. Ce sort ne s'applique qu'une seule fois, la première fois que vous prononcez une phrase unique pendant sa durée."
  },
  {
    id: "void-2-reach-void",
    name: "Toucher à travers le Vide (Reach Through the Void)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "15 mètres (50')",
    area: "Un objet ciblé pesant jusqu'à 2,25 kg (5 livres)",
    duration: "Instantanée",
    raises: "Zone (+0,45 kg / +1 livre par tranche de 2 Augmentations), Portée (+1,5 m / +5')",
    desc: "Toute chose, vivante ou inanimée, existe dans le Vide et peut être touchée par son entremise. Vous pouvez manipuler à distance des objets sans contact physique, jusqu'à environ 2,25 kg (5 livres) de base (plus avec des Augmentations)."
  },
  {
    id: "void-2-severed-stream",
    name: "Coupé du Flux (Severed from the Stream)",
    element: "Vide",
    mastery: 2,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "5 Rounds",
    raises: "Durée (+1 round), Portée (+1,5 m / +5')",
    desc: "En cas de succès, la cible doit remporter un jet opposé de Vide contre vous avant de pouvoir dépenser le moindre point de Vide. Ce jet ne compte pas comme une Action pour la cible, et elle n'a besoin d'effectuer qu'un seul jet opposé par tour, même si une Technique ou capacité lui permet de dépenser plusieurs points de Vide par tour."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 3 (5 sorts : Livre de Base pp. 195–196)
  // =========================================================================
  {
    id: "void-3-echoes-void",
    name: "Échos dans le Vide (Echoes in the Void)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Concentration",
    raises: "Portée (+1,5 m / +5')",
    desc: "Tant que ce sort est actif et que vous maintenez votre concentration sur une cible dans la zone d'effet, vous entendez ce que cette personne pense. La forme que prennent ces pensées varie selon l'individu (phrases courtes et sèches pour un guerrier résolu, poésie pour un artisan)."
  },
  {
    id: "void-3-kharmic-intent",
    name: "Intention Karmique (Kharmic Intent)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "6 mètres (20')",
    area: "Un individu ciblé",
    duration: "10 Minutes",
    raises: "Durée (+1 minute), Portée (+1,5 m / +5')",
    desc: "Vous ciblez un individu consentant : tous les points de Vide restants que chacun de vous possède sont placés dans une réserve commune dans laquelle chacun peut puiser normalement (y compris les points de Vide supplémentaires obtenus via d'autres sorts de Vide). À la fin du sort, tous les points de Vide restants sont partagés entre les participants jusqu'à concurrence de leur maximum normal."
  },
  {
    id: "void-3-moment-clarity",
    name: "Instant de Clarté (Moment of Clarity)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "2 Rounds",
    raises: "Durée (+1 round)",
    desc: "Vous sélectionnez n'importe quelle Compétence et gagnez temporairement un nombre de rangs dans cette Compétence égal à votre Anneau de Vide. Si vous possédez déjà des rangs dans cette Compétence, ce nouveau rang remplace l'ancien : les deux ne se cumulent pas."
  },
  {
    id: "void-3-read-essence",
    name: "Lire l'Essence (Read the Essence)",
    element: "Vide",
    mastery: 3,
    keywords: ["Divination"],
    source: "Livre des Règles L5R 4e, p. 195",
    range: "Personnelle",
    area: "Un objet ciblé",
    duration: "Instantanée (mais voir description)",
    raises: "Aucune",
    desc: "Les objets conservent une mémoire de ceux qui les manient et des événements majeurs auxquels ils ont été mêlés. En méditant sur un objet, vous recevez la vision de la dernière personne l'ayant tenu, ou d'un événement majeur l'impliquant d'une manière ou d'une autre (le MJ décide de la vision reçue). Des objets d'une extrême importance (armes ancestrales, nemuranai) peuvent plonger le lanceur dans de puissantes visions durant bien plus longtemps qu'un simple instant."
  },
  {
    id: "void-3-void-release",
    name: "Libération du Vide (Void Release)",
    element: "Vide",
    mastery: 3,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5')",
    desc: "Effectuez un jet opposé de Vide contre la cible. En cas de succès, la cible perd un point de Vide et vous gagnez un point de Vide, plus un point supplémentaire échangé par tranche de 5 points par laquelle vous dépassez le jet de la cible. Ces points de Vide temporaires peuvent dépasser votre maximum habituel mais expirent au bout d'une heure s'ils ne sont pas utilisés. Ne peut viser une créature sans points de Vide ou dotée d'une mécanique qui s'y substitue (comme l'Akasha des Nagas ou le Nom des Nezumi)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 4 (5 sorts : 4 Livre de Base + 1 Secrets of the Empire)
  // =========================================================================
  {
    id: "void-4-balance-elements",
    name: "Équilibre des Éléments (Balance of Elements)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "Contact",
    area: "Un individu ciblé (peut être le lanceur)",
    duration: "5 Rounds / 5 Minutes (voir description)",
    raises: "Durée (+1 round / +1 minute), Spéciale (+1g1 Blessures soignées par tranche de 2 Augmentations)",
    desc: "Vous annulez tous les Désavantages de la cible, quelle qu'en soit la gravité, ainsi que les effets négatifs de sorts (pénalités aux ND, réduction du ND d'Armure, baisse de Trait/Anneau) dès lors que le Niveau de Maîtrise du sort en cause est de 3 ou moins. En combat, la durée est limitée à 5 rounds ; hors combat, elle atteint 5 minutes. Ce rééquilibrage soigne également 3g3 Blessures."
  },
  {
    id: "void-4-dart-of-void",
    name: "Trait du Vide (Dart of Void)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Secrets of the Empire (p. 235)",
    range: "30 mètres (100')",
    area: "Une créature ciblée",
    duration: "Instantanée",
    raises: "Portée (+30 m / +100'), Cibles (+1 cible par 2 Augmentations, max égal à votre Anneau de Vide)",
    desc: "Sort secret conservé par l'Ordre des Cinq Armes (et dans les bibliothèques du Phénix). Lancer ce sort exige la dépense d'1 point de Vide ; il invoque un projectile de pur Vide qui frappe infailliblement toute cible à portée en infligeant une VD égale à votre Anneau de Vide. Ces dégâts ignorent l'Invulnérabilité et la Réduction de toute source."
  },
  {
    id: "void-4-draw-closed-veil",
    name: "Tirer le Voile (Draw Closed the Veil)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "15 mètres (50')",
    area: "Un esprit ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Cibles (+1 esprit par Augmentation)",
    desc: "Cible tout esprit non natif du royaume mortel de Ningen-dō et le bannit vers son royaume d'origine pour une durée minimale égale à votre Anneau de Vide en mois. Les esprits dotés d'un corps physique dans le monde mortel (oni, certains esprits métamorphes) nécessitent un jet opposé de Volonté. Des esprits nettement plus puissants que vous peuvent s'avérer immunisés (à la discrétion du MJ)."
  },
  {
    id: "void-4-fill-emptiness",
    name: "Remplir de Néant (Fill with Emptiness)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (passe à 3 m / 10' avec 3 Augmentations)",
    desc: "Renforce la connexion d'un individu au Vide et reconstitue ses réserves : la cible regagne tous ses points de Vide dépensés, jusqu'à son maximum normal."
  },
  {
    id: "void-4-void-strike",
    name: "Frappe du Vide (Void Strike)",
    element: "Vide",
    mastery: 4,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "15 mètres (50')",
    area: "Un individu ciblé",
    duration: "Instantanée",
    raises: "Portée (+1,5 m / +5'), Spéciale (+1g0 dégâts par tranche de 2 Augmentations)",
    desc: "La chair mortelle ne supporte qu'un contact direct limité avec le Vide pur. Ce sort inflige à la cible des dégâts d'une VD égale à votre Anneau de Vide (par exemple 4g4 avec Vide 4)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 5 (3 sorts : Livre de Base pp. 196–197)
  // =========================================================================
  {
    id: "void-5-divide-soul",
    name: "Diviser l'Âme (Divide the Soul)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 196",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "1 Minute",
    raises: "Durée (+1 minute)",
    desc: "Vous divisez votre âme à travers le Vide pour exister en deux endroits simultanément dans le monde mortel. Vous apparaissez où vous le souhaitez dans votre champ de vision au moment du lancement, et agissez normalement aux deux endroits (les deux manifestations agissent simultanément comme deux individus distincts, mais une seule manifestation peut effectuer un jet d'incantation de sort par round). Les Blessures subies par chaque manifestation sont additionnées à la fin du sort ; si l'un des deux meurt, les deux meurent."
  },
  {
    id: "void-5-reforge",
    name: "Reforger (Reforge)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "Contact",
    area: "Un objet ciblé",
    duration: "Permanente",
    raises: "Aucune",
    desc: "Transforme n'importe quel objet unique en un autre objet de taille comparable. Ne fonctionne que sur un objet de construction uniforme (et non assemblé à partir de multiples pièces) et n'affecte pas la matière vivante. Bien que permanent, cet effet peut être annulé par une seconde incantation de Reforger sur le même objet, même par un autre ishiken."
  },
  {
    id: "void-5-unbound-essence",
    name: "Essence Déliée (Unbound Essence)",
    element: "Vide",
    mastery: 5,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "7,5 mètres (25')",
    area: "Un individu ciblé",
    duration: "1 Heure",
    raises: "Durée (+1 heure), Portée (+1,5 m / +5')",
    desc: "Réorganise aléatoirement les Anneaux de la cible ainsi que leurs Traits associés pour toute la durée du sort (par exemple, l'Air échange sa place avec le Feu, et l'Eau avec la Terre). Les Traits Mentaux et Physiques échangent leurs valeurs s'ils dépassent la valeur de l'Anneau (un personnage avec Air 3 / Réflexes 4 aura ainsi Feu 3 / Agilité 4, ses valeurs initiales de Feu et d'Agilité étant réassignées à l'Air et aux Réflexes)."
  },

  // =========================================================================
  // NIVEAU DE MAÎTRISE 6 (3 sorts : Livre de Base p. 197)
  // =========================================================================
  {
    id: "void-6-ring-void",
    name: "L'Anneau du Vide (Ring of the Void)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "Personnelle",
    area: "Le lanceur",
    duration: "Concentration (nécessite une heure d'incantation)",
    raises: "Durée (-5 minutes de temps d'incantation)",
    desc: "Sort qui ne s'enseigne pas (sans parchemin), appris par illumination. Permet d'entrer en communion méditative avec le Dragon du Vide lui-même et de lui poser les questions de votre choix. Le Dragon du Vide sait tout ce qui peut être su, mais n'a aucune obligation de répondre directement, voire de répondre tout court. Le respect le plus absolu doit être maintenu : ceux qui ont tenté ce rituel dans le passé en négligeant d'honorer leur patron ont tout simplement cessé d'exister."
  },
  {
    id: "void-6-rise-from-ashes",
    name: "Renaître de ses Cendres (Rise from the Ashes)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "Contact",
    area: "Un individu ciblé",
    duration: "Instantanée (nécessite une heure d'incantation)",
    raises: "Spéciale (+1 heure de régression par Augmentation)",
    desc: "Restitue l'existence d'une personne vivante selon son état exact huit heures avant le début de l'incantation du sort : toutes les blessures subies, les effets de maladies ou de poisons, et même l'acquisition de corruptions surnaturelles telles que la Souillure de l'Outremonde ou la corruption de l'Ombre Rampante (Lying Darkness) survenues durant ce laps de temps sont annulés. À l'achèvement de ce sort, vous perdez tous vos points de Vide et ne pouvez plus regagner aucun point de Vide pendant trois jours, après quoi vous recommencez à récupérer 1 point de Vide par jour jusqu'à votre maximum normal. Ne permet jamais de ramener à la vie quelqu'un qui est mort."
  },
  {
    id: "void-6-unmake-world",
    name: "Défaire le Monde (Unmake the World)",
    element: "Vide",
    mastery: 6,
    keywords: [],
    source: "Livre des Règles L5R 4e, p. 197",
    range: "15 mètres (50')",
    area: "Une créature, un individu ou un objet ciblé",
    duration: "Instantanée",
    raises: "Portée (+3 m / +10')",
    desc: "Anéantit les liens unissant les cinq éléments pour faire cesser d'exister un objet ou une créature. Sur un objet non magique, le succès est automatique et l'objet cesse d'exister (sur un objet éveillé tel qu'un nemuranai, le MJ juge des conséquences fâcheuses : les kami internes réagissent très mal à une telle attaque). Contre une créature vivante, vous devez remporter un jet opposé de votre Vide contre la Terre de la cible : en cas de succès, elle est tuée sur le coup et ses restes disparaissent dans le Vide."
  }
];

if (typeof window !== "undefined") {
  window.SORTS_VIDE = SORTS_VIDE;
}
