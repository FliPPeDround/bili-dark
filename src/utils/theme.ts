import { THEME } from '@/constants'
import { localExtStorage } from '@webext-core/storage'

export function setTheme(theme: THEME) {
  document.documentElement.classList.toggle('dark', theme !== THEME.DARK)
}

export async function applyInitialDarkMode(switchEl?: HTMLInputElement) {
  let theme: THEME = await localExtStorage.getItem('bili-theme')
  if (!theme) {
    theme = THEME.DARK
    localExtStorage.setItem('bili-theme', theme)
  }
  if (switchEl)
    switchEl.checked = theme !== THEME.DARK

  setTheme(theme)
}
