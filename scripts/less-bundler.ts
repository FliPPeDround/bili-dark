import fs from 'fs-extra'
import less from 'less'
import CleanCSSPlugin from 'less-plugin-clean-css'
import { log, r } from './utils'

export async function lessBundler(): Promise<void> {
  const inputPath = r('src/content/css/index.less')
  const outputPath = r('extension/content.css')
  try {
    const data = await fs.readFile(inputPath, 'utf8')

    const output = await less.render(data, {
      filename: inputPath,
      plugins: [new CleanCSSPlugin({ advanced: true })],
    })
    await fs.writeFile(outputPath, output.css)
    log('PRE', 'write content.css')
  }
  catch (err) {
    console.error(err)
    // eslint-disable-next-line n/prefer-global/process
    process.exit(1)
  }
}
