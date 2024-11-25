// 캐싱할 파일의 리스트를 Workbox가 자동으로 주입합니다.
import { precacheAndRoute } from 'workbox-precaching';

// Workbox가 빌드 시 이 위치에 캐싱할 파일 리스트를 삽입합니다.
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, {
      credentials: 'include',
    }),
  );
});
