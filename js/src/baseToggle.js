import BaseInput from './baseInput'
import Util from './util'

const BaseToggle = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {}

  const Selector = {
    LABEL: 'label'
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseToggle extends BaseInput {

    constructor(element, config, properties) {
      // properties = {inputType: checkbox, outerClass: checkbox-inline}
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'

      super(element, $.extend({}, Default, config), properties)
      this.$element.after(this.config.template)
    }

    // ------------------------------------------------------------------------
    // protected

    // Demarcation element (e.g. first child of a form-group)
    outerElement() {
      // .checkbox|switch|radio > label > input[type=checkbox|radio]
      // label.checkbox-inline > input[type=checkbox|radio]
      // .${this.outerClass} > label > input[type=${this.inputType}]
      return this.$element.parent().closest(`.${this.outerClass}`)
    }

    rejectWithoutRequiredStructure() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', `${this.constructor.name}'s ${Util.describe(this.$element)} parent element should be <label>.`)
      Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), `${this.constructor.name}'s ${Util.describe(this.$element)} outer element should have class ${this.outerClass}.`)
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
