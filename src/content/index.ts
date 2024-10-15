import './styles_v2/toggle.less'
import './styles_v2/index.less'

import { applyInitialDarkMode, getEndRadiusInTab, onMessage, toggleTheme } from '@/utils'

applyInitialDarkMode()

onMessage('clickPoint', async ({ data }) => {
  await toggleTheme(getEndRadiusInTab(data))
})
