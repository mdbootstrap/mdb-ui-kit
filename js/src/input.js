import Util from './util'

const Input = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'input'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    convertInputSizeVariations: true,
    template: `<span class='material-input'></span>`,
    formGroup: {
      template: `<div class='form-group'></div>`
    }
  }

  const InputSizeConversions = {
    'input-lg': 'form-group-lg',
    'input-sm': 'form-group-sm'
  }

  const ClassName = {
    IS_EMPTY: 'is-empty',
    FORM_GROUP: 'form-group',
    HAS_ERROR: 'has-error'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}` //,
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Input {

    constructor(element, config) {
      this.$element = $(element)
      this.config = $.extend({}, Default, config)

      // Requires form-group standard markup (will add it if necessary)
      this.$formGroup = this._findOrCreateFormGroup()

      this._convertInputSizeVariations()

      // Initially mark as empty
      if (this._isEmpty()) {
        this.$formGroup.addClass(ClassName.IS_EMPTY)
      }

      // Add marker div the end of the form-group
      this.$formGroup.append(this.config.template)

      this._bindEventListeners()
    }

    dispose() {
      $.removeData(this.$element, DATA_KEY)
      this.$element = null
      this.$formGroup = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _bindEventListeners() {

      this.$element
        .on('keydown paste', (event) => {
          if (Util.isChar(event)) {
            this._removeIsEmpty()
          }
        })
        .on('keyup change', (event) => {
          let isValid = (typeof this.$element[0].checkValidity === 'undefined' || this.$element[0].checkValidity())

          if (this.$element.val() === '' && isValid) {
            this._addIsEmpty()
          } else {
            this._removeIsEmpty()
          }

          // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          if (isValid) {
            this._removeHasError()
          } else {
            this._addHasError()
          }
        })
        .on('focus', () => {
          Util.addFormGroupFocus(this.$formGroup)
        })
        .on('blur', () => {
          Util.removeFormGroupFocus(this.$formGroup)
        })
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        .on('change', () => {
          if (this.$element.attr('type') === 'file') {
            return
          }

          let value = this.$element.val()
          if (value) {
            this._removeIsEmpty()
          } else {
            this._addIsEmpty()
          }
        })
    }

    _addHasError() {
      this.$formGroup.addClass(ClassName.HAS_ERROR)
    }

    _removeHasError() {
      this.$formGroup.removeClass(ClassName.HAS_ERROR)
    }

    _addIsEmpty() {
      this.$formGroup.addClass(ClassName.IS_EMPTY)
    }

    _removeIsEmpty() {
      this.$formGroup.removeClass(ClassName.IS_EMPTY)
    }

    _isEmpty() {
      return (this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '')
    }

    _convertInputSizeVariations() {
      if (!this.config.convertInputSizeVariations) {
        return
      }

      // Modification - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (let inputSize in InputSizeConversions) {
        if (this.$element.hasClass(inputSize)) {
          this.$element.removeClass(inputSize)
          this.$formGroup.addClass(InputSizeConversions[inputSize])
        }
      }
    }

    _findOrCreateFormGroup() {
      let fg = this.$element.closest(Selector.FORM_GROUP) // note that form-group may be grandparent in the case of an input-group
      if (fg === null || fg.length === 0) {
        this.$element.wrap(this.config.formGroup.template)
        fg = this.$element.closest(Selector.FORM_GROUP) // find node after attached (otherwise additional attachments don't work)
      }
      return fg
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Input(this, config)
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
  $.fn[NAME] = Input._jQueryInterface
  $.fn[NAME].Constructor = Input
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Input._jQueryInterface
  }

  return Input

})(jQuery)

export default Input
