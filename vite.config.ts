import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        landingEn: resolve(__dirname, 'index.html'),
        landingPl: resolve(__dirname, 'pl/index.html'),
        landingDe: resolve(__dirname, 'de/index.html'),
        landingEs: resolve(__dirname, 'es/index.html'),
        landingFr: resolve(__dirname, 'fr/index.html'),
        landingIt: resolve(__dirname, 'it/index.html'),
        landingPt: resolve(__dirname, 'pt/index.html'),
        landingRo: resolve(__dirname, 'ro/index.html'),
        app: resolve(__dirname, 'app/index.html'),
      },
    },
  },
});
