// =============================================================================
// STUDIO D'IMPORT DE SCÉNARIOS (CAMPAGNE-AJOUTER.HTML)
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  if (dropZone && fileInput) {
    dropZone.onclick = () => fileInput.click();
    dropZone.ondragover = (e) => {
      e.preventDefault();
      dropZone.classList.add('border-amber-400');
    };
    dropZone.ondragleave = () => dropZone.classList.remove('border-amber-400');
    dropZone.ondrop = (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-amber-400');
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    };
    fileInput.onchange = (e) => {
      if (e.target.files.length) handleFile(e.target.files[0]);
    };
  }
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    document.getElementById('sc-title').value = cleanName;
    document.getElementById('sc-body').value = text;
    document.getElementById('sc-summary').value = text.substring(0, 160) + "...";
  };
  reader.readAsText(file);
}

function testAudio() {
  const title = document.getElementById('sc-title').value || "Scénario";
  const summary = document.getElementById('sc-summary').value;
  const body = document.getElementById('sc-body').value;
  const speech = `${title}. ${summary}. ${body.substring(0, 300)}`;

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(speech);
  u.lang = 'fr-FR';
  window.speechSynthesis.speak(u);
}

function generateAndDownloadHTML() {
  const num = document.getElementById('sc-num').value;
  const date = document.getElementById('sc-date').value;
  const place = document.getElementById('sc-place').value;
  const title = document.getElementById('sc-title').value || `Acte ${num}`;
  const summary = document.getElementById('sc-summary').value;
  const body = document.getElementById('sc-body').value;

  const formattedParagraphs = body.split("\n\n").map(p => `<p class="mb-4">${p.trim()}</p>`).join("");

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acte ${num} : ${title} — L5R | MJ David</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Noto+Serif+JP:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="stylesheet" href="../css/main.css">
  <script src="../js/navbar.js" defer><\/script>
  <script src="../js/narrator.js" defer><\/script>
</head>
<body class="min-h-screen flex flex-col justify-between">
  <header id="site-header"></header>
  <main class="max-w-5xl w-full mx-auto p-4 md:p-8 space-y-6">
    <div class="flex items-center justify-between text-xs">
      <a href="../campagne.html" class="text-amber-400 hover:text-amber-300 font-imperial font-bold">← Retour aux Actes</a>
      <span class="text-amber-300 font-mono">Acte ${num}</span>
    </div>
    <header class="card-clean rounded-2xl p-6 md:p-8 border-amber-500/40 space-y-2">
      <div class="text-[10px] text-amber-300 font-mono">ACTE ${num} • ${date} • ${place}</div>
      <h1 class="text-2xl md:text-4xl font-bold font-imperial gold-gradient" id="story-title">${title}</h1>
      <p class="text-xs md:text-sm text-amber-100/80 italic" id="story-summary">« ${summary} »</p>
    </header>
    <section class="card-clean rounded-xl p-4 flex items-center justify-between gap-4 sticky top-16 z-30 bg-black/90 shadow-xl">
      <div class="flex items-center gap-3">
        <span class="text-xl">🔊</span>
        <span class="text-xs font-imperial text-amber-200" id="audio-status">Voix Narrative Prête</span>
      </div>
      <div class="flex gap-2">
        <button onclick="readText()" class="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs">▶ Lire</button>
        <button onclick="window.speechSynthesis.pause()" class="px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-amber-300">⏸ Pause</button>
        <button onclick="stopAudio()" class="px-3 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-300">⏹ Arrêt</button>
      </div>
    </section>
    <article class="card-clean rounded-2xl p-6 md:p-10 text-xs md:text-sm text-stone-300 leading-relaxed" id="story-content">
      ${formattedParagraphs}
    </article>
  </main>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `scenario-${num}.html`;
  a.click();
}
