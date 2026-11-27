/**
 * js/firebase-service.js
 * Socle Firebase Auth (Google + Email/Mot de passe), Rôle MJ, Membres de la Table & Dojo Cloud
 * pour Les Chroniques de Rokugan (L5R 4e Édition).
 * 100 % Vanilla JS (SDK Firebase v11 ESM chargé à la demande via CDN officiel).
 * Mode Invité / Hors-Ligne (localStorage) intégralement préservé.
 */
(function (globalScope) {
  'use strict';

  const FIREBASE_SDK_VERSION = '11.6.1';
  const DOJO_STORAGE_KEY = 'l5r_dojo_characters_v4';
  const LEGACY_DOJO_KEY = 'l5r_saved_characters';

  // ===========================================================================
  // 1. FONCTIONS PURES & TESTABLES (NODE.JS + NAVIGATEUR)
  // ===========================================================================
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeFirebaseKey(raw) {
    const cleaned = String(raw || '')
      .trim()
      .replace(/[.#$\[\]\/\s]+/g, '_')
      .replace(/^_+|_+$/g, '');
    return cleaned || `samurai_${Date.now()}`;
  }

  function stripUndefinedDeep(value) {
    if (value === undefined) return undefined;
    if (value === null || typeof value !== 'object') return value;
    if (Array.isArray(value)) {
      return value
        .map((item) => stripUndefinedDeep(item))
        .filter((item) => item !== undefined);
    }
    const out = {};
    Object.keys(value).forEach((key) => {
      const cleaned = stripUndefinedDeep(value[key]);
      if (cleaned !== undefined) {
        out[key] = cleaned;
      }
    });
    return out;
  }

  function isGmUser(user, gmEmail, gmUid = null) {
    if (!user || typeof user !== 'object') return false;
    if (gmUid && user.uid && String(user.uid) === String(gmUid)) return true;
    const expected = String(gmEmail || '').trim().toLowerCase();
    const actual = String(user.email || '').trim().toLowerCase();
    if (!expected || !actual) return false;
    return actual === expected && user.emailVerified !== false;
  }

  function computeNarrativeWoundLabel(wounds = 0, earthRing = 2) {
    const w = Math.max(0, parseInt(wounds, 10) || 0);
    const e = Math.max(1, parseInt(earthRing, 10) || 2);
    if (w === 0) return 'Indemne';
    if (w <= e * 5) return 'Éraflé';
    if (w <= e * 9) return 'Blessé';
    if (w <= e * 13) return 'Gravement blessé';
    if (w <= e * 17) return 'Critique';
    return 'Hors de combat';
  }

  /**
   * Construit une carte résumé publique (sans spoilers : pas de Désavantages, Souillure, XP ni Notes secrètes)
   * visible par les autres PJs approuvés de la table.
   */
  function buildPublicPartySummary(charData, ownerUid) {
    const c = charData || {};
    const traits = c.traits || {};
    const sta = parseInt(traits.stamina ?? traits.sta, 10) || 2;
    const wil = parseInt(traits.willpower ?? traits.wil, 10) || 2;
    const earthRing = Math.min(sta, wil);
    const wounds = parseInt(c.sessionState?.wounds ?? c.wounds, 10) || 0;

    return stripUndefinedDeep({
      id: sanitizeFirebaseKey(c.id || c.name),
      ownerUid: String(ownerUid || ''),
      name: String(c.name || 'Samouraï').trim(),
      clan: String(c.clan || ''),
      clanLabel: String(c.clanLabel || c.clan || ''),
      family: String(c.family || ''),
      school: String(c.schoolLabel || c.school || ''),
      rank: parseInt(c.insightRank ?? c.rank, 10) || 1,
      honor: Number(c.honor ?? 4.5) || 4.5,
      woundStatus: computeNarrativeWoundLabel(wounds, earthRing),
      updatedAt: c.updatedAt || new Date().toISOString()
    });
  }

  /**
   * Construit l'entrée complète du Roster Campagne accessible par le MJ (et le PJ propriétaire).
   */
  function buildCampaignRosterEntry(charData, ownerUid, ownerName = '') {
    const c = stripUndefinedDeep(charData || {});
    const safeId = sanitizeFirebaseKey(c.id || c.name);
    const voidMax = parseInt(c.voidRing ?? c.voidMax ?? c.traits?.voi, 10) || 2;
    const voidSpent = parseInt(c.sessionState?.voidSpent, 10) || 0;

    return stripUndefinedDeep({
      ...c,
      id: safeId,
      ownerUid: String(ownerUid || ''),
      ownerName: String(ownerName || ''),
      isCampaignActive: true,
      liveState: {
        wounds: Math.max(0, parseInt(c.sessionState?.wounds ?? c.wounds, 10) || 0),
        voidCurrent: Math.max(0, voidMax - voidSpent),
        voidMax,
        honor: Number(c.honor ?? 4.5) || 4.5,
        glory: Number(c.glory ?? 1.0) || 1.0,
        status: Number(c.status ?? 1.0) || 1.0,
        taint: Number(c.sessionState?.taint ?? c.taint ?? 0) || 0,
        spellsSpent: c.sessionState?.spellsSpent || { air: 0, terre: 0, feu: 0, eau: 0, vide: 0 }
      },
      updatedAt: c.updatedAt || new Date().toISOString()
    });
  }

  /**
   * Fusionne le Dojo local (tableau) et le Dojo Cloud (objet map ou tableau) sans jamais perdre de fiche.
   * Pour un même id, conserve la version avec le timestamp `updatedAt` le plus récent.
   */
  function mergeLocalAndCloudCharacters(localList, cloudMapOrList) {
    const byId = new Map();

    const addEntry = (item, source) => {
      if (!item || typeof item !== 'object' || !item.name) return;
      const key = sanitizeFirebaseKey(item.id || item.name);
      const normalized = {
        ...item,
        id: item.id || key,
        cloudSynced: source === 'cloud' ? true : Boolean(item.cloudSynced)
      };
      const prev = byId.get(key);
      if (!prev) {
        byId.set(key, normalized);
        return;
      }
      const prevTs = Date.parse(prev.updatedAt || '') || 0;
      const nextTs = Date.parse(normalized.updatedAt || '') || 0;
      if (nextTs >= prevTs) {
        byId.set(key, {
          ...normalized,
          cloudSynced: Boolean(prev.cloudSynced || normalized.cloudSynced)
        });
      } else {
        byId.set(key, {
          ...prev,
          cloudSynced: Boolean(prev.cloudSynced || normalized.cloudSynced)
        });
      }
    };

    (Array.isArray(localList) ? localList : []).forEach((c) => addEntry(c, 'local'));
    const cloudEntries = Array.isArray(cloudMapOrList)
      ? cloudMapOrList
      : (cloudMapOrList && typeof cloudMapOrList === 'object' ? Object.values(cloudMapOrList) : []);
    cloudEntries.forEach((c) => addEntry(c, 'cloud'));

    return Array.from(byId.values()).sort((a, b) => {
      const ta = Date.parse(a.updatedAt || '') || 0;
      const tb = Date.parse(b.updatedAt || '') || 0;
      return tb - ta;
    });
  }

  function computeCloudSyncBadgeState(authState) {
    const s = authState || {};
    if (!s.user) {
      return {
        label: 'Connexion',
        shortLabel: 'Connexion',
        icon: '👤',
        tone: 'guest',
        isGm: false,
        isApproved: false,
        isPending: false
      };
    }
    const firstName = String(s.user.displayName || s.user.email || 'Samouraï')
      .split(/[\s@]/)[0]
      .slice(0, 14);
    if (s.isGm) {
      return {
        label: `MJ • ${firstName}`,
        shortLabel: 'MJ',
        icon: '👑',
        tone: 'gm',
        isGm: true,
        isApproved: true,
        isPending: false
      };
    }
    if (s.memberStatus === 'approved') {
      return {
        label: `${firstName} • Table`,
        shortLabel: firstName,
        icon: '☁️',
        tone: 'approved',
        isGm: false,
        isApproved: true,
        isPending: false
      };
    }
    if (s.memberStatus === 'pending') {
      return {
        label: `${firstName} (En attente)`,
        shortLabel: firstName,
        icon: '⏳',
        tone: 'pending',
        isGm: false,
        isApproved: false,
        isPending: true
      };
    }
    return {
      label: `${firstName} • Dojo`,
      shortLabel: firstName,
      icon: '☁️',
      tone: 'private',
      isGm: false,
      isApproved: false,
      isPending: false
    };
  }

  function formatFirebaseAuthError(err) {
    const code = String(err?.code || '');
    const map = {
      'auth/popup-closed-by-user': 'Fenêtre de connexion fermée avant validation.',
      'auth/popup-blocked': 'Popup bloquée par le navigateur : autorisez les popups pour ce site.',
      'auth/unauthorized-domain': 'Domaine non autorisé dans Firebase Auth (ajoutez ce domaine dans Console Firebase → Authentication → Domaines autorisés).',
      'auth/invalid-email': 'Adresse e-mail invalide.',
      'auth/invalid-credential': 'Identifiants incorrects (e-mail ou mot de passe).',
      'auth/wrong-password': 'Mot de passe incorrect.',
      'auth/user-not-found': 'Aucun compte trouvé avec cette adresse e-mail.',
      'auth/email-already-in-use': 'Cette adresse e-mail possède déjà un compte.',
      'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
      'auth/operation-not-allowed': 'Ce fournisseur de connexion n\'est pas encore activé dans votre Console Firebase (Authentication → Sign-in method).'
    };
    return map[code] || (err?.message || 'Erreur de connexion Firebase.');
  }

  // ===========================================================================
  // 2. SERVICE CLIENT FIREBASE (NAVIGATEUR UNIQUEMENT)
  // ===========================================================================
  let sdk = null;
  let initPromise = null;
  let activeUnsubs = [];
  const listeners = new Set();

  const runtimeState = {
    ready: false,
    offline: false,
    error: null,
    user: null,
    gmUid: null,
    isGm: false,
    memberStatus: null, // null | 'pending' | 'approved' | 'revoked'
    isApproved: false,
    cloudCharacters: {},
    campaignMembers: {}
  };

  function getConfig() {
    return globalScope.L5R_FIREBASE_CONFIG || null;
  }

  function getGmEmail() {
    return globalScope.L5R_GM_EMAIL || 'vincent.david.perso@gmail.com';
  }

  function emitStateChange(eventName = 'l5r-auth-changed') {
    const snapshot = getState();
    listeners.forEach((fn) => {
      try { fn(snapshot); } catch (_) {}
    });
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent(eventName, { detail: snapshot }));
      } catch (_) {}
    }
    syncNavbarAccountButtons();
    if (document.getElementById('l5r-account-modal') && !document.getElementById('l5r-account-modal').classList.contains('hidden')) {
      renderAccountModalContent();
    }
  }

  function getState() {
    return {
      ready: runtimeState.ready,
      offline: runtimeState.offline,
      error: runtimeState.error,
      user: runtimeState.user ? {
        uid: runtimeState.user.uid,
        email: runtimeState.user.email || '',
        displayName: runtimeState.user.displayName || '',
        photoURL: runtimeState.user.photoURL || '',
        emailVerified: Boolean(runtimeState.user.emailVerified)
      } : null,
      gmUid: runtimeState.gmUid,
      isGm: runtimeState.isGm,
      memberStatus: runtimeState.memberStatus,
      isApproved: runtimeState.isApproved,
      cloudCharacters: { ...runtimeState.cloudCharacters },
      campaignMembers: { ...runtimeState.campaignMembers }
    };
  }

  function subscribe(fn) {
    if (typeof fn !== 'function') return () => {};
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function cleanupRealtimeListeners() {
    activeUnsubs.forEach((unsub) => {
      try { if (typeof unsub === 'function') unsub(); } catch (_) {}
    });
    activeUnsubs = [];
  }

  function applyGmSecretsUnlock(shouldUnlock) {
    try {
      if (shouldUnlock) {
        sessionStorage.setItem('l5r_maho_unlocked', 'true');
        localStorage.setItem('l5r_gm_secrets_unlocked', '1');
      }
    } catch (_) {}
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('l5r-gm-role-changed', { detail: { isGm: Boolean(shouldUnlock) } }));
      } catch (_) {}
    }
  }

  function syncCloudCharactersToLocalDojo() {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem(LEGACY_DOJO_KEY);
      const localList = raw ? JSON.parse(raw) : [];
      const merged = mergeLocalAndCloudCharacters(localList, runtimeState.cloudCharacters);
      const serialized = JSON.stringify(merged);
      localStorage.setItem(DOJO_STORAGE_KEY, serialized);
      localStorage.setItem(LEGACY_DOJO_KEY, serialized);
      if (typeof window.renderDojoList === 'function') window.renderDojoList();
      if (typeof window.renderDojoRoster === 'function') window.renderDojoRoster();
      if (typeof window.renderHomeSections === 'function') window.renderHomeSections();
      window.dispatchEvent(new CustomEvent('l5r-cloud-dojo-updated', { detail: { characters: merged } }));
    } catch (e) {
      console.warn('[L5RFirebase] Erreur synchro Dojo local/cloud :', e);
    }
  }

  async function loadFirebaseSdk() {
    if (sdk) return sdk;
    if (initPromise) return initPromise;

    initPromise = (async () => {
      const cfg = getConfig();
      if (!cfg || !cfg.apiKey || !cfg.databaseURL) {
        runtimeState.offline = true;
        runtimeState.ready = true;
        emitStateChange();
        return null;
      }
      if (typeof window === 'undefined' || window.location.protocol === 'file:') {
        runtimeState.offline = true;
        runtimeState.ready = true;
        emitStateChange();
        return null;
      }

      try {
        const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
        const [appMod, authMod, dbMod] = await Promise.all([
          import(`${base}/firebase-app.js`),
          import(`${base}/firebase-auth.js`),
          import(`${base}/firebase-database.js`)
        ]);

        const app = appMod.getApps().length > 0 ? appMod.getApps()[0] : appMod.initializeApp(cfg);
        const auth = authMod.getAuth(app);
        const db = dbMod.getDatabase(app);

        sdk = { app, auth, db, authMod, dbMod };
        bindAuthObserver();
        return sdk;
      } catch (err) {
        console.warn('[L5RFirebase] Mode hors-ligne actif (SDK indisponible) :', err);
        runtimeState.offline = true;
        runtimeState.ready = true;
        runtimeState.error = err?.message || 'Hors-ligne';
        emitStateChange();
        return null;
      }
    })();

    return initPromise;
  }

  function bindAuthObserver() {
    if (!sdk) return;
    const { auth, db, authMod, dbMod } = sdk;

    authMod.onAuthStateChanged(auth, async (user) => {
      cleanupRealtimeListeners();
      runtimeState.user = user || null;
      runtimeState.cloudCharacters = {};
      runtimeState.campaignMembers = {};
      runtimeState.memberStatus = null;
      runtimeState.isGm = false;
      runtimeState.isApproved = false;
      runtimeState.ready = true;

      if (!user) {
        emitStateChange();
        return;
      }

      // 1. Lire config/gmUid pour vérifier le rôle MJ
      try {
        const gmSnap = await dbMod.get(dbMod.ref(db, 'config/gmUid'));
        runtimeState.gmUid = gmSnap.exists() ? gmSnap.val() : null;
      } catch (_) {
        runtimeState.gmUid = null;
      }

      runtimeState.isGm = isGmUser(user, getGmEmail(), runtimeState.gmUid);
      if (runtimeState.isGm) {
        runtimeState.isApproved = true;
        runtimeState.memberStatus = 'approved';
        applyGmSecretsUnlock(true);
        // Enregistrer gmUid si pas encore posé
        if (!runtimeState.gmUid && user.emailVerified) {
          dbMod.set(dbMod.ref(db, 'config/gmUid'), user.uid).catch(() => {});
        }
      }

      // 2. Sauvegarder le profil utilisateur
      const profileData = stripUndefinedDeep({
        uid: user.uid,
        displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Samouraï'),
        email: user.email || '',
        photoURL: user.photoURL || '',
        updatedAt: new Date().toISOString()
      });
      dbMod.set(dbMod.ref(db, `users/${user.uid}/profile`), profileData).catch(() => {});

      // 3. Écouter les personnages du Dojo Cloud en temps réel
      const charsRef = dbMod.ref(db, `users/${user.uid}/characters`);
      const unsubChars = dbMod.onValue(charsRef, (snap) => {
        runtimeState.cloudCharacters = snap.exists() ? (snap.val() || {}) : {};
        syncCloudCharactersToLocalDojo();
        emitStateChange('l5r-auth-changed');
      }, (err) => {
        console.warn('[L5RFirebase] Lecture Dojo Cloud refusée ou indisponible :', err?.message);
      });
      activeUnsubs.push(unsubChars);

      // 4. Écouter le statut membre de la table
      if (!runtimeState.isGm) {
        const memRef = dbMod.ref(db, `campaign/members/${user.uid}`);
        const unsubMem = dbMod.onValue(memRef, (snap) => {
          const val = snap.exists() ? snap.val() : null;
          runtimeState.memberStatus = val?.status || null;
          runtimeState.isApproved = runtimeState.memberStatus === 'approved';
          emitStateChange();
        }, () => {});
        activeUnsubs.push(unsubMem);
      } else {
        // Le MJ écoute toute la liste des membres (demandes en attente + membres approuvés)
        const allMemRef = dbMod.ref(db, 'campaign/members');
        const unsubAllMem = dbMod.onValue(allMemRef, (snap) => {
          runtimeState.campaignMembers = snap.exists() ? (snap.val() || {}) : {};
          emitStateChange();
        }, () => {});
        activeUnsubs.push(unsubAllMem);
      }

      emitStateChange();
    });
  }

  async function ensureReadySdk() {
    const loaded = await loadFirebaseSdk();
    if (!loaded) {
      throw new Error('Connexion Firebase indisponible (mode hors-ligne ou fichier local).');
    }
    return loaded;
  }

  async function signInWithGoogle() {
    const { auth, authMod } = await ensureReadySdk();
    const provider = new authMod.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return authMod.signInWithPopup(auth, provider);
  }

  async function signInWithEmail(email, password) {
    const { auth, authMod } = await ensureReadySdk();
    return authMod.signInWithEmailAndPassword(auth, String(email || '').trim(), String(password || ''));
  }

  async function registerWithEmail(email, password, displayName = '') {
    const { auth, authMod } = await ensureReadySdk();
    const cred = await authMod.createUserWithEmailAndPassword(auth, String(email || '').trim(), String(password || ''));
    if (displayName && cred?.user) {
      await authMod.updateProfile(cred.user, { displayName: String(displayName).trim() });
    }
    return cred;
  }

  async function signOut() {
    const { auth, authMod } = await ensureReadySdk();
    return authMod.signOut(auth);
  }

  async function requestCampaignAccess(customName = '') {
    const { db, dbMod } = await ensureReadySdk();
    const user = runtimeState.user;
    if (!user) throw new Error('Vous devez être connecté pour demander l\'accès à la table.');
    const displayName = String(customName || user.displayName || user.email?.split('@')[0] || 'Samouraï').trim();
    const payload = stripUndefinedDeep({
      uid: user.uid,
      displayName,
      email: user.email || '',
      photoURL: user.photoURL || '',
      status: runtimeState.memberStatus || 'pending',
      requestedAt: new Date().toISOString()
    });
    await dbMod.set(dbMod.ref(db, `campaign/members/${user.uid}`), payload);
    return payload;
  }

  async function approveCampaignMember(targetUid, status = 'approved') {
    const { db, dbMod } = await ensureReadySdk();
    if (!runtimeState.isGm) throw new Error('Action réservée au Maître du Jeu.');
    const safeStatus = ['approved', 'pending', 'revoked'].includes(status) ? status : 'approved';
    await dbMod.update(dbMod.ref(db, `campaign/members/${targetUid}`), {
      status: safeStatus,
      reviewedAt: new Date().toISOString(),
      reviewedBy: runtimeState.user.uid
    });
  }

  async function saveCharacterToCloud(charData) {
    if (!runtimeState.user || !sdk) return false;
    const { db, dbMod } = sdk;
    const uid = runtimeState.user.uid;
    const safeId = sanitizeFirebaseKey(charData?.id || charData?.name);
    const enriched = stripUndefinedDeep({
      ...charData,
      id: charData?.id || safeId,
      ownerUid: uid,
      cloudSynced: true,
      updatedAt: charData?.updatedAt || new Date().toISOString()
    });

    await dbMod.set(dbMod.ref(db, `users/${uid}/characters/${safeId}`), enriched);

    // Si le personnage est marqué actif pour la Campagne et que le joueur est membre approuvé (ou MJ)
    if (enriched.isCampaignActive && (runtimeState.isApproved || runtimeState.isGm)) {
      const ownerName = runtimeState.user.displayName || runtimeState.user.email || '';
      const rosterEntry = buildCampaignRosterEntry(enriched, uid, ownerName);
      const publicEntry = buildPublicPartySummary(enriched, uid);
      await Promise.all([
        dbMod.set(dbMod.ref(db, `campaign/roster/${safeId}`), rosterEntry),
        dbMod.set(dbMod.ref(db, `campaign/publicParty/${safeId}`), publicEntry)
      ]);
    }
    return true;
  }

  async function deleteCharacterFromCloud(charId) {
    if (!runtimeState.user || !sdk) return false;
    const { db, dbMod } = sdk;
    const uid = runtimeState.user.uid;
    const safeId = sanitizeFirebaseKey(charId);
    await dbMod.remove(dbMod.ref(db, `users/${uid}/characters/${safeId}`));
    if (runtimeState.isApproved || runtimeState.isGm) {
      await Promise.allSettled([
        dbMod.remove(dbMod.ref(db, `campaign/roster/${safeId}`)),
        dbMod.remove(dbMod.ref(db, `campaign/publicParty/${safeId}`))
      ]);
    }
    return true;
  }

  async function setCharacterCampaignActive(charData, isActive) {
    if (!runtimeState.user || !sdk) {
      throw new Error('Connectez-vous d\'abord pour synchroniser un personnage avec la Table de Campagne.');
    }
    if (!runtimeState.isApproved && !runtimeState.isGm) {
      throw new Error('Votre compte doit être approuvé par le MJ pour apparaître sur la Table de Campagne.');
    }
    const { db, dbMod } = sdk;
    const uid = runtimeState.user.uid;
    const safeId = sanitizeFirebaseKey(charData?.id || charData?.name);
    const updated = {
      ...charData,
      id: charData?.id || safeId,
      isCampaignActive: Boolean(isActive),
      updatedAt: new Date().toISOString()
    };

    await dbMod.set(dbMod.ref(db, `users/${uid}/characters/${safeId}`), stripUndefinedDeep(updated));

    if (isActive) {
      const ownerName = runtimeState.user.displayName || runtimeState.user.email || '';
      await Promise.all([
        dbMod.set(dbMod.ref(db, `campaign/roster/${safeId}`), buildCampaignRosterEntry(updated, uid, ownerName)),
        dbMod.set(dbMod.ref(db, `campaign/publicParty/${safeId}`), buildPublicPartySummary(updated, uid))
      ]);
    } else {
      await Promise.allSettled([
        dbMod.remove(dbMod.ref(db, `campaign/roster/${safeId}`)),
        dbMod.remove(dbMod.ref(db, `campaign/publicParty/${safeId}`))
      ]);
    }
    return updated;
  }

  async function migrateLocalDojoToCloud() {
    if (!runtimeState.user || !sdk) throw new Error('Veuillez vous connecter pour envoyer votre Dojo dans le Cloud.');
    const raw = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem(LEGACY_DOJO_KEY);
    const localList = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(localList) || localList.length === 0) return 0;

    let count = 0;
    for (const c of localList) {
      if (!c || !c.name) continue;
      await saveCharacterToCloud(c);
      count++;
    }
    return count;
  }

  // ===========================================================================
  // 3. UI GLOBALE : BOUTON NAVBAR + MODALE COMPTE & APPROBATION MJ
  // ===========================================================================
  function syncNavbarAccountButtons() {
    if (typeof document === 'undefined') return;
    const badge = computeCloudSyncBadgeState(runtimeState);
    document.querySelectorAll('[data-action="open-account-modal"]').forEach((btn) => {
      const iconEl = btn.querySelector('.account-btn-icon');
      const labelEl = btn.querySelector('.account-btn-label');
      if (iconEl) iconEl.textContent = badge.icon;
      if (labelEl) labelEl.textContent = badge.shortLabel;
      btn.title = badge.label;

      btn.classList.remove('border-amber-500/40', 'border-emerald-500/60', 'border-purple-500/60', 'bg-emerald-950/50', 'bg-amber-950/60');
      if (badge.tone === 'gm') {
        btn.classList.add('border-amber-500/40', 'bg-amber-950/60');
      } else if (badge.tone === 'approved') {
        btn.classList.add('border-emerald-500/60', 'bg-emerald-950/50');
      } else {
        btn.classList.add('border-amber-500/40');
      }
    });
  }

  function ensureAccountModalDom() {
    if (typeof document === 'undefined') return null;
    let modal = document.getElementById('l5r-account-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'l5r-account-modal';
    modal.className = 'hidden fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5';
    modal.innerHTML = `
      <div class="card-clean rounded-2xl border border-amber-500/45 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-amber-500/20 bg-black/50">
          <div class="flex items-center gap-2">
            <span class="text-lg">🏯</span>
            <h2 class="font-imperial font-bold text-sm sm:text-base text-amber-300">Compte &amp; Dojo Cloud</h2>
          </div>
          <button type="button" id="l5r-account-modal-close" class="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 cursor-pointer">✕</button>
        </div>
        <div id="l5r-account-modal-body" class="p-5 space-y-4 text-xs"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAccountModal();
    });
    modal.querySelector('#l5r-account-modal-close')?.addEventListener('click', closeAccountModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeAccountModal();
    });
    return modal;
  }

  let authFormMode = 'login'; // 'login' | 'register'

  function setModalMessage(msg, isError = false) {
    const box = document.getElementById('l5r-account-feedback');
    if (!box) return;
    box.textContent = msg;
    box.className = `p-2.5 rounded-lg border text-[11px] leading-snug ${
      isError
        ? 'bg-red-950/80 border-red-500/50 text-red-200'
        : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
    }`;
    box.classList.remove('hidden');
  }

  function renderAccountModalContent() {
    const body = document.getElementById('l5r-account-modal-body');
    if (!body) return;

    if (runtimeState.offline) {
      body.innerHTML = `
        <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 space-y-2">
          <div class="font-imperial font-bold">Mode Hors-Ligne / Local actif</div>
          <p class="text-stone-300 leading-relaxed">
            La connexion Firebase nécessite un accès HTTP/HTTPS (GitHub Pages ou serveur local). Vos personnages restent sauvegardés localement dans votre navigateur sans aucune perte.
          </p>
        </div>
      `;
      return;
    }

    if (!runtimeState.user) {
      const isReg = authFormMode === 'register';
      body.innerHTML = `
        <p class="text-stone-300 leading-relaxed">
          Connectez-vous pour retrouver vos samouraïs sur tous vos appareils (<b>Dojo Cloud</b>) et rejoindre les outils temps réel de la campagne. Sans compte, le <b>mode invité local</b> reste 100 % fonctionnel.
        </p>

        <div id="l5r-account-feedback" class="hidden"></div>

        <button type="button" id="l5r-btn-google-signin" class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg cursor-pointer transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.3 24 12 24z"/><path fill="#FBBC05" d="M5.3 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/></svg>
          <span>Continuer avec Google</span>
        </button>

        <div class="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider">
          <div class="flex-1 border-t border-stone-800"></div>
          <span>ou par e-mail</span>
          <div class="flex-1 border-t border-stone-800"></div>
        </div>

        <div class="flex gap-1.5 bg-black/50 p-1 rounded-lg border border-stone-800">
          <button type="button" id="l5r-tab-login" class="flex-1 py-1.5 rounded-md font-imperial font-bold text-[11px] cursor-pointer transition ${!isReg ? 'bg-amber-600 text-black' : 'text-stone-400 hover:text-stone-200'}">Connexion</button>
          <button type="button" id="l5r-tab-register" class="flex-1 py-1.5 rounded-md font-imperial font-bold text-[11px] cursor-pointer transition ${isReg ? 'bg-amber-600 text-black' : 'text-stone-400 hover:text-stone-200'}">Créer un compte</button>
        </div>

        <form id="l5r-email-auth-form" class="space-y-2.5">
          ${isReg ? `
            <div>
              <label class="block text-amber-300 font-bold mb-1" for="l5r-auth-name">Nom / Pseudo de joueur</label>
              <input id="l5r-auth-name" type="text" required placeholder="Ex: Tsuruchi Akira" class="w-full p-2.5 rounded-lg bg-black/70 border border-stone-700 text-stone-100 focus:outline-none focus:border-amber-400" />
            </div>
          ` : ''}
          <div>
            <label class="block text-amber-300 font-bold mb-1" for="l5r-auth-email">Adresse e-mail</label>
            <input id="l5r-auth-email" type="email" required placeholder="samourai@exemple.fr" class="w-full p-2.5 rounded-lg bg-black/70 border border-stone-700 text-stone-100 focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="block text-amber-300 font-bold mb-1" for="l5r-auth-password">Mot de passe</label>
            <input id="l5r-auth-password" type="password" required minlength="6" placeholder="6 caractères minimum" class="w-full p-2.5 rounded-lg bg-black/70 border border-stone-700 text-stone-100 focus:outline-none focus:border-amber-400" />
          </div>
          <button type="submit" class="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-imperial font-extrabold text-xs cursor-pointer transition shadow">
            ${isReg ? '✨ Créer mon compte' : '🔑 Se connecter'}
          </button>
        </form>
      `;

      body.querySelector('#l5r-btn-google-signin')?.addEventListener('click', async () => {
        try {
          await signInWithGoogle();
        } catch (err) {
          setModalMessage(formatFirebaseAuthError(err), true);
        }
      });

      body.querySelector('#l5r-tab-login')?.addEventListener('click', () => {
        authFormMode = 'login';
        renderAccountModalContent();
      });
      body.querySelector('#l5r-tab-register')?.addEventListener('click', () => {
        authFormMode = 'register';
        renderAccountModalContent();
      });

      body.querySelector('#l5r-email-auth-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = body.querySelector('#l5r-auth-email')?.value || '';
        const pwd = body.querySelector('#l5r-auth-password')?.value || '';
        const name = body.querySelector('#l5r-auth-name')?.value || '';
        try {
          if (authFormMode === 'register') {
            await registerWithEmail(email, pwd, name);
          } else {
            await signInWithEmail(email, pwd);
          }
        } catch (err) {
          setModalMessage(formatFirebaseAuthError(err), true);
        }
      });
      return;
    }

    // UTILISATEUR CONNECTÉ
    const u = runtimeState.user;
    const cloudCount = Object.keys(runtimeState.cloudCharacters || {}).length;
    const rawLocal = localStorage.getItem(DOJO_STORAGE_KEY) || localStorage.getItem(LEGACY_DOJO_KEY);
    const localCount = rawLocal ? (JSON.parse(rawLocal) || []).length : 0;

    let roleBadgeHtml = `<span class="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/50 text-sky-300 text-[10px] font-bold">☁️ Dojo Cloud Privé</span>`;
    if (runtimeState.isGm) {
      roleBadgeHtml = `<span class="px-2 py-0.5 rounded-full bg-amber-950/90 border border-amber-400 text-amber-300 text-[10px] font-bold">👑 Maître du Jeu (Secrets déverrouillés)</span>`;
    } else if (runtimeState.memberStatus === 'approved') {
      roleBadgeHtml = `<span class="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-bold">✅ Membre approuvé de la Table</span>`;
    } else if (runtimeState.memberStatus === 'pending') {
      roleBadgeHtml = `<span class="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-200 text-[10px] font-bold">⏳ Demande en attente du MJ</span>`;
    } else if (runtimeState.memberStatus === 'revoked') {
      roleBadgeHtml = `<span class="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-[10px] font-bold">🚫 Accès Table révoqué</span>`;
    }

    const membersList = Object.values(runtimeState.campaignMembers || {});
    const pendingCount = membersList.filter(m => m?.status === 'pending').length;

    const gmPanelHtml = runtimeState.isGm ? `
      <div class="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2.5">
        <div class="flex items-center justify-between">
          <h3 class="font-imperial font-bold text-xs text-amber-300">👥 Membres de la Table (${membersList.length})</h3>
          ${pendingCount > 0 ? `<span class="px-2 py-0.5 rounded-full bg-amber-500 text-black font-bold text-[10px]">${pendingCount} demande(s)</span>` : ''}
        </div>
        ${membersList.length === 0
          ? `<div class="text-[11px] text-stone-400 italic">Aucun joueur n'a encore demandé à rejoindre la table.</div>`
          : `<div class="space-y-1.5 max-h-48 overflow-y-auto">
              ${membersList.map((m) => `
                <div class="p-2 rounded-lg bg-black/55 border border-stone-800 flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="font-bold text-stone-200 truncate">${escapeHtml(m.displayName || m.email || m.uid)}</div>
                    <div class="text-[10px] text-stone-400 truncate">${escapeHtml(m.email || '')} • <b>${m.status === 'approved' ? '✅ Approuvé' : (m.status === 'pending' ? '⏳ En attente' : '🚫 Révoqué')}</b></div>
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    ${m.status !== 'approved'
                      ? `<button type="button" data-gm-member-uid="${escapeHtml(m.uid)}" data-gm-member-status="approved" class="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] cursor-pointer">✅ Approuver</button>`
                      : `<button type="button" data-gm-member-uid="${escapeHtml(m.uid)}" data-gm-member-status="revoked" class="px-2 py-1 rounded bg-red-950 hover:bg-red-900 border border-red-600/50 text-red-200 font-bold text-[10px] cursor-pointer">Révoquer</button>`
                    }
                  </div>
                </div>
              `).join('')}
            </div>`
        }
      </div>
    ` : '';

    const joinCampaignHtml = (!runtimeState.isGm && runtimeState.memberStatus !== 'approved') ? `
      <div class="p-3.5 rounded-xl bg-black/45 border border-stone-800 space-y-2">
        <div class="font-imperial font-bold text-xs text-amber-200">🏯 Rejoindre la Table des Chroniques</div>
        <p class="text-[11px] text-stone-400">
          ${runtimeState.memberStatus === 'pending'
            ? 'Votre demande a bien été transmise au Maître du Jeu. Dès qu\'il clique sur Approuver, vos outils de campagne temps réel s\'activeront automatiquement.'
            : 'Demandez l\'accès au MJ pour participer au Doodle 2027 en direct, synchroniser votre PJ avec l\'Écran MJ et rejoindre la Table Live.'}
        </p>
        ${runtimeState.memberStatus !== 'pending' ? `
          <button type="button" id="l5r-btn-request-access" class="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-imperial font-bold text-xs cursor-pointer transition">
            📨 Demander l'accès à la Table de Campagne
          </button>
        ` : ''}
      </div>
    ` : '';

    body.innerHTML = `
      <div id="l5r-account-feedback" class="hidden"></div>

      <div class="p-3.5 rounded-xl bg-black/50 border border-amber-500/30 flex items-center gap-3">
        ${u.photoURL
          ? `<img src="${escapeHtml(u.photoURL)}" alt="" class="w-11 h-11 rounded-full border border-amber-500/60 object-cover shrink-0" />`
          : `<div class="w-11 h-11 rounded-full bg-amber-950 border border-amber-500/60 flex items-center justify-center font-imperial font-bold text-amber-300 text-base shrink-0">${escapeHtml((u.displayName || u.email || 'S')[0].toUpperCase())}</div>`
        }
        <div class="min-w-0 flex-1 space-y-1">
          <div class="font-imperial font-bold text-sm text-amber-200 truncate">${escapeHtml(u.displayName || u.email)}</div>
          <div class="text-[10px] text-stone-400 truncate">${escapeHtml(u.email)}</div>
          <div>${roleBadgeHtml}</div>
        </div>
      </div>

      ${joinCampaignHtml}

      <div class="p-3.5 rounded-xl bg-black/45 border border-stone-800 space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="font-imperial font-bold text-xs text-emerald-300">☁️ Mon Dojo Cloud</span>
          <span class="font-mono text-[11px] text-stone-300">${cloudCount} dans le Cloud • ${localCount} sur cet appareil</span>
        </div>
        <p class="text-[11px] text-stone-400">
          Chaque enregistrement dans <b>La Forge</b> est automatiquement synchronisé sur votre compte Firebase et accessible depuis tous vos appareils.
        </p>
        <div class="flex flex-wrap gap-2">
          <button type="button" id="l5r-btn-migrate-dojo" class="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-200 font-imperial font-bold text-[11px] cursor-pointer transition">
            ☁️ Envoyer mon Dojo local vers le Cloud
          </button>
        </div>
      </div>

      ${gmPanelHtml}

      <div class="pt-2 border-t border-stone-800 flex items-center justify-between">
        <span class="text-[10px] text-stone-500 font-mono">Firebase RTDB • europe-west1</span>
        <button type="button" id="l5r-btn-signout" class="px-3.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-700/50 text-red-200 font-imperial font-bold text-xs cursor-pointer transition">
          Se déconnecter
        </button>
      </div>
    `;

    body.querySelector('#l5r-btn-request-access')?.addEventListener('click', async () => {
      try {
        await requestCampaignAccess();
        setModalMessage('Demande envoyée au Maître du Jeu !');
      } catch (err) {
        setModalMessage(err?.message || 'Erreur lors de la demande.', true);
      }
    });

    body.querySelector('#l5r-btn-migrate-dojo')?.addEventListener('click', async () => {
      try {
        const count = await migrateLocalDojoToCloud();
        if (count === 0) {
          setModalMessage('Aucun personnage local à envoyer pour le moment.');
        } else {
          setModalMessage(`${count} samouraï(s) synchronisé(s) dans votre Dojo Cloud !`);
        }
      } catch (err) {
        setModalMessage(err?.message || 'Erreur de synchronisation.', true);
      }
    });

    body.querySelectorAll('[data-gm-member-uid]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const uid = btn.getAttribute('data-gm-member-uid');
        const nextStatus = btn.getAttribute('data-gm-member-status');
        try {
          await approveCampaignMember(uid, nextStatus);
          setModalMessage(nextStatus === 'approved' ? 'Joueur approuvé pour la Table de Campagne !' : 'Accès du joueur révoqué.');
        } catch (err) {
          setModalMessage(err?.message || 'Erreur de mise à jour du membre.', true);
        }
      });
    });

    body.querySelector('#l5r-btn-signout')?.addEventListener('click', async () => {
      try {
        await signOut();
        closeAccountModal();
      } catch (err) {
        setModalMessage(err?.message || 'Erreur de déconnexion.', true);
      }
    });
  }

  function openAccountModal() {
    ensureAccountModalDom();
    const modal = document.getElementById('l5r-account-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    loadFirebaseSdk().then(() => renderAccountModalContent());
    renderAccountModalContent();
  }

  function closeAccountModal() {
    document.getElementById('l5r-account-modal')?.classList.add('hidden');
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      loadFirebaseSdk();
    });
  }

  const api = {
    FIREBASE_SDK_VERSION,
    sanitizeFirebaseKey,
    stripUndefinedDeep,
    isGmUser,
    computeNarrativeWoundLabel,
    buildPublicPartySummary,
    buildCampaignRosterEntry,
    mergeLocalAndCloudCharacters,
    computeCloudSyncBadgeState,
    formatFirebaseAuthError,
    init: loadFirebaseSdk,
    getState,
    subscribe,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signOut,
    requestCampaignAccess,
    approveCampaignMember,
    saveCharacterToCloud,
    deleteCharacterFromCloud,
    setCharacterCampaignActive,
    migrateLocalDojoToCloud,
    openAccountModal,
    closeAccountModal
  };

  if (typeof globalScope !== 'undefined') {
    globalScope.L5RFirebase = api;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
