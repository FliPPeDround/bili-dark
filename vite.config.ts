import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import UnoCSS from 'unocss/vite'
import { manifest } from './manifest'

export default defineConfig({
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
