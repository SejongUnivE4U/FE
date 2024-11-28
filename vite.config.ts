import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest', // InjectManifest 전략 사용
      srcDir: 'src', // 서비스 워커 파일 위치
      filename: 'service-worker.js', // 생성될 서비스 워커 파일 이름
      injectManifest: {
        swSrc: './src/service-worker.js', // 소스 서비스 워커
        swDest: 'dist/service-worker.js', // 빌드 후 출력 위치
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'E4U',
        short_name: 'E4U',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }: { url: URL }) =>
              url.origin === 'https://e4u-dev.netlify.app',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache', // 캐시 이름
              fetchOptions: {
                credentials: 'include', // 쿠키 포함
              },
              matchOptions: {
                ignoreSearch: true, // 쿼리 스트링 무시
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    https: {
      key: './localhost+2-key.pem',
      cert: './localhost+2.pem',
    },
    port: 5173,
  },
});
