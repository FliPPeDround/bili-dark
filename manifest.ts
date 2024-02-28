import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' assert { type: 'json' }

export const manifest = defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  action: {
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [
    {
      matches: ['*://www.bilibili.com/*'],
      js: ['src/content/index.ts'],
      run_at: 'document_start',
    },
  ],
  permissions: [
    'scripting',
    'activeTab',
  ],
})
