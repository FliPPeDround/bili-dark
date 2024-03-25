import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './checkbox.css'
import { localExtStorage } from '@webext-core/storage'
import { tabs, windows } from 'webextension-polyfill'
import { sendMessage } from '@/utils'

async function sendClickPoint(event: MouseEvent) {
  const window = await windows.getCurrent()
  const x = event.screenX - window.left
  const y = event.clientY

  const [tab] = await tabs.query({
    active: true,
    currentWindow: true,
  })

  sendMessage('clickPoint', [x, y], tab.id)
}

const switchEl = <HTMLInputElement>document.getElementById('dark')

// localExtStorage.onChange('bili-theme', (newValue) => {
//   switchEl.checked = newValue.theme !== 'bili-dark'
// })

// switch 切换主题
switchEl.addEventListener('click', (event) => {
  const theme = switchEl.checked ? 'light' : 'bili-dark'
  localExtStorage.setItem('bili-theme', theme)
  sendClickPoint(event)
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
