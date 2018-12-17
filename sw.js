var dataCacheName = 'bolaji-ayodeji';
var cacheName = 'bolaji-ayodeji';
var filesToCache = [
  '/',
  "/fav.png",
  "/images",
  "/index.html",
  "/manifest.json",
  "/assets",
  "/js",
  "/js/app.js",
  "/css",
  "/css/app.css",
  "/css/bootstrap.min.css",
  "/css/font-awesome.min.css",
  "/https://platform.twitter.com/widgets.js",
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
