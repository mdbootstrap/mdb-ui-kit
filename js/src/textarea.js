import Checkbox from './checkbox'
import File from './file'
import Radio from './radio'
import Switch from './switch'
import Text from './text'
import Select from './select'
import Util from './util'

const Textarea = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'textarea'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Textarea extends Text {

    constructor(element, config) {
      super(element, $.extend({invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]}, Default, config))
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if ($element.prop('tagName') === 'textarea') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.matches($element), `${component} component is invalid for <textarea>.`)
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
          data = new Textarea(this, config)
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
  $.fn[NAME] = Textarea._jQueryInterface
  $.fn[NAME].Constructor = Textarea
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Textarea._jQueryInterface
  }

  return Textarea

})(jQuery)

export default Textarea
