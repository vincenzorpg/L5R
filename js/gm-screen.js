/**
 * js/gm-screen.js
 * Écran du Maître du Jeu — Les Chroniques de Rokugan (L5R 4e Édition)
 * - Table horizontale des PJs (mode détaillé ou compact) + repères de groupe
 * - Escarmouche live (génération, renforts, jets cliquables, postures, 6 états, blessures)
 * - Paravent universel des règles L5R 4e avec recherche instantanée & catégories
 * - Arbitre complet du Duel Iaijutsu (3 phases + Focus auto)
 * - Onglets Honneur/Gloire (Table 2.3), Cour/Loi, Magie/Peur/Souillure (calculateurs express)
 * - Dock permanent : Lanceur Roll & Keep + Calculateur ND + Générateur PNJ + Notes de scène
 */

(function (globalScope) {
  'use strict';

  const STORAGE_KEY = 'l5r_gm_screen_v3';

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
    attaque: { label: 'Attaque', tnDelta: 0 },
    assaut: { label: 'Assaut (-10 ND, +2g1)', tnDelta: -10 },
    defense: { label: 'Défense (+Air+Déf)', tnDelta: 5 },
    esquive: { label: 'Défense Totale (Déf/Réf ÷2)', tnDelta: 10 },
    centre: { label: 'Centre (0 action ; +1g1+Vide & +10 Init tour suiv.)', tnDelta: 0 }
  };

  const STATUS_FLAGS = [
    { id: 'prone', label: 'À terre', desc: '-10 ND d\'Armure en mêlée, pas d\'arme lourde/Déplacement, -2g0 petites/moyennes, Simple pour se relever' },
    { id: 'stunned', label: 'Étourdi', desc: 'Aucune action, ND = 5 + bonus d\'Armure. Récup. Terre ND 20 (Réaction), sinon fin du Round suivant' },
    { id: 'blinded', label: 'Aveuglé', desc: 'ND base = Réflexes + 5 (+ armure) ; -3g3 attaque à distance, -1g1 mêlée ; Eau -2 (mvt), Athl./Agilité ND 20 si Simple mvt' },
    { id: 'entangled', label: 'Enchevêtré', desc: 'Aucune action sauf se libérer (Force vs ND ou Opposé 1/Round) ; saisie ennemie sans jet d\'attaque' },
    { id: 'dazed', label: 'Hébété', desc: '-3g0 à toutes actions ; Défense/Défense Totale seuls, pas de duel ; Terre ND 20 (-5/échec)' },
    { id: 'grappled', label: 'En lutte', desc: 'ND = 5 + bonus d\'Armure ; contrôle par Lutte/Force opposé au début du Tour' },
    { id: 'surprised', label: 'Embuscade', desc: 'Embuscade réussie : cible -10 à l\'Initiative pour toute l\'escarmouche (LdB p.82)' },
    { id: 'feared', label: 'Effrayé', desc: '-Xg0 à tous les jets pour la rencontre si échec Volonté + Honneur vs ND 5 + 5×X (fuite si échec ≥ 15)' }
  ];

  const ENEMY_PRESETS = [
    { name: 'Bandit / Rônin', initFormula: '4g2', armorTN: 15, reduction: 2, earth: 2, attack: '5g2', damage: '4g2', notes: 'Katana ou lance, moral fragile si Grave.' },
    { name: 'Ashigaru', initFormula: '3g2', armorTN: 18, reduction: 3, earth: 2, attack: '4g2', damage: '4g2', notes: 'Yari (lance), combat en formation.' },
    { name: 'Bushi Vétéran', initFormula: '6g3', armorTN: 25, reduction: 5, earth: 3, attack: '7g3', damage: '6g2', notes: '2 attaques/tour (Rang 3), Armure lourde.' },
    { name: 'Shugenja Adversaire', initFormula: '4g2', armorTN: 15, reduction: 0, earth: 3, attack: '5g3', damage: '4g2', notes: 'Sorts Feu/Air, garde ses distances.' },
    { name: 'Ninja / Assassin', initFormula: '7g4', armorTN: 23, reduction: 0, earth: 2, attack: '7g4', damage: '5g2', notes: 'Furtivité, poison ou armes dissimulées.' },
    { name: 'Bakemono (Gobelin)', initFormula: '4g2', armorTN: 15, reduction: 1, earth: 2, attack: '4g2', damage: '3g2', notes: 'Souillure 1+, fuit si isolé.' },
    { name: 'Oni Mineur', initFormula: '5g3', armorTN: 20, reduction: 6, earth: 4, attack: '7g3', damage: '7g3', notes: 'Peur 3, Carapace, vulnérable au Jade.' },
    { name: 'Kansen / Mort-vivant', initFormula: '3g2', armorTN: 14, reduction: 4, earth: 3, attack: '5g2', damage: '5g2', notes: 'Ignore les malus de blessures (sauf Mort).' },
    { name: 'Chuda Tenkazu (Sc.2 — Boss)', gmOnly: true, initFormula: '6g3', armorTN: 20, reduction: 0, earth: 3, attack: '6g3', damage: '6g3', notes: 'Shugenja Chuda R3 • Jadoku (ignore Réd., Terre ND 15 Souillure, +3 PV) • Maho Outremonde 7g4 • Armure d\'Obsidienne (Réd. 6 vs Jade).' },
    { name: 'Guerrier Tsuno (Sc.2)', gmOnly: true, initFormula: '5g4', armorTN: 30, reduction: 8, earth: 4, attack: '7g3', damage: '6g3', notes: 'Peur 2 (ND 15) • Invulnérabilité partielle (Réd 8 sauf Jade/Cristal) • +1g0 attaque vs cible souillée.' },
    { name: 'Shikageko / Murai (Sc.2 — Boss Acte II)', gmOnly: true, initFormula: '7g4', armorTN: 25, reduction: 4, earth: 3, attack: '8g4', damage: '4g3', notes: '2 att./round • Peur 3 (ND 20) • Poison (End. ND 15 ou -1g0) • ND chute à 15 si Murai reprend le contrôle.' },
    { name: 'Zombie de Sang (Sc.2)', gmOnly: true, initFormula: '2g1', armorTN: 10, reduction: 3, earth: 2, attack: '4g2', damage: '3g2', notes: '30 PV fixes • Insensible aux malus • Détruit instantanément si le brasero de Minerai de Sang est brisé.' },
    { name: 'Éclaireur Kuroiban (Sc.2)', gmOnly: true, initFormula: '7g3', armorTN: 25, reduction: 3, earth: 3, attack: '7g4', damage: '5g2', notes: 'Shuriken empoisonnés 6g4 (Endurance ND 20 ou sommeil).' }
  ];

  const DUEL_PRESETS = [
    { name: 'Rônin Duelliste', iai: 3, per: 3, void: 2, agi: 3, tn: 18, earth: 2, damage: '4g2' },
    { name: 'Bushi Lion Impétueux', iai: 3, per: 2, void: 3, agi: 4, tn: 22, earth: 3, damage: '5g2' },
    { name: 'Duelliste Grue Kakita', iai: 5, per: 4, void: 3, agi: 4, tn: 25, earth: 2, damage: '5g2' },
    { name: 'Champion d\'École (Rang 4)', iai: 6, per: 4, void: 4, agi: 4, tn: 25, earth: 3, damage: '6g2' }
  ];

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeSearchText(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function uid(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function clampRankTen(val) {
    return Math.max(0, Math.min(10, Math.round((Number(val) || 0) * 10) / 10));
  }

  // ===========================================================================
  // MOTEUR ROLL & KEEP (POUR INITIATIVE, LANCEUR MJ & DUEL)
  // ===========================================================================
  function parseRollKeepFormula(formulaStr) {
    const str = String(formulaStr || '').trim();
    const match = str.match(/(\d+)\s*[gk]\s*(\d+)(?:\s*([+-])\s*(\d+))?/i);
    if (!match) return { rolled: 0, kept: 0, bonus: 0 };
    const rolled = parseInt(match[1], 10) || 0;
    const kept = parseInt(match[2], 10) || 0;
    let bonus = 0;
    if (match[4] !== undefined) {
      const sign = match[3] === '-' ? -1 : 1;
      bonus = sign * (parseInt(match[4], 10) || 0);
    }
    return { rolled, kept, bonus };
  }

  function applyTenDiceRule(rollX, keepY, bonus = 0) {
    let r = Math.max(0, parseInt(rollX, 10) || 0);
    let k = Math.max(0, parseInt(keepY, 10) || 0);
    let b = parseInt(bonus, 10) || 0;
    if (k > r) k = r;

    if (r > 10) {
      let excessR = r - 10;
      r = 10;
      if (k < 10) {
        const canConvert = Math.min(Math.floor(excessR / 2), 10 - k);
        k += canConvert;
        excessR -= canConvert * 2;
      }
      if (k >= 10 && excessR > 0) {
        b += excessR * 2;
      }
    }
    if (k > 10) {
      const excessK = k - 10;
      k = 10;
      b += excessK * 2;
    }
    return { rolled: r, kept: k, bonus: b };
  }

  function simulateRollAndKeep(rollX, keepY, bonus = 0, options = {}) {
    const x = Math.max(0, parseInt(rollX, 10) || 0);
    const y = Math.max(0, parseInt(keepY, 10) || 0);
    const b = parseInt(bonus, 10) || 0;
    const explode = options.explode !== undefined ? Boolean(options.explode) : true;
    const spec = Boolean(options.spec);
    const maxExplosions = options.maxExplosions !== undefined ? parseInt(options.maxExplosions, 10) : 5;
    const rng = typeof options.rng === 'function' ? options.rng : Math.random;
    const rollD10 = () => Math.floor(rng() * 10) + 1;

    const dice = [];
    for (let i = 0; i < x; i++) {
      let dieVal = rollD10();
      if (spec && dieVal === 1) dieVal = rollD10();
      let totalDie = dieVal;
      let explodedTimes = 0;
      while (explode && dieVal === 10 && explodedTimes < maxExplosions) {
        dieVal = rollD10();
        totalDie += dieVal;
        explodedTimes++;
      }
      dice.push({ value: totalDie, exploded: explodedTimes > 0 });
    }

    dice.sort((a, bItem) => bItem.value - a.value);
    const kept = dice.slice(0, y);
    const dropped = dice.slice(y);
    const total = kept.reduce((acc, d) => acc + d.value, 0) + b;
    return { dice, kept, dropped, bonus: b, total };
  }

  function formatRollResult(sim) {
    const kept = Array.isArray(sim && sim.kept) ? sim.kept : [];
    const dropped = Array.isArray(sim && sim.dropped) ? sim.dropped : [];
    const formatDie = (d) => (d && typeof d === 'object' ? `${d.value}${d.exploded ? '*' : ''}` : String(d));
    return {
      total: Number(sim && sim.total) || 0,
      kept,
      dropped,
      bonus: Number(sim && sim.bonus) || 0,
      keptRolls: kept.map(formatDie),
      droppedRolls: dropped.map(formatDie)
    };
  }

  function rollFormula(formulaStr, options = {}) {
    const parsed = parseRollKeepFormula(formulaStr);
    if (!parsed || parsed.rolled <= 0 || parsed.kept <= 0) return null;
    const penalty = Math.max(0, parseInt(options.penalty, 10) || 0);
    const capped = applyTenDiceRule(parsed.rolled, parsed.kept, parsed.bonus - penalty);
    const sim = simulateRollAndKeep(capped.rolled, capped.kept, capped.bonus, options);
    const formatted = formatRollResult(sim);
    const netBonus = capped.bonus;
    const labelFormula = `${capped.rolled}g${capped.kept}${netBonus ? (netBonus > 0 ? `+${netBonus}` : netBonus) : ''}`;
    return { formula: labelFormula, rawFormula: String(formulaStr || '').trim(), penalty, ...formatted };
  }

  // ===========================================================================
  // CALCULS L5R 4e (BLESSURES, ND EFFECTIF, DUEL, MAGIE, RÈGLES)
  // ===========================================================================
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

  function computeEffectiveCombatantTN(combatant, linkedPc = null) {
    const baseTN = Math.max(5, Number(combatant && combatant.armorTN) || 15);
    const statuses = Array.isArray(combatant && combatant.statuses) ? combatant.statuses : [];
    const armorBonus = linkedPc && linkedPc.armorBonus != null
      ? Number(linkedPc.armorBonus) || 0
      : 0;

    if (statuses.includes('stunned') || statuses.includes('grappled')) {
      const lbl = statuses.includes('stunned') ? 'Étourdi' : 'En lutte';
      return {
        effectiveTN: 5 + armorBonus,
        note: `${lbl} (5 + armure ${armorBonus})`
      };
    }

    const stanceKey = (combatant && combatant.stance) || 'attaque';
    let stanceDelta = (STANCES[stanceKey] && STANCES[stanceKey].tnDelta) || 0;
    if (stanceKey === 'defense' && linkedPc && linkedPc.defenseBonus > 0) {
      stanceDelta = linkedPc.defenseBonus;
    }

    let currentBase = baseTN;
    if (statuses.includes('blinded')) {
      const reflexes = linkedPc && linkedPc.traits && linkedPc.traits.reflexes != null
        ? Number(linkedPc.traits.reflexes) || 2
        : Math.max(1, Math.round((baseTN - armorBonus - 5) / 5));
      currentBase = reflexes + 5 + armorBonus;
    }

    const proneDelta = statuses.includes('prone') ? -10 : 0;
    const notes = [];
    if (statuses.includes('blinded')) notes.push(`Aveuglé (base Réfl.+5+${armorBonus})`);
    if (statuses.includes('prone')) notes.push('Mêlée (-10 À terre)');

    return {
      effectiveTN: Math.max(5, currentBase + stanceDelta + proneDelta),
      note: notes.join(' • ')
    };
  }

  function computeIaijutsuFocusVerdict(scoreA, scoreB, nameA = 'Duelliste A', nameB = 'Duelliste B') {
    const a = parseInt(scoreA, 10);
    const b = parseInt(scoreB, 10);
    if (isNaN(a) || isNaN(b)) {
      return { ready: false, simultaneous: false, winner: null, gap: 0, freeRaises: 0, text: 'Entrez les scores A et B.' };
    }
    const gap = Math.abs(a - b);
    if (gap < 5) {
      return {
        ready: true,
        simultaneous: true,
        winner: null,
        gap,
        freeRaises: 0,
        text: `Écart ${gap} (< 5) : Frappe Karmique simultanée ! Aucune Augmentation gratuite.`
      };
    }
    const winner = a > b ? 'a' : 'b';
    const winnerName = winner === 'a' ? nameA : nameB;
    const freeRaises = Math.floor((gap - 5) / 5);
    return {
      ready: true,
      simultaneous: false,
      winner,
      gap,
      freeRaises,
      text: `${winnerName} frappe en premier (écart ${gap}) avec +${freeRaises} Aug. gratuite(s) !`
    };
  }

  function computeMagicCastParams(ring = 3, schoolRank = 2, mastery = 1, raises = 0, affinityMode = 'normal') {
    const r = Math.max(1, Math.min(10, parseInt(ring, 10) || 1));
    const sr = Math.max(1, Math.min(10, parseInt(schoolRank, 10) || 1));
    const m = Math.max(1, Math.min(6, parseInt(mastery, 10) || 1));
    const aug = Math.max(0, Math.min(10, parseInt(raises, 10) || 0));

    let effectiveRank = sr;
    if (affinityMode === 'affinity') effectiveRank += 1;
    if (affinityMode === 'deficiency') effectiveRank = Math.max(0, effectiveRank - 1);

    const tn = 5 + m * 5 + aug * 5;
    if (effectiveRank <= 0) {
      return {
        formula: 'Impossible (Rang effectif 0)',
        tn,
        effectiveRank: 0,
        cannotCast: true
      };
    }
    const capped = applyTenDiceRule(r + effectiveRank, r, 0);
    const bonusStr = capped.bonus ? (capped.bonus > 0 ? `+${capped.bonus}` : String(capped.bonus)) : '';
    return {
      formula: `${capped.rolled}g${capped.kept}${bonusStr}`,
      tn,
      effectiveRank,
      cannotCast: false
    };
  }

  function filterGmRulesCards(cards, category = 'all', query = '') {
    const list = Array.isArray(cards) ? cards : [];
    const cat = String(category || 'all');
    const q = normalizeSearchText(query);
    return list.filter((card) => {
      if (cat !== 'all' && card.category !== cat) return false;
      if (!q) return true;
      const haystack = normalizeSearchText(
        `${card.title} ${card.badge} ${card.summary} ${card.keywords || ''} ${(card.items || []).map((i) => `${i.label} ${i.text}`).join(' ')}`
      );
      return haystack.includes(q);
    });
  }

  function generateRandomNpcSummary(parts, rng = Math.random) {
    const data = parts || {};
    const pick = (arr) => (Array.isArray(arr) && arr.length ? arr[Math.floor(rng() * arr.length)] : '');
    const clanObj = pick(data.clans) || { clan: 'Rônin', families: ['Rônin'] };
    const family = pick(clanObj.families);
    const given = pick(data.givenNames) || 'Kenji';
    const fullName = family === 'Rônin' ? `${given} (Rônin)` : `${family} ${given}`;
    return {
      name: fullName,
      clan: clanObj.clan || 'Rônin',
      demeanor: pick(data.demeanors),
      secret: pick(data.secrets)
    };
  }

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

    const defenseSkill = skills.find((s) => /d[ée]fense|defense/i.test(s.name));
    const defenseBonus = air + (defenseSkill ? defenseSkill.rank : 0);

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
      includedInSkirmish: true,
      woundPenaltyDelta,
      armorName: String(armorObj.name || 'Aucune / Kimono').trim(),
      armorBonus,
      armorTN: totalTN,
      reduction,
      defenseBonus,
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

  function sortCombatantsByInit(combatants) {
    return [...combatants].sort((a, b) => {
      const diff = (Number(b.initiative) || 0) - (Number(a.initiative) || 0);
      if (diff !== 0) return diff;
      if (a.type !== b.type) return a.type === 'pc' ? -1 : 1;
      return String(a.name || '').localeCompare(String(b.name || ''), 'fr');
    });
  }

  function createEnemyCombatants(npcCount, npcTemplate, existingCount = 0, rng = undefined) {
    const count = Math.max(0, Math.min(20, parseInt(npcCount, 10) || 0));
    const template = npcTemplate || ENEMY_PRESETS[0];
    const baseName = String(template.name || 'Adversaire').trim();
    const initFormula = String(template.initFormula || '4g2').trim();
    const list = [];

    for (let i = 1; i <= count; i++) {
      const rolledInit = rollFormula(initFormula, { rng });
      const initScore = rolledInit ? rolledInit.total : 14;
      const num = existingCount + i;
      list.push({
        id: uid('foe'),
        pcId: null,
        type: 'enemy',
        name: count > 1 || existingCount > 0 ? `${baseName} #${num}` : baseName,
        initiative: initScore,
        armorTN: Number(template.armorTN) || 15,
        reduction: Number(template.reduction) || 0,
        earth: Math.max(1, parseInt(template.earth, 10) || 2),
        wounds: 0,
        stance: 'attaque',
        statuses: [],
        attack: String(template.attack || '5g2'),
        damage: String(template.damage || '4g2'),
        notes: String(template.notes || '')
      });
    }
    return list;
  }

  function buildSkirmishCombatants(pcs, options = {}) {
    const combatants = [];
    const rng = options.rng;

    (pcs || []).forEach((pc) => {
      if (pc.includedInSkirmish === false) return;
      let initScore = pc.lastInit;
      if (initScore === null || initScore === undefined || initScore === '' || isNaN(Number(initScore))) {
        const rolled = rollFormula(pc.initFormula || '3g2', { rng });
        initScore = rolled ? rolled.total : 15;
      }
      combatants.push({
        id: uid('cmb'),
        pcId: pc.id,
        type: 'pc',
        name: pc.name,
        initiative: Number(initScore),
        armorTN: pc.armorTN || 15,
        reduction: pc.reduction || 0,
        earth: (pc.rings && pc.rings.earth) || 2,
        wounds: pc.wounds || 0,
        stance: 'attaque',
        statuses: [],
        attack: pc.weapons && pc.weapons[0] ? `${pc.traits.agility + 2}g${pc.traits.agility}` : '5g2',
        damage: pc.weapons && pc.weapons[0] && pc.weapons[0].damage ? pc.weapons[0].damage : '4g2',
        notes: pc.school || ''
      });
    });

    const npcs = createEnemyCombatants(options.npcCount, options.npcTemplate, 0, rng);
    combatants.push(...npcs);
    return sortCombatantsByInit(combatants);
  }

  // ===========================================================================
  // ÉTAT APPLICATIF & PERSISTANCE LOCALSTORAGE
  // ===========================================================================
  let state = {
    activeTab: 'skirmish',
    compactPcs: false,
    rulesCategory: 'all',
    rulesQuery: '',
    pcs: [],
    combat: {
      round: 1,
      activeIndex: 0,
      combatants: []
    },
    duel: {
      aName: 'Duelliste A (PJ)',
      aPcId: '',
      aIai: 3,
      aPer: 3,
      aVoid: 3,
      aAgi: 3,
      aTN: 20,
      aDamage: '5g2',
      aFocus: 0,
      bName: 'Rônin Duelliste',
      bIai: 3,
      bPer: 3,
      bVoid: 2,
      bAgi: 3,
      bTN: 18,
      bDamage: '4g2',
      bFocus: 0,
      scoreA: '',
      scoreB: ''
    },
    diceHistory: [],
    combatLog: [],
    gmScratchpad: '',
    scenario: {
      selectedId: 'scenario-2-jouets',
      checked: {}
    }
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
          compactPcs: Boolean(parsed.compactPcs),
          rulesCategory: parsed.rulesCategory || 'all',
          rulesQuery: String(parsed.rulesQuery || ''),
          pcs: Array.isArray(parsed.pcs) ? parsed.pcs : [],
          combat: parsed.combat && typeof parsed.combat === 'object'
            ? {
                round: Math.max(1, parseInt(parsed.combat.round, 10) || 1),
                activeIndex: Math.max(0, parseInt(parsed.combat.activeIndex, 10) || 0),
                combatants: Array.isArray(parsed.combat.combatants) ? parsed.combat.combatants : []
              }
            : { round: 1, activeIndex: 0, combatants: [] },
          duel: parsed.duel && typeof parsed.duel === 'object' ? { ...state.duel, ...parsed.duel } : state.duel,
          diceHistory: Array.isArray(parsed.diceHistory) ? parsed.diceHistory.slice(0, 8) : [],
          combatLog: Array.isArray(parsed.combatLog) ? parsed.combatLog.slice(0, 40) : [],
          gmScratchpad: String(parsed.gmScratchpad || ''),
          scenario: parsed.scenario && typeof parsed.scenario === 'object'
            ? {
                selectedId: String(parsed.scenario.selectedId || 'scenario-2-jouets'),
                checked: parsed.scenario.checked && typeof parsed.scenario.checked === 'object' ? parsed.scenario.checked : {}
              }
            : state.scenario
        };
      }
    } catch (e) {
      console.warn('Impossible de charger l\'Écran du MJ :', e);
    }
  }

  // ===========================================================================
  // LANCEUR ROLL & KEEP + HISTORIQUE DOCK MJ
  // ===========================================================================
  function executeGmDiceRoll(formulaStr, label = '', overridePenalty = null) {
    const formulaInput = document.getElementById('gm-dice-formula');
    const explodeEl = document.getElementById('gm-dice-explode');
    const specEl = document.getElementById('gm-dice-spec');
    const penaltyEl = document.getElementById('gm-dice-penalty');

    const formula = String(formulaStr || (formulaInput && formulaInput.value) || '').trim();
    if (!formula) return null;

    if (formulaInput && formulaStr) formulaInput.value = formula;
    const penalty = overridePenalty !== null
      ? Math.max(0, parseInt(overridePenalty, 10) || 0)
      : Math.max(0, parseInt(penaltyEl && penaltyEl.value, 10) || 0);
    if (penaltyEl && overridePenalty !== null) penaltyEl.value = String(penalty);

    const res = rollFormula(formula, {
      explode: explodeEl ? explodeEl.checked : true,
      spec: specEl ? specEl.checked : false,
      penalty
    });
    if (!res) return null;

    const entry = {
      id: uid('roll'),
      label: label || `Jet ${res.rawFormula}`,
      formula: res.formula,
      total: res.total,
      keptRolls: res.keptRolls,
      droppedRolls: res.droppedRolls,
      penalty
    };
    state.diceHistory = [entry, ...state.diceHistory].slice(0, 8);
    saveState();
    renderDicePanel(entry);
    return entry;
  }

  function renderDicePanel(latestEntry = null) {
    const resultEl = document.getElementById('gm-dice-result');
    const historyEl = document.getElementById('gm-dice-history');
    const current = latestEntry || state.diceHistory[0] || null;

    if (resultEl) {
      if (!current) {
        resultEl.innerHTML = '<span class="text-[11px] text-stone-500 italic text-center">Cliquez sur Lancer (ou sur n\'importe quel jet du tableau de combat).</span>';
      } else {
        const keptHtml = current.keptRolls.map((r) =>
          `<span class="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/50 text-amber-200 font-mono font-bold text-[11px]">${escapeHtml(r)}</span>`
        ).join('');
        const droppedHtml = current.droppedRolls.map((r) =>
          `<span class="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-500 font-mono text-[10px]">${escapeHtml(r)}</span>`
        ).join('');
        resultEl.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <div class="min-w-0">
              <div class="text-[10px] text-amber-300/90 font-imperial truncate">${escapeHtml(current.label)}</div>
              <div class="text-[10px] text-stone-400 font-mono">${escapeHtml(current.formula)}${current.penalty ? ` (malus -${current.penalty})` : ''}</div>
            </div>
            <div class="text-2xl font-black font-mono gold-text shrink-0">${current.total}</div>
          </div>
          <div class="flex flex-wrap gap-1 mt-2">${keptHtml}${droppedHtml}</div>
        `;
      }
    }

    if (historyEl) {
      historyEl.innerHTML = state.diceHistory.slice(1).map((item) => `
        <div class="flex items-center justify-between gap-2 px-2 py-1 rounded bg-black/30 border border-stone-800/70">
          <span class="text-stone-400 truncate">${escapeHtml(item.label)} <span class="font-mono text-stone-500">(${escapeHtml(item.formula)})</span></span>
          <b class="font-mono text-amber-300 shrink-0">${item.total}</b>
        </div>
      `).join('');
    }
  }

  // ===========================================================================
  // ACTIONS MÉTIER
  // ===========================================================================
  function findPc(pcId) {
    return state.pcs.find((p) => p.id === pcId) || null;
  }

  function adjustWoundsForTarget(targetType, targetId, delta) {
    if (targetType === 'pc') {
      const pc = findPc(targetId);
      if (pc) pc.wounds = Math.max(0, (pc.wounds || 0) + delta);
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
      if (pc) pc.wounds = val;
    } else {
      const c = state.combat.combatants.find((item) => item.id === targetId);
      if (!c) return;
      if (c.pcId) {
        const pc = findPc(c.pcId);
        if (pc) pc.wounds = val;
      } else {
        c.wounds = val;
      }
      if (delta !== 0) {
        pushCombatLog(`${c.name} : ${delta > 0 ? '+' + delta : delta} Blessures (total ${c.wounds})`);
      }
    }
    saveState();
    renderAll();
  }

  function getSelectedNpcTemplate() {
    const presetVal = document.getElementById('gm-skirmish-npc-preset')?.value;
    const idx = presetVal === 'custom' ? NaN : parseInt(presetVal, 10);
    if (!isNaN(idx) && ENEMY_PRESETS[idx]) {
      return {
        ...ENEMY_PRESETS[idx],
        name: document.getElementById('gm-enemy-name')?.value || ENEMY_PRESETS[idx].name,
        initFormula: document.getElementById('gm-enemy-init-formula')?.value || ENEMY_PRESETS[idx].initFormula,
        armorTN: document.getElementById('gm-enemy-tn')?.value || ENEMY_PRESETS[idx].armorTN,
        reduction: document.getElementById('gm-enemy-red')?.value || ENEMY_PRESETS[idx].reduction,
        earth: document.getElementById('gm-enemy-earth')?.value || ENEMY_PRESETS[idx].earth,
        attack: document.getElementById('gm-enemy-attack')?.value || ENEMY_PRESETS[idx].attack,
        damage: document.getElementById('gm-enemy-damage')?.value || ENEMY_PRESETS[idx].damage,
        notes: document.getElementById('gm-enemy-notes')?.value || ENEMY_PRESETS[idx].notes
      };
    }
    return {
      name: document.getElementById('gm-enemy-name')?.value || 'Adversaire',
      initFormula: document.getElementById('gm-enemy-init-formula')?.value || '4g2',
      armorTN: document.getElementById('gm-enemy-tn')?.value || 15,
      reduction: document.getElementById('gm-enemy-red')?.value || 0,
      earth: document.getElementById('gm-enemy-earth')?.value || 2,
      attack: document.getElementById('gm-enemy-attack')?.value || '5g2',
      damage: document.getElementById('gm-enemy-damage')?.value || '4g2',
      notes: document.getElementById('gm-enemy-notes')?.value || ''
    };
  }

  function generateSkirmishFromUi() {
    const npcCountEl = document.getElementById('gm-skirmish-npc-count');
    const npcCount = npcCountEl ? parseInt(npcCountEl.value, 10) : 0;
    const npcTemplate = getSelectedNpcTemplate();

    const combatants = buildSkirmishCombatants(state.pcs, {
      npcCount: isNaN(npcCount) ? 0 : npcCount,
      npcTemplate
    });

    combatants.forEach((c) => {
      if (c.pcId) {
        const pc = findPc(c.pcId);
        if (pc) pc.lastInit = c.initiative;
      }
    });

    state.combat = {
      round: 1,
      activeIndex: 0,
      combatants
    };
    pushCombatLog(`Escarmouche générée (${combatants.length} combattant(s))`);
    saveState();
    renderAll();
  }

  function addReinforcementsFromUi() {
    const npcCountEl = document.getElementById('gm-skirmish-npc-count');
    const npcCount = Math.max(1, parseInt(npcCountEl && npcCountEl.value, 10) || 1);
    const npcTemplate = getSelectedNpcTemplate();
    const existingEnemies = state.combat.combatants.filter((c) => c.type === 'enemy').length;
    const reinforcements = createEnemyCombatants(npcCount, npcTemplate, existingEnemies);
    state.combat.combatants = sortCombatantsByInit([...state.combat.combatants, ...reinforcements]);
    pushCombatLog(`+${reinforcements.length} renfort(s) : ${npcTemplate.name}`);
    saveState();
    renderCombat();
  }

  function applyPcToDuelA(pc) {
    if (!pc) return;
    const iaiSkill = pc.skills.find((s) => /iaijutsu/i.test(s.name));
    state.duel.aPcId = pc.id;
    state.duel.aName = pc.name;
    state.duel.aIai = iaiSkill ? iaiSkill.rank : 1;
    state.duel.aPer = pc.traits.awareness ?? pc.traits.perception;
    state.duel.aVoid = pc.rings.void;
    state.duel.aAgi = pc.traits.reflexes ?? pc.traits.agility;
    state.duel.aTN = pc.armorTN;
    state.duel.aDamage = pc.weapons[0] && pc.weapons[0].damage ? pc.weapons[0].damage : '5g2';
  }

  // ===========================================================================
  // RENDU INTERFACE
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

  function formatPenaltyText(wState) {
    if (wState.penalty === null) return wState.label;
    if (wState.penalty === 0) return 'Indemne (0)';
    return `${wState.label} (+${wState.penalty} ND)`;
  }

  function renderTabs() {
    document.querySelectorAll('[data-gm-tab]').forEach((btn) => {
      const tabId = btn.getAttribute('data-gm-tab');
      const isActive = tabId === state.activeTab;
      btn.setAttribute('aria-selected', String(isActive));
      btn.className = isActive
        ? 'px-3.5 py-2 rounded-lg border border-amber-400 bg-amber-600 text-black font-bold text-xs font-imperial cursor-pointer transition shadow'
        : 'px-3.5 py-2 rounded-lg border border-stone-700 bg-stone-900/70 hover:bg-stone-800 text-stone-300 text-xs font-imperial cursor-pointer transition';
    });

    document.querySelectorAll('[data-gm-panel]').forEach((panel) => {
      panel.classList.toggle('hidden', panel.getAttribute('data-gm-panel') !== state.activeTab);
    });
  }

  function renderPcs() {
    const container = document.getElementById('gm-pcs-grid');
    const countEl = document.getElementById('gm-pc-count');
    const summaryEl = document.getElementById('gm-party-summary');
    const compactBtn = document.getElementById('gm-toggle-pcs-compact');
    if (countEl) countEl.textContent = String(state.pcs.length);
    if (compactBtn) compactBtn.textContent = state.compactPcs ? 'Mode Détaillé PJs' : 'Mode Compact PJs';

    if (summaryEl) {
      if (state.pcs.length === 0) {
        summaryEl.innerHTML = '';
      } else {
        const maxPer = Math.max(...state.pcs.map((p) => (p.traits && p.traits.perception) || 2));
        const maxAwr = Math.max(...state.pcs.map((p) => (p.traits && p.traits.awareness) || 2));
        const avgHonor = (state.pcs.reduce((s, p) => s + (p.honor || 0), 0) / state.pcs.length).toFixed(1);
        const woundedCount = state.pcs.filter((p) => (p.wounds || 0) > 0).length;
        summaryEl.innerHTML = `
          <span class="px-2 py-0.5 rounded bg-black/50 border border-stone-800 text-stone-300" title="Meilleure Perception / Intuition du groupe">Per max <b class="text-sky-300">${maxPer}</b> • Int max <b class="text-teal-300">${maxAwr}</b></span>
          <span class="px-2 py-0.5 rounded bg-black/50 border border-stone-800 text-stone-300">Honneur moy. <b class="text-amber-300">${avgHonor}</b></span>
          <span class="px-2 py-0.5 rounded bg-black/50 border border-stone-800 text-stone-300">${woundedCount === 0 ? '<b class="text-emerald-300">Tous indemnes</b>' : `<b class="text-orange-300">${woundedCount}</b> blessé(s)`}</span>
        `;
      }
    }

    if (!container) return;

    if (state.pcs.length === 0) {
      container.innerHTML = `
        <div class="col-span-full card-clean rounded-xl p-5 text-center border-dashed border-amber-500/30 space-y-2">
          <div class="text-2xl">📜</div>
          <p class="text-sm font-imperial text-amber-300">Aucun PJ importé sur la table</p>
          <p class="text-xs text-stone-400">Importez vos fichiers <b>.json</b> ou cliquez sur <b>« 4 PJs d'exemple »</b> pour afficher vos fiches en direct.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = state.pcs.map((pc) => {
      const wState = computeL5RWoundState(pc.wounds, pc.rings.earth, { woundPenaltyDelta: pc.woundPenaltyDelta });
      const voidDots = Array.from({ length: pc.voidMax }, (_, idx) => {
        const filled = idx < pc.voidCurrent;
        return `<button type="button" data-action="set-void" data-pc-id="${escapeHtml(pc.id)}" data-void-val="${filled && idx === pc.voidCurrent - 1 ? idx : idx + 1}" class="w-3 h-3 rounded-full border transition cursor-pointer ${filled ? 'bg-purple-500 border-purple-300' : 'bg-stone-900 border-stone-600 hover:border-purple-400'}"></button>`;
      }).join('');

      if (state.compactPcs) {
        return `
          <article class="card-clean rounded-xl p-2.5 space-y-1.5 border border-amber-500/25" data-pc-card="${escapeHtml(pc.id)}">
            <div class="flex items-center justify-between gap-2">
              <div class="min-w-0">
                <h3 class="font-imperial font-bold text-xs text-amber-300 truncate">${escapeHtml(pc.name)}</h3>
                <p class="text-[10px] text-stone-400 truncate">ND <b>${pc.armorTN}</b> (R${pc.reduction}) • Terre ${pc.rings.earth} • Vid ${pc.voidCurrent}/${pc.voidMax}</p>
              </div>
              <button type="button" data-action="remove-pc" data-pc-id="${escapeHtml(pc.id)}" class="px-1.5 py-0.5 rounded bg-stone-900 hover:bg-red-950 border border-stone-700 text-[10px] text-stone-400 hover:text-red-300 cursor-pointer shrink-0">✕</button>
            </div>
            <div class="flex items-center justify-between gap-1 text-[10px]">
              <span class="px-1.5 py-0.5 rounded border font-bold ${woundBadgeClass(wState.color)}">${escapeHtml(formatPenaltyText(wState))}</span>
              <span class="font-mono text-stone-300">${wState.wounds}/${wState.maxWounds}</span>
            </div>
            <div class="flex items-center justify-between gap-1">
              <div class="flex items-center gap-1">
                <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="-5" class="px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-700/50 text-[10px] text-emerald-300 cursor-pointer">-5</button>
                <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="1" class="px-1.5 py-0.5 rounded bg-red-950/70 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+1</button>
                <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="5" class="px-1.5 py-0.5 rounded bg-red-950/70 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+5</button>
              </div>
              <div class="flex items-center gap-0.5">${voidDots}</div>
            </div>
          </article>
        `;
      }

      const topSkills = pc.skills.slice(0, 6).map((sk) =>
        `<span class="px-1.5 py-0.5 rounded bg-black/40 border border-stone-800 text-[10px] text-stone-300">${escapeHtml(sk.name)} <b class="text-amber-300">${sk.rank}</b></span>`
      ).join('');

      return `
        <article class="card-clean rounded-xl p-3 space-y-2 border border-amber-500/25 flex flex-col justify-between" data-pc-card="${escapeHtml(pc.id)}">
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-2 border-b border-amber-500/20 pb-1.5">
              <div class="min-w-0">
                <h3 class="font-imperial font-bold text-sm text-amber-300 truncate">${escapeHtml(pc.name)}</h3>
                <p class="text-[10px] text-stone-400 truncate">${escapeHtml(pc.clan.toUpperCase())} • Rang ${pc.insightRank}${pc.school ? ' • ' + escapeHtml(pc.school) : ''}</p>
              </div>
              <button type="button" data-action="remove-pc" data-pc-id="${escapeHtml(pc.id)}" class="px-1.5 py-0.5 rounded bg-stone-900 hover:bg-red-950 border border-stone-700 text-[10px] text-stone-400 hover:text-red-300 cursor-pointer shrink-0">✕</button>
            </div>

            <div class="grid grid-cols-5 gap-1 text-center text-[10px]">
              <div class="p-1 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Ter</span><b class="text-emerald-300">${pc.rings.earth}</b></div>
              <div class="p-1 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Eau</span><b class="text-sky-300">${pc.rings.water}</b></div>
              <div class="p-1 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Air</span><b class="text-teal-300">${pc.rings.air}</b></div>
              <div class="p-1 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Feu</span><b class="text-orange-300">${pc.rings.fire}</b></div>
              <div class="p-1 rounded bg-black/40 border border-stone-800"><span class="block text-stone-400">Vid</span><b class="text-purple-300">${pc.rings.void}</b></div>
            </div>

            <div class="flex items-center justify-between text-[11px] bg-black/30 rounded px-2 py-1 border border-stone-800/80">
              <span title="ND Assaut : ${Math.max(5, pc.armorTN - 10)} • ND Défense : ${pc.armorTN + pc.defenseBonus}">ND <b class="text-amber-300">${pc.armorTN}</b> <span class="text-stone-500">(Réd ${pc.reduction})</span></span>
              <button type="button" data-action="roll-formula" data-formula="${escapeHtml(pc.initFormula)}" data-roll-label="Initiative ${escapeHtml(pc.name)}" class="hover:underline cursor-pointer" title="Lancer l'initiative de ${escapeHtml(pc.name)}">
                Init <b class="font-mono text-amber-200">${escapeHtml(pc.initFormula)} 🎲</b>
              </button>
            </div>

            <div class="flex items-center justify-between text-[10px] bg-purple-950/20 border border-purple-800/30 rounded px-2 py-1">
              <span class="text-purple-300 font-imperial">Vide (${pc.voidCurrent}/${pc.voidMax})</span>
              <div class="flex items-center gap-1">${voidDots}</div>
            </div>

            <div class="p-2 rounded-lg bg-black/40 border border-stone-800 space-y-1.5">
              <div class="flex items-center justify-between gap-1 text-[10px]">
                <span class="px-1.5 py-0.5 rounded border font-bold ${woundBadgeClass(wState.color)}">${escapeHtml(formatPenaltyText(wState))}</span>
                <span class="font-mono text-stone-300"><b>${wState.wounds}</b>/${wState.maxWounds}</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
                <div class="h-full transition-all duration-200 ${woundBarColor(wState.color)}" style="width: ${wState.percent}%"></div>
              </div>
              <div class="flex items-center justify-between gap-1">
                <div class="flex items-center gap-1">
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="-5" class="px-1.5 py-0.5 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/50 text-[10px] text-emerald-300 cursor-pointer">-5</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="-1" class="px-1.5 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/40 text-[10px] text-emerald-200 cursor-pointer">-1</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="1" class="px-1.5 py-0.5 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+1</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="5" class="px-1.5 py-0.5 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+5</button>
                  <button type="button" data-action="wound-delta" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" data-delta="10" class="px-1.5 py-0.5 rounded bg-red-950/80 hover:bg-red-800 border border-red-600/60 text-[10px] font-bold text-red-200 cursor-pointer">+10</button>
                </div>
                <button type="button" data-action="wound-reset" data-target-type="pc" data-target-id="${escapeHtml(pc.id)}" class="px-1.5 py-0.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[10px] text-stone-300 cursor-pointer">0</button>
              </div>
            </div>

            <details class="group text-[10px] border border-stone-800/80 rounded bg-black/25">
              <summary class="px-2 py-1 cursor-pointer font-imperial text-amber-300/90 hover:text-amber-200 select-none flex items-center justify-between">
                <span>Rappels (Compétences, Armes, Avantages)</span>
                <span class="text-stone-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div class="p-2 pt-1 space-y-1 border-t border-stone-800/60">
                ${topSkills ? `<div class="flex flex-wrap gap-1">${topSkills}</div>` : ''}
                ${pc.weapons.length > 0 ? `<div class="text-amber-200"><b>Armes :</b> ${pc.weapons.map((w) => `${escapeHtml(w.name)} (${escapeHtml(w.damage || '—')})`).join(', ')}</div>` : ''}
                ${pc.advantages ? `<div class="text-emerald-300/90"><b>+</b> ${escapeHtml(pc.advantages)}</div>` : ''}
                ${pc.disadvantages ? `<div class="text-rose-300/90"><b>-</b> ${escapeHtml(pc.disadvantages)}</div>` : ''}
                ${pc.spells.length > 0 ? `<div class="text-sky-300/90"><b>Sorts :</b> ${escapeHtml(pc.spells.join(', '))}</div>` : ''}
              </div>
            </details>

            <input
              type="text"
              data-action="pc-gm-note"
              data-pc-id="${escapeHtml(pc.id)}"
              value="${escapeHtml(pc.gmNotes || '')}"
              placeholder="Note MJ rapide..."
              class="w-full rounded bg-[#0d0b0b] border border-stone-800 focus:border-amber-500/60 px-2 py-1 text-[11px] text-stone-200 placeholder-stone-600 focus:outline-none"
            />
          </div>
        </article>
      `;
    }).join('');
  }

  function renderSkirmishSetup() {
    const box = document.getElementById('gm-skirmish-pcs');
    if (!box) return;
    if (state.pcs.length === 0) {
      box.innerHTML = '<div class="col-span-full text-xs text-stone-400 italic">Aucun PJ importé. Importez vos PJs ci-dessus pour les inclure dans l\'escarmouche (vous pouvez tout de même générer les PNJs seuls).</div>';
      return;
    }

    box.innerHTML = state.pcs.map((pc) => {
      const checked = pc.includedInSkirmish !== false;
      return `
        <div class="flex items-center justify-between gap-2 p-2 rounded-lg border text-xs ${checked ? 'bg-amber-950/20 border-amber-500/40' : 'bg-black/30 border-stone-800 opacity-60'}">
          <label class="flex items-center gap-2 min-w-0 cursor-pointer">
            <input type="checkbox" data-action="pc-skirmish-toggle" data-pc-id="${escapeHtml(pc.id)}" ${checked ? 'checked' : ''} class="rounded border-stone-600 bg-stone-900 text-amber-500" />
            <div class="min-w-0">
              <div class="font-bold text-amber-200 truncate">${escapeHtml(pc.name)}</div>
              <div class="text-[10px] text-stone-400 font-mono">Init ${escapeHtml(pc.initFormula)}</div>
            </div>
          </label>
          <input
            type="number"
            data-action="pc-init-input"
            data-pc-id="${escapeHtml(pc.id)}"
            value="${pc.lastInit != null ? pc.lastInit : ''}"
            placeholder="Init"
            title="Score d'initiative obtenu par le joueur"
            class="w-14 text-center font-mono font-bold rounded bg-[#0d0b0b] border border-amber-500/40 text-amber-300 py-1 text-xs focus:outline-none"
          />
        </div>
      `;
    }).join('');
  }

  function renderCombat() {
    renderSkirmishSetup();

    const tbody = document.getElementById('gm-combat-tbody');
    const emptyEl = document.getElementById('gm-combat-empty');
    const tableWrap = document.getElementById('gm-combat-table-wrap');
    const roundEl = document.getElementById('gm-combat-round');
    const nextUpEl = document.getElementById('gm-combat-next-up');
    if (roundEl) roundEl.textContent = String(state.combat.round);
    if (!tbody) return;

    const combatants = state.combat.combatants;
    if (combatants.length === 0) {
      if (nextUpEl) nextUpEl.textContent = '';
      if (tableWrap) tableWrap.classList.add('hidden');
      if (emptyEl) emptyEl.classList.remove('hidden');
      tbody.innerHTML = '';
      return;
    }

    if (tableWrap) tableWrap.classList.remove('hidden');
    if (emptyEl) emptyEl.classList.add('hidden');

    if (state.combat.activeIndex >= combatants.length) {
      state.combat.activeIndex = 0;
    }

    if (nextUpEl) {
      const current = combatants[state.combat.activeIndex];
      const nextIdx = (state.combat.activeIndex + 1) % combatants.length;
      const next = combatants[nextIdx];
      nextUpEl.innerHTML = `En cours : <b class="text-amber-300">#${state.combat.activeIndex + 1} ${escapeHtml(current.name)}</b>${combatants.length > 1 ? ` • Suivant : <b class="text-stone-200">#${nextIdx + 1} ${escapeHtml(next.name)}</b>` : ''}`;
    }

    tbody.innerHTML = combatants.map((c, idx) => {
      const isActive = idx === state.combat.activeIndex;
      const linkedPc = c.pcId ? findPc(c.pcId) : null;
      const wounds = linkedPc ? linkedPc.wounds : c.wounds;
      const earth = linkedPc ? linkedPc.rings.earth : c.earth;
      const penaltyDelta = linkedPc ? linkedPc.woundPenaltyDelta : 0;
      const wState = computeL5RWoundState(wounds, earth, { woundPenaltyDelta: penaltyDelta });
      const tnInfo = computeEffectiveCombatantTN(c, linkedPc);
      const isPC = c.type === 'pc';
      const woundPenalty = wState.penalty || 0;

      const stanceOptions = Object.entries(STANCES).map(([key, st]) =>
        `<option value="${key}" ${c.stance === key ? 'selected' : ''}>${escapeHtml(st.label)}</option>`
      ).join('');

      const statusChips = STATUS_FLAGS.map((sf) => {
        const active = Array.isArray(c.statuses) && c.statuses.includes(sf.id);
        return `<button type="button" data-action="toggle-status" data-combat-id="${escapeHtml(c.id)}" data-status="${sf.id}" title="${escapeHtml(sf.desc)}" class="px-1.5 py-0.5 rounded text-[10px] border transition cursor-pointer ${active ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold' : 'bg-stone-900/60 border-stone-800 text-stone-500 hover:text-stone-300'}">${escapeHtml(sf.label)}</button>`;
      }).join('');

      return `
        <tr class="border-b border-stone-800/80 transition ${isActive ? 'bg-amber-950/25' : 'hover:bg-black/30'}">
          <td class="px-2 py-2 text-center">
            <span class="inline-flex w-7 h-7 rounded-full items-center justify-center font-imperial font-bold text-xs ${isActive ? 'bg-amber-500 text-black' : 'bg-stone-900 border border-stone-700 text-stone-400'}">#${idx + 1}</span>
          </td>
          <td class="px-2 py-2">
            <input type="number" data-action="set-init" data-combat-id="${escapeHtml(c.id)}" value="${c.initiative}" class="w-14 text-center font-mono font-bold text-xs rounded bg-[#0d0b0b] border border-amber-500/40 text-amber-300 py-1 focus:outline-none" />
          </td>
          <td class="px-2 py-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${isPC ? 'bg-sky-950/70 text-sky-300 border-sky-700/50' : 'bg-red-950/70 text-red-300 border-red-700/50'}">${isPC ? 'PJ' : 'PNJ'}</span>
              <span class="font-imperial font-bold text-sm text-stone-100">${escapeHtml(c.name)}</span>
              ${isActive ? '<span class="px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold text-[9px] uppercase">Actif</span>' : ''}
            </div>
            ${c.notes ? `<div class="text-[10px] text-stone-400 italic mt-0.5">${escapeHtml(c.notes)}</div>` : ''}
          </td>
          <td class="px-2 py-2">
            <div class="flex items-center gap-1.5">
              <select data-action="set-stance" data-combat-id="${escapeHtml(c.id)}" class="rounded bg-[#0d0b0b] border border-stone-700 px-1.5 py-1 text-[11px] text-amber-200 focus:outline-none">
                ${stanceOptions}
              </select>
              <span class="text-xs font-mono font-bold text-amber-300 whitespace-nowrap" title="${escapeHtml(tnInfo.note || `ND Base ${c.armorTN}, Réd. ${c.reduction}`)}">ND ${tnInfo.effectiveTN} <span class="text-[10px] text-stone-500 font-normal">(R${c.reduction})</span></span>
            </div>
          </td>
          <td class="px-2 py-2 font-mono text-xs whitespace-nowrap space-y-1">
            <div>
              <button type="button" data-action="roll-formula" data-formula="${escapeHtml(c.attack || '5g2')}" data-penalty="${woundPenalty}" data-roll-label="Toucher ${escapeHtml(c.name)}" class="px-1.5 py-0.5 rounded bg-black/50 hover:bg-amber-950/60 border border-stone-700 text-stone-200 cursor-pointer transition" title="Cliquer pour lancer le jet de toucher (malus blessures ${woundPenalty ? '+' + woundPenalty : '0'} appliqué au score)">
                ⚔️ <b class="text-amber-300">${escapeHtml(c.attack || '—')}</b> 🎲
              </button>
            </div>
            <div>
              <button type="button" data-action="roll-formula" data-formula="${escapeHtml(c.damage || '4g2')}" data-penalty="0" data-roll-label="Dégâts ${escapeHtml(c.name)}" class="px-1.5 py-0.5 rounded bg-black/50 hover:bg-red-950/60 border border-stone-700 text-stone-300 cursor-pointer transition" title="Cliquer pour lancer le jet de dégâts">
                🩸 <b class="text-rose-300">${escapeHtml(c.damage || '—')}</b> 🎲
              </button>
            </div>
          </td>
          <td class="px-2 py-2 min-w-[165px]">
            <div class="flex items-center justify-between gap-2 text-[11px] mb-1">
              <span class="px-1.5 py-0.5 rounded border font-bold ${woundBadgeClass(wState.color)}">${escapeHtml(formatPenaltyText(wState))}</span>
              <span class="font-mono text-stone-300">${wState.wounds}/${wState.maxWounds}</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
              <div class="h-full transition-all duration-200 ${woundBarColor(wState.color)}" style="width: ${wState.percent}%"></div>
            </div>
          </td>
          <td class="px-2 py-2 whitespace-nowrap">
            <div class="flex items-center gap-1">
              <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="-5" class="px-1.5 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/50 text-[10px] text-emerald-300 cursor-pointer">-5</button>
              <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="1" class="px-1.5 py-1 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+1</button>
              <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="5" class="px-1.5 py-1 rounded bg-red-950/70 hover:bg-red-900 border border-red-700/50 text-[10px] text-red-200 cursor-pointer">+5</button>
              <button type="button" data-action="wound-delta" data-target-type="combat" data-target-id="${escapeHtml(c.id)}" data-delta="10" class="px-1.5 py-1 rounded bg-red-950/80 hover:bg-red-800 border border-red-600/60 text-[10px] font-bold text-red-200 cursor-pointer">+10</button>
              <button type="button" data-action="remove-combatant" data-combat-id="${escapeHtml(c.id)}" class="px-1.5 py-1 rounded bg-stone-900 hover:bg-red-950 border border-stone-700 text-[10px] text-stone-400 hover:text-red-300 cursor-pointer" title="Retirer">✕</button>
            </div>
          </td>
          <td class="px-2 py-2">
            <div class="flex flex-wrap gap-1 max-w-[175px]">${statusChips}</div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderRulesPanel() {
    const catsEl = document.getElementById('gm-rules-categories');
    const gridEl = document.getElementById('gm-rules-grid');
    const countEl = document.getElementById('gm-rules-count');
    const searchEl = document.getElementById('gm-rules-search');
    if (searchEl && document.activeElement !== searchEl && searchEl.value !== state.rulesQuery) {
      searchEl.value = state.rulesQuery;
    }

    const categories = Array.isArray(globalScope.GM_RULES_CATEGORIES) ? globalScope.GM_RULES_CATEGORIES : [];
    const cards = Array.isArray(globalScope.GM_RULES_CARDS) ? globalScope.GM_RULES_CARDS : [];

    if (catsEl) {
      catsEl.innerHTML = categories.map((cat) => {
        const active = cat.id === state.rulesCategory;
        return `<button type="button" data-action="set-rule-cat" data-cat-id="${escapeHtml(cat.id)}" class="px-2.5 py-1 rounded-lg border text-[11px] font-imperial cursor-pointer transition ${active ? 'bg-amber-600 border-amber-400 text-black font-bold' : 'bg-black/40 border-stone-800 text-stone-300 hover:border-amber-500/40'}">${escapeHtml(cat.icon)} ${escapeHtml(cat.label)}</button>`;
      }).join('');
    }

    const filtered = filterGmRulesCards(cards, state.rulesCategory, state.rulesQuery);
    if (countEl) countEl.textContent = `${filtered.length} / ${cards.length} fiches`;

    if (!gridEl) return;
    if (filtered.length === 0) {
      gridEl.innerHTML = '<div class="col-span-full p-6 text-center text-xs text-stone-400 border border-dashed border-stone-800 rounded-xl">Aucune règle ne correspond à cette recherche.</div>';
      return;
    }

    const frag = document.createDocumentFragment();
    filtered.forEach((card) => {
      const article = document.createElement('article');
      article.className = 'p-3.5 rounded-xl bg-black/40 border border-stone-800 hover:border-amber-500/35 space-y-2 transition flex flex-col justify-between';
      const itemsHtml = (card.items || []).map((item) =>
        `<li class="leading-relaxed"><b class="text-amber-200">${escapeHtml(item.label)} :</b> <span class="text-stone-300">${escapeHtml(item.text)}</span></li>`
      ).join('');
      article.innerHTML = `
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2 border-b border-stone-800 pb-1.5">
            <h4 class="font-imperial font-bold text-xs text-amber-300">${escapeHtml(card.title)}</h4>
            <span class="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-[9px] font-bold uppercase text-amber-200 shrink-0">${escapeHtml(card.badge)}</span>
          </div>
          <p class="text-[11px] text-stone-400 italic">${escapeHtml(card.summary)}</p>
          <ul class="space-y-1 text-[11px]">${itemsHtml}</ul>
        </div>
      `;
      frag.appendChild(article);
    });
    gridEl.replaceChildren(frag);
  }

  function renderDuel() {
    const d = state.duel;
    const pcSelect = document.getElementById('duel-a-pc');
    if (pcSelect) {
      const currentVal = d.aPcId || '';
      pcSelect.innerHTML = '<option value="">— Choisir un PJ de la table —</option>' +
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
    setVal('duel-focus-score-a', d.scoreA ?? '');
    setVal('duel-focus-score-b', d.scoreB ?? '');

    const aEval = document.getElementById('duel-a-eval-f');
    const aFocusF = document.getElementById('duel-a-focus-f');
    const aStrike = document.getElementById('duel-a-strike-f');
    if (aEval) aEval.textContent = `${(Number(d.aPer) || 2) + (Number(d.aIai) || 1)}g${Number(d.aPer) || 2}`;
    if (aFocusF) aFocusF.textContent = `${(Number(d.aVoid) || 2) + (Number(d.aIai) || 1)}g${Number(d.aVoid) || 2}`;
    if (aStrike) aStrike.textContent = `${(Number(d.aAgi) || 2) + (Number(d.aIai) || 1)}g${Number(d.aAgi) || 2}`;

    const bEval = document.getElementById('duel-b-eval-f');
    const bFocusF = document.getElementById('duel-b-focus-f');
    const bStrike = document.getElementById('duel-b-strike-f');
    if (bEval) bEval.textContent = `${(Number(d.bPer) || 2) + (Number(d.bIai) || 1)}g${Number(d.bPer) || 2}`;
    if (bFocusF) bFocusF.textContent = `${(Number(d.bVoid) || 2) + (Number(d.bIai) || 1)}g${Number(d.bVoid) || 2}`;
    if (bStrike) bStrike.textContent = `${(Number(d.bAgi) || 2) + (Number(d.bIai) || 1)}g${Number(d.bAgi) || 2}`;

    const aFocusEl = document.getElementById('duel-a-focus');
    const bFocusEl = document.getElementById('duel-b-focus');
    if (aFocusEl) aFocusEl.textContent = String(d.aFocus);
    if (bFocusEl) bFocusEl.textContent = String(d.bFocus);

    const aTnEffEl = document.getElementById('duel-a-tn-eff');
    const bTnEffEl = document.getElementById('duel-b-tn-eff');
    if (aTnEffEl) aTnEffEl.textContent = String((Number(d.aTN) || 15) + (Number(d.aFocus) || 0) * 5);
    if (bTnEffEl) bTnEffEl.textContent = String((Number(d.bTN) || 15) + (Number(d.bFocus) || 0) * 5);

    const verdictEl = document.getElementById('duel-focus-verdict');
    if (verdictEl) {
      const verdict = computeIaijutsuFocusVerdict(d.scoreA, d.scoreB, d.aName, d.bName);
      verdictEl.textContent = verdict.text;
    }
  }

  function renderHonorPanel() {
    const container = document.getElementById('gm-honor-list');
    if (container) {
      if (state.pcs.length === 0) {
        container.innerHTML = '<div class="text-xs text-stone-400 italic p-4 border border-dashed border-stone-800 rounded-xl text-center">Importez vos PJs pour ajuster directement leur Honneur, Gloire, Statut et Souillure.</div>';
      } else {
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
    }

    const tableBody = document.getElementById('gm-honor-table-body');
    const honorRows = Array.isArray(globalScope.GM_HONOR_TABLE) ? globalScope.GM_HONOR_TABLE : [];
    if (tableBody && honorRows.length > 0 && tableBody.childElementCount === 0) {
      tableBody.innerHTML = honorRows.map((row) => {
        const cls = row.positive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
        return `
          <tr class="${row.positive ? 'hover:bg-amber-950/15' : 'bg-red-950/10 hover:bg-red-950/20'}">
            <td class="p-2 font-semibold ${row.positive ? 'text-amber-200' : 'text-red-300'}">${escapeHtml(row.act)}</td>
            <td class="p-2 text-center font-mono ${cls}">${escapeHtml(row.r0)}</td>
            <td class="p-2 text-center font-mono ${cls}">${escapeHtml(row.r12)}</td>
            <td class="p-2 text-center font-mono ${cls}">${escapeHtml(row.r34)}</td>
            <td class="p-2 text-center font-mono ${cls}">${escapeHtml(row.r56)}</td>
            <td class="p-2 text-center font-mono ${cls}">${escapeHtml(row.r78)}</td>
            <td class="p-2 text-center font-mono ${cls}">${escapeHtml(row.r910)}</td>
          </tr>
        `;
      }).join('');
    }
  }

  function updateMagicAndFearCalculators() {
    const ring = document.getElementById('magic-calc-ring')?.value || 3;
    const school = document.getElementById('magic-calc-school')?.value || 2;
    const mastery = document.getElementById('magic-calc-mastery')?.value || 2;
    const raises = document.getElementById('magic-calc-raises')?.value || 0;
    const affinity = document.getElementById('magic-calc-affinity')?.value || 'normal';
    const mRes = computeMagicCastParams(ring, school, mastery, raises, affinity);
    const mOut = document.getElementById('magic-calc-result');
    if (mOut) {
      mOut.textContent = mRes.cannotCast
        ? `Sort impossible (Rang effectif 0 par Déficience) • ND ${mRes.tn}`
        : `Jet ${mRes.formula} • ND ${mRes.tn}`;
    }

    const fearLvl = Math.max(1, parseInt(document.getElementById('fear-calc-level')?.value, 10) || 1);
    const fearWill = Math.max(1, parseInt(document.getElementById('fear-calc-will')?.value, 10) || 2);
    const fearHonor = Math.max(0, parseInt(document.getElementById('fear-calc-honor')?.value, 10) || 0);
    const fearTn = 5 + fearLvl * 5;
    const fearOut = document.getElementById('fear-calc-result');
    if (fearOut) {
      fearOut.textContent = `Jet ${fearWill}g${fearWill}${fearHonor ? '+' + fearHonor : ''} vs ND ${fearTn} • Échec : -${fearLvl}k0 pendant la scène`;
    }
    return { magic: mRes, fear: { formula: `${fearWill}g${fearWill}${fearHonor ? '+' + fearHonor : ''}`, tn: fearTn, level: fearLvl } };
  }

  function updateQuickTnCalculator() {
    const base = parseInt(document.getElementById('gm-tn-base')?.value, 10) || 15;
    const raises = Math.max(0, parseInt(document.getElementById('gm-tn-raises')?.value, 10) || 0);
    let mods = 0;
    document.querySelectorAll('.gm-tn-mod:checked').forEach((cb) => {
      mods += parseInt(cb.value, 10) || 0;
    });
    const total = Math.max(5, base + raises * 5 + mods);
    const out = document.getElementById('gm-tn-total');
    if (out) out.textContent = `ND ${total}`;
  }

  function isGmScenarioUnlocked() {
    if (typeof globalScope.isGmSecretsUnlocked === 'function') {
      return globalScope.isGmSecretsUnlocked();
    }
    if (typeof sessionStorage !== 'undefined') {
      try {
        return sessionStorage.getItem('l5r_maho_unlocked') === 'true';
      } catch (_) {
        return false;
      }
    }
    return false;
  }

  function isValidGmScenarioPassword(pwd) {
    if (typeof globalScope.isValidGmSecretPassword === 'function') {
      return globalScope.isValidGmSecretPassword(pwd);
    }
    const p = String(pwd || '').trim().toLowerCase();
    return ['iuchiban', 'maho', 'jigoku', 'outremonde', 'araignee', 'araignée', 'kolat', 'daigotsu'].includes(p);
  }

  function populateSkirmishNpcPresetSelect() {
    const presetSelect = document.getElementById('gm-skirmish-npc-preset');
    if (!presetSelect) return;
    const unlocked = isGmScenarioUnlocked();
    const visiblePresets = ENEMY_PRESETS
      .map((p, idx) => ({ p, idx }))
      .filter(({ p }) => unlocked || !p.gmOnly);

    presetSelect.innerHTML = visiblePresets.map(({ p, idx }) =>
      `<option value="${idx}">${escapeHtml(p.name)} (Init ${p.initFormula}, ND ${p.armorTN}, Toucher ${p.attack}, Dégâts ${p.damage})</option>`
    ).join('') + '<option value="custom">— PNJ Personnalisé —</option>';
  }

  function pushCombatLog(entryText) {
    if (!entryText) return;
    if (!Array.isArray(state.combatLog)) state.combatLog = [];
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    state.combatLog.unshift({ time: `${hh}:${mm}`, round: (state.combat && state.combat.round) || 1, text: String(entryText) });
    if (state.combatLog.length > 40) state.combatLog = state.combatLog.slice(0, 40);
  }

  function renderCombatLog() {
    const listEl = document.getElementById('gm-combat-log-list');
    const countEl = document.getElementById('gm-combat-log-count');
    const logs = Array.isArray(state.combatLog) ? state.combatLog : [];
    if (countEl) countEl.textContent = String(logs.length);
    if (!listEl) return;
    if (logs.length === 0) {
      listEl.innerHTML = '<li class="text-stone-500 italic">Aucun événement enregistré pour ce combat.</li>';
      return;
    }
    listEl.innerHTML = logs.map((l) => `
      <li class="px-2 py-1 rounded bg-black/40 border border-stone-800/80 flex items-center justify-between gap-2">
        <span><b class="text-amber-300">[R${l.round}]</b> ${escapeHtml(l.text)}</span>
        <span class="text-[10px] text-stone-500 shrink-0">${escapeHtml(l.time)}</span>
      </li>
    `).join('');
  }

  // Moteur Web Audio autonome pour Ambiances Sonores MJ
  let _ambienceCtx = null;
  let _ambienceGain = null;
  let _ambienceNodes = [];
  let _ambienceTimer = null;
  let _activeAmbience = null;

  function stopGmAmbience() {
    if (_ambienceTimer) {
      clearInterval(_ambienceTimer);
      _ambienceTimer = null;
    }
    _ambienceNodes.forEach((n) => {
      try { if (typeof n.stop === 'function') n.stop(); } catch (_) {}
      try { if (typeof n.disconnect === 'function') n.disconnect(); } catch (_) {}
    });
    _ambienceNodes = [];
    _activeAmbience = null;
    const statusEl = document.getElementById('gm-ambience-status');
    if (statusEl) statusEl.textContent = 'Silence';
    document.querySelectorAll('[data-action="ambience-play"]').forEach((b) => {
      b.classList.remove('border-amber-400', 'bg-amber-950/50', 'text-amber-200');
    });
  }

  function startGmAmbience(mode) {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (_activeAmbience === mode) {
      stopGmAmbience();
      return;
    }
    stopGmAmbience();
    if (!_ambienceCtx) _ambienceCtx = new AudioCtx();
    if (_ambienceCtx.state === 'suspended') _ambienceCtx.resume().catch(() => {});

    const volSlider = document.getElementById('gm-ambience-volume');
    const vol = (volSlider ? Number(volSlider.value) : 35) / 100;
    _ambienceGain = _ambienceCtx.createGain();
    _ambienceGain.gain.value = Math.max(0.01, vol * 0.35);
    _ambienceGain.connect(_ambienceCtx.destination);
    _ambienceNodes.push(_ambienceGain);

    const makeNoise = () => {
      const len = _ambienceCtx.sampleRate * 2;
      const buf = _ambienceCtx.createBuffer(1, len, _ambienceCtx.sampleRate);
      const data = buf.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.04 * white) / 1.04;
        lastOut = data[i];
      }
      const src = _ambienceCtx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      return src;
    };

    const labels = { rain: 'Pluie & Marais', wind: 'Vent des Pics', fire: 'Brasero / Maho', drum: 'Tambour Guerre' };
    if (mode === 'rain' || mode === 'wind' || mode === 'fire') {
      const src = makeNoise();
      const filter = _ambienceCtx.createBiquadFilter();
      filter.type = mode === 'rain' ? 'bandpass' : 'lowpass';
      filter.frequency.value = mode === 'rain' ? 1100 : mode === 'wind' ? 420 : 260;
      filter.Q.value = mode === 'wind' ? 3.5 : 0.9;
      src.connect(filter);
      filter.connect(_ambienceGain);
      src.start();
      _ambienceNodes.push(src, filter);
    } else if (mode === 'drum') {
      const triggerBeat = () => {
        if (!_ambienceCtx || !_ambienceGain) return;
        const osc = _ambienceCtx.createOscillator();
        const g = _ambienceCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, _ambienceCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(42, _ambienceCtx.currentTime + 0.35);
        g.gain.setValueAtTime(0.9, _ambienceCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, _ambienceCtx.currentTime + 0.45);
        osc.connect(g);
        g.connect(_ambienceGain);
        osc.start();
        osc.stop(_ambienceCtx.currentTime + 0.46);
      };
      triggerBeat();
      _ambienceTimer = setInterval(triggerBeat, 950);
    }

    _activeAmbience = mode;
    const statusEl = document.getElementById('gm-ambience-status');
    if (statusEl) statusEl.textContent = labels[mode] || mode;
    document.querySelectorAll('[data-action="ambience-play"]').forEach((b) => {
      const active = b.getAttribute('data-ambience') === mode;
      b.classList.toggle('border-amber-400', active);
      b.classList.toggle('bg-amber-950/50', active);
      b.classList.toggle('text-amber-200', active);
    });
  }

  function getGmScenariosList() {
    if (typeof GM_SCENARIOS_DATA !== 'undefined' && Array.isArray(GM_SCENARIOS_DATA)) {
      return GM_SCENARIOS_DATA;
    }
    if (typeof globalScope !== 'undefined' && Array.isArray(globalScope.GM_SCENARIOS_DATA)) {
      return globalScope.GM_SCENARIOS_DATA;
    }
    return [];
  }

  function findEncounterInScenario(scenario, encounterId) {
    if (!scenario || !Array.isArray(scenario.acts)) return null;
    for (const act of scenario.acts) {
      for (const scene of act.scenes || []) {
        if (scene.encounter && scene.encounter.id === encounterId) {
          return scene.encounter;
        }
      }
    }
    return null;
  }

  function launchScenarioEncounter(scenarioId, encounterId) {
    const scenarios = getGmScenariosList();
    const sc = scenarios.find((s) => s.id === scenarioId) || scenarios[0];
    const enc = findEncounterInScenario(sc, encounterId);
    if (!enc) return;

    const combatants = buildSkirmishCombatants(state.pcs, { npcCount: 0 });
    (enc.enemies || []).forEach((spec) => {
      const preset = ENEMY_PRESETS.find((p) => p.name === spec.presetName);
      if (!preset) return;
      const existingOfType = combatants.filter((c) => c.type === 'enemy' && c.name.startsWith(preset.name)).length;
      const created = createEnemyCombatants(spec.count || 1, preset, existingOfType);
      combatants.push(...created);
    });

    state.combat = {
      round: 1,
      activeIndex: 0,
      combatants: sortCombatantsByInit(combatants)
    };
    state.activeTab = 'skirmish';
    saveState();
    renderAll();
  }

  function addScenarioNpcToCombat(presetName) {
    const preset = ENEMY_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;
    const existingEnemies = state.combat.combatants.filter((c) => c.type === 'enemy').length;
    const created = createEnemyCombatants(1, preset, existingEnemies);
    state.combat.combatants = sortCombatantsByInit([...state.combat.combatants, ...created]);
    state.activeTab = 'skirmish';
    saveState();
    renderAll();
  }

  function renderScenarioRolls(rolls, contextLabel = '') {
    if (!Array.isArray(rolls) || rolls.length === 0) return '';
    return `
      <div class="flex flex-wrap gap-1.5 pt-1">
        ${rolls.map((r) => `
          <button type="button" data-action="roll-formula" data-formula="${escapeHtml(r.formula)}" data-roll-label="${escapeHtml(contextLabel ? contextLabel + ' — ' + r.label : r.label)}" class="px-2 py-1 rounded bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-[10px] font-mono text-amber-200 cursor-pointer transition">
            🎲 ${escapeHtml(r.label)}
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderScenarioPanel() {
    const root = document.getElementById('gm-scenario-root');
    if (!root) return;

    if (!isGmScenarioUnlocked()) {
      root.innerHTML = `
        <div class="p-6 md:p-8 rounded-xl bg-gradient-to-br from-red-950/30 via-black/70 to-amber-950/20 border border-red-700/40 text-center space-y-4 max-w-xl mx-auto my-4">
          <div class="text-3xl">🔒</div>
          <div class="space-y-1">
            <h3 class="font-imperial font-bold text-base md:text-lg text-amber-300">Contenu Réservé au Maître du Jeu</h3>
            <p class="text-xs text-stone-300 leading-relaxed">
              Les scénarios préparés, indices d'enquête, profils de boss et rencontres sont masqués afin d'éviter tout spoiler aux joueurs.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
            <input
              id="gm-scenario-pwd"
              type="password"
              placeholder="Sceau secret du MJ..."
              autocomplete="off"
              class="w-full sm:w-56 rounded-lg bg-[#0d0b0b] border border-amber-500/40 focus:border-amber-400 px-3 py-2 text-xs text-amber-200 placeholder-stone-500 focus:outline-none text-center"
            />
            <button
              type="button"
              data-action="scenario-unlock"
              class="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-imperial font-bold text-xs cursor-pointer transition shadow"
            >
              🔓 Déverrouiller
            </button>
          </div>
          <p id="gm-scenario-pwd-error" class="hidden text-[11px] text-red-400 font-bold">Sceau incorrect. Accès refusé.</p>
          <p class="text-[10px] text-stone-500 italic">Partage le même verrou MJ que les secrets d'Écoles et de la Forge.</p>
        </div>
      `;
      return;
    }

    const scenarios = getGmScenariosList();
    if (scenarios.length === 0) {
      root.innerHTML = '<p class="text-xs text-stone-400 italic">Aucun scénario chargé.</p>';
      return;
    }

    const activeScenario = scenarios.find((s) => s.id === (state.scenario && state.scenario.selectedId)) || scenarios[0];
    const checkedMap = (state.scenario && state.scenario.checked && state.scenario.checked[activeScenario.id]) || {};
    const totalChecks = (activeScenario.checklist || []).length;
    const doneChecks = (activeScenario.checklist || []).filter((item) => Boolean(checkedMap[item.id])).length;

    const scenarioSelector = scenarios.length > 1
      ? `<select id="gm-scenario-select" data-action="scenario-select" class="rounded bg-[#0d0b0b] border border-amber-500/40 px-2.5 py-1 text-xs text-amber-200">
          ${scenarios.map((s) => `<option value="${escapeHtml(s.id)}" ${s.id === activeScenario.id ? 'selected' : ''}>Scénario ${escapeHtml(s.num)} — ${escapeHtml(s.title)}</option>`).join('')}
        </select>`
      : '';

    const navButtons = [
      { target: 'sc-briefing', label: '📋 Briefing & PJs' },
      ...(activeScenario.acts || []).map((a) => ({ target: `sc-${a.id}`, label: a.num })),
      { target: 'sc-epilogue', label: '🏁 Épilogue & XP' },
      { target: 'sc-npcs', label: '👹 Annexe PNJs' }
    ];

    const galleryIllustrations = [];
    (activeScenario.acts || []).forEach((a) => {
      (a.scenes || []).forEach((s) => {
        if (s.illustration) galleryIllustrations.push(s.illustration);
      });
    });

    root.innerHTML = `
      <!-- EN-TÊTE SCÉNARIO -->
      <div class="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 via-black/60 to-red-950/20 border border-amber-500/35 space-y-3">
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-600 text-black font-imperial font-bold text-[10px] uppercase">Scénario ${escapeHtml(activeScenario.num)}</span>
              <span class="text-[11px] text-amber-300/90 font-imperial">${escapeHtml(activeScenario.campaign)}</span>
            </div>
            <h3 class="text-lg md:text-xl font-imperial font-bold text-amber-200">${escapeHtml(activeScenario.title)}</h3>
            <p class="text-[11px] text-stone-400">${escapeHtml(activeScenario.pcsLine)} • Départ : <b class="text-stone-200">${escapeHtml(activeScenario.startPlace)}</b> • Durée : <b class="text-stone-200">${escapeHtml(activeScenario.duration)}</b></p>
          </div>
          <div class="flex flex-wrap items-center gap-2 shrink-0">
            ${scenarioSelector}
            <button type="button" data-action="scenario-lock" title="Masquer le scénario aux joueurs" class="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900/80 border border-red-700/50 text-[11px] font-imperial text-red-200 cursor-pointer transition">
              🔒 Verrouiller (Masquer)
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5">
          ${(activeScenario.tags || []).map((t) => `<span class="px-2 py-0.5 rounded-full bg-black/50 border border-stone-700 text-[10px] text-stone-300">${escapeHtml(t)}</span>`).join('')}
        </div>

        <blockquote class="p-3 rounded-lg bg-black/45 border-l-2 border-amber-500/70 text-[11px] italic text-amber-100/90 leading-relaxed">
          ${escapeHtml(activeScenario.epigraph)}
        </blockquote>

        <!-- NAVIGATION RAPIDE -->
        <div class="flex flex-wrap gap-1.5 pt-1 border-t border-amber-500/20">
          ${navButtons.map((n) => `
            <button type="button" data-action="scenario-jump" data-target="${escapeHtml(n.target)}" class="px-2.5 py-1 rounded bg-stone-900/90 hover:bg-amber-950/60 border border-stone-700 hover:border-amber-500/50 text-[11px] font-imperial text-amber-200 cursor-pointer transition">
              ${escapeHtml(n.label)}
            </button>
          `).join('')}
        </div>

        ${galleryIllustrations.length > 0 ? `
          <div class="flex flex-wrap items-center gap-1.5 pt-1 border-t border-amber-500/15">
            <span class="text-[10px] font-imperial uppercase tracking-wider text-amber-400 mr-1">🖼️ Visuels PJs :</span>
            ${galleryIllustrations.map((ill) => `
              <button type="button" data-action="scenario-show-image" data-img-src="${escapeHtml(ill.src)}" data-img-title="${escapeHtml(ill.title)}" class="px-2 py-0.5 rounded bg-amber-950/50 hover:bg-amber-900/70 border border-amber-500/35 text-[10px] text-amber-200 cursor-pointer transition">
                ${escapeHtml(ill.title)}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- CHECKLIST JOUR J & RÈGLES CRITIQUES -->
      <div id="sc-briefing" class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-7 p-3.5 rounded-xl bg-black/35 border border-stone-800 space-y-2.5">
          <div class="flex items-center justify-between border-b border-stone-800 pb-1.5">
            <h4 class="font-imperial font-bold text-xs text-amber-300">✅ Suivi de Progression Jour J (${doneChecks}/${totalChecks})</h4>
            <button type="button" data-action="scenario-reset-checks" data-scenario-id="${escapeHtml(activeScenario.id)}" class="text-[10px] text-stone-400 hover:text-amber-300 cursor-pointer">Réinitialiser</button>
          </div>
          <div class="space-y-1.5 text-[11px]">
            ${(activeScenario.checklist || []).map((item) => {
              const isChecked = Boolean(checkedMap[item.id]);
              return `
                <label class="flex items-start gap-2 p-1.5 rounded hover:bg-black/40 cursor-pointer transition ${isChecked ? 'opacity-60 line-through text-stone-400' : 'text-stone-200'}">
                  <input type="checkbox" data-action="scenario-toggle-check" data-scenario-id="${escapeHtml(activeScenario.id)}" data-check-id="${escapeHtml(item.id)}" ${isChecked ? 'checked' : ''} class="mt-0.5 accent-amber-500 rounded cursor-pointer" />
                  <span>${escapeHtml(item.label)}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <div class="lg:col-span-5 p-3.5 rounded-xl bg-red-950/15 border border-red-800/35 space-y-2">
          <h4 class="font-imperial font-bold text-xs text-red-300 border-b border-red-900/40 pb-1.5">⚠️ Rappel des Règles Critiques (L5R 4e)</h4>
          <div class="space-y-2 text-[11px] text-stone-300">
            ${(activeScenario.criticalRules || []).map((r) => `
              <div class="p-2 rounded bg-black/40 border border-stone-800/80">
                <b class="text-amber-300">${escapeHtml(r.title)} :</b> ${escapeHtml(r.text)}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- BRIEFING & ARCHITECTURE -->
      <details open class="p-3.5 rounded-xl bg-black/30 border border-stone-800 space-y-2.5 text-xs">
        <summary class="font-imperial font-bold text-amber-300 cursor-pointer select-none">📜 Briefing de Maîtrise &amp; Structure en Quatre Actes</summary>
        <div class="space-y-2 text-stone-300 leading-relaxed pt-1">
          ${(activeScenario.briefing || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
        </div>
        <div class="overflow-x-auto rounded-lg border border-stone-800 mt-2">
          <table class="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr class="bg-black/60 border-b border-amber-500/20 font-imperial text-amber-300 text-[10px] uppercase">
                <th class="p-2">Acte &amp; Lieu</th>
                <th class="p-2">Enjeux Principaux</th>
                <th class="p-2">Défis Dominants</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-800/80 text-stone-300">
              ${(activeScenario.structure || []).map((row) => `
                <tr>
                  <td class="p-2 font-bold text-amber-200 align-top">${escapeHtml(row.act)}</td>
                  <td class="p-2 align-top">${escapeHtml(row.stakes)}</td>
                  <td class="p-2 align-top text-stone-400">${escapeHtml(row.challenges)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </details>

      <!-- SUIVI PSYCHOLOGIQUE DES PJS -->
      <details open class="p-3.5 rounded-xl bg-black/30 border border-purple-800/30 space-y-2.5 text-xs">
        <summary class="font-imperial font-bold text-purple-300 cursor-pointer select-none">🧠 Suivi Psychologique &amp; Exploitation Personnalisée des PJs</summary>
        <p class="text-[11px] text-stone-300 bg-purple-950/20 border border-purple-800/30 p-2.5 rounded-lg">${escapeHtml(activeScenario.psychIntro)}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          ${(activeScenario.pcTracking || []).map((p) => `
            <div class="p-2.5 rounded-lg bg-black/45 border border-stone-800 space-y-1 text-[11px]">
              <div class="font-imperial font-bold text-amber-300">${escapeHtml(p.name)}</div>
              <div class="text-stone-300"><b class="text-purple-300">Pression :</b> ${escapeHtml(p.hallucination)}</div>
              <div class="text-stone-400"><b class="text-sky-300">Leviers MJ :</b> ${escapeHtml(p.levers)}</div>
            </div>
          `).join('')}
        </div>
      </details>

      <!-- ACTES I À IV -->
      <div class="space-y-4">
        ${(activeScenario.acts || []).map((act) => `
          <section id="sc-${escapeHtml(act.id)}" class="p-4 rounded-xl bg-black/35 border border-amber-500/25 space-y-4">
            <div class="border-b border-amber-500/20 pb-2">
              <span class="text-[10px] font-imperial uppercase tracking-widest text-amber-400">${escapeHtml(act.num)}</span>
              <h4 class="font-imperial font-bold text-base text-amber-200">${escapeHtml(act.title)}</h4>
              <p class="text-[11px] italic text-stone-400">${escapeHtml(act.tagline)}</p>
            </div>

            <div class="space-y-4">
              ${(act.scenes || []).map((scene) => `
                <article class="p-3.5 rounded-xl bg-[#0d0a0a]/90 border border-stone-800 space-y-2.5 text-xs">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-800/80 pb-1.5">
                    <h5 class="font-imperial font-bold text-sm text-amber-300">${escapeHtml(scene.title)}</h5>
                    <span class="text-[10px] text-stone-400">${escapeHtml(scene.meta)}</span>
                  </div>

                  ${scene.intro ? `<p class="text-stone-300 leading-relaxed">${escapeHtml(scene.intro)}</p>` : ''}

                  ${scene.readAloud ? `
                    <div class="p-3 rounded-lg bg-amber-950/20 border border-amber-500/35 text-amber-100/95 leading-relaxed space-y-1">
                      <div class="text-[10px] font-imperial uppercase tracking-wider text-amber-400">📖 À lire ou paraphraser aux joueurs</div>
                      <p>${escapeHtml(scene.readAloud)}</p>
                    </div>
                  ` : ''}

                  ${Array.isArray(scene.dialogues) && scene.dialogues.length > 0 ? `
                    <div class="space-y-1.5">
                      ${scene.dialogues.map((d) => `
                        <div class="p-2.5 rounded-lg bg-black/50 border-l-2 border-sky-500/60 text-stone-200">
                          <span class="font-bold text-sky-300">${escapeHtml(d.speaker)}</span>
                          <span class="text-[10px] italic text-stone-400"> (${escapeHtml(d.tone)})</span> :
                          <span class="italic"> ${escapeHtml(d.text)}</span>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  ${scene.illustration ? `
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2.5 rounded-lg bg-black/45 border border-amber-500/25">
                      <img src="${escapeHtml(scene.illustration.src)}" alt="${escapeHtml(scene.illustration.title)}" class="w-full sm:w-40 h-24 object-cover rounded border border-amber-500/30 cursor-pointer hover:opacity-90 transition" data-action="scenario-show-image" data-img-src="${escapeHtml(scene.illustration.src)}" data-img-title="${escapeHtml(scene.illustration.title)}" />
                      <div class="flex-1 space-y-1.5">
                        <div class="font-imperial font-bold text-xs text-amber-200">${escapeHtml(scene.illustration.title)}</div>
                        <p class="text-[10px] text-stone-400">Illustration sans spoiler prête à être affichée en plein écran aux joueurs.</p>
                        <button type="button" data-action="scenario-show-image" data-img-src="${escapeHtml(scene.illustration.src)}" data-img-title="${escapeHtml(scene.illustration.title)}" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-imperial font-bold text-[11px] cursor-pointer transition shadow">
                          🖼️ Montrer aux PJs (Plein écran)
                        </button>
                      </div>
                    </div>
                  ` : ''}

                  ${scene.specialBox ? `
                    <div class="p-3 rounded-lg bg-red-950/20 border border-red-700/40 space-y-2">
                      <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="font-imperial font-bold text-[11px] text-red-300">⚡ ${escapeHtml(scene.specialBox.title)}</span>
                        ${renderScenarioRolls(scene.specialBox.rolls, scene.title)}
                      </div>
                      <ul class="space-y-1.5 text-[11px] text-stone-200">
                        ${(scene.specialBox.items || []).map((it) => `
                          <li><b class="text-amber-300">${escapeHtml(it.label)} :</b> ${escapeHtml(it.text)}</li>
                        `).join('')}
                      </ul>
                    </div>
                  ` : ''}

                  ${scene.subsectionTitle ? `<h6 class="font-imperial font-bold text-[11px] text-amber-200 pt-1">${escapeHtml(scene.subsectionTitle)}</h6>` : ''}
                  ${renderScenarioRolls(scene.rolls, scene.title)}

                  ${Array.isArray(scene.bullets) && scene.bullets.length > 0 ? `
                    <ul class="space-y-1.5 text-[11px] text-stone-300 list-disc list-inside">
                      ${scene.bullets.map((b) => `
                        <li><b class="text-stone-100">${escapeHtml(b.label)} :</b> ${escapeHtml(b.text)}</li>
                      `).join('')}
                    </ul>
                  ` : ''}

                  ${scene.encounter ? `
                    <div class="pt-1">
                      <button type="button" data-action="scenario-launch-encounter" data-scenario-id="${escapeHtml(activeScenario.id)}" data-encounter-id="${escapeHtml(scene.encounter.id)}" class="px-3.5 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white font-imperial font-bold text-xs cursor-pointer transition shadow">
                        ${escapeHtml(scene.encounter.label)}
                      </button>
                    </div>
                  ` : ''}

                  ${scene.outro ? `<p class="text-[11px] italic text-emerald-200/90 bg-emerald-950/15 border border-emerald-800/30 p-2.5 rounded-lg">${escapeHtml(scene.outro)}</p>` : ''}
                </article>
              `).join('')}
            </div>
          </section>
        `).join('')}
      </div>

      <!-- ÉPILOGUE & RÉCOMPENSES -->
      ${activeScenario.epilogue ? `
        <section id="sc-epilogue" class="p-4 rounded-xl bg-black/35 border border-emerald-700/35 space-y-3 text-xs">
          <div>
            <h4 class="font-imperial font-bold text-base text-emerald-300">🏁 ${escapeHtml(activeScenario.epilogue.title)}</h4>
            <p class="text-[11px] text-amber-300 font-imperial">${escapeHtml(activeScenario.epilogue.transition)}</p>
          </div>
          ${(activeScenario.epilogue.paragraphs || []).map((p) => `<p class="text-stone-300 leading-relaxed">${escapeHtml(p)}</p>`).join('')}
          <div class="overflow-x-auto rounded-lg border border-stone-800">
            <table class="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr class="bg-black/60 border-b border-emerald-500/20 font-imperial text-emerald-300 text-[10px] uppercase">
                  <th class="p-2">Catégorie</th>
                  <th class="p-2">Attribution &amp; Conséquences</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-800/80 text-stone-300">
                ${(activeScenario.epilogue.rewards || []).map((r) => `
                  <tr>
                    <td class="p-2 font-bold text-amber-200 align-top whitespace-nowrap">${escapeHtml(r.category)}</td>
                    <td class="p-2 align-top">${escapeHtml(r.details)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      ` : ''}

      <!-- ANNEXE TECHNIQUE : PROFILS PNJS & ADVERSAIRES -->
      <section id="sc-npcs" class="p-4 rounded-xl bg-black/35 border border-red-800/35 space-y-3 text-xs">
        <h4 class="font-imperial font-bold text-base text-red-300">👹 Annexe Technique — Profils Complets des Adversaires &amp; Alliés</h4>
        <div class="space-y-3">
          ${(activeScenario.npcs || []).map((npc) => `
            <article class="p-3.5 rounded-xl bg-[#0d0a0a] border ${npc.isAlly ? 'border-emerald-700/40' : 'border-red-800/40'} space-y-2">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-1.5">
                <div>
                  <h5 class="font-imperial font-bold text-sm ${npc.isAlly ? 'text-emerald-300' : 'text-amber-300'}">${escapeHtml(npc.name)}</h5>
                  <p class="text-[10px] text-stone-400">${escapeHtml(npc.role)}</p>
                </div>
                ${npc.presetName ? `
                  <button type="button" data-action="scenario-add-npc" data-preset-name="${escapeHtml(npc.presetName)}" class="px-2.5 py-1 rounded bg-red-950/70 hover:bg-red-900 border border-red-600/50 text-[11px] font-imperial text-red-200 cursor-pointer transition shrink-0">
                    + Ajouter à l'Escarmouche
                  </button>
                ` : ''}
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-[11px] text-stone-300">
                <div><b class="text-stone-400">Anneaux :</b> ${escapeHtml(npc.rings)}</div>
                <div><b class="text-stone-400">Statuts :</b> ${escapeHtml(npc.status)}</div>
                <div class="md:col-span-2"><b class="text-amber-200">Combat :</b> ${escapeHtml(npc.combat)}</div>
                <div class="md:col-span-2 text-[10px] font-mono text-stone-400"><b class="text-stone-300">Seuils :</b> ${escapeHtml(npc.wounds)}</div>
                <div class="md:col-span-2"><b class="text-stone-400">Compétences / Équipement :</b> ${escapeHtml(npc.skills)}</div>
              </div>
              <ul class="space-y-1 text-[11px] text-stone-300 border-t border-stone-800/70 pt-1.5">
                ${(npc.specials || []).map((sp) => `<li>• ${escapeHtml(sp)}</li>`).join('')}
              </ul>
              ${renderScenarioRolls(npc.rolls, npc.name)}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderAll() {
    renderTabs();
    renderPcs();
    renderCombat();
    renderCombatLog();
    renderScenarioPanel();
    renderRulesPanel();
    renderDuel();
    renderHonorPanel();
    renderDicePanel();
    updateMagicAndFearCalculators();
    updateQuickTnCalculator();
    const scratchEl = document.getElementById('gm-scratchpad');
    if (scratchEl && document.activeElement !== scratchEl && scratchEl.value !== state.gmScratchpad) {
      scratchEl.value = state.gmScratchpad;
    }
  }

  // ===========================================================================
  // IMPORT & INITIALISATION DOM
  // ===========================================================================
  function handleJsonFiles(fileList, onImportedPc) {
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
              const pc = normalizeImportedCharacter(rawChar);
              state.pcs.push(pc);
              loadedCount++;
              if (typeof onImportedPc === 'function') onImportedPc(pc);
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
          statusEl.textContent = `${loadedCount} PJ(s) importé(s).`;
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
        school: 'Bushi Hida (R2)',
        insightRank: 2,
        honor: 4.2,
        glory: 2.0,
        status: 1.5,
        traits: { stamina: 4, willpower: 3, strength: 4, perception: 2, reflexes: 3, awareness: 2, agility: 3, intelligence: 2 },
        voidRing: 3,
        armor: { name: 'Armure Lourde', tnBonus: 10, reduction: 5 },
        skills: [{ name: 'Armes Lourdes', rank: 4 }, { name: 'Défense', rank: 3 }],
        weapons: [{ name: 'Tetsubo', damage: '6g3' }],
        advantages: 'Haut Seuil de Douleur',
        disadvantages: 'Impulsif'
      },
      {
        schemaVersion: 2,
        name: 'Kakita Haruka',
        clan: 'crane',
        school: 'Duelliste Kakita (R2)',
        insightRank: 2,
        honor: 5.8,
        glory: 3.0,
        status: 2.0,
        traits: { stamina: 2, willpower: 3, strength: 2, perception: 3, reflexes: 4, awareness: 3, agility: 4, intelligence: 3 },
        voidRing: 3,
        armor: { name: 'Kimono', tnBonus: 0, reduction: 0 },
        skills: [{ name: 'Iaijutsu', rank: 4 }, { name: 'Kenjutsu', rank: 3 }],
        weapons: [{ name: 'Katana', damage: '5g2' }],
        advantages: 'Virtuose (Iaijutsu)',
        disadvantages: 'Fierté'
      },
      {
        schemaVersion: 2,
        name: 'Isawa Ren',
        clan: 'phoenix',
        school: 'Shugenja Isawa (R2)',
        insightRank: 2,
        honor: 5.2,
        glory: 2.2,
        status: 2.0,
        traits: { stamina: 2, willpower: 4, strength: 2, perception: 3, reflexes: 3, awareness: 3, agility: 2, intelligence: 4 },
        voidRing: 3,
        armor: { name: 'Robe', tnBonus: 0, reduction: 0 },
        skills: [{ name: 'Art de la Magie', rank: 4 }, { name: 'Calligraphie', rank: 4 }],
        weapons: [{ name: 'Wakizashi', damage: '4g2' }],
        spells: ['Frappe de Jade', 'Cœur de la Fournaise'],
        advantages: 'Affinité Feu',
        disadvantages: 'Doux'
      },
      {
        schemaVersion: 2,
        name: 'Bayushi Taro',
        clan: 'scorpion',
        school: 'Bushi Bayushi (R2)',
        insightRank: 2,
        honor: 2.5,
        glory: 1.8,
        status: 1.5,
        traits: { stamina: 3, willpower: 3, strength: 3, perception: 3, reflexes: 4, awareness: 3, agility: 4, intelligence: 3 },
        voidRing: 2,
        armor: { name: 'Armure Légère', tnBonus: 5, reduction: 3 },
        skills: [{ name: 'Kenjutsu', rank: 4 }, { name: 'Discrétion', rank: 3 }],
        weapons: [{ name: 'Katana', damage: '5g2' }],
        advantages: 'Vif',
        disadvantages: 'Sombre Secret'
      }
    ];
    samples.forEach((s) => state.pcs.push(normalizeImportedCharacter(s)));
    saveState();
    renderAll();
  }

  function openQuickRulesSearch() {
    state.activeTab = 'rules';
    saveState();
    renderTabs();
    const input = document.getElementById('gm-rules-search');
    if (input) {
      input.focus();
      input.select();
    }
  }

  function initDom() {
    if (typeof document === 'undefined') return;
    loadState();

    // Modèles PNJ pour l'escarmouche
    const presetSelect = document.getElementById('gm-skirmish-npc-preset');
    if (presetSelect) {
      populateSkirmishNpcPresetSelect();

      const fillCustomFields = (p) => {
        if (!p) return;
        document.getElementById('gm-enemy-name').value = p.name;
        document.getElementById('gm-enemy-init-formula').value = p.initFormula;
        document.getElementById('gm-enemy-tn').value = p.armorTN;
        document.getElementById('gm-enemy-red').value = p.reduction;
        document.getElementById('gm-enemy-earth').value = p.earth;
        document.getElementById('gm-enemy-attack').value = p.attack;
        document.getElementById('gm-enemy-damage').value = p.damage;
        document.getElementById('gm-enemy-notes').value = p.notes;
      };
      fillCustomFields(ENEMY_PRESETS[0]);

      presetSelect.addEventListener('change', () => {
        const idx = parseInt(presetSelect.value, 10);
        if (!isNaN(idx) && ENEMY_PRESETS[idx]) fillCustomFields(ENEMY_PRESETS[idx]);
      });
    }

    // Modèles d'adversaire pour Duel Iaijutsu
    const duelPresetEl = document.getElementById('duel-b-preset');
    if (duelPresetEl) {
      duelPresetEl.innerHTML = '<option value="">— Modèle d\'adversaire —</option>' +
        DUEL_PRESETS.map((p, idx) => `<option value="${idx}">${escapeHtml(p.name)} (Iai ${p.iai}, ND ${p.tn})</option>`).join('');
      duelPresetEl.addEventListener('change', () => {
        const idx = parseInt(duelPresetEl.value, 10);
        if (isNaN(idx) || !DUEL_PRESETS[idx]) return;
        const p = DUEL_PRESETS[idx];
        state.duel.bName = p.name;
        state.duel.bIai = p.iai;
        state.duel.bPer = p.per;
        state.duel.bVoid = p.void;
        state.duel.bAgi = p.agi;
        state.duel.bTN = p.tn;
        state.duel.bDamage = p.damage;
        saveState();
        renderDuel();
      });
    }

    // Import JSON principal
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

    document.getElementById('duel-a-json')?.addEventListener('change', (e) => {
      handleJsonFiles(e.target.files, (pc) => applyPcToDuelA(pc));
      e.target.value = '';
    });

    document.getElementById('gm-load-sample')?.addEventListener('click', loadSamplePcs);
    document.getElementById('gm-clear-pcs')?.addEventListener('click', () => {
      if (state.pcs.length === 0 || confirm('Retirer tous les PJs de la table ?')) {
        state.pcs = [];
        saveState();
        renderAll();
      }
    });

    document.getElementById('gm-toggle-pcs-compact')?.addEventListener('click', () => {
      state.compactPcs = !state.compactPcs;
      saveState();
      renderPcs();
    });

    document.getElementById('gm-quick-rules-btn')?.addEventListener('click', openQuickRulesSearch);
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (document.activeElement && document.activeElement.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
          e.preventDefault();
          openQuickRulesSearch();
        }
      }
    });

    // Recherche dans le Paravent
    let rulesDebounce = null;
    document.getElementById('gm-rules-search')?.addEventListener('input', (e) => {
      state.rulesQuery = e.target.value;
      clearTimeout(rulesDebounce);
      rulesDebounce = setTimeout(() => {
        saveState();
        renderRulesPanel();
      }, 80);
    });

    // Générateur d'Escarmouche & Renforts
    document.getElementById('gm-generate-skirmish')?.addEventListener('click', generateSkirmishFromUi);
    document.getElementById('gm-add-to-skirmish')?.addEventListener('click', addReinforcementsFromUi);

    // Contrôles de combat
    document.getElementById('gm-next-turn')?.addEventListener('click', () => {
      if (state.combat.combatants.length === 0) return;
      state.combat.activeIndex++;
      if (state.combat.activeIndex >= state.combat.combatants.length) {
        state.combat.activeIndex = 0;
        state.combat.round++;
      }
      saveState();
      renderCombat();
    });

    document.getElementById('gm-sort-init')?.addEventListener('click', () => {
      state.combat.combatants = sortCombatantsByInit(state.combat.combatants);
      state.combat.activeIndex = 0;
      saveState();
      renderCombat();
    });

    document.getElementById('gm-reset-combat')?.addEventListener('click', () => {
      if (state.combat.combatants.length === 0 || confirm('Vider le tableau de combat ?')) {
        state.combat = { round: 1, activeIndex: 0, combatants: [] };
        saveState();
        renderCombat();
      }
    });

    // Onglets
    document.querySelectorAll('[data-gm-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeTab = btn.getAttribute('data-gm-tab');
        saveState();
        renderTabs();
      });
    });

    // Duel Iaijutsu
    document.getElementById('duel-a-pc')?.addEventListener('change', (e) => {
      const pc = findPc(e.target.value);
      state.duel.aPcId = e.target.value;
      if (pc) applyPcToDuelA(pc);
      saveState();
      renderDuel();
    });

    const duelFieldMap = {
      'duel-a-name': 'aName', 'duel-a-iai': 'aIai', 'duel-a-per': 'aPer', 'duel-a-void': 'aVoid', 'duel-a-agi': 'aAgi', 'duel-a-tn': 'aTN',
      'duel-b-name': 'bName', 'duel-b-iai': 'bIai', 'duel-b-per': 'bPer', 'duel-b-void': 'bVoid', 'duel-b-agi': 'bAgi', 'duel-b-tn': 'bTN',
      'duel-focus-score-a': 'scoreA', 'duel-focus-score-b': 'scoreB'
    };
    Object.entries(duelFieldMap).forEach(([elId, key]) => {
      const el = document.getElementById(elId);
      if (el) {
        el.addEventListener('input', () => {
          state.duel[key] = el.type === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value;
          saveState();
          renderDuel();
        });
      }
    });

    document.getElementById('duel-auto-focus-btn')?.addEventListener('click', () => {
      const fA = `${(Number(state.duel.aVoid) || 2) + (Number(state.duel.aIai) || 1)}g${Number(state.duel.aVoid) || 2}`;
      const fB = `${(Number(state.duel.bVoid) || 2) + (Number(state.duel.bIai) || 1)}g${Number(state.duel.bVoid) || 2}`;
      const rA = executeGmDiceRoll(fA, `Focus ${state.duel.aName}`, 0);
      const rB = executeGmDiceRoll(fB, `Focus ${state.duel.bName}`, 0);
      if (rA) state.duel.scoreA = rA.total;
      if (rB) state.duel.scoreB = rB.total;
      saveState();
      renderDuel();
    });

    // Lanceur de dés dock
    document.getElementById('gm-dice-roll-btn')?.addEventListener('click', () => executeGmDiceRoll());
    document.getElementById('gm-dice-formula')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeGmDiceRoll();
      }
    });
    document.querySelectorAll('[data-dice-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        executeGmDiceRoll(btn.getAttribute('data-dice-preset'), `Jet rapide ${btn.getAttribute('data-dice-preset')}`);
      });
    });

    // Calculateurs Magie, Peur & ND
    ['magic-calc-ring', 'magic-calc-school', 'magic-calc-mastery', 'magic-calc-raises', 'magic-calc-affinity',
     'fear-calc-level', 'fear-calc-will', 'fear-calc-honor'].forEach((id) => {
      document.getElementById(id)?.addEventListener('input', updateMagicAndFearCalculators);
      document.getElementById(id)?.addEventListener('change', updateMagicAndFearCalculators);
    });
    document.getElementById('magic-calc-roll')?.addEventListener('click', () => {
      const { magic } = updateMagicAndFearCalculators();
      if (magic.cannotCast) return;
      executeGmDiceRoll(magic.formula, `Incantation (ND ${magic.tn})`, 0);
    });
    document.getElementById('fear-calc-roll')?.addEventListener('click', () => {
      const { fear } = updateMagicAndFearCalculators();
      executeGmDiceRoll(fear.formula, `Test de Peur ${fear.level} (ND ${fear.tn})`, 0);
    });

    ['gm-tn-base', 'gm-tn-raises'].forEach((id) => {
      document.getElementById(id)?.addEventListener('input', updateQuickTnCalculator);
      document.getElementById(id)?.addEventListener('change', updateQuickTnCalculator);
    });
    document.querySelectorAll('.gm-tn-mod').forEach((cb) => cb.addEventListener('change', updateQuickTnCalculator));

    // Générateur PNJ express + Notes MJ
    document.getElementById('gm-npc-gen-btn')?.addEventListener('click', () => {
      const npc = generateRandomNpcSummary(globalScope.GM_NPC_NAME_PARTS);
      const out = document.getElementById('gm-npc-gen-output');
      if (out) {
        out.classList.remove('hidden');
        out.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <b class="text-amber-300 font-imperial">${escapeHtml(npc.name)}</b>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-200 border border-amber-500/30">${escapeHtml(npc.clan)}</span>
          </div>
          <div class="text-stone-300">${escapeHtml(npc.demeanor)}</div>
          <div class="text-stone-400 italic">Secret : ${escapeHtml(npc.secret)}</div>
        `;
      }
    });

    document.getElementById('gm-scratchpad')?.addEventListener('input', (e) => {
      state.gmScratchpad = e.target.value;
      saveState();
    });
    document.getElementById('gm-copy-notes')?.addEventListener('click', () => {
      const text = state.gmScratchpad || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    });

    // Délégation des actions dynamiques
    document.addEventListener('click', (e) => {
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
      } else if (action === 'duel-reset') {
        state.duel.aFocus = 0;
        state.duel.bFocus = 0;
        state.duel.scoreA = '';
        state.duel.scoreB = '';
        saveState();
        renderDuel();
      } else if (action === 'duel-roll-phase') {
        const side = btn.getAttribute('data-side');
        const phase = btn.getAttribute('data-phase');
        const d = state.duel;
        const name = side === 'a' ? d.aName : d.bName;
        const iai = Number(side === 'a' ? d.aIai : d.bIai) || 1;
        const per = Number(side === 'a' ? d.aPer : d.bPer) || 2;
        const v = Number(side === 'a' ? d.aVoid : d.bVoid) || 2;
        const agi = Number(side === 'a' ? d.aAgi : d.bAgi) || 2;
        let f = `${per + iai}g${per}`;
        let label = `Évaluation ${name}`;
        if (phase === 'focus') {
          f = `${v + iai}g${v}`;
          label = `Concentration ${name}`;
        } else if (phase === 'strike') {
          f = `${agi + iai}g${agi}`;
          label = `Frappe Iaijutsu ${name}`;
        }
        const rolled = executeGmDiceRoll(f, label, 0);
        if (rolled && phase === 'focus') {
          if (side === 'a') state.duel.scoreA = rolled.total;
          if (side === 'b') state.duel.scoreB = rolled.total;
          saveState();
          renderDuel();
        }
      } else if (action === 'roll-formula') {
        const f = btn.getAttribute('data-formula');
        const label = btn.getAttribute('data-roll-label') || `Jet ${f}`;
        const pen = btn.getAttribute('data-penalty');
        executeGmDiceRoll(f, label, pen != null ? parseInt(pen, 10) || 0 : null);
      } else if (action === 'set-rule-cat') {
        state.rulesCategory = btn.getAttribute('data-cat-id') || 'all';
        saveState();
        renderRulesPanel();
      } else if (action === 'scenario-jump') {
        const targetId = btn.getAttribute('data-target');
        const targetEl = targetId ? document.getElementById(targetId) : null;
        if (targetEl && typeof targetEl.scrollIntoView === 'function') {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (action === 'scenario-reset-checks') {
        const scId = btn.getAttribute('data-scenario-id');
        if (scId && state.scenario && state.scenario.checked) {
          state.scenario.checked[scId] = {};
          saveState();
          renderScenarioPanel();
        }
      } else if (action === 'scenario-launch-encounter') {
        const scId = btn.getAttribute('data-scenario-id');
        const encId = btn.getAttribute('data-encounter-id');
        launchScenarioEncounter(scId, encId);
      } else if (action === 'scenario-add-npc') {
        const presetName = btn.getAttribute('data-preset-name');
        addScenarioNpcToCombat(presetName);
      } else if (action === 'scenario-unlock') {
        const pwdEl = document.getElementById('gm-scenario-pwd');
        const errEl = document.getElementById('gm-scenario-pwd-error');
        const val = pwdEl ? pwdEl.value : '';
        if (isValidGmScenarioPassword(val)) {
          try { sessionStorage.setItem('l5r_maho_unlocked', 'true'); } catch (_) {}
          populateSkirmishNpcPresetSelect();
          renderScenarioPanel();
        } else if (errEl) {
          errEl.classList.remove('hidden');
        }
      } else if (action === 'scenario-lock') {
        try { sessionStorage.removeItem('l5r_maho_unlocked'); } catch (_) {}
        populateSkirmishNpcPresetSelect();
        renderScenarioPanel();
      } else if (action === 'scenario-show-image') {
        const modal = document.getElementById('gm-lightbox-modal');
        const img = document.getElementById('gm-lightbox-img');
        const title = document.getElementById('gm-lightbox-title');
        if (modal && img) {
          img.src = btn.getAttribute('data-img-src') || '';
          img.alt = btn.getAttribute('data-img-title') || '';
          if (title) title.textContent = btn.getAttribute('data-img-title') || '';
          modal.classList.remove('hidden');
        }
      } else if (action === 'clear-combat-log') {
        state.combatLog = [];
        saveState();
        renderCombatLog();
      } else if (action === 'ambience-play') {
        startGmAmbience(btn.getAttribute('data-ambience'));
      } else if (action === 'ambience-stop') {
        stopGmAmbience();
      }
    });

    document.getElementById('gm-ambience-volume')?.addEventListener('input', (e) => {
      if (_ambienceGain) {
        const vol = (Number(e.target.value) || 0) / 100;
        _ambienceGain.gain.value = Math.max(0.005, vol * 0.35);
      }
    });

    const lightboxClose = document.getElementById('gm-lightbox-close');
    const lightboxModal = document.getElementById('gm-lightbox-modal');
    if (lightboxClose && lightboxModal) {
      lightboxClose.addEventListener('click', () => lightboxModal.classList.add('hidden'));
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) lightboxModal.classList.add('hidden');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('gm-lightbox-modal');
        if (modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      }
      if (e.key === 'Enter' && e.target && e.target.id === 'gm-scenario-pwd') {
        e.preventDefault();
        const unlockBtn = document.querySelector('[data-action="scenario-unlock"]');
        if (unlockBtn) unlockBtn.click();
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
      } else if (action === 'pc-skirmish-toggle') {
        const pc = findPc(el.getAttribute('data-pc-id'));
        if (pc) {
          pc.includedInSkirmish = Boolean(el.checked);
          saveState();
          renderSkirmishSetup();
        }
      } else if (action === 'scenario-toggle-check') {
        const scId = el.getAttribute('data-scenario-id');
        const checkId = el.getAttribute('data-check-id');
        if (scId && checkId) {
          if (!state.scenario) state.scenario = { selectedId: scId, checked: {} };
          if (!state.scenario.checked) state.scenario.checked = {};
          if (!state.scenario.checked[scId]) state.scenario.checked[scId] = {};
          state.scenario.checked[scId][checkId] = Boolean(el.checked);
          saveState();
          renderScenarioPanel();
        }
      } else if (action === 'scenario-select') {
        if (!state.scenario) state.scenario = { selectedId: el.value, checked: {} };
        state.scenario.selectedId = el.value;
        saveState();
        renderScenarioPanel();
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
    globalScope.ENEMY_PRESETS = ENEMY_PRESETS;
    globalScope.computeL5RWoundState = computeL5RWoundState;
    globalScope.computeEffectiveCombatantTN = computeEffectiveCombatantTN;
    globalScope.computeIaijutsuFocusVerdict = computeIaijutsuFocusVerdict;
    globalScope.computeMagicCastParams = computeMagicCastParams;
    globalScope.filterGmRulesCards = filterGmRulesCards;
    globalScope.generateRandomNpcSummary = generateRandomNpcSummary;
    globalScope.normalizeImportedCharacter = normalizeImportedCharacter;
    globalScope.sortCombatantsByInit = sortCombatantsByInit;
    globalScope.formatRollResult = formatRollResult;
    globalScope.buildSkirmishCombatants = buildSkirmishCombatants;
    globalScope.rollFormula = rollFormula;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      WOUND_LEVELS,
      STANCES,
      ENEMY_PRESETS,
      DUEL_PRESETS,
      parseRollKeepFormula,
      applyTenDiceRule,
      simulateRollAndKeep,
      computeL5RWoundState,
      computeEffectiveCombatantTN,
      computeIaijutsuFocusVerdict,
      computeMagicCastParams,
      filterGmRulesCards,
      generateRandomNpcSummary,
      normalizeImportedCharacter,
      sortCombatantsByInit,
      formatRollResult,
      buildSkirmishCombatants,
      rollFormula
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
