import Util from './util'

// Checkbox decorator, to be called after Input
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
    template: `<span class='checkbox-material'><span class='check'></span></span>`
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Checkbox {

    constructor($element, config) {
      this.$element = $element
      this.config = $.extend({}, Default, config)

      this.$element.after(this.config.template)
      this.$formGroup = Util.findFormGroup(this.$element)

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
      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$formGroup.find('.checkbox label').hover(() => {
        Util.addFormGroupFocus(this.$formGroup)
      }, () => {
        Util.removeFormGroupFocus(this.$formGroup)
      })

      this.$element.change(() => {
        this.$element.blur()
      })
    }

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
