import { execSync } from 'node:child_process'
import chokidar from 'chokidar'
import { isDev, r } from './utils'

function writeManifest() {
  execSync('tsx ./scripts/manifest.ts', { stdio: 'inherit' })
}
writeManifest()

if (isDev) {
  chokidar.watch([r('src/manifest.ts'), r('package.json')])
    .on('change', () => {
      writeManifest()
    })
}
