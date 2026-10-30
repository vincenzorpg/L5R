/**
 * js/grimoire.js — Moteur interactif du Grimoire L5R 4e Édition
 */

(function () {
  let isMahoUnlocked = false;

  function normalizeText(str) {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function slugify(text) {
    return normalizeText(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getSpellsData() {
    const raw = window.SORTS_DATA || window.GRIMOIRE_DATA || [];
    if (Array.isArray(raw)) return raw;
    return Object.values(raw).filter(v => v && typeof v === "object");
  }

  // Extraction fiable de l'élément
  function getSpellElement(spell) {
    if (spell.isMaho) return "maho";
    const raw = spell.element || spell.anneau || spell.ring || spell.elem || spell.type || "";
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

  // Extraction du rang (supporte nombres, chaînes "Rang X" et chiffres romains I-VI)
  function getSpellRank(spell) {
    if (typeof spell.rang === "number") return spell.rang;
    if (typeof spell.maitrise === "number") return spell.maitrise;

    function parseVal(val) {
      if (typeof val === "number") return val;
      if (!val) return null;
      const str = val.toString().trim();
      const m = str.match(/\b([0-6])\b/) || str.match(/\d+/);
      if (m) return parseInt(m[0] || m[1], 10);

      const u = str.toUpperCase();
      if (/\bVI\b/.test(u)) return 6;
      if (/\bV\b/.test(u)) return 5;
      if (/\bIV\b/.test(u)) return 4;
      if (/\bIII\b/.test(u)) return 3;
      if (/\bII\b/.test(u)) return 2;
      if (/\bI\b/.test(u)) return 1;
      return null;
    }

    for (const [key, val] of Object.entries(spell)) {
      if (val === undefined || val === null || typeof val === "function") continue;
      const nk = normalizeText(key);
      if (nk.includes("rang") || nk.includes("maitr") || nk.includes("rank") || nk.includes("level") || nk.includes("niveau")) {
        const parsed = parseVal(val);
        if (parsed !== null) return parsed;
      }
    }

    const ringStr = (spell.anneau || spell.element || spell.nom || spell.name || "").toString();
    const ringParsed = parseVal(ringStr);
    if (ringParsed !== null) return ringParsed;

    return 0;
  }

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
      filtered = filtered.filter(spell => getSpellRank(spell) === targetRank);
    }

    // 4. Recherche texte tolérante
    if (query !== "") {
      filtered = filtered.filter(spell => {
        const nom = normalizeText(spell.nom || spell.name);
        const desc = normalizeText(spell.description || spell.effet || spell.effect || spell.desc);
        const mots = normalizeText(Array.isArray(spell.motsCles || spell.keywords || spell.mots_cles) 
          ? (spell.motsCles || spell.keywords || spell.mots_cles).join(" ") 
          : (spell.motsCles || spell.keywords || spell.mots_cles));
        const portee = normalizeText(spell.portee || spell.range || spell.portée);

        return nom.includes(query) || desc.includes(query) || mots.includes(query) || portee.includes(query);
      });
    }

    if (counter) counter.textContent = filtered.length;

    container.innerHTML = "";
    if (filtered.length === 0) {
      if (noResults) noResults.classList.remove("hidden");
    } else {
      if (noResults) noResults.classList.add("hidden");

      filtered.forEach(spell => {
        const spellName = spell.nom || spell.name || "Sort sans nom";
        const spellId = spell.id || slugify(spellName);
        const cardId = `sort-${spellId}`;

        const spellElem = getSpellElement(spell);
        const spellRank = getSpellRank(spell);
        const badgeClass = getElementBadgeClass(spellElem);

        const keywordsRaw = spell.motsCles || spell.keywords || spell.mots_cles;
        const keywordsStr = Array.isArray(keywordsRaw) ? keywordsRaw.join(", ") : (keywordsRaw || "");

        const card = document.createElement("article");
        card.id = cardId;
        card.className = "card-spell rounded-xl p-4 flex flex-col justify-between space-y-3 relative";

        card.innerHTML = `
          <div>
            <div class="flex justify-between items-start gap-2 border-b border-stone-800/80 pb-2">
              <div>
                <h2 class="font-bold font-imperial text-amber-200 text-sm md:text-base leading-tight">
                  <a href="#${cardId}" class="hover:underline hover:text-amber-300" title="Lien direct vers ce sort">
                    ${spellName}
                  </a>
                </h2>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${badgeClass}">
                    ${spellElem.toUpperCase()} ${spellRank === 0 ? "(Universel)" : `— Rang ${spellRank}`}
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

            <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-stone-400 mt-2 bg-black/40 p-2 rounded border border-stone-900">
              <div><b class="text-stone-300">Portée :</b> ${spell.portee || spell.portée || spell.range || "Personnelle"}</div>
              <div><b class="text-stone-300">Zone :</b> ${spell.zone || spell.area || "1 cible"}</div>
              <div><b class="text-stone-300">Durée :</b> ${spell.duree || spell.durée || spell.duration || "Instantanée"}</div>
              <div><b class="text-stone-300">Augmentations :</b> ${spell.augmentations || spell.raises || "Aucune"}</div>
            </div>

            <div class="mt-2.5 text-stone-300 text-xs leading-relaxed space-y-1.5">
              <p>${spell.description || spell.effet || spell.effect || spell.desc || ""}</p>
            </div>
          </div>

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
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.classList.remove("sort-highlight");
        void targetElement.offsetWidth;
        targetElement.classList.add("sort-highlight");
      }, 100);
    }
  }

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
