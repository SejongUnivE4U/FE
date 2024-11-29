import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';

// Precache files
precacheAndRoute(self.__WB_MANIFEST);

// Custom caching strategy for APIs
registerRoute(
  ({ url }) => url.origin === 'https://e4u-dev.netlify.app',
  new NetworkOnly({
    cacheName: 'api-cache',
    fetchOptions: {
      credentials: 'include',
    },
    plugins: [
      {
        fetchDidSucceed: async ({ response }) => {
          console.log('API Response:', response);
          return response;
        },
      },
    ],
  }),
);

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Received fetch event:', event.request.url);

  // Check if request has cookies
  console.log(
    '[Service Worker] Request credentials mode:',
    event.request.credentials,
  );

  event.respondWith(
    fetch(event.request, {
      credentials: 'include',
    })
      .then((response) => {
        console.log('[Service Worker] Fetch successful:', {
          url: response.url,
          status: response.status,
          headers: [...response.headers.entries()],
        });
        return response;
      })
      .catch((error) => {
        console.error('[Service Worker] Fetch failed:', error);
        return caches.match(event.request).then((cacheResponse) => {
          if (cacheResponse) {
            console.log(
              '[Service Worker] Fallback to cache for:',
              event.request.url,
            );
          } else {
            console.error(
              '[Service Worker] No cache available for:',
              event.request.url,
            );
          }
          return cacheResponse;
        });
      }),
  );
});

// Ensure service worker activates immediately
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
