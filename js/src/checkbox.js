import BaseInput from './baseInput'
import TextInput from './textInput'
import FileInput from './fileInput'
import Radio from './radio'
import Switch from './switch'
import Util from './util'

const Checkbox = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'checkbox'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {
    template: `<span class='checkbox-material'><span class='check'></span></span>`,
    formGroup: {
      autoCreate: true
    },
    invalidComponentMatches: [TextInput, FileInput, Radio, Switch]
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Checkbox extends BaseInput {

    constructor(element, config) {
      super(element, Default, config)
      this.$element.after(this.config.template)
    }

    dispose() {
      super.dispose(DATA_KEY)
    }

    static matches($element) {
      // '.checkbox > label > input[type=checkbox]'
      if ($element.attr('type') === 'checkbox') {
        return true
      }
      return false
    }

    static rejectMatch(component, $element) {
      Util.assert(this.matches($element), `${component} component is invalid for type='checkbox'.`)
    }

    // ------------------------------------------------------------------------
    // protected

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures
    outerElement() {
      // '.checkbox > label > input[type=checkbox]'
      return this.$element.parent().parent()
    }

    rejectWithoutRequiredStructure() {
      // '.checkbox > label > input[type=checkbox]'
      Util.assert(this.$element.parent().prop('tagName') === 'label', `${component} parent element should be <label>.`)
      Util.assert(this.outerElement().hasClass('checkbox'), `${component} grandparent element should have class .checkbox.`)
    }

    // ------------------------------------------------------------------------
    // protected

    addFocusListener() {
      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$formGroup.find('.checkbox label').hover(() => {
        Util.addFormGroupFocus(this.$formGroup)
      }, () => {
        Util.removeFormGroupFocus(this.$formGroup)
      })
    }

    addChangeListener() {
      this.$element.change(() => {
        this.$element.blur()
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
          data = new Checkbox(this, config)
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
  $.fn[NAME] = Checkbox._jQueryInterface
  $.fn[NAME].Constructor = Checkbox
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Checkbox._jQueryInterface
  }

  return Checkbox

})(jQuery)

export default Checkbox
