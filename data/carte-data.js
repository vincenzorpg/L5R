/**
 * data/carte-data.js — Atlas Canonique de Rokugan & Itinéraire de la Campagne (L5R 4e Édition)
 * Coordonnées calibrées en pourcentages (0..100) sur assets/images/carte_rokugan.jpg (1024x1094).
 */
(function (globalScope) {
  'use strict';

  const ROKUGAN_FACTIONS = {
    imperial: { label: 'Impérial', color: '#f59e0b', bg: 'bg-amber-950/80 border-amber-500/60 text-amber-200', clanPage: null },
    crabe: { label: 'Clan du Crabe', color: '#3b82f6', bg: 'bg-blue-950/80 border-blue-500/60 text-blue-200', clanPage: 'clans/crabe.html' },
    grue: { label: 'Clan de la Grue', color: '#38bdf8', bg: 'bg-sky-950/80 border-sky-400/60 text-sky-200', clanPage: 'clans/grue.html' },
    dragon: { label: 'Clan du Dragon', color: '#10b981', bg: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200', clanPage: 'clans/dragon.html' },
    lion: { label: 'Clan du Lion', color: '#eab308', bg: 'bg-yellow-950/80 border-yellow-500/60 text-yellow-200', clanPage: 'clans/lion.html' },
    mante: { label: 'Clan de la Mante', color: '#14b8a6', bg: 'bg-teal-950/80 border-teal-500/60 text-teal-200', clanPage: 'clans/mante.html' },
    phenix: { label: 'Clan du Phénix', color: '#f97316', bg: 'bg-orange-950/80 border-orange-500/60 text-orange-200', clanPage: 'clans/phenix.html' },
    scorpion: { label: 'Clan du Scorpion', color: '#ef4444', bg: 'bg-red-950/80 border-red-500/60 text-red-200', clanPage: 'clans/scorpion.html' },
    licorne: { label: 'Clan de la Licorne', color: '#a855f7', bg: 'bg-purple-950/80 border-purple-500/60 text-purple-200', clanPage: 'clans/licorne.html' },
    peril: { label: 'Lieux & Périls', color: '#a8a29e', bg: 'bg-stone-900/90 border-stone-500/60 text-stone-200', clanPage: null }
  };

  const ROKUGAN_LOCATIONS = [
    // --- TERRITOIRE IMPÉRIAL ---
    {
      id: 'otosan-uchi',
      name: 'Otosan Uchi',
      kanji: '都',
      subtitle: 'La Cité Impériale',
      faction: 'imperial',
      kind: 'Capitale',
      x: 70.5,
      y: 35.0,
      major: true,
      desc: "Capitale millénaire de l'Empire d'Émeraude dressée à l'embouchure de la Rivière d'Or. Elle abrite la Cité Interdite des Empereurs Hantei, les quartiers des Grands Clans et le siège des Magistrats d'Émeraude."
    },
    {
      id: 'toshi-ranbo',
      name: 'Toshi Ranbo',
      kanji: '城',
      subtitle: 'Cité de la Rizière aux Mûriers',
      faction: 'imperial',
      kind: 'Forteresse Stratégique',
      x: 53.5,
      y: 25.5,
      major: true,
      desc: "Carrefour contesté entre le Lion, la Grue et le Dragon au bord du fleuve Noyé. Ancien théâtre de guerres acharnées avant de devenir cité impériale."
    },
    {
      id: 'kyuden-seppun',
      name: 'Kyuden Seppun',
      kanji: '宮',
      subtitle: 'Palais des Familles Impériales',
      faction: 'imperial',
      kind: 'Palais Impérial',
      x: 65.0,
      y: 35.5,
      major: false,
      desc: "Domaine traditionnel des Seppun, gardes dévoués de l'Empereur, ainsi que des Miya et des Otomo veillant sur la diplomatie impériale."
    },

    // --- CLAN DE LA GRUE ---
    {
      id: 'tsuma',
      name: 'Village de Tsuma',
      kanji: '桜',
      subtitle: 'Siège du Championnat de Topaze',
      faction: 'grue',
      kind: 'Bourgade & Dojo',
      x: 62.0,
      y: 40.5,
      major: true,
      desc: "Bourgade paisible des terres Doji renommée dans tout l'Empire pour accueillir chaque printemps les épreuves du prestigieux Championnat de Topaze, cérémonie de passage à l'âge adulte (gempukku) des meilleurs jeunes samouraïs."
    },
    {
      id: 'kyotei',
      name: 'Château de Kyoteï',
      kanji: '城',
      subtitle: 'Forteresse de la Vallée de Kintani',
      faction: 'grue',
      kind: 'Forteresse Frontalière',
      x: 61.5,
      y: 30.5,
      major: true,
      desc: "Bastion stratégique surplombant la vallée de Kintani au carrefour des terres Grue, Lion et Phénix. Reprise au Lion par Tsume Retsu, elle fut le théâtre d'un meurtre retentissant lors du Festival des Morts."
    },
    {
      id: 'kyuden-kakita',
      name: 'Kyuden Kakita',
      kanji: '鶴',
      subtitle: 'Académies de Duellistes & Artisans',
      faction: 'grue',
      kind: 'Palais de Famille',
      x: 65.5,
      y: 47.0,
      major: false,
      desc: "Cœur artistique et martial de la famille Kakita, abritant la prestigieuse Académie d'Iaijutsu et les écoles d'artisans impériaux."
    },
    {
      id: 'shiro-daidoji',
      name: 'Shiro Daidoji',
      kanji: '城',
      subtitle: 'Bastion des Grues de Fer',
      faction: 'grue',
      kind: 'Forteresse',
      x: 52.5,
      y: 62.5,
      major: false,
      desc: "Citadelle des défenseurs Daidoji protégeant les routes côtières et la frontière sud du Clan de la Grue."
    },
    {
      id: 'kyuden-doji',
      name: 'Kyuden Doji',
      kanji: '宮',
      subtitle: 'Palais d’Honneur de la Grue',
      faction: 'grue',
      kind: 'Capitale Clanique',
      x: 66.0,
      y: 55.5,
      major: true,
      desc: "Résidence ancestrale du Champion du Clan de la Grue dominant les falaises océaniques, réputée pour ses cours d'hiver raffinées."
    },

    // --- CLAN DE LA LICORNE ---
    {
      id: 'kyuden-shinjo',
      name: 'Kyuden Shinjo',
      kanji: '麒',
      subtitle: 'Grand Campement de la Licorne',
      faction: 'licorne',
      kind: 'Capitale Clanique',
      x: 24.5,
      y: 22.5,
      major: true,
      desc: "Bastion septentrional et centre névralgique du Clan de la Licorne, mêlant architecture rokugani et vastes pâturages pour les destriers des steppes."
    },
    {
      id: 'shiro-utaku',
      name: 'Shiro Utaku',
      kanji: '城',
      subtitle: 'Haras des Vierges Guerrières',
      faction: 'licorne',
      kind: 'Forteresse',
      x: 20.0,
      y: 31.5,
      major: false,
      desc: "Forteresse matriarcale des Utaku où sont élevés et dressés les légendaires destriers de guerre du clan."
    },
    {
      id: 'shiro-ide',
      name: 'Shiro Ide',
      kanji: '城',
      subtitle: 'Cité des Négociants Licorne',
      faction: 'licorne',
      kind: 'Forteresse',
      x: 31.0,
      y: 20.5,
      major: false,
      desc: "Carrefour caravanier ouvrant les routes commerciales entre les plaines de la Licorne et les cols du Dragon et du Lion."
    },
    {
      id: 'shiro-moto',
      name: 'Shiro Moto',
      kanji: '城',
      subtitle: 'Bastion de la Cavalerie Lourde',
      faction: 'licorne',
      kind: 'Forteresse',
      x: 25.5,
      y: 34.0,
      major: false,
      desc: "Base des escadrons Moto veillant sur la lisière nord de la forêt de Shinomen."
    },
    {
      id: 'terres-brulees',
      name: 'Les Terres Brûlées',
      kanji: '砂',
      subtitle: 'Déserts au-delà du Mur du Nord',
      faction: 'peril',
      kind: 'Contrée Étrangère',
      x: 16.0,
      y: 6.5,
      major: false,
      desc: "Vastes étendues désertiques gaijin au nord-ouest de Rokugan d'où proviennent reliques exotiques, épices et secrets de l'exil des Ki-Rin."
    },

    // --- CLAN DU DRAGON ---
    {
      id: 'kyuden-mirumoto',
      name: 'Kyuden Mirumoto',
      kanji: '龍',
      subtitle: 'Forteresse des Deux Cieux',
      faction: 'dragon',
      kind: 'Capitale Clanique',
      x: 45.5,
      y: 11.0,
      major: true,
      desc: "Palais escarpé niché dans les montagnes septentrionales où les maîtres Mirumoto enseignent le style Niten à deux sabres."
    },
    {
      id: 'haute-maison-lumiere',
      name: 'Haute Maison de Lumière',
      kanji: '墨',
      subtitle: 'Monastère des Ise Zumi Togashi',
      faction: 'dragon',
      kind: 'Monastère Sacré',
      x: 50.5,
      y: 18.0,
      major: true,
      desc: "Sanctuaire solitaire caché dans les sommets brumeux où les novices endurent les épreuves pour recevoir les tatouages mystiques de Togashi."
    },
    {
      id: 'shiro-kitsuki',
      name: 'Shiro Kitsuki',
      kanji: '城',
      subtitle: 'École des Enquêteurs Empiriques',
      faction: 'dragon',
      kind: 'Forteresse',
      x: 40.5,
      y: 18.0,
      major: false,
      desc: "Fief des célèbres magistrats et observateurs Kitsuki gardant les cols occidentaux du Dragon."
    },
    {
      id: 'kyuden-tamori',
      name: 'Kyuden Tamori',
      kanji: '城',
      subtitle: 'Forges & Alchimie des Shugenja',
      faction: 'dragon',
      kind: 'Forteresse',
      x: 54.5,
      y: 14.5,
      major: false,
      desc: "Monastère-forteresse des shugenja Tamori spécialisés dans la Terre, le Feu et les potions alchimiques de guerre."
    },

    // --- CLAN DU PHÉNIX ---
    {
      id: 'kyuden-isawa',
      name: 'Kyuden Isawa',
      kanji: '鳳',
      subtitle: 'Sanctuaire des Maîtres Élémentaires',
      faction: 'phenix',
      kind: 'Capitale Clanique',
      x: 82.5,
      y: 9.0,
      major: true,
      desc: "Cœur spirituel et arcanique du Phénix, siège du Conseil des Cinq Maîtres Élémentaires et des plus vastes bibliothèques de sortilèges."
    },
    {
      id: 'shiro-shiba',
      name: 'Shiro Shiba',
      kanji: '城',
      subtitle: 'Bastion des Yojimbo Shiba',
      faction: 'phenix',
      kind: 'Forteresse',
      x: 74.0,
      y: 11.5,
      major: false,
      desc: "Forteresse protectrice gardant l'accès aux provinces du Phénix face aux ambitions du Lion et de la Grue."
    },
    {
      id: 'kyuden-asako',
      name: 'Kyuden Asako',
      kanji: '書',
      subtitle: 'Archives & Mystiques Henshin',
      faction: 'phenix',
      kind: 'Palais Érudit',
      x: 86.5,
      y: 13.0,
      major: false,
      desc: "Conservatoire des annales théologiques et foyer des énigmatiques érudits et Henshin Asako."
    },

    // --- CLAN DU LION ---
    {
      id: 'shiro-akodo',
      name: 'Shiro Akodo',
      kanji: '獅',
      subtitle: 'Collège de Guerre de l’Empire',
      faction: 'lion',
      kind: 'Capitale Clanique',
      x: 47.0,
      y: 37.0,
      major: true,
      desc: "Cœur militaire du Clan du Lion et siège de la plus célèbre académie stratégique et tactique de tout Rokugan."
    },
    {
      id: 'shiro-matsu',
      name: 'Shiro Matsu',
      kanji: '城',
      subtitle: 'Bastion de la Fierté du Lion',
      faction: 'lion',
      kind: 'Forteresse',
      x: 48.0,
      y: 29.5,
      major: true,
      desc: "Citadelle des féroces berserkers Matsu veillant sur les plaines du nord et les passes menant aux terres Dragon et Grue."
    },
    {
      id: 'kyuden-ikoma',
      name: 'Kyuden Ikoma',
      kanji: '記',
      subtitle: 'Grande Bibliothèque des Annales',
      faction: 'lion',
      kind: 'Palais & Archives',
      x: 50.0,
      y: 44.0,
      major: true,
      desc: "Demeure des chroniqueurs, bardes et espions Ikoma préservant l'histoire héroïque et militaire de l'Empire d'Émeraude."
    },
    {
      id: 'shiro-kitsu',
      name: 'Shiro Kitsu',
      kanji: '城',
      subtitle: 'Sanctuaire des Ancêtres',
      faction: 'lion',
      kind: 'Forteresse',
      x: 57.5,
      y: 37.5,
      major: false,
      desc: "Lieu saint où les shugenja Kitsu perpétuent la communion avec les ancêtres glorieux du Yomi."
    },
    {
      id: 'source-memoire',
      name: 'Source de Mémoire',
      kanji: '泉',
      subtitle: 'Sanctuaire & Arbre de Vie',
      faction: 'lion',
      kind: 'Hameau & Sanctuaire',
      x: 51.5,
      y: 47.0,
      major: false,
      desc: "Village isolé lié aux souvenirs de la Bataille de l'Arbre de Vie et aux esprits des frères d'armes tombés au champ d'honneur."
    },

    // --- CLAN DU SCORPION ---
    {
      id: 'ryoko-owari',
      name: 'Ryoko Owari Toshi',
      kanji: '蠍',
      subtitle: 'La Cité des Histoires Vertes',
      faction: 'scorpion',
      kind: 'Métropole Marchande',
      x: 39.0,
      y: 36.5,
      major: true,
      desc: "Deuxième plus grande cité de l'Empire, bâtie sur la Baie de l'Honneur Noyé. Carrefour du commerce légal d'opium médicinale, d'intrigues feutrées, de maisons de geisha et de complots du Scorpion."
    },
    {
      id: 'kyuden-bayushi',
      name: 'Kyuden Bayushi',
      kanji: '宮',
      subtitle: 'Palais du Champion Scorpion',
      faction: 'scorpion',
      kind: 'Capitale Clanique',
      x: 44.5,
      y: 55.5,
      major: true,
      desc: "Demeure raffinée et impénétrable des seigneurs Bayushi dissimulant les secrets politiques les mieux gardés de Rokugan."
    },
    {
      id: 'passe-beiden',
      name: 'Passe de Beiden',
      kanji: '峠',
      subtitle: 'Verrou stratégique des Montagnes',
      faction: 'scorpion',
      kind: 'Col & Passe',
      x: 47.0,
      y: 46.0,
      major: false,
      desc: "Col vital reliant les plaines du Lion aux terres du Scorpion, perpétuellement fortifié et gardé."
    },
    {
      id: 'shiro-shosuro',
      name: 'Shiro Shosuro',
      kanji: '城',
      subtitle: 'Théâtres & Jardins Vénéneux',
      faction: 'scorpion',
      kind: 'Forteresse',
      x: 32.0,
      y: 47.5,
      major: false,
      desc: "Citadelle des comédiens et ombres Shosuro abritant les célèbres jardins de plantes toxiques entretenus par les Tokagure."
    },
    {
      id: 'shiro-yogo',
      name: 'Shiro Yogo',
      kanji: '護',
      subtitle: 'Bastion des Sceaux & Kuroiban',
      faction: 'scorpion',
      kind: 'Forteresse',
      x: 40.5,
      y: 61.5,
      major: false,
      desc: "Forteresse austère surplombant les cols du sud où les Yogo gravent leurs sceaux de garde contre les forces occultes."
    },

    // --- CLAN DU CRABE ---
    {
      id: 'kyuden-hida',
      name: 'Kyuden Hida',
      kanji: '蟹',
      subtitle: 'Citadelle du Champion du Crabe',
      faction: 'crabe',
      kind: 'Capitale Clanique',
      x: 34.0,
      y: 82.5,
      major: true,
      desc: "Massive forteresse côtière de granit noir d'où Hida Kisada coordonne la défense éternelle de l'Empire face aux hordes de l'Outremonde."
    },
    {
      id: 'shiro-kaiu',
      name: 'Shiro Kaiu',
      kanji: '鍛',
      subtitle: 'Grandes Forges & Génie de Siège',
      faction: 'crabe',
      kind: 'Forteresse',
      x: 18.0,
      y: 65.5,
      major: true,
      desc: "Centre sidérurgique des ingénieurs Kaiu où sont forgés armes lourdes, armures de siège et balistes du Mur."
    },
    {
      id: 'shiro-kuni',
      name: 'Shiro Kuni',
      kanji: '呪',
      subtitle: 'Monastère & Sanctuaire des Kuni',
      faction: 'crabe',
      kind: 'Sanctuaire & Forteresse',
      x: 30.5,
      y: 72.0,
      major: true,
      desc: "Sombre forteresse d'étude et de purification où les shugenja et chasseurs de sorciers Kuni analysent et endiguent la Souillure."
    },
    {
      id: 'shiro-kaotsuki',
      name: 'Shiro Kaotsuki No Higashi',
      kanji: '城',
      subtitle: 'Château des Émissaires de l’Est',
      faction: 'crabe',
      kind: 'Forteresse Frontalière',
      x: 44.5,
      y: 78.0,
      major: true,
      desc: "Imposante forteresse côtière du Clan du Crabe accueillant les cérémonies solennelles des forgerons Kaiu et les délégations des clans."
    },
    {
      id: 'shiro-hiruma',
      name: 'Shiro Hiruma',
      kanji: '狼',
      subtitle: 'Avant-poste Reconquis des Éclaireurs',
      faction: 'crabe',
      kind: 'Forteresse en Ruine / Reprise',
      x: 11.5,
      y: 70.0,
      major: false,
      desc: "Bastion ancestral des Hiruma sur le front sud, relevé de ses ruines après des siècles d'occupation par l'Outremonde."
    },
    {
      id: 'mur-kaiu',
      name: 'Le Mur Kaiu',
      kanji: '壁',
      subtitle: 'Le Grand Rempart des Bâtisseurs',
      faction: 'crabe',
      kind: 'Ligne Fortifiée',
      x: 18.5,
      y: 75.5,
      major: true,
      desc: "Rempart cyclopéen de plus de cent lieues combinant pierre enchantée, pièges d'huile et garnisons permanentes pour contenir Jigoku."
    },

    // --- CLAN DE LA MANTE ---
    {
      id: 'ashinagabachi',
      name: 'Kyuden Ashinagabachi',
      kanji: '蜂',
      subtitle: 'Forteresse de la Guêpe (Tsuruchi)',
      faction: 'mante',
      kind: 'Forteresse & Port',
      x: 48.5,
      y: 67.5,
      major: true,
      desc: "Fief continental du célèbre dojo des archers et chasseurs de primes Tsuruchi, surplombant la Baie de la Mante."
    },
    {
      id: 'kyuden-yoritomo',
      name: 'Kyuden Yoritomo',
      kanji: '螳',
      subtitle: 'Île de la Soie (Shima no Kinu)',
      faction: 'mante',
      kind: 'Capitale Insulaire',
      x: 75.5,
      y: 74.0,
      major: true,
      desc: "Siège maritime du Clan de la Mante au cœur des Îles de la Soie et des Épices, protégé par la flotte de guerre des kobune."
    },
    {
      id: 'ile-epices',
      name: 'Shima no Koshireyo',
      kanji: '島',
      subtitle: 'Île des Épices & Temples Moshi',
      faction: 'mante',
      kind: 'Archipel',
      x: 73.5,
      y: 86.5,
      major: false,
      desc: "Île prospère abritant comptoirs maritimes, chantiers navals Watanabe et sanctuaires solaires Moshi."
    },

    // --- MERVEILLES & PÉRILS ---
    {
      id: 'foret-shinomen',
      name: 'Forêt de Shinomen',
      kanji: '森',
      subtitle: 'Bois Millénaire des Anciens Secrets',
      faction: 'peril',
      kind: 'Forêt Sauvage',
      x: 19.5,
      y: 45.0,
      major: false,
      desc: "Immense forêt vierge et mystique s'étendant des terres Licorne aux frontières Scorpion, hantée par d'antiques ruines oubliées."
    },
    {
      id: 'outremonde',
      name: 'Terres de l’Outremonde',
      kanji: '鬼',
      subtitle: 'Domaine Corrompu de Jigoku',
      faction: 'peril',
      kind: 'Zone Maudite',
      x: 13.0,
      y: 86.5,
      major: true,
      desc: "Désert de cendres toxiques, marais putrides et terres maudites s'étendant au sud du Mur Kaiu jusqu'à la Fosse Suppurante de Fu Leng."
    },
    {
      id: 'tombe-iuchiban',
      name: 'La Tombe de Iuchiban',
      kanji: '墓',
      subtitle: 'Sanctuaire Scellé du Sang',
      faction: 'peril',
      kind: 'Tombeau Maudit',
      x: 36.0,
      y: 75.0,
      major: true,
      desc: "Nécropole labyrinthique truffée de pièges mortels où fut emprisonné le plus redoutable adepte du sang de l'histoire de Rokugan."
    },
    {
      id: 'yanagi-mura',
      name: 'Yanagi Mura',
      kanji: '柳',
      subtitle: 'Village du Saule Pleureur',
      faction: 'scorpion',
      kind: 'Village Frontière',
      x: 29.0,
      y: 52.5,
      major: true,
      desc: "Hameau isolé de la vallée de Mura Sabishii en lisière de la forêt de Shinomen. Sous les racines de son gigantesque saule pleureur se dissimulait un temple souterrain de la cellule de Chuda Bunzo."
    }
  ];

  // Itinéraire chronologique exact des PJs sur les 11 Actes de la Campagne
  const CAMPAIGN_ROUTE = [
    {
      step: 1,
      actLabel: 'Acte 01',
      title: 'Championnat de Topaze',
      locationId: 'tsuma',
      placeLabel: 'Village de Tsuma (Terres Grue)',
      author: 'Tsuruchi Akira',
      file: 'campagne/scenario-1.html',
      way: [[62.0, 40.5]],
      summary: "Départ de la Chronique : les jeunes samouraïs convergent vers Tsuma pour passer leur gempukku lors du centenaire du tournoi de Topaze."
    },
    {
      step: 2,
      actLabel: 'Acte 02',
      title: 'Meurtre au Château de Kyoteï',
      locationId: 'kyotei',
      placeLabel: 'Forteresse de Kyoteï (Vallée de Kintani)',
      author: 'Okado Hiruma / Tsuruchi Akira / Hida Samui',
      file: 'campagne/scenario-2.html',
      way: [[62.0, 40.5], [65.0, 35.5], [61.5, 30.5]],
      summary: "Invités par Tsume Retsu après le tournoi pour le Festival des Morts, les héros enquêtent sur un assassinat politique dans la forteresse frontalière."
    },
    {
      step: 3,
      actLabel: 'Acte 03',
      title: 'Le dernier voyage',
      locationId: 'kyuden-shinjo',
      placeLabel: 'Kyuden Shinjo & lisière des Terres Brûlées',
      author: 'Ryûmitaka Isawa & Tsuruchi Akira',
      file: 'campagne/scenario-3.html',
      way: [[61.5, 30.5], [53.5, 25.5], [31.0, 20.5], [24.5, 22.5]],
      summary: "Missionnés par Doji Satsume sur les traces du légendaire étalon Xian et de Shinjo Shimura jusqu'à Kyuden Shinjo et aux confins septentrionaux."
    },
    {
      step: 4,
      actLabel: 'Acte 04',
      title: 'Aux côtés de mes frères morts',
      locationId: 'kyuden-ikoma',
      placeLabel: 'Kyuden Ikoma → Source de Mémoire',
      author: 'Tsuruchi Akira (avec Ryûmitaka, Sutokhu & Samui)',
      file: 'campagne/scenario-4.html',
      way: [[24.5, 22.5], [47.0, 37.0], [50.0, 44.0], [51.5, 47.0]],
      summary: "Guidés par un origami de Megumi à travers les terres du Lion, passage par la bibliothèque de Kyuden Ikoma puis le village de la Source de Mémoire."
    },
    {
      step: 5,
      actLabel: 'Acte 05',
      title: 'Entre le ciel et l’enfer',
      locationId: 'shiro-kaotsuki',
      placeLabel: 'Kyuden Ashinagabachi → Shiro Kaotsuki No Higashi',
      author: 'Tsuruchi Akira (avec Samui, Ryûmitaka & Okado)',
      file: 'campagne/scenario-5.html',
      way: [[51.5, 47.0], [48.5, 67.5], [44.5, 78.0]],
      summary: "Après six mois de retraite chez les Tsuruchi à Ashinagabachi, route vers la forteresse Crabe des émissaires de l'Est pour la cérémonie des forges Kaiu."
    },
    {
      step: 6,
      actLabel: 'Acte 06',
      title: 'Le mariage d’Okado Hiruma',
      locationId: 'outremonde',
      placeLabel: 'Terres Crabe / Mur Kaiu → Outremonde',
      author: 'Tsuruchi Akira (avec Okado, Toma & Samui)',
      file: 'campagne/scenario-6.html',
      way: [[44.5, 78.0], [34.0, 82.5], [18.5, 75.5], [13.0, 86.5]],
      summary: "Les noces d'Okado Hiruma basculent lors de l'enlèvement de son épouse : équipement de jade et première traversée du Mur Kaiu vers l'Outremonde."
    },
    {
      step: 7,
      actLabel: 'Acte 07',
      title: 'Meurtre à Ryoko Owari',
      locationId: 'ryoko-owari',
      placeLabel: 'Ryoko Owari Toshi (Cité des Histoires Vertes)',
      author: 'Tsuruchi Akira (avec Samui & Shinta)',
      file: 'campagne/scenario-7.html',
      way: [[13.0, 86.5], [18.0, 65.5], [39.0, 36.5]],
      summary: "Enquête sombre dans les quartiers nobles et interlopes de Ryoko Owari Toshi au cœur des intrigues du Scorpion et de la Voie des Dompteurs."
    },
    {
      step: 8,
      actLabel: 'Acte 08',
      title: 'Le crépuscule de l’honneur',
      locationId: 'shiro-matsu',
      placeLabel: 'Ryoko Owari → Shiro Kaiu → Ashinagabachi → Shiro Matsu → Kyuden Hida',
      author: 'Tsuruchi Akira (avec Okado, Shinta, Samui & Gutmahïdo)',
      file: 'campagne/scenario-8.html',
      way: [[39.0, 36.5], [48.0, 29.5], [48.5, 67.5], [34.0, 82.5]],
      summary: "Long périple mouvementé à travers l'Empire (Shiro Kaiu, Ashinagabachi, Shiro Matsu) menant finalement le groupe vers Kyuden Hida sous l'orage."
    },
    {
      step: 9,
      actLabel: 'Acte 09',
      title: '« Ce qui ne meurt pas »',
      locationId: 'shiro-kuni',
      placeLabel: 'Kyuden Hida → Shiro Kuni',
      author: 'Tsuruchi Akira (avec Okado & HiroHito)',
      file: 'campagne/scenario-9.html',
      way: [[34.0, 82.5], [30.5, 72.0]],
      summary: "Mandatés par le Champion du Crabe Hida Kisada en personne pour escorter secrètement la shugenja Yuriko Kuni jusqu'au temple fortifié de Shiro Kuni."
    },
    {
      step: 10,
      actLabel: 'Acte 10 (Climax)',
      title: 'La tombe de Iuchiban',
      locationId: 'tombe-iuchiban',
      placeLabel: 'La Tombe Secrète de Iuchiban',
      author: 'Tsuruchi Akira (avec Okado, HiroHito & Ryujin)',
      file: 'campagne/scenario-10.html',
      way: [[30.5, 72.0], [36.0, 75.0]],
      summary: "L'assaut final de la Chronique dans le labyrinthe maudit de Iuchiban pour déjouer le réveil du plus terrible sorcier de l'histoire rokuganie."
    },
    {
      step: 11,
      actLabel: 'Acte 11',
      title: 'Écho du sang',
      locationId: 'yanagi-mura',
      placeLabel: 'Yanagi Mura (Lisière du Shinomen)',
      author: 'Tsuruchi Akira (avec Okado, Hiro-Hito & Ryujin)',
      file: 'campagne/scenario-11.html',
      way: [[36.0, 75.0], [40.5, 61.5], [29.0, 52.5]],
      summary: "Convoqués par le magistrat Scorpion Soshi Takeda au Pavillon des Murmures d'Automne pour contrer le maho-tsukai Shuda Tenkasu à Yanagi Mura avant la Nuit de la Lune de Sang."
    }
  ];

  globalScope.ROKUGAN_FACTIONS = ROKUGAN_FACTIONS;
  globalScope.ROKUGAN_LOCATIONS = ROKUGAN_LOCATIONS;
  globalScope.CAMPAIGN_ROUTE = CAMPAIGN_ROUTE;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ROKUGAN_FACTIONS, ROKUGAN_LOCATIONS, CAMPAIGN_ROUTE };
  }
})(typeof window !== 'undefined' ? window : globalThis);
