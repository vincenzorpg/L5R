// =============================================================================
// CODEX DE CAMPAGNE — PNJ, LIEUX & RELIQUES RÉCURRENTS (DATA/CAMPAIGN-CODEX-DATA.JS)
// Compatible Navigateur (window.CAMPAIGN_CODEX_DATA) et Node.js (module.exports)
// =============================================================================

(function (globalScope) {
  const CAMPAIGN_CODEX_DATA = [
    // -------------------------------------------------------------------------
    // PERSONNAGES & ANTAGONISTES
    // -------------------------------------------------------------------------
    {
      id: "tsuruchi-akira",
      category: "npc",
      name: "Tsuruchi Akira",
      role: "Chroniqueur principal • Archer Guêpe / Mante",
      faction: "mante",
      acts: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
      summary: "Narrateur de la majorité des Chroniques, survivant du Championnat de Topaze, de Ryoko Owari, de la Tombe de Iuchiban et de l'embuscade de Yanagi Mura."
    },
    {
      id: "okado-hiruma",
      category: "npc",
      name: "Okado Hiruma",
      role: "Éclaireur du Clan du Crabe",
      faction: "crabe",
      acts: [2, 6, 9, 10, 11],
      summary: "Compagnon d'armes fidèle et co-chroniqueur de l'affaire de Kyoteï. Son mariage scelle une alliance stratégique pour la famille Hiruma."
    },
    {
      id: "hiro-hito",
      category: "npc",
      name: "Hiro-Hito",
      role: "Bushi du Clan du Crabe",
      faction: "crabe",
      acts: [9, 10, 11],
      summary: "Guerrier massif armé d'un tetsubo dévastateur, capable de pulvériser les horreurs animées de l'Outremonde d'un seul coup."
    },
    {
      id: "ryujin",
      category: "npc",
      name: "Ryujin",
      role: "Compagnon d'armes du groupe",
      faction: "dragon",
      acts: [10, 11],
      summary: "Combattant aguerri ayant affronté les pièges mortels du labyrinthe de Iuchiban puis les marionnettes masquées sur la route de Yanagi Mura."
    },
    {
      id: "ryumitaka-isawa",
      category: "npc",
      name: "Ryûmitaka Isawa",
      role: "Shugenja du Clan du Phénix",
      faction: "phenix",
      acts: [3],
      summary: "Chroniqueur du troisième acte relatant le péril spirituel du dernier voyage sur les routes de l'Empire."
    },
    {
      id: "hida-kisada",
      category: "npc",
      name: "Hida Kisada",
      role: "Champion du Clan du Crabe",
      faction: "crabe",
      acts: [9],
      summary: "Le Grand Ours lui-même mandate secrètement le groupe pour escorter Yuriko Kuni jusqu'à Shiro Kuni afin d'éviter la chute des défenses."
    },
    {
      id: "yuriko-kuni",
      category: "npc",
      name: "Kuni Yuriko",
      role: "Shugenja & Chasseuse de Sorciers Kuni",
      faction: "crabe",
      acts: [9, 10, 11],
      summary: "Spécialiste des souillures de l'Outremonde et de la mahō. Déchiffre les cartes stellaires de Chuda Tenkazu et identifie le mal rongeant les PJs."
    },
    {
      id: "soshi-takeda",
      category: "npc",
      name: "Soshi Takeda",
      role: "Magistrat du Clan du Scorpion",
      faction: "scorpion",
      acts: [11],
      summary: "Magistrat au demi-masque de démon recevant les PJs au Pavillon des Murmures d'Automne. Leur confie l'enquête de Yanagi Mura en échange d'un remède."
    },
    {
      id: "asako-kenji",
      category: "npc",
      name: "Asako Kenji",
      role: "Magistrat de Jade du Clan du Phénix (défunt)",
      faction: "phenix",
      acts: [11],
      summary: "Infiltré dans la vallée de Mura Sabishii pour traquer la cellule de Chuda Tenkasu, retrouvé mort près d'un autel profané avec une carte stellaire."
    },
    {
      id: "iuchiban",
      category: "npc",
      name: "Iuchiban",
      role: "L'Immortel Sorcier du Sang",
      faction: "outremonde",
      acts: [10, 11],
      summary: "Ancien maho-tsukai légendaire dont la tombe fut profanée puis scellée. Ses adeptes cherchent l'Ancre de Sang pour libérer son esprit."
    },
    {
      id: "chuda-tenkasu",
      category: "npc",
      name: "Chuda Tenkasu",
      role: "Maho-tsukai des Adeptes du Sang",
      faction: "outremonde",
      acts: [11],
      summary: "Chef d'une cellule occulte opérant en lisière du Shinomen pour récupérer l'Ancre de Sang lors de la Nuit de la Lune de Sang."
    },
    {
      id: "bunzo",
      category: "npc",
      name: "Bunzo",
      role: "Faux moine de Yanagi Mura",
      faction: "outremonde",
      acts: [11],
      summary: "Sous des airs de moine bienveillant, dirigeait un rituel sanguinaire sous les racines du grand saule pleureur de Yanagi Mura."
    },

    // -------------------------------------------------------------------------
    // LIEUX EMBLÉMATIQUES
    // -------------------------------------------------------------------------
    {
      id: "lieu-tsuma",
      category: "place",
      name: "Village de Tsuma",
      role: "Terres du Clan de la Grue",
      faction: "grue",
      acts: [1],
      summary: "Théâtre du prestigieux Championnat de Topaze où les jeunes samouraïs passent leur gempukku sous le regard des Grands Clans."
    },
    {
      id: "lieu-kyotei",
      category: "place",
      name: "Château de Kyoteï",
      role: "Forteresse frontalière",
      faction: "crabe",
      acts: [2],
      summary: "Bastion où un meurtre politique met à l'épreuve l'étiquette et les alliances fragiles entre clans."
    },
    {
      id: "lieu-ryoko-owari",
      category: "place",
      name: "Ryoko Owari",
      role: "Cité des Histoires Vertes (Scorpion)",
      faction: "scorpion",
      acts: [7],
      summary: "Métropole de l'opium, des intrigues nocturnes et des maisons de geishas où l'ombre du Scorpion règne sans partage."
    },
    {
      id: "lieu-shiro-kuni",
      category: "place",
      name: "Shiro Kuni",
      role: "Citadelle des Shugenjas Kuni",
      faction: "crabe",
      acts: [9],
      summary: "Temple fortifié aux portes de l'Outremonde abritant les archives et rituels de purification du Clan du Crabe."
    },
    {
      id: "lieu-tombe-iuchiban",
      category: "place",
      name: "La Tombe de Iuchiban",
      role: "Sanctuaire maudit caché",
      faction: "outremonde",
      acts: [10],
      summary: "Labyrinthe mortel rempli de pièges d'obsidienne et d'énigmes de sang où les PJs contractèrent une malédiction silencieuse."
    },
    {
      id: "lieu-murmures-automne",
      category: "place",
      name: "Pavillon des Murmures d'Automne",
      role: "Maison de thé sur pilotis (Sud Scorpion)",
      faction: "scorpion",
      acts: [11],
      summary: "Établissement isolé au-dessus d'un torrent bouillonnant où Soshi Takeda convoque secrètement les survivants de la Tombe."
    },
    {
      id: "lieu-yanagi-mura",
      category: "place",
      name: "Yanagi Mura (Village du Saule Pleureur)",
      role: "Lisière de la Forêt de Shinomen",
      faction: "scorpion",
      acts: [11],
      summary: "Village perdu de la vallée de Mura Sabishii dissimulant un autel souterrain sous les racines d'un saule millénaire."
    },

    // -------------------------------------------------------------------------
    // RELIQUES, ARTEFACTS & PISTES
    // -------------------------------------------------------------------------
    {
      id: "relic-carte-stellaire",
      category: "relic",
      name: "Carte stellaire en peau séchée",
      role: "Indice occulte des Adeptes du Sang",
      faction: "outremonde",
      acts: [11],
      summary: "Arrachée au cadavre d'Asako Kenji. Annonce la Nuit de la Lune de Sang et localise les lignes géomantiques de Yanagi Mura."
    },
    {
      id: "relic-medaillon-jade",
      category: "relic",
      name: "Médaillon de Magistrat de Jade fendu",
      role: "Preuve de la mort d'Asako Kenji",
      faction: "phenix",
      acts: [11],
      summary: "Brisé en deux et maculé de sang noir, témoignant d'une attaque de mahō sans la moindre entaille physique."
    },
    {
      id: "relic-doigts-jade",
      category: "relic",
      name: "Doigts de Jade veinés de sang noir",
      role: "Talismans remis par Soshi Takeda",
      faction: "scorpion",
      acts: [11],
      summary: "Cinq doigts de jade striés de veines sombres qui ralentissent temporairement la progression de la malédiction de la Tombe."
    },
    {
      id: "relic-ancre-sang",
      category: "relic",
      name: "L'Ancre de Sang & Écrits de Yajinden",
      role: "Relique majeure recherchée par Tenkasu",
      faction: "outremonde",
      acts: [11],
      summary: "Artéfact capable de briser le sceau spirituel de Iuchiban, lié à la lignée maudite d'Asahina Yajinden."
    }
  ];

  globalScope.CAMPAIGN_CODEX_DATA = CAMPAIGN_CODEX_DATA;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAMPAIGN_CODEX_DATA };
  }
})(typeof window !== "undefined" ? window : globalThis);
