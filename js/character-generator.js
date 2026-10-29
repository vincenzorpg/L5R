/**
 * character-generator.js — Moteur de création L5R 4e Édition
 * Déport de toute la logique dynamique pour createcharacter.html
 */

const ROKUGANI_NAMES = {
  m: [
    { n: "Okado", m: "Porte de la sagesse" },
    { n: "Akira", m: "Lumière claire et tranchante" },
    { n: "Hiro-Hito", m: "Homme généreux et bienveillant" },
    { n: "Ryujin", m: "L'esprit du dragon des mers" },
    { n: "Kenji", m: "Second fils vigoureux" },
    { n: "Masashi", m: "Gouverneur honorable" },
    { n: "Tadashi", m: "Droit et loyal au Bushido" }
  ],
  f: [
    { n: "Yuriko", m: "Enfant du lys immaculé" },
    { n: "Ayame", m: "Iris fleurissant près des eaux" },
    { n: "Hotaru", m: "Luciole dans la brume du crépuscule" },
    { n: "Kaede", m: "Feuille d'érable d'automne" },
    { n: "Tomoe", m: "Tourbillon protecteur" }
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

// Accesseurs aux données globales
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

  // Compétences
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

  // Armures
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

  // Armes
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

  // Avantages
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

  // Désavantages
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
}

function applyClanBonusesToTraits() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan').value;
  const famIdx = document.getElementById('sel-family').value;
  const schIdx = document.getElementById('sel-school').value;

  const fam = clans[clanKey]?.families[famIdx];
  const sch = clans[clanKey]?.schools[schIdx];

  ['sta','wil','str','per','ref','awa','agi','int'].forEach(id => {
    const el = document.getElementById(`badge-${id}`);
    if (el) el.textContent = "";
  });

  const badgeMap = {
    "Constitution": "sta", "Volonté": "wil", "Force": "str", "Perception": "per",
    "Réflexes": "ref", "Intuition": "awa", "Agilité": "agi", "Intelligence": "int"
  };

  if (fam && badgeMap[fam.trait]) document.getElementById(`badge-${badgeMap[fam.trait]}`).textContent = "+1 Famille";
  if (sch && badgeMap[sch.trait]) {
    const badge = document.getElementById(`badge-${badgeMap[sch.trait]}`);
    badge.textContent = badge.textContent ? "+2 F+É" : "+1 École";
  }

  for (const [traitName, inputId] of Object.entries(TRAIT_INPUT_IDS)) {
    const input = document.getElementById(inputId);
    if (!input) continue;

    let baseVal = 2;
    if (fam && fam.trait === traitName) baseVal += 1;
    if (sch && sch.trait === traitName) baseVal += 1;

    input.min = baseVal;
    if (parseInt(input.value) < baseVal || isNaN(parseInt(input.value))) {
      input.value = baseVal;
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

  const schSel = document.getElementById('sel-school');
  schSel.innerHTML = "";
  clan.schools.forEach((s, idx) => {
    let opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${s.name} (${s.bonus})`;
    schSel.appendChild(opt);
  });

  onFamilyChange();
  onSchoolChange();
}

function onFamilyChange() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan').value;
  const famIdx = document.getElementById('sel-family').value;
  const fam = clans[clanKey]?.families[famIdx];
  if (fam) {
    document.getElementById('family-bonus').textContent = `Bonus Famille : ${fam.bonus}`;
  }
  applyClanBonusesToTraits();
  updateAll();
}

function onSchoolChange() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan').value;
  const schIdx = document.getElementById('sel-school').value;
  const sch = clans[clanKey]?.schools[schIdx];
  if (!sch) return;

  document.getElementById('school-bonus').textContent = `Bonus École : ${sch.bonus}`;
  document.getElementById('tech-name').textContent = sch.technique.name;
  document.getElementById('tech-effect').textContent = sch.technique.effect;
  document.getElementById('pc-outfit').value = sch.outfit;
  document.getElementById('stat-honor').textContent = sch.honor;

  currentSkills = sch.skills.map(s => ({
    name: s,
    rank: 1,
    spec: false,
    isSchool: true
  }));

  renderSkills();
  applyClanBonusesToTraits();
  updateAll();
}

function renderSkills() {
  const container = document.getElementById('skills-list');
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
        <input type="number" min="0" max="10" value="${sk.rank}" onchange="changeSkillRank(${idx}, this.value)" class="w-12 p-1 rounded text-center font-bold text-amber-300">
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

function addAdvFromCatalog() {
  const adv = getAdvantages();
  const idx = document.getElementById('sel-catalog-adv').value;
  if (idx === "" || !adv.avantages[idx]) return;

  const item = adv.avantages[idx];
  if (!advantagesList.some(a => a.name === item.name)) {
    advantagesList.push({ name: item.name, cost: item.cost });
    renderAdvDisadv();
    updateAll();
  }
}

function addDisadvFromCatalog() {
  const adv = getAdvantages();
  const idx = document.getElementById('sel-catalog-disadv').value;
  if (idx === "" || !adv.desavantages[idx]) return;

  const item = adv.desavantages[idx];
  if (!disadvantagesList.some(d => d.name === item.name)) {
    disadvantagesList.push({ name: item.name, gain: item.gain });
    renderAdvDisadv();
    updateAll();
  }
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
  document.getElementById('adv-container').innerHTML = advantagesList.map((a, i) => `
    <div class="flex justify-between items-center p-1.5 rounded bg-black/40 border border-stone-800">
      <span class="text-stone-300">${a.name} (${a.cost} XP)</span>
      <button onclick="removeAdv(${i})" class="text-red-400 font-bold hover:text-red-300 px-1">✕</button>
    </div>
  `).join('');

  document.getElementById('disadv-container').innerHTML = disadvantagesList.map((d, i) => `
    <div class="flex justify-between items-center p-1.5 rounded bg-black/40 border border-stone-800">
      <span class="text-stone-300">${d.name} (+${d.gain} XP)</span>
      <button onclick="removeDisadv(${i})" class="text-red-400 font-bold hover:text-red-300 px-1">✕</button>
    </div>
  `).join('');
}

function generateRandomName(gender) {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan').value;
  const famIdx = document.getElementById('sel-family').value;
  const familyName = clans[clanKey]?.families[famIdx]?.name || "Samouraï";

  const list = ROKUGANI_NAMES[gender] || ROKUGANI_NAMES['m'];
  const pick = list[Math.floor(Math.random() * list.length)];

  if (nameOrderWestern) {
    document.getElementById('pc-name').value = `${pick.n} ${familyName}`;
  } else {
    document.getElementById('pc-name').value = `${familyName} ${pick.n}`;
  }
  document.getElementById('name-meaning').textContent = `Signification : ${pick.m}`;
}

function toggleNameOrder() {
  nameOrderWestern = !nameOrderWestern;
  const val = document.getElementById('pc-name').value.trim();
  const parts = val.split(' ');
  if (parts.length >= 2) {
    document.getElementById('pc-name').value = `${parts.slice(1).join(' ')} ${parts[0]}`;
  }
}

function updateAll() {
  const clans = getClans();
  const clanKey = document.getElementById('sel-clan').value;
  const famIdx = document.getElementById('sel-family').value;
  const schIdx = document.getElementById('sel-school').value;

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

  // Calcul des Anneaux
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

  // Calcul Budget XP
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
  let disadvGain = Math.min(rawDisadvGain, 15);
  document.getElementById('disadv-gain-total').textContent = disadvGain;

  let totalXP = 40 + disadvGain;
  let remainingXP = totalXP - xpSpent;

  document.getElementById('xp-total').textContent = totalXP;
  document.getElementById('xp-remaining').textContent = remainingXP;
  document.getElementById('xp-remaining').className = remainingXP >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold";

  // Insight
  let sumRings = rEarth + rWater + rAir + rFire + rVoid;
  let sumSkills = currentSkills.reduce((acc, sk) => acc + sk.rank, 0);
  let insight = (sumRings * 10) + sumSkills;

  let insightRank = 1;
  if (insight >= 225) insightRank = 5;
  else if (insight >= 200) insightRank = 4;
  else if (insight >= 175) insightRank = 3;
  else if (insight >= 150) insightRank = 2;

  document.getElementById('insight-display').innerHTML = `${insight} pts <span class="text-xs text-amber-400 font-bold">(Rang ${insightRank})</span>`;

  // Combat & Vitalité
  const armorBonus = parseInt(document.getElementById('pc-armor').value) || 0;
  document.getElementById('stat-armor-tn').textContent = 5 + (5 * ref) + armorBonus;
  document.getElementById('stat-init').textContent = `${ref}g${ref}`;
  document.getElementById('stat-heal').textContent = `${(sta * 2) + insightRank} PV`;

  document.getElementById('w-0').textContent = `${rEarth * 5} PV`;
  for (let i = 1; i <= 7; i++) {
    document.getElementById(`w-${i}`).textContent = `${rEarth * 2} PV`;
  }
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
  onFamilyChange();

  document.getElementById('sel-school').value = Math.floor(Math.random() * clan.schools.length);
  onSchoolChange();

  generateRandomName(Math.random() > 0.5 ? 'm' : 'f');

  const fam = clan.families[document.getElementById('sel-family').value];
  const sch = clan.schools[document.getElementById('sel-school').value];

  const traitInputs = {
    "Constitution": "trait-stamina", "Volonté": "trait-willpower",
    "Force": "trait-strength", "Perception": "trait-perception",
    "Réflexes": "trait-reflexes", "Intuition": "trait-awareness",
    "Agilité": "trait-agility", "Intelligence": "trait-intelligence"
  };

  for (let k in traitInputs) document.getElementById(traitInputs[k]).value = 2;
  document.getElementById('trait-void').value = 2;

  if (fam && traitInputs[fam.trait]) document.getElementById(traitInputs[fam.trait]).value = 3;
  if (sch && traitInputs[sch.trait]) {
    let el = document.getElementById(traitInputs[sch.trait]);
    el.value = parseInt(el.value) + 1;
  }

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
      document.getElementById('sel-clan').value = d.clan;
      onClanChange();
      document.getElementById('sel-family').value = d.family;
      onFamilyChange();
      document.getElementById('sel-school').value = d.school;
      onSchoolChange();

      document.getElementById('pc-name').value = d.name;
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
  if (confirm("Réinitialiser la fiche ?")) initClans();
}

window.addEventListener('DOMContentLoaded', bootstrap);
