/**
 * js/navbar.js — Menu de navigation global L5R 4e Édition
 * S'injecte automatiquement dans <header id="site-header"></header>
 */

(function () {
  const NAV_CONFIG = [
    { label: "Accueil", href: "index.html", icon: "⛩️" },
    { 
      label: "Outils", 
      icon: "⚙️",
      children: [
        { label: "Forge de Samouraï (PDF)", href: "createcharacter.html", icon: "⚔️" },
        { label: "Grimoire des Sorts & Kiho", href: "grimoire.html", icon: "📜" },
        { label: "Chronique de Campagne", href: "campagne.html", icon: "🏮" }
      ]
    },
    {
      label: "Les Huit Clans",
      icon: "🏯",
      children: [
        { label: "Clan du Crabe", href: "clans/crabe.html", kanji: "土" },
        { label: "Clan de la Grue", href: "clans/grue.html", kanji: "風" },
        { label: "Clan du Dragon", href: "clans/dragon.html", kanji: "龍" },
        { label: "Clan du Lion", href: "clans/lion.html", kanji: "武" },
        { label: "Clan de la Mante", href: "clans/mante.html", kanji: "雷" },
        { label: "Clan du Phénix", href: "clans/phenix.html", kanji: "鳳" },
        { label: "Clan du Scorpion", href: "clans/scorpion.html", kanji: "忍" },
        { label: "Clan de la Licorne", href: "clans/licorne.html", kanji: "馬" }
      ]
    },
    {
      label: "Aides de Jeu",
      icon: "📜",
      children: [
        { label: "Mémento du Combat & Duels", href: "aides/combat-memento.html", icon: "⚔️" },
        { label: "Le Code du Bushido & Honneur", href: "aides/bushido-honneur.html", icon: "義" },
        { label: "Étiquette & Vie Quotidienne", href: "aides/etiquette-coutumes.html", icon: "🍵" }
      ]
    }
  ];

  // Calcul du préfixe selon le sous-dossier (clans/ ou aides/)
  const path = window.location.pathname.replace(/\\/g, '/');
  const depth = (path.match(/\/(clans|aides)\//)) ? 1 : 0;
  const prefix = depth === 1 ? '../' : './';
  const currentFileName = path.split('/').pop() || 'index.html';

  function resolveHref(link) {
    if (link.startsWith('http') || link.startsWith('#')) return link;
    return prefix + link;
  }

  function isLinkActive(link) {
    return link.split('/').pop() === currentFileName;
  }

  function renderNavbar() {
    let headerEl = document.getElementById('site-header');
    if (!headerEl) {
      headerEl = document.createElement('header');
      headerEl.id = 'site-header';
      document.body.prepend(headerEl);
    }

    headerEl.className = "border-b border-amber-500/30 bg-[#0d0b0b]/95 backdrop-blur-md relative z-40 py-2.5 px-4 md:px-8 shadow-xl no-print text-xs";

    let navItemsHtml = NAV_CONFIG.map((item) => {
      if (!item.children) {
        const active = isLinkActive(item.href);
        return `
          <a href="${resolveHref(item.href)}" class="px-2.5 py-1.5 rounded transition flex items-center gap-1.5 font-imperial ${
            active 
              ? 'bg-amber-950/80 text-amber-300 font-bold border border-amber-500/40 shadow' 
              : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900'
          }">
            <span>${item.icon || ''}</span>
            <span>${item.label}</span>
          </a>
        `;
      }

      const hasActiveChild = item.children.some(c => isLinkActive(c.href));
      const dropdownHtml = item.children.map(child => {
        const childActive = isLinkActive(child.href);
        return `
          <a href="${resolveHref(child.href)}" class="px-3 py-2 flex items-center justify-between gap-3 text-[11px] transition ${
            childActive 
              ? 'bg-amber-950 text-amber-300 font-bold border-l-2 border-amber-400' 
              : 'text-stone-300 hover:bg-stone-900 hover:text-amber-200'
          }">
            <span class="flex items-center gap-1.5">
              ${child.icon ? `<span>${child.icon}</span>` : ''}
              <span>${child.label}</span>
            </span>
            ${child.kanji ? `<span class="text-amber-400 font-bold text-xs">${child.kanji}</span>` : ''}
          </a>
        `;
      }).join('');

      return `
        <div class="relative group">
          <button class="px-2.5 py-1.5 rounded transition flex items-center gap-1 font-imperial ${
            hasActiveChild 
              ? 'bg-amber-950/60 text-amber-300 font-bold border border-amber-500/30' 
              : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900'
          }">
            <span>${item.icon || ''}</span>
            <span>${item.label}</span>
            <span class="text-[9px] text-stone-500 group-hover:rotate-180 transition-transform">▼</span>
          </button>
          <div class="absolute left-0 mt-1 hidden group-hover:block w-56 rounded-lg bg-[#0e0b0b] border border-amber-500/40 shadow-2xl py-1 z-50 divide-y divide-stone-900">
            ${dropdownHtml}
          </div>
        </div>
      `;
    }).join('');

    headerEl.innerHTML = `
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        
        <a href="${resolveHref('index.html')}" class="flex items-center gap-3 group">
          <span class="w-8 h-8 rounded-full border border-amber-500/50 bg-black flex items-center justify-center font-bold text-amber-300 font-imperial text-xs group-hover:scale-105 transition">空</span>
          <div>
            <span class="font-imperial font-bold tracking-widest text-amber-200 block text-sm group-hover:text-amber-300 transition">ROKUGAN</span>
            <span class="text-[9px] text-stone-400 tracking-wider uppercase block">Chronique du MJ David</span>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-1.5">
          ${navItemsHtml}
          <a href="${resolveHref('createcharacter.html')}" class="ml-2 px-3 py-1.5 rounded bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold font-imperial tracking-wide shadow flex items-center gap-1.5 transition">
            <span>⚔️</span> Forger
          </a>
        </nav>

        <button onclick="document.getElementById('mobile-nav')?.classList.toggle('hidden')" class="md:hidden p-1.5 rounded bg-stone-900 text-amber-300 border border-stone-800">
          ☰
        </button>

      </div>

      <div id="mobile-nav" class="hidden md:hidden pt-3 border-t border-stone-800 mt-2 space-y-1">
        ${NAV_CONFIG.map(item => {
          if (!item.children) {
            return `<a href="${resolveHref(item.href)}" class="block px-3 py-1.5 text-stone-300 hover:text-amber-300">${item.label}</a>`;
          }
          return `
            <div class="py-1">
              <span class="text-[10px] uppercase font-bold text-amber-400/80 px-3 block">${item.label}</span>
              ${item.children.map(c => `
                <a href="${resolveHref(c.href)}" class="block pl-6 pr-3 py-1 text-stone-400 hover:text-amber-200">${c.label}</a>
              `).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
  } else {
    renderNavbar();
  }
})();
