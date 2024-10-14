import { localExtStorage } from '@webext-core/storage'
import { getBrowserZoom } from './getBrowserZoom'
import type { ProtocolMap } from './messaging'
import { THEME } from '@/constants'

// @unocss-include
export function setTheme(theme: string) {
  document.documentElement.classList.toggle('dark', theme !== THEME.DARK)
  // if (theme === THEME.DARK)
  //   document.documentElement.dataset.theme = 'bg-dark-8'

  // else
  //   document.documentElement.removeAttribute('data-theme')
}

type MessageType<T extends keyof ProtocolMap> = Parameters<ProtocolMap[T]>[0]
export function getEndRadius(targetPoint: MessageType<'clickPoint'>) {
  const [zoomX, zoomY] = getBrowserZoom()
  const [targetX, targetY] = targetPoint
  const [x, y] = [targetX / zoomX, targetY / zoomY]
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  return [endRadius, x, y]
}

export async function toggleTheme(position: MessageType<'clickPoint'>) {
  const [endRadius, x, y] = getEndRadius(position)
  const biliColorSchema = await localExtStorage.getItem('bili-theme')
  const isDark = biliColorSchema === THEME.DARK

  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => setTheme(biliColorSchema))
    await transition.ready

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
  }
  else {
    setTheme(biliColorSchema)
  }
}
