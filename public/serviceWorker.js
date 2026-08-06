self.addEventListener('install', (event) => {
  // Pre-cache essential assets
  const urlsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    // Add other static assets as needed
  ];
  event.waitUntil(
    caches.open('static-cache').then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Try network first, fallback to cache when offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => {
      // If request is for a navigation page, serve offline fallback
      if (event.request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
      return response;
    }))
  );
});
