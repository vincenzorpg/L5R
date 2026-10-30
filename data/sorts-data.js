/**
 * SORTS_DATA - Point d'entrée principal réagrégé
 * L5R 4e Édition (Livre de Base complet & Suppléments)
 * Version standard (compatible file:// et serveurs HTTP)
 */

(function () {
  // Récupération sécurisée des listes chargées via les sous-fichiers
  var universels = (typeof window !== "undefined" && window.SORTS_UNIVERSELS) || [];
  var air = (typeof window !== "undefined" && window.SORTS_AIR) || [];
  var terre = (typeof window !== "undefined" && window.SORTS_TERRE) || [];
  var feu = (typeof window !== "undefined" && window.SORTS_FEU) || [];
  var eau = (typeof window !== "undefined" && window.SORTS_EAU) || [];
  var vide = (typeof window !== "undefined" && window.SORTS_VIDE) || [];
  var kiho = (typeof window !== "undefined" && window.SORTS_KIHO) || [];
  var maho = (typeof window !== "undefined" && window.SORTS_MAHO) || [];

  // Fusion de l'ensemble des sorts
  var SORTS_DATA = [
    ...universels,
    ...air,
    ...terre,
    ...feu,
    ...eau,
    ...vide,
    ...kiho,
    ...maho
  ];

  // Indexation par ID pour accès direct O(1)
  var SORTS_BY_ID = Object.fromEntries(
    SORTS_DATA.map(function (sort) {
      return [sort.id, sort];
    })
  );

  // Exposition globale dans window
  if (typeof window !== "undefined") {
    window.SORTS_DATA = SORTS_DATA;
    window.SORTS_BY_ID = SORTS_BY_ID;
  }
})();
