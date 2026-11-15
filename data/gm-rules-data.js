/**
 * data/gm-rules-data.js
 * Base de données structurée des règles officielles L5R 4e Édition pour l'Écran du MJ :
 * - Fiches de règles du Paravent (système Roll & Keep, actions, postures, manœuvres, états, bataille de masse, périls, magie, social)
 * - Table officielle 2.3 des gains et pertes d'Honneur
 * - Générateur rapide de noms & profils PNJ rokugani
 */

(function (globalScope) {
  'use strict';

  const GM_RULES_CATEGORIES = [
    { id: 'all', label: 'Toutes les règles', icon: '📜' },
    { id: 'core', label: 'Système & Dés', icon: '🎲' },
    { id: 'combat', label: 'Combat & Postures', icon: '⚔️' },
    { id: 'maneuvers', label: 'Manœuvres & États', icon: '🎯' },
    { id: 'battle', label: 'Bataille de Masse', icon: '🚩' },
    { id: 'perils', label: 'Soin, Chutes & Périls', icon: '🩸' },
    { id: 'magic', label: 'Magie, Peur & Souillure', icon: '🌀' },
    { id: 'social', label: 'Cour, Loi & Honneur', icon: '🏯' }
  ];

  const GM_RULES_CARDS = [
    {
      id: 'roll-and-keep',
      category: 'core',
      badge: 'Base XgY',
      title: 'Système Roll & Keep, Seuils de ND & Règle des 10 Dés',
      keywords: 'des roll keep nd difficulte ten dice regle 10 des explosion non entraine specialise entraide',
      summary: 'On lance (Trait + Compétence) d10 et on garde un nombre de dés égal au Trait. Les 10 explosent par défaut.',
      items: [
        { label: 'Échelle des ND', text: '5 Trivial • 10 Facile • 15 Moyen • 20 Difficile • 25 Très difficile • 30 Héroïque • 35+ Légendaire.' },
        { label: 'Règle des 10 dés', text: 'Au-delà de 10gY : chaque tranche de 2 dés lancés en excès ajoute +1 dé gardé (jusqu’à 10g10). Chaque excédent au-delà de 10g10 devient +2 fixe (+1 par dé gardé excédentaire).' },
        { label: 'Compétence sans rang (0)', text: 'Jet de Trait g Trait uniquement : les 10 N’EXPLOSENT PAS et aucune Augmentation volontaire n’est autorisée.' },
        { label: 'Spécialisation', text: 'Les dés obtenant 1 sur le jet initial sont relancés une fois (le résultat du second dé remplace le 1).' },
        { label: 'Entraide', text: 'Un allié possédant au moins 1 rang dans la compétence réussit un jet ND 10 pour conférer +1g0 (ou +1g0 par tranche de 2 rangs selon l’action).' }
      ]
    },
    {
      id: 'void-and-raises',
      category: 'core',
      badge: 'Vide & Raises',
      title: 'Points de Vide & Augmentations (Raises)',
      keywords: 'vide void augmentation raise +5 nd degats limite max',
      summary: 'La dépense de Vide et les Augmentations permettent d’accomplir des prouesses martiales ou sociales.',
      items: [
        { label: 'Dépense de Vide (Action Gratuite)', text: '1 point max/round (sauf technique) : +1g1 sur un jet de Compétence/Trait/Sort, OU +10 à l’Initiative (1 round), OU +10 au ND d’Armure (1 round), OU réduire les dégâts subis de 10, OU ignorer les malus de blessures (1 round).' },
        { label: 'Augmentations (+5 ND)', text: 'Déclarées AVANT de jeter les dés. Chaque Augmentation ajoute +5 au ND final. En cas d’échec au ND total, toute l’action échoue.' },
        { label: 'Limite d’Augmentations', text: 'Un personnage ne peut jamais déclarer plus d’Augmentations volontaires sur un jet que son Rang de Vide (les Augmentations Gratuites ne comptent pas dans cette limite).' },
        { label: 'Récupération du Vide', text: 'Repos complet d’une nuit, méditation (Vide/Méditation ND 15, 1h), ou Cérémonie du Thé réussie.' }
      ]
    },
    {
      id: 'combat-round-actions',
      category: 'combat',
      badge: 'Chronologie',
      title: 'Round d’Escarmouche & Économie d’Actions',
      keywords: 'round tour action simple complexe gratuite deplacement vitesse eau degainer recharger arc',
      summary: 'À chaque tour, un combattant choisit sa Posture puis effectue soit 1 Action Complexe, soit 2 Actions Simples (+ Actions Gratuites).',
      items: [
        { label: 'Initiative & Surprise', text: 'Round 1 : (Réputation + Réflexes) g Réflexes. Un personnage surpris n’agit pas au Round 1 tant que ses ennemis jouent et subit -5 au ND d’Armure.' },
        { label: 'Actions Complexes', text: 'Attaque au corps-à-corps / arc (sans technique R3), Incantation de sort (sauf mention), Défense Totale, Course (Eau × 6 m), Monter/Démonter en combat.' },
        { label: 'Actions Simples', text: 'Dégainer une arme (Gratuit avec Kenjutsu/Iaijutsu 3+), Se déplacer (Eau × 3 m), Se relever, Viser (+1g1 prochaine attaque arc), Garder un allié, Préparer/Changer d’arme, Attaque supplémentaire si Rang 3+.' },
        { label: 'Actions Gratuites', text: 'Pas tactique (Eau × 1,5 m), parler brièvement, dépenser 1 point de Vide, lâcher un objet, se laisser tomber à terre, déclarer sa Posture.' }
      ]
    },
    {
      id: 'five-stances',
      category: 'combat',
      badge: '5 Postures',
      title: 'Les Cinq Postures de Combat (Stances)',
      keywords: 'posture stance attaque assaut defense totale centre nd bonus malus',
      summary: 'Déclarée au début du tour du combattant ; persiste jusqu’au début de son propre tour au round suivant.',
      items: [
        { label: '水 Attaque (Eau)', text: 'Posture standard. Aucun bonus ni malus au ND d’Armure. Toutes les actions sont autorisées.' },
        { label: '火 Assaut / Attaque Totale (Feu)', text: '+2g1 aux attaques de mêlée et +1,5 m de déplacement vers l’ennemi. Malus : -10 au ND d’Armure, tir à l’arc et manœuvres défensives interdits.' },
        { label: '風 Défense (Air)', text: 'Ajoute (Rang de Défense + Anneau d’Air) au ND d’Armure. Aucune attaque physique autorisée (sorts et déplacements permis).' },
        { label: '土 Défense Totale (Terre)', text: 'Coûte 1 Action Complexe : jet de Défense / Réflexes ; ajoute la moitié du résultat (arrondie au supérieur) au ND d’Armure. Uniquement Actions Gratuites.' },
        { label: '空 Centre (Vide)', text: 'Aucune action ce tour (posture des duels Iaijutsu). Au tour suivant : +1g1 + Rang de Vide sur 1 jet choisi, et +10 à l’Initiative.' }
      ]
    },
    {
      id: 'combat-maneuvers',
      category: 'maneuvers',
      badge: 'Manœuvres',
      title: 'Manœuvres Offensives & Modificateurs de Combat',
      keywords: 'feinte desarmement renversement garde allie attaque supplementaire coup cible couvert visibilite portee monture',
      summary: 'Principales manœuvres tactiques (via Augmentations) et modificateurs contextuels du champ de bataille.',
      items: [
        { label: 'Dégâts accrus (1+ Aug.)', text: '+1g0 aux dégâts par Augmentation déclarée.' },
        { label: 'Feinte (2 Aug.)', text: 'Si l’attaque touche, vous infligez normalement les dégâts et la cible perd ½ des dégâts (ou -5/-10 selon cas) de son ND d’Armure contre votre prochaine attaque.' },
        { label: 'Renversement (2 Aug.)', text: 'Après avoir touché, jet opposé de Force : si vous l’emportez, la cible tombe À terre (-10 ND mêlée).' },
        { label: 'Désarmement (3 Aug.)', text: 'Après avoir touché, jet opposé Force/Agilité : la cible lâche son arme (projetée à 1,5 m par tranche de 5 d’écart).' },
        { label: 'Attaque supplémentaire (5 Aug.)', text: 'Permet de porter une seconde frappe immédiatement avec la même arme.' },
        { label: 'Garder un allié (Simple)', text: 'Adjacents à 1,5 m : +10 au ND d’Armure de l’allié protégé ; votre propre ND d’Armure diminue de 5.' },
        { label: 'Couvert & Visibilité', text: 'Couvert partiel (+5 à +10 ND tir) • Couvert important (+15 à +20 ND) • Pénombre (+5 ND / -1g0) • Obscurité totale (-3g3, cible À l’aveugle).' },
        { label: 'Terrain & Monture', text: 'Cavalier vs Piéton : +1g0 attaque mêlée • Combat main non directrice : -1g0 (-2g0 arme lourde) • Terrain boueux/glissant : +5/+10 ND Athlétisme.' }
      ]
    },
    {
      id: 'status-conditions',
      category: 'maneuvers',
      badge: 'États',
      title: 'États Préjudiciables & Conditions de Combat',
      keywords: 'condition etat a terre prone etourdi dazed stunned aveugle blinded enchevetre entangled fatigue surpris effraye',
      summary: 'Effets mécaniques immédiats à cocher directement dans le tableau d’Escarmouche.',
      items: [
        { label: 'À terre (Prone)', text: 'ND d’Armure -10 contre attaques de mêlée (+5 ND contre attaques à distance). -1g0 à vos attaques. Se relever coûte 1 Action Simple.' },
        { label: 'Étourdi (Dazed / Stunned)', text: 'Aucune action possible. ND d’Armure réduit à (5 + bonus d’Armure uniquement). Fin du round : jet de Terre ND 20 pour récupérer (ou fin automatique après 1 round).' },
        { label: 'Aveuglé (Blinded)', text: '-3g3 à toute attaque ou action visuelle, -10 au ND d’Armure, vitesse de déplacement réduite de moitié.' },
        { label: 'Enchevêtré (Entangled)', text: 'Déplacement nul, -2g1 aux jets d’attaque et de Défense. Échappée : Action Complexe Force ou Agilité (ND variable, souvent 20).' },
        { label: 'Effrayé (Fear X)', text: 'Échec au jet de Peur (Volonté g Volonté + Honneur vs ND 5 + 5×X) : malus de -Xk0 à tous les jets contre la source pendant la scène.' },
        { label: 'Fatigué (Fatigued)', text: 'Privation de sommeil prolongée : perte des points de Vide quotidiens, puis -1g1 cumulatif aux jets jusqu’au repos.' }
      ]
    },
    {
      id: 'mass-battle',
      category: 'battle',
      badge: 'Armées',
      title: 'Batailles de Masse & Table des Engagements',
      keywords: 'bataille masse armee art de la guerre engagement heroique assaut reserve desengage',
      summary: 'Chaque heure/phase de bataille, les PJs choisissent leur position tactique puis effectuent un jet d’Art de la Guerre / Perception.',
      items: [
        { label: 'Engagez à outrance (Front)', text: 'ND 25 (ou opposé) • Risque élevé (blessures auto 3g2–5g2), mais opportunités héroïques ×2, +3 points d’Honneur/Gloire possibles.' },
        { label: 'Attaquez (Première ligne)', text: 'ND 20 • Équilibre combat/gloire : dégâts modérés (2g2), opportunités d’affronter des champions adverses.' },
        { label: 'Soutien / Manœuvre', text: 'ND 15 • Dégâts légers (1g1), idéal pour shugenja et archers.' },
        { label: 'Réserve (Arrière-garde)', text: 'ND 10 • Dégâts nuls sauf percée ennemie ; protège le camp et soigne les blessés.' },
        { label: 'Opportunité Héroïque', text: 'Un jet dépassant le ND de +10 ou un tirage spécial déclenche un duel, une capture de bannière ou une percée décisive (+Gloire).' }
      ]
    },
    {
      id: 'healing-and-perils',
      category: 'perils',
      badge: 'Survie',
      title: 'Guérison, Chutes, Feu, Poisons & Sommeil',
      keywords: 'guerison soin medecine chute feu poison noyade suffocation sommeil recuperation blessure',
      summary: 'Règles de récupération hors magie et dangers environnementaux courants.',
      items: [
        { label: 'Guérison Naturelle (par nuit)', text: 'Récupère (Constitution × 2) + Rang de Réputation points de blessures par nuit complète de repos.' },
        { label: 'Compétence Médecine (Int)', text: 'Soins de terrain (ND 15 : +Constitution + Rang Médecine points récupérés une fois par combat, puis ND 20 pour blessures graves).' },
        { label: 'Chutes', text: '1g1 dégâts par tranche complète de 3 mètres (max 10g10). Athlétisme / Réflexes ND 15 réduit la hauteur effective de 3 m (+3 m par Aug.).' },
        { label: 'Feu & Brûlures', text: 'Torche/flammèche : 1g1/round • Incendie : 2g2/round • Brasier : 3g3 à 5g3/round (Action Complexe + Réflexes ND 15 pour éteindre).' },
        { label: 'Suffocation / Noyade', text: 'Retient son souffle (Constitution × 2 rounds ou minutes hors effort), puis subit 1g1 à 2g2 dégâts directs ignorés par l’armure chaque round.' },
        { label: 'Poisons', text: 'Jet de Terre (ND 15 à 30 selon virulence) pour diviser par 2 les dégâts ou éviter la paralysie / nausée.' }
      ]
    },
    {
      id: 'magic-reference',
      category: 'magic',
      badge: 'Shugenja',
      title: 'Sorts, Emplacements, Contre-sort & Kihō',
      keywords: 'sort magie shugenja emplacement affinite deficience contre-sort maho kiho parchemin nemuranai',
      summary: 'Formules officielles des lancers de sorts élémentaires et de la magie corrompue.',
      items: [
        { label: 'Jet d’Incantation', text: '(Anneau correspondant + Rang d’École) g Anneau. ND = 5 + (5 × Maîtrise du sort).' },
        { label: 'Emplacements de Sorts', text: 'Nombre d’emplacements quotidiens par élément égal au niveau de l’Anneau du shugenja (les sorts Universels consomment n’importe quel emplacement).' },
        { label: 'Affinité & Déficience', text: 'Affinité : +1 au Rang d’École effectif pour cet élément (sort Maîtrise +1 si égal). Déficience : -1 au Rang d’École (min 1) et +5 ND sur cet élément.' },
        { label: 'Contre-sort', text: 'Consomme 1 emplacement du même élément. Jet opposé Art de la Magie + Anneau contre le résultat d’incantation du lanceur.' },
        { label: 'Parchemins & Mahō', text: 'Lire un parchemin d’autrui sans le connaître : Art de la Magie + Intelligence ND 15 + 5×Maîtrise. Lancer de la Mahō coûte du Sang (blessures) et fait perdre 1 à 3 Rangs d’Honneur + Souillure.' }
      ]
    },
    {
      id: 'social-law-magistracy',
      category: 'social',
      badge: 'Empire',
      title: 'Échelle Sociale, Étiquette & Magistrature d’Émeraude',
      keywords: 'cour sociale statut etiquette sincerite kuge buke heimin hinin magistrat preuve kiri-sute seppuku refus',
      summary: 'Arbitrage des scènes de cour, témoignages légaux et droits féodaux de Rokugan.',
      items: [
        { label: 'ND des Jets Sociaux', text: 'ND de base 15 (+ 5 × écart si le Statut/Gloire de l’interlocuteur est supérieur). Opposition courante vs Intuition + Étiquette/Courtoisie.' },
        { label: 'Règle des Deux Refus', text: 'Un samouraï poli refuse deux fois un présent ou un compliment avant d’accepter à la troisième proposition.' },
        { label: 'Valeur du Témoignage', text: 'Aux yeux de la loi impériale, la parole d’un samouraï vaut preuve absolue tant qu’elle n’est pas contredite par un supérieur ou une preuve matérielle irréfutable (les aveux heimin n’ont de poids que confirmés).' },
        { label: 'Droit de Sang (Kiri-sute gomen)', text: 'Un buke peut exécuter immédiatement un heimin/hinin qui lui manque gravement de respect ou l’attaque (doit rester proportionné pour les Magistrats).' },
        { label: 'Paix des Châteaux', text: 'Katana confié à l’entrée ou lié par le sageo ; wakizashi toujours conservé (passeport légal du buke). Toucher la garde (koiguchi) vaut défi.' }
      ]
    }
  ];

  const GM_HONOR_TABLE = [
    { act: 'Accomplir une promesse malgré un coût personnel immense', r0: '+10', r12: '+8', r34: '+6', r56: '+4', r78: '+2', r910: '0', positive: true },
    { act: 'Protéger les intérêts de son seigneur au péril de sa vie', r0: '+8', r12: '+8', r34: '+6', r56: '+6', r78: '+4', r910: '+2', positive: true },
    { act: 'Faire preuve d’une courtoisie sincère envers ses rivaux', r0: '+9', r12: '+7', r34: '+5', r56: '+2', r78: '0', r910: '0', positive: true },
    { act: 'Secourir un ennemi blessé sur le champ de bataille', r0: '+9', r12: '+8', r34: '+6', r56: '+6', r78: '+5', r910: '+3', positive: true },
    { act: 'Manquement mineur à l’étiquette ou impolitesse publique', r0: '0', r12: '-1', r34: '-2', r56: '-3', r78: '-4', r910: '-5', positive: false },
    { act: 'Mentir pour protéger ses propres intérêts égoïstes', r0: '0', r12: '-3', r34: '-5', r56: '-7', r78: '-9', r910: '-10', positive: false },
    { act: 'Fuir lâchement le champ de bataille devant l’ennemi', r0: '-5', r12: '-8', r34: '-12', r56: '-15', r78: '-18', r910: '-20', positive: false },
    { act: 'Trahir son seigneur féodal ou commettre un acte félon / Mahō', r0: '-10', r12: '-15', r34: '-20', r56: '-25', r78: '-30', r910: '0.0', positive: false }
  ];

  const GM_NPC_NAME_PARTS = {
    clans: [
      { clan: 'Crabe', families: ['Hida', 'Hiruma', 'Kaiu', 'Kuni', 'Yasuki'] },
      { clan: 'Grue', families: ['Doji', 'Kakita', 'Asahina', 'Daidoji'] },
      { clan: 'Dragon', families: ['Mirumoto', 'Kitsuki', 'Tamori', 'Togashi'] },
      { clan: 'Lion', families: ['Akodo', 'Ikoma', 'Kitsu', 'Matsu'] },
      { clan: 'Phénix', families: ['Isawa', 'Shiba', 'Asako'] },
      { clan: 'Scorpion', families: ['Bayushi', 'Shosuro', 'Soshi', 'Yogo'] },
      { clan: 'Licorne', families: ['Shinjo', 'Ide', 'Iuchi', 'Moto', 'Utaku'] },
      { clan: 'Mante', families: ['Yoritomo', 'Kitsune', 'Moshi', 'Tsuruchi'] },
      { clan: 'Impérial / Rônin', families: ['Miya', 'Otomo', 'Seppun', 'Rônin'] }
    ],
    givenNames: [
      'Kenji', 'Haruka', 'Ren', 'Taro', 'Akira', 'Satsuki', 'Daichi', 'Kazuo',
      'Fumiko', 'Hiroshi', 'Kaede', 'Noboru', 'Yumi', 'Takeshi', 'Shizuka', 'Makoto',
      'Kiyoshi', 'Hotaru', 'Ryuji', 'Chihiro', 'Jiro', 'Aiko', 'Satoshi', 'Masaru'
    ],
    demeanors: [
      'Regard calme et impénétrable',
      'Éventail nerveusement replié dans la manche',
      'Cicatrice ancienne sur la joue gauche',
      'Voix douce mais autorité indiscutable',
      'Sourire trop poli pour être sincère',
      'Main constamment posée sur la garde du katana',
      'Parfum subtil de bois de santal et d’encens',
      'Posture rigide d’ancien officier'
    ],
    secrets: [
      'Doit une faveur secrète au Clan du Scorpion',
      'Cherche un témoin disparu d’une ancienne escarmouche',
      'Protège un parent rônin caché dans la province',
      'Soupçonne son propre supérieur de corruption',
      'Détient une lettre scellée destinée au Magistrat d’Émeraude',
      'A juré de venger un mentor tué en duel'
    ]
  };

  if (typeof globalScope !== 'undefined') {
    globalScope.GM_RULES_CATEGORIES = GM_RULES_CATEGORIES;
    globalScope.GM_RULES_CARDS = GM_RULES_CARDS;
    globalScope.GM_HONOR_TABLE = GM_HONOR_TABLE;
    globalScope.GM_NPC_NAME_PARTS = GM_NPC_NAME_PARTS;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      GM_RULES_CATEGORIES,
      GM_RULES_CARDS,
      GM_HONOR_TABLE,
      GM_NPC_NAME_PARTS
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
