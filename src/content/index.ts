import './styles/index.less'

// async function biliDark() {
//   document.documentElement.classList.add('bili-dark')
// }
// biliDark()
// alert("content-script.js 已经注入");

function setDarkMode() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const setting = localStorage.getItem('bili-color-schema') || 'auto'
  if (setting === 'dark' || (prefersDark && setting !== 'light'))
    document.documentElement.classList.toggle('bili-dark', true)
  else
    document.documentElement.classList.toggle('bili-dark', false)
}
setDarkMode()

chrome.runtime.onMessage.addListener(
  (request, _sender, _sendResponse) => {
    // console.log(sender)
    // localStorage.setItem('bili-color-schema', request['bili-color-schema'])
    // setDarkMode()
    toggleTheme(request)
  },
)

interface RequestType {
  biliColorSchema: 'light' | 'dark' | 'auto'
  targetPoint: [number, number]
}

function toggleTheme(request: RequestType) {
  const [x, y] = request.targetPoint
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  let isDark: boolean

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const transition = document.startViewTransition && document.startViewTransition(() => {
    const root = document.documentElement
    isDark = root.classList.contains('bili-dark')
    root.classList.remove(isDark ? 'bili-dark' : 'light')
    root.classList.add(isDark ? 'light' : 'bili-dark')
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath,
      },
      {
        duration: 800,
        easing: 'ease-in',
        pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}
