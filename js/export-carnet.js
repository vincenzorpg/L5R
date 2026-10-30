/**
 * js/export-carnet.js — Export officiel pour Le Carnet de Rokugan (schemaVersion: 2)
 * Compatible Carnet v2.18.0+ (https://nelsio.github.io/carnet-l5r/)
 */

// =============================================================================
// 1. TABLE DE CORRESPONDANCE DES IDENTIFIANTS D'ÉCOLES (schoolId)
// =============================================================================
const CARNET_SCHOOL_IDS = {
  // CLAN DU CRABE
  "bushi hida": "hida-bushi",
  "hida bushi": "hida-bushi",
  "eclaireur hiruma": "hiruma-bushi",
  "hiruma bushi": "hiruma-bushi",
  "shugenja kuni": "kuni-shugenja",
  "kuni shugenja": "kuni-shugenja",
  "courtisan yasuki": "yasuki-courtisan",
  "yasuki courtisan": "yasuki-courtisan",
  "ingenieur kaiu": "kaiu-ingenieur",
  "kaiu ingenieur": "kaiu-ingenieur",

  // CLAN DE LA GRUE
  "duelliste kakita": "kakita-bushi",
  "kakita bushi": "kakita-bushi",
  "courtisan doji": "doji-courtisan",
  "doji courtisan": "doji-courtisan",
  "guerrier de fer daidoji": "daidoji-bushi",
  "daidoji bushi": "daidoji-bushi",
  "shugenja asahina": "asahina-shugenja",
  "asahina shugenja": "asahina-shugenja",

  // CLAN DU DRAGON
  "bushi mirumoto": "mirumoto-bushi",
  "mirumoto bushi": "mirumoto-bushi",
  "moine tatoueur togashi": "togashi-moine",
  "togashi moine": "togashi-moine",
  "ise zumi togashi": "togashi-moine",
  "magistrat kitsuki": "kitsuki-courtisan",
  "kitsuki courtisan": "kitsuki-courtisan",
  "shugenja tamori": "tamori-shugenja",
  "tamori shugenja": "tamori-shugenja",

  // CLAN DU LION
  "bushi akodo": "akodo-bushi",
  "akodo bushi": "akodo-bushi",
  "bushi matsu": "matsu-bushi",
  "matsu bushi": "matsu-bushi",
  "berserker matsu": "matsu-berserker",
  "barde ikoma": "ikoma-barde",
  "ikoma barde": "ikoma-barde",
  "shugenja kitsu": "kitsu-shugenja",
  "kitsu shugenja": "kitsu-shugenja",

  // CLAN DE LA MANTE
  "bushi yoritomo": "yoritomo-bushi",
  "yoritomo bushi": "yoritomo-bushi",
  "archer tsuruchi": "tsuruchi-archer",
  "tsuruchi archer": "tsuruchi-archer",
  "courtisan yoritomo": "yoritomo-courtisan",
  "yoritomo courtisan": "yoritomo-courtisan",
  "shugenja moshi": "moshi-shugenja",
  "moshi shugenja": "moshi-shugenja",

  // CLAN DU PHÉNIX
  "garde du corps shiba": "shiba-bushi",
  "shiba bushi": "shiba-bushi",
  "shugenja isawa": "isawa-shugenja",
  "isawa shugenja": "isawa-shugenja",
  "maitre de savoir asako": "asako-erudit",
  "asako erudit": "asako-erudit",

  // CLAN DU SCORPION
  "bushi bayushi": "bayushi-bushi",
  "bayushi bushi": "bayushi-bushi",
  "courtisan bayushi": "bayushi-courtisan",
  "bayushi courtisan": "bayushi-courtisan",
  "infiltrateur shosuro": "shosuro-infiltrateur",
  "shosuro infiltrateur": "shosuro-infiltrateur",
  "shugenja yogo": "yogo-shugenja",
  "yogo shugenja": "yogo-shugenja",
  "shugenja soshi": "soshi-shugenja",
  "soshi shugenja": "soshi-shugenja",

  // CLAN DE LA LICORNE
  "cavalier moto": "moto-bushi",
  "moto bushi": "moto-bushi",
  "bushi shinjo": "shinjo-bushi",
  "shinjo bushi": "shinjo-bushi",
  "vierge de bataille utaku": "utaku-bushi",
  "utaku bushi": "utaku-bushi",
  "courtisan ide": "ide-courtisan",
  "ide courtisan": "ide-courtisan",
  "shugenja iuchi": "iuchi-shugenja",
  "iuchi shugenja": "iuchi-shugenja"
};

// =============================================================================
// 2. FONCTIONS UTILITAIRES DE NORMALISATION
// =============================================================================
function normalizeString(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function resolveSchoolId(schoolName) {
  const norm = normalizeString(schoolName)
    .replace(/^(ecole\s+de\s+|ecole\s+d'|ecole\s+des\s+)/, "");
  
  return CARNET_SCHOOL_IDS[norm] || 
         CARNET_SCHOOL_IDS[normalizeString(schoolName)] || 
         norm.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function normalizeKeyword(kw) {
  return normalizeString(kw)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

// Calcule le rang d'Insight officiel L5R 4e
function calculateInsightRank(traits, voidRing, skills) {
  // Anneaux : plus faible des 2 traits
  const earth = Math.min(traits.stamina, traits.willpower);
  const water = Math.min(traits.strength, traits.perception);
  const fire  = Math.min(traits.agility, traits.intelligence);
  const air   = Math.min(traits.reflexes, traits.awareness);
  const voidVal = Number(voidRing) || 2;

  const ringsTotal = earth + water + fire + air + voidVal;

  let skillsTotal = 0;
  if (Array.isArray(skills)) {
    skills.forEach(s => {
      skillsTotal += Number(s.rank) || 0;
    });
  }

  const insightPoints = (ringsTotal * 10) + skillsTotal;

  if (insightPoints < 150) return 1;
  if (insightPoints < 175) return 2;
  if (insightPoints < 200) return 3;
  if (insightPoints < 225) return 4;
  if (insightPoints < 250) return 5;
  if (insightPoints < 275) return 6;
  if (insightPoints < 300) return 7;
  return 8;
}

// =============================================================================
// 3. CONSTRUCTEUR DU PAYLOAD CARNET DE ROKUGAN (schemaVersion: 2)
// =============================================================================
function buildCarnetPayload(charData) {
  // 1. Traits (8 obligatoires, entiers entre 1 et 10)
  const traits = {
    stamina: parseInt(charData.traits?.stamina ?? charData.constitution ?? 2, 10),
    willpower: parseInt(charData.traits?.willpower ?? charData.volonte ?? 2, 10),
    strength: parseInt(charData.traits?.strength ?? charData.force ?? 2, 10),
    perception: parseInt(charData.traits?.perception ?? 2, 10),
    agility: parseInt(charData.traits?.agility ?? charData.agilite ?? 2, 10),
    intelligence: parseInt(charData.traits?.intelligence ?? 2, 10),
    reflexes: parseInt(charData.traits?.reflexes ?? 2, 10),
    awareness: parseInt(charData.traits?.awareness ?? charData.intuition ?? 2, 10)
  };

  const voidRing = parseInt(charData.voidRing ?? charData.vide ?? 2, 10);
  const voidPoints = parseInt(charData.voidPoints ?? voidRing, 10);

  // 2. Compétences
  const skills = (charData.skills || []).map(s => {
    let traitKey = (s.trait || "agility").toLowerCase();
    const traitMap = {
      "agilité": "agility", "force": "strength", "réflexes": "reflexes",
      "constitution": "stamina", "volonté": "willpower", "perception": "perception",
      "intelligence": "intelligence", "intuition": "awareness", "vide": "void"
    };
    if (traitMap[traitKey]) traitKey = traitMap[traitKey];

    return {
      name: s.name || s.nom || "Compétence",
      rank: parseInt(s.rank ?? s.rang ?? 1, 10),
      trait: traitKey,
      emphases: Array.isArray(s.emphases) ? s.emphases : (s.specialisation ? [s.specialisation] : [])
    };
  });

  // 3. Armes
  const weapons = (charData.weapons || []).map(w => {
    const rawKeywords = w.keywords || w.motsCles || [];
    const keywordsArray = Array.isArray(rawKeywords) 
      ? rawKeywords 
      : rawKeywords.toString().split(",").map(k => k.trim());

    const item = {
      name: w.name || w.nom || "Katana",
      skill: w.skill || w.competence || "Kenjutsu",
      dr: (w.dr || w.vd || "3g2").toString().toLowerCase().replace("k", "g"),
      keywords: keywordsArray.map(normalizeKeyword).filter(Boolean)
    };

    if (w.bowStrength || w.forceArc) {
      item.bowStrength = parseInt(w.bowStrength || w.forceArc, 10);
    }
    return item;
  });

  // 4. Armure
  const armor = charData.armor || {};
  const armorPayload = {
    name: armor.name || armor.nom || "Aucune",
    bonus: parseInt(armor.bonus ?? armor.ndBonus ?? 0, 10),
    reduction: parseInt(armor.reduction ?? armor.rd ?? 0, 10)
  };
  if (armor.catalogId || armor.id) {
    armorPayload.catalogId = (armor.catalogId || armor.id).toString();
  }

  // 5. Sorts (pour Shugenjas)
  const spells = (charData.spells || charData.sorts || []).map(sp => ({
    name: sp.name || sp.nom || "Sort",
    ring: (sp.ring || sp.element || sp.anneau || "Air").toString(),
    mastery: parseInt(sp.mastery ?? sp.maitrise ?? sp.rang ?? 1, 10)
  }));

  // 6. École & Rangs
  const schoolDisplayName = charData.school || charData.ecole || "École de bushi Hida";
  const schoolIdentifier = charData.schoolId || resolveSchoolId(schoolDisplayName);
  const calculatedInsight = calculateInsightRank(traits, voidRing, skills);

  // 7. Assemblage final strict
  const payload = {
    schemaVersion: 2,
    name: (charData.name || charData.nom || "Nouveau Samouraï").trim(),
    clan: (charData.clan || "Crabe").trim(),
    family: (charData.family || charData.famille || "").trim(),
    school: schoolDisplayName,
    schoolId: schoolIdentifier,
    schoolRank: null, // Laisse le Carnet déduire les techniques automatiquement
    insightRank: calculatedInsight,
    honor: parseFloat(Number(charData.honor ?? charData.honneur ?? 4.5).toFixed(1)),
    glory: parseFloat(Number(charData.glory ?? charData.gloire ?? 1.0).toFixed(1)),
    status: parseFloat(Number(charData.status ?? charData.statut ?? 1.0).toFixed(1)),
    xp: {
      total: parseInt(charData.xp?.total ?? charData.xpTotal ?? 40, 10),
      spent: parseInt(charData.xp?.spent ?? charData.xpDepense ?? 40, 10)
    },
    traits: traits,
    voidRing: voidRing,
    voidPoints: Math.min(voidPoints, voidRing),
    wounds: parseInt(charData.wounds ?? 0, 10),
    armor: armorPayload,
    skills: skills,
    weapons: weapons,
    spells: spells,
    techniques: [], // Ne pas surcharger, le catalogue Carnet s'en charge via schoolId
    maneuvers: [],
    advantages: typeof charData.advantages === "string" ? charData.advantages : (charData.avantages || []).join(", "),
    disadvantages: typeof charData.disadvantages === "string" ? charData.disadvantages : (charData.desavantages || []).join(", "),
    notes: charData.notes || ""
  };

  return payload;
}

// =============================================================================
// 4. POINT D'ENTRÉE DU TÉLÉCHARGEMENT CLIENT
// =============================================================================
function getCharacterData() {
  // 1. Recherche dans les variables globales possibles
  const candidates = [
    window.character,
    window.currentChar,
    window.currentPersonnage,
    window.perso,
    window.characterData,
    window.characterState,
    window.CURRENT_CHARACTER,
    window.currentCharacter,
    window.charData
  ];

  for (const c of candidates) {
    if (c && typeof c === "object" && (c.name || c.nom || c.clan || c.school || c.ecole)) {
      return c;
    }
  }

  // 2. Recherche dans le localStorage
  const storageKeys = ["l5r_character", "l5r_perso", "current_character", "character"];
  for (const k of storageKeys) {
    try {
      const saved = localStorage.getItem(k);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {}
  }

  // 3. Extraction directe depuis le DOM / formulaire HTML si présent
  const getVal = (ids) => {
    for (const id of ids) {
      const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (el) return el.value || el.textContent;
    }
    return null;
  };

  const getNum = (ids, def = 2) => {
    const v = getVal(ids);
    const n = parseInt(v, 10);
    return isNaN(n) ? def : n;
  };

  const nameVal = getVal(["char-name", "character-name", "nom", "name", "input-nom"]);
  if (nameVal) {
    return {
      name: nameVal,
      clan: getVal(["clan-select", "clan", "select-clan"]) || "Crabe",
      family: getVal(["family-select", "family", "famille", "select-family"]) || "",
      school: getVal(["school-select", "school", "ecole", "select-school"]) || "École de bushi Hida",
      traits: {
        stamina: getNum(["stamina", "constitution", "trait-constitution"]),
        willpower: getNum(["willpower", "volonte", "trait-volonte"]),
        strength: getNum(["strength", "force", "trait-force"]),
        perception: getNum(["perception", "trait-perception"]),
        agility: getNum(["agility", "agilite", "trait-agilite"]),
        intelligence: getNum(["intelligence", "trait-intelligence"]),
        reflexes: getNum(["reflexes", "trait-reflexes"]),
        awareness: getNum(["awareness", "intuition", "trait-intuition"])
      },
      voidRing: getNum(["void", "vide", "voidRing", "trait-vide"]),
      honor: parseFloat(getVal(["honor", "honneur"]) || "4.5"),
      glory: parseFloat(getVal(["glory", "gloire"]) || "1.0"),
      status: parseFloat(getVal(["status", "statut"]) || "1.0"),
      xp: {
        total: getNum(["xp-total", "xpTotal"], 40),
        spent: getNum(["xp-spent", "xpDepense"], 40)
      }
    };
  }

  return null;
}

function exportToCarnetRokugan() {
  const currentCharacter = getCharacterData();

  if (!currentCharacter) {
    alert("Impossible de localiser les données du personnage en cours. Vérifiez qu'un nom est saisi ou assignez votre objet personnage à window.character.");
    return;
  }

  const payload = buildCarnetPayload(currentCharacter);
  const jsonStr = JSON.stringify(payload, null, 2);

  const safeFilename = normalizeString(payload.name)
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "personnage";

  const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFilename}-l5r.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Exposition globale
window.exportToCarnetRokugan = exportToCarnetRokugan;
window.buildCarnetPayload = buildCarnetPayload;
