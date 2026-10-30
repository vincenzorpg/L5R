/**
 * js/navbar.js — Barre de navigation globale
 * Injecte le menu sur l'ensemble des pages via <header id="site-header"></header>
 */

(function () {
  function renderNavbar() {
    const header = document.getElementById("site-header");
    if (!header) return;

    // Détection du chemin relatif (racine)
    const isRoot = window.location.pathname.endsWith("/") || 
                   window.location.pathname.endsWith("/index.html") || 
                   !window.location.pathname.includes("/");

    header.innerHTML = `
      <nav class="bg-[#0d0b0b]/95 backdrop-blur-md border-b border-amber-500/30 text-stone-300 text-xs shadow-xl sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          
          <!-- LOGO & TITRE -->
          <a href="index.html" class="flex items-center gap-2.5 group">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-extrabold font-imperial text-xs shadow">
              竜
            </span>
            <div class="leading-tight">
              <span class="font-imperial font-bold tracking-widest text-amber-200 text-sm group-hover:text-amber-300 transition block">
                ROKUGAN
              </span>
              <span class="text-[9px] text-stone-500 tracking-wider uppercase block font-sans">
                Chroniques du MJ David
              </span>
            </div>
          </a>

          <!-- LIENS DE NAVIGATION (DESKTOP) -->
          <div class="hidden md:flex items-center gap-1 lg:gap-2">
            <a href="index.html" class="px-2.5 py-1.5 rounded hover:bg-stone-900 hover:text-amber-200 transition font-medium">
              Accueil
            </a>

            <!-- MENU DÉROULANT OUTILS -->
            <div class="relative group">
              <button type="button" class="px-2.5 py-1.5 rounded hover:bg-stone-900 hover:text-amber-200 transition flex items-center gap-1 font-medium">
                <span>⚙️ Outils</span>
                <span class="text-[9px] text-stone-500 group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div class="absolute left-0 mt-1 w-52 rounded-lg bg-[#120e0e] border border-amber-500/30 shadow-2xl py-1 hidden group-hover:block z-50">
                <a href="createcharacter.html" class="block px-3 py-2 text-xs hover:bg-amber-950/40 hover:text-amber-200">
                  ⚔️ Forge de Personnage
                </a>
                <a href="grimoire.html" class="block px-3 py-2 text-xs hover:bg-amber-950/40 hover:text-amber-200">
                  📜 Grimoire des Sorts
                </a>
                <div class="border-t border-stone-800 my-1"></div>
                <a href="https://nelsio.github.io/carnet-l5r/" target="_blank" rel="noopener noreferrer" class="block px-3 py-2 text-xs text-amber-300 hover:bg-amber-950/40 font-bold flex items-center justify-between">
                  <span>📖 Carnet de Rokugan</span>
                  <span class="text-[10px] text-stone-500">↗</span>
                </a>
              </div>
            </div>

            <!-- LIEN DIRECT VERS LE CARNET DE ROKUGAN -->
            <a 
              href="https://nelsio.github.io/carnet-l5r/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="px-2.5 py-1.5 rounded border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/40 text-amber-300 hover:text-amber-200 transition font-bold flex items-center gap-1.5"
              title="Ouvrir le Carnet de Rokugan (Gestionnaire de fiches de jeu en ligne)"
            >
              <span>📖 Carnet de Rokugan</span>
              <span class="text-[10px] text-stone-400">↗</span>
            </a>

            <a href="grimoire.html" class="px-2.5 py-1.5 rounded hover:bg-stone-900 hover:text-amber-200 transition font-medium">
              Grimoire
            </a>
          </div>

          <!-- BOUTON D'ACTION PRINCIPAL -->
          <div class="flex items-center gap-2">
            <a 
              href="createcharacter.html" 
              class="px-3 py-1.5 rounded bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold font-imperial text-xs tracking-wider shadow-md transition"
            >
              ⚡ Forger
            </a>
          </div>

        </div>
      </nav>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
  } else {
    renderNavbar();
  }
})();
