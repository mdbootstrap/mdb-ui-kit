//import Util from './util'

// Togglebutton decorator, to be called after Input
const Togglebutton = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'togglebutton'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    template: `<span class='toggle'></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Togglebutton {

    constructor($element, config) {
      this.$element = $element
      this.config = $.extend({}, Default, config)

      this.$element.after(this.config.template)
    }

    dispose() {
      $.removeData(this.$element, DATA_KEY)
      this.$element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Togglebutton(this, config)
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
  $.fn[NAME] = Togglebutton._jQueryInterface
  $.fn[NAME].Constructor = Togglebutton
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Togglebutton._jQueryInterface
  }

  return Togglebutton

})(jQuery)

export default Togglebutton
