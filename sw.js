const CACHE = 'scratch-globe-v3';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'firebase-config.js', 'vendor/d3.min.js', 'vendor/topojson-client.min.js',
  'vendor/countries-50m.json', 'vendor/countries-110m.json', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
// fonts and the (versioned) Firebase SDK never change at a given URL: cache them once
const STATIC_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'www.gstatic.com'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const put = (req, res) => { if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return res; };
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (STATIC_HOSTS.includes(url.hostname) && (url.hostname !== 'www.gstatic.com' || url.pathname.startsWith('/firebasejs/'))) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => put(req, res))));
    return;
  }
  if (url.origin !== location.origin) return;
  // the app's own files: network first so updates arrive, cache when offline
  const key = req.mode === 'navigate' ? 'index.html' : req;
  e.respondWith(fetch(req).then(res => put(key, res)).catch(() => caches.match(key)));
});
