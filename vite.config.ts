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
        swSrc: './src/service-worker.js', // 커스텀 서비스 워커 파일 경로
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
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ url }: { url: URL }) =>
      //         url.href.startsWith('https://e4u.kro.kr/'),
      //       handler: 'NetworkFirst',
      //       options: {
      //         fetchOptions: {
      //           credentials: 'include',
      //         },
      //       },
      //     },
      //   ],
      // },
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
