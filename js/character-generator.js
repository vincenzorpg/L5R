/**
 * character-generator.js — Moteur logique complet L5R 4e Édition
 * Règles officielles du Book of Earth (p. 80-82) :
 * - Initiative : (Rang d'Insight + Réflexes) g Réflexes
 * - Toucher : (Compétence d'arme + Agilité ou Réflexes) g Trait
 * - Dégâts : VD Arme + Force (+ École / Avantages)
 * - ND d'Armure : 5 + (5 x Réflexes) + Armure (+ Modificateurs)
 */

const MAX_DISADVANTAGE_XP = 15;

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

  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    nameInput.addEventListener('input', updateStickyName);
  }
  updateStickyName();
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

  const skSel = document.getElementById('sel-add-skill');
  if (skSel) {
    skSel.innerHTML = "";
    skills.forEach(s => {
      let opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = `${s.name} (${s.type} - ${s.trait})`;
      skSel.appendChild(opt);
    });
  }

  const armSel = document.getElementById('pc-armor');
  if (armSel) {
    armSel.innerHTML = "";
    eq.armures.forEach(a => {
      let opt = document.createElement('option');
      opt.value = a.tn;
      opt.textContent = a.name;
      armSel.appendChild(opt);
    });
  }

  const w1Sel = document.getElementById('pc-weapon-1');
  const w2Sel = document.getElementById('pc-weapon-2');
  if (w1Sel && w2Sel) {
    w1Sel.innerHTML = "";
    w2Sel.innerHTML = "<option value='Aucune'>Aucune arme secondaire</option>";

    eq.armes.forEach(w => {
      let opt1 = document.createElement('option');
      opt1.value = w.name;
      opt1.textContent = `${w.name} (VD ${w.vd}, ${w.type})`;
      w1Sel.appendChild(opt1);

      let opt2 = document.createElement('option');
      opt2.value = w.name;
      opt2.textContent = `${w.name} (VD ${w.vd})`;
      w2Sel.appendChild(opt2);
    });
  }

  const advSel = document.getElementById('sel-catalog-adv');
  if (advSel) {
    advSel.innerHTML = "";
    (adv.avantages || []).forEach((a, idx) => {
      let opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${a.name} (${a.cost} XP) — [${a.type}]`;
      advSel.appendChild(opt);
    });
  }

  const disadvSel = document.getElementById('sel-catalog-disadv');
  if (disadvSel) {
    disadvSel.innerHTML = "";
    (adv.desavantages || []).forEach((d, idx) => {
      let opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${d.name} (+${d.gain} XP) — [${d.type}]`;
      disadvSel.appendChild(opt);
    });
  }

  updateDisadvButtonState();
}

function resetSheetToNewSelection() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  if (!clanKey || !clans[clanKey]) return;

  const clan = clans[clanKey];
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const schIdx = parseInt(document.getElementById('sel-school')?.value) || 0;

  const fam = clan.families[famIdx];
  const sch = clan.schools[schIdx];
  if (!fam || !sch) return;

  document.getElementById('family-bonus').textContent = `Bonus Famille : ${fam.bonus}`;
  document.getElementById('school-bonus').textContent = `Bonus École : ${sch.bonus}`;
  document.getElementById('tech-name').textContent = sch.technique.name;
  document.getElementById('tech-effect').textContent = sch.technique.effect;
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

  currentSkills = sch.skills.map(s => ({
    name: s,
    rank: 1,
    spec: false,
    isSchool: true
  }));
  renderSkills();

  // Équipement par défaut adapté à l'école
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

  advantagesList = [];
  disadvantagesList = [];
  renderAdvDisadv();

  updateAll();
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

  const schSel = document.getElementById('sel-school');
  schSel.innerHTML = "";
  clan.schools.forEach((s, idx) => {
    let opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${s.name} (${s.bonus})`;
    schSel.appendChild(opt);
  });

  resetSheetToNewSelection();
}

function onFamilyChange() {
  resetSheetToNewSelection();
}

function onSchoolChange() {
  resetSheetToNewSelection();
}

function updateDisadvButtonState() {
  const currentTotalGain = disadvantagesList.reduce((acc, d) => acc + d.gain, 0);
  const btnAddDisadv = document.querySelector("button[onclick='addDisadvFromCatalog()']");
  const selectDisadv = document.getElementById('sel-catalog-disadv');

  if (btnAddDisadv) {
    if (currentTotalGain >= MAX_DISADVANTAGE_XP) {
      btnAddDisadv.disabled = true;
      btnAddDisadv.classList.add('opacity-40', 'cursor-not-allowed');
      btnAddDisadv.title = `Limite de ${MAX_DISADVANTAGE_XP} XP de désavantages atteinte.`;
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
    alert(`Impossible d'ajouter « ${item.name} » (${item.cost} XP) : solde insuffisant (${currentRemainingXP} XP disponible).`);
    return;
  }

  advantagesList.push({ name: item.name, cost: item.cost });
  renderAdvDisadv();
  updateAll();
}

function addDisadvFromCatalog() {
  const adv = getAdvantages();
  const idx = document.getElementById('sel-catalog-disadv').value;
  if (idx === "" || !adv.desavantages[idx]) return;

  const item = adv.desavantages[idx];

  if (disadvantagesList.some(d => d.name === item.name)) {
    alert(`Le désavantage « ${item.name} » est déjà sélectionné.`);
    return;
  }

  const currentTotalGain = disadvantagesList.reduce((acc, d) => acc + d.gain, 0);
  if (currentTotalGain + item.gain > MAX_DISADVANTAGE_XP) {
    alert(`Seuil dépassé ! Vous avez déjà ${currentTotalGain} / ${MAX_DISADVANTAGE_XP} XP de désavantages. L'ajout de « ${item.name} » (+${item.gain} XP) atteindrait ${currentTotalGain + item.gain} XP.`);
    return;
  }

  disadvantagesList.push({ name: item.name, gain: item.gain });
  renderAdvDisadv();
  updateAll();
}

function removeAdv(idx) {
  advantagesList.splice(idx, 1);
  renderAdvDisadv();
  updateAll();
}

function removeDisadv(idx) {
  disadvantagesList.splice(idx, 1);
  renderAdvDisadv();
  updateAll();
}

function renderAdvDisadv() {
  const advContainer = document.getElementById('adv-container');
  if (advContainer) {
    advContainer.innerHTML = advantagesList.map((a, i) => `
      <div class="flex justify-between items-center p-1.5 rounded bg-black/40 border border-stone-800">
        <span class="text-stone-300">${a.name} (${a.cost} XP)</span>
        <button onclick="removeAdv(${i})" class="text-red-400 font-bold hover:text-red-300 px-1">✕</button>
      </div>
    `).join('');
  }

  const disadvContainer = document.getElementById('disadv-container');
  if (disadvContainer) {
    disadvContainer.innerHTML = disadvantagesList.map((d, i) => `
      <div class="flex justify-between items-center p-1.5 rounded bg-black/40 border border-stone-800">
        <span class="text-stone-300">${d.name} (+${d.gain} XP)</span>
        <button onclick="removeDisadv(${i})" class="text-red-400 font-bold hover:text-red-300 px-1">✕</button>
      </div>
    `).join('');
  }

  updateDisadvButtonState();
}

function renderSkills() {
  const container = document.getElementById('skills-list');
  if (!container) return;
  container.innerHTML = currentSkills.map((sk, idx) => `
    <div class="p-2.5 rounded bg-black/60 border border-stone-800 flex items-center justify-between gap-2">
      <div class="flex-1 truncate">
        <span class="font-bold text-amber-200">${sk.name}</span>
        ${sk.isSchool ? '<span class="text-[9px] px-1 rounded bg-amber-950 text-amber-400 ml-1">École</span>' : ''}
      </div>
      <div class="flex items-center gap-1.5">
        <label class="text-[10px] text-stone-400 flex items-center gap-1">
          <input type="checkbox" ${sk.spec ? 'checked' : ''} onchange="toggleSkillSpec(${idx})" class="rounded"> Spé (+2 XP)
        </label>
        <input type="number" min="0" max="10" value="${sk.rank}" oninput="changeSkillRank(${idx}, this.value)" class="w-12 p-1 rounded text-center font-bold text-amber-300">
        <button onclick="removeSkill(${idx})" class="text-stone-500 hover:text-red-400 font-bold px-1">✕</button>
      </div>
    </div>
  `).join('');
}

function addSkillFromCatalog() {
  const name = document.getElementById('sel-add-skill').value;
  if (name && !currentSkills.some(s => s.name === name)) {
    currentSkills.push({ name, rank: 1, spec: false, isSchool: false });
    renderSkills();
    updateAll();
  }
}

function removeSkill(idx) {
  currentSkills.splice(idx, 1);
  renderSkills();
  updateAll();
}

function changeSkillRank(idx, val) {
  currentSkills[idx].rank = parseInt(val) || 0;
  updateAll();
}

function toggleSkillSpec(idx) {
  currentSkills[idx].spec = !currentSkills[idx].spec;
  updateAll();
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
}

// =========================================================================
// CALCULS DYNAMIQUES 4E ÉDITION (BOOK OF EARTH P. 80-82)
// =========================================================================
function updateAll() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  const famIdx = document.getElementById('sel-family')?.value;
  const schIdx = document.getElementById('sel-school')?.value;

  const fam = clans[clanKey]?.families[famIdx];
  const sch = clans[clanKey]?.schools[schIdx];

  const sta = parseInt(document.getElementById('trait-stamina').value) || 2;
  const wil = parseInt(document.getElementById('trait-willpower').value) || 2;
  const str = parseInt(document.getElementById('trait-strength').value) || 2;
  const per = parseInt(document.getElementById('trait-perception').value) || 2;
  const ref = parseInt(document.getElementById('trait-reflexes').value) || 2;
  const awa = parseInt(document.getElementById('trait-awareness').value) || 2;
  const agi = parseInt(document.getElementById('trait-agility').value) || 2;
  const int = parseInt(document.getElementById('trait-intelligence').value) || 2;
  const voi = parseInt(document.getElementById('trait-void').value) || 2;

  // 1. Calcul des 5 Anneaux
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

  const hasAdv = (impactName) => advantagesList.some(a => {
    const found = getAdvantages().avantages?.find(x => x.name === a.name);
    return found && found.impact === impactName;
  });

  const hasDisadv = (impactName) => disadvantagesList.some(d => {
    const found = getAdvantages().desavantages?.find(x => x.name === d.name);
    return found && found.impact === impactName;
  });

  // 2. Calcul du Budget XP
  let xpSpent = 0;
  const traitsBase = [
    { val: sta, bonus: (fam?.trait === "Constitution" ? 1 : 0) + (sch?.trait === "Constitution" ? 1 : 0) },
    { val: wil, bonus: (fam?.trait === "Volonté" ? 1 : 0) + (sch?.trait === "Volonté" ? 1 : 0) },
    { val: str, bonus: (fam?.trait === "Force" ? 1 : 0) + (sch?.trait === "Force" ? 1 : 0) },
    { val: per, bonus: (fam?.trait === "Perception" ? 1 : 0) + (sch?.trait === "Perception" ? 1 : 0) },
    { val: ref, bonus: (fam?.trait === "Réflexes" ? 1 : 0) + (sch?.trait === "Réflexes" ? 1 : 0) },
    { val: awa, bonus: (fam?.trait === "Intuition" ? 1 : 0) + (sch?.trait === "Intuition" ? 1 : 0) },
    { val: agi, bonus: (fam?.trait === "Agilité" ? 1 : 0) + (sch?.trait === "Agilité" ? 1 : 0) },
    { val: int, bonus: (fam?.trait === "Intelligence" ? 1 : 0) + (sch?.trait === "Intelligence" ? 1 : 0) }
  ];

  traitsBase.forEach(t => {
    let baseStart = 2 + t.bonus;
    if (t.val > baseStart) {
      for (let r = baseStart + 1; r <= t.val; r++) xpSpent += r * 4;
    }
  });

  if (voi > 2) {
    for (let r = 3; r <= voi; r++) xpSpent += r * 6;
  }

  currentSkills.forEach(sk => {
    let start = sk.isSchool ? 1 : 0;
    if (sk.rank > start) {
      for (let r = start + 1; r <= sk.rank; r++) xpSpent += r * 1;
    }
    if (sk.spec) xpSpent += 2;
  });

  let advCost = advantagesList.reduce((acc, a) => acc + a.cost, 0);
  document.getElementById('adv-cost-total').textContent = advCost;
  xpSpent += advCost;

  let rawDisadvGain = disadvantagesList.reduce((acc, d) => acc + d.gain, 0);
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

  // 3. Insight et Rang d'École (4e Édition : Tranches de 25)
  let sumRings = rEarth + rWater + rAir + rFire + rVoid;
  let sumSkills = currentSkills.reduce((acc, sk) => acc + sk.rank, 0);
  let insight = (sumRings * 10) + sumSkills;

  let insightRank = 1;
  if (insight >= 225) insightRank = 5;
  else if (insight >= 200) insightRank = 4;
  else if (insight >= 175) insightRank = 3;
  else if (insight >= 150) insightRank = 2;

  document.getElementById('insight-display').innerHTML = `${insight} pts <span class="text-xs text-amber-400 font-bold">(Rang ${insightRank})</span>`;

  const stickySchool = document.getElementById('sticky-school-badge');
  if (stickySchool && sch) stickySchool.textContent = sch.name;

  // --- 4. CALCUL OFFICIEL DU JET POUR TOUCHER (Book of Earth, p. 80-82) ---
  const weapon1Name = document.getElementById('pc-weapon-1')?.value || "Katana";
  const weaponData = getEquipment().armes?.find(w => w.name === weapon1Name) || {
    name: weapon1Name,
    vd: "3g2",
    trait: "Agilité",
    skill: "Kenjutsu",
    type: "Médium"
  };

  const isRanged = (weaponData.type === "Distance" || weaponData.skill === "Kyujutsu");
  const atkTraitName = isRanged ? "Réflexes" : (weaponData.trait || "Agilité");
  const atkTraitVal = (atkTraitName === "Réflexes") ? ref : agi;
  const atkSkillName = weaponData.skill || (isRanged ? "Kyujutsu" : "Kenjutsu");

  // Recherche de la compétence correspondante
  const skillObj = currentSkills.find(s => {
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
    // Règle 4e Édition : Jet Non Entraîné (Unskilled Roll) = Trait g Trait sans explosion
    atkRoll = atkTraitVal;
    atkDetails.push(`Non entraîné : ${atkTraitName} (${atkTraitVal}) sans explosion`);
  }

  if (hasAdv("school_skills_bonus") && skillObj?.isSchool) {
    atkRoll += 1;
    atkDetails.push("Prodige (+1g0)");
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

  // --- 5. CALCUL OFFICIEL DU JET DE DÉGÂTS (Book of Earth, p. 82) ---
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
    dmgRoll += 3; // Force standard d'un grand arc Yumi rokugani
    dmgDetails.push("Force d'Arc (+3g0)");
  }

  if (sch?.id === "bushi-hida" || sch?.name?.includes("Hida")) {
    dmgBonusStatic += sta;
    dmgDetails.push(`Voie du Crabe (+${sta})`);
  }

  if (hasAdv("large_wounds") && (weaponData.type === "Médium" || weaponData.type === "Lourd" || weaponData.type === "Deux mains" || weaponData.type === "Hast")) {
    dmgRoll += 1;
    dmgDetails.push("Grande Taille (+1g0)");
  }

  if (disadvantagesList.some(d => d.name.includes("Petite Taille")) && !isRanged) {
    dmgRoll = Math.max(dmgKeep, dmgRoll - 1);
    dmgDetails.push("Petite Taille (-1g0)");
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

  // --- 6. CALCUL OFFICIEL DE L'INITIATIVE (Book of Earth, p. 81) ---
  // Formule officielle 4e : (Rang d'Insight + Réflexes) g Réflexes
  let initRoll = insightRank + ref;
  let initKeep = ref;
  let initStatic = 0;
  let initDetails = [`Insight ${insightRank} + Réfl. ${ref} (${insightRank + ref}g${ref})`];

  if (hasAdv("initiative_bonus")) {
    initRoll += 1;
    initKeep += 1;
    initDetails.push("Réflexes Éclairs (+1g1)");
  }

  if (sch?.id === "eclaireur-hiruma" || sch?.name?.includes("Hiruma")) {
    initRoll += 1;
    initDetails.push("Hiruma (+1g0)");
  }

  const iaiSkill = currentSkills.find(s => s.name.toLowerCase().includes("iaijutsu"));
  const iaiRank = iaiSkill ? iaiSkill.rank : 0;
  if ((sch?.id === "duelliste-kakita" || sch?.name?.includes("Kakita")) && iaiRank > 0) {
    initStatic += (iaiRank * 2);
    initDetails.push(`Voie de la Grue (+${iaiRank * 2})`);
  }

  if ((sch?.id === "bushi-bayushi" || sch?.name?.includes("Bayushi")) && iaiRank > 0) {
    initStatic += iaiRank;
    initDetails.push(`Ruse du Scorpion (+${iaiRank})`);
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

  // --- 7. CALCUL DU ND D'ARMURE ---
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
    nitenBonus = 5;
    armorDetails.push("Niten (+5)");
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

  // Vitalité et récupération nocturne
  let effSta = sta;
  if (hasAdv("quick_heal")) effSta += 2;
  document.getElementById('stat-heal').textContent = `${(effSta * 2) + insightRank} PV`;

  let woundMod = 0;
  if (hasAdv("large_wounds")) woundMod += 1;
  if (hasDisadv("reduce_wounds")) woundMod -= 1;

  const healthyWounds = Math.max(1, (rEarth * 5) + woundMod);
  const stepWounds = Math.max(1, (rEarth * 2) + woundMod);

  document.getElementById('w-0').textContent = `${healthyWounds} PV`;
  for (let i = 1; i <= 7; i++) {
    document.getElementById(`w-${i}`).textContent = `${stepWounds} PV`;
  }

  updateDisadvButtonState();
}

function randomizeAll() {
  const clans = getClans();
  const adv = getAdvantages();
  const clanKeys = Object.keys(clans);
  if (!clanKeys.length) return;

  const randomClan = clanKeys[Math.floor(Math.random() * clanKeys.length)];
  document.getElementById('sel-clan').value = randomClan;
  onClanChange();

  const clan = clans[randomClan];
  document.getElementById('sel-family').value = Math.floor(Math.random() * clan.families.length);
  document.getElementById('sel-school').value = Math.floor(Math.random() * clan.schools.length);

  resetSheetToNewSelection();
  generateRandomName(Math.random() > 0.5 ? 'm' : 'f');

  advantagesList = adv.avantages?.length ? [{ name: adv.avantages[0].name, cost: adv.avantages[0].cost }] : [];
  disadvantagesList = adv.desavantages?.length ? [{ name: adv.desavantages[0].name, gain: adv.desavantages[0].gain }] : [];
  renderAdvDisadv();

  document.getElementById('trait-void').value = 3;
  if (currentSkills.length >= 2) {
    currentSkills[0].rank = 2;
    currentSkills[1].rank = 2;
    currentSkills[0].spec = true;
  }
  renderSkills();
  updateAll();
}

function exportJSON() {
  const data = {
    name: document.getElementById('pc-name').value,
    baseXP: document.getElementById('base-xp-input')?.value || "40",
    clan: document.getElementById('sel-clan').value,
    family: document.getElementById('sel-family').value,
    school: document.getElementById('sel-school').value,
    traits: {
      sta: document.getElementById('trait-stamina').value,
      wil: document.getElementById('trait-willpower').value,
      str: document.getElementById('trait-strength').value,
      per: document.getElementById('trait-perception').value,
      ref: document.getElementById('trait-reflexes').value,
      awa: document.getElementById('trait-awareness').value,
      agi: document.getElementById('trait-agility').value,
      int: document.getElementById('trait-intelligence').value,
      voi: document.getElementById('trait-void').value
    },
    skills: currentSkills,
    advantages: advantagesList,
    disadvantages: disadvantagesList,
    armor: document.getElementById('pc-armor').value,
    weapon1: document.getElementById('pc-weapon-1').value,
    weapon2: document.getElementById('pc-weapon-2').value,
    outfit: document.getElementById('pc-outfit').value
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${data.name.replace(/\s+/g, '_')}_L5R4e.json`;
  a.click();
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const d = JSON.parse(e.target.result);

      if (d.baseXP !== undefined) {
        const baseInput = document.getElementById('base-xp-input');
        if (baseInput) baseInput.value = d.baseXP;
      }

      document.getElementById('sel-clan').value = d.clan;
      onClanChange();
      document.getElementById('sel-family').value = d.family;
      document.getElementById('sel-school').value = d.school;
      resetSheetToNewSelection();

      document.getElementById('pc-name').value = d.name;
      updateStickyName();

      document.getElementById('trait-stamina').value = d.traits.sta;
      document.getElementById('trait-willpower').value = d.traits.wil;
      document.getElementById('trait-strength').value = d.traits.str;
      document.getElementById('trait-perception').value = d.traits.per;
      document.getElementById('trait-reflexes').value = d.traits.ref;
      document.getElementById('trait-awareness').value = d.traits.awa;
      document.getElementById('trait-agility').value = d.traits.agi;
      document.getElementById('trait-intelligence').value = d.traits.int;
      document.getElementById('trait-void').value = d.traits.voi;

      currentSkills = d.skills || [];
      advantagesList = d.advantages || [];
      disadvantagesList = d.disadvantages || [];

      if (d.armor) document.getElementById('pc-armor').value = d.armor;
      if (d.weapon1) document.getElementById('pc-weapon-1').value = d.weapon1;
      if (d.weapon2) document.getElementById('pc-weapon-2').value = d.weapon2;
      if (d.outfit) document.getElementById('pc-outfit').value = d.outfit;

      renderSkills();
      renderAdvDisadv();
      updateAll();
    } catch(err) {
      alert("Erreur de format JSON.");
    }
  };
  reader.readAsText(file);
}

function resetCharacter() {
  if (confirm("Réinitialiser entièrement la fiche ?")) {
    const baseInput = document.getElementById('base-xp-input');
    if (baseInput) baseInput.value = 40;
    onClanChange();
  }
}
// =========================================================================
// GÉNÉRATION DE LA FICHE OFFICIELLE IMPRIMABLE (A4 VECTORIEL)
// =========================================================================
function exportOfficialPDF() {
  updateAll(); // S'assure que tout est synchronisé

  const clans = getClans();
  const clanKey = document.getElementById('sel-clan')?.value;
  const clan = clans[clanKey];
  const famIdx = parseInt(document.getElementById('sel-family')?.value) || 0;
  const schIdx = parseInt(document.getElementById('sel-school')?.value) || 0;
  const fam = clan?.families?.[famIdx];
  const sch = clan?.schools?.[schIdx];

  const pcName = document.getElementById('pc-name')?.value || "Samouraï";

  // 1. Identité
  document.getElementById('p-name').textContent = pcName;
  document.getElementById('p-name-2').textContent = pcName;
  document.getElementById('p-clan').textContent = clan ? clan.name : "Clan";
  document.getElementById('p-clan-2').textContent = clan ? clan.name : "Clan";
  document.getElementById('p-school').textContent = sch ? sch.name : "École";
  document.getElementById('p-school-2').textContent = sch ? sch.name : "École";
  document.getElementById('p-xp').textContent = `${document.getElementById('xp-remaining')?.textContent} / ${document.getElementById('xp-total')?.textContent} XP`;
  document.getElementById('p-insight').textContent = document.getElementById('insight-display')?.textContent || "120 pts (Rang 1)";
  document.getElementById('p-honor').textContent = document.getElementById('stat-honor')?.textContent || "4.5";

  // 2. Anneaux et Traits
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

  // 3. Combat
  document.getElementById('p-init').textContent = document.getElementById('sticky-init')?.textContent || "3g2";
  document.getElementById('p-init-note').textContent = document.getElementById('sticky-init-detail')?.textContent || "";
  document.getElementById('p-armor-tn').textContent = document.getElementById('sticky-armor-tn')?.textContent || "20";
  document.getElementById('p-armor-note').textContent = document.getElementById('sticky-armor-detail')?.textContent || "";
  document.getElementById('p-heal').textContent = document.getElementById('stat-heal')?.textContent || "5 PV";

  const armorSel = document.getElementById('pc-armor');
  document.getElementById('p-armor-name').textContent = armorSel?.options[armorSel.selectedIndex]?.text?.split('(')[0] || "Aucune";
  document.getElementById('p-armor-reduc').textContent = armorSel?.value === "10" ? "Réduction : 5" : (armorSel?.value === "5" ? "Réduction : 3" : "Réduction : 0");

  // 4. Compétences
  const skillsBody = document.getElementById('p-skills-body');
  skillsBody.innerHTML = currentSkills.map(sk => {
    // Calcul de jet théorique
    const traitVal = parseInt(agi);
    const roll = `${sk.rank + traitVal}g${traitVal}`;
    return `
      <tr class="border-b border-stone-200">
        <td class="p-1 font-bold">${sk.name}</td>
        <td class="p-1 text-center">${sk.isSchool ? '✓' : ''}</td>
        <td class="p-1 text-center font-bold font-imperial">${sk.rank}</td>
        <td class="p-1 text-center font-bold">${roll}</td>
        <td class="p-1 text-stone-600">${sk.spec ? 'Spécialisation active (relance les 1)' : ''}</td>
      </tr>
    `;
  }).join('');

  // 5. Armes
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

  // 6. Vitalité
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

  // 7. Avantages & Désavantages
  document.getElementById('p-adv-total').textContent = `${document.getElementById('adv-cost-total')?.textContent || '0'} XP`;
  document.getElementById('p-adv-list').innerHTML = advantagesList.length ? advantagesList.map(a => {
    const full = getAdvantages().avantages?.find(x => x.name === a.name);
    return `<div><b>${a.name}</b> (${a.cost} XP) [${full?.type || 'Don'}] : <span class="text-stone-600">${full?.desc || ''}</span></div>`;
  }).join('') : '<div class="text-stone-400 italic">Aucun avantage sélectionné.</div>';

  document.getElementById('p-disadv-total').textContent = `${document.getElementById('disadv-gain-total')?.textContent || '0'} / 15 XP`;
  document.getElementById('p-disadv-list').innerHTML = disadvantagesList.length ? disadvantagesList.map(d => {
    const full = getAdvantages().desavantages?.find(x => x.name === d.name);
    return `<div><b>${d.name}</b> (+${d.gain} XP) [${full?.type || 'Défaut'}] : <span class="text-stone-600">${full?.desc || ''}</span></div>`;
  }).join('') : '<div class="text-stone-400 italic">Aucun désavantage sélectionné.</div>';

  // 8. Technique & Dotation
  document.getElementById('p-tech-name').textContent = document.getElementById('tech-name')?.textContent || "Technique Rang 1";
  document.getElementById('p-tech-desc').textContent = document.getElementById('tech-effect')?.textContent || "";
  document.getElementById('p-outfit-desc').textContent = document.getElementById('pc-outfit')?.value || "";

  // 9. Lancement immédiat de l'impression
  window.print();
}
window.addEventListener('DOMContentLoaded', bootstrap);
