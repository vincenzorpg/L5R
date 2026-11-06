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
      // Tolérance en navigation privée stricte
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
      // Kanjis 月 (Lune / Laque) et 陽 (Soleil / Parchemin) au lieu d'émoticônes
      if (iconSpan) iconSpan.textContent = isLight ? '月' : '陽';
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

    // Kanjis canoniques des Huit Grands Clans
    const clansList = [
      { id: 'crabe', name: 'Clan du Crabe', kanji: '蟹', color: 'text-blue-400' },
      { id: 'grue', name: 'Clan de la Grue', kanji: '鶴', color: 'text-cyan-200' },
      { id: 'dragon', name: 'Clan du Dragon', kanji: '龍', color: 'text-emerald-400' },
      { id: 'lion', name: 'Clan du Lion', kanji: '獅', color: 'text-amber-400' },
      { id: 'mante', name: 'Clan de la Mante', kanji: '螳', color: 'text-teal-400' },
      { id: 'phenix', name: 'Clan du Phénix', kanji: '鳳', color: 'text-red-400' },
      { id: 'scorpion', name: 'Clan du Scorpion', kanji: '蠍', color: 'text-red-700' },
      { id: 'licorne', name: 'Clan de la Licorne', kanji: '麒', color: 'text-purple-400' }
    ];

    // Aides de jeu avec leurs Kanjis thématiques
    const aidesList = [
      { slug: 'combat-memento.html', name: 'Le Mémento Combat', desc: 'Duels Iaijutsu, manœuvres & blessures', kanji: '戦' },
      { slug: 'bushido-honneur.html', name: 'Le Code du Bushido', desc: 'Vertus, honneur, gloire & souillure', kanji: '誉' },
      { slug: 'etiquette-coutumes.html', name: "L'Étiquette & Coutumes", desc: 'Protocole impérial, préséance & thé', kanji: '礼' }
    ];

    header.innerHTML = `
      <nav aria-label="Navigation principale" class="card-clean border-b border-amber-500/30 backdrop-blur-md px-3 sm:px-4 py-2 select-none shadow-xl">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <!-- Logo & Marque : Les Chroniques de Rokugan -->
          <a href="${rootPrefix}index.html" class="flex items-center gap-2.5 group shrink-0 focus:outline-none">
            <div class="w-8 h-8 rounded-full border border-amber-500/50 bg-black/40 p-1 flex items-center justify-center shadow-inner group-hover:border-amber-400 transition-transform group-hover:scale-105">
              <img src="${rootPrefix}assets/images/favicon.svg" alt="Mon Rokugan" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden')" />
              <span class="hidden text-amber-500 font-serif font-bold text-sm">五</span>
            </div>
            <div class="flex flex-col">
              <span class="font-imperial font-bold text-xs sm:text-sm tracking-wider gold-text leading-tight uppercase">LES CHRONIQUES DE ROKUGAN</span>
              <span class="text-[9px] sm:text-[10px] text-stone-400 font-mono tracking-widest hidden sm:inline">L5R 4e Édition • Campagne MJ David</span>
            </div>
          </a>

          <!-- Navigation Bureau -->
          <div class="hidden lg:flex items-center gap-1.5 text-xs font-imperial">
            
            <!-- ACCUEIL -->
            <a href="${rootPrefix}index.html" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-amber-500/10 text-stone-200 hover:text-amber-300 border border-transparent hover:border-amber-500/30 transition">
              <span class="text-amber-500 font-serif font-bold">本</span>
              <span>Accueil</span>
            </a>

            <!-- CAMPAGNE (Bouton autonome) -->
            <a href="${rootPrefix}campagne.html" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-purple-950/40 text-stone-200 hover:text-purple-300 border border-transparent hover:border-purple-600/40 transition">
              <span class="text-purple-400 font-serif font-bold">記</span>
              <span>Campagne</span>
            </a>

            <!-- CLANS MAJEURS (Menu Déroulant) -->
            <div class="relative group">
              <button type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-emerald-950/40 text-stone-200 hover:text-emerald-300 border border-transparent hover:border-emerald-600/40 transition focus:outline-none">
                <span class="text-emerald-400 font-serif font-bold">家</span>
                <span>Clans majeurs</span>
                <span class="text-[9px] opacity-70 group-hover:rotate-180 transition-transform duration-200">▼</span>
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 mt-1 w-56 card-clean rounded-xl p-1.5 shadow-2xl grid grid-cols-1 gap-0.5 border border-emerald-900/50 bg-stone-950/95 z-50 backdrop-blur-md">
                ${clansList
                  .map(
                    (c) => `
                  <a href="${rootPrefix}clans/${c.id}.html" class="px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/50 text-stone-200 hover:text-emerald-300 flex items-center gap-2 text-xs transition">
                    <span class="${c.color} font-serif font-bold w-4 text-center">${c.kanji}</span>
                    <span>${c.name}</span>
                  </a>`
                  )
                  .join('')}
              </div>
            </div>

            <!-- AIDES (Les 3 fiches de référence) -->
            <div class="relative group">
              <button type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-amber-950/40 text-stone-200 hover:text-amber-300 border border-transparent hover:border-amber-500/40 transition focus:outline-none">
                <span class="text-amber-500 font-serif font-bold">書</span>
                <span>Aides</span>
                <span class="text-[9px] opacity-70 group-hover:rotate-180 transition-transform duration-200">▼</span>
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-0 mt-1 w-64 card-clean rounded-xl p-2 shadow-2xl flex flex-col gap-1 border border-amber-900/60 bg-stone-950/95 z-50 backdrop-blur-md">
                ${aidesList
                  .map(
                    (a) => `
                  <a href="${rootPrefix}aides/${a.slug}" class="px-2.5 py-2 rounded-lg hover:bg-amber-500/15 text-stone-200 hover:text-amber-300 flex items-center gap-2.5 text-xs transition">
                    <span class="text-amber-500 font-serif font-bold w-4 text-center text-sm">${a.kanji}</span>
                    <div class="flex flex-col">
                      <span class="font-bold">${a.name}</span>
                      <span class="text-[10px] text-stone-400 font-sans">${a.desc}</span>
                    </div>
                  </a>`
                  )
                  .join('')}
              </div>
            </div>

            <!-- OUTILS (La Forge, Sorts & Kiho, Tatouages, Carnet de Rokugan) -->
            <div class="relative group">
              <button type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-transparent hover:border-amber-500/30 transition focus:outline-none">
                <span class="text-amber-400 font-serif font-bold">器</span>
                <span>Outils</span>
                <span class="text-[9px] opacity-70 group-hover:rotate-180 transition-transform duration-200">▼</span>
              </button>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute right-0 mt-1 w-64 card-clean rounded-xl p-2 shadow-2xl flex flex-col gap-1 border border-stone-800 bg-stone-950/95 z-50 backdrop-blur-md">
                
                <!-- La Forge -->
                <a href="${rootPrefix}createcharacter.html" class="px-2.5 py-2 rounded-lg bg-red-950/30 hover:bg-red-950/60 border border-red-900/50 text-red-200 flex items-center gap-2.5 text-xs transition">
                  <span class="text-red-500 font-serif font-bold text-sm w-4 text-center">鍛</span>
                  <div class="flex flex-col">
                    <span class="font-bold">La Forge</span>
                    <span class="text-[10px] text-stone-400 font-sans">Création & fiche de personnage</span>
                  </div>
                </a>

                <!-- Grimoire Sorts & Kiho -->
                <a href="${rootPrefix}grimoire.html" class="px-2.5 py-1.5 rounded-lg hover:bg-sky-950/40 text-stone-200 hover:text-sky-300 flex items-center gap-2.5 text-xs transition">
                  <span class="text-sky-400 font-serif font-bold w-4 text-center">法</span>
                  <div class="flex flex-col">
                    <span class="font-bold">Sorts & Kiho</span>
                    <span class="text-[10px] text-stone-400 font-sans">Prières élémentaires & souffle vital</span>
                  </div>
                </a>

                <!-- Tatouages Togashi -->
                <a href="${rootPrefix}tatouages.html" class="px-2.5 py-1.5 rounded-lg hover:bg-teal-950/40 text-stone-200 hover:text-teal-300 flex items-center gap-2.5 text-xs transition">
                  <span class="text-teal-400 font-serif font-bold w-4 text-center">墨</span>
                  <div class="flex flex-col">
                    <span class="font-bold">Tatouages Mystiques</span>
                    <span class="text-[10px] text-stone-400 font-sans">Ordre Ise Zumi (Dragon)</span>
                  </div>
                </a>

                <div class="border-t border-stone-800/80 my-1"></div>

                <!-- Carnet de Rokugan avec Logo -->
                <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="px-2.5 py-2 rounded-lg hover:bg-amber-950/40 border border-transparent hover:border-amber-500/40 text-stone-200 hover:text-amber-200 flex items-center gap-2.5 text-xs transition group/carnet">
                  <div class="w-5 h-5 rounded border border-amber-600/60 bg-stone-900 p-0.5 flex items-center justify-center shrink-0 shadow-inner group-hover/carnet:border-amber-400">
                    <img src="${rootPrefix}assets/images/favicon.svg" alt="Mon Carnet" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden')" />
                    <span class="hidden text-amber-500 font-serif font-bold text-[10px]">冊</span>
                  </div>
                  <div class="flex flex-col flex-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold">Carnet de Rokugan</span>
                      <span class="text-[9px] text-amber-500/70 font-mono">↗</span>
                    </div>
                    <span class="text-[10px] text-stone-400 font-sans">Application & gestionnaire</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          <!-- Actions Droite : Bouton Direct Forger + Thème + Burger Mobile -->
          <div class="flex items-center gap-2">
            
            <!-- Bouton Direct : FORGER (Strictement sans émoticône) -->
            <a
              href="${rootPrefix}createcharacter.html"
              title="Accéder directement à La Forge de personnage"
              class="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-imperial font-bold text-amber-200 bg-gradient-to-r from-red-950 via-stone-900 to-red-950 border border-red-600/60 hover:border-amber-400 shadow-[0_0_12px_rgba(220,38,38,0.25)] hover:shadow-[0_0_16px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span class="text-red-400 font-serif text-sm">鍛</span>
              <span class="tracking-wider">Forger</span>
            </a>

            <!-- Bascule Thème Clair/Sombre (Kanjis 月 / 陽) -->
            <button
              type="button"
              data-action="toggle-theme"
              class="px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-black/40 hover:bg-amber-500/15 text-xs font-imperial text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
              aria-label="${isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}"
            >
              <span class="theme-icon font-serif text-sm font-bold text-amber-400">${isLight ? '月' : '陽'}</span>
              <span class="theme-label hidden sm:inline text-[11px] font-bold">${isLight ? 'Laque' : 'Parchemin'}</span>
            </button>

            <!-- Bouton Menu Mobile (SVG épuré sans émoticône) -->
            <button
              type="button"
              id="mobile-menu-toggle"
              aria-expanded="false"
              aria-controls="mobile-menu-panel"
              aria-label="Ouvrir le menu de navigation"
              class="lg:hidden p-2 rounded-lg border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 focus:outline-none"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu Mobile Structuré sans émoticônes -->
        <div id="mobile-menu-panel" class="hidden lg:hidden mt-3 pt-3 border-t border-amber-500/20 space-y-3 text-xs font-imperial">
          
          <!-- Accès Rapides Mobile -->
          <div class="grid grid-cols-3 gap-2">
            <a href="${rootPrefix}index.html" class="p-2 rounded-lg bg-black/40 text-stone-200 flex items-center justify-center gap-1.5">
              <span class="text-amber-500 font-serif font-bold">本</span>
              <span>Accueil</span>
            </a>
            <a href="${rootPrefix}campagne.html" class="p-2 rounded-lg bg-purple-950/40 border border-purple-800/40 text-purple-200 flex items-center justify-center gap-1.5">
              <span class="text-purple-400 font-serif font-bold">記</span>
              <span>Campagne</span>
            </a>
            <a href="${rootPrefix}createcharacter.html" class="p-2 rounded-lg bg-red-950/50 border border-red-600/50 text-amber-200 font-bold flex items-center justify-center gap-1.5 shadow-[0_0_8px_rgba(220,38,38,0.3)]">
              <span class="text-red-400 font-serif font-bold">鍛</span>
              <span>La Forge</span>
            </a>
          </div>

          <!-- Section Aides (Les 3 Références) -->
          <div class="pt-1">
            <span class="text-[10px] uppercase tracking-widest text-amber-500/80 block mb-1">Aides de Jeu</span>
            <div class="grid grid-cols-1 gap-1">
              ${aidesList
                .map(
                  (a) => `
                <a href="${rootPrefix}aides/${a.slug}" class="p-2 rounded-lg bg-black/40 text-stone-200 hover:text-amber-300 flex items-center gap-2.5">
                  <span class="text-amber-500 font-serif font-bold w-4 text-center text-sm">${a.kanji}</span>
                  <div class="flex flex-col">
                    <span class="font-bold">${a.name}</span>
                    <span class="text-[10px] text-stone-400 font-sans">${a.desc}</span>
                  </div>
                </a>`
                )
                .join('')}
            </div>
          </div>

          <!-- Section Outils (Grimoire, Tatouages, Carnet) -->
          <div class="pt-1">
            <span class="text-[10px] uppercase tracking-widest text-red-500/80 block mb-1">Outils & Grimoires</span>
            <div class="grid grid-cols-2 gap-1.5">
              <a href="${rootPrefix}grimoire.html" class="p-2 rounded bg-black/40 text-stone-200 hover:text-sky-300 flex items-center gap-2">
                <span class="text-sky-400 font-serif font-bold">法</span>
                <span>Sorts & Kiho</span>
              </a>
              <a href="${rootPrefix}tatouages.html" class="p-2 rounded bg-black/40 text-stone-200 hover:text-teal-300 flex items-center gap-2">
                <span class="text-teal-400 font-serif font-bold">墨</span>
                <span>Tatouages</span>
              </a>
              <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="p-2 rounded bg-black/40 text-stone-200 hover:text-amber-300 flex items-center gap-2 col-span-2">
                <span class="text-amber-500 font-serif font-bold">冊</span>
                <span>Carnet de Rokugan</span>
                <span class="text-[9px] text-stone-400 font-mono ml-auto">↗</span>
              </a>
            </div>
          </div>

          <!-- Les 8 Grands Clans -->
          <div class="pt-1">
            <span class="text-[10px] uppercase tracking-widest text-emerald-500/80 block mb-1">Les 8 Grands Clans</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-1">
              ${clansList
                .map(
                  (c) => `
                <a href="${rootPrefix}clans/${c.id}.html" class="p-1.5 rounded bg-black/40 text-stone-300 hover:text-emerald-300 flex items-center gap-1.5">
                  <span class="${c.color} font-serif font-bold">${c.kanji}</span>
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
