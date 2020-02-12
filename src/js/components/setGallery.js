import 'lightgallery.js'
import classNames from '../classNames'

export default () => {
  const lgs = [...document.querySelectorAll(`.${classNames.lightgallery}`)]

  if (!lgs.length) return

  lgs.forEach(lg => {
    // eslint-disable-next-line
      lightGallery(lg)
  })
}
