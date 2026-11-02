/**
 * js/character-generator.js — Moteur logique complet L5R 4e Édition
 * Règles officielles du Livre de Base (Book of Earth & Book of Fire) :
 * - Gestion complète de l'avantage « Études dans une Autre École (Different School) »
 * - Gestion de l'avantage « Écoles Multiples (Multiple Schools) »
 * - Correction du calcul XP de l'Anneau du Vide avec bonus d'école (+1 Vide gratuit)
 * - Prise en charge des choix de compétences (Bugei, Noble/Haute, Marchande, Libre)
 * - Paliers de Maîtrise des compétences (Rangs 3, 5 et 7)
 * - Plafond de 15 XP maximum pour les Désavantages
 * - Exportation vers fiche officielle A4 vectorielle & Carnet de Rokugan
 */

const MAX_DISADVANTAGE_XP = 15;

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
// 2. GESTION DES AVANTAGES « ÉTUDES DANS UNE AUTRE ÉCOLE » & « ÉCOLES MULTIPLES »
// =============================================================================
function isMultipleSchoolsAdv(advName) {
  const n = (advName || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return n.includes("ecole multiple") || n.includes("ecoles multiples") || n.includes("multiple school");
}

function isDifferentSchoolAdv(advName) {
  const n = (advName || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return n.includes("autre ecole") || n.includes("different school");
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

// =============================================================================
// 3. PRÉNOMS ROKUGANI & CONFIGURATION DE BASE
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

const getClans = () => window.CLANS_DATA || window.CLANS_CORE || {};
const getSkills = () => window.COMPETENCES_DATA || [];
const getEquipment = () => window.EQUIPEMENT_DATA || { armures: [], armes: [] };
const getAdvantages = () => window.AVANTAGES_DATA || { avantages: [], desavantages: [] };

function bootstrap() {
  if (!window.CLANS_DATA && !window.CLANS_CORE) {
    setTimeout(bootstrap, 50);
    return;
  }
  initClans();
  initCatalogSelectors();

  const armSel = document.getElementById('pc-armor');
  if (armSel && (!armSel.value || armSel.value === "0")) {
    if (armSel.querySelector('option[value="10"]')) {
      armSel.value = "10";
    }
  }

  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    nameInput.addEventListener('input', updateStickyName);
  }
  updateStickyName();
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

  // 4. Avantages
  const advSel = document.getElementById('sel-catalog-adv');
  if (advSel) {
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
        let opt = document.createElement('option');
        opt.value = originalIdx;
        opt.textContent = `${item.name} (${item.cost} XP) — [${item.type}]`;
        advSel.appendChild(opt);
      });
    }

    if (typeof updateAdvPreview === 'function') updateAdvPreview();
  }

  // 5. Désavantages
  const disadvSel = document.getElementById('sel-catalog-disadv');
  if (disadvSel) {
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
        let opt = document.createElement('option');
        opt.value = originalIdx;
        opt.textContent = `${item.name} (+${item.gain || item.cost} XP) — [${item.type}]`;
        disadvSel.appendChild(opt);
      });
    }

    if (typeof updateDisadvPreview === 'function') updateDisadvPreview();
  }

  updateDisadvButtonState();
}

/**
 * Construit et verrouille l'école selon la famille choisie.
 * Déverrouille l'accès aux autres clans UNIQUEMENT si l'avantage est acheté (5 XP).
 */
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
  const currentTotalGain = disadvantagesList.reduce((acc, d) => acc + d.gain, 0);
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
  const adv = getAdvantages();
  const idx = document.getElementById('sel-catalog-adv').value;
  if (idx === "" || !adv.avantages[idx]) return;

  const item = adv.avantages[idx];

  if (advantagesList.some(a => a.name === item.name)) {
    alert(`L'avantage « ${item.name} » est déjà sélectionné.`);
    return;
  }

  const currentRemainingXP = parseInt(document.getElementById('xp-remaining')?.textContent) || 0;
  if (currentRemainingXP - item.cost < 0) {
