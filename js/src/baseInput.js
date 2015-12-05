import Util from './util'

const BaseInput = (($) => {

  const Default = {
    formGroup: {
      template: `<div class='form-group'></div>`,
      required: true,
      autoCreate: true
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  }

  const ClassName = {
    FORM_GROUP: 'form-group',
    HAS_ERROR: 'has-error',
    IS_EMPTY: 'is-empty'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}` //,
  }

  const FormControlSizeConversions = {
    'form-control-lg': 'form-group-lg',
    'form-control-sm': 'form-group-sm'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseInput {

    constructor(element, config) {
      this.$element = $(element)
      this.config = $.extend({}, Default, config)

      // Enforce no overlap between components to prevent side effects
      this._rejectInvalidComponentMatches()

      // Enforce expected structure (if any)
      this.rejectWithoutRequiredStructure()

      // Enforce required classes for a consistent rendering
      this._rejectWithoutRequiredClasses()

      if (this.config.formGroup.autoCreate) {
        // Will create form-group if necessary
        this.autoCreateFormGroup()
      }

      // different components have different rules, always run this separately
      this.$formGroup = this.findFormGroup(this.config.formGroup.required)

      this._convertFormControlSizeVariations()

      this.addFocusListener()
      this.addChangeListener()
    }

    dispose(dataKey) {
      $.removeData(this.$element, dataKey)
      this.$element = null
      this.$formGroup = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // protected

    rejectWithoutRequiredStructure() {
      // implement
    }

    addFocusListener() {
      this.$element
        .on('focus', () => {
          this.addFormGroupFocus()
        })
        .on('blur', () => {
          this.removeFormGroupFocus()
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

          // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
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

    addFormGroupFocus() {
      this.$formGroup.addClass(ClassName.IS_FOCUSED)
    }

    removeFormGroupFocus() {
      this.$formGroup.removeClass(ClassName.IS_FOCUSED)
    }

    addHasError() {
      this.$formGroup.addClass(ClassName.HAS_ERROR)
    }

    removeHasError() {
      this.$formGroup.removeClass(ClassName.HAS_ERROR)
    }

    addIsEmpty() {
      this.$formGroup.addClass(ClassName.IS_EMPTY)
    }

    removeIsEmpty() {
      this.$formGroup.removeClass(ClassName.IS_EMPTY)
    }

    isEmpty() {
      return (this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '')
    }

    // Find or create a form-group if necessary
    autoCreateFormGroup() {
      let fg = this.findFormGroup(false)
      if (fg === null || fg.length === 0) {
        this.outerElement().wrap(this.config.formGroup.template)
      }
    }

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures
    outerElement() {
      return this.$element
    }

    // Find expected form-group
    findFormGroup(raiseError = true) {
      let fg = this.$element.closest(Selector.FORM_GROUP) // note that form-group may be grandparent in the case of an input-group
      if (fg.length === 0 && raiseError) {
        $.error(`Failed to find form-group for ${Util.describe(this.$element)}`)
      }
      return fg
    }

    // ------------------------------------------------------------------------
    // private
    _rejectInvalidComponentMatches() {
      for (let otherComponent of this.config.invalidComponentMatches) {
        otherComponent.rejectMatch(this.constructor.name, this.$element)
      }
    }

    _rejectWithoutRequiredClasses() {
      for (let requiredClass of this.config.requiredClasses) {

        let found = false
        // allow one of several classes to be passed in x||y
        if (requiredClass.indexOf('||') !== -1) {
          let oneOf = requiredClass.split('||')
          for (let requiredClass of oneOf) {
            if (this.$element.hasClass(requiredClass)) {
              found = true
              break
            }
          }
        } else if (this.$element.hasClass(requiredClass)) {
          found = true
        }

        // error if not found
        if (!found) {
          $.error(`${this.constructor.name} element: ${Util.describe(this.$element)} requires class: ${requiredClass}`)
        }
      }
    }

    _convertFormControlSizeVariations() {
      if (!this.config.convertInputSizeVariations) {
        return
      }

      // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (let inputSize in FormControlSizeConversions) {
        if (this.$element.hasClass(inputSize)) {
          this.$element.removeClass(inputSize)
          this.$formGroup.addClass(FormControlSizeConversions[inputSize])
        }
      }
    }

    // ------------------------------------------------------------------------
    // static

  }

  return BaseInput

})(jQuery)

export default BaseInput
