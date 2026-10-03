const CACHE = 'aistack-pocket-v9'
const SHELL = ['./pocket.html', './pocket.webmanifest', './pocket-icon.svg']
self.addEventListener('install', (event) => event.waitUntil(Promise.all([
  self.skipWaiting(),
  caches.open(CACHE).then((cache) => cache.addAll(SHELL))
])))
self.addEventListener('activate', (event) => event.waitUntil(Promise.all([
  caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('aistack-pocket-') && key !== CACHE).map((key) => caches.delete(key)))),
  self.clients.claim()
])))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)))
})
