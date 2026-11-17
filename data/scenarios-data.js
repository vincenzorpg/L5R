// =============================================================================
// REGISTRE CENTRALISÉ & AUTO-DÉCOUVERTE DES SCÉNARIOS (DATA/SCENARIOS-DATA.JS)
// Source unique de vérité pour index.html, campagne.html et campagne-ajouter.html.
// Détecte aussi automatiquement tout nouveau fichier campagne/scenario-11.html+
// déposé sur GitHub grâce à ses balises <meta name="l5r-scenario-*"> !
// =============================================================================

const SCENARIOS_DATA = [
  {
    id: 1,
    num: "01",
    shortTitle: "Topaze",
    file: "campagne/scenario-1.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/2015/08/15/scenario-1-championnat-de-topaze/",
    title: "Championnat de Topaze",
    author: "Tsuruchi Akira",
    date: "Acte 1",
    place: "Village de Tsuma",
    cover: "assets/images/scenarios/cover-1.jpg",
    desc: "Le passage à l'âge adulte (gempukku) des jeunes samouraïs lors du prestigieux tournoi impérial, entre épreuves d'armes, étiquette et premiers complots."
  },
  {
    id: 2,
    num: "02",
    shortTitle: "Kyoteï",
    file: "campagne/scenario-2.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/2015/11/03/scenario-2-meurtre-au-chateau-de-kyotei-par-okado-hiruma/",
    title: "Meurtre au Château de Kyoteï",
    author: "Okado Hiruma / Tsuruchi Akira / Hida Samui",
    date: "Acte 2",
    place: "Château de Kyoteï",
    cover: "assets/images/scenarios/cover-2.jpg",
    desc: "Une enquête sous haute tension dans la forteresse où l'honneur des clans et les apparences de cour s'affrontent."
  },
  {
    id: 3,
    num: "03",
    shortTitle: "Dernier voyage",
    file: "campagne/scenario-3.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/2015/11/29/scenario-3-le-dernier-voyage-par-ryumitaka-isawa/",
    title: "Le dernier voyage",
    author: "Ryûmitaka Isawa / Tsuruchi Akira",
    date: "Acte 3",
    place: "Routes de Rokugan",
    cover: "assets/images/scenarios/cover-3.jpg",
    desc: "Une mission d'escorte et de pèlerinage confrontant le groupe aux aléas du voyage et aux périls spirituels."
  },
  {
    id: 4,
    num: "04",
    shortTitle: "Frères morts",
    file: "campagne/scenario-4.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/la-campagne/",
    title: "Aux côtés de mes frères morts",
    author: "Campagne de la Chronique de Rokugan",
    date: "Acte 4",
    place: "Lisière de l'Outremonde",
    cover: "assets/images/scenarios/cover-4.jpg",
    desc: "L'épreuve du sang et de la poussière auprès des défenseurs du Mur, au contact des esprits des défunts."
  },
  {
    id: 5,
    num: "05",
    shortTitle: "Ciel & Enfer",
    file: "campagne/scenario-5.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/la-campagne/",
    title: "Entre le ciel et l'enfer",
    author: "Tsuruchi Akira",
    date: "Acte 5",
    place: "Sanctuaires de Montagne",
    cover: "assets/images/scenarios/cover-5.jpg",
    desc: "Un choix moral et spirituel déchirant entre le devoir envers les cieux célestes et la réalité crue du monde terrestre."
  },
  {
    id: 6,
    num: "06",
    shortTitle: "Mariage d'Okado",
    file: "campagne/scenario-6.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/la-campagne/",
    title: "Le mariage d'Okado Hiruma",
    author: "Tsuruchi Akira",
    date: "Acte 6",
    place: "Terres du Crabe",
    cover: "assets/images/scenarios/cover-6.jpg",
    desc: "Une alliance matrimoniale capitale pour la famille Hiruma, mêlant protocole sévère, rivalités claniques et festivités martiales."
  },
  {
    id: 7,
    num: "07",
    shortTitle: "Ryoko Owari",
    file: "campagne/scenario-7.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/la-campagne/",
    title: "Meurtre à Ryoko Owari",
    author: "Tsuruchi Akira",
    date: "Acte 7",
    place: "Ryoko Owari (Cité des Histoires Vertes)",
    cover: "assets/images/scenarios/cover-7.jpg",
    desc: "Plongée dans la cité de l'opium et des intrigues du Clan du Scorpion pour dénouer un homicide politique particulièrement trouble."
  },
  {
    id: 8,
    num: "08",
    shortTitle: "Crépuscule",
    file: "campagne/scenario-8.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/la-campagne/",
    title: "Le crépuscule de l'honneur",
    author: "Tsuruchi Akira",
    date: "Acte 8",
    place: "Provinces disputées",
    cover: "assets/images/scenarios/cover-8.jpg",
    desc: "Lorsque les ordres d'un seigneur s'opposent frontalement au code du Bushido : l'heure des serments brisés et des tragédies personnelles."
  },
  {
    id: 9,
    num: "09",
    shortTitle: "Ne meurt pas",
    file: "campagne/scenario-9.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/la-campagne/",
    title: "« Ce qui ne meurt pas »",
    author: "Tsuruchi Akira",
    date: "Acte 9",
    place: "Terres ancestrales",
    cover: "assets/images/scenarios/cover-9.jpg",
    desc: "Face à une menace occulte défiant les âges, les héros cherchent le secret de ce qui survit au trépas et aux malédictions."
  },
  {
    id: 10,
    num: "10",
    shortTitle: "Tombe Iuchiban",
    file: "campagne/scenario-10.html",
    wpUrl: "https://campagnel5rdavid2015.wordpress.com/2026/10/14/scenario-10-la-tombe-de-iuchiban/",
    title: "La tombe de Iuchiban",
    author: "Tsuruchi Akira",
    date: "Acte 10",
    place: "Le Tombeau Maudit",
    cover: "assets/images/scenarios/cover-10.jpg",
    desc: "L'apogée héroïque de la campagne : l'exploration du repaire scellé du plus grand adepte du sang de Rokugan, Iuchiban.",
    finale: true
  }
];

/**
 * Sonde automatiquement la présence de nouveaux fichiers campagne/scenario-11.html, 12, etc.
 * afin qu'un simple dépôt de fichier HTML dans campagne/ suffise à mettre à jour tout le site !
 */
async function discoverNewScenarios() {
  if (typeof window === "undefined" || typeof fetch !== "function") return SCENARIOS_DATA;
  const prefix = /\/(aides|clans|campagne|admin)\//.test(window.location.pathname) ? "../" : "./";
  let nextId = Math.max(...SCENARIOS_DATA.map(s => Number(s.id) || 0)) + 1;
  let foundNew = false;

  while (nextId <= 50) {
    try {
      const relFile = `campagne/scenario-${nextId}.html`;
      const res = await fetch(`${prefix}${relFile}`, { method: "GET", cache: "no-cache" });
      if (!res.ok) break;
      const html = await res.text();
      if (!html.includes("story-title") && !html.includes("l5r-scenario-title")) break;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const getMeta = (name) => doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content") || "";

      const rawTitle = getMeta("l5r-scenario-title") ||
        (doc.getElementById("story-title")?.textContent || `Acte ${nextId}`).replace(/^Sc[ée]nario\s*\d+\s*:\s*/i, "").trim();
      const shortTitle = getMeta("l5r-scenario-short-title") || rawTitle.slice(0, 20);
      const author = getMeta("l5r-scenario-author") || "Campagne de la Chronique de Rokugan";
      const date = getMeta("l5r-scenario-date") || `Acte ${nextId}`;
      const place = getMeta("l5r-scenario-place") || "Terres de Rokugan";
      const desc = getMeta("l5r-scenario-desc") ||
        (doc.getElementById("story-summary")?.textContent || "").replace(/^[«"\s]+|[»"\s]+$/g, "").trim();
      const wpUrl = getMeta("l5r-scenario-wp-url") || "https://campagnel5rdavid2015.wordpress.com/la-campagne/";
      const cover = getMeta("l5r-scenario-cover") || "";

      if (!SCENARIOS_DATA.some(s => Number(s.id) === nextId)) {
        SCENARIOS_DATA.push({
          id: nextId,
          num: String(nextId).padStart(2, "0"),
          shortTitle,
          file: relFile,
          wpUrl,
          title: rawTitle,
          author,
          date,
          place,
          ...(cover ? { cover } : {}),
          desc
        });
        foundNew = true;
      }
      nextId++;
    } catch (e) {
      break;
    }
  }

  if (foundNew) {
    window.dispatchEvent(new CustomEvent("l5r-scenarios-updated", { detail: SCENARIOS_DATA }));
  }
  return SCENARIOS_DATA;
}

if (typeof window !== "undefined") {
  window.SCENARIOS_DATA = SCENARIOS_DATA;
  window.discoverNewScenarios = discoverNewScenarios;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => discoverNewScenarios());
  } else {
    discoverNewScenarios();
  }
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SCENARIOS_DATA };
}
