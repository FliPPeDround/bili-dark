import { defineConfig } from 'unocss/vite'
import { presetIcons, presetUno, transformerDirectives } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  rules: [
    ['blur', { 'backdrop-filter': 'blur(32px)' }],
  ],
  shortcuts: [
    ['btn', 'bg-dark-4! border-zinc-7! text-gray-4! hover:bg-zinc-7! hover:text-gray-3!'],
    ['blue-btn', 'bg-sky-7/90 hover:bg-sky-6/90'],
    ['long-btn', 'bg-gray-6! text-gray-3! hover:bg-gray-7!'],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetExtra(),
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ['--uno'],
    }),
  ],
})
