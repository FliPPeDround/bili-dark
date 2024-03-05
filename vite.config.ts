import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import UnoCSS from 'unocss/vite'
import { manifest } from './manifest'

export default defineConfig({
  plugins: [
    UnoCSS({ mode: 'per-module' }),
    crx({ manifest }),
  ],
})
