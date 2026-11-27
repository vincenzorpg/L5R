/**
 * js/sessions.js
 * Planificateur de sessions JDR ("Doodle de Rokugan") — Janvier à Mars 2027
 * 100 % autonome (localStorage + partage par lien/code Discord + export JSON/.ics).
 * Compatible Navigateur (window.L5RSessions) et Node.js (module.exports).
 */
(function (globalScope) {
  'use strict';

  const STORAGE_KEY = 'l5r_sessions_doodle_v2027';

  const VOTE_YES = 'yes';
  const VOTE_MAYBE = 'maybe';
  const VOTE_NO = 'no';
  const VOTE_UNSET = '';

  const MONTHS_FR = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  const DAYS_SHORT_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const DAYS_LONG_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const PJ_PRESETS = [
    { id: 'hirohito', name: 'Hirohito Hida', clan: 'crabe', badge: '蟹 Crabe' },
    { id: 'okado', name: 'Okado Hiruma', clan: 'crabe', badge: '蟹 Crabe' },
    { id: 'akira', name: 'Tsuruchi Akira', clan: 'mante', badge: '螳 Mante' },
    { id: 'ryujin', name: 'Ryujin Mirumoto', clan: 'dragon', badge: '龍 Dragon' },
    { id: 'mj', name: 'Maître du Jeu', clan: 'imperial', badge: '幕 MJ' }
  ];

  const CLAN_BADGE_META = {
    crabe: { label: 'Crabe', kanji: '蟹', colorClass: 'text-red-300 border-red-600/50 bg-red-950/70' },
    dragon: { label: 'Dragon', kanji: '龍', colorClass: 'text-emerald-300 border-emerald-600/50 bg-emerald-950/70' },
    grue: { label: 'Grue', kanji: '鶴', colorClass: 'text-sky-300 border-sky-600/50 bg-sky-950/70' },
    lion: { label: 'Lion', kanji: '獅', colorClass: 'text-amber-300 border-amber-600/50 bg-amber-950/70' },
    mante: { label: 'Mante', kanji: '螳', colorClass: 'text-teal-300 border-teal-600/50 bg-teal-950/70' },
    phenix: { label: 'Phénix', kanji: '鳳', colorClass: 'text-orange-300 border-orange-600/50 bg-orange-950/70' },
    scorpion: { label: 'Scorpion', kanji: '蠍', colorClass: 'text-rose-300 border-rose-600/50 bg-rose-950/70' },
    licorne: { label: 'Licorne', kanji: '麒', colorClass: 'text-purple-300 border-purple-600/50 bg-purple-950/70' },
    imperial: { label: 'MJ / Empire', kanji: '幕', colorClass: 'text-yellow-300 border-yellow-600/50 bg-yellow-950/70' }
  };

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function formatUtcDateIso(date) {
    return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
  }

  function formatFrenchDateShort(isoDate) {
    const parts = String(isoDate || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return String(isoDate || '');
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const dayIdx = d.getUTCDay();
    const dayNum = parts[2];
    const monthName = MONTHS_FR[parts[1] - 1] || '';
    return `${DAYS_SHORT_FR[dayIdx]} ${dayNum} ${monthName}`;
  }

  function formatFrenchDateLong(isoDate) {
    const parts = String(isoDate || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return String(isoDate || '');
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const dayIdx = d.getUTCDay();
    const dayNum = parts[2];
    const monthName = MONTHS_FR[parts[1] - 1] || '';
    return `${DAYS_LONG_FR[dayIdx]} ${dayNum} ${monthName} ${parts[0]}`;
  }

  function addUtcDays(isoDate, deltaDays) {
    const parts = String(isoDate || '').split('-').map(Number);
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + deltaDays));
    return formatUtcDateIso(d);
  }

  /**
   * Génère tous les créneaux week-end (Vendredi soir, Samedi aprèm/soir, Dimanche aprèm/soir)
   * sur les mois donnés (par défaut Janvier à Mars 2027 : [0, 1, 2]).
   */
  function generateWeekendSlots(year = 2027, months = [0, 1, 2]) {
    const monthSet = new Set(Array.isArray(months) ? months : [0, 1, 2]);
    const sortedMonths = Array.from(monthSet).sort((a, b) => a - b);
    if (sortedMonths.length === 0) return [];

    const startMonth = sortedMonths[0];
    const endMonth = sortedMonths[sortedMonths.length - 1];
    const cursor = new Date(Date.UTC(year, startMonth, 1));
    const endDate = new Date(Date.UTC(year, endMonth + 1, 0));

    const slots = [];
    while (cursor <= endDate) {
      const m = cursor.getUTCMonth();
      if (monthSet.has(m)) {
        const dow = cursor.getUTCDay(); // 0 = Dim, 5 = Ven, 6 = Sam
        const iso = formatUtcDateIso(cursor);
        const dayNum = cursor.getUTCDate();
        const shortDayLabel = `${DAYS_SHORT_FR[dow]} ${dayNum} ${MONTHS_FR[m].slice(0, 4)}.`;

        if (dow === 5) {
          slots.push({
            id: `${iso}:soir`,
            dateStr: iso,
            month: m,
            dayOfWeek: dow,
            weekendKey: iso,
            period: 'soir',
            periodShort: 'Soir',
            periodLabel: 'Vendredi soir (~20h)',
            dayLabel: shortDayLabel,
            fullLabel: `${formatFrenchDateLong(iso)} — Soir (~20h)`
          });
        } else if (dow === 6 || dow === 0) {
          const fridayOffset = dow === 6 ? -1 : -2;
          const weekendKey = addUtcDays(iso, fridayOffset);
          const dayWord = dow === 6 ? 'Samedi' : 'Dimanche';
          slots.push({
            id: `${iso}:aprem`,
            dateStr: iso,
            month: m,
            dayOfWeek: dow,
            weekendKey,
            period: 'aprem',
            periodShort: 'Aprèm',
            periodLabel: `${dayWord} après-midi (~14h)`,
            dayLabel: shortDayLabel,
            fullLabel: `${formatFrenchDateLong(iso)} — Après-midi (~14h)`
          });
          slots.push({
            id: `${iso}:soir`,
            dateStr: iso,
            month: m,
            dayOfWeek: dow,
            weekendKey,
            period: 'soir',
            periodShort: 'Soir',
            periodLabel: `${dayWord} soir (~20h)`,
            dayLabel: shortDayLabel,
            fullLabel: `${formatFrenchDateLong(iso)} — Soir (~20h)`
          });
        }
      }
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return slots;
  }

  /**
   * Regroupe les créneaux par week-end chronologique avec plage de dates lisible.
   */
  function groupSlotsByWeekend(slots) {
    const map = new Map();
    (Array.isArray(slots) ? slots : []).forEach((slot) => {
      const key = slot.weekendKey || slot.dateStr;
      if (!map.has(key)) {
        map.set(key, {
          weekendKey: key,
          slots: []
        });
      }
      map.get(key).slots.push(slot);
    });

    let idx = 1;
    const groups = [];
    map.forEach((entry) => {
      const list = entry.slots;
      const firstDate = list[0]?.dateStr || entry.weekendKey;
      const lastDate = list[list.length - 1]?.dateStr || firstDate;
      const fParts = firstDate.split('-').map(Number);
      const lParts = lastDate.split('-').map(Number);
      const fMonth = MONTHS_FR[(fParts[1] || 1) - 1] || '';
      const lMonth = MONTHS_FR[(lParts[1] || 1) - 1] || '';
      const title = fParts[1] === lParts[1]
        ? `Week-end ${idx} • ${fParts[2]} – ${lParts[2]} ${lMonth} ${lParts[0]}`
        : `Week-end ${idx} • ${fParts[2]} ${fMonth} – ${lParts[2]} ${lMonth} ${lParts[0]}`;
      const monthsInvolved = Array.from(new Set(list.map(s => s.month)));

      groups.push({
        index: idx,
        weekendKey: entry.weekendKey,
        title,
        monthsInvolved,
        slots: list
      });
      idx++;
    });

    return groups;
  }

  function normalizePlayerName(name) {
    return String(name || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function sanitizeVoteValue(val) {
    if (val === VOTE_YES || val === 'y') return VOTE_YES;
    if (val === VOTE_MAYBE || val === 'm') return VOTE_MAYBE;
    if (val === VOTE_NO || val === 'n') return VOTE_NO;
    return VOTE_UNSET;
  }

  function cycleVoteState(current) {
    const s = sanitizeVoteValue(current);
    if (s === VOTE_UNSET) return VOTE_YES;
    if (s === VOTE_YES) return VOTE_MAYBE;
    if (s === VOTE_MAYBE) return VOTE_NO;
    return VOTE_UNSET;
  }

  function sanitizeVotesMap(votesMap) {
    const out = {};
    if (!votesMap || typeof votesMap !== 'object') return out;
    Object.keys(votesMap).forEach((k) => {
      const clean = sanitizeVoteValue(votesMap[k]);
      if (clean) out[k] = clean;
    });
    return out;
  }

  function upsertParticipantResponse(responsesList, incoming) {
    const base = Array.isArray(responsesList) ? responsesList.map(r => ({
      ...r,
      votes: sanitizeVotesMap(r?.votes)
    })) : [];
    if (!incoming || !String(incoming.name || '').trim()) return base;

    const cleanName = String(incoming.name).trim();
    const normKey = normalizePlayerName(cleanName);
    const nextEntry = {
      id: incoming.id || `pj_${normKey.replace(/[^a-z0-9]+/g, '_')}`,
      name: cleanName,
      clan: CLAN_BADGE_META[incoming.clan] ? incoming.clan : 'crabe',
      note: String(incoming.note || '').trim().slice(0, 200),
      votes: sanitizeVotesMap(incoming.votes),
      updatedAt: incoming.updatedAt || new Date().toISOString()
    };

    const idx = base.findIndex(r => normalizePlayerName(r.name) === normKey);
    if (idx >= 0) {
      base[idx] = nextEntry;
    } else {
      base.push(nextEntry);
    }
    return base;
  }

  function removeParticipantResponse(responsesList, playerName) {
    const normKey = normalizePlayerName(playerName);
    return (Array.isArray(responsesList) ? responsesList : [])
      .filter(r => normalizePlayerName(r?.name) !== normKey);
  }

  /**
   * Classe tous les créneaux selon le consensus des PJs.
   */
  function computeSlotRanking(slots, responses) {
    const participants = Array.isArray(responses) ? responses : [];
    const totalPlayers = participants.length;

    const ranked = (Array.isArray(slots) ? slots : []).map((slot) => {
      let yesCount = 0;
      let maybeCount = 0;
      let noCount = 0;
      const yesNames = [];
      const maybeNames = [];
      const noNames = [];

      participants.forEach((p) => {
        const v = sanitizeVoteValue(p?.votes?.[slot.id]);
        if (v === VOTE_YES) {
          yesCount++;
          yesNames.push(p.name);
        } else if (v === VOTE_MAYBE) {
          maybeCount++;
          maybeNames.push(p.name);
        } else if (v === VOTE_NO) {
          noCount++;
          noNames.push(p.name);
        }
      });

      const unsetCount = Math.max(0, totalPlayers - yesCount - maybeCount - noCount);
      const score = totalPlayers === 0
        ? 0
        : (yesCount * 100) + (maybeCount * 35) - (noCount * 200) - (unsetCount * 5);
      const isPerfectMatch = totalPlayers > 0 && yesCount === totalPlayers;
      const isCompatible = totalPlayers > 0 && noCount === 0 && (yesCount + maybeCount) === totalPlayers;

      return {
        slot,
        totalPlayers,
        yesCount,
        maybeCount,
        noCount,
        unsetCount,
        score,
        isPerfectMatch,
        isCompatible,
        yesNames,
        maybeNames,
        noNames
      };
    });

    return ranked.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.yesCount !== a.yesCount) return b.yesCount - a.yesCount;
      if (a.noCount !== b.noCount) return a.noCount - b.noCount;
      return a.slot.id.localeCompare(b.slot.id);
    });
  }

  // Encodage / Décodage Base64URL compatible UTF-8 (Navigateur + Node.js)
  function toBase64UrlUtf8(str) {
    let b64;
    if (typeof Buffer !== 'undefined' && typeof window === 'undefined') {
      b64 = Buffer.from(str, 'utf8').toString('base64');
    } else {
      const bytes = new TextEncoder().encode(str);
      let bin = '';
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      b64 = btoa(bin);
    }
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  function fromBase64UrlUtf8(token) {
    const normalized = String(token || '').replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (normalized.length % 4)) % 4;
    const padded = normalized + '='.repeat(padLen);
    if (typeof Buffer !== 'undefined' && typeof window === 'undefined') {
      return Buffer.from(padded, 'base64').toString('utf8');
    }
    const bin = atob(padded);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function encodeVoteVector(votesMap, slots) {
    const vMap = sanitizeVotesMap(votesMap);
    const slotIds = new Set();
    const chars = (Array.isArray(slots) ? slots : []).map((s) => {
      slotIds.add(s.id);
      const v = vMap[s.id];
      if (v === VOTE_YES) return 'y';
      if (v === VOTE_MAYBE) return 'm';
      if (v === VOTE_NO) return 'n';
      return '.';
    }).join('');

    const extras = {};
    Object.keys(vMap).forEach((k) => {
      if (!slotIds.has(k)) extras[k] = vMap[k];
    });
    return { d: chars, x: Object.keys(extras).length > 0 ? extras : undefined };
  }

  function decodeVoteVector(vectorStr, extrasObj, slots) {
    const out = {};
    const str = String(vectorStr || '');
    (Array.isArray(slots) ? slots : []).forEach((s, i) => {
      const ch = str[i];
      if (ch === 'y') out[s.id] = VOTE_YES;
      else if (ch === 'm') out[s.id] = VOTE_MAYBE;
      else if (ch === 'n') out[s.id] = VOTE_NO;
    });
    if (extrasObj && typeof extrasObj === 'object') {
      Object.keys(extrasObj).forEach((k) => {
        const clean = sanitizeVoteValue(extrasObj[k]);
        if (clean) out[k] = clean;
      });
    }
    return out;
  }

  /**
   * Encode les dispos d'un PJ en jeton compact URL-safe.
   */
  function encodeVoteSharePayload(playerResponse, slots) {
    const vec = encodeVoteVector(playerResponse?.votes, slots);
    const payload = {
      v: 1,
      k: 'vote',
      n: String(playerResponse?.name || '').trim(),
      c: String(playerResponse?.clan || 'crabe'),
      t: String(playerResponse?.note || '').trim().slice(0, 200) || undefined,
      d: vec.d,
      x: vec.x,
      u: playerResponse?.updatedAt || new Date().toISOString()
    };
    return toBase64UrlUtf8(JSON.stringify(payload));
  }

  /**
   * Encode l'ensemble du sondage (tous les PJs) dans un jeton compact URL-safe.
   */
  function encodePollSharePayload(responsesList, slots, meta = {}) {
    const items = (Array.isArray(responsesList) ? responsesList : []).map((r) => {
      const vec = encodeVoteVector(r?.votes, slots);
      return {
        n: String(r?.name || '').trim(),
        c: String(r?.clan || 'crabe'),
        t: String(r?.note || '').trim().slice(0, 200) || undefined,
        d: vec.d,
        x: vec.x,
        u: r?.updatedAt
      };
    }).filter(it => it.n);

    const payload = {
      v: 1,
      k: 'poll',
      title: meta.title || undefined,
      items
    };
    return toBase64UrlUtf8(JSON.stringify(payload));
  }

  /**
   * Décode un jeton (?vote=... ou ?poll=...) et retourne { kind, items }.
   */
  function decodeSharePayload(token, slots) {
    try {
      const cleanToken = String(token || '').trim().replace(/^.*?(?:vote|poll)=/i, '').split(/[&#\s]/)[0];
      if (!cleanToken) return null;
      const parsed = JSON.parse(fromBase64UrlUtf8(cleanToken));
      if (!parsed || parsed.v !== 1) return null;

      if (parsed.k === 'poll' && Array.isArray(parsed.items)) {
        const items = parsed.items
          .filter(it => it && String(it.n || '').trim())
          .map(it => ({
            name: String(it.n).trim(),
            clan: CLAN_BADGE_META[it.c] ? it.c : 'crabe',
            note: String(it.t || ''),
            votes: decodeVoteVector(it.d, it.x, slots),
            updatedAt: it.u || new Date().toISOString()
          }));
        return { kind: 'poll', title: parsed.title || '', items };
      }

      if ((parsed.k === 'vote' || parsed.n) && String(parsed.n || '').trim()) {
        return {
          kind: 'vote',
          items: [{
            name: String(parsed.n).trim(),
            clan: CLAN_BADGE_META[parsed.c] ? parsed.c : 'crabe',
            note: String(parsed.t || ''),
            votes: decodeVoteVector(parsed.d, parsed.x, slots),
            updatedAt: parsed.u || new Date().toISOString()
          }]
        };
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  /**
   * Extrait et décode un ou plusieurs liens / codes collés (ex: plusieurs messages Discord).
   */
  function extractAndDecodeShareInputs(rawText, slots) {
    const text = String(rawText || '').trim();
    if (!text) return { imported: [], invalidCount: 0 };

    const tokens = [];
    const urlParamRegex = /(?:[?&#]|^)(?:vote|poll)=([A-Za-z0-9_-]{12,})/g;
    let m;
    while ((m = urlParamRegex.exec(text)) !== null) {
      tokens.push(m[1]);
    }

    if (tokens.length === 0) {
      text.split(/[\r\n\s]+/).forEach((part) => {
        const cleaned = part.trim();
        if (/^[A-Za-z0-9_-]{20,}$/.test(cleaned)) tokens.push(cleaned);
      });
    }

    const imported = [];
    let invalidCount = 0;
    tokens.forEach((tok) => {
      const res = decodeSharePayload(tok, slots);
      if (res && Array.isArray(res.items) && res.items.length > 0) {
        res.items.forEach(item => imported.push(item));
      } else {
        invalidCount++;
      }
    });

    return { imported, invalidCount };
  }

  /**
   * Formate un résumé Discord lisible des disponibilités d'un joueur + son lien de fusion.
   */
  function formatDiscordPlayerSummary(playerResponse, slots, shareUrl = '') {
    const name = String(playerResponse?.name || 'Samouraï').trim();
    const votes = sanitizeVotesMap(playerResponse?.votes);
    const groups = groupSlotsByWeekend(slots);
    const yesLines = [];
    const maybeLines = [];

    groups.forEach((g) => {
      const ySlots = g.slots.filter(s => votes[s.id] === VOTE_YES).map(s => `${s.dayLabel} ${s.periodShort}`);
      const mSlots = g.slots.filter(s => votes[s.id] === VOTE_MAYBE).map(s => `${s.dayLabel} ${s.periodShort}`);
      if (ySlots.length > 0) yesLines.push(`  • ${ySlots.join(' / ')}`);
      if (mSlots.length > 0) maybeLines.push(`  • ${mSlots.join(' / ')}`);
    });

    const lines = [
      `📅 **Disponibilités JDR (Janv–Mars 2027) — ${name}**`
    ];
    if (yesLines.length > 0) {
      lines.push(`✅ **Disponible (${yesLines.reduce((acc, l) => acc + l.split(' / ').length, 0)}) :**`, ...yesLines);
    } else {
      lines.push(`✅ **Disponible :** aucun créneau coché`);
    }
    if (maybeLines.length > 0) {
      lines.push(`🟡 **Si besoin :**`, ...maybeLines);
    }
    if (playerResponse?.note) {
      lines.push(`📝 **Note :** ${playerResponse.note}`);
    }
    if (shareUrl) {
      lines.push(`🔗 **Importer mon vote dans le Doodle :** ${shareUrl}`);
    }
    return lines.join('\n');
  }

  function formatDiscordSessionCall(rankedEntry) {
    if (!rankedEntry || !rankedEntry.slot) return '';
    const s = rankedEntry.slot;
    const present = [...(rankedEntry.yesNames || []), ...(rankedEntry.maybeNames || []).map(n => `${n} (si besoin)`)];
    return [
      `🏯 **Prochaine Session — Les Chroniques de Rokugan**`,
      `🗓️ **${s.fullLabel}**`,
      `✅ **PJs disponibles (${rankedEntry.yesCount}/${rankedEntry.totalPlayers}) :** ${present.length ? present.join(', ') : 'À confirmer'}`
    ].join('\n');
  }

  /**
   * Génère un fichier iCalendar (.ics) pour un créneau donné (heure locale France).
   */
  function buildIcsEventContent(slot, summaryTitle = 'Session L5R — Les Chroniques de Rokugan') {
    const compactDate = String(slot?.dateStr || '2027-01-02').replace(/-/g, '');
    const isAfternoon = slot?.period === 'aprem';
    const startTime = isAfternoon ? '140000' : '200000';
    const endTime = isAfternoon ? '183000' : '235900';
    const uid = `l5r-session-${compactDate}-${slot?.period || 'soir'}@vincenzorpg.github.io`;
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Les Chroniques de Rokugan//Sessions JDR//FR',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:20270101T120000Z`,
      `DTSTART:${compactDate}T${startTime}`,
      `DTEND:${compactDate}T${endTime}`,
      `SUMMARY:${summaryTitle}`,
      `DESCRIPTION:${slot?.fullLabel || 'Session de Jeu de Rôle L5R 4e Édition'}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  // ===========================================================================
  // CONTRÔLEUR UI NAVIGATEUR (sessions.html)
  // ===========================================================================
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const ALL_SLOTS = generateWeekendSlots(2027, [0, 1, 2]);
  const ALL_WEEKEND_GROUPS = groupSlotsByWeekend(ALL_SLOTS);

  let state = {
    currentName: '',
    currentClan: 'crabe',
    currentNote: '',
    currentVotes: {},
    responses: [],
    activeBrush: 'cycle',
    monthFilter: 'all',
    periodFilter: 'all',
    showOnlyMyMonthMatch: false
  };

  let cloudUnsub = null;
  let cloudSyncActive = false;
  let cloudPushTimer = null;
  let hasHydratedOwnCloudVote = false;

  function isCloudDoodleAuthorized() {
    const fb = typeof window !== 'undefined' ? window.L5RFirebase : null;
    if (!fb || typeof fb.getState !== 'function') return false;
    const s = fb.getState();
    return Boolean(s && s.user && (s.isApproved || s.isGm));
  }

  function renderCloudBanner() {
    const banner = document.getElementById('doodle-cloud-banner');
    const dot = document.getElementById('doodle-cloud-dot');
    const textEl = document.getElementById('doodle-cloud-status-text');
    const actionsEl = document.getElementById('doodle-cloud-actions');
    if (!banner || !dot || !textEl || !actionsEl) return;

    const fb = typeof window !== 'undefined' ? window.L5RFirebase : null;
    const s = fb && typeof fb.getState === 'function' ? fb.getState() : null;

    if (!s || s.offline || !s.user) {
      banner.className = 'card-clean rounded-2xl px-4 py-3 border border-amber-500/30 bg-black/45 flex flex-wrap items-center justify-between gap-3 text-xs';
      dot.className = 'inline-flex w-2.5 h-2.5 rounded-full bg-stone-500 shrink-0';
      textEl.innerHTML = '<b>Mode local actif</b> — Connectez-vous pour activer le Doodle partagé en temps réel (le partage par liens Discord reste 100 % disponible).';
      actionsEl.innerHTML = `
        <button type="button" id="btn-doodle-open-account" class="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-500/45 text-amber-200 font-imperial font-bold text-[11px] cursor-pointer transition">
          👤 Connexion / Dojo Cloud
        </button>
      `;
    } else if (!s.isApproved && !s.isGm) {
      banner.className = 'card-clean rounded-2xl px-4 py-3 border border-amber-500/50 bg-amber-950/20 flex flex-wrap items-center justify-between gap-3 text-xs';
      dot.className = 'inline-flex w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0';
      textEl.innerHTML = s.memberStatus === 'pending'
        ? '<b>⏳ En attente de validation du MJ</b> — Dès approbation, vos disponibilités seront synchronisées en direct avec toute l\'escouade.'
        : '<b>Compte connecté (accès Table requis)</b> — Demandez l\'accès à la Table dans votre compte pour rejoindre le Doodle en direct.';
      actionsEl.innerHTML = `
        <button type="button" id="btn-doodle-open-account" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-imperial font-bold text-[11px] cursor-pointer transition">
          🏯 Ouvrir mon compte
        </button>
      `;
    } else {
      const cloudCount = state.responses.filter(r => r.fromCloud).length;
      const localOnlyCount = state.responses.filter(r => !r.fromCloud).length;
      banner.className = 'card-clean rounded-2xl px-4 py-3 border border-emerald-500/55 bg-emerald-950/20 flex flex-wrap items-center justify-between gap-3 text-xs';
      dot.className = 'inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0';
      textEl.innerHTML = `<b>☁️ Synchronisation Temps Réel Active</b> — ${cloudCount} fiche(s) en direct dans Firebase.${s.isGm ? ' <span class="text-amber-300 font-bold">(Mode MJ)</span>' : ''}`;
      actionsEl.innerHTML = (localOnlyCount > 0 || s.isGm)
        ? `<button type="button" id="btn-doodle-push-local" class="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-imperial font-bold text-[11px] cursor-pointer transition" title="Envoyer vos fiches locales vers le Doodle partagé Firebase">☁️ Publier ${localOnlyCount > 0 ? localOnlyCount + ' fiche(s) locale(s)' : 'le tableau'} vers la Table</button>`
        : `<span class="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono text-[10px]">Temps réel OK</span>`;
    }

    document.getElementById('btn-doodle-open-account')?.addEventListener('click', () => {
      window.L5RFirebase?.openAccountModal?.();
    });
    document.getElementById('btn-doodle-push-local')?.addEventListener('click', syncLocalResponsesToCloud);
  }

  function schedulePushCurrentVoteToCloud(immediate = false) {
    if (!isCloudDoodleAuthorized() || !state.currentName.trim()) return;
    clearTimeout(cloudPushTimer);
    const runner = async () => {
      try {
        const fb = window.L5RFirebase;
        const s = fb.getState();
        const entry = getCurrentEditorResponseObj();
        const existing = state.responses.find(r => normalizePlayerName(r.name) === normalizePlayerName(entry.name));
        let targetKey = null;
        if (s.isGm) {
          if (existing?.cloudKey) {
            targetKey = existing.cloudKey;
          } else {
            const normName = normalizePlayerName(entry.name);
            const isOwnGm = normName === 'maitre du jeu' || normName === normalizePlayerName(s.user.displayName || '');
            targetKey = isOwnGm ? s.user.uid : `gm_${fb.sanitizeFirebaseKey(entry.name)}`;
          }
        }
        await fb.saveDoodleEntryToCloud(entry, targetKey);
      } catch (err) {
        console.warn('[Sessions] Synchro Cloud en attente :', err?.message);
      }
    };
    if (immediate) runner();
    else cloudPushTimer = setTimeout(runner, 450);
  }

  async function syncLocalResponsesToCloud() {
    if (!isCloudDoodleAuthorized()) return;
    const fb = window.L5RFirebase;
    const s = fb.getState();
    const toPush = s.isGm
      ? state.responses
      : state.responses.filter(r => normalizePlayerName(r.name) === normalizePlayerName(state.currentName));
    if (toPush.length === 0) {
      showToast('Aucune fiche locale à publier.', 'warn');
      return;
    }
    try {
      let pushed = 0;
      for (const item of toPush) {
        const key = s.isGm ? (item.cloudKey || `gm_${fb.sanitizeFirebaseKey(item.name)}`) : null;
        await fb.saveDoodleEntryToCloud(item, key);
        pushed++;
      }
      showToast(`${pushed} fiche(s) publiée(s) dans le Doodle temps réel !`);
    } catch (err) {
      showToast(err?.message || 'Impossible de publier vers Firebase.', 'err');
    }
  }

  async function bindDoodleCloudSync() {
    renderCloudBanner();
    const fb = typeof window !== 'undefined' ? window.L5RFirebase : null;
    if (!fb || typeof fb.subscribeDoodle2027 !== 'function') return;

    if (!isCloudDoodleAuthorized()) {
      if (typeof cloudUnsub === 'function') {
        try { cloudUnsub(); } catch (_) {}
        cloudUnsub = null;
      }
      cloudSyncActive = false;
      return;
    }
    if (cloudSyncActive) return;
    cloudSyncActive = true;

    const s = fb.getState();
    cloudUnsub = await fb.subscribeDoodle2027((cloudMap) => {
      const localOnly = state.responses.filter(r => !r.fromCloud);
      state.responses = typeof fb.mergeDoodleResponses === 'function'
        ? fb.mergeDoodleResponses(localOnly, cloudMap)
        : localOnly;

      if (!hasHydratedOwnCloudVote && s.user) {
        const own = state.responses.find(r => r.uid === s.user.uid || r.cloudKey === s.user.uid);
        if (own) {
          if (!state.currentName.trim()) {
            state.currentName = own.name;
            state.currentClan = CLAN_BADGE_META[own.clan] ? own.clan : 'crabe';
            state.currentNote = own.note || '';
            state.currentVotes = { ...own.votes };
          }
          hasHydratedOwnCloudVote = true;
        } else if (!state.currentName.trim() && s.user.displayName) {
          state.currentName = s.isGm ? 'Maître du Jeu' : s.user.displayName;
          state.currentClan = s.isGm ? 'imperial' : state.currentClan;
          hasHydratedOwnCloudVote = true;
        }
      }

      saveStateToStorage();
      renderAll();
      renderCloudBanner();
    });
  }

  function showToast(msg, tone = 'ok') {
    const el = document.getElementById('sessions-toast');
    if (!el) return;
    const toneClasses = tone === 'err'
      ? 'bg-red-950/95 border-red-500/60 text-red-200'
      : tone === 'warn'
        ? 'bg-amber-950/95 border-amber-500/60 text-amber-200'
        : 'bg-emerald-950/95 border-emerald-500/60 text-emerald-200';
    el.className = `fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl border text-xs font-imperial font-bold shadow-2xl transition-opacity duration-200 ${toneClasses}`;
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.add('hidden'), 3200);
  }

  function loadStateFromStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (typeof parsed.currentName === 'string') state.currentName = parsed.currentName;
        if (typeof parsed.currentClan === 'string' && CLAN_BADGE_META[parsed.currentClan]) state.currentClan = parsed.currentClan;
        if (typeof parsed.currentNote === 'string') state.currentNote = parsed.currentNote;
        if (parsed.currentVotes) state.currentVotes = sanitizeVotesMap(parsed.currentVotes);
        if (Array.isArray(parsed.responses)) {
          let merged = [];
          parsed.responses.forEach((r) => {
            merged = upsertParticipantResponse(merged, r);
          });
          state.responses = merged;
        }
      }
    } catch (_) {}
  }

  function saveStateToStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentName: state.currentName,
        currentClan: state.currentClan,
        currentNote: state.currentNote,
        currentVotes: state.currentVotes,
        responses: state.responses
      }));
    } catch (_) {}
  }

  function getCurrentEditorResponseObj() {
    const cleanName = (state.currentName || '').trim();
    return {
      name: cleanName,
      clan: state.currentClan,
      note: state.currentNote,
      votes: state.currentVotes,
      updatedAt: new Date().toISOString()
    };
  }

  function saveCurrentPlayerToGroup() {
    const nameInput = document.getElementById('doodle-player-name');
    if (nameInput) state.currentName = nameInput.value.trim();
    const clanSel = document.getElementById('doodle-player-clan');
    if (clanSel) state.currentClan = clanSel.value;
    const noteEl = document.getElementById('doodle-player-note');
    if (noteEl) state.currentNote = noteEl.value.trim();

    if (!state.currentName) {
      showToast('Indiquez votre nom de PJ (ou cliquez un préréglage) avant d\'enregistrer.', 'warn');
      nameInput?.focus();
      return false;
    }
    state.responses = upsertParticipantResponse(state.responses, getCurrentEditorResponseObj());
    saveStateToStorage();
    renderAll();
    const synced = isCloudDoodleAuthorized();
    if (synced) schedulePushCurrentVoteToCloud(true);
    showToast(`Disponibilités de ${state.currentName} enregistrées${synced ? ' (synchronisées en direct ☁️)' : ' dans le tableau'} !`);
    return true;
  }

  function selectPlayerPreset(name, clan) {
    const prevName = state.currentName;
    const prevWasSaved = Boolean(
      prevName && prevName.trim()
      && normalizePlayerName(prevName) !== normalizePlayerName(name)
      && state.responses.some(r => normalizePlayerName(r.name) === normalizePlayerName(prevName))
    );
    state.currentName = name;
    state.currentClan = CLAN_BADGE_META[clan] ? clan : 'crabe';
    const existing = state.responses.find(r => normalizePlayerName(r.name) === normalizePlayerName(name));
    if (existing) {
      state.currentVotes = { ...existing.votes };
      state.currentNote = existing.note || '';
      showToast(`Fiche existante de ${name} chargée pour modification.`);
    } else {
      if (prevWasSaved) state.currentVotes = {};
      state.currentNote = '';
    }
    syncEditorInputs();
    saveStateToStorage();
    renderAll();
  }

  function loadDojoCharactersPresets() {
    const container = document.getElementById('dojo-quick-presets');
    if (!container || typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem('l5r_dojo_characters_v4')
        || localStorage.getItem('l5r_saved_characters')
        || localStorage.getItem('l5r_dojo_characters_v1');
      const list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list) || list.length === 0) return;
      const presetNorms = new Set(PJ_PRESETS.map(p => normalizePlayerName(p.name)));
      const custom = list.filter(c => c?.name && !presetNorms.has(normalizePlayerName(c.name))).slice(0, 4);
      if (custom.length === 0) return;
      container.innerHTML = custom.map(c => `
        <button type="button" data-select-pj="${escapeHtml(c.name)}" data-select-clan="${escapeHtml(c.clan || 'crabe')}" class="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-200 text-[11px] font-imperial font-bold transition cursor-pointer">
          🏯 ${escapeHtml(c.name)}
        </button>
      `).join('');
      container.classList.remove('hidden');
    } catch (_) {}
  }

  function syncEditorInputs() {
    const nameInput = document.getElementById('doodle-player-name');
    if (nameInput && nameInput.value !== state.currentName) nameInput.value = state.currentName;
    const clanSel = document.getElementById('doodle-player-clan');
    if (clanSel) clanSel.value = state.currentClan;
    const noteEl = document.getElementById('doodle-player-note');
    if (noteEl && noteEl.value !== state.currentNote) noteEl.value = state.currentNote;

    document.querySelectorAll('[data-select-pj]').forEach((btn) => {
      const isSelected = normalizePlayerName(btn.getAttribute('data-select-pj')) === normalizePlayerName(state.currentName);
      btn.classList.toggle('ring-2', isSelected);
      btn.classList.toggle('ring-amber-400', isSelected);
    });
  }

  function getFilteredWeekendGroups() {
    return ALL_WEEKEND_GROUPS.map((g) => {
      const filteredSlots = g.slots.filter((s) => {
        if (state.monthFilter !== 'all' && String(s.month) !== String(state.monthFilter)) return false;
        if (state.periodFilter === 'soir' && s.period !== 'soir') return false;
        if (state.periodFilter === 'aprem' && s.period !== 'aprem') return false;
        return true;
      });
      return { ...g, slots: filteredSlots };
    }).filter(g => g.slots.length > 0);
  }

  function getFilteredSlots() {
    return getFilteredWeekendGroups().flatMap(g => g.slots);
  }

  function applyVoteToSlot(slotId) {
    const nextVal = state.activeBrush === 'cycle'
      ? cycleVoteState(state.currentVotes[slotId])
      : sanitizeVoteValue(state.activeBrush);
    if (nextVal) state.currentVotes[slotId] = nextVal;
    else delete state.currentVotes[slotId];

    // Mise à jour en direct si ce joueur figure déjà dans le tableau collectif
    if (state.currentName.trim()) {
      const norm = normalizePlayerName(state.currentName);
      const existsIdx = state.responses.findIndex(r => normalizePlayerName(r.name) === norm);
      if (existsIdx >= 0) {
        state.responses = upsertParticipantResponse(state.responses, getCurrentEditorResponseObj());
        schedulePushCurrentVoteToCloud(false);
      }
    }
    saveStateToStorage();
    renderAll();
  }

  function applyVoteToWeekend(weekendKey, value) {
    const group = ALL_WEEKEND_GROUPS.find(g => g.weekendKey === weekendKey);
    if (!group) return;
    const clean = sanitizeVoteValue(value);
    group.slots.forEach((s) => {
      if (clean) state.currentVotes[s.id] = clean;
      else delete state.currentVotes[s.id];
    });
    if (state.currentName.trim()) {
      const norm = normalizePlayerName(state.currentName);
      if (state.responses.some(r => normalizePlayerName(r.name) === norm)) {
        state.responses = upsertParticipantResponse(state.responses, getCurrentEditorResponseObj());
        schedulePushCurrentVoteToCloud(false);
      }
    }
    saveStateToStorage();
    renderAll();
  }

  function applyBulkVisibleSlots(value) {
    const visible = getFilteredSlots();
    const clean = sanitizeVoteValue(value);
    visible.forEach((s) => {
      if (clean) state.currentVotes[s.id] = clean;
      else delete state.currentVotes[s.id];
    });
    if (state.currentName.trim()) {
      const norm = normalizePlayerName(state.currentName);
      if (state.responses.some(r => normalizePlayerName(r.name) === norm)) {
        state.responses = upsertParticipantResponse(state.responses, getCurrentEditorResponseObj());
        schedulePushCurrentVoteToCloud(false);
      }
    }
    saveStateToStorage();
    renderAll();
  }

  function buildVoteCellButtonHtml(slotId, voteVal) {
    const v = sanitizeVoteValue(voteVal);
    let cls = 'bg-stone-900/80 border-stone-700/70 text-stone-400 hover:border-amber-500/60';
    let label = '⬜';
    let title = 'Non renseigné (cliquer pour voter)';
    if (v === VOTE_YES) {
      cls = 'bg-emerald-950/90 border-emerald-500/70 text-emerald-300 hover:bg-emerald-900/90';
      label = '✅';
      title = 'Disponible';
    } else if (v === VOTE_MAYBE) {
      cls = 'bg-amber-950/90 border-amber-500/70 text-amber-300 hover:bg-amber-900/90';
      label = '🟡';
      title = 'Si besoin / Peut-être';
    } else if (v === VOTE_NO) {
      cls = 'bg-red-950/85 border-red-600/70 text-red-300 hover:bg-red-900/85';
      label = '❌';
      title = 'Indisponible';
    }
    return `<button type="button" data-vote-slot="${escapeHtml(slotId)}" title="${title}" class="w-9 h-8 rounded-lg border text-sm flex items-center justify-center transition cursor-pointer mx-auto ${cls}">${label}</button>`;
  }

  function renderReadOnlyVoteBadge(voteVal) {
    const v = sanitizeVoteValue(voteVal);
    if (v === VOTE_YES) return `<span title="Disponible" class="inline-flex w-7 h-7 rounded-md bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 items-center justify-center text-xs">✅</span>`;
    if (v === VOTE_MAYBE) return `<span title="Si besoin" class="inline-flex w-7 h-7 rounded-md bg-amber-950/80 border border-amber-600/50 text-amber-300 items-center justify-center text-xs">🟡</span>`;
    if (v === VOTE_NO) return `<span title="Indisponible" class="inline-flex w-7 h-7 rounded-md bg-red-950/75 border border-red-700/50 text-red-300 items-center justify-center text-xs">❌</span>`;
    return `<span title="Non renseigné" class="inline-flex w-7 h-7 rounded-md bg-stone-900/50 border border-stone-800 text-stone-600 items-center justify-center text-[10px]">—</span>`;
  }

  function renderTopSlots() {
    const container = document.getElementById('doodle-top-slots');
    if (!container) return;

    if (state.responses.length === 0) {
      container.innerHTML = `
        <div class="p-4 rounded-xl bg-black/40 border border-stone-800 text-xs text-stone-400">
          Aucun PJ enregistré pour l'instant. Renseignez vos disponibilités ci-dessous puis cliquez sur <b>« Enregistrer mes dispos »</b> (ou collez un lien reçu sur Discord) pour faire apparaître les meilleures dates !
        </div>
      `;
      return;
    }

    const ranking = computeSlotRanking(ALL_SLOTS, state.responses);
    const best = ranking.filter(r => r.yesCount > 0 || r.maybeCount > 0).slice(0, 6);
    if (best.length === 0) {
      container.innerHTML = `
        <div class="p-4 rounded-xl bg-black/40 border border-stone-800 text-xs text-stone-400">
          Aucun créneau disponible trouvé pour le moment parmi les votes enregistrés.
        </div>
      `;
      return;
    }

    container.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">${best.map((r, i) => {
      const borderTone = r.isPerfectMatch
        ? 'border-emerald-500/75 bg-emerald-950/25'
        : r.isCompatible
          ? 'border-amber-500/60 bg-amber-950/20'
          : 'border-stone-700/70 bg-black/45';
      const crown = r.isPerfectMatch ? '🌟 Unanimité' : (i === 0 ? '🏆 Meilleur créneau' : `#${i + 1}`);
      return `
        <article class="p-3.5 rounded-xl border ${borderTone} space-y-2 flex flex-col justify-between">
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-2 text-[10px] font-imperial font-bold">
              <span class="${r.isPerfectMatch ? 'text-emerald-300' : 'text-amber-300'}">${crown}</span>
              <span class="px-2 py-0.5 rounded bg-black/60 border border-stone-700 text-stone-200 font-mono">
                ✅ ${r.yesCount} • 🟡 ${r.maybeCount} • ❌ ${r.noCount}
              </span>
            </div>
            <div class="font-bold font-imperial text-amber-100 text-xs">${escapeHtml(r.slot.fullLabel)}</div>
            <div class="text-[11px] text-stone-400 leading-snug">
              ${r.yesNames.length ? `<span class="text-emerald-300">Dispos :</span> ${escapeHtml(r.yesNames.join(', '))}` : ''}
              ${r.maybeNames.length ? `<br><span class="text-amber-300">Si besoin :</span> ${escapeHtml(r.maybeNames.join(', '))}` : ''}
              ${r.noNames.length ? `<br><span class="text-red-400">Absents :</span> ${escapeHtml(r.noNames.join(', '))}` : ''}
            </div>
          </div>
          <div class="pt-2 border-t border-stone-800/80 flex gap-2">
            <button type="button" data-announce-slot="${escapeHtml(r.slot.id)}" class="flex-1 px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-200 text-[10px] font-imperial font-bold cursor-pointer transition">
              💬 Annoncer
            </button>
            <button type="button" data-download-ics="${escapeHtml(r.slot.id)}" class="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-sky-500/40 text-sky-300 text-[10px] font-imperial font-bold cursor-pointer transition" title="Télécharger un fichier .ics pour l'agenda">
              📆 .ics
            </button>
          </div>
        </article>
      `;
    }).join('')}</div>`;
  }

  function renderParticipantsBar() {
    const box = document.getElementById('doodle-participants-list');
    const countBadge = document.getElementById('doodle-participants-count');
    if (countBadge) countBadge.textContent = `${state.responses.length} participant(s)`;
    if (!box) return;

    if (state.responses.length === 0) {
      box.innerHTML = `<span class="text-xs text-stone-500 italic">Aucun participant enregistré dans ce sondage.</span>`;
      return;
    }

    box.innerHTML = state.responses.map((p) => {
      const meta = CLAN_BADGE_META[p.clan] || CLAN_BADGE_META.crabe;
      const yesTotal = Object.values(p.votes || {}).filter(v => v === VOTE_YES).length;
      return `
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-stone-700/80 text-xs">
          <span class="px-1.5 py-0.5 rounded border text-[10px] font-serif font-bold ${meta.colorClass}">${meta.kanji}</span>
          <div class="flex flex-col">
            <button type="button" data-edit-participant="${escapeHtml(p.name)}" class="font-bold font-imperial text-amber-200 hover:underline text-left cursor-pointer" title="Charger pour modifier">${escapeHtml(p.name)}${p.fromCloud ? ' <span class="text-[10px] text-emerald-400" title="Synchronisé en temps réel">☁️</span>' : ''}</button>
            <span class="text-[10px] text-stone-400">${yesTotal} ✅ ${p.note ? `• ${escapeHtml(p.note)}` : ''}</span>
          </div>
          <button type="button" data-remove-participant="${escapeHtml(p.name)}" class="ml-1 text-stone-500 hover:text-red-400 text-xs cursor-pointer" title="Retirer du sondage">✕</button>
        </div>
      `;
    }).join('');
  }

  function renderDoodleMatrix() {
    const wrap = document.getElementById('doodle-matrix-wrap');
    if (!wrap) return;

    const groups = getFilteredWeekendGroups();
    const myYesCount = Object.values(state.currentVotes).filter(v => v === VOTE_YES).length;
    const myCountBadge = document.getElementById('doodle-my-count');
    if (myCountBadge) myCountBadge.textContent = `${myYesCount} ✅ cochés`;

    const allSlotsForRank = getFilteredSlots();
    const rankMap = new Map();
    computeSlotRanking(allSlotsForRank, state.responses).forEach(r => rankMap.set(r.slot.id, r));

    const editorNorm = normalizePlayerName(state.currentName);
    const otherParticipants = state.responses.filter(r => !editorNorm || normalizePlayerName(r.name) !== editorNorm);
    const activePlayerLabel = state.currentName.trim() || 'Mon Vote';

    const colHeaders = otherParticipants.map((p) => {
      const meta = CLAN_BADGE_META[p.clan] || CLAN_BADGE_META.crabe;
      return `
        <th class="px-2 py-2.5 text-center border-b border-amber-500/25 min-w-[78px]">
          <div class="flex flex-col items-center gap-0.5">
            <span class="px-1.5 py-0.2 rounded border text-[9px] ${meta.colorClass}">${meta.kanji}</span>
            <span class="text-[11px] font-imperial font-bold text-stone-200 truncate max-w-[92px]" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</span>
          </div>
        </th>
      `;
    }).join('');

    const rowsHtml = groups.map((g) => {
      const headerRow = `
        <tr class="bg-amber-950/30 border-y border-amber-500/25">
          <td colspan="${3 + otherParticipants.length}" class="px-3 py-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="font-imperial font-bold text-xs text-amber-300">${escapeHtml(g.title)}</span>
              <div class="flex items-center gap-1.5 text-[10px]">
                <button type="button" data-weekend-set="${escapeHtml(g.weekendKey)}" data-weekend-val="yes" class="px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-300 font-bold cursor-pointer">Tout ✅</button>
                <button type="button" data-weekend-set="${escapeHtml(g.weekendKey)}" data-weekend-val="no" class="px-2 py-0.5 rounded bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-red-300 font-bold cursor-pointer">Tout ❌</button>
                <button type="button" data-weekend-set="${escapeHtml(g.weekendKey)}" data-weekend-val="" class="px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-400 cursor-pointer">Vider</button>
              </div>
            </div>
          </td>
        </tr>
      `;

      const slotRows = g.slots.map((slot) => {
        const rankInfo = rankMap.get(slot.id);
        const totalP = rankInfo?.totalPlayers || 0;
        const yesC = rankInfo?.yesCount || 0;
        const maybeC = rankInfo?.maybeCount || 0;
        const noC = rankInfo?.noCount || 0;

        let consensusBadge = `<span class="text-[10px] text-stone-500 font-mono">—</span>`;
        if (totalP > 0) {
          const pillTone = rankInfo.isPerfectMatch
            ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300'
            : noC === 0 && yesC > 0
              ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
              : 'bg-stone-900/80 border-stone-700 text-stone-300';
          consensusBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono ${pillTone}">${yesC}${maybeC ? `+${maybeC}~` : ''}/${totalP} ✅</span>`;
        }

        const otherCells = otherParticipants.map(p => `<td class="px-2 py-1.5 text-center">${renderReadOnlyVoteBadge(p.votes?.[slot.id])}</td>`).join('');
        const periodBadge = slot.period === 'soir'
          ? `<span class="px-1.5 py-0.5 rounded bg-indigo-950/70 border border-indigo-600/40 text-indigo-300 text-[10px] font-mono">🌙 Soir</span>`
          : `<span class="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 text-[10px] font-mono">☀️ Aprèm</span>`;

        return `
          <tr class="border-b border-stone-800/60 hover:bg-white/[0.02] transition">
            <td class="px-3 py-1.5 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <span class="font-bold text-stone-200 text-xs">${escapeHtml(slot.dayLabel)}</span>
                ${periodBadge}
              </div>
            </td>
            <td class="px-2 py-1.5 text-center bg-amber-500/[0.04]">
              ${buildVoteCellButtonHtml(slot.id, state.currentVotes[slot.id])}
            </td>
            ${otherCells}
            <td class="px-3 py-1.5 text-center whitespace-nowrap">${consensusBadge}</td>
          </tr>
        `;
      }).join('');

      return headerRow + slotRows;
    }).join('');

    wrap.innerHTML = `
      <table class="w-full text-left border-collapse">
        <thead class="sticky top-0 z-10 bg-[#120e0c]/95 backdrop-blur">
          <tr>
            <th class="px-3 py-2.5 text-[11px] font-imperial font-bold text-amber-300 border-b border-amber-500/25">Créneau Week-end</th>
            <th class="px-2 py-2.5 text-center border-b border-amber-500/40 bg-amber-500/[0.08] min-w-[92px]">
              <div class="text-[10px] uppercase tracking-wider text-amber-400 font-imperial font-bold">Édition</div>
              <div class="text-[11px] font-imperial font-bold text-amber-200 truncate max-w-[100px] mx-auto">${escapeHtml(activePlayerLabel)}</div>
            </th>
            ${colHeaders}
            <th class="px-3 py-2.5 text-center text-[11px] font-imperial font-bold text-stone-300 border-b border-amber-500/25">Total</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  function renderAll() {
    syncEditorInputs();
    renderParticipantsBar();
    renderTopSlots();
    renderDoodleMatrix();
  }

  function copyTextToClipboard(text, successMsg) {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(successMsg);
    } catch (_) {
      showToast('Impossible de copier automatiquement — sélectionnez manuellement.', 'err');
    }
  }

  function buildCurrentUrlWithParam(paramName, token) {
    const base = window.location.href.split('?')[0].split('#')[0];
    return `${base}?${paramName}=${token}`;
  }

  function handleUrlImportIfPresent() {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const voteTok = params.get('vote');
    const pollTok = params.get('poll');
    const tok = pollTok ? `poll=${pollTok}` : (voteTok ? `vote=${voteTok}` : '');
    if (!tok) return;

    const decoded = decodeSharePayload(tok, ALL_SLOTS);
    if (!decoded || decoded.items.length === 0) return;

    const banner = document.getElementById('doodle-url-import-banner');
    const msgEl = document.getElementById('doodle-url-import-text');
    const names = decoded.items.map(i => i.name).join(', ');
    if (banner && msgEl) {
      msgEl.textContent = `Lien partagé détecté pour : ${names} (${decoded.items.length} fiche(s)).`;
      banner.classList.remove('hidden');
      banner.dataset.pendingToken = tok;
    }
  }

  function mergePendingUrlImport() {
    const banner = document.getElementById('doodle-url-import-banner');
    const tok = banner?.dataset?.pendingToken;
    if (!tok) return;
    const decoded = decodeSharePayload(tok, ALL_SLOTS);
    if (!decoded || decoded.items.length === 0) return;
    decoded.items.forEach((item) => {
      state.responses = upsertParticipantResponse(state.responses, item);
    });
    saveStateToStorage();
    banner.classList.add('hidden');
    if (window.history?.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    renderAll();
    showToast(`${decoded.items.length} fiche(s) fusionnée(s) dans le tableau !`);
  }

  function initSessionsPage() {
    if (typeof document === 'undefined') return;
    loadStateFromStorage();
    loadDojoCharactersPresets();
    handleUrlImportIfPresent();
    renderAll();
    bindDoodleCloudSync();

    window.addEventListener('l5r-auth-changed', () => {
      bindDoodleCloudSync();
      loadDojoCharactersPresets();
    });
    window.addEventListener('l5r-cloud-dojo-updated', loadDojoCharactersPresets);

    // Presets & Dojo click delegation
    document.addEventListener('click', (e) => {
      const presetBtn = e.target.closest('[data-select-pj]');
      if (presetBtn) {
        selectPlayerPreset(presetBtn.getAttribute('data-select-pj'), presetBtn.getAttribute('data-select-clan'));
        return;
      }
      const voteBtn = e.target.closest('[data-vote-slot]');
      if (voteBtn) {
        applyVoteToSlot(voteBtn.getAttribute('data-vote-slot'));
        return;
      }
      const wkBtn = e.target.closest('[data-weekend-set]');
      if (wkBtn) {
        applyVoteToWeekend(wkBtn.getAttribute('data-weekend-set'), wkBtn.getAttribute('data-weekend-val'));
        return;
      }
      const editBtn = e.target.closest('[data-edit-participant]');
      if (editBtn) {
        const target = state.responses.find(r => r.name === editBtn.getAttribute('data-edit-participant'));
        if (target) selectPlayerPreset(target.name, target.clan);
        return;
      }
      const rmBtn = e.target.closest('[data-remove-participant]');
      if (rmBtn) {
        const targetName = rmBtn.getAttribute('data-remove-participant');
        const existing = state.responses.find(r => normalizePlayerName(r.name) === normalizePlayerName(targetName));
        state.responses = removeParticipantResponse(state.responses, targetName);
        saveStateToStorage();
        renderAll();
        if (existing?.cloudKey && isCloudDoodleAuthorized()) {
          const fb = window.L5RFirebase;
          const s = fb.getState();
          if (s.isGm || existing.uid === s.user.uid) {
            fb.deleteDoodleEntryFromCloud(existing.cloudKey).catch(() => {});
          }
        }
        showToast(`${targetName} retiré du sondage.`, 'warn');
        return;
      }
      const annBtn = e.target.closest('[data-announce-slot]');
      if (annBtn) {
        const slotId = annBtn.getAttribute('data-announce-slot');
        const ranked = computeSlotRanking(ALL_SLOTS, state.responses).find(r => r.slot.id === slotId);
        if (ranked) {
          copyTextToClipboard(formatDiscordSessionCall(ranked), 'Annonce Discord copiée !');
        }
        return;
      }
      const icsBtn = e.target.closest('[data-download-ics]');
      if (icsBtn) {
        const slotId = icsBtn.getAttribute('data-download-ics');
        const slot = ALL_SLOTS.find(s => s.id === slotId);
        if (slot) {
          const ics = buildIcsEventContent(slot);
          const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `session-l5r-${slot.dateStr}-${slot.period}.ics`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showToast('Fichier agenda .ics téléchargé !');
        }
      }
    });

    // Inputs
    document.getElementById('doodle-player-name')?.addEventListener('input', (e) => {
      state.currentName = e.target.value;
      saveStateToStorage();
      renderDoodleMatrix();
    });
    document.getElementById('doodle-player-clan')?.addEventListener('change', (e) => {
      state.currentClan = e.target.value;
      saveStateToStorage();
    });
    document.getElementById('doodle-player-note')?.addEventListener('input', (e) => {
      state.currentNote = e.target.value;
      saveStateToStorage();
    });

    // Brush & filter controls
    document.querySelectorAll('[data-brush]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeBrush = btn.getAttribute('data-brush') || 'cycle';
        document.querySelectorAll('[data-brush]').forEach((b) => {
          b.classList.toggle('ring-2', b === btn);
          b.classList.toggle('ring-amber-400', b === btn);
        });
      });
    });

    document.querySelectorAll('[data-month-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.monthFilter = btn.getAttribute('data-month-filter') || 'all';
        document.querySelectorAll('[data-month-filter]').forEach((b) => {
          b.classList.toggle('bg-amber-600', b === btn);
          b.classList.toggle('text-black', b === btn);
          b.classList.toggle('font-bold', b === btn);
        });
        renderDoodleMatrix();
      });
    });

    document.querySelectorAll('[data-period-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.periodFilter = btn.getAttribute('data-period-filter') || 'all';
        document.querySelectorAll('[data-period-filter]').forEach((b) => {
          b.classList.toggle('bg-sky-700', b === btn);
          b.classList.toggle('text-white', b === btn);
        });
        renderDoodleMatrix();
      });
    });

    document.getElementById('btn-bulk-yes')?.addEventListener('click', () => applyBulkVisibleSlots(VOTE_YES));
    document.getElementById('btn-bulk-no')?.addEventListener('click', () => applyBulkVisibleSlots(VOTE_NO));
    document.getElementById('btn-bulk-clear')?.addEventListener('click', () => applyBulkVisibleSlots(VOTE_UNSET));

    document.getElementById('btn-save-my-vote')?.addEventListener('click', saveCurrentPlayerToGroup);

    document.getElementById('btn-copy-my-link')?.addEventListener('click', () => {
      if (!saveCurrentPlayerToGroup()) return;
      const tok = encodeVoteSharePayload(getCurrentEditorResponseObj(), ALL_SLOTS);
      copyTextToClipboard(buildCurrentUrlWithParam('vote', tok), 'Lien personnel de dispos copié !');
    });

    document.getElementById('btn-copy-discord')?.addEventListener('click', () => {
      if (!saveCurrentPlayerToGroup()) return;
      const obj = getCurrentEditorResponseObj();
      const url = buildCurrentUrlWithParam('vote', encodeVoteSharePayload(obj, ALL_SLOTS));
      copyTextToClipboard(formatDiscordPlayerSummary(obj, ALL_SLOTS, url), 'Message Discord prêt-à-coller copié !');
    });

    document.getElementById('btn-copy-poll-link')?.addEventListener('click', () => {
      if (state.responses.length === 0) {
        showToast('Enregistrez d\'abord au moins un PJ.', 'warn');
        return;
      }
      const tok = encodePollSharePayload(state.responses, ALL_SLOTS);
      copyTextToClipboard(buildCurrentUrlWithParam('poll', tok), 'Lien complet du sondage (tous PJs) copié !');
    });

    document.getElementById('btn-merge-links')?.addEventListener('click', () => {
      const ta = document.getElementById('doodle-import-input');
      const raw = ta?.value || '';
      const { imported, invalidCount } = extractAndDecodeShareInputs(raw, ALL_SLOTS);
      if (imported.length === 0) {
        showToast('Aucun lien ou code Doodle valide reconnu dans ce texte.', 'err');
        return;
      }
      imported.forEach((item) => {
        state.responses = upsertParticipantResponse(state.responses, item);
      });
      saveStateToStorage();
      if (ta) ta.value = '';
      renderAll();
      showToast(`${imported.length} fiche(s) fusionnée(s)${invalidCount ? ` (${invalidCount} invalide(s))` : ''} !`);
    });

    document.getElementById('btn-import-url-merge')?.addEventListener('click', mergePendingUrlImport);
    document.getElementById('btn-import-url-dismiss')?.addEventListener('click', () => {
      document.getElementById('doodle-url-import-banner')?.classList.add('hidden');
    });

    document.getElementById('btn-export-json')?.addEventListener('click', () => {
      const payload = JSON.stringify({
        type: 'l5r-sessions-doodle-v1',
        range: '2027-01..2027-03',
        exportedAt: new Date().toISOString(),
        responses: state.responses
      }, null, 2);
      const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dispos-jdr-janv-mars-2027.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Sauvegarde JSON téléchargée.');
    });

    document.getElementById('file-import-json')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result || '{}'));
          const list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.responses) ? parsed.responses : []);
          if (list.length === 0) {
            showToast('Ce fichier JSON ne contient aucune disponibilité.', 'warn');
            return;
          }
          list.forEach((item) => {
            state.responses = upsertParticipantResponse(state.responses, item);
          });
          saveStateToStorage();
          renderAll();
          showToast(`${list.length} fiche(s) importée(s) depuis le fichier JSON !`);
        } catch (_) {
          showToast('Fichier JSON invalide.', 'err');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initSessionsPage);
  }

  const api = {
    STORAGE_KEY,
    VOTE_YES,
    VOTE_MAYBE,
    VOTE_NO,
    VOTE_UNSET,
    PJ_PRESETS,
    generateWeekendSlots,
    groupSlotsByWeekend,
    normalizePlayerName,
    cycleVoteState,
    upsertParticipantResponse,
    removeParticipantResponse,
    computeSlotRanking,
    encodeVoteSharePayload,
    encodePollSharePayload,
    decodeSharePayload,
    extractAndDecodeShareInputs,
    formatDiscordPlayerSummary,
    formatDiscordSessionCall,
    buildIcsEventContent
  };

  if (typeof window !== 'undefined') {
    window.L5RSessions = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
