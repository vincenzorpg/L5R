/**
 * js/grimoire.js — Moteur interactif du Grimoire L5R 4e Édition
 * 
 * Fonctionnalités :
 * - Lecture et écriture d'URL : ?q=, ?el=, ?rang= et #sort-<id>
 * - Recherche tolérante (insensible aux accents, casse et ponctuation)
 * - Navigation fluide et mise en surbrillance automatique du sort ciblé
 * - Cloisonnement strict du Mahō sans mot de passe
 * - Synchronisation transparente avec history.replaceState
 */

(function () {
  let isMahoUnlocked = false;

  // Normalisation Unicode : suppression des accents, mise en minuscules
  function normalizeText(str) {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // Slug stable pour les ancres : "Frappe de jade" -> "frappe-de-jade"
  function slugify(text) {
    return normalizeText(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Récupération sécurisée et aplatissement universel des données de sorts
  function getSpellsData() {
    const raw = window.SORTS_DATA || window.GRIMOIRE_DATA || [];

    // Cas 1 : Déjà un tableau plat
    if (Array.isArray(raw)) {
      return raw;
    }

    // Cas 2 : Objet contenant des tableaux par élément { terre: [...], eau: [...] }
    const values = Object.values(raw);
    if (values.some(v => Array.isArray(v))) {
      let flat = [];
      Object.entries(raw).forEach(([elementKey, spellList]) => {
        if (Array.isArray(spellList)) {
          spellList.forEach(s => {
            // Assure la présence de l'élément si non défini dans l'objet sort
            if (!s.element && !s.el) s.element = elementKey;
            flat.push(s);
          });
        }
      });
      return flat;
    }

    // Cas 3 : Dictionnaire d'objets indexé par ID { "sentir": { nom: "Sentir", ... } }
    return values.filter(v => v && typeof v === "object");
  }

  // =========================================================================
  // GESTION DU FILTRAGE ET DU RENDU
  // =========================================================================
  function applyFilters() {
    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");
    const container = document.getElementById("spells-container");
    const noResults = document.getElementById("no-results");
    const counter = document.getElementById("results-count");

    if (!searchInput || !elementSelect || !rankSelect || !container) return;

    const query = normalizeText(searchInput.value);
    const selectedElement = elementSelect.value.toLowerCase();
    const selectedRank = rankSelect.value;

    const allSpells = getSpellsData();

    // 1. Filtrage strict du Mahō : masqué tant que le sceau n'est pas levé
    let filtered = allSpells.filter(spell => {
      const isMahoSpell = (spell.element?.toLowerCase() === "maho") || spell.isMaho === true;
      if (isMahoSpell && !isMahoUnlocked) {
        return false;
      }
      return true;
    });

    // 2. Filtre par Élément
    if (selectedElement !== "tous") {
      filtered = filtered.filter(spell => (spell.element || "").toLowerCase() === selectedElement);
    }

    // 3. Filtre par Rang de Maîtrise
    if (selectedRank !== "tous") {
      const rNum = parseInt(selectedRank, 10);
      filtered = filtered.filter(spell => parseInt(spell.rang, 10) === rNum);
    }

    // 4. Recherche plein texte tolérante (nom, mots-clés, portée, effet)
    if (query !== "") {
      filtered = filtered.filter(spell => {
        const nomNorm = normalizeText(spell.nom);
        const descNorm = normalizeText(spell.description || spell.effet);
        const motsClesNorm = normalizeText(Array.isArray(spell.motsCles) ? spell.motsCles.join(" ") : spell.motsCles);
        const porteeNorm = normalizeText(spell.portee);

        return nomNorm.includes(query) ||
               descNorm.includes(query) ||
               motsClesNorm.includes(query) ||
               porteeNorm.includes(query);
      });
    }

    // 5. Mise à jour du compteur
    if (counter) counter.textContent = filtered.length;

    // 6. Affichage des cartes de sorts
    container.innerHTML = "";
    if (filtered.length === 0) {
      if (noResults) noResults.classList.remove("hidden");
    } else {
      if (noResults) noResults.classList.add("hidden");

      filtered.forEach(spell => {
        const cardId = `sort-${slugify(spell.nom)}`;
        const badgeClass = getElementBadgeClass(spell.element);
        const keywordsStr = Array.isArray(spell.motsCles) ? spell.motsCles.join(", ") : (spell.motsCles || "");

        const card = document.createElement("article");
        card.id = cardId;
        card.className = "card-spell rounded-xl p-4 flex flex-col justify-between space-y-3 relative";

        card.innerHTML = `
          <div>
            <!-- En-tête du Sort -->
            <div class="flex justify-between items-start gap-2 border-b border-stone-800/80 pb-2">
              <div>
                <h2 class="font-bold font-imperial text-amber-200 text-sm md:text-base leading-tight">
                  <a href="#${cardId}" class="hover:underline hover:text-amber-300" title="Lien direct vers ce sort">
                    ${spell.nom}
                  </a>
                </h2>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${badgeClass}">
                    ${spell.element.toUpperCase()} ${parseInt(spell.rang) === 0 ? "(Universel)" : `— Rang ${spell.rang}`}
                  </span>
                  ${keywordsStr ? `<span class="text-[9px] text-stone-500 italic">[${keywordsStr}]</span>` : ""}
                </div>
              </div>
              <button 
                type="button"
                onclick="copySpellDirectLink('${cardId}')" 
                class="text-stone-500 hover:text-amber-300 text-xs p-1" 
                title="Copier le lien permanent de ce sort"
              >
                🔗
              </button>
            </div>

            <!-- Caractéristiques techniques -->
            <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-stone-400 mt-2 bg-black/40 p-2 rounded border border-stone-900">
              <div><b class="text-stone-300">Portée :</b> ${spell.portee || "Personnelle"}</div>
              <div><b class="text-stone-300">Zone :</b> ${spell.zone || "1 cible"}</div>
              <div><b class="text-stone-300">Durée :</b> ${spell.duree || "Instantanée"}</div>
              <div><b class="text-stone-300">Augmentations :</b> ${spell.augmentations || "Aucune"}</div>
            </div>

            <!-- Description / Effet officiel -->
            <div class="mt-2.5 text-stone-300 text-xs leading-relaxed space-y-1.5">
              <p>${spell.description || spell.effet || ""}</p>
            </div>
          </div>

          <!-- Note de bas de carte -->
          ${spell.source ? `
            <div class="pt-2 border-t border-stone-900 text-[9px] text-stone-600 flex justify-between items-center">
              <span>Source : ${spell.source}</span>
              <span class="text-[8px] font-mono text-stone-700">#${cardId}</span>
            </div>
          ` : ""}
        `;

        container.appendChild(card);
      });
    }

    renderActiveFilterBadges();
  }

  // Badges visuels récapitulatifs sous les filtres
  function renderActiveFilterBadges() {
    const container = document.getElementById("active-filters-badges");
    if (!container) return;

    container.innerHTML = "";
    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");

    if (searchInput && searchInput.value.trim()) {
      container.innerHTML += `
        <span class="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 text-[10px] flex items-center gap-1">
          « ${searchInput.value.trim()} »
          <button onclick="document.getElementById('search-input').value=''; applyFilters(); syncFiltersToURL();" class="hover:text-white font-bold ml-0.5">✕</button>
        </span>
      `;
    }
    if (elementSelect && elementSelect.value !== "tous") {
      container.innerHTML += `
        <span class="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 text-[10px] flex items-center gap-1">
          ${elementSelect.value.toUpperCase()}
          <button onclick="document.getElementById('element-select').value='tous'; applyFilters(); syncFiltersToURL();" class="hover:text-white font-bold ml-0.5">✕</button>
        </span>
      `;
    }
    if (rankSelect && rankSelect.value !== "tous") {
      container.innerHTML += `
        <span class="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 text-[10px] flex items-center gap-1">
          Rang ${rankSelect.value}
          <button onclick="document.getElementById('rank-select').value='tous'; applyFilters(); syncFiltersToURL();" class="hover:text-white font-bold ml-0.5">✕</button>
        </span>
      `;
    }
  }

  // =========================================================================
  // GESTION DES URLS : SEARCH PARAMS & ANCRES (#sort-<id>)
  // =========================================================================
  function syncFiltersToURL() {
    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");

    const params = new URLSearchParams();

    const qVal = searchInput?.value.trim();
    if (qVal) params.set("q", qVal);

    const elVal = elementSelect?.value;
    if (elVal && elVal !== "tous") {
      if (elVal !== "maho" || isMahoUnlocked) {
        params.set("el", elVal);
      }
    }

    const rankVal = rankSelect?.value;
    if (rankVal && rankVal !== "tous") {
      params.set("rang", rankVal);
    }

    const queryString = params.toString() ? `?${params.toString()}` : window.location.pathname;
    const hashString = window.location.hash || "";

    window.history.replaceState(null, "", `${queryString}${hashString}`);
  }

  function initFromURL() {
    const p = new URLSearchParams(window.location.search);

    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");

    // 1. Préremplissage du paramètre q
    const qParam = p.get("q");
    if (qParam !== null && searchInput) {
      searchInput.value = qParam;
    }

    // 2. Présélection de l'élément (el)
    const elParam = p.get("el");
    if (elParam && elementSelect) {
      const elLower = elParam.toLowerCase();
      if (elLower === "maho") {
        if (isMahoUnlocked) {
          elementSelect.value = "maho";
        }
      } else {
        const option = elementSelect.querySelector(`option[value="${CSS.escape(elLower)}"]`);
        if (option) elementSelect.value = elLower;
      }
    }

    // 3. Présélection du rang (rang)
    const rangParam = p.get("rang");
    if (rangParam !== null && rankSelect) {
      const option = rankSelect.querySelector(`option[value="${CSS.escape(rangParam)}"]`);
      if (option) rankSelect.value = rangParam;
    }

    // Exécution du filtrage
    applyFilters();

    // 4. Défilement automatique si une ancre #sort-<id> est présente
    handleHashNavigation();
  }

  function handleHashNavigation() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith("#sort-")) return;

    const targetId = hash.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.classList.remove("sort-highlight");
        void targetElement.offsetWidth; // Force reflow
        targetElement.classList.add("sort-highlight");
      }, 100);
    }
  }

  // =========================================================================
  // GESTION DU MAHŌ ET DU MOT DE PASSE
  // =========================================================================
  window.toggleMahoSecurityModal = function (forceState) {
    const modal = document.getElementById("maho-modal");
    const errorEl = document.getElementById("maho-error");
    const input = document.getElementById("maho-password-input");

    if (!modal) return;

    if (forceState !== undefined) {
      modal.classList.toggle("hidden", !forceState);
    } else {
      modal.classList.toggle("hidden");
    }

    if (errorEl) errorEl.classList.add("hidden");
    if (input) {
      input.value = "";
      if (!modal.classList.contains("hidden")) input.focus();
    }
  };

  window.unlockMahoWithPassword = function () {
    const input = document.getElementById("maho-password-input");
    const errorEl = document.getElementById("maho-error");
    const btnMaho = document.getElementById("btn-toggle-maho");
    const optMaho = document.getElementById("opt-maho");

    const pwd = (input?.value || "").trim().toLowerCase();

    // Mots de passe reconnus pour le Maître de Jeu / Mahō-tsukai
    if (pwd === "iuchiban" || pwd === "maho" || pwd === "jigoku" || pwd === "outremonde") {
      isMahoUnlocked = true;
      try {
        sessionStorage.setItem("l5r_maho_unlocked", "true");
      } catch (e) {}

      if (btnMaho) {
        btnMaho.textContent = "🩸";
        btnMaho.title = "Sceau de Mahō brisé (Actif)";
        btnMaho.className = "p-2.5 rounded bg-red-950 text-red-300 border border-red-700 text-xs";
      }

      window.toggleMahoSecurityModal(false);
      applyFilters();
      syncFiltersToURL();
    } else {
      if (errorEl) errorEl.classList.remove("hidden");
    }
  };

  // Réinitialisation complète
  window.resetAllFilters = function () {
    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");

    if (searchInput) searchInput.value = "";
    if (elementSelect) elementSelect.value = "tous";
    if (rankSelect) rankSelect.value = "tous";

    applyFilters();
    window.history.replaceState(null, "", window.location.pathname);
  };

  // Copie dans le presse-papier du lien direct d'un sort
  window.copySpellDirectLink = function (cardId) {
    const url = `${window.location.origin}${window.location.pathname}#${cardId}`;
    navigator.clipboard.writeText(url).then(() => {
      window.location.hash = cardId;
      handleHashNavigation();
    }).catch(() => {
      window.location.hash = cardId;
    });
  };

  // =========================================================================
  // INITIALISATION AU CHARGEMENT DE LA PAGE
  // =========================================================================
  function initApp() {
    try {
      if (sessionStorage.getItem("l5r_maho_unlocked") === "true") {
        isMahoUnlocked = true;
        const btnMaho = document.getElementById("btn-toggle-maho");
        if (btnMaho) {
          btnMaho.textContent = "🩸";
          btnMaho.title = "Sceau de Mahō brisé";
          btnMaho.className = "p-2.5 rounded bg-red-950 text-red-300 border border-red-700 text-xs";
        }
      }
    } catch (e) {}

    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        applyFilters();
        syncFiltersToURL();
      });
    }

    if (elementSelect) {
      elementSelect.addEventListener("change", () => {
        if (elementSelect.value === "maho" && !isMahoUnlocked) {
          elementSelect.value = "tous";
          window.toggleMahoSecurityModal(true);
          return;
        }
        applyFilters();
        syncFiltersToURL();
      });
    }

    if (rankSelect) {
      rankSelect.addEventListener("change", () => {
        applyFilters();
        syncFiltersToURL();
      });
    }

    window.addEventListener("hashchange", handleHashNavigation);

    // Initialisation depuis l'adresse
    initFromURL();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
