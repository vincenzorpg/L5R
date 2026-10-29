/**
 * character-generator.js — Moteur de création L5R 4e Édition
 * Gestion dynamique, calculs en temps réel et verrouillage des seuils d'Avantages / Désavantages
 */

const MAX_DISADVANTAGE_XP = 15;

const ROKUGANI_NAMES = {
  m: [
    { n: "Okado", m: "Porte de la sagesse" },
    { n: "Akira", m: "Lumière claire et tranchante" },
    { n: "Hiro-Hito", m: "Homme généreux et bienveillant" },
    { n: "Ryujin", m: "L'esprit du dragon des mers" },
    { n: "Kenji", m: "Second fils vigoureux" },
    { n: "Masashi", m: "Gouverneur honorable" },
    { n: "Tadashi", m: "Droit et loyal au Bushido" },
    { n: "Kazuki", m: "Espoir radieux" },
    { n: "Daiki", m: "Grand arbre rayonnant" },
    { n: "Shinji", m: "Fidèle serviteur de la vérité" },
    { n: "Nobu", m: "Foi inébranlable" },
    { n: "Takeshi", m: "Guerrier intrépide" },
    { n: "Genji", m: "Origine noble" },
    { n: "Isamu", m: "Bravoure indomptable" },
    { n: "Jiro", m: "Second fils valeureux" },
    { n: "Kenshin", m: "Cœur de sabre loyal" },
    { n: "Makoto", m: "Sincérité absolue" },
    { n: "Ren", m: "Lotus pur" },
    { n: "Ryo", m: "Brise vivifiante" },
    { n: "Shiro", m: "Quatrième fils de lumière" },
    { n: "Taro", m: "Premier-né glorieux" },
    { n: "Yasuo", m: "Homme de paix" },
    { n: "Yoshito", m: "Personne juste et droite" },
    { n: "Katsuro", m: "Fils victorieux" },
    { n: "Kaito", m: "Vol au-dessus de l'océan" },
    { n: "Haruto", m: "Soleil haut dans le ciel" },
    { n: "Sosuke", m: "Aide courageuse et sage" },
    { n: "Hayato", m: "Faucon agile" },
    { n: "Minoru", m: "Moisson abondante" },
    { n: "Naoki", m: "Arbre droit et probe" },
    { n: "Osamu", m: "Discipline et loi" },
    { n: "Saburo", m: "Troisième fils déterminé" },
    { n: "Seiichi", m: "Premier fils d'intégrité" },
    { n: "Takashi", m: "Noblesse d'esprit" },
    { n: "Toru", m: "Persévérance à travers l'épreuve" },
    { n: "Yuji", m: "Second fils brave" },
    { n: "Goro", m: "Cinquième fils robuste" },
    { n: "Junpei", m: "Paix pure et sincère" },
    { n: "Ken'ichi", m: "Premier sabre de la famille" },
    { n: "Masato", m: "Homme de justice" }
  ],
  f: [
    { n: "Yuriko", m: "Enfant du lys immaculé" },
    { n: "Ayame", m: "Iris fleurissant près des eaux" },
    { n: "Hotaru", m: "Luciole dans la brume du crépuscule" },
    { n: "Kaede", m: "Feuille d'érable d'automne" },
    { n: "Tomoe", m: "Tourbillon protecteur" },
    { n: "Chitose", m: "Mille années de prospérité" },
    { n: "Reiko", m: "Enfant reconnaissante et gracieuse" },
    { n: "Aoi", m: "Mauve sacrée" },
    { n: "Emi", m: "Beau sourire béni" },
    { n: "Hana", m: "Fleur éclatante" },
    { n: "Haruka", m: "Parfum venu du lointain" },
    { n: "Kazumi", m: "Beauté harmonieuse" },
    { n: "Kiku", m: "Chrysanthème impérial" },
    { n: "Kohaku", m: "Ambre précieux" },
    { n: "Mai", m: "Danse gracieuse" },
    { n: "Midori", m: "Verdure printanière" },
    { n: "Nanami", m: "Sept mers calmes" },
    { n: "Renka", m: "Fleur de lotus" },
    { n: "Rin", m: "Dignité glacée et pure" },
    { n: "Saki", m: "Fleurissant d'espoir" },
    { n: "Sakura", m: "Fleur de cerisier éphémère" },
    { n: "Shizuka", m: "Calme serein" },
    { n: "Sora", m: "Ciel d'été infini" },
    { n: "Sumiko", m: "Enfant de pure clarté" },
    { n: "Suzume", m: "Moineau vif et mélodieux" },
    { n: "Tamiko", m: "Enfant du peuple aimée" },
    { n: "Tsuki", m: "Lumière de lune bienveillante" },
    { n: "Ume", m: "Fleur de prunier résiliente" },
    { n: "Yoko", m: "Enfant de l'aube" },
    { n: "Yoshiko", m: "Enfant de noble vertu" },
    { n: "Yuka", m: "Parfum délicat" },
    { n: "Yumi", m: "Arc élégant" },
    { n: "Asuka", m: "Parfum du matin naissant" },
    { n: "Botan", m: "Pivoine royale" },
    { n: "Fuji", m: "Glycine aux reflets d'argent" },
    { n: "Hoshiko", m: "Enfant des étoiles" },
    { n: "Kiyomi", m: "Pure beauté d'eau vive" },
    { n: "Miyuki", m: "Neige silencieuse" },
    { n: "Tsukiko", m: "Fille de la pleine lune" },
    { n: "Moriko", m: "Enfant de la forêt sacrée" }
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

// Accesseurs aux bases de données
const getClans = () => window.CLANS_DATA || window.CLANS_CORE || {};
const getSkills = () => window.COMPETENCES_DATA || [];
const getEquipment = () => window.EQUIPEMENT_DATA || { armures: [], armes: [] };
const getAdvantages = () => window.AVANTAGES_DATA || { avantages: [], desavantages: [] };

function updateStickyName() {
  const nameInput = document.getElementById('pc-name');
  const stickyName = document.getElementById('sticky-pc-name');
  if (nameInput && stickyName) {
    stickyName.textContent = nameInput.value.trim() || "Samouraï";
  }
}

function bootstrap() {
  if (!window.CLANS_DATA && !window.CLANS_CORE) {
    setTimeout(bootstrap, 50);
    return;
  }
  initClans();
  initCatalogSelectors();

  // Écoute automatique de la saisie sur le champ du nom
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

  updateDisadvButtonState();
}

// =========================================================================
// RÉINITIALISATION COMPLÈTE LORS DU CHANGEMENT DE SÉLECTION
// =========================================================================
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

  // Descriptifs
  document.getElementById('family-bonus').textContent = `Bonus Famille : ${fam.bonus}`;
  document.getElementById('school-bonus').textContent = `Bonus École : ${sch.bonus}`;
  document.getElementById('tech-name').textContent = sch.technique.name;
  document.getElementById('tech-effect').textContent = sch.technique.effect;
  document.getElementById('pc-outfit').value = sch.outfit;
  document.getElementById('stat-honor').textContent = sch.honor;

  // Nom du personnage et bandeau sticky
  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    const currentParts = nameInput.value.trim().split(' ');
    const firstName = currentParts.length > 1 ? currentParts[0] : (currentParts[0] || "Okado");
    nameInput.value = nameOrderWestern ? `${firstName} ${fam.name}` : `${fam.name} ${firstName}`;
    const stickyName = document.getElementById('sticky-pc-name');
    if (stickyName) stickyName.textContent = nameInput.value;
  }

  // Badges des traits
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

  // Remise des traits à la base exacte (2 ou 3/4 avec bonus)
  for (const [traitName, inputId] of Object.entries(TRAIT_INPUT_IDS)) {
    const input = document.getElementById(inputId);
    if (!input) continue;

    let baseVal = 2;
    if (fam && fam.trait === traitName) baseVal += 1;
    if (sch && sch.trait === traitName) baseVal += 1;

    input.min = baseVal;
    input.value = baseVal;
  }

  // Compétences de départ (Rang 1, pas de spécialisation)
  currentSkills = sch.skills.map(s => ({
    name: s,
    rank: 1,
    spec: false,
    isSchool: true
  }));
  renderSkills();

  // Remise à zéro des Avantages et Désavantages
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

// =========================================================================
// GESTION DU CATALOGUE ET DES SEUILS D'AVANTAGES / DÉSAVANTAGES
// =========================================================================
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

  // Calcul du disponible actuel
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

// =========================================================================
// GESTION DES COMPÉTENCES & IDENTITÉ
// =========================================================================
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

  // Force la mise à jour immédiate du bandeau
  updateStickyName();
}

function toggleNameOrder() {
  nameOrderWestern = !nameOrderWestern;
  const nameInput = document.getElementById('pc-name');
  if (nameInput) {
    const val = nameInput.value.trim();
    const parts = val.split(' ');
    if (parts.length >= 2) {
      nameInput.value = `${parts.slice(1).join(' ')} ${parts[0]}`;
    }
  }
  // Force la mise à jour immédiate du bandeau
  updateStickyName();
}

// =========================================================================
// MOTEUR DE CALCULS DYNAMIQUES
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

  // Calcul des 5 Anneaux
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

  // Dépense d'XP
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

  let totalXP = 40 + disadvGain;
  let remainingXP = totalXP - xpSpent;

  document.getElementById('xp-total').textContent = totalXP;
  const remEl = document.getElementById('xp-remaining');
  remEl.textContent = remainingXP;
  remEl.className = remainingXP >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold";

  // Réputation & Rang
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
      document.getElementById('sel-school').value = d.school;
      resetSheetToNewSelection();

      document.getElementById('pc-name').value = d.name;
      const stickyName = document.getElementById('sticky-pc-name');
      if (stickyName) stickyName.textContent = d.name;

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
  if (confirm("Réinitialiser entièrement la fiche ?")) onClanChange();
}

window.addEventListener('DOMContentLoaded', bootstrap);
