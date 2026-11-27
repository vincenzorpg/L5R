/**
 * js/global-search.js
 * Palette de recherche globale instantanée (Ctrl+K / Cmd+K) pour Les Chroniques de Rokugan.
 * Indexe : Pages/Outils, Clans, Scénarios, Écoles (hors gmOnly si verrouillé),
 * Sorts, Kihos, Tatouages, Lieux de Rokugan et Fiches de Règles.
 */
(function (globalScope) {
  'use strict';

  function getRootPrefix() {
    if (typeof window === 'undefined') return './';
    return /\/(aides|clans|campagne|admin)\//.test(window.location.pathname) ? '../' : './';
  }

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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

  const STATIC_PAGES = [
    { cat: 'Pages', badge: '⚔️ Forge', title: 'La Forge de Samouraïs', sub: 'Création, XP, Export & Import JSON Carnet de Rokugan', url: 'createcharacter.html' },
    { cat: 'Pages', badge: '道 Écoles', title: 'Explorateur & Comparateur des Écoles', sub: 'Tableau triable des 88 écoles de Rokugan', url: 'ecoles.html' },
    { cat: 'Pages', badge: '地 Carte', title: 'Carte Interactive de Rokugan', sub: '42 lieux, territoires de clans & chemin des 10 actes', url: 'carte.html' },
    { cat: 'Pages', badge: '法 Sorts', title: 'Grimoire des Sorts & Prières', sub: 'Air, Terre, Feu, Eau, Vide & Mahō', url: 'grimoire.html' },
    { cat: 'Pages', badge: '気 Kihos', title: 'Recueil des Kihos', sub: 'Arts mystiques des Moines & Atemi', url: 'kihos.html' },
    { cat: 'Pages', badge: '型 Katas', title: 'Recueil des Katas Martiaux', sub: '43 formes de combat bushi & 1 000 Ans d\'Acier', url: 'katas.html' },
    { cat: 'Pages', badge: '墨 Tatouages', title: 'Tatouages Sacrés Togashi', sub: '24 tatouages de l\'Ordre Ise Zumi', url: 'tatouages.html' },
    { cat: 'Pages', badge: '記 Campagne', title: 'Chroniques de Campagne (10 Actes)', sub: 'Récits illustrés & narration audio', url: 'campagne.html' },
    { cat: 'Pages', badge: '幕 MJ', title: 'Écran du Maître du Jeu', sub: 'Escarmouche, Duel Iaijutsu, Paravent & Scénario Jour J', url: 'ecran-mj.html' },
    { cat: 'Pages', badge: '暦 Sessions', title: 'Doodle & Planning des Sessions (Janv–Mars 2027)', sub: 'Disponibilités week-ends des PJs, synchro temps réel, Discord & .ics', url: 'sessions.html' },
    { cat: 'Pages', badge: '卓 Live', title: 'La Table Live (Compagnon PJs)', sub: 'Escouade sans spoilers, ordre d\'initiative & fil de dés Roll & Keep temps réel', url: 'table-live.html' },
    { cat: 'Pages', badge: '戦 Aide', title: 'Mémento Combat L5R 4e', sub: 'Postures, manœuvres, duel & blessures', url: 'aides/combat-memento.html' },
    { cat: 'Pages', badge: '誉 Aide', title: 'Le Code du Bushido', sub: '7 vertus, Honneur, Gloire & Table 2.3', url: 'aides/bushido-honneur.html' },
    { cat: 'Pages', badge: '禮 Aide', title: 'Étiquette & Coutumes de Cour', sub: 'Ordre céleste, cadeaux, sabres & thé', url: 'aides/etiquette-coutumes.html' },
    { cat: 'Clans', badge: '蟹 Crabe', title: 'Le Clan du Crabe', sub: 'Défenseurs du Mur Kaiu • Kami Hida', url: 'clans/crabe.html' },
    { cat: 'Clans', badge: '鶴 Grue', title: 'Le Clan de la Grue', sub: 'Arbitres de la Cour & Duellistes • Dame Doji', url: 'clans/grue.html' },
    { cat: 'Clans', badge: '龍 Dragon', title: 'Le Clan du Dragon', sub: 'Éveil, Niten & Tatouages • Kami Togashi', url: 'clans/dragon.html' },
    { cat: 'Clans', badge: '獅 Lion', title: 'Le Clan du Lion', sub: 'Armées impériales & Bushido • Kami Akodo', url: 'clans/lion.html' },
    { cat: 'Clans', badge: '螳 Mante', title: 'Le Clan de la Mante', sub: 'Corsaires des Îles • Yoritomo', url: 'clans/mante.html' },
    { cat: 'Clans', badge: '鳳 Phénix', title: 'Le Clan du Phénix', sub: 'Maîtres des Éléments • Kami Shiba', url: 'clans/phenix.html' },
    { cat: 'Clans', badge: '蠍 Scorpion', title: 'Le Clan du Scorpion', sub: 'Main Gauche de l\'Empereur • Kami Bayushi', url: 'clans/scorpion.html' },
    { cat: 'Clans', badge: '麒 Licorne', title: 'Le Clan de la Licorne', sub: 'Cavaliers & Meishōdō • Dame Shinjo', url: 'clans/licorne.html' }
  ];

  function buildGlobalSearchIndex(sources = {}) {
    const includeSecrets = Boolean(sources.includeSecrets);
    const items = [];

    STATIC_PAGES.forEach((p) => {
      items.push({
        ...p,
        searchBlob: normalizeText(`${p.cat} ${p.badge} ${p.title} ${p.sub}`)
      });
    });

    // Scénarios
    const scenarios = sources.SCENARIOS_DATA || globalScope.SCENARIOS_DATA || [];
    scenarios.forEach((sc) => {
      items.push({
        cat: 'Scénarios',
        badge: `📜 ${sc.date || 'Acte ' + sc.id}`,
        title: sc.title,
        sub: `${sc.place || 'Rokugan'} — ${sc.desc || ''}`.slice(0, 120),
        url: sc.file || `campagne/scenario-${sc.id}.html`,
        searchBlob: normalizeText(`${sc.title} ${sc.shortTitle || ''} ${sc.place || ''} ${sc.desc || ''} ${sc.date || ''}`)
      });
    });

    // Écoles (filtrage strict gmOnly)
    const clans = sources.CLANS_DATA || globalScope.CLANS_DATA || {};
    Object.keys(clans).forEach((clanKey) => {
      const clan = clans[clanKey];
      if (!clan || (!includeSecrets && clan.gmOnly === true)) return;
      (clan.schools || []).forEach((sch) => {
        if (!includeSecrets && sch.gmOnly === true) return;
        items.push({
          cat: 'Écoles',
          badge: `道 ${sch.type || 'École'}`,
          title: sch.name,
          sub: `${clan.name} • Famille ${sch.family || '—'} • ${sch.trait || ''}`,
          url: `ecoles.html?clan=${encodeURIComponent(clanKey)}`,
          searchBlob: normalizeText(`${sch.name} ${clan.name} ${sch.family || ''} ${sch.type || ''} ${sch.trait || ''} ${(sch.skills || []).join(' ')}`)
        });
      });
    });

    // Lieux sur la Carte
    const locs = sources.ROKUGAN_LOCATIONS || globalScope.ROKUGAN_LOCATIONS || [];
    locs.forEach((loc) => {
      items.push({
        cat: 'Lieux',
        badge: `地 ${loc.kanji || 'Lieu'}`,
        title: loc.name,
        sub: `${loc.subtitle || loc.kind || ''} — ${loc.desc || ''}`.slice(0, 120),
        url: `carte.html?lieu=${encodeURIComponent(loc.id)}`,
        searchBlob: normalizeText(`${loc.name} ${loc.subtitle || ''} ${loc.kind || ''} ${loc.faction || ''} ${loc.desc || ''}`)
      });
    });

    // Katas Martiaux
    const katas = sources.KATAS_DATA || globalScope.KATAS_DATA || [];
    katas.forEach((kt) => {
      if (!includeSecrets && kt && kt.gmOnly === true) return;
      items.push({
        cat: 'Katas',
        badge: `型 ${kt.element || 'Kata'} ${kt.mastery || 3}`,
        title: kt.name,
        sub: `${kt.schools || 'Toutes'} — ${kt.desc || ''}`.slice(0, 120),
        url: `katas.html?q=${encodeURIComponent(kt.name)}`,
        searchBlob: normalizeText(`${kt.name} ${kt.element || ''} ${kt.schools || ''} ${kt.source || ''} ${kt.desc || ''}`)
      });
    });

    // Tatouages
    const tattoos = sources.TATOUAGES_DATA || globalScope.TATOUAGES_DATA || [];
    tattoos.forEach((t) => {
      items.push({
        cat: 'Tatouages',
        badge: '墨 Ise Zumi',
        title: t.name,
        sub: `${t.category || 'Tatouage'} — ${t.effect || t.desc || ''}`.slice(0, 120),
        url: 'tatouages.html',
        searchBlob: normalizeText(`${t.name} ${t.category || ''} ${t.effect || ''} ${t.desc || ''}`)
      });
    });

    // Kihos
    const kihos = sources.SORTS_KIHO || globalScope.SORTS_KIHO || [];
    kihos.forEach((k) => {
      items.push({
        cat: 'Kihos',
        badge: `気 ${k.element || 'Kiho'} R${k.mastery || 1}`,
        title: k.name,
        sub: `${k.type || 'Kiho'} — ${k.effect || k.desc || ''}`.slice(0, 120),
        url: 'kihos.html',
        searchBlob: normalizeText(`${k.name} ${k.element || ''} ${k.type || ''} ${k.effect || ''} ${k.desc || ''}`)
      });
    });

    // Sorts élémentaires
    const spellLists = [
      ...(sources.SORTS_UNIVERSELS || globalScope.SORTS_UNIVERSELS || []),
      ...(sources.SORTS_AIR || globalScope.SORTS_AIR || []),
      ...(sources.SORTS_TERRE || globalScope.SORTS_TERRE || []),
      ...(sources.SORTS_FEU || globalScope.SORTS_FEU || []),
      ...(sources.SORTS_EAU || globalScope.SORTS_EAU || []),
      ...(sources.SORTS_VIDE || globalScope.SORTS_VIDE || [])
    ];
    spellLists.forEach((sp) => {
      items.push({
        cat: 'Sorts',
        badge: `法 ${sp.element || 'Sort'} R${sp.mastery || 1}`,
        title: sp.name,
        sub: `${(sp.keywords || []).join(', ')} ${sp.effect || sp.desc || ''}`.slice(0, 120),
        url: 'grimoire.html',
        searchBlob: normalizeText(`${sp.name} ${sp.element || ''} ${(sp.keywords || []).join(' ')} ${sp.effect || ''} ${sp.desc || ''}`)
      });
    });

    // Règles Paravent MJ
    const rules = sources.GM_RULES_DATA || globalScope.GM_RULES_DATA || [];
    rules.forEach((r) => {
      items.push({
        cat: 'Règles',
        badge: `📜 ${r.category || 'Règle'}`,
        title: r.title,
        sub: `${r.summary || r.content || ''}`.slice(0, 120),
        url: 'ecran-mj.html',
        searchBlob: normalizeText(`${r.title} ${r.category || ''} ${r.summary || ''} ${r.content || ''} ${(r.keywords || []).join(' ')}`)
      });
    });

    return items;
  }

  function searchGlobalIndex(items, query, category = 'all', limit = 30) {
    const q = normalizeText(query);
    const catNorm = category || 'all';
    const filtered = (items || []).filter((it) => {
      if (catNorm !== 'all' && it.cat !== catNorm) return false;
      if (!q) return true;
      return it.searchBlob.includes(q);
    });

    if (!q) {
      return filtered.slice(0, limit);
    }

    // Score : priorité aux titres qui commencent par la requête, puis contiennent la requête
    filtered.sort((a, b) => {
      const aTitle = normalizeText(a.title);
      const bTitle = normalizeText(b.title);
      const aStarts = aTitle.startsWith(q) ? 2 : aTitle.includes(q) ? 1 : 0;
      const bStarts = bTitle.startsWith(q) ? 2 : bTitle.includes(q) ? 1 : 0;
      return bStarts - aStarts;
    });

    return filtered.slice(0, limit);
  }

  // Chargement paresseux des scripts de données manquants pour la recherche globale
  let dataLoadPromise = null;
  function loadScriptOnce(src) {
    return new Promise((resolve) => {
      const already = Array.from(document.querySelectorAll('script[src]')).some(
        (s) => (s.getAttribute('src') || '').includes(src.split('/').pop())
      );
      if (already) {
        resolve();
        return;
      }
      const sc = document.createElement('script');
      sc.src = src;
      sc.async = true;
      sc.onload = () => resolve();
      sc.onerror = () => resolve();
      document.head.appendChild(sc);
    });
  }

  function ensureSearchDataLoaded() {
    if (dataLoadPromise) return dataLoadPromise;
    const prefix = getRootPrefix();
    const scripts = [
      `${prefix}data/scenarios-data.js`,
      `${prefix}data/clans-data.js`,
      `${prefix}data/carte-data.js`,
      `${prefix}data/tatouages-data.js`,
      `${prefix}data/katas-data.js`,
      `${prefix}data/gm-rules-data.js`,
      `${prefix}data/sorts/sorts-universels.js`,
      `${prefix}data/sorts/sorts-air.js`,
      `${prefix}data/sorts/sorts-terre.js`,
      `${prefix}data/sorts/sorts-feu.js`,
      `${prefix}data/sorts/sorts-eau.js`,
      `${prefix}data/sorts/sorts-vide.js`,
      `${prefix}data/sorts/sorts-kiho.js`
    ];
    dataLoadPromise = Promise.all(scripts.map(loadScriptOnce));
    return dataLoadPromise;
  }

  function mountGlobalSearchModal() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('l5r-global-search-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'l5r-global-search-modal';
    modal.className = 'no-print hidden fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Recherche globale dans Les Chroniques de Rokugan');

    modal.innerHTML = `
      <div class="w-full max-w-2xl card-clean rounded-2xl border border-amber-500/50 shadow-2xl overflow-hidden flex flex-col max-h-[82vh]">
        <div class="p-3 sm:p-4 border-b border-amber-500/20 bg-black/50 flex items-center gap-2.5">
          <span class="text-amber-400 text-base">🔍</span>
          <input
            id="l5r-global-search-input"
            type="search"
            placeholder="Rechercher une école, un sort, un kiho, une ville, un clan, une règle..."
            autocomplete="off"
            class="flex-1 bg-transparent text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
          />
          <kbd class="hidden sm:inline px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-[10px] font-mono text-stone-400">Échap</kbd>
          <button id="l5r-global-search-close" type="button" class="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 cursor-pointer">✕</button>
        </div>

        <div id="l5r-global-search-cats" class="px-3 py-2 border-b border-stone-800/80 bg-black/30 flex flex-wrap gap-1 text-[11px]">
          ${['all', 'Pages', 'Clans', 'Écoles', 'Sorts', 'Kihos', 'Katas', 'Tatouages', 'Lieux', 'Scénarios', 'Règles'].map((c) => `
            <button type="button" data-gs-cat="${c}" class="px-2 py-0.5 rounded-full border cursor-pointer transition ${c === 'all' ? 'bg-amber-600 text-black border-amber-400 font-bold' : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-500/40'}">
              ${c === 'all' ? 'Tout' : c}
            </button>
          `).join('')}
        </div>

        <div id="l5r-global-search-results" class="overflow-y-auto p-2.5 space-y-1 flex-1"></div>

        <div class="px-3 py-2 border-t border-stone-800/80 bg-black/50 flex items-center justify-between text-[10px] text-stone-400">
          <span>↑↓ naviguer • Entrée ouvrir • Échap fermer</span>
          <span id="l5r-global-search-count" class="font-mono text-amber-300"></span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const inputEl = document.getElementById('l5r-global-search-input');
    const resultsEl = document.getElementById('l5r-global-search-results');
    const catsEl = document.getElementById('l5r-global-search-cats');
    const countEl = document.getElementById('l5r-global-search-count');
    const closeBtn = document.getElementById('l5r-global-search-close');

    let currentCat = 'all';
    let selectedIndex = 0;
    let currentMatches = [];
    let cachedIndex = null;

    function renderResults() {
      if (!cachedIndex) {
        cachedIndex = buildGlobalSearchIndex({ includeSecrets: isGmUnlocked() });
      }
      currentMatches = searchGlobalIndex(cachedIndex, inputEl.value, currentCat, 30);
      if (selectedIndex >= currentMatches.length) selectedIndex = 0;
      if (countEl) countEl.textContent = `${currentMatches.length} résultat(s)`;

      if (currentMatches.length === 0) {
        resultsEl.innerHTML = `<div class="p-6 text-center text-xs text-stone-400 italic">Aucun résultat pour « ${escapeHtml(inputEl.value)} ».</div>`;
        return;
      }

      const prefix = getRootPrefix();
      resultsEl.innerHTML = currentMatches.map((item, idx) => `
        <a
          href="${prefix}${item.url}"
          data-gs-idx="${idx}"
          class="flex items-center justify-between gap-3 p-2.5 rounded-xl border transition ${idx === selectedIndex ? 'bg-amber-950/45 border-amber-500/60 text-amber-100' : 'bg-black/35 border-stone-800/80 hover:bg-stone-900/70 text-stone-200'}"
        >
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="px-1.5 py-0.5 rounded bg-stone-900 border border-amber-500/30 text-[10px] font-imperial text-amber-300 shrink-0">${escapeHtml(item.badge)}</span>
              <span class="font-bold text-xs truncate">${escapeHtml(item.title)}</span>
            </div>
            ${item.sub ? `<p class="text-[10px] text-stone-400 truncate mt-0.5">${escapeHtml(item.sub)}</p>` : ''}
          </div>
          <span class="text-amber-400 text-xs shrink-0">↗</span>
        </a>
      `).join('');
    }

    function openModal() {
      modal.classList.remove('hidden');
      cachedIndex = null; // Recalcule avec l'état courant (ex. verrou MJ)
      renderResults();
      setTimeout(() => {
        inputEl.focus();
        inputEl.select();
      }, 20);
      ensureSearchDataLoaded().then(() => {
        cachedIndex = buildGlobalSearchIndex({ includeSecrets: isGmUnlocked() });
        renderResults();
      });
    }

    function closeModal() {
      modal.classList.add('hidden');
    }

    globalScope.openL5rGlobalSearch = openModal;
    globalScope.closeL5rGlobalSearch = closeModal;

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    inputEl.addEventListener('input', () => {
      selectedIndex = 0;
      renderResults();
    });

    catsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-gs-cat]');
      if (!btn) return;
      currentCat = btn.getAttribute('data-gs-cat') || 'all';
      selectedIndex = 0;
      catsEl.querySelectorAll('[data-gs-cat]').forEach((b) => {
        const active = b.getAttribute('data-gs-cat') === currentCat;
        b.className = `px-2 py-0.5 rounded-full border cursor-pointer transition ${active ? 'bg-amber-600 text-black border-amber-400 font-bold' : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-500/40'}`;
      });
      renderResults();
      inputEl.focus();
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentMatches.length > 0) {
          selectedIndex = (selectedIndex + 1) % currentMatches.length;
          renderResults();
          const activeEl = resultsEl.querySelector(`[data-gs-idx="${selectedIndex}"]`);
          if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentMatches.length > 0) {
          selectedIndex = (selectedIndex - 1 + currentMatches.length) % currentMatches.length;
          renderResults();
          const activeEl = resultsEl.querySelector(`[data-gs-idx="${selectedIndex}"]`);
          if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter' && currentMatches[selectedIndex]) {
        e.preventDefault();
        const prefix = getRootPrefix();
        window.location.href = `${prefix}${currentMatches[selectedIndex].url}`;
      }
    });

    if (!window.__l5rGlobalSearchShortcutBound) {
      window.__l5rGlobalSearchShortcutBound = true;
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (modal.classList.contains('hidden')) openModal();
          else closeModal();
        } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountGlobalSearchModal);
    } else {
      mountGlobalSearchModal();
    }
  }

  globalScope.buildGlobalSearchIndex = buildGlobalSearchIndex;
  globalScope.searchGlobalIndex = searchGlobalIndex;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildGlobalSearchIndex, searchGlobalIndex };
  }
})(typeof window !== 'undefined' ? window : globalThis);
