self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('xo-game-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/xo-game.js',
        '/icon-192x192.jpg',
        '/icon-512x512.jpg',
      ])
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

