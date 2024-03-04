import { defineConfig } from 'unocss/vite'
import { presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'bg-dark-4! border-zinc-7! text-gray-4! hover:bg-zinc-7! hover:text-gray-3!'],
  ],
  presets: [presetUno()],
  transformers: [
    transformerDirectives({
      applyVariable: ['--uno'],
    }),
  ],
})
