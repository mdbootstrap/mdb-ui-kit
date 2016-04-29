import Checkbox from './checkbox'

const Switch = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'switch'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    template: `<span class='bmd-switch-track'></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Switch extends Checkbox {

    constructor($element, config, properties = {inputType: 'checkbox', outerClass: 'switch'}) {
      super($element, $.extend(true, {}, Default, config), properties)
      // selector: '.switch > label > input[type=checkbox]'
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Switch($element, config)
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
  $.fn[JQUERY_NAME] = Switch._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Switch
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Switch._jQueryInterface
  }

  return Switch

})(jQuery)

export default Switch
