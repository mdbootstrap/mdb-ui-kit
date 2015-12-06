const Autofill = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'autofill'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NAME = `mdb${NAME.charAt(0).toUpperCase() + NAME.slice(1)}`
  const JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME]

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Autofill {

    constructor(element, config) {
      this.$element = $(element)
      this.config = $.extend({}, Default, config)

      this._watchLoading()
      this._attachEventHandlers()
    }

    dispose() {
      $.removeData(this.$element, DATA_KEY)
      this.$element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // private

    _watchLoading() {
      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(() => {
        clearInterval(this._onLoading)
      }, 10000)
    }

    // This part of code will detect autofill when the page is loading (username and password inputs for example)
    _onLoading() {
      setInterval(() => {
        $('input[type!=checkbox]').each((index, element) => {
          let $element = $($element)
          if ($element.val() && $element.val() !== $element.attr('value')) {
            $element.triggerStart('change')
          }
        })
      }, 100)
    }

    _attachEventHandlers() {
      // Listen on inputs of the focused form
      //  (because user can select from the autofill dropdown only when the input has focus)
      let focused = null
      $(document)
        .on('focus', 'input', (event) => {
          let $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]')
          focused = setInterval(() => {
            $inputs.each((index, element) => {
              let $element = $($element)
              if ($element.val() !== $element.attr('value')) {
                $element.triggerStart('change')
              }
            })
          }, 100)
        })
        .on('blur', '.form-group input', () => {
          clearInterval(focused)
        })
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(() => {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new Autofill(this, config)
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
  $.fn[JQUERY_NAME] = Autofill._jQueryInterface
  $.fn[JQUERY_NAME].Constructor = Autofill
  $.fn[JQUERY_NAME].noConflict = () => {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT
    return Autofill._jQueryInterface
  }

  return Autofill

})(jQuery)

export default Autofill
