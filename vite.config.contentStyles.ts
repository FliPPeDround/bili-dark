import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { sharedConfig } from './vite.config'
import { isDev, r } from './scripts/utils'
import packageJson from './package.json'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  plugins: [
    UnoCSS({
      mode: 'per-module',
    }),
  ],
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist/contentStyles'),
    cssCodeSplit: true,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentStyles/index.less'),
      name: packageJson.name,
    },
  },
})
