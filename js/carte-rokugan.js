/**
 * js/carte-rokugan.js — Moteur interactif de la Carte de Rokugan & Itinéraire des PJs
 */
(function (globalScope) {
  'use strict';

  function normalizeText(str) {
    return String(str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function filterLocations(locations, options = {}) {
    const faction = options.faction || 'all';
    const q = normalizeText(options.query || '');
    const campaignLocIds = options.campaignLocIds || new Set();

    return (locations || []).filter((loc) => {
      if (faction === 'campaign' && !campaignLocIds.has(loc.id)) return false;
      if (faction !== 'all' && faction !== 'campaign' && loc.faction !== faction) return false;
      if (!q) return true;
      const hay = normalizeText(`${loc.name} ${loc.subtitle || ''} ${loc.kind || ''} ${loc.desc || ''}`);
      return hay.includes(q);
    });
  }

  function buildRoutePointsUpToAct(route, maxAct) {
    const fallback = (Array.isArray(route) && route.length) || 11;
    const limit = Math.max(1, Number(maxAct) || fallback);
    const segments = [];
    (route || []).forEach((act) => {
      if (act.step <= limit && Array.isArray(act.way) && act.way.length > 0) {
        segments.push({
          step: act.step,
          actLabel: act.actLabel,
          title: act.title,
          locationId: act.locationId,
          points: act.way
        });
      }
    });
    return segments;
  }

  const CLAN_TERRITORY_MONS = [
    {
      id: 'licorne',
      label: 'Licorne',
      kanji: '麒',
      x: 20,
      y: 23,
      stroke: '#f3e8ff',
      fill: 'rgba(88, 28, 135, 0.35)',
      iconPath: 'M50 22 C44 26,42 33,44 38 L34 44 L40 50 L36 68 L44 68 L47 55 L53 55 L56 68 L64 68 L60 50 L68 42 L57 38 C59 32,57 26,50 22 Z M50 15 L52 24 L48 24 Z'
    },
    {
      id: 'dragon',
      label: 'Dragon',
      kanji: '龍',
      x: 43,
      y: 17,
      stroke: '#d1fae5',
      fill: 'rgba(6, 78, 59, 0.35)',
      iconPath: 'M50 22 A28 28 0 1 1 22 50 A14 14 0 0 1 50 50 A14 14 0 0 0 78 50 A28 28 0 0 0 50 22 Z M36 42 A4 4 0 1 0 36 50 A4 4 0 1 0 36 42 Z M64 50 A4 4 0 1 0 64 58 A4 4 0 1 0 64 50 Z'
    },
    {
      id: 'phenix',
      label: 'Phénix',
      kanji: '鳳',
      x: 74,
      y: 17,
      stroke: '#ffedd5',
      fill: 'rgba(154, 52, 18, 0.35)',
      iconPath: 'M50 20 C44 28,45 36,50 42 C55 36,56 28,50 20 Z M24 34 C32 34,42 40,46 50 C36 48,28 43,24 34 Z M76 34 C72 43,64 48,54 50 C58 40,68 34,76 34 Z M34 68 C40 56,45 52,50 52 C55 52,60 56,66 68 C56 63,44 63,34 68 Z'
    },
    {
      id: 'lion',
      label: 'Lion',
      kanji: '獅',
      x: 53,
      y: 38,
      stroke: '#fef9c3',
      fill: 'rgba(133, 77, 14, 0.35)',
      iconPath: 'M50 24 L56 32 L66 30 L62 40 L70 48 L60 54 L64 66 L50 61 L36 66 L40 54 L30 48 L38 40 L34 30 L44 32 Z M44 43 A3 3 0 1 0 44 49 A3 3 0 1 0 44 43 Z M56 43 A3 3 0 1 0 56 49 A3 3 0 1 0 56 43 Z'
    },
    {
      id: 'scorpion',
      label: 'Scorpion',
      kanji: '蠍',
      x: 38,
      y: 49,
      stroke: '#fee2e2',
      fill: 'rgba(127, 29, 29, 0.35)',
      iconPath: 'M50 22 C62 22,68 30,64 38 C60 32,54 30,50 35 L50 58 C56 58,62 63,60 69 C54 66,46 66,40 69 C38 63,44 58,50 58 L50 42 C42 44,34 40,32 33 C37 36,44 36,50 35 Z'
    },
    {
      id: 'grue',
      label: 'Grue',
      kanji: '鶴',
      x: 63,
      y: 55,
      stroke: '#e0f2fe',
      fill: 'rgba(7, 89, 133, 0.35)',
      iconPath: 'M50 23 L54 36 L75 44 L58 50 L64 68 L50 57 L36 68 L42 50 L25 44 L46 36 Z'
    },
    {
      id: 'crabe',
      label: 'Crabe',
      kanji: '蟹',
      x: 26,
      y: 69,
      stroke: '#dbeafe',
      fill: 'rgba(30, 58, 138, 0.35)',
      iconPath: 'M32 34 C28 26,34 21,40 26 L44 36 C48 34,52 34,56 36 L60 26 C66 21,72 26,68 34 L62 42 C68 48,68 58,60 64 L66 70 L58 72 L54 64 L46 64 L42 72 L34 70 L40 64 C32 58,32 48,38 42 Z'
    },
    {
      id: 'mante',
      label: 'Mante',
      kanji: '螳',
      x: 75,
      y: 80,
      stroke: '#ccfbf1',
      fill: 'rgba(17, 94, 89, 0.4)',
      iconPath: 'M50 22 L54 36 L70 30 L60 44 L66 64 L50 56 L34 64 L40 44 L30 30 L46 36 Z'
    }
  ];

  function initInteractiveMap() {
    if (typeof document === 'undefined') return;
    const viewport = document.getElementById('map-viewport');
    const transformLayer = document.getElementById('map-transform-layer');
    const watermarksLayer = document.getElementById('map-clans-watermarks');
    const routeSvg = document.getElementById('map-route-svg');
    const markersLayer = document.getElementById('map-markers-layer');
    if (!viewport || !transformLayer || !routeSvg || !markersLayer) return;

    const factions = globalScope.ROKUGAN_FACTIONS || {};
    const locations = globalScope.ROKUGAN_LOCATIONS || [];
    const route = globalScope.CAMPAIGN_ROUTE || [];

    const actsByLocation = new Map();
    route.forEach((act) => {
      if (!actsByLocation.has(act.locationId)) actsByLocation.set(act.locationId, []);
      actsByLocation.get(act.locationId).push(act);
    });
    const campaignLocIds = new Set(actsByLocation.keys());

    const state = {
      scale: 1,
      tx: 0,
      ty: 0,
      showRoute: true,
      showMons: true,
      maxAct: route.length || 11,
      selectedLocId: 'otosan-uchi',
      selectedActStep: null,
      faction: 'all',
      query: '',
      activeTab: 'details'
    };

    const zoomBadge = document.getElementById('map-zoom-label');
    const searchInput = document.getElementById('map-search-input');
    const factionFilterBar = document.getElementById('map-faction-filters');
    const toggleRouteBtn = document.getElementById('btn-toggle-route');
    const toggleMonsBtn = document.getElementById('btn-toggle-clans-mon');
    const actSlider = document.getElementById('map-act-slider');
    const actBadge = document.getElementById('map-act-badge');
    const actPrevBtn = document.getElementById('btn-act-prev');
    const actNextBtn = document.getElementById('btn-act-next');
    const actAllBtn = document.getElementById('btn-act-all');
    const detailCard = document.getElementById('map-detail-card');
    const listContainer = document.getElementById('map-locations-list');
    const routeListContainer = document.getElementById('map-route-list');
    const countLabel = document.getElementById('map-visible-count');
    const tabDetailsBtn = document.getElementById('tab-btn-details');
    const tabRouteBtn = document.getElementById('tab-btn-route');
    const tabDetailsPane = document.getElementById('tab-pane-details');
    const tabRoutePane = document.getElementById('tab-pane-route');

    function clampPan() {
      if (state.scale <= 1.01) {
        state.scale = 1;
        state.tx = 0;
        state.ty = 0;
        return;
      }
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const maxX = Math.max(0, (vw * (state.scale - 1)) / 2 + 80);
      const maxY = Math.max(0, (vh * (state.scale - 1)) / 2 + 80);
      state.tx = Math.max(-maxX, Math.min(maxX, state.tx));
      state.ty = Math.max(-maxY, Math.min(maxY, state.ty));
    }

    function applyTransform(smooth = false) {
      clampPan();
      transformLayer.style.transition = smooth ? 'transform 0.28s ease-out' : 'none';
      transformLayer.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
      if (zoomBadge) {
        zoomBadge.textContent = `${Math.round(state.scale * 100)}%`;
      }
      // Keep marker visual size comfortable when zooming deeply
      const inv = 1 / Math.pow(state.scale, 0.55);
      markersLayer.style.setProperty('--pin-scale', inv.toFixed(3));
      markersLayer.classList.toggle('map-markers-zoomed', state.scale >= 1.35);
    }

    function focusOnCoords(xPct, yPct, targetScale = 1.9) {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const nextScale = Math.max(state.scale, targetScale);
      state.scale = Math.min(3.5, nextScale);
      const targetX = (0.5 - xPct / 100) * vw * state.scale;
      const targetY = (0.5 - yPct / 100) * vh * state.scale;
      state.tx = targetX;
      state.ty = targetY;
      applyTransform(true);
    }

    function switchTab(tab) {
      state.activeTab = tab;
      const isDetails = tab === 'details';
      if (tabDetailsPane) tabDetailsPane.classList.toggle('hidden', !isDetails);
      if (tabRoutePane) tabRoutePane.classList.toggle('hidden', isDetails);
      if (tabDetailsBtn) tabDetailsBtn.classList.toggle('is-active', isDetails);
      if (tabRouteBtn) tabRouteBtn.classList.toggle('is-active', !isDetails);
    }

    function renderClanWatermarks() {
      if (!watermarksLayer) return;
      if (!state.showMons) {
        watermarksLayer.innerHTML = '';
        return;
      }
      watermarksLayer.innerHTML = CLAN_TERRITORY_MONS.map((mon) => `
        <div
          class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none select-none opacity-65"
          style="left: ${mon.x}%; top: ${mon.y}%; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.8));"
        >
          <svg viewBox="0 0 100 100" class="w-11 h-11 sm:w-14 sm:h-14">
            <circle cx="50" cy="50" r="44" fill="${mon.fill}" stroke="${mon.stroke}" stroke-width="3.5" stroke-opacity="0.85" />
            <circle cx="50" cy="50" r="37" fill="none" stroke="${mon.stroke}" stroke-width="1.2" stroke-opacity="0.6" />
            <path d="${mon.iconPath}" fill="${mon.stroke}" fill-opacity="0.88" />
          </svg>
          <span class="mt-0.5 px-1.5 py-0.2 rounded bg-black/45 border border-amber-500/25 font-imperial font-bold text-[8px] sm:text-[9px] uppercase tracking-widest" style="color: ${mon.stroke};">
            ${mon.kanji} ${mon.label}
          </span>
        </div>
      `).join('');
    }

    function buildSmoothPathD(points) {
      if (!Array.isArray(points) || points.length < 2) return '';
      if (points.length === 2) {
        const [p0, p1] = points;
        const mx = (p0[0] + p1[0]) / 2;
        const my = (p0[1] + p1[1]) / 2;
        const dx = p1[0] - p0[0];
        const dy = p1[1] - p0[1];
        const cx = mx - dy * 0.1;
        const cy = my + dx * 0.1;
        return `M ${p0[0]},${p0[1]} Q ${cx.toFixed(2)},${cy.toFixed(2)} ${p1[0]},${p1[1]}`;
      }
      let d = `M ${points[0][0]},${points[0][1]}`;
      for (let i = 1; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const midX = ((curr[0] + next[0]) / 2).toFixed(2);
        const midY = ((curr[1] + next[1]) / 2).toFixed(2);
        d += ` Q ${curr[0]},${curr[1]} ${midX},${midY}`;
      }
      const last = points[points.length - 1];
      d += ` L ${last[0]},${last[1]}`;
      return d;
    }

    function renderRouteSvg() {
      if (!state.showRoute) {
        routeSvg.innerHTML = '';
        return;
      }

      const segments = buildRoutePointsUpToAct(route, state.maxAct);
      const activeStep = state.selectedActStep || state.maxAct;
      const defs = `
        <defs>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.35" flood-color="#000000" flood-opacity="0.95" />
          </filter>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto-start-reverse">
            <path d="M 1 1 L 9 5 L 1 9 z" fill="#fde047" />
          </marker>
        </defs>
      `;

      const pathsHtml = segments
        .map((seg) => {
          if (seg.points.length < 2) return '';
          const dAttr = buildSmoothPathD(seg.points);
          const isCurrent = seg.step === activeStep;
          const strokeCol = isCurrent ? '#fde047' : '#f59e0b';
          const opacity = isCurrent ? '0.96' : '0.62';
          const width = isCurrent ? '0.68' : '0.42';
          const markerAttr = isCurrent ? 'marker-end="url(#routeArrow)"' : '';
          return `
            <path d="${dAttr}" fill="none" stroke="${strokeCol}" stroke-width="${width}" stroke-dasharray="1.3 0.9" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" filter="url(#routeGlow)" ${markerAttr} class="${isCurrent ? 'map-route-animated' : ''}" />
          `;
        })
        .join('');

      routeSvg.innerHTML = defs + pathsHtml;
    }

    function renderMarkers() {
      const visible = filterLocations(locations, {
        faction: state.faction,
        query: state.query,
        campaignLocIds
      });
      if (countLabel) {
        countLabel.textContent = `${visible.length} lieu(x)`;
      }

      const frag = document.createDocumentFragment();
      visible.forEach((loc) => {
        const meta = factions[loc.faction] || factions.peril;
        const acts = actsByLocation.get(loc.id) || [];
        const activeActs = acts.filter((a) => a.step <= state.maxAct);
        const isCampaignVisible = state.showRoute && activeActs.length > 0;
        const isSelected = loc.id === state.selectedLocId;
        const isLatestAct = state.showRoute && activeActs.some((a) => a.step === state.maxAct);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `map-pin group ${isSelected ? 'is-selected' : ''} ${isLatestAct ? 'is-pulse' : ''}`;
        btn.style.left = `${loc.x}%`;
        btn.style.top = `${loc.y}%`;
        btn.style.setProperty('--pin-color', meta.color);
        btn.dataset.locId = loc.id;
        btn.setAttribute('aria-label', `${loc.name} (${meta.label})`);

        const badgeNums = isCampaignVisible ? activeActs.map((a) => a.step).join('·') : '';
        const hasSpecificFilter = (state.faction !== 'all' && state.faction !== 'campaign') || Boolean(state.query);
        const showPermanentLabel = loc.id === 'otosan-uchi' || isCampaignVisible || isSelected || hasSpecificFilter;
        const labelClasses = [
          'map-pin-label',
          showPermanentLabel ? 'is-visible' : 'is-zoom-reveal'
        ].join(' ');

        btn.innerHTML = `
          <span class="map-pin-dot ${loc.major ? 'is-major' : ''}">
            ${isCampaignVisible ? `<span class="map-pin-step">${badgeNums}</span>` : `<span class="map-pin-kanji">${loc.kanji}</span>`}
          </span>
          <span class="${labelClasses}">${loc.name}</span>
        `;

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectLocation(loc.id, false);
        });
        frag.appendChild(btn);
      });

      markersLayer.innerHTML = '';
      markersLayer.appendChild(frag);
    }

    function renderDetailCard() {
      if (!detailCard) return;
      const loc = locations.find((l) => l.id === state.selectedLocId) || locations[0];
      if (!loc) return;
      const meta = factions[loc.faction] || factions.peril;
      const acts = actsByLocation.get(loc.id) || [];

      const actsHtml = acts.length > 0
        ? `
          <div class="pt-3 border-t border-stone-800/80 space-y-2">
            <div class="text-[10px] uppercase tracking-wider font-bold text-amber-400">
              🧭 Étapes de la Campagne ici (${acts.length})
            </div>
            <div class="space-y-1.5">
              ${acts
                .map(
                  (a) => `
                <a href="${a.file}" class="block p-2 rounded-lg bg-amber-950/25 hover:bg-amber-950/45 border border-amber-500/35 transition">
                  <div class="flex justify-between items-center text-[11px] font-bold text-amber-200">
                    <span>${a.actLabel} : ${a.title}</span>
                    <span>Lire →</span>
                  </div>
                  <p class="text-[10px] text-stone-300 mt-0.5 leading-snug">${a.summary}</p>
                </a>`
                )
                .join('')}
            </div>
          </div>`
        : '';

      const clanLinkHtml = meta.clanPage
        ? `<a href="${meta.clanPage}" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 hover:bg-amber-950/50 border border-amber-500/30 text-[11px] font-bold text-amber-300 transition">Encyclopédie ${meta.label} ↗</a>`
        : '';

      detailCard.innerHTML = `
        <div class="space-y-2.5">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-lg border flex items-center justify-center font-serif font-bold text-base shrink-0 ${meta.bg}">${loc.kanji}</span>
              <div>
                <h2 class="font-imperial font-bold text-sm md:text-base text-amber-200 leading-tight">${loc.name}</h2>
                <div class="text-[11px] text-stone-400">${loc.subtitle}</div>
              </div>
            </div>
            <button type="button" id="btn-focus-selected" title="Centrer la carte sur ce lieu" class="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[10px] font-bold text-amber-300 shrink-0 cursor-pointer">🎯 Centrer</button>
          </div>
          <div class="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span class="px-2 py-0.5 rounded border font-bold ${meta.bg}">${meta.label}</span>
            <span class="px-2 py-0.5 rounded bg-black/50 border border-stone-800 text-stone-300">${loc.kind}</span>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed">${loc.desc}</p>
          ${clanLinkHtml ? `<div class="pt-0.5">${clanLinkHtml}</div>` : ''}
          ${actsHtml}
        </div>
      `;

      const focusBtn = document.getElementById('btn-focus-selected');
      if (focusBtn) {
        focusBtn.addEventListener('click', () => focusOnCoords(loc.x, loc.y, 1.95));
      }
    }

    function renderLocationsList() {
      if (!listContainer) return;
      const visible = filterLocations(locations, {
        faction: state.faction,
        query: state.query,
        campaignLocIds
      });

      if (visible.length === 0) {
        listContainer.innerHTML = `<div class="p-4 text-center text-xs text-stone-500 italic">Aucun lieu ne correspond à cette recherche.</div>`;
        return;
      }

      listContainer.innerHTML = visible
        .map((loc) => {
          const meta = factions[loc.faction] || factions.peril;
          const acts = actsByLocation.get(loc.id) || [];
          const isSelected = loc.id === state.selectedLocId;
          return `
            <button type="button" data-list-loc="${loc.id}" class="w-full text-left p-2.5 rounded-lg border transition cursor-pointer flex items-center justify-between gap-2 ${
              isSelected
                ? 'bg-amber-950/40 border-amber-500/60 text-amber-100'
                : 'bg-black/40 hover:bg-stone-900/70 border-stone-800/80 text-stone-300'
            }">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-6 h-6 rounded border flex items-center justify-center font-serif font-bold text-xs shrink-0 ${meta.bg}">${loc.kanji}</span>
                <div class="min-w-0">
                  <div class="text-xs font-bold truncate">${loc.name}</div>
                  <div class="text-[10px] text-stone-400 truncate">${meta.label} • ${loc.kind}</div>
                </div>
              </div>
              ${
                acts.length > 0
                  ? `<span class="px-1.5 py-0.5 rounded bg-amber-600/20 border border-amber-500/50 text-amber-300 font-mono text-[10px] font-bold shrink-0">Acte ${acts.map((a) => a.step).join(',')}</span>`
                  : ''
              }
            </button>
          `;
        })
        .join('');

      listContainer.querySelectorAll('[data-list-loc]').forEach((btn) => {
        btn.addEventListener('click', () => {
          selectLocation(btn.dataset.listLoc, true);
        });
      });
    }

    function renderRouteList() {
      if (!routeListContainer) return;
      routeListContainer.innerHTML = route
        .map((act) => {
          const reached = act.step <= state.maxAct;
          const isCurrent = act.step === state.selectedActStep || (state.selectedActStep === null && act.step === state.maxAct);
          return `
            <div class="p-2.5 rounded-lg border transition ${
              isCurrent
                ? 'bg-amber-950/45 border-amber-500/70'
                : reached
                  ? 'bg-black/45 border-stone-800 hover:border-amber-500/40'
                  : 'bg-black/20 border-stone-900 opacity-50'
            }">
              <div class="flex items-center justify-between gap-2">
                <button type="button" data-route-step="${act.step}" class="text-left flex items-center gap-2 min-w-0 flex-1 cursor-pointer">
                  <span class="w-6 h-6 rounded-full ${reached ? 'bg-amber-600 text-black' : 'bg-stone-800 text-stone-400'} font-mono font-extrabold text-[11px] flex items-center justify-center shrink-0">${act.step}</span>
                  <div class="min-w-0">
                    <div class="text-xs font-bold text-amber-200 truncate">${act.actLabel} : ${act.title}</div>
                    <div class="text-[10px] text-amber-400/85 truncate">📍 ${act.placeLabel}</div>
                  </div>
                </button>
                <a href="${act.file}" class="px-2 py-1 rounded bg-stone-900 hover:bg-amber-900/50 border border-stone-700 text-[10px] font-bold text-amber-300 shrink-0">Récit ↗</a>
              </div>
              <p class="text-[10px] text-stone-400 mt-1.5 leading-snug">${act.summary}</p>
            </div>
          `;
        })
        .join('');

      routeListContainer.querySelectorAll('[data-route-step]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const step = Number(btn.dataset.routeStep);
          const act = route.find((a) => a.step === step);
          if (!act) return;
          state.showRoute = true;
          state.selectedActStep = step;
          if (state.maxAct < step) state.maxAct = step;
          syncRouteControls();
          selectLocation(act.locationId, true);
          renderRouteSvg();
          renderMarkers();
          renderRouteList();
        });
      });
    }

    function selectLocation(locId, shouldCenter = false) {
      state.selectedLocId = locId;
      const loc = locations.find((l) => l.id === locId);
      if (shouldCenter && loc) {
        focusOnCoords(loc.x, loc.y, 1.85);
      }
      renderMarkers();
      renderDetailCard();
      renderLocationsList();
    }

    function syncRouteControls() {
      if (actSlider) actSlider.value = String(state.maxAct);
      if (actBadge) actBadge.textContent = `Actes 1 à ${state.maxAct} / ${route.length}`;
      if (toggleRouteBtn) {
        toggleRouteBtn.textContent = state.showRoute ? '🗺️ Chemin des PJs : Visible' : '🗺️ Chemin des PJs : Masqué';
        toggleRouteBtn.classList.toggle('is-active', state.showRoute);
      }
    }

    // Bind controls
    if (toggleMonsBtn) {
      toggleMonsBtn.addEventListener('click', () => {
        state.showMons = !state.showMons;
        toggleMonsBtn.textContent = state.showMons ? '🏯 Blasons : Visible' : '🏯 Blasons : Masqué';
        toggleMonsBtn.classList.toggle('is-active', state.showMons);
        renderClanWatermarks();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.query = e.target.value || '';
        renderMarkers();
        renderLocationsList();
      });
    }

    if (factionFilterBar) {
      factionFilterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-map-faction]');
        if (!btn) return;
        state.faction = btn.dataset.mapFaction;
        factionFilterBar.querySelectorAll('[data-map-faction]').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.mapFaction === state.faction);
        });
        renderMarkers();
        renderLocationsList();
      });
    }

    if (toggleRouteBtn) {
      toggleRouteBtn.addEventListener('click', () => {
        state.showRoute = !state.showRoute;
        syncRouteControls();
        renderRouteSvg();
        renderMarkers();
      });
    }

    function setMaxAct(nextAct) {
      state.maxAct = Math.max(1, Math.min(route.length, Number(nextAct) || 1));
      state.selectedActStep = state.maxAct;
      state.showRoute = true;
      const act = route.find((a) => a.step === state.maxAct);
      syncRouteControls();
      if (act) selectLocation(act.locationId, true);
      renderRouteSvg();
      renderMarkers();
      renderRouteList();
    }

    if (actSlider) {
      actSlider.addEventListener('input', (e) => setMaxAct(e.target.value));
    }
    if (actPrevBtn) {
      actPrevBtn.addEventListener('click', () => setMaxAct(state.maxAct - 1));
    }
    if (actNextBtn) {
      actNextBtn.addEventListener('click', () => setMaxAct(state.maxAct + 1));
    }
    if (actAllBtn) {
      actAllBtn.addEventListener('click', () => {
        state.maxAct = route.length;
        state.selectedActStep = null;
        state.showRoute = true;
        state.scale = 1;
        state.tx = 0;
        state.ty = 0;
        applyTransform(true);
        syncRouteControls();
        renderRouteSvg();
        renderMarkers();
        renderRouteList();
      });
    }

    if (tabDetailsBtn) tabDetailsBtn.addEventListener('click', () => switchTab('details'));
    if (tabRouteBtn) tabRouteBtn.addEventListener('click', () => switchTab('route'));

    // Zoom & Pan Controls
    const zoomInBtn = document.getElementById('btn-zoom-in');
    const zoomOutBtn = document.getElementById('btn-zoom-out');
    const zoomResetBtn = document.getElementById('btn-zoom-reset');
    const fullscreenBtn = document.getElementById('btn-map-fullscreen');
    const mapCardContainer = document.getElementById('map-card-container');
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => { state.scale = Math.min(3.5, state.scale + 0.35); applyTransform(true); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => { state.scale = Math.max(1, state.scale - 0.35); applyTransform(true); });
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => {
        state.scale = 1; state.tx = 0; state.ty = 0;
        applyTransform(true);
      });
    }
    if (fullscreenBtn && mapCardContainer) {
      let fallbackFullscreen = false;
      const syncFsBtn = (isFs) => {
        fullscreenBtn.textContent = isFs ? '✕ Quitter plein écran' : '⛶ Plein écran';
      };
      fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
          return;
        }
        if (fallbackFullscreen) {
          fallbackFullscreen = false;
          mapCardContainer.classList.remove('fixed', 'inset-0', 'z-[90]', 'bg-[#0d0907]', 'overflow-auto', 'rounded-none');
          syncFsBtn(false);
          return;
        }
        if (typeof mapCardContainer.requestFullscreen === 'function') {
          mapCardContainer.requestFullscreen().catch(() => {
            fallbackFullscreen = true;
            mapCardContainer.classList.add('fixed', 'inset-0', 'z-[90]', 'bg-[#0d0907]', 'overflow-auto', 'rounded-none');
            syncFsBtn(true);
          });
        } else {
          fallbackFullscreen = true;
          mapCardContainer.classList.add('fixed', 'inset-0', 'z-[90]', 'bg-[#0d0907]', 'overflow-auto', 'rounded-none');
          syncFsBtn(true);
        }
      });
      document.addEventListener('fullscreenchange', () => {
        syncFsBtn(Boolean(document.fullscreenElement));
      });
    }

    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.22 : -0.22;
      const oldScale = state.scale;
      const newScale = Math.max(1, Math.min(3.5, oldScale + delta));
      if (newScale === oldScale) return;
      const rect = viewport.getBoundingClientRect();
      const ox = e.clientX - (rect.left + rect.width / 2);
      const oy = e.clientY - (rect.top + rect.height / 2);
      const ratio = newScale / oldScale;
      state.tx = ox - (ox - state.tx) * ratio;
      state.ty = oy - (oy - state.ty) * ratio;
      state.scale = newScale;
      applyTransform(false);
    }, { passive: false });

    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let startTx = 0;
    let startTy = 0;

    viewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.map-pin')) return;
      if (state.scale <= 1.01) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      startTx = state.tx;
      startTy = state.ty;
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      state.tx = startTx + (e.clientX - dragStartX);
      state.ty = startTy + (e.clientY - dragStartY);
      applyTransform(false);
    });
    viewport.addEventListener('pointerup', () => { dragging = false; });
    viewport.addEventListener('pointercancel', () => { dragging = false; });

    // Support URL param ?acte=7 or ?lieu=ryoko-owari
    renderClanWatermarks();
    const params = new URLSearchParams(window.location.search);
    const actParam = parseInt(params.get('acte') || '', 10);
    const lieuParam = params.get('lieu');
    if (actParam >= 1 && actParam <= route.length) {
      switchTab('route');
      setMaxAct(actParam);
    } else if (lieuParam && locations.some((l) => l.id === lieuParam)) {
      selectLocation(lieuParam, true);
    } else {
      syncRouteControls();
      renderRouteSvg();
      renderMarkers();
      renderDetailCard();
      renderLocationsList();
      renderRouteList();
      applyTransform(false);
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initInteractiveMap);
    } else {
      initInteractiveMap();
    }
  }

  globalScope.normalizeMapText = normalizeText;
  globalScope.filterLocations = filterLocations;
  globalScope.buildRoutePointsUpToAct = buildRoutePointsUpToAct;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { normalizeText, filterLocations, buildRoutePointsUpToAct };
  }
})(typeof window !== 'undefined' ? window : globalThis);
