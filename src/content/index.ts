import './styles_v2/toggle.less'
import './styles_v2/index.less'

import { localExtStorage } from '@webext-core/storage'
import type { ProtocolMap } from '@/utils'
import { getBrowserZoom, onMessage } from '@/utils'
import { THEME } from '@/constants'

type MessageType<T extends keyof ProtocolMap> = Parameters<ProtocolMap[T]>[0]

function setTheme(theme: string) {
  if (theme === THEME.DARK)
    document.documentElement.dataset.theme = theme

  else
    document.documentElement.removeAttribute('data-theme')
}

function getEndRadius(targetPoint: MessageType<'clickPoint'>) {
  const [zoomX, zoomY] = getBrowserZoom()
  const [targetX, targetY] = targetPoint
  const [x, y] = [targetX / zoomX, targetY / zoomY]
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  return [endRadius, x, y]
}

async function toggleTheme(targetPoint: MessageType<'clickPoint'>) {
  const biliColorSchema = await localExtStorage.getItem('bili-theme')

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  if (document.startViewTransition) {
    const [endRadius, x, y] = getEndRadius(targetPoint)
    const isDark = biliColorSchema === THEME.DARK

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const transition = document.startViewTransition(() => {
      setTheme(biliColorSchema)
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
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        },
      )
    })
  }
  else {
    setTheme(biliColorSchema)
  }
}

async function applyInitialDarkMode() {
  let theme = await localExtStorage.getItem('bili-theme')
  if (!theme) {
    theme = THEME.DARK
    localExtStorage.setItem('bili-theme', theme)
  }
  setTheme(theme)
}

applyInitialDarkMode()

onMessage('clickPoint', async ({ data }) => {
  await toggleTheme(data)
})
