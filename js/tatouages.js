// =============================================================================
// CODEX INTERACTIF DES TATOUAGES DE ROKUGAN (TATOUAGES.HTML)
// =============================================================================

let currentCategory = 'all';

function normalizeTattoo(t) {
  const isIseZumi = (t.category === 'ise-zumi' || t.type === 'Togashi' || (!t.category && !t.type));
  let cat = t.category || (isIseZumi ? 'ise-zumi' : 'clans');
  let badgeClass = t.badgeClass || (isIseZumi ? 'badge-dragon' : 'badge-clan');
  let catLabel = t.categoryLabel || (isIseZumi ? 'Ise Zumi Togashi' : 'Tradition');

  if (cat === 'shadow') {
    badgeClass = 'badge-shadow';
    catLabel = t.categoryLabel || 'Ombre & Corruption';
  } else if (cat === 'legend') {
    badgeClass = 'badge-legend';
    catLabel = t.categoryLabel || 'Figure Historique';
  }

  return {
    id: t.id || 'tat-' + Math.random().toString(36).substr(2, 9),
    name: t.name || 'Tatouage sans nom',
    kanji: t.kanji ? `(${t.kanji})` : '',
    category: cat,
    badgeClass: badgeClass,
    categoryLabel: catLabel,
    action: t.activation || t.action || 'Action Libre',
    duration: t.duration || '2 × Rang rounds',
    source: t.source || 'Livre de Base (p. 263)',
    lore: t.desc || t.lore || '',
    rule: t.rule || ''
  };
}

function getDataset() {
  const data = window.TATOUAGES_DATA || [];
  return data.map(normalizeTattoo);
}

function renderTattoos(list) {
  const grid = document.getElementById('tattoo-grid');
  const countEl = document.getElementById('tattoo-count');
  if (!grid || !countEl) return;

  grid.innerHTML = '';
  countEl.textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-stone-500 italic">
        Aucun tatouage ne correspond à votre recherche ou catégorie sélectionnée.
      </div>
    `;
    return;
  }

  list.forEach(t => {
    const card = document.createElement('div');
    card.className = "card-clean rounded-xl p-4 flex flex-col justify-between cursor-pointer space-y-3";
    card.onclick = () => openModal(t);

    card.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-start justify-between gap-2 border-b border-stone-800 pb-2">
          <div>
            <span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${t.badgeClass}">
              ${t.categoryLabel}
            </span>
            <h3 class="text-sm font-bold font-imperial text-amber-200 mt-1">
              ${t.name} <span class="text-amber-500/80 font-normal text-xs">${t.kanji}</span>
            </h3>
          </div>
          <span class="text-[9px] text-stone-400 bg-stone-900 border border-stone-800 px-1.5 py-0.5 rounded text-right whitespace-nowrap">
            ${t.source}
          </span>
        </div>

        <p class="text-stone-400 text-[11px] italic line-clamp-2">
          « ${t.lore} »
        </p>

        <div class="p-2.5 rounded bg-black/60 border border-stone-800/80 space-y-1">
          <span class="text-amber-300 font-bold font-imperial block text-[9px] uppercase tracking-wider">
            ⚙️ Effet Mécanique :
          </span>
          <p class="text-stone-300 text-[11px] leading-relaxed line-clamp-3">
            ${t.rule}
          </p>
        </div>
      </div>

      <div class="pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] text-stone-500">
        <span>⏱️ <b>${t.action}</b></span>
        <span class="text-amber-400/80 hover:text-amber-300 flex items-center gap-1 font-imperial font-bold">
          Détails ➔
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilter() {
  const q = (document.getElementById('tattoo-search')?.value || '').toLowerCase().trim();
  const all = getDataset();
  const filtered = all.filter(t => {
    const matchCat = (currentCategory === 'all') || (t.category === currentCategory);
    const matchQuery = !q ||
      t.name.toLowerCase().includes(q) ||
      t.kanji.toLowerCase().includes(q) ||
      t.lore.toLowerCase().includes(q) ||
      t.rule.toLowerCase().includes(q) ||
      t.source.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });
  renderTattoos(filtered);
}

function setFilterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.className = 'cat-btn px-3 py-1.5 rounded-md font-imperial font-bold transition text-black bg-amber-500 shadow';
    } else {
      btn.className = 'cat-btn px-3 py-1.5 rounded-md font-imperial text-stone-300 bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-300 transition';
    }
  });
  applyFilter();
}

function openModal(t) {
  document.getElementById('modal-name').textContent = `${t.name} ${t.kanji}`;
  document.getElementById('modal-source').textContent = `Source : ${t.source} • Activation : ${t.action} • Durée : ${t.duration}`;
  document.getElementById('modal-lore').textContent = `« ${t.lore} »`;
  document.getElementById('modal-rule').textContent = t.rule;

  const badge = document.getElementById('modal-category-badge');
  badge.textContent = t.categoryLabel;
  badge.className = `text-[10px] uppercase font-bold font-imperial px-2.5 py-0.5 rounded inline-block mb-1.5 ${t.badgeClass}`;

  document.getElementById('tattoo-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('tattoo-modal')?.classList.add('hidden');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function initTattooPage(attempts = 0) {
  const modal = document.getElementById('tattoo-modal');
  if (modal && !modal.dataset.bound) {
    modal.dataset.bound = 'true';
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (window.TATOUAGES_DATA && window.TATOUAGES_DATA.length > 0) {
    applyFilter();
  } else if (attempts < 20) {
    setTimeout(() => initTattooPage(attempts + 1), 50);
  } else {
    renderTattoos([]);
  }
}

document.addEventListener('DOMContentLoaded', () => initTattooPage());
