/**
 * data/sorts-data.js — Point d'entrée principal réagrégé et normalisé
 * L5R 4e Édition (Livre de Base complet & Suppléments)
 */

(function () {
  // Récupération sécurisée des listes (supporte Array ou Dictionnaire d'objets)
  function toArray(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "object") return Object.values(raw).filter(v => v && typeof v === "object");
    return [];
  }

  var rawUniversels = toArray((typeof window !== "undefined" && (window.SORTS_UNIVERSELS || window.sortsUniversels)));
  var rawAir        = toArray((typeof window !== "undefined" && (window.SORTS_AIR || window.sortsAir)));
  var rawTerre      = toArray((typeof window !== "undefined" && (window.SORTS_TERRE || window.sortsTerre)));
  var rawFeu        = toArray((typeof window !== "undefined" && (window.SORTS_FEU || window.sortsFeu)));
  var rawEau        = toArray((typeof window !== "undefined" && (window.SORTS_EAU || window.sortsEau)));
  var rawVide       = toArray((typeof window !== "undefined" && (window.SORTS_VIDE || window.sortsVide)));
  var rawKiho       = toArray((typeof window !== "undefined" && (window.SORTS_KIHO || window.sortsKiho)));
  var rawMaho       = toArray((typeof window !== "undefined" && (window.SORTS_MAHO || window.sortsMaho)));

  // Extraction ciblée du rang de maîtrise (exclut rigoureusement "range" / portée)
  function detectRank(s) {
    var raw = s.mastery !== undefined ? s.mastery :
             (s.maitrise !== undefined ? s.maitrise :
             (s.rang !== undefined ? s.rang :
             (s.rank !== undefined ? s.rank :
             (s.niveau !== undefined ? s.niveau : null))));

    if (raw !== null && raw !== undefined) {
      if (typeof raw === "number") return raw;
      var str = raw.toString().trim().toLowerCase();
      if (str === "universel" || str === "universal") return 0;
      var m = str.match(/\d+/);
      if (m) return parseInt(m[0], 10);
    }

    return 0;
  }

  // Traitement et normalisation uniforme de chaque sort
  function prepareList(list, defaultElem, isMaho, isKiho) {
    return list.map(function (item) {
      var s = Object.assign({}, item);
      s.element = s.element || s.anneau || s.ring || defaultElem;
      s.anneau = s.element;
      s.mastery = detectRank(s);
      s.rang = s.mastery;
      s.maitrise = s.mastery;
      if (isMaho || s.isMaho) { s.isMaho = true; s.element = "maho"; s.anneau = "maho"; }
      if (isKiho || s.isKiho) { s.isKiho = true; }
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
