import BaseSelection from './baseSelection'
//import Text from './text'
//import File from './file'
//import Radio from './radio'
//import Textarea from './textarea'
//import Select from './select'
import Util from './util'

const Checkbox = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'checkbox'
  const DATA_KEY = `bmd.${NAME}`
  const JQUERY_NAME = `bmd${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    template: `<span class='checkbox-decorator'><span class='check'></span></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Checkbox extends BaseSelection {

    constructor($element, config, properties = {inputType: NAME, outerClass: NAME}) {
      super($element, $.extend(true,
        //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
        Default, config), properties)
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey)
    }

    static matches($element) {
      // '.checkbox > label > input[type=checkbox]'
      if ($element.attr('type') === 'checkbox') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
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
          data = new Checkbox($element, config)
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
  $.fn[JQUERY_NAME] = Checkbox._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Checkbox
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Checkbox._jQueryInterface
  }

  return Checkbox

})(jQuery)

export default Checkbox
