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

const switchEl = <HTMLInputElement>document.getElementById('dark')
chrome.storage.local.get(['setting'], ({ setting }) => {
  switchEl.checked = setting !== 'bili-dark'
})

switchEl.addEventListener('click', async (event) => {
  const theme = switchEl.checked ? 'light' : 'bili-dark'
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
