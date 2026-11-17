/**
 * js/kihos.js — Moteur interactif du Recueil des Kihos (L5R 4e Édition)
 */

(function () {
  const kihoMetaCache = typeof WeakMap !== "undefined" ? new WeakMap() : null;

  function debounce(fn, delay = 120) {
    let timerId = null;
    return function (...args) {
      if (timerId !== null) clearTimeout(timerId);
      timerId = setTimeout(() => {
        timerId = null;
        fn.apply(this, args);
      }, delay);
    };
  }

  function normalizeText(str) {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

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

  function slugify(text) {
    return normalizeText(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getKihoRing(kiho) {
    const raw = kiho?.ring || kiho?.element || kiho?.anneau || "";
    const norm = normalizeText(raw);
    if (norm.includes("terre") || norm.includes("earth")) return "terre";
    if (norm.includes("eau") || norm.includes("water")) return "eau";
    if (norm.includes("feu") || norm.includes("fire")) return "feu";
    if (norm.includes("air")) return "air";
    if (norm.includes("vide") || norm.includes("void")) return "vide";
    return norm || "vide";
  }

  function getKihoType(kiho) {
    const raw = kiho?.kihoType || "";
    const norm = normalizeText(raw);
    if (norm.includes("interne") || norm.includes("internal")) return "interne";
    if (norm.includes("martial")) return "martial";
    if (norm.includes("kharm") || norm.includes("karm")) return "kharmique";
    if (norm.includes("myst")) return "mystique";

    const kw = Array.isArray(kiho?.keywords) ? kiho.keywords.join(" ") : (kiho?.keywords || "");
    const nKw = normalizeText(kw);
    if (nKw.includes("interne")) return "interne";
    if (nKw.includes("martial")) return "martial";
    if (nKw.includes("kharm") || nKw.includes("karm")) return "kharmique";
    if (nKw.includes("myst")) return "mystique";
    return "interne";
  }

  function isKihoAtemi(kiho) {
    const kw = Array.isArray(kiho?.keywords) ? kiho.keywords.join(" ") : (kiho?.keywords || "");
    return Boolean(kiho?.isAtemi) || normalizeText(kw).includes("atemi") || normalizeText(kiho?.range).includes("atemi");
  }

  function getKihoMeta(kiho) {
    if (!kiho || typeof kiho !== "object") {
      return { ring: "vide", type: "interne", atemi: false, rank: 0, search: "" };
    }
    if (kihoMetaCache && kihoMetaCache.has(kiho)) {
      return kihoMetaCache.get(kiho);
    }
    const kwStr = Array.isArray(kiho.keywords) ? kiho.keywords.join(" ") : (kiho.keywords || "");
    const meta = {
      ring: getKihoRing(kiho),
      type: getKihoType(kiho),
      atemi: isKihoAtemi(kiho),
      rank: parseInt(kiho.mastery, 10) || 0,
      search: normalizeText(`${kiho.name || ""} ${kiho.ring || ""} ${kiho.kihoType || ""} ${kwStr} ${kiho.source || ""} ${kiho.range || ""} ${kiho.desc || ""}`)
    };
    if (kihoMetaCache) kihoMetaCache.set(kiho, meta);
    return meta;
  }

  function filterKihosList(kihos, options = {}) {
    const all = Array.isArray(kihos) ? kihos : [];
    const query = normalizeText(options.query || "");
    const selectedRing = normalizeText(options.ring || "tous");
    const selectedType = normalizeText(options.type || "tous");
    const selectedRank = options.rank !== undefined ? String(options.rank) : "tous";
    const hasRankFilter = selectedRank !== "tous";
    const targetRank = hasRankFilter ? parseInt(selectedRank, 10) : 0;

    return all.filter((k) => {
      const m = getKihoMeta(k);
      if (selectedRing !== "tous" && m.ring !== selectedRing) return false;
      if (selectedType !== "tous") {
        if (selectedType === "atemi") {
          if (!m.atemi) return false;
        } else if (m.type !== selectedType) {
          return false;
        }
      }
      if (hasRankFilter && m.rank !== targetRank) return false;
      if (query !== "" && !m.search.includes(query)) return false;
      return true;
    });
  }

  function getRingBadgeClass(ring) {
    switch (ring) {
      case "terre": return "badge-terre";
      case "eau": return "badge-eau";
      case "feu": return "badge-feu";
      case "air": return "badge-air";
      case "vide": return "badge-vide";
      default: return "badge-kiho";
    }
  }

  function getKihosData() {
    if (typeof window === "undefined") return [];
    const raw = window.SORTS_KIHO || [];
    return Array.isArray(raw) ? raw : Object.values(raw).filter(v => v && typeof v === "object");
  }

  function syncQuickButtons() {
    const ringVal = document.getElementById("kiho-ring-select")?.value || "tous";
    document.querySelectorAll("[data-kiho-ring-chip]").forEach((btn) => {
      const active = btn.dataset.kihoRingChip === ringVal;
      btn.classList.toggle("bg-amber-500", active);
      btn.classList.toggle("text-black", active);
      btn.classList.toggle("font-bold", active);
      btn.classList.toggle("bg-stone-900/80", !active);
      btn.classList.toggle("text-stone-300", !active);
    });
  }

  function applyKihoFilters() {
    const searchInput = document.getElementById("kiho-search");
    const ringSelect = document.getElementById("kiho-ring-select");
    const typeSelect = document.getElementById("kiho-type-select");
    const rankSelect = document.getElementById("kiho-rank-select");
    const container = document.getElementById("kihos-container");
    const noResults = document.getElementById("no-results");
    const counter = document.getElementById("kihos-count");

    if (!container || !searchInput || !ringSelect || !typeSelect || !rankSelect) return;

    const filtered = filterKihosList(getKihosData(), {
      query: searchInput.value,
      ring: ringSelect.value,
      type: typeSelect.value,
      rank: rankSelect.value
    });

    if (counter) counter.textContent = filtered.length;
    syncQuickButtons();

    container.innerHTML = "";
    if (filtered.length === 0) {
      if (noResults) noResults.classList.remove("hidden");
      return;
    }
    if (noResults) noResults.classList.add("hidden");

    const fragment = document.createDocumentFragment();
    filtered.forEach((k) => {
      const name = k.name || "Kihō sans nom";
      const primaryId = k.id || slugify(name);
      const cardId = primaryId.startsWith("kiho-") ? primaryId : `kiho-${primaryId}`;
      const ring = getKihoRing(k);
      const badgeClass = getRingBadgeClass(ring);
      const atemi = isKihoAtemi(k);
      const rank = parseInt(k.mastery, 10) || 1;
      const typeLabel = (k.kihoType || getKihoType(k)).toUpperCase();
      const kwList = Array.isArray(k.keywords) ? k.keywords : [];

      const card = document.createElement("article");
      card.id = cardId;
      card.setAttribute("data-alias", `kiho-${slugify(name)}`);
      card.className = "card-spell perf-cv-auto rounded-xl p-4 flex flex-col justify-between space-y-3 relative";

      card.innerHTML = `
        <div>
          <div class="flex justify-between items-start gap-2 border-b border-stone-800/80 pb-2">
            <div>
              <h2 class="font-bold font-imperial text-amber-200 text-sm md:text-base leading-tight">
                <a href="#${escapeHtml(cardId)}" class="hover:underline hover:text-amber-300" title="Lien direct vers ce Kihō">
                  ${escapeHtml(name)}
                </a>
              </h2>
              <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${badgeClass}">
                  ${escapeHtml(ring.toUpperCase())} — Maîtrise ${rank}
                </span>
                <span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded badge-kiho">
                  ${escapeHtml(typeLabel)}
                </span>
                ${atemi ? `<span class="text-[9px] font-bold font-imperial px-2 py-0.5 rounded badge-dis">ATEMI</span>` : ""}
              </div>
            </div>
            <button
              type="button"
              onclick="copyKihoDirectLink('${escapeHtml(cardId)}')"
              class="text-stone-500 hover:text-amber-300 text-xs p-1 cursor-pointer"
              title="Copier le lien permanent de ce Kihō"
            >
              🔗
            </button>
          </div>

          <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-stone-400 mt-2 bg-black/40 p-2 rounded border border-stone-900">
            <div><b class="text-stone-300">Portée :</b> ${escapeHtml(k.range || "Personnelle")}</div>
            <div><b class="text-stone-300">Zone :</b> ${escapeHtml(k.area || "Le moine")}</div>
            <div><b class="text-stone-300">Durée :</b> ${escapeHtml(k.duration || "Instantanée")}</div>
            <div><b class="text-stone-300">Mots-clés :</b> ${escapeHtml(kwList.join(", ") || typeLabel)}</div>
          </div>

          <div class="mt-2.5 text-stone-300 text-xs leading-relaxed">
            <p>${escapeHtml(k.desc || "")}</p>
          </div>
        </div>

        <div class="pt-2 border-t border-stone-800/60 flex justify-between items-center text-[10px] text-stone-500">
          <span>${escapeHtml(k.source || "Livre de Base 4e Éd.")}</span>
          <span class="font-mono text-emerald-400">Confrérie • ${rank} XP</span>
        </div>
      `;
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  }

  function syncKihosToURL() {
    const q = document.getElementById("kiho-search")?.value.trim() || "";
    const ring = document.getElementById("kiho-ring-select")?.value || "tous";
    const type = document.getElementById("kiho-type-select")?.value || "tous";
    const rank = document.getElementById("kiho-rank-select")?.value || "tous";

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (ring && ring !== "tous") params.set("ring", ring);
    if (type && type !== "tous") params.set("type", type);
    if (rank && rank !== "tous") params.set("rang", rank);

    const paramStr = params.toString();
    const newUrl = window.location.pathname + (paramStr ? "?" + paramStr : "") + (window.location.hash || "");
    window.history.replaceState(null, "", newUrl);
  }

  function handleKihoHashNavigation() {
    const rawHash = (window.location.hash || "").trim();
    if (!rawHash || rawHash.length < 2) return;
    const targetId = rawHash.substring(1).toLowerCase();
    let targetEl = document.getElementById(targetId) || document.querySelector(`[data-alias="${targetId}"]`);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        targetEl.classList.add("ring-2", "ring-emerald-400");
        setTimeout(() => targetEl.classList.remove("ring-2", "ring-emerald-400"), 3000);
      }, 150);
    }
  }

  function initKihoPage() {
    const params = new URLSearchParams(window.location.search);
    const searchInput = document.getElementById("kiho-search");
    const ringSelect = document.getElementById("kiho-ring-select");
    const typeSelect = document.getElementById("kiho-type-select");
    const rankSelect = document.getElementById("kiho-rank-select");

    if (searchInput && params.has("q")) searchInput.value = params.get("q");
    if (ringSelect && params.has("ring")) ringSelect.value = params.get("ring").toLowerCase();
    if (typeSelect && params.has("type")) typeSelect.value = params.get("type").toLowerCase();
    if (rankSelect && params.has("rang")) rankSelect.value = params.get("rang");

    if (searchInput) {
      searchInput.addEventListener("input", debounce(() => {
        applyKihoFilters();
        syncKihosToURL();
      }, 120));
    }
    [ringSelect, typeSelect, rankSelect].forEach((sel) => {
      if (sel) {
        sel.addEventListener("change", () => {
          applyKihoFilters();
          syncKihosToURL();
        });
      }
    });

    window.addEventListener("hashchange", handleKihoHashNavigation);
    applyKihoFilters();
    handleKihoHashNavigation();
  }

  if (typeof window !== "undefined") {
    window.setKihoRingQuick = function (ring) {
      const sel = document.getElementById("kiho-ring-select");
      if (sel) {
        sel.value = ring;
        applyKihoFilters();
        syncKihosToURL();
      }
    };
    window.resetAllKihoFilters = function () {
      const searchInput = document.getElementById("kiho-search");
      const ringSelect = document.getElementById("kiho-ring-select");
      const typeSelect = document.getElementById("kiho-type-select");
      const rankSelect = document.getElementById("kiho-rank-select");
      if (searchInput) searchInput.value = "";
      if (ringSelect) ringSelect.value = "tous";
      if (typeSelect) typeSelect.value = "tous";
      if (rankSelect) rankSelect.value = "tous";
      applyKihoFilters();
      window.history.replaceState(null, "", window.location.pathname);
    };
    window.copyKihoDirectLink = function (cardId) {
      const url = `${window.location.origin}${window.location.pathname}#${cardId}`;
      navigator.clipboard.writeText(url).then(() => {
        window.location.hash = cardId;
        handleKihoHashNavigation();
      }).catch(() => {
        window.location.hash = cardId;
      });
    };

    window.filterKihosList = filterKihosList;
    window.getKihoRing = getKihoRing;
    window.getKihoType = getKihoType;
    window.isKihoAtemi = isKihoAtemi;
    window.applyKihoFilters = applyKihoFilters;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      normalizeText,
      escapeHtml,
      slugify,
      getKihoRing,
      getKihoType,
      isKihoAtemi,
      filterKihosList
    };
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initKihoPage);
    } else {
      initKihoPage();
    }
  }
})();
