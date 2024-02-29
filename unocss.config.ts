import { defineConfig } from 'unocss/vite'
import { presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  transformers: [
    transformerDirectives({
      applyVariable: ['--uno'],
    }),
  ],
})
