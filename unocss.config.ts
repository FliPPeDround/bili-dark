import { defineConfig } from 'unocss/vite'
import { transformerDirectives } from 'unocss'

export default defineConfig({
  rules: [
    ['blur', { 'backdrop-filter': 'blur(32px)' }],
  ],
  shortcuts: [
    ['btn', 'bg-dark-4! border-zinc-7! text-gray-4! hover:bg-zinc-7! hover:text-gray-3!'],
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ['--uno'],
    }),
  ],
})
