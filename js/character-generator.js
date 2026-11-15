/**
 * js/character-generator.js — Moteur logique complet L5R 4e Édition
 * Règles officielles du Livre de Base (Book of Earth & Book of Fire) :
 * - Sauvegarde automatique du brouillon (localStorage) & Enregistrement Dojo (Ticket 1)
 * - Calcul XP dynamique : Illuminé, Bénédiction Élémentaire, Prodige, Esprit Obtus (Ticket #17)
 * - Réductions de coût / Bonus de gain selon le Clan et le Type d'École : Moine, Shugenja, Bushi, Courtisan (Ticket #18)
 * - Affichage complet des descriptions et règles des Avantages & Désavantages + Sorts/Kihos/Katas (Ticket #21)
 * - Gestion complète des avantages « Études dans une Autre École » & « Écoles Multiples »
 * - Paliers de Maîtrise des compétences (Rangs 3, 5 et 7)
 * - Plafond de 15 XP maximum pour les Désavantages
 * - Exportation vers fiche officielle A4 vectorielle & Carnet de Rokugan
 */

const MAX_DISADVANTAGE_XP = 15;
const DOJO_STORAGE_KEY = 'l5r_dojo_characters_v4';
const DRAFT_STORAGE_KEY = 'l5r_current_character_draft_v4';

const _normFoldCache = new Map();
function normalizeFold(str) {
  const key = String(str || "");
  let cached = _normFoldCache.get(key);
  if (cached !== undefined) return cached;
  cached = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (_normFoldCache.size < 2000) _normFoldCache.set(key, cached);
  return cached;
}

const _catalogIndexCache = {
  skillsRef: null,
  skillsByName: new Map(),
  advRef: null,
  advById: new Map(),
  advByName: new Map(),
  disRef: null,
  disById: new Map(),
  disByName: new Map()
};

// =============================================================================
// 1. PALIERS DE MAÎTRISE OFFICIELS (LIVRE DE BASE 4E ÉDITION)
// =============================================================================
const SKILL_MASTERIES = {
  "kenjutsu": [
    { rank: 3, label: "Dégainé Éclair", desc: "Dégainer un sabre devient une Action Gratuite." },
    { rank: 5, label: "Tranchant Affûté", desc: "Les dés de dégâts avec un sabre explosent sur 9 et 10." },
    { rank: 7, label: "Frappe Fluide", desc: "Porter une attaque de mêlée devient une Action Simple au lieu d'une Action Complexe." }
  ],
  "iaijutsu": [
    { rank: 3, label: "Dégainé Réflexe", desc: "Dégainer un sabre devient une Action Gratuite." },
    { rank: 5, label: "Focalisation", desc: "+1g0 sur les jets de Concentration (Focus) en duel." },
    { rank: 7, label: "Frappe Ultime", desc: "Les dés de frappe d'Iaijutsu (Strike) explosent sur 9 et 10." }
  ],
  "kyujutsu": [
    { rank: 3, label: "Encoche Rapide", desc: "Encocher et viser devient une Action Gratuite." },
    { rank: 5, label: "Tir à Bout Portant", desc: "Aucun malus pour tirer sur une cible engagée en mêlée." },
    { rank: 7, label: "Flèche Éclair", desc: "Les attaques à l'arc deviennent des Actions Simples." }
  ],
  "armes lourdes": [
    { rank: 3, label: "Impact Brutal", desc: "Ignore 3 points de Réduction d'armure adverse." },
    { rank: 5, label: "Renversement", desc: "1 Augmentation Gratuite pour la manœuvre Renversement (Knockdown)." },
    { rank: 7, label: "Broyeur", desc: "Les attaques avec armes lourdes deviennent des Actions Simples." }
  ],
  "jiujutsu": [
    { rank: 3, label: "Prise Solide", desc: "+1g0 pour prendre ou maintenir le contrôle d'une Lutte." },
    { rank: 5, label: "Poings d'Acier", desc: "Dégâts à mains nues augmentés à 0g2 (au lieu de 0g1) + Force." },
    { rank: 7, label: "Enchaînement", desc: "Les attaques à mains nues deviennent des Actions Simples." }
  ],
  "defense": [
    { rank: 3, label: "Garde Souple", desc: "Ajoute +3 supplémentaire au ND d'Armure en posture Défense." },
    { rank: 5, label: "Esquive Totale", desc: "Conserve la totalité (au lieu de la moitié) du jet de Défense en Défense Totale." },
    { rank: 7, label: "Mur Infranchissable", desc: "+5 permanent au ND d'Armure quelle que soit la posture." }
  ],
  "courtisan": [
    { rank: 3, label: "Étiquette Aiguisée", desc: "Gain de +1g0 sur les jets de commérage et d'observation en cour." },
    { rank: 5, label: "Réseau d'Indiscrétions", desc: "Dépenser 1 point de Vide confère +2g1 (au lieu de +1g1) sur les jets de Cour." },
    { rank: 7, label: "Maître des Salons", desc: "Immunité contre les pénalités sociales infligées par autrui." }
  ],
  "enquete": [
    { rank: 3, label: "Coup d'Œil", desc: "Augmentation Gratuite sur la recherche d'indices matériels." },
    { rank: 5, label: "Déduction Pure", desc: "Permet de déceler immédiatement les mensonges flagrants." },
    { rank: 7, label: "Infaillible", desc: "Les indices et énigmes évidents sont résolus sans jet de dé." }
  ],
  "athletisme": [
    { rank: 3, label: "Bond Aérien", desc: "Distance de saut augmentée de 50 %." },
    { rank: 5, label: "Course Endurante", desc: "Mouvement gratuit par tour augmenté de +1,5 mètre." },
    { rank: 7, label: "Agilité Suprême", desc: "Se relever de terre (Prone) est désormais une Action Gratuite." }
  ],
  "armes d'hast": [
    { rank: 3, label: "Allonge Supérieure", desc: "+5 à l'Initiative au premier round d'escarmouche." },
    { rank: 5, label: "Faucheur", desc: "+1g0 aux dégâts contre cibles montées ou de grande taille." },
    { rank: 7, label: "Manieuse d'Hast", desc: "Dégainer/armer une arme d'hast est une Action Gratuite." }
  ],
  "lances": [
    { rank: 3, label: "Percée", desc: "Ignore 3 points de Réduction au premier round d'escarmouche." },
    { rank: 5, label: "Pointe Précise", desc: "Portée de jet de lance augmentée de +1,5 mètre." },
    { rank: 7, label: "Garde de Pique", desc: "Dégainer/armer une lance est une Action Gratuite." }
  ]
};

function getMasteriesHtml(skillName, currentRank) {
  const normKey = (skillName || "").split('(')[0].trim().toLowerCase();
  const list = SKILL_MASTERIES[normKey];
  if (!list || list.length === 0) return "";

  let html = `<div class="mt-2 pt-1.5 border-t border-stone-800/80 space-y-1">`;
  list.forEach(m => {
    const isUnlocked = currentRank >= m.rank;
    if (isUnlocked) {
      html += `
        <div class="flex items-start gap-1.5 p-1 rounded bg-amber-950/40 border border-amber-600/40 text-[10px] text-amber-200">
          <span class="px-1 py-0.2 rounded bg-amber-600 text-black font-extrabold text-[9px] shrink-0 font-imperial">R${m.rank}</span>
          <div class="leading-tight">
            <b class="text-amber-300 font-bold">${m.label} :</b>
            <span class="text-stone-300 text-[9.5px]"> ${m.desc}</span>
          </div>
        </div>`;
    } else {
      html += `
        <div class="flex items-start gap-1.5 p-1 rounded bg-black/40 border border-stone-800/60 text-[10px] text-stone-500 opacity-60">
          <span class="px-1 py-0.2 rounded bg-stone-800 text-stone-400 font-bold text-[9px] shrink-0 font-imperial">R${m.rank}</span>
          <div class="leading-tight">
            <span class="font-medium">${m.label}</span>
            <span class="text-[9px] text-stone-600"> (débloqué au rang ${m.rank})</span>
          </div>
        </div>`;
    }
  });
  html += `</div>`;
  return html;
}

function getMasteriesSummary(skillName, rank) {
  const normKey = (skillName || "").split('(')[0].trim().toLowerCase();
  const list = SKILL_MASTERIES[normKey];
  if (!list) return "";
  return list
    .filter(m => rank >= m.rank)
    .map(m => `[R${m.rank}: ${m.label}]`)
    .join(" ");
}

// =============================================================================
// 2. GESTION DES AVANTAGES SPÉCIAUX (AUTRE ÉCOLE, ÉCOLES MULTIPLES, BÉNÉDICTION)
// =============================================================================
function isMultipleSchoolsAdv(advName) {
  const n = (advName || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return n.includes("ecole multiple") || n.includes("ecoles multiples") || n.includes("multiple school");
}

function getSchoolArchetype(schoolOrType) {
  if (!schoolOrType) return "bushi";
  const target = schoolOrType.school || schoolOrType;
  const rawType = typeof target === "string" ? target : (target.type || "");
  const t = rawType.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  if (t.includes("shugenja")) return "shugenja";
  if (t.includes("bushi")) return "bushi";
  if (t.includes("ninja") || t.includes("shinobi")) return "ninja";
  if (t.includes("moine") || t.includes("monk") || t.includes("ise zumi") || t.includes("tatou")) return "moine";
  if (t.includes("courtisan") || t.includes("courtier") || t.includes("magistrat") || t.includes("barde") || t.includes("erudit")) return "courtisan";

  const name = (target.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (name.includes("shugenja") || name.includes("isawa") || name.includes("kuni") || name.includes("tamori") || name.includes("agasha") || name.includes("soshi") || name.includes("yogo") || name.includes("iuchi") || name.includes("asahina") || name.includes("moshi") || name.includes("kitsu")) return "shugenja";
  if (name.includes("togashi") || name.includes("moine") || name.includes("ise zumi")) return "moine";
  if (name.includes("ninja") || name.includes("shinobi") || name.includes("infiltrateur")) return "ninja";
  if (name.includes("courtisan") || name.includes("barde") || name.includes("enqueteur") || name.includes("erudit") || name.includes("emissaire")) return "courtisan";
  return "bushi";
}

function isSchoolCompatibleForMultiple(primarySchool, candidateSchool) {
  if (!candidateSchool) return false;
  const pObj = primarySchool?.school || primarySchool;
  const cObj = candidateSchool?.school || candidateSchool;
  if (pObj?.id && cObj?.id && pObj.id === cObj.id) return false;

  const pType = getSchoolArchetype(pObj);
  const cType = getSchoolArchetype(cObj);

  // Règle officielle L5R 4e (p. 150) : Incompatible Bushi / Shugenja
  if ((pType === "bushi" || pType === "ninja") && cType === "shugenja") return false;
  if (pType === "shugenja" && (cType === "bushi" || cType === "ninja")) return false;
  return true;
}

function getCompatibleMultipleSchools(primarySchool, allSchools) {
  const catalog = Array.isArray(allSchools) ? allSchools : getAllSchoolsCatalog();
  return catalog.filter(s => isSchoolCompatibleForMultiple(primarySchool, s));
}

function getCharacterArchetypePermissions(primarySchool, secondarySchool, isTogashiTattooed = false) {
  const pType = getSchoolArchetype(primarySchool);
  const sType = secondarySchool ? getSchoolArchetype(secondarySchool) : null;

  const isPrimaryMartial = (pType === "bushi" || pType === "ninja");
  const isSecondaryMartial = (sType === "bushi" || sType === "ninja");
  const isPrimaryShugenja = (pType === "shugenja");
  const isSecondaryShugenja = (!isPrimaryMartial && sType === "shugenja");

  const canCastSpells = isPrimaryShugenja || isSecondaryShugenja;
  const canUseKatas = isPrimaryMartial || (!isPrimaryShugenja && isSecondaryMartial);
  const canUseTattoos = !!isTogashiTattooed;
  const canUseKihos = (pType === "moine" && !canUseTattoos) || sType === "moine" || canCastSpells;

  return {
    primaryType: pType,
    secondaryType: sType,
    canCastSpells,
    canUseKatas,
    canUseKihos,
    canUseTattoos
  };
}

function isDifferentSchoolAdv(advName) {
  const n = (advName || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return n.includes("autre ecole") || n.includes("different school");
}

function isElementalBlessingAdv(advObjOrName) {
  if (!advObjOrName) return false;
  if (typeof advObjOrName === "object") {
    if (advObjOrName.impact === "elemental_blessing" || (advObjOrName.impact || "").startsWith("elemental_blessing_")) return true;
    advObjOrName = advObjOrName.name || "";
  }
  const n = String(advObjOrName).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return n.includes("benediction elementaire") || n.includes("elemental blessing");
}

function getAllSchoolsCatalog() {
  const clans = getClans();
  const allSchools = [];
  for (const cKey in clans) {
    const clan = clans[cKey];
    (clan.schools || []).forEach((sch, sIdx) => {
      allSchools.push({
        clanKey: cKey,
        clanName: clan.name,
        schoolIndex: sIdx,
        id: sch.id,
        name: sch.name,
        family: sch.family,
        type: sch.type,
        trait: sch.trait,
        bonus: sch.bonus,
        honor: sch.honor,
        skills: sch.skills,
        outfit: sch.outfit,
        techniques: sch.techniques || (sch.technique ? [sch.technique] : []),
        schoolObj: sch
      });
    });
  }
  return allSchools;
}

function resolveSchoolByRef(refValue, fallbackClanKey) {
  const clans = getClans();
  const currentClanKey = fallbackClanKey || document.getElementById('sel-clan')?.value || "crabe";

  if (refValue !== undefined && refValue !== null && refValue !== "") {
    const strVal = String(refValue);

    for (const cKey in clans) {
      const c = clans[cKey];
      const idx = (c.schools || []).findIndex(s => s.id === strVal);
      if (idx !== -1) {
        return {
          clanKey: cKey,
          clanName: c.name,
          schoolIndex: idx,
          school: c.schools[idx],
          isExternalClan: cKey !== currentClanKey
        };
      }
    }

    if (strVal.includes(":")) {
      const [cKey, sIdxStr] = strVal.split(":");
      const sIdx = parseInt(sIdxStr, 10) || 0;
      const c = clans[cKey];
      if (c && c.schools && c.schools[sIdx]) {
        return {
          clanKey: cKey,
          clanName: c.name,
          schoolIndex: sIdx,
          school: c.schools[sIdx],
          isExternalClan: cKey !== currentClanKey
        };
      }
    }

    const numIdx = parseInt(strVal, 10);
    if (!isNaN(numIdx) && clans[currentClanKey]?.schools?.[numIdx]) {
      const c = clans[currentClanKey];
      return {
        clanKey: currentClanKey,
        clanName: c.name,
        schoolIndex: numIdx,
        school: c.schools[numIdx],
        isExternalClan: false
      };
    }
  }

  const fallbackClan = clans[currentClanKey];
  if (fallbackClan && fallbackClan.schools && fallbackClan.schools[0]) {
    return {
      clanKey: currentClanKey,
      clanName: fallbackClan.name,
      schoolIndex: 0,
      school: fallbackClan.schools[0],
      isExternalClan: false
    };
  }
  return null;
}

function getSelectedSchoolObject() {
  const clanKey = document.getElementById('sel-clan')?.value || "crabe";
  const rawSchoolVal = document.getElementById('sel-school')?.value;
  return resolveSchoolByRef(rawSchoolVal, clanKey);
}

function updateDifferentSchoolSelection(advIdx, newSchoolId) {
  if (!advantagesList[advIdx] || !newSchoolId) return;
  const all = getAllSchoolsCatalog();
  const found = all.find(s => s.id === newSchoolId);
  if (!found) return;

  advantagesList[advIdx].differentSchoolId = found.id;
  advantagesList[advIdx].differentSchoolName = `${found.name} (${found.clanName})`;

  const schSel = document.getElementById('sel-school');
  if (schSel) {
    updateSchoolOptions(found.id);
    schSel.value = found.id;
  }

  resetSheetToNewSelection(true);
}

function updateSecondarySchoolSelection(advIdx, schoolId, rankVal) {
  if (!advantagesList[advIdx]) return;

  if (schoolId !== undefined) {
    const all = getAllSchoolsCatalog();
    const found = all.find(s => s.id === schoolId);
    const primarySch = getSelectedSchoolObject()?.school;
    if (found && primarySch && !isSchoolCompatibleForMultiple(primarySch, found)) {
      notifyForgeUser(`Règle L5R 4e : « ${found.name} » (${found.type}) est incompatible avec une école de ${primarySch.type}.`, 'error');
      renderAdvDisadv();
      return;
    }
    advantagesList[advIdx].secondarySchoolId = schoolId;
    advantagesList[advIdx].secondarySchoolName = found ? `${found.name} (${found.clanName})` : "";
  }

  if (rankVal !== undefined) {
    advantagesList[advIdx].secondarySchoolRank = Math.max(1, Math.min(5, parseInt(rankVal, 10) || 1));
  }

  renderAdvDisadv();
  updateAll();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'secondary-school' } }));
  }
}

function updateElementalBlessingSelection(advIdx, ringKey) {
  if (!advantagesList[advIdx]) return;
  advantagesList[advIdx].chosenElement = ringKey || "earth";
  renderAdvDisadv();
  updateAll();
}

// =============================================================================
// 3. CONTEXTE DU PERSONNAGE & COÛTS DYNAMIQUES PAR CLAN / ÉCOLE (TICKET #18)
// =============================================================================
function buildCharacterContextFromInputs(clanVal = "", famName = "", schName = "", schType = "") {
  const cVal = String(clanVal || "").toLowerCase();
  const fName = String(famName || "").toLowerCase();
  const sName = String(schName || "").toLowerCase();
  const sType = String(schType || "").toLowerCase();

  return {
    clan: cVal,
    isCrab: cVal.includes("crabe") || cVal.includes("crab"),
    isCrane: cVal.includes("grue") || cVal.includes("crane"),
    isDragon: cVal.includes("dragon"),
    isLion: cVal.includes("lion"),
    isMantis: cVal.includes("mante") || cVal.includes("mantis"),
    isPhoenix: cVal.includes("phenix") || cVal.includes("phénix") || cVal.includes("phoenix"),
    isScorpion: cVal.includes("scorpion"),
    isUnicorn: cVal.includes("licorne") || cVal.includes("unicorn"),
    isSpider: cVal.includes("araignee") || cVal.includes("araignée") || cVal.includes("spider"),
    isImperial: cVal.includes("imperial") || cVal.includes("impérial") || fName.includes("miya") || fName.includes("otomo") || fName.includes("seppun"),
    isBushi: sType.includes("bushi") || sName.includes("bushi") || sName.includes("guerrier") || sName.includes("éclaireur") || sName.includes("archer") || sName.includes("duelliste"),
    isShugenja: sType.includes("shugenja") || sName.includes("shugenja"),
    isCourtier: sType.includes("courtisan") || sType.includes("courtier") || sName.includes("courtisan") || sName.includes("magistrat") || sName.includes("diplomate"),
    isMonk: sType.includes("moine") || sType.includes("monk") || sName.includes("moine") || sName.includes("togashi") || sName.includes("confrérie") || sName.includes("confrerie") || sName.includes("henshin") || sName.includes("tatoué")
  };
}

function getCharacterContext() {
  if (typeof document === "undefined") {
    return buildCharacterContextFromInputs();
  }
  const clanVal = (document.getElementById('sel-clan')?.value || "").toLowerCase();
  const clans = getClans();
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const famName = (clans[clanVal]?.families?.[famIdx]?.name || "").toLowerCase();

  const schObj = getSelectedSchoolObject();
  const sch = schObj?.school;
  const schName = (sch?.name || sch?.id || "").toLowerCase();
  const schType = (sch?.type || sch?.tag || "").toLowerCase();

  return buildCharacterContextFromInputs(clanVal, famName, schName, schType);
}

function resolveContextArg(contextOverride) {
  if (!contextOverride) return getCharacterContext();
  const base = buildCharacterContextFromInputs(
    contextOverride.clan || "",
    contextOverride.family || "",
    contextOverride.schoolName || contextOverride.school || "",
    contextOverride.schoolType || contextOverride.type || ""
  );
  return Object.assign(base, contextOverride);
}

function getEffectiveAdvCost(adv, contextOverride) {
  if (!adv) return 0;
  const baseCost = parseInt(adv.baseCost ?? adv.cost) || 0;
  const ctx = resolveContextArg(contextOverride);
  const imp = (adv.impact || adv.id || "").toLowerCase();
  const nameNorm = normalizeFold(adv.name);

  let discount = 0;

  if ((imp === "clear_thinker" || nameNorm.includes("esprit clair")) && ctx.isDragon) discount += 1;
  if ((imp === "dark_paragon" || nameNorm.includes("sombre parangon")) && ctx.isSpider) discount += 1;
  if ((imp === "elemental_blessing" || imp.startsWith("elemental_blessing_") || nameNorm.includes("benediction elementaire")) && ctx.isPhoenix) discount += 1;
  if (imp === "enlightened" || nameNorm.includes("illumine")) {
    if (ctx.isDragon || ctx.isMonk) discount += 1;
  }
  if ((imp === "friend_of_the_elements" || nameNorm.includes("ami des elements")) && ctx.isShugenja) discount += 1;
  if ((imp === "friend_of_the_brotherhood" || nameNorm.includes("ami de la confrerie")) && ctx.isDragon) discount += 1;
  if ((imp === "gaijin_gear" || nameNorm.includes("equipement gaijin")) && (ctx.isMantis || ctx.isUnicorn)) discount += 1;
  if ((imp === "hands_of_stone" || nameNorm.includes("mains de pierre")) && ctx.isMonk) discount += 1;
  if ((imp === "irreproachable" || nameNorm.includes("irreprochable")) && ctx.isImperial) discount += 1;
  if ((imp === "ishiken_do" || nameNorm.includes("ishiken")) && ctx.isPhoenix) discount += 2;
  if ((imp === "large" || nameNorm.includes("grand (large)")) && ctx.isCrab) discount += 1;
  if ((imp === "crab_hands" || nameNorm.includes("mains du crabe")) && ctx.isCrab) discount += 1;
  if ((imp === "strength_earth" || nameNorm.includes("force de la terre")) && ctx.isBushi) discount += 1;
  if ((imp === "dangerous_beauty" || nameNorm.includes("beaute dangereuse")) && ctx.isScorpion) discount += 1;
  if ((imp === "leadership" || nameNorm.includes("commandement")) && ctx.isLion) discount += 1;
  if ((imp === "paragon_bushido" || nameNorm.includes("parangon")) && ctx.isLion) discount += 1;
  if ((imp === "tactician" || nameNorm.includes("tacticien")) && (ctx.isLion || ctx.isBushi)) discount += 1;
  if ((imp === "soul_artistry" || nameNorm.includes("ame d'artiste")) && (ctx.isCrane || ctx.isCourtier)) discount += 1;
  if ((imp === "ally" || nameNorm.includes("allies")) && ctx.isCrane) discount += 1;
  if ((imp === "darling_of_the_court" || nameNorm.includes("favori de la cour")) && ctx.isCourtier) discount += 1;
  if ((imp === "wealthy" || nameNorm.includes("riche")) && (ctx.isCrane || ctx.isUnicorn || ctx.isImperial)) discount += 1;
  if ((imp === "sage" || nameNorm.includes("erudit")) && (ctx.isPhoenix || ctx.isMonk)) discount += 1;

  return Math.max(1, baseCost - discount);
}

function getEffectiveDisadvGain(dis, contextOverride) {
  if (!dis) return 0;
  const baseGain = parseInt(dis.baseGain ?? dis.gain ?? dis.cost) || 0;
  const ctx = resolveContextArg(contextOverride);
  const imp = (dis.impact || dis.id || "").toLowerCase();
  const nameNorm = normalizeFold(dis.name);

  let bonus = 0;

  if ((imp === "antisocial" || nameNorm.includes("antisocial")) && ctx.isCrab) bonus += 1;
  if ((imp === "ascetic" || nameNorm.includes("ascete")) && (ctx.isDragon || ctx.isMonk)) bonus += 1;
  if ((imp === "bitter_betrothal" || nameNorm.includes("fiancailles ameres")) && ctx.isImperial) bonus += 1;
  if ((imp.startsWith("consumed") || nameNorm.includes("consume")) && ctx.isSpider) bonus += 1;
  if ((imp === "consumed_perfection" || nameNorm.includes("consume : perfection")) && ctx.isCrane && !ctx.isSpider) bonus += 1;
  if ((imp === "cursed_by_the_realm" || nameNorm.includes("maudit par le royaume")) && ctx.isShugenja) bonus += 1;
  if ((imp === "forced_retirement" || nameNorm.includes("retraite forcee")) && ctx.isMonk) bonus += 1;
  if ((imp === "gaijin_name" || nameNorm.includes("nom gaijin")) && ctx.isUnicorn) bonus += 1;
  if ((imp === "obtuse" || nameNorm.includes("esprit obtus")) && (ctx.isCrab || ctx.isBushi)) bonus += 1;
  if ((imp === "overconfident" || nameNorm.includes("trop confiant") || nameNorm.includes("presomptueux")) && (ctx.isLion || ctx.isMantis)) bonus += 1;
  if ((imp === "rumormonger" || nameNorm.includes("colporteur") || nameNorm.includes("commere")) && ctx.isCourtier) bonus += 1;
  if ((imp === "touch_of_the_void" || nameNorm.includes("touche par le vide")) && ctx.isPhoenix) bonus += 1;
  if ((imp === "wrath_of_the_kami" || nameNorm.includes("courroux des kami")) && ctx.isShugenja) bonus += 1;
  if ((imp === "permanent_wound" || nameNorm.includes("blessure permanente")) && ctx.isBushi) bonus += 1;
  if ((imp === "brash" || nameNorm.includes("impulsif") || nameNorm.includes("temeraire")) && ctx.isLion) bonus += 1;
  if ((imp === "greedy" || nameNorm.includes("cupide")) && ctx.isMantis) bonus += 1;
  if ((imp === "idealistic" || nameNorm.includes("idealiste")) && ctx.isLion) bonus += 1;

  return baseGain + bonus;
}

function getIndexedSkillsMap() {
  const list = getSkills();
  if (list !== _catalogIndexCache.skillsRef) {
    _catalogIndexCache.skillsRef = list;
    const map = new Map();
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (s && s.name) map.set(s.name, s);
    }
    _catalogIndexCache.skillsByName = map;
  }
  return _catalogIndexCache.skillsByName;
}

function getIndexedAdvMaps() {
  const container = getAdvantages();
  const list = container.avantages || (typeof window !== "undefined" ? window.AVANTAGES_LIST : null) || [];
  if (list !== _catalogIndexCache.advRef) {
    _catalogIndexCache.advRef = list;
    const byId = new Map();
    const byName = new Map();
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (!a) continue;
      if (a.id) byId.set(a.id, a);
      if (a.name) byName.set(a.name, a);
    }
    _catalogIndexCache.advById = byId;
    _catalogIndexCache.advByName = byName;
  }
  return { list, byId: _catalogIndexCache.advById, byName: _catalogIndexCache.advByName };
}

function getIndexedDisadvMaps() {
  const container = getAdvantages();
  const list = container.desavantages || (typeof window !== "undefined" ? window.DESAVANTAGES_LIST : null) || [];
  if (list !== _catalogIndexCache.disRef) {
    _catalogIndexCache.disRef = list;
    const byId = new Map();
    const byName = new Map();
    for (let i = 0; i < list.length; i++) {
      const d = list[i];
      if (!d) continue;
      if (d.id) byId.set(d.id, d);
      if (d.name) byName.set(d.name, d);
    }
    _catalogIndexCache.disById = byId;
    _catalogIndexCache.disByName = byName;
  }
  return { list, byId: _catalogIndexCache.disById, byName: _catalogIndexCache.disByName };
}

function resolveCatalogAdvantage(val) {
  if (val === "" || val === null || val === undefined) return null;
  const { list, byId, byName } = getIndexedAdvMaps();
  return list[val] || byId.get(val) || byName.get(val) || null;
}

function resolveCatalogDisadvantage(val) {
  if (val === "" || val === null || val === undefined) return null;
  const { list, byId, byName } = getIndexedDisadvMaps();
  return list[val] || byId.get(val) || byName.get(val) || null;
}

// Aperçu dynamique des Avantages & Désavantages (Ticket #21)
function updateAdvPreview() {
  const sel = document.getElementById('sel-catalog-adv');
  const card = document.getElementById('adv-preview-card');
  if (!sel || !card) return;
  const adv = resolveCatalogAdvantage(sel.value);
  if (!adv) {
    card.classList.add('hidden');
    return;
  }
  const baseCost = parseInt(adv.baseCost ?? adv.cost) || 0;
  const effectiveCost = getEffectiveAdvCost(adv);

  const nameEl = document.getElementById('adv-preview-name');
  const typeEl = document.getElementById('adv-preview-type');
  const costEl = document.getElementById('adv-preview-cost');
  const prereqEl = document.getElementById('adv-preview-prereq');
  const descEl = document.getElementById('adv-preview-desc');
  const ruleEl = document.getElementById('adv-preview-rule');

  if (nameEl) nameEl.textContent = adv.name;
  if (typeEl) typeEl.textContent = `Catégorie : ${adv.type || 'Avantage'}`;
  if (costEl) {
    costEl.textContent = (effectiveCost !== baseCost)
      ? `Coût : ${effectiveCost} XP (au lieu de ${baseCost} XP — Réduction Clan/École)`
      : `Coût : ${effectiveCost} XP`;
  }
  if (prereqEl) prereqEl.textContent = adv.prerequisite ? `Prérequis : ${adv.prerequisite}` : '';
  if (descEl) descEl.textContent = adv.desc ? `« ${adv.desc} »` : '';
  if (ruleEl) ruleEl.textContent = adv.rule || '';
  card.classList.remove('hidden');
}

function updateDisadvPreview() {
  const sel = document.getElementById('sel-catalog-disadv');
  const card = document.getElementById('disadv-preview-card');
  if (!sel || !card) return;
  const dis = resolveCatalogDisadvantage(sel.value);
  if (!dis) {
    card.classList.add('hidden');
    return;
  }
  const baseGain = parseInt(dis.baseGain ?? dis.gain ?? dis.cost) || 0;
  const effectiveGain = getEffectiveDisadvGain(dis);

  const nameEl = document.getElementById('disadv-preview-name');
  const typeEl = document.getElementById('disadv-preview-type');
  const costEl = document.getElementById('disadv-preview-cost');
  const prereqEl = document.getElementById('disadv-preview-prereq');
  const descEl = document.getElementById('disadv-preview-desc');
  const ruleEl = document.getElementById('disadv-preview-rule');

  if (nameEl) nameEl.textContent = dis.name;
  if (typeEl) typeEl.textContent = `Catégorie : ${dis.type || 'Désavantage'}`;
  if (costEl) {
    costEl.textContent = (effectiveGain !== baseGain)
      ? `Gain : +${effectiveGain} XP (au lieu de +${baseGain} XP — Bonus Clan/École)`
      : `Gain : +${effectiveGain} XP`;
  }
  if (prereqEl) prereqEl.textContent = dis.prerequisite ? `Prérequis : ${dis.prerequisite}` : '';
  if (descEl) descEl.textContent = dis.desc ? `« ${dis.desc} »` : '';
  if (ruleEl) ruleEl.textContent = dis.rule || '';
  card.classList.remove('hidden');
}

// =============================================================================
// 4. PRÉNOMS ROKUGANI & CONFIGURATION DE BASE
// =============================================================================
const ROKUGANI_NAMES = {
  m: [
    { n: "Okado", m: "Porte de la sagesse" }, { n: "Akira", m: "Lumière claire et tranchante" },
    { n: "Hiro-Hito", m: "Homme généreux et bienveillant" }, { n: "Ryujin", m: "L'esprit du dragon des mers" },
    { n: "Kenji", m: "Second fils vigoureux" }, { n: "Masashi", m: "Gouverneur honorable" },
    { n: "Tadashi", m: "Droit et loyal au Bushido" }, { n: "Kazuki", m: "Espoir radieux" },
    { n: "Daiki", m: "Grand arbre rayonnant" }, { n: "Shinji", m: "Fidèle serviteur de la vérité" },
    { n: "Nobu", m: "Foi inébranlable" }, { n: "Takeshi", m: "Guerrier intrépide" },
    { n: "Genji", m: "Origine noble" }, { n: "Isamu", m: "Bravoure indomptable" },
    { n: "Jiro", m: "Second fils valeureux" }, { n: "Kenshin", m: "Cœur de sabre loyal" },
    { n: "Makoto", m: "Sincérité absolue" }, { n: "Ren", m: "Lotus pur" },
    { n: "Ryo", m: "Brise vivifiante" }, { n: "Shiro", m: "Quatrième fils de lumière" },
    { n: "Taro", m: "Premier-né glorieux" }, { n: "Yasuo", m: "Homme de paix" },
    { n: "Yoshito", m: "Personne juste et droite" }, { n: "Katsuro", m: "Fils victorieux" },
    { n: "Kaito", m: "Vol au-dessus de l'océan" }, { n: "Haruto", m: "Soleil haut dans le ciel" },
    { n: "Sosuke", m: "Aide courageuse et sage" }, { n: "Hayato", m: "Faucon agile" },
    { n: "Minoru", m: "Moisson abondante" }, { n: "Naoki", m: "Arbre droit et probe" },
    { n: "Osamu", m: "Discipline et loi" }, { n: "Saburo", m: "Troisième fils déterminé" },
    { n: "Seiichi", m: "Premier fils d'intégrité" }, { n: "Takashi", m: "Noblesse d'esprit" },
    { n: "Toru", m: "Persévérance à travers l'épreuve" }, { n: "Yuji", m: "Second fils brave" },
    { n: "Goro", m: "Cinquième fils robuste" }, { n: "Junpei", m: "Paix pure et sincère" },
    { n: "Ken'ichi", m: "Premier sabre de la famille" }, { n: "Masato", m: "Homme de justice" }
  ],
  f: [
    { n: "Yuriko", m: "Enfant du lys immaculé" }, { n: "Ayame", m: "Iris fleurissant près des eaux" },
    { n: "Hotaru", m: "Luciole dans la brume du crépuscule" }, { n: "Kaede", m: "Feuille d'érable d'automne" },
    { n: "Tomoe", m: "Tourbillon protecteur" }, { n: "Chitose", m: "Mille années de prospérité" },
    { n: "Reiko", m: "Enfant reconnaissante et gracieuse" }, { n: "Aoi", m: "Mauve sacrée" },
    { n: "Emi", m: "Beau sourire béni" }, { n: "Hana", m: "Fleur éclatante" },
    { n: "Haruka", m: "Parfum venu du lointain" }, { n: "Kazumi", m: "Beauté harmonieuse" },
    { n: "Kiku", m: "Chrysanthème impérial" }, { n: "Kohaku", m: "Ambre précieux" },
    { n: "Mai", m: "Danse gracieuse" }, { n: "Midori", m: "Verdure printanière" },
    { n: "Nanami", m: "Sept mers calmes" }, { n: "Renka", m: "Fleur de lotus" },
    { n: "Rin", m: "Dignité glacée et pure" }, { n: "Saki", m: "Fleurissant d'espoir" },
    { n: "Sakura", m: "Fleur de cerisier éphémère" }, { n: "Shizuka", m: "Calme serein" },
    { n: "Sora", m: "Ciel d'été infini" }, { n: "Sumiko", m: "Enfant de pure clarté" },
    { n: "Suzume", m: "Moineau vif et mélodieux" }, { n: "Tamiko", m: "Enfant du peuple aimée" },
    { n: "Tsuki", m: "Lumière de lune bienveillante" }, { n: "Ume", m: "Fleur de prunier résiliente" },
    { n: "Yoko", m: "Enfant de l'aube" }, { n: "Yoshiko", m: "Enfant de noble vertu" },
    { n: "Yuka", m: "Parfum délicat" }, { n: "Yumi", m: "Arc élégant" },
    { n: "Asuka", m: "Parfum du matin naissant" }, { n: "Botan", m: "Pivoine royale" },
    { n: "Fuji", m: "Glycine aux reflets d'argent" }, { n: "Hoshiko", m: "Enfant des étoiles" },
    { n: "Kiyomi", m: "Pure beauté d'eau vive" }, { n: "Miyuki", m: "Neige silencieuse" },
    { n: "Tsukiko", m: "Fille de la pleine lune" }, { n: "Moriko", m: "Enfant de la forêt sacrée" }
  ]
};

const TRAIT_INPUT_IDS = {
  "Constitution": "trait-stamina",
  "Volonté": "trait-willpower",
  "Force": "trait-strength",
  "Perception": "trait-perception",
  "Réflexes": "trait-reflexes",
  "Intuition": "trait-awareness",
  "Agilité": "trait-agility",
  "Intelligence": "trait-intelligence",
  "Vide": "trait-void"
};

let nameOrderWestern = true;
let currentSkills = [];
let advantagesList = [];
let disadvantagesList = [];
let isBootstrapping = true;

const getClans = () => window.CLANS_DATA || window.CLANS_CORE || {};
const getSkills = () => window.COMPETENCES_DATA || [];
const getEquipment = () => window.EQUIPEMENT_DATA || { armures: [], armes: [] };
const getAdvantages = () => window.AVANTAGES_DATA || {
  avantages: window.AVANTAGES_LIST || [],
  desavantages: window.DESAVANTAGES_LIST || []
};

function bootstrap() {
  if (!window.CLANS_DATA && !window.CLANS_CORE) {
    setTimeout(bootstrap, 50);
    return;
  }

  isBootstrapping = true;
  initClans();

  // Pré-sélection du clan par l'URL (?clan=...) ou restauration automatique du brouillon (Ticket 1)
  const urlParams = new URLSearchParams(window.location.search);
  const clanParam = urlParams.get('clan');
  const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);

  if (clanParam && document.querySelector(`#sel-clan option[value="${clanParam}"]`)) {
    document.getElementById('sel-clan').value = clanParam;
    onClanChange();
  } else if (savedDraft) {
    try {
      const parsedDraft = JSON.parse(savedDraft);
      if (parsedDraft && parsedDraft.clan) {
        applyCharacterDataToSheet(parsedDraft);
      }
    } catch (e) {
      console.warn("Erreur lors de la restauration du brouillon :", e);
    }
  }

  initCatalogSelectors();

  const armSel = document.getElementById('pc-armor');
  if (armSel && (!armSel.value || armSel.value === "0")) {
    if (armSel.querySelector('option[value="10"]')) {
      armSel.value = "10";
    }
  }

  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      updateStickyName();
      scheduleAutoSaveDraft();
    });
  }

  // Branchement automatique des aperçus d'Avantages/Désavantages
  const advSel = document.getElementById('sel-catalog-adv');
  if (advSel) advSel.addEventListener('change', updateAdvPreview);
  const disadvSel = document.getElementById('sel-catalog-disadv');
  if (disadvSel) disadvSel.addEventListener('change', updateDisadvPreview);

  isBootstrapping = false;
  updateStickyName();
  renderDojoList();
  updateAll();

  if (typeof window !== "undefined") {
    window.__l5rForgeReady = true;
    window.dispatchEvent(new CustomEvent('l5r-forge-ready'));
  }
}

function initClans() {
  const clans = getClans();
  const clanSel = document.getElementById('sel-clan');
  if (!clanSel) return;
  clanSel.innerHTML = "";
  for (let k in clans) {
    let opt = document.createElement('option');
    opt.value = k;
    opt.textContent = clans[k].name;
    clanSel.appendChild(opt);
  }
  onClanChange();
}

/**
 * Initialise l'ensemble des catalogues déroulants (Compétences, Équipements, Avantages & Désavantages).
 * Présentation harmonisée en optgroups thématiques avec pictogrammes, indentation et tri alphabétique.
 */
function initCatalogSelectors() {
  const skills = getSkills();
  const eq = getEquipment();
  const adv = getAdvantages();

  // Dictionnaires visuels pour les catégories
  const SKILL_TYPE_SYMBOLS = {
    "bugei": "⚔️ Bugei (Martial)",
    "noble": "📜 Haute & Noble",
    "haute": "📜 Haute & Noble",
    "marchande": "⚖️ Marchande",
    "degradante": "🌑 Dégradante",
    "dégradante": "🌑 Dégradante"
  };

  const ADV_TYPE_SYMBOLS = {
    "physique": "⚔️ Physique",
    "mental": "🧠 Mental",
    "spirituel": "⛩️ Spirituel",
    "social": "🌸 Social",
    "materiel": "🌿 Matériel",
    "matériel": "🌿 Matériel"
  };

  // =========================================================================
  // 1. COMPÉTENCES (Filtrage des acquises + Groupement Bugei / Noble / etc.)
  // =========================================================================
  const skSel = document.getElementById('sel-add-skill');
  if (skSel) {
    const normalizeSkill = (str) => (str || "").split('(')[0].trim().toLowerCase();

    const ownedSkillRoots = new Set(
      (currentSkills || [])
        .filter(s => !s.isChoice || s.chosen)
        .map(s => normalizeSkill(s.name))
    );

    const previousVal = skSel.value;
    skSel.innerHTML = "";

    const availableSkills = (skills || []).filter(s => {
      const root = normalizeSkill(s.name);
      return !ownedSkillRoots.has(root);
    });

    if (availableSkills.length === 0) {
      const opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "— Toutes les compétences acquises —";
      skSel.appendChild(opt);
      skSel.disabled = true;
    } else {
      skSel.disabled = false;

      // Regroupement par type de compétence
      const groupedSkills = {};
      availableSkills.forEach(s => {
        const typeKey = (s.type || "Général").toLowerCase();
        if (!groupedSkills[typeKey]) groupedSkills[typeKey] = [];
        groupedSkills[typeKey].push(s);
      });

      // Ordre d'affichage des groupes de compétences
      const priorityTypes = ["bugei", "noble", "haute", "marchande", "degradante", "dégradante"];
      const allTypes = Array.from(new Set([...priorityTypes, ...Object.keys(groupedSkills)]));

      const skFrag = document.createDocumentFragment();
      allTypes.forEach(tKey => {
        if (!groupedSkills[tKey] || groupedSkills[tKey].length === 0) return;

        const optgroup = document.createElement('optgroup');
        optgroup.label = SKILL_TYPE_SYMBOLS[tKey] || `📁 ${tKey.toUpperCase()}`;

        // Tri alphabétique dans le groupe
        groupedSkills[tKey].sort((a, b) => a.name.localeCompare(b.name, 'fr'));

        groupedSkills[tKey].forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.name;
          opt.textContent = `  ◆ ${s.name} (${s.trait || 'Trait'})`;
          optgroup.appendChild(opt);
        });

        skFrag.appendChild(optgroup);
      });
      skSel.appendChild(skFrag);

      if (previousVal && availableSkills.some(s => s.name === previousVal)) {
        skSel.value = previousVal;
      }
    }
  }

  // =========================================================================
  // 2. ARMURES
  // =========================================================================
  const armSel = document.getElementById('pc-armor');
  if (armSel) {
    const prevArmVal = armSel.value;
    armSel.innerHTML = "";
    const armFrag = document.createDocumentFragment();
    (eq.armures || []).forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.tn;
      opt.textContent = a.name;
      armFrag.appendChild(opt);
    });
    armSel.appendChild(armFrag);
    if (prevArmVal && armSel.querySelector(`option[value="${prevArmVal}"]`)) {
      armSel.value = prevArmVal;
    }
  }

  // =========================================================================
  // 3. ARMES (Principale & Secondaire)
  // =========================================================================
  const w1Sel = document.getElementById('pc-weapon-1');
  const w2Sel = document.getElementById('pc-weapon-2');
  if (w1Sel && w2Sel) {
    const prevW1 = w1Sel.value;
    const prevW2 = w2Sel.value;

    w1Sel.innerHTML = "";
    w2Sel.innerHTML = "<option value='Aucune'>Aucune arme secondaire</option>";
    const w1Frag = document.createDocumentFragment();
    const w2Frag = document.createDocumentFragment();

    (eq.armes || []).forEach(w => {
      const opt1 = document.createElement('option');
      opt1.value = w.name;
      opt1.textContent = `${w.name} (VD ${w.vd}, ${w.type})`;
      w1Frag.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = w.name;
      opt2.textContent = `${w.name} (VD ${w.vd})`;
      w2Frag.appendChild(opt2);
    });

    w1Sel.appendChild(w1Frag);
    w2Sel.appendChild(w2Frag);

    if (prevW1 && w1Sel.querySelector(`option[value="${prevW1}"]`)) {
      w1Sel.value = prevW1;
    }
    if (prevW2 && w2Sel.querySelector(`option[value="${prevW2}"]`)) {
      w2Sel.value = prevW2;
    }
  }

  // =========================================================================
  // 4. AVANTAGES (Optgroups par Type + Tri alphabétique + Réductions Clan/École)
  // =========================================================================
  const advSel = document.getElementById('sel-catalog-adv');
  if (advSel) {
    const prevAdvVal = advSel.value;
    const ownedAdvNames = new Set((advantagesList || []).map(a => a.name.toLowerCase().trim()));
    advSel.innerHTML = "";

    const availableAdv = (adv.avantages || [])
      .map((item, originalIdx) => ({ item, originalIdx }))
      .filter(({ item }) => !ownedAdvNames.has(item.name.toLowerCase().trim()));

    if (availableAdv.length === 0) {
      const opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "— Aucun autre avantage disponible —";
      advSel.appendChild(opt);
      advSel.disabled = true;
    } else {
      advSel.disabled = false;

      // Groupement par type
      const groupedAdv = {};
      availableAdv.forEach(entry => {
        const typeKey = (entry.item.type || "Général").toLowerCase().trim();
        if (!groupedAdv[typeKey]) groupedAdv[typeKey] = [];
        groupedAdv[typeKey].push(entry);
      });

      const sortedTypes = Object.keys(groupedAdv).sort((a, b) => a.localeCompare(b, 'fr'));

      const advFrag = document.createDocumentFragment();
      sortedTypes.forEach(tKey => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = ADV_TYPE_SYMBOLS[tKey] || `📁 ${tKey.toUpperCase()}`;

        // Tri alphabétique des noms
        groupedAdv[tKey].sort((a, b) => a.item.name.localeCompare(b.item.name, 'fr'));

        groupedAdv[tKey].forEach(({ item, originalIdx }) => {
          const effCost = (typeof getEffectiveAdvCost === 'function')
            ? getEffectiveAdvCost(item)
            : item.cost;
          const discountTag = effCost < item.cost ? ` ★ -${item.cost - effCost} XP` : "";

          const opt = document.createElement('option');
          opt.value = originalIdx;
          opt.textContent = `  ◆ ${item.name} (${effCost} XP${discountTag})`;
          optgroup.appendChild(opt);
        });

        advFrag.appendChild(optgroup);
      });
      advSel.appendChild(advFrag);

      if (prevAdvVal && advSel.querySelector(`option[value="${prevAdvVal}"]`)) {
        advSel.value = prevAdvVal;
      }
    }

    if (typeof updateAdvPreview === 'function') updateAdvPreview();
  }

  // =========================================================================
  // 5. DÉSAVANTAGES (Optgroups par Type + Tri alphabétique + Bonus Clan/École)
  // =========================================================================
  const disadvSel = document.getElementById('sel-catalog-disadv');
  if (disadvSel) {
    const prevDisVal = disadvSel.value;
    const ownedDisNames = new Set((disadvantagesList || []).map(d => d.name.toLowerCase().trim()));
    disadvSel.innerHTML = "";

    const availableDis = (adv.desavantages || [])
      .map((item, originalIdx) => ({ item, originalIdx }))
      .filter(({ item }) => !ownedDisNames.has(item.name.toLowerCase().trim()));

    if (availableDis.length === 0) {
      const opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "— Aucun autre désavantage disponible —";
      disadvSel.appendChild(opt);
      disadvSel.disabled = true;
    } else {
      disadvSel.disabled = false;

      // Groupement par type
      const groupedDis = {};
      availableDis.forEach(entry => {
        const typeKey = (entry.item.type || "Général").toLowerCase().trim();
        if (!groupedDis[typeKey]) groupedDis[typeKey] = [];
        groupedDis[typeKey].push(entry);
      });

      const sortedTypes = Object.keys(groupedDis).sort((a, b) => a.localeCompare(b, 'fr'));

      const disFrag = document.createDocumentFragment();
      sortedTypes.forEach(tKey => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = ADV_TYPE_SYMBOLS[tKey] || `📁 ${tKey.toUpperCase()}`;

        // Tri alphabétique des noms
        groupedDis[tKey].sort((a, b) => a.item.name.localeCompare(b.item.name, 'fr'));

        groupedDis[tKey].forEach(({ item, originalIdx }) => {
          const baseG = item.gain ?? item.cost;
          const effGain = (typeof getEffectiveDisadvGain === 'function')
            ? getEffectiveDisadvGain(item)
            : baseG;
          const bonusTag = effGain > baseG ? ` ★ +${effGain - baseG} XP` : "";

          const opt = document.createElement('option');
          opt.value = originalIdx;
          opt.textContent = `  ◆ ${item.name} (+${effGain} XP${bonusTag})`;
          optgroup.appendChild(opt);
        });

        disFrag.appendChild(optgroup);
      });
      disadvSel.appendChild(disFrag);

      if (prevDisVal && disadvSel.querySelector(`option[value="${prevDisVal}"]`)) {
        disadvSel.value = prevDisVal;
      }
    }

    if (typeof updateDisadvPreview === 'function') updateDisadvPreview();
  }

  if (typeof updateDisadvButtonState === 'function') {
    updateDisadvButtonState();
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-catalogs-updated'));
  }
}

function buildGroupedSchoolOptionsHtml(selectedSchoolId, currentClanKey, filterFn = null) {
  const clans = getClans();
  const clanKey = currentClanKey || document.getElementById('sel-clan')?.value || "crabe";
  const ownClan = clans[clanKey];
  let html = "";

  if (ownClan) {
    const ownSchools = (ownClan.schools || []).filter(s => !filterFn || filterFn(s, clanKey));
    if (ownSchools.length > 0) {
      html += `<optgroup label="🏯 Écoles du ${ownClan.name}">`;
      ownSchools.forEach(s => {
        const selAttr = s.id === selectedSchoolId ? ' selected' : '';
        html += `<option value="${s.id}"${selAttr}>${s.name} (${s.bonus})</option>`;
      });
      html += `</optgroup>`;
    }
  }

  for (const otherKey in clans) {
    if (otherKey === clanKey) continue;
    const otherClan = clans[otherKey];
    if (!otherClan) continue;
    const otherSchools = (otherClan.schools || []).filter(s => !filterFn || filterFn(s, otherKey));
    if (otherSchools.length === 0) continue;
    html += `<optgroup label="🎓 ${otherClan.name}">`;
    otherSchools.forEach(s => {
      const selAttr = s.id === selectedSchoolId ? ' selected' : '';
      html += `<option value="${s.id}"${selAttr}>${s.name} [${otherClan.name}] (${s.bonus})</option>`;
    });
    html += `</optgroup>`;
  }

  return html;
}

function updateSchoolOptions(preferredSchoolId) {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value || "crabe";
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const clan = clans[clanKey];
  if (!clan) return;

  const selectedFamily = clan.families[famIdx]?.name;
  const schSel = document.getElementById('sel-school');
  const lockHint = document.getElementById('school-lock-hint');
  if (!schSel) return;

  schSel.innerHTML = "";

  const diffAdv = advantagesList.find(a => isDifferentSchoolAdv(a.name));

  if (diffAdv) {
    schSel.disabled = false;
    schSel.classList.remove('opacity-60', 'cursor-not-allowed');

    if (lockHint) {
      lockHint.innerHTML = `<span class="text-emerald-400 font-bold">🎓 École d'adoption déverrouillée (Avantage payé : 5 XP)</span>`;
    }

    const targetId = preferredSchoolId || diffAdv.differentSchoolId || (clan.schools?.[0]?.id || "");
    schSel.innerHTML = buildGroupedSchoolOptionsHtml(targetId, clanKey);

    if (targetId && schSel.querySelector(`option[value="${targetId}"]`)) {
      schSel.value = targetId;
    }

  } else {
    const familySchools = (clan.schools || []).filter(s => s.family === selectedFamily);
    const availableSchools = familySchools.length > 0 ? familySchools : clan.schools;

    availableSchools.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.name} (${s.bonus})`;
      schSel.appendChild(opt);
    });

    if (availableSchools.length <= 1) {
      schSel.disabled = true;
      schSel.classList.add('opacity-60', 'cursor-not-allowed');
      if (lockHint) {
        lockHint.innerHTML = `<span class="text-stone-500 italic">🔒 École liée à votre famille. Déverrouillable via l'avantage « Études dans une Autre École » (5 XP).</span>`;
      }
    } else {
      schSel.disabled = false;
      schSel.classList.remove('opacity-60', 'cursor-not-allowed');
      if (lockHint) {
        lockHint.innerHTML = `<span class="text-amber-500/80 italic">Écoles accessibles pour la famille ${selectedFamily}.</span>`;
      }
    }

    if (preferredSchoolId && schSel.querySelector(`option[value="${preferredSchoolId}"]`)) {
      schSel.value = preferredSchoolId;
    } else if (availableSchools[0]) {
      schSel.value = availableSchools[0].id;
    }
  }
}

function onClanChange() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan').value;
  const clan = clans[clanKey];
  if (!clan) return;

  const famSel = document.getElementById('sel-family');
  famSel.innerHTML = "";
  clan.families.forEach((f, idx) => {
    let opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${f.name} (${f.bonus})`;
    famSel.appendChild(opt);
  });

  const diffAdv = advantagesList.find(a => isDifferentSchoolAdv(a.name));
  updateSchoolOptions(diffAdv?.differentSchoolId);
  resetSheetToNewSelection(true);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'clan' } }));
  }
}

function onFamilyChange() {
  const diffAdv = advantagesList.find(a => isDifferentSchoolAdv(a.name));
  updateSchoolOptions(diffAdv?.differentSchoolId);
  resetSheetToNewSelection(true);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'family' } }));
  }
}

function onSchoolChange() {
  const schObj = getSelectedSchoolObject();
  if (!schObj) return;

  const diffAdvIdx = advantagesList.findIndex(a => isDifferentSchoolAdv(a.name));

  if (diffAdvIdx !== -1) {
    advantagesList[diffAdvIdx].differentSchoolId = schObj.school.id;
    advantagesList[diffAdvIdx].differentSchoolName = `${schObj.school.name} (${schObj.clanName})`;
    renderAdvDisadv();
  }

  resetSheetToNewSelection(true);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'school' } }));
  }
}

function resetSheetToNewSelection(preserveAdvDisadv = true) {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  if (!clanKey || !clans[clanKey]) return;

  const clan = clans[clanKey];
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const fam = clan.families[famIdx];

  const schObj = getSelectedSchoolObject();
  const sch = schObj?.school;
  if (!fam || !sch) return;

  // Vérification de compatibilité L5R 4e sur Écoles Multiples après changement d'école
  const multiAdv = (advantagesList || []).find(a => isMultipleSchoolsAdv(a.name));
  if (multiAdv && multiAdv.secondarySchoolId) {
    const allSchools = getAllSchoolsCatalog();
    const secSch = allSchools.find(s => s.id === multiAdv.secondarySchoolId);
    if (!secSch || !isSchoolCompatibleForMultiple(sch, secSch)) {
      const compatList = getCompatibleMultipleSchools(sch, allSchools);
      const fallback = compatList[0] || null;
      multiAdv.secondarySchoolId = fallback ? fallback.id : "";
      multiAdv.secondarySchoolName = fallback ? `${fallback.name} (${fallback.clanName})` : "";
      if (fallback) {
        notifyForgeUser(`Écoles Multiples ajustée (${fallback.name}) : incompatibilité Bushi / Shugenja.`, 'warn');
      }
    }
  }

  document.getElementById('family-bonus').textContent = `Bonus Famille : ${fam.bonus}`;
  document.getElementById('school-bonus').innerHTML = schObj.isExternalClan
    ? `Bonus École <span class="text-emerald-400 font-bold">[${schObj.clanName}]</span> : ${sch.bonus}`
    : `Bonus École : ${sch.bonus}`;
  document.getElementById('pc-outfit').value = sch.outfit;
  document.getElementById('stat-honor').textContent = sch.honor;

  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    const currentParts = nameInput.value.trim().split(' ');
    const firstName = currentParts.length > 1 ? currentParts[0] : (currentParts[0] || "Okado");
    nameInput.value = nameOrderWestern ? `${firstName} ${fam.name}` : `${fam.name} ${firstName}`;
    updateStickyName();
  }

  ['sta','wil','str','per','ref','awa','agi','int'].forEach(id => {
    const el = document.getElementById(`badge-${id}`);
    if (el) el.textContent = "";
  });

  const badgeMap = {
    "Constitution": "sta", "Volonté": "wil", "Force": "str", "Perception": "per",
    "Réflexes": "ref", "Intuition": "awa", "Agilité": "agi", "Intelligence": "int"
  };

  if (fam && badgeMap[fam.trait]) {
    const el = document.getElementById(`badge-${badgeMap[fam.trait]}`);
    if (el) el.textContent = "+1 Famille";
  }
  if (sch && badgeMap[sch.trait]) {
    const el = document.getElementById(`badge-${badgeMap[sch.trait]}`);
    if (el) el.textContent = el.textContent ? "+2 F+É" : "+1 École";
  }

  for (const [traitName, inputId] of Object.entries(TRAIT_INPUT_IDS)) {
    const input = document.getElementById(inputId);
    if (!input) continue;

    let baseVal = 2;
    if (fam && fam.trait === traitName) baseVal += 1;
    if (sch && sch.trait === traitName) baseVal += 1;

    input.min = baseVal;
    input.value = baseVal;
  }

  currentSkills = sch.skills.map(s => {
    const sLower = s.toLowerCase();
    const isChoice = sLower.includes("compétence") || sLower.includes("choix") || sLower.includes("any");
    let filterType = null;
    if (sLower.includes("bugei")) filterType = "Bugei";
    else if (sLower.includes("noble") || sLower.includes("haute") || sLower.includes("high")) filterType = "Noble";
    else if (sLower.includes("marchande") || sLower.includes("merchant")) filterType = "Marchande";

    return {
      name: s,
      rank: 1,
      spec: false,
      isSchool: true,
      isChoice: isChoice,
      chosen: false,
      choiceFilter: filterType,
      originalPlaceholder: isChoice ? s : null
    };
  });
  renderSkills();

  const w1Sel = document.getElementById('pc-weapon-1');
  if (w1Sel) {
    if (sch.id?.includes("hida") || sch.name?.includes("Hida")) {
      w1Sel.value = "Tetsubo";
    } else if (sch.id?.includes("tsuruchi") || sch.name?.includes("Tsuruchi")) {
      w1Sel.value = "Arc Yumi";
    } else if (sch.id?.includes("shiba") || sch.name?.includes("Shiba")) {
      w1Sel.value = "Yari";
    } else {
      w1Sel.value = "Katana";
    }
  }

  const armSel = document.getElementById('pc-armor');
  if (armSel) {
    if (sch.outfit?.toLowerCase().includes("lourde")) {
      armSel.value = "10";
    } else if (sch.outfit?.toLowerCase().includes("légère")) {
      armSel.value = "5";
    } else {
      armSel.value = "0";
    }
  }

  if (!preserveAdvDisadv) {
    advantagesList = [];
    disadvantagesList = [];
  }
  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
}

function renderSchoolTechniques(currentRank) {
  const container = document.getElementById('school-techniques-container');
  if (!container) return;

  const schObj = getSelectedSchoolObject();
  const school = schObj?.school;

  if (!school) {
    container.innerHTML = "<div class='text-stone-500 italic text-xs'>Aucune école sélectionnée.</div>";
    return;
  }

  let techList = school.techniques;
  if (!techList || !techList.length) {
    techList = [school.technique || { rank: 1, name: "Technique Rang 1", effect: "Description..." }];
  }

  const externalBadge = schObj.isExternalClan
    ? `<span class="ml-2 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">🎓 Études dans une Autre École (${schObj.clanName})</span>`
    : "";

  let html = `
    <div class="text-[11px] font-bold text-amber-200/80 uppercase font-imperial mb-1.5 flex flex-wrap items-center">
      <span>École Principale : ${school.name}</span>
      ${externalBadge}
    </div>
    <div class="space-y-2">
  `;

  html += techList.map(t => {
    const isCurrent = (t.rank === currentRank);
    const isMastered = (t.rank < currentRank);

    if (isCurrent) {
      return `
        <div class="p-3 rounded-lg border-2 border-amber-400 bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] transition duration-200">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded bg-amber-500 text-black font-extrabold uppercase text-[10px] tracking-wide shadow flex items-center gap-1">
              ★ RANG ${t.rank} (ACTIF)
            </span>
            <span class="font-bold text-amber-200 text-sm font-imperial">${t.name}</span>
          </div>
          <p class="text-stone-100 text-xs leading-relaxed pl-1">${t.effect}</p>
        </div>
      `;
    } else if (isMastered) {
      return `
        <div class="p-2.5 rounded-lg border border-emerald-900/50 bg-stone-950/70 opacity-90 transition duration-200">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-bold uppercase text-[9px]">
              ✓ RANG ${t.rank} (MAÎTRISÉ)
            </span>
            <span class="font-bold text-amber-300/80 text-xs font-imperial">${t.name}</span>
          </div>
          <p class="text-stone-300 text-xs leading-relaxed pl-1">${t.effect}</p>
        </div>
      `;
    } else {
      const insightNeeded = 125 + (t.rank * 25);
      return `
        <div class="p-2.5 rounded-lg border border-stone-800/50 bg-black/40 opacity-40 hover:opacity-75 transition duration-200">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded bg-stone-900 text-stone-500 border border-stone-800 font-semibold uppercase text-[9px]">
              🔒 RANG ${t.rank} (INSIGHT ${insightNeeded})
            </span>
            <span class="font-semibold text-stone-400 text-xs font-imperial">${t.name}</span>
          </div>
          <p class="text-stone-500 text-xs italic leading-relaxed pl-1">${t.effect}</p>
        </div>
      `;
    }
  }).join('');
  html += `</div>`;

  const multiAdv = advantagesList.find(a => isMultipleSchoolsAdv(a.name));
  if (multiAdv && multiAdv.secondarySchoolId) {
    const allSchools = getAllSchoolsCatalog();
    const secSchool = allSchools.find(s => s.id === multiAdv.secondarySchoolId);

    if (secSchool) {
      const secRank = multiAdv.secondarySchoolRank || 1;
      html += `
        <div class="mt-4 pt-3 border-t-2 border-amber-500/30">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-bold text-amber-300 uppercase font-imperial flex items-center gap-1.5">
              <span>📜</span> Seconde École : ${secSchool.name} (${secSchool.clanName}) — Rang ${secRank}
            </span>
            <span class="text-[9px] px-2 py-0.5 rounded bg-stone-900 border border-amber-500/30 text-amber-400 font-bold">
              Avantage Écoles Multiples
            </span>
          </div>
          <div class="space-y-2">
      `;

      html += (secSchool.techniques || []).map(t => {
        const isUnlocked = t.rank <= secRank;
        if (isUnlocked) {
          return `
            <div class="p-2.5 rounded-lg border border-amber-500/50 bg-amber-950/20">
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded bg-amber-600 text-black font-extrabold uppercase text-[9px]">
                  RANG ${t.rank} (ACQUIS)
                </span>
                <span class="font-bold text-amber-200 text-xs font-imperial">${t.name}</span>
              </div>
              <p class="text-stone-300 text-xs leading-relaxed pl-1">${t.effect}</p>
            </div>
          `;
        } else {
          return `
            <div class="p-2.5 rounded-lg border border-stone-800/40 bg-black/40 opacity-40">
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded bg-stone-900 text-stone-500 text-[9px]">
                  RANG ${t.rank}
                </span>
                <span class="text-stone-500 text-xs font-imperial">${t.name}</span>
              </div>
              <p class="text-stone-600 text-xs italic leading-relaxed pl-1">${t.effect}</p>
            </div>
          `;
        }
      }).join('');

      html += `</div></div>`;
    }
  }

  container.innerHTML = html;
}

function updateDisadvButtonState() {
  const currentTotalGain = disadvantagesList.reduce((acc, d) => acc + (parseInt(d.gain) || 0), 0);
  const btnAddDisadv = document.querySelector("button[onclick='addDisadvFromCatalog()']");
  const selectDisadv = document.getElementById('sel-catalog-disadv');

  if (btnAddDisadv) {
    if (currentTotalGain >= MAX_DISADVANTAGE_XP) {
      btnAddDisadv.disabled = true;
      btnAddDisadv.classList.add('opacity-40', 'cursor-not-allowed');
      btnAddDisadv.title = `Limite officielle de ${MAX_DISADVANTAGE_XP} XP de désavantages atteinte.`;
      if (selectDisadv) selectDisadv.disabled = true;
    } else {
      btnAddDisadv.disabled = false;
      btnAddDisadv.classList.remove('opacity-40', 'cursor-not-allowed');
      btnAddDisadv.title = "";
      if (selectDisadv) selectDisadv.disabled = false;
    }
  }
}

function notifyForgeUser(msg, type = 'info') {
  if (typeof window !== 'undefined' && typeof window.showForgeToast === 'function') {
    window.showForgeToast(msg, type);
  } else if (typeof alert === 'function') {
    alert(msg);
  }
}

function addAdvFromCatalog() {
  const sel = document.getElementById('sel-catalog-adv');
  if (!sel || sel.value === "") return;
  const item = resolveCatalogAdvantage(sel.value);
  if (!item) return;

  if (advantagesList.some(a => a.name === item.name)) {
    notifyForgeUser(`L'avantage « ${item.name} » est déjà sélectionné.`, 'warn');
    return;
  }

  const effectiveCost = getEffectiveAdvCost(item);
  const currentRemainingXP = parseInt(document.getElementById('xp-remaining')?.textContent) || 0;
  if (currentRemainingXP - effectiveCost < 0) {
    notifyForgeUser(`Solde XP insuffisant pour « ${item.name} » (${effectiveCost} XP requis, ${currentRemainingXP} XP dispo).`, 'error');
    return;
  }

  const newAdv = {
    id: item.id || "",
    name: item.name,
    baseCost: item.cost,
    cost: effectiveCost,
    impact: item.impact || "",
    type: item.type || "",
    desc: item.desc || "",
    rule: item.rule || ""
  };

  if (isElementalBlessingAdv(item)) {
    newAdv.chosenElement = "earth";
  }

  const currentClanKey = document.getElementById('sel-clan')?.value || "crabe";
  const allSchools = getAllSchoolsCatalog();

  if (isDifferentSchoolAdv(item.name)) {
    const currentSchObj = getSelectedSchoolObject();
    const defaultSch = (currentSchObj && currentSchObj.school)
      ? allSchools.find(s => s.id === currentSchObj.school.id)
      : allSchools[0];

    if (defaultSch) {
      newAdv.differentSchoolId = defaultSch.id;
      newAdv.differentSchoolName = `${defaultSch.name} (${defaultSch.clanName})`;
      advantagesList.push(newAdv);

      const schSel = document.getElementById('sel-school');
      if (schSel) {
        updateSchoolOptions(defaultSch.id);
        schSel.value = defaultSch.id;
      }
      resetSheetToNewSelection(true);
      return;
    }
  }

  if (isMultipleSchoolsAdv(item.name)) {
    const primarySch = getSelectedSchoolObject()?.school;
    const compatSchools = getCompatibleMultipleSchools(primarySch, allSchools);
    const defaultSec = compatSchools[0] || null;
    newAdv.secondarySchoolId = defaultSec ? defaultSec.id : "";
    newAdv.secondarySchoolName = defaultSec ? `${defaultSec.name} (${defaultSec.clanName})` : "";
    newAdv.secondarySchoolRank = 1;
  }

  advantagesList.push(newAdv);
  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
  if (isMultipleSchoolsAdv(item.name) && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'multiple-schools' } }));
  }
}

function addDisadvFromCatalog() {
  const sel = document.getElementById('sel-catalog-disadv');
  if (!sel || sel.value === "") return;
  const item = resolveCatalogDisadvantage(sel.value);
  if (!item) return;

  if (disadvantagesList.some(d => d.name === item.name)) {
    notifyForgeUser(`Le désavantage « ${item.name} » est déjà sélectionné.`, 'warn');
    return;
  }

  const effectiveGain = getEffectiveDisadvGain(item);
  const currentTotalGain = disadvantagesList.reduce((acc, d) => acc + (parseInt(d.gain) || 0), 0);
  if (currentTotalGain + effectiveGain > MAX_DISADVANTAGE_XP) {
    notifyForgeUser(`Plafond de 15 XP atteint (${currentTotalGain} / ${MAX_DISADVANTAGE_XP} XP). « ${item.name} » (+${effectiveGain} XP) dépasserait la limite.`, 'error');
    return;
  }

  disadvantagesList.push({
    id: item.id || "",
    name: item.name,
    baseGain: item.gain ?? item.cost,
    gain: effectiveGain,
    impact: item.impact || "",
    type: item.type || "",
    desc: item.desc || "",
    rule: item.rule || ""
  });
  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
}

function removeAdv(idx) {
  const removed = advantagesList[idx];
  advantagesList.splice(idx, 1);

  if (removed && isDifferentSchoolAdv(removed.name)) {
    updateSchoolOptions();
    resetSheetToNewSelection(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'remove-different-school' } }));
    }
    return;
  }

  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
  if (removed && isMultipleSchoolsAdv(removed.name) && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'remove-multiple-schools' } }));
  }
}
const removeAdvantage = removeAdv;

function removeDisadv(idx) {
  disadvantagesList.splice(idx, 1);
  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
}
const removeDisadvantage = removeDisadv;

function renderAdvDisadv() {
  const advContainer = document.getElementById('adv-container');
  if (advContainer) {
    const allSchools = getAllSchoolsCatalog();
    const currentClanKey = document.getElementById('sel-clan')?.value || "crabe";

    advContainer.innerHTML = advantagesList.map((a, i) => {
      const ref = resolveCatalogAdvantage(a.id || a.name) || a;
      const effCost = getEffectiveAdvCost(ref);
      a.cost = effCost;
      const desc = a.desc || ref.desc || "";
      const rule = a.rule || ref.rule || "";

      const isDiff = isDifferentSchoolAdv(a.name);
      const isMulti = isMultipleSchoolsAdv(a.name);
      const isBlessing = isElementalBlessingAdv(ref) || isElementalBlessingAdv(a);
      let extraHtml = "";

      if (isBlessing) {
        const curElem = a.chosenElement || "earth";
        extraHtml += `
          <div class="mt-2 p-2 rounded bg-stone-950 border border-amber-500/40 space-y-1">
            <label class="text-[10px] text-amber-300 font-bold uppercase tracking-wider block font-imperial">
              ✨ Élément béni (-1 XP par rang sur les 2 Traits liés) :
            </label>
            <select onchange="updateElementalBlessingSelection(${i}, this.value)" class="w-full p-1.5 rounded text-xs bg-[#0d0b0b] border border-stone-800 text-amber-200 font-bold">
              <option value="earth" ${curElem === "earth" ? "selected" : ""}>Terre (Constitution & Volonté)</option>
              <option value="water" ${curElem === "water" ? "selected" : ""}>Eau (Force & Perception)</option>
              <option value="air" ${curElem === "air" ? "selected" : ""}>Air (Réflexes & Intuition)</option>
              <option value="fire" ${curElem === "fire" ? "selected" : ""}>Feu (Agilité & Intelligence)</option>
            </select>
          </div>
        `;
      }

      if (isDiff) {
        const currentDiffId = a.differentSchoolId || getSelectedSchoolObject()?.school?.id || (allSchools[0]?.id || "");
        const diffOptionsHtml = buildGroupedSchoolOptionsHtml(currentDiffId, currentClanKey);

        extraHtml += `
          <div class="mt-2 p-2.5 rounded bg-stone-950 border border-emerald-500/40 space-y-1.5">
            <span class="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block font-imperial">
              🎓 École suivie (autre Famille ou autre Clan — remplace l'école initiale) :
            </span>
            <select onchange="updateDifferentSchoolSelection(${i}, this.value)" class="w-full p-2.5 rounded font-medium text-xs">
              ${diffOptionsHtml}
            </select>
            <div class="text-[10px] text-stone-400 italic">
              Applique le bonus de trait, l'honneur, les 7 compétences et les techniques de cette école tout en gardant votre Clan et votre Famille.
            </div>
          </div>
        `;
      }

      if (isMulti) {
        const primarySch = getSelectedSchoolObject()?.school;
        const primaryArchetype = getSchoolArchetype(primarySch);
        const compatSchools = getCompatibleMultipleSchools(primarySch, allSchools);
        let currentSecId = a.secondarySchoolId || (compatSchools[0]?.id || "");
        const secCandidate = compatSchools.find(s => s.id === currentSecId);
        if (!secCandidate && compatSchools[0]) {
          currentSecId = compatSchools[0].id;
          a.secondarySchoolId = currentSecId;
          a.secondarySchoolName = `${compatSchools[0].name} (${compatSchools[0].clanName})`;
        }
        const currentSecRank = a.secondarySchoolRank || 1;
        const schoolOptionsHtml = buildGroupedSchoolOptionsHtml(
          currentSecId,
          currentClanKey,
          (candidate) => isSchoolCompatibleForMultiple(primarySch, candidate)
        );
        const compatRuleHint = (primaryArchetype === "bushi" || primaryArchetype === "ninja")
          ? "⛔ Écoles de Shugenja masquées (règle L5R 4e : incompatible Bushi / Shugenja)."
          : (primaryArchetype === "shugenja"
              ? "⛔ Écoles de Bushi / Ninja masquées (règle L5R 4e : incompatible Shugenja / Bushi)."
              : "Règle L5R 4e : choisissez votre seconde école compatible.");

        extraHtml += `
          <div class="mt-2 p-2.5 rounded bg-stone-950 border border-amber-500/40 space-y-2">
            <span class="text-[10px] text-amber-300 font-bold uppercase tracking-wider block font-imperial">
              Configuration de la Seconde École :
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div class="sm:col-span-2">
                <label class="text-[9px] text-stone-400 block mb-0.5">École suivie :</label>
                <select id="sel-secondary-school-${i}" onchange="updateSecondarySchoolSelection(${i}, this.value, undefined)" class="w-full p-2.5 rounded font-medium text-xs">
                  ${schoolOptionsHtml}
                </select>
              </div>
              <div>
                <label class="text-[9px] text-stone-400 block mb-0.5">Rang atteint :</label>
                <select onchange="updateSecondarySchoolSelection(${i}, undefined, this.value)" class="w-full p-2.5 rounded font-medium text-xs text-center font-bold">
                  <option value="1" ${currentSecRank === 1 ? 'selected' : ''}>Rang 1</option>
                  <option value="2" ${currentSecRank === 2 ? 'selected' : ''}>Rang 2</option>
                  <option value="3" ${currentSecRank === 3 ? 'selected' : ''}>Rang 3</option>
                  <option value="4" ${currentSecRank === 4 ? 'selected' : ''}>Rang 4</option>
                  <option value="5" ${currentSecRank === 5 ? 'selected' : ''}>Rang 5</option>
                </select>
              </div>
            </div>
            <div class="text-[10px] text-amber-300/80 italic">${compatRuleHint}</div>
          </div>
        `;
      }

      return `
        <div class="p-2.5 rounded-lg bg-black/50 border border-emerald-900/40 flex flex-col gap-1">
          <div class="flex justify-between items-center gap-2">
            <span class="text-emerald-300 font-bold">${a.name}</span>
            <div class="flex items-center gap-2 shrink-0">
              <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">${effCost} XP</span>
              <button type="button" onclick="removeAdv(${i})" class="text-red-400 font-bold hover:text-red-300 px-1 cursor-pointer">✕</button>
            </div>
          </div>
          ${desc ? `<p class="text-[11px] text-stone-400 italic leading-snug">« ${desc} »</p>` : ''}
          ${rule ? `<p class="text-[11px] text-amber-200/90 leading-snug">⚖️ ${rule}</p>` : ''}
          ${extraHtml}
        </div>
      `;
    }).join('');
  }

  const disadvContainer = document.getElementById('disadv-container');
  if (disadvContainer) {
    disadvContainer.innerHTML = disadvantagesList.map((d, i) => {
      const ref = resolveCatalogDisadvantage(d.id || d.name) || d;
      const effGain = getEffectiveDisadvGain(ref);
      d.gain = effGain;
      const desc = d.desc || ref.desc || "";
      const rule = d.rule || ref.rule || "";

      return `
        <div class="p-2.5 rounded-lg bg-black/50 border border-rose-900/40 flex flex-col gap-1">
          <div class="flex justify-between items-center gap-2">
            <span class="text-rose-300 font-bold">${d.name}</span>
            <div class="flex items-center gap-2 shrink-0">
              <span class="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px]">+${effGain} XP</span>
              <button type="button" onclick="removeDisadv(${i})" class="text-red-400 font-bold hover:text-red-300 px-1 cursor-pointer">✕</button>
            </div>
          </div>
          ${desc ? `<p class="text-[11px] text-stone-400 italic leading-snug">« ${desc} »</p>` : ''}
          ${rule ? `<p class="text-[11px] text-rose-200/90 leading-snug">⚖️ ${rule}</p>` : ''}
        </div>
      `;
    }).join('');
  }

  updateDisadvButtonState();
}

function renderSkills() {
  const container = document.getElementById('skills-list');
  if (!container) return;

  const catalogSkills = getSkills();

  container.innerHTML = currentSkills.map((sk, idx) => {
    if (sk.isChoice && !sk.chosen) {
      let filtered = catalogSkills;
      if (sk.choiceFilter) {
        const targetType = sk.choiceFilter.toLowerCase();
        filtered = catalogSkills.filter(s => {
          const t = (s.type || "").toLowerCase();
          if (targetType === "noble" || targetType === "haute") {
            return t === "noble" || t === "haute";
          }
          return t === targetType;
        });
      }
      filtered = filtered.filter(s => !currentSkills.some(cs => (cs.chosen || !cs.isChoice) && cs.name === s.name));

      const optionsHtml = filtered.map(s =>
        `<option value="${s.name}">${s.name} (${s.type} - ${s.trait})</option>`
      ).join('');

      return `
        <div class="p-2.5 rounded bg-amber-950/30 border-2 border-dashed border-amber-500/70 flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-extrabold uppercase tracking-wide">
              Choix École (Gratuit Rang 1)
            </span>
            <span class="text-[10px] text-amber-300 italic">${sk.originalPlaceholder || sk.name}</span>
          </div>
          <select onchange="chooseSchoolSkill(${idx}, this.value)" class="w-full p-1.5 rounded text-xs bg-stone-900 border border-amber-500/60 text-amber-200 font-bold focus:ring-1 focus:ring-amber-400">
            <option value="">-- Choisir une compétence (${sk.choiceFilter || 'Libre'}) --</option>
            ${optionsHtml}
          </select>
        </div>
      `;
    }

    const isChoiceActive = sk.isChoice && sk.chosen;
    const masteriesHtml = getMasteriesHtml(sk.name, sk.rank);
    const catMeta = catalogSkills.find(c => c.name === sk.name) || {};
    const safeSkillName = (sk.name || "").replace(/'/g, "\\'");
    const traitLabel = catMeta.trait || sk.trait || "Agilité";
    const nextRank = (parseInt(sk.rank, 10) || 0) + 1;

    return `
      <div class="p-2.5 rounded bg-black/60 border ${isChoiceActive ? 'border-amber-500/50' : 'border-stone-800'} flex flex-col gap-1.5" data-skill-card="${idx}" data-skill-name="${(sk.name || '').replace(/"/g, '&quot;')}" data-skill-trait="${traitLabel.replace(/"/g, '&quot;')}">
        <div class="flex items-center justify-between gap-2">
          <div class="flex-1 min-w-0">
            <div class="truncate">
              <span class="font-bold text-amber-200">${sk.name}</span>
              ${sk.isSchool ? `<span class="text-[9px] px-1 rounded bg-amber-950 text-amber-400 ml-1 border border-amber-900">${isChoiceActive ? 'École (Choix)' : 'École'}</span>` : ''}
              ${isChoiceActive ? `<button onclick="reopenSkillChoice(${idx})" title="Changer de compétence pour cet emplacement" class="text-[10px] text-stone-400 hover:text-amber-300 underline ml-1.5 cursor-pointer">⇄ Changer</button>` : ''}
            </div>
            <div class="flex items-center gap-2 mt-0.5 text-[10px] text-stone-400">
              <span>${traitLabel}</span>
              <button type="button" data-skill-pool="${idx}" onclick="if(window.rollSkillFromCard) window.rollSkillFromCard(${idx})" title="Lancer le jet de cette compétence" class="px-1.5 py-0.2 rounded bg-stone-900 hover:bg-amber-950/60 border border-stone-700 hover:border-amber-500/50 text-amber-300 font-bold font-mono transition cursor-pointer">🎲 ${sk.rank}g2</button>
              <span data-skill-nextxp="${idx}" class="text-stone-500 font-mono">${nextRank <= 10 ? `+1 = ${nextRank} XP` : 'Max'}</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <label class="text-[10px] text-stone-400 flex items-center gap-1">
              <input type="checkbox" ${sk.spec ? 'checked' : ''} onchange="toggleSkillSpec(${idx})" class="rounded"> Spé (+2 XP)
            </label>

            <div class="flex items-center gap-1 ml-1">
              <button type="button" onclick="adjustSkillRank(${idx}, -1)" class="w-6 h-6 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-800 rounded font-bold flex items-center justify-center text-xs cursor-pointer">-</button>
              <input type="number" min="${sk.isSchool ? '1' : '0'}" max="10" value="${sk.rank}" oninput="changeSkillRank(${idx}, this.value)" class="w-10 p-1 rounded text-center font-bold text-amber-300 text-xs">
              <button type="button" onclick="adjustSkillRank(${idx}, 1)" class="w-6 h-6 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-800 rounded font-bold flex items-center justify-center text-xs cursor-pointer">+</button>
            </div>

            <button onclick="removeSkill(${idx})" title="${isChoiceActive ? 'Réinitialiser ce choix' : 'Supprimer'}" class="text-stone-500 hover:text-red-400 font-bold px-1 ml-0.5 cursor-pointer">✕</button>
          </div>
        </div>

        ${masteriesHtml}
      </div>
    `;
  }).join('');
}

function adjustSkillRank(idx, delta) {
  const sk = currentSkills[idx];
  if (!sk) return;
  const minRank = sk.isSchool ? 1 : 0;
  let newRank = (parseInt(sk.rank) || 0) + delta;
  if (newRank < minRank) newRank = minRank;
  if (newRank > 10) newRank = 10;
  sk.rank = newRank;
  renderSkills();
  updateAll();
}

function adjustTrait(traitId, delta) {
  const input = document.getElementById(traitId);
  if (!input) return;
  const min = parseInt(input.min) || 2;
  const max = parseInt(input.max) || 6;
  let val = (parseInt(input.value) || 2) + delta;
  if (val < min) val = min;
  if (val > max) val = max;
  input.value = val;
  updateAll();
}

function chooseSchoolSkill(idx, skillName) {
  if (!skillName) return;
  const sk = currentSkills[idx];
  if (!sk) return;
  sk.name = skillName;
  sk.chosen = true;
  sk.rank = 1;
  sk.spec = false;
  renderSkills();
  initCatalogSelectors();
  updateAll();
}

function reopenSkillChoice(idx) {
  const sk = currentSkills[idx];
  if (!sk) return;
  sk.name = sk.originalPlaceholder || "Une compétence au choix";
  sk.chosen = false;
  sk.rank = 1;
  sk.spec = false;
  renderSkills();
  initCatalogSelectors();
  updateAll();
}

function addSkillFromCatalog() {
  const name = document.getElementById('sel-add-skill').value;
  if (!name) return;

  const normalizeSkill = (str) => (str || "").split('(')[0].trim().toLowerCase();
  const targetRoot = normalizeSkill(name);

  if (currentSkills.some(s => (s.chosen || !s.isChoice) && normalizeSkill(s.name) === targetRoot)) {
    alert(`La compétence « ${name} » est déjà maîtrisée par votre personnage.`);
    return;
  }

  const catalogSkill = getSkills().find(s => s.name === name);
  const openChoiceIdx = currentSkills.findIndex(s => {
    if (!s.isChoice || s.chosen) return false;
    if (!s.choiceFilter) return true;
    const t = (catalogSkill?.type || "").toLowerCase();
    const f = s.choiceFilter.toLowerCase();
    if (f === "noble" || f === "haute") return t === "noble" || t === "haute";
    return t === f;
  });

  if (openChoiceIdx !== -1) {
    chooseSchoolSkill(openChoiceIdx, name);
    return;
  }

  currentSkills.push({
    name,
    rank: 1,
    spec: false,
    isSchool: false,
    isChoice: false,
    chosen: true,
    originalPlaceholder: null
  });
  renderSkills();
  initCatalogSelectors();
  updateAll();
}

function removeSkill(idx) {
  const sk = currentSkills[idx];
  if (!sk) return;

  if (sk.isChoice) {
    reopenSkillChoice(idx);
    return;
  }

  if (sk.isSchool) {
    if (!confirm(`« ${sk.name} » est une compétence fondamentale de votre école. Voulez-vous vraiment la retirer ?`)) {
      return;
    }
  }

  currentSkills.splice(idx, 1);
  renderSkills();
  initCatalogSelectors();
  updateAll();
}

function changeSkillRank(idx, val) {
  const sk = currentSkills[idx];
  if (!sk) return;
  const minRank = sk.isSchool ? 1 : 0;
  sk.rank = Math.max(minRank, parseInt(val) || minRank);
  renderSkills();
  updateAll();
}

function toggleSkillSpec(idx) {
  if (currentSkills[idx]) {
    currentSkills[idx].spec = !currentSkills[idx].spec;
    updateAll();
  }
}

function updateStickyName() {
  const nameInput = document.getElementById('pc-name');
  const stickyName = document.getElementById('sticky-pc-name');
  if (nameInput && stickyName) {
    stickyName.textContent = nameInput.value.trim() || "Samouraï";
  }
}

function generateRandomName(gender) {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const familyName = clans[clanKey]?.families?.[famIdx]?.name || "Samouraï";

  const list = ROKUGANI_NAMES[gender] || ROKUGANI_NAMES['m'];
  if (!list || !list.length) return;
  const pick = list[Math.floor(Math.random() * list.length)];

  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    nameInput.value = nameOrderWestern ? `${pick.n} ${familyName}` : `${familyName} ${pick.n}`;
  }

  const meaningEl = document.getElementById('name-meaning');
  if (meaningEl) {
    meaningEl.textContent = `Signification : ${pick.m}`;
  }

  updateStickyName();
  autoSaveCharacterDraft();
}

function toggleNameOrder() {
  nameOrderWestern = !nameOrderWestern;
  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    const val = nameInput.value.trim();
    const parts = val.split(' ');
    if (parts.length >= 2) {
      const formatted = `${parts.slice(1).join(' ')} ${parts[0]}`;
      nameInput.value = formatted;
    }
  }
  updateStickyName();
  autoSaveCharacterDraft();
}

// =============================================================================
// 5. CALCULS PURS & DYNAMIQUES 4E ÉDITION (TICKETS #17, #18 & #21)
// =============================================================================
function calculateRings(traits = {}) {
  const sta = parseInt(traits.sta ?? traits.stamina, 10) || 2;
  const wil = parseInt(traits.wil ?? traits.willpower, 10) || 2;
  const str = parseInt(traits.str ?? traits.strength, 10) || 2;
  const per = parseInt(traits.per ?? traits.perception, 10) || 2;
  const ref = parseInt(traits.ref ?? traits.reflexes, 10) || 2;
  const awa = parseInt(traits.awa ?? traits.awareness, 10) || 2;
  const agi = parseInt(traits.agi ?? traits.agility, 10) || 2;
  const int = parseInt(traits.int ?? traits.intelligence, 10) || 2;
  const voi = parseInt(traits.voi ?? traits.void ?? traits.voidRing, 10) || 2;

  const earth = Math.min(sta, wil);
  const water = Math.min(str, per);
  const air = Math.min(ref, awa);
  const fire = Math.min(agi, int);
  const voidRing = voi;
  const sumRings = earth + water + air + fire + voidRing;

  return { earth, water, air, fire, void: voidRing, sumRings };
}

function calculateTraitXpCost(targetVal, baseStart = 2, isBlessed = false) {
  const target = parseInt(targetVal, 10) || 2;
  const start = parseInt(baseStart, 10) || 2;
  if (target <= start) return 0;

  let xp = 0;
  for (let r = start + 1; r <= target; r++) {
    const stepCost = isBlessed ? Math.max(1, (r * 4) - 1) : (r * 4);
    xp += stepCost;
  }
  return xp;
}

function calculateVoidXpCost(targetVal, baseVoid = 2, isEnlightened = false) {
  const target = parseInt(targetVal, 10) || 2;
  const start = parseInt(baseVoid, 10) || 2;
  if (target <= start) return 0;

  let xp = 0;
  for (let r = start + 1; r <= target; r++) {
    const stepCost = isEnlightened ? Math.max(1, (r * 6) - 2) : (r * 6);
    xp += stepCost;
  }
  return xp;
}

function calculateSkillXpCost(rankVal, options = {}) {
  const rank = parseInt(rankVal, 10) || 0;
  const isSchool = Boolean(options.isSchool);
  const spec = Boolean(options.spec);
  const isProdigy = Boolean(options.isProdigy);
  const isObtuse = Boolean(options.isObtuse);
  const isHighSkill = Boolean(options.isHighSkill);
  const isExemptHigh = Boolean(options.isExemptHigh);

  const start = isSchool ? 1 : 0;
  let xp = 0;

  if (rank > start) {
    for (let r = start + 1; r <= rank; r++) {
      let stepCost = (isSchool && isProdigy) ? Math.max(1, r - 1) : r;
      if (isObtuse && isHighSkill && !isExemptHigh) {
        stepCost *= 2;
      }
      xp += stepCost;
    }
  }
  if (spec) xp += 2;
  return xp;
}

function calculateInsightAndRank(ringsOrSum, skills = []) {
  const sumRings = typeof ringsOrSum === "number"
    ? ringsOrSum
    : ((ringsOrSum?.sumRings !== undefined)
      ? ringsOrSum.sumRings
      : ((ringsOrSum?.earth || 2) + (ringsOrSum?.water || 2) + (ringsOrSum?.air || 2) + (ringsOrSum?.fire || 2) + (ringsOrSum?.void || 2)));

  const sumSkills = Array.isArray(skills)
    ? skills.reduce((acc, sk) => {
        if (sk && sk.isChoice && !sk.chosen) return acc;
        return acc + (parseInt(typeof sk === "object" ? sk.rank : sk, 10) || 0);
      }, 0)
    : (parseInt(skills, 10) || 0);

  const insight = (sumRings * 10) + sumSkills;
  let insightRank = 1;
  if (insight >= 225) insightRank = 5;
  else if (insight >= 200) insightRank = 4;
  else if (insight >= 175) insightRank = 3;
  else if (insight >= 150) insightRank = 2;

  return { sumRings, sumSkills, insight, insightRank };
}

function calculateArmorTN(reflexes, armorBonus = 0, modifiersBonus = 0) {
  const ref = parseInt(reflexes, 10) || 2;
  const arm = parseInt(armorBonus, 10) || 0;
  const mod = parseInt(modifiersBonus, 10) || 0;
  return 5 + (5 * ref) + arm + mod;
}

function calculateWoundThresholds(earthRing, options = {}) {
  const earth = parseInt(earthRing, 10) || 2;
  const isDaidoji = Boolean(options.isDaidoji);
  const honorScore = parseFloat(options.honorScore ?? 0) || 0;

  let multiplier = earth;
  if (isDaidoji && Math.floor(honorScore) > earth) {
    multiplier = Math.floor(honorScore);
  }

  const healthy = Math.max(1, multiplier * 5);
  const step = Math.max(1, multiplier * 2);

  return { multiplier, healthy, step };
}

function parseRollKeepFormula(formulaStr) {
  const str = String(formulaStr || "").trim();
  const match = str.match(/(\d+)\s*[gk]\s*(\d+)(?:\s*([+-])\s*(\d+))?/i);
  if (!match) {
    return { rolled: 0, kept: 0, bonus: 0 };
  }
  const rolled = parseInt(match[1], 10) || 0;
  const kept = parseInt(match[2], 10) || 0;
  let bonus = 0;
  if (match[4] !== undefined) {
    const sign = match[3] === "-" ? -1 : 1;
    bonus = sign * (parseInt(match[4], 10) || 0);
  }
  return { rolled, kept, bonus };
}

function applyTenDiceRule(rollX, keepY, bonus = 0) {
  let r = Math.max(0, parseInt(rollX, 10) || 0);
  let k = Math.max(0, parseInt(keepY, 10) || 0);
  let b = parseInt(bonus, 10) || 0;

  if (k > r) k = r;

  if (r > 10) {
    let excessR = r - 10;
    r = 10;
    if (k < 10) {
      const canConvert = Math.min(Math.floor(excessR / 2), 10 - k);
      k += canConvert;
      excessR -= canConvert * 2;
    }
    if (k >= 10 && excessR > 0) {
      b += excessR * 2;
    }
  }

  if (k > 10) {
    const excessK = k - 10;
    k = 10;
    b += excessK * 2;
  }

  return { rolled: r, kept: k, bonus: b };
}

function simulateRollAndKeep(rollX, keepY, bonus = 0, options = {}) {
  const x = Math.max(0, parseInt(rollX, 10) || 0);
  const y = Math.max(0, parseInt(keepY, 10) || 0);
  const b = parseInt(bonus, 10) || 0;
  const explode = options.explode !== undefined ? Boolean(options.explode) : true;
  const spec = Boolean(options.spec);
  const maxExplosions = options.maxExplosions !== undefined ? parseInt(options.maxExplosions, 10) : 5;
  const rng = typeof options.rng === "function" ? options.rng : Math.random;

  const rollD10 = () => Math.floor(rng() * 10) + 1;

  const dice = [];
  for (let i = 0; i < x; i++) {
    let dieVal = rollD10();
    if (spec && dieVal === 1) {
      dieVal = rollD10();
    }
    let totalDie = dieVal;
    let explodedTimes = 0;
    while (explode && dieVal === 10 && explodedTimes < maxExplosions) {
      dieVal = rollD10();
      totalDie += dieVal;
      explodedTimes++;
    }
    dice.push({ value: totalDie, exploded: explodedTimes > 0 });
  }

  dice.sort((a, b) => b.value - a.value);
  const kept = dice.slice(0, y);
  const dropped = dice.slice(y);
  const total = kept.reduce((acc, d) => acc + d.value, 0) + b;

  return { dice, kept, dropped, bonus: b, total };
}

function updateAll() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  const famIdx = document.getElementById('sel-family')?.value;

  const fam = clans[clanKey]?.families[famIdx];
  const schObj = getSelectedSchoolObject();
  const sch = schObj?.school;

  const sta = parseInt(document.getElementById('trait-stamina')?.value) || 2;
  const wil = parseInt(document.getElementById('trait-willpower')?.value) || 2;
  const str = parseInt(document.getElementById('trait-strength')?.value) || 2;
  const per = parseInt(document.getElementById('trait-perception')?.value) || 2;
  const ref = parseInt(document.getElementById('trait-reflexes')?.value) || 2;
  const awa = parseInt(document.getElementById('trait-awareness')?.value) || 2;
  const agi = parseInt(document.getElementById('trait-agility')?.value) || 2;
  const int = parseInt(document.getElementById('trait-intelligence')?.value) || 2;
  const voi = parseInt(document.getElementById('trait-void')?.value) || 2;

  // 1. Anneaux
  const rings = calculateRings({ sta, wil, str, per, ref, awa, agi, int, voi });
  const rEarth = rings.earth;
  const rWater = rings.water;
  const rAir = rings.air;
  const rFire = rings.fire;
  const rVoid = rings.void;

  document.getElementById('ring-earth').textContent = rEarth;
  document.getElementById('ring-water').textContent = rWater;
  document.getElementById('ring-air').textContent = rAir;
  document.getElementById('ring-fire').textContent = rFire;
  document.getElementById('ring-void').textContent = rVoid;

  const { byId: advById, byName: advByName } = getIndexedAdvMaps();
  const { byId: disById, byName: disByName } = getIndexedDisadvMaps();

  const hasAdv = (impactName) => advantagesList.some(a => {
    if (a.impact === impactName || a.id === impactName) return true;
    const found = (a.id && advById.get(a.id)) || (a.name && advByName.get(a.name));
    if (found && (found.impact === impactName || found.id === impactName)) return true;
    const n = normalizeFold(a.name);
    if (impactName === "enlightened" && n.includes("illumine")) return true;
    if (impactName === "prodigy" && n.includes("prodige")) return true;
    if (impactName === "large" && n.includes("grand")) return true;
    if (impactName === "lightning_reflexes" && n.includes("vitesse eclair")) return true;
    if (impactName === "quick" && n.includes("vif (quick)")) return true;
    if (impactName === "quick_healer" && n.includes("guerison rapide")) return true;
    return false;
  });

  const hasDisadv = (impactName) => disadvantagesList.some(d => {
    if (d.impact === impactName || d.id === impactName) return true;
    const found = (d.id && disById.get(d.id)) || (d.name && disByName.get(d.name));
    if (found && (found.impact === impactName || found.id === impactName)) return true;
    const n = normalizeFold(d.name);
    if (impactName === "obtuse" && n.includes("esprit obtus")) return true;
    if (impactName === "small" && n.includes("petit")) return true;
    return false;
  });

  // Détection de l'élément choisi pour Bénédiction Élémentaire (Ticket #17)
  const hasElemBlessing = (ringKey) => {
    return advantagesList.some(a => {
      const found = (a.id && advById.get(a.id)) || (a.name && advByName.get(a.name));
      if (!isElementalBlessingAdv(a) && !isElementalBlessingAdv(found)) return false;
      const chosen = (a.chosenElement || "earth").toLowerCase();
      return chosen === ringKey;
    });
  };

  // 2. Budget XP (Traits, Vide, Compétences, Avantages, Katas & Kihos)
  let xpSpent = 0;
  let traitsXp = 0;
  const traitsBase = [
    { val: sta, ring: "earth", bonus: (fam?.trait === "Constitution" ? 1 : 0) + (sch?.trait === "Constitution" ? 1 : 0) },
    { val: wil, ring: "earth", bonus: (fam?.trait === "Volonté" ? 1 : 0) + (sch?.trait === "Volonté" ? 1 : 0) },
    { val: str, ring: "water", bonus: (fam?.trait === "Force" ? 1 : 0) + (sch?.trait === "Force" ? 1 : 0) },
    { val: per, ring: "water", bonus: (fam?.trait === "Perception" ? 1 : 0) + (sch?.trait === "Perception" ? 1 : 0) },
    { val: ref, ring: "air",   bonus: (fam?.trait === "Réflexes" ? 1 : 0) + (sch?.trait === "Réflexes" ? 1 : 0) },
    { val: awa, ring: "air",   bonus: (fam?.trait === "Intuition" ? 1 : 0) + (sch?.trait === "Intuition" ? 1 : 0) },
    { val: agi, ring: "fire",  bonus: (fam?.trait === "Agilité" ? 1 : 0) + (sch?.trait === "Agilité" ? 1 : 0) },
    { val: int, ring: "fire",  bonus: (fam?.trait === "Intelligence" ? 1 : 0) + (sch?.trait === "Intelligence" ? 1 : 0) }
  ];

  traitsBase.forEach(t => {
    const baseStart = 2 + t.bonus;
    const blessed = hasElemBlessing(t.ring);
    traitsXp += calculateTraitXpCost(t.val, baseStart, blessed);
  });

  const voidBonus = (fam?.trait === "Vide" ? 1 : 0) + (sch?.trait === "Vide" ? 1 : 0);
  const baseVoid = 2 + voidBonus;
  traitsXp += calculateVoidXpCost(voi, baseVoid, hasAdv("enlightened"));
  xpSpent += traitsXp;

  const isObtuse = hasDisadv("obtuse");
  const isProdigy = hasAdv("prodigy");
  const skillsByName = getIndexedSkillsMap();
  let skillsXp = 0;

  currentSkills.forEach(sk => {
    if (sk.isChoice && !sk.chosen) return;

    const catSk = skillsByName.get(sk.name);
    const sName = normalizeFold(sk.name);
    const sType = (sk.type || catSk?.type || "").toLowerCase();
    const isHighSkill = sType.includes("noble") || sType.includes("haute") || sType.includes("high");
    const isExemptHigh = sName.includes("enquete") || sName.includes("investigation") || sName.includes("medecine") || sName.includes("medicine");

    skillsXp += calculateSkillXpCost(sk.rank, {
      isSchool: sk.isSchool,
      spec: sk.spec,
      isProdigy,
      isObtuse,
      isHighSkill,
      isExemptHigh
    });
  });
  xpSpent += skillsXp;

  // Recalcul dynamique des coûts/gains d'Avantages & Désavantages selon le Clan/École (Ticket #18)
  advantagesList.forEach(a => {
    const ref = resolveCatalogAdvantage(a.id || a.name) || a;
    a.cost = getEffectiveAdvCost(ref);
  });
  disadvantagesList.forEach(d => {
    const ref = resolveCatalogDisadvantage(d.id || d.name) || d;
    d.gain = getEffectiveDisadvGain(ref);
  });

  let advCost = advantagesList.reduce((acc, a) => acc + (parseInt(a.cost) || 0), 0);
  document.getElementById('adv-cost-total').textContent = advCost;
  xpSpent += advCost;

  // Prise en compte du coût en XP des Katas & Kihos si la section 5 est utilisée
  let artsXp = 0;
  if (typeof window.characterKatas !== "undefined" && Array.isArray(window.characterKatas)) {
    artsXp = window.characterKatas.reduce((acc, k) => acc + (parseInt(k.cost ?? k.xpCost ?? k.mastery) || 0), 0);
    xpSpent += artsXp;
  }

  let rawDisadvGain = disadvantagesList.reduce((acc, d) => acc + (parseInt(d.gain) || 0), 0);
  let disadvGain = Math.min(rawDisadvGain, MAX_DISADVANTAGE_XP);
  document.getElementById('disadv-gain-total').textContent = disadvGain;

  const xpBreakdown = {
    traits: traitsXp,
    skills: skillsXp,
    advantages: advCost,
    arts: artsXp,
    disadvGain,
    disadvRawGain: rawDisadvGain,
    baseXP: parseInt(document.getElementById('base-xp-input')?.value, 10) || 40
  };

  const baseXPInput = document.getElementById('base-xp-input');
  const baseXP = baseXPInput ? (parseInt(baseXPInput.value) || 0) : 40;

  let totalXP = baseXP + disadvGain;
  let remainingXP = totalXP - xpSpent;

  document.getElementById('xp-total').textContent = totalXP;
  const remEl = document.getElementById('xp-remaining');
  remEl.textContent = remainingXP;
  remEl.className = remainingXP >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold";

  // 3. Insight & Rang d'École
  const { insight, insightRank } = calculateInsightAndRank(rings, currentSkills);

  document.getElementById('insight-display').innerHTML = `${insight} pts <span class="text-xs text-amber-400 font-bold">(Rang ${insightRank})</span>`;

  const stickySchool = document.getElementById('sticky-school-badge');
  if (stickySchool && sch) {
    stickySchool.textContent = schObj.isExternalClan ? `${sch.name} (${schObj.clanName})` : sch.name;
  }

  renderSchoolTechniques(insightRank);

  // 4. Jet pour Toucher
  const weapon1Name = document.getElementById('pc-weapon-1')?.value || "Katana";
  const weaponData = getEquipment().armes?.find(w => w.name === weapon1Name) || {
    name: weapon1Name,
    vd: "3g2",
    trait: "Agilité",
    skill: "Kenjutsu",
    type: "Médium"
  };

  const isRanged = (weaponData.type?.includes("Distance") || weaponData.skill?.includes("Arc") || weaponData.skill === "Kyujutsu");
  const atkTraitName = isRanged ? "Réflexes" : (weaponData.trait || "Agilité");
  const atkTraitVal = (atkTraitName === "Réflexes") ? ref : agi;
  const atkSkillName = weaponData.skill || (isRanged ? "Kyujutsu" : "Kenjutsu");

  const skillObj = currentSkills.find(s => {
    if (s.isChoice && !s.chosen) return false;
    const sName = s.name.toLowerCase();
    const wSkill = atkSkillName.toLowerCase();
    const wName = weaponData.name.toLowerCase();
    return sName.includes(wSkill) || wSkill.includes(sName) || sName.includes(wName);
  });

  const skillRank = skillObj ? skillObj.rank : 0;
  const hasSpec = skillObj ? skillObj.spec : false;

  let atkRoll = 0;
  let atkKeep = atkTraitVal;
  let atkDetails = [];

  if (skillRank > 0) {
    atkRoll = skillRank + atkTraitVal;
    atkDetails.push(`${skillObj.name} (${skillRank})`, `${atkTraitName} (${atkTraitVal})`);
  } else {
    atkRoll = atkTraitVal;
    atkDetails.push(`Non entraîné : ${atkTraitName} (${atkTraitVal}) sans explosion`);
  }

  if ((sch?.id === "bushi-hiruma" || sch?.name?.includes("Hiruma")) && !isRanged) {
    atkRoll += 1;
    atkDetails.push("Hiruma (+1g0)");
  }

  if (hasSpec) {
    atkDetails.push("Spé : relance les 1");
  }

  const atkStr = `${atkRoll}g${atkKeep}`;
  const atkDetailStr = `${weaponData.name} : ${atkDetails.join(' + ')}`;
  const stickyAtk = document.getElementById('sticky-atk');
  const stickyAtkDetail = document.getElementById('sticky-atk-detail');
  if (stickyAtk) stickyAtk.textContent = atkStr;
  if (stickyAtkDetail) {
    stickyAtkDetail.textContent = atkDetailStr;
    stickyAtkDetail.title = atkDetailStr;
  }

  // 5. Jet de Dégâts
  const vdParts = (weaponData.vd || "3g2").split('g');
  let dmgBaseRoll = parseInt(vdParts[0]) || 3;
  let dmgBaseKeep = parseInt(vdParts[1]) || 2;

  let dmgRoll = dmgBaseRoll;
  let dmgKeep = dmgBaseKeep;
  let dmgBonusStatic = 0;
  let dmgDetails = [`Arme (${weaponData.vd})`];

  if (!isRanged) {
    dmgRoll += str;
    dmgDetails.push(`Force (+${str}g0)`);
  } else {
    dmgRoll += 3;
    dmgDetails.push("Force d'Arc (+3g0)");
  }

  if ((sch?.id === "bushi-hida" || sch?.name?.includes("Hida")) && weaponData.type?.includes("Lourde")) {
    dmgRoll += 1;
    dmgDetails.push("Voie du Crabe (+1g0)");
  }

  if (hasAdv("large") && (weaponData.type?.includes("Grand") || weaponData.type?.includes("Lourd") || weaponData.type?.includes("2 mains"))) {
    dmgRoll += 1;
    dmgDetails.push("Grand (+1g0)");
  }

  if (hasDisadv("small") && !isRanged) {
    dmgRoll = Math.max(dmgKeep, dmgRoll - 1);
    dmgDetails.push("Petit (-1g0)");
  }

  const dmgStr = dmgBonusStatic > 0 ? `${dmgRoll}g${dmgKeep} + ${dmgBonusStatic}` : `${dmgRoll}g${dmgKeep}`;
  const dmgDetailStr = dmgDetails.join(' + ');
  const stickyDmg = document.getElementById('sticky-dmg');
  const stickyDmgDetail = document.getElementById('sticky-dmg-detail');
  if (stickyDmg) stickyDmg.textContent = dmgStr;
  if (stickyDmgDetail) {
    stickyDmgDetail.textContent = dmgDetailStr;
    stickyDmgDetail.title = dmgDetailStr;
  }

  // 6. Initiative (Insight + Réflexes g Réflexes)
  let initRoll = insightRank + ref;
  let initKeep = ref;
  let initStatic = 0;
  let initDetails = [`Insight ${insightRank} + Réfl. ${ref} (${insightRank + ref}g${ref})`];

  if (hasAdv("lightning_reflexes")) {
    initRoll += 1;
    initDetails.push("Vitesse Éclair (+1g0)");
  }

  if (hasAdv("quick")) {
    initStatic += rAir;
    initDetails.push(`Vif (+${rAir})`);
  }

  const iaiSkill = currentSkills.find(s => s.name.toLowerCase().includes("iaijutsu"));
  const iaiRank = iaiSkill ? iaiSkill.rank : 0;
  if ((sch?.id === "duelliste-kakita" || sch?.name?.includes("Kakita")) && iaiRank > 0) {
    initStatic += (iaiRank * 2);
    initDetails.push(`Voie de la Grue (+${iaiRank * 2})`);
  }

  if ((sch?.id === "bushi-bayushi" || sch?.name?.includes("Bayushi")) && iaiRank > 0) {
    initStatic += iaiRank;
    initDetails.push(`Voie du Scorpion (+${iaiRank})`);
  }

  const initStr = initStatic > 0 ? `${initRoll}g${initKeep} + ${initStatic}` : `${initRoll}g${initKeep}`;
  const initDetailStr = initDetails.join(' + ');
  const stickyInit = document.getElementById('sticky-init');
  const stickyInitDetail = document.getElementById('sticky-init-detail');
  if (stickyInit) stickyInit.textContent = initStr;
  if (stickyInitDetail) {
    stickyInitDetail.textContent = initDetailStr;
    stickyInitDetail.title = initDetailStr;
  }
  document.getElementById('stat-init').textContent = initStr;

  // 7. ND d'Armure
  const armorSelect = document.getElementById('pc-armor');
  const armorBonus = parseInt(armorSelect?.value) || 0;
  const armorName = armorSelect?.options[armorSelect.selectedIndex]?.text?.split('(')[0]?.trim() || "Armure";

  let baseArmor = 5 + (5 * ref);
  let armorDetails = [`Base (5)`, `Réfl. (+${5 * ref})`];

  if (armorBonus > 0) {
    armorDetails.push(`${armorName} (+${armorBonus})`);
  }

  const weapon2Name = document.getElementById('pc-weapon-2')?.value || "Aucune";
  let nitenBonus = 0;
  if ((sch?.id === "bushi-mirumoto" || sch?.name?.includes("Mirumoto")) && (weapon1Name.includes("Katana") || weapon2Name.includes("Wakizashi"))) {
    const kenSkill = currentSkills.find(s => s.name.toLowerCase().includes("kenjutsu"));
    nitenBonus = kenSkill ? kenSkill.rank : 1;
    armorDetails.push(`Niten (+${nitenBonus})`);
  }

  const finalArmorTN = baseArmor + armorBonus + nitenBonus;
  const armorDetailStr = armorDetails.join(' + ');
  const stickyArmor = document.getElementById('sticky-armor-tn');
  const stickyArmorDetail = document.getElementById('sticky-armor-detail');
  if (stickyArmor) stickyArmor.textContent = finalArmorTN;
  if (stickyArmorDetail) {
    stickyArmorDetail.textContent = armorDetailStr;
    stickyArmorDetail.title = armorDetailStr;
  }
  document.getElementById('stat-armor-tn').textContent = finalArmorTN;

  // Vitalité & Récupération
  let effSta = sta;
  if (hasAdv("quick_healer")) effSta += 2;
  document.getElementById('stat-heal').textContent = `${(effSta * 2) + insightRank} PV`;

  let woundBaseMultiplier = rEarth;
  const honorScore = parseFloat(document.getElementById('stat-honor')?.textContent || "4.5");
  if ((sch?.id === "guerrier-daidoji" || sch?.name?.includes("Daidoji")) && Math.floor(honorScore) > rEarth) {
    woundBaseMultiplier = Math.floor(honorScore);
  }

  const healthyWounds = Math.max(1, (woundBaseMultiplier * 5));
  const stepWounds = Math.max(1, (woundBaseMultiplier * 2));

  document.getElementById('w-0').textContent = `${healthyWounds} PV`;
  for (let i = 1; i <= 7; i++) {
    document.getElementById(`w-${i}`).textContent = `${stepWounds} PV`;
  }

  updateDisadvButtonState();
  updateAdvPreview();
  updateDisadvPreview();

  // Synchronisation avec export-carnet.js
  if (typeof window !== "undefined") {
    window.currentSkills = currentSkills;
    window.advantagesList = advantagesList;
    window.disadvantagesList = disadvantagesList;

    window.currentChar = {
      name: document.getElementById('pc-name')?.value || "Samouraï",
      clan: clans[clanKey]?.name || "Crabe",
      family: fam?.name || "",
      school: sch?.name || "École de bushi Hida",
      schoolId: sch?.id || "",
      schoolClanName: schObj?.clanName || "",
      isExternalSchool: !!schObj?.isExternalClan,
      traits: {
        stamina: sta, willpower: wil, strength: str, perception: per,
        reflexes: ref, awareness: awa, agility: agi, intelligence: int
      },
      voidRing: voi,
      voidPoints: voi,
      honor: honorScore,
      glory: 1.0,
      status: 1.0,
      xpTotal: totalXP,
      xpSpent: xpSpent,
      xpRemaining: remainingXP,
      xpBreakdown: xpBreakdown,
      skills: currentSkills,
      armor: {
        name: armorName,
        bonus: armorBonus,
        reduction: armorBonus === 10 ? 5 : (armorBonus === 5 ? 3 : 0),
        catalogId: armorBonus === 10 ? "heavy" : (armorBonus === 5 ? "light" : "none")
      },
      weapons: [
        { name: weapon1Name, skill: weaponData.skill, dr: weaponData.vd },
        ...(weapon2Name !== "Aucune" ? [{ name: weapon2Name }] : [])
      ],
      advantages: advantagesList.map(a => a.name).join(", "),
      advantagesList: advantagesList,
      disadvantages: disadvantagesList.map(d => d.name).join(", "),
      disadvantagesList: disadvantagesList,
      spells: (typeof window.characterSpells !== 'undefined') ? window.characterSpells : [],
      katas: (typeof window.characterKatas !== 'undefined') ? window.characterKatas : [],
      notes: document.getElementById('pc-outfit')?.value || ""
    };
    window.character = window.currentChar;
  }

  // Sauvegarde automatique du brouillon (debouncée) et notification UI
  scheduleAutoSaveDraft();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent('l5r-forge-updated', {
      detail: { xpSpent, totalXP, remainingXP, xpBreakdown, insight, insightRank, armorTN: finalArmorTN }
    }));
  }
}

// =============================================================================
// 6. PERSISTANCE : BROUILLON AUTO, DOJO LOCAL & EXPORT/IMPORT JSON (TICKET 1)
// =============================================================================
function collectCharacterData() {
  return {
    id: window.currentCharacterId || ('samurai_' + Date.now()),
    updatedAt: new Date().toISOString(),
    name: document.getElementById('pc-name')?.value?.trim() || "Samouraï",
    baseXP: document.getElementById('base-xp-input')?.value || "40",
    clan: document.getElementById('sel-clan')?.value || "crabe",
    family: document.getElementById('sel-family')?.value || "0",
    school: document.getElementById('sel-school')?.value || "",
    traits: {
      sta: document.getElementById('trait-stamina')?.value || 2,
      wil: document.getElementById('trait-willpower')?.value || 2,
      str: document.getElementById('trait-strength')?.value || 2,
      per: document.getElementById('trait-perception')?.value || 2,
      ref: document.getElementById('trait-reflexes')?.value || 2,
      awa: document.getElementById('trait-awareness')?.value || 2,
      agi: document.getElementById('trait-agility')?.value || 2,
      int: document.getElementById('trait-intelligence')?.value || 2,
      voi: document.getElementById('trait-void')?.value || 2
    },
    skills: currentSkills || [],
    advantages: advantagesList || [],
    disadvantages: disadvantagesList || [],
    spells: (typeof window.characterSpells !== 'undefined') ? window.characterSpells : [],
    katas: (typeof window.characterKatas !== 'undefined') ? window.characterKatas : [],
    affinity: document.getElementById('shugenja-affinity')?.value || "aucune",
    deficiency: document.getElementById('shugenja-deficiency')?.value || "aucune",
    armor: document.getElementById('pc-armor')?.value || "10",
    weapon1: document.getElementById('pc-weapon-1')?.value || "Katana",
    weapon2: document.getElementById('pc-weapon-2')?.value || "Aucune",
    outfit: document.getElementById('pc-outfit')?.value || ""
  };
}

let _autoSaveDraftTimer = null;
let _hasPendingDraftSave = false;

function autoSaveCharacterDraft() {
  if (isBootstrapping || window.isRestoringCharacter) return;
  _hasPendingDraftSave = false;
  if (_autoSaveDraftTimer !== null) {
    clearTimeout(_autoSaveDraftTimer);
    _autoSaveDraftTimer = null;
  }
  try {
    const data = collectCharacterData();
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Impossible d'auto-sauvegarder le brouillon :", e);
  }
}

function scheduleAutoSaveDraft(delay = 250) {
  if (isBootstrapping || window.isRestoringCharacter) return;
  _hasPendingDraftSave = true;
  if (_autoSaveDraftTimer !== null) clearTimeout(_autoSaveDraftTimer);
  _autoSaveDraftTimer = setTimeout(() => {
    _autoSaveDraftTimer = null;
    autoSaveCharacterDraft();
  }, delay);
}

if (typeof window !== "undefined") {
  window.addEventListener('pagehide', () => {
    if (_hasPendingDraftSave) autoSaveCharacterDraft();
  });
}

function applyCharacterDataToSheet(d) {
  if (!d) return;
  window.isRestoringCharacter = true;
  try {
    window.currentCharacterId = d.id || ('samurai_' + Date.now());
    if (d.baseXP !== undefined) {
      const baseInput = document.getElementById('base-xp-input');
      if (baseInput) baseInput.value = d.baseXP;
    }

    advantagesList = d.advantages || [];
    disadvantagesList = d.disadvantages || [];

    if (d.clan && document.getElementById('sel-clan')) {
      document.getElementById('sel-clan').value = d.clan;
      onClanChange();
    }
    if (d.family !== undefined && document.getElementById('sel-family')) {
      document.getElementById('sel-family').value = d.family;
    }

    const resolved = resolveSchoolByRef(d.school, d.clan);
    const targetSchoolId = resolved?.school?.id || d.school;
    updateSchoolOptions(targetSchoolId);
    if (targetSchoolId && document.getElementById('sel-school')) {
      document.getElementById('sel-school').value = targetSchoolId;
    }
    resetSheetToNewSelection(true);

    if (d.name && document.getElementById('pc-name')) {
      document.getElementById('pc-name').value = d.name;
      updateStickyName();
    }

    if (d.traits) {
      document.getElementById('trait-stamina').value = d.traits.sta ?? 2;
      document.getElementById('trait-willpower').value = d.traits.wil ?? 2;
      document.getElementById('trait-strength').value = d.traits.str ?? 2;
      document.getElementById('trait-perception').value = d.traits.per ?? 2;
      document.getElementById('trait-reflexes').value = d.traits.ref ?? 2;
      document.getElementById('trait-awareness').value = d.traits.awa ?? 2;
      document.getElementById('trait-agility').value = d.traits.agi ?? 2;
      document.getElementById('trait-intelligence').value = d.traits.int ?? 2;
      document.getElementById('trait-void').value = d.traits.voi ?? 2;
    }

    currentSkills = d.skills || [];
    advantagesList = d.advantages || [];
    disadvantagesList = d.disadvantages || [];

    if (typeof window.characterSpells !== 'undefined') window.characterSpells = d.spells || [];
    if (typeof window.characterKatas !== 'undefined') window.characterKatas = d.katas || [];
    if (d.affinity && document.getElementById('shugenja-affinity')) {
      document.getElementById('shugenja-affinity').value = d.affinity;
    }
    if (d.deficiency && document.getElementById('shugenja-deficiency')) {
      document.getElementById('shugenja-deficiency').value = d.deficiency;
    }

    if (d.armor && document.getElementById('pc-armor')) document.getElementById('pc-armor').value = d.armor;
    if (d.weapon1 && document.getElementById('pc-weapon-1')) document.getElementById('pc-weapon-1').value = d.weapon1;
    if (d.weapon2 && document.getElementById('pc-weapon-2')) document.getElementById('pc-weapon-2').value = d.weapon2;
    if (d.outfit && document.getElementById('pc-outfit')) document.getElementById('pc-outfit').value = d.outfit;

    renderSkills();
    renderAdvDisadv();
    if (typeof window.renderCharacterSpells === 'function') window.renderCharacterSpells();
    if (typeof window.renderCharacterKatas === 'function') window.renderCharacterKatas();
    initCatalogSelectors();
  } finally {
    window.isRestoringCharacter = false;
    updateAll();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('l5r-forge-selection-changed', { detail: { source: 'restore' } }));
    }
  }
}

// Permet de forcer la création d'une nouvelle entrée ou de mettre à jour l'existante
function saveCharacterToDojo(forceNew = false) {
  try {
    const data = collectCharacterData();

    // Si on force un nouveau personnage, on génère un identifiant unique tout neuf
    if (forceNew || !window.currentCharacterId) {
      data.id = 'samurai_' + Date.now();
      window.currentCharacterId = data.id;
    } else {
      data.id = window.currentCharacterId;
    }

    const rawDojo = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem('l5r_saved_characters');
    let dojoList = rawDojo ? JSON.parse(rawDojo) : [];
    if (!Array.isArray(dojoList)) dojoList = [];

    // Noms par défaut à ne jamais considérer comme des doublons
    const isGenericName = !data.name || ["samouraï", "samourai", "samouraï sans nom"].includes(data.name.toLowerCase().trim());

    // Recherche par ID en priorité ; le nom ne sert de doublon que s'il est personnalisé et qu'on ne force pas un nouveau perso
    const existingIndex = dojoList.findIndex(c => {
      if (c.id === data.id) return true;
      if (!forceNew && !isGenericName && (c.name || "").toLowerCase().trim() === data.name.toLowerCase().trim()) {
        return true;
      }
      return false;
    });

    if (existingIndex !== -1 && !forceNew) {
      data.id = dojoList[existingIndex].id;
      window.currentCharacterId = data.id;
      dojoList[existingIndex] = data;
    } else {
      dojoList.unshift(data); // Ajoute en tête de liste
    }

    const serialized = JSON.stringify(dojoList);
    localStorage.setItem(DOJO_STORAGE_KEY, serialized);
    localStorage.setItem('l5r_saved_characters', serialized);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));

    if (typeof renderDojoList === 'function') renderDojoList();
    if (typeof renderDojoRoster === 'function') renderDojoRoster();

    notifyForgeUser(`« ${data.name} » enregistré dans votre Dojo !`, 'success');
  } catch (err) {
    console.error(err);
    notifyForgeUser("Erreur lors de l'enregistrement dans le navigateur.", 'error');
  }
}

// Fonction pour démarrer un nouveau personnage vierge sans écraser le précédent
function startNewCharacter() {
  if (confirm("Commencer un nouveau personnage ? La fiche sera réinitialisée.")) {
    window.currentCharacterId = null;
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    const nameInput = document.getElementById('pc-name');
    if (nameInput) nameInput.value = "";
    
    // Réinitialise avec les valeurs par défaut
    if (typeof resetCharacter === 'function') {
      resetCharacter();
    } else if (typeof onClanChange === 'function') {
      onClanChange();
    }
    window.currentCharacterId = 'samurai_' + Date.now();
  }
}

function loadCharacterFromDojo(idOrIndex) {
  try {
    const rawDojo = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem('l5r_saved_characters');
    const dojoList = rawDojo ? JSON.parse(rawDojo) : [];
    const found = dojoList.find(c => c.id === idOrIndex) || dojoList[idOrIndex];
    if (!found) return;
    applyCharacterDataToSheet(found);
  } catch (e) {
    console.error("Erreur de chargement depuis le Dojo :", e);
  }
}

function deleteCharacterFromDojo(idOrIndex) {
  try {
    const rawDojo = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem('l5r_saved_characters');
    let dojoList = rawDojo ? JSON.parse(rawDojo) : [];
    dojoList = dojoList.filter((c, idx) => c.id !== idOrIndex && idx !== idOrIndex);
    const serialized = JSON.stringify(dojoList);
    localStorage.setItem(DOJO_STORAGE_KEY, serialized);
    localStorage.setItem('l5r_saved_characters', serialized);
    renderDojoList();
  } catch (e) {
    console.error("Erreur de suppression Dojo :", e);
  }
}

function renderDojoList() {
  const container = document.getElementById('dojo-characters-list') || document.getElementById('saved-characters-list');
  if (!container) return;

  try {
    const rawDojo = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem('l5r_saved_characters');
    const dojoList = rawDojo ? JSON.parse(rawDojo) : [];
    if (!Array.isArray(dojoList) || dojoList.length === 0) {
      container.innerHTML = `<div class="text-stone-500 italic text-xs">Aucun personnage enregistré dans le Dojo local.</div>`;
      return;
    }

    const clans = getClans();
    container.innerHTML = dojoList.map((c, idx) => {
      const clanLabel = clans[c.clan]?.name || c.clan || "Clan";
      const safeId = c.id || idx;
      return `
        <div class="p-2.5 rounded-lg bg-stone-950/90 border border-amber-500/30 flex items-center justify-between gap-2 text-xs">
          <div>
            <div class="font-bold text-amber-200 font-imperial">${c.name || "Samouraï"}</div>
            <div class="text-[10px] text-stone-400">${clanLabel}</div>
          </div>
          <div class="flex items-center gap-1.5">
            <button type="button" onclick="loadCharacterFromDojo('${safeId}')" class="px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-[10px] cursor-pointer">Charger</button>
            <button type="button" onclick="deleteCharacterFromDojo('${safeId}')" class="px-2 py-1 rounded bg-stone-900 hover:bg-red-950 text-red-400 border border-stone-800 font-bold text-[10px] cursor-pointer">✕</button>
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.warn("Erreur d'affichage de la liste du Dojo :", e);
  }
}

function randomizeAll() {
  const clans = getClans();
  const adv = getAdvantages();
  const clanKeys = Object.keys(clans);
  if (!clanKeys.length) return;

  advantagesList = [];
  disadvantagesList = [];

  const randomClan = clanKeys[Math.floor(Math.random() * clanKeys.length)];
  document.getElementById('sel-clan').value = randomClan;
  onClanChange();

  const clan = clans[randomClan];
  const randFam = Math.floor(Math.random() * clan.families.length);
  document.getElementById('sel-family').value = randFam;
  updateSchoolOptions();

  const ownOptions = clan.schools;
  if (ownOptions && ownOptions.length > 0) {
    const pickedSch = ownOptions[Math.floor(Math.random() * ownOptions.length)];
    document.getElementById('sel-school').value = pickedSch.id;
  }

  resetSheetToNewSelection(false);
  generateRandomName(Math.random() > 0.5 ? 'm' : 'f');

  const nonSchoolAdvs = (adv.avantages || []).filter(a => !isDifferentSchoolAdv(a.name) && !isMultipleSchoolsAdv(a.name));
  if (nonSchoolAdvs.length) {
    const pickA = nonSchoolAdvs[0];
    advantagesList = [{
      id: pickA.id || "",
      name: pickA.name,
      baseCost: pickA.cost,
      cost: getEffectiveAdvCost(pickA),
      impact: pickA.impact || "",
      desc: pickA.desc || "",
      rule: pickA.rule || ""
    }];
  }
  if (adv.desavantages?.length) {
    const pickD = adv.desavantages[0];
    disadvantagesList = [{
      id: pickD.id || "",
      name: pickD.name,
      baseGain: pickD.gain ?? pickD.cost,
      gain: getEffectiveDisadvGain(pickD),
      impact: pickD.impact || "",
      desc: pickD.desc || "",
      rule: pickD.rule || ""
    }];
  }
  renderAdvDisadv();

  const voidInput = document.getElementById('trait-void');
  if (voidInput) voidInput.value = Math.max(3, parseInt(voidInput.min) || 2);

  if (currentSkills.length >= 2) {
    currentSkills[0].rank = 2;
    currentSkills[1].rank = 2;
    currentSkills[0].spec = true;
  }
  renderSkills();
  initCatalogSelectors();
  updateAll();
}

function exportJSON() {
  const data = collectCharacterData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(data.name || 'Samourai').replace(/\s+/g, '_')}_L5R4e.json`;
  a.click();
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const d = JSON.parse(e.target.result);
      applyCharacterDataToSheet(d);
    } catch (err) {
      alert("Erreur de format JSON.");
    }
  };
  reader.readAsText(file);
}

function resetCharacter() {
  if (confirm("Réinitialiser entièrement la fiche ?")) {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    window.currentCharacterId = 'samurai_' + Date.now();
    const baseInput = document.getElementById('base-xp-input');
    if (baseInput) baseInput.value = 40;
    advantagesList = [];
    disadvantagesList = [];
    if (typeof window.characterSpells !== 'undefined') window.characterSpells = [];
    if (typeof window.characterKatas !== 'undefined') window.characterKatas = [];
    onClanChange();
  }
}

function computeWeaponCombatMetrics(weaponName, traits, sch, checkAdv, checkDisadv) {
  const safeName = weaponName || "Katana";
  const weaponData = getEquipment().armes?.find(w => w.name === safeName) || {
    name: safeName,
    vd: "3g2",
    trait: "Agilité",
    skill: "Kenjutsu",
    type: "Médium"
  };

  const isRanged = !!(weaponData.type?.includes("Distance") || weaponData.skill?.includes("Arc") || weaponData.skill === "Kyujutsu");
  const atkTraitName = isRanged ? "Réflexes" : (weaponData.trait || "Agilité");
  const atkTraitVal = (atkTraitName === "Réflexes") ? traits.ref : traits.agi;
  const atkSkillName = weaponData.skill || (isRanged ? "Kyujutsu" : "Kenjutsu");

  const skillObj = currentSkills.find(s => {
    if (s.isChoice && !s.chosen) return false;
    const sName = s.name.toLowerCase();
    const wSkill = atkSkillName.toLowerCase();
    const wName = weaponData.name.toLowerCase();
    return sName.includes(wSkill) || wSkill.includes(sName) || sName.includes(wName);
  });

  const skillRank = skillObj ? skillObj.rank : 0;
  const hasSpec = skillObj ? skillObj.spec : false;
  let atkRoll = skillRank > 0 ? (skillRank + atkTraitVal) : atkTraitVal;
  const atkKeep = atkTraitVal;
  const atkDetails = skillRank > 0
    ? [`${skillObj.name} (${skillRank})`, `${atkTraitName} (${atkTraitVal})`]
    : [`Non entraîné : ${atkTraitName} (${atkTraitVal}) sans explosion`];

  if ((sch?.id === "bushi-hiruma" || sch?.name?.includes("Hiruma")) && !isRanged) {
    atkRoll += 1;
    atkDetails.push("Hiruma (+1g0)");
  }
  if (hasSpec) atkDetails.push("Spé : relance les 1");

  const vdParts = (weaponData.vd || "3g2").split('g');
  let dmgRoll = parseInt(vdParts[0], 10) || 3;
  const dmgKeep = parseInt(vdParts[1], 10) || 2;
  const dmgDetails = [`Arme (${weaponData.vd || "3g2"})`];

  if (!isRanged) {
    dmgRoll += traits.str;
    dmgDetails.push(`Force (+${traits.str}g0)`);
  } else {
    dmgRoll += 3;
    dmgDetails.push("Force d'Arc (+3g0)");
  }

  if ((sch?.id === "bushi-hida" || sch?.name?.includes("Hida")) && weaponData.type?.includes("Lourde")) {
    dmgRoll += 1;
    dmgDetails.push("Voie du Crabe (+1g0)");
  }
  if (checkAdv("large") && (weaponData.type?.includes("Grand") || weaponData.type?.includes("Lourd") || weaponData.type?.includes("2 mains"))) {
    dmgRoll += 1;
    dmgDetails.push("Grand (+1g0)");
  }
  if (checkDisadv("small") && !isRanged) {
    dmgRoll = Math.max(dmgKeep, dmgRoll - 1);
    dmgDetails.push("Petit (-1g0)");
  }

  return {
    name: weaponData.name,
    type: weaponData.type || "Médium",
    skill: atkSkillName,
    isRanged,
    attackRoll: `${atkRoll}g${atkKeep}`,
    attackDetail: `${weaponData.name} : ${atkDetails.join(' + ')}`,
    damageRoll: `${dmgRoll}g${dmgKeep}`,
    damageDetail: dmgDetails.join(' + ')
  };
}

function renderPrintRankPips(score, maxBoxes = 10, isCircle = false) {
  const num = Math.max(0, Math.min(maxBoxes, parseFloat(score) || 0));
  const full = Math.floor(num);
  const hasHalf = (num - full) >= 0.4;
  let html = '';
  for (let i = 1; i <= maxBoxes; i++) {
    const cls = ['l5r-pip'];
    if (isCircle) cls.push('l5r-pip-circle');
    if (i <= full) cls.push('filled');
    else if (i === full + 1 && hasHalf) cls.push('half');
    html += `<span class="${cls.join(' ')}"></span>`;
  }
  return html;
}

function resolvePrintSkillTrait(sk, traitsMap) {
  const catalog = (typeof getSkills === 'function') ? getSkills() : [];
  const meta = catalog.find(c => c.name === sk.name) || {};
  const label = (meta.trait || sk.trait || 'Agilité').toString();
  const norm = label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (norm.includes('const')) return { label: 'Const.', val: traitsMap.sta };
  if (norm.includes('volon')) return { label: 'Volonté', val: traitsMap.wil };
  if (norm.includes('force')) return { label: 'Force', val: traitsMap.str };
  if (norm.includes('percep')) return { label: 'Perc.', val: traitsMap.per };
  if (norm.includes('reflex')) return { label: 'Réfl.', val: traitsMap.ref };
  if (norm.includes('intuit')) return { label: 'Intuit.', val: traitsMap.awa };
  if (norm.includes('intel')) return { label: 'Intell.', val: traitsMap.int };
  if (norm.includes('vide')) return { label: 'Vide', val: traitsMap.voi };
  return { label: 'Agilité', val: traitsMap.agi };
}

function populateOfficialPrintSheet() {
  updateAll();

  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  const clan = clans[clanKey];
  const famSel = document.getElementById('sel-family');
  const famIdx = parseInt(famSel?.value, 10) || 0;
  const famObj = clan?.families?.[famIdx];
  const schObj = getSelectedSchoolObject();
  const sch = schObj?.school;

  const pcName = document.getElementById('pc-name')?.value || "Samouraï";
  const schoolDisplayLabel = sch
    ? (schObj.isExternalClan ? `${sch.name} (${schObj.clanName})` : sch.name)
    : "École";

  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  // Identité
  setTxt('p-name', pcName);
  setTxt('p-name-2', pcName);
  setTxt('p-clan', clan ? clan.name : "Clan");
  setTxt('p-clan-2', clan ? clan.name : "Clan");
  setTxt('p-family', famObj?.name || (famSel?.options[famSel.selectedIndex]?.text || "—").split('(')[0].trim());
  setTxt('p-school', schoolDisplayLabel);
  setTxt('p-school-2', schoolDisplayLabel);
  setTxt('p-xp', `${document.getElementById('xp-remaining')?.textContent || '0'} restants / ${document.getElementById('xp-total')?.textContent || '40'} XP`);
  setTxt('p-insight', document.getElementById('insight-display')?.textContent?.trim() || "120 pts (Rang 1)");

  const honorVal = document.getElementById('stat-honor')?.textContent?.trim() || "4.5";
  const gloryVal = String(window.currentChar?.glory ?? "1.0");
  const statusVal = String(window.currentChar?.status ?? "1.0");
  const taintVal = "0.0";
  setTxt('p-honor', honorVal);
  setTxt('p-glory', gloryVal);
  setTxt('p-status', statusVal);
  setTxt('p-taint', taintVal);

  const trackMap = [
    ['p-honor-track', honorVal],
    ['p-glory-track', gloryVal],
    ['p-status-track', statusVal],
    ['p-taint-track', taintVal]
  ];
  trackMap.forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = renderPrintRankPips(v, 10, false);
  });

  // Traits et Anneaux
  const sta = parseInt(document.getElementById('trait-stamina')?.value, 10) || 2;
  const wil = parseInt(document.getElementById('trait-willpower')?.value, 10) || 2;
  const str = parseInt(document.getElementById('trait-strength')?.value, 10) || 2;
  const per = parseInt(document.getElementById('trait-perception')?.value, 10) || 2;
  const ref = parseInt(document.getElementById('trait-reflexes')?.value, 10) || 2;
  const awa = parseInt(document.getElementById('trait-awareness')?.value, 10) || 2;
  const agi = parseInt(document.getElementById('trait-agility')?.value, 10) || 2;
  const int = parseInt(document.getElementById('trait-intelligence')?.value, 10) || 2;
  const voi = parseInt(document.getElementById('trait-void')?.value, 10) || 2;
  const traitsMap = { sta, wil, str, per, ref, awa, agi, int, voi };

  setTxt('p-t-sta', sta);
  setTxt('p-t-wil', wil);
  setTxt('p-t-str', str);
  setTxt('p-t-per', per);
  setTxt('p-t-ref', ref);
  setTxt('p-t-awa', awa);
  setTxt('p-t-agi', agi);
  setTxt('p-t-int', int);
  setTxt('p-t-voi', voi);

  setTxt('p-r-earth', document.getElementById('ring-earth')?.textContent || Math.min(sta, wil));
  setTxt('p-r-water', document.getElementById('ring-water')?.textContent || Math.min(str, per));
  setTxt('p-r-air', document.getElementById('ring-air')?.textContent || Math.min(ref, awa));
  setTxt('p-r-fire', document.getElementById('ring-fire')?.textContent || Math.min(agi, int));
  setTxt('p-r-void', document.getElementById('ring-void')?.textContent || voi);

  const voidDotsEl = document.getElementById('p-void-dots');
  if (voidDotsEl) voidDotsEl.innerHTML = renderPrintRankPips(voi, 10, true);

  // Combat
  setTxt('p-init', document.getElementById('sticky-init')?.textContent || "3g2");
  setTxt('p-init-note', document.getElementById('sticky-init-detail')?.textContent || "");
  setTxt('p-armor-tn', document.getElementById('sticky-armor-tn')?.textContent || "20");
  setTxt('p-armor-note', document.getElementById('sticky-armor-detail')?.textContent || "");
  setTxt('p-heal', document.getElementById('stat-heal')?.textContent || "5 PV");

  const armorSel = document.getElementById('pc-armor');
  setTxt('p-armor-name', armorSel?.options[armorSel.selectedIndex]?.text?.split('(')[0]?.trim() || "Aucune");
  setTxt('p-armor-reduc', armorSel?.value === "10" ? "Réduction : 5" : (armorSel?.value === "5" ? "Réduction : 3" : "Réduction : 0"));

  // Compétences (avec résolution exacte du Trait associé)
  const skillsBody = document.getElementById('p-skills-body');
  if (skillsBody) {
    const rowsHtml = currentSkills.map(sk => {
      const displayName = (sk.isChoice && !sk.chosen) ? `[À choisir : ${sk.name}]` : sk.name;
      const tMeta = resolvePrintSkillTrait(sk, traitsMap);
      const roll = (sk.isChoice && !sk.chosen) ? "—" : `${sk.rank + tMeta.val}g${tMeta.val}`;
      const masteriesSummary = getMasteriesSummary(sk.name, sk.rank);
      const notesParts = [];
      if (sk.spec) notesParts.push("Spé : relance les 1");
      if (masteriesSummary) notesParts.push(masteriesSummary);

      return `
        <tr>
          <td class="text-center font-bold">${sk.isSchool ? '<span class="inline-block w-3 h-3 rounded-full bg-[#2b3627] text-white text-[8px] leading-3">✓</span>' : '<span class="inline-block w-2.5 h-2.5 rounded-full border border-[#8c7b5c]"></span>'}</td>
          <td class="font-bold text-[#1a1610]">${displayName}</td>
          <td class="text-center font-bold font-imperial">${sk.rank}</td>
          <td class="text-center text-[#4a3b26]">${tMeta.label}</td>
          <td class="text-center font-bold font-imperial text-[#7b2319]">${roll}</td>
          <td class="text-[#5a4e43] text-[7.5px]">${notesParts.join(' • ')}</td>
        </tr>
      `;
    });

    const minSkillRows = 13;
    for (let k = currentSkills.length; k < minSkillRows; k++) {
      rowsHtml.push(`
        <tr class="opacity-55">
          <td class="text-center"><span class="inline-block w-2.5 h-2.5 rounded-full border border-[#b7aa90]"></span></td>
          <td>&nbsp;</td><td></td><td></td><td></td><td></td>
        </tr>
      `);
    }
    skillsBody.innerHTML = rowsHtml.join('');
  }

  // Arsenal (Arme 1, Arme 2, Flèches / Notes)
  const checkAdv = (key) => advantagesList.some(a =>
    (a.id && a.id === key) || a.name.toLowerCase().includes(key) || (key === 'large' && a.name.toLowerCase().includes('grand'))
  );
  const checkDisadv = (key) => disadvantagesList.some(d =>
    (d.id && d.id === key) || d.name.toLowerCase().includes(key) || (key === 'small' && d.name.toLowerCase().includes('petit'))
  );
  const w1 = document.getElementById('pc-weapon-1')?.value || "Katana";
  const w2 = document.getElementById('pc-weapon-2')?.value || "Aucune";
  const m1 = computeWeaponCombatMetrics(w1, traitsMap, sch, checkAdv, checkDisadv);
  const m2 = (w2 && w2 !== "Aucune") ? computeWeaponCombatMetrics(w2, traitsMap, sch, checkAdv, checkDisadv) : null;

  const wBox = document.getElementById('p-weapons-box');
  if (wBox) {
    wBox.innerHTML = `
      <div class="grid grid-cols-12">
        <div class="col-span-5 border-r border-[#8c7b5c]">
          <div class="l5r-bar"><span>Arme 1</span><span>${m1.type}</span></div>
          <div class="p-1.5 text-[8.5px] space-y-0.5">
            <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span class="l5r-cell-lbl px-1">Arme</span><b class="font-imperial">${m1.name}</b></div>
            <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span class="l5r-cell-lbl px-1">Toucher</span><b class="font-imperial text-[#7b2319]">${m1.attackRoll}</b></div>
            <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span class="l5r-cell-lbl px-1">Dégâts</span><b class="font-imperial text-[#b64329]">${m1.damageRoll}</b></div>
            <div class="text-[7.5px] text-[#5a4e43] truncate" title="${m1.damageDetail}">${m1.damageDetail}</div>
          </div>
        </div>
        <div class="col-span-4 border-r border-[#8c7b5c]">
          <div class="l5r-bar"><span>Arme 2</span><span>${m2 ? m2.type : 'Secours'}</span></div>
          <div class="p-1.5 text-[8.5px] space-y-0.5">
            ${m2 ? `
              <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span class="l5r-cell-lbl px-1">Arme</span><b class="font-imperial">${m2.name}</b></div>
              <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span class="l5r-cell-lbl px-1">Toucher</span><b class="font-imperial text-[#7b2319]">${m2.attackRoll}</b></div>
              <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span class="l5r-cell-lbl px-1">Dégâts</span><b class="font-imperial text-[#b64329]">${m2.damageRoll}</b></div>
              <div class="text-[7.5px] text-[#5a4e43] truncate" title="${m2.damageDetail}">${m2.damageDetail}</div>
            ` : `
              <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5 text-[#8b7f69]"><span>Arme :</span><span>________________</span></div>
              <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5 text-[#8b7f69]"><span>Toucher / Dégâts :</span><span>____ / ____</span></div>
              <div class="text-[7.5px] text-[#8b7f69] pt-0.5">Notes : ____________________</div>
            `}
          </div>
        </div>
        <div class="col-span-3">
          <div class="l5r-bar"><span>Flèches &amp; Notes</span><span>Qté</span></div>
          <div class="p-1.5 text-[8px] space-y-1 text-[#5a4e43]">
            <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span>Tranchantes (2g2)</span><span>___</span></div>
            <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span>Perce-armure (1g1)</span><span>___</span></div>
            <div class="flex justify-between border-b border-[#d7d0c0] pb-0.5"><span>Sifflantes / Feu</span><span>___</span></div>
          </div>
        </div>
      </div>
    `;
  }

  // Paliers de blessures
  const woundLevels = [
    { name: "Indemne", pen: "+0", id: "w-0", tint: "#2b5986" },
    { name: "Égratigné", pen: "+3", id: "w-1" },
    { name: "Blessé Léger", pen: "+5", id: "w-2" },
    { name: "Blessé", pen: "+10", id: "w-3" },
    { name: "Gravement", pen: "+15", id: "w-4" },
    { name: "Estropié", pen: "+20", id: "w-5" },
    { name: "Inconscient", pen: "+40", id: "w-6" },
    { name: "Mortel", pen: "—", id: "w-7", tint: "#7b2319" }
  ];
  let wTotal = 0;
  const w0Val = parseInt(document.getElementById('w-0')?.textContent, 10) || 10;
  const wStepVal = parseInt(document.getElementById('w-1')?.textContent, 10) || 4;
  wTotal = w0Val + (wStepVal * 7);
  setTxt('p-wounds-earth2', `${wStepVal} PV`);
  setTxt('p-wounds-earth5', `${w0Val} PV`);
  setTxt('p-wounds-total', `${wTotal} PV`);

  const woundsBody = document.getElementById('p-wounds-body');
  if (woundsBody) {
    woundsBody.innerHTML = woundLevels.map(wl => `
      <tr>
        <td class="text-left pl-1.5 font-bold" style="${wl.tint ? `color:${wl.tint};` : ''}">${wl.name}</td>
        <td class="text-[#5a4e43] font-mono">${wl.pen}</td>
        <td class="font-bold font-imperial">${document.getElementById(wl.id)?.textContent || `${wStepVal} PV`}</td>
        <td class="border-l border-[#b7aa90] bg-[#fffdf7]/80"></td>
      </tr>
    `).join('');
  }

  // Avantages & Désavantages
  setTxt('p-adv-total', `${document.getElementById('adv-cost-total')?.textContent || '0'} XP`);
  const advListEl = document.getElementById('p-adv-list');
  if (advListEl) {
    advListEl.innerHTML = advantagesList.length ? advantagesList.map(a => {
      const full = resolveCatalogAdvantage(a.id || a.name) || a;
      let extraNote = "";
      if (isDifferentSchoolAdv(a.name) && a.differentSchoolName) {
        extraNote = ` — <i>École suivie : ${a.differentSchoolName}</i>`;
      } else if (isMultipleSchoolsAdv(a.name) && a.secondarySchoolName) {
        extraNote = ` — <i>Seconde école : ${a.secondarySchoolName} (Rang ${a.secondarySchoolRank || 1})</i>`;
      } else if (isElementalBlessingAdv(a.name) && a.chosenElement) {
        extraNote = ` — <i>Anneau : ${a.chosenElement}</i>`;
      }
      return `<div class="border-b border-[#e0d8c6] pb-0.5"><b class="text-[#243b1d]">${a.name}</b> (${a.cost} XP) <span class="text-[7.5px] px-1 rounded bg-[#e3ded0] text-[#4a3b26]">${full?.type || 'Don'}</span> : <span class="text-[#4a3e31]">${full?.rule || full?.desc || ''}${extraNote}</span></div>`;
    }).join('') : '<div class="text-[#6a5d47] italic">Aucun avantage sélectionné.</div>';
  }

  setTxt('p-disadv-total', `${document.getElementById('disadv-gain-total')?.textContent || '0'} / 15 XP`);
  const disadvListEl = document.getElementById('p-disadv-list');
  if (disadvListEl) {
    disadvListEl.innerHTML = disadvantagesList.length ? disadvantagesList.map(d => {
      const full = resolveCatalogDisadvantage(d.id || d.name) || d;
      return `<div class="border-b border-[#e0d8c6] pb-0.5"><b class="text-[#7b2319]">${d.name}</b> (+${d.gain} XP) <span class="text-[7.5px] px-1 rounded bg-[#f3e3df] text-[#581f1b]">${full?.type || 'Défaut'}</span> : <span class="text-[#4a3e31]">${full?.rule || full?.desc || ''}</span></div>`;
    }).join('') : '<div class="text-[#6a5d47] italic">Aucun désavantage sélectionné.</div>';
  }

  // Techniques d'École
  const techList = sch?.techniques || (sch?.technique ? [sch.technique] : []);
  const currentRank = parseInt(document.getElementById('insight-display')?.textContent?.match(/Rang (\d)/)?.[1], 10) || 1;
  setTxt('p-tech-name', `Techniques — ${schoolDisplayLabel}`);

  let printTechHtml = techList.map(t => {
    const badge = t.rank === currentRank
      ? `<span class="px-1 py-0.5 rounded bg-[#f4d89a] text-[#5e3a04] border border-[#b89242] font-bold text-[7.5px]">ACTIF</span>`
      : (t.rank < currentRank
        ? `<span class="px-1 py-0.5 rounded bg-[#ddeadd] text-[#243b1d] border border-[#486a3c] font-bold text-[7.5px]">MAÎTRISÉ</span>`
        : `<span class="px-1 py-0.5 rounded bg-[#e8e3d6] text-[#6a5d47] text-[7.5px]">R${t.rank}</span>`);
    return `<div class="border-b border-[#e0d8c6] pb-1">${badge} <b class="font-imperial text-[#1a1610]">Rang ${t.rank} — ${t.name} :</b> <span class="text-[#342c23]">${t.effect}</span></div>`;
  }).join('');

  const multiAdv = advantagesList.find(a => isMultipleSchoolsAdv(a.name));
  if (multiAdv && multiAdv.secondarySchoolId) {
    const allSchools = getAllSchoolsCatalog();
    const secSchool = allSchools.find(s => s.id === multiAdv.secondarySchoolId);
    if (secSchool) {
      const secRank = multiAdv.secondarySchoolRank || 1;
      printTechHtml += `<div class="mt-1 pt-1 border-t border-[#8c7b5c] font-imperial font-bold text-[#7b2319]">Seconde École : ${secSchool.name} (${secSchool.clanName}) — Rang ${secRank}</div>`;
      printTechHtml += (secSchool.techniques || []).map(t => {
        const tag = t.rank <= secRank ? `<b class="text-[#243b1d]">[ACQUIS]</b>` : `<span class="text-[#8b7f69]">[R${t.rank}]</span>`;
        return `<div class="text-[#342c23]">${tag} <b>Rang ${t.rank} — ${t.name} :</b> ${t.effect}</div>`;
      }).join('');
    }
  }

  const techDescEl = document.getElementById('p-tech-desc');
  if (techDescEl) techDescEl.innerHTML = printTechHtml;
  setTxt('p-outfit-desc', document.getElementById('pc-outfit')?.value || "");
}

function exportOfficialPDF() {
  populateOfficialPrintSheet();
  if (typeof window.populatePrintableMysticBox === 'function') window.populatePrintableMysticBox();
  if (typeof window.populatePrintable20Questions === 'function') window.populatePrintable20Questions();
  window.print();
}

// Exposition globale pour createcharacter.html, export-carnet.js et Node.js
if (typeof window !== "undefined") {
  window.currentSkills = currentSkills;
  window.advantagesList = advantagesList;
  window.disadvantagesList = disadvantagesList;
  window.addSkillFromCatalog = addSkillFromCatalog;
  window.adjustSkillRank = adjustSkillRank;
  window.adjustTrait = adjustTrait;
  window.updateAll = updateAll;
  window.renderSkills = renderSkills;
  window.renderAdvDisadv = renderAdvDisadv;
  window.updateAdvPreview = updateAdvPreview;
  window.updateDisadvPreview = updateDisadvPreview;
  window.removeAdv = removeAdv;
  window.removeAdvantage = removeAdvantage;
  window.removeDisadv = removeDisadv;
  window.removeDisadvantage = removeDisadvantage;
  window.getSelectedSchoolObject = getSelectedSchoolObject;
  window.resolveSchoolByRef = resolveSchoolByRef;
  window.updateDifferentSchoolSelection = updateDifferentSchoolSelection;
  window.updateSecondarySchoolSelection = updateSecondarySchoolSelection;
  window.updateElementalBlessingSelection = updateElementalBlessingSelection;
  window.saveCharacterToDojo = saveCharacterToDojo;
  window.loadCharacterFromDojo = loadCharacterFromDojo;
  window.deleteCharacterFromDojo = deleteCharacterFromDojo;
  window.renderDojoList = renderDojoList;
  window.applyCharacterDataToSheet = applyCharacterDataToSheet;
  window.SKILL_MASTERIES = SKILL_MASTERIES;
  window.getMasteriesHtml = getMasteriesHtml;
  window.getMasteriesSummary = getMasteriesSummary;
  window.isMultipleSchoolsAdv = isMultipleSchoolsAdv;
  window.isDifferentSchoolAdv = isDifferentSchoolAdv;
  window.isElementalBlessingAdv = isElementalBlessingAdv;
  window.getSchoolArchetype = getSchoolArchetype;
  window.isSchoolCompatibleForMultiple = isSchoolCompatibleForMultiple;
  window.getCompatibleMultipleSchools = getCompatibleMultipleSchools;
  window.getCharacterArchetypePermissions = getCharacterArchetypePermissions;
  window.getAllSchoolsCatalog = getAllSchoolsCatalog;
  window.populateOfficialPrintSheet = populateOfficialPrintSheet;
  window.buildCharacterContextFromInputs = buildCharacterContextFromInputs;
  window.getEffectiveAdvCost = getEffectiveAdvCost;
  window.getEffectiveDisadvGain = getEffectiveDisadvGain;
  window.calculateRings = calculateRings;
  window.calculateTraitXpCost = calculateTraitXpCost;
  window.calculateVoidXpCost = calculateVoidXpCost;
  window.calculateSkillXpCost = calculateSkillXpCost;
  window.calculateInsightAndRank = calculateInsightAndRank;
  window.calculateArmorTN = calculateArmorTN;
  window.calculateWoundThresholds = calculateWoundThresholds;
  window.parseRollKeepFormula = parseRollKeepFormula;
  window.applyTenDiceRule = applyTenDiceRule;
  window.simulateRollAndKeep = simulateRollAndKeep;

  window.addEventListener('DOMContentLoaded', bootstrap);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MAX_DISADVANTAGE_XP,
    SKILL_MASTERIES,
    getMasteriesHtml,
    getMasteriesSummary,
    isMultipleSchoolsAdv,
    isDifferentSchoolAdv,
    isElementalBlessingAdv,
    getSchoolArchetype,
    isSchoolCompatibleForMultiple,
    getCompatibleMultipleSchools,
    getCharacterArchetypePermissions,
    buildCharacterContextFromInputs,
    getCharacterContext,
    getEffectiveAdvCost,
    getEffectiveDisadvGain,
    calculateRings,
    calculateTraitXpCost,
    calculateVoidXpCost,
    calculateSkillXpCost,
    calculateInsightAndRank,
    calculateArmorTN,
    calculateWoundThresholds,
    parseRollKeepFormula,
    applyTenDiceRule,
    simulateRollAndKeep
  };
}
