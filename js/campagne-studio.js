// =============================================================================
// MOTEUR DU CATALOGUE DE CAMPAGNE & STUDIO DE PUBLICATION GITHUB
// Utilisé par campagne.html, campagne-ajouter.html et le workflow GitHub Actions
// =============================================================================

const GITHUB_REPO_OWNER = "vincenzorpg";
const GITHUB_REPO_NAME = "L5R";
const GH_TOKEN_STORAGE_KEY = "l5r_gh_pat_v1";

function escapeHtmlSafe(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInlineMarkdown(text) {
  let out = escapeHtmlSafe(text);
  // Gras **texte**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  // Italique / pensée intérieure *texte*
  out = out.replace(/\*([^*]+)\*/g, '<span class="inner-thought">$1</span>');
  return out;
}

/**
 * Convertit le corps brut (texte / Markdown léger) en HTML structuré L5R
 * compatible avec le narrateur vocal paragraphe par paragraphe (#story-content p).
 */
function formatScenarioBodyToHTML(rawBody) {
  const blocks = String(rawBody || "")
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map(b => b.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return `<p>Le récit de cet acte attend d'être consigné par les chroniqueurs de l'Empire...</p>`;
  }

  let htmlParts = [];
  let inSection = false;

  blocks.forEach((block) => {
    // 1. Titre de section (## Titre ou # Titre)
    if (/^#{1,3}\s+/.test(block)) {
      const headingText = block.replace(/^#{1,3}\s+/, "").trim();
      if (inSection) htmlParts.push(`      </section>`);
      htmlParts.push(`      <section class="space-y-4 border-b border-amber-500/20 pb-6">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <h2 class="text-lg md:text-xl font-bold font-imperial text-amber-200">${escapeHtmlSafe(headingText)}</h2>
        </div>`);
      inSection = true;
      return;
    }

    // 2. Illustration [Image: chemin | légende]
    const imgMatch = block.match(/^\[Image\s*:\s*([^|\]]+?)(?:\|\s*([^\]]+))?\]$/i);
    if (imgMatch) {
      const src = imgMatch[1].trim();
      const caption = (imgMatch[2] || "").trim();
      htmlParts.push(`        <figure class="scene-figure">
          <img src="${escapeHtmlSafe(src)}" alt="${escapeHtmlSafe(caption || 'Illustration de scène')}" />
          ${caption ? `<figcaption class="scene-caption">${escapeHtmlSafe(caption)}</figcaption>` : ""}
        </figure>`);
      return;
    }

    // 3. Bloc de dialogue / citation (> ...)
    if (block.split("\n").every(l => l.trim().startsWith(">"))) {
      const lines = block
        .split("\n")
        .map(l => l.replace(/^\s*>\s?/, "").trim())
        .filter(Boolean);
      htmlParts.push(`        <div class="space-y-1.5 p-3.5 rounded-xl bg-black/50 border border-stone-800 text-stone-200">
${lines.map(l => `          <p>${formatInlineMarkdown(l)}</p>`).join("\n")}
        </div>`);
      return;
    }

    // 4. Paragraphe standard
    htmlParts.push(`        <p>\n          ${formatInlineMarkdown(block.replace(/\n+/g, " "))}\n        </p>`);
  });

  if (inSection) {
    htmlParts.push(`      </section>`);
  }

  return htmlParts.join("\n\n");
}

/**
 * Génère le fichier HTML complet d'un scénario au standard officiel des Actes 1 à 10
 * (avec barre de narration vocale HD ../js/narrator.js, navigation inter-scénarios et thème Dark Lacquer).
 */
function buildScenarioHTML(meta) {
  const id = parseInt(meta.id || meta.num, 10) || 11;
  const numPadded = String(id).padStart(2, "0");
  const title = (meta.title || `Acte ${id}`).trim();
  const shortTitle = (meta.shortTitle || title.slice(0, 22)).trim();
  const author = (meta.author || "Tsuruchi Akira").trim();
  const date = (meta.date || `Acte ${id}`).trim();
  const place = (meta.place || "Terres de Rokugan").trim();
  const summary = (meta.summary || meta.desc || "Chronique officielle de la Campagne de la Chronique de Rokugan.").trim();
  const wpUrl = (meta.wpUrl || "https://campagnel5rdavid2015.wordpress.com/la-campagne/").trim();
  const formattedBody = formatScenarioBodyToHTML(meta.body || "");

  const prevId = id > 1 ? id - 1 : null;
  const prevLinkHtml = prevId
    ? `<a href="scenario-${prevId}.html" class="px-3 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-amber-300 transition">← Scénario ${prevId}</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scénario ${id} : ${escapeHtmlSafe(title)} — Campagne de la Chronique de Rokugan</title>
  <meta name="l5r-scenario-id" content="${id}">
  <meta name="l5r-scenario-short-title" content="${escapeHtmlSafe(shortTitle)}">
  <meta name="l5r-scenario-title" content="${escapeHtmlSafe(title)}">
  <meta name="l5r-scenario-author" content="${escapeHtmlSafe(author)}">
  <meta name="l5r-scenario-date" content="${escapeHtmlSafe(date)}">
  <meta name="l5r-scenario-place" content="${escapeHtmlSafe(place)}">
  <meta name="l5r-scenario-desc" content="${escapeHtmlSafe(summary)}">
  <meta name="l5r-scenario-wp-url" content="${escapeHtmlSafe(wpUrl)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Noto+Serif+JP:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"><\/script>

  <!-- NAVIGATION GLOBALE & NARRATEUR HD -->
  <script src="../js/navbar.js" defer><\/script>
  <link rel="stylesheet" href="../css/main.css">
  <script src="../js/narrator.js" defer><\/script>
</head>
<body class="min-h-screen flex flex-col justify-between">

  <!-- MENU SUPÉRIEUR -->
  <header id="site-header"></header>

  <!-- CONTENU PRINCIPAL -->
  <main class="max-w-5xl w-full mx-auto p-4 md:p-8 space-y-6">

    <!-- FIL D'ARIANE & NAVIGATION INTER-SCÉNARIOS -->
    <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
      <a href="../campagne.html" class="text-amber-400 hover:text-amber-300 font-imperial font-bold flex items-center gap-1.5 transition">
        <span>←</span> Retour à la Liste des Scénarios
      </a>
      <div class="flex items-center gap-2">
        ${prevLinkHtml}
        <span class="text-stone-500 font-mono">Acte ${numPadded} • ${escapeHtmlSafe(shortTitle)}</span>
      </div>
    </div>

    <!-- EN-TÊTE DU SCÉNARIO -->
    <header class="card-clean rounded-2xl p-6 md:p-10 border-amber-500/40 relative overflow-hidden shadow-2xl space-y-4">
      <div class="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
        <span class="px-2.5 py-1 rounded bg-amber-950/90 border border-amber-500/40 text-amber-300 font-bold">SCÉNARIO ${numPadded}</span>
        <span class="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-300">${escapeHtmlSafe(place)}</span>
        <span class="px-2.5 py-1 rounded bg-teal-950/80 border border-teal-500/40 text-teal-300">Récit par : ${escapeHtmlSafe(author)}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black font-imperial gold-gradient tracking-wide" id="story-title">
        Scénario ${id} : ${escapeHtmlSafe(title)}
      </h1>

      <p class="text-xs md:text-sm text-amber-100/80 italic leading-relaxed border-l-2 border-amber-500 pl-3" id="story-summary">
        « ${escapeHtmlSafe(summary)} »
      </p>
    </header>

    <!-- BARRE DE LECTURE VOCALE NARRATIVE HD (PARAGRAPHE PAR PARAGRAPHE) -->
    <section class="card-clean rounded-xl p-4 border-amber-500/50 bg-[#120d0d]/95 sticky top-16 z-30 shadow-2xl space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-3">
        
        <!-- État et progression -->
        <div class="flex items-center gap-3">
          <div id="narrator-visualizer" class="w-9 h-9 rounded-full bg-amber-950/90 border border-amber-500/50 flex items-center justify-center text-amber-300 text-base shadow-inner transition-transform">
            🎙️
          </div>
          <div>
            <div class="text-xs font-bold font-imperial text-amber-200" id="audio-status">
              Voix Narrative Prête
            </div>
            <div class="text-[10px] text-stone-400 font-mono" id="audio-progress">
              Paragraphe 0 / 0 • Choisissez une voix naturelle
            </div>
          </div>
        </div>

        <!-- Contrôles de lecture & Sélection de voix -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <button type="button" onclick="prevParagraph()" title="Paragraphe précédent" class="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 cursor-pointer">
            ⏮
          </button>
          <button type="button" id="btn-play-pause" onclick="togglePlay()" class="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold font-imperial flex items-center gap-1.5 transition shadow cursor-pointer">
            <span id="play-icon">▶</span> <span id="play-text">Écouter le Récit</span>
          </button>
          <button type="button" onclick="nextParagraph()" title="Paragraphe suivant" class="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 cursor-pointer">
            ⏭
          </button>
          <button type="button" id="btn-stop" onclick="stopAudio()" title="Réinitialiser la lecture" class="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-red-950 text-stone-300 hover:text-red-300 border border-stone-700 transition cursor-pointer">
            ⏹
          </button>

          <!-- Sélecteur de Voix Française -->
          <select id="voice-select" onchange="onVoiceChange()" class="bg-black border border-stone-700 text-amber-200 rounded px-2 py-1.5 text-[11px] max-w-[180px] truncate" title="Sélectionner la voix de narration">
            <option value="">Voix française par défaut</option>
          </select>

          <!-- Vitesse -->
          <select id="audio-rate" class="bg-black border border-stone-700 text-amber-300 rounded px-2 py-1.5 text-[11px]">
            <option value="0.9">🐢 0.9x (Posé)</option>
            <option value="1.0" selected>🎙️ 1.0x (Naturel)</option>
            <option value="1.1">⚡ 1.1x (Fluide)</option>
            <option value="1.25">🔥 1.25x (Rapide)</option>
          </select>
        </div>

      </div>

      <!-- Barre de progression visuelle -->
      <div class="w-full bg-stone-900 h-1 rounded-full overflow-hidden">
        <div id="narrator-progress-bar" class="bg-amber-500 h-full w-0 transition-all duration-300"></div>
      </div>
    </section>

    <!-- CORPS INTÉGRAL DU RÉCIT -->
    <article id="story-content" class="card-clean rounded-2xl p-6 md:p-12 space-y-6 text-xs md:text-sm text-stone-300 leading-relaxed">
${formattedBody}
    </article>

    <!-- LIENS DE BAS DE PAGE -->
    <section class="card-clean rounded-xl p-5 border-stone-800 flex flex-wrap justify-between items-center gap-3 text-xs">
      <a href="${escapeHtmlSafe(wpUrl)}" target="_blank" rel="noopener noreferrer" class="text-stone-500 hover:text-amber-300 transition flex items-center gap-1">
        <span>📖</span> Consulter l'article source sur le blog WordPress ↗
      </a>
      <a href="../campagne.html" class="px-4 py-2 rounded bg-amber-600/90 hover:bg-amber-500 text-black font-bold font-imperial tracking-wider transition shadow">
        Retour au Registre des Scénarios →
      </a>
    </section>

  </main>

  <!-- PIED DE PAGE -->
  <footer class="py-6 text-center text-xs text-stone-600 border-t border-stone-900 bg-black/60 mt-10">
    <div>Campagne de la Chronique de Rokugan — L5R 4e Édition • ${escapeHtmlSafe(date)} : ${escapeHtmlSafe(title)} (par ${escapeHtmlSafe(author)})</div>
    <div id="site-version-footer" class="mt-2 text-[10px] text-stone-500 font-mono flex items-center justify-center gap-2 no-print">
      <span id="site-version-label">v1.19.0</span>
      <span>•</span>
      <a id="site-version-link" href="https://github.com/vincenzorpg/L5R/releases" target="_blank" rel="noopener noreferrer" class="hover:text-amber-300 transition underline decoration-stone-700 hover:decoration-amber-400">Releases GitHub ↗</a>
    </div>
  </footer>
</body>
</html>
`;
}

/**
 * Construit le contenu mis à jour de data/scenarios-data.js incluant la nouvelle entrée.
 */
function buildUpdatedScenariosDataJS(existingList, newMeta) {
  const id = parseInt(newMeta.id || newMeta.num, 10) || 11;
  const num = String(id).padStart(2, "0");
  const list = Array.isArray(existingList) ? existingList.map(item => ({ ...item })) : [];

  const entry = {
    id,
    num,
    shortTitle: (newMeta.shortTitle || newMeta.title || `Acte ${id}`).trim().slice(0, 24),
    file: `campagne/scenario-${id}.html`,
    wpUrl: (newMeta.wpUrl || "https://campagnel5rdavid2015.wordpress.com/la-campagne/").trim(),
    title: (newMeta.title || `Acte ${id}`).trim(),
    author: (newMeta.author || "Tsuruchi Akira").trim(),
    date: (newMeta.date || `Acte ${id}`).trim(),
    place: (newMeta.place || "Terres de Rokugan").trim(),
    desc: (newMeta.summary || newMeta.desc || "Chronique officielle de la Campagne de la Chronique de Rokugan.").trim()
  };

  const existingIdx = list.findIndex(s => Number(s.id) === id);
  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...entry };
  } else {
    list.push(entry);
  }
  list.sort((a, b) => Number(a.id) - Number(b.id));

  return `// =============================================================================
// REGISTRE CENTRALISÉ DES SCÉNARIOS DE LA CAMPAGNE (DATA/SCENARIOS-DATA.JS)
// Source unique de vérité pour index.html, campagne.html et campagne-ajouter.html
// Compatible Navigateur (window.SCENARIOS_DATA) et Node.js (module.exports)
// =============================================================================

const SCENARIOS_DATA = ${JSON.stringify(list, null, 2)};

if (typeof window !== "undefined") {
  window.SCENARIOS_DATA = SCENARIOS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SCENARIOS_DATA };
}
`;
}

// =============================================================================
// FONCTIONS D'INTERFACE NAVIGATEUR (CAMPAGNE.HTML & CAMPAGNE-AJOUTER.HTML)
// =============================================================================
function renderCampagneCatalog() {
  const grid = document.getElementById("scenarios-grid");
  if (!grid) return;

  const list = window.SCENARIOS_DATA || [];
  const badge = document.getElementById("scenarios-count-badge");
  const heading = document.getElementById("scenarios-heading");
  if (badge) badge.textContent = `${list.length} ACTES DISPONIBLES`;
  if (heading) heading.textContent = `Table des ${list.length} Scénarios Joués`;

  grid.innerHTML = list.map(s => `
    <div class="card-clean card-hover rounded-xl overflow-hidden flex flex-col justify-between transition duration-200 group">
      ${s.cover ? `
        <a href="${escapeHtmlSafe(s.file)}" class="block relative aspect-[16/9] max-h-52 w-full overflow-hidden border-b border-amber-500/30 bg-black">
          <img src="${escapeHtmlSafe(s.cover)}" alt="Illustration principale — ${escapeHtmlSafe(s.title)}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20"></div>
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
            <span class="px-2.5 py-0.5 rounded bg-black/85 border border-amber-500/50 text-amber-300 font-bold font-mono backdrop-blur-sm">ACTE ${s.id}</span>
            <span class="px-2 py-0.5 rounded bg-black/75 text-stone-200 backdrop-blur-sm">${escapeHtmlSafe(s.place)}</span>
          </div>
        </a>
      ` : ""}
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          ${!s.cover ? `
          <div class="flex items-center justify-between text-[10px]">
            <span class="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/40 text-amber-300 font-bold font-mono">ACTE ${s.id}</span>
            <span class="text-stone-500">${escapeHtmlSafe(s.date)} • ${escapeHtmlSafe(s.place)}</span>
          </div>` : `
          <div class="text-[10px] text-stone-400 font-mono">${escapeHtmlSafe(s.date)} • Illustration principale</div>
          `}
          <h3 class="text-base font-bold font-imperial text-amber-200">${escapeHtmlSafe(s.title)}</h3>
          <p class="text-[11px] text-amber-400/80 italic font-mono">Par : ${escapeHtmlSafe(s.author)}</p>
          <p class="text-xs text-stone-400 leading-relaxed">${escapeHtmlSafe(s.desc)}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-stone-800/80 gap-2">
          <a href="${escapeHtmlSafe(s.wpUrl)}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-stone-500 hover:text-amber-300 transition flex items-center gap-1">
            <span>📖</span> Blog ↗
          </a>
          <a href="${escapeHtmlSafe(s.file)}" class="px-3.5 py-1.5 rounded bg-amber-600/90 hover:bg-amber-500 text-black font-bold font-imperial text-xs tracking-wider transition flex items-center gap-1.5 shadow">
            <span>🔊</span> Lire & Écouter →
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

function collectStudioMeta() {
  const id = parseInt(document.getElementById('sc-num')?.value, 10) || 11;
  const title = (document.getElementById('sc-title')?.value || "").trim() || `Acte ${id}`;
  const shortTitle = (document.getElementById('sc-short-title')?.value || "").trim() || title.slice(0, 20);
  const author = (document.getElementById('sc-author')?.value || "Tsuruchi Akira").trim();
  const date = (document.getElementById('sc-date')?.value || `Acte ${id}`).trim();
  const place = (document.getElementById('sc-place')?.value || "Terres de l'Empire").trim();
  const summary = (document.getElementById('sc-summary')?.value || "").trim() || "Chronique officielle de la Campagne de la Chronique de Rokugan.";
  const body = (document.getElementById('sc-body')?.value || "").trim();
  const wpUrl = (document.getElementById('sc-wp-url')?.value || "https://campagnel5rdavid2015.wordpress.com/la-campagne/").trim();

  return { id, num: String(id).padStart(2, "0"), title, shortTitle, author, date, place, summary, desc: summary, body, wpUrl };
}

function onTitleInput() {
  const titleEl = document.getElementById('sc-title');
  const shortEl = document.getElementById('sc-short-title');
  if (titleEl && shortEl && !shortEl.dataset.userEdited) {
    shortEl.value = titleEl.value.trim().slice(0, 20);
  }
  updateLivePreview();
}

function updateLivePreview() {
  const preview = document.getElementById('live-scenario-preview');
  if (!preview) return;

  const meta = collectStudioMeta();
  const targetBadge = document.getElementById('target-file-badge');
  if (targetBadge) targetBadge.textContent = `campagne/scenario-${meta.id}.html`;

  const bodyHtml = formatScenarioBodyToHTML(meta.body);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = bodyHtml;
  const pCount = tempDiv.querySelectorAll('p').length;

  const statsBadge = document.getElementById('preview-stats-badge');
  if (statsBadge) statsBadge.textContent = `${pCount} paragraphe(s) • Acte ${meta.num}`;

  preview.innerHTML = `
    <div class="p-4 rounded-xl bg-black/70 border border-amber-500/35 space-y-2">
      <div class="flex flex-wrap gap-1.5 text-[9px] font-mono uppercase">
        <span class="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">SCÉNARIO ${meta.num}</span>
        <span class="px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-700">${escapeHtmlSafe(meta.place)}</span>
        <span class="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/40">Par : ${escapeHtmlSafe(meta.author)}</span>
      </div>
      <h3 class="text-base font-bold font-imperial gold-text">Scénario ${meta.id} : ${escapeHtmlSafe(meta.title)}</h3>
      <p class="text-[11px] text-amber-100/80 italic border-l-2 border-amber-500 pl-2.5">« ${escapeHtmlSafe(meta.summary)} »</p>
    </div>
    <div class="p-4 rounded-xl bg-black/40 border border-stone-800 space-y-3 text-stone-300 leading-relaxed">
      ${bodyHtml}
    </div>
  `;
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    let raw = String(event.target.result || "").replace(/\r\n/g, "\n").trim();

    // Si l'utilisateur dépose un fichier .html existant, extraire le texte d'#story-content
    if (/\.html?$/i.test(file.name) && raw.includes("<")) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, "text/html");
      const storyEl = doc.getElementById("story-content") || doc.querySelector("article") || doc.body;
      raw = storyEl ? storyEl.innerText.trim() : raw;
    }

    const lines = raw.split("\n");
    let detectedTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
    let bodyStartIdx = 0;

    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      if (/^#\s+/.test(firstLine) || (firstLine.length > 3 && firstLine.length < 90 && !firstLine.endsWith("."))) {
        detectedTitle = firstLine.replace(/^#+\s*/, "").replace(/^Sc[ée]nario\s*\d+\s*[:—-]\s*/i, "").trim();
        bodyStartIdx = 1;
      }
    }

    const cleanBody = lines.slice(bodyStartIdx).join("\n").trim() || raw;
    const firstPara = cleanBody
      .split(/\n{2,}/)
      .map(p => p.replace(/^#+\s*/, "").trim())
      .find(p => p.length > 25) || cleanBody.slice(0, 180);

    document.getElementById('sc-title').value = detectedTitle;
    document.getElementById('sc-short-title').value = detectedTitle.slice(0, 20);
    document.getElementById('sc-body').value = cleanBody;
    document.getElementById('sc-summary').value = firstPara.length > 200 ? firstPara.slice(0, 197) + "..." : firstPara;

    const badge = document.getElementById('upload-status-badge');
    if (badge) {
      badge.textContent = `✓ Fichier chargé : ${file.name} (${cleanBody.length} caractères)`;
      badge.classList.remove('hidden');
    }

    updateLivePreview();
  };
  reader.readAsText(file);
}

function insertTag(snippet) {
  const ta = document.getElementById('sc-body');
  if (!ta) return;
  const start = ta.selectionStart || 0;
  const end = ta.selectionEnd || 0;
  const text = ta.value;
  ta.value = text.substring(0, start) + snippet + text.substring(end);
  ta.focus();
  ta.selectionStart = ta.selectionEnd = start + snippet.length;
  updateLivePreview();
}

function loadSampleScenario() {
  const nextId = getNextScenarioId();
  document.getElementById('sc-num').value = nextId;
  document.getElementById('sc-title').value = "Les Tambours du Col de Beiden";
  document.getElementById('sc-short-title').value = "Col de Beiden";
  document.getElementById('sc-date').value = `Acte ${nextId}`;
  document.getElementById('sc-place').value = "Col de Beiden";
  document.getElementById('sc-author').value = "Tsuruchi Akira";
  document.getElementById('sc-summary').value = "Envoyés en éclaireurs sur la passe stratégique du Col de Beiden, les samouraïs découvrent un avant-poste frappé d'un silence surnaturel.";
  document.getElementById('sc-body').value = `## Jour 1 : L'Ascension dans la Brume

Les vents glacés qui descendent des montagnes de l'Épine du Monde fouettent nos manteaux de voyage. **Okado**-san marche en tête aux côtés de son loup Shiro, tandis que **Hirohito** porte son lourd tetsubō sur l'épaule sans montrer le moindre signe de fatigue.

*La brume est trop épaisse pour la saison. Même les corbeaux ont déserté les pins.*

> **Okado Hiruma :** « Regardez les traces dans la boue gelée. Aucune patrouille n'est redescendue depuis trois jours. »
> **Ryujin Mirumoto :** « Gardez la main sur vos gardes. Le jade à mon poignet commence à tiédir. »

## Jour 2 : Le Sanctuaire Abandonné

Au sommet de la passe, les portes du relais impérial battent dans le vent. Sur le bois laqué, une empreinte sanglante témoigne d'un combat désespéré livré à l'aube.`;
  updateLivePreview();
}

function getNextScenarioId() {
  const list = window.SCENARIOS_DATA || [];
  if (!list.length) return 11;
  return Math.max(...list.map(s => Number(s.id) || 0)) + 1;
}

function testAudio() {
  if (!('speechSynthesis' in window)) {
    alert("La synthèse vocale n'est pas supportée par votre navigateur.");
    return;
  }
  const meta = collectStudioMeta();
  const sampleText = `Scénario ${meta.id} : ${meta.title}. Récit par ${meta.author}. ${meta.summary}. ${meta.body.replace(/[#>*]/g, '').slice(0, 350)}`;

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(sampleText);
  u.lang = 'fr-FR';
  window.speechSynthesis.speak(u);
}

function generateAndDownloadHTML() {
  const meta = collectStudioMeta();
  const htmlContent = buildScenarioHTML(meta);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `scenario-${meta.id}.html`;
  a.click();
}

/**
 * MODE 1 : Soumission directe en Pull Request sur GitHub Web (/new/main?filename=campagne/scenario-X.html&value=...)
 * Pré-remplit automatiquement le chemin du fichier ET le code HTML complet dans GitHub (et le copie aussi dans le presse-papiers).
 * Grâce à l'auto-découverte <meta name="l5r-scenario-*"> de data/scenarios-data.js, ce seul fichier suffit à mettre à jour tout le site !
 */
function submitScenarioViaGitHubIssue() {
  const meta = collectStudioMeta();
  if (!meta.body || meta.body.length < 10) {
    alert("Veuillez d'abord déposer un fichier ou saisir le texte du scénario à l'étape 1 ou 2.");
    return;
  }

  const htmlContent = buildScenarioHTML(meta);
  const targetFilename = encodeURIComponent(`campagne/scenario-${meta.id}.html`);
  const encodedValue = encodeURIComponent(htmlContent);
  const feedback = document.getElementById('issue-submit-feedback');

  // Toujours copier le HTML complet dans le presse-papiers par confort
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(htmlContent).catch(() => {});
  }

  if (encodedValue.length < 6800) {
    const prWebUrl = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/new/main?filename=${targetFilename}&value=${encodedValue}`;
    if (feedback) {
      feedback.innerHTML = `✅ <b>Page pré-remplie dans GitHub !</b> Dans l'onglet GitHub qui vient de s'ouvrir, cliquez simplement en haut à droite sur le bouton vert <b>« Commit changes... »</b> puis choisissez <b>« Create a new branch for this commit and start a pull request »</b> !`;
      feedback.classList.remove('hidden');
    }
    window.open(prWebUrl, "_blank", "noopener,noreferrer");
  } else {
    const prWebUrl = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/new/main?filename=${targetFilename}`;
    if (feedback) {
      feedback.innerHTML = `📋 <b>Code HTML complet copié dans votre presse-papiers !</b> Comme votre récit est très long, faites simplement <b>Ctrl+V (Coller)</b> dans l'éditeur GitHub qui vient de s'ouvrir, puis cliquez sur <b>« Commit changes... ➔ Create a new branch & start a pull request »</b> !`;
      feedback.classList.remove('hidden');
    }
    window.open(prWebUrl, "_blank", "noopener,noreferrer");
  }
}

/**
 * MODE 2 : Publication directe par API REST GitHub (1 clic depuis la page avec Personal Access Token)
 */
async function publishScenarioDirectViaAPI() {
  const meta = collectStudioMeta();
  if (!meta.body || meta.body.length < 10) {
    alert("Veuillez d'abord déposer un fichier ou saisir le texte du scénario.");
    return;
  }

  const tokenInput = document.getElementById('gh-pat-input');
  const token = (tokenInput?.value || "").trim();
  if (!token) {
    alert("Veuillez renseigner votre Personal Access Token GitHub (ou utilisez le bouton principal « Soumettre sur GitHub » qui ne nécessite aucun token).");
    return;
  }

  try {
    localStorage.setItem(GH_TOKEN_STORAGE_KEY, token);
  } catch (e) {}

  const statusBox = document.getElementById('api-publish-status');
  const setStatus = (msg, isError = false) => {
    if (!statusBox) return;
    statusBox.className = `text-[11px] p-2.5 rounded-lg border leading-snug ${
      isError
        ? "bg-red-950/80 border-red-500/50 text-red-200"
        : "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
    }`;
    statusBox.innerHTML = msg;
    statusBox.classList.remove('hidden');
  };

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json"
  };

  const encodeBase64Utf8 = (str) => btoa(unescape(encodeURIComponent(str)));

  try {
    setStatus("⏳ 1/4 — Récupération de la branche <code>main</code> sur GitHub...");
    const refRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/main`, { headers });
    if (!refRes.ok) throw new Error(`Impossible de lire main (${refRes.status}). Vérifiez votre token GitHub.`);
    const refData = await refRes.json();
    const baseSha = refData.object.sha;

    const branchName = `feat/scenario-${meta.id}-${Date.now().toString().slice(-4)}`;
    setStatus(`⏳ 2/4 — Création de la branche <code>${branchName}</code>...`);
    const createRefRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/refs`, {
      method: "POST",
      headers,
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha })
    });
    if (!createRefRes.ok) throw new Error(`Impossible de créer la branche (${createRefRes.status}).`);

    // 3. Commit campagne/scenario-X.html
    setStatus(`⏳ 3/4 — Envoi de <code>campagne/scenario-${meta.id}.html</code> et mise à jour du registre...`);
    const htmlContent = buildScenarioHTML(meta);
    const targetPath = `campagne/scenario-${meta.id}.html`;

    // Check if file already exists on branch
    let existingFileSha = undefined;
    const checkFileRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${targetPath}?ref=${branchName}`, { headers });
    if (checkFileRes.ok) {
      const existingFile = await checkFileRes.json();
      existingFileSha = existingFile.sha;
    }

    const putHtmlRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${targetPath}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `feat(campagne): add scenario ${meta.id} - ${meta.title}`,
        content: encodeBase64Utf8(htmlContent),
        branch: branchName,
        ...(existingFileSha ? { sha: existingFileSha } : {})
      })
    });
    if (!putHtmlRes.ok) throw new Error(`Échec de l'écriture de ${targetPath} (${putHtmlRes.status}).`);

    // Update data/scenarios-data.js
    const regPath = "data/scenarios-data.js";
    const regCheckRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${regPath}?ref=${branchName}`, { headers });
    let regSha = undefined;
    if (regCheckRes.ok) {
      const regFile = await regCheckRes.json();
      regSha = regFile.sha;
    }
    const updatedRegContent = buildUpdatedScenariosDataJS(window.SCENARIOS_DATA || [], meta);
    await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${regPath}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `feat(campagne): register scenario ${meta.id} in data/scenarios-data.js`,
        content: encodeBase64Utf8(updatedRegContent),
        branch: branchName,
        ...(regSha ? { sha: regSha } : {})
      })
    });

    // 4. Open Pull Request
    setStatus("⏳ 4/4 — Ouverture de la Pull Request sur GitHub...");
    const prBody = `## 🏯 Nouveau Scénario : Acte ${meta.id} — ${meta.title}\n\n- **Fichier généré** : \`campagne/scenario-${meta.id}.html\`\n- **Narrateur** : ${meta.author}\n- **Lieu** : ${meta.place}\n- **Résumé** : ${meta.summary}\n\n---\n\n## 📦 Release Notes — Prêtes à publier\n\n\`\`\`markdown\n### ✨ Ajouté\n- **Campagne (\`campagne/scenario-${meta.id}.html\`)** : Ajout de l'Acte ${meta.id} — *${meta.title}* (raconté par ${meta.author}) avec synthèse vocale HD.\n\`\`\``;

    const prRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: `feat(campagne): ajout du Scénario ${meta.id} — ${meta.title}`,
        head: branchName,
        base: "main",
        body: prBody
      })
    });
    if (!prRes.ok) throw new Error(`Échec de création de la Pull Request (${prRes.status}).`);
    const prData = await prRes.json();

    setStatus(`🎉 <b>Pull Request créée avec succès !</b><br><a href="${prData.html_url}" target="_blank" rel="noopener noreferrer" class="underline font-bold text-amber-300">Ouvrir la Pull Request #${prData.number} sur GitHub ↗</a>`);
  } catch (err) {
    setStatus(`❌ <b>Erreur :</b> ${escapeHtmlSafe(err.message)}`, true);
  }
}

/**
 * MODE 3 : Copie le HTML généré et ouvre l'éditeur web GitHub sur /new/main/campagne
 */
function openGitHubWebNewFile() {
  const meta = collectStudioMeta();
  const htmlContent = buildScenarioHTML(meta);
  navigator.clipboard.writeText(htmlContent).then(() => {
    const url = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/new/main/campagne?filename=scenario-${meta.id}.html`;
    alert(`Le code HTML complet de scenario-${meta.id}.html a été copié dans votre presse-papiers !\n\nDans la page GitHub qui va s'ouvrir :\n1. Collez (Ctrl+V) dans l'éditeur\n2. Cliquez sur "Commit changes..." puis "Create a new branch & start a pull request".`);
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

// Initialisation automatique au chargement du DOM
if (typeof document !== "undefined") {
  window.addEventListener("l5r-scenarios-updated", () => {
    renderCampagneCatalog();
    const numEl = document.getElementById('sc-num');
    const dateEl = document.getElementById('sc-date');
    if (numEl && !numEl.dataset.userEdited) {
      const nextId = getNextScenarioId();
      numEl.value = nextId;
      if (dateEl) dateEl.value = `Acte ${nextId}`;
      updateLivePreview();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderCampagneCatalog();

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const shortTitleInput = document.getElementById('sc-short-title');

    if (shortTitleInput) {
      shortTitleInput.addEventListener('input', () => {
        shortTitleInput.dataset.userEdited = "true";
      });
    }

    if (dropZone && fileInput) {
      const nextId = getNextScenarioId();
      const numEl = document.getElementById('sc-num');
      const dateEl = document.getElementById('sc-date');
      if (numEl) numEl.value = nextId;
      if (dateEl) dateEl.value = `Acte ${nextId}`;

      try {
        const savedToken = localStorage.getItem(GH_TOKEN_STORAGE_KEY);
        const tokenInput = document.getElementById('gh-pat-input');
        if (savedToken && tokenInput) tokenInput.value = savedToken;
      } catch (e) {}

      dropZone.onclick = () => fileInput.click();
      dropZone.ondragover = (e) => {
        e.preventDefault();
        dropZone.classList.add('border-amber-400', 'bg-amber-950/20');
      };
      dropZone.ondragleave = () => dropZone.classList.remove('border-amber-400', 'bg-amber-950/20');
      dropZone.ondrop = (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-amber-400', 'bg-amber-950/20');
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
      };
      fileInput.onchange = (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
      };

      updateLivePreview();
    }
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    formatScenarioBodyToHTML,
    buildScenarioHTML,
    buildUpdatedScenariosDataJS
  };
}
