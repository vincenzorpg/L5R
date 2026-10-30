/**
 * data/sorts-data.js — Point d'entrée principal réagrégé et normalisé
 * L5R 4e Édition (Livre de Base complet & Suppléments)
 */

(function () {
  // Récupération sécurisée des listes (supporte Array ou Object d'ID)
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

  // Détecteur tout-terrain de rang (gère "maîtrise", "level", chiffres arabes et romains)
  function detectRank(s) {
    function parseVal(v) {
      if (typeof v === "number") return v;
      if (!v) return null;
      var str = v.toString().trim();
      var m = str.match(/\b([0-6])\b/) || str.match(/\d+/);
      if (m) return parseInt(m[0] || m[1], 10);

      var u = str.toUpperCase();
      if (/\bVI\b/.test(u)) return 6;
      if (/\bV\b/.test(u)) return 5;
      if (/\bIV\b/.test(u)) return 4;
      if (/\bIII\b/.test(u)) return 3;
      if (/\bII\b/.test(u)) return 2;
      if (/\bI\b/.test(u)) return 1;
      return null;
    }

    for (var k in s) {
      if (!s.hasOwnProperty(k)) continue;
      var lk = k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (lk.indexOf("rang") !== -1 || lk.indexOf("maitr") !== -1 || lk.indexOf("rank") !== -1 || lk.indexOf("level") !== -1 || lk.indexOf("niveau") !== -1) {
        var parsed = parseVal(s[k]);
        if (parsed !== null) return parsed;
      }
    }

    var ringStr = (s.anneau || s.element || s.ring || s.nom || s.name || "").toString();
    var ringParsed = parseVal(ringStr);
    if (ringParsed !== null) return ringParsed;

    return 0;
  }

  // Traite et étiquette chaque liste par élément
  function prepareList(list, defaultElem, isMaho, isKiho) {
    return list.map(function (item) {
      var s = Object.assign({}, item);
      s.element = s.element || s.anneau || s.ring || defaultElem;
      s.anneau = s.element;
      s.rang = detectRank(s);
      s.maitrise = s.rang;
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
