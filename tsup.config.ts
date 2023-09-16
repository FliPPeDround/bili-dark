import { defineConfig } from 'tsup'
import { writeManifest } from './scripts/writeManifest'
import { lessBundler } from './scripts/less-bundler'
import { copyAssets } from './scripts/removeAssets'

export default defineConfig((options) => {
  return {
    entry: {
      content: 'src/content/index.ts',
      popup: 'src/popup/script/index.ts',
    },
    format: ['cjs'],
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
    publicDir: 'src/popup/html',
    outExtension() {
      return {
        js: '.js',
      }
    },
  }
})
