import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Precache files
precacheAndRoute(self.__WB_MANIFEST);

// Custom caching strategy for APIs
registerRoute(
  // API 요청에 대한 패턴 정의
  ({ url }) => url.origin === 'https://e4u-dev.netlify.app',
  new NetworkFirst({
    cacheName: 'api-cache', // 캐시 이름
    fetchOptions: {
      credentials: 'include', // 쿠키 포함
    },
    matchOptions: {
      ignoreSearch: true, // 쿼리 스트링 무시
    },
  }),
);

// Ensure new service worker activates immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
