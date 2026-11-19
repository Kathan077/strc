// Self-unregistering Service Worker for SRTC Logistics
// Cleans up any stale service workers registered on localhost to eliminate 404s and reload loops.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      })
      .then(() => {
        return self.registration.unregister();
      })
      .then(() => {
        return self.clients.matchAll({ type: 'window' });
      })
      .then((clients) => {
        clients.forEach((client) => {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url);
          }
        });
      })
  );
});

