import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/object/values'
import 'intersection-observer'
import './lib/polyfill'

import classNames from './classNames'

// import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import setScrollbar from './components/setScrollbar'
import setSelects from './components/Select/Select'
import setGallery from './components/setGallery'

import Slider from './components/Slider/Slider'
import Menu from './components/Menu/Menu'

import { NO_SCROLL } from './constants'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
    }

    this.slider = new Slider(`.${classNames.slider.container}`)

    this.state = {
      hasMenuOpen: false,
    }

    this.menu = new Menu({
      classNames: {
        btn: 'burger',
        menu: 'header__nav-wrap',
      },
    })
  }

  updateState(state) {
    this.state = {
      ...this.state,
      ...state,
    }
  }

  initMethods() {
    this.methods = {
      // sayHello,
      setHTMLClassNames,
      setLazy,
      setScrollbar,
      setSelects,
      setGallery,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  init() {
    this.initMethods()

    this.slider.init()

    this.menu.init()
    this.menu.onToggle = this.onMenuToggle.bind(this)
    this.menu.onClose = this.onMenuClose.bind(this)
  }

  onMenuToggle() {
    let { hasMenuOpen } = { ...this.state }
    hasMenuOpen = !hasMenuOpen
    this.updateState({ hasMenuOpen })

    App.toggleScroll(this, this.state.hasMenuOpen)
  }

  onMenuClose() {
    this.updateState({ hasMenuOpen: false })
    App.toggleScroll(this, this.state.hasMenuOpen)
  }

  static preventScroll(app) {
    app.dom.body.classList.add(NO_SCROLL)
  }

  static allowScroll(app) {
    app.dom.body.classList.remove(NO_SCROLL)
  }

  static toggleScroll(app, condition) {
    if (condition) {
      App.preventScroll(app)
    } else {
      App.allowScroll(app)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app
})
