/**
 * js/ecoles.js — Explorateur, Tableau Triable & Comparateur d'Écoles L5R 4e Édition
 * Filtre strictement les écoles gmOnly tant que l'accès MJ n'est pas déverrouillé.
 */
(function (globalScope) {
  'use strict';

  const CLAN_UI_META = {
    crabe: { kanji: '蟹', short: 'Crabe', badge: 'bg-blue-950/80 text-blue-300 border-blue-700/50', page: 'clans/crabe.html' },
    grue: { kanji: '鶴', short: 'Grue', badge: 'bg-sky-950/80 text-sky-200 border-sky-600/50', page: 'clans/grue.html' },
    dragon: { kanji: '龍', short: 'Dragon', badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50', page: 'clans/dragon.html' },
    lion: { kanji: '獅', short: 'Lion', badge: 'bg-amber-950/80 text-amber-300 border-amber-600/50', page: 'clans/lion.html' },
    mante: { kanji: '螳', short: 'Mante', badge: 'bg-teal-950/80 text-teal-300 border-teal-600/50', page: 'clans/mante.html' },
    phenix: { kanji: '鳳', short: 'Phénix', badge: 'bg-orange-950/80 text-orange-300 border-orange-600/50', page: 'clans/phenix.html' },
    scorpion: { kanji: '蠍', short: 'Scorpion', badge: 'bg-red-950/80 text-red-400 border-red-700/50', page: 'clans/scorpion.html' },
    licorne: { kanji: '麒', short: 'Licorne', badge: 'bg-purple-950/80 text-purple-300 border-purple-600/50', page: 'clans/licorne.html' },
    imperial: { kanji: '帝', short: 'Impérial', badge: 'bg-yellow-950/80 text-yellow-300 border-yellow-600/50', page: null },
    mineurs: { kanji: '藩', short: 'Clans Mineurs', badge: 'bg-stone-900/90 text-stone-200 border-stone-600/60', page: null },
    confrerie: { kanji: '僧', short: 'Confrérie', badge: 'bg-emerald-950/70 text-teal-200 border-teal-700/50', page: null },
    ronin: { kanji: '浪', short: 'Rônin', badge: 'bg-stone-900/80 text-amber-200 border-stone-600/50', page: null },
    araignee: { kanji: '蜘', short: 'Araignée', badge: 'bg-red-950/90 text-red-300 border-red-600/60', page: null }
  };

  const TYPE_UI_META = {
    Bushi: { icon: '⚔️', badge: 'bg-red-950/60 text-red-200 border-red-700/40' },
    Shugenja: { icon: '🌀', badge: 'bg-sky-950/60 text-sky-200 border-sky-700/40' },
    Courtisan: { icon: '🌸', badge: 'bg-amber-950/60 text-amber-200 border-amber-700/40' },
    Moine: { icon: '🥋', badge: 'bg-emerald-950/60 text-emerald-200 border-emerald-700/40' },
    Artisan: { icon: '🎨', badge: 'bg-purple-950/60 text-purple-200 border-purple-700/40' },
    Ninja: { icon: '🥷', badge: 'bg-stone-900 text-stone-200 border-stone-600' }
  };

  const PLAYSTYLE_PRESETS = {
    all: { label: 'Toutes les écoles', apply: () => ({}) },
    duelist: {
      label: 'Duelliste & Lame',
      apply: () => ({ type: 'Bushi', query: 'Iaijutsu' })
    },
    bulwark: {
      label: 'Tank & Outremonde',
      apply: () => ({ type: 'Bushi', query: 'Réduction' })
    },
    archer: {
      label: 'Archer & Tireur',
      apply: () => ({ skill: 'Kyujutsu' })
    },
    rider: {
      label: 'Cavalier & Éclaireur',
      apply: () => ({ skill: 'Équitation' })
    },
    courtier: {
      label: 'Diplomate & Cour',
      apply: () => ({ type: 'Courtisan' })
    },
    investigator: {
      label: 'Enquêteur & Magistrat',
      apply: () => ({ skill: 'Enquête' })
    },
    shugenja: {
      label: 'Prêtre Shugenja',
      apply: () => ({ type: 'Shugenja' })
    },
    monk: {
      label: 'Moine & Tatouages',
      apply: () => ({ type: 'Moine' })
    }
  };

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function isGmUnlocked() {
    if (typeof globalScope.isGmSecretsUnlocked === 'function') {
      return globalScope.isGmSecretsUnlocked();
    }
    if (typeof sessionStorage !== 'undefined') {
      try {
        return sessionStorage.getItem('l5r_maho_unlocked') === 'true';
      } catch (_) {
        return false;
      }
    }
    return false;
  }

  function isValidGmPassword(pwd) {
    if (typeof globalScope.isValidGmSecretPassword === 'function') {
      return globalScope.isValidGmSecretPassword(pwd);
    }
    const p = String(pwd || '').trim().toLowerCase();
    return ['iuchiban', 'maho', 'jigoku', 'outremonde', 'araignee', 'araignée', 'kolat', 'daigotsu'].includes(p);
  }

  function extractSchoolSource(schoolName) {
    const raw = String(schoolName || '');
    const m = raw.match(/\(([^)]*(?:Core|Great Clans|Emerald|IH\d?|Imperial|Book|Strongholds|Enemies|Clan du [^)]+)[^)]*)\)/i);
    if (m) return m[1];
    return 'Livre de Base';
  }

  function extractSynergyTags(school) {
    const allTechText = normalizeText((school.techniques || []).map((t) => `${t.name} ${t.effect}`).join(' '));
    const tags = [];
    if (allTechText.includes('action simple') || allTechText.includes('simple action')) tags.push('⚡ Action Simple');
    if (allTechText.includes('vide')) tags.push('空 Synergie Vide');
    if (allTechText.includes('reduction')) tags.push('🛡️ Réduction');
    if (allTechText.includes('iaijutsu') || allTechText.includes('duel')) tags.push('⚔️ Duel');
    if (allTechText.includes('affinite')) tags.push('🌀 Magie');
    if (allTechText.includes('tatouage')) tags.push('墨 Tatouages');
    if (allTechText.includes('kiho')) tags.push('🥋 Kihos');
    return tags.slice(0, 4);
  }

  function buildSchoolsCatalogEntries(clansData, includeSecrets = false) {
    const entries = [];
    const data = clansData || {};
    Object.keys(data).forEach((clanKey) => {
      const clan = data[clanKey];
      if (!clan || (!includeSecrets && clan.gmOnly === true)) return;
      const clanUi = CLAN_UI_META[clanKey] || { kanji: '侍', short: clan.name, badge: 'bg-stone-900 text-stone-200 border-stone-700', page: null };
      const famMap = {};
      (clan.families || []).forEach((f) => {
        if (!includeSecrets && f.gmOnly === true) return;
        famMap[f.name] = f;
      });

      (clan.schools || []).forEach((sch) => {
        if (!includeSecrets && sch.gmOnly === true) return;
        const techniques = sch.techniques || (sch.technique ? [sch.technique] : []);
        const rank1 = techniques[0] || { rank: 1, name: '', effect: '' };
        const famMeta = famMap[sch.family] || null;
        const source = extractSchoolSource(sch.name);
        const cleanName = String(sch.name || '').replace(/\s*\([^)]*(?:Core|Great Clans|Emerald|IH\d?|Imperial|Book|Strongholds|Enemies)[^)]*\)/i, '').trim();
        const skillsList = Array.isArray(sch.skills) ? sch.skills : [];
        const searchBlob = normalizeText([
          sch.name,
          cleanName,
          clan.name,
          clanUi.short,
          sch.family,
          sch.type,
          sch.trait,
          sch.bonus,
          skillsList.join(' '),
          sch.outfit,
          source,
          techniques.map((t) => `${t.name} ${t.effect}`).join(' ')
        ].join(' '));

        entries.push({
          id: sch.id,
          clanKey,
          clanName: clan.name,
          clanShort: clanUi.short,
          clanKanji: clanUi.kanji,
          clanBadge: clanUi.badge,
          clanPage: clanUi.page,
          name: cleanName || sch.name,
          fullName: sch.name,
          source,
          family: sch.family || '—',
          familyBonus: famMeta ? famMeta.bonus : '',
          type: sch.type || 'Bushi',
          trait: sch.trait || 'Aucun',
          bonus: sch.bonus || 'Aucun',
          honor: Number(sch.honor) || 0,
          skills: skillsList,
          outfit: sch.outfit || '',
          techniques,
          rank1Name: rank1.name || '',
          rank1Effect: rank1.effect || '',
          synergies: extractSynergyTags({ techniques }),
          gmOnly: Boolean(clan.gmOnly || sch.gmOnly),
          searchBlob
        });
      });
    });
    return entries;
  }

  function filterSchoolsEntries(entries, filters = {}) {
    const clan = filters.clan || 'all';
    const type = filters.type || 'all';
    const trait = filters.trait || 'all';
    const skill = normalizeText(filters.skill || 'all');
    const minHonor = Number(filters.minHonor) || 0;
    const query = normalizeText(filters.query || '');

    return (entries || []).filter((e) => {
      if (clan !== 'all' && e.clanKey !== clan) return false;
      if (type !== 'all' && e.type !== type) return false;
      if (trait !== 'all' && e.trait !== trait) return false;
      if (minHonor > 0 && e.honor < minHonor) return false;
      if (skill !== 'all' && skill !== '') {
        const hasSkill = e.skills.some((s) => normalizeText(s).includes(skill));
        if (!hasSkill) return false;
      }
      if (query && !e.searchBlob.includes(query)) return false;
      return true;
    });
  }

  function sortSchoolsEntries(entries, sortBy = 'clan', sortDir = 'asc') {
    const dir = sortDir === 'desc' ? -1 : 1;
    return [...(entries || [])].sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case 'name':
          cmp = a.name.localeCompare(b.name, 'fr');
          break;
        case 'clan':
          cmp = a.clanShort.localeCompare(b.clanShort, 'fr') || a.type.localeCompare(b.type, 'fr') || a.name.localeCompare(b.name, 'fr');
          break;
        case 'type':
          cmp = a.type.localeCompare(b.type, 'fr') || a.clanShort.localeCompare(b.clanShort, 'fr');
          break;
        case 'trait':
          cmp = a.trait.localeCompare(b.trait, 'fr') || a.name.localeCompare(b.name, 'fr');
          break;
        case 'honor':
          cmp = (a.honor - b.honor) || a.name.localeCompare(b.name, 'fr');
          break;
        case 'skills':
          cmp = a.skills.join(',').localeCompare(b.skills.join(','), 'fr');
          break;
        case 'rank1':
          cmp = a.rank1Name.localeCompare(b.rank1Name, 'fr');
          break;
        default:
          cmp = a.name.localeCompare(b.name, 'fr');
      }
      return cmp * dir;
    });
  }

  function initSchoolsExplorer() {
    if (typeof document === 'undefined') return;
    const tableBody = document.getElementById('schools-table-body');
    const cardsGrid = document.getElementById('schools-cards-grid');
    if (!tableBody || !cardsGrid) return;

    const state = {
      preset: 'all',
      clan: 'all',
      type: 'all',
      trait: 'all',
      skill: 'all',
      minHonor: 0,
      query: '',
      sortBy: 'clan',
      sortDir: 'asc',
      viewMode: 'table',
      compareIds: []
    };

    const searchInput = document.getElementById('filter-school-search');
    const clanSel = document.getElementById('filter-school-clan');
    const typeSel = document.getElementById('filter-school-type');
    const traitSel = document.getElementById('filter-school-trait');
    const skillSel = document.getElementById('filter-school-skill');
    const honorSel = document.getElementById('filter-school-honor');
    const countBadge = document.getElementById('schools-visible-count');
    const emptyBox = document.getElementById('schools-empty-state');
    const tableWrap = document.getElementById('schools-table-wrap');
    const viewTableBtn = document.getElementById('btn-view-table');
    const viewCardsBtn = document.getElementById('btn-view-cards');
    const resetBtn = document.getElementById('btn-reset-school-filters');
    const presetsBar = document.getElementById('schools-presets-bar');

    const compareDock = document.getElementById('schools-compare-dock');
    const compareDockLabel = document.getElementById('compare-dock-label');
    const compareOpenBtn = document.getElementById('btn-open-compare');
    const compareClearBtn = document.getElementById('btn-clear-compare');

    const detailModal = document.getElementById('school-detail-modal');
    const detailModalBody = document.getElementById('school-detail-modal-body');
    const compareModal = document.getElementById('school-compare-modal');
    const compareModalBody = document.getElementById('school-compare-modal-body');

    function getAllVisibleCatalog() {
      return buildSchoolsCatalogEntries(globalScope.CLANS_DATA || {}, isGmUnlocked());
    }

    function populateFilterDropdowns() {
      const catalog = getAllVisibleCatalog();

      if (clanSel) {
        const cur = clanSel.value || 'all';
        const seenClans = new Map();
        catalog.forEach((s) => {
          if (!seenClans.has(s.clanKey)) seenClans.set(s.clanKey, s.clanShort);
        });
        clanSel.innerHTML = `<option value="all">Tous les Clans &amp; Factions (${seenClans.size})</option>` +
          Array.from(seenClans.entries())
            .sort((a, b) => a[1].localeCompare(b[1], 'fr'))
            .map(([k, lbl]) => `<option value="${k}">${lbl}</option>`)
            .join('');
        clanSel.value = seenClans.has(cur) ? cur : 'all';
        state.clan = clanSel.value;
      }

      if (traitSel) {
        const cur = traitSel.value || 'all';
        const traits = Array.from(new Set(catalog.map((s) => s.trait).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'fr'));
        traitSel.innerHTML = '<option value="all">Tous les Traits (+1)</option>' +
          traits.map((t) => `<option value="${t}">+1 ${t}</option>`).join('');
        traitSel.value = traits.includes(cur) ? cur : 'all';
        state.trait = traitSel.value;
      }

      if (skillSel) {
        const cur = skillSel.value || 'all';
        const coreSkills = [
          'Art de la Magie', 'Armes d’Hast', 'Armes Lourdes', 'Athlétisme', 'Calligraphie',
          'Chasse', 'Commerce', 'Connaissance', 'Courtisan', 'Couteaux', 'Défense',
          'Discrétion', 'Enquête', 'Équitation', 'Étiquette', 'Iaijutsu', 'Intimidation',
          'Jiujutsu', 'Kenjutsu', 'Kyujutsu', 'Lances', 'Méditation', 'Sincérité'
        ];
        skillSel.innerHTML = '<option value="all">Toutes compétences d\'école</option>' +
          coreSkills.map((sk) => `<option value="${sk}">${sk}</option>`).join('');
        skillSel.value = coreSkills.includes(cur) ? cur : 'all';
        state.skill = skillSel.value;
      }
    }

    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function getHonorBadgeClass(honor) {
      if (honor >= 5.0) return 'bg-amber-950/80 text-amber-200 border-amber-500/60';
      if (honor >= 3.5) return 'bg-emerald-950/60 text-emerald-300 border-emerald-700/40';
      if (honor >= 2.0) return 'bg-stone-900 text-stone-300 border-stone-700';
      return 'bg-red-950/60 text-red-300 border-red-700/50';
    }

    function updateSortHeaders() {
      document.querySelectorAll('th[data-sort-col]').forEach((th) => {
        const col = th.dataset.sortCol;
        const indicator = th.querySelector('.sort-arrow');
        const active = col === state.sortBy;
        th.classList.toggle('text-amber-300', active);
        if (indicator) {
          indicator.textContent = active ? (state.sortDir === 'asc' ? '▲' : '▼') : '⇅';
          indicator.classList.toggle('opacity-100', active);
          indicator.classList.toggle('opacity-35', !active);
        }
      });
    }

    function updateCompareDock() {
      if (!compareDock) return;
      const count = state.compareIds.length;
      compareDock.classList.toggle('hidden', count === 0);
      if (compareDockLabel) {
        const catalog = getAllVisibleCatalog();
        const names = state.compareIds
          .map((id) => catalog.find((s) => s.id === id)?.name)
          .filter(Boolean)
          .join(' • ');
        compareDockLabel.textContent = `${count} / 3 sélectionnée(s)${names ? ' — ' + names : ''}`;
      }
      if (compareOpenBtn) {
        compareOpenBtn.disabled = count < 2;
        compareOpenBtn.classList.toggle('opacity-50', count < 2);
      }
    }

    function toggleCompare(schoolId) {
      const idx = state.compareIds.indexOf(schoolId);
      if (idx !== -1) {
        state.compareIds.splice(idx, 1);
      } else {
        if (state.compareIds.length >= 3) state.compareIds.shift();
        state.compareIds.push(schoolId);
      }
      updateCompareDock();
      render();
    }

    function openDetailModal(schoolId) {
      if (!detailModal || !detailModalBody) return;
      const s = getAllVisibleCatalog().find((x) => x.id === schoolId);
      if (!s) return;
      const tMeta = TYPE_UI_META[s.type] || TYPE_UI_META.Bushi;
      const forgeUrl = `createcharacter.html?clan=${encodeURIComponent(s.clanKey)}&school=${encodeURIComponent(s.id)}`;

      const techsHtml = s.techniques
        .map(
          (t) => `
          <div class="p-3 rounded-lg bg-black/50 border border-stone-800 space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-600 text-black font-extrabold text-[10px] uppercase">Rang ${t.rank}</span>
              <span class="font-bold text-amber-200 text-xs">${escapeHtml(t.name)}</span>
            </div>
            <p class="text-xs text-stone-300 leading-relaxed">${escapeHtml(t.effect)}</p>
          </div>`
        )
        .join('');

      detailModalBody.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-3">
            <div class="flex items-center gap-3">
              <span class="w-11 h-11 rounded-xl border flex items-center justify-center font-serif font-bold text-xl ${s.clanBadge}">${s.clanKanji}</span>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="font-imperial font-bold text-lg text-amber-200">${escapeHtml(s.name)}</h2>
                  ${s.gmOnly ? '<span class="px-2 py-0.5 rounded bg-red-950 border border-red-600/60 text-red-200 text-[10px] font-bold">🕷️ Secret MJ</span>' : ''}
                </div>
                <div class="text-xs text-stone-400">${escapeHtml(s.clanName)} • Famille <b>${escapeHtml(s.family)}</b> ${s.familyBonus ? `(${escapeHtml(s.familyBonus)})` : ''} • <span class="text-amber-300/80">${escapeHtml(s.source)}</span></div>
              </div>
            </div>
            <a href="${forgeUrl}" class="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-black font-extrabold text-xs font-imperial tracking-wider shadow transition shrink-0">
              ⚒️ Forger ce Samouraï →
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="p-2.5 rounded-lg bg-black/45 border border-stone-800">
              <div class="text-[10px] text-stone-500 uppercase">Archétype</div>
              <div class="font-bold text-stone-200 mt-0.5">${tMeta.icon} ${escapeHtml(s.type)}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-black/45 border border-stone-800">
              <div class="text-[10px] text-stone-500 uppercase">Bonus d'École</div>
              <div class="font-bold text-amber-300 mt-0.5">${escapeHtml(s.bonus)}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-black/45 border border-stone-800">
              <div class="text-[10px] text-stone-500 uppercase">Honneur Départ</div>
              <div class="font-bold text-emerald-300 mt-0.5">${s.honor.toFixed(1)}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-black/45 border border-stone-800">
              <div class="text-[10px] text-stone-500 uppercase">Atouts Clés</div>
              <div class="font-bold text-stone-300 mt-0.5 truncate">${s.synergies.length ? s.synergies[0] : s.type}</div>
            </div>
          </div>

          <div class="p-3 rounded-lg bg-black/40 border border-stone-800 space-y-1.5 text-xs">
            <div><b class="text-amber-300">Compétences d'École :</b> <span class="text-stone-300">${s.skills.map(escapeHtml).join(', ')}</span></div>
            <div><b class="text-amber-300">Équipement de départ :</b> <span class="text-stone-400">${escapeHtml(s.outfit)}</span></div>
          </div>

          <div class="space-y-2">
            <div class="text-[11px] font-imperial font-bold uppercase tracking-wider text-amber-300">Progression des Techniques (Rangs 1 à ${s.techniques.length})</div>
            ${techsHtml}
          </div>
        </div>
      `;
      detailModal.classList.remove('hidden');
    }

    function openCompareModal() {
      if (!compareModal || !compareModalBody) return;
      const catalog = getAllVisibleCatalog();
      const selected = state.compareIds.map((id) => catalog.find((s) => s.id === id)).filter(Boolean);
      if (selected.length < 2) return;

      // Shared skills across at least 2 selected schools
      const skCounts = new Map();
      selected.forEach((s) => {
        s.skills.forEach((sk) => {
          const root = normalizeText(sk.split('(')[0]);
          skCounts.set(root, (skCounts.get(root) || 0) + 1);
        });
      });

      const colsHtml = selected
        .map((s) => {
          const tMeta = TYPE_UI_META[s.type] || TYPE_UI_META.Bushi;
          const forgeUrl = `createcharacter.html?clan=${encodeURIComponent(s.clanKey)}&school=${encodeURIComponent(s.id)}`;
          const skillsBadges = s.skills
            .map((sk) => {
              const root = normalizeText(sk.split('(')[0]);
              const shared = (skCounts.get(root) || 0) > 1;
              return `<span class="px-1.5 py-0.5 rounded border text-[10px] ${
                shared
                  ? 'bg-amber-950/70 border-amber-500/60 text-amber-200 font-bold'
                  : 'bg-black/50 border-stone-800 text-stone-300'
              }">${escapeHtml(sk)}</span>`;
            })
            .join('');

          const ranksRows = [1, 2, 3, 4, 5]
            .map((rk) => {
              const tech = s.techniques.find((t) => Number(t.rank) === rk);
              if (!tech) {
                return `<div class="p-2 rounded bg-black/25 border border-stone-900 text-[10px] text-stone-600 italic">Rang ${rk} : libre / voie Shugenja</div>`;
              }
              return `
                <div class="p-2 rounded bg-black/45 border border-stone-800 space-y-0.5">
                  <div class="text-[10px] font-bold text-amber-300">R${rk} — ${escapeHtml(tech.name)}</div>
                  <p class="text-[10px] text-stone-300 leading-snug">${escapeHtml(tech.effect)}</p>
                </div>`;
            })
            .join('');

          return `
            <div class="p-3.5 rounded-xl bg-black/50 border border-amber-500/35 flex flex-col justify-between gap-3">
              <div class="space-y-3">
                <div class="flex items-start justify-between gap-2 border-b border-stone-800 pb-2">
                  <div>
                    <div class="text-xs font-imperial font-bold text-amber-200">${escapeHtml(s.name)}</div>
                    <div class="text-[10px] text-stone-400">${escapeHtml(s.clanShort)} • ${escapeHtml(s.family)}</div>
                  </div>
                  <span class="px-1.5 py-0.5 rounded border text-[10px] ${tMeta.badge}">${tMeta.icon} ${escapeHtml(s.type)}</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div class="p-1.5 rounded bg-black/40 border border-stone-800"><b>Bonus :</b> <span class="text-amber-300">${escapeHtml(s.bonus)}</span></div>
                  <div class="p-1.5 rounded bg-black/40 border border-stone-800"><b>Honneur :</b> <span class="text-emerald-300">${s.honor.toFixed(1)}</span></div>
                </div>
                <div>
                  <div class="text-[10px] text-stone-400 uppercase font-bold mb-1">Compétences <span class="text-amber-400 font-normal">(or = communes)</span></div>
                  <div class="flex flex-wrap gap-1">${skillsBadges}</div>
                </div>
                <div class="space-y-1.5">
                  <div class="text-[10px] text-stone-400 uppercase font-bold">Techniques Rangs 1 à 5</div>
                  ${ranksRows}
                </div>
              </div>
              <a href="${forgeUrl}" class="block w-full text-center py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs font-imperial transition">
                ⚒️ Choisir cette école
              </a>
            </div>
          `;
        })
        .join('');

      compareModalBody.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-${selected.length} gap-3">${colsHtml}</div>`;
      compareModal.classList.remove('hidden');
    }

    function render() {
      const catalog = getAllVisibleCatalog();
      const filtered = filterSchoolsEntries(catalog, {
        clan: state.clan,
        type: state.type,
        trait: state.trait,
        skill: state.skill,
        minHonor: state.minHonor,
        query: state.query
      });
      const sorted = sortSchoolsEntries(filtered, state.sortBy, state.sortDir);

      if (countBadge) {
        countBadge.textContent = `${sorted.length} / ${catalog.length} école(s)`;
      }
      updateSortHeaders();

      const isTable = state.viewMode === 'table';
      if (tableWrap) tableWrap.classList.toggle('hidden', !isTable || sorted.length === 0);
      if (cardsGrid) cardsGrid.classList.toggle('hidden', isTable || sorted.length === 0);
      if (emptyBox) emptyBox.classList.toggle('hidden', sorted.length > 0);

      const hlSkill = state.skill !== 'all' ? normalizeText(state.skill) : '';

      if (isTable) {
        tableBody.innerHTML = sorted
          .map((s) => {
            const tMeta = TYPE_UI_META[s.type] || TYPE_UI_META.Bushi;
            const isComp = state.compareIds.includes(s.id);
            const forgeUrl = `createcharacter.html?clan=${encodeURIComponent(s.clanKey)}&school=${encodeURIComponent(s.id)}`;
            const skHtml = s.skills
              .map((sk) => {
                const match = hlSkill && normalizeText(sk).includes(hlSkill);
                return `<span class="inline-block px-1.5 py-0.5 rounded border text-[10px] mr-1 mb-1 ${
                  match ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold' : 'bg-black/40 border-stone-800 text-stone-300'
                }">${escapeHtml(sk)}</span>`;
              })
              .join('');

            return `
              <tr class="border-b border-stone-800/75 hover:bg-amber-950/20 transition align-top">
                <td class="p-3 min-w-[200px]">
                  <div class="font-imperial font-bold text-amber-200 text-xs leading-snug">${escapeHtml(s.name)}</div>
                  <div class="text-[10px] text-stone-400 mt-0.5">Famille <b>${escapeHtml(s.family)}</b> • ${escapeHtml(s.source)}</div>
                  ${s.synergies.length ? `<div class="flex flex-wrap gap-1 mt-1">${s.synergies.map((sg) => `<span class="px-1.5 py-0.5 rounded bg-black/50 border border-stone-800 text-[9px] text-stone-300">${sg}</span>`).join('')}</div>` : ''}
                </td>
                <td class="p-3 whitespace-nowrap">
                  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold ${s.clanBadge}">
                    <span class="font-serif">${s.clanKanji}</span>
                    <span>${escapeHtml(s.clanShort)}</span>
                  </span>
                </td>
                <td class="p-3 whitespace-nowrap">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-bold ${tMeta.badge}">
                    <span>${tMeta.icon}</span>
                    <span>${escapeHtml(s.type)}</span>
                  </span>
                </td>
                <td class="p-3 whitespace-nowrap">
                  <span class="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/40 text-amber-300 font-bold text-[10px]">${escapeHtml(s.bonus)}</span>
                </td>
                <td class="p-3 whitespace-nowrap text-center">
                  <span class="px-2 py-0.5 rounded border font-mono font-bold text-[11px] ${getHonorBadgeClass(s.honor)}">${s.honor.toFixed(1)}</span>
                </td>
                <td class="p-3 min-w-[220px]">
                  <div class="flex flex-wrap">${skHtml}</div>
                </td>
                <td class="p-3 min-w-[240px] text-[11px] text-stone-300 leading-snug">
                  <div class="font-bold text-amber-300">${escapeHtml(s.rank1Name)}</div>
                  <div class="text-stone-400 line-clamp-2 mt-0.5">${escapeHtml(s.rank1Effect)}</div>
                </td>
                <td class="p-3 whitespace-nowrap">
                  <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-1">
                      <button type="button" data-school-detail="${escapeHtml(s.id)}" class="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[10px] font-bold text-amber-200 cursor-pointer" title="Voir tous les rangs 1 à 5">👁️ Rangs</button>
                      <button type="button" data-school-compare="${escapeHtml(s.id)}" class="px-2 py-1 rounded border text-[10px] font-bold cursor-pointer ${
                        isComp ? 'bg-amber-600 text-black border-amber-400' : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-300'
                      }" title="Ajouter au comparateur">⚖️</button>
                    </div>
                    <a href="${forgeUrl}" class="px-2 py-1 rounded bg-amber-600/85 hover:bg-amber-500 text-black text-[10px] font-extrabold text-center transition">⚒️ Forger</a>
                  </div>
                </td>
              </tr>`;
          })
          .join('');
      } else {
        cardsGrid.innerHTML = sorted
          .map((s) => {
            const tMeta = TYPE_UI_META[s.type] || TYPE_UI_META.Bushi;
            const isComp = state.compareIds.includes(s.id);
            const forgeUrl = `createcharacter.html?clan=${encodeURIComponent(s.clanKey)}&school=${encodeURIComponent(s.id)}`;
            return `
              <article class="card-clean rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-amber-500/55 transition">
                <div class="space-y-2.5">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="w-9 h-9 rounded-lg border flex items-center justify-center font-serif font-bold text-base shrink-0 ${s.clanBadge}">${s.clanKanji}</span>
                      <div class="min-w-0">
                        <h3 class="font-imperial font-bold text-sm text-amber-200 leading-tight">${escapeHtml(s.name)}</h3>
                        <div class="text-[10px] text-stone-400 truncate">${escapeHtml(s.clanShort)} • ${escapeHtml(s.family)} • ${escapeHtml(s.source)}</div>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded border text-[10px] font-bold shrink-0 ${tMeta.badge}">${tMeta.icon} ${escapeHtml(s.type)}</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span class="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/40 text-amber-300 font-bold">${escapeHtml(s.bonus)}</span>
                    <span class="px-2 py-0.5 rounded border font-mono font-bold ${getHonorBadgeClass(s.honor)}">Honneur ${s.honor.toFixed(1)}</span>
                    ${s.synergies.map((sg) => `<span class="px-1.5 py-0.5 rounded bg-black/50 border border-stone-800 text-stone-300">${sg}</span>`).join('')}
                  </div>
                  <p class="text-[11px] text-stone-400"><b>Compétences :</b> ${s.skills.map(escapeHtml).join(', ')}</p>
                  <div class="p-2.5 rounded-lg bg-black/45 border border-stone-800/80 text-[11px] space-y-0.5">
                    <div class="font-bold text-amber-300">Rang 1 — ${escapeHtml(s.rank1Name)}</div>
                    <p class="text-stone-300 line-clamp-3 leading-snug">${escapeHtml(s.rank1Effect)}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 pt-1">
                  <button type="button" data-school-detail="${escapeHtml(s.id)}" class="flex-1 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-bold text-amber-200 cursor-pointer">👁️ Rangs 1–5</button>
                  <button type="button" data-school-compare="${escapeHtml(s.id)}" class="px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                    isComp ? 'bg-amber-600 text-black border-amber-400' : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-300'
                  }">⚖️</button>
                  <a href="${forgeUrl}" class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black text-xs font-extrabold transition">⚒️ Forger</a>
                </div>
              </article>`;
          })
          .join('');
      }
    }

    function resetFilters() {
      state.preset = 'all';
      state.clan = 'all';
      state.type = 'all';
      state.trait = 'all';
      state.skill = 'all';
      state.minHonor = 0;
      state.query = '';
      if (clanSel) clanSel.value = 'all';
      if (typeSel) typeSel.value = 'all';
      if (traitSel) traitSel.value = 'all';
      if (skillSel) skillSel.value = 'all';
      if (honorSel) honorSel.value = '0';
      if (searchInput) searchInput.value = '';
      if (presetsBar) {
        presetsBar.querySelectorAll('[data-preset]').forEach((b) => b.classList.toggle('is-active', b.dataset.preset === 'all'));
      }
      render();
    }

    // Bind table sorting & actions via delegation
    document.querySelectorAll('th[data-sort-col]').forEach((th) => {
      th.addEventListener('click', () => {
        const col = th.dataset.sortCol;
        if (state.sortBy === col) {
          state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortBy = col;
          state.sortDir = col === 'honor' ? 'desc' : 'asc';
        }
        render();
      });
    });

    document.addEventListener('click', (e) => {
      const detBtn = e.target.closest('[data-school-detail]');
      if (detBtn) { openDetailModal(detBtn.dataset.schoolDetail); return; }
      const cmpBtn = e.target.closest('[data-school-compare]');
      if (cmpBtn) { toggleCompare(cmpBtn.dataset.schoolCompare); return; }
    });

    if (presetsBar) {
      presetsBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-preset]');
        if (!btn) return;
        const pKey = btn.dataset.preset;
        const preset = PLAYSTYLE_PRESETS[pKey];
        if (!preset) return;
        resetFilters();
        state.preset = pKey;
        const cfg = preset.apply();
        if (cfg.type) { state.type = cfg.type; if (typeSel) typeSel.value = cfg.type; }
        if (cfg.skill) { state.skill = cfg.skill; if (skillSel) skillSel.value = cfg.skill; }
        if (cfg.query) { state.query = cfg.query; if (searchInput) searchInput.value = cfg.query; }
        presetsBar.querySelectorAll('[data-preset]').forEach((b) => b.classList.toggle('is-active', b.dataset.preset === pKey));
        render();
      });
    }

    if (searchInput) searchInput.addEventListener('input', (e) => { state.query = e.target.value || ''; render(); });
    if (clanSel) clanSel.addEventListener('change', (e) => { state.clan = e.target.value; render(); });
    if (typeSel) typeSel.addEventListener('change', (e) => { state.type = e.target.value; render(); });
    if (traitSel) traitSel.addEventListener('change', (e) => { state.trait = e.target.value; render(); });
    if (skillSel) skillSel.addEventListener('change', (e) => { state.skill = e.target.value; render(); });
    if (honorSel) honorSel.addEventListener('change', (e) => { state.minHonor = Number(e.target.value) || 0; render(); });
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);

    if (viewTableBtn) {
      viewTableBtn.addEventListener('click', () => {
        state.viewMode = 'table';
        viewTableBtn.classList.add('is-active');
        if (viewCardsBtn) viewCardsBtn.classList.remove('is-active');
        render();
      });
    }
    if (viewCardsBtn) {
      viewCardsBtn.addEventListener('click', () => {
        state.viewMode = 'cards';
        viewCardsBtn.classList.add('is-active');
        if (viewTableBtn) viewTableBtn.classList.remove('is-active');
        render();
      });
    }

    if (compareOpenBtn) compareOpenBtn.addEventListener('click', openCompareModal);
    if (compareClearBtn) {
      compareClearBtn.addEventListener('click', () => {
        state.compareIds = [];
        updateCompareDock();
        render();
      });
    }

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const m = document.getElementById(btn.dataset.closeModal);
        if (m) m.classList.add('hidden');
      });
    });

    // Discrete MJ Secret Lock Integration (synchronized with Grimoire & Forge)
    const gmBtn = document.getElementById('btn-toggle-gm-secrets');
    const gmModal = document.getElementById('gm-secrets-modal');
    const gmInput = document.getElementById('gm-secrets-password-input');
    const gmError = document.getElementById('gm-secrets-error');
    const gmLockedPanel = document.getElementById('gm-secrets-locked-panel');
    const gmUnlockedPanel = document.getElementById('gm-secrets-unlocked-panel');

    function refreshGmBtn() {
      if (!gmBtn) return;
      const unlocked = isGmUnlocked();
      if (unlocked) {
        gmBtn.textContent = '🕷️ Secrets MJ actifs';
        gmBtn.className = 'px-1.5 py-0.5 rounded bg-red-950/70 hover:bg-red-900/80 border border-red-700/70 text-red-300 transition cursor-pointer';
      } else {
        gmBtn.textContent = '🔒 MJ';
        gmBtn.className = 'px-1.5 py-0.5 rounded bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-500 hover:text-amber-300 transition cursor-pointer';
      }
    }

    globalScope.toggleGmSecretsModal = function (forceState) {
      if (!gmModal) return;
      const isOpen = !gmModal.classList.contains('hidden');
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
      if (shouldOpen) {
        const unlocked = isGmUnlocked();
        if (gmLockedPanel) gmLockedPanel.classList.toggle('hidden', unlocked);
        if (gmUnlockedPanel) gmUnlockedPanel.classList.toggle('hidden', !unlocked);
        gmModal.classList.remove('hidden');
        if (gmError) gmError.classList.add('hidden');
        if (!unlocked && gmInput) { gmInput.value = ''; setTimeout(() => gmInput.focus(), 50); }
      } else {
        gmModal.classList.add('hidden');
      }
    };

    globalScope.unlockGmSecretsWithPassword = function () {
      if (isValidGmPassword(gmInput?.value)) {
        try { sessionStorage.setItem('l5r_maho_unlocked', 'true'); } catch (_) {}
        globalScope.toggleGmSecretsModal(false);
        refreshGmBtn();
        populateFilterDropdowns();
        render();
      } else if (gmError) {
        gmError.classList.remove('hidden');
      }
    };

    globalScope.lockGmSecrets = function () {
      try { sessionStorage.removeItem('l5r_maho_unlocked'); } catch (_) {}
      globalScope.toggleGmSecretsModal(false);
      refreshGmBtn();
      populateFilterDropdowns();
      render();
    };

    refreshGmBtn();
    populateFilterDropdowns();
    updateCompareDock();
    render();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSchoolsExplorer);
    } else {
      initSchoolsExplorer();
    }
  }

  globalScope.buildSchoolsCatalogEntries = buildSchoolsCatalogEntries;
  globalScope.filterSchoolsEntries = filterSchoolsEntries;
  globalScope.sortSchoolsEntries = sortSchoolsEntries;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildSchoolsCatalogEntries, filterSchoolsEntries, sortSchoolsEntries };
  }
})(typeof window !== 'undefined' ? window : globalThis);
