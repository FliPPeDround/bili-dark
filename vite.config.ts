import { fileURLToPath, URL } from 'node:url'
import { crx } from '@crxjs/vite-plugin'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { manifest } from './manifest'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
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
