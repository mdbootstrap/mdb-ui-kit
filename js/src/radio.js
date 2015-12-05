import BaseToggle from './baseToggle'
import TextInput from './textInput'
import FileInput from './fileInput'
import Checkbox from './checkbox'
import Switch from './switch'
import Util from './util'

// Radio decorator, to be called after Input
const Radio = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'radio'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    template: `<span class='radio-decorator'></span><span class='check'></span>`,
    invalidComponentMatches: [Checkbox, FileInput, Switch, TextInput]
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Radio extends BaseToggle {

    constructor(element, config) {
      super(element, $.extend({}, Default, config), NAME, NAME)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      // '.radio > label > input[type=radio]'
      if ($element.attr('type') === 'radio') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.matches($element), `${component} component is invalid for type='radio'.`)
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
          data = new Radio(this, config)
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
  $.fn[NAME] = Radio._jQueryInterface
  $.fn[NAME].Constructor = Radio
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Radio._jQueryInterface
  }

  return Radio

})(jQuery)

export default Radio
