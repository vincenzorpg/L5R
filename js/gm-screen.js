/**
 * js/gm-screen.js
 * Écran du Maître du Jeu — Les Chroniques de Rokugan (L5R 4e Édition)
 * - Import JSON des PJs (format Carnet de Rokugan schemaVersion: 2)
 * - Onglets MJ : Escarmouche (Initiative & Blessures), Duel Iaijutsu,
 *   Honneur & Gloire, Cour & Social, Magie / Peur / Souillure
 * - Lanceur de dés Roll & Keep intégré (via js/character-generator.js)
 */

(function (globalScope) {
  'use strict';

  const STORAGE_KEY = 'l5r_gm_screen_v1';

  const WOUND_LEVELS = [
    { key: 'healthy', label: 'Indemne', penalty: 0, color: 'emerald' },
    { key: 'nicked', label: 'Éraflure', penalty: 3, color: 'lime' },
    { key: 'grazed', label: 'Légère', penalty: 5, color: 'yellow' },
    { key: 'hurt', label: 'Moyenne', penalty: 10, color: 'amber' },
    { key: 'injured', label: 'Grave', penalty: 15, color: 'orange' },
    { key: 'crippled', label: 'Handicapante', penalty: 20, color: 'red' },
    { key: 'down', label: 'Hors de combat', penalty: null, color: 'rose' },
    { key: 'dead', label: 'Mort', penalty: null, color: 'stone' }
  ];

  const STANCES = {
    attaque: { label: 'Attaque', tnDelta: 0, note: 'Action standard' },
    assaut: { label: 'Assaut', tnDelta: -10, note: '+2g1 en attaque, -10 ND' },
    defense: { label: 'Défense', tnDelta: 5, note: '+Air+Défense au ND (approx. +5+)' },
    esquive: { label: 'Esquive', tnDelta: 10, note: '+10+ au ND, pas d\'attaque' },
    centre: { label: 'Centre', tnDelta: 0, note: 'Concentration (+1g1+Vide au tour suivant)' }
  };

  const STATUS_FLAGS = [
    { id: 'prone', label: 'À terre', desc: '-10 ND mêlée, -1g0 attaque' },
    { id: 'stunned', label: 'Étourdi', desc: 'ND = 5 + Armure, pas d\'action' },
    { id: 'blinded', label: 'Aveuglé', desc: '-3g3 attaque, -10 ND' },
    { id: 'entangled', label: 'Enchevêtré', desc: 'Mouvement bloqué' }
  ];

  const ENEMY_PRESETS = [
    { name: 'Bandit / Ronin', initiative: 14, armorTN: 15, reduction: 2, earth: 2, attack: '5g2', damage: '4g2', notes: 'Katana ou lance, moral fragile si blessé Grave.' },
    { name: 'Ashigaru', initiative: 12, armorTN: 18, reduction: 3, earth: 2, attack: '4g2', damage: '4g2', notes: 'Yari (lance), combat en formation.' },
    { name: 'Bushi Vétéran', initiative: 18, armorTN: 25, reduction: 5, earth: 3, attack: '7g3', damage: '6g2', notes: '2 attaques/tour (Rang 3), Armure lourde.' },
    { name: 'Shugenja Adversaire', initiative: 15, armorTN: 15, reduction: 0, earth: 3, attack: '5g3', damage: '4g2', notes: 'Sorts Feu/Air, garde ses distances.' },
    { name: 'Ninja / Assassin', initiative: 22, armorTN: 23, reduction: 0, earth: 2, attack: '7g4', damage: '5g2', notes: 'Furtivité, poison ou armes dissimulées.' },
    { name: 'Bakemono (Gobelin)', initiative: 13, armorTN: 15, reduction: 1, earth: 2, attack: '4g2', damage: '3g2', notes: 'Souillure 1+, fuit si isolé.' },
    { name: 'Oni Mineur', initiative: 16, armorTN: 20, reduction: 6, earth: 4, attack: '7g3', damage: '7g3', notes: 'Peur 3, Carapace, vulnérable au Jade/Cristal.' },
    { name: 'Kansen / Mort-vivant', initiative: 11, armorTN: 14, reduction: 4, earth: 3, attack: '5g2', damage: '5g2', notes: 'Ignore les malus de blessures (sauf Mort).' }
  ];

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function uid(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function clampRankTen(val) {
    return Math.max(0, Math.min(10, Math.round((Number(val) || 0) * 10) / 10));
  }

  /**
   * Calcule l'état de blessure L5R 4e Édition à partir des dégâts subis et de l'Anneau de Terre.
   */
  function computeL5RWoundState(wounds, earthRing = 2, options = {}) {
    const earth = Math.max(1, parseInt(earthRing, 10) || 2);
    const dmg = Math.max(0, parseInt(wounds, 10) || 0);
    const healthyBase = earth * 5 + (parseInt(options.healthyStepBonus, 10) || 0);
    const step = Math.max(1, earth * 2 + (parseInt(options.woundStepBonus, 10) || 0));
    const penaltyDelta = parseInt(options.woundPenaltyDelta, 10) || 0;

    const thresholds = [
      { ...WOUND_LEVELS[0], max: healthyBase },
      { ...WOUND_LEVELS[1], max: healthyBase + step * 1 },
      { ...WOUND_LEVELS[2], max: healthyBase + step * 2 },
      { ...WOUND_LEVELS[3], max: healthyBase + step * 3 },
      { ...WOUND_LEVELS[4], max: healthyBase + step * 4 },
      { ...WOUND_LEVELS[5], max: healthyBase + step * 5 },
      { ...WOUND_LEVELS[6], max: healthyBase + step * 6 },
      { ...WOUND_LEVELS[7], max: Infinity }
    ].map((lvl) => {
      if (lvl.penalty === null || lvl.penalty === 0) return lvl;
      return { ...lvl, penalty: Math.max(0, lvl.penalty + penaltyDelta) };
    });

    const maxWounds = healthyBase + step * 6;
    let currentIndex = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (dmg <= thresholds[i].max) {
        currentIndex = i;
        break;
      }
    }

    const current = thresholds[currentIndex];
    const percent = Math.min(100, Math.round((dmg / Math.max(1, maxWounds)) * 100));

    return {
      wounds: dmg,
      earth,
      healthyBase,
      step,
      maxWounds,
      levelIndex: currentIndex,
      levelKey: current.key,
      label: current.label,
      penalty: current.penalty,
      color: current.color,
      percent,
      thresholds
    };
  }

  /**
   * Normalise un JSON de personnage (Carnet de Rokugan schemaVersion: 2 ou format simplifié).
   */
  function normalizeImportedCharacter(raw) {
    if (!raw || typeof raw !== 'object') {
      throw new Error('Le fichier JSON ne contient pas un objet personnage valide.');
    }

    const t = raw.traits && typeof raw.traits === 'object' ? raw.traits : {};
    const stamina = parseInt(t.stamina ?? raw.stamina ?? 2, 10) || 2;
    const willpower = parseInt(t.willpower ?? raw.willpower ?? 2, 10) || 2;
    const strength = parseInt(t.strength ?? raw.strength ?? 2, 10) || 2;
    const perception = parseInt(t.perception ?? raw.perception ?? 2, 10) || 2;
    const reflexes = parseInt(t.reflexes ?? raw.reflexes ?? 2, 10) || 2;
    const awareness = parseInt(t.awareness ?? raw.awareness ?? 2, 10) || 2;
    const agility = parseInt(t.agility ?? raw.agility ?? 2, 10) || 2;
    const intelligence = parseInt(t.intelligence ?? raw.intelligence ?? 2, 10) || 2;

    const earth = Math.min(stamina, willpower);
    const water = Math.min(strength, perception);
    const air = Math.min(reflexes, awareness);
    const fire = Math.min(agility, intelligence);
    const voidRing = parseInt(raw.voidRing ?? raw.void ?? 2, 10) || 2;
    const voidPoints = parseInt(raw.voidPoints ?? voidRing, 10);

    const armorObj = raw.armor && typeof raw.armor === 'object' ? raw.armor : {};
    const armorBonus = parseInt(armorObj.tnBonus ?? 0, 10) || 0;
    const baseTN = reflexes * 5 + 5;
    const totalTN = parseInt(raw.armorTN ?? (baseTN + armorBonus), 10) || baseTN;
    const reduction = parseInt(armorObj.reduction ?? raw.reduction ?? 0, 10) || 0;
    const insightRank = parseInt(raw.insightRank ?? raw.rank ?? 1, 10) || 1;

    const advStr = String(raw.advantages || '');
    const disadvStr = String(raw.disadvantages || '');
    const modList = Array.isArray(raw.modifiers) ? raw.modifiers : [];
    let woundPenaltyDelta = 0;
    if (/haut seuil de douleur|high pain threshold/i.test(advStr) || modList.some((m) => /haut-seuil|high-pain/i.test(String(m.id || '')))) {
      woundPenaltyDelta -= 3;
    }
    if (/bas seuil de douleur|low pain threshold/i.test(disadvStr) || modList.some((m) => /bas-seuil|low-pain/i.test(String(m.id || '')))) {
      woundPenaltyDelta += 3;
    }

    const skills = Array.isArray(raw.skills)
      ? raw.skills
          .map((s) => ({
            name: String(s.name || '').trim(),
            rank: parseInt(s.rank ?? 0, 10) || 0,
            trait: String(s.trait || '').trim(),
            emphasis: Array.isArray(s.emphasis) ? s.emphasis.join(', ') : String(s.emphasis || '')
          }))
          .filter((s) => s.name && s.rank > 0)
          .sort((a, b) => b.rank - a.rank)
      : [];

    const weapons = Array.isArray(raw.weapons)
      ? raw.weapons.map((w) => ({
          name: String(w.name || 'Arme').trim(),
          damage: String(w.damage || w.dr || '').trim(),
          type: String(w.type || '').trim(),
          notes: String(w.notes || '').trim()
        }))
      : [];

    const spells = Array.isArray(raw.spells)
      ? raw.spells.map((sp) => (typeof sp === 'string' ? sp : String(sp.name || sp.id || ''))).filter(Boolean)
      : [];

    return {
      id: uid('pc'),
      name: String(raw.name || 'Samouraï sans nom').trim(),
      clan: String(raw.clan || 'ronin').trim(),
      family: String(raw.family || '').trim(),
      school: String(raw.school || '').trim(),
      insightRank,
      honor: raw.honor != null ? clampRankTen(raw.honor) : 4.5,
      glory: raw.glory != null ? clampRankTen(raw.glory) : 1.0,
      status: raw.status != null ? clampRankTen(raw.status) : 1.0,
      taint: raw.taint != null ? clampRankTen(raw.taint) : 0.0,
      traits: { stamina, willpower, strength, perception, reflexes, awareness, agility, intelligence },
      rings: { earth, water, air, fire, void: voidRing },
      voidMax: voidRing,
      voidCurrent: Math.max(0, Math.min(voidRing, isNaN(voidPoints) ? voidRing : voidPoints)),
      wounds: Math.max(0, parseInt(raw.wounds ?? 0, 10) || 0),
      lastInit: null,
      woundPenaltyDelta,
      armorName: String(armorObj.name || 'Aucune / Kimono').trim(),
      armorTN: totalTN,
      reduction,
      initFormula: `${insightRank + reflexes}g${reflexes}`,
      skills,
      weapons,
      spells,
      advantages: advStr,
      disadvantages: disadvStr,
      notes: String(raw.notes || '').trim(),
      gmNotes: ''
    };
  }

  /**
   * Trie les combattants par Initiative décroissante (avec départage déterministe).
   */
  function sortCombatantsByInit(combatants) {
    return [...combatants].sort((a, b) => {
      const diff = (Number(b.initiative) || 0) - (Number(a.initiative) || 0);
      if (diff !== 0) return diff;
      if (a.type !== b.type) return a.type === 'pc' ? -1 : 1;
      return String(a.name || '').localeCompare(String(b.name || ''), 'fr');
    });
  }

  /**
   * Formate un résultat de simulateRollAndKeep en listes affichables.
   */
  function formatRollResult(sim) {
    const kept = Array.isArray(sim && sim.kept) ? sim.kept : [];
    const dropped = Array.isArray(sim && sim.dropped) ? sim.dropped : [];
    const formatDie = (d) => (d && typeof d === 'object' ? `${d.value}${d.exploded ? '*' : ''}` : String(d));
    return {
      total: Number(sim && sim.total) || 0,
      keptRolls: kept.map(formatDie),
      droppedRolls: dropped.map(formatDie)
    };
  }

  // ===========================================================================
  // ÉTAT APPLICATIF & PERSISTANCE LOCALSTORAGE
  // ===========================================================================
  let state = {
    activeTab: 'skirmish',
    pcs: [],
    combat: {
      round: 1,
      activeIndex: 0,
      combatants: []
    },
    duel: {
      phase: 1,
      aName: 'Duelliste A (PJ)',
      aPcId: '',
      aIai: 3,
      aPer: 3,
      aVoid: 3,
      aAgi: 3,
      aTN: 20,
      aFocus: 0,
      aEvalRoll: null,
      aFocusRoll: null,
      aStrikeRoll: null,
      bName: 'Adversaire B',
      bIai: 3,
      bPer: 3,
      bVoid: 2,
      bAgi: 3,
      bTN: 20,
      bFocus: 0,
      bEvalRoll: null,
      bFocusRoll: null,
      bStrikeRoll: null,
      log: []
    },
    diceHistory: [],
    gmScratchpad: ''
  };

  function saveState() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Impossible de sauvegarder l\'Écran du MJ :', e);
    }
  }

  function loadState() {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        state = {
          ...state,
          activeTab: parsed.activeTab || 'skirmish',
          pcs: Array.isArray(parsed.pcs) ? parsed.pcs : [],
          combat: parsed.combat && typeof parsed.combat === 'object'
            ? {
                round: Math.max(1, parseInt(parsed.combat.round, 10) || 1),
                activeIndex: Math.max(0, parseInt(parsed.combat.activeIndex, 10) || 0),
                combatants: Array.isArray(parsed.combat.combatants) ? parsed.combat.combatants : []
              }
            : { round: 1, activeIndex: 0, combatants: [] },
          duel: parsed.duel && typeof parsed.duel === 'object' ? { ...state.duel, ...parsed.duel } : state.duel,
          diceHistory: Array.isArray(parsed.diceHistory) ? parsed.diceHistory.slice(0, 15) : [],
          gmScratchpad: String(parsed.gmScratchpad || '')
        };
      }
    } catch (e) {
      console.warn('Impossible de charger l\'Écran du MJ :', e);
    }
  }

  // ===========================================================================
  // SYNCHRONISATION PJ <-> COMBAT & LANCEUR DE DÉS
  // ===========================================================================
  function findPc(pcId) {
    return state.pcs.find((p) => p.id === pcId) || null;
  }

  function rollFormula(formulaStr, options = {}) {
    if (typeof globalScope.parseRollKeepFormula !== 'function' || typeof globalScope.simulateRollAndKeep !== 'function') {
      return null;
    }
    const parsed = globalScope.parseRollKeepFormula(formulaStr);
    if (!parsed || parsed.rolled <= 0 || parsed.kept <= 0) {
      return null;
    }
    const capped = globalScope.applyTenDiceRule(parsed.rolled, parsed.kept, parsed.bonus);
    const sim = globalScope.simulateRollAndKeep(capped.rolled, capped.kept, capped.bonus, {
      explode: true,
      spec: Boolean(options.spec)
    });
    const formatted = formatRollResult(sim);
    const labelFormula = `${capped.rolled}g${capped.kept}${capped.bonus ? (capped.bonus > 0 ? `+${capped.bonus}` : capped.bonus) : ''}`;
    return {
      formula: labelFormula,
      total: formatted.total,
      keptRolls: formatted.keptRolls,
      droppedRolls: formatted.droppedRolls
    };
  }

  function pushDiceHistory(entry) {
    if (!entry) return;
    state.diceHistory.unshift(entry);
    state.diceHistory = state.diceHistory.slice(0, 15);
    saveState();
    renderDiceHistory();
  }

  function adjustWoundsForTarget(targetType, targetId, delta) {
    if (targetType === 'pc') {
      const pc = findPc(targetId);
      if (!pc) return;
      pc.wounds = Math.max(0, (pc.wounds || 0) + delta);
    } else {
      const c = state.combat.combatants.find((item) => item.id === targetId);
      if (!c) return;
      if (c.pcId) {
        const pc = findPc(c.pcId);
        if (pc) pc.wounds = Math.max(0, (pc.wounds || 0) + delta);
      } else {
        c.wounds = Math.max(0, (c.wounds || 0) + delta);
      }
    }
    saveState();
    renderAll();
  }

  function setWoundsForTarget(targetType, targetId, value) {
    const val = Math.max(0, parseInt(value, 10) || 0);
    if (targetType === 'pc') {
      const pc = findPc(targetId);
      if (!pc) return;
      pc.wounds = val;
    } else {
      const c = state.combat.combatants.find((item) => item.id === targetId);
      if (!c) return;
      if (c.pcId) {
        const pc = findPc(c.pcId);
        if (pc) pc.wounds = val;
      } else {
        c.wounds = val;
      }
    }
    saveState();
    renderAll();
  }

  function addOrUpdatePcInCombat(pcId, initOverride) {
    const pc = findPc(pcId);
    if (!pc) return;

    let initVal = initOverride !== undefined && initOverride !== null && initOverride !== ''
      ? Number(initOverride)
      : pc.lastInit;

    if (initVal == null || isNaN(initVal)) {
      const rolled = rollFormula(pc.initFormula);
      initVal = rolled ? rolled.total : (pc.insightRank + pc.traits.reflexes) * 5;
    }
    pc.lastInit = initVal;

    const existing = state.combat.combatants.find((c) => c.pcId === pcId);
    if (existing) {
      existing.initiative = initVal;
    } else {
      state.combat.combatants.push({
        id: uid('cmb'),
        pcId: pc.id,
        type: 'pc',
        name: pc.name,
        initiative: initVal,
        armorTN: pc.armorTN,
        reduction: pc.reduction,
        earth: pc.rings.earth,
        wounds: pc.wounds,
        stance: 'attaque',
        statuses: [],
        attack: pc.weapons[0] ? pc.weapons[0].damage : '4g2',
        notes: pc.school || ''
      });
    }

    state.combat.combatants = sortCombatantsByInit(state.combat.combatants);
    saveState();
    renderAll();
  }

  function addEnemyToCombat(enemyData) {
    state.combat.combatants.push({
      id: uid('foe'),
      pcId: null,
      type: 'enemy',
      name: String(enemyData.name || 'Adversaire').trim(),
      initiative: Number(enemyData.initiative) || 12,
      armorTN: Number(enemyData.armorTN) || 15,
      reduction: Number(enemyData.reduction) || 0,
      earth: Math.max(1, parseInt(enemyData.earth, 10) || 2),
      wounds: 0,
      stance: 'attaque',
      statuses: [],
      attack: String(enemyData.attack || '5g2').trim(),
      damage: String(enemyData.damage || '4g2').trim(),
      notes: String(enemyData.notes || '').trim()
    });
    state.combat.combatants = sortCombatantsByInit(state.combat.combatants);
    saveState();
    renderCombat();
  }

  // ===========================================================================
  // RENDU INTERFACE UTILISATEUR
  // ===========================================================================
  function woundBadgeClass(color) {
    const map = {
      emerald: 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50',
      lime: 'bg-lime-950/70 text-lime-300 border-lime-600/50',
      yellow: 'bg-yellow-950/70 text-yellow-300 border-yellow-600/50',
      amber: 'bg-amber-950/70 text-amber-300 border-amber-600/50',
      orange: 'bg-orange-950/70 text-orange-300 border-orange-600/50',
      red: 'bg-red-950/80 text-red-300 border-red-600/60',
      rose: 'bg-rose-950/90 text-rose-200 border-rose-500/70',
      stone: 'bg-stone-900 text-stone-400 border-stone-600'
    };
    return map[color] || map.emerald;
  }

  function woundBarColor(color) {
    const map = {
      emerald: 'bg-emerald-500',
      lime: 'bg-lime-500',
      yellow: 'bg-yellow-500',
      amber: 'bg-amber-500',
      orange: 'bg-orange-500',
      red: 'bg-red-600',
      rose: 'bg-rose-700',
      stone: 'bg-stone-600'
    };
    return map[color] || 'bg-emerald-500';
  }

  function renderTabs() {
    document.querySelectorAll('[data-gm-tab]').forEach((btn) => {
      const tabId = btn.getAttribute('data-gm-tab');
      const isActive = tabId === state.activeTab;
      btn.classList.toggle('bg-amber-600', isActive);
      btn.classList.toggle('text-black', isActive);
      btn.classList.toggle('border-amber-400', isActive);
      btn.classList.toggle('font-bold', isActive);
      btn.classList.toggle('bg-stone-900/70', !isActive);
      btn.classList.toggle('text-stone-300', !isActive);
      btn.classList.toggle('border-stone-700', !isActive);
    });

    document.querySelectorAll('[data-gm-panel]').forEach((panel) => {
      const panelId = panel.getAttribute('data-gm-panel');
      panel.classList.toggle('hidden', panelId !== state.activeTab);
    });
  }

  function renderPcs() {
    const container = document.getElementById('gm-pcs-grid');
    const countEl = document.getElementById('gm-pc-count');
    if (countEl) countEl.textContent = String(state.pcs.length);
    if (!container) return;

    if (state.pcs.length === 0) {
      container.innerHTML = `
        <div class="col-span-full card-clean rounded-xl p-6 text-center border-dashed border-amber-500/30 space-y-2">
          <div class="text-2xl">📜</div>
          <p class="text-sm font-imperial text-amber-300">Aucun PJ importé pour le moment</p>
          <p class="text-xs text-stone-400 max-w-md mx-auto">
            Importez un ou plusieurs fichiers <code>.json</code> exportés depuis <b>La Forge</b> ou <b>Le Carnet de Rokugan</b>, ou cliquez sur <b>« Charger 2 PJs d'exemple »</b>.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = state.pcs.map((pc) => {
      const wState = computeL5RWoundState(pc.wounds, pc.rings.earth, {
        woundPenaltyDelta: pc.woundPenaltyDelta
      });
      const penaltyBadge = wState.penalty === null
        ? wState.label
        : wState.penalty === 0
          ? 'Indemne (0)'
          : `${wState.label} (+${wState.penalty})`;

      const voidDots = Array.from({ length: pc.voidMax }, (_, idx) => {
        const filled = idx < pc.voidCurrent;
        return `<button type="button" data-action="set-void" data-pc-id="${escapeHtml(pc.id)}" data-void-val="${filled && idx === pc.voidCurrent - 1 ? idx : idx + 1}" title="Points de Vide (${pc.voidCurrent}/${pc.voidMax})" class="w-4 h-4 rounded-full border transition cursor-pointer ${filled ? 'bg-purple-500 border-purple-300 shadow-sm' : 'bg-stone-900 border-stone-600 hover:border-purple-400'}"></button>`;
      }).join('');

      const topSkills = pc.skills.slice(0, 8).map((sk) =>
        `<span class="px-1.5 py-0.5 rounded bg-black/40 border border-stone-800 text-[10px] text-stone-300">${escapeHtml(sk.name)} <b class="text-amber-300">${sk.rank}</b></span>`
      ).join('');

      const weaponsHtml = pc.weapons.length > 0
        ? pc.weapons.map((w) => `<div class="text-[11px] text-stone-300">⚔️ <b>${escapeHtml(w.name)}</b> ${w.damage ? `<span class="text-amber-300 font-mono">(${escapeHtml(w.damage)})</span>` : ''}</div>`).join('')
        : '<div class="text-[11px] text-stone-500 italic">Aucune arme renseignée</div>';

      return `
        <article class="card-clean rounded-xl p-4 space-y-3 border border-amber-500/25 flex flex-col justify-between" data-pc-card="${escapeHtml(pc.id)}">
          <div class="space-y-2.5">
            <div class="flex items-start justify-between gap-2 border-b border-amber-500/20 pb-2">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-imperial font-bold text-base text-amber-300">${escapeHtml(pc.name)}</h3>
                  <span class="px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-[10px] font-bold text-amber-200">Rang ${pc.insightRank}</span>
                </div>
                <p class="text-[11px] text-stone-400">
                  ${escapeHtml(pc.clan.toUpperCase())}${pc.family ? ' • ' + escapeHtml(pc.family) : ''}${pc.school ? ' • ' + escapeHtml(pc.school) : ''}
                </p>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <button type="button" data-action="pc-to-combat" data-pc-id="${escapeHtml(pc.id)}" class="px-2 py-1 rounded bg-red-950/70 hover:bg-red-900 border border-red-600/50 text-[10px] font-imperial font-bold text-red-200 transition cursor-pointer" title="Ajouter au traqueur de combat">
                  + Combat
                </button>
                <button type="button" data-action="remove-pc" data-pc-id="${escapeHtml(pc.id)}" class="px-1.5 py-1 rounded bg-stone-900 hover:bg-red-950 border border-stone-700 text-[10px] text-stone-400 hover:text-red-300 transition cursor-pointer" title="Retirer ce PJ">
                  ✕
                </button>
              </div>
            </div>

            <div class="grid grid-cols-5 gap-1.5 text-center text-[10px]">
              <div class="p-1.5 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Terre</span><b class="text-sm text-emerald-300">${pc.rings.earth}</b></div>
              <div class="p-1.5 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Eau</span><b class="text-sm text-sky-300">${pc.rings.water}</b></div>
              <div class="p-1.5 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Air</span><b class="text-sm text-teal-300">${pc.rings.air}</b></div>
              <div class="p-1.5 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Feu</span><b class="text-sm text-orange-300">${pc.rings.fire}</b></div>
              <div class="p-1.5 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Vide</span><b class="text-sm text-purple-300">${pc.rings.void}</b></div>
            </div>

            <div class="grid grid-cols-3 gap-2 text-[11px] bg-black/30 rounded-lg p-2 border border-stone-800/80">
              <div><span class="text-stone-400">ND Armure :</span> <b class="text-amber-300">${pc.armorTN}</b> <span class="text-stone-500">(Réd. ${pc.reduction})</span></div>
              <div><span class="text-stone-400">Init :</span> <b class="text-amber-200 font-mono">${escapeHtml(pc.initFormula)}</b></div>
              <div><span class="text-stone-400">Hon / Glo :</span> <b class="text-stone-200">${pc.honor.toFixed(1)} / ${pc.glory.toFixed(1)}</b></div>
            </div>

            <div class="flex items-center justify-between text-xs bg-purple-950/20 border border-purple-800/30 rounded-lg px-2.5 py-1.5">
              <span class="text-[11px] font-imperial text-purple-300">Points de Vide (${pc.voidCurrent}/${pc.voidMax})</span>
              <div class="flex items-center gap-1.5">${voidDots}</div>
            </div>

            <div class="p-2.5 rounded-lg bg-black/40 border border-stone-800 space-y-2">
              <div class="flex items-center justify-between gap-2 text-xs">
                <span class="px-2 py-0.5 rounded border text-[11px] font-bold ${woundBadgeClass(wState.color)}">${escapeHtml(penaltyBadge)}</span>
                <span class="font-mono text-xs text-stone-300"><b>${wState.wounds}</b> / ${wState.maxWounds}</span>
              </div>
              <div class="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-stone-800">
                <div class="h-full transition-all duration-200 ${woundBarColor(wState.color)}" style="width: ${wState.percent}%"></div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-1 pt-0.5">
                <div class="flex items-center gap-1">
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="-5" class="px-1.5 py-0.5 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/50 text-[10px] text-emerald-300 cursor-pointer">-5</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="-1" class="px-1.5 py-0.5 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/50 text-[10px] text-emerald-300 cursor-pointer">-1</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="1" class="px-1.5 py-0.5 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+1</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="5" class="px-1.5 py-0.5 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+5</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="10" class="px-1.5 py-0.5 rounded bg-red-950/80 hover:bg-red-800 border border-red-600/60 text-[10px] font-bold text-red-200 cursor-pointer">+10</button>
                </div>
                <button type="button" data-action="wound-reset" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" class="px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[10px] text-stone-300 cursor-pointer">Soin 0</button>
              </div>
            </div>

            <details class="group text-xs border border-stone-800/80 rounded-lg bg-black/25">
              <summary class="px-2.5 py-1.5 cursor-pointer font-imperial text-[11px] text-amber-300/90 hover:text-amber-200 select-none flex items-center justify-between">
                <span>Rappels : Armes, Compétences & Traits marquants</span>
                <span class="text-stone-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div class="p-2.5 pt-1 space-y-2 border-t border-stone-800/60">
                <div class="space-y-0.5">${weaponsHtml}</div>
                ${topSkills ? `<div class="flex flex-wrap gap-1">${topSkills}</div>` : ''}
                ${pc.advantages ? `<div class="text-[11px] text-emerald-300/90"><b>Avantages :</b> ${escapeHtml(pc.advantages)}</div>` : ''}
                ${pc.disadvantages ? `<div class="text-[11px] text-rose-300/90"><b>Désavantages :</b> ${escapeHtml(pc.disadvantages)}</div>` : ''}
                ${pc.spells.length > 0 ? `<div class="text-[11px] text-sky-300/90"><b>Sorts :</b> ${escapeHtml(pc.spells.join(', '))}</div>` : ''}
                ${pc.notes ? `<div class="text-[11px] text-stone-400 italic"><b>Notes fiche :</b> ${escapeHtml(pc.notes)}</div>` : ''}
              </div>
            </details>

            <div>
              <textarea
                data-action="pc-gm-note"
                data-pc-id="${escapeHtml(pc.id)}"
                rows="2"
                placeholder="Notes MJ rapides (serments, sombres secrets, pistes en cours...)"
                class="w-full rounded-lg bg-[#0d0b0b] border border-stone-800 focus:border-amber-500/60 px-2.5 py-1.5 text-[11px] text-stone-200 placeholder-stone-600 focus:outline-none"
              >${escapeHtml(pc.gmNotes || '')}</textarea>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderPcInitTable() {
    const box = document.getElementById('gm-pc-init-box');
    if (!box) return;
    if (state.pcs.length === 0) {
      box.innerHTML = '<div class="text-[11px] text-stone-500 italic">Importez vos PJs ci-dessus pour saisir leurs scores d\'initiative de table.</div>';
      return;
    }

    box.innerHTML = state.pcs.map((pc) => `
      <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-stone-800 text-xs">
        <div class="min-w-0">
          <div class="font-bold text-amber-200 truncate">${escapeHtml(pc.name)}</div>
          <div class="text-[10px] text-stone-400 font-mono">Formule : ${escapeHtml(pc.initFormula)}</div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <input
            type="number"
            data-action="pc-init-input"
            data-pc-id="${escapeHtml(pc.id)}"
            value="${pc.lastInit != null ? pc.lastInit : ''}"
            placeholder="Score"
            class="w-16 text-center font-mono font-bold rounded-lg bg-[#0d0b0b] border border-amber-500/40 text-amber-300 py-1 text-xs focus:outline-none"
          />
          <button
            type="button"
            data-action="roll-pc-init"
            data-pc-id="${escapeHtml(pc.id)}"
            title="Lancer ${escapeHtml(pc.initFormula)} automatiquement"
            class="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs cursor-pointer"
          >🎲</button>
        </div>
      </div>
    `).join('');
  }

  function renderCombat() {
    renderPcInitTable();

    const listEl = document.getElementById('gm-combat-list');
    const roundEl = document.getElementById('gm-combat-round');
    const nextUpEl = document.getElementById('gm-combat-next-up');
    if (roundEl) roundEl.textContent = String(state.combat.round);
    if (!listEl) return;

    const combatants = state.combat.combatants;
    if (combatants.length === 0) {
      if (nextUpEl) nextUpEl.textContent = '';
      listEl.innerHTML = `
        <div class="p-6 text-center text-xs text-stone-400 border border-dashed border-stone-800 rounded-xl">
          Aucun combattant dans l'ordre d'initiative. Saisissez les initiatives de vos PJs ci-dessus et cliquez sur <b>« Appliquer &amp; Trier l'Ordre »</b>, ou ajoutez des adversaires.
        </div>
      `;
      return;
    }

    if (state.combat.activeIndex >= combatants.length) {
      state.combat.activeIndex = 0;
    }

    if (nextUpEl) {
      const current = combatants[state.combat.activeIndex];
      const nextIdx = (state.combat.activeIndex + 1) % combatants.length;
      const next = combatants[nextIdx];
      nextUpEl.innerHTML = `En cours : <b class="text-amber-300">#${state.combat.activeIndex + 1} ${escapeHtml(current.name)}</b>${combatants.length > 1 ? ` • Suivant : <b class="text-stone-200">#${nextIdx + 1} ${escapeHtml(next.name)}</b>` : ''}`;
    }

    listEl.innerHTML = combatants.map((c, idx) => {
      const isActive = idx === state.combat.activeIndex;
      const linkedPc = c.pcId ? findPc(c.pcId) : null;
      const wounds = linkedPc ? linkedPc.wounds : c.wounds;
      const earth = linkedPc ? linkedPc.rings.earth : c.earth;
      const penaltyDelta = linkedPc ? linkedPc.woundPenaltyDelta : 0;
      const wState = computeL5RWoundState(wounds, earth, { woundPenaltyDelta: penaltyDelta });

      const stanceInfo = STANCES[c.stance] || STANCES.attaque;
      const effectiveTN = Math.max(5, (c.armorTN || 15) + stanceInfo.tnDelta);
      const isPC = c.type === 'pc';

      const stanceOptions = Object.entries(STANCES).map(([key, st]) =>
        `<option value="${key}" ${c.stance === key ? 'selected' : ''}>${escapeHtml(st.label)}</option>`
      ).join('');

      const statusChips = STATUS_FLAGS.map((sf) => {
        const active = Array.isArray(c.statuses) && c.statuses.includes(sf.id);
        return `<button type="button" data-action="toggle-status" data-combat-id="${escapeHtml(c.id)}" data-status="${sf.id}" title="${escapeHtml(sf.desc)}" class="px-1.5 py-0.5 rounded text-[10px] border transition cursor-pointer ${active ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold' : 'bg-stone-900/60 border-stone-800 text-stone-500 hover:text-stone-300'}">${escapeHtml(sf.label)}</button>`;
      }).join('');

      const penaltyLabel = wState.penalty === null
        ? wState.label
        : wState.penalty === 0
          ? 'Indemne'
          : `${wState.label} (+${wState.penalty})`;

      return `
        <div class="rounded-xl p-3 border transition ${isActive ? 'bg-amber-950/25 border-amber-400 shadow-lg ring-1 ring-amber-400/40' : 'bg-black/35 border-stone-800'}">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-7 h-7 rounded-full flex items-center justify-center font-imperial font-bold text-xs shrink-0 ${isActive ? 'bg-amber-500 text-black' : 'bg-stone-900 border border-stone-700 text-stone-400'}">
                #${idx + 1}
              </div>
              <div class="flex flex-col items-center shrink-0">
                <input
                  type="number"
                  data-action="set-init"
                  data-combat-id="${escapeHtml(c.id)}"
                  value="${c.initiative}"
                  class="w-14 text-center font-mono font-bold text-sm rounded-lg bg-[#0d0b0b] border border-amber-500/40 text-amber-300 py-1 focus:outline-none"
                  title="Score d'Initiative"
                />
                <span class="text-[9px] text-stone-500 uppercase">Init</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  ${isActive ? '<span class="px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold text-[10px] uppercase">Tour actif</span>' : ''}
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${isPC ? 'bg-sky-950/70 text-sky-300 border-sky-700/50' : 'bg-red-950/70 text-red-300 border-red-700/50'}">${isPC ? 'PJ' : 'Adversaire'}</span>
                  <h4 class="font-imperial font-bold text-sm text-stone-100 truncate">${escapeHtml(c.name)}</h4>
                </div>
                <div class="text-[11px] text-stone-400 flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                  <span>ND Eff. : <b class="text-amber-300">${effectiveTN}</b> <span class="text-stone-500">(Base ${c.armorTN}, Réd. ${c.reduction})</span></span>
                  ${c.attack ? `<span>Att/Dég : <b class="font-mono text-stone-200">${escapeHtml(c.attack)}${c.damage ? ' / ' + escapeHtml(c.damage) : ''}</b></span>` : ''}
                  ${c.notes ? `<span class="italic text-stone-400">${escapeHtml(c.notes)}</span>` : ''}
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <select data-action="set-stance" data-combat-id="${escapeHtml(c.id)}" class="rounded-lg bg-[#0d0b0b] border border-stone-700 px-2 py-1 text-[11px] text-amber-200 focus:outline-none">
                ${stanceOptions}
              </select>

              <span class="px-2 py-0.5 rounded border text-[11px] font-bold ${woundBadgeClass(wState.color)}">
                ${escapeHtml(penaltyLabel)} (${wState.wounds}/${wState.maxWounds})
              </span>

              <div class="flex items-center gap-1">
                <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="-5" class="px-1.5 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/50 text-[10px] text-emerald-300 cursor-pointer">-5</button>
                <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="1" class="px-1.5 py-1 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+1</button>
                <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="5" class="px-1.5 py-1 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+5</button>
                <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="10" class="px-1.5 py-1 rounded bg-red-950/80 hover:bg-red-800 border border-red-600/60 text-[10px] font-bold text-red-200 cursor-pointer">+10</button>
                <button type="button" data-action="remove-combatant" data-combat-id="${escapeHtml(c.id)}" class="px-1.5 py-1 rounded bg-stone-900 hover:bg-red-950 border border-stone-700 text-[10px] text-stone-400 hover:text-red-300 cursor-pointer" title="Retirer du combat">✕</button>
              </div>
            </div>
          </div>

          <div class="mt-2 pt-2 border-t border-stone-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex-1 h-1.5 rounded-full bg-stone-900 overflow-hidden">
              <div class="h-full transition-all duration-200 ${woundBarColor(wState.color)}" style="width: ${wState.percent}%"></div>
            </div>
            <div class="flex flex-wrap items-center gap-1">${statusChips}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderDuel() {
    const d = state.duel;
    const pcSelect = document.getElementById('duel-a-pc');
    if (pcSelect) {
      const currentVal = d.aPcId || '';
      pcSelect.innerHTML = '<option value="">— Saisie manuelle —</option>' +
        state.pcs.map((p) => `<option value="${escapeHtml(p.id)}" ${currentVal === p.id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('');
    }

    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (el && document.activeElement !== el) el.value = v;
    };
    setVal('duel-a-name', d.aName);
    setVal('duel-a-iai', d.aIai);
    setVal('duel-a-per', d.aPer);
    setVal('duel-a-void', d.aVoid);
    setVal('duel-a-agi', d.aAgi);
    setVal('duel-a-tn', d.aTN);
    setVal('duel-b-name', d.bName);
    setVal('duel-b-iai', d.bIai);
    setVal('duel-b-per', d.bPer);
    setVal('duel-b-void', d.bVoid);
    setVal('duel-b-agi', d.bAgi);
    setVal('duel-b-tn', d.bTN);

    const aFocusEl = document.getElementById('duel-a-focus');
    const bFocusEl = document.getElementById('duel-b-focus');
    if (aFocusEl) aFocusEl.textContent = String(d.aFocus);
    if (bFocusEl) bFocusEl.textContent = String(d.bFocus);

    const aTnEffEl = document.getElementById('duel-a-tn-eff');
    const bTnEffEl = document.getElementById('duel-b-tn-eff');
    if (aTnEffEl) aTnEffEl.textContent = String(d.aTN + d.aFocus * 5);
    if (bTnEffEl) bTnEffEl.textContent = String(d.bTN + d.bFocus * 5);

    const logEl = document.getElementById('duel-log');
    if (logEl) {
      logEl.innerHTML = d.log.length === 0
        ? '<div class="text-[11px] text-stone-500 italic">Lancez les phases du duel ci-dessus pour suivre le déroulement.</div>'
        : d.log.map((line) => `<div class="p-2 rounded bg-black/35 border border-stone-800 text-[11px] text-stone-200">${line}</div>`).join('');
    }
  }

  function renderHonorPanel() {
    const container = document.getElementById('gm-honor-list');
    if (!container) return;

    if (state.pcs.length === 0) {
      container.innerHTML = '<div class="text-xs text-stone-400 italic p-4 border border-dashed border-stone-800 rounded-xl text-center">Importez vos PJs pour ajuster directement leur Honneur, Gloire, Statut et Souillure.</div>';
      return;
    }

    const renderMeter = (pc, field, label, colorClass) => `
      <div class="p-2.5 rounded-lg bg-black/35 border border-stone-800 space-y-1.5">
        <div class="flex items-center justify-between text-xs">
          <span class="text-stone-400">${label}</span>
          <b class="font-mono text-sm ${colorClass}">${(pc[field] || 0).toFixed(1)}</b>
        </div>
        <div class="flex items-center gap-1 justify-end">
          <button type="button" data-action="pc-meter" data-pc-id="${escapeHtml(pc.id)}" data-field="${field}" data-delta="-0.5" class="px-1.5 py-0.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-700/40 text-[10px] text-red-200 cursor-pointer">-0.5</button>
          <button type="button" data-action="pc-meter" data-pc-id="${escapeHtml(pc.id)}" data-field="${field}" data-delta="-0.1" class="px-1.5 py-0.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-700/40 text-[10px] text-red-200 cursor-pointer">-0.1</button>
          <button type="button" data-action="pc-meter" data-pc-id="${escapeHtml(pc.id)}" data-field="${field}" data-delta="0.1" class="px-1.5 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/40 text-[10px] text-emerald-200 cursor-pointer">+0.1</button>
          <button type="button" data-action="pc-meter" data-pc-id="${escapeHtml(pc.id)}" data-field="${field}" data-delta="0.5" class="px-1.5 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/40 text-[10px] text-emerald-200 cursor-pointer">+0.5</button>
        </div>
      </div>
    `;

    container.innerHTML = state.pcs.map((pc) => `
      <div class="p-3.5 rounded-xl bg-black/30 border border-amber-500/20 space-y-2.5">
        <div class="flex items-center justify-between border-b border-stone-800 pb-1.5">
          <span class="font-imperial font-bold text-sm text-amber-300">${escapeHtml(pc.name)}</span>
          <span class="text-[11px] text-stone-400">${escapeHtml(pc.clan.toUpperCase())} • Rang ${pc.insightRank}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          ${renderMeter(pc, 'honor', 'Honneur', 'text-amber-300')}
          ${renderMeter(pc, 'glory', 'Gloire', 'text-sky-300')}
          ${renderMeter(pc, 'status', 'Statut', 'text-purple-300')}
          ${renderMeter(pc, 'taint', 'Souillure', 'text-rose-400')}
        </div>
      </div>
    `).join('');
  }

  function renderDiceHistory() {
    const historyEl = document.getElementById('gm-dice-history');
    if (!historyEl) return;
    if (state.diceHistory.length === 0) {
      historyEl.innerHTML = '<div class="text-[11px] text-stone-500 italic">Aucun jet lancé pour le moment.</div>';
      return;
    }
    historyEl.innerHTML = state.diceHistory.map((item) => `
      <div class="p-2 rounded-lg bg-black/35 border border-stone-800/80 flex items-center justify-between gap-2 text-xs">
        <div class="min-w-0">
          <span class="font-mono font-bold text-amber-300">${escapeHtml(item.formula)}</span>
          ${item.label ? `<span class="text-stone-400 text-[11px]"> — ${escapeHtml(item.label)}</span>` : ''}
          <div class="text-[10px] text-stone-500 font-mono truncate">Dés : [${(item.keptRolls || []).join(', ')}]${item.droppedRolls && item.droppedRolls.length ? ` (écartés : ${item.droppedRolls.join(', ')})` : ''}</div>
        </div>
        <span class="text-lg font-imperial font-bold text-amber-200 shrink-0">${item.total}</span>
      </div>
    `).join('');
  }

  function renderAll() {
    renderTabs();
    renderPcs();
    renderCombat();
    renderDuel();
    renderHonorPanel();
    renderDiceHistory();
    const scratchEl = document.getElementById('gm-scratchpad');
    if (scratchEl && scratchEl.value !== state.gmScratchpad) {
      scratchEl.value = state.gmScratchpad;
    }
  }

  // ===========================================================================
  // IMPORT & ACTIONS UI
  // ===========================================================================
  function handleJsonFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    let loadedCount = 0;
    const errors = [];

    Promise.all(
      files.map((file) =>
        file.text().then((text) => {
          try {
            const parsed = JSON.parse(text);
            const items = Array.isArray(parsed) ? parsed : [parsed];
            items.forEach((rawChar) => {
              state.pcs.push(normalizeImportedCharacter(rawChar));
              loadedCount++;
            });
          } catch (err) {
            errors.push(`${file.name} : ${err.message}`);
          }
        })
      )
    ).then(() => {
      saveState();
      renderAll();
      if (errors.length > 0) {
        alert(`Certains fichiers n'ont pas pu être importés :\n- ${errors.join('\n- ')}`);
      } else if (loadedCount > 0) {
        const statusEl = document.getElementById('gm-import-status');
        if (statusEl) {
          statusEl.textContent = `${loadedCount} PJ(s) importé(s) avec succès.`;
          setTimeout(() => { statusEl.textContent = ''; }, 4000);
        }
      }
    });
  }

  function loadSamplePcs() {
    const samples = [
      {
        schemaVersion: 2,
        name: 'Hida Kenji',
        clan: 'crab',
        family: 'Hida',
        school: 'Bushi Hida (Rang 2)',
        insightRank: 2,
        honor: 4.2,
        glory: 2.0,
        status: 1.5,
        traits: { stamina: 4, willpower: 3, strength: 4, perception: 2, reflexes: 3, awareness: 2, agility: 3, intelligence: 2 },
        voidRing: 3,
        voidPoints: 3,
        armor: { name: 'Armure Lourde', tnBonus: 10, reduction: 5 },
        skills: [
          { name: 'Armes Lourdes', rank: 4, trait: 'agility' },
          { name: 'Défense', rank: 3, trait: 'reflexes' },
          { name: 'Athlétisme', rank: 2, trait: 'strength' }
        ],
        weapons: [{ name: 'Tetsubo', damage: '6g3', type: 'Armes Lourdes' }],
        advantages: 'Haut Seuil de Douleur, Force de la Terre',
        disadvantages: 'Sombre Secret (Outremonde), Impulsif'
      },
      {
        schemaVersion: 2,
        name: 'Isawa Haruka',
        clan: 'phoenix',
        family: 'Isawa',
        school: 'Shugenja Isawa (Rang 2)',
        insightRank: 2,
        honor: 5.5,
        glory: 2.5,
        status: 2.0,
        traits: { stamina: 2, willpower: 4, strength: 2, perception: 3, reflexes: 3, awareness: 3, agility: 2, intelligence: 4 },
        voidRing: 3,
        voidPoints: 3,
        armor: { name: 'Kimono de Cérémonie', tnBonus: 0, reduction: 0 },
        skills: [
          { name: 'Calligraphie', rank: 4, trait: 'intelligence' },
          { name: 'Art de la Magie', rank: 4, trait: 'intelligence' },
          { name: 'Étiquette', rank: 3, trait: 'awareness' }
        ],
        weapons: [{ name: 'Wakizashi', damage: '4g2', type: 'Kenjutsu' }],
        spells: ['Frappe de Jade', 'Cœur de la Fournaise', 'Voie de la Paix'],
        advantages: 'Affinité Feu, Bénédiction de Benten',
        disadvantages: 'Doux'
      }
    ];
    samples.forEach((s) => state.pcs.push(normalizeImportedCharacter(s)));
    saveState();
    renderAll();
  }

  function rollDiceFromUi() {
    const formulaInput = document.getElementById('gm-dice-formula');
    const labelInput = document.getElementById('gm-dice-label');
    const specInput = document.getElementById('gm-dice-spec');
    const errorEl = document.getElementById('gm-dice-error');
    if (!formulaInput) return;

    const rawFormula = formulaInput.value.trim() || '5g3';
    const result = rollFormula(rawFormula, { spec: Boolean(specInput && specInput.checked) });
    if (!result) {
      if (errorEl) errorEl.textContent = 'Formule invalide. Exemple : 6g3 ou 7g4+5';
      return;
    }
    if (errorEl) errorEl.textContent = '';

    pushDiceHistory({
      ...result,
      label: labelInput ? labelInput.value.trim() : ''
    });
  }

  function runDuelRoll(side, phaseKey) {
    const d = state.duel;
    const isA = side === 'a';
    const name = isA ? d.aName : d.bName;
    const iai = Number(isA ? d.aIai : d.bIai) || 1;
    const trait = phaseKey === 'eval'
      ? Number(isA ? d.aPer : d.bPer) || 2
      : phaseKey === 'focus'
        ? Number(isA ? d.aVoid : d.bVoid) || 2
        : Number(isA ? d.aAgi : d.bAgi) || 2;
    const formula = `${trait + iai}g${trait}`;
    const res = rollFormula(formula);
    if (!res) return;

    const phaseLabels = { eval: 'Évaluation', focus: 'Focus', strike: 'Frappe' };
    pushDiceHistory({ ...res, label: `Duel (${phaseLabels[phaseKey]}) — ${name}` });

    const tnNote = phaseKey === 'strike'
      ? ` vs ND ${(isA ? d.bTN + d.bFocus * 5 : d.aTN + d.aFocus * 5)}`
      : '';
    d.log.unshift(`<b>${escapeHtml(phaseLabels[phaseKey])}</b> — ${escapeHtml(name)} (${res.formula}) : <b class="text-amber-300">${res.total}</b>${tnNote}`);
    d.log = d.log.slice(0, 12);
    saveState();
    renderDuel();
  }

  function initDom() {
    if (typeof document === 'undefined') return;
    loadState();

    // Modèles d'adversaires
    const presetSelect = document.getElementById('gm-enemy-preset');
    if (presetSelect) {
      presetSelect.innerHTML = '<option value="">— Modèle rapide L5R 4e —</option>' +
        ENEMY_PRESETS.map((p, idx) => `<option value="${idx}">${escapeHtml(p.name)} (ND ${p.armorTN}, Att ${p.attack})</option>`).join('');

      presetSelect.addEventListener('change', () => {
        const idx = parseInt(presetSelect.value, 10);
        if (isNaN(idx) || !ENEMY_PRESETS[idx]) return;
        const p = ENEMY_PRESETS[idx];
        document.getElementById('gm-enemy-name').value = p.name;
        document.getElementById('gm-enemy-init').value = p.initiative;
        document.getElementById('gm-enemy-tn').value = p.armorTN;
        document.getElementById('gm-enemy-red').value = p.reduction;
        document.getElementById('gm-enemy-earth').value = p.earth;
        document.getElementById('gm-enemy-attack').value = p.attack;
        document.getElementById('gm-enemy-damage').value = p.damage;
        document.getElementById('gm-enemy-notes').value = p.notes;
      });
    }

    // Import JSON
    const fileInput = document.getElementById('gm-json-input');
    const dropZone = document.getElementById('gm-drop-zone');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        handleJsonFiles(e.target.files);
        e.target.value = '';
      });
    }
    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-amber-400', 'bg-amber-950/20');
      });
      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-amber-400', 'bg-amber-950/20');
      });
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-amber-400', 'bg-amber-950/20');
        if (e.dataTransfer && e.dataTransfer.files) handleJsonFiles(e.dataTransfer.files);
      });
    }

    const sampleBtn = document.getElementById('gm-load-sample');
    if (sampleBtn) sampleBtn.addEventListener('click', loadSamplePcs);

    const clearPcsBtn = document.getElementById('gm-clear-pcs');
    if (clearPcsBtn) {
      clearPcsBtn.addEventListener('click', () => {
        if (state.pcs.length === 0 || confirm('Retirer tous les PJs de la table ?')) {
          state.pcs = [];
          saveState();
          renderAll();
        }
      });
    }

    // Appliquer les initiatives des PJs au combat et trier
    const applyAllInitsBtn = document.getElementById('gm-apply-pc-inits');
    if (applyAllInitsBtn) {
      applyAllInitsBtn.addEventListener('click', () => {
        state.pcs.forEach((pc) => {
          addOrUpdatePcInCombat(pc.id, pc.lastInit);
        });
        state.combat.activeIndex = 0;
        saveState();
        renderAll();
      });
    }

    // Ajout adversaire
    const enemyForm = document.getElementById('gm-enemy-form');
    if (enemyForm) {
      enemyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addEnemyToCombat({
          name: document.getElementById('gm-enemy-name').value || 'Adversaire',
          initiative: document.getElementById('gm-enemy-init').value,
          armorTN: document.getElementById('gm-enemy-tn').value,
          reduction: document.getElementById('gm-enemy-red').value,
          earth: document.getElementById('gm-enemy-earth').value,
          attack: document.getElementById('gm-enemy-attack').value,
          damage: document.getElementById('gm-enemy-damage').value,
          notes: document.getElementById('gm-enemy-notes').value
        });
      });
    }

    // Contrôles de combat
    const nextTurnBtn = document.getElementById('gm-next-turn');
    if (nextTurnBtn) {
      nextTurnBtn.addEventListener('click', () => {
        if (state.combat.combatants.length === 0) return;
        state.combat.activeIndex++;
        if (state.combat.activeIndex >= state.combat.combatants.length) {
          state.combat.activeIndex = 0;
          state.combat.round++;
        }
        saveState();
        renderCombat();
      });
    }

    const sortBtn = document.getElementById('gm-sort-init');
    if (sortBtn) {
      sortBtn.addEventListener('click', () => {
        state.combat.combatants = sortCombatantsByInit(state.combat.combatants);
        state.combat.activeIndex = 0;
        saveState();
        renderCombat();
      });
    }

    const resetCombatBtn = document.getElementById('gm-reset-combat');
    if (resetCombatBtn) {
      resetCombatBtn.addEventListener('click', () => {
        if (state.combat.combatants.length === 0 || confirm('Vider le traqueur de combat et réinitialiser au Round 1 ?')) {
          state.combat = { round: 1, activeIndex: 0, combatants: [] };
          saveState();
          renderCombat();
        }
      });
    }

    // Lanceur de dés
    const rollBtn = document.getElementById('gm-roll-btn');
    if (rollBtn) rollBtn.addEventListener('click', rollDiceFromUi);
    const formulaInput = document.getElementById('gm-dice-formula');
    if (formulaInput) {
      formulaInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          rollDiceFromUi();
        }
      });
    }

    // Sélecteur PJ pour Duel Iaijutsu
    const duelPcSelect = document.getElementById('duel-a-pc');
    if (duelPcSelect) {
      duelPcSelect.addEventListener('change', () => {
        const pc = findPc(duelPcSelect.value);
        state.duel.aPcId = duelPcSelect.value;
        if (pc) {
          const iaiSkill = pc.skills.find((s) => /iaijutsu/i.test(s.name));
          state.duel.aName = pc.name;
          state.duel.aIai = iaiSkill ? iaiSkill.rank : 1;
          state.duel.aPer = pc.traits.perception;
          state.duel.aVoid = pc.rings.void;
          state.duel.aAgi = pc.traits.agility;
          state.duel.aTN = pc.armorTN;
        }
        saveState();
        renderDuel();
      });
    }

    const duelFieldMap = {
      'duel-a-name': 'aName', 'duel-a-iai': 'aIai', 'duel-a-per': 'aPer', 'duel-a-void': 'aVoid', 'duel-a-agi': 'aAgi', 'duel-a-tn': 'aTN',
      'duel-b-name': 'bName', 'duel-b-iai': 'bIai', 'duel-b-per': 'bPer', 'duel-b-void': 'bVoid', 'duel-b-agi': 'bAgi', 'duel-b-tn': 'bTN'
    };
    Object.entries(duelFieldMap).forEach(([elId, key]) => {
      const el = document.getElementById(elId);
      if (el) {
        el.addEventListener('input', () => {
          state.duel[key] = el.type === 'number' ? (Number(el.value) || 0) : el.value;
          saveState();
          renderDuel();
        });
      }
    });

    // Bloc-notes MJ
    const scratchEl = document.getElementById('gm-scratchpad');
    if (scratchEl) {
      scratchEl.addEventListener('input', () => {
        state.gmScratchpad = scratchEl.value;
        saveState();
      });
    }

    // Délégation globale des clics
    document.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('[data-gm-tab]');
      if (tabBtn) {
        state.activeTab = tabBtn.getAttribute('data-gm-tab');
        saveState();
        renderTabs();
        return;
      }

      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');

      if (action === 'wound-delta') {
        adjustWoundsForTarget(btn.getAttribute('data-target-type'), btn.getAttribute('data-target-id'), parseInt(btn.getAttribute('data-delta'), 10) || 0);
      } else if (action === 'wound-reset') {
        setWoundsForTarget(btn.getAttribute('data-target-type'), btn.getAttribute('data-target-id'), 0);
      } else if (action === 'set-void') {
        const pc = findPc(btn.getAttribute('data-pc-id'));
        if (pc) {
          pc.voidCurrent = Math.max(0, Math.min(pc.voidMax, parseInt(btn.getAttribute('data-void-val'), 10) || 0));
          saveState();
          renderPcs();
        }
      } else if (action === 'pc-to-combat') {
        addOrUpdatePcInCombat(btn.getAttribute('data-pc-id'));
      } else if (action === 'roll-pc-init') {
        const pc = findPc(btn.getAttribute('data-pc-id'));
        if (pc) {
          const res = rollFormula(pc.initFormula);
          if (res) {
            pc.lastInit = res.total;
            pushDiceHistory({ ...res, label: `Initiative — ${pc.name}` });
            saveState();
            renderPcInitTable();
          }
        }
      } else if (action === 'remove-pc') {
        const pcId = btn.getAttribute('data-pc-id');
        state.pcs = state.pcs.filter((p) => p.id !== pcId);
        state.combat.combatants = state.combat.combatants.filter((c) => c.pcId !== pcId);
        saveState();
        renderAll();
      } else if (action === 'remove-combatant') {
        const cId = btn.getAttribute('data-combat-id');
        state.combat.combatants = state.combat.combatants.filter((c) => c.id !== cId);
        saveState();
        renderCombat();
      } else if (action === 'toggle-status') {
        const c = state.combat.combatants.find((item) => item.id === btn.getAttribute('data-combat-id'));
        const st = btn.getAttribute('data-status');
        if (c && st) {
          if (!Array.isArray(c.statuses)) c.statuses = [];
          c.statuses = c.statuses.includes(st) ? c.statuses.filter((s) => s !== st) : [...c.statuses, st];
          saveState();
          renderCombat();
        }
      } else if (action === 'pc-meter') {
        const pc = findPc(btn.getAttribute('data-pc-id'));
        const field = btn.getAttribute('data-field');
        const delta = parseFloat(btn.getAttribute('data-delta')) || 0;
        if (pc && ['honor', 'glory', 'status', 'taint'].includes(field)) {
          pc[field] = clampRankTen((pc[field] || 0) + delta);
          saveState();
          renderPcs();
          renderHonorPanel();
        }
      } else if (action === 'duel-focus') {
        const side = btn.getAttribute('data-side');
        const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
        if (side === 'a') state.duel.aFocus = Math.max(0, state.duel.aFocus + delta);
        if (side === 'b') state.duel.bFocus = Math.max(0, state.duel.bFocus + delta);
        saveState();
        renderDuel();
      } else if (action === 'duel-roll') {
        runDuelRoll(btn.getAttribute('data-side'), btn.getAttribute('data-phase'));
      } else if (action === 'duel-reset') {
        state.duel.aFocus = 0;
        state.duel.bFocus = 0;
        state.duel.log = [];
        saveState();
        renderDuel();
      }
    });

    document.addEventListener('change', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const action = el.getAttribute('data-action');
      if (action === 'set-stance') {
        const c = state.combat.combatants.find((item) => item.id === el.getAttribute('data-combat-id'));
        if (c) {
          c.stance = el.value;
          saveState();
          renderCombat();
        }
      } else if (action === 'set-init') {
        const c = state.combat.combatants.find((item) => item.id === el.getAttribute('data-combat-id'));
        if (c) {
          c.initiative = Number(el.value) || 0;
          if (c.pcId) {
            const pc = findPc(c.pcId);
            if (pc) pc.lastInit = c.initiative;
          }
          state.combat.combatants = sortCombatantsByInit(state.combat.combatants);
          saveState();
          renderCombat();
        }
      }
    });

    document.addEventListener('input', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const action = el.getAttribute('data-action');
      if (action === 'pc-gm-note') {
        const pc = findPc(el.getAttribute('data-pc-id'));
        if (pc) {
          pc.gmNotes = el.value;
          saveState();
        }
      } else if (action === 'pc-init-input') {
        const pc = findPc(el.getAttribute('data-pc-id'));
        if (pc) {
          pc.lastInit = el.value === '' ? null : Number(el.value);
          saveState();
        }
      }
    });

    renderAll();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDom);
    } else {
      initDom();
    }
  }

  if (typeof globalScope !== 'undefined') {
    globalScope.computeL5RWoundState = computeL5RWoundState;
    globalScope.normalizeImportedCharacter = normalizeImportedCharacter;
    globalScope.sortCombatantsByInit = sortCombatantsByInit;
    globalScope.formatRollResult = formatRollResult;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      WOUND_LEVELS,
      STANCES,
      ENEMY_PRESETS,
      computeL5RWoundState,
      normalizeImportedCharacter,
      sortCombatantsByInit,
      formatRollResult
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
