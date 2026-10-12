// Testimonial Cafe Testimony OS — Service Worker
// Offline Menu Caching & Network-Resilient Dining Experience

const CACHE_NAME = 'shamba-tableside-v1.4.0';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/qrcode.min.js',
  '/favicon.svg',
  '/favicon.ico',
  '/site.webmanifest',
  '/fonts/Fanfarrón.otf',
  '/fonts/Milano Perla.otf',
  '/images/hero-banner.jpg',
  '/images/beef-pizza.jpg',
  '/images/chicken-steak.jpg',
  '/images/black-burger.jpg',
  '/images/tilapia-curry.jpg',
  '/images/spaghetti.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Some static assets could not be pre-cached:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // For API calls: Network first with Cache fallback
  if (url.pathname.startsWith('/api/')) {
    if (url.pathname === '/api/menu' || url.pathname === '/api/health') {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const resClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
            }
            return response;
          })
          .catch(() => caches.match(event.request))
      );
      return;
    }
    // Transactional API requests (orders, payments) must go directly to network
    return;
  }

  // For static assets: Cache first with Network background revalidation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to revalidate
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
