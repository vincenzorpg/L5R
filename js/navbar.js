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
    return 'dark';
  }

  function applyTheme(theme, persist = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {}
    }
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

  function ensureFavicon() {
    const faviconHref = `${rootPrefix}assets/images/favicon_cinq_anneaux.png`;
    let iconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    iconLink.type = 'image/png';
    iconLink.href = faviconHref;
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
  ensureFavicon();
  applyTheme(getInitialTheme(), false);

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
      <svg class="nav-dropdown-chevron w-3 h-3 opacity-70 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
            <img src="${rootPrefix}assets/images/favicon_cinq_anneaux.png" alt="Logo des Chroniques de Rokugan" width="36" height="36" class="w-9 h-9 rounded-full object-cover border border-amber-500/60 bg-[#0f0b0a] shadow-md transition-transform group-hover:scale-105" />
            <div class="flex flex-col">
              <span class="font-imperial font-bold text-xs sm:text-sm tracking-wider gold-text leading-tight uppercase">LES CHRONIQUES DE ROKUGAN</span>
              <span class="text-[10px] text-stone-400 hidden sm:inline">L5R 4e Édition • Campagne de la Chronique de Rokugan</span>
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
            <div class="relative group nav-dropdown">
              <button type="button" aria-haspopup="true" aria-expanded="false" class="nav-dropdown-trigger flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 group-hover:bg-emerald-950/40 text-stone-200 group-hover:text-emerald-300 border border-stone-800 group-hover:border-emerald-500/50 transition focus:outline-none">
                <span class="w-5 h-5 rounded flex items-center justify-center bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 font-serif font-bold text-xs">家</span>
                <span>Clans majeurs</span>
                ${chevronDownSvg}
              </button>
              <div class="nav-dropdown-panel invisible opacity-0 pointer-events-none transition-all duration-150 absolute left-0 top-full pt-2 z-50">
                <div class="w-60 card-clean rounded-xl p-2 shadow-2xl grid grid-cols-1 gap-1 border border-emerald-700/40 backdrop-blur-md">
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
            </div>

            <!-- 4. AIDES (Mémento Combat, Code du Bushido, Étiquette & Coutumes) -->
            <div class="relative group nav-dropdown">
              <button type="button" aria-haspopup="true" aria-expanded="false" class="nav-dropdown-trigger flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 group-hover:bg-amber-950/40 text-stone-200 group-hover:text-amber-300 border border-stone-800 group-hover:border-amber-500/50 transition focus:outline-none">
                <span class="w-5 h-5 rounded flex items-center justify-center bg-amber-950/80 border border-amber-600/50 text-amber-400 font-serif font-bold text-xs">書</span>
                <span>Aides</span>
                ${chevronDownSvg}
              </button>
              <div class="nav-dropdown-panel invisible opacity-0 pointer-events-none transition-all duration-150 absolute left-0 top-full pt-2 z-50">
                <div class="w-72 card-clean rounded-xl p-2 shadow-2xl flex flex-col gap-1 border border-amber-600/40 backdrop-blur-md">
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
            </div>

            <!-- 5. OUTILS (La Forge, Sorts & Kiho, Tatouages, Carnet de Rokugan) -->
            <div class="relative group nav-dropdown">
              <button type="button" aria-haspopup="true" aria-expanded="false" class="nav-dropdown-trigger flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/70 group-hover:bg-sky-950/40 text-stone-200 group-hover:text-sky-300 border border-stone-800 group-hover:border-sky-500/50 transition focus:outline-none">
                <span class="w-5 h-5 rounded flex items-center justify-center bg-sky-950/80 border border-sky-600/50 text-sky-300 font-serif font-bold text-xs">器</span>
                <span>Outils</span>
                ${chevronDownSvg}
              </button>
              <div class="nav-dropdown-panel invisible opacity-0 pointer-events-none transition-all duration-150 absolute right-0 top-full pt-2 z-50">
                <div class="w-72 card-clean rounded-xl p-2 shadow-2xl flex flex-col gap-1 border border-amber-500/40 backdrop-blur-md">
                
                <!-- La Forge -->
                <a href="${rootPrefix}createcharacter.html" class="px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-stone-200 hover:text-red-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-red-950/80 text-red-300 border-red-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">鍛</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-red-300">La Forge</span>
                    <span class="text-[10px] text-stone-400 font-sans">Création & gestion de personnage</span>
                  </div>
                </a>

                <!-- Explorateur des Écoles -->
                <a href="${rootPrefix}ecoles.html" class="px-2.5 py-2 rounded-lg hover:bg-amber-950/40 text-stone-200 hover:text-amber-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-amber-950/80 text-amber-300 border-amber-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">道</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-amber-300">Explorateur des Écoles</span>
                    <span class="text-[10px] text-stone-400 font-sans">Tableau triable &amp; comparateur PJ</span>
                  </div>
                </a>

                <!-- Grimoire des Sorts -->
                <a href="${rootPrefix}grimoire.html" class="px-2.5 py-2 rounded-lg hover:bg-sky-950/40 text-stone-200 hover:text-sky-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-sky-950/80 text-sky-300 border-sky-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">法</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-sky-300">Grimoire des Sorts</span>
                    <span class="text-[10px] text-stone-400 font-sans">Prières aux Kami, Éléments &amp; Mahō</span>
                  </div>
                </a>

                <!-- Recueil des Kihos -->
                <a href="${rootPrefix}kihos.html" class="px-2.5 py-2 rounded-lg hover:bg-emerald-950/40 text-stone-200 hover:text-emerald-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-emerald-950/80 text-emerald-300 border-emerald-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">気</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-emerald-300">Recueil des Kihos</span>
                    <span class="text-[10px] text-stone-400 font-sans">Arts mystiques des Moines &amp; Atemi</span>
                  </div>
                </a>

                <!-- Recueil des Katas -->
                <a href="${rootPrefix}katas.html" class="px-2.5 py-2 rounded-lg hover:bg-orange-950/40 text-stone-200 hover:text-orange-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-orange-950/80 text-orange-300 border-orange-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">型</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-orange-300">Recueil des Katas</span>
                    <span class="text-[10px] text-stone-400 font-sans">43 formes martiales &amp; 1 000 Ans d'Acier</span>
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

                <!-- Écran du MJ -->
                <a href="${rootPrefix}ecran-mj.html" class="px-2.5 py-2 rounded-lg hover:bg-amber-950/40 text-stone-200 hover:text-amber-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-amber-950/80 text-amber-300 border-amber-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">幕</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-amber-300">Écran du MJ</span>
                    <span class="text-[10px] text-stone-400 font-sans">Table PJs, combats & blessures</span>
                  </div>
                </a>

                <!-- Carte de Rokugan -->
                <a href="${rootPrefix}carte.html" class="px-2.5 py-2 rounded-lg hover:bg-yellow-950/40 text-stone-200 hover:text-yellow-200 flex items-center gap-3 text-xs transition">
                  <span class="w-7 h-7 rounded border bg-yellow-950/80 text-yellow-300 border-yellow-600/50 flex items-center justify-center font-serif font-bold text-sm shrink-0">地</span>
                  <div class="flex flex-col">
                    <span class="font-bold text-yellow-300">Carte de Rokugan</span>
                    <span class="text-[10px] text-stone-400 font-sans">Atlas impérial &amp; Chemin des PJs</span>
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

          </div>

          <!-- Actions Droite : Recherche Globale + Thème + Burger Mobile -->
          <div class="flex items-center gap-2">
            <!-- Bouton Recherche Globale (Ctrl+K) -->
            <button
              type="button"
              id="btn-global-search"
              data-action="open-global-search"
              title="Recherche globale (Ctrl + K)"
              class="px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-black/40 hover:bg-amber-500/15 text-xs font-imperial text-amber-200 flex items-center gap-1.5 transition cursor-pointer"
              aria-label="Ouvrir la recherche globale"
            >
              <span>🔍</span>
              <span class="hidden md:inline text-[11px]">Rechercher</span>
              <kbd class="hidden xl:inline px-1.5 py-0.2 rounded bg-stone-900 border border-stone-700 text-[9px] font-mono text-stone-400">Ctrl K</kbd>
            </button>

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
                <span>Grimoire (Sorts)</span>
              </a>
              <a href="${rootPrefix}kihos.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-emerald-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-emerald-950/80 text-emerald-300 border-emerald-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">気</span>
                <span>Kihos (Moines)</span>
              </a>
              <a href="${rootPrefix}katas.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-orange-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-orange-950/80 text-orange-300 border-orange-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">型</span>
                <span>Katas (Bushi)</span>
              </a>
              <a href="${rootPrefix}tatouages.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-teal-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-teal-950/80 text-teal-300 border-teal-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">墨</span>
                <span>Tatouages</span>
              </a>
              <a href="${rootPrefix}ecran-mj.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-amber-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-amber-950/80 text-amber-300 border-amber-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">幕</span>
                <span>Écran du MJ</span>
              </a>
              <a href="${rootPrefix}carte.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-yellow-300 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-yellow-950/80 text-yellow-300 border-yellow-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">地</span>
                <span>Carte de Rokugan</span>
              </a>
              <a href="${rootPrefix}ecoles.html" class="p-2 rounded-lg bg-black/50 border border-stone-800 text-stone-200 hover:text-amber-200 flex items-center gap-2">
                <span class="w-6 h-6 rounded border bg-amber-950/80 text-amber-300 border-amber-600/50 flex items-center justify-center font-serif font-bold text-xs shrink-0">道</span>
                <span>Tableau des Écoles</span>
              </a>
              <button type="button" data-pwa-install-btn onclick="window.promptPWAInstall && window.promptPWAInstall()" class="hidden p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/45 text-emerald-200 hover:bg-emerald-900/50 flex items-center gap-2 col-span-2 cursor-pointer text-left">
                <span class="w-6 h-6 rounded border bg-emerald-950/80 text-emerald-300 border-emerald-600/50 flex items-center justify-center font-bold text-xs shrink-0">📲</span>
                <span class="font-bold">Installer l'App Téléphone (Hors-ligne)</span>
              </button>
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

    // Événement Recherche Globale
    header.querySelectorAll('[data-action="open-global-search"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (typeof window.openL5rGlobalSearch === 'function') {
          window.openL5rGlobalSearch();
        }
      });
    });

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

    // Maintien fluide & tolérant des menus déroulants bureau (délai de grâce + clic)
    const dropdowns = Array.from(header.querySelectorAll('.nav-dropdown'));
    const closeTimers = new WeakMap();

    function setDropdownState(dd, isOpen, pinned = false) {
      const t = closeTimers.get(dd);
      if (t) {
        clearTimeout(t);
        closeTimers.delete(dd);
      }
      dd.classList.toggle('is-open', isOpen);
      dd.dataset.pinned = isOpen && pinned ? 'true' : 'false';
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', String(isOpen));
    }

    function closeAllDropdowns(exceptDd = null) {
      dropdowns.forEach((dd) => {
        if (dd !== exceptDd) setDropdownState(dd, false, false);
      });
    }

    dropdowns.forEach((dd) => {
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      dd.addEventListener('mouseenter', () => {
        closeAllDropdowns(dd);
        const alreadyPinned = dd.dataset.pinned === 'true';
        setDropdownState(dd, true, alreadyPinned);
      });
      dd.addEventListener('mouseleave', () => {
        if (dd.dataset.pinned === 'true') return;
        const timer = setTimeout(() => {
          setDropdownState(dd, false, false);
        }, 220);
        closeTimers.set(dd, timer);
      });
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const willPin = dd.dataset.pinned !== 'true';
          closeAllDropdowns(dd);
          setDropdownState(dd, willPin, willPin);
        });
      }
    });

    if (!window.__l5rNavbarGlobalListenersBound) {
      window.__l5rNavbarGlobalListenersBound = true;
      document.addEventListener('click', (e) => {
        const h = document.getElementById('site-header');
        if (!h) return;
        if (!e.target.closest('.nav-dropdown')) {
          h.querySelectorAll('.nav-dropdown').forEach((dd) => {
            dd.classList.remove('is-open');
            dd.dataset.pinned = 'false';
            const tr = dd.querySelector('.nav-dropdown-trigger');
            if (tr) tr.setAttribute('aria-expanded', 'false');
          });
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const h = document.getElementById('site-header');
        if (!h) return;
        h.querySelectorAll('.nav-dropdown').forEach((dd) => {
          dd.classList.remove('is-open');
          dd.dataset.pinned = 'false';
          const tr = dd.querySelector('.nav-dropdown-trigger');
          if (tr) tr.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // 3. Synchronisation centralisée de la version en pied de page (#site-version-footer)
  //    + injection des boutons « Signaler un bug » (GitHub Issues) et « Contact » (modale).
  const GITHUB_ISSUES_CHOOSE_URL = 'https://github.com/vincenzorpg/L5R/issues/new/choose';
  const CONTACT_EMAIL = 'vincent.david.perso@gmail.com';
  const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

  function openContactAuthorModal() {
    let modal = document.getElementById('l5r-contact-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'l5r-contact-modal';
      modal.className = 'fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'l5r-contact-modal-title');
      modal.innerHTML = `
        <div class="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#1a1514] border border-amber-500/35 shadow-2xl p-5 sm:p-6 space-y-4 text-stone-200">
          <div class="flex items-center justify-between gap-3">
            <h2 id="l5r-contact-modal-title" class="font-imperial font-bold text-lg sm:text-xl text-amber-200 tracking-wide">
              Contacter l'auteur
            </h2>
            <button type="button" id="l5r-contact-close" aria-label="Fermer la fenêtre de contact" class="w-9 h-9 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-amber-500/50 text-amber-200 hover:text-white flex items-center justify-center text-lg cursor-pointer transition shrink-0">
              ✕
            </button>
          </div>

          <form id="l5r-contact-form" class="space-y-3.5 text-xs">
            <input type="text" name="_honey" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

            <div class="space-y-1">
              <label for="l5r-contact-name" class="block font-bold text-stone-200">Nom ou pseudo (facultatif)</label>
              <input id="l5r-contact-name" name="name" type="text" maxlength="100" placeholder="Ex. Tsuruchi Akira" class="w-full rounded-lg bg-[#100d0c] border border-stone-700 focus:border-amber-500/70 px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none" />
            </div>

            <div class="space-y-1">
              <label for="l5r-contact-email" class="block font-bold text-stone-200">Email pour te répondre (facultatif)</label>
              <input id="l5r-contact-email" name="email" type="email" maxlength="150" placeholder="ton.email@exemple.fr" class="w-full rounded-lg bg-[#100d0c] border border-stone-700 focus:border-amber-500/70 px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none" />
              <p class="text-[11px] text-stone-400">Sans email, je ne pourrai pas te répondre.</p>
            </div>

            <div class="space-y-1">
              <label for="l5r-contact-subject" class="block font-bold text-stone-200">Sujet</label>
              <select id="l5r-contact-subject" name="subject" class="w-full rounded-lg bg-[#100d0c] border border-stone-700 focus:border-amber-500/70 px-3 py-2 text-xs text-stone-100 focus:outline-none">
                <option value="Question">Question</option>
                <option value="Idée d'évolution">Idée d'évolution</option>
                <option value="Règle L5R 4e à vérifier">Règle L5R 4e à vérifier</option>
                <option value="Scénario / Campagne / Podcast">Scénario / Campagne / Podcast</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div class="space-y-1">
              <label for="l5r-contact-message" class="block font-bold text-stone-200">Message</label>
              <textarea id="l5r-contact-message" name="message" rows="5" maxlength="3000" required placeholder="Écris ton message ici..." class="w-full rounded-lg bg-[#100d0c] border border-stone-700 focus:border-amber-500/70 px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none resize-y"></textarea>
              <div class="text-right text-[11px] font-mono text-stone-400">
                <span id="l5r-contact-charcount">0</span> / 3000
              </div>
            </div>

            <div id="l5r-contact-status" class="hidden rounded-lg p-2.5 text-xs border leading-relaxed"></div>

            <div class="flex flex-wrap items-center gap-3 pt-1">
              <button type="submit" id="l5r-contact-submit" class="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-wide shadow cursor-pointer transition">
                Envoyer
              </button>
              <span class="text-xs text-stone-400">
                Un bug ? →
                <a href="${GITHUB_ISSUES_CHOOSE_URL}" target="_blank" rel="noopener noreferrer" class="text-amber-300 hover:text-amber-200 underline decoration-amber-500/50 transition">
                  Signaler sur GitHub ↗
                </a>
              </span>
            </div>

            <div class="rounded-lg bg-black/45 border border-stone-800 border-l-4 border-l-amber-500/80 px-3 py-2.5 text-[11px] text-stone-400 leading-snug">
              Ton message est transmis par mail via le service FormSubmit. Rien n'est stocké sur le site.
            </div>
          </form>
        </div>
      `;

      document.body.appendChild(modal);

      const closeModal = () => {
        modal.classList.add('hidden');
      };

      modal.querySelector('#l5r-contact-close')?.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
      });

      const msgEl = modal.querySelector('#l5r-contact-message');
      const countEl = modal.querySelector('#l5r-contact-charcount');
      if (msgEl && countEl) {
        msgEl.addEventListener('input', () => {
          countEl.textContent = String(msgEl.value.length);
        });
      }

      const formEl = modal.querySelector('#l5r-contact-form');
      const submitBtn = modal.querySelector('#l5r-contact-submit');
      const statusEl = modal.querySelector('#l5r-contact-status');

      if (formEl) {
        formEl.addEventListener('submit', async (ev) => {
          ev.preventDefault();
          const honey = formEl.querySelector('input[name="_honey"]')?.value || '';
          if (honey) return;

          const name = (formEl.querySelector('#l5r-contact-name')?.value || '').trim();
          const email = (formEl.querySelector('#l5r-contact-email')?.value || '').trim();
          const subject = (formEl.querySelector('#l5r-contact-subject')?.value || 'Question').trim();
          const message = (msgEl?.value || '').trim();
          if (!message) return;

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours…';
          }
          if (statusEl) statusEl.classList.add('hidden');

          const payload = {
            _subject: `[Les Chroniques de Rokugan] ${subject}`,
            _template: 'table',
            _captcha: 'false',
            Nom: name || 'Anonyme',
            Email: email || 'Non renseigné',
            Sujet: subject,
            Page: window.location.href,
            Message: message
          };
          if (email) payload._replyto = email;

          try {
            const res = await fetch(CONTACT_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            if (statusEl) {
              statusEl.className = 'rounded-lg p-2.5 text-xs border bg-emerald-950/80 border-emerald-500/50 text-emerald-200 leading-relaxed';
              statusEl.textContent = '✓ Message envoyé ! Merci pour ton retour.';
              statusEl.classList.remove('hidden');
            }
            formEl.reset();
            if (countEl) countEl.textContent = '0';
          } catch (_) {
            const mailtoFallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[Les Chroniques de Rokugan] ${subject}`)}&body=${encodeURIComponent(`${name ? `De : ${name}\n` : ''}${message}`)}`;
            if (statusEl) {
              statusEl.className = 'rounded-lg p-2.5 text-xs border bg-amber-950/80 border-amber-500/50 text-amber-200 leading-relaxed';
              statusEl.innerHTML = `Impossible d'envoyer directement (hors-ligne ou bloqueur). <a href="${mailtoFallback}" class="underline font-bold text-amber-300">Ouvrir dans ton application mail ↗</a>`;
              statusEl.classList.remove('hidden');
            }
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Envoyer';
            }
          }
        });
      }
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('#l5r-contact-message')?.focus();
    }, 50);
  }

  window.openContactAuthorModal = openContactAuthorModal;

  function injectFooterBugReportLink() {
    const footerBar = document.getElementById('site-version-footer');
    if (!footerBar) return;

    footerBar.classList.add('flex-wrap', 'gap-y-1.5');

    if (!document.getElementById('site-bug-report-link')) {
      const sep1 = document.createElement('span');
      sep1.textContent = '•';
      sep1.setAttribute('aria-hidden', 'true');

      const bugLink = document.createElement('a');
      bugLink.id = 'site-bug-report-link';
      bugLink.href = GITHUB_ISSUES_CHOOSE_URL;
      bugLink.target = '_blank';
      bugLink.rel = 'noopener noreferrer';
      bugLink.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900/90 hover:bg-amber-950/80 border border-amber-500/35 hover:border-amber-400 text-amber-300/90 hover:text-amber-200 transition no-underline font-sans font-semibold';
      bugLink.title = 'Signaler un bug, proposer une idée ou vérifier une règle 4e sur GitHub';
      bugLink.innerHTML = '<span aria-hidden="true">🐛</span><span>Signaler un bug</span>';

      footerBar.appendChild(sep1);
      footerBar.appendChild(bugLink);
    }

    if (!document.getElementById('site-contact-link')) {
      const sep2 = document.createElement('span');
      sep2.textContent = '•';
      sep2.setAttribute('aria-hidden', 'true');

      const contactBtn = document.createElement('button');
      contactBtn.id = 'site-contact-link';
      contactBtn.type = 'button';
      contactBtn.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700 hover:border-amber-400/60 text-stone-300 hover:text-amber-200 transition cursor-pointer font-sans font-semibold';
      contactBtn.title = "Contacter l'auteur du site par message";
      contactBtn.innerHTML = '<span aria-hidden="true">✉️</span><span>Contact</span>';
      contactBtn.addEventListener('click', openContactAuthorModal);

      footerBar.appendChild(sep2);
      footerBar.appendChild(contactBtn);
    }
  }

  function syncFooterVersion() {
    injectFooterBugReportLink();
    const lbl = document.getElementById('site-version-label');
    const lnk = document.getElementById('site-version-link');
    if (!lbl && !lnk) return;

    fetch(`${rootPrefix}version.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || !d.version) return;
        const v = d.version.indexOf('v') === 0 ? d.version : `v${d.version}`;
        if (lbl) lbl.textContent = v;
        if (lnk && d.releasesUrl) lnk.href = d.releasesUrl;
      })
      .catch(() => {});
  }

  function ensurePwaScript() {
    if (window.promptPWAInstall) return;
    const already = Array.from(document.querySelectorAll('script[src]')).some(
      (s) => (s.getAttribute('src') || '').includes('pwa.js')
    );
    if (already) return;
    const sc = document.createElement('script');
    sc.src = `${rootPrefix}js/pwa.js`;
    sc.defer = true;
    document.head.appendChild(sc);
  }

  function ensureGlobalSearchScript() {
    if (window.openL5rGlobalSearch) return;
    const already = Array.from(document.querySelectorAll('script[src]')).some(
      (s) => (s.getAttribute('src') || '').includes('global-search.js')
    );
    if (already) return;
    const sc = document.createElement('script');
    sc.src = `${rootPrefix}js/global-search.js`;
    sc.defer = true;
    document.head.appendChild(sc);
  }

  function renderBreadcrumb() {
    if (document.getElementById('l5r-breadcrumb')) return;
    const path = window.location.pathname.replace(/\\/g, '/');
    const file = path.split('/').pop() || 'index.html';
    if (file === '' || file === 'index.html') return;

    const crumbs = [{ label: '🏯 Accueil', href: `${rootPrefix}index.html` }];

    if (/\/clans\//.test(path)) {
      const clanNames = {
        'crabe.html': 'Clan du Crabe',
        'grue.html': 'Clan de la Grue',
        'dragon.html': 'Clan du Dragon',
        'lion.html': 'Clan du Lion',
        'mante.html': 'Clan de la Mante',
        'phenix.html': 'Clan du Phénix',
        'scorpion.html': 'Clan du Scorpion',
        'licorne.html': 'Clan de la Licorne'
      };
      crumbs.push({ label: 'Clans Majeurs', href: `${rootPrefix}index.html#clans` });
      crumbs.push({ label: clanNames[file] || file.replace('.html', '') });
    } else if (/\/campagne\//.test(path)) {
      const numMatch = file.match(/scenario-(\d+)/);
      crumbs.push({ label: 'Campagne', href: `${rootPrefix}campagne.html` });
      crumbs.push({ label: numMatch ? `Scénario ${numMatch[1]}` : file.replace('.html', '') });
    } else if (/\/aides\//.test(path)) {
      const aideNames = {
        'combat-memento.html': 'Mémento Combat',
        'bushido-honneur.html': 'Code du Bushido',
        'etiquette-coutumes.html': 'Étiquette & Coutumes'
      };
      crumbs.push({ label: 'Aides de Jeu', href: `${rootPrefix}index.html#aides` });
      crumbs.push({ label: aideNames[file] || file.replace('.html', '') });
    } else {
      const pageMap = {
        'createcharacter.html': ['Outils', 'La Forge'],
        'ecoles.html': ['Outils', 'Explorateur des Écoles'],
        'grimoire.html': ['Outils', 'Grimoire des Sorts'],
        'kihos.html': ['Outils', 'Recueil des Kihos'],
        'katas.html': ['Outils', 'Recueil des Katas'],
        'tatouages.html': ['Outils', 'Tatouages Togashi'],
        'carte.html': ['Outils', 'Carte de Rokugan'],
        'ecran-mj.html': ['Outils', 'Écran du MJ'],
        'campagne.html': [null, 'Chroniques de Campagne'],
        'campagne-ajouter.html': ['Campagne', 'Déposer un Récit']
      };
      const entry = pageMap[file];
      if (!entry) return;
      if (entry[0] === 'Campagne') {
        crumbs.push({ label: 'Campagne', href: `${rootPrefix}campagne.html` });
      } else if (entry[0]) {
        crumbs.push({ label: entry[0], href: `${rootPrefix}index.html#outils` });
      }
      crumbs.push({ label: entry[1] });
    }

    const nav = document.createElement('nav');
    nav.id = 'l5r-breadcrumb';
    nav.setAttribute('aria-label', 'Fil d\'Ariane');
    nav.className = 'no-print max-w-7xl w-full mx-auto px-4 pt-3 pb-0 text-[11px] font-imperial text-stone-400 flex flex-wrap items-center gap-1.5';
    nav.innerHTML = crumbs.map((c, idx) => {
      const sep = idx > 0 ? '<span class="text-amber-500/45 mx-0.5">›</span>' : '';
      if (c.href && idx < crumbs.length - 1) {
        return `${sep}<a href="${c.href}" class="hover:text-amber-300 transition">${c.label}</a>`;
      }
      return `${sep}<span class="text-amber-300 font-bold">${c.label}</span>`;
    }).join('');

    const header = document.getElementById('site-header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    }
  }

  function initGlobalUI() {
    ensurePwaScript();
    ensureGlobalSearchScript();
    renderNavbar();
    renderBreadcrumb();
    syncFooterVersion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalUI);
  } else {
    initGlobalUI();
  }
})();
