import Util from './util'

const Foo = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'foo'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Foo {

    constructor(element) {
      this.element = element
    }

    dispose() {
      $.removeData(this.element, DATA_KEY)
      this.element = null
    }

    // ------------------------------------------------------------------------
    // private

    _bar(element) {
      let x = 1
      return x
    }

    // ------------------------------------------------------------------------
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
  }

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
