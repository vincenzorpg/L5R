// =============================================================================
// INTERFACE ÉTENDUE DE LA FORGE DE PERSONNAGE (SORTS, KIHOS, KATAS, TATOUAGES,
// COMPÉTENCES MULTI-SELECT, LANCEUR DE DÉS ROLL & KEEP, DOJO LOCAL & IMPRESSION A4)
// =============================================================================

window.charSpellsList = window.charSpellsList || [];
window.charKatasList = window.charKatasList || [];
window.charTattoosList = window.charTattoosList || [];

const TWENTY_QUESTIONS_SECTIONS = [
  {
    title: "I. Identité, Lignée & Apparence (Questions 1 à 5)",
    items: [
      { id: 1, q: "1. À quel clan appartenez-vous et qu'en pensez-vous ?", val: "Au fier Clan du Crabe. C'est le seul clan qui comprend le vrai coût de la survie de Rokugan." },
      { id: 2, q: "2. À quelle famille appartenez-vous et quel est votre héritage ?", val: "Famille Hiruma. Nous avons perdu nos terres ancestrales mais jamais notre détermination." },
      { id: 3, q: "3. Quelle école avez-vous suivie et quel rôle y tenez-vous ?", val: "École d'éclaireur Hiruma. Je suis les yeux et les oreilles de mes frères d'armes." },
      { id: 4, q: "4. Comment vous décririez-vous physiquement ?", val: "Carrure athlétique taillée par la marche, regard félin jaune perçant, cheveux gris coupés court." },
      { id: 5, q: "5. Quels sont vos plus grands traits de personnalité (forces & faiblesses) ?", val: "Inflexible et loyal au-delà de la mort, mais peu enclin à la patience et aux flatteries de cour.", full: true }
    ]
  },
  {
    title: "II. Passion, Devoir & Bushido (Questions 6 à 10)",
    items: [
      { id: 6, q: "6. Qu'est-ce qui vous passionne ou vous fait vibrer ?", val: "Le silence sauvage des grands espaces et le dressage de mon loup Shiro." },
      { id: 7, q: "7. Quelle est votre vision personnelle du Bushido ?", val: "Le Courage (Yū) et le Devoir (Chūgo) avant l'apparence. Sauver des vies vaut mieux que parader." },
      { id: 8, q: "8. Quelle est votre relation aux Fortunes et aux Kami ?", val: "Je respecte les esprits de la Terre et prie Bishamon, mais j'agis par mes propres mains." },
      { id: 9, q: "9. Comment s'est déroulé votre Gempukku ?", val: "Une patrouille de trois nuits au-delà de la rivière des Doigts de Jade avec mon sensei." },
      { id: 10, q: "10. Qui est la personne que vous respectez le plus ?", val: "Mon vieux sensei Hiruma et le champion de clan Hida Kisada.", full: true }
    ]
  },
  {
    title: "III. Liens Sociaux & Secrets (Questions 11 à 15)",
    items: [
      { id: 11, q: "11. Avez-vous des amis précieux ou des rivaux acharnés ?", val: "Compagnon fidèle de Samui Hida et d'Akira Tsuruchi ; rivalité froide avec la Grue." },
      { id: 12, q: "12. Êtes-vous fiancé(e), marié(e) ou avez-vous des obligations ?", val: "Mariage arrangé avec Kamako Kaiu pour consolider l'alliance des familles." },
      { id: 13, q: "13. Quel est votre plus lourd secret ou fardeau ?", val: "Avoir vu la silhouette corrompue de mon père parmi les monstres de l'Outremonde." },
      { id: 14, q: "14. Que pensez-vous sincèrement des autres clans ?", val: "La plupart gaspillent leur énergie en courbettes tandis que nous saignons pour eux." },
      { id: 15, q: "15. Quelle est votre plus grande peur ou doute intérieur ?", val: "Succomber à la Souillure et trahir mes frères sans même m'en rendre compte.", full: true }
    ]
  },
  {
    title: "IV. Ambitions & Destin (Questions 16 à 20)",
    items: [
      { id: 16, q: "16. Quelle est votre plus haute ambition dans l'Empire ?", val: "Reconquérir Shiro Hiruma et réhabiliter la mémoire de ma lignée." },
      { id: 17, q: "17. Quel est votre rapport avec les heimin et les petites gens ?", val: "Pragmatique : ce sont eux qui forgent nos armes et cultivent notre riz. Je les protège." },
      { id: 18, q: "18. Quel est votre bien ou équipement le plus cher ?", val: "Mon doigt de jade gravé et l'arc composite hérité de mon aïeul." },
      { id: 19, q: "19. De quelle manière honorable envisagez-vous votre mort ?", val: "Debout sur le Mur, l'arme brisée au milieu d'une pile de gobelins pour protéger ma patrouille." },
      { id: 20, q: "20. Comment vos ancêtres et votre seigneur vous jugeront-ils ?", val: "Comme un guerrier silencieux qui n'a jamais reculé d'un pas devant l'ennemi.", full: true }
    ]
  }
];

function injectForgeTemplates() {
  const qMount = document.getElementById('twenty-questions-mount');
  if (qMount && !document.getElementById('q20-1')) {
    qMount.innerHTML = TWENTY_QUESTIONS_SECTIONS.map((sec, idx) => `
      <details class="q20-chapter rounded-xl border border-stone-800/80 bg-black/40 p-3.5 space-y-3" data-q20-chap="${idx}" ${idx === 0 ? 'open' : ''}>
        <summary class="flex items-center justify-between cursor-pointer select-none list-none text-xs font-bold font-imperial text-amber-300 uppercase tracking-wider">
          <span>${sec.title}</span>
          <span class="flex items-center gap-2">
            <span id="q20-chap-count-${idx}" class="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">${sec.items.length}/${sec.items.length}</span>
            <span class="text-amber-400 text-[10px]">▾</span>
          </span>
        </summary>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-stone-800/70">
          ${sec.items.map(item => `
            <div class="${item.full ? 'md:col-span-2' : ''}">
              <label class="block text-stone-300 font-bold mb-1" for="q20-${item.id}">${item.q}</label>
              <input type="text" id="q20-${item.id}" value="${item.val.replace(/"/g, '&quot;')}" oninput="updateTwentyQuestionsProgress()" class="w-full p-2 rounded text-xs">
            </div>
          `).join('')}
        </div>
      </details>
    `).join('');
  }

  const printDossier = document.getElementById('official-print-dossier');
  if (printDossier && !document.getElementById('print-sheet')) {
    printDossier.innerHTML = `
      <div class="l5r-preview-toolbar no-print flex flex-wrap items-center justify-between gap-2 text-xs text-stone-200">
        <div class="flex items-center gap-2.5">
          <span class="font-imperial font-bold text-amber-300 text-sm">📜 Feuille de Personnage Officielle (A4 Couleur)</span>
          <label class="flex items-center gap-1.5 text-[11px] text-stone-300 bg-black/50 border border-stone-700 rounded-md px-2 py-1 cursor-pointer hover:border-amber-500/50">
            <input type="checkbox" id="toggle-print-story" checked onchange="togglePrintStorySection(this.checked)" class="accent-amber-500">
            <span>Inclure Récit &amp; 20 Questions</span>
          </label>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" id="btn-download-pdf-sheet" onclick="downloadCharacterSheetPDF()" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-extrabold font-imperial cursor-pointer shadow flex items-center gap-1.5" title="Télécharger directement un fichier PDF identique à cet aperçu couleur">
            <span>📥 Enregistrer PDF (fidèle)</span>
          </button>
          <button type="button" onclick="triggerSheetPrint()" class="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-500/40 font-bold font-imperial cursor-pointer" title="Ouvrir la boîte d'impression du navigateur">
            🖨️ Imprimer
          </button>
          <button type="button" onclick="closeCharacterSheetPreview()" class="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 font-bold cursor-pointer">
            ✕ Fermer
          </button>
        </div>
      </div>

      <div id="print-sheet">
        <!-- ===================== PAGE 1 : COMBAT, ANNEAUX & COMPÉTENCES ===================== -->
        <section id="print-page-1" class="l5r-sheet-page space-y-2.5">
          <!-- En-tête Impérial -->
          <div class="grid grid-cols-12 gap-3 items-center border-b-2 border-[#7c6a4a] pb-2">
            <div class="col-span-7 space-y-1.5 text-[10.5px]">
              <div class="l5r-header-row-main flex items-center gap-2 border-b border-[#8c7b5c] pb-1.5 pt-0.5">
                <span class="font-imperial font-bold text-[#4a3b26] uppercase text-[9px] w-14 shrink-0 leading-normal">Nom</span>
                <span id="p-name" class="font-imperial font-bold text-[16px] tracking-wide text-[#1a1610] leading-snug">Samouraï</span>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="l5r-header-row flex items-center gap-1.5 border-b border-[#b7aa90] pb-1 pt-0.5">
                  <span class="font-imperial font-bold text-[#4a3b26] uppercase text-[8.5px] shrink-0 leading-normal">Clan</span>
                  <span id="p-clan" class="font-semibold text-[#1f1a14] leading-snug">Crabe</span>
                </div>
                <div class="l5r-header-row flex items-center gap-1.5 border-b border-[#b7aa90] pb-1 pt-0.5">
                  <span class="font-imperial font-bold text-[#4a3b26] uppercase text-[8.5px] shrink-0 leading-normal">Famille</span>
                  <span id="p-family" class="font-semibold text-[#1f1a14] leading-snug">—</span>
                </div>
              </div>
              <div class="l5r-header-row flex items-center gap-2 border-b border-[#b7aa90] pb-1 pt-0.5">
                <span class="font-imperial font-bold text-[#4a3b26] uppercase text-[8.5px] w-14 shrink-0 leading-normal">École</span>
                <span id="p-school" class="font-semibold text-[#1f1a14] leading-snug">École de bushi Hida</span>
              </div>
            </div>

            <div class="col-span-5 flex items-center justify-between gap-2 bg-[#efe6cf]/90 border border-[#8c7b5c] rounded px-2.5 py-1.5">
              <div class="space-y-0.5 text-[9.5px] min-w-0 flex-1">
                <div class="font-imperial font-bold text-[10px] tracking-wider uppercase text-[#7b2319]">La Légende des Cinq Anneaux</div>
                <div><b class="text-[#4a3b26]">Réputation :</b> <span id="p-insight" class="font-bold">120 pts (Rang 1)</span></div>
                <div><b class="text-[#4a3b26]">Points d'XP :</b> <span id="p-xp" class="font-bold">40 / 40 XP</span></div>
                <div class="text-[8px] text-[#6a5d47] italic">Réputation = (Anneaux × 10) + Compétences</div>
              </div>
              <svg viewBox="0 0 64 64" class="w-12 h-12 shrink-0" aria-hidden="true">
                <circle cx="32" cy="14" r="9.5" fill="#f4ece4" stroke="#6b4423" stroke-width="2"/>
                <text x="32" y="17.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#422610">土</text>
                <circle cx="49" cy="27" r="9.5" fill="#e6f7fc" stroke="#3898c8" stroke-width="2"/>
                <text x="49" y="30.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#0c4a6e">風</text>
                <circle cx="42" cy="48" r="9.5" fill="#fceae4" stroke="#c0392b" stroke-width="2"/>
                <text x="42" y="51.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#69180d">火</text>
                <circle cx="22" cy="48" r="9.5" fill="#e3eef9" stroke="#1d5fa7" stroke-width="2"/>
                <text x="22" y="51.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#10345e">水</text>
                <circle cx="15" cy="27" r="9.5" fill="#f2eafc" stroke="#6d28d9" stroke-width="2"/>
                <text x="15" y="30.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#3b0764">空</text>
              </svg>
            </div>
          </div>

          <!-- Rangée Supérieure : Les 5 Anneaux & Huit Traits + Honneur / Gloire / Statut / Souillure -->
          <div class="grid grid-cols-12 gap-2.5 items-stretch">
            <!-- 5 Anneaux colorés -->
            <div class="col-span-8 l5r-box p-2 flex flex-col justify-between">
              <div class="grid grid-cols-5 gap-1.5 text-center">
                <!-- TERRE -->
                <div class="l5r-ring-earth rounded p-1.5 flex flex-col justify-between">
                  <div>
                    <div class="font-imperial font-bold text-[9.5px] tracking-wider uppercase">土 Terre</div>
                    <div class="l5r-ring-dot w-7 h-7 rounded-full mx-auto my-1 flex items-center justify-center font-imperial font-bold text-sm shadow-sm" id="p-r-earth">2</div>
                  </div>
                  <div class="space-y-0.5 text-[8.5px] border-t border-[#6b4423]/30 pt-1">
                    <div class="flex justify-between px-0.5"><span>Const.</span><b id="p-t-sta" class="font-imperial">2</b></div>
                    <div class="flex justify-between px-0.5"><span>Volonté</span><b id="p-t-wil" class="font-imperial">2</b></div>
                  </div>
                </div>
                <!-- AIR -->
                <div class="l5r-ring-air rounded p-1.5 flex flex-col justify-between">
                  <div>
                    <div class="font-imperial font-bold text-[9.5px] tracking-wider uppercase">風 Air</div>
                    <div class="l5r-ring-dot w-7 h-7 rounded-full mx-auto my-1 flex items-center justify-center font-imperial font-bold text-sm shadow-sm" id="p-r-air">2</div>
                  </div>
                  <div class="space-y-0.5 text-[8.5px] border-t border-[#3898c8]/30 pt-1">
                    <div class="flex justify-between px-0.5"><span>Réfl.</span><b id="p-t-ref" class="font-imperial">2</b></div>
                    <div class="flex justify-between px-0.5"><span>Intuit.</span><b id="p-t-awa" class="font-imperial">2</b></div>
                  </div>
                </div>
                <!-- EAU -->
                <div class="l5r-ring-water rounded p-1.5 flex flex-col justify-between">
                  <div>
                    <div class="font-imperial font-bold text-[9.5px] tracking-wider uppercase">水 Eau</div>
                    <div class="l5r-ring-dot w-7 h-7 rounded-full mx-auto my-1 flex items-center justify-center font-imperial font-bold text-sm shadow-sm" id="p-r-water">2</div>
                  </div>
                  <div class="space-y-0.5 text-[8.5px] border-t border-[#1d5fa7]/30 pt-1">
                    <div class="flex justify-between px-0.5"><span>Force</span><b id="p-t-str" class="font-imperial">2</b></div>
                    <div class="flex justify-between px-0.5"><span>Perc.</span><b id="p-t-per" class="font-imperial">2</b></div>
                  </div>
                </div>
                <!-- FEU -->
                <div class="l5r-ring-fire rounded p-1.5 flex flex-col justify-between">
                  <div>
                    <div class="font-imperial font-bold text-[9.5px] tracking-wider uppercase">火 Feu</div>
                    <div class="l5r-ring-dot w-7 h-7 rounded-full mx-auto my-1 flex items-center justify-center font-imperial font-bold text-sm shadow-sm" id="p-r-fire">2</div>
                  </div>
                  <div class="space-y-0.5 text-[8.5px] border-t border-[#c0392b]/30 pt-1">
                    <div class="flex justify-between px-0.5"><span>Agil.</span><b id="p-t-agi" class="font-imperial">2</b></div>
                    <div class="flex justify-between px-0.5"><span>Intell.</span><b id="p-t-int" class="font-imperial">2</b></div>
                  </div>
                </div>
                <!-- VIDE -->
                <div class="l5r-ring-void rounded p-1.5 flex flex-col justify-between">
                  <div>
                    <div class="font-imperial font-bold text-[9.5px] tracking-wider uppercase">空 Vide</div>
                    <div class="l5r-ring-dot w-7 h-7 rounded-full mx-auto my-1 flex items-center justify-center font-imperial font-bold text-sm shadow-sm" id="p-r-void">2</div>
                  </div>
                  <div class="space-y-0.5 text-[8.5px] border-t border-[#6d28d9]/30 pt-1">
                    <div class="flex justify-between px-0.5"><span>Réserve</span><b id="p-t-voi" class="font-imperial">2</b></div>
                    <div class="text-[7.5px] text-[#5a4e43]">Points/jour</div>
                  </div>
                </div>
              </div>
              <div class="mt-2 pt-1.5 border-t border-[#c9bea6] flex items-center justify-between text-[8.5px] leading-normal">
                <span class="font-imperial font-bold uppercase text-[#3c342e] tracking-wider">Points de Vide dépensés :</span>
                <div id="p-void-dots" class="flex items-center gap-1"></div>
              </div>
            </div>

            <!-- Honneur / Gloire / Statut / Souillure -->
            <div class="col-span-4 l5r-box overflow-hidden">
              <div class="l5r-bar"><span>Vertus &amp; Renommée</span><span>Rang</span></div>
              <div class="l5r-virtue-list p-2 space-y-2 text-[9px]">
                <div class="l5r-virtue-item">
                  <div class="l5r-virtue-header flex items-center justify-between font-bold text-[#2b241d] leading-snug mb-1">
                    <span class="font-imperial uppercase tracking-wider text-[8.5px]">Honneur</span>
                    <span id="p-honor" class="font-imperial text-[#7b2319]">4.5</span>
                  </div>
                  <div id="p-honor-track" class="l5r-virtue-track flex items-center justify-between gap-0.5 h-[11px]"></div>
                </div>
                <div class="l5r-virtue-item">
                  <div class="l5r-virtue-header flex items-center justify-between font-bold text-[#2b241d] leading-snug mb-1">
                    <span class="font-imperial uppercase tracking-wider text-[8.5px]">Gloire</span>
                    <span id="p-glory" class="font-imperial">1.0</span>
                  </div>
                  <div id="p-glory-track" class="l5r-virtue-track flex items-center justify-between gap-0.5 h-[11px]"></div>
                </div>
                <div class="l5r-virtue-item">
                  <div class="l5r-virtue-header flex items-center justify-between font-bold text-[#2b241d] leading-snug mb-1">
                    <span class="font-imperial uppercase tracking-wider text-[8.5px]">Statut</span>
                    <span id="p-status" class="font-imperial">1.0</span>
                  </div>
                  <div id="p-status-track" class="l5r-virtue-track flex items-center justify-between gap-0.5 h-[11px]"></div>
                </div>
                <div class="l5r-virtue-item">
                  <div class="l5r-virtue-header flex items-center justify-between font-bold text-[#2b241d] leading-snug mb-1">
                    <span class="font-imperial uppercase tracking-wider text-[8.5px]">Souillure Outremonde</span>
                    <span id="p-taint" class="font-imperial text-[#581f1b]">0.0</span>
                  </div>
                  <div id="p-taint-track" class="l5r-virtue-track flex items-center justify-between gap-0.5 h-[11px]"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Corps Principal : Compétences (Gauche) & Combat / Blessures (Droite) -->
          <div class="grid grid-cols-12 gap-2.5 items-stretch">
            <!-- Compétences -->
            <div class="col-span-7 l5r-box overflow-hidden flex flex-col">
              <div class="l5r-bar">
                <span>Compétences &amp; Maîtrises</span>
                <span class="text-[8px] font-normal opacity-85">✓ = École • Trait associé exact</span>
              </div>
              <table class="w-full text-left text-[9px] l5r-table">
                <thead>
                  <tr>
                    <th class="w-6 text-center">Éc.</th>
                    <th>Compétence</th>
                    <th class="w-7 text-center">Rg</th>
                    <th class="w-14 text-center">Trait</th>
                    <th class="w-11 text-center">Jet</th>
                    <th>Spécialités &amp; Maîtrises</th>
                  </tr>
                </thead>
                <tbody id="p-skills-body"></tbody>
              </table>
            </div>

            <!-- Combat, Armure, Blessures & Récupération -->
            <div class="col-span-5 flex flex-col gap-2">
              <!-- Initiative -->
              <div class="l5r-box overflow-hidden">
                <div class="l5r-bar"><span>Initiative</span><span id="p-init" class="text-amber-200 font-bold text-[10.5px]">3g2</span></div>
                <div class="p-2 text-[8.5px] space-y-1 leading-snug">
                  <div class="flex items-center justify-between pb-0.5"><span class="text-[#5a4e43]">Base &amp; Bonus :</span><span id="p-init-note" class="font-medium text-right"></span></div>
                  <div class="flex items-center justify-between border-t border-[#d7d0c0] pt-1"><span class="text-[#5a4e43]">Modif. / Initiative actuelle :</span><span class="text-[#8b7f69]">_______</span></div>
                </div>
              </div>

              <!-- ND d'Armure & Armure -->
              <div class="l5r-box overflow-hidden">
                <div class="l5r-bar"><span>ND d'Armure &amp; Protection</span><span id="p-armor-tn" class="text-amber-200 font-bold text-[11px]">20</span></div>
                <div class="p-2 text-[8.5px] space-y-1 leading-snug">
                  <div id="p-armor-note" class="text-[8px] text-[#4a3e31] pb-0.5"></div>
                  <div class="flex items-center justify-between border-t border-[#d7d0c0] pt-1">
                    <span><b>Armure :</b> <span id="p-armor-name">Aucune</span></span>
                    <span id="p-armor-reduc" class="font-bold text-[#2b5986]">Réduction : 0</span>
                  </div>
                </div>
              </div>

              <!-- Seuils de Blessures -->
              <div class="l5r-box overflow-hidden flex-1 flex flex-col">
                <div class="l5r-bar">
                  <span>Seuils de Blessures</span>
                  <span class="text-[9px]">Total : <b id="p-wounds-total" class="text-amber-200">38 PV</b></span>
                </div>
                <div class="grid grid-cols-2 text-[8px] l5r-cell-lbl border-b border-[#8c7b5c] px-2 py-0.5">
                  <span>Terre ×2 / palier : <b id="p-wounds-earth2">4 PV</b></span>
                  <span class="text-right">Terre ×5 Indemne : <b id="p-wounds-earth5">10 PV</b></span>
                </div>
                <table class="w-full text-[8.5px] text-center l5r-table flex-1">
                  <thead>
                    <tr>
                      <th class="text-left pl-1.5">Palier</th>
                      <th class="w-10">Malus</th>
                      <th class="w-11">Seuil</th>
                      <th class="w-14">Actuel</th>
                    </tr>
                  </thead>
                  <tbody id="p-wounds-body"></tbody>
                </table>
              </div>

              <!-- Récupération -->
              <div class="l5r-box overflow-hidden">
                <div class="l5r-bar"><span>Récupération de Blessures</span><span id="p-heal" class="text-emerald-200 font-bold">5 PV / jour</span></div>
                <div class="px-2 py-1 text-[8px] text-[#5a4e43] flex justify-between">
                  <span>(Constitution × 2) + Rang de Réputation</span>
                  <span>Modif. : ____</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Arsenal en pied de Page 1 -->
          <div id="p-weapons-box" class="l5r-box overflow-hidden"></div>
        </section>

        <!-- ===================== PAGE 2 : TECHNIQUES, AVANTAGES, ÉQUIPEMENT & ARTS ===================== -->
        <section id="print-page-2" class="l5r-sheet-page space-y-2.5">
          <!-- Bandeau Rappel Identité & Bourse -->
          <div class="flex flex-wrap justify-between items-center gap-2 border-b-2 border-[#7c6a4a] pb-2 text-[9.5px] leading-snug">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-imperial font-bold text-sm text-[#1a1610]" id="p-name-2">Samouraï</span>
              <span class="inline-block px-2 pt-0.5 pb-1 rounded bg-[#e3ded0] border border-[#8c7b5c] font-semibold leading-none" id="p-clan-2">Crabe</span>
              <span class="text-[#4a3b26] font-medium" id="p-school-2">École de bushi Hida</span>
            </div>
            <div class="flex items-center gap-2 text-[8.5px] bg-[#efe6cf] border border-[#8c7b5c] rounded px-2 pt-0.5 pb-1">
              <b>Bourse :</b>
              <span>Koku : <b class="inline-block w-6 border-b border-[#7c6a4a] text-center">&nbsp;</b></span>
              <span>Bu : <b class="inline-block w-6 border-b border-[#7c6a4a] text-center">&nbsp;</b></span>
              <span>Zeni : <b class="inline-block w-6 border-b border-[#7c6a4a] text-center">&nbsp;</b></span>
              <span class="text-[7.5px] text-[#6a5d47] italic">(1 Koku = 5 Bu = 50 Zeni)</span>
            </div>
          </div>

          <!-- Avantages & Désavantages -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="l5r-box overflow-hidden">
              <div class="l5r-bar"><span>Avantages</span><span id="p-adv-total">0 XP</span></div>
              <div id="p-adv-list" class="p-2 space-y-1 text-[8.5px] leading-snug"></div>
            </div>
            <div class="l5r-box overflow-hidden">
              <div class="l5r-bar l5r-bar-crimson"><span>Désavantages</span><span id="p-disadv-total">0 / 15 XP</span></div>
              <div id="p-disadv-list" class="p-2 space-y-1 text-[8.5px] leading-snug"></div>
            </div>
          </div>

          <!-- Techniques d'École & Équipement -->
          <div class="grid grid-cols-12 gap-2.5 items-stretch">
            <div class="col-span-8 l5r-box overflow-hidden">
              <div class="l5r-bar"><span id="p-tech-name">Techniques d'École</span><span>Progression</span></div>
              <div id="p-tech-desc" class="p-2 text-[8.5px] space-y-1.5 leading-snug"></div>
            </div>
            <div class="col-span-4 l5r-box overflow-hidden flex flex-col">
              <div class="l5r-bar"><span>Équipement &amp; Nécessaire</span></div>
              <div id="p-outfit-desc" class="p-2 text-[8.5px] leading-relaxed flex-1 whitespace-pre-line"></div>
            </div>
          </div>

          <!-- Arts Martiaux & Mystiques (Sorts / Kihos / Katas / Tatouages) -->
          <div id="p-mystic-print-section" class="l5r-box overflow-hidden">
            <div id="p-mystic-bar" class="l5r-bar">
              <span id="p-mystic-bar-title">Voies Martiales &amp; Mystiques (Sorts, Kihos, Katas &amp; Tatouages)</span>
              <span id="p-mystic-summary" class="text-[8px] font-normal"></span>
            </div>
            <div class="p-2 space-y-2">
              <div id="p-spell-slots-bar-print" class="hidden rounded border border-[#9c8c6d] bg-[#f0e9d6] p-1.5 space-y-1 text-[8px]"></div>
              <div id="p-spells-katas-box" class="grid grid-cols-2 gap-1.5 text-[8.5px]"></div>
              <div id="p-tattoos-print-box" class="hidden grid grid-cols-2 gap-1.5 text-[8.5px]"></div>
            </div>
          </div>
        </section>

        <!-- ===================== PAGE 3 : RÉCIT & LES 20 QUESTIONS ===================== -->
        <section id="print-page-story" class="l5r-sheet-page space-y-2.5">
          <div class="l5r-bar">
            <span>Chronique du Samouraï &amp; Les Vingt Questions de Rokugan</span>
            <span class="text-[8px] font-normal opacity-85">Histoire personnelle &amp; Destin</span>
          </div>
          <div id="p-background-story-wrap" class="l5r-box p-2 text-[8.5px] leading-relaxed">
            <div class="font-imperial font-bold uppercase text-[8px] text-[#4a3b26] border-b border-[#c9bea6] pb-0.5 mb-1">Récit &amp; Faits Marquants</div>
            <div id="p-background-story" class="whitespace-pre-line"></div>
          </div>
          <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[8px] leading-snug" id="p-20questions-box"></div>
        </section>
      </div>
    `;
  }

  if (document.body && document.getElementById('forge-stepper-bar') && !document.getElementById('mobile-app-dock')) {
    const mobileWrapper = document.createElement('div');
    mobileWrapper.id = 'mobile-app-shell';
    mobileWrapper.className = 'md:hidden no-print';
    mobileWrapper.innerHTML = `
      <div id="mobile-more-sheet" class="hidden fixed inset-0 z-[55] bg-black/75 backdrop-blur-sm flex items-end justify-center no-print" role="dialog" aria-modal="true" aria-label="Menu d'actions mobile">
        <div class="l5r-mobile-sheet-panel w-full max-w-lg rounded-t-2xl bg-[#140e0d] border-t-2 border-amber-500/50 p-4 space-y-2.5 shadow-2xl max-h-[82vh] overflow-y-auto">
          <div class="w-10 h-1 rounded-full bg-stone-700 mx-auto mb-1"></div>
          <div class="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <span class="font-imperial font-bold text-sm text-amber-300">⚔️ Actions &amp; Export Samouraï</span>
            <button type="button" onclick="toggleMobileMoreSheet(false)" class="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 border border-stone-700 text-xs font-bold cursor-pointer">✕ Fermer</button>
          </div>
          <div class="grid grid-cols-1 gap-2 text-xs">
            <button type="button" onclick="toggleMobileMoreSheet(false); downloadCharacterSheetPDF();" class="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-extrabold font-imperial flex items-center justify-between cursor-pointer shadow">
              <span>📥 Enregistrer le PDF (fidèle A4)</span>
              <span class="text-[10px] opacity-80">Couleur 1:1</span>
            </button>
            <button type="button" onclick="toggleMobileMoreSheet(false); if(window.exportToCarnetRokugan) exportToCarnetRokugan();" class="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-stone-900 border border-amber-500/45 text-amber-200 font-bold flex items-center justify-between cursor-pointer">
              <span>📖 Exporter « Carnet de Rokugan »</span>
              <span class="text-[10px] text-amber-400">JSON v2</span>
            </button>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="toggleMobileMoreSheet(false); if(window.shareCharacterUrl) shareCharacterUrl();" class="min-h-[44px] px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-amber-200 font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                <span>🔗</span><span>Partager lien</span>
              </button>
              <button type="button" onclick="toggleMobileMoreSheet(false); saveCharacterToDojo(false);" class="min-h-[44px] px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                <span>💾</span><span>Sauver Dojo</span>
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="toggleMobileMoreSheet(false); if(window.exportJSONWithMystic) exportJSONWithMystic();" class="min-h-[44px] px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                <span>⬇️</span><span>Export JSON</span>
              </button>
              <button type="button" onclick="toggleMobileMoreSheet(false); document.getElementById('json-input')?.click();" class="min-h-[44px] px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                <span>📂</span><span>Charger JSON</span>
              </button>
            </div>
            <button type="button" onclick="toggleMobileMoreSheet(false); if(window.promptPWAInstall) window.promptPWAInstall();" class="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/45 text-emerald-200 font-bold flex items-center justify-between cursor-pointer">
              <span>📲 Installer l'App sur téléphone</span>
              <span class="text-[10px] text-emerald-300">iOS / Android</span>
            </button>
            <div class="grid grid-cols-2 gap-2 pt-1 border-t border-stone-800/80">
              <button type="button" onclick="toggleMobileMoreSheet(false); setForgeStep('all');" class="min-h-[42px] px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-amber-300 font-bold cursor-pointer">
                🧭 Vue complète
              </button>
              <button type="button" onclick="toggleMobileMoreSheet(false); if(window.resetCharacterWithMystic) resetCharacterWithMystic();" class="min-h-[42px] px-3 py-2 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 font-bold cursor-pointer">
                🔄 Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav id="mobile-app-dock" aria-label="Navigation rapide application mobile" class="l5r-mobile-dock fixed bottom-0 inset-x-0 z-50 md:hidden no-print">
        <div class="grid grid-cols-5 h-[58px] text-[10px] font-bold">
          <button type="button" data-mobile-tab="forge" onclick="handleMobileTab('forge')" class="l5r-mobile-tab active flex flex-col items-center justify-center gap-0.5 cursor-pointer">
            <span class="text-base leading-none">⛩️</span>
            <span class="leading-none flex items-center gap-1">Forge <span id="mobile-dock-step-badge" class="text-[9px] font-mono opacity-80">1/6</span></span>
          </button>
          <button type="button" data-mobile-tab="dojo" onclick="handleMobileTab('dojo')" class="l5r-mobile-tab flex flex-col items-center justify-center gap-0.5 cursor-pointer relative">
            <span class="text-base leading-none">🏯</span>
            <span class="leading-none">Dojo</span>
            <span id="mobile-dock-dojo-count" class="absolute top-1.5 right-3 min-w-[16px] h-4 px-1 rounded-full bg-amber-600 text-black text-[9px] font-extrabold font-mono flex items-center justify-center">0</span>
          </button>
          <button type="button" data-mobile-tab="dice" onclick="handleMobileTab('dice')" class="l5r-mobile-tab flex flex-col items-center justify-center gap-0.5 cursor-pointer">
            <span class="text-base leading-none">🎲</span>
            <span class="leading-none">Dés XgY</span>
          </button>
          <button type="button" data-mobile-tab="sheet" onclick="handleMobileTab('sheet')" class="l5r-mobile-tab flex flex-col items-center justify-center gap-0.5 cursor-pointer">
            <span class="text-base leading-none">📄</span>
            <span class="leading-none">Fiche PDF</span>
          </button>
          <button type="button" data-mobile-tab="more" onclick="handleMobileTab('more')" class="l5r-mobile-tab flex flex-col items-center justify-center gap-0.5 cursor-pointer">
            <span class="text-base leading-none">⋯</span>
            <span class="leading-none">Plus</span>
          </button>
        </div>
      </nav>
    `;
    mobileWrapper.querySelector('#mobile-more-sheet')?.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'mobile-more-sheet') toggleMobileMoreSheet(false);
    });
    document.body.appendChild(mobileWrapper);
  }
}

// Exécution immédiate au chargement du script (avant DOMContentLoaded)
injectForgeTemplates();

function getElementBadgeClass(elem) {
  const e = (elem || "").toString().toLowerCase();
  if (e.includes("terre") || e.includes("earth")) return "badge-elem-terre";
  if (e.includes("eau") || e.includes("water")) return "badge-elem-eau";
  if (e.includes("feu") || e.includes("fire")) return "badge-elem-feu";
  if (e.includes("air")) return "badge-elem-air";
  if (e.includes("vide") || e.includes("void")) return "badge-elem-vide";
  if (e.includes("kiho")) return "badge-elem-kiho";
  return "badge-elem-universel";
}

function getRingValueForElement(elem) {
  const e = (elem || "").toString().toLowerCase();
  if (e.includes("terre") || e.includes("earth")) return parseInt(document.getElementById('ring-earth')?.textContent) || 2;
  if (e.includes("eau") || e.includes("water")) return parseInt(document.getElementById('ring-water')?.textContent) || 2;
  if (e.includes("air")) return parseInt(document.getElementById('ring-air')?.textContent) || 2;
  if (e.includes("feu") || e.includes("fire")) return parseInt(document.getElementById('ring-fire')?.textContent) || 2;
  if (e.includes("vide") || e.includes("void")) return parseInt(document.getElementById('ring-void')?.textContent) || 2;
  return parseInt(document.getElementById('ring-void')?.textContent) || 2;
}

function getCurrentSchoolRank() {
  const insightTxt = document.getElementById('insight-display')?.textContent || "Rang 1";
  const m = insightTxt.match(/Rang\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : 1;
}

function getActiveForgePermissions() {
  const schObj = typeof getSelectedSchoolObject === "function" ? getSelectedSchoolObject() : null;
  const primarySchool = schObj?.school || null;
  const multiAdv = (window.advantagesList || []).find(a => (typeof isMultipleSchoolsAdv === 'function') && isMultipleSchoolsAdv(a.name));
  let secondarySchool = null;
  if (multiAdv && multiAdv.secondarySchoolId && typeof window.getAllSchoolsCatalog === 'function') {
    secondarySchool = window.getAllSchoolsCatalog().find(s => s.id === multiAdv.secondarySchoolId) || null;
  }
  const isTattooed = typeof isCharacterTogashiTattooed === 'function' ? isCharacterTogashiTattooed() : false;

  let perms = null;
  if (typeof window.getCharacterArchetypePermissions === 'function') {
    perms = window.getCharacterArchetypePermissions(primarySchool, secondarySchool, isTattooed);
  } else {
    const t = String(primarySchool?.type || 'Bushi').toLowerCase();
    perms = {
      primaryType: t.includes('shugenja') ? 'shugenja' : t.includes('moine') ? 'moine' : t.includes('courtisan') ? 'courtisan' : t.includes('ninja') ? 'ninja' : 'bushi',
      secondaryType: null,
      canCastSpells: t.includes('shugenja'),
      canUseKatas: t.includes('bushi') || t.includes('ninja'),
      canUseKihos: t.includes('shugenja') || t.includes('moine'),
      canUseTattoos: isTattooed
    };
  }
  return { ...perms, primarySchool, secondarySchool, hasMultiAdv: !!multiAdv };
}

function sanitizeMysticListsForPermissions(perms, notify = false) {
  if (!perms) return false;
  const removed = [];

  if (Array.isArray(window.charSpellsList) && window.charSpellsList.length > 0) {
    const keptSpells = window.charSpellsList.filter(item => {
      const isKiho = !!item.isKiho || (item.element || '').toLowerCase() === 'kiho';
      if (isKiho && !perms.canUseKihos) {
        removed.push(item.name || 'Kiho');
        return false;
      }
      if (!isKiho && !perms.canCastSpells) {
        removed.push(item.name || 'Sort');
        return false;
      }
      return true;
    });
    if (keptSpells.length !== window.charSpellsList.length) {
      window.charSpellsList = keptSpells;
      if (typeof renderCharacterSpells === 'function') renderCharacterSpells();
    }
  }

  if (!perms.canUseKatas && Array.isArray(window.charKatasList) && window.charKatasList.length > 0) {
    window.charKatasList.forEach(k => removed.push(k.name || 'Kata'));
    window.charKatasList = [];
    if (typeof renderCharacterKatas === 'function') renderCharacterKatas();
  }

  if (!perms.canUseTattoos && Array.isArray(window.charTattoosList) && window.charTattoosList.length > 0) {
    window.charTattoosList.forEach(t => removed.push(t.name || 'Tatouage'));
    window.charTattoosList = [];
    if (typeof renderCharacterTattoos === 'function') renderCharacterTattoos();
  }

  if (removed.length > 0) {
    if (typeof updateAll === 'function') updateAll();
    if (notify && typeof showForgeToast === 'function') {
      showForgeToast(`Règle L5R 4e : ${removed.length} élément(s) incompatible(s) retiré(s) (${removed.slice(0, 2).join(', ')}${removed.length > 2 ? '…' : ''}).`, 'info');
    }
    return true;
  }
  return false;
}

function applySpellsFilterConstraints(perms) {
  const elemSel = document.getElementById('filter-spell-elem');
  const univBtn = document.getElementById('btn-add-universal-spells');
  const titleEl = document.getElementById('spells-panel-title');
  const hintEl = document.getElementById('spells-panel-footer-hint');

  if (elemSel) {
    Array.from(elemSel.options).forEach(opt => {
      if (opt.value === 'kiho') {
        const allowKihoOpt = perms.canUseKihos;
        opt.hidden = !allowKihoOpt;
        opt.disabled = !allowKihoOpt;
      } else if (opt.value === 'tous') {
        const allowAll = perms.canCastSpells;
        opt.hidden = !allowAll;
        opt.disabled = !allowAll;
        opt.textContent = (perms.canCastSpells && perms.canUseKihos)
          ? 'Tous les Éléments & Kihos'
          : 'Tous les Éléments (Sorts)';
      } else {
        const allowElem = perms.canCastSpells;
        opt.hidden = !allowElem;
        opt.disabled = !allowElem;
      }
    });

    if (!perms.canCastSpells && perms.canUseKihos) {
      elemSel.value = 'kiho';
    } else if (perms.canCastSpells && !perms.canUseKihos && elemSel.value === 'kiho') {
      elemSel.value = 'tous';
    }
  }

  if (univBtn) univBtn.classList.toggle('hidden', !perms.canCastSpells);

  if (titleEl) {
    if (perms.canCastSpells && perms.canUseKihos) {
      titleEl.innerHTML = '<span>📜</span> 5A. Parchemins de Sorts &amp; Kihos';
    } else if (perms.canCastSpells) {
      titleEl.innerHTML = '<span>📜</span> 5A. Parchemins de Sorts';
    } else {
      titleEl.innerHTML = '<span>🥋</span> 5A. Voies Mystiques (Kihos)';
    }
  }

  if (hintEl) {
    if (perms.canCastSpells && perms.canUseKihos) {
      hintEl.textContent = 'Parchemins : 0 XP • Kihos : Maîtrise en XP.';
    } else if (perms.canCastSpells) {
      hintEl.textContent = 'Parchemins de sorts : 0 XP (Sorts de départ & parchemins).';
    } else {
      hintEl.textContent = 'Kihos (Confrérie de Shinsei) : Maîtrise en XP.';
    }
  }
}

let _isRefreshingArchetypePanels = false;
let _lastSpellsPermissionKey = '';
function updateArchetypePanels(notifySanitize = false, forceCatalogRefresh = false) {
  if (_isRefreshingArchetypePanels) return;
  _isRefreshingArchetypePanels = true;
  try {
    const perms = getActiveForgePermissions();
    sanitizeMysticListsForPermissions(perms, notifySanitize);
    applySpellsFilterConstraints(perms);

    const spellsPanel = document.getElementById('panel-spells-container');
    const katasPanel = document.getElementById('panel-katas-container');
    const tattoosPanel = document.getElementById('panel-tattoos-container');
    const courtierNote = document.getElementById('panel-courtier-note');
    const slotsBar = document.getElementById('shugenja-slots-bar');
    const archetypeBadge = document.getElementById('archetype-active-badge');
    const tabGroup = document.getElementById('mystic-tab-group');
    const tabKatas = document.getElementById('tab-btn-katas');
    const tabSpells = document.getElementById('tab-btn-spells');
    const tabTattoos = document.getElementById('tab-btn-tattoos');

    if (!spellsPanel || !katasPanel) return;

    const allowSpellsOrKihos = perms.canCastSpells || perms.canUseKihos;
    const allowKatas = perms.canUseKatas;
    const allowTattoos = perms.canUseTattoos;
    const allowedCount = (allowSpellsOrKihos ? 1 : 0) + (allowKatas ? 1 : 0) + (allowTattoos ? 1 : 0);

    spellsPanel.classList.toggle('hidden', !allowSpellsOrKihos);
    if (slotsBar) slotsBar.classList.toggle('hidden', !perms.canCastSpells);
    katasPanel.classList.toggle('hidden', !allowKatas);
    if (tattoosPanel) tattoosPanel.classList.toggle('hidden', !allowTattoos);
    if (courtierNote) courtierNote.classList.toggle('hidden', allowedCount > 0);

    if (tabKatas) tabKatas.classList.toggle('hidden', !allowKatas);
    if (tabSpells) {
      tabSpells.classList.toggle('hidden', !allowSpellsOrKihos);
      tabSpells.textContent = (!perms.canCastSpells && perms.canUseKihos) ? 'Kihos' : 'Sorts / Kihos';
    }
    if (tabTattoos) tabTattoos.classList.toggle('hidden', !allowTattoos);
    if (tabGroup) tabGroup.classList.toggle('hidden', allowedCount <= 1);

    document.querySelectorAll('#mystic-tab-group [data-mystic-tab]').forEach(btn => {
      const isAuto = btn.dataset.mysticTab === 'auto';
      btn.classList.toggle('active', isAuto);
      btn.classList.toggle('text-stone-400', !isAuto);
    });

    if (archetypeBadge) {
      let badgeHtml = '';
      if (perms.canUseTattoos && !allowKatas && !allowSpellsOrKihos) {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold font-imperial">Chair Tatouée (Ise Zumi)</span>`;
      } else if (perms.primaryType === 'shugenja') {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">Voie des Kamis (Shugenja)</span>`;
      } else if (perms.primaryType === 'moine') {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-500/40 font-bold">Voie de la Confrérie (Moine)</span>`;
      } else if (perms.primaryType === 'bushi' || perms.primaryType === 'ninja') {
        const label = perms.primaryType === 'ninja' ? 'Ombre (Shinobi)' : 'Voie Martiale (Bushi)';
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 font-bold">${label}</span>`;
      } else {
        badgeHtml = `<span class="px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-700 font-bold">Voie de la Cour &amp; de la Loi</span>`;
      }
      if (perms.secondarySchool) {
        badgeHtml += ` <span class="px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/40 font-bold">+ ${perms.secondarySchool.type} (${perms.secondarySchool.name})</span>`;
      }
      archetypeBadge.innerHTML = badgeHtml;
    }

    const permKey = `${perms.canCastSpells}|${perms.canUseKihos}`;
    if (allowSpellsOrKihos && (forceCatalogRefresh || permKey !== _lastSpellsPermissionKey)) {
      _lastSpellsPermissionKey = permKey;
      populateSpellCatalogSelect();
    } else if (!allowSpellsOrKihos) {
      _lastSpellsPermissionKey = permKey;
    }

    if (allowTattoos) {
      if (forceCatalogRefresh) populateTattooCatalogSelect();
      renderCharacterTattoos();
    }
  } finally {
    _isRefreshingArchetypePanels = false;
  }
}

function foldForgeSearch(str) {
  return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function populateSpellCatalogSelect(autoSelectFirst = false) {
  const sel = document.getElementById('sel-catalog-spell');
  if (!sel) return;
  const allSpells = window.SORTS_DATA || [];
  const perms = getActiveForgePermissions();
  const elemFilter = document.getElementById('filter-spell-elem')?.value || "tous";
  const rankFilter = document.getElementById('filter-spell-rank')?.value || "tous";
  const searchFilter = foldForgeSearch(document.getElementById('filter-spell-search')?.value || "");

  const filtered = allSpells.filter(s => {
    if (s.isMaho || (s.element && s.element.toLowerCase() === "maho")) return false;
    const isKiho = !!s.isKiho || (s.element || "").toLowerCase() === "kiho";
    if (!perms.canCastSpells && !isKiho) return false;
    if (!perms.canUseKihos && isKiho) return false;
    const sElem = (isKiho ? "kiho" : (s.element || "universel")).toLowerCase();
    const matchElem = elemFilter === "tous" || sElem === elemFilter;
    const sRank = Number(s.mastery) || 0;
    const matchRank = rankFilter === "tous" || (rankFilter === "6" ? sRank >= 6 : sRank === parseInt(rankFilter, 10));
    if (!matchElem || !matchRank) return false;
    if (!searchFilter) return true;
    const hay = foldForgeSearch(`${s.name || s.nom || ''} ${s.element || ''} ${(s.keywords || []).join(' ')} ${s.description || ''}`);
    return hay.includes(searchFilter);
  });

  const emptyPlaceholder = (!perms.canCastSpells && perms.canUseKihos)
    ? `-- Choisir un kiho (${filtered.length} disponible(s)) --`
    : (perms.canCastSpells && !perms.canUseKihos)
      ? `-- Choisir un sort (${filtered.length} disponible(s)) --`
      : `-- Choisir un sort ou kiho (${filtered.length} disponible(s)) --`;
  sel.innerHTML = `<option value="">${emptyPlaceholder}</option>`;
  const frag = document.createDocumentFragment();
  filtered.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    const tag = s.isKiho ? `Kiho ${s.ring || s.element}` : (s.element || "Univ.");
    const rk = s.mastery === 0 ? "Univ." : `Rang ${s.mastery}`;
    opt.textContent = `[${tag} • ${rk}] ${s.name || s.nom}`;
    frag.appendChild(opt);
  });
  sel.appendChild(frag);
  if (autoSelectFirst && searchFilter && filtered.length > 0) {
    sel.value = filtered[0].id;
  }
  updateSpellPreview();
}

function updateSpellPreview() {
  const sel = document.getElementById('sel-catalog-spell');
  const card = document.getElementById('spell-preview-card');
  if (!sel || !card) return;
  const id = sel.value;
  if (!id) { card.classList.add('hidden'); return; }

  const allSpells = window.SORTS_DATA || [];
  const s = allSpells.find(item => item.id === id);
  if (!s) { card.classList.add('hidden'); return; }

  const mastery = Number(s.mastery) || 0;
  const tn = mastery === 0 ? 10 : (5 + 5 * mastery);
  const elemLabel = s.isKiho ? `Kiho (${s.ring || "Terre"})` : (s.element || "Universel");
  const ringToUse = s.isKiho ? (s.ring || "Terre") : (s.element || "Vide");
  const ringVal = getRingValueForElement(ringToUse);
  const schoolRank = getCurrentSchoolRank();

  const affinity = document.getElementById('shugenja-affinity')?.value || "aucune";
  const deficiency = document.getElementById('shugenja-deficiency')?.value || "aucune";
  let effRank = schoolRank;
  if (affinity !== "aucune" && ringToUse.toLowerCase().includes(affinity)) effRank += 1;
  if (deficiency !== "aucune" && ringToUse.toLowerCase().includes(deficiency)) effRank -= 1;

  const castPool = `${ringVal + Math.max(1, effRank)}g${ringVal}`;

  document.getElementById('spell-preview-name').textContent = s.name || s.nom;
  const elemBadge = document.getElementById('spell-preview-elem');
  elemBadge.textContent = `${elemLabel} • Maîtrise ${mastery === 0 ? 'Universel' : mastery}`;
  elemBadge.className = `text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${getElementBadgeClass(s.isKiho ? 'kiho' : s.element)}`;

  const kwEl = document.getElementById('spell-preview-keywords');
  kwEl.textContent = Array.isArray(s.keywords) && s.keywords.length ? s.keywords.join(", ") : "Standard";

  document.getElementById('spell-preview-tn').textContent = `ND ${tn}`;
  document.getElementById('spell-preview-cast-Access').textContent = `Jet : ${castPool}`;
  document.getElementById('spell-preview-range').textContent = s.range || "Personnelle";
  document.getElementById('spell-preview-area').textContent = s.area || "Spéciale";
  document.getElementById('spell-preview-duration').textContent = s.duration || "Instantanée";
  document.getElementById('spell-preview-raises').textContent = s.raises || "Aucune";
  document.getElementById('spell-preview-desc').textContent = s.desc || "";

  card.classList.remove('hidden');
}

function addSpellFromCatalog() {
  const sel = document.getElementById('sel-catalog-spell');
  if (!sel || !sel.value) return;
  const allSpells = window.SORTS_DATA || [];
  const found = allSpells.find(s => s.id === sel.value);
  if (!found) return;
  const perms = getActiveForgePermissions();
  const isKiho = !!found.isKiho || (found.element || '').toLowerCase() === 'kiho';
  if ((isKiho && !perms.canUseKihos) || (!isKiho && !perms.canCastSpells)) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Action bloquée : votre école actuelle n'a pas accès à cette voie (règle L5R 4e).", 'warning');
    }
    return;
  }
  if (window.charSpellsList.some(s => s.id === found.id)) {
    alert("Ce sort ou kiho figure déjà dans votre grimoire personnel.");
    return;
  }
  const defaultXp = found.isKiho ? (Number(found.mastery) || 3) : 0;
  window.charSpellsList.push({
    id: found.id,
    name: found.name || found.nom,
    element: found.isKiho ? "kiho" : (found.element || "Universel"),
    ring: found.ring || found.element || "Vide",
    mastery: Number(found.mastery) || 0,
    range: found.range || "Personnelle",
    area: found.area || "Spéciale",
    duration: found.duration || "Instantanée",
    raises: found.raises || "Aucune",
    desc: found.desc || "",
    isKiho: !!found.isKiho,
    xpCost: defaultXp
  });
  renderCharacterSpells();
  if (typeof updateAll === "function") updateAll();
}

function addUniversalSpells() {
  const perms = getActiveForgePermissions();
  if (!perms.canCastSpells) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Seule une école de Shugenja donne accès aux Sorts Universels.", 'warning');
    }
    return;
  }
  const allSpells = window.SORTS_DATA || [];
  const univs = allSpells.filter(s => (s.element || "").toLowerCase() === "universel" || s.mastery === 0);
  univs.forEach(u => {
    if (!window.charSpellsList.some(existing => existing.id === u.id)) {
      window.charSpellsList.push({
        id: u.id,
        name: u.name || u.nom,
        element: "Universel",
        ring: "Vide",
        mastery: 0,
        range: u.range || "Personnelle",
        area: u.area || "Spéciale",
        duration: u.duration || "Instantanée",
        raises: u.raises || "Aucune",
        desc: u.desc || "",
        isKiho: false,
        xpCost: 0
      });
    }
  });
  renderCharacterSpells();
  if (typeof updateAll === "function") updateAll();
}

function removeCharacterSpell(id) {
  window.charSpellsList = window.charSpellsList.filter(s => s.id !== id);
  renderCharacterSpells();
  if (typeof updateAll === "function") updateAll();
}

function updateSpellXpCost(id, newVal) {
  const item = window.charSpellsList.find(s => s.id === id);
  if (item) {
    item.xpCost = Math.max(0, parseInt(newVal, 10) || 0);
    renderCharacterSpells();
    if (typeof updateAll === "function") updateAll();
  }
}

function rollSpellCasting(spellId) {
  const s = window.charSpellsList.find(item => item.id === spellId);
  if (!s) return;
  const ringToUse = s.isKiho ? (s.ring || "Terre") : (s.element || "Vide");
  const ringVal = getRingValueForElement(ringToUse);
  const schoolRank = getCurrentSchoolRank();

  const affinity = document.getElementById('shugenja-affinity')?.value || "aucune";
  const deficiency = document.getElementById('shugenja-deficiency')?.value || "aucune";
  let effRank = schoolRank;
  if (affinity !== "aucune" && ringToUse.toLowerCase().includes(affinity)) effRank += 1;
  if (deficiency !== "aucune" && ringToUse.toLowerCase().includes(deficiency)) effRank -= 1;

  const rollX = ringVal + Math.max(1, effRank);
  const keepY = ringVal;
  const tn = s.mastery === 0 ? 10 : (5 + 5 * s.mastery);
  const shortName = (s.name || "Sort").split('(')[0].trim();

  rollL5RDicePool(rollX, keepY, 0, `${shortName} [ND ${tn}]`, true, false);
}

function renderCharacterSpells() {
  const container = document.getElementById('char-spells-container');
  const countBadge = document.getElementById('spells-count-badge');
  const xpBadge = document.getElementById('spells-xp-total');
  if (!container) return;

  const totalXp = window.charSpellsList.reduce((acc, s) => acc + (Number(s.xpCost) || 0), 0);
  if (countBadge) countBadge.textContent = window.charSpellsList.length;
  if (xpBadge) xpBadge.textContent = totalXp;

  if (window.charSpellsList.length === 0) {
    container.innerHTML = `
      <div class="p-3 rounded-lg bg-black/40 border border-stone-800/80 text-stone-500 italic text-center text-[11px]">
        Aucun sort ou kiho inscrit sur la fiche.
      </div>
    `;
    return;
  }

  const schoolRank = getCurrentSchoolRank();
  const affinity = document.getElementById('shugenja-affinity')?.value || "aucune";
  const deficiency = document.getElementById('shugenja-deficiency')?.value || "aucune";

  container.innerHTML = window.charSpellsList.map(s => {
    const ringToUse = s.isKiho ? (s.ring || "Terre") : (s.element || "Vide");
    const ringVal = getRingValueForElement(ringToUse);
    let effRank = schoolRank;
    if (affinity !== "aucune" && ringToUse.toLowerCase().includes(affinity)) effRank += 1;
    if (deficiency !== "aucune" && ringToUse.toLowerCase().includes(deficiency)) effRank -= 1;

    const rollX = ringVal + Math.max(1, effRank);
    const keepY = ringVal;
    const tn = s.mastery === 0 ? 10 : (5 + 5 * s.mastery);
    const badgeCls = getElementBadgeClass(s.isKiho ? 'kiho' : s.element);
    const elemLabel = s.isKiho ? `Kiho ${s.ring || ''}` : s.element;

    return `
      <div class="p-2.5 rounded-lg bg-stone-950/90 border border-stone-800 hover:border-amber-500/40 transition space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div class="truncate">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[9px] font-bold font-imperial px-1.5 py-0.5 rounded ${badgeCls}">
                ${elemLabel} • M${s.mastery}
              </span>
              <a href="grimoire.html#sort-${s.id}" target="_blank" class="font-bold font-imperial text-amber-200 hover:text-amber-300 text-xs truncate">
                ${s.name} ↗
              </a>
            </div>
            <div class="text-[10px] text-stone-400 mt-0.5">
              Portée : ${s.range} • <b class="text-amber-300">ND ${tn}</b>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" onclick="rollSpellCasting('${s.id}')" class="px-2 py-1 rounded bg-amber-950/80 hover:bg-amber-600 text-amber-300 hover:text-black border border-amber-500/40 font-bold font-imperial text-[10px] transition cursor-pointer" title="Lancer le jet d'incantation">
              🎲 ${rollX}g${keepY}
            </button>
            <div class="flex items-center bg-black/60 border border-stone-800 rounded px-1 py-0.5" title="Coût en XP">
              <input type="number" value="${s.xpCost || 0}" min="0" max="20" onchange="updateSpellXpCost('${s.id}', this.value)" class="w-7 text-center text-[10px] font-bold bg-transparent">
              <span class="text-[8px] text-stone-500">XP</span>
            </div>
            <button type="button" onclick="removeCharacterSpell('${s.id}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
          </div>
        </div>
        <p class="text-[10px] text-stone-400 line-clamp-2 leading-snug">${s.desc}</p>
      </div>
    `;
  }).join('');
}

// =============================================================================
// KATAS MARTIAUX
// =============================================================================
function populateKataCatalogSelect(autoSelectFirst = false) {
  const sel = document.getElementById('sel-catalog-kata');
  if (!sel) return;
  const rawFilter = (document.getElementById('filter-kata-elem')?.value || "tous").toLowerCase();
  const searchFilter = foldForgeSearch(document.getElementById('filter-kata-search')?.value || "");
  const allKatas = window.KATAS_DATA || [];

  const filtered = allKatas.filter(k => {
    const matchElem = rawFilter === "tous" || (k.element || "").toLowerCase() === rawFilter;
    if (!matchElem) return false;
    if (!searchFilter) return true;
    const hay = foldForgeSearch(`${k.name || ''} ${k.element || ''} ${k.schools || ''} ${k.effect || ''}`);
    return hay.includes(searchFilter);
  });

  sel.innerHTML = `<option value="">-- Choisir un Kata martial (${filtered.length} disponible(s)) --</option>`;
  const frag = document.createDocumentFragment();
  filtered.forEach(k => {
    const opt = document.createElement('option');
    opt.value = k.id;
    opt.textContent = `[${k.element} ${k.mastery} • ${k.cost} XP] ${k.name}`;
    frag.appendChild(opt);
  });
  sel.appendChild(frag);
  if (autoSelectFirst && searchFilter && filtered.length > 0) {
    sel.value = filtered[0].id;
  }
  updateKataPreview();
}

function updateKataPreview() {
  const sel = document.getElementById('sel-catalog-kata');
  const card = document.getElementById('kata-preview-card');
  if (!sel || !card) return;
  const id = sel.value;
  if (!id) { card.classList.add('hidden'); return; }

  const k = (window.KATAS_DATA || []).find(item => item.id === id);
  if (!k) { card.classList.add('hidden'); return; }

  const charRingVal = getRingValueForElement(k.element);
  const meetsReq = charRingVal >= k.mastery;

  document.getElementById('kata-preview-name').textContent = k.name;
  const ringBadge = document.getElementById('kata-preview-ring');
  ringBadge.textContent = `Anneau requis : ${k.element} ${k.mastery}`;
  ringBadge.className = `text-[9px] font-bold font-imperial px-2 py-0.5 rounded inline-block mt-1 ${getElementBadgeClass(k.element)}`;

  document.getElementById('kata-preview-cost').textContent = `Coût : ${k.cost} XP`;
  const reqStatus = document.getElementById('kata-preview-req-status');
  reqStatus.textContent = meetsReq ? `✓ Anneau ${k.element} (${charRingVal}) suffisant` : `⚠️ Anneau ${k.element} actuel : ${charRingVal}/${k.mastery}`;
  reqStatus.className = `text-[10px] font-bold block mt-1 ${meetsReq ? 'text-emerald-400' : 'text-amber-400'}`;

  document.getElementById('kata-preview-schools').textContent = k.schools;
  document.getElementById('kata-preview-effect').textContent = k.desc;

  card.classList.remove('hidden');
}

function addKataFromCatalog() {
  const perms = getActiveForgePermissions();
  if (!perms.canUseKatas) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Les Katas sont réservés aux écoles martiales (Bushi / Shinobi).", 'warning');
    }
    return;
  }
  const sel = document.getElementById('sel-catalog-kata');
  if (!sel || !sel.value) return;
  const found = (window.KATAS_DATA || []).find(k => k.id === sel.value);
  if (!found) return;
  if (window.charKatasList.some(k => k.id === found.id)) {
    alert("Ce Kata figure déjà sur votre fiche.");
    return;
  }
  window.charKatasList.push({
    id: found.id,
    name: found.name,
    element: found.element,
    mastery: found.mastery,
    xpCost: found.cost,
    schools: found.schools,
    desc: found.desc,
    active: window.charKatasList.length === 0
  });
  renderCharacterKatas();
  if (typeof updateAll === "function") updateAll();
}

function toggleActiveKata(id) {
  window.charKatasList.forEach(k => {
    k.active = (k.id === id) ? !k.active : false;
  });
  renderCharacterKatas();
}

function removeCharacterKata(id) {
  window.charKatasList = window.charKatasList.filter(k => k.id !== id);
  renderCharacterKatas();
  if (typeof updateAll === "function") updateAll();
}

function renderCharacterKatas() {
  const container = document.getElementById('char-katas-container');
  const countBadge = document.getElementById('katas-count-badge');
  const xpBadge = document.getElementById('katas-xp-total');
  if (!container) return;

  const totalXp = window.charKatasList.reduce((acc, k) => acc + (Number(k.xpCost) || 0), 0);
  if (countBadge) countBadge.textContent = window.charKatasList.length;
  if (xpBadge) xpBadge.textContent = totalXp;

  if (window.charKatasList.length === 0) {
    container.innerHTML = `
      <div class="p-3 rounded-lg bg-black/40 border border-stone-800/80 text-stone-500 italic text-center text-[11px]">
        Aucun Kata appris.
      </div>
    `;
    return;
  }

  container.innerHTML = window.charKatasList.map(k => {
    const badgeCls = getElementBadgeClass(k.element);
    return `
      <div class="p-2.5 rounded-lg ${k.active ? 'bg-amber-950/30 border-amber-500/60' : 'bg-stone-950/90 border-stone-800'} border transition space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div class="truncate">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[9px] font-bold font-imperial px-1.5 py-0.5 rounded ${badgeCls}">
                ${k.element} ${k.mastery}
              </span>
              <span class="font-bold font-imperial text-amber-200 text-xs truncate">${k.name}</span>
            </div>
            <div class="text-[10px] text-stone-400 mt-0.5">${k.schools} • <b>${k.xpCost} XP</b></div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" onclick="toggleActiveKata('${k.id}')" class="px-2 py-0.5 rounded text-[10px] font-bold font-imperial transition cursor-pointer ${k.active ? 'bg-emerald-600 text-black' : 'bg-stone-900 text-stone-400 border border-stone-700'}">
              ${k.active ? '✓ Actif' : 'Activer'}
            </button>
            <button type="button" onclick="removeCharacterKata('${k.id}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
          </div>
        </div>
        <p class="text-[10px] text-stone-300 leading-snug">${k.desc}</p>
      </div>
    `;
  }).join('');
}

// =============================================================================
// SÉLECTION MULTIPLE DES COMPÉTENCES
// =============================================================================
let selectedSkillNames = new Set();

function initSkillsMultiSelect() {
  const container = document.getElementById('skills-checkboxes-container');
  if (!container) return;
  const allSkills = (typeof window.getSkills === 'function') ? window.getSkills() : (window.COMPETENCES_DATA || []);
  const ownedRoots = new Set((window.currentSkills || []).map(s => (s.name || "").split('(')[0].trim().toLowerCase()));

  container.innerHTML = "";
  const frag = document.createDocumentFragment();
  allSkills.forEach(s => {
    const root = s.name.split('(')[0].trim().toLowerCase();
    if (ownedRoots.has(root)) return;

    const lbl = document.createElement('label');
    lbl.className = "flex items-center justify-between p-1.5 rounded hover:bg-stone-900 cursor-pointer text-xs";
    lbl.dataset.search = foldForgeSearch(`${s.name} ${s.type} ${s.trait}`);
    lbl.dataset.skillType = foldForgeSearch(s.type || '');

    const span = document.createElement('span');
    span.className = "text-amber-200";
    span.appendChild(document.createTextNode(`${s.name} `));
    const sub = document.createElement('span');
    sub.className = "text-[10px] text-stone-500";
    sub.textContent = `(${s.type} - ${s.trait})`;
    span.appendChild(sub);

    const cb = document.createElement('input');
    cb.type = "checkbox";
    cb.value = s.name;
    cb.className = "rounded border-stone-700 text-amber-500";
    cb.addEventListener('change', function () { toggleSkillCheckbox(this); });

    lbl.appendChild(span);
    lbl.appendChild(cb);
    frag.appendChild(lbl);
  });
  container.appendChild(frag);
  updateSkillsDropdownSummary();
}

function toggleSkillsDropdown() {
  const panel = document.getElementById('skills-dropdown-panel');
  const arrow = document.getElementById('skills-dropdown-arrow');
  if (!panel) return;
  const isHidden = panel.classList.toggle('hidden');
  if (arrow) arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
}

let _skillsFilterTimer = null;
let _activeSkillDropdownCategory = 'all';

function setSkillDropdownCategory(cat) {
  _activeSkillDropdownCategory = cat || 'all';
  document.querySelectorAll('#skills-cat-chips [data-skill-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.skillCat === _activeSkillDropdownCategory);
  });
  applySkillsFilterNow();
}

function applySkillsFilterNow() {
  const term = foldForgeSearch(document.getElementById('filter-skills-input')?.value || "");
  const labels = document.querySelectorAll('#skills-checkboxes-container label');
  for (let i = 0; i < labels.length; i++) {
    const lbl = labels[i];
    const txt = lbl.dataset.search || foldForgeSearch(lbl.textContent);
    const sType = lbl.dataset.skillType || '';
    let matchCat = true;
    if (_activeSkillDropdownCategory === 'noble') {
      matchCat = sType.includes('noble') || sType.includes('haute');
    } else if (_activeSkillDropdownCategory !== 'all') {
      matchCat = sType.includes(_activeSkillDropdownCategory);
    }
    const matchText = !term || txt.includes(term);
    lbl.style.display = (matchCat && matchText) ? "flex" : "none";
  }
}

function filterSkillsList() {
  if (_skillsFilterTimer !== null) clearTimeout(_skillsFilterTimer);
  _skillsFilterTimer = setTimeout(() => {
    _skillsFilterTimer = null;
    applySkillsFilterNow();
  }, 80);
}

function toggleSkillCheckbox(cb) {
  if (cb.checked) selectedSkillNames.add(cb.value);
  else selectedSkillNames.delete(cb.value);
  updateSkillsDropdownSummary();
}

function clearAllSkillCheckboxes() {
  selectedSkillNames.clear();
  document.querySelectorAll('#skills-checkboxes-container input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateSkillsDropdownSummary();
}

function updateSkillsDropdownSummary() {
  const count = selectedSkillNames.size;
  const summary = document.getElementById('skills-checked-summary');
  const btnLabel = document.getElementById('skills-selected-count');
  if (summary) summary.textContent = `${count} sélectionnée(s)`;
  if (btnLabel) btnLabel.textContent = count > 0 ? `${count} compétence(s) choisie(s)` : "Choisir des compétences...";
}

function addSelectedSkills() {
  if (selectedSkillNames.size === 0) return;
  selectedSkillNames.forEach(name => {
    if (typeof window.addSkillFromCatalog === 'function') {
      const selAdd = document.getElementById('sel-add-skill');
      if (selAdd) {
        selAdd.innerHTML = `<option value="${name}" selected>${name}</option>`;
        window.addSkillFromCatalog();
      }
    }
  });
  clearAllSkillCheckboxes();
  toggleSkillsDropdown();
  initSkillsMultiSelect();
}

// =============================================================================
// PLATEAU DE DÉS ROLL & KEEP
// =============================================================================
function toggleDiceTray(forceOpen) {
  const panel = document.getElementById('dice-tray-panel');
  if (!panel) return;
  if (typeof forceOpen === 'boolean') {
    if (forceOpen) panel.classList.remove('hidden');
    else panel.classList.add('hidden');
  } else {
    panel.classList.toggle('hidden');
  }
  syncMobileAppDock();
}

let _diceAugCount = 0;
let _diceHistory = [];

function adjustDiceAug(delta) {
  _diceAugCount = Math.max(0, Math.min(10, _diceAugCount + delta));
  const el = document.getElementById('dice-aug-display');
  if (el) el.textContent = _diceAugCount;
}

function clearDiceHistory() {
  _diceHistory = [];
  const box = document.getElementById('dice-history-box');
  const list = document.getElementById('dice-history-list');
  if (list) list.innerHTML = '';
  if (box) box.classList.add('hidden');
}

function renderDiceHistory() {
  const box = document.getElementById('dice-history-box');
  const list = document.getElementById('dice-history-list');
  if (!box || !list) return;
  if (_diceHistory.length === 0) {
    box.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  list.innerHTML = _diceHistory.map(item => `
    <div class="flex items-center justify-between gap-2 px-2 py-1 rounded bg-black/60 border border-stone-800/80">
      <span class="truncate text-stone-300">${item.label}${item.aug > 0 ? ` <span class="text-amber-400">(${item.aug} Aug)</span>` : ''}</span>
      <span class="font-imperial font-bold text-amber-300 shrink-0">${item.total}</span>
    </div>
  `).join('');
}

function rollL5RDicePool(rollX, keepY, bonus, label, explode = true, spec = false) {
  toggleDiceTray(true);
  const resBox = document.getElementById('dice-result-box');
  if (!resBox) return;

  const flatBonus = parseInt(document.getElementById('dice-flat-bonus')?.value, 10) || 0;
  const totalBonus = (bonus || 0) + flatBonus;

  const result = (typeof window.simulateRollAndKeep === 'function')
    ? window.simulateRollAndKeep(rollX, keepY, totalBonus, { explode, spec })
    : (function () {
        const dice = [];
        for (let i = 0; i < rollX; i++) {
          let dieVal = Math.floor(Math.random() * 10) + 1;
          if (spec && dieVal === 1) dieVal = Math.floor(Math.random() * 10) + 1;
          let totalDie = dieVal;
          let explodedTimes = 0;
          while (explode && dieVal === 10 && explodedTimes < 5) {
            dieVal = Math.floor(Math.random() * 10) + 1;
            totalDie += dieVal;
            explodedTimes++;
          }
          dice.push({ value: totalDie, exploded: explodedTimes > 0 });
        }
        dice.sort((a, b) => b.value - a.value);
        const kept = dice.slice(0, keepY);
        const dropped = dice.slice(keepY);
        const total = kept.reduce((acc, d) => acc + d.value, 0) + totalBonus;
        return { dice, kept, dropped, bonus: totalBonus, total };
      })();

  const { kept, dropped, total: totalScore } = result;
  const augNote = _diceAugCount > 0 ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 ml-1">+${_diceAugCount * 5} ND (${_diceAugCount} Aug.)</span>` : '';

  resBox.innerHTML = `
    <div class="flex justify-between items-center border-b border-stone-800 pb-1 text-xs">
      <span class="font-bold text-amber-200 font-imperial truncate">${label || 'Lancer de dés'}${augNote}</span>
      <span class="font-imperial font-black text-amber-300 text-base shrink-0">${totalScore}</span>
    </div>
    <div class="flex flex-wrap gap-1 items-center pt-1">
      ${kept.map(d => `<span class="die-anim px-2 py-1 rounded bg-amber-600 text-black font-extrabold text-xs shadow ${d.exploded ? 'ring-2 ring-amber-300' : ''}">${d.value}</span>`).join('')}
      ${dropped.map(d => `<span class="px-1.5 py-0.5 rounded bg-stone-900 text-stone-500 text-[10px] line-through border border-stone-800">${d.value}</span>`).join('')}
      ${totalBonus ? `<span class="text-xs text-amber-400 font-bold">${totalBonus >= 0 ? '+' : ''}${totalBonus}</span>` : ''}
    </div>
  `;

  _diceHistory.unshift({ label: label || `${rollX}g${keepY}`, total: totalScore, aug: _diceAugCount });
  if (_diceHistory.length > 5) _diceHistory.pop();
  renderDiceHistory();
}

function rollFromSticky(metricId, label) {
  const txt = document.getElementById(metricId)?.textContent || "3g2";
  if (typeof window.parseRollKeepFormula === 'function') {
    const parsed = window.parseRollKeepFormula(txt);
    if (parsed.rolled > 0 && parsed.kept > 0) {
      rollL5RDicePool(parsed.rolled, parsed.kept, parsed.bonus, label, true, false);
      return;
    }
  }
  const parts = txt.match(/(\d+)g(\d+)(?:\s*\+\s*(\d+))?/i);
  if (parts) {
    const x = parseInt(parts[1], 10) || 3;
    const y = parseInt(parts[2], 10) || 2;
    const b = parseInt(parts[3], 10) || 0;
    rollL5RDicePool(x, y, b, label, true, false);
  }
}

function executeManualRoll() {
  const x = parseInt(document.getElementById('manual-roll-x')?.value, 10) || 5;
  const y = parseInt(document.getElementById('manual-keep-y')?.value, 10) || 3;
  const explode = document.getElementById('dice-explode-cb')?.checked ?? true;
  const spec = document.getElementById('dice-spec-cb')?.checked ?? false;
  rollL5RDicePool(x, y, 0, `Lancer manuel (${x}g${y})`, explode, spec);
}

// =============================================================================
// DOJO PERSONNEL & ACTIONS D'EXPORT / IMPRESSION
// =============================================================================
function saveToDojo() {
  if (typeof window.saveCharacterToDojo === 'function') {
    window.saveCharacterToDojo();
    renderDojoRoster();
    const toast = document.getElementById('dojo-save-toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 2500);
    }
  }
}

function toggleDojoDrawer(forceOpen) {
  const sec = document.getElementById('dojo-drawer-section');
  const chev = document.getElementById('dojo-toggle-chevron');
  if (!sec) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : sec.classList.contains('hidden');
  sec.classList.toggle('hidden', !shouldOpen);
  if (chev) chev.textContent = shouldOpen ? '▴' : '▾';
  if (shouldOpen) renderDojoRoster();
  syncMobileAppDock();
}

function renderDojoRoster() {
  const roster = document.getElementById('dojo-roster-list');
  const raw = localStorage.getItem('l5r_dojo_characters_v4') || localStorage.getItem('l5r_saved_characters');
  const list = raw ? JSON.parse(raw) : [];
  const totalCount = Array.isArray(list) ? list.length : 0;
  const countBadge = document.getElementById('cockpit-dojo-count');
  if (countBadge) countBadge.textContent = totalCount;
  const mobCount = document.getElementById('mobile-dock-dojo-count');
  if (mobCount) {
    mobCount.textContent = totalCount;
    mobCount.classList.toggle('hidden', totalCount === 0);
  }
  if (!roster) return;

  if (!Array.isArray(list) || list.length === 0) {
    roster.innerHTML = `<div class="text-stone-500 italic text-[11px] col-span-full">Aucun samouraï dans le dojo local. Cliquez sur "Enregistrer".</div>`;
    return;
  }

  roster.innerHTML = list.map((c, idx) => {
    const safeId = c.id || idx;
    return `
      <div class="p-2 rounded bg-black/60 border border-stone-800 hover:border-amber-500/40 flex items-center justify-between gap-1 transition">
        <div class="truncate">
          <b class="text-amber-200 font-imperial block truncate">${c.name || "Samouraï"}</b>
          <span class="text-[9px] text-stone-500">${c.clan || "Clan"}</span>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button type="button" onclick="loadFromDojo('${safeId}')" class="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-[10px] cursor-pointer">Charger</button>
          <button type="button" onclick="deleteFromDojo('${safeId}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

function loadFromDojo(id) {
  if (typeof window.loadCharacterFromDojo === 'function') {
    window.loadCharacterFromDojo(id);
    if (typeof showForgeToast === 'function') showForgeToast('Samouraï chargé depuis le Dojo.', 'success');
  }
}

function deleteFromDojo(id) {
  if (typeof window.deleteCharacterFromDojo === 'function') {
    window.deleteCharacterFromDojo(id);
    renderDojoRoster();
    if (typeof showForgeToast === 'function') showForgeToast('Samouraï retiré du Dojo.', 'info');
  }
}

function shareCharacterUrl() {
  if (typeof window.collectCharacterData === 'function') {
    const data = window.collectCharacterData();
    const str = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}?char=${str}`;
    navigator.clipboard.writeText(url).then(() => {
      if (typeof showForgeToast === 'function') showForgeToast("Lien direct copié dans le presse-papiers !", "success");
      else alert("Lien direct copié dans votre presse-papiers !");
    }).catch(() => {
      prompt("Voici votre lien direct :", url);
    });
  }
}

function applyFullCharacterState(decoded) {
  if (typeof window.applyCharacterDataToSheet === 'function') {
    window.applyCharacterDataToSheet(decoded);
  }
}

function getPrintElementStyle(elemOrType) {
  const k = (elemOrType || '').toString().toLowerCase();
  if (k.includes('terre') || k.includes('earth')) return 'background:#e9f1e6;border-color:#486a3c;color:#243b1d;';
  if (k.includes('eau') || k.includes('water')) return 'background:#e5eef7;border-color:#2b5986;color:#173452;';
  if (k.includes('air')) return 'background:#ececf6;border-color:#494d7a;color:#242648;';
  if (k.includes('feu') || k.includes('fire')) return 'background:#faeae5;border-color:#b64329;color:#5b1d10;';
  if (k.includes('vide') || k.includes('void')) return 'background:#efece8;border-color:#3c342e;color:#1e1915;';
  if (k.includes('kiho')) return 'background:#fdf0df;border-color:#b46414;color:#683306;';
  return 'background:#f2ece0;border-color:#8c7b5c;color:#3d3223;';
}

function populatePrintableMysticBox() {
  const section = document.getElementById('p-mystic-print-section');
  const bar = document.getElementById('p-mystic-bar');
  const barTitle = document.getElementById('p-mystic-bar-title');
  const box = document.getElementById('p-spells-katas-box');
  const sum = document.getElementById('p-mystic-summary');
  const slotsPrint = document.getElementById('p-spell-slots-bar-print');
  const tattoosPrint = document.getElementById('p-tattoos-print-box');
  if (!box) return;

  const perms = typeof getActiveForgePermissions === 'function'
    ? getActiveForgePermissions()
    : { canCastSpells: true, canUseKatas: true, canUseKihos: true, canUseTattoos: false };

  const aff = document.getElementById('shugenja-affinity')?.value || "aucune";
  const def = document.getElementById('shugenja-deficiency')?.value || "aucune";
  const spells = window.charSpellsList || [];
  const katas = window.charKatasList || [];
  const tattoos = window.charTattoosList || [];

  if (bar && barTitle) {
    bar.classList.remove('l5r-bar-crimson', 'l5r-bar-emerald');
    if (perms.canUseTattoos && !perms.canUseKatas && !perms.canCastSpells && !perms.canUseKihos) {
      bar.classList.add('l5r-bar-emerald');
      barTitle.textContent = 'Tatouages Mystiques de Togashi (Ise Zumi)';
    } else if (perms.canUseKatas && !perms.canCastSpells && !perms.canUseKihos) {
      barTitle.textContent = 'Katas Martiaux';
    } else if (!perms.canCastSpells && perms.canUseKihos && !perms.canUseKatas) {
      barTitle.textContent = 'Voies Mystiques (Kihos)';
    } else if (perms.canCastSpells && !perms.canUseKatas) {
      barTitle.textContent = 'Parchemins de Sorts, Emplacements & Kihos';
    } else {
      barTitle.textContent = 'Voies Martiales & Mystiques';
    }
  }

  if (sum) {
    const parts = [];
    if (perms.canCastSpells || perms.canUseKihos) parts.push(`${spells.length} Sort(s)/Kiho(s)`);
    if (perms.canUseKatas) parts.push(`${katas.length} Kata(s)`);
    if (perms.canUseTattoos) parts.push(`${tattoos.length} Tatouage(s)`);
    if (perms.canCastSpells && aff !== 'aucune') parts.push(`Affinité : ${aff.toUpperCase()}`);
    if (perms.canCastSpells && def !== 'aucune') parts.push(`Déficience : ${def.toUpperCase()}`);
    sum.textContent = parts.join(' • ') || 'Courtisan';
  }

  if (slotsPrint) {
    if (perms.canCastSpells) {
      const slotDefs = [
        { label: '風 Air', ringId: 'ring-air', stroke: '#3898c8', fill: '#e6f7fc' },
        { label: '土 Terre', ringId: 'ring-earth', stroke: '#6b4423', fill: '#f4ece4' },
        { label: '火 Feu', ringId: 'ring-fire', stroke: '#c0392b', fill: '#fceae4' },
        { label: '水 Eau', ringId: 'ring-water', stroke: '#1d5fa7', fill: '#e3eef9' },
        { label: '空 Vide', ringId: 'ring-void', stroke: '#6d28d9', fill: '#f2eafc' }
      ];
      slotsPrint.innerHTML = `
        <div class="flex justify-between items-center font-imperial font-bold text-[#3d3223] border-b border-[#c9bea6] pb-0.5 mb-1">
          <span>Emplacements de sorts quotidiens (égal à chaque Anneau)</span>
          <span class="font-mono text-[7.5px]">ND Sort = 5 + (5 × Maîtrise)</span>
        </div>
        <div class="grid grid-cols-5 gap-1.5">
          ${slotDefs.map(sd => {
            const val = parseInt(document.getElementById(sd.ringId)?.textContent, 10) || 2;
            let circles = '';
            for (let i = 1; i <= 6; i++) {
              const active = i <= val;
              circles += `<span style="display:inline-block;width:9px;height:9px;border-radius:9999px;border:1.25px solid ${sd.stroke};background:${active ? sd.fill : '#fffdf7'};opacity:${active ? '1' : '0.35'};"></span>`;
            }
            return `
              <div class="text-center rounded border px-1.5 py-1.5 bg-[#fbf8f0]" style="border-color:${sd.stroke};">
                <div class="font-imperial font-bold text-[8px] leading-snug mb-1.5" style="color:${sd.stroke};">${sd.label} (${val})</div>
                <div class="flex items-center justify-center gap-0.5 pt-0.5">${circles}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
      slotsPrint.classList.remove('hidden');
    } else {
      slotsPrint.classList.add('hidden');
      slotsPrint.innerHTML = '';
    }
  }

  const spellsHtml = spells.map(s => {
    const tn = s.mastery === 0 ? 10 : (5 + 5 * s.mastery);
    const elemTag = s.isKiho ? `Kiho ${s.ring || ''}` : (s.element || 'Universel');
    const styleStr = getPrintElementStyle(s.isKiho ? 'kiho' : elemTag);
    return `
      <div class="l5r-box p-1.5 rounded-sm space-y-0.5 l5r-avoid-break">
        <div class="flex justify-between items-center gap-1 border-b border-[#d7d0c0] pb-0.5">
          <b class="font-imperial text-[9px] text-[#1a1610]">${s.name}</b>
          <span class="px-1.5 py-0.5 rounded border text-[7.5px] font-bold shrink-0" style="${styleStr}">${elemTag} • M${s.mastery} (ND ${tn})</span>
        </div>
        <div class="text-[7.5px] text-[#5a4e43]"><b>Portée :</b> ${s.range || 'Pers.'} • <b>Zone :</b> ${s.area || 'Spéc.'} • <b>Durée :</b> ${s.duration || 'Inst.'}</div>
        <div class="text-[8px] text-[#2b241d] leading-snug">${s.desc || ''}</div>
      </div>
    `;
  }).join('');

  const katasHtml = katas.map(k => {
    const styleStr = getPrintElementStyle(k.element);
    return `
      <div class="l5r-box p-1.5 rounded-sm space-y-0.5 l5r-avoid-break">
        <div class="flex justify-between items-center gap-1 border-b border-[#d7d0c0] pb-0.5">
          <b class="font-imperial text-[9px] text-[#1a1610]">${k.name}${k.active ? ' ★ ACTIF' : ''}</b>
          <span class="px-1.5 py-0.5 rounded border text-[7.5px] font-bold shrink-0" style="${styleStr}">Kata ${k.element} ${k.mastery} • ${k.xpCost} XP</span>
        </div>
        <div class="text-[8px] text-[#2b241d] leading-snug">${k.desc || ''}</div>
      </div>
    `;
  }).join('');

  if (spellsHtml || katasHtml) {
    box.innerHTML = spellsHtml + katasHtml;
    box.classList.remove('hidden');
  } else if (!perms.canUseTattoos || tattoos.length === 0) {
    box.innerHTML = `<div class="col-span-full text-[#6a5d47] italic text-[8.5px]">${perms.canUseKatas || perms.canCastSpells || perms.canUseKihos || perms.canUseTattoos ? 'Aucun art inscrit pour le moment.' : 'Aucun sort, kiho ou kata requis pour cette école de Cour / Magistrature.'}</div>`;
    box.classList.remove('hidden');
  } else {
    box.innerHTML = '';
    box.classList.add('hidden');
  }

  if (tattoosPrint) {
    if (tattoos.length > 0) {
      tattoosPrint.innerHTML = tattoos.map(t => `
        <div class="l5r-box p-1.5 rounded-sm space-y-0.5 l5r-avoid-break" style="border-color:#194235;">
          <div class="flex justify-between items-center gap-1 border-b border-[#c5d7cf] pb-0.5">
            <b class="font-imperial text-[9px] text-[#102b22]">${t.name} ${t.kanji ? `(${t.kanji})` : ''}</b>
            <span class="px-1.5 py-0.5 rounded border text-[7.5px] font-bold" style="${getPrintElementStyle(t.element || 'vide')}">${t.element || 'Togashi'} ${t.ringReq || ''}</span>
          </div>
          <div class="text-[7.5px] text-[#3a574b]"><b>Activation :</b> ${t.activation || t.action || 'Action Libre'} • <b>Durée :</b> ${t.duration || '2 × Rang rounds'}</div>
          <div class="text-[8px] text-[#1f1a14] leading-snug">${t.rule || t.desc || ''}</div>
        </div>
      `).join('');
      tattoosPrint.classList.remove('hidden');
    } else {
      tattoosPrint.innerHTML = '';
      tattoosPrint.classList.add('hidden');
    }
  }

  if (section) section.classList.remove('hidden');
}

function exportJSONWithMystic() {
  if (typeof exportJSON === "function") exportJSON();
}

function importJSONWithMystic(event) {
  if (typeof importJSON === "function") importJSON(event);
}

function resetCharacterWithMystic() {
  window.charSpellsList = [];
  window.charKatasList = [];
  if (document.getElementById('shugenja-affinity')) document.getElementById('shugenja-affinity').value = "aucune";
  if (document.getElementById('shugenja-deficiency')) document.getElementById('shugenja-deficiency').value = "aucune";
  if (typeof resetCharacter === "function") resetCharacter();
  renderCharacterSpells();
  renderCharacterKatas();
  updateArchetypePanels();
}

function populatePrintable20Questions() {
  const qBox = document.getElementById('p-20questions-box');
  const storyWrap = document.getElementById('p-background-story-wrap');
  const storyEl = document.getElementById('p-background-story');
  const storySrc = document.getElementById('pc-background-story');

  if (storyEl && storySrc) {
    const txt = (storySrc.value || '').trim();
    storyEl.textContent = txt;
    if (storyWrap) storyWrap.classList.toggle('hidden', !txt);
  }

  if (!qBox) return;
  let html = "";
  for (let i = 1; i <= 20; i++) {
    const val = (document.getElementById(`q20-${i}`)?.value || "").trim();
    if (!val) continue;
    const lbl = (document.querySelector(`label[for="q20-${i}"]`)?.textContent || `Question ${i}`).replace(/^\d+\.\s*/, '');
    html += `
      <div class="border-b border-[#d7d0c0] pb-1 l5r-avoid-break">
        <div class="font-bold text-[#4a3b26] text-[7.5px]">${i}. ${lbl}</div>
        <div class="text-[#1f1a14]">${val}</div>
      </div>
    `;
  }
  qBox.innerHTML = html || '<div class="col-span-full text-[#6a5d47] italic">Aucune réponse renseignée dans les Vingt Questions.</div>';
}

function syncAllPrintableSheetContent() {
  if (typeof window.populateOfficialPrintSheet === 'function') {
    window.populateOfficialPrintSheet();
  }
  populatePrintableMysticBox();
  populatePrintable20Questions();
  const toggleCb = document.getElementById('toggle-print-story');
  togglePrintStorySection(toggleCb ? toggleCb.checked : true);
}

function togglePrintStorySection(show) {
  const storyPage = document.getElementById('print-page-story');
  const page2 = document.getElementById('print-page-2');
  if (storyPage) storyPage.classList.toggle('hidden', !show);
  if (page2) page2.classList.toggle('is-last-print-page', !show);
}
window.togglePrintStorySection = togglePrintStorySection;

function syncMobileSheetZoom() {
  const sheet = document.getElementById('print-sheet');
  if (!sheet) return;
  if (window.innerWidth < 840) {
    const scale = Math.min(1, Math.max(0.36, (window.innerWidth - 16) / 820));
    sheet.style.setProperty('--l5r-mobile-sheet-zoom', scale.toFixed(3));
  } else {
    sheet.style.removeProperty('--l5r-mobile-sheet-zoom');
  }
}
window.addEventListener('resize', syncMobileSheetZoom);

function openCharacterSheetPreview() {
  syncAllPrintableSheetContent();
  syncMobileSheetZoom();
  document.body.classList.add('l5r-preview-active');
  const dossier = document.getElementById('official-print-dossier');
  if (dossier) dossier.scrollTop = 0;
  syncMobileAppDock();
}
window.openCharacterSheetPreview = openCharacterSheetPreview;

function closeCharacterSheetPreview() {
  document.body.classList.remove('l5r-preview-active');
  syncMobileAppDock();
}
window.closeCharacterSheetPreview = closeCharacterSheetPreview;

function triggerSheetPrint() {
  syncAllPrintableSheetContent();
  window.print();
}
window.triggerSheetPrint = triggerSheetPrint;

async function downloadCharacterSheetPDF() {
  syncAllPrintableSheetContent();
  const btn = document.getElementById('btn-download-pdf-sheet');
  const origHtml = btn ? btn.innerHTML : '';

  if (typeof window.html2canvas !== 'function' || !window.jspdf?.jsPDF) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Module PDF hors-ligne : ouverture de l'impression navigateur (cochez « Graphiques d'arrière-plan »).", 'warn');
    }
    triggerSheetPrint();
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ Génération PDF…</span>';
    }
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const pages = Array.from(document.querySelectorAll('#print-sheet .l5r-sheet-page'))
      .filter(el => !el.classList.contains('hidden'));
    if (pages.length === 0) throw new Error('Aucune page de fiche à exporter');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const pageW = 210;
    const pageH = 297;
    const marginMm = 4;
    const usableW = pageW - (marginMm * 2);
    const usableH = pageH - (marginMm * 2);

    const dossier = document.getElementById('official-print-dossier');
    const prevScroll = dossier ? dossier.scrollTop : 0;
    const printSheet = document.getElementById('print-sheet');
    const prevSheetZoom = printSheet ? printSheet.style.zoom : '';
    const prevSheetWidth = printSheet ? printSheet.style.width : '';
    if (printSheet) {
      printSheet.style.zoom = '1';
      printSheet.style.width = '820px';
    }

    let pdfPageIndex = 0;
    for (const pageEl of pages) {
      const prevShadow = pageEl.style.boxShadow;
      pageEl.style.boxShadow = 'none';
      const canvas = await window.html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f6f1e4',
        logging: false,
        windowWidth: 1200,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          try {
            let mainCssText = '';
            for (const ss of Array.from(document.styleSheets)) {
              if (ss.href && ss.href.includes('main.css')) {
                for (const rule of Array.from(ss.cssRules || [])) {
                  mainCssText += rule.cssText + '\n';
                }
              }
            }
            if (mainCssText) {
              clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
                if ((l.getAttribute('href') || '').includes('main.css')) l.remove();
              });
              const inlined = clonedDoc.createElement('style');
              inlined.textContent = mainCssText;
              clonedDoc.head.appendChild(inlined);
            }
          } catch (e) {}
          const s = clonedDoc.createElement('style');
          s.textContent = `
            #print-sheet, #print-sheet * { letter-spacing: normal; }
            #print-sheet .truncate { overflow: visible !important; text-overflow: clip !important; white-space: normal !important; }
            #print-sheet img { display: inline-block !important; }
          `;
          clonedDoc.head.appendChild(s);
        }
      });
      pageEl.style.boxShadow = prevShadow;

      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const naturalHAtUsableW = (canvas.height * usableW) / canvas.width;

      if (pdfPageIndex > 0) pdf.addPage();
      pdfPageIndex++;

      if (naturalHAtUsableW <= usableH) {
        pdf.addImage(imgData, 'JPEG', marginMm, marginMm, usableW, naturalHAtUsableW, undefined, 'FAST');
      } else {
        // Ajustement proportionnel pour garder la fiche sur une seule page A4 nette si raisonnable, sinon cadrage centré
        const fitRatio = usableH / naturalHAtUsableW;
        if (fitRatio >= 0.72) {
          const scaledW = usableW * fitRatio;
          const offsetX = (pageW - scaledW) / 2;
          pdf.addImage(imgData, 'JPEG', offsetX, marginMm, scaledW, usableH, undefined, 'FAST');
        } else {
          // Découpage propre multi-pages pour les fiches extrêmement longues
          let heightLeft = naturalHAtUsableW;
          let yPos = marginMm;
          pdf.addImage(imgData, 'JPEG', marginMm, yPos, usableW, naturalHAtUsableW, undefined, 'FAST');
          heightLeft -= usableH;
          while (heightLeft > 4) {
            pdf.addPage();
            pdfPageIndex++;
            yPos = marginMm - (naturalHAtUsableW - heightLeft);
            pdf.addImage(imgData, 'JPEG', marginMm, yPos, usableW, naturalHAtUsableW, undefined, 'FAST');
            heightLeft -= usableH;
          }
        }
      }
    }

    if (dossier) dossier.scrollTop = prevScroll;

    const rawName = (document.getElementById('pc-name')?.value || 'Samourai').trim();
    const safeName = rawName.replace(/[^a-zA-Z0-9À-ÿ _-]+/g, '').replace(/\s+/g, '_') || 'Samourai';
    const fileName = `${safeName}_Fiche_L5R4e.pdf`;
    pdf.save(fileName);

    if (typeof showForgeToast === 'function') {
      showForgeToast(`PDF enregistré à l'identique : ${fileName}`, 'success');
    }
  } catch (err) {
    console.error('Erreur génération PDF :', err);
    if (typeof showForgeToast === 'function') {
      showForgeToast("Basculé vers l'impression navigateur suite à une erreur de capture.", 'warn');
    }
    window.print();
  } finally {
    const printSheet = document.getElementById('print-sheet');
    if (printSheet) {
      printSheet.style.zoom = '';
      printSheet.style.width = '';
      syncMobileSheetZoom();
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml || '<span>📥 Enregistrer PDF (fidèle)</span>';
    }
  }
}
window.downloadCharacterSheetPDF = downloadCharacterSheetPDF;

function prepareAndPrintPDF() {
  openCharacterSheetPreview();
}

window.addEventListener('beforeprint', () => {
  syncAllPrintableSheetContent();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('l5r-preview-active')) {
    closeCharacterSheetPreview();
  }
});

// =============================================================================
// GESTION DYNAMIQUE DES TATOUAGES TOGASHI (ISE ZUMI)
// =============================================================================
function isCharacterTogashiTattooed() {
  const famSel = document.getElementById('sel-family');
  const schSel = document.getElementById('sel-school');
  const clanSel = document.getElementById('sel-clan');

  const famText = (famSel?.options[famSel.selectedIndex]?.text || "").toLowerCase();
  const famVal  = (famSel?.value || "").toLowerCase();
  const schText = (schSel?.options[schSel.selectedIndex]?.text || "").toLowerCase();
  const schVal  = (schSel?.value || "").toLowerCase();
  const clanVal = (clanSel?.value || "").toLowerCase();
  const clanText = (clanSel?.options[clanSel.selectedIndex]?.text || "").toLowerCase();

  return famText.includes("togashi") || famVal.includes("togashi") ||
         schText.includes("togashi") || schVal.includes("togashi") ||
         schText.includes("zumi")    || schVal.includes("zumi") ||
         schText.includes("tatou")   ||
         ((clanVal.includes("dragon") || clanText.includes("dragon")) && (famText.includes("togashi") || famVal.includes("togashi")));
}

function getTattooAllowedQuota() {
  const rank = typeof getCurrentSchoolRank === 'function' ? getCurrentSchoolRank() : 1;
  return 1 + rank;
}

function getSafeElementBadgeClass(elem) {
  switch ((elem || '').toLowerCase()) {
    case 'air':   return 'bg-sky-950 text-sky-300 border border-sky-600/40';
    case 'terre': return 'bg-amber-950 text-amber-300 border border-amber-600/40';
    case 'feu':   return 'bg-red-950 text-red-300 border border-red-600/40';
    case 'eau':   return 'bg-blue-950 text-blue-300 border border-blue-600/40';
    case 'vide':  return 'bg-purple-950 text-purple-300 border border-purple-600/40';
    default:      return 'bg-emerald-950 text-emerald-300 border border-emerald-600/40';
  }
}

function updateArchetypePanelsWithTattoos(forceCatalogRefresh = false, notifySanitize = false) {
  if (typeof updateArchetypePanels === 'function') {
    updateArchetypePanels(notifySanitize, forceCatalogRefresh);
  }
}

function populateTattooCatalogSelect(autoSelectFirst = false) {
  const sel = document.getElementById('sel-catalog-tattoo');
  if (!sel) return;
  const list = window.TATOUAGES_DATA || [];
  const owned = new Set((window.charTattoosList || []).map(t => t.id));
  const searchFilter = foldForgeSearch(document.getElementById('filter-tattoo-search')?.value || "");

  const filtered = list.filter(t => {
    if (owned.has(t.id)) return false;
    if (!searchFilter) return true;
    return foldForgeSearch(`${t.name || ''} ${t.kanji || ''} ${t.element || ''} ${t.rule || ''}`).includes(searchFilter);
  });

  sel.innerHTML = `<option value="">-- Choisir un Tatouage de Togashi (${filtered.length}) --</option>`;
  const frag = document.createDocumentFragment();
  filtered.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    const tag = t.element ? `[${t.element} ${t.ringReq || ''}]` : `[${t.source || 'Livre de Base'}]`;
    opt.textContent = `${tag} ${t.name} ${t.kanji ? '(' + t.kanji + ')' : ''}`;
    frag.appendChild(opt);
  });
  sel.appendChild(frag);
  if (autoSelectFirst && searchFilter && filtered.length > 0) {
    sel.value = filtered[0].id;
  }
  updateTattooPreview();
}

function updateTattooPreview() {
  const sel = document.getElementById('sel-catalog-tattoo');
  const card = document.getElementById('tattoo-preview-card');
  if (!sel || !card) return;

  const t = (window.TATOUAGES_DATA || []).find(item => item.id === sel.value);
  if (!t) { card.classList.add('hidden'); return; }

  const nameEl = document.getElementById('tattoo-preview-name');
  if (nameEl) nameEl.textContent = `${t.name} ${t.kanji ? '(' + t.kanji + ')' : ''}`;

  const elemBadge = document.getElementById('tattoo-preview-elem');
  if (elemBadge) {
    elemBadge.textContent = t.element ? `Anneau de ${t.element} ${t.ringReq || ''}` : (t.type || 'Togashi');
    elemBadge.className = `text-[9px] font-bold font-imperial px-2 py-0.5 rounded ${getSafeElementBadgeClass(t.element)}`;
  }

  const actEl = document.getElementById('tattoo-preview-act');
  if (actEl) actEl.textContent = t.activation || t.action || 'Action Libre';

  const durEl = document.getElementById('tattoo-preview-dur');
  if (durEl) durEl.textContent = t.duration || '2 × Rang rounds';

  const descEl = document.getElementById('tattoo-preview-desc');
  if (descEl) descEl.textContent = t.desc || t.lore ? `« ${t.desc || t.lore} »` : '';

  const ruleEl = document.getElementById('tattoo-preview-rule');
  if (ruleEl) ruleEl.textContent = t.rule || '';

  card.classList.remove('hidden');
}

function addTattooFromCatalog() {
  const perms = getActiveForgePermissions();
  if (!perms.canUseTattoos) {
    if (typeof showForgeToast === 'function') {
      showForgeToast("Les Tatouages Togashi sont réservés à l'ordre Ise Zumi.", 'warning');
    }
    return;
  }
  const sel = document.getElementById('sel-catalog-tattoo');
  if (!sel || !sel.value) return;
  const found = (window.TATOUAGES_DATA || []).find(t => t.id === sel.value);
  if (!found) return;

  const quota = getTattooAllowedQuota();
  if (window.charTattoosList.length >= quota) {
    alert(`Limite atteinte ! Votre Rang d'École vous permet de porter un maximum de ${quota} Tatouages.`);
    return;
  }

  window.charTattoosList.push(found);
  renderCharacterTattoos();
  populateTattooCatalogSelect();
}

function removeCharacterTattoo(id) {
  window.charTattoosList = window.charTattoosList.filter(t => t.id !== id);
  renderCharacterTattoos();
  populateTattooCatalogSelect();
}

function renderCharacterTattoos() {
  const container = document.getElementById('char-tattoos-container');
  const countBadge = document.getElementById('tattoos-count-badge');
  const quotaBadge = document.getElementById('tattoos-quota-badge');
  if (!container) return;

  const quota = getTattooAllowedQuota();
  if (countBadge) countBadge.textContent = window.charTattoosList.length;
  if (quotaBadge) quotaBadge.textContent = quota;

  if (window.charTattoosList.length === 0) {
    container.innerHTML = `<div class="col-span-full p-3 rounded bg-black/40 border border-stone-800 text-stone-500 italic text-center text-[11px]">Aucun tatouage gravé. Choisissez vos 2 tatouages initiaux ci-dessus.</div>`;
    return;
  }

  container.innerHTML = window.charTattoosList.map(t => {
    const badgeCls = getSafeElementBadgeClass(t.element);
    const label = t.element ? `${t.element} ${t.ringReq || ''}` : (t.type || 'Togashi');
    return `
      <div class="p-2.5 rounded-lg bg-stone-950/90 border border-emerald-900/50 space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div>
            <span class="text-[9px] font-bold font-imperial px-1.5 py-0.5 rounded ${badgeCls}">${label}</span>
            <b class="text-amber-200 font-imperial text-xs ml-1">${t.name}</b>
            ${t.kanji ? `<span class="text-emerald-400 font-serif font-bold text-xs ml-1">${t.kanji}</span>` : ''}
          </div>
          <button type="button" onclick="removeCharacterTattoo('${t.id}')" class="text-stone-500 hover:text-red-400 font-bold px-1 cursor-pointer">✕</button>
        </div>
        <p class="text-[10px] text-stone-300 leading-snug">${t.rule}</p>
      </div>
    `;
  }).join('');
}

function setMysticTab(tab) {
  const perms = getActiveForgePermissions();
  const allowSpellsOrKihos = perms.canCastSpells || perms.canUseKihos;

  if (tab === 'tattoos' && !perms.canUseTattoos) tab = 'auto';
  if (tab === 'spells' && !allowSpellsOrKihos) tab = 'auto';
  if (tab === 'katas' && !perms.canUseKatas) tab = 'auto';
  if (tab === 'all') tab = 'auto';

  const pSpells = document.getElementById('panel-spells-container');
  const pKatas = document.getElementById('panel-katas-container');
  const pTattoos = document.getElementById('panel-tattoos-container');
  const courtierNote = document.getElementById('panel-courtier-note');
  const slotsBar = document.getElementById('shugenja-slots-bar');
  if (courtierNote) courtierNote.classList.add('hidden');

  if (tab === 'tattoos') {
    pTattoos?.classList.remove('hidden');
    pSpells?.classList.add('hidden');
    pKatas?.classList.add('hidden');
    slotsBar?.classList.add('hidden');
  } else if (tab === 'spells') {
    pSpells?.classList.remove('hidden');
    pKatas?.classList.add('hidden');
    pTattoos?.classList.add('hidden');
    slotsBar?.classList.toggle('hidden', !perms.canCastSpells);
  } else if (tab === 'katas') {
    pKatas?.classList.remove('hidden');
    pSpells?.classList.add('hidden');
    pTattoos?.classList.add('hidden');
    slotsBar?.classList.add('hidden');
  } else {
    updateArchetypePanelsWithTattoos(false, false);
    return;
  }

  document.querySelectorAll('#mystic-tab-group [data-mystic-tab]').forEach(btn => {
    const isActive = btn.dataset.mysticTab === tab;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('text-stone-400', !isActive);
  });
}

// =============================================================================
// INITIALISATION & ÉCOUTEURS D'ÉVÉNEMENTS (SANS DÉLAIS ARTIFICIELS)
// =============================================================================
function handleFamilyOrSchoolChange() {
  const selFam = document.getElementById('sel-family');
  const selSch = document.getElementById('sel-school');
  const famText = (selFam?.options[selFam.selectedIndex]?.text || "").toLowerCase();
  if (famText.includes("togashi") && selSch) {
    const togashiSchOpt = Array.from(selSch.options).find(opt =>
      opt.text.toLowerCase().includes("togashi") || opt.text.toLowerCase().includes("zumi") || opt.value.toLowerCase().includes("togashi")
    );
    if (togashiSchOpt && selSch.value !== togashiSchOpt.value) {
      selSch.value = togashiSchOpt.value;
      if (typeof onSchoolChange === 'function') onSchoolChange();
      return;
    }
  }
  updateArchetypePanelsWithTattoos(true, true);
}

// =============================================================================
// SYSTÈME DE NOTIFICATIONS TOAST, STEPPER STUDIO & ERGONOMIE FORGE (v1.9.0)
// =============================================================================
function showForgeToast(message, variant = 'info') {
  const container = document.getElementById('forge-toast-container');
  if (!container) return;

  const palette = {
    success: 'bg-emerald-950/95 border-emerald-500/70 text-emerald-100',
    warn: 'bg-amber-950/95 border-amber-500/70 text-amber-100',
    error: 'bg-red-950/95 border-red-500/70 text-red-100',
    info: 'bg-[#171210]/95 border-amber-500/50 text-amber-100'
  };
  const icon = variant === 'success' ? '✅' : (variant === 'warn' ? '⚠️' : (variant === 'error' ? '❌' : '✨'));

  const toast = document.createElement('div');
  toast.className = `forge-toast rounded-xl border px-3.5 py-2.5 shadow-2xl text-xs flex items-center gap-2 backdrop-blur-md ${palette[variant] || palette.info}`;
  toast.innerHTML = `<span>${icon}</span><span class="font-medium leading-snug">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}
window.showForgeToast = showForgeToast;

const FORGE_STEPS = ['identity', 'rings', 'skills', 'perks', 'mystic', 'gear', 'all'];
let _currentForgeStep = 'identity';

function setForgeStep(stepKey, skipScroll = false) {
  const target = FORGE_STEPS.includes(stepKey) ? stepKey : 'identity';
  _currentForgeStep = target;
  try {
    sessionStorage.setItem('l5r_forge_step', target);
  } catch (e) {}

  document.querySelectorAll('[data-forge-step]').forEach(el => {
    const show = target === 'all' || el.dataset.forgeStep === target;
    el.classList.toggle('forge-step-hidden', !show);
  });

  document.querySelectorAll('.forge-step-footer').forEach(footer => {
    footer.classList.toggle('hidden', target === 'all');
  });

  document.querySelectorAll('#forge-stepper-bar [data-step-btn]').forEach(btn => {
    const isAct = btn.dataset.stepBtn === target;
    btn.classList.toggle('active', isAct);
    if (isAct && !skipScroll && window.innerWidth < 768) {
      try { btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); } catch (e) {}
    }
  });

  const skillsPanel = document.getElementById('skills-dropdown-panel');
  if (skillsPanel && !skillsPanel.classList.contains('hidden')) {
    skillsPanel.classList.add('hidden');
  }

  if (!skipScroll) {
    const stepper = document.getElementById('forge-stepper-bar');
    if (stepper) {
      const y = stepper.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 64 : 140);
      if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }
  syncMobileAppDock();
}
window.setForgeStep = setForgeStep;

function toggleMobileMoreSheet(forceOpen) {
  const sheet = document.getElementById('mobile-more-sheet');
  if (!sheet) return;
  const open = typeof forceOpen === 'boolean' ? forceOpen : sheet.classList.contains('hidden');
  sheet.classList.toggle('hidden', !open);
  syncMobileAppDock();
}
window.toggleMobileMoreSheet = toggleMobileMoreSheet;

function syncMobileAppDock() {
  const dock = document.getElementById('mobile-app-dock');
  if (!dock) return;
  const moreOpen = !document.getElementById('mobile-more-sheet')?.classList.contains('hidden');
  const diceOpen = !document.getElementById('dice-tray-panel')?.classList.contains('hidden');
  const dojoOpen = !document.getElementById('dojo-drawer-section')?.classList.contains('hidden');
  const sheetOpen = document.body.classList.contains('l5r-preview-active');

  let activeTab = 'forge';
  if (moreOpen) activeTab = 'more';
  else if (sheetOpen) activeTab = 'sheet';
  else if (diceOpen) activeTab = 'dice';
  else if (dojoOpen) activeTab = 'dojo';

  dock.querySelectorAll('[data-mobile-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mobileTab === activeTab);
  });

  const stepBadge = document.getElementById('mobile-dock-step-badge');
  if (stepBadge) {
    const idx = FORGE_STEPS.indexOf(_currentForgeStep);
    stepBadge.textContent = (_currentForgeStep === 'all' || idx === -1) ? 'Tout' : `${idx + 1}/6`;
  }
}

function handleMobileTab(tab) {
  if (tab !== 'more') toggleMobileMoreSheet(false);

  if (tab === 'more') {
    toggleMobileMoreSheet();
    return;
  }
  if (tab === 'sheet') {
    prepareAndPrintPDF();
    return;
  }
  if (tab === 'dice') {
    toggleDiceTray();
    return;
  }
  if (tab === 'dojo') {
    const sec = document.getElementById('dojo-drawer-section');
    const willOpen = sec ? sec.classList.contains('hidden') : true;
    toggleDojoDrawer(willOpen);
    if (willOpen && sec) {
      setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    }
    return;
  }
  // 'forge'
  toggleDojoDrawer(false);
  toggleDiceTray(false);
  const stepper = document.getElementById('forge-stepper-bar');
  if (stepper) {
    const y = Math.max(0, stepper.getBoundingClientRect().top + window.scrollY - 62);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  syncMobileAppDock();
}
window.handleMobileTab = handleMobileTab;

function resolveTraitIdFromLabel(traitLabel) {
  const t = foldForgeSearch(traitLabel);
  if (t.includes('const')) return 'trait-stamina';
  if (t.includes('volon')) return 'trait-willpower';
  if (t.includes('force')) return 'trait-strength';
  if (t.includes('percep')) return 'trait-perception';
  if (t.includes('reflex')) return 'trait-reflexes';
  if (t.includes('intuit')) return 'trait-awareness';
  if (t.includes('agil')) return 'trait-agility';
  if (t.includes('intel')) return 'trait-intelligence';
  if (t.includes('vide')) return 'trait-void';
  return 'trait-agility';
}

function rollSkillFromCard(idx) {
  const skills = window.currentSkills || [];
  const sk = skills[idx];
  if (!sk) return;
  const catalog = (typeof window.getSkills === 'function') ? window.getSkills() : (window.COMPETENCES_DATA || []);
  const catMeta = (typeof window.resolveCatalogSkillMeta === 'function')
    ? window.resolveCatalogSkillMeta(sk.name, catalog)
    : (catalog.find(c => c.name === sk.name) || {});
  const traitLabel = catMeta.trait || sk.trait || 'Agilité';
  const traitId = resolveTraitIdFromLabel(traitLabel);
  const traitVal = parseInt(document.getElementById(traitId)?.value, 10) || 2;
  const rankVal = parseInt(sk.rank, 10) || 0;
  const rollX = Math.max(1, rankVal + traitVal);
  const keepY = Math.max(1, traitVal);
  rollL5RDicePool(rollX, keepY, 0, `${sk.name} (${rollX}g${keepY})`, true, !!sk.spec);
}
window.rollSkillFromCard = rollSkillFromCard;

const _perksCategoryState = { adv: 'all', disadv: 'all' };

function setPerksCategory(kind, cat) {
  const safeKind = kind === 'disadv' ? 'disadv' : 'adv';
  _perksCategoryState[safeKind] = cat || 'all';
  const attr = safeKind === 'adv' ? 'data-adv-cat' : 'data-disadv-cat';
  const containerId = safeKind === 'adv' ? 'adv-cat-chips' : 'disadv-cat-chips';
  document.querySelectorAll(`#${containerId} [${attr}]`).forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute(attr) === _perksCategoryState[safeKind]);
  });
  filterPerksCatalog(safeKind, true);
}
window.setPerksCategory = setPerksCategory;

function filterPerksCatalog(kind, autoSelectFirst = true) {
  const safeKind = kind === 'disadv' ? 'disadv' : 'adv';
  const sel = document.getElementById(safeKind === 'adv' ? 'sel-catalog-adv' : 'sel-catalog-disadv');
  if (!sel || typeof window.getAdvantages !== 'function') return;

  const advData = window.getAdvantages();
  const list = safeKind === 'adv' ? (advData.avantages || []) : (advData.desavantages || []);
  const ownedSet = new Set(
    (safeKind === 'adv' ? (window.advantagesList || []) : (window.disadvantagesList || []))
      .map(x => (x.name || '').toLowerCase().trim())
  );

  const searchTerm = foldForgeSearch(document.getElementById(safeKind === 'adv' ? 'filter-adv-search' : 'filter-disadv-search')?.value || '');
  const catFilter = _perksCategoryState[safeKind] || 'all';
  const prevVal = sel.value;

  const matching = [];
  list.forEach((item, originalIdx) => {
    if (ownedSet.has((item.name || '').toLowerCase().trim())) return;
    const typeKey = foldForgeSearch(item.type || 'general');
    const effVal = safeKind === 'adv'
      ? (typeof window.getEffectiveAdvCost === 'function' ? window.getEffectiveAdvCost(item) : item.cost)
      : (typeof window.getEffectiveDisadvGain === 'function' ? window.getEffectiveDisadvGain(item) : (item.gain ?? item.cost));
    const baseVal = safeKind === 'adv' ? item.cost : (item.gain ?? item.cost);
    const hasModifier = safeKind === 'adv' ? (effVal < baseVal) : (effVal > baseVal);

    if (catFilter === 'discount' && !hasModifier) return;
    if (catFilter !== 'all' && catFilter !== 'discount' && !typeKey.includes(catFilter)) return;

    if (searchTerm) {
      const hay = foldForgeSearch(`${item.name || ''} ${item.type || ''} ${item.desc || ''} ${item.rule || ''}`);
      if (!hay.includes(searchTerm)) return;
    }
    matching.push({ item, originalIdx, effVal, baseVal });
  });

  const countBadge = document.getElementById(safeKind === 'adv' ? 'adv-match-count' : 'disadv-match-count');
  if (countBadge) countBadge.textContent = `${matching.length} résultat(s)`;

  sel.innerHTML = '';
  if (matching.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = searchTerm || catFilter !== 'all'
      ? '— Aucun résultat pour ce filtre —'
      : `— Aucun autre ${safeKind === 'adv' ? 'avantage' : 'désavantage'} disponible —`;
    sel.appendChild(opt);
    sel.disabled = true;
  } else {
    sel.disabled = false;
    const TYPE_LABELS = {
      physique: '⚔️ Physique',
      mental: '🧠 Mental',
      spirituel: '⛩️ Spirituel',
      social: '🌸 Social',
      materiel: '🌿 Matériel'
    };
    const grouped = {};
    matching.forEach(entry => {
      const k = foldForgeSearch(entry.item.type || 'general');
      if (!grouped[k]) grouped[k] = [];
      grouped[k].push(entry);
    });
    const frag = document.createDocumentFragment();
    Object.keys(grouped).sort((a, b) => a.localeCompare(b, 'fr')).forEach(tKey => {
      const grp = document.createElement('optgroup');
      grp.label = TYPE_LABELS[tKey] || `📁 ${tKey.toUpperCase()}`;
      grouped[tKey].sort((a, b) => a.item.name.localeCompare(b.item.name, 'fr')).forEach(({ item, originalIdx, effVal, baseVal }) => {
        const opt = document.createElement('option');
        opt.value = originalIdx;
        if (safeKind === 'adv') {
          const disc = effVal < baseVal ? ` ★ -${baseVal - effVal} XP` : '';
          opt.textContent = `  ◆ ${item.name} (${effVal} XP${disc})`;
        } else {
          const bonus = effVal > baseVal ? ` ★ +${effVal - baseVal} XP` : '';
          opt.textContent = `  ◆ ${item.name} (+${effVal} XP${bonus})`;
        }
        grp.appendChild(opt);
      });
      frag.appendChild(grp);
    });
    sel.appendChild(frag);

    if (prevVal && sel.querySelector(`option[value="${prevVal}"]`)) {
      sel.value = prevVal;
    } else if (autoSelectFirst && matching[0]) {
      sel.value = String(matching[0].originalIdx);
    }
  }

  if (safeKind === 'adv' && typeof window.updateAdvPreview === 'function') window.updateAdvPreview();
  if (safeKind === 'disadv' && typeof window.updateDisadvPreview === 'function') window.updateDisadvPreview();
}
window.filterPerksCatalog = filterPerksCatalog;

function updateTraitXpHints() {
  const advList = window.advantagesList || [];
  const hasBlessedElem = (ringKey) => advList.some(a =>
    foldForgeSearch(a.name).includes('benediction elementaire') && (a.chosenElement || 'earth').toLowerCase() === ringKey
  );
  const hasEnlightened = advList.some(a => a.impact === 'enlightened' || foldForgeSearch(a.name).includes('illumine'));

  const traitDefs = [
    { id: 'trait-stamina', ring: 'earth' },
    { id: 'trait-willpower', ring: 'earth' },
    { id: 'trait-strength', ring: 'water' },
    { id: 'trait-perception', ring: 'water' },
    { id: 'trait-reflexes', ring: 'air' },
    { id: 'trait-awareness', ring: 'air' },
    { id: 'trait-agility', ring: 'fire' },
    { id: 'trait-intelligence', ring: 'fire' }
  ];

  traitDefs.forEach(({ id, ring }) => {
    const val = parseInt(document.getElementById(id)?.value, 10) || 2;
    const hintEl = document.querySelector(`[data-nextxp="${id}"]`);
    if (!hintEl) return;
    if (val >= 6) {
      hintEl.textContent = '(Max 6)';
    } else {
      const nextCost = Math.max(1, ((val + 1) * 4) - (hasBlessedElem(ring) ? 1 : 0));
      hintEl.textContent = `(+1:${nextCost} XP)`;
    }
  });

  const voidVal = parseInt(document.getElementById('trait-void')?.value, 10) || 2;
  const voidHint = document.querySelector('[data-nextxp="trait-void"]');
  if (voidHint) {
    if (voidVal >= 6) {
      voidHint.textContent = '(Max 6)';
    } else {
      const nextVoidCost = Math.max(1, ((voidVal + 1) * 6) - (hasEnlightened ? 2 : 0));
      voidHint.textContent = `(+1:${nextVoidCost} XP)`;
    }
  }
}

function updateArmorWeaponSummary() {
  const box = document.getElementById('gear-weapon-summary');
  if (!box || typeof window.getEquipment !== 'function') return;
  const eq = window.getEquipment();
  const armorVal = document.getElementById('pc-armor')?.value || '0';
  const w1Name = document.getElementById('pc-weapon-1')?.value || 'Katana';
  const w2Name = document.getElementById('pc-weapon-2')?.value || 'Aucune';

  const armorObj = (eq.armures || []).find(a => String(a.tnBonus) === String(armorVal)) || { name: 'Vêtements simples', tnBonus: 0, reduction: 0, note: 'Aucun malus de mouvement' };
  const w1Obj = (eq.armes || []).find(w => w.name === w1Name) || { name: w1Name, vd: '—', skill: '—', type: '—' };
  const w2Obj = w2Name !== 'Aucune' ? ((eq.armes || []).find(w => w.name === w2Name) || { name: w2Name, vd: '—', skill: '—', type: '—' }) : null;

  box.innerHTML = `
    <div class="p-2.5 rounded-lg bg-black/50 border border-stone-800 space-y-0.5">
      <div class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">🛡️ Armure équipée</div>
      <div class="font-bold text-amber-200">${armorObj.name}</div>
      <div class="text-stone-400">Bonus ND : <b>+${armorObj.tnBonus || 0}</b> • Réduction : <b>${armorObj.reduction || 0}</b></div>
    </div>
    <div class="p-2.5 rounded-lg bg-black/50 border border-stone-800 space-y-0.5">
      <div class="text-[10px] text-amber-400 font-bold uppercase tracking-wider">⚔️ Arme Principale</div>
      <div class="font-bold text-amber-200">${w1Obj.name}</div>
      <div class="text-stone-400">VD : <b>${w1Obj.vd || '—'}</b> • Comp. : <b>${w1Obj.skill || '—'}</b></div>
    </div>
    <div class="p-2.5 rounded-lg bg-black/50 border border-stone-800 space-y-0.5">
      <div class="text-[10px] text-stone-400 font-bold uppercase tracking-wider">🏹 Arme Secondaire</div>
      <div class="font-bold text-stone-200">${w2Obj ? w2Obj.name : 'Aucune'}</div>
      <div class="text-stone-400">${w2Obj ? `VD : <b>${w2Obj.vd || '—'}</b> • Comp. : <b>${w2Obj.skill || '—'}</b>` : 'Emplacement libre'}</div>
    </div>
  `;
}

function updateTwentyQuestionsProgress() {
  let filled = 0;
  let total = 0;
  TWENTY_QUESTIONS_SECTIONS.forEach((sec, idx) => {
    let secFilled = 0;
    sec.items.forEach(item => {
      total++;
      const val = (document.getElementById(`q20-${item.id}`)?.value || '').trim();
      if (val.length > 0) {
        filled++;
        secFilled++;
      }
    });
    const chapBadge = document.getElementById(`q20-chap-count-${idx}`);
    if (chapBadge) chapBadge.textContent = `${secFilled}/${sec.items.length}`;
  });
  const badge = document.getElementById('q20-progress-badge');
  if (badge) badge.textContent = `${filled} / ${total}`;
  const stepGearPill = document.getElementById('step-pill-gear');
  if (stepGearPill) stepGearPill.textContent = `${filled}/${total}`;
  return { filled, total };
}
window.updateTwentyQuestionsProgress = updateTwentyQuestionsProgress;

function clearTwentyQuestions() {
  for (let i = 1; i <= 20; i++) {
    const el = document.getElementById(`q20-${i}`);
    if (el) el.value = '';
  }
  updateTwentyQuestionsProgress();
  toggleAllTwentyQuestionsChapters(true);
  showForgeToast('Les 20 Questions ont été vidées pour votre nouveau personnage.', 'info');
}
window.clearTwentyQuestions = clearTwentyQuestions;

function restoreExampleTwentyQuestions() {
  TWENTY_QUESTIONS_SECTIONS.forEach(sec => {
    sec.items.forEach(item => {
      const el = document.getElementById(`q20-${item.id}`);
      if (el) el.value = item.val;
    });
  });
  updateTwentyQuestionsProgress();
  showForgeToast('Exemple Hiruma restauré dans les 20 Questions.', 'info');
}
window.restoreExampleTwentyQuestions = restoreExampleTwentyQuestions;

function toggleAllTwentyQuestionsChapters(open) {
  document.querySelectorAll('#twenty-questions-mount details.q20-chapter').forEach(d => {
    d.open = !!open;
  });
}
window.toggleAllTwentyQuestionsChapters = toggleAllTwentyQuestionsChapters;

function updateForgeUXDashboard(detail) {
  updateTraitXpHints();
  updateArmorWeaponSummary();
  updateTwentyQuestionsProgress();

  // XP Progress bar & Breakdown strip
  const charState = window.currentChar || {};
  const breakdown = detail?.xpBreakdown || charState.xpBreakdown || {};
  const totalXP = detail?.totalXP ?? (parseInt(document.getElementById('xp-total')?.textContent, 10) || 40);
  const remXP = detail?.remainingXP ?? (parseInt(document.getElementById('xp-remaining')?.textContent, 10) || 0);
  const spentXP = detail?.xpSpent ?? Math.max(0, totalXP - remXP);

  const bar = document.getElementById('xp-progress-bar');
  const statusLbl = document.getElementById('xp-status-label');
  if (bar && statusLbl) {
    const pct = totalXP > 0 ? Math.min(100, Math.round((spentXP / totalXP) * 100)) : 100;
    bar.style.width = `${Math.max(4, pct)}%`;
    if (remXP < 0) {
      bar.className = 'h-full bg-red-500 transition-all duration-300';
      statusLbl.textContent = `Dépassement (${remXP} XP)`;
      statusLbl.className = 'font-bold text-red-400';
    } else if (remXP === 0) {
      bar.className = 'h-full bg-emerald-400 transition-all duration-300';
      statusLbl.textContent = '100% optimisé';
      statusLbl.className = 'font-bold text-emerald-300';
    } else {
      bar.className = 'h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300';
      statusLbl.textContent = `${pct}% utilisé`;
      statusLbl.className = 'font-bold text-emerald-400';
    }
  }

  const strip = document.getElementById('xp-breakdown-strip');
  if (strip) {
    const tXp = breakdown.traits ?? 0;
    const sXp = breakdown.skills ?? 0;
    const aXp = breakdown.advantages ?? 0;
    const artXp = breakdown.arts ?? 0;
    strip.textContent = `Traits ${tXp} • Comp ${sXp} • Av ${aXp}${artXp > 0 ? ` • Arts ${artXp}` : ''}`;
  }

  // Disadvantage progress bar (0..15 XP)
  const disadvGain = parseInt(document.getElementById('disadv-gain-total')?.textContent, 10) || 0;
  const disBar = document.getElementById('disadv-progress-bar');
  if (disBar) {
    disBar.style.width = `${Math.min(100, Math.round((disadvGain / 15) * 100))}%`;
  }

  // Skills cards live pools, next-rank XP & pending school choice banner
  const skills = window.currentSkills || [];
  const pendingChoices = skills.filter(sk => sk.isChoice && !sk.chosen).length;
  const alertEl = document.getElementById('skills-choice-alert');
  const alertCount = document.getElementById('skills-choice-alert-count');
  if (alertEl) {
    alertEl.classList.toggle('hidden', pendingChoices === 0);
    if (alertCount) alertCount.textContent = pendingChoices;
  }

  skills.forEach((sk, idx) => {
    if (sk.isChoice && !sk.chosen) return;
    const card = document.querySelector(`#skills-list [data-skill-card="${idx}"]`);
    const poolBtn = document.querySelector(`#skills-list [data-skill-pool="${idx}"]`);
    const nextEl = document.querySelector(`#skills-list [data-skill-nextxp="${idx}"]`);
    const traitId = resolveTraitIdFromLabel(card?.dataset.skillTrait || 'Agilité');
    const traitVal = parseInt(document.getElementById(traitId)?.value, 10) || 2;
    const rankVal = parseInt(sk.rank, 10) || 0;
    if (poolBtn) poolBtn.textContent = `🎲 ${rankVal + traitVal}g${traitVal}`;
    if (nextEl) nextEl.textContent = rankVal < 10 ? `+1 = ${rankVal + 1} XP` : 'Max';
  });

  // Stepper live pills
  const clanSel = document.getElementById('sel-clan');
  const clanText = clanSel?.options[clanSel.selectedIndex]?.text || 'Clan';
  const idPill = document.getElementById('step-pill-identity');
  if (idPill) idPill.textContent = clanText.replace(/^Clan du |^Clan de la |^Clan de l'|^Clan des /i, '').split('(')[0].trim();

  const ringsPill = document.getElementById('step-pill-rings');
  if (ringsPill) ringsPill.textContent = `ND ${document.getElementById('stat-armor-tn')?.textContent || '20'}`;

  const skPill = document.getElementById('step-pill-skills');
  if (skPill) {
    const ownedCount = skills.filter(sk => !sk.isChoice || sk.chosen).length;
    skPill.textContent = pendingChoices > 0 ? `${ownedCount} • ${pendingChoices} !` : `${ownedCount}`;
  }

  const perksPill = document.getElementById('step-pill-perks');
  if (perksPill) {
    const aCount = (window.advantagesList || []).length;
    const dCount = (window.disadvantagesList || []).length;
    perksPill.textContent = `${aCount} / ${dCount}`;
  }

  const mysticPill = document.getElementById('step-pill-mystic');
  if (mysticPill) {
    const spCount = (window.charSpellsList || []).length;
    const ktCount = (window.charKatasList || []).length;
    const ttCount = (window.charTattoosList || []).length;
    const sumArts = spCount + ktCount + ttCount;
    if (sumArts > 0) {
      mysticPill.textContent = `${sumArts}`;
    } else {
      const perms = getActiveForgePermissions();
      const parts = [];
      if (perms.canUseKatas) parts.push('Katas');
      if (perms.canCastSpells) parts.push('Sorts');
      else if (perms.canUseKihos) parts.push('Kihos');
      if (perms.canUseTattoos) parts.push('Tatouages');
      mysticPill.textContent = parts.length > 0 ? parts.join('+') : 'Cour';
    }
  }

  const mobXpPill = document.getElementById('mobile-xp-pill');
  if (mobXpPill) {
    mobXpPill.textContent = `${remXP} / ${totalXP}`;
    mobXpPill.parentElement.className = remXP < 0
      ? 'px-2 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-red-300 font-bold'
      : 'px-2 py-0.5 rounded bg-black/60 border border-amber-500/30 text-emerald-300 font-bold';
  }
  const mobNameEl = document.getElementById('mobile-step-header-name');
  if (mobNameEl) {
    mobNameEl.textContent = document.getElementById('pc-name')?.value || 'Samouraï';
  }
  syncMobileAppDock();
}

let _forgeUIInitialized = false;
function initForgeUIWhenReady() {
  if (_forgeUIInitialized) return;
  _forgeUIInitialized = true;

  populateSpellCatalogSelect();
  populateKataCatalogSelect();
  renderCharacterSpells();
  renderCharacterKatas();
  initSkillsMultiSelect();
  renderDojoRoster();
  updateArchetypePanels();

  const params = new URLSearchParams(window.location.search);
  const charParam = params.get("char");
  const loadIdParam = params.get("load");
  const clanParam = params.get("clan");
  const stepParam = params.get("step");
  const dojoParam = params.get("dojo");

  const initialStep = stepParam || (() => {
    try { return sessionStorage.getItem('l5r_forge_step'); } catch (e) { return null; }
  })() || 'identity';
  setForgeStep(initialStep, true);

  document.getElementById('pc-name')?.addEventListener('input', (e) => {
    const mobName = document.getElementById('mobile-step-header-name');
    if (mobName) mobName.textContent = e.target.value || 'Samouraï';
  });

  if (dojoParam === '1') {
    toggleDojoDrawer(true);
  }

  if (charParam) {
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(charParam)));
      applyFullCharacterState(decoded);
      updateArchetypePanelsWithTattoos(true);
      filterPerksCatalog('adv', false);
      filterPerksCatalog('disadv', false);
      updateForgeUXDashboard();
      return;
    } catch (e) {}
  }

  if (loadIdParam) {
    loadFromDojo(loadIdParam);
    updateArchetypePanelsWithTattoos(true);
    filterPerksCatalog('adv', false);
    filterPerksCatalog('disadv', false);
    updateForgeUXDashboard();
    return;
  }

  if (clanParam && document.querySelector(`#sel-clan option[value="${clanParam}"]`)) {
    document.getElementById("sel-clan").value = clanParam;
    if (typeof onClanChange === 'function') onClanChange();
  }

  updateArchetypePanelsWithTattoos(true);
  filterPerksCatalog('adv', false);
  filterPerksCatalog('disadv', false);
  updateForgeUXDashboard();
}

window.addEventListener("l5r-forge-ready", initForgeUIWhenReady);

window.addEventListener("l5r-forge-selection-changed", () => {
  handleFamilyOrSchoolChange();
  updateForgeUXDashboard();
});

window.addEventListener("l5r-forge-catalogs-updated", () => {
  filterPerksCatalog('adv', false);
  filterPerksCatalog('disadv', false);
});

window.addEventListener("l5r-forge-updated", (e) => {
  updateArchetypePanelsWithTattoos(false, true);
  updateForgeUXDashboard(e?.detail);
});

window.addEventListener("keydown", (e) => {
  if (!e.altKey || e.ctrlKey || e.metaKey) return;
  const map = { '1': 'identity', '2': 'rings', '3': 'skills', '4': 'perks', '5': 'mystic', '6': 'gear', '0': 'all' };
  if (map[e.key]) {
    e.preventDefault();
    setForgeStep(map[e.key]);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  injectForgeTemplates();

  if (window.__l5rForgeReady) {
    initForgeUIWhenReady();
  }
});
