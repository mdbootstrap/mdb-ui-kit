import BaseInput from './baseInput'

const BaseFormControl = (($) => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const Default = {
    decorator: {
      template: `<span class='mdb-form-control-decorator'></span>`
    },
    requiredClasses: ['form-control']
  }

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseFormControl extends BaseInput {

    constructor($element, config) {
      super($element, $.extend(true, Default, config))

      // Initially mark as empty
      if (this.isEmpty()) {
        this.removeIsFilled()
      }

      // Add marker div the end of the form-group
      this.$element.after(this.config.decorator.template)
    }
  }


  return BaseFormControl

})(jQuery)

export default BaseFormControl
