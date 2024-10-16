import { applyInitialDarkMode, onMessage } from '@/utils'
import { ToggleAnimatedTheme } from '@/utils/ToggleAnimatedTheme'

import './styles_v2/toggle.less'
import './styles_v2/index.less'

applyInitialDarkMode()

onMessage('clickPoint', async ({ data }) => {
  const toggleAnimatedTheme = new ToggleAnimatedTheme(data[0], data[1], true)
  toggleAnimatedTheme.toggle()
  return toggleAnimatedTheme.endRadius
})
