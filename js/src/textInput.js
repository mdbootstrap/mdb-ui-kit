import BaseInput from './baseInput'
import Checkbox from './checkbox'
import FileInput from './fileInput'
import Radio from './radio'
import Switch from './switch'
import Util from './util'

const TextInput = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'textInput'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    convertInputSizeVariations: true,
    template: `<span class='material-input'></span>`,
    formGroup: {
      autoCreate: true
    },
    requiredClasses: ['form-control'],
    invalidComponentMatches: [Checkbox, FileInput, Radio, Switch]
  }

  const InputSizeConversions = {
    'textInput-lg': 'form-group-lg',
    'textInput-sm': 'form-group-sm'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class TextInput extends BaseInput {

    constructor(element, config) {
      super(element, Default, config)

      this._convertInputSizeVariations()

      // Initially mark as empty
      if (this.isEmpty()) {
        this.addIsEmpty()
      }

      // Add marker div the end of the form-group
      this.$formGroup.append(this.config.template)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      if (
        ($element.attr('type') === 'text')
        || ($element.prop('tagName') === 'textarea')
        || ($element.prop('tagName') === 'select')
      ) {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.matches($element), `${component} component is invalid for type='text'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    addFocusListener() {
      this.$element
        .on('focus', () => {
          this.addFormGroupFocus(this.$formGroup)
        })
        .on('blur', () => {
          this.removeFormGroupFocus(this.$formGroup)
        })
    }

    addChangeListener() {
      this.$element
        .on('keydown paste', (event) => {
          if (Util.isChar(event)) {
            this.removeIsEmpty()
          }
        })
        .on('keyup change', (event) => {

          // make sure empty is added back when there is a programmatic value change.
          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
          if (this.$element.val()) {
            this.addIsEmpty()
          } else {
            this.removeIsEmpty()
          }

          // Validation events do not bubble, so they must be attached directly to the textInput: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          let isValid = (typeof this.$element[0].checkValidity === 'undefined' || this.$element[0].checkValidity())
          if (isValid) {
            this.removeHasError()
          } else {
            this.addHasError()
          }
        })
    }

    // ------------------------------------------------------------------------
    // private

    _convertInputSizeVariations() {
      if (!this.config.convertInputSizeVariations) {
        return
      }

      // Modification - Change textInput-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (let inputSize in InputSizeConversions) {
        if (this.$element.hasClass(inputSize)) {
          this.$element.removeClass(inputSize)
          this.$formGroup.addClass(InputSizeConversions[inputSize])
        }
      }
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new TextInput(this, config)
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
  $.fn[NAME] = TextInput._jQueryInterface
  $.fn[NAME].Constructor = TextInput
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return TextInput._jQueryInterface
  }

  return TextInput

})(jQuery)

export default TextInput
