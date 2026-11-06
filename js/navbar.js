/**
 * js/navbar.js
 * Barre de navigation globale responsive + Gestionnaire de Thème (Sombre / Clair)
 * Compatible avec toutes les profondeurs d'arborescence (racine, /clans/, /aides/, /campagne/)
 */
(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'l5r_rokugan_theme';

  // Détection automatique du préfixe relatif vers la racine du site
  function getRootPrefix() {
    const path = window.location.pathname;
    if (/\/(aides|clans|campagne|admin)\//.test(path)) {
      return '../';
    }
    return './';
  }

  const rootPrefix = getRootPrefix();

  // 1. Injection immédiate du thème et de css/main.css pour éviter tout FOUC
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      // Ignore erreurs localStorage en navigation privée stricte
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {}
    updateThemeButtons(theme);
  }

  function ensureMainStylesheet() {
    const hasMainCss = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
      (link) => link.getAttribute('href') && link.getAttribute('href').includes('main.css')
    );
    if (!hasMainCss) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${rootPrefix}css/main.css`;
      document.head.appendChild(link);
    }
  }

  function updateThemeButtons(theme) {
    const isLight = theme === 'light';
    const buttons = document.querySelectorAll('[data-action="toggle-theme"]');
    buttons.forEach((btn) => {
      btn.setAttribute(
        'aria-label',
        isLight ? 'Activer le mode sombre (Laque Noire)' : 'Activer le mode clair (Parchemin Washi)'
      );
      btn.setAttribute(
        'title',
        isLight ? 'Passer en Mode Sombre (Laque)' : 'Passer en Mode Clair (Parchemin)'
      );
      const iconSpan = btn.querySelector('.theme-icon');
      const labelSpan = btn.querySelector('.theme-label');
      if (iconSpan) iconSpan.textContent = isLight ? '🌙' : '☀️';
      if (labelSpan) labelSpan.textContent = isLight ? 'Laque' : 'Parchemin';
    });
  }

  // Appliquer dès le chargement du script
  ensureMainStylesheet();
  applyTheme(getInitialTheme());

  // 2. Construction de la barre de navigation
  function renderNavbar() {
    const header = document.getElementById('site-header');
    if (!header) return;

    header.classList.add('no-print', 'sticky', 'top-0', 'z-50');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isLight = currentTheme === 'light';

    const clansList = [
      { id: 'crabe', name: 'Clan du Crabe', icon: '🦀' },
      { id: 'grue', name: 'Clan de la Grue', icon: '🦢' },
      { id: 'dragon', name: 'Clan du Dragon', icon: '🐉' },
      { id: 'lion', name: 'Clan du Lion', icon: '🦁' },
      { id: 'mante', name: 'Clan de la Mante', icon: '🦗' },
      { id: 'phenix', name: 'Clan du Phénix', icon: '🔥' },
      { id: 'scorpion', name: 'Clan du Scorpion', icon: '🦂' },
      { id: 'licorne', name: 'Clan de la Licorne', icon: '🦄' }
    ];

    const aidesList = [
      { slug: 'combat-memento.html', name: 'Combat & Duels Iaijutsu', icon: '⚔️' },
      { slug: 'bushido-honneur.html', name: 'Code du Bushido & Honneur', icon: '📜' },
      { slug: 'etiquette-coutumes.html', name: 'Étiquette & Coutumes', icon: '🍵' }
    ];

    header.innerHTML = `
      <nav aria-label="Navigation principale" class="card-clean border-b border-amber-500/30 backdrop-blur-md px-4 py-2.5">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <!-- Marque & Retour Accueil -->
          <a href="${rootPrefix}index.html" class="flex items-center gap-2.5 group focus:outline-none">
            <img src="${rootPrefix}assets/images/favicon.svg" alt="Sceau de Rokugan" width="32" height="32" class="w-8 h-8 rounded-lg shadow-sm transition-transform group-hover:scale-105" />
            <div class="flex flex-col">
              <span class="font-imperial font-bold text-xs md:text-sm tracking-wider gold-text">CHRONIQUES DE ROKUGAN</span>
              <span class="text-[10px] text-stone-400 hidden sm:inline">L5R 4e Édition • Campagne MJ David</span>
            </div>
          </a>

          <!-- Liens Bureau -->
          <div class="hidden lg:flex items-center gap-1.5 text-xs font-imperial">
            <a href="${rootPrefix}index.html" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 transition">🏯 Accueil</a>
            <a href="${rootPrefix}createcharacter.html" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30 transition">⚔️ Forge PJ</a>
            <a href="${rootPrefix}campagne.html" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 transition">📖 Campagne</a>
            <a href="${rootPrefix}grimoire.html" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 transition">🔥 Grimoire</a>
            <a href="${rootPrefix}tatouages.html" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 transition">🐉 Tatouages</a>

            <!-- Menu déroulant Clans -->
            <div class="relative group">
              <button type="button" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 transition inline-flex items-center gap-1">
                <span>🎌 Grands Clans</span>
                <span class="text-[9px] opacity-70">▼</span>
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 mt-1 w-52 card-clean rounded-xl p-1.5 shadow-2xl grid grid-cols-1 gap-0.5">
                ${clansList
                  .map(
                    (c) => `
                  <a href="${rootPrefix}clans/${c.id}.html" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/15 text-stone-200 hover:text-amber-300 flex items-center gap-2 text-xs">
                    <span>${c.icon}</span><span>${c.name}</span>
                  </a>`
                  )
                  .join('')}
              </div>
            </div>

            <!-- Menu déroulant Aides de Jeu -->
            <div class="relative group">
              <button type="button" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 transition inline-flex items-center gap-1">
                <span>📜 Aides de Jeu</span>
                <span class="text-[9px] opacity-70">▼</span>
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute right-0 mt-1 w-60 card-clean rounded-xl p-1.5 shadow-2xl grid grid-cols-1 gap-0.5">
                ${aidesList
                  .map(
                    (a) => `
                  <a href="${rootPrefix}aides/${a.slug}" class="px-3 py-1.5 rounded-lg hover:bg-amber-500/15 text-stone-200 hover:text-amber-300 flex items-center gap-2 text-xs">
                    <span>${a.icon}</span><span>${a.name}</span>
                  </a>`
                  )
                  .join('')}
              </div>
            </div>
          </div>

          <!-- Actions Droite : Bascule Thème Clair/Sombre + Burger Mobile -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              data-action="toggle-theme"
              class="px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-black/40 hover:bg-amber-500/15 text-xs font-imperial text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
              aria-label="${isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}"
            >
              <span class="theme-icon text-sm">${isLight ? '🌙' : '☀️'}</span>
              <span class="theme-label hidden sm:inline text-[11px] font-bold">${isLight ? 'Laque' : 'Parchemin'}</span>
            </button>

            <button
              type="button"
              id="mobile-menu-toggle"
              aria-expanded="false"
              aria-controls="mobile-menu-panel"
              aria-label="Ouvrir le menu de navigation"
              class="lg:hidden p-2 rounded-lg border border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
            >
              ☰
            </button>
          </div>
        </div>

        <!-- Menu Mobile -->
        <div id="mobile-menu-panel" class="hidden lg:hidden mt-3 pt-3 border-t border-amber-500/20 space-y-2 text-xs font-imperial">
          <div class="grid grid-cols-2 gap-1.5">
            <a href="${rootPrefix}index.html" class="p-2 rounded-lg bg-black/40 text-stone-200">🏯 Accueil</a>
            <a href="${rootPrefix}createcharacter.html" class="p-2 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-300 font-bold">⚔️ Forge PJ</a>
            <a href="${rootPrefix}campagne.html" class="p-2 rounded-lg bg-black/40 text-stone-200">📖 Campagne</a>
            <a href="${rootPrefix}grimoire.html" class="p-2 rounded-lg bg-black/40 text-stone-200">🔥 Grimoire</a>
            <a href="${rootPrefix}tatouages.html" class="p-2 rounded-lg bg-black/40 text-stone-200 col-span-2">🐉 Tatouages Togashi</a>
          </div>
          <div class="pt-1">
            <span class="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Les 8 Grands Clans</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1">
              ${clansList
                .map(
                  (c) => `
                <a href="${rootPrefix}clans/${c.id}.html" class="p-1.5 rounded bg-black/40 text-stone-300 hover:text-amber-300 flex items-center gap-1.5">
                  <span>${c.icon}</span><span>${c.name.replace('Clan de la ', '').replace('Clan du ', '')}</span>
                </a>`
                )
                .join('')}
            </div>
          </div>
          <div class="pt-1">
            <span class="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Aides de Jeu</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1">
              ${aidesList
                .map(
                  (a) => `
                <a href="${rootPrefix}aides/${a.slug}" class="p-1.5 rounded bg-black/40 text-stone-300 hover:text-amber-300 flex items-center gap-1.5">
                  <span>${a.icon}</span><span>${a.name}</span>
                </a>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </nav>
    `;

    // Événement Bascule Thème
    header.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });

    // Événement Menu Mobile
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const mobilePanel = document.getElementById('mobile-menu-panel');
    if (mobileBtn && mobilePanel) {
      mobileBtn.addEventListener('click', () => {
        const isHidden = mobilePanel.classList.toggle('hidden');
        mobileBtn.setAttribute('aria-expanded', String(!isHidden));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();
