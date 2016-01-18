import BaseLayout from './baseLayout'

const Layout = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'layout'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Keycodes = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32
  }

  const ClassName = {
    CANVAS: 'mdb-layout-canvas',
    HEADER: 'mdb-layout-header',
    DRAWER: 'mdb-layout-drawer',
    CONTENT: 'mdb-layout-content',
    DRAWER_BTN: 'mdb-layout-drawer-button',  // FIXME: swithch to data-drawer attr finder or something like that, see navbar toggler
    BACKDROP: 'mdb-layout-backdrop'
  }

  const Selector = {
    DRAWER_BTN: `.${ClassName.DRAWER_BTN}`,
    DRAWER: `.${ClassName.DRAWER}`,
    HEADER: `.${ClassName.HEADER}`,
    CONTENT: `.${ClassName.CONTENT}`,
    DATA_TOGGLE_DRAWER: '[data-toggle="drawer"]'
  }

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Layout extends BaseLayout {

    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config))

      // FIXME: I'm not sure we want to auto-resolve a canvas....think about it and refactor this or delete it.
      // FIXME: with a goal of supporting two drawers, or even more, I'm not sure we want to auto-add the canvas.
      //var canvas = document.createElement('div')
      //canvas.addClass(ClassName.CANVAS)
      //this.$element.parentElement.insertBefore(canvas, this.$element)
      //this.$element.parentElement.removeChild(this.$element)
      //canvas.appendChild(this.$element)

      this.$header = $element.find(`> ${Selector.HEADER}`)
      this.$drawer = $element.find(`> ${Selector.DRAWER}`)
      this.$content = $element.find(`> ${Selector.CONTENT}`)


      // Add drawer toggling button to our layout, if we have an openable drawer.
      if (this.$drawer) {

        // FIXME: separate DrawerToggle component?
        //this.$drawerBtn = $element.find(`${DRAWER_BTN}`)
        //
        //if (this.$drawerBtn) {      // FIXME what about many drawer buttons? implies a separate jquery class
        //
        //  this.$drawerBtn.click((ev) => {
        //    this._drawerToggleHandler(ev)
        //  })
        //  this.$drawerBtn.keydown((ev) => {
        //    this._drawerToggleHandler(ev)
        //  })
        //}

        // create the backdrop
        this.$backdrop = $(`<div class="${ClassName.BACKDROP}"></div>`)
        this.$backdrop.click((ev) => {
          this._drawerToggleHandler(ev)
        })
        this.$element.append(this.$backdrop)

        this.$drawer.keydown((ev) => {
          this._onDrawerKeydown(ev)
        })
        this.$drawer.attr('aria-hidden', 'true')
      }
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    /**
     * Toggle drawer state
     */
    toggleDrawer() {
      //FIXME: seems terrible, look at navbar toggler

      //$drawerBtn = this.$element.querySelector(Selector.DRAWER_BTN)
      //var firstLink = document.querySelector(Selector.DRAWER + ' a')
      //this.$drawer.classList.toggle(ClassName.IS_DRAWER_OPEN)
      //this.$backdrop.classList.toggle(ClassName.IS_DRAWER_OPEN)
      //
      //// focus first link if drawer will be opened otherwise focus the drawer button
      //if (this.$drawer.hasClass(ClassName.IS_DRAWER_OPEN)) {
      //  this.$drawer.attr('aria-hidden', 'false')
      //  this.$drawerBtn.attr('aria-expanded', 'true')
      //  if (firstLink) {
      //    firstLink.focus()
      //  }
      //} else {
      //  this.$drawer.attr('aria-hidden', 'true')
      //  this.$drawerBtn.attr('aria-expanded', 'false')
      //  this.$drawerBtn.focus()
      //}
    }

    // ------------------------------------------------------------------------
    // private

    /**
     * Handles events of of drawer button.
     *
     * @param {Event} ev The event that fired.
     * @private
     */
    _drawerToggleHandler(ev) {
      if (ev && (ev.type === 'keydown')) {
        if (ev.keyCode === Keycodes.SPACE || ev.keyCode === Keycodes.ENTER) {
          // prevent scrolling in drawer nav
          ev.preventDefault()
        } else {
          // prevent other keys
          return
        }
      }

      this.toggleDrawer()
    }

    /**
     * Handles a keyboard event on the drawer.
     */
    _onDrawerKeydown(ev) {
      if (ev.keyCode === Keycodes.ESCAPE) {
        this.toggleDrawer()
      }
    }


    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Layout($element, config)
          $element.data(DATA_KEY, data)
        }
      })
    }
  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[JQUERY_NAME] = Layout._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Layout
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Layout._jQueryInterface
  }

  return Layout

})(jQuery)

export default Layout
