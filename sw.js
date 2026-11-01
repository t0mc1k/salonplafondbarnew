/* ============================================================
   sw.js  –  Service Worker (macht die App installierbar und schneller)
   Die Versionsnummer kommt aus dem Aufruf sw.js?v=... (siehe js/pwa.js),
   so wird bei jeder neuen App-Version automatisch ein frischer Cache angelegt.

   - Eigene Dateien: erst Netzwerk (immer aktuell), bei Funkloch aus dem Cache.
   - Fremde Skripte (Tailwind, Supabase-Bibliothek, Excel): Cache + im Hintergrund aktualisieren.
   - Datenbank-Anfragen (Supabase) und alles außer GET werden NIE angefasst.
   ============================================================ */
const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';
const CACHE = 'salon-' + VERSION;
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('salon-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isApi(url) {
  return /supabase\.co$/.test(url.hostname) || url.pathname.indexOf('/rest/v1/') !== -1 ||
         url.pathname.indexOf('/storage/v1/') !== -1 || url.pathname.indexOf('/realtime/') !== -1;
}

async function networkFirst(request, isNavigation) {
  const cache = await caches.open(CACHE);
  try {
    const fresh = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 6000))
    ]);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await cache.match(request, { ignoreSearch: false }) || await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (isNavigation) {
      const shell = await cache.match('index.html') || await cache.match('./');
      if (shell) return shell;
    }
    throw err;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const update = fetch(request).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
    return res;
  }).catch(() => null);
  return cached || (await update) || Response.error();
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (isApi(url)) return;

  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request, request.mode === 'navigate'));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
