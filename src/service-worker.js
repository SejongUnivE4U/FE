import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Precache files
precacheAndRoute(self.__WB_MANIFEST);

// Custom caching strategy for APIs
registerRoute(
  ({ url }) => url.origin === 'https://e4u-dev.netlify.app',
  new NetworkFirst({
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

// Debugging requests
self.addEventListener('fetch', (event) => {
  const { url, headers } = event.request;
  console.log(`Intercepted Request to: ${url}`);
  console.log('Request Headers:', [...headers.entries()]);

  event.respondWith(
    fetch(event.request, {
      credentials: 'include',
    })
      .then((response) => {
        console.log('Response Headers:', [...response.headers.entries()]);
        return response;
      })
      .catch((error) => {
        console.error('Fetch failed:', error);
        return caches.match(event.request);
      }),
  );
});

// Ensure service worker activates immediately
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
