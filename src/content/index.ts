async function biliDark() {
  document.documentElement.classList.add('bili-dark')
}
biliDark()

chrome.runtime.onMessage.addListener((request) => {
  const { action } = request
  if (action === 'reload')
    window.location.reload()
})
