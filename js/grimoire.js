/**
 * js/grimoire.js — Moteur interactif du Grimoire L5R 4e Édition
 * 
 * Correctifs appliqués :
 * 1. Protection XSS stricte : construction des badges de filtres en DOM natif avec textContent.
 * 2. Unification du Rang de Maîtrise : lecture prioritaire de spell.mastery / rang / rank ("Universel" -> 0).
 * 3. Scope et événements : attachement dynamique des écouteurs addEventListener sur les boutons ✕ et exposition globale sur window.
 */

(function () {
  let isMahoUnlocked = false;

  // Normalisation Unicode : minuscules, suppression des accents et espaces superflus
  function normalizeText(str) {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // Échappement HTML préventif pour injection sécurisée
  function escapeHtml(str) {
    return (str || "").toString().replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c];
    });
  }

  // Slug stable pour les ancres (#sort-<id>)
  function slugify(text) {
    return normalizeText(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Résolution canonique du rang de maîtrise (supporte mastery, rang, rank, et la valeur "universel")
  function getRank(spell) {
    const r = spell.rang ?? spell.rank ?? spell.mastery ?? 0;
    return normalizeText(r) === "universel" ? 0 : (parseInt(r, 10) || 0);
  }

  // Récupération universelle des sorts
  function getSpellsData() {
    const raw = window.SORTS_DATA || window.GRIMOIRE_DATA || [];
    if (Array.isArray(raw)) return raw;
    return Object.values(raw).filter(v => v && typeof v === "object");
  }

  // Extraction uniforme de l'élément en minuscules
  function getSpellElement(spell) {
    if (spell.isMaho) return "maho";
    const raw = spell.element || spell.anneau || spell.ring || spell.elem || "";
    const norm = normalizeText(raw);

    if (norm.includes("terre") || norm.includes("earth")) return "terre";
    if (norm.includes("eau") || norm.includes("water")) return "eau";
    if (norm.includes("feu") || norm.includes("fire")) return "feu";
    if (norm.includes("air")) return "air";
    if (norm.includes("vide") || norm.includes("void")) return "vide";
    if (norm.includes("kiho") || spell.isKiho) return "kiho";
    if (norm.includes("maho")) return "maho";
    if (norm.includes("universel") || norm.includes("universal")) return "universel";

    return norm || "universel";
  }

  // Classe CSS selon l'élément
  function getElementBadgeClass(element) {
    switch (element) {
      case "terre": return "badge-terre";
      case "eau": return "badge-eau";
      case "feu": return "badge-feu";
      case "air": return "badge-air";
      case "vide": return "badge-vide";
      case "universel": return "badge-universel";
      case "kiho": return "badge-kiho";
      case "maho": return "badge-maho";
      default: return "badge-universel";
    }
  }

  // =========================================================================
  // APPLICATION DES FILTRES ET RENDU
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
    const selectedElement = normalizeText(elementSelect.value);
    const selectedRank = rankSelect.value;

    const allSpells = getSpellsData();

    // 1. Filtrage Mahō (masqué sans mot de passe)
    let filtered = allSpells.filter(spell => {
      const el = getSpellElement(spell);
      if (el === "maho" && !isMahoUnlocked) return false;
      return true;
    });

    // 2. Filtre par Élément
    if (selectedElement !== "tous") {
      filtered = filtered.filter(spell => getSpellElement(spell) === selectedElement);
    }

    // 3. Filtre par Rang de Maîtrise
    if (selectedRank !== "tous") {
      const targetRank = parseInt(selectedRank, 10);
      filtered = filtered.filter(spell => getRank(spell) === targetRank);
    }

    // 4. Recherche texte tolérante (nom, desc, mots-clés, portée)
    if (query !== "") {
      filtered = filtered.filter(spell => {
        const nom = normalizeText(spell.name || spell.nom);
        const desc = normalizeText(spell.desc || spell.description || spell.effet);
        const mots = normalizeText(Array.isArray(spell.keywords || spell.motsCles) 
          ? (spell.keywords || spell.motsCles).join(" ") 
          : (spell.keywords || spell.motsCles));
        const portee = normalizeText(spell.range || spell.portee);

        return nom.includes(query) || desc.includes(query) || mots.includes(query) || portee.includes(query);
      });
    }

    // 5. Compteur de résultats
    if (counter) counter.textContent = filtered.length;

    // 6. Rendu des cartes de sorts
    container.innerHTML = "";
    if (filtered.length === 0) {
      if (noResults) noResults.classList.remove("hidden");
    } else {
      if (noResults) noResults.classList.add("hidden");

      filtered.forEach(spell => {
        const spellName = spell.name || spell.nom || "Sort sans nom";
        const primaryId = spell.id || slugify(spellName);
        const cardId = `sort-${primaryId}`;
        const nameSlug = slugify(spellName);

        const spellElem = getSpellElement(spell);
        const spellRank = getRank(spell);
        const badgeClass = getElementBadgeClass(spellElem);
        const rankLabel = spellRank === 0 ? "(Universel)" : `— Rang ${spellRank}`;

        const keywordsRaw = spell.keywords || spell.motsCles;
        const keywordsStr = Array.isArray(keywordsRaw) ? keywordsRaw.join(", ") : (keywordsRaw || "");

        const card = document.createElement("article");
        card.id = cardId;
        card.setAttribute("data-alias", `sort-${nameSlug}`);
        card.className = "card-spell rounded-xl p-4 flex flex-col justify-between space-y-3 relative";

        card.innerHTML = `
          <div>
            <!-- En-tête -->
            <div class="flex justify-between items-start gap-2 border-b border-stone-800/80 pb-2">
              <div>
                <h2 class="font-bold font-imperial text-amber-200 text-sm md:text-base leading-tight">
                  <a href="#${escapeHtml(cardId)}" class="hover:underline hover:text-amber-300" title="Lien direct vers ce sort">
                    ${escapeHtml(spellName)}
                  </a>
                </h2>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${badgeClass}">
                    ${escapeHtml(spellElem.toUpperCase())} ${escapeHtml(rankLabel)}
                  </span>
                  ${keywordsStr ? `<span class="text-[9px] text-stone-500 italic">[${escapeHtml(keywordsStr)}]</span>` : ""}
                </div>
              </div>
              <button 
                type="button"
                onclick="copySpellDirectLink('${escapeHtml(cardId)}')" 
                class="text-stone-500 hover:text-amber-300 text-xs p-1" 
                title="Copier le lien permanent de ce sort"
              >
                🔗
              </button>
            </div>

            <!-- Caractéristiques techniques -->
            <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-stone-400 mt-2 bg-black/40 p-2 rounded border border-stone-900">
              <div><b class="text-stone-300">Portée :</b> ${escapeHtml(spell.range || spell.portee || "Personnelle")}</div>
              <div><b class="text-stone-300">Zone :</b> ${escapeHtml(spell.area || spell.zone || "1 cible")}</div>
              <div><b class="text-stone-300">Durée :</b> ${escapeHtml(spell.duration || spell.duree || "Instantanée")}</div>
              <div><b class="text-stone-300">Augmentations :</b> ${escapeHtml(spell.raises || spell.augmentations || "Aucune")}</div>
            </div>

            <!-- Description / Effet -->
            <div class="mt-2.5 text-stone-300 text-xs leading-relaxed space-y-1.5">
              <p>${escapeHtml(spell.desc || spell.description || spell.effet || "")}</p>
            </div>
          </div>

          <!-- Pied de carte -->
          <div class="pt-2 border-t border-stone-900 text-[9px] text-stone-600 flex justify-between items-center">
            <span>${escapeHtml(spell.source || "Livre de Base 4e Édition")}</span>
            <span class="text-[8px] font-mono text-stone-700">#${escapeHtml(cardId)}</span>
          </div>
        `;

        container.appendChild(card);
      });
    }

    renderActiveFilterBadges();
  }

  // =========================================================================
  // GESTION SÉCURISÉE DES BADGES (ANTI-XSS & ÉCOUTEURS LOCAUX)
  // =========================================================================
  function renderActiveFilterBadges() {
    const container = document.getElementById("active-filters-badges");
    if (!container) return;

    container.innerHTML = "";
    const searchInput = document.getElementById("search-input");
    const elementSelect = document.getElementById("element-select");
    const rankSelect = document.getElementById("rank-select");

    // Badge 1 : Texte de recherche (?q=) — Protection XSS via textContent
    const queryVal = searchInput ? searchInput.value.trim() : "";
    if (queryVal) {
      const badge = document.createElement("span");
      badge.className = "px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 text-[10px] flex items-center gap-1";

      const textNode = document.createTextNode(`« ${queryVal} »`);
      badge.appendChild(textNode);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hover:text-white font-bold ml-1 cursor-pointer";
      btn.textContent = "✕";
      btn.title = "Effacer la recherche";
      btn.addEventListener("click", () => {
        searchInput.value = "";
        applyFilters();
        syncFiltersToURL();
      });

      badge.appendChild(btn);
      container.appendChild(badge);
    }

    // Badge 2 : Élément (?el=)
    if (elementSelect && elementSelect.value !== "tous") {
      const badge = document.createElement("span");
      badge.className = "px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 text-[10px] flex items-center gap-1";

      const label = elementSelect.options[elementSelect.selectedIndex]?.text || elementSelect.value.toUpperCase();
      badge.appendChild(document.createTextNode(label));

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hover:text-white font-bold ml-1 cursor-pointer";
      btn.textContent = "✕";
      btn.title = "Réinitialiser l'élément";
      btn.addEventListener("click", () => {
        elementSelect.value = "tous";
        applyFilters();
        syncFiltersToURL();
      });

      badge.appendChild(btn);
      container.appendChild(badge);
    }

    // Badge 3 : Rang de Maîtrise (?rang=)
    if (rankSelect && rankSelect.value !== "tous") {
      const badge = document.createElement("span");
      badge.className = "px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 text-[10px] flex items-center gap-1";

      const label = parseInt(rankSelect.value, 10) === 0 ? "Universel" : `Rang ${rankSelect.value}`;
      badge.appendChild(document.createTextNode(label));

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hover:text-white font-bold ml-1 cursor-pointer";
      btn.textContent = "✕";
      btn.title = "Réinitialiser le rang";
      btn.addEventListener("click", () => {
        rankSelect.value = "tous";
        applyFilters();
        syncFiltersToURL();
      });

      badge.appendChild(btn);
      container.appendChild(badge);
    }
  }

  // =========================================================================
  // SYNCHRONISATION URL (SEARCH PARAMS & ANCRES)
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

    const qParam = p.get("q");
    if (qParam !== null && searchInput) {
      searchInput.value = qParam;
    }

    const elParam = p.get("el");
    if (elParam && elementSelect) {
      const elLower = normalizeText(elParam);
      if (elLower === "maho") {
        if (isMahoUnlocked) elementSelect.value = "maho";
      } else {
        const option = elementSelect.querySelector(`option[value="${CSS.escape(elLower)}"]`);
        if (option) elementSelect.value = elLower;
      }
    }

    const rangParam = p.get("rang");
    if (rangParam !== null && rankSelect) {
      const option = rankSelect.querySelector(`option[value="${CSS.escape(rangParam)}"]`);
      if (option) rankSelect.value = rangParam;
    }

    applyFilters();
    handleHashNavigation();
  }

  function handleHashNavigation() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith("#sort-")) return;

    const targetId = hash.slice(1);
    let targetElement = document.getElementById(targetId);
    if (!targetElement) {
      targetElement = document.querySelector(`[data-alias="${CSS.escape(targetId)}"]`);
    }

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.classList.remove("sort-highlight");
        void targetElement.offsetWidth;
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

    const pwd = (input?.value || "").trim().toLowerCase();

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

  window.copySpellDirectLink = function (cardId) {
    const url = `${window.location.origin}${window.location.pathname}#${cardId}`;
    navigator.clipboard.writeText(url).then(() => {
      window.location.hash = cardId;
      handleHashNavigation();
    }).catch(() => {
      window.location.hash = cardId;
    });
  };

  // Exposition globale pour prévenir toute ReferenceError externe
  window.applyFilters = applyFilters;
  window.syncFiltersToURL = syncFiltersToURL;

  // =========================================================================
  // INITIALISATION AU CHARGEMENT DU DOM
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

    initFromURL();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
