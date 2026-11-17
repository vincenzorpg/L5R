/**
 * js/clans-ui.js — Ergonomie, filtres par lignée (Bushi en tête) et accordéons des pages Clans
 */
(function () {
  'use strict';

  function initClanPageErgonomics() {
    const filterBar = document.getElementById('clan-lineage-filter-bar');
    const schoolCards = Array.from(document.querySelectorAll('.clan-school-card[data-lineage]'));
    const countBadge = document.getElementById('clan-schools-visible-count');
    const advGrid = document.getElementById('clan-adv-schools-grid');
    const advEmptyHint = document.getElementById('clan-adv-empty-hint');

    function applyLineageFilter(filterKey) {
      if (filterBar) {
        filterBar.querySelectorAll('[data-filter-lineage]').forEach((btn) => {
          btn.classList.toggle('is-active', btn.dataset.filterLineage === filterKey);
        });
      }

      let visibleCount = 0;
      let advVisibleCount = 0;

      schoolCards.forEach((card) => {
        const lineage = (card.dataset.lineage || '').split(',').map((s) => s.trim()).filter(Boolean);
        const isBushi = card.dataset.bushi === 'true';
        const show =
          filterKey === 'all' ||
          (filterKey === 'bushi' && isBushi) ||
          lineage.includes(filterKey);

        card.classList.toggle('hidden', !show);
        if (show) {
          visibleCount++;
          if (advGrid && advGrid.contains(card)) advVisibleCount++;
        }
      });

      if (countBadge) {
        countBadge.textContent = `${visibleCount} affichée(s)`;
      }
      if (advEmptyHint) {
        advEmptyHint.classList.toggle('hidden', advVisibleCount > 0);
      }
    }

    if (filterBar) {
      filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter-lineage]');
        if (!btn) return;
        applyLineageFilter(btn.dataset.filterLineage);
      });
    }

    document.querySelectorAll('[data-jump-lineage]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.jumpLineage;
        if (!target) return;
        applyLineageFilter(target);
        const sec = document.getElementById('sec-schools');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.querySelectorAll('[data-toggle-details-scope]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const scopeId = btn.dataset.toggleDetailsScope;
        const container = document.getElementById(scopeId);
        if (!container) return;
        const detailsList = Array.from(container.querySelectorAll('details.clan-accordion'))
          .filter((d) => !d.closest('.hidden'));
        if (detailsList.length === 0) return;

        const allOpen = detailsList.every((d) => d.open);
        const nextState = !allOpen;
        detailsList.forEach((d) => {
          d.open = nextState;
        });
        btn.textContent = nextState ? 'Tout replier' : 'Tout déplier';
      });
    });

    applyLineageFilter('all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClanPageErgonomics);
  } else {
    initClanPageErgonomics();
  }
})();
