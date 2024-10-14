import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import UnoCSS from 'unocss/vite'
import { manifest } from './manifest'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    UnoCSS(),
    crx({ manifest }),
  ],
  server: {
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
  },
})
