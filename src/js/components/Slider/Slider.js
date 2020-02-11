import MySlider from './MySLider'
import classes from '../../classNames'

const classNames = classes.slider

export default class Slider {
  constructor(slider) {
    this.sliderClass = slider
    this.sliders = []
  }

  _getOptions() {
    this.getOptions = ({ navigation, pagination, onInit }) => ({
      hero: {
        slidesPerView: 1,
        grabCursor: true,
        navigation,
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
        on: {
          init: onInit,
        },
      },
      gallery: {
        navigation,
        on: {
          init: onInit,
        },
      },
      thumbs: {
        slidesPerView: 4,
        on: {
          init: onInit,
        },
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      },
      items: {
        slidesPerView: 4,
        grabCursor: true,
        spaceBetween: 30,
        navigation,
        on: {
          init: onInit,
        },
      },
    })
  }

  _getSliders() {
    this.gallerySliders = this.containers.filter(
      container => container.dataset.slider === 'gallery'
    )
  }

  _initSliders() {
    this.containers.forEach(container => {
      if (container.classList.contains(classNames.plugin.initialized)) return

      const slider = new MySlider(container, this.getOptions)
      slider.init()
      this.sliders = [...this.sliders, slider]
    })

    this.initGallerySliders()
  }

  initGallerySliders() {
    if (!this.gallerySliders.length) return

    this.sliders.forEach(sliderObj => {
      const slider = sliderObj
      if (slider.name === 'gallery') {
        const gallery = slider.container.closest(`.${classNames.gallery}`)
        const thumbs = gallery.querySelector(`.${classNames.container}[data-slider="thumbs"]`)
        const [thumbsSlider] = this.sliders.filter(el => el.container === thumbs)

        slider.options.thumbs = {
          swiper: thumbsSlider.swiper,
        }
        slider.init()
      }
    })
  }

  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)]
    if (!this.containers.length) return

    this._getOptions()
    this._getSliders()
    this._initSliders()
  }
}
