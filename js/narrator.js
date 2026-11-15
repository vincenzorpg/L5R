// =============================================================================
// MOTEUR VOCAL NARRATEUR & SÉLECTEUR DE CHRONIQUES (CAMPAGNE L5R)
// Compatible avec les récits paragraphe par paragraphe (Actes 1, 4 à 10)
// et les récits multi-versions à onglets (Actes 2 et 3).
// =============================================================================

(function () {
  const synth = window.speechSynthesis;
  let paragraphs = [];
  let currentIndex = 0;
  let isPlaying = false;
  let selectedVoice = null;
  let activeVersion = 'v1';
  let utterance = null;

  // ===========================================================================
  // MODE 1 : LECTEUR PARAGRAPHE PAR PARAGRAPHE AVEC SÉLECTION DE VOIX HD
  // ===========================================================================
  function initParagraphNarrator() {
    const container = document.getElementById('story-content');
    if (!container) return;

    paragraphs = Array.from(container.querySelectorAll('p')).filter(p => p.textContent.trim().length > 0);
    updateProgressUI();
    loadVoices();
  }

  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = synth.getVoices();
    const frVoices = voices.filter(v => v.lang.startsWith('fr') || v.lang.includes('FR'));
    const select = document.getElementById('voice-select');
    if (!select) return;
    select.innerHTML = "";

    frVoices.sort((a, b) => {
      const isHD_A = a.name.includes("Natural") || a.name.includes("Neural") || a.name.includes("Google") || a.name.includes("Premium");
      const isHD_B = b.name.includes("Natural") || b.name.includes("Neural") || b.name.includes("Google") || b.name.includes("Premium");
      return (isHD_B ? 1 : 0) - (isHD_A ? 1 : 0);
    });

    frVoices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      const isHD = v.name.includes("Natural") || v.name.includes("Neural") || v.name.includes("Google");
      opt.textContent = `${isHD ? '✨ ' : ''}${v.name.replace(/Microsoft |Google |fr-FR/g, '').trim()}`;
      select.appendChild(opt);
    });

    if (frVoices.length > 0) {
      selectedVoice = frVoices[0];
      select.value = selectedVoice.name;
    }
  }

  function onVoiceChange() {
    const select = document.getElementById('voice-select');
    if (!select || !synth) return;
    const voiceName = select.value;
    selectedVoice = synth.getVoices().find(v => v.name === voiceName);
    if (isPlaying) {
      readCurrentParagraph();
    }
  }

  function updateProgressUI() {
    const progText = document.getElementById('audio-progress');
    const bar = document.getElementById('narrator-progress-bar');
    const visualizer = document.getElementById('narrator-visualizer');

    if (progText) {
      progText.textContent = `Paragraphe ${paragraphs.length ? currentIndex + 1 : 0} / ${paragraphs.length}`;
    }
    if (bar && paragraphs.length) {
      const pct = ((currentIndex + 1) / paragraphs.length) * 100;
      bar.style.width = `${pct}%`;
    }
    if (visualizer) {
      if (isPlaying) {
        visualizer.classList.add('scale-110', 'bg-amber-600', 'text-black', 'animate-pulse');
        visualizer.classList.remove('bg-amber-950/90', 'text-amber-300');
      } else {
        visualizer.classList.remove('scale-110', 'bg-amber-600', 'text-black', 'animate-pulse');
        visualizer.classList.add('bg-amber-950/90', 'text-amber-300');
      }
    }
  }

  function highlightParagraph(idx) {
    paragraphs.forEach((p, i) => {
      if (i === idx) {
        p.classList.add('reading-active');
        p.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        p.classList.remove('reading-active');
      }
    });
  }

  function readCurrentParagraph() {
    if (!synth) return;
    synth.cancel();
    if (currentIndex >= paragraphs.length) {
      stopAudio();
      return;
    }

    const p = paragraphs[currentIndex];
    highlightParagraph(currentIndex);
    updateProgressUI();

    const u = new SpeechSynthesisUtterance(p.textContent.trim());
    u.lang = 'fr-FR';
    u.rate = parseFloat(document.getElementById('audio-rate')?.value || 1.0);
    u.pitch = 0.95;

    if (selectedVoice) u.voice = selectedVoice;

    u.onend = () => {
      if (isPlaying) {
        currentIndex++;
        if (currentIndex < paragraphs.length) {
          setTimeout(readCurrentParagraph, 300);
        } else {
          stopAudio();
        }
      }
    };

    u.onerror = () => {
      isPlaying = false;
      updatePlayButton();
    };

    synth.speak(u);
  }

  function togglePlay() {
    if (!synth) return;
    const statusEl = document.getElementById('audio-status');
    if (isPlaying) {
      synth.pause();
      isPlaying = false;
      if (statusEl) statusEl.textContent = "Lecture en pause";
    } else {
      if (synth.paused) {
        synth.resume();
      } else {
        readCurrentParagraph();
      }
      isPlaying = true;
      if (statusEl) statusEl.textContent = "Lecture vocale en cours...";
    }
    updatePlayButton();
    updateProgressUI();
  }

  function updatePlayButton() {
    const icon = document.getElementById('play-icon');
    const text = document.getElementById('play-text');
    if (isPlaying) {
      if (icon) icon.textContent = "⏸";
      if (text) text.textContent = "Pause";
    } else {
      if (icon) icon.textContent = "▶";
      if (text) text.textContent = "Reprendre";
    }
  }

  function nextParagraph() {
    if (currentIndex < paragraphs.length - 1) {
      currentIndex++;
      if (isPlaying) readCurrentParagraph();
      else {
        highlightParagraph(currentIndex);
        updateProgressUI();
      }
    }
  }

  function prevParagraph() {
    if (currentIndex > 0) {
      currentIndex--;
      if (isPlaying) readCurrentParagraph();
      else {
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

    const hasV3 = !!document.getElementById('content-v3');
    const names = hasV3
      ? {
          v1: "Okado Hiruma (Clan du Crabe)",
          v2: "Tsuruchi Akira (Enquête détaillée)",
          v3: "Hida Samui (5 Chapitres)"
        }
      : {
          v1: "Ryûmitaka Isawa (Trafic à Shinjo Kyuden)",
          v2: "Tsuruchi Akira (Récit complet)"
        };

    const detailEl = document.getElementById('audio-detail');
    if (detailEl && names[ver]) {
      detailEl.textContent = `Chronique active : ${names[ver]}`;
    }
  }

  function playVersionAudio() {
    if (!('speechSynthesis' in window)) {
      alert("La synthèse vocale n'est pas supportée par votre navigateur.");
      return;
    }

    const statusEl = document.getElementById('audio-status');
    const rateEl = document.getElementById('audio-rate');
    const btnPlay = document.getElementById('btn-play');

    if (synth.paused && isPlaying) {
      synth.resume();
      if (statusEl) statusEl.textContent = "Lecture en cours...";
      return;
    }

    synth.cancel();

    const title = document.getElementById('story-title')?.textContent.trim() || "";
    const activeContainer = document.getElementById(`content-${activeVersion}`) || document.getElementById('story-content');
    const contentText = activeContainer ? activeContainer.innerText.trim() : "";
    const fullSpeechText = `${title}. ${contentText}`;

    utterance = new SpeechSynthesisUtterance(fullSpeechText);
    utterance.lang = 'fr-FR';
    utterance.rate = parseFloat(rateEl?.value || 1.0);

    const voices = synth.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr') || v.lang === 'fr_FR');
    if (frVoice) utterance.voice = frVoice;

    utterance.onstart = () => {
      isPlaying = true;
      if (statusEl) statusEl.textContent = "Lecture vocale en cours...";
      btnPlay?.classList.add('bg-amber-500');
    };

    utterance.onend = () => {
      isPlaying = false;
      if (statusEl) statusEl.textContent = "Lecture terminée";
      btnPlay?.classList.remove('bg-amber-500');
    };

    utterance.onerror = () => {
      isPlaying = false;
      if (statusEl) statusEl.textContent = "Erreur ou interruption";
      btnPlay?.classList.remove('bg-amber-500');
    };

    synth.speak(utterance);
  }

  function pauseVersionAudio() {
    const statusEl = document.getElementById('audio-status');
    if (synth && synth.speaking && !synth.paused) {
      synth.pause();
      if (statusEl) statusEl.textContent = "Lecture en pause";
    }
  }

  function stopAudio() {
    if (synth) synth.cancel();
    isPlaying = false;
    currentIndex = 0;
    paragraphs.forEach(p => p.classList.remove('reading-active'));
    const statusEl = document.getElementById('audio-status');
    if (statusEl) statusEl.textContent = "Voix Narrative Prête";
    document.getElementById('btn-play')?.classList.remove('bg-amber-500');
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
    const btnPlay = document.getElementById('btn-play');
    const btnPause = document.getElementById('btn-pause');
    const btnStop = document.getElementById('btn-stop');

    if (btnPlay && btnPause && btnStop) {
      btnPlay.addEventListener('click', playVersionAudio);
      btnPause.addEventListener('click', pauseVersionAudio);
      btnStop.addEventListener('click', stopAudio);
    }

    if ('speechSynthesis' in window) {
      if (document.getElementById('voice-select')) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        initParagraphNarrator();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {};
      }
    }
  });
})();
