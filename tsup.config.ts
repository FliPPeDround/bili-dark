import { defineConfig } from 'tsup'
import { writeManifest } from './scripts/writeManifest'
import { lessBundler } from './scripts/less-bundler'
import { copyAssets } from './scripts/removeAssets'

export default defineConfig((options) => {
  return {
    entry: {
      content: 'src/content/index.ts',
    },
    format: ['iife'],
    outDir: 'extension',
    shims: false,
    dts: false,
    clean: true,
    minify: !options.watch,
    async onSuccess() {
      await writeManifest()
      await lessBundler()
      await copyAssets()
    },
    publicDir: 'src/popup',
    outExtension() {
      return {
        js: '.js',
      }
    },
  }
})
