import { localExtStorage } from '@webext-core/storage'
import { getBrowserZoom } from './getBrowserZoom'
import type { ProtocolMap } from './messaging'
import { THEME } from '@/constants'

type MessageType<T extends keyof ProtocolMap> = Parameters<ProtocolMap[T]>[0]
type StartPoint = [number, number, number]

export function setTheme(theme: string) {
  document.documentElement.classList.toggle('dark', theme !== THEME.DARK)
}

export async function applyInitialDarkMode() {
  let theme = await localExtStorage.getItem('bili-theme')
  if (!theme) {
    theme = THEME.DARK
    localExtStorage.setItem('bili-theme', theme)
  }
  setTheme(theme)
}

export function getEndRadiusInTab(targetPoint: MessageType<'clickPoint'>): StartPoint {
  const [zoomX, zoomY] = getBrowserZoom()
  const [targetX, targetY] = targetPoint
  const [x, y] = [targetX / zoomX, targetY / zoomY]
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )
  return [endRadius, x, y]
}

export function getEndRadiusInPopup(targetPoint: MessageType<'clickPoint'>): StartPoint {
  const [x, y] = targetPoint
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  return [endRadius, x, y]
}

export async function toggleTheme(data: StartPoint) {
  const [endRadius, x, y] = data
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
        easing: 'linear',
        pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  }
  else {
    setTheme(biliColorSchema)
  }
}
