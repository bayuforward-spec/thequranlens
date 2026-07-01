/* sw.js — Service Worker The Quran Lens (PWA + notifikasi kata harian).
 * Strategi network-first: konten selalu diambil terbaru saat online,
 * cache dipakai sebagai cadangan agar app tetap jalan saat offline. */
const CACHE = 'quranlens-v1';
const SHELL = [
  './', 'index.html', 'gratis.html', 'manifest.webmanifest',
  'assets/css/styles.css',
  'assets/js/content.js', 'assets/js/storage.js', 'assets/js/payment.js', 'assets/js/app.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('index.html')))
  );
});

// Klik notifikasi kata harian → fokus/buka app
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
