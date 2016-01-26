import Util from './util'

const Base = (($) => {

  const ClassName = {
    MDB_FORM_GROUP: 'mdb-form-group',
    IS_FILLED: 'is-filled',
    IS_FOCUSED: 'is-focused'
  }

  const Selector = {
    MDB_FORM_GROUP: `.${ClassName.MDB_FORM_GROUP}`
  }

  const Default = {}

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class Base {

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    constructor($element, config, properties = {}) {
      this.$element = $element
      this.config = $.extend(true, {}, Default, config)

      // set properties for use in the constructor initialization
      for (let key in properties) {
        this[key] = properties[key]
      }
    }

    dispose(dataKey) {
      $.removeData(this.$element, dataKey)
      this.$element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // protected

    addFormGroupFocus() {
      if (!this.$element.prop('disabled')) {
        this.$mdbFormGroup.addClass(ClassName.IS_FOCUSED)
      }
    }

    removeFormGroupFocus() {
      this.$mdbFormGroup.removeClass(ClassName.IS_FOCUSED)
    }

    removeIsFilled() {
      this.$mdbFormGroup.removeClass(ClassName.IS_FILLED)
    }

    addIsFilled() {
      this.$mdbFormGroup.addClass(ClassName.IS_FILLED)
    }

    // Find mdb-form-group
    findMdbFormGroup(raiseError = true) {
      let mfg = this.$element.closest(Selector.MDB_FORM_GROUP)
      if (mfg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.MDB_FORM_GROUP} for ${Util.describe(this.$element)}`)
      }
      return mfg
    }

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static

  }

  return Base

})(jQuery)

export default Base
