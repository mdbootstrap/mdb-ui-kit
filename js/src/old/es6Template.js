import Util from './util'

const Foo = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'foo'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    template: ``
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Foo {

    constructor(element, config) {
      this.$element = $(element)
      this.config = $.extend({}, Default, config)
    }

    dispose() {
      $.removeData(this.$element, DATA_KEY)
      this.$element = null
      this.config = null
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
          data = new Foo(this, config)
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
  $.fn[JQUERY_NAME] = Foo._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Foo
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Foo._jQueryInterface
  }

  return Foo

})(jQuery)

export default Foo
