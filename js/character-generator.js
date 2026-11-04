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
    advantagesList[advIdx].secondarySchoolId = schoolId;
    const all = getAllSchoolsCatalog();
    const found = all.find(s => s.id === schoolId);
    advantagesList[advIdx].secondarySchoolName = found ? `${found.name} (${found.clanName})` : "";
  }

  if (rankVal !== undefined) {
    advantagesList[advIdx].secondarySchoolRank = Math.max(1, Math.min(5, parseInt(rankVal, 10) || 1));
  }

  renderAdvDisadv();
  updateAll();
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
function getCharacterContext() {
  const clanVal = (document.getElementById('sel-clan')?.value || "").toLowerCase();
  const clans = getClans();
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const famName = (clans[clanVal]?.families?.[famIdx]?.name || "").toLowerCase();

  const schObj = getSelectedSchoolObject();
  const sch = schObj?.school;
  const schName = (sch?.name || sch?.id || "").toLowerCase();
  const schType = (sch?.type || sch?.tag || "").toLowerCase();

  return {
    clan: clanVal,
    isCrab: clanVal.includes("crabe") || clanVal.includes("crab"),
    isCrane: clanVal.includes("grue") || clanVal.includes("crane"),
    isDragon: clanVal.includes("dragon"),
    isLion: clanVal.includes("lion"),
    isMantis: clanVal.includes("mante") || clanVal.includes("mantis"),
    isPhoenix: clanVal.includes("phenix") || clanVal.includes("phénix") || clanVal.includes("phoenix"),
    isScorpion: clanVal.includes("scorpion"),
    isUnicorn: clanVal.includes("licorne") || clanVal.includes("unicorn"),
    isSpider: clanVal.includes("araignee") || clanVal.includes("araignée") || clanVal.includes("spider"),
    isImperial: clanVal.includes("imperial") || clanVal.includes("impérial") || famName.includes("miya") || famName.includes("otomo") || famName.includes("seppun"),
    isBushi: schType.includes("bushi") || schName.includes("bushi") || schName.includes("guerrier") || schName.includes("éclaireur") || schName.includes("archer") || schName.includes("duelliste"),
    isShugenja: schType.includes("shugenja") || schName.includes("shugenja"),
    isCourtier: schType.includes("courtisan") || schType.includes("courtier") || schName.includes("courtisan") || schName.includes("magistrat") || schName.includes("diplomate"),
    isMonk: schType.includes("moine") || schType.includes("monk") || schName.includes("moine") || schName.includes("togashi") || schName.includes("confrérie") || schName.includes("confrerie") || schName.includes("henshin") || schName.includes("tatoué")
  };
}

function getEffectiveAdvCost(adv) {
  if (!adv) return 0;
  const baseCost = parseInt(adv.baseCost ?? adv.cost) || 0;
  const ctx = getCharacterContext();
  const imp = (adv.impact || adv.id || "").toLowerCase();
  const nameNorm = (adv.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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

function getEffectiveDisadvGain(dis) {
  if (!dis) return 0;
  const baseGain = parseInt(dis.baseGain ?? dis.gain ?? dis.cost) || 0;
  const ctx = getCharacterContext();
  const imp = (dis.impact || dis.id || "").toLowerCase();
  const nameNorm = (dis.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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

function resolveCatalogAdvantage(val) {
  if (val === "" || val === null || val === undefined) return null;
  const container = getAdvantages();
  const list = container.avantages || window.AVANTAGES_LIST || [];
  return list[val] || list.find(a => a.id === val || a.name === val) || null;
}

function resolveCatalogDisadvantage(val) {
  if (val === "" || val === null || val === undefined) return null;
  const container = getAdvantages();
  const list = container.desavantages || window.DESAVANTAGES_LIST || [];
  return list[val] || list.find(d => d.id === val || d.name === val) || null;
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
      autoSaveCharacterDraft();
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

function initCatalogSelectors() {
  const skills = getSkills();
  const eq = getEquipment();
  const adv = getAdvantages();

  // 1. Compétences
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
      let opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "— Toutes les compétences acquises —";
      skSel.appendChild(opt);
      skSel.disabled = true;
    } else {
      skSel.disabled = false;
      availableSkills.forEach(s => {
        let opt = document.createElement('option');
        opt.value = s.name;
        opt.textContent = `${s.name} (${s.type} - ${s.trait})`;
        skSel.appendChild(opt);
      });
      if (previousVal && availableSkills.some(s => s.name === previousVal)) {
        skSel.value = previousVal;
      }
    }
  }

  // 2. Armures
  const armSel = document.getElementById('pc-armor');
  if (armSel) {
    const prevArmVal = armSel.value;
    armSel.innerHTML = "";
    (eq.armures || []).forEach(a => {
      let opt = document.createElement('option');
      opt.value = a.tn;
      opt.textContent = a.name;
      armSel.appendChild(opt);
    });
    if (prevArmVal && armSel.querySelector(`option[value="${prevArmVal}"]`)) {
      armSel.value = prevArmVal;
    }
  }

  // 3. Armes
  const w1Sel = document.getElementById('pc-weapon-1');
  const w2Sel = document.getElementById('pc-weapon-2');
  if (w1Sel && w2Sel) {
    const prevW1 = w1Sel.value;
    const prevW2 = w2Sel.value;

    w1Sel.innerHTML = "";
    w2Sel.innerHTML = "<option value='Aucune'>Aucune arme secondaire</option>";

    (eq.armes || []).forEach(w => {
      let opt1 = document.createElement('option');
      opt1.value = w.name;
      opt1.textContent = `${w.name} (VD ${w.vd}, ${w.type})`;
      w1Sel.appendChild(opt1);

      let opt2 = document.createElement('option');
      opt2.value = w.name;
      opt2.textContent = `${w.name} (VD ${w.vd})`;
      w2Sel.appendChild(opt2);
    });

    if (prevW1 && w1Sel.querySelector(`option[value="${prevW1}"]`)) {
      w1Sel.value = prevW1;
    }
    if (prevW2 && w2Sel.querySelector(`option[value="${prevW2}"]`)) {
      w2Sel.value = prevW2;
    }
  }

  // 4. Avantages (avec coût dynamique selon Clan/École — Ticket #18)
  const advSel = document.getElementById('sel-catalog-adv');
  if (advSel) {
    const prevAdvVal = advSel.value;
    const ownedAdvNames = new Set((advantagesList || []).map(a => a.name.toLowerCase().trim()));
    advSel.innerHTML = "";

    const availableAdv = (adv.avantages || [])
      .map((item, originalIdx) => ({ item, originalIdx }))
      .filter(({ item }) => !ownedAdvNames.has(item.name.toLowerCase().trim()));

    if (availableAdv.length === 0) {
      let opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "— Aucun autre avantage disponible —";
      advSel.appendChild(opt);
      advSel.disabled = true;
    } else {
      advSel.disabled = false;
      availableAdv.forEach(({ item, originalIdx }) => {
        const effCost = getEffectiveAdvCost(item);
        const discountTag = effCost < item.cost ? ` ★ -${item.cost - effCost} XP Clan/École` : "";
        let opt = document.createElement('option');
        opt.value = originalIdx;
        opt.textContent = `${item.name} (${effCost} XP${discountTag}) — [${item.type}]`;
        advSel.appendChild(opt);
      });
      if (prevAdvVal && advSel.querySelector(`option[value="${prevAdvVal}"]`)) {
        advSel.value = prevAdvVal;
      }
    }

    updateAdvPreview();
  }

  // 5. Désavantages (avec gain dynamique selon Clan/École — Ticket #18)
  const disadvSel = document.getElementById('sel-catalog-disadv');
  if (disadvSel) {
    const prevDisVal = disadvSel.value;
    const ownedDisNames = new Set((disadvantagesList || []).map(d => d.name.toLowerCase().trim()));
    disadvSel.innerHTML = "";

    const availableDis = (adv.desavantages || [])
      .map((item, originalIdx) => ({ item, originalIdx }))
      .filter(({ item }) => !ownedDisNames.has(item.name.toLowerCase().trim()));

    if (availableDis.length === 0) {
      let opt = document.createElement('option');
      opt.value = "";
      opt.textContent = "— Aucun autre désavantage disponible —";
      disadvSel.appendChild(opt);
      disadvSel.disabled = true;
    } else {
      disadvSel.disabled = false;
      availableDis.forEach(({ item, originalIdx }) => {
        const baseG = item.gain ?? item.cost;
        const effGain = getEffectiveDisadvGain(item);
        const bonusTag = effGain > baseG ? ` ★ +${effGain - baseG} XP Clan/École` : "";
        let opt = document.createElement('option');
        opt.value = originalIdx;
        opt.textContent = `${item.name} (+${effGain} XP${bonusTag}) — [${item.type}]`;
        disadvSel.appendChild(opt);
      });
      if (prevDisVal && disadvSel.querySelector(`option[value="${prevDisVal}"]`)) {
        disadvSel.value = prevDisVal;
      }
    }

    updateDisadvPreview();
  }

  updateDisadvButtonState();
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

    const ownGroup = document.createElement('optgroup');
    ownGroup.label = `🏯 Écoles du ${clan.name}`;
    (clan.schools || []).forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.name} (${s.bonus})`;
      ownGroup.appendChild(opt);
    });
    schSel.appendChild(ownGroup);

    for (const otherKey in clans) {
      if (otherKey === clanKey) continue;
      const otherClan = clans[otherKey];
      const extGroup = document.createElement('optgroup');
      extGroup.label = `🎓 ${otherClan.name}`;
      (otherClan.schools || []).forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.name} [${otherClan.name}] (${s.bonus})`;
        extGroup.appendChild(opt);
      });
      schSel.appendChild(extGroup);
    }

    if (preferredSchoolId && schSel.querySelector(`option[value="${preferredSchoolId}"]`)) {
      schSel.value = preferredSchoolId;
    } else if (diffAdv.differentSchoolId && schSel.querySelector(`option[value="${diffAdv.differentSchoolId}"]`)) {
      schSel.value = diffAdv.differentSchoolId;
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
}

function onFamilyChange() {
  const diffAdv = advantagesList.find(a => isDifferentSchoolAdv(a.name));
  updateSchoolOptions(diffAdv?.differentSchoolId);
  resetSheetToNewSelection(true);
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

function addAdvFromCatalog() {
  const sel = document.getElementById('sel-catalog-adv');
  if (!sel || sel.value === "") return;
  const item = resolveCatalogAdvantage(sel.value);
  if (!item) return;

  if (advantagesList.some(a => a.name === item.name)) {
    alert(`L'avantage « ${item.name} » est déjà sélectionné.`);
    return;
  }

  const effectiveCost = getEffectiveAdvCost(item);
  const currentRemainingXP = parseInt(document.getElementById('xp-remaining')?.textContent) || 0;
  if (currentRemainingXP - effectiveCost < 0) {
    alert(`Impossible d'ajouter « ${item.name} » (${effectiveCost} XP) : solde insuffisant (${currentRemainingXP} XP disponible).`);
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
    const externalSchools = allSchools.filter(s => s.clanKey !== currentClanKey);
    const defaultExt = (currentSchObj && currentSchObj.isExternalClan)
      ? allSchools.find(s => s.id === currentSchObj.school.id)
      : (externalSchools[0] || allSchools[0]);

    if (defaultExt) {
      newAdv.differentSchoolId = defaultExt.id;
      newAdv.differentSchoolName = `${defaultExt.name} (${defaultExt.clanName})`;
      advantagesList.push(newAdv);

      const schSel = document.getElementById('sel-school');
      if (schSel) {
        updateSchoolOptions(defaultExt.id);
        schSel.value = defaultExt.id;
      }
      resetSheetToNewSelection(true);
      return;
    }
  }

  if (isMultipleSchoolsAdv(item.name)) {
    const defaultSec = allSchools[0] || null;
    newAdv.secondarySchoolId = defaultSec ? defaultSec.id : "";
    newAdv.secondarySchoolName = defaultSec ? `${defaultSec.name} (${defaultSec.clanName})` : "";
    newAdv.secondarySchoolRank = 1;
  }

  advantagesList.push(newAdv);
  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
}

function addDisadvFromCatalog() {
  const sel = document.getElementById('sel-catalog-disadv');
  if (!sel || sel.value === "") return;
  const item = resolveCatalogDisadvantage(sel.value);
  if (!item) return;

  if (disadvantagesList.some(d => d.name === item.name)) {
    alert(`Le désavantage « ${item.name} » est déjà sélectionné.`);
    return;
  }

  const effectiveGain = getEffectiveDisadvGain(item);
  const currentTotalGain = disadvantagesList.reduce((acc, d) => acc + (parseInt(d.gain) || 0), 0);
  if (currentTotalGain + effectiveGain > MAX_DISADVANTAGE_XP) {
    alert(`Seuil dépassé ! Vous avez déjà ${currentTotalGain} / ${MAX_DISADVANTAGE_XP} XP de désavantages. L'ajout de « ${item.name} » (+${effectiveGain} XP) atteindrait ${currentTotalGain + effectiveGain} XP.`);
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
    return;
  }

  renderAdvDisadv();
  initCatalogSelectors();
  updateAll();
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
        const externalSchools = allSchools.filter(s => s.clanKey !== currentClanKey);
        const currentDiffId = a.differentSchoolId || getSelectedSchoolObject()?.school?.id || (externalSchools[0]?.id || "");

        const diffOptions = externalSchools.map(sch => `
          <option value="${sch.id}" ${sch.id === currentDiffId ? 'selected' : ''}>
            ${sch.clanName} — ${sch.name} (${sch.bonus})
          </option>
        `).join('');

        extraHtml += `
          <div class="mt-2 p-2.5 rounded bg-stone-950 border border-emerald-500/40 space-y-1.5">
            <span class="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block font-imperial">
              🎓 École d'un autre Clan suivie (remplace l'école initiale) :
            </span>
            <select onchange="updateDifferentSchoolSelection(${i}, this.value)" class="w-full p-1.5 rounded text-xs bg-[#0d0b0b] border border-stone-800 text-amber-200 font-bold">
              ${diffOptions}
            </select>
            <div class="text-[10px] text-stone-400 italic">
              Applique le bonus de trait, l'honneur, les 7 compétences et les techniques de cette école tout en gardant votre Clan et votre Famille.
            </div>
          </div>
        `;
      }

      if (isMulti) {
        const currentSecId = a.secondarySchoolId || (allSchools[0]?.id || "");
        const currentSecRank = a.secondarySchoolRank || 1;

        const schoolOptions = allSchools.map(sch => `
          <option value="${sch.id}" ${sch.id === currentSecId ? 'selected' : ''}>
            ${sch.clanName} — ${sch.name}
          </option>
        `).join('');

        extraHtml += `
          <div class="mt-2 p-2.5 rounded bg-stone-950 border border-amber-500/40 space-y-2">
            <span class="text-[10px] text-amber-300 font-bold uppercase tracking-wider block font-imperial">
              Configuration de la Seconde École :
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div class="sm:col-span-2">
                <label class="text-[9px] text-stone-400 block mb-0.5">École suivie :</label>
                <select onchange="updateSecondarySchoolSelection(${i}, this.value, undefined)" class="w-full p-1.5 rounded text-xs bg-[#0d0b0b] border border-stone-800 text-amber-200">
                  ${schoolOptions}
                </select>
              </div>
              <div>
                <label class="text-[9px] text-stone-400 block mb-0.5">Rang atteint :</label>
                <select onchange="updateSecondarySchoolSelection(${i}, undefined, this.value)" class="w-full p-1.5 rounded text-xs bg-[#0d0b0b] border border-stone-800 text-amber-200 text-center font-bold">
                  <option value="1" ${currentSecRank === 1 ? 'selected' : ''}>Rang 1</option>
                  <option value="2" ${currentSecRank === 2 ? 'selected' : ''}>Rang 2</option>
                  <option value="3" ${currentSecRank === 3 ? 'selected' : ''}>Rang 3</option>
                  <option value="4" ${currentSecRank === 4 ? 'selected' : ''}>Rang 4</option>
                  <option value="5" ${currentSecRank === 5 ? 'selected' : ''}>Rang 5</option>
                </select>
              </div>
            </div>
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

    return `
      <div class="p-2.5 rounded bg-black/60 border ${isChoiceActive ? 'border-amber-500/50' : 'border-stone-800'} flex flex-col gap-1.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex-1 truncate">
            <span class="font-bold text-amber-200">${sk.name}</span>
            ${sk.isSchool ? `<span class="text-[9px] px-1 rounded bg-amber-950 text-amber-400 ml-1 border border-amber-900">${isChoiceActive ? 'École (Choix)' : 'École'}</span>` : ''}
            ${isChoiceActive ? `<button onclick="reopenSkillChoice(${idx})" title="Changer de compétence pour cet emplacement" class="text-[10px] text-stone-400 hover:text-amber-300 underline ml-1.5 cursor-pointer">⇄ Changer</button>` : ''}
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
// 5. CALCULS DYNAMIQUES 4E ÉDITION (TICKETS #17, #18 & #21)
// =============================================================================
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
  const rEarth = Math.min(sta, wil);
  const rWater = Math.min(str, per);
  const rAir = Math.min(ref, awa);
  const rFire = Math.min(agi, int);
  const rVoid = voi;

  document.getElementById('ring-earth').textContent = rEarth;
  document.getElementById('ring-water').textContent = rWater;
  document.getElementById('ring-air').textContent = rAir;
  document.getElementById('ring-fire').textContent = rFire;
  document.getElementById('ring-void').textContent = rVoid;

  const catalogAdv = getAdvantages().avantages || [];
  const catalogDis = getAdvantages().desavantages || [];

  const hasAdv = (impactName) => advantagesList.some(a => {
    if (a.impact === impactName || a.id === impactName) return true;
    const found = catalogAdv.find(x => x.id === a.id || x.name === a.name);
    if (found && (found.impact === impactName || found.id === impactName)) return true;
    const n = (a.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
    const found = catalogDis.find(x => x.id === d.id || x.name === d.name);
    if (found && (found.impact === impactName || found.id === impactName)) return true;
    const n = (d.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (impactName === "obtuse" && n.includes("esprit obtus")) return true;
    if (impactName === "small" && n.includes("petit")) return true;
    return false;
  });

  // Détection de l'élément choisi pour Bénédiction Élémentaire (Ticket #17)
  const hasElemBlessing = (ringKey) => {
    return advantagesList.some(a => {
      const found = catalogAdv.find(x => x.id === a.id || x.name === a.name);
      if (!isElementalBlessingAdv(a) && !isElementalBlessingAdv(found)) return false;
      const chosen = (a.chosenElement || "earth").toLowerCase();
      return chosen === ringKey;
    });
  };

  // 2. Budget XP (Traits, Vide, Compétences, Avantages, Katas & Kihos)
  let xpSpent = 0;
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
    let baseStart = 2 + t.bonus;
    const blessed = hasElemBlessing(t.ring);
    if (t.val > baseStart) {
      for (let r = baseStart + 1; r <= t.val; r++) {
        const traitStepCost = blessed ? Math.max(1, (r * 4) - 1) : (r * 4);
        xpSpent += traitStepCost;
      }
    }
  });

  const voidBonus = (fam?.trait === "Vide" ? 1 : 0) + (sch?.trait === "Vide" ? 1 : 0);
  const baseVoid = 2 + voidBonus;

  if (voi > baseVoid) {
    for (let r = baseVoid + 1; r <= voi; r++) {
      const costPerRank = hasAdv("enlightened") ? Math.max(1, (r * 6) - 2) : (r * 6);
      xpSpent += costPerRank;
    }
  }

  const isObtuse = hasDisadv("obtuse");
  const allCatalogSkills = getSkills();

  currentSkills.forEach(sk => {
    if (sk.isChoice && !sk.chosen) return;

    let start = sk.isSchool ? 1 : 0;
    const catSk = allCatalogSkills.find(s => s.name === sk.name);
    const sName = (sk.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const sType = (sk.type || catSk?.type || "").toLowerCase();
    const isHighSkill = sType.includes("noble") || sType.includes("haute") || sType.includes("high");
    const isExemptHigh = sName.includes("enquete") || sName.includes("investigation") || sName.includes("medecine") || sName.includes("medicine");

    if (sk.rank > start) {
      for (let r = start + 1; r <= sk.rank; r++) {
        let skillStepCost = (sk.isSchool && hasAdv("prodigy")) ? Math.max(1, r - 1) : r;
        if (isObtuse && isHighSkill && !isExemptHigh) {
          skillStepCost *= 2;
        }
        xpSpent += skillStepCost;
      }
    }
    if (sk.spec) xpSpent += 2;
  });

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
  if (typeof window.characterKatas !== "undefined" && Array.isArray(window.characterKatas)) {
    const kataKihoXP = window.characterKatas.reduce((acc, k) => acc + (parseInt(k.cost ?? k.xpCost ?? k.mastery) || 0), 0);
    xpSpent += kataKihoXP;
  }

  let rawDisadvGain = disadvantagesList.reduce((acc, d) => acc + (parseInt(d.gain) || 0), 0);
  let disadvGain = Math.min(rawDisadvGain, MAX_DISADVANTAGE_XP);
  document.getElementById('disadv-gain-total').textContent = disadvGain;

  const baseXPInput = document.getElementById('base-xp-input');
  const baseXP = baseXPInput ? (parseInt(baseXPInput.value) || 0) : 40;

  let totalXP = baseXP + disadvGain;
  let remainingXP = totalXP - xpSpent;

  document.getElementById('xp-total').textContent = totalXP;
  const remEl = document.getElementById('xp-remaining');
  remEl.textContent = remainingXP;
  remEl.className = remainingXP >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold";

  // 3. Insight & Rang d'École
  let sumRings = rEarth + rWater + rAir + rFire + rVoid;
  let sumSkills = currentSkills.reduce((acc, sk) => {
    if (sk.isChoice && !sk.chosen) return acc;
    return acc + (parseInt(sk.rank) || 0);
  }, 0);
  let insight = (sumRings * 10) + sumSkills;

  let insightRank = 1;
  if (insight >= 225) insightRank = 5;
  else if (insight >= 200) insightRank = 4;
  else if (insight >= 175) insightRank = 3;
  else if (insight >= 150) insightRank = 2;

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

  // Sauvegarde automatique du brouillon à chaque modification (Ticket 1)
  autoSaveCharacterDraft();
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

function autoSaveCharacterDraft() {
  if (isBootstrapping || window.isRestoringCharacter) return;
  try {
    const data = collectCharacterData();
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Impossible d'auto-sauvegarder le brouillon :", e);
  }
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
  }
}

function saveCharacterToDojo() {
  try {
    const data = collectCharacterData();
    window.currentCharacterId = data.id;

    const rawDojo = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem('l5r_saved_characters');
    let dojoList = rawDojo ? JSON.parse(rawDojo) : [];
    if (!Array.isArray(dojoList)) dojoList = [];

    const existingIndex = dojoList.findIndex(
      c => c.id === data.id || ((c.name || "").toLowerCase() === data.name.toLowerCase())
    );

    if (existingIndex !== -1) {
      data.id = dojoList[existingIndex].id;
      dojoList[existingIndex] = data;
    } else {
      dojoList.push(data);
    }

    const serialized = JSON.stringify(dojoList);
    localStorage.setItem(DOJO_STORAGE_KEY, serialized);
    localStorage.setItem('l5r_saved_characters', serialized);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));

    renderDojoList();
    alert(`✅ « ${data.name} » a bien été enregistré dans votre Dojo local !`);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'enregistrement dans le navigateur. Utilisez l'export JSON par sécurité.");
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

function exportOfficialPDF() {
  updateAll();

  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  const clan = clans[clanKey];
  const schObj = getSelectedSchoolObject();
  const sch = schObj?.school;

  const pcName = document.getElementById('pc-name')?.value || "Samouraï";
  const schoolDisplayLabel = sch
    ? (schObj.isExternalClan ? `${sch.name} (${schObj.clanName})` : sch.name)
    : "École";

  // Identité
  document.getElementById('p-name').textContent = pcName;
  document.getElementById('p-name-2').textContent = pcName;
  document.getElementById('p-clan').textContent = clan ? clan.name : "Clan";
  document.getElementById('p-clan-2').textContent = clan ? clan.name : "Clan";
  document.getElementById('p-school').textContent = schoolDisplayLabel;
  document.getElementById('p-school-2').textContent = schoolDisplayLabel;
  document.getElementById('p-xp').textContent = `${document.getElementById('xp-remaining')?.textContent} / ${document.getElementById('xp-total')?.textContent} XP`;
  document.getElementById('p-insight').textContent = document.getElementById('insight-display')?.textContent || "120 pts (Rang 1)";
  document.getElementById('p-honor').textContent = document.getElementById('stat-honor')?.textContent || "4.5";

  // Traits et Anneaux
  const sta = document.getElementById('trait-stamina').value;
  const wil = document.getElementById('trait-willpower').value;
  const str = document.getElementById('trait-strength').value;
  const per = document.getElementById('trait-perception').value;
  const ref = document.getElementById('trait-reflexes').value;
  const awa = document.getElementById('trait-awareness').value;
  const agi = document.getElementById('trait-agility').value;
  const int = document.getElementById('trait-intelligence').value;
  const voi = document.getElementById('trait-void').value;

  document.getElementById('p-t-sta').textContent = sta;
  document.getElementById('p-t-wil').textContent = wil;
  document.getElementById('p-t-str').textContent = str;
  document.getElementById('p-t-per').textContent = per;
  document.getElementById('p-t-ref').textContent = ref;
  document.getElementById('p-t-awa').textContent = awa;
  document.getElementById('p-t-agi').textContent = agi;
  document.getElementById('p-t-int').textContent = int;
  document.getElementById('p-t-voi').textContent = voi;

  document.getElementById('p-r-earth').textContent = document.getElementById('ring-earth').textContent;
  document.getElementById('p-r-water').textContent = document.getElementById('ring-water').textContent;
  document.getElementById('p-r-air').textContent = document.getElementById('ring-air').textContent;
  document.getElementById('p-r-fire').textContent = document.getElementById('ring-fire').textContent;
  document.getElementById('p-r-void').textContent = document.getElementById('ring-void').textContent;

  // Combat
  document.getElementById('p-init').textContent = document.getElementById('sticky-init')?.textContent || "3g2";
  document.getElementById('p-init-note').textContent = document.getElementById('sticky-init-detail')?.textContent || "";
  document.getElementById('p-armor-tn').textContent = document.getElementById('sticky-armor-tn')?.textContent || "20";
  document.getElementById('p-armor-note').textContent = document.getElementById('sticky-armor-detail')?.textContent || "";
  document.getElementById('p-heal').textContent = document.getElementById('stat-heal')?.textContent || "5 PV";

  const armorSel = document.getElementById('pc-armor');
  document.getElementById('p-armor-name').textContent = armorSel?.options[armorSel.selectedIndex]?.text?.split('(')[0] || "Aucune";
  document.getElementById('p-armor-reduc').textContent = armorSel?.value === "10" ? "Réduction : 5" : (armorSel?.value === "5" ? "Réduction : 3" : "Réduction : 0");

  // Compétences
  const skillsBody = document.getElementById('p-skills-body');
  skillsBody.innerHTML = currentSkills.map(sk => {
    const displayName = (sk.isChoice && !sk.chosen) ? `[À choisir : ${sk.name}]` : sk.name;
    const traitVal = parseInt(agi);
    const roll = (sk.isChoice && !sk.chosen) ? "—" : `${sk.rank + traitVal}g${traitVal}`;
    const masteriesSummary = getMasteriesSummary(sk.name, sk.rank);
    const notesParts = [];
    if (sk.spec) notesParts.push("Spé (relance les 1)");
    if (masteriesSummary) notesParts.push(masteriesSummary);

    return `
      <tr class="border-b border-stone-200">
        <td class="p-1 font-bold">${displayName}</td>
        <td class="p-1 text-center">${sk.isSchool ? '✓' : ''}</td>
        <td class="p-1 text-center font-bold font-imperial">${sk.rank}</td>
        <td class="p-1 text-center font-bold">${roll}</td>
        <td class="p-1 text-stone-600 text-[8px]">${notesParts.join(' • ')}</td>
      </tr>
    `;
  }).join('');

  // Armes
  const w1 = document.getElementById('pc-weapon-1')?.value || "Katana";
  const w2 = document.getElementById('pc-weapon-2')?.value || "Aucune";
  const wBox = document.getElementById('p-weapons-box');
  wBox.innerHTML = `
    <div class="border-b border-stone-200 pb-1">
      <div class="font-bold font-imperial">${w1} (Principale)</div>
      <div><b>Toucher :</b> ${document.getElementById('sticky-atk')?.textContent || '3g2'} | <b>Dégâts :</b> ${document.getElementById('sticky-dmg')?.textContent || '4g2'}</div>
      <div class="text-stone-500 text-[7px]">${document.getElementById('sticky-atk-detail')?.textContent || ''}</div>
    </div>
    ${w2 !== 'Aucune' ? `
      <div class="pt-1">
        <div class="font-bold font-imperial">${w2} (Secondaire)</div>
      </div>
    ` : ''}
  `;

  // Paliers de blessures
  const woundLevels = [
    { name: "Indemne (+0)", id: "w-0" },
    { name: "Égratigné (+3)", id: "w-1" },
    { name: "Blessé Léger (+5)", id: "w-2" },
    { name: "Blessé (+10)", id: "w-3" },
    { name: "Gravement (+15)", id: "w-4" },
    { name: "Estropié (+20)", id: "w-5" },
    { name: "Inconscient (+40)", id: "w-6" },
    { name: "Mortel", id: "w-7" }
  ];
  document.getElementById('p-wounds-body').innerHTML = woundLevels.map(wl => `
    <tr class="border-b border-stone-200">
      <td class="text-left pl-1 font-bold">${wl.name}</td>
      <td>${wl.name.includes('+') ? wl.name.split('(')[1].replace(')', '') : '—'}</td>
      <td class="font-bold">${document.getElementById(wl.id)?.textContent || '4 PV'}</td>
      <td class="border-l border-stone-300"></td>
    </tr>
  `).join('');

  // Avantages & Désavantages
  document.getElementById('p-adv-total').textContent = `${document.getElementById('adv-cost-total')?.textContent || '0'} XP`;
  document.getElementById('p-adv-list').innerHTML = advantagesList.length ? advantagesList.map(a => {
    const full = resolveCatalogAdvantage(a.id || a.name) || a;
    let extraNote = "";
    if (isDifferentSchoolAdv(a.name) && a.differentSchoolName) {
      extraNote = ` — <i>École suivie : ${a.differentSchoolName}</i>`;
    } else if (isMultipleSchoolsAdv(a.name) && a.secondarySchoolName) {
      extraNote = ` — <i>Seconde école : ${a.secondarySchoolName} (Rang ${a.secondarySchoolRank || 1})</i>`;
    }
    return `<div><b>${a.name}</b> (${a.cost} XP) [${full?.type || 'Don'}] : <span class="text-stone-600">${full?.rule || full?.desc || ''}${extraNote}</span></div>`;
  }).join('') : '<div class="text-stone-400 italic">Aucun avantage sélectionné.</div>';

  document.getElementById('p-disadv-total').textContent = `${document.getElementById('disadv-gain-total')?.textContent || '0'} / 15 XP`;
  document.getElementById('p-disadv-list').innerHTML = disadvantagesList.length ? disadvantagesList.map(d => {
    const full = resolveCatalogDisadvantage(d.id || d.name) || d;
    return `<div><b>${d.name}</b> (+${d.gain} XP) [${full?.type || 'Défaut'}] : <span class="text-stone-600">${full?.rule || full?.desc || ''}</span></div>`;
  }).join('') : '<div class="text-stone-400 italic">Aucun désavantage sélectionné.</div>';

  // Techniques d'École
  const techList = sch?.techniques || (sch?.technique ? [sch.technique] : []);
  const currentRank = parseInt(document.getElementById('insight-display')?.textContent?.match(/Rang (\d)/)?.[1]) || 1;
  document.getElementById('p-tech-name').textContent = `${schoolDisplayLabel} (Progression)`;

  let printTechHtml = techList.map(t => {
    const tag = t.rank === currentRank ? "<b>[ACTIF]</b> " : (t.rank < currentRank ? "<i>[MAÎTRISÉ]</i> " : "[Verrouillé] ");
    return `<div class="mb-1">${tag}<b>Rang ${t.rank} - ${t.name} :</b> ${t.effect}</div>`;
  }).join('');

  const multiAdv = advantagesList.find(a => isMultipleSchoolsAdv(a.name));
  if (multiAdv && multiAdv.secondarySchoolId) {
    const allSchools = getAllSchoolsCatalog();
    const secSchool = allSchools.find(s => s.id === multiAdv.secondarySchoolId);
    if (secSchool) {
      const secRank = multiAdv.secondarySchoolRank || 1;
      printTechHtml += `<div class="mt-2 pt-1 border-t border-stone-300 font-bold text-stone-800">Seconde École : ${secSchool.name} (${secSchool.clanName}) — Rang ${secRank}</div>`;
      printTechHtml += (secSchool.techniques || []).map(t => {
        const tag = t.rank <= secRank ? "<b>[ACQUIS]</b> " : "[Non acquis] ";
        return `<div class="mb-0.5 text-stone-700">${tag}Rang ${t.rank} - ${t.name} : ${t.effect}</div>`;
      }).join('');
    }
  }

  document.getElementById('p-tech-desc').innerHTML = printTechHtml;
  document.getElementById('p-outfit-desc').textContent = document.getElementById('pc-outfit')?.value || "";

  window.print();
}

// Exposition globale pour createcharacter.html et export-carnet.js
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
}

window.addEventListener('DOMContentLoaded', bootstrap);
