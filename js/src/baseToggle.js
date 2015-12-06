import BaseInput from './baseInput'
import Util from './util'

const BaseToggle = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {
    formGroup: {
      required: false
    }
  }

  const Selector = {
    LABEL: 'label'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseToggle extends BaseInput {

    constructor(element, config, inputType, outerClass) {
      super(element, $.extend({}, Default, config))
      this.$element.after(this.config.template)
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      this.inputType = inputType
      this.outerClass = outerClass
    }

    // ------------------------------------------------------------------------
    // protected

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      return this.$element.parent().parent()
    }

    rejectWithoutRequiredStructure() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      Util.assert(this.$element.parent().prop('tagName') === 'label', `${this.constructor.name}'s ${this.$element} parent element should be <label>.`)
      Util.assert(this.outerElement().hasClass(this.outerClass), `${this.constructor.name}'s ${this.$element} grandparent element should have class .${this.outerClass}.`)
    }

    addFocusListener() {
      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$mdbFormGroup.find(Selector.LABEL).hover(() => {
        this.addFormGroupFocus()
      }, () => {
        this.removeFormGroupFocus()
      })
    }

    addChangeListener() {
      this.$element.change(() => {
        this.$element.blur()
      })
    }

    // ------------------------------------------------------------------------
    // private
  }

  return BaseToggle

})(jQuery)

export default BaseToggle
