import { THEME } from '@/constants'
import { localExtStorage } from '@webext-core/storage'
import { getBrowserZoom } from './getBrowserZoom'

export class ToggleAnimatedTheme {
  public endRadius = 0

  private duration = 600
  private x: number
  private y: number

  constructor(x: number, y: number, isTab: boolean) {
    this.x = x
    this.y = y
    this.endRadius = this.calculateRadius(x, y, isTab)
  }

  /** 计算半径 */
  getRadius(x: number, y: number) {
    return Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
  }

  /** 根据是否是Tab页计算半径 */
  private calculateRadius(x: number, y: number, isTab: boolean): number {
    if (isTab) {
      const [zoomX, zoomY] = getBrowserZoom()
      return this.getRadius(x / zoomX, y / zoomY)
    }
    else {
      return this.getRadius(x, y)
    }
  }

  /** 设置主题 */
  setTheme(theme: string) {
    document.documentElement.classList.toggle('dark', theme !== THEME.DARK)
  }

  /** 动画 */
  async animate(biliColorSchema: THEME, radiusTab?: number) {
    const isDark = biliColorSchema === THEME.DARK
    const transition = document.startViewTransition(
      () => {
        this.setTheme(biliColorSchema)
      },
    )
    await transition.ready

    const clipPath = [
      `circle(0px at ${this.x}px ${this.y}px)`,
      `circle(${this.endRadius}px at ${this.x}px ${this.y}px)`,
    ]

    // 减去通讯时长
    const adjustedDuration = this.duration - 10
    const duration = radiusTab ? this.endRadius * adjustedDuration / radiusTab : this.duration
    const delay = isDark ? this.duration - duration : 0

    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath,
      },
      {
        duration,
        delay,
        easing: 'linear',
        pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  }

  /** 切换主题 */
  public async toggle(radiusTab?: number): Promise<void> {
    try {
      const biliColorSchema = await localExtStorage.getItem('bili-theme') as THEME
      if (document?.startViewTransition)
        await this.animate(biliColorSchema, radiusTab)
      else
        this.setTheme(biliColorSchema)
    }
    catch (error) {
      console.error('Error toggling theme:', error)
    }
  }
}
