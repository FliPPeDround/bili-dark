import './styles_v2/toggle.less'
import './styles_v2/index.less'

import { getBrowserZoom } from '@/utils'

chrome.runtime.onMessage.addListener((request) => {
  toggleTheme(request)
})

chrome.runtime.sendMessage(getInitialRequest().biliColorSchema)

type ColorSchema = 'light' | 'bili-dark'

interface RequestType {
  biliColorSchema: ColorSchema
  targetPoint: [number, number]
}

function getInitialRequest(): RequestType {
  return {
    biliColorSchema: <ColorSchema>localStorage.getItem('bili-color-schema') || 'bili-dark',
    targetPoint: [0, 0],
  }
}

function toggleTheme(request: RequestType = getInitialRequest()) {
  const [zoomX, zoomY] = getBrowserZoom()
  const [targetX, targetY] = request.targetPoint
  const [x, y] = [targetX / zoomX, targetY / zoomY]
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const isDark = request.biliColorSchema === 'bili-dark'
  // const stylesEl = document.getElementById('bili-dark-inject-styles')

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const transition = document.startViewTransition?.(() => {
    document.documentElement.dataset.theme = request.biliColorSchema
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
        duration: 600,
        easing: 'ease-in',
        pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
    localStorage.setItem('bili-color-schema', request.biliColorSchema)
  })
}

function applyInitialDarkMode() {
  const setting = <ColorSchema>localStorage.getItem('bili-color-schema')
  document.documentElement.dataset.theme = setting
}
applyInitialDarkMode()
