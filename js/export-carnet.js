/**
 * js/export-carnet.js — Export officiel pour Le Carnet de Rokugan (schemaVersion: 2)
 * Conforme aux spécifications canoniques de nelsio/carnet-l5r (v2.18.0+)
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

  "ordre tatoue togashi": "togashi-moine",
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
  "yari":       { skill: "Lances",        dr: "2g2", keywords: ["lance", "grande"] },
  "naginata":   { skill: "Armes d'hast",  dr: "3g2", keywords: ["hast", "samourai", "grande", "deux-mains"] },
  "bo":         { skill: "Bâtons",        dr: "1g2", keywords: ["grande", "deux-mains"] },
  "kama":       { skill: "Couteaux",      dr: "0g2", keywords: ["paysan", "petite"] },
  "ninja-to":   { skill: "Ninjutsu",      dr: "2g2", keywords: ["ninja", "moyenne"] },
  "yumi":           { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "grande"], bowStrength: 3 },
  "dai-kyu":        { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "grande"], bowStrength: 4 },
  "han-kyu":        { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "petite"], bowStrength: 1 },
  "parangu":        { skill: "Kenjutsu",      dr: "2g2", keywords: ["moyenne", "paysan"] },
  "bokken":         { skill: "Kenjutsu",      dr: "0g2", keywords: ["samourai", "moyenne"] },
  "shinai":         { skill: "Kenjutsu",      dr: "0g1", keywords: ["samourai", "moyenne"] },
  "jitte":          { skill: "Couteaux",      dr: "1g1", keywords: ["petite"] },
  "bisento":        { skill: "Armes d'hast",  dr: "3g3", keywords: ["hast", "grande", "deux-mains"] },
  "nagamaki":       { skill: "Armes d'hast",  dr: "2g3", keywords: ["hast", "grande", "deux-mains"] },
  "sasumata":       { skill: "Armes d'hast",  dr: "0g2", keywords: ["hast", "grande"] },
  "sodegarami":     { skill: "Armes d'hast",  dr: "1g1", keywords: ["hast", "grande"] },
  "nage-yari":      { skill: "Lances",        dr: "1g2", keywords: ["lance", "moyenne"] },
  "mai chong":      { skill: "Lances",        dr: "0g3", keywords: ["lance", "grande"] },
  "kumade":         { skill: "Lances",        dr: "1g1", keywords: ["lance", "paysan", "grande"] },
  "magari-yari":    { skill: "Lances",        dr: "3g2", keywords: ["lance", "grande"] },
  "lance de cavalerie": { skill: "Lances",    dr: "3g4", keywords: ["lance", "grande"] },
  "nunchaku":       { skill: "Bâtons",        dr: "1g2", keywords: ["paysan", "petite"] },
  "tonfa":          { skill: "Bâtons",        dr: "0g3", keywords: ["paysan", "moyenne"] },
  "machi-kanshisha":{ skill: "Bâtons",        dr: "0g2", keywords: ["moyenne"] },
  "sang kauw":      { skill: "Bâtons",        dr: "1g2", keywords: ["moyenne"] },
  "kusarigama":     { skill: "Armes à chaîne",dr: "0g2", keywords: ["grande"] },
  "kyoketsu-shogi": { skill: "Armes à chaîne",dr: "0g1", keywords: ["grande"] },
  "manrikikusari":  { skill: "Armes à chaîne",dr: "1g1", keywords: ["grande"] },
  "tessen":         { skill: "Éventail de guerre", dr: "0g1", keywords: ["petite"] },
  "shuriken":       { skill: "Ninjutsu",      dr: "1g1", keywords: ["ninja", "petite", "distance"] },
  "tsubute":        { skill: "Ninjutsu",      dr: "1g1", keywords: ["ninja", "petite", "distance"] },
  "sarbacane":      { skill: "Ninjutsu",      dr: "0g1", keywords: ["ninja", "moyenne", "distance"] },
  "mains nues":     { skill: "Jiujutsu",      dr: "0g1", keywords: ["petite"] }
};

// =============================================================================
// 3. TABLE DES COMPÉTENCES & TRAITS NORMALISÉS (BUG 2 RÉSOLU)
// =============================================================================
const SKILL_TRAIT_MAP = {
  "athletisme": "strength",
  "bataille": "perception",
  "calligraphie": "intelligence",
  "ceremonie du the": "void",
  "chasse": "perception",
  "comedie": "awareness",
  "commerce": "intelligence",
  "connaissance": "intelligence",
  "courtisan": "awareness",
  "couteaux": "agility",
  "defense": "reflexes",
  "discretion": "agility",
  "divination": "intelligence",
  "droit": "intelligence",
  "equitation": "agility",
  "etiquette": "awareness",
  "iaijutsu": "reflexes",
  "ingenierie": "intelligence",
  "intimidation": "willpower",
  "investigation": "perception",
  "enquete": "perception",
  "jeux": "intelligence",
  "jiujutsu": "agility",
  "kenjutsu": "agility",
  "kyujutsu": "reflexes",
  "lances": "agility",
  "medecine": "intelligence",
  "meditation": "void",
  "navigation": "intelligence",
  "ninjutsu": "agility",
  "oratoire": "awareness",
  "poisons": "intelligence",
  "representation": "awareness",
  "sincerite": "awareness",
  "sortileges": "intelligence",
  "theurgie": "intelligence",
  "tentation": "awareness",
  "tromperie": "awareness",
  "armes à chaine": "agility",
  "armes a chaine": "agility",
  "armes lourdes": "agility",
  "armes d'hast": "agility",
  "armes de paysan": "agility",
  "armes a feu": "intelligence",
  "batons": "agility",
  "eventail de guerre": "agility",
  "dressage": "awareness",
  "artisanat": "intelligence",
  "artisanat pratique": "intelligence"
};

const SKILL_TRAIT = Object.fromEntries(
  Object.entries(SKILL_TRAIT_MAP).map(([k, v]) => [sanitizeNorm(k), v])
);

// =============================================================================
// 4. LISTE DES TRADUCTIONS ET ANNOTATIONS DU CATALOGUE À IGNORER (BUG 3 RÉSOLU)
// =============================================================================
const CATALOG_TRANSLATIONS = new Set([
  "perform",
  "cha-no-yu",
  "investigation",
  "acting",
  "art dramatique / acting",
  "art dramatique",
  "heraldry",
  "war",
  "shintao & fortunes",
  "shintao",
  "shugenja",
  "games",
  "soins & herboristerie",
  "soins",
  "art du discours",
  "spellcraft",
  "peasant weapons",
  "horsemanship",
  "tessenjutsu",
  "tir a l'arc",
  "yarijutsu",
  "bojutsu",
  "tantojutsu",
  "pistage & survie",
  "legislation imperiale",
  "evaluation & negociation",
  "siege & batiment",
  "animal handling",
  "forge & armurerie",
  "stealth",
  "forgery",
  "sleight of hand",
  "deceit",
  "corruption & seduction",
  "shadowlands",
  "underworld",
  "artisan"
]);

// =============================================================================
// 5. UTILITAIRES DE CONVERSION
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
  
  return "";
}

function normalizeSkillEntry(rawName, rankVal, isSpec) {
  let cleanName = (rawName || "").trim();
  const emphases = [];

  const match = cleanName.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    const baseName = match[1].trim();
    const insideParen = match[2].trim();
    const normParen = sanitizeNorm(insideParen);

    if (!CATALOG_TRANSLATIONS.has(normParen)) {
      emphases.push(insideParen);
    }
    cleanName = baseName;
  }

  const normBase = sanitizeNorm(cleanName);

  if (normBase === "enquete") {
    cleanName = "Investigation";
  } else if (normBase === "theurgie") {
    cleanName = "Sortilèges";
  } else if (normBase === "jeux de societe") {
    cleanName = "Jeux";
  } else if (normBase === "art de la scene") {
    cleanName = "Représentation : Conte";
  } else if (normBase === "comedie") {
    cleanName = "Comédie";
  }

  let traitKey = "agility";
  const normFinal = sanitizeNorm(cleanName);

  if (SKILL_TRAIT[normFinal]) {
    traitKey = SKILL_TRAIT[normFinal];
  } else {
    for (const [k, v] of Object.entries(SKILL_TRAIT)) {
      if (normFinal.startsWith(k) || normFinal.includes(k)) {
        traitKey = v;
        break;
      }
    }
  }

  return {
    name: cleanName,
    rank: Math.max(0, Math.min(10, parseInt(rankVal, 10) || 0)),
    trait: traitKey,
    emphases: Array.from(new Set(emphases))
  };
}

function calculateCarnetRingsAndInsight(traits, voidRing, skills = []) {
  const t = traits || {};
  const rEarth = Math.min(t.stamina ?? 2, t.willpower ?? 2);
  const rWater = Math.min(t.strength ?? 2, t.perception ?? 2);
  const rFire  = Math.min(t.agility ?? 2, t.intelligence ?? 2);
  const rAir   = Math.min(t.reflexes ?? 2, t.awareness ?? 2);
  const vRing  = voidRing ?? 2;
  const ringsSum = rEarth + rWater + rFire + rAir + vRing;

  const sumSkillsRank = (skills || []).reduce((acc, s) => acc + (parseInt(s.rank, 10) || 0), 0);
  const insightPoints = (ringsSum * 10) + sumSkillsRank;
  let insightRank = 1;
  if (insightPoints >= 150) {
    insightRank = Math.min(10, 2 + Math.floor((insightPoints - 150) / 25));
  }

  return {
    earth: rEarth,
    water: rWater,
    fire: rFire,
    air: rAir,
    void: vRing,
    ringsSum,
    sumSkillsRank,
    insightPoints,
    insightRank
  };
}

function resolveCarnetArmor(armorBonusVal) {
  const armorBonus = parseInt(armorBonusVal, 10) || 0;
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

  return {
    name: armorName,
    bonus: armorBonus,
    reduction: armorReduction,
    catalogId: armorCatalogId
  };
}

function resolveCarnetWeapons(rawWeaponsList = []) {
  const weaponsMap = new Map();
  (rawWeaponsList || []).forEach(rawW => {
    if (!rawW || rawW === "Aucune") return;
    const normW = sanitizeNorm(rawW);
    const matchedKey = Object.keys(CARNET_WEAPONS_REF).find(k => normW.includes(k));

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

  return Array.from(weaponsMap.values());
}

function buildCarnetModifiers(advList = [], disadvList = []) {
  const modifiers = [];

  (advList || []).forEach(a => {
    const aNorm = sanitizeNorm(typeof a === "object" ? a.name : a);
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

  (disadvList || []).forEach(d => {
    const dNorm = sanitizeNorm(typeof d === "object" ? d.name : d);
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

  return modifiers;
}

// =============================================================================
// 6. GÉNÉRATION DU JSON CONFORME CARNET DE ROKUGAN
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

  // Résolution robuste de l'école (pas de parseInt qui renvoie NaN sur les chaînes ID)
  let currentSchoolData = null;
  let internalSchoolId = "";

  if (typeof window !== "undefined" && typeof window.getSelectedSchoolObject === "function") {
    const resolved = window.getSelectedSchoolObject();
    if (resolved && resolved.school) {
      currentSchoolData = resolved.school;
      internalSchoolId = currentSchoolData.id || "";
    }
  }

  if (!currentSchoolData && typeof resolveSchoolByRef === "function") {
    const clanKey = clanEl?.value || "crabe";
    const resolved = resolveSchoolByRef(schoolEl?.value, clanKey);
    currentSchoolData = resolved?.school || null;
    internalSchoolId = currentSchoolData?.id || schoolEl?.value || "";
  }

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

  // 3. Compétences (lecture globale directe et replis sécurisés)
  let rawSkillsList = [];
  try {
    if (typeof currentSkills !== "undefined" && Array.isArray(currentSkills)) {
      rawSkillsList = currentSkills;
    } else if (typeof window !== "undefined" && Array.isArray(window.currentSkills)) {
      rawSkillsList = window.currentSkills;
    }
  } catch (e) {
    if (typeof window !== "undefined" && Array.isArray(window.currentSkills)) {
      rawSkillsList = window.currentSkills;
    }
  }

  if (!rawSkillsList.length && typeof window !== "undefined") {
    if (Array.isArray(window.currentChar?.skills)) rawSkillsList = window.currentChar.skills;
    else if (Array.isArray(window.character?.skills)) rawSkillsList = window.character.skills;
  }

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

  const skills = Array.from(processedSkillsMap.values());

  // 4. Calcul de l'Insight et du Rang (§2.1)
  const { insightRank } = calculateCarnetRingsAndInsight(traits, voidRing, skills);

  // 5. Honneur, Gloire, Statut (une décimale max obligatoire)
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

  // 7. Armure
  const armorSel = document.getElementById("pc-armor");
  const armorBonus = parseInt(armorSel?.value, 10) || 0;
  const armorObj = resolveCarnetArmor(armorBonus);

  // 8. Armes
  const w1Name = document.getElementById("pc-weapon-1")?.value || "Katana";
  const w2Name = document.getElementById("pc-weapon-2")?.value || "Aucune";
  const rawWeaponsList = [w1Name, ...(w2Name !== "Aucune" ? [w2Name] : [])];
  const weapons = resolveCarnetWeapons(rawWeaponsList);

  // 9. Techniques libres
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

  // 10. Avantages, Désavantages et Modificateurs
  let advList = [];
  let disadvList = [];
  try {
    if (typeof advantagesList !== "undefined" && Array.isArray(advantagesList)) advList = advantagesList;
    else if (typeof window !== "undefined" && Array.isArray(window.advantagesList)) advList = window.advantagesList;

    if (typeof disadvantagesList !== "undefined" && Array.isArray(disadvantagesList)) disadvList = disadvantagesList;
    else if (typeof window !== "undefined" && Array.isArray(window.disadvantagesList)) disadvList = window.disadvantagesList;
  } catch (e) {}

  if (!advList.length && typeof window !== "undefined") {
    if (Array.isArray(window.currentChar?.advantagesList)) advList = window.currentChar.advantagesList;
    else if (Array.isArray(window.character?.advantagesList)) advList = window.character.advantagesList;
  }
  if (!disadvList.length && typeof window !== "undefined") {
    if (Array.isArray(window.currentChar?.disadvantagesList)) disadvList = window.currentChar.disadvantagesList;
    else if (Array.isArray(window.character?.disadvantagesList)) disadvList = window.character.disadvantagesList;
  }

  const modifiers = buildCarnetModifiers(advList, disadvList);

  // 11. Sorts pour Shugenja
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

  // 12. Nettoyage des libellés (un nom par ligne)
  const getCleanName = item => {
    const raw = (typeof item === "object" && item !== null) ? (item.name || "") : String(item || "");
    return raw.split("(")[0].trim();
  };
  const advText = advList.map(getCleanName).filter(Boolean).join("\n");
  const disadvText = disadvList.map(getCleanName).filter(Boolean).join("\n");
  const notesText = (document.getElementById("pc-outfit")?.value || "").trim();

  // 13. Assemblage de l'objet racine schemaVersion: 2
  const payload = {
    schemaVersion: 2,
    name: rawName,
    clan: canonClan,
    family: familyName,
    school: schoolDisplayed,
    schoolId: canonSchoolId,
    schoolRank: null,
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

  if (canonSchoolId === "isawa-shugenja") {
    payload.affinity = "fire";
  }

  return payload;
}

// =============================================================================
// 7. EXPORT CLIENT
// =============================================================================
function exportToCarnetRokugan() {
  try {
    const payload = generateCarnetJSON();

    if (!payload.name || payload.name.trim() === "") {
      alert("Veuillez saisir le nom de votre samouraï avant de générer l'export.");
      return;
    }

    const jsonString = JSON.stringify(payload, null, 2);
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

// =============================================================================
// 8. IMPORT DEPUIS LE CARNET DE ROKUGAN (schemaVersion: 1 / 2 -> FORGE)
// =============================================================================
const CARNET_CLAN_ALIASES = {
  "crabe": "crabe", "crab": "crabe", "clan du crabe": "crabe", "crab clan": "crabe",
  "grue": "grue", "crane": "grue", "clan de la grue": "grue", "crane clan": "grue",
  "dragon": "dragon", "clan du dragon": "dragon", "dragon clan": "dragon",
  "lion": "lion", "clan du lion": "lion", "lion clan": "lion",
  "mante": "mante", "mantis": "mante", "clan de la mante": "mante", "mantis clan": "mante",
  "phenix": "phenix", "phoenix": "phenix", "clan du phenix": "phenix", "phoenix clan": "phenix",
  "scorpion": "scorpion", "clan du scorpion": "scorpion", "scorpion clan": "scorpion",
  "licorne": "licorne", "unicorn": "licorne", "clan de la licorne": "licorne", "unicorn clan": "licorne",
  "imperial": "imperial", "familles imperiales": "imperial", "empereur": "imperial", "seppun": "imperial", "otomo": "imperial", "miya": "imperial",
  "araignee": "araignee", "spider": "araignee", "clan de l'araignee": "araignee", "spider clan": "araignee",
  "confrerie": "confrerie", "confrerie de shinsei": "confrerie", "brotherhood": "confrerie", "brotherhood of shinsei": "confrerie", "shinsei": "confrerie", "moine": "confrerie",
  "mineurs": "mineurs", "mineur": "mineurs", "minor": "mineurs", "clans mineurs": "mineurs",
  "faucon": "mineurs", "falcon": "mineurs", "toritaka": "mineurs",
  "tortue": "mineurs", "tortoise": "mineurs", "kasuga": "mineurs",
  "renard": "mineurs", "fox": "mineurs", "kitsune": "mineurs",
  "blaireau": "mineurs", "badger": "mineurs", "ichiryu": "mineurs",
  "libellule": "mineurs", "dragonfly": "mineurs", "tonbo": "mineurs",
  "lievre": "mineurs", "hare": "mineurs", "usagi": "mineurs",
  "moineau": "mineurs", "sparrow": "mineurs", "suzume": "mineurs",
  "mille-pattes": "mineurs", "centipede": "mineurs", "moshi": "mineurs",
  "guepe": "mineurs", "wasp": "mineurs",
  "singe": "mineurs", "monkey": "mineurs", "toku": "mineurs",
  "boeuf": "mineurs", "ox": "mineurs", "morito": "mineurs",
  "oriole": "mineurs", "oriol": "mineurs", "turi": "mineurs",
  "sanglier": "mineurs", "boar": "mineurs", "heichi": "mineurs",
  "ronin": "ronin", "sans clan": "ronin"
};

const CARNET_SKILL_TO_FORGE = {
  "investigation": "Enquête (Investigation)",
  "enquete": "Enquête (Investigation)",
  "spellcraft": "Art de la Magie (Spellcraft)",
  "sortileges": "Art de la Magie (Spellcraft)",
  "theurgie": "Art de la Magie (Spellcraft)",
  "horsemanship": "Équitation",
  "equitation": "Équitation",
  "tea ceremony": "Cérémonie du Thé (Tea Ceremony)",
  "ceremonie du the": "Cérémonie du Thé (Tea Ceremony)",
  "battle": "Art de la Guerre (Bataille)",
  "bataille": "Art de la Guerre (Bataille)",
  "war": "Art de la Guerre (Bataille)",
  "art de la guerre": "Art de la Guerre (Bataille)",
  "heavy weapons": "Armes Lourdes",
  "armes lourdes": "Armes Lourdes",
  "polearms": "Armes d'Hast",
  "armes d'hast": "Armes d'Hast",
  "armes d hast": "Armes d'Hast",
  "spears": "Lances",
  "lances": "Lances",
  "yarijutsu": "Lances",
  "staves": "Bâtons",
  "batons": "Bâtons",
  "bojutsu": "Bâtons",
  "knives": "Couteaux",
  "couteaux": "Couteaux",
  "tantojutsu": "Couteaux",
  "peasant weapons": "Armes de Paysan",
  "armes de paysan": "Armes de Paysan",
  "chain weapons": "Armes à Chaîne",
  "armes a chaine": "Armes à Chaîne",
  "war fan": "Éventail de Guerre",
  "eventail de guerre": "Éventail de Guerre",
  "tessenjutsu": "Éventail de Guerre",
  "firearms": "Armes à Feu",
  "armes a feu": "Armes à Feu",
  "courtier": "Courtisan",
  "courtisan": "Courtisan",
  "sincerity": "Sincérité",
  "sincerite": "Sincérité",
  "acting": "Comédie (Acting)",
  "comedie": "Comédie (Acting)",
  "perform": "Art de la Scène (Perform)",
  "representation": "Art de la Scène (Perform)",
  "representation : conte": "Art de la Scène (Perform)",
  "athletics": "Athlétisme",
  "athletisme": "Athlétisme",
  "hunting": "Chasse",
  "chasse": "Chasse",
  "stealth": "Discrétion",
  "discretion": "Discrétion",
  "sleight of hand": "Passe-Passe",
  "passe-passe": "Passe-Passe",
  "forgery": "Contrefaçon",
  "contrefacon": "Contrefaçon",
  "deceit": "Tromperie",
  "tromperie": "Tromperie",
  "temptation": "Tentation",
  "tentation": "Tentation",
  "animal handling": "Dressage & Élevage",
  "dressage": "Dressage & Élevage",
  "medicine": "Médecine",
  "medecine": "Médecine",
  "soins": "Médecine",
  "divination": "Divination",
  "games": "Jeux (Games)",
  "jeux": "Jeux (Games)",
  "jeux de societe": "Jeux (Games)",
  "calligraphy": "Calligraphie (Calligraphy)",
  "calligraphie": "Calligraphie (Calligraphy)",
  "artisan": "Artisanat (Artisan)",
  "artisanat": "Artisanat (Artisan)",
  "craft": "Artisanat Pratique (Craft)",
  "artisanat pratique": "Artisanat Pratique (Craft)",
  "defense": "Défense",
  "etiquette": "Étiquette",
  "meditation": "Méditation",
  "sailing": "Navigation",
  "navigation": "Navigation",
  "engineering": "Ingénierie",
  "ingenierie": "Ingénierie",
  "commerce": "Commerce",
  "intimidation": "Intimidation",
  "kenjutsu": "Kenjutsu",
  "kyujutsu": "Kyujutsu",
  "tir a l'arc": "Kyujutsu",
  "iaijutsu": "Iaijutsu",
  "jiujutsu": "Jiujutsu",
  "ninjutsu": "Ninjutsu",
  "poison": "Poisons",
  "poisons": "Poisons",
  "lore: theology": "Connaissance : Théologie",
  "lore : theology": "Connaissance : Théologie",
  "connaissance : theologie": "Connaissance : Théologie",
  "lore: history": "Connaissance : Histoire",
  "lore : history": "Connaissance : Histoire",
  "connaissance : histoire": "Connaissance : Histoire",
  "lore: heraldry": "Connaissance : Héraldique",
  "lore : heraldry": "Connaissance : Héraldique",
  "connaissance : heraldique": "Connaissance : Héraldique",
  "lore: law": "Connaissance : Droit",
  "lore : law": "Connaissance : Droit",
  "droit": "Connaissance : Droit",
  "connaissance : droit": "Connaissance : Droit",
  "lore: bushido": "Connaissance : Bushido",
  "lore : bushido": "Connaissance : Bushido",
  "connaissance : bushido": "Connaissance : Bushido",
  "lore: shadowlands": "Connaissance : Outremonde",
  "lore : shadowlands": "Connaissance : Outremonde",
  "connaissance : outremonde": "Connaissance : Outremonde",
  "lore: war": "Connaissance : Art de la Guerre",
  "lore : war": "Connaissance : Art de la Guerre",
  "connaissance : art de la guerre": "Connaissance : Art de la Guerre",
  "lore: elements": "Connaissance : Éléments",
  "connaissance : elements": "Connaissance : Éléments",
  "lore: shugenja": "Connaissance : Esprits & Magie",
  "lore: spirit realms": "Connaissance : Esprits & Magie"
};

const CARNET_ELEMENT_TO_FORGE = {
  "earth": "terre", "terre": "terre",
  "water": "eau", "eau": "eau",
  "fire": "feu", "feu": "feu",
  "air": "air",
  "void": "vide", "vide": "vide"
};

function isCarnetRokuganPayload(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return false;
  if (raw.schemaVersion !== undefined && raw.schemaVersion !== null) return true;
  if (raw.voidRing !== undefined || raw.voidPoints !== undefined || raw.schoolId !== undefined) return true;
  if (raw.traits && typeof raw.traits === "object") {
    if (
      raw.traits.stamina !== undefined ||
      raw.traits.willpower !== undefined ||
      raw.traits.reflexes !== undefined ||
      raw.traits.agility !== undefined ||
      raw.traits.intelligence !== undefined
    ) {
      return true;
    }
  }
  if (Array.isArray(raw.weapons) || typeof raw.advantages === "string") return true;
  return false;
}

function extractCarnetCandidates(parsed) {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Le fichier JSON ne contient pas d'objet personnage valide.");
  }
  if (Array.isArray(parsed)) {
    const valid = parsed.filter(item => item && typeof item === "object" && !Array.isArray(item));
    if (!valid.length) throw new Error("La liste JSON ne contient aucun personnage.");
    return valid;
  }
  if (Array.isArray(parsed.characters)) {
    const valid = parsed.characters.filter(item => item && typeof item === "object");
    if (!valid.length) throw new Error("Le champ 'characters' est vide.");
    return valid;
  }
  if (parsed.character && typeof parsed.character === "object") {
    return [parsed.character];
  }
  return [parsed];
}

function resolveForgeClanKey(rawClan, clansData = {}, fallbackClanKey = "", includeSecrets = false) {
  const isClanVisible = (k) => Boolean(clansData[k]) && (includeSecrets || !clansData[k]?.gmOnly);
  const norm = sanitizeNorm(rawClan);
  if (norm && isClanVisible(norm)) return norm;
  if (norm && CARNET_CLAN_ALIASES[norm]) {
    const mapped = CARNET_CLAN_ALIASES[norm];
    if (isClanVisible(mapped)) return mapped;
  }
  if (norm) {
    for (const [alias, target] of Object.entries(CARNET_CLAN_ALIASES)) {
      if (norm.includes(alias) && isClanVisible(target)) return target;
    }
    for (const key of Object.keys(clansData)) {
      if (isClanVisible(key) && sanitizeNorm(clansData[key]?.name).includes(norm)) return key;
    }
  }
  if (fallbackClanKey && isClanVisible(fallbackClanKey)) return fallbackClanKey;
  if (isClanVisible("crabe")) return "crabe";
  return Object.keys(clansData).find(k => isClanVisible(k)) || "crabe";
}

function resolveForgeSchoolMatch(raw, clansData = {}, includeSecrets = false) {
  const rawSchoolId = String(raw?.schoolId || raw?.school || "").trim();
  const rawSchoolName = String(raw?.school || raw?.schoolName || "").trim();
  const normId = sanitizeNorm(rawSchoolId);
  const normName = sanitizeNorm(rawSchoolName)
    .replace(/^(ecole\s+de\s+|ecole\s+d'|ecole\s+des\s+|ecole\s+)/, "")
    .replace(/\(.*?\)/g, "")
    .trim();

  // Identifiants internes qui pointent vers un canonSchoolId Carnet
  const reverseForgeIds = [];
  if (rawSchoolId) {
    for (const [alias, canonId] of Object.entries(CARNET_SCHOOL_CATALOG)) {
      if (canonId === rawSchoolId || sanitizeNorm(canonId) === normId) {
        reverseForgeIds.push(sanitizeNorm(alias));
      }
    }
  }

  const normalizedTokens = normName ? normName.split(/\s+/).filter(Boolean).sort().join(" ") : "";
  const candidates = [];

  for (const clanKey of Object.keys(clansData)) {
    const clan = clansData[clanKey];
    if (!clan || !Array.isArray(clan.schools)) continue;
    const isClanSecret = !!clan.gmOnly;

    clan.schools.forEach(s => {
      const isSecret = isClanSecret || !!s.gmOnly;
      const sIdNorm = sanitizeNorm(s.id);
      const sNameRaw = String(s.name || "");
      const sNameClean = sanitizeNorm(sNameRaw.replace(/\(.*?\)/g, "").trim())
        .replace(/^(ecole\s+de\s+|ecole\s+d'|ecole\s+des\s+|ecole\s+)/, "")
        .trim();
      const sTokens = sNameClean ? sNameClean.split(/\s+/).filter(Boolean).sort().join(" ") : "";
      const mappedCarnetId = resolveSchoolIdFromText(sNameRaw, s.id);

      let score = 0;
      if (rawSchoolId && (s.id === rawSchoolId || sIdNorm === normId)) score = 100;
      else if (rawSchoolId && mappedCarnetId && mappedCarnetId === rawSchoolId) score = 95;
      else if (reverseForgeIds.includes(sIdNorm) || reverseForgeIds.includes(sNameClean)) score = 90;
      else if (normName && sNameClean === normName) score = 85;
      else if (normalizedTokens && sTokens && normalizedTokens === sTokens) score = 80;
      else if (normName && sNameClean && (sNameClean.includes(normName) || normName.includes(sNameClean))) score = 60;

      if (score > 0) {
        candidates.push({ clanKey, clan, school: s, isSecret, score });
      }
    });
  }

  candidates.sort((a, b) => b.score - a.score);
  if (!candidates.length) return { match: null, lockedMatch: null };

  const visible = candidates.find(c => includeSecrets || !c.isSecret);
  if (visible) return { match: visible, lockedMatch: null };
  return { match: null, lockedMatch: candidates[0] };
}

function resolveForgeSkillName(rawSkillName, catalogSkills = []) {
  const input = String(rawSkillName || "").trim();
  if (!input) return "";

  const base = input.split("(")[0].trim();
  const normFull = sanitizeNorm(input);
  const normBase = sanitizeNorm(base);

  const aliasTarget = CARNET_SKILL_TO_FORGE[normFull] || CARNET_SKILL_TO_FORGE[normBase];
  if (aliasTarget) {
    const foundAlias = catalogSkills.find(c => sanitizeNorm(c.name) === sanitizeNorm(aliasTarget));
    return foundAlias ? foundAlias.name : aliasTarget;
  }

  for (const cat of catalogSkills) {
    const cName = String(cat.name || "");
    const cNorm = sanitizeNorm(cName);
    const cBase = sanitizeNorm(cName.split("(")[0].trim());
    if (cNorm === normFull || cBase === normBase) return cName;
    const parenMatch = cName.match(/\(([^)]+)\)/);
    if (parenMatch && sanitizeNorm(parenMatch[1]) === normBase) return cName;
  }

  // Capitalisation propre par défaut si compétence personnalisée / étendue
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function resolveAdvDisadvItemsFromCarnet(rawVal, isDisadv = false, advCatalog = null) {
  const cat = advCatalog || (typeof window !== "undefined" ? window.AVANTAGES_DESAVANTAGES : null) || {};
  const list = isDisadv ? (cat.desavantages || []) : (cat.avantages || []);

  let items = [];
  if (Array.isArray(rawVal)) {
    items = rawVal.map(item => (typeof item === "object" && item !== null ? item.name || item.id : String(item || ""))).filter(Boolean);
  } else if (typeof rawVal === "string") {
    items = rawVal
      .split(/\r?\n|;/)
      .map(s => s.trim())
      .filter(Boolean);
  }

  return items.map(rawLabel => {
    const cleaned = rawLabel.replace(/\s*\(\s*[+-]?\d+\s*XP\s*\)\s*$/i, "").trim();
    const normQuery = sanitizeNorm(cleaned);
    const normQueryBase = sanitizeNorm(cleaned.split("(")[0].trim());

    const found = list.find(entry => {
      const eId = sanitizeNorm(entry.id);
      const eName = sanitizeNorm(entry.name);
      const eBase = sanitizeNorm(String(entry.name || "").split("(")[0].trim());
      if (eId === normQuery || eName === normQuery || eBase === normQueryBase) return true;
      const parenMatch = String(entry.name || "").match(/\(([^)]+)\)/);
      if (parenMatch && sanitizeNorm(parenMatch[1]) === normQueryBase) return true;
      return normQueryBase.length >= 4 && (eName.includes(normQueryBase) || eBase.includes(normQueryBase));
    });

    if (found) {
      if (isDisadv) {
        const g = parseInt(found.gain ?? found.cost, 10) || 0;
        return {
          id: found.id || "",
          name: found.name,
          baseGain: g,
          gain: g,
          impact: found.impact || "",
          desc: found.desc || "",
          rule: found.rule || ""
        };
      }
      const c = parseInt(found.cost, 10) || 0;
      return {
        id: found.id || "",
        name: found.name,
        baseCost: c,
        cost: c,
        impact: found.impact || "",
        desc: found.desc || "",
        rule: found.rule || ""
      };
    }

    return isDisadv
      ? { id: `import_${sanitizeNorm(cleaned)}`, name: cleaned, baseGain: 0, gain: 0, impact: "", desc: "Importé depuis Le Carnet de Rokugan.", rule: "" }
      : { id: `import_${sanitizeNorm(cleaned)}`, name: cleaned, baseCost: 0, cost: 0, impact: "", desc: "Importé depuis Le Carnet de Rokugan.", rule: "" };
  });
}

function resolveForgeEquipmentFromCarnet(rawArmor, rawWeapons, equipData = null) {
  const eq = equipData || (typeof window !== "undefined" ? window.EQUIPEMENT_DATA : null) || { armures: [], armes: [] };

  let armorVal = "0";
  if (rawArmor !== undefined && rawArmor !== null) {
    if (typeof rawArmor === "string" && /^\d+$/.test(rawArmor.trim())) {
      armorVal = rawArmor.trim();
    } else {
      const bonus = typeof rawArmor === "object" ? (rawArmor.tnBonus ?? rawArmor.bonus) : undefined;
      const armorNameNorm = sanitizeNorm(typeof rawArmor === "object" ? rawArmor.name : String(rawArmor));
      if (bonus !== undefined && bonus !== null && !isNaN(parseInt(bonus, 10))) {
        armorVal = String(parseInt(bonus, 10));
      } else if (armorNameNorm.includes("lourde") || armorNameNorm.includes("heavy")) {
        armorVal = "10";
      } else if (armorNameNorm.includes("legere") || armorNameNorm.includes("light")) {
        armorVal = "5";
      } else if (armorNameNorm.includes("cavalerie") || armorNameNorm.includes("riding") || armorNameNorm.includes("tatami")) {
        armorVal = "4";
      } else if (armorNameNorm.includes("ashigaru") || armorNameNorm.includes("ceremon")) {
        armorVal = "3";
      } else if (armorNameNorm.includes("kaiu") || armorNameNorm.includes("tetsu")) {
        armorVal = "13";
      }
    }
  }

  const matchWeaponName = (rawW) => {
    const wText = typeof rawW === "object" && rawW !== null ? (rawW.name || "") : String(rawW || "");
    const wNorm = sanitizeNorm(wText);
    if (!wNorm || wNorm === "aucune") return "";
    const exact = (eq.armes || []).find(a => sanitizeNorm(a.name) === wNorm || sanitizeNorm(a.name.split("(")[0].trim()) === wNorm);
    if (exact) return exact.name;
    const partial = (eq.armes || []).find(a => wNorm.includes(sanitizeNorm(a.name.split("(")[0].trim())) || sanitizeNorm(a.name).includes(wNorm));
    return partial ? partial.name : "";
  };

  const weaponsArr = Array.isArray(rawWeapons) ? rawWeapons : [];
  const weapon1 = matchWeaponName(weaponsArr[0]) || "Katana";
  const weapon2 = matchWeaponName(weaponsArr[1]) || "Aucune";

  return { armor: armorVal, weapon1, weapon2 };
}

function resolveImportedSpellsList(rawSpells, spellsCatalog = [], includeSecrets = false) {
  if (!Array.isArray(rawSpells) || !rawSpells.length) return [];
  const out = [];
  rawSpells.forEach(sp => {
    const rawName = typeof sp === "string" ? sp : String(sp?.name || "");
    const rawId = typeof sp === "object" && sp !== null ? String(sp.id || "") : "";
    if (!rawName && !rawId) return;

    const normN = sanitizeNorm(rawName.split("(")[0].trim());
    const found = spellsCatalog.find(entry => {
      if (!includeSecrets && (entry.gmOnly || sanitizeNorm(entry.element) === "maho")) return false;
      if (rawId && entry.id === rawId) return true;
      const eName = sanitizeNorm(String(entry.name || entry.nom || "").split("(")[0].trim());
      return normN && eName === normN;
    });

    if (found) {
      if (!out.some(x => x.id === found.id)) {
        out.push({
          id: found.id,
          name: found.name || found.nom,
          element: found.isKiho ? "kiho" : (found.element || "Universel"),
          ring: found.ring || found.element || "Vide",
          mastery: Number(found.mastery) || 0,
          range: found.range || "Personnelle",
          area: found.area || "Spéciale",
          duration: found.duration || "Instantanée",
          raises: found.raises || "Aucune",
          desc: found.desc || "",
          isKiho: !!found.isKiho,
          xpCost: Number(sp?.xpCost) || (found.isKiho ? Number(found.mastery) || 1 : 0)
        });
      }
    } else if (rawName) {
      const elemNorm = CARNET_ELEMENT_TO_FORGE[sanitizeNorm(sp?.element)] || "Universel";
      out.push({
        id: rawId || `import_${sanitizeNorm(rawName)}`,
        name: rawName,
        element: elemNorm,
        ring: elemNorm,
        mastery: Number(sp?.mastery) || 1,
        range: sp?.range || "Personnelle",
        area: sp?.area || "Spéciale",
        duration: sp?.duration || "Instantanée",
        raises: sp?.raises || "Aucune",
        desc: sp?.effect || sp?.desc || "Sort importé.",
        isKiho: elemNorm === "kiho",
        xpCost: 0
      });
    }
  });
  return out;
}

function convertCarnetToForgeData(rawInput, options = {}) {
  if (!rawInput || typeof rawInput !== "object" || Array.isArray(rawInput)) {
    throw new Error("Objet personnage JSON invalide.");
  }

  const clansData = options.clansData || (typeof window !== "undefined" ? window.CLANS_DATA : null) || {};
  const catalogSkills = options.skillsCatalog || (typeof window !== "undefined" ? window.COMPETENCES_DATA : null) || [];
  const advCatalog = options.advCatalog || (typeof window !== "undefined" ? window.AVANTAGES_DESAVANTAGES : null) || {};
  const equipData = options.equipData || (typeof window !== "undefined" ? window.EQUIPEMENT_DATA : null) || { armures: [], armes: [] };
  const spellsCatalog = options.spellsCatalog || (typeof window !== "undefined" ? (window.SORTS_DATA || []) : []);
  const includeSecrets = Boolean(options.includeSecrets);
  const warnings = [];

  // Format natif de la Forge
  if (!isCarnetRokuganPayload(rawInput)) {
    const forgeClone = Object.assign({}, rawInput);
    const clanObj = clansData[forgeClone.clan];
    const famObj = clanObj?.families?.[parseInt(forgeClone.family, 10) || 0];
    const schObj = clanObj?.schools?.find(s => s.id === forgeClone.school);
    return {
      forgeData: forgeClone,
      warnings,
      summary: {
        sourceFormat: "forge",
        name: forgeClone.name || "Samouraï",
        clanLabel: clanObj?.name || forgeClone.clan || "Crabe",
        familyLabel: famObj?.name || "",
        schoolLabel: schObj?.name || forgeClone.school || "",
        insightRank: Number(forgeClone.insightRank) || 1,
        xpTotal: parseInt(forgeClone.baseXP, 10) || 40,
        skillsCount: Array.isArray(forgeClone.skills) ? forgeClone.skills.length : 0,
        advantagesCount: Array.isArray(forgeClone.advantages) ? forgeClone.advantages.length : 0,
        spellsCount: Array.isArray(forgeClone.spells) ? forgeClone.spells.length : 0,
        traits: forgeClone.traits || {}
      }
    };
  }

  // Format Le Carnet de Rokugan (schemaVersion 1 / 2)
  const { match: schoolMatch, lockedMatch } = resolveForgeSchoolMatch(rawInput, clansData, includeSecrets);
  if (lockedMatch && !schoolMatch) {
    warnings.push(`École ou clan secret du MJ (« ${lockedMatch.school?.name || rawInput.school} ») verrouillé : repli sur une lignée publique.`);
  }

  const clanKey = resolveForgeClanKey(rawInput.clan, clansData, schoolMatch?.clanKey, includeSecrets);
  if (!includeSecrets && !lockedMatch && rawInput.clan) {
    const rawAnyClan = resolveForgeClanKey(rawInput.clan, clansData, "", true);
    if (clansData[rawAnyClan]?.gmOnly) {
      warnings.push(`Clan secret du MJ (« ${clansData[rawAnyClan].name} ») verrouillé : repli sur une faction publique.`);
    }
  }
  const clanObj = clansData[clanKey] || {};
  const visibleFamilies = (clanObj.families || []).map((f, idx) => ({ f, idx })).filter(x => includeSecrets || !x.f?.gmOnly);

  let familyIdx = "0";
  let familyName = "";
  const rawFamNorm = sanitizeNorm(rawInput.family);
  const targetSchoolFamNorm = sanitizeNorm(schoolMatch?.school?.family);

  if (rawFamNorm && visibleFamilies.length) {
    const byName = visibleFamilies.find(x => sanitizeNorm(x.f.name) === rawFamNorm || rawFamNorm.includes(sanitizeNorm(x.f.name)));
    if (byName) {
      familyIdx = String(byName.idx);
      familyName = byName.f.name;
    }
  }
  if (!familyName && targetSchoolFamNorm && visibleFamilies.length) {
    const bySchoolFam = visibleFamilies.find(x => sanitizeNorm(x.f.name) === targetSchoolFamNorm);
    if (bySchoolFam) {
      familyIdx = String(bySchoolFam.idx);
      familyName = bySchoolFam.f.name;
    }
  }
  if (!familyName && visibleFamilies[0]) {
    familyIdx = String(visibleFamilies[0].idx);
    familyName = visibleFamilies[0].f.name;
  }

  const schoolObj = schoolMatch?.school || clanObj.schools?.find(s => includeSecrets || !s.gmOnly) || null;
  const schoolId = schoolObj?.id || "";

  // Traits (English Carnet keys -> Forge short keys)
  const rt = rawInput.traits && typeof rawInput.traits === "object" ? rawInput.traits : {};
  const clampTrait = (val) => Math.max(1, Math.min(10, parseInt(val, 10) || 2));
  const traits = {
    sta: clampTrait(rt.stamina ?? rt.sta ?? rawInput.stamina ?? 2),
    wil: clampTrait(rt.willpower ?? rt.wil ?? rawInput.willpower ?? 2),
    str: clampTrait(rt.strength ?? rt.str ?? rawInput.strength ?? 2),
    per: clampTrait(rt.perception ?? rt.per ?? rawInput.perception ?? 2),
    ref: clampTrait(rt.reflexes ?? rt.ref ?? rawInput.reflexes ?? 2),
    awa: clampTrait(rt.awareness ?? rt.awa ?? rawInput.awareness ?? 2),
    agi: clampTrait(rt.agility ?? rt.agi ?? rawInput.agility ?? 2),
    int: clampTrait(rt.intelligence ?? rt.int ?? rawInput.intelligence ?? 2),
    voi: clampTrait(rawInput.voidRing ?? rawInput.voidPoints ?? rawInput.void ?? rt.void ?? rt.voi ?? 2)
  };

  // Avantages & Désavantages
  const advantages = resolveAdvDisadvItemsFromCarnet(rawInput.advantages, false, advCatalog);
  const disadvantages = resolveAdvDisadvItemsFromCarnet(rawInput.disadvantages, true, advCatalog);

  // Si l'école appartient à un autre clan, activer automatiquement 'Études dans une Autre École' si absent
  if (schoolMatch && schoolMatch.clanKey !== clanKey && schoolObj) {
    const existingDiff = advantages.find(a => sanitizeNorm(a.name).includes("autre ecole") || sanitizeNorm(a.name).includes("different school"));
    if (existingDiff) {
      existingDiff.differentSchoolId = schoolObj.id;
      existingDiff.differentSchoolName = `${schoolObj.name} (${schoolMatch.clan.name})`;
    } else {
      warnings.push(`L'école « ${schoolObj.name} » appartient au ${schoolMatch.clan.name} (clan choisi : ${clanObj.name || clanKey}).`);
    }
  }

  // Compétences : fusion fidèle avec les emplacements d'école
  const rawSkills = Array.isArray(rawInput.skills) ? rawInput.skills : [];
  const normalizedImportedSkills = rawSkills
    .map(s => {
      if (!s || !s.name) return null;
      const emphases = Array.isArray(s.emphases) ? s.emphases : (Array.isArray(s.emphasis) ? s.emphasis : (s.emphasis ? [s.emphasis] : []));
      return {
        name: resolveForgeSkillName(s.name, catalogSkills),
        rank: Math.max(0, Math.min(10, parseInt(s.rank, 10) || 0)),
        spec: Boolean(s.spec || emphases.some(e => String(e || "").trim() !== "")),
        consumed: false
      };
    })
    .filter(s => s && s.name && s.rank > 0);

  const mergedSkills = [];
  if (schoolObj && Array.isArray(schoolObj.skills)) {
    schoolObj.skills.forEach(rawSchoolSkill => {
      let rawSlotName = String(rawSchoolSkill || "").trim();
      let baseRank = 1;
      const rankTwoMatch = rawSlotName.match(/^(.*?)\s+2(\s*\(.*\))?$/);
      if (rankTwoMatch && !rawSlotName.toLowerCase().includes("compétence") && !rawSlotName.toLowerCase().includes("any")) {
        rawSlotName = (rankTwoMatch[1].trim() + (rankTwoMatch[2] ? " " + rankTwoMatch[2].trim() : "")).trim();
        baseRank = 2;
      } else if (/deux rangs|two ranks/i.test(rawSlotName)) {
        baseRank = 2;
      }

      const sLower = rawSlotName.toLowerCase();
      const isChoice = sLower.includes("compétence") || sLower.includes("choix") || sLower.includes("any");
      let filterType = null;
      if (sLower.includes("bugei")) filterType = "Bugei";
      else if (sLower.includes("noble") || sLower.includes("haute") || sLower.includes("high")) filterType = "Noble";
      else if (sLower.includes("marchande") || sLower.includes("merchant")) filterType = "Marchande";
      else if (sLower.includes("artisan")) filterType = "Noble";

      if (!isChoice) {
        const slotNorm = sanitizeNorm(rawSlotName.split("(")[0].trim());
        const matchedImp = normalizedImportedSkills.find(imp => {
          if (imp.consumed) return false;
          const impNorm = sanitizeNorm(imp.name.split("(")[0].trim());
          return impNorm === slotNorm || impNorm.includes(slotNorm) || slotNorm.includes(impNorm);
        });
        if (matchedImp) {
          matchedImp.consumed = true;
          mergedSkills.push({
            name: rawSlotName,
            rank: Math.max(baseRank, matchedImp.rank),
            baseRank,
            spec: matchedImp.spec,
            isSchool: true,
            isChoice: false,
            chosen: false,
            choiceFilter: null,
            originalPlaceholder: null
          });
        } else {
          mergedSkills.push({
            name: rawSlotName,
            rank: baseRank,
            baseRank,
            spec: false,
            isSchool: true,
            isChoice: false,
            chosen: false,
            choiceFilter: null,
            originalPlaceholder: null
          });
        }
      } else {
        // Chercher plus tard un skill non consommé compatible pour remplir le choix
        mergedSkills.push({
          name: rawSlotName,
          rank: baseRank,
          baseRank,
          spec: false,
          isSchool: true,
          isChoice: true,
          chosen: false,
          choiceFilter: filterType,
          originalPlaceholder: rawSlotName
        });
      }
    });

    // Remplissage des créneaux [Choix] avec les compétences importées restantes compatibles
    mergedSkills.forEach(slot => {
      if (!slot.isChoice || slot.chosen) return;
      const candidate = normalizedImportedSkills.find(imp => {
        if (imp.consumed) return false;
        if (mergedSkills.some(existing => !existing.isChoice && sanitizeNorm(existing.name.split("(")[0]) === sanitizeNorm(imp.name.split("(")[0]))) {
          return false;
        }
        if (!slot.choiceFilter) return true;
        const cat = catalogSkills.find(c => sanitizeNorm(c.name) === sanitizeNorm(imp.name));
        if (!cat) return true;
        return sanitizeNorm(cat.type) === sanitizeNorm(slot.choiceFilter);
      });
      if (candidate) {
        candidate.consumed = true;
        slot.name = candidate.name;
        slot.rank = Math.max(slot.baseRank, candidate.rank);
        slot.spec = candidate.spec;
        slot.chosen = true;
      }
    });
  }

  normalizedImportedSkills.forEach(imp => {
    if (imp.consumed) return;
    mergedSkills.push({
      name: imp.name,
      rank: imp.rank,
      baseRank: 0,
      spec: imp.spec,
      isSchool: false,
      isChoice: false,
      chosen: false,
      choiceFilter: null,
      originalPlaceholder: null
    });
  });

  // Sorts, Affinité, Équipement, Notes
  const spells = resolveImportedSpellsList(rawInput.spells, spellsCatalog, includeSecrets);
  const affinity = CARNET_ELEMENT_TO_FORGE[sanitizeNorm(rawInput.affinity)] || "aucune";
  const deficiency = CARNET_ELEMENT_TO_FORGE[sanitizeNorm(rawInput.deficiency)] || "aucune";
  const gear = resolveForgeEquipmentFromCarnet(rawInput.armor, rawInput.weapons, equipData);
  const xpTotal = parseInt(rawInput.xp?.total ?? rawInput.baseXP ?? 40, 10) || 40;
  const outfitVal = String(rawInput.outfit || rawInput.notes || schoolObj?.outfit || "").trim();

  const forgeData = {
    id: `samurai_${Date.now()}`,
    updatedAt: new Date().toISOString(),
    name: String(rawInput.name || "Samouraï importé").trim().substring(0, 80),
    baseXP: String(Math.max(40, xpTotal)),
    clan: clanKey,
    family: familyIdx,
    school: schoolId,
    traits,
    skills: mergedSkills,
    advantages,
    disadvantages,
    spells,
    katas: Array.isArray(rawInput.katas) ? rawInput.katas : [],
    tattoos: Array.isArray(rawInput.tattoos) ? rawInput.tattoos : [],
    affinity,
    deficiency,
    armor: gear.armor,
    weapon1: gear.weapon1,
    weapon2: gear.weapon2,
    outfit: outfitVal,
    backgroundStory: typeof rawInput.backgroundStory === "string"
      ? rawInput.backgroundStory
      : (rawInput.notes && rawInput.outfit ? String(rawInput.notes) : "")
  };

  return {
    forgeData,
    warnings,
    summary: {
      sourceFormat: "carnet-v2",
      name: forgeData.name,
      clanLabel: clanObj?.name || clanKey,
      familyLabel: familyName,
      schoolLabel: schoolObj?.name || rawInput.school || schoolId || "—",
      insightRank: Number(rawInput.insightRank) || 1,
      xpTotal: Math.max(40, xpTotal),
      skillsCount: mergedSkills.filter(s => !s.isChoice || s.chosen).length,
      advantagesCount: advantages.length + disadvantages.length,
      spellsCount: spells.length,
      traits
    }
  };
}

// Exposition globale (Navigateur & Node.js)
if (typeof window !== "undefined") {
  window.exportToCarnetRokugan = exportToCarnetRokugan;
  window.generateCarnetJSON = generateCarnetJSON;
  window.isCarnetRokuganPayload = isCarnetRokuganPayload;
  window.extractCarnetCandidates = extractCarnetCandidates;
  window.resolveForgeClanKey = resolveForgeClanKey;
  window.resolveForgeSchoolMatch = resolveForgeSchoolMatch;
  window.resolveForgeSkillName = resolveForgeSkillName;
  window.convertCarnetToForgeData = convertCarnetToForgeData;
  window.sanitizeNorm = sanitizeNorm;
  window.resolveCanonClan = resolveCanonClan;
  window.resolveSchoolIdFromText = resolveSchoolIdFromText;
  window.normalizeSkillEntry = normalizeSkillEntry;
  window.calculateCarnetRingsAndInsight = calculateCarnetRingsAndInsight;
  window.resolveCarnetArmor = resolveCarnetArmor;
  window.resolveCarnetWeapons = resolveCarnetWeapons;
  window.buildCarnetModifiers = buildCarnetModifiers;
  window.CARNET_SCHOOL_CATALOG = CARNET_SCHOOL_CATALOG;
  window.CARNET_WEAPONS_REF = CARNET_WEAPONS_REF;
  window.SKILL_TRAIT_MAP = SKILL_TRAIT_MAP;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    sanitizeNorm,
    resolveCanonClan,
    resolveSchoolIdFromText,
    normalizeSkillEntry,
    calculateCarnetRingsAndInsight,
    resolveCarnetArmor,
    resolveCarnetWeapons,
    buildCarnetModifiers,
    generateCarnetJSON,
    exportToCarnetRokugan,
    isCarnetRokuganPayload,
    extractCarnetCandidates,
    resolveForgeClanKey,
    resolveForgeSchoolMatch,
    resolveForgeSkillName,
    convertCarnetToForgeData,
    CARNET_SCHOOL_CATALOG,
    CARNET_WEAPONS_REF,
    SKILL_TRAIT_MAP,
    SKILL_TRAIT,
    CATALOG_TRANSLATIONS
  };
}
