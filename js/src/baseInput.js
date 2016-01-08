import Base from './base'
import Util from './util'

const BaseInput = (($) => {

  const ClassName = {
    FORM_GROUP: 'form-group',
    MDB_FORM_GROUP: 'mdb-form-group',
    MDB_LABEL: 'mdb-label',
    MDB_LABEL_STATIC: 'mdb-label-static',
    MDB_LABEL_PLACEHOLDER: 'mdb-label-placeholder',
    MDB_LABEL_FLOATING: 'mdb-label-floating',
    HAS_DANGER: 'has-danger',
    IS_FILLED: 'is-filled',
    IS_FOCUSED: 'is-focused'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}`,
    MDB_FORM_GROUP: `.${ClassName.MDB_FORM_GROUP}`,
    MDB_LABEL_WILDCARD: `label[class^='${ClassName.MDB_LABEL}'], label[class*=' ${ClassName.MDB_LABEL}']` // match any label variant if specified
  }

  const Default = {
    validate: false,
    formGroup: {
      required: false
    },
    mdbFormGroup: {
      template: `<span class='${ClassName.MDB_FORM_GROUP}'></span>`,
      create: true, // create a wrapper if form-group not found
      required: true // not recommended to turn this off, only used for inline components
    },
    label: {
      required: false,

      // Prioritized find order for resolving the label to be used as an mdb-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $mdbFormGroup.find(selector)
      //
      // Note this only runs if $mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      selectors: [
        `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
        `> label` // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
      ],
      className: ClassName.MDB_LABEL_STATIC
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  }

  const FormControlSizeMarkers = {
    'form-control-lg': 'mdb-form-group-lg',
    'form-control-sm': 'mdb-form-group-sm'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseInput extends Base {

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties)

      // Enforce no overlap between components to prevent side effects
      this._rejectInvalidComponentMatches()

      // Enforce expected structure (if any)
      this.rejectWithoutRequiredStructure()

      // Enforce required classes for a consistent rendering
      this._rejectWithoutRequiredClasses()

      // Resolve the form-group first, it will be used for mdb-form-group if possible
      //   note: different components have different rules
      this.$formGroup = this.findFormGroup(this.config.formGroup.required)

      // Will add mdb-form-group to form-group or create an mdb-form-group
      //  Performance Note: for those forms that are really performance driven, create the markup with the .mdb-form-group to avoid
      //    rendering changes once added.
      this.$mdbFormGroup = this.resolveMdbFormGroup()

      // Resolve and mark the mdbLabel if necessary as defined by the config
      this.$mdbLabel = this.resolveMdbLabel()

      // Signal to the mdb-form-group that a form-control-* variation is being used
      this.resolveMdbFormGroupSizing()

      this.addFocusListener()
      this.addChangeListener()
    }

    dispose(dataKey) {
      super.dispose(dataKey)
      this.$mdbFormGroup = null
      this.$formGroup = null
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
            this.addIsFilled()
          }
        })
        .on('keyup change', () => {

          // make sure empty is added back when there is a programmatic value change.
          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
          if (this.isEmpty()) {
            this.removeIsFilled()
          } else {
            this.addIsFilled()
          }

          if (this.config.validate) {
            // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
            //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
            //  the form-group on change.
            //
            // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
            //        BUT, I've left it here for backwards compatibility.
            let isValid = (typeof this.$element[0].checkValidity === 'undefined' || this.$element[0].checkValidity())
            if (isValid) {
              this.removeHasDanger()
            } else {
              this.addHasDanger()
            }
          }
        })
    }

    addHasDanger() {
      this.$mdbFormGroup.addClass(ClassName.HAS_DANGER)
    }

    removeHasDanger() {
      this.$mdbFormGroup.removeClass(ClassName.HAS_DANGER)
    }

    isEmpty() {
      return (this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '')
    }

    // Will add mdb-form-group to form-group or create a mdb-form-group if necessary
    resolveMdbFormGroup() {
      let mfg = this.findMdbFormGroup(false)
      if (mfg === undefined || mfg.length === 0) {
        if (this.config.mdbFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
          // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
          //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.
          this.outerElement().wrap(this.config.mdbFormGroup.template)
        } else {
          // a form-group does exist, add our marker class to it
          this.$formGroup.addClass(ClassName.MDB_FORM_GROUP)

          // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
          // A form-group does exist, so add an mdb-form-group wrapping it's internal contents
          //fg.wrapInner(this.config.mdbFormGroup.template)
        }

        mfg = this.findMdbFormGroup(this.config.mdbFormGroup.required)
      }

      return mfg
    }

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures
    outerElement() {
      return this.$element
    }

    // Will add mdb-label to mdb-form-group if not already specified
    resolveMdbLabel() {

      let label = this.$mdbFormGroup.find(Selector.MDB_LABEL_WILDCARD)
      if (label === undefined || label.length === 0) {
        // we need to find it based on the configured selectors
        label = this.findMdbLabel(this.config.label.required)

        if (label === undefined || label.length === 0) {
          // no label found, and finder did not require one
        } else {
          // a candidate label was found, add the configured default class name
          label.addClass(this.config.label.className)
        }
      }

      return label
    }

    // Find mdb-label variant based on the config selectors
    findMdbLabel(raiseError = true) {
      let label = null

      // use the specified selector order
      for (let selector of this.config.label.selectors) {
        if ($.isFunction(selector)) {
          label = selector(this)
        } else {
          label = this.$mdbFormGroup.find(selector)
        }

        if (label !== undefined && label.length > 0) {
          break
        }
      }

      if (label.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.MDB_LABEL_WILDCARD} within form-group for ${Util.describe(this.$element)}`)
      }
      return label
    }

    // Find mdb-form-group
    findFormGroup(raiseError = true) {
      let fg = this.$element.closest(Selector.FORM_GROUP)
      if (fg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.FORM_GROUP} for ${Util.describe(this.$element)}`)
      }
      return fg
    }

    // Due to the interconnected nature of labels/inputs/help-blocks, signal the mdb-form-group-* size variation based on
    //  a found form-control-* size
    resolveMdbFormGroupSizing() {
      if (!this.config.convertInputSizeVariations) {
        return
      }

      // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (let inputSize in FormControlSizeMarkers) {
        if (this.$element.hasClass(inputSize)) {
          //this.$element.removeClass(inputSize)
          this.$mdbFormGroup.addClass(FormControlSizeMarkers[inputSize])
        }
      }
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

    // ------------------------------------------------------------------------
    // static

  }

  return BaseInput

})(jQuery)

export default BaseInput
