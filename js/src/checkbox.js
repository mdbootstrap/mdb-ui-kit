import BaseToggle from './baseToggle'
import TextInput from './textInput'
import FileInput from './fileInput'
import Radio from './radio'
import Util from './util'

const Checkbox = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'checkbox'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    template: `<span class='checkbox-decorator'><span class='check'></span></span>`,
    invalidComponentMatches: [FileInput, Radio, TextInput]
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Checkbox extends BaseToggle {

    constructor(element, config, inputType = NAME, outerClass = NAME) {
      super(element, $.extend({}, Default, config), inputType, outerClass)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      // '.checkbox > label > input[type=checkbox]'
      if ($element.attr('type') === 'checkbox') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.matches($element), `${component} component is invalid for type='checkbox'.`)
    }

    // ------------------------------------------------------------------------
    // protected

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
          data = new Checkbox(this, config)
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
  $.fn[NAME] = Checkbox._jQueryInterface
  $.fn[NAME].Constructor = Checkbox
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Checkbox._jQueryInterface
  }

  return Checkbox

})(jQuery)

export default Checkbox
