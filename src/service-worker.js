// Import Workbox modules
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Precache files defined in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Fetch handler with credentials
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, {
      credentials: 'include',
    }).catch((error) => {
      console.error('Fetch failed in service worker:', error);
      return caches.match(event.request); // 캐시된 응답으로 대체
    }),
  );
});

// Custom caching strategy for APIs
registerRoute(
  // Match API requests
  ({ url }) => url.origin === 'https://e4u-dev.netlify.app', // Replace with your API domain
  new NetworkFirst({
    cacheName: 'api-cache', // 캐시 이름
    networkTimeoutSeconds: 10, // 네트워크 응답 타임아웃
    fetchOptions: {
      credentials: 'include', // 쿠키 포함
    },
    plugins: [
      {
        handlerDidError: () => {
          console.error('Network request failed, fallback to cache');
          return caches.match('/fallback.html'); // Fallback 처리
        },
      },
    ],
  }),
);

// Ensure new service worker activates immediately
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 즉시 활성화
});

// Claim clients to update all open tabs immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
