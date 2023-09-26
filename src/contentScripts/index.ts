async function biliDark() {
  document.documentElement.classList.add('bili-dark')
}
biliDark()

chrome.runtime.onMessage.addListener((request) => {
  const { action } = request
  console.log('123sss')
  if (action === 'reload')
    window.location.reload()
})
