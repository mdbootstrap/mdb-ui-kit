import BaseInput from './baseInput'
import Checkbox from './checkbox'
import File from './file'
import Radio from './radio'
import Switch from './switch'
import Textarea from './textare'
import Select from './select'
import Util from './util'

const Text = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'text'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {
    decorator: {
      template: `<span class='mdb-form-control-decorator'></span>`
    },
    requiredClasses: ['form-control']
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Text extends BaseInput {

    constructor($element, config) {
      super($element, $.extend({invalidComponentMatches: [Checkbox, File, Radio, Select, Switch, Textarea]}, Default, config))

      // Initially mark as empty
      if (this.isEmpty()) {
        this.addIsEmpty()
      }

      // Add marker div the end of the form-group
      this.$element.after(this.config.decorator.template)
    }

    dispose(dataKey = DATA_KEY) {
      super.dispose(dataKey)
    }

    static matches($element) {
      if ($element.attr('type') === 'text') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='text'.`)
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
          data = new Text($element, config)
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
  $.fn[JQUERY_NAME] = Text._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Text
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Text._jQueryInterface
  }

  return Text

})(jQuery)

export default Text
