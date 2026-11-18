// =============================================================================
// MOTEUR VOCAL NARRATEUR & SÉLECTEUR DE CHRONIQUES (CAMPAGNE L5R)
// Compatible avec les récits paragraphe par paragraphe (Actes 1, 4 à 10)
// et les récits multi-versions à onglets (Actes 2 et 3).
// =============================================================================

(function () {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const STORAGE_VOICE_KEY = 'l5r_narrator_voice';
  const STORAGE_RATE_KEY = 'l5r_narrator_rate';
  const STORAGE_CONTINUOUS_KEY = 'l5r_narrator_continuous';
  const STORAGE_LAST_ACT_KEY = 'l5r_narrator_last_act';
  const SESSION_AUTOPLAY_KEY = 'l5r_narrator_autoplay_next';

  let paragraphs = [];
  let currentIndex = 0;
  let currentChunkIndex = 0;
  let currentChunks = [];
  let isPlaying = false;
  let isPaused = false;
  let selectedVoice = null;
  let activeVersion = 'v1';
  let speakGeneration = 0;
  let continuousTimerId = null;

  function getCurrentScenarioActNumber() {
    if (typeof window === 'undefined') return null;
    const m = String(window.location.pathname || '').match(/scenario-(\d+)\.html/i);
    return m ? parseInt(m[1], 10) : null;
  }

  function getNextScenarioHref() {
    const act = getCurrentScenarioActNumber();
    if (!act) return null;
    const nextNum = act + 1;
    const explicitLink = document.querySelector(`a[href*="scenario-${nextNum}.html"]`);
    if (explicitLink) return `scenario-${nextNum}.html`;
    if (Array.isArray(window.SCENARIOS_DATA)) {
      const found = window.SCENARIOS_DATA.find(s => Number(s.id) === nextNum);
      if (found) return `scenario-${nextNum}.html`;
    }
    return null;
  }

  function isContinuousEnabled() {
    try {
      return localStorage.getItem(STORAGE_CONTINUOUS_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function setContinuousEnabled(val) {
    try {
      localStorage.setItem(STORAGE_CONTINUOUS_KEY, val ? '1' : '0');
    } catch (_) {}
    updateContinuousToggleUI();
  }

  function clearContinuousCountdown() {
    if (continuousTimerId) {
      clearInterval(continuousTimerId);
      continuousTimerId = null;
    }
  }

  function updateContinuousToggleUI() {
    const btn = document.getElementById('btn-continuous-audio');
    if (!btn) return;
    const active = isContinuousEnabled();
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.className = active
      ? 'px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer bg-amber-600/90 text-black border-amber-400 shadow'
      : 'px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer bg-black/60 text-stone-400 border-stone-800 hover:text-amber-300 hover:border-amber-500/40';
    btn.textContent = active ? '🔁 Continu : ON' : '🔁 Continu : OFF';
  }

  function injectContinuousToggle() {
    if (!getNextScenarioHref() || document.getElementById('btn-continuous-audio')) return;
    const rateEl = document.getElementById('audio-rate');
    const host = rateEl ? rateEl.parentElement : null;
    if (!host) return;
    const btn = document.createElement('button');
    btn.id = 'btn-continuous-audio';
    btn.type = 'button';
    btn.title = "Enchaîner automatiquement l'acte suivant à la fin du récit";
    btn.addEventListener('click', () => setContinuousEnabled(!isContinuousEnabled()));
    host.appendChild(btn);
    updateContinuousToggleUI();
  }

  function isMultiVersionMode() {
    return !!document.getElementById('content-v1');
  }

  function getActiveContainer() {
    if (isMultiVersionMode()) {
      return document.getElementById(`content-${activeVersion}`) || document.getElementById('story-content');
    }
    return document.getElementById('story-content');
  }

  function collectParagraphs() {
    const container = getActiveContainer();
    if (!container) {
      paragraphs = [];
      return;
    }
    paragraphs = Array.from(container.querySelectorAll('p')).filter(p => p.textContent.trim().length > 0);
  }

  /**
   * Découpe un paragraphe en phrases courtes (< 220 car.) pour éviter la coupure
   * silencieuse des synthèses vocales cloud (Chrome/Android/Edge) sur les longs textes.
   */
  function splitIntoSpeechChunks(text, maxLen = 220) {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (!clean) return [];
    if (clean.length <= maxLen) return [clean];

    const sentences = clean.split(/(?<=[.!?…»])\s+/);
    const chunks = [];
    let buffer = '';

    const pushSegment = (segment) => {
      if (segment.length <= maxLen) {
        if (!buffer) {
          buffer = segment;
        } else if (buffer.length + 1 + segment.length <= maxLen) {
          buffer += ' ' + segment;
        } else {
          chunks.push(buffer);
          buffer = segment;
        }
        return;
      }
      if (buffer) {
        chunks.push(buffer);
        buffer = '';
      }
      // Découpe secondaire sur virgules/deux-points/espaces pour les très longues phrases
      const subParts = segment.split(/(?<=[,;:])\s+/);
      for (const part of subParts) {
        if (part.length <= maxLen) {
          if (!buffer) buffer = part;
          else if (buffer.length + 1 + part.length <= maxLen) buffer += ' ' + part;
          else {
            chunks.push(buffer);
            buffer = part;
          }
        } else {
          if (buffer) {
            chunks.push(buffer);
            buffer = '';
          }
          const words = part.split(/\s+/);
          for (const word of words) {
            if (!buffer) buffer = word;
            else if (buffer.length + 1 + word.length <= maxLen) buffer += ' ' + word;
            else {
              chunks.push(buffer);
              buffer = word;
            }
          }
        }
      }
    };

    for (const sentence of sentences) {
      pushSegment(sentence);
    }
    if (buffer) chunks.push(buffer);
    return chunks.length > 0 ? chunks : [clean];
  }

  function getSavedRate() {
    try {
      return localStorage.getItem(STORAGE_RATE_KEY);
    } catch (_) {
      return null;
    }
  }

  function saveRate(val) {
    try {
      localStorage.setItem(STORAGE_RATE_KEY, String(val));
    } catch (_) {}
  }

  function getSavedVoice() {
    try {
      return localStorage.getItem(STORAGE_VOICE_KEY);
    } catch (_) {
      return null;
    }
  }

  function saveVoice(name) {
    try {
      localStorage.setItem(STORAGE_VOICE_KEY, name);
    } catch (_) {}
  }

  function loadVoices() {
    if (!synth) return;
    const voices = synth.getVoices();
    const frVoices = voices.filter(v => v.lang.startsWith('fr') || v.lang.includes('FR'));

    frVoices.sort((a, b) => {
      const isHD_A = a.name.includes('Natural') || a.name.includes('Neural') || a.name.includes('Google') || a.name.includes('Premium');
      const isHD_B = b.name.includes('Natural') || b.name.includes('Neural') || b.name.includes('Google') || b.name.includes('Premium');
      return (isHD_B ? 1 : 0) - (isHD_A ? 1 : 0);
    });

    const select = document.getElementById('voice-select');
    const savedVoiceName = getSavedVoice();

    if (select) {
      select.innerHTML = '';
      frVoices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        const isHD = v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Premium');
        opt.textContent = `${isHD ? '✨ ' : ''}${v.name.replace(/Microsoft |Google |fr-FR/g, '').trim()}`;
        select.appendChild(opt);
      });
    }

    if (frVoices.length > 0) {
      const stillAvailable = selectedVoice && frVoices.find(v => v.name === selectedVoice.name);
      const savedMatch = savedVoiceName && frVoices.find(v => v.name === savedVoiceName);
      selectedVoice = stillAvailable || savedMatch || frVoices[0];
      if (select && selectedVoice) {
        select.value = selectedVoice.name;
      }
    }
  }

  function onVoiceChange() {
    const select = document.getElementById('voice-select');
    if (!select || !synth) return;
    const voiceName = select.value;
    selectedVoice = synth.getVoices().find(v => v.name === voiceName) || selectedVoice;
    if (selectedVoice) saveVoice(selectedVoice.name);
    if (isPlaying && !isPaused) {
      readCurrentParagraph(currentChunkIndex);
    }
  }

  function updateProgressUI() {
    const progText = document.getElementById('audio-progress');
    const bar = document.getElementById('narrator-progress-bar');
    const visualizer = document.getElementById('narrator-visualizer');

    if (progText) {
      const shownIdx = paragraphs.length ? (isPlaying || isPaused || currentIndex > 0 ? currentIndex + 1 : 0) : 0;
      progText.textContent = `Paragraphe ${shownIdx} / ${paragraphs.length}`;
    }
    if (bar) {
      const pct = paragraphs.length && (isPlaying || isPaused || currentIndex > 0)
        ? ((currentIndex + 1) / paragraphs.length) * 100
        : 0;
      bar.style.width = `${pct}%`;
    }
    if (visualizer) {
      if (isPlaying && !isPaused) {
        visualizer.classList.add('scale-110', 'bg-amber-600', 'text-black', 'animate-pulse');
        visualizer.classList.remove('bg-amber-950/90', 'text-amber-300');
      } else {
        visualizer.classList.remove('scale-110', 'bg-amber-600', 'text-black', 'animate-pulse');
        visualizer.classList.add('bg-amber-950/90', 'text-amber-300');
      }
    }
  }

  function highlightParagraph(idx) {
    document.querySelectorAll('#story-content .reading-active').forEach(el => {
      el.classList.remove('reading-active');
    });
    const target = paragraphs[idx];
    if (target) {
      target.classList.add('reading-active');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function updatePlayButton() {
    const btnPlay = document.getElementById('btn-play');
    const icon = document.getElementById('play-icon');
    const text = document.getElementById('play-text');

    if (isMultiVersionMode()) {
      if (btnPlay) {
        btnPlay.classList.toggle('bg-amber-500', isPlaying && !isPaused);
      }
      return;
    }

    if (isPlaying && !isPaused) {
      if (icon) icon.textContent = '⏸';
      if (text) text.textContent = 'Pause';
    } else if (isPaused) {
      if (icon) icon.textContent = '▶';
      if (text) text.textContent = 'Reprendre';
    } else {
      if (icon) icon.textContent = '▶';
      if (text) text.textContent = 'Écouter le Récit';
    }
  }

  function finishNarration() {
    speakGeneration++;
    if (synth) synth.cancel();
    isPlaying = false;
    isPaused = false;
    currentIndex = 0;
    currentChunkIndex = 0;
    currentChunks = [];
    document.querySelectorAll('#story-content .reading-active').forEach(el => {
      el.classList.remove('reading-active');
    });
    const statusEl = document.getElementById('audio-status');
    updatePlayButton();
    updateProgressUI();

    const nextHref = getNextScenarioHref();
    if (isContinuousEnabled() && nextHref) {
      clearContinuousCountdown();
      let remaining = 3;
      const curAct = getCurrentScenarioActNumber();
      if (statusEl) statusEl.textContent = `Fin de l'Acte ${curAct} — Acte ${curAct + 1} dans ${remaining}s… (⏹ pour annuler)`;
      continuousTimerId = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          clearContinuousCountdown();
          try { sessionStorage.setItem(SESSION_AUTOPLAY_KEY, '1'); } catch (_) {}
          window.location.href = nextHref;
        } else if (statusEl) {
          statusEl.textContent = `Fin de l'Acte ${curAct} — Acte ${curAct + 1} dans ${remaining}s… (⏹ pour annuler)`;
        }
      }, 1000);
      return;
    }

    if (statusEl) statusEl.textContent = 'Lecture terminée';
  }

  function speakCurrentChunk(gen) {
    if (!synth || gen !== speakGeneration || !isPlaying || isPaused) return;
    if (currentChunkIndex >= currentChunks.length) {
      currentIndex++;
      if (currentIndex < paragraphs.length) {
        setTimeout(() => {
          if (gen === speakGeneration && isPlaying && !isPaused) {
            readCurrentParagraph(0);
          }
        }, 220);
      } else {
        finishNarration();
      }
      return;
    }

    const chunkText = currentChunks[currentChunkIndex];
    const u = new SpeechSynthesisUtterance(chunkText);
    u.lang = 'fr-FR';
    u.rate = parseFloat(document.getElementById('audio-rate')?.value || '1.0');
    u.pitch = 0.96;
    if (selectedVoice) u.voice = selectedVoice;

    u.onend = () => {
      if (gen !== speakGeneration || !isPlaying || isPaused) return;
      currentChunkIndex++;
      speakCurrentChunk(gen);
    };

    u.onerror = (ev) => {
      if (gen !== speakGeneration) return;
      if (ev && (ev.error === 'interrupted' || ev.error === 'canceled')) return;
      isPlaying = false;
      isPaused = false;
      const statusEl = document.getElementById('audio-status');
      if (statusEl) statusEl.textContent = 'Erreur ou interruption';
      updatePlayButton();
      updateProgressUI();
    };

    synth.speak(u);
  }

  function readCurrentParagraph(startChunk = 0) {
    if (!synth) return;
    collectParagraphs();
    if (paragraphs.length === 0) {
      stopAudio();
      return;
    }
    if (currentIndex >= paragraphs.length) {
      finishNarration();
      return;
    }

    speakGeneration++;
    const gen = speakGeneration;
    synth.cancel();

    const p = paragraphs[currentIndex];
    highlightParagraph(currentIndex);
    updateProgressUI();

    currentChunks = splitIntoSpeechChunks(p.textContent);
    currentChunkIndex = Math.min(startChunk, Math.max(0, currentChunks.length - 1));
    speakCurrentChunk(gen);
  }

  function setStatus(text) {
    const statusEl = document.getElementById('audio-status');
    if (statusEl) statusEl.textContent = text;
  }

  // ===========================================================================
  // MODE 1 : LECTEUR PARAGRAPHE PAR PARAGRAPHE (ACTES 1, 4 À 10)
  // ===========================================================================
  function initParagraphNarrator() {
    collectParagraphs();
    updateProgressUI();
    updatePlayButton();
    loadVoices();
  }

  function togglePlay() {
    if (!synth) {
      alert("La synthèse vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (isPlaying && !isPaused) {
      synth.pause();
      isPaused = true;
      setStatus('Lecture en pause');
    } else if (isPlaying && isPaused) {
      isPaused = false;
      if (synth.paused) {
        synth.resume();
      } else {
        readCurrentParagraph(currentChunkIndex);
      }
      setStatus('Lecture vocale en cours...');
    } else {
      isPlaying = true;
      isPaused = false;
      setStatus('Lecture vocale en cours...');
      readCurrentParagraph(0);
    }
    updatePlayButton();
    updateProgressUI();
  }

  function nextParagraph() {
    collectParagraphs();
    if (currentIndex < paragraphs.length - 1) {
      currentIndex++;
      currentChunkIndex = 0;
      if (isPlaying && !isPaused) {
        readCurrentParagraph(0);
      } else {
        if (synth) {
          speakGeneration++;
          synth.cancel();
        }
        highlightParagraph(currentIndex);
        updateProgressUI();
      }
    }
  }

  function prevParagraph() {
    collectParagraphs();
    if (currentIndex > 0) {
      currentIndex--;
      currentChunkIndex = 0;
      if (isPlaying && !isPaused) {
        readCurrentParagraph(0);
      } else {
        if (synth) {
          speakGeneration++;
          synth.cancel();
        }
        highlightParagraph(currentIndex);
        updateProgressUI();
      }
    }
  }

  // ===========================================================================
  // MODE 2 : LECTEUR MULTI-VERSIONS À ONGLETS (ACTES 2 & 3)
  // ===========================================================================
  function switchVersion(ver) {
    stopAudio();
    activeVersion = ver;

    document.querySelectorAll('.version-block').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const targetContent = document.getElementById(`content-${ver}`);
    const targetTab = document.getElementById(`tab-${ver}`);
    if (targetContent) targetContent.classList.remove('hidden');
    if (targetTab) targetTab.classList.add('active');

    collectParagraphs();

    const hasV3 = !!document.getElementById('content-v3');
    const names = hasV3
      ? {
          v1: 'Okado Hiruma (Clan du Crabe)',
          v2: 'Tsuruchi Akira (Enquête détaillée)',
          v3: 'Hida Samui (5 Chapitres)'
        }
      : {
          v1: 'Ryûmitaka Isawa (Trafic à Shinjo Kyuden)',
          v2: 'Tsuruchi Akira (Récit complet)'
        };

    const detailEl = document.getElementById('audio-detail');
    if (detailEl && names[ver]) {
      detailEl.textContent = `Chronique active : ${names[ver]}`;
    }
  }

  function playVersionAudio() {
    if (!synth) {
      alert("La synthèse vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (isPlaying && isPaused) {
      isPaused = false;
      setStatus('Lecture vocale en cours...');
      if (synth.paused) {
        synth.resume();
      } else {
        readCurrentParagraph(currentChunkIndex);
      }
      updatePlayButton();
      return;
    }

    if (isPlaying && !isPaused) return;

    collectParagraphs();
    currentIndex = 0;
    currentChunkIndex = 0;
    isPlaying = true;
    isPaused = false;
    setStatus('Lecture vocale en cours...');
    updatePlayButton();
    readCurrentParagraph(0);
  }

  function pauseVersionAudio() {
    if (!synth) return;
    if (isPlaying && !isPaused) {
      synth.pause();
      isPaused = true;
      setStatus('Lecture en pause');
      updatePlayButton();
    }
  }

  function stopAudio() {
    clearContinuousCountdown();
    speakGeneration++;
    if (synth) synth.cancel();
    isPlaying = false;
    isPaused = false;
    currentIndex = 0;
    currentChunkIndex = 0;
    currentChunks = [];
    document.querySelectorAll('#story-content .reading-active').forEach(el => {
      el.classList.remove('reading-active');
    });
    setStatus('Voix Narrative Prête');
    updatePlayButton();
    updateProgressUI();
  }

  function formatPodcastTime(totalSeconds) {
    const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function resolvePodcastEntry(manifest, actNum) {
    if (!manifest || !manifest.episodes || !actNum) return null;
    const entry = manifest.episodes[String(actNum)];
    if (!entry || !entry.file) return null;
    return entry;
  }

  function mountPodcastPlayer(ttsSection, actNum, entry, shouldAutoplay) {
    if (!ttsSection || document.getElementById('podcast-player-card')) return false;

    const audioSrc = entry.file.startsWith('http') || entry.file.startsWith('../')
      ? entry.file
      : `../${entry.file}`;
    const posKey = `l5r_podcast_pos_${actNum}`;
    const savedRate = parseFloat(getSavedRate() || '1.0') || 1.0;
    const nextHref = getNextScenarioHref();

    const card = document.createElement('section');
    card.id = 'podcast-player-card';
    card.className = 'card-clean rounded-xl p-4 border-amber-500/50 sticky top-16 z-30 shadow-2xl backdrop-blur-md bg-[#0e0a09]/95 space-y-3';
    card.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div id="pod-visualizer" class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/30 to-red-950 border border-amber-500/50 flex items-center justify-center text-amber-300 text-lg shrink-0">
            🎙️
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2 py-0.5 rounded bg-amber-600/20 border border-amber-500/50 text-amber-300 text-[9px] font-bold uppercase tracking-wider font-mono">Podcast Immersif</span>
              <span id="pod-status" class="text-xs font-bold font-imperial text-amber-100 truncate">Prêt à l'écoute</span>
            </div>
            <div class="text-[10px] text-stone-400 font-mono">
              <span id="pod-time-cur">00:00</span> / <span id="pod-time-tot">${formatPodcastTime(entry.durationSec || 0)}</span>
              <span class="hidden sm:inline text-stone-500"> • Voix neuronales multi-personnages</span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          <button type="button" id="pod-back-15" class="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-mono font-bold transition cursor-pointer" title="Reculer de 15 secondes">⏪ -15s</button>
          <button type="button" id="pod-play-btn" class="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-black font-extrabold font-imperial text-xs tracking-wider transition flex items-center gap-1.5 shadow cursor-pointer">
            <span id="pod-play-icon">▶</span> <span id="pod-play-text">Écouter le Podcast</span>
          </button>
          <button type="button" id="pod-fwd-15" class="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-mono font-bold transition cursor-pointer" title="Avancer de 15 secondes">+15s ⏩</button>
          <button type="button" id="pod-stop-btn" class="px-2.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-bold transition cursor-pointer" title="Arrêter et revenir au début">⏹</button>
        </div>

        <div class="flex flex-wrap items-center gap-1.5 text-xs">
          <select id="pod-rate" class="bg-black/70 border border-stone-700 rounded px-2 py-1 text-amber-300 text-xs font-mono" title="Vitesse de lecture">
            <option value="0.85">0.85x</option>
            <option value="1.0" selected>1.0x</option>
            <option value="1.15">1.15x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
          ${nextHref ? `<button type="button" id="pod-continuous-btn" class="px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer"></button>` : ''}
          <a href="${audioSrc}" download="Chroniques-Rokugan-Acte-${actNum}.mp3" class="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-amber-300 text-[11px] font-bold transition" title="Télécharger l'épisode MP3">⬇ MP3</a>
          <button type="button" id="pod-switch-tts" class="px-2 py-1 rounded bg-black/50 hover:bg-stone-900 border border-stone-800 text-stone-500 hover:text-stone-200 text-[10px] cursor-pointer transition" title="Basculer vers l'ancien lecteur synthèse vocale">🗣️ Synthèse</button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <input type="range" id="pod-seek" min="0" max="100" value="0" step="0.1" class="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer" aria-label="Progression du podcast" />
      </div>
    `;

    const audio = document.createElement('audio');
    audio.id = 'pod-audio-el';
    audio.preload = 'metadata';
    audio.src = audioSrc;
    card.appendChild(audio);

    ttsSection.parentNode.insertBefore(card, ttsSection);
    ttsSection.classList.add('hidden');

    const statusEl = card.querySelector('#pod-status');
    const curEl = card.querySelector('#pod-time-cur');
    const totEl = card.querySelector('#pod-time-tot');
    const playIcon = card.querySelector('#pod-play-icon');
    const playText = card.querySelector('#pod-play-text');
    const seekEl = card.querySelector('#pod-seek');
    const rateEl = card.querySelector('#pod-rate');
    const visEl = card.querySelector('#pod-visualizer');
    const contBtn = card.querySelector('#pod-continuous-btn');

    let podCountdown = null;
    const clearPodCountdown = () => {
      if (podCountdown) {
        clearInterval(podCountdown);
        podCountdown = null;
      }
    };

    const syncContBtn = () => {
      if (!contBtn) return;
      const active = isContinuousEnabled();
      contBtn.textContent = active ? '🔁 Continu : ON' : '🔁 Continu : OFF';
      contBtn.className = active
        ? 'px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer bg-amber-600/90 text-black border-amber-400 shadow'
        : 'px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer bg-black/60 text-stone-400 border-stone-800 hover:text-amber-300';
    };
    syncContBtn();
    if (contBtn) {
      contBtn.addEventListener('click', () => {
        setContinuousEnabled(!isContinuousEnabled());
        syncContBtn();
      });
    }

    if (rateEl) {
      const rateStr = String(savedRate);
      if (Array.from(rateEl.options).some(o => o.value === rateStr)) rateEl.value = rateStr;
      audio.playbackRate = parseFloat(rateEl.value) || 1.0;
      rateEl.addEventListener('change', () => {
        const v = parseFloat(rateEl.value) || 1.0;
        audio.playbackRate = v;
        saveRate(v);
      });
    }

    const syncPlayUI = () => {
      const playing = !audio.paused && !audio.ended;
      if (playIcon) playIcon.textContent = playing ? '⏸' : '▶';
      if (playText) playText.textContent = playing ? 'Pause' : 'Écouter le Podcast';
      if (visEl) visEl.classList.toggle('animate-pulse', playing);
    };

    audio.addEventListener('loadedmetadata', () => {
      if (totEl && isFinite(audio.duration)) totEl.textContent = formatPodcastTime(audio.duration);
      try {
        const savedPos = parseFloat(localStorage.getItem(posKey) || '0');
        if (savedPos > 3 && isFinite(audio.duration) && savedPos < audio.duration - 5) {
          audio.currentTime = savedPos;
          if (statusEl) statusEl.textContent = `Reprise à ${formatPodcastTime(savedPos)}`;
        }
      } catch (_) {}
    });

    let lastSavedSec = 0;
    audio.addEventListener('timeupdate', () => {
      if (curEl) curEl.textContent = formatPodcastTime(audio.currentTime);
      if (isFinite(audio.duration) && audio.duration > 0 && seekEl) {
        seekEl.value = String((audio.currentTime / audio.duration) * 100);
      }
      if (Math.abs(audio.currentTime - lastSavedSec) >= 3) {
        lastSavedSec = audio.currentTime;
        try { localStorage.setItem(posKey, String(Math.floor(audio.currentTime))); } catch (_) {}
      }
    });

    audio.addEventListener('play', () => {
      clearPodCountdown();
      if (statusEl) statusEl.textContent = 'Écoute en cours…';
      syncPlayUI();
    });
    audio.addEventListener('pause', () => {
      if (!audio.ended && statusEl) statusEl.textContent = 'En pause';
      syncPlayUI();
    });
    audio.addEventListener('ended', () => {
      try { localStorage.removeItem(posKey); } catch (_) {}
      syncPlayUI();
      if (isContinuousEnabled() && nextHref) {
        clearPodCountdown();
        let rem = 3;
        if (statusEl) statusEl.textContent = `Fin Acte ${actNum} — Acte ${actNum + 1} dans ${rem}s… (⏹ annuler)`;
        podCountdown = setInterval(() => {
          rem--;
          if (rem <= 0) {
            clearPodCountdown();
            try { sessionStorage.setItem(SESSION_AUTOPLAY_KEY, '1'); } catch (_) {}
            window.location.href = nextHref;
          } else if (statusEl) {
            statusEl.textContent = `Fin Acte ${actNum} — Acte ${actNum + 1} dans ${rem}s… (⏹ annuler)`;
          }
        }, 1000);
      } else if (statusEl) {
        statusEl.textContent = 'Épisode terminé';
      }
    });

    audio.addEventListener('error', () => {
      // Si le MP3 est indisponible, bascule proprement sur le lecteur synthèse vocale
      card.remove();
      ttsSection.classList.remove('hidden');
    });

    card.querySelector('#pod-play-btn')?.addEventListener('click', () => {
      clearPodCountdown();
      if (audio.paused) {
        audio.play().catch(() => {
          if (statusEl) statusEl.textContent = 'Cliquez sur ▶ pour démarrer';
        });
      } else {
        audio.pause();
      }
    });
    card.querySelector('#pod-back-15')?.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 15);
    });
    card.querySelector('#pod-fwd-15')?.addEventListener('click', () => {
      if (isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
    });
    card.querySelector('#pod-stop-btn')?.addEventListener('click', () => {
      clearPodCountdown();
      audio.pause();
      audio.currentTime = 0;
      try { localStorage.removeItem(posKey); } catch (_) {}
      if (statusEl) statusEl.textContent = 'Prêt à l\'écoute';
      syncPlayUI();
    });
    if (seekEl) {
      seekEl.addEventListener('input', () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
          audio.currentTime = (parseFloat(seekEl.value) / 100) * audio.duration;
        }
      });
    }
    card.querySelector('#pod-switch-tts')?.addEventListener('click', () => {
      clearPodCountdown();
      audio.pause();
      card.classList.add('hidden');
      ttsSection.classList.remove('hidden');
      if (!ttsSection.querySelector('#btn-back-to-podcast')) {
        const backBtn = document.createElement('button');
        backBtn.id = 'btn-back-to-podcast';
        backBtn.type = 'button';
        backBtn.className = 'px-2.5 py-1 rounded bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/50 text-amber-300 text-[11px] font-bold cursor-pointer transition';
        backBtn.textContent = '🎙️ Revenir au Podcast';
        backBtn.addEventListener('click', () => {
          stopAudio();
          ttsSection.classList.add('hidden');
          card.classList.remove('hidden');
        });
        const rateParent = ttsSection.querySelector('#audio-rate')?.parentElement;
        if (rateParent) rateParent.appendChild(backBtn);
      }
    });

    if (shouldAutoplay) {
      audio.play().catch(() => {
        if (statusEl) statusEl.textContent = 'Prêt — cliquez ▶ pour lancer le Podcast';
      });
    }

    return true;
  }

  // Exposition globale pour les attributs onclick HTML
  if (typeof window !== 'undefined') {
    window.togglePlay = togglePlay;
    window.stopAudio = stopAudio;
    window.nextParagraph = nextParagraph;
    window.prevParagraph = prevParagraph;
    window.onVoiceChange = onVoiceChange;
    window.switchVersion = switchVersion;
    window.readText = playVersionAudio;
    window.formatPodcastTime = formatPodcastTime;
    window.resolvePodcastEntry = resolvePodcastEntry;

    window.addEventListener('DOMContentLoaded', () => {
      const rateEl = document.getElementById('audio-rate');
      if (rateEl) {
        const savedRate = getSavedRate();
        if (savedRate && Array.from(rateEl.options).some(o => o.value === savedRate)) {
          rateEl.value = savedRate;
        }
        rateEl.addEventListener('change', () => {
          saveRate(rateEl.value);
          if (isPlaying && !isPaused) {
            readCurrentParagraph(currentChunkIndex);
          }
        });
      }

      const btnPlay = document.getElementById('btn-play');
      const btnPause = document.getElementById('btn-pause');
      const btnStop = document.getElementById('btn-stop');

      if (isMultiVersionMode() && btnPlay && btnPause && btnStop) {
        btnPlay.addEventListener('click', playVersionAudio);
        btnPause.addEventListener('click', pauseVersionAudio);
        btnStop.addEventListener('click', stopAudio);
        collectParagraphs();
      } else if (document.getElementById('story-content')) {
        initParagraphNarrator();
      }

      if (synth) {
        loadVoices();
        synth.onvoiceschanged = loadVoices;
      }

      const curAct = getCurrentScenarioActNumber();
      if (curAct) {
        try { localStorage.setItem(STORAGE_LAST_ACT_KEY, String(curAct)); } catch (_) {}
        injectContinuousToggle();

        let shouldAutoplay = false;
        try {
          shouldAutoplay = sessionStorage.getItem(SESSION_AUTOPLAY_KEY) === '1';
          if (shouldAutoplay) sessionStorage.removeItem(SESSION_AUTOPLAY_KEY);
        } catch (_) {}

        const ttsSection = document.getElementById('audio-status')?.closest('section');
        const launchTtsAutoplay = () => {
          if (shouldAutoplay && synth) {
            setTimeout(() => {
              if (isMultiVersionMode()) playVersionAudio();
              else togglePlay();
            }, 350);
          }
        };

        if (ttsSection && typeof fetch === 'function') {
          fetch('../data/podcasts-manifest.json', { cache: 'no-cache' })
            .then(r => (r.ok ? r.json() : null))
            .then(manifest => {
              const entry = resolvePodcastEntry(manifest, curAct);
              if (entry) {
                mountPodcastPlayer(ttsSection, curAct, entry, shouldAutoplay);
              } else {
                launchTtsAutoplay();
              }
            })
            .catch(() => launchTtsAutoplay());
        } else {
          launchTtsAutoplay();
        }
      }
    });

    window.addEventListener('pagehide', () => {
      if (synth && (isPlaying || synth.speaking)) {
        speakGeneration++;
        synth.cancel();
      }
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      formatPodcastTime,
      resolvePodcastEntry,
      splitIntoSpeechChunks
    };
  }
})();
