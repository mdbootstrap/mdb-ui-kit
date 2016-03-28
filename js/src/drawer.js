import BaseLayout from './baseLayout'

const Drawer = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'drawer'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Keycodes = {
    ESCAPE: 27
    //ENTER: 13,
    //SPACE: 32
  }

  const ClassName = {
    IN: 'in',
    DRAWER_IN: `bmd-drawer-in`,
    DRAWER_OUT: `bmd-drawer-out`,
    DRAWER: 'bmd-layout-drawer',
    CONTAINER: 'bmd-layout-container'
  }

  const Default = {
    focusSelector: `a, button, input`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Drawer extends BaseLayout {

    // $element is expected to be the trigger
    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
    constructor($element, config) {
      super($element, $.extend(true, {}, Default, config))

      this.$toggles = $(`[data-toggle="drawer"][href="#${this.$element[0].id}"], [data-toggle="drawer"][data-target="#${this.$element[0].id}"]`)

      this._addAria()

      // click or escape on the backdrop closes the drawer
      this.$backdrop.keydown((ev) => {
        if (ev.which === Keycodes.ESCAPE) {
          this.hide()
        }
      }).click(() => {
        this.hide()
      })

      // escape on the drawer closes it
      this.$element.keydown((ev) => {
        if (ev.which === Keycodes.ESCAPE) {
          this.hide()
        }
      })

      // any toggle button clicks
      this.$toggles.click(() => {
        this.toggle()
      })
    }

    dispose() {
      super.dispose(DATA_KEY)
      this.$toggles = null
    }

    toggle() {
      if (this._isOpen()) {
        this.hide()
      } else {
        this.show()
      }
    }

    show() {
      if (this._isForcedClosed() || this._isOpen()) {
        return
      }

      this.$toggles.attr('aria-expanded', true)
      this.$element.attr('aria-expanded', true)
      this.$element.attr('aria-hidden', false)

      // focus on the first focusable item
      let $focusOn = this.$element.find(this.config.focusSelector)
      if ($focusOn.length > 0) {
        $focusOn.first().focus()
      }

      this.$container.addClass(ClassName.DRAWER_IN)
      // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
      this.$backdrop.addClass(ClassName.IN)
    }

    hide() {
      if (!this._isOpen()) {
        return
      }

      this.$toggles.attr('aria-expanded', false)
      this.$element.attr('aria-expanded', false)
      this.$element.attr('aria-hidden', true)

      this.$container.removeClass(ClassName.DRAWER_IN)
      this.$backdrop.removeClass(ClassName.IN)
    }


    // ------------------------------------------------------------------------
    // private

    _isOpen() {
      return this.$container.hasClass(ClassName.DRAWER_IN)
    }

    _isForcedClosed() {
      return this.$container.hasClass(ClassName.DRAWER_OUT)
    }

    _addAria() {
      let isOpen = this._isOpen()
      this.$element.attr('aria-expanded', isOpen)
      this.$element.attr('aria-hidden', isOpen)

      if (this.$toggles.length) {
        this.$toggles.attr('aria-expanded', isOpen)
      }
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Drawer($element, config)
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
  $.fn[JQUERY_NAME] = Drawer._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Drawer
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Drawer._jQueryInterface
  }

  return Drawer

})(jQuery)

export default Drawer
