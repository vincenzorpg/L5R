/**
 * data/sorts-data.js — Point d'entrée principal réagrégé et normalisé
 * L5R 4e Édition (Livre de Base complet & Suppléments)
 */

(function () {
  function toArray(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "object") return Object.values(raw).filter(v => v && typeof v === "object");
    return [];
  }

  var rawUniversels = toArray(typeof window !== "undefined" && (window.SORTS_UNIVERSELS || window.sortsUniversels || window.UNIVERSELS));
  var rawAir        = toArray(typeof window !== "undefined" && (window.SORTS_AIR || window.sortsAir || window.AIR_DATA));
  var rawTerre      = toArray(typeof window !== "undefined" && (window.SORTS_TERRE || window.sortsTerre || window.TERRE_DATA));
  var rawFeu        = toArray(typeof window !== "undefined" && (window.SORTS_FEU || window.sortsFeu || window.FEU_DATA));
  var rawEau        = toArray(typeof window !== "undefined" && (window.SORTS_EAU || window.sortsEau || window.EAU_DATA));
  var rawVide       = toArray(typeof window !== "undefined" && (window.SORTS_VIDE || window.sortsVide || window.VIDE_DATA));
  
  // Prise en charge de toutes les variantes de nommage (singulier, pluriel, DATA)
  var rawKiho       = toArray(typeof window !== "undefined" && (
    window.SORTS_KIHO || window.SORTS_KIHOS || window.KIHOS || window.KIHO || window.KIHO_DATA || window.sortsKiho || window.sortsKihos
  ));
  
  var rawMaho       = toArray(typeof window !== "undefined" && (window.SORTS_MAHO || window.sortsMaho || window.MAHO_DATA || window.MAHO));

  // Extraction ciblée du rang de maîtrise (exclut range/portée)
  function detectRank(s) {
    var raw = s.mastery !== undefined ? s.mastery :
             (s.maitrise !== undefined ? s.maitrise :
             (s.ring_mastery !== undefined ? s.ring_mastery :
             (s.ringMastery !== undefined ? s.ringMastery :
             (s.rang !== undefined ? s.rang :
             (s.rank !== undefined ? s.rank :
             (s.niveau !== undefined ? s.niveau : null))))));

    if (raw !== null && raw !== undefined) {
      if (typeof raw === "number") return raw;
      var str = raw.toString().trim().toLowerCase();
      if (str === "universel" || str === "universal") return 0;
      var m = str.match(/\d+/);
      if (m) return parseInt(m[0], 10);
    }
    return 0;
  }

  // Traitement et normalisation uniforme
  function prepareList(list, defaultElem, isMaho, isKiho) {
    return list.map(function (item) {
      var s = Object.assign({}, item);
      var rawRing = s.ring || s.anneau || (s.element && s.element.toLowerCase() !== "kiho" ? s.element : "");

      if (isKiho || s.isKiho) {
        s.isKiho = true;
        s.element = "kiho";
        s.anneau = "kiho";
        s.ring = rawRing || "Terre"; // Anneau élémentaire associé au Kiho
      } else if (isMaho || s.isMaho) {
        s.isMaho = true;
        s.element = "maho";
        s.anneau = "maho";
      } else {
        s.element = s.element || s.anneau || defaultElem;
        s.anneau = s.element;
      }

      s.mastery = detectRank(s);
      s.rang = s.mastery;
      s.maitrise = s.mastery;
      return s;
    });
  }

  var SORTS_DATA = [
    ...prepareList(rawUniversels, "universel", false, false),
    ...prepareList(rawAir,        "air",       false, false),
    ...prepareList(rawTerre,      "terre",     false, false),
    ...prepareList(rawFeu,        "feu",       false, false),
    ...prepareList(rawEau,        "eau",       false, false),
    ...prepareList(rawVide,       "vide",      false, false),
    ...prepareList(rawKiho,       "kiho",      false, true),
    ...prepareList(rawMaho,       "maho",      true,  false)
  ];

  var SORTS_BY_ID = Object.fromEntries(
    SORTS_DATA.map(function (sort) {
      var id = sort.id || (sort.nom || sort.name || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return [id, sort];
    })
  );

  if (typeof window !== "undefined") {
    window.SORTS_DATA = SORTS_DATA;
    window.SORTS_BY_ID = SORTS_BY_ID;
  }
})();
