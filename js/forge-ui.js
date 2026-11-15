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
      <details class="q20-chapter rounded-xl border border-stone-800/80 bg-black/40 p-3.5 space-y-3" data-q20-chap="${idx}" ${idx === 0 ? 'open' : ''}>
        <summary class="flex items-center justify-between cursor-pointer select-none list-none text-xs font-bold font-imperial text-amber-300 uppercase tracking-wider">
          <span>${sec.title}</span>
          <span class="flex items-center gap-2">
            <span id="q20-chap-count-${idx}" class="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">${sec.items.length}/${sec.items.length}</span>
            <span class="text-amber-400 text-[10px]">▾</span>
          </span>
        </summary>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-stone-800/70">
          ${sec.items.map(item => `
            <div class="${item.full ? 'md:col-span-2' : ''}">
              <label class="block text-stone-300 font-bold mb-1" for="q20-${item.id}">${item.q}</label>
              <input type="text" id="q20-${item.id}" value="${item.val.replace(/"/g, '&quot;')}" oninput="updateTwentyQuestionsProgress()" class="w-full p-2 rounded text-xs">
            </div>
          `).join('')}
        </div>
      </details>
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

function getActiveForgePermissions() {
  const schObj = typeof getSelectedSchoolObject === "function" ? getSelectedSchoolObject() : null;
  const primarySchool = schObj?.school || null;
  const multiAdv = (window.advantagesList || []).find(a => (typeof isMultipleSchoolsAdv === 'function') && isMultipleSchoolsAdv(a.name));
  let secondarySchool = null;
  if (multiAdv && multiAdv.secondarySchoolId && typeof window.getAllSchoolsCatalog === 'function') {
    secondarySchool = window.getAllSchoolsCatalog().find(s => s.id === multiAdv.secondarySchoolId) || null;
  }
  const isTattooed = typeof isCharacterTogashiTattooed === 'function' ? isCharacterTogashiTattooed() : false;

  let perms = null;
  if (typeof window.getCharacterArchetypePermissions === 'function') {
    perms = window.getCharacterArchetypePermissions(primarySchool, secondarySchool, isTattooed);
  } else {
    const t = String(primarySchool?.type || 'Bushi').toLowerCase();
    perms = {
      primaryType: t.includes('shugenja') ? 'shugenja' : t.includes('moine') ? 'moine' : t.includes('courtisan') ? 'courtisan' : t.includes('ninja') ? 'ninja' : 'bushi',
      secondaryType: null,
      canCastSpells: t.includes('shugenja'),
      canUseKatas: t.includes('bushi') || t.includes('ninja'),
      canUseKihos: t.includes('shugenja') || t.includes('moine'),
      canUseTattoos: isTattooed
    };
  }
  return { ...perms, primarySchool, secondarySchool, hasMultiAdv: !!multiAdv };
}

function sanitizeMysticListsForPermissions(perms, notify = false) {
  if (!perms) return false;
  const removed = [];

  if (Array.isArray(window.charSpellsList) && window.charSpellsList.length > 0) {
    const keptSpells = window.charSpellsList.filter(item => {
      const isKiho = !!item.isKiho || (item.element || '').toLowerCase() === 'kiho';
      if (isKiho && !perms.canUseKihos) {
        removed.push(item.name || 'Kiho');
        return false;
      }
      if (!isKiho && !perms.canCastSpells) {
        removed.push(item.name || 'Sort');
        return false;
      }
      return true;
    });
    if (keptSpells.length !== window.charSpellsList.length) {
      window.charSpellsList = keptSpells;
      if (typeof renderCharacterSpells === 'function') renderCharacterSpells();
    }
  }

  if (!perms.canUseKatas && Array.isArray(window.charKatasList) && window.charKatasList.length > 0) {
    window.charKatasList.forEach(k => removed.push(k.name || 'Kata'));
    window.charKatasList = [];
    if (typeof renderCharacterKatas === 'function') renderCharacterKatas();
  }

  if (!perms.canUseTattoos && Array.isArray(window.charTattoosList) && window.charTattoosList.length > 0) {
    window.charTattoosList.forEach(t => removed.push(t.name || 'Tatouage'));
    window.charTattoosList = [];
    if (typeof renderCharacterTattoos === 'function') renderCharacterTattoos();
  }

  if (removed.length > 0) {
    if (typeof updateAll === 'function') updateAll();
    if (notify && typeof showForgeToast === 'function') {
      showForgeToast(`Règle L5R 4e : ${removed.length} élément(s) incompatible(s) retiré(s) (${removed.slice(0, 2).join(', ')}${removed.length > 2 ? '…' : ''}).`, 'info');
    }
    return true;
  }
  return false;
}

function applySpellsFilterConstraints(perms) {
  const elemSel = document.getElementById('filter-spell-elem');
  const univBtn = document.getElementById('btn-add-universal-spells');
  const titleEl = document.getElementById('spells-panel-title');
  const hintEl = document.getElementById('spells-panel-footer-hint');

  if (elemSel) {
    Array.from(elemSel.options).forEach(opt => {
      if (opt.value === 'kiho') {
        const allowKihoOpt = perms.canUseKihos;
        opt.hidden = !allowKihoOpt;
        opt.disabled = !allowKihoOpt;
      } else if (opt.value === 'tous') {
        const allowAll = perms.canCastSpells;
        opt.hidden = !allowAll;
        opt.disabled = !allowAll;
        opt.textContent = (perms.canCastSpells && perms.canUseKihos)
          ? 'Tous les Éléments & Kihos'
          : 'Tous les Éléments (Sorts)';
      } else {
        const allowElem = perms.canCastSpells;
        opt.hidden = !allowElem;
        opt.disabled = !allowElem;
      }
    });

    if (!perms.canCastSpells && perms.canUseKihos) {
      elemSel.value = 'kiho';
    } else if (perms.canCastSpells && !perms.canUseKihos && elemSel.value === 'kiho') {
      elemSel.value = 'tous';
    }
  }

  if (univBtn) univBtn.classList.toggle('hidden', !perms.canCastSpells);

  if (titleEl) {
    if (perms.canCastSpells && perms.canUseKihos) {
      titleEl.innerHTML = '<span>📜</span> 5A. Parchemins de Sorts &amp; Kihos';
    } else if (perms.canCastSpells) {
      titleEl.innerHTML = '<span>📜</span> 5A. Parchemins de Sorts';
    } else {
      titleEl.innerHTML = '<span>🥋</span> 5A. Voies Mystiques (Kihos)';
    }
  }

  if (hintEl) {
    if (perms.canCastSpells && perms.canUseKihos) {
      hintEl.textContent = 'Parchemins : 0 XP • Kihos : Maîtrise en XP.';
    } else if (perms.canCastSpells) {
      hintEl.textContent = 'Parchemins de sorts : 0 XP (Sorts de départ & parchemins).';
    } else {
      hintEl.textContent = 'Kihos (Confrérie de Shinsei) : Maîtrise en XP.';
    }
  }
}

let _isRefreshingArchetypePanels = false;
let _lastSpellsPermissionKey = '';
function updateArchetypePanels(notifySanitize = false, forceCatalogRefresh = false) {
  if (_isRefreshingArchetypePanels) return;
  _isRefreshingArchetypePanels = true;
  try {
    const perms = getActiveForgePermissions();
    sanitizeMysticListsForPermissions(perms, notifySanitize);
    applySpellsFilterConstraints(perms);

    const spellsPanel = document.getElementById('panel-spells-container');
    const katasPanel = document.getElementById('panel-katas-container');
    const tattoosPanel = document.getElementById('panel-tattoos-container');
    const courtierNote = document.getElementById('panel-courtier-note');
    const slotsBar = document.getElementById('shugenja-slots-bar');
    const archetypeBadge = document.getElementById('archetype-active-badge');
    const tabGroup = document.getElementById('mystic-tab-group');
    const tabKatas = document.getElementById('tab-btn-katas');
    const tabSpells = document.getElementById('tab-btn-spells');
    const tabTattoos = document.getElementById('tab-btn-tattoos');

    if (!spellsPanel || !katasPanel) return;

    const allowSpellsOrKihos = perms.canCastSpells || perms.canUseKihos;
    const allowKatas = perms.canUseKatas;
    const allowTattoos = perms.canUseTattoos;
    const allowedCount = (allowSpellsOrKihos ? 1 : 0) + (allowKatas ? 1 : 0) + (allowTattoos ? 1 : 0);

    spellsPanel.classList.toggle('hidden', !allowSpellsOrKihos);
    if (slotsBar) slotsBar.classList.toggle('hidden', !perms.canCastSpells);
    katasPanel.classList.toggle('hidden', !allowKatas);
    if (tattoosPanel) tattoosPanel.classList.toggle('hidden', !allowTattoos);
    if (courtierNote) courtierNote.classList.toggle('hidden', allowedCount > 0);

    if (tabKatas) tabKatas.classList.toggle('hidden', !allowKatas);
    if (tabSpells) {
      tabSpells.classList.toggle('hidden', !allowSpellsOrKihos);
      tabSpells.textContent = (!perms.canCastSpells && perms.canUseKihos) ? 'Kihos' : 'Sorts / Kihos';
    }
    if (tabTattoos) tabTattoos.classList.toggle('hidden', !allowTattoos);
    if (tabGroup) tabGroup.classList.toggle('hidden', allowedCount <= 1);

    document.querySelectorAll('#mystic-tab-group [data-mystic-tab]').forEach(btn => {
      const isAuto = btn.dataset.mysticTab === 'auto';
      btn.classList.toggle('active', isAuto);
      btn.classList.toggle('text-stone-400', !isAuto);
    });

    if (archetypeBadge) {
      let badgeHtml = '';
      if (perms.canUseTattoos && !allowKatas && !allowSpellsOrKihos) {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold font-imperial">Chair Tatouée (Ise Zumi)</span>`;
      } else if (perms.primaryType === 'shugenja') {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">Voie des Kamis (Shugenja)</span>`;
      } else if (perms.primaryType === 'moine') {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-500/40 font-bold">Voie de la Confrérie (Moine)</span>`;
      } else if (perms.primaryType === 'bushi' || perms.primaryType === 'ninja') {
        const label = perms.primaryType === 'ninja' ? 'Ombre (Shinobi)' : 'Voie Martiale (Bushi)';
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold">${label}</span>`;
      } else {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-700 font-bold">Voie de la Cour &amp; de la Loi</span>`;
      }
      if (perms.secondarySchool) {
        badgeHtml += ` <span class="px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40 font-bold">+ ${perms.secondarySchool.type} (${perms.secondarySchool.name})</span>`;
      }
      archetypeBadge.innerHTML = badgeHtml;
    }

    const permKey = `${perms.canCastSpells}|${perms.canUseKihos}`;
    if (allowSpellsOrKihos && (forceCatalogRefresh || permKey !== _lastSpellsPermissionKey)) {
      _lastSpellsPermissionKey = permKey;
      populateSpellCatalogSelect();
    } else if (!allowSpellsOrKihos) {
      _lastSpellsPermissionKey = permKey;
    }

    if (allowTattoos) {
      if (forceCatalogRefresh) populateTattooCatalogSelect();
      renderCharacterTattoos();
    }
  } finally {
    _isRefreshingArchetypePanels = false;
  }
}

function foldForgeSearch(str) {
  return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function populateSpellCatalogSelect(autoSelectFirst = false) {
  const sel = document.getElementById('sel-catalog-spell');
  if (!sel) return;
  const allSpells = window.SORTS_DATA || [];
  const perms = getActiveForgePermissions();
  const elemFilter = document.getElementById('filter-spell-elem')?.value || "tous";
  const rankFilter = document.getElementById('filter-spell-rank')?.value || "tous";
  const searchFilter = foldForgeSearch(document.getElementById('filter-spell-search')?.value || "");

  const filtered = allSpells.filter(s => {
    if (s.isMaho || (s.element && s.element.toLowerCase() === "maho")) return false;
    const isKiho = !!s.isKiho || (s.element || "").toLowerCase() === "kiho";
    if (!perms.canCastSpells && !isKiho) return false;
    if (!perms.canUseKihos && isKiho) return false;
    const sElem = (isKiho ? "kiho" : (s.element || "universel")).toLowerCase();
    const matchElem = elemFilter === "tous" || sElem === elemFilter;
    const sRank = Number(s.mastery) || 0;
    const matchRank = rankFilter === "tous" || (rankFilter === "6" ? sRank >= 6 : sRank === parseInt(rankFilter, 10));
    if (!matchElem || !matchRank) return false;
    if (!searchFilter) return true;
    const hay = foldForgeSearch(`${s.name || s.nom || ''} ${s.element || ''} ${(s.keywords || []).join(' ')} ${s.description || ''}`);
    return hay.includes(searchFilter);
  });

  const emptyPlaceholder = (!perms.canCastSpells && perms.canUseKihos)
    ? `-- Choisir un kiho (${filtered.length} disponible(s)) --`
    : (perms.canCastSpells && !perms.canUseKihos)
      ? `-- Choisir un sort (${filtered.length} disponible(s)) --`
      : `-- Choisir un sort ou kiho (${filtered.length} disponible(s)) --`;
  sel.innerHTML = `<option value="">${emptyPlaceholder}</option>`;
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
  if (autoSelectFirst && searchFilter && filtered.length > 0) {
    sel.value = filtered[0].id;
  }
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
  const perms = getActiveForgePermissions();
  const isKiho = !!found.isKiho || (found.element || '').toLowerCase() === 'kiho';
  if ((isKiho && !perms.canUseKihos) || (!isKiho && !perms.canCastSpells)) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Action bloquée : votre école actuelle n'a pas accès à cette voie (règle L5R 4e).", 'warning');
    }
    return;
  }
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
  const perms = getActiveForgePermissions();
  if (!perms.canCastSpells) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Seule une école de Shugenja donne accès aux Sorts Universels.", 'warning');
    }
    return;
  }
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
function populateKataCatalogSelect(autoSelectFirst = false) {
  const sel = document.getElementById('sel-catalog-kata');
  if (!sel) return;
  const rawFilter = (document.getElementById('filter-kata-elem')?.value || "tous").toLowerCase();
  const searchFilter = foldForgeSearch(document.getElementById('filter-kata-search')?.value || "");
  const allKatas = window.KATAS_DATA || [];

  const filtered = allKatas.filter(k => {
    const matchElem = rawFilter === "tous" || (k.element || "").toLowerCase() === rawFilter;
    if (!matchElem) return false;
    if (!searchFilter) return true;
    const hay = foldForgeSearch(`${k.name || ''} ${k.element || ''} ${k.schools || ''} ${k.effect || ''}`);
    return hay.includes(searchFilter);
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
  if (autoSelectFirst && searchFilter && filtered.length > 0) {
    sel.value = filtered[0].id;
  }
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
  const perms = getActiveForgePermissions();
  if (!perms.canUseKatas) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Les Katas sont réservés aux écoles martiales (Bushi / Shinobi).", 'warning');
    }
    return;
  }
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
    lbl.dataset.search = foldForgeSearch(`${s.name} ${s.type} ${s.trait}`);
    lbl.dataset.skillType = foldForgeSearch(s.type || '');

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
let _activeSkillDropdownCategory = 'all';

function setSkillDropdownCategory(cat) {
  _activeSkillDropdownCategory = cat || 'all';
  document.querySelectorAll('#skills-cat-chips [data-skill-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.skillCat === _activeSkillDropdownCategory);
  });
  applySkillsFilterNow();
}

function applySkillsFilterNow() {
  const term = foldForgeSearch(document.getElementById('filter-skills-input')?.value || "");
  const labels = document.querySelectorAll('#skills-checkboxes-container label');
  for (let i = 0; i < labels.length; i++) {
    const lbl = labels[i];
    const txt = lbl.dataset.search || foldForgeSearch(lbl.textContent);
    const sType = lbl.dataset.skillType || '';
    let matchCat = true;
    if (_activeSkillDropdownCategory === 'noble') {
      matchCat = sType.includes('noble') || sType.includes('haute');
    } else if (_activeSkillDropdownCategory !== 'all') {
      matchCat = sType.includes(_activeSkillDropdownCategory);
    }
    const matchText = !term || txt.includes(term);
    lbl.style.display = (matchCat && matchText) ? "flex" : "none";
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

let _diceAugCount = 0;
let _diceHistory = [];

function adjustDiceAug(delta) {
  _diceAugCount = Math.max(0, Math.min(10, _diceAugCount + delta));
  const el = document.getElementById('dice-aug-display');
  if (el) el.textContent = _diceAugCount;
}

function clearDiceHistory() {
  _diceHistory = [];
  const box = document.getElementById('dice-history-box');
  const list = document.getElementById('dice-history-list');
  if (list) list.innerHTML = '';
  if (box) box.classList.add('hidden');
}

function renderDiceHistory() {
  const box = document.getElementById('dice-history-box');
  const list = document.getElementById('dice-history-list');
  if (!box || !list) return;
  if (_diceHistory.length === 0) {
    box.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  list.innerHTML = _diceHistory.map(item => `
    <div class="flex items-center justify-between gap-2 px-2 py-1 rounded bg-black/60 border border-stone-800/80">
      <span class="truncate text-stone-300">${item.label}${item.aug > 0 ? ` <span class="text-amber-400">(${item.aug} Aug)</span>` : ''}</span>
      <span class="font-imperial font-bold text-amber-300 shrink-0">${item.total}</span>
    </div>
  `).join('');
}

function rollL5RDicePool(rollX, keepY, bonus, label, explode = true, spec = false) {
  toggleDiceTray(true);
  const resBox = document.getElementById('dice-result-box');
  if (!resBox) return;

  const flatBonus = parseInt(document.getElementById('dice-flat-bonus')?.value, 10) || 0;
  const totalBonus = (bonus || 0) + flatBonus;

  const result = (typeof window.simulateRollAndKeep === 'function')
    ? window.simulateRollAndKeep(rollX, keepY, totalBonus, { explode, spec })
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
        const total = kept.reduce((acc, d) => acc + d.value, 0) + totalBonus;
        return { dice, kept, dropped, bonus: totalBonus, total };
      })();

  const { kept, dropped, total: totalScore } = result;
  const augNote = _diceAugCount > 0 ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 ml-1">+${_diceAugCount * 5} ND (${_diceAugCount} Aug.)</span>` : '';

  resBox.innerHTML = `
    <div class="flex justify-between items-center border-b border-stone-800 pb-1 text-xs">
      <span class="font-bold text-amber-200 font-imperial truncate">${label || 'Lancer de dés'}${augNote}</span>
      <span class="font-imperial font-black text-amber-300 text-base shrink-0">${totalScore}</span>
    </div>
    <div class="flex flex-wrap gap-1 items-center pt-1">
      ${kept.map(d => `<span class="die-anim px-2 py-1 rounded bg-amber-600 text-black font-extrabold text-xs shadow ${d.exploded ? 'ring-2 ring-amber-300' : ''}">${d.value}</span>`).join('')}
      ${dropped.map(d => `<span class="px-1.5 py-0.5 rounded bg-stone-900 text-stone-500 text-[10px] line-through border border-stone-800">${d.value}</span>`).join('')}
      ${totalBonus ? `<span class="text-xs text-amber-400 font-bold">${totalBonus >= 0 ? '+' : ''}${totalBonus}</span>` : ''}
    </div>
  `;

  _diceHistory.unshift({ label: label || `${rollX}g${keepY}`, total: totalScore, aug: _diceAugCount });
  if (_diceHistory.length > 5) _diceHistory.pop();
  renderDiceHistory();
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

function toggleDojoDrawer(forceOpen) {
  const sec = document.getElementById('dojo-drawer-section');
  const chev = document.getElementById('dojo-toggle-chevron');
  if (!sec) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : sec.classList.contains('hidden');
  sec.classList.toggle('hidden', !shouldOpen);
  if (chev) chev.textContent = shouldOpen ? '▴' : '▾';
  if (shouldOpen) renderDojoRoster();
}

function renderDojoRoster() {
  const roster = document.getElementById('dojo-roster-list');
  const raw = localStorage.getItem('l5r_dojo_characters_v4') || localStorage.getItem('l5r_saved_characters');
  const list = raw ? JSON.parse(raw) : [];
  const countBadge = document.getElementById('cockpit-dojo-count');
  if (countBadge) countBadge.textContent = Array.isArray(list) ? list.length : 0;
  if (!roster) return;

  if (!Array.isArray(list) || list.length === 0) {
    roster.innerHTML = `<div class="text-stone-500 italic text-[11px] col-span-full">Aucun samouraï dans le dojo local. Cliquez sur "Enregistrer".</div>`;
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
    if (typeof showForgeToast === 'function') showForgeToast('Samouraï chargé depuis le Dojo.', 'success');
  }
}

function deleteFromDojo(id) {
  if (typeof window.deleteCharacterFromDojo === 'function') {
    window.deleteCharacterFromDojo(id);
    renderDojoRoster();
    if (typeof showForgeToast === 'function') showForgeToast('Samouraï retiré du Dojo.', 'info');
  }
}

function shareCharacterUrl() {
  if (typeof window.collectCharacterData === 'function') {
    const data = window.collectCharacterData();
    const str = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}?char=${str}`;
    navigator.clipboard.writeText(url).then(() => {
      if (typeof showForgeToast === 'function') showForgeToast("Lien direct copié dans le presse-papiers !", "success");
      else alert("Lien direct copié dans votre presse-papiers !");
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

function updateArchetypePanelsWithTattoos(forceCatalogRefresh = false, notifySanitize = false) {
  if (typeof updateArchetypePanels === 'function') {
    updateArchetypePanels(notifySanitize, forceCatalogRefresh);
  }
}

function populateTattooCatalogSelect(autoSelectFirst = false) {
  const sel = document.getElementById('sel-catalog-tattoo');
  if (!sel) return;
  const list = window.TATOUAGES_DATA || [];
  const owned = new Set((window.charTattoosList || []).map(t => t.id));
  const searchFilter = foldForgeSearch(document.getElementById('filter-tattoo-search')?.value || "");

  const filtered = list.filter(t => {
    if (owned.has(t.id)) return false;
    if (!searchFilter) return true;
    return foldForgeSearch(`${t.name || ''} ${t.kanji || ''} ${t.element || ''} ${t.rule || ''}`).includes(searchFilter);
  });

  sel.innerHTML = `<option value="">-- Choisir un Tatouage de Togashi (${filtered.length}) --</option>`;
  const frag = document.createDocumentFragment();
  filtered.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    const tag = t.element ? `[${t.element} ${t.ringReq || ''}]` : `[${t.source || 'Livre de Base'}]`;
    opt.textContent = `${tag} ${t.name} ${t.kanji ? '(' + t.kanji + ')' : ''}`;
    frag.appendChild(opt);
  });
  sel.appendChild(frag);
  if (autoSelectFirst && searchFilter && filtered.length > 0) {
    sel.value = filtered[0].id;
  }
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
  const perms = getActiveForgePermissions();
  if (!perms.canUseTattoos) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Les Tatouages Togashi sont réservés à l'ordre Ise Zumi.", 'warning');
    }
    return;
  }
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
  const perms = getActiveForgePermissions();
  const allowSpellsOrKihos = perms.canCastSpells || perms.canUseKihos;

  if (tab === 'tattoos' && !perms.canUseTattoos) tab = 'auto';
  if (tab === 'spells' && !allowSpellsOrKihos) tab = 'auto';
  if (tab === 'katas' && !perms.canUseKatas) tab = 'auto';
  if (tab === 'all') tab = 'auto';

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
    slotsBar?.classList.add('hidden');
  } else if (tab === 'spells') {
    pSpells?.classList.remove('hidden');
    pKatas?.classList.add('hidden');
    pTattoos?.classList.add('hidden');
    slotsBar?.classList.toggle('hidden', !perms.canCastSpells);
  } else if (tab === 'katas') {
    pKatas?.classList.remove('hidden');
    pSpells?.classList.add('hidden');
    pTattoos?.classList.add('hidden');
    slotsBar?.classList.add('hidden');
  } else {
    updateArchetypePanelsWithTattoos(false, false);
    return;
  }

  document.querySelectorAll('#mystic-tab-group [data-mystic-tab]').forEach(btn => {
    const isActive = btn.dataset.mysticTab === tab;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('text-stone-400', !isActive);
  });
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
  updateArchetypePanelsWithTattoos(true, true);
}

// =============================================================================
// SYSTÈME DE NOTIFICATIONS TOAST, STEPPER STUDIO & ERGONOMIE FORGE (v1.9.0)
// =============================================================================
function showForgeToast(message, variant = 'info') {
  const container = document.getElementById('forge-toast-container');
  if (!container) return;

  const palette = {
    success: 'bg-emerald-950/95 border-emerald-500/70 text-emerald-100',
    warn: 'bg-amber-950/95 border-amber-500/70 text-amber-100',
    error: 'bg-red-950/95 border-red-500/70 text-red-100',
    info: 'bg-[#171210]/95 border-amber-500/50 text-amber-100'
  };
  const icon = variant === 'success' ? '✅' : (variant === 'warn' ? '⚠️' : (variant === 'error' ? '❌' : '✨'));

  const toast = document.createElement('div');
  toast.className = `forge-toast rounded-xl border px-3.5 py-2.5 shadow-2xl text-xs flex items-center gap-2 backdrop-blur-md ${palette[variant] || palette.info}`;
  toast.innerHTML = `<span>${icon}</span><span class="font-medium leading-snug">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}
window.showForgeToast = showForgeToast;

const FORGE_STEPS = ['identity', 'rings', 'skills', 'perks', 'mystic', 'gear', 'all'];
let _currentForgeStep = 'identity';

function setForgeStep(stepKey, skipScroll = false) {
  const target = FORGE_STEPS.includes(stepKey) ? stepKey : 'identity';
  _currentForgeStep = target;
  try {
    sessionStorage.setItem('l5r_forge_step', target);
  } catch (e) {}

  document.querySelectorAll('[data-forge-step]').forEach(el => {
    const show = target === 'all' || el.dataset.forgeStep === target;
    el.classList.toggle('forge-step-hidden', !show);
  });

  document.querySelectorAll('.forge-step-footer').forEach(footer => {
    footer.classList.toggle('hidden', target === 'all');
  });

  document.querySelectorAll('#forge-stepper-bar [data-step-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.stepBtn === target);
  });

  const skillsPanel = document.getElementById('skills-dropdown-panel');
  if (skillsPanel && !skillsPanel.classList.contains('hidden')) {
    skillsPanel.classList.add('hidden');
  }

  if (!skipScroll) {
    const stepper = document.getElementById('forge-stepper-bar');
    if (stepper) {
      const y = stepper.getBoundingClientRect().top + window.scrollY - 140;
      if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }
}
window.setForgeStep = setForgeStep;

function resolveTraitIdFromLabel(traitLabel) {
  const t = foldForgeSearch(traitLabel);
  if (t.includes('const')) return 'trait-stamina';
  if (t.includes('volon')) return 'trait-willpower';
  if (t.includes('force')) return 'trait-strength';
  if (t.includes('percep')) return 'trait-perception';
  if (t.includes('reflex')) return 'trait-reflexes';
  if (t.includes('intuit')) return 'trait-awareness';
  if (t.includes('agil')) return 'trait-agility';
  if (t.includes('intel')) return 'trait-intelligence';
  if (t.includes('vide')) return 'trait-void';
  return 'trait-agility';
}

function rollSkillFromCard(idx) {
  const skills = window.currentSkills || [];
  const sk = skills[idx];
  if (!sk) return;
  const catalog = (typeof window.getSkills === 'function') ? window.getSkills() : (window.COMPETENCES_DATA || []);
  const catMeta = catalog.find(c => c.name === sk.name) || {};
  const traitLabel = catMeta.trait || sk.trait || 'Agilité';
  const traitId = resolveTraitIdFromLabel(traitLabel);
  const traitVal = parseInt(document.getElementById(traitId)?.value, 10) || 2;
  const rankVal = parseInt(sk.rank, 10) || 0;
  const rollX = Math.max(1, rankVal + traitVal);
  const keepY = Math.max(1, traitVal);
  rollL5RDicePool(rollX, keepY, 0, `${sk.name} (${rollX}g${keepY})`, true, !!sk.spec);
}
window.rollSkillFromCard = rollSkillFromCard;

const _perksCategoryState = { adv: 'all', disadv: 'all' };

function setPerksCategory(kind, cat) {
  const safeKind = kind === 'disadv' ? 'disadv' : 'adv';
  _perksCategoryState[safeKind] = cat || 'all';
  const attr = safeKind === 'adv' ? 'data-adv-cat' : 'data-disadv-cat';
  const containerId = safeKind === 'adv' ? 'adv-cat-chips' : 'disadv-cat-chips';
  document.querySelectorAll(`#${containerId} [${attr}]`).forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute(attr) === _perksCategoryState[safeKind]);
  });
  filterPerksCatalog(safeKind, true);
}
window.setPerksCategory = setPerksCategory;

function filterPerksCatalog(kind, autoSelectFirst = true) {
  const safeKind = kind === 'disadv' ? 'disadv' : 'adv';
  const sel = document.getElementById(safeKind === 'adv' ? 'sel-catalog-adv' : 'sel-catalog-disadv');
  if (!sel || typeof window.getAdvantages !== 'function') return;

  const advData = window.getAdvantages();
  const list = safeKind === 'adv' ? (advData.avantages || []) : (advData.desavantages || []);
  const ownedSet = new Set(
    (safeKind === 'adv' ? (window.advantagesList || []) : (window.disadvantagesList || []))
      .map(x => (x.name || '').toLowerCase().trim())
  );

  const searchTerm = foldForgeSearch(document.getElementById(safeKind === 'adv' ? 'filter-adv-search' : 'filter-disadv-search')?.value || '');
  const catFilter = _perksCategoryState[safeKind] || 'all';
  const prevVal = sel.value;

  const matching = [];
  list.forEach((item, originalIdx) => {
    if (ownedSet.has((item.name || '').toLowerCase().trim())) return;
    const typeKey = foldForgeSearch(item.type || 'general');
    const effVal = safeKind === 'adv'
      ? (typeof window.getEffectiveAdvCost === 'function' ? window.getEffectiveAdvCost(item) : item.cost)
      : (typeof window.getEffectiveDisadvGain === 'function' ? window.getEffectiveDisadvGain(item) : (item.gain ?? item.cost));
    const baseVal = safeKind === 'adv' ? item.cost : (item.gain ?? item.cost);
    const hasModifier = safeKind === 'adv' ? (effVal < baseVal) : (effVal > baseVal);

    if (catFilter === 'discount' && !hasModifier) return;
    if (catFilter !== 'all' && catFilter !== 'discount' && !typeKey.includes(catFilter)) return;

    if (searchTerm) {
      const hay = foldForgeSearch(`${item.name || ''} ${item.type || ''} ${item.desc || ''} ${item.rule || ''}`);
      if (!hay.includes(searchTerm)) return;
    }
    matching.push({ item, originalIdx, effVal, baseVal });
  });

  const countBadge = document.getElementById(safeKind === 'adv' ? 'adv-match-count' : 'disadv-match-count');
  if (countBadge) countBadge.textContent = `${matching.length} résultat(s)`;

  sel.innerHTML = '';
  if (matching.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = searchTerm || catFilter !== 'all'
      ? '— Aucun résultat pour ce filtre —'
      : `— Aucun autre ${safeKind === 'adv' ? 'avantage' : 'désavantage'} disponible —`;
    sel.appendChild(opt);
    sel.disabled = true;
  } else {
    sel.disabled = false;
    const TYPE_LABELS = {
      physique: '⚔️ Physique',
      mental: '🧠 Mental',
      spirituel: '⛩️ Spirituel',
      social: '🌸 Social',
      materiel: '🌿 Matériel'
    };
    const grouped = {};
    matching.forEach(entry => {
      const k = foldForgeSearch(entry.item.type || 'general');
      if (!grouped[k]) grouped[k] = [];
      grouped[k].push(entry);
    });
    const frag = document.createDocumentFragment();
    Object.keys(grouped).sort((a, b) => a.localeCompare(b, 'fr')).forEach(tKey => {
      const grp = document.createElement('optgroup');
      grp.label = TYPE_LABELS[tKey] || `📁 ${tKey.toUpperCase()}`;
      grouped[tKey].sort((a, b) => a.item.name.localeCompare(b.item.name, 'fr')).forEach(({ item, originalIdx, effVal, baseVal }) => {
        const opt = document.createElement('option');
        opt.value = originalIdx;
        if (safeKind === 'adv') {
          const disc = effVal < baseVal ? ` ★ -${baseVal - effVal} XP` : '';
          opt.textContent = `  ◆ ${item.name} (${effVal} XP${disc})`;
        } else {
          const bonus = effVal > baseVal ? ` ★ +${effVal - baseVal} XP` : '';
          opt.textContent = `  ◆ ${item.name} (+${effVal} XP${bonus})`;
        }
        grp.appendChild(opt);
      });
      frag.appendChild(grp);
    });
    sel.appendChild(frag);

    if (prevVal && sel.querySelector(`option[value="${prevVal}"]`)) {
      sel.value = prevVal;
    } else if (autoSelectFirst && matching[0]) {
      sel.value = String(matching[0].originalIdx);
    }
  }

  if (safeKind === 'adv' && typeof window.updateAdvPreview === 'function') window.updateAdvPreview();
  if (safeKind === 'disadv' && typeof window.updateDisadvPreview === 'function') window.updateDisadvPreview();
}
window.filterPerksCatalog = filterPerksCatalog;

function updateTraitXpHints() {
  const advList = window.advantagesList || [];
  const hasBlessedElem = (ringKey) => advList.some(a =>
    foldForgeSearch(a.name).includes('benediction elementaire') && (a.chosenElement || 'earth').toLowerCase() === ringKey
  );
  const hasEnlightened = advList.some(a => a.impact === 'enlightened' || foldForgeSearch(a.name).includes('illumine'));

  const traitDefs = [
    { id: 'trait-stamina', ring: 'earth' },
    { id: 'trait-willpower', ring: 'earth' },
    { id: 'trait-strength', ring: 'water' },
    { id: 'trait-perception', ring: 'water' },
    { id: 'trait-reflexes', ring: 'air' },
    { id: 'trait-awareness', ring: 'air' },
    { id: 'trait-agility', ring: 'fire' },
    { id: 'trait-intelligence', ring: 'fire' }
  ];

  traitDefs.forEach(({ id, ring }) => {
    const val = parseInt(document.getElementById(id)?.value, 10) || 2;
    const hintEl = document.querySelector(`[data-nextxp="${id}"]`);
    if (!hintEl) return;
    if (val >= 6) {
      hintEl.textContent = '(Max 6)';
    } else {
      const nextCost = Math.max(1, ((val + 1) * 4) - (hasBlessedElem(ring) ? 1 : 0));
      hintEl.textContent = `(+1:${nextCost} XP)`;
    }
  });

  const voidVal = parseInt(document.getElementById('trait-void')?.value, 10) || 2;
  const voidHint = document.querySelector('[data-nextxp="trait-void"]');
  if (voidHint) {
    if (voidVal >= 6) {
      voidHint.textContent = '(Max 6)';
    } else {
      const nextVoidCost = Math.max(1, ((voidVal + 1) * 6) - (hasEnlightened ? 2 : 0));
      voidHint.textContent = `(+1:${nextVoidCost} XP)`;
    }
  }
}

function updateArmorWeaponSummary() {
  const box = document.getElementById('gear-weapon-summary');
  if (!box || typeof window.getEquipment !== 'function') return;
  const eq = window.getEquipment();
  const armorVal = document.getElementById('pc-armor')?.value || '0';
  const w1Name = document.getElementById('pc-weapon-1')?.value || 'Katana';
  const w2Name = document.getElementById('pc-weapon-2')?.value || 'Aucune';

  const armorObj = (eq.armures || []).find(a => String(a.tnBonus) === String(armorVal)) || { name: 'Vêtements simples', tnBonus: 0, reduction: 0, note: 'Aucun malus de mouvement' };
  const w1Obj = (eq.armes || []).find(w => w.name === w1Name) || { name: w1Name, vd: '—', skill: '—', type: '—' };
  const w2Obj = w2Name !== 'Aucune' ? ((eq.armes || []).find(w => w.name === w2Name) || { name: w2Name, vd: '—', skill: '—', type: '—' }) : null;

  box.innerHTML = `
    <div class="p-2.5 rounded-lg bg-black/50 border border-stone-800 space-y-0.5">
      <div class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">🛡️ Armure équipée</div>
      <div class="font-bold text-amber-200">${armorObj.name}</div>
      <div class="text-stone-400">Bonus ND : <b>+${armorObj.tnBonus || 0}</b> • Réduction : <b>${armorObj.reduction || 0}</b></div>
    </div>
    <div class="p-2.5 rounded-lg bg-black/50 border border-stone-800 space-y-0.5">
      <div class="text-[10px] text-amber-400 font-bold uppercase tracking-wider">⚔️ Arme Principale</div>
      <div class="font-bold text-amber-200">${w1Obj.name}</div>
      <div class="text-stone-400">VD : <b>${w1Obj.vd || '—'}</b> • Comp. : <b>${w1Obj.skill || '—'}</b></div>
    </div>
    <div class="p-2.5 rounded-lg bg-black/50 border border-stone-800 space-y-0.5">
      <div class="text-[10px] text-stone-400 font-bold uppercase tracking-wider">🏹 Arme Secondaire</div>
      <div class="font-bold text-stone-200">${w2Obj ? w2Obj.name : 'Aucune'}</div>
      <div class="text-stone-400">${w2Obj ? `VD : <b>${w2Obj.vd || '—'}</b> • Comp. : <b>${w2Obj.skill || '—'}</b>` : 'Emplacement libre'}</div>
    </div>
  `;
}

function updateTwentyQuestionsProgress() {
  let filled = 0;
  let total = 0;
  TWENTY_QUESTIONS_SECTIONS.forEach((sec, idx) => {
    let secFilled = 0;
    sec.items.forEach(item => {
      total++;
      const val = (document.getElementById(`q20-${item.id}`)?.value || '').trim();
      if (val.length > 0) {
        filled++;
        secFilled++;
      }
    });
    const chapBadge = document.getElementById(`q20-chap-count-${idx}`);
    if (chapBadge) chapBadge.textContent = `${secFilled}/${sec.items.length}`;
  });
  const badge = document.getElementById('q20-progress-badge');
  if (badge) badge.textContent = `${filled} / ${total}`;
  const stepGearPill = document.getElementById('step-pill-gear');
  if (stepGearPill) stepGearPill.textContent = `${filled}/${total}`;
  return { filled, total };
}
window.updateTwentyQuestionsProgress = updateTwentyQuestionsProgress;

function clearTwentyQuestions() {
  for (let i = 1; i <= 20; i++) {
    const el = document.getElementById(`q20-${i}`);
    if (el) el.value = '';
  }
  updateTwentyQuestionsProgress();
  toggleAllTwentyQuestionsChapters(true);
  showForgeToast('Les 20 Questions ont été vidées pour votre nouveau personnage.', 'info');
}
window.clearTwentyQuestions = clearTwentyQuestions;

function restoreExampleTwentyQuestions() {
  TWENTY_QUESTIONS_SECTIONS.forEach(sec => {
    sec.items.forEach(item => {
      const el = document.getElementById(`q20-${item.id}`);
      if (el) el.value = item.val;
    });
  });
  updateTwentyQuestionsProgress();
  showForgeToast('Exemple Hiruma restauré dans les 20 Questions.', 'info');
}
window.restoreExampleTwentyQuestions = restoreExampleTwentyQuestions;

function toggleAllTwentyQuestionsChapters(open) {
  document.querySelectorAll('#twenty-questions-mount details.q20-chapter').forEach(d => {
    d.open = !!open;
  });
}
window.toggleAllTwentyQuestionsChapters = toggleAllTwentyQuestionsChapters;

function updateForgeUXDashboard(detail) {
  updateTraitXpHints();
  updateArmorWeaponSummary();
  updateTwentyQuestionsProgress();

  // XP Progress bar & Breakdown strip
  const charState = window.currentChar || {};
  const breakdown = detail?.xpBreakdown || charState.xpBreakdown || {};
  const totalXP = detail?.totalXP ?? (parseInt(document.getElementById('xp-total')?.textContent, 10) || 40);
  const remXP = detail?.remainingXP ?? (parseInt(document.getElementById('xp-remaining')?.textContent, 10) || 0);
  const spentXP = detail?.xpSpent ?? Math.max(0, totalXP - remXP);

  const bar = document.getElementById('xp-progress-bar');
  const statusLbl = document.getElementById('xp-status-label');
  if (bar && statusLbl) {
    const pct = totalXP > 0 ? Math.min(100, Math.round((spentXP / totalXP) * 100)) : 100;
    bar.style.width = `${Math.max(4, pct)}%`;
    if (remXP < 0) {
      bar.className = 'h-full bg-red-500 transition-all duration-300';
      statusLbl.textContent = `Dépassement (${remXP} XP)`;
      statusLbl.className = 'font-bold text-red-400';
    } else if (remXP === 0) {
      bar.className = 'h-full bg-emerald-400 transition-all duration-300';
      statusLbl.textContent = '100% optimisé';
      statusLbl.className = 'font-bold text-emerald-300';
    } else {
      bar.className = 'h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300';
      statusLbl.textContent = `${pct}% utilisé`;
      statusLbl.className = 'font-bold text-emerald-400';
    }
  }

  const strip = document.getElementById('xp-breakdown-strip');
  if (strip) {
    const tXp = breakdown.traits ?? 0;
    const sXp = breakdown.skills ?? 0;
    const aXp = breakdown.advantages ?? 0;
    const artXp = breakdown.arts ?? 0;
    strip.textContent = `Traits ${tXp} • Comp ${sXp} • Av ${aXp}${artXp > 0 ? ` • Arts ${artXp}` : ''}`;
  }

  // Disadvantage progress bar (0..15 XP)
  const disadvGain = parseInt(document.getElementById('disadv-gain-total')?.textContent, 10) || 0;
  const disBar = document.getElementById('disadv-progress-bar');
  if (disBar) {
    disBar.style.width = `${Math.min(100, Math.round((disadvGain / 15) * 100))}%`;
  }

  // Skills cards live pools, next-rank XP & pending school choice banner
  const skills = window.currentSkills || [];
  const pendingChoices = skills.filter(sk => sk.isChoice && !sk.chosen).length;
  const alertEl = document.getElementById('skills-choice-alert');
  const alertCount = document.getElementById('skills-choice-alert-count');
  if (alertEl) {
    alertEl.classList.toggle('hidden', pendingChoices === 0);
    if (alertCount) alertCount.textContent = pendingChoices;
  }

  skills.forEach((sk, idx) => {
    if (sk.isChoice && !sk.chosen) return;
    const card = document.querySelector(`#skills-list [data-skill-card="${idx}"]`);
    const poolBtn = document.querySelector(`#skills-list [data-skill-pool="${idx}"]`);
    const nextEl = document.querySelector(`#skills-list [data-skill-nextxp="${idx}"]`);
    const traitId = resolveTraitIdFromLabel(card?.dataset.skillTrait || 'Agilité');
    const traitVal = parseInt(document.getElementById(traitId)?.value, 10) || 2;
    const rankVal = parseInt(sk.rank, 10) || 0;
    if (poolBtn) poolBtn.textContent = `🎲 ${rankVal + traitVal}g${traitVal}`;
    if (nextEl) nextEl.textContent = rankVal < 10 ? `+1 = ${rankVal + 1} XP` : 'Max';
  });

  // Stepper live pills
  const clanSel = document.getElementById('sel-clan');
  const clanText = clanSel?.options[clanSel.selectedIndex]?.text || 'Clan';
  const idPill = document.getElementById('step-pill-identity');
  if (idPill) idPill.textContent = clanText.replace(/^Clan du |^Clan de la |^Clan de l'|^Clan des /i, '').split('(')[0].trim();

  const ringsPill = document.getElementById('step-pill-rings');
  if (ringsPill) ringsPill.textContent = `ND ${document.getElementById('stat-armor-tn')?.textContent || '20'}`;

  const skPill = document.getElementById('step-pill-skills');
  if (skPill) {
    const ownedCount = skills.filter(sk => !sk.isChoice || sk.chosen).length;
    skPill.textContent = pendingChoices > 0 ? `${ownedCount} • ${pendingChoices} !` : `${ownedCount}`;
  }

  const perksPill = document.getElementById('step-pill-perks');
  if (perksPill) {
    const aCount = (window.advantagesList || []).length;
    const dCount = (window.disadvantagesList || []).length;
    perksPill.textContent = `${aCount} / ${dCount}`;
  }

  const mysticPill = document.getElementById('step-pill-mystic');
  if (mysticPill) {
    const spCount = (window.charSpellsList || []).length;
    const ktCount = (window.charKatasList || []).length;
    const ttCount = (window.charTattoosList || []).length;
    const sumArts = spCount + ktCount + ttCount;
    if (sumArts > 0) {
      mysticPill.textContent = `${sumArts}`;
    } else {
      const perms = getActiveForgePermissions();
      const parts = [];
      if (perms.canUseKatas) parts.push('Katas');
      if (perms.canCastSpells) parts.push('Sorts');
      else if (perms.canUseKihos) parts.push('Kihos');
      if (perms.canUseTattoos) parts.push('Tatouages');
      mysticPill.textContent = parts.length > 0 ? parts.join('+') : 'Cour';
    }
  }
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
  const stepParam = params.get("step");

  const initialStep = stepParam || (() => {
    try { return sessionStorage.getItem('l5r_forge_step'); } catch (e) { return null; }
  })() || 'identity';
  setForgeStep(initialStep, true);

  if (charParam) {
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(charParam)));
      applyFullCharacterState(decoded);
      updateArchetypePanelsWithTattoos(true);
      filterPerksCatalog('adv', false);
      filterPerksCatalog('disadv', false);
      updateForgeUXDashboard();
      return;
    } catch (e) {}
  }

  if (loadIdParam) {
    loadFromDojo(loadIdParam);
    updateArchetypePanelsWithTattoos(true);
    filterPerksCatalog('adv', false);
    filterPerksCatalog('disadv', false);
    updateForgeUXDashboard();
    return;
  }

  if (clanParam && document.querySelector(`#sel-clan option[value="${clanParam}"]`)) {
    document.getElementById("sel-clan").value = clanParam;
    if (typeof onClanChange === 'function') onClanChange();
  }

  updateArchetypePanelsWithTattoos(true);
  filterPerksCatalog('adv', false);
  filterPerksCatalog('disadv', false);
  updateForgeUXDashboard();
}

window.addEventListener("l5r-forge-ready", initForgeUIWhenReady);

window.addEventListener("l5r-forge-selection-changed", () => {
  handleFamilyOrSchoolChange();
  updateForgeUXDashboard();
});

window.addEventListener("l5r-forge-catalogs-updated", () => {
  filterPerksCatalog('adv', false);
  filterPerksCatalog('disadv', false);
});

window.addEventListener("l5r-forge-updated", (e) => {
  updateArchetypePanelsWithTattoos(false, true);
  updateForgeUXDashboard(e?.detail);
});

window.addEventListener("keydown", (e) => {
  if (!e.altKey || e.ctrlKey || e.metaKey) return;
  const map = { '1': 'identity', '2': 'rings', '3': 'skills', '4': 'perks', '5': 'mystic', '6': 'gear', '0': 'all' };
  if (map[e.key]) {
    e.preventDefault();
    setForgeStep(map[e.key]);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  injectForgeTemplates();

  if (window.__l5rForgeReady) {
    initForgeUIWhenReady();
  }
});
