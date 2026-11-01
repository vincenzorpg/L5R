/**
 * js/export-carnet.js — Export officiel pour Le Carnet de Rokugan (schemaVersion: 2)
 * Conforme aux spécifications canoniques de nelsio/carnet-l5r (v2.18.0)
 */

// =============================================================================
// 1. CATALOGUE OFFICIEL DES IDENTIFIANTS D'ÉCOLES (schoolId) DU CARNET (§5.2)
// =============================================================================
const CARNET_SCHOOL_CATALOG = {
  // BUSHI
  "bushi hida": "hida-bushi",
  "hida bushi": "hida-bushi",
  "bushi-hida": "hida-bushi",

  "eclaireur hiruma": "hiruma-bushi",
  "bushi hiruma": "hiruma-bushi",
  "hiruma bushi": "hiruma-bushi",
  "bushi-hiruma": "hiruma-bushi",

  "duelliste kakita": "kakita-bushi",
  "bushi kakita": "kakita-bushi",
  "kakita bushi": "kakita-bushi",
  "duelliste-kakita": "kakita-bushi",

  "guerrier daidoji": "daidoji-bushi",
  "guerrier de fer daidoji": "daidoji-bushi",
  "daidoji bushi": "daidoji-bushi",
  "guerrier-daidoji": "daidoji-bushi",

  "bushi mirumoto": "mirumoto-bushi",
  "mirumoto bushi": "mirumoto-bushi",
  "bushi-mirumoto": "mirumoto-bushi",

  "ordre tatoué togashi": "togashi-moine",
  "moine togashi": "togashi-moine",
  "ise zumi togashi": "togashi-moine",
  "moine-togashi": "togashi-moine",

  "bushi akodo": "akodo-bushi",
  "akodo bushi": "akodo-bushi",
  "bushi-akodo": "akodo-bushi",

  "berserker matsu": "matsu-berserker",
  "bushi matsu": "matsu-berserker",
  "matsu bushi": "matsu-berserker",
  "bushi-matsu": "matsu-berserker",

  "bushi yoritomo": "yoritomo-bushi",
  "yoritomo bushi": "yoritomo-bushi",
  "bushi-yoritomo": "yoritomo-bushi",

  "archer tsuruchi": "tsuruchi-archer",
  "tsuruchi archer": "tsuruchi-archer",
  "archer-tsuruchi": "tsuruchi-archer",

  "bushi shiba": "shiba-bushi",
  "garde du corps shiba": "shiba-bushi",
  "shiba bushi": "shiba-bushi",
  "bushi-shiba": "shiba-bushi",

  "bushi bayushi": "bayushi-bushi",
  "bayushi bushi": "bayushi-bushi",
  "bushi-bayushi": "bayushi-bushi",

  "bushi moto": "moto-bushi",
  "cavalier moto": "moto-bushi",
  "moto bushi": "moto-bushi",
  "bushi-moto": "moto-bushi",

  "vierge guerriere utaku": "utaku-battle-maiden",
  "vierge utaku": "utaku-battle-maiden",
  "vierge-utaku": "utaku-battle-maiden",
  "battle maiden utaku": "utaku-battle-maiden",

  // COURTISAN & NINJA
  "courtisan yasuki": "yasuki-courtisan",
  "yasuki courtisan": "yasuki-courtisan",
  "courtisan-yasuki": "yasuki-courtisan",

  "courtisan doji": "doji-courtisan",
  "doji courtisan": "doji-courtisan",
  "courtisan-doji": "doji-courtisan",

  "enqueteur kitsuki": "kitsuki-enqueteur",
  "magistrat kitsuki": "kitsuki-enqueteur",
  "kitsuki enqueteur": "kitsuki-enqueteur",
  "magistrat-kitsuki": "kitsuki-enqueteur",

  "barde ikoma": "ikoma-barde",
  "ikoma barde": "ikoma-barde",
  "barde-ikoma": "ikoma-barde",

  "courtisan yoritomo": "yoritomo-courtisan",
  "yoritomo courtisan": "yoritomo-courtisan",
  "courtisan-yoritomo": "yoritomo-courtisan",

  "erudit asako": "asako-maitre-du-savoir",
  "maitre de savoir asako": "asako-maitre-du-savoir",
  "asako maitre du savoir": "asako-maitre-du-savoir",
  "erudit-asako": "asako-maitre-du-savoir",

  "courtisan bayushi": "bayushi-courtisan",
  "bayushi courtisan": "bayushi-courtisan",
  "courtisan-bayushi": "bayushi-courtisan",

  "infiltrateur shosuro": "shosuro-infiltre",
  "shosuro infiltre": "shosuro-infiltre",
  "infiltrateur-shosuro": "shosuro-infiltre",

  "emissaire ide": "ide-emissaire",
  "courtisan ide": "ide-emissaire",
  "ide emissaire": "ide-emissaire",
  "courtisan-ide": "ide-emissaire",

  // SHUGENJA
  "shugenja kuni": "kuni-shugenja",
  "kuni shugenja": "kuni-shugenja",
  "shugenja-kuni": "kuni-shugenja",

  "shugenja asahina": "asahina-shugenja",
  "asahina shugenja": "asahina-shugenja",
  "shugenja-asahina": "asahina-shugenja",

  "shugenja tamori": "tamori-shugenja",
  "tamori shugenja": "tamori-shugenja",
  "shugenja-tamori": "tamori-shugenja",

  "shugenja kitsu": "kitsu-shugenja",
  "kitsu shugenja": "kitsu-shugenja",
  "shugenja-kitsu": "kitsu-shugenja",

  "shugenja moshi": "moshi-shugenja",
  "moshi shugenja": "moshi-shugenja",
  "shugenja-moshi": "moshi-shugenja",

  "shugenja isawa": "isawa-shugenja",
  "isawa shugenja": "isawa-shugenja",
  "shugenja-isawa": "isawa-shugenja",

  "shugenja agasha": "agasha-shugenja",
  "agasha shugenja": "agasha-shugenja",
  "shugenja-agasha": "agasha-shugenja",

  "shugenja soshi": "soshi-shugenja",
  "soshi shugenja": "soshi-shugenja",
  "shugenja-soshi": "soshi-shugenja",

  "shugenja iuchi": "iuchi-shugenja",
  "iuchi shugenja": "iuchi-shugenja",
  "shugenja-iuchi": "iuchi-shugenja"
};

// =============================================================================
// 2. DICTIONNAIRE CANONIQUE DES ARMES DU LIVRE (§3.2 & §4.2)
// =============================================================================
const CARNET_WEAPONS_REF = {
  "katana":     { skill: "Kenjutsu",      dr: "3g2", keywords: ["samourai", "moyenne"] },
  "wakizashi":  { skill: "Kenjutsu",      dr: "2g2", keywords: ["samourai", "moyenne"] },
  "no-dachi":   { skill: "Kenjutsu",      dr: "3g3", keywords: ["grande", "deux-mains"] },
  "tanto":      { skill: "Couteaux",      dr: "1g1", keywords: ["petite"] },
  "aiguchi":    { skill: "Couteaux",      dr: "1g1", keywords: ["petite"] },
  "cimeterre":  { skill: "Kenjutsu",      dr: "2g3", keywords: ["cimeterre", "moyenne"] },
  "tetsubo":    { skill: "Armes lourdes", dr: "3g3", keywords: ["lourde", "grande", "deux-mains"] },
  "ono":        { skill: "Armes lourdes", dr: "0g4", keywords: ["lourde", "grande", "deux-mains"] },
  "dai tsuchi": { skill: "Armes lourdes", dr: "5g2", keywords: ["lourde", "grande", "deux-mains"] },
  "masakari":   { skill: "Armes lourdes", dr: "2g3", keywords: ["lourde", "moyenne"] },
  "yari":       { skill: "Lances",         dr: "2g2", keywords: ["lance", "grande"] },
  "naginata":   { skill: "Armes d'hast",  dr: "3g2", keywords: ["hast", "samourai", "grande", "deux-mains"] },
  "bo":         { skill: "Bâtons",        dr: "1g2", keywords: ["grande", "deux-mains"] },
  "kama":       { skill: "Couteaux",      dr: "0g2", keywords: ["paysan", "petite"] },
  "ninja-to":   { skill: "Ninjutsu",      dr: "2g2", keywords: ["ninja", "moyenne"] },
  "yumi":       { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "grande"], bowStrength: 3 },
  "dai-kyu":    { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "grande"], bowStrength: 4 }
};

// =============================================================================
// 3. TABLE DES COMPÉTENCES CANONIQUES ET DE LEURS TRAITS (§3.1 & §4.1)
// =============================================================================
const SKILL_TRAIT_MAP = {
  "athlétisme": "strength",
  "bataille": "perception",
  "calligraphie": "intelligence",
  "chasse": "perception",
  "comédie": "awareness",
  "commerce": "intelligence",
  "courtisan": "awareness",
  "défense": "reflexes",
  "discrétion": "agility",
  "divination": "intelligence",
  "droit": "intelligence",
  "équitation": "agility",
  "étiquette": "awareness",
  "iaijutsu": "reflexes",
  "intimidation": "willpower",
  "investigation": "perception",
  "jiujutsu": "agility",
  "méditation": "void",
  "sincérité": "awareness",
  "sortilèges": "intelligence",
  "théurgie": "intelligence",
  "tentation": "awareness",
  "kenjutsu": "agility",
  "kyujutsu": "reflexes",
  "armes lourdes": "agility",
  "armes d'hast": "agility",
  "lances": "agility",
  "bâtons": "agility",
  "couteaux": "agility",
  "ninjutsu": "agility",
  "armes de paysan": "agility",
  "éventail de guerre": "agility"
};

// =============================================================================
// 4. UTILITAIRES DE CONVERSION
// =============================================================================
function sanitizeNorm(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function resolveCanonClan(rawClan) {
  const norm = sanitizeNorm(rawClan);
  if (norm.includes("crabe") || norm.includes("crab")) return "Crabe";
  if (norm.includes("grue") || norm.includes("crane")) return "Grue";
  if (norm.includes("dragon")) return "Dragon";
  if (norm.includes("lion")) return "Lion";
  if (norm.includes("mante") || norm.includes("mantis")) return "Mante";
  if (norm.includes("phenix") || norm.includes("phoenix")) return "Phénix";
  if (norm.includes("scorpion")) return "Scorpion";
  if (norm.includes("licorne") || norm.includes("unicorn")) return "Licorne";
  if (norm.includes("araignee") || norm.includes("spider")) return "Araignée";
  if (norm.includes("imperial")) return "Impérial";
  return rawClan ? rawClan.trim() : "Crabe";
}

function resolveSchoolIdFromText(schoolName, rawId) {
  if (rawId && CARNET_SCHOOL_CATALOG[rawId]) return CARNET_SCHOOL_CATALOG[rawId];
  const norm = sanitizeNorm(schoolName)
    .replace(/^(ecole\s+de\s+|ecole\s+d'|ecole\s+des\s+|ecole\s+)/, "");
  
  if (CARNET_SCHOOL_CATALOG[norm]) return CARNET_SCHOOL_CATALOG[norm];
  if (CARNET_SCHOOL_CATALOG[sanitizeNorm(schoolName)]) return CARNET_SCHOOL_CATALOG[sanitizeNorm(schoolName)];
  
  // Si absente du catalogue officiel, schoolId doit être "" (§5.2)
  return "";
}

function normalizeSkillEntry(rawName, rankVal, isSpec) {
  let cleanName = (rawName || "").trim();
  const emphases = [];

  // Extraction d'éventuelles parenthèses comme "Kenjutsu (Katana)" ou "Chasse (Pistage)"
  const match = cleanName.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    cleanName = match[1].trim();
    if (match[2].trim()) emphases.push(match[2].trim());
  }

  const norm = sanitizeNorm(cleanName);

  // Conversion canonique "Enquête" -> "Investigation" (§3.1)
  if (norm === "enquete") {
    cleanName = "Investigation";
  } else if (norm === "conteur") {
    cleanName = "Représentation : Conte";
  } else if (norm === "eloquence") {
    cleanName = "Oratoire";
  }

  // Détermination du trait associé
  let traitKey = "agility";
  const normFinal = sanitizeNorm(cleanName);

  if (SKILL_TRAIT_MAP[normFinal]) {
    traitKey = SKILL_TRAIT_MAP[normFinal];
  } else if (normFinal.startsWith("artisanat")) {
    traitKey = "intelligence";
  } else if (normFinal.startsWith("connaissance")) {
    traitKey = "intelligence";
  } else if (normFinal.startsWith("representation")) {
    traitKey = "awareness";
  } else if (normFinal.startsWith("jeux")) {
    traitKey = "intelligence";
  }

  if (isSpec && emphases.length === 0) {
    emphases.push("Général");
  }

  return {
    name: cleanName,
    rank: Math.max(0, Math.min(10, parseInt(rankVal, 10) || 0)),
    trait: traitKey,
    emphases: Array.from(new Set(emphases))
  };
}

// =============================================================================
// 5. EXTRACTEUR GLOBAL ET GÉNÉRATEUR DU JSON OFFICIEL (§3 à §6)
// =============================================================================
function generateCarnetJSON() {
  if (typeof updateAll === "function") updateAll();

  // 1. Identité et lignée
  const nameEl = document.getElementById("pc-name");
  const rawName = (nameEl?.value || "Nouveau Samouraï").trim().substring(0, 80);

  const clanEl = document.getElementById("sel-clan");
  const rawClan = clanEl?.options[clanEl.selectedIndex]?.text || clanEl?.value || "Crabe";
  const canonClan = resolveCanonClan(rawClan);

  const famEl = document.getElementById("sel-family");
  const familyName = (famEl?.options[famEl.selectedIndex]?.text?.split("(")[0]?.trim() || "").substring(0, 80);

  const schoolEl = document.getElementById("sel-school");
  const schoolDisplayed = (schoolEl?.options[schoolEl.selectedIndex]?.text?.split("(")[0]?.trim() || "École").substring(0, 120);

  // Détection de l'ID d'école du catalogue (§5.2)
  const clansDb = typeof getClans === "function" ? getClans() : (window.CLANS_DATA || {});
  const clanKey = clanEl?.value || "crabe";
  const schIdx = parseInt(schoolEl?.value, 10) || 0;
  const currentSchoolData = clansDb[clanKey]?.schools?.[schIdx] || null;
  const internalSchoolId = currentSchoolData?.id || "";

  const canonSchoolId = resolveSchoolIdFromText(schoolDisplayed, internalSchoolId);

  // 2. Traits et Anneau du Vide
  const getNum = (id, def = 2) => {
    const val = parseInt(document.getElementById(id)?.value, 10);
    return isNaN(val) ? def : Math.max(1, Math.min(10, val));
  };

  const traits = {
    stamina: getNum("trait-stamina"),
    willpower: getNum("trait-willpower"),
    strength: getNum("trait-strength"),
    perception: getNum("trait-perception"),
    agility: getNum("trait-agility"),
    intelligence: getNum("trait-intelligence"),
    reflexes: getNum("trait-reflexes"),
    awareness: getNum("trait-awareness")
  };

  const voidRing = getNum("trait-void");

  // 3. Calcul officiel de l'Insight et du Rang (§2.1)
  const rEarth = Math.min(traits.stamina, traits.willpower);
  const rWater = Math.min(traits.strength, traits.perception);
  const rFire  = Math.min(traits.agility, traits.intelligence);
  const rAir   = Math.min(traits.reflexes, traits.awareness);
  const ringsSum = rEarth + rWater + rFire + rAir + voidRing;

  // 4. Compétences (skills[]) : dédoublonnées et normalisées
  const rawSkillsList = Array.isArray(window.currentSkills) ? window.currentSkills : [];
  const processedSkillsMap = new Map();

  rawSkillsList.forEach(sk => {
    if (sk.isChoice && !sk.chosen) return;
    const norm = normalizeSkillEntry(sk.name, sk.rank, sk.spec);
    const key = sanitizeNorm(norm.name);

    if (processedSkillsMap.has(key)) {
      const existing = processedSkillsMap.get(key);
      existing.rank = Math.max(existing.rank, norm.rank);
      existing.emphases = Array.from(new Set([...existing.emphases, ...norm.emphases]));
    } else {
      processedSkillsMap.set(key, norm);
    }
  });

  // Si aucune compétence, on garantit au moins Kenjutsu 1
  if (processedSkillsMap.size === 0) {
    processedSkillsMap.set("kenjutsu", {
      name: "Kenjutsu",
      rank: 1,
      trait: "agility",
      emphases: ["Katana"]
    });
  }

  const skills = Array.from(processedSkillsMap.values());
  const sumSkillsRank = skills.reduce((acc, s) => acc + s.rank, 0);

  const insightPoints = (ringsSum * 10) + sumSkillsRank;
  let insightRank = 1;
  if (insightPoints >= 150) {
    insightRank = Math.min(10, 2 + Math.floor((insightPoints - 150) / 25));
  }

  // 5. Honneur, Gloire, Statut (une décimale max obligatoire) (§5)
  const parseDecimal1 = (id, def = 1.0) => {
    const raw = parseFloat(document.getElementById(id)?.textContent || def);
    return isNaN(raw) ? def : parseFloat(Number(Math.max(0, Math.min(10, raw))).toFixed(1));
  };

  const honorVal = parseDecimal1("stat-honor", 4.5);
  const gloryVal = 1.0;
  const statusVal = 1.0;

  // 6. XP
  const xpTotal = parseInt(document.getElementById("xp-total")?.textContent || document.getElementById("base-xp-input")?.value || 40, 10) || 40;
  const xpRemaining = parseInt(document.getElementById("xp-remaining")?.textContent || 0, 10) || 0;
  const xpSpent = Math.max(0, xpTotal - xpRemaining);

  // 7. Armure (armor) (§3.4)
  const armorSel = document.getElementById("pc-armor");
  const armorBonus = parseInt(armorSel?.value, 10) || 0;
  let armorName = "";
  let armorReduction = 0;
  let armorCatalogId = "none";

  if (armorBonus === 10) {
    armorName = "Armure lourde";
    armorReduction = 5;
    armorCatalogId = "heavy";
  } else if (armorBonus === 5) {
    armorName = "Armure légère";
    armorReduction = 3;
    armorCatalogId = "light";
  } else if (armorBonus === 4 || armorBonus === 7) {
    armorName = "Armure de cavalerie";
    armorReduction = 4;
    armorCatalogId = "riding";
  } else if (armorBonus === 3) {
    armorName = "Armure d'ashigaru";
    armorReduction = 1;
    armorCatalogId = "ashigaru";
  }

  const armorObj = {
    name: armorName,
    bonus: armorBonus,
    reduction: armorReduction,
    catalogId: armorCatalogId
  };

  // 8. Armes (weapons[]) (§3.2 & §4.2)
  const w1Name = document.getElementById("pc-weapon-1")?.value || "Katana";
  const w2Name = document.getElementById("pc-weapon-2")?.value || "Aucune";
  const rawWeaponsList = [w1Name, ...(w2Name !== "Aucune" ? [w2Name] : [])];

  const weaponsMap = new Map();
  rawWeaponsList.forEach(rawW => {
    const normW = sanitizeNorm(rawW);
    let matchedKey = Object.keys(CARNET_WEAPONS_REF).find(k => normW.includes(k));
    
    if (matchedKey) {
      const ref = CARNET_WEAPONS_REF[matchedKey];
      const wName = rawW.split("(")[0].trim().substring(0, 80);
      const wObj = {
        name: wName,
        skill: ref.skill,
        dr: ref.dr,
        keywords: [...ref.keywords]
      };
      if (ref.bowStrength !== undefined) {
        wObj.bowStrength = ref.bowStrength;
      }
      weaponsMap.set(wName.toLowerCase(), wObj);
    } else {
      const wName = rawW.split("(")[0].trim().substring(0, 80);
      weaponsMap.set(wName.toLowerCase(), {
        name: wName || "Katana",
        skill: "Kenjutsu",
        dr: "3g2",
        keywords: ["samourai", "moyenne"]
      });
    }
  });

  const weapons = Array.from(weaponsMap.values());

  // 9. Techniques libres (§3.3) : injection uniquement si l'école est hors catalogue
  const techniques = [];
  if (canonSchoolId === "" && currentSchoolData) {
    const techList = currentSchoolData.techniques || (currentSchoolData.technique ? [currentSchoolData.technique] : []);
    techList.forEach(t => {
      if (t.rank <= insightRank) {
        techniques.push({
          name: (t.name || "Technique").substring(0, 120),
          text: t.effect || ""
        });
      }
    });
  }

  // 10. Modificateurs de jets (modifiers[]) (§3.5)
  const modifiers = [];
  const advList = Array.isArray(window.advantagesList) ? window.advantagesList : [];
  const disadvList = Array.isArray(window.disadvantagesList) ? window.disadvantagesList : [];

  advList.forEach(a => {
    const aNorm = sanitizeNorm(a.name);
    if (aNorm.includes("force de la terre")) {
      modifiers.push({
        id: "force-de-la-terre",
        name: "Force de la Terre",
        source: "advantage",
        appliesTo: "wounds",
        rolled: 0, kept: 0, flat: 3, tn: 0, freeRaises: 0,
        mode: "always",
        note: "Pénalités de blessure réduites de 3."
      });
    } else if (aNorm.includes("grand") || aNorm.includes("large")) {
      modifiers.push({
        id: "grand-degats",
        name: "Grand (Large)",
        source: "advantage",
        appliesTo: "damage",
        rolled: 1, kept: 0, flat: 0, tn: 0, freeRaises: 0,
        mode: "always",
        note: "+1g0 aux dégâts de mêlée."
      });
    } else if (aNorm.includes("vitesse eclair") || aNorm.includes("lightning reflexes")) {
      modifiers.push({
        id: "vitesse-eclair",
        name: "Vitesse Éclair",
        source: "advantage",
        appliesTo: "initiative",
        rolled: 1, kept: 0, flat: 0, tn: 0, freeRaises: 0,
        mode: "always",
        note: "+1g0 à l'Initiative."
      });
    } else if (aNorm.includes("voix")) {
      modifiers.push({
        id: "voix-social",
        name: "La Voix de Rokugan",
        source: "advantage",
        appliesTo: "social",
        rolled: 1, kept: 0, flat: 0, tn: 0, freeRaises: 0,
        mode: "always",
        note: "+1g0 sur les jets sociaux oratoires."
      });
    }
  });

  disadvList.forEach(d => {
    const dNorm = sanitizeNorm(d.name);
    if (dNorm.includes("sensible a la douleur") || dNorm.includes("low pain threshold")) {
      modifiers.push({
        id: "sensible-douleur",
        name: "Sensible à la Douleur",
        source: "disadvantage",
        appliesTo: "wounds",
        rolled: 0, kept: 0, flat: -5, tn: 0, freeRaises: 0,
        mode: "always",
        note: "Pénalités de blessure aggravées de 5 points."
      });
    } else if (dNorm.includes("petit") || dNorm.includes("small")) {
      modifiers.push({
        id: "petit-degats",
        name: "Petit (Small)",
        source: "disadvantage",
        appliesTo: "damage",
        rolled: -1, kept: 0, flat: 0, tn: 0, freeRaises: 0,
        mode: "always",
        note: "-1g0 aux dégâts de mêlée."
      });
    }
  });

  // 11. Sorts pour Shugenja (§3.6)
  const spells = [];
  const isShugenja = sanitizeNorm(schoolDisplayed).includes("shugenja") || (currentSchoolData && currentSchoolData.type === "Shugenja");

  if (isShugenja) {
    spells.push(
      {
        id: "sentir",
        name: "Sentir",
        element: "all",
        mastery: 1,
        keywords: ["Divination"],
        range: "Personnelle",
        area: "Rayon de 15 m",
        duration: "Instantanée",
        raises: "Portée (+5 m)",
        damage: "",
        memorized: true,
        effect: "Ressent la présence, la quantité et l'humeur des esprits élémentaires dans la zone."
      },
      {
        id: "communier",
        name: "Communier",
        element: "all",
        mastery: 1,
        keywords: ["Divination"],
        range: "Personnelle",
        area: "Les esprits contactés",
        duration: "Concentration",
        raises: "Questions (+1)",
        damage: "",
        memorized: true,
        effect: "Pose des questions aux esprits d'un élément présent pour connaître les événements passés."
      },
      {
        id: "invoquer",
        name: "Invoquer",
        element: "all",
        mastery: 1,
        keywords: ["Artisanat"],
        range: "Toucher",
        area: "Une petite quantité",
        duration: "Permanente",
        raises: "Quantité accrue",
        damage: "",
        memorized: true,
        effect: "Fait apparaître une petite quantité pure de l'élément souhaité (eau fraîche, braise, terreau, brise)."
      }
    );
  }

  // 12. Textes libres
  const advText = advList.map(a => a.name).join("\n");
  const disadvText = disadvList.map(d => d.name).join("\n");
  const notesText = (document.getElementById("pc-outfit")?.value || "").trim();

  // 13. Assemblage de l'objet racine strict (§2 à §5)
  const payload = {
    schemaVersion: 2,
    name: rawName,
    clan: canonClan,
    family: familyName,
    school: schoolDisplayed,
    schoolId: canonSchoolId,
    schoolRank: null, // null = égal au Rang d'Insight (§2)
    insightRank: insightRank,
    honor: honorVal,
    glory: gloryVal,
    status: statusVal,
    xp: {
      total: xpTotal,
      spent: xpSpent
    },
    traits: traits,
    voidRing: voidRing,
    voidPoints: voidRing,
    wounds: 0,
    armor: armorObj,
    skills: skills,
    weapons: weapons,
    techniques: techniques,
    maneuvers: [],
    modifiers: modifiers,
    spells: spells,
    advantages: advText,
    disadvantages: disadvText,
    notes: notesText
  };

  // Affinité obligatoire si Shugenja Isawa (§5.2)
  if (canonSchoolId === "isawa-shugenja") {
    payload.affinity = "fire";
  }

  return payload;
}

// =============================================================================
// 6. DÉCLENCHEMENT DU TÉLÉCHARGEMENT CLIENT (§8)
// =============================================================================
function exportToCarnetRokugan() {
  try {
    const payload = generateCarnetJSON();

    if (!payload.name || payload.name.trim() === "") {
      alert("Veuillez saisir le nom de votre samouraï avant de générer l'export.");
      return;
    }

    const jsonString = JSON.stringify(payload, null, 2);

    // Nom de fichier recommandé : <nom-du-personnage>-l5r.json (§8)
    const safeName = sanitizeNorm(payload.name)
      .replace(/[^a-z0-9\-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "samourai";

    const fileName = `${safeName}-l5r.json`;

    const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Erreur lors de la génération de l'export Carnet :", err);
    alert("Une erreur inattendue est survenue lors de la création du fichier JSON.");
  }
}

// Exposition globale
if (typeof window !== "undefined") {
  window.exportToCarnetRokugan = exportToCarnetRokugan;
  window.generateCarnetJSON = generateCarnetJSON;
}
