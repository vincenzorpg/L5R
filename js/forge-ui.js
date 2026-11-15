// =============================================================================
// INTERFACE ÉTENDUE DE LA FORGE DE PERSONNAGE (SORTS, KIHOS, KATAS, TATOUAGES,
// COMPÉTENCES MULTI-SELECT, LANCEUR DE DÉS ROLL & KEEP, DOJO LOCAL & IMPRESSION A4)
// =============================================================================

window.charSpellsList = window.charSpellsList || [];
window.charKatasList = window.charKatasList || [];
window.charTattoosList = window.charTattoosList || [];

const TWENTY_QUESTIONS_SECTIONS = [
  {
    title: "I. Identité, Lignée & Apparence (Questions 1 à 5)",
    items: [
      { id: 1, q: "1. À quel clan appartenez-vous et qu'en pensez-vous ?", val: "Au fier Clan du Crabe. C'est le seul clan qui comprend le vrai coût de la survie de Rokugan." },
      { id: 2, q: "2. À quelle famille appartenez-vous et quel est votre héritage ?", val: "Famille Hiruma. Nous avons perdu nos terres ancestrales mais jamais notre détermination." },
      { id: 3, q: "3. Quelle école avez-vous suivie et quel rôle y tenez-vous ?", val: "École d'éclaireur Hiruma. Je suis les yeux et les oreilles de mes frères d'armes." },
      { id: 4, q: "4. Comment vous décririez-vous physiquement ?", val: "Carrure athlétique taillée par la marche, regard félin jaune perçant, cheveux gris coupés court." },
      { id: 5, q: "5. Quels sont vos plus grands traits de personnalité (forces & faiblesses) ?", val: "Inflexible et loyal au-delà de la mort, mais peu enclin à la patience et aux flatteries de cour.", full: true }
    ]
  },
  {
    title: "II. Passion, Devoir & Bushido (Questions 6 à 10)",
    items: [
      { id: 6, q: "6. Qu'est-ce qui vous passionne ou vous fait vibrer ?", val: "Le silence sauvage des grands espaces et le dressage de mon loup Shiro." },
      { id: 7, q: "7. Quelle est votre vision personnelle du Bushido ?", val: "Le Courage (Yū) et le Devoir (Chūgo) avant l'apparence. Sauver des vies vaut mieux que parader." },
      { id: 8, q: "8. Quelle est votre relation aux Fortunes et aux Kami ?", val: "Je respecte les esprits de la Terre et prie Bishamon, mais j'agis par mes propres mains." },
      { id: 9, q: "9. Comment s'est déroulé votre Gempukku ?", val: "Une patrouille de trois nuits au-delà de la rivière des Doigts de Jade avec mon sensei." },
      { id: 10, q: "10. Qui est la personne que vous respectez le plus ?", val: "Mon vieux sensei Hiruma et le champion de clan Hida Kisada.", full: true }
    ]
  },
  {
    title: "III. Liens Sociaux & Secrets (Questions 11 à 15)",
    items: [
      { id: 11, q: "11. Avez-vous des amis précieux ou des rivaux acharnés ?", val: "Compagnon fidèle de Samui Hida et d'Akira Tsuruchi ; rivalité froide avec la Grue." },
      { id: 12, q: "12. Êtes-vous fiancé(e), marié(e) ou avez-vous des obligations ?", val: "Mariage arrangé avec Kamako Kaiu pour consolider l'alliance des familles." },
      { id: 13, q: "13. Quel est votre plus lourd secret ou fardeau ?", val: "Avoir vu la silhouette corrompue de mon père parmi les monstres de l'Outremonde." },
      { id: 14, q: "14. Que pensez-vous sincèrement des autres clans ?", val: "La plupart gaspillent leur énergie en courbettes tandis que nous saignons pour eux." },
      { id: 15, q: "15. Quelle est votre plus grande peur ou doute intérieur ?", val: "Succomber à la Souillure et trahir mes frères sans même m'en rendre compte.", full: true }
    ]
  },
  {
    title: "IV. Ambitions & Destin (Questions 16 à 20)",
    items: [
      { id: 16, q: "16. Quelle est votre plus haute ambition dans l'Empire ?", val: "Reconquérir Shiro Hiruma et réhabiliter la mémoire de ma lignée." },
      { id: 17, q: "17. Quel est votre rapport avec les heimin et les petites gens ?", val: "Pragmatique : ce sont eux qui forgent nos armes et cultivent notre riz. Je les protège." },
      { id: 18, q: "18. Quel est votre bien ou équipement le plus cher ?", val: "Mon doigt de jade gravé et l'arc composite hérité de mon aïeul." },
      { id: 19, q: "19. De quelle manière honorable envisagez-vous votre mort ?", val: "Debout sur le Mur, l'arme brisée au milieu d'une pile de gobelins pour protéger ma patrouille." },
      { id: 20, q: "20. Comment vos ancêtres et votre seigneur vous jugeront-ils ?", val: "Comme un guerrier silencieux qui n'a jamais reculé d'un pas devant l'ennemi.", full: true }
    ]
  }
];

function injectForgeTemplates() {
  const qMount = document.getElementById('twenty-questions-mount');
  if (qMount && !document.getElementById('q20-1')) {
    qMount.innerHTML = TWENTY_QUESTIONS_SECTIONS.map((sec, idx) => `
      <div class="space-y-3 ${idx > 0 ? 'pt-2' : ''}">
        <h3 class="text-xs font-bold font-imperial text-amber-300 uppercase tracking-wider border-b border-stone-800 pb-1">
          ${sec.title}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          ${sec.items.map(item => `
            <div class="${item.full ? 'md:col-span-2' : ''}">
              <label class="block text-stone-300 font-bold mb-1" for="q20-${item.id}">${item.q}</label>
              <input type="text" id="q20-${item.id}" value="${item.val.replace(/"/g, '&quot;')}" class="w-full p-2 rounded text-xs">
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  const printDossier = document.getElementById('official-print-dossier');
  if (printDossier && !document.getElementById('print-sheet')) {
    printDossier.innerHTML = `
      <div id="print-sheet">
        <div class="border-b-2 border-black pb-2 mb-4 flex justify-between items-end">
          <div>
            <h1 class="text-2xl font-bold uppercase tracking-wider font-imperial" id="p-name">Samouraï</h1>
            <div class="text-xs">
              <b>Clan :</b> <span id="p-clan">Crabe</span> |
              <b>École :</b> <span id="p-school">École de bushi Hida</span>
            </div>
          </div>
          <div class="text-right text-xs">
            <div><b>Insight :</b> <span id="p-insight">120 pts (Rang 1)</span></div>
            <div><b>Honneur :</b> <span id="p-honor">4.5</span> | <b>XP :</b> <span id="p-xp">40 / 40 XP</span></div>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-2 border border-black p-2 mb-4 text-center text-xs">
          <div>
            <div class="font-bold border-b border-black pb-1">TERRE : <span id="p-r-earth">2</span></div>
            <div class="pt-1">Const : <b id="p-t-sta">2</b></div>
            <div>Vol : <b id="p-t-wil">2</b></div>
          </div>
          <div>
            <div class="font-bold border-b border-black pb-1">EAU : <span id="p-r-water">2</span></div>
            <div class="pt-1">Force : <b id="p-t-str">2</b></div>
            <div>Perc : <b id="p-t-per">2</b></div>
          </div>
          <div>
            <div class="font-bold border-b border-black pb-1">AIR : <span id="p-r-air">2</span></div>
            <div class="pt-1">Réfl : <b id="p-t-ref">2</b></div>
            <div>Intu : <b id="p-t-awa">2</b></div>
          </div>
          <div>
            <div class="font-bold border-b border-black pb-1">FEU : <span id="p-r-fire">2</span></div>
            <div class="pt-1">Agil : <b id="p-t-agi">2</b></div>
            <div>Int : <b id="p-t-int">2</b></div>
          </div>
          <div>
            <div class="font-bold border-b border-black pb-1">VIDE : <span id="p-r-void">2</span></div>
            <div class="pt-1">Points : <b id="p-t-voi">2</b></div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4 text-xs">
          <div class="border border-black p-2 space-y-1">
            <div class="font-bold uppercase border-b border-black pb-0.5">Statistiques de Combat</div>
            <div><b>Initiative :</b> <span id="p-init">3g2</span> <span id="p-init-note" class="text-[9px]"></span></div>
            <div><b>ND Armure :</b> <span id="p-armor-tn">20</span> <span id="p-armor-note" class="text-[9px]"></span></div>
            <div><b>Armure :</b> <span id="p-armor-name">Aucune</span> (<span id="p-armor-reduc">0</span>)</div>
            <div><b>Récupération :</b> <span id="p-heal">5 PV / jour</span></div>
          </div>
          <div class="border border-black p-2 space-y-1" id="p-weapons-box"></div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-4 text-xs">
          <div class="col-span-2 border border-black p-2">
            <div class="font-bold uppercase border-b border-black pb-0.5 mb-1">Compétences & Maîtrises</div>
            <table class="w-full text-left text-[10px]">
              <thead>
                <tr class="border-b border-black">
                  <th>Nom</th>
                  <th class="text-center">Éc.</th>
                  <th class="text-center">Rang</th>
                  <th class="text-center">Jet</th>
                  <th>Spécialités & Paliers</th>
                </tr>
              </thead>
              <tbody id="p-skills-body"></tbody>
            </table>
          </div>

          <div class="border border-black p-2">
            <div class="font-bold uppercase border-b border-black pb-0.5 mb-1">Seuils de Blessures</div>
            <table class="w-full text-[10px] text-center">
              <tbody id="p-wounds-body"></tbody>
            </table>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs border border-black p-2 mb-4">
          <div>
            <div class="font-bold border-b border-black pb-0.5">Avantages (<span id="p-adv-total">0 XP</span>) :</div>
            <div id="p-adv-list" class="space-y-1 mt-1 text-[10px]"></div>
          </div>
          <div>
            <div class="font-bold border-b border-black pb-0.5">Désavantages (<span id="p-disadv-total">0 / 15 XP</span>) :</div>
            <div id="p-disadv-list" class="space-y-1 mt-1 text-[10px]"></div>
          </div>
        </div>

        <div class="border border-black p-2 text-xs mb-4">
          <div class="font-bold uppercase border-b border-black pb-0.5 flex justify-between">
            <span>Sorts, Kihos & Katas</span>
            <span id="p-mystic-summary" class="text-[9px] font-normal"></span>
          </div>
          <div id="p-spells-katas-box" class="text-[9px] space-y-1 mt-1"></div>
        </div>

        <div class="border border-black p-2 text-xs">
          <div class="font-bold uppercase border-b border-black pb-0.5" id="p-tech-name">Techniques d'École</div>
          <div id="p-tech-desc" class="text-[10px] space-y-1 mt-1 leading-relaxed"></div>
          <div class="mt-2 pt-1 border-t border-gray-400 text-[9px]">
            <b>Équipement :</b> <span id="p-outfit-desc"></span>
          </div>
        </div>

        <div class="border border-black p-2 text-xs mt-2">
          <div class="font-bold uppercase border-b border-black pb-0.5">Chronique Biographique & Les 20 Questions</div>
          <div id="p-background-story" class="whitespace-pre-line text-[9px] mt-1"></div>
          <div class="grid grid-cols-2 gap-2 pt-1 mt-1 border-t border-gray-300 text-[8px]" id="p-20questions-box"></div>
        </div>

        <div class="hidden">
          <span id="p-name-2"></span>
          <span id="p-clan-2"></span>
          <span id="p-school-2"></span>
        </div>
      </div>
    `;
  }
}

// Exécution immédiate au chargement du script (avant DOMContentLoaded)
injectForgeTemplates();

function getElementBadgeClass(elem) {
  const e = (elem || "").toString().toLowerCase();
  if (e.includes("terre") || e.includes("earth")) return "badge-elem-terre";
  if (e.includes("eau") || e.includes("water")) return "badge-elem-eau";
  if (e.includes("feu") || e.includes("fire")) return "badge-elem-feu";
  if (e.includes("air")) return "badge-elem-air";
  if (e.includes("vide") || e.includes("void")) return "badge-elem-vide";
  if (e.includes("kiho")) return "badge-elem-kiho";
  return "badge-elem-universel";
}

function getRingValueForElement(elem) {
  const e = (elem || "").toString().toLowerCase();
  if (e.includes("terre") || e.includes("earth")) return parseInt(document.getElementById('ring-earth')?.textContent) || 2;
  if (e.includes("eau") || e.includes("water")) return parseInt(document.getElementById('ring-water')?.textContent) || 2;
  if (e.includes("air")) return parseInt(document.getElementById('ring-air')?.textContent) || 2;
  if (e.includes("feu") || e.includes("fire")) return parseInt(document.getElementById('ring-fire')?.textContent) || 2;
  if (e.includes("vide") || e.includes("void")) return parseInt(document.getElementById('ring-void')?.textContent) || 2;
  return parseInt(document.getElementById('ring-void')?.textContent) || 2;
}

function getCurrentSchoolRank() {
  const insightTxt = document.getElementById('insight-display')?.textContent || "Rang 1";
  const m = insightTxt.match(/Rang\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : 1;
}

function updateArchetypePanels() {
  const schObj = typeof getSelectedSchoolObject === "function" ? getSelectedSchoolObject() : null;
  const schoolType = (schObj?.school?.type || "").toLowerCase();
  const schoolName = (schObj?.school?.name || "").toLowerCase();

  const isShugenja = schoolType.includes("shugenja") || schoolName.includes("shugenja") || schoolName.includes("isawa") || schoolName.includes("kuni") || schoolName.includes("tamori") || schoolName.includes("agasha") || schoolName.includes("soshi") || schoolName.includes("yogo") || schoolName.includes("iuchi") || schoolName.includes("asahina");
  const isBushi = schoolType.includes("bushi") || schoolName.includes("bushi") || schoolName.includes("kakita") || schoolName.includes("mirumoto") || schoolName.includes("hida") || schoolName.includes("matsu") || schoolName.includes("akodo") || schoolName.includes("daidoji") || schoolName.includes("hiruma") || schoolName.includes("tsuruchi");
  const isMonk = schoolType.includes("moine") || schoolType.includes("monk") || schoolName.includes("togashi") || schoolName.includes("moine") || schoolName.includes("ise zumi");

  const hasMultiAdv = (window.advantagesList || []).some(a => (typeof isMultipleSchoolsAdv === 'function') && isMultipleSchoolsAdv(a.name));

  const spellsPanel = document.getElementById('panel-spells-container');
  const katasPanel = document.getElementById('panel-katas-container');
  const courtierNote = document.getElementById('panel-courtier-note');
  const slotsBar = document.getElementById('shugenja-slots-bar');
  const archetypeBadge = document.getElementById('archetype-active-badge');

  if (!spellsPanel || !katasPanel) return;

  spellsPanel.classList.remove('hidden');
  katasPanel.classList.remove('hidden');
  if (courtierNote) courtierNote.classList.add('hidden');
  if (slotsBar) slotsBar.classList.remove('hidden');

  if (isShugenja) {
    if (archetypeBadge) archetypeBadge.innerHTML = `<span class="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">Voie des Kamis (Shugenja)</span>`;
    katasPanel.classList.add('hidden');
  } else if (isBushi) {
    if (archetypeBadge) archetypeBadge.innerHTML = `<span class="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold">Voie Martiale (Bushi)</span>`;
    spellsPanel.classList.add('hidden');
    if (slotsBar) slotsBar.classList.add('hidden');
  } else if (isMonk) {
    if (archetypeBadge) archetypeBadge.innerHTML = `<span class="px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-500/40 font-bold">Voie de la Confrérie (Moine)</span>`;
    katasPanel.classList.add('hidden');
  } else {
    if (archetypeBadge) archetypeBadge.innerHTML = `<span class="px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-700 font-bold">Voie de la Cour & de la Loi</span>`;
    if (!hasMultiAdv) {
      spellsPanel.classList.add('hidden');
      katasPanel.classList.add('hidden');
      if (slotsBar) slotsBar.classList.add('hidden');
      if (courtierNote) courtierNote.classList.remove('hidden');
    }
  }
}

function populateSpellCatalogSelect() {
  const sel = document.getElementById('sel-catalog-spell');
  if (!sel) return;
  const allSpells = window.SORTS_DATA || [];
  const elemFilter = document.getElementById('filter-spell-elem')?.value || "tous";
  const rankFilter = document.getElementById('filter-spell-rank')?.value || "tous";

  const filtered = allSpells.filter(s => {
    if (s.isMaho || (s.element && s.element.toLowerCase() === "maho")) return false;
    const sElem = (s.isKiho ? "kiho" : (s.element || "universel")).toLowerCase();
    const matchElem = elemFilter === "tous" || sElem === elemFilter;
    const sRank = Number(s.mastery) || 0;
    const matchRank = rankFilter === "tous" || (rankFilter === "6" ? sRank >= 6 : sRank === parseInt(rankFilter, 10));
    return matchElem && matchRank;
  });

  sel.innerHTML = `<option value="">-- Choisir un sort ou kiho (${filtered.length} disponible(s)) --</option>`;
  const frag = document.createDocumentFragment();
  filtered.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    const tag = s.isKiho ? `Kiho ${s.ring || s.element}` : (s.element || "Univ.");
    const rk = s.mastery === 0 ? "Univ." : `Rang ${s.mastery}`;
    opt.textContent = `[${tag} • ${rk}] ${s.name || s.nom}`;
    frag.appendChild(opt);
  });
  sel.appendChild(frag);
  updateSpellPreview();
}

function updateSpellPreview() {
  const sel = document.getElementById('sel-catalog-spell');
  const card = document.getElementById('spell-preview-card');
  if (!sel || !card) return;
  const id = sel.value;
  if (!id) { card.classList.add('hidden'); return; }

  const allSpells = window.SORTS_DATA || [];
  const s = allSpells.find(item => item.id === id);
  if (!s) { card.classList.add('hidden'); return; }

  const mastery = Number(s.mastery) || 0;
  const tn = mastery === 0 ? 10 : (5 + 5 * mastery);
  const elemLabel = s.isKiho ? `Kiho (${s.ring || "Terre"})` : (s.element || "Universel");
  const ringToUse = s.isKiho ? (s.ring || "Terre") : (s.element || "Vide");
  const ringVal = getRingValueForElement(ringToUse);
  const schoolRank = getCurrentSchoolRank();

  const affinity = document.getElementById('shugenja-affinity')?.value || "aucune";
  const deficiency = document.getElementById('shugenja-deficiency')?.value || "aucune";
  let effRank = schoolRank;
  if (affinity !== "aucune" && ringToUse.toLowerCase().includes(affinity)) effRank += 1;
  if (deficiency !== "aucune" && ringToUse.toLowerCase().includes(deficiency)) effRank -= 1;

  const castPool = `${ringVal + Math.max(1, effRank)}g${ringVal}`;

  document.getElementById('spell-preview-name').textContent = s.name || s.nom;
  const elemBadge = document.getElementById('spell-preview-elem');
  elemBadge.textContent = `${elemLabel} • Maîtrise ${mastery === 0 ? 'Universel' : mastery}`;
  elemBadge.className = `text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${getElementBadgeClass(s.isKiho ? 'kiho' : s.element)}`;

  const kwEl = document.getElementById('spell-preview-keywords');
  kwEl.textContent = Array.isArray(s.keywords) && s.keywords.length ? s.keywords.join(", ") : "Standard";

  document.getElementById('spell-preview-tn').textContent = `ND ${tn}`;
  document.getElementById('spell-preview-cast-Access').textContent = `Jet : ${castPool}`;
  document.getElementById('spell-preview-range').textContent = s.range || "Personnelle";
  document.getElementById('spell-preview-area').textContent = s.area || "Spéciale";
  document.getElementById('spell-preview-duration').textContent = s.duration || "Instantanée";
  document.getElementById('spell-preview-raises').textContent = s.raises || "Aucune";
  document.getElementById('spell-preview-desc').textContent = s.desc || "";

  card.classList.remove('hidden');
}

function addSpellFromCatalog() {
  const sel = document.getElementById('sel-catalog-spell');
  if (!sel || !sel.value) return;
  const allSpells = window.SORTS_DATA || [];
  const found = allSpells.find(s => s.id === sel.value);
  if (!found) return;
  if (window.charSpellsList.some(s => s.id === found.id)) {
    alert("Ce sort ou kiho figure déjà dans votre grimoire personnel.");
    return;
  }
  const defaultXp = found.isKiho ? (Number(found.mastery) || 3) : 0;
  window.charSpellsList.push({
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
    xpCost: defaultXp
  });
  renderCharacterSpells();
  if (typeof updateAll === "function") updateAll();
}

function addUniversalSpells() {
  const allSpells = window.SORTS_DATA || [];
  const univs = allSpells.filter(s => (s.element || "").toLowerCase() === "universel" || s.mastery === 0);
  univs.forEach(u => {
    if (!window.charSpellsList.some(existing => existing.id === u.id)) {
      window.charSpellsList.push({
        id: u.id,
        name: u.name || u.nom,
        element: "Universel",
        ring: "Vide",
        mastery: 0,
        range: u.range || "Personnelle",
        area: u.area || "Spéciale",
        duration: u.duration || "Instantanée",
        raises: u.raises || "Aucune",
        desc: u.desc || "",
        isKiho: false,
        xpCost: 0
      });
    }
  });
  renderCharacterSpells();
  if (typeof updateAll === "function") updateAll();
}

function removeCharacterSpell(id) {
  window.charSpellsList = window.charSpellsList.filter(s => s.id !== id);
  renderCharacterSpells();
  if (typeof updateAll === "function") updateAll();
}

function updateSpellXpCost(id, newVal) {
  const item = window.charSpellsList.find(s => s.id === id);
  if (item) {
    item.xpCost = Math.max(0, parseInt(newVal, 10) || 0);
    renderCharacterSpells();
    if (typeof updateAll === "function") updateAll();
  }
}

function rollSpellCasting(spellId) {
  const s = window.charSpellsList.find(item => item.id === spellId);
  if (!s) return;
  const ringToUse = s.isKiho ? (s.ring || "Terre") : (s.element || "Vide");
  const ringVal = getRingValueForElement(ringToUse);
  const schoolRank = getCurrentSchoolRank();

  const affinity = document.getElementById('shugenja-affinity')?.value || "aucune";
  const deficiency = document.getElementById('shugenja-deficiency')?.value || "aucune";
  let effRank = schoolRank;
  if (affinity !== "aucune" && ringToUse.toLowerCase().includes(affinity)) effRank += 1;
  if (deficiency !== "aucune" && ringToUse.toLowerCase().includes(deficiency)) effRank -= 1;

  const rollX = ringVal + Math.max(1, effRank);
  const keepY = ringVal;
  const tn = s.mastery === 0 ? 10 : (5 + 5 * s.mastery);
  const shortName = (s.name || "Sort").split('(')[0].trim();

  rollL5RDicePool(rollX, keepY, 0, `${shortName} [ND ${tn}]`, true, false);
}

function renderCharacterSpells() {
  const container = document.getElementById('char-spells-container');
  const countBadge = document.getElementById('spells-count-badge');
  const xpBadge = document.getElementById('spells-xp-total');
  if (!container) return;

  const totalXp = window.charSpellsList.reduce((acc, s) => acc + (Number(s.xpCost) || 0), 0);
  if (countBadge) countBadge.textContent = window.charSpellsList.length;
  if (xpBadge) xpBadge.textContent = totalXp;

  if (window.charSpellsList.length === 0) {
    container.innerHTML = `
      <div class="p-3 rounded-lg bg-black/40 border border-stone-800/80 text-stone-500 italic text-center text-[11px]">
        Aucun sort ou kiho inscrit sur la fiche.
      </div>
    `;
    return;
  }

  const schoolRank = getCurrentSchoolRank();
  const affinity = document.getElementById('shugenja-affinity')?.value || "aucune";
  const deficiency = document.getElementById('shugenja-deficiency')?.value || "aucune";

  container.innerHTML = window.charSpellsList.map(s => {
    const ringToUse = s.isKiho ? (s.ring || "Terre") : (s.element || "Vide");
    const ringVal = getRingValueForElement(ringToUse);
    let effRank = schoolRank;
    if (affinity !== "aucune" && ringToUse.toLowerCase().includes(affinity)) effRank += 1;
    if (deficiency !== "aucune" && ringToUse.toLowerCase().includes(deficiency)) effRank -= 1;

    const rollX = ringVal + Math.max(1, effRank);
    const keepY = ringVal;
    const tn = s.mastery === 0 ? 10 : (5 + 5 * s.mastery);
    const badgeCls = getElementBadgeClass(s.isKiho ? 'kiho' : s.element);
    const elemLabel = s.isKiho ? `Kiho ${s.ring || ''}` : s.element;

    return `
      <div class="p-2.5 rounded-lg bg-stone-950/90 border border-stone-800 hover:border-amber-500/40 transition space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div class="truncate">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[9px] font-bold font-imperial px-1.5 py-0.5 rounded ${badgeCls}">
                ${elemLabel} • M${s.mastery}
              </span>
              <a href="grimoire.html#sort-${s.id}" target="_blank" class="font-bold font-imperial text-amber-200 hover:text-amber-300 text-xs truncate">
                ${s.name} ↗
              </a>
            </div>
            <div class="text-[10px] text-stone-400 mt-0.5">
              Portée : ${s.range} • <b class="text-amber-300">ND ${tn}</b>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" onclick="rollSpellCasting('${s.id}')" class="px-2 py-1 rounded bg-amber-950/80 hover:bg-amber-600 text-amber-300 hover:text-black border border-amber-500/40 font-bold font-imperial text-[10px] transition cursor-pointer" title="Lancer le jet d'incantation">
              🎲 ${rollX}g${keepY}
            </button>
            <div class="flex items-center bg-black/60 border border-stone-800 rounded px-1 py-0.5" title="Coût en XP">
              <input type="number" value="${s.xpCost || 0}" min="0" max="20" onchange="updateSpellXpCost('${s.id}', this.value)" class="w-7 text-center text-[10px] font-bold bg-transparent">
              <span class="text-[8px] text-stone-500">XP</span>
            </div>
            <button type="button" onclick="removeCharacterSpell('${s.id}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
          </div>
        </div>
        <p class="text-[10px] text-stone-400 line-clamp-2 leading-snug">${s.desc}</p>
      </div>
    `;
  }).join('');
}

// =============================================================================
// KATAS MARTIAUX
// =============================================================================
function populateKataCatalogSelect() {
  const sel = document.getElementById('sel-catalog-kata');
  if (!sel) return;
  const rawFilter = (document.getElementById('filter-kata-elem')?.value || "tous").toLowerCase();
  const allKatas = window.KATAS_DATA || [];

  const filtered = allKatas.filter(k => {
    if (rawFilter === "tous") return true;
    return (k.element || "").toLowerCase() === rawFilter;
  });

  sel.innerHTML = `<option value="">-- Choisir un Kata martial (${filtered.length} disponible(s)) --</option>`;
  const frag = document.createDocumentFragment();
  filtered.forEach(k => {
    const opt = document.createElement('option');
    opt.value = k.id;
    opt.textContent = `[${k.element} ${k.mastery} • ${k.cost} XP] ${k.name}`;
    frag.appendChild(opt);
  });
  sel.appendChild(frag);
  updateKataPreview();
}

function updateKataPreview() {
  const sel = document.getElementById('sel-catalog-kata');
  const card = document.getElementById('kata-preview-card');
  if (!sel || !card) return;
  const id = sel.value;
  if (!id) { card.classList.add('hidden'); return; }

  const k = (window.KATAS_DATA || []).find(item => item.id === id);
  if (!k) { card.classList.add('hidden'); return; }

  const charRingVal = getRingValueForElement(k.element);
  const meetsReq = charRingVal >= k.mastery;

  document.getElementById('kata-preview-name').textContent = k.name;
  const ringBadge = document.getElementById('kata-preview-ring');
  ringBadge.textContent = `Anneau requis : ${k.element} ${k.mastery}`;
  ringBadge.className = `text-[9px] font-bold font-imperial px-2 py-0.5 rounded inline-block mt-1 ${getElementBadgeClass(k.element)}`;

  document.getElementById('kata-preview-cost').textContent = `Coût : ${k.cost} XP`;
  const reqStatus = document.getElementById('kata-preview-req-status');
  reqStatus.textContent = meetsReq ? `✓ Anneau ${k.element} (${charRingVal}) suffisant` : `⚠️ Anneau ${k.element} actuel : ${charRingVal}/${k.mastery}`;
  reqStatus.className = `text-[10px] font-bold block mt-1 ${meetsReq ? 'text-emerald-400' : 'text-amber-400'}`;

  document.getElementById('kata-preview-schools').textContent = k.schools;
  document.getElementById('kata-preview-effect').textContent = k.desc;

  card.classList.remove('hidden');
}

function addKataFromCatalog() {
  const sel = document.getElementById('sel-catalog-kata');
  if (!sel || !sel.value) return;
  const found = (window.KATAS_DATA || []).find(k => k.id === sel.value);
  if (!found) return;
  if (window.charKatasList.some(k => k.id === found.id)) {
    alert("Ce Kata figure déjà sur votre fiche.");
    return;
  }
  window.charKatasList.push({
    id: found.id,
    name: found.name,
    element: found.element,
    mastery: found.mastery,
    xpCost: found.cost,
    schools: found.schools,
    desc: found.desc,
    active: window.charKatasList.length === 0
  });
  renderCharacterKatas();
  if (typeof updateAll === "function") updateAll();
}

function toggleActiveKata(id) {
  window.charKatasList.forEach(k => {
    k.active = (k.id === id) ? !k.active : false;
  });
  renderCharacterKatas();
}

function removeCharacterKata(id) {
  window.charKatasList = window.charKatasList.filter(k => k.id !== id);
  renderCharacterKatas();
  if (typeof updateAll === "function") updateAll();
}

function renderCharacterKatas() {
  const container = document.getElementById('char-katas-container');
  const countBadge = document.getElementById('katas-count-badge');
  const xpBadge = document.getElementById('katas-xp-total');
  if (!container) return;

  const totalXp = window.charKatasList.reduce((acc, k) => acc + (Number(k.xpCost) || 0), 0);
  if (countBadge) countBadge.textContent = window.charKatasList.length;
  if (xpBadge) xpBadge.textContent = totalXp;

  if (window.charKatasList.length === 0) {
    container.innerHTML = `
      <div class="p-3 rounded-lg bg-black/40 border border-stone-800/80 text-stone-500 italic text-center text-[11px]">
        Aucun Kata appris.
      </div>
    `;
    return;
  }

  container.innerHTML = window.charKatasList.map(k => {
    const badgeCls = getElementBadgeClass(k.element);
    return `
      <div class="p-2.5 rounded-lg ${k.active ? 'bg-amber-950/30 border-amber-500/60' : 'bg-stone-950/90 border-stone-800'} border transition space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div class="truncate">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[9px] font-bold font-imperial px-1.5 py-0.5 rounded ${badgeCls}">
                ${k.element} ${k.mastery}
              </span>
              <span class="font-bold font-imperial text-amber-200 text-xs truncate">${k.name}</span>
            </div>
            <div class="text-[10px] text-stone-400 mt-0.5">${k.schools} • <b>${k.xpCost} XP</b></div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" onclick="toggleActiveKata('${k.id}')" class="px-2 py-0.5 rounded text-[10px] font-bold font-imperial transition cursor-pointer ${k.active ? 'bg-emerald-600 text-black' : 'bg-stone-900 text-stone-400 border border-stone-700'}">
              ${k.active ? '✓ Actif' : 'Activer'}
            </button>
            <button type="button" onclick="removeCharacterKata('${k.id}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
          </div>
        </div>
        <p class="text-[10px] text-stone-300 leading-snug">${k.desc}</p>
      </div>
    `;
  }).join('');
}

// =============================================================================
// SÉLECTION MULTIPLE DES COMPÉTENCES
// =============================================================================
let selectedSkillNames = new Set();

function initSkillsMultiSelect() {
  const container = document.getElementById('skills-checkboxes-container');
  if (!container) return;
  const allSkills = (typeof window.getSkills === 'function') ? window.getSkills() : (window.COMPETENCES_DATA || []);
  const ownedRoots = new Set((window.currentSkills || []).map(s => (s.name || "").split('(')[0].trim().toLowerCase()));

  container.innerHTML = "";
  const frag = document.createDocumentFragment();
  allSkills.forEach(s => {
    const root = s.name.split('(')[0].trim().toLowerCase();
    if (ownedRoots.has(root)) return;

    const lbl = document.createElement('label');
    lbl.className = "flex items-center justify-between p-1.5 rounded hover:bg-stone-900 cursor-pointer text-xs";
    lbl.dataset.search = `${s.name} ${s.type} ${s.trait}`.toLowerCase();

    const span = document.createElement('span');
    span.className = "text-amber-200";
    span.appendChild(document.createTextNode(`${s.name} `));
    const sub = document.createElement('span');
    sub.className = "text-[10px] text-stone-500";
    sub.textContent = `(${s.type} - ${s.trait})`;
    span.appendChild(sub);

    const cb = document.createElement('input');
    cb.type = "checkbox";
    cb.value = s.name;
    cb.className = "rounded border-stone-700 text-amber-500";
    cb.addEventListener('change', function () { toggleSkillCheckbox(this); });

    lbl.appendChild(span);
    lbl.appendChild(cb);
    frag.appendChild(lbl);
  });
  container.appendChild(frag);
  updateSkillsDropdownSummary();
}

function toggleSkillsDropdown() {
  const panel = document.getElementById('skills-dropdown-panel');
  const arrow = document.getElementById('skills-dropdown-arrow');
  if (!panel) return;
  const isHidden = panel.classList.toggle('hidden');
  if (arrow) arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
}

let _skillsFilterTimer = null;
function applySkillsFilterNow() {
  const term = (document.getElementById('filter-skills-input')?.value || "").toLowerCase().trim();
  const labels = document.querySelectorAll('#skills-checkboxes-container label');
  for (let i = 0; i < labels.length; i++) {
    const lbl = labels[i];
    const txt = lbl.dataset.search || lbl.textContent.toLowerCase();
    lbl.style.display = (!term || txt.includes(term)) ? "flex" : "none";
  }
}

function filterSkillsList() {
  if (_skillsFilterTimer !== null) clearTimeout(_skillsFilterTimer);
  _skillsFilterTimer = setTimeout(() => {
    _skillsFilterTimer = null;
    applySkillsFilterNow();
  }, 80);
}

function toggleSkillCheckbox(cb) {
  if (cb.checked) selectedSkillNames.add(cb.value);
  else selectedSkillNames.delete(cb.value);
  updateSkillsDropdownSummary();
}

function clearAllSkillCheckboxes() {
  selectedSkillNames.clear();
  document.querySelectorAll('#skills-checkboxes-container input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateSkillsDropdownSummary();
}

function updateSkillsDropdownSummary() {
  const count = selectedSkillNames.size;
  const summary = document.getElementById('skills-checked-summary');
  const btnLabel = document.getElementById('skills-selected-count');
  if (summary) summary.textContent = `${count} sélectionnée(s)`;
  if (btnLabel) btnLabel.textContent = count > 0 ? `${count} compétence(s) choisie(s)` : "Choisir des compétences...";
}

function addSelectedSkills() {
  if (selectedSkillNames.size === 0) return;
  selectedSkillNames.forEach(name => {
    if (typeof window.addSkillFromCatalog === 'function') {
      const selAdd = document.getElementById('sel-add-skill');
      if (selAdd) {
        selAdd.innerHTML = `<option value="${name}" selected>${name}</option>`;
        window.addSkillFromCatalog();
      }
    }
  });
  clearAllSkillCheckboxes();
  toggleSkillsDropdown();
  initSkillsMultiSelect();
}

// =============================================================================
// PLATEAU DE DÉS ROLL & KEEP
// =============================================================================
function toggleDiceTray(forceOpen) {
  const panel = document.getElementById('dice-tray-panel');
  if (!panel) return;
  if (typeof forceOpen === 'boolean') {
    if (forceOpen) panel.classList.remove('hidden');
    else panel.classList.add('hidden');
  } else {
    panel.classList.toggle('hidden');
  }
}

function rollL5RDicePool(rollX, keepY, bonus, label, explode = true, spec = false) {
  toggleDiceTray(true);
  const resBox = document.getElementById('dice-result-box');
  if (!resBox) return;

  const result = (typeof window.simulateRollAndKeep === 'function')
    ? window.simulateRollAndKeep(rollX, keepY, bonus || 0, { explode, spec })
    : (function () {
        const dice = [];
        for (let i = 0; i < rollX; i++) {
          let dieVal = Math.floor(Math.random() * 10) + 1;
          if (spec && dieVal === 1) dieVal = Math.floor(Math.random() * 10) + 1;
          let totalDie = dieVal;
          let explodedTimes = 0;
          while (explode && dieVal === 10 && explodedTimes < 5) {
            dieVal = Math.floor(Math.random() * 10) + 1;
            totalDie += dieVal;
            explodedTimes++;
          }
          dice.push({ value: totalDie, exploded: explodedTimes > 0 });
        }
        dice.sort((a, b) => b.value - a.value);
        const kept = dice.slice(0, keepY);
        const dropped = dice.slice(keepY);
        const total = kept.reduce((acc, d) => acc + d.value, 0) + (bonus || 0);
        return { dice, kept, dropped, bonus: bonus || 0, total };
      })();

  const { kept, dropped, total: totalScore } = result;

  resBox.innerHTML = `
    <div class="flex justify-between items-center border-b border-stone-800 pb-1 text-xs">
      <span class="font-bold text-amber-200 font-imperial">${label || 'Lancer de dés'}</span>
      <span class="font-imperial font-black text-amber-300 text-base">${totalScore}</span>
    </div>
    <div class="flex flex-wrap gap-1 items-center pt-1">
      ${kept.map(d => `<span class="die-anim px-2 py-1 rounded bg-amber-600 text-black font-extrabold text-xs shadow ${d.exploded ? 'ring-2 ring-amber-300' : ''}">${d.value}</span>`).join('')}
      ${dropped.map(d => `<span class="px-1.5 py-0.5 rounded bg-stone-900 text-stone-500 text-[10px] line-through border border-stone-800">${d.value}</span>`).join('')}
      ${bonus ? `<span class="text-xs text-amber-400 font-bold">+${bonus}</span>` : ''}
    </div>
  `;
}

function rollFromSticky(metricId, label) {
  const txt = document.getElementById(metricId)?.textContent || "3g2";
  if (typeof window.parseRollKeepFormula === 'function') {
    const parsed = window.parseRollKeepFormula(txt);
    if (parsed.rolled > 0 && parsed.kept > 0) {
      rollL5RDicePool(parsed.rolled, parsed.kept, parsed.bonus, label, true, false);
      return;
    }
  }
  const parts = txt.match(/(\d+)g(\d+)(?:\s*\+\s*(\d+))?/i);
  if (parts) {
    const x = parseInt(parts[1], 10) || 3;
    const y = parseInt(parts[2], 10) || 2;
    const b = parseInt(parts[3], 10) || 0;
    rollL5RDicePool(x, y, b, label, true, false);
  }
}

function executeManualRoll() {
  const x = parseInt(document.getElementById('manual-roll-x')?.value, 10) || 5;
  const y = parseInt(document.getElementById('manual-keep-y')?.value, 10) || 3;
  const explode = document.getElementById('dice-explode-cb')?.checked ?? true;
  const spec = document.getElementById('dice-spec-cb')?.checked ?? false;
  rollL5RDicePool(x, y, 0, `Lancer manuel (${x}g${y})`, explode, spec);
}

// =============================================================================
// DOJO PERSONNEL & ACTIONS D'EXPORT / IMPRESSION
// =============================================================================
function saveToDojo() {
  if (typeof window.saveCharacterToDojo === 'function') {
    window.saveCharacterToDojo();
    renderDojoRoster();
    const toast = document.getElementById('dojo-save-toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 2500);
    }
  }
}

function renderDojoRoster() {
  const roster = document.getElementById('dojo-roster-list');
  if (!roster) return;
  const raw = localStorage.getItem('l5r_dojo_characters_v4') || localStorage.getItem('l5r_saved_characters');
  const list = raw ? JSON.parse(raw) : [];

  if (!Array.isArray(list) || list.length === 0) {
    roster.innerHTML = `<div class="text-stone-500 italic text-[11px] col-span-full">Aucun samouraï dans le dojo local. Cliquez sur "Enregistrer le personnage actuel".</div>`;
    return;
  }

  roster.innerHTML = list.map((c, idx) => {
    const safeId = c.id || idx;
    return `
      <div class="p-2 rounded bg-black/60 border border-stone-800 hover:border-amber-500/40 flex items-center justify-between gap-1 transition">
        <div class="truncate">
          <b class="text-amber-200 font-imperial block truncate">${c.name || "Samouraï"}</b>
          <span class="text-[9px] text-stone-500">${c.clan || "Clan"}</span>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button type="button" onclick="loadFromDojo('${safeId}')" class="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-[10px] cursor-pointer">Charger</button>
          <button type="button" onclick="deleteFromDojo('${safeId}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

function loadFromDojo(id) {
  if (typeof window.loadCharacterFromDojo === 'function') {
    window.loadCharacterFromDojo(id);
  }
}

function deleteFromDojo(id) {
  if (typeof window.deleteCharacterFromDojo === 'function') {
    window.deleteCharacterFromDojo(id);
    renderDojoRoster();
  }
}

function shareCharacterUrl() {
  if (typeof window.collectCharacterData === 'function') {
    const data = window.collectCharacterData();
    const str = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}?char=${str}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Lien direct copié dans votre presse-papiers !");
    }).catch(() => {
      prompt("Voici votre lien direct :", url);
    });
  }
}

function applyFullCharacterState(decoded) {
  if (typeof window.applyCharacterDataToSheet === 'function') {
    window.applyCharacterDataToSheet(decoded);
  }
}

function populatePrintableMysticBox() {
  const box = document.getElementById('p-spells-katas-box');
  const sum = document.getElementById('p-mystic-summary');
  if (!box) return;

  const aff = document.getElementById('shugenja-affinity')?.value || "aucune";
  const def = document.getElementById('shugenja-deficiency')?.value || "aucune";
  if (sum) {
    sum.textContent = `${window.charSpellsList.length} Sort(s)/Kiho(s) • ${window.charKatasList.length} Kata(s)${aff !== 'aucune' ? ` • Affinité: ${aff.toUpperCase()}` : ''}${def !== 'aucune' ? ` / Déficience: ${def.toUpperCase()}` : ''}`;
  }

  if (window.charSpellsList.length === 0 && window.charKatasList.length === 0) {
    box.innerHTML = `<div class="text-stone-500 italic">Aucun sort, kiho ou kata inscrit sur cette fiche.</div>`;
    return;
  }

  const spellsHtml = window.charSpellsList.map(s => {
    const tn = s.mastery === 0 ? 10 : (5 + 5 * s.mastery);
    return `<div><b>[${s.isKiho ? 'Kiho ' + s.ring : s.element} M${s.mastery} • ND ${tn}] ${s.name}</b> (${s.range}, ${s.duration}) : ${s.desc}</div>`;
  }).join('');

  const katasHtml = window.charKatasList.map(k => {
    return `<div><b>[Kata ${k.element} ${k.mastery} • ${k.xpCost} XP${k.active ? ' • ACTIF' : ''}] ${k.name}</b> : ${k.desc}</div>`;
  }).join('');

  box.innerHTML = spellsHtml + katasHtml;
}

function exportJSONWithMystic() {
  if (typeof exportJSON === "function") exportJSON();
}

function importJSONWithMystic(event) {
  if (typeof importJSON === "function") importJSON(event);
}

function resetCharacterWithMystic() {
  window.charSpellsList = [];
  window.charKatasList = [];
  if (document.getElementById('shugenja-affinity')) document.getElementById('shugenja-affinity').value = "aucune";
  if (document.getElementById('shugenja-deficiency')) document.getElementById('shugenja-deficiency').value = "aucune";
  if (typeof resetCharacter === "function") resetCharacter();
  renderCharacterSpells();
  renderCharacterKatas();
  updateArchetypePanels();
}

function populatePrintable20Questions() {
  const qBox = document.getElementById('p-20questions-box');
  if (!qBox) return;
  let html = "";
  for (let i = 1; i <= 20; i++) {
    const val = document.getElementById(`q20-${i}`)?.value || "";
    if (val) html += `<div><b>Q${i}.</b> ${val}</div>`;
  }
  qBox.innerHTML = html;
}

function prepareAndPrintPDF() {
  populatePrintableMysticBox();
  populatePrintable20Questions();
  if (document.getElementById('pc-background-story') && document.getElementById('p-background-story')) {
    document.getElementById('p-background-story').textContent = document.getElementById('pc-background-story').value;
  }
  if (typeof exportOfficialPDF === "function") exportOfficialPDF();
}

window.addEventListener('beforeprint', () => {
  populatePrintableMysticBox();
  populatePrintable20Questions();
  if (document.getElementById('pc-background-story') && document.getElementById('p-background-story')) {
    document.getElementById('p-background-story').textContent = document.getElementById('pc-background-story').value;
  }
});

// =============================================================================
// GESTION DYNAMIQUE DES TATOUAGES TOGASHI (ISE ZUMI)
// =============================================================================
function isCharacterTogashiTattooed() {
  const famSel = document.getElementById('sel-family');
  const schSel = document.getElementById('sel-school');
  const clanSel = document.getElementById('sel-clan');

  const famText = (famSel?.options[famSel.selectedIndex]?.text || "").toLowerCase();
  const famVal  = (famSel?.value || "").toLowerCase();
  const schText = (schSel?.options[schSel.selectedIndex]?.text || "").toLowerCase();
  const schVal  = (schSel?.value || "").toLowerCase();
  const clanVal = (clanSel?.value || "").toLowerCase();
  const clanText = (clanSel?.options[clanSel.selectedIndex]?.text || "").toLowerCase();

  return famText.includes("togashi") || famVal.includes("togashi") ||
         schText.includes("togashi") || schVal.includes("togashi") ||
         schText.includes("zumi")    || schVal.includes("zumi") ||
         schText.includes("tatou")   ||
         ((clanVal.includes("dragon") || clanText.includes("dragon")) && (famText.includes("togashi") || famVal.includes("togashi")));
}

function getTattooAllowedQuota() {
  const rank = typeof getCurrentSchoolRank === 'function' ? getCurrentSchoolRank() : 1;
  return 1 + rank;
}

function getSafeElementBadgeClass(elem) {
  switch ((elem || '').toLowerCase()) {
    case 'air':   return 'bg-sky-950 text-sky-300 border border-sky-600/40';
    case 'terre': return 'bg-amber-950 text-amber-300 border border-amber-600/40';
    case 'feu':   return 'bg-red-950 text-red-300 border border-red-600/40';
    case 'eau':   return 'bg-blue-950 text-blue-300 border border-blue-600/40';
    case 'vide':  return 'bg-purple-950 text-purple-300 border border-purple-600/40';
    default:      return 'bg-emerald-950 text-emerald-300 border border-emerald-600/40';
  }
}

let _wasTogashiPanelActive = false;

function updateArchetypePanelsWithTattoos(forceCatalogRefresh = false) {
  const isTattooed = isCharacterTogashiTattooed();
  const tattoosPanel = document.getElementById('panel-tattoos-container');
  const tabBtn = document.getElementById('tab-btn-tattoos');
  const archetypeBadge = document.getElementById('archetype-active-badge');

  if (isTattooed) {
    if (tabBtn) tabBtn.classList.remove('hidden');
    if (tattoosPanel) tattoosPanel.classList.remove('hidden');
    if (archetypeBadge) {
      archetypeBadge.innerHTML = `<span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold font-imperial">Chair Tatouée (Ise Zumi)</span>`;
    }

    document.getElementById('panel-spells-container')?.classList.add('hidden');
    document.getElementById('panel-katas-container')?.classList.add('hidden');
    document.getElementById('shugenja-slots-bar')?.classList.add('hidden');

    if (forceCatalogRefresh || !_wasTogashiPanelActive) {
      populateTattooCatalogSelect();
    }
    _wasTogashiPanelActive = true;
    renderCharacterTattoos();
  } else {
    _wasTogashiPanelActive = false;
    if (tattoosPanel) tattoosPanel.classList.add('hidden');
    if (tabBtn) tabBtn.classList.add('hidden');
    if (typeof updateArchetypePanels === 'function') updateArchetypePanels();
  }
}

function populateTattooCatalogSelect() {
  const sel = document.getElementById('sel-catalog-tattoo');
  if (!sel) return;
  const list = window.TATOUAGES_DATA || [];
  const owned = new Set((window.charTattoosList || []).map(t => t.id));

  sel.innerHTML = `<option value="">-- Choisir un Tatouage de Togashi --</option>`;
  const frag = document.createDocumentFragment();
  list.forEach(t => {
    if (!owned.has(t.id)) {
      const opt = document.createElement('option');
      opt.value = t.id;
      const tag = t.element ? `[${t.element} ${t.ringReq || ''}]` : `[${t.source || 'Livre de Base'}]`;
      opt.textContent = `${tag} ${t.name} ${t.kanji ? '(' + t.kanji + ')' : ''}`;
      frag.appendChild(opt);
    }
  });
  sel.appendChild(frag);
  updateTattooPreview();
}

function updateTattooPreview() {
  const sel = document.getElementById('sel-catalog-tattoo');
  const card = document.getElementById('tattoo-preview-card');
  if (!sel || !card) return;

  const t = (window.TATOUAGES_DATA || []).find(item => item.id === sel.value);
  if (!t) { card.classList.add('hidden'); return; }

  const nameEl = document.getElementById('tattoo-preview-name');
  if (nameEl) nameEl.textContent = `${t.name} ${t.kanji ? '(' + t.kanji + ')' : ''}`;

  const elemBadge = document.getElementById('tattoo-preview-elem');
  if (elemBadge) {
    elemBadge.textContent = t.element ? `Anneau de ${t.element} ${t.ringReq || ''}` : (t.type || 'Togashi');
    elemBadge.className = `text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${getSafeElementBadgeClass(t.element)}`;
  }

  const actEl = document.getElementById('tattoo-preview-act');
  if (actEl) actEl.textContent = t.activation || t.action || 'Action Libre';

  const durEl = document.getElementById('tattoo-preview-dur');
  if (durEl) durEl.textContent = t.duration || '2 × Rang rounds';

  const descEl = document.getElementById('tattoo-preview-desc');
  if (descEl) descEl.textContent = t.desc || t.lore ? `« ${t.desc || t.lore} »` : '';

  const ruleEl = document.getElementById('tattoo-preview-rule');
  if (ruleEl) ruleEl.textContent = t.rule || '';

  card.classList.remove('hidden');
}

function addTattooFromCatalog() {
  const sel = document.getElementById('sel-catalog-tattoo');
  if (!sel || !sel.value) return;
  const found = (window.TATOUAGES_DATA || []).find(t => t.id === sel.value);
  if (!found) return;

  const quota = getTattooAllowedQuota();
  if (window.charTattoosList.length >= quota) {
    alert(`Limite atteinte ! Votre Rang d'École vous permet de porter un maximum de ${quota} Tatouages.`);
    return;
  }

  window.charTattoosList.push(found);
  renderCharacterTattoos();
  populateTattooCatalogSelect();
}

function removeCharacterTattoo(id) {
  window.charTattoosList = window.charTattoosList.filter(t => t.id !== id);
  renderCharacterTattoos();
  populateTattooCatalogSelect();
}

function renderCharacterTattoos() {
  const container = document.getElementById('char-tattoos-container');
  const countBadge = document.getElementById('tattoos-count-badge');
  const quotaBadge = document.getElementById('tattoos-quota-badge');
  if (!container) return;

  const quota = getTattooAllowedQuota();
  if (countBadge) countBadge.textContent = window.charTattoosList.length;
  if (quotaBadge) quotaBadge.textContent = quota;

  if (window.charTattoosList.length === 0) {
    container.innerHTML = `<div class="col-span-full p-3 rounded bg-black/40 border border-stone-800 text-stone-500 italic text-center text-[11px]">Aucun tatouage gravé. Choisissez vos 2 tatouages initiaux ci-dessus.</div>`;
    return;
  }

  container.innerHTML = window.charTattoosList.map(t => {
    const badgeCls = getSafeElementBadgeClass(t.element);
    const label = t.element ? `${t.element} ${t.ringReq || ''}` : (t.type || 'Togashi');
    return `
      <div class="p-2.5 rounded-lg bg-stone-950/90 border border-emerald-900/50 space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div>
            <span class="text-[9px] font-bold font-imperial px-1.5 py-0.5 rounded ${badgeCls}">${label}</span>
            <b class="text-amber-200 font-imperial text-xs ml-1">${t.name}</b>
            ${t.kanji ? `<span class="text-emerald-400 font-serif font-bold text-xs ml-1">${t.kanji}</span>` : ''}
          </div>
          <button type="button" onclick="removeCharacterTattoo('${t.id}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
        </div>
        <p class="text-[10px] text-stone-300 leading-snug">${t.rule}</p>
      </div>
    `;
  }).join('');
}

function setMysticTab(tab) {
  const pSpells = document.getElementById('panel-spells-container');
  const pKatas = document.getElementById('panel-katas-container');
  const pTattoos = document.getElementById('panel-tattoos-container');
  const courtierNote = document.getElementById('panel-courtier-note');
  const slotsBar = document.getElementById('shugenja-slots-bar');
  if (courtierNote) courtierNote.classList.add('hidden');

  if (tab === 'tattoos') {
    pTattoos?.classList.remove('hidden');
    pSpells?.classList.add('hidden');
    pKatas?.classList.add('hidden');
  } else if (tab === 'spells') {
    pSpells?.classList.remove('hidden');
    pKatas?.classList.add('hidden');
    pTattoos?.classList.add('hidden');
    slotsBar?.classList.remove('hidden');
  } else if (tab === 'katas') {
    pKatas?.classList.remove('hidden');
    pSpells?.classList.add('hidden');
    pTattoos?.classList.add('hidden');
    slotsBar?.classList.add('hidden');
  } else if (tab === 'all') {
    pSpells?.classList.remove('hidden');
    pKatas?.classList.remove('hidden');
    slotsBar?.classList.remove('hidden');
  } else {
    updateArchetypePanelsWithTattoos();
  }
}

// =============================================================================
// INITIALISATION & ÉCOUTEURS D'ÉVÉNEMENTS (SANS DÉLAIS ARTIFICIELS)
// =============================================================================
function handleFamilyOrSchoolChange() {
  const selFam = document.getElementById('sel-family');
  const selSch = document.getElementById('sel-school');
  const famText = (selFam?.options[selFam.selectedIndex]?.text || "").toLowerCase();
  if (famText.includes("togashi") && selSch) {
    const togashiSchOpt = Array.from(selSch.options).find(opt =>
      opt.text.toLowerCase().includes("togashi") || opt.text.toLowerCase().includes("zumi") || opt.value.toLowerCase().includes("togashi")
    );
    if (togashiSchOpt && selSch.value !== togashiSchOpt.value) {
      selSch.value = togashiSchOpt.value;
      if (typeof onSchoolChange === 'function') onSchoolChange();
      return;
    }
  }
  updateArchetypePanels();
  updateArchetypePanelsWithTattoos(true);
}

let _forgeUIInitialized = false;
function initForgeUIWhenReady() {
  if (_forgeUIInitialized) return;
  _forgeUIInitialized = true;

  populateSpellCatalogSelect();
  populateKataCatalogSelect();
  renderCharacterSpells();
  renderCharacterKatas();
  initSkillsMultiSelect();
  renderDojoRoster();
  updateArchetypePanels();

  const params = new URLSearchParams(window.location.search);
  const charParam = params.get("char");
  const loadIdParam = params.get("load");
  const clanParam = params.get("clan");

  if (charParam) {
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(charParam)));
      applyFullCharacterState(decoded);
      updateArchetypePanelsWithTattoos(true);
      return;
    } catch (e) {}
  }

  if (loadIdParam) {
    loadFromDojo(loadIdParam);
    updateArchetypePanelsWithTattoos(true);
    return;
  }

  if (clanParam && document.querySelector(`#sel-clan option[value="${clanParam}"]`)) {
    document.getElementById("sel-clan").value = clanParam;
    if (typeof onClanChange === 'function') onClanChange();
  }

  updateArchetypePanelsWithTattoos(true);
}

window.addEventListener("l5r-forge-ready", initForgeUIWhenReady);

window.addEventListener("l5r-forge-selection-changed", () => {
  handleFamilyOrSchoolChange();
});

window.addEventListener("l5r-forge-updated", () => {
  if (isCharacterTogashiTattooed()) {
    updateArchetypePanelsWithTattoos(false);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  injectForgeTemplates();

  if (window.__l5rForgeReady) {
    initForgeUIWhenReady();
  }
});
