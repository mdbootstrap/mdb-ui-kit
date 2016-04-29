import Util from './util'

const Base = (($) => {

  const ClassName = {
    BMD_FORM_GROUP: 'bmd-form-group',
    IS_FILLED: 'is-filled',
    IS_FOCUSED: 'is-focused'
  }

  const Selector = {
    BMD_FORM_GROUP: `.${ClassName.BMD_FORM_GROUP}`
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
      this.$element.data(dataKey, null)
      this.$element = null
      this.config = null
    }

    // ------------------------------------------------------------------------
    // protected

    addFormGroupFocus() {
      if (!this.$element.prop('disabled')) {
        this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED)
      }
    }

    removeFormGroupFocus() {
      this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED)
    }

    removeIsFilled() {
      this.$bmdFormGroup.removeClass(ClassName.IS_FILLED)
    }

    addIsFilled() {
      this.$bmdFormGroup.addClass(ClassName.IS_FILLED)
    }

    // Find bmd-form-group
    findMdbFormGroup(raiseError = true) {
      let mfg = this.$element.closest(Selector.BMD_FORM_GROUP)
      if (mfg.length === 0 && raiseError) {
        $.error(`Failed to find ${Selector.BMD_FORM_GROUP} for ${Util.describe(this.$element)}`)
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
