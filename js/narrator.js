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

  // Exposition globale pour les attributs onclick HTML
  window.togglePlay = togglePlay;
  window.stopAudio = stopAudio;
  window.nextParagraph = nextParagraph;
  window.prevParagraph = prevParagraph;
  window.onVoiceChange = onVoiceChange;
  window.switchVersion = switchVersion;
  window.readText = playVersionAudio;

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
      if (shouldAutoplay && synth) {
        setTimeout(() => {
          if (isMultiVersionMode()) {
            playVersionAudio();
          } else {
            togglePlay();
          }
        }, 350);
      }
    }
  });

  window.addEventListener('pagehide', () => {
    if (synth && (isPlaying || synth.speaking)) {
      speakGeneration++;
      synth.cancel();
    }
  });
})();
