/**
 * sw.js — Service Worker Hors-Ligne (Les Chroniques de Rokugan — L5R 4e Édition)
 * Pré-cache la Forge de Personnage, les données L5R 4e et permet l'installation PWA iOS/Android.
 */

const CACHE_VERSION = 'l5r-forge-v1.39.0';
const RUNTIME_CACHE = 'l5r-runtime-v1.39.0';

const CORE_ASSETS = [
  './',
  './index.html',
  './createcharacter.html',
  './ecoles.html',
  './grimoire.html',
  './kihos.html',
  './katas.html',
  './tatouages.html',
  './ecran-mj.html',
  './sessions.html',
  './js/sessions.js',
  './js/firebase-config.js',
  './js/firebase-service.js',
  './data/gm-scenarios-data.js',
  './campagne.html',
  './data/campaign-codex-data.js',
  './data/podcasts-manifest.json',
  './carte.html',
  './manifest.webmanifest',
  './version.json',
  './css/main.css',
  './js/pwa.js',
  './js/navbar.js',
  './js/global-search.js',
  './js/clans-ui.js',
  './js/ecoles.js',
  './js/carte-rokugan.js',
  './data/carte-data.js',
  './assets/images/carte_rokugan.jpg',
  './js/character-generator.js',
  './js/forge-ui.js',
  './js/export-carnet.js',
  './js/grimoire.js',
  './js/kihos.js',
  './js/katas.js',
  './js/tatouages.js',
  './js/gm-screen.js',
  './js/index-ui.js',
  './js/campagne-studio.js',
  './js/narrator.js',
  './data/clans-data.js',
  './data/competences-data.js',
  './data/equipement-data.js',
  './data/avantages-desavantages-data.js',
  './data/katas-data.js',
  './data/tatouages-data.js',
  './data/sorts-data.js',
  './data/sorts/sorts-universels.js',
  './data/sorts/sorts-air.js',
  './data/sorts/sorts-terre.js',
  './data/sorts/sorts-feu.js',
  './data/sorts/sorts-eau.js',
  './data/sorts/sorts-vide.js',
  './data/sorts/sorts-kiho.js',
  './data/sorts/sorts-maho.js',
  './data/gm-rules-data.js',
  './data/scenarios-data.js',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/images/favicon_cinq_anneaux.png',
  './assets/images/cinq_anneaux.jpg',
  './assets/images/logo_carnet_rokugan.png',
  './assets/images/clans/mon-crabe.png',
  './assets/images/clans/mon-dragon.png',
  './assets/images/clans/mon-grue.png',
  './assets/images/clans/mon-licorne.png',
  './assets/images/clans/mon-lion.png',
  './assets/images/clans/mon-mante.png',
  './assets/images/clans/mon-phenix.png',
  './assets/images/clans/mon-scorpion.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      await Promise.allSettled(
        CORE_ASSETS.map((url) => cache.add(new Request(url, { cache: 'reload' })))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((k) => k !== CACHE_VERSION && k !== RUNTIME_CACHE)
        .map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // HTML, CSS, JS applicatifs, Manifest et version.json : Network-First avec repli cache hors-ligne
  const isFreshAsset = isSameOrigin && (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.webmanifest') ||
    url.pathname.endsWith('version.json') ||
    url.pathname.includes('/js/')
  );
  if (req.mode === 'navigate' || isFreshAsset) {
    const netReq = req.mode === 'navigate' ? req : new Request(req, { cache: 'no-cache' });
    event.respondWith(
      fetch(netReq)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req, { ignoreSearch: req.mode === 'navigate' });
          if (cached) return cached;
          if (req.mode === 'navigate') return caches.match('./createcharacter.html');
          return caches.match(req, { ignoreSearch: true });
        })
    );
    return;
  }

  // Ressources lourdes locales (Data, Icônes, Images) : Cache-First avec mise à jour en arrière-plan
  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const clone = res.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // CDN externes utiles (Tailwind, Fonts, html2canvas, jsPDF) : Stale-While-Revalidate hors-ligne friendly
  const cacheableCdnHosts = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
  if (cacheableCdnHosts.some((h) => url.hostname.includes(h))) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req)
          .then((res) => {
            if (res && (res.status === 200 || res.type === 'opaque')) {
              const clone = res.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, clone));
            }
            return res;
          })
          .catch(() => cached);
        return cached || net;
      })
    );
  }
});
