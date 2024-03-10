import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

async function sendTheme(theme, event) {
  const window = await chrome.windows.getCurrent()
  const x = event.screenX - window.left
  const y = event.clientY

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })

  await chrome.tabs.sendMessage(tab.id, {
    biliColorSchema: theme,
    targetPoint: [x, y],
  })
}

let setting = 'dark'
chrome.runtime.onMessage.addListener((request) => {
  setting = request
})

const switchEl = <HTMLInputElement>document.getElementById('dark')
switchEl.checked = setting !== 'dark'
switchEl.addEventListener('click', async (event) => {
  const theme = switchEl.checked ? 'light' : 'dark'
  await sendTheme(theme, event)
})

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
