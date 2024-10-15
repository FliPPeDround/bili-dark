import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './checkbox.less'
import './../content/styles_v2/toggle.less'
import { localExtStorage } from '@webext-core/storage'
import { runtime, tabs, windows } from 'webextension-polyfill'
import { applyInitialDarkMode, getEndRadiusInPopup, sendMessage, toggleTheme } from '@/utils'
import { THEME } from '@/constants'

const ua = navigator.userAgent.toLowerCase()
const switchEl = <HTMLInputElement>document.getElementById('dark')
applyInitialDarkMode()

localExtStorage.onChange('bili-theme', (newValue: string) => {
  switchEl.checked = newValue !== THEME.DARK
})

// switch 切换主题
switchEl.addEventListener('click', async (event) => {
  const theme = switchEl.checked ? THEME.LIGHT : THEME.DARK
  localExtStorage.setItem('bili-theme', theme)
  const window = await windows.getCurrent()
  const x = event.screenX - window.left
  const y = event.clientY

  const [tab] = await tabs.query({
    active: true,
    currentWindow: true,
  })
  toggleTheme(getEndRadiusInPopup([event.clientX, event.clientY]))
  sendMessage('clickPoint', [x, y], tab.id)
})

// switch 按住切换主题
let switchLangPressTimer: number | undefined
function switchMouseDown(labelElement: Element) {
  switchLangPressTimer = window.setInterval(() => {
    labelElement.classList.add('circle-screw')
    if (switchLangPressTimer !== undefined) {
      clearInterval(switchLangPressTimer)
      switchLangPressTimer = undefined
    }
  }, 100)
}

switchEl.addEventListener('mousedown', () => {
  const nextLabel = switchEl.nextElementSibling as Element
  switchMouseDown(nextLabel)
})

switchEl.addEventListener('mouseup', () => {
  if (switchLangPressTimer !== undefined) {
    clearInterval(switchLangPressTimer)
    switchLangPressTimer = undefined
  }
  switchEl.nextElementSibling?.classList.remove('circle-screw')
})

function computedIssueLink(pageUrl: string, title: string) {
  const url = new URL('https://github.com/FliPPeDround/bili-dark/issues/new')
  const params = new URLSearchParams()
  params.append('title', `【页面反馈】：${title}页面`)
  const bodyContent = `
地址：${pageUrl}
版本： \`v${runtime.getManifest().version}\`
浏览器信息：\`${ua}\`

<!-- 请截图并附上截图描述，以便我们更好地了解问题 -->
`
  params.append('body', bodyContent)
  url.search = params.toString()
  return url.href
}

const issueLinkEl = <HTMLElement>document.getElementById('issues-link')
issueLinkEl.addEventListener('click', async () => {
  const [tab] = await tabs.query({
    active: true,
    currentWindow: true,
  })
  const { url, title } = tab
  const issueLink = computedIssueLink(url, title)
  await tabs.create({ url: issueLink })
})

const versionEl = <HTMLDivElement>document.getElementById('version')
versionEl.textContent = `version v${runtime.getManifest().version}`
