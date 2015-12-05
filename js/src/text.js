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
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    template: `<span class='text-input-decorator'></span>`,
    requiredClasses: ['form-control']
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Text extends BaseInput {

    constructor(element, config) {
      super(element, $.extend({invalidComponentMatches: [Checkbox, File, Radio, Select, Switch, Textarea]}, Default, config))

      // Initially mark as empty
      if (this.isEmpty()) {
        this.addIsEmpty()
      }

      // Add marker div the end of the form-group
      this.$formGroup.append(this.config.template)
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
      Util.assert(this.matches($element), `${component} component is invalid for type='text'.`)
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
          data = new Text(this, config)
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
  $.fn[NAME] = Text._jQueryInterface
  $.fn[NAME].Constructor = Text
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Text._jQueryInterface
  }

  return Text

})(jQuery)

export default Text
