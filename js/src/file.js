import BaseInput from './baseInput'
import Checkbox from './checkbox'
import Radio from './radio'
import Switch from './switch'
import Text from './text'
import Textarea from './textare'
import Select from './select'
import Util from './util'

const File = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'file'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const ClassName = {
    IS_FILE: 'is-file'
  }

  const Selector = {
    FILENAMES: 'input.form-control[readonly]'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class File extends BaseInput {

    constructor(element, config) {
      super(element, $.extend({invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]}, config))

      this.$formGroup.addClass(ClassName.IS_FILE)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if ($element.attr('type') === 'file') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.matches($element), `${component} component is invalid for type='file'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    rejectWithoutRequiredStructure() {
      // FIXME: implement this once we determine how we want to implement files since BS4 has tried to take a shot at this
    }

    addFocusListener() {
      this.$formGroup
        .on('focus', () => {
          this.addFormGroupFocus()
        })
        .on('blur', () => {
          this.removeFormGroupFocus()
        })
    }

    addChangeListener() {
      // set the fileinput readonly field with the name of the file
      this.$element.on('change', () => {
        let value = ''
        $.each(this.$element.files, (i, file) => {
          value += `${file.name}  , `
        })
        value = value.substring(0, value.length - 2)
        if (value) {
          this.removeIsEmpty()
        } else {
          this.addIsEmpty()
        }
        this.$formGroup.find(Selector.FILENAMES).val(value)
      })
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
          data = new File(this, config)
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
  $.fn[NAME] = File._jQueryInterface
  $.fn[NAME].Constructor = File
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return File._jQueryInterface
  }

  return File

})(jQuery)

export default File
