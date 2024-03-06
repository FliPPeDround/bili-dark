import './styles/index.less'

chrome.runtime.onMessage.addListener((request) => {
  toggleTheme(request)
})

type ColorSchema = 'light' | 'dark' | 'auto'

interface RequestType {
  biliColorSchema: ColorSchema
  targetPoint: [number, number]
}

function getInitialRequest(): RequestType {
  return {
    biliColorSchema: (localStorage.getItem('bili-color-schema') as ColorSchema) || 'auto',
    targetPoint: [0, 0],
  }
}

function toggleTheme(request: RequestType = getInitialRequest()) {
  const [x, y] = request.targetPoint
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = request.biliColorSchema === 'dark' || (request.biliColorSchema === 'auto' && prefersDark)

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const transition = document.startViewTransition?.(() => {
    document.documentElement.classList.toggle('bili-dark', isDark)
    localStorage.setItem('bili-color-schema', request.biliColorSchema)
  })

  transition?.ready.then(() => {
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

function applyInitialDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const setting: ColorSchema = (localStorage.getItem('bili-color-schema') as ColorSchema) || 'auto'
  const isDark = setting === 'dark' || (setting === 'auto' && prefersDark)
  document.documentElement.classList.toggle('bili-dark', isDark)
}

applyInitialDarkMode()
