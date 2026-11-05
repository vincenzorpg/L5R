/**
 * js/navbar.js — Barre de navigation globale et dynamique (Desktop & Mobile)
 * Campagne L5R — MJ David
 */

// =============================================================================
// 0. Favicon
// =============================================================================
/**
 * Injection automatique & universelle du Favicon
 * Fichier source : assets/images/favicon_cinq_anneaux.jpg
 */
(function setupDynamicFavicon() {
  function getFaviconUrl() {
    // Si le site tourne sur GitHub Pages (/L5R/) ou en racine locale
    const isL5RSubpath = window.location.pathname.includes('/L5R/');
    const basePath = isL5RSubpath ? '/L5R/assets/images/cinq_anneaux.jpg' : '/assets/images/favicon_cinq_anneaux.jpg';
    
    // Si ouvert en protocole file://, on calcule la profondeur relative
    if (window.location.protocol === 'file:') {
      const depth = (window.location.pathname.match(/\//g) || []).length;
      const isSubfolder = window.location.pathname.includes('/aides/') || 
                          window.location.pathname.includes('/clans/') || 
                          window.location.pathname.includes('/campagne/');
      return isSubfolder ? '../assets/images/favicon_cinq_anneaux.jpg' : 'assets/images/favicon_cinq_anneaux.jpg';
    }
    return basePath;
  }

  function applyFavicon() {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = getFaviconUrl();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFavicon);
  } else {
    applyFavicon();
  }
})();

// =============================================================================
// 1. CONFIGURATION DU MENU & KANJIS TRADITIONNELS
// =============================================================================
const NAV_CONFIG = {
  brand: {
    name: "LES CHRONIQUES DE ROKUGAN",
    subtitle: "Samouraïs HAJIME !",
    image: "assets/images/cinq_anneaux.jpg",
    url: "index.html"
  },
  menu: [
    {
      label: "Accueil",
      icon: "門",
      url: "index.html"
    },
    {
      label: "Campagne",
      icon: "巻",
      children: [
        { icon: "巻", label: "Les 10 Scénarios Joués", url: "campagne.html" },
        { icon: "筆", label: "Déposer un Scénario (Upload)", url: "campagne-ajouter.html" },
        { icon: "印", label: "Administration CMS", url: "admin/index.html" }
      ]
    },
    {
      label: "Les Huit Clans",
      icon: "氏",
      children: [
        { kanji: "蟹", color: "#38bdf8", label: "Clan du Crabe", url: "clans/crabe.html" },
        { kanji: "鶴", color: "#67e8f9", label: "Clan de la Grue", url: "clans/grue.html" },
        { kanji: "龍", color: "#34d399", label: "Clan du Dragon", url: "clans/dragon.html" },
        { kanji: "獅", color: "#fbbf24", label: "Clan du Lion", url: "clans/lion.html" },
        { kanji: "蟷", color: "#2dd4bf", label: "Clan de la Mante", url: "clans/mante.html" },
        { kanji: "鳳", color: "#f97316", label: "Clan du Phénix", url: "clans/phenix.html" },
        { kanji: "蠍", color: "#f43f5e", label: "Clan du Scorpion", url: "clans/scorpion.html" },
        { kanji: "麒", color: "#c084fc", label: "Clan de la Licorne", url: "clans/licorne.html" }
      ]
    },
    {
      label: "La Voie & Règles",
      icon: "道",
      children: [
        { icon: "武", label: "Mémento de Combat (Bugei)", url: "aides/combat-memento.html" },
        { icon: "誉", label: "Bushido & Code d'Honneur", url: "aides/bushido-honneur.html" },
        { icon: "礼", label: "Étiquette, Rangs & Coutumes", url: "aides/etiquette-coutumes.html" }
      ]
    },
    {
      label: "Outils",
      icon: "具",
      children: [
        { icon: "鍛", label: "Forge de Personnage", url: "createcharacter.html" },
        { icon: "咒", label: "Grimoire des Sorts & Kihos", url: "grimoire.html" },
        { icon: "墨", label: "Tatouages Sacrés (Ise Zumi)", url: "tatouages.html" },
        { logoImg: "https://nelsio.github.io/carnet-l5r/favicon.ico", label: "Carnet de Rokugan", url: "https://nelsio.github.io/carnet-l5r/", external: true }
      ]
    },
    {
      label: "Carnet de Rokugan",
      logoImg: "https://nelsio.github.io/carnet-l5r/favicon.ico",
      url: "https://nelsio.github.io/carnet-l5r/",
      external: true,
      isPill: true
    }
  ],
  actionButton: {
    icon: "鍛",
    label: "FORGER",
    url: "createcharacter.html"
  }
};

// =============================================================================
// 2. MOTEUR DE GÉNÉRATION & RÉSOLUTION DES CHEMINS RELATIFS
// =============================================================================
(function () {
  function resolveUrl(targetUrl) {
    if (!targetUrl || targetUrl.startsWith("http://") || targetUrl.startsWith("https://") || targetUrl.startsWith("#")) {
      return targetUrl;
    }
    const path = window.location.pathname;
    const isSubfolder = path.includes("/aides/") || path.includes("/clans/") || path.includes("/campagne/") || (path.split("/").length > 3 && !path.endsWith("/L5R/"));
    return isSubfolder ? `../${targetUrl}` : targetUrl;
  }

  function buildNavbar() {
    const header = document.getElementById("site-header");
    if (!header) return;

    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "1000";

    document.body.style.paddingTop = "54px";

    // Rendu du logo : Image si renseignée, sinon icône kanji de secours
    const brandVisual = NAV_CONFIG.brand.image
      ? `<img src="${resolveUrl(NAV_CONFIG.brand.image)}" alt="Logo" class="w-8 h-8 rounded-full object-cover border border-amber-500/50 shadow group-hover:scale-105 transition-transform" />`
      : `<span class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-extrabold font-serif text-xs shadow">${NAV_CONFIG.brand.icon || "竜"}</span>`;

    let navHtml = `
      <nav class="bg-[#0a0808]/95 backdrop-blur-md border-b border-amber-500/40 text-stone-300 text-xs shadow-2xl relative z-50">
        <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          
          <!-- MARQUE & LOGO -->
          <a href="${resolveUrl(NAV_CONFIG.brand.url)}" class="flex items-center gap-2.5 group shrink-0">
            ${brandVisual}
            <div class="leading-tight">
              <span class="font-imperial font-bold tracking-widest text-amber-200 text-xs sm:text-sm group-hover:text-amber-300 transition block">
                ${NAV_CONFIG.brand.name}
              </span>
              <span class="text-[8px] text-stone-500 tracking-wider uppercase block font-sans">
                ${NAV_CONFIG.brand.subtitle}
              </span>
            </div>
          </a>

          <!-- LIENS DESKTOP -->
          <div class="hidden lg:flex items-center gap-1 xl:gap-2">
    `;

    NAV_CONFIG.menu.forEach((item, idx) => {
      if (item.children) {
        navHtml += `
          <div class="nav-dropdown-wrapper relative" data-dropdown-id="${idx}">
            <button type="button" class="nav-dropdown-trigger px-2.5 py-1.5 rounded hover:bg-[#181212] text-stone-300 hover:text-amber-200 transition font-medium flex items-center gap-1.5 cursor-pointer">
              <span class="font-serif text-amber-400/90 text-sm font-bold">${item.icon}</span>
              <span>${item.label}</span>
              <span class="text-[8px] text-stone-500 transition-transform duration-200 arrow-icon">▼</span>
            </button>
            
            <div class="nav-dropdown-menu hidden absolute left-0 top-full pt-1.5 w-64 z-50">
              <div class="rounded-xl bg-[#120d0d] border border-amber-500/40 shadow-2xl py-1.5 overflow-hidden">
                ${item.children.map(sub => {
                  let badge = "";
                  if (sub.kanji) {
                    badge = `<span class="w-6 h-6 rounded flex items-center justify-center font-serif font-bold text-sm mr-2.5 bg-black/70 border border-stone-800" style="color: ${sub.color}; text-shadow: 0 0 6px ${sub.color}40;">${sub.kanji}</span>`;
                  } else if (sub.icon) {
                    badge = `<span class="w-6 h-6 rounded flex items-center justify-center font-serif font-bold text-xs mr-2.5 bg-black/60 border border-stone-800 text-amber-300">${sub.icon}</span>`;
                  }

                  return `
                    <a href="${resolveUrl(sub.url)}" 
                       ${sub.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
                       class="block px-3.5 py-2 text-xs text-stone-300 hover:bg-[#201414] hover:text-amber-200 transition flex items-center">
                      ${badge}<span>${sub.label}</span>
                    </a>
                  `;
                }).join("")}
              </div>
            </div>
          </div>
        `;
      } else if (item.isPill) {
        navHtml += `
            <a href="${resolveUrl(item.url)}" 
               ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
               class="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-[#160d0d] hover:bg-[#241313] text-amber-300 hover:text-amber-200 transition font-bold flex items-center gap-2 shadow-sm">
              <img src="${item.logoImg || 'https://nelsio.github.io/carnet-l5r/favicon.ico'}" alt="Carnet" class="w-4 h-4 rounded-sm object-contain">
              <span>${item.label}</span>
            </a>
        `;
      } else {
        navHtml += `
          <a href="${resolveUrl(item.url)}" class="px-2.5 py-1.5 rounded hover:bg-[#181212] text-stone-300 hover:text-amber-200 transition font-medium flex items-center gap-1.5">
            <span class="font-serif text-amber-400/90 text-sm font-bold">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        `;
      }
    });

    navHtml += `
          </div>

          <!-- BOUTON D'ACTION & MENU MOBILE -->
          <div class="flex items-center gap-2">
            <a href="${resolveUrl(NAV_CONFIG.actionButton.url)}" 
               class="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold font-imperial text-xs tracking-wider shadow-md transition transform hover:scale-105 shrink-0 flex items-center gap-1.5">
              <span class="font-serif font-black">${NAV_CONFIG.actionButton.icon}</span>
              <span>${NAV_CONFIG.actionButton.label}</span>
            </a>
            
            <button type="button" id="mobile-menu-btn" class="lg:hidden p-1.5 rounded bg-stone-900 border border-amber-500/40 text-amber-300 hover:bg-stone-800 text-sm font-bold px-2.5" aria-label="Menu Mobile">
              ☰
            </button>
          </div>

        </div>

        <!-- PANNEAU MOBILE -->
        <div id="mobile-menu-panel" class="hidden lg:hidden border-t border-amber-500/30 bg-[#0e0a0a] px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
          ${NAV_CONFIG.menu.map(item => {
            if (item.children) {
              return `
                <div class="space-y-1">
                  <div class="text-[10px] font-bold font-imperial text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <span class="font-serif">${item.icon}</span> ${item.label}
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 border-l border-amber-500/20">
                    ${item.children.map(sub => `
                      <a href="${resolveUrl(sub.url)}" ${sub.external ? 'target="_blank" rel="noopener noreferrer"' : ""} class="py-1 px-2 rounded hover:bg-stone-900 text-stone-300 hover:text-amber-200 block text-xs flex items-center">
                        ${sub.kanji ? `<b style="color:${sub.color}" class="mr-2 font-serif">${sub.kanji}</b>` : `<span class="mr-2 font-serif text-amber-400/80">${sub.icon}</span>`}
                        <span>${sub.label}</span>
                      </a>
                    `).join("")}
                  </div>
                </div>
              `;
            }
            return `
              <a href="${resolveUrl(item.url)}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""} class="block py-1.5 font-bold text-amber-200 hover:text-amber-300 flex items-center gap-2">
                <span class="font-serif">${item.icon}</span>
                <span>${item.label}</span>
              </a>
            `;
          }).join("")}
        </div>
      </nav>
    `;

    header.innerHTML = navHtml;
    attachMenuEvents();
  }

  function attachMenuEvents() {
    const dropdownWrappers = document.querySelectorAll(".nav-dropdown-wrapper");

    dropdownWrappers.forEach(wrapper => {
      const trigger = wrapper.querySelector(".nav-dropdown-trigger");
      const menu = wrapper.querySelector(".nav-dropdown-menu");
      const arrow = wrapper.querySelector(".arrow-icon");
      let leaveTimeout = null;

      function openMenu() {
        clearTimeout(leaveTimeout);
        dropdownWrappers.forEach(other => {
          if (other !== wrapper) {
            other.querySelector(".nav-dropdown-menu")?.classList.add("hidden");
            other.querySelector(".arrow-icon")?.classList.remove("rotate-180");
          }
        });
        menu.classList.remove("hidden");
        arrow?.classList.add("rotate-180");
      }

      function closeMenuWithDelay() {
        leaveTimeout = setTimeout(() => {
          menu.classList.add("hidden");
          arrow?.classList.remove("rotate-180");
        }, 200);
      }

      wrapper.addEventListener("mouseenter", openMenu);
      wrapper.addEventListener("mouseleave", closeMenuWithDelay);

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.contains("hidden");
        if (isHidden) openMenu();
        else {
          menu.classList.add("hidden");
          arrow?.classList.remove("rotate-180");
        }
      });
    });

    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobilePanel = document.getElementById("mobile-menu-panel");
    if (mobileBtn && mobilePanel) {
      mobileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobilePanel.classList.toggle("hidden");
      });
    }

    document.addEventListener("click", () => {
      dropdownWrappers.forEach(wrapper => {
        wrapper.querySelector(".nav-dropdown-menu")?.classList.add("hidden");
        wrapper.querySelector(".arrow-icon")?.classList.remove("rotate-180");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildNavbar);
  } else {
    buildNavbar();
  }
})();
