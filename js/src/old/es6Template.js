const Foo = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'foo'
  const DATA_KEY = `bmd.${NAME}`
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Selector = {
    DATA_DISMISS: '[data-dismiss="foo"]'
  }

  const Event = {
    CLOSE: `close${EVENT_KEY}`,
    CLOSED: `closed${EVENT_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Foo {

    constructor(element) {
      this._element = element
    }

    // getters
    static get NAME() {
      return NAME
    }

    // public
    close(element) {
      element = element || this._element

      let rootElement = this._getRootElement(element)
      let customEvent = this._triggerCloseEvent(rootElement)

      if (customEvent.isDefaultPrevented()) {
        return
      }

      this._removeElement(rootElement)
    }

    dispose() {
      $.removeData(this._element, DATA_KEY)
      this._element = null
    }


    // private

    _bar(element) {
      let x = 1
      return x
    }


    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Foo(this)
          $element.data(DATA_KEY, data)
        }

        if (config === 'close') {
          data[config](this)
        }
      })
    }

    static _handleClose(fooInstance) {
      return function (event) {
        if (event) {
          event.preventDefault()
        }

        fooInstance.close(this)
      }
    }
  }


  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(
    Event.CLICK_DATA_API,
    Selector.DATA_DISMISS,
    Foo._handleClose(new Foo())
  )


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */
  $.fn[NAME] = Foo._jQueryInterface
  $.fn[NAME].Constructor = Foo
  $.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Foo._jQueryInterface
  }

  return Foo

})(jQuery)

export default Foo
