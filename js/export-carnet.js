/**
 * js/export-carnet.js — Export officiel pour Le Carnet de Rokugan (schemaVersion: 2)
 * Calibré sur le DOM de createcharacter.html & character-generator.js
 */

// =============================================================================
// 1. TABLE OFFICIELLE DES IDENTIFIANTS D'ÉCOLES (schoolId) DU CARNET
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
// 2. DICTIONNAIRE CANONIQUE DES ARMES (VD & MOTS-CLÉS FERMÉS DU CARNET)
// =============================================================================
const CARNET_WEAPONS_CATALOG = {
  "katana": { skill: "Kenjutsu", dr: "3g2", keywords: ["samourai", "moyenne"] },
  "wakizashi": { skill: "Kenjutsu", dr: "2g2", keywords: ["samourai", "moyenne"] },
  "tetsubo": { skill: "Armes lourdes", dr: "3g3", keywords: ["lourde", "grande", "deux-mains"] },
  "dai tsuchi": { skill: "Armes lourdes", dr: "4g3", keywords: ["lourde", "grande", "deux-mains"] },
  "ono": { skill: "Armes lourdes", dr: "4g2", keywords: ["lourde", "grande", "deux-mains"] },
  "no-dachi": { skill: "Kenjutsu", dr: "3g3", keywords: ["samourai", "grande", "deux-mains"] },
  "yari": { skill: "Lances", dr: "2g2", keywords: ["hast", "deux-mains"] },
  "naginata": { skill: "Armes d'hast", dr: "3g2", keywords: ["hast", "deux-mains", "samourai"] },
  "yumi": { skill: "Kyujutsu", dr: "1g2", keywords: ["arc", "deux-mains"], bowStrength: 2 },
  "tanto": { skill: "Couteaux", dr: "1g2", keywords: ["moyenne"] },
  "kama": { skill: "Armes paysannes", dr: "1g2", keywords: ["peasant", "moyenne"] },
  "bo": { skill: "Bâtons", dr: "1g2", keywords: ["deux-mains"] }
};

// =============================================================================
// 3. UTILITAIRES DE CONVERSION ET NETTOYAGE
// =============================================================================
function normalizeString(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanClanName(rawClan) {
  const norm = normalizeString(rawClan);
  if (norm.includes("crabe")) return "Crabe";
  if (norm.includes("grue")) return "Grue";
  if (norm.includes("dragon")) return "Dragon";
  if (norm.includes("lion")) return "Lion";
  if (norm.includes("mante")) return "Mante";
  if (norm.includes("phenix")) return "Phénix";
  if (norm.includes("scorpion")) return "Scorpion";
  if (norm.includes("licorne")) return "Licorne";
  return rawClan ? rawClan.trim() : "Crabe";
}

function resolveSchoolId(schoolName) {
  const norm = normalizeString(schoolName)
    .replace(/^(ecole\s+de\s+|ecole\s+d'|ecole\s+des\s+|ecole\s+)/, "");
  
  return CARNET_SCHOOL_IDS[norm] || 
         CARNET_SCHOOL_IDS[normalizeString(schoolName)] || 
         norm.replace(/[^a-z0-9\-]/g, "-").replace(/^-+|-+$/g, "");
}

function getSkillTrait(skillName) {
  const s = normalizeString(skillName);
  if (s.includes("kenjutsu") || s.includes("jiujutsu") || s.includes("lourde") || s.includes("lance") || s.includes("hast") || s.includes("athletisme") || s.includes("equitation") || s.includes("discretion")) return "agility";
  if (s.includes("iaijutsu") || s.includes("kyujutsu") || s.includes("defense")) return "reflexes";
  if (s.includes("courtisan") || s.includes("etiquette") || s.includes("sincerite") || s.includes("intimidation") || s.includes("art")) return "awareness";
  if (s.includes("enquete") || s.includes("chasse") || s.includes("bataille") || s.includes("guerre")) return "perception";
  if (s.includes("meditation")) return "willpower";
  if (s.includes("medecine") || s.includes("theologie") || s.includes("lore") || s.includes("connaissance") || s.includes("histoire") || s.includes("ingenierie")) return "intelligence";
  return "agility";
}

// =============================================================================
// 4. RÉCUPÉRATION ROBUSTE DES DONNÉES DU FORMULAIRE (DOM OU MÉMOIRE)
// =============================================================================
function extractCharacterState() {
  // 1. Vérification dans les variables globales de character-generator.js
  const globals = [
    window.character,
    window.currentChar,
    window.pc,
    window.charData,
    window.characterState,
    window.CURRENT_CHARACTER,
    window.currentCharacter
  ];
  for (const obj of globals) {
    if (obj && typeof obj === "object" && (obj.traits || obj.skills || obj.name || obj.clan)) {
      return obj;
    }
  }

  // 2. Extraction directe et infaillible depuis le DOM de createcharacter.html
  const nameEl = document.getElementById("pc-name");
  if (!nameEl) return null;

  const clanEl = document.getElementById("sel-clan");
  const famEl = document.getElementById("sel-family");
  const schoolEl = document.getElementById("sel-school");

  const clanText = clanEl?.options[clanEl.selectedIndex]?.text || clanEl?.value || "Crabe";
  const famText = famEl?.options[famEl.selectedIndex]?.text || famEl?.value || "";
  const schoolText = schoolEl?.options[schoolEl.selectedIndex]?.text || schoolEl?.value || "École de bushi Hida";

  const getNumVal = (id, def = 2) => {
    const el = document.getElementById(id);
    const n = parseInt(el?.value || el?.textContent || def, 10);
    return isNaN(n) ? def : n;
  };

  const traits = {
    stamina: getNumVal("trait-stamina", 2),
    willpower: getNumVal("trait-willpower", 2),
    strength: getNumVal("trait-strength", 2),
    perception: getNumVal("trait-perception", 2),
    agility: getNumVal("trait-agility", 2),
    intelligence: getNumVal("trait-intelligence", 2),
    reflexes: getNumVal("trait-reflexes", 2),
    awareness: getNumVal("trait-awareness", 2)
  };

  const voidRing = getNumVal("trait-void", 2);

  // Extraction des compétences (depuis la table d'impression ou la liste active)
  const skills = [];
  const printSkillRows = document.querySelectorAll("#p-skills-body tr");

  if (printSkillRows.length > 0) {
    printSkillRows.forEach(row => {
      const cols = row.querySelectorAll("td");
      if (cols.length >= 3) {
        const sName = cols[0]?.textContent?.trim() || "";
        const sRank = parseInt(cols[2]?.textContent?.trim() || "1", 10) || 1;
        const sEmph = cols[4]?.textContent?.trim() || "";
        if (sName) {
          skills.push({
            name: sName,
            rank: sRank,
            trait: getSkillTrait(sName),
            emphases: sEmph ? sEmph.split(",").map(e => e.trim()).filter(Boolean) : []
          });
        }
      }
    });
  } else {
    // Lecture dans les cartes de #skills-list
    document.querySelectorAll("#skills-list > div").forEach(card => {
      const sName = card.querySelector("span, b, h4")?.textContent?.trim();
      const sRankInput = card.querySelector("input[type='number']");
      const sRank = parseInt(sRankInput?.value || "1", 10) || 1;
      if (sName) {
        skills.push({
          name: sName,
          rank: sRank,
          trait: getSkillTrait(sName),
          emphases: []
        });
      }
    });
  }

  // Si aucune compétence encore ajoutée, on injecte au moins Kenjutsu 1
  if (skills.length === 0) {
    skills.push({ name: "Kenjutsu", rank: 1, trait: "agility", emphases: [] });
  }

  // Armure
  const armorSelect = document.getElementById("pc-armor");
  const armorText = armorSelect?.options[armorSelect.selectedIndex]?.text || armorSelect?.value || "";
  let armorBonus = 0;
  let armorReduction = 0;
  let armorCatalogId = "none";

  if (normalizeString(armorText).includes("lourde") || normalizeString(armorText).includes("heavy")) {
    armorBonus = 10;
    armorReduction = 5;
    armorCatalogId = "heavy";
  } else if (normalizeString(armorText).includes("legere") || normalizeString(armorText).includes("light")) {
    armorBonus = 5;
    armorReduction = 3;
    armorCatalogId = "light";
  }

  // Armes
  const weaponSelect1 = document.getElementById("pc-weapon-1");
  const weaponSelect2 = document.getElementById("pc-weapon-2");
  const rawWeapons = [
    weaponSelect1?.options[weaponSelect1.selectedIndex]?.text || weaponSelect1?.value,
    weaponSelect2?.options[weaponSelect2.selectedIndex]?.text || weaponSelect2?.value
  ].filter(Boolean);

  const weapons = [];
  rawWeapons.forEach(wRaw => {
    const normW = normalizeString(wRaw);
    let matchedKey = Object.keys(CARNET_WEAPONS_CATALOG).find(k => normW.includes(k));
    if (matchedKey) {
      const cat = CARNET_WEAPONS_CATALOG[matchedKey];
      const wObj = {
        name: wRaw.split("(")[0].trim(),
        skill: cat.skill,
        dr: cat.dr,
        keywords: cat.keywords
      };
      if (cat.bowStrength) wObj.bowStrength = cat.bowStrength;
      weapons.push(wObj);
    } else {
      weapons.push({
        name: wRaw.split("(")[0].trim() || "Katana",
        skill: "Kenjutsu",
        dr: "3g2",
        keywords: ["samourai", "moyenne"]
      });
    }
  });

  if (weapons.length === 0) {
    weapons.push({
      name: "Katana",
      skill: "Kenjutsu",
      dr: "3g2",
      keywords: ["samourai", "moyenne"]
    });
  }

  // Avantages / Désavantages
  const advEls = document.querySelectorAll("#adv-container > div, #p-adv-list > div");
  const advList = [];
  advEls.forEach(el => advList.push(el.textContent.trim()));

  const disadvEls = document.querySelectorAll("#disadv-container > div, #p-disadv-list > div");
  const disadvList = [];
  disadvEls.forEach(el => disadvList.push(el.textContent.trim()));

  // Honneur et XP
  const honorVal = parseFloat(document.getElementById("stat-honor")?.textContent || "4.5") || 4.5;
  const xpTotal = parseInt(document.getElementById("xp-total")?.textContent || document.getElementById("base-xp-input")?.value || "40", 10) || 40;
  const xpRemaining = parseInt(document.getElementById("xp-remaining")?.textContent || "0", 10) || 0;

  return {
    name: nameEl.value.trim() || "Nouveau Samouraï",
    clan: cleanClanName(clanText),
    family: famText.trim(),
    school: schoolText.trim(),
    traits: traits,
    voidRing: voidRing,
    voidPoints: voidRing,
    honor: honorVal,
    glory: 1.0,
    status: 1.0,
    xpTotal: xpTotal,
    xpSpent: Math.max(0, xpTotal - xpRemaining),
    skills: skills,
    armor: {
      name: armorText.split("(")[0].trim() || "Aucune",
      bonus: armorBonus,
      reduction: armorReduction,
      catalogId: armorCatalogId
    },
    weapons: weapons,
    advantages: advList.join(", "),
    disadvantages: disadvList.join(", "),
    notes: document.getElementById("pc-outfit")?.value || ""
  };
}

// =============================================================================
// 5. CALCUL OFFICIEL DU RANG D'INSIGHT
// =============================================================================
function computeInsight(traits, voidRing, skills) {
  const earth = Math.min(traits.stamina, traits.willpower);
  const water = Math.min(traits.strength, traits.perception);
  const fire  = Math.min(traits.agility, traits.intelligence);
  const air   = Math.min(traits.reflexes, traits.awareness);
  const ringsSum = earth + water + fire + air + (Number(voidRing) || 2);

  let skillsSum = 0;
  if (Array.isArray(skills)) {
    skills.forEach(s => skillsSum += (Number(s.rank) || 0));
  }

  const points = (ringsSum * 10) + skillsSum;

  if (points < 150) return 1;
  if (points < 175) return 2;
  if (points < 200) return 3;
  if (points < 225) return 4;
  if (points < 250) return 5;
  if (points < 275) return 6;
  if (points < 300) return 7;
  return 8;
}

// =============================================================================
// 6. GÉNÉRATION DU FICHIER JSON & TÉLÉCHARGEMENT CLIENT
// =============================================================================
function exportToCarnetRokugan() {
  const char = extractCharacterState();

  if (!char || !char.name) {
    alert("Veuillez saisir au moins le nom de votre personnage avant de l'exporter.");
    return;
  }

  const insightRank = computeInsight(char.traits, char.voidRing, char.skills);

  const payload = {
    schemaVersion: 2,
    name: char.name,
    clan: char.clan,
    family: char.family || "",
    school: char.school,
    schoolId: resolveSchoolId(char.school),
    schoolRank: null, // Laisse le Carnet charger automatiquement les techniques d'école
    insightRank: insightRank,
    honor: parseFloat(Number(char.honor || 4.5).toFixed(1)),
    glory: parseFloat(Number(char.glory || 1.0).toFixed(1)),
    status: parseFloat(Number(char.status || 1.0).toFixed(1)),
    xp: {
      total: parseInt(char.xpTotal || 40, 10),
      spent: parseInt(char.xpSpent || 40, 10)
    },
    traits: {
      stamina: parseInt(char.traits.stamina, 10),
      willpower: parseInt(char.traits.willpower, 10),
      strength: parseInt(char.traits.strength, 10),
      perception: parseInt(char.traits.perception, 10),
      agility: parseInt(char.traits.agility, 10),
      intelligence: parseInt(char.traits.intelligence, 10),
      reflexes: parseInt(char.traits.reflexes, 10),
      awareness: parseInt(char.traits.awareness, 10)
    },
    voidRing: parseInt(char.voidRing, 10),
    voidPoints: Math.min(parseInt(char.voidPoints || char.voidRing, 10), parseInt(char.voidRing, 10)),
    wounds: 0,
    armor: {
      name: char.armor.name || "Aucune",
      bonus: parseInt(char.armor.bonus || 0, 10),
      reduction: parseInt(char.armor.reduction || 0, 10),
      catalogId: char.armor.catalogId || "none"
    },
    skills: char.skills.map(s => ({
      name: s.name,
      rank: parseInt(s.rank, 10),
      trait: s.trait,
      emphases: Array.isArray(s.emphases) ? s.emphases : []
    })),
    weapons: char.weapons.map(w => ({
      name: w.name,
      skill: w.skill,
      dr: w.dr,
      keywords: w.keywords,
      ...(w.bowStrength ? { bowStrength: parseInt(w.bowStrength, 10) } : {})
    })),
    techniques: [],
    maneuvers: [],
    spells: [],
    advantages: char.advantages || "",
    disadvantages: char.disadvantages || "",
    notes: char.notes || ""
  };

  const jsonStr = JSON.stringify(payload, null, 2);

  // Nom de fichier standardisé : <nom-du-personnage>-l5r.json
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
