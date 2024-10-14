import './styles_v2/toggle.less'
import './styles_v2/index.less'

import { localExtStorage } from '@webext-core/storage'
import { onMessage, setTheme, toggleTheme } from '@/utils'
import { THEME } from '@/constants'

async function applyInitialDarkMode() {
  let theme = await localExtStorage.getItem('bili-theme')
  if (!theme) {
    theme = THEME.DARK
    localExtStorage.setItem('bili-theme', theme)
  }
  setTheme(theme)
}

applyInitialDarkMode()

onMessage('clickPoint', async ({ data }) => {
  await toggleTheme(data)
})
