// During installation, cache the core assets needed to run the app offline.
// The previous implementation attempted to cache files that don't exist in the
// Next.js build output (e.g. `/index.html` and `/xo-game.js`). Including
// non‑existent files causes the `install` step to reject, preventing the service
// worker from installing at all. We now only cache valid static assets.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('xo-game-v1').then((cache) => {
      return cache
        .addAll([
          '/',
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

