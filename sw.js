const CACHE = 'scratch-globe-v2';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'vendor/d3.min.js', 'vendor/topojson-client.min.js',
  'vendor/countries-50m.json', 'vendor/countries-110m.json', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (FONT_HOSTS.includes(url.hostname)) {          // fonts: cache once, then work offline
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; })));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(req.mode === 'navigate'            // page: network first so updates arrive
    ? fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); return r; }).catch(() => caches.match('index.html'))
    : caches.match(req).then(r => r || fetch(req)));
});
