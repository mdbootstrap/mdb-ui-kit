import Util from './util'

// FileInput decorator, to be called after Input
const FileInput = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const NAME = 'fileInput'
  const DATA_KEY = `mdb.${NAME}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Default = {}

  const ClassName = {
    IS_FILEINPUT: 'is-fileinput',
    IS_EMPTY: 'is-empty'
  }


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class FileInput {

    constructor(element, config) {
      this.$element = $(element)
      this.config = $.extend({}, Default, config)
      this.$formGroup = Util.findFormGroup(this.$element)

      this.$formGroup.addClass(ClassName.IS_FILEINPUT)

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
      this.$formGroup
        .on('focus', () => {
          Util.addFormGroupFocus(this.$formGroup)
        })
        .on('blur', () => {
          Util.removeFormGroupFocus(this.$formGroup)
        })

      // set the fileinput readonly field with the name of the file
      this.$element.on('change', () => {
        let value = ''
        $.each(this.$element.files, (i, file) => {
          value += `${file.name}  , `
        })
        value = value.substring(0, value.length - 2)
        if (value) {
          this._removeIsEmpty()
        } else {
          this._addIsEmpty()
        }
        this.$formGroup.find('input.form-control[readonly]').val(value)
      })
    }

    _addIsEmpty() {
      this.$formGroup.addClass(ClassName.IS_EMPTY)
    }

    _removeIsEmpty() {
      this.$formGroup.removeClass(ClassName.IS_EMPTY)
    }

    // ------------------------------------------------------------------------
    // static
    static _jQueryInterface(config) {
      return this.each(function () {
        let $element = $(this)
        let data = $element.data(DATA_KEY)

        if (!data) {
          data = new FileInput(this, config)
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
  $.fn[NAME] = FileInput._jQueryInterface
  $.fn[NAME].Constructor = FileInput
  $.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return FileInput._jQueryInterface
  }

  return FileInput

})(jQuery)

export default FileInput
