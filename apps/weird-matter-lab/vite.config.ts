import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { eazoSdkBrowserShims } from '../../config/eazo-sdk-browser-shims.ts';

export default defineConfig({
  plugins: [react(), eazoSdkBrowserShims()],
  base: './',
  publicDir: 'content',
  build: { sourcemap: true, assetsInlineLimit: 4096, chunkSizeWarningLimit: 1000 },
});
