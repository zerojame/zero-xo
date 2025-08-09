// Cache essential static assets during installation. Dynamic routes and other
// requests are handled through runtime caching in the `fetch` handler.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('xo-game-v1').then((cache) => {
      return cache
        .addAll([
          '/favicon.ico',
          '/icon-192x192.jpg',
          '/icon-512x512.jpg',
          '/site.webmanifest',
        ])
        .catch((err) => {
          // If any asset fails to cache, log the error but allow installation
          // to proceed so that at least some assets are available offline.
          console.error('Service Worker cache install failed', err)
        })
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

