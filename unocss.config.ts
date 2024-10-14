import { defineConfig } from 'unocss/vite'
import { presetIcons, presetUno, transformerDirectives } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  rules: [
    ['blur', { 'backdrop-filter': 'blur(32px)' }],
    ['bg-dark-8', { 'background-color': '#17181a' }],
    [
      'bg-reseau',
      {
        'background-image': 'linear-gradient(to right, #f6f6f6 1px, transparent 1px), linear-gradient(to bottom, #f6f6f6 1px, transparent 1px);',
        'background-size': '14px 14px',
      },
    ],
    [
      'bg-size-none',
      {
        'background-size': '0% 2px',
      },
    ],
    [
      'bg-size-line',
      {
        'background-size': '100% 2px',
      },
    ],
    [
      'transition-background-size',
      {
        transition: 'background-size 800ms',
      },
    ],
  ],
  shortcuts: [
    ['btn', 'bg-dark-4! border-zinc-7! text-gray-4! hover:bg-zinc-7! hover:text-gray-3!'],
    ['btn-active', 'border-zinc-7! bg-zinc-7! text-gray-3!'],
    ['blue-btn', 'bg-sky-7/90 hover:bg-sky-6/90'],
    ['long-btn', 'bg-gray-7! text-gray-3! hover:bg-gray-6!'],
    ['bg-dark-blur', 'bg-dark-4/70 blur'],
    ['card-wrap', 'p-10px cursor-pointer bg-#242628 hover:bg-#1f2022 border-solid border-1px rounded-6px border-zinc8 blur'],
    ['title', 'text-gray3 hover:text-gray1'],
    ['desc', 'text-gray4'],
    ['animation-line', 'pb1 bg-gradient-to-r from-gray-400/50 to-gray-500/80 bg-no-repeat bg-right-bottom bg-size-none transition-background-size hover:bg-left-bottom hover:bg-size-line'],
    ['popup-icon', 'transition-colors duration-150 group-hover:text-pink-5 cursor-pointer'],
    ['group-icon', 'flex items-center cursor-pointer'],
    ['group-icon-text', 'ml1 group-hover:w-66px transition-width duration-0.6s w-0 overflow-hidden whitespace-nowrap'],
  ],
  theme: {
    colors: {
      'bili-dark': '#0a2239',
      'bili-gray': '#30415d',
      'bili-pink': '#d44e7d',
    },
  },
  transformers: [
    transformerDirectives(),
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetExtra(),
    presetScrollbar(),
  ],
})
