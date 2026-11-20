// Page (HTML): network first, so a new version shows the moment there is signal;
// falls back to the saved copy after 3 s or when offline (rig with no signal).
// Other files (icons, manifest): cache first.
// Bump VERSION whenever index.html changes.
var VERSION = 'cementing-v33';
var FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function keep(req, res) {
  if (res && res.ok && new URL(req.url).origin === location.origin) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
  return res;
}
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var page = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') >= 0;
  if (page) {
    e.respondWith(new Promise(function (resolve) {
      var done = false, fallback = function () {
        if (done) return; done = true;
        caches.match(req).then(function (hit) { return hit || caches.match('./index.html'); }).then(resolve);
      };
      var t = setTimeout(fallback, 3000);
      fetch(req, { cache: 'no-store' }).then(function (res) {
        clearTimeout(t); keep(req, res);
        if (!done) { done = true; resolve(res); }
      }).catch(function () { clearTimeout(t); fallback(); });
    }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) { return keep(req, res); }).catch(function () { return caches.match('./index.html'); });
  }));
});
