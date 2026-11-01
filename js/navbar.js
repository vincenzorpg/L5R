/**
 * js/navbar.js — Barre de navigation globale et dynamique (Desktop & Mobile)
 * Campagne L5R — MJ David
 */

const NAV_CONFIG = {
  brand: {
    name: "LES CHRONIQUES DE ROKUGAN",
    subtitle: "Samouraïs HAJIME !",
    icon: "竜",
    url: "index.html"
  },
  menu: [
    {
      label: "Accueil",
      url: "index.html"
    },
    {
      label: "Campagne",
      icon: "巻",
      children: [
        { label: "📜 Tous les 10 Actes", url: "campagne.html" },
        { label: "🔊 Acte 1 : Championnat de Topaze", url: "campagne/scenario-1.html" },
        { label: "🔊 Acte 2 : Château de Kyoteï", url: "campagne/scenario-2.html" },
        { label: "🔊 Acte 3 : Le dernier voyage", url: "campagne/scenario-3.html" },
        { label: "➕ Déposer un Scénario (Upload)", url: "campagne-ajouter.html" },
        { label: "⚙️ Administration CMS", url: "admin/index.html" }
      ]
    },
    {
      label: "Outils",
      icon: "⚙️",
      children: [
        { label: "⚔️ Forge de Personnage", url: "createcharacter.html" },
        { label: "📜 Grimoire des Sorts & Kihos", url: "grimoire.html" },
        { label: "📖 Carnet de Rokugan", url: "https://nelsio.github.io/carnet-l5r/", external: true }
      ]
    },
    {
      label: "Les Huit Clans",
      icon: "🏯",
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
      label: "Aides de Jeu",
      icon: "📜",
      children: [
        { label: "⚔️ Mémento de Combat", url: "aides/combat-memento.html" },
        { label: "⚖️ Bushido & Honneur", url: "aides/bushido-honneur.html" },
        { label: "🎎 Étiquette & Coutumes", url: "aides/etiquette-coutumes.html" }
      ]
    },
    {
      label: "Carnet de Rokugan",
      url: "https://nelsio.github.io/carnet-l5r/",
      external: true,
      isPill: true
    }
  ],
  actionButton: {
    label: "⚡ FORGER",
    url: "createcharacter.html"
  }
};

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

    let navHtml = `
      <nav class="bg-[#0a0808]/95 backdrop-blur-md border-b border-amber-500/40 text-stone-300 text-xs shadow-2xl relative z-50">
        <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          
          <!-- LOGO & TITRE -->
          <a href="${resolveUrl(NAV_CONFIG.brand.url)}" class="flex items-center gap-2.5 group shrink-0">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-extrabold font-imperial text-xs shadow">
              ${NAV_CONFIG.brand.icon}
            </span>
            <div class="leading-tight">
              <span class="font-imperial font-bold tracking-widest text-amber-200 text-xs sm:text-sm group-hover:text-amber-300 transition block">
                ${NAV_CONFIG.brand.name}
              </span>
              <span class="text-[8px] text-stone-500 tracking-wider uppercase block font-sans">
                ${NAV_CONFIG.brand.subtitle}
              </span>
            </div>
          </a>

          <!-- LIENS DU MENU (DESKTOP) -->
          <div class="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
    `;

    NAV_CONFIG.menu.forEach((item, idx) => {
      if (item.children) {
        navHtml += `
          <div class="nav-dropdown-wrapper relative" data-dropdown-id="${idx}">
            <button type="button" class="nav-dropdown-trigger px-2.5 py-1.5 rounded hover:bg-[#181212] text-stone-300 hover:text-amber-200 transition font-medium flex items-center gap-1 cursor-pointer">
              <span>${item.icon ? `${item.icon} ` : ""}${item.label}</span>
              <span class="text-[8px] text-stone-500 transition-transform duration-200 arrow-icon">▼</span>
            </button>
            
            <div class="nav-dropdown-menu hidden absolute left-0 top-full pt-1.5 w-64 z-50">
              <div class="rounded-xl bg-[#120d0d] border border-amber-500/40 shadow-2xl py-1.5 overflow-hidden">
                ${item.children.map(sub => {
                  const kanjiBadge = sub.kanji ? `
                    <span class="w-6 h-6 rounded flex items-center justify-center font-serif font-bold text-sm mr-2.5 bg-black/70 border border-stone-800" style="color: ${sub.color}; text-shadow: 0 0 6px ${sub.color}40;">
                      ${sub.kanji}
                    </span>` : "";
                  return `
                    <a href="${resolveUrl(sub.url)}" 
                       ${sub.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
                       class="block px-3.5 py-2 text-xs text-stone-300 hover:bg-[#201414] hover:text-amber-200 transition flex items-center">
                      ${kanjiBadge}<span>${sub.label}</span>
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
             class="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-[#160d0d] hover:bg-[#241313] text-amber-300 hover:text-amber-200 transition font-bold flex items-center gap-1.5 shadow-sm">
            <span>📖</span>
            <span>${item.label}</span>
          </a>
        `;
      } else {
        navHtml += `
          <a href="${resolveUrl(item.url)}" class="px-2.5 py-1.5 rounded hover:bg-[#181212] text-stone-300 hover:text-amber-200 transition font-medium">
            ${item.label}
          </a>
        `;
      }
    });

    navHtml += `
          </div>

          <!-- BOUTON FORGER + BOUTON MENU MOBILE -->
          <div class="flex items-center gap-2">
            <a href="${resolveUrl(NAV_CONFIG.actionButton.url)}" 
               class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold font-imperial text-xs tracking-wider shadow-md transition transform hover:scale-105 shrink-0">
              ${NAV_CONFIG.actionButton.label}
            </a>
            <button type="button" id="mobile-menu-btn" class="lg:hidden p-1.5 rounded bg-stone-900 border border-amber-500/40 text-amber-300 hover:bg-stone-800 text-sm font-bold px-2.5" aria-label="Menu">
              ☰
            </button>
          </div>

        </div>

        <!-- PANNEAU DÉROULANT MOBILE / TABLETTE -->
        <div id="mobile-menu-panel" class="hidden lg:hidden border-t border-amber-500/30 bg-[#0e0a0a] px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
          ${NAV_CONFIG.menu.map(item => {
            if (item.children) {
              return `
                <div class="space-y-1">
                  <div class="text-[10px] font-bold font-imperial text-amber-400 uppercase tracking-wider">${item.icon || ""} ${item.label}</div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 border-l border-amber-500/20">
                    ${item.children.map(sub => `
                      <a href="${resolveUrl(sub.url)}" ${sub.external ? 'target="_blank" rel="noopener noreferrer"' : ""} class="py-1 px-2 rounded hover:bg-stone-900 text-stone-300 hover:text-amber-200 block text-xs">
                        ${sub.kanji ? `<b style="color:${sub.color}" class="mr-1.5">${sub.kanji}</b>` : ""}${sub.label}
                      </a>
                    `).join("")}
                  </div>
                </div>
              `;
            }
            return `
              <a href="${resolveUrl(item.url)}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""} class="block py-1.5 font-bold text-amber-200 hover:text-amber-300">
                ${item.label}
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
        else menu.classList.add("hidden");
      });
    });

    // Gestion du bouton Hamburger Mobile
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
