import Util from './util'

const BaseInput = (($) => {

  const Default = {
    formGroup: {
      template: `<div class='form-group'></div>`,
      required: true,
      autoCreate: false
    },
    requiredClasses: ['form-control'],
    invalidComponentMatches: []
  }

  const ClassName = {
    FORM_GROUP: 'form-group',
    HAS_ERROR: 'has-error',
    IS_EMPTY: 'is-empty'
  }

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}` //,
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseInput {

    constructor(element, defaultConfig, config) {
      this.$element = $(element)
      this.config = $.extend({}, Default, defaultConfig, config)

      // Enforce no overlap between components to prevent side effects
      this._rejectInvalidComponentMatches()

      // Enforce required classes for a consistent rendering
      this._rejectWithoutRequiredClasses()

      // Enforce expected structure (if any)
      this.rejectWithoutRequiredStructure()

      if(this.config.formGroup.autoCreate) {
        // Will create form-group if necessary
        this.autoCreateFormGroup()
      }

      // different components have different rules, always run this separately
      this.$formGroup = this.findFormGroup(this.config.formGroup.required)

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

    rejectWithoutRequiredStructure(){
      // implement
    }

    addFocusListener() {
      // implement
    }

    addChangeListener() {
      // implement
    }

    addFormGroupFocus(formGroup) {
      formGroup.addClass(ClassName.IS_FOCUSED)
    }

    removeFormGroupFocus(formGroup) {
      formGroup.removeClass(ClassName.IS_FOCUSED)
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
    outerElement(){
      return this.$element
    }

    // Find expected form-group
    findFormGroup(raiseError = true) {
      let fg = this.$element.closest(Selector.FORM_GROUP) // note that form-group may be grandparent in the case of an input-group
      if (fg.length === 0 && raiseError) {
        $.error(`Failed to find form-group for ${$element}`)
      }
      return fg
    }

    findOrCreateFormGroup() {
      let fg = this.$element.closest(Selector.FORM_GROUP) // note that form-group may be grandparent in the case of an baseInput-group
      if (fg === null || fg.length === 0) {
        this.$element.wrap(this.config.formGroup.template)
        fg = this.$element.closest(Selector.FORM_GROUP) // find node after attached (otherwise additional attachments don't work)
      }
      return fg
    }

    // ------------------------------------------------------------------------
    // private
    _rejectInvalidComponentMatches(){
      for(let otherComponent in this.config.invalidComponentMatches){
        otherComponent.rejectMatch(this.constructor.name, $element)
      }
    }

    _rejectWithoutRequiredClasses(){
      for(let requiredClass in this.config.requiredClasses){
        if(!$element.hasClass(requiredClass)){
          $.error(`${this.constructor.name} elements require class: ${requiredClass}`)
        }
      }
    }

    // ------------------------------------------------------------------------
    // static

  }

  return BaseInput

})(jQuery)

export default BaseInput
