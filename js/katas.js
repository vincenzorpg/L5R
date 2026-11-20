/**
 * js/katas.js — Moteur de recherche et filtrage du Recueil des Katas Martiaux (L5R 4e Édition)
 * Compatible Navigateur & Node.js (module.exports)
 */

(function (globalScope) {
  'use strict';

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isGmUnlocked() {
    try {
      return localStorage.getItem('l5r_gm_secrets_unlocked') === '1';
    } catch (_) {
      return false;
    }
  }

  function filterKatasList(list, { element = 'all', mastery = 'all', query = '', includeSecrets = false } = {}) {
    const items = Array.isArray(list) ? list : [];
    const elFilter = normalizeText(element);
    const q = normalizeText(query);

    return items.filter((k) => {
      if (!includeSecrets && k && k.gmOnly === true) return false;

      if (elFilter && elFilter !== 'all' && elFilter !== 'tous') {
        const kEl = normalizeText(k.element || '');
        if (elFilter === 'air / feu') {
          if (kEl !== 'air / feu') return false;
        } else if (!kEl.includes(elFilter)) {
          return false;
        }
      }

      if (mastery && mastery !== 'all') {
        if (Number(k.mastery) !== Number(mastery)) return false;
      }

      if (!q) return true;
      const hay = normalizeText(`${k.name || ''} ${k.element || ''} ${k.schools || ''} ${k.source || ''} ${k.desc || ''}`);
      return hay.includes(q);
    });
  }

  function getElementStyle(element) {
    const e = normalizeText(element);
    if (e === 'air / feu') return { icon: '⚔️', badge: 'bg-orange-950/80 text-orange-200 border-orange-500/45', border: 'border-orange-500/35' };
    if (e.includes('terre')) return { icon: '土', badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/45', border: 'border-emerald-500/30' };
    if (e.includes('eau')) return { icon: '水', badge: 'bg-sky-950/80 text-sky-300 border-sky-500/45', border: 'border-sky-500/30' };
    if (e.includes('air')) return { icon: '風', badge: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/45', border: 'border-indigo-500/30' };
    if (e.includes('feu')) return { icon: '火', badge: 'bg-red-950/80 text-red-300 border-red-500/45', border: 'border-red-500/30' };
    if (e.includes('vide')) return { icon: '空', badge: 'bg-purple-950/80 text-purple-300 border-purple-500/45', border: 'border-purple-500/30' };
    return { icon: '⚔️', badge: 'bg-amber-950/80 text-amber-300 border-amber-500/45', border: 'border-amber-500/30' };
  }

  const uiState = {
    element: 'all',
    mastery: 'all',
    query: ''
  };

  function renderKatasGrid() {
    const grid = document.getElementById('katas-grid');
    if (!grid) return;

    const all = globalScope.KATAS_DATA || [];
    const includeSecrets = isGmUnlocked();
    const visibleAll = filterKatasList(all, { includeSecrets });
    const filtered = filterKatasList(all, { ...uiState, includeSecrets });

    const countEl = document.getElementById('katas-count-badge');
    if (countEl) countEl.textContent = `${filtered.length} / ${visibleAll.length} KATAS`;

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-10 text-xs text-stone-400 italic border border-stone-800 rounded-xl bg-black/50">Aucun Kata ne correspond à vos critères de recherche.</div>`;
      return;
    }

    grid.innerHTML = filtered.map((k) => {
      const st = getElementStyle(k.element);
      const gmTag = k.gmOnly ? `<span class="px-1.5 py-0.5 rounded bg-rose-950 border border-rose-500/50 text-rose-300 text-[9px] font-bold font-mono">MJ</span>` : '';
      return `
        <article class="card-clean rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 border ${st.border} hover:border-amber-400/50 transition">
          <div class="space-y-2.5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <span class="px-2 py-0.5 rounded border text-[10px] font-bold font-imperial ${st.badge}">${st.icon} ${escapeHtml(k.element)} ${k.mastery}</span>
                ${gmTag}
              </div>
              <span class="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/35 text-amber-300 text-[10px] font-mono font-bold">${k.cost} XP</span>
            </div>

            <h3 class="text-sm sm:text-base font-bold font-imperial text-amber-200 leading-snug">${escapeHtml(k.name)}</h3>

            <div class="text-[11px] text-stone-400 bg-black/50 border border-stone-800/80 rounded-lg px-2.5 py-1.5">
              <span class="text-amber-400/90 font-bold">Écoles :</span> ${escapeHtml(k.schools)}
            </div>

            <p class="text-xs text-stone-200 leading-relaxed">${escapeHtml(k.desc)}</p>
          </div>

          <div class="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-500 font-mono">
            <span>📖 ${escapeHtml(k.source || 'L5R 4e Édition')}</span>
            <span>Action Simple</span>
          </div>
        </article>
      `;
    }).join('');
  }

  function setKataElementFilter(elem) {
    uiState.element = elem || 'all';
    document.querySelectorAll('[data-kata-elem]').forEach((btn) => {
      const active = btn.getAttribute('data-kata-elem') === uiState.element;
      btn.className = active
        ? 'px-3 py-1.5 rounded-lg bg-amber-600 text-black font-bold text-xs cursor-pointer transition shadow'
        : 'px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs cursor-pointer transition';
    });
    renderKatasGrid();
  }

  function initKatasPage() {
    if (!document.getElementById('katas-grid')) return;

    const params = new URLSearchParams(window.location.search || '');
    const initialQuery = params.get('q') || '';
    const searchEl = document.getElementById('katas-search-input');
    const masteryEl = document.getElementById('katas-mastery-filter');

    if (searchEl) {
      if (initialQuery) {
        searchEl.value = initialQuery;
        uiState.query = initialQuery;
      }
      searchEl.addEventListener('input', () => {
        uiState.query = searchEl.value;
        renderKatasGrid();
      });
    }

    if (masteryEl) {
      masteryEl.addEventListener('change', () => {
        uiState.mastery = masteryEl.value;
        renderKatasGrid();
      });
    }

    renderKatasGrid();
  }

  if (typeof globalScope !== 'undefined') {
    globalScope.filterKatasList = filterKatasList;
    globalScope.setKataElementFilter = setKataElementFilter;
    globalScope.renderKatasGrid = renderKatasGrid;
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initKatasPage);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filterKatasList };
  }
})(typeof window !== 'undefined' ? window : globalThis);
