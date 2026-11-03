/**
 * js/navbar.js — Barre de navigation globale simplifiée
 * Les Chroniques de Rokugan — Campagne L5R 4e Édition (MJ David)
 */

(function () {
  function renderNavbar() {
    const header = document.getElementById("site-header");
    if (!header) return;

    // Détection de la profondeur relative du dossier (ex: /campagne/ ou racine)
    const isSubDir = window.location.pathname.includes("/campagne/") || 
                     window.location.pathname.includes("/clans/") || 
                     window.location.pathname.includes("/aides/");
    const base = isSubDir ? "../" : "";

    header.className = "sticky top-0 z-50 bg-[#0a0808]/95 backdrop-blur-md border-b border-amber-500/30 shadow-xl";
    header.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          
          <!-- Logo & Titre -->
          <a href="${base}index.html" class="flex items-center gap-2.5 group">
            <span class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-amber-400/60 flex items-center justify-center font-serif text-black font-extrabold text-sm shadow group-hover:scale-105 transition">
              竜
            </span>
            <div class="flex flex-col">
              <span class="font-imperial font-bold text-amber-200 tracking-wider text-xs sm:text-sm group-hover:text-amber-300 transition">
                CHRONIQUES DE ROKUGAN
              </span>
              <span class="text-[9px] text-stone-500 font-mono tracking-widest hidden sm:inline">
                L5R 4E ÉDITION • MJ DAVID
              </span>
            </div>
          </a>

          <!-- Navigation Bureau -->
          <nav class="hidden md:flex items-center gap-1 text-xs font-imperial">
            <a href="${base}index.html" class="px-3 py-1.5 rounded-md text-stone-300 hover:text-amber-200 hover:bg-stone-900 transition">
              Accueil
            </a>
            <a href="${base}campagne.html" class="px-3 py-1.5 rounded-md text-stone-300 hover:text-amber-200 hover:bg-stone-900 transition">
              Scénarios (1 à 10)
            </a>
            <a href="${base}createcharacter.html" class="px-3 py-1.5 rounded-md text-amber-400 hover:text-amber-200 hover:bg-stone-900 transition font-bold">
              ⚔️ Forge Personnage
            </a>
            <a href="${base}grimoire.html" class="px-3 py-1.5 rounded-md text-stone-300 hover:text-amber-200 hover:bg-stone-900 transition">
              📜 Grimoire des Sorts
            </a>
            <a href="${base}aides/combat-memento.html" class="px-3 py-1.5 rounded-md text-stone-300 hover:text-amber-200 hover:bg-stone-900 transition">
              Mémento Règles
            </a>
            <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="ml-2 px-3 py-1.5 rounded-md bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 transition font-bold flex items-center gap-1">
              <span>Carnet</span> <span>↗</span>
            </a>
          </nav>

          <!-- Bouton Menu Mobile -->
          <div class="flex md:hidden">
            <button type="button" id="mobile-menu-toggle" class="p-2 rounded-lg text-amber-300 hover:bg-stone-900 border border-stone-800 focus:outline-none" aria-label="Ouvrir le menu">
              ☰
            </button>
          </div>

        </div>
      </div>

      <!-- Volet Mobile Déroulant -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-amber-500/20 bg-black/95 px-4 pt-2 pb-4 space-y-1 text-xs font-imperial">
        <a href="${base}index.html" class="block px-3 py-2 rounded-md text-stone-300 hover:bg-stone-900 hover:text-amber-300">
          🏯 Accueil
        </a>
        <a href="${base}campagne.html" class="block px-3 py-2 rounded-md text-stone-300 hover:bg-stone-900 hover:text-amber-300">
          巻 Les 10 Scénarios de Campagne
        </a>
        <a href="${base}createcharacter.html" class="block px-3 py-2 rounded-md text-amber-300 font-bold hover:bg-stone-900">
          ⚔️ Forge de Personnage
        </a>
        <a href="${base}grimoire.html" class="block px-3 py-2 rounded-md text-stone-300 hover:bg-stone-900 hover:text-amber-300">
          📜 Grimoire des Sorts & Kihos
        </a>
        <a href="${base}aides/combat-memento.html" class="block px-3 py-2 rounded-md text-stone-300 hover:bg-stone-900 hover:text-amber-300">
          🥋 Mémento de Combat & Bushido
        </a>
        <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="block px-3 py-2 rounded-md text-emerald-400 font-bold hover:bg-stone-900">
          📖 Carnet de Rokugan ↗
        </a>
      </div>
    `;

    // Toggle menu mobile
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
  } else {
    renderNavbar();
  }
})();
