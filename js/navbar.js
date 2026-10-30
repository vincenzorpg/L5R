/**
 * js/navbar.js — Barre de navigation globale et dynamique
 * Campagne L5R — MJ David
 */

// =============================================================================
// 1. CONFIGURATION DYNAMIQUE DU MENU (Ajoutez vos futures pages ici)
// =============================================================================
const NAV_CONFIG = {
  brand: {
    name: "ROKUGAN",
    subtitle: "CHRONIQUES DU MJ DAVID",
    icon: "竜",
    url: "index.html"
  },
  menu: [
    {
      label: "Accueil",
      url: "index.html"
    },
    {
      label: "Outils",
      icon: "⚙️",
      children: [
        { label: "⚔️ Forge de Personnage", url: "createcharacter.html" },
        { label: "📜 Grimoire des Sorts", url: "grimoire.html" },
        { label: "📖 Carnet de Rokugan", url: "https://nelsio.github.io/carnet-l5r/", external: true }
      ]
    },
    {
      label: "Les Huit Clans",
      icon: "🏯",
      children: [
        { label: "🦀 Clan du Crabe", url: "clans/crabe.html" },
        { label: "🪶 Clan de la Grue", url: "clans/grue.html" },
        { label: "🐉 Clan du Dragon", url: "clans/dragon.html" },
        { label: "🦁 Clan du Lion", url: "clans/lion.html" },
        { label: "🦗 Clan de la Mante", url: "clans/mante.html" },
        { label: "🔥 Clan du Phénix", url: "clans/phenix.html" },
        { label: "🦂 Clan du Scorpion", url: "clans/scorpion.html" },
        { label: "🦄 Clan de la Licorne", url: "clans/licorne.html" }
      ]
    },
    {
      label: "Aides de Jeu",
      icon: "📜",
      children: [
        { label: "⚔️ Mémento de Combat", url: "aides/combat-memento.html" },
        { label: "⚡ Duels d'Iaijutsu", url: "aides/duels.html" },
        { label: "⚖️ Honneur & Gloire", url: "aides/honneur-gloire.html" }
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

// =============================================================================
// 2. MOTEUR DE GÉNÉRATION & GESTION DES CHEMINS RELATIFS
// =============================================================================
(function () {
  // Ajuste automatiquement les chemins relatifs selon la profondeur du dossier
  function resolveUrl(targetUrl) {
    if (!targetUrl || targetUrl.startsWith("http://") || targetUrl.startsWith("https://") || targetUrl.startsWith("#")) {
      return targetUrl;
    }
    const path = window.location.pathname;
    const isSubfolder = path.includes("/aides/") || path.includes("/clans/") || (path.split("/").length > 3 && !path.endsWith("/L5R/"));
    return isSubfolder ? `../${targetUrl}` : targetUrl;
  }

  function buildNavbar() {
    const header = document.getElementById("site-header");
    if (!header) return;

    let navHtml = `
      <nav class="bg-[#0a0808]/95 backdrop-blur-md border-b border-amber-500/30 text-stone-300 text-xs shadow-2xl relative z-50">
        <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          
          <!-- LOGO & TITRE -->
          <a href="${resolveUrl(NAV_CONFIG.brand.url)}" class="flex items-center gap-2.5 group shrink-0">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-extrabold font-imperial text-xs shadow">
              ${NAV_CONFIG.brand.icon}
            </span>
            <div class="leading-tight">
              <span class="font-imperial font-bold tracking-widest text-amber-200 text-sm group-hover:text-amber-300 transition block">
                ${NAV_CONFIG.brand.name}
              </span>
              <span class="text-[8px] text-stone-500 tracking-wider uppercase block font-sans">
                ${NAV_CONFIG.brand.subtitle}
              </span>
            </div>
          </a>

          <!-- LIENS DE NAVIGATION CENTRAUX -->
          <div class="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
    `;

    // Génération dynamique des éléments
    NAV_CONFIG.menu.forEach((item, idx) => {
      if (item.children) {
        // Menu déroulant
        navHtml += `
          <div class="nav-dropdown-wrapper relative" data-dropdown-id="${idx}">
            <button type="button" class="nav-dropdown-trigger px-2.5 py-1.5 rounded hover:bg-stone-900 text-stone-300 hover:text-amber-200 transition font-medium flex items-center gap-1 cursor-pointer">
              <span>${item.icon ? `${item.icon} ` : ""}${item.label}</span>
              <span class="text-[8px] text-stone-500 transition-transform duration-200 arrow-icon">▼</span>
            </button>
            
            <!-- Panneau déroulant avec pont de survol invisible (évite la fermeture intempestive) -->
            <div class="nav-dropdown-menu hidden absolute left-0 top-full pt-1.5 w-56 z-50">
              <div class="rounded-xl bg-[#120e0e]/98 border border-amber-500/35 shadow-2xl py-1.5 backdrop-blur-md overflow-hidden">
                ${item.children.map(sub => `
                  <a href="${resolveUrl(sub.url)}" 
                     ${sub.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
                     class="block px-3.5 py-2 text-xs text-stone-300 hover:bg-amber-950/60 hover:text-amber-200 transition flex items-center justify-between">
                    <span>${sub.label}</span>
                  </a>
                `).join("")}
              </div>
            </div>
          </div>
        `;
      } else if (item.isPill) {
        // Bouton spécial Carnet de Rokugan (sans flèche)
        navHtml += `
          <a href="${resolveUrl(item.url)}" 
             ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
             class="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 hover:text-amber-200 transition font-bold flex items-center gap-1.5 shadow-sm">
            <span>📖</span>
            <span>${item.label}</span>
          </a>
        `;
      } else {
        // Lien simple
        navHtml += `
          <a href="${resolveUrl(item.url)}" class="px-2.5 py-1.5 rounded hover:bg-stone-900 text-stone-300 hover:text-amber-200 transition font-medium">
            ${item.label}
          </a>
        `;
      }
    });

    // Bouton d'action Forger
    navHtml += `
          </div>

          <div class="flex items-center gap-2">
            <a href="${resolveUrl(NAV_CONFIG.actionButton.url)}" 
               class="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold font-imperial text-xs tracking-wider shadow-md transition transform hover:scale-105 shrink-0">
              ${NAV_CONFIG.actionButton.label}
            </a>
          </div>

        </div>
      </nav>
    `;

    header.innerHTML = navHtml;
    attachMenuEvents();
  }

  // =============================================================================
  // 3. LOGIQUE D'OUVERTURE / FERMETURE AVEC TAMPON DE DÉLAI
  // =============================================================================
  function attachMenuEvents() {
    const dropdownWrappers = document.querySelectorAll(".nav-dropdown-wrapper");

    dropdownWrappers.forEach(wrapper => {
      const trigger = wrapper.querySelector(".nav-dropdown-trigger");
      const menu = wrapper.querySelector(".nav-dropdown-menu");
      const arrow = wrapper.querySelector(".arrow-icon");
      let leaveTimeout = null;

      function openMenu() {
        clearTimeout(leaveTimeout);
        // Ferme les autres sous-menus
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
        }, 200); // 200ms de confort : empêche la disparition en cas de mouvement rapide
      }

      // Événements Souris (Desktop)
      wrapper.addEventListener("mouseenter", openMenu);
      wrapper.addEventListener("mouseleave", closeMenuWithDelay);

      // Événement Clic / Tactile (Mobile)
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.contains("hidden");
        if (isHidden) openMenu();
        else menu.classList.add("hidden");
      });
    });

    // Clic extérieur pour fermer les menus
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
