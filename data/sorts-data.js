/**
 * SORTS_DATA - Point d'entrée principal réagrégé et normalisé
 * L5R 4e Édition (Livre de Base complet & Suppléments)
 */

(function () {
  // Récupération sécurisée des listes chargées via les sous-fichiers
  var rawUniversels = (typeof window !== "undefined" && (window.SORTS_UNIVERSELS || window.sortsUniversels)) || [];
  var rawAir        = (typeof window !== "undefined" && (window.SORTS_AIR || window.sortsAir)) || [];
  var rawTerre      = (typeof window !== "undefined" && (window.SORTS_TERRE || window.sortsTerre)) || [];
  var rawFeu        = (typeof window !== "undefined" && (window.SORTS_FEU || window.sortsFeu)) || [];
  var rawEau        = (typeof window !== "undefined" && (window.SORTS_EAU || window.sortsEau)) || [];
  var rawVide       = (typeof window !== "undefined" && (window.SORTS_VIDE || window.sortsVide)) || [];
  var rawKiho       = (typeof window !== "undefined" && (window.SORTS_KIHO || window.sortsKiho)) || [];
  var rawMaho       = (typeof window !== "undefined" && (window.SORTS_MAHO || window.sortsMaho)) || [];

  // Fonction utilitaire pour normaliser chaque sort (garantit element, anneau, rang, maitrise)
  function normaliserListe(liste, elementDefaut, estMaho, estKiho) {
    return (liste || []).map(function (sort) {
      var s = Object.assign({}, sort);

      // 1. Détection et affectation de l'élément / anneau
      var elem = s.element || s.anneau || s.ring || s.elem || elementDefaut;
      s.element = elem;
      s.anneau = elem;

      // 2. Détection et extraction du rang / maîtrise
      var rawRang = s.rang !== undefined ? s.rang : 
                   (s.maitrise !== undefined ? s.maitrise : 
                   (s.rank !== undefined ? s.rank : 
                   (s.niveau !== undefined ? s.niveau : null)));

      if (rawRang !== null && rawRang !== undefined) {
        var match = rawRang.toString().match(/\d+/);
        s.rang = match ? parseInt(match[0], 10) : 0;
      } else {
        // Tente d'extraire le chiffre dans l'anneau (ex: "Air 2")
        var matchRing = (elem || "").toString().match(/\d+/);
        s.rang = matchRing ? parseInt(matchRing[0], 10) : 0;
      }
      s.maitrise = s.rang;

      // 3. Drapeaux spécifiques
      if (estMaho || s.isMaho || (elem && elem.toString().toLowerCase().includes("maho"))) {
        s.isMaho = true;
        s.element = "maho";
        s.anneau = "maho";
      }
      if (estKiho || s.isKiho) {
        s.isKiho = true;
      }

      return s;
    });
  }

  // Fusion avec normalisation
  var SORTS_DATA = [
    ...normaliserListe(rawUniversels, "universel", false, false),
    ...normaliserListe(rawAir,        "air",       false, false),
    ...normaliserListe(rawTerre,      "terre",     false, false),
    ...normaliserListe(rawFeu,        "feu",       false, false),
    ...normaliserListe(rawEau,        "eau",       false, false),
    ...normaliserListe(rawVide,       "vide",      false, false),
    ...normaliserListe(rawKiho,       "kiho",      false, true),
    ...normaliserListe(rawMaho,       "maho",      true,  false)
  ];

  // Indexation par ID pour accès direct O(1)
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

  // Exposition globale dans window
  if (typeof window !== "undefined") {
    window.SORTS_DATA = SORTS_DATA;
    window.SORTS_BY_ID = SORTS_BY_ID;
  }
})();
