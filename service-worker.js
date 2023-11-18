const cacheName = 'my-app-cache';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        'index.html',
        '/css/styles.css',
        '/js/index.js',
        '/js/vue.min.js'
      ]);
    }).catch(error =>{
        console.error('Falha ao armazenar em cache recursos:', error)
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