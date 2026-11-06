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
    } catch (e) {}
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
      if (iconSpan) iconSpan.textContent = isLight ? '月' : '陽';
      if (labelSpan) labelSpan.textContent = isLight ? 'Laque' : 'Parchemin';
    });
  }

  ensureMainStylesheet();
  applyTheme(getInitialTheme());

  // 2. Construction de la barre de navigation
  function renderNavbar() {
    const header = document.getElementById('site-header');
    if (!header) return;

    header.classList.add('no-print', 'sticky', 'top-0', 'z-50');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isLight = currentTheme === 'light';

    // Les 8 Grands Clans : Kanjis et pastilles de couleurs
    const clansList = [
      { id: 'crabe', name: 'Clan du Crabe', kanji: '蟹', badge: 'bg-blue-950/80 text-blue-300 border-blue-700/50' },
      { id: 'grue', name: 'Clan de la Grue', kanji: '鶴', badge: 'bg-sky-950/80 text-sky-200 border-sky-600/50' },
      { id: 'dragon', name: 'Clan du Dragon', kanji: '龍', badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50' },
      { id: 'lion', name: 'Clan du Lion', kanji: '獅', badge: 'bg-amber-950/80 text-amber-300 border-amber-600/50' },
      { id: 'mante', name: 'Clan de la Mante', kanji: '螳', badge: 'bg-teal-950/80 text-teal-300 border-teal-600/50' },
      { id: 'phenix', name: 'Clan du Phénix', kanji: '鳳', badge: 'bg-orange-950/80 text-orange-300 border-orange-600/50' },
      { id: 'scorpion', name: 'Clan du Scorpion', kanji: '蠍', badge: 'bg-red-950/80 text-red-400 border-red-700/50' },
      { id: 'licorne', name: 'Clan de la Licorne', kanji: '麒', badge: 'bg-purple-950/80 text-purple-300 border-purple-600/50' }
    ];

    // Les 3 Aides de Jeu demandées
    const aidesList = [
      {
        slug: 'combat-memento.html',
        name: 'Le Mémento Combat',
        desc: 'Duels Iaijutsu, postures & blessures',
        kanji: '戦',
        badge: 'bg-red-950/80 text-red-300 border-red-700/50'
      },
      {
        slug: 'bushido-honneur.html',
        name: 'Le Code du Bushido',
        desc: 'Sept vertus, honneur & gloire',
        kanji: '誉',
        badge: 'bg-amber-950/80 text-amber-300 border-amber-600/50'
      },
      {
        slug: 'etiquette-coutumes.html',
        name: "L'Étiquette & Coutumes",
        desc: 'Ordre céleste, protocole & thé',
        kanji: '礼',
        badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
      }
    ];

    // Icône SVG chevron bas
    const chevronDownSvg = `
      <svg class="w-3 h-3 opacity-70 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    `;

    // Icône SVG lien externe
    const externalLinkSvg = `
      <svg class="w-3 h-3 text-amber-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    `;

    header.innerHTML = `
      <nav aria-label="Navigation principale" class="card-clean border-b border-amber-500/30 backdrop-blur-md px-3 sm:px-4 py-2.5 select-none shadow-xl">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <!-- Marque & Retour Accueil : Les Chroniques de Rokugan -->
          <a href="${rootPrefix}index.html" class="flex items-center gap-2.5 group shrink-0 focus:outline-none">
            <img src="${rootPrefix}assets/images/favicon.svg" alt="Sceau des Chroniques de Rokugan" width="36" height="36" class="w-9 h-9 rounded-lg shadow-md transition-transform group-hover:scale-105" />
            <div class="flex flex-col">
              <span class="font-imperial font-bold text-xs sm:text-sm tracking-wider gold-text leading-tight uppercase">LES CHRONIQUES DE ROKUGAN</span>
              <span class="text-[10px] text-stone-400 hidden sm:inline">L5R 4e Édition • Campagne MJ David</span>
            </div>
          </a>

          <!-- Liens Bureau -->
          <div class="hidden lg:flex items-center gap-2 text-xs font-imperial">
            
            <!-- 1. ACCUEIL -->
            <a href="${rootPrefix}index.html" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 hover:bg-amber-950/40 text-stone-200 hover:text-amber-300 border border-stone-800 hover:border-amber-500/50 transition">
              <span class="w-5 h-5 rounded flex items-center justify-center bg-amber-950/80 border border-amber-600/50 text-amber-400 font-serif font-bold text-xs">本</span>
              <span>Accueil</span>
            </a>

            <!-- 2. CAMPAGNE (Bouton à part entière) -->
            <a href="${rootPrefix}campagne.html" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 hover:bg-purple-950/40 text-stone-200 hover:text-purple-300 border border-stone-800 hover:border-purple-500/50 transition">
              <span class="w-5 h-5 rounded flex items-center justify-center bg-purple-950/80 border border-purple-600/50 text-purple-300 font-serif font-bold text-xs">記</span>
              <span>Campagne</span>
            </a>

            <!-- 3. CLANS MAJEURS -->
            <div class="relative group">
              <button type="button" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 group-hover:bg-emerald-950/40 text-stone-200 group-hover:text-emerald-300 border border-stone-800 group-hover:border-emerald-500/50 transition focus:outline-none">
                <span class="w-5 h-5 rounded flex items-center justify-center bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 font-serif font-bold text-xs">家</span>
                <span>Clans majeurs</span>
                ${chevronDownSvg}
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 mt-1.5 w-60 card-clean rounded-xl p-2 shadow-2xl grid grid-cols-1 gap-1 border border-emerald-700/40 z-50 backdrop-blur-md">
                ${clansList
                  .map(
                    (c) => `
                  <a href="${rootPrefix}clans/${c.id}.html" class="px-2.5 py-1.5 rounded-lg hover:bg-stone-800/80 text-stone-200 hover:text-amber-200 flex items-center gap-2.5 text-xs transition">
                    <span class="w-6 h-6 rounded border flex items-center justify-center font-serif font-bold text-xs shrink-0 ${c.badge}">${c.kanji}</span>
                    <span class="font-bold tracking-wide">${c.name}</span>
                  </a>`
                  )
                  .join('')}
              </div>
            </div>

            <!-- 4. AIDES (Mémento Combat, Code du Bushido, Étiquette & Coutumes) -->
            <div class="relative group">
              <button type="button" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 group-hover:bg-amber-950/40 text-stone-200 group-hover:text-amber-300 border border-stone-800 group-hover:border-amber-500/50 transition focus:outline-none">
                <span class="w-5 h-5 rounded flex items-center justify-center bg-amber-950/80 border border-amber-600/50 text-amber-400 font-serif font-bold text-xs">書</span>
                <span>Aides</span>
                ${chevronDownSvg}
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 mt-1.5 w-72 card-clean rounded-xl p-2 shadow-2xl flex flex-col gap-1 border border-amber-600/40 z-50 backdrop-blur-md">
                ${aidesList
                  .map(
                    (a) => `
                  <a href="${rootPrefix}aides/${a.slug}" class="px-2.5 py-2 rounded-lg hover:bg-stone-800/80 text-stone-200 hover:text-amber-200 flex items-center gap-3 text-xs transition">
                    <span class="w-7 h-7 rounded border flex items-center justify-center font-serif font-bold text-sm shrink-0 ${a.badge}">${a.kanji}</span>
                    <div class="flex flex-col">
                      <span class="font-bold">${a.name}</span>
                      <span class="text-[10px] text-stone-400 font-sans">${a.desc}</span>
                    </div>
                  </a>`
                  )
                  .join('')}
              </div>
            </div>

            <!-- 5. OUTILS (La Forge, Sorts & Kiho, Tatouages, Carnet de Rokugan) -->
            <div class="relative group">
              <button type="button" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 group-hover:bg-sky-950/40 text-stone-200 group-hover:text-sky-300 border border-stone-800 group-hover:border-sky-500/50 transition focus:outline-none">
                <span class="w-5 h-5 rounded flex items-center justify-center bg-sky-950/80 border border-sky-600/50 text-sky-300 font-serif font-bold text-xs">器</span>
                <span>Outils</span>
                ${chevronDownSvg}
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute right-0 mt-1.5 w-72 card-clean rounded-xl p-2 shadow-2xl flex flex-col gap-1 border border-amber-500/40 z-50 backdrop-blur-md">
                
                <!-- La Forge -->
                <a href="${rootPrefix}createcharacter.html" class="px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-stone-200 hover:text-red-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-red-950/80 text-red-300 border-red-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">鍛</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-red-300">La Forge</span>
                    <span class="text-[10px] text-stone-400 font-sans">Création & gestion de personnage</span>
                  </div>
                </a>

                <!-- Sorts & Kiho -->
                <a href="${rootPrefix}grimoire.html" class="px-2.5 py-2 rounded-lg hover:bg-sky-950/40 text-stone-200 hover:text-sky-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-sky-950/80 text-sky-300 border-sky-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">法</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-sky-300">Sorts & Kiho</span>
                    <span class="text-[10px] text-stone-400 font-sans">Grimoire des éléments & prières</span>
                  </div>
                </a>

                <!-- Tatouages -->
                <a href="${rootPrefix}tatouages.html" class="px-2.5 py-2 rounded-lg hover:bg-teal-950/40 text-stone-200 hover:text-teal-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-teal-950/80 text-teal-300 border-teal-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">墨</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-teal-300">Tatouages Togashi</span>
                    <span class="text-[10px] text-stone-400 font-sans">Pouvoirs mystiques Ise Zumi</span>
                  </div>
                </a>

                <div class="border-t border-amber-500/20 my-1"></div>

                <!-- Carnet de Rokugan avec son logo officiel -->
                <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="px-2.5 py-2 rounded-lg bg-amber-950/20 hover:bg-amber-950/50 border border-amber-500/30 text-stone-200 hover:text-amber-200 flex items-center gap-3 text-xs transition">
                  <img src="${rootPrefix}assets/images/logo_carnet_rokugan.png" alt="Logo Carnet de Rokugan" class="w-7 h-7 rounded border border-amber-500/50 object-contain bg-black p-0.5 shrink-0" />
                  <div class="flex flex-col flex-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-amber-300">Carnet de Rokugan</span>
                      ${externalLinkSvg}
                    </div>
                    <span class="text-[10px] text-stone-400 font-sans">Application compagnon L5R</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          <!-- Actions Droite : Thème + Burger Mobile -->
          <div class="flex items-center gap-2">
            <!-- Bascule Thème Clair/Sombre (Kanjis 月 / 陽) -->
            <button
              type="button"
              data-action="toggle-theme"
              class="px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-black/40 hover:bg-amber-500/15 text-xs font-imperial text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
              aria-label="${isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}"
            >
              <span class="theme-icon w-5 h-5 rounded bg-amber-950/60 border border-amber-500/40 flex items-center justify-center font-serif font-bold text-xs text-amber-300">${isLight ? '月' : '陽'}</span>
              <span class="theme-label hidden sm:inline text-[11px] font-bold">${isLight ? 'Laque' : 'Parchemin'}</span>
            </button>

            <!-- Bouton Burger Mobile (SVG vectoriel) -->
            <button
              type="button"
              id="mobile-menu-toggle"
              aria-expanded="false"
              aria-controls="mobile-menu-panel"
              aria-label="Ouvrir le menu de navigation"
              class="lg:hidden p-2 rounded-lg border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 focus:outline-none"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

        <!-- Menu Mobile (100% Kanjis & Couleurs) -->
        <div id="mobile-menu-panel" class="hidden lg:hidden mt-3 pt-3 border-t border-amber-500/20 space-y-3 text-xs font-imperial">
          
          <!-- Accueil, Campagne & La Forge -->
          <div class="grid grid-cols-3 gap-2">
            <a href="${rootPrefix}index.html" class="p-2 rounded-lg bg-stone-900/80 border border-amber-600/40 text-stone-200 flex items-center justify-center gap-1.5">
              <span class="text-amber-400 font-serif font-bold">本</span>
              <span>Accueil</span>
            </a>
            <a href="${rootPrefix}campagne.html" class="p-2 rounded-lg bg-stone-900/80 border border-purple-600/40 text-purple-200 flex items-center justify-center gap-1.5">
              <span class="text-purple-400 font-serif font-bold">記</span>
              <span>Campagne</span>
            </a>
            <a href="${rootPrefix}createcharacter.html" class="p-2 rounded-lg bg-red-950/70 border border-amber-500/60 text-amber-200 font-bold flex items-center justify-center gap-1.5">
              <span class="text-red-400 font-serif font-bold">鍛</span>
              <span>La Forge</span>
            </a>
          </div>

          <!-- Section Aides -->
          <div class="pt-1">
            <div class="text-[10px] uppercase tracking-widest text-amber-400 mb-1.5 flex items-center gap-1.5">
              <span class="font-serif font-bold">書</span>
              <span>Aides de Jeu</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              ${aidesList
                .map(
                  (a) => `
                <a href="${rootPrefix}aides/${a.slug}" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-amber-300 flex items-center gap-2">
                  <span class="w-6 h-6 rounded border flex items-center justify-center font-serif font-bold text-xs shrink-0 ${a.badge}">${a.kanji}</span>
                  <span>${a.name}</span>
                </a>`
                )
                .join('')}
            </div>
          </div>

          <!-- Section Outils -->
          <div class="pt-1">
            <div class="text-[10px] uppercase tracking-widest text-sky-400 mb-1.5 flex items-center gap-1.5">
              <span class="font-serif font-bold">器</span>
              <span>Outils</span>
            </div>
            <div class="grid grid-cols-2 gap-1.5">
              <a href="${rootPrefix}grimoire.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-sky-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-sky-950/80 text-sky-300 border-sky-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">法</span>
                <span>Sorts & Kiho</span>
              </a>
              <a href="${rootPrefix}tatouages.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-teal-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-teal-950/80 text-teal-300 border-teal-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">墨</span>
                <span>Tatouages</span>
              </a>
              <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 flex items-center gap-2.5 col-span-2">
                <img src="${rootPrefix}assets/images/logo_carnet_rokugan.png" alt="Logo Carnet de Rokugan" class="w-6 h-6 rounded border border-amber-500/50 object-contain bg-black p-0.5 shrink-0" />
                <span class="font-bold">Carnet de Rokugan</span>
                <span class="ml-auto">${externalLinkSvg}</span>
              </a>
            </div>
          </div>

          <!-- Section Clans majeurs -->
          <div class="pt-1">
            <div class="text-[10px] uppercase tracking-widest text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <span class="font-serif font-bold">家</span>
              <span>Clans majeurs</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              ${clansList
                .map(
                  (c) => `
                <a href="${rootPrefix}clans/${c.id}.html" class="p-1.5 rounded-lg bg-black/50 border border-stone-800 text-stone-300 hover:text-amber-300 flex items-center gap-2">
                  <span class="w-5 h-5 rounded border flex items-center justify-center font-serif font-bold text-[11px] shrink-0 ${c.badge}">${c.kanji}</span>
                  <span>${c.name.replace('Clan de la ', '').replace('Clan du ', '')}</span>
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
