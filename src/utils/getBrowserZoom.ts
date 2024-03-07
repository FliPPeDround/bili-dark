function getDecimal(num: number) {
  return Math.round(num * 100) / 100
}

export function getBrowserZoom() {
  const browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const widthZoom = getDecimal(window.outerWidth / browserWidth)

  const browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const heightZoom = getDecimal(window.outerHeight / browserHeight)

  return [widthZoom, heightZoom]
}
