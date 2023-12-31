import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import { r } from '../scripts/utils'

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: {
        16: './assets/icon-512.png',
        48: './assets/icon-512.png',
        128: './assets/icon-512.png',
      },
      default_popup: '/dist/popup/index.html',
    },
    content_scripts: [
      {
        matches: ['*://www.bilibili.com/*'],
        js: ['dist/contentScripts/index.js'],
        css: ['dist/contentStyles/index.css'],
        run_at: 'document_start',
      },
    ],
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png',
    },
    permissions: [
      'scripting',
      'activeTab',
    ],
  }
  return manifest
}
