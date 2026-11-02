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
  "yumi":       { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "grande"], bowStrength: 3 },
  "dai-kyu":    { skill: "Kyujutsu",      dr: "2g2", keywords: ["arc", "distance", "grande"], bowStrength: 4 }
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
  "armes lourdes": "agility",
  "armes d'hast": "agility",
  "armes de paysan": "agility",
  "eventail de guerre": "agility",
  "dressage": "awareness",
  "artisanat": "intelligence"
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

  // 3. Calcul de l'Insight et du Rang (§2.1)
  const rEarth = Math.min(traits.stamina, traits.willpower);
  const rWater = Math.min(traits.strength, traits.perception);
  const rFire  = Math.min(traits.agility, traits.intelligence);
  const rAir   = Math.min(traits.reflexes, traits.awareness);
  const ringsSum = rEarth + rWater + rFire + rAir + voidRing;

  // 4. Compétences (lecture globale directe et replis sécurisés)
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
  const sumSkillsRank = skills.reduce((acc, s) => acc + s.rank, 0);

  const insightPoints = (ringsSum * 10) + sumSkillsRank;
  let insightRank = 1;
  if (insightPoints >= 150) {
    insightRank = Math.min(10, 2 + Math.floor((insightPoints - 150) / 25));
  }

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

  // 8. Armes
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

  const modifiers = [];

  advList.forEach(a => {
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

  disadvList.forEach(d => {
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

// Exposition globale
if (typeof window !== "undefined") {
  window.exportToCarnetRokugan = exportToCarnetRokugan;
  window.generateCarnetJSON = generateCarnetJSON;
}
