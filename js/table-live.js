/**
 * js/table-live.js
 * La Table Live — Compagnon temps réel des PJs & Fil de Dés partagé Roll & Keep
 * Connecté à Firebase Realtime Database (`/campaign/publicParty`, `/campaign/skirmish/publicView`, `/campaign/diceFeed`).
 * Fonctionne également hors-ligne pour les jets locaux Roll & Keep.
 */
(function (globalScope) {
  'use strict';

  const STANCE_LABELS = {
    attaque: '⚔️ Attaque',
    assaut: '🔥 Assaut',
    defense: '🛡️ Défense',
    esquive: '💨 Défense Totale',
    centre: '☯️ Centre'
  };

  const STATUS_LABELS = {
    prone: 'À terre',
    stunned: 'Étourdi',
    blinded: 'Aveuglé',
    entangled: 'Enchevêtré',
    dazed: 'Hébété',
    grappled: 'En lutte',
    surprised: 'Surpris',
    feared: 'Effrayé'
  };

  const CLAN_BADGE_MAP = {
    crabe: { kanji: '蟹', label: 'Crabe', cls: 'bg-red-950/70 border-red-600/50 text-red-300' },
    crab: { kanji: '蟹', label: 'Crabe', cls: 'bg-red-950/70 border-red-600/50 text-red-300' },
    grue: { kanji: '鶴', label: 'Grue', cls: 'bg-sky-950/70 border-sky-500/50 text-sky-300' },
    crane: { kanji: '鶴', label: 'Grue', cls: 'bg-sky-950/70 border-sky-500/50 text-sky-300' },
    dragon: { kanji: '龍', label: 'Dragon', cls: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300' },
    lion: { kanji: '獅', label: 'Lion', cls: 'bg-amber-950/70 border-amber-500/50 text-amber-300' },
    mante: { kanji: '螳', label: 'Mante', cls: 'bg-teal-950/70 border-teal-500/50 text-teal-300' },
    mantis: { kanji: '螳', label: 'Mante', cls: 'bg-teal-950/70 border-teal-500/50 text-teal-300' },
    phenix: { kanji: '鳳', label: 'Phénix', cls: 'bg-orange-950/70 border-orange-500/50 text-orange-300' },
    phoenix: { kanji: '鳳', label: 'Phénix', cls: 'bg-orange-950/70 border-orange-500/50 text-orange-300' },
    scorpion: { kanji: '蠍', label: 'Scorpion', cls: 'bg-rose-950/70 border-rose-600/50 text-rose-300' },
    licorne: { kanji: '麒', label: 'Licorne', cls: 'bg-purple-950/70 border-purple-500/50 text-purple-300' },
    unicorn: { kanji: '麒', label: 'Licorne', cls: 'bg-purple-950/70 border-purple-500/50 text-purple-300' }
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getWoundToneClasses(woundLabel) {
    const lbl = String(woundLabel || 'Indemne').toLowerCase();
    if (lbl.includes('indemne')) return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
    if (lbl.includes('érafl') || lbl.includes('erafl')) return 'bg-lime-950/80 border-lime-500/50 text-lime-300';
    if (lbl.includes('gravement') || lbl.includes('critique')) return 'bg-orange-950/85 border-orange-500/60 text-orange-300';
    if (lbl.includes('hors') || lbl.includes('mort')) return 'bg-red-950/90 border-red-500/70 text-red-200';
    return 'bg-amber-950/80 border-amber-500/50 text-amber-300';
  }

  /**
   * Parse et lance une formule Roll & Keep L5R 4e (avec Règle des 10 dés, explosions sur 10 et spécialisation).
   */
  function parseAndRollLiveFormula(formulaStr, options = {}) {
    const str = String(formulaStr || '').trim();
    const match = str.match(/(\d+)\s*[gk]\s*(\d+)(?:\s*([+-])\s*(\d+))?/i);
    if (!match) return null;

    let r = Math.max(1, parseInt(match[1], 10) || 0);
    let k = Math.max(1, parseInt(match[2], 10) || 0);
    let b = 0;
    if (match[4] !== undefined) {
      b = (match[3] === '-' ? -1 : 1) * (parseInt(match[4], 10) || 0);
    }
    const penalty = Math.max(0, parseInt(options.penalty, 10) || 0);
    b -= penalty;

    if (k > r) k = r;
    if (r > 10) {
      let excess = r - 10;
      r = 10;
      if (k < 10) {
        const conv = Math.min(Math.floor(excess / 2), 10 - k);
        k += conv;
        excess -= conv * 2;
      }
      if (k >= 10 && excess > 0) b += excess * 2;
    }
    if (k > 10) {
      b += (k - 10) * 2;
      k = 10;
    }

    const explode = options.explode !== undefined ? Boolean(options.explode) : true;
    const spec = Boolean(options.spec);
    const rng = typeof options.rng === 'function' ? options.rng : Math.random;
    const rollD10 = () => Math.floor(rng() * 10) + 1;

    const dice = [];
    for (let i = 0; i < r; i++) {
      let val = rollD10();
      if (spec && val === 1) val = rollD10();
      let totalDie = val;
      let explodedTimes = 0;
      while (explode && val === 10 && explodedTimes < 5) {
        val = rollD10();
        totalDie += val;
        explodedTimes++;
      }
      dice.push({ value: totalDie, exploded: explodedTimes > 0 });
    }
    dice.sort((a, bItem) => bItem.value - a.value);

    const kept = dice.slice(0, k);
    const dropped = dice.slice(k);
    const total = kept.reduce((acc, d) => acc + d.value, 0) + b;
    const fmt = (d) => `${d.value}${d.exploded ? '*' : ''}`;
    const labelFormula = `${r}g${k}${b ? (b > 0 ? `+${b}` : b) : ''}`;

    return {
      formula: labelFormula,
      rawFormula: str,
      penalty,
      total,
      keptRolls: kept.map(fmt),
      droppedRolls: dropped.map(fmt)
    };
  }

  function formatRollTime(isoStr) {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (_) {
      return '';
    }
  }

  // ===========================================================================
  // CONTRÔLEUR UI NAVIGATEUR (table-live.html)
  // ===========================================================================
  const uiState = {
    party: [],
    skirmish: null,
    diceFeed: [],
    localRolls: []
  };

  let unsubs = [];
  let subscribed = false;

  function isLiveAuthorized() {
    const fb = typeof window !== 'undefined' ? window.L5RFirebase : null;
    const s = fb?.getState?.();
    return Boolean(s && s.user && (s.isApproved || s.isGm));
  }

  function cleanupSubscriptions() {
    unsubs.forEach((fn) => { try { if (typeof fn === 'function') fn(); } catch (_) {} });
    unsubs = [];
    subscribed = false;
  }

  function renderStatusBanner() {
    const banner = document.getElementById('table-live-status-banner');
    const dot = document.getElementById('tl-status-dot');
    const txt = document.getElementById('tl-status-text');
    const actions = document.getElementById('tl-status-actions');
    const gmSecretWrap = document.getElementById('tl-gm-secret-wrap');
    const clearFeedBtn = document.getElementById('tl-clear-feed-btn');
    if (!banner || !dot || !txt || !actions) return;

    const fb = window.L5RFirebase;
    const s = fb?.getState?.();

    if (gmSecretWrap) gmSecretWrap.classList.toggle('hidden', !(s && s.isGm));
    if (clearFeedBtn) clearFeedBtn.classList.toggle('hidden', !(s && s.isGm));

    if (!s || s.offline || !s.user) {
      banner.className = 'card-clean rounded-2xl px-4 py-3 border border-amber-500/35 bg-black/45 flex flex-wrap items-center justify-between gap-3 text-xs';
      dot.className = 'inline-flex w-2.5 h-2.5 rounded-full bg-stone-500 shrink-0';
      txt.innerHTML = '<b>Mode local / aperçu</b> — Connectez-vous pour rejoindre la Table Live (escarmouche en direct, escouade &amp; fil de dés partagé).';
      actions.innerHTML = `
        <button type="button" id="tl-btn-open-account" class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-imperial font-bold text-[11px] cursor-pointer transition">
          👤 Connexion / Rejoindre la Table
        </button>
      `;
    } else if (!s.isApproved && !s.isGm) {
      banner.className = 'card-clean rounded-2xl px-4 py-3 border border-amber-500/55 bg-amber-950/20 flex flex-wrap items-center justify-between gap-3 text-xs';
      dot.className = 'inline-flex w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0';
      txt.innerHTML = s.memberStatus === 'pending'
        ? '<b>⏳ Demande en attente de validation du MJ</b> — Dès approbation, la Table Live s\'activera automatiquement ici.'
        : '<b>Compte connecté</b> — Demandez l\'accès à la Table dans votre compte pour voir l\'escouade et le fil de dés en direct.';
      actions.innerHTML = `
        <button type="button" id="tl-btn-open-account" class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-imperial font-bold text-[11px] cursor-pointer transition">
          🏯 Ouvrir mon compte
        </button>
      `;
    } else {
      banner.className = 'card-clean rounded-2xl px-4 py-3 border border-emerald-500/55 bg-emerald-950/20 flex flex-wrap items-center justify-between gap-3 text-xs';
      dot.className = 'inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0';
      txt.innerHTML = `<b>🟢 Table Live Connectée</b> — ${uiState.party.length} samouraï(s) à la table • ${uiState.diceFeed.length} jet(s) dans le fil.${s.isGm ? ' <span class="text-amber-300 font-bold">(MJ)</span>' : ''}`;
      actions.innerHTML = s.isGm
        ? `<a href="ecran-mj.html" class="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-500/45 text-amber-200 font-imperial font-bold text-[11px] transition">幕 Ouvrir l'Écran MJ ↗</a>`
        : `<a href="createcharacter.html" class="px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/45 text-emerald-200 font-imperial font-bold text-[11px] transition">⚔️ Ma Fiche (La Forge) ↗</a>`;
    }

    document.getElementById('tl-btn-open-account')?.addEventListener('click', () => {
      window.L5RFirebase?.openAccountModal?.();
    });
  }

  function renderPublicSkirmish() {
    const container = document.getElementById('table-live-skirmish');
    const roundBadge = document.getElementById('tl-skirmish-round-badge');
    if (!container) return;

    const sk = uiState.skirmish;
    if (!sk || !sk.active || !Array.isArray(sk.combatants) || sk.combatants.length === 0) {
      if (roundBadge) roundBadge.textContent = 'Hors combat';
      container.innerHTML = `
        <div class="p-5 rounded-xl bg-black/40 border border-dashed border-stone-800 text-center space-y-1.5">
          <div class="text-sm font-imperial font-bold text-stone-300">⛩️ Aucune escarmouche en cours</div>
          <p class="text-[11px] text-stone-400">
            Dès que le Maître du Jeu lance un combat sur l'Écran MJ, l'ordre d'initiative, le tour actif et l'état narratif des combattants apparaissent ici automatiquement (sans spoilers).
          </p>
        </div>
      `;
      return;
    }

    if (roundBadge) roundBadge.textContent = `Round ${sk.round || 1} • ${sk.combatants.length} combattant(s)`;
    const activeIdx = Math.max(0, Math.min(sk.combatants.length - 1, parseInt(sk.activeIndex, 10) || 0));
    const activeComb = sk.combatants[activeIdx];

    const spotlightHtml = activeComb ? `
      <div class="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/50 via-red-950/30 to-black/60 border border-amber-500/60 flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <span class="px-2 py-0.5 rounded-full bg-amber-500 text-black font-imperial font-black text-[10px] uppercase">Tour Actif</span>
          <span class="font-imperial font-extrabold text-sm sm:text-base text-amber-200">${escapeHtml(activeComb.name)}</span>
          <span class="text-[11px] text-stone-300 font-mono">Init ${escapeHtml(activeComb.initiative)}</span>
        </div>
        <div class="flex items-center gap-2 text-[11px]">
          <span class="px-2 py-0.5 rounded bg-black/60 border border-stone-700 text-stone-200">${escapeHtml(STANCE_LABELS[activeComb.stance] || activeComb.stance || 'Attaque')}</span>
          <span class="px-2 py-0.5 rounded border font-bold ${getWoundToneClasses(activeComb.woundLabel)}">${escapeHtml(activeComb.woundLabel || 'Indemne')}</span>
        </div>
      </div>
    ` : '';

    const rowsHtml = sk.combatants.map((c, idx) => {
      const isCurrent = idx === activeIdx;
      const isPc = c.type === 'pc';
      const statusPills = (Array.isArray(c.statuses) ? c.statuses : []).map((st) =>
        `<span class="px-1.5 py-0.2 rounded bg-purple-950/80 border border-purple-500/50 text-purple-200 text-[9px] font-bold">${escapeHtml(STATUS_LABELS[st] || st)}</span>`
      ).join('');

      return `
        <div class="px-3 py-2.5 rounded-xl border transition flex flex-wrap items-center justify-between gap-2 ${
          isCurrent
            ? 'bg-amber-950/35 border-amber-400/75 shadow-lg'
            : 'bg-black/40 border-stone-800/80'
        }">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
              isCurrent ? 'bg-amber-500 text-black' : 'bg-stone-900 border border-stone-700 text-amber-300'
            }">${escapeHtml(c.initiative)}</span>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-imperial font-bold uppercase shrink-0 ${
              isPc ? 'bg-sky-950/80 border border-sky-500/50 text-sky-200' : 'bg-red-950/80 border border-red-600/50 text-red-300'
            }">${isPc ? 'PJ' : 'PNJ'}</span>
            <span class="font-imperial font-bold text-xs sm:text-sm ${isCurrent ? 'text-amber-200' : 'text-stone-200'} truncate">${escapeHtml(c.name)}</span>
            ${statusPills}
          </div>
          <div class="flex items-center gap-2 text-[10px] shrink-0">
            <span class="px-2 py-0.5 rounded bg-stone-900/90 border border-stone-700/80 text-stone-300">${escapeHtml(STANCE_LABELS[c.stance] || c.stance || 'Attaque')}</span>
            <span class="px-2 py-0.5 rounded border font-bold ${getWoundToneClasses(c.woundLabel)}">${escapeHtml(c.woundLabel || 'Indemne')}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `<div class="space-y-2.5">${spotlightHtml}<div class="space-y-1.5">${rowsHtml}</div></div>`;
  }

  function renderPublicParty() {
    const container = document.getElementById('table-live-party');
    const countBadge = document.getElementById('tl-party-count');
    if (countBadge) countBadge.textContent = `${uiState.party.length} PJ`;
    if (!container) return;

    if (uiState.party.length === 0) {
      container.innerHTML = `
        <div class="p-5 rounded-xl bg-black/40 border border-dashed border-stone-800 text-center space-y-1.5 text-xs text-stone-400">
          <div class="font-imperial font-bold text-stone-300">Aucun samouraï encore synchronisé sur la Table</div>
          <p class="text-[11px]">
            Dans <a href="createcharacter.html" class="text-amber-300 hover:underline font-bold">La Forge → Dojo</a>, cliquez sur <b>« + Table »</b> sur votre personnage pour apparaître ici auprès de vos compagnons.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${uiState.party.map((p) => {
      const clanKey = String(p.clan || '').toLowerCase();
      const clanMeta = CLAN_BADGE_MAP[clanKey] || { kanji: '侍', label: p.clanLabel || 'Rônin', cls: 'bg-stone-900 border-stone-700 text-stone-300' };
      return `
        <article class="p-3.5 rounded-xl bg-black/50 border border-amber-500/25 hover:border-amber-500/45 transition space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-8 h-8 rounded-lg border flex items-center justify-center font-serif font-bold text-sm shrink-0 ${clanMeta.cls}">${clanMeta.kanji}</span>
              <div class="min-w-0">
                <div class="font-imperial font-bold text-sm text-amber-200 truncate">${escapeHtml(p.name)}</div>
                <div class="text-[10px] text-stone-400 truncate">${escapeHtml(p.school || clanMeta.label)}</div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono font-bold text-[10px] shrink-0">Rang ${escapeHtml(p.rank || 1)}</span>
          </div>
          <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-stone-800/80 text-[11px]">
            <span class="text-stone-300 font-mono">⚖️ Honneur <b class="text-amber-200">${Number(p.honor ?? 4.5).toFixed(1)}</b></span>
            <span class="px-2 py-0.5 rounded border font-bold text-[10px] ${getWoundToneClasses(p.woundStatus)}">${escapeHtml(p.woundStatus || 'Indemne')}</span>
          </div>
        </article>
      `;
    }).join('')}</div>`;
  }

  function renderDiceFeed() {
    const listEl = document.getElementById('tl-dice-feed-list');
    if (!listEl) return;

    const items = isLiveAuthorized()
      ? [...uiState.localRolls.filter(r => r.isSecretLocal), ...uiState.diceFeed]
          .sort((a, b) => (Date.parse(b.createdAt || '') || 0) - (Date.parse(a.createdAt || '') || 0))
          .slice(0, 35)
      : uiState.localRolls.slice(0, 20);

    if (items.length === 0) {
      listEl.innerHTML = `
        <div class="p-4 rounded-xl bg-black/40 border border-dashed border-stone-800 text-center text-[11px] text-stone-500 italic">
          Aucun lancer de dés encore affiché. Utilisez le lanceur ci-dessus ou lancez un jet depuis La Forge / l'Écran MJ !
        </div>
      `;
      return;
    }

    listEl.innerHTML = items.map((item) => {
      const keptHtml = (item.keptRolls || []).map((r) => {
        const exploded = String(r).includes('*');
        return `<span class="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
          exploded
            ? 'bg-amber-500 text-black ring-1 ring-amber-200'
            : 'bg-amber-950/80 border border-amber-500/45 text-amber-200'
        }">${escapeHtml(r)}</span>`;
      }).join('');
      const droppedHtml = (item.droppedRolls || []).map((r) =>
        `<span class="px-1 py-0.5 rounded bg-stone-900/90 border border-stone-800 text-stone-500 font-mono text-[9px] line-through">${escapeHtml(r)}</span>`
      ).join('');
      const authorBadge = item.isSecretLocal
        ? `<span class="px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/60 text-purple-200 text-[9px] font-bold">🔒 Secret MJ</span>`
        : (item.isGm
          ? `<span class="px-1.5 py-0.2 rounded bg-amber-950 border border-amber-500/60 text-amber-300 text-[9px] font-bold">👑 MJ</span>`
          : '');
      const who = item.characterName ? `${item.characterName} (${item.authorName})` : (item.authorName || 'Samouraï');
      const timeStr = formatRollTime(item.createdAt);

      return `
        <article class="p-2.5 rounded-xl border ${item.isSecretLocal ? 'bg-purple-950/20 border-purple-500/40' : 'bg-black/50 border-stone-800/90'} space-y-1.5">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                ${authorBadge}
                <span class="font-imperial font-bold text-xs text-amber-200 truncate">${escapeHtml(who)}</span>
                ${timeStr ? `<span class="text-[9px] font-mono text-stone-500">${escapeHtml(timeStr)}</span>` : ''}
              </div>
              <div class="text-[11px] text-stone-300 truncate">
                ${escapeHtml(item.label || 'Lancer')}
                <span class="font-mono text-stone-400">(${escapeHtml(item.formula)}${item.penalty ? ` -${item.penalty}` : ''})</span>
              </div>
            </div>
            <div class="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/50 font-mono font-black text-base text-amber-300 shrink-0">
              ${escapeHtml(item.total)}
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-1">${keptHtml}${droppedHtml}</div>
        </article>
      `;
    }).join('');
  }

  async function executeLiveTableRoll(overrideFormula = null, overrideLabel = null) {
    const formulaInput = document.getElementById('tl-dice-formula');
    const labelInput = document.getElementById('tl-dice-label');
    const explodeEl = document.getElementById('tl-dice-explode');
    const specEl = document.getElementById('tl-dice-spec');
    const penaltyEl = document.getElementById('tl-dice-penalty');
    const secretEl = document.getElementById('tl-gm-secret-roll');

    const formula = String(overrideFormula || formulaInput?.value || '5g3').trim();
    if (formulaInput && overrideFormula) formulaInput.value = formula;
    const penalty = Math.max(0, parseInt(penaltyEl?.value, 10) || 0);
    const res = parseAndRollLiveFormula(formula, {
      explode: explodeEl ? explodeEl.checked : true,
      spec: specEl ? specEl.checked : false,
      penalty
    });
    if (!res) return null;

    const fb = window.L5RFirebase;
    const s = fb?.getState?.();
    const isSecretGm = Boolean(s?.isGm && secretEl?.checked);
    const label = String(overrideLabel || labelInput?.value || `Jet ${res.rawFormula}`).trim();

    // Trouver le nom du personnage actif s'il existe dans le Dojo local
    let charName = '';
    try {
      const draftRaw = localStorage.getItem('l5r_current_character_draft_v4');
      if (draftRaw) {
        const draft = JSON.parse(draftRaw);
        if (draft?.name && !s?.isGm) charName = draft.name;
      }
    } catch (_) {}

    const payload = {
      label,
      formula: res.formula,
      total: res.total,
      keptRolls: res.keptRolls,
      droppedRolls: res.droppedRolls,
      penalty,
      characterName: charName,
      authorName: s?.user?.displayName || (s?.isGm ? 'Maître du Jeu' : 'Samouraï (Local)'),
      isGm: Boolean(s?.isGm),
      source: 'table-live',
      createdAt: new Date().toISOString()
    };

    if (isLiveAuthorized() && !isSecretGm && typeof fb.publishDiceRollToFeed === 'function') {
      try {
        await fb.publishDiceRollToFeed(payload);
      } catch (err) {
        console.warn('[TableLive] Publication dé impossible :', err?.message);
        uiState.localRolls.unshift({ id: `loc_${Date.now()}`, ...payload });
        renderDiceFeed();
      }
    } else {
      uiState.localRolls.unshift({
        id: `loc_${Date.now()}`,
        ...payload,
        isSecretLocal: isSecretGm
      });
      renderDiceFeed();
    }
    return res;
  }

  async function bindLiveSubscriptions() {
    renderStatusBanner();
    const fb = window.L5RFirebase;
    if (!fb || !isLiveAuthorized()) {
      cleanupSubscriptions();
      renderPublicSkirmish();
      renderPublicParty();
      renderDiceFeed();
      return;
    }
    if (subscribed) return;
    subscribed = true;

    const [uParty, uSkirmish, uDice] = await Promise.all([
      fb.subscribePublicParty((partyList) => {
        uiState.party = partyList || [];
        renderPublicParty();
        renderStatusBanner();
      }),
      fb.subscribePublicSkirmish((skirmishSnap) => {
        uiState.skirmish = skirmishSnap;
        renderPublicSkirmish();
      }),
      fb.subscribeDiceFeed((feedList) => {
        uiState.diceFeed = feedList || [];
        renderDiceFeed();
        renderStatusBanner();
      }, 30)
    ]);
    unsubs.push(uParty, uSkirmish, uDice);
  }

  function initTableLivePage() {
    if (typeof document === 'undefined') return;
    renderStatusBanner();
    renderPublicSkirmish();
    renderPublicParty();
    renderDiceFeed();
    bindLiveSubscriptions();

    document.getElementById('tl-dice-roll-btn')?.addEventListener('click', () => executeLiveTableRoll());
    document.getElementById('tl-dice-formula')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeLiveTableRoll();
      }
    });
    document.querySelectorAll('[data-tl-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-tl-preset');
        executeLiveTableRoll(f, `Jet rapide ${f}`);
      });
    });
    document.getElementById('tl-clear-feed-btn')?.addEventListener('click', async () => {
      if (!confirm('Vider l\'historique du fil de dés partagé pour toute la table ?')) return;
      try {
        await window.L5RFirebase?.clearDiceFeed?.();
        uiState.localRolls = [];
        renderDiceFeed();
      } catch (err) {
        alert(err?.message || 'Impossible de vider le fil de dés.');
      }
    });

    window.addEventListener('l5r-auth-changed', bindLiveSubscriptions);
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initTableLivePage);
  }

  const api = {
    STANCE_LABELS,
    STATUS_LABELS,
    getWoundToneClasses,
    parseAndRollLiveFormula
  };

  if (typeof globalScope !== 'undefined') {
    globalScope.L5RTableLive = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
