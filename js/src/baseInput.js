import Util from './util'

const BaseInput = (($) => {

  const Default = {
    formGroup: {
      required: true
    },
    mdbFormGroup: {
      template: `<div class='mdb-form-group'></div>`,
      required: true,
      autoCreate: true
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  }

  const ClassName = {
    FORM_GROUP: 'form-group',
    MDB_FORM_GROUP: 'mdb-form-group',
    HAS_ERROR: 'has-error',
    IS_EMPTY: 'is-empty',
    IS_FOCUSED: 'is-focused'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}`,
    MDB_FORM_GROUP: `.${ClassName.MDB_FORM_GROUP}`
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

      if (this.config.mdbFormGroup.autoCreate) {
        // Will create form-group if necessary
        this.autoCreateMdbFormGroup()
      }

      // different components have different rules, always run this separately
      this.$mdbFormGroup = this.findMdbFormGroup(this.config.mdbFormGroup.required)
      this.$formGroup = this.findFormGroup(this.config.formGroup.required)

      this._convertFormControlSizeVariations()

      this.addFocusListener()
      this.addChangeListener()
    }

    dispose(dataKey) {
      $.removeData(this.$element, dataKey)
      this.$element = null
      this.$mdbFormGroup = null
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
      this.$mdbFormGroup.addClass(ClassName.IS_FOCUSED)
    }

    removeFormGroupFocus() {
      this.$mdbFormGroup.removeClass(ClassName.IS_FOCUSED)
    }

    addHasError() {
      this.$mdbFormGroup.addClass(ClassName.HAS_ERROR)
    }

    removeHasError() {
      this.$mdbFormGroup.removeClass(ClassName.HAS_ERROR)
    }

    addIsEmpty() {
      this.$mdbFormGroup.addClass(ClassName.IS_EMPTY)
    }

    removeIsEmpty() {
      this.$mdbFormGroup.removeClass(ClassName.IS_EMPTY)
    }

    isEmpty() {
      return (this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '')
    }

    // Find or create a mdb-form-group if necessary
    autoCreateMdbFormGroup() {
      let fg = this.findMdbFormGroup(false)
      if (fg === undefined || fg.length === 0) {
        this.outerElement().wrap(this.config.mdbFormGroup.template)
      }
    }

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures
    outerElement() {
      return this.$element
    }

    // Find mdb-form-group
    findMdbFormGroup(raiseError = true) {
      let mfg = this.$element.closest(Selector.MDB_FORM_GROUP)
      if (mfg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.MDB_FORM_GROUP} for ${Util.describe(this.$element)}`)
      }
      return mfg
    }

    // Find mdb-form-group
    findFormGroup(raiseError = true) {
      let fg = this.$element.closest(Selector.FORM_GROUP)
      if (fg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.FORM_GROUP} for ${Util.describe(this.$element)}`)
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
          this.$mdbFormGroup.addClass(FormControlSizeConversions[inputSize])
        }
      }
    }

    // ------------------------------------------------------------------------
    // static

  }

  return BaseInput

})(jQuery)

export default BaseInput
