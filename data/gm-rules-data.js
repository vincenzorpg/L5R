/**
 * data/gm-rules-data.js
 * Base de données du Paravent MJ L5R 4e Édition — Les Chroniques de Rokugan
 * Couvre strictement les règles officielles du Livre de Base (4e Édition) et suppléments cités.
 */

(function (globalScope) {
  'use strict';

  const GM_RULES_CATEGORIES = [
    { id: 'all', label: 'Tout afficher', icon: '📜' },
    { id: 'combat', label: 'Escarmouche & Actions', icon: '⚔️' },
    { id: 'duel', label: 'Duel Iaijutsu', icon: '⚡' },
    { id: 'social', label: 'Honneur, Cour & Loi', icon: '⚖️' },
    { id: 'magic', label: 'Magie & Shugenja', icon: '🌀' },
    { id: 'outremonde', label: 'Peur, Souillure & Poisons', icon: '👹' },
    { id: 'general', label: 'Mécaniques & Vide', icon: '🎲' }
  ];

  const GM_RULES_CARDS = [
    {
      id: 'roll_keep_scale',
      category: 'general',
      title: 'Mécaniques : Dés, Échelle ND (Table 2.1) & Règle des 10 Dés',
      badge: 'Base (pp. 76–79)',
      summary: 'Roll & Keep (XgY), dés explosifs, Augmentations et seuils officiels.',
      keywords: 'table 2.1 nd seuil 10 des explosif specialisation augmentation sans competence cooperatif cumulatif',
      items: [
        { label: 'Échelle ND (Table 2.1)', text: 'Aucun jet (Anodin) • 5 (Très facile) • 10 (Facile) • 15 (Moyen) • 20 (Modéré) • 25 (Difficile) • 30 (Très difficile) • 40 (Héroïque) • 60 (Impossible).' },
        { label: 'Dés explosifs & Spé.', text: 'Tout 10 naturel explose (relancé et additionné), sauf sur un jet sans Compétence (rang 0) ou effet interdisant les explosions. Une Spécialisation permet de relancer les 1 (une seule fois).' },
        { label: 'Règle des 10 dés', text: 'Max 10g10. Chaque tranche de 2 dés lancés au-delà de 10 devient +1 dé gardé (jusqu\'à 10g10). Une fois à 10g10, chaque dé lancé ou gardé excédentaire ajoute +2 au total du jet (ex. 13g9 → 10g10+2 ; 14g12 → 10g10+12).' },
        { label: 'Augmentations', text: '+5 au ND par Augmentation déclarée avant le jet (max = Anneau de Vide, hors Augmentations gratuites). Un jet inférieur au ND total échoue et toutes les Augmentations sont perdues.' },
        { label: 'Jets spéciaux', text: 'Sans Compétence : Trait g Trait sans explosion, sans Augmentation ni bonus d\'arme/matériel. Coopératif : 1 assistant = +1g0 ; 2+ assistants = bonus égal à leur Trait ou leur rang de Compétence (le plus bas). Cumulatif : échec = +10 au ND du jet suivant.' }
      ]
    },
    {
      id: 'void_points',
      category: 'general',
      title: 'Points de Vide : Dépenses & Récupération',
      badge: 'Base (p. 78)',
      summary: 'Maximum = Anneau de Vide. Un seul Point de Vide dépensé par Round (sauf exception).',
      keywords: 'vide depense recuperation meditation ceremonie the initiative armure competence 0 blessures',
      items: [
        { label: 'Jet de compétence/Trait', text: 'Dépensez 1 Pt de Vide pour +1g1 à un jet de Compétence, Trait, Anneau ou Incantation (jamais sur les dégâts, l\'Initiative ni les jets spéciaux).' },
        { label: 'Compétence au rang 0', text: 'Considérer temporairement une Compétence à 0 comme étant au rang 1 pour un jet (annule les malus d\'incompétence et autorise explosions/Augmentations).' },
        { label: 'Réduire les Blessures', text: 'Réduire de 10 les Blessures subies d\'une seule source.' },
        { label: 'Début de Round (Armure/Init)', text: 'Au tout début du Round : +10 au ND d\'Armure pour le Round entier ; OU +10 à votre score d\'Initiative pour toute l\'escarmouche (1/escarmouche) ; OU échanger votre Initiative pour l\'escarmouche avec une cible consentante (1/Round).' },
        { label: 'Récupération', text: 'Une nuit complète de repos restaure tout le Vide. Méditation (Méditation / Vide ND 20, 30 min, max 1/jour) : 1 pt (2 au rang 3, 3 au rang 7). Cérémonie du Thé (Cérémonie du Thé / Vide ND 15 + 5 par convive au-delà de 2, max 5 personnes, 30 min) : +1 pt (2 au rang 5) à tous.' }
      ]
    },
    {
      id: 'round_actions_move',
      category: 'combat',
      title: 'Round de Combat, Initiative, Actions & Mouvement',
      badge: 'Base (pp. 79–85)',
      summary: 'Structure en 3 étapes, embuscade et distance de déplacement selon Eau.',
      keywords: 'initiative embuscade round complexe simple gratuite mouvement terrain modere difficile',
      items: [
        { label: '1. Initiative & Posture', text: 'Round 1 : (Rang Réputation + Réflexes) g Réflexes + choix de Posture. Rounds suivants : ordre décroissant ; chaque combattant choisit sa Posture au début de son Tour.' },
        { label: 'Embuscade (p. 82)', text: 'Perception des guetteurs vs Discrétion (ou Survie) des embusqués. En cas de réussite, chaque cible surprise subit -10 à son Initiative pour toute l\'escarmouche.' },
        { label: '2. Actions par Tour', text: '1 Action Complexe + Actions Gratuites OU 2 Actions Simples + Actions Gratuites. Une même Action Gratuite n\'est utilisable qu\'une fois par Round (sauf mention).' },
        { label: 'Mouvement (Table)', text: 'Gratuite = Eau × 1,5 m (5 pieds) ; Simple = Eau × 3 m (10 pieds) ; maximum absolu = Eau × 6 m (20 pieds)/Round. Terrain Modéré = Eau -1 (min 1) ; Difficile = Eau -2 (min 1, option -5/-10 aux jets physiques).' },
        { label: '3. Phase de Réaction', text: 'Fin des effets temporaires ; jets de Terre ND 20 pour récupérer d\'Étourdi ou d\'Hébété.' }
      ]
    },
    {
      id: 'stances_4e',
      category: 'combat',
      title: 'Les 5 Postures de Combat (Stances)',
      badge: 'Base (p. 84)',
      summary: 'Changement de Posture possible au début de son Tour (après le Round 1).',
      keywords: 'posture stance attaque assaut defense totale centre initiative vide',
      items: [
        { label: 'Attaque (Eau)', text: 'Posture standard sans bonus, malus ni restriction.' },
        { label: 'Assaut (Feu)', text: '+2g1 aux jets d\'attaque, -10 au ND d\'Armure. Actions Simples/Complexes d\'attaque uniquement ; Déplacement vers l\'ennemi seul (+1,5 m bonus 1/Round dans la limite max). Interdit à distance ou monté.' },
        { label: 'Défense (Air)', text: '+ (Anneau d\'Air + rang de Défense) au ND d\'Armure. Aucune attaque autorisée.' },
        { label: 'Défense Totale (Terre)', text: 'Action Complexe : jet de Défense / Réflexes, ajoute la moitié du total (arrondie au supérieur) au ND d\'Armure jusqu\'au Tour suivant. Actions Gratuites uniquement.' },
        { label: 'Centre (Vide)', text: 'Aucune Action durant ce Round. Au Round suivant : +1g1 + Anneau de Vide à UN jet de votre Tour, et +10 à l\'Initiative pour ce Round uniquement.' }
      ]
    },
    {
      id: 'maneuvers_4e',
      category: 'combat',
      title: 'Manœuvres de Combat (Augmentations)',
      badge: 'Base (pp. 85–87)',
      summary: 'Déclarées avant le jet ; le Garde est une Action Simple sans jet.',
      keywords: 'manoeuvre coup precis desarmement attaque supplementaire feinte garde degats accrus renversement',
      items: [
        { label: 'Coup Précis (1–4 Aug.)', text: '1 Aug. : membre ; 2 Aug. : main/pied ; 3 Aug. : tête ; 4 Aug. : œil, oreille ou doigt.' },
        { label: 'Désarmement (3 Aug.)', text: 'Inflige seulement 2g1 de dégâts (sans Force), puis jet opposé de Force : si l\'attaquant l\'emporte, la cible lâche son arme (Simple pour la ramasser).' },
        { label: 'Attaque Suppl. (5 Aug.)', text: '5 Augmentations réussies sur la 1re attaque (ne conférant aucun autre avantage) accordent une 2e attaque immédiate (1/Tour ; la 1re attaque doit toucher).' },
        { label: 'Feinte (2 Aug.)', text: 'En cas de succès, ajoute ⌊(Jet d\'attaque − ND d\'Armure) / 2⌋ aux dégâts de cette attaque (max 5 × Rang de Réputation).' },
        { label: 'Garde (0 Aug., Simple)', text: 'Interdit en Assaut. Désigne 1 allié à 1,5 m : l\'allié gagne +10 ND d\'Armure et le gardien subit -5 ND jusqu\'à son prochain Tour.' },
        { label: 'Dégâts Accrus (1+ Aug.)', text: '+1g0 aux dégâts par Augmentation (toutes les Aug. de Dégâts Accrus d\'un Round comptent comme 1 seul effet pour la réduction d\'Augmentations).' },
        { label: 'Renversement (2 ou 4 Aug.)', text: '2 Aug. (bipède) / 4 Aug. (quadrupède) : dégâts normaux + Force opposé ; la cible tombe À terre si vous gagnez.' }
      ]
    },
    {
      id: 'status_grapple_4e',
      category: 'combat',
      title: 'États Préjudiciables & Lutte (Grappling)',
      badge: 'Base (pp. 88–89)',
      summary: 'Conditions officielles de combat et séquence complète de Lutte.',
      keywords: 'etat condition aveugle a terre etourdi hebete enchevetre lutte jeun fatigue monture',
      items: [
        { label: 'Aveuglé (Blinded)', text: 'ND d\'Armure de base = Réflexes + 5 (+ armure). Attaques : -3g3 à distance, -1g1 en mêlée. Eau -2 (min 1) pour le Déplacement ; Action Simple de mvt = Athlétisme/Agilité ND 20 ou À terre.' },
        { label: 'À terre (Prone)', text: '-10 ND d\'Armure en mêlée. Pas d\'Actions de Déplacement ; Postures Attaque/Défense seuls ; aucune arme grande ; -2g0 aux attaques (armes moyennes/petites). Action Simple pour se relever.' },
        { label: 'Enchevêtré (Entangled)', text: 'Aucune Action possible sauf tenter de se libérer (Force vs ND ou Opposé, 1/Round). Peut être saisi en Lutte sans jet d\'attaque.' },
        { label: 'Étourdi (Stunned)', text: 'Aucune action. ND d\'Armure = 5 + bonus d\'armure. Récupération : Anneau de Terre ND 20 en Réaction ; en cas d\'échec, fin à l\'issue du Round suivant.' },
        { label: 'Hébété (Dazed)', text: '-3g0 à toutes actions (dés gardés ≤ lancés). Postures Défense ou Défense Totale seuls ; duel impossible. Terre ND 20 en Réaction (-5 ND par échec).' },
        { label: 'Lutte (Grappling, p. 88)', text: 'Initier : Lutte / Agilité (Complexe) vs ND cible sans bonus d\'armure. En lutte : ND = 5 + armure. Contrôle (début de Tour) : Lutte / Force opposé. Options du contrôleur : Frapper (Complexe, mains nues sans Aug.), Projeter (Complexe, À terre à 1,5 m et libre), Rompre (Simple), Maintenir (Gratuite).' },
        { label: 'Fatigué / À jeun / Monté', text: 'Fatigué (24h sans repos) : +5 ND (+5/j), pas d\'Assaut, Volonté ND 20/2h après Constit. jours. À jeun (24h) : pas de Vide par repos ; +5 ND après 2j ; 2g1 dégâts/j après Constit. jours. Monté/Surélevé (+1,2 m) : +1g0 attaque mêlée, pas d\'Assaut monté.' }
      ]
    },
    {
      id: 'wounds_armor_perils',
      category: 'combat',
      title: 'Blessures, Guérison, Armures, Flèches & Périls',
      badge: 'Base (pp. 82–84, 198–199)',
      summary: 'Létalité standard Terre ×2, repos nocturne, chute, noyade et équipement défensif.',
      keywords: 'blessures guerison repos chute noyade armure ashigaru legere lourde cavalerie fleches',
      items: [
        { label: 'Paliers de Blessures', text: 'Indemne = Terre × 5 (×2 standard) puis 6 paliers de Terre × 2 (+3, +5, +10, +15, +20, Hors de combat, Mort). Repos d\'une nuit : (2 × Constitution) + Rang de Réputation Blessures guéries.' },
        { label: 'Noyade & Chute', text: 'Apnée : Constitution rounds (ou Constit. - 1 par tranche de 3 m d\'effort), puis 2g2 Blessures/round (sans Réduction). Chute : 1g1 par tranche de 1,5 m (5\') au-delà des 3 premiers mètres (max 10g10).' },
        { label: 'Armures (p. 198)', text: 'Ashigaru (+3 ND / Réd. 1 / 5 koku) • Légère (+5 / Réd. 3 / +5 ND Athl. & Discr. / 25 koku) • Lourde (+10 / Réd. 5 / +5 ND Agi & Réfl. / 40 koku) • Cavalerie (+4 à pied, +12 monté / Réd. 4 / compte comme lourde / 55 koku).' },
        { label: 'Flèches (Table 3.1)', text: 'Saule (2g2, 1 bu) • Perce-armure (1g1, 2 bu, ignore bonus d\'armure au ND) • Coupe-chair (2g3, 5 bu, double bonus d\'armure au ND, ½ portée) • Sifflante (0g1, 5 bu) • Coupe-corde (1g1, 3 bu, +2 Aug. grat. Coup Précis objet, ½ portée).' }
      ]
    },
    {
      id: 'mass_battle_4e',
      category: 'combat',
      title: 'Batailles Rangées (Mass Battle)',
      badge: 'Base (pp. 236–240)',
      summary: 'Tours de 30 minutes (~1 Tour par 250 combattants par camp), 4 niveaux d\'engagement.',
      keywords: 'bataille rangee mass battle reserves desengage engage tres engage art de la guerre opportunité heroique',
      items: [
        { label: '1. Déclaration & Généraux', text: 'Chaque PJ choisit : Réserves, Désengagé, Engagé ou Très engagé. Jet opposé des généraux : Art de la Guerre (Combat de masse) / Perception (écart ≥ 5 = Victoire / Défaite ; < 5 = Statu quo).' },
        { label: '2. Jet de Bataille', text: '1d10 + Anneau d\'Eau + Art de la Guerre comparé à la Table de Bataille (dés de Blessures non explosifs, Gloire gagnée, Duel ou Opportunité Héroïque).' },
        { label: '3. Résolution & Surrender', text: 'Duel sur le champ de bataille (honorablement respecté) ou Opportunité Héroïque (peut être déclinée, souvent au détriment de l\'armée). Reddition parfois accordée aux shugenja.' }
      ]
    },
    {
      id: 'duel_iaijutsu_4e',
      category: 'duel',
      title: 'Duel d\'Iaijutsu (3 Rounds) & Taryu-Jiai',
      badge: 'Base (pp. 87–88)',
      summary: 'Les deux duellistes sont en Posture Centre ; aucune autre action n\'est autorisée.',
      keywords: 'duel iaijutsu evaluation concentration focus frappe karmique taryu-jiai',
      items: [
        { label: '1. Évaluation (Round 1)', text: 'À l\'Initiative du plus rapide : Iaijutsu (Évaluation) / Intuition vs ND 10 + 5 × Rang de Réputation adverse. 1 info (+1/Aug. : Vide, Réflexes, Iaijutsu, Spécialisations, Pts de Vide restants, Niveau de blessure). Écart ≥ 10 sur le score adverse = +1g1 au Focus. Concession honorable possible ici.' },
        { label: '2. Concentration (Round 2)', text: 'À l\'Initiative du plus rapide : Iaijutsu (Concentration) / Vide opposé. Écart ≥ 5 = frappe en 1er + 1 Augmentation gratuite par tranche de 5 au-delà. Écart < 5 = Frappe Karmique simultanée (cause du duel abandonnée).' },
        { label: '3. Frappe (Round 3)', text: 'À l\'Initiative du plus lent : Iaijutsu / Réflexes vs ND d\'Armure normal de l\'adversaire (pas de +5×Focus en 4e). Premier sang : attaquer après avoir été touché est hautement déshonorant. À mort : continue en escarmouche si les deux survivent.' },
        { label: 'Taryu-Jiai (Duel magique)', text: 'Même structure : remplacer Iaijutsu par Art de la Magie, dégâts infligés avec l\'Anneau d\'Affinité du shugenja.' }
      ]
    },
    {
      id: 'glory_infamy_status',
      category: 'social',
      title: 'Gloire, Infamie & Statut (Tables 2.4–2.7)',
      badge: 'Base (pp. 92–95)',
      summary: 'Reconnaissance par Héraldique, autorité hiérarchique et statut des moines.',
      keywords: 'gloire infamie statut heraldiqe rang table 2.4 2.5 2.6 2.7 moine empereur champion magistrat',
      items: [
        { label: 'Reconnaissance (Gloire)', text: 'Connaissance : Héraldique / Intelligence (pour des inconnus) vs ND 50 − (5 × Rang de Gloire). Additionner Gloire + Infamie le cas échéant.' },
        { label: 'Jet d\'Honneur (Option, p. 92)', text: '1/session après un échec (Compétence, Trait, Anneau ou Incantation) : relance au même ND avec Honneur g Honneur. Si ce second jet échoue : échec ET perte d\'1 Rang complet (10 pts) d\'Honneur.' },
        { label: 'Échelle de Statut (Table 2.7)', text: 'Empereur 10 • Impératrice 9,9 • Champion Émeraude/Jade, Shogun 9 • Champion Grand Clan 8 • Clan Mineur 7,5 • Daimyo Famille 7 • Hatamoto 6 • Magistrat Ém./Jade 4,5+ • Magistrat Clan 4+ • Samouraï 1 • Rônin 0 • Eta -4 à -10.' },
        { label: 'Autorité & Moines', text: 'Le Statut ne confère d\'autorité qu\'au sein d\'une même hiérarchie. Moines de la Confrérie : Statut 1, Gloire 0 (ne reçoivent que la moitié des gains de Gloire).' }
      ]
    },
    {
      id: 'etiquette_law_4e',
      category: 'social',
      title: 'Ordre Céleste, Étiquette & Loi Impériale',
      badge: 'Base (pp. 26–55)',
      summary: 'Classes sociales, protocole des armes en château, cadeaux et valeur des témoignages.',
      keywords: 'ordre celeste kuge buke heimin hinin daisho katanakake sageo cadeau seppuku magistrat temoignage',
      items: [
        { label: 'Ordre Céleste', text: 'Kuge (Familles Impériales, Champions, Daimyos) → Buke (Samouraïs) → Bonge / Heimin (Paysans, Artisans, Marchands) → Hinin / Eta (acteurs, geishas, tanneurs). Moines et Rônins hors hiérarchie.' },
        { label: 'Armes & Château', text: 'Katana déposé au katanakake (ou noué dans le saya par le sageo), wakizashi conservé (et non posé à droite en paix sans méfiance). Toucher sa garde (koiguchi) = provocation mortelle.' },
        { label: 'Cadeaux & Face (On)', text: 'Règle des 2 refus polis avant acceptation au 3e. Sauver la Face via intermédiaires et litotes ; l\'humiliation publique entraîne souvent duel ou seppuku.' },
        { label: 'Loi & Kiri-sute gomen', text: 'La parole d\'un buke vaut preuve légale sauf témoignage d\'un supérieur ou preuve matérielle irréfutable ; aveux heimin sans valeur sans confirmation. Kiri-sute gomen : exécution justifiée d\'un roturier insolent.' }
      ]
    },
    {
      id: 'magic_casting_4e',
      category: 'magic',
      title: 'Magie des Shugenja, Incantation & Contre-sort',
      badge: 'Base (pp. 163–164) & Feu (p. 182)',
      summary: 'Jet d\'Incantation, emplacements élémentaires + Vide, mémorisation et interruption.',
      keywords: 'magie shugenja sort incantation emplacement vide affinite deficience parchemin memorisation interruption contre-sort',
      items: [
        { label: 'Jet & Emplacements', text: '(Anneau + Rang d\'École) g Anneau vs ND 5 + 5 × Maîtrise. Emplacements/jour = valeur de chaque Anneau + Anneau de Vide en emplacements bonus polyvalents. Un échec consomme l\'emplacement.' },
        { label: 'Temps & Interruption', text: 'Maîtrise Actions Complexes (-1 par Augmentation, min 1). Si blessé/distrait pendant le lancement : Volonté ND 10 (ou 5 + dégâts) ; échec = sort annulé sans perte d\'emplacement.' },
        { label: 'Affinité & Déficience', text: 'Affinité : +1 Rang d\'École effectif. Déficience : -1 Rang d\'École effectif (si réduit à 0, sort impossible — aucun malus de +5 ND).' },
        { label: 'Parchemins & Mémoire', text: 'Lecture sur parchemin obligatoire par défaut ; mémoriser un sort coûte XP = Maîtrise du sort.' },
        { label: 'Contre-sort (Option, Feu p. 182)', text: 'Art de la Magie ≥ 5 ; Action Complexe + 1 emplacement de l\'élément opposé (Feu↔Eau, Air↔Terre, Vide↔Vide) ; portée 15 m × Rang ; Jet d\'Incantation opposé > jet du lanceur (jamais contre Maho, Meishodo ni sceaux).' }
      ]
    },
    {
      id: 'fear_taint_jade_poisons',
      category: 'outremonde',
      title: 'Peur, Souillure (Tables 4.1–4.3) & Poisons',
      badge: 'Base (pp. 90, 275–278, 332–333)',
      summary: 'Résistance à la Peur, niveaux d\'infection 0–5, Doigts de Jade et poisons officiels.',
      keywords: 'peur souillure outremonde maho jade doigt exposition poison dripping fire biter night milk venin',
      items: [
        { label: 'Peur X (p. 90)', text: 'Volonté g Volonté + Rang d\'Honneur vs ND 5 + 5 × X. Échec = -Xg0 toute la rencontre ; échec de 15+ = fuite ou terreur paralysante.' },
        { label: 'Exposition (Table 4.1)', text: 'Terre g Terre : ND 10 (voyage 1/j sans jade, blessure Outremonde, sang/ichor) • ND 15 (blessé par créature/arme souillée, Pouvoir mineur, Marque d\'Oni/sem., immergé) • ND 20 (Pouvoir majeur, nourriture souillée) • ND 30 (avalé par un Oni). Maho : Volonté vs ND 5 + 5 × Maîtrise.' },
        { label: 'Doigts de Jade (Table 4.3)', text: '1 = 7 j • 2 = 13 j • 3 = 16 j • 4 = 19 j • 5 = 21 j • 6+ = 22 j (+10 aux jets de Terre contre l\'acquisition de Souillure ; le jade se liquéfie en boue noire une fois saturé).' },
        { label: 'Niveaux 0–5 (pp. 277–278)', text: '0 (<1) indétectable • 1 jade brûle • 2 (+1 Pouvoir) • 3 (-1g0 Social, +1 Mutation, +1 Pouvoir) • 4 (-2g0 Social, -2g2 Honneur opt., -1 Vide max, Volonté 15 ou violence, +1 Mutation, +2 Pouvoirs) • 5+ (7+ si Anneau ≥ 6) = Perdu (PNJ).' },
        { label: 'Poisons (pp. 332–333)', text: 'Dripping Poison (Fab 20/Soins 15, ingestion 4h : -2 Constit/h ou Constit ND 20, Fatigué 24h) • Fire Biter (25/25, blessure 10 min : Étourdi 6h ou Constit ND 30 → Fatigué) • Night Milk (25/20, immédiat+1 min : Constit ND 25 ou Hébété 10 min) • Venin (10/15, -1 Agi/Réfl/Constit/Force/h, Constit ND 25 dès h2, 3 succès ou 8h repos).' }
      ]
    }
  ];

  // Table 2.3 officielle complète : Gaining & Losing Honor (Livre de Base L5R 4e, p. 91)
  const GM_HONOR_TABLE = [
    { act: 'Accepter un pot-de-vin', r0: '0', r12: '0', r34: '-3', r56: '-4', r78: '-7', r910: '-8', positive: false },
    { act: 'Accepter la responsabilité des actes d\'un supérieur', r0: '+8', r12: '+7', r34: '+6', r56: '+4', r78: '+3', r910: '+3', positive: true },
    { act: 'Reconnaître publiquement un adversaire supérieur', r0: '+5', r12: '+4', r34: '+4', r56: '+2', r78: '+2', r910: '0', positive: true },
    { act: 'Soigner / aider un ennemi blessé', r0: '+9', r12: '+8', r34: '+6', r56: '+6', r78: '+5', r910: '+3', positive: true },
    { act: 'Être complice d\'un crime odieux', r0: '-1', r12: '-4', r34: '-8', r56: '-12', r78: '-16', r910: '-20', positive: false },
    { act: 'Être complice d\'un crime mineur', r0: '0', r12: '-1', r34: '-4', r56: '-4', r78: '-8', r910: '-8', positive: false },
    { act: 'Entorse à l\'étiquette : blasphématoire', r0: '-1', r12: '-6', r34: '-10', r56: '-10', r78: '-16', r910: '-20', positive: false },
    { act: 'Entorse à l\'étiquette : majeure', r0: '0', r12: '-2', r34: '-2', r56: '-2', r78: '-6', r910: '-6', positive: false },
    { act: 'Entorse à l\'étiquette : mineure', r0: '0', r12: '0', r34: '-1', r56: '-2', r78: '-2', r910: '-2', positive: false },
    { act: 'Déloyauté envers son seigneur, époux(se) ou supérieur', r0: '0', r12: '-2', r34: '-6', r56: '-10', r78: '-14', r910: '-18', positive: false },
    { act: 'Être dupé dans un acte criminel', r0: '-1', r12: '-4', r34: '-8', r56: '-12', r78: '-16', r910: '-18', positive: false },
    { act: 'Être dupé dans un acte déloyal', r0: '0', r12: '-2', r34: '-4', r56: '-6', r78: '-10', r910: '-14', positive: false },
    { act: 'Être dupé dans un acte stupide / ridicule', r0: '0', r12: '-2', r34: '-4', r56: '-4', r78: '-6', r910: '-8', positive: false },
    { act: 'Désobéir à un ordre de son seigneur', r0: '0', r12: '-2', r34: '-2', r56: '-6', r78: '-6', r910: '-10', positive: false },
    { act: 'Supporter une insulte envers ses ancêtres / supérieur', r0: '0', r12: '-2', r34: '-4', r56: '-4', r78: '-6', r910: '-8', positive: false },
    { act: 'Supporter calmement une insulte personnelle', r0: '+2', r12: '+2', r34: '+2', r56: '0', r78: '0', r910: '+2', positive: true },
    { act: 'Supporter une insulte envers sa famille / son Clan', r0: '0', r12: '0', r34: '-2', r56: '-2', r78: '-4', r910: '-4', positive: false },
    { act: 'Affronter un ennemi supérieur pour sa famille', r0: '+8', r12: '+6', r34: '+5', r56: '+4', r78: '+3', r910: '+2', positive: true },
    { act: 'Fuir devant l\'ennemi / la bataille', r0: '0', r12: '-2', r34: '-4', r56: '-6', r78: '-8', r910: '-10', positive: false },
    { act: 'Obéir aux ordres malgré de profonds doutes', r0: '+6', r12: '+4', r34: '0', r56: '0', r78: '-2', r910: '-4', positive: true },
    { act: 'Tenir une promesse au prix d\'un grand sacrifice', r0: '+10', r12: '+8', r34: '+6', r56: '+4', r78: '+2', r910: '0', positive: true },
    { act: 'Rapporter la vérité à ses propres dépens', r0: '+8', r12: '+6', r34: '+4', r56: '+2', r78: '0', r910: '0', positive: true },
    { act: 'Mentir pour rehausser sa propre réputation', r0: '0', r12: '-2', r34: '-4', r56: '-6', r78: '-8', r910: '-10', positive: false },
    { act: 'Manipuler autrui dans un acte déshonorant', r0: '0', r12: '-2', r34: '-4', r56: '-6', r78: '-8', r910: '-10', positive: false },
    { act: 'Ignorer poliment le déshonneur d\'autrui', r0: '+3', r12: '+2', r34: '0', r56: '0', r78: '-2', r910: '-2', positive: true },
    { act: 'Protéger Clan / famille / seigneur au péril de soi', r0: '+8', r12: '+8', r34: '+6', r56: '+6', r78: '+4', r910: '+2', positive: true },
    { act: 'Faire preuve de bonté envers un inférieur social', r0: '+6', r12: '+6', r34: '+4', r56: '+4', r78: '+2', r910: '+2', positive: true },
    { act: 'Courtoisie sincère envers ennemis ou rivaux', r0: '+9', r12: '+7', r34: '+5', r56: '+2', r78: '0', r910: '0', positive: true },
    { act: 'Utiliser une Compétence Dégradante (Low Skill)', r0: '0', r12: '-1', r34: '-2', r56: '-3', r78: '-6', r910: '-9', positive: false },
    { act: 'Fausse courtoisie pour obtenir un avantage', r0: '0', r12: '0', r34: '-2', r56: '-6', r78: '-10', r910: '-10', positive: false }
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
