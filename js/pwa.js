/**
 * js/pwa.js — Gestionnaire PWA Mobile (Android & iOS) + Mode Hors-Ligne
 * Enregistre sw.js, gère l'invite d'installation native Android et le guide Safari iOS,
 * et synchronise les badges d'état réseau / mode standalone.
 */
(function () {
  'use strict';

  const IOS_DISMISSED_KEY = 'l5r_pwa_ios_dismissed';
  let deferredInstallPrompt = null;

  function getRootPrefix() {
    const path = window.location.pathname || '';
    if (/\/(aides|clans|campagne|admin)\//.test(path)) return '../';
    return './';
  }

  function isStandaloneMode() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }

  function isIOSDevice() {
    const ua = window.navigator.userAgent || '';
    const isAppleTouch = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return isAppleTouch && !window.MSStream;
  }

  function ensurePwaHeadTags() {
    const prefix = getRootPrefix();
    const head = document.head;
    if (!head) return;

    if (!head.querySelector('link[rel="manifest"]')) {
      const m = document.createElement('link');
      m.rel = 'manifest';
      m.href = `${prefix}manifest.webmanifest`;
      head.appendChild(m);
    }

    if (!head.querySelector('link[rel="apple-touch-icon"]')) {
      const a = document.createElement('link');
      a.rel = 'apple-touch-icon';
      a.href = `${prefix}assets/icons/apple-touch-icon.png`;
      head.appendChild(a);
    }

    const metas = [
      ['name', 'theme-color', '#1a120b'],
      ['name', 'mobile-web-app-capable', 'yes'],
      ['name', 'apple-mobile-web-app-capable', 'yes'],
      ['name', 'apple-mobile-web-app-status-bar-style', 'black-translucent'],
      ['name', 'apple-mobile-web-app-title', 'Forge L5R']
    ];
    metas.forEach(([attr, key, val]) => {
      if (!head.querySelector(`meta[${attr}="${key}"]`)) {
        const el = document.createElement('meta');
        el.setAttribute(attr, key);
        el.setAttribute('content', val);
        head.appendChild(el);
      }
    });
  }

  function updateInstallUi() {
    const standalone = isStandaloneMode();
    document.documentElement.classList.toggle('l5r-pwa-standalone', standalone);
    document.body?.classList.toggle('l5r-pwa-standalone', standalone);

    const installBtns = document.querySelectorAll('[data-pwa-install-btn]');
    const canOfferInstall = !standalone && (!!deferredInstallPrompt || isIOSDevice() || window.innerWidth < 768);
    installBtns.forEach((btn) => {
      if (standalone) {
        btn.classList.add('hidden');
      } else if (canOfferInstall) {
        btn.classList.remove('hidden');
      }
    });

    const iosBanner = document.getElementById('pwa-ios-banner');
    if (iosBanner) {
      let dismissed = false;
      try { dismissed = localStorage.getItem(IOS_DISMISSED_KEY) === '1'; } catch (e) {}
      if (!standalone && isIOSDevice() && !dismissed && document.getElementById('forge-stepper-bar')) {
        iosBanner.classList.remove('hidden');
      } else {
        iosBanner.classList.add('hidden');
      }
    }
  }

  function updateNetworkUi() {
    const offline = navigator.onLine === false;
    document.documentElement.classList.toggle('l5r-offline', offline);
    document.querySelectorAll('[data-pwa-offline-badge]').forEach((badge) => {
      badge.classList.toggle('hidden', !offline);
    });
  }

  function openIosInstallGuideModal() {
    let modal = document.getElementById('pwa-install-guide-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pwa-install-guide-modal';
      modal.className = 'fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 no-print';
      modal.innerHTML = `
        <div class="w-full max-w-md rounded-2xl bg-[#140e0d] border border-amber-500/50 p-5 space-y-3.5 text-xs text-stone-200 shadow-2xl">
          <div class="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <h3 class="font-imperial font-bold text-sm text-amber-300 flex items-center gap-2">
              <span>📲</span> Installer « Forge L5R » sur téléphone
            </h3>
            <button type="button" onclick="document.getElementById('pwa-install-guide-modal')?.classList.add('hidden')" class="px-2 py-1 rounded bg-stone-900 text-stone-400 hover:text-white cursor-pointer">✕</button>
          </div>
          <div class="space-y-2.5 leading-relaxed">
            <div class="p-2.5 rounded-xl bg-black/50 border border-stone-800 space-y-1">
              <div class="font-bold text-amber-200">🍎 Sur iPhone / iPad (Safari) :</div>
              <p class="text-stone-300">1. Touchez le bouton <b>Partager</b> (<span class="font-mono text-sky-300">□↑</span>) dans la barre du navigateur.</p>
              <p class="text-stone-300">2. Faites défiler et touchez <b>« Sur l'écran d'accueil »</b> puis <b>Ajouter</b>.</p>
            </div>
            <div class="p-2.5 rounded-xl bg-black/50 border border-stone-800 space-y-1">
              <div class="font-bold text-emerald-300">🤖 Sur Android (Chrome / Edge / Samsung) :</div>
              <p class="text-stone-300">Ouvrez le menu <b>⋮</b> du navigateur puis touchez <b>« Installer l'application »</b> ou <b>« Ajouter à l'écran d'accueil »</b>.</p>
            </div>
            <p class="text-[11px] text-stone-400 italic">Une fois installée, la Forge s'ouvre en plein écran et fonctionne même sans connexion Internet à table !</p>
          </div>
          <button type="button" onclick="document.getElementById('pwa-install-guide-modal')?.classList.add('hidden')" class="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-extrabold font-imperial cursor-pointer">
            Compris
          </button>
        </div>
      `;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
      document.body.appendChild(modal);
    } else {
      modal.classList.remove('hidden');
    }
  }

  async function promptPWAInstall() {
    if (isStandaloneMode()) {
      if (typeof window.showForgeToast === 'function') {
        window.showForgeToast("L'application est déjà installée en mode autonome.", 'success');
      }
      return;
    }

    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted' && typeof window.showForgeToast === 'function') {
          window.showForgeToast("Application « Forge L5R » ajoutée à votre téléphone !", 'success');
        }
      } catch (e) {}
      deferredInstallPrompt = null;
      updateInstallUi();
      return;
    }

    openIosInstallGuideModal();
  }

  function dismissIosBanner() {
    try { localStorage.setItem(IOS_DISMISSED_KEY, '1'); } catch (e) {}
    const b = document.getElementById('pwa-ios-banner');
    if (b) b.classList.add('hidden');
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
    if (!isHttp) return;

    const prefix = getRootPrefix();
    navigator.serviceWorker.register(`${prefix}sw.js`, { scope: prefix })
      .then((reg) => {
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              nw.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      })
      .catch(() => {});
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    updateInstallUi();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallUi();
    if (typeof window.showForgeToast === 'function') {
      window.showForgeToast("Application installée avec succès !", 'success');
    }
  });

  window.addEventListener('online', () => {
    updateNetworkUi();
    if (typeof window.showForgeToast === 'function') {
      window.showForgeToast("Connexion rétablie.", 'info');
    }
  });

  window.addEventListener('offline', () => {
    updateNetworkUi();
    if (typeof window.showForgeToast === 'function') {
      window.showForgeToast("Mode hors-ligne actif : la Forge et votre Dojo restent disponibles.", 'warn');
    }
  });

  window.promptPWAInstall = promptPWAInstall;
  window.dismissIosPwaBanner = dismissIosBanner;
  window.getPWAState = function () {
    return {
      standalone: isStandaloneMode(),
      ios: isIOSDevice(),
      hasInstallPrompt: !!deferredInstallPrompt,
      online: navigator.onLine !== false
    };
  };

  ensurePwaHeadTags();
  registerServiceWorker();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateInstallUi();
      updateNetworkUi();
    });
  } else {
    updateInstallUi();
    updateNetworkUi();
  }
})();
