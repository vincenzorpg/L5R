// =============================================================================
// PORTAIL D'ACCUEIL — DOJO LOCAL, CLANS MAJEURS & CHRONOLOGIE (INDEX.HTML)
// =============================================================================

const HOME_CLANS_CARDS = [
  {
    id: "crabe",
    name: "CLAN DU CRABE",
    kanji: "蟹",
    color: "#38bdf8",
    shadow: "rgba(56, 189, 248, 0.45)",
    gradient: "from-[#0c1318] to-[#0a0808]",
    families: "Hida, Hiruma, Kuni, Kaiu",
    desc: "Défenseurs stoïques du Mur Kaiu contre les hordes de l'Outremonde. Maîtres des armes lourdes et du jade."
  },
  {
    id: "grue",
    name: "CLAN DE LA GRUE",
    kanji: "鶴",
    color: "#67e8f9",
    shadow: "rgba(103, 232, 249, 0.45)",
    gradient: "from-[#0b1517] to-[#0a0808]",
    families: "Doji, Kakita, Daidoji",
    desc: "Arbitres de l'étiquette à la cour impériale et duellistes insurpassés dans l'art sacré de l'Iaijutsu."
  },
  {
    id: "dragon",
    name: "CLAN DU DRAGON",
    kanji: "龍",
    color: "#34d399",
    shadow: "rgba(52, 211, 153, 0.45)",
    gradient: "from-[#081813] to-[#0a0808]",
    families: "Mirumoto, Kitsuki, Togashi",
    desc: "Gardiens énigmatiques des montagnes, escrimeurs Niten à deux sabres, enquêteurs Kitsuki et moines tatoués."
  },
  {
    id: "lion",
    name: "CLAN DU LION",
    kanji: "獅",
    color: "#fbbf24",
    shadow: "rgba(251, 191, 36, 0.45)",
    gradient: "from-[#191409] to-[#0a0808]",
    families: "Akodo, Matsu, Ikoma, Kitsu",
    desc: "Le Sabre Droit de l'Empereur, stratèges infaillibles et légions de guerriers voués corps et âme au Bushido."
  },
  {
    id: "mante",
    name: "CLAN DE LA MANTE",
    kanji: "蟷",
    color: "#2dd4bf",
    shadow: "rgba(45, 212, 191, 0.45)",
    gradient: "from-[#081716] to-[#0a0808]",
    families: "Yoritomo, Tsuruchi, Moshi",
    desc: "Fils des tempêtes océaniques, maîtres du commerce maritime et archers d'élite de la lignée Tsuruchi."
  },
  {
    id: "phenix",
    name: "CLAN DU PHÉNIX",
    kanji: "鳳",
    color: "#f97316",
    shadow: "rgba(249, 115, 22, 0.45)",
    gradient: "from-[#180f08] to-[#0a0808]",
    families: "Isawa, Shiba, Asako",
    desc: "Gardiens de la voix des Kami, maîtres des cinq éléments et du Vide, protégés par les yojimbos Shiba."
  },
  {
    id: "scorpion",
    name: "CLAN DU SCORPION",
    kanji: "蠍",
    color: "#f43f5e",
    shadow: "rgba(244, 63, 94, 0.45)",
    gradient: "from-[#180a0f] to-[#0a0808]",
    families: "Bayushi, Shosuro, Soshi",
    desc: "Les gardiens masqués des secrets de l'Empire, maîtres de l'ombre, du chantage et de la loyauté absolue."
  },
  {
    id: "licorne",
    name: "CLAN DE LA LICORNE",
    kanji: "麒",
    color: "#c084fc",
    shadow: "rgba(192, 132, 252, 0.45)",
    gradient: "from-[#140b19] to-[#0a0808]",
    families: "Shinjo, Moto, Utaku, Iuchi",
    desc: "Seigneurs des steppes revenus des Terres Brûlées, maîtres de la cavalerie lourde et de la magie Meishōdō."
  }
];

const HOME_SCENARIOS_STRIP = [
  { num: "01", label: "Topaze", href: "campagne/scenario-1.html" },
  { num: "02", label: "Kyoteï", href: "campagne/scenario-2.html" },
  { num: "03", label: "Dernier voyage", href: "campagne/scenario-3.html" },
  { num: "04", label: "Frères morts", href: "campagne/scenario-4.html" },
  { num: "05", label: "Ciel & Enfer", href: "campagne/scenario-5.html" },
  { num: "06", label: "Mariage d'Okado", href: "campagne/scenario-6.html" },
  { num: "07", label: "Ryoko Owari", href: "campagne/scenario-7.html" },
  { num: "08", label: "Crépuscule", href: "campagne/scenario-8.html" },
  { num: "09", label: "Ne meurt pas", href: "campagne/scenario-9.html" },
  { num: "10", label: "Tombe Iuchiban", href: "campagne/scenario-10.html", finale: true }
];

function renderHomeSections() {
  const clansGrid = document.getElementById("home-clans-grid");
  if (clansGrid) {
    clansGrid.innerHTML = HOME_CLANS_CARDS.map(c => `
      <div class="card-clean card-hover rounded-xl p-4 flex flex-col justify-between space-y-3 bg-gradient-to-br ${c.gradient}">
        <a href="clans/${c.id}.html" class="space-y-2 block group">
          <div class="flex items-center justify-between">
            <img src="assets/images/clans/mon-${c.id}.png" alt="Mon ${c.name}" class="w-11 h-11 rounded-full object-cover border border-amber-500/45 shadow-md bg-black/80" style="box-shadow: 0 0 12px ${c.shadow};" />
            <span class="text-[10px] text-stone-400 transition font-imperial font-bold">LORE &amp; ÉCOLES →</span>
          </div>
          <h3 class="font-bold font-imperial text-sm group-hover:text-amber-200 transition" style="color: ${c.color};">
            ${c.name}
          </h3>
          <p class="text-stone-400 text-[11px] leading-relaxed">
            ${c.desc}
          </p>
        </a>
        <div class="pt-2 border-t border-stone-800/80 flex justify-between items-center text-[10px]">
          <span class="text-stone-500">${c.families}</span>
          <a href="createcharacter.html?clan=${c.id}" class="px-2 py-0.5 rounded bg-stone-900 hover:text-black border font-bold transition" style="color: ${c.color}; border-color: ${c.color}66;">
            ⚡ Forger
          </a>
        </div>
      </div>
    `).join("");
  }

  const strip = document.getElementById("home-scenarios-strip");
  if (strip) {
    const sourceScenarios = Array.isArray(window.SCENARIOS_DATA) && window.SCENARIOS_DATA.length
      ? window.SCENARIOS_DATA.map(s => ({
          num: s.num || String(s.id).padStart(2, "0"),
          label: s.shortTitle || s.title,
          href: s.file,
          finale: !!s.finale
        }))
      : HOME_SCENARIOS_STRIP;

    const countEl = document.getElementById("home-scenarios-count");
    if (countEl) {
      countEl.textContent = `${sourceScenarios.length} / ${sourceScenarios.length} Récits Complets`;
    }

    strip.innerHTML = sourceScenarios.map(s => s.finale
      ? `<a href="${s.href}" class="p-2 rounded bg-red-950/40 border border-red-500/50 hover:border-red-400 transition block truncate">
           <span class="text-red-300 font-mono font-bold block text-[9px]">SCÉNARIO ${s.num}</span>
           <span class="text-amber-200 font-bold font-imperial truncate block">${s.label}</span>
         </a>`
      : `<a href="${s.href}" class="p-2 rounded bg-black/50 border border-stone-800 hover:border-amber-500/40 transition block truncate">
           <span class="text-amber-400 font-mono font-bold block text-[9px]">SCÉNARIO ${s.num}</span>
           <span class="text-stone-300 font-imperial truncate block">${s.label}</span>
         </a>`
    ).join("");
  }

  try {
    const roster = JSON.parse(localStorage.getItem("l5r_dojo_roster_v1") || localStorage.getItem("l5r_dojo_characters_v4") || "[]");
    const wrapper = document.getElementById("home-saved-roster");
    const grid = document.getElementById("home-saved-grid");
    if (!roster.length || !wrapper || !grid) return;

    const latestThree = roster.slice(0, 3);
    wrapper.classList.remove("hidden");
    grid.innerHTML = latestThree.map((c, idx) => `
      <article class="card-clean card-hover rounded-xl p-4 flex flex-col justify-between space-y-3 border-emerald-500/40 bg-gradient-to-br from-[#0e1914] to-[#0a0808]">
        <div>
          <div class="flex justify-between items-center text-[10px] text-emerald-400 font-mono">
            <span>${c.clanLabel || c.clan || "Samouraï"}</span>
            <span>Honneur ${c.honor || "4.5"}</span>
          </div>
          <h3 class="text-sm font-bold font-imperial text-amber-200 mt-0.5">${c.name || "Samouraï"}</h3>
          <div class="text-[11px] text-stone-400">${c.schoolLabel || c.school || "École"} • ${c.insightText || "Rang 1"}</div>
          ${c.backgroundStory ? `<p class="text-[10px] text-stone-500 italic line-clamp-2 mt-1.5">« ${c.backgroundStory} »</p>` : ""}
        </div>
        <div class="pt-2 border-t border-stone-800/80 flex flex-wrap justify-between items-center gap-2 text-[10px]">
          <a href="createcharacter.html?load=${encodeURIComponent(c.id)}" class="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-black font-imperial font-bold transition">
            ⚔️ Reprendre
          </a>
          <button type="button" data-home-export-idx="${idx}" class="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-emerald-500/40 text-emerald-200 font-bold cursor-pointer transition">
            📥 Exporter JSON
          </button>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll("[data-home-export-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-home-export-idx"), 10);
        const charObj = latestThree[idx];
        if (!charObj) return;
        const slug = String(charObj.name || "samourai").toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
        const blob = new Blob([JSON.stringify(charObj, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${slug || "samourai"}-l5r.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });
    });
  } catch (e) {}
}

window.addEventListener("DOMContentLoaded", renderHomeSections);
window.addEventListener("l5r-scenarios-updated", renderHomeSections);
