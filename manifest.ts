import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' assert { type: 'json' }

export const manifest = defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: {
      16: 'public/icon-48.png',
      48: 'public/icon-48.png',
      128: 'public/icon-48.png',
    },
  },
  content_scripts: [
    {
      matches: [
        '*://www.bilibili.com/*',
        '*://search.bilibili.com/*',
        '*://space.bilibili.com/*',
        '*://t.bilibili.com/*',
      ],
      js: ['src/content/index.ts'],
      run_at: 'document_start',
    },
  ],
  icons: {
    16: 'public/icon-48.png',
    48: 'public/icon-48.png',
    128: 'public/icon-48.png',
  },
  permissions: ['scripting', 'activeTab', 'storage'],
})
