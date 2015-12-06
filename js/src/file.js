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

  const Default = {
    formGroup: {
      required: false
    }
  }

  const ClassName = {
    FILE: NAME,
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
      super(element, $.extend({invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]}, Default, config))

      this.$mdbFormGroup.addClass(ClassName.IS_FILE)
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

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // label.file > input[type=file]
      return this.$element
    }

    rejectWithoutRequiredStructure() {
      // label.file > input[type=file]
      Util.assert(this.outerElement().prop('tagName') === 'label', `${this.constructor.name}'s ${Util.describe(this.$element)} parent element ${Util.describe(this.outerElement())} should be <label>.`)
      Util.assert(this.outerElement().hasClass(ClassName.FILE), `${this.constructor.name}'s ${Util.describe(this.$element)} parent element ${Util.describe(this.outerElement())} should have class .${ClassName.FILE}.`)
    }

    addFocusListener() {
      this.$mdbFormGroup
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
        this.$mdbFormGroup.find(Selector.FILENAMES).val(value)
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
