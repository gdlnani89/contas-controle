const cacheVersion = 'v1';
const cacheName = `my-app-cache-${cacheVersion}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        'index.html',
        '/css/style.css',
        '/js/index.js',
        '/js/vue.min.js'
      ]);
    }).catch(error => {
      console.error('Falha ao armazenar em cache recursos:', error);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
