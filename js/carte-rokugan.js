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
    const limit = Math.max(1, Number(maxAct) || 10);
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

  function initInteractiveMap() {
    if (typeof document === 'undefined') return;
    const viewport = document.getElementById('map-viewport');
    const transformLayer = document.getElementById('map-transform-layer');
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
      maxAct: route.length || 10,
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

    function renderRouteSvg() {
      if (!state.showRoute) {
        routeSvg.innerHTML = '';
        return;
      }

      const segments = buildRoutePointsUpToAct(route, state.maxAct);
      const defs = `
        <defs>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.45" flood-color="#000000" flood-opacity="0.95" />
          </filter>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="2.8" markerHeight="2.8" orient="auto-start-reverse">
            <path d="M 1 1 L 9 5 L 1 9 z" fill="#fde047" />
          </marker>
        </defs>
      `;

      const pathsHtml = segments
        .map((seg) => {
          if (seg.points.length < 2) return '';
          const ptsAttr = seg.points.map((p) => `${p[0]},${p[1]}`).join(' ');
          const isCurrent = seg.step === state.maxAct || seg.step === state.selectedActStep;
          const strokeCol = isCurrent ? '#facc15' : '#f59e0b';
          const opacity = isCurrent ? '0.98' : '0.78';
          const width = isCurrent ? '0.75' : '0.52';
          return `
            <polyline points="${ptsAttr}" fill="none" stroke="#1c1917" stroke-width="${(Number(width) + 0.45).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.65" />
            <polyline points="${ptsAttr}" fill="none" stroke="${strokeCol}" stroke-width="${width}" stroke-dasharray="1.4 0.9" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" filter="url(#routeGlow)" marker-end="url(#routeArrow)" class="${isCurrent ? 'map-route-animated' : ''}" />
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
        const showPermanentLabel = loc.major || isCampaignVisible || isSelected;

        btn.innerHTML = `
          <span class="map-pin-dot ${loc.major ? 'is-major' : ''}">
            ${isCampaignVisible ? `<span class="map-pin-step">${badgeNums}</span>` : `<span class="map-pin-kanji">${loc.kanji}</span>`}
          </span>
          <span class="map-pin-label ${showPermanentLabel ? 'is-visible' : ''}">${loc.name}</span>
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
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => { state.scale = Math.min(3.5, state.scale + 0.35); applyTransform(true); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => { state.scale = Math.max(1, state.scale - 0.35); applyTransform(true); });
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => {
        state.scale = 1; state.tx = 0; state.ty = 0;
        applyTransform(true);
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
