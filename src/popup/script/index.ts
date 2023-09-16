const btn = document.getElementById('btn')
btn!.addEventListener('click', async (event) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })
  const tabId = tab.id ?? 1
  chrome.tabs.sendMessage(tabId, {
    action: 'reload',
  })
  chrome.runtime.reload()
})
